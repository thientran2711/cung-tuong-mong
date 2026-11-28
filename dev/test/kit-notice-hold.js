/* kit-notice-hold.js (KK44, KIT §42.2a): the held thin chip — stays past BAL.entryToastMs, blinks (kntBlink), red state, comes back after another
   notice's chip, goes on kitNoticeDrop. usage: node dev/test/kit-notice-hold.js <index.html> [WxH,...] [shotDir]   exit 1 on any FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{let s=5;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kdaytc,.kdayt,#klife,#kload,#kboot,#kmrew{display:none!important;pointer-events:none!important}'}).catch(()=>{});/* the life-start day banner floats over the centre */await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.addStyleTag({content:'.kdayt{display:none!important;pointer-events:none!important}'});await p.waitForTimeout(1500);
  await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;try{kmReset()}catch(e){}document.getElementById('modal').hidden=true;['kload','kboot','klife'].forEach(i=>{const k=document.getElementById(i);if(k)k.remove()});const g=document.querySelector('[data-tab="go"]');if(g)g.click()});
  await p.waitForTimeout(900);const tag=wh;
  const st=()=>p.evaluate(()=>{const c=document.getElementById('kntchip');if(!c||c.classList.contains('out'))return {up:false};const cs=getComputedStyle(c);return {up:cs.visibility!=='hidden',txt:c.textContent.trim(),anim:cs.animationName,bg:cs.backgroundColor,bad:getComputedStyle(document.documentElement).getPropertyValue('--bad').trim(),y:Math.round(c.getBoundingClientRect().top),slot:c.dataset.slot}});
  await p.evaluate(()=>kitNotice({id:'t-close',line:'Nơi này sắp đóng cửa, mời tiểu chủ rời đi',sticky:1,hold:1,pulse:1}));await p.waitForTimeout(400);
  if(SHOT)await p.screenshot({path:`${SHOT}/hold-pulse-${W}.png`});
  const ms=await p.evaluate(()=>BAL.entryToastMs||5000);await p.waitForTimeout(ms+800);const a=await st();
  chk(`${tag} held chip still up after ${ms} ms, pulsing (kntPulse), at the top`,a.up&&/Nơi này sắp đóng cửa/.test(a.txt)&&a.anim==='kntPulse'&&a.y<H*0.25,a);
  await p.evaluate(()=>kitNotice('Một tin khác'));await p.waitForTimeout(400);const o=await st();chk(`${tag} another notice shows its own chip`,o.up&&/Một tin khác/.test(o.txt),o);
  await p.waitForTimeout(ms+800);const back=await st();chk(`${tag} after its ${ms} ms the held chip comes back`,back.up&&/sắp đóng cửa/.test(back.txt),back);
  await p.evaluate(()=>kitNotice({id:'t-close',line:'Đã quá giờ, mời tiểu chủ rời đi',sticky:1,hold:1,pulse:1,tone:'red'}));await p.waitForTimeout(500);const r=await st();
  if(SHOT)await p.screenshot({path:`${SHOT}/hold-red-${W}.png`});
  chk(`${tag} red state: same chip, red fill`,r.up&&/Đã quá giờ/.test(r.txt)&&/rgb\((1[3-9]\d|2\d\d), ?\d{1,2}\d?, ?\d{1,2}\d?\)/.test(r.bg),r);
  await p.evaluate(()=>kitNoticeDrop('t-close'));await p.waitForTimeout(700);const d=await st();chk(`${tag} kitNoticeDrop removes it`,!d.up,d);
  chk(`${tag} no page errors`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();console.log(fails?'KIT-NOTICE-HOLD FAIL '+fails:'KIT-NOTICE-HOLD PASS');process.exit(fails?1:0)})();
