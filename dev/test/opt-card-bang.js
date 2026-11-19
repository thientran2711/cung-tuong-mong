/* review/opt-card-short — the "!" taps: card "!" opens the full card, dialog "!" opens the number lines; neither chooses an option. usage: node dev/test/opt-card-bang.js <url> <outdir> [WxH] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const [W,H]=(SZ||'755x1000').split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.__ctmBuilt);await sleep(2500);
 await p.evaluate(async()=>{try{window.kitReward=()=>{}}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;S.th=40;S.bac=500;render();
  const arts=ARTS.filter(a=>wkKindsOf(a.k).some(x=>WKR[x]));const a=arts[2];S.arts[a.k]=S.arts[a.k]||1;const kind=wkKindsOf(a.k).find(x=>WKR[x]);Object.assign(KWR,{k:a.k,mode:'self',run:()=>{},kind});wkrMat(kind,WKR[kind][0].id);Q.forEach(m=>m.must=1);showModal();await new Promise(r=>setTimeout(r,1500))});
 await p.evaluate(()=>window.__q0=Q.length);const res={};
 await p.click('#modal button.ka.kopt >> nth=1 >> .kobang');await sleep(400);res.cardInfo=await p.evaluate(()=>({open:!document.getElementById('kpinfo').hidden,txt:document.getElementById('kpinfo').textContent.slice(0,120),modal:!document.getElementById('modal').hidden,q:Q.length===window.__q0}));
 await p.screenshot({path:`${OUT}/bang-card-${W}x${H}.jpg`,type:'jpeg',quality:80});await p.click('#kpinfo');await sleep(300);res.closed=await p.evaluate(()=>document.getElementById('kpinfo').hidden);
 await p.click('#modal .knbang');await sleep(400);res.numInfo=await p.evaluate(()=>({open:!document.getElementById('kpinfo').hidden,txt:document.getElementById('kpinfo').textContent.slice(0,90),q:Q.length===window.__q0,modal:!document.getElementById('modal').hidden}));
 await p.screenshot({path:`${OUT}/bang-num-${W}x${H}.jpg`,type:'jpeg',quality:80});await p.click('#kpinfo');await sleep(300);
 console.log(JSON.stringify({res,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
