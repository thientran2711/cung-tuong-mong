#!/usr/bin/env python3
"""DESIGN20 JOB 8 (owner L1645 via Foreman C #16; rules G47 corrected = embroidery copy only, G49 Phi pearl swag). Run from anywhere. 0 cr.
Base = the L1638 v6 prompts the owner OK'd: t4 thu_comoi/s62_t4_THU_COMOIf.txt, t5 thu_comoi/s62_t5_THU_COMOIe.txt (vase already swapped to the
B26FAB4 lotus lamp by novase_L1642). v7–v9 additions (apron panels, extra jade sets, OUTER_WRAP …) are NOT carried. ONLY:
 t4: one hair flower + nothing at the ears (shared LADDER2/DESIGN20 wording);
 t5: same + G49 a SHORT round-pearl strand from the left capelet front across to the right in a short swag.
Length: Foreman-approved A38 repeat trims (A capelet neck repeat, C pose tail, t5 'framing the bordered square neckline') + own v6 words compacted."""
import os
ART = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ART, "thu_comoi")
EARS = [("in her hair (never two)", "in her hair (never two, never a pair, no cluster)")]
JOBS = {
 "s62_t4_THU_COMOIj.txt": ("s62_t4_THU_COMOIf.txt", EARS + [
    ("gold and jade hairpins with small dangling gold bu yao tassels", "gold and jade hairpins with small dangling gold bu yao tassels in the bun, none at the ears"),
    (", skirt swirling, the robe hem stirring slightly", ""),                                  # C (Foreman C #15 01:47Z)
    ("Mùa Thu · Tần · v6", "Mùa Thu · Tần · v6b")]),
 "s62_t5_THU_COMOIi.txt": ("s62_t5_THU_COMOIe.txt", EARS + [
    ("a LARGER gold headdress with dangling gold tassels and jade pins", "a LARGER gold headdress with dangling gold tassels and jade pins on the bun, none at the ears"),
    ("no cloud collar, vest or stiff shoulder pieces;", "no cloud collar, vest or stiff shoulder pieces; a SHORT round-pearl strand hangs in a short swag from the left capelet front to the right;"),  # G49
    (" (never hiding the neck or the square inner neckline)", ""),                             # A
    (", the robe hem stirring slightly", ""),                                                  # C
    (", framing the bordered square neckline", ""),                                            # A38 repeat (gate-free)
    ("(each a long vertical gold-edged blush panel of double hollyhock embroidery from shoulder to hem)", "(each a long vertical blush panel embroidered with double hollyhocks, shoulder to hem)"),
    ("hem bands on the outer and the inner robe", "hem bands on outer and inner robe"),
    ("Mùa Thu · Phi · v6", "Mùa Thu · Phi · v6b")]),
}
for out, (src, R) in JOBS.items():
    s = open(os.path.join(D, src), encoding="utf-8").read()
    for a, b in R:
        assert s.count(a) == 1, (src, a); s = s.replace(a, b)
    assert "vase" not in s and len(s) <= 9990, (out, len(s))
    open(os.path.join(D, out), "w", encoding="utf-8").write(s); print(len(s), out)
