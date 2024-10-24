from flask import Flask, request
from flask_cors import CORS

from datetime import datetime

app = Flask(__name__)
CORS(app)

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
    return( {"recieved": user_string} )

if __name__ == '__main__':
    app.run(debug=True, port=5000)