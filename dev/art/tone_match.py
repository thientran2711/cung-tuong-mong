#!/usr/bin/env python3
"""tone_match.py: cheap tone pass that makes a new scene picture match the colour/contrast treatment of the approved 16-sets (no repaint).
Per picture: luma-only contrast curve about its own mean (keeps every pixel's chroma ratio, so it does not make colours vivid), mean luma moved to the
approved value for that buoi, then mean saturation pulled back to the approved value. Targets are measured from approved sets of one buoi.
usage: python3 tone_match.py <approved_dir> <in.png> <out.png> <sang|trua|chieu|toi> [glob_prefix]
  glob_prefix (optional, e.g. kinh-su-phong): measure the targets from ONE approved set only (the owner's circled target 16/11 07:42Z = kinh-su-phong).
  Also matches the picture's warmth (white balance) to the target, after the contrast / luma / saturation steps.
  approved_dir holds approved pictures named <set>-<season>-<buoi>.webp (e.g. kinh-su-phong-xuan-toi.webp, canh-phuc-cung-ha-sang.webp ...).
Measured targets (8 approved sets x 4 seasons): sang sat .28 val .66 contrast 41.6 meanL 145 | trua .32 .72 43.5 155 | chieu .44 .63 40.4 128 | toi .40 .44 34.6 88."""
import sys, glob
import numpy as np
from PIL import Image, ImageEnhance

def lum(a): return 0.299*a[..., 0] + 0.587*a[..., 1] + 0.114*a[..., 2]

def hs(im):
    a = np.asarray(im.convert('RGB').resize((256, 170)), dtype=np.float32)/255
    mx = a.max(2); mn = a.min(2); s = np.where(mx > 0, (mx-mn)/np.maximum(mx, 1e-6), 0); L = lum(a)*255
    return s.mean(), mx.mean(), L.std(), (a[..., 0]-a[..., 2]).mean()*255, ((s > .6) & (mx > .6)).mean()*100, L.mean()

def targets(adir, t, prefix=''):
    R = [hs(Image.open(f)) for f in glob.glob(f'{adir}/{prefix}*-{t}.webp')]
    return [sum(r[i] for r in R)/len(R) for i in range(6)]

def tone(im, tg):
    a = np.asarray(im.convert('RGB'), dtype=np.float32)/255
    L = np.maximum(lum(a)*255, 1.0); h = hs(im); k = min(1.8, max(1.0, tg[2]/h[2]))
    L2 = np.clip((L-h[5])*k+tg[5], 0, 255)
    out = Image.fromarray((np.clip(a*(L2/L)[..., None], 0, 1)*255).astype(np.uint8))
    for _ in range(4):
        s = hs(out)[0]; f = tg[0]/s if s > 0 else 1
        if abs(f-1) < .01: break
        out = ImageEnhance.Color(out).enhance(f)
    for _ in range(4):                           # warmth: white balance toward the target (R gain down / B gain up)
        w = hs(out)[3]
        if abs(tg[3]-w) < 2: break
        d = (tg[3]-w)/255*0.5; a2 = np.asarray(out, dtype=np.float32); a2[..., 0] *= 1+d; a2[..., 2] *= 1-d
        out = Image.fromarray(np.clip(a2, 0, 255).astype(np.uint8))
    return out

if __name__ == '__main__':
    adir, src, dst, t = sys.argv[1:5]; pre = sys.argv[5] if len(sys.argv) > 5 else ''
    tone(Image.open(src), targets(adir, t, pre)).save(dst)
