#!/bin/bash
# balance-2 measurement queue (sequential phases, 4 browsers each)
W=/home/user/wt/bal2; M=$W/dev/measure; O=/home/user/wt/b2out; A=$W/dev/game_after.html; B=$W/dev/game_base.html
ALL="tt dtq muoi cn nc bd td ch thd cnv"
cnt(){ python3 -c "
import json,glob
n=0
for f in glob.glob('$1/b2_*_?.json'):
  try:n+=len(json.load(open(f)))
  except:pass
print(n)"; }
until ! pgrep -f 'b2out/before' >/dev/null && ! pgrep -f 'runb.js sens 38' >/dev/null; do sleep 60; done
echo "$(date) before done $(cnt $O/before)"
mkdir -p $O/after; (for i in 0 1 2 3; do OUT=$O/after YRSTOP=8 bash $M/runbal2.sh $A $i 38 sens "$ALL" vua & done; wait); echo "$(date) after done $(cnt $O/after)"
mkdir -p $O/khoB $O/khoA $O/khoA13
(OUT=$O/khoB YRSTOP=3 bash $M/runbal2.sh $B 0 38 sens "$ALL" kho & OUT=$O/khoB YRSTOP=3 bash $M/runbal2.sh $B 1 38 sens "$ALL" kho &
 OUT=$O/khoA YRSTOP=3 bash $M/runbal2.sh $A 0 38 sens "$ALL" kho & OUT=$O/khoA YRSTOP=3 bash $M/runbal2.sh $A 1 38 sens "$ALL" kho & wait); echo "$(date) kho done"
(for i in 0 1 2 3; do OUT=$O/khoA13 YRSTOP=3 EXTRA="DIFF.kho.bal.hz=[1.35,0]" bash $M/runbal2.sh $A $i 19 sens "$ALL" kho & done; wait); echo "$(date) kho13 done"
for arm in old new; do BJ=""; [ $arm = new ] && BJ='{"ctxTaste":18,"ctxCap":30}'
 for md in hint rand; do mkdir -p $O/bp_${arm}_$md
  (for i in 0 1; do OUT=$O/bp_${arm}_$md YRSTOP=5 BALJ=$BJ INPX=inevpick.js EXTRA="window.__evmode='$md'" bash $M/runbal2.sh $A $i 20 sens "$ALL" vua & done; wait) &
 done; wait; echo "$(date) bp $arm done"; done
mkdir -p $O/sung; (for i in 0 1 2 3; do OUT=$O/sung YRSTOP=8 BALJ='{"grow":{"keys":["sac","tai","tamco","sung"],"band":[40,60,80],"mul":[1,0.5,0.25,0.1],"back":1}}' bash $M/runbal2.sh $A $i 20 sens "$ALL" vua & done; wait); echo "$(date) sung done"
echo ALLDONE
