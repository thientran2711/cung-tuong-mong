import importlib.util,sys,colorsys,random,json
sys.argv=['x']
import os; P=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build.py')
s=importlib.util.spec_from_file_location('b',P);b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
FAM=[ # name, hex, group
("jade green","#6FAF8E","green"),("leaf green","#93BE7C","green"),("mint green","#93CDB3","green"),
("turquoise","#5FB3B0","teal"),("aqua blue","#7CC3CC","teal"),
("sky blue","#86B4DC","blue"),("azure blue","#6A98D2","blue"),("cornflower blue","#7F8FD2","blue"),
("lavender violet","#A797D0","violet"),("lilac","#C2A3D6","violet"),("orchid purple","#B184C0","violet"),
("rose pink","#E596AA","warm"),("plum rose","#C57C98","warm"),
("coral pink","#EC9585","warm"),("peach orange","#F0AE84","warm"),("apricot","#EFB679","warm")]
def grp_of(hx):
    r,g,bb=[int(hx[i:i+2],16)/255 for i in (1,3,5)]
    h,sv,v=colorsys.rgb_to_hsv(r,g,bb);h*=360
    if sv<0.12: return "neutral"
    if h<15 or h>=330: return "warm"
    if h<45: return "warm"
    if h<70: return "yellow"
    if h<160: return "green"
    if h<200: return "teal"
    if h<245: return "blue"
    if h<300: return "violet"
    return "warm"
def lighten(hx,f=0.45):
    c=[int(hx[i:i+2],16) for i in (1,3,5)]
    return "#%02X%02X%02X"%tuple(round(x+(255-x)*f) for x in c)
import re
out1={};out2={};rep=[]
for c in sorted(b.ORIG1):
    hx=re.search(r"#[0-9A-Fa-f]{6}",b.ORIG1[c][0]).group(0)
    g0=grp_of(hx)
    rnd=random.Random("lowv-"+c)
    for attempt in range(5000):
        f=[x for x in FAM if x[2]!=g0]
        rnd.shuffle(f)
        v1=f[:6]
        rest=[x for x in f if x not in v1]
        if len(rest)<6: rest=rest+[x for x in f if x not in rest]
        rnd.shuffle(rest); v2=[]
        ok=True
        pool=[x for x in f]
        rnd.shuffle(pool)
        for t in range(6):
            cand=[x for x in pool if x not in v2 and x[2]!=v1[t][2] and (t==0 or x[2]!=v2[t-1][2]) and x[0]!=v1[t][0]]
            if not cand: ok=False;break
            # prefer families not used in v1 at all
            cand.sort(key=lambda x:(x in v1, rnd.random()))
            v2.append(cand[0])
        if not ok: continue
        if any(v1[t][2]==v1[t-1][2] for t in range(1,6)): continue
        break
    else: raise SystemExit("fail "+c)
    out1[c]={t+1:(v1[t][0],v1[t][1],"pale "+v1[t][0],lighten(v1[t][1])) for t in range(6)}
    out2[c]={t+1:(v2[t][0],v2[t][1],"pale "+v2[t][0],lighten(v2[t][1])) for t in range(6)}
    rep.append(f"{c} v0={g0:7s} | v1: "+", ".join(x[0] for x in v1)+" | v2: "+", ".join(x[0] for x in v2))
json.dump({"v1":out1,"v2":out2},open('lowv.json','w'))
print("\n".join(rep))
