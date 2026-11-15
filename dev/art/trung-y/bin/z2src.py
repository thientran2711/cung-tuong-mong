# z2src.py ZIP SRCDIR : each magnific_*_<gen>.png in ZIP -> SRCDIR/<gen>.webp (full res, q96); prints count
import sys, zipfile, io, os, re
from PIL import Image
z = zipfile.ZipFile(sys.argv[1]); out = sys.argv[2]; n = 0
for nm in z.namelist():
    m = re.search(r'_(\w{10})\.png$', nm)
    if not m: continue
    p = f"{out}/{m.group(1)}.webp"
    if os.path.exists(p): n += 1; continue
    im = Image.open(io.BytesIO(z.read(nm))).convert("RGB"); im.save(p + ".tmp", "WEBP", quality=96, method=4); os.replace(p + ".tmp", p); n += 1
print(sys.argv[1], n)
