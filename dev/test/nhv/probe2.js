const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(async()=>{S.buoi=1;try{used=0}catch(e){}j95sync&&j95sync(false,false);const R=S.roster;const kh=j95kh();
  const rows=[];for(const id in R.P){const w=R.P[id][kh];if(w&&w[0]==='vuon')rows.push([id,w[1],w[2]||'',R.who[id]?R.who[id].join('|'):'']);}
  S.place='vuon';S.visit={k:'vuon',people:[],talked:false,tk:{}};tab='act';render();try{j77Tap('vuon')}catch(e){}await new Promise(r=>setTimeout(r,1500));
  const cp=curPeople().map(p=>[p.kind,p.name,p.ref&&p.ref.id,p.lid||'',p.role||p.info||'']);
  let acts=null;try{acts=dfData(0)}catch(e){acts=String(e)}
  return {key:R.key,kh,cnt:countAt('vuon'),rows,cp,place:S.place,acts}});
 console.log(JSON.stringify(r,null,0));await o.b.close();o.srv.close()})();
