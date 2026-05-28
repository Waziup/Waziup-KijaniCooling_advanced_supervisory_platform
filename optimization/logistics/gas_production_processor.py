"""
Biodigester optimization processor for gas production calculation.
Processes biodigester sensor data and calculates gas production metrics.
"""

from data_ingestion.wazigate import wazigate_EdgeAPI_util

show_debug_print = True

def process_gas_production(sensor_values, config):
    """
    Process biodigester sensor data and calculate gas production.
    
    Args:
        sensor_values (dict): Dictionary containing biodigester sensor values
                             e.g., {'fit_13': 10, 'pi_06_3': 20, 'pi_11': 15, ...}
        config (dict): WaziGate configuration dictionary loaded from asb_wazigate_config.json
    
    Returns:
        bool: True if processing and posting was successful, False otherwise
    """
    try:
        # Extract relevant sensor values for gas production calculation
        # For now, using simple math - sum key gas production parameters
        fit_13 = sensor_values.get('fit_13', 0)
        pi_06_3 = sensor_values.get('pi_06_3', 0)
        pi_11 = sensor_values.get('pi_11', 0)
        
        # Simple gas production calculation: sum of relevant parameters
        # This can be enhanced with more sophisticated calculations later
        gas_production = fit_13 + pi_06_3 + pi_11
        
        if show_debug_print:
            print(f"[GAS PRODUCTION PROCESSOR] Calculated gas production: {gas_production}")
            print(f"[GAS PRODUCTION PROCESSOR] Components - fit_13: {fit_13}, pi_06_3: {pi_06_3}, pi_11: {pi_11}")
        
        # Get KijaniBox ASB metrics device configuration
        metrics_device_name = "KijaniBox ASB metrics"
        if metrics_device_name not in config.get("devices", {}):
            print(f"[GAS PRODUCTION PROCESSOR] Error: {metrics_device_name} not found in config")
            return False
        
        metrics_device = config["devices"][metrics_device_name]
        metrics_device_id = metrics_device.get("device_id")
        
        if not metrics_device_id:
            print(f"[GAS PRODUCTION PROCESSOR] Error: device_id not set for {metrics_device_name}")
            return False
        
        sensor_id = metrics_device.get("sensors", {}).get("gas_production")
        if not sensor_id:
            print(f"[GAS PRODUCTION PROCESSOR] Error: gas_production sensor_id not found in config")
            return False
        
        # Post the calculated gas production to WaziGate
        wazigate_EdgeAPI_util.post_sensor_value(metrics_device_id, sensor_id, gas_production)
        
        if show_debug_print:
            print(f"[GAS PRODUCTION PROCESSOR] Successfully posted gas_production to WaziGate")
        
        return True
        
    except Exception as e:
        print(f"[GAS PRODUCTION PROCESSOR] Error processing gas production: {e}")
        return False
