#!/bin/bash
# publish.sh cNN  (uses $S/cNN/v/v{0,1,2}_tN.png and sheet.jpg)
S=${S:-/path/to/scratch}  # set to your scratch dir
c=$1; R=$S/root; D=$R/img/_review/consort-tiers/$c/b10-a36; mkdir -p $D
for v in 0 1 2; do for t in 1 2 3 4 5 6 7 8; do cp $S/$c/v/v${v}_t$t.png $D/${c}_a36_t${t}_v$v.png; done; done
cp $S/$c/sheet.jpg $D/${c}_a36_b10_sheet.jpg
cd $R && python3 dev/site/cdn_sync.py img/_review/consort-tiers/$c/b10-a36 2>&1 | tail -5
python3 dev/site/cdn_sync.py --check img/_review/consort-tiers/$c/b10-a36 2>&1 | tail -3
