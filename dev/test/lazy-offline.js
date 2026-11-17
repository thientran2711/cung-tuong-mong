/* dev/test/lazy-offline.js — review/perf-r1 check of the D15 asset groups (assets.json core / fig / lazy / fx) on a FRESH install.
   Per device (dev/test/lib/device.js profile, HOST mode, service worker ON, cold profile):
     1. ONLINE: open the built root, wait for the title (core loaded), play <lives> new lives x <weeks> weeks with the firsthour.js bot
        (every tab, a walk to a random place each buổi, random choices). Counts every img/ + audio/ file the game asks for, split by its
        assets.json group, which of them the SW had to fetch from the network on demand (= not prefetched), and every failed / 4xx picture
        plus every <img> that finished with no pixels (broken picture).
     2. OFFLINE (--offline): context offline, reload the host page, then (a) fetch every file seen in step 1 through the SW (must all answer
        from the cache), (b) continue the saved life from the title and walk the same places it visited; count broken pictures again,
        split into "seen online" vs "never seen" (never-seen lazy art cannot work offline by design).
   --save-data: navigator.connection.saveData=true (no background set: the strictest path, like cellular / Data-saver).
   usage: node dev/test/lazy-offline.js [--devices fold,iphone14] [--lives 2] [--weeks 2] [--root <built dir>] [--save-data] [--offline]
   exit 1 when step 1 has a broken picture that is not also missing on the CDN (404), or step 2(a) has a file not served offline. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('./lib/device');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:(A[i+1]===undefined||A[i+1].startsWith('--')?true:A[i+1])};
const DEVS=String(opt('devices','fold,iphone14')).split(','),LIVES=+opt('lives',2),WEEKS=+opt('weeks',2);
const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));const SAVE=A.includes('--save-data'),OFF=A.includes('--offline');
const MAN=JSON.parse(fs.readFileSync(path.join(ROOT,'assets.json'),'utf8'));const GRP=new Map(MAN.files.map(f=>[f[0],f]));
const keyOf=u=>{const m=/\/((?:img|audio)\/[^?#]+)/.exec(u);return m?decodeURIComponent(m[1]):null};
const sleep=t=>new Promise(r=>setTimeout(r,t));
const titleUp=()=>{const f=document.getElementById('krotf'),w=f&&f.contentWindow;if(!w||!w.document)return false;const d=w.document,t=d.getElementById('title');
 const k=w.KLOAD||{};return !!t&&!t.hidden&&t.getClientRects().length>0&&!d.getElementById('kload')&&!!w.__kbootDone&&(!k.phase||['done','skipped','all','idle'].includes(k.phase))};
/* the bot (same moves as dev/measure/firsthour.js); returns visited places */
async function play(game,weeks,fresh){return game.evaluate(async([weeks,fresh])=>{const out={buoi:0,tuan:0,places:[],bad:[]};const sl=t=>new Promise(r=>setTimeout(r,t));
 const scan=()=>{for(const i of document.images)if(i.complete&&i.currentSrc&&i.naturalWidth===0&&!out.bad.includes(i.currentSrc))out.bad.push(i.currentSrc)};
 try{if(fresh){SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){start();if(S.origin.k!=='cnv')break}Q.length=0;render()}
  const e0=endTurn;endTurn=function(){out.tuan++;return e0.apply(this,arguments)};
  const drain=async()=>{for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length){chooseM((L=>L.length?L[Math.floor(Math.random()*L.length)]:0)(m.opts.map((c,i)=>c.off?-1:i).filter(i=>i>=0)))}else closeModal()}catch(e){Q.shift();try{showModal()}catch(e){}}await sl(100);scan()}
   for(const x of [...document.querySelectorAll('#ov,#modal')].filter(x=>!x.hidden)){const bt=[...x.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(bt){bt.click();await sl(100)}}};
  for(let i=0;i<weeks*30&&out.tuan<weeks&&!S.dead;i++){await drain();if(Q.length){Q.length=0;render()}
   for(const t of [...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent)){t.click();await sl(100);scan()}
   try{const Lp=places().filter(p=>p.k&&p.k!==S.place);const pl=Lp[Math.floor(Math.random()*Lp.length)];if(pl){goTo(pl.k);out.places.push(pl.k);await sl(400);scan();await drain()}}catch(e){}
   try{goTo('home')}catch(e){}await drain();
   const n=document.getElementById('next');if(n&&!n.disabled){n.click();out.buoi++}else{try{Q.length=0;endTurn()}catch(e){}}await sl(300);scan()}
 }catch(e){out.err=String(e).slice(0,200)}return out},[weeks,fresh])}
async function revisit(game,places){return game.evaluate(async places=>{const out={bad:[],tabs:0,err:''};const sl=t=>new Promise(r=>setTimeout(r,t));
 const scan=()=>{for(const i of document.images)if(i.complete&&i.currentSrc&&i.naturalWidth===0&&!out.bad.includes(i.currentSrc))out.bad.push(i.currentSrc)};
 try{const b=document.querySelector('#title [data-load="3"]');if(!b){out.err='no saved life on the title: '+document.getElementById('title').innerText.slice(0,120);return out};b.click();await sl(1500);
  for(let j=0;j<10&&Q.length;j++){try{closeModal()}catch(e){Q.shift()}await sl(100)}
  for(const t of [...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent)){t.click();out.tabs++;await sl(250);scan()}
  for(const k of [...new Set(places)]){try{goTo(k);await sl(500);scan();for(let j=0;j<6&&Q.length;j++){try{closeModal()}catch(e){Q.shift()}await sl(80)}goTo('home');await sl(150)}catch(e){}}
 }catch(e){out.err=String(e).slice(0,200)}return out},places)}
async function runDevice(b,srv,dev){const R={device:dev,pageErrors:[]};
 const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'allow'});
 if(SAVE)await ctx.addInitScript(()=>{try{const c=navigator.connection;if(c)Object.defineProperty(Object.getPrototypeOf(c),'saveData',{get:()=>true,configurable:true})}catch(e){}});
 const st={asked:new Map(),netSW:new Map(),fail:new Map()};let phase='online';
 ctx.on('requestfinished',async r=>{const k=keyOf(r.url());if(!k||/\.json$/.test(k))return;let s=0;try{const x=await r.response();s=x?x.status():0}catch(e){}
  if(r.serviceWorker()){if(phase==='online')st.netSW.set(k,(GRP.get(k)||[])[3]||'?');return}
  if(phase==='online')st.asked.set(k,(GRP.get(k)||[])[3]||'unlisted');if(s>=400)st.fail.set(phase+' '+k,s)});
 ctx.on('requestfailed',r=>{const k=keyOf(r.url());if(!k||/\.json$/.test(k)||r.serviceWorker())return;st.fail.set(phase+' '+k,r.failure()&&r.failure().errorText)});
 const p=await ctx.newPage();p.setDefaultTimeout(600000);p.on('pageerror',e=>R.pageErrors.push(phase+': '+e.message.slice(0,140)));
 const t0=Date.now();await p.goto(srv.url+'?khost=1',{waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:600000,polling:250});R.titleMs=Date.now()-t0;
 let game=D.gameFrame(p);R.klo=await game.evaluate(()=>({phase:KLOAD.phase,coreMB:+(KLOAD.core.total/1e6).toFixed(1),figMB:+(KLOAD.fig.total/1e6).toFixed(1),bg:KLOAD.fig.left,ctl:!!navigator.serviceWorker.controller,conn:!!navigator.connection,sd:!!(navigator.connection&&navigator.connection.saveData)}));
 const visited=[];R.lives=[];
 for(let L=0;L<LIVES;L++){const o=await play(D.gameFrame(p),WEEKS,true);visited.push(...o.places);R.lives.push({buoi:o.buoi,tuan:o.tuan,places:o.places.length,bad:o.bad.length,err:o.err});
  (R.badOnline=R.badOnline||[]).push(...o.bad.map(keyOf))}
 await sleep(3000);
 const by={};for(const [k,g] of st.asked){by[g]=by[g]||{n:0,mb:0};by[g].n++;by[g].mb+=(GRP.get(k)||[0,0,0])[2]/1e6}for(const g in by)by[g].mb=+by[g].mb.toFixed(1);R.askedByGroup=by;
 const nw={};for(const [k,g] of st.netSW){nw[g]=nw[g]||{n:0,mb:0};nw[g].n++;nw[g].mb+=(GRP.get(k)||[0,0,0])[2]/1e6}for(const g in nw)nw[g].mb=+nw[g].mb.toFixed(1);R.onDemandFromNet=nw;
 R.lazyAsked=[...st.asked].filter(([k,g])=>g==='lazy').map(([k])=>k);
 R.failOnline=[...st.fail].filter(([k])=>k.startsWith('online'));
 R.cache=await D.gameFrame(p).evaluate(async()=>{const c=await caches.open('ctm-assets');return (await c.keys()).length});
 if(OFF){phase='offline';await ctx.setOffline(true);await sleep(500);
  await p.goto(srv.url+'?khost=1',{waitUntil:'commit'}).catch(e=>R.offNav=String(e).slice(0,100));
  try{await p.waitForFunction(titleUp,null,{timeout:120000,polling:250});R.offTitle=true}catch(e){R.offTitle=false}
  game=D.gameFrame(p);
  const seen=[...st.asked.keys()];
  R.offFetch=await game.evaluate(async ks=>{let ok=0;const bad=[];for(const k of ks){const u=(k.startsWith('img/')&&typeof IMG_BASE==='string'&&IMG_BASE?IMG_BASE:'')+k;
    try{const r=await fetch(u,{mode:'cors',credentials:'omit'});if(r.ok){await r.arrayBuffer();ok++}else bad.push(k+' '+r.status)}catch(e){bad.push(k+' '+String(e).slice(0,30))}}return{n:ks.length,ok,bad:bad.slice(0,20),nbad:bad.length}},seen);
  const rv=await revisit(game,visited);R.offRevisit={tabs:rv.tabs,err:rv.err,places:new Set(visited).size,bad:rv.bad.length,badSeen:rv.bad.map(keyOf).filter(k=>st.asked.has(k)),badNever:rv.bad.map(keyOf).filter(k=>!st.asked.has(k)).length};
  await ctx.setOffline(false)}
 await ctx.close();return R}
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 let fail=0;try{for(const dev of DEVS){let r;try{r=await runDevice(b,srv,dev)}catch(e){r={device:dev,fatal:String(e&&e.stack||e).slice(0,600)};fail++}
  if(r.fatal===undefined){if(r.failOnline.some(([k,s])=>s!==404&&s!=='net::ERR_ABORTED'))fail++;if(r.offFetch&&r.offFetch.nbad)fail++}
  console.log(JSON.stringify(r))}}finally{await b.close();srv.close()}
 process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
