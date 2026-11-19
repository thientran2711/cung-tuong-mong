#!/usr/bin/env python3
"""Owner Lượt 767 → Lượt 770 (CODES ONLY, no redraw: "giữ mặt, màu sau này đổi được vì prompt đã có mã màu"): Lạnh lùng s46, s49, s50 colours "not soft like the others" → softer root pairs at the s47/s48 level.
A17: ONLY the colour words + hex change; face, hair, outfit cut, item, pose, angle, refs, settings = the approved L761 prompt.
Roots chosen by Foreman C ROOT-57 (Lượt 767 message). Rewrites the colour words/hex IN PLACE in sNN.v5.FULL.txt (approved pictures stay as drawn) and updates s_root_colours.json (old pair kept as root_old).
Run: python3 dev/art/face-common/make_lanhlung_L767.py"""
import os, json
D = os.path.dirname(os.path.abspath(__file__))
FIX = {  # sid: [(old words, new words), (old hex, new hex)], new root pair
 "s46": ([("deep blue-violet", "soft lilac violet"), ("#5D5894", "#A898CC")],
         dict(main="cool aquamarine", main_hex="#86CDB9", sec="soft lilac violet", sec_hex="#A898CC")),
 "s49": ([("soft burgundy rose", "soft dusty rose"), ("#C37986", "#C98A97"), ("pine teal", "soft sage jade"), ("#388581", "#A3C4A0")],
         dict(main="soft dusty rose", main_hex="#C98A97", sec="soft sage jade", sec_hex="#A3C4A0")),
 "s50": ([("deep raspberry", "soft raspberry pink"), ("#A55D7A", "#D498B0")],
         dict(main="clear ice blue", main_hex="#A6C9E4", sec="soft raspberry pink", sec_hex="#D498B0")),
}
OLD_COLOUR_WORDS = ("deep blue-violet", "soft burgundy rose", "pine teal", "deep raspberry", "#5D5894", "#C37986", "#388581", "#A55D7A")
sp = os.path.join(D, 's_root_colours.json'); sroot = json.load(open(sp))
for sid, (subs, root) in FIX.items():
    t = open(os.path.join(D, f'{sid}.v5.FULL.txt')).read()
    for a, b in subs:
        assert a in t or b in t, (sid, a); t = t.replace(a, b)   # idempotent
    assert not any(w in t for w in OLD_COLOUR_WORDS), sid
    assert "deep " + root["main"] not in t and "deep " + root["sec"] not in t
    open(os.path.join(D, f'{sid}.v5.FULL.txt'), 'w').write(t)
    r = sroot[sid]
    if "root_old" not in r:
        r["root_old"] = {k: r[k] for k in ("main", "main_hex", "sec", "sec_hex")}
    r.update(root); r["src"] = "Lượt 761 Lạnh lùng"; r["note"] = "Lượt 770: codes only, picture not redrawn"
    print(sid, root)
open(sp, 'w').write(json.dumps(sroot, ensure_ascii=False, indent=1) + "\n")
