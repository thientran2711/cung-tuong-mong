#!/usr/bin/env python3
"""triều phục r21 (FIGURE_GATE 8d, owner Lượt 468 via ROOT-48). TRIỀU PHỤC ONLY. t1-t6 redrawn; t7/t8 = r18 kept.
Base = r20/tN_c06_RAN.txt exactly. Changes (nothing else):
 - SHARED block: + CUFF sentence (cuff bands in the SAME colour as the hà bí, embroidered with the same pattern).
 - The per-rank trim list no longer names the cuff bands (they followed the lighter rank colour, != hà bí colour).
 - OWN slot SLEEVE BODY embroidery: t1-t3 none; t4-t6 (Lượt 471) same scattered embroidery as the rest of that rank's robe,
   same density/spacing (robe-body embroidery of r20 unchanged).
 - Removed r20 EMB5/EMB6 (Lượt 452 'embroidery over the WHOLE sleeve').
 - t6: royal yellow KEPT exactly as r20 (owner Lượt 470 correction via ROOT-48; Y_OLD/Y_NEW unused)."""
import os, sys
H = os.path.dirname(os.path.abspath(__file__))
T = os.path.dirname(H)
sys.path.insert(0, os.path.join(T, 'r18')); sys.path.insert(0, os.path.join(T, 'r19')); sys.path.insert(0, os.path.join(T, 'r20'))
import build_r20 as B20  # noqa: E402
R20 = os.path.join(T, 'r20')

CUFF = (" The cuff bands at the ends of the sleeves are in the SAME colour as the hà bí ({colour}) and are embroidered "
        "with the same {pattern}.")
BODY = {1: " SLEEVE BODY: the sleeves themselves carry NO embroidery: plain brocade, the embroidery is only on the cuff bands.",
        4: " SLEEVE BODY: the sleeves carry the same scattered embroidery as the rest of the robe, at the same density and "
           "spacing, so the whole robe reads as one balanced design."}  # owner Lượt 471 via ROOT-48
BODY[2] = BODY[3] = BODY[1]; BODY[5] = BODY[6] = BODY[4]
Y_OLD = "plus a clearly visible amount of royal yellow: a yellow inner robe panel, a yellow sash and narrow yellow borders,"
Y_NEW = ("plus only a LITTLE royal yellow: a thin yellow trim along the collar edge, NO yellow inner robe panel, NO yellow "
         "under-skirt, NO yellow sash,")
TAIL = "the bands appear from under the shoulder piece."


def rep(t, a, b):
    assert t.count(a) == 1, a[:70]
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(R20, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    if n == 5: t = rep(t, B20.EMB5, '')
    if n == 6: t = rep(t, B20.EMB6, '')  # yellow kept as r20 (owner Lượt 470)
    t = rep(t, 'the collar band, the cuff bands and the sash in the rank colour', 'the collar band and the sash in the rank colour')
    t = rep(t, TAIL, TAIL + CUFF.format(colour=B20.COLOUR[n], pattern=B20.PATTERN[n]) + BODY[n])
    assert 'WHOLE of both sleeves' not in t and 'whole sleeve' not in t and 'full sleeve' not in t and 'phoenix-shaped' not in t
    return t


if __name__ == '__main__':
    for n in range(1, 7):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n)
        open(p, 'w', encoding='utf-8').write(s)
        print(p, len(s.encode()))
