# stage.py LOG OUTDIR DEST_SUBDIR LIST_OUT : copy QA-passing clean outputs into up/img/<sub>/ for cdn_sync; print counts per family
import sys,json,shutil,os,re,collections
log,od,sub,lo=sys.argv[1:5]; U='/home/user/wt/hda2-data/up/img/'+sub; os.makedirs(U,exist_ok=True)
c=collections.Counter(); ok=[]
for l in open(log):
    x=json.loads(l); f=re.sub(r'-(c|m)\d\d','',re.sub(r'-a\d\d','',x['name'])); f=re.sub(r'(ty|tm|t)\d',r'\1',f)
    st=x['status']
    if st=='clean' and not (x.get('size_ok') and x['out_mad']<=x['base_mad']+0.2): st='qafail'
    c[(f,st)]+=1
    if st=='clean': shutil.copy(f"{od}/{x['name']}.webp",f"{U}/{x['name']}.webp"); ok.append(('img/'+sub+'/' if sub else 'img/')+x['name']+'.webp')
open(lo,'w').write('\n'.join(ok)+'\n')
for k,v in sorted(c.items()): print(v,k)
