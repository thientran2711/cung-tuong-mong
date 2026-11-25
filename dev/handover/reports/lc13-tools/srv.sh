# usage: srv.sh <dir> <port> — restart loop
while true; do python3 -m http.server $2 --bind 127.0.0.1 -d $1 >/dev/null 2>&1; sleep 1; done
