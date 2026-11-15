# mm.py (art8) re-matte single figures. crop <targets.txt> | fin <name> <bgid> [...]
#  crop: targets = img/fig-*.webp lines; raw gen from FIGURES magnificUrl + urls.json; writes mm/crops/<name>.png + .json
#  fin : downloads bg cut (urls.json), pastes into raw-size canvas, demole (+manual spots from demole_spots.txt by sheet jid),
#        cleans islands, resizes to old fig height, writes wt img fig (por via porcrop afterwards)
import sys, os, json, subprocess, re
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from rematte import runs_of, thumb, clean, save_webp
W = os.path.dirname(os.path.abspath(__file__)); WT = W.replace("/figwork", "/wt-art8")
D = W + "/mm"; os.makedirs(D + "/crops", exist_ok=True); os.makedirs(D + "/raw", exist_ok=True); os.makedirs(D + "/cut", exist_ok=True)
F = {r["file"]: r for r in json.load(open(WT + "/img/FIGURES.json"))}
def U(): return json.load(open(W + "/urls.json"))
AGES = {"a18": 0, "a26": 1, "a36": 2, "a51": 3}
def crop(tf):
    u = U()
    for t in open(tf).read().split():
        name = os.path.basename(t)[:-5]
        if os.path.exists(f"{D}/crops/{name}.png"): continue
        r = F[t]; gen = r["magnificUrl"].rstrip("/").split("/")[-1]
        rp = f"{D}/raw/{gen}.png"
        if not os.path.exists(rp): subprocess.run(["curl", "-sS", "-o", rp, u[gen]], check=True)
        raw = Image.open(rp).convert("RGB"); rs = runs_of(raw)
        i = AGES[r["ageBand"]]
        cuts = [0] + [(rs[k][1] + rs[k + 1][0]) // 2 for k in range(len(rs) - 1)] + [raw.width]
        # sanity: thumb match
        old = thumb(Image.open(WT + "/" + t)); P0 = np.array([230, 213, 195], np.float32); errs = []
        for k, (a, b) in enumerate(rs):
            S = np.asarray(raw.crop((a, 0, b, raw.height)))
            al = np.where(np.linalg.norm(S.astype(np.float32) - P0, axis=-1) > 28, 255, 0).astype(np.uint8)
            errs.append(round(float(np.abs(thumb(Image.fromarray(np.dstack([S, al]), "RGBA")) - old).mean()), 1))
        x0 = max(cuts[i], rs[i][0] - 60); x1 = min(cuts[i + 1], rs[i][1] + 60)
        raw.crop((x0, 0, x1, raw.height)).save(f"{D}/crops/{name}.png", compress_level=3)
        json.dump(dict(gen=gen, sheet=r.get("sheet"), raw=raw.size, box=[x0, x1], file=t), open(f"{D}/crops/{name}.json", "w"))
        print(name, "runs", len(rs), "pick", i, "errs", errs, "WARN" if min(errs) < errs[i] - 3 else "")
def fin(pairs):
    u = U(); spots = {}
    for l in open(W + "/demole_spots.txt"):
        p = l.split(); spots[p[0]] = p[2:]
    for name, bid in pairs:
        m = json.load(open(f"{D}/crops/{name}.json")); bp = f"{D}/cut/{name}-{bid}.png"
        if not os.path.exists(bp): subprocess.run(["curl", "-sS", "-o", bp, u[bid]], check=True)
        cut = Image.open(bp).convert("RGBA")
        cw = m["box"][1] - m["box"][0]
        if cut.size != (cw, m["raw"][1]): cut = cut.resize((cw, m["raw"][1]), Image.LANCZOS)
        can = Image.new("RGBA", tuple(m["raw"]), (0, 0, 0, 0)); can.paste(cut, (m["box"][0], 0))
        cp = f"{D}/cut/{name}-canvas.png"; dp = f"{D}/cut/{name}-dm.png"; can.save(cp)
        subprocess.run(["python3", "-I", W + "/demole.py", cp, dp] + spots.get(m.get("sheet") or "", []), check=True)
        im = Image.open(dp).convert("RGBA").crop((m["box"][0], 0, m["box"][1], m["raw"][1]))
        im = clean(im); a = im.split()[3].point(lambda v: 255 if v > 12 else 0); im = im.crop(a.getbbox())
        old = Image.open(WT + "/" + m["file"]); w, h = im.size; H = old.height
        os.makedirs(D+"/rm",exist_ok=True); im.resize((max(1, round(w * H / h)), H), Image.LANCZOS).save(D+"/rm/"+name+".webp",lossless=True); kb=0
        F[m["file"]]["rematte"] = bid
        print(name, "ok", kb // 1024, "KB")
if __name__ == "__main__":
    if sys.argv[1] == "crop": crop(sys.argv[2])
    else: a = sys.argv[2:]; fin(list(zip(a[::2], a[1::2])))
