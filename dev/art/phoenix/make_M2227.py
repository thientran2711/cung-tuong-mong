#!/usr/bin/env python3
"""M2227-07/08 (s62 preview, owner L2226/L2227 via ROOT-B6) = M2217-07/08 + s62 phoenix set 'Tử đằng' (feathers + crown inlay)
+ thread ladder colour fix. HH locked: only these words. THUROOT8, 0 cr."""
import json, pathlib, re
R = pathlib.Path(__file__).resolve().parents[3]; P = R / "dev/handover/prompts_L2095"
S = json.load(open(R / "dev/art/phoenix_plumage_L2227.json")); k = S["people"]["s62"]["set"]; st = S["sets"][k]
(a, ah), (b, bh), (c, ch) = [(x["name"], x["hex"]) for x in st["colours"][:3]]
FE = f"OUTER feathers in {a} ({ah}), inner feathers in {b} ({bh}), feather tips and eyes in {c} ({ch})"
E = {7: [("OUTER feathers in lilac, inner feathers in light olive, feather tips and eyes in deeper olive", FE),
         ("(lilac outer, light olive inner, deeper olive tips)", f"({a} outer, {b} inner, {c} tips)"),
         ("the phoenixes also worked in five-colour silk (ngũ sắc)", "the phoenixes also worked in multi-coloured silk floss in her phoenix plumage colours")],
     8: [("OUTER feathers in lilac, inner feathers in light olive, feather tips and eyes in deeper olive", FE),
         ("(lilac outer, light olive inner, deeper olive tips)", f"({a} outer, {b} inner, {c} tips)"),
         ("iridescent peacock-feather thread (a green-blue sheen, ONLY the Empress)", "iridescent peacock-feather thread (a shimmering sheen in her phoenix plumage colours, ONLY the Empress)")]}
A = {7: ["OUTER feathers in lilac", "inner feathers in light olive", "feather tips and eyes in deeper olive", "lilac outer, light olive inner, deeper olive tips", "the phoenixes also worked in five-colour silk", "ngũ sắc"],
     8: ["OUTER feathers in lilac", "inner feathers in light olive", "feather tips and eyes in deeper olive", "lilac outer, light olive inner, deeper olive tips", "a green-blue sheen, ONLY the Empress", "a green-blue sheen"]}
def blocks(s): return [s[s.index(x):s.index(". ", s.index(x)) + 1] for x in ("ANGLE:", "Pose:", "GRACE")]
for n in (7, 8):
    base = f"M2217-0{n}_s62_t{n}_thu.txt"; s = (P / base).read_text(); keep = blocks(s)
    for o, w in E[n]:
        assert s.count(o) == 1, (n, o); s = s.replace(o, w, 1)
    assert blocks(s) == keep
    code = f"M2227-0{n}"; s = s.replace(f'"M2217-0{n}"', f'"{code}"'); assert s.rstrip().endswith(f'"{code}"')
    out = f"{code}_s62_t{n}_thu.txt"; (P / out).write_text(s); (R / "dev/art/phoenix" / out).write_text(s)
    (R / "dev/art/phoenix" / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {x}  # owner L2226/L2227 via ROOT-B6\n" for x in A[n]))
    print(out, len(s))
