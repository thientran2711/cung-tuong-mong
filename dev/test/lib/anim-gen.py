#!/usr/bin/env python3
"""anim-gen.py — ORDER #8 ANIM-STRESS (test-only, NO new art): turn today's full-body figure picture into a short looping alpha WebM
(VP9 yuva420p) with a synthetic idle breath + sleeve sway (and a bigger 'action' variant). Same motion model as the CSS and sprite formats in
dev/test/lib/anim-stress.js: breath = scaleY about the feet, sway = horizontal shear of the lower body.
usage: python3 anim-gen.py <out dir> <figure.webp> [...]   -> <out>/<name>-idle.webm, <name>-act.webm   (height H=480, FPS=24, 3 s idle / 2 s action)"""
import sys, os, math, subprocess, tempfile, shutil
from PIL import Image
H = int(os.environ.get('ANIM_H', '480')); FPS = 24
def frames(img, n, amp_b, amp_s, lift):
    w, h = img.size; s = H / h; im = img.resize((max(2, round(w * s)), H), Image.LANCZOS); W = im.size[0]
    pad = 24; out = []
    for i in range(n):
        t = i / n; b = 1 + amp_b * math.sin(2 * math.pi * t); k = amp_s * math.sin(2 * math.pi * t + .8)
        # scaleY about the feet, then shear: x_in = x - k*(y - y0)  (affine inverse map)
        y0 = H * .45
        a = im.transform((W + 2 * pad, H), Image.AFFINE, (1, -k, pad + k * y0, 0, 1 / b, H - H / b - lift * math.sin(math.pi * t) * H), resample=Image.BICUBIC)
        out.append(a)
    return out
def encode(fr, path, tmp):
    d = tempfile.mkdtemp(dir=tmp)
    for i, f in enumerate(fr): f.save(os.path.join(d, 'f%04d.png' % i))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', os.path.join(d, 'f%04d.png'), '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
                    '-b:v', '0', '-crf', '36', '-auto-alt-ref', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4', path], check=True)
    shutil.rmtree(d)
out = sys.argv[1]; os.makedirs(out, exist_ok=True); tmp = tempfile.mkdtemp()
for f in sys.argv[2:]:
    name = os.path.splitext(os.path.basename(f))[0]; img = Image.open(f).convert('RGBA')
    encode(frames(img, 3 * FPS, .010, .012, 0), os.path.join(out, name + '-idle.webm'), tmp)
    encode(frames(img, 2 * FPS, .022, .060, .020), os.path.join(out, name + '-act.webm'), tmp)
    print(name, os.path.getsize(os.path.join(out, name + '-idle.webm')), os.path.getsize(os.path.join(out, name + '-act.webm')))
shutil.rmtree(tmp)
