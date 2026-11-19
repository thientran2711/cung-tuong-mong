#!/usr/bin/env python3
"""triều phục r24 (owner Lượt 540 via ROOT-50; TP4). COLOUR words only (A18 LAW #0, A20).
r23 went PALE (lighter hexes + 'đừng tươi quá'); owner: tươi = vivid. Base = r22/tN (t1/t2/t3/t5), r21/t4.
t1 keeps the ivory white-jade hue she accepted in r23, clean and bright. t2-t5: r22 hue, MORE saturated (higher chroma,
not lighter). FIX1 (cuff word ivory as r23) / FIX2 kept. t6-t8 untouched."""
import os
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(H)
C_OLD = "medium saturation, medium lightness, neither too fresh nor too dark,"
C_R22 = ("medium saturation, medium lightness, a little FRESHER and brighter than before: clear, lively, fresh colours "
         "(tươi) but never loud or garish (đừng rực), never too dark, in the game's colour tone,")
C_NEW = ("medium saturation, medium lightness, the rank colours FRESH (tươi): VIVID, bright, saturated, clear, lively "
         "colours with strong rich colour, never pale, never pastel, never faded, washed-out or muted, never too dark, "
         "in the game's colour tone,")
VIV = "vivid, bright, saturated and fresh, never pale, pastel, faded or muted, never dark"
HB = {1: ("a lighter, fresh lustrous jade-celadon green like #8DC2A2 (a clear soft jade green, lighter and fresher than a deep "
          "jade, never dark, never white or pale)",
          "a lustrous, clean and bright warm IVORY white-jade, a luminous milky ivory-white with a pearly jade sheen like "
          "#F2EAD6 (the Đáp ứng rank colour, NOT green, never grey, dull, dingy or brown)"),
      2: ("a deep rich jade green like #2E7D57", "a vivid emerald-jade green like #14A05E (" + VIV + ")"),
      3: ("a deep rich sapphire blue like #2B55A3", "a vivid sapphire blue like #1E5FD2 (" + VIV + ")"),
      4: ("a deep rich peony rose-pink like #C2457A", "a vivid peony rose-pink like #E2347F (" + VIV + ")"),
      5: ("a deep rich violet-purple like #6A44A8", "a vivid violet-purple like #7633CC (" + VIV + ")")}
CUFF_G = "The narrow cuff band in the hà bí green is clearly VISIBLE"
CUFF_I = "The narrow cuff band in the hà bí ivory is clearly VISIBLE"


def rep(t, a, b, n=1):
    assert t.count(a) == n, (n, t.count(a), a[:70])
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(T, 'r21' if n == 4 else 'r22', 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    t = rep(t, C_OLD if n == 4 else C_R22, C_NEW)
    t = rep(t, HB[n][0], HB[n][1], 2)
    if n == 1:
        t = rep(t, CUFF_G, CUFF_I)
    return t


if __name__ == '__main__':
    for n in (1, 2, 3, 4, 5):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n); open(p, 'w', encoding='utf-8').write(s); print(p, len(s.encode()))
