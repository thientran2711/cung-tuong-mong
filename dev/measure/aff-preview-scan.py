#!/usr/bin/env python3
"""AFF-PREVIEW scan (law 4 / law 11): every player-visible PREVIEW of a thiện cảm rise whose act moves it through the affAdd funnel
(relAdd / affAdd / spAdd(...,"rel") / ap|apply({hh})) must print affPreview / affSg (the same wrapper math, not applied), not the raw BAL amount.
Lists: sites printing «thiện cảm <num>» from a BAL key that the same file also feeds to relAdd/affAdd/spAdd rel. Exit 1 if any raw one is left.
usage: python3 dev/measure/aff-preview-scan.py [build_dir] [--all]"""
import re,sys,os,glob
D=sys.argv[1] if len(sys.argv)>1 and not sys.argv[1].startswith('--') else os.path.join(os.path.dirname(__file__),'..','build')
ALL='--all' in sys.argv
SKIP={'jksize.js','jkitpage.js','jkitsel.js'}  # kit sample pages (demo numbers, no act)
# a BAL expression fed to the funnel
EX=r'(-?\s*[A-Za-z_$][A-Za-z0-9_$]*(?:\(\))?(?:\.[A-Za-z0-9_$]+|\[[^\]]+\])*)'
FUN=re.compile(r'(?:relAdd|affAdd|affGot\([^,()]+,[^,()]+,\(\)=>(?:relAdd|affAdd))\(\s*[^,()]+,\s*[^,()]+,\s*'+EX+r'\s*\)')
SPR=re.compile(r'spAdd\(\s*[^,()]+,\s*"rel",\s*'+EX+r'\s*\)')
# a preview print: thiện cảm then within a few chars a ${ ... BAL... } number
PRV=re.compile(r'(?:[Tt]hiện cảm|quý ngươi|quý ta|mến ngươi)[^`$<]{0,12}[+\-−]?\$\{\s*(balSg|balAb|affSg|affPreview|spSee|pvQuy)?\(?\s*(?:[A-Za-z0-9_.\[\]]+,\s*S,\s*)?'+EX)
# NO ONE PERSON at preview time (a whole group / a random pick made inside the act / a static act text with no target): the rise differs per person,
# so no single real number exists before the act; the RESULT lines read the real change. Listed for MAIN's ruling, not counted.
NOPERSON={'j10.js:BAL.ag.par3.fac.leave.rel':'group: every faction member','j31.js:BAL.eff.j31.go':'random pick inside go',
 'j54.js:H54.clanRel':'group: the clan','j54.js:H54.envy':'group: envious mothers','j55.js:BAL.eff.j55.tdProbe':'list button, no target yet (per-target card fixed)',
 'j68e.js:BAL.eff.j68e.ok':'random pick inside ok','j71.js:BAL.eff.j71.ok':'group: every consort','j72.js:BAL.eff.j72.fn_10':'static outcome text (no X in scope)',
 'j83.js:ev.rel':'wkGainTxt(ev) has no target','j97.js:G[0]':'group result line','jecon.js:BAL.favorCost':'static act x (person named by xw)',
 'jht.js:HT.clanRel':'group: the clan','jht.js:HT.envy':'group: envious mothers','jpetcare.js:BAL.pet.helpRel':'static act x / AOUT text',
 'jts.js:BAL.eff.jts.liXiAff':'group: every guest'}
# the paired funnel is NOT the one this text speaks of (checked by hand)
NOFUNNEL={'jky.js:n':'jkyRelW «thiện cảm +n» branch = a non-consort target: relTo gives n straight (servant / Thái hậu / Hoàng thượng paths), the consort branch prints pvQuy'}
rows=[];raw=0;nop=0
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
  b=os.path.basename(f)
  if b in SKIP: continue
  s=open(f,encoding='utf-8').read()
  keys=set(re.sub(r'\s','',m.group(1)).lstrip('-') for m in FUN.finditer(s))|set(re.sub(r'\s','',m.group(1)).lstrip('-') for m in SPR.finditer(s))
  keys={k for k in keys if not re.fullmatch(r'n|d|v|g|x|k|r|a|b|c|-?\d+',k)}  # one-letter locals: too loose to pair by name
  LS=s.split('\n')
  for i,l in enumerate(LS,1):
    for m in PRV.finditer(l):
      k=re.sub(r'\s','',m.group(2)).lstrip('-');fn=m.group(1) or 'raw'
      if k not in keys:
        # a one-letter local (n, g …): paired only with a funnel on the same or the next 2 lines
        near='\n'.join(LS[i-1:i+2])
        if not re.fullmatch(r'[a-z]',k) or not re.search(r'(?:relAdd|affAdd)\(\s*[^,()]+,\s*[^,()]+,\s*-?'+re.escape(k)+r'\s*\)|spAdd\([^,()]+,"rel",\s*-?'+re.escape(k)+r'\)',near): continue
      ok=fn in('affSg','affPreview','pvQuy')
      if not ok and b+':'+k in NOFUNNEL: continue
      if not ok and b+':'+k in NOPERSON: nop+=1;rows.append((b,i,k,fn,'NOPERSON: '+NOPERSON[b+':'+k])) if ALL else None;continue
      if not ok: raw+=1
      if ALL or not ok: rows.append((b,i,k,fn,'ok' if ok else 'RAW'))
for r in rows: print('%s:%d\t%s\t%s\t%s'%r)
print('# preview sites printing a raw funnel amount: %d (no-one-person, listed with --all: %d)'%(raw,nop))

# ---- PVQUY-POST (MAIN 188 ruling, law 4): pvQuy / affSg = a PREDICTION → only on PRE-act options / previews. A line written AFTER the act
# (run / go / ok / fn / fail body, or a text built after relAdd / affAdd in the same function) must print the REAL rise (affGot / keepGain).
# Sorts every pvQuy( call site PRE vs POST. Exit 1 if a POST one is left. --pvquy prints every site (file:line, sort, why).
ACT=('run','go','ok','fn','fail','win','lose','done','then','after','res')
FUNNEL=re.compile(r'(?<![.\w])(?:relAdd|affAdd|tsAff|relTo|oanAdd|ap|apply)\(|spAdd\([^,()]+,\s*"rel"')  # the act is already applying (stats / bonds moved) before the text
# helpers whose pvQuy is the card branch only (the result caller passes the real rise) — checked by hand, see dev/handover/reports/pvquy-post.md
HELPER_PRE={'tdLeakSay':(3,'pvQuy only when d is not passed (cards j55:186/218); the result line j55:77 passes d = affGot')}  # name: (args a POST caller must pass, why)
def _nargs(s,i):
    d=0;n=1;j=i
    while j<len(s):
        c=s[j]
        if c in '([{': d+=1
        elif c in ')]}':
            d-=1
            if d<0: return n
        elif c=='`':
            j=s.index('`',j+1) if '`' in s[j+1:] else j
        elif c==',' and d==0: n+=1
        j+=1
    return n
def _strip_closed(t):
    """drop every bracket group that is already closed before the site (nested arrow bodies, calls, objects), keep the open chain"""
    out=[];st=[]
    for ch in t:
        if ch in '([{': st.append(len(out)); out.append(ch)
        elif ch in ')]}':
            if st: del out[st.pop()+1:]  # keep the opener as a placeholder
            out.append(ch)
        else: out.append(ch)
    return ''.join(out)
def _ctx(s,pos):
    """innermost function container of pos: ('arrowkey',key,start) | ('fn',name,start) | ('top','',0)"""
    d=0;i=pos-1
    while i>=0:
        c=s[i]
        if c in ')]}': d+=1
        elif c in '([{':
            if d==0:
                pre=s[max(0,i-80):i]
                if c=='{':
                    m=re.search(r'(\w+)\s*:\s*(?:\([^()]*\)|\w+)\s*=>\s*$',pre) or re.search(r'(\w+)\s*:\s*function\s*\([^()]*\)\s*$',pre) or re.search(r'\b(\w+)\s*\([^()]*\)\s*$',pre)
                    mf=re.search(r'function\s+(\w+)\s*\([^()]*\)\s*$',pre)
                    if mf: return ('fn',mf.group(1),i)
                    m2=re.search(r'(\w+)\s*:\s*(?:\([^()]*\)|\w+)\s*=>\s*$',pre) or re.search(r'(\w+)\s*:\s*function\s*\([^()]*\)\s*$',pre)
                    if m2: return ('arrowkey',m2.group(1),i)
                    if re.search(r'=>\s*$',pre): return ('arrow','',i)
                    if re.search(r'function\s*\([^()]*\)\s*$',pre) or re.search(r'\b(?:get|set)\s+\w+\s*\([^()]*\)\s*$',pre) or re.search(r'(?:^|[,{;\s])(?!if\b|for\b|while\b|switch\b|catch\b)\w+\s*\([^()]*\)\s*$',pre): return ('fn','',i)
                elif c=='(':
                    m3=re.search(r'(\w+)\s*:\s*(?:\([^()]*\)|\w+)\s*=>\s*$',pre)
                    if m3: return ('arrowkey',m3.group(1),i)
            else: d-=1
        i-=1
    return ('top','',0)
def pv_sort(s,pos):
    k,name,st=_ctx(s,pos)
    if k in('arrowkey',) and name in ACT: return 'POST','inside %s:()=>{…} (the act body)'%name
    if k=='top': return 'PRE','option/preview text (top level)'
    body=_strip_closed(re.sub(r'/\*.*?\*/','',s[st+1:pos],flags=re.S))  # a comment naming relAdd is not a call
    if FUNNEL.search(body): return 'POST','after %s in the same %s'%(FUNNEL.search(body).group(0).rstrip('('), name or k)
    if k=='fn' and name in HELPER_PRE: return 'PRE','helper %s: %s'%(name,HELPER_PRE[name][1])
    return 'PRE',('option/preview text (%s %s)'%(k,name)).replace('  ',' ').strip()
def pv_callers_post(files,name):
    """a helper fn holding pvQuy: is it ever printed from a POST spot?"""
    hits=[]
    for f,s in files:
        for m in re.finditer(r'\b'+re.escape(name)+r'\(',s):
            if s[max(0,m.start()-9):m.start()]=='function ': continue
            srt,why=pv_sort(s,m.start())
            if srt=='POST' and name in HELPER_PRE and _nargs(s,m.end())>=HELPER_PRE[name][0]: continue  # the result caller passes the real rise
            if srt=='POST': hits.append('%s:%d'%(os.path.basename(f),s.count('\n',0,m.start())+1))
    return hits
FILES=[(f,open(f,encoding='utf-8').read()) for f in sorted(glob.glob(os.path.join(D,'j*.js'))) if os.path.basename(f) not in SKIP]
pv=[];post=0
# PVQUY-POST-2 (RV-186 item 4, law 11 whole group): pvOan / pvOanSet are the same PREDICTION family for oán — a POST site prints the real change (oanGot)
# PVQUY-POST-3: + the no-one-person twins pvQuyAny / pvOanAny (jexam «Thái hậu lạnh nhạt» printed pvOanAny after oanAdd)
for f,s in FILES:
  for m in re.finditer(r'\b(?:pvQuy|pvOan|pvOanSet|pvQuyAny|pvOanAny)\(',s):
    if s[max(0,m.start()-9):m.start()]=='function ': continue
    srt,why=pv_sort(s,m.start())
    k,name,_=_ctx(s,m.start())
    if srt=='PRE' and k=='fn' and name:
      cp=pv_callers_post(FILES,name)
      if cp: srt,why='POST','helper %s() printed after the act at %s'%(name,', '.join(cp[:4]))
    if srt=='POST': post+=1
    pv.append((os.path.basename(f),s.count('\n',0,m.start())+1,srt,why))
if '--pvquy' in sys.argv:
  for r in pv: print('PVQUY %s:%d\t%s\t%s'%r)
for r in pv:
  if r[2]=='POST' and '--pvquy' not in sys.argv: print('PVQUY %s:%d\t%s\t%s'%r)
print('# pvQuy sites: %d (PRE %d, POST %d — a POST line must print affGot, not the preview)'%(len(pv),len(pv)-post,post))
sys.exit(1 if raw or post else 0)
