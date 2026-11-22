#!/usr/bin/env python3
"""review/coop-guest-week-lag — LUẬT SỬA CẢ NHÓM scan: every path that sends the THIN GUEST's own changes (her person: bạc, items, month
card answers, wages, stats) from her phone to the host, and whether a merged week can make it count twice / late on the host.
A delta (numbers as +n) is safe only if its baseline is what the host holds NOW; the bug was one baseline (E.base) that could still be the
host's view of the OLD week right after the merge. usage: python3 dev/test/coop-week-lag-scan.py   (exit 1 = an unguarded / unknown sender)"""
import re, glob, sys, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
BD = sys.argv[1] if len(sys.argv) > 1 else 'dev/build'   # another build dir (e.g. main's, for the before column)
src = {'dev/build/' + os.path.basename(f): open(f, encoding='utf-8').read() for f in sorted(glob.glob(BD + '/j*.js'))}
def lines(pat):
    for f, t in src.items():
        for i, l in enumerate(t.split('\n'), 1):
            for m in re.finditer(pat, l): yield f, i, l, m
# known guest→host senders: key -> (carries her person/economy?, form, baseline, week-boundary verdict)
KNOWN = {
 'do:erd':   ('yes', 'delta ops (pDiff)', 'E.base(view)', 'GUARDED: an older week\'s view is never the baseline (merged person instead)'),
 'do:f':     ('yes', 'intent + last pack of delta ops', 'E.base(view)', 'GUARDED (same E.base)'),
 'do:ready': ('no',  'buổi step request {w,b}', '-', 'safe: carries the week, host steps only its own week'),
 'do:pick':  ('yes (card answer)', 'card id + option index', '-', 'safe: the answer RUNS on the host store (her context), result comes back as a patch'),
 'do:pack':  ('no',  'patch ack n', '-', 'safe'),
 'do:life':  ('yes', 'life intent (roll/accept)', '-', 'safe: host builds the person (part B)'),
 'do:npc':   ('no (world rows)', 'before/after frames of her own write', 'frame of that write', 'safe: no view baseline'),
 'do:cyb':   ('yes (cycle flags)', 'absolute flags', '-', 'safe: absolute values'),
 'end':      ('yes', 'whole C (her phone\'s person)', 'room base of the week (server merge3)', 'safe: server merges against the week\'s own base; host P.b = base + stand-in deltas'),
 'me':       ('yes', 'whole person blob', '-', 'safe: absolute'),
 'init':     ('yes', 'whole C (room start)', '-', 'safe: absolute'),
 'res':      ('no (HIS person)', 'act effect deltas on the other seat', 'her act', 'out of scope: writes the OTHER player (D.resTo at level ≥ D)'),
 'act':      ('no', 'relays (room clock, p2 night / cycle, live mini game, fam/pets status, invite, night claim, kc, ask)', '-', 'safe: no economy numbers'),
 'actr':     ('no', 'invite answer', '-', 'safe'),
 'where':'-','pos':'-','bend':'-','chat':'-','thin':'-','snap':'-','delta':'-','snapreq':'-','do':'-',
}
rows, bad = [], []
for f, i, l, m in lines(r'TH\.doSend\("([a-z0-9]+)"'):
    rows.append((f'{f}:{i}', 'do:' + m.group(1)))
for f, i, l, m in lines(r'COOP\.send\(\{t:"do",op:"([a-z0-9]+)"'):
    rows.append((f'{f}:{i}', 'do:' + m.group(1)))
for f, i, l, m in lines(r'COOP\.send\(\{t:"([a-z]+)"'):
    if m.group(1) != 'do': rows.append((f'{f}:{i}', m.group(1)))
for f, i, l, m in lines(r'Object\.assign\(\{t:"([a-z]+)"'):
    rows.append((f'{f}:{i}', m.group(1)))
# every person diff computed on the guest must start from the guarded baseline
diffs = []
for f, i, l, m in lines(r'TH\.pDiff\(([^,]+),'):
    diffs.append((f'{f}:{i}', m.group(1).strip()))
eb = src.get('dev/build/jcoopthine.js', '')
# the guard (review coop-thin-g r1 e7b996f2, ported to LIVE by coop-guest-week-lag): (1) E.base never takes a view of an older week, (2) on a
# merged week her baseline = her S right after fromCanon (= the merged person the host rebuilds his copy from)
g1 = bool(re.search(r'E\.base=function\(V\)\{[^\n]*\n[^\n]*o\.w===\(COOP\.state\.week\|\|0\)', eb))
g2 = bool(re.search(r'COOP\.on\("week",\(\)=>\{E\.bs=null;[\s\S]{0,900}?E\.bs=curP\(\);E\.pn=\(S\.thpn\|0\)', eb))
guard = g1 and g2
print('| site | sender | her person / economy? | form | baseline | week boundary |')
print('|---|---|---|---|---|---|')
seen = set()
for site, k in rows:
    if (site, k) in seen: continue
    seen.add((site, k)); v = KNOWN.get(k)
    if v is None: bad.append(f'UNCLASSIFIED sender {k} at {site}'); print(f'| {site} | {k} | ? | ? | ? | **UNCLASSIFIED** |'); continue
    if v == '-': continue
    verdict = v[3] if (k not in ('do:erd', 'do:f') or guard) else 'UNGUARDED: the old week\'s view can be the baseline (counts her week end twice)'
    if verdict.startswith('UNGUARDED'): bad.append(f'{k} at {site}')
    print(f'| {site} | {k} | {v[0]} | {v[1]} | {v[2]} | {verdict} |')
print()
print('Guest person diffs (TH.pDiff): every one must start from E.base(V)')
for site, a in diffs:
    okd = a.startswith('E.base(')
    if not okd: bad.append(f'pDiff at {site} starts from {a}, not E.base')
    print(f'  {"ok  " if okd else "FAIL"} {site}  pDiff({a}, …)')
print(f'E.base stale-week guard: older view never a baseline {"present" if g1 else "MISSING"} · week baseline = her merged S {"present" if g2 else "MISSING"}')
if not guard: bad.append('E.base has no stale-week guard')
print('WEEK-LAG-SCAN ' + ('FAIL ' + '; '.join(bad) if bad else 'PASS'))
sys.exit(1 if bad else 0)
