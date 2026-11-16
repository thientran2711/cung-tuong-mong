/* boot-flash (owner 15/11 "Khi vừa bấm vào game, có chừng ít hơn 1 giây hiện khung này"): what does the player SEE from the first paint
   until the game UI is ready? CPU throttle 4x + slow network, real host mode (?khost=1, design canvas iframe), two visits (cold, then warm with
   the service worker). Every animation frame (in every frame of the page) logs which element covers the screen centre and the bottom bar:
   'boot' (#kboot cover), 'title' (#title / title kit panel), 'load' (#kload), 'game' (#game skeleton or game), 'blank' (nothing painted yet).
   FAIL = any frame where the bare #game skeleton shows before the game is ready (window.__kbootDone not set yet). On an old build (no
   cover) every 'game' state before 'title' / 'load' is the flash. Screencast frames (jpeg) are saved for eyeballing.
   usage: node dev/test/boot-flash.js <baseURL> <w> <h> <outdir> [label]   (one browser, closed at the end)
   D22: set DEVICE=<name from dev/test/lib/device.js> (e.g. DEVICE=iphone14) to use that real profile (UA, touch, DSF) instead of the plain <w>x<h> viewport. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,BASE,W,H,OUT,LBL='run']=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=process.env.DEVICE?await D.newDeviceContext(b,process.env.DEVICE,{serviceWorkers:'allow'}):await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:1});
 /* probe from the HOST page only (the frame's first about:blank window is reused by its navigation, so an init script does not follow it):
    at the screen centre (and 20 px above the bottom) of the host, and inside the game frame (same origin) at its design centre / bottom */
 await ctx.addInitScript(()=>{if(window.top!==window)return;const L=[];let last="";
  const cls=e=>!e?"blank":e.id==="kbootw"||e.closest("#kboot")?"boot":e.closest("#kload")?"load":e.closest("#title,.kptitle")?"title":e.closest("#modal")?"modal":e.closest("#game")?"game":e.tagName.toLowerCase();
  function probe(){try{const d=document;let s;const h=d.elementFromPoint(innerWidth/2,innerHeight/2);
    if(h&&h.id==="krotf"){const w=h.contentWindow,fd=w&&w.document;if(!fd||!fd.documentElement)s="frame:blank";
     else s="frame:"+cls(fd.elementFromPoint(w.innerWidth/2,w.innerHeight/2))+"|"+cls(fd.elementFromPoint(w.innerWidth/2,w.innerHeight-20))+(w.__kbootDone?"|ready":"")}
    else s="host:"+cls(h&&(h.closest&&h.closest("#kbootw")||h));
    if(s!==last){last=s;L.push([Math.round(performance.now()),s])}}catch(e){}}
  (function loop(){probe();requestAnimationFrame(loop)})();window.__bootLog=L});
 const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:6e6/8,uploadThroughput:1e6/8});
 const res={};
 for(const visit of ["cold","warm"]){let n=0;const frames=[];const t0=Date.now();
  cdp.removeAllListeners('Page.screencastFrame');
  cdp.on('Page.screencastFrame',async f=>{const t=Date.now()-t0;cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{});
   if(n<400){const fn=`${OUT}/${LBL}-${visit}-${String(n++).padStart(3,"0")}-${t}ms.jpg`;fs.writeFileSync(fn,Buffer.from(f.data,'base64'));frames.push(fn)}});
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:40,maxWidth:+W,maxHeight:+H,everyNthFrame:1});
  await p.goto(BASE+(BASE.includes("?")?"&":"?")+"khost=1",{waitUntil:'commit',timeout:120000});
  /* wait until the game is ready (title kit panel or game), max 180 s */
  const ok=await p.waitForFunction(()=>{const f=document.getElementById("krotf");const w=f&&f.contentWindow;return !!(w&&w.document&&w.document.readyState==="complete"&&(w.__kbootDone||w.document.querySelector(".kptitle:not([hidden]),#kload")))},null,{timeout:180000,polling:300}).then(()=>true,()=>false);
  await p.waitForTimeout(2500);await cdp.send('Page.stopScreencast');
  const log=await p.evaluate(()=>window.__bootLog||[]);
  /* the bare #game skeleton at the centre or the bottom bar, before the cover was let go */
  const bad=log.filter(([t,s])=>/^frame:/.test(s)&&/game/.test(s)&&!/ready/.test(s));
  const first=log.find(([t,s])=>!/^host:(html|body|blank)$|^frame:blank$|^frame:(html|body)\|/.test(s));
  res[visit]={ok,frames:frames.length,log,skeletonStates:bad.length,firstPainted:first};
  console.log(LBL,visit,"ready:",ok,"frames:",frames.length,"skeleton states before ready:",bad.length,"first painted:",first&&first.join(" "));
  console.log("  ",log.map(x=>x.join(" ")).join("  ·  "));
  if(visit==="cold")await p.goto('about:blank')}
 fs.writeFileSync(`${OUT}/${LBL}.json`,JSON.stringify(res,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
