#!/bin/python

import plant_variables as plant_variables
from pyModbusTCP.server import ModbusServer, DataBank
from time import sleep
import random

# Create an instance of ModbusServer
server = ModbusServer("127.0.0.1", 12345, no_block=True)

def generate_chiller_data(debug_print):
    # generate random values for chiller sensor values
    plant_variables.vg1 = round(random.uniform(plant_variables.chiller_flowrate_min, plant_variables.chiller_flowrate_max), 2)
    plant_variables.vh1 = round(random.uniform(plant_variables.chiller_flowrate_min, plant_variables.chiller_flowrate_max), 2)
    plant_variables.vc1 = round(random.uniform(plant_variables.chiller_flowrate_min, plant_variables.chiller_flowrate_max), 2)
    plant_variables.vc2 = round(random.uniform(plant_variables.chiller_flowrate_min, plant_variables.chiller_flowrate_max), 2)
    plant_variables.pc1 = round(random.uniform(plant_variables.chiller_pressure_min, plant_variables.chiller_pressure_max), 2)
    plant_variables.pg1 = round(random.uniform(plant_variables.chiller_pressure_min, plant_variables.chiller_pressure_max), 2)
    plant_variables.tg1 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.th1 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.th2 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.th3 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.th4 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc1 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc2 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc3 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc4 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc5 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc6 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc7 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc8 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)
    plant_variables.tc9 = round(random.uniform(plant_variables.chiller_temp_min, plant_variables.chiller_temp_max), 2)

    if debug_print:
        print("*** Chiller sensor values: ***")
        print(f"Sensor vg1 = {plant_variables.vg1}")
        print(f"Sensor vh1 = {plant_variables.vh1}")
        print(f"Sensor vc1 = {plant_variables.vc1}")
        print(f"Sensor vc2 = {plant_variables.vc2}")
        print(f"Sensor pc1 = {plant_variables.pc1}")
        print(f"Sensor pg1 = {plant_variables.pg1}")
        print(f"Sensor tg1 = {plant_variables.tg1}")
        print(f"Sensor th1 = {plant_variables.th1}")
        print(f"Sensor th2 = {plant_variables.th2}")
        print(f"Sensor th3 = {plant_variables.th3}")
        print(f"Sensor th4 = {plant_variables.th4}")
        print(f"Sensor tc1 = {plant_variables.tc1}")
        print(f"Sensor tc2 = {plant_variables.tc2}")
        print(f"Sensor tc3 = {plant_variables.tc3}")
        print(f"Sensor tc4 = {plant_variables.tc4}")
        print(f"Sensor tc5 = {plant_variables.tc5}")
        print(f"Sensor tc6 = {plant_variables.tc6}")
        print(f"Sensor tc7 = {plant_variables.tc7}")
        print(f"Sensor tc8 = {plant_variables.tc8}")
        print(f"Sensor tc9 = {plant_variables.tc9}")
        print("**********************")

def communicate_chiller_data():
    # send sensor data and receive output data via ModbusTCP
    server.data_bank.set_input_registers(0, [plant_variables.vg1]) # register address, value
    server.data_bank.set_input_registers(1, [plant_variables.vh1]) # register address, value
    server.data_bank.set_input_registers(2, [plant_variables.vc1]) # register address, value
    server.data_bank.set_input_registers(3, [plant_variables.vc2]) # register address, value
    server.data_bank.set_input_registers(4, [plant_variables.pc1]) # register address, value
    server.data_bank.set_input_registers(5, [plant_variables.pg1]) # register address, value
    server.data_bank.set_input_registers(6, [plant_variables.tg1]) # register address, value
    server.data_bank.set_input_registers(7, [plant_variables.th1]) # register address, value
    server.data_bank.set_input_registers(8, [plant_variables.th2]) # register address, value
    server.data_bank.set_input_registers(9, [plant_variables.th3]) # register address, value
    server.data_bank.set_input_registers(10, [plant_variables.th4]) # register address, value
    server.data_bank.set_input_registers(11, [plant_variables.tc1]) # register address, value
    server.data_bank.set_input_registers(12, [plant_variables.tc2]) # register address, value
    server.data_bank.set_input_registers(13, [plant_variables.tc3]) # register address, value
    server.data_bank.set_input_registers(14, [plant_variables.tc4]) # register address, value
    server.data_bank.set_input_registers(15, [plant_variables.tc5]) # register address, value
    server.data_bank.set_input_registers(16, [plant_variables.tc6]) # register address, value
    server.data_bank.set_input_registers(17, [plant_variables.tc7]) # register address, value
    server.data_bank.set_input_registers(18, [plant_variables.tc8]) # register address, value
    server.data_bank.set_input_registers(19, [plant_variables.tc9]) # register address, value

    print("*** Chiller actuator states: ***")
    # Process coil states set by a client
    new_ch1_state = server.data_bank.get_coils(1, 1)[0]   
    print("Value of ch1 has changed to " + str(new_ch1_state)) if plant_variables.ch1 != new_ch1_state else None
    plant_variables.ch1 = new_ch1_state

    new_cc1_state = server.data_bank.get_coils(2, 1)[0]  
    print("Value of cc1 has changed to " + str(new_cc1_state)) if plant_variables.cc1 != new_cc1_state else None
    plant_variables.cc1 = new_cc1_state

    new_cc2_state = server.data_bank.get_coils(3, 1)[0]  
    print("Value of cc2 has changed to " + str(new_cc2_state)) if plant_variables.cc2 != new_cc2_state else None
    plant_variables.cc2 = new_cc2_state
    print("**********************")

    print(f"[Raw] Coils: ch1={new_ch1_state}, cc1={new_cc1_state}, cc2={new_cc2_state}")


try:
    print("Starting server...")
    server.start()
    # initialize the coils
    server.data_bank.set_coils(1, [False])  # ch1
    server.data_bank.set_coils(2, [False])  # cc1
    server.data_bank.set_coils(3, [False])  # cc2

    print("Server is online")
    while True:
        generate_chiller_data(False) # parameter for printing generated values
        communicate_chiller_data()
        sleep(4)

except:
    print("Shutting down server ...")
    server.stop()
    print("Server is offline")