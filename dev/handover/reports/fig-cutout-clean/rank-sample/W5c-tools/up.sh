#!/bin/bash
# usage: up.sh D3 "m27-ty2 m27-ty3 ..." fragname
D=$1; K=$2; FR=$3; R=/home/user/cung-tuong-mong; cd /tmp/claude-0/w; F=""
mkdir -p $R/img/hd $R/img/tn
for k in $K; do for p in fig-maid-$k-a18.webp hd/fig-maid-$k-a18.webp tn/fig-maid-$k-a18.webp por-maid-$k-a18.webp; do [ -f $D/out/img/$p ] && cp $D/out/img/$p $R/img/$p && F="$F img/$p"; done; done
cd $R && python3 dev/site/cdn_sync.py $F 2>&1 | tail -2; python3 dev/site/cdn_sync.py --check $F 2>&1 | tail -1
python3 -I - <<PY
import json
keys={f'fig-maid-{k}-a18.webp' for k in "$K".split()}
d={k:v for k,v in json.load(open('$R/dev/handover/reports/fig-cutout-clean/hd-entries/W5c-$D.json')).items() if k in keys}
json.dump(d,open('/home/user/wt/w5c/dev/handover/reports/fig-cutout-clean/hd-entries/$FR.json','w')); print(len(d),'frag entries')
PY
