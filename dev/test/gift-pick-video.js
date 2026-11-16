/* review/gift-pick: records the gift moment (real "Tặng quà" confirm → accepted; then a refused silk gift) as a video, for frame review.
   usage: node dev/test/gift-pick-video.js <url> <outdir> [WxH]   → <outdir>/*.webm (extract frames with ffmpeg) */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT,SZ]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',recordVideo:{dir:OUT,size:{width:W,height:H}}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(2000);
 await p.evaluate(()=>{try{kitRoulette=function(){}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(typeof S!=='undefined'&&S&&!(typeof isSrv==='function'&&isSrv()))break}});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S,null,{timeout:20000});
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroulw').forEach(e=>e.remove());S.inv.push({k:"tramngoc",from:"me"});S.inv.push({k:"luahang",from:"me"});try{KMS=S;KMSNAP=kmSnap()}catch(e){}
  const v=liveRivals(true).find(v=>v.queen)||liveRivals(true)[0];tab="rv";render();pushDil(mkP("giftpick",{v:v.id}),"Tặng quà");showModal();render()});
 await p.waitForTimeout(2500);await p.evaluate(()=>{const g=document.querySelector('#modal .kipgo');g&&g.click()});
 await p.waitForTimeout(5500);
 await p.evaluate(()=>{document.querySelectorAll('#rtoast').forEach(e=>e.remove());const src=kipItem({k:"luahang"}).src;window.__r=kitFxGiftCarry({x:innerWidth*.6,y:innerHeight*.35},{item:src,from:{x:innerWidth/2,y:innerHeight/2},wrap:"silk",refuse:true})});
 await p.waitForTimeout(5500);console.log(JSON.stringify({errs,log:await p.evaluate(()=>KFK.log.slice(-8))}));await ctx.close();await b.close()})().catch(e=>{console.error(e);process.exit(2)});
