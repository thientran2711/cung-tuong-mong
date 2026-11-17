/* Look sheet of HER six looks at stage size, head + full-body rows, drawn by the game's own layer (toilMkLayer + LOD pass).
   usage: node dev/measure/toil-lod-sheet.js <http://host:port/index.html> <out.png> [face c05] [tier t4]
   Cells: Mặt mộc, Vụng A (white powder), Vụng B (gaudy; a seed where toilVungB is true), Đoan trang, Kiều diễm, Khuynh thành.
   Vụng A / B are forced by SEED only (BAL odds untouched). Row 1 = portrait head zoom (full strength); row 2 = figure at real @2 px, head crop x3 smooth. */
const {chromium}=require('playwright');const [,,URL,OUT,FACE='c05',TIER='t4']=process.argv;
const LOOKS=[['Mặt mộc',null,0],['Vụng A',"vung",'A'],['Vụng B (diêm dúa)',"vung",'B'],['Đoan trang',"vua",0],['Kiều diễm',"dep",0],['Khuynh thành',"tuyet",0]];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1500,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.MK_FIT&&window.toilMkLayer,null,{timeout:120000});
 const info=await p.evaluate(async([face,tier,LOOKS])=>{
  const B=typeof IMG_BASE==='string'?IMG_BASE:'';document.body.innerHTML='';document.body.style.cssText='margin:0;background:#f4ead8';
  let sA=0,sB=0;for(let s=1;s<400&&!(sA&&sB);s++){const t=toilVungB({seed:s});if(t&&!sB)sB=s;if(!t&&!sA)sA=s}
  const por=`por-consort-${face}-${tier}-a18.webp`,fig=`fig-consort-${face}-${tier}-a18.webp`;
  const mk=async(file,look,kind,i,fw)=>{const v=TOIL_FIT.fit[file];const asp=v?v[8]:1.3;const box=document.createElement('div');box.id=file.slice(0,3)+i;
   box.style.cssText=`position:absolute;left:${10+i*240}px;top:${file[0]==='p'?10:300}px;width:${fw}px;height:${fw*asp}px;overflow:hidden;background:#fffaf0`;
   box.innerHTML=`<img src="${B}img/${file}" style="position:absolute;left:0;top:0;width:100%;height:100%">`;
   if(look){const col=toilColFix({seed:kind==="B"?sB:sA});let h="";for(let t=0;t<80&&!(h=toilMkLayer(file,look,col));t++)await new Promise(r=>setTimeout(r,250));
    h=h.replace('style="','style="position:absolute;left:var(--fleft);top:var(--ftop);width:var(--fwidth);height:var(--fheight);');box.insertAdjacentHTML('beforeend',h)}
   document.body.appendChild(box);return v};
  const rows=[];for(let i=0;i<LOOKS.length;i++){const l=LOOKS[i];rows.push([await mk(por,l[1],l[2],i,230),await mk(fig,l[1],l[2],i,150)])}return{sA,sB,rows}},[FACE,TIER,LOOKS]);
 /* LOD pass (the game's own) + wait for every colour layer to be painted */
 await p.waitForTimeout(1500);await p.evaluate(()=>toilLodPass&&toilLodPass());
 await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth)&&[...document.querySelectorAll('img.kmkc')].every(i=>!i.src.includes('data:image/gif')&&i.naturalWidth>2),null,{timeout:120000}).catch(()=>{});
 await p.evaluate(()=>toilLodPass());await p.waitForTimeout(2500);
 await p.waitForFunction(()=>[...document.querySelectorAll('img.kmkc')].every(i=>i.complete&&i.naturalWidth>2),null,{timeout:60000}).catch(()=>{});
 const shots=[];for(let i=0;i<LOOKS.length;i++){const v=info.rows[i];
  const pb=await (await p.$('#por'+i)).screenshot();
  /* portrait: crop the face zone; figure: head crop */
  const hb=await p.evaluate(([i,v])=>{const e=document.querySelector('#fig'+i);const r=e.getBoundingClientRect();const w=r.width;const fx=r.left+v[0]/100*w,fy=r.top+v[1]/100*r.height;return{x:Math.max(0,fx-45),y:Math.max(0,fy-48),w:90,h:96}},[i,v[1]]);
  const hs=await p.screenshot({clip:{x:hb.x,y:hb.y,width:hb.w,height:hb.h}});
  const info2=await p.evaluate(i=>{const l=document.querySelector('#fig'+i+' img.kmkc');return l?{lod:(l.dataset.mkk||'').split('|L')[1]||'0',w:Math.round(l.getBoundingClientRect().width/1.6)}:null},i);
  shots.push([pb.toString('base64'),hs.toString('base64'),info2])}
 const q=await ctx.newPage();await q.setContent(`<body style="margin:0;background:#f4ead8;font:700 15px sans-serif;color:#6e4d0e"><div id=g style="display:grid;grid-template-columns:repeat(6,250px);gap:10px;padding:10px">`+
  LOOKS.map(l=>`<div style="text-align:center">${l[0]}</div>`).join('')+
  shots.map(s=>`<div style="width:250px;height:300px;overflow:hidden;position:relative;border:1px solid #c9a227"><img src="data:image/png;base64,${s[0]}" style="position:absolute;left:0;top:-10px;width:250px"></div>`).join('')+
  shots.map(s=>`<div style="width:250px;height:260px;overflow:hidden;border:1px solid #c9a227"><img src="data:image/png;base64,${s[1]}" style="width:250px;image-rendering:auto"></div>`).join('')+
  shots.map(s=>`<div style="text-align:center;font-weight:400;font-size:12px">${s[2]?'figure face '+s[2].w+' px, LOD step '+s[2].lod:'original picture'}</div>`).join('')+`</div></body>`);
 await q.setViewportSize({width:1560,height:960});await q.waitForTimeout(500);await q.screenshot({path:OUT,fullPage:true});console.log(JSON.stringify({seedA:info.sA,seedB:info.sB,errs}));await b.close()})();
