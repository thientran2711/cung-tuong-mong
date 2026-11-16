/* (D22 migrated: real device profiles from dev/test/lib/device.js; HOST=1 loads the built index.html through rot.js host mode, game checks run in the game frame)
   review/book-title: Tuần lục cover with the brush-title picture (img/title-tuanluc-d4s.webp) in the cover label.
   usage: node dev/test/book-title.js <build url> <outdir>  → <outdir>/cover-<W>x<H>.jpg; prints per size: title picture drawn (natural size,
   box inside the label, label text hidden), running header text, overflow, broken images, page errors */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');const HOST=process.env.HOST==='1';const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SIZES=(process.env.DEVS||'fold,foldLand,ipadAir,ipadPro,iphone14Land').split(',');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const dev of SIZES){const {w:W,h:H}=D.DEVICES[dev];const ctx=await D.newDeviceContext(b,dev);
  await ctx.addInitScript(()=>{window.__bot=1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  const G=HOST?await D.openHost(p,URL):p;if(!HOST)await p.goto(URL+'index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await G.waitForFunction(()=>typeof start==='function'&&typeof dawn==='function',null,{timeout:120000});
  await G.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   S.wkSnap=wkSnap();log("Lan Tần đến thăm, hai người trò chuyện.");dawn()});
  await p.waitForTimeout(3500);await G.waitForFunction(()=>{const i=document.querySelector('.kbk-book .kbk-ltimg');return i&&i.complete},null,{timeout:30000}).catch(()=>{});
  const r=await G.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return [r.left,r.top,r.width,r.height].map(Math.round)};
   const k=document.querySelector('.kbk');const im=document.querySelector('.kbk-book .kbk-ltimg'),lb=im&&im.closest('.kbk-label'),lt=lb&&lb.querySelector('.kbk-lt');
   const imgs=[...document.querySelectorAll('.kbk img')];
   return {cls:k&&[...k.classList].filter(c=>c.startsWith('art-')).join(' '),img:im?{nat:im.naturalWidth+'x'+im.naturalHeight,shown:getComputedStyle(im).display!=='none',box:R(im),label:R(lb),alt:im.alt,inside:(()=>{const a=im.getBoundingClientRect(),b=lb.getBoundingClientRect();return a.left>=b.left-.5&&a.right<=b.right+.5&&a.top>=b.top-.5&&a.bottom<=b.bottom+.5})()}:null,
    textHidden:lt?getComputedStyle(lt).display==='none':null,rh:[...document.querySelectorAll('.kbk-rh')].map(e=>e.textContent).filter(Boolean)[0]||null,
    ov:document.documentElement.scrollWidth>innerWidth+1,broken:imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.split('/').pop())}});
  await p.screenshot({path:`${OUT}/cover-${W}x${H}.jpg`,quality:70,type:'jpeg',timeout:120000}).catch(e=>errs.push('shot:'+e.message.slice(0,60)));console.log(W+'x'+H,JSON.stringify(r),'errs',errs.length,errs[0]||'');await ctx.close()}
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
