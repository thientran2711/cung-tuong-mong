#!/usr/bin/env python3
"""punish-weight scan (review/home-way, owner OD 26/11 ~04:25Z, LUẬT SỬA CẢ NHÓM): every source of cấm túc in dev/build.
(1) every punish(p, why, sev) call: weight today (sev) -> months before (sev 1/none = BAL.tw.g.confM[0] = 2; sev 2 = 2 or one rank)
    and after (BAL.punW: sev 0 nhẹ = khất bổng lite.cut[0], sev 1 vừa = mid.m[0], sev 2 nặng = heavy.m[0] or one rank).
(2) every direct S.confined / v.confined writer (roads, illness, mercy, co-op) with its BAL key.
Fails (exit 1) if a punish() call still passes a typed sev other than 0/1/2 or a BAL key, or if the overstay (jstagehere) is not sev 0.
usage: python3 dev/test/punish-weight-scan.py [--md]  (from the repo root)"""
import re,glob,sys
md='--md' in sys.argv
BEFORE={'0':'cấm túc 2 tháng (was sev 1)','1':'cấm túc 2 tháng','2':'cấm túc 2 tháng, or one rank (1 in 2)'}
AFTER={'0':'NHẸ: khất bổng 1 tháng (nhân từ: cảnh cáo)','1':'VỪA: cấm túc 1 tháng (nóng nảy 2)','2':'NẶNG: cấm túc 2 tháng, or one rank (1 in 2) — unchanged'}
rows=[];bad=[];direct=[]
for f in sorted(glob.glob('dev/build/j*.js')):
    src=open(f,encoding='utf-8').read().split('\n')
    for n,l in enumerate(src,1):
        for m in re.finditer(r'(?<![\w.])punish\(',l):
            if re.search(r'function\s*$',l[:m.start()]) or '/*' in l[max(0,m.start()-40):m.start()] and '*/' not in l[max(0,m.start()-40):m.start()]: continue
            i=m.end();d=0;q=None;cur='';parts=[]
            while i<len(l):
                ch=l[i]
                if q:
                    cur+=ch
                    if ch==q and l[i-1]!='\\': q=None
                elif ch in '"`\'': q=ch;cur+=ch
                elif ch in '([{': d+=1;cur+=ch
                elif ch in ')]}':
                    if d==0: break
                    d-=1;cur+=ch
                elif ch==',' and d==0: parts.append(cur.strip());cur=''
                else: cur+=ch
                i+=1
            parts.append(cur.strip());parts=[re.sub(r'/\*.*?\*/','',x).strip() for x in parts]
            if parts==['p','why','sev'] or parts==['']: continue
            if len(parts)>=3: sev=parts[-1]
            elif len(parts)==2 and parts[0][:1] in '"`': sev=parts[1]
            elif len(parts)==1 and parts[0][:1] in '"`': sev='1(default)'
            else: continue
            why=next((x for x in parts if x[:1] in '"`' or x.startswith('q72Txt')),'?')[:60]
            key=sev if sev in('0','1','2') else ('1' if sev=='1(default)' else 'BAL/expr')
            if key=='BAL/expr' and not re.search(r'BAL|\.sev|Sev|pun|sev|n>=|to===|formal|WD\.|B\.vp|N\.acc',sev) and not (f.endswith('jstagehere.js') and sev=='sv'): bad.append(f'{f}:{n} sev {sev}')  # sv = BAL place-close sev (checked below)
            rows.append((f.split('/')[-1]+':'+str(n),why,sev,BEFORE.get(key,'by '+sev),AFTER.get(key,'by '+sev+' (same tiers)')))
        for m in re.finditer(r'(\w+)\.confined=Math\.max\([^;]*?,([^)]*)\)',l):
            direct.append((f.split('/')[-1]+':'+str(n),m.group(1),m.group(2)))
        if 'CN_CAM(' in l and 'const CN_CAM' not in l:
            for m in re.finditer(r'CN_CAM\(([^,]+),([^)]+)\)',l): direct.append((f.split('/')[-1]+':'+str(n),m.group(1),m.group(2)))
ov=[r for r in rows if r[0].startswith('jstagehere.js') and 'sau giờ đóng cửa' in r[1]]
# sếp OD 26/11 ~05:55Z «3 lỗi nhẹ ok»: these faults are NHẸ (sev 0), her and NPCs
for w in ['làm phiền lúc thánh thượng nổi giận','ăn mặc vượt phẩm','"vượt phẩm"']:
    hit=[r for r in rows if w.strip('"') in r[1] and (w[0]!='"' or r[1]==w)]
    if not hit: bad.append('NHẸ fault not found: '+w)
    for r in hit:
        if r[2] not in ('0','B.vpConf'): bad.append(f'{r[0]} «{w}» is sev {r[2]}, want 0 (NHẸ)')
if not re.search(r'vpConf:0',open('dev/build/jshelf.js',encoding='utf-8').read()): bad.append('jshelf BAL vpConf is not 0 (NHẸ)')
# rules-prefail (law 4): the overstay weight is read from BAL — place-close sev (jbal, owner OD 26/11 ~14:00Z, = 0) into the local sv, with a guard that
# drops any weight that would confine back to 0 («NEVER cấm túc for overstaying»); a typed 0 is no longer required
_js=open('dev/build/jstagehere.js',encoding='utf-8').read();_bal=open('dev/build/jbal.js',encoding='utf-8').read()
_ovBal=bool(re.search(r'let sv=PC\(\)\.sev;try\{if\(typeof punishMonths==="function"&&punishMonths\(sv\)>0\)sv=0\}catch\(e\)\{sv=0\}',_js)) and bool(re.search(r'sev:0\}/\* PLACE-CLOSE',_bal))
if not ov or not (ov[0][2]=='0' or (ov[0][2]=='sv' and _ovBal)): bad.append('overstay (jstagehere stayRoll) is not sev 0 (NHẸ)')
if md:
    print('| source | why | sev | before | after |\n|---|---|---|---|---|')
    for r in rows: print('| '+' | '.join(x.replace('|','/') for x in r)+' |')
    print('\n| direct writer | who | months (BAL) |\n|---|---|---|')
    for r in direct: print('| '+' | '.join(x.replace('|','/') for x in r)+' |')
else:
    from collections import Counter
    c=Counter(r[2] for r in rows);print('punish() calls:',len(rows),dict(c));print('direct cấm túc writers:',len(direct))
print('faults:',bad);sys.exit(1 if bad else 0)
