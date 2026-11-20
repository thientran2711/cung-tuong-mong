"""r1 fault 3 (ONE CORE OD:L1267): typed numbers in NPC choice weights. Lists every mindPickBy score function + the jmind menDecide / mindW
weights + jagent agSeeHer / agCostF and counts numeric literals in them. usage: python3 dev/test/onecore-pick.py [git-rev]  (default: work tree)"""
import re,subprocess,sys
rev=sys.argv[1] if len(sys.argv)>1 else None
def src(f):
    if rev: return subprocess.run(['git','show',f'{rev}:dev/build/{f}'],capture_output=True,text=True).stdout
    return open('dev/build/'+f,encoding='utf-8').read()
files=subprocess.run(['git','ls-files','dev/build/'],capture_output=True,text=True).stdout.split()
files=[f.split('/')[-1] for f in files if re.match(r'.*/j[^/]*\.js$',f) and '/all' not in f and 'jbal' not in f]
NUM=re.compile(r'(?<![\w.$\[])(\d+\.?\d*|\.\d+)(?![\w\]])')
rows=[]
for f in sorted(files):
    s=src(f)
    for m in re.finditer(r'mindPickBy\(',s):
        if s[m.start()-9:m.start()]=='function ':continue
        i=m.end();d=1;j=i
        while j<len(s) and d>0:
            d+= s[j]=='(';d-= s[j]==')';j+=1
        call=s[i:j-1];A=[];d=0;b=0
        for q,ch in enumerate(call):
            d+=ch in '([{';d-=ch in ')]}'
            if ch==',' and d==0:A.append(call[b:q]);b=q+1
        A.append(call[b:]);sc=A[1] if len(A)>1 else call;k=sc.find('=>');sc=sc[k+2:] if k>=0 else sc  # the SCORE argument only (the list's gates are game rules of their own)
        sc=re.sub(r'mindW\([^)]*\)','W',sc);sc=re.sub(r'"[^"]*"','',sc)
        n=[x for x in NUM.findall(sc) if x not in('0',)]
        rows.append((f,s[:m.start()].count('\n')+1,len(n),' '.join(n)))
for f,pat in [('jmind.js',r'menDecide=function[\s\S]*?return mindPick'),('jmind.js',r'function mindW[^\n]*\n[^\n]*\n[^\n]*\n[^\n]*'),('jagent.js',r'function agCostF[^\n]*'),('jagent.js',r'const hu=[^\n]*')]:
    s=src(f);m=re.search(pat,s)
    if m:
        t=re.sub(r'"[^"]*"','',m.group(0));n=[x for x in NUM.findall(t) if x not in('0','1')]
        rows.append((f,s[:m.start()].count('\n')+1,len(n),' '.join(n)))
tot=0
for r in rows:
    print(f'{r[0]}:{r[1]}\t{r[2]}\t{r[3]}');tot+=r[2]
print('TOTAL typed numbers in NPC choice weights:',tot)
