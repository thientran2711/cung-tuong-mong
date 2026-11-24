/* ag2perf-probe (review/ag2-perf, C-AG #12 18/11; owner gate OD 17/11 ~15:45Z: perf on a 4x CPU-throttled profile, per khắc AND per buổi).
   Same harness as eng-probe (seeded Math.random, render/showModal stubbed, bot life), no profiler, CDP Emulation.setCPUThrottlingRate <cpu>.
   Each buổi: K khắc steps = spend(1) (THE khắc step: j-chain spend(1), one khắc of her time through every wrapper (the khắc clock: views, j95 final, agWatch …) timed one by one), then
   placeWhere + agFlush + nextBuoi timed as the buổi step. Prints medians and means.
   usage: python3 dev/build/assemble.py && [PRE='js run before start'] node dev/test/ag2perf-probe.js dev/index.html <N buổi> <seed> [cpu=4] [khắc per buổi=3] */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const [,,F,N0,SD,C0,K0]=process.argv;const N=+N0||40,SEED=+SD||1,CPU=+(C0||4),K=+(K0||3);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(PRE=>{if(PRE)(0,eval)(PRE);localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};},process.env.PRE||'');
const run=(n,k)=>p.evaluate(([n,k])=>{const B=[],KH=[];for(let i=0;i<n&&!S.dead;i++){for(let j=0;j<k;j++){Q.length=0;S.mg=0;const t=performance.now();try{spend(1)}catch(e){}KH.push(performance.now()-t)}
  Q.length=0;S.mg=0;const t=performance.now();try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}try{nextBuoi()}catch(e){}B.push(performance.now()-t);Q.length=0}return{B,KH,at:[S.turn,S.buoi],dead:!!S.dead}},[n,k]);
await run(4,K);const cdp=await p.context().newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
const r=await run(N,K);const med=a=>{a=a.slice().sort((x,y)=>x-y);return a.length?+a[a.length>>1].toFixed(1):0},mean=a=>a.length?+(a.reduce((s,x)=>s+x,0)/a.length).toFixed(1):0;
console.log(JSON.stringify({cpu:CPU,n:r.B.length,buoiMed:med(r.B),buoiMean:mean(r.B),khacMed:med(r.KH),khacMean:mean(r.KH),khacP95:+r.KH.slice().sort((x,y)=>x-y)[Math.floor(r.KH.length*.95)].toFixed(1),at:r.at,dead:r.dead,errs:errs.slice(0,3)}));await b.close()})();
