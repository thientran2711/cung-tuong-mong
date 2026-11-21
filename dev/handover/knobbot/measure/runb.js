// usage: node dev/measure/runb.js <sens|rand> <lives> <outfile.json>   env: SEED=<n> (seeded Math.random), BALJ='{"hz":1.4}' SERV=keep|fire AFF=1 INP2=inx.js (extra counters) XJS='js run after load'
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2],target=+process.argv[3]||40,out=process.argv[4];
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html');
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:process.env.FAST!=='0'?'reduce':'no-preference'});if(process.env.FAST!=='0')await ctx.addInitScript(()=>{/* bot speed: visual-only DOM observers and focus off (rules untouched) */window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};});/* emotion-acts-3: SEED=<n> seeds Math.random (same generator as palstart.js / reign.js) so two arms start from the same stream */
 if(process.env.SEED)await ctx.addInitScript(`window.__seed=${+process.env.SEED};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 page.on('pageerror',e=>{console.log('PAGEERR',mode,e.message.slice(0,200))});
 await page.goto('file://'+GAME);await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='${process.env.SERV||''}';window.__aff=${process.env.AFF?1:0};window.__hhStop=${process.env.HHSTOP?1:0};window.__balO=${process.env.BALJ||'null'};window.__fairO=${process.env.FAIRJ||'null'};window.__j70O=${process.env.J70J||'null'};window.__origO=${process.env.ORIG?JSON.stringify(process.env.ORIG):'null'}`);
 await page.evaluate(fs.readFileSync(path.join(M,process.env.INP||'inpage5.js'),'utf8'));
 /* every bot dresses (inty.js, balance-pass): without it a robbed bot walks out in trung y, every place shows the walk-out card and the life
    sticks in one buổi (TIMEOUT, "HH 0 %" in run5b/run1b/run5e). Loaded once, even when INP2 does not list it; NOTY=1 turns it off. */
 const X2=(process.env.INP2?process.env.INP2.split(','):[]);if(!process.env.NOTY&&!X2.includes('inty.js'))X2.push('inty.js');
 for(const f of X2)await page.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 if(process.env.XJS)await page.evaluate(process.env.XJS);
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  fs.writeFileSync(out,JSON.stringify(await page.evaluate(()=>window.__res)));
  if(n>=target)break; if(Date.now()-t0>(+process.env.CAP||3400)*1e3){console.log('time cap');break}}
 fs.writeFileSync(out.replace(/\.json$/,'.ext.json'),JSON.stringify(await page.evaluate(()=>window.__bot.extra())));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
