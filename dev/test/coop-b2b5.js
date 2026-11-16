/* Co-op B2-B5 (review/coop-b1b5): host-authoritative night + in-week night relay (B2), Emperor death in co-op (B3), NPC schemes /
   festivals with the guest in the harem (B4), seat caps across both players (B5). Was: Co-op B1 (review/coop-b1b5): steal / burn / extort the FRIEND's items, harm / take her children, miscarriage — 2 browsers, LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-b1.js [outdir] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2. Dice forced (success, undetected) where the case needs it.
   Checks per act: the act is OFFERED on her entry (ACT.ok), my gain lands on my side, her loss lands on HER own S through `res.fam`,
   her note / Đồ thất lạc case, and after the week merge her entry on my side == her own S (bag keys, children). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-b2b5'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]');if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
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


const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,tn:S.tn||null,tonight:S.tonight==='me'?'me':S.tonight&&S.tonight.id!=null?S.tonight.id:null,dead:!!S.dead,emp:S.emp&&[S.emp.era,S.emp.age,!!S.emp.dead].join('/'),rank:S.rank,Q:Q.map(q=>q.t).slice(0,4)}));
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<10;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',[await D(A),await D(B)]);await sleep(1500);return okw}
/* the host's tablet forced to one card (pick(p) → true for the chosen one), dice inside flip set so the draw always happens and nobody steals */
const forceFlip=(o,who)=>o.p.evaluate(who=>{window.__fw=who;if(!window.__ff){window.__ff=1;const f=flip;flip=function(){const w=window.__fw;if(w==null)return f.apply(this,arguments);
  const r0=roll,n0=nightCh;roll=x=>x>=60;nightCh=p=>{const id=p===S?'me':p.coop?'f':'npc'+p.id;return (w==='npc'?(!p.coop&&p!==S&&p.id===window.__npc):id===w)?100:0};try{return f.apply(this,arguments)}finally{roll=r0;nightCh=n0}}}
  if(who==='npc')window.__npc=liveRivals(true).filter(v=>!v.coop&&v.alive&&!v.out)[0].id},who);
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
 /* B4 spy: the host's rivalsTurn / rivalsMonth / festival run with the friend in the harem; the guest's never run */
 for(const o of [A,B])await o.p.evaluate(()=>{COOPW.b4=[];window.__dil=[];const d=pushDil;pushDil=function(x,t){window.__dil.push(t||'');return d.apply(this,arguments)}});
 /* ---- B2.1 the host's tablet turns the GUEST's card ---- */
 /* reviewer fix-r1: the forced nightCh bypasses jcycle's tray rule, so a guest whose name falls in her Kỳ nguyệt sự tuần (≈1 run in 3) was
   drawn although her card is off the tray (her client then cancels the night: tn 902 vs null, a test artifact). Pick a name out of her cycle. */
{const n=await B.p.evaluate(()=>{if(typeof cyBase!=='function')return null;const t=S.tuan||0,bad=[t,(t+1)%3],base=S.name;for(let i=0;i<400;i++){S.name=base+(i?' '+i:'');if(!bad.includes(cyBase(S).t))break}render();return S.name});
 if(n)await A.p.evaluate(n=>{const f=COOPW.friend();if(f)f.name=n},n)}
await forceFlip(A,'f');ok(await week(A,B,'B2.1'),'B2.1 week');
 {const a=await D(A),c=await D(B);ok(a.tn&&a.tn.who===902&&a.tonight===902,'B2.1 host: tn = the guest (902), her own night = the friend',a);
  ok(c.tonight==='me','B2.1 guest: tonight is HER night (from the host\'s tn)',c);
  ok(await B.p.evaluate(()=>window.__dil.includes('Kính sự phòng báo tin')),'B2.1 guest gets the Kính sự phòng card',await B.p.evaluate(()=>window.__dil));
  await B.p.screenshot({path:OUT+'/b2-guest-night-1180x820.png'})}
 {const a=await A.p.evaluate(()=>COOPW.b4),c=await B.p.evaluate(()=>COOPW.b4);
  ok(a.includes('rivalsTurn'),'B4 host: rivalsTurn ran WITH the guest in the harem',a);ok(!c.length,'B4 guest: no world roll with a friend',c)}
 /* ---- B2.2 in the week: the guest pleads illness (night gone) → the host sees no night; the host then claims it → the guest sees it is the host's ---- */
 for(let i=0;i<3;i++){await clear(A);await clear(B)}
 await B.p.evaluate(()=>{S.tonight=null;render()});ok(await until(A,()=>S.tonight==null,null,15000),'B2.2 host: the guest gave the night up → no night on the host',await D(A));
 await A.p.evaluate(()=>{S.tonight='me';render()});ok(await until(B,()=>S.tonight&&S.tonight!=='me'&&S.tonight.coop,null,15000),'B2.2 guest: the night is now the host\'s',await D(B));
 for(let i=0;i<3;i++){await clear(A);await clear(B)}
 /* ---- B2.3 an NPC's night: same NPC on both ---- */
 await forceFlip(A,'npc');ok(await week(A,B,'B2.3'),'B2.3 week');
 {const a=await D(A),c=await D(B);ok(a.tonight!=null&&a.tonight!=='me'&&a.tonight<900&&a.tonight===c.tonight,'B2.3 the same NPC on both',[a.tonight,c.tonight])}
 /* ---- B5 seat caps ---- */
 {  const a=await A.p.evaluate(()=>{const f=COOPW.friend();const rk=rkOf(f);const L0=holders(rk).includes(f);let L1=null;const P=[];for(let i=rivals.length-1;i>=0;i--)if(rivals[i].coop)P.push([i,rivals.splice(i,1)[0]]);
   COOPW.pulled=P;try{L1=holders(rk).includes(f)}finally{COOPW.pulled=null;for(const [i,v] of P.reverse())rivals.splice(i,0,v)}return [L0,L1,rk]});
  ok(a[0]&&a[1],'B5 host: holders() counts the friend even while endTurn has taken her out',a);
  const c=await B.p.evaluate(()=>{const f=COOPW.friend();const r0=S.rank;f.rank=6;S.rank=6;COOPW.mine={rank:5};const keep=SEATCAP[6];COOPW.seatWeek();const out={rank:S.rank,q:Q.some(q=>q.t==='Ghế đã có người'),cap:keep};S.rank=r0;f.rank=3;render();return out});
  ok(c.rank===5&&c.q,'B5 guest: promoted into the same last seat as the host in the same week → back one rank + the kit card',c);
  for(let i=0;i<3;i++){await clear(B)}}
 /* ---- B3 the Emperor dies: both reach the end of the reign at the same merged week, both reborn under ONE new Emperor ---- */
 {const e0=await D(A);await A.p.evaluate(()=>{COOPW.inTurn=true;try{emperorDies('')}finally{COOPW.inTurn=false}});ok(await A.p.evaluate(()=>!!(S.emp.dead&&S.emp.dead.w===COOP.state.week+1)),'B3 host: emp.dead set for the next week');
  ok(await B.p.evaluate(()=>{COOPW.inTurn=true;try{emperorDies('')}finally{COOPW.inTurn=false}return !S.emp.dead}),'B3 guest: her own roll never fires');
  const w0=await A.p.evaluate(()=>COOP.state.week);
  const EL=o=>o.p.evaluate(()=>COOPW.empLog||[]);
  for(let g=0;g<12;g++){if((await EL(A)).length&&(await EL(B)).length)break;await press(A);await press(B);const t0=Date.now();while(Date.now()-t0<15000){if((await EL(A)).length&&(await EL(B)).length)break;await sleep(400)}
   if(!((await EL(A)).length&&(await EL(B)).length)){await clear(A);await clear(B)}}
  const la=await EL(A),lb=await EL(B);ok(la.length===1&&lb.length===1&&la[0].dead&&lb[0].dead&&la[0].w===w0+1&&lb[0].w===w0+1,'B3 both lives end with the reign, in the same merged week',[la,lb,await D(A),await D(B)]);
  ok(la[0]&&lb[0]&&la[0].bh&&lb[0].bh,'B3 both read the Emperor\'s death on their end card',[la,lb]);
  await B.p.screenshot({path:OUT+'/b3-guest-end-1180x820.png'});await A.p.screenshot({path:OUT+'/b3-host-end-755x1000.png'});
  /* reborn: both back in the room, same NEW Emperor */
  {const alive=o=>o.p.evaluate(()=>!!(COOPW.on&&S&&!S.dead&&!COOPW.inLife&&document.getElementById('next').offsetParent)).catch(()=>false);
   const t0=Date.now();while(Date.now()-t0<180000){await clear(A);await clear(B);if(await alive(A)&&await alive(B))break;await sleep(700)}ok(await alive(A)&&await alive(B),'B3 both reborn in the room')}
  ok(await week(A,B,'B3 next'),'B3 a week after the rebirth');
  const a2=await D(A),c2=await D(B);ok(a2.emp===c2.emp&&!/true$/.test(a2.emp)&&a2.emp!==e0.emp,'B3 one NEW Emperor on both',[e0.emp,a2.emp,c2.emp])}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
