#!/bin/bash
cd /home/user/wt/lt; n=$1; k=maid-$n-kc-a18
FORCE_HD=1 python3 -I finish_fig.py cuts/$n.png $k out > log/$k.txt 2>&1 || { echo "FAIL finish $k"; exit 1; }
python3 porface.py out/_old/por-$k.webp out/img/hd/fig-$k.webp out/img/por-$k.webp > log/pf-$k.txt 2>&1 || echo "PORFACE-FAIL $k"
grep -hE 'porface|NOFACE' log/pf-$k.txt | sed 's#out/img/por-maid-##'
