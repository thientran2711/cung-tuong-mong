/* dev/measure/offline-fast.js — review/offline-fast (owner bug 24/11 ~18:00Z, Fold: «tốn ít nhất 10 tới 15 giây để nó bắt đầu lên tiếng nhạc, đồng thời bắt đầu tải game»).
   Timings of the first seconds after opening the game with a REAL-SIZE manifest (32 443 files: core 837 / fig 610 / fx 102 / lazy 30 894, same as live assets.json)
   and a half-filled cache (~10 764 'ctm-assets' entries, as in her screenshot), CPU throttled (default 4×).
   Built site + fake files served locally (dev/test/offline-all.js root + server). Per scenario it reloads the game and then does what she did:
   title up → Thiết lập → «Tải hết để chơi offline» → «Bắt đầu tải», and reports:
     sw     time for a cached sound/picture to come through the service worker (= what the music waits for), worst + at the tap moment
     lag    worst main-thread stall (setInterval drift) in the first 20 s
     nums   tap on the row button → panel shows real numbers (not zeros)
     dl     tap on «Bắt đầu tải» → first not-yet-cached file asked from the line
   PASS per scenario: SW wait at the tap < 800 ms, worst SW wait from Thiết lập on < 1 s, worst main-thread stall from Thiết lập on < 0.7 s, first numbers < 2 s, first download < 1.5 s after the tap, no page errors.
   usage: node dev/measure/offline-fast.js [cpu=4] [devices=fold,ipadAir] [scen=half,cold,resume] */
const ARGS=process.argv.slice(2);process.argv[2]=require('path').join(require('os').tmpdir(),'offline-fast-root-'+require('path').basename(require('path').resolve(__dirname,'../..')));
const {chromium}=require('playwright');const OA=require('../test/offline-all.js');const D=require('../test/lib/device');
const CPU=+(ARGS[0]||4),DEVS=(ARGS[1]||'fold,ipadAir').split(','),SC=(ARGS[2]||'half,cold,resume').split(',');
const sleep=t=>new Promise(r=>setTimeout(r,t));
function bigMan(v){const files=[];const add=(g,n,sz)=>{for(let i=0;i<n;i++)files.push([`img/t/${g}-${i}.webp`,(g[0]+String(i)).padEnd(12,'0').slice(0,12)+'hh00',sz,g])};
 add('core',837,1500);add('fig',610,2000);add('fx',102,1500);add('lazy',30894,1500);return {v,files}}
const titleUp=()=>{const f=document.getElementById('krotf'),w=f&&f.contentWindow;if(!w||!w.document)return false;const d=w.document,t=d.getElementById('title');const k=w.KLOAD||{};return !!t&&!t.hidden&&t.getClientRects().length>0&&!d.getElementById('kload')&&!!w.__kbootDone&&(!k.phase||['done','skipped','all','idle'].includes(k.phase))&&!!w.CTM_OFFLINE};
/* in the game frame from its first line: a probe fetch of a cached core file through the SW every 250 ms + a 50 ms tick for main-thread stalls */
const PROBE=()=>{if(window===window.top)return;const T0=performance.timeOrigin;const P=window.__ofp={sw:[],lag:0,lagAt:0,ph:[]};let ph0='';setInterval(()=>{const k=window.KLOAD;const v=k?k.phase+'/'+(k.all&&k.all.state)+(k.all&&k.all.planning?'+plan':'')+(k.all&&k.all.counting?'+count':''):'-';if(v!==ph0){ph0=v;P.ph.push([performance.now(),v])}},100);let last=performance.now();
 P.lags=[];setInterval(()=>{const n=performance.now(),d=n-last-50;last=n;if(d>P.lag){P.lag=d;P.lagAt=n}if(d>100)P.lags.push([n,d])},50);
 let busy=false;setInterval(()=>{if(busy||!navigator.serviceWorker||!navigator.serviceWorker.controller)return;busy=true;const t=performance.now();
  fetch('img/t/core-1.webp').then(r=>r.arrayBuffer()).then(()=>{P.sw.push([t,performance.now()-t]);busy=false},()=>{busy=false})},250);P.cs=[];let b2=false;setInterval(()=>{if(b2)return;b2=true;const t=performance.now();caches.open('ctm-probe').then(c=>c.match('x')).then(()=>{P.cs.push([t,performance.now()-t]);b2=false},()=>{b2=false})},250)};
async function swNow(g){return g.evaluate(async()=>{const t=performance.now();await (await fetch('img/t/core-2.webp')).arrayBuffer();return Math.round(performance.now()-t)})}
async function fill(g,n){return g.evaluate(async n=>{const c=await caches.open('ctm-assets');const m=await (await fetch('assets.json')).json();let k=0;const L=m.files.filter(f=>f[3]==='lazy').slice(0,n);
  for(let i=0;i<L.length;i+=200)await Promise.all(L.slice(i,i+200).map(f=>c.put(new URL(f[0]+'?h='+f[1],location.href).href,new Response('x',{headers:{'Content-Type':'image/webp'}}))));return L.length},n)}
async function run(b,srv,dev,scen){
 srv.man=bigMan('v1');srv.hits.clear();srv.total=0;
 const X=await OA.open(b,srv,dev);let {ctx,p}=X;let g=D.gameFrame(p);
 if(scen!=='cold')await fill(g,10764-837);
 await g.evaluate(s=>{localStorage.setItem('ctm-offall',JSON.stringify(s==='resume'?{on:1}:{}))},scen);
 if(scen==='cold')await g.evaluate(async()=>{for(const k of await caches.keys())await caches.delete(k)});
 if(scen==='warm'){/* her SECOND opening after this build: one plain open first (the known list is written), then the measured one */
  await p.reload({waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:300000,polling:250});await sleep(26000);g=D.gameFrame(p);await g.evaluate(()=>localStorage.setItem('ctm-offall','{}'))}
 await ctx.addInitScript(PROBE);
 const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
 const t0=Date.now();await p.reload({waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:300000,polling:250});const tTitle=Date.now()-t0;g=D.gameFrame(p);
 /* what she did: at once Thiết lập → row → panel → Bắt đầu tải */
 const tOpt=Date.now();const swTap=await swNow(g);
 await g.evaluate(()=>{const b=document.querySelector('#modal [data-tgo="opt"]');if(b)b.click()});
 await g.waitForFunction(()=>!!document.querySelector('#modal .offwrap [data-oa="open"]'),null,{timeout:60000,polling:100});
 const tRow=Date.now();await g.evaluate(()=>document.querySelector('#modal .offwrap [data-oa="open"]').click());
 await g.waitForFunction(()=>!!document.querySelector('#modal .oa-btns [data-oa="start"],#modal .oa-btns [data-oa="pause"]'),null,{timeout:120000,polling:100});const tPanel=Date.now()-tRow;
 const panel0=await g.evaluate(()=>{const m=document.querySelector('#modal .oa-rows');return m?m.innerText.replace(/\s+/g,' ').trim():''});
 const hits0=srv.total;const tTap=Date.now();
 await g.evaluate(()=>{const s=document.querySelector('#modal .oa-btns [data-oa="start"]');if(s)s.click()});
 const FILLED=scen==='cold'?0:10764-837;const fresh=()=>{let n=0;for(const [k,v] of srv.hits){const m=/^img\/t\/(lazy|fx)-(\d+)/.exec(k);if(m&&(m[1]==='fx'||+m[2]>=FILLED))n+=v}return n};const f0=fresh();
 let tDl=null,tNums=null,tFirst=/\/ 32\.443/.test(panel0)?tPanel:null;const numsOk=()=>g.evaluate(()=>{const m=document.querySelector('#modal .oa-rows');return !!m&&KLOAD.all.total>0&&!KLOAD.all.counting&&!KLOAD.all.planning&&!/đang đếm/.test(m.innerText)}).catch(()=>false);
 while(Date.now()-tTap<120000&&(tDl===null||tNums===null)){if(tDl===null&&(fresh()>f0||await g.evaluate(()=>KLOAD.all.got>0).catch(()=>false)))tDl=Date.now()-tTap;if(tFirst===null&&/\/ 32\.443/.test(await g.evaluate(()=>{const m=document.querySelector('#modal .oa-rows');return m?m.innerText:''}).catch(()=>'')))tFirst=Date.now()-tRow;if(tNums===null&&await numsOk())tNums=Date.now()-tRow;await sleep(50)}
 const panel1=await g.evaluate(()=>{const m=document.querySelector('#modal .oa-rows');return m?m.innerText.replace(/\s+/g,' ').trim():''});
 await sleep(Math.max(0,tTitle+20000-(Date.now()-t0)));
 const P=await g.evaluate(()=>window.__ofp||{sw:[],lag:0,lags:[]});const swMax=Math.round(Math.max(0,...P.sw.map(x=>x[1])));const tl=await g.evaluate(()=>performance.timeOrigin);const rel=x=>+((tl+x-t0)/1000).toFixed(1);const optP=tOpt-tl;
 const swAfter=Math.round(Math.max(0,...P.sw.filter(x=>x[0]+x[1]>=optP).map(x=>x[1])));const lagAfter=Math.round(Math.max(0,...(P.lags||[]).filter(x=>x[0]>=optP).map(x=>x[1])));
 console.log('slow sw (s since reload, ms):',JSON.stringify(P.sw.filter(x=>x[1]>300).map(x=>[rel(x[0]),Math.round(x[1])])),'stall at',rel(P.lagAt),'phases',JSON.stringify((P.ph||[]).map(x=>[rel(x[0]),x[1]])),'asked',await g.evaluate(()=>KLOAD.asked),'direct cache slow',JSON.stringify((P.cs||[]).filter(x=>x[1]>300).map(x=>[rel(x[0]),Math.round(x[1])])),'stalls>100ms',JSON.stringify((P.lags||[]).map(x=>[rel(x[0]),Math.round(x[1])])),'tm',JSON.stringify(await g.evaluate(()=>KLOAD.tm||{}).then(o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,rel(v)])))),'title',tTitle/1000,'tap',(tTap-t0)/1000);
 const r={dev,scen,cpu:CPU,title_s:+(tTitle/1000).toFixed(1),sw_at_tap_ms:swTap,sw_worst_ms:swMax,lag_worst_ms:Math.round(P.lag),sw_after_ms:swAfter,lag_after_ms:lagAfter,panel_open_ms:tPanel,first_nums_ms:tFirst,nums_ms:tNums,dl_after_tap_ms:tDl,panel0,panel1,errs:X.errs.slice(0,3)};
 await ctx.close();return r}
(async()=>{OA.mkRoot();const srv=await OA.server();const b=await chromium.launch();const out=[];
 try{for(const dev of DEVS)for(const s of SC){const r=await run(b,srv,dev,s);console.log(JSON.stringify(r));out.push(r)}}
 finally{await b.close();srv.close()}
 console.log('\n| device | scenario | CPU | title s | SW wait at tap ms | SW worst ms (whole boot) | main-thread worst stall ms (whole boot) | SW worst from Thiết lập on | main-thread worst from Thiết lập on | panel opens ms | first numbers ms | counting done ms | 1st download after tap ms |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|');
 let bad=0;for(const r of out){const g=r.sw_at_tap_ms<800&&r.sw_after_ms<1000&&r.lag_after_ms<700&&r.first_nums_ms!==null&&r.first_nums_ms<2000&&r.dl_after_tap_ms!==null&&r.dl_after_tap_ms<1500&&!r.errs.length;if(!g)bad++;console.log((g?'PASS ':'FAIL ')+r.dev+' '+r.scen)}
 if(process.env.OF_GATE)process.exitCode=bad?1:0;
 for(const r of out)console.log(`| ${r.dev} | ${r.scen} | ${r.cpu}× | ${r.title_s} | ${r.sw_at_tap_ms} | ${r.sw_worst_ms} | ${r.lag_worst_ms} | ${r.sw_after_ms} | ${r.lag_after_ms} | ${r.panel_open_ms} | ${r.first_nums_ms} | ${r.nums_ms} | ${r.dl_after_tap_ms} |`)})();
