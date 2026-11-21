#!/usr/bin/env python3
"""M2147 t1-t3 (owner L2146/L2147, G74+G75): approved s62 thu t1/t2/t3 prompt (creation metadata)
+ soft vân kiên + throat clasp. Words only (A55); ANGLE/pose untouched (A54)."""
import re, pathlib
D = pathlib.Path(__file__).parent
COMMON = ("made of ONE layer of the SAME thin, light, flowing light olive silk as her robe, soft and unlined, "
          "it DRAPES gently DOWN over the shoulders like real cloth, following the downward slope of the shoulders "
          "and folding softly with every movement; joined at the throat by one small horizontal clasp (frog button), "
          "its front open below the clasp, its two front edges parting so the square collar and the chest stay fully visible")
VK = {
 1: ("a soft light olive vân kiên (small shoulder piece with gently rounded cloud lobes) as the THU signature, " + COMMON +
     "; the SIMPLEST and SHORTEST of all ranks, its lobes covering only about half the way from the neck to the shoulder points "
     "(shoulder-piece LENGTH rises by rank: Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest); "
     "PLAIN silk with only a thin lilac edge line along its lower edge, no embroidery on it"),
 2: ("a soft light olive vân kiên (small shoulder piece with gently rounded cloud lobes) as the THU signature, " + COMMON +
     "; a little longer than the Đáp ứng's, its lobes covering about two-thirds of the way from the neck to the shoulder points, still shorter than the Tần's "
     "(shoulder-piece LENGTH rises by rank: Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest); "
     "plain light olive silk with a fine embroidered lilac edge of tiny tiger-lily buds along its lower edge"),
 3: ("a soft light olive vân kiên (small shoulder piece with gently rounded cloud lobes) as the THU signature, " + COMMON +
     "; a little longer and prettier than the Thường tại's, its lobes reaching almost to the shoulder points, still shorter than the Tần's "
     "(shoulder-piece LENGTH rises by rank: Đáp ứng shortest, then Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest); "
     "LIGHTLY embroidered: a lilac edge and a few small China-rose sprigs in fine silk thread scattered on it"),
}
ANCHOR = {1: "never over the bands, with long wide", 2: "never over the bands, and a soft silk sash",
          3: "small flowers only; the robe sits firmly"}
INS = {1: ("never over the bands, ", "{vk}, "), 2: ("never over the bands, ", "{vk}, "), 3: ("small flowers only; ", "{vk}; ")}
SRC = {1: "base_t1_N2qJt3M6D9.txt", 2: "base_t2_3zKPvAYREY.txt", 3: "base_t3_s7Ik0wol8e.txt"}
OUT = {1: "M2147-01_DapUng_s62_thu_vankien.txt", 2: "M2147-02_ThuongTai_s62_thu_vankien.txt", 3: "M2147-03_QuyNhan_s62_thu_vankien.txt"}
for t in (1, 2, 3):
    s = (D / SRC[t]).read_text()
    a = ANCHOR[t]; assert s.count(a) == 1, (t, a)
    head, tail = INS[t]
    s = s.replace(a, head + tail.format(vk=VK[t]) + a[len(head):], 1)
    assert s.count("sleeves and any cape") == 1
    s = s.replace("sleeves and any cape", "sleeves and vân kiên", 1)   # G75: never write cape
    s = re.sub(r'CAPTION: .*$', 'CAPTION: write ONLY this code, small, bold, in the top-left corner, never over her: "M2147-0%d"' % t, s.rstrip(), flags=re.S)
    for bad in ("cape", "cloak", "stiff", "standing", "shape", "thick", "dense", "heavy"):
        n0 = (D / SRC[t]).read_text().lower().count(bad); n1 = s.lower().count(bad)
        assert n1 <= n0, (t, bad, n0, n1)   # no new forbidden word added
    (D / OUT[t]).write_text(s + "\n")
    oldcap = re.search(r'write exactly this Vietnamese text WITH accents: "([^"]+)"', (D / SRC[t]).read_text()).group(1)
    (D / (OUT[t] + ".keep")).write_text(f"allow: {oldcap}   # A56 old caption replaced by code\n" +
        f"base: dev/art/thu_comoi/M2147/{SRC[t]}\n"
        "allow: sleeves and any cape   # G75 owner L2146: never write cape -> 'vân kiên'\n"
        "allow: in LARGE bold letters   # A56 caption = code only\nallow: top-left corner\nallow: on the plain background\n"
        "allow: never over her body\nallow: write exactly this Vietnamese text WITH accents\n")
    print(OUT[t], len(s))
