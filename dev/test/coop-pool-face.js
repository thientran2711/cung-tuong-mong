/* coop-pool-face (Foreman D #15, co-op root cause): the Thái hậu (and every other pool-faced fixed person) gets ONE face, picked once by
   the host, stored in the world (S.thO.fid + fidUsed), never re-rolled; the guest shows the host's face.
   Before the fix: coop-e2e intermittently failed "both seats show the same Thái hậu picture" (guest fid null, host fid changed c23 → c04).
   usage: python3 dev/build/assemble.py && node dev/test/coop-pool-face.js [outdir] [workerURL]   (env PF_WEEKS=n, default 1)
   Each seat logs every change of S.thO.fid (value, a stack when it is set in place, the S.thO object swapped) from page load on. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* real boot condition (the game script ran to its end: window.__ctmBuilt, assemble.py), not a 3-3.5 s timer; a page that never boots still reaches the next step, whose own check then fails */
const booted=o=>o.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);/* socket log for failure dumps: every WebSocket the page opens (url tail, open / close code, ms since load) */
  await ctx.addInitScript(()=>{const W0=window.WebSocket,t0=Date.now();window.__wsLog=[];window.WebSocket=function(u,p){const w=p===undefined?new W0(u):new W0(u,p);/* COOP_RECONNECT: a sleeping phone's socket looks open but hears nothing (frames dropped while __wsDeaf) */Object.defineProperty(w,'onmessage',{configurable:true,set(f){w.addEventListener('message',e=>{if(!window.__wsDeaf)f.call(w,e)})}});const L=window.__wsLog,i=L.length,tag=String(u).replace(/^.*\/room\//,'').replace(/&name=.*$/,'');
    L.push([Date.now()-t0,'new',tag]);w.addEventListener('open',()=>L.push([Date.now()-t0,'open',i]));w.addEventListener('close',e=>L.push([Date.now()-t0,'close',i,e.code]));return w};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})});
  await ctx.addInitScript(()=>{/* merge-train-4: the card-flip scene waits for its kit end button (KIT 81); hide it like main's tests do */document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf,#kroul{display:none!important}';document.head.appendChild(s)})});await ctx.addInitScript(u=>{window.COOP_URL=u;
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* a manual kit scene (night-end «Nhận» #kneov, reward box): a player closes it with its own button [data-km-close] (rv night-balance-bundle, like coop-night) */const kc=[...document.querySelectorAll('.kmov [data-km-close]')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* press "Qua buổi"/"Qua đêm" when it is enabled (waits up to 20 s: after the friend's dialogs, the host's NPC places, …) */
async function press(o,k0){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(k0=>{
   /* a night with the Emperor (jnight) spends the rest of her day: her buổi is already ended through the co-op path (bend / week end) */
   if(k0&&(COOPW.bend||COOPW.pend||__co().waiting||COOPW.nrdy===__co().week))return true;/* … or the room clock already ended her tối (jcooptimer dueTick → nightReady: a slow machine reaches the room's time limit) */
   const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true},k0||null);if(r&&!k0)return true;
   /* review/coop-c4-stuck: a click while a card is still queued (Q not yet on screen) is ignored by nextBuoi (Q.length): only count the press when it took */
   if(r&&await until(o,k0=>!!(COOPW.bend||COOPW.pend||__co().waiting||COOPW.nrdy===__co().week||document.getElementById('next').disabled||__co().week+':'+(S.buoi||0)!==k0),k0,2500))return true;await sleep(250)}
  ok(false,o.name+' #next enabled',await o.p.evaluate(()=>({b:[S.buoi||0,S.tuan,S.month,document.getElementById('next').textContent],co:__co(),bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,nrdy:COOPW.nrdy,pendBuoi:!!COOPW.pendBuoi,wk:COOPW.whereKey,st:COOP.state.status,ended:COOP.state.ended,Q:Q.length,tr:COOPW.tr.slice(-16),ws:window.__wsLog})));return false}
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
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B),sA:await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),sB:await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++){if(RECON&&w===0&&k===n-1){await nightGap(A,B);continue}await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}}

/* the fid trap: poll S.thO; a new object = "swap" (logged with old/new fid); its fid gets an accessor that logs every in-place set with a stack */
const TRAP=()=>{window.__pf=[];let o0=null,f0;const t0=Date.now();const st=()=>new Error().stack.split('\n').slice(3,11).map(x=>x.trim().replace(/\(.*\//,'(').replace(/^at /,'')).join(' < ');
 const ctx=()=>{try{return{wk:window.__co?__co().week:null,d:[S.month,S.tuan,S.buoi||0],tr:window.COOPW&&COOPW.tr?COOPW.tr.slice(-3):null}}catch(e){return null}};
 const arm=o=>{if(!o||typeof o!=='object'||Object.getOwnPropertyDescriptor(o,'fid')&&Object.getOwnPropertyDescriptor(o,'fid').get)return;let v=o.fid;
  Object.defineProperty(o,'fid',{configurable:true,enumerable:true,get(){return v},set(n){if(n!==v)window.__pf.push({t:Date.now()-t0,set:[v,n],ctx:ctx(),st:st()});v=n}})};
 setInterval(()=>{try{if(window.COOP&&COOP.send&&!window.__pfs){window.__pfs=1;const s0=COOP.send;const th=C=>{try{return C&&C.W&&C.W.S?(C.W.S.thO?C.W.S.thO.fid||null:'noThO'):'-'}catch(e){return '?'}};
  COOP.send=function(m){try{if(m&&/^(init|end)$/.test(m.t))window.__pf.push({t:Date.now()-t0,out:m.t,wk:m.week,fid:th(m.state),S:typeof S!=='undefined'&&S&&S.thO?S.thO.fid||null:'-'})}catch(e){}return s0.apply(this,arguments)};
  COOP.on('week',m=>{try{window.__pf.push({t:Date.now()-t0,in:'week',wk:m&&m.week,fid:th(m&&m.state)})}catch(e){}});COOP.on('room',m=>{try{window.__pf.push({t:Date.now()-t0,in:'room',wk:m&&m.week,fid:th(m&&m.state)})}catch(e){}})}
 if(typeof S==='undefined'||!S)return;if(!window.__pfw&&typeof figThPick==='function'){window.__pfw=1;const p0=figThPick;figThPick=function(){const b=S.thO&&S.thO.fid;const r=p0.apply(this,arguments);if(r&&r!==b)window.__pf.push({t:Date.now()-t0,pick:[b||null,r],cctx:window.COOPW&&COOPW.ctx||null,ctx:ctx(),st:st()});return r}}const o=S.thO;if(o!==o0){const f=o&&o.fid;if(o0!==null||f)window.__pf.push({t:Date.now()-t0,swap:[f0===undefined?null:f0,f||null],ctx:ctx()});o0=o;f0=f;arm(o)}else f0=o&&o.fid}catch(e){}},25)};

const thOf=o=>o.p.evaluate(()=>{const g=(x,...k)=>{try{for(const y of k)x=x[y];return x===undefined?'-':x}catch(e){return '?'}};
 return{f:typeof figFor==='function'?figFor({kind:'th'},'fig'):'',fid:S.thO&&S.thO.fid||null,used:(S.fidUsed||[]).length,ready:typeof figxReady==='function'&&figxReady(),
  base:g(window.COOPW,'base','W','S','thO','fid'),view:g(window.COOPW,'thin','view','o','P','a','thO','fid'),ctx:window.COOPW&&COOPW.ctx||null,lvl:g(window.COOPW,'thin','lvl'),thK:S.thO?Object.keys(S.thO).join(','):'-'}});
async function thCheck(A,B,tag){let x,y;const t0=Date.now();while(Date.now()-t0<20000){x=await thOf(A);y=await thOf(B);if(x.f&&x.f===y.f)break;await sleep(400)}
 ok(!!x.f&&x.f===y.f&&/^(consort|maid|mama):/.test(x.fid||'')&&x.fid===y.fid,tag+': both seats show the same Thái hậu picture (a pool face)',[x,y]);return x.fid}
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);for(const o of [A,B])await o.ctx.addInitScript(TRAP);
 /* PF_SLOWX=ms: the host's img/FIGURES-x.json arrives late (a slow phone / CDN): the race window this probe hunts, forced open */
 if(+process.env.PF_SLOWX)await A.ctx.route('**/FIGURES-x.json',async r=>{await sleep(+process.env.PF_SLOWX);r.fallback()});
 await A.page();await A.p.goto(BASE,DCL);await booted(A);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 /* PF_FORCE=1: the guest's identity roll lands on the face the host already gave the Thái hậu (the 1-in-32 clash, made certain): her roll
    (j66 pidRoll) is pinned to it, as a roll stored before the room's world was in would be */
 if(+process.env.PF_FORCE)await B.ctx.addInitScript(()=>{const iv=setInterval(()=>{if(typeof pidRoll!=='function')return;clearInterval(iv);const p0=pidRoll;
   pidRoll=function(d){let k=null;try{const T=COOPW.base.W.S.thO;k=T&&T.fid}catch(e){}if(/^consort:/.test(k||'')){window.__pfForced=k;return k}return p0.apply(this,arguments)}},5)});
 /* PF_TWIN=1 (reviewer): an OLD room from before this fix where the two players already share one identity (the guest's roll landed on
    the host's own face): her roll is pinned to the host's S.pid and the room check is held off until the start check, as on a pre-fix build.
    Then weeks run: the host's own face must never move, only hers, and the two must end different and stay put. */
 if(+process.env.PF_TWIN)await B.ctx.addInitScript(()=>{window.__pfHold=1;const iv=setInterval(()=>{if(typeof pidRoll!=='function'||typeof pidRoomFix!=='function')return;clearInterval(iv);const p0=pidRoll,f0=pidRoomFix;
   pidRoll=function(d){let k=null;try{k=COOPW.base.P.a.S.pid}catch(e){}if(/^consort:/.test(k||'')){window.__pfForced=k;return k}return p0.apply(this,arguments)};
   pidRoomFix=function(){if(window.__pfHold)return false;return f0.apply(this,arguments)}},5)});
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await booted(B);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);
 const forced=await B.p.evaluate(()=>window.__pfForced||null);if(+process.env.PF_FORCE)console.log('forced guest roll',forced);
 const fids=[await thCheck(A,B,'start')];
 const pids=async()=>[await A.p.evaluate(()=>S.pid||null),await B.p.evaluate(()=>S.pid||null)];const PH=[];
 if(+process.env.PF_TWIN){PH.push(await pids());console.log('twin start pids',JSON.stringify(PH[0]));await B.p.evaluate(()=>{window.__pfHold=0})}

 for(let w=0;w<(+process.env.PF_WEEKS||1);w++){const wk=(await C(A)).week;await weekBoth(A,B,w);
  for(const o of [A,B])ok(await untilC(o,x=>__co().week===x+1,wk,90000),`week ${w+1}: ${o.name} advanced`);await clear(A);await clear(B);
  fids.push(await thCheck(A,B,'after week '+(w+1)));if(+process.env.PF_TWIN){PH.push(await pids());console.log('twin pids week '+(w+1),JSON.stringify(PH[PH.length-1]),JSON.stringify([await A.p.evaluate(()=>[pidRoomFix.n||0,pidRoomFix.last||null]),await B.p.evaluate(()=>[pidRoomFix.n||0,pidRoomFix.last||null])]))}}
 if(+process.env.PF_TWIN){ok(PH.every(p=>p[0]===PH[0][0]),'twin: the host\'s own face never moves',PH);const L=PH[PH.length-1],M=PH[PH.length-2];ok(L[0]!==L[1]&&L[1]===M[1],'twin: the two players end different and her face stays put',PH)}
 ok(fids.every(f=>f&&f===fids[0]),'the host never re-rolls the Thái hậu face (one face for life)',fids);
 /* the whole family: no world person on the host wears a player's own identity, and the two players differ */
 {const pa=await A.p.evaluate(()=>S.pid||null),pb=await B.p.evaluate(()=>S.pid||null);
  const held=await A.p.evaluate(()=>{const L=[];const H=typeof nlHolders==='function'?nlHolders():[];for(const o of H)if(o&&o!==S&&!o.coop&&typeof o.fid==='string')L.push(o.fid);return L});
  const dup=held.filter((x,i)=>held.indexOf(x)!==i);
  ok(pa&&pb&&pa!==pb&&!held.includes(pa)&&!held.includes(pb),'no world person wears a player\'s own face; the two players differ'+(forced?' (guest roll forced onto the Thái hậu face '+forced+')':''),{pa,pb,forced,held:held.length});
  if(dup.length)console.log('note (not this probe: men guards share faces by design, jmen) world faces held twice on the host',JSON.stringify(dup))}
 const la=await A.p.evaluate(()=>window.__pf),lb=await B.p.evaluate(()=>window.__pf);
 console.log('PFLOG A '+JSON.stringify(la));console.log('PFLOG B '+JSON.stringify(lb));
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,4));
 await b.close();const bad=res.filter(r=>!r[0]);console.log((bad.length?'FAIL':'PASS')+' '+(res.length-bad.length)+'/'+res.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
