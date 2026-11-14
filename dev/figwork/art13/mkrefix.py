# mkrefix.py : from fixmeta.log build paste jobs (refix.txt) for qc tiles whose fig-face changed
import ast,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
noage8={'c03','c05','c06','c09','c11','c12','c13','c32'}
jobs=[]
for line in open('fixmeta.log'):
    name,rest=line.split(' ',1)
    if not name.startswith('qc'): continue
    c=name[1:]; ks=[k for k,_ in ast.literal_eval(rest.strip())]
    md=[]
    for k in range(8):
        if k not in ks: md.append('-'); continue
        if k==3: md.append('-' if c=='c09' else 'ma')
        elif k==7: md.append('-' if c=='c21' else ('m' if c in noage8 else 'ma'))
        else: md.append('m')
    if any(x!='-' for x in md): jobs.append(f'{name} ed/{name}.jpg {",".join(md)}')
open('refix.txt','w').write('\n'.join(jobs)+'\n'); print(len(jobs))
