# python3 serve.py PORT ROOT : static server for ROOT; img/* (and audio/*) missing locally are proxied from the CDN (no disk cache)
import http.server,sys,os,urllib.request,socketserver
PORT=int(sys.argv[1]);ROOT=sys.argv[2];CDN='https://ctm-img.victoria-tntt.workers.dev/'
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def log_message(s,*a): pass
    def do_GET(s):
        p=s.path.split('?')[0].lstrip('/')
        if (p.startswith('img/') or p.startswith('audio/')) and not os.path.exists(os.path.join(ROOT,p)):
            try:
                with urllib.request.urlopen(urllib.request.Request(CDN+p,headers={'User-Agent':'Mozilla/5.0'}),timeout=60) as r:
                    b=r.read();s.send_response(200);s.send_header('Content-Type',r.headers.get('Content-Type','application/octet-stream'));s.send_header('Content-Length',str(len(b)));s.end_headers();s.wfile.write(b)
            except Exception as e:
                s.send_response(404);s.end_headers()
            return
        return super().do_GET()
class T(socketserver.ThreadingMixIn,http.server.HTTPServer): daemon_threads=True
T(('127.0.0.1',PORT),H).serve_forever()
