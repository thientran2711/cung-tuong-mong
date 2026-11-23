/* night-softlock (review/fix-evening-softlock, ROBOT-10 bug A, LIVE 225c5c08): at tối «Sang ngày mới» did nothing for ever after a reload.
   Root cause: jnf S.nfX (the night-flip choice state) is SAVED, but its release is not — the choice card (Q pid "nfch", no PEND builder, dropped
   by deserQ) and her steal game (jsmg BUSY / #kg82). S.nfX stayed {st:"open",dlg:1} or {st:"mg"} → endTurn → hold() at every press.
   Fix: jnf heal() at each press / step tick (card gone → shown again; game gone → over, no rung) + jsmg stealMgBusy().
   Cases: 1 reload while she attacks (Tranh sủng/Chặn ngự giá/Thôi) · 2 reload while she is the flipped one (Giữ chân/Thôi) · 3 reload inside her
   steal game (st "mg") · 4 the card dropped from the queue at runtime · 5 a steal game really running is NOT healed away · 6 player mode: the
   choice dialog is on screen again after the reload · 7 20 whole days, a save→reload round trip at every tối press: the day always turns.
   usage: node dev/test/night-softlock.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const URL=process.argv[2]||('file://'+require('path').resolve(__dirname,'../../index.html'));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={};BAL.visit.cap=0;BAL.ag.emp.custom=[0,0];BAL.nt.on=false;
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;
   return liveRivals(false).filter(v=>nightCh(v)>0)};
  /* answer dialogs: nfch with `ch`, others with Thôi or the first; stopAtNf leaves the choice up */
  T.drain=(ch,stopAtNf)=>{for(let n=0;n<80&&Q.length;n++){const m=Q[0];if(stopAtNf&&m.pid==="nfch")return;const o=m.opts;
   if(o&&o.length){let i=m.pid==="nfch"?o.findIndex(x=>x.n===(ch||"Thôi")):o.findIndex(x=>x.n==="Thôi");if(i<0)i=0;try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}};
  T.noCyc=()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"})};
  T.toEvening=()=>{let g=0;T.noCyc();while((S.buoi||0)<B4L&&g++<8){T.drain();used=4;nextBuoi()}T.drain()};
  T.flipTo=who=>{const nc=nightCh;nightCh=function(q){q=q||S;if(!(S.nfX&&S.nfX.d===wk()&&S.nfX.st==="wait"))return nc.apply(this,arguments);return q===who?100:0};
   S.toMorning=0;used=4;S.buoi=B4L;nextBuoi();nightCh=nc};
  /* a real reload: what save() writes, read back by deser (the module state of the page — the card queue, jsmg BUSY — is what a reload loses) */
  T.reload=()=>{const s=JSON.parse(JSON.stringify(ser()));deser(s);return s};
  T.press=(n,ch)=>{const d=wk();let k=0;for(;k<n&&wk()===d&&!S.dead;k++){T.drain(ch);used=4;S.buoi=B4L;nextBuoi()}T.drain(ch);return{turned:wk()!==d,presses:k}};
  T.nx=()=>JSON.parse(JSON.stringify(S.nfX||null));
  /* a fresh life at tối with the choice card up (att: a rival flipped / def: she is flipped); other cards answered so only the choice is left */
  T.choice=role=>{for(let t=0;t<12;t++){const L=T.fresh();T.toEvening();T.flipTo(role==="def"?S:L[t%L.length]);T.drain(null,true);
   const x=S.nfX;if(x&&x.st==="open"&&x.dlg&&x.role===role&&Q[0]&&Q[0].pid==="nfch"){const m=Q.shift();T.drain();Q.unshift(m);return true}}return false}});
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};let r;
 r=await p.evaluate(()=>{const a={ready:T.choice("att"),q:Q.map(m=>m.pid),x0:T.nx()};
  const s=T.reload();a.savedNf=(s.P||[]).some(e=>e.pid==="nfch");a.qAfter=Q.length;a.x1=T.nx();
  /* first press after the reload: the choice comes back (attacker options), then she answers and the day turns */
  used=4;S.buoi=B4L;nextBuoi();a.back=(Q.find(m=>m.pid==="nfch")||{opts:[]}).opts.map(o=>o.n).join("/");Object.assign(a,T.press(6));return a});
 ok("1 reload at her attack choice: the card comes back, the day turns",r.x0&&r.x0.st==="open"&&r.x0.dlg===1&&r.qAfter===0&&r.back==="Tranh sủng/Chặn ngự giá/Thôi"&&r.turned,r);
 r=await p.evaluate(()=>{const a={ready:T.choice("def"),x0:T.nx(),q:Q.map(m=>m.pid)};T.reload();a.qAfter=Q.length;
  used=4;S.buoi=B4L;nextBuoi();a.back=(Q.find(m=>m.pid==="nfch")||{opts:[]}).opts.map(o=>o.n).join("/");T.drain("Giữ chân Hoàng thượng");Object.assign(a,T.press(6));return a});
 ok("2 reload while she is the flipped one: Giữ chân/Thôi again, the day turns",r.x0&&r.x0.role==="def"&&r.qAfter===0&&r.back==="Giữ chân Hoàng thượng/Thôi"&&r.turned,r);
 r=await p.evaluate(()=>{T.choice("att");Q.length=0;
  /* the saved state of a reload inside her steal game: her pick made (x.me), st "mg" (jsmg chooseM), the game layer gone */
  const x=S.nfX;x.me="feign";x.myAt=Date.now();x.st="mg";T.reload();const a={x0:T.nx(),busy:typeof window.stealMgBusy==="function"?window.stealMgBusy():"none"};Object.assign(a,T.press(6));a.x1=T.nx();return a});
 ok("3 reload inside her steal game (st mg; LIVE already guarded by jsmg render): the one resolve runs, the day turns",r.x0.st==="mg"&&r.busy!==true&&r.turned&&r.x1&&r.x1.st==="done",r);
 /* 3b her steal game layer closed WITHOUT its onDone (j82 kg82Close(true), e.g. another game layer opened over it): jsmg BUSY stayed 1 for ever,
       so even jsmg's render guard (!BUSY) never let st "mg" go → the same hold. Player mode (the real game layer). */
 r=await p.evaluate(async()=>{T.choice("att");const x=S.nfX;window.__bot=undefined;delete window.__bot;const a={};
  const j=Q[0].opts.findIndex(o=>o.n==="Tranh sủng");chooseM(j);await new Promise(r=>setTimeout(r,300));a.layer=!!document.getElementById("kg82");a.mid=x.st;
  try{kg82Close(true)}catch(e){a.err=String(e)}await new Promise(r=>setTimeout(r,300));a.layerAfter=!!document.getElementById("kg82")&&!document.getElementById("kg82").hidden;
  window.__bot=1;try{$("modal").hidden=true}catch(e){}Object.assign(a,T.press(6));a.x1=T.nx();return a});
 ok("3b her steal game layer closed without its onDone: no hold, the day turns",r.mid==="mg"&&r.turned,r);
 r=await p.evaluate(()=>{const a={ready:T.choice("att"),had:Q.some(m=>m.pid==="nfch")};
  Q.splice(Q.findIndex(m=>m.pid==="nfch"),1);/* any queue filter that drops it (no reload) */used=4;S.buoi=B4L;nextBuoi();a.back=Q.some(m=>m.pid==="nfch");Object.assign(a,T.press(6));return a});
 ok("4 the card dropped from the queue at runtime: shown again, the day turns",r.had&&r.back&&r.turned,r);
 r=await p.evaluate(async()=>{T.choice("att");const x=S.nfX;
  /* a game that really runs: the fake game ends on the next tick (async) — while it runs, heal must leave st "mg" alone */
  window.__smgFake=()=>({raw:10});const j=Q[0].opts.findIndex(o=>o.n==="Tranh sủng");const a={};
  chooseM(j);a.mid=x.st;a.busy=typeof window.stealMgBusy==="function"?window.stealMgBusy():"none";if(window.nfHeal)window.nfHeal();a.afterHeal=x.st;
  await new Promise(r=>setTimeout(r,60));a.end=x.st;delete window.__smgFake;Object.assign(a,T.press(6));return a});
 ok("5 a steal game really running is not healed away (st mg kept until it ends)",r.mid==="mg"&&r.busy===true&&r.afterHeal==="mg"&&r.end==="done"&&r.turned,r);
 /* 6 player mode (no bot): after a reload the press puts the choice dialog on screen again */
 r=await p.evaluate(async()=>{T.choice("att");T.reload();window.__bot=undefined;delete window.__bot;
  try{$("modal").hidden=true}catch(e){}used=4;S.buoi=B4L;nextBuoi();await new Promise(r=>setTimeout(r,800));
  const a={modal:!$("modal").hidden,top:Q[0]&&Q[0].pid,txt:($("modal").innerText||"").slice(0,80)};window.__bot=1;Object.assign(a,T.press(6));return a});
 ok("6 player mode: the choice dialog is on screen again after the reload",r.modal&&r.top==="nfch"&&r.turned,r);
 /* 7 the robot's loop: 20 whole days, at every tối press a save→reload round trip first; the day must always turn */
 r=await p.evaluate(()=>{T.fresh();const a={days:0,stuck:null};for(let dd=0;dd<20&&!S.dead;dd++){T.toEvening();const d=wk();
   for(let k=0;k<12&&wk()===d&&!S.dead;k++){T.drain(k%2?"Thôi":"Tranh sủng",true);T.reload();used=4;S.buoi=B4L;nextBuoi();if(k%3===2)T.drain()}
   T.drain();if(wk()===d&&!S.dead){a.stuck={d,x:T.nx(),q:Q.map(m=>m.pid)};break}a.days++}a.dead=!!S.dead;return a});
 ok("7 20 days, a save→reload at every tối press: the day always turns",!r.stuck&&(r.days===20||r.dead),r);
 ok("8 no page errors",!errs.length,errs.slice(0,5));
 let bad=0;for(const k in R){console.log((R[k].pass?"PASS ":"FAIL ")+k+(R[k].pass?"":"  "+JSON.stringify(R[k].info).slice(0,600)));if(!R[k].pass)bad++}
 await b.close();process.exit(bad?1:0)})();
