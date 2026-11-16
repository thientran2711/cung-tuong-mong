const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tdsSync==='function');await p.waitForTimeout(6000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
 const keys=(process.env.KEYS?process.env.KEYS.split(','):null)||await p.evaluate(()=>ARTS.filter(a=>wkKindsOf(a.k).some(x=>WKR[x])).map(a=>a.k).concat(tdsKinds().map(k=>TDS_OF[k])));
 console.log(keys.join(','));
 for(const k of keys){
  await p.evaluate(k=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());S.buoi=0;used=0;S.bac=300;S.suc=90;for(const x of ARTS)S.arts[x.k]=Math.max(S.arts[x.k]||0,3);render();wkAsk(k,"prac",()=>{})},k);
  await p.waitForTimeout(1500);
  const r1=await p.evaluate(()=>({t:document.getElementById('mt').textContent,img:[...document.querySelectorAll('#modal img')].filter(i=>!/item-tp/.test(i.src)).map(i=>i.src.split('/').pop())}));
  await p.screenshot({path:`${OUT}/${k}-1.jpg`,type:'jpeg',quality:50});
  await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kshgo')].find(b=>!b.disabled);b.click()});await p.waitForTimeout(3500);
  const r2=await p.evaluate(()=>({t:document.getElementById('mt').textContent,img:[...document.querySelectorAll('#modal .kdlgart img')].map(i=>i.src.split('/').pop()),opt:[...document.querySelectorAll('#modal .opts>button')].map(b=>b.dataset.kopic+'')}));
  await p.screenshot({path:`${OUT}/${k}-2.jpg`,type:'jpeg',quality:50});
  console.log(k,JSON.stringify(r1),JSON.stringify(r2));
 }
 console.log('errs',errs);await b.close()})();
