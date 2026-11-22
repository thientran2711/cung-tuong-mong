"""PEOPLE1 (owner 22/11, 0 cr): pr13 rooms with the in-game people, Fold + iPad side by side, 5 rooms per JPEG sheet.
Reuses dev/art/place-rank/stage_exact/exact.py (Fold, fold.json) and ipad_tags.py (iPad dư đồ 1162x599 + tags).
python3 make_sheet.py OUT.jpg WORKDIR FIGDIR CODE:KEY [CODE:KEY ...]   (rooms downloaded to WORKDIR/rooms/<key>.webp)"""
import sys, os, subprocess
from PIL import Image, ImageDraw, ImageFont
out, wd, figd = sys.argv[1:4]; items = [a.split(':') for a in sys.argv[4:]]
SE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'stage_exact')
CUNG = {'dien-huy': 'Diên Huy', 'vinh-hoa': 'Vĩnh Hòa', 'khai-tuong': 'Khải Tường', 'chung-tu': 'Chung Tú', 'ham-an': 'Hàm An',
        'thua-minh': 'Thừa Minh', 'truong-xuan': 'Trường Xuân'}
RANK = {'phi': 'Phi', 'quyphi': 'Quý phi', 'tan': 'Tần'}
def label(code, key):
    ngu = key.endswith('-ngu'); k = key[:-4] if ngu else key
    c, r = k.split('-cung-')
    return f"{code} · {CUNG[c]} Cung — {RANK[r]} — {'phòng ngủ' if ngu else 'chính điện'} · Fold | iPad"
F = '/usr/share/fonts/truetype/dejavu/'; fb = ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 24)
PWF, PWI, G = 700, 960, 12
rows = []
for code, key in items:
    room = f'{wd}/rooms/{key}.webp'
    a, b = f'{wd}/{key}-fold.jpg', f'{wd}/{key}-ipad.jpg'
    subprocess.run(['python3', f'{SE}/exact.py', room, f'{SE}/fold.json', a, '1', figd.rstrip('/') + '/'], check=True, stdout=subprocess.DEVNULL)
    subprocess.run(['python3', f'{SE}/ipad_tags.py', room, b, figd], check=True, stdout=subprocess.DEVNULL)
    fa = Image.open(a); fi = Image.open(b)
    fa = fa.resize((PWF, round(fa.height * PWF / fa.width)), Image.LANCZOS); fi = fi.resize((PWI, round(fi.height * PWI / fi.width)), Image.LANCZOS)
    rows.append((label(code, key), fa, fi))
W = G * 3 + PWF + PWI; H = sum(40 + max(r[1].height, r[2].height) + G for r in rows) + G
sh = Image.new('RGB', (W, H), (250, 244, 232)); d = ImageDraw.Draw(sh); y = G
for lab, fa, fi in rows:
    d.text((G, y + 4), lab, font=fb, fill=(90, 40, 20)); y += 40
    sh.paste(fa, (G, y)); sh.paste(fi, (G * 2 + PWF, y)); y += max(fa.height, fi.height) + G
for q in (86, 82, 78, 74, 70):
    sh.save(out, quality=q, optimize=True)
    if os.path.getsize(out) <= 2900 * 1024: break
print(out, sh.size, os.path.getsize(out) // 1024, 'KB q', q)
