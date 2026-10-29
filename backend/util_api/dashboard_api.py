"""
Dashboard API service for KijaniCooling ASB system.
Returns the latest WaziGate sensor values shown on the dashboards.
"""

from flask import Blueprint, jsonify

from data_ingestion.wazigate import wazigate_EdgeAPI_util

BIODIGESTER_DEVICE_NAME = "KijaniCooling ASB-biodigester"
BIODIGESTER_DASHBOARD_SENSORS = ["pi_11", "ti_14", "ty_06", "lit_06"]

dashboard_api = Blueprint("dashboard_api", __name__, url_prefix="/kijanicooling/api/v1")

def get_device_sensor_values(device_name, sensor_keys):
    # Look up the WaziGate IDs in the config file, then read the latest sensor values from WaziGate
    data = wazigate_EdgeAPI_util.load_json()
    device = data.get("devices", {}).get(device_name, {})
    device_id = device.get("device_id")
    if not device_id:
        raise Exception(f"device_id not set for {device_name}")

    wazigate_device = wazigate_EdgeAPI_util.get_device(device_id)
    wazigate_values = {s.get("id"): s.get("value") for s in wazigate_device.get("sensors") or []}

    values = {}
    for sensor_key in sensor_keys:
        sensor_id = device.get("sensors", {}).get(sensor_key, {}).get("wazigate_id")
        values[sensor_key.upper()] = wazigate_values.get(sensor_id) if sensor_id else None
    return values

@dashboard_api.route("/dashboard-biodigester", methods=["GET"])
def get_dashboard_biodigester():
    try:
        return jsonify(get_device_sensor_values(BIODIGESTER_DEVICE_NAME, BIODIGESTER_DASHBOARD_SENSORS))
    except Exception as e:
        print(f"[DASHBOARD API] Error reading biodigester values: {e}")
        return jsonify({"error": "Failed to read biodigester values from WaziGate"}), 502
