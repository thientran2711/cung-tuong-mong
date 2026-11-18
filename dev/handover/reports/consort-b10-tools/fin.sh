#!/bin/bash
# fin.sh cNN : sheet + publish to img/_review/consort-tiers/cNN/b10-a26/
cd /home/user/wt/w59c-work; c=$1; R=$PWD/cdnroot; D=$R/img/_review/consort-tiers/$c/b10-a26; mkdir -p $D
python3 tools/sheet2.py $c/v $c/sheet.jpg $c >/dev/null
for v in 0 1 2; do for t in 1 2 3 4 5 6 7 8; do cp $c/v/v${v}_t$t.png $D/${c}_a26_t${t}_v$v.png; done; done
cp $c/sheet.jpg $D/${c}_a26_b10_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py img/_review/consort-tiers/$c/b10-a26 2>&1 | tail -4
python3 dev/site/cdn_sync.py --check img/_review/consort-tiers/$c/b10-a26 2>&1 | tail -3
