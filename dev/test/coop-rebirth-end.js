/* review/coop-rebirth-resync (F A-COOP #3 room RCT6 «Ban hoa b1 every kiếp»): a life that ENDS in a co-op room (ban hoa / death), then the
   seat leaves and comes back («Trở lại phòng» / the room link / ANOTHER device) must begin the NEXT kiếp (Luân hồi), never get the ended life
   back alive just before its end (LIVE: her seat copy + the room still held the life alive → the same ending again, the room never reached a
   week end). Cases: G1 guest ban hoa → same device; H1 host death → same device; G2 guest death → another device (server seat copy only).
   Then both play one week (the room is not blocked). usage: node dev/test/coop-rebirth-end.js [outdir] [workerURL] */
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{
   
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

(async()=>{const b=await chromium.launch(/\/\/(127\.0\.0\.1|localhost)[:/]/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,LocalNetworkAccessChecks']}:{});
 let A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!S.dead&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
 async function both(ms=150000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))return true;await sleep(700)}return false}
 ok(await both(),'both chose their thân phận and are in the game');
 const me=o=>o.p.evaluate(()=>({n:S&&S.name,dead:!!(S&&S.dead),life:COOPW.life||0,inLife:!!COOPW.inLife,w:COOP.state.week,P:(()=>{const P=COOPW.base&&COOPW.base.P&&COOPW.base.P[COOPW.seat];return P?{n:P.name,life:P.life||0,dead:!!P.dead}:null})(),tr:(COOPW.tr||[]).slice(-8)})).catch(e=>({err:e.message}));
 const carry=X=>X.p.evaluate(code=>{const p={};p[code]=COOP.pidFor(code);return {rooms:localStorage.getItem('ctm-coop-rooms')||'[]',pids:JSON.stringify(p)}},code);
 async function rejoin(X,host){await X.page();await X.p.goto(host?BASE:BASE+'?room='+code,DCL);await X.p.waitForTimeout(3000);
  if(host){await tapText(X,/^(Chơi cùng bạn|Cùng hảo hữu)/);await X.p.waitForTimeout(600);await tapText(X,/^Trở lại phòng/)}else await tapText(X,/^Vào phòng|^Tiếp tục/,4000);
  return until(X,s=>COOP.seat===s&&!COOP.frozen&&!!(window.COOPW&&COOPW.on),host?'a':'b',60000)}
 const CASES=[['G1 guest ban hoa, same device','b','end',false],['H1 host dies, same device','a','die',false],['G2 guest dies, another device','b','die',true]];
 for(const [tag,seat,how,xdev] of CASES){const isHost=seat==='a';let X=isHost?A:B;const Y=isHost?B:A;
  for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  await X.p.evaluate(()=>{spend(1);render()});await sleep(4500);/* her rolling seat copy is on the server (SEAT_MS) */
  const x0=await me(X);const cr=xdev?await carry(X):null;
  await X.p.evaluate(h=>{if(h==='end')over('Bị ban hoa','Thử: bị ban hoa ở Điện tuyển.','Bị ban hoa, xuất cung');else die('Thử: trúng gió')},how);await sleep(2500);
  const x1=await me(X);ok(x1.dead,tag+': the life ended',x1);
  await X.p.close();ok(await until(Y,()=>COOP.frozen,null,60000),tag+': '+Y.name+' sees the wait');
  if(xdev){const N=await mk(b,X.name+'-new',isHost?[1180,820,2]:[755,1000,2]);await N.ctx.addInitScript(c=>{if(!localStorage.getItem('ctm-coop-pids')){localStorage.setItem('ctm-coop-rooms',c.rooms);localStorage.setItem('ctm-coop-pids',c.pids)}},cr);X=N;if(isHost)A=N;else B=N}
  ok(await rejoin(X,isHost),tag+': back in the room');await sleep(2500);
  const x2=await me(X);const back=!!(x2.n===x0.n&&!x2.dead&&!x2.inLife);
  ok(!back,tag+': the ended life does NOT come back alive (no replay of its end)',{x0:{n:x0.n,life:x0.life},x2});
  const t0=Date.now();let x3=null;while(Date.now()-t0<120000){await clear(X);await clear(Y);x3=await me(X);if(x3.n&&!x3.dead&&!x3.inLife&&x3.life>x0.life)break;await sleep(700)}
  ok(x3&&x3.n&&!x3.dead&&!x3.inLife&&x3.life>x0.life,tag+': a NEW kiếp in the same room (Luân hồi, life counts on)',{x0:{n:x0.n,life:x0.life},x3});
  ok(await both(60000),tag+': both in the game again');
  let seen=false;{const t1=Date.now();while(Date.now()-t1<40000&&!seen){await clear(X);await clear(Y);const xn=await X.p.evaluate(()=>S&&!S.dead&&!COOPW.inLife?S.name:null).catch(()=>null);/* her new life can itself end at its first selection (tú nữ road, ban hoa): follow her CURRENT life */seen=!!xn&&await Y.p.evaluate(n=>{const f=COOPW.friend&&COOPW.friend();return !!f&&f.name===n},xn);if(!seen)await sleep(700)}}ok(seen,tag+': '+Y.name+' sees the friend\'s new life',await me(Y))}
 /* the room is not blocked: one more week for both */
 {const D=o=>o.p.evaluate(()=>({w:COOP.state.week,pend:!!COOPW.pend}));const w0=(await D(A)).w;
  const t0=Date.now();let okW=false;while(Date.now()-t0<240000){await clear(A);await clear(B);for(const o of [A,B])await o.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled)n.click()}).catch(()=>{});
   const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend){okW=true;break}await sleep(600)}
  const dmp=o=>o.p.evaluate(()=>({wk:COOP.state.week,ended:COOP.state.ended,k:(typeof wk==='function'?wk():0)+':'+(S.buoi||0),Q:Q.length,q0:Q[0]&&String(Q[0].t||'').slice(0,40),mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,nrdy:COOPW.nrdy,ngoW:COOPW.ngoW,inLife:COOPW.inLife,life:COOPW.life,tr:COOPW.tr.slice(-24)})).catch(e=>e.message);
  ok(okW,'after the three ends + rebirths: a week end is reached by both seats',okW?undefined:[await dmp(A),await dmp(B)])}
 /* N1 (F A-COOP #3 room 3T7K wk70): the guest is ready at tối (her «rd» out) but holds no «where» of her tối (she missed it: rejoin / reload /
    a new life at tối); the host commits, runs his night and ends. Before: her night waited for a «where» that never comes (his next one is
    buổi 0) → «Chờ hảo hữu…» for ever, server ended.b false, host «Đợi hảo hữu xong tuần». */
 {const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,pend:!!COOPW.pend,sent:COOPW.sent,ended:COOP.state.ended,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,wk:COOPW.whereKey,tr:COOPW.tr.slice(-12)})).catch(e=>e.message);
  const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:3);const press=o=>o.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled){n.click();return true}return false}).catch(()=>false);
  let t0=Date.now();while(Date.now()-t0<180000){await clear(A);await clear(B);const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST)break;if(a.b<LAST)await press(A);if(c.b<LAST)await press(B);await sleep(600)}
  const w0=(await D(A)).w;let rd=false;t0=Date.now();while(Date.now()-t0<30000&&!rd){await clear(B);await press(B);await sleep(500);rd=await B.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))}
  ok(rd,'N1: guest ready at tối',await D(B));
  await B.p.evaluate(()=>{COOPW.whereKey='missed'});/* she holds no «where» of this tối */
  t0=Date.now();let okN=false;while(Date.now()-t0<120000){await clear(A);await press(A);await B.p.evaluate(()=>{try{COOPW.nCheck()}catch(e){}});const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0){okN=true;break}await sleep(700)}
  ok(okN,'N1: guest without the tối «where», host ends first → her night runs, the week merges',okN?undefined:[await D(A),await D(B)])}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
