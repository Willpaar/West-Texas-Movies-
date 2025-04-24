import csv 
import os
from Functions import FixText

#this function returns the row number which will be used as an ID for the user if email and password is correct
def FetchUser(email,password):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    with open(UsersLocation, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for i, row in enumerate(reader):
            if row and row[0] == email:
                if row[5] == password:
                    return i  # Return row number if credentials are correct
                else:
                    return 0  
    return 0 