"""sheets.py: before/after comparison sheets -> dev/shots/molefix/"""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mf
os.chdir(mf.ROOT)
W = 'dev/figwork/out/molefix/work/'; OUT = 'dev/figwork/out/molefix/img/'; SH = 'dev/shots/molefix/'
os.makedirs(SH, exist_ok=True)
maps = json.load(open(W + 'maps.json')); log = json.load(open(W + 'log.json'))
order = [l.split()[0] for l in open(W + 'list2.txt') if l.strip()]
order = [n for n in order if os.path.exists(OUT + f'por-{n}.webp')]
try: F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
except Exception: F = ImageFont.load_default()
BG = (236, 226, 206, 255)
BOX = (105, 135, 285, 315)   # por face area 180x180
Z = 1.6

def comp(p):
    im = Image.open(p).convert('RGBA'); b = Image.new('RGBA', im.size, BG); b.alpha_composite(im); return b.convert('RGB')

def cell(before, after, box, marks, label):
    c = int((box[2] - box[0]) * 0), None
    a = before.crop(box); b = after.crop(box)
    sz = int(180 * Z)
    a = a.resize((sz, sz), Image.LANCZOS); b = b.resize((sz, sz), Image.LANCZOS)
    t = Image.new('RGB', (2 * sz + 6, sz + 26), 'white'); t.paste(a, (0, 26)); t.paste(b, (sz + 6, 26))
    d = ImageDraw.Draw(t); d.text((4, 3), label, fill='black', font=F)
    k = sz / (box[2] - box[0])
    for (x, y) in marks:
        X, Y = (x - box[0]) * k, (y - box[1]) * k + 26
        d.ellipse((X - 16, Y - 16, X + 16, Y + 16), outline=(220, 40, 40), width=2)
    return t

def sheet(cells, path, cols=3):
    w, h = cells[0].size; rows = (len(cells) + cols - 1) // cols
    S = Image.new('RGB', (cols * w + (cols - 1) * 14, rows * h + (rows - 1) * 14), (90, 90, 90))
    for i, c in enumerate(cells): S.paste(c, ((i % cols) * (w + 14), (i // cols) * (h + 14)))
    S.save(path, quality=86)

pc, fc = [], []
for n in order:
    bp, ap = comp(f'img/por-{n}.webp'), comp(OUT + f'por-{n}.webp')
    marks = [(f[0], f[1]) for f in log.get(n, {}).get('por', [])]
    box = BOX
    if n == 'kid-p14-a4':
        box = (0, 0, 384, 506); marks = []
        ap = ap.resize((384, 506)); bp = bp
        a = bp.resize((180, 237)); b = ap.resize((180, 237))
        sz = int(180 * Z); t = Image.new('RGB', (2 * sz + 6, sz + 26), 'white')
        t.paste(a.resize((int(sz * 180 / 237), sz)), (40, 26)); t.paste(b.resize((int(sz * 180 / 237), sz)), (sz + 46, 26))
        ImageDraw.Draw(t).text((4, 3), 'kid-p14-a4 por: cắt lại (trước | sau)', fill='black', font=F); pc.append(t)
    else:
        pc.append(cell(bp, ap, box, marks, f'por-{n}'))
    if os.path.exists(OUT + f'fig-{n}.webp'):
        sc, s, ox, oy = maps.get(n, [0, 0, 0, 0]) if n != 'kid-p14-a4' else [0, 112 / 0.36 / 384, 150 - 112 / 0.36 / 2, 143 - 0.40 * 112 / 0.36 * 506 / 384]
        fb = (int(BOX[0] * s + ox), int(BOX[1] * s + oy), int(BOX[0] * s + ox) + int(180 * s), int(BOX[1] * s + oy) + int(180 * s))
        fm = [(f[0], f[1]) for f in log.get(n, {}).get('fig', [])]
        fc.append(cell(comp(f'img/fig-{n}.webp'), comp(OUT + f'fig-{n}.webp'), fb, fm, f'fig-{n}'))
for k in range(0, len(pc), 12): sheet(pc[k:k + 12], SH + f'por-{k // 12 + 1}.jpg')
for k in range(0, len(fc), 12): sheet(fc[k:k + 12], SH + f'fig-{k // 12 + 1}.jpg')
print(len(pc), len(fc))
