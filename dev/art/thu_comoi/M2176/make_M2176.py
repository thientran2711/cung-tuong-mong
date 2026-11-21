#!/usr/bin/env python3
"""M2176-01 = M2174-08 (t8 HH) + owner L2176: vân kiên ONE tier like HQP. Nothing else. THUROOT5, words only, A54/A55."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
base = "M2174-08_s62_t8_thu.txt"; out = "M2176-01_s62_t8_thu.txt"
REPS = [
 ("a royal golden yellow cloud collar of TWO tiers (vân kiên hai tầng, never olive; AT MOST two tiers in total, never three), the upper tier lying on the lower, with rounded cloud lobes,",
  "a royal golden yellow cloud collar of ONE tier (vân kiên một tầng, never olive; ONE single tier, never two or three) with rounded cloud lobes,"),
 ("a short pearl fringe ONLY along the lower tier's scalloped edge,", "a short pearl fringe along its scalloped edge,"),
]
s = (P / base).read_text()
for o, w in REPS:
    assert s.count(o) == 1, o[:60]; s = s.replace(o, w, 1)
s = s.replace('"M2174-08"', '"M2176-01"'); assert s.rstrip().endswith('"M2176-01"')
(D / out).write_text(s); (P / out).write_text(s)
(D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2176 via ROOT-B4\n" for o, _ in REPS))
print(out, len(s))
