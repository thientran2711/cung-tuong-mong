#!/bin/bash
# upx.sh <n> keys...   (A/B sheets from w/X_A, w/X_B; work dir wx)
n=$1; shift; W=/tmp/claude-0/thact/wx; X=/tmp/claude-0/thact/w; R=/home/user/cung-tuong-mong; D=img/_review/emo-anim-groups/tonedown/act; cd $R; L=""
cp $W/sh$n/th-act-action-batch$n-anim.mp4 $W/sh$n/th-act-action-batch$n-anim.webp $D/; L="$L $D/th-act-action-batch$n-anim.mp4 $D/th-act-action-batch$n-anim.webp"
for k in "$@"; do for p in out loop back; do cp $W/webp2/$k-$p.webp $D/th-act-$k-$p-M2349.webp; L="$L $D/th-act-$k-$p-M2349.webp"; done
python3 -c "
from PIL import Image
Image.open('$X/X_A/$k-g.png').resize((1024,1024),Image.LANCZOS).save('$D/th-act-$k-A-M2349.png')
Image.open('$X/X_B/$k-g.png').resize((1024,1024),Image.LANCZOS).save('$D/th-act-$k-B-M2349.png')"; L="$L $D/th-act-$k-A-M2349.png $D/th-act-$k-B-M2349.png"; done
python3 - "$n" "$@" <<'PY'
import sys
from PIL import Image
n=sys.argv[1]; ks=sys.argv[2:]; X='/tmp/claude-0/thact/w'
ims=[[Image.open(f'{X}/{d}/{k}-g.png').resize((400,400)) for k in ks] for d in ('X_A','X_B')]
s=Image.new('RGB',(400*len(ks),800),'white')
for r,row in enumerate(ims):
  for c,m in enumerate(row): s.paste(m,(c*400,r*400))
s.save('/home/user/cung-tuong-mong/img/_review/emo-anim-groups/tonedown/act/th-act-action-batch'+n+'-stills-AB.jpg',quality=85)
PY
L="$L $D/th-act-action-batch$n-stills-AB.jpg"
python3 dev/site/cdn_sync.py $L 2>&1 | tail -1
for f in th-act-action-batch$n-anim.mp4 th-act-action-batch$n-stills-AB.jpg; do echo "$f $(sha256sum $D/$f | cut -c1-12)"; done
