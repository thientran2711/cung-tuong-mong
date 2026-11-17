#!/bin/bash
cd /home/user/wt/hda2-data/w12; export OMP_NUM_THREADS=1 Q=98; R=../run
par() { split -n l/4 -d $1 $2.; for c in $2.0?; do (xargs -a $c -n 20 "${@:3}" > $c.jsonl 2>$c.err) & done; wait; cat $2.0?.jsonl > $2.jsonl; }
mkdir -p p2_out g_fig g_hd
par p2.txt p2_out/c python3 $R/por2.py img out_por p2_out out_por/c.jsonl
par fig_miss.txt g_fig/c python3 $R/guided.py fig img g_fig img out_por/c.jsonl
par hd_miss.txt g_hd/c python3 $R/guided.py hd img/hd g_hd img out_por/c.jsonl
wc -l p2_out/c.jsonl g_fig/c.jsonl g_hd/c.jsonl
