import os
import csv

def getOrders(id):
    scriptDir = os.path.dirname(os.path.realpath(__file__))  # Current script directory
    orderHistoryPath = os.path.abspath(os.path.join(scriptDir, '../database/OrderHistory.csv'))

    results = []

    with open(orderHistoryPath, 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            results.append({
                'userID': row['UserID'],  # Include UserID since we're not filtering by it
                'movieTitle': row['Title'],
                'date': row['Date'],
                'time': row['Time'],
                'location': row['Location'],
                'numTickets': row['NumberOfTickets']
            })

    return results
