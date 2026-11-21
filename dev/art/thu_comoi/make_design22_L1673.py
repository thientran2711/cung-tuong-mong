import os
os.chdir('/home/user/cung-tuong-mong/dev/art')
R='owner L1673: sash = 20/11 Set A words verbatim (rank8-s62/s62_t%d.txt, gen %s); DESIGN22'
SA='an embroidered silk sash with hanging jade belt pendants and tassels'
J={
 't3':('dapung4/s62_t3_COMOI_v10.txt','dapung4/s62_t3_COMOI_v11.txt',3,'vQARGIUa47',[('a wide soft blush silk girdle at the natural waist','a wide stiff blush brocade girdle at the natural waist','R')]),
 't4':('thu_comoi/s62_t4_THU_COMOIl.txt','thu_comoi/s62_t4_THU_COMOIm.txt',4,'SyhIap2Ub8',[('an embroidered silk sash tied flat at the CENTRE front, NO bow, with a carved jade pendant set (ngọc bội) and tassels in front, never covered',SA+', never covered','R')]),
 't5':('thu_comoi/s62_t5_THU_COMOIl.txt','thu_comoi/s62_t5_THU_COMOIm.txt',4,'SyhIap2Ub8 (swap source, owner L1668)',[('an embroidered silk sash tied flat at the CENTRE front, NO bow, with two long carved jade pendant sets (ngọc bội) and tassels in front, never covered',SA+', never covered','R')]),
 't8':('thu_comoi/s62_t8_THU_COMOI_v10j.txt','thu_comoi/s62_t8_THU_COMOI_v10k.txt',8,'KLpVBAXkqp',[
   ('a wide yellow sash and a wide inner panel','a wide inner panel','R'),
   ('strands of pearls across the chest, floor-length robe, slim,','strands of pearls across the chest, a jade-and-gold belt with long tassels and jade pendants, robe slim,','A38 "floor-length robe" = repeat of the S19 tail; owner L1673 Set A belt added'),
   ('THREE-COLOUR RULE (t7/t8):','THREE-COLOUR RULE:','A38 internal tier label, for the Set A belt'),
   ('Pose: weight on one leg, a gold','Pose: a gold','A38 repeat of "weight resting on her RIGHT foot" (gate-passed before, DESIGN22 job1), for the Set A belt')]),
}
for k,(b,n,ti,gid,reps) in J.items():
  t=open(b).read(); L0=len(t); al=[]
  for o,nw,why in reps:
    assert t.count(o)==1,(k,o); t=t.replace(o,nw)
    al.append((o, R%(ti,gid) if why=='R' else why+'; DESIGN22'))
  open(n,'w').write(t)
  with open(n+'.keep','w') as f:
    f.write('base: dev/art/%s\n'%b)
    for a,r in al: f.write('allow: %s  # %s\n'%(a,r))
  print(k,n,L0,'->',len(t))
