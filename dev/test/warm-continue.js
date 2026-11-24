/* review/life-preload: WARM cache root-cause probe (MAIN s41 18/11: "tôi tưởng tất cả hình ảnh, icon, giao diện đều tải hết về máy rồi chứ").
   usage: node dev/test/warm-continue.js <outdir> [device]      (built root, HOST mode, service worker ALLOWED)
   1. fresh profile, core set in; a life is played (inner start, dialogs closed) until every picture on screen is complete; save.
   2. the page is opened again (same profile) → title → "Tiếp tục". For 6 s: blank boxes on screen (incomplete img without §59.1),
      time until the first screen is complete, which pictures the service worker had to fetch from the CDN (new keys in 'ctm-assets' = cache misses),
      and what the title-screen prefetch fetched. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT='/tmp/warm',DEV='fold']=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const keys=g=>g.evaluate(async()=>(await (await caches.open('ctm-assets')).keys()).map(q=>q.url.replace(/^.*?(img\/|audio\/)/,'$1')));
const ready=g=>g.waitForFunction(()=>typeof start==='function'&&window.KLOAD&&['done','all','skipped'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:600000});
(async()=>{const srv=await D.serveRoot(process.env.ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'allow'});const p=await ctx.newPage();await require('./lib/veil').guard(p);const R={};
 let g=await D.openHost(p,srv.url);
 for(let k=0;k<40;k++){const ph=await g.evaluate(()=>window.KLOAD&&KLOAD.phase).catch(()=>null);if(ph==='ask'){await g.evaluate(()=>{const b=document.querySelector('[data-kl="web"]');if(b)b.click()});break}if(ph&&ph!=='check')break;await sleep(500)}
 await ready(g);await sleep(1500);
 await g.evaluate(()=>{SLOT=1;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;try{quiet=false}catch(e){}Q.length=0;showModal();render();save()});
 for(let i=0;i<120;i++){await sleep(500);const n=await g.evaluate(()=>[...document.images].filter(im=>im.getAttribute('src')&&!im.complete).length);if(!n&&i>6)break}
 await sleep(3000);await g.evaluate(()=>save());const k0=new Set(await keys(g));R.keysAfterPlay=k0.size;
 const t0=Date.now();g=await D.openHost(p,srv.url);await ready(g);R.titleMs=Date.now()-t0;await sleep(+process.env.TITLEWAIT||1500);
 R.prefetch=await g.evaluate(()=>window.KLOAD&&KLOAD.prefetch||null);const k1=new Set(await keys(g));
 const t1=Date.now();await g.evaluate(()=>{const b=document.querySelector('#modal .kpmenu [data-tgo="slots"][data-cstab="solo"]');if(!b)throw new Error('no Tiếp tục: '+[...document.querySelectorAll('#title button')].map(x=>x.textContent.trim()).join('|'));b.click()});await g.waitForSelector('#modal [data-load]',{timeout:15000});await g.evaluate(()=>document.querySelector('#modal [data-load]').click());
 const S=[];let doneAt=null;for(let i=0;i<24;i++){await sleep(250);const s=await g.evaluate(()=>{const top=document.elementFromPoint(innerWidth/2,innerHeight/2);if(top&&top.closest&&top.closest('#klife,#kload'))return{cover:1};
   const inc=[...document.images].filter(im=>{const r=im.getBoundingClientRect();return r.width>=24&&r.height>=24&&r.bottom>0&&r.top<innerHeight&&im.getAttribute('src')&&!(im.complete&&im.naturalWidth)});
   return{blank:inc.filter(im=>!im.hasAttribute('data-kwait')).length,wait:inc.filter(im=>im.hasAttribute('data-kwait')).length,which:inc.slice(0,5).map(im=>im.getAttribute('src').split('/').pop())}});
  s.t=Date.now()-t1;S.push(s);if(i===1||i===4)await p.screenshot({path:`${OUT}/${DEV}-cont-${i}.png`});if(!s.cover&&!s.blank&&!s.wait&&doneAt==null)doneAt=s.t}
 const k2=await keys(g);R.firstScreenMs=doneAt;R.blankSamples=S.filter(s=>s.blank).length;R.waitSamples=S.filter(s=>s.wait).length;R.coverSamples=S.filter(s=>s.cover).length;
 R.missesAtTitle=[...k1].filter(k=>!k0.has(k)).length;R.missesOnContinue=k2.filter(k=>!k1.has(k)).slice(0,30);R.gates=await g.evaluate(()=>KLOAD.lifes||null);R.lifeMiss=await g.evaluate(()=>KLOAD.lifeMiss||null);R.samples=S.slice(0,8);
 console.log(DEV,JSON.stringify(R));fs.writeFileSync(`${OUT}/${DEV}.json`,JSON.stringify(R,null,1));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
