import http.server,sys,functools
H=http.server.SimpleHTTPRequestHandler
H.extensions_map={**H.extensions_map,'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'}
http.server.ThreadingHTTPServer(('127.0.0.1',int(sys.argv[1])),functools.partial(H,directory=sys.argv[2])).serve_forever()
