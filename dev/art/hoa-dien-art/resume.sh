#!/bin/bash
# resume.sh KIND LIST OUT LOG : run twin only on names not yet logged in OUT/*.jsonl (resumable)
K=$1; L=$2; O=$3; LOG=$4; mkdir -p $O
cat $O/.chunk.0?.jsonl $O/.r*.jsonl 2>/dev/null | python3 -c "import sys,json;[print(json.loads(l)['name']) for l in sys.stdin if l.strip()]" | sort -u > $O/.done
sort -u $L | comm -23 - $O/.done > $O/.todo; echo "$K todo $(wc -l < $O/.todo)"
D=/home/user/wt/hda2-data; T=/home/user/wt/hda2/dev/art/hoa-dien-art; KK=$K
case $K in fig) SRC=$D/pull/img;; hd) SRC=$D/pull/img/hd;; hd2) SRC=$D/pull/img/hd2; KK=hd;; tn) SRC=$D/pull/img/tn;; esac
R=$(date +%s); split -n l/4 -d $O/.todo $O/.r$R.
for c in $O/.r$R.0?; do (export OMP_NUM_THREADS=1 Q=98; xargs -a $c -n 20 python3 $T/twin.py $KK $SRC $O $D/pull/img $T/log_por.jsonl > $c.jsonl 2>$c.err) & done; wait
cat $O/.chunk.0?.jsonl $O/.r*.jsonl 2>/dev/null > $LOG; echo "$K logged $(wc -l < $LOG)"
