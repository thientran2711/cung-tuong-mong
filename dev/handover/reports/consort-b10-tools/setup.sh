#!/bin/bash
# setup.sh cNN : download live a26 (fallback a18) + current b10-a26 set + sheet
cd /home/user/wt/w59d-work; c=$1; B=https://ctm-img.victoria-tntt.workers.dev/img; mkdir -p $c/live $c/v
for k in 1 2 3 4 5 6 7 8; do
 (curl -sSf -o $c/live/t$k.webp $B/hd/fig-consort-$c-t$k-a26.webp || { echo "MISSING live t$k a26 -> a18"; curl -sS -o $c/live/t$k.webp $B/hd/fig-consort-$c-t$k-a18.webp; }) &
 for v in 0 1 2; do (curl -sS --retry 3 -o $c/v/v${v}_t$k.png $B/_review/consort-tiers/$c/b10-a26/${c}_a26_t${k}_v$v.png) & done
done; wait
curl -sS -o $c/sheet_old.jpg $B/_review/consort-tiers/$c/b10-a26/${c}_a26_b10_sheet.jpg
python3 - <<PY
from PIL import Image
im=Image.open('$c/sheet_old.jpg');im.resize((1400,int(im.height*1400/im.width))).save('$c/sheet_old_s.jpg',quality=85)
import glob
for f in glob.glob('$c/v/*.png'):
    try: Image.open(f).verify()
    except Exception as e: print('BAD',f)
PY
