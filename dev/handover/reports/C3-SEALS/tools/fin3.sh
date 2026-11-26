#!/usr/bin/env bash
# fin3.sh <P> <emo>... : like fin_par.sh but with the robust disc tracker (meas_raw3 / meas_after3). In /home/user/wt/<P>/ expects <emo>-out.mp4 <emo>-loop.mp4.
set -uo pipefail
T=$(cd "$(dirname "$0")" && pwd)
P=$1; shift; cd /home/user/wt/$P; mkdir -p cut final
one(){ e=$1; T=$2; P=$3; k=$P-$e
 [ -s final/$k-back.webp ] && exit 0
 ffmpeg -y -loglevel error -i $e-out.mp4 -vf reverse back_$e.mp4
 $T/cut.sh out $e-out.mp4 cut/$k-out.webp >/dev/null
 $T/cut.sh loop $e-loop.mp4 cut/$k-loop.webp >/dev/null
 $T/cut.sh back back_$e.mp4 cut/$k-back.webp >/dev/null
 python3 $T/meas_raw3.py cut $k >/dev/null
 python3 $T/apply.py cut final $k >/dev/null
 python3 $T/meas_after3.py final $k
}
export -f one
printf '%s\n' "$@" | xargs -P4 -I{} bash -c "one {} $T $P"
