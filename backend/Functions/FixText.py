import re
import csv 
import os

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

def fixTitle(title):
    # Capitalize the title (capitalize the first letter of each word)
    return ' '.join(word.capitalize() for word in title.split())

def fixTimes(times):
    # Loop through each time entry separated by spaces
    for time in times.split():
        time = time.strip()  # Remove any extra spaces
        
        # Check if the time is in the correct format (xx:xx)
        if len(time) == 5 and time[2] == ":" and time[:2].isdigit() and time[3:].isdigit():
            hours = int(time[:2])
            minutes = int(time[3:])
            
            # Check if the hours and minutes are within valid ranges
            if not (0 <= hours <= 23 and 0 <= minutes <= 59):
                print(f"Invalid time range: {time} (hours: {hours}, minutes: {minutes})")  # Debugging line
                return False  # Return False if any time is outside valid ranges
        else:
            print(f"Invalid format: {time}")  # Debugging line
            return False  # Return False if the format is incorrect
    
    return times  # Return the original times string if all times are valid

def checkPNG(movieTitle, pngName):
    return True
