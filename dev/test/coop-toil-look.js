/* CO-OP look of the day (diemtrang-coop-look; setup copied from coop-e2e.js): each seat must read the SAME Điểm trang look,
   dress verdict, regard change and face layer for each player (her own seat vs the friend entry on the other seat). Was: the friend went through toilNpc (a fake roll).
   Co-op end-to-end setup: two Playwright browsers in one room against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-toil-look.js [outdir] [workerURL]
   A = Fold portrait 686x880@2.2 (host), B = iPad landscape 1180x820@2 (guest).
   Steps: create room, join by ?room=, play 3 weeks (both end → merged week), B leaves → A frozen ("Đợi bạn trở lại"),
   B comes back → resumes same week, B dies → normal rebirth choice → new person in the SAME world, single-player + old save still load.
   Hooks used (PROTOCOL.md / jcoop.js): window.COOP {code,seat,week,online,ended,frozen,waiting,on}, rivals entry coop:true id 901/902. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/home/user/wt/coop-toil-look-shots');fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);/* night-final (as coop-e2e): .kcf / #kroul are no longer hidden — clear() (lib/coop-clear.js) ends them like a player */await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(+process.env.E2E_TO||30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
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
    if(t%8===7)for(const [o,k] of [[A,a],[B,b]])if(k===k0)await require('./lib/coop-real.js').repress(o);/* review/coop-driver-fails #2: a press that only opened a card is pressed again (lib/coop-real repress) */
    await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B),sA:await A.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message),sB:await B.p.evaluate(require('./lib/coop-clear.js').SCR).catch(e=>e.message)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 /* COOP_MLINE: the guest must be a consort with her own maids (a random cung nữ start has none, the mline check would be void) */
 for(const o of [A,B])await o.ctx.addInitScript(()=>{window.__forceOrigin='thd'});/* both consorts: the look rule is for a friend in rivals */
 /* 1 host makes a room */
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);await shot(A,'01-title');
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);await shot(A,'02-coop-menu');
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code, seat a');
 const code=(await C(A)).code;console.log('room',code);await clear(A);await shot(A,'03-invite-waiting');
 const w0=await A.p.evaluate(()=>!!(__co().frozen));ok(w0,'A waits for the friend (frozen before join)');
 /* 2 guest joins by link */
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await shot(B,'04-join');
 await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 ok(await until(A,()=>!__co().frozen,null,20000),'A unfrozen when B is in');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world);if(a&&c)break;await sleep(500)}}
 ok(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world),'both players are in the shared world');await clear(A);await clear(B);
 const ev=(o,f,a)=>o.p.evaluate(f,a);
 const read=(o,friend)=>ev(o,fr=>{const p=fr?rivals.find(v=>v.coop):S;if(!p)return{none:1};const was=S.toilSeen;S.toilSeen=null;
   const out={};for(const h of ["th","emp"]){const t=toilFx(p,h,toilFOf(h),"ok");out[h]=t?[t.mk,t.dress,t.aff,t.danh]:null}
   out.face=toilLookOfP(p)||"";out.mkLux=typeof toilMkLux==="function"?toilMkLux(p):0;S.toilSeen=was;return out},friend);/* makeup-lux: the face's xa xỉ, the same on both seats */
 const same=async(tag)=>{for(let i=0;i<40;i++){const x=JSON.stringify(await read(A,false)),y=JSON.stringify(await read(B,true)),x2=JSON.stringify(await read(B,false)),y2=JSON.stringify(await read(A,true));if(x===y&&x2===y2)break;await clear(A);await clear(B);await sleep(300)}
   const ra=await read(A,false),rb=await read(B,true),rb2=await read(B,false),ra2=await read(A,true);
   ok(JSON.stringify(ra)===JSON.stringify(rb),tag+': A herself = A as seen on B',[ra,rb]);ok(JSON.stringify(rb2)===JSON.stringify(ra2),tag+': B herself = B as seen on A',[rb2,ra2]);return[ra,rb,rb2]};
 const sit=(o,t)=>ev(o,t=>{S.toilette=t?Object.assign({wk:toilWk(),day:toilWk()*10,F:1,occ:["th"],style:"fit",dv:"hopdip",makeup:true},t):null;render();return true},t);
 await same('no sitting (mặt mộc)');
 await sit(A,{score:72,look:"diem",col:{mat:"hongmai",ma:"yenchi",son:"dotham",may:"den",want:"diem",seed:1}});await sit(B,{score:30,look:"vung",col:{seed:2}});
 const [d1,,d2]=await same('A old diêm dúa · B vụng');ok((d1.face==="tuyet"||d1.face==="dep")&&d2.face==="vung"&&d1.mkLux>0&&d2.mkLux>0,"face layer reads the old diêm dúa as Khuynh thành / vụng on both seats, xa xỉ of the face counted (makeup-lux)",[d1.face,d2.face,d1.mkLux,d2.mkLux]);
 /* review r1: shots of each seat with the friend's page open (OUT is outside the repo). Check, not asserted: her portrait stays a silhouette
    until met (k61 rule), so her makeup shows where her picture is drawn (stage); the data check above is the binding one. */
 const look=async(o,n)=>{await clear(o);await ev(o,()=>{const f=rivals.find(v=>v.coop);tab='rv';PG.rv=rivals.indexOf(f);render()});await sleep(1500);await shot(o,n)};
 await look(A,'07-friend-look');await look(B,'07-friend-look');
 await sit(A,{score:90,look:"dep"});await sit(B,{score:55,look:null});await same('A tuyệt · B vừa');
 /* npc-chain-land #3 root: a pos relay lost on a socket that is down / reconnecting (COOP.send → false) is said again on the next render
    (posKey kept only once sent), so the friend never keeps an old look */
 const lost=await ev(B,()=>{const s0=COOP.send;let n=0;COOP.send=function(m){if(m&&m.t==="pos"&&!n){n++;return Promise.resolve(false)}return s0.apply(this,arguments)};
  try{S.toilette=Object.assign({},S.toilette,{score:80,look:null});render()}finally{setTimeout(()=>{COOP.send=s0},50)}return n});
 await sleep(400);await ev(B,()=>{render();return 1});await same('B\'s pos lost once, said again');ok(lost===1,'the lost pos send was hit (test hook)',lost);
 /* A puts on another dress (worn set wd): B's dress verdict for A follows */
 const wdA=await ev(A,()=>{const w=wdOf(S);const L=Object.keys(WD_ITEMS||{}).filter(k=>WD_ITEMS[k].sl==="y"&&(!w.y||w.y.k!==k));const k=L[L.length-1];if(k)w.y={k,from:"test"};render();return k||""});
 if(wdA){await same('A in another dress ('+wdA+')');let wa,wb;for(let i=0;i<30;i++){wa=await ev(A,()=>JSON.stringify(S.wd));wb=await ev(B,()=>JSON.stringify((rivals.find(v=>v.coop)||{}).wd));if(wa===wb)break;await sleep(300)}await same('A in another dress, relayed');ok(wa===wb,'B holds A\'s worn clothes (wd relay)',[wa,wb])}else ok(false,'no other dress to try');
 /* review r1: one merged week later, still the same on both seats (the week merge carries LOOK toilette + wd; a new week = mặt mộc) */
 await weekBoth(A,B,1);await same('after the merged week');
 for(const o of [A,B]){ok(!o.errs.length,o.name+' no page errors',o.errs.slice(0,4))}
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
