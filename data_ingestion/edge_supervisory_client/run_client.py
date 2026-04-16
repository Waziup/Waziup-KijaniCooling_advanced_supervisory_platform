from pyModbusTCP.client import ModbusClient
import time
import json
import os
from wazigate import wazigate_EdgeAPI_util
from wazigate import wazigate_EdgeMQTT_util

client = ModbusClient(host = "127.0.0.1", port=12345)

# Navigate two directories up using ..
base_path = os.path.dirname(os.path.abspath(__file__))
WAZIGATE_CONFIG_FILE = os.path.join(base_path, "..", "..", "config", "asb_wazigate_config.json")

CLIENT_POLL_INTERVAL = 18  # in seconds, smaller than PLANT_UPDATE_INTERVAL

show_debug_print = True

def read_registers(start, count):
    values = client.read_input_registers(start, count)
    return values if values else [0]*count

def get_chiller_data():
    vals = read_registers(0, 22)
    keys = [
        "vg1","vh1","vc1","vc2","pc1","pg1","tg1",
        "th1","th2","th3","th4",
        "tc1","tc2","tc3","tc4","tc5","tc6","tc7","tc8","tc9"
    ]
    if show_debug_print: print(f"[CLIENT] Chiller unit data: {dict(zip(keys, vals))}")
    return dict(zip(keys, vals))

def get_biodigester_data():
    vals = read_registers(23, 61)
    keys = [
        "si_01","al_01","wi_02","si_02","al_02","hoa_02",
        "si_03","al_03","ki_03","li_03","fsdl_03","fsdh_03",
        "ki_04","j_04","hoa_01","fit_04","ti_06_1","ti_06_2",
        "ty_06","lit_06","lahh_06","lah_06","lal_06",
        "ti_06_4","pi_06_3","pi_11","pi_14","ti_14","fit_13",
        "si_07","al_07","hoa_07","ki_07","j_07","lsdh_07",
        "si_06","al_06","ti_15","ti_16"
    ]
    if show_debug_print: print(f"[CLIENT] Biodigester unit data: {dict(zip(keys, vals))}")
    return dict(zip(keys, vals))

def run_supervisory_client():
    connected = False
    next_cycle = time.time()
    while True:
        if not connected:
            connected = client.open()
            if not connected:
                print("[CLIENT] Could not connect to Modbus server...")
                time.sleep(1)
                continue
            print("[CLIENT] Connected to server")
        try:
            chiller_data = get_chiller_data()
            biodigester_data = get_biodigester_data()

            # 1. Check if biodigester and chiller devices exist in WaziGate
            check_WaziGate_devices_configuration()
            check_WaziGate_sensors_configuration()

            # 2. Publish plant data to WaziGate via MQTT
            data = load_json_file(WAZIGATE_CONFIG_FILE)
            biodigester_WaziGate_deviceName = list(data["devices"].keys())[0]
            chiller_WaziGate_deviceName = list(data["devices"].keys())[1]
            #wazigate_mqtt_publish_sensor_value(biodigester_WaziGate_deviceName, biodigester_data, data)
            #wazigate_mqtt_publish_sensor_value(chiller_WaziGate_deviceName, chiller_data, data)
            wazigate_post_sensor_value(biodigester_WaziGate_deviceName, biodigester_data, data)
            wazigate_post_sensor_value(chiller_WaziGate_deviceName, chiller_data, data)

        except Exception as e:
            print(f"[CLIENT] Error: {e}")
            connected = False  # Force reconnect

        # Controlled polling
        next_cycle += CLIENT_POLL_INTERVAL
        delay = next_cycle - time.time()
        if delay > 0:
            time.sleep(delay)

def check_WaziGate_devices_configuration():
    data = load_json_file(WAZIGATE_CONFIG_FILE)
    biodigester_WaziGate_deviceName = list(data["devices"].keys())[0]
    chiller_WaziGate_deviceName = list(data["devices"].keys())[1]

    # For each device in config file, check if the ID field is not empty 
    # and further check if the device ID exists on WaziGate and if the device name matches as in config (helper function)

    # 1. Check biodigester device
    if not data.get('devices', {}).get(biodigester_WaziGate_deviceName, {}).get("device_id"): # If device does not exist, create one on WaziGate
        print(f"[CLIENT] The {biodigester_WaziGate_deviceName} key is empty or does not exist in {WAZIGATE_CONFIG_FILE}")
        wazigate_EdgeAPI_util.create_device(biodigester_WaziGate_deviceName)
        # todo: add code to check if device creation was successful? (may be redundant as already done in wazigate_EdgeAPI_util)        
    else:
        biodigester_WaziGate_ID = data["devices"]["KijaniBox ASB-biodigester"]["device_id"]
        res = wazigate_EdgeAPI_util.check_with_wazigate(biodigester_WaziGate_deviceName, biodigester_WaziGate_ID, "","")
        # todo: add code to check if device check was successful? (may be redundant as already done in wazigate_EdgeAPI_util)
        if res == 200: print(f"[CLIENT] {biodigester_WaziGate_deviceName} found on WaziGate..")

    # 2. Check chiller device
    if not data.get('devices', {}).get(chiller_WaziGate_deviceName, {}).get("device_id"): # If device does not exist, create one on WaziGate
        print(f"[CLIENT] The {chiller_WaziGate_deviceName} key is empty or does not exist in {WAZIGATE_CONFIG_FILE}")
        wazigate_EdgeAPI_util.create_device(chiller_WaziGate_deviceName)
        # todo: add code to check if device creation was successful? (may be redundant as already done in wazigate_EdgeAPI_util)
    else:
        chiller_WaziGate_ID = data["devices"]["KijaniBox ASB-chiller"]["device_id"]
        res = wazigate_EdgeAPI_util.check_with_wazigate(chiller_WaziGate_deviceName, chiller_WaziGate_ID, "","")
        # todo: add code to check if device check was successful? (may be redundant as already done in wazigate_EdgeAPI_util)
        if res == 200: print(f"[CLIENT] {biodigester_WaziGate_deviceName} found on WaziGate..")

def check_WaziGate_sensors_configuration():
    data = load_json_file(WAZIGATE_CONFIG_FILE)
    biodigester_WaziGate_deviceName = list(data["devices"].keys())[0]
    chiller_WaziGate_deviceName = list(data["devices"].keys())[1]

    # 1. Check biodigester sensors
    biodigester_WaziGate_deviceID = data["devices"][list(data["devices"].keys())[0]]["device_id"]
    biodigester_sensors = data["devices"][list(data["devices"].keys())[0]]["sensors"]
    for sensor_name, sensor_ID in biodigester_sensors.items():
        if sensor_ID:
            wazigate_EdgeAPI_util.check_with_wazigate("", biodigester_WaziGate_deviceID, sensor_name, sensor_ID, biodigester_WaziGate_deviceName)
        else:
            wazigate_EdgeAPI_util.create_sensor(biodigester_WaziGate_deviceID, sensor_name, biodigester_WaziGate_deviceName)
    
    # 2. Check chiller sensors
    chiller_WaziGate_deviceID = data["devices"][list(data["devices"].keys())[1]]["device_id"]
    chiller_sensors = data["devices"][list(data["devices"].keys())[1]]["sensors"]
    for sensor_name, sensor_ID in chiller_sensors.items():
        if sensor_ID:
            wazigate_EdgeAPI_util.check_with_wazigate("", chiller_WaziGate_deviceID, sensor_name, sensor_ID, chiller_WaziGate_deviceName)
        else:
            wazigate_EdgeAPI_util.create_sensor(chiller_WaziGate_deviceID, sensor_name, chiller_WaziGate_deviceName)

def wazigate_mqtt_publish_sensor_value(device_name, sensor_values, data):
    device = data["devices"][device_name]
    device_id = device["device_id"]
    sensors = device["sensors"]

    for sensor_name, value in sensor_values.items():
        sensor_id = sensors.get(sensor_name)
        if not sensor_id:
            print(f"[CLIENT] MQTT publish skipped {device_name}/ {sensor_name}")
            continue
        wazigate_EdgeMQTT_util.publish_sensor_value(device_id, sensor_id, value)

def wazigate_post_sensor_value(device_name, sensor_values, data):
    device = data["devices"][device_name]
    device_id = device["device_id"]
    sensors = device["sensors"]

    for sensor_name, value in sensor_values.items():
        sensor_id = sensors.get(sensor_name)
        if not sensor_id:
            print(f"[CLIENT] MQTT publish skipped {device_name}/ {sensor_name}")
            continue
        wazigate_EdgeAPI_util.post_sensor_value(device_id, sensor_id, value)
        #print(f"[CLIENT] MQTT publish {device_name}/ {sensor_name}/ {value}")


def load_json_file(path):
    with open(path, 'r') as file:
        return json.load(file)
def save_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)
    print(f"[CLIENT] File {path} saved successfully.")