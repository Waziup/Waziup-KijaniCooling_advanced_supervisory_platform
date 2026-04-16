from . import plant_variables
from pyModbusTCP.server import ModbusServer
import time
import random

# Create an instance of ModbusServer
server = ModbusServer("127.0.0.1", 12345, no_block=True)

PLANT_UPDATE_INTERVAL = 20  # in seconds

show_debug_print = False

def generate_chiller_data():
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
    plant_variables.ch1 = not bool(random.getrandbits(1))
    plant_variables.cc1 = not bool(random.getrandbits(1))
    plant_variables.cc2 = not bool(random.getrandbits(1))

    if show_debug_print:
        print("[Chiller] Debug process values:")
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
        print(f"Actuator ch1 = {plant_variables.ch1}")
        print(f"Actuator cc1 = {plant_variables.cc1}")
        print(f"Actuator cc2 = {plant_variables.cc2}")
        print("**********************")

def communicate_chiller_data():
    # send sensor data and receive actuator states data via ModbusTCP
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
    server.data_bank.set_input_registers(20, [plant_variables.ch1]) # register address, value
    server.data_bank.set_input_registers(21, [plant_variables.cc1]) # register address, value
    server.data_bank.set_input_registers(22, [plant_variables.cc2]) # register address, value

def generate_biodigester_data():
    # generate random values for biogiester sensor values
    plant_variables.si_01   = not bool(random.getrandbits(1))
    plant_variables.al_01   = plant_variables.si_01
    plant_variables.wi_02   = round(random.uniform(plant_variables.load_cells_min, plant_variables.load_cells_max), 2)
    plant_variables.si_02   = not bool(random.getrandbits(1))
    plant_variables.al_02   = plant_variables.si_02
    plant_variables.hoa_02  = plant_variables.si_02
    plant_variables.si_03   = not bool(random.getrandbits(1))
    plant_variables.al_03   = plant_variables.si_03
    plant_variables.ki_03   = round(random.uniform(plant_variables.timers_value_min, plant_variables.timers_value_max), 2)
    plant_variables.li_03   = round(random.uniform(plant_variables.level_sensor_min, plant_variables.level_sensor_max), 2)
    plant_variables.fsdl_03 = (plant_variables.li_03 == plant_variables.level_sensor_min)
    plant_variables.fsdh_03 = (plant_variables.li_03 == plant_variables.level_sensor_max)
    plant_variables.ki_04   = round(random.uniform(plant_variables.timers_value_min, plant_variables.timers_value_max), 2)
    plant_variables.j_04    = round(random.uniform(plant_variables.inverters_frequency_min, plant_variables.timers_value_max), 2)
    plant_variables.hoa_01  = plant_variables.si_02
    plant_variables.fit_04  = round(random.uniform(plant_variables.substrate_flowrate_min, plant_variables.substrate_flowrate_max), 2)
    plant_variables.ti_06_1 = round(random.uniform(plant_variables.substrate_temperature_min, plant_variables.substrate_temperature_max), 2)
    plant_variables.ti_06_2 = round(random.uniform(plant_variables.substrate_temperature_min, plant_variables.substrate_temperature_max), 2)
    plant_variables.ty_06   = not bool(random.getrandbits(1))
    plant_variables.lit_06  = round(random.uniform(plant_variables.substrate_level_min, plant_variables.substrate_level_max), 2)
    plant_variables.lahh_06 = (plant_variables.lit_06 == plant_variables.substrate_level_highest_max)
    plant_variables.lah_06  = (plant_variables.lit_06 == plant_variables.substrate_level_max)
    plant_variables.lal_06  = (plant_variables.lit_06 == plant_variables.substrate_level_min)
    plant_variables.ti_06_4 = round(random.uniform(plant_variables.biogas_pressure_min, plant_variables.biogas_temperature_max), 2)
    plant_variables.pi_06_3 = round(random.uniform(plant_variables.biogas_pressure_min, plant_variables.biogas_pressure_max), 2)
    plant_variables.pi_11   = round(random.uniform(plant_variables.biogas_pressure_min, plant_variables.biogas_pressure_max), 2)
    plant_variables.pi_14   = round(random.uniform(plant_variables.biogas_pressure_min, plant_variables.biogas_pressure_max), 2)
    plant_variables.ti_14   = round(random.uniform(plant_variables.biogas_temperature_min, plant_variables.biogas_temperature_max), 2)
    plant_variables.fit_13  = round(random.uniform(plant_variables.biogas_output_flowrate_min, plant_variables.biogas_output_flowrate_max), 2)
    plant_variables.si_07   = not bool(random.getrandbits(1))
    plant_variables.al_07   = plant_variables.si_07
    plant_variables.hoa_07  = plant_variables.si_07
    plant_variables.ki_07   = round(random.uniform(plant_variables.timers_value_min, plant_variables.timers_value_max), 2)
    plant_variables.j_07    = round(random.uniform(plant_variables.inverters_frequency_min, plant_variables.timers_value_max), 2)
    plant_variables.lsdh_07 = not bool(random.getrandbits(1))
    plant_variables.si_06   = not bool(random.getrandbits(1))
    plant_variables.al_06   = plant_variables.si_06
    plant_variables.ti_15   = round(random.uniform(plant_variables.substrate_recycling_temperature_min, plant_variables.substrate_recycling_temperature_max), 2)
    plant_variables.ti_16   = round(random.uniform(plant_variables.substrate_recycling_temperature_min, plant_variables.substrate_recycling_temperature_max), 2)

    if show_debug_print:
        print("[Biodigester] Debug process values:")
        print(f"Grinder (M01) status SI_01 = {plant_variables.si_01}")
        print(f"Grinder (M01) alarm status AL_01 = {plant_variables.al_01}")
        print(f"Mixing tank (TK02) load cells WI_02 = {plant_variables.wi_02}")
        print(f"Slurry pump (M02) status SI_02 = {plant_variables.si_02}")
        print(f"Slurry pump (M02) alarm status AL_02 = {plant_variables.al_02}")
        print(f"Storing tank (TK03) stirrer M03 status SI_03= {plant_variables.si_03}")
        print(f"Storing tank (TK03) stirrer M03 alarm status AL_03= {plant_variables.al_03}")
        print(f"Storing tank (TK03) stirrer M03 time status KI_03 = {plant_variables.ki_03}")
        print(f"Storing tank (TK03) level sensor LI_03 = {plant_variables.li_03}")
        print(f"Storing tank (TK03) level sensor too low FSDL_03 = {plant_variables.fsdl_03}")
        print(f"Storing tank (TK03) level sensor too high FSDH_03 = {plant_variables.fsdh_03}")
        print(f"Feeding pump (M04) status SI_02 = {plant_variables.si_02}")
        print(f"Feeding pump (M04) alarm status AL_02 = {plant_variables.al_02}")
        print(f"Feeding pump (M04) hand/auto switch HOA_02 = {plant_variables.hoa_02}")
        print(f"Feeding pump (M04) time setting KI_04 = {plant_variables.ki_04}")
        print(f"Feeding pump (M04) inverter J_04 = {plant_variables.j_04}")
        print(f"Feeding pump (M04) hand/auto switch HOA_01 = {plant_variables.hoa_01}")
        print(f"Substrate flow meter FIT_04 = {plant_variables.fit_04}")
        print(f"Biodigester substrate temperature TE_06_1 = {plant_variables.ti_06_1}")
        print(f"Biodigester substrate temperature TE_06_2 = {plant_variables.ti_06_2}")
        print(f"Biodigester substrate temperature (TE 06-1/2) TY_06 = {plant_variables.ty_06}")
        print(f"Biodigester substrate level LIT_06 = {plant_variables.lit_06}")
        print(f"Biodigester substrate level very high LAHH_06 = {plant_variables.lahh_06}")
        print(f"Biodigester substrate level high LAH_06 = {plant_variables.lah_06}")
        print(f"Biodigester substrate level low LAL_06 = {plant_variables.lal_06}")
        print(f"Biogas temperature (TE 06 4) = {plant_variables.ti_06_4}")
        print(f"Biogas temperature (TE 06 4) = {plant_variables.ti_06_4}")
        print(f"Biogas pressure (PT 06 3) = {plant_variables.pi_06_3}")
        print(f"Biogas pressure PI_11 = {plant_variables.pi_11}")
        print(f"Biogas pressure PI_14 = {plant_variables.pi_14}")
        print(f"Biogas temperature TI_14 = {plant_variables.ti_14}")
        print(f"Biogas output flowrate FIT_13 = {plant_variables.fit_13}")
        print(f"Digestate pump (M07) status SI_07  = {plant_variables.si_07}")
        print(f"Digestate pump (M07) alarm status AL_07 = {plant_variables.al_07}")
        print(f"Digestate pump (M07) hand/auto switch HOA_07 = {plant_variables.hoa_07}")
        print(f"Digestate pump (M07) time setting KI_07 = {plant_variables.ki_07}")
        print(f"Digestate pump (M07) inverter J_07 = {plant_variables.j_07}")
        print(f"Digestate pump (M07) hand/auto switch LSDH_07 = {plant_variables.lsdh_07}")
        print(f"Substrate recycling pump (M06) status SI_06 = {plant_variables.si_06}")
        print(f"Substrate recycling pump (M06) alarm status AL_06= {plant_variables.al_06}")
        print(f"Substrate recycling pump (M06) inverter J_07 = {plant_variables.j_07}")
        print(f"Substrate recycling temperature TI_15 = {plant_variables.ti_15}")
        print(f"Substrate recycling temperature TI_16 = {plant_variables.ti_16}")
        print("**********************")


def communicate_biodigester_data():
    # Send sensor data via ModbusTCP
    server.data_bank.set_input_registers(23, [plant_variables.si_01]) # register address, value
    server.data_bank.set_input_registers(24, [plant_variables.al_01]) # register address, value
    server.data_bank.set_input_registers(25, [plant_variables.wi_02]) # register address, value
    server.data_bank.set_input_registers(26, [plant_variables.si_02]) # register address, value
    server.data_bank.set_input_registers(27, [plant_variables.al_02]) # register address, value
    server.data_bank.set_input_registers(28, [plant_variables.hoa_02]) # register address, value
    server.data_bank.set_input_registers(29, [plant_variables.si_03]) # register address, value
    server.data_bank.set_input_registers(30, [plant_variables.al_03]) # register address, value
    server.data_bank.set_input_registers(31, [plant_variables.ki_03]) # register address, value
    server.data_bank.set_input_registers(32, [plant_variables.li_03]) # register address, value
    server.data_bank.set_input_registers(33, [plant_variables.fsdl_03]) # register address, value
    server.data_bank.set_input_registers(34, [plant_variables.fsdh_03]) # register address, value
    server.data_bank.set_input_registers(35, [plant_variables.ki_04]) # register address, value
    server.data_bank.set_input_registers(36, [plant_variables.j_04]) # register address, value
    server.data_bank.set_input_registers(37, [plant_variables.hoa_01]) # register address, value
    server.data_bank.set_input_registers(38, [plant_variables.fit_04]) # register address, value
    server.data_bank.set_input_registers(39, [plant_variables.ti_06_1]) # register address, value
    server.data_bank.set_input_registers(40, [plant_variables.ti_06_2]) # register address, value
    server.data_bank.set_input_registers(41, [plant_variables.ty_06]) # register address, value
    server.data_bank.set_input_registers(42, [plant_variables.lit_06]) # register address, value
    server.data_bank.set_input_registers(43, [plant_variables.lahh_06]) # register address, value
    server.data_bank.set_input_registers(44, [plant_variables.lah_06]) # register address, value
    server.data_bank.set_input_registers(45, [plant_variables.lal_06]) # register address, value
    server.data_bank.set_input_registers(46, [plant_variables.ti_06_4]) # register address, value
    server.data_bank.set_input_registers(47, [plant_variables.pi_06_3]) # register address, value
    server.data_bank.set_input_registers(48, [plant_variables.pi_11]) # register address, value
    server.data_bank.set_input_registers(49, [plant_variables.pi_14]) # register address, value
    server.data_bank.set_input_registers(50, [plant_variables.ti_14]) # register address, value
    server.data_bank.set_input_registers(51, [plant_variables.fit_13]) # register address, value
    server.data_bank.set_input_registers(52, [plant_variables.si_07]) # register address, value
    server.data_bank.set_input_registers(53, [plant_variables.al_07]) # register address, value
    server.data_bank.set_input_registers(54, [plant_variables.hoa_07]) # register address, value
    server.data_bank.set_input_registers(55, [plant_variables.ki_07]) # register address, value
    server.data_bank.set_input_registers(56, [plant_variables.j_07]) # register address, value
    server.data_bank.set_input_registers(57, [plant_variables.lsdh_07]) # register address, value
    server.data_bank.set_input_registers(58, [plant_variables.si_06]) # register address, value
    server.data_bank.set_input_registers(59, [plant_variables.al_06]) # register address, value
    server.data_bank.set_input_registers(60, [plant_variables.ti_15]) # register address, value
    server.data_bank.set_input_registers(61, [plant_variables.ti_16]) # register address, value

def run_virtual_plant():
    print("[Plant connection] Starting virtual plant server...")
    server.start()
    """
    # initialize the coils
    server.data_bank.set_coils(1, [False])  # ch1
    server.data_bank.set_coils(2, [False])  # cc1
    server.data_bank.set_coils(3, [False])  # cc2
    """

    print("[Plant connection] Virtual plant is online")

    next_cycle = time.time()
    while True:
        generate_chiller_data() # parameter for printing generated values
        generate_biodigester_data()
        communicate_chiller_data()
        communicate_biodigester_data()
        
        # Timing control
        next_cycle += PLANT_UPDATE_INTERVAL
        delay = next_cycle - time.time()
        if delay > 0:
            time.sleep(delay)

"""
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
"""