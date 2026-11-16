#!/usr/bin/env python3
"""D24: consort-c12-ty5-a51 forehead hole. Usage: d24_forehead.py por.webp fig.webp gen.png outdir
The original por/fig have a semi-transparent grey-white hole over the forehead. gen.png = Magnific gpt-2-6 edit (2k, 3:4) of the por.
Aligns gen to por (ECC affine on the face), copies the forehead/hairline zone only (feathered), fills alpha; fig gets the same
patch via the por->fig scale map found by template matching on a36."""
import sys, cv2, numpy as np
from PIL import Image
por, fig, gen, out = sys.argv[1:5]
o = np.asarray(Image.open(por).convert('RGBA')).copy(); H, Wd = o.shape[:2]
g = np.asarray(Image.open(gen).convert('RGB').resize((Wd, H), Image.LANCZOS))
og = cv2.cvtColor(o[..., :3], cv2.COLOR_RGB2GRAY).astype(np.float32); gg = cv2.cvtColor(g, cv2.COLOR_RGB2GRAY).astype(np.float32)
mk = np.zeros(og.shape, np.uint8); mk[150:300, 110:300] = 1
Wm = np.eye(2, 3, dtype=np.float32)
_, Wm = cv2.findTransformECC(og, gg, Wm, cv2.MOTION_AFFINE, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 200, 1e-6), mk, 5)
w = cv2.warpAffine(g, Wm, (Wd, H), flags=cv2.INTER_LANCZOS4 + cv2.WARP_INVERSE_MAP).astype(np.float32)
m = np.zeros((H, Wd), np.float32); m[138:205, 140:246] = 1
a = cv2.dilate((o[..., 3] < 250).astype(np.float32) * 1, np.ones((9, 9), np.uint8)); ext = np.zeros_like(m); ext[112:205, 130:250] = 1
m = np.maximum(m, a * ext); m[w.sum(2) < 120] = 0; m = cv2.erode(m, np.ones((3, 3), np.uint8)); m = cv2.GaussianBlur(m, (0, 0), 3)
def comp(base, wimg, mm):
    r = base.astype(np.float32); r[..., :3] = base[..., :3] * (1 - mm[..., None]) + wimg * mm[..., None]
    r[..., 3] = np.maximum(base[..., 3], 255 * np.clip(mm * 1.6, 0, 1)); return r.clip(0, 255).astype(np.uint8)
Image.fromarray(comp(o, w, m)).save(out + '/por.webp', 'WEBP', quality=88, method=4)
# fig: fig = s*por + (ox,oy)
s, ox, oy = (float(x) for x in (sys.argv[5].split(",") if len(sys.argv) > 5 else "0.66,49,-43".split(",")))
f = np.asarray(Image.open(fig).convert('RGBA')).copy(); Hf, Wf = f.shape[:2]
M = np.array([[s, 0, ox], [0, s, oy]], np.float32)
wf = cv2.warpAffine(w, M, (Wf, Hf), flags=cv2.INTER_AREA); mf = cv2.warpAffine(m, M, (Wf, Hf), flags=cv2.INTER_AREA)
Image.fromarray(comp(f, wf, mf)).save(out + '/fig.webp', 'WEBP', quality=88, method=4)
