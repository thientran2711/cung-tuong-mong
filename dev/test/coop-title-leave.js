/* coop-title-leave — review/robot-coop-fix-7 (co-op «bare #title» family, FOREMAN B 25/11 08:35Z–09:27Z; rooms HCEP EEWJ PDXY K6TA NB8G V8UE AZ9J).
   Bug: a seat tapped ☰ «Ô lưu» on the map → the menu card «Cung Tường Mộng» → its ✕ → COOP off, room '', COOPW.on false, the page = the bare
   #title cover with 0 tappable buttons; the other seat waited «Đợi hảo hữu trở lại» for ever.
   This test, two seats in one room (A = host, B = guest; COOP_SWAP=1 swaps the devices), Fold 755x1000@2 + iPad 1180x820@2:
     C1  ☰ keeps the room (both seats, status open, same code, the friend sees her online)
     C2  every close of the menu card goes back to the running game: kit ✕, Esc, Thiết lập › ‹ Lui › ✕, «Trở lại cuộc chơi», «Xem lại lời dặn»
     C3  the co-op life's menu has no way out of the room but «Rời phòng» (no Chơi một mình / Kiếp mới / Cùng hảo hữu on it)
     C4  «Rời phòng» asks first (kitConfirm); ✕ on the ask keeps the room
     C5  «Rời phòng» confirmed: her seat leaves, her #title shows its menu (buttons > 0); the friend's freeze panel says «Hảo hữu đã rời phòng»
     C6  she comes back by Cùng hảo hữu › Trở lại phòng: both online again
     C7  the friend's freeze «Về màn đầu» asks the same confirm
     BARE after every step: #title visible ⇒ the title menu card has visible buttons (never the bare cover)
     SOLO (one page): ☰ → ✕ → the game (was: bare #title); ☰ → Chơi một mình → load sổ; new sổ; the first-open home has no ✕.
   usage: python3 dev/build/assemble.py && node dev/test/coop-title-leave.js [workerURL]   (local Worker: wrangler dev --local --port 8791 in coop/worker)
   env: COOP_SWAP=1 (iPad hosts), CTL_ROOT=<other worktree> (serve that build, e.g. main = the bare FAIL proof), CTL_SOLO=0 skip the solo part, CTL_OUT=<dir> shots */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');const CL=require('./lib/coop-clear.js');
const WURL=process.argv[2]||process.env.COOP_URL||'http://127.0.0.1:8791';
const ROOT=process.env.CTL_ROOT?path.resolve(process.env.CTL_ROOT):undefined;
const OUT=process.env.CTL_OUT||'';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,900):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const FOLD=['fold',[755,1000,2]],IPAD=['ipad',[1180,820,2]];
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
 await serve(ctx,ROOT);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
 const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);const o={ctx,p,name,errs:[]};
 p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate|WebSocket/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const booted=o=>o.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000}).catch(()=>{});
const shot=async(o,n)=>{if(!OUT)return;try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`})}catch(e){}};
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
/* the visible enabled button whose text (or aria-label) matches, clicked as a player taps it */
async function tap(o,sel,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(([sel,src])=>{const R=src?new RegExp(src):null;
  return [...document.querySelectorAll(sel)].find(b=>b.offsetParent!==null&&!b.disabled&&b.getClientRects().length&&(!R||R.test((b.textContent||'').trim())||R.test(b.getAttribute('aria-label')||'')))||null},[sel,re?re.source:'']);
  const el=h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:5000});return true}catch(e){}}await sleep(250)}return false}
/* close the game's own story cards / scenes as a player does (never the menu card, never the freeze panel) */
async function clear(o,n=40){for(let i=0;i<n;i++){const st=await CL.first(o,()=>{const m=document.getElementById('modal');if(!m||m.hidden||m.classList.contains('kptitle'))return'';
   const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);
   const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('.kit-x')||[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')].find(x=>x.offsetParent!==null)||all[0];
   if(b){b.click();return'x'}return''});
  if(st!=='x')return st;await sleep(250)}return'many'}
/* one look at a seat: room, menu, bare title */
const look=o=>o.p.evaluate(()=>{const T=document.getElementById('title'),M=document.getElementById('modal');const v=x=>!!x&&x.getClientRects().length>0&&getComputedStyle(x).visibility!=='hidden';/* fixed layers (#coopfz): offsetParent is null */
 const menuB=M&&!M.hidden&&M.classList.contains('kptitle')?[...M.querySelectorAll('button')].filter(b=>v(b)&&!b.disabled).map(b=>(b.getAttribute('aria-label')==='Lui'&&b.classList.contains('kit-x'))?'✕':b.firstChild&&b.firstChild.nodeType===3?b.firstChild.textContent.trim():b.textContent.trim().slice(0,24)):[];
 const fz=document.getElementById('coopfz');const s=COOP.state;
 return{title:!!T&&!T.hidden,modal:!!M&&!M.hidden,menu:menuB,bare:!!T&&!T.hidden&&!menuB.length&&!(fz&&v(fz)),st:s.status,room:s.room,you:s.you,peer:!!s.peerOnline,cw:!!(window.COOPW&&COOPW.on),
  fz:fz&&v(fz)?(fz.querySelector('.kptitle')||{}).textContent||'?':'',next:v(document.getElementById('next')),S:typeof S!=='undefined'&&!!S&&!S.dead,coopRoom:typeof S!=='undefined'&&S&&S.coopRoom||'',bareN:window.__ctmBare||0}});
async function noBare(o,tag){const l=await look(o);ok(!l.bare,`${tag} ${o.name}: #title never bare (menu buttons ${l.menu.length})`,l);return l}
async function inGame(o,tag,code){const r=await until(o,c=>{const T=document.getElementById('title');return T.hidden&&COOP.state.status==='open'&&COOP.state.room===c&&window.COOPW&&COOPW.on},code,8000);
 const l=await look(o);ok(r&&l.next,`${tag} ${o.name}: back in the running game, room ${code} kept`,l);return l}
async function menu(o){await clear(o);const t=await tap(o,'#menu',/Ô lưu/);await sleep(500);return t}
async function seatMenu(o,F,code,tag){
 ok(await menu(o),`${tag} ${o.name}: taps ☰`);let l=await noBare(o,tag+' ☰');await shot(o,tag+'-menu');
 ok(l.st==='open'&&l.room===code&&l.cw,`${tag} C1 ${o.name}: ☰ keeps the room`,l);
 ok(l.menu.includes('Trở lại cuộc chơi')&&l.menu.includes('Rời phòng')&&l.menu.includes('✕'),`${tag} C3 ${o.name}: co-op life menu = Trở lại cuộc chơi / Rời phòng / ✕`,l.menu);
 ok(!l.menu.some(x=>/^(Chơi một mình|Kiếp mới|Cùng hảo hữu|Bắt đầu|Tiếp tục)$/.test(x)),`${tag} C3 ${o.name}: no solo / new-room way out on it`,l.menu);
 await sleep(1200);const f=await look(F);ok(f.peer&&!f.fz,`${tag} C1 ${F.name}: the friend still sees her in the room`,f);
 /* C2 kit ✕ */
 ok(await tap(o,'#modal .kit-x',null),`${tag} ${o.name}: taps the menu ✕`);await inGame(o,tag+' C2 ✕',code);await noBare(o,tag+' ✕');
 /* C2 Esc */
 await menu(o);await o.p.keyboard.press('Escape');await sleep(600);await inGame(o,tag+' C2 Esc',code);await noBare(o,tag+' Esc');
 /* C2 Thiết lập › ‹ Lui › ✕ */
 await menu(o);ok(await tap(o,'#modal .kpmenu button',/^Thiết lập/),`${tag} ${o.name}: opens Thiết lập`);await sleep(500);await noBare(o,tag+' opt');
 ok(await tap(o,'#modal .kit-x, #modal #mr button',/Lui/),`${tag} ${o.name}: Thiết lập ‹ Lui`);await sleep(500);l=await noBare(o,tag+' opt-back');
 ok(l.menu.includes('Trở lại cuộc chơi'),`${tag} ${o.name}: ‹ Lui from Thiết lập = the co-op life menu`,l.menu);
 ok(await tap(o,'#modal .kit-x',null),`${tag} ${o.name}: ✕ after Thiết lập`);await inGame(o,tag+' C2 opt ✕',code);
 /* C2 Sổ luân hồi › ✕ */
 await menu(o);ok(await tap(o,'#modal .kpmenu button',/^Sổ luân hồi/),`${tag} ${o.name}: opens Sổ luân hồi`);await sleep(500);await noBare(o,tag+' past');
 await tap(o,'#modal .kit-x',null);await sleep(500);l=await noBare(o,tag+' past-x');if(l.title){await tap(o,'#modal .kit-x',null);await sleep(500)}await inGame(o,tag+' C2 past',code);
 /* C2 «Trở lại cuộc chơi» */
 await menu(o);ok(await tap(o,'#modal .kpmenu button',/^Trở lại cuộc chơi/),`${tag} ${o.name}: taps Trở lại cuộc chơi`);await inGame(o,tag+' C2 back-button',code);
 /* C2 «Xem lại lời dặn» (when the menu has it) */
 await menu(o);if(await o.p.evaluate(()=>!!document.querySelector('#modal [data-ktut-replay]'))){await tap(o,'#modal [data-ktut-replay]',null);await sleep(800);
  const r=await until(o,c=>COOP.state.status==='open'&&COOP.state.room===c&&COOPW.on,code,6000);ok(r,`${tag} C2 ${o.name}: Xem lại lời dặn keeps the room`,await look(o));
  for(let i=0;i<30;i++){const k=await o.p.evaluate(()=>{const b=[...document.querySelectorAll('.ktut button, #ktut button, [class*=ktut] button')].find(x=>x.offsetParent!==null&&/Đã hiểu|Tiếp|Bỏ qua|Xong/.test(x.textContent));if(b){b.click();return 1}return 0});if(!k)break;await sleep(250)}
  await noBare(o,tag+' tut')}else{await tap(o,'#modal .kit-x',null);await sleep(400)}
 await inGame(o,tag+' after menu round',code)}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults']}:{});
 const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];const A=await mk(b,'A-'+VA[0],VA[1]),B=await mk(b,'B-'+VB[0],VB[1]);
 /* room: A makes it, B joins by link */
 await A.p.goto(BASE,{waitUntil:'domcontentloaded'});await booted(A);await sleep(1500);
 ok(await tap(A,'button',/^(Cùng hảo hữu|Chơi cùng bạn)/),'A taps Cùng hảo hữu');await sleep(600);
 ok(await tap(A,'button',/^(Mời hảo hữu|Mời bạn)/),'A taps Mời hảo hữu');
 ok(await until(A,()=>COOP.state.room&&COOP.state.you==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.state.room);console.log('room',code);
 await B.p.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});await booted(B);await tap(B,'button',/^Vào phòng/,5000);
 ok(await until(B,()=>COOP.state.you==='b'&&COOP.state.peerOnline,null,40000),'B joined, both online');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);const w=await Promise.all([A,B].map(o=>o.p.evaluate(()=>typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)&&document.getElementById('title').hidden)));if(w[0]&&w[1])break;await sleep(500)}}
 await clear(A);await clear(B);await sleep(800);await clear(A);await clear(B);
 for(const o of [A,B]){const l=await look(o);ok(l.S&&l.cw&&l.st==='open'&&!l.title,`${o.name}: in the shared world`,l)}
 /* C1–C3 on both seats */
 await seatMenu(B,A,code,'guest');await seatMenu(A,B,code,'host');
 /* C4 ask, ✕ keeps the room */
 await menu(B);ok(await tap(B,'#modal .kpmenu button',/^Rời phòng/),'C4 B taps Rời phòng');await sleep(500);
 {const t=await B.p.evaluate(()=>{const M=document.getElementById('modal');return{t:(M.querySelector('.kptitle')||{}).textContent,yes:!!M.querySelector('[data-kcf-yes]')}});ok(t.t==='Rời phòng?'&&t.yes,'C4 B: the ask «Rời phòng?» (kitConfirm)',t)}
 await shot(B,'c4-ask');await tap(B,'#modal .kit-x',null);await sleep(600);
 {const l=await noBare(B,'C4 no');ok(l.st==='open'&&l.room===code&&l.menu.includes('Trở lại cuộc chơi'),'C4 B: ✕ on the ask keeps the room, back on the menu',l)}
 /* C5 confirmed */
 await tap(B,'#modal .kpmenu button',/^Rời phòng/);await sleep(500);ok(await tap(B,'#modal [data-kcf-yes]',null),'C5 B confirms Rời phòng');
 ok(await until(B,()=>COOP.state.status==='off',null,8000),'C5 B: her seat left the room');await sleep(1500);
 {const l=await noBare(B,'C5');ok(l.title&&l.menu.some(x=>/Cùng hảo hữu/.test(x))&&!l.menu.includes('✕'),'C5 B: #title shows the full home menu (no ✕: no life behind)',l.menu);await shot(B,'c5-left')}
 ok(await until(A,()=>{const f=document.getElementById('coopfz');return !!f&&f.getClientRects().length>0&&/Hảo hữu đã rời phòng/.test(f.textContent)},null,15000),'C5 A: freeze panel says «Hảo hữu đã rời phòng»',await look(A));await shot(A,'c5-friend');
 /* C6 back */
 ok(await tap(B,'#modal .kpmenu button',/^Cùng hảo hữu/),'C6 B taps Cùng hảo hữu');await sleep(600);ok(await tap(B,'#modal button',/^Trở lại phòng/),'C6 B taps Trở lại phòng');
 ok(await until(B,()=>COOP.state.status==='open'&&COOP.state.peerOnline,null,40000),'C6 B: back in the room, both online');
 ok(await until(A,()=>{const f=document.getElementById('coopfz');return !(f&&f.getClientRects().length)},null,40000),'C6 A: freeze gone');
 {const t0=Date.now();while(Date.now()-t0<40000){await clear(B);if(await B.p.evaluate(()=>document.getElementById('title').hidden&&COOPW.on))break;await sleep(500)}}
 await noBare(B,'C6');
 /* C8 (Foreman B 09:40Z, room XKG7): a reload mid-room never lands on a bare #title — back in the room by itself, or the menu with its buttons */
 await B.p.reload({waitUntil:'domcontentloaded'});await booted(B);await sleep(6000);
 {const l=await noBare(B,'C8 reload');if(l.title&&!(l.st==='open'&&l.cw)){await tap(B,'#modal .kpmenu button',/^Cùng hảo hữu/);await sleep(600);await tap(B,'#modal button',/^Trở lại phòng/)}}
 ok(await until(B,()=>COOP.state.status==='open'&&COOP.state.peerOnline,null,40000),'C8 B: after a reload, back in the room (both online)',await look(B));
 {const t0=Date.now();while(Date.now()-t0<40000){await clear(B);if(await B.p.evaluate(()=>document.getElementById('title').hidden&&window.COOPW&&COOPW.on))break;await sleep(500)}}
 await noBare(B,'C8 back');
 /* C7 freeze «Về màn đầu» asks too: B leaves (confirmed), A taps Về màn đầu, ✕ = stays; then yes */
 await clear(B);await menu(B);await tap(B,'#modal .kpmenu button',/^Rời phòng/);await sleep(400);await tap(B,'#modal [data-kcf-yes]',null);await until(B,()=>COOP.state.status==='off',null,8000);
 ok(await until(A,()=>{const f=document.getElementById('coopfz');return !!f&&f.getClientRects().length>0},null,15000),'C7 A frozen');
 ok(await tap(A,'#coopfz button',/^Về màn đầu/),'C7 A taps Về màn đầu');await sleep(600);
 {const t=await A.p.evaluate(()=>{const M=document.getElementById('modal');return{t:!M.hidden&&(M.querySelector('.kptitle')||{}).textContent,st:COOP.state.status}});ok(t.t==='Rời phòng?'&&t.st==='open','C7 A: Về màn đầu asks «Rời phòng?» first, room kept',t)}
 await tap(A,'#modal .kit-x',null);await sleep(800);
 {const l=await look(A);ok(l.st==='open'&&/rời phòng/i.test(l.fz),'C7 A: ✕ on the ask = still in the room, freeze panel back',l)}
 await tap(A,'#coopfz button',/^Về màn đầu/);await sleep(400);await tap(A,'#modal [data-kcf-yes]',null);
 ok(await until(A,()=>COOP.state.status==='off',null,8000),'C7 A: confirmed, left');await sleep(1200);
 {const l=await noBare(A,'C7');ok(l.title&&l.menu.length>2,'C7 A: home menu with buttons',l.menu)}
 for(const o of [A,B])ok(!o.errs.length,`${o.name}: no page errors`,o.errs.slice(0,6));
 await A.ctx.close();await B.ctx.close();
 /* SOLO: the same card in a solo life */
 if(process.env.CTL_SOLO!=='0')for(const V of [FOLD,IPAD]){const o=await mk(b,'solo-'+V[0],V[1]);await o.p.goto(BASE,{waitUntil:'domcontentloaded'});await booted(o);await sleep(1500);
  {const l=await look(o);ok(l.title&&l.menu.length>2&&!l.menu.includes('✕'),`SOLO ${o.name}: first-open home menu, no ✕ (nothing behind it)`,l.menu)}
  ok(await tap(o,'#modal .kpmenu button',/^(Chơi một mình|Bắt đầu)/),`SOLO ${o.name}: Chơi một mình`);await sleep(600);
  ok(await tap(o,'#slots button',/^Bắt đầu kiếp mới/),`SOLO ${o.name}: new sổ`);
  {const t0=Date.now();while(Date.now()-t0<60000){await clear(o);if(await o.p.evaluate(()=>typeof S!=='undefined'&&S&&document.getElementById('title').hidden&&!Q.length))break;await sleep(400)}}
  const nm=await o.p.evaluate(()=>S&&S.name);ok(!!nm,`SOLO ${o.name}: a life started`,nm);
  await menu(o);{const l=await noBare(o,'SOLO ☰');ok(l.menu.includes('✕')&&l.menu.some(x=>/Chơi một mình/.test(x)),`SOLO ${o.name}: ☰ = home menu with ✕ (unchanged buttons)`,l.menu)}
  await tap(o,'#modal .kit-x',null);await sleep(700);{const l=await noBare(o,'SOLO ✕');ok(!l.title&&l.next&&await o.p.evaluate(n=>S&&S.name===n,nm),`SOLO ${o.name}: ✕ = back to the same running life`,l)}
  await menu(o);await o.p.keyboard.press('Escape');await sleep(600);{const l=await noBare(o,'SOLO Esc');ok(!l.title,`SOLO ${o.name}: Esc = back to the game`,l)}
  await menu(o);await tap(o,'#modal .kpmenu button',/^Chơi một mình/);await sleep(600);ok(await tap(o,'#slots button',/^Tiếp tục kiếp này/),`SOLO ${o.name}: load the sổ`);await sleep(1500);await clear(o);
  {const l=await noBare(o,'SOLO load');ok(!l.title&&await o.p.evaluate(n=>S&&S.name===n,nm),`SOLO ${o.name}: the sổ loads the same life`,l)}
  ok(!o.errs.length,`SOLO ${o.name}: no page errors`,o.errs.slice(0,6));await o.ctx.close()}
 await b.close();const f=res.filter(x=>!x[0]).length;console.log(`\n${res.length-f}/${res.length} ${f?'FAIL':'PASS'}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
