/* DRESS OFFENCE BOT (review/dress-offence): the sensible bot of dev/measure/inpage4.js plays N lives x M months; every Tố xa xỉ (xx)
   and Tố vượt phẩm (vp) that really runs is counted by who → whom (npc→me, npc→npc, me→npc) and outcome (proven / waved off / false).
   Reported per 100 days (a month = 30 days). No numbers of its own: the odds, motive gate and cooldowns are BAL.lux.xx / WD (jwd92b).
   usage: [FAST=1 [LAVISH=1]] node dev/test/dress-offence-bot.js <url-or-file> [lives=4] [months=12] [seed=1]
   FAST=1: the player only answers dialogs and moves on (Sang buổi) and every NPC plays as an agent; LAVISH=1: she also wears her three most lavish within-rank pieces. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,U,NL,NM,SEED]=process.argv;const URL=/^(https?|file):/.test(U||"")?U:'file://'+path.resolve(U||path.join(__dirname,'..','index.html'));
const LIVES=+NL||4,MONTHS=+NM||12,seed=+SEED||1,FAST=process.env.FAST==='1',LAVISH=process.env.LAVISH==='1';
const INP=fs.readFileSync(path.join(__dirname,'..','measure','inpage4.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1500']});
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 if(process.env.DIFF)await ctx.addInitScript(d=>{window.__diffO=d},process.env.DIFF);
 await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[seed]);
 await ctx.route(u=>!/^file:/.test(String(u)),r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.origin,null,{timeout:120000});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroul2,.kroul').forEach(e=>e.remove())});
 await p.evaluate(INP);
 await p.evaluate(()=>{window.__dc={};const bump=(k)=>{window.__dc[k]=(window.__dc[k]||0)+1};
  const who=(a,t)=>a===S?"me→npc":t===S?"npc→me":"npc→npc";const how=r=>/>thành</.test(r||"")?"proven":/bỏ qua/.test(r||"")?"waved":"false";
  const x0=xxAccuse;xxAccuse=function(a,t){const r=x0.apply(this,arguments);if(r)bump("xx "+who(a,t)+" "+how(r));return r};
  const w0=wdAccuse;wdAccuse=function(a,t){const r=w0.apply(this,arguments);if(r)bump("vp "+who(a,t)+" "+how(r));return r};
  const ra=runAct;runAct=function(a,t,k){if(a&&a!==S)bump('npc act');return ra.apply(this,arguments)};
  const mm=mindMenu;mindMenu=function(v,t){const O=mm.apply(this,arguments);bump('npc menu');if((O||[]).some(o=>o[0]==='xx'))bump('npc menu has xx');if((O||[]).some(o=>o[0]==='vp'))bump('npc menu has vp');return O};
  const s0=spyFind;spyFind=function(a,t){bump("dò la "+who(a,t));return s0.apply(this,arguments)};
  window.__seen=()=>{let n=0,c=0;for(const v of liveRivals(true)){for(const t of [S].concat(liveRivals(true))){if(t===v)continue;if(xxCause(v,t))c++;if(dressNow(v,t))n++}}return{npcSightingsNow:n,npcXxCausesNow:c,meSightingsNow:Object.keys(S.dsn||{}).length}}});
 const out=[];let guard=0;let months=0;const t0=Date.now();
 while(out.length<LIVES&&guard<4000){guard++;
  const st=await p.evaluate(([M,E,LV])=>{if(E){/* fast mode: the player idles (optionally dressed above her allowance); every NPC plays its own turns */
    if(LV&&!window.__lv){window.__lv=1;const r=rkOf(S);const ok=Object.keys(IT).filter(k=>IT[k].sl&&["wrist","waist","scent"].includes(IT[k].sl)&&IT[k].rk!=null&&IT[k].rk<=r).sort((a,b)=>luxVal(b)-luxVal(a));for(const k of ok.slice(0,3))S.inv.push({k,w:1})}
    const m0=S.turn;for(let j=0;j<400&&S.turn===m0&&!S.dead;j++){if(Q.length||S.mg||!$('modal').hidden)window.__bot.step('sens',1);else{try{nextBuoi()}catch(e){window.__bot.step('sens',1)}}}if(S.dead)return'dead';return S.turn>=M?'done':'run'}
   for(let i=0;i<200;i++){window.__bot.step('sens',1);if(S&&S.turn>=M&&!S.dead&&!Q.length)return'done';if(S&&S.dead)return'dead'}return'run'},[MONTHS,FAST,LAVISH]);
  if(st!=='run'){const r=await p.evaluate(()=>{const x={turn:S.turn,meLux:luxOf(S),seen:window.__seen(),dc:window.__dc};window.__dc={};window.__lv=0;start();return x});months+=r.turn;out.push(r);console.error('life',out.length,JSON.stringify(r),Math.round((Date.now()-t0)/1000)+'s')}}
 const T={};for(const r of out)for(const k in r.dc)T[k]=(T[k]||0)+r.dc[k];const days=months*30;const per100={};for(const k in T)per100[k]=+(T[k]*100/days).toFixed(2);
 const BAL=await p.evaluate(()=>({xx:BAL.lux.xx,allow:BAL.lux.allow,vpCdA:WD.vpCdA,vpCdT:WD.vpCdT}));
 console.log(JSON.stringify({lives:out.length,months,days,counts:T,per100days:per100,BAL,errors:errs.length,errs:errs.slice(0,6)},null,1));await b.close()})();
