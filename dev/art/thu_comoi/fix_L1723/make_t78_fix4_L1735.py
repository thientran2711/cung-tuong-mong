#!/usr/bin/env python3
"""REVERT1 (owner via Foreman C #20, on t8 nVsiOyRYQD): one colour family for the embroidered flowers (tone-on-tone lilac + gold, no rainbow)
+ G33 way B plumage (outer = secondary lilac, inner = main light olive, tips/eyes = deeper olive, gold outline), crown inlay matched. t7 the same."""
import os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ONE = "every flower in ONE colour family only: tone-on-tone lighter and deeper shades of lilac with gold, never mixed with red, pink or other colours, elegant and noble"
PLU = "the phoenixes' plumage with OUTER feathers in lilac, inner feathers in light olive, feather tips and eyes in deeper olive, with gold-thread outlines"
CROWN = "its phoenix feathers inlaid in the same plumage colours as the robe phoenixes (lilac outer, light olive inner, deeper olive tips)"
def rep(t, o, n):
    assert t.count(o) == 1, (o[:70], t.count(o)); return t.replace(o, n)
JOBS = {
 8: ("s62_t8_THU_fix3_L1726.txt", "s62_t8_THU_fix4_L1735.txt", [
   ("tree peonies (deep rose-red and lilac) and clouds in gold, lilac and light olive silk thread", f"tree peonies and clouds in gold and lilac silk thread, {ONE}; {PLU}"),
   ("its phoenix feathers inlaid in lilac and light olive", CROWN),
   ("Mùa Thu · Hoàng hậu · dáng thon L1726", "Mùa Thu · Hoàng hậu · một tông màu L1735")]),
 7: ("s62_t7_THU_fix2_L1726.txt", "s62_t7_THU_fix3_L1735.txt", [
   ("bomb-form herbaceous peonies (soft rose-pink and ivory) and auspicious clouds", "bomb-form herbaceous peonies and auspicious clouds"),
   ("the phoenixes' plumage in lilac and light olive with gold-thread outlines", f"{ONE}; {PLU}"),
   ("its phoenix feathers inlaid in lilac and light olive", CROWN),
   ("Mùa Thu · Hoàng quý phi · đá cabochon L1726", "Mùa Thu · Hoàng quý phi · một tông màu L1735")])}
for n, (src, dst, R) in JOBS.items():
    t = open(os.path.join(D, src)).read().strip()
    for o, w in R: t = rep(t, o, w)
    p = os.path.join(D, dst); open(p, 'w').write(t + '\n'); print(dst, len(t))

# fix5 (owner L1737 via Foreman C #20: fix3 shoulders/slim were not asked) = fix2_L1726 + ONLY the fix4 words
t = open(os.path.join(D, "s62_t8_THU_fix2_L1726.txt")).read().strip()
for o, w in JOBS[8][2][:2]: t = rep(t, o, w)
t = rep(t, "Mùa Thu · Hoàng hậu · đá cabochon L1726", "Mùa Thu · Hoàng hậu · một tông màu L1737")
open(os.path.join(D, "s62_t8_THU_fix5_L1737.txt"), "w").write(t + "\n"); print("s62_t8_THU_fix5_L1737.txt", len(t))
