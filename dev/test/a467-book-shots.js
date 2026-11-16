/* act-pics2 a467: Tuần lục "Tổng lược" page shots after a few of her lines (one with its own ACTS picture, one with none).
   usage: node dev/test/a467-book-shots.js <build url> <outdir>  → <outdir>/book-<W>x<H>.jpg; prints overflow, broken images, page errors per size */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SIZES=process.env.ONE?[[755,1000,2]]:[[755,1000,2],[1000,755,1],[1180,820,2],[1366,1024,2],[844,390,1],[390,844,1]];
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const [W,H,D] of SIZES){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{window.__bot=1});const p=await ctx.newPage();  /* reviewer r7: __bot = no jload first-run download screen over the book */const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto(URL+'index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof KIT_ACTS!=='undefined'&&KIT_ACTS.log&&KIT_ACTS.log.length>100,null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   S.wkSnap=wkSnap();log("Ngươi đeo Trâm ngọc bích.");log("Ngươi tháo Bộ diêu vàng.");log("Lan Tần đến thăm, hai người trò chuyện.");log("Ngươi khéo khước từ lời mời.");dawn()});
  await p.waitForTimeout(2500);
  await p.evaluate(()=>{const n=document.querySelector('.kbk-next');if(n)n.click()});
  await p.waitForTimeout(2500);await p.waitForFunction(()=>[...document.querySelectorAll('.kbk img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
  const r=await p.evaluate(()=>{const ov=document.documentElement.scrollWidth>innerWidth+1;const imgs=[...document.querySelectorAll('.kbk img')];
   const broken=imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.split('/').pop());const pend=imgs.filter(i=>!i.complete).length;const tlImgs=[...document.querySelectorAll('.kbk-book .kbk-pg')].filter(x=>/Tổng lược/.test(x.textContent)).flatMap(x=>[...x.querySelectorAll('img')].map(i=>i.src.split('/').pop()+':'+i.naturalWidth));const tl=[...document.querySelectorAll('.kbk-book .kbk-pg')].filter(x=>/Tổng lược/.test(x.textContent)).length;const rot=!!document.querySelector('#rotate:not([hidden]), .rotate:not([hidden])');return{tl,pend,tlImgs,ov,imgs:imgs.length,broken,rot}});
  await p.screenshot({path:`${OUT}/book-${W}x${H}.jpg`,quality:60,type:'jpeg'});console.log(W+'x'+H,JSON.stringify(r),'errs',errs.length,errs[0]||'');await ctx.close()}
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
