#!/bin/bash
# light.sh <name> <src.mp4> [W] [H] — painted-fx (KIT §68) LIGHT clip encoder (video painted on pure black, shown with mix-blend-mode:screen).
# Outputs img/fx/<name>.mp4 (H.264, Safari/iOS), img/fx/<name>.webm (VP9), img/fx/<name>-sheet.webp (24 frames, 6x4, low-end fallback),
# img/fx/<name>.webp (poster still = reduced motion). Near-black is crushed to pure black so screen blend leaves no grey haze.
set -e
N=$1; SRC=$2; W=${3:-384}; H=${4:-$W}
R=$(cd "$(dirname "$0")/../.." && pwd); O=$R/img/fx; mkdir -p $O
CRUSH="curves=all='0/0 0.07/0 0.5/0.47 1/1'"
VF="scale=${W}:${H}:flags=lanczos,${CRUSH},format=yuv420p"
nice -n 19 ffmpeg -v error -y -i "$SRC" -an -vf "$VF" -c:v libx264 -profile:v main -preset slow -crf 30 -movflags +faststart -threads 1 $O/$N.mp4
nice -n 19 ffmpeg -v error -y -i "$SRC" -an -vf "$VF" -c:v libvpx-vp9 -b:v 0 -crf 42 -row-mt 1 -threads 1 $O/$N.webm
SW=$((W/3)); SH=$((H/3))
NF=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$SRC")
STEP=$(( NF / 24 )); [ $STEP -lt 1 ] && STEP=1
nice -n 19 ffmpeg -v error -y -i "$SRC" -vf "select='not(mod(n\,$STEP))',scale=${SW}:${SH}:flags=lanczos,${CRUSH},tile=6x4" -frames:v 1 -q:v 70 $O/$N-sheet.webp
nice -n 19 ffmpeg -v error -y -i "$SRC" -vf "scale=${W}:${H}:flags=lanczos,${CRUSH}" -frames:v 1 -q:v 72 $O/$N.webp
ls -la $O/$N.mp4 $O/$N.webm $O/$N-sheet.webp $O/$N.webp | awk '{print $5, $9}'
