#!/usr/bin/env python3
"""cdn-refs.py: every picture the game can ask for is on the CDN (review/cdn-images, dev/art/CDN.md).

  python3 dev/test/cdn-refs.py [--head] [--extra keys.txt]
  1. assets.json: every img/ entry is in img/_index.json (and with --head: the Worker answers 200 for each, HEAD, 24 at a time)
  2. index.html: every literal CDN picture URL (…workers.dev/img/<name>.<ext>) is in the index
  3. CDN manifests (img/*.json): every "img/…" value is in the index; ACTS.json acts -> act-<key>.webp, cats -> act-cat-<slug>.webp
     when listed in have; INFO.json have -> info-<k>.webp / <k>.webp
  4. name families built at run time (face-*, map-*, scene-<season>-<buổi>, item*, kit/*, bg-origin-*, origin-wide-*, scar-*, wd512):
     the domains are read from index.html (SCN_VAR, ITIMG, KIT_ORIGINS, SEAK/BUK …) and expanded
  --extra: a file of keys (one per line, img/…) seen by the browser run (dev/test/cdn-play.js) — each must be in the index
  Exit 1 when anything is missing. Prints a summary + every missing key."""
import json, re, sys, urllib.request, concurrent.futures as cf, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
BASE = re.search(r'^const IMG_BASE="([^"]*)";', open(R + "/dev/build/jcdn.js", encoding="utf-8").read(), re.M).group(1)
def get(u):
    q = urllib.request.Request(u, headers={"Cache-Control": "no-cache", "User-Agent": "ctm-test"})
    return urllib.request.urlopen(q, timeout=60).read()
idx = json.loads(get(BASE + "img/_index.json?nc=1"))
have = {k for k, h, n in idx["files"]}
miss = {}
def need(k, why):
    if k not in have: miss.setdefault(k, why)
# 1
A = json.load(open(R + "/assets.json"))["files"]
aimg = [f[0] for f in A if f[0].startswith("img/")]
for k in aimg: need(k, "assets.json")
head_bad = []
if "--head" in sys.argv:
    def hd(k):
        try:
            q = urllib.request.Request(BASE + urllib.parse.quote(k), method="HEAD", headers={"User-Agent": "ctm-test"})
            return k, urllib.request.urlopen(q, timeout=60).status
        except urllib.error.HTTPError as e: return k, e.code
        except Exception as e: return k, str(e)[:60]
    import urllib.parse
    with cf.ThreadPoolExecutor(24) as ex:
        for k, s in ex.map(hd, aimg):
            if s != 200: head_bad.append((k, s))
# 2
H = open(R + "/index.html", encoding="utf-8").read()
lit = set(re.findall(re.escape(BASE) + r'(img/[A-Za-z0-9_./-]+\.(?:webp|png|jpg|json))(?![A-Za-z0-9_-])', H))
lit = {k for k in lit if not re.search(r'\.\.|<|\*', k)}
for k in lit: need(k, "index.html literal")
# 3
mans = [k for k in have if re.fullmatch(r"img/[^/_][^/]*\.json", k)]
nman = 0
oldnb = set()
for m in mans:
    j = get(BASE + m)
    s = j.decode("utf-8", "replace")
    for k in set(re.findall(r'"(?:\./)?(img/[^"<|*]+\.(?:webp|png|jpg))"', s)):
        if m == "img/MANIFEST.json" and k.startswith("img/old-nb/"): oldnb.add(k); continue  # never in git, the game does not read MANIFEST.json
        need(k, m); nman += 1
    if m == "img/ACTS.json":
        d = json.loads(s)
        for v in set((d.get("acts") or {}).values()): need(f"img/act-{v}.webp", m); nman += 1
        for v in (d.get("have") or []):
            if str(v).startswith("act-"): need(f"img/{v}.webp", m); nman += 1
    if m == "img/INFO.json":
        d = json.loads(s)
        for v in d.get("have") or []:
            need(f"img/{v}.webp" if re.match(r"(art|vir)-", v) else f"img/info-{v}.webp", m); nman += 1
    if m.startswith("img/FIGURES"):
        d = json.loads(s)
        L = d if isinstance(d, list) else (d.get("figures") or d.get("files") or list(d.values()))
        def walk(o):
            global nman
            if isinstance(o, dict):
                for kk, vv in o.items():
                    if kk in ("file", "src", "por", "fig") and isinstance(vv, str) and vv.endswith((".webp", ".png")):
                        need(vv if vv.startswith("img/") else "img/" + vv, m); nman += 1
                    else: walk(vv)
            elif isinstance(o, list):
                for x in o: walk(x)
        walk(d)
# 4
fam = {}
def famk(name, keys):
    fam[name] = len(keys)
    for k in keys: need(k, "family " + name)
SEA = ["xuan", "ha", "thu", "dong"]
BUK = json.loads(re.search(r'BUK=(\[[^\]]*\])', H).group(1))
famk("map-<mùa>-<buổi>", [f"img/map-{s}-{b}.webp" for s in SEA for b in BUK] + [f"img/map-{b}.webp" for b in BUK])
scn = json.loads(re.search(r'const SCN_VAR=(\{.*?\});/\*@SCN_VAR', H).group(1))
famk("cảnh-<mùa>-<buổi>", [f"img/{sc}-{v}.webp" for sc, vs in scn.items() for v in vs.split()] + [f"img/{sc}.webp" for sc in scn])
famk("face-eunuch/official", [f"img/face-eunuch-{i}.webp" for i in range(1, 5)] + [f"img/face-official-{i}.webp" for i in range(1, 5)] + ["img/face-physician.webp"])
famk("face-prince/princess", [f"img/face-{s}-{b}-{v}.webp" for s in ("prince", "princess") for b in ("baby", "small", "child", "teen") for v in range(1, 5)])
ko = json.loads(re.search(r'KIT_ORIGINS=(\[[^\]]*\])', H).group(1))
famk("bg-origin/origin-wide", [f"img/bg-origin-{k}.webp" for k in ko] + [f"img/origin-wide-{k}.webp" for k in ko])
famk("scar", [f"img/scar-{i}.png" for i in (1, 2, 3)])
famk("kit/islot-frame", [f"img/kit/islot-frame-{i}.webp" for i in range(5)])
m = re.search(r'(?:const|let|var)\s+ITIMG\s*=\s*(\{[^;]*?\})\s*[;,]', H)
if m:
    it = set(re.findall(r':\s*"([^"]+)"', m.group(1)))
    famk("item-<ITIMG>", [f"img/item-{v}.webp" for v in it])
# 5 extra keys seen by the browser
nx = 0
if "--extra" in sys.argv:
    for l in open(sys.argv[sys.argv.index("--extra") + 1]):
        l = l.strip()
        if l.startswith("img/"): need(l, "seen in browser"); nx += 1
out = {"index": len(have), "assetsImg": len(aimg), "headChecked": len(aimg) if "--head" in sys.argv else 0, "headBad": head_bad[:20],
       "nHeadBad": len(head_bad), "literals": len(lit), "manifests": len(mans), "manifestRefs": nman, "families": fam, "browserKeys": nx,
       "skippedOldNb": len(oldnb), "missing": len(miss)}
print(json.dumps(out, ensure_ascii=False))
for k, w in sorted(miss.items()): print("MISSING", k, "<-", w)
sys.exit(1 if miss or head_bad else 0)
