#!/usr/bin/env python3
"""SIDE-LINE DIALOGUE SCENES validator (schema: dev/handover/reports/sideline-dialogue.md «## SCHEMA»).
usage: python3 dev/test/dlgs_validate.py [files…] [--fam j72,j7] [--cover] [--strict]
  files default = every dev/handover/content/dlg/*.md (+ nothing else). One JSON object per line: {"id":"<fam>:<unit id>","dlg":{L,R,watch,at,lines}}.
  Checks: unit exists in the game data; roles are cast keys of THAT unit (law 6b); 3..8 lines (BAL.dlgs); who ∈ {L, R, nar}; L speaks; her ("me") speaks
  unless watch; placeholders known to the family; VANPHONG (law 7): no digit, no %, no odds-ladder word; ≤ maxCh characters; no duplicate id.
  --cover prints the table «family / units / with scene» (law 11) over ALL units of the game, not only the files given. Exit 1 on any error."""
import json,re,sys,os,glob
R=os.path.dirname(os.path.abspath(__file__))+'/..'
B=open(R+'/build/jbal2.js',encoding='utf8').read()
m=re.search(r'BAL\.dlgs=\{on:\w+,min:(\d+),max:(\d+),maxCh:(\d+)',B);MIN,MAX,MAXCH=map(int,m.groups())
ODDS=['Mong manh','Hiểm','Khó lường','Tùy duyên','Có cơ','Rất vững','Liều','Năm ăn năm thua','Khá chắc','Rất chắc','Nắm chắc','Chắc chắn']
TYPED=['nương nương','tiểu chủ','tỷ tỷ','muội muội','bổn cung','thần thiếp','tần thiếp','chủ tử']   # address words: the speaker's rank decides them → {goi}/{xung} (jvoice), never typed
MODERN=['tôi','anh ấy','chị ấy','em ấy','vâng ạ']   # modern words (VANPHONG cổ trang)
GEN={'goi','Goi','xung','Xung','S','E','M'}   # every family: address words (speaker → listener), season, Hoàng thượng, her cung nữ
def sd(f,const):
    rows=[]
    for l in open(R+'/build/'+f,encoding='utf8'):
        if l.startswith('{'):rows.append(json.JSONDecoder().raw_decode(l)[0])
    return rows
UNITS={}   # "fam:id" -> {"roles":set, "ph":set, "rule":fn|None}
def add(fam,uid,roles,ph=(),rule=None):UNITS[f'{fam}:{uid}']={'roles':set(roles)|{'me'},'ph':set(ph)|GEN,'rule':rule,'fam':fam}
def famL(d):return None if d.get('L')=='M' else 'a family letter scene: L must be "M" (her cung nữ brings the letter)'
# j72: 256 composed seeds + 110 old templates
for s in sd('j72sd.js','J72SEEDS'):
    ro={'A','M'}|({'B'} if s.get('other') else set());add('j72',s['id'],ro,{'A','O'}|({'B'} if s.get('other') else set()),famL if s['kind']=='fam' else None)
src=open(R+'/build/j72.js',encoding='utf8').read();parts=re.split(r'(?=T7\(")',src)
for p in parts:
    mm=re.match(r'T7\("([A-Za-z0-9_]+)","([a-z]+)",\{',p);rr=re.search(r'\br:"([^"]*)"',p[:500])
    if not mm or not rr:continue
    mm=(mm.group(1),mm.group(2),rr.group(1));mm=type('M',(),{'group':lambda self,i,_m=mm:_m[i-1]})()
    hasb=bool(re.search(r'\bb:"',p[:600]));ro={'A','M'}|({'B'} if hasb else set())
    add('j72',mm.group(1),ro,{'A','O'}|({'B'} if hasb else set()),famL if mm.group(3)=='fam' else None)
# other THIN families (adapters land family by family; their units are listed now so the cover table shows the whole job)
for s in sd('j7sd.js','J7SEEDS'):add('j7',s['id'],set(s.get('roles',{}))|{'maid'},set(s.get('roles',{}))|{'maid','tool'})
for s in sd('j68sd.js','J68SEEDS'):
    if s.get('type')=='comp':ro=set((s.get('roles') or {}).keys())|{'A','M'};add('j68',s['id'],ro,ro|{'O','W'})
for s in sd('jkysd.js','KYSEEDS'):add('ky',s['id'],{'W'},{'W'})
for s in sd('j70sd.js','J70SEEDS'):add('j70',s['id'],{'M'},set())
for s in sd('j71sd.js','J71SEEDS'):
    if s.get('type')=='comp':add('j71',s['id'],{'B','M'} if (s.get('roles') or {}).get('B') else {'M'},{'B','O','F'})
for s in sd('jwsd.js','JWSEEDS'):ro=set((s.get('roles') or {}).keys())|{'M'};add('wc',s['id'],ro,ro|{'O','X'})
# WAVE 2 (review/sideline-dlg-2): the OLD composed cards of j7 / j68 / ky / j70 (rows marked 'old' in the cover table)
def rd(f):return open(R+'/build/'+f,encoding='utf8').read()
J=rd('jdlgs.js')
def srcof(k):
    for f in ['j7.js','jrcp.js']:
        x=rd(f);i=x.find('ev("'+k+'"')
        if i>=0:return f'{f}:{x[:i].count(chr(10))+1} ev("{k}")'
    return '?'
t7=re.search(r'const DLGS_J7O=\{(.*?)\};\n',J,re.S).group(1)
for mm in re.finditer(r'(\w+):\{([^{}]*)\}',t7):
    ro=set(re.findall(r'(\w+):\[',mm.group(2)))|{'M'};add('j7',mm.group(1),ro,ro,None);UNITS['j7:'+mm.group(1)]['old']=1;UNITS['j7:'+mm.group(1)]['src']=srcof(mm.group(1))
for f in ['j68e.js','j68f.js','j68g.js','j68q.js']:
    src=rd(f);ms=list(re.finditer(r'EV6\("([^"]+)","([a-z]+)",\{',src))
    for i,mm in enumerate(ms):
        seg=src[mm.start():ms[i+1].start() if i+1<len(ms) else len(src)]
        a=re.search(r'\ba:\[([^\]]*)\]',seg);n=len([x for x in (a.group(1).split(',') if a else []) if x.strip()])
        ro={'M'}|set('ABC'[:n]);ph=set('ABC'[:n])|{'W','P'}|({'it'} if re.search(r'\bitems:\[',seg) else set())
        add('j68',mm.group(1),ro,ph,None);UNITS['j68:'+mm.group(1)]['old']=1;UNITS['j68:'+mm.group(1)]['src']=f'{f}:{src[:mm.start()].count(chr(10))+1} a:[{a.group(1) if a else ""}]'
src=rd('jky.js');d=src[src.index('const DEF={'):];d=d[:d.index('\n};')] if '\n};' in d else d
for k in re.findall(r'^\s*([a-z]+_[a-z]+):\{',d,re.M):add('ky',k,{'W','M'},{'W'});UNITS['ky:'+k]['old']=1;UNITS['ky:'+k]['src']=f'jky.js:{src[:src.index(chr(10)+" "+k+":{")].count(chr(10))+2} DEF.{k} (who:)'
src=rd('j70.js')
for mm in re.finditer(r'(?:^\s*(\w+):\{k:"\w+"|M70\.(\w+)=\{k:"\w+")[^\n]*?R:\[(.*?)\]\}',src,re.S|re.M):
    m70=mm.group(1) or mm.group(2)
    for r in re.findall(r'\{id:"([^"]+)"',mm.group(3)):add('j70',f'{m70}:{r}',{'M'},set());UNITS[f'j70:{m70}:{r}']['old']=1;UNITS[f'j70:{m70}:{r}']['src']=f'j70.js:{src[:src.index(chr(123)+"id:"+chr(34)+r+chr(34),mm.start())].count(chr(10))+1} M70.{m70} route {r}'
LIVE={'j72','j68','j7','ky','j70','j71','wc'}   # families whose adapter plays the scene in the game now

def check(r,where):
    E=[];uid=r.get('id','?');d=r.get('dlg')
    u=UNITS.get(uid)
    if not u:return [f'{where} {uid}: unknown unit (id = "<fam>:<seed or template id>")']
    if not isinstance(d,dict):return [f'{where} {uid}: dlg missing']
    L,Rr,w=d.get('L'),d.get('R','me'),bool(d.get('watch'))
    if L not in u['roles']:E.append(f'{uid}: L "{L}" is not a cast role of this unit {sorted(u["roles"])}')
    if Rr not in u['roles']:E.append(f'{uid}: R "{Rr}" is not a cast role {sorted(u["roles"])}')
    if L==Rr:E.append(f'{uid}: L == R')
    if w and Rr=='me':E.append(f'{uid}: watch needs R = another NPC')
    if not w and Rr!='me':E.append(f'{uid}: R must be "me" unless watch')
    if u['rule']:
        x=u['rule'](d)
        if x:E.append(f'{uid}: {x}')
    ln=d.get('lines') or []
    if not (MIN<=len(ln)<=MAX):E.append(f'{uid}: {len(ln)} lines (need {MIN}..{MAX})')
    who=[x.get('who') for x in ln]
    for i,x in enumerate(ln):
        t=x.get('text','');wh=x.get('who')
        if wh not in (L,Rr,'nar'):E.append(f'{uid} line {i+1}: who "{wh}" must be L, R or nar')
        if not t.strip():E.append(f'{uid} line {i+1}: empty');continue
        if len(t)>MAXCH:E.append(f'{uid} line {i+1}: {len(t)} chars > {MAXCH}')
        if re.search(r'\d|%',t):E.append(f'{uid} line {i+1}: digit or % (law 7)')
        for o in ODDS:
            if re.search(r'(?<!\w)'+re.escape(o)+r'(?!\w)',t):E.append(f'{uid} line {i+1}: odds word «{o}» (law 7)')
        for p in re.findall(r'\{([^}]*)\}',t):
            if p not in u['ph']:E.append(f'{uid} line {i+1}: placeholder {{{p}}} unknown here {sorted(u["ph"])}')
        lo=t.lower()
        for w2 in TYPED:
            if re.search(r'(?<!\w)'+re.escape(w2)+r'(?!\w)',lo):E.append(f'{uid} line {i+1}: typed address «{w2}» — use {{goi}}/{{xung}} (the address core picks it by rank)')
        for w2 in MODERN:
            if re.search(r'(?<!\w)'+re.escape(w2)+r'(?!\w)',lo):E.append(f'{uid} line {i+1}: modern word «{w2}» (VANPHONG)')
        if re.match(r'(Được|Vâng|Ừ|Ừm)\s*[.!]',t):E.append(f'FLAT {uid} line {i+1}: stock reply «{t.split()[0]}» — say the thing itself (quality bar, lead #2)')
        if wh=='me' and L!='M' and re.search(r'(?<!\w)ngài(?!\s+ấy)(?!\w)',lo):E.append(f'FLAT {uid} line {i+1}: «ngài» to the person she speaks to — use {{goi}}')
        if x.get('focus') and wh=='nar':E.append(f'{uid} line {i+1}: focus on narration')
        if set(x)-{'who','text','focus'}:E.append(f'{uid} line {i+1}: unknown keys {sorted(set(x)-{"who","text","focus"})}')
    if L not in who:E.append(f'{uid}: L never speaks')
    if not w and 'me' not in who:E.append(f'{uid}: she never speaks')
    if w and 'me' in who:E.append(f'{uid}: watch scene: she does not speak')
    if set(d)-{'L','R','watch','at','lines'}:E.append(f'{uid}: unknown keys {sorted(set(d)-{"L","R","watch","at","lines"})}')
    return E

def main(a):
    if '--units' in a:   # W10 slice list: every OLD unit of a family with its cast roles, placeholders and source line
        fam=a[a.index('--units')+1]
        for k,v in UNITS.items():
            if v['fam']==fam and v.get('old'):print(f"{k}\troles {sorted(v['roles'])}\tph {sorted(v['ph']-GEN)}\t{v.get('src','')}")
        return 0
    fams=None;cover='--cover' in a
    if '--fam' in a:fams=set(a[a.index('--fam')+1].split(','));a=a[:a.index('--fam')]+a[a.index('--fam')+2:]
    files=[x for x in a if not x.startswith('--')] or sorted(glob.glob(R+'/handover/content/dlg/*.md'))
    err=[];seen={};n=0
    for f in files:
        for i,l in enumerate(open(f,encoding='utf8')):
            if not l.lstrip().startswith('{'):continue
            try:r=json.loads(l)
            except Exception as e:err.append(f'{os.path.basename(f)}:{i+1}: bad JSON {e}');continue
            uid=r.get('id','?')
            if fams and uid.split(':')[0] not in fams:continue
            if uid in seen:err.append(f'{os.path.basename(f)}:{i+1}: duplicate id {uid} (first in {seen[uid]})')
            seen[uid]=f'{os.path.basename(f)}:{i+1}';n+=1;err+=check(r,f'{os.path.basename(f)}:{i+1}')
    strict='--strict' in a;flat=[e for e in err if e.startswith('FLAT ')]
    if not strict:err=[e for e in err if not e.startswith('FLAT ')]
    for e in err:print('ERR',e)
    if not strict:
        for e in flat:print('WARN',e)
    print(f'{n} scenes, {len(err)} errors, {len(flat)} flat-line warnings (--strict makes them errors; writers run --strict)')
    if cover:
        allf=set(seen)
        for f in sorted(glob.glob(R+'/handover/content/dlg/*.md')):
            for l in open(f,encoding='utf8'):
                if l.lstrip().startswith('{'):
                    try:allf.add(json.loads(l)['id'])
                    except Exception:pass
        print('| family | units | with scene | % | plays in game |\n|---|---|---|---|---|')
        T=[0,0]
        for fam in ['j72','j7','j68','ky','j70','j71','wc']:
            for old in (0,1):
                U=[k for k,v in UNITS.items() if v['fam']==fam and bool(v.get('old'))==bool(old)]
                if not U:continue
                w=len([k for k in U if k in allf]);T[0]+=len(U);T[1]+=w
                print(f'| {fam}{" old (wave 2)" if old else ""} | {len(U)} | {w} | {100*w//max(1,len(U))} | {"yes" if fam in LIVE else "adapter pending"} |')
        print(f'| ALL | {T[0]} | {T[1]} | {100*T[1]//max(1,T[0])} | |')
    return 1 if err else 0
if __name__=='__main__':sys.exit(main(sys.argv[1:]))
