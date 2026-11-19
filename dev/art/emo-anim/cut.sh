#!/usr/bin/env bash
# cut.sh — emo-anim clip → animated webp with alpha (recipe: dev/handover/briefs/emo-anim-mass.md step 6).
#
#   dev/art/emo-anim/cut.sh <part> <in.mp4> <out.webp> [start_s] [end_s]
#     part  = out | loop | back
#     out   : auto-trims to the burst  (start = where the seal starts to grow/move, minus 2 frames; to the end)
#     loop  : full clip (4 s)
#     back  : auto-trims from where the slide-in starts (last frame still as big as the leaning-out pose, minus 2 frames; to the end)
#     start_s/end_s override the auto trim (seconds in the source clip; end_s optional).
#   Prints the trim used, frame count and size. Needs ffmpeg + python3 with numpy.
#   Filter = exactly the brief: chromakey=0x00FF00:0.28:0.08, despill=type=green, 288x288 lanczos, 15 fps,
#   animated webp, loop 0, -q:v 50 -compression_level 6, alpha kept (yuva420p).
#   Batch example (Seedance clips saved as mp4/<k>-out.mp4, <k>-loop.mp4, <k>-back.mp4; female set = no prefix):
#     for k in vui binh; do for p in out loop back; do o=$k-$p.webp; [ $p = loop ] && o=$k.webp; cut.sh $p mp4/$k-$p.mp4 webp/$o; done; done
set -euo pipefail
part=${1:?part out|loop|back}; in=${2:?in.mp4}; out=${3:?out.webp}; ss=${4:-}; to=${5:-}
FILT="chromakey=0x00FF00:0.28:0.08,despill=type=green,scale=288:288:flags=lanczos,fps=15"

auto_start() { # $1 = out|back ; prints start seconds
  ffmpeg -loglevel error -i "$in" -vf "fps=15,scale=96:96" -f rawvideo -pix_fmt rgb24 - | python3 -I -c '
import sys, numpy as np
mode = sys.argv[1]
a = np.frombuffer(sys.stdin.buffer.read(), np.uint8).reshape(-1, 96, 96, 3).astype(int)
g = (a[..., 1] > 150) & (a[..., 0] < 90) & (a[..., 2] < 110)   # chroma-green pixels
area = (~g).reshape(len(a), -1).sum(1).astype(float)           # seal + figure area per frame
n = len(area)
if mode == "out":   # first frame clearly bigger than the still (A)
    base = area[:3].mean(); idx = next((i for i in range(n) if area[i] > base * 1.04), 0)
else:               # back: last frame still about as big as the leaning-out pose (B)
    base = area[:3].mean(); idx = max([i for i in range(n) if area[i] >= base * 0.95] or [0])
idx = max(0, idx - 2)
print(f"{idx/15:.2f}")
' "$1"
}

if [ -z "$ss" ]; then
  case $part in
    out|back) ss=$(auto_start "$part");;
    loop) ss=0;;
    *) echo "part must be out|loop|back" >&2; exit 2;;
  esac
fi
args=(-ss "$ss"); [ -n "$to" ] && args+=(-to "$to")
mkdir -p "$(dirname "$out")"
ffmpeg -loglevel error -y "${args[@]}" -i "$in" -vf "$FILT" -an -c:v libwebp_anim -pix_fmt yuva420p \
  -loop 0 -q:v 50 -compression_level 6 "$out" 2>/dev/null || \
ffmpeg -loglevel error -y "${args[@]}" -i "$in" -vf "$FILT" -an -c:v libwebp -pix_fmt yuva420p \
  -loop 0 -q:v 50 -compression_level 6 "$out"
python3 -I -c '
import sys
from PIL import Image
im = Image.open(sys.argv[1]); nf = getattr(im, "n_frames", 1)
print(f"{sys.argv[1]}  start={sys.argv[2]}s  frames={nf}  size={im.size}  mode={im.mode}")
' "$out" "$ss"
