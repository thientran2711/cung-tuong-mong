#!/usr/bin/env python3
"""REVERT1 owner L1776 (via Foreman C #21) audit fixes for G53 (THU square collar all tiers, fix6 words):
LOW open square neckline, neck and collarbones bare, never a stand/mandarin collar; 'wide stiff band' -> 'wide flat band'; cloud collar never rising up the neck."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SQ = "a LOW open square neckline across the upper chest, neck and collarbones bare, NEVER a high stand collar or mandarin collar"
def rep(t, o, n):
    assert t.count(o) == 1, (o[:70], t.count(o)); return t.replace(o, n)
def sqc(t):   # t5/t6/t7 L1719 form
    return rep(t, "a straight SQUARE collar (no crossed collar) framed by a wide stiff band", f"a straight SQUARE collar (no crossed collar): {SQ}, framed by a wide flat band")
JOBS = [
 ("s62_t1_THU_L1723", "s62_t1_THU_fix_L1776", lambda t: rep(rep(t,
   "a snug crossed-collar upper garment with long wide flowing sleeves",
   f"a snug upper garment with a straight SQUARE collar (no crossed collar): {SQ}, edged by a wide flat lilac band embroidered with lilac flowers, with long wide flowing sleeves"),
   "Mùa Thu · Đáp ứng · prompt cũ L1723", "Mùa Thu · Đáp ứng · cổ vuông L1776")),
 ("s62_t2_THU_L1723", "s62_t2_THU_fix_L1776", lambda t: rep(rep(t,
   "a fine silk robe with delicate embroidered tiger lilies at the collar,",
   f"a fine silk robe with a straight SQUARE collar (no crossed collar): {SQ}, framed by a wide flat lilac band, delicate embroidered tiger lilies at the collar,"),
   "Mùa Thu · Thường tại · prompt cũ L1723", "Mùa Thu · Thường tại · cổ vuông L1776")),
 ("s62_t3_THU_L1723", "s62_t3_THU_fix_L1776", lambda t: rep(rep(t,
   "a straight SQUARE NECKLINE framed by a wide stiff lilac embroidered",
   f"a straight SQUARE NECKLINE ({SQ}) framed by a wide flat lilac embroidered"),
   "Mùa Thu · Quý nhân · prompt cũ L1723", "Mùa Thu · Quý nhân · cổ vuông L1776")),
 ("s62_t5_THU_fix_L1723", "s62_t5_THU_fix_L1776", lambda t: rep(sqc(t), "Mùa Thu · Phi · lưới ngọc trai L1723", "Mùa Thu · Phi · cổ vuông L1776")),
 ("s62_t6_THU_fix2_L1726", "s62_t6_THU_fix_L1776", lambda t: rep(rep(sqc(t),
   "a fringe of small gold tassels, open at the front, never hiding the square collar", "a fringe of small gold tassels, open at the front, never rising up the neck, never hiding the square collar"),
   "Mùa Thu · Quý phi · hoa trà L1726", "Thu · Quý phi · cổ vuông")),
 ("s62_t7_THU_fix3_L1735", "s62_t7_THU_fix4_L1776", lambda t: rep(rep(sqc(t),
   "edged with pearls and gold over the shoulders, open at the front, never hiding the square collar", "edged with pearls and gold over the shoulders, open at the front, never rising up the neck, never hiding the square collar"),
   "Mùa Thu · Hoàng quý phi · một tông màu L1735", "Mùa Thu · Hoàng quý phi · cổ vuông L1776")),
]
for src, dst, f in JOBS:
    t = f(open(os.path.join(D, src + '.txt')).read().strip())
    open(os.path.join(D, dst + '.txt'), 'w').write(t + '\n'); print(dst, len(t))
