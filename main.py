#!/bin/python
import threading
import time

# Import existing modules
from data_ingestion.virtual_plant.biodigester_server.run_plant import run_virtual_plant
from data_ingestion.virtual_plant.client.run_client import run_plant_client

# Flags
START_VIRTUAL_PLANT = True
START_PLANT_RECEIVER_CLIENT = True

def main():
    print("[MAIN] Starting system...")

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

    # --- Start client to receive data from the plant (Client) ---
    if START_PLANT_RECEIVER_CLIENT:
        t2 = threading.Thread(
            target=run_plant_client,
            name="BiodigesterClientThread",
            daemon=True
        )
        t2.start()
        threads.append(t2)

        print("[MAIN] Client started")

    print("\n[MAIN] System running...\n")

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