/* review/kc-roads-cn-nc round 3: owner rule 16/11 08:45Z (OD:L1288, replaces 07:25Z): in co-op both players get "Vào cung ngay / Chờ" at
   the SAME time point (their identity cards at the room start), each chooses FREELY, time runs the same, one may live at home while the
   other lives in the palace; NO forced joint entry. Against the LIVE Worker (as dev/test/outside/coop-home.js).
   usage: python3 dev/build/assemble.py && node dev/test/kc-roads/coop-together.js [outdir] [workerURL] [--a=cnv] [--b=nc]
   Checks: A (host) takes the home road; B's card offers BOTH roads (nothing closed by A's choice) and B takes "Vào cung ngay" (through the
   selection card); same world, same date for weeks; A at home, B in the palace, B has no entry for A; A's home end month = the tiểu thư
   tuyển tú month (one calendar point for every home road); A enters alone (no waiting for anyone) → B then sees A; no page errors. (old header follows) review/outside-r2-r1 (FAIL 2): the home road in a co-op room.
   usage: python3 dev/build/assemble.py && node dev/test/outside/coop-home.js [outdir] [workerURL]
   A (host, Fold portrait) picks "Ở nhà chờ tuyển tú" on the identity card; B (guest, iPad landscape) enters the palace.
   Checks: A is at home (isKc) in the SAME world (date, Emperor, consorts); B has NO palace entry for A while she is at home, A sees B as a
   palace person; three weeks advance for both (A's week = kcEndTurn through the co-op week path), A's home life (S.kc, family) survives
   every merged week; A enters the palace (kcEnter) → after the next merged week B sees A as a palace person and gets "Hảo hữu nhập cung";
   no page errors. Built from dev/test/coop-e2e.js (same helpers). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('../coop-serve.js');
const OUT=path.resolve(process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2]:path.join(__dirname,'../../shots/coop-together'));fs.mkdirSync(OUT,{recursive:true});
const WURL=(process.argv[3]&&!process.argv[3].startsWith('--'))?process.argv[3]:'https://ctm-coop.victoria-tntt.workers.dev';
const arg=k=>{const a=process.argv.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:null};const OA=arg('a')||'cnv',OB=arg('b')||'nc';
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{/* review/entry-exam-r1: the entry exam frame (jentry, kg82): not playing = "Để tài nghệ quyết định", then the result's ✕ (KIT kitOvSync
      turns #kg82ok into the header ✕ .kit-x[data-kitx=ov]) */
   {const g=document.getElementById('kg82skip');if(g&&g.getClientRects().length&&!g.disabled){g.click();return'x'}
    const x=document.querySelector('#kg82 .kit-x[data-kitx=ov]');if(x&&x.getClientRects().length&&document.getElementById('kg82ok')){x.click();return'x'}}
   const c=__co();if(c.frozen||c.waiting)return'coop';
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
 const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 const auto=o=>`window.__forceOrigin='${o}';window.kcEntryExam=(k,done)=>done(5);/* the selection round = the exam hook (Foreman D's mini-game later) */try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}if(window.__pickHome){const b=document.querySelector('#modal:not([hidden]) [data-kcp="nha"]:not(.ksel):not([disabled])');if(b&&!(typeof S!=='undefined'&&S&&S.kc))b.click()}}catch(e){}},200)`;
 await A.ctx.addInitScript(new Function('window.__pickHome=1;'+auto(OA)));
 /* B: records her card, then takes "Vào cung ngay" herself */
 await B.ctx.addInitScript(new Function(auto(OB)+';window.__cardSeen=null;setInterval(()=>{try{if(!window.__cardSeen&&document.querySelector("#modal:not([hidden]) [data-kcp]")){window.__cardSeen=[...document.querySelectorAll("#modal [data-kcp]")].map(b=>({k:b.dataset.kcp,dis:b.disabled,sel:b.classList.contains("ksel"),t:b.innerText.slice(0,160)}));const c=document.querySelector("#modal [data-kcp=cung]");if(c&&!c.classList.contains("ksel"))c.click()}}catch(e){}},150)'));
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời hảo hữu');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code, seat a');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 /* B's identity card: wait for it, look, accept it as shown */
 {const t0=Date.now();let card=null;while(Date.now()-t0<90000){await clear(A);card=await B.p.evaluate(()=>window.__cardSeen);if(card)break;await sleep(400)}
  ok(card&&card.length===2&&card.every(x=>!x.dis),'B card: both roads open (A\'s choice closes nothing)',card);await shot(B,'01-card-free')}
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world);if(a&&c)break;await sleep(500)}}
 const st=async o=>o.p.evaluate(()=>{const f=rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null;return{o:S.origin.k,sel:S.selx?S.selx.tier:null,kd:S.kc&&S.kc.kd,kc:typeof isKc==='function'&&isKc(),inPal:!!(S.kc&&S.kc.inPal),gate:!!(S.kc&&S.kc.gate),wIn:S.kc&&S.kc.wIn,due:S.kc&&S.kc.due,end:S.kc&&S.kc.end,name:S.name,d:[S.year,S.month,S.tuan],turn:S.turn,week:__co().week,fr:f&&f.name,srv:!!(S.srv&&!S.srv.risen),rank:S.rank}});
 {for(let i=0;i<20;i++){await clear(B);const q=await B.p.evaluate(()=>Q.length&&Q[0].pid==='kc2Sel');if(!q)break;await B.p.evaluate(()=>chooseM(Q[0].opts.length-1));await sleep(300)}
  const a=await st(A),c=await st(B);ok(a.kc,'A at home',a);ok(!c.kc&&!c.inPal&&c.o===OB,'B in the palace (Vào cung ngay)',c);ok(c.sel!=null,'B went through the selection card',c.sel)}
 await clear(A);await clear(B);await shot(A,'02-home');await shot(B,'02-home');
 for(let w=0;w<2;w++){const wk=(await C(A)).week;await weekBoth(A,B,w);for(const o of [A,B])ok(await untilC(o,x=>__co().week===x+1,wk,90000),`week ${w+1}: ${o.name} advanced`);await clear(A);await clear(B)}
 {const a=await st(A),c=await st(B);ok(a.kc&&!c.kc,'after 2 weeks: A still at home, B in the palace',[a.kc,c.kc]);ok(String(a.d)===String(c.d),'same date',[a.d,c.d]);ok(!c.fr,'B has no entry for A while A is at home',c.fr);
  const due=await A.p.evaluate(()=>[S.kc.due,(S.turn||0)+(KC.ty-S.year)*12+(KC.tm-1-S.month)]);if(await A.p.evaluate(()=>!!S.kc.kd))ok(due[0]===due[1],'A home end month = the tiểu thư tuyển tú month',due)}
 /* A passes her selection alone: she enters at once (no gate, no waiting for B) */
 const r=await A.p.evaluate(()=>{for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(m.opts.length-1);else closeModal()}if(S.kc.kd){S.kc.ex={art:'',play:1,done:1};kc2Enter(6)}else{S.kc.soOk=1;S.kc.tt={early:false,raw:5,done:1};kcEnter(1)}return{kc:isKc(),inPal:!!S.kc.inPal,gate:'gate' in S.kc}});
 ok(!r.kc&&r.inPal&&!r.gate,'A enters alone, at once',r);await clear(A);
 {const wk=(await C(A)).week;await weekBoth(A,B,7);for(const o of [A,B])await untilC(o,x=>__co().week===x+1,wk,90000);await clear(A);await clear(B);
  const a=await st(A),c=await st(B);ok(c.fr===a.name,'B sees A in the palace after her entry',[a.name,c.fr])}
 await shot(A,'04-in');await shot(B,'04-in');
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
