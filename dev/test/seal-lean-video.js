/* seal-lean-2 (owner 19/11 ~05:05Z): REAL video proof of the mood-seal lean-in. usage: node dev/test/seal-lean-video.js <W>x<H> <outdir> [SECS=34]
   Context A (dpr 1, recordVideo size = viewport so the game FILLS the frame): ONE natural full-screen take of SECS s -> <outdir>/full-<WxH>.mp4.
   Context B (dpr 2, no recording): per feeling (gian, buon, vui) one forced lean (grow -> hold -> shrink), clip screenshots of the big seal around its box (~8 fps, timed)
   assembled by ffmpeg into <outdir>/close-<key>-<WxH>.mp4 (720x720, H.264). Writes <outdir>/log-<WxH>.json (lean timings). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const cp=require('child_process');
const [,,SZ,OUT]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});const SECS=+process.env.SECS||34;
const ROOT=path.resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
async function open(b,dpr,rec){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dpr,reducedMotion:'no-preference',serviceWorkers:'block',...(rec?{recordVideo:{dir:OUT+'/rec-'+SZ,size:{width:W,height:H}}}:{})});
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/dev/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 await p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;
  S.emo={k:'gian',v:70,why:'thử',t:null,w:0};S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  S.met=S.met||{};const ks=['ghen','vui','buon','so','muu'];rivals.slice(0,5).forEach((v,i)=>{S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:ks[i%5],v:60,why:'thử',w:0}});
  for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}m.emo={k:'so',v:60,why:'thử',w:0}}try{k61Meet(S.emp,'gặp',3)}catch(e){}render()});
 if(process.env.GIAN3)await p.evaluate(b=>{KIT_EMOSEAL.anim=b},process.env.GIAN3);/* seal-lean-3 giận 3-part set: test-only base (the _review CDN folder), live img/kit/emo-anim untouched */
 await p.waitForTimeout(3000);
 await p.evaluate(()=>{window.__L=[];const ob=new MutationObserver(ms=>{for(const m of ms){for(const n of m.addedNodes)if(n.nodeType===1&&n.classList&&n.classList.contains('kemo-big')){const l={t:performance.now(),maxW:0,inside:true};window.__L.push(l);n.__l=l;
   (function tick(){if(!n.isConnected){l.end=performance.now();return}const r=n.getBoundingClientRect();if(r.width>l.maxW)l.maxW=r.width;l.inside=l.inside&&r.left>=-1&&r.top>=-1&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1;requestAnimationFrame(tick)})()}
   for(const n of m.removedNodes)if(n.__l)n.__l.end=performance.now()}});ob.observe(document.body,{childList:true})});
 return{ctx,p,errs}}
(async()=>{const b=await chromium.launch();const log={W,H};
 {const {ctx,p,errs}=await open(b,1,true);const t0=Date.now();await p.waitForTimeout(SECS*1000);log.natural=await p.evaluate(()=>window.__L.map(l=>({secs:+((l.end-l.t)/1e3).toFixed(1),bigPx:Math.round(l.maxW),inside:l.inside})));log.errsA=errs;
  const v=p.video();await ctx.close();await v.saveAs(`${OUT}/raw-${SZ}.webm`);
  /* the recording starts when the page opens; trim the load part (page open -> game drawn) with ffmpeg: keep the last SECS+1 s */
  cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',`${OUT}/raw-${SZ}.webm`]);const dur=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',`${OUT}/raw-${SZ}.webm`]).toString();
  cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(Math.max(0,dur-SECS-1.5)),'-i',`${OUT}/raw-${SZ}.webm`,'-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-preset','fast',`${OUT}/full-${SZ}.mp4`])}
 /* seal-lean-3 (owner 19/11 ~07:25Z): the EVENT DIALOG take: every opening of the event dialog (.ksz3) plays the seal lean once; recorded full screen, dialog opened at the START of the kept part */
 {const {ctx,p,errs}=await open(b,1,true);await p.evaluate(()=>{window.__T0=performance.now()});if(process.env.DOMLOG)await p.evaluate(()=>{window.__D=[];setInterval(()=>{const t=Math.round(performance.now());window.__D.push([t,[...document.querySelectorAll('img.kemo,.kemo-big')].filter(e=>e.closest('.ksz3')||e.classList.contains('kemo-big')).map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return [e.className.slice(0,40),Math.round(r.left),Math.round(r.top),Math.round(r.width),c.visibility,e.complete,(e.currentSrc||e.src||'').slice(-18)]})])},20)});/* DOMLOG: frame-step the DOM around the part swaps */
/* PRE-ANGER (no re-render during the take): open the sample dialog once, read WHO is in it, close it, make her angry (a real mood) and warm the giận stills, then record the real opening with her giận seal already in place */
 if(process.env.GIANEV){await p.evaluate(()=>{try{kitPopSample('event')}catch(e){console.error(e)}});await p.waitForTimeout(3500);
  await p.evaluate(async()=>{const e=document.querySelector('.ksz3 img.kemo.kfseal');const q=e&&e.__fig?kfsPerson(e.__fig):null;window.__angry=q;if(q){S.met=S.met||{};if(q.id)S.met[q.id]=1;try{k61Meet(q,'gặp',3)}catch(x){}q.emo={k:'gian',v:70,why:'thử',t:null,w:0}}
   const e0=document.querySelector('img.kemo');const b0=e0?e0.src.replace(/emo-[^/]*$/,''):'';await Promise.all(['','m-','mo-'].map(x=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=b0+'emo-'+x+'gian.webp'})));
   document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;window.__L.length=0;if(window.__D)window.__D.length=0});await p.waitForTimeout(2500)}
 await p.waitForTimeout(1500);const t0=Date.now();await p.evaluate(()=>{try{kitPopSample('event')}catch(e){console.error(e)}});
  await p.waitForTimeout(11000);
  log.event=await p.evaluate(()=>window.__L.filter(l=>l.end).map(l=>({secs:+((l.end-l.t)/1e3).toFixed(1),bigPx:Math.round(l.maxW)})));log.errsE=errs;if(process.env.DOMLOG)fs.writeFileSync(`${OUT}/dom-${SZ}.json`,JSON.stringify(await p.evaluate(()=>window.__D)));const v=p.video();await ctx.close();await v.saveAs(`${OUT}/rawe-${SZ}.webm`);
  const dur=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',`${OUT}/rawe-${SZ}.webm`]).toString();
  cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(Math.max(0,dur-13.5)),'-i',`${OUT}/rawe-${SZ}.webm`,'-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-preset','fast',`${OUT}/event-${SZ}.mp4`])}
 {const {ctx,p,errs}=await open(b,2,false);log.forced=[];
  for(const key of (process.env.KEYS||'gian,buon,vui,binh').split(',')){
   const info=await p.evaluate(key=>{const vis=[...document.querySelectorAll('img.kfseal.kemo-live')].filter(e=>{const r=e.getBoundingClientRect();return r.width>2&&r.top>0&&r.bottom<innerHeight});if(!vis.length)return null;
    const e=vis[0],set=(/emo-((?:m-|mo-)?)[a-z-]+\.webp/.exec(e.dataset.kemos||e.getAttribute('src'))||[0,''])[1];
    if(!new RegExp('kemo-'+key+'(\\s|$)').test(e.className+' ')){e.className=e.className.replace(/kemo-(?!live|lean|m-)[a-z0-9_-]+/,'kemo-'+key).replace(/kemo-m-\w+/,'').trim();e.dataset.kemos='img/kit/emo-'+set+key+'.webp';e.setAttribute('src',e.dataset.kemos);window.kitEmoSeal.live(e,true)}
    e.__ln&&clearTimeout(e.__ln);window.kitEmoSeal.lean(e,true);const c=document.querySelector('.kemo-big');return c?{l:parseFloat(c.style.left),t:parseFloat(c.style.top),w:parseFloat(c.style.width),h:parseFloat(c.style.height)}:null},key);
   if(!info){log.forced.push({key,err:'no seal'});continue}
   const pad=Math.max(info.w,info.h)*.22,side=Math.max(info.w,info.h)+2*pad,cx=info.l+info.w/2,cy=info.t+info.h/2;
   const clip={x:Math.max(0,Math.min(W-side,cx-side/2)),y:Math.max(0,Math.min(H-side,cy-side/2)),width:side,height:side};
   const dir=`${OUT}/cl-${key}-${SZ}`;fs.mkdirSync(dir,{recursive:true});const fr=[];const t0=Date.now();
   while(await p.evaluate(()=>!!document.querySelector('.kemo-big'))&&Date.now()-t0<30000){const t=Date.now()-t0,f=`${dir}/${String(fr.length).padStart(4,'0')}.jpg`;await p.screenshot({path:f,type:'jpeg',quality:92,clip});fr.push([f,t])}
   fs.writeFileSync(`${dir}/list.txt`,fr.map((x,i)=>`file '${x[0]}'\nduration ${((i+1<fr.length?fr[i+1][1]:x[1]+120)-x[1])/1000}`).join('\n')+`\nfile '${fr[fr.length-1][0]}'\n`);
   cp.execFileSync('ffmpeg',['-y','-loglevel','error','-f','concat','-safe','0','-i',`${dir}/list.txt`,'-vf','scale=720:720:flags=lanczos,fps=25','-c:v','libx264','-pix_fmt','yuv420p','-crf','20',`${OUT}/close-${key}-${SZ}.mp4`]);
   log.forced.push({key,secs:+((Date.now()-t0)/1000).toFixed(1),frames:fr.length,box:info});await p.waitForTimeout(1000)}
  log.errsB=errs;await ctx.close()}
 fs.writeFileSync(`${OUT}/log-${SZ}.json`,JSON.stringify(log,null,1));await b.close();console.log('done',JSON.stringify(log.natural),log.forced.map(f=>f.secs+'s/'+f.frames))})();
