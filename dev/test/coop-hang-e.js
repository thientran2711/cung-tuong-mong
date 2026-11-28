/* coop-hang-e — COOP-REBIRTH-RESYNC r3 (MAIN 189 ★ PLAY-STOPPER, flight2-coop1j room e E8EH, LIVE 18003079):
   host ends the week, guest (Phế phi · lãnh cung) at tối «Hết buổi», «còn 1», #next «Chờ hảo hữu…» disabled, server ended {a:true,b:false}
   for ever; only «Rời cung» left. Same family as room c 3T7K (772bee4f).
   LAW 11: every place / state of the OTHER seat when one seat ends the week first — lãnh cung, sick, away, dialog open, rejoin,
   room clock run out — and LAW 1: the same with the host in that state (guest ends first). Each case = one room week; after each
   the week must be merged on BOTH seats (server week +1, nobody pend) within the time, nothing lost / given twice (khắc used 0 after).
   Side (4): at tối once the friend ended, her last khắc is spent (no free rest farm): used goes to 4 or the week ends.
   Side (5): a co-op reload never rewinds her buổi / week (no SAVE REWIND).
   Usage: node dev/test/coop-hang-e.js <out> http://127.0.0.1:8799   (COOP_SWAP=1: iPad hosts; CTM_ROOT=<worktree> serves another build;
   CASES=L1,L2 picks cases) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-hang-e'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'http://127.0.0.1:8799';const ROOT=process.env.CTM_ROOT||undefined;
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,3000):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx,ROOT);await ctx.addInitScript(u=>{window.COOP_URL=u;
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);const o={ctx,name,errs:[]};
  o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate|WebSocket/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
async function clear(o,n=25){let r=await clear0(o,n);for(let i=0;i<6;i++){/* a kit choice card whose options are not under .opts (kopt «Việc khó xử»): the first road a player can take */const c=await o.p.evaluate(()=>{const m=document.getElementById('modal');if(!m||m.hidden||m.querySelector('.opts'))return false;const b=[...m.querySelectorAll('button.opt:not([disabled])')].find(x=>x.offsetParent!==null);if(b){b.click();return true}return false}).catch(()=>false);if(!c)break;await sleep(300);r=await clear0(o,n)}await o.p.evaluate(()=>{try{const m=document.getElementById('modal');if(Q.length&&m&&m.hidden&&!(document.getElementById('dawn')&&document.getElementById('dawn').offsetParent))showModal()}catch(e){}}).catch(()=>{});return r}
/* the player's clear step = coop-e2e.js clear() (copied: the whole dialog family that bot already handles) */
async function clear0(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{/* coop-thin G #7 (bot family): a full-screen scene (.kmov, e.g. the mirror reveal of the toilette) sits ON TOP of the game frame; a player can only touch the scene: the bot ends a scene by its own «Tiếp theo» first, and never clicks a frame button covered by a scene (it closed #kg82 under the reveal: kg82ShowRes null at the reveal's end) */{const t=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&getComputedStyle(x).display!=='none'&&getComputedStyle(x).visibility!=='hidden');if(t){const e=[...t.querySelectorAll('.kmend,[data-km-close],.krevok')].find(x=>x.offsetParent!==null&&!x.disabled)||[...t.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled).pop();/* its own end (whole scene family): KIT 81 «Tiếp theo» (.kmend), the reward's «Nhận» ([data-km-close]), the item gain's «Nhận» (.krevok), else the scene's own last button */if(e){e.click();return'x'}}}{const ov=document.getElementById('ov');if(ov&&!ov.hidden&&getComputedStyle(ov).display!=='none'){const vis=e=>{if(!(e&&e.offsetParent!==null&&!e.disabled))return false;const r=e.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;if(x<0||y<0||x>=innerWidth||y>=innerHeight)return true;const h=document.elementFromPoint(x,y);return !h||e.contains(h)||!h.closest('.kmov')};/* coop-thin G #7: never a button a player cannot touch (under a full-screen scene) */const b=[...ov.querySelectorAll('[id$=done]')].filter(vis).pop()||[...ov.querySelectorAll('[id^=toilmoc],[id$=skip]')].filter(vis).filter(e=>e.id!=='mgskip'&&!e.dataset.tsk).pop()||[...ov.querySelectorAll('[id$=skip]')].filter(vis).pop()||[...ov.querySelectorAll('button')].find(b=>/^(Bỏ qua|Xong|Thôi|Đã hiểu|Tiếp|Đóng)/.test(b.textContent.trim())&&vis(b))/* coop-thin-g-f1 (bot family, main kit-dialog; as coop-thin-g mgSkip): a result screen whose «Đã hiểu» is folded into the frame's ✕ (j82: ✕ on a result screen presses #kg82ok / #kg92ok, the result applies) */||((document.getElementById('kg82ok')||document.getElementById('kg92ok'))?[...ov.querySelectorAll('button')].find(x=>x.textContent.trim()==='✕'&&vis(x)):null);if(b){b.dataset.tsk=1;b.click();return'x'}}}/* coop-thin G: a mini game opened on HER phone (F6b dress board, «Hội phối đồ · <đề>» → Tự tay phối đồ): the room waits while she plays (CW.frPz); the bot skips it (her maid picks), as coop-thin-g mgSkip */const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}/* the steal mini-game window: THE helper (lib/coop-clear.js step 5) *//* a mini-game on screen (the steal game after Tranh sủng, jsmg herGame): play it out like a player (quick option «Thôi, không chơi», then the result frame's kit ✕ «Quay lại», which presses the hidden «Đã hiểu», jk4 kitOvSync); wiping S.mg leaves jsmg BUSY and jnf's choice in st "mg" for good */const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');/* selx 3 days: the Dư đồ opened from her free card hides that card; a player goes back with «‹ Dư đồ» / the rail «Về Dư đồ» / the Hành sự tab */if(m&&m.hidden&&typeof Q!=='undefined'&&Q[0]&&Q[0].selxMapUp){const bk=[...document.querySelectorAll('#panel [data-kpmback],#krail [data-rail="back"],#tabs [data-tab="act"]')].find(x=>x.offsetParent!==null);if(bk){bk.click();return'x'}}if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||[...m.querySelectorAll('#mr button:not([disabled]),.k3foot button:not([disabled])')].find(x=>x.offsetParent!==null)/* coop-thin G #4: only a visible button (a kit info card hides #mclose; its close is the ✕) */||(()=>{const O=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];if(!O.length)return null;const k=(document.getElementById('mt')||{}).textContent+'|'+O.length;if(window.__clrK===k)window.__clrN=(window.__clrN|0)+1;else{window.__clrK=k;window.__clrN=0}return O[window.__clrN%O.length]})()/* coop-thin G #4: the same card still open after a pick (an option she cannot pay is ignored by chooseM) → the next option */||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const press=o=>o.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled&&n.offsetParent){n.click();return true}return false}).catch(()=>false);
const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,used:typeof used==='number'?used:null,out:!!S.out,place:S.place,pend:!!COOPW.pend,sent:COOPW.sent,nrdy:COOPW.nrdy,ngoW:COOPW.ngoW,ended:COOP.state.ended,
  Q:Q.length,q0:Q[0]&&String(Q[0].t||'').slice(0,40),mh:!!(document.getElementById('modal')||{}).hidden,btn:[...document.querySelectorAll('#modal button')].filter(x=>x.offsetParent!==null).map(x=>(x.disabled?'-':'')+(x.className||'')+':'+x.textContent.trim().slice(0,30)+(x.dataset.kcp?'[kcp]':'')).slice(0,8),top:(()=>{const e=document.elementFromPoint(innerWidth/2,innerHeight/2);return e?(e.id||e.className||e.tagName).toString().slice(0,40)+' '+(e.closest('[id]')||{}).id:''})(),dawn:!!(document.getElementById('dawn')&&!document.getElementById('dawn').hidden&&document.getElementById('dawn').offsetParent),mg:!!S.mg,next:(document.getElementById('next')||{}).textContent,dis:!!(document.getElementById('next')||{}).disabled,fz:!!document.getElementById('coopfz'),wk:COOPW.whereKey,life:COOPW.life,dead:!!S.dead,inLife:!!COOPW.inLife,
  nf:{on:typeof nfOn==='function'?nfOn():null,parked:typeof nfParked==='function'?nfParked():null,fin:S.nfFin,W:S.nfW,N:S.nfN,C:S.nfC,x:S.nfX&&S.nfX.st},turn:S.turn,day:S.turn*3+(S.tuan||0),frozen:!!COOP.frozen,tm:(()=>{try{return COOPW.tm.view()}catch(e){return null}})(),tr:(COOPW.tr||[]).slice(-16)})).catch(e=>({err:e.message}));
(async()=>{const b=await chromium.launch(/\/\/(127\.0\.0\.1|localhost)[:/]/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,LocalNetworkAccessChecks']}:{});
 const FOLD=[755,1000,2],IPAD=[1180,820,1];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];
 let A=await mk(b,'host',VA),B=await mk(b,'guest',VB);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000);
 ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!S.dead&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
 async function both(ms=150000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))return true;await sleep(700)}return false}
 ok(await both(),'both chose their thân phận and are in the game');
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:3);
 /* warm-up: one plain week for both (out of the selection days, both in the palace) */
 {const t0=Date.now();let w=false;while(Date.now()-t0<240000&&!w){await clear(A);await clear(B);await press(A);await press(B);const a=await D(A),c=await D(B);w=a.w>=1&&c.w>=1&&!a.pend&&!c.pend&&!a.inLife&&!c.inLife;await sleep(600)}ok(w,'warm-up week merged on both',w?undefined:[await D(A),await D(B)])}
 async function rejoin(X,host){await X.page();await X.p.goto(host?BASE:BASE+'?room='+code,DCL);await X.p.waitForTimeout(3000);
  if(host){await tapText(X,/^(Chơi cùng bạn|Cùng hảo hữu)/);await X.p.waitForTimeout(600);await tapText(X,/^Trở lại phòng/)}else await tapText(X,/^Vào phòng|^Tiếp tục/,4000);
  return until(X,s=>COOP.seat===s&&!COOP.frozen&&!!(window.COOPW&&COOPW.on)&&typeof S!=='undefined'&&!!S,host?'a':'b',60000)}
 /* both seats to buổi tối of the current room week (the day buổi step for both) */
 async function toNight(ms=180000){const t0=Date.now();while(Date.now()-t0<ms){await clear(A);await clear(B);const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;if(a.b<LAST)await press(A);if(c.b<LAST)await press(B);for(const [o,x] of [[A,a],[B,c]])if(x.Q&&x.mh)await o.p.evaluate(()=>{try{showModal()}catch(e){}});await sleep(600)}return false}
 async function merged(w0,ms=150000,X,Y,keepY){const t0=Date.now();while(Date.now()-t0<ms){await clear(X);if(!keepY)await clear(Y);await press(X);if(!keepY)await press(Y);const a=await D(A),c=await D(B);if(a.w>w0&&c.w>w0&&!a.pend&&!c.pend)return true;await sleep(700)}return false}
 /* state setters (run on the seat X, the one that is LATE: the friend ends first) */
 const SET={
  cold:o=>o.p.evaluate(()=>{if(!S.out){cold('Thử: bị đày vào lãnh cung')}try{render()}catch(e){}return{out:S.out,place:S.place}}),
  sick:o=>o.p.evaluate(()=>{try{if(typeof sickOn==='function')sickOn(S,'phong');else S.ill={k:'phong',d:3}}catch(e){S.ill={k:'phong',d:3}}try{render()}catch(e){}return{ill:S.ill}}),
  away:o=>o.p.evaluate(()=>{try{const ks=['vuon','tyv','ksp'];for(const k of ks){try{goTo(k);if(S.place===k)break}catch(e){}}}catch(e){}try{render()}catch(e){}return{place:S.place}}),
 };
 /* one case: X = the late seat (state st), Y = ends first. how: 'rd' = X pressed ready before Y ends, 'idle' = X never pressed (spends her
    khắc after), 'dlg' = a card is open on X when Y ends, 'rejoin' = X reloads after Y ended, 'clock' = the room clock runs out after Y ended */
 const ALL=[['M1','b','cold','nofin'],['D1','b','','drift'],['D2','a','','drift'],['F1','b','cold','nfn'],['F2','b','','nfn'],['FH','a','','nfnG'],['K1','b','cold','reborn'],['K2','b','cold','rdreborn'],['L1','b','cold','rd'],['L3','b','cold','clock'],['L4','b','cold','rejoin'],['L5','b','cold','dlg'],
  ['S1','b','sick','rd'],['W1','b','away','rd'],['R1','b','','rejoin'],['H1','a','cold','rd'],['H2','a','cold','clock'],['HK','a','cold','reborn']];
 const pick=(process.env.CASES||'').split(',').filter(Boolean);const CASES=pick.length?ALL.filter(c=>pick.includes(c[0])):ALL;
 for(const [tag,seat,st,how] of CASES){let X=seat==='a'?A:B;const Y=seat==='a'?B:A;const name=tag+' ('+(seat==='a'?'host':'guest')+' '+(st||'plain')+', '+how+')';
  for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}
  if(st){const r=await SET[st](X);console.log(tag,'set',JSON.stringify(r))}
  /* drift (room e: guest day 317, host day 314 → 315 in the same room week 306): the late seat's calendar is one tuần off the room's */
  if(how==='drift')console.log(tag,'drift',JSON.stringify(await X.p.evaluate(()=>{const a=S.turn*3+S.tuan;if(S.tuan<2)S.tuan++;else{S.tuan=0;S.turn++}return{from:a,to:S.turn*3+S.tuan}})));
  if(!await toNight()){ok(false,name+': both at tối',[await D(A),await D(B)]);continue}
  if(st==='cold')ok((await D(X)).out,name+': in lãnh cung at tối');
  const w0=(await D(A)).w;const u0=(await D(X)).used;
  if(how==='rd'){let rd=false;const t0=Date.now();while(Date.now()-t0<20000&&!rd){await clear(X);await press(X);await sleep(400);rd=await X.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))}ok(rd,name+': late seat ready at tối')}
  if(how==='dlg')await X.p.evaluate(()=>{Q.push({t:'Thẻ thử',h:'<p>Thử</p>'});try{showModal()}catch(e){}});
  if(how==='clock'){await A.p.evaluate(()=>{BAL.coopTm.buoiMs=9000;COOPW.tm.reset()})}
  if(how==='reborn'||how==='rdreborn'){if(how==='rdreborn'){let rd=false;const t0=Date.now();while(Date.now()-t0<20000&&!rd){await clear(X);await press(X);await sleep(400);rd=await X.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))}ok(rd,name+': late seat ready at tối')}
   const l0=(await D(Y)).life;await Y.p.evaluate(()=>{die('Thử: trúng gió')});let nl=false;const t0=Date.now();
   while(Date.now()-t0<150000&&!nl){await clear(Y);await clear(X);const y=await D(Y);nl=!y.dead&&!y.inLife&&y.life>l0&&!y.err;await sleep(700)}
   ok(nl,name+': the friend died and is reborn in the room',await D(Y));
   if(how==='reborn'){let rd=false;const t1=Date.now();while(Date.now()-t1<20000&&!rd){await clear(X);await press(X);await sleep(400);rd=await X.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))||(await D(X)).sent===w0}}
   await toNight(120000)}
  if(how==='nofin'){/* the host's night words never reach her (lost / never sent: his new life that did not flip today, a reload) */
   await A.p.evaluate(()=>{if(!window.__nfDrop){const s0=COOP.send.bind(COOP);window.__nfDrop=1;COOP.send=function(m){if(window.__nfDrop&&m&&m.t==='act'&&m.k==='ctm-nf')return true;return s0(m)}}else window.__nfDrop=1})}
  if(how==='drift'||how==='nofin'){let rd=false;const t0=Date.now();while(Date.now()-t0<20000&&!rd){await clear(X);await press(X);await sleep(400);rd=await X.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))}ok(rd,name+': late seat ready at tối')}
  if(how==='nfn'||how==='nfnG'){/* the friend's own night already played today (his visit / a summons: jnf S.nfN = today) → jnf marks the
    day «done» with no flip and no choice; before: no «fin» ever went out for that day */
   let rd=false;const t0=Date.now();while(Date.now()-t0<20000&&!rd){await clear(X);await press(X);await sleep(400);rd=await X.p.evaluate(()=>!!(COOPW.nReady&&COOPW.nReady()))}ok(rd,name+': late seat ready at tối');
   await (how==='nfn'?Y:A).p.evaluate(()=>{S.nfN=wk()})}
  /* Y ends first */
  {const t0=Date.now();let e=false;while(Date.now()-t0<150000&&!e){await clear(Y);await press(Y);await sleep(500);const s=await D(Y);e=!!(s.ended&&s.ended[seat==='a'?'b':'a'])||s.sent===s.w||s.w>w0}ok(e,name+': the friend ended first',await D(Y))}
  await sleep(3000);if(process.env.HE_DBG)console.log(tag,'after friend end',JSON.stringify([await D(A),await D(B)]).slice(0,3000));
  if(how==='idle'){/* (4) her last khắc: a real act (Nghỉ ngơi …) at tối once the friend ended — the clock must move or the week end */
   const s0=await D(X);const r=await X.p.evaluate(()=>{try{const u=used;spend(1);render();return{u0:u,u1:used}}catch(e){return{err:e.message}}});await sleep(1500);const s1=await D(X);
   console.log(tag,'spend',JSON.stringify(r),'used',s0.used,'→',s1.used)}
  {const h=await X.p.evaluate(()=>({held:typeof nfDayHeld==='function'?nfDayHeld():null,can:can(1),used,b:S.buoi||0,fin:S.nfFin,W:S.nfW,C:S.nfC,d:typeof wk==='function'?wk():null}));if(h.held)ok(!h.can,name+': (4) while the night holds her day, no act runs (no free last khắc)',h);else console.log(tag,'held',JSON.stringify(h))}
  if(how==='rejoin'){await X.p.close();await sleep(2000);ok(await rejoin(X,seat==='a'),name+': back in the room');await sleep(3000);const s=await D(X);
   ok(s.w===w0&&(s.b>=LAST||s.sent===w0||s.w>w0),name+': (5) the reload keeps her tối (no rewind)',s)}
    if(how==='dlg'){await sleep(4000);await X.p.evaluate(()=>{try{closeModal()}catch(e){Q.length=0}})}
  const okM=await merged(w0,150000,X,Y,how==='clock');if(how==='nofin')await A.p.evaluate(()=>{window.__nfDrop=0});if(how==='clock')await A.p.evaluate(()=>{BAL.coopTm.buoiMs=300000;COOPW.tm.reset()});
  if(!okM){await A.p.screenshot({path:OUT+'/'+tag+'-host.png'}).catch(()=>{});await B.p.screenshot({path:OUT+'/'+tag+'-guest.png'}).catch(()=>{})}
  ok(okM,name+': the late seat ends too, the week merges on both seats',okM?undefined:[await D(A),await D(B)]);
  if(okM){const a=await D(A),c=await D(B);ok(a.w===c.w,name+': same room week on both',{a:a.w,b:c.w});ok(a.day===c.day,name+': one calendar on both seats after the merge (jnf day)',{a:a.day,b:c.day})}
 }
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
