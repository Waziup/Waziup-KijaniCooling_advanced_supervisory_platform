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
    
def create_device(name):
    token = get_wazigate_token()
    if not token: # renew token if not saved
        token = renew_wazigate_token()
    headers = wazigate_auth_headers(token)
    r = requests.post(
        f"{WAZIGATE_URL}/devices", 
        headers = headers, 
        json = {"name": name}
    )
    # check if unauthorized, refresh token and retry
    if r.status_code == 401:
        print("[WAZIGATE EDGE UTIL] Auth token expired, refetching...")

        token = renew_wazigate_token()
        headers = wazigate_auth_headers(token)

        r = requests.post(
            f"{WAZIGATE_URL}/devices",
            headers=headers,
            json = {"name": name}
        )
        if r.status_code == 200:
            device_id = r.json()
            print(f"[WAZIGATE EDGE UTIL] Successfully created device. ID = {device_id}, name = {name}")
            data = load_json(JSON_FILE)
            if "devices" not in data or not isinstance(data["devices"], dict):
                data["devices"] = {}

            if name not in data["devices"]:
                data["devices"][name] = {
                    "device_id": device_id,
                    "sensors": {}
                }
            else:
                data["devices"][name]["device_id"] = device_id

            save_json(data, JSON_FILE)
            return 200
    elif r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to create device '{name}': {r.status_code} {r.text}")
    elif r.status_code == 200:
        device_id = r.json()
        print(f"[WAZIGATE EDGE UTIL] Successfully created device. ID = {device_id}, name = {name}")
        data = load_json(JSON_FILE)
        if "devices" not in data or not isinstance(data["devices"], dict):
            data["devices"] = {}

        if name not in data["devices"]:
            data["devices"][name] = {
                "device_id": device_id,
                "sensors": {}
            }
        else:
            data["devices"][name]["device_id"] = device_id

        save_json(data, JSON_FILE)
        return 200

def create_sensor(device_id, name, fordevice=""):
    token = get_wazigate_token()
    if not token: # renew token if not saved
        token = renew_wazigate_token()
    headers = wazigate_auth_headers(token)
    r = requests.post(
        f"{WAZIGATE_URL}/devices/{device_id}/sensors",
        headers = headers,
        json = {
                "meta": {
                "createdBy": "KijaniCooling supervision system",
                "icon": "meter",
                "kind": "OtherSensor"
                },
                "name": name
            }
    )
    # check if unauthorized, refresh token and retry
    if r.status_code == 401:
        print("[WAZIGATE EDGE UTIL] Auth token expired, refetching...")

        token = renew_wazigate_token()
        headers = wazigate_auth_headers(token)
        r = requests.post(
            f"{WAZIGATE_URL}/devices/{device_id}/sensors",
            headers = headers,
            json = {
                    "meta": {
                    "createdBy": "KijaniCooling supervision system",
                    "icon": "meter",
                    "kind": "OtherSensor"
                    },
                    "name": name
                }
        )
        if r.status_code == 200:
            sensor_id = r.json()
            print(f"[WAZIGATE EDGE UTIL] Successfully created sensor. ID  = {sensor_id}, name = {name}")
            data = load_json(JSON_FILE)
            data["devices"][fordevice]["sensors"][name] = sensor_id
            save_json(data, JSON_FILE)
            return 200
    elif r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to create sensor '{name}': {r.status_code} {r.text}")
    elif r.status_code == 200:
        sensor_id = r.json()
        print(f"[WAZIGATE EDGE UTIL] Successfully created sensor. ID  = {sensor_id}, name = {name}")
        data = load_json(JSON_FILE)
        data["devices"][fordevice]["sensors"][name] = sensor_id
        save_json(data, JSON_FILE)
        return 200

def post_sensor_value(device_id, sensor_id, value):
    token = get_wazigate_token()
    if not token: # renew token if not saved
        token = renew_wazigate_token()
    headers = wazigate_auth_headers(token)
    r = requests.post(
        f"{WAZIGATE_URL}/devices/{device_id}/sensors/{sensor_id}/value",
        headers = headers,
        json = {"value": value}
    )
    # check if unauthorized, refresh token and retry
    if r.status_code == 401:
        print("[WAZIGATE EDGE UTIL] Auth token expired, refetching...")
        token = renew_wazigate_token()
        headers = wazigate_auth_headers(token)
        r = requests.post(
            f"{WAZIGATE_URL}/devices/{device_id}/sensors/{sensor_id}/value",
            headers = headers,
            json = {"value": value}
        )
        if r.status_code == 200:
            print(f"[WAZIGATE EDGE UTIL] Successfully POSTED to sensor {sensor_id}, value = {value}")
            return 200
    elif r.status_code != 200:
        raise Exception(f"[WAZIGATE EDGE UTIL] Failed to POST sensor value, '{value}': {r.status_code} {r.text}")
    elif r.status_code == 200:
        print(f"[WAZIGATE EDGE UTIL] Successfully POSTED sensor to {sensor_id}, value = {value}")
        return 200

def check_with_wazigate(deviceName ="", deviceID ="", sensorName ="", sensorID ="", fordevice=""):
    # 1. Check if given device is correct
    if deviceName and deviceID:
        token = get_wazigate_token()
        if not token: # renew token if not saved
            token = renew_wazigate_token()
        headers = wazigate_auth_headers(token)
        r = requests.get(
            f"{WAZIGATE_URL}/devices/{deviceID}",
            headers = headers
        )
        # check if unauthorized, refresh token and retry
        if r.status_code == 401:
            print("[WAZIGATE EDGE UTIL] Auth token expired, refetching...")
            token = renew_wazigate_token()
            headers = wazigate_auth_headers(token)
            r = requests.get(
                f"{WAZIGATE_URL}/devices/{deviceID}",
                headers = headers
            )
            if r.status_code == 200: # if device exists on WaziGate
                device_data = r.json()
                if device_data["name"] != deviceName: # if name does not match on WaziGate
                    print(f"[WAZIGATE EDGE UTIL] {deviceName} not matching with device on WaziGate..")
                    res = create_device(deviceName)
                    return 200 if res != "" or res != 503 else 503
                else: return 200
        elif r.status_code == 200: # if device exists on WaziGate
            device_data = r.json()
            if device_data["name"] != deviceName: # if name does not match on WaziGate
                print(f"[WAZIGATE EDGE UTIL] {deviceName} not matching with device on WaziGate..")
                res = create_device(deviceName)
                return 200 if res != "" or res != 503 else 503
            else: return 200
        else: # if device does not exist on WaziGate
            print(f"[WAZIGATE EDGE UTIL] {deviceName}'s ID not found on WaziGate..")
            res = create_device(deviceName)
            return 200 if res != "" or res != 503 else 503

    # 2. Check if given sensor is correct
    if deviceID and sensorName and sensorID and fordevice:
        token = get_wazigate_token()
        if not token: # renew token if not saved
            token = renew_wazigate_token()
        headers = wazigate_auth_headers(token)
        r = requests.get(
            f"{WAZIGATE_URL}/devices/{deviceID}/sensors/{sensorID}",
            headers = headers
        )
        # check if unauthorized, refresh token and retry
        if r.status_code == 401:
            print("[WAZIGATE EDGE UTIL] Auth token expired, refetching...")
            token = renew_wazigate_token()
            headers = wazigate_auth_headers(token)
            r = requests.get(
                f"{WAZIGATE_URL}/devices/{deviceID}/sensors/{sensorID}",
                headers = headers
            )
            if r.status_code == 200: # if sensor exists on WaziGate
                sensor_data = r.json()
                if sensor_data["name"] != sensorName: # if name does not match on WaziGate
                    print(f"[WAZIGATE EDGE UTIL] {sensorName} not matching with sensor name on WaziGate..")
                    res = create_sensor(deviceID, sensorName, fordevice)
                    return 200 if res != "" or res != 503 else 503
                else: return 200
        if r.status_code == 200: # if sensor exists on WaziGate
            sensor_data = r.json()
            if sensor_data["name"] != sensorName: # if name does not match on WaziGate
                print(f"[WAZIGATE EDGE UTIL] {sensorName} not matching with sensor name on WaziGate..")
                res = create_sensor(deviceID, sensorName, fordevice)
                return 200 if res != "" or res != 503 else 503
            else: return 200
        else: # if sensor does not exist on WaziGate
            print(f"[WAZIGATE EDGE UTIL] {sensorName}'s ID not found on WaziGate..")
            res = create_sensor(deviceID, sensorName, fordevice)
            return 200 if res != "" or res != 503 else 503

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