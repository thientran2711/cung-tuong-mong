const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(()=>{const R=S.roster;const kh=j95kh();const out={key:R&&R.key,kh,buoi:S.buoi,place:S.place,cnt:countAt('vuon'),n:0,rows:[]};
  for(let b=0;b<4;b++){}
  if(R)for(const id in R.P){const w=R.P[id][kh];if(w&&w[0]==='vuon'){out.n++;out.rows.push([id,w[1],w[2]||'',R.who[id]?R.who[id].join('|'):''])}}
  // try all buoi via plan
  const res=[];const b0=S.buoi;for(const b of [0,1,2,3]){S.buoi=b;const R2=j95plan();for(let k=0;k<4;k++){let n=0;for(const id in R2.P){const w=R2.P[id][k];if(w&&w[0]==='vuon')n++}res.push([b,k,n])}}S.buoi=b0;
  out.res=res;out.keys=Object.keys(S.roster||{});out.nRiv=rivals.length;return out});
 console.log(JSON.stringify(r,null,0));await o.b.close();o.srv.close()})();
