# Biodigester parameters

si_01       = None # boolean, input registers, PLC writes
al_01       = None # boolean, discrete input coil, PLC writes
wi_02       = None # numerical, input register, PLC writes
si_02       = None # boolean, input registers, PLC writes
al_02       = None # boolean, discrete input coil, PLC writes
hoa_02      = None # boolean, input registers, PLC writes
si_03       = None # boolean, input registers, PLC writes
al_03       = None # boolean, discrete input coil, PLC writes
ki_03       = None # numerical, input registers, PLC writes
li_03       = None # numerical, input registers, PLC writes
fsdl_03     = None # boolean, input registers, PLC writes
fsdh_03     = None # boolean, input registers, PLC writes
ki_04       = None # numerical, input registers, PLC writes
j_04        = None # numerical, input registers, PLC writes
hoa_01      = None # boolean
fit_04      = None # numerical, input registers, PLC writes
ti_06_1     = None # numerical, input registers, PLC writes
ti_06_2     = None # numerical, input registers, PLC writes
ty_06       = None # boolean, discrete input coil, PLC writes
lit_06      = None # numerical, input registers, PLC writes
lahh_06     = None # numerical, input registers, PLC writes
lah_06      = None # numerical, input registers, PLC writes
lal_06      = None # numerical, input registers, PLC writes
ti_06_4     = None # numerical, input registers, PLC writes
pi_06_3     = None # numerical, input registers, PLC writes
pi_11       = None # numerical, input registers, PLC writes
pi_14       = None # numerical, input registers, PLC writes
ti_14       = None # numerical, input registers, PLC writes
fit_13      = None # numerical, input registers, PLC writes
si_07       = None # boolean, input registers, PLC writes
al_07       = None # boolean, discrete input coil, PLC writes
hoa_07      = None # boolean, input registers, PLC writes
ki_07       = None # numerical, input registers, PLC writes
j_07        = None # numerical, input registers, PLC writes
lsdh_07     = None # boolean, input registers, PLC writes
si_06       = None # boolean, input registers, PLC writes
al_06       = None # boolean, discrete input coil, PLC writes
ti_15       = None # numerical, input registers, PLC writes
ti_16       = None # numerical, input registers, PLC writes

load_cells_max                      = 2000
load_cells_min                      = 0
level_sensor_max                    = 3
level_sensor_min                    = 0
substrate_flowrate_max              = 0.03
substrate_flowrate_min              = 7
substrate_temperature_max           = 100
substrate_temperature_min           = 0
substrate_level_highest_max         = 3
substrate_level_max                 = 2.5
substrate_level_min                 = 0
biogas_temperature_max              = 100
biogas_temperature_min              = 0
biogas_pressure_max                 = 100
biogas_pressure_min                 = 0
biogas_output_flowrate_max          = 16
biogas_output_flowrate_min          = 0.1
substrate_recycling_temperature_max = 80
substrate_recycling_temperature_min = 0
timers_value_max                    = 50
timers_value_min                    = 0
inverters_frequency_max             = 50
inverters_frequency_min             = 0
"""
Process value ranges from Giovanni (April 2026):

load cells maximum weight: 0 - 500 kg per each cell (4 cells total)                                           
level sensor maximum value: it measures hydraulic head:  up to 100 bar, but it depends on the set up (let's say 0 - 3 bar)                                    
substrate flow rate maximum value  0,03 - 7 m3/h          
substrate temperature maximum value  basic -40°C /  400 °C but it depends on the set up (let's say  0 - 80 °C or 0 -100°C)            
substrate temperature minimum value basic -40°C /  400 °C but it depends on the set up (let's say  0 - 80 °C or 0 -100°C)                      
substrate level maximum value:   it measures hydraulic head:  up to 100 bar, but it depends on the ste up (let's say 0 - 3 bar)                                               
biogas temperature maximum value basic -40°C /  400 °C but it depends on the set up (let's say  0 - 80 °C or 0 -100°C)                                     
biogas temperature minimum value basic -40°C /  400 °C but it depends on the set up (let's say  0 - 80 °C or 0 -100°C)                                     
biogas pressure maximum value up to 100 bar, but it depends on the set up (let's say 0 - 50 mbar or 0 - 100 mbar)                            
biogas pressure minimum value up to 100 bar, but it depends on the set up (let's say 0 - 50 mbar or 0 - 100 mbar)                                            
biogas output flow rate maximum value 16 m3/h         
biogas output flow rate minimum value 0,1 m3/h       
substrate recycling temperature maximum value basic -40°C /  400 °C but it depends on the set up (let's say  0 - 80 °C)                             
substrate recycling temperature minimum value basic -40°C /  400 °C but it depends on the set up (let's say  0 - 80 °C)  
"""

# Chiller parameters
vg1         = None # numerical, input registers, PLC writes
vh1         = None # numerical, input registers, PLC writes
vc1         = None # numerical, input registers, PLC writes
vc2         = None # numerical, input registers, PLC writes
pc1         = None # numerical, input registers, PLC writes
pg1         = None # numerical, input registers, PLC writes
tg1         = None # numerical, input registers, PLC writes
th1         = None # numerical, input registers, PLC writes
th2         = None # numerical, input registers, PLC writes
th3         = None # numerical, input registers, PLC writes
th4         = None # numerical, input registers, PLC writes
tc1         = None # numerical, input registers, PLC writes
tc2         = None # numerical, input registers, PLC writes
tc3         = None # numerical, input registers, PLC writes
tc4         = None # numerical, input registers, PLC writes
tc5         = None # numerical, input registers, PLC writes
tc6         = None # numerical, input registers, PLC writes
tc7         = None # numerical, input registers, PLC writes
tc8         = None # numerical, input registers, PLC writes
tc9         = None # numerical, input registers, PLC writes
ch1         = None # boolean, input registers, PLC writes
cc1         = None # boolean, input registers, PLC writes
cc2         = None # boolean, input registers, PLC writes

chiller_temp_max        = 0
chiller_temp_min        = 40
chiller_pressure_max    = 6
chiller_pressure_min    = 5
chiller_flowrate_max    = 300
chiller_flowrate_min    = 200