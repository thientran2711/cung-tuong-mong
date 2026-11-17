#!/bin/bash
# usage: up.sh tsv fragmentname  (uploads keys of tsv from /tmp/w6c/${DIR:-r1}/out)
cd /home/user/cung-tuong-mong
L=""
for k in $(cut -f1 $1); do cp /tmp/w6c/${DIR:-r1}/out/img/fig-$k.webp img/; cp /tmp/w6c/${DIR:-r1}/out/img/hd/fig-$k.webp img/hd/; cp /tmp/w6c/${DIR:-r1}/out/img/por-$k.webp img/; L="$L img/fig-$k.webp img/hd/fig-$k.webp img/por-$k.webp"; done
python3 dev/site/cdn_sync.py $L 2>&1 | tail -2
python3 dev/site/cdn_sync.py --check $L 2>&1 | tail -1
python3 - $1 $2 <<'P'
import sys,json
from PIL import Image
d={}
for k in [l.split('\t')[0] for l in open(sys.argv[1])]:
    b=f'fig-{k}.webp'
    d[b]=[Image.open('img/'+b).width,Image.open('img/hd/'+b).width]
json.dump(d,open(f'dev/handover/reports/fig-cutout-clean/hd-entries/{sys.argv[2]}.json','w'));print(len(d))
P
