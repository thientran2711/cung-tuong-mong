/* review/coop-contest-r1 (reviewer): disconnect / reconnect mid-contest. Helpers copied from coop-contest.js.
   A guest enters; the guest's page closes BEFORE she plays (reload): the play card comes back once (pid ccplay), she plays, one list.
   Second board: the guest plays, then her page closes BEFORE the host ranks; the host ranks while she is away; on rejoin she gets the
   result from the shared world once (no double pay, one dialog).
   Original header: 2-browser test of the shared contests (dev/build/jcoopcontest.js, PROTOCOL §11) against the LIVE Worker.
   Host 755x1000@2 (Fold), guest 1180x820@2 (iPad). Helpers copied from coop-guest-maid.js (clear() leaves the contest dialogs to this test).
   1 one invitation: the host's plan reaches the guest after the week (same variant, entrants, seed) + the 'friend also invited' line; answers relay.
   2 one board: both play against the same NPC rows; the host ranks both + NPCs once; both clients hold the SAME result list.
   3 prize once: the friend entry is never paid on the other client; an NPC winner is paid on the host only.
   4 Tranh ghế: host-only; the guest plays her rounds on the mirror; her real round scores are used; exactly one crown, both agree.
   usage: node dev/test/coop-contest.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../../coop-contest-shots'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(()=>{/* merge-train-4: the card-flip scene waits for its kit end button (KIT 81); hide it like main's tests do */document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.kcf,#kroul{display:none!important}';document.head.appendChild(s)})});await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);/* a loaded test machine can take > 30 s to load the 3.7 MB page */
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator\.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';if(window.__mine&&Q[0]&&window.__mine(Q[0]))return'mine';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])');if(b){b.click();return'x'}return'stuck'});
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
    return true}await clear(A);await clear(B);await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}
async function rejoinB(B,code){await B.p.close();await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 return until(B,()=>__co().seat==='b'&&!__co().frozen&&__co().world,null,60000)}
async function weekAll(A,B,tag){const wk=(await C(A)).week;await weekBoth(A,B,1);let r=true;for(const o of [A,B])r=await untilC(o,x=>__co().week===x+1,wk,90000)&&r;ok(r,tag+': week advanced for both');await clear(A);await clear(B);return r}
const mine=o=>o.p.evaluate(()=>{window.__bot=true;window.__mine=m=>!!(m&&(m.pid==='ccplay'||(m.pid==='j71i'&&m.pp&&m.pp.sd===window.__tsd)||/^Tranh ghế$|^Kết quả tranh ghế|· Hội thi .*kết quả/.test(m.t||'')));
 /* the mini-game is stubbed: it answers at once with the score the test sets, and records what it was given */
 startContest=o=>{window.__sc={hold:o.hold,rivals:(o.rivals||[]).map(r=>r.id+':'+r.score)};setTimeout(()=>o.onDone({score:window.__score||40,shown:true}),20)}});
/* answer the modal at the head of the queue (after closing the normal dialogs in front of it) */
async function answer(o,re,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){const st=await clear(o);
  const r=await o.p.evaluate(src=>{const m=document.getElementById('modal');if(!m||m.hidden){if(Q.length){showModal();return'show'}return'none'}const R=new RegExp(src);
   const b=[...m.querySelectorAll('button:not([disabled])')].find(x=>x.offsetParent!==null&&R.test(x.textContent.trim()));if(b){b.click();return'ok'}return'nobtn:'+(Q[0]&&Q[0].t)},re.source);
  if(r==='ok')return true;await sleep(300)}return false}
const head=o=>o.p.evaluate(()=>Q[0]?{t:Q[0].t,pid:Q[0].pid||null,sd:Q[0].pp&&Q[0].pp.sd,h:Q[0].h||''}:null);
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);await mine(A);await mine(B);
 /* host makes a board with both entered (as fDay7 does inside endTurn), plays her part */
 const mkB=tag=>A.p.evaluate(tag=>{const v=liveRivals(false).filter(x=>!x.coop&&present7(x)).slice(0,3);const id='f:dc'+tag+':'+S.year;const k=Object.keys(FEST).find(k=>FV7[k]&&FV7[k].some(V=>V[0]==='C'));
   S.cfb=S.cfb||{};S.cfb[id]={id,ty:'f',k,vi:FV7[k].findIndex(V=>V[0]==='C'),y:S.year,kind:'tho',title:'Thử '+tag,big:false,rows:v.map((x,i)=>({id:x.id,nm:x.name,kind:'tho',t:20,pr:0,lk:0,s:30+i})),ent:{901:1,902:1},sc:{},res:null,w:COOPW.wk()+1};
   const j=j7s();j.plans=j.plans||{};j.plans[k]={y:-1,pp:{vi:S.cfb[id].vi},me:1};return{id,k}},tag);
 const b1=await mkB('1');
 await B.p.evaluate(k=>{const j=j7s();j.plans=j.plans||{};j.plans[k]={y:-1,pp:{vi:FV7[k].findIndex(V=>V[0]==='C')},me:1}},b1.k);
 await A.p.evaluate(id=>{window.__score=40;CCO.boards()[id]&&0;const m=(function(){const d=PEND.ccplay({b:id});return d});return !!m},b1.id);
 await A.p.evaluate(id=>{const B=S.cfb[id];const r={t:40,pr:0,lk:0,s:40,mg:1,kind:'tho'};j7s().cpl=j7s().cpl||{};CCO.tryFin;/* host's own part */
   const sub=PEND.ccplay({b:id});sub.o[0].go()},b1.id);
 ok(await until(A,id=>S.cfb[id].sc['901']&&!S.cfb[id].res,b1.id,10000),'D1 host: her score in, waits for the friend');
 await weekAll(A,B,'D1');
 ok(await until(B,id=>Q.some(m=>m.pid==='ccplay'&&m.pp&&m.pp.b===id),b1.id,15000),'D1 guest: play card queued');
 /* her page closes before she plays */
 await B.p.evaluate(()=>{try{save()}catch(e){}});
 ok(await rejoinB(B,code),'D1 guest: rejoined');await mine(B);
 const qn=await B.p.evaluate(id=>Q.filter(m=>m.pid==='ccplay'&&m.pp&&m.pp.b===id).length,b1.id);
 ok(qn===1,'D1 guest: after the reload the play card is back exactly once',qn);
 await B.p.evaluate(()=>{window.__score=60});ok(await answer(B,/^Vào thi/),'D1 guest: plays after reconnect');
 ok(await until(A,id=>!!S.cfb[id].res,b1.id,20000),'D1 host: ranked once the guest score came');
 ok(await until(B,id=>(j7s().cdone||{})[id],b1.id,20000),'D1 guest: result applied');
 const r1A=await A.p.evaluate(id=>S.cfb[id].res.map(r=>r.id+':'+r.s),b1.id),r1B=await B.p.evaluate(id=>S.cfb[id].res.map(r=>r.id+':'+r.s),b1.id);
 ok(JSON.stringify(r1A)===JSON.stringify(r1B)&&r1A[0]==='902:60','D1 both: one list, guest real score first',{r1A,r1B});
 for(const o of [A,B]){while(await o.p.evaluate(()=>!!(Q[0]&&window.__mine(Q[0])))){await o.p.evaluate(()=>{const m=document.getElementById('modal');const b=m&&[...m.querySelectorAll('button:not([disabled])')].find(x=>x.offsetParent!==null);if(b)b.click();else Q.shift()});await sleep(200)}}
 await clear(A);await clear(B);
 /* second board: guest plays, then leaves before the host ranks; the host ranks (forced) while she is away */
 const b2=await mkB('2');
 await B.p.evaluate(k=>{const j=j7s();j.plans[k]={y:-1,pp:{vi:FV7[k].findIndex(V=>V[0]==='C')},me:1}},b2.k);
 await weekAll(A,B,'D2');
 ok(await until(B,id=>Q.some(m=>m.pid==='ccplay'&&m.pp&&m.pp.b===id),b2.id,15000),'D2 guest: play card queued');
 /* host gets the guest score via relay but we hold the host's ranking: host has not played yet */
 await B.p.evaluate(()=>{window.__score=55});ok(await answer(B,/^Vào thi/),'D2 guest: plays');
 ok(await until(A,id=>S.cfb[id].sc['902']&&!S.cfb[id].res,b2.id,15000),'D2 host: has the guest score, still waiting for her own');
 const honors0=await B.p.evaluate(()=>(S.honors||[]).length),sung0=await B.p.evaluate(()=>S.sung);
 await B.p.close();
 await A.p.evaluate(id=>{window.__score=10;const d=PEND.ccplay({b:id});d.o[0].go()},b2.id);
 ok(await until(A,id=>!!S.cfb[id].res,b2.id,15000),'D2 host: ranked while the guest is away');
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen&&__co().world,null,60000),'D2 guest: rejoined');await mine(B);
 for(const o of [A,B]){while(await o.p.evaluate(()=>!!(Q[0]&&window.__mine(Q[0])))){await o.p.evaluate(()=>{const m=document.getElementById('modal');const b=m&&[...m.querySelectorAll('button:not([disabled])')].find(x=>x.offsetParent!==null);if(b)b.click();else Q.shift()});await sleep(200)}}
 await clear(A);await clear(B);
 if(!(await B.p.evaluate(id=>(j7s().cdone||{})[id],b2.id)))await weekAll(A,B,'D2 after');
 ok(await until(B,id=>(j7s().cdone||{})[id],b2.id,30000),'D2 guest: result applied after rejoin');
 const r2A=await A.p.evaluate(id=>S.cfb[id].res.map(r=>r.id+':'+r.s),b2.id),r2B=await B.p.evaluate(id=>S.cfb[id].res.map(r=>r.id+':'+r.s),b2.id);
 ok(JSON.stringify(r2A)===JSON.stringify(r2B),'D2 both: one list',{r2A,r2B});
 const hb=await B.p.evaluate(h0=>(S.honors||[]).length-h0,honors0);ok(hb<=1,'D2 guest: prize/honour applied at most once',hb);
 const rq=await B.p.evaluate(()=>Q.filter(m=>/· Hội thi .*kết quả/.test(m.t||'')).length);ok(rq<=1,'D2 guest: at most one result dialog',rq);
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
