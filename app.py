from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO
from web3 import Web3
import requests
import os
from anthropic import Anthropic

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
socketio = SocketIO(app)

# Initialize Web3 with Infura
w3 = Web3(Web3.HTTPProvider(f'https://172.20.0.36:8545'))
# 172.20.0.36:8545

CLAUDE_API_KEY = os.environ.get('CLAUDE_API_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/wallet')
def wallet():
    return render_template('wallet.html')

@app.route('/transaction')
def transaction():
    return render_template('transaction.html')

def ask_claude(prompt):
    client = Anthropic(api_key=CLAUDE_API_KEY)

    try:
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            temperature=0,
            system="You are an AI assistant for a blockchain application. Respond with helpful and accurate information.",
            messages=[{
                "role": "user",
                "content": prompt
            }])
        return response.content
    except Exception as e:
        print(f"Error in ask_claude: {str(e)}")
        return f"Error processing input: {str(e)}"

@app.route('/process', methods=['POST'])
def process():
    input_data = request.json['input']
    try:
        processed_result = ask_claude(input_data)
        return jsonify({'result': processed_result[0].text})
    except Exception as e:
        error_message = f"Error processing input: {str(e)}"
        return jsonify({'error': error_message}), 500

@app.route('/execute', methods=['POST'])
def execute():
    transaction_data = request.json
    try:
        # Get the nonce
        nonce = w3.eth.get_transaction_count(transaction_data['from'])

        # Build the transaction
        tx = {
            'nonce': nonce,
            'to': transaction_data['recipient'],
            'value': w3.to_wei(transaction_data['amount'], 'ether'),
            'gas': int(transaction_data['gasLimit']),
            'gasPrice': w3.to_wei(transaction_data['gasPrice'], 'gwei'),
            'chainId': 1  # Ethereum Mainnet chain ID
        }

        # Sign the transaction
        signed_tx = w3.eth.account.sign_transaction(tx, private_key=os.environ.get('PRIVATE_KEY'))

        # Send the transaction
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        return jsonify({'success': True, 'tx_hash': tx_hash.hex()})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/check_balance/<address>')
def check_balance(address):
    try:
        balance = w3.eth.get_balance(address)
        balance_in_eth = w3.from_wei(balance, 'ether')
        return jsonify({'balance': float(balance_in_eth)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/transaction_history')
def transaction_history():
    try:
        # Replace this with the actual user's address
        address = '0x1234567890123456789012345678901234567890'
        # Get the latest block number
        latest_block = w3.eth.get_block('latest')['number']
        # Get the last 10 blocks
        transactions = []
        for i in range(latest_block, latest_block - 10, -1):
            block = w3.eth.get_block(i, full_transactions=True)
            for tx in block.transactions:
                if tx['from'] == address or tx['to'] == address:
                    transactions.append({
                        'hash': tx['hash'].hex(),
                        'from': tx['from'],
                        'to': tx['to'],
                        'value': w3.from_wei(tx['value'], 'ether'),
                        'status': 'Confirmed'
                    })
        return jsonify({'transactions': transactions[:10]})  # Return only the last 10 transactions
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/out')
def out():
    return render_template('out/index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('transaction_update')
def handle_transaction_update(data):
    # Process transaction update
    socketio.emit('transaction_update', {'message': f"Transaction update: {data['message']}"})

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5000, debug=False)
