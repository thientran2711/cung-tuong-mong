#!/usr/bin/env python3
"""G64 DRAFT gate (owner L1952, via #27): sleeve bands / cuffs / trims / borders carry SMALL motifs only;
big motifs only on the skirt panels or as roundels at the shoulders/chest band, never one huge flower on the robe body.
usage: g64_check.py FILE...   exit 1 = FAIL. Draft by HADUONG2 — not wired into check_store.py (foreman decides)."""
import re,sys
BIG=r"(?:LARGE|large|BIG|big|huge|HUGE|giant|oversized|full-size)"
BAND=r"(?:borders?|bands?|cuffs?|trims?|edg(?:e|ing)s?|sleeve ends?|hems?|neckline)"
# a big motif word and a band word in the same clause, the motif placed ON the band
R1=re.compile(BIG+r"[^.;:]{0,40}?(?:flowers?|blossoms?|peon(?:y|ies)|plums?|lotus(?:es)?|motifs?|sprays?)[^.;:]{0,25}?\b(?:on|at|along|in)\s+(?:the\s+)?(?:\w+\s+){0,3}"+BAND+r"\b")
R2=re.compile(r"\b"+BAND+r"\b[^.;:]{0,40}?(?:embroidered|stitched|woven)\s+with\s+[^.;:]{0,15}?"+BIG+r"\b")
R3=re.compile(r"(?:ONE|one|a single|a)\s+"+BIG+r"\s+(?:\w+\s+){0,2}(?:flower|bloom|peony|blossom)\s+(?:on|across|covering)\s+(?:the\s+)?(?:\w+\s+){0,2}(?:robe|body|chest|back)\b")
R4=re.compile(BIG+r"\s+(?:\w+\s+){0,2}(?:flowers?|blossoms?|peon(?:y|ies)|plums?|lotus(?:es)?|sprays?)[^.;:]{0,40}?\bon the (?:outer )?robe\b(?! hem)")
# WARN: an embroidered band/border with no size word (the gen tool then often draws big flowers)
R5=re.compile(r"[^.;]*\b(?:borders?|bands?|cuffs?)\b[^.;]*\b(?:embroider\w*|plum|peon\w*|flowers?|blossoms?)\b[^.;]*")
SMALLW=re.compile(r"\b(?:SMALL|small|tiny|TINY|little|fine|delicate)\b")
def warns(t):
    return [f"G64 WARN band motifs with no SMALL word: …{m.group(0).strip()[:120]}…" for m in R5.finditer(t) if not SMALLW.search(m.group(0)) and not re.search(BIG,m.group(0))]
def check(t):
    out=[]
    for name,r in (("big motif on a band",R1),("band embroidered with big motifs",R2),("one huge flower on the robe body",R3),("big motif on the robe body (put big motifs on the skirt panels / shoulder roundels)",R4)):
        for m in r.finditer(t): out.append(f"G64 {name}: …{m.group(0)[:140]}…")
    return out
if __name__=="__main__":
    if sys.argv[1:]==["--selftest"]:
        assert check("WIDE borders embroidered with LARGE plum blossoms at the hem")
        assert check("LARGE plum blossoms on the sleeve bands")
        assert check("one huge peony on the robe body")
        assert check("a few LARGE plum blossoms and ONE small peony spray on the robe")
        assert not check("indigo borders at sleeves and hem with SMALL plum blossoms; a few LARGE plum blossoms on the skirt front")
        print("selftest ok"); sys.exit(0)
    bad=0
    for f in sys.argv[1:]:
        r=check(open(f,encoding="utf8").read())
        t=open(f,encoding="utf8").read(); w=warns(t)
        print(("[FAIL] " if r else "[PASS] ")+f); [print("   "+x) for x in r+w]; bad|=bool(r)
    sys.exit(bad)
