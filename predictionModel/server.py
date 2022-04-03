import socketserver
from http.server import BaseHTTPRequestHandler
import random
from urllib.parse import parse_qs, urlparse
from classPrediction import predictValue

class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        print(self.path)
        # check if first characters are /predict
        if self.path.startswith('/predict'):
            fields = parse_qs(urlparse(self.path).query)

            # check for field "valor_financ"
            if ('valor_financ' not in fields):
                self.send_response(400)
                self.end_headers()
                return
            
            # Get a random user id to generate a new person
            id = random.randint(1, 10000)

            # Values that will be sent to the prediction model
            send = {
                'valor_financ':fields['valor_financ'][0], 
                'id': id
            }

            # convert to string and send to get prediction
            response = str(predictValue(send))

            # Create json response
            response = bytes('{ "category": '+ response +'}', "utf-8")
            
            # create headers
            self.send_response(200)
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()

            #send response
            self.wfile.write(response) 

httpd = socketserver.TCPServer(("", 3737), MyHandler)
httpd.serve_forever()