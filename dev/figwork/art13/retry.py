# retry.py spec... : append paste jobs for these specs (t7/t8 -> qcXX tile, age -> aNN tile) to jobs13.txt
import sys,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
noage8={'c03','c05','c06','c09','c11','c12','c13','c32'}
Q=[l.strip() for l in open('agequeue.txt') if l.strip()]
jobs={}
for sp in sys.argv[1:]:
    c,t,a=sp.split('-'); ai=['a18','a26','a36','a51'].index(a)
    if t in ('t7','t8') and not (a=='a51' and sp in Q):
        k=(0 if t=='t7' else 4)+ai; name='qc'+c[1:] if False else 'q'+c
        if k==3: md='-' if c=='c09' else 'ma'
        elif k==7: md='-' if c=='c21' else ('m' if c in noage8 else 'ma')
        else: md='m'
        key=(name,'');
        jobs.setdefault(key,['-']*8)[k]=md
    if sp in Q:
        i=Q.index(sp); name='a%02d'%(i//4+1); key=(name,'cur')
        jobs.setdefault(key,['-']*4)[i%4]='a'
L=[f'{n} ed/{n}.jpg {",".join(m)} {b}'.strip() for (n,b),m in jobs.items()]
open('jobs13.txt','a').write('\n'.join(L)+'\n'); print('\n'.join(L))
