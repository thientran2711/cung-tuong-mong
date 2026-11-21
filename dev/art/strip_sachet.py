#!/usr/bin/env python3
"""G59 (owner L1874): remove every sachet (túi thơm / sachet / scent pouch / hà bao) from prompts. usage: strip_sachet.py [--write] FILE..."""
import re,sys
FR=r"(?:small |simple |plain )?(?:embroidered )?(?:silk |cloth )?(?:fragrant )?sachet(?: \(túi thơm\))?"
R=[
 (r",? a small embroidered silk fragrant sachet \(túi thơm\) on a silk cord with a tassel hanging at the centre between the two panels", ""),
 (r",? a small embroidered silk fragrant sachet \(túi thơm\) with a tassel hanging from the sash at the waist on a short silk cord looped over the sash", ""),
 (r" with a small embroidered silk fragrant sachet \(túi thơm\) hanging from (?:it|the sash)(?: on a silk cord)?", ""),
 (r",? a small embroidered silk fragrant sachet \(túi thơm\) hanging from the sash(?: on a silk cord)?", ""),
 (r"an embroidered (?:red )?silk sachet with a tassel", "a small round embroidered silk fan with a silk tassel"),
 (r"(?:a|an) (?:small )?embroidered fragrant sachet with a long silk tassel dangling from her fingers", "a small round embroidered silk fan with a silk tassel held in her fingers"),
 (r"a simple embroidered cloth sachet", "a small round embroidered silk fan"),
 (r"an embroidered sachet with a tassel", "a small round embroidered silk fan with a silk tassel"),
 (r"a small embroidered silk sachet held up by its red cord", "a small round embroidered silk fan held up by its red tassel"),
]
DET=re.compile(r"sachets?\b|túi thơm|tui thom|scent(?:ed)? pouch|perfume bag|hà bao|fragrant pouch|embroidered pouch",re.I)
def strip(t):
    for a,b in R: t=re.sub(a,b,t)
    return t
if __name__=="__main__":
    w=sys.argv[1]=="--write"; n=0
    for f in sys.argv[1+w:]:
        t=open(f,encoding="utf8").read(); u=strip(t)
        if u!=t:
            n+=1
            if w: open(f,"w",encoding="utf8").write(u)
    print("changed",n)
