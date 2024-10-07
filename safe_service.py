import requests

SAFE_SERVICE_URL = "https://safe-transaction.rsk.mainnet.gnosis.io"

def prepare_safe_transaction(processed_data):
    # This is a placeholder implementation
    # In a real-world scenario, you would use the Safe Transaction Service API
    
    safe_address = "0x1234567890123456789012345678901234567890"  # Example Safe address
    
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
        "nonce": get_next_nonce(safe_address)
    }
    
    return transaction

def encode_function_call(function_name, parameters):
    # Placeholder for function encoding
    # In a real implementation, you would use Web3.py to encode the function call
    return "0x1234567890abcdef"

def get_next_nonce(safe_address):
    response = requests.get(f"{SAFE_SERVICE_URL}/api/v1/safes/{safe_address}")
    if response.status_code == 200:
        return response.json()['nonce']
    else:
        raise Exception("Failed to fetch nonce from Safe Service")
