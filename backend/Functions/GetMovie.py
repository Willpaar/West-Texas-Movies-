import csv
import os

def getMovie(ID):
    scriptDir = os.path.dirname(os.path.realpath(__file__))  # Get the current script directory
    movieFilePath = os.path.abspath(os.path.join(scriptDir, '../database/Movies.csv'))  # Path to the Movies.csv file

    ID = int(ID)

    with open(movieFilePath, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for idx, row in enumerate(reader, start=1):  # start=1 for 1-based indexing
            if idx == ID:
                # Return the movie details as a dictionary
                return {
                    'title': row['Movie'],
                    'img': row['Img'],
                    'location': row['Location'],
                    'date': row['Date'],
                    'description': row['Description'],                    
                    'reviews': row['Reviews']
                }
        return -1  

