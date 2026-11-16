/* square-icons scan: round clickable elements (button / role=button / cursor:pointer) across the main screens.
   usage: node dev/test/square-icons-scan.js <url> <outdir> [WxH,...]   -> prints JSON of round clickables per size/screen */
const {chromium}=require('playwright');const [,,URL,OUT,SZ]=process.argv;const sizes=(SZ||'755x1000,1180x820').split(',');
const SCAN=()=>{const out=[];const seen=new Set();document.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height||r.width>90||r.height>90||r.width<10)return;
 const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;
 const clk=e.matches('button,[role=button],a,[data-rail],[onclick]')||cs.cursor==='pointer';if(!clk)return;
 const br=parseFloat(cs.borderTopLeftRadius)||0;const pct=/%/.test(cs.borderTopLeftRadius);const rad=pct?br/100*Math.min(r.width,r.height):br;
 if(rad>=Math.min(r.width,r.height)/2-1){const k=(e.className||e.tagName)+'|'+Math.round(r.width)+'x'+Math.round(r.height);if(seen.has(k))return;seen.add(k);
  out.push({cls:String(e.className||'').slice(0,50),id:e.id,tag:e.tagName,w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),y:Math.round(r.top),txt:(e.textContent||'').trim().slice(0,12),title:e.getAttribute('title')||e.getAttribute('aria-label')||''})}});return out};
(async()=>{const b=await chromium.launch();const all={};
 for(const sz of sizes){const [W,H]=sz.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kcoach,.kcoach,.kcf,#kcf,.kflip,#kflip').forEach(e=>e.remove());try{S.tutDone=1}catch(e){}tab='act';render()});await p.waitForTimeout(1500);
  const R={};const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-t],#tabs button')].map(e=>e.dataset.t||e.textContent.trim()));
  R.main=await p.evaluate(SCAN);await p.screenshot({path:`${OUT}/scan-${sz}-main.jpg`,type:'jpeg',quality:60});
  for(const t of ['act','me','harem','map','inv','shop','story','set']){try{await p.evaluate(t=>{tab=t;render()},t);await p.waitForTimeout(700);R['tab:'+t]=await p.evaluate(SCAN)}catch(e){R['tab:'+t]='ERR '+e.message.slice(0,80)}}
  R.tabs=tabs;R.errs=errs;all[sz]=R;await ctx.close()}
 console.log(JSON.stringify(all,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
