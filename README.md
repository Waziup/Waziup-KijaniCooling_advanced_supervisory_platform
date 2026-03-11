
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

4. Navigate into the 'Virtual_plant' directory with the command:
```
cd Virtual_plant
```

5. Afterwards start the virtual plant:
```
python virtual_plant.py
```

6. Start a client (on a PC or WaziGate) to receive data from the virtual plant with the command:
```
python virtual_client.py
```

6. To easily visualize the simulated data you can also run the client as a Flask application. First navigate to the flask application directory with the command:
```
cd flask_app
```

Then start the client with the command:
```
python app.py
```
Finally, open the web page with the address of the flask application.

>**Note:** You can deactivate the Python environment with the command: deactivate env

# License
GPL-3.0 license??