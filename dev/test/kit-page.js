/* trang mẫu kit (jkitpage, "#kit"): every sample renders without an error, no horizontal overflow, 0 page errors.
   usage: node dev/test/kit-page.js <url> [<outdir>] [<W>x<H>@dpr ...] */
const {chromium}=require('playwright');const a=process.argv.slice(2);const URL=a[0];const OUT=a[1]&&!/^\d+x/.test(a[1])?a[1]:null;
let SIZES=a.filter(x=>/^\d+x\d+@/.test(x));if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3'];
(async()=>{const b=await chromium.launch();const R={};const errs=[];let bad=0;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));
  await p.goto(URL+'#kit',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitSamplePage==='function'&&(KIT_INFOM.have||[]).length>0,null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}kitSamplePage()});await p.waitForTimeout(1500);
  const m=await p.evaluate(()=>{const pg=document.getElementById('kitpage');return{n:pg.querySelectorAll('.kitpg-s').length,err:[...pg.querySelectorAll('.kitpg-b > em.r')].map(e=>e.textContent),sw:pg.scrollWidth-pg.clientWidth,compact:[...pg.querySelectorAll('.kpanec button.ka')].map(x=>Math.round(x.getBoundingClientRect().width))}});
  const f=[];if(!m.n)f.push('no samples');if(m.err.length)f.push('errors '+m.err.join('; '));if(m.sw>1)f.push('h-overflow '+m.sw);bad+=f.length;R[SZ]=f.length?f:`ok ${m.n} samples, act widths ${m.compact}`;
  if(OUT){await p.waitForTimeout(6000);await p.screenshot({path:`${OUT}/kit-page-${SZ}.jpg`,type:'jpeg',quality:70,fullPage:false})}await ctx.close()}
 console.log(JSON.stringify({bad,R,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
