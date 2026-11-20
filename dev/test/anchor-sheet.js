/* contact sheet: every consort/player face picture with its brow / cheek / lip anchors drawn through the SAME transform the minigame uses (toilGeom + toilIdeal) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,DIR,FILTER,PAGE]=process.argv;fs.mkdirSync(DIR,{recursive:true});
const LOCALFIT=async c=>{await c.route(/img\/(mk-fit\/[a-z0-9-]+|toil-fit2)\.json/,r=>{const m=/img\/(mk-fit\/[a-z0-9-]+|toil-fit2)\.json/.exec(r.request().url());const fs=require('fs');try{r.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync('/home/user/wt/toil-reveal-fix/img/'+m[1]+'.json')})}catch(e){r.continue()}})};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:900,height:900},serviceWorkers:'block'});await LOCALFIT(ctx);const p=await ctx.newPage();p.setDefaultTimeout(600000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof toilGeom==='function'&&typeof toilIdeal==='function'&&typeof BAL!=='undefined',null,{timeout:0});await p.waitForTimeout(2500);
 const idx=await p.evaluate(()=>fetch(IMG_BASE+'img/_index.json').then(r=>r.json()).then(j=>j.files.map(f=>f[0])));
 const files=idx.filter(f=>new RegExp(FILTER||'^img/por-(consort|player)-').test(f)&&/\.webp$/.test(f)).map(f=>f.split('/').pop());
 console.log('files',files.length,'idx',idx.length);
 const out=await p.evaluate(async(args)=>{const [files,pg]=args;const res=[];const groups={};
  await fetch(IMG_BASE+'img/toil-fit2.json').then(r=>r.json()).then(j=>{TOIL_FIT.fit=j.fit||j}).catch(()=>{});
  const per=pg?files.slice((pg-1)*150,pg*150):files;const TW=120,TH=130,COLS=15;const rows=Math.ceil(per.length/COLS);const sh=document.createElement('canvas');sh.width=COLS*TW;sh.height=rows*TH;const sg=sh.getContext('2d');sg.fillStyle='#ddd';sg.fillRect(0,0,sh.width,sh.height);
  let n=0;
  for(const f of per){const m=/^por-([a-z]+-[a-z]*\d+)-/.exec(f);const gp=m&&m[1];if(gp&&!groups[gp])groups[gp]=await fetch(IMG_BASE+'img/mk-fit/'+gp+'.json').then(r=>r.ok?r.json():null).catch(()=>null);
   const v=gp&&groups[gp]&&groups[gp][f];const i=n++;const cx=(i%COLS)*TW,cy=Math.floor(i/COLS)*TH;
   if(!v){res.push({f,miss:1});sg.fillStyle='#c00';sg.fillRect(cx,cy,TW,TH);sg.fillStyle='#fff';sg.fillText(f.slice(4,24),cx+2,cy+12);continue}
   const im=await new Promise(r=>{const e=new Image();e.crossOrigin='anonymous';e.onload=()=>r(e);e.onerror=()=>r(null);e.src=IMG_BASE+'img/'+f});if(!im){res.push({f,noimg:1});continue}
   const W=680,H=620,G=toilGeom(W,H,f);const J=toilIdeal(v,G.img,G.fws);
   const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.fillStyle='#d9c7a3';g.fillRect(0,0,W,H);g.save();g.beginPath();g.ellipse(G.mx,G.my,G.rx,G.ry,0,0,7);g.clip();g.drawImage(im,G.img.x,G.img.y,G.img.w,G.img.h);g.restore();
   g.lineWidth=4;g.strokeStyle='#0c0';J.brows.forEach(B=>{g.beginPath();B.c.forEach((q,k)=>k?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke()});
   g.fillStyle='#00f';J.cheeks.forEach(q=>{g.beginPath();g.arc(q.x,q.y,Math.max(5,q.r*.35),0,7);g.fill()});g.fillStyle='#f00';J.lips.forEach(q=>{g.beginPath();g.arc(q[0],q[1],5,0,7);g.fill()});
   const crop=[G.mx-G.rx,G.my-G.ry,G.rx*2,G.ry*2];sg.drawImage(c,crop[0],crop[1],crop[2],crop[3],cx,cy,TW,TH-10);sg.fillStyle='#000';sg.font='9px sans-serif';sg.fillText(f.slice(4,-5),cx+2,cy+TH-2);
   /* numeric: brow centre line vs the picture's own brow points, and lip anchor vs lip points */
   res.push({f,brow:J.brows.map(B=>B.c.length),mesh:!!J.mesh})}
  return{res,url:sh.toDataURL('image/jpeg',.8)}},[files,PAGE?+PAGE:0]);
 fs.writeFileSync(`${DIR}/sheet-${PAGE||'all'}.jpg`,Buffer.from(out.url.split(',')[1],'base64'));const bad=out.res.filter(r=>r.miss||r.noimg);console.log('n',out.res.length,'missing',bad.length,JSON.stringify(bad.slice(0,20)));await b.close()})();
