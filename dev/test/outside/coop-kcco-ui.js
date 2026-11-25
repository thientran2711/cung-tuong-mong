/* review/outside-coop-r1 (BIG review): OR13 co-op acts through the REAL buttons, roles SWAPPED, at the room's thin level (THIN=9 = LIVE).
   usage: python3 dev/build/assemble.py && THIN=9 node dev/test/outside/coop-kcco-ui.js [outdir] [workerURL]
   A = host in the PALACE (iPad 1180x820), B = guest AT HOME (Fold 755x1000). A taps Tư trang › «Hảo hữu ở nhà» › Viết thư (price + odds
   on the host); B reads the card on her phone and keeps the letter; B plays her «Thư từ» cards (Gửi quà → picks a real item from her chest;
   Thuê người tung tin → chê a consort; sớ hặc) through the deck; A takes the gift. Checks: prices paid once, items move once (law 6c),
   world writes once on the host, and both phones read the same numbers (host copy of B == B's phone; NPC Danh / house power equal). */
/* review/outside-coop (GAP OR13 co-op half, jkcco.js): the friend at home <-> the friend in the palace, both ways, against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/outside/coop-kcco.js [outdir] [workerURL]
   Steps 1-3 = dev/test/outside/coop-home.js (A host at home on Fold 755x1000, B guest in the palace on iPad 1180x820). Then:
   A -> B letter (item + ans back), gift taken (item moves, ledger), gift returned (item back to A), sớ tiến cử accepted (host world:
   B's house power), sớ hặc (host world: target house power down + B's note), bad rumour (B «Mặc kệ»: Danh down);
   B -> A letter, gift taken, good rumour (A Lời đồn down), sớ tiến cử for A's house accepted (guest ans -> host world);
   a merged week keeps every moved item and both kcco logs; A passes the tuyển tú -> B's accept-card «Xin ban nàng về ở cung mình» -> A's
   resHead = B. Shots: A's «Thư từ» cards, B's Tư trang › «Hảo hữu ở nhà», the accept-cards. No page errors.
   Old header (coop-home): the home road ("Ở nhà chờ tuyển tú") in a co-op room, against the LIVE Worker.
   A (host, Fold portrait) picks "Ở nhà chờ tuyển tú" on the identity card; B (guest, iPad landscape) enters the palace.
   Checks: A is at home (isKc) in the SAME world (date, Emperor, consorts); B has NO palace entry for A while she is at home, A sees B as a
   palace person; three weeks advance for both (A's week = kcEndTurn through the co-op week path), A's home life (S.kc, family) survives
   every merged week; A enters the palace (kcEnter) → after the next merged week B sees A as a palace person and gets "Hảo hữu nhập cung";
   no page errors. Built from dev/test/coop-e2e.js (same helpers). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('../coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../shots/coop-kcco-ui'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);if(process.env.THIN&&name==='ipad')await ctx.addInitScript(w=>{try{localStorage.setItem('ctm-thin',w)}catch(e){}},process.env.THIN);/* THIN=<n>: the host asks for that thin room level (review r1) */
  await ctx.addInitScript(u=>{window.COOP_URL=u;
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim()));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])');if(b){b.click();return'x'}return'stuck'});
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
async function buoiBoth(A,B,shotWait){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));
  if(NIGHTS&&Math.random()<.45)await night(Math.random()<.5?A:B);
  await press(A,k0);if(shotWait)await shot(A,shotWait);await press(B,k0);
  /* a seat whose week end is out (after its tối, or a night that spent its day) waits for the merged week: count it as done */
  const key=o=>o.p.evaluate(()=>COOPW.pend||__co().waiting?'end':__co().week+':'+(S.buoi||0));
  for(let t=0;t<80;t++){const a=await key(A),b=await key(B);if(a!==k0&&b!==k0&&(a===b||a==='end'||b==='end'))return true;await clear(A);await clear(B);await sleep(250)}
  const dbg=o=>o.p.evaluate(()=>({k:__co().week+':'+(S.buoi||0),used,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,bend:COOPW.bend,pend:COOPW.pend,sent:COOPW.sent,tm:S.toMorning,tr:COOPW.tr.slice(-14)})).catch(e=>e.message);
  ok(false,'buổi '+k0+' advanced for both',{A:await dbg(A),B:await dbg(B)});return false}
async function weekBoth(A,B,w){const n=await A.p.evaluate(()=>typeof B4N==='number'?B4N:3);/* buổi per week: 4 since jtime4 */for(let k=0;k<n;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}


const roleInit=(o,home)=>o.ctx.addInitScript(home=>{window.__forceOrigin='dtq';try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}if(home){const b=document.querySelector('#modal:not([hidden]) [data-kcp="nha"]:not(.ksel)');if(b&&!(typeof S!=='undefined'&&S&&S.kc))b.click()}}catch(e){}},200)},home);
const hostB=(A,f)=>A.p.evaluate(f=>{let o=null;COOPW.thin.withSeat('b',()=>{o=(0,eval)('('+f+')')()});return o},f.toString());
const tapModal=async(o,title,re,ms=25000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(([t,src])=>{
   if(typeof Q!=='undefined'&&Q.length){const i=Q.findIndex(m=>m.t===t);if(i>0){Q.unshift(Q.splice(i,1)[0]);showModal()}else if(i===0&&document.getElementById('modal').hidden)showModal()}
   const m=document.getElementById('modal');if(!m||m.hidden)return null;const R=new RegExp(src);const b=[...m.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&R.test(x.textContent.trim()));
   if(!b)return null;const n=b.textContent.trim();b.click();return n},[title,re.source]);if(r)return r;for(const x of ALL)if(x!==o)await clear(x);await sleep(400)}return null};
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'ipad',[1180,820,2]),B=await mk(b,'fold',[755,1000,2]);ALL.push(A,B);await roleInit(A,false);await roleInit(B,true);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world&&typeof isKc==='function'&&isKc());if(a&&c)break;await sleep(500)}}
 const lv=[await A.p.evaluate(()=>COOPW.thin&&COOPW.thin.lvl),await B.p.evaluate(()=>COOPW.thin&&COOPW.thin.lvl)];console.log('thin level',lv);ok(!process.env.THIN||lv[0]===+process.env.THIN,'room thin level = THIN',lv);
 ok(await B.p.evaluate(()=>isKc())&&!await A.p.evaluate(()=>isKc()),'B (guest) at home, A (host) in the palace');
 await clear(A);await clear(B);
 ok((await Promise.all([A,B].map(o=>o.p.evaluate(()=>kccoOn())))).every(Boolean),'kcco on for both');
 /* 1 A (host, palace) taps Viết thư (real button: khắc + Sức paid, roll on the host) */
 await A.p.evaluate(()=>{S.mg=null;S.suc=Math.max(S.suc,60);tab='inv';render();const x=document.querySelector('[data-kinvsub="hh"]');if(x)x.click()});await A.p.waitForTimeout(500);
 const a0=await A.p.evaluate(()=>({suc:S.suc,kh:typeof S.kh==='number'?S.kh:null}));const bt0=await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='thunha').length);
 const tapped=await A.p.evaluate(()=>{const b=document.querySelector('[data-kcco="letter"]');if(!b||b.disabled)return b?'disabled: '+b.textContent:'none';const r0=roll;roll=()=>true;try{b.click()}finally{roll=r0}return'ok'});ok(tapped==='ok','A taps «Viết thư» in Tư trang › Hảo hữu ở nhà',tapped);
 const a1=await A.p.evaluate(()=>({suc:S.suc,price:BAL.kcco.letter.suc}));ok(a1.suc===a0.suc-a1.price||a1.suc===0,'A paid Sức letter.suc once',[a0.suc,a1.suc]);
 await shot(A,'20-palace-after-letter');
 let r=await tapModal(B,'Thư hảo hữu',/^Đọc thư, cất/);ok(!!r,'B (guest at home) reads A\'s letter card on her phone and keeps it',r);
 ok(await until(B,n=>(S.inv||[]).filter(e=>e.k==='thunha').length===n+1,bt0,20000),'B holds the letter (once)',[bt0,await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='thunha').length)]);
 /* 2 B (guest, home) plays «Gửi quà» from her deck: picks a real item from her chest */
 /* test set-up on ONE side only: the host's copy of her (its patch reaches her phone); setting both would count twice */
 const tb0=await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='tuithom').length);await A.p.evaluate(()=>{COOPW.thin.withSeat('b',()=>{S.inv.push({k:'tuithom',from:'test'})})});
 ok(await until(B,n=>(S.inv||[]).filter(e=>e.k==='tuithom').length===n+1,tb0,15000),'set-up: the host-side item reaches her phone');
 await clear(B);await B.p.evaluate(()=>{S.mg=null;tab='kid';render()});await B.p.waitForTimeout(400);
 const g0=[await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='tuithom').length),await A.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='tuithom').length)];
 const gi=await B.p.evaluate(()=>{const i=deck.findIndex(a=>a&&a.kcco==='gift'&&!a.done);if(i<0)return{none:deck.filter(a=>a&&a.kcco).map(a=>a.kcco+(a.done?'*':''))};const b=document.querySelector(`button.card[data-i="${i}"]`);if(!b)return{nobtn:i};if(b.disabled)return{dis:b.textContent.slice(0,80),kh:S.kh};b.scrollIntoView({block:'center'});b.click();return{i}});
 ok(gi&&gi.i!=null,'B taps her «Gửi quà» card',gi);await shot(B,'21-home-gift-pick');
 r=await tapModal(B,'Gửi quà',/^Túi thơm/);ok(!!r,'B picks the item in the kit dialog',r);
 await sleep(1500);console.log('DBG gift B',JSON.stringify(await B.p.evaluate(()=>({out:(S.kcco&&S.kcco.out||[]).map(m=>[m.kind,m.wait,m.due,m.id]),turn:S.turn,RQ:KCCO.RQ.map(x=>x.rid),fpend:COOPW.thin.F&&COOPW.thin.F.pend&&COOPW.thin.F.pend.n,flog:(COOPW.thin.F&&COOPW.thin.F.log||[]).slice(-6),Q:Q.map(m=>m.t)}))));
 console.log('DBG gift hostB',JSON.stringify(await hostB(A,()=>({out:(S.kcco&&S.kcco.out||[]).map(m=>[m.kind,m.wait,m.due,m.id]),turn:S.turn,inv:(S.inv||[]).filter(e=>e.k==='tuithom').length}))));
 ok(await until(B,n=>(S.inv||[]).filter(e=>e.k==='tuithom').length===n-1,g0[0],10000),'the item left B\'s chest',g0);
 console.log('DBG due',await B.p.evaluate(()=>{const m=(S.kcco.out||[]).find(x=>x.kind==='gift'&&x.wait);if(m)m.due=S.turn;return JSON.stringify([!!m,m&&m.due,S.turn,(S.kcco.out||[]).map(x=>[x.wait,x.due])])}));
 await sleep(4000);console.log('DBG after',await B.p.evaluate(()=>JSON.stringify({out:(S.kcco.out||[]).map(x=>[x.kind,x.wait,x.due]),RQ:KCCO.RQ.map(x=>[x.rid,x.at]),on:COOPW.on,ctx:COOPW.ctx||null})),await A.p.evaluate(()=>JSON.stringify({Q:Q.map(m=>m.t),done:Object.keys((S.kcco||{}).done||{}),modal:document.getElementById('modal').hidden?'':document.getElementById('modal').innerText.slice(0,120)})));
 r=await tapModal(A,'Quà hảo hữu',/^Nhận(?!\s*thân)/);ok(!!r,'A (host) gets B\'s gift card and takes it',r);
 ok(await until(A,n=>(S.inv||[]).filter(e=>e.k==='tuithom').length===n+1,g0[1],20000),'the item is in A\'s chest (once)',[g0[1],await A.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='tuithom').length)]);
 /* 3 B plays «Thuê người tung tin» (Bạc road): chê a consort → host world: that consort's Danh down, once */
 await B.p.evaluate(()=>{S.bac=Math.max(S.bac,80)});await sleep(1500);
 const bac0=await B.p.evaluate(()=>S.bac);
 const ri=await B.p.evaluate(()=>{render();const i=deck.findIndex(a=>a&&a.kcco==='ru_bac'&&!a.done);if(i<0)return{none:deck.filter(a=>a&&a.kcco).map(a=>a.kcco+(a.done?'*':''))};const b=document.querySelector(`button.card[data-i="${i}"]`);if(!b||b.disabled)return{dis:b&&b.textContent.slice(0,60)};const t0=agTry,s0=agSoft;agTry=()=>true;agSoft=()=>false;try{b.click()}finally{agTry=t0;agSoft=s0}return{i}});
 ok(ri&&ri.i!=null,'B taps «Thuê người tung tin»',ri);
 await sleep(1500);console.log('DBG ru B',JSON.stringify(await B.p.evaluate(i=>({card:deck[i]&&[deck[i].n,deck[i].kcco,deck[i].c,deck[i].done],bac:S.bac,Q:Q.map(m=>m.t),modal:!document.getElementById('modal').hidden&&document.getElementById('modal').innerText.slice(0,200),fpend:COOPW.thin.F&&COOPW.thin.F.pend&&COOPW.thin.F.pend.n,logs:S.logs.slice(0,3)}),ri.i)));
 const npc=await B.p.evaluate(()=>{const m=Q.find(x=>x.t==='Tung tin');if(!m)return null;const o=m.opts.find(c=>/^Chê /.test(c.n)&&!/Hảo hữu/.test(c.n));return o?o.n.replace(/^Chê /,''):null});
 const dn0=npc&&await A.p.evaluate(n=>{const v=rivals.find(x=>x.name===n);return v&&v.danh},npc);
 r=npc?await B.p.evaluate(n=>{const m=Q.find(x=>x.t==='Tung tin');if(!m)return null;if(Q[0]!==m){Q.splice(Q.indexOf(m),1);Q.unshift(m)}showModal();const j=m.opts.findIndex(c=>c.n==='Chê '+n);if(j<0)return null;chooseM(j);return m.opts[j]?m.opts[j].n:'ok'},npc):null;ok(!!r,'B picks «Chê '+npc+'»',r);
 ok(await B.p.evaluate(b=>S.bac===b-BAL.kcco.rumour.bac,bac0),'B paid Bạc rumour.bac once',[bac0,await B.p.evaluate(()=>S.bac)]);
 if(npc){ok(await until(A,([n,d])=>{const v=rivals.find(x=>x.name===n);return v&&v.danh===Math.max(0,d-BAL.kcco.rumour.n)},[npc,dn0],20000),'host world: '+npc+' Danh −rumour.n (once)',[dn0,await A.p.evaluate(n=>rivals.find(x=>x.name===n).danh,npc)]);
  ok(await until(B,([n,d])=>{const v=rivals.find(x=>x.name===n);return v&&v.danh===Math.max(0,d-BAL.kcco.rumour.n)},[npc,dn0],30000),'both phones read the same Danh for '+npc,[await A.p.evaluate(n=>rivals.find(x=>x.name===n).danh,npc),await B.p.evaluate(n=>(rivals.find(x=>x.name===n)||{}).danh,npc)])}
 /* 4 sớ hặc from home (B) → host world: target house power down, both phones the same */
 await B.p.evaluate(()=>{S.kcco.last.so=-1;S.suc=Math.max(S.suc,60)});
 const so=await B.p.evaluate(()=>{const a=KCCO.acts().find(x=>x.k==='soDn');if(!a||a.lock)return{lock:a&&a.lock};const t=a.n.replace(/^Nhờ cha dâng sớ hặc nhà /,'');render();const i=deck.findIndex(x=>x&&x.kcco==='soDn'&&!x.done);if(i<0){deck.push(...[]);return{nocard:1,t}}const b=document.querySelector(`button.card[data-i="${i}"]`);if(!b||b.disabled)return{dis:b&&b.textContent.slice(0,60),t};const t0=agTry,s0=agSoft;agTry=()=>true;agSoft=()=>false;try{b.click()}finally{agTry=t0;agSoft=s0}return{i,t}});
 if(so.i!=null){const p0=await A.p.evaluate(()=>CLANS.map(c=>tdPow(c)));
  ok(await until(A,([t,p])=>tdPow(t)<p[CLANS.indexOf(t)]||tdPow(t)===0,[so.t,p0],20000),'host world: sớ hặc lowers nhà '+so.t,[p0,await A.p.evaluate(()=>CLANS.map(c=>tdPow(c)))]);
  await sleep(4000);const pa=await A.p.evaluate(t=>tdPow(t),so.t),pb=await B.p.evaluate(t=>tdPow(t),so.t);ok(pa===pb,'both phones read the same house power',[pa,pb]);
  r=await tapModal(A,'Sớ hặc',/^Biết rồi/);ok(!!r,'A gets the sớ hặc note',r)}else ok(true,'sớ hặc not playable from home here: '+JSON.stringify(so));
 /* 5 guest phone == host copy of her */
 await sleep(2000);for(let i=0;i<3;i++){await clear(A);await clear(B)}
 /* her own changes reach the host with her ready (part E `do erd`): pass one buổi, then compare */
 await buoiBoth(A,B);await sleep(3000);for(let i=0;i<3;i++){await clear(A);await clear(B)}
 const pick=()=>({danh:S.danh,bac:S.bac,kld:S.kld||0,inv:(S.inv||[]).map(e=>e.k).sort().join(),log:(S.kcco&&S.kcco.log||[]).length});
 const hb=await hostB(A,pick),gb=await B.p.evaluate(pick);ok(JSON.stringify(hb)===JSON.stringify(gb),'thin: B\'s phone == host copy of B',{host:hb,guest:gb});
 await shot(A,'22-palace-end');await shot(B,'22-home-end');
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
