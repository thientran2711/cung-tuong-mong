# p7v.py JID... : print only variable parts of p7 prompt; checks the rest equals the template of N-c01-t<tier>
import re,subprocess,sys
def full(k):
    o=subprocess.run(["python3","p7.py",k],capture_output=True,text=True).stdout.split("\n"); return o[0],o[1]
A=[("Her own features: "," From the identity"),("Outfit for all four: "," Poses ("),("left to right: about 19, youthful",
"; EACH figure"),("HUADIAN: "," Eyes soft")]
def split(p):
    parts=[];rest=p
    for a,b in A:
        i=p.index(a)+len(a); j=p.index(b,i); parts.append(p[i:j])
    t=p
    for x in parts: t=t.replace(x,"§",1)
    return parts,t
base={}
for k in sys.argv[1:]:
    h,p=full(k); parts,t=split(p); tier=k[-2:]
    if tier not in base: base[tier]=split(full("N-c01-"+tier)[1])[1]
    print(h, "TPL_OK" if t==base[tier] else "TPL_DIFF")
    for x in parts: print("  |",x)
