/* Co-op end-to-end: two Playwright browsers in one room against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-e2e.js [outdir] [workerURL]
   A = Fold portrait 686x880@2.2 (host), B = iPad landscape 1180x820@2 (guest).
   Steps: create room, join by ?room=, play 3 weeks (both end → merged week), B leaves → A frozen ("Đợi bạn trở lại"),
   B comes back → resumes same week, B dies → normal rebirth choice → new person in the SAME world, single-player + old save still load.
   Hooks used (PROTOCOL.md / jcoop.js): window.COOP {code,seat,week,online,ended,frozen,waiting,on}, rivals entry coop:true id 901/902. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');const QTR=require('./coop-qtrace.js');const K61P=require('./k61-coop-probe.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* real boot condition (the game script ran to its end: window.__ctmBuilt, assemble.py), not a 3-3.5 s timer; a page that never boots still reaches the next step, whose own check then fails */
const booted=o=>o.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await QTR(ctx);/* socket log for failure dumps: every WebSocket the page opens (url tail, open / close code, ms since load) */
  await ctx.addInitScript(()=>{const W0=window.WebSocket,t0=Date.now();window.__wsLog=[];window.WebSocket=function(u,p){const w=p===undefined?new W0(u):new W0(u,p);/* COOP_RECONNECT: a sleeping phone's socket looks open but hears nothing (frames dropped while __wsDeaf) */Object.defineProperty(w,'onmessage',{configurable:true,set(f){w.addEventListener('message',e=>{if(!window.__wsDeaf)f.call(w,e)})}});const L=window.__wsLog,i=L.length,tag=String(u).replace(/^.*\/room\//,'').replace(/&name=.*$/,'');
    L.push([Date.now()-t0,'new',tag]);w.addEventListener('open',()=>L.push([Date.now()-t0,'open',i]));w.addEventListener('close',e=>L.push([Date.now()-t0,'close',i,e.code]));return w};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})});
  await ctx.addInitScript(()=>{/* stuck dumps: the night relay (jnf ctm-nf) both ways, last 24 */const t=setInterval(()=>{if(window.__ctmBuilt!==1||typeof COOP!=='object'||!COOP.on||!COOP.send)return;clearInterval(t);const L=window.__nfTr=[];const P=(d,m)=>{if(m&&m.k==='ctm-nf'){L.push([d,m.mode,m.ph||'',m.d,m.fin?1:0,m.open?1:0,typeof wk==='function'?wk():null]);if(L.length>24)L.shift()}};const s0=COOP.send;COOP.send=function(m){P('>',m);return s0.apply(this,arguments)};COOP.on('act',m=>P('<',m))},200)});
  if(process.env.COOP_EMOTRACE)await ctx.addInitScript(()=>{/* debug: who writes a world person's feeling cause / name on this seat (stack) */
    const t=setInterval(()=>{if(window.__ctmBuilt!==1||typeof emoSet!=='function')return;clearInterval(t);window.__emoTr=[];
     Error.stackTraceLimit=40;const W=(n,f)=>function(p){try{if(window.COOPW&&COOPW.on&&p&&typeof p==='object'&&p!==S){window.__emoTr.push({f:n,who:p.name,wk:COOP.state.week,fc:COOPW.inFC||0,a:[].slice.call(arguments,1,4).map(x=>typeof x==='object'?'obj':String(x).slice(0,60)),st:(new Error().stack||'').split('\n').slice(2,30).map(x=>x.trim().slice(0,90))});if(window.__emoTr.length>60)window.__emoTr.shift()}}catch(e){}return f.apply(this,arguments)};
     emoSet=W('emoSet',emoSet);window.emoSet=emoSet},200)});
  /* night-final (jnf, owner OD 16/11 22:45Z): the flip choice opens only after the card-flip scene has played, and j93 plays no scene while the
     Luân hồi roulette is up (kmFree). Hiding .kcf / #kroul with CSS (merge-train-4) left both stuck for ever (a player always sees them): clear()
     now ends them like a player — «Bỏ qua» on the roulette, the scene's kit end button (KIT 81) — so nothing is hidden here. */await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(+process.env.E2E_TO||30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
const shot=async(o,n)=>{await o.p.waitForTimeout(400);const t0=Date.now();const alive=await Promise.race([o.p.evaluate(()=>1),sleep(10000).then(()=>0)]);if(!alive){ok(false,`${n} ${o.name}: page responsive`);return}
  try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`,timeout:120000})}catch(e){ok(false,`${n} ${o.name}: screenshot (${e.message.split('\n')[0]})`);return}
  const ov=await o.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${n} ${o.name}: no horizontal overflow`)};
const C=o=>o.p.evaluate(()=>__co());
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}}
/* wait for fn while both players read their dialogs (the week's end goes out only once her dialogs are closed) */
async function untilC(o,fn,arg,ms=40000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(fn,arg).catch(()=>false))return true;for(const x of ALL)if(x.p&&!x.p.isClosed())await clear(x);await sleep(300)}return false}
const ALL=[];
/* DOMContentLoaded, not load: a CDN picture or font that hangs on the network held the load event past 120 s (3 of ~17 runs, always the guest's join); the game is up at DCL and every step waits for its own state */
const DCL={waitUntil:'domcontentloaded'};
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){/* the click itself is done; a navigation it starts (Chơi một mình → the sổ) is waited for by the caller's own state checks (a slow machine held 'scheduled navigations' past 30 s) *//* the panel may re-render between finding the button and clicking it (element detached): find it again */
  try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
/* close story/news modals of the normal game (never the co-op waiting/freeze panel) */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{/* coop-thin G #7 (bot family): a full-screen scene (.kmov, e.g. the mirror reveal of the toilette) sits ON TOP of the game frame; a player can only touch the scene: the bot ends a scene by its own «Tiếp theo» first, and never clicks a frame button covered by a scene (it closed #kg82 under the reveal: kg82ShowRes null at the reveal's end) */{const t=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&getComputedStyle(x).display!=='none'&&getComputedStyle(x).visibility!=='hidden');if(t){const e=[...t.querySelectorAll('.kmend,[data-km-close],.krevok')].find(x=>x.offsetParent!==null&&!x.disabled)||[...t.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled).pop();/* its own end (whole scene family): KIT 81 «Tiếp theo» (.kmend), the reward's «Nhận» ([data-km-close]), the item gain's «Nhận» (.krevok), else the scene's own last button */if(e){e.click();return'x'}}}{const ov=document.getElementById('ov');if(ov&&!ov.hidden&&getComputedStyle(ov).display!=='none'){const vis=e=>{if(!(e&&e.offsetParent!==null&&!e.disabled))return false;const r=e.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;if(x<0||y<0||x>=innerWidth||y>=innerHeight)return true;const h=document.elementFromPoint(x,y);return !h||e.contains(h)||!h.closest('.kmov')};/* coop-thin G #7: never a button a player cannot touch (under a full-screen scene) */const b=[...ov.querySelectorAll('[id$=done]')].filter(vis).pop()||[...ov.querySelectorAll('[id^=toilmoc],[id$=skip]')].filter(vis).filter(e=>e.id!=='mgskip'&&!e.dataset.tsk).pop()||[...ov.querySelectorAll('[id$=skip]')].filter(vis).pop()||[...ov.querySelectorAll('button')].find(b=>/^(Bỏ qua|Xong|Thôi|Đã hiểu|Tiếp|Đóng)/.test(b.textContent.trim())&&vis(b))/* coop-thin-g-f1 (bot family, main kit-dialog; as coop-thin-g mgSkip): a result screen whose «Đã hiểu» is folded into the frame's ✕ (j82: ✕ on a result screen presses #kg82ok / #kg92ok, the result applies) */||((document.getElementById('kg82ok')||document.getElementById('kg92ok'))?[...ov.querySelectorAll('button')].find(x=>x.textContent.trim()==='✕'&&vis(x)):null);if(b){b.dataset.tsk=1;b.click();return'x'}}}/* coop-thin G: a mini game opened on HER phone (F6b dress board, «Hội phối đồ · <đề>» → Tự tay phối đồ): the room waits while she plays (CW.frPz); the bot skips it (her maid picks), as coop-thin-g mgSkip */const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const kg=[...document.querySelectorAll('#kg82skip')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('[hidden]'))||(typeof KG82!=='undefined'&&KG82.phase==='result'?[...document.querySelectorAll('#ov .kit-x[data-kitx=kgback],#ov .kit-x[data-kitx=ov]')].find(x=>x.offsetParent!==null):null);if(kg){kg.click();return'x'}/* a mini-game on screen (the steal game after Tranh sủng, jsmg herGame): play it out like a player (quick option «Thôi, không chơi», then the result frame's kit ✕ «Quay lại», which presses the hidden «Đã hiểu», jk4 kitOvSync); wiping S.mg leaves jsmg BUSY and jnf's choice in st "mg" for good */const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||[...m.querySelectorAll('#mr button:not([disabled])')].find(x=>x.offsetParent!==null)/* coop-thin G #4: only a visible button (a kit info card hides #mclose; its close is the ✕) */||(()=>{const O=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];if(!O.length)return null;const k=(document.getElementById('mt')||{}).textContent+'|'+O.length;if(window.__clrK===k)window.__clrN=(window.__clrN|0)+1;else{window.__clrK=k;window.__clrN=0}return O[window.__clrN%O.length]})()/* coop-thin G #4: the same card still open after a pick (an option she cannot pay is ignored by chooseM) → the next option */||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* press "Qua buổi"/"Qua đêm" when it is enabled (waits up to 20 s: after the friend's dialogs, the host's NPC places, …) */
async function press(o,k0){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(k0=>{
   /* a night with the Emperor (jnight) spends the rest of her day: her buổi is already ended through the co-op path (bend / week end) */
   if(k0&&(COOPW.bend||COOPW.pend||__co().waiting||COOPW.nrdy===__co().week))return true;/* … or the room clock already ended her tối (jcooptimer dueTick → nightReady: a slow machine reaches the room's time limit) */
   const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true},k0||null);if(r&&!k0)return true;
   /* review/coop-c4-stuck: a click while a card is still queued (Q not yet on screen) is ignored by nextBuoi (Q.length): only count the press when it took */
   if(r&&await until(o,k0=>!!(COOPW.bend||COOPW.pend||__co().waiting||COOPW.nrdy===__co().week||document.getElementById('next').disabled||__co().week+':'+(S.buoi||0)!==k0),k0,2500))return true;await sleep(250)}
  ok(false,o.name+' #next enabled',await o.p.evaluate(()=>({b:[S.buoi||0,S.tuan,S.month,document.getElementById('next').textContent],co:__co(),bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,nrdy:COOPW.nrdy,pendBuoi:!!COOPW.pendBuoi,wk:COOPW.whereKey,st:COOP.state.status,ended:COOP.state.ended,Q:Q.length,tr:COOPW.tr.slice(-16),nf:typeof nfDebug==='function'?nfDebug():null,scr:(()=>{/* what is on her screen (stuck dump): modal title + buttons, every visible scene / overlay and its buttons */const V=x=>!!x&&x.offsetParent!==null;const bt=r=>[...r.querySelectorAll('button')].filter(V).map(x=>(x.id||x.className||'').toString().slice(0,24)+':'+x.textContent.trim().slice(0,20)+(x.disabled?'(off)':'')).slice(0,12);const m=document.getElementById('modal');return{modal:m&&!m.hidden?{t:((document.getElementById('mt')||{}).textContent||'').slice(0,60),b:bt(m)}:null,ov:[...document.querySelectorAll('.kmov,#ov,#kg82,.kcf,#kroul,#kneov,.kfoc,[class^=jnf],[id^=jnf]')].filter(x=>V(x)||getComputedStyle(x).display!=='none'&&x.getClientRects().length).map(x=>({k:(x.id||x.className).toString().slice(0,40),b:bt(x)})).slice(0,8),mg:typeof S!=='undefined'&&S&&S.mg?Object.keys(S.mg).slice(0,6):null,nf:typeof S!=='undefined'&&S&&S.nf?JSON.stringify(S.nf).slice(0,200):null,q0:Q[0]?JSON.stringify(Q[0]).slice(0,200):null}})(),ws:window.__wsLog})));if(process.env.COOP_QTRACE)console.log('QTRACE '+o.name+' '+JSON.stringify(await o.p.evaluate(QTR.dump).catch(e=>String(e))));return false}
/* one buổi for both (PROTOCOL §9: the buổi advances when both have ended it) */
/* COOP_NIGHTS=1 (stress): before a buổi, one seat may win a night with the Emperor (as Tranh sủng does), so jnight ends her day */
const NIGHTS=+process.env.COOP_NIGHTS||0;
async function night(o){await o.p.evaluate(()=>{const v=liveRivals(false).find(x=>!x.coop);if(!v||S.dead)return;S.preg=0;stealWin(S,v,'feign');showModal()});COOPW_n=(typeof COOPW_n==='number'?COOPW_n:0)+1}
var COOPW_n=0;
/* COOP_SPILL=1 (review/khac-day): before a day buổi, seat A runs a 2-khắc act with 1 khắc left, so it spills (j76: S.j76carry);
   once the room turns the buổi, A starts it with exactly that 1 khắc already used: never 0 (lost), never 2 (charged twice) */
const SPILL=+process.env.COOP_SPILL||0;
async function spillA(A){return A.p.evaluate(()=>{if(S.dead||Q.length||S.mg||(S.buoi||0)>=B4L||COOPW.bend||COOPW.pend)return null;
  /* read used right as the buổi turns (later dialogs of the new buổi may spend khắc of their own) */
  if(!window.__tuw){window.__tuw=1;const n0=nextBuoi;nextBuoi=function(){const b=S&&S.buoi;const r=n0.apply(this,arguments);try{if(S&&S.buoi!==b)window.__tu={b:S.buoi,used,carry:S.j76carry||0}}catch(e){}return r}}window.__tu=null;used=3;S.j76carry=0;S.j76ck="";
  const i=deck.findIndex(a=>a&&a.b==null&&!a.done&&cardCost(a)===2&&!cardWhy(a));if(i<0)return null;const need=j76need(2);act(i);if(used===3&&!S.j76carry)return null;/* the card asks first (Tự học → kg82 minigame, a choice): it spends at its end; not this check */return{n:deck[i].n,need:need.t,used,carry:S.j76carry||0}})}
/* COOP_SPILL=2 (time-spill sweep 16/11): a 2-khắc WALK with 1 khắc left also runs on in co-op: her buổi ends (bend), and when the room
   turns she arrives with the rest of the walk paid from the new buổi (j9 walkSpillGo waits for the room) */
async function spillWalkA(A){return A.p.evaluate(()=>{if(S.dead||Q.length||S.mg||(S.buoi||0)>=B4L||COOPW.bend||COOPW.pend||S.out||S.confined)return null;
  S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};used=3;S.j76carry=0;S.j76ck="";window.__walkSpill=null;
  const k=places().map(x=>x.k).find(k=>{if(k==="home"||travel("home",k)<2)return false;const P=walkSpill(k);return !!(P&&P.ok)});if(!k)return null;
  const P=walkSpill(k);walkGo(k);return{walk:1,k,rest:P.rest,used,pending:!!window.__walkSpill}})}
/* COOP_RECONNECT=1 (review/coop-stable): a seat's phone sleeps (owner 16/11 "không thấy sang buổi"): its socket still looks open to
   the server, but every frame relayed to it meanwhile is lost; it wakes after > 3 s and jcoop's wake() reconnects at once, so the friend
   never sees a peer drop. The seat must catch up from the room snapshot / a resync, never sit on "Chờ hảo hữu…". */
const RECON=+process.env.COOP_RECONNECT||0;
const netDown=o=>o.p.evaluate(()=>{if(!window.__visHook){window.__visHook=1;Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>window.__vis||'visible'})}
  window.__vis='hidden';document.dispatchEvent(new Event('visibilitychange'));window.__wsDeaf=true});
const netUp=async o=>{const n0=await o.p.evaluate(()=>{window.__wsDeaf=false;window.__vis='visible';const n=(window.__wsLog||[]).length;document.dispatchEvent(new Event('visibilitychange'));return n});
  return until(o,n=>COOP.state.status==='open'&&window.__wsLog.length>n,n0,30000)};
async function buoiBoth(A,B,shotWait){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));
  if(NIGHTS&&Math.random()<.45)await night(Math.random()<.5?A:B);
  const sp=SPILL===2?await spillWalkA(A):SPILL?await spillA(A):null;if(sp&&sp.walk)ok(sp.used===4&&sp.pending,'walk spill '+k0+': her buổi ends on the road',sp);else if(sp)ok(sp.used===4&&sp.carry===1,'spill '+k0+': act runs on into the next buổi (carry 1)',sp);
  await press(A,k0);if(shotWait)await shot(A,shotWait);await press(B,k0);
  /* a seat whose week end is out (after its tối, or a night that spent its day) waits for the merged week: count it as done */
  const key=o=>o.p.evaluate(()=>COOPW.pend||__co().waiting?'end':__co().week+':'+(S.buoi||0));
  for(let t=0;t<80;t++){const a=await key(A),b=await key(B);if(a!==k0&&b!==k0&&(a===b||a==='end'||b==='end')){
    if(sp&&sp.walk){const st=await (async()=>{for(let i=0;i<30;i++){const r=await A.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),place:S.place,used,pending:!!window.__walkSpill}));if(r.place!=='home'||!r.pending)return r;await clear(A);await sleep(300)}return A.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),place:S.place,used,pending:!!window.__walkSpill}))})();ok(st.place===sp.k&&st.used>=sp.rest,'walk spill '+k0+' → '+st.k+': arrives in the new buổi, rest of the walk paid',Object.assign({want:sp.k,rest:sp.rest},st))}
    if(sp&&sp.carry===1){await A.p.waitForFunction(()=>{const t=window.__tu;return !!(t&&t.used===1&&!t.carry)},null,{timeout:8000}).catch(()=>{});const st=await A.p.evaluate(()=>Object.assign({k:__co().week+':'+(S.buoi||0),now:used},window.__tu||{used:-1}));ok(st.used===1&&!st.carry,'spill '+k0+' → '+st.k+': the next buổi pays the carry once',st)}
    return true}await clear(A);await clear(B);await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,nf:typeof nfDebug==='function'?(()=>{const d=nfDebug();return Object.assign(d,{ntr:window.__nfTr,last:S.nfLast?{d:S.nfLast.d,fin:S.nfLast.fin,ph:S.nfLast.ph}:null,W:S.nfW})})():null,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++){if(RECON&&w===0&&k===n-1){await nightGap(A,B);continue}await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}}
/* the night handshake while the HOST is offline: the guest's "ready" (ctm-nr rd) reaches nobody; the host comes back on a fast reconnect
   (the guest never sees a peer drop) and presses: the night must still go (before: both sat on "Chờ hảo hữu…" until the room clock) */
async function nightGap(A,B){const w0=(await C(A)).week;await clear(A);await clear(B);await netDown(A);await sleep(800);await press(B,'n');await sleep(3500);
 ok(await netUp(A),'reconnect: host back online at night');await press(A,'n');
 const r=await untilC(A,x=>__co().week===x+1||COOPW.pend||COOPW.sent===x,w0,60000);ok(r,'reconnect: the night goes after the host reconnects (guest ready sent while it was away)',r?undefined:await A.p.evaluate(()=>COOPW.tr.slice(-14)))}

(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults']}:{});/* a local `wrangler dev` Worker (fix proofs before a deploy) */
 /* COOP_SWAP=1 (review/coop-thin-a): roles swapped — the iPad hosts (seat a), the Fold joins (seat b) */
 const FOLD=['fold',[686,880,2.2]],IPAD=['ipad',[1180,820,2]];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];
 const A=await mk(b,VA[0],VA[1]),B=await mk(b,VB[0],VB[1]);ALL.push(A,B);
 /* COOP_MLINE: the guest must be a consort with her own maids (a random cung nữ start has none, the mline check would be void) */
 if(+process.env.COOP_MLINE)await B.ctx.addInitScript(()=>{window.__forceOrigin='thd'});
 /* COOP_A_ORIGIN / COOP_B_ORIGIN=<ORIGINS k> (e.g. cn = cung nữ): pin a seat's thân phận (the random draw makes some paths rare) */
 /* COOP_STAFFLOG=1 (coop-staff-split probe): each seat logs every change of the world consorts' staff lists (poll) + every new servant made (mkServ stack) */
 if(+process.env.COOP_STAFFLOG)for(const o of [A,B])await o.ctx.addInitScript(()=>{window.__sl=[];let last=null,wrapped=false;const sig=()=>{try{return rivals.filter(v=>!v.coop).map(v=>v.id+':'+(v.staff||[]).filter(x=>!x.coop).map(x=>x.sid+x.name).join(',')).join(';')}catch(e){return null}};
  setInterval(()=>{try{if(typeof S==='undefined'||!S||!window.COOPW||!COOPW.base)return;if(!wrapped&&typeof mkServ==='function'){wrapped=true;const m0=mkServ;mkServ=function(){const r=m0.apply(this,arguments);try{window.__sl.push({mk:r&&[r.sid,r.name],wk:__co().week,d:[S.month,S.tuan,S.buoi||0],st:new Error().stack.split('\n').slice(2,14).map(x=>x.trim().replace(/\(.*\//,'(')).join(' < ')})}catch(e){}return r}}
   const g=sig();if(g!==last){const b=(()=>{try{return COOPW.base.W.R.filter(v=>!v.coop).map(v=>v.id+':'+(v.staff||[]).filter(x=>!x.coop).map(x=>x.sid+x.name).join(',')).join(';')}catch(e){return null}})();
    if(last!=null){const A0=last.split(';'),A1=g.split(';');window.__sl.push({chg:A1.filter(x=>!A0.includes(x)),was:A0.filter(x=>!A1.includes(x)),eqBase:g===b,wk:__co().week,d:[S.month,S.tuan,S.buoi||0],tr:COOPW.tr.slice(-4)})}last=g}}catch(e){}},120)});
 for(const [o,k] of [[A,process.env.COOP_A_ORIGIN],[B,process.env.COOP_B_ORIGIN]])if(k)await o.ctx.addInitScript(k=>{window.__forceOrigin=k},k);
 /* 1 host makes a room */
 await A.page();await A.p.goto(BASE,DCL);await booted(A);await shot(A,'01-title');
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);await shot(A,'02-coop-menu');
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 {const r=await until(A,()=>__co().code&&__co().seat==='a');ok(r,'A has a room code, seat a',r?undefined:await A.p.evaluate(()=>({st:COOP.state.status,you:COOP.state.you,room:COOP.state.room,pid:COOP.pid,ws:window.__wsLog})))}
 const code=(await C(A)).code;console.log('room',code);await clear(A);await shot(A,'03-invite-waiting');
 const w0=await A.p.evaluate(()=>!!(__co().frozen));ok(w0,'A waits for the friend (frozen before join)');
 /* 2 guest joins by link */
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await booted(B);await shot(B,'04-join');
 await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 ok(await until(A,()=>!__co().frozen,null,20000),'A unfrozen when B is in');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world);if(a&&c)break;await sleep(500)}}
 {const wd=o=>o.p.evaluate(()=>{const m=document.getElementById('modal'),t=document.getElementById('title'),k=document.getElementById('kroul');return{S:typeof S!=='undefined'&&!!S,n:typeof S!=='undefined'&&S&&S.name,base:!!(window.COOPW&&COOPW.base),inLife:COOPW.inLife,ww:COOPW.waitWorld,st:COOP.state.status,C:!!COOP.state.C,title:t&&!t.hidden,kroul:!!k,modal:m&&!m.hidden?m.textContent.slice(0,120):'',you:COOP.state.you,pid:COOP.pid,ws:window.__wsLog,tr:COOPW.tr.slice(-16)}}).catch(e=>e.message);
 const wa=await A.p.evaluate(()=>__co().world),wb=await B.p.evaluate(()=>__co().world);ok(wa&&wb,'both players are in the shared world',wa&&wb?undefined:{A:await wd(A),B:await wd(B)})}await clear(A);await clear(B);
 /* maid-8tabs (owner 21/11 ~03:15Z): both seats show the SAME 8 bottom tabs; each seat sees her own road in them (cung nữ: Hậu cung › Đồng liêu, Mệnh truyện › Thân phận;
    consort: Cung nhân, Mệnh truyện). Run with COOP_B_ORIGIN=cnv for one maid seat + one consort seat. */
 {const T8='Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện';
  for(const o of [A,B]){const r=await o.p.evaluate(()=>({bar:[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length).map(x=>x.textContent.trim()).join(' · '),
    srv:typeof isSrv==='function'&&isSrv(),st:typeof kgLabel==='function'?kgLabel('staff'):'',sy:typeof kgLabel==='function'?kgLabel('story'):''}));
   ok(r.bar===T8&&r.st===(r.srv?'Đồng liêu':'Cung nhân')&&r.sy===(r.srv?'Thân phận':'Mệnh truyện'),o.name+': the 8 bottom tabs, her own road in them'+(r.srv?' (cung nữ)':' (phi tần)'),r)}}
 /* coop-staff-split: on a names split, dump every world consort's staff (id,name,role,coop) on both seats + where the extra person lives on the other seat */
 const staffDiff=async tag=>{const g=o=>o.p.evaluate(()=>({seat:COOP.state.you,wk:__co().week,d:[S.year,S.month,S.tuan,S.buoi],V:rivals.filter(v=>!v.coop).map(v=>({id:v.id,n:v.name,st:(v.staff||[]).map(x=>[x.id,x.sid,x.name,x.role,!!x.coop,x.mid])})),me:(S.staff||[]).map(x=>[x.id,x.sid,x.name,x.role]),tr:COOPW.tr.slice(-24)}));
  const a=await g(A),b=await g(B);const out={tag,A:{d:a.d,wk:a.wk},B:{d:b.d,wk:b.wk},diff:[]};
  for(const va of a.V){const vb=b.V.find(v=>v.id===va.id);if(!vb){out.diff.push({v:va.id,missingOnB:1});continue}const ka=va.st.map(x=>JSON.stringify(x)),kb=vb.st.map(x=>JSON.stringify(x));
   if(String(ka)!==String(kb))out.diff.push({v:va.id,n:va.n,onlyA:ka.filter(x=>!kb.includes(x)),onlyB:kb.filter(x=>!ka.includes(x)),nA:ka.length,nB:kb.length})}
  out.meA=a.me;out.meB=b.me;out.slA=await A.p.evaluate(()=>window.__sl||null);out.slB=await B.p.evaluate(()=>window.__sl||null);out.trA=a.tr;out.trB=b.tr;console.log('STAFFDIFF '+JSON.stringify(out));try{fs.writeFileSync(OUT+'/staffdiff-'+tag.replace(/\W+/g,'_')+'.json',JSON.stringify(out,null,1))}catch(e){}};
 const same=async tag=>{const a=await A.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join(),N:rivals.filter(v=>!v.coop).flatMap(v=>[v.name,...(v.staff||[]).filter(x=>!x.coop).map(x=>x.name),.../* coop-staff-split: a player who serves as cung nữ is the coop entry in her mistress's staff on the OTHER seat and herself (S) on her own seat: one person, one place, written as the last staff names (sorted) on both seats */(v.staff||[]).filter(x=>x.coop).map(x=>x.name).concat(S.srv&&!S.srv.risen&&S.srv.mid===v.id?[S.name]:[]).sort()/* both players may serve the same mistress */,...(v.kids||[]).map(k=>k.name)]).concat(Object.values(S.court||{}).map(c=>c&&(c.pn||c.name))).join('|')}));
   const c=await B.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join(),N:rivals.filter(v=>!v.coop).flatMap(v=>[v.name,...(v.staff||[]).filter(x=>!x.coop).map(x=>x.name),.../* coop-staff-split: a player who serves as cung nữ is the coop entry in her mistress's staff on the OTHER seat and herself (S) on her own seat: one person, one place, written as the last staff names (sorted) on both seats */(v.staff||[]).filter(x=>x.coop).map(x=>x.name).concat(S.srv&&!S.srv.risen&&S.srv.mid===v.id?[S.name]:[]).sort()/* both players may serve the same mistress */,...(v.kids||[]).map(k=>k.name)]).concat(Object.values(S.court||{}).map(c=>c&&(c.pn||c.name))).join('|')}));
   ok(a.era===c.era&&a.R===c.R,tag+': same Emperor and same consorts',a.R===c.R?[a.era,c.era]:{era:[a.era,c.era],onlyA:a.R.split(',').filter(x=>!c.R.split(',').includes(x)),onlyB:c.R.split(',').filter(x=>!a.R.split(',').includes(x)),nmA:await A.p.evaluate(()=>(window.NM_FIX&&NM_FIX.renamed||[]).slice(-4)),birthB:await B.p.evaluate(()=>window.NM_BIRTH&&NM_BIRTH.renamed.slice(-3))});ok(String(a.d)===String(c.d),tag+': same date',[a.d,c.d]);if(tag!=='start'){ok(a.N===c.N,tag+': same names of the world people (consorts, their staff and kids, court) on both seats',a.N===c.N?a.N.split('|').length:{onlyA:a.N.split('|').filter(x=>!c.N.split('|').includes(x)),onlyB:c.N.split('|').filter(x=>!a.N.split('|').includes(x)),nmA:await A.p.evaluate(()=>(window.NM_FIX&&NM_FIX.renamed||[]).slice(-6))});if(a.N!==c.N)await staffDiff(tag);
    if(+process.env.COOP_STAFFLOG){const h=await A.p.evaluate(()=>{const sg=R=>R.filter(v=>!v.coop).map(v=>v.id+':'+(v.staff||[]).filter(x=>!x.coop).map(x=>x.sid+x.name).join(',')).join(';');const a=sg(rivals),b=sg(COOPW.base.W.R);
      return a===b?null:{only:a.split(';').filter(x=>!b.split(';').includes(x)),base:b.split(';').filter(x=>!a.split(';').includes(x)),sl:(window.__sl||[]).slice(-12)}});console.log('HOSTDRIFT '+tag+' '+(h?JSON.stringify(h):'none'))}
    /* law 6b one place: on each seat her own name sits in no world list, the friend's name exactly once (her rivals entry or her coop entry in her mistress's staff) */
    for(const o of [A,B]){const r=await o.p.evaluate(()=>{const L=[];for(const v of rivals){L.push([v.name,!!v.coop,'R'+v.id]);for(const x of v.staff||[])L.push([x.name,!!x.coop,'staff of '+v.id])}const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);
      return{me:S.name,own:L.filter(x=>x[0]===S.name),fr:f&&f.name,frN:f?L.filter(x=>x[0]===f.name):[],srv:S.srv&&!S.srv.risen?S.srv.mid:null}});
     /* r1 (reviewer): identity first — exactly one coop entry (the friend), never her own; a non-coop world person who only SHARES a full name with a
        player is a different person (name clash, owner names-unique lane review/names-unique-r2-r1, not on main) and is reported as its own FAIL line */
     const idOk=!r.own.some(x=>x[1])&&r.frN.filter(x=>x[1]).length===1,clash=r.own.filter(x=>!x[1]).concat(r.frN.filter(x=>!x[1]));
     const okN=(c,m,x)=>(NCF&&tag==='after week 2'&&!c)?console.log('note (forced clash still in flight, F2) '+m+' '+JSON.stringify(x)):ok(c,m,x);/* coop-name-clash: F2 is answered one merged week later */
     okN(idOk,tag+' '+o.name+': each player sits in exactly one place (one coop entry = the friend, none for herself)',idOk?[r.me,r.srv,r.fr,(r.frN.find(x=>x[1])||[])[2]]:r);
     okN(!clash.length,tag+' '+o.name+': no world person shares a player\'s full name (names-unique lane)',clash.length?clash:undefined)}
    /* coop-name-clash (law 6b): ONE name list over both seats — the world (host's view), the host's own people and the guest's own people
       (her seat): no two different people hold the same full name (coop entries are display copies of the other player and are left out) */
    {const nl=o=>o.p.evaluate(()=>{const own=typeof nmPers==='function'?nmPers(S):[];const ob=new Set(own.map(e=>e.o));const nb=x=>typeof nmBare==='function'?nmBare(x):String(x);
      const W=typeof nmPeople==='function'?nmPeople().filter(e=>!e.guest&&!e.me&&!ob.has(e.o)).map(e=>nb(e.o[e.f])):[];return{own:own.map(e=>[nb(e.o.name),e.fp]),W}});
     const la=await nl(A),lb=await nl(B);const L=[...la.W.map(n=>[n,'world']),...la.own.map(([n,p])=>[n,'A.'+p]),...lb.own.map(([n,p])=>[n,'B.'+p])];const by=new Map();for(const [n,w] of L){if(!by.has(n))by.set(n,[]);by.get(n).push(w)}
     const dup=[...by].filter(([n,w])=>w.length>1);(NCF&&tag==='after week 2'&&dup.length?(c,m,x)=>console.log('note (forced clash in flight, F2) '+m+' '+JSON.stringify(x)):ok)(!dup.length,tag+': one name list over both seats (world + host\'s people + guest\'s people), no full name held twice',dup.length?dup.slice(0,8):by.size)}}
   /* coop-host-lag (law 11 family "a HOST-only world write reaches the guest one merged week late"): the canonical world (W of C, the
      viewer-relative rows dropped) is the same on both seats once a merged week is shown; every differing path is a host-only (or
      guest-only) world write outside the merge */
   /* derived per-seat caches, not world writes (coop-host-lag report table): "__" module stamps (jmoodknow __mkAt / __mkL = the khắc the
      NPC's mood was last re-summed from her mk list + that sum: re-summed on every read, so the shown mood comes from mk, which is equal);
      S.wx = the weather of THIS seat's khắc, moved by jwxk wxkSync from the one world day S.wxDay (equal on both seats) */
   const DERIVED=/(^|\.)__|^S\.wx\./;
   /* lazy values a screen stores on its first READ (jtrong trongOf, jnet netOf: drawn from a fixed hash of the person; jkh khInit: from her
      children count; the same on both seats):
      one seat that drew a person's card holds them, the other not yet; both seats read every world person first, so a difference left is real */
   if(tag!=='start'){const wc=o=>o.p.evaluate(()=>{try{for(const v of rivals||[]){if(!v||v.coop)continue;for(const p of [v,...(v.staff||[]).filter(x=>x&&!x.coop),...(v.kids||[])]){try{if(typeof trongOf==='function')trongOf(p)}catch(e){}try{if(typeof netOf==='function')netOf(p)}catch(e){}try{if(typeof khInit==='function')khInit(p)}catch(e){}}}
      for(const p of [S.thO,...((S.thO&&S.thO.staff)||[]),...(S.men||[])]){if(!p)continue;try{if(typeof trongOf==='function')trongOf(p)}catch(e){}try{if(typeof netOf==='function')netOf(p)}catch(e){}}}catch(e){}
      const X=COOPW.X,J=X.J;const d=ser();const sS=d.S;const pid=((COOPW.base&&COOPW.base.P&&COOPW.base.P[COOP.state.you])||{}).pid;
      const W={};for(const k of X.W_KEYS)if(k in sS){const v=J(sS[k]);if(k==='cm'&&v)for(const f of X.CM_P)delete v[f];if(k==='men'&&Array.isArray(v))for(const x of v)if(x)for(const f of X.MEN_P)delete x[f];W[k]=v}
      if(W.emp)delete W.emp.known;delete W.tn;
      const R=d.R.filter(r=>!r.coop).map(r=>{for(const f of ['rel','oan','ghen','ev','rl','ro','gp','ep','evm'])delete r[f];if(r.staff)r.staff=r.staff.filter(s=>!s.coop);return X.mapMe(r,true,pid)});
      X.mapMe(W,true,pid);const out={};const fl=(v,p)=>{if(v&&typeof v==='object'){const ks=Object.keys(v);if(!ks.length)out[p]=Array.isArray(v)?'[]':'{}';for(const k of ks)fl(v[k],p+'.'+(Array.isArray(v)&&v[k]&&(v[k].id!=null||v[k].sid!=null)?'#'+(v[k].id!=null?v[k].id:'s'+v[k].sid):k))}else out[p]=v};
      fl(W,'S');R.forEach(r=>fl(r,'R#'+r.id));return out});
    const t0=Date.now();let dif=[];while(Date.now()-t0<8000){const wa=await wc(A),wb=await wc(B);dif=[...new Set(Object.keys(wa).concat(Object.keys(wb)))].filter(k=>!DERIVED.test(k)&&JSON.stringify(wa[k])!==JSON.stringify(wb[k])).map(k=>k+' A='+JSON.stringify(wa[k])+' B='+JSON.stringify(wb[k]));if(!dif.length)break;await sleep(500)}
    if(process.env.COOP_WDIFF)fs.appendFileSync(OUT+'/wdiff.txt',tag+' '+dif.length+'\n'+dif.slice(0,80).join('\n')+'\n');
    if(process.env.COOP_EMOTRACE&&dif.length){const ids=[...new Set(dif.map(x=>(x.match(/^R#(\d+)\.(emoH|emo|mk)/)||[])[1]).filter(Boolean))].slice(0,3).map(Number);
     for(const o of [A,B])fs.appendFileSync(OUT+'/wdiff.txt','EMOH '+o.name+' '+JSON.stringify(await o.p.evaluate(ids=>ids.map(id=>{const v=rivals.find(x=>x.id===id);const b=COOPW.base&&COOPW.base.W&&(COOPW.base.W.R||[]).find(x=>x.id===id);
       const f=h=>(h||[]).map(e=>e.w+':'+e.k+':'+String(e.why).slice(0,40));return{id,name:v&&v.name,live:f(v&&v.emoH),base:f(b&&b.emoH),week:COOP.state.week,hl:COOPW.hl&&COOPW.hl.stat,hlog:COOPW.hl&&COOPW.hl.log.slice(-8)}}),ids))+'\n')}
    if(process.env.COOP_EMOTRACE&&dif.length)for(const o of [A,B])fs.appendFileSync(OUT+'/wdiff.txt','TRACE '+o.name+' '+JSON.stringify(await o.p.evaluate(()=>(window.__emoTr||[]).splice(0))).slice(0,60000)+'\n');
    /* another family, not a host-only write (follow-up ticket in reports/coop-host-lag.md): the NPC feeling memory (jmoodknow mkSync) is
       re-read on EACH seat (both write mk[].s / emo from __mkL); printed, not gated here */
    const FEEL=/\.(mk\.\d+|emo)(\.|$)/;const feel=dif.filter(s=>FEEL.test(s.split(' ')[0]));dif=dif.filter(s=>!FEEL.test(s.split(' ')[0]));if(feel.length)console.log('   info '+tag+': feeling memory differs (other family) '+feel.length+' '+feel.slice(0,3).join(' ; ').slice(0,240));
    /* m3 adds the two seats' moves of a NUMBER (a + (b - base)): a person id two seats both moved (resHead: host 2, guest 3, base 1 -> 4)
       would name a third person on BOTH seats (equal, so the parity check above cannot see it): every id a world record points to is real */
    const badRef=await A.p.evaluate(()=>{const ids=new Set((rivals||[]).map(v=>v&&v.id));const L=[];for(const v of rivals||[]){if(!v||v.coop)continue;
      const x=v.resHead;if(typeof x==='number'&&x<900&&!ids.has(x))L.push('R#'+v.id+'.resHead='+x);
      for(const s of v.staff||[]){const y=s&&s.spyFor;if(typeof y==='number'&&y<900&&!ids.has(y))L.push('R#'+v.id+'.staff.s'+s.sid+'.spyFor='+y)}}return L});
    ok(!badRef.length,tag+': every person a world record points to (house head, spy master) exists',badRef.length?badRef.slice(0,8):undefined);
    ok(!dif.length,tag+': the same world on both seats (canonical W; coop-host-lag family)',dif.length?{n:dif.length,d:dif.slice(0,12).map(s=>s.slice(0,160))}:undefined)}
   /* art-wiring-1119: the Thái hậu is a pool face drawn by the host; both seats show the same picture (her own face's Thái hậu robe) */
   {const th=o=>o.p.evaluate(()=>({f:typeof figFor==='function'?figFor({kind:'th'},'fig'):'',fid:S.thO&&S.thO.fid||null}));let x,y;const t0=Date.now();
    while(Date.now()-t0<20000){x=await th(A);y=await th(B);if(x.f&&x.f===y.f)break;await sleep(400)}
    ok(!!x.f&&x.f===y.f&&/^(consort|maid|mama):/.test(x.fid||''),tag+': both seats show the same Thái hậu picture (a pool face)',[x,y]);
    /* one person, one face for life (law 6c): the face the host showed at the start is the face every later week shows (rejoin / rebirth too) */
    if(x.fid){if(!same.th0&&!process.env.COOP_HL_FORCE)same.th0=x.fid;else if(same.th0)ok(x.fid===same.th0,tag+': the Thái hậu keeps the face she had at the start',[same.th0,x.fid])}}
   /* OD03: the Emperor's month art is the host's (empArtMonth muted on the guest); both seats read the same favoured / disfavoured art */
   {const ea=o=>o.p.evaluate(()=>{const e=typeof empArt==='function'?empArt():null;return e?e.f+'/'+e.d+'@'+e.m:null});const x=await ea(A),y=await ea(B);ok(x===y,tag+': both seats read the same month art (host-computed)',[x,y])}
   /* coop-guest-names (K61MAP collision log, both seats): no shared person's name masked through another record, one j61 key = one person */
   for(const o of [A,B]){const r=await o.p.evaluate(K61P);if(r&&!r.skip&&!r.err){ok(!r.coll.length,tag+' '+o.name+': mask never prints another record\'s title over a shared person (K61MAP)',r.coll.length?r.coll.slice(0,4):undefined);ok(!r.keyDup.length,tag+' '+o.name+': one j61 key = one person',r.keyDup.length?r.keyDup.slice(0,4):undefined);if(r.scrub){const inF=tag==='after week 2'&&!r.scrub.ok&&NCF&&r.scrub.out==='Quý nhân '+r.scrub.name/* F2 in flight: her own person still holds the host's full name until the order lands one week later (a known holder keeps the name readable) */;(inF?(c,m,x)=>console.log('note (forced clash in flight, F2) '+m+' '+JSON.stringify(x)):ok)(r.scrub.ok,tag+' '+o.name+': friend\'s name after the mask',r.scrub)}}else console.log('K61 probe '+tag+' '+o.name+' '+JSON.stringify(r))}
   const okS=a.fr===c.me&&c.fr===a.me;ok(okS,tag+': each sees the other as a person',okS?[a.me,a.fr,c.me,c.fr]:{n:[a.me,a.fr,c.me,c.fr],trA:await A.p.evaluate(()=>COOPW.tr.slice(-14)),wsA:await A.p.evaluate(()=>window.__wsLog),trB:await B.p.evaluate(()=>COOPW.tr.slice(-8))});return[a,c]};
 /* "world" = each seat has its base; the friend's character (her `me` → the room's state) reaches the other seat a moment later: wait for it, as a player would see her appear */
 {const fr=o=>o.p.evaluate(()=>{const f=rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop);return[S.name,f?f.name:null]});const t0=Date.now();
  while(Date.now()-t0<30000){const [am,af]=await fr(A),[bm,bf]=await fr(B);if(af===bm&&bf===am)break;await clear(A);await clear(B);await sleep(400)}console.log('   friend visible after',Math.round((Date.now()-t0)/100)/10,'s')}
 await same('start');
 for(const o of [A,B]){const r=await o.p.evaluate(()=>{const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);if(!f)return{ok:false,why:'no friend'};
   const unk=k61St(f)===0;/* known for a reason any NPC would be: reigning Hoàng hậu, her own mistress, in the same palace, or housed under the same chủ vị (j61 met61/sameHouse: housemates know each other; residence-seats houses her too) */
   const why=f.queen?'Hoàng hậu':(S.srv&&!S.srv.risen&&S.srv.mid===f.id)?'chủ nhân':(f.id!=null&&together(S,f))?'cùng chỗ':(f.id!=null&&typeof sameHouse==='function'&&sameHouse(S,f))?'cùng cung (ở chung một chủ vị)':(f.id==null&&(S.staff||[]).includes(f))?'kẻ hầu của ngươi':(f.id==null)?'bạn là kẻ hầu một cung (xuất thân cung nữ ngẫu nhiên, test-flaky-sure: cung nữ không phải "người lạ" theo k61St)':'';
   return{ok:unk||!!why,unk,why,st:k61St(f),srv:!!(S.srv&&!S.srv.risen),fsrv:f.id==null,key:kOf61(f),K:(k61S()||{})[kOf61(f)],own:k61Own(f),fam:typeof kcIsFam==='function'&&kcIsFam(f),elder:!!(f.eid&&f.elder),mid:(((COOPW.base&&COOPW.base.P&&COOPW.base.P[COOP.other()])||{}).S||{}).srv&&{mid:COOPW.base.P[COOP.other()].S.srv.mid,risen:COOPW.base.P[COOP.other()].S.srv.risen},fpal:f.id==null?null:whereOf(f),mpal:(()=>{try{const v=rivals.find(x=>(x.staff||[]).includes(f));return v&&{id:v.id,n:v.name,tog:together(S,v),pal:v.pal||v.place}}catch(e){return String(e)}})(),me:typeof me==='function'?me():null,myId:S.id,place:S.place,orig:S.origin&&S.origin.k}});
  ok(r.ok,o.name+': friend starts as Người lạ (unknown, like any NPC)'+(r.unk?'':' — known: '+r.why),r.ok?undefined:r)}await shot(A,'05-world');await shot(B,'05-world');
 /* COOP_MLINE=1 (review/servant-mline-r3): the guest's own maids are a target of the NPC maid line on the guest (forced odds on B only);
    her proof on NPCs (ep[pid]) survives the week merges, and the host's own proof is not touched by hers */

 /* COOP_GE=1 (review/ge-rank, brief E35): law 5 rank key of the grand endings in co-op — each seat's GE odds read HER OWN rank (S is personal),
    two-way: host high / guest low, then swapped; the friend's rank never moves the other seat's odds; checked again after the merged weeks */
 const GE=+process.env.COOP_GE||0;
 const geP=async(tag,ra,rb)=>{const q=(o,r)=>o.p.evaluate(r=>{const O=BAL.ge.odds,nc=O.noCond;O.noCond=O.max;if(r!=null&&!(S.srv&&!S.srv.risen))S.rank=r;
    const s={b:Object.keys(GE_DATA)[0],st:["o","o","o","o"],pull:[3,0,0,0]};const g=geOdds(s,0);O.noCond=nc;const f=rivals.find(v=>v.coop);
    return{rank:S.rank,rk:geRk(),g,want:Math.round(Math.max(O.min,Math.min(O.max,O.base+3*O.per-geRk()*O.rank))),srv:!!(S.srv&&!S.srv.risen),srk:S.srv?S.srv.rk|0:0,fr:f?f.rank:null}},r);
   const a=await q(A,ra),c=await q(B,rb);const own=x=>x.rk===Math.min(7,x.srv?x.srk:x.rank)&&x.g===x.want;
   ok(own(a)&&own(c),tag+': ge odds on each seat read her own rank (law 5)',[a,c]);
   if(!a.srv&&!c.srv&&a.rank!==c.rank)ok(a.g!==c.g&&(a.rank>c.rank)===(a.g<c.g),tag+': the higher seat has the harder odds',[a,c]);return[a,c]};
 if(GE){await geP('ge rank host 5 / guest 1',5,1);await geP('ge rank host 1 / guest 5 (two-way)',1,5)}
 const NCF=+process.env.COOP_NC_FORCE?{}:null; const ML=+process.env.COOP_MLINE||0;let mlA0=null,mlB0=null;
 if(ML){mlB0=await B.p.evaluate(()=>{for(let i=0;i<3;i++){const s=mkServ('maid');s.age=17+i;S.staff.push(s)}Object.assign(BAL.mline,{feud:100,feudHost:-999,hit:100,frameCatch:100,hitCatch:100,poisonCatch:100,hitBribe:0});window.__mlN={};
   window.__mlHit=0;window.__mlCalls=[];const mm0=mlMonth;mlMonth=function(){window.__mlCalls.push([S.month,(S.staff||[]).filter(x=>x.role==='maid').length,!!(S.srv&&!S.srv.risen),consorts().includes(S),S.rank,S.place]);return mm0.apply(this,arguments)};const f0=mlFx;mlFx=function(g,s){if((S.staff||[]).includes(s))window.__mlHit++;return f0.apply(this,arguments)};
   const d0={};rivals.filter(v=>!v.coop).forEach(v=>d0[v.id]=v.duc||0);return{ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),d0,maids:S.staff.filter(x=>x.role==='maid').length,srv:!!(S.srv&&!S.srv.risen),inC:consorts().includes(S),rank:S.rank}});
  mlA0=await A.p.evaluate(()=>{window.__mlN={};const d0={};rivals.filter(v=>!v.coop).forEach(v=>d0[v.id]=v.duc||0);return{ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),d0}})}
 /* COOP_HL_FORCE=1 (review/coop-host-lag, regression for its family): the FIRST merged week reaches both seats with (a) no Thái hậu face
    (S.thO.fid dropped: only the host's lazy pick at render can give it) and (b) one world servant under an excluded (Vietnamese-style)
    name that the host's name sweep (jnamefix nmFix "load") must rename, while a text of the GUEST's own save names her. Same merged week:
    the guest shows the host's face, the servant's new name, and her own text names the new name (law 6b), before any next merge. */
 const HLF=+process.env.COOP_HL_FORCE||0;
 if(HLF){for(const o of [A,B])await o.p.evaluate(()=>{const r0=COOP.rxWrap;let done=0;window.__hlF=null;
   COOP.rxWrap=(fn,m)=>{try{if(!done&&m&&m.t==='week'&&m.state&&m.state.W){done=1;const W=m.state.W;if(W.S&&W.S.thO)delete W.S.thO.fid;
     const v=(W.R||[]).find(r=>!r.coop&&r.alive!==false&&(r.staff||[]).some(s=>!s.coop&&s.sid!=null));
     if(v){const s=v.staff.find(x=>!x.coop&&x.sid!=null);window.__hlF={id:v.id,sid:s.sid,old:'Nguyễn Thị Hoa',was:s.name};s.name='Nguyễn Thị Hoa'}
     const P=m.state.P&&m.state.P.b;if(P&&P.S)P.S.hlTxt='Hôm trước gặp Nguyễn Thị Hoa ở ngự hoa viên.';
     /* (c) housing: a low consort's house head = herself (no house): the host's palFix re-houses her (the guest's palFix leaves world housing as it is)
        (d) trust: a man's Chủ tin unset: the host's first read stores it (the guest's read only shows it) */
     const h=(W.R||[]).find(r=>!r.coop&&r.alive!==false&&!r.out&&!r.queen&&(r.rank||0)<3&&r.pal==null);if(h){h.resHead=h.id;window.__hlF=Object.assign(window.__hlF||{},{hid:h.id})}
     const mn=(W.S&&W.S.men||[]).find(x=>x&&x.alive);if(mn){delete mn.tin;window.__hlF=Object.assign(window.__hlF||{},{mid:mn.id})}
     const r=r0?r0(fn,m):fn();
     /* (e) feeling history: a world person's feeling cause written by the HOST in the merge path (a deser hook): reaches her the same week */
     if(h)window.__hlF.emo='hl force: bị tranh phần';if(COOPW.seat==='a'&&h){const v2=rivals.find(x=>x.id===h.id);if(v2&&typeof emoSet==='function')emoSet(v2,'gian',40,'hl force: bị tranh phần')}
     return r}}catch(e){console.error('hl force',e)}return r0?r0(fn,m):fn()}})}
 /* 3 three weeks */
 const agB0=await B.p.evaluate(()=>window.AG?AG.stat.tick:-1);
 /* COOP_WEEKS=n (coop-staff-split probe): play n weeks here instead of 3 (more month ends) */
 for(let w=0;w<(+process.env.COOP_WEEKS||3);w++){const wk=(await C(A)).week;
  await weekBoth(A,B,w);
  for(const o of [A,B]){const r=await untilC(o,x=>__co().week===x+1,wk,90000);ok(r,`week ${w+1}: ${o.name} advanced`,r?undefined:await o.p.evaluate(()=>({co:__co(),sent:COOPW.sent,pend:COOPW.pend,pendBuoi:!!COOPW.pendBuoi,bend:COOPW.bend,buoi:S.buoi,Q:Q.map(m=>(m.pid||'')+':'+String(m.t||'').slice(0,30)),mg:!!S.mg,tm:S.toMorning,stale:window.__nightStale,modal:(document.getElementById('modal')||{}).hidden,tr:COOPW.tr.slice(-20)})))}
  await clear(A);await clear(B);await same('after week '+(w+1));
  /* COOP_NC_FORCE=1 (coop-name-clash): after week 1 force the two clash kinds the host decides:
     F1 a WORLD person takes the guest's own full name (a consort = her name, a servant = her maid's) → the host's world gives way;
     F2 a person of the GUEST takes the HOST player's full name → the host orders her seat to rename (the host cannot rename her people) */
  if(NCF&&w===0){const bn=await B.p.evaluate(()=>({me:S.name,maid:S.maid&&S.maid.name||null}));
   NCF.f1=await A.p.evaluate(bn=>{const W=rivals.filter(v=>!v.coop&&v.alive!==false);const v=W[W.length-1];const was=[v.name];v.name=bn.me;const sv=W.flatMap(x=>(x.staff||[]).filter(y=>!y.coop))[0];
     if(sv&&bn.maid){was.push(sv.name);sv.name=bn.maid}const r=nmFix('test-f1');return{v:v.id,was,now:[v.name,sv&&sv.name],out:(r||[]).map(x=>[x.old,x.neu,x.why])}},bn);
   ok(NCF.f1.now[0]!==bn.me&&(!bn.maid||NCF.f1.now[1]!==bn.maid),'force F1: on the host the world people give way to the guest\'s own names at once',{bn,f1:NCF.f1});
   const an=await A.p.evaluate(()=>S.name);NCF.f2=await B.p.evaluate(an=>{if(S.maid&&S.maid.name){const o=S.maid.name;S.maid.name=an;return{p:'maid',was:o}}const o=S.name;S.name=an;return{p:'name',was:o}},an);NCF.an=an;
   console.log('   NC force',JSON.stringify(NCF))}
  if(HLF&&w===0){const g=o=>o.p.evaluate(()=>{const F=window.__hlF;const v=F&&rivals.find(x=>x.id===F.id);const s=v&&(v.staff||[]).find(x=>x.sid===F.sid);
     const h=F&&F.hid!=null&&rivals.find(x=>x.id===F.hid);const mn=F&&F.mid&&(S.men||[]).find(x=>x.id===F.mid);if(mn&&typeof tinOf==='function')tinOf(mn);/* her screen reads it */
     return{wk:__co().week,fid:S.thO&&S.thO.fid||null,name:s&&s.name,txt:S.hlTxt||null,house:h?[h.resHead===h.id?'self':h.resHead==='me'?(COOP.seat==='a'?901:902)/* r2c: "me" on a seat = that seat's own pid in the canon (jcoopworld REFF); a consort housed under the GUEST reads 902 on the host, me on her seat */:h.resHead,h.resHall||null,h.pal==null?null:h.pal]:null,
      tin:mn?(mn.tin==null?null:mn.tin):'-',emo:h&&F.emo?((h.emoH||[]).some(e=>e&&e.why===F.emo)?1:0):'-',hl:COOPW.hl&&COOPW.hl.stat}});let x,y;const t0=Date.now();
   const done=()=>x.fid&&x.fid===y.fid&&x.name&&x.name===y.name&&x.name!=='Nguyễn Thị Hoa'&&y.txt&&y.txt.includes(y.name)&&JSON.stringify(x.house)===JSON.stringify(y.house)&&x.tin===y.tin&&x.emo===y.emo;
   while(Date.now()-t0<20000){x=await g(A);y=await g(B);if(done())break;await sleep(400)}
   if(x.house)ok(same1(x,y)&&x.house[0]!=='self'&&JSON.stringify(x.house)===JSON.stringify(y.house),'hl force (c): the host\'s re-housing of a world consort reaches the guest in the same merged week',[x.house,y.house]);
   if(x.tin!=='-')ok(same1(x,y)&&x.tin!=null&&x.tin===y.tin,'hl force (d): a world man\'s trust stored by the host reaches the guest in the same merged week',[x.tin,y.tin]);
   if(x.emo!=='-')ok(same1(x,y)&&x.emo===1&&y.emo===1,'hl force (e): a world feeling cause the host wrote in the merge path reaches the guest in the same merged week',[x.emo,y.emo])
   function same1(a,b){return a.wk===b.wk&&b.wk===wk+1}
   ok(same1(x,y)&&!!x.fid&&x.fid===y.fid,'hl force (a): the host\'s lazy Thái hậu face reaches the guest in the same merged week',[x.fid,y.fid,x.wk,y.wk]);
   ok(same1(x,y)&&!!x.name&&x.name!=='Nguyễn Thị Hoa'&&x.name===y.name,'hl force (b): the host\'s renamed world servant reaches the guest in the same merged week',[x.name,y.name]);
   ok(!!y.txt&&y.txt.includes(y.name)&&!y.txt.includes('Nguyễn Thị Hoa'),'hl force (b): the guest\'s own text names the new name',[y.txt,x.hl,y.hl])}
  }
 if(GE)await geP('ge rank after 3 merged weeks',null,null);
 /* COOP_GE (review/ge-phutang, E35b): a Phù Tang seat (origin pf, road pt_*) opens ITS OWN grand-ending branch (geOrig identity) and gets the Hồi kết nhánh
    dialog; the other seat's branch / S.ge is untouched (S is personal) — then the seats swap (two-way). Each seat's life is restored after the probe. */
 if(GE){const gePt=(o,rd)=>o.p.evaluate(rd=>{const k0=S.origin&&S.origin.k,f0=S.st.f14,g0=S.ge,ch0=S.st.ch,q0=Q.slice();
    try{S.origin.k='pf';S.st.f14=Object.assign({},f0||{},{rd});S.ge=null;const s=geS();S.st.ch=Object.assign({},ch0||{},{all:1});Q.length=0;geAsk();const q=Q.find(m=>m.pid==='ge1');
     return{b:s&&s.b,live:typeof geOrig==='function'&&geOrig(rd)==='pf',ask:!!q&&q.opts.length===4}}
    finally{S.origin.k=k0;S.st.f14=f0;S.ge=g0;S.st.ch=ch0;Q.length=0;Q.push(...q0)}},rd);
  const own=o=>o.p.evaluate(()=>{const g=S.ge;return g?g.b:null});
  for(const [P,O,rd] of [[A,B,'pt_hai'],[B,A,'pt_dang']]){const o0=await own(O);const r=await gePt(P,rd);const o1=await own(O);
   ok(r.b===rd&&r.live&&r.ask,`ge Phù Tang: ${P.name} on ${rd} opens its own branch + Hồi kết nhánh`,r);ok(o0===o1,`ge Phù Tang: ${O.name}'s own branch untouched by ${P.name}'s`,{o0,o1})}}
 if(NCF){/* F2 outcome: after two more merged weeks the host's order reached her seat and she renamed her person (texts follow) */
  const b=await B.p.evaluate(p=>({n:p==='maid'?S.maid&&S.maid.name:S.name,ord:window.NM_ORD,o:S.nmOrd||null}),NCF.f2.p);const a=await A.p.evaluate(()=>({ord:NM_FIX.orders||0,o:S.nmOrd||null}));
  ok(b.n&&b.n!==NCF.an,'force F2: the guest\'s person that took the host\'s name was renamed on her seat by the host\'s order',{b,a,f2:NCF.f2})}
 /* NPC agent loop (jagent AG1, host-only): the host runs one tick per buổi, the guest never runs it (the world is the host's) */
 {const g=o=>o.p.evaluate(()=>({has:typeof agOn==='function',on:typeof agOn==='function'&&agOn(),tick:window.AG?AG.stat.tick:-1}));const ha=await g(A),hb=await g(B);
  ok(ha.has&&ha.tick>0,'agent loop: the host ticks',ha);ok(hb.has&&!hb.on&&hb.tick===agB0,'agent loop: the guest never runs agTick',{...hb,before:agB0})}
 await shot(A,'07-after3');await shot(B,'07-after3');
 /* COOP_LAND=1 (bang-words review E40r, CO-OP LAND GATE OD:L594): two seats of DIFFERENT foreign lands (COOP_A_ORIGIN / COOP_B_ORIGIN,
    bd = Ba Tư on a new life): each seat's own screens (story / act / go tabs + the page) carry ITS land and none of the other land's home words */
 if(+process.env.COOP_LAND){const LW={nc:/Nhiên Đăng|Khai Kinh|lão Phác|Thế tử huynh|Vương thúc|sông Áp Lục|Cao Ly/,bd:/lửa thánh|Hỏa giáo|Vương trung vương|Tô Lận|Nô Nhụ|Ba Tư/,
   pf:/Thiên hoàng|Nại Lương|đền Thần|Nan Ba|Phù Tang/,st:/thảo nguyên|Khả hãn|Khả đôn|Phụ hãn|trà sữa|kim trướng|trướng vàng|đèn bơ/};
  const grab=o=>o.p.evaluate(()=>{const t0=tab;const out=[];for(const t of['story','act','go']){try{tab=t;render();out.push((document.getElementById('panel')||{}).innerText||'')}catch(e){}}try{tab=t0;render()}catch(e){}
   return{k:S.origin&&S.origin.k,land:S.origin&&S.origin.land,txt:out.join('\n')}});
  const ga=await grab(A),gb=await grab(B);
  for(const [g,o,other] of [[ga,A,gb],[gb,B,ga]]){const mine=LW[g.k],oth=LW[other.k];
   ok(!!g.land&&g.k===(o===A?process.env.COOP_A_ORIGIN:process.env.COOP_B_ORIGIN),`land: ${o.name} plays her own thân phận`,{k:g.k,land:g.land});
   const bad=[];for(const re of [oth,LW.st])for(const line of g.txt.split('\n')){const m=line.match(re);if(m)bad.push(m[0]+' :: '+line.slice(0,160))}
   ok(bad.length===0,`land: ${o.name} (${g.land}) sees none of the other seat's land words (${other.land}) nor steppe words on her own tabs`,bad.slice(0,5))}}
 if(ML){const b1=await B.p.evaluate(()=>({hit:window.__mlHit,N:window.__mlN,ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),maids:S.staff.filter(x=>x.role==='maid').length,month:S.month,calls:window.__mlCalls,feud:BAL.mline.feud}));
  const a1=await A.p.evaluate(()=>({N:window.__mlN,ev:rivals.filter(v=>!v.coop).reduce((a,v)=>a+(v.ev||0),0),duc:Object.fromEntries(rivals.filter(v=>!v.coop).map(v=>[v.id,v.duc||0]))}));
  const evMeB=+(b1.N.evMe||0),evMeA=+(a1.N.evMe||0);
  ok(b1.hit>0,'mline: NPC acts hit the guest\'s own maids on the guest',{hit:b1.hit,N:b1.N});
  ok(b1.ev-mlB0.ev>=evMeB,'mline: the guest\'s proof from her maids\' cases survives the merges',{before:mlB0.ev,after:b1.ev,given:evMeB});
  const dA=Object.keys(mlA0.d0).reduce((a,k)=>a+((a1.duc[k]||0)-mlA0.d0[k]),0);
  console.log('mline info',JSON.stringify({b0:mlB0,b1:[b1.maids,b1.month,b1.calls,b1.feud],hostEv:[mlA0.ev,a1.ev,evMeA],hostNpcDucDelta:dA,guestCaught:Object.fromEntries(Object.entries(b1.N).filter(([k])=>/caught|Out|ev/.test(k)))}));if(process.env.COOP_MLINE_ONLY){for(const o of [A,B])await o.ctx.close().catch(()=>{});process.exit(res.every(r=>r[0])?0:1)}}
 /* 4 B leaves → A freezes; B returns */
 await A.p.evaluate(()=>{window.__prLog=[];const t0=Date.now();COOP.on('presence',m=>__prLog.push([Date.now()-t0,'p',JSON.stringify(m.seats)]));COOP.on('room',m=>__prLog.push([Date.now()-t0,'room',JSON.stringify(m.seats)]));COOP.on('lost',m=>__prLog.push([Date.now()-t0,'lost']))});
 await B.p.close();
 /* a closed page whose socket close never reaches the Worker (proxy keeps the upstream open) is dropped by the Worker's STALE rule: 45 s silence, checked by a 20 s alarm → up to 65 s */
 {const fz=await until(A,()=>__co().frozen,null,90000);ok(fz,'A frozen when B left',fz?undefined:await A.p.evaluate(()=>({co:__co(),st:{status:COOP.state.status,peer:COOP.state.peerOnline,seats:COOP.state.seats},pr:window.__prLog||null})))}await shot(A,'08-frozen');
 ok(await A.p.evaluate(()=>document.getElementById('next').disabled||!!__co().frozen),'A cannot advance while frozen');
 const wkF=(await C(A)).week;
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await booted(B);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 ok(await until(B,x=>__co().seat==='b'&&__co().week===x&&!__co().frozen,wkF,40000),'B back in same seat and week');
 ok(await until(A,()=>!__co().frozen,null,20000),'A resumes');await clear(A);await clear(B);await same('after rejoin');
 /* review/suc-khoe-fix (owner CO-OP FIRST OD:L1447): NPC health is host-computed; the guest shows the host's value (Sức khỏe, Sức tối đa, scars) */
 {const hv=async o=>o.p.evaluate(()=>typeof khOf!=="function"?null:rivals.filter(v=>!v.coop&&v.alive).map(v=>[v.name,khOf(v),sucCap(v),v.khScar||0]).sort().join("|"));
  await clear(A);await clear(B);const ha=await hv(A),hb=await hv(B);ok(ha!=null&&ha===hb,'NPC Sức khỏe / Sức tối đa: guest = host',ha===hb?undefined:[ha&&ha.slice(0,200),hb&&hb.slice(0,200)])}await shot(B,'09-rejoined');
 /* 5 B dies → normal rebirth choice → new person in the same world */
 const before=await B.p.evaluate(()=>({n:S.name,era:S.emp.era}));
 if(RECON){await netDown(A);await sleep(300)}/* her rebirth's `state` broadcast reaches nobody on the host: it must catch up from the room snapshot */
 if(NCF)NCF.f3=await B.p.evaluate(()=>{const v=rivals.filter(x=>!x.coop)[0];const nm=v&&v.name;const f0=freshName;let k=0;freshName=function(){if(k++<1&&nm)return nm;return f0.apply(this,arguments)};return nm});/* F3: her new life draws a world consort's name */
 await B.p.evaluate(()=>die('Thử: trúng gió'));await B.p.waitForTimeout(600);await shot(B,'10-death');
 /* coop-host-lag (c): the 1-in-20 "B reborn … FAIL (name unchanged)" = the rebirth outran 12 fixed tries (~11 s) on a loaded machine
    (in each case "A sees the reborn friend by her new name" passed: she WAS reborn, later). Now: a time budget (45 s), not a try count */
 const rbT0=Date.now();for(let i=0;Date.now()-rbT0<45000;i++){const st=await B.p.evaluate(()=>S&&!S.dead&&S.name);if(st&&st!==before.n)break;
  const m=await B.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal:not([hidden]) button:not([disabled]), #title:not([hidden]) button:not([disabled]), .kroul button:not([disabled]), [data-coop-reborn]')].filter(x=>x.offsetParent!==null);
    const pref=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung|Lật|Chọn/.test(x.textContent))||b[0];if(pref){const t=pref.textContent.trim();pref.click();return t}return''});
  if(i===1)await shot(B,'11-rebirth-choice');await B.p.waitForTimeout(900)}
 const after=await B.p.evaluate(()=>({n:S.name,dead:S.dead,era:S.emp.era,inLife:COOPW.inLife,modal:(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.textContent.slice(0,140):''})(),btn:[...document.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null).map(x=>x.textContent.trim().slice(0,24)).slice(0,10),tr:COOPW.tr.slice(-10)}));console.log('   rebirth took',Math.round((Date.now()-rbT0)/100)/10,'s');
 /* her new life's throwaway world must not leak into the shared one (review/coop-stable: 10 temp-id ghost consorts + 10 new-consort requests) */
 {const ri=await B.p.evaluate(()=>({srv:S.srv&&!S.srv.risen?{mid:S.srv.mid,here:!!RV(S.srv.mid)}:null,tmp:rivals.filter(v=>!v.coop&&v.id>=1000).map(v=>v.id),ask:(S.coopAsk||[]).length,ids:rivals.filter(v=>!v.coop).map(v=>v.id).sort((a,b)=>a-b).join(','),base:((COOPW.base&&COOPW.base.W&&COOPW.base.W.R)||[]).map(r=>r.id).sort((a,b)=>a-b).join(',')}));
  ok(!ri.tmp.length&&!ri.ask&&ri.ids===ri.base&&(!ri.srv||ri.srv.here),'reborn guest: same consorts as the room world, no ghost (temp-id) consorts, no requests, a real mistress',ri)}
 if(RECON){await sleep(3500);ok(await netUp(A),'reconnect: host back online after the friend was reborn')}
 ok(!after.dead&&after.n!==before.n&&after.era===before.era,'B reborn as a new person in the same world',[before,after]);
 if(NCF){const wn=o=>o.p.evaluate(n=>nmPeople().filter(e=>!e.guest&&!e.me&&nmBare(e.o[e.f])===n).map(e=>e.kind),after.n);const ca=await wn(A),cb=await wn(B);const nb=await B.p.evaluate(()=>window.NM_BIRTH);
  ok(!ca.length&&!cb.length&&after.n!==NCF.f3,'force F3: her new life drew a world consort\'s name → renamed at birth, no world person holds it on either seat',{f3:NCF.f3,n:after.n,ca,cb,birth:nb&&nb.renamed.slice(-3)})}
 {let seen=false;const t0=Date.now();while(Date.now()-t0<40000){await clear(A);await clear(B);seen=await A.p.evaluate(n=>!!(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop))&&(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null).name===n,after.n);if(seen)break;await sleep(700)}
  ok(seen,'A sees the reborn friend by her new name',seen?undefined:await A.p.evaluate(()=>({P:(()=>{const P=COOPW.base&&COOPW.base.P&&COOPW.base.P[COOP.other()];const v=P&&P.S&&P.S.srv;return P&&{name:P.name,dead:P.dead,rank:P.rank,home:COOPW.friendHome(P),srv:v&&{mid:v.mid,risen:v.risen,mOk:!!(typeof RV==='function'&&RV(v.mid))}}})(),n:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,inLife:COOPW.inLife,tr:COOPW.tr.slice(-16),nf:typeof nfDebug==='function'?nfDebug():null,scr:(()=>{/* what is on her screen (stuck dump): modal title + buttons, every visible scene / overlay and its buttons */const V=x=>!!x&&x.offsetParent!==null;const bt=r=>[...r.querySelectorAll('button')].filter(V).map(x=>(x.id||x.className||'').toString().slice(0,24)+':'+x.textContent.trim().slice(0,20)+(x.disabled?'(off)':'')).slice(0,12);const m=document.getElementById('modal');return{modal:m&&!m.hidden?{t:((document.getElementById('mt')||{}).textContent||'').slice(0,60),b:bt(m)}:null,ov:[...document.querySelectorAll('.kmov,#ov,#kg82,.kcf,#kroul,#kneov,.kfoc,[class^=jnf],[id^=jnf]')].filter(x=>V(x)||getComputedStyle(x).display!=='none'&&x.getClientRects().length).map(x=>({k:(x.id||x.className).toString().slice(0,40),b:bt(x)})).slice(0,8),mg:typeof S!=='undefined'&&S&&S.mg?Object.keys(S.mg).slice(0,6):null,nf:typeof S!=='undefined'&&S&&S.nf?JSON.stringify(S.nf).slice(0,200):null,q0:Q[0]?JSON.stringify(Q[0]).slice(0,200):null}})(),ws:window.__wsLog})));}
 {const r=await A.p.evaluate(()=>{const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);return{ok:!!f&&(k61St(f)===0||f.id==null/* servant-origin friend (random life): same acceptance as the start check, test-flaky-sure */),srv:f&&f.id==null,st:f&&k61St(f),here:f&&f.id!=null&&whereOf(f),me:S.place,tr:COOPW.tr.slice(-12)}});
  ok(r.ok,'reborn friend is a stranger again (Người lạ)',r.ok?undefined:r)}
 await clear(A);await clear(B);await shot(A,'12-reborn-seen');await shot(B,'12-reborn');
 /* 6 one more week after rebirth */
 {const wk=(await C(A)).week;await weekBoth(A,B,1);const adv=await untilC(B,x=>__co().week===x+1,wk,90000);
  const dump=o=>o.p.evaluate(()=>({co:__co(),k:wk()+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,dead:!!S.dead,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,rb:[COOPW.rweek,COOPW.rbuoi],tm:S.toMorning,tr:COOPW.tr.slice(-20)})).catch(e=>e.message);
  ok(adv,'week after rebirth advances',adv?undefined:{w0:wk,A:await dump(A),B:await dump(B)});}
 /* 7 single player untouched + old save loads */
 /* COOP_OLD_REF: the build whose save must still load (default origin/main; in a shared checkout whose origin/main ref was moved, pass the base main commit) */
 const oldHtml=execSync('git -C '+JSON.stringify(ROOT)+' show '+(process.env.COOP_OLD_REF||'origin/main')+':index.html',{maxBuffer:64e6}).toString();
 const D=await mk(b,'solo',[686,880,2.2]);await D.ctx.route(BASE+'old.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:oldHtml.replace(/navigator\.serviceWorker\.register/g,'(()=>Promise.reject())')}));
 await D.page();await D.p.goto(BASE+'old.html',DCL);await booted(D);
 /* a loaded machine: wait for the old game's code; __nlInner = start() builds the life at once (no Luân hồi screen, which left S unset) */
 await D.p.waitForFunction(()=>typeof start==='function'&&typeof ser==='function'&&typeof SK==='function',null,{timeout:120000});
 await D.p.evaluate(()=>{SLOT=2;window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20&&!(typeof S!=='undefined'&&S&&S.name);i++)start();Q.length=0;localStorage.setItem(SK(2),JSON.stringify(ser()));localStorage.setItem('hclh-slot','2')});const oldName=await D.p.evaluate(()=>S.name);
 await D.p.goto(BASE,DCL);await booted(D);await shot(D,'13-title-solo');
 ok(await tapText(D,/^Chơi một mình/),'solo: Chơi một mình');await D.p.waitForTimeout(800);
 /* Chơi một mình = Tiếp tục the last sổ (old save) when there is one */
 if(!await D.p.evaluate(()=>typeof S!=='undefined'&&!!S&&!!S.name))await tapText(D,/^Tiếp tục kiếp này/,4000);await D.p.waitForTimeout(1500);
 const ld=await D.p.evaluate(()=>({n:typeof S!=='undefined'&&S&&S.name,coop:!!__co().on,fr:typeof rivals!=='undefined'&&(rivals||[]).some(v=>v.coop)}));ok(ld.n===oldName&&!ld.coop&&!ld.fr,'solo: old save loads, no co-op',ld);
 await clear(D);await shot(D,'14-solo-game');
 /* real buổi lengths (co-op clock, jcooptimer): wall time from a buổi's clock start to the room's step, as the host measured them */
 try{const L=await A.p.evaluate(()=>window.COOPW&&COOPW.tm&&COOPW.tm.lens?COOPW.tm.lens():[]);const ms=L.map(x=>x.ms).sort((a,b)=>a-b);
  const q=f=>ms.length?Math.round(ms[Math.min(ms.length-1,Math.floor(f*ms.length))]/100)/10:0;
  const line=`buổi lengths (s): n=${ms.length} median=${q(.5)} p90=${q(.9)} max=${q(1)} timeouts=${L.filter(x=>x.up).length}`;console.log(line);fs.appendFileSync(OUT+'/buoi-lengths.txt',line+'\n')}catch(e){console.log('buổi lengths: n/a',e.message)}
 for(const o of [A,B,D])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 /* review/life-preload-fu (B): lifeGate runs per seat over the whole run (weeks played, rebirth, rejoin): 'life' = a real life change, never one per week merge */
 for(const o of [A,B]){const c=await o.p.evaluate(()=>window.KLIFE&&KLIFE.calls||[]).catch(()=>null);const w=await o.p.evaluate(()=>window.COOP&&COOP.week||0).catch(()=>0);console.log('lifeGate calls',o.name,'week',w,JSON.stringify(c&&c.reduce((m,x)=>(m[x]=(m[x]||0)+1,m),{})))}
 const bad=res.filter(r=>!r[0]);if(NIGHTS)console.log('forced nights',COOPW_n);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
