# need.py KEY... (cXX-tN or gen id): download lineup gens to raw/<gen>.png from urls.json; prints missing ids
import sys,json,os,subprocess
G=json.load(open('gen.json')); U=json.load(open('urls.json')); miss=[]
for k in sys.argv[1:]:
    g=G.get(k,k); p=f'raw/{g}.png'
    if os.path.exists(p) and os.path.getsize(p)>100000: continue
    if g not in U: miss.append(g); continue
    subprocess.run(['curl','-sS','--retry','5','--retry-all-errors','-o',p,U[g]],check=True)
print('MISSING',' '.join(miss))
