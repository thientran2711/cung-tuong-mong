#!/bin/bash
# upload.sh — for every fixed file in .ahcache/sm/out not yet uploaded: cutcheck before vs after (alpha untouched → same score),
# copy into img/ and push with cdn_sync (one call per 40 files). Log: .ahcache/sm/uploaded.txt, cutcheck rows .ahcache/sm/cut.tsv
W=/home/user/wt/skin-match; cd $W; S=.ahcache/sm; touch $S/uploaded.txt
python3 -c "
import json,os
for l in open('$S/fix.jsonl'):
    r=json.loads(l)
    for k in (r['f'], r.get('por')):
        if k and os.path.exists('$S/out/'+k): print(k)" | grep -vxF -f $S/uploaded.txt > $S/up_new.txt
[ -s $S/up_new.txt ] || { echo nothing; exit 0; }
mkdir -p img
for f in $(cat $S/up_new.txt); do
  cp $S/out/$f img/$f
done
# cutcheck the fixed files in one process (after); files scoring >= 1 are re-checked against their CDN original (before)
nice -n 19 python3 dev/figwork/cutcheck.py $(sed 's#^#img/#' $S/up_new.txt) 2>/dev/null | awk '{print $NF"\t"$1}' | sed 's#img/##' > $S/cut_after.tmp
awk -F'\t' '$2>=1' $S/cut_after.tmp | while IFS=$'\t' read f a; do b=$(nice -n 19 python3 dev/figwork/cutcheck.py $S/base/$f 2>/dev/null | awk '{print $1}'); printf "%s\t%s\t%s\n" "$f" "$b" "$a"; done >> $S/cut_flag.tsv
awk -F'\t' '$2<1{print $1"\t<1\t"$2}' $S/cut_after.tmp >> $S/cut.tsv; cat $S/cut_flag.tsv >> $S/cut.tsv; : > $S/cut_flag.tsv
split -l 40 $S/up_new.txt $S/upc.
for c in $S/upc.*; do
  if python3 dev/site/cdn_sync.py $(sed 's#^#img/#' $c) > $S/up.log 2>&1; then cat $c >> $S/uploaded.txt; else echo "UPLOAD FAIL $c"; tail -3 $S/up.log; fi
  rm $c
done
rm -f img/*.webp; wc -l $S/uploaded.txt
