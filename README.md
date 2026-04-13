
# Running the virtual plant
## On Windows

1. Create a virtual environment by running the command:
``` 
python -m venv env 
```

2. Activate the virtual environment:
```
.\env\Scripts\activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Run the main Python file:
```
python main.py
```

>**Note:** You can deactivate the Python environment with the command: deactivate env

# License
GPL-3.0 license??

# Directory structure

<!--
root/
│
├── ai-engine/
│   ├── inference/
│   ├── model/
│   └── training/
│
├── api/ 
│
├── data-ingestion/
│   ├── modbus-client/
│   ├── virtual-plant/
│   ├── wazigate-mqtt/
│   └── weather-client/
│
├── multimodal-interface/
│   ├── scada/
│   └── web-dashboard/
│
├── optimization/
│   ├── energy/
│   └── logistics/
│
└── docs??/
-->