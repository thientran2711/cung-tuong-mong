const {chromium}=require('playwright');const fs=require('fs');
const mode=process.argv[2],target=+process.argv[3]||300,tag=process.argv[4]||'a';
const D='/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad/';
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();
 page.on('pageerror',e=>{console.log('PAGEERR',mode,e.message.slice(0,200))});
 await page.goto('file://'+(process.env.GAME||D+'measure/snap.html'));await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.click('#slots button[data-new="1"]');page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))console.log('CONSOLE',m.text().slice(0,150))});
 await page.evaluate(`window.__servPolicy='${process.env.SERV||''}'`);await page.evaluate(fs.readFileSync(D+'measure/'+(process.env.INP||'inpage2.js')+'','utf8'));
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  if(true)fs.writeFileSync(D+'measure/res_'+mode+(process.env.SERV||'')+'_'+tag+'.json',JSON.stringify(await page.evaluate(()=>window.__res)));
  if(n>=target)break; if(Date.now()-t0>3400e3){console.log('time cap');break}}
 const res=await page.evaluate(()=>window.__res);
 fs.writeFileSync(D+'measure/res_'+mode+(process.env.SERV||'')+'_'+tag+'.json',JSON.stringify(res));fs.writeFileSync(D+'measure/ext_'+mode+(process.env.SERV||'')+'_'+tag+'.json',JSON.stringify(await page.evaluate(()=>window.__bot.extra())));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
