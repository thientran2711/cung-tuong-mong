#!/bin/bash
# one INP file for run_par.js: inpage6 (sensible) + HHSTOP + layout stubs + inx/inpz/inty/inpromo counters, then $EXTRA (knob trial js)
M=$(cd "$(dirname "$0")/.." && pwd);O=${1:-$M/../tmp/sensall.js}
{ echo 'window.__hhStop=1;';echo "${PRE:-}"; cat $M/inpage6.js; echo ';try{fixTitles=function(){}}catch(e){}try{k3OptCols=function(){}}catch(e){}try{kitOptIsLong=function(){return false}}catch(e){};'; for f in inx inpz inty inpromo; do cat $M/$f.js; echo ';'; done; echo "${EXTRA:-}"; } > $O; echo $O
