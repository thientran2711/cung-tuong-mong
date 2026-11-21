import sys,os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
B52=', never over the edge, cuff or hem bands'
TRIM=(', with natural creases, never stiff, flat or board-like',', with natural creases')
J={ # base, new, [(old,new,reason)]
 't1':('dapung4/s62_t1_COMOI_v7.txt','dapung4/s62_t1_COMOI_v10.txt',[
   ('lilac sprays over the upper garment and the skirt','lilac sprays over the upper garment and the skirt'+B52,'G52')]),
 't2':('dapung4/s62_t2_COMOI_v9.txt','dapung4/s62_t2_COMOI_v10.txt',[
   ('tiger lilies over the robe and skirt','tiger lilies over the robe and skirt'+B52,'G52')]),
 't3':('dapung4/s62_t3_COMOI_v9.txt','dapung4/s62_t3_COMOI_v10.txt',[
   ('China roses over robe and skirt','China roses over robe and skirt'+B52,'G52'),
   (', framing the bordered square neckline','','A38')]),
 't4':('thu_comoi/s62_t4_THU_COMOIj.txt','thu_comoi/s62_t4_THU_COMOIk.txt',[
   ('lotus flowers over the robe and skirt','lotus flowers over the robe and skirt, never over the bands','G52'),
   ('an embroidered silk sash tied flat','a flowered brocade sash tied flat','G51')]),
 't5':('thu_comoi/s62_t5_THU_COMOIi.txt','thu_comoi/s62_t5_THU_COMOIj.txt',[
   ('double hollyhocks over the robe and skirt','double hollyhocks over the robe and skirt, never over the bands','G52'),
   ('a broad gold brocade girdle tied flat','a blush flowered brocade girdle tied flat','G51'),
   ('a SHORT round-pearl strand hangs in a short swag from the left capelet front to the right','a SHORT round-pearl strand swags ACROSS her chest, left capelet front to right','G49')]),
   ('lotus flowers over the robe and skirt','lotus flowers over the robe and skirt'+B52,'G52'),
   ('an embroidered silk sash tied flat','a flowered brocade sash tied flat','G51'),
   (' Everyone beautiful at every age.','','A38')]),
 't5':('thu_comoi/s62_t5_THU_COMOIi.txt','thu_comoi/s62_t5_THU_COMOIj.txt',[
   ('double hollyhocks over the robe and skirt','double hollyhocks over the robe and skirt, never over the bands','G52'),
   ('a broad gold brocade girdle tied flat','a blush flowered brocade girdle tied flat','G51'),
   ('a SHORT round-pearl strand hangs in a short swag from the left capelet front to the right','a SHORT round-pearl strand swags ACROSS her chest, left capelet front to right','G49')]),
   ('double hollyhocks over the robe and skirt','double hollyhocks over the robe and skirt'+B52,'G52'),
   ('a broad gold brocade girdle tied flat','a broad gold flowered brocade girdle tied flat','G51'),
   ('a SHORT round-pearl strand hangs in a short swag from the left capelet front to the right','a SHORT round-pearl strand swags ACROSS her chest, left capelet front to right','G49'),
   (' Everyone beautiful at every age.','','A38')]),
 't6':('thu_comoi/s62_t6_THU_COMOIk.txt','thu_comoi/s62_t6_THU_COMOIl.txt',[
   ('cuffs and skirt-front medallions)','cuffs and skirt-front medallions), the body motifs never over these bands','G52'),
   ('a yellow sash and narrow','a yellow flowered brocade sash and narrow','G51'),
   ('across the chest, and a grander gold headdress with more gold ornaments, elegant','across the chest, elegant','A38')]),
 't7':('thu_comoi/s62_t7_THU_COMOI_v8j.txt','thu_comoi/s62_t7_THU_COMOI_v8k.txt',[
   ('a wide yellow sash,','a wide yellow flowered brocade sash,','G51')]),
 't8':('thu_comoi/s62_t8_THU_COMOI_v10h.txt','thu_comoi/s62_t8_THU_COMOI_v10i.txt',[
   ('a wide yellow sash and','a wide yellow flowered brocade sash and','G51'),
   ('Pose: weight on one leg, a gold','Pose: a gold','A38')]),
}
for k,(b,n,reps) in J.items():
  t=open(b).read(); L0=len(t); allow=[]
  for o,nw,why in reps:
    assert t.count(o)==1,(k,o,t.count(o))
    t=t.replace(o,nw)
    if why=='A38': allow.append((o.strip(', ;') if not nw else o,'A38 repeat of words already in the prompt, trimmed for 10 000 (owner L1653 G51/G52 adds); DESIGN22'))
    elif why=='G49': allow.append((o,'owner L1645 G49 pearl swag did not show in draft hu2eAbgvqL -> clearer, same length; DESIGN22'))
    elif why=='G51': allow.append((o,'owner L1653 G51 flowered brocade sash on every tier t3-t8; DESIGN22'))
  open(n,'w').write(t)
  with open(n+'.keep','w') as f:
    f.write('base: dev/art/%s\n'%b)
    for a,r in allow: f.write('allow: %s  # %s\n'%(a,r))
    if not allow: f.write('# additions only: G52 (owner L1653) "%s"; DESIGN22\n'%B52.strip(', '))
  print(k,n,L0,'->',len(t))
