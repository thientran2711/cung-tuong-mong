/* coop-emo-seat (review/emo-balance): coop-one-world-play + every NPC's emotion [kind, strength, target] and its act weights (emoMul) and the BAL.feel tables must read the SAME on both seats at every merged week (emotion effects host-computed). Base: coop-one-world-play (review/coop-one-world-r1): two seats on the LIVE Worker play 3 weeks (each with its merged week end); the guest leaves and rejoins in week 2, the host in week 3. After every merged week BOTH seats must read the SAME number for every shared world fact (owner OD 16/11 ~20:32Z: both read the same number). usage: node dev/test/coop-one-world-play.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-night'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[],asleep:false};
  /* o.asleep (case W): the device sleeps like a locked phone: frames dropped both ways, the socket never closed by the server side,
     and new sockets fail until it wakes (coop-sleep.js pattern) */
  await ctx.routeWebSocket(/\/api\/room\/[A-Za-z0-9]{4}\/ws/,ws=>{if(o.asleep){ws.close({code:1011,reason:'asleep'});return}const srv=ws.connectToServer();
    ws.onMessage(m=>{if(!o.asleep)try{srv.send(m)}catch(e){}});srv.onMessage(m=>{if(!o.asleep)try{ws.send(m)}catch(e){}});
    let pc=false;ws.onClose((c,r)=>{pc=true;try{srv.close({code:c,reason:r})}catch(e){}});srv.onClose((c,r)=>{if(pc||!o.asleep)try{ws.close({code:c,reason:r})}catch(e){}})});o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate|WebSocket/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* a manual kit scene (night-end «Nhận» #kneov, reward box): a player closes it with its own button [data-km-close] (rv night-balance-bundle, like coop-night) */const kc=[...document.querySelectorAll('.kmov [data-km-close]')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
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

(async()=>{/* a local Worker (wrangler dev on 127.0.0.1) needs Chromium's private-network block off: the test page is http://ctm.local */
 const b=await chromium.launch(/\/\/(127\.0\.0\.1|localhost)[:/]/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,LocalNetworkAccessChecks']}:{});
 let A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);const ALL=[A,B];
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
 const ST=o=>o.p.evaluate(()=>{const f=COOPW.friend&&COOPW.friend();return {u:used,tai:S.tai,sac:S.sac,danh:S.danh,k:COOPW.tm.myKey(),w:COOP.state.week,ftai:f?f.tai:null,fsac:f?f.sac:null,fhome:!!(COOPW.friendHome&&COOPW.base&&COOPW.base.P&&COOPW.friendHome(COOPW.base.P[COOPW.seat==='a'?'b':'a'])),fP:(()=>{const P=COOPW.base&&COOPW.base.P&&COOPW.base.P[COOPW.seat==='a'?'b':'a'];return P?{srv:!!(P.S&&P.S.srv),dead:!!P.dead,rank:P.rank,home:P.S&&P.S.home,lc:!!(P.S&&(P.S.lc||P.S.cold))}:null})()}});
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
 /* the shared world as this seat sees it: every NPC's public numbers + the Emperor / Thái hậu / court / palace men / weather / date */
 const WORLDSRC=()=>{const N=['kmEmpDay','sung','danh','bac','suc','sac','tai','tamco','duc','rank','alive','out','queen','preg','ill','confined','lot','age'];
  const R={};for(const v of rivals){if(!v||v.coop)continue;const o={name:v.name};for(const k of N)o[k]=v[k]===undefined?null:v[k];o.kids=(v.kids||[]).map(k=>[k.name,k.alive,k.hp]);try{const m=emoGet(v);o.emo=[m.k,m.v,m.t==null?null:m.t,m.why||"",m.w==null?null:m.w];o.emoMul=['provoke','humiliate','idle','help'].map(a=>Math.round(emoMul(v,a)*1000))}catch(x){o.emo='err '+x}R[v.id]=o}
  const e=S.emp||{};const tr=S.trieu?JSON.parse(JSON.stringify(S.trieu)):null;
  return {feel:JSON.stringify([BAL.feel.w,BAL.feel.dg,BAL.feel.wd,BAL.feel.odAll,BAL.feel.loy]).length+':'+JSON.stringify(BAL.feel.w.gian)+JSON.stringify(BAL.feel.dg),date:[S.year,S.month,S.tuan,S.turn].join('/'),buoi:S.buoi||0,wk:COOP.state.week,R,emp:{mood:e.mood,ill:e.ill||null,age:e.age},thIll:S.thIll||null,thDead:!!S.thDead,
   cm:S.cm?{th:S.cm.th||null,hh:S.cm.hh||null}:null,men:(S.men||[]).map(m=>[m.id,m.name,m.age]),trieu:tr,wx:S.wx?S.wx.n:null}};
 /* the world each seat holds the moment its merged week is applied (onWeek → CW.seatWeek), before either plays on */
 const hook=o=>o.p.evaluate(src=>{if(window.__wh)return;window.__wh=1;window.__ws={};const F=eval('('+src+')');const f=COOPW.seatWeek;COOPW.seatWeek=function(){try{window.__ws[COOP.state.week]=F()}catch(e){window.__ws[COOP.state.week]={err:String(e)}}return f.apply(this,arguments)}},WORLDSRC.toString());
 const WORLD=o=>o.p.evaluate(src=>eval('('+src+')')(),WORLDSRC.toString());
 const SNAP=o=>o.p.evaluate(()=>window.__ws||{});
 function diff(a,b,pre,out){if(JSON.stringify(a)===JSON.stringify(b))return out;if(a&&b&&typeof a==='object'&&typeof b==='object'){for(const k of new Set([...Object.keys(a),...Object.keys(b)]))diff(a[k],b[k],pre+'.'+k,out);return out}
  out.push(pre+': '+JSON.stringify(a)+' | '+JSON.stringify(b));return out}
 async function same(tag){for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}const w=(await D(A)).w;const sa=await SNAP(A),sb=await SNAP(B);
  if(!sa[w]||!sb[w]){const a=await WORLD(A),c=await WORLD(B);const d=diff(a,c,'',[]);ok(d.length===0,tag+': (no merged-week snapshot on '+(!sa[w]?'A':'B')+') both seats read the same world now',d.slice(0,12));return a}
  const d=diff(sa[w],sb[w],'',[]);ok(d.length===0,tag+': at the merged week '+w+' both seats read the same world ('+Object.keys(sa[w].R).length+' NPCs, date '+sa[w].date+')',d.slice(0,12));
  const live=diff(await WORLD(A),await WORLD(B),'',[]);console.log('     (info) live view now differs on',live.length,'paths:',live.slice(0,6).join(' ; '));return sa[w]}
 await hook(A);await hook(B);await toDay();
 const w0=(await D(A)).w;await same('start');
 /* week 1: HER OWN ACT on an NPC sets that NPC's feeling (review/coop-emo-seat r2): on the guest it is recorded (S.coopEmo), the server merge keeps
    the host's feelings, and at the merged week BOTH seats replay it the same; the host marks it taken (S.emoDone), the guest then drops it */
 const WHY='thử lòng: được hảo hữu đối đãi chu đáo';
 const tgt=await B.p.evaluate(why=>{const v=rivals.find(x=>x&&!x.coop&&x.alive&&!sameHouse(S,x));if(!v)return null;
   ACT.__emoT={f:(a,t)=>{emoSet(t,'vui',40,why);return ''}};runAct(S,v,'__emoT');delete ACT.__emoT;return {id:v.id,q:(S.coopEmo||[]).length}},WHY);
 ok(tgt&&tgt.q===1,'guest: her own act on an NPC recorded once in her queue',tgt);
 ok(await nextWeek(w0),'week 1 merged on both');const W1=await same('after week 1');
 if(tgt){const cz=o=>o.p.evaluate(([id,why])=>{const v=rivals.find(x=>x&&String(x.id)===String(id));const m=(v&&v.mk||[]).filter(c=>c.why===why);return {n:m.length,s:m.map(c=>c.s),done:S.emoDone||0,q:(S.coopEmo||[]).length}},[tgt.id,WHY]);
  const ca=await cz(A),cb=await cz(B);ok(ca.n===1&&cb.n===1&&JSON.stringify(ca.s)===JSON.stringify(cb.s)&&ca.done>0,'merged week 1: her act\'s feeling is on that NPC once, the same on both seats; the host marked it taken',[ca,cb]);
  W1.__tgt=tgt}
 const E1=Object.values(W1.R||{});ok(E1.length>0&&E1.every(o=>Array.isArray(o.emo)&&Array.isArray(o.emoMul)),'emotion + act weights read on every NPC (not an error string)',E1.map(o=>[o.name,o.emo,o.emoMul]).slice(0,4));ok(typeof W1.feel==='string'&&W1.feel.length>10,'BAL.feel read on both seats',W1.feel);
 /* week 2: the guest leaves mid-week and comes back by the link */
 {const k=await A.p.evaluate(()=>COOPW.tm.myKey());await step1(k);await leaveBack(B,A,'week 2 guest');await hook(B);
  ok(await nextWeek(w0+1),'week 2 merged on both');await same('after week 2 (guest rejoined)')}
 /* week 3: the host leaves mid-week and comes back */
 {const k=await A.p.evaluate(()=>COOPW.tm.myKey());await step1(k);await leaveBack(A,B,'week 3 host');await hook(A);
  ok(await nextWeek(w0+2),'week 3 merged on both');const W3=await same('after week 3 (host rejoined)');
 if(W1.__tgt){const q=await B.p.evaluate(([id,why])=>{const v=rivals.find(x=>x&&String(x.id)===String(id));return {q:(S.coopEmo||[]).length,n:(v&&v.mk||[]).filter(c=>c.why===why).length}},[W1.__tgt.id,WHY]);ok(q.q===0&&q.n<=1,'later weeks: the guest dropped the taken entry; the feeling was never applied twice',q)}
  /* the world moved at all (not a frozen probe) */
  const moved=Object.keys(W3.R).filter(id=>W1.R[id]&&JSON.stringify(W1.R[id])!==JSON.stringify(W3.R[id])).length;ok(moved>0,'the world moved between week 1 and week 3 ('+moved+' NPCs changed)')}
 ok(A.errs.length===0&&B.errs.length===0,'no page errors',[A.errs.slice(0,3),B.errs.slice(0,3)]);
 const f=res.filter(r=>!r[0]).length;console.log((f?'FAIL':'PASS')+' coop-emo-seat '+(res.length-f)+'/'+res.length);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
