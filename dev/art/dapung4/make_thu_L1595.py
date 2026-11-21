#!/usr/bin/env python3
"""DESIGN18 (owner L1590 + L1592 G40 + L1595 G41, via Foreman C #14): THU s62 t1–t3 = s62_t{1,2,3}_COMOI_v3.txt, BUILT from the current thu
finals (A39: start from the old text, swap only the outfit-design words). Every new word is copied from an existing source:
  G41 t1 Đáp ứng  <- the Thường tại look of her L1592 picture (mẫu C): the layered neckline words of the current thu t2 (v2d, the COMOI collar
                     she liked on mẫu C) + the mẫu C body words (dapung4/s62_t1_tu_thuongtai_C.txt: plain cuffs, 'delicate … only at the hem',
                     'a plain narrow silk sash'); the Tang ruqun / chest-high skirt words go.
  G41 t2 Thường tại <- the current Quý nhân look (thu t3 v2e garment: court robe + girdle + ONE apron panel + jade pendant sets + shawl), with the
                     t2 motif and the t2 TIER_LOW density 'delicate embroidered {motif} at the sleeves and hem' (L1590).
  G41 t3 Quý nhân <- the same look with TWO long hanging apron panels instead of one.
  L1590 density   : the DENSE 'densely embroidered ALL OVER …' sentence (DESIGN17) is removed from t1–t3 (back to the TIER_LOW level).
  G40 (L1592)     : the sash/girdle is tied OVER the outer robe at the natural waist and holds it in (hugs the body), never a loose open coat;
                     t1 = the mẫu C picture: sash tied in a bow at the natural waist over both layers, long full flowing skirt.
Hair, hair flower, item, pose, face, palette, fabric (B29) and all common/master sentences stay as in each rank's own current file.
Run from the repo root:  python3 dev/art/dapung4/make_thu_L1595.py"""
import os, re, sys
D = os.path.dirname(os.path.abspath(__file__)); ART = os.path.dirname(D); sys.path.insert(0, D)
from make_thu_L1574 import fit, sw, DENSE   # same A38 trim list + LIMIT as the last thu builder
rd = lambda f: open(os.path.join(D, f), encoding="utf-8").read()
T1, T2, T3, MC = rd("s62_t1_COMOI_v2d.txt"), rd("s62_t2_COMOI_v2d.txt"), rd("s62_t3_COMOI_v2e.txt"), rd("s62_t1_tu_thuongtai_C.txt")

def seg(s, start, end):
    """the one substring from `start` up to (not incl.) `end`"""
    i = s.index(start); j = s.index(end, i); assert s.count(start) == 1; return s[i:j]

def dense_out(s):
    n = len(re.findall(re.escape(DENSE.split("{sz}")[0]) + r".*?\)\; ", s)); assert n == 1, "DENSE"
    return re.sub(re.escape(DENSE.split("{sz}")[0]) + r".*?\)\; ", "", s)

G40 = "tied OVER the outer robe at the natural waist, holding it in so it hugs the body (never a loose open coat)"
COLLAR_T2 = seg(T2, "a fine silk outfit with a LAYERED NECKLINE", "delicate embroidered tiger lilies at the sleeves and hem")   # thu t2 v2d collar
MC_BODY = "plain mint mist cuff bands without embroidery, delicate embroidered plum blossoms only at the hem, and a plain narrow silk sash"
assert MC.count(MC_BODY) == 1, "mẫu C body words"
QN = seg(T3, "a structured, rich COURTLY palace consort dress", "two or three slim pearl hairpins")                              # thu t3 v2e garment
GIRDLE = "a wide soft blush silk girdle at the natural waist, from which"
assert QN.count(GIRDLE) == 1
ONE = ("from which hangs down the centre front an embroidered blush APRON PANEL (a long narrow ceremonial front panel, semi-double China roses "
       "embroidery, gold-braid edge) reaching to the ankles; on each side of the apron hangs")
TWO = ("from which hang down the front TWO embroidered blush APRON PANELS side by side (two long narrow ceremonial front panels, semi-double China "
       "roses embroidery, gold-braid edge) reaching to the ankles; on each outer side of the two panels hangs")

def t1():
    s = T1
    old = seg(s, "a Tang-style TWO-PIECE ruqun", "pretty silver hairpins and a fresh flower")
    new = (COLLAR_T2.replace(" (the Thường tại edge)", "").replace("tiger lilies", "lilac sprays")
           + MC_BODY.replace("mint mist", "blush").replace("plum blossoms", "lilac sprays").replace("a plain narrow silk sash", "a plain narrow blush silk sash")
           + " tied in a bow at the natural waist OVER both layers, holding the outer robe in so it hugs the body (never a loose open coat), "
             "over a long full flowing skirt, never tied high at the chest; ")
    s = sw(s, old, new)
    s = sw(s, '"Đáp ứng · Áo trong cổ vuông viền trơn + áo ngoài mở"', '"Đáp ứng · Áo trong cổ vuông viền hoa 2 lớp + áo ngoài thắt đai nơ"')
    return s

def qn(motif_from, motif_to, panels, t2_density):
    q = QN.replace(GIRDLE, "a wide soft blush silk girdle " + G40 + ", from which")
    if panels == 2: q = sw(q, ONE, TWO)
    q = dense_out(q)
    if t2_density:
        q = sw(q, "wide embroidered semi-double China roses bands at the sleeve ends and the hem", "delicate embroidered semi-double China roses at the sleeves and hem")
        q = q.replace(" (the Quý nhân edge)", "")
    return q.replace(motif_from, motif_to)

def t2():
    s = T2
    old = seg(s, "a fine silk outfit with a LAYERED NECKLINE", "silver and pearl hairpins and a fresh flower")
    s = sw(s, old, qn("semi-double China roses", "tiger lilies", 1, True))
    s = sw(s, '"Thường tại · Áo trong cổ vuông viền hoa ly hổ 2 lớp + áo ngoài mở"', '"Thường tại · Áo trong cổ vuông + một dải vạt trước, thắt đai"')
    return s

def t3():
    s = T3
    s = sw(s, QN, qn("semi-double China roses", "semi-double China roses", 2, False))
    s = sw(s, '"Quý nhân · Áo trong cổ vuông viền thêu rộng + áo ngoài mở"', '"Quý nhân · Áo trong cổ vuông viền thêu rộng + hai dải vạt trước, thắt đai"')
    return s

if __name__ == "__main__":
    for t, f in ((1, t1), (2, t2), (3, t3)):
        s, used = fit(f()); assert "densely embroidered ALL OVER" not in s and "Tang-style" not in s
        out = os.path.join(D, f"s62_t{t}_COMOI_v3.txt"); open(out, "w", encoding="utf-8").write(s)
        print(t, len(s), os.path.relpath(out, os.path.dirname(os.path.dirname(ART))), "trims:", used)
