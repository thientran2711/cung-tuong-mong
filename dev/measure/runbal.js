// usage: node dev/measure/runbal.js <sens|rand> <lives> <outfile.json>
// runb + j72 quest bot (inq72) + night/Sủng stats (inbal). env: BALJ='{"hz":1.4}' FAIRJ='{"eff":1}' Q72J='{"p":.3}' XJ='{"GLOBAL":v}' Q72OFF=1 CAP=seconds GAME=path
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2],target=+process.argv[3]||40,out=process.argv[4];
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html');
(async()=>{
 const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());
 await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 page.on('pageerror',e=>{console.log('PAGEERR',mode,e.message.slice(0,200))});
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='${process.env.SERV||''}';window.__aff=${process.env.AFF?1:0};window.__balO=${process.env.BALJ||'null'};window.__fairO=${process.env.FAIRJ||'null'};window.__q72O=${process.env.Q72J||'null'};window.__xO=${process.env.XJ||'null'};window.__q72off=${process.env.Q72OFF?1:0}`);
 for(const f of ['inpage5.js','inq72.js','inbal.js'].concat(process.env.EXTRA?process.env.EXTRA.split(','):[]))await page.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,200),[mode]);
  fs.writeFileSync(out,JSON.stringify(await page.evaluate(()=>window.__res)));
  if(n>=target)break; if(Date.now()-t0>(+process.env.CAP||3400)*1e3){console.log('time cap');break}}
 fs.writeFileSync(out.replace(/\.json$/,'.ext.json'),JSON.stringify(await page.evaluate(()=>window.__bot.extra())));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
