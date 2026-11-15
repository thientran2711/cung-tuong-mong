/* KIT §54 at the supported sizes: a 3-item gift box mid-reveal + its final list, a kitGain reveal, a loss card. Checks every piece fits the
   screen (no horizontal overflow, overlay content inside the viewport) and saves small JPEG shots. review/game-feel.
   usage: node dev/test/sw-serve.js 8955 <repo root>  (another shell);  node dev/test/reveal-shots.js http://localhost:8955/ <outdir> [WxH,WxH…]
   Default sizes 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (direct mode: the design canvas scales every size from 1180x820 / 755x1000). */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SIZES=(SZ||'755x1000,1000x755,1180x820,1366x1024,844x390').split(',').map(s=>s.split('x').map(Number));
(async()=>{const b=await chromium.launch();const F=[];const rows=[];
 for(const [W,H] of SIZES){const c=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitLose,null,{timeout:180000});
  await p.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:240000}).catch(()=>{});
  await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));document.querySelectorAll('#kload').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
   setInterval(()=>document.querySelectorAll('[id^=kroul],.kroul-ov').forEach(e=>e.remove()),150);Q.length=0;document.getElementById('modal').hidden=true;render();await wait(400);document.querySelectorAll('[id^=kroul],.kroul-ov,#dawn,.kmov').forEach(e=>e.remove());if(window.KMQ)KMQ.length=0;kmBusy=false;
   const it=k=>{const I=kitItemInfo(k);return{n:I.name,d:(IT[k]||{}).d||"",img:I.src,tier:I.grade}};kitReward({kind:'gift',title:'Hộp gấm',from:'Lục Tuyết Dao tặng',items:['tuithom','nhansam','gamto'].map(it),bac:20})});
  const fit=async tag=>{const r=await p.evaluate(()=>{const o=[...document.querySelectorAll('.kmov .kmrew,.kmov .krev,#modal:not([hidden]) .dlg,#modal:not([hidden]) .kpanel')].filter(e=>e.offsetWidth);const R=o.map(e=>e.getBoundingClientRect());
    return{sw:document.documentElement.scrollWidth,iw:innerWidth,ih:innerHeight,out:R.filter(r=>r.left<-1||r.right>innerWidth+1||r.top<-1||r.bottom>innerHeight+1).map(r=>[r.left,r.top,r.right,r.bottom].map(Math.round))}});
   if(r.sw>r.iw+1)F.push(`${W}x${H} ${tag}: horizontal overflow ${r.sw}>${r.iw}`);if(r.out.length)F.push(`${W}x${H} ${tag}: piece outside the screen ${JSON.stringify(r.out)}`);return r};
  await p.waitForSelector('#kmrew',{timeout:20000});await p.waitForTimeout(500);await p.mouse.click(W/2,H/2);
  await p.waitForSelector('#kmrew .kmspot .krev',{timeout:20000});await p.waitForTimeout(900);await fit('reveal');await p.screenshot({path:`${OUT}/rev-${W}x${H}.jpg`,type:'jpeg',quality:55});
  await p.waitForSelector('#kmrew .kmrew.km-done',{timeout:40000});await p.waitForTimeout(500);await fit('list');await p.screenshot({path:`${OUT}/list-${W}x${H}.jpg`,type:'jpeg',quality:55});
  await p.click('#kmrew [data-km-close]');await p.waitForTimeout(600);
  await p.evaluate(()=>{S.inv.push({k:'vongngoc'});render()});await p.waitForTimeout(400);
  await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));for(let i=0;i<20;i++){const v=document.querySelector('.kmov');if(!v){await wait(150);continue}if(v.classList.contains('kfgain'))break;v.click();await wait(300)}});
  if(await p.$('.kmov.kfgain')){await p.waitForTimeout(900);await fit('gain');await p.screenshot({path:`${OUT}/gain-${W}x${H}.jpg`,type:'jpeg',quality:55});await p.waitForTimeout(500);await p.mouse.click(W/2,H-20);await p.waitForTimeout(700)}
  else F.push(`${W}x${H}: no kitGain overlay`);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const i=S.inv.findIndex(e=>e.k==='vongngoc');S.inv.splice(i,1);log(`Hoàng hậu sai người tịch thu ${IT.vongngoc.n} của ngươi vì vượt phẩm.`);render()});
  await p.waitForTimeout(1900);const card=await p.evaluate(()=>{const M=document.getElementById('modal');return M&&!M.hidden&&!!M.querySelector('.kpsubj .kitem.klsfall')});if(!card)F.push(`${W}x${H}: no loss card`);
  else{await fit('lose card');await p.screenshot({path:`${OUT}/lose-${W}x${H}.jpg`,type:'jpeg',quality:55})}
  if(errs.length)F.push(`${W}x${H} page errors: ${errs.join(' | ')}`);rows.push(`${W}x${H}: reveal + list + gain + lose card ${card?'ok':'MISSING'}, errors ${errs.length}`);await c.close()}
 for(const r of rows)console.log(r);console.log(F.length?'FAIL\n'+F.join('\n'):'PASS');await b.close();process.exit(F.length?1:0)})();
