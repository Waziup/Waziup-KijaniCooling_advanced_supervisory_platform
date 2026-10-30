"""
Dashboard API service for KijaniCooling ASB system.
Returns the latest WaziGate sensor values and weekly performance metrics shown on the dashboard.
"""

import threading
import time
from datetime import date, datetime, timedelta, timezone

from flask import Blueprint, jsonify

from data_ingestion.wazigate import wazigate_EdgeAPI_util
from util_api.history_cache import HourlySensorHistory

BIODIGESTER_DEVICE_NAME = "KijaniCooling ASB-biodigester"
CHILLER_DEVICE_NAME = "KijaniCooling ASB-chiller"
METRICS_DEVICE_NAME = "KijaniCooling ASB metrics"

# Sensors shown on the dashboard, per WaziGate device (signal names from the P&ID parameters list)
DASHBOARD_SENSORS = {
    BIODIGESTER_DEVICE_NAME: [
        "pi_11", "ti_14", "ty_06", "lit_06",                    # biogas pressure (PT 11), biogas temp (TE 14), heating system, substrate level
        "pi_06_3", "ti_06_1", "ti_06_4", "fit_04",              # biogas pressure (PT 06 3), substrate temp, biogas temp, substrate flow
        "si_02", "al_02",                                       # slurry/feeding pump status and alarm
        "si_03", "al_03",                                       # storing tank stirrer status and alarm
        "si_07", "al_07",                                       # digestate pump status and alarm
        "si_06", "al_06"                                        # substrate recycling pump status and alarm
    ],
    CHILLER_DEVICE_NAME: ["vg1", "th1", "th2", "vc1", "pg1", "cc1", "cc2"],
    METRICS_DEVICE_NAME: ["energy_output", "gas_production", "substrate_feeding_rate"]
}

# Weekly performance metrics, computed from the metrics device value history on WaziGate
WEEKLY_METRICS = ["energy_output", "gas_production", "substrate_feeding_rate"]
WEEKLY_TRENDS_REFRESH_INTERVAL = 600 # in seconds; reading 2 weeks of history is too heavy for every dashboard poll

dashboard_api = Blueprint("dashboard_api", __name__, url_prefix="/kijanicooling/api/v1")

# Hourly averages over the last 7 days for the dashboard graphs
energy_output_history = HourlySensorHistory(METRICS_DEVICE_NAME, "energy_output")
gas_production_history = HourlySensorHistory(METRICS_DEVICE_NAME, "gas_production")

def preload_history():
    energy_output_history.preload()
    gas_production_history.preload()

_weekly_cache = {"data": None, "updated": 0}
_weekly_lock = threading.Lock()

def get_device_sensor_values(device_name, sensor_keys, data=None):
    # Look up the WaziGate IDs in the config file, then read the latest sensor values from WaziGate
    # Returns {sensor_key: value}
    if data is None:
        data = wazigate_EdgeAPI_util.load_json()
    device = data.get("devices", {}).get(device_name, {})
    device_id = device.get("device_id")
    if not device_id:
        raise Exception(f"device_id not set for {device_name}")

    wazigate_device = wazigate_EdgeAPI_util.get_device(device_id)
    wazigate_values = {s.get("id"): s.get("value") for s in wazigate_device.get("sensors") or []}

    sensors = device.get("sensors", {})
    values = {}
    for sensor_key in sensor_keys:
        sensor_id = sensors.get(sensor_key, {}).get("wazigate_id")
        values[sensor_key] = wazigate_values.get(sensor_id) if sensor_id else None
    return values

def daily_averages(values, days):
    # Average the values of each day, {date string: average or None}
    sums = {d: [0.0, 0] for d in days}
    for item in values:
        day = str(item.get("time", ""))[:10] # "YYYY-MM-DD..." timestamp
        if day in sums and isinstance(item.get("value"), (int, float)):
            sums[day][0] += item["value"]
            sums[day][1] += 1
    return {d: (round(s / n, 3) if n else None) for d, (s, n) in sums.items()}

def percent_change(previous, current):
    if previous is None or current is None or previous == 0:
        return None
    return round((current - previous) / abs(previous) * 100, 1)

def mean(values):
    values = [v for v in values if v is not None]
    return sum(values) / len(values) if values else None

def compute_weekly_metrics():
    """
    Read the last 14 days of the metrics device history from WaziGate and return:
      trends: daily averages over the last 7 days, [{"date", "day", "ENERGY_OUTPUT", ...}]
      change: % change of the last 7 days average compared to the previous 7 days, {"ENERGY_OUTPUT": .., ...}
    """
    data = wazigate_EdgeAPI_util.load_json()
    device = data.get("devices", {}).get(METRICS_DEVICE_NAME, {})
    device_id = device.get("device_id")
    if not device_id:
        raise Exception(f"device_id not set for {METRICS_DEVICE_NAME}")

    now = datetime.now(timezone.utc)
    today = now.date()
    days = [(today - timedelta(days=i)).isoformat() for i in range(13, -1, -1)] # oldest first
    from_time = datetime.combine(today - timedelta(days=13), datetime.min.time(), tzinfo=timezone.utc)

    averages = {}
    for metric in WEEKLY_METRICS:
        sensor_id = device.get("sensors", {}).get(metric, {}).get("wazigate_id")
        history = wazigate_EdgeAPI_util.get_sensor_values(device_id, sensor_id, from_time, now) if sensor_id else []
        averages[metric] = daily_averages(history, days)

    this_week, previous_week = days[7:], days[:7]
    trends = []
    for d in this_week:
        point = {"date": d, "day": date.fromisoformat(d).strftime("%a")}
        point.update({metric.upper(): averages[metric][d] for metric in WEEKLY_METRICS})
        trends.append(point)
    change = {
        metric.upper(): percent_change(
            mean(averages[metric][d] for d in previous_week),
            mean(averages[metric][d] for d in this_week)
        )
        for metric in WEEKLY_METRICS
    }
    return {"trends": trends, "change": change}

def refresh_weekly_metrics():
    try:
        _weekly_cache["data"] = compute_weekly_metrics()
    except Exception as e:
        print(f"[DASHBOARD API] Error computing weekly metrics: {e}")
    finally:
        _weekly_cache["updated"] = time.time()
        _weekly_lock.release()

def get_weekly_metrics():
    # Return the cached weekly metrics; refresh them in the background when outdated
    if time.time() - _weekly_cache["updated"] > WEEKLY_TRENDS_REFRESH_INTERVAL and _weekly_lock.acquire(blocking=False):
        threading.Thread(target=refresh_weekly_metrics, name="WeeklyMetricsThread", daemon=True).start()
    return _weekly_cache["data"] or {"trends": [], "change": {}}

@dashboard_api.route("/dashboard-biodigester", methods=["GET"])
def get_dashboard_biodigester():
    try:
        data = wazigate_EdgeAPI_util.load_json()
    except Exception as e:
        print(f"[DASHBOARD API] Error loading config: {e}")
        return jsonify({"error": "Failed to load WaziGate config"}), 500

    values = {}
    errors = 0
    for device_name, sensor_keys in DASHBOARD_SENSORS.items():
        try:
            device_values = get_device_sensor_values(device_name, sensor_keys, data)
        except Exception as e: # keep the values of the other devices
            errors += 1
            print(f"[DASHBOARD API] Error reading {device_name} values: {e}")
            device_values = dict.fromkeys(sensor_keys)
        values.update({key.upper(): value for key, value in device_values.items()})
    if errors == len(DASHBOARD_SENSORS):
        return jsonify({"error": "Failed to read sensor values from WaziGate"}), 502

    weekly = get_weekly_metrics()
    values["GAS_PRODUCTION_TARGET"] = data.get("gas_production_target")
    values["WEEKLY_CHANGE"] = weekly["change"]
    values["WEEKLY_TRENDS"] = weekly["trends"]
    return jsonify(values)

@dashboard_api.route("/dashboard-energy-output-history", methods=["GET"])
def get_dashboard_energy_output_history():
    # Hourly energy output (kWh) over the last 7 days
    return jsonify({"values": energy_output_history.get()})

@dashboard_api.route("/dashboard-biogas-production", methods=["GET"])
def get_dashboard_biogas_production():
    # Hourly gas production (m3/h) over the last 7 days, with the target gas production
    try:
        target = wazigate_EdgeAPI_util.load_json().get("gas_production_target")
    except Exception as e:
        print(f"[DASHBOARD API] Error loading config: {e}")
        target = None
    return jsonify({"target": target, "values": gas_production_history.get()})
