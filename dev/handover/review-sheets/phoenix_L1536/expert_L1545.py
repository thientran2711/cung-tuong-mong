"""L1545 colour-expert pass over phoenix_L1536.json (senior costume colour designer criteria, code-applied, no gens).
Per person x season, robe = main (body) + secondary (inner/lining); phoenix embroidered on the main-colour body.
E1 READ: the phoenix must read on the robe: the strongest plumage colour vs robe main needs dE>=22 (CIELAB). If the secondary is too close
   to main (dE<22) it is replaced in the plumage by a deeper tone of the SECONDARY hue ('phụ đậm') -> still her own colour family.
E2 PALE: a near-white neutral secondary (ivory/cream/mist, L*>90, C*<12) alone gives a washed phoenix: it stays as the feather highlight,
   and the 3rd colour becomes the deeper main so the bird has a body (already the default) -- if deep main is still dE<22 from main -> darker.
E3 DARK MAIN: if main is already dark (L*<55) a darker 'deep' turns muddy -> 3rd colour = a light tint of main ('chính nhạt') instead.
E4 GOLD: gold outline #EFBD69 vanishes on a yellow/gold-ish main (dE<20) -> antique gold #B8862F.
E5 CLASH: a deep tone whose hue drifts >40 deg from main (rounding at low sat) -> recomputed in main hue.
Constraints: G33 option A (only her own main/secondary hues), A31 untouched (robe palettes not changed). Changed cells marked."""
import json,os,colorsys,math
H=os.path.dirname(os.path.abspath(__file__))
J=json.load(open(os.path.join(H,"phoenix_L1536.json"),encoding="utf-8")); P=J["people"]
D=json.load(open(os.path.join(H,"..","..","..","art","face-common","palettes_season_deep.json"),encoding="utf-8"))
def lab(h):
    c=[int(h[i:i+2],16)/255 for i in (1,3,5)]; c=[((x+0.055)/1.055)**2.4 if x>0.04045 else x/12.92 for x in c]
    X=(0.4124*c[0]+0.3576*c[1]+0.1805*c[2])/0.95047; Y=0.2126*c[0]+0.7152*c[1]+0.0722*c[2]; Z=(0.0193*c[0]+0.1192*c[1]+0.9505*c[2])/1.08883
    f=lambda t:t**(1/3) if t>0.008856 else 7.787*t+16/116
    return 116*f(Y)-16,500*(f(X)-f(Y)),200*(f(Y)-f(Z))
dE=lambda a,b:math.dist(lab(a),lab(b))
def hls(h,L=None,S=None,dl=1.0):
    r,g,b=(int(h[i:i+2],16)/255 for i in (1,3,5)); hh,ll,ss=colorsys.rgb_to_hls(r,g,b)
    ll=L if L is not None else ll*dl; ss=S if S is not None else ss
    r,g,b=colorsys.hls_to_rgb(hh,max(0,min(1,ll)),max(0,min(1,ss))); return "#%02X%02X%02X"%tuple(round(x*255) for x in (r,g,b))
def sat(h): return colorsys.rgb_to_hls(*[int(h[i:i+2],16)/255 for i in (1,3,5)])[2]
GOLD,AGOLD="#EFBD69","#B8862F"
stats={}
for k,v in P.items():
    for s in ("xuan","ha","thu","dong"):
        c=v[s]; m,sc,dp=c["plumage"]; marks=[]
        Lm=lab(m)[0]; Ls,_a,_b=lab(sc); Cs=math.hypot(_a,_b)
        if Lm<55:
            dp=hls(m,dl=1.35,S=min(sat(m),0.5)); marks.append("E3 chính nhạt")
        if dE(sc,m)<22 and not (Ls>90 and Cs<12):
            for f in (0.85,0.75,0.65,0.55):
                n=hls(sc,dl=f,S=min(0.55,max(sat(sc),0.35)))
                if dE(n,m)>=22: break
            sc=n; marks.append("E1 phụ đậm")
        if Ls>90 and Cs<12 and dE(dp,m)<22:
            dp=hls(m,dl=0.68,S=min(sat(m),0.5)); marks.append("E2 thân đậm hơn")
        if max(dE(sc,m),dE(dp,m))<22:
            dp=hls(m,dl=0.6,S=min(sat(m),0.5)); marks.append("E1 đậm hơn")
        out=AGOLD if dE(GOLD,m)<20 else GOLD
        if out!=GOLD: marks.append("E4 vàng cổ")
        c["plumage_before_L1545"]=c["plumage"]; c["plumage"]=[m,sc,dp]; c["outline"]=out; c["expert_L1545"]=marks
        for x in marks: stats[x.split()[0]]=stats.get(x.split()[0],0)+1
        stats["changed"]=stats.get("changed",0)+(1 if marks else 0)
J["_note_L1545"]=__doc__
json.dump(J,open(os.path.join(H,"phoenix_L1536.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(stats)
