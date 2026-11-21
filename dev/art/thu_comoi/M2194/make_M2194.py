#!/usr/bin/env python3
"""M2194-01..08 = t1..t8 (owner L2194 via ROOT-B5): the two long sash ties end in pretty silk tassels at every rank; HQP/HH streamers
floor -> well past the knees + tassels. t1-t4 = LOCKED_t1..t4 (M2187-01..04) verbatim, only tie words touched (t3/t4 already tasselled -> byte-identical
except the CAPTION code). t5-t8 = M2191-01..04 (L2193 clasp/neck sentences = M2187 verbatim, HH clasp pearls). THUROOT6, words only, 0 cr."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
TS = "each ending in a pretty silk tassel"
BASE = {1: "LOCKED_t1_M2187-01_s62_t1_thu.txt", 2: "LOCKED_t2_M2187-02_s62_t2_thu.txt", 3: "LOCKED_t3_M2187-03_s62_t3_thu.txt",
        4: "LOCKED_t4_M2187-04_s62_t4_thu.txt", 5: "M2191-01_s62_t5_thu.txt", 6: "M2191-02_s62_t6_thu.txt", 7: "M2191-03_s62_t7_thu.txt", 8: "M2191-04_s62_t8_thu.txt"}
J = {
 1: [("two LONG plain silk ties trailing down the skirt well past the knees (thướt tha)", "two LONG plain silk ties trailing down the skirt well past the knees, " + TS + " (thướt tha)")],
 2: [("(thướt tha), each tip embroidered with one tiny flower", "(thướt tha), each tip embroidered with one tiny flower and ending in a pretty silk tassel")],
 3: [], 4: [], 5: [],
 6: [("two LONG yellow ties falling straight down either side of it to well past the knees", "two LONG yellow ties falling straight down either side of it to well past the knees, " + TS)],
 7: [("fall softly from under the belt all the way down to the floor, their ends touching the floor, soft and flowing (thướt tha)",
      "fall softly from under the belt to well past the knees, " + TS + ", soft and flowing (thướt tha)")],
 8: [("fall softly from under the belt all the way down to the floor, one either side of centre, their tips capped in gold and touching the floor, soft and flowing (thướt tha)",
      "fall softly from under the belt to well past the knees, one either side of centre, each ending in a pretty silk tassel capped in gold, soft and flowing (thướt tha)")],
}
for n in range(1, 9):
    base = BASE[n]; s = (P / base).read_text(); old = s.rstrip().rsplit('"', 2)[1]
    for o, w in J[n]:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    assert s.count("ONE continuous piece") == 1 and "image 2" not in s and "touching the floor, soft" not in s, n
    code = f"M2194-0{n}"; out = f"{code}_s62_t{n}_thu.txt"
    s = s.replace(f'"{old}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"'), n
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2194 via ROOT-B5\n" for o, _ in J[n]))
    EX = {7: "two LONG narrow yellow silk streamers fall softly from under the belt all the way down to the floor",
          8: "two LONG narrow yellow silk streamers embroidered with small gold phoenixes fall softly from under the belt all the way down to the floor"}
    if n in EX: (D / (out + ".keep")).open("a").write(f"allow: {EX[n]}  # owner L2194 via ROOT-B5 (floor -> well past the knees)\n")
    print(out, len(s), old)
