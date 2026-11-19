#!/usr/bin/env python3
"""stage-here r4 — ONE NOTICE SYSTEM scan (law 11 FIX THE WHOLE GROUP). Static scan of dev/build/j*.js at a git ref (default: work tree):
every call site of an old floating notice / toast and whether it reaches the ONE entry point kitNotice (jnotice.js).
usage: python3 dev/test/notice-scan.py [git-ref]   → table (markdown) + exit 1 when a notice path is not routed in the work tree.
Routing is read from jnotice.js itself (kitLine / kitLineToast / kitFlipNote / srvToast re-pointed to kitNotice, tinBaoOn subscribed)."""
import re, subprocess, sys, os
R = os.path.dirname(os.path.abspath(__file__)) + '/../..'
ref = sys.argv[1] if len(sys.argv) > 1 else None
def files():
    if ref:
        out = subprocess.run(['git', '-C', R, 'ls-tree', '--name-only', ref, 'dev/build/'], capture_output=True, text=True).stdout.split()
        return {f: subprocess.run(['git', '-C', R, 'show', f'{ref}:{f}'], capture_output=True, text=True).stdout for f in out if re.search(r'/j[^/]*\.js$', f) and not f.endswith('all.js')}
    d = R + '/dev/build/'
    return {'dev/build/' + f: open(d + f, encoding='utf-8').read() for f in sorted(os.listdir(d)) if f.startswith('j') and f.endswith('.js') and f != 'all.js'}
F = files()
jn = F.get('dev/build/jnotice.js', '')
routed = {
    'kitLine': 'kitLine=function' in jn, 'kitLineToast': 'window.kitLineToast=function' in jn, 'kitFlipNote': 'kitFlipNote=window.kitFlipNote' in jn,
    'srvToast': 'srvToast=window.srvToast' in jn, 'tinBao': 'tinBaoOn(it=>' in jn,
}
# (group, regex of a call site, exempt reason or None)
G = [
    ('kitLine (bottom pill #kupdline) callers', r'\bkitLine\(', None, 'kitLine'),
    ('kitLineToast (#ktbtoast) callers', r'\bkitLineToast\(', None, 'kitLineToast'),
    ('closing alert (stage rail «!» item)', r'kitStageRail\.add\(\{id:"closing"', None, None),
    ('tin báo collapse rail item «tnote»', r'kitStageRail\.add\(\{id:"tnote"', None, None),
    ('flip note (.kmnote floating line)', r'\bkitFlipNote\(', None, 'kitFlipNote'),
    ('«CẤM» place line (srvToast → #rtoast)', r'\bsrvToast\(', None, 'srvToast'),
    ('Tai mắt news (tinBaoOn) — UI subscriber', r'\btinBaoOn\(', None, 'tinBao'),
    ('closing notice via kitNotice', r'kitNotice\(\{id:"close:', None, None),
    ('act result card #rtoast (THÀNH/BẠI)', r'\$\("rtoast"\);if\(!t\)\{t=document\.createElement', 'EXEMPT: act result card, owner ruling jksize 17:25Z "routine actions keep the small result toast"', None),
    ('tutorial tip kitTip', r'function kitTip\(', 'EXEMPT: tutorial coach (KIT §50.2), not a notice', None),
    ('co-op clock #kctmf', r'FE\.id="kctmf"', 'EXEMPT: co-op status clock (16/11 ruling)', None),
]
rows = []; bad = 0
for g, rx, ex, key in G:
    hits = []
    for f, s in F.items():
        if f.endswith('jnotice.js') and key: continue  # the router itself
        for m in re.finditer(rx, s):
            ln = s.count('\n', 0, m.start()) + 1
            line = s.splitlines()[ln - 1].strip()
            if s.rfind('/*', 0, m.start()) > s.rfind('*/', 0, m.start()): continue  # inside a block comment
            if re.match(r'^(/\*|\*|//)', line) or re.search(r'function\s+' + (key or 'zz') + r'\(', line): continue
            hits.append(f'{f.split("/")[-1]}:{ln}')
    if ex: st = ex
    elif key: st = ('ROUTED → kitNotice' if routed[key] else ('NOT ROUTED (floating toast)' if hits else '—'))
    elif 'kitNotice' in rx: st = 'ROUTED (kitNotice)' if hits else '—'
    else: st = 'GONE' if not hits else 'FLOATING / RAIL (old)'
    if not ref and ('NOT ROUTED' in st or 'old' in st): bad += 1
    rows.append((g, len(hits), st, ', '.join(hits[:8]) + (' …' if len(hits) > 8 else '')))
print(f'| group ({ref or "work tree"}) | sites | state | where |\n|---|---|---|---|')
for r in rows: print('| %s | %d | %s | %s |' % r)
sys.exit(1 if bad else 0)
