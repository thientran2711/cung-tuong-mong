/* review/evidence-truth: (1) old save — evidence with no deed behind it becomes rumour (tin đồn), not deleted;
   (2) a spy on a clean player finds nothing — the news card reads one fact per row (shot);
   (3) a frame on the player opens her defence choice (shot); (4) a spy on a guilty consort still finds the real deed.
   usage: NODE_PATH=$(npm root -g) node dev/test/evtruth-oldsave.js http://127.0.0.1:PORT/index.html outdir [WxH,...] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,VS]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sizes=(VS||'390x844,1180x820').split(',').map(s=>s.split('x').map(Number));
(async()=>{const b=await chromium.launch();const res={};const errs=[];
 for(const [w,h] of sizes){const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');await p.waitForTimeout(1500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.origin);await p.waitForTimeout(800);await p.evaluate(()=>document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove()));
  const r=await p.evaluate(()=>{Q.length=0;closeModal&&closeModal();const out={};const [a,c]=liveRivals(true);
   /* 1. old save: a consort holds 3 on the clean player, the player holds 2 on a clean consort */
   for(const v of [a,c]){v.schemes=0;v.wrongs=[];v.dw=0;v.dkeys=[];v.plan=null;v.affair=null;v.scandal=0;v.inv=(v.inv||[]).filter(e=>!IT[e.k]||!IT[e.k].il)}
   S.schemes=0;S.wrongs=[];S.dw=0;a.evm={me:3};c.ev=2;delete S.truthV;const d=JSON.parse(JSON.stringify(ser()));deser(d);
   const a2=RV(a.id),c2=RV(c.id);out.old={evOnMe:evG(a2,S),rumOnMe:rumG(a2,S),myEv:evG(S,c2),myRum:rumG(S,c2),intel:(j78facts(a2).find(f=>f.k==="rumme")||{}).txt||""};
   /* 2. a spy on the clean player */
   const R0=Math.random;Math.random=()=>0.01;let txt="";try{txt=ACT.spy.f(a2,S)}finally{Math.random=R0}out.spyMe=txt;out.evAfterSpy=evG(a2,S);
   /* 4. a spy on a guilty consort: she poisoned someone */
   deedAdd(c2,"poison",a2);Math.random=()=>0.01;let t2="";try{t2=ACT.spy.f(S,c2)}finally{Math.random=R0}out.spyGuilty=t2;out.evOnGuilty=evG(S,c2);
   /* the news card as the j70 notice draws it */
   const n=note70({a:a2,k:"spy",ok:true,mo:motNow70(a2),by:[],self:[],gain:0,snap:{danh:S.danh,sung:S.sung,suc:S.suc,duc:S.duc,rank:S.rank,preg:S.preg,kids:(S.kids||[]).length,cold:S.out,scar:S.scar},body:txt+" (sai Tiểu Phúc Tử đi)",known:false});
   out.news=n;Q.push({t:"Tin trong cung buổi này",kind:"news",h:`<p class="past">${when()}</p><p>${n}</p>`});showModal();return out});
  await p.waitForTimeout(700);await p.evaluate(()=>document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/news-${w}x${h}.png`});
  const rows=await p.evaluate(()=>[...document.querySelectorAll('#modal .kfact .kft')].map(e=>e.textContent.trim()));
  r.rows=rows;
  const f=await p.evaluate(()=>{closeModal();Q.length=0;const a=liveRivals(true)[0];ACTX.a=a;let d;try{d=framed(S,"bị vu dùng bùa ngải")}finally{ACTX.a=null}showModal();return{d,q:Q.length,t:Q[0]&&Q[0].t,opts:(Q[0]&&Q[0].opts||[]).map(o=>o.n)}});
  await p.waitForTimeout(700);await p.evaluate(()=>document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/frame-${w}x${h}.png`});r.frame=f;
  res[w+'x'+h]=r;await p.close()}
 console.log(JSON.stringify({res,errs},null,1));await b.close()})();
