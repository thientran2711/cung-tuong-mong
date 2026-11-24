#!/usr/bin/env python3
"""SIDE-LINE DIALOGUE SCENES validator (schema: dev/handover/reports/sideline-dialogue.md «## SCHEMA»).
usage: python3 dev/test/dlgs_validate.py [files…] [--fam j72,j7] [--cover]
  files default = every dev/handover/content/dlg/*.md (+ nothing else). One JSON object per line: {"id":"<fam>:<unit id>","dlg":{L,R,watch,at,lines}}.
  Checks: unit exists in the game data; roles are cast keys of THAT unit (law 6b); 3..8 lines (BAL.dlgs); who ∈ {L, R, nar}; L speaks; her ("me") speaks
  unless watch; placeholders known to the family; VANPHONG (law 7): no digit, no %, no odds-ladder word; ≤ maxCh characters; no duplicate id.
  --cover prints the table «family / units / with scene» (law 11) over ALL units of the game, not only the files given. Exit 1 on any error."""
import json,re,sys,os,glob
R=os.path.dirname(os.path.abspath(__file__))+'/..'
B=open(R+'/build/jbal2.js',encoding='utf8').read()
m=re.search(r'BAL\.dlgs=\{on:\w+,min:(\d+),max:(\d+),maxCh:(\d+)',B);MIN,MAX,MAXCH=map(int,m.groups())
ODDS=['Mong manh','Hiểm','Khó lường','Tùy duyên','Có cơ','Rất vững','Liều','Năm ăn năm thua','Khá chắc','Rất chắc','Nắm chắc','Chắc chắn']
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
    if s.get('type')=='comp':add('j71',s['id'],{'A','B','W','M'},{'A','B','W','O','F'})
for s in sd('jwsd.js','JWSEEDS'):ro=set((s.get('roles') or {}).keys())|{'M'};add('wc',s['id'],ro,ro|{'O','X'})
LIVE={'j72'}   # families whose adapter plays the scene in the game now

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
        if x.get('focus') and wh=='nar':E.append(f'{uid} line {i+1}: focus on narration')
        if set(x)-{'who','text','focus'}:E.append(f'{uid} line {i+1}: unknown keys {sorted(set(x)-{"who","text","focus"})}')
    if L not in who:E.append(f'{uid}: L never speaks')
    if not w and 'me' not in who:E.append(f'{uid}: she never speaks')
    if w and 'me' in who:E.append(f'{uid}: watch scene: she does not speak')
    if set(d)-{'L','R','watch','at','lines'}:E.append(f'{uid}: unknown keys {sorted(set(d)-{"L","R","watch","at","lines"})}')
    return E

def main(a):
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
    for e in err:print('ERR',e)
    print(f'{n} scenes, {len(err)} errors')
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
            U=[k for k,v in UNITS.items() if v['fam']==fam];w=len([k for k in U if k in allf]);T[0]+=len(U);T[1]+=w
            print(f'| {fam} | {len(U)} | {w} | {100*w//max(1,len(U))} | {"yes" if fam in LIVE else "adapter pending"} |')
        print(f'| ALL | {T[0]} | {T[1]} | {100*T[1]//max(1,T[0])} | |')
    return 1 if err else 0
if __name__=='__main__':sys.exit(main(sys.argv[1:]))
