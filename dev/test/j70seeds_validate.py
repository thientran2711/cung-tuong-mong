#!/usr/bin/env python3
"""ORDER THIN P6b seed validator (composed j70 ROUTES; schema in dev/handover/reports/thin.md «## API P6»).
usage: python3 dev/test/j70seeds_validate.py [files…] [--min] [--meths a,b]
  no file = every dev/handover/content/thin/j70seeds*.md; --min = ≥4 routes per method in --meths (default all 17); ids unique across files.
Checks: id unique (j70c-<m>-…), type route, m one of the methods in M70 (j70.js), tag K|D + src, n ≤ 8 words, tl exactly 2 tells (6–20 words each),
tlx 0–4 alternates, pl null or a real place key, vis lo|mid|hi, need s|m|l, bac 0|s|m|l, acc null|tsv, win 0|1, law 2 cost points
(vis lo0/mid1/hi2 + need s0/m1/l2 + bac 0:0/s0/m1/l2 + acc 1) = 2..3, obj null or {name,from,trace} (law 6c, trace never «mất»), gd/st ≤ 10 words,
opp ⊆ the method's opportunities, no named person (only «nạn nhân»…), VANPHONG scan, no name/tell ≈ one of the 51 old routes."""
import json,re,sys,os,glob,difflib
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src=open(os.path.join(ROOT,'dev/build/j70.js'),encoding='utf8').read()
METH={};OLD=[]
for mm in re.finditer(r'(?:^ |M70\.)([a-z0-9]+)(?::|=)\{k:"[a-z0-9]+",band:\d,n:"[^"]*",opp:\[([^\]]*)\],R:\[(.*?)\]\}',src,re.S|re.M):
    METH[mm.group(1)]=set(re.findall(r'"([a-z]+)"',mm.group(2)))
    for r in re.finditer(r'\{id:"[^"]*",n:"([^"]*)",tl:\["([^"]*)","([^"]*)"\]',mm.group(3)):OLD+=[r.group(1),r.group(2),r.group(3)]
OLDL=[o.lower() for o in OLD]
PL={"tyv","vuon","ksp","nvp","thu","dtd","tn","kn","lc"}
PTS={"vis":{"lo":0,"mid":1,"hi":2},"need":{"s":0,"m":1,"l":2},"bac":{"0":0,"s":0,"m":1,"l":2}}
BAD=re.compile(r"%|\d|\b(OK|game|turn|round|slot|lượt|(?<!tấm )ván(?! gỗ| cầu| thuyền)|level|quest|item)\b|Chắc chắn|Nắm chắc|Rất chắc|Khó lường|Mong manh|Tùy duyên|Có cơ|Rất vững",re.I)
A=sys.argv[1:];args=[a for n,a in enumerate(A) if not a.startswith('--') and not (n and A[n-1]=='--meths')]
MIN='--min' in A;CHK=set(A[A.index('--meths')+1].split(',')) if '--meths' in A else set(METH)
if not args:args=sorted(glob.glob(os.path.join(ROOT,'dev/handover/content/thin/j70seeds*.md')))
bad=0;warn=0
def err(m):
    global bad;bad+=1;print("ERR",m)
def wrn(m):
    global warn;warn+=1;print("WARN",m)
def words(t):return len(str(t).split())
def txt(i,t,where,lo=1,hi=99):
    if not isinstance(t,str) or not t.strip():err(f"{i} {where} empty");return
    b=BAD.search(t)
    if b:err(f"{i} {where} VANPHONG: '{b.group(0)}'")
    if "{" in t:err(f"{i} {where} no placeholders in routes (write «nạn nhân» for the target)")
    if not(lo<=words(t)<=hi):err(f"{i} {where} {words(t)} words (want {lo}–{hi})")
def near(i,t,where):
    tl=t.lower()
    for o in OLDL:
        if difflib.SequenceMatcher(None,tl,o).ratio()>.8:err(f"{i} {where} ≈ old route text «{o}»");return
rows=[]
for fn in args:
    for n,l in enumerate(open(fn,encoding='utf8'),1):
        if l.lstrip().startswith('{'):
            try:rows.append(json.loads(l))
            except Exception as e:err(f"{os.path.basename(fn)}:{n} bad JSON {e}")
ids=set();per={};seen_t={}
for r in rows:
    i=r.get("id","?")
    if i in ids:err(f"{i} duplicate id")
    ids.add(i)
    if r.get("type")!="route":err(f"{i} type must be 'route'");continue
    m=r.get("m")
    if m not in METH:err(f"{i} m '{m}' not a j70 method ({', '.join(sorted(METH))})");continue
    if not re.match(rf"^j70c-{m}-",i):err(f"{i} id must start with j70c-{m}-")
    per[m]=per.get(m,0)+1
    if r.get("tag") not in("K","D"):err(f"{i} tag K|D")
    if not r.get("src"):err(f"{i} src (basis, law 8)")
    txt(i,r.get("n"),"n",2,8);near(i,str(r.get("n","")),"n")
    tl=r.get("tl")
    if not isinstance(tl,list) or len(tl)!=2:err(f"{i} tl must be exactly 2 tells");tl=tl if isinstance(tl,list) else []
    tlx=r.get("tlx",[]) or []
    if not isinstance(tlx,list) or len(tlx)>4:err(f"{i} tlx must be a list of 0–4 tells");tlx=[]
    for n,t in enumerate(tl+tlx):
        txt(i,t,f"tell {n+1}",6,20);near(i,str(t),f"tell {n+1}")
        k=str(t).lower().strip()
        if k in seen_t:err(f"{i} tell {n+1} repeats {seen_t[k]}")
        seen_t[k]=i
    pl=r.get("pl")
    if pl is not None and pl not in PL:err(f"{i} pl '{pl}' (null or {'|'.join(sorted(PL))})")
    pts=0
    for f in("vis","need","bac"):
        v=str(r.get(f))
        if v not in PTS[f]:err(f"{i} {f} '{r.get(f)}' ({'|'.join(PTS[f])})")
        else:pts+=PTS[f][v]
    acc=r.get("acc")
    if acc not in(None,"tsv"):err(f"{i} acc null|tsv")
    if acc=="tsv":pts+=1
    if r.get("win",0) not in(0,1):err(f"{i} win 0|1")
    if r.get("win") and str(r.get("bac"))=="0":err(f"{i} win:1 needs a price (bac s|m|l)")
    if not(2<=pts<=3):err(f"{i} law 2 cost points {pts} (vis+need+bac+acc must be 2..3: cheap and fast ⇒ easy to see; hidden ⇒ slow or dear)")
    ob=r.get("obj")
    if ob is not None:
        if not isinstance(ob,dict):err(f"{i} obj must be null or an object")
        else:
            for f in("name","from","trace"):
                if not ob.get(f):err(f"{i} obj.{f} missing (law 6c)")
                else:txt(i,ob[f],f"obj.{f}",1,16)
            if re.search(r'\bmất\b',str(ob.get("trace",""))):err(f"{i} obj.trace must say where it IS (never «mất»)")
    txt(i,r.get("gd"),"gd",2,10);txt(i,r.get("st"),"st",2,10)
    opp=r.get("opp")
    if opp is not None:
        if not isinstance(opp,list) or not opp:err(f"{i} opp must be a non-empty list or omitted")
        else:
            for o in opp:
                if o not in METH[m]:err(f"{i} opp '{o}' not an opportunity of {m} ({', '.join(sorted(METH[m]))})")
    for x in set(r)-{"id","type","m","tag","src","n","tl","tlx","pl","vis","need","bac","acc","win","obj","gd","st","opp"}:wrn(f"{i} extra field '{x}' (ignored)")
for m in sorted(CHK):
    if MIN and per.get(m,0)<4:err(f"method {m}: {per.get(m,0)} routes < 4")
print(f"j70seeds: {len(rows)} routes ({', '.join(f'{m} {per[m]}' for m in sorted(per))}); {len(METH)} methods / {len(OLD)//3} old routes read; {bad} errors, {warn} warnings")
sys.exit(1 if bad else 0)
