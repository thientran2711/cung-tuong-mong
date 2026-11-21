import os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')) if os.path.basename(os.path.dirname(os.path.abspath(__file__)))=='thu_comoi' else os.chdir('/home/user/cung-tuong-mong/dev/art')
b='thu_comoi/s62_t5_THU_COMOIk.txt'; n='thu_comoi/s62_t5_THU_COMOIl.txt'
o='a broad gold brocade girdle tied flat'; nw='an embroidered silk sash tied flat'
t=open(b).read(); assert t.count(o)==1; t=t.replace(o,nw); open(n,'w').write(t)
open(n+'.keep','w').write('base: dev/art/%s\nallow: %s  # owner L1668 Phi sash = ORIGINAL words (no gold, no brocade): "an embroidered silk sash" from the OLD Tần design Phi took at the 19/11 swap (golden_low t4_v0 / rank8-s62/s62_t4.txt, gen SyhIap2Ub8); DESIGN22\n'%(b,o))
print(len(t))
