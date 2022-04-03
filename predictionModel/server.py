import socketserver
from http.server import BaseHTTPRequestHandler
import random
from urllib.parse import parse_qs
#from cgi import parse_header, parse_multipart
import cgi


def getAiResponse():
    # return converting to string
    val = str(random.randint(0, 4))
    # create json
    return '{"category":' + val + '}'

class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        if self.path == '/predict':
            response = bytes(getAiResponse(), "utf-8") #create response

            self.send_response(200) #create header
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()

            self.wfile.write(response) #send response

    def do_POST(self):
        self._set_headers()
        postvars = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD': 'POST'}
        )

        # Get the data from the form
        response = []

        for key in postvars.keys():
            value = str(postvars.getvalue(key))
            t = (key+':' + value)
            print(t)
            response.append(t)

        # convert to string and send
        response = bytes(str(response), "utf-8")

        self.send_response(200) #create header
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()

        self.wfile.write(response) #send response

httpd = socketserver.TCPServer(("", 8888), MyHandler)
httpd.serve_forever()