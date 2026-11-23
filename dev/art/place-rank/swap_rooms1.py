#!/usr/bin/env python3
"""ROOMS1 swap (owner 23/11 03:25Z "tranh vẽ xong rồi thì thay luôn đi"; L30/L2391 structure-true window rule).
16 consort-room base pictures img/<key>-ha-sang.webp: window drapes removed (gpt-2-6 EDIT of the live picture, codes RM1-01..16).
New files staged on the CDN at img/_review/rooms1/new/<key>-ha-sang.webp; the old live files are backed up at img/_review/rooms1/old/.
  python3 dev/art/place-rank/swap_rooms1.py          dry run: download new, check md5 vs stage, print plan
  python3 dev/art/place-rank/swap_rooms1.py --go     ALSO copy to img/<key>-ha-sang.webp and cdn_sync them (live swap)
  python3 dev/art/place-rank/swap_rooms1.py --revert put the old pictures back (from img/_review/rooms1/old/)
Only the summer-morning base changes; the 15 other season x buổi variants stay old (option 1 = bases only).
After --go the site build (build_site.sh -> assets.py reads img/_index.json) picks up the new content keys."""
import hashlib, os, subprocess, sys, urllib.request
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')); os.chdir(R)
B = 'https://ctm-img.victoria-tntt.workers.dev/img/'
KEYS = ['canh-phuc-cung', 'canh-phuc-cung-tay-phoi', 'chung-tu-cung-dong-phoi', 'chung-tu-cung', 'dien-huy-cung-dong-phoi', 'dien-huy-cung',
        'dien-huy-cung-tay-phoi', 'ham-an-cung-dong-phoi', 'ham-an-cung', 'khai-tuong-cung-tay-phoi', 'thua-minh-cung-dong-phoi', 'thua-minh-cung',
        'thua-minh-cung-tay-phoi', 'truong-xuan-cung-dong-phoi', 'truong-xuan-cung', 'vinh-hoa-cung']
src = 'old' if '--revert' in sys.argv else 'new'
os.makedirs('img', exist_ok=True); dst = []
for k in KEYS:
    data = urllib.request.urlopen(urllib.request.Request(f'{B}_review/rooms1/{src}/{k}-ha-sang.webp', headers={'Cache-Control': 'no-cache', 'User-Agent': 'ctm-build'}), timeout=60).read()
    live = urllib.request.urlopen(urllib.request.Request(f'{B}{k}-ha-sang.webp', headers={'Cache-Control': 'no-cache', 'User-Agent': 'ctm-build'}), timeout=60).read()
    same = hashlib.md5(data).hexdigest() == hashlib.md5(live).hexdigest()
    print(f'img/{k}-ha-sang.webp  {src} {len(data)} B  live {len(live)} B  {"(already)" if same else "-> CHANGE"}')
    if not same: open(f'img/{k}-ha-sang.webp', 'wb').write(data); dst.append(f'img/{k}-ha-sang.webp')
if ('--go' in sys.argv or '--revert' in sys.argv) and dst:
    subprocess.run(['python3', 'dev/site/cdn_sync.py', *dst], check=True)
    for p in dst: os.remove(p)
    print('swapped', len(dst))
else: print('dry run:', len(dst), 'would change')
