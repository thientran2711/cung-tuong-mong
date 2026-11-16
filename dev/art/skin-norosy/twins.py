#!/usr/bin/env python3
"""twins.py FINALDIR CURDIR — after unrosy(.py/_model.py): the same correction on the derived copies of each fixed picture.
  img/hd/<fig>  (face-sharp HD twin = up(900 file) + sheet detail): the 900 correction field resized to the twin, subtracted in Lab.
  img/tn/<fig|por> (tn_make.py thumbnails): re-made from the fixed file with tn_make's exact size/quality (TN.json untouched)."""
import sys, os, numpy as np, cv2
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from unrosy import lab, apply, save
FIN, CUR = sys.argv[1:3]
for n in sorted(os.listdir(f"{FIN}/img")):
    if not n.endswith(".webp"): continue
    A = np.load(f"{FIN}/fld/{n}.npz")["A"].astype(np.float32)
    hd = f"{CUR}/img/hd/{n}"
    if os.path.exists(hd):
        Hm = cv2.imread(hd, cv2.IMREAD_UNCHANGED); Ar = cv2.resize(A, (Hm.shape[1], Hm.shape[0]), interpolation=cv2.INTER_LINEAR)
        os.makedirs(f"{FIN}/img/hd", exist_ok=True); q, r, b = save(f"{FIN}/img/hd/{n}", apply(Hm, Ar), Hm); print("hd", n, q, r, b)
    tn = f"{CUR}/img/tn/{n}"
    if os.path.exists(tn):
        im = Image.open(f"{FIN}/img/{n}").convert("RGBA"); kind = n[:3]
        if kind == "por": w, h = 128, round(im.height * 128 / im.width)
        else: h, w = 240, round(im.width * 240 / im.height)
        os.makedirs(f"{FIN}/img/tn", exist_ok=True)
        im.resize((w, h), Image.LANCZOS).save(f"{FIN}/img/tn/{n}", "WEBP", quality=80 if kind == "por" else 70, method=4); print("tn", n)
