/* review/coop-guest-men: 2-browser test of the palace-men request kind "man" (dev/build/jcoopask.js) against the LIVE Worker.
   S.men is a HOST_ONLY world key (jcoopworld); before this branch a man of the GUEST's own road, or a palace man her own act killed,
   was gone / alive again at her next rebuild (law 1 two-way, law 6b real people). Host 755x1000@2 (Fold), guest 1180x820@2 (iPad).
   1 live path: her Bắc Địch road brings its envoy to the capital (real jrd_bd bdMove → bdMan) → stand-in at once, the host has him the
     same week (relay); after the week both see him (same id, name); her own ties to him (tinh) stay hers, the host's start at 0.
   2 her act kills a palace man (jmort mortKill, the jpq / affair path) → the host's man is dead too; after the week he stays dead on both.
   3 her road sends the envoy home (bdMove → away / ban) → the host's man is away too.
   4 durable path: relay dropped, she rejoins before the week ends; a Phù Tang road man (jrd_pt pfMove) → request survives her blob →
     host applies it at the rebuild → both see him.
   5 a man of the host's own set (m0…) is never asked; nothing asked when nothing changed; rejoin: both still agree.
   6 same family (HOST_ONLY thIll): her act eases / cures the Thái hậu → the host's illness too; it never comes back at her rebuild;
     6d her ease resolving INSIDE her week end (review r1 F1); 6g no request from the host's own value (review r1 F2).
   Helpers copied from coop-guest-maid.js (from coop-e2e.js).  usage: node dev/test/coop-guest-men.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-guest-men'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);{const fo=process.env[name==='fold'?'COOP_A_ORIGIN':'COOP_B_ORIGIN'];if(fo)await ctx.addInitScript(k=>{window.__forceOrigin=k},fo)}/* repro only (default: the game's own origin) */
  /* night-final (as coop-e2e): .kcf / #kroul are no longer hidden — clear() (lib/coop-clear.js) ends them like a player */await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* press "Qua buổi"/"Qua đêm" when it is enabled (waits up to 20 s: after the friend's dialogs, the host's NPC places, …) */
async function press(o,k0){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(k0=>{
   /* a night with the Emperor (jnight) spends the rest of her day: her buổi is already ended through the co-op path (bend / week end) */
   if(k0&&(COOPW.bend||COOPW.pend||__co().waiting))return true;
   const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true},k0||null);if(r)return true;await sleep(250)}
  ok(false,o.name+' #next enabled',await o.p.evaluate(()=>[S.buoi||0,S.tuan,S.month,document.getElementById('next').textContent]));return false}
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
async function buoiBoth(A,B,shotWait){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));
  if(NIGHTS&&Math.random()<.45)await night(Math.random()<.5?A:B);
  const sp=SPILL?await spillA(A):null;if(sp)ok(sp.used===4&&sp.carry===1,'spill '+k0+': act runs on into the next buổi (carry 1)',sp);
  await press(A,k0);if(shotWait)await shot(A,shotWait);await press(B,k0);
  /* a seat whose week end is out (after its tối, or a night that spent its day) waits for the merged week: count it as done */
  const key=o=>o.p.evaluate(()=>COOPW.pend||__co().waiting?'end':__co().week+':'+(S.buoi||0));
  for(let t=0;t<80;t++){const a=await key(A),b=await key(B);if(a!==k0&&b!==k0&&(a===b||a==='end'||b==='end')){
    if(sp&&sp.carry===1){await sleep(600);const st=await A.p.evaluate(()=>Object.assign({k:__co().week+':'+(S.buoi||0),now:used},window.__tu||{used:-1}));ok(st.used===1&&!st.carry,'spill '+k0+' → '+st.k+': the next buổi pays the carry once',st)}
    return true}await clear(A);await clear(B);
    /* review/coop-driver-fails #2 (G3-1 stall): a press that only opened a card is pressed again (lib/coop-real repress) */
    if(t%8===7)for(const [o,k] of [[A,a],[B,b]])if(k===k0)await require('./lib/coop-real.js').repress(o);
    await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B),sA:await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),sB:await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}
/* relay diagnostics (dump only on FAIL): her thIll trail, open requests, trace, sent/ended */
const RDBG=o=>o.p.evaluate(()=>({seat:COOPW.seat,wk:__co().week,b:S.buoi|0,th:S.thIll,snapTh:COOPW.askSnap&&COOPW.askSnap.th,ask:(S.coopAsk||[]).map(a=>a.id),thw:window.__thw||null,sent:COOPW.sent,ended:COOP.state.ended,inLife:!!COOPW.inLife,tr:(COOPW.tr||[]).slice(-25),askN:window.__askN&&(window.__askN.log||[]).slice(-8),srv:typeof isSrv==='function'&&isSrv(),thDead:!!S.thDead,done:Object.keys(S.askDone||{}).filter(k=>/^th:/.test(k)),serT:window.__serT||null,kc:typeof isKc==='function'&&isKc(),o:S.origin&&S.origin.k,
  /* after the fail only: one save of her week (ser → the ask builder) — is the request built then? */post:(()=>{try{const d=ser();return{R:!!(d&&d.R),ask:(S.coopAsk||[]).map(a=>a.id)}}catch(e){return 'ser err '+e.message}})()})).catch(e=>e.message);
const DROP=o=>o.p.evaluate(()=>{if(!window.__dropP){window.__dropP=1;const s0=COOP.send;COOP.send=function(m){if(m&&m.k==='ctm-ask'&&window.__dropAsk===1)return;return s0.apply(this,arguments)}}window.__dropAsk=1});
const man=(o,id)=>o.p.evaluate(id=>{const m=(S.men||[]).find(x=>x&&x.id===id);return m?{id:m.id,name:m.name,alive:m.alive!==false,away:m.away||0,ban:m.ban==null?null:m.ban,tinh:m.tinh||0}:null},id);
const asks=o=>o.p.evaluate(()=>{for(let i=0;i<3;i++)ser();return (S.coopAsk||[]).filter(a=>a.k==='man'||a.k==='th').map(a=>a.id)});
const hostHas=(o,id,f)=>until(o,([id,f])=>{const m=(S.men||[]).find(x=>x&&x.id===id);if(!m)return false;for(const k in f)if((k==='alive'?m.alive!==false:(m[k]||0))!==f[k])return false;return true},[id,f],20000);
async function rejoinB(B,code){await B.p.close();await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 return until(B,()=>__co().seat==='b'&&!__co().frozen&&__co().world,null,60000)}
async function weekAll(A,B,tag){const wk=(await C(A)).week;await weekBoth(A,B,1);let r=true;for(const o of [A,B])r=await untilC(o,x=>__co().week===x+1,wk,90000)&&r;ok(r,tag+': week advanced for both',r?undefined:{/* review/coop-driver-fails #2: G2-2 stalled from 6a on (every week timed out): who waits for what */
  A:await A.p.evaluate(()=>({co:__co(),st:COOP.state.status,ended:COOP.state.ended,sent:COOPW.sent,Q:(Q||[]).map(q=>String(q.t||'').slice(0,40)),modal:((document.getElementById('modal')||{}).textContent||'').slice(0,120),tr:(COOPW.tr||[]).slice(-14)})).catch(e=>e.message),
  B:await B.p.evaluate(()=>({co:__co(),st:COOP.state.status,ended:COOP.state.ended,sent:COOPW.sent,Q:(Q||[]).map(q=>String(q.t||'').slice(0,40)),modal:((document.getElementById('modal')||{}).textContent||'').slice(0,120),tr:(COOPW.tr||[]).slice(-14)})).catch(e=>e.message)});await clear(A);await clear(B);return r}
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);
 /* 5a nothing changed → nothing asked; the host's set is the same on both */
 {const a=await asks(B);const la=await A.p.evaluate(()=>(S.men||[]).map(m=>m.id).join()),lb=await B.p.evaluate(()=>(S.men||[]).map(m=>m.id).join());
  ok(!a.length&&la===lb&&la.length>0,'5a: same palace men on both, no request when nothing changed',{a,la,lb})}
 /* 1 her road's envoy comes to the capital */
 const r1=await B.p.evaluate(()=>{bdMove('lie','kinh');const m=S.men.find(x=>x.id==='mbd_lie');if(m)m.tinh=7;try{render()}catch(e){}return m?{name:m.name,alive:m.alive}:null});
 ok(r1&&r1.alive,'1 guest: her road brings Mi Hồ Lan to the capital (bdMove → S.men)',r1);
 const a1=await asks(B);ok(a1.some(x=>x.startsWith('man:mbd_lie:')),'1 guest: request "man" in her blob',a1);
 ok(await hostHas(A,'mbd_lie',{alive:true}),'1 host: has him on the relay (same week)');
 {const h=await man(A,'mbd_lie');ok(h&&h.name===r1.name&&h.tinh===0,'1 host: same name, the host\'s own ties start at 0',h)}
 await weekAll(A,B,'1');
 {const g=await man(B,'mbd_lie'),h=await man(A,'mbd_lie');ok(g&&h&&g.name===h.name&&g.alive&&h.alive,'1 both: he is still there after the merged week',{g,h});
  ok(g&&g.tinh>=7,'1 guest: her own tie to him (tinh) kept (≥ 7: play may raise it, never back to 0)',g);const a=await asks(B);ok(!a.length,'1 guest: request closed',a)}
 /* 2 her act kills a palace man of the host's set */
 const vid=await B.p.evaluate(()=>{const m=(S.men||[]).find(x=>x&&x.alive!==false&&/^m\d+$/.test(x.id));if(!m)return null;mortKill(m,'thử');try{render()}catch(e){}return m.id});/* review/coop-driver-fails #2: a real act ends in render(), which starts the rolling save (jcoopworld snapSoon → ser → jcoopask collect) that carries her request; without it the request waited for an unrelated render (LIVE H1 red: ask [] but one ser() built man:m0:alive=false at once) */
 ok(!!vid,'2 guest: her act kills a palace man (mortKill)',vid);
 {const r=await hostHas(A,vid,{alive:false});ok(r,'2 host: he is dead there too (relay)',r?undefined:{G:await RDBG(B),H:await RDBG(A)})}
 await weekAll(A,B,'2');
 {const g=await man(B,vid),h=await man(A,vid);ok(g&&h&&!g.alive&&!h.alive,'2 both: he stays dead after the merged week (no man comes back)',{g,h})}
 /* 3 her road sends the envoy home */
 await B.p.evaluate(()=>{bdMove('lie','tn');try{render()}catch(e){}});
 ok(await hostHas(A,'mbd_lie',{away:1}),'3 host: the envoy is away (off the schedule) too');
 await weekAll(A,B,'3');
 {const g=await man(B,'mbd_lie'),h=await man(A,'mbd_lie');ok(g&&h&&g.away===1&&h.away===1&&JSON.stringify(g.ban)===JSON.stringify(h.ban),'3 both: away, same ban',{g,h})}
 /* 4 durable path: relay dropped + rejoin */
 await DROP(B);const r4=await B.p.evaluate(()=>{pfMove('huuthanh','kinh');const m=S.men.find(x=>x.id==='mpt_huuthanh');try{render()}catch(e){}return m?m.name:null});
 ok(!!r4,'4 guest: her Phù Tang road brings Kim Hựu Thành (relay dropped)',r4);await asks(B);await B.p.waitForTimeout(2500);
 ok(!(await man(A,'mpt_huuthanh')),'4 host: nothing yet (relay dropped)');
 console.log('4 before rejoin',JSON.stringify(await B.p.evaluate(()=>({asks:(S.coopAsk||[]).map(a=>a.id),snap:COOPW.askSnap&&(COOPW.askSnap.men||[]).map(m=>m.id),men:(S.men||[]).map(m=>m.id)}))));
 ok(await rejoinB(B,code),'4 guest: left and rejoined before the week end');await clear(A);await clear(B);
 console.log('4 after rejoin',JSON.stringify(await B.p.evaluate(()=>({asks:(S.coopAsk||[]).map(a=>a.id),snap:COOPW.askSnap&&(COOPW.askSnap.men||[]).map(m=>m.id),men:(S.men||[]).map(m=>m.id)}))));
 {const g=await man(B,'mpt_huuthanh');const a=await asks(B);ok(g&&a.some(x=>x.startsWith('man:mpt_huuthanh:')),'4 guest: stand-in + request survive the rejoin',{g,a})}
 await weekAll(A,B,'4a');
 ok(!!(await man(A,'mpt_huuthanh'))&&(await A.p.evaluate(()=>((window.__askN||{}).log||[]).some(l=>/^base man:mpt_huuthanh:/.test(l)))),'4 host: applied from her blob at the rebuild');
 await weekAll(A,B,'4b');
 {const g=await man(B,'mpt_huuthanh'),h=await man(A,'mpt_huuthanh');ok(g&&h&&g.name===h.name,'4 both: he is there two weeks later',{g,h})}
 /* 6 same family, HOST_ONLY thIll: her own act on the Thái hậu's illness (j72 easeTH = one stage, j71 thbenh cure = KIT_FACEFX.api.cure).
    review r1 F3: the host's own month roll may change the illness during a week, so the set-up re-sets it until both seats show st 3, and
    every check reads the PAIR + the host's applied "th" request (b → v), never a fixed stage after a merged week. */
 const th=o=>o.p.evaluate(()=>S.thIll==null?null:{k:S.thIll.k,st:S.thIll.st});
 /* review/coop-driver-fails #2: __askN.log keeps only the last 10 applies (jcoopask.js:153), so servant requests of the same weeks pushed the th
    lines out (LIVE H3 6d red: L = []). The host's durable record S.askDone[id] = [r, week] (pruned only 3 weeks after) is read too, one line per id */
 const thLog=()=>A.p.evaluate(()=>{const L=((window.__askN||{}).log||[]).filter(l=>/ th:/.test(l)),seen=new Set(L.map(l=>l.split(' ')[1]));
  for(const [id,v] of Object.entries(S.askDone||{}))if(/^th:/.test(id)&&!seen.has(id))L.push('done '+id+' w'+(v&&v[1])+' r'+(v&&v[0]));return L});
 async function ill3(tag){for(let i=0;i<4;i++){await A.p.evaluate(()=>{S.thDead=false;S.thIll={k:'phonghan',st:3,known:true};try{render()}catch(e){}});await weekAll(A,B,tag+i);
   const g=await th(B),h=await th(A);if(g&&h&&g.st===3&&h.st===3)return true}return false}
 /* diagnostics: every change of thIll on the guest with the week / buổi and the last log line (who changed it) */
 await B.p.evaluate(()=>{window.__thw=[];let last=JSON.stringify(S&&S.thIll||null),lo=null;setInterval(()=>{try{const v=JSON.stringify(S&&S.thIll||null);const L=(S.logs||[]);if(v!==last){window.__thw.push([__co().week,S.buoi||0,last,v,(COOPW.askSnap&&JSON.stringify(COOPW.askSnap.th))||'',String(L[L.length-1]||'').slice(0,140),String(L[L.length-2]||'').slice(0,100)]);last=v}}catch(e){}},40)});
 ok(await ill3('6a'),'6 both: the Thái hậu is ill, stage 3 on both seats (host\'s value)');
 await B.p.evaluate(()=>{/* probe (dump only on FAIL): every save of her week after the ease: illness, open th requests */window.__serT=[];if(!window.__serW){window.__serW=1;const f=ser;ser=function(){const d=f.apply(this,arguments);try{if(window.__serT&&__serT.length<12)__serT.push([__co().week,S.buoi|0,S.thIll&&S.thIll.st,(S.coopAsk||[]).filter(a=>a.k==='th').map(a=>a.id),COOPW.askSnap&&COOPW.askSnap.th&&COOPW.askSnap.th.st])}catch(e){}return d}}});
 await B.p.evaluate(()=>{const i=S.thIll;if(i.st>1)i.st--;else S.thIll=null;try{render()}catch(e){}});/* easeTH's body (j72:308, a closure) */
 {const r=await until(A,()=>S.thIll&&S.thIll.st===2,null,20000);ok(r,'6 host: her act eased the illness 3 → 2 (relay)',r?undefined:{h:await th(A),G:await RDBG(B),H:await RDBG(A)})}
 await weekAll(A,B,'6b');{const g=await th(B),h=await th(A),L=await thLog();ok(JSON.stringify(g)===JSON.stringify(h)&&L.some(l=>/"st":3.*>.*"st":2.*@\d+ w\d+ r1$/.test(l)),'6 both: same illness after the merged week, her ease applied (3 → 2)',{g,h,L})}
 /* 6d (review r1 F1): her act RESOLVES inside her week end (j72 th_thuoc2's wait step ends in q72Tick, endTurn → easeTH); hook as the review repro */
 /* reached = applied (r1) or refused because the host's own roll moved the illness meanwhile (r0, solo rule: nothing left to ease) */
 /* review/coop-driver-fails #2: the host's own month roll (j13:30 illMonth, host-only: roll(30) → the illness ends) can end the set-up
    illness BEFORE her week end (LIVE G4: guest thw w8 b3 st3 → null with askSnap.th null = a host rebuild) → her ease has nothing to ease
    (__wke null). Not her act, not the relay: the set-up is re-armed (≤ 3 tries) until her week end meets the illness. */
 let n33=0;const E33=l=>/"st":3.*>.*"st":2.*@\d+ w\d+ r[01]$/.test(l);
 for(let t6=0;t6<3;t6++){ok(await ill3('6c'+t6)||t6<2,'6d both: stage 3 again');
  n33=(await thLog()).filter(E33).length;
  await B.p.evaluate(()=>{window.__wke=null;window.__rtN=0;const q0=rivalsTurn;rivalsTurn=function(){window.__rtN++;const r=q0.apply(this,arguments);try{if(!window.__wke&&S.thIll){const b=S.thIll.st;if(S.thIll.st>1)S.thIll.st--;else S.thIll=null;window.__wke=[b,S.thIll&&S.thIll.st]}}catch(e){}return r}});
  await weekAll(A,B,'6d'+t6);if(await B.p.evaluate(()=>!!window.__wke))break;console.log('6d re-arm: the host\'s own roll ended the illness before her week end',await B.p.evaluate(()=>(window.__thw||[]).slice(-3).map(x=>x.slice(0,5))))}
 {const w=await B.p.evaluate(()=>window.__wke),rtN=await B.p.evaluate(()=>[window.__rtN,rivalsTurn.toString().slice(0,60)]),L=await thLog(),g=await th(B),h=await th(A);ok(w&&w[0]===3&&w[1]===2,'6d guest: her ease ran inside her week end',{w,rtN});
  ok(L.filter(E33).length>n33,'6d host: the "th" request of her week-end ease reached the host',L);
  if(!(h&&g))await weekAll(A,B,'6d+');ok(JSON.stringify(await th(B))===JSON.stringify(await th(A)),'6d both: same illness (her week-end ease kept)',{g,h})}
 /* 6e cure */
 ok(await ill3('6e'),'6e both: ill again');
 await B.p.evaluate(()=>{KIT_FACEFX.api.cure(S.thO);try{render()}catch(e){}});/* j71 thbenh success: S.thIll=null */
 ok(await until(A,()=>S.thIll==null,null,20000),'6e host: her cure cured the Thái hậu (relay)',await th(A));
 await weekAll(A,B,'6f');{const g=await th(B),h=await th(A),L=await thLog();ok(JSON.stringify(g)===JSON.stringify(h)&&L.some(l=>/>null@\d+ w\d+ r1$/.test(l)),'6e both: same after the merged week, her cure applied (no illness comes back from her rebuild)',{g,h,L})}
 /* 6g (review r1 F2): no request is ever built from the host's own value: every applied "th" request is one of hers (st 3 → 2 or → null) */
 {const L=await thLog();const bad=L.filter(l=>!/"st":3.*>.*("st":2|null)/.test(l));ok(!bad.length,'6g host: every "th" request is one of her acts (none from the host\'s own value)',{L,thw:await B.p.evaluate(()=>window.__thw)})}
 console.log('thw',JSON.stringify(await B.p.evaluate(()=>window.__thw)));
 /* 5b rejoin: same set on both, nothing open */
 ok(await rejoinB(B,code),'5 guest: rejoined');await clear(A);await clear(B);
 {const f=o=>o.p.evaluate(()=>(S.men||[]).map(m=>m.id+':'+(m.alive!==false?1:0)+(m.away?'a':'')).sort().join());const la=await f(A),lb=await f(B),a=await asks(B);
  ok(la===lb,'5 both: same palace men (alive / away) after rejoin',{la,lb});ok(!a.length,'5 guest: no open request',a);
  ok(!a.some(x=>/^man:m\d+:new@/.test(x)),'5 guest: never asks for the host\'s own set')}
 await shot(A,'gmen-host');await shot(B,'gmen-guest');
 console.log('askN A',JSON.stringify(await A.p.evaluate(()=>window.__askN)),'B',JSON.stringify(await B.p.evaluate(()=>window.__askN)));
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
