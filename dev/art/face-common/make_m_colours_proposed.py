#!/usr/bin/env python3
"""NF1 (owner Lượt 594 via ROOT-51): PROPOSED main/secondary hexes for m01–m52 at the foreign-princess level
(mains L 0.62–0.75, S 0.30–0.50; ivory/cream = warm ivory; no grey; no yellow mains → nearest apricot, flagged).
Names kept identical. Source of current values: dev/art/t8-prompt-B/build.py MAID_ROWS (main hex col 3) + build_all secondary names.
Does NOT edit the builder (BW4 owns it). Writes m_colours_proposed.json."""
import colorsys,json,os
D=os.path.dirname(os.path.abspath(__file__))
def hx(H,L,S): return "#%02X%02X%02X"%tuple(round(x*255) for x in colorsys.hls_to_rgb(H/360,L,S))
CUR="""m01|sage green|#E8CDB5|crimson
m02|moss green|#D0C1A1|deep rose
m03|slate blue|#B7AFAB|deep rose
m04|warm apricot|#ECBA9C|blue-violet
m05|coral red|#DF9A84|deep teal
m06|pale blue|#DDCFC8|warm coral rose
m07|pale jade green|#C7B9A1|crimson
m08|peach-salmon|#E4AC94|jade green
m09|rose pink|#DCA79D|deep teal
m10|sage green|#D0C0A4|deep rose
m11|sky blue|#B6B6B8|deep rose
m12|warm sand apricot|#EBCDAC|blue-violet
m13|lilac|#CBAAB0|deep teal
m14|ivory white|#B2AA97|celadon
m15|blush pink|#DEC3B5|deep teal
m16|lavender purple|#CDABAF|crimson
m17|olive green|#B19B7A|crimson
m18|powder blue|#BFB5AE|warm coral rose
m19|caramel apricot|#DFBBA1|deep sapphire blue
m20|slate blue|#A79E9C|warm coral rose
m21|aqua celadon|#C4BFB2|crimson
m22|dusty rose|#C1A294|jade green
m23|soft peach sand|#DDC1A0|deep sapphire blue
m24|jade green|#B8AB93|deep rose
m25|lavender violet|#B49EAD|deep teal
m26|blush pink|#E1BDAE|jade green
m27|soft spring green|#CAB99A|crimson
m28|coral pink|#DB947A|jade green
m29|pale celadon|#E9D8C7|crimson
m30|soft lilac|#D1B9BA|crimson
m31|pale sand apricot|#DEBF9D|deep sapphire blue
m32|pale mint green|#D4C1AE|deep rose
m33|lavender blue|#AC9CAE|deep rose
m34|peach pink|#DFB49F|jade green
m35|pale jade green|#DCCCBA|crimson
m36|ivory cream|#ECD5C4|deep rose
m37|pale aqua|#C6BBB0|crimson
m38|warm apricot|#E4BF9F|blue-violet
m39|sky blue|#BDB6BD|deep rose
m40|dusty rose|#D2A396|jade green
m41|soft willow green|#C4AE8F|crimson
m42|peach coral|#E3C3AD|jade green
m43|periwinkle|#ACA0A5|deep rose
m44|ivory|#E4C3B1|blush pink
m45|pale sky blue|#C7C2C1|deep rose
m46|rust red|#9F6353|jade green
m47|pale lilac|#DECCC3|mint
m48|warm beige cream|#D8B79C|deep rose
m49|powder blue|#CBC1C2|deep rose
m50|soft pink|#D8B4A7|jade green
m51|pale mint|#C0BDAB|crimson
m52|pink lilac|#CEA6A9|jade green"""
# main: (hue, L, S) or fixed hex; per person (two people with the same name get slightly different values)
MAIN={"m01":(100,.66,.30),"m02":(85,.62,.32),"m03":(220,.64,.32),"m04":(25,.72,.50),"m05":(8,.66,.50),"m06":(210,.74,.35),
"m07":(150,.72,.32),"m08":(15,.72,.50),"m09":(350,.70,.45),"m10":(95,.64,.32),"m11":(205,.70,.45),"m12":(32,.74,.50),
"m13":(285,.72,.32),"m14":"#EDE0CC","m15":(355,.75,.45),"m16":(270,.68,.35),"m17":(75,.62,.32),"m18":(210,.74,.40),
"m19":(25,.65,.45),"m20":(225,.62,.34),"m21":(170,.68,.32),"m22":(350,.65,.32),"m23":(35,.73,.45),"m24":(155,.62,.35),
"m25":(265,.68,.35),"m26":(5,.75,.45),"m27":(110,.70,.35),"m28":(10,.70,.50),"m29":(145,.75,.30),"m30":(285,.74,.32),
"m31":(30,.73,.50),"m32":(155,.74,.35),"m33":(240,.70,.35),"m34":(12,.75,.50),"m35":(150,.74,.30),"m36":"#EAD7BF",
"m37":(180,.72,.35),"m38":(28,.70,.50),"m39":(200,.68,.45),"m40":(345,.66,.32),"m41":(95,.68,.32),"m42":(16,.72,.48),
"m43":(230,.70,.40),"m44":"#EDDCC6","m45":(205,.75,.45),"m46":(12,.62,.45),"m47":(285,.75,.30),"m48":"#E8D3B8",
"m49":(212,.72,.38),"m50":(350,.75,.42),"m51":(155,.75,.32),"m52":(320,.72,.32)}
SEC={"crimson":(352,.55,.45),"deep rose":(350,.62,.45),"deep teal":(182,.42,.35),"jade green":(150,.52,.32),"blue-violet":(250,.55,.35),
"deep sapphire blue":(222,.47,.38),"warm coral rose":(5,.64,.45),"celadon":(140,.58,.28),"blush pink":(355,.75,.45),"mint":(155,.70,.32)}

# ---- Owner Lượt 599 (via ROOT-51): m table too blue/green, secondaries too uniform → spread look-alike greens/blues
# (same name/hue family, different hue/lightness/saturation) and DIVERSIFY secondaries the c way (real pairings, contrast, ≤10 per hue).
MAIN.update({"m01":(100,.66,.28),"m02":(82,.62,.38),"m07":(150,.74,.30),"m10":(108,.72,.30),"m17":(70,.62,.34),"m21":(172,.66,.34),
"m24":(158,.62,.42),"m27":(118,.70,.40),"m29":(140,.76,.30),"m32":(162,.78,.40),"m35":(146,.70,.36),"m37":(186,.74,.38),"m41":(90,.68,.34),"m51":(152,.80,.30),
"m03":(222,.62,.30),"m06":(210,.78,.40),"m11":(200,.68,.50),"m18":(214,.74,.32),"m20":(232,.66,.30),"m33":(245,.70,.36),"m39":(194,.72,.44),
"m43":(232,.70,.46),"m45":(205,.80,.48),"m49":(212,.76,.36)})
SEC.update({"rose-red":(352,.60,.45),"plum":(320,.45,.30),"coral rose":(8,.64,.48),"teal":(182,.44,.35),"indigo blue":(228,.45,.32),
"warm ivory":None,"apricot":(24,.68,.50),"rose pink":(350,.72,.45)})
SEC_NEW={"m01":"plum","m02":"coral rose","m03":"warm ivory","m04":"indigo blue","m05":"teal","m06":"apricot","m07":"rose-red","m08":"jade green",
"m09":"teal","m10":"deep rose","m11":"coral rose","m12":"blue-violet","m13":"deep teal","m14":"jade green","m15":"indigo blue","m16":"jade green",
"m17":"rose pink","m18":"deep rose","m19":"teal","m20":"apricot","m21":"coral rose","m22":"jade green","m23":"indigo blue","m24":"plum",
"m25":"rose-red","m26":"teal","m27":"rose-red","m28":"indigo blue","m29":"deep rose","m30":"jade green","m31":"blue-violet","m32":"plum",
"m33":"apricot","m34":"teal","m35":"coral rose","m36":"indigo blue","m37":"rose-red","m38":"jade green","m39":"warm ivory","m40":"teal",
"m41":"rose pink","m42":"jade green","m43":"coral rose","m44":"deep rose","m45":"plum","m46":"teal","m47":"mint","m48":"jade green",
"m49":"warm ivory","m50":"indigo blue","m51":"rose-red","m52":"jade green"}
YELLOW=set()   # owner Lượt 598: renamed (m12 warm sand apricot, m23 soft peach sand, m31 pale sand apricot)   # yellow mains not allowed → apricot-family hex, NAME kept (flag)
NEUTRAL={"m14","m36","m44","m48"}
def hue(h): return colorsys.rgb_to_hls(*(int(h[i:i+2],16)/255 for i in (1,3,5)))
out={"_note":"REVISED Lượt 599 (greens/blues spread, secondaries diversified) after owner Lượt 598 approval (Lượt 594 proposal + fixes: m06 → pale blue, m12/m23/m31 yellow names → sand apricot/peach names, m52 secondary → jade green). BW4 wires it into build.py MAID_ROWS. Hex at foreign-princess level.","status":"REVISED Lượt 599 (pending owner side-by-side)","rows":{}}
for line in CUR.splitlines():
    m,name,old,sec=line.split('|'); sec=SEC_NEW[m]
    v=MAIN[m]; mh=v if isinstance(v,str) else hx(*v); sh="#EAD7BF" if sec=="warm ivory" else hx(*SEC[sec])
    H1,L1,S1=hue(mh); H2,_,_=hue(sh); d=abs(H1-H2)*360; d=min(d,360-d)
    contrast="neutral main" if m in NEUTRAL else ("neutral secondary" if sec=="warm ivory" else ("OK" if d>=60 else f"WEAK ({d:.0f}°)"))
    flag=[]
    if m in YELLOW: flag.append("yellow name → apricot-family hex proposed; owner to rename?")
    if "grey" in name and False: flag.append("name says grey; hex proposed as a clear soft blue")
    if contrast.startswith("WEAK"): flag.append("same hue family as secondary")
    out["rows"][m]={"main":name,"old_hex":old,"main_hex":mh,"secondary":sec,"secondary_hex":sh,"contrast":contrast,"flags":flag}
json.dump(out,open(os.path.join(D,'m_colours_proposed.json'),'w'),ensure_ascii=False,indent=1)
for m,r in out["rows"].items(): print(f"{m} {r['main']} {r['old_hex']}→{r['main_hex']} + {r['secondary']} {r['secondary_hex']} [{r['contrast']}] {'; '.join(r['flags'])}")

from collections import Counter
def fam(h):
    H,L,S=hue(h); H*=360
    if S<0.2 or (L>0.84): return "ivory/neutral"
    return ("red/pink" if H>=335 or H<15 else "orange/peach" if H<45 else "yellow-green" if H<80 else "green" if H<165 else "teal/aqua" if H<195 else "blue" if H<240 else "violet/lilac" if H<290 else "purple/magenta")
mc=Counter(fam(r["main_hex"]) if r["main"] not in ("ivory white","ivory cream","ivory","warm beige cream") else "ivory/neutral" for r in out["rows"].values())
sc=Counter(r["secondary"] for r in out["rows"].values())
print("MAIN families:",dict(mc)); print("SECONDARIES:",dict(sc))
out["counts"]={"main_families":dict(mc),"secondaries":dict(sc)}
json.dump(out,open(os.path.join(D,'m_colours_proposed.json'),'w'),ensure_ascii=False,indent=1)
