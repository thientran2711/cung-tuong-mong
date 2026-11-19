#!/usr/bin/env python3
"""triều phục r23 (owner Lượt 520 via ROOT-49/ROOT-50; TP4). COLOUR words only (A18 LAW #0, A20).
Base = r22/tN_c06_RAN.txt for t1/t2/t3/t5; r21/t4 for t4 (no r22 t4). t6-t8 untouched. FIX1/FIX2 kept as in r22.
 (1) t1 hà bí + cuff: green -> warm IVORY white-jade #EFE6D2 (Đáp ứng rank colour, FIGURE_GATE owner 18/11).
 (2) t2 hà bí fresher #2E7D57 -> #3E9A6C.  (4) t3/t4/t5 hà bí fresher.  (3) COLOUR RULE: only a LITTLE fresher."""
import os
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(H)
C_OLD = "medium saturation, medium lightness, neither too fresh nor too dark,"
C_R22 = ("medium saturation, medium lightness, a little FRESHER and brighter than before: clear, lively, fresh colours "
         "(tươi) but never loud or garish (đừng rực), never too dark, in the game's colour tone,")
C_NEW = C_R22 + " only a LITTLE fresher (tươi một xíu thôi, đừng tươi quá),"
HB = {1: ("a lighter, fresh lustrous jade-celadon green like #8DC2A2 (a clear soft jade green, lighter and fresher than a deep "
          "jade, never dark, never white or pale)",
          "a lustrous warm IVORY white-jade, a milky ivory-white with a pearly jade sheen like #EFE6D2 (the Đáp ứng rank "
          "colour, NOT green, never grey or brown)"),
      2: ("a deep rich jade green like #2E7D57",
          "a fresh, clear jade green like #3E9A6C (fresher and lighter than a deep jade, never dull or dark)"),
      3: ("a deep rich sapphire blue like #2B55A3", "a fresh, clear sapphire blue like #3566B8"),
      4: ("a deep rich peony rose-pink like #C2457A", "a fresh, clear peony rose-pink like #CF5788"),
      5: ("a deep rich violet-purple like #6A44A8", "a fresh, clear violet-purple like #7A55B8")}
CUFF_G = "The narrow cuff band in the hà bí green is clearly VISIBLE"
CUFF_I = "The narrow cuff band in the hà bí ivory is clearly VISIBLE"


def rep(t, a, b, n=1):
    assert t.count(a) == n, (n, t.count(a), a[:70])
    return t.replace(a, b)


def build(n):
    base = os.path.join(T, 'r21' if n == 4 else 'r22', 't%d_c06_RAN.txt' % n)
    t = open(base, encoding='utf-8').read()
    t = rep(t, C_OLD, C_NEW) if n == 4 else rep(t, C_R22, C_NEW)
    t = rep(t, HB[n][0], HB[n][1], 2)
    if n == 1:
        t = rep(t, CUFF_G, CUFF_I)
    return t


if __name__ == '__main__':
    for n in (1, 2, 3, 4, 5):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n); open(p, 'w', encoding='utf-8').write(s); print(p, len(s.encode()))
