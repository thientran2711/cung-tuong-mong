/* PLAY-TIME perf budget (owner 16/11 15:05Z OD (4): lag = first priority). Compares tab-change + render cost between two served builds.
   usage: node dev/test/sw-serve.js 8955 <repo root> & node dev/test/sw-serve.js 8960 <main build root> &
          node dev/test/play-perf.js http://localhost:8955/ http://localhost:8960/ [WxH@D] [reps]   -> A = new, B = reference. Exit 1 when A is >25 % + 15 ms slower in any metric.
   Metrics per tab (CPU throttled 4x, same seeded life): tapMs = click -> two animation frames later, renderMs = render() call, longMs = long-task total over the tap. */
const {chromium}=require('playwright');const [,,A,B,SZ='755x1000@2',REPS='4']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const SEED=()=>{let a=20261116;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const LIFE=()=>{try{localStorage.clear()}catch(e){}OPT.fxon=false;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<200;i++){start();if(!isSrv()&&!(window.isKc&&isKc()))break}
 window.CLEAN=()=>{document.querySelectorAll('[id^=kroul],#dawn,#kload,#kpodov,.kmov').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()};CLEAN();return S.name};
async function run(b,base,W,H,D,reps){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block',hasTouch:true,isMobile:W<1100});await c.addInitScript(SEED);
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(base.replace(/\/?$/,'/')+'index.html?khost=1',{waitUntil:'commit'});
 await p.waitForSelector('#krotf',{timeout:60000});let f;for(let i=0;i<600&&!f;i++){f=p.frames().find(x=>/krot=1/.test(x.url()));if(!f)await sleep(300)}
 await f.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await f.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:180000}).catch(()=>{});await sleep(1500);
 await f.evaluate(LIFE);for(let i=0;i<4;i++){await sleep(700);await f.evaluate(()=>CLEAN())}
 const s=await c.newCDPSession(p);await s.send('Emulation.setCPUThrottlingRate',{rate:4});
 let tabs=await f.evaluate(()=>[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetWidth).map(b=>b.dataset.tab||b.dataset.kg).filter(Boolean));if(process.env.TABS)tabs=tabs.filter(t=>process.env.TABS.split(',').includes(t));
 const out={};for(const t of tabs){out[t]={tap:[],render:[],long:[]};
  for(let r=0;r<reps;r++){const m=await f.evaluate(async t=>{CLEAN();const e=[...document.querySelectorAll('#tabs button')].find(b=>b.offsetWidth&&(b.dataset.tab||b.dataset.kg)===t);
    let lt=0;const po=new PerformanceObserver(l=>l.getEntries().forEach(x=>lt+=x.duration));try{po.observe({entryTypes:['longtask']})}catch(e){}
    const t0=performance.now();e.click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const tap=performance.now()-t0;
    const r0=performance.now();render();const rd=performance.now()-r0;await new Promise(r=>setTimeout(r,60));po.disconnect();return{tap,rd,lt}},t);
   out[t].tap.push(m.tap);out[t].render.push(m.rd);out[t].long.push(m.lt);await sleep(150)}}
 await c.close();return{out,errs}}
const med=a=>{a=[...a].sort((x,y)=>x-y);return a[a.length>>1]};
(async()=>{const m=SZ.match(/(\d+)x(\d+)@?(\d*)/),[W,H,D]=[+m[1],+m[2],+(m[3]||1)];const b=await chromium.launch();let fail=0;
 const ra=await run(b,A,W,H,D,+REPS),rb=await run(b,B,W,H,D,+REPS);
 console.log(`${SZ} reps ${REPS}  (ms, median; A=new  B=ref)  errs A ${ra.errs.length} B ${rb.errs.length}`);console.log('tab     tapA   tapB  | renderA renderB | longA longB');
 for(const t of Object.keys(ra.out)){const x=ra.out[t],y=rb.out[t]||{tap:[0],render:[0],long:[0]};const r=[med(x.tap),med(y.tap),med(x.render),med(y.render),med(x.long),med(y.long)];
  const bad=r[0]>r[1]*1.25+15||r[2]>r[3]*1.25+15;if(bad)fail++;console.log(t.padEnd(7),r.map(v=>v.toFixed(0).padStart(6)).join(' '),bad?'  <-- SLOWER':'')}
 ra.errs.slice(0,3).forEach(e=>console.log('ERR A',e));await b.close();process.exit(fail||ra.errs.length?1:0)})();
