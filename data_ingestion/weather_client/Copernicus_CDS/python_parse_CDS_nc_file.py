# pip install xarray netCDF4 matplotlib

import xarray as xr

# Load the NetCDF file
zipfile = "9ff4ebd577afd23aea6e124fd1ae2f37"
filename = "/CHIRPS_total_precipitation_day_0.25x0.25_africa_2021_v2.0.nc" # Variables on the dataset include ['time', 'longitude', 'latitude', 'pr']"
"""
   time_coverage_start:        1981-01-01 00:00:00
    time_coverage_end:          2021-08-31 00:00:00
"""
ds = xr.open_dataset(zipfile + filename)

# Print dataset metadata and variables
print(ds)

# Extract the precipitation variable
precip = ds['pr']

# Get values for a specific date
precip_day1 = precip.sel(time='2021-01-01')

# Print shape and a small section
print(precip_day1.shape)
print(precip_day1.values)

# Example: Nairobi coordinates (approx. lat=-1.28, lon=36.82)
value = precip.sel(time='2021-01-01', latitude=-1.25, longitude=36.75, method="nearest")
print(f"Nairobi rainfall on 2021-01-01: {value.values} mm")

import matplotlib.pyplot as plt

precip_day = precip.sel(time='2021-01-01')

plt.figure(figsize=(10,6))
precip_day.plot(cmap='Blues')
plt.title('CHIRPS Daily Precipitation - 2021-01-01')
plt.show()

# *********** Optional: Convert to Pandas for Time Series ***********#
# Get time series for a specific location
series = precip.sel(latitude=-1.25, longitude=36.75, method="nearest").to_series()

# Plot time series
series.plot(title="Rainfall Time Series at Nairobi")
