/* review/coop-guest-maid: 2-browser test of the guest→host request path (dev/build/jcoopask.js, PROTOCOL §4.1) against the LIVE Worker.
   Host 755x1000@2 (Fold), guest 1180x820@2 (iPad). Helpers copied from coop-e2e.js (lines up to weekBoth).
   1 live path: the guest's own maid catches the Emperor's eye (real j14 servRanks → jmline → newRival), stand-in on the guest at once,
     the host makes the consort the same week (relay), after one week both see the same consort (same id, name), her links moved to the world id.
   2 durable path: the relay is dropped, the guest leaves and rejoins before the week ends → the request survives (her blob) → host applies it
     at the next rebuild → both see it two weeks later.
   3 refusal: no free seat on the host → her maid comes back to her household.
   4 muted world events on the guest: tuyển tú (tuyenTu) and an NPC's maid serving (sendMaid) make nobody on the guest.
   5 both see the new consorts after another rejoin.  usage: node dev/test/coop-guest-maid.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-guest-maid'));fs.mkdirSync(OUT,{recursive:true});
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* a manual kit scene (night-end «Nhận» #kneov, reward box): a player closes it with its own button [data-km-close] (rv night-balance-bundle, like coop-night) */const kc=[...document.querySelectorAll('.kmov [data-km-close],.kmov .krevok')].find(x=>x.offsetParent!==null&&!x.disabled&&x.getClientRects().length);if(kc){kc.click();return'x'}const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
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
    return true}await clear(A);await clear(B);await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}
const RISE=async(o,drop)=>o.p.evaluate(drop=>{/* one maid of hers, only she can catch the eye this time */
  if(!window.__dropP){window.__dropP=1;const s0=COOP.send;COOP.send=function(m){if(m&&m.k==='ctm-ask'&&window.__dropAsk===1)return;return s0.apply(this,arguments)}}
  window.__dropAsk=drop?1:2;
  const m=mkServ('maid');m.age=18;m.loyal=drop?20:80;S.staff.push(m);const e0=mlEye;mlEye=function(p,s){return s===m};const n0=rivals.length;let ev='';
  try{ev=servRanks()||''}finally{mlEye=e0}const g=rivals.find(v=>v.id>=1000&&!S.staff.includes(m));try{render()}catch(e){}
  return{sid:m.sid,maid:m.name,ghost:g?{id:g.id,name:g.name,rel:g.rel}:null,stillHers:S.staff.includes(m),ev,n:rivals.length-n0,rl:g?S.rl[g.id]:null}},!!drop);
const view=o=>o.p.evaluate(()=>({R:rivals.filter(v=>!v.coop&&v.id<1000).map(v=>v.id+':'+v.name).sort().join(),ghosts:rivals.filter(v=>v.id>=1000).map(v=>v.id+':'+v.name),
  asks:(S.coopAsk||[]).map(a=>a.id),done:S.askDone||null,N:window.__askN,staff:(S.staff||[]).map(s=>s.sid)}));
const byAsk=(o,id)=>o.p.evaluate(id=>{const v=rivals.find(x=>x.coopAsk===id);return v?{id:v.id,name:v.name,rank:v.rank,rel:v.rel,me:S.rl[v.id]==null?null:S.rl[v.id],ro:S.ro[v.id]==null?null:S.ro[v.id],alive:v.alive}:null},id);
async function rejoinB(B,code){await B.p.close();await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 return until(B,()=>__co().seat==='b'&&!__co().frozen&&__co().world,null,60000)}
async function weekAll(A,B,tag){const wk=(await C(A)).week;await weekBoth(A,B,1);let r=true;for(const o of [A,B])r=await untilC(o,x=>__co().week===x+1,wk,90000)&&r;ok(r,tag+': week advanced for both');await clear(A);await clear(B);return r}
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 await B.ctx.addInitScript(()=>{window.__forceOrigin='thd'});
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(500)}}
 await clear(A);await clear(B);
 const bc=await B.p.evaluate(()=>({srv:!!(S.srv&&!S.srv.risen),inC:consorts().includes(S),rank:S.rank,room:roomFor('consort')}));ok(bc.inC&&bc.room,'B is a consort with a free consort seat',bc);
 /* 1 live path */
 const r1=await RISE(B,false);ok(r1.ghost&&!r1.stillHers&&r1.n===1,'1 guest: her maid rose, stand-in shown at once, maid left her household',r1);
 ok(/lọt mắt xanh Hoàng thượng/.test(r1.ev),'1 guest: the solo rise line',r1.ev.slice(0,160));
 const id1=await B.p.evaluate(g=>{for(let i=0;i<20&&!(S.coopAsk||[]).length;i++)ser();return(S.coopAsk||[]).map(a=>a.id).find(x=>x.endsWith(':'+g))||null},r1.ghost&&r1.ghost.id);ok(!!id1,'1 guest: request in her blob',id1);
 ok(await until(A,id=>rivals.some(v=>v.coopAsk===id),id1,20000),'1 host: made the consort on the relay (same week)');
 const h1=await byAsk(A,id1);ok(h1&&h1.name===r1.ghost.name&&h1.id<900,'1 host: same name, a world id',h1);
 await weekAll(A,B,'1');
 {const g1=await byAsk(B,id1);const v=await view(B);ok(g1&&g1.id===h1.id&&g1.name===h1.name,'1 guest: sees the same consort (id, name) after the week',{g1,h1});
  ok(!v.ghosts.length&&!v.asks.includes(id1),'1 guest: stand-in gone, request closed',v);{const tk=await B.p.evaluate(t=>[S.rl[t],S.ro[t]].filter(x=>x!=null).length,r1.ghost.id);ok(g1&&g1.me!=null&&Math.sign(g1.me)===Math.sign(r1.rl)&&Math.abs(g1.me-r1.rl)<Math.abs(r1.rl)&&Math.sign(g1.rel)===Math.sign(r1.ghost.rel)&&!tk,'1 guest: her links moved to the world id (both sides; the week may move them a little, never double)',{g1,r1,tempKeys:tk})}
  const va=await view(A);ok(va.R===v.R,'1 both: same consort list',[va.R.length,v.R.length])}
 /* 2 durable path + rejoin */
 const r2=await RISE(B,true);ok(r2.ghost,'2 guest: second maid rose (relay dropped)',r2);
 await B.p.evaluate(()=>{ser();try{COOPW.snap&&localStorage.setItem('x',1)}catch(e){}});await B.p.waitForTimeout(2500);/* the rolling seat copy (1 s after render) */
 ok(await rejoinB(B,code),'2 guest: left and rejoined before the week end');await clear(A);await clear(B);
 {const v=await view(B);const id2=v.asks.find(x=>x.endsWith(':'+r2.ghost.id));ok(!!id2&&v.ghosts.some(x=>x.startsWith(r2.ghost.id+':')),'2 guest: request and stand-in survive the rejoin',v);
  {const h=await A.p.evaluate(id=>({made:rivals.some(v=>v.coopAsk===id),log:(window.__askN||{}).log||[]}),id2);ok(!h.made,'2 host: nothing yet (relay was dropped)',h)}
  await weekAll(A,B,'2a');const h2=await byAsk(A,id2);ok(!!h2&&(await A.p.evaluate(id=>((window.__askN||{}).log||[]).some(l=>l.startsWith('base '+id)),id2)),'2 host: applied from her blob at the rebuild',h2);
  await weekAll(A,B,'2b');const g2=await byAsk(B,id2);ok(g2&&h2&&g2.id===h2.id&&g2.name===r2.ghost.name,'2 guest: sees the same consort two weeks later',{g2,h2});
  const vb=await view(B),va=await view(A);ok(va.R===vb.R&&!vb.ghosts.length,'2 both: same consort list, no stand-in',[va.R.length,vb.R.length,vb.ghosts])}
 /* 3 refusal */
 await A.p.evaluate(()=>{window.__rf0=roomFor;roomFor=r=>r==='consort'?false:window.__rf0(r)});
 const r3=await RISE(B,false);ok(r3.ghost,'3 guest: third maid rose',r3);await sleep(3000);
 await weekAll(A,B,'3a');await weekAll(A,B,'3b');await A.p.evaluate(()=>{roomFor=window.__rf0});
 {const v=await view(B);ok(v.staff.includes(r3.sid)&&!v.ghosts.length,'3 guest: refused (no seat) → her maid is back, no stand-in',v);
  ok(await B.p.evaluate(n=>(S.logs||[]).some(l=>l.includes(n)&&/đủ người/.test(l)),r3.maid),'3 guest: a log line tells her')}
 /* 4 world events muted on the guest */
 {const r=await B.p.evaluate(()=>{const n0=rivals.length;const s={m:S.month,t:S.tuan,d:S.ttDone,y:S.year};S.month=2;S.tuan=0;S.ttDone=-1;tuyenTu();Object.assign(S,{month:s.m,tuan:s.t,ttDone:s.d});
   const v=rivals.find(x=>!x.coop&&x.id<900);const m0=v.maid;v.maid={name:'Thử',loyal:90};const R0=Math.random;Math.random=()=>0;let t='';try{t=sendMaid(v)}finally{Math.random=R0;v.maid=m0}return{made:rivals.length-n0,t}});
  ok(r.made===0&&r.t==='','4 guest: tuyển tú and an NPC maid serving make nobody on the guest',r)}
 /* 5 rejoin again: both still see the new consorts */
 ok(await rejoinB(B,code),'5 guest: rejoined');await clear(A);await clear(B);
 {const va=await view(A),vb=await view(B);ok(va.R===vb.R&&!vb.ghosts.length,'5 both: same consorts after rejoin',[va.R.length,vb.R.length]);
  ok((await byAsk(B,id1))&&true,'5 guest: the first consort is still there')}
 await shot(A,'gm-host');await B.p.evaluate(()=>{try{showTab&&showTab('log')}catch(e){}});await shot(B,'gm-guest');
 console.log('askN A',JSON.stringify(await A.p.evaluate(()=>window.__askN)),'B',JSON.stringify(await B.p.evaluate(()=>window.__askN)));
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
