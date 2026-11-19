#!/usr/bin/env python3
"""triều phục r25 (owner Lượt 554 via ROOT-50; TP4): 'Tươi hơn nữa ... mọi thứ đã ok rồi, bây giờ cho nó tươi nữa.'
Base = r24/tN EXACTLY. COLOUR words only, one more clear step more vivid than r24: hà bí + cuff, the court-red robe,
the collar/sash rank colour, and the COLOUR RULE. FIX1/FIX2 kept. t6-t8 untouched."""
import os
H = os.path.dirname(os.path.abspath(__file__)); R24 = os.path.join(os.path.dirname(H), 'r24')
COMMON = [
    ("the rank colours FRESH (tươi): VIVID, bright, saturated, clear, lively colours with strong rich colour,",
     "ALL colours (the red robe, the rank-colour bands, collar and sash) EVEN FRESHER (tươi hơn nữa) than before: VIVID, "
     "bright, highly saturated, clear, luminous, lively colours with strong rich colour,"),
    ("a medium-saturation, medium-lightness true brick red with no coral, orange or pink cast like #99443F, with a slightly "
     "deeper brick-crimson like #893A37 in the linings",
     "a FRESH, VIVID, bright and saturated true crimson-brick red with no coral, orange or pink cast like #B53A35, never dull, "
     "dusty or dark, with a slightly deeper vivid crimson like #9E302E in the linings"),
    ("(vivid, bright, saturated and fresh, never pale, pastel, faded or muted, never dark)",
     "(very vivid, bright, highly saturated and fresh, luminous, never pale, pastel, faded or muted, never dark)"),
]
OWN = {1: [("#F2EAD6", "#F8F1DF"),
           ("a lustrous, clean and bright warm IVORY white-jade, a luminous milky ivory-white",
            "a lustrous, very clean and bright warm IVORY white-jade, a radiant, luminous milky ivory-white")],
       2: [("a vivid emerald-jade green like #14A05E", "a very vivid emerald-jade green like #00B46A"),
           ("a medium-saturation, medium-lightness leaf-jade green like #6FA987", "a vivid, fresh leaf-jade green like #34B072")],
       3: [("a vivid sapphire blue like #1E5FD2", "a very vivid sapphire blue like #1268F0"),
           ("a medium-saturation, medium-lightness sapphire-azure blue like #6C8FC4", "a vivid, fresh sapphire-azure blue like #3C80E0")],
       4: [("a vivid peony rose-pink like #E2347F", "a very vivid peony rose-pink like #F2288A"),
           ("a medium-saturation, medium-lightness peony-pink like #D68AA8", "a vivid, fresh peony-pink like #EC6AA2")],
       5: [("a vivid violet-purple like #7633CC", "a very vivid violet-purple like #8A2BE6"),
           ("a medium-saturation, medium-lightness lilac-violet like #9C82C2", "a vivid, fresh lilac-violet like #9D62DE")]}


def rep(t, a, b):
    assert a in t, a[:70]
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(R24, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    for a, b in COMMON:
        if n == 1 and a.startswith("(vivid"):
            continue
        t = rep(t, a, b)
    for a, b in OWN[n]:
        t = rep(t, a, b)
    return t


if __name__ == '__main__':
    for n in (1, 2, 3, 4, 5):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n); open(p, 'w', encoding='utf-8').write(s); print(p, len(s.encode()))
