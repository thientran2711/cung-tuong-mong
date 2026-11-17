/* coop-steal (owner OD 16/11 22:45Z FINAL + 22:50Z defence + 20:32Z co-op first): the card flip at the END of tối is the HOST's; right
   after it BOTH seats get the 10-second choice; the host collects both choices (+ the NPCs') and resolves ONCE; each seat plays its own result.
   1 NPC flipped: guest Tranh sủng (odds forced on the host) / host Thôi → the host gives the night to the friend, the guest plays her night,
     the NPC gets nothing.
   2 NPC flipped: both Tranh sủng and both succeed → the higher Sủng (host) wins; the guest gets "cũng mời được…", no Sủng loss.
   3 the GUEST flipped: guest Giữ chân Hoàng thượng (holds) / host Tranh sủng (fails) → the guest keeps it + the defence line; host's stealFail.
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
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
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
 const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,date:[S.year,S.month,S.tuan,S.turn].join('/'),pend:!!COOPW.pend,sent:COOPW.sent,nr:COOPW.nrdy,
   ready:!!(COOPW.nReady&&COOPW.nReady()),next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,Q:Q.length,tr:(COOPW.tr||[]).slice(-6)}));
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);
   await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 ok(await toNight('1'),'1: at tối');
 /* the host's Emperor turns the card of `who` at the END of tối (forced weights; no mùng 1 / rằm custom); NPCs do not attack on their own */
 const force=(who)=>A.p.evaluate(who=>{const f=liveRivals(false).find(v=>v.coop);const tgt=who==="friend"?f:(liveRivals(false).find(x=>x&&!x.coop&&nightCh(x)>0)||liveRivals(false).find(x=>x&&!x.coop));
   window.__T=window.__T||{nc:nightCh,rl:roll,cu:FAIRN.custom,os:oSteal,ok:oKeep,sw:window.stealWant};const T=window.__T;
   nightCh=function(p){p=p||S;return p===tgt?100:(T.nc(p)>0?1e-9:0)};roll=function(x){return x===90||x===65?true:T.rl.apply(this,arguments)};FAIRN.custom=[0,0];
   window.stealWant=()=>({u:0,p:0,mode:null});S.cyb=Object.assign(S.cyb||{},{lie:wk()});return{id:tgt.id,n:tgt.nights||0,coop:!!tgt.coop}},who);
 const unforce=()=>A.p.evaluate(()=>{const T=window.__T;if(!T)return;nightCh=T.nc;roll=T.rl;FAIRN.custom=T.cu;oSteal=T.os;oKeep=T.ok;window.stealWant=T.sw});
 const noCyc=o=>o.p.evaluate(()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk()})});
 /* answer the flip choice (pid nfch) with `name`; the card-flip scene (if on screen) is closed by its own button first */
 async function answer(o,name,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(name=>{const i=Q.findIndex(m=>m&&m.pid==="nfch");
    if(i>=0){if(i>0)Q.unshift(Q.splice(i,1)[0]);const O=Q[0].opts;const names=O.map(x=>x.n).join("/");let j=O.findIndex(x=>x.n===name);if(j<0)j=O.findIndex(x=>x.n==="Thôi");chooseM(j);return names}
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
 /* both press "Sang ngày mới" at tối: the host's commit turns the card and opens the choice on both seats */
 async function endEvening(){await setTm(A,{buoiMs:120000});await reset(A);await press1(A);await press1(B)}
 const nightOf=(o,id)=>o.p.evaluate(id=>(liveRivals(false).find(v=>v.id===id)||{}).nights||0,id);
 async function nextNight(tag){for(let i=0;i<40;i++){await clear(A);await clear(B);const a=await D(A),c=await D(B);if(a.b===0&&c.b===0&&!a.Q&&!c.Q&&a.w===c.w)break;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await press(A);await press(B);await bothPast(A,B,k,30000)}
  return toNight(tag)}
 /* 1. the host's Emperor turns an NPC's card; BOTH seats get the choice; the guest's Tranh sủng is resolved once on the host → her night */
 let H=await force("npc");await noCyc(B);await A.p.evaluate(()=>{oSteal=()=>100});/* the friend's odds are read on the host */
 await endEvening();
 const [c1,h1]=await Promise.all([answer(B,"Tranh sủng"),answer(A,"Thôi")]);/* both seats at the same time (order never matters) */
 ok(c1==="Tranh sủng/Chặn ngự giá/Thôi"&&h1==="Tranh sủng/Chặn ngự giá/Thôi",'1: both seats get the attacker choice after the flip',[c1,h1]);
 ok(await until(A,()=>S.tonight&&S.tonight.coop&&S.ntk&&S.ntk.who===S.tonight.id,null,30000),'1: host gives the night to the friend (decided once)',await A.p.evaluate(()=>nfDebug()));
 ok(await until(B,()=>S.tonight==="me"&&(S.nfN===wk()||Q.some(m=>m.pid==="nfsum"||m.pid==="prep")),null,30000),'1: guest plays her own night (summons → sequence)',await B.p.evaluate(()=>({d:nfDebug(),Q:Q.map(m=>m.pid)})));
 ok(await nightOf(A,H.id)===H.n,'1: the flipped NPC got no night',[H.n,await nightOf(A,H.id)]);
 await unforce();
 /* 2. both seats attack: two successes → the higher Sủng (host) takes it; the guest's success that lost the tie costs nothing */
 ok(await nextNight('2'),'2: at tối again');
 H=await force("npc");await A.p.evaluate(()=>{oSteal=()=>100;S.sung=80;const f=liveRivals(false).find(v=>v.coop);if(f)f.sung=20});
 const s0=await B.p.evaluate(()=>{S.sung=20;S.cyb=Object.assign(S.cyb||{},{lie:wk()});return S.sung});
 await endEvening();
 const [c2,h2]=await Promise.all([answer(B,"Tranh sủng"),answer(A,"Tranh sủng")]);ok(!!c2&&!!h2,'2: both chose Tranh sủng',[c2,h2]);
 ok(await until(A,()=>S.tonight==="me"||S.nfN===wk(),null,30000),'2: the higher Sủng (host) wins',await A.p.evaluate(()=>nfDebug()));
 ok(await until(B,()=>S.tonight&&S.tonight!=="me"&&S.tonight.coop,null,30000),'2: guest sees the host holding it',await B.p.evaluate(()=>nfDebug()));
 const g=await B.p.evaluate(()=>({sung:S.sung,line:S.logs.slice(0,8).join(" ")}));ok(g.sung===s0&&/cũng mời được/.test(g.line),'2: guest: no Sủng loss, the "cũng mời được" line',g);
 await unforce();
 /* 3. the GUEST is flipped: she presses Giữ chân Hoàng thượng (odds read on the host, forced to hold); the host's Tranh sủng fails → she keeps it + keepSung */
 ok(await nextNight('3'),'3: at tối again');
 H=await force("friend");await noCyc(B);await A.p.evaluate(()=>{oSteal=()=>1;oKeep=()=>99});
 await endEvening();
 const [c3,h3]=await Promise.all([answer(B,"Giữ chân Hoàng thượng"),answer(A,"Tranh sủng")]);
 ok(c3==="Giữ chân Hoàng thượng/Thôi"&&h3==="Tranh sủng/Chặn ngự giá/Thôi",'3: the flipped guest gets the defence choice, the host the attack',[c3,h3]);
 ok(await until(B,()=>S.tonight==="me"&&(S.nfN===wk()||Q.some(m=>m.pid==="ksp"||m.pid==="prep"))&&S.logs.slice(0,10).join(" ").includes("không ai giành được"),null,30000),'3: guest keeps her night, the defence gain line',await B.p.evaluate(()=>({d:nfDebug(),Q:Q.map(m=>m.pid),L:S.logs.slice(0,6)})));
 ok(await until(A,()=>S.tonight&&S.tonight.coop&&S.logs.slice(0,10).join(" ").includes("không động lòng"),null,30000),'3: host: the friend still holds, the host\'s try failed (stealFail line)',await A.p.evaluate(()=>({d:nfDebug(),L:S.logs.slice(0,6)})));
 await unforce();
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
