#!/usr/bin/env python3
"""mg-color family scan (LUẬT SỬA CẢ NHÓM) — python3 dev/test/mg-color-scan.py [--cdn]
Owner bug OD 25/11 ~23:05Z: 8 spools of «Thêu theo nét» all the painter's red. Root: a painted sprite drawn INSTEAD of a stand-in that carried the
choice's colour / the round's state. This scan lists every mini-game sprite call that has a stand-in, and FAILS when the stand-in carries a per-choice
colour or per-round state (a non-literal fill, crRGB(...), drawPaper(...), a col argument) while the call is a plain crArt / kg82Spr that would drop it
once the picture exists. Fixed calls use crArtTint (colour kept) or draw the state themselves with the picture as texture (crTex).
--cdn: also checks every picture a craft board treats as delivered (CR_HAVE) is really on the CDN.
"""
import re, sys, glob, os, urllib.request
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build')
STATE = re.compile(r'crRGB\(|fillStyle=(?!["\'`#])[A-Za-z_$][\w$.\[\]]*(?:\(|\b)|drawPaper\(|strokeStyle=col\b|fillStyle=col\b|`rgb\(\$\{')
rows, bad = [], 0
# reviewed by hand (review/mg-color): the stand-in has a colour, but the picture keeps the choice / state another way
REVIEWED = {
    ('j82.js', 'c===1?"co-black":"co-white"'): 'one picture per stone colour',
    ('j82.js', '"mua-mat"'): 'lit pad = picture + kit glow ring (BAL.mgFx)',
    ('j91.js', '"dauho-pot"'): 'decor gradient only (no choice)',
    ('j91.js', '"dauho-arrow"'): 'decor colour only (no choice)',
    ('j91.js', '"huong-"+e[2]'): 'one jar per scent; the slider track keeps the scent colour',
    ('jcraft_hoa.js', '"hoa-vase"'): 'decor gradient only (no choice)',
    ('jcraft_kim.js', '"kim-cut-"+s.sh'): 'one picture per cutter shape',
    ('jslap.js', 'n'): 'one picture per zone colour (tat-zone-red / amber, ne-zone-green)',
}
def closure(src, i):
    """text of the call starting at i (balanced parentheses)"""
    d = 0
    for j in range(i, min(len(src), i + 4000)):
        c = src[j]
        if c == '(':
            d += 1
        elif c == ')':
            d -= 1
            if d == 0:
                return src[i:j + 1]
    return src[i:i + 4000]
for f in sorted(glob.glob(os.path.join(ROOT, '*.js'))):
    src = open(f, encoding='utf-8').read()
    base = os.path.basename(f)
    if base == 'all.js':  # the assembled bundle (git-ignored), not a source
        continue
    for m in re.finditer(r'\b(crArtTint|crArt|kg82Spr)\(g,', src):
        fn = m.group(1)
        call = closure(src, m.start() + len(fn))
        name = re.match(r'\(g,([^,]+),', call).group(1)
        line = src.count('\n', 0, m.start()) + 1
        # the stand-in: the closure argument of crArt, or the code run when kg82Spr returns false ( if(!kg82Spr(...)){...} / if(kg82Spr(...))return; ... )
        stand = ''
        if fn in ('crArt', 'crArtTint'):
            k = call.find('=>')
            stand = call[k:] if k > 0 else ''
        else:
            pre = src[max(0, m.start() - 4):m.start()]
            tail = src[m.start() + len(fn) + len(call):m.start() + len(fn) + len(call) + 400]
            if pre.endswith('if(!'):
                stand = tail[:tail.find('}') + 1] if '}' in tail else tail
            elif re.match(r'\)\s*return', tail):
                stand = tail[:300]
        carries = bool(STATE.search(stand))
        if fn == 'kg82Spr' and not stand:
            verdict = 'picture only (no stand-in)'
        elif fn == 'crArtTint' and name != 'name':
            verdict = 'FIXED: crArtTint keeps the colour'
        elif not carries:
            verdict = 'ok: stand-in carries no per-choice colour'
        elif (base, name) in REVIEWED:
            verdict = 'ok (reviewed): ' + REVIEWED[(base, name)]
        elif fn == 'crArtTint':
            verdict = 'FIXED: crArtTint keeps the colour'
        else:
            verdict = 'FAIL: picture drops the per-choice colour / state of its stand-in'
            bad += 1
        rows.append((base, line, fn, name, verdict))
w = max(len(r[3]) for r in rows)
print('| file:line | call | picture | verdict |\n|---|---|---|---|')
for b, l, fn, n, v in rows:
    print(f'| {b}:{l} | {fn} | {n} | {v} |')
if '--cdn' in sys.argv:
    src = open(os.path.join(ROOT, 'jcraft.js'), encoding='utf-8').read()
    have = re.findall(r'"([a-z0-9-]+)"', re.search(r'CR_HAVE=new Set\(\[([^\]]*)\]', src).group(1))
    for n in have:
        u = f'https://ctm-img.victoria-tntt.workers.dev/img/kit/mg-{n}.webp'
        try:
            code = urllib.request.urlopen(urllib.request.Request(u, headers={'Range': 'bytes=0-15', 'User-Agent': 'ctm-scan'}), timeout=20).status
        except Exception as e:
            code = getattr(e, 'code', str(e))
        ok = code in (200, 206)
        bad += 0 if ok else 1
        print(f'CDN mg-{n}.webp: {code}{"" if ok else "  FAIL"}')
print(f'\n{len(rows)} sprite calls, {bad} FAIL')
sys.exit(1 if bad else 0)
