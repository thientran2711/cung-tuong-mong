#!/usr/bin/env python3
"""THANCAN1 (owner 20/11 ~16:00Z, brief dev/handover/briefs/thancan1.md; rules K20 + K24 colours + A35 variants on different people).
Builder untouched. Input = live builder output live_<id>.txt (build.py <id> --state tm2 --nostyle, a18).
Output = test_<id>.txt. Every swap asserted (exactly one hit). Only outfit / who / colour / item / hair sentences change.
K24 (owner 20/11 ~16:10Z, overrides the brief colour line): THÂN CẬN MAIN = her OWN main colour (dominant), SECONDARY = cung nữ powder blue."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:90]); return s.replace(a, b, 1)
BLUE = "powder blue like #A7BAD2"          # K19 cung nữ uniform blue (MAID7 round 3 words)
HAIR = " HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders, NO ribbons in the hair."   # = make3.py (build_mama --oneref)
NOBROOM = " She never holds a broom."       # K23
WHO_OLD = "A senior palace maid (cung nu, nhi dang), clearly finer than an ordinary maid."
WHO_NEW = ("A personal attendant palace maid (cung nữ thân cận) serving a high-ranking imperial consort (Phi rank): her mistress's most trusted maid, "
           "neat, capable and finer than any ordinary maid, yet plainly PALACE STAFF in a servant's uniform, never a consort.")
STAFF = (" She reads at a glance as palace staff: practical, tidy and ready to serve; NO floor-sweeping consort sleeves, NO long trailing robe, "
         "NO crown, NO phoenix, NO big hair jewellery. Embroidery is MODERATE (the uniform of a Phi's attendant): only on the border bands and the one badge or token named above, never covering the body of the garment.")
OUT_RE = re.compile(r"Outfit \(a senior palace maid, nhị đẳng\):.*?\(never a consort's long trailing wide sleeves\)\.")
ITEM_RE = re.compile(r"she holds (.*?) in a contrasting colour, not the robe colour,")
HAIRPINS = "neat double-loop buns with several silver and pearl hairpins"   # builder tm2 hair words, kept in every variant

V = {
 # A: long sleeveless tabard-bijia with a round palace badge, narrow bound sleeves of the blue inner robe
 "m02": dict(main="moss green", kieu="A", item="a neatly folded silk cloak for her mistress draped over both forearms",
  out=("Outfit (cung nữ thân cận uniform, KIỂU A): a long SLEEVELESS straight-cut over-vest (bijia) in {main} reaching just below the knee, open at the sides, "
       "its straight front edges meeting at the centre, with a broad embroidered border band along the front edges and hem, and a small ROUND embroidered badge "
       "of her mistress's palace (a flower roundel) on the chest; under it a fitted cross-collar inner robe in {blue} with NARROW sleeves bound at the wrist with {main} cuffs; "
       "a softly pleated ankle-length skirt in {main}; a narrow {blue} sash tied at the waist; {hair}; clearly finer than an ordinary maid. "
       "Sleeves narrow and practical, a palace servant's sleeves (never a consort's long trailing wide sleeves).")),
 # B: cropped standing-collar jacket + horse-face skirt with blue panels + jade waist token with tassel
 "m04": dict(main="warm apricot", kieu="B", item="a sealed folded letter for her mistress",
  out=("Outfit (cung nữ thân cận uniform, KIỂU B): a SHORT waist-length jacket in {main} with a STANDING collar (lijing) closed at the throat by one small gold button, "
       "a slim embroidered band along the collar and the front opening, fitted sleeves of moderate width ending at the wrist with {blue} cuff bands; "
       "a pleated horse-face skirt (mamianqun) in {main} to the ankle, its two flat FRONT PANELS in {blue} with one narrow embroidered hem band; "
       "a {main} silk sash with a clearly visible rectangular JADE WAIST TOKEN (yaopai) hanging on a {blue} silk tassel cord, the token of her mistress's palace; "
       "{hair}; clearly finer than an ordinary maid. Sleeves about one and a half hand-spans wide, a palace servant's sleeves (never a consort's long trailing wide sleeves).")),
 # C: knee-length crossed wrap tunic with broad blue collar band + wide blue ribbon sash tied in a fixed double-loop knot with long ends
 "m09": dict(main="rose pink", kieu="C", item="a long slim brocade fan case for her mistress",
  out=("Outfit (cung nữ thân cận uniform, KIỂU C): a knee-length wrap-over tunic in {main} with a crossed collar (jiaoling) closing to the right, "
       "a BROAD {blue} collar band running from the neck down to the waist, embroidered with a slim border of small flowers; sleeves of moderate width GATHERED into "
       "bound {blue} cuffs at the wrist; a WIDE {blue} ribbon sash wrapped twice round the waist and tied at the front in a FIXED double-loop knot with two long ribbon ends "
       "hanging to the knee (the set knot of a thân cận maid); a softly pleated ankle-length skirt in {main} with a narrow embroidered hem band; "
       "{hair}; clearly finer than an ordinary maid. Sleeves about one and a half hand-spans wide, a palace servant's sleeves (never a consort's long trailing wide sleeves).")),
 # D: four-lobed cloud collar shoulder cape over a long narrow-sleeved robe
 "m14": dict(main="ivory white", kieu="D", item="a small covered lacquered jewellery box for her mistress",
  out=("Outfit (cung nữ thân cận uniform, KIỂU D): a long narrow-sleeved robe in {main} with a round collar, reaching the ankle, slit at the sides over a {main} skirt; "
       "over the shoulders a four-lobed CLOUD COLLAR shoulder cape (yunjian) in {blue}, its lobes falling over chest, back and both shoulders, edged with a slim "
       "embroidered border and a small embroidered medallion in the front lobe; a {blue} belt at the waist with a small knotted tassel; "
       "{hair}; clearly finer than an ordinary maid. Sleeves narrow and practical, a palace servant's sleeves (never a consort's long trailing wide sleeves).")),
}
out = {}
for m, v in V.items():
    s = rd(f"live_{m}.txt")
    old_main = re.search(r"Outfit \(a senior palace maid, nhị đẳng\): a fine silk ruqun in ([^,]+),", s).group(1)
    s = sw(s, WHO_OLD, WHO_NEW)
    o = OUT_RE.search(s).group(0); assert s.count(o) == 1
    s = sw(s, o, v["out"].format(main=v["main"], blue=BLUE, hair=HAIRPINS) + STAFF)
    s = sw(s, f"never dusty or grey; her main colour {old_main}.",
           f"never dusty or grey; THÂN CẬN COLOURS: the MAIN colour is her own {v['main']}, dominant over most of the uniform; "
           f"the SECONDARY colour is the palace maid {BLUE}, clearly visible in large areas as written in the outfit; no third main colour.")
    it = ITEM_RE.search(s).group(1)
    s = sw(s, f"she holds {it} in a contrasting colour, not the robe colour,", f"she holds {v['item']} in a contrasting colour, not the robe colour,")
    s = sw(s, " Pose:", HAIR + NOBROOM + " Pose:")
    assert len(s) <= 10000 and "broom" not in s.replace(NOBROOM, "") and "earring" not in s.lower().replace("no earrings", ""), m
    out[m] = (s, old_main, it)
    open(os.path.join(D, f"test_{m}.txt"), "w", encoding="utf-8").write(s)
    print(m, v["kieu"], len(s), "| old main:", old_main, "| old item:", it)
