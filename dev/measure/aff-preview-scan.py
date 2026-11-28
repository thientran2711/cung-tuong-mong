#!/usr/bin/env python3
"""AFF-PREVIEW scan (law 4 / law 11): every player-visible PREVIEW of a thiện cảm rise whose act moves it through the affAdd funnel
(relAdd / affAdd / spAdd(...,"rel") / ap|apply({hh})) must print affPreview / affSg (the same wrapper math, not applied), not the raw BAL amount.
Lists: sites printing «thiện cảm <num>» from a BAL key that the same file also feeds to relAdd/affAdd/spAdd rel. Exit 1 if any raw one is left.
usage: python3 dev/measure/aff-preview-scan.py [build_dir] [--all]"""
import re,sys,os,glob
D=sys.argv[1] if len(sys.argv)>1 and not sys.argv[1].startswith('--') else os.path.join(os.path.dirname(__file__),'..','build')
ALL='--all' in sys.argv
SKIP={'jksize.js','jkitpage.js','jkitsel.js'}  # kit sample pages (demo numbers, no act)
# a BAL expression fed to the funnel
EX=r'(-?\s*[A-Za-z_$][A-Za-z0-9_$]*(?:\(\))?(?:\.[A-Za-z0-9_$]+|\[[^\]]+\])*)'
FUN=re.compile(r'(?:relAdd|affAdd|affGot\([^,()]+,[^,()]+,\(\)=>(?:relAdd|affAdd))\(\s*[^,()]+,\s*[^,()]+,\s*'+EX+r'\s*\)')
SPR=re.compile(r'spAdd\(\s*[^,()]+,\s*"rel",\s*'+EX+r'\s*\)')
# a preview print: thiện cảm then within a few chars a ${ ... BAL... } number
PRV=re.compile(r'(?:[Tt]hiện cảm|quý ngươi|quý ta|mến ngươi)[^`$<]{0,12}[+\-−]?\$\{\s*(balSg|balAb|affSg|affPreview|spSee|pvQuy)?\(?\s*(?:[A-Za-z0-9_.\[\]]+,\s*S,\s*)?'+EX)
# NO ONE PERSON at preview time (a whole group / a random pick made inside the act / a static act text with no target): the rise differs per person,
# so no single real number exists before the act; the RESULT lines read the real change. Listed for MAIN's ruling, not counted.
NOPERSON={'j10.js:BAL.ag.par3.fac.leave.rel':'group: every faction member','j31.js:BAL.eff.j31.go':'random pick inside go',
 'j54.js:H54.clanRel':'group: the clan','j54.js:H54.envy':'group: envious mothers','j55.js:BAL.eff.j55.tdProbe':'list button, no target yet (per-target card fixed)',
 'j68e.js:BAL.eff.j68e.ok':'random pick inside ok','j71.js:BAL.eff.j71.ok':'group: every consort','j72.js:BAL.eff.j72.fn_10':'static outcome text (no X in scope)',
 'j83.js:ev.rel':'wkGainTxt(ev) has no target','j97.js:G[0]':'group result line','jecon.js:BAL.favorCost':'static act x (person named by xw)',
 'jht.js:HT.clanRel':'group: the clan','jht.js:HT.envy':'group: envious mothers','jpetcare.js:BAL.pet.helpRel':'static act x / AOUT text',
 'jts.js:BAL.eff.jts.liXiAff':'group: every guest'}
rows=[];raw=0;nop=0
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
  b=os.path.basename(f)
  if b in SKIP: continue
  s=open(f,encoding='utf-8').read()
  keys=set(re.sub(r'\s','',m.group(1)).lstrip('-') for m in FUN.finditer(s))|set(re.sub(r'\s','',m.group(1)).lstrip('-') for m in SPR.finditer(s))
  keys={k for k in keys if not re.fullmatch(r'n|d|v|g|x|k|r|a|b|c|-?\d+',k)}  # one-letter locals: too loose to pair by name
  LS=s.split('\n')
  for i,l in enumerate(LS,1):
    for m in PRV.finditer(l):
      k=re.sub(r'\s','',m.group(2)).lstrip('-');fn=m.group(1) or 'raw'
      if k not in keys:
        # a one-letter local (n, g …): paired only with a funnel on the same or the next 2 lines
        near='\n'.join(LS[i-1:i+2])
        if not re.fullmatch(r'[a-z]',k) or not re.search(r'(?:relAdd|affAdd)\(\s*[^,()]+,\s*[^,()]+,\s*-?'+re.escape(k)+r'\s*\)|spAdd\([^,()]+,"rel",\s*-?'+re.escape(k)+r'\)',near): continue
      ok=fn in('affSg','affPreview','pvQuy')
      if not ok and b+':'+k in NOPERSON: nop+=1;rows.append((b,i,k,fn,'NOPERSON: '+NOPERSON[b+':'+k])) if ALL else None;continue
      if not ok: raw+=1
      if ALL or not ok: rows.append((b,i,k,fn,'ok' if ok else 'RAW'))
for r in rows: print('%s:%d\t%s\t%s\t%s'%r)
print('# preview sites printing a raw funnel amount: %d (no-one-person, listed with --all: %d)'%(raw,nop))
sys.exit(1 if raw else 0)
