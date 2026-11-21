#!/usr/bin/env python3
"""DESIGN18 (owner L1590 + L1592 G40 + L1595/L1597 G41, via Foreman C #14): THU s62 t1–t3 = s62_t{1,2,3}_COMOI_v5.txt (v4 + JOB 5 G42 edits, see G42 below), BUILT on LADDER1's
make_thu_L1590.py outputs (t1 v2e, t2 v2e, t3 v2f; DENSE already out). A39: start from each rank's old text, swap only the outfit-design words.
Owner L1597: NO mẫu C / ChatGPT. THU shift-down, each tier keeps ITS OWN embroidery density (TIER_LOW level) and rank items:
  t1 Đáp ứng   <- the CURRENT thu Thường tại garment (t2 v2e: layered collar + body + sash) verbatim, motif -> lilac sprays,
                  t2 density 'delicate embroidered {m} at the sleeves and hem' -> t1 TIER_LOW density 'a wide embroidered {m} hem band, small sprays of
                  embroidered {m} on the upper garment'; label '(the Thường tại edge)' dropped.
  t2 Thường tại <- the CURRENT thu Quý nhân garment (t3 v2f: court robe + girdle + ONE apron panel + jade sets + shawl), motif -> tiger lilies,
                  t3 density 'wide embroidered {m} bands at the sleeve ends and the hem' -> t2 TIER_LOW 'delicate embroidered {m} at the sleeves and hem';
                  label '(the Quý nhân edge)' dropped.
  t3 Quý nhân  <- same Quý nhân garment with TWO long hanging apron panels instead of one.
  G40          : LADDER1's long held-in clause -> master_common.OUTER_IN (imported, never hand-written).
Hair, hair flower, item, pose, face, palette, fabric and all common/master sentences stay as in each rank's own file.
Run from the repo root:  python3 dev/art/dapung4/make_thu_L1595.py"""
import os, sys
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D); sys.path.insert(0, D); sys.path.insert(0, ART)
from make_thu_L1574 import fit, sw          # same A38 trim list + LIMIT as the thu builders
from master_common import OUTER_IN          # G40 (owner L1592), LADDER1 1724f9fdd short form
rd = lambda f: open(os.path.join(D, f), encoding="utf-8").read()
T1, T2, T3 = rd("s62_t1_COMOI_v2e.txt"), rd("s62_t2_COMOI_v2e.txt"), rd("s62_t3_COMOI_v2f.txt")
OLD_G40 = ("the outer robe's open front edges fall from the shoulders and are HELD IN by the sash, girdle or ribbon band tied OVER the outer robe, "
           "so the outer robe hugs the body, never a loose open coat hanging outside the sash")

def seg(s, start, end):
    assert s.count(start) == 1, start[:60]; i = s.index(start); return s[i:s.index(end, i)]
def g40(s): return sw(s, OLD_G40, OUTER_IN)

TS = seg(T2, "a fine silk outfit with a LAYERED NECKLINE", "silver and pearl hairpins and a fresh flower")          # thu Thường tại garment
QN = seg(T3, "a structured, rich COURTLY palace consort dress", "two or three slim pearl hairpins")                   # thu Quý nhân garment
ONE = ("from which hangs down the centre front an embroidered blush APRON PANEL (a long narrow ceremonial front panel, semi-double China roses "
       "embroidery, gold-braid edge) reaching to the ankles; on each side of the apron hangs")
TWO = ("from which hang down the front TWO embroidered blush APRON PANELS side by side (two long narrow ceremonial front panels, semi-double China "
       "roses embroidery, gold-braid edge) reaching to the ankles; on each outer side of the two panels hangs")

def t1():
    g = sw(TS, " (the Thường tại edge)", "")
    g = sw(g, "delicate embroidered tiger lilies at the sleeves and hem", "a wide embroidered tiger lilies hem band, small sprays of embroidered tiger lilies on the upper garment")
    g = g40(g).replace("tiger lilies", "lilac sprays")
    s = sw(T1, seg(T1, "a Tang-style TWO-PIECE ruqun", "pretty silver hairpins and a fresh flower"), g)
    return sw(s, '"Đáp ứng · Áo trong cổ vuông viền trơn + áo ngoài mở"', '"Đáp ứng · Áo trong cổ vuông viền hoa 2 lớp + áo ngoài thắt đai"')

def t2():
    g = sw(QN, " (the Quý nhân edge)", "")
    g = sw(g, "wide embroidered semi-double China roses bands at the sleeve ends and the hem", "delicate embroidered semi-double China roses at the sleeves and hem")
    g = g40(g).replace("semi-double China roses", "tiger lilies")
    s = sw(T2, TS, g)
    return sw(s, '"Thường tại · Áo trong cổ vuông viền hoa ly hổ 2 lớp + áo ngoài mở"', '"Thường tại · Áo trong cổ vuông + một dải vạt trước, thắt đai"')

def t3():
    s = sw(g40(T3), ONE, TWO)
    return sw(s, '"Quý nhân · Áo trong cổ vuông viền thêu rộng + áo ngoài mở"', '"Quý nhân · Áo trong cổ vuông viền thêu rộng + hai dải vạt trước, thắt đai"')

# DESIGN18 JOB 5 — owner L1605 (rule G42 'ladder carries up': what a lower rank has, the higher rank has too, a little denser). A39: only these.
G42 = {
 1: [("its two straight front edges (a simple thin blush piping)",
      "its two straight front edges (a narrow blush band embroidered with small lilac sprays, from the shoulders down past the waist)"),
     ("a wide embroidered lilac sprays hem band, small sprays of embroidered lilac sprays on the upper garment and a soft silk sash",
      "a wide embroidered lilac sprays hem band, embroidered lilac sprays cuff bands, many small sprays of embroidered lilac sprays over the upper garment "
      "and the skirt, and a soft silk sash with a small carved jade pendant (ngọc bội) on a silk cord with a silk tassel at each side")],
 2: [("its two straight front edges (a simple narrow blush band)",
      "its two straight front edges (a narrow blush band embroidered with small tiger lilies, from the shoulders down past the waist)"),
     ("edged by a wide soft blush band embroidered with tiger lilies;",
      "edged by a wide soft blush band embroidered with tiger lilies running straight ACROSS the chest, the inner top also embroidered with small tiger lilies;"),
     ("delicate embroidered tiger lilies at the sleeves and hem;",
      "wide embroidered tiger lilies cuff bands at the sleeve ends and the hem; many small sprays of embroidered tiger lilies over the robe and skirt;")],
 3: [("its two straight front edges (a simple narrow blush band)",
      "its two straight front edges (an embroidered blush band down past the waist)"),
     ("embroidered with semi-double China roses (the Quý nhân edge);",
      "embroidered with semi-double China roses (the Quý nhân edge), the inner top also embroidered across the chest;"),
     ("wide embroidered semi-double China roses bands at the sleeve ends and the hem;",
      "wide embroidered semi-double China roses bands at the sleeve ends and the hem; many small semi-double China roses over the robe and skirt;")],
}
def g42(t, s):
    for a, b in G42[t]: s = sw(s, a, b)
    return s

if __name__ == "__main__":
    for t, f in ((1, t1), (2, t2), (3, t3)):
        s, used = fit(g42(t, f())); assert "densely embroidered ALL OVER" not in s and "Tang-style" not in s and s.count(OUTER_IN) == 1 and OLD_G40 not in s
        out = os.path.join(D, f"s62_t{t}_COMOI_v5.txt"); open(out, "w", encoding="utf-8").write(s)
        print(t, len(s), os.path.relpath(out, os.path.dirname(os.path.dirname(ART))), "trims:", used)
