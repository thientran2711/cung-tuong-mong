import sys,json,importlib.util,os
W='/home/user/wt/norosy/'
s=importlib.util.spec_from_file_location('sk',W+'dev/art/skin-smudge.py');sk=importlib.util.module_from_spec(s);s.loader.exec_module(sk)
rows=[l.split() for l in open('rosy.txt') if l.startswith('por-')]
out=open(sys.argv[1],'w')
for r in rows:
    p=r[0];acp=float(r[2]) if len(r)>2 else None
    rec=dict(por=p,fig=r[1] if len(r)>1 else None,ac_pre=acp)
    for k,f in (('cur','cur/img/'+p),('pre','pre/img/'+p)):
        if os.path.exists(f):
            a=sk.analyse(f)
            if a: rec[k]=[a[0]['Lc'],a[0]['ac'],a[0]['bc']]
    out.write(json.dumps(rec)+'\n')
