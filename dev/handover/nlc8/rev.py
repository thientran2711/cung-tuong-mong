import subprocess,sys,collections
# usage: rev.py OLDLIVE OLDHEAD RESULT NEWLIVE  -> every line OLDHEAD has more than OLDLIVE (per file, multiset) is in RESULT or NEWLIVE
OL,OH,RS,NL=sys.argv[1:5]
G=lambda *a:subprocess.run(['git']+list(a),capture_output=True,text=True,errors='replace').stdout
files=[f for f in G('diff','--name-only',OL,OH).split('\n') if f and f not in('index.html','sw.js','assets.json') and not f.startswith('dev/index')]
lost=collections.defaultdict(list);n=0
def lines(rev,f):
    return collections.Counter(l.strip() for l in G('show',f'{rev}:{f}').split('\n') if l.strip())
for f in files:
    a,b=lines(OL,f),lines(OH,f)
    own=b-a
    if not own:continue
    r,nl=lines(RS,f),lines(NL,f)
    for l,c in own.items():
        n+=c
        have=max(r[l],0)
        if have<c and l not in nl: lost[f].append(l[:160])
print('files',len(files),'own lines',n,'lost',sum(len(v) for v in lost.values()))
for f,v in lost.items():
    print('##',f,len(v))
    for l in v[:6]:print('   ',l)
