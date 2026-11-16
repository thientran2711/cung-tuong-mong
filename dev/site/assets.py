#!/usr/bin/env python3
"""Write assets.json at the repo root: every image and sound the game may load, keyed by content.
   files: [path, hash, size, group]   hash = sha256 hex[:16]   group 'core' = needed before entering (UI, scenes, maps, items, sounds),
          'fx' = painted effects (img/fx/, KIT §68): on demand only (jload skips them; sw.js caches them when first played),
          'fig' = figure + portrait sets, event, story and festival-map art (downloaded in the background after entering, rarest roles last).
   A hash cache (dev/site/.assets-cache.json, untracked) skips re-hashing files whose size+mtime did not change.
   usage: python3 dev/site/assets.py  (run by build_site.sh)"""
import hashlib, json, os, re, sys
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CACHE = os.path.join(R, 'dev', 'site', '.assets-cache.json')
EXT = ('.webp', '.png', '.jpg', '.jpeg', '.mp3', '.ogg', '.m4a', '.woff2', '.mp4', '.webm')
try: old = json.load(open(CACHE))
except Exception: old = {}
new = {}
def h(p):
    st = os.stat(p); k = f"{st.st_size}:{int(st.st_mtime)}"
    o = old.get(p)
    if o and o[0] == k: v = o[1]
    else:
        d = hashlib.sha256()
        with open(p, 'rb') as f:
            for b in iter(lambda: f.read(1 << 20), b''): d.update(b)
        v = d.hexdigest()[:16]
    new[p] = [k, v]; return v, st.st_size
ROLE = ['emperor', 'thaihau', 'player', 'consort', 'eunuch', 'mama', 'official', 'physician', 'man', 'kid', 'maid']
def bgkey(p):
    b = os.path.basename(p)
    if b.endswith('.js'): return (-1, 0, 0, b)
    if b.startswith(('ev-', 'st-', 'map-fest-')): return (0, 0, 0, b)
    m = re.match(r'(fig|por)-([a-z]+)-?(.*)\.webp$', b)
    role = m.group(2) if m else ''
    ri = ROLE.index(role) if role in ROLE else len(ROLE)
    t = re.search(r'-t(\d)', b); a = re.search(r'-a(\d\d)', b)
    return (1 + ri, int(t.group(1)) if t else 0, int(a.group(1)) if a else 0, b)
# pictures live on Cloudflare (dev/art/CDN.md): with IMG_BASE set (dev/build/jcdn.js; CTM_IMG_BASE overrides, empty = local img/ as before)
# the img/ list comes from the CDN's img/_index.json [key, md5[:16], bytes] — md5 instead of sha256, it is only a content key.
_m = re.search(r'^const IMG_BASE="([^"]*)";', open(os.path.join(R, 'dev', 'build', 'jcdn.js'), encoding='utf-8').read(), re.M)
IMG_BASE = os.environ.get('CTM_IMG_BASE', _m.group(1) if _m else '')
files = []
if IMG_BASE:
    import urllib.request
    for i in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(IMG_BASE + 'img/_index.json', headers={'Cache-Control': 'no-cache', 'User-Agent': 'ctm-build'}), timeout=60) as r:
                IDX = json.load(r)
            break
        except Exception as e:
            if i == 4: sys.exit(f'assets.py: cannot read {IMG_BASE}img/_index.json: {e}')
    for k, hv, sz in IDX['files']:
        if not k.startswith('img/') or not k.lower().endswith(EXT): continue
        parts = k.split('/')
        if any(x.startswith(('.', '_')) for x in parts[1:]) or any(x.startswith('old') for x in parts[1:-1]): continue
        g = 'fx' if k.startswith('img/fx/') else 'fig' if re.match(r'img/(fig|por|ev|st|map-fest)-', k) else 'core'
        files.append([k, hv, sz, g])
for top in (('audio', 'icons') if IMG_BASE else ('img', 'audio', 'icons')):
    for root, ds, fs in os.walk(os.path.join(R, top)):
        ds[:] = sorted(d for d in ds if not d.startswith(('.', '_', 'old')))
        for f in sorted(fs):
            if f.startswith(('.', '_')) or not f.lower().endswith(EXT): continue
            p = os.path.relpath(os.path.join(root, f), R).replace(os.sep, '/')
            hv, sz = h(os.path.join(R, p))
            g = 'fx' if p.startswith('img/fx/') else 'fig' if re.match(r'img/(fig|por|ev|st|map-fest)-', p) else 'core'
            files.append([p, hv, sz, g])
# the bundled Pixi library (dev/vendor): fetched by the game only when a Pixi layer is first needed; listed here so sw.js caches it by content
# (plays offline) and jload.js downloads it in the background after entering (group 'fig', first in line), never before the title screen
VD = os.path.join(R, 'dev', 'vendor')
for f in (sorted(os.listdir(VD)) if os.path.isdir(VD) else []):
    if f.endswith('.js'):
        p = 'dev/vendor/' + f; hv, sz = h(os.path.join(R, p)); files.append([p, hv, sz, 'fig'])
core = [f for f in files if f[3] == 'core']
fig = sorted((f for f in files if f[3] == 'fig'), key=lambda f: bgkey(f[0]))
# group 'fx' (KIT §68 painted effects, img/fx/): never downloaded ahead; listed so sw.js caches each file by content the first time a scene plays it
fig += [f for f in files if f[3] == 'fx']
# the title backdrops first so the loading screen has its painting at once
core.sort(key=lambda f: (0 if re.match(r'img/title-key', f[0]) else 1, f[0]))
out = {'v': hashlib.sha256(json.dumps(core + fig).encode()).hexdigest()[:12], 'files': core + fig}
json.dump(out, open(os.path.join(R, 'assets.json'), 'w'), separators=(',', ':'))
json.dump(new, open(CACHE, 'w'))
mb = lambda l: round(sum(f[2] for f in l) / 1e6, 1)
print(f"assets.json v={out['v']} core {len(core)} files {mb(core)} MB · fig {len(fig)} files {mb(fig)} MB")
