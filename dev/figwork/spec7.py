# spec7.py (art8, owner 11/14): calm standing + LIVELY HANDS: every figure of a lineup holds a DIFFERENT prop with a different
# hand gesture (fan, flowers, teacup, brocade box, scroll, lantern, flute, handkerchief, touching a hairpin ...).
# Overrides the a24/a32/a48 pose parts of the t4 redraw lineups (a19 keeps her signature prop from spec5). Idempotent. Run after spec6.py.
import json,re
J=json.load(open("jobs.json"))
G={"A":"one hand raised lightly touching a gold hairpin in her chignon, the other hand resting at her waist",
"B":"holding a small sprig of plum blossoms at her chest in one hand, the other hand cupped beneath it",
"C":"holding a small celadon teacup on its saucer before her with both hands",
"D":"holding a small embroidered brocade box with both hands at waist height",
"E":"holding a half-unrolled painting scroll with both hands before her, looking at it",
"F":"holding a small red silk palace lantern on a short carved pole, lowered at her side in one hand, the other hand at her waist",
"G":"holding a jade flute horizontally before her chest with both hands",
"H":"holding a silk handkerchief lightly in one raised hand, the other hand resting on her sash",
"I":"holding a round silk fan painted with flowers at her chest in one hand, the other hand lifting her sleeve slightly",
"K":"holding a string of sandalwood prayer beads in one hand, the other hand resting gently over it",
"L":"holding a closed folding fan pointing down at her side in one hand, the other hand at her waist"}
P4={"c01":"EFC","c07":"IDK","c19":"BGD","c20":"FCE","c21":"HAD","c22":"GEC","c23":"IFK","c24":"BLC","c26":"DIE","c27":"GBC",
"c28":"FIK","c29":"HBD","c31":"AEK","c32":"IFC"}
# t6 c01-c16 saturated redraw (art8)
P6={"c01":"DGK","c02":"BEC","c03":"FBK","c04":"CDE","c05":"GBD","c06":"EKC","c07":"FEC","c08":"IGC","c09":"DFK","c10":"IED",
"c11":"BFC","c12":"IEC","c13":"BDC","c14":"GIK","c15":"IDC","c16":"FEK"}
SIGFIX={"c20":("lace-like gauze folding fan","embroidered silk folding fan"),"c04":("round gauze fan","round silk fan")}
JOBS=[(f"N-{c}-t4",c,v,"") for c,v in P4.items()]+[(f"N-{c}-t6",c,v,", stately poised posture") for c,v in P6.items()]

# t1-t3 (art8, for the t1-t3 calm redraw): rotate the pool per consort/tier, skipping props that clash with her signature (a19) prop
POOL="ABCDEFGHIKL"
def excl(sig):
    s=sig.lower(); x=set()
    if "fan" in s: x|={"I","L"}
    if any(w in s for w in ("flower","blossom","jasmine","lotus","sprig","basket")): x.add("B")
    if "handkerchief" in s: x.add("H")
    if "flute" in s: x.add("G")
    if "box" in s: x.add("D")
    if any(w in s for w in ("bead","pearl")): x.add("K")
    if any(w in s for w in ("scroll","letter","paper")): x.add("E")
    if "hairpin" in s: x.add("A")
    return x
for t in (1,2,3):
    for n in range(1,33):
        c="c%02d"%n; k=f"N-{c}-t{t}"
        if k not in J: continue
        m=re.search(r"left to right: (about 19.*?); about 24",J[k]["prompt"])
        if not m: continue
        x=excl(m.group(1)); o=(n*3+t*5)%len(POOL); codes=""
        for i in range(len(POOL)):
            L=POOL[(o+i)%len(POOL)]
            if L not in x and L not in codes: codes+=L
            if len(codes)==3: break
        JOBS.append((k,c,codes,""))
for k,c,codes,suf in JOBS:
    p=J[k]["prompt"]
    if c in SIGFIX: p=p.replace(*SIGFIX[c])
    m=re.search(r"(left to right: about 19.*?); (about 24.*?); (about 32.*?); (about 48.*?); all four standing",p)
    if not m: print("NOMATCH",k); continue
    a24=f"about 24, confident and graceful, a slight three-quarter turn: {G[codes[0]]}{suf}"
    a32=f"about 32, poised, in her prime: {G[codes[1]]}{suf}"
    a48=f"about 48, serene and calm: {G[codes[2]]}{suf}"
    p=p[:m.start(2)]+a24+"; "+a32+"; "+a48+p[m.end(4):]
    if "EACH figure holds a DIFFERENT object" not in p:
        p=p.replace("; all four standing still","; EACH figure holds a DIFFERENT object with a DIFFERENT hand gesture, no two alike; all four standing still",1)
    J[k]["prompt"]=p
json.dump(J,open("jobs.json","w"),indent=0)
print("ok")
