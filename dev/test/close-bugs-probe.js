/* close-bugs probe: boots a fresh game and runs a page function given as argv[3] file (returns JSON). usage: node dev/test/close-bugs-probe.js <url> <fn.js> [WxH] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,FN,SZ]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
  Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
  const s=document.createElement("style");s.textContent=".kroul{display:none!important}";document.head.appendChild(s);tab="go";render()});
 for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;start()}return s});if(!srv)break}
 await p.evaluate(()=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;tab="go";render()});
 await p.waitForTimeout(800);
 const r=await p.evaluate(fs.readFileSync(FN,'utf8'));console.log(JSON.stringify({r,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
