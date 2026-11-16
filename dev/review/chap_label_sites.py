#!/usr/bin/env python3
"""LUAT SUA CA NHOM static scan (owner 15/11 20:30Z, story progress shows "Chuong N · Hoi i/n"): lists every line of dev/build/j*.js
that prints a story line's progress (chapter / act / step of Menh truyen, phu tuyen, old story, j72 Viec nho) and says how it is labelled.
usage: python3 dev/review/chap_label_sites.py [git-rev]   (no rev = working tree; a rev reads `git show rev:dev/build/<f>`)
Mini-game HUDs ("Hồi x/y" = one round, VANPHONG) and the hồi-count lines of chapter cards are listed as out of scope."""
import re,sys,glob,os,subprocess
R=os.path.dirname(os.path.abspath(__file__))+'/../..';rev=sys.argv[1] if len(sys.argv)>1 else None
FILES=['j4.js','j6.js','j67.js','j72.js','j96.js','j97.js','jstory.js','jtabs.js','jevb.js','j82.js','j91.js']
PAT=re.compile(r'(Bước \$\{|bước \$\{|[Hh]ồi \$\{|Chương \$\{|title67\(|lab67\(|word:"Hồi"|word:"Bước"|Cơ duyên hiếm`)')
def src(f):
  if rev:return subprocess.run(['git','-C',R,'show',f'{rev}:dev/build/{f}'],capture_output=True,text=True).stdout
  return open(f'{R}/dev/build/{f}',encoding='utf-8').read()
def kind(f,l):
  if f in('j82.js','j91.js'):return 'mini-game round HUD (not a story line)'
  if 'lab67(' in l or 'title67(' in l and 'function title67' not in l:return 'story label via lab67/title67: Chương · Hồi'
  if f=='j72.js':return 'Việc nhờ favour: bước i/n (one-chapter favour, no chapter)'
  if 'function title67' in l:return 'title67: '+('Chương · Hồi' if 'lab67' in l else 'Bước i/n only (NO chapter)')
  if 'word:"Hồi"' in l and 'Chương ${' in l:return 'kit head card: kicker Chương + steps Hồi i/n'
  if f=='j67.js' and 'span class="past">· hồi' in l:return 'act only in the raw dialog line; jstory.js rewrites it to "Chương N · <arc>" (title has Chương · Hồi)'
  if 'Chương ${' in l and re.search(r'[Hh]ồi \$\{',l):return 'Chương + hồi (hand-built)'
  if 'Chương ${' in l:return 'chapter only (chapter card / closed chapter / milestone)'
  if re.search(r'[Bb]ước \$\{|[Hh]ồi \$\{',l):return 'act/step only (NO chapter)'
  return 'other'
rows=[]
for f in FILES:
  for n,l in enumerate(src(f).split('\n'),1):
    if PAT.search(l):
      for m in PAT.finditer(l):
        a=max(0,m.start()-50);rows.append((f,n,kind(f,l),l[a:m.end()+60].strip().replace('|','¦')))
seen=set();out=[]
for r in rows:
  k=(r[0],r[1]);
  if k in seen:continue
  seen.add(k);out.append(r)
print(f'| file:line | label kind | text |\n|---|---|---|')
for f,n,k,t in out:print(f'| {f}:{n} | {k} | `{t[:150]}` |')
from collections import Counter
print('\nSummary:',dict(Counter(k for _,_,k,_ in out)))
