/* usage: node dev/test/actwire-look.js 755x1000 <outdir> lo,gian,vui  (needs dev/art/actwire_stage.py run first: clips served from local img/kit/emo-anim) */
/* ACTWIRE look: Thái hậu with an active act → her seal = emo-th-act-<k>; forced lean plays out/loop/back (clips served from the local staged files). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');const cp=require('child_process');
const [,,SZ,OUT,KEYS]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=require('path').resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,reducedMotion:'no-preference',serviceWorkers:'block'});
 const served=[];
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());
  if(/\/img\/kit\/emo-anim\/th-act-/.test(u.pathname)){const f=path.join(ROOT,u.pathname);served.push(u.pathname);return fs.existsSync(f)?r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'image/webp'}}):r.fulfill({status:404,body:''})}
  if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/dev/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 await p.waitForFunction(()=>typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE&&KIT_CDNHAVE.size>1000,null,{timeout:60000});
 const log={W,H,errs,seals:[]};
 for(const k of KEYS.split(',')){
  const info=await p.evaluate(k=>{document.querySelectorAll('.kemo-big').forEach(x=>x.remove());const th=S.thO;if(!th)return{err:'no S.thO'};
   th.emo={k:k==='an'?'binh':k,v:70,why:'thử',t:null,w:0};const now=mkNow();th.fa={k:'x',n:'Thử ấn',f:k,face:'act-'+k,k0:now,k1:now+9999};
   const f=faceKeyFor(th);const html=emoBadge(th);
   for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());
   let box=document.getElementById('aw-box');if(!box){box=document.createElement('div');box.id='aw-box';box.className='dlg';box.style.cssText='position:fixed;left:50%;top:40%;transform:translate(-50%,-50%);width:120px;height:120px;z-index:50;background:#2a1a12;border:2px solid #c9a24a;border-radius:12px;display:flex;align-items:center;justify-content:center';document.body.appendChild(box)}
   box.innerHTML=html.replace('<img ','<img style="width:64px;height:64px" ');const e=box.querySelector('img.kemo');
   return{f:f&&{kind:f.kind,key:f.key,set:f.set,art:f.art},src:e&&e.getAttribute('src'),cls:e&&e.className}},k);
  await p.waitForTimeout(1500);
  const go=await p.evaluate(()=>{const e=document.querySelector('#aw-box img.kemo');if(!e)return null;window.kitEmoSeal.live(e,true);clearTimeout(e.__ln);
   return new Promise(res=>{const t0=performance.now();(function w(){window.kitEmoSeal.lean(e,true);const c=document.querySelector('.kemo-big');if(c||performance.now()-t0>8000)return res(c?{l:parseFloat(c.style.left),t:parseFloat(c.style.top),w:parseFloat(c.style.width),h:parseFloat(c.style.height),cls:c.className}:null);setTimeout(w,300)})()})});
  if(!go){log.seals.push({k,info,err:'no lean'});continue}
  const side=Math.min(W,H,Math.max(go.w,go.h)*1.3),cx=go.l+go.w/2,cy=go.t+go.h/2;const clip={x:Math.max(0,Math.min(W-side,cx-side/2)),y:Math.max(0,Math.min(H-side,cy-side/2)),width:side,height:side};
  const dir=`${OUT}/f-${k}-${SZ}`;fs.mkdirSync(dir,{recursive:true});const fr=[];const t0=Date.now();const parts=[];
  while(await p.evaluate(()=>!!document.querySelector('.kemo-big'))&&Date.now()-t0<20000){const t=Date.now()-t0;const f=`${dir}/${String(fr.length).padStart(4,'0')}.jpg`;
   const src=await p.evaluate(()=>{const c=document.querySelector('.kemo-big');const i=c&&c.__img;return i?i.getAttribute('src').split('/').pop():''});if(!parts.length||parts[parts.length-1][0]!==src)parts.push([src,t]);
   await p.screenshot({path:f,type:'jpeg',quality:85,clip});fr.push([f,t])}
  // contact sheet: 8 frames spread over the lean + full screen at the loop
  const pick=[0,.08,.2,.35,.5,.65,.8,.95].map(x=>fr[Math.min(fr.length-1,Math.floor(x*fr.length))][0]);
  cp.execFileSync('ffmpeg',['-y','-loglevel','error',...pick.flatMap(f=>['-i',f]),'-filter_complex',pick.map((_,i)=>`[${i}]scale=240:240[v${i}]`).join(';')+';'+pick.map((_,i)=>`[v${i}]`).join('')+'hstack=inputs=8','-q:v','4',`${OUT}/sheet-${k}-${SZ}.jpg`]);
  log.seals.push({k,info,lean:go,secs:+((Date.now()-t0)/1000).toFixed(1),frames:fr.length,parts});
 }
 // one full-screen shot mid-lean of the last key for context
 await p.screenshot({path:`${OUT}/screen-${SZ}.jpg`,type:'jpeg',quality:70});
 log.served=[...new Set(served)].length;log.errs=errs;fs.writeFileSync(`${OUT}/log-${SZ}.json`,JSON.stringify(log,null,1));console.log(JSON.stringify(log).slice(0,3000));await b.close()})();
