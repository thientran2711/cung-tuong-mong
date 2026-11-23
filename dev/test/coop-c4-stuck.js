/* review/coop-c4-stuck: the co-op "queued dialog left unseen / week never ends" family, forced on purpose (no timer guessing: every wait is on a
   condition; the reshow counter COOPW.qN says the room's reshow ran). Two Playwright clients in one room, host Fold 686x880 + guest iPad 1180x820
   (swap=1: iPad hosts, Fold joins), thin level 0 (old rooms) / 3 / 5.
   usage: python3 dev/build/assemble.py && node dev/test/coop-c4-stuck.js <workerURL> [level=3] [swap=0]
   Checks, on BOTH seats:
     S1 race "book up while the reshow runs": the Tuần lục book (kitBook, .kbk-bar) is open, a card is queued with the dialog hidden, render() arms the
        reshow, the reshow runs while the book is still up (precondition), the book closes -> the card shows (main before: hidden until some later render);
     S2 a card whose ONLY option is a pure close ("Đã rõ", no effect) shows just the kit ✕ (KIT_CLOSE_W / kitCancelIx): the shared test clear() presses
        the ✕ and the card is gone (main before: clear() returned 'stuck' = the C4 / coop-e2e "Q [Điềm báo …], week never ends" flake);
     S3 guard: Q non-empty + no dialog open + nothing over it -> the next render shows it;
     S4 a full week with such ✕-only cards queued on both seats ends once on both.
     (review r1) S2b a REAL pointer tap on the ✕ closes the pure-close card; S5 negative: a truly hidden card / an invisible ✕ is never "cleared". */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||3);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|fonts\.gstatic|CORS/.test(m.text()))o.errs.push('console: '+m.text().slice(0,300))});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<12;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',okw?undefined:[await A.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent})),await B.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,log:COOPW.thin.C.log.slice(-5),modal:(document.getElementById('modal')||{}).hidden,q0:Q[0]&&Object.keys(Q[0]).join(','),q0p:Q[0]&&(Q[0].pid||Q[0].ev||''),mg:!!S.mg,km:document.querySelectorAll('.kmov').length,fr:COOP.frozen,cy:COOPW.cyHold,dead:S.dead}))]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=process.env.SHOTS?[755,1000]:[686,880],IPAD=[1180,820];/* SHOTS=<dir outside git>: the owner's devices Fold 755x1000@2 + iPad 1180x820@2 */
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
 const seats=[['guest',G],['host',H]];
 for(const [nm,o] of seats){
  /* S1 */
  /* S1 needs the reshowQ book guard (jcoopworld, CW.reshowQ); a tests-only build without it says so and runs S2–S5 */
  if(!await o.p.evaluate(()=>typeof COOPW.reshowQ==='function'))console.log('note S1 '+nm+': reshowQ book guard not in this build, S1 not run');else{
  const pre=await o.p.evaluate(()=>{for(let i=0;i<3;i++)try{if(window.__kbk&&__kbk.close)__kbk.close()}catch(e){}Q.length=0;const M=document.getElementById('modal');M.hidden=true;
   try{dawn()}catch(e){return{err:String(e)}}const bk=!!document.querySelector('.kbk-bar');Q.push({t:'Thử C4',h:'<p>Thẻ chờ dưới sách.</p>'});M.hidden=true;
   /* the race, forced: the armed reshow runs while the book is still up and the dialog is hidden (a rebuild dropped it) */
   const n0=COOPW.qN;COOPW.reshowQ();return{bk,ran:COOPW.qN>n0,hidden:M.hidden,armed:COOPW.qArmed()}});
  ok(pre&&pre.bk&&pre.ran&&pre.hidden,'S1 '+nm+': the reshow ran while the Tuần lục book was up, card queued and hidden (race forced)',pre);
  await o.p.evaluate(()=>{const x=[...document.querySelectorAll('.kbk-x')].find(b=>b.offsetParent!==null);if(x)x.click();else if(window.__kbk&&__kbk.close)__kbk.close()});
  await until(o,()=>!document.querySelector('.kbk-bar'),null,10000);
  const shown=await until(o,()=>!document.getElementById('modal').hidden&&Q[0]&&Q[0].t==='Thử C4',null,8000);
  ok(shown,'S1 '+nm+': after the book closes the queued card shows',await o.p.evaluate(()=>({hidden:document.getElementById('modal').hidden,q:Q.map(m=>m.t),armed:COOPW.qArmed()})));
  }
  for(let i=0;i<3;i++)await clear(o);
  /* S2 */
  await o.p.evaluate(()=>{Q.push({t:'Điềm báo',kind:'notice',act:1,h:'<p>Thẻ chỉ có lời "Đã rõ".</p>',opts:[{n:'Đã rõ',fx:{},go:()=>{}}]});showModal()});
  const s2=await o.p.evaluate(()=>{const M=document.getElementById('modal');return{hidden:M.hidden,btn:[...M.querySelectorAll('button')].filter(b=>b.offsetParent!==null).map(b=>b.className||b.textContent.trim())}});
  const c2=await clear(o);const q2=await o.p.evaluate(()=>({q:Q.map(m=>m.t),hidden:document.getElementById('modal').hidden}));
  ok(!s2.hidden&&s2.btn.some(c=>/kit-x/.test(c))&&!q2.q.includes('Điềm báo')&&q2.hidden,'S2 '+nm+': a pure-close card shows the kit ✕ and the shared clear() closes it',{s2,c2,q2});
  /* S2b (review r1): a REAL pointer tap on the ✕ (Playwright hit-test: on screen, not covered) closes it, as the player's finger would */
  await o.p.evaluate(()=>{Q.push({t:'Điềm báo',kind:'notice',act:1,h:'<p>Chạm ✕.</p>',opts:[{n:'Đã rõ',fx:{},go:()=>{}}]});showModal()});
  /* other layers the harness leaves open (the life-start roulette, edict movies, panels) sit above the dialog; a player closes those first.
     For this one check every other layer lets taps through (pointer-events), so the tap proves the ✕ is on screen, not covered inside the dialog, and works. */
  await o.p.evaluate(()=>{const st=document.createElement('style');st.id='c4pe';st.textContent='body *{pointer-events:none!important}#modal,#modal *{pointer-events:auto!important}';document.head.appendChild(st)});
  let tap='';try{await o.p.locator('#modal .dlg .kit-x').first().click({timeout:5000});tap='tapped'}catch(e){tap=(String(e.message).match(/<[^\n]*intercepts pointer events/)||[String(e.message).slice(-300)])[0].replace(/src=\S+/g,'').slice(0,700)}
  await o.p.evaluate(()=>{const s=document.getElementById('c4pe');if(s)s.remove()});
  const q2b=await until(o,()=>!Q.some(m=>m.t==='Điềm báo')&&document.getElementById('modal').hidden,null,5000);
  ok(tap==='tapped'&&q2b,'S2b '+nm+': a real tap on the kit ✕ closes the pure-close card ("Đã rõ" = the ✕)',{tap});
  /* S3 */
  await o.p.evaluate(()=>{Q.push({t:'Thử C4b',h:'<p>x</p>'});document.getElementById('modal').hidden=true;render()});
  ok(await until(o,()=>!document.getElementById('modal').hidden&&Q[0]&&Q[0].t==='Thử C4b',null,8000),'S3 '+nm+': Q non-empty + no dialog open → shown again');
  for(let i=0;i<3;i++)await clear(o);
  /* S5 negative (review r1): the shared clear() must NOT hide a real stuck state.
     (a) a card queued but the dialog truly hidden: clear() presses nothing and the card stays queued;
     (b) a pure-close card whose kit ✕ is not on screen: clear() reports 'stuck' (it never clicks an invisible ✕). */
  /* the room's own reshow (armed by an earlier render) would rightly show the card again: hold showModal for this one check */
  const n5a=await o.p.evaluate(()=>{window.__c4sm=showModal;showModal=function(){};Q.length=0;Q.push({t:'Thử C4n',h:'<p>x</p>'});document.getElementById('modal').hidden=true;return Q.length});
  const c5a=await clear(o,1);const q5a=await o.p.evaluate(()=>{const r=Q.map(m=>m.t);showModal=window.__c4sm;return r});
  ok(n5a===1&&c5a!=='x'&&q5a[0]==='Thử C4n','S5 '+nm+': a hidden queued card is not "cleared" by the test helper',{c5a,q5a});
  await o.p.evaluate(()=>{Q.length=0;Q.push({t:'Điềm báo',kind:'notice',act:1,h:'<p>✕ khuất.</p>',opts:[{n:'Đã rõ',fx:{},go:()=>{}}]});showModal();
   const st=document.createElement('style');st.id='c4nx';st.textContent='#modal .dlg .kit-x{display:none!important}';document.head.appendChild(st)});
  const c5b=await clear(o,1);const q5b=await o.p.evaluate(()=>{const r=Q.map(m=>m.t);document.getElementById('c4nx').remove();return r});
  ok(c5b==='stuck'&&q5b[0]==='Điềm báo','S5 '+nm+': an invisible ✕ is never pressed (clear() says stuck)',{c5b,q5b});
  for(let i=0;i<3;i++)await clear(o)}
 /* S4 */
 for(const o of [H,G])await o.p.evaluate(()=>{Q.push({t:'Điềm báo',kind:'notice',act:1,h:'<p>Cuối tuần.</p>',opts:[{n:'Đã rõ',fx:{},go:()=>{}}]});showModal()});
 await week(H,G,'S4 a week with ✕-only cards on both seats');
 for(const o of [H,G])if(o.errs.length)console.log(o.name,'errors',o.errs.slice(0,5));
 ok(!H.errs.length&&!G.errs.length,'no page errors');
 const n=res.filter(r=>r[0]).length;console.log(`coop-c4-stuck L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
