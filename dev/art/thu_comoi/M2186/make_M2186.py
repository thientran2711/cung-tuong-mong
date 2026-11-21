#!/usr/bin/env python3
"""M2186-01..08 = t1..t8 (bases M2174-01..03, M2179-01, M2184-01..04) + owner L2186: (1) t5-t8 Tần hem sentence, t7/t8 Tần sleeve length;
(2) ONE identical clearly-visible clasp sentence for every rank. THUROOT5, words only, A54/A55."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
C = ("its two front edges are joined in front by one small, CLEARLY VISIBLE clasp (a frog button or small gold clasp) — the clasp may sit anywhere on the front, "
     "at the neckline or a little lower, but it is always there and clearly drawn; below the clasp the front opens so the square collar stays visible; "
     "the NECK always fully bare, no collar of any kind around the neck, never a stand collar")
C8 = C.replace("one small, CLEARLY VISIBLE clasp (", "one small, CLEARLY VISIBLE clasp, small and gold (")
HEM = "floor-length robe, the hem just touching the floor all round, no train, no trail behind her, nothing pooling or extending behind her, only slipper toe tips peeking under the front hem,"
SLV = [("SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor.",
        "SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES."),
       ("the long wide sleeves flow softly and lightly down to the floor beside her feet,", "the long wide sleeves flow softly and lightly down to her ankles,")]
NECK = "fastened by one small clasp (frog button) where its two front edges meet, the clasp may sit anywhere on the front, the NECK always fully bare and open, NO collar of any kind around the neck, never a stand collar, "
T13 = ("joined at the throat by one small horizontal clasp (frog button), its front open below the clasp, its two front edges parting so the square collar stays fully visible;", C + ";")
J = {
 1: ("M2174-01_s62_t1_thu.txt", "M2174-01", [T13]),
 2: ("M2174-02_s62_t2_thu.txt", "M2174-02", [T13]),
 3: ("M2174-03_s62_t3_thu.txt", "M2174-03", [T13]),
 4: ("M2179-01_s62_t4_thu.txt", "M2179-01", [("joined at the throat by one small horizontal clasp (frog button), OPEN at the front below it, its two front edges parting so the square neckline stays fully visible, never hiding it,", C + ", never hiding it,")]),
 5: ("M2184-01_s62_t5_thu.txt", "M2184-01", [("joined at the throat by one small horizontal clasp (frog button), open at the front below it;", C + ";")]),
 6: ("M2184-02_s62_t6_thu.txt", "M2184-02", [(NECK + "its front open below it, never hiding the square collar,", C + ", never hiding it,")]),
 7: ("M2184-03_s62_t7_thu.txt", "M2184-03", [(NECK + "its front open so the square collar stays fully visible;", C + ";"),
     ("floor-length robe, reaching the floor and pooling softly with a longer soft trail behind her than the Quý phi's, only slipper toe tips peeking under the front hem,", HEM)] + SLV),
 8: ("M2184-04_s62_t8_thu.txt", "M2184-04", [("fastened by one small gold clasp (frog button), CLEARLY drawn, where its two front edges meet, the clasp may sit anywhere on the front, the NECK always fully bare and open, NO collar of any kind around the neck, never a stand collar, its front open so the square collar stays fully visible;", C8 + ";"),
     ("floor-length robe, reaching the floor and pooling softly with the longest soft trail of all ranks behind her, only slipper toe tips peeking under the front hem,", HEM)] + SLV),
}
for n, (base, oc, reps) in J.items():
    s = (P / base).read_text()
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    assert "at the throat" not in s and "anywhere on the front, the NECK" not in s and "pooling softly" not in s and "touch the floor." not in s, n
    if n >= 4: assert HEM in s, n
    out = f"M2186-0{n}_s62_t{n}_thu.txt"
    s = s.replace(f'"{oc}"', f'"M2186-0{n}"'); assert s.rstrip().endswith(f'"M2186-0{n}"')
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2186 via ROOT-B4\n" for o, _ in reps))
    print(out, len(s))
