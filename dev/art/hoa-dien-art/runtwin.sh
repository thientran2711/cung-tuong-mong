#!/bin/bash
# runtwin.sh KIND NAMESFILE OUTDIR LOG : 4 parallel twin.py workers
K=$1; N=$2; O=$3; LOG=$4; D=/home/user/wt/hda2-data; T=/home/user/wt/hda2/dev/art/hoa-dien-art
case $K in fig) SRC=$D/pull/img;; hd) SRC=$D/pull/img/hd;; hd2) SRC=$D/pull/img/hd2; K=hd;; tn) SRC=$D/pull/img/tn;; esac
mkdir -p $O; split -n l/4 -d $N $O/.chunk.
for c in $O/.chunk.0*; do
  (export OMP_NUM_THREADS=1 Q=98; xargs -a $c -n 20 python3 $T/twin.py $K $SRC $O $D/pull/img $T/log_por.jsonl > $c.jsonl 2>$c.err) &
done; wait; cat $O/.chunk.0*.jsonl > $LOG
