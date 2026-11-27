/* dayq-break (dayq-one-rule): disable #next, wait 2 × BAL.dayq.wake. Held cases must stay disabled; control must come back. Column «heal() alone» calls dqNextHeal once (the heal's own rule);
   the 2×wake column includes every other net (dqWake→dqNextSync, lifeGate…). usage: python3 dev/build/assemble.py && node dev/test/dayq-break.js   (serves dev/index.html via coop-serve.js) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();return S.name})()`;
const CASES={
 'Q>0 (hidden card)':{set:`Q.push({t:'Tin báo',must:1,h:'<p>x</p>'})`,undo:`Q.length=0;document.getElementById('modal').hidden=true`,want:true},
 'S.mg (mini-game #ov on screen)':{set:`S.mg={probe:1};document.getElementById('ov').hidden=false`,undo:`S.mg=null;document.getElementById('ov').hidden=true`,want:true},
 'S.dead':{set:`S.dead=true`,undo:`S.dead=false`,want:true},
 'data-coopWait (solo)':{set:`document.getElementById('next').dataset.coopWait='1'`,undo:`delete document.getElementById('next').dataset.coopWait`,want:true},
 'co-op lockNext keeps lock':{set:`window.__cw0=window.COOPW;window.__lk=0;window.COOPW={on:true,lockNext(){window.__lk++}}`,undo:`window.COOPW=window.__cw0`,want:true},
 'CONTROL nothing holds it':{set:``,undo:``,want:false}};
(async()=>{const b=await chromium.launch();let fail=0;
 for(const vp of [[755,1000],[1180,820]]){const c=await b.newContext({serviceWorkers:'block',viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1});await serve(c);const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));
  await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());await p.goto(BASE);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:180000});await sleep(1500);
  await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);const wake=await p.evaluate(()=>BAL.dayq.wake||2000);
  await p.evaluate(()=>{window.__rc=0;const r0=render;render=function(){window.__rc++;return r0.apply(this,arguments)}});
  for(const [k,cs] of Object.entries(CASES)){
   await p.evaluate(()=>{document.querySelectorAll('.kmov,#kmrew,#kpodov').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;S.mg=null;S.dead=false;render()});await sleep(300);
   const h0=await p.evaluate(cs.set+';const n=document.getElementById("next");n.disabled=true;window.__rc=0;DQ.stat.healed||0');
   const d=await p.evaluate(`(()=>{const n=document.getElementById('next');const r=window.__rc;dqNextHeal();const o={dis:n.disabled,rc:window.__rc-r};n.disabled=true;return o})()`);
   await sleep(wake*2+300);
   const r=await p.evaluate(`(()=>{const n=document.getElementById('next');return {dis:n.disabled,healed:(DQ.stat.healed||0),rc:window.__rc,lk:window.__lk||0}})()`);
   await p.evaluate(cs.undo);
   const ok=r.dis===cs.want&&d.dis===cs.want;if(!ok)fail++;
   console.log(`${vp[0]}x${vp[1]}  ${k.padEnd(32)} ${ok?'ok  ':'FAIL'} heal() alone: disabled ${d.dis} render ${d.rc} | after 2×wake: disabled ${r.dis} · healed +${r.healed-h0} · render calls ${r.rc}${k.startsWith('co-op')?' · lockNext calls '+r.lk:''}`)}
  console.log(`${vp[0]}x${vp[1]}  page errors ${pe.length} ${JSON.stringify(pe)}`);if(pe.length)fail++;await c.close()}
 await b.close();console.log(fail?'break: FAIL '+fail:'break: PASS');process.exit(fail?1:0)})();
