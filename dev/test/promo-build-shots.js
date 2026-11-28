/* promo-build-shots: PHÂN CUNG panel (after the edict + a later move), a special-exam grant + the kỳ notice, on Fold + iPad (copy of ban-cung-shots).
   usage: bash dev/site/build_site.sh && node dev/test/promo-build-shots.js <outdir>
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
  /* 1. PHÂN CUNG after the edict (phanCungEdict: her + 3 kept girls) */
  await g.evaluate(()=>{Q.length=0;S.rank=1;S.sung=45;S.hh=40;S.th=30;const g=liveRivals(false).filter(x=>x.rank<3).slice(0,3);window.__pcT=0;
   window.phanCungEdict({list:[{p:S,fav:{E:3,T:1,H:2}}].concat(g.map(v=>({p:v,fav:{}}))),then:()=>{window.__pcT++}});render();showModal()});await pg.waitForTimeout(1500);
  await shot('phan-cung');
  await g.evaluate(()=>{const b=document.querySelector('#modal #mclose');if(b)b.scrollIntoView({block:'end'})});await shot('phan-cung-end');
  /* 2. a later promotion that moves her (Thường tại → Quý nhân under a new host) */
  await g.evaluate(()=>{Q.length=0;closeModal&&0;S.pb=S.pb||{};S.pb.hr=1;S.pb.hk="x";S.rank=2;S.resHead=null;palFix();render();showModal()});await pg.waitForTimeout(1200);
  await shot('phan-cung-later');
  /* 3. a special exam granted (favour) + the kỳ notice in the log, Mệnh truyện › Sắc phong chips */
  await g.evaluate(()=>{Q.length=0;delete S.ex;delete S.pbs;S.danh=0;S.lastPromo=S.turn;S.sung=pbSungCut(S);const t=pbTry(S);if(t)log(t);S.pb.kn=null;
   for(let i=0;i<14&&!pbKyAt(pbA());i++){monthTick();Q.length=0}S.pb.kn=null;exTick();Q.length=0;render();showModal();
   try{kitView&&kitView("story")}catch(e){}try{const b=[...document.querySelectorAll('#tabs button,[data-tab]')].find(x=>/Mệnh/.test(x.textContent));if(b)b.click()}catch(e){}});await pg.waitForTimeout(1200);
  await shot('ky-log');
  console.log('LOG',JSON.stringify(await g.evaluate(()=>(S.logs||[]).slice(0,6).map(x=>String(x.t||x).replace(/<[^>]+>/g,'').slice(0,260)))));
  /* 4. promo-build-2: SHE is the Hoàng hậu → «Hoàng hậu đề cử» option sheet (kit Q options) */
  await g.evaluate(()=>{Q.length=0;const q0=queenP();if(q0&&q0!==S){q0.queen=false;q0.rank=6}S.rank=7;S.lastPromo=S.turn;for(let i=0;i<14&&pbKyAt(pbA());i++){monthTick();Q.length=0}
   const ch=pbHhCut(S);liveRivals(false).filter(x=>x.rank<3&&!x.confined&&!x.coop).slice(0,3).forEach((x,i)=>{delete x.ex;delete x.pbs;x.hh=ch+5+i;x.th=60;x.sung=0;x.danh=0;x.lastPromo=S.turn;x.confined=0;try{k61Meet&&k61Meet(x)}catch(e){}});
   pbHhMeOpen();render();showModal()});await pg.waitForTimeout(1500);
  await shot('hh-decu');
  /* 5. promo-build-2: deathbed exam panel (lâm bệnh nguy kịch) */
  await g.evaluate(()=>{Q.length=0;S.rank=2;S.sung=S.danh=S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex;delete S.pbs;S.ill={k:"lao",st:3,known:true};
   const f0=exSimC;exSimC=function(p){const r=f0(p);r.pass=true;r.total=Math.max(r.total,r.P.bar);return r};try{const t=pbDeath(S);if(t)log(t)}finally{exSimC=f0}render();showModal()});await pg.waitForTimeout(1500);
  await shot('deathbed');
  if(errs.length){bad++;console.log(`FAIL ${tag}: ${errs.length} page errors: ${errs[0]}`)}
  console.log(`${tag}: 6 shots -> ${OUT}`);await ctx.close()}
 await b.close();srv.close();console.log(bad?`SHOTS FAIL ${bad}`:'SHOTS OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
