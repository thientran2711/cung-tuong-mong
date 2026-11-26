#!/usr/bin/env bash
# fin_par.sh <P> <emo>... : parallel (4) version of finish.sh
set -uo pipefail
T=/home/user/wt/h/dev/handover/reports/C3-SEALS/tools
P=$1; shift; cd /home/user/wt/$P; mkdir -p cut final
one(){ e=$1; T=$2; P=$3; k=$P-$e
 [ -f cut/$k-back.webp ] && [ -s cut/$k-back.webp ] && [ -f cut/$k.disc.npy ] && exit 0
 ffmpeg -y -loglevel error -i $e-out.mp4 -vf reverse back_$e.mp4
 $T/cut.sh out $e-out.mp4 cut/$k-out.webp >/dev/null
 $T/cut.sh loop $e-loop.mp4 cut/$k-loop.webp >/dev/null
 $T/cut.sh back back_$e.mp4 cut/$k-back.webp >/dev/null
 python3 $T/meas_raw.py cut $k >/dev/null
 python3 $T/apply.py cut final $k >/dev/null
 echo "done $e"
}
export -f one
printf '%s\n' "$@" | xargs -P4 -I{} bash -c "one {} $T $P"
python3 $T/meas_after.py final "${@/#/$P-}"
