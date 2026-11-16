/* square-icons shots: the stage rail (top-left of the room scene) + full screen, @2, for the before/after sheet.
   usage: node dev/test/square-icons-shot.js <url> <outdir> <prefix> [WxH,...]  -> <outdir>/<prefix>-<WxH>.png (full) + <prefix>-<WxH>-crop.png (stage top-left 300x330 CSS px)
   also prints the rail button boxes (CSS px) per size. */
const {chromium}=require('playwright');const [,,URL,OUT,PRE,SZ]=process.argv;const sizes=(SZ||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();const res={};
 for(const sz of sizes){const [W,H]=sz.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kcoach,.kcoach,.kcf,#kcf,.kflip,#kflip').forEach(e=>e.remove());try{S.tutDone=1}catch(e){}tab='act';render()});await p.waitForTimeout(2000);
  res[sz]=await p.evaluate(()=>[...document.querySelectorAll('#krail [data-rail]')].map(e=>{const r=e.getBoundingClientRect();const c=getComputedStyle(e);return{id:e.dataset.rail,x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),radius:c.borderTopLeftRadius}}));
  await p.screenshot({path:`${OUT}/${PRE}-${sz}.png`});
  const st=await p.evaluate(()=>{const r=document.getElementById('stage').getBoundingClientRect();return{x:r.left,y:r.top}});
  await p.screenshot({path:`${OUT}/${PRE}-${sz}-crop.png`,clip:{x:Math.max(0,st.x),y:Math.max(0,st.y),width:300,height:330}});
  await ctx.close()}
 console.log(JSON.stringify(res));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
