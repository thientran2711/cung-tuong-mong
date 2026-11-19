"""Shared colour maths for the 3-palette work (B20, owner Lượt 614).
OKLab/OKLCH, warmth score, hue families, grey test."""
import math, colorsys

def hex2rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) / 255 for i in (0, 2, 4))

def _lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def oklab(h):
    r, g, b = (_lin(c) for c in hex2rgb(h))
    l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
    m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
    s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
    l, m, s = (x ** (1/3) for x in (l, m, s))
    return (0.2104542553*l + 0.7936177850*m - 0.0040720468*s,
            1.9779984951*l - 2.4285922050*m + 0.4505937099*s,
            0.0259040371*l + 0.7827717662*m - 0.8086757660*s)

def oklch(h):
    L, a, b = oklab(h)
    return L, math.hypot(a, b), math.degrees(math.atan2(b, a)) % 360

def hls(h):
    return colorsys.rgb_to_hls(*hex2rgb(h))  # (H, L, S) 0..1

WARM_POLE = 55.0   # OKLCH hue of orange-apricot
def warmth(h):
    """+ = warm, - = cool. chroma * cos(hue - warm pole), scaled x10.
    Near-neutral warm whites (ivory) score slightly +."""
    L, C, H = oklch(h)
    return 10 * C * math.cos(math.radians(H - WARM_POLE))

def pal_warmth(main, sec):
    return 0.6 * warmth(main) + 0.4 * warmth(sec)

def hue_dist(h1, h2):
    a = abs(oklch(h1)[2] - oklch(h2)[2]) % 360
    return min(a, 360 - a)

def dE(h1, h2):
    a, b = oklab(h1), oklab(h2)
    return math.dist(a, b)

def is_white(h):
    """ivory / cream / white: very light, low chroma, may be allowed with low sat."""
    L, C, H = oklch(h)
    return L >= 0.86 and C <= 0.06

def family(h):
    L, C, H = oklch(h)
    if is_white(h): return 'ivory'
    # OKLCH hue bands
    bands = [(0, 'pink-rose'), (22, 'red-coral'), (45, 'orange-apricot'), (80, 'yellow'),
             (100, 'olive-yellowgreen'), (128, 'green'), (165, 'jade-bluegreen'),
             (190, 'teal-aqua'), (225, 'blue'), (270, 'indigo-violet'), (300, 'lilac-purple'),
             (330, 'plum-magenta'), (350, 'pink-rose')]
    f = bands[0][1]
    for start, name in bands:
        if H >= start: f = name
    return f

GREY_C = 0.045   # chroma floor for a non-white colour (below = greyish)
def greyish(h):
    L, C, H = oklch(h)
    return (not is_white(h)) and C < GREY_C
