# Build img/FIGURES-kc.json (khue cac thuong phuc, tier 'kc', a18 only) from gens.txt rows marked 'final'.
# Separate manifest on purpose: j39 loadFigs reads only FIGURES/-servants/-others.json and figTier('kc') -> null, so 'kc'
# records inside those files would compete with palace tiers. The outside route (jkc) must read this file itself.
# Usage: python3 manifest.py WORKDIR   (WORKDIR/img holds the finished fig/por files)
import sys,os,json,re
H=os.path.dirname(os.path.abspath(__file__));R=os.path.abspath(os.path.join(H,'../../..'))
W=sys.argv[1]
J=json.load(open(os.path.join(R,'dev/figwork/jobs.json')))
SERV={}
try:SERV={f['identity']:f.get('palette') for f in json.load(open(os.path.join(W,'servants.json'))) if f.get('tier')=='t1' and f.get('ageBand')=='a18'}
except Exception:pass
rows=[l.split() for l in open(os.path.join(H,'gens.txt')) if l.strip() and not l.startswith('#')]
out=[]
for r in rows:
    if len(r)<6 or r[5]!='final':continue
    c,gen=r[0],r[1];role='maid' if c.startswith('m') else 'consort'
    fig=f'img/fig-{role}-{c}-kc-a18.webp';por=f'img/por-{role}-{c}-kc-a18.webp'
    if not os.path.exists(os.path.join(W,fig)):print('missing',fig);continue
    pal=SERV.get(c) if role=='maid' else re.search(r'clean bright colours: ([^.]*)\.',J[f'N-{c}-t1']['prompt']).group(1)
    out.append({'role':role,'identity':c,'tier':'kc','ageBand':'a18','palette':pal,
                'magnificUrl':'https://www.magnific.com/app/creation/'+gen,'bg':r[4],'sheet':'KC-'+c,'file':fig,'por':por})
out.sort(key=lambda f:(f['role'],f['identity']))
os.makedirs(os.path.join(R,'img'),exist_ok=True)
json.dump(out,open(os.path.join(R,'img','FIGURES-kc.json'),'w'),ensure_ascii=False,indent=0)
print(len(out),'records')
