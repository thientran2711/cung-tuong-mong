/* dev/test/moment-shots.js — review shots of Khoảnh khắc chân dung (host mode): painter card, reward card, Tư trang bag (Lễ vật tab) with the portrait.
   usage: node dev/test/moment-shots.js <outdir>   (devices: fold 755x1000, ipadAir 1180x820; shots stay OUT of git) */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const fs=require('fs');
const OUT=process.argv[2]||'/tmp/moment-shots';fs.mkdirSync(OUT,{recursive:true});const sl=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const errs=[];
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(dev+': '+e.message));
  const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  await g.evaluate(()=>{try{kitReward=()=>{}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}window.__nlInner=0;
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});for(let j=0;j<12&&Q.length;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}}
   if(typeof menInit==="function")menInit();const pt=moPainter();S.month=11;S.tuan=2;S.buoi=0;S.moBusy=null;S.moY={};S.menW={[pt.id]:"vuon"};S.where=S.where||{};S.where.emp="vuon";
   S.place="vuon";render();S.menW={[pt.id]:"vuon"};S.where.emp="vuon";Q.length=0;moOffer("vuon");showModal();const pt2=moPainter()});
  const clr=async()=>{for(const f of [p,g])await f.evaluate(()=>{try{if(typeof kbootDone==='function')kbootDone()}catch(e){}document.querySelectorAll('#kboot,.kboot,#kload').forEach(x=>x.remove())}).catch(()=>{})};await sl(4000);await clr();
  await sl(2500);await p.screenshot({path:path.join(OUT,`${dev}-1-card.png`)});
  await g.evaluate(()=>{const r=Math.random;Math.random=()=>0.001;chooseM(0);Math.random=r});await sl(2000);await p.screenshot({path:path.join(OUT,`${dev}-2-reward.png`)});
  await g.evaluate(()=>{for(let k=0;k<3;k++)[...document.querySelectorAll("button")].filter(b=>/^\s*(Nhận|✕|×)\s*$/.test(b.textContent)&&b.offsetWidth).forEach(b=>b.click())});await sl(1200);await g.evaluate(()=>{Q.length=0;showModal();tab="inv";render();try{const t=[...document.querySelectorAll('.kcattabs button,.kcattabs [data-k]')].find(x=>/Lễ vật/.test(x.textContent));if(t)t.click()}catch(e){}});
  await sl(4500);await g.evaluate(()=>{for(let k=0;k<3;k++)[...document.querySelectorAll("button")].filter(b=>/^\s*(✕|×)\s*$/.test(b.textContent)&&b.offsetWidth).forEach(b=>b.click())});await sl(1200);await p.screenshot({path:path.join(OUT,`${dev}-3-bag.png`)});await ctx.close()}
 console.log(errs.length?'page errors: '+errs.slice(0,5).join(' | '):'no page errors');await b.close();srv.close&&srv.close()})().catch(e=>{console.error(e);process.exit(1)});
