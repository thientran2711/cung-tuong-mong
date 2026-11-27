/* mg-play2 shots: rules + play of every kind this branch touched (law 11 group), at the owner's two devices.
   usage: node dev/test/mg-play2-shots.js dev/index.html <outdir> [kinds,comma]  → <kind>-<rules|play>-<WxH>.png @2 */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,F='dev/index.html',DIR='shots',KS='hoadien,den,duho,hat,banh,tho,td_ngon']=process.argv;fs.mkdirSync(DIR,{recursive:true});
const URL='file://'+path.resolve(F);const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();
 for(const [VW,VH] of [[755,1000],[1180,820]]){const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:2});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});
  await sleep(3000);
  for(const k of KS.split(',')){await p.evaluate(()=>{document.querySelectorAll('.kmbox').forEach(b=>{let r=b;while(r.parentElement&&r.parentElement!==document.body)r=r.parentElement;r.remove()});try{kg82Close()}catch(e){}});
   await p.evaluate(k=>mgCalRun(k),k);await sleep(2200);await p.screenshot({path:`${DIR}/${k}-rules-${VW}x${VH}.png`});
   await p.evaluate(()=>{const g=document.querySelector('#kg82 .kgr-go')||document.querySelector('#kg82go');g&&g.click()});await sleep(900);await p.evaluate(()=>{const b=[...document.querySelectorAll('#kg82 button')].find(x=>/Đã hiểu|bắt đầu/i.test(x.textContent));b&&b.click()});await sleep(k==='hoadien'?3000:5200);
   if(k==='hat'){await p.mouse.move(VW/2,VH/2);await p.mouse.down();await sleep(400);await p.mouse.up()}
   await p.screenshot({path:`${DIR}/${k}-play-${VW}x${VH}.png`});console.log('shot',k,VW)}
  console.log('errors',VW,errs.slice(0,3));await p.close()}
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
