#!/usr/bin/env python3 -I
"""scale-room: build the "Phong co gian" page assets. Downloads each figure of a set (CDN), writes display-size WebP (h=900) + sets.json.
head top (1/4000 of picture height, same unit as img/fig-ht.json): live fig-ht.json row when the file has one, else OpenCV Haar face box: face top - 0.45*face height,
fallback painted top + 0.046*body (silhouette rule of headtop.py).  usage: build_sets.py <outdir> [sets_extra.json]
sets_extra.json = [{"id","name","items":[{"file","url","label"}]}]  (more sets are added by listing them there)"""
import sys, os, io, json, urllib.request
import numpy as np, cv2
from PIL import Image
CDN = "https://ctm-img.victoria-tntt.workers.dev/img/"; U = 4000; H = 900
S = CDN + "_review/maid-consort-sample/"
SET1 = [("c12_a18_r5_t1_fresh.png", "t1 r5"), ("c12_a18_r5_t2_fresh.png", "t2 r5"), ("c12_a18_r5_t3_fresh.png", "t3 r5"), ("c12_a18_v5_t4_fresh.png", "t4 v5"),
        ("c12_a18_r2_t5_fresh.png", "t5 r2"), ("c12_a18_v9_t6_fresh.png", "t6 v9"), ("c12_a18_r4_t7b_fresh.png", "t7b r4"), ("c12_a18_r4_t8_fresh.png", "t8 v2 r4")]
SETS = [{"id": "c12-a18-mau", "name": "c12 a18 · bộ mẫu mới", "items": [{"file": f, "url": S + f, "label": l} for f, l in SET1]},
        {"id": "c12-a18-live", "name": "c12 a18 · tranh đang dùng t1–t8", "items": [{"file": "fig-consort-c12-t%d-a18.webp" % t, "url": CDN + "fig-consort-c12-t%d-a18.webp" % t, "label": "t%d" % t} for t in range(1, 9)]}]
def get(u): return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "scale-room"}), timeout=60).read()
def haar_top(im):
    g = np.asarray(im.convert("L")); h = g.shape[0]; g = g[: int(h * .4)]
    c = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    for sf, mn in ((1.1, 4), (1.05, 3), (1.03, 2)):
        f = c.detectMultiScale(g, sf, mn, minSize=(int(g.shape[1] * .08),) * 2)
        if len(f):
            x, y, w, hh = max(f, key=lambda r: r[2] * r[3]); return (y - .45 * hh) / h
    return None
def main(out, extra=None):
    os.makedirs(out, exist_ok=True); sets = SETS + (json.load(open(extra)) if extra else [])
    table = json.loads(get(CDN + "fig-ht.json")); res = []
    for s in sets:
        items = []
        for it in s["items"]:
            im = Image.open(io.BytesIO(get(it["url"]))).convert("RGBA"); w, h = im.size; a = np.asarray(im)[..., 3] > 40
            ys = np.where(a.any(1))[0]; top, feet = ys[0] / h, (ys[-1] + 1) / h
            if it["file"] in table: ht, how = table[it["file"]] / U, "table"
            else:
                t = haar_top(im); how = "auto"
                if t is None or not (top - .01 <= t < feet - .3): t = (top + .046 * feet) / 1.046; how = "auto-edge"
                ht = t
            im = im.resize((round(w * H / h), H), Image.LANCZOS); name = os.path.splitext(it["file"])[0] + ".webp"
            q = 82
            while True:
                b = io.BytesIO(); im.save(b, "WEBP", quality=q, method=6)
                if b.tell() <= 150000 or q < 40: break
                q -= 8
            open(os.path.join(out, name), "wb").write(b.getvalue())
            items.append({"file": it["file"], "img": "img/" + name, "label": it.get("label", it["file"]), "ar": round(w / h, 4), "ht": int(round(ht * U)), "how": how, "feet": round(feet, 4), "top": round(top, 4)})
            print(it["file"], how, items[-1]["ht"], round(feet, 3), b.tell() // 1024, "KB")
        res.append({"id": s["id"], "name": s["name"], "items": items})
    json.dump(res, open(os.path.join(out, "sets.json"), "w"), ensure_ascii=False)
if __name__ == "__main__": main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
