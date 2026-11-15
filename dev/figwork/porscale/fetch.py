#!/usr/bin/env python3
"""porscale/fetch.py: download CDN files listed in <list> (keys like img/por-x.webp) into <dir> (skips files already there).
usage: python3 fetch.py <list> <dir> [threads]"""
import sys, os, urllib.request, concurrent.futures as cf
BASE = "https://ctm-img.victoria-tntt.workers.dev/"
def get(k, d):
    p = os.path.join(d, os.path.basename(k))
    if os.path.exists(p) and os.path.getsize(p) > 0: return 0
    for i in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(BASE + k, headers={"User-Agent": "ctm-porscale"}), timeout=60) as r: b = r.read()
            open(p + '.part', 'wb').write(b); os.replace(p + '.part', p); return 1
        except Exception as e: err = e
    print('FAIL', k, err, file=sys.stderr); return 0
if __name__ == '__main__':
    L = [l.strip() for l in open(sys.argv[1]) if l.strip()]; d = sys.argv[2]; os.makedirs(d, exist_ok=True)
    with cf.ThreadPoolExecutor(int(sys.argv[3]) if len(sys.argv) > 3 else 24) as ex: n = sum(ex.map(lambda k: get(k, d), L))
    print('fetched', n, 'of', len(L))
