#!/usr/bin/env python3
"""M2147-04..10 (owner L2146/L2147 G75): add ONLY the throat clasp (+ front open below where missing; QP length) to OK'd files."""
import re, pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
C = "joined at the throat by one small horizontal clasp (frog button), "
JOBS = [  # code, base, out, [(old, new)]
 ("04", "M2144-01_Tan_s64_thu.txt", "M2147-04_Tan_s64_thu_khuy.txt", [("OPEN at the front,", C + "OPEN at the front below it,")]),
 ("05", "M2144-02_Phi_s62_thu.txt", "M2147-05_Phi_s62_thu_khuy.txt", [("open at the front;", C + "open at the front below it;")]),
 ("06", "M2129-01_QuyPhi_s62_thu_vairu.txt", "M2147-06_QuyPhi_s62_thu_khuy.txt", [
     ("following the downward slope of the shoulders; it never flares",
      "following the downward slope of the shoulders, its lower edge ending at the UPPER THIRD of the upper arms (a little longer than the Phi's, shorter than the Hoàng quý phi's); it never flares"),
     ("never rising up the neck, never hiding the square collar,",
      "never rising up the neck, " + C + "its front open below it, never hiding the square collar,")]),
 ("07", "M2148-01_HoangQuyPhi_s62_thu_phuong.txt", "M2147-07_HoangQuyPhi_s62_thu_phuong_khuy.txt", [("its front open so", C + "its front open so")]),
 ("08", "M2148-02_HoangHau_s62_thu_phuong.txt", "M2147-08_HoangHau_s62_thu_phuong_khuy.txt", [("its front open so", C + "its front open so")]),
 ("09", "M2145-01_HoangQuyPhi_s62_thu_mem.txt", "M2147-09_HoangQuyPhi_s62_thu_mem_khuy.txt", [("its front open so", C + "its front open so")]),
 ("10", "M2145-02_HoangHau_s62_thu_mem.txt", "M2147-10_HoangHau_s62_thu_mem_khuy.txt", [("its front open so", C + "its front open so")]),
]
for code, base, out, reps in JOBS:
    s = (P / base).read_text(); b0 = s
    assert "clasp (frog" not in s and "frog button" not in s, base
    for o, n in reps:
        assert s.count(o) == 1, (base, o, s.count(o)); s = s.replace(o, n, 1)
    oldc = re.search(r'never over her: "(M\d{4}-\d\d)"', s).group(1)
    s = s.replace(f'"{oldc}"', f'"M2147-{code}"')
    assert s.count("M2147-" + code) == 1 and s.rstrip().endswith(f'"M2147-{code}"')
    for bad in ("cape", "cloak", "stiff", "standing", "shape", "thick", "dense", "heavy"):
        assert s.lower().count(bad) == b0.lower().count(bad), (code, bad)
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n")
    print(out, len(b0), "->", len(s))
