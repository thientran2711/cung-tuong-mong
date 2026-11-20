"""aggregate LEFTOVER rows of g_*.json by (term, context) -> leftover_<name>.tsv"""
import json,re,sys,collections
rows=[]
for fn in sys.argv[2:]: rows+=[r for r in json.load(open(fn)) if r['cls']=='LEFTOVER']
agg=collections.defaultdict(lambda:[0,set(),None])
for r in rows:
    s=r['ex'][1]; t=r['term']; m=re.search(re.escape(t),s,re.I)
    w=s[max(0,m.start()-70):m.end()+45] if m else s[:110]
    w=re.sub(r'#[0-9A-Fa-f]{6}','#HEX' if t.startswith('#') else r'\g<0>',w)
    k=(r['src'],t if not t.startswith('#') else '#hex',re.sub(r'\s+',' ',w))
    a=agg[k]; a[0]+=r['cells']; a[1].add(r['ex'][0].split('|')[0]); a[2]=a[2] or r['ex'][0]
with open(sys.argv[1],'w') as f:
    f.write("src\tterm\tcells\tpeople\texample_cell\tcontext\n")
    for (s,t,w),(n,p,e) in sorted(agg.items(),key=lambda x:-x[1][0]): f.write(f"{s}\t{t}\t{n}\t{len(p)}\t{e}\t{w}\n")
