#!/bin/bash
# up2.sh NAME KEYFILE : upload fig/por/hd of the keys (all looked at) + write hd-entries/W2c-NAME.json
S=/tmp/claude-0/-home-user-cung-tuong-mong/b0fea55b-58f1-53e0-a07a-3e5ec42514dd/scratchpad
B=/home/user/cung-tuong-mong/dev/handover/reports/fig-cutout-clean; C=$S/cdnroot
cd $C; mkdir -p img/hd; F=""; keys=()
for k in $(cat $2); do
  for f in fig-$k por-$k; do [ -f $S/out/img/$f.webp ] || { echo "MISSING $f"; continue 2; }; done
  [ -f $S/out/img/hd/fig-$k.webp ] || { echo "NO HD $k"; continue; }
  cp $S/out/img/fig-$k.webp $S/out/img/por-$k.webp img/; cp $S/out/img/hd/fig-$k.webp img/hd/
  F="$F img/fig-$k.webp img/por-$k.webp img/hd/fig-$k.webp"; keys+=($k)
done
echo "${#keys[@]} keys"; [ ${#keys[@]} -eq 0 ] && exit 0
python3 dev/site/cdn_sync.py $F 2>&1 | tail -2; python3 dev/site/cdn_sync.py --check $F 2>&1 | tail -1
python3 -I - "$B/hd-entries/W2c-$1.json" "${keys[@]}" <<'PY'
import sys,json
from PIL import Image
out=sys.argv[1]; d={}
for k in sys.argv[2:]:
    d[f"fig-{k}.webp"]=[Image.open(f"img/fig-{k}.webp").width, Image.open(f"img/hd/fig-{k}.webp").width]
json.dump(d,open(out,"w"),indent=0); print(len(d),"entries ->",out)
PY
