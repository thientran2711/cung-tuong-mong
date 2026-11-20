/* review/outside-r2: a save made on the published main build loads on this build and plays on; a save made at home (pre-palace road) on
   this build reloads at home. usage: node dev/test/outside/oldsave.js <main build url> <this build url> [WxH@dpr]
   (both urls on the SAME origin so they share localStorage, e.g. http://127.0.0.1:PORT/.port/main.html and http://127.0.0.1:PORT/index.html) */
const {chromium}=require('playwright');const [OLD,NEW,SZ]=process.argv.slice(2);const [wh,d]=(SZ||'755x1000@1').split('@');const [W,H]=wh.split('x').map(Number);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(d||1),serviceWorkers:'block'});
 await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(p.url().split('/').pop()+': '+e.message.slice(0,160)));const R={fail:[]};
 const close=()=>p.evaluate(()=>{for(let i=0;i<30&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}});
 /* 1. main build: new life, a few buổi, saved in Sổ một */
 await p.goto(OLD,{waitUntil:'domcontentloaded'});await sleep(3000);await p.evaluate(()=>{localStorage.clear();localStorage.setItem('ctm-bgpause','1')});await p.reload();await sleep(3000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();document.querySelector('#slots button[data-new="1"]').click()});await sleep(3000);
 await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(800);await close();
 for(let i=0;i<6;i++){await p.evaluate(()=>{try{nextBuoi()}catch(e){}});await close()}
 R.old=await p.evaluate(()=>{save();return{name:S.name,rank:S.rank,turn:S.turn,has:!!localStorage.getItem(SK(1))}});
 /* 2. this build: load Sổ một */
 await p.goto(NEW,{waitUntil:'domcontentloaded'});await sleep(3000);
 R.load=await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();const b=document.querySelector('[data-load="1"]');if(b)b.click();else{deser(loadSlot(1));SLOT=1}return 1});await sleep(2500);await close();
 R.loaded=await p.evaluate(()=>({name:S&&S.name,rank:S&&S.rank,isKc:isKc(),kc:!!S.kc,tabs:[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim())}));
 if(R.loaded.name!==R.old.name)R.fail.push('old save not loaded');if(R.loaded.isKc||R.loaded.kc)R.fail.push('old save turned into the home road');
 for(let i=0;i<6;i++){await p.evaluate(()=>{try{nextBuoi()}catch(e){}});await close()}
 for(const t of ['act','go','rv','inv','art','story']){await p.evaluate(t=>{tab=t;render()},t);await sleep(300)}
 R.after=await p.evaluate(()=>({turn:S.turn,dead:!!S.dead,ovf:document.documentElement.scrollWidth>innerWidth+1}));
 /* 3. this build: a home-road life saved at home reloads at home */
 R.home=await p.evaluate(()=>{SLOT=2;S.kcPick="nha";const was=S.name;try{store.set(NL_KEY,null)}catch(e){}start();return 1});await sleep(2500);
 R.home=await p.evaluate(()=>{if(!KC.ok.includes(S.origin.k))S.origin=ORIGINS.find(o=>o.k==='thd');S.kcPick='nha';nlAccept(false);for(let i=0;i<9&&Q.length;i++)closeModal();save();const n=S.name;deser(loadSlot(SLOT));render();return{same:S.name===n,isKc:isKc(),fam:S.kc&&S.kc.fam.length}});
 if(!R.home.same||!R.home.isKc)R.fail.push('home save reload '+JSON.stringify(R.home));
 R.errs=errs.slice(0,8);if(errs.length)R.fail.push('page errors');console.log(JSON.stringify(R,null,1));await b.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
