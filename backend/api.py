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
    
@app.route('/api/smartbulb', methods=['POST'])
def smartbulb():
    global latest_data
    if request.method == 'POST':

        latest_data = request.get_json()
        response = app.response_class(
            response=json.dumps(latest_data),
            status=200,
            mimetype="text/plain"
        )
        return response
    elif request.method == 'GET':
        return app.response_class(
            response=json.dumps(latest_data),
            status=200,
            mimetype = "text/plain"
        )


@app.route('/api/bulb1', methods=['POST'])
def updateBulb1():
    data = request.json
    json_data = json.dumps(data)
    print(json_data)
    #result = client.publish("zigbee2mqtt/bulb1/set", json_data)
    return(json_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)