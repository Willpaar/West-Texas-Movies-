import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from Functions.AddtoUsers import AddtoUsers
from Functions.FetchUser import FetchUser


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
        
        #if you want to add more functions add it to the route and the create a function above routes with all the data to be used

        #add routes here 
        routes = {
            '/create-account': handle_create_account,
            '/login': handle_login,
        }

        #any function you write must pass the result >= 1 or a string or it will assume it is a fail
        if self.path in routes:
            try:
                result = routes[self.path](data)
                self._set_headers()
                
                # Check if result is a successful integer or a non-empty string
                if (isinstance(result, int) and result >= 1) or (isinstance(result, str) and result.strip()):
                    self.wfile.write(json.dumps({'success': True, 'data': result}).encode())
                else:
                    self.wfile.write(json.dumps({'success': False, 'errorCode': result}).encode())  

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