#!/usr/bin/env python3
"""REVERT1 owner L1747 (via Foreman C #21): fix5 eIPWWUNdqL drew a HIGH STAND collar. fix6 = fix5 + the fix4 square-collar words (identical in fix4/fix5)
made explicit: a LOW open square neckline, never a stand/mandarin collar; 'wide stiff band' -> 'wide flat band'; cloud collar never rising up the neck."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
def rep(t, o, n):
    assert t.count(o) == 1, (o[:70], t.count(o)); return t.replace(o, n)
t = open(os.path.join(D, 's62_t8_THU_fix5_L1737.txt')).read().strip()
t = rep(t, "a straight SQUARE collar (no crossed collar) framed by a wide stiff band in her second colour embroidered with tree peonies, always fully visible,",
           "a straight SQUARE collar (no crossed collar): a LOW open square neckline across the upper chest, neck and collarbones bare, NEVER a high stand collar or mandarin collar, framed by a wide flat band in her second colour embroidered with tree peonies, always fully visible,")
t = rep(t, "with layered pearl fringes hanging straight down, open at the front, never hiding the square collar",
           "with layered pearl fringes hanging straight down, open at the front, never rising up the neck, never hiding the square collar")
t = rep(t, "Mùa Thu · Hoàng hậu · một tông màu L1737", "Mùa Thu · Hoàng hậu · cổ vuông L1747")
p = os.path.join(D, 's62_t8_THU_fix6_L1747.txt'); open(p, 'w').write(t + '\n'); print(len(t))
