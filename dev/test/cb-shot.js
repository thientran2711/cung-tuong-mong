/* close-bugs: boot, run setup fn file (argv[3]) in page, wait, screenshot to argv[4]; prints fn result + modal info. usage: node cb-shot.js url fn.js out.jpg WxH */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');
const [,,URL,FN,OUT,SZ]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
  const s=document.createElement("style");s.textContent=".kroul{display:none!important}";document.head.appendChild(s);tab="go";render()});
 for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;try{nlNew()}catch(e){}start()}return s});if(!srv)break}
 await p.evaluate(()=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;tab="go";render()});
 await p.waitForTimeout(800);
 await p.waitForTimeout(+(process.env.CBW||0));const r=await p.evaluate(fs.readFileSync(FN,'utf8'));await p.waitForTimeout(1500);
 if(OUT)await p.screenshot({path:OUT,type:'jpeg',quality:70});
 const m=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;return{t:document.getElementById('mt').textContent,txt:M.innerText.replace(/\s+/g,' ').slice(0,600)}});
 console.log(JSON.stringify({r,m,errs,hovf:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
