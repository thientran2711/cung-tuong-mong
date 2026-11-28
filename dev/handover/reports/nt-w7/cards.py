# NB-b cards: shown == applied for Tát / Phạt quỳ / Ngáng chân / Bỏ phấn lạ / Giúp chăm thú (after the relAdd order fix). Idempotent.
import sys
D='/home/user/wt/ng/dev/build/'
def rep(f,o,n):
  s=open(D+f).read()
  if n in s: print('already',f); return
  assert s.count(o)==1,(f,o[:80],s.count(o)); open(D+f,'w').write(s.replace(o,n)); print('ok',f)
# helper: one oán range over several cases, each case = the oanAdd chunks it applies (each chunk × her «slight» nết, rounded like oanAdd)
rep('jaudit.js','function pvRel(t,n){',
 '/* NB-b: oán over several cases (tiers / win-or-caught): L = [[chunk, chunk…] per case] — each chunk is one oanAdd (× nết slight, rounded), no target → every nết */\n'
 'function pvOanSet(t,L,lab){const [a,b]=t&&t!==S?aaMulRange(t,"slight"):aaAnyRange("slight");const s=(c,f)=>c.reduce((z,n)=>z+(n>0?Math.round(n*f):0),0);const lo=Math.max(1,Math.min(...L.map(c=>s(c,a)))),hi=Math.max(lo,...L.map(c=>s(c,b)));return aaSay(lab||KIT_REL.oan,{a:lo,b:hi})}\n'
 '/* Tát (jface): thiện cảm both ways B.rel[sev], her oán = relAdd ×hurt + B.oan[sev]; tier 1..3 is chosen in the slap game → the range over the tiers */\n'
 'function tatRelTxt(t){const B=BAL.slap,k=BAL.relOan.hurt,S3=[1,2,3];const R=S3.map(s=>B.rel[s]);return `${aaSay(KIT_REL.aff,{a:Math.max(...R),b:Math.min(...R)})}, ${pvOanSet(t,S3.map(s=>[-B.rel[s]*k,B.oan[s]||0]),"nàng oán ngươi")}`}\n'
 'function pvRel(t,n){')
# Tát + Phạt quỳ cards (x getters, AOUT getters with the card target)
rep('jface.js','x:"đánh nhẹ, vừa hay nặng tùy tay: nàng in dấu tay trên má, Sắc giảm vài tuần · Đức ngươi giảm theo độ nặng · nàng oán ngươi",',
 '/* NB-b: the relation numbers relAdd(a,t,B.rel[sev]) + oanAdd(t,a,B.oan[sev]) apply */get x(){return `đánh nhẹ, vừa hay nặng tùy tay: nàng in dấu tay trên má, Sắc giảm vài tuần · Đức ngươi giảm theo độ nặng · ${tatRelTxt(null)}`},')
rep('jface.js','x:`nàng quỳ nửa ngày ngoài sân: Sức ${balSg(BAL.rl.jface.penQuy)}, đi lại chậm một tuần · nàng oán ngươi`,',
 'get x(){return `nàng quỳ nửa ngày ngoài sân: Sức ${balSg(BAL.rl.jface.penQuy)}, đi lại chậm một tuần · ${KIT_REL.aff} ${balSg(FXF.phatRel)}, ${pvOan(null,-FXF.phatRel*BAL.relOan.hurt,"nàng oán ngươi")}`},')
rep('jface.js','try{AOUT.tat=["nàng in dấu tay trên má, Sắc giảm vài tuần; nàng oán ngươi",""];AOUT.phatquy=[`nàng quỳ phạt: Sức ${balSg(BAL.rl.jface.penQuy)}, đi lại chậm một tuần; nàng oán ngươi`,""]}catch(e){}',
 'try{const cv=()=>typeof J78==="object"&&J78.cardV||null;Object.defineProperty(AOUT,"tat",{configurable:true,enumerable:true,get(){return[`nàng in dấu tay trên má, Sắc giảm vài tuần; ${tatRelTxt(cv())}`,""]},set(v){}});\n'
 ' Object.defineProperty(AOUT,"phatquy",{configurable:true,enumerable:true,get(){return[`nàng quỳ phạt: Sức ${balSg(BAL.rl.jface.penQuy)}, đi lại chậm một tuần; ${KIT_REL.aff} ${balSg(FXF.phatRel)}, ${pvOan(cv(),-FXF.phatRel*BAL.relOan.hurt,"nàng oán ngươi")}`,""]},set(v){}})}catch(e){}')
# Ngáng chân (j9 place menu, target v known)
rep('j9.js','x:v.preg&&!v.hidden?"nàng đang có thai":"nàng bẽ mặt",run:()=>trip(S,v)});',
 '/* NB-b: trip() applies — win: Danh nàng danhTrip, relAdd(a,t,trip); seen: relAdd(a,t,trip_2) + chứng cứ evTrip */x:`${v.preg&&!v.hidden?"nàng đang có thai":"nàng bẽ mặt"}: Danh nàng ${balSg(BAL.eff.j9.danhTrip)}, ${pvRel(v,BAL.eff.j9.trip)} · bị thấy: ${pvRel(v,BAL.eff.j9.trip_2)}, nàng nắm ${balAb(BAL.eff.j9.evTrip)} chứng cứ`,run:()=>trip(S,v)});')
# Bỏ phấn lạ: law 4 — the typed «5–16 trong 1–4 tuần» from RASH.d / RASH.wk (+1 tuần at the worst tier, rashGive); caught = j8 caught()
rep('jrash.js','try{AOUT.rash=["nàng nổi mẩn mặt, Sắc giảm 5–16 trong 1–4 tuần","bị lộ: nàng nắm chứng cứ, oán ngươi"]}catch(e){}',
 'try{Object.defineProperty(AOUT,"rash",{configurable:true,enumerable:true,get(){const cv=typeof J78==="object"&&J78.cardV||null;return[`nàng nổi mẩn mặt, Sắc giảm ${RASH.d[1]}–${RASH.d[3]} trong ${RASH.wk[1]}–${RASH.wk[3]+1} tuần`,`bị lộ: nàng nắm ${balAb(BAL.eff.j8.evCaught)} chứng cứ, ${pvRel(cv,BAL.eff.j8.caught)}`]},set(v){}})}catch(e){}')
rep('jrash.js','x:"nàng nổi mẩn mặt, Sắc giảm vài tuần",',
 'get x(){return `nàng nổi mẩn mặt, Sắc giảm vài tuần · bị lộ: nàng nắm ${balAb(BAL.eff.j8.evCaught)} chứng cứ, ${pvRel(null,BAL.eff.j8.caught)}`},')
# Giúp chăm thú: kindness also melts her oán ×mend (relAdd(a,t,+))
rep('jpetcare.js','get x(){return `${pvQuy(null,BAL.pet.helpRel,"thiện cảm của nàng")} · thú của nàng khỏe hơn`}',
 'get x(){return `${pvQuy(null,BAL.pet.helpRel,"thiện cảm của nàng")}, ${pvOan(null,-BAL.pet.helpRel*BAL.relOan.mend)} · thú của nàng khỏe hơn`}')
rep('jpetcare.js','return[pvQuy(t,BAL.pet.helpRel,"thiện cảm"),""]',
 'return[`${pvQuy(t,BAL.pet.helpRel,"thiện cảm")}, ${pvOan(t,-BAL.pet.helpRel*BAL.relOan.mend)}`,""]')
s=open(D+'jpetcare.js').read().replace('relAdd(t,a,…) → her nết factor','relAdd(a,t,…) (NB-b: doer first) → her nết factor');open(D+'jpetcare.js','w').write(s)
