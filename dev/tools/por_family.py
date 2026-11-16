#!/usr/bin/env python3
"""Portrait framing by family — contact sheets + numbers for jkpor.js (owner 11/15: same head size for every portrait).
usage: python3 dev/tools/por_family.py <dir with por-*.webp> <POR_FACE.json> <outdir> [max per sheet]
  → <outdir>/por_family.json  per family: n, face/window OLD (1.14x, raised 5 %) and NEW (jkpor) min/median/max, spread %, body offset
  → <outdir>/por-<family>.jpg  contact sheet OLD | NEW for every picture of the family (window 192x253, the kit photo window ratio).
Same geometry as kporGeo in dev/build/jkpor.js — keep in sync."""
import sys, os, re, json
import numpy as np
from PIL import Image, ImageDraw, ImageFont

Z, G, DX, ZR, FACE, FBAD = 1.14, .03, .18, (1.0, 1.14), .2975, .40  # no zoom beyond 1.14 (owner 11:30Z); keep in sync with KIT_POR

def family(name):
    m = re.match(r'([a-z]+)-.*?(?:-(a\d+))?$', name)
    if not m: return 'other'
    return 'kid-' + m.group(2) if m.group(1) == 'kid' and m.group(2) else m.group(1)

def geo(v):
    ft, fh, fx, top, bx = v
    z = Z if fh <= 0 or fh > FBAD else max(ZR[0], min(ZR[1], FACE / fh))
    L = min(top * z - G, z - 1); D = max(-DX, min(DX, bx - .5))
    return z, L, D

def render(path, z, L, D, WW=192, WH=253):
    im = Image.open(path).convert('RGBA'); w = round(z * WW); h = round(z * WH)
    p = im.resize((w, h), Image.LANCZOS)
    win = Image.new('RGBA', (WW, WH), (234, 222, 200, 255))
    x = round(-(z - 1) / 2 * WW - D * z * WW); y = round(-L * WH)
    big = Image.new('RGBA', (WW + 2 * w, WH + 2 * h), (0, 0, 0, 0)); big.alpha_composite(p, (w + x, h + y))
    win.alpha_composite(big.crop((w, h, w + WW, h + WH)))
    return win.convert('RGB')

def main(src, facej, out, maxn=60):
    maxn = int(maxn); os.makedirs(out, exist_ok=True)
    F = json.load(open(facej))['f']
    have = {f[4:-5] for f in os.listdir(src) if f.startswith('por-')}
    fams = {}
    for k in sorted(F):
        if k in have: fams.setdefault(family(k), []).append(k)
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13)
    big = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 20)
    stats = {}
    for fam, L in sorted(fams.items()):
        old = [F[k][1] * Z for k in L if 0 < F[k][1] <= FBAD]
        new = [F[k][1] * geo(F[k])[0] for k in L if 0 < F[k][1] <= FBAD]
        body = [abs(F[k][4] - .5 - geo(F[k])[2]) * 100 for k in L]
        within = sum(1 for x in new if abs(x - FACE) / FACE <= .03)
        s = dict(n=len(L), no_face=len(L) - len(new),
                 old=[round(min(old), 3), round(float(np.median(old)), 3), round(max(old), 3)] if old else None,
                 new=[round(min(new), 3), round(float(np.median(new)), 3), round(max(new), 3)] if new else None,
                 spread_old_pct=round((max(old) - min(old)) / np.median(old) * 100, 1) if old else None,
                 spread_new_pct=round((max(new) - min(new)) / np.median(new) * 100, 1) if new else None,
                 within_3pct=within, body_offset_max_pct=round(max(body), 1) if body else 0)
        stats[fam] = s
        S = L if len(L) <= maxn else [L[int(i * len(L) / maxn)] for i in range(maxn)]
        cw, ch = 192, 253; per = 6; nr = (len(S) + per - 1) // per
        sheet = Image.new('RGB', (per * (2 * cw + 30) + 20, 60 + nr * (ch + 40)), '#f5ecdc'); dr = ImageDraw.Draw(sheet)
        dr.text((10, 8), f'{fam}: {len(L)} ảnh (hiện {len(S)}) · CŨ | MỚI · mặt/khung cũ {s["old"]} → mới {s["new"]} · trong ±3%: {within}/{len(new)}', fill='#2a1a12', font=big)
        dr.text((10, 34), 'mỗi cặp: trái = cách cũ (1,14, dời lên 5 %), phải = jkpor (mặt cùng cỡ, đỉnh đầu cách mép 3 %, thân giữa)', fill='#6b5643', font=font)
        for i, k in enumerate(S):
            r, c = divmod(i, per); X = 10 + c * (2 * cw + 30); Y = 60 + r * (ch + 40)
            path = os.path.join(src, 'por-' + k + '.webp'); z, Lf, D = geo(F[k])
            sheet.paste(render(path, Z, .057, 0), (X, Y)); sheet.paste(render(path, z, Lf, D), (X + cw + 4, Y))
            fw = F[k][1] * z
            dr.text((X, Y + ch + 2), k[:34], fill='#2a1a12', font=font)
            dr.text((X, Y + ch + 18), f'mặt {F[k][1]*Z:.2f} → {fw:.2f} · z {z:.2f}' if F[k][1] > 0 else 'không thấy mặt: giữ 1,14', fill='#8f5f0c', font=font)
        sheet.save(os.path.join(out, f'por-{fam}.jpg'), quality=80)
    json.dump(stats, open(os.path.join(out, 'por_family.json'), 'w'), indent=1, ensure_ascii=False)
    for k, s in stats.items(): print(k, s)

if __name__ == '__main__':
    main(*sys.argv[1:5])
