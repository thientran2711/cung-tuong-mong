# review/newlife-reset family scan: a field of S (or of any person p./v.) used by two modules for two different things (the S.vl bug:
# jvoice line memory {} vs jveil worn veil {k}). For every field written as a MAP (X=X||{} / X={}) in one module, list the other modules
# that read it as an ITEM (.X.k / IT[...X.k] / vlIs(...X)) or as an array (X.push / X.length / X.map). Exit 1 if any pair remains.
import re,glob,os,sys
F=[f for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__),'../build/j*.js'))) if not os.path.basename(f).startswith('all')]
mapw={};itemr={};arrr={}
for f in F:
  t=open(f,encoding='utf-8').read();b=os.path.basename(f)
  for m in re.finditer(r'\b(?:S|p|v|q)\.([A-Za-z_]\w*)\s*=\s*(?:(?:S|p|v|q)\.\1\s*\|\|\s*)?\{\s*\}',t):mapw.setdefault(m.group(1),set()).add(b)
  for m in re.finditer(r'\b(?:S|p|v|q)\.([A-Za-z_]\w*)\.k\b',t):itemr.setdefault(m.group(1),set()).add(b)
  for m in re.finditer(r'\b(?:S|p|v|q)\.([A-Za-z_]\w*)\.(?:push|length|map|filter|forEach|splice|slice)\b',t):arrr.setdefault(m.group(1),set()).add(b)
bad=[]
for k,ws in sorted(mapw.items()):
  for kind,R in (('item .k',itemr),('array',arrr)):
    other=sorted(R.get(k,set())-ws)
    if other:bad.append(f'{k}: map {{}} in {",".join(sorted(ws))} | read as {kind} in {",".join(other)}')
for x in bad:print('CHECK',x)
print('pairs',len(bad))
