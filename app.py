import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from nlp_processor import process_natural_language
from blockchain_service import execute_transaction, get_balance
from safe_service import prepare_safe_transaction
import requests
from flask_socketio import SocketIO, emit
from safe_event_service import process_safe_event, filter_event
import logging

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
db.init_app(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    user_input = request.json['input']
    language = request.json.get('language', 'en')
    processed_data = process_natural_language(user_input)
    try:
        safe_tx = prepare_safe_transaction(processed_data)
        socketio.emit('notification', {'message': 'Transaction prepared successfully', 'level': 'success'})
        return jsonify({**safe_tx, 'language': processed_data['language']})
    except ValueError as e:
        socketio.emit('notification', {'message': str(e), 'level': 'error'})
        return jsonify({"error": str(e), "scam_detected": True}), 400
    except requests.exceptions.RequestException as e:
        socketio.emit('notification', {'message': 'Unable to connect to the Safe Transaction Service. Using fallback mechanism.', 'level': 'warning'})
        return jsonify({"error": "Unable to connect to the Safe Transaction Service. Using fallback mechanism.", "details": str(e)}), 503
    except Exception as e:
        socketio.emit('notification', {'message': 'An unexpected error occurred', 'level': 'error'})
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

@app.route('/execute', methods=['POST'])
def execute():
    transaction_data = request.json
    result = execute_transaction(transaction_data)
    if result['success']:
        socketio.emit('transaction_update', {'hash': result['tx_hash'], 'status': 'Pending'})
    return jsonify(result)

@app.route('/check_balance/<address>')
def check_balance(address):
    try:
        balance = get_balance(address)
        socketio.emit('balance_update', {'address': address, 'balance': balance})
        return jsonify({"balance": balance})
    except Exception as e:
        socketio.emit('notification', {'message': 'Error fetching balance', 'level': 'error'})
        return jsonify({"error": "Error fetching balance", "details": str(e)}), 500

@app.route('/wallet')
def wallet():
    return render_template('wallet.html')

@app.route('/transaction')
def transaction():
    return render_template('transaction.html')

@app.route('/safe_event', methods=['POST'])
def safe_event():
    event_data = request.json
    if filter_event(event_data):
        processed_event = process_safe_event(event_data)
        socketio.emit('safe_event', processed_event)
        return '', 202
    return '', 204

@socketio.on('connect')
def handle_connect():
    app.logger.info('Client connected')
    emit('connection_response', {'data': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    app.logger.info('Client disconnected')

if __name__ == '__main__':
    ssl_context = None
    if os.environ.get('FLASK_ENV') == 'production':
        ssl_context = 'adhoc'
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, ssl_context=ssl_context)
