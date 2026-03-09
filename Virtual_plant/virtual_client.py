from pyModbusTCP.client import ModbusClient
from time import sleep

client = ModbusClient(host = "127.0.0.1", port=12345)
#client.open()

def chiller_sensor_values():
    vg1 = client.read_input_registers(0, 1)[0]
    vh1 = client.read_input_registers(1, 1)[0]
    vc1 = client.read_input_registers(2, 1)[0]
    vc2 = client.read_input_registers(3, 1)[0]
    pc1 = client.read_input_registers(4, 1)[0]
    pg1 = client.read_input_registers(5, 1)[0]
    tg1 = client.read_input_registers(6, 1)[0]
    th1 = client.read_input_registers(7, 1)[0]
    th2 = client.read_input_registers(8, 1)[0]
    th3 = client.read_input_registers(9, 1)[0]
    th4 = client.read_input_registers(10, 1)[0]
    tc1 = client.read_input_registers(11, 1)[0]
    tc2 = client.read_input_registers(12, 1)[0]
    tc3 = client.read_input_registers(13, 1)[0]
    tc4 = client.read_input_registers(14, 1)[0]
    tc5 = client.read_input_registers(15, 1)[0]
    tc6 = client.read_input_registers(16, 1)[0]
    tc7 = client.read_input_registers(17, 1)[0]
    tc8 = client.read_input_registers(18, 1)[0]
    tc9 = client.read_input_registers(19, 1)[0]

    print("*** Chiller sensor values: ***")
    print(f"Sensor vg1 = {vg1}")
    print(f"Sensor vh1 = {vh1}")
    print(f"Sensor vc1 = {vc1}")
    print(f"Sensor vc2 = {vc2}")
    print(f"Sensor pc1 = {pc1}")
    print(f"Sensor pg1 = {pg1}")
    print(f"Sensor tg1 = {tg1}")
    print(f"Sensor th1 = {th1}")
    print(f"Sensor th2 = {th2}")
    print(f"Sensor th3 = {th3}")
    print(f"Sensor th4 = {th4}")
    print(f"Sensor tc1 = {tc1}")
    print(f"Sensor tc2 = {tc2}")
    print(f"Sensor tc3 = {tc3}")
    print(f"Sensor tc4 = {tc4}")
    print(f"Sensor tc5 = {tc5}")
    print(f"Sensor tc6 = {tc6}")
    print(f"Sensor tc7 = {tc7}")
    print(f"Sensor tc8 = {tc8}")
    print(f"Sensor tc9 = {tc9}")
    print("**********************")

def actuators_off():
    print("Setting ch1, cc1, cc2 to 0..")
    client.write_single_coil(1, False) # ch1
    client.write_single_coil(2, False) # cc1
    client.write_single_coil(3, False) # cc2

def actuators_on():
    print("Setting ch1, cc1, cc2 to 1..")
    client.write_single_coil(1, True) # ch1
    client.write_single_coil(2, True) # cc1
    client.write_single_coil(3, True) # cc2

coil_states = {
    0: actuators_off,
    1: actuators_on
}

try:
    while True:
        if client.open():
                chiller_sensor_values()
                coil_states.get(0)()  # Set coil registers to 0
                sleep(1)
                coil_states.get(1)()  # Set coil registers to 1
                sleep(1)
        else:
            print("Could not connect to Modbus server..")

except ConnectionRefusedError:
    print("Connection refused: Modbus server is likely not running or accessible.")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    client.close()
"""
try:
    while True:
        coil_states.get(0)()  # Set coil registers to 0
        sleep(5)
        coil_states.get(1)()  # Set coil registers to 1
        sleep(5)

except:
    print("Exiting!")
"""