#!/usr/bin/env python3
"""review/charge-evidence (D4) whole-family scan. usage: python3 dev/test/charge-scan.py [git-ref]  (no ref = working tree)
Families: total_gate = an accusation/use gate on the TOTAL evidence (evG >= a BAL bar or a number >= 2) · total_need = a 'cần N chứng cứ'
text built from the total bar · search_noroll = a search road that adds evidence with no find roll (no chSearch) · miss_lie = a search
result that says «không ... sai trái» with no miss branch (she did wrong but the search missed)."""
import re,subprocess,sys,glob
ref=sys.argv[1] if len(sys.argv)>1 else None
def files():
    if ref:
        L=subprocess.run(['git','ls-tree','--name-only',ref,'dev/build/'],capture_output=True,text=True).stdout.split()
        return {f:subprocess.run(['git','show',f'{ref}:{f}'],capture_output=True,text=True).stdout for f in L if re.search(r'/j[^/]*\.js$',f)}
    return {f:open(f,encoding='utf-8').read() for f in glob.glob('dev/build/j*.js')}
F=files()
P={'total_gate':re.compile(r'evG\([^()]*\)\s*(?:>=|<)\s*(?:BAL\.(?:accNeedEv|evFirm|ag\.ev\.judge|m30\.\w+|ngh\.needEv)|P\.accEv|[2-9]\b)'),
   'total_need':re.compile(r'cần \$\{(?:BAL\.(?:ag\.ev\.judge|m30\.\w+|accNeedEv\[\d\])|need|n)\} chứng cứ'),
   'miss_lie':re.compile(r'(?:không (?:tìm ra|thấy) điều gì sai trái|chẳng thấy điều gì sai trái|Không có gì sai trái để làm chứng cứ)')}
# search roads: (file, a marker that identifies the road)
SR=[('jtruth.js','function spyFind'),('j78.js','function j78maidSpy'),('j78.js','Hỏi chuyện cũ",o'),('jptime.js','deed=oo=>{if(roll(oo))'),('jagacts3.js','agRunReg("cx2:maidSpy"'),
    ('jwhy.js','SOC.spy.run='),('j2.js','Lục rương tìm chứng cứ'),('j2.js','{n:"Hỏi chuyện cũ",o:od(cx2O(S,"old"))'),('j2.js','{n:"Sai đi dò la",o:od(cx2O(S,"maidSpy"))'),
    ('j70.js','else if(roll(BAL.def70.ev)){'),('j70.js','else if(roll(BAL.def70.ev))'),('jagknow.js','if(k==="scout"&&t)'),('jagknow.js','go:()=>{KN.stat.scout++'),('jagstaff.js','spy(s,m,o,ok)'),('j10.js','Tai mắt ${s.name} trong cung ${p.name} báo'),('jecon.js','if(mc==="take")')]
# checked by hand, not a total bar / not a lie (reason after each):
ALLOW={'jtruth.js':['miss_lie'],# header comment + the clean-target fallback after the chMissed branch
 'j70.js':['miss_lie'],# parses spyFind's clean-target text
 'jwhy.js':['miss_lie'],# dead fallback when j78maidSpy is absent
 'j78.js':['total_need'],# nf(): only the «≥1 piece of any charge» acts (Uy hiếp / Bán / Tiêu hủy / Trình Thái hậu)
 'jlost.js':['total_need']}# lost-item hearing: its own bar, read from the ức hiếp / trộm pieces (loEmpEv)
R={k:[] for k in list(P)+['search_noroll']}
for f,s in F.items():
    for k,rx in P.items():
        for m in rx.finditer(s):
            line=s.count('\n',0,m.start())+1;ctx=s[max(0,m.start()-160):m.end()+40]
            if k=='miss_lie' and 'chMissed' in ctx: continue
            if ref is None and k in ALLOW.get(f.split('/')[-1],[]): continue
            if k=='total_gate' and f.endswith('jcharge.js'): continue
            R[k].append(f'{f.split("/")[-1]}:{line}')
for fn,mk in SR:
    s=next((v for k,v in F.items() if k.endswith('/'+fn)),'')
    i=s.find(mk)
    if i<0: continue
    seg=s[max(0,i-300):i+1600]
    if 'chSearch' not in seg: R['search_noroll'].append(f'{fn}:{s.count(chr(10),0,i)+1}')
# deed_unmapped (D4 #3, dup-report §4.1): every deed kind the game can write (DEEDW / DEEDX keys, deedAdd / deedOnce literal kinds,
# maid-line "ml"+kind) must sit in BAL.charge.deed — otherwise its pieces fall back to a default charge instead of their own kind
import re as _re
_all='\n'.join(F.values());_bal=next((v for k,v in F.items() if k.endswith('/jbal2.js')),'')
_m=_re.search(r'deed:\{(.*?)\}',_bal[_bal.find('BAL.charge='):],_re.S);_map=set(_re.findall(r'([a-z]+):"',_m.group(1))) if _m else set()
_kinds=set()
for nm in ('DEEDW','DEEDX'):
    mm=_re.search(nm+r'=\{(.*?)\};',_all,_re.S)
    if mm: _kinds|=set(_re.findall(r'(?:^|[,{\s])([a-z]+):',mm.group(1)))
_kinds|=set(_re.findall(r'deedAdd\([^,]+,"([a-z]+)"',_all))|set(_re.findall(r'deedOnce\([^,]+,[^,]+,"([a-z]+)"',_all))
_kinds|={'ml'+k for k in _re.findall(r'mlCaught\([a-z]+,[a-z]+,"([a-z]+)"',_all)}
R['deed_unmapped']=sorted(k for k in _kinds-{'ml'} if k not in _map) if _map else ['BAL.charge.deed not found']
print('family | count | sites');
for k,v in R.items(): print(f'{k} | {len(v)} | {" ".join(v[:14])}')
