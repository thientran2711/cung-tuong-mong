import re,json,collections
S={}  # (c,t)-> item flag
strict='''c01 t7;c06 t7;c10 t7;c16 t6 t7;c24 t7;c25 t7;c27 t7;c28 t7;c07 t6;c08 t6;c09 t6;c11 t6;c12 t6;c15 t6 t8;c17 t6 t7;c18 t6 t7;c19 t6 t7;c20 t6;c26 t6 t7;c29 t6;c01 t6;c04 t6;c05 t6;c06 t6;c22 t6;c23 t6;c14 t6 t7 t8;c10 t6;c02 t7;c05 t7;c30 t7;c04 t3x'''
for g in strict.split(';'):
    p=g.split(); c=p[0]
    for t in p[1:]:
        if t.endswith('x'): continue
        S[(c,int(t[1]))]='item'
for c,t in [('c14',4),('c27',3),('c28',3),('c29',3)]: S[(c,t)]='empty'
J=collections.defaultdict(dict)
for l in open('/home/user/wt/w65c/dev/handover/reports/a18-scan-2-tools/d4b_fail_files.txt'):
    l=l.strip()
    m=re.match(r'(c\d\d)_t(\d)_v(\d)',l)
    if m: J[m[1]][(int(m[2]),int(m[3]))]={'teeth'}
for (c,t),k in S.items():
    if t==8: continue
    for v in range(3): J[c].setdefault((t,v),set()).add(k)
for c in sorted(J) if False else ['c%02d'%i for i in range(1,33)]:
    if c=='c03': continue
    for v in (1,2): J[c].setdefault((7,v),set()).add('retone')
out={c:{f't{t}_v{v}':sorted(s) for (t,v),s in sorted(d.items()) if t!=8} for c,d in J.items()}
json.dump(out,open('plan.json','w'),indent=0)
print(sum(len(d) for d in out.values()))
for c in sorted(out): print(c,len(out[c]),{k:v for k,v in out[c].items() if 'retone' not in v or len(v)>1})
