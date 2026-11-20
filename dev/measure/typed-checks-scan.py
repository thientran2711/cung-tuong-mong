#!/usr/bin/env python3
"""typed-checks-scan (review/tut-followups, LUAT SUA CA NHOM): every place in dev/build/j*.js that types a check mark
(✓ ✗ ✔ ✘) into player-visible text. Each hit is classed:
  KIT      the kit part itself (kitChecks / kitMark / kitChip / kitReqRows / kitCoopSteps / kitMarkPaint) or its docs
  KITPATH  data handed to a kit part that strips/reads the mark (act-card «Cần» chips via data-kneed / .kwhy)
  COMMENT  comment text only
  OTHER    not a step/check list (a toggle chip, a status glyph, canvas text)
  KITREQ   a hand-made step list with a state kitChecks has not got (done / NOW / next): waits for a kit part (KIT REQUEST)
  HAND     a hand-typed ✓/✗ step/check LIST (must become kit §46 kitChecks) -> the scan fails while any is left
usage: python3 dev/measure/typed-checks-scan.py [repo root]"""
import re, sys, glob, os
root = sys.argv[1] if len(sys.argv) > 1 else '.'
MARK = re.compile('[✓✗✔✘]')
# file:needle -> class (needle = a substring of the line that identifies the place)
CLS = [
 ('jtabs.js', 'function kitChecks', 'KIT'), ('jtabs.js', '- kitChecks', 'COMMENT'), ('jtabs.js', 'KIT §51', 'COMMENT'),
 ('j79.js', '', 'KIT'),  # kitChip ok/no, kitReqRows, kitMark, kitMarkPaint (+ docs)
 ('jkitpage.js', '', 'KIT'), ('jcooptimer.js', '', 'KIT'),  # §69 coop kit parts (kitCoopSteps, timer chips)
 ('j63.js', '', 'KITPATH'), ('jfx.js', 'kfWhy', 'KITPATH'), ('jk3.js', 'kr-why', 'KITPATH'), ('j99succ.js', 'succNeed', 'KITPATH'),
 ('j76.js', '', 'COMMENT'), ('jgoal.js', 'kitGoalDetail', 'COMMENT'), ('jk95.js', '', 'COMMENT'), ('jmcal.js', '', 'COMMENT'),
 ('jtq14.js', '/*', 'COMMENT'), ('jtut.js', 'điều kiện: ✓ đã đủ', 'OTHER'),
 ('jload.js', 'glyph', 'OTHER'), ('jstatus.js', 'kdone', 'OTHER'), ('j91.js', 'measureText', 'OTHER'),
 ('j67.js', 'function steps67', 'KIT'), ('j67.js', 'the steps of a chapter = kit', 'COMMENT'), ('j72.js', 'q72Txt(s.n,X)', 'KITREQ'), ('jroute.js', 'ckL=', 'KIT'),
]
rows = []
for f in sorted(glob.glob(os.path.join(root, 'dev/build/j*.js'))):
    b = os.path.basename(f)
    for n, line in enumerate(open(f, encoding='utf-8'), 1):
        if not MARK.search(line):
            continue
        c = None
        for fb, nd, cl in CLS:
            if fb == b and nd in line:
                c = cl; break
        if c is None:
            c = 'HAND'
        m = MARK.search(line); a = max(0, m.start() - 70)
        rows.append((c, f'{b}:{n}', line[a:m.end() + 50].strip()))
for c, w, t in rows:
    print(f'| {c} | {w} | {t.replace("|", "/")[:150]} |')
hand = [r for r in rows if r[0] == 'HAND']
print(f'\n{len(rows)} lines with a typed mark; HAND (typed step/check lists) = {len(hand)}')
sys.exit(1 if hand else 0)
