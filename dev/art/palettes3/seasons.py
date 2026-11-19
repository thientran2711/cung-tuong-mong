"""Season rules for B20 (owner Lượt 616; rewritten for owner Lượt 769): xuân / hạ / thu / đông.
Owner Lượt 769: "cho dù qua mùa thu hay mùa đông thì vẫn là màu nhẹ nhàng, tươi tắn như xuân với hạ; thu với đông chỉ là
mình gom những nhóm màu thu/đông vào mùa đó" -> ALL FOUR seasons use ONE tone (the Xuân/Hạ tone: light, fresh, soft);
a season = a group of colour FAMILIES, never a depth. The old "Thu / Đông need a deep colour" rule (Lmin <= 0.64 / 0.58)
is gone. Measured on OKLCH (colourlib).
TONE (all seasons, main and secondary, owner Lượt 742/744/769; = the Xuân/Hạ generated colours, tone_unify.py numbers):
  main: L 0.70–0.90, chroma 0.045–0.095 · secondary: L 0.64–0.90 (a touch deeper, like Xuân/Hạ), chroma 0.045–0.100
  ivory / cream / white (L >= 0.86, C <= 0.06) allowed as either colour. No grey (B19), no gold / royal yellow (B21).
FAMILIES (affinity 0..1 of one colour to each season, see aff()):
  Xuân: pinks / rose / coral-pink (hue 345–30°, clear), light peach-blossom, clear spring greens (128–152°)
  Thu : coral-red / terracotta / apricot / persimmon / honey (28–82°), olive / sage / moss / bamboo (95–128°), soft brick /
        rust / madder reds, muted rose-mauve, soft teal, soft plum-violet
  Hạ  : soft blue / aqua / turquoise (186–262°), periwinkle / lavender (262–310°), jade / sea green; plus the
        SUMMER-WARM pairs (owner Lượt 752): a light fresh yellow / orange main with a clearly cool secondary
  Đông: icy blue (light, low chroma), lilac / orchid (305–336°), silver-rose, jade / mint / celadon (pine -> soft jade),
        soft sapphire / indigo / violet, soft raspberry / plum, white
CLASSIFY: temperature w = 0.8 x main warmth + 0.2 x secondary warmth (ivory = 0); warm (w > 0) -> Xuân or Thu, cool -> Hạ or
  Đông, by the higher score 0.6 x aff(main) + 0.4 x aff(secondary) (main covers most of the outfit). Summer-warm -> Hạ.
TARGET (generated palettes): both colours in TONE, classify() gives the season with a score margin >= 0.10 over the
  other season of that side (summer-warm pairs: Hạ directly), Xuân clear (max chroma >= 0.07), Hạ soft (dE <= 0.26)."""
from colourlib import *

SEASONS = ('xuan', 'ha', 'thu', 'dong')
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
TONE = {'m': dict(L=(0.70, 0.90), C=(0.045, 0.095)), 's': dict(L=(0.64, 0.90), C=(0.045, 0.100))}

def temp(h):
    return 0.0 if is_white(h) else warmth(h)     # ivory / cream / white count as neutral

def metrics(m, s):
    return dict(w=0.8 * temp(m) + 0.2 * temp(s), Lmin=min(oklch(m)[0], oklch(s)[0]), dE=dE(m, s),
                Cmax=max(oklch(m)[1], oklch(s)[1]), Lmain=oklch(m)[0])

def in_tone(h, role):
    """role 'm' (main) / 's' (secondary): inside the one tone of all four seasons"""
    L, C, H = oklch(h)
    if is_white(h): return L <= 0.93
    t = TONE[role]
    return t['L'][0] - 1e-9 <= L <= t['L'][1] and t['C'][0] <= C <= t['C'][1] + 1e-9 and \
        not ((80 <= H < 100 and C > 0.06) or dE(h, '#EFBD69') < 0.045)

def tone_lift(h, role):
    """same hue, brought into the tone box (lighter if darker, chroma capped, a grey given a little colour)"""
    from xuan_pink import lch2hex
    L, C, H = oklch(h)
    if is_white(h): return h
    t = TONE[role]
    L2 = min(max(L, t['L'][0]), t['L'][1]); C2 = min(max(C, t['C'][0] + 0.005), t['C'][1])
    for _ in range(12):                         # sRGB gamut / rounding: nudge until it reads inside
        h2 = lch2hex(L2, C2, H)
        if in_tone(h2, role): return h2
        L2r, C2r, _h = oklch(h2)
        L2 += 0.004 if L2r < t['L'][0] + 0.002 else (-0.004 if L2r > t['L'][1] else 0)
        C2 += 0.003 if C2r < t['C'][0] + 0.002 else (-0.003 if C2r > t['C'][1] else 0)
    return lch2hex(L2, C2, H)

def _in(H, a, b): return (a <= H < b) if a < b else (H >= a or H < b)

def aff(h):
    L, C, H = oklch(h); A = dict(xuan=0.0, ha=0.0, thu=0.0, dong=0.0)
    if is_white(h): A.update(xuan=0.5, thu=0.3, ha=0.3, dong=0.6); return A
    def up(k, v): A[k] = max(A[k], v)
    if _in(H, 345, 30) and C >= 0.065: up('xuan', 1)
    if _in(H, 20, 50) and L >= 0.78: up('xuan', 0.8)
    if _in(H, 128, 152) and C >= 0.085: up('xuan', 0.9)
    if _in(H, 155, 186) and L >= 0.76: up('xuan', 0.4)
    if _in(H, 28, 82): up('thu', 1 if L < 0.78 else 0.75)
    if _in(H, 95, 128): up('thu', 1)
    if _in(H, 10, 40) and C >= 0.085: up('thu', 0.85)
    if _in(H, 330, 20) and C < 0.072: up('thu', 0.6)
    if _in(H, 186, 212) and L < 0.72: up('thu', 0.7)
    if _in(H, 295, 345) and L < 0.70: up('thu', 0.6)
    if _in(H, 186, 262): up('ha', 1 if L < 0.80 else 0.7)
    if _in(H, 262, 310): up('ha', 0.8)
    if _in(H, 155, 186): up('ha', 0.6)
    if _in(H, 330, 360) and C < 0.09: up('ha', 0.4)
    if _in(H, 212, 265) and L >= 0.80 and C <= 0.07: up('dong', 1)
    if _in(H, 305, 336): up('dong', 1)
    if _in(H, 345, 15) and C <= 0.06 and L >= 0.78: up('dong', 0.9)
    if _in(H, 155, 186): up('dong', 0.9)
    if _in(H, 262, 300) and L < 0.72: up('dong', 0.9)
    if _in(H, 335, 360) and L < 0.72: up('dong', 0.8)
    return A

def scores(m, s):
    a, b = aff(m), aff(s); return {k: 0.6 * a[k] + 0.4 * b[k] for k in a}

def summer_warm(m, s):
    """Hạ with a light yellow / orange main and a cool secondary (owner Lượt 752)"""
    if is_white(m) or is_white(s) or temp(m) <= 0: return False
    x = metrics(m, s); H = oklch(m)[2]
    return (40 <= H <= 110 and x['Lmain'] >= 0.76 and x['Lmin'] >= 0.65 and x['Cmax'] <= 0.10 and x['dE'] <= 0.26
            and temp(s) <= -0.45)

def side(m, s): return ('xuan', 'thu') if metrics(m, s)['w'] > 0 else ('ha', 'dong')

def classify(m, s):
    if summer_warm(m, s): return 'ha'
    sc = scores(m, s); return max(side(m, s), key=lambda k: sc[k])

def target_ok(season, m, s):
    if not (in_tone(m, 'm') and in_tone(s, 's')): return False
    x = metrics(m, s)
    if season == 'ha' and summer_warm(m, s): return True
    if classify(m, s) != season: return False
    sc = scores(m, s); a, b = side(m, s)
    if abs(sc[a] - sc[b]) < 0.10: return False
    if season == 'xuan': return x['Cmax'] >= 0.07
    if season == 'ha': return x['dE'] <= 0.26
    return True
