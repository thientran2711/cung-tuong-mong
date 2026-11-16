#!/usr/bin/env python3
"""item-art build (review/item-art): cut-out 2x2 grids -> 1024 masters + display sizes.
Inputs (Magnific gpt-2-6 + remove-background PNG grids) in tmp/gen/nb/, cells made by tmp/cut.py.
Outputs under img/ (NOT in git; pushed with dev/site/cdn_sync.py):
  img/hi/<key>.webp            1024 master (q92)           -> D3 item-big uses these
  img/item512/<key>.webp       512 (item-tp-*)            | img/pet512/<key>.webp for pets
  img/<key>.webp               256 display
"""
import os, sys
from PIL import Image
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
T = os.path.join(R, "tmp")
DR = {"dr_G1": ["y-cungnu", "y-luamoc", "y-hoanho", "y-saxanh"], "dr_G2": ["y-maimai", "y-vanthuy", "y-lan", "y-tramnep"],
      "dr_G3": ["y-haiduong", "y-chimen", "y-maudon", "y-hac"], "dr_G4": ["y-kimtuyen", "y-vancam", "y-trieutim", "y-bachdieu"],
      "dr_G5": ["y-minhhoang", "y-phuongbao", "y-chuongsu", "y-mama"], "dr_G6": ["y-nuquan", "y-tang", "nt-bachhoa", "nt-hocuu"]}
JOBS=[]
def save(im, key, mid=None, small=256):
    JOBS.append((im, key, mid, small))
def _save(a):
    im, key, mid, small = a
    for d in ("img/hi", "img/item512", "img/pet512"): os.makedirs(os.path.join(R, d), exist_ok=True)
    im.convert("RGBA").save(os.path.join(R, "img/hi", key + ".webp"), quality=92, method=3)
    im.resize((512, 512), Image.LANCZOS).save(os.path.join(R, mid or "img/item512", key + ".webp"), quality=88, method=3)
    im.resize((small, small), Image.LANCZOS).save(os.path.join(R, "img", key + ".webp"), quality=88, method=3)
cells = os.path.join(T, "gen/cells")
for kind in ("tho", "huong"):
    for r in ["r%02d" % i for i in range(1, 11)] + ["g"]:
        for b in range(1, 5):
            im = Image.open(f"{cells}/{kind}_{r}_b{b}.png")
            key = f"item-tp-{kind}-b{b}" if r == "g" else f"item-tp-{kind}-{r}-b{b}"
            save(im, key)
for g, names in DR.items():
    for i, n in enumerate(names):
        save(Image.open(f"{cells}/{g}_b{i+1}.png"), "wd-" + n)
save(Image.open(f"{T}/gen/dr7.png"), "wd-nt-longchon")
for k in ["meomuop", "cho", "tho", "meo", "sutu", "linhmieu", "cuuvi", "ngoctho"]:
    save(Image.open(f"{T}/pets/out/{k}.png"), f"pet-{k}-tn", mid="img/pet512")
import multiprocessing as mp
with mp.Pool(3) as p: p.map(_save, JOBS, chunksize=4)
print("done", len(JOBS))
