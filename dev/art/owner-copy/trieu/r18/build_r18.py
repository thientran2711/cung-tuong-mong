#!/usr/bin/env python3
"""triều phục r18 (owner Lượt 400/401/403/410/411): build r18/t1..t8_c06_RAN.txt.
Base: t1-t5 = r17/*_RAN.txt, t6 = r16/t6_c06_RAN.txt, t7/t8 = r15/*_RAN.txt.
Only ADD sentences (A hà bí deep colour + bí trụy, B hair up / no flowers, D t7/t8 bộ diêu)
and REPLACE (B t1-t3 half-up hair, t1-t5 'fresh flowers'; C t2/t3 sleeves sentence -> t4/t5 wording, knees kept)."""
import os
H = os.path.dirname(os.path.abspath(__file__))
T = os.path.dirname(H)

BASE = {1: 'r17/t1_c06_RAN.txt', 2: 'r17/t2_c06_RAN.txt', 3: 'r17/t3_c06_RAN.txt',
        4: 'r17/t4_c06_RAN.txt', 5: 'r17/t5_c06_RAN.txt', 6: 'r16/t6_c06_RAN.txt',
        7: 'r15/t7_c06_RAN.txt', 8: 'r15/t8_c06_RAN.txt'}
DEEP = {1: 'a deep lustrous jade-celadon green like #6FA88A (the white-jade hue made much stronger, clearly jade, never white or pale)',
        2: 'a deep rich jade green like #2E7D57',
        3: 'a deep rich sapphire blue like #2B55A3',
        4: 'a deep rich peony rose-pink like #C2457A',
        5: 'a deep rich violet-purple like #6A44A8',
        6: 'a deep rich vermilion red like #C8321F (clearly brighter and more saturated than the brick-crimson robe)',
        7: 'a deep rich saturated amber-gold like #D9820F',
        8: 'a deep rich saturated imperial crimson red like #A8201E'}
HABI = ("The TWO VERTICAL RANK-COLOUR BANDS are the hà bí (霞帔) worn as in the Song–Ming dynasties: "
        "two long narrow embroidered bands in {deep}, a strong, saturated colour so the rank reads at a glance, never pastel, "
        "never muted, come from behind the neck over the shoulders and hang straight down the front of the robe all the way to "
        "her ANKLES, where their two tips meet and join into ONE point, and from that point hangs ONE carved pendant, the bí trụy "
        "(帔坠), a palm-sized teardrop- or heart-shaped openwork gold pendant (or white jade set in gold), finely worked, hanging "
        "at ankle level (NOT on the floor), with no loose tassels at the band ends.")
HAIR = ("HAIR FULLY UP for this court robe: ALL of her hair is swept up into a neat high bun (updo) under the crown, nothing "
        "hanging loose down her back or over her shoulders; NO flowers in the hair (no fresh or silk flowers), only the crown "
        "and gold-and-jewel hairpins, solemn.")
BODIEU = ("On BOTH sides of the head, clearly visible OUTSIDE the crown and never lost in it, hangs a pair of grand trâm bộ diêu "
          "(long dangling tassel hairpins): long gold strands with pearls and jewels hanging down beside the face to the "
          "shoulders, longer and grander than any lower rank's.")
OLD_SLV = ("SLEEVES: very long, wide, flowing sleeves of thin light silk that fall well past her hands and hang down to her KNEES, "
           "swaying gracefully and trailing elegantly (thướt tha); never short, narrow, cuffed or tight working sleeves like a "
           "maid's or palace servant's.")
NEW_SLV = ("SLEEVES: the wide sleeves of the outer robe are very long and hang down to her KNEES, one single sleeve layer, "
           "flowing softly, never stiff.")
OLD_HL = ("Hair (HAIR LAW, ranks 1-3): her hair in a HALF-UP style: the top half gathered into a small bun at the crown under "
          "the court crown, the rest of her long hair hanging loose down her back.")


def rep(t, a, b):
    assert t.count(a) == 1, a[:60]
    return t.replace(a, b)


def build(n):
    t = open(os.path.join(T, BASE[n]), encoding='utf-8').read()
    habi = HABI.format(deep=DEEP[n])
    if n <= 5:
        t = rep(t, 'decorated with fresh flowers and several', 'decorated with several')
        add = habi + ' ' + HAIR
        t = rep(t, ' The shoulders carry ONLY', ' ' + add + ' The shoulders carry ONLY')
        if n <= 3:
            t = rep(t, 'sitting on her half-up hair', 'the hair gathered up beneath it')
            t = rep(t, ' ' + OLD_HL, '')
        if n in (2, 3):
            t = rep(t, OLD_SLV, NEW_SLV)
    else:
        add = habi + ' ' + HAIR + ((' ' + BODIEU) if n >= 7 else '')
        anc = ' Image 4 is the Nữ quan' if n == 6 else ' Image 3 is the Nữ quan'
        t = rep(t, anc, ' ' + add + anc)
    return t


if __name__ == '__main__':
    for n in range(1, 9):
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        open(p, 'w', encoding='utf-8').write(build(n))
        print(p, len(build(n).encode()))
