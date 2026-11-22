"""PLACES4 (L2387): Khôn Ninh no-curtain picture (L2389 open windows) M2370-46 is outside swap_L2370 (old live key, 1280x720 like its 15 variants).
  python3 swap_L2387_khon.py        DRY RUN: decap + resize -> img/_review/place-rank/places-l2370/swap/khon-ninh-cung.webp
  python3 swap_L2387_khon.py --go   ALSO copy to img/khon-ninh-cung.webp + img/khon-ninh-cung-ha-sang.webp and cdn_sync (ONLY on the owner's OK)
The other 14 season x buổi variants stay old (group-2 variant job)."""
import os, sys, subprocess, shutil
from PIL import Image
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..')); os.chdir(ROOT)
R = 'img/_review/place-rank/places-l2370'; ST = R + '/swap'; os.makedirs(ST, exist_ok=True)
src = f'{R}/khon-ninh-cung-r2-ha-sang.webp'; tmp = f'{ST}/khon-ninh-cung-decap.webp'; out = f'{ST}/khon-ninh-cung.webp'
im = Image.open(src).convert('RGB')   # decap.py misses this caption (white text x27-246 y22-74): refill x0-275 y0-95 from the block to its right
im.paste(im.crop((275, 0, 550, 95)), (0, 0)); im.save(tmp, 'WEBP', quality=95)
Image.open(tmp).convert('RGB').resize((1280, 720), Image.LANCZOS).save(out, 'WEBP', quality=88)
print('M2370-46 | khon-ninh-cung-r2 | ->', out, Image.open(out).size, '| live: img/khon-ninh-cung.webp + img/khon-ninh-cung-ha-sang.webp')
if '--go' in sys.argv:
    dst = ['img/khon-ninh-cung.webp', 'img/khon-ninh-cung-ha-sang.webp']
    for d in dst: shutil.copy(out, d)
    subprocess.run(['python3', 'dev/site/cdn_sync.py', *dst], check=True)
else:
    print('DRY RUN: nothing live touched')
