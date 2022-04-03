import socketserver
from http.server import BaseHTTPRequestHandler
import random
from urllib.parse import parse_qs
#from cgi import parse_header, parse_multipart
import cgi


def getAiResponse():
    # return converting to string
    return str(random.randint(1, 5))

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
        '''ctype, pdict = parse_header(self.headers.get_content_charset('content-type'))
        if ctype == 'multipart/form-data':
            postvars = parse_multipart(self.rfile, pdict)
        elif ctype == 'application/x-www-form-urlencoded':
            length = int(self.headers.get_content_charset('content-length'))
            postvars = parse_qs(self.rfile.read(length), keep_blank_values=1)
        else:
            postvars = {}'''
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

httpd = socketserver.TCPServer(("", 8080), MyHandler)
httpd.serve_forever()