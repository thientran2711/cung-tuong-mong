/* contact sheet through the GAME's own makeup painter (jtoil toilMkDraw + toilRow), local fit files.
   usage: node sheet.js <url> <fitdir> <out.jpg> <looks comma> <file1,file2,...|@listfile> [cols] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,FIT,OUT,LOOKS,FILES,COLS]=process.argv;
let files=FILES.startsWith('@')?fs.readFileSync(FILES.slice(1),'utf8').split(/\s+/).filter(Boolean):FILES.split(',');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:800,height:800},serviceWorkers:'block'});
 await ctx.route(/img\/(mk-fit\/[a-z0-9-]+|toil-fit2)\.json/,r=>{const k=/img\/(mk-fit\/[a-z0-9-]+|toil-fit2)\.json/.exec(r.request().url())[1];const f=FIT+'/'+k.replace('mk-fit/','')+'.json';if(fs.existsSync(f))r.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(f)});else r.continue()});
 const p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>console.error('pe',e.message.slice(0,120)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof toilMkDraw==='function'&&typeof toilRow==='function'&&typeof BAL!=='undefined');await p.waitForTimeout(1500);
 const url=await p.evaluate(async([files,looks,cols])=>{
  TOIL_FIT.fit=await fetch(IMG_BASE+'img/toil-fit2.json').then(r=>r.json()).then(j=>j.fit||j);
  const T=150,C=cols||looks.length,tiles=[];const col=toilColFix({mat:'tuvi',ma:'yenchi',son:'dotham',may:'den'});col.seed=5;
  for(const f of files){const g=MK_FIT.face(f);if(!MK_FIT.g[g])MK_FIT.g[g]=await fetch(IMG_BASE+'img/mk-fit/'+g+'.json').then(r=>r.ok?r.json():{}).catch(()=>({}));
   const v=MK_FIT.g[g][f];const im=await new Promise(r=>{const e=new Image();e.crossOrigin='anonymous';e.onload=()=>r(e);e.onerror=()=>r(null);e.src=IMG_U('img/'+f)});
   for(const lk of looks){tiles.push({f,lk,v,im})}}
  const R=Math.ceil(tiles.length/C);const sh=document.createElement('canvas');sh.width=C*T;sh.height=R*T;const sg=sh.getContext('2d');sg.fillStyle='#fff';sg.fillRect(0,0,sh.width,sh.height);
  tiles.forEach((t,i)=>{const x=(i%C)*T,y=Math.floor(i/C)*T;if(!t.im||!t.v){sg.fillStyle='#c00';sg.fillRect(x,y,T,T);sg.fillStyle='#fff';sg.fillText(t.f.slice(4,30),x+2,y+12);return}
   const W=t.im.naturalWidth,H=t.im.naturalHeight,box=toilMkBox(t.v);let row=null;try{row=toilRow(t.f)}catch(e){}
   const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(t.im,0,0);
   if(t.lk!=='moc'){const src=toilMkDraw(t.im,t.v,t.lk,col,box,row,0);/* sync dataURL */const li=new Image();li.src=src;t.li=li;t.c=c;t.box=box}
   t.c=c;t.box=box});
  await new Promise(r=>setTimeout(r,400));
  tiles.forEach((t,i)=>{const x=(i%C)*T,y=Math.floor(i/C)*T;if(!t.c)return;const W=t.c.width,H=t.c.height,b=t.box;const g=t.c.getContext('2d');
   if(t.li)g.drawImage(t.li,b[0]/100*W,b[1]/100*H,b[2]/100*W,b[3]/100*H);
   const bw=b[2]/100*W,bh=b[3]/100*H,s=Math.max(bw,bh*H/W>0?bh:bw)*1.25,cx=(b[0]/100*W)+bw/2,cy=(b[1]/100*H)+bh/2+bh*.1;
   sg.drawImage(t.c,cx-s/2,cy-s/2,s,s,x,y,T,T);sg.fillStyle='rgba(255,255,255,.8)';sg.fillRect(x,y+T-11,T,11);sg.fillStyle='#000';sg.font='9px sans-serif';sg.fillText(t.f.slice(4,-5).replace(/^(consort|maid|mama|player|thaihau)-/,'')+' '+t.lk,x+2,y+T-2)});
  return sh.toDataURL('image/jpeg',.82)},[files,LOOKS.split(','),COLS?+COLS:0]);
 fs.writeFileSync(OUT,Buffer.from(url.split(',')[1],'base64'));await b.close()})();
