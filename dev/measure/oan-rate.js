// D-ROW37 (OB 55 «oán quá nhanh» + OD 26/11 ~18:40Z «điểm ghét, điểm oán tăng quá nhanh … giảm quá chậm»): the oán-RATE robot.
// = dev/measure/oan-pace.js (same seeded inpage6 sensible bot, same landing counts) + PER MONTH, PER SOURCE:
//  - oán toward her gained through the door (j9 oanAdd), by caller (source), each month;
//  - «ghét» toward her = liking (thiện cảm) of a consort toward her LOST, through the door (j9 affAdd n<0) by caller, each month;
//  - the WHOLE rise / fall per month read straight from every consort's score after each bot step (all = door + any direct write),
//    so «direct» = all − door shows a source outside the doors (a leak) even when no wrapper sees it.
// usage: node dev/measure/oan-rate.js <page.html> <seeds> [months=12] [seed0=0]   (env PAR, CAP, BALO as oan-pace.js)
// summary: python3 dev/measure/oan-rate-sum.py <out.jsonl>... (one file per build, label = file name)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0]=process.argv;const N=+NS||3,MONTHS=+MO||12,seed0=+S0||0,PAR=+process.env.PAR||3;
const BALO=process.env.BALO?JSON.parse(process.env.BALO):null;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${5000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(BALO)await p.evaluate(o=>{const mg=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')mg(a[k],b[k]);else a[k]=b[k]}};mg(BAL,o)},BALO);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  let src=fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8');
  src=src.replace('function modalStep(sens){','function modalStep(sens){{const m=Q[0];if(m&&/làm gì\\?|tác phẩm gì\\?/.test(m.t||"")&&!document.getElementById("modal").hidden){const B=[...document.querySelectorAll("#modal button")].filter(b=>!b.disabled&&/^\\s*Làm/.test(b.textContent));if(B.length){B[0].click();return true}}}');
  await p.evaluate(src);
  await p.evaluate(()=>{
   const D=window.__days={};const seenP=new WeakSet();
   /* the tag of every option an agent weighs (harm / scheme / help / social …): wrap each provider */
   const TG=window.__tag={};try{for(const g in AGREG)for(const k in AGREG[g]){const f=AGREG[g][k];AGREG[g][k]=function(){const O=f.apply(this,arguments);try{for(const o of O||[])if(o&&o.k&&o.tag)TG[o.k]=o.tag}catch(e){}return O}}}catch(e){}
   try{const ao=agOpts;agOpts=function(){const O=ao.apply(this,arguments);try{for(const o of O||[])if(o&&o.k&&o.tag)TG[o.k]=o.tag}catch(e){}return O}}catch(e){}
   /* a rumour that she harmed someone, spread by a consort (j95b): aimed at her too */
   try{const js=j95bSeed;j95bSeed=function(x,y){const r=js.apply(this,arguments);try{if(r&&x){const w=wk();let h=null;try{const H=BAL.net.heat;h=[Math.round(oan(x,S)),Math.round((+x.ghen||0)*H.ghenK),Math.round(Math.max(0,-aff(x,S))*H.affK)]}catch(e){}(D[w]=D[w]||[]).push(['rumor:j95b','v'+x.id,h])}}catch(e){}/* review/oan-pace-ghen: + the teller's heat parts [oán, Ghen×ghenK, dislike×affK] */return r}}catch(e){}
   const l0=agLand0;agLand0=function(pp,seen){const r=l0.apply(this,arguments);
    try{if(r&&pp&&!seenP.has(pp)){seenP.add(pp);let t=null;try{t=typeof agTgt==="function"?agTgt(pp.t):agPerson(pp.t)}catch(e){}if(t===S){const w=wk();(D[w]=D[w]||[]).push([pp.k,pp.vid!=null?'v'+pp.vid:String(pp.id||'?')])}}}catch(e){}return r};
   /* the old direct path (npcAct: rivalsTurn / j95b retaliation / j51 … when not muted by the agent loop) */
   const na=npcAct;npcAct=function(v,t){const r=na.apply(this,arguments);try{if(r&&t===S){const w=wk();(D[w]=D[w]||[]).push(['npc:act','v'+(v&&v.id)])}}catch(e){}return r};
   window.__mo=[];const mo=()=>{try{const R=rivals.filter(v=>v&&v.alive!==false&&!v.out&&!v.coop);const a=R.map(v=>{try{return oan(v,S)}catch(e){return +v.oan||0}}),g=R.map(v=>+v.ghen||0);
     const mine=R.map(v=>{try{return oan(S,v)}catch(e){return 0}});const dg=R.map(v=>{try{return danger(v,S)}catch(e){return 0}});const L=BAL.oanLv;
     window.__mo.push({m:S.turn,n:a.length,mean:a.length?+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):0,mx:a.length?Math.max(...a):0,oan:a.filter(x=>x>=L[1]).length,deep:a.filter(x=>x>=L[2]).length,
      my:mine.length?Math.max(...mine):0,ghen:g.length?+(g.reduce((x,y)=>x+y,0)/g.length).toFixed(1):0,gmx:g.length?Math.max(...g):0,g60:g.filter(x=>x>=60).length,dg:dg.length?+(dg.reduce((x,y)=>x+y,0)/dg.length).toFixed(1):0,dg30:dg.filter(x=>x>=30).length,rank:S.rank})}catch(e){}};
   window.__mo0=mo;
   const et=endTurn;endTurn=function(){const m0=S.turn;const r=et.apply(this,arguments);if(S.turn!==m0)mo();return r};
   const W=window.__src={};const who=()=>{const L=String(new Error().stack).split('\n').slice(3).map(l=>(l.match(/at (?:Object\.|window\.)?([\w$.]+)/)||[])[1]||'?').filter(f=>!/^(oanAdd|affAdd|msOanAdd|msAffAdd|relAdd|relDo|spAdd|tally|mtal|who|fa|oa|go|run|file|apply|call|Array|eval|Function|o0|a0|n0|g0|f0|r0|c0|e0|new|async|Promise)$/.test(f)&&!/^(Array|Object|Promise)\./.test(f));return L.slice(0,2).join('<')||'?'};
   const tally=(k,n)=>{if(!(n>0))return;const z=W[k]=W[k]||{};const w=who();const e=z[w]=z[w]||[0,0,0];e[0]++;e[1]+=n;e[2]=Math.max(e[2],n)};const MT=window.__msrc={};const mtal=(k,n)=>{if(!(n>0))return;const m=S.turn;const z=(MT[m]=MT[m]||{})[k]=(MT[m]||{})[k]||{};MT[m][k]=z;const w=who();z[w]=(z[w]||0)+n};
   const oa=oanAdd;oanAdd=function(x,y,n){let o0=0;try{o0=oan(x,y)}catch(e){}const r=oa.apply(this,arguments);try{if(y===S&&x!==S){const d=oan(x,y)-o0;if(d>0){tally('oan',d);mtal('oan',d)}}}catch(e){}return r};
   const fa=affAdd;affAdd=function(x,y,n){let a0=0;try{a0=aff(x,y)}catch(e){}const r=fa.apply(this,arguments);try{if(y===S&&x!==S&&n<0){const d=a0-aff(x,y);if(d>0){tally('ghet',d);mtal('ghet',d)}}}catch(e){}return r};
   /* the whole rise of oán / fall of liking toward her per month, read from the scores (door + direct writes) */
   const LS=new Map();window.__all={};window.__allTick=()=>{try{const m=S.turn;const A=window.__all[m]=window.__all[m]||{oan:0,ghet:0};for(const v of rivals){if(!v||v.coop||v.alive===false)continue;let o=0,a=0;try{o=oan(v,S);a=aff(v,S)}catch(e){}const p=LS.get(v);if(p){if(o>p[0])A.oan+=o-p[0];if(a<p[1])A.ghet+=p[1]-a}LS.set(v,[o,a])}}catch(e){}};
   /* review/oan-pace-ghen: who raised Ghen toward her (ghenUp with by = her / none), to see the causes */
   const gu=ghenUp;ghenUp=function(v,n,why,by){const r=gu.apply(this,arguments);try{if(r>0&&(by===undefined||by===S))tally('ghen',r)}catch(e){}return r};
  });
  await p.evaluate(()=>window.__mo0());
  const t0=Date.now();let end='months';
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;for(let i=0;i<12;i++){window.__bot.step(m,10);window.__allTick();if(window.__res.length>n0)break}return{t:S.turn,dead:window.__res.length>n0}},'sens');
   if(st.dead){end='died';break}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||1500)*1e3){end='cap';break}}
  const out=await p.evaluate(()=>({res:(window.__res||[]).slice(-1).map(x=>({title:x.title,fate:x.fate,turns:x.turns,rank:x.rank})),tag:window.__tag,days:window.__days,mo:window.__mo,src:window.__src,msrc:window.__msrc,all:window.__all,rank:S.rank,turn:S.turn,wk:wk(),srv:!!(typeof isSrv==='function'&&isSrv())}));
  console.log(JSON.stringify(Object.assign({seed:si,end,errs:errs.slice(0,3)},out)));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
