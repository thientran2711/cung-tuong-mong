#!/bin/bash
# balance-2 (D8): one bot shard over an origin x difficulty rotation, whole lives (HHSTOP: a life that reaches Hoàng hậu is recorded "HH" and a new one starts).
# usage: runbal2.sh <game.html> <shard i> <lives> [mode sens|rand] [origins] [diffs]   env: YRSTOP=n (cap a life at n years, recorded CHSTOP/YRSTOP), OUT, SEED, BALJ, EXTRA
# INPX=a.js,b.js adds more add-ons (e.g. inevpick.js with EXTRA="window.__evmode='hint'").
# = runstory.sh harness (inpage6 + inx/inpz/indiff/instory) + indanhlog.js (Danh causes) + inbal2.js (rank pressure, punish origin).
G=$1;i=$2;N=${3:-20};MD=${4:-sens};OR=${5:-"tt dtq muoi cn nc bd td ch thd cnv"};DF=${6:-"vua"};W=${OUT:-/tmp/bal2};mkdir -p $W
M=$(cd "$(dirname "$0")" && pwd)
ROT=$(python3 -c "import json;o='$OR'.split();d='$DF'.split();print(json.dumps([[a,b] for b in d for a in o]))")
XJS="window.__rot=$ROT;window.__chStop=0;window.__yrStop=${YRSTOP:-0};window.__oj=($i*7)%window.__rot.length;
function __rotSet(){const r=window.__rot[window.__oj%window.__rot.length];window.__rotK=r.join('/');window.__origO=r[0];window.__diffO=r[1];return r}
const s9=start;start=function(){window.__oj++;const r=__rotSet();const x=s9.apply(this,arguments);try{S.diff=r[1];S.bac0=S.bac;diffBac();diffApply()}catch(e){}return x};
${EXTRA:-};window.__oj--;Q=[];start();"
HHSTOP=${HHSTOP-1} GAME=$G INP=inpage6.js INP2=inx.js,inpz.js,indiff.js,instory.js,indanhlog.js,inbal2.js${INPX:+,$INPX} XJS="$XJS" CAP=${CAP:-20000} node $M/runb.js $MD $N $W/b2_${MD}_$i.json > $W/b2_${MD}_$i.log 2>&1
echo done $i
