const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g,pg}=o;
 const r=await g.evaluate(async()=>{Q.length=0;S.buoi=1;try{used=0}catch(e){}S.roster=null;j95sync(false,true);
  const before={kh:j95arrKh('vuon'),plan:NHV.plan().areas.map(a=>a.k+':'+a.g.map(x=>x.ms.concat(x.fol).map(m=>m.id+'/'+m.name).join('+')).join(' | '))};
  kpmEnter('p:vuon','ngudao');for(let j=0;j<6&&Q.length;j++){const m=Q[0];const L=m.opts||[];let k=L.findIndex(o=>/một mình/.test(o.n||''));if(k<0)k=Math.max(0,L.findIndex(o=>!o.off));if(L.length)chooseM(k);else closeModal();await new Promise(r=>setTimeout(r,300))}
  await new Promise(r=>setTimeout(r,1500));
  const keep=S.hall;S.hall=null;const all=curPeople().map(p=>p.name+'|'+p.kind+'|'+(p.lid||'')+'|'+(p.ref&&p.ref.id));S.hall=keep;
  return {before,place:S.place,kh:j95kh(),key:S.roster.key,after:NHV.plan().areas.map(a=>a.k+':'+a.g.map(x=>x.ms.concat(x.fol).map(m=>m.id+'/'+m.name).join('+')).join(' | ')),all,cp:curPeople().map(p=>p.name),hall:JSON.stringify(S.hall)}});
 console.log(JSON.stringify(r,null,1));await o.b.close();o.srv.close()})();
