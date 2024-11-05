import paho.mqtt.client as mqtt
import time

def on_publish(client, userdata, mid, reasonCode, properties):
    print(f"Message {mid} has been published.")

clientID = "mainNetwork"
port = 1883
broker = "localhost"

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, clientID)
client.on_publish = on_publish

client.connect(broker, port)

client.loop_start()

while(True):
    for i in range(2):
        if i == 0:
            result = client.publish("zigbee2mqtt/bulb1/set", '{"color": {"r": 255, "g": 0, "b": 0}}')
        else:
            result = client.publish("zigbee2mqtt/bulb1/set", '{"brightness":10}')
        time.sleep(1)


result.wait_for_publish()

client.loop_stop()
client.disconnect()
