#!/usr/bin/env python3
"""LAW 11 scan (fix-kframe-heir, robot10 «Danh 101»): every direct write to a person's 0..100 stat (sung danh suc sac tai tamco duc)
that is NOT the clamp road (ap / apply / cl( / Math.min / Math.max on the right side). Effect dicts (fx / o / d / eff ...) are not persons.
usage: python3 dev/test/scan-stat-clamp.py [--all]   exit 1 when an unclamped person write is left (ALLOW lists reviewed safe sites)"""
import re, glob, os, sys
ROOT = os.path.join(os.path.dirname(__file__), '..', 'build')
ST = r'(?:sung|danh|suc|sac|tai|tamco|duc)'
PAT = re.compile(r'\b([A-Za-z_$][A-Za-z0-9_$]*)\.(' + ST[3:-1] + r')\s*(\+=|-=|\+\+|--|=(?![=>]))\s*([^;]{0,80})')
NOTPERSON = {'b','f','t','s','X','sv','HXNOW','st','fx','o','d','D','eff','e','E','B','BAL','c','C','base','out','r','res','fz','x0','delta','dd','bonus','need','req','cost','N','w','W','acc','sum','tot','g','gain','L','q','Q'}
ALLOW = [  # (file, text of the write, why it can never pass 100) — reviewed in fix-kframe-heir
    ('j42.js', 'S.sung=15+Math.round(S.nt/5)', 'maid rise: nt 0..100 -> 15..35'),
    ('jagmaid.js', 'S.sung=Math.max(+S.sung||0,+d.value||0)', 'max of two already-clamped values'),
    ('jagmaid.js', 'n.sung=D.b+Math.round(reg/D.d)', 'BAL.ag.maid.rise b 15 + sung/5 <= 35'),
    ('jkc.js', '40+R(50)', 'a new family member: 40..89'), ('jkc.js', '30+R(50)', 'new family member: 30..79'), ('jkc.js', '4+R(8)', 'new family member: 4..11'),
    ('jkc2.js', '40+R(50)', 'new family member: 40..89'), ('jkc2.js', '30+R(50)', 'new family member: 30..79'),
    ('jkc.js', 'S.sung=CY.sung[0]+rank*CY.sung[1]', 'BAL.kcg.carry.sung [8,5] x entry rank <= 53'),
    ('jkc2.js', 'S.sung=8+rank*5', 'entry rank <= 9 -> <= 53'),
]
def allowed(b, line): return any(b == f and t in line for f, t, _ in ALLOW)
SAFE = re.compile(r'^(cl\(|Math\.min\(|statSet\()')
# a write can pass the cap only when it ADDS: +=, ++, or = with a + on the right not wrapped by cl / Math.min
def raises(op, rhs):
    if op in ('+=', '++'): return True
    if op != '=': return False
    r = rhs.strip()
    return '+' in r and not SAFE.match(r)
DYN = re.compile(r'\b(S|p|q|v)\[k\]\s*=\s*\((S|p|q|v)\[k\]\|\|0\)\+')
CORE = {('j1.js', 'S[k]=(S[k]||0)+v;if(NAMES[k])'), ('j8.js', 'p[k]=(p[k]||0)+v}')}  # apply / ap: clamped right after
rows = []; bad = 0
for f in sorted(glob.glob(os.path.join(ROOT, 'j*.js'))):
    b = os.path.basename(f)
    if b.startswith('jbal') or b == 'jkitpage.js': continue
    for i, line in enumerate(open(f, encoding='utf8'), 1):
        for m in PAT.finditer(line):
            who, st, op, rhs = m.groups()
            if who in NOTPERSON: continue
            ok = not raises(op, rhs)
            key = f'{b}:{i}'
            if not ok and not allowed(b, line):
                bad += 1; rows.append((key, who, st, op, rhs.strip()[:50], line[max(0, m.start()-60):m.end()+30].replace('\n',' ')))
for f in sorted(glob.glob(os.path.join(ROOT, 'j*.js'))):
    b = os.path.basename(f)
    if b.startswith('jbal') or b == 'jkitpage.js': continue
    for i, line in enumerate(open(f, encoding='utf8'), 1):
        for m in DYN.finditer(line):
            if any(b == cf and t in line for cf, t in CORE): continue
            bad += 1; rows.append((f'{b}:{i}', m.group(1), '[k]', '=', 'dynamic', line[max(0, m.start()-60):m.end()+30].replace('\n',' ')))
for r in rows: print(' | '.join(r))
print(f'scan-stat-clamp: {bad} unclamped person stat writes')
sys.exit(1 if bad else 0)
