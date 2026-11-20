#!/bin/bash
# one sensible-bot shard (runb.js + inpage6 + inx/inpz, HHSTOP, 9-origin rotation from offset K), foreground
# usage: sens1.sh <game.html> <out.json> <origin offset K> [lives=40]   env EXTRA = js run after load (knob trials)
G=$1;O=$2;K=$3;N=${4:-40};M=$(cd "$(dirname "$0")/.." && pwd)
XJS="try{fixTitles=function(){}}catch(e){}try{k3OptCols=function(){}}catch(e){}try{kitOptIsLong=function(){return false}}catch(e){};const s9=start;start=function(){window.__origO=[\"tt\",\"dtq\",\"muoi\",\"cn\",\"nc\",\"td\",\"ch\",\"thd\",\"cnv\"][(window.__oj=(window.__oj==null?$K:window.__oj+1))%9];return s9.apply(this,arguments)};${EXTRA:-}"
cd $M && GAME=$G INP=inpage6.js INP2=inx.js,inpz.js,inty.js,inpromo.js,insk.js HHSTOP=1 XJS="$XJS" CAP=${CAP:-7000} NODE_PATH=$(npm root -g) exec node runb.js sens $N $O
