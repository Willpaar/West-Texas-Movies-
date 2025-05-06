import csv
import os

class User:
    def __init__(self, name, email, phone, address, apt, password, admin):
        self.name = name
        self.email = email
        self.phone = phone
        self.address = address
        self.apt = apt
        self.password = password
        self.admin = bool(int(admin))  # Make sure it's a proper Boolean

    def to_dict(self):
        """Convert the user object to a dictionary (excluding password optionally)."""
        return {
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "apt": self.apt,
            "admin": self.admin
        }

def GetUserData(ID):
    try:
        scriptDir = os.path.dirname(os.path.realpath(__file__))
        UsersLocation = os.path.abspath(os.path.join(scriptDir, '../database/Users.csv'))

        with open(UsersLocation, mode='r') as file:
            csv_reader = csv.DictReader(file)
            rows = list(csv_reader)
            
            if ID < 1 or ID > len(rows):
                return None
            
            row = rows[ID - 1]

            user = User(
                name=row["Name"],
                email=row["Email"],
                phone=row["Phone"],
                address=row["Address"],
                apt=row["Apt"],
                password=row["Password"],
                admin=row["Admin"]
            )
            return user.to_dict()

    except Exception as e:
        print(f"Error reading Users.csv: {e}")
        return -1
