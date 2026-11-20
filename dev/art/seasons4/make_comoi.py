#!/usr/bin/env python3
"""DESIGN1 (owner 20/11 via Foreman C #3; prompts only, 0 cr). LAYERED NECKLINE (owner-liked look dapung4/s62_t{2,3}_*_COMOI.txt):
inner tube-like top with a square neckline + an outer robe worn OPEN, its two front edges falling from the shoulders.
FAULT fixed: the inner square neckline MUST carry that rank's ORIGINAL square-neck border (t1 plain narrow band; t2 two stacked bands with
small embroidered flowers; t3 wide stiff embroidered band); the outer front edges = a simple matching edge. Only collar words change.
JOB A -> dapung4/s62_t{1,2,3}_COMOI_v2.txt ; JOB B (spring = current design) t4-t7 same layered neckline, each rank's signature piece kept but
re-cut OPEN at the front, never hiding the neck -> seasons4/s62_t{4..7}_XUAN_COMOI.txt. Base = ladder_base/s62_tN.txt (build_all.py s62 N).
Phi bạch kept (spring = silk). CAPTION line (G31)."""
import os
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D)
def rd(n): return open(os.path.join(D, "ladder_base", n), encoding="utf-8").read()
def sw(s, a, b):
    assert s.count(a) == 1, ("slot", a[:100]); return s.replace(a, b, 1)
CAP = '\nCAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents: "{}"\n'
def layer(edge, outer_edge, outer="the ice blue outer robe"):
    return ("a LAYERED NECKLINE (two-garment look): a fitted mint mist INNER top (like a tube-top bodice) with a low straight SQUARE neckline across the upper chest, "
            f"showing her neck and collarbones, that square neckline edged by {edge}; OVER it {outer} worn OPEN at the front, its two straight front edges ({outer_edge}) "
            "running from behind the neck over BOTH shoulders and straight down each side of the chest, framing the bordered square neckline; ")
def short(edge, outer_edge):   # compact form for the longest bases (t6), same meaning
    return (f"a LAYERED NECKLINE: a mint mist inner top with a low straight SQUARE neckline edged by {edge}, under the OPEN outer robe, "
            f"its front edges ({outer_edge}) falling from both shoulders, neck and collarbones visible; ")
NO = "never a round collar, never a V, NO crossed wrap collar;"
J = {
 1: ("dapung4/s62_t1_COMOI_v2.txt", "Đáp ứng · Áo trong cổ vuông viền trơn + áo ngoài mở",
     [("a snug upper garment with an OPEN SQUARE NECKLINE (style 1, simple): a low, simple straight-edged square opening that shows her neck and collarbones, edged only by a narrow plain mint mist silk band with no embroidery on it; " + NO,
       "a snug upper garment with " + layer("a narrow plain mint mist silk band with no embroidery on it (the Đáp ứng edge)", "a simple narrow plain mint mist edge", "the ice blue upper garment") + NO)]),
 2: ("dapung4/s62_t2_COMOI_v2.txt", "Thường tại · Áo trong cổ vuông viền hoa mai 2 lớp + áo ngoài mở",
     [("a fine silk robe with an OPEN SQUARE NECKLINE (style 1 cut, Thường tại edge): the SAME low, simple, narrow straight-edged square opening as the lowest rank (NOT wide, NOT stretched toward the shoulders), showing her neck and collarbones, its edge a LAYERED border of two stacked narrow bands, a thin mint mist piping inside and a narrow band of small embroidered plum blossoms outside; " + NO,
       "a fine silk outfit with " + layer("a LAYERED border of two stacked narrow bands, a thin mint mist piping inside and a narrow band of small embroidered plum blossoms outside (the Thường tại edge)", "a simple thin mint mist piping") + NO)]),
 3: ("dapung4/s62_t3_COMOI_v2.txt", "Quý nhân · Áo trong cổ vuông viền thêu rộng + áo ngoài mở",
     [("an ankle-length ice blue silk court robe with a straight SQUARE NECKLINE framed by a wide stiff mint mist embroidered plum blossoms band;",
       "an ankle-length ice blue silk court robe with " + layer("a wide stiff mint mist band embroidered with plum blossoms (the Quý nhân edge)", "a simple narrow mint mist band") + NO)]),
 4: ("seasons4/s62_t4_XUAN_COMOI.txt", "Mùa Xuân · Thiết kế hiện tại · Tần · Áo choàng nhỏ + cổ mở",
     [("a crossed collar,", layer("a richer gold-brocade band", "a slim gold edge", "the outer robe")),
      ("a short round embroidered silk capelet (not cloud-shaped, scalloped or pointed) over only the shoulders and upper chest, a jade clasp at the throat, with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat from the throat over the WHOLE capelet,",
       "a short round embroidered silk capelet (not cloud-shaped, scalloped or pointed) over only the shoulders, OPEN at the front (never closing at the throat, never hiding the neck), with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat over the WHOLE capelet,"),
      ("the robe closes only at the throat clasp, never buttoned down the front,", "the outer robe closes only at the sash, never at the throat or down the front,")]),
 5: ("seasons4/s62_t5_XUAN_COMOI.txt", "Mùa Xuân · Thiết kế hiện tại · Phi · Vân kiên + cổ mở",
     [("a layered silk brocade court robe of two or three visible layers,", "a layered silk brocade court robe of two or three visible layers with " + layer("a wide gold-embroidered band (the Phi edge)", "a slim gold-edged band", "the outer robe")),
      ("an embroidered cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels,",
       "an embroidered cloud collar (yunjian) over the shoulders, OPEN at the front (its lobes rest on the shoulders and back, never covering the neck or the square inner neckline), with a scalloped gold-thread edge and a fringe of small gold tassels,")]),
 6: ("seasons4/s62_t6_XUAN_COMOI.txt", "Mùa Xuân · Thiết kế hiện tại · Quý phi · 2 choàng vai + cổ mở",
     [("a HEAVY silk brocade robe in SATURATED ice blue silk,", "a HEAVY silk brocade robe in SATURATED ice blue silk with " + short("a pearl-edged gold band", "slim, pearl-edged")),
      ("both resting on the shoulders, pearl-edged), never covering the neckline,", "both resting on the shoulders, open at the front, pearl-edged), never hiding the neck,")]),
 7: ("seasons4/s62_t7_XUAN_COMOI.txt", "Mùa Xuân · Thiết kế hiện tại · Hoàng quý phi · Áo choàng ngọc + cổ mở",
     [("a near-empress ceremonial robe of ice blue silk,", "a near-empress ceremonial robe of ice blue silk with " + layer("a broad royal-yellow brocade band studded with pearls (the Hoàng quý phi edge)", "a slim gold-and-pearl band", "the outer robe")),
      ("a jewelled cloud-collar cape edged with pearls and gold over the shoulders,", "a jewelled cloud-collar cape edged with pearls and gold over the shoulders, OPEN at the front, never covering the neck or the square inner neckline,")]),
}
for n, (out, cap, swaps) in J.items():
    s = rd(f"s62_t{n}.txt")
    for a, b in swaps: s = sw(s, a, b)
    s = s.rstrip("\n") + "\n" + CAP.format(cap)
    assert len(s) <= 10000, (n, len(s))
    open(os.path.join(ART, out), "w", encoding="utf-8").write(s); print(out, len(s))
