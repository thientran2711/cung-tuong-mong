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
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../shots/coop-kcco'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);if(process.env.THIN&&name==='fold')await ctx.addInitScript(w=>{try{localStorage.setItem('ctm-thin',w)}catch(e){}},process.env.THIN);/* THIN=<n>: the host asks for that thin room level (review r1) */
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

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 await A.ctx.addInitScript(()=>{window.__forceOrigin='tt';try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}const b=document.querySelector('#modal:not([hidden]) [data-kcp="nha"]:not(.ksel)');if(b&&!(typeof S!=='undefined'&&S&&S.kc))b.click()}catch(e){}},200)});
 await B.ctx.addInitScript(()=>{window.__forceOrigin='dtq';try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}}catch(e){}},300)});
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
 ok(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world),'both players are in the shared world',await Promise.all([A,B].map(o=>o.p.evaluate(()=>({S:typeof S!=='undefined'&&!!S,kc:typeof S!=='undefined'&&S&&!!S.kc,pick:typeof S!=='undefined'&&S&&S.kcPick,base:!!(window.COOPW&&COOPW.base),inLife:COOPW.inLife,hold:COOPW.holdMe,modal:(document.getElementById('modal')||{}).hidden===false?document.getElementById('modal').innerText.slice(0,200):'',btns:[...document.querySelectorAll('#modal button')].map(b=>(b.disabled?'D:':'')+(b.offsetParent?'':'H:')+b.textContent.trim().slice(0,30)),kroul:!!document.getElementById('kroul'),title:!(document.getElementById('title')||{}).hidden,tr:COOPW.tr.slice(-10),errs:0})).catch(e=>e.message))));await clear(A);await clear(B);
 const same=async tag=>{const a=await A.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join()}));
   const c=await B.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join()}));
   ok(a.era===c.era&&a.R===c.R,tag+': same Emperor and same consorts',[a.era,c.era]);ok(String(a.d)===String(c.d),tag+': same date',[a.d,c.d]);
   ok(a.fr===c.me&&c.fr===a.me,tag+': each sees the other as a person',[a.me,a.fr,c.me,c.fr]);return[a,c]};
 /* 3 A at home, B in the palace */
 const st=async o=>o.p.evaluate(()=>{const f=rivals.find(v=>v.coop)||null;return{kc:typeof isKc==='function'&&isKc(),end:S.kc&&S.kc.end,fam:S.kc?S.kc.fam.length:0,name:S.name,d:[S.year,S.month,S.tuan],era:S.emp.era,fr:f&&f.name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join(),tabs:[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim()).join('|'),road:typeof road8==='function'?road8():'?',ids:[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab).join(',')}});
 {const a=await st(A),c=await st(B);ok(a.kc&&a.fam>0,'A is at home on the tiểu thư road',a);ok(!c.kc,'B is in the palace');
  ok(a.era===c.era&&a.R===c.R,'same Emperor and consorts');ok(String(a.d)===String(c.d),'same date',[a.d,c.d]);
  ok(!c.fr,'B has no palace entry for A while A is at home',c.fr);ok(a.fr===c.name,'A sees B as a palace person',[a.fr,c.name,await A.p.evaluate(()=>({P:Object.keys((COOPW.base&&COOPW.base.P)||{}),seat:COOPW.seat,inLife:COOPW.inLife,rc:rivals.filter(v=>v.coop).length,fh:COOPW.friendHome(COOPW.base.P.b),bkc:JSON.stringify(COOPW.base.P.b.S.kc||null).slice(0,80),bd:[COOPW.base.P.b.dead,COOPW.base.P.b.S.dead],brank:COOPW.base.P.b.rank,qOn:qOn(),n:rivals.length}))]);
  /* since maid-8tabs (06807c14f) every road shares ONE 8-tab bar with road-specific labels: test the road (state) and the bar's kit ids, never label words */
  ok(a.road==='kc'&&a.ids.split(',').length===8&&a.ids.split(',')[0]==='act','A has the home tabs (road kc, 8-tab bar)',[a.road,a.ids,a.tabs]);
  const n=await B.p.evaluate(()=>[...document.querySelectorAll('#modal *')].some(e=>/ở nhà cha chờ kỳ tuyển tú/.test(e.textContent||''))||COOPW.fWasHome===true);ok(n,'B is told the friend is at home');}
 await clear(A);await clear(B);await shot(A,'05-home');await shot(B,'05-palace');

 /* ---- OR13 co-op acts ---- */
 console.log('thin level',await A.p.evaluate(()=>COOPW.thin&&COOPW.thin.lvl),await B.p.evaluate(()=>COOPW.thin&&COOPW.thin.lvl));
 const on=await Promise.all([A,B].map(o=>o.p.evaluate(()=>kccoOn())));ok(on[0]&&on[1],'kcco on for both (one home, one palace)',on);
 const pick=async(o,title,re,force)=>{const t0=Date.now();while(Date.now()-t0<25000){const r=await o.p.evaluate(([t,src,force])=>{const i=Q.findIndex(m=>m.t===t);if(i<0)return null;
    if(i>0){const m=Q.splice(i,1)[0];Q.unshift(m)}showModal();const m=Q[0];const j=m.opts.findIndex(c=>new RegExp(src).test(c.n));if(j<0)return{bad:m.opts.map(c=>c.n)};
    const r0=roll;if(force)roll=()=>true;try{chooseM(j)}finally{roll=r0}return{ok:m.opts[j].n}},[title,re.source,!!force]);if(r)return r;await sleep(300)}return null};
 const inv=(o,k)=>o.p.evaluate(k=>(S.inv||[]).filter(e=>e.k===k).length,k);
 const flog=o=>o.p.evaluate(()=>(S.kcco&&S.kcco.log||[]).map(x=>x.t));
 /* shots of the two act panels */
 await clear(A);await A.p.evaluate(()=>{tab='kid';render()});await A.p.waitForTimeout(500);await A.p.evaluate(()=>{const h=[...document.querySelectorAll('*')].find(e=>e.childElementCount===0&&/^Viết thư cho /.test((e.textContent||'').trim()));if(h)h.scrollIntoView({block:'start'})});await shot(A,'10-home-thu-tu');
 const aCards=await A.p.evaluate(()=>deck.filter(a=>a.kcco).map(a=>a.n));ok(aCards.length>=4,"A's «Thư từ» has the co-op cards",aCards);
 await clear(B);await B.p.evaluate(()=>{try{S.mg=null;tab='inv';render();const b=document.querySelector('[data-kinvsub="hh"]');if(b)b.click();setTimeout(()=>{const x=document.querySelector('[data-kcco]');if(x)x.scrollIntoView({block:'center'})},200)}catch(e){}});await B.p.waitForTimeout(600);await B.p.evaluate(()=>{const t=[...document.querySelectorAll('*')].find(e=>e.childElementCount===0&&/^Tuyển chọn:/.test((e.textContent||'').trim()));let e=t;while(e&&e!==document.body&&getComputedStyle(e).position!=='fixed')e=e.parentElement;if(e&&e!==document.body){e.dataset.kccoHid=e.style.visibility||'1';e.style.visibility='hidden'}});
 const bPane=await B.p.evaluate(()=>!!document.querySelector('[data-kcco="letter"]'));ok(bPane,"B's Tư trang › «Hảo hữu ở nhà» has the acts");await shot(B,'10-palace-hao-huu');await B.p.evaluate(()=>{document.querySelectorAll('[data-kcco-hid]').forEach(e=>{e.style.visibility='';delete e.dataset.kccoHid})});
 ok(await B.p.evaluate(()=>{const a=KCCO.acts().find(x=>x.k==='soUp');return a&&!a.lock}),'B can petition for A\'s house (friend clan read from the room blob)');
 ok(await A.p.evaluate(()=>{const a=KCCO.acts().find(x=>x.k==='soUp');return a&&!a.lock}),'A can petition for B\'s house');
 /* A -> B letter */
 const nA0=await inv(B,'thunha');await A.p.evaluate(()=>{log(kccoDo('letter'))});
 let r=await pick(B,'Thư hảo hữu',/^Đọc thư, cất/);ok(r&&r.ok,'B gets A\'s letter card and keeps it',r);
 ok(await until(B,n=>(S.inv||[]).filter(e=>e.k==='thunha').length===n+1,nA0,20000),'B holds the letter item');
 ok(await until(A,()=>(S.kcco.out||[]).some(m=>m.kind==='letter'&&m.ans==='keep'),null,20000),'A gets B\'s answer (letter kept)');
 /* A -> B gift taken */
 await A.p.evaluate(()=>{S.inv.push({k:'tuithom',from:'test'});const ix=S.inv.length-1;log(kccoDo('gift',{ix}));S.kcco.out[0].due=S.turn});
 const tA=await inv(A,'tuithom'),tB=await inv(B,'tuithom');
 r=await pick(B,'Quà hảo hữu',/^Nhận$/);ok(r&&r.ok,'B gets the gift card on the visiting day and takes it',r);
 ok(await until(B,n=>(S.inv||[]).filter(e=>e.k==='tuithom').length===n+1,tB,20000),'the item is in B\'s chest');
 ok(await until(B,()=>(S.il&&S.il.log||[]).some(l=>l[2]==='tuithom'&&String(l[3]).startsWith('coop:')),null,20000),'B\'s item ledger has the line from A');
 ok(await A.p.evaluate(()=>(S.il&&S.il.log||[]).some(l=>l[2]==='tuithom'&&String(l[4]).startsWith('coop:'))),'A\'s item ledger has the line to B');
 /* A -> B gift returned */
 await A.p.evaluate(()=>{S.kcco.last.gift=-1;S.inv.push({k:'luahang',from:'test'});const ix=S.inv.length-1;kccoDo('gift',{ix});S.kcco.out[0].due=S.turn});const lA=await inv(A,'luahang');
 r=await pick(B,'Quà hảo hữu',/^Trả lại quà/);ok(r&&r.ok,'B returns the second gift',r);
 ok(await until(A,n=>(S.inv||[]).filter(e=>e.k==='luahang').length===n+1,lA,20000),'the returned item is back in A\'s chest');
 /* A -> B sớ tiến cử (B's house = Đại tướng quân), accepted; world on the host (A) */
 const bc=await B.p.evaluate(()=>(S.origin||{}).k);const BH={tt:'Tể tướng',dtq:'Đại tướng quân',thd:'Hàn lâm',td:'Lễ bộ'}[bc]||'Đại tướng quân';const p0=await A.p.evaluate(h=>tdPow(h),BH);
 await A.p.evaluate(()=>{log(kccoDo('so',{dir:'up'}))});r=await pick(B,'Sớ tiến cử',/^Đội ơn/);ok(r&&r.ok,'B accepts the sớ tiến cử ('+bc+')',r);
 ok(await until(A,([p,h])=>tdPow(h)===p+BAL.kcco.so.pow,[p0,BH],20000),'host world: B\'s house power +so.pow ('+BH+')',[p0,await A.p.evaluate(h=>tdPow(h),BH)]);
 if(process.env.THIN)ok(await until(B,([p,h])=>tdPow(h)===p+BAL.kcco.so.pow,[p0,BH],30000),'thin: both phones read the same house power at once (level 0 merges the world at the week end)',[await A.p.evaluate(h=>tdPow(h),BH),await B.p.evaluate(h=>tdPow(h),BH)]);
 /* A -> sớ hặc: target house power down (host), B's note */
 const pw=()=>A.p.evaluate(()=>CLANS.map(c=>tdPow(c)));const tg=await A.p.evaluate(()=>KCCO.acts().find(x=>x.k==='soDn')&&!KCCO.acts().find(x=>x.k==='soDn').lock);
 if(tg){const w0=await pw();await A.p.evaluate(()=>{log(kccoDo('so',{dir:'dn'}))});ok(await until(A,w0=>CLANS.some((c,i)=>tdPow(c)===Math.max(0,w0[i]-BAL.kcco.so.pow)),w0,20000),'host world: sớ hặc house power down',[w0,await pw()]);
  r=await pick(B,'Sớ hặc',/^Biết rồi/);ok(r&&r.ok,'B gets the sớ hặc note',r)}else ok(true,'sớ hặc: no other house at court (skipped)');
 /* A -> B bad rumour, B «Mặc kệ» */
 const d0=await B.p.evaluate(()=>S.danh);await A.p.evaluate(()=>{log(kccoDo('rumour',{dir:-1}))});r=await pick(B,'Lời đồn',/^Mặc kệ/);ok(r&&r.ok,'B gets the bad rumour card',r);
 ok(await until(B,d=>S.danh===Math.max(0,d-BAL.kcco.rumour.n),d0,20000),'B Danh down by rumour.n',[d0,await B.p.evaluate(()=>S.danh)]);
 /* B -> A letter + gift + good rumour + sớ for A's house */
 const lt=await inv(A,'thunha');await B.p.evaluate(()=>{log(kccoDo('letter'))});r=await pick(A,'Thư hảo hữu',/^Đọc thư, cất/);ok(r&&r.ok,'A gets B\'s letter',r);ok(await inv(A,'thunha')===lt+1,'A holds B\'s letter');
 ok(await until(B,()=>(S.kcco.out||[]).some(m=>m.kind==='letter'&&m.ans==='keep')||[...document.querySelectorAll('#log *,.klog *')].some(e=>/đã nhận thư của ngươi/.test(e.textContent||''))||JSON.stringify(S.logs||[]).includes('đã nhận thư của ngươi'),null,20000),'B gets A\'s answer (letter kept: out status, or her log line at thin)');
 await B.p.evaluate(()=>{S.inv.push({k:'huongtram',from:'test'});kccoDo('gift',{ix:S.inv.length-1});S.kcco.out[0].due=S.turn});const hA=await inv(A,'huongtram');
 r=await pick(A,'Quà hảo hữu',/^Nhận$/);ok(r&&r.ok,'A takes B\'s gift',r);ok(await inv(A,'huongtram')===hA+1,'B\'s item is in A\'s chest');
 const k0=await A.p.evaluate(()=>S.kld||0);await B.p.evaluate(()=>{log(kccoDo('rumour',{dir:1}))});r=await pick(A,'Lời đồn',/^Biết rồi/);ok(r&&r.ok,'A gets the good rumour',r);
 ok(await until(A,k=>(S.kld||0)===Math.max(0,k-BAL.kcco.rumour.n),k0,20000),'A Lời đồn down by rumour.n');
 const q0=await A.p.evaluate(()=>tdPow('Tể tướng'));await B.p.evaluate(()=>{log(kccoDo('so',{dir:'up'}))});r=await pick(A,'Sớ tiến cử',/^Đội ơn/);ok(r&&r.ok,'A accepts B\'s sớ for her house',r);
 ok(await until(A,p=>tdPow('Tể tướng')===p+BAL.kcco.so.pow,q0,25000),'guest ans -> host world: A\'s house power +so.pow',[q0,await A.p.evaluate(()=>tdPow('Tể tướng'))]);
 /* review r1: B -> A gift RETURNED (law 6c both ways: the item comes back to B once, never doubled, never lost) */
 const bb0=await inv(B,'khantay');await B.p.evaluate(()=>{S.kcco.last.gift=-1;S.inv.push({k:'khantay',from:'test'});kccoDo('gift',{ix:S.inv.length-1});S.kcco.out[0].due=S.turn});
 r=await pick(A,'Quà hảo hữu',/^Trả lại quà/);ok(r&&r.ok,'A returns B\'s gift',r);
 ok(await until(B,n=>(S.inv||[]).filter(e=>e.k==='khantay').length===n+1,bb0,20000),'the returned item is back in B\'s chest (once)',[bb0,await inv(B,'khantay')]);
 await shot(A,'11-home-after');await shot(B,'11-palace-after');
 /* a merged week keeps everything */
 const ia=await inv(A,'huongtram'),ib=await inv(B,'tuithom');
 {const wk=(await C(A)).week;await weekBoth(A,B,1);for(const o of [A,B])ok(await untilC(o,x=>__co().week===x+1,wk,90000),'merged week: '+o.name+' advanced')}
 await clear(A);await clear(B);
 ok(await inv(A,'huongtram')===ia&&await inv(B,'tuithom')===ib,'moved items survive the merged week',[ia,ib]);
 if(process.env.THIN){/* review r1: the guest's phone and the host's stored copy of her read the same numbers */
  await sleep(3000);const hb=await A.p.evaluate(()=>{const TH=COOPW.thin;let o=null;TH.withSeat('b',()=>{o={danh:S.danh,inv:(S.inv||[]).map(e=>e.k).sort().join(),rl:(S.rl||{})[901]||0,log:(S.kcco&&S.kcco.log||[]).length}});return o});
  const gb=await B.p.evaluate(()=>({danh:S.danh,inv:(S.inv||[]).map(e=>e.k).sort().join(),rl:(S.rl||{})[901]||0,log:(S.kcco&&S.kcco.log||[]).length}));
  ok(JSON.stringify(hb)===JSON.stringify(gb),'thin: guest phone == host copy of her (Danh, chest, tình hảo hữu, log)',{host:hb,guest:gb});
  ok(await inv(B,'khantay')===bb0+1,'thin: B\'s returned gift still once after the merged week',[bb0,await inv(B,'khantay')])}
 const la=await flog(A),lb=await flog(B);ok(la.length>=4&&lb.length>=4,'both kcco logs survive the merged week',[la.length,lb.length]);
 /* join: A passes the tuyển tú; B (made a chủ vị for the test) asks for her as a side-hall resident */
 await B.p.evaluate(()=>{S.rank=Math.max(S.rank,PAL_HEAD)});if(process.env.THIN)await A.p.evaluate(()=>{COOPW.thin.withSeat('b',()=>{S.rank=Math.max(S.rank,PAL_HEAD)})});
 const ent=await A.p.evaluate(()=>{if(!isKc())return{skip:S.kc&&S.kc.end};for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}if(!isKc())return{skip:'ended'};S.kc.soOk=1;S.kc.tt={early:false,raw:5};kcEnter(1);return{kc:isKc(),rank:S.rank}});
 if(!ent.skip){ok(!ent.kc,'A entered the palace',ent);await shot(B,'12-join-card');
  /* at thin level >= 4 her card's choice runs on the host (part D): the forced roll must be the host's too */
  if(process.env.THIN)await A.p.evaluate(()=>{window.__r0=roll;roll=()=>true});
  r=await pick(B,'Đón hảo hữu',/^Xin ban nàng/,true);if(process.env.THIN){await sleep(3000);await A.p.evaluate(()=>{roll=window.__r0})}ok(r&&r.ok,'B asks for A as a side-hall resident',r);
  ok(await until(A,()=>S.resHead===902,null,20000),'A lives in B\'s palace (resHead = B)',await A.p.evaluate(()=>S.resHead))}
 else ok(true,'join skipped: '+ent.skip);
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
