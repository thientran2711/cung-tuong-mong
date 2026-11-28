/* kit-chip-mood.js (KK54, MAIN 171 option A): the notice chip (#kntchip) never hides the HUD mood slider's marker / fill (.ksbar *) nor any word / number of the HUD. Fold 755x1000 + iPad 1180x820 (+ any WxH list); still to <shotdir>.
   usage: node dev/test/kit-chip-mood.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:+process.env.DSF||1});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitNotice==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,7000));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position==='fixed'&&/Chạm để mở/.test(e.textContent)&&!e.contains(document.getElementById('stage')))e.style.display='none'}
   kitNotice({id:'t:chip:1',kind:'tin',line:'Thường tại Đậu Hân Duyệt đi vắng, đang ở Càn Ninh cung.',text:'Thường tại Đậu Hân Duyệt đi vắng, đang ở Càn Ninh cung.'});await new Promise(r=>setTimeout(r,900));
   const c=document.getElementById('kntchip');if(!c||getComputedStyle(c).visibility==='hidden')return {err:'no chip',slot:c&&c.dataset.slot};const q=c.getBoundingClientRect();
   const hud=document.querySelector('header.hud')||document.getElementById('hud');const mood=[...(hud||document).querySelectorAll('.ksbar *')].filter(e=>e.getClientRects().length).map(e=>e.getBoundingClientRect());
   const ov=mood.filter(m=>Math.min(q.right,m.right)-Math.max(q.left,m.left)>1&&Math.min(q.bottom,m.bottom)-Math.max(q.top,m.top)>1).length;
   return {slot:c.dataset.slot,rect:[Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)],moodParts:mood.length,over:ov}});
  if(SHOT)await p.screenshot({path:`${SHOT}/chip-${W}.png`});console.log('  ',wh,JSON.stringify(r));
  chk(wh+' chip shown (or the box carries it, no chip)',true,r);if(!r.err){chk(wh+' chip never over the mood marker / fill',r.over===0,r)}
  chk(wh+' no page errors',errs.length===0,errs.slice(0,2));await p.close()}
 await b.close();console.log(fails?'KIT-CHIP-MOOD FAIL '+fails:'KIT-CHIP-MOOD PASS');process.exit(fails?1:0)})();
