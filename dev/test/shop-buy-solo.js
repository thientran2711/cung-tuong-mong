/* shop-buy-solo (review/tut-road, law 11 whole family): every solo kit shop (kitShop: Nội vụ phủ key "nvp", pet shop key "pet" — the only two
   kitShop({key}) in the code) really runs a purchase when its tile's buy button is tapped: bạc goes down and (nvp) the chest grows / (pet) the
   money is paid (the pet itself is a chance). Fault caught: kitShopBuy set o=B(key)=undefined in solo → no tap ever bought anything.
   usage: NODE_PATH=$(npm root -g) node dev/test/shop-buy-solo.js <built page url> */
const {chromium}=require('playwright');const {autoDismissRoulette,dismissRoulette}=require('./lib/roulette');
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];let fail=0;const chk=(n,c,x)=>{if(!c)fail++;console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,400))};
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await autoDismissRoulette(ctx);
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(30000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(800);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin='tt';start()});
 await dismissRoulette(p);await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.ms,null,{timeout:60000});await p.waitForTimeout(800);
 for(const [key,open] of [['nvp',()=>{S.bac=2000;S.shop=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<80).slice(0,4);kitShopNvp()}],['pet',()=>{S.bac=2000;petShop()}]]){
  await p.evaluate(()=>{Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}});
  const e=await p.evaluate(`(${open.toString()})();null`).catch(x=>String(x));await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(600);
  const r=await p.evaluate(()=>{const e=document.querySelector('#modal [data-kshbuy]:not([disabled])');if(!e)return{err:'no enabled buy button'};const b0=S.bac,n0=S.inv.length;e.click();return{b0,b1:S.bac,n0,n1:S.inv.length}});
  chk(`${key}: tapping Mua pays bạc${key==='nvp'?' and puts the item in the chest':''}`,!e&&!r.err&&r.b1<r.b0&&(key==='pet'||r.n1>r.n0),[e,r])}
 console.log(errs.length?'page errors: '+JSON.stringify(errs.slice(0,4)):'0 page errors');
 await b.close();process.exit(fail||errs.length?1:0)})();
