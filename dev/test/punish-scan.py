#!/usr/bin/env python3
"""review/punish-reason (D1) whole-family scan: every demotion / lãnh cung / ân xá / phục vị road in dev/build/j*.js.
usage: python3 dev/test/punish-scan.py [git-ref]   (no ref = working tree). Prints one row per family + the offending sites.
Families
  two_rank   a rank drop of 2+ at once (seatDown(x, x.rank-2) / rank-2)
  skip_seat  a punishment drop through seatDown(p, rank-1): a full lower seat pushes her further (two ranks)
  npc_free   an NPC leaving lãnh cung (.out=false) without the stay gate (coldStayOk) / one-rank rule (coldFree)
  npc_floor  an NPC released straight to Đáp ứng (.rank=0 next to .out=false)
  me_free    her release roads (restore(full,why) calls): all gated inside restore (count only)
  me_note    her punishment functions without the reason notice (punNote / kitPanel rows) — fall, demote, punish, deathSentence, cold
  gloom      the j93 rank-drop scene without the reason line (S.punLast)
  npc_zero   (reviewer r1) a punishment that sets an NPC straight to Đáp ứng (v.rank=0 outside a new-life / new-rival set-up)
"""
import re, subprocess, sys, glob, os
ref = sys.argv[1] if len(sys.argv) > 1 else None
root = os.path.join(os.path.dirname(__file__), '..', 'build')
def files():
    if ref:
        out = subprocess.run(['git', 'ls-tree', '--name-only', ref, 'dev/build/'], capture_output=True, text=True, cwd=os.path.join(root, '..', '..')).stdout.split()
        for f in out:
            b = os.path.basename(f)
            if re.match(r'j.*\.js$', b) and b != 'jbal.js':
                yield b, subprocess.run(['git', 'show', f'{ref}:{f}'], capture_output=True, text=True, cwd=os.path.join(root, '..', '..')).stdout
    else:
        for f in sorted(glob.glob(os.path.join(root, 'j*.js'))):
            yield os.path.basename(f), open(f, encoding='utf-8').read()
F = {k: [] for k in ['two_rank', 'skip_seat', 'npc_free', 'npc_floor', 'me_free', 'me_note', 'gloom', 'npc_zero']}
for name, src in files():
    if name in ('jpun.js',):
        continue
    for i, line in enumerate(src.split('\n'), 1):
        for m in re.finditer(r'seatDown\(\s*[\w.]+\s*,\s*[^)]*?rank\s*-\s*([2-9])', line):
            F['two_rank'].append(f'{name}:{i}')
        for m in re.finditer(r'seatDown\(\s*([\w.]+)\s*,\s*(?:rkOf\(\1\)|\1\.rank)\s*-\s*1\s*\)', line):
            F['skip_seat'].append(f'{name}:{i}')
        for m in re.finditer(r'(\w[\w.]*)\.out\s*=\s*(?:false|0)\b', line):
            who = m.group(1)
            if who in ('S', 's', 'n') or name in ('jcoopworld.js', 'jkc.js', 'jkc2.js', 'jcoopask.js', 'jagstaff.js'):
                continue  # her own state is gated in restore; co-op mirror / palace entry / servant / new rival are not a release
            ctx = line[max(0, m.start() - 400): m.end() + 200]
            if 'coldStayOk' not in ctx:
                F['npc_free'].append(f'{name}:{i}')
            if re.search(re.escape(who) + r'\.rank\s*=\s*0\b', line[m.start(): m.end() + 40]):
                F['npc_floor'].append(f'{name}:{i}')
        for m in re.finditer(r'\brestore\((?:true|false|full|[^)]*,)', line):
            if 'function restore' not in line[max(0, m.start() - 9): m.end()]:
                F['me_free'].append(f'{name}:{i}')
        for m in re.finditer(r'\b(v|p|e|x|t)\.rank\s*=\s*0\b', line):
            F['npc_zero'].append(f'{name}:{i}')
        if name == 'j93.js' and 'Bị giáng xuống ${kmRankName(b.rank)}' in line and 'punLast' not in line:
            F['gloom'].append(f'{name}:{i}')
    for fn in ['fall', 'demote', 'punish', 'deathSentence', 'cold']:
        m = re.search(r'function ' + fn + r'\(([^)]*)\)\{', src)
        if not m:
            continue
        body = src[m.end(): m.end() + 3000]
        nx = re.search(r'\nfunction \w+\(', body)
        body = body[: nx.start()] if nx else body
        if 'punNote' not in body and 'punRows' not in body and 'punLight' not in body:
            F['me_note'].append(f'{name}:{fn}')
print(f"punish-scan ({ref or 'working tree'})")
for k, v in F.items():
    print(f'  {k:10s} {len(v):3d}  {" ".join(v[:14])}')
