import sys,subprocess,os
d=sys.argv[1];os.makedirs(d,exist_ok=True)
ps=[]
for l in open(sys.argv[2]).read().split('\n'):
    if not l.strip():continue
    n,u=l.split(' ',1);ps.append(subprocess.Popen(['curl','-sS','-o',f'{d}/{n}.png',u]))
[p.wait() for p in ps]
print(len(ps),'downloaded')
