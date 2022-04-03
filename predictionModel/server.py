import socketserver
from http.server import BaseHTTPRequestHandler
import random

def getAiResponse():
    # return converting to string
    return str(random.randint(1, 5))

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/predict':
            response = bytes(getAiResponse(), "utf-8") #create response

            self.send_response(200) #create header
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()

            self.wfile.write(response) #send response


httpd = socketserver.TCPServer(("", 8080), MyHandler)
httpd.serve_forever()