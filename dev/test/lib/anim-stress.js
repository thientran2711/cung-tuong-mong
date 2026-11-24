/* dev/test/lib/anim-stress.js — ORDER #8 ANIM-STRESS (owner OD 23/11 ~23:10Z; TEST-ONLY, DEFAULT-OFF, NO NEW ART).
   Injects N synthetic LIVE figures (today's real full-body pictures from the image CDN) into the running game page, in one of three formats:
     css     two CSS-transform layers per figure on the existing webp (whole body = idle breath; lower body clip = sleeve sway) — compositor only
     sprite  a sprite sheet GENERATED in the page (12 frames of the same motion drawn onto a canvas), played with steps() (background-position repaint)
     webm    a short ALPHA video loop (VP9 yuva420p, 3 s, made by dev/test/lib/anim-gen.py from the same picture) in a <video loop muted playsinline>
   Rules the generator follows (the ones the budget will recommend): loops get random phase (negative delay) so they never tick together;
   ONE action clip at a time (every 10–20 s a figure plays the bigger «act» variant of its own format, then returns to idle).
   NODE API:  prep({dir, formats, figs})  → downloads the figures, makes the alpha webm files (cached in dir);  install(ctx|page, prepped)  → routes /__r10anim/*.webm
              inject(page,{format,n,dialogue})  /  remove(page)  /  PLAY=string (the browser side, for addInitScript use)
   usage in a runner:   const A=require('./lib/anim-stress.js');const pre=await A.prep({dir:'…'});await A.install(ctx,pre);await A.inject(page,{format:'css',n:6});…
   Figures: img/fig-consort-c01..c12-t1-a18.webp on https://ctm-img.victoria-tntt.workers.dev (374x900 RGBA); 12 distinct pictures so 12 live figures are 12 different decodes. */
const fs=require('fs'),path=require('path'),cp=require('child_process'),https=require('https');
const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const NAMES=Array.from({length:12},(_,i)=>'fig-consort-c'+String(i+1).padStart(2,'0')+'-t1-a18');
function get(u,f){return new Promise((res,rej)=>{if(fs.existsSync(f)&&fs.statSync(f).size>1000)return res(f);const req=https.get(u,r=>{if(r.statusCode!==200){r.resume();return rej(new Error(u+' → '+r.statusCode))}const w=fs.createWriteStream(f);r.pipe(w);w.on('finish',()=>w.close(()=>res(f)))});req.on('error',rej);req.setTimeout(30000,()=>req.destroy(new Error('timeout '+u)))})}
async function prep(o){o=o||{};const dir=path.resolve(o.dir||path.join(__dirname,'..','..','..','..','anim-cache'));fs.mkdirSync(path.join(dir,'figs'),{recursive:true});fs.mkdirSync(path.join(dir,'vid'),{recursive:true});
 const names=NAMES.slice(0,o.figs||12);for(const n of names)await get(CDN+n+'.webp',path.join(dir,'figs',n+'.webp'));
 if((o.formats||['webm']).includes('webm')){const todo=names.filter(n=>!fs.existsSync(path.join(dir,'vid',n+'-idle.webm'))||!fs.existsSync(path.join(dir,'vid',n+'-act.webm')));
  if(todo.length)cp.execFileSync('python3',['-I',path.join(__dirname,'anim-gen.py'),path.join(dir,'vid'),...todo.map(n=>path.join(dir,'figs',n+'.webp'))],{stdio:'inherit'})}
 const sizes={};for(const n of names){sizes[n]={webp:fs.statSync(path.join(dir,'figs',n+'.webp')).size};for(const k of ['idle','act']){const f=path.join(dir,'vid',n+'-'+k+'.webm');if(fs.existsSync(f))sizes[n][k]=fs.statSync(f).size}}
 return{dir,names,sizes}}
/* serve the alpha clips from disk under /__r10anim/ (any origin) */
async function install(target,pre){await target.route('**/__r10anim/*.webm',async route=>{const f=path.join(pre.dir,'vid',decodeURIComponent(new URL(route.request().url()).pathname.split('/').pop()));
  if(!fs.existsSync(f))return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:'video/webm',body:fs.readFileSync(f),headers:{'access-control-allow-origin':'*','accept-ranges':'none'}})})}

/* ---- browser side: window.__r10anim.start(cfg) / stop() ---- */
const PLAY=`(function(){if(window.__r10anim)return;const CDN=${JSON.stringify(CDN)},NAMES=${JSON.stringify(NAMES)};
 const A=window.__r10anim={on:false,els:[],timers:[],urls:[],actN:0,start,stop,stat:()=>({n:A.els.length,acts:A.actN,fmt:A.fmt})};
 let seed=7;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const css=document.createElement('style');css.id='r10anim-css';css.textContent=
  '#r10anim{position:fixed;z-index:40;pointer-events:none;overflow:hidden}'+
  '#r10anim .rf{position:absolute;bottom:0;transform-origin:50% 100%}'+
  '#r10anim .rf>*{position:absolute;left:0;top:0;width:100%;height:100%}'+
  '#r10anim .rf img{object-fit:contain;object-position:50% 100%;transform-origin:50% 100%;will-change:transform}'+
  '#r10anim .rf .lo{clip-path:inset(46% 0 0 0);transform-origin:50% 46%}'+
  '#r10anim .rf .up{clip-path:inset(0 0 54% 0)}'+
  '@keyframes r10br{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.012)}}'+
  '@keyframes r10sw{0%,100%{transform:scaleY(1) skewX(0deg) translateX(0)}50%{transform:scaleY(1.012) skewX(.7deg) translateX(.5%)}}'+
  '@keyframes r10ac{0%,100%{transform:scale(1) rotate(0)}30%{transform:scale(1.03,1.035) rotate(-1.4deg)}65%{transform:scale(1.02) rotate(1.1deg)}}'+
  '@keyframes r10sp{from{background-position:0 0}to{background-position:calc(var(--w)*-12) 0}}'+
  '#r10anim .rf.css .up{animation:r10br 3.6s ease-in-out infinite}#r10anim .rf.css .lo{animation:r10sw 3.6s ease-in-out infinite}'+
  '#r10anim .rf.css.act{animation:r10ac 1.6s ease-in-out 1}'+
  '#r10anim .rf.sprite .sp{background-size:calc(var(--w)*12) 100%;background-repeat:no-repeat;animation:r10sp 1.5s steps(12) infinite}'+
  '#r10anim .rf video{width:100%;height:100%;object-fit:contain;object-position:50% 100%}';
 document.head.appendChild(css);
 /* one sprite sheet per (picture, variant): 12 frames of the same breath + shear as anim-gen.py, drawn on a canvas at the display size */
 const sheets={};
 function sheet(img,w,h,act){const key=img.src+'|'+w+'x'+h+'|'+act;if(sheets[key])return sheets[key];const N=12,c=document.createElement('canvas');c.width=w*N;c.height=h;const g=c.getContext('2d');
  const ab=act?.022:.010,as=act?.060:.012,iw=img.naturalWidth,ih=img.naturalHeight,s=Math.min(w/iw,h/ih),dw=iw*s,dh=ih*s;
  for(let i=0;i<N;i++){const t=i/N,b=1+ab*Math.sin(2*Math.PI*t),k=as*Math.sin(2*Math.PI*t+.8);g.save();g.translate(i*w+(w-dw)/2,h);g.transform(1,0,k,b,-k*dh*.45*0,0);g.drawImage(img,0,-dh,dw,dh);g.restore()}
  return sheets[key]=new Promise(r=>c.toBlob(b=>{const u=URL.createObjectURL(b);A.urls.push(u);r(u)}))}
 async function start(cfg){stop();A.on=true;A.fmt=cfg.format;seed=cfg.seed||7;
  const st=document.getElementById('stage')||document.body,sr=st.getBoundingClientRect();const root=document.createElement('div');root.id='r10anim';
  let box,figH,cols;const n=cfg.n;
  if(cfg.dialogue){/* two big figures facing each other in the dialogue area (centre of the screen, over the modal) */
   const m=document.getElementById('modal'),r=(m&&!m.hidden&&m.querySelector('.dlg'))?m.querySelector('.dlg').getBoundingClientRect():{left:0,top:innerHeight*.15,width:innerWidth,height:innerHeight*.7};
   box={left:Math.max(0,r.left),top:Math.max(0,r.top-r.height*.35),width:Math.min(innerWidth,r.width),height:r.height*.9};figH=box.height*.8;cols=2}
  else{box={left:sr.left,top:sr.top,width:sr.width,height:sr.height};cols=n<=6?n:Math.ceil(n/2);const rows=n<=6?1:2;figH=box.height*.79*(n<=4?1:n<=6?.82:.62)/(rows>1?1:1)}
  Object.assign(root.style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px'});document.body.appendChild(root);
  const imgs=await Promise.all(Array.from({length:n},(_,i)=>new Promise(res=>{const im=new Image();im.crossOrigin='anonymous';im.decoding='async';im.onload=()=>res(im);im.onerror=()=>res(null);im.src=CDN+NAMES[i%12]+'.webp'})));
  const rows=Math.ceil(n/cols);
  for(let i=0;i<n;i++){const im=imgs[i];if(!im)continue;const col=i%cols,row=Math.floor(i/cols);const fw=Math.min(figH*im.naturalWidth/im.naturalHeight,box.width/cols*1.35),fh=fw*im.naturalHeight/im.naturalWidth;
   const f=document.createElement('div');f.className='rf '+cfg.format;f.dataset.i=i;f.dataset.name=NAMES[i%12];
   const x=cols===1?box.width/2:(col+.5)*box.width/cols;f.style.cssText='width:'+fw+'px;height:'+fh+'px;left:'+(x-fw/2)+'px;bottom:'+(row*(box.height*.06))+'px;z-index:'+(rows-row)+';'+(cfg.dialogue&&i===1?'transform:scaleX(-1);':'');
   const dl=-(rnd()*3.6).toFixed(2)+'s';
   if(cfg.format==='css'){for(const k of ['up','lo']){const e=im.cloneNode();e.className=k;e.style.animationDelay=dl;f.appendChild(e)}}
   else if(cfg.format==='sprite'){const d=document.createElement('div');d.className='sp';const w=Math.round(fw),h=Math.round(fh);d.style.animationDelay=dl;d.style.setProperty('--w',w+'px');f.appendChild(d);
     sheet(im,w,h,0).then(u=>{d.style.backgroundImage='url('+u+')'});f.__act=sheet(im,w,h,1);f.__idle=sheet(im,w,h,0)}
   else if(cfg.format==='webm'){const v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.autoplay=true;v.disablePictureInPicture=true;v.preload='auto';v.src='/__r10anim/'+NAMES[i%12]+'-idle.webm';
     v.addEventListener('loadedmetadata',()=>{try{v.currentTime=rnd()*2.9}catch(e){}});f.appendChild(v);v.play().catch(()=>{})}
   root.appendChild(f);A.els.push(f)}
  /* ONE action clip at a time: every 10-20 s one figure plays the bigger variant, then goes back to idle */
  const act=()=>{if(!A.on||!A.els.length)return;const f=A.els[Math.floor(rnd()*A.els.length)];A.actN++;
   if(cfg.format==='css'){f.classList.remove('act');void f.offsetWidth;f.classList.add('act');setTimeout(()=>f.classList.remove('act'),1700)}
   else if(cfg.format==='sprite'){const d=f.querySelector('.sp');f.__act.then(u=>{d.style.backgroundImage='url('+u+')';setTimeout(()=>f.__idle.then(v=>{d.style.backgroundImage='url('+v+')'}),1700)})}
   else{const v=f.querySelector('video');const nm=f.dataset.name;v.loop=false;v.src='/__r10anim/'+nm+'-act.webm';v.play().catch(()=>{});v.onended=()=>{v.onended=null;v.loop=true;v.src='/__r10anim/'+nm+'-idle.webm';v.play().catch(()=>{})}}
   A.timers.push(setTimeout(act,(cfg.actEveryMs||10000)+rnd()*(cfg.actJitterMs||10000)))};
  A.timers.push(setTimeout(act,3000+rnd()*4000));
  /* hidden tab → pause every loop (rule under test is OFF by default: cfg.pauseHidden turns it on) */
  if(cfg.pauseHidden){const pv=()=>{const h=document.hidden;A.els.forEach(f=>{f.style.animationPlayState=h?'paused':'running';f.querySelectorAll('*').forEach(e=>{e.style.animationPlayState=h?'paused':'running'});const v=f.querySelector('video');if(v)h?v.pause():v.play().catch(()=>{})})};document.addEventListener('visibilitychange',pv);A.pv=pv}
  return A.els.length}
 function stop(){A.on=false;A.timers.forEach(clearTimeout);A.timers=[];A.els=[];const r=document.getElementById('r10anim');if(r)r.querySelectorAll('video').forEach(v=>{try{v.pause();v.removeAttribute('src');v.load()}catch(e){}});if(r)r.remove();A.urls.forEach(u=>URL.revokeObjectURL(u));A.urls=[];for(const k in sheets)delete sheets[k];if(A.pv){document.removeEventListener('visibilitychange',A.pv);A.pv=null}}
 })();`;
async function inject(page,cfg){await page.evaluate(PLAY);return page.evaluate(c=>window.__r10anim.start(c),cfg)}
async function remove(page){return page.evaluate(()=>window.__r10anim&&window.__r10anim.stop())}

/* ---- measurement helpers (node side) ---- */
const FRAMES=`(function(){if(window.__r10fps)return;const F=window.__r10fps={t:[],on:false,lt:[]};const tick=t=>{if(F.on)F.t.push(t);requestAnimationFrame(tick)};requestAnimationFrame(tick);
 try{new PerformanceObserver(l=>{if(F.on)for(const e of l.getEntries())F.lt.push(Math.round(e.duration))}).observe({type:'longtask'})}catch(e){}})();`;
const pct=(a,q)=>{a=a.filter(x=>typeof x==='number'&&isFinite(x)).sort((x,y)=>x-y);return a.length?a[Math.min(a.length-1,Math.max(0,Math.ceil(q/100*a.length)-1))]:null};
/* fps per 1-second window from rAF timestamps (a frame belongs to the second it was painted in) */
function fpsStats(ts){if(ts.length<3)return{p5:0,p50:0,mean:0,windows:0};const t0=ts[0],per=[];for(const t of ts){const k=Math.floor((t-t0)/1000);per[k]=(per[k]||0)+1}per.pop();const w=per.map(x=>x||0);return{p5:pct(w,5),p50:pct(w,50),mean:w.reduce((s,x)=>s+x,0)/Math.max(1,w.length),windows:w.length}}
/* renderer + GPU-process memory of the box (MB): the GPU process RSS is the GPU-memory proxy under SwiftShader (no real VRAM counter is exposed to CDP) */
function procMem(){try{const o=cp.execSync("ps -eo rss,args").toString().split('\n');let r=0,g=0;for(const l of o){const m=/^\s*(\d+)\s+(.*)$/.exec(l);if(!m)continue;if(/--type=renderer/.test(m[2]))r+=+m[1];else if(/--type=gpu-process/.test(m[2]))g+=+m[1]}return{rendererMB:Math.round(r/1024),gpuMB:Math.round(g/1024)}}catch(e){return{rendererMB:0,gpuMB:0}}}
module.exports={prep,install,inject,remove,PLAY,FRAMES,fpsStats,procMem,pct,NAMES,CDN};
