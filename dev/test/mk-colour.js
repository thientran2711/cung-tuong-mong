/* Sample sheet for KIT §60 (makeup colours on HER pictures): rows = mặt mộc + colour combos (đẹp / diêm dúa), columns = portrait, its face,
   full-body figure (upper part), its face — drawn with the game's own layers (toilMakeupSvg + toilMkLayer, img/mk-fit/<face>.json).
   usage: node dev/test/mk-colour.js <url> <out.jpg> [face consort-c05] [tier t1] [age a18] [presets]  (presets: the 14 TOIL_PRE looks, face close-ups)
   (reads the local img/mk-fit/<face>.json and dev/art/toil-fit.json when present, so it can run before the CDN upload) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,FACE0,TIER0,AGE0,MODE]=process.argv;
const FACE=FACE0||'consort-c05',TIER=TIER0||'t1',AGE=AGE0||'a18';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:900},deviceScaleFactor:1,serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.TOIL_FIT&&window.MK_FIT&&window.toilMkDraw,null,{timeout:180000});
 try{const j=fs.readFileSync('dev/art/toil-fit.json','utf8');await p.evaluate(j=>{TOIL_FIT.fit=JSON.parse(j)},j)}catch(e){}
 try{const j=fs.readFileSync(`img/mk-fit/${FACE}.json`,'utf8');await p.evaluate(([g,j])=>{MK_FIT.g[g]=JSON.parse(j);MK_FIT.ld[g]=1},[FACE,j])}catch(e){}
 const n=await p.evaluate(([face,tier,age,mode])=>{document.body.innerHTML='';document.body.style.cssText='margin:0;background:#f4ead8;font:14px serif;color:#3a2414';
  if(mode==='presets'){const por=`por-${face}-${tier}-${age}.webp`,B=IMG_U('img/');const W=document.createElement('div');W.style.cssText='display:grid;grid-template-columns:repeat(8,180px);gap:6px;padding:8px';let cnt=0;
   const cell=(t,lk,col)=>{const c=document.createElement('div');const v=TOIL_FIT.fit[por];const asp=v[8];const zw=180/(v[6]/100*1.45);let fx='';
    if(lk){const k=toilColFix(col);const mk=toilMkLayer(por,lk,k);const sv=toilMakeupSvg(por,lk,k,!!mk);fx=(sv?`<img class="kmk" src="${sv}" style="--fleft:0%;--ftop:0%;--fwidth:100%;--fheight:100%">`:'')+mk;if(mk)cnt++}
    c.innerHTML=`<div style="position:relative;width:180px;height:180px;overflow:hidden;border:1px solid #c9a227;background:#fffaf0"><div style="position:absolute;left:${90-v[0]/100*zw}px;top:${112-v[1]/100*zw*asp}px;width:${zw}px;height:${zw*asp}px"><img src="${B}${por}" style="position:absolute;left:0;top:0;width:100%;height:100%"><span class="kfxf" style="position:absolute;left:0;top:0;width:100%;height:100%">${fx}</span></div></div><div style="font-size:13px;line-height:1.25;padding:2px 0 6px">${t}</div>`;return c};
   for(const lk of ['dep','diem']){W.appendChild(cell(lk==='dep'?'<b>Mặt mộc</b>':'<b>Mặt mộc</b>',null,null));
    TOIL_PRE.filter(x=>x[2]===lk).forEach(x=>{const n=['mat','ma','son','may'].map(k=>toilColE(k,x[4][k])[2]).join(' · ');W.appendChild(cell(`<b>${lk==='dep'?'Thanh nhã':'Diêm dúa'} · ${x[1]}</b> (${x[3]==='cool'?'sắc lạnh':'sắc ấm'})<br><small>${n}</small>`,lk,x[4]))})}
   document.body.appendChild(W);return cnt}
  const combos=[['Mặt mộc (tranh gốc)',null,null],
   ['Đẹp · mặc định: phấn hoa đào, hồng phấn, son hải đường, mày nâu trầm','dep',{mat:'hoadao',ma:'hongphan',son:'haiduong',may:'nau'}],
   ['Đẹp · phấn kim sa, má hoa đào, son đỏ thắm, mày đen tuyền','dep',{mat:'kimsa',ma:'hoadao',son:'dotham',may:'den'}],
   ['Đẹp · phấn tử vi, má hồng sen, son mận chín, mày thanh đại','dep',{mat:'tuvi',ma:'hongsen',son:'manchin',may:'thanhdai'}],
   ['Diêm dúa · phấn hồng mai, yên chi, son chu sa, mày đen tuyền','diem',{mat:'hongmai',ma:'yenchi',son:'chusa',may:'den'}]];
  const B=IMG_U('img/');const por=`por-${face}-${tier}-${age}.webp`,fig=`fig-${face}-${tier}-${age}.webp`;
  const W=document.createElement('div');W.style.cssText='display:grid;grid-template-columns:150px 200px 230px 200px 230px;gap:6px;padding:8px;align-items:center';
  const hd=t=>{const e=document.createElement('div');e.textContent=t;e.style.cssText='font-weight:700;font-size:13px;line-height:1.25';return e};
  ['','Chân dung','Chân dung · mặt','Dáng đứng','Dáng đứng · mặt'].forEach(t=>W.appendChild(hd(t)));let cnt=0;
  const cell=(file,lk,col,cw,chh,zoom)=>{const box=document.createElement('div');box.style.cssText=`position:relative;width:${cw}px;height:${chh}px;overflow:hidden;border:1px solid #c9a227;background:#fffaf0`;
   const v=TOIL_FIT.fit[file];const asp=v?v[8]:1.3;let zw,left,top;
   if(zoom){zw=cw/(v[6]/100*1.45);const ih=zw*asp;left=cw/2-v[0]/100*zw;top=chh*.62-v[1]/100*ih}else if(/^fig/.test(file)){zw=cw*1.25;left=(cw-zw)/2;top=chh*.40-v[1]/100*zw*asp}else{zw=cw;left=0;top=0}
   const inner=document.createElement('div');inner.style.cssText=`position:absolute;left:${left}px;top:${top}px;width:${zw}px;height:${zw*asp}px`;
   let fx='';if(lk){const c=toilColFix(col);const mk=toilMkLayer(file,lk,c);fx=toilMakeupSvg(file,lk,c,!!mk)?`<img class="kmk" src="${toilMakeupSvg(file,lk,c,!!mk)}" style="--fleft:0%;--ftop:0%;--fwidth:100%;--fheight:100%">`:'';fx+=mk;if(mk)cnt++}
   inner.innerHTML=`<img src="${B}${file}" style="position:absolute;left:0;top:0;width:100%;height:100%"><span class="kfxf" style="position:absolute;left:0;top:0;width:100%;height:100%">${fx}</span>`;
   box.appendChild(inner);return box};
  for(const [t,lk,col] of combos){W.appendChild(hd(t));W.appendChild(cell(por,lk,col,200,264,0));W.appendChild(cell(por,lk,col,230,230,1));W.appendChild(cell(fig,lk,col,200,264,0));W.appendChild(cell(fig,lk,col,230,230,1))}
  document.body.appendChild(W);return cnt},[FACE,TIER,AGE,MODE||'']);
 await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth)&&[...document.querySelectorAll('img.kmkc')].every(i=>!/^data:image\/gif/.test(i.src)),null,{timeout:240000}).catch(()=>{});
 await p.waitForTimeout(400);await p.screenshot({path:OUT,type:'jpeg',quality:84,fullPage:true});console.log(JSON.stringify({layers:n,errs}));await b.close()})();
