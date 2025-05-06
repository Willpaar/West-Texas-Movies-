import csv 
import os
from Functions import FixText
import hashlib

def hash_password(raw: str) -> str:
    return hashlib.sha256(raw.encode('utf-8')).hexdigest()

def AddtoUsers(email, name, phone, address, apt, password):
    # Get the path to Users.csv regardless of machine
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    # All Fix functions put values in a valid format
    email = FixText.fixEmail(email)
    if email is False:
        return -1

    # Check if email already exists
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if row and row[0] == email:  
                    return -5

    name = FixText.fixName(name)
    if name is False:
        return -2

    phone = FixText.fixPhone(phone)
    if phone is False:
        return -3

    address = FixText.fixAddress(address)
    if address is False:
        return -4

    apt = FixText.fixApt(apt)

    # Hash the password before saving
    pw_hash = hash_password(password)

    # Write data to CSV, admin flag default is 0
    with open(UsersLocation, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([email, name, phone, address, apt, pw_hash, 0])
        return 1
