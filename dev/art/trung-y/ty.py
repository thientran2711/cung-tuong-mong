#!/usr/bin/env python3
"""ty.py — trung y art pipeline (review/trung-y). Work dir = $TYW (scratchpad), never the repo.
  python3 ty.py urls                      # scan Claude transcripts for Magnific identifier -> url (urls.json)
  python3 ty.py rv OUT.jpg GEN...         # contact sheet of raw edits (previews) to look at
  python3 ty.py proc                      # every line of bg.txt "role id g gen bg" not yet done -> out/fig+por, recs.json
  python3 ty.py sheet OUT.jpg [role-id...]# contact sheet of finished cut-outs (on dark + light), per identity rows G1..G4
  python3 ty.py manifest                  # out/FIGURES-ty.json from recs.json
  python3 ty.py complete ROLE-ID...       # which of these have all 8x4 fig+por in out/
  python3 ty.py publish ROLE-ID...        # copy them to img/ + rebuild img/FIGURES-ty.json (keeps old records)
Files: img/fig-<role>-<id>-ty<g>-<age>.webp (900 px high) + img/por-<role>-<id>-ty<g>-<age>.webp (384x506, porcrop.py).
"""
import sys, os, re, json, glob, subprocess, io
from PIL import Image, ImageDraw, ImageFont
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
W = os.environ.get("TYW", os.path.join(REPO, ".tywork"))
OUT = W + "/out"; os.makedirs(OUT, exist_ok=True); os.makedirs(W + "/bg", exist_ok=True)
import importlib.util
def _load(n, f):
    sp_ = importlib.util.spec_from_file_location(n, f); m = importlib.util.module_from_spec(sp_); sp_.loader.exec_module(m); return m
sp = _load("spfuncs", REPO + "/dev/figwork/maidC/spfuncs.py"); porcrop = _load("porcrop", REPO + "/dev/figwork/porcrop.py"); refine = _load("refine", HERE + "/refine.py")
AG = ["a18", "a26", "a36", "a51"]
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

_URLS = None
def urls():
    global _URLS
    if _URLS is not None: return _URLS
    p = W + "/urls.json"; db = json.load(open(p)) if os.path.exists(p) else {}
    R1 = re.compile(r'\\?"identifier\\?":\\?"(\w+)\\?",\\?"status\\?":\\?"completed\\?",\\?"results\\?":\{\\?"url\\?":\\?"([^"\\]+)')
    R2 = re.compile(r'identifier: (\w+)\\n\s*(?:name: [^\\]*\\n\s*)?(?:family: \S+\\n\s*)?tool: \S+\\n\s*status: completed\\n\s*url: \\"([^"\\]+)')
    fs = glob.glob("/root/.claude/projects/*/*.jsonl") + glob.glob("/root/.claude/projects/*/*/subagents/*.jsonl") + glob.glob("/root/.claude/projects/*/subagents/*.jsonl")
    for f in fs:
        if os.path.getsize(f) > 300_000_000: continue
        for line in open(f, errors="ignore"):
            if "pikaso" not in line: continue
            for m in R1.finditer(line): db.setdefault(m.group(1), m.group(2))
            for m in R2.finditer(line): db.setdefault(m.group(1), m.group(2))
    json.dump(db, open(p, "w"), indent=0); _URLS = db; return db

def get(gid, path, preview=False):
    if os.path.exists(path): return path
    z = glob.glob(f"{W}/zip/*_{gid}.png") + glob.glob(f"{W}/src/{gid}.webp")  # src/: zip contents kept as full-res webp q96 (bin/z2src.py)
    if z and not preview: return z[0]
    db = urls()
    if gid not in db: raise SystemExit("NOURL " + gid)
    u = db[gid] + ("&w=1024&preview=1" if preview else "")
    subprocess.run(["curl", "-sS", "--retry", "5", "--retry-all-errors", "-o", path, u], check=True); return path

def rv(out, gens):
    F = ImageFont.truetype(FONT, 22); cols = 2; tw = 1024; th = 512
    rows = (len(gens) + cols - 1) // cols; S = Image.new("RGB", (cols * tw, rows * (th + 30)), (245, 240, 230)); d = ImageDraw.Draw(S)
    for i, g in enumerate(gens):
        lab = g
        if ":" in g: lab, g = g.split(":")
        p = get(g, f"{W}/raw/pv-{g}.png", preview=True); im = Image.open(p).convert("RGB").resize((tw, th))
        x, y = (i % cols) * tw, (i // cols) * (th + 30); S.paste(im, (x, y + 30)); d.text((x + 6, y + 3), lab, font=F, fill=(80, 30, 20))
    S.save(out, quality=82); print(out)

PART = os.environ.get("TY_PART", "")
RECF = W + "/recs" + (("-" + PART.replace("/", "of")) if PART else "") + ".json"
def recs(all_=False):
    if all_:
        R = {}
        for f in sorted(glob.glob(W + "/recs*.json")): R.update(json.load(open(f)))
        return R
    return json.load(open(RECF)) if os.path.exists(RECF) else {}

def finish(im, name):
    im = sp.clean(im)
    a = im.split()[3].point(lambda v: 255 if v > 12 else 0); im = im.crop(a.getbbox()); w, h = im.size
    fig = im.resize((max(1, round(w * 900 / h)), 900), Image.LANCZOS)
    fp = f"{OUT}/{name}.webp"; sp.save_webp(fig, fp)
    porcrop.make(fp, OUT, src=im, name=name + ".webp")
    return fp

_RB = None
def cut(im):
    global _RB
    from rembg import remove, new_session
    if _RB is None: _RB = new_session("isnet-general-use")
    return remove(im, session=_RB).convert("RGBA")

def load_cut(role, ident, g, gen, bg):
    global _raw
    if bg == "-":
        _raw = get(gen, f"{W}/bg/{gen}.png"); im = Image.open(_raw).convert("RGB")
        im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS) if im.height > 1100 else im
        return refine.refine(im, cut(im))  # colour key vs plain backdrop: pale robes/sleeves/hair isnet left semi-transparent (c13-c19)
    _raw = get(bg, f"{W}/bg/{bg}.png"); return Image.open(_raw).convert("RGBA")
_raw = None

def proc(only=None):
    R = recs(); done = set(open(W + "/done.txt").read().split()) if os.path.exists(W + "/done.txt") else set()
    pi, pn = (int(x) for x in PART.split("/")) if PART else (0, 1)
    for li, line in enumerate(open(HERE + "/bg.txt")):
        if li % pn != pi: continue
        p = line.split()
        if len(p) < 5: continue
        role, ident, g, gen, bg = p[:5]; key = f"{role}-{ident}-ty{g}"
        if only and key not in only: continue
        if key + ":" + (bg if bg != '-' else gen) in done and not only: continue
        if not only and os.path.exists(f"{REPO}/img/fig-{key}-a51.webp"): continue  # already published to img/
        try:
            im = load_cut(role, ident, g, gen, bg)
        except BaseException as ex:
            print(key, "SKIP", ex); continue
        cols = sp.split(im, 4)
        for (x0, x1), ag in zip(cols, AG):
            name = f"fig-{role}-{ident}-ty{g}-{ag}"
            finish(im.crop((max(0, x0 - 4), 0, min(im.width, x1 + 4), im.height)), name)
            R[f"img/{name}.webp"] = {"role": role, "identity": ident, "ty": int(g), "tier": f"ty{g}", "ageBand": ag,
                                     "file": f"img/{name}.webp", "por": f"img/por-{name[4:]}.webp",
                                     "magnificUrl": "https://www.magnific.com/app/creation/" + gen, "bg": bg if bg != "-" else "local-isnet", "sheet": f"TY-{ident}-{g}"}
        print(key, "ok", [x1 - x0 for x0, x1 in cols])
        json.dump(R, open(RECF, "w"), indent=0, ensure_ascii=False)
        open(W + "/done.txt", "a").write(key + ":" + (bg if bg != '-' else gen) + "\n")
        if "/src/" not in _raw:  # keep the archived sources
            try: os.remove(_raw)
            except Exception: pass

def sheet(out, keys):
    F = ImageFont.truetype(FONT, 18); R = recs(True)
    ids = sorted({(r["role"], r["identity"]) for r in R.values()}, key=lambda x: (x[0] != "consort", x[1]))
    if keys: ids = [x for x in ids if f"{x[0]}-{x[1]}" in keys]
    fw, fh = 70, 225; rowW = 16 * fw + 160
    S = Image.new("RGB", (rowW, len(ids) * (fh + 6) + 10), (60, 58, 62)); d = ImageDraw.Draw(S)
    for r, (role, ident) in enumerate(ids):
        y = r * (fh + 6) + 5; d.text((4, y + 4), ident, font=F, fill=(255, 255, 255))
        for g in range(1, 9):
            for k, ag in enumerate(("a18", "a51")):
                p = f"{OUT}/fig-{role}-{ident}-ty{g}-{ag}.webp"
                if not os.path.exists(p): continue
                im = Image.open(p).convert("RGBA"); im.thumbnail((fw, fh))
                x = 60 + ((g - 1) * 2 + k) * fw + (g - 1) * 12
                bgc = (200, 196, 188) if k % 2 else (40, 36, 40)
                tile = Image.new("RGBA", (fw, fh), bgc + (255,)); tile.alpha_composite(im, ((fw - im.width) // 2, fh - im.height)); S.paste(tile.convert("RGB"), (x, y))
    S.save(out, quality=80); print(out, S.size)

def manifest():
    R = recs(True); L = sorted(R.values(), key=lambda r: (r["role"] != "consort", r["identity"], r["ty"], r["ageBand"]))
    json.dump(L, open(OUT + "/FIGURES-ty.json", "w"), ensure_ascii=False, indent=0); print(len(L))

def complete(ids):
    """role-id whose 8 tiers x 4 ages fig+por are all in out/"""
    ok = []
    for x in ids:
        role, ident = x.split("-")
        if all(os.path.exists(f"{OUT}/{k}-{role}-{ident}-ty{g}-{ag}.webp") for g in range(1, 9) for ag in AG for k in ("fig", "por")): ok.append(x)
    return ok

def publish(ids):
    """copy out/ fig+por of finished role-ids into img/ and rebuild img/FIGURES-ty.json (old records + recs, only files present in img/)"""
    import shutil
    for x in ids:
        role, ident = x.split("-")
        for g in range(1, 9):
            for ag in AG:
                for k in ("fig", "por"): shutil.copy2(f"{OUT}/{k}-{role}-{ident}-ty{g}-{ag}.webp", f"{REPO}/img/")
    mp = REPO + "/img/FIGURES-ty.json"; R = {r["file"]: r for r in (json.load(open(mp)) if os.path.exists(mp) else [])}
    # old records stay (their files may live only on the CDN: img/ is pulled lazily and cleaned after upload);
    # new records only for the role-ids published now
    R.update({k: v for k, v in recs(True).items() if f'{v["role"]}-{v["identity"]}' in ids})
    L = sorted(R.values(),
               key=lambda r: (r["role"] != "consort", r["identity"], r["ty"], r["ageBand"]))
    json.dump(L, open(mp, "w"), ensure_ascii=False, indent=0); print("FIGURES-ty.json", len(L))

def refs():
    """reference sheets from the CURRENT CDN t1 figures (huadian shrink + mole fixes live only there): ref/<role>-<id>.png 2048x1024"""
    os.makedirs(W + "/ref", exist_ok=True); os.makedirs(W + "/cdn", exist_ok=True)
    for line in open(W + "/jobs.txt"):
        role, ident, _ = line.split(); out = f"{W}/ref/{role}-{ident}.png"
        if os.path.exists(out): continue
        tier = "t1"; ims = []
        for ag in AG:
            n = f"fig-{role}-{ident}-{tier}-{ag}.webp"; p = f"{W}/cdn/{n}"
            if not os.path.exists(p):
                subprocess.run(["curl", "-sS", "--retry", "5", "--retry-all-errors", "-o", p, "https://ctm-img.victoria-tntt.workers.dev/img/" + n], check=True)
            ims.append(Image.open(p).convert("RGBA"))
        rng = np.random.default_rng(7); base = np.zeros((1024, 2048, 3)) + np.array([244, 233, 218])
        base += rng.normal(0, 2.0, base.shape); S = Image.fromarray(base.clip(0, 255).astype("uint8")).convert("RGBA")
        H = 930
        for k, im in enumerate(ims):
            im = im.resize((round(im.width * H / im.height), H), Image.LANCZOS)
            cx = int(2048 * (k + .5) / 4); S.alpha_composite(im, (cx - im.width // 2, 1024 - H - 40))
        S.convert("RGB").save(out); print(out)

if __name__ == "__main__":
    c = sys.argv[1]
    if c == "urls": print(len(urls()))
    elif c == "rv": rv(sys.argv[2], sys.argv[3:])
    elif c == "proc": proc(set(sys.argv[2:]) or None)
    elif c == "sheet": sheet(sys.argv[2], set(sys.argv[3:]))
    elif c == "manifest": manifest()
    elif c == "refs": refs()
    elif c == "complete": print(" ".join(complete(sys.argv[2:])))
    elif c == "publish": publish(sys.argv[2:])
