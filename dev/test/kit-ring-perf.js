/* RING-BUILD perf: rAF frame times of spin (turn + fling), focus and group focus at CPU 4x throttle (CDP), Fold + iPad.
   usage: node dev/test/kit-ring-perf.js <url> [WxH,...]   prints p50 / p95 / share of frames > 20 ms (60 fps budget ≈ 16.7 ms) */
const {chromium}=require('playwright');const boot=require('./kit-ring-boot.js');const [,,URL,SIZES]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();
  await boot(p,{url:URL});const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:+(process.env.RATE||4)});await p.waitForTimeout(1500);
  const run=async(label,fn)=>{const r=await p.evaluate(async fn=>{const T=[];let on=true,l=performance.now();const f=t=>{T.push(t-l);l=t;if(on)requestAnimationFrame(f)};requestAnimationFrame(f);
    await (new Function('return ('+fn+')()'))();await new Promise(s=>setTimeout(s,200));on=false;T.shift();T.sort((a,b)=>a-b);const q=k=>T[Math.min(T.length-1,Math.floor(T.length*k))]||0;
    return {n:T.length,p50:+q(.5).toFixed(1),p95:+q(.95).toFixed(1),slow:+(T.filter(x=>x>20).length/Math.max(1,T.length)).toFixed(2)}},fn.toString());console.log(wh,label,JSON.stringify(r))};
  await run('turn x3',async()=>{for(let i=0;i<3;i++){await kitRing.turnBy(1)}});
  await run('focus',async()=>{await kitRing.focus();await new Promise(s=>setTimeout(s,1200))});
  await run('back',async()=>{await kitRing.back();await new Promise(s=>setTimeout(s,500))});
  await run('group mode + focus',async()=>{await kitRing.setMode('group');await new Promise(s=>setTimeout(s,400));await kitRing.focus();await new Promise(s=>setTimeout(s,1200))});
  await ctx.close()}
 await b.close()})();
