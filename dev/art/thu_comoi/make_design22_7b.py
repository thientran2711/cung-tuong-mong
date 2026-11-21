import os
os.chdir('/home/user/cung-tuong-mong/dev/art')
O8='the outer robe is a WRAP robe HELD IN by the sash: its front edges overlap at the waist, bound CLOSED under the sash lying ON TOP of it, outer robe fabric on both sides of the waist above and below the sash, never an open coat'
J=[('thu_comoi/s62_t4_THU_COMOIn.txt','thu_comoi/s62_t4_THU_COMOIo.txt',[('hanging jade belt pendants and tassels, never covered','hanging jade belt pendants and tassels, NO bow, never covered','')]),
   ('thu_comoi/s62_t5_THU_COMOIn.txt','thu_comoi/s62_t5_THU_COMOIo.txt',[('hanging jade belt pendants and tassels, never covered','hanging jade belt pendants and tassels, NO bow, never covered','')]),
   ('thu_comoi/s62_t8_THU_COMOI_v10l.txt','thu_comoi/s62_t8_THU_COMOI_v10m.txt',[(O8,O8.replace('sash','belt'),'Foreman C #17 job 7b (CHECK2 job 6 note): held-in clause names the Set A jade-and-gold belt (owner L1673), not a sash; DESIGN22')])]
for b,n,reps in J:
  t=open(b).read(); L0=len(t); al=[]
  for o,nw,why in reps:
    assert t.count(o)==1,(b,o); t=t.replace(o,nw)
    if why: al.append((o,why))
  open(n,'w').write(t)
  with open(n+'.keep','w') as f:
    f.write('base: dev/art/%s\n'%b)
    for a,r in al: f.write('allow: %s  # %s\n'%(a,r))
    if not al: f.write('# addition only: ", NO bow" (G44, Foreman C #17 job 7b / CHECK2 job 6); DESIGN22\n')
  print(n,L0,'->',len(t))
