#!/bin/bash
# one.sh SRCPATH KEY   (SRCPATH relative to img/_review/)
cd /home/user/wt/lt; s=$1; k=$2; f=src/$(echo $s | tr / _)
[ -s $f ] || curl -sS --retry 4 -o $f https://ctm-img.victoria-tntt.workers.dev/img/_review/$s || { echo "FAIL dl $k"; exit 1; }
python3 -I finish_fig.py $f $k out > log/$k.txt 2>&1 || { echo "FAIL finish $k"; exit 1; }
if [ -f out/_old/por-$k.webp ]; then H=out/img/hd/fig-$k.webp; [ -f $H ] || H=out/img/fig-$k.webp; python3 porface.py out/_old/por-$k.webp $H out/img/por-$k.webp 2>&1 | grep -E 'porface|NOFACE' >> log/$k.txt || echo "PORFACE-FAIL $k" >> log/$k.txt; fi
echo "done $k $(grep -oE 'porface.*|NOFACE.*|PORFACE-FAIL.*|MATCH WEAK' log/$k.txt | tr '\n' ' ')"
