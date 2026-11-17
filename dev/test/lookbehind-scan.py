#!/usr/bin/env python3
"""Every regex LOOKBEHIND (?<= (?<! in the game + site code must reach kRx (dev/build/j0.js): old Safari (iOS < 16.4) cannot parse a literal
and throws on new RegExp(...). BAD = a line with a lookbehind that has no kRx( / R( (j84 alias of kRx) on it. exit 1 when BAD > 0.
usage: python3 dev/test/lookbehind-scan.py"""
import re,glob,os,sys
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
files=[f for f in glob.glob(D+'/build/j*.js')+glob.glob(D+'/site/*.js') if not re.match(r'(all|dev)',os.path.basename(f))]
# strings built on their own line but only ever handed to kRx / R() (checked live by dev/test/webkit-boot.js): j84 B (prefix of R(B+...)), jaudit KREL_RE parts (kRx([...].join))
OKLINE=(('j84.js','const B="(?<!'),('jaudit.js','"(Nàng(?: ta)?|Hắn|Y|'))
LB=re.compile(r'\(\?<[=!]');bad=0;ok=0
for f in sorted(files):
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    if not LB.search(l) or l.lstrip().startswith(('/*','//','*')) or f.endswith('/j0.js'):continue
    if any(os.path.basename(f)==a and l.strip().startswith(b) for a,b in OKLINE):ok+=1
    elif re.search(r'\bkRx\(|[^\w.]R\(|\bkWB\(',l):ok+=1
    else:bad+=1;print('BAD %s:%d: %s'%(os.path.relpath(f,D),i,l.strip()[:150]))
print('lookbehind lines: %d via kRx/R, %d BAD'%(ok,bad));sys.exit(1 if bad else 0)
