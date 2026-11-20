/* mg-fair-hands measure (owner OD 20/11 ~01:10Z fair hands + ~01:18Z thirds + ~01:50Z upbringing). node dev/measure/mg-fair-hands.js [dev/index.html]
   Her share of wins (her play > an NPC's, ties half) on a contest board (occ hoi). Her play = her calibrated base b (BAL.ag.mg2.cal.k; else the skilled
   human median) + her board shift + the same roll the NPC play has (w·(u − .5), u = mean of 3). Kinds: dan (calibrated) and co (not).
   A  thirds: an average untrained NPC set (art 0 = hers, her origin, her rank): share of NPCs per third + her win share vs each.
   B  upbringing × art: her origin thd (poor scholar's daughter), art 2, rank 3; NPCs by origin (start bậc from j1 ORIGINS art) and own art step.
   C  by rank: the real courts of 20 fresh games (every live consort with her own origin road, art level, rank), her (origin thd, art 2) AT each rank r vs the consorts of rank r: law 5 = her own board gets harder (her average play) while who she meets plays on the same board. */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const T=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,out={};const RK=3,LV=2,ORG="thd";const keepO=S.origin,keepR=S.rank;S.origin=originByKey(ORG);S.rank=RK;
  /* C pool: the live consorts of 20 fresh games (their own origin road, art levels and rank), kept as plain copies */
  const COURT=[];{const S0=S;for(let g=0;g<20;g++){window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const v of liveRivals(true).filter(v=>v.alive&&v!==S)){mgOrgOf(v);
    COURT.push({name:"C"+g+"|"+v.name,id:"c"+g+"_"+v.id,rank:mgRankOf(v),queen:v.queen,arts:Object.assign({},v.arts),ag:{o:mgOrgOf(v)},alive:true})}}}
  S.origin=originByKey(ORG);S.rank=RK;
  for(const kind of ["dan","huong","co"]){const st=kg82FormulaOf(kind).map(x=>x[0]).find(s=>s!=="help"&&!KG82_STAT[s]);const keepA=Object.assign({},S.arts);
   const e=BAL.ag.mg2.cal.k[kind];const base=e?e.b:mgMedD(0),Bd=mgBand(kind);
   const her=lv=>{const u=(Math.random()+Math.random()+Math.random())/3;return cl(Math.round(base+(mgMedD(mgTier(kind,{occ:"hoi",rank:S.rank,lv}).d)-mgMedD(0))+H.w*(u-.5)),0,10)};
   const vs=(q,lv,R)=>{let w=0,n=0;for(let j=0;j<R;j++){const a=her(lv),x=mgNpcRaw(kind,q,{occ:"hoi"});w+=a>x?1:a===x?.5:0;n++}return[w,n]};
   /* A */
   S.arts[st]=0;const th={worse:[0,0,0],equal:[0,0,0],better:[0,0,0]};
   for(let i=0;i<1500;i++){const q={name:"U"+kind+i,id:90000+i,rank:RK,arts:{[st]:0},alive:true,ag:{o:ORG}};const h=mgHandEff(kind,q),g=h>Bd.c+H.eq+1e-9?"better":h<Bd.c-H.eq-1e-9?"worse":"equal";
    th[g][0]++;const [w,n]=vs(q,0,6);th[g][1]+=w;th[g][2]+=n}
   const thirds=Object.keys(th).map(g=>({g,share:Math.round(1000*th[g][0]/1500)/10,herWin:Math.round(1000*th[g][1]/Math.max(1,th[g][2]))/10}));
   /* B */
   S.arts[st]=LV;const rows=[];for(const org of ["tt","cn","thd","cnv"])for(const da of [-2,-1,0,1,2]){let w=0,n=0;for(let i=0;i<600;i++){const q={name:"F"+kind+i,id:70000+i,rank:RK,arts:{[st]:LV+da},alive:true,ag:{o:org}};const r=vs(q,LV,8);w+=r[0];n+=r[1]}
    rows.push({org,dArt:da,herWin:Math.round(1000*w/n)/10})}
   /* C */
   const byR={};for(const v of COURT){const r=mgRankOf(v);S.rank=r;const [w,n]=vs(v,LV,60);S.rank=RK;const B=byR[r]=byR[r]||{w:0,n:0,c:0,org:{},lv:0};B.w+=w;B.n+=n;B.c++;B.lv+=kg82LvFor(v,kind);const o=mgOrgOf(v);B.org[o]=(B.org[o]||0)+1}
   const ranks=Object.keys(byR).sort((a,b)=>a-b).map(r=>({rank:+r,n:byR[r].c,herWin:Math.round(1000*byR[r].w/byR[r].n)/10,herMed:+(base+mgMedD(mgTier(kind,{occ:"hoi",rank:+r,lv:LV}).d)-mgMedD(0)).toFixed(1),npcAvg:0,lv:+(byR[r].lv/byR[r].c).toFixed(1),org:Object.entries(byR[r].org).map(([k,c])=>k+"×"+c).join(" ")}));
   out[kind]={base,band:Bd,thirds,rows,ranks};S.arts=keepA}
  S.origin=keepO;S.rank=keepR;return out});
 for(const k in T){const t=T[k];console.log(`\n${k}: base ${t.base} · band ${t.band.lo}..${t.band.hi} (centre ${t.band.c})`);
  console.log('A untrained set (art 0, her origin): third | share % | her win %');for(const x of t.thirds)console.log(`${x.g} | ${x.share} | ${x.herWin}`);
  console.log('B origin | art −2 | art −1 | art 0 | art +1 | art +2   (her: thd, art 2; her win %)');for(const o of ["tt","cn","thd","cnv"])console.log(`${o} | ${t.rows.filter(x=>x.org===o).map(x=>x.herWin).join(' | ')}`);
  console.log('C as she climbs: her rank r vs the consorts of rank r (20 fresh courts) | consorts | mean art lv | origins | her average play on her board | her win %');for(const r of t.ranks)console.log(`${r.rank} | ${r.n} | ${r.lv} | ${r.org} | ${r.herMed} | ${r.herWin}`)}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
