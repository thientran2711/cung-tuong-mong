/* usage: node shoot.js <page URL> <outdir> <WxH@dpr> <plateDir>. Stage shot with the SAMPLE plates routed into the img/kit/title-plate-<tier>.webp art slot (tiers 1,4,8 -> sample files). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ,PD]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});
 const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});
 await ctx.route(/title-plate-(\d)\.webp/,r=>{const n=r.request().url().match(/title-plate-(\d)\.webp/)[1];const f=`${PD}/title-plate-sample-${n}.webp`;fs.existsSync(f)?r.fulfill({body:fs.readFileSync(f),contentType:'image/webp'}):r.abort()});
 const p=await ctx.newPage();await p.addInitScript('window.__tw="'+(process.env.TW||'s4')+'"');p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove()});await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}#kroul{display:none!important}'});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});await sleep(800);
 const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;for(const id of['modal','dawn']){const e=document.getElementById(id);if(e){e.hidden=true;if(id==='dawn')e.innerHTML=''}}});
 await clean();await p.evaluate(()=>{S.rank=4;S.hieu="Thục";S.titleWorn=(window.__tw||"s4");S.dead=false;S.confined=0;S.buoi=0;S.wx={n:"trời quang",k:"dust",f:0};const k='vuon';S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
  const L=liveRivals(true).filter(v=>!v.queen);L.slice(0,2).forEach((v,i)=>{Wh[v.id]=k;S.met=S.met||{};S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}v.titleWorn=i?"s8":"s1";v.rank=Math.max(v.rank,4);v.hieu=i?"Đức":""});
  S.place="home";used=0;tab="act";goTo(k);Q.length=0});await sleep(3000);await clean();
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,20000)}))));await sleep(2500);
 console.log(await p.evaluate(()=>[...document.querySelectorAll('.stage .kdh')].map(e=>e.className+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height))));
 await p.screenshot({path:`${OUT}/stage-${wh}${process.env.TW?"-"+process.env.TW:""}.png`});await b.close()})();
