import json
import random
from time import sleep

biodigester_parameters_file = "biodigester_parameters.json"
chiller_parameters_file = "chiller_parameters.json"

# Dictionary to hold the signal types and values
biodigester_signal_types = {}
biodigester_signal_values = {}

chiller_signal_types = {}
chiller_signal_values = {}

plant_signal_types = {
    "biodigester": biodigester_signal_types,
    "chiller": chiller_signal_types
}

def load_signals_from_json(json_path, plant_component, debugging_print):
    """
    Load the JSON file and populate the global signal_types dictionary
    with signal names and their corresponding types.
    """
    global biodigester_signal_types
    global chiller_signal_types

    with open(json_path) as file:
        data = json.load(file)

    # Choose the correct signal_types dict
    signal_types_dict = biodigester_signal_types if plant_component == "biodigester" else (
        chiller_signal_types if plant_component == "chiller" else None
    )

    if signal_types_dict is None:
        print("Unknown plant component has been passed!")
        return

    # Dynamically handle nested or flat structures of the JSON files
    for key, item in data.items():
        if 'signals' in item and 'type' in item:
            for signal in item['signals']:
                signal_clean = signal.replace(" ", "_")
                signal_types_dict[signal_clean] = item['type'].lower()
        else:
            # Fallback for nested structure like biodigester
            for sub_key, sub_item in item.items():
                if 'signals' in sub_item and 'type' in sub_item:
                    for signal in sub_item['signals']:
                        signal_clean = signal.replace(" ", "_")
                        signal_types_dict[signal_clean] = sub_item['type'].lower()

    if debugging_print:
            print(f"{plant_component} signal types:")
            print(plant_signal_types.get(plant_component, "Unknown plant component"))


def generate_random_values(plant_component):
    """
    Generate random values for each signal in signal_types based on their type:
        - numerical: random number
        - discrete: random boolean state
    """
    global biodigester_signal_values
    global chiller_signal_values

    if plant_component == "biodigester":
        for bio_signal, bio_sig_type in biodigester_signal_types.items():
            if bio_sig_type == "numerical":
                    biodigester_signal_values[bio_signal] = round(random.uniform(0, 10), 2)
            elif bio_sig_type == "discrete":
                    biodigester_signal_values[bio_signal] = random.choice([True, False])
    elif plant_component == "chiller":
        for chiller_signal, chiller_sig_type in chiller_signal_types.items():
            if chiller_sig_type == "numerical":
                    chiller_signal_values[chiller_signal] = round(random.uniform(0, 10), 2)
            elif chiller_sig_type == "discrete":
                    chiller_signal_values[chiller_signal] = random.choice([True, False])
    else:
        print("Unkown plant component has been passed!")


def print_signals():
    
    print("*********** Biodigester parameters: ***********")
    for biodigester_signal, biodigester_value in biodigester_signal_values.items():
        print(f"{biodigester_signal} = {biodigester_value}")
    
    print("*********** Chiller parameters: ***********")
    for chiller_signal, chiller_value in chiller_signal_values.items():
        print(f"{chiller_signal} = {chiller_value}")

    print("******************************************************")


load_signals_from_json(biodigester_parameters_file, "biodigester", "true")  # path to JSON file
load_signals_from_json(chiller_parameters_file, "chiller", "true")


try:
    while True:
        generate_random_values("biodigester")
        generate_random_values("chiller")
        print_signals()
        sleep(10)

except:
    print("Exiting!")
