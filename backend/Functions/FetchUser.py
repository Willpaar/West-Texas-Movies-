import csv 
import os
from Functions import FixText
import hashlib

def hash_password(raw: str) -> str:
    return hashlib.sha256(raw.encode('utf-8')).hexdigest()

# This function returns the row number used as the user's ID if email and password are correct
def FetchUser(email, password):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    email = FixText.fixEmail(email)
    if email is False:
        return -2

    pw_hash = hash_password(password)

    with open(UsersLocation, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for i, row in enumerate(reader):
            if row and row[0] == email:
                if row[5] == pw_hash:
                    return i  # Return row number if credentials are correct
                else:
                    return -1  # Wrong password
    return -1  # Email not found
