from flask import Flask, render_template, jsonify
from pyModbusTCP.client import ModbusClient

app = Flask(__name__)

# Modbus client setup
client = ModbusClient(host="127.0.0.1", port=12345)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chiller_data')
def data():
    if not client.open():
        return jsonify({"error": "Modbus connection failed"})

    try:
        # Read all sensor values from input registers 0-19
        regs = client.read_input_registers(0, 20)

        if regs is None:
            return jsonify({"error": "Failed to read registers"})

        # Read coil states for ch1, cc1, cc2
        ch1 = int(client.read_coils(1, 1)[0])
        cc1 = int(client.read_coils(2, 1)[0])
        cc2 = int(client.read_coils(3, 1)[0])

        values = {
            "vg1": regs[0], "vh1": regs[1], "vc1": regs[2], "vc2": regs[3],
            "pc1": regs[4], "pg1": regs[5], "tg1": regs[6],
            "th1": regs[7], "th2": regs[8], "th3": regs[9], "th4": regs[10],
            "tc1": regs[11], "tc2": regs[12], "tc3": regs[13], "tc4": regs[14],
            "tc5": regs[15], "tc6": regs[16], "tc7": regs[17],
            "tc8": regs[18], "tc9": regs[19],
            "ch1": ch1, "cc1": cc1, "cc2": cc2
        }

        return jsonify(values)

    except Exception as e:
        return jsonify({"error": f"Modbus error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
