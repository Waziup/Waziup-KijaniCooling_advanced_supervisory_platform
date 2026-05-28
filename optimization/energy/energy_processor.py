"""
Energy optimization processor for KijaniBox ASB Chiller unit.
Processes chiller sensor data and calculates energy output metrics.
"""

from data_ingestion.wazigate import wazigate_EdgeAPI_util

show_debug_print = True

def process_energy_output(sensor_values, config):
    """
    Process chiller sensor data and calculate energy output.
    
    Args:
        sensor_values (dict): Dictionary containing chiller sensor values
                             e.g., {'vg1': 10, 'vg2': 20, 'tc1': 30, ...}
        config (dict): WaziGate configuration dictionary loaded from asb_wazigate_config.json
    
    Returns:
        bool: True if processing and posting was successful, False otherwise
    """
    try:
        # Extract relevant sensor values for energy calculation
        # For now, using simple sensor values
        vg1 = sensor_values.get('vg1', 0)
        vg2 = sensor_values.get('vg2', 0)
        tc1 = sensor_values.get('tc1', 0)
        tc2 = sensor_values.get('tc2', 0)
        
        # Simple energy calculation for now
        energy_output = vg1 + vg2 + tc1 + tc2
        
        if show_debug_print:
            print(f"[ENERGY PROCESSOR] Calculated energy output: {energy_output}")
            print(f"[ENERGY PROCESSOR] Components - vg1: {vg1}, vg2: {vg2}, tc1: {tc1}, tc2: {tc2}")
        
        # Get KijaniBox ASB metrics device configuration
        metrics_device_name = "KijaniBox ASB metrics"
        if metrics_device_name not in config.get("devices", {}):
            print(f"[ENERGY PROCESSOR] Error: {metrics_device_name} not found in config")
            return False
        
        metrics_device = config["devices"][metrics_device_name]
        metrics_device_id = metrics_device.get("device_id")
        
        if not metrics_device_id:
            print(f"[ENERGY PROCESSOR] Error: device_id not set for {metrics_device_name}")
            return False
        
        sensor_id = metrics_device.get("sensors", {}).get("energy_output")
        if not sensor_id:
            print(f"[ENERGY PROCESSOR] Error: energy_output sensor_id not found in config")
            return False
        
        # Post the calculated energy output to WaziGate
        wazigate_EdgeAPI_util.post_sensor_value(metrics_device_id, sensor_id, energy_output)
        
        if show_debug_print:
            print(f"[ENERGY PROCESSOR] Successfully posted energy_output to WaziGate")
        
        return True
        
    except Exception as e:
        print(f"[ENERGY PROCESSOR] Error processing energy output: {e}")
        return False
