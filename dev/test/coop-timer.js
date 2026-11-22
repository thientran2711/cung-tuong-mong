/* Co-op buổi clock (jcooptimer, KIT §69): two Playwright browsers in one room against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-timer.js [outdir] [workerURL]
   A = 755x1000@2 (host), B = 1180x820@1 (guest; one shot also at 844x390). Clock lengths are shortened through BAL.coopTm + COOPW.tm.reset().
   Cases: 1 both ready early (friend sees "Hảo hữu đã sẵn sàng", room steps at once) · 2 one AFK → time out steps both ·
   3 mini game pauses the clock up to the cap, then time out steps both (her step waits for the mini game, once) ·
   4 at tối: a choice dialog open at time out stays (an info dialog before it is read for her), the choice runs once, the week merges ·
   5 reconnect: the guest reloads (gets host time), then the host reloads (keeps its clock) · 6 single-player has no clock. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-timer'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}},[WURL,name==='host'&&process.env.THIN?+process.env.THIN:0]);/* THIN=<level>: the host asks for that thin room level */
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* a manual kit scene (night-end «Nhận» #kneov, reward box): a player closes it with its own button [data-km-close] (rv night-balance-bundle, like coop-night) */const kc=[...document.querySelectorAll('.kmov [data-km-close],.kmov .krevok')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}
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

(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{})/* a local wrangler dev Worker (as coop-e2e) */;
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 ok(await A.p.evaluate(()=>{const r=document.querySelector('#modal .kctmlen');return !!r&&/Mỗi buổi tối đa/.test(r.textContent)&&/✓ 5 phút/.test(r.textContent)}),'lobby: host sees Mỗi buổi tối đa 3 / 5 / 8 phút (5 chosen)');
 await shot(A,'tm-lobby-755x1000');
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
 const n0=await A.p.evaluate(()=>[S.buoi||0,typeof B4L==='number'?B4L:2]);console.log('start buổi',n0);
 ok(await A.p.evaluate(()=>document.getElementById('next').textContent==='Sẵn sàng'),'#next says Sẵn sàng in co-op');
 /* 1 both ready early */
 await setTm(A,{buoiMs:60000,pauseCapMs:6000,readMs:2000});await setTm(B,{readMs:2000});await reset(A);await clear(A);await clear(B);
 {const k=(await K(A)).k;ok(k===(await K(B)).k,'1: same buổi',k);
  await clear(B);ok(await press(B),'1: B presses Sẵn sàng');
  ok(await until(A,()=>COOPW.tm.frReady()&&/Đã sẵn sàng/.test((document.getElementById('kctmf')||{}).textContent||''),null,15000),'1: A sees "Hảo hữu đã sẵn sàng"',await K(A));
  await shot(A,'tm-ready-755x1000');
  const v=(await K(A)).v;ok(v&&v.left>40000,'1: clock still running long',v);
  await clear(A);const t0=Date.now();ok(await press(A),'1: A presses Sẵn sàng');
  const ms=await bothPast(A,B,k,20000);ok(ms>=0&&ms<12000,'1: both ready → buổi steps at once',ms)}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 2 one AFK: A ready, B does nothing → time out steps both */
 await shot(B,'tm-run-1180x820');await B.p.setViewportSize({width:844,height:390});await sleep(800);await shot(B,'tm-run-844x390');await B.p.setViewportSize({width:1180,height:820});
 for(let i=0;i<2;i++){await clear(A);await clear(B)}
 await setTm(A,{buoiMs:15000});await reset(A);
 {const k=(await K(A)).k;
  ok(await press(A),'2: A presses Sẵn sàng');const t0=Date.now();
  ok(await until(B,()=>{const t=((document.getElementById('kctm')||{}).textContent||'')+((document.getElementById('kctmf')||{}).textContent||'');return /Còn/.test(t)&&/sẵn sàng/.test(t)},null,8000),'2: B chip shows the clock + friend ready',(await K(B)).chip);
  const ms=await bothPast(A,B,k,40000);ok(ms>=5000,'2: AFK B: time out steps both (not before the clock)',ms);
  const a=await K(A),bb=await K(B);ok(a.k===bb.k,'2: same buổi after time out',[a.k,bb.k])}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* 3 mini game pause + cap */
 {const k0=(await K(A)).k;const last=await A.p.evaluate(()=>(S.buoi||0)>=(typeof B4L==='number'?B4L:2));
  if(last){ok(false,'3: needs a day buổi',k0)}else{
  await setTm(A,{buoiMs:8000,pauseCapMs:6000});await reset(A);await clear(A);await clear(B);
  await B.p.evaluate(()=>{S.mg={k:'cam',l:1};render()});const t0=Date.now();
  ok(await until(A,()=>{const v=COOPW.tm.view();return v&&v.pz},null,8000),'3: B in a mini game → clock paused');
  const l1=(await K(A)).v.left;await sleep(3000);const v2=(await K(A)).v;ok(v2.pz&&Math.abs(v2.left-l1)<600,'3: paused clock does not run',[l1,v2.left]);
  ok(await until(A,()=>{const v=COOPW.tm.view();return v&&!v.pz&&v.run},null,10000),'3: after the cap the clock runs again',await K(A));
  ok(await until(A,k=>COOPW.tm.myKey()!==k,k0,20000),'3: time out → A steps');const ms=Date.now()-t0;ok(ms>=12000,'3: time out came after cap + length',ms);
  const eL=await B.p.evaluate(()=>!!(COOPW.eW&&COOPW.eW()));/* thin E (level 5): no pendBuoi; the host owes her step (E.owe) */
  await until(B,eL=>eL?COOPW.tm.roomKey()!==COOPW.tm.myKey():!!COOPW.pendBuoi,eL,8000);const b1=await K(B);ok(b1.k===k0&&(eL||b1.pb)&&b1.mg,'3: B still in the mini game, her step waits (pendBuoi; level 5: the host owes it)',b1);
  await B.p.evaluate(()=>{S.mg=null;render()});
  ok(await until(B,k=>COOPW.tm.myKey()!==k,k0,10000),'3: mini game over → B steps',await B.p.evaluate(()=>({k:COOPW.tm.myKey(),S:S.buoi,used,pend:COOPW.pend,sent:COOPW.sent,tr:(COOPW.tr||[]).slice(-25)})));
  await sleep(1500);const a=await K(A),bb=await K(B);ok(a.k===bb.k&&+bb.k.split(':')[1]===+k0.split(':')[1]+1,'3: B stepped exactly once',[k0,a.k,bb.k])}}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
 /* get to tối (both press) */
 for(let g=0;g<4;g++){const r=await A.p.evaluate(()=>(S.buoi||0)>=(typeof B4L==='number'?B4L:2));if(r)break;const k=(await K(A)).k;await setTm(A,{buoiMs:60000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
 /* 4 dialog open at time out (tối) */
 {const k0=(await K(A)).k,w0=await A.p.evaluate(()=>COOP.state.week);ok(await A.p.evaluate(()=>(S.buoi||0)>=(typeof B4L==='number'?B4L:2)),'4: at tối',k0);
  await setTm(A,{buoiMs:6000,pauseCapMs:2000});await reset(A);
  await B.p.evaluate(()=>{window.__pick=0;pushModal({t:'Tin thử',h:'<p>Một tin để đọc.</p>'});pushModal({t:'Việc thử',h:'<p>Chọn một.</p>',opts:[{n:'Nhận lời',fx:{},x:'',go:()=>{window.__pick++}},{n:'Khước từ',fx:{},x:'',go:()=>{}}]});showModal();render()});
  /* A plays on: its own dialogs are cleared by the test, it does not press */
  const t0=Date.now();let aEnd=false;while(Date.now()-t0<30000){await clear(A);if(await A.p.evaluate(()=>COOPW.pend||COOPW.sent===(COOP.state.week||0))){aEnd=true;break}await sleep(400)}
  ok(aEnd,'4: time out → A (AFK at tối) ends its day');
  ok(await until(B,()=>Q.length===1&&Q[0].t==='Việc thử',null,15000),'4: B: the info dialog was read for her, the choice is still open',await K(B));
  await sleep(2500);const b1=await B.p.evaluate(()=>({q:Q.length,t:Q[0]&&Q[0].t,pick:__pick,pend:COOPW.pend,week:COOP.state.week}));
  ok(b1.q===1&&b1.t==='Việc thử'&&b1.pick===0&&!b1.pend&&b1.week===w0,'4: no choice made for her, her day waits',b1);
  await B.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button')].find(x=>/Nhận lời/.test(x.textContent));b.click()});
  const t1=Date.now();let merged=false;while(Date.now()-t1<45000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0)){merged=true;break}await sleep(400)}
  ok(merged,'4: after her choice her day ends by itself and the week merges');
  ok(await B.p.evaluate(()=>__pick)===1,'4: the choice ran once',await B.p.evaluate(()=>__pick))}
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(300)}
 /* 5 reconnect: guest reload, then host reload */
 await setTm(A,{buoiMs:60000,pauseCapMs:6000});await reset(A);for(let i=0;i<2;i++){await clear(A);await clear(B)}
 {const k0=(await K(A)).k;await sleep(8000);for(let i=0;i<2;i++){await clear(A);await clear(B)}
  await B.p.close();await until(A,()=>COOP.frozen,null,60000);const la=(await K(A)).v.left;
  await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000),'5: B back');
  await setTm(B,{readMs:2000});
  ok(await until(B,()=>!!COOPW.tm.view(),null,15000),'5: B has the clock again');
  const a=(await K(A)).v,bb=(await K(B)).v;ok(bb&&a&&bb.key===a.key&&Math.abs(bb.left-a.left)<4000&&bb.left<=la+1500&&bb.left<57000,'5: guest reload: host time, not a fresh clock',[la,a&&a.left,bb&&bb.left]);
  for(let i=0;i<3;i++){await clear(A);await clear(B)}
  const lb=(await K(A)).v.left;await A.p.close();await until(B,()=>COOP.frozen,null,60000);
  await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/);await A.p.waitForTimeout(600);await tapText(A,/^Trở lại phòng/);
  ok(await until(A,()=>COOP.seat==='a'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000),'5: A back');
  ok(await until(A,()=>!!COOPW.tm.view(),null,15000),'5: A has the clock again');
  const a2=(await K(A)).v;ok(a2&&a2.key===k0&&a2.left<=lb+1500&&a2.left<57000,'5: host reload keeps its clock',[k0,lb,a2]);
  await setTm(A,{buoiMs:60000,pauseCapMs:6000,readMs:2000});
  for(let i=0;i<3;i++){await clear(A);await clear(B)}await press(A);await press(B);ok(await bothPast(A,B,k0,30000)>=0,'5: play goes on after both reloads')}
 /* 6 single-player: no clock, the button keeps its words */
 {const D=await mk(b,'solo',[844,390,1]);await D.page();await D.p.goto(BASE,DCL);await D.p.waitForTimeout(3000);
  const r=await D.p.evaluate(()=>{document.getElementById('title').hidden=true;window.__nlInner=true;start();Q.length=0;showModal();render();return new Promise(res=>setTimeout(()=>res({next:document.getElementById('next').textContent,chip:!!document.getElementById('kctm'),on:!!(window.COOPW&&COOPW.on)}),1200))});
  ok(r.next==='Sang buổi'&&!r.chip&&!r.on,'6: single-player: no clock, "Sang buổi"',r);
  ok(!D.errs.length,'solo: no page errors',D.errs.slice(0,4))}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
