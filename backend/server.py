import json
import base64
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import cgi
from Functions.AddtoUsers import AddtoUsers
from Functions.FetchUser import FetchUser
from Functions.GetUserData import GetUserData
import Functions.ChangeValues as Ch



#this is the class to handle all requests to the backend
class RequestHandler(BaseHTTPRequestHandler):
    #nessary for server
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    def do_OPTIONS(self):
        self._set_headers() 


    #call python functions here 
    def do_POST(self):
        content_type = self.headers.get('Content-Type')

                # If it's multipart/form-data (file upload for /Add-Movie)
        if self.path == '/Add-Movie' and content_type and content_type.startswith('multipart/form-data'):
            # Special handling for file uploads
            pdict = cgi.parse_header(content_type)[1]
            pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
            pdict['CONTENT-LENGTH'] = int(self.headers['Content-Length'])

            form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={'REQUEST_METHOD': 'POST'}, keep_blank_values=True)

            # Build 'data' dictionary manually from form fields
            data = {}
            for field in form.keys():
                if field == 'file':
                    data[field] = form[field]  # Keep the file object for 'file'
                else:
                    data[field] = form.getvalue(field)

        else:
            # Default: JSON body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

        #Route handler functions
        def handle_create_account(data):
            return AddtoUsers(data['email'], data['name'], data['phone'], data['address'], data['apt'], data['password'])
        
        def handle_login(data):
            return FetchUser(data['email'], data['password'])
        
        def handle_GetUserData(data):
            print(data)
            return GetUserData(data['ID'])
        
        def handle_ChangeName(data):
            return Ch.changeName(data['ID'], data['name'])
        
        def handle_ChangeEmail(data):
            return Ch.changeEmail(data['ID'], data['email'])

        def handle_ChangePhone(data):
            return Ch.changePhone(data['ID'], data['phone'])

        def handle_ChangeAddress(data):
            return Ch.changeAddress(data['ID'], data['address'], data['apt'])

        def handle_ChangePassword(data):
            return Ch.changePassword(data['ID'], data['oldPassword'], data['newPassword'])
        
        def handle_DeleteAccount(data):
            return Ch.deleteAccount(data['ID'])
        
        def handle_GiveAdmin(data):
            return Ch.giveAdmin(data['email'])
        
        def handle_addMovie(data):
            title = data['title']
            location = data['location']
            date = data['date']
            times = data['times']
            upcoming = data['upcoming']
            
            # 'filePath' is the file name and 'file' is the file content (base64 or binary)
            filename = data.get('filePath')  # file name (string)
            file_content = data.get('file')  # the actual file content (base64 or binary data)
            
            # Call your database function with the title, file path, and other data
            return Ch.addMovie(title, filename, location, upcoming, date, times, file_content)
        
        #if you want to add more functions add it to the route and the create a function above routes with all the data to be used

        #add routes here 
        routes = {
            '/create-account': handle_create_account,
            '/login': handle_login,
            '/get-user-data': handle_GetUserData,
            '/Change-Email': handle_ChangeEmail,
            '/Change-Phone': handle_ChangePhone,
            '/Change-Address': handle_ChangeAddress,
            '/Change-Password': handle_ChangePassword,
            '/Change-Name': handle_ChangeName,
            '/Delete-Account': handle_DeleteAccount,
            '/Give-Admin': handle_GiveAdmin,
            '/Add-Movie': handle_addMovie,
        }

        #if the function returns any negative nunmber it will return an error else it will return the result
        if self.path in routes:
            try:
                result = routes[self.path](data)
                self._set_headers()
                
                if (isinstance(result, int) and result <= -1):
                    self.wfile.write(json.dumps({'success': False, 'errorCode': result}).encode())  
                    print(result)
                else:                
                    self.wfile.write(json.dumps({'success': True, 'data': result}).encode())
                    print(result)
            except Exception as e:
                self.send_error(500, f'Error: {e}')



#run backend server
def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting Backend Server:')
    print(f'Serving on port {port}...')
    httpd.serve_forever()
if __name__ == '__main__':
    run()