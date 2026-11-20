#!/usr/bin/env python3
"""MG4 20/11: rank colours moved to B24 (t4 #E3A3B8, t6 #E3A25B, t7 #D46A64) and t8 crimson #B04E3A measured on approved cut 79fMiEWJAL; option-B codes are dead.
triều phục r26 t6-t8 (ROOT-52 -> BW5 (a), owner option B Lượt 595/598): latest approved texts word for word
(t6 = r21, t7/t8 = r18) + option-B rank colours (t6 kingfisher blue #4F86A8, words from build.py TRIEU[6];
t7 honey-amber #E3A25B, words from build.py TRIEU[7] / make.py; t8 crimson hex -> #C65A4C, royal yellow #EFBD69 already there)
+ ONLY the gate sentences they miss, copied verbatim from check_store APPROVED (S31 t6, S17+S28 t7/t8, S34 all),
placed where r24 has them (S17 after the hốt sentence, S28/S31 before ' Pose:', S34 before the closing 'No text, no labels.')."""
import os
H = os.path.dirname(os.path.abspath(__file__)); T = os.path.dirname(H)
S17 = " Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down."
S28 = " FABRIC OF THIS COURT ROBE: the robe and sleeves are rich silk BROCADE (gấm) with a woven pattern, flowing as brocade flows, the same brocade on every rank, never thin, limp or flimsy."
S31 = " The shoulders carry ONLY the stiff cầu vai: no capelet, no round cape, no pearl net or beaded yoke, no shawl and no sheer stole over the shoulders or arms."
S34 = " NOTHING on the forehead (no hoa điền, no dot, no mark, nothing)."
END = " No text, no labels."
SRC = {6: 'r21', 7: 'r18', 8: 'r18'}
SW = {6: [("vermilion-rose red (clearly lighter and rosier than the brick-crimson main so the trims read, a medium-saturation, medium-lightness lustrous red, with a thin gold edge on every trim) like #D2574A",
           "warm orange (cam), a medium-saturation, medium-lightness soft orange with a small royal-yellow touch (with a thin gold edge on every trim) like #E3A25B", 1),
          ("a deep rich vermilion red like #C8321F", "a deep rich warm orange like #E3A25B", 2)],
      7: [("warm amber-gold like #DE9448", "red (đỏ), a medium-saturation, medium-lightness soft coral red like #D46A64", 1),
          ("saturated amber-gold like #D9820F", "saturated soft coral red like #D46A64", 1)],
      8: [("like #A8201E", "like #B04E3A", 1)]}
ADD = {6: [S31], 7: [S17, S28], 8: [S17, S28]}
HOT = " the whole face fully visible. Her hands and body:"


def rep(t, a, b, n):
    assert t.count(a) == n, (n, t.count(a), a[:70])
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(T, SRC[n], 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    nl = '\n' if t.endswith('\n') else ''; t = t[:len(t) - len(nl)]
    for a, b, k in SW[n]:
        t = rep(t, a, b, k)
    for s in ADD[n]:
        assert s.strip() not in t
        if s is S17:
            t = rep(t, HOT, " the whole face fully visible." + S17 + " Her hands and body:", 1)
        else:
            t = rep(t, " Pose:", s + " Pose:", 1)
    assert t.endswith(END) and S34 not in t
    return t[:-len(END)] + S34 + END + nl


if __name__ == '__main__':
    for n in SW:
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n); open(p, 'w', encoding='utf-8').write(s); print(p, len(s.encode()))
