#!/usr/bin/env python3
"""M2187-01..08 = M2186-01..08 + owner L2187 (overrides L2186 item 2): OLD clasp wording per rank (as M2174/M2150/M2163)
+ 'the vân kiên is ONE continuous piece around the base of the neck, never split into two separate shoulder pieces'. L2186 length kept. THUROOT5."""
import pathlib, importlib.util
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
sp = importlib.util.spec_from_file_location("m86", R / "dev/art/thu_comoi/M2186/make_M2186.py")
C = ("its two front edges are joined in front by one small, CLEARLY VISIBLE clasp (a frog button or small gold clasp) — the clasp may sit anywhere on the front, "
     "at the neckline or a little lower, but it is always there and clearly drawn; below the clasp the front opens so the square collar stays visible; "
     "the NECK always fully bare, no collar of any kind around the neck, never a stand collar")
C8 = C.replace("one small, CLEARLY VISIBLE clasp (", "one small, CLEARLY VISIBLE clasp, small and gold (")
ONE = "the vân kiên is ONE continuous piece around the base of the neck, never split into two separate shoulder pieces"
OLD13 = "joined at the throat by one small horizontal clasp (frog button), its front open below the clasp, its two front edges parting so the square collar stays fully visible"
J = {
 1: [(C + ";", OLD13 + "; " + ONE + ";")], 2: [(C + ";", OLD13 + "; " + ONE + ";")], 3: [(C + ";", OLD13 + "; " + ONE + ";")],
 4: [(C + ", never hiding it,", "joined at the throat by one small horizontal clasp (frog button), OPEN at the front below it, its two front edges parting so the square neckline stays fully visible, never hiding it, " + ONE + ",")],
 5: [(C + ";", "joined at the throat by one small horizontal clasp (frog button), open at the front below it; " + ONE + ";")],
 6: [(C + ", never hiding it,", "joined at the throat by one small horizontal clasp (frog button), its front open below it, never hiding the square collar, " + ONE + ",")],
 7: [(C + ";", "joined at the throat by one small horizontal clasp (frog button), its front open so the square collar stays fully visible; " + ONE + ";")],
 8: [(C8 + ";", "joined at the throat by one small horizontal clasp (frog button), small and gold, CLEARLY drawn where the two front edges of the vân kiên meet under the chin, its front open so the square collar stays fully visible; " + ONE + ";")],
}
for n, reps in J.items():
    base = f"M2186-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text()
    for o, w in reps:
        assert s.count(o) == 1, (n, s.count(o)); s = s.replace(o, w, 1)
    assert "anywhere on the front" not in s and s.count(ONE) == 1, n
    out = f"M2187-0{n}_s62_t{n}_thu.txt"
    s = s.replace(f'"M2186-0{n}"', f'"M2187-0{n}"'); assert s.rstrip().endswith(f'"M2187-0{n}"')
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2187 via ROOT-B4\n" for o, _ in reps))
    print(out, len(s))
