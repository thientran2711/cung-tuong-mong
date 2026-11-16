#!/usr/bin/env python3
"""LUẬT SỬA CẢ NHÓM scan for review/stat-fx: every effect string in dev/build/j*.js that holds a signed number, coloured by the OLD kcls
(substring regexes on origin/main) and by the NEW one (whole-word). Prints the rows whose colour changed (before/after table) and any
remaining '+N shown red / -N shown green' by sign. usage: python3 dev/test/stat-fx-scan.py [--md]"""
import re,subprocess,glob,sys,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
old=subprocess.run(['git','show','origin/main:dev/build/j19.js'],capture_output=True,text=True,cwd=R).stdout.split('\n')
def rx(src,fl):return re.compile(src,fl)
def grab(lines,name):
    for l in lines:
        m=re.match(r'const '+name+r'=/\((.*)\)/i;$',l)
        if m:return m.group(1)
def kcls_old(s):
    KRED,KHOST,KGOOD=[grab(old,n) for n in('KRED','KHOST','KGOOD')]
    KNEU=r"^(không|không tốn|không mất gì|không được mất gì|chỉ |—|\d+ (khắc|việc)|2 khắc|tốn 2 khắc|chọn )"
    return _k(s,KRED,KHOST,KGOOD,KNEU,False)
def kcls_new(s):
    KRED,KHOST,KGOOD=[grab(open(R+'/j19.js',encoding='utf-8').read().split('\n'),n) for n in()] if False else (None,None,None)
    t=open(R+'/j19.js',encoding='utf-8').read()
    g=lambda n:re.search(r'const '+n+r'=KWB\("(.*)"\);',t).group(1).replace('\\\\','\\')
    KNEU=r"^(không|không tốn|không mất gì|không được mất gì|chỉ |—|\d+ (khắc|việc)|2 khắc|tốn 2 khắc|chọn )"
    return _k(s,g('KRED'),g('KHOST'),g('KGOOD'),KNEU,True)
def _wb(src):return re.compile(r'(?<![^\W\d_])(?:'+src+r')(?![^\W\d_])',re.I) if True else None
def _k(s,KRED,KHOST,KGOOD,KNEU,wb):
    s=re.sub(r'<[^>]+>','',s).strip()
    if not s:return 'n'
    mk=(lambda x:re.compile(r'(?<![^\W_])(?:'+x+r')(?![^\W_])',re.I)) if wb else (lambda x:re.compile(x,re.I))
    if re.search(r'bớt (ghen|thù|oán)|hết (ghen|thù)',s,re.I):return 'g'
    if re.search(KNEU,s,re.I):return 'n'
    if mk(KHOST).search(s):return 'r'
    if re.search(r'(\bnàng\b|con nàng|của nàng)',s,re.I) and re.search(r'-\s?\d|sảy|chết|mất|phế|bị phạt|tịch thu|sa sút|không được lật thẻ|rơi',s,re.I):return 'g'
    if mk(KRED).search(s):return 'r'
    if mk(KGOOD).search(s):return 'g'
    if re.search(r'-\s?\d',s):return 'r'
    return 'n'
seen={};rows=[];bad=[]
for f in sorted(glob.glob(R+'/j*.js')):
    for m in re.finditer(r'"((?:[^"\\\n]|\\.){4,140})"|`((?:[^`\\\n$]|\\.){4,140})`',open(f,encoding='utf-8').read()):
        s=m.group(1) or m.group(2)
        if not re.search(r'[+−-]\s?\d',s) or not re.search(r'[A-Za-zÀ-ỹ]{3}',s):continue
        for seg in re.split(r' · |, |; ',s):
            if not re.search(r'(^|[^\d\w])[+−-]\s?\d',seg) or len(seg)>70:continue
            if seg in seen:continue
            seen[seg]=1;o,n=kcls_old(seg),kcls_new(seg)
            if o!=n:rows.append((os.path.basename(f),seg,o,n))
            plus=bool(re.search(r'(^|[^\d\w])\+\s?\d',seg))
            if plus and n=='r' and not re.search(r'ghen|oán|thù|nghi|nàng|hắn',seg,re.I):bad.append((os.path.basename(f),seg,n))
md='--md' in sys.argv
print(f'{len(seen)} signed effect strings scanned; {len(rows)} change colour (old -> new); {len(bad)} still "+N red" without a hostile word')
for r in rows:print(('| '+' | '.join(r)+' |') if md else '%-10s %-9s -> %s  %s'%(r[0],r[2],r[3],r[1]))
for b in bad:print('STILL +RED',b)
