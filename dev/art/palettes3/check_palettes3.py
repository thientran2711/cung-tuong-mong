"""Check dev/art/face-common/palettes3.json (B20, owner Lượt 614). Prints FAIL lines; exit 1 on any FAIL.
Checks for P2/P3 (P1 is the approved palette: checked for info only, never FAIL):
 - CONTRAST: main and secondary in different hue families, hue distance >= 40° (OKLCH) or, with an
   ivory/white, a lightness gap >= 0.12; hues < 110° apart also need a lightness gap >= 0.12; colour difference dE(OKLab) >= max(0.12, min(0.7*P1 dE, 0.14)).
 - NO GREY (B19): every non-white colour has OKLCH chroma >= 0.045 (whites/ivory: L>=0.86, C<=0.06 allowed).
 - TONE (B18): OKLCH chroma <= 0.127 (P1 max 0.126) (never rực), lightness 0.45..0.93.
 - DIRECTION: warmth = 10*C*cos(hue-55°) (OKLCH; + warm, - cool), palette = 0.6 main + 0.4 secondary.
   P2 <= min(max(P1-0.35, -0.60), -0.20) and P2 main warmth <= P1 main warmth;
   P3 >= max(min(P1+0.35, 0.65), 0.45) and P3 main warmth >= min(P1 main, 0.55).
 - NO GOLD/DEEP YELLOW (G4): no colour in the yellow hue band (OKLCH 80–100°) with chroma > 0.06.
 - SPREAD: next rows never get look-alike P2/P3 (main dE<0.07 and secondary dE<0.09; two ivory secondaries: main dE<0.09; same secondary: main dE<0.10); rows 2 apart: 0.05/0.07 (ivory 0.06); a main+secondary pair is used at most twice, by people >= 10 rows apart; neighbours (next id) never share a P2 or P3 main.
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from colourlib import *
from gen_palettes3 import contrast_ok, p2_target, p3_target, lookalike

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
d = json.load(open(os.path.join(ROOT, 'dev/art/face-common/palettes3.json')))
ids = [k for k in d if not k.startswith('_') and k != 'status']
fails, infos = [], []
def bad(msg): fails.append('FAIL ' + msg)

pairs = {}
ids_ok = [k for k in ids if all(P in d[k] for P in ('P1', 'P2', 'P3'))]
for k in ids:
    if k not in ids_ok: bad(f'{k}: missing palette(s) {[P for P in ("P1", "P2", "P3") if P not in d[k]]}')
ids = ids_ok
for i, k in enumerate(ids):
    r = d[k]
    p1 = r['P1']; p1w = pal_warmth(p1['main_hex'], p1['sec_hex'])
    for P in ('P1', 'P2', 'P3'):
        p = r[P]; mh, sh = p['main_hex'], p['sec_hex']
        tag = f'{k} {P} ({p["main"]} {mh} + {p["sec"]} {sh})'
        out = bad if P != 'P1' else (lambda m: infos.append('info ' + m))
        if not contrast_ok(mh, sh, None if P == 'P1' else dE(p1['main_hex'], p1['sec_hex'])):
            out(f'{tag}: weak main/secondary contrast (families {family(mh)}/{family(sh)}, hue {hue_dist(mh, sh):.0f}°, dE {dE(mh, sh):.2f})')
        for h in (mh, sh):
            L, C, H = oklch(h)
            if greyish(h): out(f'{tag}: {h} greyish (chroma {C:.3f})')
            if C > 0.127: out(f'{tag}: {h} too strong/rực (chroma {C:.3f})')
            if not (0.45 <= L <= 0.93): out(f'{tag}: {h} lightness {L:.2f} outside tone band')
            if 80 <= H < 100 and C > 0.06: out(f'{tag}: {h} reads gold/deep yellow')
        key = (p['main'], p['sec'])
        pairs.setdefault(key, []).append(f'{k}{P}')
    w2 = pal_warmth(r['P2']['main_hex'], r['P2']['sec_hex']); w3 = pal_warmth(r['P3']['main_hex'], r['P3']['sec_hex'])
    m1, m2, m3 = (warmth(r[P]['main_hex']) for P in ('P1', 'P2', 'P3'))
    if w2 > p2_target(p1w) + 1e-9: bad(f'{k} P2 not cool enough: {w2:+.2f} vs P1 {p1w:+.2f} (need <= {p2_target(p1w):+.2f})')
    if w3 < p3_target(p1w) - 1e-9: bad(f'{k} P3 not warm enough: {w3:+.2f} vs P1 {p1w:+.2f} (need >= {p3_target(p1w):+.2f})')
    if m2 > m1 + 1e-9: bad(f'{k} P2 main warmer than P1 main ({m2:+.2f} > {m1:+.2f})')
    if m3 < min(m1, 0.55) - 1e-9: bad(f'{k} P3 main not warm ({m3:+.2f} < min(P1 main {m1:+.2f}, 0.55))')
    for j in range(i + 1, min(i + 3, len(ids))):
        for P in ('P2', 'P3'):
            a, b = r[P], d[ids[j]][P]
            if lookalike((a['main_hex'], a['sec_hex']), (b['main_hex'], b['sec_hex']), j - i):
                bad(f'{k}/{ids[j]} {P} look alike ({a["main"]}+{a["sec"]} vs {b["main"]}+{b["sec"]})')
    if i + 1 < len(ids):
        n = d[ids[i + 1]]
        for P in ('P2', 'P3'):
            if r[P]['main'] == n[P]['main']: bad(f'{k}/{ids[i+1]} neighbours share {P} main "{r[P]["main"]}"')
allids = [k for k in d if not k.startswith('_') and k != 'status']
for key, who in pairs.items():
    if len(who) > 1 and any(not w.endswith('P1') for w in who):
        pos = sorted(allids.index(w[:-2]) for w in who)
        if len(who) > 2 or min(b - a for a, b in zip(pos, pos[1:])) < 10:
            bad(f'same pair {key[0]} + {key[1]} used by {", ".join(who)}')

for x in infos: print(x)
for x in fails: print(x)
print(f'{len(ids)} people, {len(ids)*3} palettes; {len(fails)} FAIL, {len(infos)} info (P1 approved, not judged)')
sys.exit(1 if fails else 0)
