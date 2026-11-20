#!/usr/bin/env python3
"""DESIGN1 round 2 (owner 20/11 ~17:55Z via Foreman C: DESIGN1 round-1 designs rejected; thân cận must look like 'the step after nhất đẳng':
2-3 visible layers, idea 1 ~ nhất đẳng round 5 (maid7/test5_nhat.txt, ov6GUhR829), ideas 2-4 new designs on the same idea).
Base = base_nhat_v5.txt (copy of maid7/test5_nhat.txt, m18). Per person: face+expression taken from live_<id>.txt (build.py <id> v0 --state tm2 --nostyle).
Swaps (asserted): face block, who-line, outfit sentence, COLOUR RULE/TWO-COLOUR/PLACEMENT, held item; + no-broom. Builder untouched.
Colours: K24 + maid-edits item 2 — THÂN CẬN = reversed nhất đẳng: SKIRT (+ sleeves) = her OWN main colour, the outer layer = cung nữ powder blue."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
BLUE = "powder blue like #A7BAD2"
SLV = "Sleeves about two and a half hand-spans wide, a palace maid's sleeves (never a consort's long trailing wide sleeves)."
NC = "(never a standing collar, never a square neckline)"
RICH = ("richer than a nhất đẳng maid's uniform: denser fine flower embroidery on every border, each border edged with a thin gold line")
base = rd("base_nhat_v5.txt")
FACE_RE = re.compile(r"Her face: .*? (?=From the identity reference)")
WHO_OLD = "A first-rank palace maid (cung nu, nhat dang), the highest palace maid rank, clearly finer than a nhị đẳng maid."
WHO_NEW = ("A personal attendant palace maid (cung nữ thân cận) serving a high-ranking imperial consort (Phi rank): the rank ABOVE a first-rank (nhất đẳng) maid, "
           "her mistress's most trusted maid, clearly richer than a nhất đẳng maid, yet plainly PALACE STAFF in a servant's uniform, never a consort.")
OUT_RE = re.compile(r"Outfit \(a first-rank palace maid, nhất đẳng, never poor\):.*?\(never a consort's long trailing wide sleeves\)\.")
COL_RE = re.compile(r"COLOUR RULE: RECOLOUR the whole costume.*?are deep rose\.")
ITEM = "she holds an embroidered handkerchief in a contrasting colour,"
V = {
 "m15": dict(main="blush pink", y=1, sig="Như nhất đẳng, bậc trên", item="a small covered lacquered jewellery box for her mistress",
  out=("Outfit (cung nữ thân cận uniform, IDEA 1, the step after the nhất đẳng uniform): the SAME three layers as a nhất đẳng maid, one step richer: "
       "a crossed-collar inner robe with wide layered sleeves hanging softly, each with a broad embroidered cuff band; over it a sleeveless embroidered over-vest whose straight front edges "
       "meet at the chest under one jade knot clasp {nc}, with a broad gold-edged embroidered band down both front edges; from the waist TWO separate long embroidered front panels (hai tà, never one single panel), "
       "one down each side of the front, each with a gold-edged border, the centre of the skirt showing between them, PLUS a short embroidered peplum layer at the hip over the panels (the one extra layer of a thân cận); "
       "a layered softly pleated ankle-length skirt with a wide band of flower embroidery along the hem; a wide silk sash at the waist, a jade pendant on a silk cord with a tassel at the centre; "
       "{rich}; hair in neat double-loop buns with several silver and pearl hairpins, no extra jewellery; soft slippers; the sleeves: {slv}"),
  place="the long SKIRT and the WHOLE SLEEVES of the inner robe are {main}; the sleeveless over-vest, its two front panels and the peplum are {blue}"),
 "m12": dict(main="warm sand apricot", y=2, sig="Áo lửng tay ngắn dài gối", item="a folded silk cloak for her mistress draped over both forearms",
  out=("Outfit (cung nữ thân cận uniform, IDEA 2, the step after the nhất đẳng uniform): THREE clearly visible layers: a crossed-collar inner robe with wide layered sleeves "
       "hanging softly, each with a broad embroidered cuff band; over it a KNEE-LENGTH HALF-SLEEVE over-robe (long banbi) whose short wide sleeves end just above the elbow showing the long inner sleeves below, "
       "its straight front edges meeting at the chest under one jade knot clasp {nc}, slit at both sides from the hip, with a broad gold-edged embroidered band along the front edges, the half-sleeve edges and the hem; "
       "under it a layered softly pleated ankle-length skirt with a wide band of flower embroidery along the hem; a wide silk sash at the waist over the over-robe, a jade pendant on a silk cord with a tassel; "
       "{rich}; hair in neat double-loop buns with several silver and pearl hairpins, no extra jewellery; soft slippers; the sleeves: {slv}"),
  place="the long SKIRT and the WHOLE long SLEEVES of the inner robe are {main}; the knee-length half-sleeve over-robe is {blue} with {main} embroidered bands"),
 "m13": dict(main="lilac", y=3, sig="Áo dài vạt xẻ, nẹp thêu dài", item="a rolled palace register scroll for her mistress",
  out=("Outfit (cung nữ thân cận uniform, IDEA 3, the step after the nhất đẳng uniform): THREE clearly visible layers: a crossed-collar inner robe with wide layered sleeves "
       "hanging softly, each with a broad embroidered cuff band; over it a long sleeveless over-robe reaching the mid-calf, its two straight front edges each bordered by a LONG broad embroidered band "
       "running from the shoulder down to the hem {nc}, the edges meeting at the waist under a wide silk sash, the over-robe slit high at both sides so it opens into front and back flaps as she stands; "
       "under it a layered softly pleated ankle-length skirt with a wide band of flower embroidery along the hem; a jade pendant on a silk cord with a tassel at the sash; "
       "{rich}; hair in neat double-loop buns with several silver and pearl hairpins, no extra jewellery; soft slippers; the sleeves: {slv}"),
  place="the long SKIRT and the WHOLE SLEEVES of the inner robe are {main}; the long sleeveless over-robe is {blue} with {main} embroidered front bands"),
 "m07": dict(main="pale jade green", y=4, sig="Ba tầng áo bậc thang", item="a small sewing basket of smooth polished wood with thread",
  out=("Outfit (cung nữ thân cận uniform, IDEA 4, the step after the nhất đẳng uniform): THREE TIERED layers like steps, each hem clearly showing below the one above: "
       "a short waist-length jacket with wide sleeves and a broad gold-edged embroidered border around its rounded front edges and hem, closed at the chest by one jade knot clasp {nc}; "
       "under it a knee-length crossed-collar inner robe with its own embroidered hem band showing below the jacket; under that a layered softly pleated ankle-length skirt with a wide band of flower embroidery along the hem; "
       "the sleeves of the jacket hang softly with a broad embroidered cuff band, the inner robe's cuff showing a little inside; a wide silk sash at the waist, a jade pendant on a silk cord with a tassel; "
       "{rich}; hair in neat double-loop buns with several silver and pearl hairpins, no extra jewellery; soft slippers; the sleeves: {slv}"),
  place="the long SKIRT and the knee-length inner robe are {main}; the waist-length jacket with its sleeves is {blue} with {main} embroidered borders"),
}
for m, v in V.items():
    s = base
    face = FACE_RE.search(rd(f"live_{m}.txt")).group(0)
    s = sw(s, FACE_RE.search(s).group(0), face)
    s = sw(s, WHO_OLD, WHO_NEW)
    s = sw(s, OUT_RE.search(s).group(0), v["out"].format(nc=NC, rich=RICH, slv=SLV))
    col = COL_RE.search(s).group(0)
    new = (f"COLOUR RULE: THÂN CẬN COLOURS (the reverse of a nhất đẳng maid): her own {v['main']} is the MAIN colour, a soft, gentle, held-back medium tone "
           f"(clear but quiet, never fresh or bright, never pale or pastel-washed, never dark, never grey, never brown), the embroidery in fine gold and lighter tones. "
           f"TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {v['main']} and the SECONDARY colour {BLUE}, the secondary clearly visible in large areas "
           f"(inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour. "
           f"COLOUR PLACEMENT: " + v["place"].format(main=v["main"], blue=BLUE) + ".")
    s = sw(s, col, new)
    s = sw(s, ITEM, f"she holds {v['item']} in a contrasting colour,")
    s = sw(s, " Pose:", " She never holds a broom. Pose:")
    assert len(s) <= 10000 and "earring" not in s.lower().replace("no earrings", ""), (m, len(s))
    open(os.path.join(D, f"test2_{m}.txt"), "w", encoding="utf-8").write(s)
    print(m, v["y"], v["sig"], len(s))
