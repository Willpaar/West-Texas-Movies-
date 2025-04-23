import csv 
import os

def AddtoUsers(email, name, phone, address, apt, password):
    #this gets the path to Users.csv no matter which computer runs it
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    #get the new ID to add for the new user
    with open(UsersLocation, 'r', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = list(reader)

        if rows:
            lastRow = rows[-1] 
            lastID = int(lastRow['ID'])  
        else:
            lastID = 0  

    newID = lastID + 1

    #write data to csv
    with open(UsersLocation, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([newID, email, name, phone, address, apt, password])

