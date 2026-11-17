#!/bin/bash
# runclean.sh NAMES OUT LOG : 4 parallel clean3.py (por, lossless)
N=$1; O=$2; LOG=$3; D=/home/user/wt/hda2-data; T=/home/user/wt/hda2/dev/art/hoa-dien-art
mkdir -p $O; split -n l/4 -d $N $O/.chunk.
for c in $O/.chunk.0?; do (export OMP_NUM_THREADS=1; xargs -a $c -n 20 python3 $T/clean3.py $D/pull/img $O > $c.jsonl 2>$c.err) & done; wait
cat $O/.chunk.0?.jsonl > $LOG
