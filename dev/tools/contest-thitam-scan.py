#!/usr/bin/env python3
"""contest-thitam-scan (FOREMAN D job D3, LAW 11 whole family): list EVERY contest kind in dev/build/j*.js and whether its FIRST PLACE
also gets thị tẩm that night (a ctnWin( call in its finish). Usage: python3 dev/tools/contest-thitam-scan.py [repo_root]  (exit 1 = a kind
that should be wired is not). Run it on LIVE (origin/main checkout) for the BEFORE column and on the branch for the AFTER column.

How a contest is found (every marker, so a new contest kind shows up here even if nobody lists it):
  M1 bestow(<w>,"contest")   — every contest winner's Emperor gift (j8 / j71 / jcui / jts …)
  M2 the contest finish functions by name: cRun7 cFin7 fxFin7 festival contestEnd tsDressHold selxContest
  M3 story contests: an ending text «đứng đầu» inside a «Kỳ thi / Hội thi / khảo» node (j67 ARC67, jgedata)
  M4 children's contests (j53 khảo thí hoàng tử, j54 công chúa dâng nghệ): the CHILD places, not a consort (no night: listed, not wired)
Each site is classified (KIND table below); a site the table does not know is printed as UNKNOWN (exit 1) so nobody misses one."""
import re, sys, os
root = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
B = os.path.join(root, 'dev', 'build')
# (file, regex of the site line, kind name, wired? expected, why)
KIND = [
 ('j71.js', r'function cRun7', 'Hội thi ngày lễ (j71 festival contest, played by formula; she entered or not)', True, ''),
 ('j71.js', r'function cFin7', 'Hội thi ngày lễ after her mini-game (j71 cFin7)', True, ''),
 ('j71.js', r'function fxFin7', 'Yến tiệc đầu xuân / Thi tài Thất tịch after her mini-game (j71 fxFin7)', True, ''),
 ('j71.js', r'const L=capRank7\(cScore7\(E,p=>p===S\?me\.a:fxBest7', 'Yến tiệc đầu xuân / Thi tài Thất tịch, no mini-game (j71 festival wrapper)', True, ''),
 ('j8.js', r'^function festival\(', 'base feast (j8 festival, when j71 is off)', True, ''),
 ('j34.js', r'^function contestEnd', 'Tranh ghế (j34 seat contest, 3 rounds)', True, ''),
 ('jts.js', r'if\(x\.place===1\)', 'Hội phối đồ (jts dress contest)', True, ''),
 ('j67.js', r'tag:"Tài nữ số một"', 'Kỳ thi Tài nữ (j67 ARC67 thd_tho story contest, her first place)', True, ''),
 ('jcui.js', r'bestow\(p,"contest"\)', 'contest prize table (jcui cuAward: the prize by place of the SAME contests above)', False, 'not a contest of its own: pays the places of the j71 contests, whose finish is wired'),
 ('jselx.js', r'^function selxContest', 'Tuyển tú contest (jselx / jselxday: 12 tú nữ, top 4 kept)', False, 'before sắc phong: a tú nữ has no thẻ bài, nights are the yard dormitory (jselxday selxNight); she can be thị tẩm only once she is a consort'),
 ('j67.js', r'tag:"Học trò giỏi của Lưu ma ma"', 'Ngày khảo việc (j67 cung nữ exam, servant road)', False, 'servant road: a cung nữ is never thị tẩm (ctnWin refuses isSrv())'),
 ('j53.js', r'function ktGain', 'khảo thí hoàng tử (j53: her CHILD places)', False, 'the child places, not a consort'),
 ('j54.js', r'function h54GainTxt', 'công chúa dâng nghệ (j54: her DAUGHTER places)', False, 'the child places, not a consort'),
 ('j67.js', r'Con ngươi đứng đầu kỳ khảo', 'con đứng đầu kỳ khảo (j67 story: her child)', False, 'the child places, not a consort'),
]
def read(f):
    p = os.path.join(B, f)
    return open(p, encoding='utf-8').read().split('\n') if os.path.exists(p) else []
rows, bad, seen = [], 0, set()
for f, rx, name, want, why in KIND:
    L = read(f); hit = [i for i, l in enumerate(L) if re.search(rx, l)]
    if not hit:
        rows.append((name, f, '-', 'MISSING', want, why)); bad += want; continue
    i = hit[0]; seen.add((f, i))
    # the site's own block: from the hit to the next top-level function / 14 lines, whichever first
    j = i + 1
    while j < len(L) and j < i + 14 and not re.match(r'^(function |const [A-Z0-9_]+=|\(function|/\* -{3,})', L[j]): j += 1
    blk = '\n'.join(L[i:j]); w = 'ctnWin(' in blk
    rows.append((name, f, i + 1, 'yes' if w else 'no', want, why))
    if want and not w: bad += 1
# M1 / M3 sites the table does not know
unk = []
for f in sorted(x for x in os.listdir(B) if re.match(r'^j[a-z0-9_]*\.js$', x)):
    L = read(f)
    for i, l in enumerate(L):
        m1 = re.search(r'bestow\(\s*[\w.]+\s*,\s*"contest"\s*\)', l)
        m3 = re.search(r'(Kỳ thi|Hội thi|kỳ khảo|khảo việc)', l) and re.search(r'đứng đầu', l) and re.search(r'(rt|t):"', l)
        if not (m1 or m3): continue
        near = any(ff == f and abs(ii - i) <= 14 for ff, ii in seen) or any(ff == f and re.search(rx, '\n'.join(L[max(0, i - 14):i + 14])) for ff, rx, *_ in KIND)
        if not near: unk.append((f, i + 1, l.strip()[:120]))
print('| contest kind | file:line | first place ⇒ thị tẩm (ctnWin) | should | why not |')
print('|---|---|---|---|---|')
for name, f, ln, w, want, why in rows:
    print(f'| {name} | {f}:{ln} | {w} | {"yes" if want else "no"} | {why} |')
for f, ln, t in unk: print(f'| UNKNOWN contest site | {f}:{ln} | ? | ? | {t} |')
n_w = sum(1 for r in rows if r[3] == 'yes'); n_should = sum(1 for r in rows if r[4])
print(f'\nSUMMARY: kinds {len(rows)} · should be wired {n_should} · wired {n_w} · missing {bad} · unknown sites {len(unk)}')
sys.exit(1 if bad or unk else 0)
