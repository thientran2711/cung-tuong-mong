#!/usr/bin/env python3
"""triều phục r22 (FIGURE_GATE 8e, owner Lượt 492 via ROOT-49; TP3). Base = r21/tN_c06_RAN.txt EXACTLY.
r22 = t1, t2, t3, t5. t4 not redrawn (Tần OK; point 6 colour judged not needed). t6/t7/t8 untouched.
Changes (nothing else; A17):
 (1) t1: hà bí/cuff green LIGHTER + fresher (ROOT-49 decision: "earlier approved t1" = r20 nVsuDuUYQD);
     cuff = NARROW band at the sleeve END only (CUFF_X wide-border sentence replaced by CUFF_N).
 (2) t2: + ROBE BODY embroidery sentence (Tần density, small motifs).
 (3) t3: + ROBE BODY embroidery sentence (Tần density, small-to-medium motifs).
 (4) t5: + ROBE BODY sentence: Tần density, LARGER motifs, not many small ones (motif size rises with rank).
 (6) t1/t2/t3/t5: COLOUR RULE 'neither too fresh nor too dark' -> a little fresher, never loud (tươi nhưng đừng rực), game tone."""
import os
H = os.path.dirname(os.path.abspath(__file__)); R21 = os.path.join(os.path.dirname(H), 'r21')

C_OLD = "medium saturation, medium lightness, neither too fresh nor too dark,"
C_NEW = ("medium saturation, medium lightness, a little FRESHER and brighter than before: clear, lively, fresh colours "
         "(tươi) but never loud or garish (đừng rực), never too dark, in the game's colour tone,")
G_OLD = "a deep lustrous jade-celadon green like #6FA88A (the white-jade hue made much stronger, clearly jade, never white or pale)"
G_NEW = ("a lighter, fresh lustrous jade-celadon green like #8DC2A2 (a clear soft jade green, lighter and fresher than a deep "
         "jade, never dark, never white or pale)")
CUFF_X = (" These cuff bands are a clearly visible wide border, about a hand wide, sewn all around the bottom opening edge of "
          "EACH wide hanging sleeve, in that hà bí colour, so the sleeve hems are NOT plain red: the red sleeve ends in a "
          "band of the hà bí colour.")
CUFF_N = (" These cuff bands are only a NARROW band (about two fingers wide) at the very END of each sleeve, at the bottom "
          "of the hanging sleeve; NOT a wide border running along the whole sleeve opening: the sleeve opening edges stay "
          "the court red.")
TAIL = "SLEEVE BODY: the sleeves themselves carry NO embroidery: plain brocade, the embroidery is only on the cuff bands."
TAIL5 = ("SLEEVE BODY: the sleeves carry the same scattered embroidery as the rest of the robe, at the same density and "
         "spacing, so the whole robe reads as one balanced design.")
RB = (" ROBE BODY: the red robe body (front, sides and skirt) is embroidered with scattered gold-and-coloured silk-thread "
      "{motif}, spread over the whole robe body at the SAME density and spacing as the rank-4 (Tần) court robe, "
      "{size}.")
ROBE = {2: RB.format(motif="flowers, butterflies and small birds",
                     size="SMALL motifs, the robe body clearly embroidered, never bare"),
        3: RB.format(motif="flowers, butterflies and small birds",
                     size="small-to-medium motifs, at least as much embroidery as the lower ranks, never sparse"),
        5: RB.format(motif="peonies, birds and butterflies",
                     size="but with LARGER motifs than the Tần robe: bigger, bolder flowers and birds covering the robe body as fully as the Tần robe, NOT many small motifs")}


# TP3 FIX words (added after LOOK, like TP2 CUFF_X; not owner points):
FIX1 = (" ROBE BODY: small florets and butterflies scattered over the red robe body and skirt, as on the earlier approved "
        "version, the robe body never bare. The narrow cuff band in the hà bí green is clearly VISIBLE at the bottom end of "
        "each hanging sleeve.")  # gen yiuXphzPW9: robe body bare, no cuff seen
FIX2 = (" The hanging sleeves themselves show NO flowers, NO birds and NO butterflies: plain red brocade; the scattered "
        "embroidery is ONLY on the robe body and skirt.")  # gen iG5mITr3uK: sleeves embroidered


def rep(t, a, b):
    assert t.count(a) == 1, a[:70]
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(R21, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    t = rep(t, C_OLD, C_NEW)
    if n == 1:
        assert t.count(G_OLD) == 2
        t = t.replace(G_OLD, G_NEW)
        t = rep(t, CUFF_X, CUFF_N)
        t = rep(t, TAIL, TAIL + FIX1)
    if n in (2, 3):
        t = rep(t, TAIL, TAIL + ROBE[n] + (FIX2 if n == 2 else ''))
    if n == 5:
        t = rep(t, TAIL5, TAIL5 + ROBE[n])
    return t


if __name__ == '__main__':
    for n in (1, 2, 3, 5):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n); open(p, 'w', encoding='utf-8').write(s); print(p, len(s.encode()))
