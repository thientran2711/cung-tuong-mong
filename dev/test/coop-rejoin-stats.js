/* review/coop-night-sync-r1: rejoin of host and of guest mid-buổi; both seats keep stats/khắc/buổi, clock runs on both, the stayer is not stuck,
   and the next week merge keeps both seats gains (owner CRITICAL 23->10). usage: node dev/test/coop-rejoin-stats.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-night'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]');if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 ok(await A.p.evaluate(()=>{const r=document.querySelector('#modal .kctmlen');return !!r&&/Mỗi buổi tối đa/.test(r.textContent)&&/✓ 5 phút/.test(r.textContent)}),'lobby: host sees Mỗi buổi tối đa 3 / 5 / 8 phút (5 chosen)');
 await join(B,code);
 ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.base&&typeof S!=='undefined'&&S)),c=await B.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.base&&typeof S!=='undefined'&&S));if(a&&c)break;await sleep(500)}}
 /* both through Luân hồi (the roulette, then Nhận thân phận) and into the game */
 {const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}
  const dbg=o=>o.p.evaluate(()=>({on:COOPW.on,S:typeof S!=='undefined'&&!!S,inLife:COOPW.inLife,title:document.getElementById('title').hidden,roul:!!document.querySelector('[id^="kroul"],.kroul-ov'),next:!!document.getElementById('next').offsetParent,M:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent})).catch(e=>e.message);
  ok(await inGame(A)&&await inGame(B),'both chose their thân phận and are in the game',[await dbg(A),await dbg(B)])}
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(400)}
 ok(await until(A,()=>!!COOPW.tm.view(),null,20000)&&await until(B,()=>!!COOPW.tm.view(),null,20000),'both see the clock');
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
 const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,date:[S.year,S.month,S.tuan,S.turn].join('/'),pend:!!COOPW.pend,ready:!!(COOPW.nReady&&COOPW.nReady())}));
 const ST=o=>o.p.evaluate(()=>{const f=COOPW.friend&&COOPW.friend();return {u:used,tai:S.tai,sac:S.sac,danh:S.danh,k:COOPW.tm.myKey(),w:COOP.state.week,ftai:f?f.tai:null,fsac:f?f.sac:null}});
 async function rejoinHost(){await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/);await A.p.waitForTimeout(600);await tapText(A,/^Trở lại phòng/);
   return until(A,()=>COOP.seat==='a'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000)}
 async function leaveBack(X,Y,tag){await X.p.close();ok(await until(Y,()=>COOP.frozen,null,60000),tag+': '+Y.name+' sees the wait');
  const back=X===A?await rejoinHost():(await join(B,code),await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000));
  ok(back,tag+': '+X.name+' back');for(let i=0;i<4;i++){await clear(X);await clear(Y);await sleep(300)}}
 /* timer: running and counting down on both after the rejoin */
 async function clockRuns(tag){const v0a=await A.p.evaluate(()=>COOPW.tm.view()),v0b=await B.p.evaluate(()=>COOPW.tm.view());await sleep(3000);
  const v1a=await A.p.evaluate(()=>COOPW.tm.view()),v1b=await B.p.evaluate(()=>COOPW.tm.view());
  ok(v0a&&v1a&&v1a.run&&v1a.left<v0a.left&&v0b&&v1b&&v1b.run&&v1b.left<v0b.left&&v1a.key===v1b.key&&Math.abs(v1a.left-v1b.left)<4000,tag+': clock runs + counts down on both, same buổi',[v0a,v1a,v0b,v1b])}
 const rd=o=>o.p.evaluate(()=>!!(COOPW.bend||(COOPW.nReady&&COOPW.nReady())||COOPW.pend));
 const Ok=o=>o.p.evaluate(()=>{const n=document.getElementById('next');return {frozen:!!COOP.frozen,dis:n.disabled,next:n.textContent,k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),Q:Q.length,bend:COOPW.bend,pb:!!COOPW.pendBuoi,tr:(COOPW.tr||[]).slice(-6)}});
 /* one buổi step for both: each presses once (unless already ready), wait until both moved past k */
 async function step1(k){for(let i=0;i<2;i++){await clear(A);await clear(B)}
  const a=await rd(A)||await press(A,15000),c=await rd(B)||await press(B,15000);return a&&c&&await bothPast(A,B,k,30000)>=0}
 async function nextWeek(w0){for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)return true;
   if(a.w>w0||c.w>w0){await sleep(500);continue}const k=await A.p.evaluate(()=>COOPW.tm.myKey());await step1(k)}
  const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)return true;await sleep(500)}return false}
 async function toDay(){for(let g=0;g<6;g++){const a=await D(A);if(a.b<LAST)return;await nextWeek(a.w)}}
 await A.p.evaluate(()=>Object.assign(BAL.coopTm,{buoiMs:240000,pauseCapMs:6000}));await A.p.evaluate(()=>COOPW.tm.reset());
 for(const [X,Y,tag] of [[A,B,'H host rejoins'],[B,A,'G guest rejoins']]){await toDay();for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  /* both do acts in the buổi: X +5 tài +2 khắc, Y +3 sắc +1 khắc */
  await X.p.evaluate(()=>{spend(1);spend(1);S.tai+=5;render()});await Y.p.evaluate(()=>{spend(1);S.sac+=3;render()});await sleep(1800);
  const x1=await ST(X),y1=await ST(Y);
  await leaveBack(X,Y,tag);
  const x2=await ST(X),y2=await ST(Y);
  ok(x2.u===x1.u&&x2.tai===x1.tai&&x2.sac===x1.sac&&x2.k===x1.k,tag+': rejoiner keeps khắc + stats + buổi',[x1,x2]);
  ok(y2.u===y1.u&&y2.tai===y1.tai&&y2.sac===y1.sac&&y2.k===y1.k,tag+': the one who stayed keeps khắc + stats + buổi',[y1,y2]);
  await clockRuns(tag);
  /* the one who stayed is not stuck: both step the buổi */
  {const k=x2.k;ok(await step1(k),tag+': buổi steps for both after the rejoin',[await Ok(A),await Ok(B)])}
  /* through the night to the next week: the week merge keeps both seats' gains (no roll back to the week start) */
  const w0=(await D(A)).w;ok(await nextWeek(w0),tag+': next week reached');await sleep(1500);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  const x3=await ST(X),y3=await ST(Y);
  ok(x3.w===x1.w+1&&x3.tai>=x1.tai-2&&x3.tai>x1.tai-5,tag+': after the next week merge the rejoiner keeps her gains (+5 tài; natural drift <=2)',[x1,x3]);
  ok(y3.w===y1.w+1&&y3.sac>=y1.sac-2&&y3.sac>y1.sac-3,tag+': after the next week merge the other keeps her gains (+3 sắc; natural drift <=2)',[y1,y3]);
  ok(y3.ftai===x3.tai&&x3.fsac===y3.sac,tag+': each sees the friend\'s real stats after the merge',[x3,y3]);
  const a=await D(A),c=await D(B);ok(a.date===c.date&&a.w===c.w,tag+': same date + week',[a,c])}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
