# HAN6, owner L1973 (t7) + L1976 (t8) via Foreman C #27: go back to the OLD L1903 outfits (0eUA2SkTfW / CqnI8nxEEy),
# change ONLY the collar to the L1924 clasp collar (square neckline + vân kiên 2 tầng + small clasp at the throat),
# remove only the jade disc (G57) — tassels allowed. NOT from the L1955/L1971 'fromQP' files.
# Built from L1903 directly: collar sentence from L1924 + the same L1924 length trims (boilerplate) + t7 flute "no jade disc".
import re
def sent(path, key):
    s = open(path, encoding="utf-8").read()
    i = s.index(key); j = s.index(";", i)
    return s, s[i:j]
KEY = "an embroidered light olive TWO-TIER cloud collar"
for t, rank, cap in ((7, "Hoàng quý phi", "L1973"), (8, "Hoàng hậu", "L1976")):
    old, c_old = sent(f"s62_t{t}_THU_vankien2_L1903.txt", KEY)
    new24, c_new = sent(f"s62_t{t}_THU_vankien2_L1924.txt", KEY)
    s = old.replace(c_old, c_new); allows = []
    for trim in ("beautiful/handsome romantic-lead looks for everyone. ", "the royal yellow in the robe is exactly that colour. "):
        if trim in s and trim not in new24:  # same boilerplate trims as L1924 (HHCOL2), length only
            s = s.replace(trim, "", 1); allows.append((trim.strip(" ."), "L1924 boilerplate trim (length), as HHCOL2"))
    if t == 7:
        o = "a jade flute with gold-filigree bands and gem tassels held low"
        assert s.count(o) == 1; s = s.replace(o, "a jade flute with gold-filigree bands and gem tassels, no round charm on it, held low")
        g = ", gaze to the viewer,"  # fit 10 000: boilerplate (eyes-to-viewer said earlier), as HAN4 L1773 trims
        assert s.count(g) == 1; s = s.replace(g, ","); allows.append(("gaze to the viewer", "fit 10 000: boilerplate, as HAN4"))
    s = s.replace(f"vân kiên L1903\"", f"vân kiên {cap}\"")
    out = f"s62_t{t}_THU_vankien2_OLD_clasp_{cap}.txt"
    open(out, "w", encoding="utf-8").write(s)
    with open(out + ".keep", "w", encoding="utf-8") as k:
        k.write(f"base: dev/art/thu_comoi/s62_t{t}_THU_vankien2_L1903.txt\n")
        k.write(f"allow: its front CUT AWAY   # owner {cap}: L1924 clasp collar (collar only)\n")
        for a, w in allows: k.write(f"allow: {a}   # {w}\n")
    print(t, out, len(s))
