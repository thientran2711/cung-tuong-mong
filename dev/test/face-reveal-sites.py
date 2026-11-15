#!/usr/bin/env python3
"""review/face-reveal: static list of every event-dialog site (Q.push / Q.unshift / Q.splice, PEND builders, j67/j68 dialog
builders) and whether it SHOWS a person (who / who2 / stage / faces / kit.subject) — the fields the central reveal rule (j61
k61Shown at showModal) reads — or only draws a portrait inside its text (mdH / pframe / pcPort / kitFace in the h string), which
the rule reveals from the portrait key (K61SHOWN).  usage: python3 dev/test/face-reveal-sites.py [--md]"""
import re, os, sys, json
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'build')
asm = open(os.path.join(D, 'assemble.py'), encoding='utf-8').read()
FILES = json.loads(re.search(r"for f in (\[[^\]]+\])", asm).group(1).replace("'", '"'))
SITE = re.compile(r"Q\.(push|unshift)\(|Q\.splice\([^,]+,\s*0\s*,|\bPEND\.(\w+)\s*=|\bPEND\[\"?(\w+)\"?\]\s*=\s*(?:function|\(|\w+\s*=>)")
PERSON = re.compile(r"\b(who2?|stage|faces|subject)\s*:")
PORT = re.compile(r"\b(mdH|pframe|pcPort|kitFace|kitStageFig)\(")
rows = []
for f in FILES:
    L = open(os.path.join(D, f), encoding='utf-8').read().split('\n')
    for i, ln in enumerate(L):
        for m in SITE.finditer(ln):
            seg = ln[m.start():m.start() + 1400]
            # stop at the next site on the same line
            n = SITE.search(seg, 5)
            if n: seg = seg[:n.start()]
            fld = sorted(set(x.group(1) for x in PERSON.finditer(seg)))
            port = sorted(set(x.group(1) for x in PORT.finditer(seg)))
            kind = 'PEND.' + (m.group(2) or m.group(3)) if (m.group(2) or m.group(3)) else 'Q.' + (m.group(1) or 'splice')
            t = re.search(r"\bt:\s*([`\"'])(.{0,40})", seg)
            rows.append(dict(site=f'{f}:{i+1}', kind=kind, fields=fld, port=port, title=(t.group(2) if t else '')))
shows = [r for r in rows if r['fields'] or r['port']]
if '--md' in sys.argv:
    print('| site | kind | person fields | portrait in text | title |\n|---|---|---|---|---|')
    for r in shows: print(f"| {r['site']} | {r['kind']} | {' '.join(r['fields'])} | {' '.join(r['port'])} | {r['title'].replace('|','/')} |")
else:
    print(json.dumps(dict(sites=len(rows), showPerson=len(shows), byField=sum(1 for r in shows if r['fields']),
                          portraitOnly=[r['site'] for r in shows if not r['fields']], noPerson=len(rows) - len(shows)), indent=1))
