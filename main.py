#!/bin/python
import os
import sys
import threading
import time

# Backend modules import each other as top-level packages (e.g. "from data_ingestion.wazigate import ...")
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend"))

# Import modules
from backend.data_ingestion.virtual_plant.biodigester_server.run_plant import run_virtual_plant
from backend.data_ingestion.edge_supervisory_client.run_client import run_supervisory_client
from backend.data_ingestion.wazigate.wazigate_EdgeMQTT_util import init_mqtt
from util_api.api_server import run_api_server

WAZIGATE_CONFIG_FILE = "backend/data_ingestion/config/asb_wazigate_config.json"

# Flags
START_VIRTUAL_PLANT = True
START_PLANT_SUPERVISORY_CLIENT = True
START_API_SERVER = True

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

    # --- Start API server for the frontend ---
    if START_API_SERVER:
        t3 = threading.Thread(
            target=run_api_server,
            name="APIServerThread",
            daemon=True
        )
        t3.start()
        threads.append(t3)
        print("[MAIN] API server started")

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