/* D25 veil-zoom scan (review/veil-zoom): every place that shows a face with an overlay (veil kveil2 + scar kscar + makeup/rash/slap layers)
   must lay the overlay box on the face exactly where the fit data says, whatever zoom/crop that place draws the portrait with.
   For each overlay layer the script computes the picture's DRAWN rectangle (object-fit / object-position / zoom, as seen on screen), takes the
   fit % of the picture file from the same tables the game uses (img/veil-fit.json for veil + face layers, img/scar-fit.json for scar/slap,
   img/toil-fit.json / MK_FIT for makeup) and compares that expected box with the layer's real box (px, unrotated layout box).
   usage: node dev/test/veil-zoom.js <url of the built site index.html> <W>x<H>@dpr [outdir]          (direct mode, default 755x1000@1)
          node dev/test/veil-zoom.js <url> - [outdir] --host <device>   (ROT.JS HOST mode; device from dev/test/lib/device.js: fold, iphone14Land,
                                                                         ipadPro...; lib path = $CTM_DEVICE_LIB or ./lib/device)
   Output: one JSON line; exit 1 when any place misses (err > TOL of the layer width, size ratio off by > STOL). */
const {chromium}=require('playwright');const fs=require('fs');
const args=process.argv.slice(2);const URL=args[0],SZ=args[1]&&args[1]!=='-'?args[1]:'755x1000@1';const hi0=args.indexOf('--host');const OUT=args.slice(2,hi0>0?hi0:undefined).find(a=>a&&a!=='-'&&!a.startsWith('--'))||null;
const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const TOL=0.06,STOL=0.04;
if(OUT)fs.mkdirSync(OUT,{recursive:true});
/* runs in the page: measure every visible overlay layer against the picture it sits on */
const MEASURE=function(label,TOL,STOL){
 const out=[];const nm=s=>String(s||'').split('?')[0].split('/').pop();
 const cont=[...document.querySelectorAll('.kfx,.kfxf')].filter(c=>{const r=c.getBoundingClientRect();return r.width>1&&r.height>1&&c.querySelector('img.kscar,img.kveil2,img.kslap,img.kmk,i.kff,img.krash')});
 for(const c of cont){
  /* a sheet caught mid-flip (3D matrix on an ancestor) has no affine geometry to compare: counted, not measured */
  let td=false;for(let a=c;a&&a!==document.body;a=a.parentElement){if(/^matrix3d/.test(getComputedStyle(a).transform)){td=true;break}}if(td){out.push({label,skip3d:1});continue}
  let pic=null;
  if(c.classList.contains('kfx')){const host=(c.closest('.kfxc')||c).parentElement;pic=host.querySelector(':scope>img.kpor')||host.querySelector('img[src*="por-"]')||host.querySelector('img:not(.kfr):not(.kgem):not(.kcrest):not(.kemb)')}
  else{const p=c.parentElement;pic=c.__fig||p.querySelector(':scope>img.kfxon')||p.querySelector(':scope>img.figimg')||p.querySelector(':scope>img#mefig')||p.querySelector(':scope>img')||p.querySelector('img.kfxon')||p.querySelector('img.figimg')}
  if(!pic){out.push({label,miss:'no picture for layer box'});continue}
  const file=nm(pic.currentSrc||pic.src);const pr=pic.getBoundingClientRect();const cs=getComputedStyle(pic);
  let dl=pr.left,dt=pr.top,dw=pr.width,dh=pr.height;const nw=pic.naturalWidth,nh=pic.naturalHeight;
  if(nw&&nh&&/contain|cover|scale-down/.test(cs.objectFit)){const k=cs.objectFit==='cover'?Math.max(pr.width/nw,pr.height/nh):Math.min(pr.width/nw,pr.height/nh);dw=nw*k;dh=nh*k;
   const op=(cs.objectPosition||'50% 50%').split(/\s+/);const f=(v,free)=>/%$/.test(v)?free*parseFloat(v)/100:/px$/.test(v)?parseFloat(v)*(pr.width/(pic.offsetWidth||pr.width)):free/2;dl+=f(op[0]||'50%',pr.width-dw);dt+=f(op[1]||'50%',pr.height-dh)}
  const cr=c.getBoundingClientRect();const sc=cr.width/(c.offsetWidth||cr.width);
  for(const L of c.querySelectorAll('img.kscar,img.kveil2,img.kslap')){
   const tbl=L.classList.contains('kveil2')?(window.KIT_VEIL&&KIT_VEIL.fit):(window.KIT_SCAR&&KIT_SCAR.fit);const r=tbl&&tbl[file];
   if(!r){out.push({label,file,cls:L.className,miss:'no fit data'});continue}
   /* expected layer box = the layer's own %-box (its --f* vars) laid on the DRAWN picture */
   const v=n=>parseFloat(L.style.getPropertyValue('--f'+n))/100;const ex={l:dl+v('left')*dw,t:dt+v('top')*dh,w:v('width')*dw,h:v('height')*dh};
   const tf0=L.style.getPropertyValue('transform');const imp=L.style.getPropertyPriority('transform');L.style.setProperty('transform','none','important');const lr=L.getBoundingClientRect();L.style.removeProperty('transform');if(tf0)L.style.setProperty('transform',tf0,imp);
   const ac={l:lr.left,t:lr.top,w:lr.width,h:lr.height};/* unrotated, sub-pixel exact */
   /* and the fit data itself: the box the fit table says (veil: r as is; scar: r) on the drawn picture */
   const fit={l:dl+r[0]/100*dw,t:dt+r[1]/100*dh,w:r[2]/100*dw,h:r[3]/100*dh};
   const e1=Math.max(Math.abs(ac.l-ex.l),Math.abs(ac.t-ex.t))/ex.w,sz=Math.abs(ac.w/ex.w-1),sz2=Math.abs(ac.h/ex.h-1);
   /* the cheek/slap layers are sub-boxes of the scar fit, so compare the VEIL against the fit table exactly */
   let e2=0,sz3=0;if(L.classList.contains('kveil2')){e2=Math.max(Math.abs(ac.l-fit.l),Math.abs(ac.t-fit.t))/fit.w;sz3=Math.abs(ac.w/fit.w-1)}
   const err=Math.max(e1,e2),ser=Math.max(sz,sz2,sz3);
   out.push({label,file,layer:L.className,place:(c.parentElement.id?'#'+c.parentElement.id:c.parentElement.className.split(' ')[0])+'>'+c.className.split(' ')[0]+(c.closest('.kbk')?' (book)':c.closest('#modal')?' (dialog)':''),err:+err.toFixed(3),size:+ser.toFixed(3),pass:err<=TOL&&ser<=STOL,zoom:pic.dataset.kpz||'',dbg:err>TOL?JSON.stringify([[cr.left,cr.top,cr.width,cr.height].map(Math.round),[pr.left,pr.top,pr.width,pr.height].map(Math.round),pic.id,pic.className,getComputedStyle(pic).transform,c.style.transform]):''})}
 }
 return out};
const hi=args.indexOf('--host');const HOST=hi>0?args[hi+1]:null;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});let ctx,p,F;
 if(HOST){const D=require(process.env.CTM_DEVICE_LIB||'./lib/device');ctx=await D.newDeviceContext(b,HOST,{reducedMotion:'reduce'});p=await ctx.newPage();p.setDefaultTimeout(240000);F=await D.openHost(p,URL)}
 else{ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce',hasTouch:W<1100,isMobile:W<1100});p=await ctx.newPage();p.setDefaultTimeout(240000);await p.goto(URL,{waitUntil:'domcontentloaded'});F=p}
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await F.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await F.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await F.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await F.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await F.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
 await F.waitForFunction(()=>window.KIT_VEIL&&KIT_VEIL.fit&&KIT_SCAR&&KIT_SCAR.fit&&window.TOIL_FIT&&TOIL_FIT.fit,null,{timeout:60000}).catch(()=>{});
 const tag=HOST||SZ.replace(/[@x]/g,'_');const rows=[];const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/vz-${n}-${tag}.jpg`,type:'jpeg',quality:70})};
 const scan=async(label)=>{await p.waitForTimeout(1500);const r=await F.evaluate(`(${MEASURE.toString()})(${JSON.stringify(label)},${TOL},${STOL})`);rows.push(...r);return r.length};
 /* every person in view gets a veil AND a scar the player knows (so both layers show), a rash and a slap on top */
 await F.evaluate(()=>{window.kitKnown=()=>true;window.kitKnownName=()=>true});/* every person shows her real face (not the grey silhouette) so each picture can be measured */
 await F.evaluate(()=>{const all=[S].concat(typeof liveRivals==='function'?liveRivals(true):[]);for(const v of all){v.scar={sev:2,known:1,veil:1};try{rashGive(v,2,'thử')}catch(e){}try{slapGive(v,S,'')}catch(e){}}
  try{kn()}catch(e){}for(const v of liveRivals(true))try{S.met[v.id]=wk()}catch(e){}render()});
 /* 1. main screen: header avatar, side strips, stage figures */
 await scan('main');await shot('main');
 /* 2. person card (rivals tab) and each tab of the strips */
 await F.evaluate(()=>{const v=liveRivals(true)[0];tab='rv';PG.rv=rivals.indexOf(v);render()});await scan('person-card');await shot('card');
 /* 3. dialog person column (visitor card) */
 await F.evaluate(()=>{const v=liveRivals(true)[0];Q.length=0;Q.push({t:'Có người đến',who:pv(v),h:`<p>${v.name} đến cửa cung.</p>`,opts:[{n:'Nhịn',fx:{duc:2},x:'giữ lễ',go:()=>{}}]});showModal()});await scan('dialog');await shot('dialog');
 await F.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 /* 4. kitFaceZoom (the mirror zoom) with the same layers */
 await F.evaluate(()=>{const por=typeof toilPor==='function'?toilPor():null;const f=por&&por.src&&kitFile(por.src);const d=document.createElement('div');d.id='vz-zoom';d.style.cssText='position:fixed;left:10px;top:10px;width:220px;z-index:99999;background:#fff';
  d.innerHTML=window.kitFaceZoom(S,f)||'';document.body.appendChild(d)});await scan('kitFaceZoom');await shot('zoom');await F.evaluate(()=>document.getElementById('vz-zoom')&&document.getElementById('vz-zoom').remove());
 /* 5. makeup reveal (figure + mirror zoom) */
 await F.evaluate(()=>{S.toilette={day:toilWk()*10,wk:toilWk(),score:80,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'dep',col:toilColFix(null)};S.toilette.col.seed=toilWk()});
 await F.evaluate(()=>{window.__rv=0;try{toilReveal({look:'dep',made:true,score:80,pre:'thử',good:true,manual:true},()=>{window.__rv=1})}catch(e){window.__rverr=e.message}});await p.waitForTimeout(3500);await F.evaluate(()=>{const o=document.querySelector('.ktrv-ov');if(o)o.click()});await scan('makeup-reveal');await shot('reveal');
 await F.evaluate(()=>{document.querySelectorAll('.ktrv-ov').forEach(e=>e.remove())});
 /* 5b. galleries: one tall frame (pcPort) and one small frame (mdH) for herself, every consort and every elder/servant, each with its own zoom */
 await F.evaluate(()=>{const ppl=[];const add=(f,v)=>{try{if(v&&typeof v==='object'){v.scar={sev:2,known:1,veil:1};v.__vzs=1}ppl.push(f)}catch(e){}};add(pMe(),S);
  for(const v of rivals.slice(0,40))add(pv(v),v);try{const E=typeof elders==='function'?elders():[];for(const st of (E||[]).slice(0,12))add(staffFace(st),st)}catch(e){}
  const g=document.createElement('div');g.id='vz-gal';g.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:99998;background:#f4ead6;overflow:auto;display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start;padding:6px';
  g.innerHTML=ppl.map(f=>`<div style="width:90px;height:190px;position:relative">${pcPort(f,f.col||'#a33')}</div>`).join('')+'<hr style="width:100%">'+ppl.map(f=>`<span style="display:inline-block">${mdH(f,'sm')}</span>`).join('');document.body.appendChild(g);window.__vzN=ppl.length});
 await p.waitForTimeout(2500);await scan('gallery');await shot('gallery');await F.evaluate(()=>document.getElementById('vz-gal').remove());
 /* 5c. one picture per zoom: up to 8 por files of every family (consort tiers, maids, mamas, eunuchs, officials, kids...) spread over their zoom range,
    drawn as tall frame + small frame with the same veil + scar, so every z / lift / shift in the data is measured */
 const picked=await F.evaluate(()=>{const fam={};for(const k of Object.keys(KIT_VEIL.fit)){if(!/^por-/.test(k)||!KIT_SCAR.fit[k]||!KPOR_FACE)continue;const m=/por-([^/?]+)\.webp/.exec(k);if(!m||!KPOR_FACE[m[1]])continue;(fam[kporFam(k)||'x']=fam[kporFam(k)||'x']||[]).push(k)}
  const pick=[];for(const f of Object.keys(fam)){const a=fam[f].sort((x,y)=>kporGeo(IMG_U('img/'+x),{t:.1,f:null,x:.5}).z-kporGeo(IMG_U('img/'+y),{t:.1,f:null,x:.5}).z);const n=Math.min(8,a.length);for(let i=0;i<n;i++)pick.push(a[Math.floor(i*(a.length-1)/Math.max(1,n-1))])}
  const files=[...new Set(pick)];const g=document.createElement('div');g.id='vz-gal2';g.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:99998;background:#f4ead6;overflow:auto;display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start;padding:4px';
  const mk=f=>({src:IMG_U('img/'+f),col:'#a33',ini:'x',__kp:S});
  g.innerHTML=files.map(f=>`<div style="width:70px;height:148px;position:relative">${pcPort(mk(f),'#a33')}</div>`).join('')+'<hr style="width:100%">'+files.map(f=>`<span style="display:inline-block">${mdH(mk(f),'sm')}</span>`).join('');document.body.appendChild(g);return{fam:Object.keys(fam).length,files:files.length}});
 rows.push({label:'gallery-por files',info:picked,pass:true,err:0,size:0,file:'',layer:''});await p.waitForTimeout(6000);await scan('gallery-por');await shot('gallery-por');await F.evaluate(()=>document.getElementById('vz-gal2').remove());
 /* 6. Tuần lục (week book) person pages */
 await F.evaluate(()=>{try{dawn()}catch(e){}});await p.waitForTimeout(3500);
 await F.evaluate(async()=>{const bk=window.__kbk;if(!bk)return;for(let c=0;c<=bk.max;c+=1){bk.go(c);await new Promise(r=>setTimeout(r,250));window.__bkRows=(window.__bkRows||[]);}});
 const bkn=await F.evaluate(()=>window.__kbk?window.__kbk.max:-1);
 for(let c=0;c<=bkn;c++){await F.evaluate(c=>window.__kbk.go(c),c);await p.waitForTimeout(350);await scan('book');if(c===1)await shot('book')}
 const skipped=rows.filter(r=>r.skip3d).length;const bad=rows.filter(r=>r.miss||r.pass===false);
 const summary={size:HOST?'host:'+HOST:SZ,n:rows.length,fail:bad.length,errs,skipped3d:skipped,rows:rows.filter(r=>!r.skip3d).map(r=>r.miss?r:[r.label,r.file&&r.file.slice(0,34),r.layer,r.err,r.size,r.pass?'ok':'FAIL',r.zoom,r.place,r.dbg].join('|'))};
 console.log(JSON.stringify(summary));await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
