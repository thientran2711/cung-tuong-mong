#!/usr/bin/env python3
"""DESIGN1 (fashion expert, prompts only — G30/G31/H12, no Magnific). Owner 20/11: Minh thu look OK but too simple/cheap -> more elaborate;
Han: crossed collar opens WIDE, lapels reach toward the shoulders, more elaborate. Base = s62_t5_thu_MINH.txt / s62_t5_thu_HAN.txt;
ONLY the Outfit sentence + caption change (asserted). H12: long garments, rich body embroidery (H6). F14: no Qing words. G29: phi bạch behind back (common sentence kept)."""
import os, re
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
OUT_RE = re.compile(r"Outfit \(rank-5 consort \(Phi\), clearly much richer and more splendid than the lower ranks\): .*?NOT a cream, beige or all-gold robe\.")
HEAD = "Outfit (rank-5 consort (Phi), clearly much richer and more splendid than the lower ranks): "
TAIL_M = ("her signature colour family light clear warm plum and bright blush pink stays the MAIN robe colour (light clear warm plum); the {g} itself is clearly light clear warm plum silk, "
          "gold only as embroidery accents, NOT a cream, beige or all-gold robe.")
V = {
 "MINH_A": ("s62_t5_thu_MINH.txt", "Mùa Thu · Thiết kế thời Minh (cải tiến A) · Phi", "long jacket",
  "a NEW outfit, a full Ming-dynasty court look, its silhouette clearly DIFFERENT from Tang, Song and Han: a LONG jacket (chang ao) reaching below the knee, with a neat STANDING collar "
  "fastened at the throat by a row of small gold-and-pearl buttons down the right front, long wide sleeves; across both shoulders and down the full length of each sleeve runs a WIDE woven gold "
  "band (tongxiu lan) of chrysanthemums and maple leaves, and the jacket body is densely embroidered all over with large chrysanthemums, maple leaves and small autumn birds in gold and blush pink; "
  "under it a long pleated MA-MIAN skirt (horse-face skirt) in bright blush pink with flat front and back panels and fine side pleats, carrying TWO wide woven gold bands (a broad knee band and a "
  "hem band) of chrysanthemum scrolls; a gold-and-jade pendant set (jinbu) of linked jade plaques and pearl strands with long silk tassels hangs from the waist down the centre of the skirt front; "
  "RANK BLOCK, clearly visible at game size: a large square embroidered gold medallion on the chest of the jacket, framed by a double gold border, plus the shoulder-and-sleeve gold bands and the "
  "two gold skirt bands; no cape, no cloud collar, no shoulder piece; a sheer silk shawl; hair in a smooth Ming-style high bun with a gold diadem; a LARGER gold headdress "
  "with dangling gold tassels and jade pins; "),
 "MINH_B": ("s62_t5_thu_MINH.txt", "Mùa Thu · Thiết kế thời Minh (cải tiến B) · Phi", "over-robe",
  "a NEW outfit, a full Ming-dynasty court look in THREE visible layers, its silhouette clearly DIFFERENT from Tang, Song and Han: an inner standing-collar jacket in bright blush pink fastened at "
  "the throat by gold-and-pearl buttons (its sleeves hidden inside); over it a LONG open-front over-robe (pifeng) reaching the ankle, with long wide sleeves and two broad straight front bands from the neck to the hem, "
  "each band densely embroidered in gold thread with chrysanthemum and maple-leaf scrolls, the front closed at the chest by one large gold-and-jade clasp; the over-robe body richly embroidered "
  "all over with large chrysanthemums, maple leaves and small autumn birds in gold and blush pink, a deep embroidered border along its hem and side slits; under it a long pleated MA-MIAN skirt "
  "(horse-face skirt) in bright blush pink, its flat front panel showing between the open fronts, with a wide woven gold band near the hem; a long gold-and-jade pendant set (jinbu) with pearl "
  "strands and silk tassels hanging at the centre front; RANK BLOCK, clearly visible at game size: a large ROUND embroidered gold medallion of chrysanthemums on the chest and the two broad "
  "gold-embroidered front bands; no cape, no cloud collar, no shoulder piece; a sheer silk shawl; hair in a smooth Ming-style high bun with a gold diadem; a LARGER gold "
  "headdress with dangling gold tassels and jade pins; "),
 "HAN_A": ("s62_t5_thu_HAN.txt", "Mùa Thu · Thiết kế thời Hán (cải tiến A) · Phi", "robe",
  "a NEW outfit, a full Han-dynasty court look: a long floor-length wrapped robe (quju) whose crossed collar opens WIDE: the two lapels run out toward the SHOULDERS and cross low at the chest "
  "in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing); the hem winds once around the body in a curved spiral wrap; "
  "very wide long sleeves gathered into broad embroidered cuff bands; the robe body densely embroidered all over in gold with large peonies, cloud scrolls and small birds; RANK BLOCK, "
  "clearly visible at game size: THREE stacked WIDE collar bands following the wide V out to the shoulders, the outer band light clear warm plum fully embroidered with gold-thread flowers, "
  "the two inner bands bright blush pink with gold edges, the same triple band repeated on the spiral hem edge; a WIDE stiff embroidered waist belt with a gold buckle plaque and a long set "
  "of jade discs and pearl strands (zupei) hanging on silk cords to the knee; no cape, no cloud collar, no shoulder piece; a sheer silk shawl; a LARGER gold headdress with dangling gold tassels "
  "and jade pins; "),
 "HAN_B": ("s62_t5_thu_HAN.txt", "Mùa Thu · Thiết kế thời Hán (cải tiến B) · Phi", "outer robe",
  "a NEW outfit, a full Han-dynasty court look in TWO visible robe layers: a long straight-hem outer robe (zhiju) reaching the floor and an inner robe in bright blush pink; the crossed collars "
  "of BOTH robes open WIDE: the lapels sweep out to the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the "
  "neck), the pink inner collar showing as a wide layered edge inside the plum outer collar; the outer robe's very wide long sleeves end in deep embroidered cuffs (one single sleeve layer, the inner sleeves hidden "
  "inside); the outer robe body densely embroidered all over in gold with large peony medallions, autumn chrysanthemums and cloud-and-bird scrolls; a deep embroidered border "
  "along the whole hem and the front opening; RANK BLOCK, clearly visible at game size: THREE stacked WIDE gold-edged collar bands in the wide V (outer light clear warm plum fully embroidered "
  "in gold, inner two bright blush pink) and a broad embroidered waist sash tied in a flat knot, with two long jade pendants on silk cords; no cape, no cloud collar, no shoulder piece; a sheer "
  "silk shawl; a LARGER gold headdress with dangling gold tassels and jade pins; "),
}
for k, (base, cap, g, body) in V.items():
    s = rd(base)
    m = OUT_RE.findall(s); assert len(m) == 1, k
    s = s.replace(m[0], HEAD + body + TAIL_M.format(g=g), 1)
    old_cap = re.search(r'never over her body: "([^"]+)"', s).group(1)
    s = s.replace(f'"{old_cap}"', f'"{cap}"', 1)
    low = s.lower()
    s = s.replace("no shoulder piece, no Qing-style headdress;", "no shoulder piece;")  # base text fails gate F14 (banned word even negated)
    low = s.lower()
    assert "qing" not in low and "liangbatou" not in low and "phoenix-free" not in low, k
    assert len(s) <= 10000, (k, len(s))
    open(os.path.join(D, f"s62_t5_thu_{k}.txt"), "w", encoding="utf-8").write(s)
    print(k, len(s))
