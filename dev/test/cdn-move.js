/* jload moveCdn: pictures already fetched by the pre-CDN build (ctm-assets under the site's own img/ path) move to their CDN key, no re-download.
   usage: node dev/test/cdn-move.js <newURL>  → JSON {moved, ownLeft, cdnKey} */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({serviceWorkers:'block'});const p=await ctx.newPage();
 await p.route(/\/img\//,r=>r.abort());  // the page must not fetch the plain pictures itself during setup
 await p.goto(process.argv[2]+'?setup',{waitUntil:'domcontentloaded'});
 const f=await p.evaluate(async()=>{const m=await (await fetch('assets.json')).json();const f=m.files.find(x=>x[0]==='img/title-key.webp');
  const c=await caches.open('ctm-assets');await c.put(new URL(f[0]+'?h=oldsha256hash000',location.href).href,new Response(new Uint8Array(f[2]),{headers:{'Content-Type':'image/webp'}}));return f});
 await p.unroute(/\/img\//);const q=await ctx.newPage();await q.goto(process.argv[2],{waitUntil:'domcontentloaded'});await q.waitForTimeout(6000);
 const r=await q.evaluate(async f=>{const c=await caches.open('ctm-assets');const ks=(await c.keys()).map(x=>x.url);
  return{moved:window.KLOAD&&KLOAD.moved,ownLeft:ks.filter(u=>u.startsWith(location.origin)).length,cdnKey:ks.includes(IMG_BASE+f[0]+'?h='+f[1])}},f);
 console.log(JSON.stringify(r));await b.close()})();
