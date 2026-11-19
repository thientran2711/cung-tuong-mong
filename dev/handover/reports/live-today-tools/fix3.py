"""fix3.py IN OUT [D]: floor stain by colour flood. Seed = soft halo (shadow.mask: alpha<200 pixels not near solid, feet band);
stain colour C = median RGB of the seed; grow through feet-band pixels with |rgb-C| < D and low local texture (3x3 std < T), connected to the seed.
Removed = seed + grown, feathered 1 px."""
import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
sys.path.insert(0, "/home/user/wt/sh"); import shadow
def stainmask(im, D=28, T=7):
    m0, a = shadow.mask(im); x = np.asarray(im)[..., :3].astype(float); H = a.shape[0]
    ys = np.nonzero((a >= 230).any(1))[0]; top, bot = ys.min(), ys.max(); y0 = int(bot - (bot - top) * .08)
    C = np.median(x[m0 & (a > 60)], 0) if (m0 & (a > 60)).sum() > 20 else np.median(x[m0], 0)
    L = x.mean(2); sd = np.sqrt(np.maximum(ndi.uniform_filter(L * L, 3) - ndi.uniform_filter(L, 3) ** 2, 0))
    cand = (a > 0) & (np.abs(x - C).max(2) < D) & (sd < T); cand[:y0] = False
    lab, n = ndi.label(cand | m0); keep = np.unique(lab[m0]); keep = keep[keep > 0]
    return np.isin(lab, keep) & (cand | m0), C
if __name__ == "__main__":
    im = Image.open(sys.argv[1]).convert("RGBA"); D = int(sys.argv[3]) if len(sys.argv) > 3 else 28
    m, C = stainmask(im, D); x = np.array(im); a = x[..., 3].astype(float)
    soft = ndi.gaussian_filter(m.astype(float), 0.7); x[..., 3] = (a * (1 - np.clip(soft * 1.4, 0, 1))).astype("uint8")
    Image.fromarray(x).save(sys.argv[2], "WEBP", quality=90 if im.height > 1000 else 88, method=6); print("fix3", int(m.sum()), "C", C.round(), sys.argv[2])
