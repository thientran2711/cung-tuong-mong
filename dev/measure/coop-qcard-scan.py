#!/usr/bin/env python3
"""COOP-QCARD family scan (law 11, RV-173 co-op LIVE hang «Dưỡng Tú viện»).
Two families of «a queued card stays hidden while «Sẵn sàng» / «Sang buổi» is dead»:
  F-HOLD  every showModal wrapper that can RETURN WITHOUT painting (swallows the paint of Q[0]) — listed with its own release / repaint path;
          a gate is SAFE when it (a) only holds while something she can see and tap is on screen and (b) repaints Q[0] itself when it lets go.
  F-SCN   every site that drops body.kscn-on (the «a kit scene is up» flag shared by the kit scene layer jkitsel §93 and the #modal stage jkstage §102):
          SAFE only when it keeps the flag while the OTHER owner is still up (kitScene.cur / #modal.kstg).
  F-Z     (r2) every layer she must SEE or TAP that can be up while a kit scene plays (.kscn, KIT_SCN.z): over the scene, or under it BY DESIGN
          (a card / the focus layer under the scene waits for it, F-HOLD); the result card (#rtoast.karesult: plain, kitResultCard §93.8, held)
          is SAFE only when its z reads KIT_SCN.z+1 (or more).
usage: python3 dev/measure/coop-qcard-scan.py [build dir]   (prints one row per site + the totals line)"""
import re,sys,glob,os
D=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
# known swallowing gates → (what holds, how it lets go and repaints, verdict)
KNOWN={
 'jverdict.js':('ob-verdict-3 RF: a choice running (depth) / a HELD result card on screen','release() → showModal(); COOP-QCARD: the held card stands over the kit scene layer (KIT_SCN.z+1); a layer above it closes by her tap — never released for being covered (BIG rv r3)','FIXED'),
 'jdayq.js':('jdayq gates: act held (her activity on screen, dqActBlocks), dawn / new-day host (solo), old card while she is inside her own screen','dqArmModal polls while the activity is ON SCREEN (dqShown), paints when it leaves; solo nets dqWake / dqNextSync','KEEP'),
 'jselxsc.js':('selection days: her free card under the Dư đồ (Q[0].selxMapUp) while the map is up','«‹ Dư đồ» / rail «Về Dư đồ» / any tab → selxMapBack → showModal','KEEP'),
 'jrbatch.js':('renderHold batch (RB.d>0): showModal asked inside one synchronous batch','flush at the outermost end: showModal() once','KEEP'),
 'jspread.js':('SP13 code cards (sp13Pre) — solo spread, off in co-op (SP13.off)','sp13Pre paints the code card itself','KEEP'),
 'jgreet.js':('«Có người đến»: the visitor card waits for her real figure (m.__fcW, ≤ 4 s)','image onload / onerror / 4 s timer → showModal','KEEP'),
 'jnf.js':('night-final: the flip scene is still playing when the choice is due (the scene is on screen)','step() puts the choice up the moment the scene closes','KEEP'),
 'jdfv.js':('a visitor card waits for her real face (m.__dfWait, ≤ 4 s)','the image onload / timer → showModal','KEEP'),
}
def bodies(src):
    for m in re.finditer(r'showModal=(?:window\.showModal=)?function\s*\([^)]*\)\{|[Ww]\("showModal",\s*\w+=>function\s*\([^)]*\)\{',src):
        i=m.end();d=1;j=i
        while j<len(src) and d>0:
            c=src[j]
            if c=='{':d+=1
            elif c=='}':d-=1
            j+=1
        yield m.start(),src[i:j-1]
_all=''.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(D,'j*.js'))) if not f.endswith('all.js'))
_zs=re.search(r'const KIT_SCN=\{z:(\d+)',_all);_SZ=int(_zs.group(1)) if _zs else 57
_m=re.search(r'\.rtoast\.karesult\{[^}]*?z-index:\s*(\$\{KIT_SCN\.z\+(\d+)\}|\d+)',_all)
# the held card is safe when it stands over the kit scene layer (z rule, KIT 7.4); a layer above it closes by her tap (BIG rv r3: no «covered → release»)
CARD_OVER=bool(_m) and ((_SZ+int(_m.group(2))) if _m.group(2) else int(_m.group(1)))>_SZ
rows=[];hold=0
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
    s=open(f,encoding='utf-8').read();n=os.path.basename(f)
    for pos,b in bodies(s):
        call=re.search(r'\b\w+\.apply\(this,arguments\)|\b\w+\.call\(this',b)
        head=b[:call.start()] if call else b
        # an early return that does not hand on (return X.apply… is a hand-on)
        if re.search(r'return(?!\s*\w+\.apply)(?!\s*s0\.)(?:\s*undefined)?\s*[;}]',head) or re.search(r'\breturn\s*undefined',head):
            ln=s.count('\n',0,pos)+1;k=KNOWN.get(n,('?','?','CHECK'));hold+=1
            if n=='jverdict.js'and not CARD_OVER:k=(k[0],'release() → showModal() only on her tap / when the card is hidden: a held card UNDER another layer (kit scene .kscn z 57 > 47) holds Q[0] with nothing to tap','UNSAFE')
            rows.append(('F-HOLD',f'{n}:{ln}',*k))
# F-HOLD (BIG rv r3): a held card covered by a layer she closes by her own tap (item reveal .kmov «Nhận», podium, roulette) must stay held — never released for being covered
_jv=open(os.path.join(D,'jverdict.js'),encoding='utf-8').read();_cov='function covered()' in _jv
rows.append(('F-HOLD','jverdict.js dog()','held card under a tap-closed layer (.kmov item reveal …)','RELEASED after 2 looks: the result card is lost, she never sees it' if _cov else 'stays held: there again after «Nhận»','UNSAFE' if _cov else 'SAFE'))
scn=0;unsafe=0
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
    s=open(f,encoding='utf-8').read();n=os.path.basename(f)
    for m in re.finditer(r'classList\.remove\("kscn-on"\)',s):
        ln=s.count('\n',0,m.start())+1;ctx=s[max(0,m.start()-400):m.start()]
        safe=('kitScene.cur' in ctx and ('kstg' in ctx or n=='jkstage.js'))
        scn+=1;unsafe+=0 if safe else 1
        rows.append(('F-SCN',f'{n}:{ln}','drops body.kscn-on','keeps it while the other owner is up' if safe else 'drops it whatever else is up','SAFE' if safe else 'UNSAFE'))
# F-Z: z of the layers against the kit scene layer
allsrc=''.join(open(f,encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(D,'j*.js'))) if not f.endswith('all.js'))
zs=re.search(r'const KIT_SCN=\{z:(\d+)',allsrc);SZ=int(zs.group(1)) if zs else 57
def zof(sel):
    m=re.search(re.escape(sel)+r'\{[^}]*?z-index:\s*(\$\{KIT_SCN\.z\+(\d+)\}|\d+)',allsrc)
    if not m:return None
    return SZ+int(m.group(2)) if m.group(2) else int(m.group(1))
zr=zof('.rtoast.karesult');zu=0
for what,z,need in [('#rtoast.karesult plain result card (resultShow)',zr,1),('#rtoast kitResultCard §93.8 (selection days: Giáo tập ma ma)',zr,1),('#rtoast.karesult.kres-hold held card (jverdict)',zr,1),
                    ('body.kring-on #rtoast (ring screens)',zof('body.kring-on #rtoast'),1),('#kpodov podium',zof('#kpodov'),1),('.kmov manual kit scene / reveal',zof('.kmov'),1),('.kroul life roulette',zof('.kroul'),1),
                    ('#modal cards / #modal.kstg stage',42,0),('.modal.kptitle title card',zof('.modal.kptitle'),0),('.kfoc focus layer',zof('.kfoc'),0)]:
    if need:
        ok=z is not None and z>SZ;zu+=0 if ok else 1
        rows.append(('F-Z',what,f'z {z} vs scene {SZ}','over the scene' if ok else 'UNDER the scene: she cannot see / tap it while a scene plays','SAFE' if ok else 'UNSAFE'))
    else:rows.append(('F-Z',what,f'z {z} vs scene {SZ}','under the scene by design: the scene covers the game, the card waits (F-HOLD)','KEEP'))
for r in rows:print(' | '.join(r))
chk=sum(1 for r in rows if r[0]=='F-HOLD' and r[4]=='CHECK')
hu=sum(1 for r in rows if r[0]=='F-HOLD' and r[4]=='UNSAFE')
print(f'TOTAL F-HOLD gates {hold} (unknown {chk}, unsafe {hu}) | F-SCN sites {scn} unsafe {unsafe} | F-Z layers unsafe {zu}')
