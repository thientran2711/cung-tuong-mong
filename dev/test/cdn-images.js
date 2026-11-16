/* review/cdn-images: pictures from Cloudflare (dev/art/CDN.md). One viewport per run.
   usage: node dev/test/cdn-images.js <newURL> <oldURL same origin> <W>x<H>@dpr <outdir> [offline]
   1. old build (pictures in git) makes a save in slot 2 after a few turns
   2. new build, cold: time to load + title pictures; every picture request/response watched (requestfailed, HTTP >= 400)
   3. the old save loads; every tab visited; broken <img> (complete && naturalWidth 0) and failed CSS pictures counted
   4. a new solo life plays ~14 steps (turn button + first choice in every dialog)
   5. co-op screen opens (title "Chơi cùng bạn" when the build has it)
   6. [offline] after the service worker is ready: offline reload, pictures still show
   Prints one JSON line. */
const {chromium}=require('./lib/pw-roulette');
const [,,NEW,OLD,SZ,OUT,OFF]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ.replace('@','_');
const CDN='ctm-img.victoria-tntt.workers.dev';
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 const R={size:SZ};
 /* 1. old save */
 {const p=await ctx.newPage();p.setDefaultTimeout(120000);await p.goto(OLD,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  R.oldSave=await p.evaluate(async()=>{try{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;
   for(let i=0;i<4;i++){try{Q.length=0;endTurn()}catch(e){}Q.length=0}
   localStorage.setItem(SK(2),JSON.stringify(ser()));localStorage.setItem("hclh-slot","2");return {name:S.name,turn:S.turn,imgPaths:(JSON.stringify(ser()).match(/img\//g)||[]).length}}catch(e){return {err:String(e)}}});
  await p.close()}
 /* 2. new build, cold */
 const p=await ctx.newPage();p.setDefaultTimeout(120000);
 const errs=[],failed=[],bad=[],imgReq={n:0,cdn:0,same:0,bytes:0};
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 p.on('requestfailed',q=>{const u=q.url();if(/\.(webp|png|jpg|json)(\?|$)/.test(u))failed.push(u.replace(/^https?:\/\/[^/]+\//,'')+' '+(q.failure()||{}).errorText)});
 p.on('response',async r=>{const u=r.url();if(!/\/img\//.test(u))return;imgReq.n++;if(u.includes(CDN))imgReq.cdn++;else imgReq.same++;if(r.status()>=400)bad.push(r.status()+' '+u.replace(/^https?:\/\/[^/]+\//,''))});
 const t0=Date.now();await p.goto(NEW,{waitUntil:'load'});const tLoad=Date.now()-t0;
 await p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:60000}).catch(()=>{});
 const tTitle=Date.now()-t0;
 R.firstLoad={loadMs:tLoad,titlePicturesMs:tTitle,res:await p.evaluate(()=>{const E=performance.getEntriesByType('resource').filter(e=>/\/img\//.test(e.name));return{n:E.length,kb:Math.round(E.reduce((a,e)=>a+(e.transferSize||e.encodedBodySize||0),0)/1024),lastEndMs:Math.round(Math.max(0,...E.map(e=>e.responseEnd)))}})};
 const broken=async(where)=>p.evaluate(where=>{const L=[...document.images].filter(i=>i.getAttribute('src')&&!i.getAttribute('src').startsWith('data:')&&i.complete&&i.naturalWidth===0&&i.style.visibility!=='hidden').map(i=>i.getAttribute('src').replace(/^https?:\/\/[^/]+\//,''));
  const imgs=[...document.images].filter(i=>i.offsetParent&&i.getAttribute('src')&&!i.getAttribute('src').startsWith('data:'));
  return{where,shown:imgs.filter(i=>i.complete&&i.naturalWidth>0).length,cdn:imgs.filter(i=>(i.currentSrc||i.src).includes('ctm-img.')).length,broken:L.slice(0,8),nBroken:L.length,
   overflowX:document.documentElement.scrollWidth>innerWidth}},where);
 R.title=await broken('title');
 await p.screenshot({path:`${OUT}/cdn-${tag}-title.jpg`,type:'jpeg',quality:70});
 /* 3. old save */
 R.load=await p.evaluate(()=>{const bt=document.querySelector('[data-load="2"]');if(!bt)return 'no slot button';bt.click();return S&&S.name?'loaded '+S.name+' turn '+S.turn:'fail'});
 await p.waitForTimeout(2500);
 await p.evaluate(()=>{for(let i=0;i<6;i++){const m=document.getElementById('modal');if(m&&!m.hidden){const bt=[...m.querySelectorAll('button')].find(x=>x.offsetParent&&!x.disabled);if(bt)bt.click()}}});
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab));
 R.tabs=[];
 for(const t of tabs){await p.evaluate(t=>{const x=document.querySelector(`#tabs [data-tab="${t}"]`);if(x)x.click()},t);await p.waitForTimeout(1800);
  await p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:20000}).catch(()=>{});
  R.tabs.push(await broken('tab '+t));if(t===tabs[0]||t===tabs[2])await p.screenshot({path:`${OUT}/cdn-${tag}-save-${t}.jpg`,type:'jpeg',quality:70})}
 /* 4. solo life */
 R.solo=await p.evaluate(async()=>{const out={steps:0,err:null};try{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;render();
  for(let i=0;i<14;i++){const m=document.getElementById('modal');const ov=document.getElementById('ov');
   if(ov&&!ov.hidden){const bt=[...ov.querySelectorAll('button')].find(x=>x.offsetParent&&!x.disabled);if(bt){bt.click();out.steps++;await new Promise(r=>setTimeout(r,250));continue}}
   if(m&&!m.hidden){const bt=[...m.querySelectorAll('button')].find(x=>x.offsetParent&&!x.disabled);if(bt){bt.click();out.steps++;await new Promise(r=>setTimeout(r,250));continue}}
   const n=document.getElementById('next');if(n&&!n.disabled){n.click();out.steps++}await new Promise(r=>setTimeout(r,400))}
  out.turn=S.turn;out.alive=!S.dead}catch(e){out.err=String(e)}return out});
 await p.waitForTimeout(2000);
 await p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:20000}).catch(()=>{});
 R.soloImgs=await broken('solo');await p.screenshot({path:`${OUT}/cdn-${tag}-solo.jpg`,type:'jpeg',quality:70});
 /* CSS pictures on screen */
 R.cssPics=await p.evaluate(()=>{const U=new Set();document.querySelectorAll('*').forEach(e=>{const s=getComputedStyle(e).backgroundImage;if(s&&s.includes('url('))(s.match(/url\("?([^")]+)"?\)/g)||[]).forEach(x=>U.add(x.replace(/^url\("?|"?\)$/g,'')))});
  const L=[...U].filter(u=>!u.startsWith('data:'));return{n:L.length,cdn:L.filter(u=>u.includes('ctm-img.')).length,other:L.filter(u=>!u.includes('ctm-img.')).slice(0,5)}});
 /* 5. co-op screen */
 R.coop=await p.evaluate(async()=>{try{const t=document.getElementById('title');if(t)t.hidden=false;if(typeof showTitle==='function')showTitle();await new Promise(r=>setTimeout(r,600));
  const bt=[...document.querySelectorAll('button')].find(x=>x.offsetParent&&/Chơi cùng bạn/.test(x.textContent));if(!bt)return 'no co-op button in this build';bt.click();await new Promise(r=>setTimeout(r,1200));
  const vis=[...document.querySelectorAll('button')].filter(x=>x.offsetParent).map(x=>x.textContent.trim()).filter(x=>/Mời bạn|Nhập mã|mã/.test(x));return vis.length?'opened: '+vis.slice(0,3).join(' | '):'clicked, no invite buttons seen'}catch(e){return 'err '+e}});
 await p.screenshot({path:`${OUT}/cdn-${tag}-coop.jpg`,type:'jpeg',quality:70});
 /* 6. offline */
 if(OFF){R.sw=await p.evaluate(async()=>{if(!navigator.serviceWorker)return 'no sw';const r=await Promise.race([navigator.serviceWorker.ready.then(()=>'ready'),new Promise(r=>setTimeout(()=>r('timeout'),240000))]);
   const ks=await caches.keys();let n=0,cdn=0;for(const k of ks){const c=await caches.open(k);const q=await c.keys();n+=q.length;cdn+=q.filter(x=>x.url.includes('ctm-img.')).length}return {r,ctl:!!navigator.serviceWorker.controller,caches:ks,n,cdn}});
  await ctx.setOffline(true);const q2=await ctx.newPage();const e2=[];q2.on('pageerror',e=>e2.push(e.message));
  await q2.goto(NEW,{waitUntil:'load'}).catch(e=>e2.push('goto '+e.message));await q2.waitForTimeout(3000);
  R.offline=await q2.evaluate(()=>{const bt=document.querySelector('[data-load="2"]');if(bt)bt.click();return new Promise(r=>setTimeout(()=>{const I=[...document.images].filter(i=>i.offsetParent&&i.getAttribute('src')&&!i.getAttribute('src').startsWith('data:'));
   r({loaded:!!(window.S&&S.name),shown:I.filter(i=>i.complete&&i.naturalWidth>0).length,notShown:I.filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>i.getAttribute('src').replace(/^https?:\/\/[^/]+\//,'')).slice(0,6)})},3500))}).catch(e=>({err:String(e)}));
  R.offline.errors=e2;await q2.screenshot({path:`${OUT}/cdn-${tag}-offline.jpg`,type:'jpeg',quality:70});await ctx.setOffline(false)}
 R.KCDN=await p.evaluate(()=>window.KCDN||null);
 Object.assign(R,{imgReq,failed:failed.slice(0,10),nFailed:failed.length,http4xx:bad.slice(0,10),nHttp4xx:bad.length,errors:errs.slice(0,10)});
 console.log(JSON.stringify(R));await b.close()})();
