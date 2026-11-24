/* Timed figure loaders keep the last good list (review/sideline-dlg, law 11). node dev/test/figload-keep.js  (after dev/site/build_site.sh)
   Every loader on a 5-minute timer (j39 loadFigs, j73 kidLoad, jfigx figxLoad, jht htLoad, jkc kcFigLoad, jkcg kcgHyLoad, jty tyLoad) refetches its list; a failed or
   empty refetch (offline, CDN hiccup) used to replace the good index with an empty one, so every figure of that kind vanished (kids lost their paintings
   and their dialogue scenes were skipped). Loads the game, then makes every fetch fail, runs each loader again, and checks every index is still full. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 /* catch every 5-minute timer callback (jht's htLoad lives in a closure: its timer is the only way in) */await p.addInitScript(()=>{const si=window.setInterval;window.__iv=[];window.setInterval=function(f,ms){if(ms===300000)window.__iv.push(f);return si.apply(this,arguments)}});
 await D.openDirect(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:180000});await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:180000});
 const n=()=>p.evaluate(()=>({FIGS:FIGS.length,KIDIX:Object.keys(KIDIX.prince).length+Object.keys(KIDIX.princess).length,FIGXR:FIGXR.length+Object.keys(FIGXT).length,KCFX:Object.keys(KCFX).length,KCHY:KCHY.length,TY:TYF.ix?Object.keys(TYF.ix).length:0}));
 await p.waitForFunction(()=>FIGS.length&&Object.keys(KIDIX.prince).length&&Object.keys(KCFX).length&&FIGXR.length&&TYF.ix,null,{timeout:60000}).catch(()=>{});
 ok(await p.evaluate(()=>window.__iv.length)>=7,'the 5-minute loaders are caught ('+await p.evaluate(()=>window.__iv.length)+')');
 const a=await n();for(const k in a)ok(a[k]>0,`before: ${k} loaded (${a[k]})`);
 for(const mode of ['reject','404','empty']){
  await p.evaluate(m=>{window.__f0=window.__f0||window.fetch;window.fetch=()=>m==='reject'?Promise.reject(new Error('offline')):Promise.resolve(new Response(m==='404'?'':'[]',{status:m==='404'?404:200}));
   window.__iv.forEach(f=>{try{f()}catch(e){}})},mode);await p.waitForTimeout(1500);
  const c=await n();for(const k in a)ok(c[k]===a[k],`${mode} refetch: ${k} kept (${a[k]} -> ${c[k]})`)}
 await p.evaluate(()=>{window.fetch=window.__f0});
 console.log(fail?`FIGLOAD KEEP: ${fail} FAIL`:'FIGLOAD KEEP: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})();
