#!/usr/bin/env python3
"""REVERT1 owner L1797 (via Foreman C #22): t5 Phi pearls moderate (about the Tần's size, prettier, never big); t6 Quý phi cloud collar named a soft
draping CAPE like the HQP's (the HQP word that made her cape droop is 'cloud-collar cape')."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
def rep(t, o, n):
    assert t.count(o) == 1, (o[:70], t.count(o)); return t.replace(o, n)
JOBS = [
 ("s62_t5_THU_fix_L1776", "s62_t5_THU_fix_L1797", [
  ("its lower edge a pearl fringe LONGER and fuller than the Tần's, with bigger pearls,",
   "its lower edge a pearl fringe a little longer than the Tần's, with SMALL pearls of about the Tần's size, never big or heavy,"),
  ("a SHORT round-pearl strand swags ACROSS her chest,", "a SHORT strand of small round pearls swags ACROSS her chest,"),
  ("Mùa Thu · Phi · cổ vuông L1776", "Mùa Thu · Phi · ngọc trai nhỏ L1797")]),
 ("s62_t6_THU_fix_L1794", "s62_t6_THU_fix_L1797", [
  ("an embroidered SOFT silk cloud collar (yunjian) DRAPING softly over the shoulders,", "an embroidered SOFT silk cloud-collar cape (yunjian) DRAPING softly down over the shoulders,"),
  ('"Thu · Quý phi · L1794"', '"Thu · Quý phi · L1797"')]),
]
for src, dst, R in JOBS:
    t = open(os.path.join(D, src + '.txt')).read().strip()
    for o, n in R: t = rep(t, o, n)
    open(os.path.join(D, dst + '.txt'), 'w').write(t + '\n'); print(dst, len(t))
