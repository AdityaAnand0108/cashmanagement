import re
import dateparser
from datetime import datetime

from dateparser.search import search_dates

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
    Scans the sentence to find a date like 'yesterday', '4th dec', 'last friday'.
    """
    # search_dates returns a list of tuples: [('04 of dec', datetime_object)]
    # We use settings={'PREFER_DATES_FROM': 'past'} to avoid future dates
    results = search_dates(text, languages=['en'], settings={'PREFER_DATES_FROM': 'past'})

    if results:
        # We take the date object from the first result found
        found_date = results[0][1]
        return found_date.strftime('%Y-%m-%d')

    # Fallback to Today if no date is mentioned
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