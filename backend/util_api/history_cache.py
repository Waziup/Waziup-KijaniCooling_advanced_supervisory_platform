"""
Hourly sensor history cache for KijaniCooling ASB system dashboard graphs.
Keeps hourly averages of a WaziGate sensor over the last days. The first load reads the full period from WaziGate,
later refreshes only read the values posted since the previous refresh, so serving the graphs stays fast.
"""

import re
import threading
import time
from datetime import datetime, timedelta, timezone

from data_ingestion.wazigate import wazigate_EdgeAPI_util

show_debug_print = True

class HourlySensorHistory:
    def __init__(self, device_name, sensor_key, days=7, refresh_interval=300):
        self.device_name = device_name
        self.sensor_key = sensor_key
        self.days = days
        self.refresh_interval = refresh_interval    # in seconds
        self._buckets = {}                          # {hour datetime (UTC): [sum, count]}
        self._fetched_until = None                  # values up to this time are in the buckets
        self._ids = None                            # (device_id, sensor_id) the buckets belong to
        self._loaded = False                        # True once a refresh succeeded
        self._updated = 0                           # time of the last refresh attempt
        self._lock = threading.Lock()

    def get(self):
        # Hourly averages, oldest first: [{"time": "YYYY-MM-DDTHH:00:00Z", "value": average or None}]
        if not self._loaded:
            with self._lock: # first load: wait for the data
                if not self._loaded:
                    self._refresh()
        elif time.time() - self._updated > self.refresh_interval and self._lock.acquire(blocking=False):
            # serve the cached values and refresh them in the background
            threading.Thread(target=self._refresh_and_release, name=f"History-{self.sensor_key}", daemon=True).start()
        return self._points()

    def preload(self, retry_interval=30):
        # Fill the cache in the background (e.g. when the API server starts),
        # retrying until the WaziGate IDs are in the config file and WaziGate answers
        def run():
            while not self._loaded:
                with self._lock:
                    if not self._loaded:
                        self._refresh()
                if not self._loaded:
                    time.sleep(retry_interval)
        threading.Thread(target=run, name=f"Preload-{self.sensor_key}", daemon=True).start()

    def _refresh_and_release(self):
        try:
            self._refresh()
        finally:
            self._lock.release()

    def _refresh(self):
        try:
            data = wazigate_EdgeAPI_util.load_json()
            device = data.get("devices", {}).get(self.device_name, {})
            ids = (device.get("device_id"), device.get("sensors", {}).get(self.sensor_key, {}).get("wazigate_id"))
            if not all(ids):
                raise Exception(f"WaziGate IDs not set for {self.device_name}/ {self.sensor_key}")
            if ids != self._ids: # device or sensor recreated on WaziGate: start over
                self._buckets, self._fetched_until, self._ids = {}, None, ids

            now = datetime.now(timezone.utc).replace(microsecond=0)
            start = self._first_hour(now)
            from_time = max(self._fetched_until + timedelta(seconds=1), start) if self._fetched_until else start
            values = wazigate_EdgeAPI_util.get_sensor_values(ids[0], ids[1], from_time, now)

            for item in values:
                value, hour = item.get("value"), parse_hour(item.get("time"))
                if hour is None or isinstance(value, bool) or not isinstance(value, (int, float)):
                    continue
                bucket = self._buckets.setdefault(hour, [0.0, 0])
                bucket[0] += value
                bucket[1] += 1
            self._buckets = {h: b for h, b in self._buckets.items() if h >= start} # drop hours older than the period
            self._fetched_until = now
            self._loaded = True
            if show_debug_print: print(f"[HISTORY CACHE] {self.sensor_key}: {len(values)} new values since {from_time.isoformat()}")
        except Exception as e:
            print(f"[HISTORY CACHE] Error refreshing {self.sensor_key} history: {e}")
        finally:
            self._updated = time.time()

    def _first_hour(self, now):
        return now.replace(minute=0, second=0) - timedelta(hours=self.days * 24 - 1)

    def _points(self):
        start = self._first_hour(datetime.now(timezone.utc).replace(microsecond=0))
        points = []
        for i in range(self.days * 24):
            hour = start + timedelta(hours=i)
            s, n = self._buckets.get(hour, (0, 0))
            points.append({"time": hour.strftime("%Y-%m-%dT%H:00:00Z"), "value": round(s / n, 3) if n else None})
        return points

def parse_hour(timestamp):
    # WaziGate timestamps are RFC3339 with up to nanoseconds, e.g. "2026-10-29T12:34:56.123456789+03:00"
    if not timestamp:
        return None
    try:
        ts = re.sub(r"(\.\d{6})\d+", r"\1", str(timestamp)).replace("Z", "+00:00")
        t = datetime.fromisoformat(ts)
        if t.tzinfo is None:
            t = t.replace(tzinfo=timezone.utc)
        return t.astimezone(timezone.utc).replace(minute=0, second=0, microsecond=0)
    except ValueError:
        return None
