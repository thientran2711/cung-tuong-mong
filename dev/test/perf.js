/* dev/test/perf.js — PERFORMANCE BUDGET test (owner 15/11 22:35Z, ledger D15). Run by workers / CI against the BUILT root index.html.
   usage: node dev/test/perf.js [--devices fold,iphone14,ipadAir] [--base <url of a served built site>] [--budget dev/test/perf-budget.json]
                                [--out perf-result.json] [--turns 10] [--mbit 20] [--cpu 4] [--timeout 900] [--no-warm]
   Per device (real profile, dev/test/lib/device.js, HOST mode, service worker ON, cold profile):
     firstLoadMB      wire bytes from navigation until the title is usable (loading screen gone), by type (js/html/json/audio/image/video/font/other)
                      and by source (own = site, cdn = picture CDN); counted once per network response (page requests answered by the SW are skipped,
                      the SW's own fetches are counted)
     afterTitleMB     bytes in the 30 s after the title (background set, SW precache)
     plannedBgMB      KLOAD.fig.total (what the background sets would still download in full) + KLOAD.core.total
     timeToTitleMs    navigation -> title usable          (emulated line: --mbit, 60 ms RTT; CPU throttle: --cpu)
     warmTitleMs/MB   second visit (reload, SW + cache warm): time and bytes
     timeToPlayableMs title usable -> a new life is drawn and the first buổi's "Qua buổi" button is live
     heapMB           JS heap (after gc) after <turns> buổi
     longTasks200     main-thread tasks >200 ms (PerformanceObserver 'longtask') while playing the <turns> buổi; longTaskMaxMs = the worst one
   Budget file (dev/test/perf-budget.json): {default:{metric:max,...}, <device>:{...}}; any metric over its max = FAIL, exit code 1.
   Needs: google-chrome via playwright, the picture CDN reachable (HTTPS_PROXY is used when set). ONE Chromium at a time. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('./lib/device');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const DEVS=String(opt('devices','fold,iphone14,ipadAir')).split(',');const TURNS=+opt('turns',10),MBIT=+opt('mbit',20),CPU=+opt('cpu',4),TMO=+opt('timeout',900)*1000;
const BUDGET=JSON.parse(fs.readFileSync(opt('budget',path.join(__dirname,'perf-budget.json')),'utf8'));const OUT=opt('out',null);const WARM=!A.includes('--no-warm');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const kind=(u,ct)=>{ct=ct||'';const p=u.split('?')[0].toLowerCase();
 if(/\.(js|mjs)$/.test(p)||/javascript/.test(ct))return'js';if(/\.html?$/.test(p)||/text\/html/.test(ct))return'html';if(/\.(json|webmanifest)$/.test(p))return'json';
 if(/\.(mp3|ogg|m4a|wav)$/.test(p)||/^audio/.test(ct))return'audio';if(/\.(webp|png|jpe?g|gif|svg|avif)$/.test(p)||/^image/.test(ct))return'image';
 if(/\.(mp4|webm)$/.test(p)||/^video/.test(ct))return'video';if(/\.(woff2?|ttf|otf)$/.test(p)||/font/.test(ct))return'font';return'other'};
function newCounter(){return{bytes:0,n:0,type:{},src:{},big:[]}}
function add(c,u,ct,n,own){c.bytes+=n;c.n++;const k=kind(u,ct);c.type[k]=(c.type[k]||0)+n;const s=own?'own':'cdn';c.src[s]=(c.src[s]||0)+n;c.big.push([u.replace(/^https?:\/\/[^/]+\//,'').slice(0,60),n]);if(c.big.length>400){c.big.sort((a,b)=>b[1]-a[1]);c.big.length=8}}
const mb=n=>Math.round(n/1e4)/100;
function fmt(c){const o={totalMB:mb(c.bytes),files:c.n,typeMB:{},srcMB:{}};for(const k in c.type)o.typeMB[k]=mb(c.type[k]);for(const k in c.src)o.srcMB[k]=mb(c.src[k]);return o}
async function runDevice(b,srvUrl,dev){
 const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'allow'});const R={device:dev,errors:[]};
 let cur=newCounter(),phase='load';const phases={load:cur};
 const setPhase=n=>{phase=n;cur=phases[n]=newCounter()};
 const pend=[];
 ctx.on('response',r=>{try{if(r.fromServiceWorker())return;const u=r.url();if(!/^https?:/.test(u))return;
  const h=r.headers(),own=u.startsWith(srvUrl),c=cur;
  /* exact wire bytes (compressed, headers included) once the response is finished */
  pend.push(r.request().sizes().then(z=>add(c,u,h['content-type'],z.responseBodySize+z.responseHeadersSize,own)).catch(()=>{const cl=+h['content-length'];if(cl>=0)add(c,u,h['content-type'],cl,own)}))}catch(e){}});
 const p=await ctx.newPage();p.setDefaultTimeout(TMO);p.on('pageerror',e=>R.errors.push(e.message.slice(0,150)));
 const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:60,downloadThroughput:MBIT*1e6/8,uploadThroughput:5e6/8});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
 const titleUp=()=>{const f=document.getElementById('krotf'),w=f&&f.contentWindow;if(!w||!w.document)return false;const d=w.document,t=d.getElementById('title');
  const k=w.KLOAD||{};return !!t&&!t.hidden&&t.getClientRects().length>0&&!d.getElementById('kload')&&!!w.__kbootDone&&(!k.phase||['done','skipped','all','idle'].includes(k.phase))};
 /* ---- cold visit ---- */
 const t0=Date.now();await p.goto(srvUrl+'?khost=1',{waitUntil:'commit',timeout:TMO});
 await p.waitForFunction(titleUp,null,{timeout:TMO,polling:250});R.timeToTitleMs=Date.now()-t0;
 await Promise.all(pend.splice(0));R.firstLoad=fmt(phases.load);R.firstLoadMB=R.firstLoad.totalMB;R.firstLoadBig=phases.load.big.sort((a,b)=>b[1]-a[1]).slice(0,6);
 setPhase('after');
 const game=D.gameFrame(p);
 R.klo=await game.evaluate(()=>{const k=window.KLOAD||{};return{phase:k.phase,coreMB:k.core&&+(k.core.total/1e6).toFixed(1),figMB:k.fig&&+(k.fig.total/1e6).toFixed(1),err:k.err}});
 R.plannedBgMB=R.klo.figMB||0;
 await sleep(30000);await Promise.all(pend.splice(0));R.afterTitle=fmt(phases.after);R.afterTitleMB=R.afterTitle.totalMB;
 R.sw=await game.evaluate(async()=>{try{const ks=await caches.keys();const o={caches:ks,ctl:!!navigator.serviceWorker.controller};const c=await caches.open('ctm-assets');o.assetKeys=(await c.keys()).length;
  for(const k of ks)if(k.startsWith('ctm-shell-'))o.shellKeys=(await (await caches.open(k)).keys()).length;const e=await navigator.storage.estimate();o.usageMB=Math.round(e.usage/1e5)/10;return o}catch(e){return{err:String(e)}}});
 /* ---- first playable turn + N buổi ---- */
 await game.evaluate(()=>{window.__lt=[];try{new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lt.push(Math.round(e.duration))}).observe({type:'longtask',buffered:false})}catch(e){}});
 const t1=Date.now();
 await game.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){start();if(S.origin.k!=='cnv')break}});
 await game.waitForFunction(()=>{try{for(let j=0;j<6&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){}const n=document.getElementById('next');return !!n&&!n.disabled&&!Q.length&&!S.dead},null,{timeout:TMO,polling:100});
 R.timeToPlayableMs=Date.now()-t1;
 const play=await game.evaluate(async N=>{const sl=t=>new Promise(r=>setTimeout(r,t));let done=0;window.__lt.length=0;const perBuoi=[];
  for(let i=0;i<N*6&&done<N&&!S.dead;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM((L=>L.length?L[Math.floor(Math.random()*L.length)]:0)(m.opts.map((c,i)=>c.off?-1:i).filter(i=>i>=0)));else closeModal()}catch(e){Q.shift();try{showModal()}catch(e){}}await sl(60)}
   const n=document.getElementById('next');const l0=window.__lt.length;if(n&&!n.disabled){n.click();done++}else{try{Q.length=0;endTurn()}catch(e){}}await sl(500);perBuoi.push(window.__lt.length-l0)}
  try{gc()}catch(e){}await sl(300);try{gc()}catch(e){}
  const lt=window.__lt.slice();return{turns:done,heapMB:performance.memory?Math.round(performance.memory.usedJSHeapSize/1e5)/10:null,lt200:lt.filter(x=>x>200).length,ltMax:lt.length?Math.max(...lt):0,lt50:lt.length,worstBuoi:Math.max(0,...perBuoi),dead:!!S.dead}},TURNS);
 R.turns=play.turns;R.heapMB=play.heapMB;R.longTasks200=play.lt200;R.longTaskMaxMs=play.ltMax;R.longTasks50=play.lt50;
 /* ---- warm visit ---- */
 if(WARM){setPhase('warm');await p.goto('about:blank');const t2=Date.now();await p.goto(srvUrl+'?khost=1',{waitUntil:'commit',timeout:TMO});
  await p.waitForFunction(titleUp,null,{timeout:TMO,polling:250});R.warmTitleMs=Date.now()-t2;await sleep(2500);await Promise.all(pend.splice(0));R.warmMB=mb(phases.warm.bytes);R.warm=fmt(phases.warm);R.warmBig=phases.warm.big.sort((a,b)=>b[1]-a[1]).slice(0,8)}
 await ctx.close();return R}
/* static server shaped like GitHub Pages (what players get): gzip for text, ETag + 304, Cache-Control max-age=600, Range */
function pagesServer(){const http=require('http'),zlib=require('zlib'),crypto=require('crypto');const ROOT=path.resolve(__dirname,'../..'),TY={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.mp4':'video/mp4','.webm':'video/webm'};const gz=new Map();
 return new Promise(res=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';p=p.replace(/^\/+/,'');const f=path.join(ROOT,p);
  fs.stat(f,(e,st)=>{if(e||!st.isFile()||!f.startsWith(ROOT+path.sep)){r.statusCode=404;return r.end('nf')}const ext=path.extname(f),et='"'+crypto.createHash('sha1').update(f+st.mtimeMs+st.size).digest('hex').slice(0,16)+'"';
   r.setHeader('Content-Type',TY[ext]||'application/octet-stream');r.setHeader('Cache-Control','max-age=600');r.setHeader('ETag',et);r.setHeader('Accept-Ranges','bytes');
   if(q.headers['if-none-match']===et){r.statusCode=304;return r.end()}
   const rg=/bytes=(\d*)-(\d*)/.exec(q.headers.range||'');if(rg){const n=st.size,a=rg[1]===''?Math.max(0,n-(+rg[2])):+rg[1],t=rg[2]===''||rg[1]===''?n-1:Math.min(+rg[2],n-1);r.statusCode=206;r.setHeader('Content-Range',`bytes ${a}-${t}/${n}`);r.setHeader('Content-Length',t-a+1);return fs.createReadStream(f,{start:a,end:t}).pipe(r)}
   if(/\.(html|js|json|webmanifest|svg)$/.test(ext)&&/gzip/.test(q.headers['accept-encoding']||'')){const k=f+st.mtimeMs;if(!gz.has(k))gz.set(k,zlib.gzipSync(fs.readFileSync(f),{level:6}));const b=gz.get(k);r.setHeader('Content-Encoding','gzip');r.setHeader('Content-Length',b.length);return r.end(b)}
   r.setHeader('Content-Length',st.size);fs.createReadStream(f).pipe(r)})});
  s.listen(0,'127.0.0.1',()=>{const pt=s.address().port;res({url:'http://127.0.0.1:'+pt+'/',close:()=>s.close()})})})}
const LIM=(dev,k)=>{const o=Object.assign({},BUDGET.default,BUDGET[dev]);return o[k]};
const CHECK=[['firstLoadMB','firstLoadMB'],['afterTitleMB','afterTitleMB'],['timeToTitleMs','timeToTitleMs'],['timeToPlayableMs','timeToPlayableMs'],['heapMB','heapMB'],['longTasks200','longTasks200'],['warmMB','warmMB'],['warmTitleMs','warmTitleMs']];
(async()=>{const srv=A.includes('--base')?{url:opt('base'),close(){}}:await pagesServer();
 const b=await chromium.launch({args:['--js-flags=--expose-gc','--enable-precise-memory-info'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const all=[];let fail=0;
 try{for(const dev of DEVS){let r;try{r=await runDevice(b,srv.url,dev)}catch(e){r={device:dev,fatal:String(e).slice(0,300)}}
  r.over=[];if(r.fatal)r.over.push('fatal: '+r.fatal);else for(const [m,k] of CHECK){const lim=LIM(dev,k);if(lim!==undefined&&r[m]!==undefined&&r[m]!==null&&r[m]>lim)r.over.push(`${m} ${r[m]} > ${lim}`)}
  if(r.over.length)fail++;all.push(r);console.log(JSON.stringify(r))}}finally{await b.close();srv.close()}
 console.log('\n| device | firstLoad MB | after title 30s MB | planned bg MB | title ms | playable ms | heap MB | long>200ms | warm MB | verdict |\n|---|---|---|---|---|---|---|---|---|---|');
 for(const r of all)console.log(`| ${r.device} | ${r.firstLoadMB} | ${r.afterTitleMB} | ${r.plannedBgMB} | ${r.timeToTitleMs} | ${r.timeToPlayableMs} | ${r.heapMB} | ${r.longTasks200} (max ${r.longTaskMaxMs} ms) | ${r.warmMB} | ${r.over.length?'OVER: '+r.over.join('; '):'ok'} |`);
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(all,null,1));
 process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
