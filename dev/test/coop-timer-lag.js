/* Co-op buổi clock under LAG (owner 15/11 ~22:55Z): every socket frame of both players is held 300–800 ms each way (Playwright
   routeWebSocket, order kept per direction), against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-timer-lag.js [outdir] [workerURL]
   Checks: the two screens agree on the time left (same machine clock: each page reports left + its Date.now, compared at one instant)
   · a mini game started mid-countdown stops the clock for both (the friend sees only "Hảo hữu đang dở tay, xin đợi"), both screens
   show the same stopped time, it runs again after · "Tạm dừng" holds both (kit panel on the friend's screen), "Tiếp tục" releases
   · time out after the grace steps both · the guest reloads mid-countdown under lag and gets the host's time back. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-timer-lag'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const LO=+process.env.LAG_LO||300,HI=+process.env.LAG_HI||800;
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
const lag=()=>LO+Math.random()*(HI-LO);
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  /* the lag: one queue per direction, so frames keep their order */
  await ctx.routeWebSocket(/\/api\/room\/[A-Za-z0-9]{4}\/ws/,ws=>{const srv=ws.connectToServer();let up=0,dn=0;
    ws.onMessage(m=>{const t=Math.max(up,Date.now()+lag());up=t;setTimeout(()=>{try{srv.send(m)}catch(e){}},t-Date.now())});
    srv.onMessage(m=>{const t=Math.max(dn,Date.now()+lag());dn=t;setTimeout(()=>{try{ws.send(m)}catch(e){}},t-Date.now())});
    ws.onClose((c,r)=>{try{srv.close({code:c,reason:r})}catch(e){}});srv.onClose((c,r)=>{try{ws.close({code:c,reason:r})}catch(e){}})});
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|WebSocket/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:200});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){}};
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}/* bot family (jfocus «Tiếp ▸» dialogue line, e.g. cnvScold on a cung nữ): a player taps the line on */{const kf=[...document.querySelectorAll('.kfoc-next')].find(x=>x.offsetParent!==null);if(kf){kf.click();return'x'}/* bot family (jdfv encounter: an NPC's card plays in the jfocus scene, its options are the scene's choice buttons «m<k>», the centre modal stays hidden): a player picks one */{const q=typeof Q!=='undefined'&&Q[0];const kc=q&&q.dfSeen?[...document.querySelectorAll('.kfoc-b:not(.kfoc-off)')].find(x=>x.offsetParent!==null&&/^m\d+$/.test(x.dataset.id||'')):null;if(kc){kc.click();return'x'}}}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const inGame=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
/* both views at one instant: left normalised to the same wall time */
async function both(A,B){const f=()=>{const v=COOPW.tm.view();return v?{key:v.key,left:v.left,run:v.run,pz:v.pz,hold:v.hold,up:v.up,now:Date.now()}:null};
  const [a,b]=await Promise.all([A.p.evaluate(f),B.p.evaluate(f)]);if(!a||!b)return{a,b,d:1e9};
  const ref=Math.max(a.now,b.now);const la=a.run?a.left-(ref-a.now):a.left,lb=b.run?b.left-(ref-b.now):b.left;return{a,b,d:Math.abs(la-lb),la,lb}}
async function settle(A,B){const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))return true;await sleep(500)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[844,390,1]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a',null,40000),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code,'lag',LO,HI);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 {const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}ok(await inGame(A)&&await inGame(B),'both in the game')}
 for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}await sleep(3000);ok(await settle(A,B),'settled');
 await setTm(A,{buoiMs:40000,pauseCapMs:8000,graceMs:1500});await setTm(B,{readMs:2000});await A.p.evaluate(()=>COOPW.tm.reset());
 ok(await until(B,()=>{const v=COOPW.tm.view();return v&&v.run&&v.left<40500},null,15000),'B gets the host clock under lag');
 await sleep(2500);/* a few ping pairs */
 const off=await B.p.evaluate(()=>COOPW.tm.off());console.log('guest offset ms',Math.round(off));
 /* 1 the screens agree */
 {let worst=-1;for(let i=0;i<6;i++){const r=await both(A,B);if(r.a&&r.b&&r.a.key===r.b.key&&r.a.run&&r.b.run)worst=Math.max(worst,r.d);await sleep(700)}
  ok(worst>=0&&worst<400,'1: both screens show the same time left (worst gap ms)',Math.round(worst));console.log(JSON.stringify(await A.p.evaluate(()=>COOPW.tm.dbg())),JSON.stringify(await B.p.evaluate(()=>COOPW.tm.dbg())))}
 /* 2 mini game mid-countdown */
 {await settle(A,B);await B.p.evaluate(()=>{S.mg={k:'cam',l:1};render()});
  ok(await until(A,()=>{const v=COOPW.tm.view();return v&&v.pz},null,5000),'2: mini game → host clock stops');
  ok(await until(B,()=>{const v=COOPW.tm.view();return v&&v.pz},null,5000),'2: … and the guest clock stops');
  await sleep(1200);const r=await both(A,B);ok(r.a.pz&&r.b.pz&&r.d<300,'2: both show the same stopped time',[Math.round(r.la),Math.round(r.lb)]);
  const chip=await A.p.evaluate(()=>(document.getElementById('kctm')||{}).textContent||'');ok(/dở tay, xin đợi/.test(chip)&&!/trò|đàn|cầm/i.test(chip),'2: the friend sees only the generic line',chip);
  await shot(A,'lag-busy-755x1000');
  await sleep(1500);const r2=await both(A,B);ok(Math.abs(r2.la-r.la)<300,'2: stopped clock does not run',[Math.round(r.la),Math.round(r2.la)]);
  await B.p.evaluate(()=>{S.mg=null;render()});
  ok(await until(A,()=>{const v=COOPW.tm.view();return v&&v.run},null,5000)&&await until(B,()=>{const v=COOPW.tm.view();return v&&v.run},null,5000),'2: mini game over → the clock runs for both');
  await sleep(1500);const r3=await both(A,B);ok(r3.d<400,'2: still agree after the pause',Math.round(r3.d))}
 /* 3 Tạm dừng */
 {await settle(A,B);
  const tap=await A.p.evaluate(()=>{const x=document.querySelector('#kctm [data-ctm="hold"]');if(!x)return false;x.click();return true});ok(tap,'3: A taps Tạm dừng');
  ok(await until(B,()=>!!document.getElementById('kctmh')&&/Hảo hữu xin tạm dừng/.test(document.getElementById('kctmh').textContent),null,6000),'3: B sees "Hảo hữu xin tạm dừng"');
  await shot(B,'lag-hold-844x390');
  const r=await both(A,B);await sleep(2500);const r2=await both(A,B);ok(!r2.a.run&&!r2.b.run&&Math.abs(r2.la-r.la)<300&&r2.d<300,'3: held clock stands still on both',[Math.round(r.la),Math.round(r2.la),Math.round(r2.lb)]);
  ok(await B.p.evaluate(()=>!document.querySelector('#kctmh [data-ctm="go"]')),'3: only the one who paused can go on');
  ok(await A.p.evaluate(()=>{const x=document.querySelector('#kctmh [data-ctm="go"]');if(!x)return false;x.click();return true}),'3: A taps Tiếp tục');
  ok(await until(B,()=>!document.getElementById('kctmh')&&COOPW.tm.view().run,null,6000),'3: released on B, clock runs')}
 /* 4 guest reload mid-countdown under lag */
 {const before=(await both(A,B)).la;await B.p.close();await until(A,()=>COOP.frozen,null,60000);const la=await A.p.evaluate(()=>COOPW.tm.view().left);
  await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen&&!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S),null,60000),'4: B back');
  ok(await until(B,()=>!!COOPW.tm.view(),null,15000),'4: B has the clock again');await sleep(2500);
  const r=await both(A,B);ok(r.d<500&&r.lb<=la+1000,'4: guest reload under lag: host time again',[Math.round(before),Math.round(la),Math.round(r.la),Math.round(r.lb)])}
 /* 5 time out with grace steps both */
 {for(let i=0;i<2;i++){await clear(A);await clear(B)}const k=await A.p.evaluate(()=>COOPW.tm.myKey());
  await setTm(A,{buoiMs:8000,pauseCapMs:0});await A.p.evaluate(()=>COOPW.tm.reset());const t0=Date.now();
  const t=Date.now();let stepped=-1;while(Date.now()-t<40000){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),c=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&c){stepped=Date.now()-t0;break}await sleep(250)}
  ok(stepped>=8000,'5: time out (after the grace) steps both',stepped)}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
