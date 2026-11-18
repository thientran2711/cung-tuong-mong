/* review/face-zoom-stretch (owner 18/11 05:25Z): the mirror close-up must keep the TRUE aspect of the picture.
   usage: node dev/test/face-zoom-aspect.js <url> <WxH@dpr> <shotdir> [nSamples=24]
   Part A: kitFaceZoom(S,file) over many fig-/por- files at its CSS size: rendered <img> box w/h vs the file's natural w/h (must be within 1 %).
   Part B: the reveal (toilReveal): same for the figure picture + the portrait patch inside the zoomed camera (camera scale is uniform, so the box is measured un-zoomed from offsetWidth/offsetHeight). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,DIR,NS]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 if(process.env.SEED){await p.addInitScript(sd=>{let a=+sd;Math.random=()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}},process.env.SEED)}
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(3000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:60000}).catch(()=>{});
 /* A */
 const A=await p.evaluate(async n=>{const fit=TOIL_FIT.fit,ks=Object.keys(fit),por=ks.filter(k=>k.startsWith('por-')),fig=ks.filter(k=>k.startsWith('fig-'));
  const pick=(a,k)=>{const o=[];for(let i=0;i<k;i++)o.push(a[Math.floor(i*a.length/k)+7]||a[i]);return o};
  const files=pick(fig,n).concat(pick(por,Math.max(4,n>>2)));const h=document.createElement('div');h.id='fzh';h.style.cssText='position:fixed;left:0;top:0;width:200px;z-index:99999;background:#fff';document.body.appendChild(h);const rows=[];
  for(const f of files){h.innerHTML=kitFaceZoom(S,f);const im=h.querySelector('.kfzoom-i>img');if(!im){rows.push({f,err:'no html'});continue}
   await new Promise(r=>{if(im.complete&&im.naturalWidth)r();else{im.onload=r;im.onerror=r;setTimeout(r,8000)}});
   const w=im.offsetWidth,hh=im.offsetHeight,nw=im.naturalWidth,nh=im.naturalHeight;const ar=nw?(hh/w)/(nh/nw):null;rows.push({f:f.replace(/\.webp$/,''),fitA:+fit[f][8].toFixed(3),file:+(nh/nw).toFixed(3),box:+(hh/w).toFixed(3),ratio:ar&&+ar.toFixed(3)})}
  h.remove();return rows},+(NS||24));
 /* B */
 const B=await p.evaluate(async FORCE=>{const out={};try{window.__rv=1;if(FORCE){window.toilFigAt=()=>'fig-consort-'+FORCE+'-t2-a18.webp';window.toilPor=()=>({src:'img/por-consort-'+FORCE+'-t2-a18.webp',rank:2})}toilReveal({look:'dep',mk:1,manual:1},()=>{});await new Promise(r=>setTimeout(r,1500));
  const ov=document.querySelector('.ktrv-ov');const fw=ov.querySelector('.ktrv-fw'),im=fw.querySelector(':scope>img'),pw=fw.querySelector('.ktrv-pw>img');
  await new Promise(r=>{const t=Date.now();const g=()=>{if((im.complete&&im.naturalWidth)||Date.now()-t>10000)r();else setTimeout(g,100)};g()});
  const q=e=>e?{box:+((e.offsetHeight/e.offsetWidth)).toFixed(3),file:+(e.naturalHeight/e.naturalWidth).toFixed(3),w:e.offsetWidth,h:e.offsetHeight}:null;
  out.fig=q(im);out.fwbox=+(fw.offsetHeight/fw.offsetWidth).toFixed(3);out.pw=q(pw);if(pw){const w=pw.parentElement;out.pwbox=+(w.offsetHeight/w.offsetWidth).toFixed(3)};out.src=String(im.src).split('/').pop().split('?')[0]
  if(window.TOIL_REV){TOIL_REV.go();await new Promise(r=>setTimeout(r,2200));TOIL_REV.zoom();await new Promise(r=>setTimeout(r,1600))}}catch(e){out.err=e.message}return out},process.env.FORCE||'');
 await p.evaluate(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove()));await p.waitForTimeout(800);await p.screenshot({path:DIR+'/reveal-'+(process.env.TAG||'')+m[1]+'x'+m[2]+'.png'});
 console.log(JSON.stringify({vp:VP,A,B,errs}));await b.close()})();
