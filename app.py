import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from nlp_processor import process_natural_language
from blockchain_service import execute_transaction
from safe_service import prepare_safe_transaction
import requests

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    user_input = request.json['input']
    processed_data = process_natural_language(user_input)
    try:
        safe_tx = prepare_safe_transaction(processed_data)
        return jsonify(safe_tx)
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Unable to connect to the Safe Transaction Service. Please try again later."}), 503
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/execute', methods=['POST'])
def execute():
    transaction_data = request.json
    result = execute_transaction(transaction_data)
    return jsonify(result)

@app.route('/wallet')
def wallet():
    return render_template('wallet.html')

@app.route('/transaction')
def transaction():
    return render_template('transaction.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
