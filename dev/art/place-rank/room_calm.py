"""PLACES3 (owner L2376: Ngự hoa viên 'màu sắc nó đang bị AI quá, tức là nó đang rực quá'). 0 cr local CALM grade, the opposite of
room_vivid.py: no redraw, NO hue shift. 1. chroma x k in YCbCr (hue angle kept), with an extra soft pull on the strongest colours (the
'AI' neon greens, pinks, sky); 2. gentle contrast ease on luminance (highlights/shadows pulled in a touch); 3. a faint natural warm-grey
air mix. python3 room_calm.py IN OUT {nhe|vua}"""
import sys, numpy as np
from PIL import Image
P = {'nhe': dict(k=0.84, top=0.70, ease=0.05, air=0.03), 'vua': dict(k=0.76, top=0.62, ease=0.08, air=0.05)}
def calm(im, k, top, ease, air):
    a = np.asarray(im.convert('RGB'), dtype=float) / 255
    Y = a @ [0.299, 0.587, 0.114]
    Cb = (a[..., 2] - Y) * 0.564; Cr = (a[..., 0] - Y) * 0.713
    C = np.hypot(Cb, Cr) + 1e-6; q = np.percentile(C, 90)
    s = k * np.where(C > q, 1 - (1 - top / k) * np.clip((C - q) / (C.max() - q + 1e-6), 0, 1) * 1.0, 1.0)
    Cb, Cr = Cb * s, Cr * s
    Y = Y + ease * (0.5 - Y) * np.abs(Y - 0.5) * 2
    # exact inverse of the YCbCr split above
    R = Y + Cr / 0.713; B = Y + Cb / 0.564; G = (Y - 0.299 * R - 0.114 * B) / 0.587
    out = np.stack([R, G, B], -1)
    out = out * (1 - air) + np.array([0.86, 0.85, 0.82]) * air
    return Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype('uint8'))
if __name__ == '__main__':
    calm(Image.open(sys.argv[1]), **P[sys.argv[3]]).save(sys.argv[2], quality=88)
