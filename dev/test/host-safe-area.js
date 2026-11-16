/* HOST SAFE AREA (stage-figsize; owner iPad photo 16/11 3:56 PM: status bar over the header top, paper strip under the tab bar).
   Host mode (rot.js design canvas). For each viewport and safe-area inset set (window.__kinsetsTest = {t,r,b,l}, the env() values iOS gives):
   the frame must lie inside the safe area (top >= t, bottom <= H-b, left >= l, right <= W-r, ±1 px), and in landscape the frame's bottom must be
   flush with the SCREEN bottom (home-indicator inset not kept free) (tab bar flush, the spare strip goes to the top). Prints a table; exit 1 on any FAIL.
   usage: node dev/test/host-safe-area.js <url> [outdir]   (outdir: one shot per case) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES=[['1366x1024',{t:24,r:0,b:20,l:0}],['1366x1024',{t:0,r:0,b:0,l:0}],['1180x820',{t:24,r:0,b:20,l:0}],['1180x820',{t:0,r:0,b:0,l:0}],['1024x768',{t:20,r:0,b:0,l:0}],['755x1000',{t:0,r:0,b:0,l:0}],['412x1058',{t:24,r:0,b:0,l:0}]];
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let fail=0;
 for(const [vp,I] of CASES){const [W,H]=vp.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});
  await ctx.addInitScript(i=>{if(window.top===window)window.__kinsetsTest=i},I);const p=await ctx.newPage();
  await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=1',{waitUntil:'domcontentloaded'});await p.waitForSelector('#krotf');await sleep(800);
  const r=await p.evaluate(()=>{const f=document.getElementById('krotf').getBoundingClientRect();return{f:[f.left,f.top,f.right,f.bottom].map(v=>Math.round(v)),K:window.__krot}});
  const [l,t,rr,bb]=r.f;const nr=r.K.rotated;const ok=nr?(l>=-1&&rr<=W+1&&t>=-1&&bb<=H+1):(t>=I.t-1&&l>=I.l-1&&rr<=W-I.r+1&&(W<H?bb<=H-I.b+1:Math.abs(bb-H)<=1));
  if(!ok)fail++;console.log((ok?'ok  ':'FAIL')+` ${vp} insets ${JSON.stringify(I)} frame ${r.f.join(',')} s ${r.K.s}${nr?' rotated':''}`);
  if(OUT)await p.screenshot({path:`${OUT}/hsa-${vp}-t${I.t}b${I.b}.png`});await ctx.close()}
 await b.close();console.log(fail?`RESULT FAIL (${fail})`:'RESULT PASS');process.exit(fail?1:0)})();
