/* coop-steal (owner OD 16/11 22:45Z FINAL + 22:50Z defence + 20:32Z co-op first): the card flip at the END of tối is the HOST's; right
   after it BOTH seats get the 10-second choice; the host collects both choices (+ the NPCs') and resolves ONCE; each seat plays its own result.
   1 NPC flipped: guest Tranh sủng (odds forced on the host) / host Thôi → the host gives the night to the friend, the guest plays her night,
     the NPC gets nothing.
   2 NPC flipped: both Tranh sủng and both succeed → the higher Sủng (host) wins; the guest gets "cũng mời được…", no Sủng loss.
   3 the GUEST flipped: guest Giữ chân Hoàng thượng (holds) / host Tranh sủng (fails) → the guest keeps it + the defence line; host's stealFail.
   4 the HOST flipped (mirror of 3): host Giữ chân Hoàng thượng (holds) / guest Tranh sủng (fails) → the host keeps it + the defence gain line;
     the guest's stealFail line on her own seat.
   5 AFK guest: an NPC flipped, the host Thôi, the guest never touches her choice → her own 10-second clock answers Thôi → the host resolves
     (long before the host's choice.waitMs cap); the NPC keeps the night.
   Every case (owner gate, MAIN ROOT-82 20/11 22:58Z): the night record of the day (nightWhy: the card turned, who holds it, why) is the SAME on both
   seats (seat-neutral: host / guest / NPC id); case 1 also plays the guest's won night to its end in the live room (her Kính sự phòng book).
   usage: node dev/build/assemble.py && node dev/test/coop-steal.js [outdir] [workerURL]   (LIVE Worker, like coop-night.js) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-steal'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;window.__forceOrigin='cn'/* a palace consort on both seats (the servant / home routes have no flip choice) */},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{
   
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.kph button')].find(x=>/✕/.test(x.textContent));/* kit look-up panels (Tâm trạng · X) close with their ✕ */if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
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
 /* why a seat was offered no choice: its own eligibility (canAtt: nightCh / ntCan / cycle tray) */
 const ELs=`window.EL=()=>({ch:nightCh(S),ch0:window.__T?__T.nc(S):null,preg:S.preg,ill:S.ill&&S.ill.k,conf:S.confined,out:S.out,blk:S.block,ntr:window.ntReason?ntReason(S):null,tray:window.cyTray?cyTray(S):null,ntTry:S.ntTry,ntk:S.ntk,d:wk()})`;
 for(const o of [A,B])await o.p.evaluate(ELs);
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
 const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,date:[S.year,S.month,S.tuan,S.turn].join('/'),pend:!!COOPW.pend,sent:COOPW.sent,nr:COOPW.nrdy,
   ready:!!(COOPW.nReady&&COOPW.nReady()),next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,Q:Q.length,tr:(COOPW.tr||[]).slice(-6)}));
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   /* press only a seat that is still behind: a press at tối is "Sang ngày mới" = that seat's commit, i.e. the flip would run before the case's
      force() (an unforced card); a seat already at tối waits for the other */
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);
   const pa=a.b<LAST||a.w<c.w,pb=c.b<LAST||c.w<a.w;if(pa)await press(A);if(pb)await press(B);
   if(pa&&pb)await bothPast(A,B,k,30000);else await sleep(1500);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 ok(await toNight('1'),'1: at tối');
 /* jsmg (steal mini-game, added after this test): an attack pick opens ONE short game first; both players skip it here («Thôi, không chơi»:
    odds unchanged) through jsmg's own test hook, so the guest's choice goes out after her game exactly as in play (smg "mg" → "up" → jnf "ch") */
 for(const o of [A,B])await o.p.evaluate(()=>{window.__smgFake=()=>({skipped:true,sync:true})});
 /* the host's Emperor turns the card of `who` at the END of tối (forced weights; no mùng 1 / rằm custom); NPCs do not attack on their own */
 const force=(who)=>A.p.evaluate(who=>{const f=liveRivals(false).find(v=>v.coop);const tgt=who==="friend"?f:who==="host"?S:(liveRivals(false).find(x=>x&&!x.coop&&nightCh(x)>0)||liveRivals(false).find(x=>x&&!x.coop));
   window.__T=window.__T||{nc:nightCh,rl:roll,cu:BAL.ag.emp.custom,vc:BAL.visit.cap,os:oSteal,ok:oKeep,sw:window.stealWant,es:typeof empSummon==='function'?empSummon:null,ea:window.__eaOff,ep:typeof empPick==='function'?empPick:null};const T=window.__T;
   const isT=p=>p===tgt||(who==="friend"&&!!p&&!!p.coop)/* the friend entry is rebuilt at each merged week (pushFriend): match by role, not object */;nightCh=function(p){p=p||S;return isT(p)?100:(p===S||(p&&p.coop))?1e-9/* both players may try tonight (a world event / route / illness can rightly block a seat on some nights: not the rule under test) */:(T.nc(p)>0?1e-9:0)};roll=function(x){return x===90||x===65?true:T.rl.apply(this,arguments)};BAL.ag.emp.custom=[0,0];BAL.visit.cap=0;/* his own visit (jvisit) would take the night before the flip: no choice (same as night-final.js) */
   window.stealWant=()=>({u:0,p:0,mode:null});/* the card is TURNED tonight: his rest roll (jagemp empSummon: busy/mood) and the emotion no-flip (jemoact eaQ) are live-game randomness that turn no card at all — held off here, the choice itself is the thing under test */if(T.es)empSummon=function(){try{const z=empWhyZ();z.k='call';z.busy=false}catch(e){}return true};/* his pick: the forced card itself (jagmaid's pool — a maid he remembers — would take the night with no card at all) */if(T.ep)empPick=function(C){const t=C.find(isT);if(!t)return T.ep.apply(this,arguments);try{const z=empWhyZ();z.pick=key(t);z.k='call'}catch(e){}return t};
   /* the night's own rolls (draws inside resolveAll / nfResolve only, as night-final.js T.seq) read .5: the forced odds (99 / 1, clamped) then
      decide exactly; every other draw stays random */if(!T.mr){T.mr=Math.random;Math.random=function(){return /\b(nfResolve|resolveAll)\b/.test(new Error().stack||"")?.5:T.mr()}}
   /* fixture diagnosis: her eligibility at the moment the choice opens */window.__ELsnap=window.__ELsnap||{};if(!window.__ELint)window.__ELint=setInterval(()=>{try{const x=S.nfX;if(x&&x.st!=="wait"&&!__ELsnap[x.d])__ELsnap[x.d]=Object.assign(window.EL?EL():{},{role:x.role,t:x.t,st:x.st,nfC:S.nfC})}catch(e){}},50);window.__eaOff=true;S.cyb=Object.assign(S.cyb||{},{lie:wk()});return{id:tgt===S?"me":tgt.id,n:(tgt===S?S.nights:tgt.nights)||0,coop:!!tgt.coop}},who);
 const unforce=async()=>{await B.p.evaluate(()=>{if(window.__TB)nightCh=window.__TB.nc});return unforce0()};
 const unforce0=()=>A.p.evaluate(()=>{const T=window.__T;if(!T)return;nightCh=T.nc;roll=T.rl;BAL.ag.emp.custom=T.cu;BAL.visit.cap=T.vc;oSteal=T.os;oKeep=T.ok;window.stealWant=T.sw;if(T.es)empSummon=T.es;if(T.ep)empPick=T.ep;window.__eaOff=T.ea;if(T.mr){Math.random=T.mr;T.mr=null}});
 /* not her Kỳ nguyệt tuần (as night-final T.noCyc): with only {lie} the cycle could still ask, the fixture's clear() answered «Báo đúng ngày» and
    Kính sự phòng put her card away → another card was turned (case 3 «flipped guest gets the defence choice» red, NLC #7/#8/#9) */
 const noCyc=o=>o.p.evaluate(()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"})});
 /* each case starts with both players able to serve tonight: a night played to its end in an earlier case (case 1 her won night, case 2 his)
    can leave a seat pregnant / ill, and then that seat is rightly offered no attack — fixture state, not the rule under test */
 const fit=o=>o.p.evaluate(()=>{const c=p=>{if(!p)return;p.preg=0;p.pregUnk=0;p.ill=null;p.confined=0;p.block=0};c(S);c(liveRivals(false).find(v=>v&&v.coop));S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"});
   return nightCh(S)>0});
 const fitBoth=async tag=>{const a=await fit(A),c=await fit(B);if(!a||!c)console.log('fit',tag,a,c);
   /* the guest's own role is read on her seat (roleOf → canAtt → her nightCh): she may try tonight too (restored by unforce) */
   await B.p.evaluate(()=>{window.__TB=window.__TB||{nc:nightCh};const T=window.__TB;nightCh=function(p){p=p||S;const c=T.nc(p);return p===S?Math.max(c,1e-9):c}})};
 /* answer the flip choice (pid nfch) with `name`; the card-flip scene (if on screen) is closed by its own button first */
 async function answer(o,name,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(name=>{const i=Q.findIndex(m=>m&&m.pid==="nfch");
    if(i>=0&&name===null){if(i>0){Q.unshift(Q.splice(i,1)[0]);showModal()}else if(document.getElementById('modal').hidden)showModal();return Q[0].opts.map(x=>x.n).join("/")}/* AFK: the choice is on her screen, untouched */
    if(i>=0){if(i>0)Q.unshift(Q.splice(i,1)[0]);const O=Q[0].opts;const names=O.map(x=>x.n).join("/");let j=O.findIndex(x=>x.n===name);if(j<0)j=O.findIndex(x=>x.n==="Thôi");chooseM(j);return names}
    const dw=document.getElementById('dawn');if(dw&&!dw.hidden&&dw.classList.contains('on')){const nb=[...dw.querySelectorAll('button')].find(x=>x.getClientRects().length);if(nb)nb.click();else{dw.classList.remove('on');dw.hidden=true}try{kmPump()}catch(e){}return ''}/* the morning panel («Tiếp theo») a player taps through; while it is on, the scene queue waits (kmFree) */
    const b=[...document.querySelectorAll('.kmov.kcf button')].find(x=>x.getClientRects().length);if(b){b.click();return ''}/* real buttons only: a [role=button] there is a mood seal (img.kemo), not the scene's end button */
    const m=document.getElementById('modal');if(m&&!m.hidden&&Q[0]&&Q[0].pid!=="nfch")return 'other';
    const k=[...document.querySelectorAll('.kmov')].find(e=>e.getClientRects().length&&!e.classList.contains('kcf'));if(k){const bb=[...k.querySelectorAll('button')].find(x=>x.getClientRects().length);(bb||k).click()}return ''},name).catch(()=>'');
   if(r==='other'){await clear(o,1);await sleep(200);continue}
   if(r===''&&Date.now()-t0>4000&&(Date.now()-t0)%3000<400)await press1(o);   /* the seat answered its other dialogs: press "Sang ngày mới" again (the commit runs on the first press with nothing open) */   /* another dialog (mood, news…) sits over the scene: the player answers it first */
   if(r)return r;
   if(!STUCK[o.name]&&Date.now()-t0>15000){STUCK[o.name]=await o.p.evaluate(()=>({kmov:[...document.querySelectorAll('.kmov')].map(e=>e.className+(e.offsetParent?'':'(hidden)')),dawn:!!document.getElementById('dawn'),
     modal:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent,Q:Q.map(m=>m.pid||m.t),busy:window.cfBusy&&cfBusy(),cf:(window.__cfdbg||[]).slice(-6),x:S.nfX})).catch(e=>e.message);console.log('STUCK',o.name,JSON.stringify(STUCK[o.name]).slice(0,900))}
   await sleep(300)}return null}
 const STUCK={};
 /* why a night turned no card (fixture diagnosis only; printed with a failed choice assert) */
 const DG=()=>A.p.evaluate(()=>({x:S.nfX,nw:S.nightWhy&&{wk:S.nightWhy.wk,c:S.nightWhy.cause,f:S.nightWhy.flip0,emp:S.nightWhy.emp},cyb:S.cyb,cyc:window.cycOn&&cycOn(S),hold:COOPW.cyHold,fcy:COOPW.fcy,tr:(COOPW.tr||[]).slice(-12),buoi:S.buoi,tq:S.tuan,lg:S.logs.slice(0,5),el:EL(),snap:window.__ELsnap})).catch(e=>e.message);
 /* both press "Sang ngày mới" at tối: the host's commit turns the card and opens the choice on both seats */
 async function endEvening(){await setTm(A,{buoiMs:120000});await reset(A);await press1(A);await press1(B)}
 const nightOf=(o,id)=>o.p.evaluate(id=>(liveRivals(false).find(v=>v.id===id)||{}).nights||0,id);
 async function nextNight(tag){for(let i=0;i<40;i++){await clear(A);await clear(B);const a=await D(A),c=await D(B);if(a.b===0&&c.b===0&&!a.Q&&!c.Q&&a.w===c.w)break;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await press(A);await press(B);await bothPast(A,B,k,30000)}
  return toNight(tag)}
 /* the forced card must be allowed on the tray tonight: in her Kỳ nguyệt tuần (jcycle cyBase(name).t — a random name puts ~1 night in 3 there)
    Kính sự phòng rightly puts it away and the Emperor turns another card (case 3/4 red, NLC #7/#8/#9). A player's night there is no test of the
    choice: play on to the next tối (at most 3 tuần) */
 /* also a night already taken today on either seat (his visit, a summons, a day event that brings him — j75 ntTaken): no flip tonight, the case's
    forced card would never be turned (coop-steal #3 run 3, NLC #10: case 1 at day 0, the host's night taken by a day event) → the next tối too */
 async function cycFree(who){for(let g=0;g<3;g++){const on=await A.p.evaluate(w=>{if(typeof window.ntTaken==="function"&&window.ntTaken())return "taken";if(!w)return false;const p=w==="friend"?liveRivals(false).find(v=>v&&v.coop):S;return !!(p&&typeof window.cycOn==="function"&&window.cycOn(p))},who).catch(()=>false)||await B.p.evaluate(()=>typeof window.ntTaken==="function"&&!!window.ntTaken()&&"taken").catch(()=>false);
   if(!on)return true;console.log('cycFree',who,on==="taken"?'night already taken':'Kỳ nguyệt tuần','→ next night');if(!await nextNight('cyc'))return false}return true}
 /* the night record of day d on one seat, seat-neutral (host / guest / NPC id): the card turned, who holds the night, why */
 const rec=(o,d)=>o.p.evaluate(d=>{const SEAT=COOP.seat==="a"?"host":"guest",OTH=SEAT==="host"?"guest":"host";const f=liveRivals(false).find(v=>v&&v.coop);
   const n=id=>id==null?null:id==="me"?SEAT:(f&&id===f.id)?OTH:id;const w=S.nightWhy;if(!w||w.wk!==d)return{none:1,wk:w&&w.wk};return{flip0:n(w.flip0),pick:n(w.pick),cause:w.cause}},d);
 async function sameRec(tag,d){let a=null,c=null;const t0=Date.now();while(Date.now()-t0<20000){a=await rec(A,d);c=await rec(B,d);if(JSON.stringify(a)===JSON.stringify(c))break;await sleep(500)}
  return ok(!a.none&&JSON.stringify(a)===JSON.stringify(c),tag+': the night record of the day is the same on both seats (card turned, holder, why)',[a,c])}
 /* play one seat's dialogs / scenes the way a player does (first offered option) until cond holds */
 async function drive(o,cond,arg,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(cond,arg).catch(()=>false))return true;
   await o.p.evaluate(()=>{const dw=document.getElementById('dawn');if(dw&&!dw.hidden&&dw.classList.contains('on')){const nb=[...dw.querySelectorAll('button')].find(x=>x.getClientRects().length);if(nb)nb.click()}
     const k=[...document.querySelectorAll('.kmov')].find(e=>e.getClientRects().length);if(k){const bb=[...k.querySelectorAll('button')].find(x=>x.getClientRects().length);if(bb)bb.click()}}).catch(()=>{});
   await clear(o,2);await sleep(300)}return false}
 /* 1. the host's Emperor turns an NPC's card; BOTH seats get the choice; the guest's Tranh sủng is resolved once on the host → her night */
 /* her won night needs her out of her Kỳ nguyệt tuần: fit() marks a lie to the book (cyb.lie), and in her cycle tuần the Kính sự phòng mama checks
    before the sedan (jcycle nightScene, roll cyLieO) and rightly takes the night (case 1 red 2 in 15, NLC #10 trace): play on to a free tối (as 3/4) */
 ok(await cycFree('friend'),'1: at tối, the guest out of her Kỳ nguyệt tuần');
 await fitBoth('1');let H=await force("npc");await noCyc(B);await A.p.evaluate(()=>{oSteal=()=>100;oKeep=()=>0/* the flipped NPC's own defence (nfOdds keep → rung down) never holds here */});/* the friend's odds are read on the host */
 await endEvening();
 const [c1,h1]=await Promise.all([answer(B,"Tranh sủng"),answer(A,"Thôi")]);/* both seats at the same time (order never matters) */
 ok(c1==="Tranh sủng/Chặn ngự giá/Thôi"&&h1==="Tranh sủng/Chặn ngự giá/Thôi",'1: both seats get the attacker choice after the flip',[c1,h1,c1==="Tranh sủng/Chặn ngự giá/Thôi"&&h1==="Tranh sủng/Chặn ngự giá/Thôi"?'':[await DG(),await B.p.evaluate(()=>EL())]]);
 const fid=await A.p.evaluate(()=>(liveRivals(false).find(v=>v.coop)||{}).id);const d1=await A.p.evaluate(()=>S.nfX&&S.nfX.d);
 ok(await until(A,`S.ntk&&S.ntk.w===${d1}&&S.ntk.who===${fid}&&S.nfX&&S.nfX.d===${d1}&&S.nfX.st==="done"`,null,30000),'1: host gives the night to the friend (decided once: the night record of that day = the friend; S.tonight itself is cleared on the host once her night is hers)',await A.p.evaluate(()=>nfDebug()));
 ok(await until(B,()=>S.tonight==="me"&&(S.nfN===wk()||Q.some(m=>m.pid==="nfsum"||m.pid==="prep")),null,30000),'1: guest plays her own night (summons → sequence)',await B.p.evaluate(()=>({d:nfDebug(),Q:Q.map(m=>m.pid)})));
 ok(await nightOf(A,H.id)===H.n,'1: the flipped NPC got no night',[H.n,await nightOf(A,H.id)]);
 await sameRec('1',d1);
 ok(await drive(B,d=>(S.nightLog||[]).includes(d)&&S.nfN===d,d1),'1: the guest\'s won night plays to its end on HER seat (her Kính sự phòng book has the night)',await B.p.evaluate(()=>({d:nfDebug(),log:(S.nightLog||[]).slice(-3)})));
 await unforce();
 /* 2. both seats attack: two successes → the higher Sủng (host) takes it; the guest's success that lost the tie costs nothing */
 ok(await nextNight('2')&&await cycFree('host'),'2: at tối again');
 await fitBoth('2');H=await force("npc");await A.p.evaluate(()=>{oSteal=()=>100;oKeep=()=>0;S.sung=80;const f=liveRivals(false).find(v=>v.coop);if(f)f.sung=20});
 const s0=await B.p.evaluate(()=>{S.sung=20;S.cyb=Object.assign(S.cyb||{},{lie:wk()});return S.sung});
 await endEvening();
 const [c2,h2]=await Promise.all([answer(B,"Tranh sủng"),answer(A,"Tranh sủng")]);ok(!!c2&&!!h2,'2: both chose Tranh sủng',[c2,h2,c2==="Tranh sủng/Chặn ngự giá/Thôi"&&h2==="Tranh sủng/Chặn ngự giá/Thôi"?'':[await DG(),await B.p.evaluate(()=>EL())]]);
 ok(await until(A,()=>S.tonight==="me"||S.nfN===wk(),null,30000),'2: the higher Sủng (host) wins',await A.p.evaluate(()=>nfDebug()));
 const d2=await A.p.evaluate(()=>S.nfX&&S.nfX.d);
 ok(await until(B,d=>(S.tonight&&S.tonight!=="me"&&S.tonight.coop)||(S.ntk&&S.ntk.w===d&&S.ntk.who===(liveRivals(false).find(v=>v&&v.coop)||{}).id),d2,30000),'2: guest sees the host holding it (her record of the day: the host)',await B.p.evaluate(()=>nfDebug()));
 await sameRec('2',d2);
 const g=await B.p.evaluate(()=>{const i=S.logs.findIndex(l=>/cũng mời được/.test(l));const newer=i<0?[]:S.logs.slice(0,i);
   /* the weekly fade («ân sủng nhạt dần») that can land after her night is not a steal loss: added back */
   const fade=newer.reduce((s,l)=>{const m=/nhạt dần: <span class="r">Sủng -(\d+)/.exec(l);return s+(m?+m[1]:0)},0);return{sung:S.sung,fade,line:i<0?S.logs.slice(0,8).join(" "):S.logs[i]}});
 ok(g.sung+g.fade===s0&&/^(<[^>]*>[^<]*<\/span>)?Ngươi cũng mời được Hoàng thượng, nhưng ngài chọn sang cung /.test(g.line.replace(/<span class="ld">[^<]*<\/span>/,""))&&!/cung ngươi/.test(g.line),'2: guest: no Sủng loss, the "Ngươi cũng mời được … sang cung <host>" line (her view)',g);
 await unforce();
 /* 3. the GUEST is flipped: she presses Giữ chân Hoàng thượng (odds read on the host, forced to hold); the host's Tranh sủng fails → she keeps it + keepSung */
 ok(await nextNight('3')&&await cycFree('friend'),'3: at tối again');
 await fitBoth('3');H=await force("friend");await noCyc(B);await A.p.evaluate(()=>{oSteal=()=>1;oKeep=()=>99});
 await endEvening();
 const [c3,h3]=await Promise.all([answer(B,"Giữ chân Hoàng thượng"),answer(A,"Tranh sủng")]);
 ok(c3==="Giữ chân Hoàng thượng/Thôi"&&h3==="Tranh sủng/Chặn ngự giá/Thôi",'3: the flipped guest gets the defence choice, the host the attack',[c3,h3,c3==="Giữ chân Hoàng thượng/Thôi"&&h3==="Tranh sủng/Chặn ngự giá/Thôi"?'':[await DG(),await B.p.evaluate(()=>EL())]]);
 ok(await until(B,()=>S.tonight==="me"&&(S.nfN===wk()||Q.some(m=>m.pid==="ksp"||m.pid==="prep"))&&S.logs.slice(0,10).join(" ").includes("không ai giành được"),null,30000),'3: guest keeps her night, the defence gain line',await B.p.evaluate(()=>({d:nfDebug(),Q:Q.map(m=>m.pid),L:S.logs.slice(0,6)})));
 const d3=await A.p.evaluate(()=>S.nfX&&S.nfX.d);
 ok(await until(A,`S.nfX&&S.nfX.d===${d3}&&S.nfX.st==="done"&&S.nfX.fr==="keep"&&S.nfX.def&&S.nfX.def.ok===1&&S.nfX.me==="feign"&&S.logs.slice(0,40).join(" ").includes("không động lòng")`,null,30000),'3: host: the friend still holds, the host\'s try failed (stealFail line)',await A.p.evaluate(()=>({d:nfDebug(),L:S.logs.slice(0,6)})));
 await sameRec('3',d3);
 await unforce();
 /* 4. the HOST is flipped (mirror of 3): the host presses Giữ chân Hoàng thượng (forced to hold); the guest's Tranh sủng fails (odds read on the host)
    → the host keeps it + the defence gain line; the guest gets her own stealFail line on her seat; no night for her */
 ok(await nextNight('4')&&await cycFree('host'),'4: at tối again');
 await fitBoth('4');H=await force("host");await noCyc(B);await A.p.evaluate(()=>{oSteal=()=>1;oKeep=()=>99});
 const n4=await B.p.evaluate(()=>(S.nightLog||[]).length);
 await endEvening();
 const [c4,h4]=await Promise.all([answer(B,"Tranh sủng"),answer(A,"Giữ chân Hoàng thượng")]);
 ok(h4==="Giữ chân Hoàng thượng/Thôi"&&c4==="Tranh sủng/Chặn ngự giá/Thôi",'4: the flipped host gets the defence choice, the guest the attack',[h4,c4,h4==="Giữ chân Hoàng thượng/Thôi"&&c4==="Tranh sủng/Chặn ngự giá/Thôi"?'':[await DG(),await B.p.evaluate(()=>EL())]]);
 const d4=await A.p.evaluate(()=>S.nfX&&S.nfX.d);
 ok(await until(A,`S.nfX&&S.nfX.d===${d4}&&S.nfX.st==="done"&&S.nfX.me==="keep"&&S.nfX.fr==="feign"&&S.nfX.def&&S.nfX.def.ok===1&&S.logs.slice(0,40).join(" ").includes("không ai giành được Hoàng thượng khỏi ngươi")`,null,30000),'4: host keeps his night, the defence gain line',await A.p.evaluate(()=>({d:nfDebug(),L:S.logs.slice(0,6)})));
 ok(await until(B,d=>S.nfFin===d&&S.logs.slice(0,40).join(" ").includes("không động lòng")&&!(S.nightLog||[]).includes(d),d4,30000),'4: guest: her try failed (her own stealFail line), no night for her',await B.p.evaluate(()=>({d:nfDebug(),L:S.logs.slice(0,6)})));
 await sameRec('4',d4);
 await unforce();
 /* 5. AFK guest: an NPC is flipped, the host answers Thôi at once, the guest never touches her choice → HER 10-second clock (BAL.steal.choice.ms)
    answers Thôi → the host resolves long before its own cap (choice.waitMs); the NPC keeps the night */
 ok(await nextNight('5')&&await cycFree(null),'5: at tối again');
 await fitBoth('5');H=await force("npc");await noCyc(B);await A.p.evaluate(()=>{oSteal=()=>100;oKeep=()=>0});
 await endEvening();
 const [c5,h5]=await Promise.all([answer(B,null),answer(A,"Thôi")]);
 const t5=Date.now();const CH=await A.p.evaluate(()=>BAL.steal.choice);
 ok(c5==="Tranh sủng/Chặn ngự giá/Thôi"&&!!h5,'5: the guest\'s choice is on her screen (she does not touch it)',[c5,h5,c5==="Tranh sủng/Chặn ngự giá/Thôi"&&h5?'':[await DG(),await B.p.evaluate(()=>EL())]]);
 const d5=await A.p.evaluate(()=>S.nfX&&S.nfX.d);
 ok(await until(B,d=>S.nfX&&S.nfX.d===d&&S.nfX.me===null&&S.nfX.st==="done"&&!Q.some(m=>m&&m.pid==="nfch"),d5,CH.ms+20000),'5: guest: her clock answered Thôi (no choice left on her screen)',await B.p.evaluate(()=>nfDebug()));
 ok(await until(A,`S.nfX&&S.nfX.d===${d5}&&S.nfX.st==="done"&&S.nfX.fr===null`,null,CH.ms+20000),'5: host: the friend counted as Thôi, resolved once',await A.p.evaluate(()=>nfDebug()));
 const dt5=Date.now()-t5;ok(dt5<CH.waitMs,'5: resolved by her own 10-second clock, not the host\'s cap',{ms:dt5,clock:CH.ms,cap:CH.waitMs});
 ok(await nightOf(A,H.id)>=H.n&&await B.p.evaluate(d=>!(S.nightLog||[]).includes(d),d5),'5: no night for the AFK guest');
 await sameRec('5',d5);
 await unforce();
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
