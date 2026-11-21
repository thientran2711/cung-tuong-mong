#!/usr/bin/env python3
"""M2163-01..05 = M2150-04..08 + owner L2163 fixes (via ROOT-B4): HH clasp visible + max two tiers; robe trail ladder t4-t8;
t6-t8 airy (no heavy/droop words); t1-t3 airy sentence added to t4-t8. Words only (A55), ANGLE/pose untouched (A54)."""
import re, pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
AIRY = "Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like."
RW = "The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
RW_SOFT = "The silk is light and supple: the wide sleeves and robe fold softly and naturally, with natural creases, never stiff, flat or board-like."
HEM = "floor-length robe, only slipper toe tips peeking under the hem, no train,"
def hem(x): return (HEM, "floor-length robe, " + x + ", only slipper toe tips peeking under the front hem,")
SLV = ("each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet",
       "the long wide sleeves flow softly and lightly down to the floor beside her feet, lifting a little with her movement")
J = {
 1: ("M2150-04_s64_t4_thu.txt", "M2163-01_s64_t4_thu.txt", [(RW, RW + " " + AIRY),
     hem("its hem just brushing the floor with a very short soft trail behind her (the shortest trail of all: Tần least, then Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest)")]),
 2: ("M2150-05_s62_t5_thu.txt", "M2163-02_s62_t5_thu.txt", [(RW, RW + " " + AIRY),
     hem("its hem brushing the floor with a short soft trail behind her, a little longer than the Tần's, clearly shorter than the Quý phi's")]),
 3: ("M2150-06_s62_t6_thu.txt", "M2163-03_s62_t6_thu.txt", [(RW, RW_SOFT + " " + AIRY),
     ("it LIES on the shoulders and FALLS straight DOWN from them, hanging limp and close along the tops of the upper arms like thin silk under its own weight, following the downward slope of the shoulders",
      "it DRAPES gently DOWN over the shoulders like real cloth, light and airy, following the slope of the shoulders"),
     hem("reaching the floor and pooling softly with a soft trail behind her, longer than the Phi's")]),
 4: ("M2150-07_s62_t7_thu.txt", "M2163-04_s62_t7_thu.txt", [(RW, RW_SOFT + " " + AIRY), SLV,
     hem("reaching the floor and pooling softly with a longer soft trail behind her than the Quý phi's")]),
 5: ("M2150-08_s62_t8_thu.txt", "M2163-05_s62_t8_thu.txt", [(RW, RW_SOFT + " " + AIRY), SLV,
     hem("reaching the floor and pooling softly with the longest soft trail of all ranks behind her"),
     ("the robe hanging close to the body, never bell-wide", "light silk that flows and sways softly, never bell-wide"),
     ("a royal golden yellow cloud collar of TWO tiers (vân kiên hai tầng, never olive)",
      "a royal golden yellow cloud collar of TWO tiers (vân kiên hai tầng, never olive; AT MOST two tiers in total, never three)"),
     ("soft and unlined", "soft, light and unlined, never bulky"),
     ("a short pearl fringe along each scalloped edge", "a short pearl fringe ONLY along the lower tier's scalloped edge"),
     ("by a NARROW flat pearl-edged gold-embroidered band", "by a NARROW flat pearl-edged gold-embroidered band that lies flat under the vân kiên and never reads as a layer or tier"),
     ("joined at the throat by one small horizontal clasp (frog button),",
      "joined at the throat by one small horizontal clasp (frog button), small and gold, CLEARLY drawn where the two front edges of the vân kiên meet under the chin,")]),
}
for n, (base, out, reps) in J.items():
    s = (P / base).read_text()
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:70], s.count(o)); s = s.replace(o, w, 1)
    oc = re.search(r'never over her: "(M\d{4}-\d\d)"', s).group(1); s = s.replace(f'"{oc}"', f'"M2163-0{n}"')
    assert s.rstrip().endswith(f'"M2163-0{n}"')
    (D / out).write_text(s); (P / out).write_text(s)
    print(n, out, len(s))
