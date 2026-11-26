/* ONE SIEVE still: the NIGHT card (jne kitNightEnd) after a night that made the harem jealous (every live consort ghen +8, one +12),
   the case MAIN 157 reported as a «Kèm» wall. usage: node dev/test/one-sieve-night.js <page.html> <out.png> <w> <h> [seed] */
const {chromium}=require('playwright');const path=require('path');
const [PG,OUT,W,H,SD]=process.argv.slice(2);const SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+W,height:+H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(PG),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1500);
 const r=await p.evaluate((SEED)=>{let s=SEED*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
  for(let i=0;i<8;i++){try{nextBuoi()}catch(e){}Q.length=0;S.mg=0}render();document.querySelectorAll('.kbk,.dawn,#curtain,#klife,#kmrew,.kmcal,#kdaytc').forEach(e=>e.remove());
  Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove());if(typeof kmReset==='function')kmReset();render();const bf=rsnap();const L=liveRivals(true).filter(v=>v&&v!==S);L.forEach((v,i)=>{v.ghen=(v.ghen||0)+(i===0?12:8)});window.__bot=0;
  kitNightEnd({tier:'normal',m0:1,m1:1,before:bf,items:[],line:'Nến đỏ cháy suốt canh khuya.'});return L.length},SEED);
 await p.waitForTimeout(3500);await p.screenshot({path:OUT});console.log(JSON.stringify({consorts:r,errs:errs.slice(0,3)}));await b.close()})();
