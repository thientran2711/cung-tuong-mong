#!/usr/bin/env python3
"""robot10 E-FIX-5 family scan: every place that decides «is this person a man» by his id (ids m<digits> from menInit / jmen / j96) or by
relMan, and what it does with the ROAD men (jrd_bd «mbd_*», jrd_pt «mpt_*», role «Sứ thần»). A display site that still uses the m<digits>
test / relMan alone draws or files a road man as a servant. usage: python3 dev/test/r10e-manid-scan.py   (exit 1 if a display site is open)"""
import re,glob,os,sys
B=os.path.join(os.path.dirname(__file__),'..','build')
# sites whose verdict is fixed by design (not display): key / sync / pronoun paths
KEEP={('j9.js','relMan'):'relation keys (afw / relHk): road men keep their j61 key (x<n>) and the af map — unchanged, saves keep their numbers',
      ('j95.js','^m'):'mention key: a road man falls to his j61 person key (same key the picker uses)',
      ('jhc.js','relMSOf'):'key → person: a road man\'s key x<n> resolves through k61Ent',
      ('jnet.js','^m'):'sex for pronouns: a road man has rw → «m» on the line before',
      ('jkrel.js','relMan'):'isMS list test: relMan OR relMSAll() (which holds S.men → road men) — a road man passes; the next line\'s relMan is only the typeof fallback of relManP',
      ('jcoopask.js','^m'):'co-op: the host\'s menInit set (m<n>) is never asked; road men ARE asked (hers) — intended'}
rows=[];bad=0
for f in sorted(glob.glob(os.path.join(B,'j*.js'))):
  fn=os.path.basename(f)
  for i,l in enumerate(open(f,encoding='utf8'),1):
    for m in re.finditer(r'/\^m\\d\+?\$?/|\brelManP?\(',l):
      tok=m.group(0)
      if 'const relMan=' in l:continue
      if 'const relManP=' in l:continue
      ctx=l[max(0,m.start()-60):m.end()+40].replace('|','¦').strip()
      if tok.startswith('relManP'):v='display: relManP (numbered + road men)'
      else:
        key=None
        for (kf,kk),why in KEEP.items():
          if kf==fn and ((kk=='relMan' and tok.startswith('relMan')) or (kk!='relMan' and tok.startswith('/^m') and (kk=='^m' or ('relMSOf' in l and 'relGrp' not in l)))):key=why
        if not key and fn=='jhc.js' and 'relGrp' in l and 'relManP(relMSOf' in l:key='group label: m<n> keys OR relManP(relMSOf(k)) on the same line'
        if key:v='kept: '+key
        else:v='OPEN: road man treated as not-a-man';bad+=1
      rows.append((f'{fn}:{i}',tok,v))
print('| file:line | test | road man |\n|---|---|---|')
for r in rows:print('| %s | `%s` | %s |'%r)
print(f'sites {len(rows)} · open {bad}');sys.exit(1 if bad else 0)
