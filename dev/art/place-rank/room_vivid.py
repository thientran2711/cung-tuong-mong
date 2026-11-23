"""PR21 (owner via Foreman C #17: "có một cái màu trầm nó phủ lên, nó cứ bạc bạc bạc cái hình ... tươi tắn hơn, chứ không có nghĩa là đổi cả
cái tông màu ... đổi cái saturate chẳng hạn"). 0 cr local colour grade of a drawn room: no redraw, NO hue shift.
  1. veil removal (then a gamma so the mean brightness stays the same or a touch lighter): per-picture levels on luminance only (black point at the 0.4 % low, white point at the 99.7 % high), same gain on R,G,B
     so hues stay;  2. contrast: gentle S-curve on luminance;  3. saturation: chroma x k in Lab-like YCbCr space (hue angle kept),
     with a soft limit so already-strong colours do not clip;  4. clarity: unsharp mask (radius 2, small amount).
python3 room_vivid.py IN OUT {sieunhe|nuaratnhe|ratnhe|nhe|manh}"""
import sys, numpy as np
from PIL import Image, ImageFilter
P = {'sieunhe': dict(sat=1.025, curve=0.01, lo=0.04, hi=99.97, sharp=4),   # owner L1695 'rất rất rất ... nhẹ' (~1/4 of ratnhe)
     'nuaratnhe': dict(sat=1.055, curve=0.025, lo=0.1, hi=99.92, sharp=9),   # owner L1686 'nhẹ xuống nửa' of ratnhe (room 31 still too vivid / AI look on iPad)
     'ratnhe': dict(sat=1.11, curve=0.05, lo=0.2, hi=99.85, sharp=18),   # owner L1659 'màu nhẹ hơn cái tươi nhẹ' (~half of nhe)
python3 room_vivid.py IN OUT {ratnhe|nhe|manh}"""
import sys, numpy as np
from PIL import Image, ImageFilter
P = {'ratnhe': dict(sat=1.11, curve=0.05, lo=0.2, hi=99.85, sharp=18),   # owner L1659 'màu nhẹ hơn cái tươi nhẹ' (~half of nhe)
     'nhe': dict(sat=1.22, curve=0.10, lo=0.4, hi=99.7, sharp=35),
python3 room_vivid.py IN OUT {nhe|manh}"""
import sys, numpy as np
from PIL import Image, ImageFilter
P = {'nhe': dict(sat=1.22, curve=0.10, lo=0.4, hi=99.7, sharp=35),
     'manh': dict(sat=1.42, curve=0.18, lo=0.8, hi=99.5, sharp=55)}
def grade(im, sat, curve, lo, hi, sharp):
    a = np.asarray(im.convert('RGB'), dtype=float) / 255
    Y = a @ [0.299, 0.587, 0.114]
    b, w = np.percentile(Y, lo), np.percentile(Y, hi)
    Yn = np.clip((Y - b) / (w - b), 0, 1)
    Yn = Yn ** (np.log(Y.mean()) / np.log(max(Yn.mean(), 1e-3)) * 0.92)   # keep the mean brightness (a touch lighter), no darkening
    Yc = np.clip(Yn + curve * np.sin(np.pi * (Yn - 0.5)) * Yn * (1 - Yn) * 4, 0, 1)
    Cb = (a[..., 2] - Y) * 0.564; Cr = (a[..., 0] - Y) * 0.713
    C = np.hypot(Cb, Cr) + 1e-6
    k = 1 + (sat - 1) * np.clip(1 - C / 0.35, 0.2, 1)          # less boost for already strong colours
    Cb, Cr = Cb * k, Cr * k
    out = np.stack([Yc + 1.403 * Cr, Yc - 0.344 * Cb - 0.714 * Cr, Yc + 1.773 * Cb], -1)
    img = Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8))
    return img.filter(ImageFilter.UnsharpMask(radius=2, percent=sharp, threshold=2))
if __name__ == '__main__':
    i, o, s = sys.argv[1:4]; grade(Image.open(i), **P[s]).save(o, quality=90); print(o, s)
