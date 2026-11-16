/* dev/test/lib/device.js — REAL-DEVICE test profiles + HOST mode (owner ledger D22). Shared by every worker; see dev/test/README.md.
   Why: a plain desktop Chromium with a viewport is not what a player's phone/iPad is. Real devices differ in: user agent (jload.js sniffs
   iPad/iPhone/Mac+touch for the "add to home screen" note), touch + pointer:coarse + hover:none (game text, hover glow), devicePixelRatio,
   and — biggest — the ROT.JS HOST (dev/site/rot.js): in the BUILT root index.html the game runs in ONE scaled iframe (#krotf) at the design
   size (1180x820 landscape spread / 590x820 portrait ONE PAGE = iPad half, KIT §0) and a narrow portrait phone (390x844) gets the sideways frame + "Xoay ngang điện thoại để chơi".
   Automated browsers (navigator.webdriver) get DIRECT mode by default (no host, no iframe) — that is what dev/index.html tests see.
   API (all async helpers take a Playwright browser/context/page):
     DEVICES                          name -> {w,h,dsf,ua,mobile,touch,platform?,touchPoints?,note}
     (extra pseudo-options: standalone:true = installed PWA; vibrate:true/false overrides the per-OS default: iOS has none)
   contextOptions(name, extra)      options for browser.newContext (viewport, UA, DSF, isMobile, hasTouch; serviceWorkers:'block' unless extra overrides)
     newDeviceContext(browser, name, extra)   context + init script that fixes navigator.platform/maxTouchPoints for iPad (Mac UA + touch)
     serveRoot(dir?, port?)           tiny static server (default: the repo root = the BUILT site); returns {url, port, close()}
     openHost(page, url, {hash})      load the BUILT index.html in HOST mode (?khost=1), wait for the game frame; returns the game Frame
     openDirect(page, url)            load in DIRECT mode (?khost=0), returns the page (= the game "frame")
     gameFrame(page)                  the game's Frame (the #krotf iframe in host mode, else the main frame)
     probe(page)                      {host, rotated, s, dw, dh, tip, ua, platform, touch, coarse, hover, dpr, inner:[w,h], frameInner:[w,h], standalone}
   Typical test:
     const {chromium}=require('playwright'); const D=require('./lib/device');
     const srv=await D.serveRoot(); const b=await chromium.launch(); const ctx=await D.newDeviceContext(b,'iphone14');
     const p=await ctx.newPage(); const f=await D.openHost(p,srv.url); console.log(await D.probe(p)); await b.close(); srv.close(); */
const http=require('http'),fs=require('fs'),path=require('path');

/* Real UA strings (Nov 2026-ish; the UA only has to be shaped right: tests branch on /iP(ad|hone|od)/, Android, Macintosh+touch).
   Chrome on Android freezes the minor version ("0.0.0"); iOS Safari reports "iPhone OS 17_x"; iPadOS Safari reports a MACINTOSH UA
   (desktop-class browsing) -> the only iPad signal is navigator.platform==="MacIntel" && maxTouchPoints>1 (jload.js IOS check). */
const UA={
 fold:   'Mozilla/5.0 (Linux; Android 14; SM-F946B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
 pixel:  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
 iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
 ipad:   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
 ipadOld:'Mozilla/5.0 (iPad; CPU OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
 desktop:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'};

/* viewport = the CSS size the browser reports to the BUILT page (the host then scales its 590x820 page / 1180x820 spread design into it).
   Fold inner = 755x1000 (owner's primary device); DSF 2.6 ~ Fold inner (real 2.625). */
const DEVICES={
 fold:        {w:755, h:1000,dsf:2.625,ua:UA.fold,  mobile:true, touch:true,platform:'Linux armv81',touchPoints:5, note:'Galaxy Z Fold inner screen, portrait (PRIMARY device)'},
 foldLand:    {w:1000,h:755, dsf:2.625,ua:UA.fold,  mobile:true, touch:true,platform:'Linux armv81',touchPoints:5, note:'Fold inner, landscape'},
 foldOuter:   {w:360, h:800, dsf:3,    ua:UA.fold,  mobile:true, touch:true,platform:'Linux armv81',touchPoints:5, note:'Fold cover screen (narrow portrait -> rotate prompt)'},
 iphone14:    {w:390, h:844, dsf:3,    ua:UA.iphone,mobile:true, touch:true,platform:'iPhone',touchPoints:5, note:'iPhone 14/15 portrait (narrow -> rotate prompt in host mode)'},
 iphone14Land:{w:844, h:390, dsf:3,    ua:UA.iphone,mobile:true, touch:true,platform:'iPhone',touchPoints:5, note:'iPhone 14/15 landscape'},
 pixel:       {w:412, h:915, dsf:2.625,ua:UA.pixel, mobile:true, touch:true,platform:'Linux armv81',touchPoints:5, note:'Pixel-class Android portrait (narrow -> rotate prompt)'},
 pixelLand:   {w:915, h:412, dsf:2.625,ua:UA.pixel, mobile:true, touch:true,platform:'Linux armv81',touchPoints:5, note:'Pixel-class Android landscape'},
 ipadAir:     {w:1180,h:820, dsf:2,    ua:UA.ipad,  mobile:true, touch:true, platform:'MacIntel',touchPoints:5,note:'iPad Air/Pro 11in landscape (Mac UA + touch, PRIMARY)'},
 ipadAirPort: {w:820, h:1180,dsf:2,    ua:UA.ipad,  mobile:true, touch:true, platform:'MacIntel',touchPoints:5,note:'iPad Air portrait (width/height .69 -> design one page 590x820)'},
 ipadPro:     {w:1366,h:1024,dsf:2,    ua:UA.ipad,  mobile:true, touch:true, platform:'MacIntel',touchPoints:5,note:'iPad Pro 12.9in landscape'},
 ipadProPort: {w:1024,h:1366,dsf:2,    ua:UA.ipad,  mobile:true, touch:true, platform:'MacIntel',touchPoints:5,note:'iPad Pro 12.9in portrait'},
 ipadOld:     {w:1024,h:768, dsf:2,    ua:UA.ipadOld,mobile:true,touch:true,platform:'iPad',touchPoints:5, note:'old iPad UA (iPad; CPU OS 15), iOS<16.4 regex-lookbehind era'},
 desktop:     {w:1280,h:800, dsf:1,    ua:UA.desktop,mobile:false,touch:false,note:'desktop Chrome, mouse (hover:hover, pointer:fine)'}};

/* extra may also carry D22 pseudo-options (stripped before Playwright sees them): standalone:true = installed PWA (navigator.standalone=true,
   iOS profiles only has no display-mode media emulation; Chromium: use page.emulateMedia is NOT enough, so jload's STANDALONE reads navigator.standalone). */
const PSEUDO=['standalone','vibrate'];
function contextOptions(name,extra){const d=DEVICES[name];extra=Object.assign({},extra);PSEUDO.forEach(k=>delete extra[k]);if(!d)throw new Error('unknown device '+name+' (have: '+Object.keys(DEVICES).join(', ')+')');
 return Object.assign({viewport:{width:d.w,height:d.h},screen:{width:d.w,height:d.h},deviceScaleFactor:d.dsf,userAgent:d.ua,isMobile:d.mobile,hasTouch:d.touch,
  serviceWorkers:'block'},extra||{})}

async function newDeviceContext(browser,name,extra){const d=DEVICES[name];const ctx=await browser.newContext(contextOptions(name,extra));
 /* iPhone/iPad have NO navigator.vibrate (jfx.js falls back to picture effects): delete it on iOS profiles (override: {vibrate:true}); Android keeps it */
 const ios=/iP(ad|hone|od)/.test(d.ua)||d.platform==='MacIntel';const noVib=extra&&extra.vibrate!==undefined?!extra.vibrate:ios;
 await ctx.addInitScript(([nv,sa])=>{try{if(nv)Object.defineProperty(Navigator.prototype,'vibrate',{value:undefined,configurable:true});
  if(sa)Object.defineProperty(Navigator.prototype,'standalone',{get:()=>true,configurable:true})}catch(e){}},[noVib,!!(extra&&extra.standalone)]);
 /* Chromium keeps platform "Linux x86_64" and maxTouchPoints 1 under UA override: align them with the device (iPadOS reports MacIntel + 5 touch points) */
 if(d.platform||d.touchPoints)await ctx.addInitScript(([pl,tp])=>{try{if(pl)Object.defineProperty(Navigator.prototype,'platform',{get:()=>pl});
  if(tp)Object.defineProperty(Navigator.prototype,'maxTouchPoints',{get:()=>tp})}catch(e){}},[d.platform||null,d.touchPoints||null]);
 ctx.__device=Object.assign({name},d);return ctx}

const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json',
 '.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm','.css':'text/css'};
/* dir default = the repo root (built index.html + sw.js + assets.json + img/audio). Cache-Control: no-store so a rebuilt index.html is always read. */
function serveRoot(dir,port){const ROOT=path.resolve(dir||path.join(__dirname,'../../..'));
 return new Promise((res,rej)=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';p=p.replace(/^\/+/,'');
  const f=path.join(ROOT,p);if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}
  r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
  s.on('error',rej);s.listen(port||0,'127.0.0.1',()=>{const pt=s.address().port;res({url:'http://127.0.0.1:'+pt+'/',port:pt,root:ROOT,close:()=>s.close()})})})}

const withQ=(u,q)=>u+(u.includes('?')?'&':'?')+q;
function gameFrame(page){return page.frames().find(f=>f!==page.mainFrame()&&(f.name()==='krotf'||/[?&]krot=1/.test(f.url())))||page.mainFrame()}

/* HOST mode: ?khost=1 forces rot.js's host even under automation. The built index.html swallows the game in <plaintext> and creates #krotf.
   Resolves when the frame exists and its game script has run (window.start is defined, or kboot finished). */
async function openHost(page,url,o){o=o||{};await page.goto(withQ(url,'khost=1')+(o.hash||''),{waitUntil:'domcontentloaded',timeout:o.timeout||120000});
 await page.waitForSelector('#krotf',{timeout:o.timeout||120000,state:'attached'});
 await page.waitForFunction(()=>{const f=document.getElementById('krotf'),w=f&&f.contentWindow;try{return !!(w&&w.document&&w.document.readyState!=='loading'&&(typeof w.start==='function'||w.__kbootDone))}catch(e){return false}},null,{timeout:o.timeout||120000,polling:200});
 return gameFrame(page)}
async function openDirect(page,url,o){o=o||{};await page.goto(withQ(url,'khost=0'),{waitUntil:'domcontentloaded',timeout:o.timeout||120000});
 await page.waitForFunction(()=>typeof start==='function',null,{timeout:o.timeout||120000});return page}

async function probe(page){return page.evaluate(()=>{const k=window.__krot||{},f=document.getElementById('krotf');let fi=null;try{fi=f&&[f.contentWindow.innerWidth,f.contentWindow.innerHeight]}catch(e){}
 const mq=q=>{try{return matchMedia(q).matches}catch(e){return null}};
 return{host:!!k.host,rotated:!!k.rotated,s:k.s,dw:k.dw,dh:k.dh,tip:!!document.getElementById('krottip'),tipTapCatching:(()=>{const t=document.getElementById('krottip');return !!t&&getComputedStyle(t).pointerEvents!=='none'})(),
  ua:navigator.userAgent,platform:navigator.platform,webdriver:navigator.webdriver,touchPoints:navigator.maxTouchPoints,coarse:mq('(pointer:coarse)'),hover:mq('(hover:hover)'),
  dpr:devicePixelRatio,inner:[innerWidth,innerHeight],frameInner:fi,standalone:mq('(display-mode: standalone)')}})}

module.exports={DEVICES,UA,contextOptions,newDeviceContext,serveRoot,openHost,openDirect,gameFrame,probe};
