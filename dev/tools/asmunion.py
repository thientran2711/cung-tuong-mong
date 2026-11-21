import re,sys,ast
p=sys.argv[1];t=open(p,encoding='utf-8').read()
def merge(m):
    a,b=m.group(1),m.group(2)
    la,lb=a.strip().splitlines(),b.strip().splitlines()
    if len(la)!=1 or len(lb)!=1: raise SystemExit('NONLIST')
    ra=re.search(r"for f in (\[.*\]\))",la[0]); rb=re.search(r"for f in (\[.*\]\))",lb[0])
    if not ra or not rb or la[0][:ra.start()]!=lb[0][:rb.start()]: raise SystemExit('NONLIST')
    A=ast.literal_eval(ra.group(1)[:-1]);B=ast.literal_eval(rb.group(1)[:-1])
    out=list(B)
    for i,x in enumerate(A):
        if x in out: continue
        prev=[y for y in A[:i] if y in out]
        out.insert(out.index(prev[-1])+1 if prev else 0,x)
    return lb[0][:rb.start()]+'for f in '+repr(out)+')\n'
t2=re.sub(r"^<<<<<<< [^\n]*\n(.*?)^=======\n(.*?)^>>>>>>> [^\n]*\n",merge,t,flags=re.S|re.M)
if '<<<<<<<' in t2: raise SystemExit('LEFT')
open(p,'w',encoding='utf-8').write(t2);print('UNION OK')
