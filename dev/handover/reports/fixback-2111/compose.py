#!/usr/bin/env python3
"""fixback-2111 PDF composer: cover (3 numbers + table of every mark) + one page per mark (LEFT = her marked shot, RIGHT = AFTER on Fold + iPad).
usage: python3 compose.py <marks.md> <refs dir> <shots root> <work dir> <main sha>
  <shots root>/main/shots.json (+ <shots root>/<review label>/shots.json for «bản đang duyệt») from dev/test/fixback-2111.js.
Writes <work dir>/fixback.html; render with render.js. Images are re-encoded small (JPEG) so the PDF stays < 25 MB."""
import sys, os, re, json, html
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from marks_vi import M
MD, REFS, SHOTS, WORK, SHA = sys.argv[1:6]
IMG = os.path.join(WORK, 'img'); os.makedirs(IMG, exist_ok=True)
# review branch label per shot folder (folder name -> branch shown to her)
REVIEW = {'chiton': 'review/chiton-name-rv2', 'empty': 'review/empty-states', 'chapter': 'review/chapter-card', 'calendar': 'review/calendar-rv'}

def small(src, maxd):
    out = os.path.join(IMG, re.sub(r'[^a-z0-9.-]', '_', src.lower())[-80:])
    if not os.path.exists(out):
        im = Image.open(src).convert('RGB'); im.thumbnail((maxd, maxd)); im.save(out, 'JPEG', quality=68, optimize=True)
    return out

# refs per mark from the marks file (every row; names may be abbreviated "a-1/2.jpg", "x.jpg + y.jpg")
refs = {}
for line in open(MD, encoding='utf-8'):
    m = re.match(r'\|\s*(\d+)\s*\|', line)
    if not m: continue
    n = int(m.group(1)); names = []
    for r in re.findall(r'owner-2111-[a-z0-9/-]+\.jpg|(?<=\+ )[a-z-]+\.jpg', line):
        mm = re.match(r'(.*)-([a-z0-9]+)/([a-z0-9]+)\.jpg', r)
        if mm: names += [f'{mm[1]}-{mm[2]}.jpg', f'{mm[1]}-{mm[3]}.jpg']
        else: names.append(r if r.startswith('owner-') else 'owner-2111-' + r)
    names = [x for x in names if os.path.exists(os.path.join(REFS, x))]
    if names: refs[n] = list(dict.fromkeys(names))

def load(label):
    p = os.path.join(SHOTS, label, 'shots.json')
    return json.load(open(p)) if os.path.exists(p) else {}
main = load('main'); rv = {k: load(k) for k in REVIEW}
SKIP_RV = {40}  # review shot does not show the marked screen (maid person dialog)

E = html.escape
ST = {'LIVE': ('LIVE', '#2e7d32'), 'DUYET': ('ĐANG DUYỆT', '#b8860b'), 'SUA': ('ĐANG SỬA', '#b23a2a'), 'KHAC': ('KHÔNG CẦN SỬA · CHỜ SẾP', '#666')}
css = """@page{size:1800px 900px;margin:0}body{margin:0;font-family:'Noto Sans','DejaVu Sans',sans-serif;color:#2b1d14}
.pg{width:1800px;height:900px;box-sizing:border-box;padding:22px 28px;page-break-after:always;display:flex;flex-direction:column;background:#fbf6ee}
h1{font-size:30px;margin:0 0 6px}h2{font-size:24px;margin:0 0 8px}.badge{display:inline-block;color:#fff;border-radius:6px;padding:3px 10px;font-size:16px;margin-left:10px;vertical-align:middle}
.row{flex:1;display:flex;gap:18px;min-height:0}.col{display:flex;flex-direction:column;min-height:0}.lab{font-size:15px;font-weight:bold;margin:0 0 4px;color:#6b4a2f}
.box{flex:1;min-height:0;display:flex;gap:10px;align-items:flex-start;justify-content:center}.box img{max-width:100%;max-height:100%;object-fit:contain;border:1px solid #d8c8b0;background:#fff}
.left{width:400px}.right{flex:1}.foot{font-size:20px;margin-top:10px;padding:8px 12px;border-radius:8px;background:#fff;border:1px solid #e4d6c2}
.dev{display:flex;flex-direction:column;min-height:0;height:100%;align-items:center}.dev small{font-size:12px;color:#7a6650}
.big{flex:1;display:flex;align-items:center;justify-content:center;font-size:28px;text-align:center;padding:40px;border:2px dashed #d0b89a;border-radius:16px;background:#fff;color:#7a3a2a}
table{border-collapse:collapse;font-size:12.5px;width:100%}td{border-bottom:1px solid #e8dccb;padding:2px 5px;vertical-align:top}td.n{width:28px;font-weight:bold}td.s{width:96px;font-weight:bold;white-space:nowrap}
.nums{display:flex;gap:24px;margin:8px 0 14px}.num{flex:1;border-radius:14px;color:#fff;padding:14px 20px;font-size:22px}.num b{font-size:52px;display:block}"""
pages = []
cnt = {k: sum(1 for v in M.values() if v[1] == k) for k in ST}
def table(items):
    return '<table>' + ''.join(f'<tr><td class=n>#{n}</td><td>{E(M[n][0])}</td><td class=s style="color:{ST[M[n][1]][1]}">{ST[M[n][1]][0]}</td></tr>' for n in items) + '</table>'
keys = sorted(M)
half = (len(keys) + 1) // 2
cover = f"""<div class=pg><h1>Sửa theo dấu sếp khoanh 21/11 — TRƯỚC / SAU</h1>
<div style="font-size:16px">Trước = hình sếp gửi · Sau = cùng màn trên bản LIVE (main {SHA}) chụp Fold 755×1000 + iPad 1180×820; dấu chưa LIVE ghi thợ + trạng thái (có hình «bản đang duyệt» nếu đã có nhánh duyệt).</div>
<div class=nums><div class=num style="background:#2e7d32"><b>{cnt['LIVE']}</b>LIVE</div><div class=num style="background:#b8860b"><b>{cnt['DUYET']}</b>đang duyệt</div><div class=num style="background:#b23a2a"><b>{cnt['SUA']}</b>đang sửa</div><div class=num style="background:#777"><b>{cnt['KHAC']}</b>không cần sửa · chờ sếp</div></div>
<div class=row style="font-size:12px"><div class=col style="flex:1">{table(keys[:15])}</div><div class=col style="flex:1">{table(keys[15:30])}</div><div class=col style="flex:1">{table(keys[30:45])}</div></div></div>"""
pages.append(cover)
pages.append(f'<div class=pg><h2>Bảng dấu (tiếp)</h2><div class=row style="font-size:12px"><div class=col style="flex:1">{table(keys[45:59])}</div><div class=col style="flex:1">{table(keys[59:72])}</div><div class=col style="flex:1">{table(keys[72:])}</div></div></div>')

def devbox(files, label):
    out = []
    for dev, w in (('fold', 'Fold 755×1000'), ('ipad', 'iPad 1180×820')):
        f = files.get(dev)
        if f: out.append(f'<div class=dev style="flex:{0.75 if dev=="fold" else 1.44}"><small>{w}</small><img src="{small(f, 1000)}"></div>')
    return out

for n in keys:
    vi, st, who, note = M[n]
    title = f'<h2>#{n} · {E(vi)}<span class=badge style="background:{ST[st][1]}">{ST[st][0]}</span></h2>'
    rf = refs.get(n, [])
    left = '<div class="col left"><div class=lab>TRƯỚC — hình sếp gửi</div><div class=box style="flex-direction:column;align-items:center">' + (''.join(f'<img src="{small(os.path.join(REFS, r), 1100)}" style="max-height:{100 // max(1, len(rf))}%">' for r in rf) if rf else '<div class=big style="font-size:18px">(sếp không gửi hình)</div>') + '</div></div>'
    shots = []
    if st in ('LIVE', 'KHAC') and str(n) in main:
        S = main[str(n)]; k = max(len(S.get('fold', [])), len(S.get('ipad', [])))
        for i in range(k):
            shots.append((f'SAU — bản LIVE (main {SHA})', {d: S[d][i] for d in S if i < len(S[d])}))
        foot = f'<b>Đã sửa:</b> {E(note)}' if st == 'LIVE' else f'<b>{E(note)}</b>'
    else:
        for lab, br in REVIEW.items():
            if str(n) in rv[lab] and br in note and n not in SKIP_RV:
                S = rv[lab][str(n)]; k = max(len(S.get('fold', [])), len(S.get('ipad', [])))
                for i in range(k): shots.append((f'SAU — bản đang duyệt ({br})', {d: S[d][i] for d in S if i < len(S[d])}))
        if st == 'LIVE': foot = f'<b>Đã sửa:</b> {E(note)}'
        elif st == 'KHAC': foot = f'<b>{E(note)}</b>'
        else: foot = f'<b>Đang sửa</b> · {E(who)} · {"đang duyệt" if st=="DUYET" else "đang làm"}' + (f' · {E(note)}' if note else '')
    if not shots:
        msg = foot if st != 'LIVE' else foot + '<br>(chưa chụp được màn này)'
        pages.append(f'<div class=pg>{title}<div class=row>{left}<div class="col right"><div class=lab>SAU</div><div class=big>{msg}</div></div></div></div>')
        continue
    for i, (lab, files) in enumerate(shots):
        t = title if i == 0 else title.replace('</h2>', f' <small>(tiếp {i+1})</small></h2>', 1)
        pages.append(f'<div class=pg>{t}<div class=row>{left}<div class="col right"><div class=lab>{E(lab)}</div><div class=box>{"".join(devbox(files, lab))}</div></div></div><div class=foot>{foot}</div></div>')

open(os.path.join(WORK, 'fixback.html'), 'w', encoding='utf-8').write(f'<!doctype html><html lang=vi><meta charset=utf-8><style>{css}</style><body>{"".join(pages)}</body></html>')
print('pages', len(pages))
