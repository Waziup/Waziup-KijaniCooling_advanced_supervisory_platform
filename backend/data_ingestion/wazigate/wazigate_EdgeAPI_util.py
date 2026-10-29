import requests
import json
import os

show_debug_print = True

#WAZIGATE_URL = "http://xxx.xxx.xxx.xx" # REPLACE WITH YOUR ACTUAL WAZIGATE IP
# Read WaziGate URL from environment when running in Docker/containers.
# Default to localhost for local development.
WAZIGATE_URL = os.getenv("WAZIGATE_URL", "http://localhost")       # Use this when running a local WaziGate-Edge server
USERNAME = "admin"          # default
PASSWORD = "loragateway"    # default
BASE_PATH = os.path.dirname(os.path.abspath(__file__))
JSON_FILE = os.path.normpath(os.path.join(BASE_PATH, "..", "config", "asb_wazigate_config.json"))
WAZIGATE_TOKEN_FILE = os.path.join(BASE_PATH, "..", "config", "wazigate_token.txt")
REQUEST_TIMEOUT = 10 # in seconds
HISTORY_REQUEST_TIMEOUT = 60 # in seconds, value history can be large

def renew_wazigate_token():
    # Fetch new token from WaziGate and store it in .txt file (for now..)
    url = WAZIGATE_URL + "/auth/token"
    payload = {
        "username": USERNAME,
        "password": PASSWORD
    }
    try:
        r = requests.post(url, json=payload, timeout=5)

        if r.status_code != 200:
            raise Exception(f"[WAZIGATE EDGE UTIL] Auth failed: {r.status_code} {r.text}")
        wazigate_token = r.json()
        save_wazigate_token(wazigate_token)
        return wazigate_token
    except requests.exceptions.RequestException as e:
        raise Exception(f"[WAZIGATE EDGE UTIL] NETWORK ERROR {e}")

def wazigate_request(method, path, **kwargs):
    # Send an authenticated request to WaziGate, renewing the token once if it has expired
    kwargs.setdefault("timeout", REQUEST_TIMEOUT)
    token = get_wazigate_token()
    if not token: # renew token if not saved
        token = renew_wazigate_token()
    r = requests.request(method, f"{WAZIGATE_URL}{path}", headers=wazigate_auth_headers(token), **kwargs)
    # check if unauthorized, refresh token and retry
    if r.status_code == 401:
        print("[WAZIGATE EDGE UTIL] Auth token expired, refetching...")
        token = renew_wazigate_token()
        r = requests.request(method, f"{WAZIGATE_URL}{path}", headers=wazigate_auth_headers(token), **kwargs)
    return r

def get_devices():
    # Returns the list of all devices on WaziGate (each with its sensors and actuators)
    r = wazigate_request("GET", "/devices")
    if r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to GET devices: {r.status_code} {r.text}")
    return r.json()

def get_device(device_id):
    r = wazigate_request("GET", f"/devices/{device_id}")
    if r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to GET device '{device_id}': {r.status_code} {r.text}")
    return r.json()

def get_sensor_values(device_id, sensor_id, from_time, to_time):
    # Returns the sensor value history between two datetimes, as a list of {"value": .., "time": ".."}
    params = {
        "from": from_time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "to": to_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    r = wazigate_request("GET", f"/devices/{device_id}/sensors/{sensor_id}/values", params=params, timeout=HISTORY_REQUEST_TIMEOUT)
    if r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to GET values of sensor '{sensor_id}': {r.status_code} {r.text}")
    return r.json() or []

def create_device(name):
    # Creates a device on WaziGate and returns its ID
    r = wazigate_request("POST", "/devices", json={"name": name})
    if r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to create device '{name}': {r.status_code} {r.text}")
    device_id = r.json()
    print(f"[WAZIGATE EDGE UTIL] Successfully created device. ID = {device_id}, name = {name}")
    return device_id

def create_sensor(device_id, name):
    # Creates a sensor inside the given WaziGate device and returns its ID
    r = wazigate_request(
        "POST",
        f"/devices/{device_id}/sensors",
        json = {
                "meta": {
                "createdBy": "KijaniCooling supervision system",
                "icon": "meter",
                "kind": "OtherSensor"
                },
                "name": name
            }
    )
    if r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to create sensor '{name}': {r.status_code} {r.text}")
    sensor_id = r.json()
    print(f"[WAZIGATE EDGE UTIL] Successfully created sensor. ID  = {sensor_id}, name = {name}")
    return sensor_id

def post_sensor_value(device_id, sensor_id, value):
    r = wazigate_request("POST", f"/devices/{device_id}/sensors/{sensor_id}/value", json={"value": value})
    if r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to POST sensor value, '{value}': {r.status_code} {r.text}")
    if show_debug_print: print(f"[WAZIGATE EDGE UTIL] Successfully POSTED to sensor {sensor_id}, value = {value}")
    return 200

def sync_wazigate_devices(path=JSON_FILE):
    """
    Make sure every device and sensor listed in the config file exists on WaziGate, and store their IDs in the config.
    Devices and sensors are matched by name, so existing ones are reused and only missing ones are created.
    The sensor name used on WaziGate is the sensor key in the config file (e.g. "si_01").
    """
    data = load_json(path)
    wazigate_devices = get_devices()

    for device_name, device_config in data.get("devices", {}).items():
        # 1. Find the device on WaziGate by name, otherwise create it
        matches = [d for d in wazigate_devices if d.get("name") == device_name]
        if len(matches) > 1:
            print(f"[WAZIGATE EDGE UTIL] {len(matches)} devices named '{device_name}' found on WaziGate, using ID {matches[0]['id']}")
        if matches:
            wazigate_device = matches[0]
            if show_debug_print: print(f"[WAZIGATE EDGE UTIL] {device_name} found on WaziGate. ID = {wazigate_device['id']}")
        else:
            print(f"[WAZIGATE EDGE UTIL] {device_name} not found on WaziGate, creating it..")
            wazigate_device = {"id": create_device(device_name), "sensors": []}
        device_config["device_id"] = wazigate_device["id"]

        # 2. Find each sensor inside the device by name, otherwise create it
        wazigate_sensors = {}
        for s in wazigate_device.get("sensors") or []:
            wazigate_sensors.setdefault(s.get("name"), s.get("id"))
        for sensor_key, sensor_config in device_config.get("sensors", {}).items():
            sensor_id = wazigate_sensors.get(sensor_key)
            if not sensor_id:
                print(f"[WAZIGATE EDGE UTIL] {device_name}/ {sensor_key} not found on WaziGate, creating it..")
                sensor_id = create_sensor(wazigate_device["id"], sensor_key)
            sensor_config["wazigate_id"] = sensor_id

    save_json(data, path)
    return data

# Function to load JSON file
def load_json(path=JSON_FILE):
    with open(path, 'r') as file:
        return json.load(file)
# Function to save data to JSON file
def save_json(data, path=JSON_FILE):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)

def save_wazigate_token(token):
    with open(WAZIGATE_TOKEN_FILE, "w") as f:
        f.write(token)
def load_wazigate_token():
    try:
        with open(WAZIGATE_TOKEN_FILE, "r") as f:
            return f.read().strip()
    except:
        return ""
def get_wazigate_token():
    wazigate_token = load_wazigate_token()
    return wazigate_token
def wazigate_auth_headers(token):
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
