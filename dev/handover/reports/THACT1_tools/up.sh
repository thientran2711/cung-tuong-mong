#!/bin/bash
# up.sh <n> <Adir> <Bdir> keys...
n=$1; A=$2; B=$3; shift 3; W=/tmp/claude-0/thact/w; D=/home/user/cung-tuong-mong/img/_review/emo-anim-groups/tonedown/act; mkdir -p $D/b$n
cp $W/sh$n/th-act-tonedown-batch$n-anim.{mp4,webp} $D/b$n/
for k in "$@"; do for p in out loop back; do cp $W/webp2/$k-$p.webp $D/b$n/th-act-$k-$p.webp; done
python3 -c "
from PIL import Image
Image.open('$W/$A/$k-g.png').resize((1024,1024),Image.LANCZOS).save('$D/b$n/th-act-$k-A-M2342.png')
Image.open('$W/$B/$k-g.png').resize((1024,1024),Image.LANCZOS).save('$D/b$n/th-act-$k-B-M2342.png')"; done
cd /home/user/cung-tuong-mong && mv $D/b$n/* $D/ && rmdir $D/b$n
python3 dev/site/cdn_sync.py $(cd $D && for f in th-act-tonedown-batch$n-anim.mp4 th-act-tonedown-batch$n-anim.webp; do echo img/_review/emo-anim-groups/tonedown/act/$f; done; for k in "$@"; do for s in out loop back A-M2342 B-M2342; do e=webp; [[ $s == *M2342 ]] && e=png; echo img/_review/emo-anim-groups/tonedown/act/th-act-$k-$s.$e; done; done) 2>&1 | tail -2
