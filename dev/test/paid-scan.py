"""LUẬT SỬA CẢ NHÓM (14:50Z): scan every event / dialog choice list for a PAID option (c:{bac:-N}) that is dominated by a cheaper option of
the same list (the cheaper one gives at least as much of every gain). usage: python3 dev/test/paid-scan.py → table of suspects"""
import re,glob,json
def obj(s):
    d={}
    for k,v in re.findall(r'(\w+):(-?\d+)',s):d[k]=int(v)
    return d
rows=[]
for f in sorted(glob.glob('dev/build/j*.js')):
    if '/all' in f:continue
    t=open(f,encoding='utf-8').read()
    # an option list: o:X=>[ ... ] / o:[ ... ] containing c6(...) or {n:...,c:{..},w:{..}}
    # list boundaries: an event / arc header starts a new list
    heads=[h.start() for h in re.finditer(r'EV6\(|ARC67\.|\bc1:\{|\bc2:\{|\bc3:\{|\bo:X=>\[|\bo:\[',t)]
    for m in re.finditer(r'(?:c6\("([^"]+)",\{c:\{([^}]*)\}(?:,[^w]*?)?,w:\{([^}]*)\})|(?:\{n:"([^"]+)",c:\{([^}]*)\}[^{}]*?w:\{([^}]*)\})',t):
        n=m.group(1) or m.group(4);c=obj(m.group(2) or m.group(5) or '');w=obj(m.group(3) or m.group(6) or '')
        end=t.find('}),',m.end());end=t.find('},',m.end()) if end<0 else end
        seg=t[m.start():min(len(t),m.end()+300)].split('\n')[0]
        risky=bool(re.search(r'\b(o|p):',seg))
        lst=sum(1 for h in heads if h<m.start())
        rows.append((f,m.start(),n,c,w,risky,lst))
# group options that sit close together (same list: within 1500 chars of each other)
groups=[];cur=[]
for r in rows:
    if cur and (r[0]!=cur[-1][0] or r[6]!=cur[-1][6]):groups.append(cur);cur=[]
    cur.append(r)
if cur:groups.append(cur)
sus=[]
for g in groups:
    for a in g:
        ca=-a[3].get('bac',0)
        if ca<=0:continue
        for b in g:
            if b is a:continue
            cb=-b[3].get('bac',0)
            if cb>=ca or b[5]:continue  # a cheaper but risky option (odds) is not a better version
            wa={k:v for k,v in a[4].items() if v>0};wb={k:v for k,v in b[4].items() if v>0}
            if wa and all(wb.get(k,0)>=v for k,v in wa.items()):sus.append((a[0],a[2],ca,a[4],b[2],cb,b[4]))
print(f"options scanned: {len(rows)} in {len(groups)} lists · dominated paid options: {len(sus)}")
for s in sus:print(f"| {s[0].split('/')[-1]} | {s[1]} (Bạc -{s[2]}, được {s[3]}) | {s[4]} (Bạc -{s[5]}, được {s[6]}) |")
