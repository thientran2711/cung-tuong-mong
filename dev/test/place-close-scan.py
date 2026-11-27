#!/usr/bin/env python3
"""review/place-close (owner OD 26/11 ~14:00Z, law 11 FIX THE WHOLE GROUP): every path that ends / judges her visit at a place's closing time.
Prints the table (path, file:line, what it does now) and FAILS when a closing path can confine her (punish weight >= 1 / cấm túc),
opens a dialog card (Q.push) for an overstay, or types its own grace number instead of BAL.placeClose.
usage: python3 dev/test/place-close-scan.py   (exit 1 on a fault)"""
import re,sys,os
B=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
def src(f):return open(os.path.join(B,f),encoding='utf-8').read()
def line(f,pat):
    for i,l in enumerate(src(f).split('\n'),1):
        if re.search(pat,l):return i
    return 0
def body(f,name):
    s=src(f);i=s.find('function '+name+'(');
    if i<0:return ''
    j=s.find('\nwindow.'+name+'=',i);return s[i:j if j>0 else i+6000]
ROWS=[ # (path, file, locate regex, verdict check)
 ('buổi turn still inside a closed place','jstagehere.js',r'function pcTurn\(','opens the GRACE (no roll, no loss)'),
 ('grace used up → caught roll','jstagehere.js',r'function stayPen\(','NHẸ via BAL.placeClose.sev, never cấm túc, kit notice'),
 ('unwarned / no way home at grace end','jstagehere.js',r'if\(G\.nf\|\|noWay\)','walked home, no loss, kit notice'),
 ('talk that spills over the buổi (j76 carry)','j76.js',r'S\.j76carry=\(S\.j76carry\|\|0\)\+','carry counts inside the grace (pcTurn end = max(grace, carry+leave))'),
 ('walk that spills into a closed place','j9.js',r'S\.buoi=b\+1;a=accessOf','refused before walking (access of the next buổi)'),
 ('route walk spill into a closed place','j76.js',r'!accessOf\(S,k\)\.ok\)\)\{const b0','refused before walking'),
 ('new buổi, she stays at the place','j77.js',r'ngươi vẫn ở \$\{nm\}','line only («ngươi vẫn ở …»)'),
 ('cấm túc / lãnh cung at the turn','j41.js',r'Không ở lại \$\{nm\} được','line only (reason set elsewhere)'),
 ('cấm túc pins her home','jplrule.js',r'function plSweep\(','moves her (no punishment of its own)'),
 ('door refusal (thu / dtd)','jplrule.js',r'Ngươi phải lui ra\\\.\|Thái giám','moves her home, no punishment'),
 ('day turn / night','j3.js',r'S\.place="home"','home, no punishment'),
 ('closing notice (chip)','jstagehere.js',r'function chip\(','kitNotice states pulse / late (K-CHIP-PULSE)'),
]
fail=[]
print('| # | path | file:line | now |');print('|---|---|---|---|')
for n,(p,f,rx,v) in enumerate(ROWS,1):
    L=line(f,rx);print(f'| {n} | {p} | {f}:{L or "MISSING"} | {v} |')
    if not L:fail.append('missing path '+p)
s=body('jstagehere.js','stayPen')+body('jstagehere.js','pcTurn')+body('jstagehere.js','pcCheck')
if 'Q.push' in s:fail.append('overstay opens a dialog card (Q.push)')
if re.search(r'punish\([^)]*,\s*[12]\s*\)',s):fail.append('overstay punish weight >= 1')
if 'BAL.placeClose' not in src('jstagehere.js') and 'PC()' not in s:fail.append('grace not read from BAL.placeClose')
if re.search(r'grace:\s*\d',src('jstagehere.js').replace('{grace:2,leave:1,sev:0}','')):fail.append('typed grace number in jstagehere')
m=re.search(r'placeClose:\{grace:(\d+),leave:(\d+),sev:(\d+)\}',src('jbal.js'))
if not m:fail.append('BAL.placeClose missing')
elif int(m.group(3))!=0:fail.append('BAL.placeClose.sev must be 0 (NHẸ)')
# any other overstay punisher in the game
for f in sorted(os.listdir(B)):
    if not re.match(r'j.*\.js$',f) or f=='jstagehere.js':continue
    for i,l in enumerate(src(f).split('\n'),1):
        if re.search(r'punish\(S,`[^`]*(sau giờ đóng cửa|quá giờ|nán lại)',l):fail.append(f'other overstay punisher {f}:{i}')
print('\nfaults:',fail or 'none');sys.exit(1 if fail else 0)
