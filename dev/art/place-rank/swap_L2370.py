"""PLACES2 (L2370): prepare / do the live swap of the 17 place pictures M2370-NN. Default = DRY RUN (nothing live touched).
  python3 swap_L2370.py            decap every review picture -> img/_review/place-rank/places-l2370/swap/<live>-ha-sang.webp, print plan
  python3 swap_L2370.py --go       ALSO copy them to img/<live>-ha-sang.webp and cdn_sync those files (ONLY on the owner's OK)
Only the base hạ-sáng picture is swapped; the other 15 season x buổi variants (img/<live>-<mùa>-<buổi>.webp) stay old (later job).
Review key -> live key: redo r2 pictures replace their first version; nvp / tu-ninh-cung-ngu have no live -ha-sang file (see NOTE)."""
import os, sys, json, subprocess, shutil
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..')); os.chdir(ROOT)
R = 'img/_review/place-rank/places-l2370'; ST = R + '/swap'; os.makedirs(ST, exist_ok=True)
D = json.load(open('dev/art/place-rank/prompts_places_L2370.json'))
LIVE = {k: k for k in D if not k.endswith('-r2')}
for k in D:
    if k.endswith('-r2') and os.path.exists(f'{R}/{k}-ha-sang.webp'): LIVE[k[:-3]] = None; LIVE[k] = k[:-3]   # r2 wins
NOTE = {'nvp': 'no img/nvp-ha-sang.webp live (live has nvp-v4-*, not referenced by index.html) -> ask foreman which key',
        'tu-ninh-cung-ngu': 'new picture, no live file yet -> needs a code hook-up (Từ Ninh bedroom)'}
plan = []
for k, live in LIVE.items():
    if live is None: continue
    src = f'{R}/{k}-ha-sang.webp'; out = f'{ST}/{live}-ha-sang.webp'
    subprocess.run(['python3', 'dev/art/place-rank/decap.py', src, out], check=True, stdout=subprocess.DEVNULL)
    plan.append((D[k]['code'], k, live, NOTE.get(live, f'img/{live}-ha-sang.webp')))
for p in plan: print(*p, sep='  |  ')
if '--go' in sys.argv:
    dst = []
    for code, k, live, note in plan:
        if live in NOTE: print('SKIP', live, NOTE[live]); continue
        shutil.copy(f'{ST}/{live}-ha-sang.webp', f'img/{live}-ha-sang.webp'); dst.append(f'img/{live}-ha-sang.webp')
    subprocess.run(['python3', 'dev/site/cdn_sync.py', *dst], check=True)
else:
    print('DRY RUN: nothing live touched;', len(plan), 'decapped copies in', ST)
