/* origin-arts measure (owner OD 20/11 ~02:05Z; laws 2/3): prints markdown tables for the report.
   node dev/measure/origin-arts.js [dev/index.html]
   A — every identity (origin × road): road title, start arts (Vietnamese names, bậc), total bậc, training points (bậc L costs L(L+3)/2 lesson points, j85
       addArtP), and the origin's other start numbers (rank, stats, Thái hậu / Hoàng hậu thiện cảm) so the whole start pack is on one row.
   B — upbringing as she meets them: her win share on 4 boards (her: thd road thd_tho, art levels from her row, rank 0, contest occ hoi) against untrained
       NPCs (own arts 0) of each origin, averaged over its 4 roads (800 NPCs × 4 plays per origin per kind). */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const out=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__forceOrigin="thd";window.__nlInner=1;start();window.__nlInner=0;window.__forceOrigin=undefined;window.__bot=1;Q.length=0;
  const T=BAL.orig.art,NM={};ARTS.forEach(a=>NM[a.k]=a.n);VIR.forEach(v=>NM[v.k]=v.n+" ("+v.full+")");
  const pts=L=>L*(L+3)/2,origins=ORIGINS.map(x=>x.k).concat(Object.keys(ORIGIN_BR));const L=[];
  L.push("| origin | road | start arts (bậc) | Σ bậc | Σ points | rank | other start | TH / HH |","|---|---|---|---|---|---|---|---|");
  for(const k of origins){const O=originByKey(k),own=T[k][""];
   const oth=Object.entries(O.o||{}).map(([s,v])=>s+" "+v).join(", ");
   for(const rd of Object.keys(T[k]).filter(x=>x!=="")){const R=T[k][rd];const tb=Object.values(R).reduce((a,x)=>a+x,0),tp=Object.values(R).reduce((a,x)=>a+pts(x),0);
    L.push(`| ${O.n} | ${ARC67[rd]?ARC67[rd].t:rd} (${rd}) | ${Object.entries(R).map(([a,v])=>NM[a]+" "+v).join(" · ")} | ${tb} | ${tp} | ${RANKS[O.r].n} | ${oth} | ${O.th} / ${O.hh} |`)}
   L.push(`| ${O.n} | (no road known) | ${Object.entries(own).map(([a,v])=>NM[a]+" "+v).join(" · ")} | ${Object.values(own).reduce((a,x)=>a+x,0)} | | | | |`)}
  /* B */
  const kinds=["dan","co","mua","huong"],N=800,H=BAL.ag.mg2.hand;const B=["| NPC origin | "+kinds.map(k=>KG82_KIND[k].n||k).join(" | ")+" |","|---|"+kinds.map(()=>"---|").join("")];
  const herLv=k=>kg82LvFor(S,k);
  for(const k of origins){const roads=Object.keys(T[k]).filter(x=>x!=="");const row=[];
   for(const kind of kinds){const sh=mgMedD(mgTier(kind,{occ:"hoi",rank:0,lv:herLv(kind)}).d)-mgMedD(0);const e=BAL.ag.mg2.cal.k[kind],base=e?e.b:mgMedD(0);let w=0,n=0;
    for(let i=0;i<N;i++){const x={name:"M"+k+i,id:80000+i,rank:0,arts:{},alive:true,nr:{o:k,r:roads[i%roads.length]}};
     for(let j=0;j<4;j++){const u=(Math.random()+Math.random()+Math.random())/3,a=cl(Math.round(base+sh+H.w*(u-.5)),0,10),y=mgNpcRaw(kind,x,{occ:"hoi"});w+=a>y?1:a===y?.5:0;n++}}
    row.push((100*w/n).toFixed(1))}
   B.push(`| ${originByKey(k).n} | ${row.join(" | ")} |`)}
  return {A:L.join("\n"),B:B.join("\n"),her:JSON.stringify({road:S.st.f14.road,arts:S.arts,vir:S.vir})}});
 console.log("### A — start value per identity\n"+out.A+"\n\n### B — her win % (thd, "+out.her+") vs untrained NPCs of each origin (roads mixed)\n"+out.B);
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
