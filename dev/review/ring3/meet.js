/* RING-DESIGN-4: the mock life has met every consort (so no «???» on any plate or option — MAIN fix 4); real game call k61Meet, then the save is rewritten */
const {boot}=require('./boot');const fs=require('fs');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(()=>{let n=0;(rivals||[]).forEach(v=>{if(v.out)return;try{k61Meet(v,'mock',3);n++}catch(e){}});save();return {n,j:localStorage.getItem(SK(3))}});
 fs.writeFileSync(process.env.SAVE,r.j);console.log('met',r.n);await o.b.close();o.srv.close()})();
