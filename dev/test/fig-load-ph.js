/* fig-load-ph.js (KK45, MAIN 162 20:30Z SIDEQ-TRIM, KIT §59.1 + §59.1a): a KNOWN person's figure / portrait that is still loading (cold cache) must never
   paint the STRANGER silhouette (img/kit/unknown-*) — the slot shows the neutral parchment ground, then the picture fades in. Every person picture is held
   back 1.5 s (route), the place stage + a person dialog (kitModal subject) + the Hậu cung tab are sampled every 80 ms: FAIL = any <img> whose own src is a
   person picture (fig-/por-, not unknown-) shows an unknown-* background, or the identity-card stand-in (img.kidfig2) paints the silhouette picture.
   Also: kitModal warms its subject's figure (request seen before the dialog paints). usage: node dev/test/fig-load-ph.js <index.html> [WxH,...]  exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');
const PNG=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=','base64');
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));let hold=false;const seen=[];
  await p.route(/\/(fig|por)-[^/]*\.(webp|png|jpg)/,async r=>{const u=r.request().url();seen.push({u:u.replace(/^.*\//,''),t:Date.now()});if(hold&&!/unknown-/.test(u)){await new Promise(z=>setTimeout(z,1500))}try{return await r.continue()}catch(e){return r.fulfill({status:200,contentType:'image/png',body:PNG})}});
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true});
  await p.evaluate(()=>{['kdaytc','klife','kmrew','kxcatch','rtoast'].forEach(id=>{const e=document.getElementById(id);if(e)e.remove()})});
  hold=true;
  const sample=async(label,act)=>{await p.evaluate(act);let bad=[],n=0;for(let i=0;i<20;i++){if(i===3&&process.env.SHOT)await p.screenshot({path:`${process.env.SHOT}/${wh}-${label.replace(/[^a-z]+/gi,'-')}.jpg`,type:'jpeg',quality:70});const r=await p.evaluate(()=>{const out=[];let w=0;document.querySelectorAll('img').forEach(im=>{const s=im.getAttribute('src')||'';const bg=getComputedStyle(im).backgroundImage||'';if(im.hasAttribute('data-kwait'))w++;
     if(/(fig|por)-/.test(s)&&!/unknown-/.test(s)&&/unknown-/.test(bg)&&im.getClientRects().length)out.push(s.replace(/^.*\//,''));
     if(im.classList.contains('kidfig2')&&/unknown-fig/.test(s)&&!im.classList.contains('kphsil'))out.push('kidfig2 stranger stand-in')});return {out,w}});n=Math.max(n,r.w);bad.push(...r.out);await p.waitForTimeout(80)}
   bad=[...new Set(bad)];chk(`${wh} ${label}: no stranger silhouette on a loading person picture (${n} slots were loading)`,!bad.length,bad.slice(0,6))};
  await sample('place stage',async()=>{const v='?v='+Date.now();document.querySelectorAll('#tokens img.figimg').forEach(im=>{const s=im.getAttribute('src');if(s&&!/unknown-/.test(s))im.src=s.split('?')[0]+v});if(typeof render==='function')render()});
  const w0=seen.length;const sub=await p.evaluate(()=>{const P=(typeof curPeople==='function'?curPeople():[]).filter(x=>x&&typeof kitIsKnown==='function'&&kitIsKnown(x)&&typeof kitFigOf==='function'&&!/unknown-/.test(kitFigOf(x)));const x=P[0]||S.emp;window.__tp=x;return {n:x&&(x.name||x.n||x.kind),fig:kitFigOf(x).replace(/^.*\//,'')}});
  await sample('person dialog (kitModal subject)',async()=>{kitModal({kind:'info',title:'Thử hình',subject:window.__tp,html:'<p>Thử</p>'})});
  const warm=await p.evaluate(f=>!!(window.KWARM&&[...window.KWARM].some(u=>u.split('?')[0].endsWith(f))),sub.fig);chk(`${wh} kitModal warms the subject's figure (${sub.fig})`,warm||!sub.fig,{sub,warm});
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
  await sample('Hậu cung tab',async()=>{const t=[...document.querySelectorAll('#tabs button, .tabs button, nav button')].find(x=>/Hậu cung/.test(x.textContent));if(t)t.click()});
  chk(`${wh} no page errors`,!errs.length,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'FIG-LOAD-PH FAIL '+fails:'FIG-LOAD-PH PASS');process.exit(fails?1:0)})();
