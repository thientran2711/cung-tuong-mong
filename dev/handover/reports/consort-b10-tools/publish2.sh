#!/bin/bash
S=/home/user/wt/w62e; c=$1; R=$S/root; D=$R/img/_review/consort-tiers/$c/b10-a36; mkdir -p $D
python3 $S/tools/sheet3.py $S/$c/v $S/$c/sheet.jpg $c >/dev/null
for v in 0 1 2; do for t in 1 2 3 4 5 6 7 8; do [ -f $S/$c/v/v${v}_t$t.png ] && cp $S/$c/v/v${v}_t$t.png $D/${c}_a36_t${t}_v$v.png; done; done
cp $S/$c/sheet.jpg $D/${c}_a36_b10_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py img/_review/consort-tiers/$c/b10-a36 2>&1 | tail -3
python3 dev/site/cdn_sync.py --check img/_review/consort-tiers/$c/b10-a36 2>&1 | tail -2
