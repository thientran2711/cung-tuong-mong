#!/bin/bash
# upload.sh TAG key1 key2 ... : copy to img/, cdn_sync explicit paths, write fragment hd-entries/W3e-TAG.json
set -e; R=/home/user/wt/w3e; T=$1; shift; cd $R; mkdir -p img/hd img/tn; F=()
for k in "$@"; do for p in fig-consort-$k.webp hd/fig-consort-$k.webp tn/fig-consort-$k.webp por-consort-$k.webp; do s=out/$T/img/$p; [ -f $s ] && { mkdir -p img/$(dirname $p); cp $s img/$p; F+=(img/$p); }; done; done
python3 scratch/cdn_sync.py "${F[@]}" 2>&1 | tail -3
python3 scratch/cdn_sync.py --check "${F[@]}" 2>&1 | tail -2
python3 -I - "$T" "$@" <<'P'
import sys,json
from PIL import Image
t=sys.argv[1];d={}
for k in sys.argv[2:]:
    n=f"fig-consort-{k}.webp"
    try: d[n]=[Image.open(f"/home/user/wt/w3e/out/{t}/img/{n}").width,Image.open(f"/home/user/wt/w3e/out/{t}/img/hd/{n}").width]
    except Exception as e: print("frag skip",k,e)
json.dump(d,open(f"/home/user/wt/w3e/dev/handover/reports/fig-cutout-clean/hd-entries/W3e-{t}.json","w"))
print("fragment",len(d))
P
