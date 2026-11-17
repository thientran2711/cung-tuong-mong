#!/bin/bash
# upload.sh BATCHNAME : for every key in progress/ids.tsv not yet in progress/uploaded.txt: ensure hd twin, copy to img/, cdn_sync, check, write hd-entries fragment.
R=/home/user/cung-tuong-mong; B=$R/dev/handover/reports/fig-cutout-clean; P=$B/batch-consort-ty-tools
S=/tmp/claude-0/-home-user-cung-tuong-mong/67d1407f-68b2-5631-8d46-96a77ea62baf/scratchpad
cd $R; touch $P/progress/uploaded.txt; mkdir -p img/hd $B/hd-entries; export FORCE_HD=1
F=""; keys=()
while IFS=$'\t' read k id; do [ -z "$REDO" ] && grep -qx "$k" $P/progress/uploaded.txt && continue; [ -f $S/out/img/fig-$k.webp ] || continue
  [ -f $S/out/img/hd/fig-$k.webp ] || (cd $B && python3 -I tools/finish_fig.py $S/m/$k.png $k $S/out >/dev/null 2>&1)
  [ -f $S/out/img/hd/fig-$k.webp ] || { echo "NO HD $k"; continue; }
  keys+=($k); for f in fig-$k por-$k; do cp $S/out/img/$f.webp img/; F="$F img/$f.webp"; done; cp $S/out/img/hd/fig-$k.webp img/hd/; F="$F img/hd/fig-$k.webp"
done < <(if [ -n "$KEYS" ]; then awk -F"\t" 'NR==FNR{k[$1]=1;next} ($1 in k)' $KEYS $P/progress/ids.tsv; else cat $P/progress/ids.tsv; fi)
echo "${#keys[@]} keys"; [ ${#keys[@]} -eq 0 ] && exit 0
python3 dev/site/cdn_sync.py $F 2>&1 | tail -2; python3 dev/site/cdn_sync.py --check $F 2>&1 | tail -1
python3 -I - "$B/hd-entries/consort-ty-$1.json" "${keys[@]}" <<'PY'
import sys,json
from PIL import Image
out=sys.argv[1]; d={}
for k in sys.argv[2:]:
    d[f"fig-{k}.webp"]=[Image.open(f"img/fig-{k}.webp").width, Image.open(f"img/hd/fig-{k}.webp").width]
json.dump(d,open(out,"w"),indent=0); print(len(d),"entries ->",out)
PY
printf "%s\n" "${keys[@]}" >> $P/progress/uploaded.txt
