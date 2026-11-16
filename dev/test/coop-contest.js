/* review/coop-contest: 2-browser test of the shared contests (dev/build/jcoopcontest.js, PROTOCOL §11) against the LIVE Worker.
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
 await B.ctx.addInitScript(()=>{window.__forceOrigin='thd'});
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);await mine(A);await mine(B);
 ok(await A.p.evaluate(()=>!!COOPW.fEntry())&&await B.p.evaluate(()=>!!COOPW.fEntry()),'both see the friend entry');
 /* ---- 1 invitation ---- */
 const inv=await A.p.evaluate(()=>{let k=null,vi=-1;for(const f in FV7){const i=FV7[f].findIndex(V=>V[0]==='C'&&SC7[V[1]]);if(i>=0&&FEST[f]){k=f;vi=i;break}}
   const pp=fPP7(k,vi);pp.e=(pp.e||[]).filter(id=>id<900);pp.pr=(pp.pr||[]).filter(id=>id<900);pp.y=S.year;const j=j7s();j.plans=j.plans||{};j.plans[k]={y:S.year,pp,me:0};
   S.cfp=S.cfp||{};S.cfp[k]={y:S.year,pp:JSON.parse(JSON.stringify(pp))};window.__tsd=pp.sd;Q.unshift(fInv7(k,pp,true));showModal();return{k,vi,sd:pp.sd,e:pp.e,y:S.year}});
 await B.p.evaluate(sd=>{window.__tsd=sd},inv.sd);
 const hA=await head(A);ok(hA&&hA.pid==='j71i'&&/cũng nhận được lời mời/.test(hA.h),'1 host: invitation with the friend line',hA&&hA.t);
 ok(await answer(A,/^Ghi tên dự thi/),'1 host: enters');
 ok(await until(B,()=>(S.logs||[]).some(l=>/Hảo hữu đã ghi tên dự/.test(l)),null,15000),'1 guest: told the friend entered (relay)');
 await weekAll(A,B,'1');
 {const g=await B.p.evaluate(k=>{const P=(j7s().plans||{})[k];return P?{sd:P.pp.sd,vi:P.pp.vi,e:P.pp.e,y:P.y}:null},inv.k);
  ok(g&&g.sd===inv.sd&&g.vi===inv.vi&&JSON.stringify(g.e)===JSON.stringify(inv.e),'1 guest: the SAME plan (variant, entrants, seed)',{g,inv});
  const q=await B.p.evaluate(sd=>Q.filter(m=>m.pid==='j71i'&&m.pp&&m.pp.sd===sd).map(m=>({t:m.t,f:/cũng nhận được lời mời/.test(m.h||'')})),inv.sd);
  ok(q.length===1&&q[0].f&&q[0].t===hA.t,'1 guest: the same invitation (same title) + friend line',q)}
 ok(await answer(B,/^Ghi tên dự thi/),'1 guest: enters');
 ok(await until(A,k=>{const a=(S.cfa||{})['f:'+k];return a&&a.me===1},inv.k,15000),'1 host: has the guest answer');
 ok(await B.p.evaluate(()=>typeof fPlan7==='function'&&fPlan7()===null),'1 guest: rolls no plan of her own');
 /* ---- 2 one board ---- */
 const bd=await A.p.evaluate(k=>{const m=fDay7(k);const id=Object.keys(S.cfb||{}).find(x=>x.startsWith('f:'+k+':'));const B0=S.cfb[id];
   /* fDay7 runs inside endTurn in play (board week = the ending week; the friend plays next week): mimic that week here */
   B0.w=COOPW.wk()+1;if(m){Q.unshift(m);showModal()}return{id,ent:B0.ent,rows:B0.rows.map(r=>r.id+':'+r.s),m:!!m}},inv.k);
 ok(bd.id&&bd.ent['901']===1&&bd.ent['902']===1&&bd.m,'2 host: board with both players entered + her play dialog',bd);
 await A.p.evaluate(()=>{window.__score=40});ok(await answer(A,/^Vào thi/),'2 host: plays');
 ok(await until(A,id=>S.cfb[id].sc['901']&&!S.cfb[id].res,bd.id,10000),'2 host: her score is in, no result yet (waits for the friend)');
 ok(await A.p.evaluate(()=>window.__sc&&window.__sc.hold===true),'2 host: the mini-game holds its prizes (one list later)');
 await weekAll(A,B,'2');
 {const g=await B.p.evaluate(id=>{const b=(S.cfb||{})[id];return b?{rows:b.rows.map(r=>r.id+':'+r.s),res:!!b.res}:null},bd.id);ok(g&&JSON.stringify(g.rows)===JSON.stringify(bd.rows)&&!g.res,'2 guest: the same NPC rows from the host',g)}
 /* the friend entry's numbers follow her live stats (pos relay), so count the payments themselves: no ap()/bestow/item on the friend entry here */
 await A.p.evaluate(()=>{window.__apF=[];const a0=ap;ap=function(p,o){if(p&&p.coop)window.__apF.push(JSON.stringify(o));return a0.apply(this,arguments)};const b0=bestow;bestow=function(p){if(p&&p.coop)window.__apF.push('bestow');return b0.apply(this,arguments)};const f=COOPW.fEntry();/* main coop-b1b5 B1: her entry's bag mirrors her real bag (items carry ci); count only items the HOST put there (no ci) */window.__inv0=(f.inv||[]).filter(e=>e&&e.ci==null).length});
 const gb0=await B.p.evaluate(()=>S.sung);
 await B.p.evaluate(()=>{window.__score=999});ok(await answer(B,/^Vào thi/),'2 guest: plays (her real score)');
 ok(await B.p.evaluate(()=>window.__sc&&window.__sc.hold===true&&window.__sc.rivals.length>0),'2 guest: mini-game against the host NPC rows, held');
 ok(await until(B,id=>{const b=(S.cfb||{})[id];return b&&b.res&&(j7s().cdone||{})[id]},bd.id,20000),'2 guest: result list arrived and applied');
 const rA=await A.p.evaluate(id=>S.cfb[id].res.map(r=>r.id+':'+r.s),bd.id),rB=await B.p.evaluate(id=>S.cfb[id].res.map(r=>r.id+':'+r.s),bd.id);
 ok(JSON.stringify(rA)===JSON.stringify(rB)&&rA.length===bd.rows.length+2,'2 both: ONE result list (same order, same scores, both players + NPCs)',{rA,rB});
 ok(rA[0]==='902:999','2 both: the guest\'s real score ranks first',rA[0]);
 {const qa=await A.p.evaluate(()=>Q.filter(m=>/· Hội thi .*kết quả/.test(m.t||'')).length),qb=await B.p.evaluate(()=>Q.filter(m=>/· Hội thi .*kết quả/.test(m.t||'')).length);ok(qa===1&&qb===1,'2 both: one result dialog each',{qa,qb})}
 /* ---- 3 prize once ---- */
 {const post=await A.p.evaluate(()=>({ap:window.__apF,inv:(COOPW.fEntry().inv||[]).filter(e=>e&&e.ci==null).length-window.__inv0,mirror:(COOPW.fEntry().inv||[]).filter(e=>e&&e.ci!=null).map(e=>e.k+':'+(e.from||''))}));ok(!post.ap.length&&post.inv===0,'3 host: the winning friend entry is NOT paid on the host (no ap, bestow or item)',post);
  const gb1=await B.p.evaluate(()=>S.sung);ok(gb1-gb0>=3,'3 guest: her prize applied on her client (Sủng +3)',{gb0,gb1});
  const wonB=await B.p.evaluate(()=>(S.honors||[])[0]&&S.honors[0].p===1);ok(wonB,'3 guest: her own client paid her (honour, place 1)')}
 const nv=await A.p.evaluate(()=>liveRivals(false).find(x=>!x.coop&&present7(x)).id);
 const gS0=await B.p.evaluate(id=>RV(id).sung,nv);
 const np=await A.p.evaluate(vid=>{const id='f:np:'+S.year;const v=RV(vid);S.cfb[id]={id,ty:'f',k:Object.keys(FEST).find(k=>FV7[k]&&FV7[k].some(V=>V[0]==='C')),vi:0,y:S.year,kind:'tho',title:'Thử',big:false,
   rows:[{id:v.id,nm:v.name,kind:'tho',t:50,pr:0,lk:0,s:500}],ent:{901:0,902:0},sc:{},res:null,w:COOPW.wk()};const s0=v.sung;CCO.tryFin(S.cfb[id],false);return{id,v:v.id,s0,s1:v.sung}},nv);
 ok(np.s1>np.s0,'3 host: NPC winner paid once on the host',np);
 ok(await until(B,o=>(j7s().cdone||{})[o.id],np,15000),'3 guest: got the NPC result (relay)');
 {const g=await B.p.evaluate(id=>RV(id).sung,nv);ok(g===gS0,'3 guest: NPC NOT paid on the guest (the merge brings the host payment once)',{gS0,g})}
 for(const o of [A,B]){while(await o.p.evaluate(()=>!!(Q[0]&&window.__mine(Q[0])))){await o.p.evaluate(()=>{const m=document.getElementById('modal');const b=m&&[...m.querySelectorAll('button:not([disabled])')].find(x=>x.offsetParent!==null);if(b)b.click();else Q.shift()});await sleep(200)}}
 await clear(A);await clear(B);
 /* ---- 4 Tranh ghế ---- */
 await B.p.evaluate(()=>{S.rank=6});await weekAll(A,B,'4 prep');
 const tg=await A.p.evaluate(()=>{for(const v of rivals)if(v.queen&&!v.coop){v.queen=false;v.rank=Math.min(v.rank,5)}const v=liveRivals(false).find(x=>!x.coop&&present7(x));v.rank=6;S.rank=6;const f=COOPW.fEntry();
   S.contest={r:7,c:['me',f.id,v.id],t0:COOPW.wk(),len:1,round:0,sc:{},bk:{},pr:{},sab:{},dq:[],hint:0};return{npc:v.id,f:f.id,frk:f.rank}});
 ok(tg.frk===6,'4 host: friend entry is rank 6 (candidate)',tg);
 await weekAll(A,B,'4 open');
 ok(await B.p.evaluate(()=>!!(S.contest&&S.contest.co&&S.contest.c.includes('me'))),'4 guest: mirror of the host contest, she is a candidate');
 ok(await B.p.evaluate(()=>{const n=Q.filter(m=>m.t==='Tranh ghế').length;return n===1}),'4 guest: told once that she is a candidate');
 await B.p.evaluate(()=>{window.__mine=m=>false});await A.p.evaluate(()=>{window.__mine=m=>false});await clear(A);await clear(B);
 ok(await B.p.evaluate(()=>contestWeek()===""&&fillSeats()===""),'4 guest: contest functions muted');
 let gs=null;
 for(let w=0;w<5;w++){await B.p.evaluate(()=>{const c=S.contest;if(c&&c.co&&c.sc&&c.sc.me){c.sc.me=c.sc.me.map(x=>x==null?x:10)}});
  await weekAll(A,B,'4 week '+w);await clear(A);await clear(B);
  gs=await A.p.evaluate(()=>({c:S.contest?JSON.parse(JSON.stringify(S.contest.sc)):null,res:S.ctcRes||null}));
  console.log('  tg',w,JSON.stringify(gs.c),JSON.stringify(await B.p.evaluate(()=>S.contest&&S.contest.co?{r:S.contest.round,me:S.contest.sc.me,mine:S.ctcMine}:null)));if(gs.res)break}
 ok(gs&&gs.res,'4 host: contest ended',gs);
 ok(gs&&gs.res&&(gs.res.tbl.sc['902']||[]).filter(x=>x!=null).length>=2&&gs.res.tbl.sc['902'][0]===10&&gs.res.tbl.sc['902'][1]===10,'4 host: the guest\'s real round scores were used (10, 10)',gs&&gs.res&&gs.res.tbl.sc);
 await weekAll(A,B,'4 result');await clear(A);await clear(B);
 {const a=await A.p.evaluate(t=>({me:S.rank,f:COOPW.fEntry()&&{rank:COOPW.fEntry().rank,queen:!!COOPW.fEntry().queen},npc:RV(t.npc)&&{rank:RV(t.npc).rank,queen:!!RV(t.npc).queen},win:S.ctcRes&&S.ctcRes.win}),tg);
  const bb=await B.p.evaluate(t=>({me:S.rank,seen:S.ctcResSeen,f:COOPW.fEntry()&&{rank:COOPW.fEntry().rank,queen:!!COOPW.fEntry().queen},npc:RV(t.npc)&&{rank:RV(t.npc).rank,queen:!!RV(t.npc).queen}}),tg);
  const crowns=[a.me===7,bb.me===7,!!(a.npc&&a.npc.queen)].filter(Boolean).length;ok(crowns===1,'4 both: exactly ONE crown',{a,bb});
  ok((a.me===7)===!!(bb.f&&(bb.f.queen||bb.f.rank>=7))&&(bb.me===7)===!!(a.f&&(a.f.queen||a.f.rank>=7)),'4 both: they agree who was crowned',{a,bb});
  ok(!!bb.seen,'4 guest: saw the result')}
 await shot(A,'cc-host');await shot(B,'cc-guest');
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
