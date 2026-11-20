#!/usr/bin/env python3
"""DESIGN7 (owner Lượt 1361 via Foreman C #6; prompts only, 0 cr). CURRENT outfit (= Thu/autumn) t4 Tần .. t8 Hoàng hậu get the SAME
LAYERED NECKLINE as dapung4/s62_t{1,2,3}_COMOI_v2.txt (inner square-neck top + open outer robe whose front edges fall from the shoulders,
neck + collarbones visible), each rank's signature piece kept word for word and re-seated OPEN at the front over the shoulders.
Embroidery flower -> F2 species for s62 (n=62 -> index 1): t4 lotus flowers, t5 double hollyhocks, t6/t7/t8 incurved chrysanthemums
(Lượt 1352/1342, t8-prompt-B/build.py F2_FL). Only collar words + flower names + CAPTION change; boilerplate trims listed in .keep."""
import os
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rd(p): return open(os.path.join(ART, p), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", s.count(a), a[:120]); return s.replace(a, b, 1)
CAP = '\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "{}"\n'
NO = "never a round collar, never a V, NO crossed wrap collar"
SHORT = False
def layer(edge, outer_edge, outer, inner="mint mist"):
    if SHORT:   # compact form (same meaning, as seasons4/make_comoi.py short()) for bases near 10 000
        return (f"a LAYERED NECKLINE: a {inner} inner top with a low straight SQUARE neckline edged by {edge}, under {outer} worn OPEN at the front, "
                f"its two front edges ({outer_edge}) falling from both shoulders, neck and collarbones visible; NO crossed wrap collar")
    return (f"a LAYERED NECKLINE (two-garment look): a fitted {inner} INNER top (like a tube-top bodice) with a low straight SQUARE neckline across the upper chest, "
            f"showing her neck and collarbones, that square neckline edged by {edge}; OVER it {outer} worn OPEN at the front, its two straight front edges ({outer_edge}) "
            f"running from behind the neck over BOTH shoulders and straight down each side of the chest, framing the bordered square neckline; {NO}")
# boilerplate repeats trimmed only where needed for <= 10 000 (listed as allow lines in the .keep)
TRIM = [(" Full-body standing figure head to feet, centered, plain light parchment background, soft even light; fair porcelain skin;", ""),
        (" HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back.", ""),   # repeats the 'Hair:' clause
        (" HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body.", ""),   # = ANGLE clause 'her head turns together with her shoulders and body'
        (" The item is in a contrasting colour, not the robe colour, and the hand really grips it;", " The hand really grips it;")]   # = HELD ITEM COLOUR rule
OPEN = "OPEN at the front (its lobes resting on the shoulders and back, never covering the neck or the square inner neckline), "
def mkJ():
  return {
 4: ("b26/s62_t4.txt", "Mùa Thu · Thiết kế hiện tại · Tần · Áo choàng nhỏ + cổ mở", [
     ("WIDE gold-thread embroidered borders of plum blossoms at sleeves and hem, a few LARGE embroidered plum blossoms on the robe",
      "WIDE gold-thread embroidered borders of lotus flowers at sleeves and hem, a few LARGE embroidered lotus flowers on the robe"),
     ("a crossed collar,", layer("a richer gold-brocade band (the Tần edge)", "a slim gold edge", "the ice blue outer robe") + ","),
     ("over only the shoulders and upper chest, a jade clasp at the throat, with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat from the throat over the WHOLE capelet,",
      "over only the shoulders and the outer upper chest, OPEN at the front (never hiding the neck or the square inner neckline), its two front edges loosely linked low on the chest by a small jade clasp on a short silk cord, with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat from the shoulders over the WHOLE capelet,"),
     ("the robe closes only at the throat clasp, never buttoned down the front,",
      "the outer robe closes only at the sash, never at the throat, never buttoned down the front,"),
     ('"Bậc Tần · Vải đoạn mờ"\n', "")]),
 5: ("b26/s62_t5_v2.txt", "Mùa Thu · Thiết kế hiện tại · Phi · 2 choàng vai + lưới ngọc trai + cổ mở", [
     ("a layered satin (đoạn) court robe of two or three visible layers,",
      "a layered satin (đoạn) court robe of two or three visible layers with " + layer("a wide gold-embroidered band (the Phi edge)", "a slim gold-edged band", "the ice blue outer robe") + "; the robe"),
     ("richly embroidered in gold with peonies and small birds", "richly embroidered in gold with double hollyhocks and small birds"),
     ("in gold thread with small peonies,", "in gold thread with small double hollyhocks,"),
     ("large peony medallions", "large double hollyhock medallions"),
     ("(the upper cape shorter, the lower cape a little longer, both resting on the shoulders)",
      "(the upper cape shorter, the lower cape a little longer, both resting on the shoulders, OPEN at the front)"),
     ("(the same kind of beaded pearl net as the Tần's capelet), never covering the neckline,",
      "(the same kind of beaded pearl net as the Tần's capelet), never covering the neckline, never hiding the neck or the square inner neckline,"),
     ('"Bậc Phi · Vải đoạn mờ"\n', "")]),
 6: ("swap56/s62_t6_v2.txt", "Mùa Thu · Thiết kế hiện tại · Quý phi · Vân kiên cổ cuộn mây + cổ mở", [
     ("a HEAVY silk brocade robe in SATURATED ice blue silk,",
      "a HEAVY silk brocade robe in SATURATED ice blue silk with " + layer("a pearl-edged gold band (the Quý phi edge)", "slim, pearl-edged", "the ice blue outer robe") + "; the robe"),
     ("embroidered with peonies and plum blossoms in ice blue and gold thread", "embroidered with incurved chrysanthemums in ice blue and gold thread"),
     ("an embroidered ice blue cloud collar (yunjian) over the shoulders with",
      "an embroidered ice blue cloud collar (yunjian) over the shoulders, " + OPEN + "with"),
     ('"Bậc Quý phi · Vân kiên cổ cuộn mây"\n', "")]),
 7: ("rank8-s62/s62_t7.txt", "Mùa Thu · Thiết kế hiện tại · Hoàng quý phi · Áo choàng ngọc + cổ mở", [
     ("a near-empress ceremonial robe of ice blue silk,",
      "a near-empress ceremonial robe of ice blue silk with " + layer("a broad royal-yellow brocade band studded with pearls (the Hoàng quý phi edge, her broad yellow collar)", "a slim gold-and-pearl band", "the ice blue outer robe") + "; the robe"),
     ("phoenixes, peonies and auspicious clouds", "phoenixes, incurved chrysanthemums and auspicious clouds"),
     ("a jewelled cloud-collar cape edged with pearls and gold over the shoulders,",
      "a jewelled cloud-collar cape edged with pearls and gold over the shoulders, " + OPEN.rstrip(", ") + ","),
     ]),
 8: ("rank8-s62/s62_t8.txt", "Mùa Thu · Thiết kế hiện tại · Hoàng hậu · Áo choàng lễ + vân kiên ngọc trai + cổ mở", [
     ("the Empress's imperial phoenix ceremonial robe of golden yellow silk mixed with ice blue,",
      "the Empress's imperial phoenix ceremonial robe of golden yellow silk mixed with ice blue, with " + layer("a broad gold-brocade band studded with pearls (the Hoàng hậu edge)", "a slim gold-and-pearl band", "the golden yellow outer robe", inner="ice blue") + "; the robe"),
     ("large phoenixes, peonies and clouds", "large phoenixes, incurved chrysanthemums and clouds"),
     ("a long ceremonial silk mantle falling from the shoulders to the floor,",
      "a long ceremonial silk mantle falling from the shoulders to the floor, open at the front,"),
     ("cloud collar with layered pearl fringes over the shoulders,",
      "cloud collar with layered pearl fringes over the shoulders, " + OPEN.rstrip(", ") + ","),
     ]),
  }
def build(n):
    base, cap, swaps = mkJ()[n]
    s = rd(base)
    for a, b in swaps: s = sw(s, a, b)
    s = s.rstrip("\n")
    if s.endswith("write exactly this Vietnamese text WITH accents:"):   # old caption line emptied above -> drop it
        s = s[:s.rindex("\nCAPTION:")].rstrip("\n")
    s = s + "\n" + CAP.format(cap)
    for a, b in TRIM:
        if len(s) > 10000 and a in s: s = s.replace(a, b, 1); print("  trim t%d:" % n, a[:50])
    return s
for n in (4, 5, 6, 7, 8):
    SHORT = False; s = build(n)
    if len(s) > 10000: SHORT = True; s = build(n); print("  t%d: compact layered-neckline form" % n)
    assert len(s) <= 10000, (n, len(s))
    out = os.path.join(ART, "thu_comoi", f"s62_t{n}_THU_COMOI.txt")
    open(out, "w", encoding="utf-8").write(s); print(out, len(s))
