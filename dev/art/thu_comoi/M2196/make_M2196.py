#!/usr/bin/env python3
"""M2196-01..08 = M2195-01..08 + owner L2196 (via ROOT-B5): clasp fixed AT THE THROAT on every rank + clasp ladder;
Phi t5 = Tần t4 structure (robe / neckline / chest / sash); HQP t7 + HH t8 waist/chest = QP t6 (nothing binding the chest).
THUROOT7, words only, 0 cr. Tie length unchanged."""
import pathlib, json
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
CL = "joined at the throat by one small horizontal clasp (frog button)"
AT = ", always at the throat, at the base of the neck, never lower, never on the chest"
def clasp(rich): return (CL, CL + " " + rich + AT)
J = {
 1: [clasp("of small plain gold")], 2: [clasp("of small plain gold")], 3: [clasp("of small plain gold")],
 4: [clasp("of gold with one tiny pearl")],
 5: [clasp("of gold with one tiny pearl"),
     # Phi = Tần structure: neckline straight after the robe borders, Tần band words, motifs moved to Tần's place
     ("(the small embroidered motifs never run over these borders or bands), richly embroidered in shaded silk and silver thread with double hollyhocks and small embroidered birds: one pair plus one more single bird (three in total), scattered lightly, never crowded: two small wild geese in flight, wings spread, long necks, short tails, soft warm brown with pale bellies, outlined in fine silver thread, small and clear, not a phoenix, the body motifs never over the borders or bands, ONE straight SQUARE collar only (no crossed collar, nothing layered under it): a LOW open square neckline just below the collarbones, neck and collarbones bare, NEVER a high stand collar or mandarin collar, framed by ONE wide flat band in her second colour embroidered with double hollyhocks",
      "(the small embroidered motifs never run over these borders or bands), ONE straight SQUARE collar only (no crossed collar, nothing layered under it), framed by one wide flat lilac band embroidered with double hollyhocks"),
     ("NO necklace, no pearl strand at the neck, double hollyhock sprays on the skirt front, long trailing wide sleeves",
      "NO necklace, no pearl strand at the neck, the robe richly embroidered in shaded silk and silver thread with double hollyhocks on the robe body and the sleeves and double hollyhock sprays on the skirt front, and small embroidered birds: one pair plus one more single bird (three in total), scattered lightly, never crowded: two small wild geese in flight, wings spread, long necks, short tails, soft warm brown with pale bellies, outlined in fine silver thread, small and clear, not a phoenix, the body motifs never over the borders or bands, long trailing wide sleeves")],
 6: [clasp("of gold set with small pearls")],
 7: [clasp("of gold filigree set with pearls and a jade bead"),
     ("embroidered on the front of the robe below the collar", "embroidered on the front of the bodice below the collar"),
     ("(no wide plaque belt on top of it), flat, fitted to the waist, never bulky, nothing tight or binding at the chest, closed at its centre front by a gold cloud plaque; two LONG narrow yellow silk streamers fall softly from under the belt to well past the knees, each ending in a pretty silk tassel with a gold cap set with small pearls and jade beads, soft and flowing (thướt tha), one either side of centre;",
      "(no wide plaque belt on top of it), closed at its centre front by a gold cloud plaque, two LONG yellow ties falling straight down either side of it to well past the knees, each ending in a pretty silk tassel with a gold cap set with small pearls and jade beads, soft and flowing (thướt tha); flat, fitted to the waist, never bulky;"),
     ("a slim yellow sash and the yellow streamers,", "a slim yellow sash with its two long yellow ties,")],
 8: [(CL + ", small and gold, set with small pearls, CLEARLY drawn",
      CL + " of gold filigree set with pearls and jade, the richest clasp of all ranks" + AT + ", CLEARLY drawn"),
     ("embroidered on the front of the robe below the collar", "embroidered on the front of the bodice below the collar"),
     ("(no wide plaque belt on top of it), flat, fitted to the waist, never bulky, nothing tight or binding at the chest, closed at its centre front by a small gold double-phoenix plaque set with white jade and pearls; two LONG narrow yellow silk streamers embroidered with small gold phoenixes fall softly from under the belt to well past the knees, one either side of centre, each ending in the richest silk tassel of all ranks, a little longer than the others, with a gold-filigree cap set with pearls and jade beads, soft and flowing (thướt tha);",
      "(no wide plaque belt on top of it), closed at its centre front by a small gold double-phoenix plaque set with white jade and pearls, two LONG yellow ties embroidered with small gold phoenixes falling straight down either side of it to well past the knees, each ending in the richest silk tassel of all ranks, a little longer than the others, with a gold-filigree cap set with pearls and jade beads, soft and flowing (thướt tha); flat, fitted to the waist, never bulky;")],
}
# allow lines = base phrases that disappear (keep_check units)
A = {
 5: ["a LOW open square neckline just below the collarbones", "neck and collarbones bare", "NEVER a high stand collar or mandarin collar",
     "framed by ONE wide flat band in her second colour embroidered with double hollyhocks",
     "richly embroidered in shaded silk and silver thread with double hollyhocks and small embroidered birds"],
 7: ["embroidered on the front of the robe below the collar", "nothing tight or binding at the chest",
     "two LONG narrow yellow silk streamers fall softly from under the belt to well past the knees", "one either side of centre",
     "a slim yellow sash and the yellow streamers"],
 8: ["small and gold", "set with small pearls", "embroidered on the front of the robe below the collar", "nothing tight or binding at the chest",
     "two LONG narrow yellow silk streamers embroidered with small gold phoenixes fall softly from under the belt to well past the knees", "one either side of centre"],
}
for n in range(1, 9):
    base = f"M2195-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text()
    for o, w in J[n]:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    assert s.count("never on the chest") == 1, n
    code = f"M2196-0{n}"; out = f"{code}_s62_t{n}_thu.txt"
    s = s.replace(f'"M2195-0{n}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), n
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {a}  # owner L2196 via ROOT-B5\n" for a in A.get(n, [])))
    print(out, len(s))
