import re

#function checks email is valid
def fixEmail(email):
    if not isinstance(email, str):
        return False

    email = email.strip().lower()

    # Basic regex for validating an email
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if re.match(pattern, email):
        return email
    else:
        return False


def fixName(name):
    # Check that the name only contains letters and possibly spaces
    if not name.replace(" ", "").isalpha():
        return False

    # Capitalize the first letter of each word, lowercase the rest
    return ' '.join(word.capitalize() for word in name.strip().split())

def fixPhone(phone):
    # Remove any common separators like dashes, spaces, or parentheses
    digits_only = ''.join(filter(str.isdigit, phone))

    # Check if it has exactly 10 digits
    if len(digits_only) != 10:
        return False

    return digits_only

def fixAddress(address):
    if not isinstance(address, str) or not address.strip():
        return False

    # Strip leading/trailing spaces
    address = address.strip()

    # Regex: starts with number, ends with letter or acceptable punctuation
    if not re.match(r'^\d+.*[a-zA-Z.,#]$', address):
        return False

    # Capitalize each word
    return ' '.join(word.capitalize() for word in address.split())

def fixApt(apt):
    # If apt is empty or None, return it as is
    if not apt:
        return apt

    # Capitalize each word if apt is not empty
    return ' '.join(word.capitalize() for word in apt.split())