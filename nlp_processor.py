import spacy
from spacy.tokenizer import Tokenizer

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback to using a basic tokenizer if the model is not available
    nlp = spacy.blank("en")
    nlp.tokenizer = Tokenizer(nlp.vocab)

def process_natural_language(input_text):
    doc = nlp(input_text)
    
    # Extract relevant information
    action = None
    contract_address = None
    function_name = None
    parameters = []

    for token in doc:
        if token.pos_ == "VERB":
            action = token.text
        elif token.ent_type_ == "ORG":
            contract_address = token.text
        elif token.pos_ == "NOUN" and not function_name:
            function_name = token.text
        elif token.pos_ in ["NUM", "PROPN"]:
            parameters.append(token.text)

    return {
        "action": action,
        "contract_address": contract_address,
        "function_name": function_name,
        "parameters": parameters
    }
