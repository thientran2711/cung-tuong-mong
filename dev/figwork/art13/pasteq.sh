#!/bin/bash
# pasteq.sh c:modes ... : paste ed/q<c>.png into figs (modes default m,m,m,ma,m,m,m,ma), log g/pq<c>.log, delete edit png? no (kept for sheets)
cd "$(dirname "$0")"
for a in "$@"; do
  c=${a%%:*}; m=${a#*:}; [ "$m" = "$a" ] && m=m,m,m,ma,m,m,m,ma
  python3 -I hdg.py paste q$c ed/q$c.jpg $m > g/pq$c.log 2>&1 && echo "pasted $c $(awk '{print $9}' g/pq$c.log | tr '\n' ' ')" || echo "FAIL $c"
done
