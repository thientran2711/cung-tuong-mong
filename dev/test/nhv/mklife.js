/* SAVE=<file> node mklife.js — ONE life for both devices: buổi trưa, the j95 record planned ONCE (best seed for a full garden at her arrival khắc), half the consorts met; written to SAVE */
const {boot}=require('./boot');const fs=require('fs');const F=process.env.SAVE;delete process.env.SAVE;
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(()=>{Q.length=0;S.buoi=1;try{used=0}catch(e){}S.place='home';let best=null;
  for(let sd=0;sd<24;sd++){S.buoi=1+(sd%2);try{used=0}catch(e){}S.roster=null;j95sync(false,true);const RR=JSON.stringify(S.roster);const P=NHV.plan();const ne=P.areas.filter(a=>a.g.length).length,ng=P.groups.length,n=P.areas.reduce((s,a)=>s+NHV.count(a),0);const sc=ne*10+ng*3+n;if(!best||sc>best.sc)best={sd,b:S.buoi,u:used,R:RR,sc,ne,ng,n}}
  S.buoi=best.b;try{used=best.u}catch(e){}S.roster=JSON.parse(best.R);delete best.R;
  let m=0;(rivals||[]).forEach((v,i)=>{if(v.out||i%3===2)return;try{k61Meet(v,'mock',3);m++}catch(e){}});
  save();return {best,met:m,j:localStorage.getItem(SK(3)),plan:NHV.plan().areas.map(a=>a.k+':'+NHV.count(a)+':'+a.g.map(x=>x.ms.map(y=>y.name).join('+')+'('+x.fol.length+')['+x.act+']').join(' / '))}});
 fs.writeFileSync(F,r.j);console.log(JSON.stringify({best:r.best,met:r.met,plan:r.plan},null,1));await o.b.close();o.srv.close()})();
