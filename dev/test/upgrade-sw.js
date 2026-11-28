/* dev/test/upgrade-sw.js — returning-install update check (review/perf-r1, risk 3 of D15).
   One origin, two built roots: OLD (e.g. a checkout of main) then NEW (this worktree). Picture CDN files (not the .json manifests) are answered
   with one tiny stub picture, so the old build's large core fills in a few minutes; keys are content hashes from assets.json, so the cache logic
   is exercised exactly as with real pictures. Background set off (navigator.connection.saveData=true) so phase 1 = old core only.
   1. OLD: cold profile, host mode, SW on; wait for the title (old core complete); note SW version, build, ctm-assets keys.
   2. switch the server to NEW; reload like a returning player; wait until the NEW worker controls the page and the title is up.
      Check: index = NEW build (host + iframe), shell cache = NEW only, no loading screen download of core (core files fetched in phase 2),
      ctm-assets after prune = old keys minus those whose hash changed / path removed (no wipe), no page errors.
   3. reload once more offline: NEW build from the shell cache, title up.
   usage: node dev/test/upgrade-sw.js --old /home/user/cung-tuong-mong [--new <this root>] [--device fold]   exit 1 on any failed check */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path'),http=require('http');const D=require('./lib/device');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:A[i+1]};
const SLOW=A.includes('--slow');let DELAY=0;  /* --slow: in phase 2 the NEW index.html answers after 7 s, so the old worker gives the host its SAVED (old) copy after 4 s; the iframe must get that same build (risk 4) */
const OLD=path.resolve(opt('old','/home/user/cung-tuong-mong')),NEW=path.resolve(opt('new',path.join(__dirname,'../..'))),DEV=opt('device','fold');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const TY={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg','.svg':'image/svg+xml'};
let ROOT=OLD;const hits=[];let DELAY1=0;  /* phase 4: delay only the next index request (the host's), by DELAY1 ms */
const srv=http.createServer(async(q,r)=>{if(DELAY1&&/(^\/$|index\.html$)/.test(new URL(q.url,'http://x').pathname)){const d=DELAY1;DELAY1=0;await sleep(d)}if(DELAY&&/(^\/$|index\.html$)/.test(new URL(q.url,'http://x').pathname))await sleep(DELAY);let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';p=p.replace(/^\/+/,'');hits.push(p);
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}
 r.setHeader('Content-Type',TY[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','max-age=600');fs.createReadStream(f).pipe(r)});
const STUB=fs.readFileSync(path.join(NEW,'icons',fs.readdirSync(path.join(NEW,'icons')).find(f=>/\.png$/.test(f))));
const man=root=>new Map(JSON.parse(fs.readFileSync(path.join(root,'assets.json'),'utf8')).files.map(f=>[f[0],f]));
const titleUp=()=>{const f=document.getElementById('krotf'),w=f&&f.contentWindow;if(!w||!w.document)return false;const d=w.document,t=d.getElementById('title');
 const k=w.KLOAD||{};return !!t&&!t.hidden&&t.getClientRects().length>0&&!d.getElementById('kload')&&!!w.__kbootDone&&(!k.phase||['done','skipped','all','idle'].includes(k.phase))};
const state=g=>g.evaluate(async()=>{const o={build:window.CTM_BUILD,kl:window.KLOAD&&{phase:KLOAD.phase,coreLeft:KLOAD.core.left,coreTotal:Math.round(KLOAD.core.total/1e6)}};
 const sw=navigator.serviceWorker.controller;o.v=sw?await new Promise(ok=>{const ch=new MessageChannel();navigator.serviceWorker.addEventListener('message',function f(e){if(e.data&&e.data.ctm==='v'){navigator.serviceWorker.removeEventListener('message',f);ok(e.data.v)}});sw.postMessage({ctm:'v'});setTimeout(()=>ok('?'),3000)}):null;
 o.caches=await caches.keys();const c=await caches.open('ctm-assets');o.keys=(await c.keys()).map(r=>r.url);
 for(const k of o.caches)if(k.startsWith('ctm-shell-')){const s=await caches.open(k);const r=await s.match('index.html');o.shellIndexBuild=r?((await r.text()).match(/const BUILD="([a-z0-9]+)"/)||[])[1]:null}
 return o});
(async()=>{await new Promise(ok=>srv.listen(0,'127.0.0.1',ok));const url='http://127.0.0.1:'+srv.address().port+'/';
 const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const R={old:OLD,new:NEW,device:DEV,errors:[],fail:[]};
 try{const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'allow'});
  await ctx.addInitScript(()=>{try{const c=navigator.connection;if(c)Object.defineProperty(Object.getPrototypeOf(c),'saveData',{get:()=>true,configurable:true})}catch(e){}});
  await ctx.route(/ctm-img|r2\.dev|workers\.dev\/img\//,async rt=>{const u=rt.request().url();if(/\.json(\?|$)/.test(u))return rt.continue();
   return rt.fulfill({status:200,headers:{'content-type':'image/png','access-control-allow-origin':'*'},body:STUB})});
  const p=await ctx.newPage();p.setDefaultTimeout(900000);let ph='old';p.on('pageerror',e=>R.errors.push(ph+': '+e.message.slice(0,140)));
  /* 1. OLD */
  let t0=Date.now();await p.goto(url+'?khost=1',{waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:900000,polling:500});
  await p.waitForFunction(()=>{const w=document.getElementById('krotf').contentWindow;return !!w.navigator.serviceWorker.controller},null,{timeout:120000});
  const s1=await state(D.gameFrame(p));R.oldTitleMs=Date.now()-t0;R.old1={build:s1.build,v:s1.v,kl:s1.kl,keys:s1.keys.length,caches:s1.caches};
  /* 2. NEW (returning player) */
  ROOT=NEW;ph='new';if(SLOW)DELAY=7000;const h0=hits.length;t0=Date.now();
  await p.goto(url+'?khost=1',{waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:900000,polling:500});
  const vNew=(fs.readFileSync(path.join(NEW,'sw.js'),'utf8').match(/const V='([^']+)'/)||[])[1];
  const bNew=(fs.readFileSync(path.join(NEW,'index.html'),'utf8').match(/const BUILD="([a-z0-9]+)"/)||[])[1];
  if(SLOW){const g=D.gameFrame(p);const sb=await g.evaluate(()=>window.CTM_BUILD);R.slow={iframeBuild:sb,oldBuild:s1.build};
   if(sb!==s1.build)R.fail.push('slow line: iframe got '+sb+' but the host was given the saved build '+s1.build);DELAY=0;
   await sleep(3000);await p.goto(url+'?khost=1',{waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:900000,polling:500})}
  let s2;for(let i=0;i<40;i++){s2=await state(D.gameFrame(p));if(s2.v===vNew)break;await sleep(1000)}
  await sleep(6000);s2=await state(D.gameFrame(p));R.newTitleMs=Date.now()-t0;
  const hostBuild=await p.evaluate(()=>window.CTM_BUILD||null);  /* the host page swallows the game script (rot.js): null there is normal */
  const Mo=man(OLD),Mn=man(NEW);const keep=s1.keys.filter(k=>{const u=new URL(k),m=/\/((?:img|audio)\/.+)$/.exec(decodeURIComponent(u.pathname));if(!m)return true;const f=Mn.get(m[1]);return f&&f[1]===u.searchParams.get('h')});
  const kset=new Set(s2.keys);const lost=keep.filter(k=>!kset.has(k));
  const coreNew=[...Mn.values()].filter(f=>f[3]==='core').map(f=>f[0]);const fetched2=new Set(hits.slice(h0));
  R.new2={build:s2.build,hostBuild,v:s2.v,expect:{v:vNew,build:bNew},kl:s2.kl,caches:s2.caches,shellIndexBuild:s2.shellIndexBuild,keys:s2.keys.length,shouldKeep:keep.length,lost:lost.length,lostEx:lost.slice(0,5),
   coreAudioRefetched:coreNew.filter(p=>p.startsWith('audio/')&&fetched2.has(p)).length,ownHits:hits.length-h0};
  if(s2.v!==vNew)R.fail.push('new SW not in control: '+s2.v+' != '+vNew);
  if(s2.build!==bNew||(hostBuild&&hostBuild!==bNew))R.fail.push('stale index: iframe '+s2.build+' host '+hostBuild+' expected '+bNew);
  if(s2.shellIndexBuild!==bNew)R.fail.push('shell cache index is '+s2.shellIndexBuild);
  if(s2.caches.filter(k=>k.startsWith('ctm-shell-')).length!==1)R.fail.push('shell caches: '+s2.caches.join(','));
  if(lost.length)R.fail.push(lost.length+' still-valid asset keys wiped');
  if(s2.kl&&s2.kl.coreLeft)R.fail.push('core files missing after update: '+s2.kl.coreLeft);
  /* 3. offline reload */
  ph='offline';await ctx.setOffline(true);t0=Date.now();await p.goto(url+'?khost=1',{waitUntil:'commit'}).catch(()=>{});
  try{await p.waitForFunction(titleUp,null,{timeout:120000,polling:500});const s3=await state(D.gameFrame(p));R.off3={ms:Date.now()-t0,build:s3.build};if(s3.build!==bNew)R.fail.push('offline build '+s3.build)}catch(e){R.fail.push('offline title not up')}
  /* 4. (--slow) NEW worker in control, a newer build NEW2 is published, the host's index answer is slow (4.6 s, CPU 6x): the worker gives the
     host its SAVED copy (NEW) after 4 s; the iframe must get that same NEW build, never NEW2 that arrives a moment later (risk 4) */
  if(SLOW){await ctx.setOffline(false);const N2=fs.mkdtempSync(path.join(NEW,'.tmp-new2-'));
   for(const f of fs.readdirSync(NEW))if(!f.startsWith('.tmp-new2-')&&f!=='index.html')fs.symlinkSync(path.join(NEW,f),path.join(N2,f));
   fs.writeFileSync(path.join(N2,'index.html'),fs.readFileSync(path.join(NEW,'index.html'),'utf8').replace(/const BUILD="[a-z0-9]+"/,'const BUILD="eeeeeeeeeeee"'));
   try{ROOT=N2;ph='new2';const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});DELAY1=4600;
    await p.goto(url+'?khost=1',{waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:900000,polling:500});
    const b4=await D.gameFrame(p).evaluate(()=>window.CTM_BUILD);R.slow4={iframeBuild:b4,hostGivenSaved:bNew};if(b4!==bNew)R.fail.push('phase 4: iframe got '+b4+' while the host was given the saved '+bNew);
    await cdp.send('Emulation.setCPUThrottlingRate',{rate:1})}finally{ROOT=NEW;fs.rmSync(N2,{recursive:true,force:true})}}
  await ctx.close()}catch(e){R.fail.push('fatal '+String(e&&e.stack||e).slice(0,300))}
 finally{await b.close();srv.close()}
 if(R.errors.length)R.fail.push(R.errors.length+' page errors');
 console.log(JSON.stringify(R,null,1));process.exit(R.fail.length?1:0)})();
