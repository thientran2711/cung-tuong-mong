#!/usr/bin/env bash
# finish.sh <P> <emo>...  : in /home/user/wt/<P>/ expects <emo>-out.mp4 <emo>-loop.mp4 ; produces final/ and review files
set -euo pipefail
T=/home/user/wt/h/dev/handover/reports/C3-SEALS/tools
P=$1; shift; cd /home/user/wt/$P; mkdir -p cut final
for e in "$@"; do k=$P-$e
 ffmpeg -y -loglevel error -i $e-out.mp4 -vf reverse back_$e.mp4
 $T/../tools/cut.sh out $e-out.mp4 cut/$k-out.webp >/dev/null
 $T/cut.sh loop $e-loop.mp4 cut/$k-loop.webp >/dev/null
 $T/cut.sh back back_$e.mp4 cut/$k-back.webp >/dev/null
done
python3 $T/meas_raw.py cut "${@/#/$P-}" >/dev/null
python3 $T/apply.py cut final "${@/#/$P-}" >/dev/null
python3 $T/meas_after.py final "${@/#/$P-}"
