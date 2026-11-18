#!/usr/bin/env python3
"""git mv unreferenced, >24 h old reports/briefs to dev/archive/{reports,briefs}/ (same names). Usage: archive_files.py reports|briefs [--dry]"""
import os, re, subprocess, sys, datetime as dt
kind = sys.argv[1]; dry = '--dry' in sys.argv
src = f'dev/handover/{kind}'; dst = f'dev/archive/{kind}'
now = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None); cutoff = now - dt.timedelta(hours=24)
KEEP_NAMES = {'README.md', 'STATUS.md'}
# live text that may point at a file: everything under dev/ except archive/, reports/, briefs/, OWNER_DECISIONS (read only) and binaries
corpus = ''
for root, ds, fs in os.walk('dev'):
    if root.startswith('dev/archive') or root.startswith('dev/handover/reports') or root.startswith('dev/handover/briefs'): continue
    for f in fs:
        if f.endswith(('.md', '.txt', '.sh', '.py', '.json')):
            try: corpus += open(os.path.join(root, f), encoding='utf-8', errors='ignore').read() + '\n'
            except OSError: pass
for f in ('README.md', 'index.html'):
    pass
def latest(txt):
    best = None
    for m in re.finditer(r'(?<![\d/])(1[5-9])/11(?![\d/])(?:[^\n]{0,12}?(\d\d):(\d\d)Z)?|\b(\d\d):(\d\d)Z[^\n]{0,6}?(1[5-9])/11', txt):
        g = m.groups()
        if g[0]: d, h, mi = int(g[0]), int(g[1] or 23), int(g[2] or 59)
        else: d, h, mi = int(g[5]), int(g[3]), int(g[4])
        t = dt.datetime(2026, 11, d, h, mi)
        if best is None or t > best: best = t
    return best
moved, kept = [], []
for f in sorted(os.listdir(src)):
    p = os.path.join(src, f)
    if not os.path.isfile(p) or f in KEEP_NAMES: continue
    txt = open(p, encoding='utf-8', errors='ignore').read() if f.endswith(('.md', '.txt')) else ''
    lt = latest(txt)
    ref = f in corpus
    if ref: kept.append((f, 'referenced by a live file')); continue
    if lt and lt >= cutoff: kept.append((f, f'latest date {lt:%d/%m %H:%M}Z within 24 h')); continue
    moved.append(f)
print(kind, 'total', len(os.listdir(src)), 'moved', len(moved), 'kept', len(kept))
if dry: sys.exit(0)
os.makedirs(dst, exist_ok=True)
for f in moved: subprocess.check_call(['git', 'mv', os.path.join(src, f), os.path.join(dst, f)])
open(f'/tmp/_kept_{kind}.txt', 'w').write('\n'.join(f'{a}\t{b}' for a, b in kept))
