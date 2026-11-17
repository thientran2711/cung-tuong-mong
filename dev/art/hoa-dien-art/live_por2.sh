#!/bin/bash
cd /home/user/wt/hda2-data/live; export OMP_NUM_THREADS=1; R=../run
while pgrep -f "w12/run2.sh" >/dev/null; do sleep 30; done
mkdir -p p2_out; split -n l/4 -d todo.txt p2_out/c.
for c in p2_out/c.0?; do (xargs -a $c -n 20 python3 $R/por2.py ../pull/img img p2_out /home/user/wt/hda2/dev/art/hoa-dien-art/log_por.jsonl > $c.jsonl 2>$c.err) & done; wait
cat p2_out/c.0?.jsonl > p2_out/c.jsonl; wc -l p2_out/c.jsonl
