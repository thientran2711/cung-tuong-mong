# Owner L1861 (via Foreman C #25, A48): the Hán Phi t5 prompt that drew CqnIKlAEEy, byte-for-byte, with ONLY luxury items DELETED.
# No words added, no rewrites; rank, caption, colours, fabric, hair style, pose, item, collar untouched.
D='/home/user/cung-tuong-mong/dev/art/seasons4/'
def cut(t,a):
    assert t.count(a)==1,(a[:80],t.count(a)); return t.replace(a,"")
t=open(D+'s62_t5_HAN_LADDER4_L1773.txt').read()
DEL=[
", clearly much richer and more splendid than the lower ranks",
" and a little more embroidery on the sleeves than the Tần",
" the robe body densely embroidered ALL OVER (not only the borders) with many LARGE spring flowers spread over the whole garment, clearly more embroidery than any palace maid (large magnolia medallions, peach blossoms and cloud-and-swallow scrolls in gold);",
" SHOULDER FRINGE: a flat pearl-and-jade bead yoke over both shoulders with a longer, fuller pearl fringe of bigger pearls, lying outside the collar, never touching or hiding the collar;",
" a LARGER gold headdress with dangling gold tassels and jade pins;",
" and several gold hairpins (trâm) with dangles, rich like her rank",
", BIG, a full bloom clearly bigger than at the Tần rank",
]
for a in DEL: t=cut(t,a)
open(D+'han_phi_simplified_L1861.txt','w').write(t)
