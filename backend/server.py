import json
import base64
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import cgi
import csv

from Functions.GetMovie import getMovie 
from Functions.AddtoUsers import AddtoUsers
from Functions.FetchUser import FetchUser
from Functions.GetUserData import GetUserData
from Functions.getOrderHistory import getOrderHistory
import Functions.ChangeValues as Ch

# This is the class to handle all requests to the backend
class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_POST(self):

        content_type = self.headers.get('Content-Type')

        if self.path == '/Add-Movie' and content_type and content_type.startswith('multipart/form-data'):
            pdict = cgi.parse_header(content_type)[1]
            pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
            pdict['CONTENT-LENGTH'] = int(self.headers['Content-Length'])

            form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={'REQUEST_METHOD': 'POST'}, keep_blank_values=True)

            data = {}
            for field in form.keys():
                if field == 'file':
                    data[field] = form[field]
                else:
                    data[field] = form.getvalue(field)
        else:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

        if self.path in self.routes:
            try:
                result = self.routes[self.path](data)
                self._set_headers()

                if isinstance(result, int) and result <= -1:
                    self.wfile.write(json.dumps({'success': False, 'errorCode': result}).encode())
                    print(result)
                else:
                    self.wfile.write(json.dumps({'success': True, 'data': result}).encode())
                    print(result)
            except Exception as e:
                print('Error handling POST request:', e)
                self.send_error(500, f'Error: {e}')
        else:
            self.send_error(404, 'Invalid route')

    def do_GET(self):
        if self.path == '/get-movies':
            try:
                movie_dict = {}
                with open('database/Movies.csv', mode='r', encoding='utf-8') as file:
                    reader = csv.DictReader(file)
                    for idx, row in enumerate(reader, start=1):  # start=1 for 1-based indexing
                        movie_title = row['Movie']
                        if movie_title not in movie_dict:
                            movie_dict[movie_title] = {
                                'title': movie_title,
                                'img': row['Img'],
                                'upcoming': row['Upcoming'],
                                'showtimes': []
                            }
                        movie_dict[movie_title]['showtimes'].append({
                            'id': idx,  # Unique ID per showtime
                            'location': row['Location'],
                            'date': row['Date'],
                            'times': row['Times']
                        })

                movies = list(movie_dict.values())
                self._set_headers()
                self.wfile.write(json.dumps({'success': True, 'movies': movies}).encode())
            except Exception as e:
                print('Error handling GET /get-movies:', e)
                self.send_error(500, f'Error: {e}')
        else:
            self.send_error(404, f'Path {self.path} not found')

    # Route handler functions
    def handle_create_account(self, data):
        return AddtoUsers(data['email'], data['name'], data['phone'], data['address'], data['apt'], data['password'])

    def handle_login(self, data):
        return FetchUser(data['email'], data['password'])

    def handle_GetUserData(self, data):
        return GetUserData(data['ID'])

    def handle_ChangeName(self, data):
        return Ch.changeName(data['ID'], data['name'])

    def handle_ChangeEmail(self, data):
        return Ch.changeEmail(data['ID'], data['email'])

    def handle_ChangePhone(self, data):
        return Ch.changePhone(data['ID'], data['phone'])

    def handle_ChangeAddress(self, data):
        return Ch.changeAddress(data['ID'], data['address'], data['apt'])

    def handle_ChangePassword(self, data):
        return Ch.changePassword(data['ID'], data['oldPassword'], data['newPassword'])

    def handle_DeleteAccount(self, data):
        return Ch.deleteAccount(data['ID'])

    def handle_GiveAdmin(self, data):
        return Ch.giveAdmin(data['email'])

    def handle_addMovie(self, data):
        title = data['title']
        filename = data.get('filePath')
        upcoming = int(data['upcoming'])  # Make sure it's int (0 or 1)
        date = data['date']
        file_content = data.get('file')
        location = data['location']

        print(location)
        # HARD SET
        if upcoming == 1:
            times = ''
        else:
            times = data['times']


        return Ch.addMovie(
            title=title,
            filename=filename,
            location=location,
            upcoming=upcoming,
            date=date,
            times=times,
            file=file_content
        )

    def handle_deleteMovie(self, data):
        return Ch.deleteMovie(data['title'],data ['location'], data['date'])
    
    def handle_getMovie(self, data):
        return getMovie(data['ID'])
    
    def handle_addPurchase(self, data):
        return Ch.addPurchase(data['userID'],data['title'],data['date'],data['time'],data['location'],data['numberOfTickets'])
    
    def handle_getOrderHistory(self, data):
        return getOrderHistory(data['ID'])

    @property
    def routes(self):
        return {
            '/create-account': self.handle_create_account,
            '/login': self.handle_login,
            '/get-user-data': self.handle_GetUserData,
            '/Change-Email': self.handle_ChangeEmail,
            '/Change-Phone': self.handle_ChangePhone,
            '/Change-Address': self.handle_ChangeAddress,
            '/Change-Password': self.handle_ChangePassword,
            '/Change-Name': self.handle_ChangeName,
            '/Delete-Account': self.handle_DeleteAccount,
            '/Give-Admin': self.handle_GiveAdmin,
            '/Add-Movie': self.handle_addMovie,
            '/Delete-Movie': self.handle_deleteMovie,
            '/Get-Movie': self.handle_getMovie,
            '/Add-Purchase': self.handle_addPurchase,
            '/Get-Order-History': self.handle_getOrderHistory,
        }

# Run backend server
def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting Backend Server:')
    print(f'Serving on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
