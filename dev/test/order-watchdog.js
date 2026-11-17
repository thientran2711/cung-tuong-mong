/* order-watchdog (review/learn-scene-fix-2): the scene queue (kmPump, j93) and the dialog gate (jorder) must never wait on each other.
   INVARIANT: never (Q > 0 AND #modal hidden AND KMQ > 0 or kmBusy AND nothing on screen) for longer than LIMIT ms.
   Part 1 = the known rings, each must resolve: (a) a queued scene that cannot start (week panel up, kmFree false) + dialogs (the co-op stall 61/63),
   (b) an afterModals scene at the head + a plain scene behind it + dialogs, (c) a running job that never paints (card flip waiting on the Luân hồi card) + a dialog.
   Part 2 = positive order still holds (dialog -> afterModals scene -> held VIỆC -> VIỆC after the scene).
   Part 3 = fuzz: random pushes of scenes / dialogs / week panel / buổi with an auto-player that taps what is on screen; the invariant is sampled every 100 ms.
   usage: node dev/test/order-watchdog.js   (Fold + iPad Air) */
const {chromium}=require('playwright');const D=require('./lib/device');
const LIMIT=3000;
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
  await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0;const k=document.getElementById('kload');if(k)k.hidden=true;render()});
  await p.waitForTimeout(3000);
  /* the watchdog: a sampler in the page; window.__wd = longest stalled stretch (ms) + its state */
  await g.evaluate(LIMIT=>{window.__wdReset=()=>{window.__wd={max:0,since:0,st:null}};window.__wdReset();
   window.__wdState=()=>{const M=document.getElementById('modal');let scr=false;try{scr=kmOnScreen()}catch(e){}
    return{Q:Q.length,hid:!M||M.hidden,KMQ:KMQ.length,busy:kmBusy,scr,free:kmFree(),hold:kmHold(),dawn:!!(document.getElementById('dawn')&&document.getElementById('dawn').classList.contains('on'))}};
   setInterval(()=>{const s=window.__wdState(),w=window.__wd;const bad2=s.Q>0&&s.hid&&(s.KMQ>0||s.busy)&&!s.scr;
    if(bad2){if(!w.since)w.since=Date.now();const d=Date.now()-w.since;if(d>w.max){w.max=d;w.st=s}}else w.since=0},100)},LIMIT);
  const clean=()=>g.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#buoitr,#kpodov').forEach(x=>x.remove());KMQ.length=0;kmBusy=false;Q.length=0;
   const m=document.getElementById('modal');if(m)m.hidden=true;const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}document.querySelectorAll('[id^=kroul],.kroul-ov').forEach(x=>x.remove());window.__wdReset()});
  const st=()=>g.evaluate(()=>window.__wdState());const shown=()=>g.evaluate(()=>{const M=document.getElementById('modal');return !!(M&&!M.hidden)});
  /* a plain test scene: a .kmov with one end button (kmStage) */
  await g.evaluate(()=>{window.__scene=(tag,o)=>kmPush(done=>{const s=kmStage('km-reward km-wd',`<div class="kmrew"><b>${tag}</b><button type="button" class="kbtn kmtake" data-km-close>Tiếp</button></div>`,{manual:true,dur:60000,onEnd:done});s.ov.dataset.wd=tag},o)});

  /* ---- 1a. the co-op stall: a plain scene queued while the week panel is up (kmFree false) + 2 dialogs ---- */
  await clean();
  await g.evaluate(()=>{let d=document.getElementById('dawn');if(!d){d=document.createElement('div');d.id='dawn';d.className='dawn';document.body.appendChild(d)}d.hidden=false;d.classList.add('on');
   __scene('A');Q.push({t:'Mệnh truyện kiếp này',h:'<p>x</p>'},{t:'Hảo hữu vào cung',h:'<p>y</p>'});showModal()});
  await p.waitForTimeout(700);let s=await st();ok(await shown(),`${dev} 1a: dialog shows while the queued scene cannot start (week panel up)`,s);
  await g.evaluate(()=>{const d=document.getElementById('dawn');d.classList.remove('on');d.hidden=true});await p.waitForTimeout(700);
  s=await st();ok(s.scr&&s.KMQ===0,`${dev} 1a: the scene starts once the week panel closes`,s);
  for(let i=0;i<4;i++){await g.evaluate(()=>{const o=document.querySelector('.kmov [data-km-close]');if(o)o.click();else if(!document.getElementById('modal').hidden)document.getElementById('mclose').click()});await p.waitForTimeout(500)}
  s=await st();ok(s.Q===0&&s.KMQ===0&&!s.busy,`${dev} 1a: everything drained`,s);

  /* ---- 1b. afterModals scene at the head, a plain scene behind it, dialogs queued ---- */
  await clean();
  await g.evaluate(()=>{Q.push({t:'Món làm',h:'<p>x</p>'});showModal();__scene('L',{afterModals:true});__scene('P');Q.push({t:'Việc kế',h:'<p>y</p>'});showModal()});
  await p.waitForTimeout(700);s=await st();ok(await shown()&&!s.scr,`${dev} 1b: dialogs show first (head scene waits for them), plain scene behind does not hide them`,s);
  await g.evaluate(()=>document.getElementById('mclose').click());await p.waitForTimeout(500);
  await g.evaluate(()=>{if(!document.getElementById('modal').hidden)document.getElementById('mclose').click()});await p.waitForTimeout(700);
  s=await st();ok(s.scr,`${dev} 1b: the scenes play after the dialogs`,s);
  for(let i=0;i<4;i++){await g.evaluate(()=>{const o=document.querySelector('.kmov [data-km-close]');if(o)o.click()});await p.waitForTimeout(500)}
  s=await st();ok(s.KMQ===0&&!s.busy&&!s.scr,`${dev} 1b: drained`,s);

  /* ---- 1c. a running job that never paints (waits for something else) + a dialog: released after the grace ---- */
  await clean();
  await g.evaluate(()=>{window.__hang=null;kmPush(done=>{window.__hang=done});Q.push({t:'Luân hồi',h:'<p>x</p>'});showModal()});
  await p.waitForTimeout(500);s=await st();ok(!(await shown()),`${dev} 1c: inside the grace a starting job still holds`,s);
  await p.waitForTimeout(2200);s=await st();ok(await shown(),`${dev} 1c: after the grace the dialog shows (job paints nothing)`,s);
  await g.evaluate(()=>{window.__hang&&window.__hang();document.getElementById('mclose').click()});

  /* ---- 2. positive order kept ---- */
  await clean();
  await g.evaluate(()=>{Q.push({t:'Túi thơm',h:'<p>x</p>'});showModal();__scene('Học',{afterModals:true})});await p.waitForTimeout(600);
  ok(await shown()&&!(await st()).scr,`${dev} 2: item dialog first`);
  await g.evaluate(()=>document.getElementById('mclose').click());await p.waitForTimeout(600);ok((await st()).scr&&!(await shown()),`${dev} 2: scene after it`);
  await g.evaluate(()=>{Q.push({t:'Kỳ nguyệt sự',h:'<p>y</p>'});showModal()});await p.waitForTimeout(600);ok(!(await shown()),`${dev} 2: next VIỆC held under the scene`);
  await g.evaluate(()=>document.querySelector('.kmov [data-km-close]').click());await p.waitForTimeout(700);ok(await shown(),`${dev} 2: next VIỆC after the scene`);

  /* ---- 3. fuzz with the invariant sampled ---- */
  await clean();
  const fz=await g.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));let seed=7;const R=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
   for(let i=0;i<160;i++){const r=R();
    if(r<.22)__scene('F'+i,R()<.4?{afterModals:true}:undefined);
    else if(r<.45){Q.push({t:'Việc '+i,h:'<p>z</p>'});showModal()}
    else if(r<.52){let d=document.getElementById('dawn');if(!d){d=document.createElement('div');d.id='dawn';d.className='dawn';document.body.appendChild(d)}d.hidden=false;d.classList.add('on');setTimeout(()=>{d.classList.remove('on');d.hidden=true},400+R()*1500)}
    else if(r<.58){try{buoiShift()}catch(e){}}
    else if(r<.62){kmPush(done=>setTimeout(done,500+R()*3000))}   /* a job with no picture */
    /* the player: taps what is on top */
    if(R()<.6){const o=document.querySelector('.kmov [data-km-close]');if(o)o.click();else{const M=document.getElementById('modal');if(M&&!M.hidden)document.getElementById('mclose').click()}}
    await W(120+R()*200)}
   /* drain like a player */
   for(let i=0;i<120&&(Q.length||KMQ.length||kmBusy);i++){const o=document.querySelector('.kmov [data-km-close]');if(o)o.click();else{const M=document.getElementById('modal');if(M&&!M.hidden)document.getElementById('mclose').click()}await W(300)}
   return{left:{Q:Q.length,KMQ:KMQ.length,busy:kmBusy},wd:window.__wd}});
  ok(fz.wd.max<LIMIT,`${dev} 3: fuzz — longest 'dialog hidden + scene queued + nothing on screen' stretch < ${LIMIT} ms`,fz.wd);
  ok(!fz.left.Q&&!fz.left.KMQ&&!fz.left.busy,`${dev} 3: fuzz drained by tapping`,fz.left);
  ok(!errs.length,`${dev} no page errors`,errs);await ctx.close()}
 console.log(fail?'FAILS: '+fail:'ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})();
