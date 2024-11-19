import json

import paho.mqtt.client as mqtt

from flask import Flask, request, jsonify
from flask_cors import CORS

from datetime import datetime

app = Flask(__name__)
CORS(app)

#def on_publish(client, userdata, mid, reasonCode, properties):
#    print(f"Message {mid} has been published.")

#clientID = "mainNetwork"
#port = 1883
#broker = "localhost"
#client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, clientID)
#client.on_publish = on_publish
#client.connect(broker, port)
#client.loop_start()

@app.route('/api/time', methods=['GET'])#backend -> frontend (frontend GETs it from backend)
def get_time():
    # Get the current time
    current_time = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    return {"time": current_time}

@app.route('/api/echo', methods=['POST'])#frontend -> backend (frontend POSTs it to backend)
def echo():
    data = request.json
    user_string = data.get('user_string', '')

    print("received string: " + user_string)
    return( {"received": user_string} )


# Simulated storage (can be replaced with a database)
bulb_state = {
    "brightness": 128,
    "color": {"r": 51, "g": 51, "b": 51, "a": 1}
}

@app.route('/api/bulb1', methods=['POST'])
def update_bulb():
    global bulb_state
    data = request.json
    json_data = json.dumps(data)
    print(json_data)
    bulb_state["brightness"] = data.get("brightness", bulb_state["brightness"])
    bulb_state["color"] = data.get("color", bulb_state["color"])
    return {"status": "success", "message": json_data }, 200

@app.route('/api/bulb1', methods=['GET'])
def get_bulb_state():
    return jsonify(bulb_state), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)