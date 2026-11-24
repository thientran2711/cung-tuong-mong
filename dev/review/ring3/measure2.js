/* node measure2.js — peak people per PLACE (all places) from the j95 record, 12 seeds × buổi × khắc → which places are crowded (law 11) */
const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(()=>{const P={};const b0=S.buoi;for(let sd=0;sd<12;sd++){S.j95seed=3000+sd*7919;for(let b=0;b<BUOI.length;b++){S.buoi=b;const R=j95plan();
  for(let kh=0;kh<4;kh++){const c={};for(const id in R.P){const w=R.P[id][kh];if(!w)continue;const k=w[0]+'|'+b;c[k]=c[k]||{n:0,f:0,a:{}};c[k].n++;if(/follow/.test(w[1]))c[k].f++;else c[k].a[w[1]]=(c[k].a[w[1]]||0)+1}
   for(const k in c){const x=P[k]=P[k]||{L:[],F:[],a:{}};x.L.push(c[k].n);x.F.push(c[k].n-c[k].f);for(const a in c[k].a)x.a[a]=(x.a[a]||0)+c[k].a[a]}}}}S.buoi=b0;
  const out=[];for(const k in P){const L=P[k].L.sort((a,b)=>a-b),F=P[k].F.sort((a,b)=>a-b);const pl=k.split('|');let nm=pl[0];try{nm=placeName(pl[0])}catch(e){}
   out.push([nm+' ('+pl[0]+') b'+pl[1],L[Math.floor(L.length*.9)],L[L.length-1],F[Math.floor(F.length*.9)],Object.entries(P[k].a).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>x[0]).join(',')])}
  return out.filter(x=>x[1]>=5).sort((a,b)=>b[1]-a[1])});
 r.forEach(x=>console.log(x.join(' | ')));await o.b.close();o.srv.close()})();
