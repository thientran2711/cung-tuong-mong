#!/usr/bin/env python3
"""COOP-QCARD family scan (law 11, RV-173 co-op LIVE hang «Dưỡng Tú viện»).
Two families of «a queued card stays hidden while «Sẵn sàng» / «Sang buổi» is dead»:
  F-HOLD  every showModal wrapper that can RETURN WITHOUT painting (swallows the paint of Q[0]) — listed with its own release / repaint path;
          a gate is SAFE when it (a) only holds while something she can see and tap is on screen and (b) repaints Q[0] itself when it lets go.
  F-SCN   every site that drops body.kscn-on (the «a kit scene is up» flag shared by the kit scene layer jkitsel §93 and the #modal stage jkstage §102):
          SAFE only when it keeps the flag while the OTHER owner is still up (kitScene.cur / #modal.kstg).
usage: python3 dev/measure/coop-qcard-scan.py [build dir]   (prints one row per site + the totals line)"""
import re,sys,glob,os
D=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(__file__),'..','build')
# known swallowing gates → (what holds, how it lets go and repaints, verdict)
KNOWN={
 'jverdict.js':('ob-verdict-3 RF: a choice running (depth) / a HELD result card on screen','release() → showModal(); COOP-QCARD: the held card stands over the kit scene layer (KIT_SCN.z+1) and a card covered 2 looks in a row lets go (dog)','FIXED'),
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
rows=[];hold=0
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
    s=open(f,encoding='utf-8').read();n=os.path.basename(f)
    for pos,b in bodies(s):
        call=re.search(r'\b\w+\.apply\(this,arguments\)|\b\w+\.call\(this',b)
        head=b[:call.start()] if call else b
        # an early return that does not hand on (return X.apply… is a hand-on)
        if re.search(r'return(?!\s*\w+\.apply)(?!\s*s0\.)(?:\s*undefined)?\s*[;}]',head) or re.search(r'\breturn\s*undefined',head):
            ln=s.count('\n',0,pos)+1;k=KNOWN.get(n,('?','?','CHECK'));hold+=1
            if n=='jverdict.js'and'function covered()'not in s:k=(k[0],'release() → showModal() only on her tap / when the card is hidden: a held card UNDER another layer (kit scene .kscn z 57 > 47) holds Q[0] with nothing to tap','UNSAFE')
            rows.append(('F-HOLD',f'{n}:{ln}',*k))
scn=0;unsafe=0
for f in sorted(glob.glob(os.path.join(D,'j*.js'))):
    s=open(f,encoding='utf-8').read();n=os.path.basename(f)
    for m in re.finditer(r'classList\.remove\("kscn-on"\)',s):
        ln=s.count('\n',0,m.start())+1;ctx=s[max(0,m.start()-400):m.start()]
        safe=('kitScene.cur' in ctx and ('kstg' in ctx or n=='jkstage.js'))
        scn+=1;unsafe+=0 if safe else 1
        rows.append(('F-SCN',f'{n}:{ln}','drops body.kscn-on','keeps it while the other owner is up' if safe else 'drops it whatever else is up','SAFE' if safe else 'UNSAFE'))
for r in rows:print(' | '.join(r))
chk=sum(1 for r in rows if r[0]=='F-HOLD' and r[4]=='CHECK')
hu=sum(1 for r in rows if r[0]=='F-HOLD' and r[4]=='UNSAFE')
print(f'TOTAL F-HOLD gates {hold} (unknown {chk}, unsafe {hu}) | F-SCN sites {scn} unsafe {unsafe}')
