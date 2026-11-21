#!/usr/bin/env python3
"""M2217-03..08 + M2217-T7LOW = M2213 (L2212/L2213 dups/L2214 fabric/L2215 sleeves) + ROOT-B6 19:19Z: HH t8 LOCKED (owner L2206 'mọi thứ ổn'):
every L2213 CONFLICT edit on t8 reverted to the M2211-08 wording; only the 16-duplicate cuts (+ L2214/L2215) stay. THUROOT8, words only, 0 cr."""
import pathlib, re
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
REV8 = [  # (M2213 wording, locked M2211-08 wording)
 ("the royal golden yellow (honey-gold like #EFBD69) as the MAIN colour, light olive second and lilac in the inner robe and linings,",
  "the royal golden yellow (honey-gold like #EFBD69), the MAIN colour light olive and the SECONDARY colour lilac, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings),"),
 ("her colour is the second colour (wide borders and a few panels)", "her colour is the second colour (inner robe, wide borders and a few panels)"),
 ("A TENDER, kind, caring look, the soft", "A TENDER, kind, caring look, the head inclined slightly to one side, the soft"),
 ("SLIM robe, slim tall silhouette", "SLIM, never covered by the sleeves, robe, slim tall silhouette")]   # 'floor-length' stays cut (duplicate of S19)
def blocks(s):
    return [s[s.index(k):s.index(". ", s.index(k)) + 1] for k in ("ANGLE:", "Pose:", "GRACE")]
def mk(src, code, edits, allows):
    s = (P / src).read_text(); keep = blocks(s)
    for o, w in edits:
        assert s.count(o) == 1, (code, o[:70]); s = s.replace(o, w, 1)
    assert blocks(s) == keep
    s = re.sub(r'"M2213-[0-9A-Z]+"', f'"{code}"', s); assert s.rstrip().endswith(f'"{code}"')
    n = src.split("_t")[1][0]; out = f"{code}_s62_t{n}_thu.txt"
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{src}\n" + "".join(f"allow: {a}  # ROOT-B6 19:19Z HH locked revert\n" for a in allows))
    print(out, len(s))
for n in range(3, 9):
    mk(f"M2213-0{n}_s62_t{n}_thu.txt", f"M2217-0{n}", REV8 if n == 8 else [], ["as the MAIN colour", "light olive second and lilac in the inner robe and linings", "SLIM robe"] if n == 8 else [])
mk("M2213-T7LOW_s62_t7_thu.txt", "M2217-T7LOW", [], [])
