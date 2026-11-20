/* review/econ-tamco (ECONOMY §5, GAP OR21): Tâm cơ as its own cost + buying safety with bạc.
   usage: node dev/test/sw-serve.js <port> <repo root> (other shell); node dev/test/econ-tamco.test.js http://127.0.0.1:<port>/ <outdir> [WxH@dpr,...]
   Checks: equal value (hire = tc × BAL.tcroad.rate for every priced scheme × rank pair), the road card (3 roads + ✕, odds words, no %),
   each road charges exactly what it prints and rolls the odds it prints, NPC roads (law 1) pay the same and get the same +up, no page errors. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const fails=[];const F=(sz,m)=>fails.push(`${sz}: ${m}`);let first=true;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.addInitScript(()=>{window.__nlInner=1});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof econRoadCost==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){KMQ.length=0;start();if(!isSrv())break}
   try{KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}Q.length=0;
   const out={eq:[],keys:[]};const R=BAL.tcroad;
   /* 1. equal value over every priced scheme × every live rival */
   const priced=Object.keys(ACT).filter(k=>ACT[k].__c0);out.keys=priced;
   for(const k of priced)for(const v of liveRivals(true)){const c=econRoadCost(k,S,v);if(c.hire!==c.tc*R.rate||c.tc<R.tcMin)out.eq.push([k,v.name,c])}
   /* 2. her road card on a priced scheme she can do */
   S.bac=2000;S.tamco=60;S.khac=99;try{S.k=99}catch(e){}
   let pick=null;for(const k of ["rumor","bribe","frame","block","poison"])for(const v of liveRivals(true)){if(pick)break;const i=rivals.indexOf(v);
    if(ACT[k]&&ACT[k].__c0&&ACT[k].ok(S,v)&&!sameHouse(S,v)&&can(typeof harmK==="function"?harmK(v,k):BAL.time.cost.harm))pick={k,i,v}}
   if(!pick)return Object.assign(out,{nopick:1});
   out.pick=[pick.k,pick.v.name];Q.length=0;doAct(pick.i,pick.k);
   out.q=Q.length;const m=Q[0]||{};out.opts=(m.opts||[]).map(o=>({n:o.n,fx:o.fx,p:o.p,off:!!o.off,x:o.x}));
   out.cost=econRoadCost(pick.k,S,pick.v);out.o0=actOdds(S,pick.v,pick.k);return out});
  if(r.nopick){F(sz,"no priced scheme available to test");}
  if(r.eq&&r.eq.length)F(sz,`equal value broken: ${JSON.stringify(r.eq.slice(0,3))}`);
  if(first)console.log("priced schemes:",r.keys.join(" "),"| pick",JSON.stringify(r.pick),"| cost",JSON.stringify(r.cost),"| o0",r.o0);
  if(r.opts){if(r.opts.length!==4)F(sz,`road card has ${r.opts.length} options`);const [o1,o2,o3]=r.opts;
   if(o2&&o3&&o2.p!==o3.p)F(sz,"tc and hire roads show different odds");if(o1&&o2&&!(o2.p>o1.p||o2.p>=100))F(sz,"road gives no better odds");
   if(o2&&!new RegExp("Tâm cơ -"+r.cost.tc).test(o2.x))F(sz,"tc road cost line");if(o3&&o3.fx.bac!==-r.cost.hire)F(sz,"hire road fx");
   if(first)console.log(JSON.stringify(r.opts));}
  for(let i=0;i<120;i++){if(!(await p.evaluate(()=>/tranh người trong kiếp/i.test(document.body.innerText))))break;await sleep(1000)}
  await p.evaluate(()=>{try{KMQ.length=0;document.querySelectorAll('.kmov,#kmrew').forEach(o=>o.remove());kmBusy=false;showModal()}catch(e){}});await sleep(800);
  const ui=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&M.querySelector('.dlg');if(!M||M.hidden||!d)return{shown:false};const rc=d.getBoundingClientRect();
   return{shown:true,txt:M.textContent,inView:rc.left>=-1&&rc.right<=innerWidth+1&&rc.top>=-1&&rc.bottom<=innerHeight+1,pageOvf:document.documentElement.scrollWidth>innerWidth+1,
    opts:[...M.querySelectorAll('.opt')].length}});
  await p.screenshot({path:`${OUT}/roadpick-${wh}.jpg`,type:'jpeg',quality:55});
  if(!ui.shown)F(sz,"road card not shown");else{if(/%/.test(ui.txt))F(sz,"% in road card");if(!ui.inView)F(sz,"road card out of view");if(ui.pageOvf)F(sz,"page overflow")}
  /* 3. each road charges what it prints and freezes the odds it prints */
  const pay=await p.evaluate(()=>{const res={};const m0=Q[0];if(!m0)return null;const v=RV(m0.pp.v),k=m0.pp.k;const snap=()=>JSON.stringify([S,rivals].map(x=>x));
   for(const [ix,lab] of [[1,"tc"],[2,"hire"]]){const b0=S.bac,t0=S.tamco,pr=econSchemePrice(k,S,v);let seen=null;const r0=runAct;
    runAct=function(a,t,kk){seen=ACTFZ?ACTFZ.o:null;return r0.apply(this,arguments)};
    const ptS=window.ptHarmSend;window.ptHarmSend=null;try{Q.length=0;pushDil(mkP("roadpick",{v:v.id,k}),ACT[k].n);const o=Q[0].opts[ix];chooseM(ix);
     res[lab]={dBac:S.bac-b0,dTc:S.tamco-t0,pr,tc:econRoadCost(k,S,v).tc,fx:o.fx,p:o.p,seen}}finally{runAct=r0;window.ptHarmSend=ptS}
    S.bac=2000;S.tamco=60;S.khac=99;Q.length=0;v.block=0;}
   return res});
  if(first)console.log("pay",JSON.stringify(pay));
  if(pay){const t=pay.tc,h=pay.hire;if(t.seen!==t.p)F(sz,`tc road rolled ${t.seen} vs shown ${t.p}`);if(h.seen!==h.p)F(sz,`hire road rolled ${h.seen} vs shown ${h.p}`);
   if(t.dTc>-t.tc||t.dTc<-t.tc-3)F(sz,`tc road Tâm cơ change ${t.dTc} vs ${-t.tc}`);}
  /* 4. NPC roads (law 1): same price, same bonus */
  const npc=await p.evaluate(()=>{const R=BAL.tcroad;const L=liveRivals(true);const res={n:0,tc:0,hire:0,plain:0,bad:[]};
   for(let i=0;i<300;i++){const a=L[i%L.length],t=L[(i+1)%L.length];if(a===t||sameHouse(a,t))continue;const k=["rumor","bribe","block","frame"][i%4];if(!ACT[k]||!ACT[k].__c0)continue;
    a.bac=1000;a.tamco=70;const c=econRoadCost(k,a,t);const b0=a.bac,t0=a.tamco;let bon=null;const o0=aOdd;
    aOdd=function(o,x){const z=o0.apply(this,arguments);if(x===a&&bon==null)bon=z-o;return z};
    try{if(!ACT[k].ok(a,t))continue;ACTX=actCtx(a,t,k);try{ACT[k].f(a,t)}finally{ACTX={a:null,pen:0}}}catch(e){res.bad.push(String(e).slice(0,80))}finally{aOdd=o0}
    res.n++;const dT=a.tamco-t0;if(dT<=-c.tc)res.tc++;else if(b0-a.bac>=c.pr+c.hire)res.hire++;else res.plain++;t.block=0}
   return res});
  /* 5. one core: the plain road charges exactly the printed price (every priced scheme, NPC actor, success forced) */
  const pc=await p.evaluate(()=>{const L=liveRivals(true);const bad=[];const np=BAL.tcroad.npcP;BAL.tcroad.npcP=0;const rnd=Math.random;Math.random=()=>0;
   try{for(const k of Object.keys(ACT).filter(k=>ACT[k].__c0)){const a=L[0],t=L[1];if(!a||!t)break;a.bac=1000;a.tamco=70;if(!ACT[k].ok(a,t))continue;const pr=econSchemePrice(k,a,t);const b0=a.bac;
     ACTX=actCtx(a,t,k);try{ACT[k].f(a,t)}catch(e){}finally{ACTX={a:null,pen:0}}const d=b0-a.bac;if(d!==pr&&d!==0)bad.push([k,pr,d])}}finally{BAL.tcroad.npcP=np;Math.random=rnd}return bad});
  console.log(sz,"price scan (k, printed, charged):",JSON.stringify(pc));if(pc.length)F(sz,`price ≠ charge: ${JSON.stringify(pc)}`);
  console.log(sz,"npc roads",JSON.stringify(npc));if(npc.bad.length)F(sz,`npc errors ${npc.bad[0]}`);if(!(npc.tc>0&&npc.hire>0))F(sz,"NPCs never take a road");
  if(errs.length)F(sz,`page errors: ${errs.slice(0,3).join(" | ")}`);first=false;await ctx.close()}
 await b.close();if(fails.length){console.log("FAIL\n"+fails.join("\n"));process.exit(1)}console.log("PASS econ-tamco")})();
