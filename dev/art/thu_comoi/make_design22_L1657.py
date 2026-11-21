import os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
C='; the sash tied over the outer robe holds it in at the waist'
R='owner L1657 G51 correction: original sash words back (L1653 flowered-brocade carry-up undone); DESIGN22'
J={
 't4':('thu_comoi/s62_t4_THU_COMOIk.txt','thu_comoi/s62_t4_THU_COMOIl.txt',[('a flowered brocade sash tied flat','an embroidered silk sash tied flat',R)]),
 't5':('thu_comoi/s62_t5_THU_COMOIj.txt','thu_comoi/s62_t5_THU_COMOIk.txt',[('a blush flowered brocade girdle tied flat','a broad gold brocade girdle tied flat',R+' (Foreman C #17: blush change removed)')]),
 't6':('thu_comoi/s62_t6_THU_COMOIl.txt','thu_comoi/s62_t6_THU_COMOIm.txt',[('a yellow flowered brocade sash and','a yellow sash and',R),
   ('neck and collarbones visible;','neck and collarbones visible'+C+';',None),
   ('her own colour stays clearly the main robe colour, ','','A38 repeat of COLOUR RULE "light plum ... is the main colour of the robe" (cut before by LADDER2), for the G51 held-in clause; DESIGN22')]),
 't7':('thu_comoi/s62_t7_THU_COMOI_v8k.txt','thu_comoi/s62_t7_THU_COMOI_v8l.txt',[('a wide yellow flowered brocade sash,','a wide yellow sash,',R),
   ('framing the bordered square neckline;','framing the bordered square neckline'+C+';',None),
   ('floor-length robe with slippers visible','floor-length robe','A38 repeat of the S19 tail "floor-length robe, only slipper toe tips" (LADDER2 v8g same trim), for the G51 held-in clause; DESIGN22')]),
 't8':('thu_comoi/s62_t8_THU_COMOI_v10i.txt','thu_comoi/s62_t8_THU_COMOI_v10j.txt',[('a wide yellow flowered brocade sash and','a wide yellow sash and',R),
   ('Pose: a gold','Pose: weight on one leg, a gold',None)]),
}
for k,(b,n,reps) in J.items():
  t=open(b).read(); L0=len(t); al=[]
  for o,nw,why in reps:
    assert t.count(o)==1,(k,o); t=t.replace(o,nw)
    if why: al.append((o.strip(', ;'),why))
  open(n,'w').write(t)
  with open(n+'.keep','w') as f:
    f.write('base: dev/art/%s\n'%b)
    for a,r in al: f.write('allow: %s  # %s\n'%(a,r))
  print(k,n,L0,'->',len(t))
