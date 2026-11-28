#!/usr/bin/env python3
# review/oan-pace-2 (RV-163B F2, law 4 + law 11): every player-visible number of an oán RISE or a liking (thiện cảm / «quý») FALL must print
# what really lands = stat-pace spSee (jstatpace; balOan asks spSee). Lists every template ${…} printed right after such a word in dev/build/j*.js.
# OK = goes through spSee / balOan · STATE = not a rise (a name, a current level such as «Oán 34», a ready-made signed string, a motive readout) ·
# BAD = prints a raw BAL number or a rise variable · usage: python3 dev/measure/oan-shown-scan.py [--bad]
import re,glob,sys,os
R=next((a for a in sys.argv[1:] if not a.startswith('--')),os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build'))  # optional: another build dir
OAN=re.compile(r'oán(?: ngươi| ta| nàng| với ngươi)?\s*\+?\$\{')
LIK=re.compile(r'(?:quý (?:ngươi|ta|nàng)|thiện cảm(?: với ngươi)?)\s*\$\{')
SKIP={'all.js','jbal.js','jbal2.js','jbalsp.js','jstatpace.js'}
def expr(s,i):
    d=1;j=i
    while j<len(s) and d:
        if s[j]=='{':d+=1
        elif s[j]=='}':d-=1
        j+=1
    return s[i:j-1]
rows=[]
for f in sorted(glob.glob(R+'/j*.js')):
    b=os.path.basename(f)
    if b in SKIP:continue
    s=open(f,encoding='utf-8').read()
    for kind,rx in (('oán+',OAN),('quý−',LIK)):
        for m in rx.finditer(s):
            e=expr(s,m.end());ln=s.count('\n',0,m.start())+1
            if re.fullmatch(r'\s*(n|d|x|v)\s*',e) and kind=='quý−':pass
            ok='spSee' in e or 'balOan(' in e
            st=(not ok) and re.search(r'name|nm\(|nm70|kaNT|wkeSign|\bsg\(|kc3Low|["\'?]|^\s*(o|oa|to|fn|-h)\s*$|\boan\(',e) is not None
            if kind=='quý−' and not ok:
                # only a FALL counts: a negated term / a BAL value printed with a sign helper; a plain positive gain is not this family
                fall=re.search(r'balSg\(\s*-|balSg\(\s*BAL|sgOf|evSg\(\s*-|\(-|^\s*-',e) is not None
                if not fall:continue
            rows.append((b,ln,kind,'OK' if ok else 'STATE' if st else 'BAD',e[:90]))
bad=[r for r in rows if r[3]=='BAD']
if '--bad' not in sys.argv:
    for r in rows:print('| %s:%d | %s | %s | `%s` |'%r)
else:
    for r in bad:print('| %s:%d | %s | %s | `%s` |'%r)
print(f'TOTAL OK {sum(r[3]=="OK" for r in rows)} STATE {sum(r[3]=="STATE" for r in rows)} BAD {len(bad)}')
sys.exit(1 if bad else 0)
