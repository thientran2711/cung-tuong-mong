import os, sys, subprocess
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__))
NAME = sys.argv[1]  # e.g. day-nha-cung-nhan
OUT = sys.argv[2]   # repo img dir
raw = os.path.join(D, 'raw'); os.makedirs(raw, exist_ok=True)
items = [('xuan-sang', None)]
for ln in open(os.path.join(D, 'urls.txt')):
    k, u = ln.split(None, 1); items.append((k, u.strip()))
def fit(im):
    im = im.convert('RGB'); w, h = im.size; s = 720 / h; nw = round(w * s)
    im = im.resize((nw, 720), Image.LANCZOS); x = (nw - 1280) // 2
    return im.crop((x, 0, x + 1280, 720))
for k, u in items:
    p = os.path.join(raw, k + '.png')
    if k == 'xuan-sang':
        if not os.path.exists(p): Image.open(os.path.join(D, 'b1.png')).save(p)
    elif not os.path.exists(p):
        subprocess.run(['curl', '-sS', '-o', p, u], check=True)
    im = fit(Image.open(p))
    o = os.path.join(OUT, f'{NAME}-{k}.webp'); im.save(o, 'WEBP', quality=80, method=6)
    if k == 'xuan-sang': fit(Image.open(p)).save(os.path.join(OUT, f'{NAME}.webp'), 'WEBP', quality=80, method=6)
    print(k, Image.open(p).size, os.path.getsize(o) // 1024, 'KB')
# contact sheet: rows sang/trua/chieu/toi, cols seasons
S = ['xuan', 'ha', 'thu', 'dong']; B = ['sang', 'trua', 'chieu', 'toi']
sh = Image.new('RGB', (4 * 480, 4 * 270))
for i, s in enumerate(S):
    for j, b in enumerate(B):
        sh.paste(Image.open(os.path.join(OUT, f'{NAME}-{s}-{b}.webp')).resize((480, 270)), (i * 480, j * 270))
sh.save(os.path.join(D, f'sheet-{NAME}.jpg'), quality=85)
