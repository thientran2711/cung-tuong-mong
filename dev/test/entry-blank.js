/* entry-blank (owner bug 18/11 ~18:25Z "khi vào game nó cứ màn hình trống"): enter a SAVED life (Buổi tối, Hành sự tab) the ways the owner does,
   with the service worker ON, and count what the first screen shows while it loads.
   usage: node dev/test/entry-blank.js <outdir> [device,...] [path,...] [mbps]
     path: cont   = reload the site, title → Tiếp tục → the sổ (warm cache)
           upd    = a NEW BUILD arrives while she plays (sw.js bytes change) → Sang buổi → the game reopens the new build by itself
                    (swreg reopen 'buoi' → reload → resumeSolo) — the path she got several times on 18/11
           cold   = like cont, but the picture cache is wiped except the core set first (evicted cache / new phone with the save)
     mbps: line speed for the picture CDN (applied by a context route, which also covers the service worker's own fetches); 0 = full speed
   Samples the screen every 250 ms for 15 s after the entry (cover = #kload/#klife over the middle):
     blank  = visible <img> (>= 24 px) not finished and NOT marked §59.1 (data-kwait)
     hole   = a visible kit picture box (portrait chip, side card, stage) that holds NO picture at all (no <img>, no background)
     acts   = act cards in the Hành sự panel (0 while the panel is open = the empty tab of her shot)
     stage  = people on the room stage (tokens) / room picture painted
     emptyBox = a visible picture still on its way shown as bare §59.1 paper (no kit silhouette; small slots carry no line: to her it is an empty box)
   FAIL (bad>0) when an uncovered sample shows a blank, an empty box, a hole, an empty or hidden stage; KLOAD must leave 'check' (big). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path'),http=require('http');const D=require('./lib/device');
const [,,OUT='/tmp/eb',DEVS='fold,ipadAir',PATHS='cont,upd,cold',MBPS='1.5']=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEW=path.resolve(process.env.ROOT||path.join(__dirname,'../..'));const OLD=process.env.OLD?path.resolve(process.env.OLD):null;let ROOT=NEW;/* OLD=<built root of an older build>: the life is played and saved on that build, then the site switches to the new one (the real update path, her old save) */
let BUMP=0;/* >0: sw.js / index.html carry a new build mark (the browser sees a new worker) */
function serve(){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.svg':'image/svg+xml','.css':'text/css'};
 return new Promise(res=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';p=p.replace(/^\/+/,'');
  const f=path.join(ROOT,p);if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}
  r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');
  if(BUMP&&p==='sw.js'){let t=fs.readFileSync(f,'utf8');t=t.replace(/const V='([^']*)'/,(m,v)=>`const V='${v}b${BUMP}'`)+`\n/* bump ${BUMP} */\n`;return r.end(t)}
  fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/',close:()=>s.close()}))})}
/* one shared line for the picture CDN (also reaches the service worker's fetches, unlike CDP throttling) */
function line(ctx,mbps){if(!+mbps)return;let free=Date.now();const bps=(+mbps)*1e6/8;
 return ctx.route(/workers\.dev\/img\//,async rt=>{if(!line.on){return rt.continue()}let resp;try{resp=await rt.fetch()}catch(e){return rt.abort()}const body=await resp.body();
  const now=Date.now();const start=Math.max(now,free);free=start+body.length/bps*1000;if(process.env.LINELOG)(line.log=line.log||[]).push([now,Math.round(body.length/1024),rt.request().url().split('/').pop().slice(0,40),rt.request().serviceWorker()?'sw':'pg']);await sleep(free-now+80);try{await rt.fulfill({response:resp,body})}catch(e){}})}
const SAMPLE=()=>{const process_dbg=1;const vis=e=>{const r=e.getBoundingClientRect();if(r.width<24||r.height<24||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return false;let n=e;while(n&&n.nodeType===1){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;n=n.parentElement}return true};
 const top=document.elementFromPoint(innerWidth/2,innerHeight/2);const cover=top&&top.closest&&top.closest('#kload,#klife');if(cover)return{cover:cover.id};
 const tUp=(()=>{const t=document.getElementById('title');return !!t&&!t.hidden})();if(tUp)return{cover:'title'};
 const seen=im=>{const r=im.getBoundingClientRect();const t=document.elementFromPoint(Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),Math.min(innerHeight-1,Math.max(0,r.top+r.height/2)));return !!t&&(t===im||(im.parentElement&&im.parentElement.contains(t)))};
 const inc=[...document.images].filter(im=>vis(im)&&seen(im)&&im.getAttribute('src')&&!(im.complete&&im.naturalWidth));const bl=inc.filter(im=>!im.hasAttribute('data-kwait'));/* §59.1 with a kit silhouette (figure f|m, portrait pf|pm) is a drawn stand-in, not an empty box; bare paper (1|s) is */const lined=im=>!!(im.parentElement&&im.parentElement.closest('[data-kwaitp],[data-kwaitq]'));const paper=inc.filter(im=>/^(1|s)$/.test(im.getAttribute('data-kwait')||'')&&!lined(im));/* paper WITH the «Đang thỉnh tranh…» line = the brief's allowed placeholder */const wl=paper.slice(0,4).map(im=>{const r=im.getBoundingClientRect(),p=im.parentElement;return (im.getAttribute('src')||'').split('/').pop().slice(0,32)+(process_dbg?'|'+Math.round(r.width)+'x'+Math.round(r.height)+'|'+getComputedStyle(p).position+'|'+p.className.slice(0,30)+'|kwp:'+p.hasAttribute('data-kwaitp')+'|kwr:'+(im.dataset.kwr||'')+'|anc:'+!!(p.closest('[data-kwaitp]')):'')});
 /* holes: kit picture boxes that hold nothing — portrait chip / side person card / top bar icons */
 const box=[...document.querySelectorAll('header.hud .kchip, header.hud img, #side .kpc, #side .kpcard, .kside .kpc, #rail img, .kpor, .kpframe')].filter(vis);
 const holes=box.filter(b=>{const im=b.tagName==='IMG'?b:b.querySelector('img');if(im)return !im.getAttribute('src');const bg=getComputedStyle(b).backgroundImage;return !bg||bg==='none'?false:false});
 const panel=document.querySelector('#panel,.panel');const tab=panel&&panel.dataset?panel.dataset.tab:'';
 const acts=document.querySelectorAll('#panel .act-card, #panel .kact, #panel [data-act]').length;
 const st=document.getElementById('stage');const toks=st?st.querySelectorAll('#tokens .tok').length:-1;const stBg=st?getComputedStyle(st).backgroundImage:'';
 const hidStage=st?st.classList.contains('j59wait'):false;
 const hsWhy=hidStage?[...st.querySelectorAll('#mefig, #tokens .tok .figimg')].map(im=>{const s=im.getAttribute('src')||'';const fb=(window.__KITFB||{})[s];return s.split('/').pop().slice(0,26)+(im.complete?(im.naturalWidth?':ok':':fail'):':load')+(fb?(fb.v?':m':':mw'):':nom')}).concat([typeof J59U!=='undefined'?JSON.stringify(J59U):'noJ59U']):null;
 return{cover:false,blank:bl.length,wait:paper.length,sil:inc.length-bl.length-paper.length,holes:holes.length,tab,acts,toks,stBg:stBg&&stBg!=='none'?1:0,hidStage,hsWhy,which:bl.slice(0,6).map(im=>(im.getAttribute('src')||'').split('/').pop().slice(0,32)),
  waitWhich:wl,hasWaitLine:document.querySelectorAll('[data-kwaitp],[data-kwaitq]').length}};
(async()=>{const srv=await serve();const b=await chromium.launch();const R={};
 for(const dev of DEVS.split(','))for(const pth of PATHS.split(',')){BUMP=0;line.on=false;ROOT=OLD||NEW;
  const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'allow'});await line(ctx,MBPS);const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const tag=dev+'-'+pth;let g=await D.openHost(p,srv.url);
  const ready=async()=>{for(let k=0;k<60;k++){const ph=await g.evaluate(()=>window.KLOAD&&KLOAD.phase).catch(()=>null);if(ph==='ask'){await g.evaluate(()=>{const x=document.querySelector('[data-kl="web"]');if(x)x.click()});break}if(ph&&ph!=='check')break;await sleep(500)}
   await g.waitForFunction(()=>typeof start==='function'&&window.KLOAD&&['done','all','skipped'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:900000})};
  await ready();await sleep(1000);
  /* a life played to Buổi chiều, Hành sự tab, saved in slot 3 */
  await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;try{quiet=false}catch(e){}Q.length=0;try{showModal()}catch(e){}render()});
  await sleep(4000);
  await g.evaluate(()=>{for(let i=0;i<2;i++){Q.length=0;try{showModal()}catch(e){}if((S.buoi||0)<2)nextBuoi()}Q.length=0;try{showModal()}catch(e){}render();const t=[...document.querySelectorAll('button,.kbtn,[data-tab]')].find(x=>x.offsetParent&&x.textContent.trim().startsWith('Hành sự'));if(t)t.click();save()});
  await sleep(3000);
  if(pth==='cold'){await g.evaluate(async()=>{const m=await (await fetch('assets.json')).json();const core=new Set(m.files.filter(f=>f[3]==='core').map(f=>f[0]));const c=await caches.open('ctm-assets');
    for(const q of await c.keys()){const u=new URL(q.url);const pt=decodeURIComponent(u.pathname).replace(/^.*?(img\/)/,'img/');if(!core.has(pt))await c.delete(q)}})}
  if(pth==='big'){/* a long-played phone: the picture cache holds ~BIG keys (every picture ever shown + stale keys of older builds), and some
     core pictures of the first screen are not in it (their key changed in a build, or never fetched) — then a NEW BUILD and a reopen */
   R[tag+'-fill']=await g.evaluate(async([n])=>{const m=await (await fetch('assets.json')).json();const c=await caches.open('ctm-assets');const IMG=window.IMG_BASE||'';
    const lazy=m.files.filter(f=>f[3]==='lazy').slice(0,n);const body=new Uint8Array(1500);for(let i=0;i<lazy.length;i+=250)await Promise.all(lazy.slice(i,i+250).map((f,j)=>c.put(IMG+f[0]+'?h=00stale'+((i+j)%7),new Response(body,{headers:{'Content-Type':'image/webp'}}))));
    /* core pictures of the first screen out of the cache: top bar / stat / weather / rank icons, frames, side-card portraits */
    const on=new Set([...document.querySelectorAll('header.hud img, .k3c img, #stage img, .kbi')].map(i=>(i.getAttribute('src')||'').replace(IMG,'').split('?')[0]));let gone=0;
    for(const f of m.files)if(f[3]==='core'&&on.has(f[0])){if(await c.delete(IMG+f[0]+'?h='+f[1]))gone++}
    let keys;try{keys=(await c.keys()).length}catch(e){keys='too large'}return{filled:lazy.length,coreGone:gone,keys}},[+(process.env.BIG||20000)]);
   console.log(tag,'fill',JSON.stringify(R[tag+'-fill']))}
  line.on=true;let t0;
  if(+process.env.CPU>1){const c=await ctx.newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:+process.env.CPU})}
  const lt=async()=>{try{await D.gameFrame(p).evaluate(()=>{if(window.__lt)return;window.__lt=[];window.__lt0=performance.now();new PerformanceObserver(l=>{for(const e of l.getEntries())__lt.push([Math.round(e.startTime-__lt0),Math.round(e.duration)])}).observe({entryTypes:['longtask']})})}catch(e){}};
  if(pth==='upd'){/* new build lands while she plays; the next buổi opens it by itself */
   if(OLD)ROOT=NEW;else BUMP=1;await g.evaluate(()=>{window.KSW&&KSW.check&&KSW.check()});
   await g.waitForFunction(()=>window.KSW&&KSW.pending,null,{timeout:120000}).catch(()=>{});
   const pend=await g.evaluate(()=>!!(window.KSW&&KSW.pending));
   await g.evaluate(()=>{Q.length=0;try{showModal()}catch(e){}nextBuoi()});t0=Date.now();
   for(let k=0;k<20;k++){await sleep(400);try{await g.evaluate(()=>{if(typeof Q!=='undefined'&&Q.length){Q.length=0;try{showModal()}catch(e){}}})}catch(e){break}}
   /* the page reloads: wait for the new frame */
   await sleep(1500);g=D.gameFrame(p);try{await p.waitForFunction(()=>{const f=document.getElementById('krotf');try{return !!(f&&f.contentWindow.start)}catch(e){return false}},null,{timeout:120000})}catch(e){}
   g=D.gameFrame(p);R[tag+'-pending']=pend}
  else{if(OLD)ROOT=NEW;if(pth==='big')BUMP=1;await p.reload({waitUntil:'domcontentloaded'});await p.waitForSelector('#krotf',{state:'attached',timeout:120000});await p.waitForFunction(()=>{const f=document.getElementById('krotf');try{return !!(f&&f.contentWindow.start)}catch(e){return false}},null,{timeout:120000});g=D.gameFrame(p);
   const tw=Date.now();await g.waitForFunction(()=>window.KLOAD&&['done','all','skipped'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:pth==='big'?240000:300000}).catch(()=>{});
   R[tag+'-kload']=await g.evaluate(()=>({phase:KLOAD.phase,err:KLOAD.err||'',coreLeft:KLOAD.core&&KLOAD.core.left})).catch(()=>null);R[tag+'-kload'].waitMs=Date.now()-tw;console.log(tag,'kload',JSON.stringify(R[tag+'-kload']));
   await lt();t0=Date.now();await g.evaluate(()=>{const x=document.querySelector('#modal .kpmenu [data-tgo="slots"]');if(x)x.click()});await g.waitForSelector('#modal [data-load="3"]',{timeout:15000});await g.evaluate(()=>document.querySelector('#modal [data-load="3"]').click())}
  const S=[];let shot=0;
  for(let i=0;i<(pth==='cold'?160:60);i++){await sleep(250);g=D.gameFrame(p);let s;try{s=await g.evaluate(SAMPLE)}catch(e){s={cover:'nav'}}s.t=Date.now()-t0;S.push(s);
   const bad=!s.cover&&(s.blank||s.wait||s.holes||s.toks===0||s.hidStage);
   if(!s.cover&&(bad||i%8===0)&&shot<8){await p.screenshot({path:`${OUT}/${tag}-${String(shot).padStart(2,'0')}-${s.t}${bad?'-BAD':''}.png`});shot++}}
  if(process.env.DUMP){console.log('HTML',JSON.stringify(await g.evaluate(()=>{const c=document.querySelector('.k3c');return c?c.outerHTML.slice(0,1500):null}).catch(e=>String(e))));
   const el=await g.$('.k3c');if(el){await el.screenshot({path:OUT+'/k3c-a.png'});await g.evaluate(()=>document.querySelectorAll('.k3c img.kfr').forEach(i=>i.style.visibility='hidden'));await el.screenshot({path:OUT+'/k3c-nofr.png'});await g.evaluate(()=>document.querySelectorAll('.k3c img.kfr').forEach(i=>i.style.visibility=''))}}
  if(process.env.DUMP)console.log('DUMP2',JSON.stringify(await g.evaluate(async()=>{const out=[];for(const im of [...document.querySelectorAll('.k3c .kpor')].slice(0,3)){const r=im.getBoundingClientRect();const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
   let px=null;try{const rs=await fetch(im.currentSrc);const bl=await rs.blob();const bm=await createImageBitmap(bl);const c=document.createElement('canvas');c.width=bm.width;c.height=bm.height;const x=c.getContext('2d');x.drawImage(bm,0,0);const d=x.getImageData(0,0,c.width,c.height).data;let a=0,lum=0;for(let i=0;i<d.length;i+=4){a+=d[i+3];lum+=d[i]+d[i+1]+d[i+2]}px={type:rs.headers.get('content-type'),size:bl.size,w:bm.width,h:bm.height,alpha:Math.round(a/(d.length/4)),lum:Math.round(lum/(d.length/4)/3)}}catch(e){px=String(e)}
   out.push({top:t?t.tagName+'.'+t.className:null,px})}return out}).catch(e=>String(e))));
  if(process.env.DUMP)console.log('DUMP',JSON.stringify(await g.evaluate(()=>[...document.querySelectorAll('.k3c .kpor, header.hud .kpor, #side .kpor')].map(im=>{const cs=getComputedStyle(im);const r=im.getBoundingClientRect();return{src:(im.getAttribute('src')||'').slice(-60),cur:(im.currentSrc||'').slice(-40),c:im.complete,nw:im.naturalWidth,kw:im.getAttribute('data-kwait'),op:cs.opacity,vis:cs.visibility,disp:cs.display,w:Math.round(r.width),h:Math.round(r.height),cls:im.className,srcset:(im.getAttribute('srcset')||'').slice(0,40),clip:cs.clipPath.slice(0,80),st:im.getAttribute('style'),pos:cs.position,objf:cs.objectFit,par:(()=>{const k=im.parentElement.getBoundingClientRect();return [Math.round(k.width),Math.round(k.height)]})(),flt:cs.filter,mix:cs.mixBlendMode,z:cs.zIndex}})).catch(e=>String(e)),null,0));
  const ok=S.filter(s=>!s.cover);const bad=ok.filter(s=>s.blank||s.wait||s.holes||s.toks===0||s.hidStage);
  R[tag]={samples:ok.length,covered:S.length-ok.length,bad:bad.length,blank:ok.filter(s=>s.blank).length,emptyBox:ok.filter(s=>s.wait).length,holes:ok.filter(s=>s.holes).length,stageHidden:ok.filter(s=>s.hidStage).length,noTok:ok.filter(s=>s.toks===0).length,
   first:ok[0],worst:bad[0]||null,gates:await g.evaluate(()=>(window.KLOAD&&KLOAD.lifes||[]).map(x=>({why:x.why,n:x.n,ms:x.ms,late:x.late,cached:!!x.cached}))).catch(()=>null),
   silbb:await g.evaluate(async()=>{if(!window.KIT_SILBB)return'no KIT_SILBB';const out={};for(const k of ['f','m','e']){const u=IMG_BASE+'img/kit/unknown-fig-'+k+'.webp?silcheck=1';const v=await new Promise(ok=>{const x=kitFigBody(u,()=>ok(kitFigBody(u)));if(x)ok(x)});
   out[k]=['l','r','ar','cl','cr','b'].every(f=>Math.abs((v[f]||0)-(KIT_SILBB[k][f]||0))<.01)?'ok':JSON.stringify(v).slice(0,120)}return out}).catch(e=>String(e)),longTasks:await g.evaluate(()=>window.__lt&&__lt.filter(x=>x[1]>150)).catch(()=>null),ksw:await g.evaluate(()=>window.KSW&&{resumed:KSW.resumed,applied:KSW.applied,build:KSW.build}).catch(()=>null),errs:errs.slice(0,5)};
  if(process.env.LINELOG&&line.log){const L=line.log.filter(x=>x[0]>=t0-30000);console.log('LINE',tag,L.length,'reqs',L.reduce((a,x)=>a+x[1],0),'KB since t0-30s');console.log(L.slice(0,80).map(x=>((x[0]-t0)/1000).toFixed(1)+'s '+x[1]+'K '+x[3]+' '+x[2]).join('\n'));line.log=[]}
  console.log(tag,JSON.stringify(R[tag]));await p.screenshot({path:`${OUT}/${tag}-end.png`});await ctx.close()}
 fs.writeFileSync(OUT+'/entry-blank.json',JSON.stringify(R,null,1));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
