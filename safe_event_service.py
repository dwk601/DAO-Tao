from typing import Dict, Any

def process_safe_event(event_data: Dict[str, Any]) -> Dict[str, Any]:
    event_type = event_data.get('type')
    
    if event_type == 'NEW_CONFIRMATION':
        return process_new_confirmation(event_data)
    elif event_type in ['EXECUTED_MULTISIG_TRANSACTION', 'PENDING_MULTISIG_TRANSACTION', 'DELETED_MULTISIG_TRANSACTION']:
        return process_multisig_transaction(event_data)
    elif event_type in ['INCOMING_ETHER', 'OUTGOING_ETHER']:
        return process_ether_transfer(event_data)
    elif event_type in ['INCOMING_TOKEN', 'OUTGOING_TOKEN']:
        return process_token_transfer(event_data)
    elif event_type in ['MESSAGE_CREATED', 'MESSAGE_CONFIRMATION']:
        return process_message_event(event_data)
    else:
        return {'error': 'Unknown event type', 'data': event_data}

def process_new_confirmation(event_data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'type': 'New Confirmation',
        'safe_address': event_data['address'],
        'owner': event_data['owner'],
        'safeTxHash': event_data['safeTxHash'],
        'chainId': event_data['chainId']
    }

def process_multisig_transaction(event_data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'type': 'Multisig Transaction',
        'safe_address': event_data['address'],
        'status': event_data['type'],
        'safeTxHash': event_data['safeTxHash'],
        'chainId': event_data['chainId'],
        'txHash': event_data.get('txHash'),
        'failed': event_data.get('failed')
    }

def process_ether_transfer(event_data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'type': 'Ether Transfer',
        'safe_address': event_data['address'],
        'direction': 'Incoming' if event_data['type'] == 'INCOMING_ETHER' else 'Outgoing',
        'value': event_data['value'],
        'txHash': event_data['txHash'],
        'chainId': event_data['chainId']
    }

def process_token_transfer(event_data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'type': 'Token Transfer',
        'safe_address': event_data['address'],
        'direction': 'Incoming' if event_data['type'] == 'INCOMING_TOKEN' else 'Outgoing',
        'tokenAddress': event_data['tokenAddress'],
        'value': event_data.get('value'),
        'tokenId': event_data.get('tokenId'),
        'txHash': event_data['txHash'],
        'chainId': event_data['chainId']
    }

def process_message_event(event_data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'type': 'Message Event',
        'safe_address': event_data['address'],
        'status': 'Created' if event_data['type'] == 'MESSAGE_CREATED' else 'Confirmed',
        'messageHash': event_data['messageHash'],
        'chainId': event_data['chainId']
    }

def filter_event(event_data: Dict[str, Any]) -> bool:
    # Implement your filtering logic here
    # For example, you can filter based on chainId or eventType
    allowed_chain_ids = ['1', '4']  # Mainnet and Rinkeby
    allowed_event_types = ['NEW_CONFIRMATION', 'EXECUTED_MULTISIG_TRANSACTION', 'INCOMING_ETHER', 'OUTGOING_ETHER']
    
    return (
        event_data.get('chainId') in allowed_chain_ids and
        event_data.get('type') in allowed_event_types
    )
