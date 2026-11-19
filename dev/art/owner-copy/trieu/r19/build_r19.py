#!/usr/bin/env python3
"""triều phục r19 t1-t6 (owner Lượt 437 on r18 final): build r19/t1..t6_c06_RAN.txt.
Base = r18/tN_c06_RAN.txt (r18 FINAL as drawn). t7/t8 are KEPT (not rebuilt).
REPLACE only the owner-named items: (1) SLEEVES = builder sentence verbatim (mk_ranks_v3): t1-t3 KNEE, t4-t6 ANKLE;
(2) t1 fabric: ADD one BROCADE (gấm) sentence; (3) hà bí: own style per rank;
(4) bí trụy: own pendant per rank, rising in luxury. Everything else byte-identical to r18."""
import os, sys
H = os.path.dirname(os.path.abspath(__file__))
R18 = os.path.join(os.path.dirname(H), 'r18')
sys.path.insert(0, R18)
import build_r18 as B  # noqa: E402

STYLE = {1: 'NARROW bands with a plain, simple edge (no border trim), sprinkled with small scattered embroidered florets',
         2: 'bands a little wider, edged along both sides with a continuous embroidered cloud-scroll border',
         3: 'bands embroidered along their whole length with twining lotus scrolls (lotus flowers on winding stems) in gold and silk thread, with a thin gold edge',
         4: 'wider bands embroidered with butterflies among peony flowers, with a gold-thread edge',
         5: 'wide bands embroidered with long phoenix-tail feather scrolls running down their length, with a double gold-thread edge',
         6: 'wide, rich bands covered in gold-couched cloud patterns (gold thread laid and stitched onto the band), edged along both sides with a row of small pearls'}
PEND = {1: 'a small teardrop-shaped pendant of silver filigree (fine openwork silver wire), simple',
        2: 'a heart-shaped pendant of carved ivory',
        3: 'a gourd-shaped pendant of carved jade',
        4: 'a lotus-shaped pendant of green jade set in gold',
        5: 'a ruyi-shaped pendant of gold set with a gemstone',
        6: 'a phoenix-shaped pendant of gold set with pearls, the richest of these pendants'}
HABI = ("The TWO VERTICAL RANK-COLOUR BANDS are the hà bí (霞帔) worn as in the Song–Ming dynasties: "
        "two long embroidered bands in {deep}, a strong, saturated colour so the rank reads at a glance, never pastel, "
        "never muted; THIS RANK'S OWN hà bí style, different from every other rank: {style}; they come from behind the neck "
        "over the shoulders and hang straight down the front of the robe all the way to her ANKLES (the band tips reach the "
        "ankle bones, not the shins), where their two tips meet and join into ONE point, and from that point hangs ONE pendant, "
        "the bí trụy (帔坠), THIS RANK'S OWN pendant: {pend}, palm-sized, finely worked, hanging at ankle level (NOT on the "
        "floor), with no loose tassels at the band ends.")
KNEE = ("SLEEVES: the wide sleeves of the outer robe{of} are long and hang down to her KNEES: the lowest point of each sleeve "
        "ends at knee height, never lower than the knee, never reaching the shins or ankles, one single sleeve layer, flowing "
        "softly, never stiff.")
ANKLE = ("SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES: the lowest point "
         "of each sleeve ends at ankle height, never stopping at the knee or calf and never trailing on the floor, one single "
         "sleeve layer, flowing softly, never stiff.")
OLD_ANK = ("SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single "
           "sleeve layer, flowing softly, never stiff.")
BROCADE = ("FABRIC OF THIS COURT ROBE: the robe and sleeves are rich silk BROCADE (gấm), woven with a tone-on-tone pattern "
           "visible in the cloth, with the same body, fullness and sheen as the higher ranks' court robes, never thin, limp, "
           "flimsy or sheer.")


def build(n):
    # ROOT-47 / owner Lượt 443: sleeves = the builder sentences VERBATIM (mk_ranks_v3.py l.122-123, FIGURE_GATE OWNER LƯỢT 351):
    # t1-t3 = B.OLD_SLV (knees, Lượt 321 wide thướt tha), t4-t6 = OLD_ANK (ankles). No own sleeve wording (KNEE/ANKLE unused).
    t = open(os.path.join(R18, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    t = B.rep(t, B.HABI.format(deep=B.DEEP[n]), HABI.format(deep=B.DEEP[n], style=STYLE[n], pend=PEND[n]))
    if n == 1:
        t = B.rep(t, B.OLD_SLV, BROCADE + ' ' + B.OLD_SLV)
    elif n <= 3:
        t = B.rep(t, B.NEW_SLV, B.OLD_SLV)
    else:
        assert t.count(OLD_ANK) == 1
    return t

if __name__ == '__main__':
    for n in range(1, 7):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n)
        open(p, 'w', encoding='utf-8').write(s)
        print(p, len(s.encode()))
