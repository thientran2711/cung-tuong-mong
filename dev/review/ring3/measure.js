/* node measure.js — real crowd at Ngự hoa viên from the j95 record: per buổi × khắc, by act + kind (masters / followers), 12 seeds; also the whole roster size */
const {boot}=require('./boot');const fs=require('fs');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(()=>{const out={roster:0,kinds:{},rows:[]};const b0=S.buoi;
  for(let sd=0;sd<12;sd++){S.j95seed=2000+sd*7919;for(const b of [0,1,2,3]){if(b>=BUOI.length)continue;S.buoi=b;let R;try{R=j95plan()}catch(e){out.err=String(e);continue}
   if(!out.roster){out.roster=Object.keys(R.P).length;for(const id in R.who){const k=(R.who[id][1]||'?');out.kinds[k]=(out.kinds[k]||0)+1}}
   for(let kh=0;kh<4;kh++){const row={sd,b,kh,acts:{},n:0,fol:0};for(const id in R.P){const w=R.P[id][kh];if(!w||w[0]!=='vuon')continue;row.n++;if(w[1]==='follow')row.fol++;const key=(id==='emp'?'emp':id==='th'?'th':id[0]==='v'?'rv':id.split(':')[0])+':'+w[1];row.acts[key]=(row.acts[key]||0)+1}out.rows.push(row)}}}
  S.buoi=b0;return out});
 fs.writeFileSync('/home/user/wt/ring3-shots/measure.json',JSON.stringify(r));console.log('roster',r.roster,'err',r.err,'rows',r.rows.length);
 const by={};r.rows.forEach(x=>{(by[x.b]=by[x.b]||[]).push(x)});for(const b in by){const L=by[b].map(x=>x.n).sort((a,c)=>a-c);const q=p=>L[Math.min(L.length-1,Math.floor(L.length*p))];console.log('buoi',b,'med',q(.5),'p90',q(.9),'max',L[L.length-1])}
 const A={};r.rows.forEach(x=>{for(const k in x.acts)A[k]=(A[k]||0)+x.acts[k]});console.log(Object.entries(A).sort((a,c)=>c[1]-a[1]).map(x=>x[0]+'='+(x[1]/r.rows.length).toFixed(2)).join(' '));
 console.log(JSON.stringify(r.kinds));
 await o.b.close();o.srv.close()})();
