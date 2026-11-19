#!/usr/bin/env python3
"""triều phục r26 = r24 (owner KEPT r24, Lượt 574) + owner option B rank colours (Lượt 595/598, ROOT-52 -> BW5).
COLOUR words only (A18 LAW #0, B5): every rank-colour HEX becomes the option-B hex; t4 hue word rose-pink -> jade-teal
(words copied from t8-prompt-B/build.py TRIEU[4] 'jade-teal, a soft medium jade-teal'); everything else of r24 word for word.
+ D9 owner law (Lượt 529) sentence appended before the closing 'No text, no labels.' (gate S34; same position as build.py).
Main court red #99443F/#893A37 is unchanged (already in r24). t6-t8 are NOT in r24 (see BW5 report)."""
import os
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(H)
D9 = " NOTHING on the forehead (no hoa điền, no dot, no mark, nothing)."
END = " No text, no labels."
# (old, new, count) per rank
SW = {1: [("like #E4EEE2", "like #EAE3D0", 1), ("like #F2EAD6", "like #EAE3D0", 2)],
      2: [("like #6FA987", "like #7FB394", 1), ("like #14A05E", "like #7FB394", 2)],
      3: [("like #6C8FC4", "like #7E9CCB", 1), ("like #1E5FD2", "like #7E9CCB", 2)],
      4: [("rank colour rose-pink, a medium-saturation, medium-lightness peony-pink like #D68AA8",
           "rank colour jade-teal, a soft medium jade-teal like #5FA8A6", 1),
          ("a vivid peony rose-pink like #E2347F", "a vivid jade-teal like #5FA8A6", 2)],
      5: [("like #9C82C2", "like #A88BCB", 1), ("like #7633CC", "like #A88BCB", 2)]}


def rep(t, a, b, n):
    assert t.count(a) == n, (n, t.count(a), a[:70])
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(T, 'r24', 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    nl = '\n' if t.endswith('\n') else ''; t = t[:len(t) - len(nl)]
    for a, b, k in SW[n]:
        t = rep(t, a, b, k)
    assert t.endswith(END) and D9 not in t
    return t[:-len(END)] + D9 + END + nl


if __name__ == '__main__':
    for n in SW:
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n); open(p, 'w', encoding='utf-8').write(s); print(p, len(s.encode()))
