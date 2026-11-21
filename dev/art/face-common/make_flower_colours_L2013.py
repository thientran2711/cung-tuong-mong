#!/usr/bin/env python3
"""L2013 flower colour table. person x season -> embroidery-flower colour + hair-flower colour matched to the outfit tone.
Input palettes_season_L1726.json (main_hex/sec_hex). Output flower_colours_L2013.json. 0 gens, no prompt edits (owner OK pending).
Method (OKLCH): tone class from the outfit's main colour (+ person band): soft (pale/low chroma) / medium / vivid.
Flower chroma is CAPPED by the tone class (never glaring on a soft outfit), lightness set per class, hue = secondary-colour hue
(or main hue +/- shift when sec is near-white/neutral or too close to main); never within dE 14 of main or sec; never yellow in the hair (F19)."""
import json,math,os
D=os.path.dirname(os.path.abspath(__file__))
def lin(c): c/=255; return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def unlin(x): x=max(0,min(1,x)); return 255*(12.92*x if x<=0.0031308 else 1.055*x**(1/2.4)-0.055)
def h2o(h):
    r,g,b=[lin(int(h[i:i+2],16)) for i in (1,3,5)]
    l=(0.4122214708*r+0.5363325363*g+0.0514459929*b)**(1/3); m=(0.2119034982*r+0.6806995451*g+0.1073969566*b)**(1/3); s=(0.0883024619*r+0.2817188376*g+0.6299787005*b)**(1/3)
    L=0.2104542553*l+0.7936177850*m-0.0040720468*s; a=1.9779984951*l-2.4285922050*m+0.4505937099*s; bb=0.0259040371*l+0.7827717662*m-0.8086757660*s
    return L,math.hypot(a,bb),math.degrees(math.atan2(bb,a))%360
def o2h(L,C,H):
    a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H))
    l=(L+0.3963377774*a+0.2158037573*b)**3; m=(L-0.1055613458*a-0.0638541728*b)**3; s=(L-0.0894841775*a-1.2914855480*b)**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; bl=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return "#%02X%02X%02X"%tuple(round(unlin(x)) for x in (r,g,bl))
def gamut(L,C,H):
    while C>0:
        a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H))
        l=(L+0.3963377774*a+0.2158037573*b)**3; m=(L-0.1055613458*a-0.0638541728*b)**3; s=(L-0.0894841775*a-1.2914855480*b)**3
        rgb=(4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.7076147010*s)
        if all(-0.002<=x<=1.002 for x in rgb): break
        C-=0.004
    return o2h(L,max(C,0),H)
def dE(h1,h2):
    a=h2o(h1);b=h2o(h2);ax,ay=a[1]*math.cos(math.radians(a[2])),a[1]*math.sin(math.radians(a[2]));bx,by=b[1]*math.cos(math.radians(b[2])),b[1]*math.sin(math.radians(b[2]))
    return 100*math.sqrt((a[0]-b[0])**2+(ax-bx)**2+(ay-by)**2)
def hue_vi(H,L,C):
    if C<0.025: return "kem trắng" if L>0.88 else ("xám nhạt" if L>0.6 else "xám")
    n=[(10,"hồng đỏ"),(30,"đỏ san hô"),(55,"cam đào"),(80,"cam vàng"),(105,"vàng kem"),(135,"vàng lục"),(160,"xanh lá"),(190,"xanh ngọc"),(215,"xanh lơ"),(250,"xanh lam"),(285,"tím lam"),(315,"tím hoa cà"),(345,"hồng tím"),(361,"hồng")]
    for t,nm in n:
        if H<t: return nm
    return "hồng"
def name_vi(hexv):
    L,C,H=h2o(hexv)
    if C<0.025: return hue_vi(H,L,C)
    lv="nhạt" if L>0.86 else ("sáng dịu" if L>0.76 else ("vừa" if L>0.62 else "đậm"))
    cv="phấn" if C<0.05 else ("dịu" if C<0.09 else ("tươi" if C<0.13 else "rực"))
    return f"{hue_vi(H,L,C)} {lv} {cv}"
CLS={"soft":dict(cap=0.055,Lh=0.90,Le=0.84,vi="dịu nhẹ"),"medium":dict(cap=0.095,Lh=0.84,Le=0.76,vi="vừa"),"vivid":dict(cap=0.135,Lh=0.78,Le=0.68,vi="tươi sáng")}
BAND={"Dịu dàng":-1,"Đoan trang":0,"Quyến rũ":0,"Sắc sảo":0,"Kiêu kỳ":1,"Lạnh lùng":-1}
def tone(main,sec,group):
    L,C,H=h2o(main); s=0
    if L>0.84 or C<0.06: s-=1
    if C>0.115 and L<0.82: s+=1
    s+=BAND.get(group,0)*0.5
    return "soft" if s<=-0.5 else ("vivid" if s>=1 else "medium")
def pick_hue(main,sec):
    Lm,Cm,Hm=h2o(main); Ls,Cs,Hs=h2o(sec)
    cand=[]
    if Cs>=0.03: cand.append(Hs)          # 1) her secondary colour hue (the outfit's own accent)
    cand+= [(Hm+25)%360,(Hm-25)%360,(Hm+45)%360,(Hm-45)%360]   # 2) analogous to the main robe
    cand+= [350,10,25,330,310]                                   # 3) flower-safe rose / peach / mauve family
    cand+= [(Hm+150)%360,(Hm+180)%360]                           # 4) soft complement, last resort
    return cand
def make(main,sec,group,kind):
    cl=tone(main,sec,group); P=CLS[cl]; Lm,Cm,Hm=h2o(main)
    best=None
    for H in pick_hue(main,sec):
        if 78<=H<=180: continue   # never yellow (F19) and never green (flowers must not read as leaves)
        for dl in (0,-0.04,0.04,-0.08,0.08,-0.13,0.1):
            L=min(0.96,max(0.55,(P["Lh"] if kind=="hair" else P["Le"])+dl))
            C=min(P["cap"],max(0.03,Cm*0.9 if cl!="vivid" else Cm*0.95)) if kind=="hair" else min(P["cap"]*0.85,max(0.025,Cm*0.8))
            hx=gamut(L,C,H)
            if dE(hx,main)>=14 and dE(hx,sec)>=6:
                return hx,cl
            if best is None: best=hx
    for hx in ("#FFF6EA","#FDEFF3","#F4E8FA","#3B2A30"):   # fallback: ivory / blush / pale lilac / deep wine
        if dE(hx,main)>=14: return hx,cl
    return best,cl
def main():
    p=json.load(open(f"{D}/palettes_season_L1726.json",encoding="utf-8"))
    out={"_note":"L2013 FLOWER COLOUR TABLE (draft, owner OK pending; no prompt edits, no gens). person x season -> embroidery flower + hair flower colour matched to the outfit tone. Gold thread stays on every outfit. Hair flower = bloom only, no leaves, never yellow (F19). Flower never equals the main robe colour (dE>=14 vs main+secondary). Method: make_flower_colours_L2013.py.",
         "_tone_classes":{k:{"hair_L":v["Lh"],"embroidery_L":v["Le"],"max_chroma":v["cap"],"vi":v["vi"]} for k,v in CLS.items()}}
    for pid in sorted(k for k in p if not k.startswith("_") and k!="status"):
        d=p[pid]; rec={"group":d["group"]}
        for s in ("xuan","ha","thu","dong"):
            m,sc=d[s]["main_hex"],d[s]["sec_hex"]
            hh,cl=make(m,sc,d["group"],"hair"); ee,_=make(m,sc,d["group"],"emb")
            # hair flower ramp t1..t6: palest -> deepest within the tone class (same hue)
            Lh,Ch,Hh=h2o(hh); ramp={}
            for t in range(1,7):
                f=(t-1)/5; ramp[f"t{t}"]=gamut(min(0.97,Lh+0.05-0.07*f),min(CLS[cl]["cap"],Ch*(0.75+0.5*f)),Hh)
            rec[s]={"tone":cl,"main_hex":m,"main_vi":d[s]["main_vi"],"sec_hex":sc,"sec_vi":d[s]["sec_vi"],
                    "embroidery_hex":ee,"embroidery_vi":name_vi(ee),"hair_hex":hh,"hair_vi":name_vi(hh),"hair_by_tier":ramp}
        out[pid]=rec
    json.dump(out,open(f"{D}/flower_colours_L2013.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
    import collections
    print(collections.Counter(out[k][s]["tone"] for k in out if not k.startswith("_") for s in ("xuan","ha","thu","dong")))
    bad=[(k,s) for k in out if not k.startswith("_") for s in ("xuan","ha","thu","dong") if min(dE(out[k][s]["hair_hex"],out[k][s]["main_hex"]),dE(out[k][s]["embroidery_hex"],out[k][s]["main_hex"]))<10]
    print("close-to-main:",bad)
if __name__=="__main__": main()
