#!/usr/bin/env python3
"""M2195-01..08 = M2194-01..08 + owner L2195 (via ROOT-B5): sash-tie tassels richer by rank; tie length unchanged. THUROOT6, words only, 0 cr."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
T45 = "each ending in a small silk tassel with a small bead-and-knot cap (thướt tha)"
J = {
 1: [("well past the knees, each ending in a pretty silk tassel (thướt tha)", "well past the knees, each ending in a small plain silk tassel (thướt tha)")],
 2: [("and ending in a pretty silk tassel", "and ending in a small plain silk tassel")],
 3: [],  # already 'each ending in a small silk tassel' (plain small) -> unchanged
 4: [("to well past the knees, with small silk tassels (thướt tha)", "to well past the knees, " + T45)],
 5: [("to well past the knees, with small silk tassels (thướt tha)", "to well past the knees, " + T45)],
 6: [("to well past the knees, each ending in a pretty silk tassel", "to well past the knees, each ending in a pretty silk tassel with a small gold cap and one pearl")],
 7: [("to well past the knees, each ending in a pretty silk tassel, soft", "to well past the knees, each ending in a pretty silk tassel with a gold cap set with small pearls and jade beads, soft")],
 8: [("each ending in a pretty silk tassel capped in gold,", "each ending in the richest silk tassel of all ranks, a little longer than the others, with a gold-filigree cap set with pearls and jade beads,")],
}
for n in range(1, 9):
    base = f"M2194-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text()
    for o, w in J[n]:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    code = f"M2195-0{n}"; out = f"{code}_s62_t{n}_thu.txt"
    s = s.replace(f'"M2194-0{n}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), n
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2195 via ROOT-B5\n" for o, _ in J[n]))
    print(out, len(s))
