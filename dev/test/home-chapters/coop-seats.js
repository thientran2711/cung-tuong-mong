/* review/home-chapters (E25r2, CO-OP LAND GATE, owner OD 'Co-op: helping/harming…' 20/11 ~21:30Z): the feature's own two-seat check.
   BOTH seats take the home road (Ở nhà chờ tuyển tú) with a home-chapter origin (default A=tt host Fold, B=dtq guest iPad) in one co-op room
   against the LIVE Worker. Checks: each seat has its own home-chapter life (S.kc.c3, plan origin arc + kc_ke|kc_hon (+tm96z), roster people
   with faces); the first chapter is brought due (test hook: S.kc.ar.due = now) and after WEEKS merged weeks it has OPENED on BOTH seats
   (ar.A set or ar.i/done moved) and its dialogs were answered; weeks advance together, same date; both still at home; neither seat has a
   palace entry for the other; each seat's home life survives every merged week (same plan, same roster ids); no page errors.
   usage: python3 dev/build/assemble.py && node dev/test/home-chapters/coop-seats.js [outdir] [workerURL] [--a=tt] [--b=dtq] [--weeks=4]
   Helpers copied from dev/test/kc-roads/coop-together.js (same room flow). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('../coop-serve.js');
const OUT=path.resolve(process.argv[2]&&!process.argv[2].startsWith('--')?process.argv[2]:path.join(__dirname,'../../shots/home-chapters-coop'));fs.mkdirSync(OUT,{recursive:true});
const WURL=(process.argv[3]&&!process.argv[3].startsWith('--'))?process.argv[3]:'https://ctm-coop.victoria-tntt.workers.dev';
const arg=k=>{const a=process.argv.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:null};const OA=arg('a')||'tt',OB=arg('b')||'dtq';const WEEKS=+(arg('weeks')||4);
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
 const auto=o=>`window.__forceOrigin='${o}';window.__pickHome=1;window.kcEntryExam=(k,done)=>done(5);try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{try{document.querySelectorAll('.krskip').forEach(b=>b.click());const ro=document.getElementById('kroul');if(ro){const s=[...ro.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()}if(window.__pickHome){const b=document.querySelector('#modal:not([hidden]) [data-kcp="nha"]:not(.ksel):not([disabled])');if(b&&!(typeof S!=='undefined'&&S&&S.kc))b.click()}}catch(e){}},200)`;
 await A.ctx.addInitScript(new Function(auto(OA)));await B.ctx.addInitScript(new Function(auto(OB)));
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời hảo hữu');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code, seat a');const code=(await C(A)).code;console.log('room',code);await clear(A);
 await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world&&typeof isKc==='function'&&isKc()),c=await B.p.evaluate(()=>__co().world&&typeof isKc==='function'&&isKc());if(a&&c)break;await sleep(500)}}
 const st=o=>o.p.evaluate(()=>{const f=rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null;const k=S.kc||{},ar=k.ar||{};
  const fam=(k.fam||[]).map(m=>({id:m.id,r:m.r||m.role,fid:m.fid||m.face||''}));
  return{o:S.origin.k,kc:isKc(),c3:k.c3,plan:(ar.plan||[]).join(','),i:ar.i,A:ar.A?(ar.A.id||1):null,done:(ar.done||[]).length,due:ar.due,turn:S.turn,
   fam,noFace:fam.filter(m=>!m.fid).map(m=>m.r),d:[S.year,S.month,S.tuan],week:__co().week,fr:f&&f.name,name:S.name}});
 let a0=await st(A),b0=await st(B);
 for(const [o,s,want] of [[A,a0,OA],[B,b0,OB]]){ok(s.kc&&s.o===want,`${o.name}: at home with origin ${want}`,{o:s.o,kc:s.kc});ok(s.c3===1&&s.plan.startsWith('kc_'+want)&&/kc_(ke|hon)/.test(s.plan),`${o.name}: home-chapter life (plan ${s.plan})`);
  ok(s.fam.length>=8&&!s.noFace.length,`${o.name}: roster ${s.fam.length} people, all with faces`,s.noFace)}
 ok(a0.name!==b0.name,'two different girls',[a0.name,b0.name]);
 await clear(A);await clear(B);await shot(A,'01-home');await shot(B,'01-home');
 /* test hook: bring the first chapter due now on both seats (it would open after BAL.kc3.cal.o0 months) */
 for(const o of [A,B])await o.p.evaluate(()=>{S.kc.ar.due=S.turn||0});
 const opened={a:0,b:0};
 for(let w=0;w<WEEKS;w++){const wk=(await C(A)).week;await weekBoth(A,B,w);for(const o of [A,B])ok(await untilC(o,x=>__co().week===x+1,wk,90000),`week ${w+1}: ${o.name} advanced`);
  await clear(A);await clear(B);const a=await st(A),c=await st(B);if(a.A||a.i>a0.i||a.done>a0.done)opened.a=1;if(c.A||c.i>b0.i||c.done>b0.done)opened.b=1;console.log('wk',w+1,{a:[a.d,a.i,a.A,a.done],b:[c.d,c.i,c.A,c.done]})}
 const a1=await st(A),b1=await st(B);
 ok(opened.a,'A (host): her first home chapter opened',[a0.i,a1.i,a1.A,a1.done]);ok(opened.b,'B (guest): her first home chapter opened',[b0.i,b1.i,b1.A,b1.done]);
 ok(a1.kc&&b1.kc,'both still at home',[a1.kc,b1.kc]);ok(String(a1.d)===String(b1.d),'same date',[a1.d,b1.d]);ok(a1.week===b1.week,'same room week',[a1.week,b1.week]);
 ok(!a1.fr&&!b1.fr,'neither has a palace entry for the other while both are at home',[a1.fr,b1.fr]);
 for(const [o,s0,s1] of [[A,a0,a1],[B,b0,b1]])ok(s0.plan===s1.plan&&s0.fam.map(m=>m.id).join()===s1.fam.map(m=>m.id).join(),`${o.name}: home life kept through ${WEEKS} merged weeks (plan + roster)`);
 await shot(A,'02-after');await shot(B,'02-after');
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
