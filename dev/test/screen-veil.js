/* screen-veil (owner bug OD 24/11 ~10:20Z «frames first, pictures later»; KIT §97 kitScreenVeil, review/kit-screenveil).
   Plays every kind of screen change on Fold 755x1000 + iPad 1180x820, COLD (picture CDN throttled: 1.5 Mbps + 300 ms per picture, fresh browser)
   then WARM (same browser, every change again), and samples EVERY animation frame of the new view:
     bad frame = a visible picture of the view (<img> >= 24 px, or a CSS background picture) that is not loaded yet and is NOT under the veil (#kveil)
     (the §59.1 stand-ins «Đang thỉnh tranh…» / silhouettes count as bad: they are exactly the half-painted view she hates).
   usage: node dev/test/screen-veil.js <outdir> [devices=fold,ipadAir] [root=repo root] [mbps=1.5] [lat=300]
   Pages are served from disk by a Playwright route (no local server). Videos (webm → mp4 + 2× copy) go to <outdir> (never into git, OD:L203).
   FAIL (exit 1) when any step shows a bad frame. Also prints the veil time per step and the line shown. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');const D=require('./lib/device');
const [,,OUT='/tmp/sv',DEVS='fold,ipadAir',ROOTA,MBPS='1.5',LAT='300']=process.argv;fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(ROOTA||path.join(__dirname,'../..'));const BASE='http://ctm.test/';const sleep=t=>new Promise(r=>setTimeout(r,t));
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.css':'text/css','.mp4':'video/mp4','.webm':'video/webm'};
const SAMPLER=()=>{window.__VS=(function(){const R={on:false,frames:[]};const done=new Set();
 try{new PerformanceObserver(l=>l.getEntries().forEach(e=>done.add(e.name))).observe({type:'resource',buffered:true})}catch(e){}
 const abs=u=>{try{return new URL(u,location.href).href}catch(e){return u}};
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<24||r.height<24||r.bottom<=0||r.top>=innerHeight||r.right<=0||r.left>=innerWidth)return null;
  let L=Math.max(r.left,0),T=Math.max(r.top,0),Rr=Math.min(r.right,innerWidth),B=Math.min(r.bottom,innerHeight);
  for(let n=e;n&&n.nodeType===1;n=n.parentElement){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return null;
   if(n!==e&&n!==document.body&&(cs.overflowX!=='visible'||cs.overflowY!=='visible')){const q=n.getBoundingClientRect();L=Math.max(L,q.left);T=Math.max(T,q.top);Rr=Math.min(Rr,q.right);B=Math.min(B,q.bottom);if(Rr-L<4||B-T<4)return null}}
  return {left:L,top:T,width:Rr-L,height:B-T}};/* clipped by a scrolling box = not seen */
 const covered=r=>{const x=Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),y=Math.min(innerHeight-1,Math.max(0,r.top+r.height/2));const t=document.elementFromPoint(x,y);return !!(t&&t.closest&&t.closest('#kveil,#kload,#klife'))};
 function snap(){const bad=[];
  for(const im of document.images){const s=im.getAttribute('src');if(!s||/^(data|blob):/.test(s))continue;if(im.complete&&im.naturalWidth)continue;if(im.complete&&!im.naturalWidth&&done.has(abs(s)))continue;const r=vis(im);if(!r||covered(r))continue;bad.push('img:'+s.split('/').pop().slice(0,40))}
  for(const el of document.querySelectorAll('body *')){const bg=getComputedStyle(el).backgroundImage;if(!bg||bg==='none'||bg.indexOf('url(')<0)continue;
   const us=[...bg.matchAll(/url\("?([^")]+)"?\)/g)].map(m=>m[1]).filter(u=>!/^(data|blob):/.test(u));const miss=us.filter(u=>!done.has(abs(u)));if(!miss.length)continue;const r=vis(el);if(!r||covered(r))continue;bad.push('bg:'+miss[0].split('/').pop().slice(0,40))}
  const top=document.elementFromPoint(innerWidth/2,innerHeight/2);const veil=!!(top&&top.closest&&top.closest('#kveil'));
  return {t:Math.round(performance.now()),n:bad.length,bad:[...new Set(bad)].slice(0,6),veil,word:veil?(document.querySelector('#kveil .kscrv-l')||{}).textContent:''}}
 function loop(){if(!R.on)return;R.frames.push(snap());requestAnimationFrame(loop)}
 R.start=()=>{R.frames=[];R.on=true;requestAnimationFrame(loop)};R.stop=()=>{R.on=false;return R.frames};R.snap=snap;return R})()};
async function context(b,dev,vdir){const ctx=await D.newDeviceContext(b,dev,{recordVideo:{dir:vdir,size:{width:D.DEVICES[dev].w,height:D.DEVICES[dev].h}}});
 await ctx.addInitScript(SAMPLER);
 await ctx.route(BASE+'**',rt=>{let p=decodeURIComponent(new URL(rt.request().url()).pathname);if(p.endsWith('/'))p+='index.html';const f=path.join(ROOT,p.replace(/^\/+/,''));
  if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return rt.fulfill({status:404,body:'nf'});
  return rt.fulfill({status:200,headers:{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream','Cache-Control':'no-store'},body:fs.readFileSync(f)})});
 const L={on:false,free:0};const bps=(+MBPS)*1e6/8;
 await ctx.route(/workers\.dev\/(img|audio)\//,async rt=>{if(!L.on)return rt.continue();let resp;try{resp=await rt.fetch()}catch(e){return rt.abort().catch(()=>{})}let body;try{body=await resp.body()}catch(e){return rt.abort().catch(()=>{})}
  const now=Date.now();const st=Math.max(now,L.free);L.free=st+body.length/bps*1000;await sleep(L.free-now+(+LAT));try{await rt.fulfill({response:resp,body})}catch(e){}});
 return {ctx,L}}
async function boot(p){const g=await D.openDirect(p,BASE);await g.waitForFunction(()=>typeof start==='function'&&window.KLOAD,null,{timeout:90000});
 for(let k=0;k<80;k++){const ph=await g.evaluate(()=>window.KLOAD&&KLOAD.phase);if(ph==='ask')await g.evaluate(()=>{const x=document.querySelector('[data-kl="web"]');x&&x.click()});if(ph&&ph!=='check'&&ph!=='ask')break;await sleep(500)}
 await g.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;try{showModal()}catch(e){}render()});
 await g.waitForFunction(()=>!document.getElementById('klife')&&!document.querySelector('#kload:not(.out)'),null,{timeout:180000}).catch(()=>{});await sleep(2500);return g}
const CLEAN=()=>{try{KMQ.length=0;kmBusy=false;document.querySelectorAll('.kmov,#kmrew,.kmfly,.kmalarm').forEach(e=>e.remove())}catch(e){}Q.length=0;try{showModal()}catch(e){}
 try{const o=document.getElementById('ov');if(o&&!o.hidden){o.hidden=true;S.mg=null}}catch(e){}try{used=0}catch(e){}S.used=0;render()};
/* the screen changes (law 11 scan table rows that can be driven headless) */
const STEPS=[
 ['place→Nội vụ phủ (phủ)','place',()=>{window.j95sEntNeed=()=>false;goTo('nvp')}],
 ['place→Thái y viện (viện)','place',()=>{window.j95sEntNeed=()=>false;goTo('tyv')}],
 ['place→Đức Thọ cung (cung)','place',()=>{window.j95sEntNeed=()=>false;goTo('tn')}],
 ['place→Ngự hoa viên','place',()=>{window.j95sEntNeed=()=>false;goTo('vuon')}],
 ['place→Càn Ninh cung','place',()=>{window.j95sEntNeed=()=>false;goTo('kn')}],
 ['place→Dưỡng Hòa điện (điện)','place',()=>{window.j95sEntNeed=()=>false;goTo('dtd')}],
 ['place→home (về cung)','place',()=>{window.j95sEntNeed=()=>false;goTo('home')}],
 ['dialog: Chọn người theo hầu (leaving home)','event',()=>{delete window.j95sEntNeed;goTo('tyv')}],
 ...['go','court','rv','staff','rel','inv','art','story','act'].map(t=>['tab '+t,'tab',new Function(`tab=${JSON.stringify(t)};render()`)]),
 ['mini-game board','board',()=>{const k=Object.keys(MG)[0];openMG(k,1,()=>{})}],
 ['save load (Nạp sổ)','book',()=>{save();const d=loadSlot(SLOT);deser(d);render()}]];
(async()=>{const b=await chromium.launch();const R=[];let fail=0;
 for(const dev of DEVS.split(',')){const vdir=path.join(OUT,'v-'+dev);fs.mkdirSync(vdir,{recursive:true});const {ctx,L}=await context(b,dev,vdir);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await boot(p);
  for(const mode of ['cold','warm']){L.on=mode==='cold';
   for(const [name,kind,fn] of STEPS){await g.evaluate(CLEAN).catch(()=>{});await sleep(400);await g.evaluate(()=>{try{KIT_SCRV.stat.last=null;KIT_SCRV.stat.log=[]}catch(e){}__VS.start()});
    const t0=Date.now();let ok=true;try{await g.evaluate(`(${fn.toString()})()`)}catch(e){ok=false}
    for(;;){await sleep(250);const v=await g.evaluate(()=>!!(document.getElementById('kveil')&&!document.getElementById('kveil').hidden)).catch(()=>false);if(!v&&Date.now()-t0>1800)break;if(Date.now()-t0>15000)break}
    await sleep(500);const F=await g.evaluate(()=>__VS.stop());const st=await g.evaluate(()=>typeof KIT_SCRV!=='undefined'?Object.assign({},KIT_SCRV.stat.last,{log:(KIT_SCRV.stat.log||[]).slice(-4)}):null);
    const badF=F.filter(f=>f.n>0);const veilF=F.filter(f=>f.veil);const words=[...new Set(veilF.map(f=>f.word).filter(Boolean))];
    const row={dev,mode,step:name,kind,ran:ok,frames:F.length,bad:badF.length,veilFrames:veilF.length,veilMs:st&&st.ms||0,dests:st&&st.log?st.log.join('>'):'',word:words.join(' / '),firstBad:badF[0]?badF[0].bad.join(' '):''};R.push(row);if(badF.length)fail++;
    console.log(JSON.stringify(row))}}
  if(errs.length)console.log('pageerrors',dev,errs.slice(0,5));await ctx.close();
  for(const f of fs.readdirSync(vdir).filter(f=>f.endsWith('.webm'))){const src=path.join(vdir,f),mp4=path.join(OUT,dev+'.mp4'),x2=path.join(OUT,dev+'-x2.mp4');
   try{execFileSync('ffmpeg',['-y','-loglevel','error','-i',src,'-c:v','libx264','-pix_fmt','yuv420p','-crf','28',mp4]);execFileSync('ffmpeg',['-y','-loglevel','error','-i',mp4,'-filter:v','setpts=0.5*PTS','-an','-c:v','libx264','-crf','28',x2])}catch(e){console.log('ffmpeg',e.message.slice(0,120))}}}
 fs.writeFileSync(path.join(OUT,'screen-veil.json'),JSON.stringify(R,null,1));await b.close();
 console.log(fail?`FAIL: ${fail} step(s) showed a half-painted view`:'PASS: no half-painted frame');process.exit(fail?1:0)})();
