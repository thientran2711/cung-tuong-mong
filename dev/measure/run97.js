// usage: node dev/measure/run97.js <sens|rand> <lives> <outfile.json>   (= runb.js + rare97.js; env GAME, R97P = R97CFG.p, PICK=0 to never take the rare option)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2],target=+process.argv[3]||30,out=process.argv[4];
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html');
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});await ctx.addInitScript(()=>{window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};});const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 page.on('pageerror',e=>{console.log('PAGEERR',e.message.slice(0,200))});
 await page.goto('file://'+GAME);await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.click('#slots button[data-new="1"]');
 await page.evaluate(`window.__servPolicy='';window.__aff=0;window.__hhStop=0;window.__balO=null;window.__fairO=null;window.__j70O=null;window.__origO=${process.env.ORIG?JSON.stringify(process.env.ORIG):'null'};window.__r97pick=${process.env.PICK==='0'?0:1};try{if(${process.env.R97P||0})R97CFG.p=${process.env.R97P||1}}catch(e){}`);
 await page.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));
 await page.evaluate(fs.readFileSync(path.join(M,'rare97.js'),'utf8'));
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  fs.writeFileSync(out,JSON.stringify({res:await page.evaluate(()=>window.__res.map(r=>({origin:r.origin,fate:r.fate,title:r.title,maxRank:r.maxRank,years:r.years}))),r97:await page.evaluate(()=>window.__r97res)}));
  if(n>=target)break; if(Date.now()-t0>(+process.env.CAP||3400)*1e3){console.log('time cap');break}}
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
