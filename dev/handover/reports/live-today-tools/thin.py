import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
def thin(im, band=.12):
    x = np.array(im); a = x[..., 3]; H = a.shape[0]; k = H / 900
    r = max(1, round(1.5 * k)); st = ndi.generate_binary_structure(2, 1)
    solid = a > 40; op = ndi.binary_opening(solid, st, iterations=r)
    keep = ndi.binary_dilation(op, st, iterations=r + 1)
    ys = np.nonzero(solid.any(1))[0]; y0 = int(ys.max() - (ys.max() - ys.min()) * band)
    m = (a > 0) & ~keep; m[:y0] = False; return m
if __name__ == "__main__":
    im = Image.open(sys.argv[1]).convert("RGBA"); m = thin(im)
    if sys.argv[2] == "show":
        W, H = im.size; bg = Image.new("RGBA", im.size, (32, 30, 48, 255)); bg.alpha_composite(im); r = np.array(bg.convert("RGB")); r[m] = [255, 0, 0]
        Image.fromarray(r).crop((0, int(H * .88), W, H)).resize((W * 2 if H < 1000 else W, int(H * .12) * (2 if H < 1000 else 1))).save(sys.argv[3]); print("thin px", int(m.sum()))
    else:
        x = np.array(im); x[..., 3][m] = 0; Image.fromarray(x).save(sys.argv[3], "WEBP", quality=90 if im.height > 1000 else 88, method=6); print("removed", int(m.sum()), sys.argv[3])
