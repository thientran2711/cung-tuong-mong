#!/usr/bin/env python3
"""LADDER2 (owner L1627 + G46/G47 L1626 via Foreman C #15; 0 cr). Run from anywhere. Never hand-edited (L1567).
thu s62 t6 Quý phi v6 = thu_comoi/s62_t6_THU_COMOIe.txt with ONLY the G47 ladder copy of thu t5 Phi v6 (DESIGN20 s62_t5_THU_COMOIe,
make_s62_t5_thu_v6.py; base for the copy = s62_t5_THU_COMOIf v7), same motif types (t6 = incurved chrysanthemums), a little denser:
 1. G40 strong: master_common.OUTER_TIED instead of OUTER_IN (shared clause, all 8 tiers);
 2. neckline band embroidered ACROSS the chest + small flowers below it (t5 'the Phi edge' words);
 3. front edges = long vertical embroidered panels shoulder -> hem (t5 words);
 4. many small flowers over robe+skirt, WIDE hem bands on the outer AND inner robe (G47 inner hem), skirt-front medallions, small birds (t5);
 5. cape: the Quý phi one-tier VÂN KIÊN kept (G1/G37 signature; CHECK1 job 11 + Foreman 01:53Z) with the t5 Phi cape items carried onto it: pearl net, chest cord + jade clasp (Foreman: shoulder layers only 'if they fit' -> did not fit)
    replaces the old one-tier cloud collar (the Tần capelet words say 'no cloud collar'); its fringe a little longer than the Phi's;
 6. sleeves: deep embroidered cuff bands + small flowers on the sleeves (t5);
 7. sash: tied flat at the CENTRE front, NO bow (G44), two long jade pendant sets in front never covered (G42/G45), sheer silk shawl (t5);
 8. caption; A38 trims of REPEATED boilerplate only (TRIM list, gate-checked, listed in the .keep)."""
import os, sys
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ART)
from master_common import OUTER_IN, OUTER_TIED
D = os.path.join(ART, "thu_comoi")
SRC = "s62_t6_THU_COMOIe.txt"
s = open(os.path.join(D, SRC), encoding="utf-8").read()
WHY = "owner L1627 G40 + L1626 G46/G47 ladder copy of thu t5 Phi v6 (LADDER2)"
EDITS = [
    (OUTER_IN, OUTER_TIED),
    ("a blush inner top with a low straight SQUARE neckline edged by a pearl-edged gold band (the Quý phi edge),",
     "a blush inner top with a low straight SQUARE neckline edged by a wide pearl-edged blush band of dense chrysanthemum embroidery "
     "ACROSS the chest (the Quý phi edge), small chrysanthemums below it,"),
    ("its two front edges (slim, pearl-edged)", "its two front edges (each a long vertical blush chrysanthemum panel, shoulder to hem)"),
    ("the robe embroidered with incurved chrysanthemums in light plum and gold thread along the borders,",
     "the robe embroidered with incurved chrysanthemums and small birds in light plum and gold thread along the borders, many small "
     "chrysanthemums densely over robe and skirt, WIDE chrysanthemum hem bands on outer and inner robe, large chrysanthemum medallions on the skirt,"),
    # Quý phi signature VÂN KIÊN kept (G1/G37, CHECK1 job 11 + Foreman 01:53Z); the Phi cape items carried ONTO it (G47): pearl net, chest
    # cord with jade clasp, small soft layer on each shoulder with pearl tassel fringe; + cuff bands / sleeve flowers
    ("with small jade and pearl drops dangling beneath it, fewer and smaller than the imperial noble consort's,",
     "with small jade and pearl drops dangling beneath it, fewer and smaller than the imperial noble consort's, a "
     "pearl-and-jade net over it, its fronts linked across the chest by a silk cord with a jade clasp in the middle; deep "
     "chrysanthemum cuff bands, small chrysanthemums on the sleeves,"),
    ("gold-and-jade bracelets;",
     "gold-and-jade bracelets, the yellow sash tied flat at the CENTRE front, NO bow, with TWO embroidered blush chrysanthemum "
     "APRON PANELS side by side to the ankles and a long jade pendant set (ngọc bội) "
     "at each outer side, never covered, a sheer stole;"),
    # Foreman C #15 option B: persona Expression sentence repeats the face block (soft warm eyes, closed-lip smile, head tilt in GRACE)
    (" Expression: A TENDER, kind, caring look, the head inclined slightly to one side, the soft eyes warm and full of gentle affection, "
     "a small sweet closed-lip smile, eyes fully open, never a stretched grin.", ""),
    ("Quý phi · Vân kiên cổ cuộn mây + cổ mở", "Quý phi · v6"),
]
# A38: repeated boilerplate only (never owner outfit / embroidery / jewellery / hair words); cut in order until <= LIMIT
TRIM = [
    ("; her head never back-turned. GRACE", "A38 std trim ('never back-turned'; ANGLE table words kept)", "; GRACE"),
    ("COLOUR RULE: robe, skirt, sleeves, cape and train are all clearly light plum silk (her signature colour family light plum and blush), "
     "with large areas of plain light plum silk visible; blush only as a small accent; gold only as thin accents on the borders; NOT cream, "
     "NOT beige, NOT ivory, NOT an all-gold robe. ",
     "the 'her signature colour family … all-gold robe' colour-repeat sentence (A38 std trim; repeats the 2nd COLOUR RULE + TWO-COLOUR RULE)"),
    (", a pearl-edged collar trim", "repeat of the pearl-edged neckline band"),
    (", and a grander gold headdress with more gold ornaments", "repeat of 'a BIG ornate gold headdress with pearls, gold flowers and many gold tassels'"),
    (" rich gold-thread embroidery covering much of the robe,", "repeat of the new 'many small chrysanthemums densely over robe and skirt'"),
    (" image 2 is only a colour reference;", "repeat of 'the colour of the flat colour swatch image (image 2 …)'"),
    (" her own colour stays clearly the main robe colour,", "repeat of COLOUR RULE '#DF9ED9 is the main colour of the robe'"),
]
LIMIT = 10000
allow = []
for x, y in EDITS:
    assert s.count(x) == 1, x[:60]; s = s.replace(x, y); allow.append((x, "edit"))
for t in TRIM:
    x, why, rep = (t + ("",))[:3]
    if "--raw" in sys.argv: print("len", len(s))
    if len(s) <= LIMIT: break
    assert s.count(x) == 1, x[:60]; s = s.replace(x, rep); allow.append((x, "A38 trim: " + why))
if "--raw" in sys.argv: print(len(s)); open(sys.argv[-1], "w", encoding="utf-8").write(s); sys.exit()
assert len(s) <= LIMIT, len(s)
out = os.path.join(D, "s62_t6_THU_COMOIg.txt")   # COMOIf = CHECK1 FAIL (vân kiên dropped) -> COMOIg
open(out, "w", encoding="utf-8").write(s)
with open(out + ".keep", "w", encoding="utf-8") as k:
    k.write(f"base: dev/art/thu_comoi/{SRC}\n")
    for x, why in allow:
        for part in [p.strip(" ,;.") for p in x.replace("(", ";").replace(")", ";").split(";")]:
            if len(part) > 12: k.write(f"allow: {part}  # {WHY}; {why}\n")
print(len(s), out, [why[:30] for _, why in allow])
