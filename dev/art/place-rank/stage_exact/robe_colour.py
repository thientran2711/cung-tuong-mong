"""Owner Lượt 817: robe colour of a cut-out figure -> CIELAB L, C. Pixels: alpha > 250, rows 30–92 % of the figure box (robe, below the face),
k-means (k=4) in Lab; MAIN = biggest cluster, SEC = most chromatic other cluster with >= 12 % share. python3 robe_colour.py FIG [FIG ...]"""
import sys, json
import numpy as np
from PIL import Image
def lab(rgb):
    c = rgb / 255.0; c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    M = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ M.T / np.array([0.95047, 1.0, 1.08883]); f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)
def hexlc(h):
    v = np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], float); L, a, b = lab(v[None])[0]; return round(L, 1), round(float(np.hypot(a, b)), 1)
def robe(path):
    im = Image.open(path).convert('RGBA'); im = im.crop(im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
    im = im.resize((200, round(200 * im.height / im.width))); a = np.asarray(im, float); h = a.shape[0]
    px = a[int(.30 * h):int(.92 * h)].reshape(-1, 4); px = px[px[:, 3] > 250][:, :3]; X = lab(px)
    rng = np.random.default_rng(0); C = X[rng.choice(len(X), 4, replace=False)]
    for _ in range(25):
        k = np.argmin(((X[:, None] - C[None]) ** 2).sum(-1), 1); C = np.array([X[k == j].mean(0) if (k == j).any() else C[j] for j in range(4)])
    share = np.bincount(k, minlength=4) / len(k); out = []
    for j in np.argsort(-share):
        rgb = px[k == j].mean(0); out.append(dict(hex='#%02X%02X%02X' % tuple(int(v) for v in rgb), L=round(C[j][0], 1), C=round(float(np.hypot(C[j][1], C[j][2])), 1), share=round(float(share[j]), 2)))
    main = out[0]; sec = max([o for o in out[1:] if o['share'] >= .12] or out[1:2], key=lambda o: o['C'])
    return main, sec
if __name__ == '__main__':
    for p in sys.argv[1:]: m, s = robe(p); print(p.split('/')[-1], json.dumps(m), json.dumps(s))
