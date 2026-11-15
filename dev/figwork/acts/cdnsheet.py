# python3 cdnsheet.py OUT.jpg COLS key1 key2 ... : contact sheet of img/act-KEY.webp straight from the CDN (no local copies kept)
import sys, io, urllib.request, concurrent.futures as cf
from PIL import Image, ImageDraw
B = 'https://ctm-img.victoria-tntt.workers.dev/img/'
out, cols, keys = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
def get(k):
    n = k if k.endswith('.webp') else 'act-' + k + '.webp'
    try: return Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(B + n, headers={'User-Agent': 'ctm-sheet'}), timeout=60).read())).convert('RGB')
    except Exception: return Image.new('RGB', (384, 506), (255, 0, 255))
with cf.ThreadPoolExecutor(8) as ex: ims = list(ex.map(get, keys))
W, H = 240, 316
rows = (len(keys) + cols - 1) // cols
S = Image.new('RGB', (cols * (W + 6) + 6, rows * (H + 22) + 6), (40, 40, 40)); d = ImageDraw.Draw(S)
for i, (k, im) in enumerate(zip(keys, ims)):
    im = im.copy(); im.thumbnail((W, H)); x, y = 6 + (i % cols) * (W + 6), 6 + (i // cols) * (H + 22)
    S.paste(im, (x, y)); d.text((x, y + H + 4), f'{i+1}. {k}'[:40], fill=(255, 255, 255))
S.save(out, quality=82)
print(out, len(keys))
