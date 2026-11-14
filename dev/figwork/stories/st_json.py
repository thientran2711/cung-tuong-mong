# python3 st_json.py -> adds "stories" to img/EVENTS.json: {arcId:{fb:evCat, files:{key:path}}} (only files that exist)
# keys: s1 s2 c1 c2 c3 t1 x1 (hồi), bia (cover), ket-<ending> (win/mid/lose/...), ket (closing). fb = ev-* category used when a file is missing.
import json,os,sys;H=os.path.dirname(os.path.abspath(__file__));sys.path.insert(0,H);import st_prompt as P
ROOT=os.path.abspath(os.path.join(H,'../../..'))
FB={'tt':'trieu-chinh','dtq':'bien-ai','muoi':'tham-quan','cn':'cung-nhan','nc':'su-than','td':'vu-oan','ch':'thinh-an','thd':'tai-nghe','cnv':'cung-nu','st':'tan-phong'}
STAR={'s_than':'thu-nha','s_thu':'tai-mat','s_hoa':'hoa-hoan','s_su':'su-than','s_dich':'dich-benh','s_tinh':'tu-tinh','s_thay':'cung-nhan','s_ban':'mat-uoc'}
FBE={1:'tan-phong',0:None,-1:'lanh-cung'}
J=json.load(open(os.path.join(ROOT,'img/EVENTS.json')))
st={}
for aid,a in P.D['arcs'].items():
    fs={}
    for k,_ in P.panels(aid):
        p='img/st-%s-%s.webp'%(aid.replace('_','-'),k)
        if os.path.exists(os.path.join(ROOT,p)): fs[k]=p
    st[aid]={'title':a['t'],'o':a['o'],'fb':STAR.get(aid) or FB.get(a['o'],'trieu-chinh'),
             'efb':{k:(FBE[e['k']] or None) for k,e in a['E'].items()},'files':fs}
J['stories']=st
json.dump(J,open(os.path.join(ROOT,'img/EVENTS.json'),'w'),ensure_ascii=False,indent=1)
print(len(st),'arcs',sum(len(s['files']) for s in st.values()),'story files')
