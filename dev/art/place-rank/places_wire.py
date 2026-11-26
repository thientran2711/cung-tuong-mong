# PLACES1 (L2355): URLS file lines "CODE KEY ID URL" -> png in TMP, webp q88 img/_review/place-rank/places/<key>-ha-sang.webp, measure floor
import sys, subprocess, os
from PIL import Image
urls, tmp = sys.argv[1:3]; outs = []
for l in open(urls):
    if not l.strip(): continue
    c, k, i, u = l.split()
    f = f'{tmp}/{c}.png'; subprocess.run(['curl', '-s', '-o', f, u], check=True)
    im = Image.open(f).convert('RGB'); assert im.size == (2688, 1386), im.size
    o = f'img/_review/place-rank/places/{k}-ha-sang.webp'; im.save(o, 'WEBP', quality=88); outs.append(o); print(c, i, k, 'OK')
subprocess.run(['python3', 'dev/art/place-rank/measure_floor.py', *outs])
