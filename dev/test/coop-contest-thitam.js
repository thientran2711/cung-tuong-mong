/* coop-contest-thitam (FOREMAN D job D3, owner OD 26/11 ~01:25Z (1), co-op = two-way + both seats): first place in a contest ⇒ thị tẩm that night
   in a co-op room. 2 browsers, LIVE Worker. A = host 755x1000@2 (Fold), B = guest 1180x820@2 (iPad).
   usage: python3 dev/build/assemble.py && node dev/test/coop-contest-thitam.js [outdir] [workerURL]
   Cases (each = one day; the contest finish is the real j71 cFin7 of that seat, the night = the jnf record of that day, lib/coop-real nightRec):
     C1 the HOST takes first place (host's contest)                 → host holds the night, both seats agree, host +1 night
     C2 the FRIEND's entry takes first place in the host's contest → guest holds the night, guest gets her card, guest +1 night
     C3 the GUEST takes first place in a contest on HER seat        → relayed (act k ctm-ctn) → guest holds the night, guest +1 night
     C4 an NPC takes first place (host's contest)                   → that NPC holds the night, neither seat
   Harness = coop-b2b5.js's own helpers (lines copied unchanged: mk / clear / press / week / join). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-contest-thitam'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);if(process.env.COOP_TRD)await ctx.addInitScript(()=>{window.__TRD=1});
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}


const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,tn:S.tn||null,tonight:S.tonight==='me'?'me':S.tonight&&S.tonight.id!=null?S.tonight.id:null,dead:!!S.dead,emp:S.emp&&[S.emp.era,S.emp.age,!!S.emp.dead].join('/'),rank:S.rank,Q:Q.map(q=>q.t).slice(0,4),cy:{hold:COOPW.cyHold,to:COOPW.cyTo,cyb:S.cyb||null},nf:typeof nfOn==="function"?[nfOn(),nfParked(),nfRoomOff()]:null,nfX:S.nfX||null,tr:window.__TRD?(COOPW.tr||[]).slice(-30):undefined}));
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<10;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',[await D(A),await D(B)]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,2]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 {const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}
  ok(await inGame(A)&&await inGame(B),'both in the game')}
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(400)}
 for(const o of [A,B])await setTm(o,{buoiMs:600000});
 for(const [o,rk] of [[A,3],[B,3]])await o.p.evaluate(rk=>{if(S.srv)S.srv.risen=1;S.rank=rk;S.sung=Math.max(S.sung||0,40);render()},rk);
 ok(await until(A,()=>!!COOPW.friend(),null,30000)&&await until(B,()=>!!COOPW.friend(),null,30000),'each has the other as a consort entry');
 await REALL.realize(A,B,()=>week(A,B,'setup'),ok);


 /* a name out of her Kỳ nguyệt tuần (coop-b2b5 B2.1, reviewer fix-r1): in her monthly days no one serves (nightCh 0), the rule would rightly refuse */
 {const n=await B.p.evaluate(()=>{if(typeof cyBase!=='function')return null;const t=S.tuan||0,bad=[t,(t+1)%3],base=S.name;for(let i=0;i<400;i++){S.name=base+(i?' '+i:'');if(!bad.includes(cyBase(S).t))break}render();return S.name});
  if(n)await A.p.evaluate(n=>{const f=COOPW.friend();if(f)f.name=n},n)}
 /* the room's first merged week aligns the host's date with the room (wk() can jump several tuần): one plain week first, so every case's contest day = its played tối */
 await week(A,B,'align');
 const NF=await REALL.nfBoth(A,B);console.log('night path:',NF?'jnf':'parked (live path)');
 /* the seat's own contest finish: j71 cFin7 with the chosen winner first (the result rows of a played contest), then the day ends on both seats */
 const run=(o,who)=>o.p.evaluate(who=>{S.cyb=Object.assign(S.cyb||{},{lie:wk()});S.preg=0;const f=COOPW.friend();const N=liveRivals(true).filter(v=>v&&!v.coop&&v.alive&&!v.out&&!v.preg&&!v.confined&&nightCh(v)>0);
   const W=who==='me'?S:who==='f'?f:N[0];const E=[W].concat([S,f,N[1]||N[0]].filter(x=>x&&x!==W));const L=E.map((p,i)=>({p,kind:'dan',t:9-i,pr:0,lk:0,s:90-i*10}));
   const n0=S.nights||0;cFin7('trungthu','dan',L,true);return{d:wk(),ntk:S.ntk?S.ntk.who:null,fid:f&&f.id,npc:who==='npc'?W.id:null,n0}},who);
 const ST=o=>o.p.evaluate(()=>({ntk:S.ntk&&S.ntk.w===wk()?S.ntk.who:null,ctn:S.ctn||null,card:Q.some(m=>m&&m.t==='Kính sự phòng báo tin'),nights:S.nights||0,d:wk()}));
 /* set-up only: the intended winner can serve tonight on the HOST (not in her monthly days / ill: nightCh 0 makes the rule refuse, rightly);
    'me' = the host, 'f' = the friend's entry, 'npc' = the first NPC that can serve (the same one run() picks) */
 const steer=(who)=>A.p.evaluate(who=>{window.__nc0=window.__nc0||nightCh;const n0=window.__nc0;const f=COOPW.friend();
   const N=liveRivals(true).filter(v=>v&&!v.coop&&v.alive&&!v.out&&!v.preg&&!v.confined&&n0(v)>0);const W=who==='me'?S:who==='f'?f:N[0];
   nightCh=function(p){p=p||S;const c=n0.apply(this,arguments);return p===W?Math.max(1,c):c};return W&&(W===S?'me':W.id)},who);
 const unsteer=()=>A.p.evaluate(()=>{if(window.__nc0){nightCh=window.__nc0;window.__nc0=null}});
 const NX=o=>o.p.evaluate(()=>{const x=S.nfX||{};const f=COOPW.friend();const t=x.t==="me"?(COOP.seat==='a'?'host':'guest'):(f&&x.t===f.id)?(COOP.seat==='a'?'guest':'host'):x.t;return{d:x.d,t}});
 async function day(tag,seat,who,want){const X=seat==='a'?A:B;const n0={a:(await ST(A)).nights,b:(await ST(B)).nights};
  await steer(seat==='b'?'f':who);
  /* the guest seat reads the same «not in her monthly days today» as the host's steer (her own jcycle tray: cyb.lie = this tuần) */
  if(want==='guest')await B.p.evaluate(()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk()});S.preg=0});
  const r=await run(X,who);await sleep(4000);const sa=await ST(A),sb=await ST(B);
  ok(want==='host'?sa.ntk==='me':want==='guest'?sa.ntk===r.fid||sa.ntk===(await A.p.evaluate(()=>COOPW.friend().id)):sa.ntk===r.npc,tag+': the host keeps tonight for the winner ('+want+')',{r,sa:sa.ntk});
  if(want==='guest')ok(sb.ntk==='me'&&sb.card,tag+': the guest is told (her Kính sự phòng card, her night kept)',sb);
  if(want==='host')ok(sa.card,tag+': the host gets her Kính sự phòng card',sa.card);
  const DB=o=>o.p.evaluate(()=>({wk:wk(),cw:COOP.state.week,buoi:S.buoi,ntk:S.ntk||null,ctn:S.ctn||null,nfX:S.nfX||null,nW:S.nightWhy||null,nights:S.nights||0,nfN:S.nfN,nfF:S.nfF,tonight:S.tonight==='me'?'me':S.tonight&&S.tonight.id,
   logs:(S.logs||[]).slice(0,40).map(x=>String(x).replace(/<[^>]+>/g,'')).filter(x=>/thị tẩm|đứng đầu|Kính sự|lật|thẻ bài/.test(x)).slice(0,6).map(x=>x.slice(0,140))}));
  if(process.env.DBG)console.log('PRE '+tag,JSON.stringify([await DB(A),await DB(B)]));
  await week(A,B,tag);
  if(process.env.DBG)console.log('POST '+tag,JSON.stringify([await DB(A),await DB(B)]));const rec=NF?await REALL.nightRec(A,B,r.d):null;const ea=(await ST(A)).nights,eb=(await ST(B)).nights;
  await unsteer();const xa=await NX(A),xb=await NX(B);
  if(NF)ok(xa.d===r.d&&xb.d===r.d&&xa.t===(want==='npc'?r.npc:want)&&xb.t===(want==='npc'?r.npc:want),tag+': that day\'s played tối is held by '+want+' on both seats (jnf nfX), no flip choice',{xa,xb,rec});
  ok(want==='host'?ea-n0.a===1&&eb-n0.b===0:want==='guest'?eb-n0.b===1&&ea-n0.a===0:ea-n0.a===0&&eb-n0.b===0,tag+': exactly the winner\'s seat gets +1 night',{host:ea-n0.a,guest:eb-n0.b});
  await shot(X,'ctn-'+tag)}
 if(process.env.C4FIRST)await day('C4','a','npc','npc');
 await day('C1','a','me','host');
 if(!process.env.ONLY1){await day('C2','a','f','guest');if(process.env.STOP2){console.log('DUMPB',JSON.stringify(await B.p.evaluate(()=>({Q:Q.map(q=>q.pid||q.t),modal:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent,ntk:S.ntk,tonight:S.tonight,nfN:S.nfN,nfX:S.nfX,nfFin:S.nfFin,nfW:S.nfW,wk:wk(),buoi:S.buoi,kmov:[...document.querySelectorAll('.kmov,#kneov')].map(x=>x.id||x.className.slice(0,40)),logs:(S.logs||[]).slice(0,12).map(x=>String(x).replace(/<[^>]+>/g,'').slice(0,120))}))));process.exit(0)}
 await day('C3','b','me','guest');
 if(!process.env.C4FIRST)await day('C4','a','npc','npc')}
 const fails=res.filter(x=>!x[0]);console.log(`\n${res.length-fails.length}/${res.length} ok`);if(fails.length)console.log('FAILS:',fails.map(x=>x[1]).join(' | '));
 console.log('page errors:',JSON.stringify({host:A.errs.slice(0,5),guest:B.errs.slice(0,5)}));
 await b.close();process.exit(fails.length?1:0)})();