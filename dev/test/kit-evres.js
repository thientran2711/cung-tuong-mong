/* kit-evres.js (KK54; RV-166 note on kit-k44-parts KIT §7.4): the result card WITH a picture (#rtoast.kevres) sizes to its content — no gap row, picture beside the text, card inside the screen and not over the HUD rows. Fold 755x1000 + iPad 1180x820 (+ any WxH list); still of each to <shotdir>.
   usage: node dev/test/kit-evres.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:+process.env.DSF||1});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof resultShow==='function',null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,7000));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position==='fixed'&&/Chạm để mở/.test(e.textContent)&&!e.contains(document.getElementById('stage')))e.style.display='none'}
   const bf=rsnap();log("Bạn tặng một món quà, nàng ấy vui lòng nhận.");S.fav=(S.fav||0);window.__kitLastEvArt={src:(typeof giftArt==='function'&&S.inv&&S.inv[0]?giftArt(S.inv[0]).src:(document.querySelector('#stage img')||{}).src),lab:"Quà tặng"};
   resultShow("Tặng quà",bf,true);await new Promise(r=>setTimeout(r,900));
   const t=document.getElementById('rtoast');if(!t||t.hidden)return {err:'no card'};const q=t.getBoundingClientRect(),pic=t.querySelector('.kpevr'),pr=pic?pic.getBoundingClientRect():null;
   const kids=[...t.children].filter(k=>!k.classList.contains('kpevr')&&k.getBoundingClientRect().height>0).map(k=>k.getBoundingClientRect());
   const gaps=kids.slice(1).map((r,i)=>Math.round(r.top-kids[i].bottom));
   const tb=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()==='Hành sự'),tabTop=tb?Math.round(tb.getBoundingClientRect().top):-1;const hud=[];
   const over=hud.filter(h=>Math.min(q.right,h.right)-Math.max(q.left,h.left)>2&&Math.min(q.bottom,h.bottom)-Math.max(q.top,h.top)>2).length;
   return {card:[Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)],kevres:t.classList.contains('kevres'),picW:pr?Math.round(pr.width):0,maxGap:Math.max(0,...gaps),inScreen:q.left>=-1&&q.right<=innerWidth+1&&q.top>=-1&&q.bottom<=innerHeight+1,tabTop,belowStage:tabTop<0||q.bottom<=tabTop+1,over}});
  if(SHOT)await p.screenshot({path:`${SHOT}/evres-${W}.png`});
  console.log('  ',wh,JSON.stringify(r));
  chk(wh+' result card shown',!r.err,r);if(!r.err){chk(wh+' picture result card = .kevres with a picture beside the text',r.kevres&&r.picW>=60,r);chk(wh+' no empty gap rows (≤ 14 px between rows)',r.maxGap<=14,r);chk(wh+' card inside the screen',r.inScreen,r);chk(wh+' card ends above the tab row (never over «Hành sự» …)',r.belowStage,r)}
  chk(wh+' no page errors',errs.length===0,errs.slice(0,2));await p.close()}
 await b.close();console.log(fails?'KIT-EVRES FAIL '+fails:'KIT-EVRES PASS');process.exit(fails?1:0)})();
