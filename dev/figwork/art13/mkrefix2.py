# mkrefix2.py LOG : paste jobs (appended to jobs13.txt) for tiles whose fig-face changed in a fixmeta log (q*, a*)
import ast,os,sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
noage8={'c03','c05','c06','c09','c11','c12','c13','c32'}
jobs=[]
for line in open(sys.argv[1]):
    name,rest=line.split(' ',1); ks=[k for k,_ in ast.literal_eval(rest.strip())]
    if name.startswith('qc'):
        c=name[1:]; md=[]
        for k in range(8):
            if k not in ks: md.append('-')
            elif k==3: md.append('-' if c=='c09' else 'ma')
            elif k==7: md.append('-' if c=='c21' else ('m' if c in noage8 else 'ma'))
            else: md.append('m')
        jobs.append(f'{name} ed/{name}.jpg {",".join(md)}')
    elif name.startswith('a'):
        md=['a' if k in ks else '-' for k in range(4)]
        jobs.append(f'{name} ed/{name}.jpg {",".join(md)} cur')
open('jobs13.txt','a').write('\n'.join(jobs)+'\n'); print(len(jobs))
