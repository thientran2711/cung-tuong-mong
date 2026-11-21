/* review/outside-r2-r1 (FAIL 2): the home road ("Ở nhà chờ tuyển tú") in a co-op room, against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/outside/coop-home.js [outdir] [workerURL]
   A (host, Fold portrait) picks "Ở nhà chờ tuyển tú" on the identity card; B (guest, iPad landscape) enters the palace.
   Checks: A is at home (isKc) in the SAME world (date, Emperor, consorts); B has NO palace entry for A while she is at home, A sees B as a
   palace person; three weeks advance for both (A's week = kcEndTurn through the co-op week path), A's home life (S.kc, family) survives
   every merged week; A enters the palace (kcEnter) → after the next merged week B sees A as a palace person and gets "Hảo hữu nhập cung";
   no page errors. Built from dev/test/coop-e2e.js (same helpers). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('../coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../shots/coop-home'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;
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
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])');if(b){b.click();return'x'}return'stuck'});
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
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 await A.ctx.addInitScript(()=>{window.__forceOrigin='tt';try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}const b=document.querySelector('#modal:not([hidden]) [data-kcp="nha"]:not(.ksel)');if(b&&!(typeof S!=='undefined'&&S&&S.kc))b.click()}catch(e){}},200)});
 await B.ctx.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}}catch(e){}},300)});
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
 for(let w=0;w<3;w++){const wk=(await C(A)).week;await weekBoth(A,B,w);
  for(const o of [A,B]){const r=await untilC(o,x=>__co().week===x+1,wk,90000);ok(r,`week ${w+1}: ${o.name} advanced`,r?undefined:await o.p.evaluate(()=>({co:__co(),sent:COOPW.sent,pend:COOPW.pend,bend:COOPW.bend,buoi:S.buoi,Q:Q.map(m=>(m.pid||'')+':'+String(m.t||'').slice(0,30)),tr:COOPW.tr.slice(-20)})))}
  await clear(A);await clear(B);const a=await st(A),c=await st(B);
  if(a.end){ok(true,'A\'s home life ended in week '+(w+1)+': '+a.end);break}
  ok(a.kc&&a.fam>0,`week ${w+1}: A still at home with her family`,a);ok(String(a.d)===String(c.d),`week ${w+1}: same date`,[a.d,c.d]);ok(!c.fr,`week ${w+1}: B still has no entry for A`,c.fr);ok(a.fr===c.name,`week ${w+1}: A sees B`,[a.fr,c.name])}
 await shot(A,'07-home-after3');
 /* 4 A passes the tuyển tú (entry forced) → next merged week B sees her */
 const ent=await A.p.evaluate(()=>{if(!isKc())return{skip:S.kc&&S.kc.end};for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}if(!isKc())return{skip:'ended'};S.kc.soOk=1;S.kc.tt={early:false,raw:5};kcEnter(1);return{kc:isKc(),rank:S.rank,name:S.name}});
 if(!ent.skip){ok(!ent.kc&&ent.rank===1,'A entered the palace',ent);await clear(A);
  await B.p.evaluate(()=>{window.__notes=[];const pm=pushModal;pushModal=function(m){try{__notes.push(m&&m.t)}catch(e){}return pm.apply(this,arguments)}});
  const wk=(await C(A)).week;await weekBoth(A,B,9);for(const o of [A,B])ok(await untilC(o,x=>__co().week===x+1,wk,90000),'entry week: '+o.name+' advanced');
  let seen=false,note=false;const t0=Date.now();while(Date.now()-t0<30000){note=note||await B.p.evaluate(()=>(window.__notes||[]).includes('Hảo hữu nhập cung'));
   const c=await st(B);if(c.fr===ent.name){seen=true;break}await clear(A);await clear(B);await sleep(500)}
  ok(seen,'B sees A in the palace after her entry');ok(note,'B gets "Hảo hữu nhập cung"');const a=await st(A);ok(!a.kc&&a.road===''&&a.ids.split(',').length===8,'A has the palace tabs (road palace, 8-tab bar)',[a.road,a.ids,a.tabs])}
 await clear(A);await clear(B);await shot(A,'08-entered');await shot(B,'08-friend-in');
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
