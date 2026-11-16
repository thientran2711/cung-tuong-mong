#!/bin/bash
# sheet.sh <name> <alpha.webm> <t0> <t1> <cols> <rows> <frameW> — painted-fx (KIT §68) SOLID sheet: a Magnific video_remove_background
# result (VP9 WebM with real alpha) → cols×rows frames between t0..t1 s → img/fx/<name>-sheet.webp (true alpha, Safari-safe)
# + img/fx/<name>.webp (last frame = reduced-motion still). Prints the KFK_SHEET row.
set -e
N=$1; SRC=$2; T0=$3; T1=$4; C=$5; RW=$6; FW=$7
R=$(cd "$(dirname "$0")/../.." && pwd); O=$R/img/fx; T=$(mktemp -d "$R/dev/fxwork/tmp.XXXX")
NF=$((C*RW)); FPS=$(python3 -c "print(round($NF/($T1-$T0),3))")
nice -n 19 ffmpeg -v error -y -c:v libvpx-vp9 -ss $T0 -t $(python3 -c "print($T1-$T0)") -i "$SRC" -vf "fps=$FPS,scale=$FW:-2:flags=lanczos,format=rgba" -frames:v $NF "$T/f%03d.png"
python3 - "$T" "$O/$N-sheet.webp" "$O/$N.webp" $C $RW <<'EOF'
import sys, glob
from PIL import Image
d, out, still, C, R = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
fs = sorted(glob.glob(d + "/f*.png"))[:C * R]
ims = [Image.open(f).convert("RGBA") for f in fs]
w, h = ims[0].size
sh = Image.new("RGBA", (w * C, h * R), (0, 0, 0, 0))
for i, im in enumerate(ims):
    sh.paste(im, ((i % C) * w, (i // C) * h))
sh.save(out, "WEBP", quality=80, method=6)
ims[-1].save(still, "WEBP", quality=80, method=6)
print(f'{{cols:{C},rows:{R},n:{len(ims)},w:{w},h:{h}}}', len(ims), "frames")
EOF
rm -rf "$T"; ls -la $O/$N-sheet.webp $O/$N.webp | awk '{print $5, $9}'; echo "fps $FPS"
