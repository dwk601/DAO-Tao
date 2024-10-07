import re
from web3 import Web3

def is_valid_address(address):
    return Web3.is_address(address)

def check_for_common_scam_patterns(transaction_data):
    # Check for suspicious keywords in the transaction data
    suspicious_keywords = ['free', 'giveaway', 'double', 'airdrop', 'bonus']
    transaction_str = str(transaction_data).lower()
    for keyword in suspicious_keywords:
        if keyword in transaction_str:
            return True, f"Suspicious keyword detected: {keyword}"

    # Check for unusually high value transfers
    if 'value' in transaction_data and transaction_data['value'] > Web3.to_wei(100, 'ether'):
        return True, "Unusually high value transfer detected"

    return False, ""

def check_nft_scam(nft_data):
    # Check for common NFT scam patterns
    if 'name' in nft_data and 'free' in nft_data['name'].lower():
        return True, "Suspicious NFT name containing 'free'"

    if 'price' in nft_data and float(nft_data['price']) == 0:
        return True, "NFT price is set to 0, which is unusual"

    return False, ""

def detect_scam(transaction_data, nft_data=None):
    # Check if the 'to' address is valid
    if 'to' in transaction_data and not is_valid_address(transaction_data['to']):
        return True, "Invalid 'to' address"

    # Check for common scam patterns in transaction data
    is_scam, reason = check_for_common_scam_patterns(transaction_data)
    if is_scam:
        return True, reason

    # If NFT data is provided, check for NFT-specific scams
    if nft_data:
        is_nft_scam, nft_reason = check_nft_scam(nft_data)
        if is_nft_scam:
            return True, nft_reason

    return False, "No scam detected"
