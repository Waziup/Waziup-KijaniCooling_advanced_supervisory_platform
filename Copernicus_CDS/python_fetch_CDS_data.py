# pip3 install cdsapi # for Python 3
"""
Dataset: https://cds.climate.copernicus.eu/datasets/insitu-gridded-observations-global-and-regional?tab=overview

Dataset configurations: 
https://cds.climate.copernicus.eu/datasets/insitu-gridded-observations-global-and-regional?tab=download
"""
import cdsapi

dataset = "insitu-gridded-observations-global-and-regional"
request = {
    "origin": "chirps",
    "region": "africa",
    "variable": ["precipitation"],
    "time_aggregation": "daily",
    "horizontal_aggregation": ["0_25_x_0_25"],
    "year": ["2021"],
    "version": ["v2_0"]
}

client = cdsapi.Client()
client.retrieve(dataset, request).download()
