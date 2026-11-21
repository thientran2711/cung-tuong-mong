#!/usr/bin/env python3
"""BUILDFIX5 (owner L2122 CHỐT 'Chỉ có triều phục là mới dùng gấm thôi, là dùng gấm nhẹ thôi.', ROOT-B3 item 6): triều phục r27 t1-t8 =
r26 files word for word, ONLY the S28 fabric sentence -> master_common.TRIEU_GAM (lightest gấm). Words only, not drawn (A53/A55)."""
import os, sys
H = os.path.dirname(os.path.abspath(__file__)); ART = os.path.abspath(os.path.join(H, "..", "..", ".."))
sys.path.insert(0, ART); import master_common as M
for n in range(1, 9):
    src = os.path.join(H, "..", "r26", "t%d_c06_RAN.txt" % n); t = open(src, encoding="utf-8").read()
    assert t.count(M.TRIEU_GAM_OLD) == 1, (n, "S28 not once")
    out = os.path.join(H, "t%d_c06_RAN.txt" % n); open(out, "w", encoding="utf-8").write(t.replace(M.TRIEU_GAM_OLD, M.TRIEU_GAM))
    open(out + ".keep", "w", encoding="utf-8").write("base: dev/art/owner-copy/trieu/r26/t%d_c06_RAN.txt\n" % n + "".join("allow: %s   # owner L2122: triều phục = lightest gấm (S28)\n" % a for a in ("the robe and sleeves are rich silk BROCADE (gấm) with a woven pattern", "flowing as brocade flows", "the same brocade on every rank", "never thin, limp or flimsy", "the robe and sleeves are rich silk BROCADE")))
    print(out, len(t), "->", len(open(out).read()))
