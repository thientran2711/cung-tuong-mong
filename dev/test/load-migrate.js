/* jload: a player of an older build (files in 'ctm-<timestamp>' under plain paths) must not download them again.
   usage: node dev/test/load-migrate.js <baseURL> */
const {chromium}=require('playwright');const BASE=process.argv[2];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'manifest.webmanifest');
 const n=await p.evaluate(async()=>{const m=await (await fetch('assets.json')).json();const c=await caches.open('ctm-1794691644');
  const core=m.files.filter(f=>f[3]==='core');await Promise.all(core.map(f=>c.add(f[0])));return core.length});
 const got=[];p.on('request',q=>{if(q.headers()['x-ctm-load']&&!/(fig|por|ev|st|map-fest)-/.test(q.url()))got.push(q.url())});
 const t0=Date.now();await p.goto(BASE,{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:120000});
 const r=await p.evaluate(async()=>({names:await caches.keys(),phase:KLOAD.phase,core:KLOAD.core}));
 console.log(JSON.stringify({legacyFiles:n,coreDownloadedAgain:got.length,migrateMs:Date.now()-t0,...r,errs}));await b.close()})();
