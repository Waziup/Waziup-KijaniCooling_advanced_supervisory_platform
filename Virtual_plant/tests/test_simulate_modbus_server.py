#!/bin/python

from pyModbusTCP.server import ModbusServer, DataBank
from time import sleep
from random import uniform

# Create an instance of ModbusServer
server = ModbusServer("127.0.0.1", 12345, no_block=True)

def send_data():
    server.data_bank.set_holding_registers(0, [int(uniform(0, 100))]) # write random value to register 0
try:
    print("Starting server...")
    server.start()
    print("Server is online")
    state = [0]
    while True:
        send_data()
        #server.data_bank.set_holding_registers(0, [int(uniform(0, 100))]) # write random value to register 0
        #DataBank.set_words(0, [int(uniform(0, 100))])  # write random value to register 0
        if state !=  server.data_bank.get_holding_registers(1):
        #if state != DataBank.get_words(1):
            state =  server.data_bank.get_holding_registers(1)
            #state = DataBank.get_words(1)
            print("Value of Register 1 has changed to " +str(state))
        sleep(0.5)

except:
    print("Shutdown server ...")
    server.stop()
    print("Server is offline")
