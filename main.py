#!/bin/python
import threading
import time

# Import modules
from data_ingestion.virtual_plant.biodigester_server.run_plant import run_virtual_plant
from data_ingestion.virtual_plant.edge_supervisory_client.run_client import run_supervisory_client
from data_ingestion.wazigate.wazigate_EdgeMQTT_util import init_mqtt

WAZIGATE_CONFIG_FILE = "data_ingestion/config/asb_wazigate_config.json"

# Flags
START_VIRTUAL_PLANT = True
START_PLANT_SUPERVISORY_CLIENT = True
    
def main():
    print("[MAIN] Starting system...")
    #init_mqtt()

    threads = []
    # --- Start virtual biodigester data streamer (Server) ---
    if START_VIRTUAL_PLANT:
        t1 = threading.Thread(
            target=run_virtual_plant,
            name="BiodigesterDataThread",
            daemon=True
        )
        t1.start()
        threads.append(t1)

        print("[MAIN] Biodigester started")
        # Give the server time to boot
        #time.sleep(2)

    # --- Start supervisory system to receive data from the plant (Client) ---
    if START_PLANT_SUPERVISORY_CLIENT:
        t2 = threading.Thread(
            target=run_supervisory_client,
            name="SupervisoryClientThread",
            daemon=True
        )
        t2.start()
        threads.append(t2)
        print("[MAIN] Client started")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[MAIN] Shutting down...")

    """
    # Keep main thread alive
    try:
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        print("\n[MAIN] Shutting down...")
    """
if __name__ == "__main__":
    main()