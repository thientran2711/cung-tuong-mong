#!/usr/bin/env python3
"""sweep every woman por/fig on the CDN: fresh two-pass mesh vs the stored CDN mk-fit points → res/<face>.json {file:[d,enc,W,H,it]}"""
import json, re, os, sys, glob, urllib.request, concurrent.futures as cf, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("GLOG_minloglevel", "3")
M = '/home/user/wt/face_landmarker.task'
BASE = "https://ctm-img.victoria-tntt.workers.dev/img/"
def get(u):
    e = None
    for i in range(5):
        try: return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "curl/8"}), timeout=60).read()
        except Exception as x: e = x; time.sleep(1 + i)
    raise e
def face_of(n):
    m = re.match(r"(?:por|fig)-([a-z]+-[a-z]*\d+)-", n); return m.group(1) if m else None
def job(g, names):
    import refit
    out = f"res/{g}.json"
    try: res = json.load(open(out))
    except Exception: res = {}
    try: old = json.load(open(f"cdnfit/{g}.json"))
    except Exception: old = {}
    todo = [n for n in names if n not in res]
    with cf.ThreadPoolExecutor(6) as ex: datas = dict(zip(todo, ex.map(lambda n: get(BASE + n), todo)))
    for n in todo:
        try: p, (W, H), it = refit.detect(M, datas[n])
        except Exception as x: p, W, H, it = None, 0, 0, 0
        if p is None: res[n] = [None, None, W, H, 0]; continue
        e = refit.mkfit.enc(p, W, H)
        d = round(refit.disp(old[n], p, W, H), 3) if n in old else -1
        res[n] = [d, e, W, H, it]
    json.dump(res, open(out, "w"), separators=(",", ":"))
    return g, len(names), len(todo)
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    os.makedirs("res", exist_ok=True)
    I = json.load(open('idx.json'))['files']
    groups = {}
    for k, m, s in I:
        n = k[4:]
        if re.match(r'img/(por|fig)-(consort|player|maid|mama|thaihau)-.*\.webp$', k): groups.setdefault(face_of(n), []).append(n)
    only = sys.argv[1] if len(sys.argv) > 1 else ""
    G = sorted(g for g in groups if g and g.startswith(only))
    with cf.ProcessPoolExecutor(4) as ex:
        for r in ex.map(job, G, [groups[g] for g in G]): print(*r, flush=True)
