require('./lib/bigpage');/* HARNESS-BIGPAGE (KK63): page bodies > 4 MB never go through route.fulfill */
/* review/thinhan-art: "Thỉnh an Thái hậu / Hoàng hậu" act cards show the new standing-curtsy picture (img/act-thinh-an-v2.webp on the CDN).
   usage: node dev/test/thinhan-art.js <URL> <W>x<H>@dpr <outdir> [before <old ACTS.json>]   ("before" serves the old manifest = old kneeling picture)
   Prints one JSON line: Lễ nghi greeting cards found with their picture, page errors. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,SZ,OUT,MODE,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=(MODE||'after')+'-'+WH;
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 if(MODE==='before')await ctx.route(/\/img\/ACTS\.json/,r=>r.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(OLD,'utf8')}));
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(90000);const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 await p.goto(URL,{waitUntil:'load'});await p.waitForTimeout(3000);
 const R={size:SZ,mode:MODE||'after'};
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start()});await p.waitForTimeout(3500);
 for(let i=0;i<10;i++){await p.evaluate(()=>{const ok=document.querySelector('[data-nl="ok"]');if(ok&&ok.offsetParent)ok.click()});await p.waitForTimeout(300)}
 R.start=await p.evaluate(()=>{try{Q.length=0;S.buoi=0;render();return {origin:S.origin&&S.origin.k,hh:!!(typeof qOn==='function'&&qOn()),thDead:!!S.thDead}}catch(e){return {err:String(e)}}});
 for(let i=0;i<8;i++)await p.evaluate(()=>{for(const id of ['ov','modal']){const m=document.getElementById(id);if(m&&!m.hidden){const bt=[...m.querySelectorAll('button')].find(x=>x.offsetParent&&!x.disabled);if(bt)bt.click()}}if(typeof Q!=='undefined')Q.length=0});
 await p.evaluate(()=>{const x=document.querySelector('#tabs [data-tab="act"]');if(x)x.click()});await p.waitForTimeout(2500);
 await p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
 R.cards=await p.evaluate(()=>[...document.querySelectorAll('button.ka.kcard')].filter(b=>/Thỉnh an|bái kiến|yết kiến|Chào hỏi đúng lễ/.test(b.textContent)).map(b=>{const im=b.querySelector('.kaart img');
   return{name:(b.querySelector('.kan')||b).textContent.trim().slice(0,40),img:im?(im.currentSrc||im.src):null,loaded:!!(im&&im.complete&&im.naturalWidth>0),cat:b.dataset.kart}}));
 const h=await p.$$('button.ka.kcard');let n=0;
 for(const el of h){const t=await el.textContent();if(/Thỉnh an (Thái hậu|Hoàng hậu)/.test(t)){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);
   await el.screenshot({path:`${OUT}/${tag}-card${++n}.png`})}}
 await p.screenshot({path:`${OUT}/${tag}-page.jpg`,type:'jpeg',quality:70});
 R.overflowX=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 R.errors=errs;console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.log(JSON.stringify({fatal:String(e)}));process.exit(1)});
