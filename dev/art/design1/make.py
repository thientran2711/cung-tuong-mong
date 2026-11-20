#!/usr/bin/env python3
"""DESIGN1 (Foreman C, owner 20/11 ~16:50Z: thân cận 4 designs rejected — consort collar + not distinctive; sleeves ~ nhất đẳng).
Builder untouched. Input live_<id>.txt = build.py <id> v0 --state tm2 --nostyle (a18; style image retired, one ref, = THANCAN1/MAID7).
Output test_<id>.txt. Every swap asserted. Changed: who-line, outfit+sleeve sentence (+STAFF), colour sentence, held item, + HAIR + no broom.
Colours (K24 + maid-edits item 2): MAIN = her OWN colour = the SKIRT; SECONDARY = cung nữ powder blue (jacket etc).
Collar: NEVER a consort collar (G17/G22 square neckline, standing collar, plain crossed collar of t1-t3 G21).
Sleeves: = nhất đẳng round-1 sentence (maid7/test_nhat.txt, the smaller one, owner item 4/8)."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
BLUE = "powder blue like #A7BAD2"
HAIR = " HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders, NO ribbons in the hair."
NOBROOM = " She never holds a broom."
HAIRPINS = "neat double-loop buns with several silver and pearl hairpins"
SLEEVE = "Sleeves about two and a half hand-spans wide, a palace maid's sleeves (never a consort's long trailing wide sleeves)."
NOCOLLAR = "(never a standing collar, never a square neckline, never a crossed wrap collar)"
WHO_OLD = "A senior palace maid (cung nu, nhi dang), clearly finer than an ordinary maid."
WHO_NEW = ("A personal attendant palace maid (cung nữ thân cận) serving a high-ranking imperial consort (Phi rank): her mistress's most trusted maid, "
           "neat, capable and finer than any ordinary maid, yet plainly PALACE STAFF in a servant's uniform, never a consort.")
STAFF = (" She reads at a glance as palace staff: practical, tidy and ready to serve; NO floor-sweeping consort sleeves, NO long trailing robe, "
         "NO crown, NO phoenix, NO big hair jewellery. Embroidery is MODERATE (the uniform of a Phi's attendant): only on the trims and the one signature piece named above, never covering the body of the garment.")
OUT_RE = re.compile(r"Outfit \(a senior palace maid, nhị đẳng\):.*?\(never a consort's long trailing wide sleeves\)\.")
ITEM_RE = re.compile(r"she holds (.*?) in a contrasting colour, not the robe colour,")
V = {
 # 1 Ming palace-maid round-collar jacket with the hollyhock chest badge (团领 + 葵花胸背)
 "m05": dict(main="coral red", y=1, sig="Huy hiệu hoa quỳ", item="a small covered lacquered seal box for her mistress",
  out=("Outfit (cung nữ thân cận uniform, IDEA 1): a hip-length jacket in {blue} with a low ROUND collar (yuanling): a smooth round {main} neckband lying flat around the base of the neck, "
       "closing at the right shoulder with one small knot button {nc}; on the centre of the chest a large ROUND embroidered BADGE about a palm and a half across: a hollyhock flower roundel "
       "in {main} and fine gold thread on a {blue} ground, framed by a thin gold ring (the badge of her mistress's palace, clearly visible from far away); {blue} sleeves with {main} cuff bands; "
       "a long softly pleated ankle-length skirt in {main}, the largest colour of her uniform; a narrow {main} sash at the waist; {hair}; clearly finer than an ordinary maid. {sl}")),
 # 2 Tang/Song half-sleeve over-jacket (半臂 banbi) with broad edging, over a full-sleeved inner top and high-waisted skirt
 "m08": dict(main="peach-salmon", y=2, sig="Áo bán tý", item="a folded embroidered handkerchief for her mistress",
  out=("Outfit (cung nữ thân cận uniform, IDEA 2): a cropped HALF-SLEEVE over-jacket (banbi) in {blue} reaching the high waist, its short flared sleeves ending above the elbow, "
       "edged all round with a BROAD {main} band embroidered with small flowers, closed at the centre of the chest by two {main} ribbon ties; at the neck a soft low U-shaped scoop neckline "
       "{nc}; under it an inner top in {blue} with full long sleeves coming out below the half sleeves, ending in {main} cuff bands; a high-waisted ankle-length pleated skirt in {main}, "
       "the largest colour of her uniform, its waistband just under the jacket; {hair}; clearly finer than an ordinary maid. {sl}")),
 # 3 straight parallel collar jacket (对襟直领) + diagonal shoulder sash band (绶带) ending in a palace token
 "m10": dict(main="sage green", y=3, sig="Dải lụa chéo vai", item="a rolled palace register scroll for her mistress",
  out=("Outfit (cung nữ thân cận uniform, IDEA 3): a hip-length jacket in {blue} with a STRAIGHT parallel collar (duijin): two flat {main} collar bands running straight down from the neck "
       "side by side, meeting edge to edge at the centre, held closed at the chest by one small jade clasp {nc}; ACROSS the body from the LEFT shoulder to the RIGHT hip a broad {main} "
       "silk SASH BAND (shoudai) one hand wide, embroidered along both edges in fine gold thread, ending at the hip in a small round jade palace token with a {main} tassel (clearly visible from far away); "
       "{blue} sleeves with {main} cuff bands; a long softly pleated ankle-length skirt in {main}, the largest colour of her uniform; {hair}; clearly finer than an ordinary maid. {sl}")),
 # 4 curved side-closure jacket (大襟) with the THREE-STRIPE trim border (镶滚)
 "m16": dict(main="lavender purple", y=4, sig="Ba đường viền", item="a small sewing basket of smooth polished wood with thread",
  out=("Outfit (cung nữ thân cận uniform, IDEA 4): a hip-length jacket in {blue} with a curved SIDE closure (dajin): a smooth low round neckline from which the front edge curves across the chest "
       "to the right underarm, fastened with three small knot buttons {nc}; along that curved front edge, around the jacket hem and at both cuffs run THREE parallel trim bands in {main}: one broad "
       "embroidered band between two thin plain lines (the three-stripe border of a thân cận maid, clearly visible from far away); a long softly pleated ankle-length skirt in {main}, the largest "
       "colour of her uniform, with the same three-stripe border at its hem in {blue}; {hair}; clearly finer than an ordinary maid. {sl}")),
}
for m, v in V.items():
    s = rd(f"live_{m}.txt")
    old_main = re.search(r"Outfit \(a senior palace maid, nhị đẳng\): a fine silk ruqun in ([^,]+),", s).group(1)
    assert old_main == v["main"], (m, old_main)
    s = sw(s, WHO_OLD, WHO_NEW)
    o = OUT_RE.search(s).group(0)
    s = sw(s, o, v["out"].format(main=v["main"], blue=BLUE, hair=HAIRPINS, nc=NOCOLLAR, sl=SLEEVE) + STAFF)
    s = sw(s, f"never dusty or grey; her main colour {old_main}.",
           f"never dusty or grey; THÂN CẬN COLOURS: the MAIN colour is her own {v['main']}: the SKIRT, the largest area of the uniform, plus the trims named in the outfit; "
           f"the SECONDARY colour is the palace maid {BLUE}: the jacket, clearly visible; no third main colour.")
    it = ITEM_RE.search(s).group(1)
    s = sw(s, f"she holds {it} in a contrasting colour,", f"she holds {v['item']} in a contrasting colour,")
    s = sw(s, " Pose:", HAIR + NOBROOM + " Pose:")
    assert len(s) <= 10000 and "broom" not in s.replace(NOBROOM, "") and "earring" not in s.lower().replace("no earrings", ""), m
    open(os.path.join(D, f"test_{m}.txt"), "w", encoding="utf-8").write(s)
    print(m, v["y"], v["sig"], len(s))
