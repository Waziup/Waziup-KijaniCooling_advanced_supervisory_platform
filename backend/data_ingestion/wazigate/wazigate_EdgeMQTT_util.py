import json
import paho.mqtt.client as mqtt
import time

#MQTT_BROKER = "wazigate.local"
MQTT_BROKER = "localhost"
MQTT_PORT = 1883

client = None
MQTT_CONNECTED = False
"""
def init_mqtt(broker = MQTT_BROKER):
    global client

    client = mqtt.Client()
    client.connect(broker, MQTT_PORT, 60)
    client.loop_start()

    print("[WAZIGATE EDGE MQTT] Connected")

def on_connect(client, userdata, flags, rc):
    global MQTT_CONNECTED

    if rc == 0:
        MQTT_CONNECTED = True
        print("[WAZIGATE EDGE MQTT] Connected successfully")
    else:
        print(f"[WAZIGATE EDGE MQTT] Connection failed with code {rc}")
"""
def on_connect(client, userdata, flags, rc):
    global MQTT_CONNECTED

    if rc == 0:
        MQTT_CONNECTED = True
        print("[WAZIGATE EDGE MQTT] Connected successfully")
    else:
        print(f"[WAZIGATE EDGE MQTT] Connection failed with code {rc}")

def on_disconnect(client, userdata, rc):
    global MQTT_CONNECTED
    MQTT_CONNECTED = False
    print("[WAZIGATE EDGE MQTT] Disconnected!")

    while not MQTT_CONNECTED:
        try:
            print("[WAZIGATE EDGE MQTT] Attempting reconnect...")
            client.reconnect()
            time.sleep(2)
        except Exception as e:
            print(f"[WAZIGATE EDGE MQTT] Reconnect failed: {e}")
            time.sleep(5)

def init_mqtt(broker = MQTT_BROKER, timeout = 10):
    global client, MQTT_CONNECTED
    client = mqtt.Client()
    # callbacks
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    print("[WAZIGATE EDGE MQTT] Connecting...")
    start_time = time.time()
    while True:
        try:
            client.connect(broker, MQTT_PORT, 60)
            client.loop_start()

            # wait until connected or timeout
            while not MQTT_CONNECTED:
                if time.time() - start_time > timeout:
                    raise TimeoutError("[WAZIGATE EDGE MQTT] Connection timeout")
                time.sleep(0.2)

            break  # when successfully connected

        except Exception as e:
            print(f"[WAZIGATE EDGE MQTT] Connection attempt failed: {e}")

            if time.time() - start_time > timeout:
                print("[WAZIGATE EDGE MQTT] No broker found (timeout reached)")
                raise

            time.sleep(2)  # wait before retry

def publish_sensor_value(device_id, sensor_id, value):
    global client
    if not MQTT_CONNECTED:
        print("[WAZIGATE EDGE MQTT] Not connected, skipping publish")
        return

    #topic = f"/devices/{device_id}/{sensor_id}/value"
    #topic = f"/devices/{device_id}/{sensor_id}/value"
    #topic = f"devices/{device_id}/{sensor_id}/"
    topic = f"devices/{device_id}/{sensor_id}"
    payload = json.dumps({"value": str(value)})
    #payload = json.dumps({"value": str(value)})
    #payload = value

    client.publish(topic, payload)

    print(f"[WAZIGATE EDGE MQTT] Published {value} : {topic}")