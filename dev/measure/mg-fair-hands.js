/* mg-fair-hands measure (owner OD 20/11 ~01:10Z fair spread). node dev/measure/mg-fair-hands.js [dev/index.html]
   Her share of wins (her play > an NPC's, ties half) on a contest board (occ hoi), her at art level 2 / rank 3, vs NPC populations
   (600 people each, every hand rolled) by opponent rank step and art level step. Her play = her calibrated base b (BAL.ag.mg2.cal.k; else the
   skilled human median) + her board shift + the same roll the NPC play has (w·(u − .5), u = mean of 3). Kinds: dan (calibrated) and co (not). */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const T=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,out={};const LV=2,RK=3,N=600,R=8;
  for(const kind of ["dan","co"]){const st=kg82FormulaOf(kind).map(x=>x[0]).find(s=>s!=="help"&&!KG82_STAT[s]);
   const keepA=Object.assign({},S.arts),keepR=S.rank;S.arts[st]=LV;S.rank=RK;const e=BAL.ag.mg2.cal.k[kind];const base=e?e.b:mgMedD(0);
   const her=()=>{const u=(Math.random()+Math.random()+Math.random())/3;return cl(Math.round(base+(mgMedD(mgTier(kind,{occ:"hoi",rank:RK,lv:LV}).d)-mgMedD(0))+H.w*(u-.5)),0,10)};
   const rows=[];for(const dr of [-2,0,2])for(const da of [-2,-1,0,1,2]){let w=0,n=0,atAbove=0;for(let i=0;i<N;i++){const q={name:"F"+kind+i,id:70000+i,rank:RK+dr,arts:{[st]:LV+da},alive:true};
     let m=0;for(let j=0;j<R;j++){const a=her(),x=mgNpcRaw(kind,q,{occ:"hoi"});w+=a>x?1:a===x?.5:0;n++;m+=x}if(m/R>=her()-0)atAbove++}
    rows.push({dRank:dr,dArt:da,herWin:Math.round(1000*w/n)/10})}
   const hands=[];for(let i=0;i<2000;i++)hands.push(mgHand(kind,{name:"G"+kind+i,id:80000+i}));hands.sort((a,b)=>a-b);const Bd=mgBand(kind);
   out[kind]={base,band:Bd,medHandPlay:Math.round((hands[1000]-H.w/2)*100)/100,shareAtOrAbove:Math.round(1000*hands.filter(h=>h-H.w/2>=base).length/2000)/10,rows};
   S.arts=keepA;S.rank=keepR}
  return out});
 for(const k in T){const t=T[k];console.log(`\n${k}: base ${t.base} · band ${t.band.lo}..${t.band.hi} (centre ${t.band.c}) · middle NPC plays ${t.medHandPlay} · NPC hands at/above her ${t.shareAtOrAbove}%`);
  console.log('opp rank step | art −2 | art −1 | art 0 | art +1 | art +2   (her win share %)');for(const dr of [-2,0,2]){const r=t.rows.filter(x=>x.dRank===dr);console.log(`${dr>0?'+':''}${dr} | ${r.map(x=>x.herWin).join(' | ')}`)}}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
