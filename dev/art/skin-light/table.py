"""skin-light (owner 16/11 11:58Z): ONE light for every figure. Builds img/FIGLIGHT.json from the skin-match face audit
(dev/art/skin-match/log/all.jsonl + fix logs = face skin median Lab of every fig-*.webp on the CDN).
Each figure gets per-channel light-tone curve (out = x + d*w(x)) that moves ITS face skin to the shared target of its group,
keeping pure black and white fixed (no clipping of white silk). por-X uses fig-X's entry (same painting).
usage: python3 dev/art/skin-light/table.py <out.json> [strength=1]"""
import json,sys,re,math,collections,os
sys.path.insert(0,os.path.dirname(__file__));from labmath import lab2rgb01
H=os.path.dirname(__file__)+'/../skin-match/log/'
D={}
for l in open(H+'all.jsonl'):
    r=json.loads(l);D[r['f']]=r
for fn in ['fix.jsonl','fix_audit2.jsonl']:
    for l in open(H+fn):
        r=json.loads(l)
        if 'after' in r:D[r['f']]=dict(r['after'],f=r['f'])
MEN={'eunuch','man','emperor','official','physician','guard','general','monk','prince'}
# targets (face skin L*,a*,b*): women = the maid look the owner liked (maid set median a/b, L between maid and consort);
# men keep their slightly warmer skin; kids their own median. Same light for all, skin trait per group.
T={'w':(80.5,9.5,13.0),'m':(77.0,9.0,17.0),'k':(78.5,9.5,15.5)}
CL=(6.0,2.5,3.0)  # max move per axis
S=float(sys.argv[2]) if len(sys.argv)>2 else 1.0
def ss(e0,e1,x):
    t=max(0.,min(1.,(x-e0)/(e1-e0)));return t*t*(3-2*t)
def w(x):return ss(.30,.72,x)*(1-ss(.96,1.0,x))
def grp(f):
    k=f.split('-')[1]
    return 'm' if k in MEN else 'k' if k=='kid' else 'w'
G=[];GI={};F={};st=collections.Counter()
for f,r in sorted(D.items()):
    if not f.startswith('fig-') or (r.get('face_n') or 0)<300:st['skip']+=1;continue
    t=T[grp(f)];src=(r['face_L'],r['face_a'],r['face_b'])
    dst=tuple(s+S*max(-c,min(c,tt-s)) for s,tt,c in zip(src,t,CL))
    a=lab2rgb01(src);b=lab2rgb01(dst)
    # light-tone curve (kitFigLight JS builds the same table): out = x + d*w(x), w = 0 in the darks (hair, eyes, shadows stay),
    # 1 around skin, 0 at pure white; d chosen so the face skin value lands on the target
    g=[round(max(-.09,min(.09,(bb-aa)/max(w(aa),.2)))/.005)*.005 for aa,bb in zip(a,b)]
    g=tuple(round(x,3) for x in g)
    if all(abs(x)<.006 for x in g):st['same']+=1;continue
    if g not in GI:GI[g]=len(G);G.append(g)
    F[f[4:-5]]=GI[g];st['set']+=1
json.dump({'v':2,'note':'kitFigLight: per-figure light-tone shift d[r,g,b] (out=x+d*w(x)) to one shared skin light; key = fig-/por- name without prefix/.webp','g':G,'f':F},open(sys.argv[1],'w'),separators=(',',':'))
print(dict(st),'filters',len(G),'bytes',os.path.getsize(sys.argv[1]))
