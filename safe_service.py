import requests
import random
import json
import os
from scam_detection import detect_scam

SAFE_SERVICE_URL = "https://safe-transaction.rsk.mainnet.gnosis.io"
MOCK_DATA_FILE = "mock_safe_data.json"

def load_mock_data():
    if os.path.exists(MOCK_DATA_FILE):
        with open(MOCK_DATA_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_mock_data(data):
    with open(MOCK_DATA_FILE, 'w') as f:
        json.dump(data, f)

mock_data = load_mock_data()

def prepare_safe_transaction(processed_data):
    safe_address = "0x1234567890123456789012345678901234567890"  # Example Safe address
    
    # Perform scam detection
    is_scam, scam_reason = detect_scam(processed_data)
    if is_scam:
        raise ValueError(f"Potential scam detected: {scam_reason}")

    try:
        nonce = get_next_nonce(safe_address)
    except requests.exceptions.RequestException:
        nonce = get_mock_nonce(safe_address)
    
    transaction = {
        "safe": safe_address,
        "to": processed_data['contract_address'],
        "value": 0,
        "data": encode_function_call(processed_data['function_name'], processed_data['parameters']),
        "operation": 0,  # 0 for CALL, 1 for DELEGATE_CALL
        "safeTxGas": 0,
        "baseGas": 0,
        "gasPrice": 0,
        "gasToken": "0x0000000000000000000000000000000000000000",  # RBTC
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": nonce
    }
    
    return transaction

def encode_function_call(function_name, parameters):
    # Placeholder for function encoding
    return "0x1234567890abcdef"

def get_next_nonce(safe_address):
    response = requests.get(f"{SAFE_SERVICE_URL}/api/v1/safes/{safe_address}", timeout=5)
    if response.status_code == 200:
        nonce = response.json()['nonce']
        update_mock_nonce(safe_address, nonce)
        return nonce
    else:
        raise requests.exceptions.RequestException(f"Failed to fetch nonce from Safe Service. Status code: {response.status_code}")

def get_mock_nonce(safe_address):
    if safe_address not in mock_data:
        mock_data[safe_address] = {"nonce": 0}
    nonce = mock_data[safe_address]["nonce"]
    mock_data[safe_address]["nonce"] += 1
    save_mock_data(mock_data)
    return nonce

def update_mock_nonce(safe_address, nonce):
    mock_data[safe_address] = {"nonce": nonce}
    save_mock_data(mock_data)

def get_safe_info(safe_address):
    try:
        response = requests.get(f"{SAFE_SERVICE_URL}/api/v1/safes/{safe_address}", timeout=5)
        if response.status_code == 200:
            safe_info = response.json()
            mock_data[safe_address] = safe_info
            save_mock_data(mock_data)
            return safe_info
        else:
            raise requests.exceptions.RequestException(f"Failed to fetch Safe info. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        if safe_address in mock_data:
            return mock_data[safe_address]
        raise Exception(f"Error connecting to Safe Service and no local data available: {str(e)}")