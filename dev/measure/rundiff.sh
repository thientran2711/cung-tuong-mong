#!/bin/bash
# D31 difficulty: one bot shard in one life difficulty. usage: rundiff.sh <game.html> <de|vua|kho> <shard i> [lives=6]
# (same harness as run1b.sh: sensible bot, HHSTOP, 9-origin rotation; window.__diffO fixes the difficulty of every life)
# pooled summary: python3 dev/measure/anx.py <label> $OUT/<mode>_*.json
G=$1;D=$2;i=$3;N=${4:-6};K=$(( (i-1)*N ));W=${OUT:-/tmp/diff};mkdir -p $W
M=$(cd "$(dirname "$0")" && pwd)
XJS="window.__diffO=\"$D\";if(S&&!S.dead&&S.diff!==\"$D\"){S.diff=\"$D\";if(S.bac0==null)S.bac0=S.bac;diffBac();diffApply()};const s9=start;start=function(){window.__origO=[\"tt\",\"dtq\",\"muoi\",\"cn\",\"nc\",\"td\",\"ch\",\"thd\",\"cnv\"][(window.__oj=(window.__oj==null?$K:window.__oj+1))%9];return s9.apply(this,arguments)};${EXTRA:-}"
GAME=$G INP=inpage6.js INP2=inx.js,inpz.js,indiff.js HHSTOP=1 XJS="$XJS" CAP=${CAP:-9000} node $M/runb.js sens $N $W/${D}_$i.json > $W/${D}_$i.log 2>&1
echo done $D $i
