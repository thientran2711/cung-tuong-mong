/* kit-marks sample sheet: opens the kit page and screenshots the samples that show marks / ranks / relations / seals / chips.
   usage: node dev/test/kit-marks.js <url> <out.jpg> <WxH@dpr> <id,id,...>   (ids = data-kit of the kit page sections, matched by title substring too) */
const {chromium}=require('playwright');const [URL,OUT,SZ,IDS]=process.argv.slice(2);const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 p.on('pageerror',e=>console.log('PAGEERR',e.message.slice(0,200)));
 await p.goto(URL+'#kit',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitSamplePage==='function',null,{timeout:60000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}kitSamplePage()});await p.waitForTimeout(1500);
 const want=(IDS||'').split(',').filter(Boolean);
 await p.evaluate(w=>{const pg=document.getElementById('kitpage');[...pg.querySelectorAll('.kitpg-s')].forEach(s=>{const t=s.querySelector('.kpst').textContent;if(w.length&&!w.some(x=>t.includes(x)))s.remove()})},want);
 await p.waitForTimeout(800);
 const el=await p.$('#kitpage');const full=await p.evaluate(()=>{const pg=document.getElementById('kitpage');pg.style.height='auto';pg.style.maxHeight='none';pg.style.overflow='visible';return pg.scrollHeight});
 await p.setViewportSize({width:W,height:Math.min(full+20,9000)});await p.waitForTimeout(600);
 await p.screenshot({path:OUT,type:'jpeg',quality:72,fullPage:true});await b.close()})();
