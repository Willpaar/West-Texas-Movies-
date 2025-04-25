import json
from http.server import BaseHTTPRequestHandler, HTTPServer
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