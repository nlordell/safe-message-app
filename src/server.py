from http.server import HTTPServer, SimpleHTTPRequestHandler

host = '0.0.0.0'
port = 8999

class CORSRequestHandler(SimpleHTTPRequestHandler):
  def end_headers(self):
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header('Access-Control-Allow-Methods', 'GET')
    self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
    return super(CORSRequestHandler, self).end_headers()

print(f'serving at http://{host}:{port}')
httpd = HTTPServer((host, port), CORSRequestHandler)
httpd.serve_forever()
