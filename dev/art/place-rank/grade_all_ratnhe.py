"""PR21 (owner L1669 "quyết định chọn nền rất nhẹ"): grade every live room/place background (img/<place>-<season>-<buoi>.webp) with
room_vivid.py preset ratnhe -> img/_ratnhe/<same name>.webp. 0 cr. Originals untouched (rollback = keep using img/<name>.webp).
Skips map / act / nvp-v4*. python3 grade_all_ratnhe.py KEYS.json SRC_DIR"""
import sys, os, json, re, urllib.request, concurrent.futures as cf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from PIL import Image
import room_vivid as V
keys = [k for k in json.load(open(sys.argv[1])) if not re.match(r'img/(map|act|nvp-v4)', k)]
src = sys.argv[2]; os.makedirs(src, exist_ok=True); os.makedirs('img/_ratnhe', exist_ok=True)
CDN = 'https://ctm-img.victoria-tntt.workers.dev/'
def one(k):
    n = os.path.basename(k); p = os.path.join(src, n); o = os.path.join('img/_ratnhe', n)
    if os.path.exists(o): return n, 'skip'
    for t in range(4):
        try:
            if not os.path.exists(p): open(p, 'wb').write(urllib.request.urlopen(urllib.request.Request(CDN + k, headers={'User-Agent': 'curl/8.5'}), timeout=60).read())
            V.grade(Image.open(p), **V.P['ratnhe']).save(o, quality=88); return n, 'ok'
        except Exception as e: err = e; os.path.exists(p) and os.remove(p)
    return n, f'FAIL {err}'
with cf.ThreadPoolExecutor(8) as ex:
    r = list(ex.map(one, keys))
bad = [x for x in r if x[1].startswith('FAIL')]
print(len(keys), 'keys;', sum(s == 'ok' for _, s in r), 'ok;', len(bad), 'FAIL', bad[:3])
