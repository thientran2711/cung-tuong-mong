#!/usr/bin/env python3
"""act-audit-sum.py <run.jsonl> [--md out.md] — judge every button run of dev/test/act-audit.js.
Verdicts per button (grouped by surface kind + act name): ĐÚNG / SAI / HIỆU ỨNG ẨN, with the reasons:
 (a) a number on the card (Tốn/Được/Mất) that did not change, changed the other way or by another size;
 (b) a real change no row of the card mentions (hidden effect);
 (c) the result card says "không đổi gì" while something changed, or shows a number that is not the real change;
 (d) a disabled button without a named reason; (e) page errors."""
import json,re,sys,collections
src=sys.argv[1];md=sys.argv[sys.argv.index('--md')+1] if '--md' in sys.argv else None
R=[json.loads(l) for l in open(src,encoding='utf-8') if l.strip()]
perr=[x for x in R if 'pageErrors' in x];R=[x for x in R if 'pageErrors' not in x]
IGN={'used','logs','S.turn','S.buoi'}
STAT={'Sủng':'S.sung','Danh':'S.danh','Sức':'S.suc','Bạc':'S.bac','Đức':'S.duc','Sắc':'S.sac','Tài':'S.tai','Tâm cơ':'S.tamco','Tai mắt':'S.mat','Ân tình':'S.an','Chủ tin':'S.tin'}
NUM=r'([+\-−–])\s?(\d+)(?:\s?(?:–|-|\.\.|đến [+\-−]?)\s?(\d+))?'
def tokens(texts):
    """(family, sign, lo, hi, who) from card rows"""
    out=[]
    for t in texts:
        for m in re.finditer(r'([^·,;:()]{0,40}?)'+NUM,t):
            pre=m.group(1).strip();sg=-1 if m.group(2) in '-−–' else 1;lo=int(m.group(3));hi=int(m.group(4) or lo)
            low=pre.lower();fam=None;who='me'
            if re.search(r'\bnàng\b|\bcon\b|hoàng tử|công chúa',low) and not re.search(r'với ngươi|quý ngươi',low):who='other'
            if 'chứng cứ' in low:fam='ev';who='other'
            elif 'ghen' in low:fam='ghen';who='other'
            elif 'oán' in low or 'thù' in low:fam='oan';who='other'
            elif 'thái hậu' in low:fam='S.th'
            elif 'hoàng hậu' in low:fam='hh'
            elif re.search(r'thiện cảm|quý ngươi|quý ta|quý nàng|\bthân\b|ghét',low):fam='aff';who='other'
            elif re.search(r'\blòng\b',low):fam='loyal'
            elif 'sức khỏe' in low:fam='kid.hp'
            elif re.search(r'thương',low) and 'hoàng thượng' in low:fam='kid.fond'
            else:
                for k,v in STAT.items():
                    if re.search(r'(^|\s)'+k+r'$',pre) or pre.endswith(k):fam=v;break
                if fam=='S.tai' and who=='other':fam='kid.tal'
                if fam in('S.sung','S.danh','S.suc') and who=='other':fam='rv.'+fam[2:]
            if fam:out.append((fam,sg,lo,hi,who,t.strip()[:60]))
    return out
def fam_of(k):
    if k.startswith('rv.'):
        f=k.rsplit('.',1)[1];return {'aff':'aff','myaff':'myaff','oan':'oan','ghen':'ghen','ev':'ev','sung':'rv.sung','danh':'rv.danh','suc':'rv.suc'}.get(f,'rv.'+f)
    if k.startswith('kid.'):return 'kid.'+k.rsplit('.',1)[1]
    if k.startswith('staff.'):return 'loyal'
    if k=='maid.loyal':return 'loyal'
    if k=='S.hh':return 'hh'
    return k
MENT={'S.inv':r'món|đồ|rương|quà|mua|nhận|bán|cầm|dâng|tặng|vật|thuốc|ban','S.lot':r'quẻ','emp.mood':r'tâm trạng|vui|giận|phật ý|nguôi','S.rank':r'phẩm|thăng|giáng|tấn phong|sắc phong',
 'S.confined':r'cấm túc','S.dead':r'chết','S.preg':r'thai','rv.alive':r'chết','rv.out':r'lãnh cung','rv.rank':r'phẩm|giáng|thăng','myaff':r'ngươi quý|ngươi ghét|ngươi với',
 'S.out':r'lãnh cung','kid.alive':r'chết|mất'}
def judge(x):
    c=x.get('card') or {};issues=[];kind=None
    if x['run']=='dis':
        why=' '.join((c.get('why') or []))+' '+(c.get('kneed') or '')
        if not why.strip():issues.append(('d','nút khóa không ghi lý do'))
        elif 'điều kiện riêng của việc này chưa có' in why:issues.append(('d','nút khóa: "điều kiện riêng của việc này chưa có" (không nêu lý do thật)'))
        return issues
    if x.get('err'):return [('x',x['err'])]
    d={k:v for k,v in (x.get('d') or {}).items() if k not in IGN}
    rows={k:(c.get(k) or []) for k in ('ton','duoc','mat','kem','note','why')}
    text=(c.get('text') or '')
    toks_ton=tokens(rows['ton']);toks_g=tokens(rows['duoc']);toks_m=tokens(rows['mat']);toks_k=tokens(rows['kem']+rows['note'])
    win=x['run']=='win';sure=not c.get('odds')
    res=x.get('res') or {};toast=(res.get('toast') or '')+' '+(res.get('popMsg') or '')
    # with every roll forced true a side risk can fire and replace the success: then judge it as a loss
    sideFired=win and re.search(r'BẤT LỢI|^HỎNG',(res.get('toast') or '').strip()) and not sure
    expect=toks_ton+(toks_g if ((win and not sideFired) or sure) else toks_m if not win else [])
    fams=collections.defaultdict(list)
    for k,(a,b) in d.items():
        if isinstance(a,(int,float)) and isinstance(b,(int,float)):fams[fam_of(k)].append((k,b-a))
        else:fams[fam_of(k)].append((k,None))
    died='S.dead' in d
    if res.get('modal') and not d:expect=[]
    for fam,sg,lo,hi,who,t in expect:
        if died:break
        ch=[(k,dv) for k,dv in fams.get(fam,[]) if dv]
        if fam=='hh' and not ch:ch=[(k,dv) for k,dv in fams.get('aff',[]) if dv and '.HH ' in k]
        if not ch:issues.append(('a',f'thẻ ghi «{t}» mà {"không" if True else ""} đổi gì ({ "thành" if win else "hỏng"})'));continue
        ok=[dv for k,dv in ch if dv*sg>0]
        if not ok:issues.append(('a',f'thẻ ghi «{t}» mà đổi ngược chiều: '+', '.join(f'{k} {dv:+}' for k,dv in ch)));continue
        if not any(lo<=abs(dv)<=hi for dv in ok):
            issues.append(('a',f'thẻ ghi «{t}» mà đổi {", ".join(f"{k} {dv:+}" for k,dv in ch)}'))
    hhS=[dv for k,dv in fams.get('hh',[]) if dv];hhA=[dv for k,dv in fams.get('aff',[]) if dv and '.HH ' in k]
    if hhS and not hhA:issues.append(('a',f'S.hh (Hoàng hậu với ngươi) {hhS[0]:+} mà Hoàng hauser quý ngươi (thẻ nàng) không đổi'.replace('hauser','hậu')))
    said=set(f for f,*_ in toks_ton+toks_g+toks_m+toks_k)
    low=text.lower()
    for fam,L in fams.items():
        if fam in said or (fam=='aff' and 'hh' in said) or (fam=='hh' and 'aff' in said):continue
        if fam=='hh' and (x.get('sf','').startswith('rv:HH') or 'Hoàng hậu' in (c.get('name') or '') or 'oan' in said or 'ghen' in said):continue  # S.hh mirrors the queen's own feeling
        if fam=='myaff' and ('aff' in said or 'oan' in said or 'hh' in said):continue
        if fam=='loyal' and re.search(r'lòng',low):continue
        if fam=='loyal' and all(dv is None for k,dv in L) and re.search(r'bị bắt|khai',toast.lower()):
            issues.append(('b','ẩn: kẻ hầu được sai bị bắt và mất khỏi cung ngươi ('+', '.join(sorted({k.split('.')[1] for k,dv in L}))+') — thẻ không ghi'));continue
        if fam=='loyal' and all(dv is not None and 0<dv<=8 for k,dv in L) and all(k.endswith('.tin') for k,dv in L):
            issues.append(('b','ẩn nhỏ: kẻ hầu được sai đi xong việc, Chủ tin +'+str(L[0][1])));continue
        if fam in MENT and re.search(MENT[fam],low):continue
        if fam in('rv.sung','rv.danh') and re.search(r'mất sủng|sủng|danh',low):continue
        if fam in('S.sung','S.danh','S.suc','S.bac','S.duc','S.tamco','S.mat','S.tai','S.sac','S.an','S.th','S.tin') and False:continue
        if fam=='S.suc' and re.search(r'khắc',low) and all(abs(dv or 0)<=5 for k,dv in L):continue
        if died:continue
        issues.append(('b','ẩn: '+', '.join(f'{k} {dv:+}' if dv is not None else k for k,dv in L)))
    real={k:v for k,v in d.items() if k not in('S.lot',)}
    if real and re.search(r'không đổi gì|không đổi chỉ số',toast):issues.append(('c','thẻ kết quả: "không đổi gì" mà có đổi: '+', '.join(k for k in list(real)[:4])))
    for m in re.finditer(r'(Sủng|Danh|Sức|Bạc|Đức|Sắc|Tài|Tâm cơ|Tai mắt|Ân tình) (-?\d+)\s*→\s*(-?\d+)',toast):
        k=STAT[m.group(1)];a,b=int(m.group(2)),int(m.group(3))
        if k in d and tuple(d[k])!=(a,b):issues.append(('c',f'thẻ kết quả ghi {m.group(0)} mà thật {d[k][0]} → {d[k][1]}'))
        if k not in d and a!=b:issues.append(('c',f'thẻ kết quả ghi {m.group(0)} mà {k} không đổi'))
    for e in x.get('errs') or []:issues.append(('e','lỗi trang: '+e))
    return issues
NOTACT=re.compile(r'^(Thôi|Lui|Để sau)|› Thôi|Phe phái hậu cung$|Triều đình$')
G=collections.OrderedDict()
for x in R:
    sk=re.sub(r'#\d+$','',x.get('sf','')).split(':')[0]
    who=x.get('who') or ''
    nm=(x.get('card') or {}).get('name') or '?'
    if x.get('k') is not None:nm=f"{x.get('parent') or (x.get('card') or {}).get('name')} › {nm}"
    surf={'act':'Hành sự','rv':'Hậu cung · thẻ phi tần','staff':'Cung nhân','kid':'Hoàng tử','inv':'Tư trang','art':'Tài nghệ','story':'Mệnh truyện','rel':'Giao tình','fac':'Phe phái','home':'Tẩm cung','place':'Dư đồ'}.get(sk,sk)
    if sk in('place','home') and who:surf+=f' · {re.sub(r"[^ ]+ [^ ]+$","",who) if False else who.split(" ")[0] if x.get("sf","").startswith("rv") else who}'
    if NOTACT.search(nm.strip()):continue
    key=(surf,re.sub(r'\d+','N',nm) if sk=='rv' else nm)
    g=G.setdefault(key,{'runs':0,'sc':set(),'iss':collections.OrderedDict(),'odds':set(),'dis':0})
    g['runs']+=1;g['sc'].add(x['sc']);g.setdefault('eff',0);g.setdefault('info',0);g.setdefault('ran',0)
    if x['run'] in('win','lose') and not x.get('err'):
        g['ran']+=1;dd={k:v for k,v in (x.get('d') or {}).items() if k not in IGN|{'S.suc'}};res=x.get('res') or {}
        if dd or (res.get('modal')):g['eff']+=1
        elif 'logs' in (x.get('d') or {}) or (res.get('popMsg') or '').strip():g['info']+=1
    if x['run']=='dis':g['dis']+=1
    if (x.get('card') or {}).get('odds'):g['odds'].add(x['card']['odds'])
    for t,m in judge(x):g['iss'].setdefault((t,m),set()).add(x['sc']+':'+x['run'])
def verdict(g):
    ts={t for t,m in g['iss']}
    if g.get('ran') and not g.get('eff'):return 'TRỐNG?' if g.get('info') else 'TRỐNG'
    if ts&{'a','c','d','e','x'}:return 'SAI'
    if 'b' in ts:return 'HIỆU ỨNG ẨN'
    return 'ĐÚNG'
cnt=collections.Counter(verdict(g) for g in G.values())
print(f"buttons {len(G)}  runs {len(R)}  "+'  '.join(f'{k} {v}' for k,v in cnt.items())+f"  pageErrors {sum(len(p['pageErrors']) for p in perr)}")
lines=[]
for (s,n),g in G.items():
    v=verdict(g)
    why=' | '.join(f"{m} [{','.join(sorted(w)[:3])}]" for (t,m),w in list(g['iss'].items())[:4])
    lines.append(f"| {s} | {n} | {v} | {why} |")
    if v!='ĐÚNG':print(v,'·',s,'·',n,'·',why[:300])
if md:
    open(md,'w',encoding='utf-8').write('\n'.join(['| Chỗ | Nút | Kết luận | Vì sao (trạng thái:lần) |','|---|---|---|---|']+lines)+'\n')
