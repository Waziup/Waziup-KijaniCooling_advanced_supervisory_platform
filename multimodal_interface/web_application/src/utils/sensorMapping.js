// ==========================================
// --- System Sensor Configuration ---
// Maps exact Device Names to their respective Sensor Keys
// ==========================================

export const SYSTEM_CONFIG = {
  "KijaniCooling ASB-biodigester": {
    sensors: [
      // Electrical / Status
      "si_01", "al_01", "wi_02", "si_02", "al_02", "hoa_02", 
      "si_03", "al_03", "ki_03", "li_03", "fsdl_03", "fsdh_03", 
      "ki_04", "j_04", "hoa_01", "si_07", "al_07", "hoa_07", 
      "ki_07", "j_07", "lsdh_07", "si_06", "al_06",
      
      // Process Monitoring
      "fit_04", "ti_06_1", "ti_06_2", "ty_06", "lit_06", 
      "lahh_06", "lah_06", "lal_06", "ti_06_4", "pi_06_3", 
      "pi_11", "pi_14", "ti_14", "fit_13", "ti_15", "ti_16"
    ]
  },
  
  "KijaniCooling ASB-chiller": {
    sensors: [
      // Flow, Pressure & Pumps
      "vg1", "vh1", "vc1", "vc2", "pc1", "pg1", "ch1", "cc1", "cc2",
      
      // Temperature
      "tg1", "th1", "th2", "th3", "th4", "tc1", "tc2", 
      "tc3", "tc4", "tc5", "tc6", "tc7", "tc8", "tc9"
    ]
  },

  "KijaniCooling ASB metrics": {
    sensors: [
      // Performance Metrics
      "energy_output", "gas_production", "substrate_feeding_rate"
    ]
  }
};