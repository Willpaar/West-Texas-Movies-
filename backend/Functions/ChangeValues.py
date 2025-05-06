import csv 
import os
import base64
from cgi import FieldStorage
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

def addMovie(*, title, description, filename, location, upcoming, date, times, file):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Movies.csv'))

    title = FixText.fixTitle(title)

    pngcheck = FixText.checkPNG(title, filename)

    description = FixText.fixDescription(description)

    if pngcheck is False:
        return -1
    
    if upcoming == 1:
        fixedTimes=""
    else:
        fixedTimes = FixText.fixTimes(times)
        if fixedTimes is False:
            print(fixedTimes)
            return -2
            
    if isinstance(file, FieldStorage):
        file_content = file.file.read()  # This reads the file content as bytes
    else:
        file_content = file  # If it's already in bytes, pass it through directly

    addPNGtoPublic(file_content, filename)


    with open(UsersLocation, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([title, filename, location, upcoming, date, fixedTimes,description,""])
        return 1

def addPNGtoPublic(file, filename):
    try:
        # Set the path to the public directory where the file will be saved
        frontend_public_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../../frontend/public/')

        # Ensure the directory exists
        os.makedirs(frontend_public_dir, exist_ok=True)

        # Create the full path for saving the file
        save_path = os.path.join(frontend_public_dir, filename)

        # Write the decoded file content to the file
        with open(save_path, "wb") as f:
            f.write(file)

        print(f"File saved successfully to {save_path}")


    except Exception as e:
        print(f"Error saving file: {e}")

def deleteMovie(title, location, date):
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Movies.csv'))

    title = FixText.fixTitle(title)  # Make sure the title is standardized the same way

    updated_rows = []
    movie_found = False

    # Read all rows, and keep only those that don't match
    with open(UsersLocation, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if len(row) < 6:
                continue  # Skip malformed rows
            row_title, _, row_location, _, row_date, _ = row
            if row_title == title and row_location == location and row_date == date:
                movie_found = True
                continue  # Skip this row (i.e., delete it)
            updated_rows.append(row)

    # If no matching movie found, return an error code
    if not movie_found:
        return -1

    # Rewrite the CSV without the deleted movie
    with open(UsersLocation, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(updated_rows)

    return 1

def addPurchase(userID, title, date, time, location, numberOfTickets):
    # Get path to OrderHistory.csv
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/OrderHistory.csv'))

    # Append the new row
    with open(UsersLocation, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow([userID, title, date, time, location, numberOfTickets])


def addReview(ID, review):
    # Get the absolute path to Movies.csv
    scriptDir = os.path.dirname(os.path.realpath(__file__))
    UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Movies.csv'))

    # Read all rows from the CSV
    with open(UsersLocation, 'r', newline='', encoding='utf-8') as file:
        reader = list(csv.reader(file))

    # Check if the ID is valid
    if ID <= 0 or ID >= len(reader):
        print("Invalid ID")
        return

    # Append the review to the Reviews column
    if len(reader[ID]) < 8:
        # If Reviews column is missing, add it
        reader[ID].append(review)
    else:
        # If already a review exists, append with separator
        if reader[ID][7].strip():
            reader[ID][7] += f' | {review}'
        else:
            reader[ID][7] = review

    # Write updated rows back to the CSV
    with open(UsersLocation, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(reader)
