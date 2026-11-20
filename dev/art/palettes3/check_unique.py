"""UNIQUENESS GATE (owner Lượt 763, B20): EXACTLY the 86 consort faces, each a UNIQUE (main, secondary) pair in EVERY season.
Consorts = ids in dev/art/face-common/OWNER_GROUPS_L686.json whose group is not "Kho" and not "Công chúa (…)".
For each season (xuân / hạ / thu / đông), for every two consorts a, b:
  FAIL  max(ΔE2000(main_a, main_b), ΔE2000(sec_a, sec_b)) < 8       (the two pairs read as the same pair; 10 -> 8 Foreman C ROOT-58)
  FAIL  the colour NAME pair (main, sec) is identical
  WARN  ΔE2000(main) < 6 and ΔE2000(sec) < 14                        (close mains, only the secondary tells them apart)
  NO exemptions (owner Lượt 770): two ★ roots that clash are a FAIL like any other pair — root colour CODES may change
        (pictures are never redrawn; the drawn colours are kept as root_drawn).
Also FAIL: a consort missing from palettes_season.json, a non-consort id in it, or a missing season.
Prints a table per season; exit 1 on any FAIL.  Run: python3 dev/art/palettes3/check_unique.py [--quiet]"""
import json, math, os, sys
from itertools import combinations

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
FC = os.path.join(ROOT, 'dev', 'art', 'face-common')
SEASONS = ('xuan', 'ha', 'thu', 'dong')
VN = {'xuan': 'Xuân', 'ha': 'Hạ', 'thu': 'Thu', 'dong': 'Đông'}
FAIL_DE, WARN_MAIN, WARN_SEC = 8.0, 6.0, 14.0   # FAIL 10 -> 8: Foreman C ROOT-58 (P2 capacity86.py: one soft tone fits only ~62 Xuân pairs at 10, >= 118 at 8)


def consort_ids():
    g = json.load(open(os.path.join(FC, 'OWNER_GROUPS_L686.json')))
    return [k for k, v in g.items() if v != 'Kho' and not v.startswith('Công chúa')], g


def _lab(h):
    h = h.lstrip('#'); rgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    r, g, b = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.95047
    y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b
    z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 216 / 24389 else (24389 / 27 * t + 16) / 116
    fx, fy, fz = f(x), f(y), f(z)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def de2000(h1, h2):
    L1, a1, b1 = _lab(h1); L2, a2, b2 = _lab(h2)
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = a1 * (1 + G), a2 * (1 + G)
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1p = math.degrees(math.atan2(b1, a1p)) % 360 if C1p else 0.0
    h2p = math.degrees(math.atan2(b2, a2p)) % 360 if C2p else 0.0
    dLp, dCp = L2 - L1, C2p - C1p
    dh = h2p - h1p
    if C1p * C2p == 0: dh = 0
    elif dh > 180: dh -= 360
    elif dh < -180: dh += 360
    dHp = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dh / 2))
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0: hbp = h1p + h2p
    elif abs(h1p - h2p) <= 180: hbp = (h1p + h2p) / 2
    elif h1p + h2p < 360: hbp = (h1p + h2p + 360) / 2
    else: hbp = (h1p + h2p - 360) / 2
    T = (1 - 0.17 * math.cos(math.radians(hbp - 30)) + 0.24 * math.cos(math.radians(2 * hbp))
         + 0.32 * math.cos(math.radians(3 * hbp + 6)) - 0.20 * math.cos(math.radians(4 * hbp - 63)))
    dth = 30 * math.exp(-(((hbp - 275) / 25) ** 2))
    RC = 2 * math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    SL = 1 + 0.015 * (Lbp - 50) ** 2 / math.sqrt(20 + (Lbp - 50) ** 2)
    SC, SH = 1 + 0.045 * Cbp, 1 + 0.015 * Cbp * T
    RT = -math.sin(math.radians(2 * dth)) * RC
    return math.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))


def pair_verdict(p, q):
    """'FAIL' / 'WARN' / None for two season palettes p, q (dicts with main, main_hex, sec, sec_hex)"""
    dm, ds = de2000(p['main_hex'], q['main_hex']), de2000(p['sec_hex'], q['sec_hex'])
    if (p['main'], p['sec']) == (q['main'], q['sec']): return 'FAIL', dm, ds, 'same name pair'
    if max(dm, ds) < FAIL_DE: return 'FAIL', dm, ds, f'max dE < {FAIL_DE:g}'
    if dm < WARN_MAIN and ds < WARN_SEC: return 'WARN', dm, ds, 'main dE < 6, sec dE < 14'
    return None, dm, ds, ''


def run(d=None, quiet=False):
    ids, groups = consort_ids()
    if d is None: d = json.load(open(os.path.join(FC, 'palettes_season.json')))
    have = [k for k in d if not k.startswith('_') and k not in ('status', 'root_season_counts')]
    fails, warns = [], []
    for k in ids:
        if k not in d: fails.append(f'{k}: consort missing from palettes_season.json')
        else:
            for se in SEASONS:
                if se not in d[k]: fails.append(f'{k}: missing {VN[se]}')
    for k in have:
        if k not in ids: fails.append(f'{k}: not one of the 86 consorts (group {groups.get(k)})')
    pres = [k for k in ids if k in d]
    per = {}
    for se in SEASONS:
        nf = nw = 0
        for a, b in combinations(pres, 2):
            if se not in d[a] or se not in d[b]: continue
            v, dm, ds, why = pair_verdict(d[a][se], d[b][se])
            if not v: continue
            pa, pb = d[a][se], d[b][se]
            line = (f'{v} {VN[se]:5} {a}{"★" if pa.get("root") else " "} {pa["main"]}+{pa["sec"]} {pa["main_hex"]}/{pa["sec_hex"]}'
                    f'  vs  {b}{"★" if pb.get("root") else " "} {pb["main"]}+{pb["sec"]} {pb["main_hex"]}/{pb["sec_hex"]}'
                    f'  dE main {dm:.1f} sec {ds:.1f} ({why})')
            if v == 'FAIL': fails.append(line); nf += 1
            else: warns.append(line); nw += 1
        per[se] = (nf, nw)
    if not quiet:
        for x in warns: print(x)
        for x in fails: print(x)
    print(f'consorts: {len(ids)} expected, {len(pres)} present in palettes_season.json')
    print('season | pairs checked | FAIL | WARN')
    n = len(pres) * (len(pres) - 1) // 2
    for se in SEASONS: print(f'{VN[se]:6} | {n} | {per[se][0]} | {per[se][1]}')
    print(f'TOTAL {len(fails)} FAIL, {len(warns)} WARN')
    return fails, warns


if __name__ == '__main__':
    # FRUITPET2: --file palettes_season_deep.json = the owner-approved P6 palette (Lượt 1042) with s62–s65 (90 consorts); default file unchanged
    fa = sys.argv[sys.argv.index('--file') + 1] if '--file' in sys.argv else None
    f, w = run(json.load(open(fa if os.path.isabs(fa) else os.path.join(FC, fa))) if fa else None, quiet='--quiet' in sys.argv)
    sys.exit(1 if f else 0)
