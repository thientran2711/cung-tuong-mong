/* review/newgame-ui — identity card ("Thân phận kiếp này") probe: figure tier, column vs panel, paging / pick / tab timings, Nhập cung frame.
   usage: node dev/test/newgame-ui.js <url> <WxH> [shot.jpg]   env: THR=4 (CPU throttle) · TRACE=page|pick (Chrome trace → .tmp/trace.json)
          INSTR=1 (per-function ms on pick) · MUT=1 (DOM additions + loads on page/pick) · LAT=<ms> (latency per cached picture)
   CDN pictures are cached on disk (.tmp/cdn/) so runs measure the game, not the proxy; the first-run bulk download (x-ctm-load) is
   blocked (returning player). Prints: init/maid {tier:{body px, floor px, col "L,R", dlgL}} — body + floor must be equal for every face
   and col R < dlgL (panel never covers her); next/prev/pick/tab {handler, paint (tap→next frame), loaded (all visible pictures decoded)}. */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,PURL,SZ,SHOT]=process.argv;
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const [W,H]=SZ.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});
 const CD=require('path').join(__dirname,'../../.tmp/cdn/');const fs=require('fs');fs.mkdirSync(CD,{recursive:true});const LAT=+process.env.LAT||0;
 await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\/.*\.webp/,async rt=>{const u=new URL(rt.request().url());const f=CD+u.pathname.replace(/\//g,'_');
   if(fs.existsSync(f)){if(LAT)await sleep(LAT);return rt.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'image/webp','access-control-allow-origin':'*','cache-control':'max-age=3600'}})}
   for(let i=0;i<4;i++){try{const r=await rt.fetch();const bd=await r.body();if(r.status()===200){fs.writeFileSync(f,bd);return rt.fulfill({response:r,body:bd})}}catch(e){}await sleep(500)}return rt.abort()});
 await ctx.route('**/*',rt=>{const h=rt.request().headers();if(h['x-ctm-load'])return rt.abort();return rt.fallback()});/* returning player: the first-run bulk download is done */
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message.slice(0,200)));
 await p.goto(PURL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await sleep(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('#kroul .krskip')))break;await sleep(500)}await p.evaluate(()=>{const s=document.querySelector('#kroul .krskip');if(s)s.click();const kl=document.getElementById('kload');if(kl)kl.remove()});
 for(let i=0;i<60;i++){const s=await p.evaluate(()=>({k:!!document.querySelector("#modal .kpick"),m:document.getElementById("modal").hidden,t:(document.querySelector("#modal .kph")||{}).textContent,fo:typeof faceOn=="function"&&faceOn(),nlp:!!NLP,kids:[...$("mb").children].map(c=>c.className),dl:document.querySelectorAll(".kpick").length}));if(s.k)break;if(i%10==0)console.log(JSON.stringify(s));await sleep(1000)}await sleep(4000);
 const cdp=await ctx.newCDPSession(p);if(process.env.THR)await cdp.send('Emulation.setCPUThrottlingRate',{rate:+process.env.THR});
 const meas=()=>p.evaluate(()=>{const R=e=>e&&e.getBoundingClientRect();const im=document.querySelector('#modal > img.kidfig2');const d=document.querySelector('#modal .dlg');const a=R(im),c=R(d);
   const M=document.getElementById('modal');const want=M.__kidWant||'';const fbe=(window.__KITFB||{})[(window.kitTn&&kitTn(want))||want];const fb=fbe&&fbe.v;
   const tier=a&&fb?{body:Math.round(a.height*(fb.b-fb.ht)),floor:Math.round(a.top+a.height*fb.b),col:M.dataset.kidcol,dlgL:c&&Math.round(c.left)}:null;
   return {tier,fig:a&&{l:Math.round(a.left),t:Math.round(a.top),w:Math.round(a.width),h:Math.round(a.height),b:Math.round(a.bottom),src:(im.getAttribute('src')||'').split('/').pop(),nw:im.naturalWidth,nh:im.naturalHeight},dlg:c&&{l:Math.round(c.left),t:Math.round(c.top),w:Math.round(c.width),h:Math.round(c.height)},
   thumbs:[...document.querySelectorAll('#modal .kpki:not([hidden]) img')].slice(0,3).map(i=>({src:i.currentSrc.split('/').pop(),nw:i.naturalWidth,w:Math.round(i.getBoundingClientRect().width)})),flt:window.__fpF}});
 console.log('canv',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('canvas')].map(c=>({id:c.id,cls:c.className,par:c.parentElement&&(c.parentElement.id||c.parentElement.className),w:c.width,h:c.height,vis:getComputedStyle(c).display+'/'+getComputedStyle(c).visibility,z:getComputedStyle(c).zIndex})))));
 console.log('fb',JSON.stringify(await p.evaluate(()=>{const im=document.querySelector('#modal > img.kidfig2');return {css:im.style.cssText.slice(0,200),want:$('modal').__kidWant,tn:typeof KIT_TN!=='undefined'&&!!KIT_TN,fb:Object.entries(window.__KITFB||{}).slice(0,6).map(([k,e])=>[k.split('/').slice(-2).join('/'),e.v&&[e.v.t,e.v.b,e.v.ht].map(x=>+x.toFixed(3))])}})));
 console.log('init',JSON.stringify(await meas()));
 // timing: paging and picking
 const tap=async(sel)=>p.evaluate(async(sel)=>{const t0=performance.now();const el=document.querySelector(sel);if(!el)return null;el.click();const t1=performance.now();
   await new Promise(r=>requestAnimationFrame(()=>setTimeout(r,0)));const t2=performance.now();
   // wait until all visible thumbs + figure decoded
   const ok=()=>[...document.querySelectorAll('#modal .kpki:not([hidden]) img')].every(i=>i.complete&&i.naturalWidth)&&(()=>{const f=document.querySelector('#modal > img.kidfig2');return !f||f.complete&&f.naturalWidth})();
   let t3=null;for(let i=0;i<300;i++){if(ok()){t3=performance.now();break}await new Promise(r=>setTimeout(r,20))}
   return {handler:Math.round(t1-t0),paint:Math.round(t2-t0),loaded:t3&&Math.round(t3-t0)}},sel);
 if(process.env.MUT){await p.evaluate(()=>{window.__M=[];new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)__M.push((m.target.id||m.target.className||m.target.tagName)+'<'+(n.className||n.nodeName))}).observe(document.body,{childList:true,subtree:true});
   window.__L=[];document.addEventListener('load',e=>{__L.push((e.target.getAttribute&&(e.target.getAttribute('src')||'')).split('/').pop())},true)});
   console.log('page',JSON.stringify(await tap('#modal .kpick [data-pkpg="1"]')));await sleep(1500);console.log(JSON.stringify(await p.evaluate(()=>[__M.slice(0,30),__M.length,__L.slice(0,20),__L.length])));
   await p.evaluate(()=>{__M=[];__L=[];window.__ST=[];const r0=window.renderHud2;window.renderHud2=function(){__ST.push(new Error().stack.split('\n').slice(2,9).map(x=>x.trim().split(' ')[1]).join('<'));return r0.apply(this,arguments)};const r1=window.render;window.render=function(){__ST.push('RENDER '+new Error().stack.split('\n').slice(2,9).map(x=>x.trim().split(' ')[1]).join('<'));return r1.apply(this,arguments)}});console.log('pick',JSON.stringify(await tap('#modal .kpki:not([hidden]):not(.on)')));await sleep(1500);console.log(JSON.stringify(await p.evaluate(()=>[__M.slice(0,30),__M.length,__L.slice(0,20),__L.length,typeof KFX!=='undefined'&&KFX.app&&KFX.app.ticker.started,__ST])));await b.close();return}
 if(process.env.INSTR){await p.evaluate(()=>{window.__T={};for(const n of ['fpSel','pframe','kpIdLay','kitFigBody','fpRefresh','faceChoose','fpRefresh','fpRedraw','kpIdFig','render','renderStage','renderHud2','kitPickerLayout','pMe','fpItems','fpHTML','facePool','figFor','showModal','kpBuild']){const f=window[n];if(typeof f!=='function')continue;window[n]=function(){const t=performance.now();try{return f.apply(this,arguments)}finally{const d=performance.now()-t;const o=__T[n]=__T[n]||{n:0,ms:0};o.n++;o.ms+=d}}}});
   for(let i=0;i<2;i++){await p.evaluate(()=>{__T={}});console.log('pick',JSON.stringify(await tap('#modal .kpki:not([hidden]):not(.on)')));console.log(JSON.stringify(await p.evaluate(()=>Object.fromEntries(Object.entries(__T).map(([k,v])=>[k,v.n+'x '+Math.round(v.ms)])))))}
   await p.evaluate(()=>{__T={}});console.log('page',JSON.stringify(await tap('#modal .kpick [data-pkpg="1"]')));console.log(JSON.stringify(await p.evaluate(()=>Object.fromEntries(Object.entries(__T).map(([k,v])=>[k,v.n+'x '+Math.round(v.ms)])))));await b.close();return}
 if(process.env.TRACE){const what=process.env.TRACE;await b.startTracing(p,{path:require('path').join(__dirname,'../../.tmp/trace.json'),categories:['devtools.timeline','disabled-by-default-devtools.timeline','v8.execute','blink','cc','gpu']});
   if(what==='page')console.log('T',JSON.stringify(await tap('#modal .kpick [data-pkpg="1"]')));else console.log('T',JSON.stringify(await tap('#modal .kpki:not([hidden]):not(.on)')));await sleep(500);await b.stopTracing();await b.close();return}
 for(let i=0;i<3;i++)console.log('next',JSON.stringify(await tap('#modal .kpick [data-pkpg="1"]')));
 for(let i=0;i<3;i++)console.log('prev',JSON.stringify(await tap('#modal .kpick [data-pkpg="-1"]')));
 for(let i=0;i<3;i++)console.log('pick',JSON.stringify(await tap(`#modal .kpki:not([hidden]):not(.on)`)),JSON.stringify((await meas()).fig));
 if(SHOT)await p.screenshot({path:SHOT.replace('.jpg','-c.jpg'),type:'jpeg',quality:60});
 /* r3 (owner 16/11 s23): the face picker has NO tabs — the game picks the set from her identity; this probe measures the one list */
 console.log('maid',JSON.stringify(await meas()));
 for(let i=0;i<2;i++)console.log('pickM',JSON.stringify(await tap(`#modal .kpki:not([hidden]):not(.on)`)),JSON.stringify((await meas()).fig));
 if(SHOT)await p.screenshot({path:SHOT,type:'jpeg',quality:60});
 if(SHOT){await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl=ok]');b&&b.click()});await sleep(5000);
  console.log('nhap',JSON.stringify(await p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};const d=document.querySelector('#modal .dlg');return{t:(document.querySelector('#modal .kph')||{}).textContent,dlg:R(d),band:R(document.querySelector('#modal .kdlgart')),col:R(document.querySelector('#modal .kes')),fig:R(document.querySelector('#modal .kesimg')),figsrc:((document.querySelector('#modal .kesimg')||{}).currentSrc||'').split('/').pop(),bandsrc:((document.querySelector('#modal .kdlgart img')||{}).currentSrc||'').split('/').pop(),scroll:d&&(d.scrollHeight>d.clientHeight+2)}})));
  await p.screenshot({path:SHOT.replace('.jpg','-n.jpg'),type:'jpeg',quality:60})}
 await b.close()})();
