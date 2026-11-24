#!/usr/bin/env python3
"""ky-keeper-f2 family scan (law 11): list every site in the Kỳ ngộ / lost-case files that WRITES an item holder
(push / splice into a chest, lostReturn, loKeepBy, ilTake, ilGone, a keeper copy built with lo:/gh:) so each can be
checked for a LIVE-state guard. usage: python3 dev/tools/ky-holder-sites.py [files…]"""
import re,sys
FILES=sys.argv[1:] or ["dev/build/jky.js","dev/build/jlost.js"]
PAT=re.compile(r"inv\.push\(|inv\.splice\(|lostReturn\(|loKeepBy\(|ilTake\(|ilGone\(|\{lo:[A-Za-z]")
for f in FILES:
    for n,l in enumerate(open(f,encoding="utf-8"),1):
        if l.lstrip().startswith(("/*","*")) and "function" not in l: continue
        hits=[m.group(0) for m in PAT.finditer(l)]
        if hits:
            fn=re.findall(r"(?:function |\b)([A-Za-z0-9_]+)(?:=\(|\(c,O\)=>|:\(?c|\()",l[:120])
            print(f"{f}:{n}\t{len(hits)}\t{' '.join(sorted(set(hits)))}\t{l.strip()[:110]}")
