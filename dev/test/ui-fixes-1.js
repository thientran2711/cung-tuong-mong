/* review/ui-fixes-1 repro + after shots. usage: node dev/test/ui-fixes-1.js <device> <outdir> <tag> [delayMs=5000]
   HOST mode, CDN pictures delayed by delayMs (slow network). Shots are taken ~700 ms after render (art still loading) and again after settle.
   Prints JSON: rail slot states, act-card picture states, header overflow, label-vs-sprite overlap. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,DEV='fold',OUT='/tmp/shots',TAG='x',DELAY='5000']=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await D.newDeviceContext(b,DEV==='fold412'?'pixel':DEV);if(DEV==='fold412'){await ctx.close();}
 const c=DEV==='fold412'?await b.newContext({...D.contextOptions('pixel'),viewport:{width:412,height:1058}}):ctx;
 await c.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await c.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 let slow=!!process.env.SLOWALL;await p.route(new RegExp(process.env.SLOWRE||'ctm-img\\.victoria-tntt\\.workers\\.dev/img/(kit/ico-|act-|kit/act|ev-|st-|info-)'),async r=>{if(slow)await new Promise(s=>setTimeout(s,+DELAY));try{await r.continue()}catch(e){}});
 const game=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await game.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());render()});
 for(let i=0;i<90;i++){const st=await game.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await game.evaluate(()=>{try{nlAccept(true)}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(2500);const R={dev:DEV,probe:await D.probe(p)};
 R.src=await game.evaluate(()=>[...document.querySelectorAll('#krail img')].map(i=>i.currentSrc));R.reqs=0;p.on('request',q=>{if(/ico-cal/.test(q.url()))R.reqs++;});
 const meas=()=>game.evaluate(()=>{const vw=innerWidth;
  const rail=[...document.querySelectorAll('#krail .krailb')].map(b=>{const i=b.querySelector('img');return{id:b.dataset.rail,img:i?{c:i.complete,nw:i.naturalWidth}:'glyph',bg:getComputedStyle(b).backgroundImage.slice(0,40),loading:b.classList.contains('kld')}});
  const arts=[...document.querySelectorAll('.ksart')].filter(e=>e.offsetParent).map(f=>{const i=f.querySelector('img');return{ph:!!f.querySelector('.ksart-ph'),img:i?{c:i.complete,nw:i.naturalWidth}:null,cls:f.className.slice(0,40),w:Math.round(f.getBoundingClientRect().width)}});
  const hdr=document.querySelector('#top,#hdr,header,.topbar');
  return{rail,arts:arts.length,artsLoading:arts.filter(a=>a.img&&!a.img.nw).length,artsPh:arts.filter(a=>a.ph&&a.img&&!a.img.nw).length,railLoading:rail.filter(r=>r.img&&r.img.nw===0).length,railN:rail.length,docW:document.documentElement.scrollWidth,vw}});
 const shot=async n=>p.screenshot({path:`${OUT}/${TAG}-${DEV}-${n}.png`});
 const sw=async n=>{await p.waitForTimeout(700);await shot(n+'-loading');R[n]=await meas()};
 slow=true;const cdp=await c.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await game.evaluate(()=>{const e=document.getElementById('krail');if(e){e.__h='';e.remove()}kitStageRail.paint()});
 const clickTab=async k=>{await game.evaluate(k=>{const b=document.querySelector(`#tabs [data-tab="${k}"]`);if(b)b.click();else{tab=k;render()}},k)};
 await game.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="go"]');if(b)b.click()});await p.waitForTimeout(300);
 await clickTab('act');await sw('act');
 await clickTab('rel');await sw('rel');
 await clickTab('go');await sw('go');
 await p.waitForTimeout(+DELAY+1500);await shot('settled');
 R.errs=errs;R.tabs=await game.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));console.log(JSON.stringify(R));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
