/* D16 measure: Tứ đức lessons + fees + works, before (main) / after (review/tuduc-sub).
   usage: node dev/measure/tds_measure.js <game url> <lives> <months> [label]
   Each month: one Tứ đức lesson per buổi while khắc/Sức allow (teacher when bạc ≥ fee + 20, else self), then endTurn.
   Reports per life: fees paid (and as share of bổng), levels, works made by kind, NPC Tứ đức levels / bạc / handmade works. */
const {chromium}=require('playwright');const [,,URL,LIVES,MONTHS,LABEL]=process.argv;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const c=await b.newContext({viewport:{width:1000,height:755},serviceWorkers:'block'});const p=await c.newPage();
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2000);
 const out=[];
 for(let L=0;L<(+LIVES||3);L++){
  const r=await p.evaluate(M=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();Q.length=0;const pay0=BAL.pay;let fee=0,payT=0,les=0,tch=0,cons=0;const VK=["cong","dung","ngon","hanh"];
   const a0=apply;apply=function(o){if(window.__inL&&o&&o.bac<0)fee+=-o.bac;return a0.apply(this,arguments)};
   const drive=()=>{for(let g=0;g<6&&Q.length;g++){const m=Q[0];const t=document.querySelector('#modal .kshgo:not([disabled])');if(m.kit&&m.kit.pick){if(t){t.click();continue}Q.length=0;break}
     if(m.opts){let i=m.opts.findIndex(o=>/Ma ma|vải|giấy|gạo/.test(o.n));if(i<0)i=0;chooseM(i);continue}Q.length=0}};
   for(let mo=0;mo<M&&!S.dead;mo++){payT+=BAL.pay[Math.min(7,S.rank|0)];
    for(let bu=0;bu<3&&!S.dead;bu++){Q.length=0;
     for(let k=0;k<2;k++){const v=VK[(mo*3+bu+k)%4];if(S.vir[v]>=5)continue;const f=virCost(S.vir[v]);const mode=S.bac>=f+20?"master":"self";if(!can(2)||S.suc<25)break;
      const u0=used;window.__inL=1;try{lessonVir(v,mode);drive()}catch(e){}window.__inL=0;Q.length=0;if(used>u0){les++;if(mode==="master")tch++}}
     try{Q.length=0;S.suc=Math.max(S.suc,40);if(typeof nextBuoi==="function"&&(S.buoi||0)<2){nextBuoi()}else{endTurn()}}catch(e){}Q.length=0}
    if((S.buoi||0)!==0){try{endTurn()}catch(e){}Q.length=0}}
   apply=a0;const W={};for(const e of S.inv)if(e.wk)W[e.wk.kind]=(W[e.wk.kind]||0)+1;
   const R=rivals.filter(v=>v.alive&&!v.out&&v.vir);const avg=f=>R.length?+(R.reduce((s,v)=>s+f(v),0)/R.length).toFixed(2):0;
   const tdsK=typeof tdsKinds==="function"?tdsKinds():[];
   return{rank:S.rank,dead:!!S.dead,months:M,lessons:les,teacherLessons:tch,fee,feeShare:+(fee/Math.max(1,payT)).toFixed(3),vir:VK.map(v=>S.vir[v]).join("/"),duc:S.duc,bac:S.bac,
    works:W,tdsWorks:tdsK.reduce((s,k)=>s+(W[k]||0),0),lối:tdsK.map(k=>(S.rcpL&&S.rcpL[k]||[]).length).join("/"),
    npc:{n:R.length,vir:avg(v=>VK.reduce((s,k)=>s+(v.vir[k]||0),0)/4),bac:avg(v=>v.bac||0),works:avg(v=>(v.inv||[]).filter(e=>e.wk).length),tdsWorks:avg(v=>(v.inv||[]).filter(e=>e.wk&&tdsK.includes(e.wk.kind)).length)}}},+(MONTHS||24));
  out.push(r)}
 console.log(JSON.stringify({label:LABEL||URL,lives:out,errs:errs.slice(0,5)}));await b.close()})();
