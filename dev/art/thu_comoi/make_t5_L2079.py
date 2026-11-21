# THUROOT3 owner L2069/L2071: Phi t5 back to the APPROVED collar words (lJt1TyWgv9 = s62 fix_L1856; s63-65 L2026),
# + family neck words (THUROOT2 NECK) + L2069 chest words (ROOT-B2 wording, Phi = larger than Tần). Nothing else changed.
import re
B={'62':'s62_t5_THU_fix_L1856.txt','63':'s63_t5_THU_L2026.txt','64':'s64_t5_THU_L2026.txt','65':'s65_t5_THU_L2026.txt'}
for s,base in B.items():
    t=open(base).read()
    m=re.search(r"framed by a wide flat band in her second colour embroidered with ([^,]+), always fully visible,",t)
    fl=m.group(1); old=m.group(0)
    new=(f"framed by a wide flat band in her second colour embroidered with {fl} (the square band stops at the shoulders, nothing rises up the neck, neck bare), always fully visible, "
         f"a large cluster of {fl} embroidered in gold thread in the UPPER middle of the chest panel, just under the neckline band, never hidden by the held item, part of the robe's embroidery, larger than the Tần's, never inside the neckline, never framed,")
    assert t.count(old)==1; t=t.replace(old,new)
    o2='never hiding the square collar;'
    assert t.count(o2)==1
    t=t.replace(o2,"never hiding the square collar, the cloud collar and its pearl net exactly like image 2 (same shape, net, gold tassels and pearl fringe; image 2 shows the collar only, the neck band in it is NOT copied);")
    assert len(t)<=9999,(s,len(t))
    import re as _re
    _cap=_re.search(r"\n+(CAPTION:[^\n]*)\n?$",t); capline=_cap.group(1) if _cap else ''
    t=t[:_cap.start()].rstrip()+"\n" if _cap else t
    open(f's{s}_t5_THU_L2079.txt','w').write(t)
    open(f's{s}_t5_THU_L2079.txt.keep','w').write(f"base: dev/art/thu_comoi/{base}\n")
    if capline:
        with open(f's{s}_t5_THU_L2079.txt.keep','a') as _k:
            for _c in re.split(r', |: ',capline):
                _c=_c.strip()
                if len(_c)>3 and not _c.startswith('CAPTION'): _k.write('allow: '+_c+'  # A53 owner L2110: ChatGPT paste file, no test-label caption\n')
    print(s,fl,len(t))
