"""Season rules for B20 (owner Lượt 616): xuân / hạ / thu / đông.
Measured on OKLCH (colourlib):  w = temperature = 0.8 x main warmth + 0.2 x secondary warmth (the main colour
  covers most of the outfit; warmth = 10*C*cos(hue-55°): + warm / - cool; ivory/cream/white = neutral 0),
Lmin = lightness of the darker of the two colours, dE = main-vs-secondary difference (OKLab).
CLASSIFY (root palettes):
  warm (w > 0)  -> XUÂN (spring)  if both colours light (Lmin >= 0.66) and no olive/yellow-green colour (clear + light)
                   THU  (autumn)  otherwise (a deep / rich / muted colour)
  cool (w <= 0) -> ĐÔNG (winter)  if a deep colour or strong contrast (Lmin <= 0.58 or dE >= 0.30)
                   HẠ   (summer)  otherwise (soft, light, gentle contrast)
TARGET (generated palettes: same rule plus margins so each reads clearly as its season):
  XUÂN: w >= +0.30, Lmin >= 0.68, no olive, max chroma >= 0.07 (clear), secondary not a strong cool (warmth >= -0.45)
  HẠ  : w <= -0.15, Lmin >= 0.62, both chroma <= 0.10, dE <= 0.24 (soft), secondary not peach/coral (warmth <= 0.50)
        or (owner Lượt 752, "Hạ a little yellow") SUMMER-WARM: a light fresh yellow / orange main (hue 40–110°,
        L >= 0.76, so lighter and fresher than Thu) with a clearly cool secondary (warmth <= -0.45: blue / aqua /
        teal / violet, so it never passes the Xuân target, whose secondary must be >= -0.45), Lmin >= 0.65 (Thu
        needs <= 0.64), both chroma <= 0.10, dE <= 0.26. Root classification (classify) is unchanged.
  THU : w >= +0.30, Lmin <= 0.64 (a deep/rich colour), main lightness <= 0.80, secondary no colder than teal (warmth >= -0.62)
  ĐÔNG: w <= -0.15, Lmin <= 0.58 or a white/ivory with dE >= 0.30; dE >= 0.25 (clear, strong)
"""
from colourlib import *

SEASONS = ('xuan', 'ha', 'thu', 'dong')
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}

def _olive(h):
    H = oklch(h)[2]; return 95 <= H < 128 and not is_white(h)

def temp(h):
    return 0.0 if is_white(h) else warmth(h)     # ivory / cream / white count as neutral

def metrics(m, s):
    return dict(w=0.8 * temp(m) + 0.2 * temp(s), Lmin=min(oklch(m)[0], oklch(s)[0]), dE=dE(m, s),
                Cmax=max(oklch(m)[1], oklch(s)[1]), Lmain=oklch(m)[0])

def classify(m, s):
    x = metrics(m, s)
    if x['w'] > 0:
        return 'xuan' if x['Lmin'] >= 0.66 and not (_olive(m) or _olive(s)) else 'thu'
    return 'dong' if (x['Lmin'] <= 0.58 or x['dE'] >= 0.30) else 'ha'

def summer_warm(m, s):
    """Hạ with a light yellow / orange main and a cool secondary (owner Lượt 752)"""
    if is_white(m) or is_white(s) or temp(m) <= 0: return False
    x = metrics(m, s); H = oklch(m)[2]
    return (40 <= H <= 110 and x['Lmain'] >= 0.76 and x['Lmin'] >= 0.65 and x['Cmax'] <= 0.10 and x['dE'] <= 0.26
            and temp(s) <= -0.45)

def target_ok(season, m, s):
    x = metrics(m, s)
    if season == 'ha' and summer_warm(m, s): return True
    if classify(m, s) != season: return False
    if season == 'xuan':
        return x['w'] >= 0.30 and x['Lmin'] >= 0.68 and x['Cmax'] >= 0.07 and temp(s) >= -0.45
    if season == 'ha':
        return x['w'] <= -0.15 and x['Lmin'] >= 0.62 and x['Cmax'] <= 0.10 and x['dE'] <= 0.24 and temp(s) <= 0.50
    if season == 'thu':
        return x['w'] >= 0.30 and x['Lmin'] <= 0.64 and x['Lmain'] <= 0.80 and temp(s) >= -0.62
    if season == 'dong':
        return x['w'] <= -0.15 and x['dE'] >= 0.25 and (x['Lmin'] <= 0.58 or is_white(m) or is_white(s))
