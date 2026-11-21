#!/usr/bin/env python3
"""REVERT1 (Foreman C #20 after draw jUoqvBPLD0 still bell/wide): s62 t8 HH fix3 from fix2 — small flat cloud collar on the shoulders only,
sleeves straight down close to the body, column-slim robe, no A-line."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
def rep(t, o, n):
    assert t.count(o) == 1, (o[:70], t.count(o)); return t.replace(o, n)
t = open(os.path.join(D, 's62_t8_THU_fix2_L1726.txt')).read().strip()
t = rep(t, "a jewelled gold-and-pearl cloud collar lying FLAT and close on the shoulders, with layered pearl fringes hanging straight down,",
        "a SMALL jewelled gold-and-pearl cloud collar lying FLAT ON the shoulders only, never reaching past the shoulder line, with short pearl fringes hanging straight down,")
t = rep(t, " All gems are smooth polished CABOCHON", " SLIM EMPRESS SILHOUETTE: the sleeves hang straight down close to her body, never flaring out; the robe falls in a slim straight column to the floor, never an A-line, triangle or bell shape. All gems are smooth polished CABOCHON")
t = rep(t, "Mùa Thu · Hoàng hậu · đá cabochon L1726", "Mùa Thu · Hoàng hậu · dáng thon L1726")
p = os.path.join(D, 's62_t8_THU_fix3_L1726.txt'); open(p, 'w').write(t + '\n'); print(len(t))
open(p + '.keep', 'w').write("base: dev/art/thu_comoi/s62_t8_THU_fix2_L1726.txt\n# REVERT1 Foreman C #20 (owner L1723 bell shape, draw jUoqvBPLD0): small flat collar, slim column\n"
 "allow: lying FLAT and close on the shoulders  # collar ON the shoulders only\nallow: with layered pearl fringes hanging straight down  # short fringes, collar small\n"
 "allow: Mùa Thu · Hoàng hậu · đá cabochon L1726  # caption\n")
