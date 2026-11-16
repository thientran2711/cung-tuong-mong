#!/usr/bin/env python3
"""rank-colour-sites.py — LUẬT SỬA CẢ NHÓM source scan (review/rank-colour, owner 15/11 s8 "Phẩm bậc … chưa theo màu phẩm").
Lists every source site in dev/build/j*.js that writes a person's rank / role title next to that person's name, and how it is drawn:
  KIT      kitName / kitNameRank / kitPersonLine / .pcrk / .j59t (title already in its rank tone)
  TEXT     plain words "title name" (template / concatenation / helper) — coloured on screen by KIT 48.3 kitRankPaint (j79), which paints
           every visible "title name" pair of a known person (one MutationObserver pass)
  SPLIT    title and name in two different elements that are NOT a kit title (would be missed by the painter) — must be 0
usage: python3 dev/test/rank-colour-sites.py [repo root] [--md out.md]"""
import re, sys, glob, os, collections
root = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else os.path.join(os.path.dirname(__file__), '..', '..')
md = sys.argv[sys.argv.index('--md') + 1] if '--md' in sys.argv else None
files = sorted(f for f in glob.glob(os.path.join(root, 'dev/build/j*.js')))
TITLE_EXPR = r'(?:RANKS\[[^\]]{1,60}\]\.n|kitTitle\([^)]*\)|"(?:Hoàng hậu|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Cung nữ(?: thân tín)?|Thái y|Ma ma)"|rkName\([^)]*\)|rankN\([^)]*\)|\w+\.rk|\w+\.title)'
# a title expression followed (within 60 chars, same statement) by a .name / NM( / name variable
PAT = re.compile(TITLE_EXPR + r'[^;\n]{0,60}?(?:\.name\b|\bNM\(|\$\{n\}|\bnm\b)')
# literal title words directly before a ${…name} in a template
LIT = re.compile(r'(?<![\wÀ-ỹ])(Hoàng hậu|Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|[Cc]ung nữ(?: thân tín)?|[Tt]hái giám|Thái y|Ma ma|[Tt]ổng quản|Hoàng tử|Công chúa) \$\{[^}]{0,40}\.name\}')
SPLIT = re.compile(r'<(small|span|i|em)[^>]*>\$\{[^}]*(?:RANKS\[[^\]]+\]\.n|kitTitle\()[^}]*\}</\1>\s*<(?:b|strong|span)[^>]*>\$\{[^}]*\.name')
KIT = re.compile(r'kitName\(|kitNameRank\(|kitPersonLine\(|class="pcrk|j59t')
rows = []
for f in files:
    for i, line in enumerate(open(f, encoding='utf-8'), 1):
        hits = [m.group(0) for m in PAT.finditer(line)] + [m.group(0) for m in LIT.finditer(line)]
        sp = [m.group(0) for m in SPLIT.finditer(line)]
        kit = len(KIT.findall(line))
        if not hits and not sp and not kit:
            continue
        kind = 'SPLIT' if sp else ('TEXT' if hits else 'KIT')
        snip = (sp or hits or [KIT.search(line).group(0)])[0][:90]
        rows.append((os.path.relpath(f, root), i, kind, len(hits) + len(sp) + kit, snip))
c = collections.Counter(r[2] for r in rows)
byf = collections.defaultdict(collections.Counter)
for r in rows:
    byf[r[0]][r[2]] += 1
out = ['# rank-colour source sites (dev/test/rank-colour-sites.py)', '',
       f'Lines: {len(rows)} · KIT {c["KIT"]} · TEXT {c["TEXT"]} (painted by kitRankPaint) · SPLIT {c["SPLIT"]}', '',
       '| file | KIT | TEXT | SPLIT |', '|---|---|---|---|']
for f in sorted(byf):
    out.append(f'| {f} | {byf[f]["KIT"]} | {byf[f]["TEXT"]} | {byf[f]["SPLIT"]} |')
out += ['', '| file:line | kind | sample |', '|---|---|---|']
for r in rows:
    if r[2] != 'KIT':
        out.append(f'| {r[0]}:{r[1]} | {r[2]} | `{r[4].replace("|", "\\|")}` |')
txt = '\n'.join(out) + '\n'
if md:
    open(md, 'w', encoding='utf-8').write(txt)
print('\n'.join(out[:6 + len(byf) + 2]))
sys.exit(1 if c['SPLIT'] else 0)
