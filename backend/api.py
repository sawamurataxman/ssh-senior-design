import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# File to store the bulb's color data
BULB_DATA_FILE = "bulb_data.json"

# Helper function to read the saved bulb data
def read_bulb_data():
    try:
        with open(BULB_DATA_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        # Return default values if the file doesn't exist
        return {"color": {"r": 0, "g": 0, "b": 0}}

# Helper function to write bulb data
def write_bulb_data(data):
    with open(BULB_DATA_FILE, "w") as file:
        json.dump(data, file)

@app.route('/api/time', methods=['GET'])
def get_time():
    # Get the current time
    current_time = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    return {"time": current_time}

@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.json
    user_string = data.get('user_string', '')

    print("received string: " + user_string)
    return {"received": user_string}

@app.route('/api/bulb1', methods=['POST'])
def updateBulb1():
    data = request.json
    if "color" in data and all(k in data["color"] for k in ("r", "g", "b")):
        # Save the posted data to a file
        write_bulb_data(data)
        print(f"Saved data: {data}")
        return jsonify(data)
    else:
        return jsonify({"error": "Invalid data format"}), 400

@app.route('/api/bulb1', methods=['GET'])
def getBulb1():
    # Read the saved data from the file
    bulb_state = read_bulb_data()
    print(f"Retrieved data: {bulb_state}")
    return jsonify(bulb_state)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
