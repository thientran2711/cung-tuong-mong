"""Floor measure for room pictures (owner Lượt 668 via ROOT-54): per column, scan UP from the bottom edge while the pixel stays floor-like
(close to the running floor colour AND to the bottom floor colour); the first non-floor row = where furniture/wall begins in that column.
Outputs (% of picture height / width):
  floor_c  = median open-floor depth over the central columns 30–70 % W (the aisle/bed-front area)  -> "floor share"
  floor_a  = median over all columns 10–90 % W
  base_c   = 100 - floor_c  (y of the bed/throne base line in the centre, % H from top)
  wide     = share of columns 10-90 % whose open floor is deeper than 25 % H (big empty areas)
python3 measure_floor.py IMG [IMG ...]   (prints one table row per picture; --grid OUT.jpg draws the per-column line for an eye check)"""
import sys
TEX = 5
import numpy as np
from PIL import Image, ImageFilter
def measure(path, grid=None, thr=None):
    im = Image.open(path).convert('L'); W0, H0 = im.size
    W = 448; H = round(W * H0 / W0)
    g = np.asarray(im.resize((W, H), Image.LANCZOS), dtype=float)
    hp = np.abs(g - np.asarray(Image.fromarray(g.astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)), dtype=float))
    tex = np.asarray(Image.fromarray(np.clip(hp * 20, 0, 255).astype(np.uint8)).filter(ImageFilter.BoxBlur(3)), dtype=float) / 20
    T = TEX if thr is None else thr
    depth = np.zeros(W)
    for x in range(W):
        y = H - 1; miss = 0
        while y > 0:
            if tex[y, x] > T: miss += 1
            else: miss = 0
            if miss >= 4: y += 3; break
            y -= 1
        depth[x] = (H - 1 - y) / H * 100
    depth = np.array([np.median(depth[max(0, i - 4):i + 5]) for i in range(W)])
    c = depth[int(.3 * W):int(.7 * W)]; al = depth[int(.1 * W):int(.9 * W)]
    r = dict(floor_c=float(np.median(c)), floor_a=float(np.median(al)), base_c=100 - float(np.median(c)), wide=float((al > 25).mean() * 100))
    if grid:
        g = Image.open(path).convert('RGB').resize((1400, round(1400 * H0 / W0))); from PIL import ImageDraw; d = ImageDraw.Draw(g); gw, gh = g.size
        for i in range(1, 10): d.line([(0, gh * i / 10), (gw, gh * i / 10)], fill=(255, 0, 0), width=1)
        pts = [(x * gw / W, gh - depth[x] / 100 * gh) for x in range(W)]; d.line(pts, fill=(0, 255, 255), width=2)
        g.save(grid, quality=82)
    return r
if __name__ == '__main__':
    args = sys.argv[1:]; grid = None
    if '--grid' in args: i = args.index('--grid'); grid = args[i + 1]; del args[i:i + 2]
    print('%-55s %7s %7s %7s %6s' % ('picture', 'floor_c', 'floor_a', 'base_c', 'wide'))
    for p in args:
        r = measure(p, grid if len(args) == 1 else None)
        print('%-55s %6.1f%% %6.1f%% %6.1f%% %5.0f%%' % (p.split('/')[-1][:55], r['floor_c'], r['floor_a'], r['base_c'], r['wide']))
