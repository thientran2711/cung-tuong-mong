/* palace-distance-shots: the «Ban cung» dialog of a Tần granted the far Hàm An cung (every card: «ngự giá: <word> (why)») + the log after a far visit
   (her own and an NPC's: «… dù ở xa vẫn được ngự giá») on Fold + iPad; copied from dev/test/ban-cung-shots.js.
   usage: bash dev/site/build_site.sh && node dev/test/palace-distance-shots.js <outdir>
   (was: SMALL-tier shots (go-live kit, owner OD:L1370 (b)): the owner's two devices first — Fold 755x1000 and iPad 1180x820 — real device
   profiles, HOST mode (dev/test/lib/device.js), the BUILT root index.html. Title, then a new life: home + every visible tab.
   usage: bash dev/site/build_site.sh && node dev/tools/shots.js <outdir> [device ...] [--no-net]   (default fold ipadAir; JPEG q70 @2x)
   CTM_ROOT=<dir> serves another built site. Look at every picture. Exit 1 on a page error or horizontal overflow. Pictures come from the CDN (--no-net = grey boxes, faster). */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const A=process.argv.slice(2);const OUT=A.find(a=>!a.startsWith('--')&&!D.DEVICES[a])||'shots';fs.mkdirSync(OUT,{recursive:true});
const DEVS=A.filter(a=>D.DEVICES[a]);const NET=!A.includes('--no-net');let bad=0;
(async()=>{const srv=await D.serveRoot(process.env.CTM_ROOT||undefined);const b=await chromium.launch();
 for(const dev of (DEVS.length?DEVS:['fold','ipadAir'])){const dd=D.DEVICES[dev];const tag=dd.w+'x'+dd.h;
  const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  if(!NET)await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(pg,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  await g.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:NET?60000:5000}).catch(()=>{});await g.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  const shot=async n=>{await pg.waitForTimeout(500);if(n!=='0-title')await g.evaluate(()=>{document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());['kroul','kroulw','dawn','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});await pg.screenshot({path:`${OUT}/${tag}-${n}.jpg`,type:'jpeg',quality:70});
   const o=await g.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0){bad++;console.log(`FAIL ${tag} ${n}: horizontal overflow ${o}px`)}};
  await shot('0-title');
  await g.evaluate(()=>{try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){start();if(!(S.origin&&S.origin.k==='cnv'))break}['kroul','kroulw','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
  await g.waitForFunction(()=>{['kroul','kroulw','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());
   /* scene overlays that open by themselves on the first day (card flip, night end…): press their own button, else lift them */
   for(const e of [...document.body.children]){if(e.id==='modal'||e.id==='title'||e.querySelector('#tabs'))continue;const cs=getComputedStyle(e),r=e.getBoundingClientRect();
    if(cs.position==='fixed'&&cs.display!=='none'&&r.width*r.height>=innerWidth*innerHeight*.8){const bt=e.querySelector('button.kbtn,button');if(bt&&!e.__qcPressed){e.__qcPressed=1;bt.click()}else e.remove()}}try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){}return !Q.length&&(window.__qcN=(window.__qcN||0)+1)>12},null,{timeout:60000,polling:150}).catch(()=>{});
  await g.evaluate(()=>{S.srv=null;S.resHead=null;S.rank=3;S.sung=60;for(const v of rivals)if(v.pal===PALN.indexOf("Hàm An cung"))v.pal=null;S.pal=PALN.indexOf("Hàm An cung");S.palCer=1;Q.length=0;palCeremony();render();showModal()});await pg.waitForTimeout(1500);
  await shot('pd-bancung');
  await g.evaluate(()=>{const L=[...document.querySelectorAll('#modal .opts button')];const x=L[L.length-1];if(x)x.scrollIntoView({block:'end'})});await shot('pd-bancung-end');
  await g.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const HA=PALN.indexOf("Hàm An cung"),TX=PALN.indexOf("Trường Xuân cung");S.danh=30;S.visNight=wk();nightFx(2);Q.length=0;
   const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&!x.coop);if(v){v.rank=Math.max(3,v.rank);v.pal=TX;v.visW=null;S.tonight=null;if(S.emp)S.emp.visit=null;window.visGo(v)}S.tonight=null;Q.length=0;tab="log";render()});await pg.waitForTimeout(1200);
  await shot('pd-log');
  if(process.env.BC_DBG)console.log(await g.evaluate(()=>[...document.querySelectorAll('#modal .opts button')].pop().outerHTML.slice(0,3000)));
  if(errs.length){bad++;console.log(`FAIL ${tag}: ${errs.length} page errors: ${errs[0]}`)}
  console.log(`${tag}: 3 shots -> ${OUT}`);await ctx.close()}
 await b.close();srv.close();console.log(bad?`SHOTS FAIL ${bad}`:'SHOTS OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
