"""
Biodigester optimization processor for substrate feeding rate calculation.
Processes biodigester sensor data and calculates substrate feeding rate metrics.
"""

from data_ingestion.wazigate import wazigate_EdgeAPI_util

show_debug_print = True

def process_substrate_feeding_rate(sensor_values, config):
    """
    Process biodigester sensor data and calculate substrate feeding rate.
    
    Args:
        sensor_values (dict): Dictionary containing biodigester sensor values
                             e.g., {'fit_13': 10, 'pi_06_3': 20, 'lit_06': 50, ...}
        config (dict): WaziGate configuration dictionary loaded from asb_wazigate_config.json
    
    Returns:
        bool: True if processing and posting was successful, False otherwise
    """
    try:
        # Extract relevant sensor values for substrate feeding rate calculation
        # For now, using simple math - weighted sum of key parameters
        fit_13 = sensor_values.get('fit_13', 0)
        lit_06 = sensor_values.get('lit_06', 0)
        ti_06_1 = sensor_values.get('ti_06_1', 0)
        
        # Simple substrate feeding rate calculation: weighted sum of relevant parameters
        # This can be enhanced with more sophisticated calculations later
        substrate_feeding_rate = fit_13 + (lit_06 * 0.5) + (ti_06_1 * 0.1)
        
        if show_debug_print:
            print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Calculated substrate feeding rate: {substrate_feeding_rate}")
            print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Components - fit_13: {fit_13}, lit_06: {lit_06}, ti_06_1: {ti_06_1}")
        
        # Get KijaniCooling ASB metrics device configuration
        metrics_device_name = "KijaniCooling ASB metrics"
        if metrics_device_name not in config.get("devices", {}):
            print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Error: {metrics_device_name} not found in config")
            return False
        
        metrics_device = config["devices"][metrics_device_name]
        metrics_device_id = metrics_device.get("device_id")
        
        if not metrics_device_id:
            print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Error: device_id not set for {metrics_device_name}")
            return False
        
        sensor_id = metrics_device.get("sensors", {}).get("substrate_feeding_rate")
        if not sensor_id:
            print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Error: substrate_feeding_rate sensor_id not found in config")
            return False
        
        # Post the calculated substrate feeding rate to WaziGate
        wazigate_EdgeAPI_util.post_sensor_value(metrics_device_id, sensor_id, substrate_feeding_rate)
        
        if show_debug_print:
            print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Successfully posted substrate_feeding_rate to WaziGate")
        
        return True
        
    except Exception as e:
        print(f"[SUBSTRATE FEEDING RATE PROCESSOR] Error processing substrate feeding rate: {e}")
        return False
