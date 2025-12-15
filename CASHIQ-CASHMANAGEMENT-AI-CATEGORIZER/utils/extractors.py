import re
import dateparser
from datetime import datetime

# Common payment methods in India/Global
KNOWN_SOURCES = ['cash', 'upi', 'cred', 'gpay', 'paytm', 'hdfc', 'sbi', 'axis', 'credit card', 'debit card']

def extract_amount(text):
    """
    Finds numbers like 500, 10.50, 2000.
    """
    # Regex looks for digits, optionally followed by a dot and more digits
    match = re.search(r'(\d+(\.\d{1,2})?)', text)
    if match:
        return float(match.group(1))
    return None

def extract_date(text):
    """
    Converts 'yesterday' -> '2025-12-14'
    """
    # PREFER_DATES_FROM='past' ensures if we say "Friday", it means last Friday, not next Friday.
    parsed_date = dateparser.parse(text, settings={'PREFER_DATES_FROM': 'past'})
    if parsed_date:
        return parsed_date.strftime('%Y-%m-%d')
    # If no date found, default to Today
    return datetime.now().strftime('%Y-%m-%d')

def extract_source(text):
    """
    Scans text for known banks or apps.
    """
    text_lower = text.lower()
    for source in KNOWN_SOURCES:
        if source in text_lower:
            return source.capitalize()
    return "Unknown"