#!/usr/bin/env python3
"""triều phục r20 FINAL (owner verdict on r19 via ROOT-48, relayed by ROOT-47; exact wording from ROOT-48; owner Lượt 454).
Owner Lượt 455 overrides: redraw ALL t1-t6 with ONE identical ankle sleeve sentence (the builder t4-t6 sentence) on every rank; t7/t8 = r18 kept.
Base = r19/tN_c06_RAN.txt. ADD/REPLACE only:
 (a) t1: band width = the other ranks' (exact ROOT-48 wording);
 (b) tassel below the bí trụy (exact wording, replaces "with no loose tassels at the band ends.");
 (c) cầu vai ON TOP of the hà bí (exact sentence, after the cầu vai sentence);
 (d) Lượt 454: "hanging at ankle level" + "at the same ankle height for every rank";
 (e) Lượt 454 bí trụy ladder: t6 = gold PEONY with pearls + a little yellow topaz, NO phoenix (t1/t4/t5 already match the ladder);
 (f) t5: much more embroidery over the whole sleeve; t6: a bit more embroidery (owner verdict items 6/7, own wording).
Sleeves (Lượt 455): t1-t3 builder knee sentence -> the builder ankle sentence, so all six carry the same sentence word for word.
Superseded drafts: a_superseded/ (r20a, earlier order), b_superseded/ (r20b, own tassel/layer wording)."""
import os
H = os.path.dirname(os.path.abspath(__file__))
R19 = os.path.join(os.path.dirname(H), 'r19')
REDO = (1, 2, 3, 4, 5, 6)  # owner Lượt 455: redraw ALL t1-t6

T1W = ("NARROW bands with a plain, simple edge (no border trim)",
       "bands of the same width as the other ranks' hà bí, with a plain, simple edge (no border trim)")
TASSEL = ("with no loose tassels at the band ends.", "and below the pendant hangs a small, soft silk tassel, short and graceful.")
CAUVAI = ("The shoulders carry ONLY the stiff cầu vai: no capelet, no round cape, no pearl net or beaded yoke, no shawl and no "
          "sheer stole over the shoulders or arms.")
LAYER = (" The stiff shoulder piece (cầu vai) lies ON TOP of the hà bí bands at the shoulders and covers them there; the bands "
         "appear from under the shoulder piece.")
ANKLE = ("hanging at ankle level", "hanging at ankle level, at the same ankle height for every rank")
P6 = ("a phoenix-shaped pendant of gold set with pearls, the richest of these pendants",
      "a peony-flower-shaped pendant of gold set with pearls and a little yellow topaz, NO phoenix")
EMB5 = (" EMBROIDERY (Phi, rank 5): MUCH more embroidery than the lower ranks: rich gold-thread and silk embroidery of "
        "butterflies and flowers covers the WHOLE of both sleeves from shoulder to sleeve hem and much of the robe, never "
        "a small patch; the brocade pattern and the embroidery spread over the full sleeve.")
EMB6 = (" EMBROIDERY (Quý phi, rank 6): a little more gold-thread embroidery over the sleeves and robe than the Phi, "
        "covering the whole sleeve.")


def rep(t, a, b):
    assert t.count(a) == 1, a[:60]
    return t.replace(a, b)


KNEE = ("SLEEVES: very long, wide, flowing sleeves of thin light silk that fall well past her hands and hang down to her KNEES, "
        "swaying gracefully and trailing elegantly (thướt tha); never short, narrow, cuffed or tight working sleeves like a "
        "maid's or palace servant's.")
ANK = ("SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve "
       "layer, flowing softly, never stiff.")


def build(n):
    t = open(os.path.join(R19, 't%d_c06_RAN.txt' % n), encoding='utf-8').read()
    if n <= 3:
        t = rep(t, KNEE, ANK)
    if n == 1:
        t = rep(t, *T1W)
    if n == 6:
        t = rep(t, *P6)
    t = rep(t, *ANKLE)
    t = rep(t, *TASSEL)
    if n <= 5:  # t6 has no "shoulders carry ONLY" sentence: add after its cầu vai clause's sentence end (the hà bí/hair block)
        t = rep(t, CAUVAI, CAUVAI + LAYER)
    if n in (5, 6):
        t = rep(t, TASSEL[1], TASSEL[1] + (EMB5 if n == 5 else EMB6))
    if n == 6:
        t = rep(t, TASSEL[1], TASSEL[1] + LAYER)
    return t


if __name__ == '__main__':
    for n in REDO:
        p = os.path.join(H, 't%d_c06_RAN.txt' % n)
        s = build(n)
        open(p, 'w', encoding='utf-8').write(s)
        print(p, len(s.encode()))
