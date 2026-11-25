# W8 NB2: summary of rc-scan.js — per family: real changes on a tap whose result card (Được / Mất / Kèm) does not name them.
# usage: python3 rc-sum.py <out.jsonl> [--ex N]
import json,sys,re,collections
RK={"sung":"Sủng","danh":"Danh","suc":"Sức","bac":"Bạc","duc":"Đức","th":"Thái hậu","hh":"Hoàng hậu","sac":"Sắc","tai":"Tài","tamco":"Tâm cơ","mat":"Tai mắt","an":"Ân tình","tin":"Chủ tin"}
SKIP=re.compile(r'^(used|S\.turn|S\.buoi|logs|S\.dead|S\.rank|S\.lot|S\.preg|S\.confined|S\.out|S\.ev|staff\.|rv\..*\.(alive|out|rank|suc|sung|danh)$|emp\.mood)')
ex=int(sys.argv[sys.argv.index('--ex')+1]) if '--ex' in sys.argv else 4
fam=collections.defaultdict(lambda:[0,0,[]]);cards=0;runs=0;perr=None
for ln in open(sys.argv[1],encoding='utf8'):
  r=json.loads(ln)
  if 'pageErrors' in r: perr=r['pageErrors'];continue
  runs+=1;res=r.get('res') or {};kr=res.get('kres')
  if not kr: continue
  cards+=1
  items=" ".join(" ".join(x['items']) for x in kr.get('rows',[]))
  toast=res.get('toast','');kem=toast.split('Kèm',1)[1] if 'Kèm' in toast else ''
  txt=items+" "+kem+" "+" ".join(kr.get('kem') or [])
  for k,(a,b) in (r.get('d') or {}).items():
    if SKIP.match(k) or a==b: continue
    if isinstance(a,(int,float)) and isinstance(b,(int,float)) and round(b-a)==0: continue
    if k.startswith('S.'): f='her stat';lab=RK.get(k[2:],k[2:]);ok=lab in txt
    elif k=='maid.loyal': f='her maid';ok='thiện cảm' in txt
    elif k.startswith('rv.'):
      f='consort '+k.rsplit('.',1)[1];nm=k[3:].rsplit('.',1)[0].replace('HH ','');ok=(nm in txt) or (nm.split()[-1] in txt) or ('một vị' in txt)
    elif k.startswith('srv.'):
      f='servant '+k.split('|')[0].rsplit('.',1)[1];nm=k.split('|',1)[1];ok=any(p.strip() and p.strip() in txt for p in nm.split('·'))
    elif k.startswith('court.'): f='court af';ok=k.split('|',1)[1] in txt
    elif k.startswith('kn.'): f='familiarity';ok=bool(re.search(r'quen biết|biết tên|thấy mặt',txt,re.I))
    elif k.startswith('inv.'): f='bag item';ok=bool(re.search(r'được|mất|vật|món',items,re.I)) and False
    elif k.startswith('kid.'): f='child';ok=k.split('.')[1] in txt
    elif k.startswith('art.'): f='art skill';ok=False
    else: f='other '+k.split('.')[0];ok=False
    F=fam[f];F[0]+=1
    if not ok:
      F[1]+=1
      if len(F[2])<ex: F[2].append(f"{r.get('sc')} {r.get('sf')} «{(r.get('card') or {}).get('name','')[:40]}» {r.get('run')}: {k} {a}→{b}")
print(f"runs {runs} · result cards {cards} · page errors {len(perr or [])}")
print("| family | changes under a card | NOT named on the card | examples |\n|---|---|---|---|")
for f,(n,m,E) in sorted(fam.items(),key=lambda x:-x[1][1]): print(f"| {f} | {n} | {m} | {'<br>'.join(E)} |")
print("RC-SCAN MISSING", sum(v[1] for v in fam.values()))
