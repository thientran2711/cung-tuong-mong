// runpets.js = runb.js + per-life pet fields (petSaved, pets) and window.PETSTAT at the end (review/pets)
// usage: node dev/measure/runpets.js <sens|rand> <lives> <outfile.json>   env: BALJ='{"hz":1.4}' SERV=keep|fire AFF=1
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2],target=+process.argv[3]||40,out=process.argv[4];
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html');
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});if(process.env.FAST!=='0')await ctx.addInitScript(()=>{/* bot speed: visual-only DOM observers and focus off (rules untouched) */window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};});const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 page.on('pageerror',e=>{console.log('PAGEERR',mode,e.message.slice(0,200))});
 await page.goto('file://'+GAME);await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='${process.env.SERV||''}';window.__aff=${process.env.AFF?1:0};window.__balO=${process.env.BALJ||'null'}`);
 await page.evaluate(fs.readFileSync(path.join(M,process.env.INP||'inpage5.js'),'utf8'));
 await page.evaluate(()=>{const o2=over;over=function(){const n0=window.__res.length;const r=o2.apply(this,arguments);try{const x=window.__res[window.__res.length-1];if(x&&window.__res.length>n0){x.petSaved=S.petSaved||0;x.pets=(S.pets||[]).map(p=>p.t).join(',')}}catch(e){}return r}});
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  fs.writeFileSync(out,JSON.stringify(await page.evaluate(()=>window.__res)));
  if(n>=target)break; if(Date.now()-t0>(+process.env.CAP||3400)*1e3){console.log('time cap');break}}
 fs.writeFileSync(out.replace(/\.json$/,'.ext.json'),JSON.stringify(await page.evaluate(()=>({extra:window.__bot.extra(),pet:window.PETSTAT||null}))));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
