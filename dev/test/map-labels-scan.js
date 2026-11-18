/* map-labels-scan: every place on Dư đồ must show its kit name tag (OD L1032/L1417, owner bug 18/11 "Tên của những cung khác đâu").
   Per place: tag present, visible (not display:none / zero size), not overlapped by another visible tag, inside the map. Day + night.
   usage: node dev/test/map-labels-scan.js <url> <shotdir|-> [WxH,..] ; exit 1 if any place has no visible tag */
const {chromium}=require('playwright');const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,URL_,DIR,SIZES]=process.argv;const sl=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0;
for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
  if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
  for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}
 for(const buoi of [0,-1]){
  await p.evaluate(b=>{Q.length=0;document.getElementById('modal').hidden=true;S.buoi=b<0?BUOI.length-1:b;window.__mapZ=0;tab='go';render()},buoi);await sl(2500);
  const rows=await p.evaluate(()=>{const spots=[...document.querySelectorAll('.game.maptab .mapw .mspot')];const mapr=document.querySelector('.game.maptab .mapsc').getBoundingClientRect();
   const info=spots.map(s=>{const l=s.querySelector('.mlab');const r=l&&l.getBoundingClientRect();const cs=l&&getComputedStyle(l);const vis=!!l&&cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>2&&r.height>2;const sr=s.getBoundingClientRect(),t=(s.style.translate||'0 0').split(' ').map(parseFloat);const dist=l?Math.round(Math.hypot((r.left+r.right)/2-(sr.left+sr.width/2-t[0]),(r.top+r.bottom)/2-(sr.top+sr.height/2-(t[1]||0)))):0;return{dist,lead:!!s.querySelector('.mlead'),mv:s.style.translate||'',k:s.dataset.zone?'zone:'+s.dataset.zone:s.dataset.go||s.dataset.ak||'(empty)',zn:s.dataset.zn||'',zh:s.classList.contains('mzh'),name:l?l.textContent.trim().slice(0,22):'',hide:s.classList.contains('kmhide'),vis,r:vis?{l:r.left,t:r.top,r:r.right,b:r.bottom}:null,fs:l?parseFloat(cs.fontSize)*(parseFloat(cs.zoom)||1):0}});
   info.forEach(a=>{a.overlap=0;if(!a.vis)return;info.forEach(c=>{if(c===a||!c.vis)return;if(Math.min(a.r.r,c.r.r)-Math.max(a.r.l,c.r.l)>1&&Math.min(a.r.b,c.r.b)-Math.max(a.r.t,c.r.t)>1)a.overlap++})});
   return{buoi:S.buoi,img:(document.querySelector('.mapimg')||{}).src,mls:window.__mapMls,z:window.__mapZ,fit:window.__mapFit,info}});
  /* map-zones (owner OD 18/11 ~19:25Z): a place grouped into a zone is shown by its zone tag on the overview (it must be visible) and by its own tag inside the zoomed zone (checked below) */
  const zvis=z=>rows.info.some(x=>x.k==='zone:'+z&&x.vis);const tot=rows.info.length,hid=rows.info.filter(x=>!x.vis&&!(x.zh&&x.zn&&zvis(x.zn))),ov=rows.info.filter(x=>x.overlap);
  console.log(sz,buoi<0?'night':'day',`places=${tot} visible=${tot-hid.length} hidden=${hid.length} overlapping=${ov.length} maxDist=${Math.max(...rows.info.map(x=>x.dist))}px mls=${rows.mls} S.buoi=${rows.buoi} ${(rows.img||'').split('/').pop()}`,hid.length?'HIDDEN: '+hid.map(x=>x.k+(x.hide?'(kmhide)':'')).join(','):'');
  if(DIR&&DIR!=='-'){await p.evaluate(()=>{const m=document.getElementById('modal');if(m){m.hidden=true;m.style.setProperty('display','none','important')}for(let i=0;i<8;i++){const e=document.elementFromPoint(innerWidth/2,innerHeight/2);if(!e||e.closest('.game'))break;const t=e.closest('[id],[class]')||e;console.log('cover',t.id||t.className);t.style.setProperty('display','none','important')}});await sl(400);fs.mkdirSync(DIR,{recursive:true});fs.writeFileSync(`${DIR}/${sz}-${buoi<0?'night':'day'}.tsv`,rows.info.map(x=>[x.k,x.name,x.vis?'visible':'HIDDEN',x.overlap?'overlap':'clear',x.mv||'',Math.round(x.dist)+'px',x.lead?'leader':''].join('\t')).join('\n'));await p.screenshot({path:`${DIR}/${sz}-${buoi<0?'night':'day'}.png`})}
  if(hid.length||ov.length)bad++;
  /* inside every zone: each member keeps its visible kit tag, no overlaps; the zone total = the sum of the hidden members' counts */
  const zones=rows.info.filter(x=>x.k.startsWith('zone:')).map(x=>x.k.slice(5));
  for(const z of zones){const zr=await p.evaluate(z=>{render();const want=[...document.querySelectorAll('.game.maptab .mapw .mspot.mzh[data-zn="'+z+'"]')].map(s=>s.dataset.go||s.dataset.ak||'').filter(Boolean);let sum=0;for(const k of want)sum+=countAt(k);
     const tag=document.querySelector('.mzone[data-zone="'+z+'"] .mmeta');const shown=tag?parseInt(tag.textContent)||0:-1;mapzGo(z);return{sum,shown}},z);await sl(1800);
   const inner=await p.evaluate(z=>{const S2=[...document.querySelectorAll('.game.maptab .mapw .mspot')].filter(s=>!s.classList.contains('mzh'));const out=S2.filter(s=>s.dataset.zn!==z).length;
     const I=S2.map(s=>{const l=s.querySelector('.mlab');const r=l.getBoundingClientRect();const sc=document.querySelector('.game.maptab .mapsc').getBoundingClientRect();return{k:s.dataset.go||s.dataset.ak||l.textContent.trim(),vis:r.width>2&&getComputedStyle(l).display!=='none',inView:r.left>=sc.left-2&&r.right<=sc.right+2&&r.top>=sc.top-2&&r.bottom<=sc.bottom+2,r}});
     let ov=0;I.forEach(a=>I.forEach(c=>{if(a!==c&&a.vis&&c.vis&&Math.min(a.r.right,c.r.right)-Math.max(a.r.left,c.r.left)>1&&Math.min(a.r.bottom,c.r.bottom)-Math.max(a.r.top,c.r.top)>1)ov++}));
     return{n:I.length,out,hidden:I.filter(x=>!x.vis).map(x=>x.k),offView:I.filter(x=>x.vis&&!x.inView).map(x=>x.k),ov:ov/2,fog:!!document.querySelector('.mapv[data-mz="'+z+'"] .kmfog')}},z);
   const okz=inner.n>0&&!inner.out&&!inner.hidden.length&&!inner.ov&&inner.fog&&zr.sum===zr.shown;
   console.log(sz,buoi<0?'night':'day',`  zone ${z}: total ${zr.shown} (sum ${zr.sum}) places=${inner.n} hidden=${inner.hidden.length} overlap=${inner.ov} outside=${inner.out} offView=${inner.offView.join(',')||0} fog=${inner.fog}`,okz?'OK':'FAIL');
   if(DIR&&DIR!=='-'){await p.screenshot({path:`${DIR}/${sz}-${buoi<0?'night':'day'}-zone-${z}.png`})}
   if(!okz)bad++;await p.evaluate(()=>mapzGo(null));await sl(800)}}
 await ctx.close();if(errs.length)console.log('errs',errs.join('|'))}
await b.close();process.exit(bad?1:0)})();
