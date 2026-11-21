#!/usr/bin/env python3
"""M2150 full thu s62 set t1-t8 (owner L2150/L2152 via ROOT-B3): words only (A55), ANGLE/pose untouched (A54).
Base = M2147-0N (vân kiên + throat clasp). Adds per spec: H15 thread ladder, WAIST1 waist, G73 chest,
secondary motifs, H14 inner robe (t6-t8), QP gold-thread all over (M2137), B32 fabric, G74 scrub."""
import re, sys, pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
CHEST = ("embroidered at the front of the chest as an ordinary part of the robe's embroidery, worn naturally: her hands, the held item, "
         "the sleeves, the shawl or anything else may cover part of it as they normally would; it is never displayed, never shown off")
A = "COLOUR RULE: all colours clear"
GOLD = "the small embroidered motifs are stitched in fine gold thread"
J = {}
J[1] = ("M2147-01_DapUng_s62_thu_vankien.txt", "M2150-01_s62_t1_thu.txt", [
  ("delicate embroidered lilac flowers at the collar, sleeves and hem, never over the bands, ",
   "delicate embroidered lilac flowers at the collar, sleeves and hem, never over the bands, a sparse small sprig of lilac flowers " + CHEST + ", "),
  (A, "EMBROIDERY THREAD (rank law): all embroidery on her outfit is plain silk floss with a soft silk sheen, NOT gold thread (gold only as the thinnest accents). " + A),
  ("with a broad ribbon band and its bow tied at the centre front of the waist, whose two long ribbons fall down the front",
   "with a narrow soft silk ribbon sash in lilac, tied in a small simple bow at the CENTRE front of the waist, two LONG plain silk ties trailing down the skirt (thướt tha)"),
])
J[2] = ("M2147-02_ThuongTai_s62_thu_vankien.txt", "M2150-02_s62_t2_thu.txt", [
  (A, "EMBROIDERY THREAD (rank law): all embroidery on her outfit is plain silk floss with a soft silk sheen, the edges of the motifs worked in shaded (gradient-dyed) silk, NOT gold thread (gold only as the thinnest accents). " + A),
  ("tiny tiger-lily buds along its lower edge", "tiny tiger-lily buds in shaded silk along its lower edge"),
  ("and a soft silk sash;", "ONE pair of small embroidered butterflies on the robe body, and a narrow lilac silk sash with small woven flowers, tied OVER the outer robe in a fuller "
   "double-loop bow at the CENTRE front of the waist, two LONG silk ties trailing down the skirt (thướt tha), each tip embroidered with one tiny flower;"),
])
J[3] = ("M2147-03_QuyNhan_s62_thu_vankien.txt", "M2150-03_s62_t3_thu.txt", [
  (A, "EMBROIDERY THREAD (rank law): all embroidery on her outfit is shaded (gradient-dyed) silk floss with a soft silk sheen, NOT gold thread (gold only as the thinnest accents). " + A),
  ("small China-rose sprigs in fine silk thread scattered on it", "small China-rose sprigs in shaded silk scattered on it"),
  ("a small China-rose cluster at the CENTRE of the chest", "a small sprig of China roses " + CHEST + ","),
  ("small flowers only; a soft light olive vân kiên", "small flowers only, with a few pairs of small embroidered butterflies among them; a soft light olive vân kiên"),
  ("a wide stiff lilac brocade girdle at the natural waist, tied at the centre front with a soft lilac silk RIBBON BOW on her body's middle line, its long tails falling gracefully (duyên dáng),",
   "a slim lilac silk girdle edged with thin gold braid at the natural waist, tied OVER the outer robe in a neat bow at the CENTRE front of the waist, two LONG silk ties trailing down the skirt (thướt tha), each ending in a small silk tassel,"),
])
sys.path.insert(0, str(D))
try:
    from M2150_t48 import J48; J.update(J48)
except ImportError:
    pass
BAD = ("cape", "cloak", "stiff", "standing", "shape", "thick", "dense", "heavy", "raised", "sticking out", "large cluster", "clearly visible")
for t in sorted(J):
    base, out, reps = J[t]
    s = (P / base).read_text(); b0 = s
    for o, n in reps:
        assert s.count(o) == 1, (t, o[:80], s.count(o)); s = s.replace(o, n, 1)
    oc = re.search(r'never over her: "(M\d{4}-\d\d)"', s).group(1); s = s.replace(f'"{oc}"', f'"M2150-0{t}"')
    assert s.rstrip().endswith(f'"M2150-0{t}"')
    for w in BAD:
        assert s.lower().count(w) <= b0.lower().count(w), (t, w)
    (D / out).write_text(s); (P / out).write_text(s)
    print(t, out, len(b0), "->", len(s), " bad-words left:", {w: s.lower().count(w) for w in BAD if s.lower().count(w)})
