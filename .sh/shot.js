const {chromium}=require('playwright');const [url,tag]=[process.argv[2],process.argv[3]];
const sizes=process.argv[4]?JSON.parse(process.argv[4]):[[1180,820,2],[755,1000,2]];
(async()=>{const b=await chromium.launch();
 for(const [w,h,d] of sizes){const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:d});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1200);
 await p.evaluate(()=>{window.__bot={pre:1};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});
 const info=await p.evaluate(()=>{Q.length=0;S.an=1;S.mat=2;S.th=10;S.suc=80;S.bac=300;let n=0;
  for(let r=0;r<3;r++){used=0;S.buoi=r%3;deal();for(let i=0;i<deck.length&&n<8;i++){const a=deck[i];if(!a||a.done||!canPay(a)||a.lock||!can(cardCost(a))||(a.b!=null&&(S.buoi||0)!==a.b)||Q.length)continue;act(i);n++;let g=0;while(Q.length&&g++<5){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}if(S.mg){S.mg=null;try{kg82Close(true)}catch(e){}}}}
  return {n,logs:S.logs.slice(0,12).map(x=>String(x).replace(/<[^>]+>/g,""))}});
 console.log(w+'x'+h,JSON.stringify(info,null,0));
 await p.evaluate(()=>{const o=document.getElementById('kroul');if(o)o.remove();const sk=document.querySelector('.krskip');if(sk)sk.click();document.querySelectorAll('.kmodal,.kdim').forEach(e=>{});});
 await p.waitForTimeout(500);await p.evaluate(()=>{const o=document.getElementById('kroul');if(o)o.remove();const b=document.querySelector('#tabs [data-tab="log"]');if(b)b.click();else{const g=document.querySelector('#tabs [data-tab="story"]');if(g){g.click();const b2=document.querySelector('#tabs [data-tab="log"]');if(b2)b2.click()}}});
 await p.waitForTimeout(800);
 const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 await p.screenshot({path:`.sh/${tag}-${w}x${h}-log.png`,animations:'disabled',timeout:90000});console.log('overflowX',ov,'errs',errs.length,errs.slice(0,2));await c.close()}
 await b.close()})();
