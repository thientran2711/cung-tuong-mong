#!/usr/bin/env python3
"""palace-voice scan (LUẬT SỬA CẢ NHÓM): every quoted speech line (“…” / ‘…’) in the assembled modules that types an address or
self word by hand instead of the jvoice tokens {goi}/{xung} (VANPHONG §2, one core kAddr).
usage: python3 dev/test/voice-scan.py [--list] [--git REV]   (REV: scan that commit, e.g. origin/main, for the before table)"""
import re,sys,subprocess,collections,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
rev=sys.argv[sys.argv.index('--git')+1] if '--git' in sys.argv else None
def rd(f):
    if rev: return subprocess.run(['git','show',f'{rev}:dev/build/{f}'],capture_output=True,text=True,cwd=D).stdout
    return open(os.path.join(D,f),encoding='utf8').read()
files=sorted(set(re.findall(r'["\'](j[\w]*\.js)["\']',rd('assemble.py'))))
W=["tiểu chủ","nương nương","chủ tử","bổn cung","thần thiếp","tần thiếp","nô tỳ","nô tài","ai gia","trẫm","ái phi","vi thần","muội muội","tỷ tỷ","ngươi"]
RX=re.compile(r'(?<![\wÀ-ỹ])('+'|'.join(map(re.escape,W))+r')(?![\wÀ-ỹ])',re.I)
Q=re.compile(r'“[^”\n]{2,600}”|‘[^’\n]{2,400}’')
per=collections.Counter();word=collections.Counter();lines=[];tok=0
for f in files:
    s=rd(f)
    for m in Q.finditer(s):
        q=m.group(0)
        if '{goi}' in q.lower() or '{xung}' in q.lower(): tok+=1
        hits=[h.lower() for h in RX.findall(q)]
        if not hits: continue
        per[f]+=1
        for h in hits: word[h]+=1
        lines.append((f,s.count('\n',0,m.start())+1,q[:140]))
print(f"rev={rev or 'worktree'} quoted lines with a hand-typed address/self word: {sum(per.values())}; lines on jvoice tokens: {tok}")
VAR={"tiểu chủ","nương nương","chủ tử","ái phi","muội muội","tỷ tỷ","tần thiếp","ngươi"}
print("by word:",dict(word.most_common()))
print("  listener-dependent words (must come from kAddr unless the line is a fixed situation):",{k:v for k,v in word.items() if k in VAR})
print("  fixed self words of a fixed speaker (trẫm, ai gia, nô tỳ, Hoàng hậu's bổn cung…):",{k:v for k,v in word.items() if k not in VAR})
print("by file:",dict(per.most_common()))
# private address helpers: code that picks "tiểu chủ" / "nương nương" by rank itself instead of asking kAddr
PRIV=re.compile(r'rank\s*[<>]=?\s*\d\s*\?\s*"[^"]*(?:[Nn]ương nương|[Tt]iểu chủ)|"(?:[Nn]ương nương|[Tt]iểu chủ)"\s*:\s*"(?:[Nn]ương nương|[Tt]iểu chủ)')
priv=[(f,i+1) for f in files if f not in ('jvoice.js',) for i,l in enumerate(rd(f).split('\n')) if PRIV.search(l)]
print("private rank→address helpers outside jvoice:",len(priv),priv)
if '--list' in sys.argv:
    for l in lines: print(*l,sep=' | ')
