#!/bin/bash
# D8 story-bot: one bot shard (one browser) playing lives through the 14-chapter frame, rotating origin x difficulty.
# usage: runstory.sh <game.html> <shard i> <lives> [chstop] [origins] [diffs]
#   chstop: 5 = stop each life when chapter 5 starts (chapters 1-4 pass, + YRSTOP years cap, default 8); 0 = whole lives (to the real end)
#   origins default "tt dtq muoi cn nc bd td ch thd cnv"; diffs default "de vua kho"
# Same harness as rundiff.sh (sensible bot inpage6.js + inx/inpz/indiff) + instory.js (chapter log, curves, tutorial follower, CHSTOP).
# out: $OUT/story_<i>.json ; summary: python3 dev/measure/anstory.py $OUT/story_*.json
G=$1;i=$2;N=${3:-20};CS=${4:-5};OR=${5:-"tt dtq muoi cn nc bd td ch thd cnv"};DF=${6:-"de vua kho"};W=${OUT:-/tmp/story};mkdir -p $W
M=$(cd "$(dirname "$0")" && pwd)
ROT=$(python3 -c "import json,sys;o='$OR'.split();d='$DF'.split();print(json.dumps([[a,b] for b in d for a in o]))")
YS=${YRSTOP:-8};[ "$CS" = "0" ] && YS=0
XJS="window.__rot=$ROT;window.__chStop=$CS;window.__yrStop=$YS;window.__oj=($i*7)%window.__rot.length;
function __rotSet(){const r=window.__rot[window.__oj%window.__rot.length];window.__rotK=r.join('/');window.__origO=r[0];window.__diffO=r[1];return r}
const s9=start;start=function(){window.__oj++;const r=__rotSet();const x=s9.apply(this,arguments);try{S.diff=r[1];S.bac0=S.bac;diffBac();diffApply()}catch(e){}return x};
${EXTRA:-}"
# the life the bot is already on was rolled before XJS: restart it on the rotation
XJS="$XJS;window.__oj--;Q=[];start();"
GAME=$G INP=inpage6.js INP2=inx.js,inpz.js,indiff.js,instory.js XJS="$XJS" CAP=${CAP:-9000} node $M/runb.js sens $N $W/story_$i.json > $W/story_$i.log 2>&1
echo done $i
