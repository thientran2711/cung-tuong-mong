/* review/placeholder-pics (KIT §59): at one size — an old save (written by the old build) loads in the new build; the Hành sự deck renders,
   every act card shows a picture (own or placeholder, data-kph); an event dialog with no own picture shows ph-l-*/ph-p-*/ph-w-*; no page errors,
   no horizontal overflow. usage: node dev/test/placeholder-pics.js <old build url> <new build url> <WxH@dpr> [shot.jpg] */
const {chromium}=require('playwright');
const [,,OLD,NEW,SIZE,SHOT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const [wh,dpr]=(SIZE||"755x1000@1").split("@");const [W,H]=wh.split("x").map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1000,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 const boot=async u=>{await p.goto(u,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(4000);await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()})};
 await boot(OLD);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start();NLP=null;Q.length=0;quiet=false;S.year+=1;save()});
 const oldErr=errs.length;
 await boot(NEW);
 await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART&&KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length,null,{timeout:60000}).catch(()=>{});
 const r=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return{err:'no save'};SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;
   const m=document.getElementById('modal');if(m)m.hidden=true;tab="act";deal();try{const L=pool().concat(deck);const x=L.find(a=>a&&a.n&&kitActArt(a.n).ph);if(x&&!deck.some(a=>a.n===x.n))deck.push(Object.assign({},x,{done:false}))}catch(e){}render();
   const cards=[...document.querySelectorAll('#panel button.ka.kcard')];const noPic=cards.filter(c=>!c.querySelector('.kaart img')).length;const ph=cards.filter(c=>c.dataset.kph).length;
   return{loaded:true,year:S.year,cards:cards.length,noPic,ph}}catch(e){return{err:String(e.stack).slice(0,300)}}});
 await sleep(1500);
 /* acts: a consort life (old save may be a maid), one act known to lack a picture put in the deck */
 const act=await p.evaluate(()=>{try{window.__forceOrigin="thd";SLOT=6;window.__nlInner=1;start();window.__nlInner=0;NLP=null;Q.length=0;document.getElementById('modal').hidden=true;tab="act";deal();
   const L=pool().concat(deck);const x=L.find(a=>a&&a.n&&kitActArt(a.n).ph);if(x&&!deck.some(a=>a.n===x.n))deck.unshift(Object.assign({},x,{done:false}));render();
   const c=[...document.querySelectorAll('#panel button.ka.kcard[data-kph]')];return{name:x&&x.n,ph:c.length,img:c[0]&&!!c[0].querySelector(':scope>.kaart img[src*="/ph-"]')}}catch(e){return{err:String(e).slice(0,200)}}});
 await sleep(2500);
 const hz1=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 if(SHOT){await p.evaluate(()=>{const c=document.querySelector('#panel button.ka.kcard[data-kph]');if(c)c.scrollIntoView({block:'center'})});await sleep(1200);await p.screenshot({path:SHOT.replace(/\.jpg$/,'-acts.jpg'),type:'jpeg',quality:55})}
 /* an event dialog with no own picture: first PEND builder that lands on a placeholder */
 const ev=await p.evaluate(()=>{let R=[];try{R=liveRivals(true)}catch(e){};const v=R[0];for(const id of Object.keys(PEND)){for(const pp of [{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;
    Q.length=0;document.getElementById('modal').hidden=true;try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}
    const img=document.querySelector('#mb .ksart img[src*="/ph-"]');if(img)return{id,src:img.getAttribute('src').split('/').pop()};break}}
   /* no PEND dialog of this life lands on a placeholder: the E68 event known to have none (MISSING_PICS) */
   Q.length=0;document.getElementById('modal').hidden=true;try{if(e68Test('flowerBloom')){const img=document.querySelector('#mb .ksart img[src*="/ph-"]');if(img)return{id:'e68:flowerBloom',src:img.getAttribute('src').split('/').pop()}}}catch(e){}return null});
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(800);
 const hz2=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 if(SHOT)await p.screenshot({path:SHOT,type:'jpeg',quality:55});
 const miss=await p.evaluate(()=>(window.CTM_MISSING_PICS||[]).length);
 const phLost=await p.evaluate(()=>{tab='act';render();return [...document.querySelectorAll('#panel button.ka.kcard[data-kph]')].filter(c=>c.classList.contains('kanoart')||!c.querySelector(':scope>.kaart img')).length});
 const ok=act.ph>0&&act.img&&!phLost&&!errs.length&&r.loaded&&r.year&&!hz1&&!hz2&&!!ev&&r.noPic===0;
 console.log(JSON.stringify({size:SIZE,ok,phLost,act,r,ev,hz:[hz1,hz2],missingRecorded:miss,oldErr,errs:errs.slice(0,5)}));await b.close();process.exit(ok?0:1)})().catch(e=>{console.error(e);process.exit(2)});
