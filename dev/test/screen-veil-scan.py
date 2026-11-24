#!/usr/bin/env python3
"""screen-veil-scan (law 11, owner OD 24/11 ~10:20Z; KIT §94): list EVERY screen change of the game and say whether the ONE veil watcher
(dev/build/jscrv.js, view key = life · place · tab · event at head of Q · mini-game · full-screen body layers) covers it.
usage: python3 dev/test/screen-veil-scan.py [--md]   (exit 1 when a full-screen layer on <body> is not in the watcher's layer list)"""
import re,os,sys,glob
D=os.path.join(os.path.dirname(__file__),'..','build')
SRC={os.path.basename(f):open(f,encoding='utf-8').read() for f in sorted(glob.glob(D+'/j*.js')) if not f.endswith('all.js')}
scrv=SRC.get('jscrv.js','')
ov=re.search(r'const SCRV_OV="([^"]*)"',scrv);SEL=ov.group(1).split(',') if ov else []
OVC=[x.split('.')[-1] for x in SEL if '.' in x];OVI=[x[1:] for x in SEL if x.startswith('#')]
rows=[]
def add(kind,f,n,what,cov):rows.append((kind,f,n,what,cov))
for f,s in SRC.items():
  if f=='jscrv.js':continue
  cnt=lambda p:len(re.findall(p,s))
  n=cnt(r'\bgoTo\(|\bwalkGo\(');        n and add('place move (Dư đồ / buttons / walk)',f,n,'goTo/walkGo','key p (S.place)')
  n=cnt(r'\btab\s*=\s*[^=]');           n and add('tab switch',f,n,'tab=','key t (tab)')
  n=cnt(r'\bQ\.(push|unshift)\(');      n and add('event / dialog (Q head)',f,n,'Q.push','key q (Q[0] while #modal open)')
  n=cnt(r'\bopenMG\(|\bS\.mg\s*=\s*\{');n and add('mini-game board',f,n,'openMG/S.mg','key g/v (S.mg, #ov)')
  n=cnt(r'\bdeser\(');                  n and add('save load / co-op merge',f,n,'deser','key L (S object)')
  n=cnt(r'\bkmStage\(|\bkmPush\(');     n and add('motion stage overlay',f,n,'kmStage/kmPush','layer .kmov')
  for m in re.finditer(r'document\.body\.appendChild\((\w+)\)',s):
    v=m.group(1);back=s[max(0,m.start()-900):m.start()]
    cls=re.findall(v+r'\.className\s*=\s*["`]([^"`$ ]+)',back);ids=re.findall(v+r'\.id\s*=\s*["`]([^"`$]+)',back)
    c=(cls[-1] if cls else '');i=(ids[-1] if ids else '')
    if not c and not i:continue
    full=re.search(r'(position:fixed;inset:0|inset:0)',back) is not None
    hit=any(x in c.split() for x in OVC) or i in OVI
    add('layer on <body>',f,1,(('#'+i) if i else '')+(('.'+c) if c else ''),'layer key' if hit else ('NOT a screen (small)' if not full else 'MISSING'))
md='--md' in sys.argv
agg={}
for k,f,n,w,c in rows:
  key=(k,w if k=='layer on <body>' else '',c);agg.setdefault(key,[]).append(f'{f}×{n}' if n>1 else f)
print('| change | site(s) | covered by |' if md else 'change | site(s) | covered by');print('|---|---|---|' if md else '')
miss=0
for (k,w,c),fs in sorted(agg.items()):
  if c=='MISSING':miss+=1
  print(f'| {k}{(" "+w) if w else ""} | {", ".join(fs[:8])}{" …+"+str(len(fs)-8) if len(fs)>8 else ""} | {c} |' if md else f'{k} {w} | {", ".join(fs[:8])} | {c}')
print(f'\n{len(rows)} sites; full-screen body layers not in the watcher: {miss}');sys.exit(1 if miss else 0)
