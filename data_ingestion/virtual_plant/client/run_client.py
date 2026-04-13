from pyModbusTCP.client import ModbusClient
import time

client = ModbusClient(host = "127.0.0.1", port=12345)

CLIENT_POLL_INTERVAL = 8  # in seconds, smaller than PLANT_UPDATE_INTERVAL

def get_chiller_sensor_values(debug_print):
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

    if debug_print:
        print("--- Chiller sensor values: ---")
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

def chiller_actuators_off():
    print("Setting ch1, cc1, cc2 to 0..")
    client.write_single_coil(1, False) # ch1
    client.write_single_coil(2, False) # cc1
    client.write_single_coil(3, False) # cc2

def chiller_actuators_on():
    print("Setting ch1, cc1, cc2 to 1..")
    client.write_single_coil(1, True) # ch1
    client.write_single_coil(2, True) # cc1
    client.write_single_coil(3, True) # cc2

chiller_actuator_coil_states = {
    0: chiller_actuators_off,
    1: chiller_actuators_on
}

def get_biodigester_sensor_values(debug_print):
    si_01 = client.read_input_registers(20, 1)[0]
    al_01 = client.read_input_registers(21, 1)[0]
    wi_02 = client.read_input_registers(22, 1)[0]
    si_02 = client.read_input_registers(23, 1)[0]
    al_02 = client.read_input_registers(24, 1)[0]
    hoa_02 = client.read_input_registers(25, 1)[0]
    si_03 = client.read_input_registers(26, 1)[0]
    al_03 = client.read_input_registers(27, 1)[0]
    ki_03 = client.read_input_registers(28, 1)[0]
    li_03 = client.read_input_registers(29, 1)[0]
    fsdl_03 = client.read_input_registers(30, 1)[0]
    fsdh_03 = client.read_input_registers(31, 1)[0]
    ki_04 = client.read_input_registers(32, 1)[0]
    j_04 = client.read_input_registers(33, 1)[0]
    hoa_01 = client.read_input_registers(34, 1)[0]
    fit_04 = client.read_input_registers(35, 1)[0]
    ti_06_1 = client.read_input_registers(36, 1)[0]
    ti_06_2 = client.read_input_registers(37, 1)[0]
    ty_06 = client.read_input_registers(38, 1)[0]
    lit_06 = client.read_input_registers(39, 1)[0]
    lahh_06 = client.read_input_registers(40, 1)[0]
    lah_06 = client.read_input_registers(41, 1)[0]
    lal_06 = client.read_input_registers(42, 1)[0]
    ti_06_4 = client.read_input_registers(43, 1)[0]
    pi_06_3 = client.read_input_registers(44, 1)[0]
    pi_11 = client.read_input_registers(45, 1)[0]
    pi_14 = client.read_input_registers(46, 1)[0]
    ti_14 = client.read_input_registers(47, 1)[0]
    fit_13 = client.read_input_registers(48, 1)[0]
    si_07 = client.read_input_registers(49, 1)[0]
    al_07 = client.read_input_registers(50, 1)[0]
    hoa_07 = client.read_input_registers(51, 1)[0]
    ki_07 = client.read_input_registers(52, 1)[0]
    j_07 = client.read_input_registers(53, 1)[0]
    lsdh_07 = client.read_input_registers(54, 1)[0]
    si_06 = client.read_input_registers(55, 1)[0]
    al_06 = client.read_input_registers(56, 1)[0]
    ti_15 = client.read_input_registers(57, 1)[0]
    ti_16 = client.read_input_registers(58, 1)[0]

    if debug_print:
        print("--- Biodigester process states: ---")
        print(f"Grinder (M01) status SI_01 = {si_01}")
        print(f"Grinder (M01) alarm status AL_01 = {al_01}")
        print(f"Mixing tank (TK02) load cells WI_02 = {wi_02}")
        print(f"Slurry pump (M02) status SI_02 = {si_02}")
        print(f"Slurry pump (M02) alarm status AL_02 = {al_02}")
        print(f"Storing tank (TK03) stirrer M03 status SI_03= {si_03}")
        print(f"Storing tank (TK03) stirrer M03 alarm status AL_03= {al_03}")
        print(f"Storing tank (TK03) stirrer M03 time status KI_03 = {ki_03}")
        print(f"Storing tank (TK03) level sensor LI_03 = {li_03}")
        print(f"Storing tank (TK03) level sensor too low FSDL_03 = {fsdl_03}")
        print(f"Storing tank (TK03) level sensor too high FSDH_03 = {fsdh_03}")
        print(f"Feeding pump (M04) status SI_02 = {si_02}")
        print(f"Feeding pump (M04) alarm status AL_02 = {al_02}")
        print(f"Feeding pump (M04) hand/auto switch HOA_02 = {hoa_02}")
        print(f"Feeding pump (M04) time setting KI_04 = {ki_04}")
        print(f"Feeding pump (M04) inverter J_04 = {j_04}")
        print(f"Feeding pump (M04) hand/auto switch HOA_01 = {hoa_01}")
        print(f"Substrate flow meter FIT_04 = {fit_04}")
        print(f"Biodigester substrate temperature TE_06_1 = {ti_06_1}")
        print(f"Biodigester substrate temperature TE_06_2 = {ti_06_2}")
        print(f"Biodigester substrate temperature (TE 06-1/2) TY_06 = {ty_06}")
        print(f"Biodigester substrate level LIT_06 = {lit_06}")
        print(f"Biodigester substrate level very high LAHH_06 = {lahh_06}")
        print(f"Biodigester substrate level high LAH_06 = {lah_06}")
        print(f"Biodigester substrate level low LAL_06 = {lal_06}")
        print(f"Biogas temperature (TE 06 4) = {ti_06_4}")
        print(f"Biogas temperature (TE 06 4) = {ti_06_4}")
        print(f"Biogas pressure (PT 06 3) = {pi_06_3}")
        print(f"Biogas pressure PI_11 = {pi_11}")
        print(f"Biogas pressure PI_14 = {pi_14}")
        print(f"Biogas temperature TI_14 = {ti_14}")
        print(f"Biogas output flowrate FIT_13 = {fit_13}")
        print(f"Digestate pump (M07) status SI_07  = {si_07}")
        print(f"Digestate pump (M07) alarm status AL_07 = {al_07}")
        print(f"Digestate pump (M07) hand/auto switch HOA_07 = {hoa_07}")
        print(f"Digestate pump (M07) time setting KI_07 = {ki_07}")
        print(f"Digestate pump (M07) inverter J_07 = {j_07}")
        print(f"Digestate pump (M07) hand/auto switch LSDH_07 = {lsdh_07}")
        print(f"Substrate recycling pump (M06) status SI_06 = {si_06}")
        print(f"Substrate recycling pump (M06) alarm status AL_06= {al_06}")
        print(f"Substrate recycling pump (M06) inverter J_07 = {j_07}")
        print(f"Substrate recycling temperature TI_15 = {ti_15}")
        print(f"Substrate recycling temperature TI_16 = {ti_16}")

def run_plant_client():
    print("[CLIENT] Starting plant client...")

    connected = False
    next_cycle = time.time()

    while True:
        # --- Ensure connection ---
        if not connected:
            connected = client.open()
            if not connected:
                print("[CLIENT] Could not connect to Modbus server...")
                time.sleep(1) 
                continue
            print("[CLIENT] Connected to server")

        try:
            # --- Read data ---
            get_chiller_sensor_values(True)
            get_biodigester_sensor_values(True)

            """
            # --- Actuate ---
            chiller_actuator_coil_states.get(0)()
            chiller_actuator_coil_states.get(1)()
            """

            print("----------------------")

        except Exception as e:
            print(f"[CLIENT] Error: {e}")
            connected = False  # Force reconnect

        # Controlled polling
        next_cycle += CLIENT_POLL_INTERVAL
        delay = next_cycle - time.time()
        if delay > 0:
            time.sleep(delay)

""""
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