/* kit-entry-gate (review/kit-podium-gate, KP07 / K-OI-1, KIT §81.1) — node dev/test/kit-entry-gate.js [dev/index.html] [outdir]
   kitEntryGate({kind,to}) for the 4 kinds: a kmStage scene with the gate (two leaves), the caption «<cap> · Vào <to>», ONE kit button (label by kind) that is the only way to close it
   (an outside tap only skips to the final frame), the scene + leaves are PAINTED (no glow / kit-paper leaves: review/art-slots), scenes queue one at a time, reduced motion = final frame at once (leaves open, button there), the oiGate caller of joi.js finds the part.
   Shots (final frame) of the 4 kinds on Fold 755x1000 and iPad 1180x820 to <outdir> (outside git). */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const END={consort:'Vào điện',bride:'Vào điện',maid:'Theo ma ma',corridor:'Tiếp theo'};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  for(const rm of [false,true]){
   const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT&&!rm?2:1,reducedMotion:rm?'reduce':'no-preference'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitEntryGate==='function'&&typeof start==='function');await p.waitForTimeout(2500);
   await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});
   await p.waitForTimeout(1200);
   for(const kind of Object.keys(END)){
    const r=await p.evaluate(async(kind)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};try{kmReset()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}document.querySelectorAll('[id^="kroul"],.kroul-ov,#kmrew').forEach(e=>e.remove());
     window.__eg=0;kitEntryGate({kind,to:'Điện tuyển',origin:'tt'});kitEntryGate({kind,to:'Lần hai'});/* review/art-slots: the stage opens once the PAINTED scene has loaded (never a code-drawn frame) */for(let i=0;i<60&&!document.querySelector('.kmov.km-gate');i++)await sleep(100);await sleep(400);
     const ov=document.querySelector('.kmov.km-gate');o.up=!!ov;o.cap=ov&&ov.querySelector('.kmeg-cap').innerText.replace(/\s+/g,' ');o.leaves=ov?ov.querySelectorAll('.kmeg-d').length:0;o.n=document.querySelectorAll('.kmov.km-gate').length;
     o.btn0=!!(ov&&ov.querySelector('.kmend'));
     /* an outside tap = skip to the final frame, never a close */
     if(ov){ov.click()}await sleep(500);const b1=ov&&ov.querySelector('.kmend');o.btn=b1&&b1.textContent;o.stillUp=!!(ov&&ov.isConnected&&!ov.classList.contains('km-out'));
     const dl=ov&&ov.querySelector('.kmeg-dl');o.open=dl?getComputedStyle(dl).transform:'none';
     const r=b1&&b1.getBoundingClientRect(),eg=ov&&ov.querySelector('.kmeg').getBoundingClientRect();o.geo={btnIn:!!r&&r.bottom<=innerHeight+1&&r.top>=0,egIn:!!eg&&eg.left>=0&&eg.right<=innerWidth+1&&eg.top>=0&&eg.bottom<=innerHeight+1,w:Math.round(eg?eg.width:0)};
     window.__shot=1;return o},kind);
    if(OUT&&!rm&&kind!=='maid'||OUT&&!rm){fs.mkdirSync(OUT,{recursive:true});await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/kit-entry-gate-${tag}-${kind}.png`})}
    const t=`${tag}${rm?' reduced':''} ${kind}`;
    ok(r.up&&r.leaves===(kind==='corridor'?0:2),`${t}: scene up, ${kind==='corridor'?'no':'two'} gate leaves`,[r.up,r.leaves]);
    ok(/Vào Điện tuyển/.test(r.cap||'')&&!/%/.test(r.cap||''),`${t}: caption names the selection`,r.cap);
    ok(rm?r.btn0:!r.btn0,`${t}: ${rm?'reduced motion shows the button at once':'no button before the animation / a tap'}`);
    ok(r.btn===END[kind],`${t}: ONE kit button, label «${END[kind]}»`,r.btn);
    ok(r.stillUp,`${t}: the outside tap did not close the scene`);
    ok(kind==='corridor'||/matrix/.test(r.open),`${t}: gate leaves open (final frame transform)`,r.open);
    ok(r.geo.btnIn&&r.geo.egIn,`${t}: scene and button fit the screen`,r.geo);
    /* the button closes it and the queued second scene plays */
    const nx=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const ov=document.querySelector('.kmov.km-gate');const bt=ov&&ov.querySelector('.kmend');if(bt)bt.click();await sleep(700);const o2=document.querySelector('.kmov.km-gate');const cap=o2?o2.querySelector('.kmeg-cap').innerText.replace(/\s+/g,' '):'';
     if(o2){o2.click();await sleep(400);const b2=o2.querySelector('.kmend');if(b2)b2.click();await sleep(600)}return {second:/Vào Lần hai/.test(cap),left:document.querySelectorAll('.kmov.km-gate').length}});
    ok(nx.second&&nx.left===0,`${t}: the button closes it, the queued scene plays next, then none left`,nx);
   }
   if(!rm){const j=await p.evaluate(()=>({part:typeof window.kitEntryGate==='function',caller:typeof oiGate==='function'}));ok(j.part&&j.caller,`${tag}: the joi.js oiGate caller finds window.kitEntryGate`,j)}
   ok(!errs.length,`${tag}${rm?' reduced':''} no page errors`,errs.slice(0,3));await ctx.close()}}
 console.log(res.every(x=>x)?'KIT-ENTRY-GATE PASS':'KIT-ENTRY-GATE FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
