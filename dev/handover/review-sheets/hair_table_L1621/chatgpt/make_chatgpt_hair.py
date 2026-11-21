#!/usr/bin/env python3
"""HAIR1 JOB 1b (owner L1630 via Foreman C #15): one ChatGPT prompt per rank -> one reference SHEET of the 10 bun shapes of that rank.
Built (owner L1567, B25) from: dev/art/MASTER_COMMON.txt (verbatim lines, listed in KEEP/DROP below),
the store rank words in dev/art/seasons4/ladder_base/s62_t{t}.txt (hair-ornament clause, HAIR rank law, flower size / no-flower, crown),
and the shapes of dev/art/hair/HAIR_TABLE.json. 0 gens. Output hair_t{1..8}.txt next to this file.
DROP from master (do not fit a head-and-shoulders hair sheet): line 3 full-body figure, 4 body proportions, 6-8 fabric, 9 legs/feet,
11 bare forehead kept, 12 held item, 14 'No text, no labels' (the sheet needs labels). Line 10 (whole face visible) is replaced by the
3/4-back view the Foreman asked for, keeping its closed-mouth part verbatim."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, *[".."] * 5))
M = [l.strip() for l in open(os.path.join(ROOT, "dev/art/MASTER_COMMON.txt"), encoding="utf-8") if l.strip()]
T = json.load(open(os.path.join(ROOT, "dev/art/hair/HAIR_TABLE.json"), encoding="utf-8"))
A = T["axes"]
RV = {1: "Đáp ứng", 2: "Thường tại", 3: "Quý nhân", 4: "Tần", 5: "Phi", 6: "Quý phi", 7: "Hoàng quý phi", 8: "Hoàng hậu"}

def store(t):
    s = open(os.path.join(ROOT, f"dev/art/seasons4/ladder_base/s62_t{t}.txt"), encoding="utf-8").read()
    one = lambda rx: (re.search(rx, s).group(0).strip() if re.search(rx, s) else "")
    orn = {1: r"pretty silver hairpins and a fresh flower(?= \()", 2: r"silver and pearl hairpins and a fresh flower(?= \()",
           3: r"two or three slim pearl hairpins set INTO her gathered hair[^;(]*?never a radiating crown of straight pins or spikes",
           4: r"gold and jade hairpins with small dangling gold bu yao tassels", 5: r"a LARGER gold headdress with dangling gold tassels and jade pins",
           6: r"a BIG ornate gold headdress with pearls, gold flowers and many gold tassels",
           7: r"a LARGE ornate gold phoenix crown \(.*?\) with pearl strands, kingfisher-blue inlay and a few gold tassels",
           8: r"the GRANDEST headdress of all: a FULL tall imperial nine-phoenix crown,[^.]*?pearl tassels at the sides"}[t]
    return dict(orn=one(orn), law=one(r"HAIR \(rank law\):[^.]*\."), flower=one(r"HAIR FLOWER SIZE:[^.]*\."),
                noflower=one(r"NO flowers in the hair or on the crown at this rank[^.]*\."), nophoenix=one(r"No phoenix anywhere on the robe or in the hair[^.]*\."))

def build(t):
    S = store(t); sh = A["shape"][f"t{t}"]; low = t <= 3
    p = []
    p.append(f"A clean HAIRSTYLE REFERENCE SHEET: one picture divided into a neat grid of 10 equal numbered panels (2 rows of 5), "
             f"each panel showing the SAME young woman (about 22, one same face, same natural dark hair colour) from the shoulders up, "
             f"in a three-quarter view from behind and to the side, so that the whole hairstyle and the back of her head are clearly visible "
             f"together with the side of her face. Only the hairstyle changes from panel to panel; the face, light and plain upper robe stay identical. "
             f"The upper robe is a plain simple silk robe with a crossed collar in soft ivory, no embroidery, so it does not distract from the hair.")
    p += [M[0], M[1], "Do not copy the hairstyle of the reference image either."]
    p.append("Plain light parchment background in every panel, soft even NEUTRAL white daylight, no yellow, golden or sepia colour cast.")
    p.append(M[4])
    p.append("Her expression: a bright closed-lip smile, lips closed, no teeth, mouth never open. " + M[10] + " NOTHING on the forehead (no hoa điền, no dot, no mark, nothing). Bare earlobes, no earrings.")
    if low:
        p.append(S["law"])
        p.append(f"Hair ornaments in every panel, set so the shape of the bun stays clearly readable: {S['orn']}. "
                 + S["flower"])
    else:
        p.append(S["law"] + " In each panel the chignon has the shape written for that panel.")
        if t <= 6:
            p.append(f"Hair ornaments in every panel, set so the shape of the chignon stays clearly readable: {S['orn']}. " + S["flower"])
        else:
            p.append(f"In every panel the chignon sits beneath the same headdress: {S['orn']}; the shape of the chignon must stay clearly readable around and behind the headdress. "
                     + S["noflower"])
    if S["nophoenix"] and t <= 6: p.append(S["nophoenix"])
    p.append(M[12] + " Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side.")
    p.append("THE 10 PANELS (each panel shows exactly this hairstyle):")
    loose = A["loose_t1_t3_a18_a26"]
    for i, (code, vi, en) in enumerate(sh):
        if low:
            d = f"only the top part of her hair is gathered into {en}, smooth and glossy; {loose[i % 3][1]}"
        else:
            d = f"all her hair swept up into {en}{' beneath the headdress' if t >= 7 else ''}, smooth and glossy, the side hair softly puffed, framing her face"
        p.append(f"Panel {i+1} ({code}): {d}.")
    labels = "; ".join(f'panel {i+1}: "{code} · {vi}"' for i, (code, vi, en) in enumerate(sh))
    p.append(f"LABELS: under each panel write its label in LARGE bold, easy-to-read Vietnamese WITH accents, on the plain background, never over the hair: {labels}.")
    p.append(f'CAPTION: write this exact Vietnamese caption in LARGE bold letters at the top-left of the sheet, on the plain background: "Bảng kiểu búi · Bậc {t} {RV[t]} · 10 dáng búi (L1621)"')
    return "\n\n".join(p) + "\n"

if __name__ == "__main__":
    for t in range(1, 9):
        txt = build(t); fn = os.path.join(HERE, f"hair_t{t}.txt"); open(fn, "w", encoding="utf-8").write(txt)
        print(fn, len(txt))
