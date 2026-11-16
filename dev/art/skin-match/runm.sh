#!/bin/bash
# runm.sh PART_LIST OUTJSONL : download chunks of 100 fig-*, measure (nice 10), delete
cd /home/user/wt/skin-audit
L=$1; O=$2; D=.ahcache/sm/dl_$(basename $L); mkdir -p $D
split -l 100 $L $D.chunk.
for c in $D.chunk.*; do
  xargs -a $c -P4 -I{} sh -c 'curl -sS -f --retry 3 -o '$D'/$(basename {}) https://ctm-img.victoria-tntt.workers.dev/{}' 
  nice -n 10 .ahcache/sm/venv/bin/python dev/art/skin-match/measure.py $O $D/fig-*.webp 2>>$O.err
  rm -f $D/*.webp $c
done
echo DONE >> $O.done
