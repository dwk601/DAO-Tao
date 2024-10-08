import os
from web3 import Web3
from eth_account import Account
import requests

# Setup
WEB3_PROVIDER_URL = 'https://public-node.rsk.co'
SAFE_ADDRESS = '0x...'  # Your Safe address
SMART_CONTRACT_ADDRESS = '0x...'  # Your smart contract address
PRIVATE_KEY = os.getenv('PRIVATE_KEY')  # Load from environment variable
CLAUDE_API_KEY = os.getenv('CLAUDE_API_KEY')

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(WEB3_PROVIDER_URL))
account = Account.from_key(PRIVATE_KEY)

# Simple function to interact with Claude API
def ask_claude(prompt):
    response = requests.post(
        'https://api.anthropic.com/v1/messages',
        headers={
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        json={
            'model': 'claude-3-opus-20240229',
            'max_tokens': 1000,
            'messages': [{'role': 'user', 'content': prompt}]
        }
    )
    return response.json()['content'][0]['text'] if response.status_code == 200 else None

# Function to execute a transaction
def execute_transaction(data):
    nonce = w3.eth.get_transaction_count(account.address)
    tx = {
        'nonce': nonce,
        'to': SMART_CONTRACT_ADDRESS,
        'value': 0,
        'gas': 2000000,
        'gasPrice': w3.eth.gas_price,
        'data': data,
    }
    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return w3.eth.wait_for_transaction_receipt(tx_hash)

# Main function
def main():
    # Ask Claude for advice
    advice = ask_claude("What's the current market sentiment for cryptocurrency?")
    print(f"Claude's advice: {advice}")

    # Simple decision based on Claude's advice
    if advice and ('positive' in advice.lower() or 'bullish' in advice.lower()):
        # Example: calling a 'trade' function on the smart contract
        contract = w3.eth.contract(address=SMART_CONTRACT_ADDRESS, abi=[...])  # Add your contract ABI
        tx_data = contract.functions.trade(1, 100).build_transaction()['data']  # Example parameters

        try:
            receipt = execute_transaction(tx_data)
            print(f"Transaction executed. Hash: {receipt['transactionHash'].hex()}")
        except Exception as e:
            print(f"Error executing transaction: {str(e)}")
    else:
        print("No action taken based on Claude's advice")

if __name__ == "__main__":
    main()