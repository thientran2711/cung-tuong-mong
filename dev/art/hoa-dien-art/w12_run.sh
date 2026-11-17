#!/bin/bash
# W12 681 restored maid-ty keys: clean3 por -> twin fig, hd (sources = files as restored, in w12/img)
cd /home/user/wt/hda2-data/w12; T=/home/user/wt/hda2/dev/art/hoa-dien-art; export OMP_NUM_THREADS=1 Q=98
par() { split -n l/4 -d $1 $2.; for c in $2.0?; do (xargs -a $c -n 20 "${@:3}" > $c.jsonl 2>$c.err) & done; wait; cat $2.0?.jsonl > $2.jsonl; }
mkdir -p out_por out_fig out_hd
par por.txt out_por/c python3 $T/clean3.py img out_por
par fig.txt out_fig/c python3 $T/twin.py fig img out_fig img out_por/c.jsonl
par fig.txt out_hd/c python3 $T/twin.py hd img/hd out_hd img out_por/c.jsonl
wc -l out_*/c.jsonl
