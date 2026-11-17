#!/bin/bash
cd /home/user/wt/hda2-data/run; export PORLOG=/home/user/wt/hda2-data/run/log_por_all.jsonl OMP_NUM_THREADS=1 Q=98
while pgrep -f w12/run.sh >/dev/null; do sleep 30; done
./resume.sh fig cty_fig.txt out_ctyfig log_ctyfig.jsonl
./resume.sh hd cty_hd.txt out_ctyhd log_ctyhd.jsonl
# guided 2nd pass on misses (fig, hd)
for k in fig hd; do
  S=../pull/img; [ $k = hd ] && S=../pull/img/hd
  mkdir -p out_g$k; split -n l/4 -d ${k}_miss.txt out_g$k/.c.
  for c in out_g$k/.c.0?; do (xargs -a $c -n 20 python3 guided.py $k $S out_g$k ../pull/img $PORLOG > $c.jsonl 2>$c.err) & done; wait
  cat out_g$k/.c.0?.jsonl > log_g$k.jsonl
done
wc -l log_ctyfig.jsonl log_ctyhd.jsonl log_gfig.jsonl log_ghd.jsonl
