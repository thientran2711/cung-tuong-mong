# python3 rswap.py LIVE.json INDEX.json CORPUS.txt OUT.json OLDKEY... : point every acts/prefix/log entry of each OLDKEY at its redraw
# (K -> K-h, B-h -> B-r-h; file must be in the live _index). Corpus check: a line may only change OLD -> its NEW; 0 to none. Exit 1 otherwise.
import json,re,sys
L,I,C,O=sys.argv[1:5]; old=sys.argv[5:]
A=json.load(open(L)); ix={f[0] for f in json.load(open(I))['files']}
nk=lambda k:k[:-2]+'-r-h' if k.endswith('-h') else k+'-h'
M={k:nk(k) for k in old}; miss=[v for v in M.values() if 'img/act-%s.webp'%v not in ix]
if miss: print('STOP missing',miss); sys.exit(1)
B=json.loads(json.dumps(A)); n=0
for sec in ('acts','prefix'):
    for name,k in B[sec].items():
        if k in M: B[sec][name]=M[k]; n+=1
for r in B['log']:
    if r[1] in M: r[1]=M[r[1]]; n+=1
def hit(log,t):
    for rx,k in log:
        if re.search(rx,t,re.I): return k
bad=ch=0
for t in [l.strip() for l in open(C) if l.strip()]:
    b,a=hit(A['log'],t),hit(B['log'],t)
    if b!=a:
        ch+=1
        if M.get(b)!=a: bad+=1; print('BAD',b,a,t)
print('keys',len(M),'entries repointed',n,'corpus lines changed',ch,'bad',bad)
if bad: sys.exit(1)
json.dump(B,open(O,'w'),ensure_ascii=False,separators=(',',':'))
