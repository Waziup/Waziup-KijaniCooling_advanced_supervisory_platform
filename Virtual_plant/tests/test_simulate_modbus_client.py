from pyModbusTCP.client import ModbusClient
client = ModbusClient(host = "127.0.0.1", port=12345)
client.open()

reg_0_data = client.read_holding_registers(0) # parameter is the register to read
print(f"Read data from register 0 = {reg_0_data}")
import random as rn

random_number = rn.randint(0, 100)
print(f"Random number = {random_number}")
client.write_single_register(1, random_number)