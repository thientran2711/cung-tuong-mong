#!/bin/bash
# usage: modgate.sh <LIVE sha> <candidate sha> : every dev/build/*.js module named in LIVE's assemble.py must be named in the candidate's
L=$1; C=$2; R=/home/user/cung-tuong-mong
m(){ git -C $R show $1:dev/build/assemble.py | grep -oE "'j[A-Za-z0-9_-]*\.js'" | tr -d "'" | sed 's/\.js$//' | sort -u; }
miss=$(comm -23 <(m $L) <(m $C)); n=$(m $C | wc -l); nl=$(m $L | wc -l)
if [ -n "$miss" ]; then echo "MODGATE FAIL: $C drops LIVE modules: $miss"; exit 1; fi; echo "MODGATE PASS: $C $n modules ⊇ LIVE $nl"
