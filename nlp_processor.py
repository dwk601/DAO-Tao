import spacy
from spacy.tokenizer import Tokenizer
from langdetect import detect

# Load spaCy models for different languages
try:
    nlp_en = spacy.load("en_core_web_sm")
    nlp_es = spacy.load("es_core_news_sm")
    nlp_fr = spacy.load("fr_core_news_sm")
    nlp_de = spacy.load("de_core_news_sm")
except OSError:
    # Fallback to using basic tokenizers if models are not available
    nlp_en = spacy.blank("en")
    nlp_es = spacy.blank("es")
    nlp_fr = spacy.blank("fr")
    nlp_de = spacy.blank("de")
    nlp_en.tokenizer = Tokenizer(nlp_en.vocab)
    nlp_es.tokenizer = Tokenizer(nlp_es.vocab)
    nlp_fr.tokenizer = Tokenizer(nlp_fr.vocab)
    nlp_de.tokenizer = Tokenizer(nlp_de.vocab)

def detect_language(text):
    try:
        return detect(text)
    except:
        return "en"  # Default to English if language detection fails

def process_natural_language(input_text):
    lang = detect_language(input_text)
    
    if lang == "es":
        nlp = nlp_es
    elif lang == "fr":
        nlp = nlp_fr
    elif lang == "de":
        nlp = nlp_de
    else:
        nlp = nlp_en  # Default to English for unsupported languages
    
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
        "language": lang,
        "action": action,
        "contract_address": contract_address,
        "function_name": function_name,
        "parameters": parameters
    }
