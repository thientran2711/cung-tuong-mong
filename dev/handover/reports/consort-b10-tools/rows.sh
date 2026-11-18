#!/bin/bash
# rows.sh cNN  -> cNN/h_{live,v0,v1,v2}_{a,b}.jpg  (a=t1-4, b=t5-8)
cd /home/user/wt/w59c-work; c=$1
for p in "a 1 2 3 4" "b 5 6 7 8"; do set -- $p; s=$1; shift
python3 tools/half.py $c/h_live_$s.jpg $(for k in $@; do echo $c/live/t$k.webp; done) >/dev/null
for v in 0 1 2; do d=$c/old; [ -n "$OLD" ] || d=$c/v; python3 tools/half.py $c/h_v${v}_$s.jpg $(for k in $@; do echo $d/v${v}_t$k.png; done) >/dev/null; done; done
