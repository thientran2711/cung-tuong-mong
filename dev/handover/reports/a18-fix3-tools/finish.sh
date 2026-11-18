#!/bin/bash
# finish.sh cNN : needs W/cNN/new/tN_vK.png (the fixed files). Downloads the other files, builds sheet, publishes (old fixed files kept as _prev_a18scan2).
c=$1; W=/home/user/wt/w65c-work; A=$W/all; R=/home/user/wt/w65c-root
B=https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/$c/b10
D=$R/img/_review/consort-tiers/$c/b10; mkdir -p $D
for t in 1 2 3 4 5 6 7 8; do for v in 0 1 2; do
  f=${c}_t${t}_v$v.png
  if [ -f $W/$c/new/t${t}_v$v.png ]; then
     curl -sS --retry 5 --retry-all-errors -o $D/${c}_a18_t${t}_v${v}_prev_a18scan2.png $B/${c}_a18_t${t}_v$v.png
     cp $W/$c/new/t${t}_v$v.png $A/$f; cp $W/$c/new/t${t}_v$v.png $D/${c}_a18_t${t}_v$v.png
  else [ -f $A/$f ] || curl -sS --retry 5 --retry-all-errors -o $A/$f $B/${c}_a18_t${t}_v$v.png; fi
done; done
python3 $W/tools/sheet.py $A $W/sheets $c
cp $W/sheets/${c}_a18_b10_sheet.jpg $D/
cd $R && python3 dev/site/cdn_sync.py img/_review/consort-tiers/$c/b10 2>&1 | tail -3
python3 dev/site/cdn_sync.py --check img/_review/consort-tiers/$c/b10 2>&1 | tail -3
