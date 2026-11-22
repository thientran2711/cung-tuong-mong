#!/bin/bash
# proc.sh urls.txt : download, cut, back-rebuild, measure
S=/tmp/claude-0/-home-user-cung-tuong-mong/dbcc44c5-817b-5b98-8e11-78465341463b/scratchpad; cd $S/wx
while read kp u; do curl -s -o mp4/$kp.mp4 "$u" & done < $1; wait
C=/home/user/cung-tuong-mong/dev/art/emo-anim/cut.sh
ks=$(awk '{print $1}' $1 | sed 's/-out$//;s/-loop$//' | sort -u)
for k in $ks; do echo "$C out mp4/$k-out.mp4 webp/$k-out.webp"; echo "$C loop mp4/$k-loop.mp4 webp/$k-loop.webp"; done | xargs -P 8 -I{} bash -c "{}" >/dev/null 2>&1
python3 /home/user/cung-tuong-mong/dev/handover/reports/THACT1_tools/rebuild_back_clamp.py $ks
python3 $S/vm.py webp2 $ks
python3 $S/strip.py $S/wx/webp2 $ks
