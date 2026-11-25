#!/bin/bash
# usage: c.sh [tapindex] ; prints candidates
[ -n "$1" ] && curl -s "localhost:8200/tap?i=$1" >/dev/null && sleep ${2:-2}
curl -s localhost:8200/c | python3 -c "
import json,sys
for i,c in enumerate(json.load(sys.stdin)):print(i,c['cls'][:18],c['id'],repr(c['txt'][:70]),c['cx'],c['cy'])"
curl -s "localhost:8200/shot?t=s" >/dev/null; ls -t /home/user/wt/m4/out/shots | head -1
