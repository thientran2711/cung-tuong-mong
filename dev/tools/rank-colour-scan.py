#!/usr/bin/env python3
"""B24 scan: (1) every use of the rank colour table (RCOL/kitRankCol/KIT_RANK_COL/haloColor), (2) stray literals of the OLD rank hexes.
Exit 1 if any old hex remains outside historical reports. Run from repo root."""
import re,subprocess,sys
OLD="c4861a 12b84a 1f6cff ff3d8f a23cff ff1f3d ff6a00 ffc400 b8862f 27b04c 2d7ef0 f0489a 9b4ee6 ee2a3f ff7a10 ffc20a".split()
files=subprocess.check_output(["git","ls-files","dev/build","dev/kit","dev/site","dev/test","rank","coop"],text=True).split()
use=re.compile(r"RCOL\b|kitRankCol|KIT_RANK_COL|haloColor|--halo")
stray=[];uses=0
for f in files:
    if not re.search(r"\.(js|css|html|md|py)$",f):continue
    for n,l in enumerate(open(f,errors="ignore"),1):
        if use.search(l):uses+=1
        if any(h in l.lower() for h in OLD):stray.append((f,n,l.strip()[:110]))
print("rank-colour reads (lines):",uses);print("stray old hexes:",len(stray))
for s in stray:print("  %s:%d | %s"%s)
sys.exit(1 if stray else 0)
