# BEFORE PUSHING CODE!
- Delete data in wazigate_token.txt file
- Copy contents from the file TEMPLATE-asb_wazigate_config.json to asb_wazigate_config.json


# On Windows

## Install WaziGate Edge and its dependencies

On your local PC, download and install [Node.js](https://nodejs.org/en/download/), [Go programming language](https://go.dev/) and [MongoDB](https://www.mongodb.com/try/download/community) (supported upto version 5.0.14 and below).

Then, get WaziGate Edge source files: XXXXXXXXXXXXXXXXXXXXXXXXXXX recursive
```
git clone --recursive https://github.com/Waziup/wazigate-edge.git
cd wazigate-edge
```

Compile the source and build the wazigate-edge executable:
```
go build .
```

Next start MongoDB on the host computer. On Windows, MongoDB files are by default installed in the directory `C:\Program Files\MongoDB\Server\5.0\bin`. Here `5.0` is the version you have installed. From this directory we need to run the `mongod` application.

Next, start the wazigate-edge server:
```
.\wazigate-edge.exe -www wazigate-dashboard
```

## Start WaziGate dashboard

Still on your local PC in another terminal/CMD, navigate into the wazigate-dashboard directory:
```
cd wazigate-dashboard
```

Paste the following in the .env file (wazigate-dashbord/.env):
```
VITE_WAZIGATE_API_URL=http://localhost
```

Next install the dependencies:
```
npm install --force
```

Finally run the development with the command:
```
npm run dev
```

To view data on the WaziGate dashboard, you need to open the interface in your browser, without CORS protections. With Chrome, you can run it like that:
```
google-chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="~/tmp"
```
## Run the KijaniBox supervisory platform

The following commands are run from the [Waziup-KijaniBox_advanced_supervisory_platform repository](https://github.com/Waziup/Waziup-KijaniBox_advanced_supervisory_platform).

First, clone the rep on your local PC and navigate into it:
```
cd Waziup-KijaniBox_advanced_supervisory_platform
```

1. Create a virtual environment by running the command:
``` 
python -m venv env 
```

2. Activate the virtual environment:
```
.\env\Scripts\activate
```

You can upgrade pip with the command:
```
python -m pip install --upgrade pip
```

3. Install dependencies:
```
pip install -r requirements.txt
```

>**Note:** FOR DEVELOPMENT MODE! If you intend to use a local WaziGate-Edge server, ensure `WAZIGATE_URL` is set to localhost. If however you want to push data to a WaziGate, set `WAZIGATE_URL` to the gateway's IP address. `WAZIGATE_URL` is defined in `data-ingestion/wazigate/wazigate_EdgeAPI_util.py`.

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
│   ├── wazigate/
│   └── weather-client/
│
├── multimodal-interface/
│   ├── scada_fluxa/
│   └── web-dashboard/
│
├── optimization/
│   ├── energy/
│   └── logistics/
│
└── docs??/
-->