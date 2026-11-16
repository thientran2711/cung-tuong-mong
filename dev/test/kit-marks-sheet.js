/* kit-marks sample sheet: one PNG per kit-page section (by id/title substring).
   usage: node dev/test/kit-marks-sheet.js <url> <outdir> <tag> <WxH@dpr> <sub1|sub2|...> */
const {chromium}=require('playwright');const fs=require('fs');
const [URL,OUT,TAG,SZ,SUBS]=process.argv.slice(2);const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 await p.goto(URL+'#kit',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitSamplePage==='function',null,{timeout:60000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}kitSamplePage()});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const h=document.querySelector('.kitpg-h');if(h)h.style.display='none'});
 await p.waitForLoadState('networkidle',{timeout:15000}).catch(()=>{});await p.waitForTimeout(2500);
 const subs=SUBS.split('|');let i=0;
 for(const sub of subs){const hs=await p.$$('#kitpage .kitpg-s');for(const h of hs){const t=await h.$eval('.kpst',e=>e.textContent);if(t.toLowerCase().includes(sub.toLowerCase())){await h.screenshot({path:`${OUT}/${TAG}-${String(i).padStart(2,'0')}.png`});console.log(i,t.slice(0,50));i++}}}
 await b.close()})();
