/* Sheet of HER three looks (mặt mộc / điểm trang đẹp / diêm dúa) on three outfits, portrait + figure head, drawn with the game's own layer
   (jtoil toilMakeupSvg + img/toil-fit.json). usage: node dev/test/toil-looks.js <url> <out.jpg> [face c05] [tiers t1,t4,t7] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,FACE,TIERS]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1560,height:780},deviceScaleFactor:1,serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.TOIL_FIT,null,{timeout:120000});
 /* the local img/toil-fit.json (the one about to be pushed) */
 try{const j=fs.readFileSync('img/toil-fit.json','utf8');await p.evaluate(j=>{TOIL_FIT.fit=JSON.parse(j)},j)}catch(e){}
 const n=await p.evaluate(([face,tiers])=>{const B=typeof IMG_BASE==='string'?IMG_BASE:'';document.body.innerHTML='';document.body.style.cssText='margin:0;background:#f4ead8;font:14px sans-serif';
  const T=tiers.split(','),looks=[['mộc / vụng (tranh gốc)',null],['đẹp',"dep"],['diêm dúa',"diem"]];const W=document.createElement('div');W.style.cssText='display:grid;grid-template-columns:110px repeat(6,230px);gap:8px;padding:10px';
  const hd=t=>{const e=document.createElement('div');e.textContent=t;e.style.cssText='font-weight:700;color:#6e4d0e;align-self:center';return e};
  W.appendChild(hd(''));looks.forEach(l=>W.appendChild(hd('Chân dung · '+l[0])));looks.forEach(l=>W.appendChild(hd('Dáng đứng · '+l[0])));let cnt=0;
  for(const t of T){W.appendChild(hd('Y phục '+t));const por=`por-consort-${face}-${t}-a18.webp`,fig=`fig-consort-${face}-${t}-a18.webp`;
   for(const [file,isFig] of [[por,0],[fig,1]])for(const [,lk] of looks){const box=document.createElement('div');box.style.cssText='position:relative;width:230px;height:230px;overflow:hidden;border:1px solid #c9a227;background:#fffaf0';
    const inner=document.createElement('div');const v=TOIL_FIT.fit[file];
    /* zoom on the face: the picture box is scaled so the face fills the cell, the layer box is the same box */
    const zw=isFig?230/(v?v[6]/100*1.9:.4):230/(v?v[6]/100*1.9:.6);const asp=v?v[8]:1.3;const ih=zw*asp;const fx=v?v[0]/100*zw:zw/2,fy=v?v[1]/100*ih:ih/4;
    inner.style.cssText=`position:absolute;left:${115-fx}px;top:${140-fy}px;width:${zw}px;height:${ih}px`;
    inner.innerHTML=`<img src="${B}img/${file}" style="position:absolute;left:0;top:0;width:100%;height:100%">`+(lk&&v?`<img src="${toilMakeupSvg(file,lk)}" style="position:absolute;left:0;top:0;width:100%;height:100%">`:'');
    box.appendChild(inner);W.appendChild(box);if(lk&&v)cnt++}}
  document.body.appendChild(W);return cnt},[FACE||'c05',TIERS||'t1,t4,t7']);
 await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth),null,{timeout:240000}).catch(()=>{});await p.waitForTimeout(500);await p.screenshot({path:OUT,type:'jpeg',quality:82,fullPage:true});console.log(JSON.stringify({layers:n,errs}));await b.close()})();
