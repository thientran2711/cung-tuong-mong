/* boot-skel-strip (owner 27/11 ~05:42Z "khi vừa vào game, lại có cái màn này bị lỗi nè": raw game skeleton at frame 0:00 of a robot video).
   Every boot path, every ~100 ms from navigation to ready: what is painted? Probes 5 points (centre, top HUD, left, right, bottom bar) of the
   GAME document (direct mode, or inside the #krotf frame in host mode). FAIL = any probe that hits the game shell (#game / any body child that is
   not the cover #kboot, title, #kload or a modal) before the cover let go (window.__kbootDone) or before the title / loading screen first shows. Screencast frames saved for the strip.
   usage: node dev/test/boot-skel-strip.js <baseURL> <w> <h> <outdir> <label> <mode>
     mode: robot  = direct mode as the test/video robots open it (navigator.webdriver, no query) — cold, then reload
           host   = real player path (?khost=1 host + frame) — cold (no SW), warm (SW cached), reload
           resume = host path with a save in localStorage (continue screen), warm + reload */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,W,H,OUT,LBL='run',MODE='robot']=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:1,serviceWorkers:MODE==='robot'?'block':'allow'});
 await ctx.addInitScript(()=>{
  const L=[];let last="";window.__bsLog=L;
  const cls=e=>{if(!e)return"blank";if(e.closest("#kboot,#kbootw"))return"boot";if(e.closest("#kload"))return"load";if(e.closest("#title,.kptitle"))return"title";
   if(e.closest("#modal"))return"modal";if(e.closest("#game"))return"GAME";const t=e.tagName.toLowerCase();if(t==="html"||t==="body")return t;return"SHELL:"+t+(e.id?"#"+e.id:"")};
  function pts(w){return[[w.innerWidth/2,w.innerHeight/2],[w.innerWidth/2,30],[30,w.innerHeight/2],[w.innerWidth-30,w.innerHeight/2],[w.innerWidth/2,w.innerHeight-20]]}
  function probe(){try{let doc=document,win=window,pre="direct";const fr=document.getElementById("krotf");
    if(window.top!==window)return;
    if(fr){pre="frame";win=fr.contentWindow;doc=win&&win.document;if(!doc||!doc.documentElement){rec("frame:blank");return}}
    else if(document.getElementById("kbootw")){rec("host:boot");return}
    const s=pts(win).map(([x,y])=>cls(doc.elementFromPoint(x,y))).join(",");rec(pre+":"+s+(win.__kbootDone?"|ready":""))}catch(e){}}
  function rec(s){if(s!==last){last=s;L.push([Math.round(performance.now()),s])}}
  (function loop(){probe();requestAnimationFrame(loop)})()});
 const visits=MODE==='robot'?['cold','reload']:MODE==='host'?['cold','warm','reload']:['warm','reload'];
 const q=MODE==='robot'?'':'khost=1';const url=BASE+(q?(BASE.includes('?')?'&':'?')+q:'');
 const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 if(MODE==='resume'){await p.goto(url,{waitUntil:'load',timeout:180000});await p.waitForTimeout(4000);
  /* make a real save: start a life the way the game does if the hook exists, else copy any ctm save keys present */
  /* a real save, as dev/test/mk-oldsave.js makes one: start a life, save to slot 2 */
  await p.evaluate(()=>{const f=document.getElementById('krotf');const w=f?f.contentWindow:window;w.eval("SLOT=2;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin.k!=='cnv')break}Q.length=0;save();localStorage.setItem(SK(2),JSON.stringify(ser()))")});await p.waitForTimeout(1500);
  const keys=await p.evaluate(()=>Object.keys(localStorage));console.log('localStorage keys:',keys.join(' '))}
 let fail=0;const out={};
 for(const v of visits){let n=0;const t0=Date.now();cdp.removeAllListeners('Page.screencastFrame');
  cdp.on('Page.screencastFrame',f=>{const t=Date.now()-t0;cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{});
   if(n<300)fs.writeFileSync(`${OUT}/${LBL}-${v}-${String(n++).padStart(3,'0')}-${String(t).padStart(6,'0')}ms.jpg`,Buffer.from(f.data,'base64'))});
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:45,maxWidth:+W,maxHeight:+H,everyNthFrame:1});
  if(v==='reload')await p.reload({waitUntil:'commit',timeout:180000});else await p.goto(url,{waitUntil:'commit',timeout:180000});
  await p.waitForFunction(()=>{const f=document.getElementById('krotf');const w=f?f.contentWindow:window;return !!(w&&w.document&&w.document.readyState==='complete'&&w.__ctmBuilt)},null,{timeout:240000,polling:250}).catch(()=>{});
  await p.waitForTimeout(3000);await cdp.send('Page.stopScreencast');
  const log=await p.evaluate(()=>window.__bsLog||[]);
  const tUp=(log.find(([t,s])=>/title|load|modal/.test(s))||[1e12])[0];const bad=log.filter(([t,s])=>/GAME|SHELL/.test(s)&&(!/\|ready/.test(s)||t<tUp));fail+=bad.length;out[v]={log,bad:bad.length};
  console.log(LBL,MODE,v,'frames',n,'skeleton states before ready:',bad.length);console.log('   '+log.map(x=>x.join(' ')).join('  ·  ').slice(0,1500))}
 fs.writeFileSync(`${OUT}/${LBL}-${MODE}.json`,JSON.stringify(out));console.log(fail?'FAIL':'PASS',LBL,MODE);await b.close();process.exit(fail?1:0)})();
