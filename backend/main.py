from flask import Flask
from flask_socketio import SocketIO
from dotenv import load_dotenv
import os

load_dotenv()

# Init app
app = Flask(__name__)

# To enable encryption
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

# Wrap app around SocketIO
socketio = SocketIO(app)

@app.route('/')
def hello():
    return "hello!"

def messageReceived(methods=['GET', 'POST']):
    print("Message received!!")


@socketio.on('my event')
def handle_event(json, methods=['GET', 'POST']):
    print('Received event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)


if __name__ == '__main__':
    socketio.run(app, debug=True)