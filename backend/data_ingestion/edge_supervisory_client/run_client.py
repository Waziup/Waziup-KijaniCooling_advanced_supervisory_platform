from pyModbusTCP.client import ModbusClient
import time
import json
import os

from data_ingestion.wazigate import wazigate_EdgeAPI_util
from data_ingestion.wazigate import wazigate_EdgeMQTT_util
from optimization.energy import energy_processor
from optimization.logistics import gas_production_processor
from optimization.logistics import substrate_feeding_rate_processor

client = ModbusClient(host = "127.0.0.1", port=12345)

# Navigate two directories up using ..
base_path = os.path.dirname(os.path.abspath(__file__))
WAZIGATE_CONFIG_FILE = os.path.join(base_path, "..", "config", "asb_wazigate_config.json")

CLIENT_POLL_INTERVAL = 300  # in seconds, smaller than PLANT_UPDATE_INTERVAL

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

            # 1. Find (or create) the devices and their sensors on WaziGate and store their IDs in the config file
            data = wazigate_EdgeAPI_util.sync_wazigate_devices(WAZIGATE_CONFIG_FILE)

            # 2. Publish plant data to WaziGate via MQTT
            biodigester_WaziGate_deviceName = list(data["devices"].keys())[0]
            chiller_WaziGate_deviceName = list(data["devices"].keys())[1]
            #wazigate_mqtt_publish_sensor_value(biodigester_WaziGate_deviceName, biodigester_data, data)
            #wazigate_mqtt_publish_sensor_value(chiller_WaziGate_deviceName, chiller_data, data)
            wazigate_post_sensor_value(biodigester_WaziGate_deviceName, biodigester_data, data)
            wazigate_post_sensor_value(chiller_WaziGate_deviceName, chiller_data, data)
            
            # 3. Process biodigester optimization metrics
            gas_production_processor.process_gas_production(biodigester_data, data)
            substrate_feeding_rate_processor.process_substrate_feeding_rate(biodigester_data, data)
            energy_processor.process_energy_output(chiller_data, data)

        except Exception as e:
            print(f"[CLIENT] Error: {e}")
            connected = False  # Force reconnect

        # Controlled polling
        next_cycle += CLIENT_POLL_INTERVAL
        delay = next_cycle - time.time()
        if delay > 0:
            time.sleep(delay)

def wazigate_mqtt_publish_sensor_value(device_name, sensor_values, data):
    device = data["devices"][device_name]
    device_id = device["device_id"]
    sensors = device["sensors"]

    for sensor_name, value in sensor_values.items():
        sensor_id = sensors.get(sensor_name, {}).get("wazigate_id")
        if not sensor_id:
            print(f"[CLIENT] MQTT publish skipped {device_name}/ {sensor_name}")
            continue
        wazigate_EdgeMQTT_util.publish_sensor_value(device_id, sensor_id, value)

def wazigate_post_sensor_value(device_name, sensor_values, data):
    device = data["devices"][device_name]
    device_id = device["device_id"]
    sensors = device["sensors"]

    for sensor_name, value in sensor_values.items():
        sensor_id = sensors.get(sensor_name, {}).get("wazigate_id")
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