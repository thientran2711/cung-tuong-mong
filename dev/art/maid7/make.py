#!/usr/bin/env python3
"""MAID7 TEST COPIES (owner 20/11 ~08:40Z). The live builder (t8-prompt-B/build.py) is NOT changed.
Input = live builder output (live_<state>.txt, m18 a18 --nostyle; ma ma a36 D16 recipe). Output = test_<id>.txt.
Every swap is asserted (exactly one hit) and listed in CHANGES.md."""
import os, sys
D = os.path.dirname(os.path.abspath(__file__))
def rd(n): return open(os.path.join(D, n), encoding="utf-8").read()
# thô sử / embroidery-free maids: master M06 (verbatim, required by the gate) says "fine delicate embroidery ... fine gold thread" -> one added clarifier
NOEMB = " This uniform has NO embroidery at all and no gold thread: the embroidery words of the fabric sentence above do not apply to her; the cloth itself is pretty, smooth and clean."
SW = {
 "tm0": [
  ("A palace maid of the lowest rank (cung nu tho su).", "A palace maid of the lowest rank (cung nu tho su), neat, pretty and well dressed."),
  ("plain coarse cotton/hemp in one plain faded colour (faded indigo-blue)",
   "fine smooth plain cotton-silk in one soft clear colour (soft indigo-blue), pretty, well-fitted and spotless, never coarse, never ragged, patched or faded"),
  ("the whole uniform is one plain faded faded indigo-blue", "the whole uniform is one plain soft indigo-blue"),
  (" Any flower or pattern on the fabric", NOEMB + " Any flower or pattern on the fabric"),
 ],
 "tm1": [
  ("with visible delicate embroidery (floral borders on the layered collar, sleeves and hem, small embroidered flower motifs), crisp fabric folds,",
   "with SMALL SIMPLE embroidery fit for a tam đẳng maid: only a narrow band of small embroidered flowers along the collar edge and the cuffs, in a lighter tone of the same colour, no embroidery elsewhere; soft flowing fabric folds,"),
 ],
 "tm2": [
  ("with woven brocade trim at collar, cuffs and hem,",
   "with narrow embroidered flower borders at the collar, cuffs and hem and a few small embroidered flower sprays on the jacket (a little more embroidery than a tam đẳng maid),"),
 ],
 "nhat": [   # NEW: built from tm2 + K2 (richer, NO outer coat/cloak, one added layer at most)
  ("A senior palace maid (cung nu, nhi dang), clearly finer than an ordinary maid.",
   "A first-rank palace maid (cung nu, nhat dang), the highest palace maid rank, clearly finer than a nhị đẳng maid."),
  ("Outfit (a senior palace maid, nhị đẳng): a fine silk ruqun in powder blue, with woven brocade trim at collar, cuffs and hem, a layered half-sleeve brocade jacket (bijia) on top, an embroidered silk sash with a jade pendant on a silk cord; neat double-loop buns with several silver and pearl hairpins; clearly finer than an ordinary maid. Sleeves about two hand-spans wide,",
   "Outfit (a first-rank palace maid, nhất đẳng): a fine silk ruqun in powder blue, with embroidered flower borders at the collar, cuffs and hem and small embroidered flower sprays scattered on the skirt, a long sleeveless silk vest on top (the ONE added layer, with a narrow embroidered border down its front edges; NO outer coat, NO cloak, NO cape), an embroidered silk sash with a jade pendant and a short silk tassel on a silk cord; neat double-loop buns with several silver and pearl hairpins and one small silver comb; clearly finer than a nhị đẳng maid, still far simpler than any imperial consort. Sleeves about two and a half hand-spans wide,"),
  ("she holds a folded letter in an envelope of dyed cotton in a contrasting colour,", "she holds an embroidered handkerchief in a contrasting colour,"),
 ],
 "tm3": [
  ("with subtle tone-on-tone woven pattern and neat embroidered borders,",
   "with subtle tone-on-tone woven pattern and neat embroidered flower borders at the collar, cuffs and hem, a little wider than a maid's,"),
 ],
 "tm4": [],
 "mama": [],
}
SRC = {"tm0": "live_tm0.txt", "tm1": "live_tm1.txt", "tm2": "live_tm2.txt", "nhat": "live_tm2.txt", "tm3": "live_tm3.txt", "tm4": "live_tm4.txt", "mama": "live_mama.txt"}
if __name__ == "__main__":
    for k, src in SRC.items():
        s = rd(src)
        for a, b in SW[k]:
            assert s.count(a) == 1, (k, a); s = s.replace(a, b, 1)
        assert len(s) <= 10000, (k, len(s))
        open(os.path.join(D, f"test_{k}.txt"), "w", encoding="utf-8").write(s)
        print(k, len(s), len(SW[k]), "swaps")
