# THUROOT3 owner L2069/L2071: Phi t5 back to the APPROVED collar words (lJt1TyWgv9 = s62 fix_L1856; s63-65 L2026),
# + family neck words (THUROOT2 NECK) + L2069 chest words (ROOT-B2 wording, Phi = larger than Tần). Nothing else changed.
import re
B={'62':'s62_t5_THU_fix_L1856.txt','63':'s63_t5_THU_L2026.txt','64':'s64_t5_THU_L2026.txt','65':'s65_t5_THU_L2026.txt'}
for s,base in B.items():
    t=open(base).read()
    m=re.search(r"framed by a wide flat band in her second colour embroidered with ([^,]+), always fully visible,",t)
    fl=m.group(1); old=m.group(0)
    new=(f"framed by a wide flat band in her second colour embroidered with {fl} (the square band stops at the shoulders, nothing rises up the neck, neck bare), always fully visible, "
         f"a large cluster of {fl} embroidered in gold thread in the middle of the chest panel, centred between the neckline band and the sash, part of the robe's embroidery, larger than the Tần's, never inside the neckline, never framed,")
    assert t.count(old)==1; t=t.replace(old,new)
    o2='never hiding the square collar;'
    assert t.count(o2)==1
    t=t.replace(o2,"never hiding the square collar, the cloud collar and its pearl net exactly like image 2 (same shape, net, gold tassels and pearl fringe; image 2 shows the collar only, the neck band in it is NOT copied);")
    assert len(t)<=9999,(s,len(t))
    open(f's{s}_t5_THU_L2079.txt','w').write(t)
    open(f's{s}_t5_THU_L2079.txt.keep','w').write(f"base: dev/art/thu_comoi/{base}\n")
    print(s,fl,len(t))
