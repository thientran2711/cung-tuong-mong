/* MAKEUP-FIT repro: her figure on the stage + top-bar portrait, each look; optional local mk-fit/toil-fit (after).
   usage: node repro.js <url> <WxH@dpr> <outprefix> [fitdir|-] [face-group e.g. consort-c05] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,OUT,FIT,FACE]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});
 if(FIT&&FIT!=='-')await ctx.route(/img\/(mk-fit\/[a-z0-9-]+|toil-fit2)\.json/,r=>{const k=/img\/(mk-fit\/[a-z0-9-]+|toil-fit2)\.json/.exec(r.request().url())[1];const f=FIT+'/'+k.replace('mk-fit/','')+'.json';if(fs.existsSync(f))r.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(f)});else r.continue()});
 const p=await ctx.newPage();p.setDefaultTimeout(90000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(3000);
 await p.evaluate(()=>{new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,#kroul').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});Q.length=0;try{closeModal()}catch(e){}});
 if(FACE)await p.evaluate(F=>{/* swap her face to this group: rewrite figFor/porFor results */const sw=s=>typeof s==='string'?s.replace(/(por|fig)-[a-z]+-[a-z]*\d+-/,(a,k)=>k+'-'+F+'-'):s;
   for(const fn of ['figFor','porFor','kitFigOf','kitPorOf']){if(typeof window[fn]==='function'){const f0=window[fn];window[fn]=function(p){const r=f0.apply(this,arguments);return p===S?sw(r):r}}}},FACE);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit,null,{timeout:40000}).catch(()=>{});
 const info={looks:{}};
 for(const lk of ['moc','vua','dep','tuyet','diem','vung']){
  const fig=await p.evaluate(lk=>{const c=toilColFix(null);c.seed=5;S.toilette={day:toilWk()*10,wk:toilWk(),score:lk==='tuyet'?92:lk==='dep'?75:lk==='vua'?50:20,makeup:lk!=='moc',style:'fit',dv:'hopdip',F:1,occ:['th'],look:lk==='vua'||lk==='moc'?null:lk,col:c};Q.length=0;try{closeModal()}catch(e){}render();return kitFigOf(S)},lk);
  await p.waitForTimeout(2500);for(let k=0;k<3;k++){await p.evaluate(()=>{try{toilLodPass()}catch(e){}});await p.waitForTimeout(700)}
  const r=await p.evaluate(()=>{const f=kitFile(kitFigOf(S));const im=[...document.querySelectorAll('#stage img')].find(i=>kitFile(i.currentSrc||i.src)===f);if(!im)return{f};const q=im.getBoundingClientRect();const v=MK_FIT.get(f);
   const L=[...document.querySelectorAll('#stage img.kmkc')].map(l=>{const z=l.getBoundingClientRect();return[z.left,z.top,z.width,z.height]});return{f,r:[q.left,q.top,q.width,q.height],v:!!v,L,box:v?toilMkBox(v):null}});
  info.looks[lk]=r;
  if(r.r&&r.box){const [x,y,w,h]=r.r,bx=x+r.box[0]/100*w,by=y+r.box[1]/100*h,bw=r.box[2]/100*w,bh=r.box[3]/100*h,s=Math.max(bw,bh)*1.6;
   await p.screenshot({path:`${OUT}-${lk}-face.png`,clip:{x:Math.max(0,bx+bw/2-s/2),y:Math.max(0,by+bh/2-s/2),width:s,height:s}})}
  if(lk==='vung'||lk==='diem')await p.screenshot({path:`${OUT}-${lk}-full.jpg`,quality:70})}
 info.errs=errs;console.log(JSON.stringify(info));await b.close()})();
