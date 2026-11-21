import os,re
os.chdir('/home/user/cung-tuong-mong/dev/art')
J=[('dapung4/s62_t1_COMOI_v10.txt','dapung4/s62_t1_COMOI_v11.txt','pale lilac'),
   ('dapung4/s62_t2_COMOI_v10.txt','dapung4/s62_t2_COMOI_v11.txt','lilac'),
   ('dapung4/s62_t3_COMOI_v11.txt','dapung4/s62_t3_COMOI_v12.txt','lilac'),
   ('thu_comoi/s62_t4_THU_COMOIm.txt','thu_comoi/s62_t4_THU_COMOIn.txt','lilac'),
   ('thu_comoi/s62_t5_THU_COMOIm.txt','thu_comoi/s62_t5_THU_COMOIn.txt','lilac'),
   ('thu_comoi/s62_t6_THU_COMOIm.txt','thu_comoi/s62_t6_THU_COMOIn.txt','lilac'),
   ('thu_comoi/s62_t7_THU_COMOI_v8l.txt','thu_comoi/s62_t7_THU_COMOI_v8m.txt','lilac'),
   ('thu_comoi/s62_t8_THU_COMOI_v10k.txt','thu_comoi/s62_t8_THU_COMOI_v10l.txt','lilac')]
WHY='owner L1674 G50 PAL3: s62 thu palette = light olive #9FB577 (ô liu sáng) + %s #FBE8F8 (hồng tím phấn), colour names/hexes only (COLORFIX1 cd40fcb method); DESIGN22'
for b,n,sec in J:
  t=open(b).read(); L0=len(t)
  # collect changed phrases for .keep: each sentence-fragment containing an old colour word
  frags=set(m.group(0) for m in re.finditer(r'[^,;:.()]*(?:light plum|#DF9ED9|\bblush\b)[^,;:.()]*',t))
  t2=t.replace('light plum','light olive').replace('#DF9ED9','#9FB577')
  t2=re.sub(r'\bblush\b',sec,t2)
  if len(t2)>10000: t2=t2.replace('deeper light olive','deeper olive')
  assert 'blushed' in t2
  open(n,'w').write(t2)
  with open(n+'.keep','w') as f:
    f.write('base: dev/art/%s\n'%b)
    for fr in sorted(frags):
      fr=fr.strip()
      if fr: f.write('allow: %s  # %s\n'%(fr,WHY%sec))
  print(n,L0,'->',len(t2),len(frags))
