/* seal-lean-2 (owner 19/11 ~05:05Z): REAL video proof of the mood-seal lean-in. usage: node dev/test/seal-lean-video.js <W>x<H> <outdir> [SECS=34]
   Records (Playwright recordVideo at 2x size) one natural full-screen take (>= SECS s, leans happen by themselves) + one forced lean per feeling (gian, buon, vui) and writes
   <outdir>/log-<W>x<H>.json (lean timings + clone rect) and <outdir>/raw-<W>x<H>.webm. Cut/crop with ffmpeg afterwards (dev/test/seal-lean-cut.sh). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,SZ,OUT]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});const SECS=+process.env.SECS||34;
const ROOT=path.resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,reducedMotion:'no-preference',serviceWorkers:'block',recordVideo:{dir:OUT+'/rec',size:{width:W*2,height:H*2}}});
 const t0=Date.now();
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/dev/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 await p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;
  S.emo={k:'gian',v:70,why:'thử',t:null,w:0};S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  S.met=S.met||{};const ks=['ghen','vui','buon','so','muu'];rivals.slice(0,5).forEach((v,i)=>{S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:ks[i%5],v:60,why:'thử',w:0}});
  for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}m.emo={k:'so',v:60,why:'thử',w:0}}try{k61Meet(S.emp,'gặp',3)}catch(e){}render()});
 await p.waitForTimeout(3000);
 /* log every lean: start, end, key, big rect, peak size */
 await p.evaluate(()=>{window.__L=[];const ob=new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes)if(n.nodeType===1&&n.classList&&n.classList.contains('kemo-big')){const l={t:performance.now(),w:n.getBoundingClientRect().width,k:'',leanMs:0,rect:null,cls:n.className,maxW:0,vw:innerWidth,vh:innerHeight};window.__L.push(l);n.__l=l;
   (function tick(){if(!n.isConnected){l.end=performance.now();return}const r=n.getBoundingClientRect();if(r.width>l.maxW){l.maxW=r.width}
    l.inside=(l.inside===undefined?true:l.inside)&&r.left>=-1&&r.top>=-1&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1;
    if(r.width>=l.maxW*.98){l.rect={x:r.left,y:r.top,w:r.width,h:r.height};l.tBig=l.tBig||performance.now();l.tBigEnd=performance.now()}requestAnimationFrame(tick)})()}
   for(const n of m.removedNodes)if(n.__l)n.__l.end=performance.now()}});ob.observe(document.body,{childList:true})});
 const T0=await p.evaluate(()=>performance.timeOrigin),log={W,H,errs,natural:[],forced:[]};
 const mark=async()=>(await p.evaluate(()=>performance.timeOrigin+performance.now()))-t0;
 log.naturalStart=await mark();await p.waitForTimeout(SECS*1000);log.naturalEnd=await mark();
 log.natural=await p.evaluate(()=>window.__L.map(l=>({...l})));
 /* wait for any running lean to end before forced takes */
 await p.waitForFunction(()=>!document.querySelector('img.kemo-big'),null,{timeout:30000}).catch(()=>{});
 for(const key of ['gian','buon','vui']){
  const info=await p.evaluate(key=>{const vis=[...document.querySelectorAll('img.kemo.kemo-live')].filter(e=>{const r=e.getBoundingClientRect();return r.width>2&&r.top>0&&r.bottom<innerHeight});if(!vis.length)return null;
   const e=vis[0],set=(/emo-((?:m-|mo-)?)[a-z-]+\.webp/.exec(e.dataset.kemos||e.getAttribute('src'))||[0,''])[1];
   if(!new RegExp('kemo-'+key+'(\\s|$)').test(e.className+' ')){e.className=e.className.replace(/kemo-(?!live|lean|m-)[a-z0-9_-]+/,'kemo-'+key).replace(/kemo-m-\w+/,'').trim();e.dataset.kemos='img/kit/emo-'+set+key+'.webp';e.setAttribute('src',e.dataset.kemos);window.kitEmoSeal.live(e,true)}
   e.__ln&&clearTimeout(e.__ln);const n0=window.__L.length;window.kitEmoSeal.lean(e,true);const r=e.getBoundingClientRect();return{n0,small:{x:r.left,y:r.top,w:r.width,h:r.height},src:e.getAttribute('src')}},key);
  if(!info){log.forced.push({key,err:'no seal'});continue}
  const ts=await mark();await p.waitForFunction(()=>!document.querySelector('img.kemo-big'),null,{timeout:40000});const te=await mark();await p.waitForTimeout(1200);
  const L=await p.evaluate(n0=>({...window.__L[n0]}),info.n0);log.forced.push({key,ts,te,small:info.small,src:info.src,big:L});
 }
 log.errs=errs;fs.writeFileSync(`${OUT}/log-${W}x${H}.json`,JSON.stringify(log,null,1));
 const vp=p.video();await ctx.close();await vp.saveAs(`${OUT}/raw-${W}x${H}.webm`);await b.close();console.log('done',errs.length,'errs')})();
