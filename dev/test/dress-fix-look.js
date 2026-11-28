/* dress-fix-look (DRESS-FIX, owner OD 26/11 ~18:50Z (2)(3)) — node dev/test/dress-fix-look.js [dev/index.html] shotdir
   The dress picker «Trước gương đồng» Hồi 1 with the merged worn slots as a compact grid + the «Hoa điền» slot/tab; Fold 755x1000 + iPad 1180x820 stills @2. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);const SHOT=process.argv[3]||'.';
(async()=>{const b=await chromium.launch();let fails=0;
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof toilOpen==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   for(const k of ["hd_dao","hd_lan","hd_sen"])if(WD_ITEMS[k])S.inv.push({k});save();try{render()}catch(e){}});await p.waitForTimeout(1000);
  await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());try{kg82Close()}catch(e){}toilOpen();document.getElementById('toilrdy').click()});await p.waitForTimeout(1800);
  await p.screenshot({path:path.join(SHOT,`pre-${tag}.png`)});await p.evaluate(()=>{const t=document.querySelector('#kg82 [data-kinvtab="hd"]');if(t)t.click()});await p.waitForTimeout(400);
  const c=await p.$('#kg82 .toilinv [data-kinvi]');if(c){await c.click();await p.waitForTimeout(900)}
  /* the chest tap opens the item card (jkring-item «Rương trang phục», RV-185): tap its «Dán» to pick today's hoa điền, then close the card */
  {let tapped=false;for(const x of await p.$$('button')){if(!(await x.isVisible()))continue;if(/^\s*Dán/.test((await x.textContent())||'')){await x.click();tapped=true;break}}
   if(tapped)await p.waitForTimeout(700);await p.evaluate(()=>{try{if(typeof kitRingItem==='object'&&kitRingItem.close)kitRingItem.close()}catch(e){}});await p.waitForTimeout(400)}
  const r=await p.evaluate(()=>({slots:[...document.querySelectorAll('#kg82 .keqg .keql')].map(e=>e.textContent),hd:TOIL.st.hdk,
   over:(()=>{const b=document.querySelector('#kg82');return b?b.scrollWidth>b.clientWidth+1:false})()}));
  console.log(tag,JSON.stringify(r),errs.slice(0,2));if(errs.length||!r.hd||r.over)fails++;
  await p.screenshot({path:path.join(SHOT,`dress-fix-look-${tag}.png`)})}
 console.log(fails?'FAIL':'PASS');await b.close()})();
