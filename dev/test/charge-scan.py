#!/usr/bin/env python3
"""review/charge-evidence (D4) whole-family scan. usage: python3 dev/test/charge-scan.py [git-ref]  (no ref = working tree)
Families: total_gate = an accusation/use gate on the TOTAL evidence (evG >= a BAL bar or a number >= 2) · total_need = a 'cần N chứng cứ'
text built from the total bar · search_noroll = a search road that adds evidence with no find roll (no chSearch) · miss_lie = a search
result that says «không ... sai trái» with no miss branch (she did wrong but the search missed) · deed_literal_w (charge-followups d) = a deed weight typed at the call or in a DEEDW table, not BAL.charge.actW / w · deed_unmapped (rv) = a deed key some road writes
(deedAdd / deedOnce / cyDeed / mlCaught «ml»+k / DEEDW / DEEDX) with no BAL.charge.deed entry (it would fall to the Ức hiếp default)."""
import re,subprocess,sys,glob
A=[x for x in sys.argv[1:] if x!='-v'];ref=A[0] if A else None
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
# deed keys written anywhere vs the BAL.charge.deed map (rv)
ALLJ='\n'.join(v for k,v in F.items())
K=set(re.findall(r'deedAdd\([^,()]+,"(\w+)"(?!\+)',ALLJ))|set(re.findall(r'deedOnce\([^,()]+,[^,]+?,"(\w+)"',ALLJ))|set(re.findall(r'cyDeed\([^,()]+,[^,]+?,"(\w+)"',ALLJ))|{'ml'+k for k in re.findall(r'mlCaught\([^,()]+,[^,()]+,"(\w+)"',ALLJ)}
for nm in ('DEEDW','DEEDX','actW','w'):
    m=re.search((r'\bactW:\{(.*?)\}' if nm=='actW' else r'\bw:\{(tryst.*?)\}' if nm=='w' else nm+r'=\{(.*?)\};'),ALLJ,re.S)
    if m: K|=set(re.findall(r'(\w+):',m.group(1)))
m=re.search(r'BAL\.charge=\{.*?deed:\{(.*?)\}',ALLJ,re.S);MAP=set(re.findall(r'(\w+):"',m.group(1))) if m else set()
R['deed_unmapped']=sorted(K-MAP) if m else []
# (d) LAW 4: a deed weight typed at a deedAdd / deedOnce / mlCaught call or a typed DEEDW table (must come from BAL.charge.actW / w via deedW)
R['deed_literal_w']=[]
for f,src in F.items():
    for mm in re.finditer(r'(?:deedAdd\([^,()]+,[^,]+?,[^,]+?,|deedOnce\([^,()]+,[^,]+?,[^,]+?,|mlCaught\([^,()]+,[^,]+?,[^,]+?,)(\d+)\s*,|const DEEDW=\{',src):
        R['deed_literal_w'].append(f'{f.split("/")[-1]}:{src.count(chr(10),0,mm.start())+1}')
# (charge-trinh-punish O2 family) proof_generic = a punish / demote / fall of the ACCUSED on a line that uses evidence (evG / evA / chOK /
# «chứng cứ») without going through chPunish (the proven charge's punishment). Every other site is listed with the reason it is not a proven charge.
PG_OK={'bị đồng đảng tố giác':'faction sell-out roll, no pieces','vu oan':'false-accusation / failed road (the accuser is punished)','vu khống':'false accusation','vu cáo':'false accusation','tố hụt':'failed accusation',
 'giá họa':'false accusation','lật tẩy':'false accusation','tư thông bị phát giác':'Bóc chuyện tư tình: the tư thông charge\'s own table-A road (chOK "tt")','bị cung nữ tố giác, chứng cứ rành rành':'servant life: the maid\'s known secrets (SRVA.accuse.sec), not charge pieces',
 'bị bắt quả tang':'caught in the act (j70 trap)','bị Hoàng hậu xét tội theo chứng cứ':'routed: jcharge punish wrapper (p.chTr) → chPunish (runtime test charge-trinh-punish.js); j78 f is replaced by jaudit T.f',
 'bị tố giác, chứng cứ rành rành':'j8 Tố giác fallback, only when no charge is ready (jcharge A.f)','bị Hoàng hậu xử tội':'j8 judge fallback (callers gate chOK; jcharge judge wrapper)','bị cung nữ tố giác mưu kế':'a bought maid leaks schemes (no pieces)',
 'lấy trộm đồ':'lost-item hearing, its own bar (loEmpEv)','dâng đồ làm':'a gift made someone ill, not an accusation'}
R['proof_generic']=[];PGL=[]
for f,src in F.items():
    if f.endswith('jcharge.js'): continue
    for i,l in enumerate(src.split('\n'),1):
        if not (re.search(r'\b(punish|demote|fall)\(',l) and re.search(r'evG\(|evA\(|chứng cứ|chOK\(|chReady\(',l)): continue
        for m in re.finditer(r'\b(punish|demote|fall)\(([^,()]+),\s*([`"][^`"]*[`"])',l):
            w=m.group(3);site=f'{f.split("/")[-1]}:{i}'
            if 'chPunish(' in l[:m.start()]: PGL.append((site,w,'routed (chPunish on the same road)'));continue
            why=next((v for k,v in PG_OK.items() if k in w),None)
            if why: PGL.append((site,w,why))
            else: R['proof_generic'].append(site);PGL.append((site,w,'GENERIC'))
if '-v' in sys.argv:
    for x in PGL: print(' | '.join(x))
print('family | count | sites');
for k,v in R.items(): print(f'{k} | {len(v)} | {" ".join(v[:14])}')
