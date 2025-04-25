import csv 
import os
from Functions import FixText

def changeName(ID, newName):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    ID = int(ID)

    newName = FixText.fixName(newName)
    if newName is False:
        return -1  # Invalid name

    # Read all rows and update the name at the given ID (row number)
    rows = []
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if ID < 0 or ID >= len(reader):
                return -2  # Invalid ID

            reader[ID][1] = newName  # Update the name column
            rows = reader

    # Write the modified list back to the CSV
    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

    return 1  # Success

def changeEmail(ID, newEmail):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    ID = int(ID)

    newEmail = FixText.fixEmail(newEmail)
    if newEmail is False:
        return -1  
    
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if row and row[0] == newEmail:  
                    return -2

    # Read all rows and update the name at the given ID (row number)
    rows = []
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if ID < 0 or ID >= len(reader): 
                return -3  # Invalid ID

            reader[ID][0] = newEmail  
            rows = reader

    # Write the modified list back to the CSV
    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

    return 1  # Success
  
def changePhone(ID, newPhone):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    ID = int(ID)

    newPhone = FixText.fixPhone(newPhone)
    if newPhone is False:
        return -1  

    # Read all rows and update the name at the given ID (row number)
    rows = []
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if ID < 0 or ID >= len(reader):
                return -2  # Invalid ID

            reader[ID][2] = newPhone 
            rows = reader

    # Write the modified list back to the CSV
    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

    return 1

def changeAddress(ID, newAddress, newApt):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    ID = int(ID)

    newAddress = FixText.fixAddress(newAddress)
    if newAddress is False:
        return -1     
    newApt = FixText.fixApt(newApt)


    # Read all rows and update the name at the given ID (row number)
    rows = []
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if ID < 0 or ID >= len(reader):
                return -2  # Invalid ID

            reader[ID][3] = newAddress
            reader[ID][4] = newApt
            rows = reader

    # Write the modified list back to the CSV
    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

    return 1

def changePassword(ID, oldPassword, newPassword):
    import os
    import csv
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    ID = int(ID)

    rows = []
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if ID < 0 or ID >= len(reader):
                return -1  # Invalid ID

            currentPassword = reader[ID][5]  # Assuming password is in column 5
            if oldPassword != currentPassword:
                return -2  # Password mismatch

            reader[ID][5] = newPassword  # Update to new password
            rows = reader

    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

    return 1  # Success

def deleteAccount(ID):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

    ID = int(ID)

    rows = []
    if os.path.exists(UsersLocation):
        with open(UsersLocation, 'r', newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if ID < 0 or ID >= len(reader):
                return -1  # Invalid ID

            # Remove the row at the given ID
            del reader[ID]
            rows = reader

        # Write the updated list back to the CSV
        with open(UsersLocation, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(rows)

        return 1  # Success

    return -2  # File not found

def giveAdmin(email):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))  # Path to your Users.csv file
    
    # Check if file exists
    if not os.path.exists(UsersLocation):
        return -1  # File not found
    
    email = FixText.fixEmail(email)
    if email is False:
        return -1  

    rows = []
    user_found = False

    # Open the CSV file and read its content
    with open(UsersLocation, 'r', newline='') as csvfile:
        reader = list(csv.reader(csvfile))
        
        for row in reader:
            if row[0] == email:  # Assuming the email is in the first column
                row[6] = '1'  # Assuming the admin column is index 2 (change this index if needed)
                user_found = True
                break

        # If the user was not found, return an error
        if not user_found:
            return -2  # Email not found

        # Write the updated rows back to the CSV
        rows = reader

    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

    return 1  # Success