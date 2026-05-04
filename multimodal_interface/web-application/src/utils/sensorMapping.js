const BIO_DEV = "69e77a4be8b3d558f03febf5";
const CHILL_DEV = "69e77a4be8b3d558f03febf6";

export const SENSOR_CONFIG = {
  // ==========================================
  // --- KijaniBox ASB-biodigester ---
  // ==========================================
  
  // Electrical / Status
  "69e77a4ce8b3d558f03febf7": { dev: BIO_DEV, key: "si_01" },
  "69e77a4ce8b3d558f03febf8": { dev: BIO_DEV, key: "al_01" },
  "69e77a4ce8b3d558f03febf9": { dev: BIO_DEV, key: "wi_02" },
  "69e77a4ce8b3d558f03febfa": { dev: BIO_DEV, key: "si_02" },
  "69e77a4ce8b3d558f03febfb": { dev: BIO_DEV, key: "al_02" },
  "69e77a4ce8b3d558f03febfc": { dev: BIO_DEV, key: "hoa_02" },
  "69e77a4de8b3d558f03febfd": { dev: BIO_DEV, key: "si_03" },
  "69e77a4de8b3d558f03febfe": { dev: BIO_DEV, key: "al_03" },
  "69e77a4de8b3d558f03febff": { dev: BIO_DEV, key: "ki_03" },
  "69e77a4de8b3d558f03fec00": { dev: BIO_DEV, key: "li_03" },
  "69e77a4de8b3d558f03fec01": { dev: BIO_DEV, key: "fsdl_03" },
  "69e77a4de8b3d558f03fec02": { dev: BIO_DEV, key: "fsdh_03" },
  "69e77a4de8b3d558f03fec03": { dev: BIO_DEV, key: "ki_04" },
  "69e77a4de8b3d558f03fec04": { dev: BIO_DEV, key: "j_04" },
  "69e77a4de8b3d558f03fec05": { dev: BIO_DEV, key: "hoa_01" },
  "69e77a4de8b3d558f03fec14": { dev: BIO_DEV, key: "si_07" },
  "69e77a4de8b3d558f03fec15": { dev: BIO_DEV, key: "al_07" },
  "69e77a4de8b3d558f03fec16": { dev: BIO_DEV, key: "hoa_07" },
  "69e77a4de8b3d558f03fec17": { dev: BIO_DEV, key: "ki_07" },
  "69e77a4de8b3d558f03fec18": { dev: BIO_DEV, key: "j_07" },
  "69e77a4de8b3d558f03fec19": { dev: BIO_DEV, key: "lsdh_07" },
  "69e77a4de8b3d558f03fec1a": { dev: BIO_DEV, key: "si_06" },
  "69e77a4de8b3d558f03fec1b": { dev: BIO_DEV, key: "al_06" },

  // Process Monitoring
  "69e77a4de8b3d558f03fec06": { dev: BIO_DEV, key: "fit_04" },
  "69e77a4de8b3d558f03fec07": { dev: BIO_DEV, key: "ti_06_1" },
  "69e77a4de8b3d558f03fec08": { dev: BIO_DEV, key: "ti_06_2" },
  "69e77a4de8b3d558f03fec09": { dev: BIO_DEV, key: "ty_06" },
  "69e77a4de8b3d558f03fec0a": { dev: BIO_DEV, key: "lit_06" },
  "69e77a4de8b3d558f03fec0b": { dev: BIO_DEV, key: "lahh_06" },
  "69e77a4de8b3d558f03fec0c": { dev: BIO_DEV, key: "lah_06" },
  "69e77a4de8b3d558f03fec0d": { dev: BIO_DEV, key: "lal_06" },
  "69e77a4de8b3d558f03fec0e": { dev: BIO_DEV, key: "ti_06_4" },
  "69e77a4de8b3d558f03fec0f": { dev: BIO_DEV, key: "pi_06_3" },
  "69e77a4de8b3d558f03fec10": { dev: BIO_DEV, key: "pi_11" },
  "69e77a4de8b3d558f03fec11": { dev: BIO_DEV, key: "pi_14" },
  "69e77a4de8b3d558f03fec12": { dev: BIO_DEV, key: "ti_14" },
  "69e77a4de8b3d558f03fec13": { dev: BIO_DEV, key: "fit_13" },
  "69e77a4de8b3d558f03fec1c": { dev: BIO_DEV, key: "ti_15" },
  "69e77a4de8b3d558f03fec1d": { dev: BIO_DEV, key: "ti_16" },

  // ==========================================
  // --- KijaniBox ASB-chiller ---
  // ==========================================

  "69e77a4de8b3d558f03fec1e": { dev: CHILL_DEV, key: "vg1" },
  "69e77a4de8b3d558f03fec1f": { dev: CHILL_DEV, key: "vh1" },
  "69e77a4de8b3d558f03fec20": { dev: CHILL_DEV, key: "vc1" },
  "69e77a4de8b3d558f03fec21": { dev: CHILL_DEV, key: "vc2" },
  "69e77a4de8b3d558f03fec22": { dev: CHILL_DEV, key: "pc1" },
  "69e77a4de8b3d558f03fec23": { dev: CHILL_DEV, key: "pg1" },
  "69e77a4ee8b3d558f03fec32": { dev: CHILL_DEV, key: "ch1" },
  "69e77a4ee8b3d558f03fec33": { dev: CHILL_DEV, key: "cc1" },
  "69e77a4ee8b3d558f03fec34": { dev: CHILL_DEV, key: "cc2" },

  // Temperature
  "69e77a4ee8b3d558f03fec24": { dev: CHILL_DEV, key: "tg1" },
  "69e77a4ee8b3d558f03fec25": { dev: CHILL_DEV, key: "th1" },
  "69e77a4ee8b3d558f03fec26": { dev: CHILL_DEV, key: "th2" },
  "69e77a4ee8b3d558f03fec27": { dev: CHILL_DEV, key: "th3" },
  "69e77a4ee8b3d558f03fec28": { dev: CHILL_DEV, key: "th4" },
  "69e77a4ee8b3d558f03fec29": { dev: CHILL_DEV, key: "tc1" },
  "69e77a4ee8b3d558f03fec2a": { dev: CHILL_DEV, key: "tc2" },
  "69e77a4ee8b3d558f03fec2b": { dev: CHILL_DEV, key: "tc3" },
  "69e77a4ee8b3d558f03fec2c": { dev: CHILL_DEV, key: "tc4" },
  "69e77a4ee8b3d558f03fec2d": { dev: CHILL_DEV, key: "tc5" },
  "69e77a4ee8b3d558f03fec2e": { dev: CHILL_DEV, key: "tc6" },
  "69e77a4ee8b3d558f03fec2f": { dev: CHILL_DEV, key: "tc7" },
  "69e77a4ee8b3d558f03fec30": { dev: CHILL_DEV, key: "tc8" },
  "69e77a4ee8b3d558f03fec31": { dev: CHILL_DEV, key: "tc9" }
};