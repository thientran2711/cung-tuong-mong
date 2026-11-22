#!/bin/bash
# proc.sh <n> <labels-json> ; reads urls_<n>.txt lines "k-part url"
set -e
n=$1; L=$2; W=/tmp/claude-0/thact/wx; cd $W; mkdir -p mp4 webp webp2 sh$n
while read kp u; do curl -s -o mp4/$kp.mp4 "$u" & done < ../urls_$n.txt; wait
C=/home/user/cung-tuong-mong/dev/art/emo-anim/cut.sh
ks=$(awk '{print $1}' ../urls_$n.txt | sed 's/-out$//;s/-loop$//' | sort -u)
for k in $ks; do echo "$C out mp4/$k-out.mp4 webp/$k-out.webp"; echo "$C loop mp4/$k-loop.mp4 webp/$k-loop.webp"; done | xargs -P 8 -I{} bash -c "{}" >/dev/null 2>&1
for k in $ks; do python3 ../rebuild_back_clamp.py $k & done; wait
cd sh$n && ln -sfn ../webp2 webp && python3 /home/user/cung-tuong-mong/dev/handover/reports/THANIM1_tools/sheet2.py th-act-action-batch$n-anim 320 "$L" 60
ffmpeg -loglevel error -y -i th-act-action-batch$n-anim.mp4 -vf "select='not(mod(n\,30))',scale=800:-1,tile=1x8" -frames:v 1 strip.jpg
ls -la
