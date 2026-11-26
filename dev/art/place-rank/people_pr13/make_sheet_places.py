"""PLACES1 (L2355) variant of make_sheet_l29.py: args CODE:KEY:FLOOR, caption = code · Vietnamese place name · floor %. Was: BEDRUN1 variant of make_sheet.py (adds bed % + floor % to the caption; args CODE:KEY:BED:FLOOR): pr13 rooms with the in-game people, Fold + iPad side by side, 5 rooms per JPEG sheet.
Reuses stage_exact/fold755.py (Fold PORTRAIT 755x1000, fold755.json, template = live screenshot WD/tpl.png) and ipad_tags.py (iPad dư đồ 1162x599 + tags).
python3 make_sheet.py OUT.jpg WORKDIR FIGDIR CODE:KEY [CODE:KEY ...]   (rooms downloaded to WORKDIR/rooms/<key>.webp)"""
import sys, os, subprocess
from PIL import Image, ImageDraw, ImageFont
out, wd, figd = sys.argv[1:4]; items = [a.split(':') for a in sys.argv[4:]]
SE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'stage_exact')
import json
NAMES = {k: v['name'] for k, v in json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'prompts_places_L2355.json'))).items()}
import re
def label(code, key): return f"{code} · {NAMES[re.sub(r'-(r\d+|calm|fresh)$', '', key)]}"  # PLACES3: -r2/-r3/-calm keys
def label(code, key): return f"{code} · {NAMES[key]}"
F = '/usr/share/fonts/truetype/dejavu/'; fb = ImageFont.truetype(F + 'DejaVuSans-Bold.ttf', 24)
PWF, PWI, G = 520, 1000, 12
rows = []
for code, key, flo in items:
    room = f'{wd}/rooms/{key}.webp'
    a, b = f'{wd}/{key}-fold.jpg', f'{wd}/{key}-ipad.jpg'
    subprocess.run(['python3', f'{SE}/fold755.py', room, f'{wd}/tpl.png', a, figd], check=True, stdout=subprocess.DEVNULL)  # owner L2318: true PORTRAIT 755x1000
    subprocess.run(['python3', f'{SE}/ipad_tags.py', room, b, figd], check=True, stdout=subprocess.DEVNULL)
    fa = Image.open(a); fi = Image.open(b)
    fa = fa.resize((PWF, round(fa.height * PWF / fa.width)), Image.LANCZOS); fi = fi.resize((PWI, round(fi.height * PWI / fi.width)), Image.LANCZOS)
    rows.append((label(code, key) + f'  |  sàn {flo} %', fa, fi))
W = G * 3 + PWF + PWI; H = sum(40 + max(r[1].height, r[2].height) + G for r in rows) + G
sh = Image.new('RGB', (W, H), (250, 244, 232)); d = ImageDraw.Draw(sh); y = G
for lab, fa, fi in rows:
    d.text((G, y + 4), lab, font=fb, fill=(90, 40, 20)); y += 40
    sh.paste(fa, (G, y)); sh.paste(fi, (G * 2 + PWF, y)); y += max(fa.height, fi.height) + G
for q in (86, 82, 78, 74, 70):
    sh.save(out, quality=q, optimize=True)
    if os.path.getsize(out) <= 3000 * 1024: break
print(out, sh.size, os.path.getsize(out) // 1024, 'KB q', q)
