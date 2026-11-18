/* DOAN TRANG BLUSH STEPS (toil-looks5, owner 17/11 ~21:40Z: Doan trang blush LOWER). 5 rows = Doan trang (look vua) at 100/80/60/40/20 % of today's VISIBLE blush (mean R-G over the cheek centres minus the bare face, calibrated like toil-blush-room.js), each row also Kieu diem + Khuynh thanh at the shipped BAL.toil.blush. Full figure in her room, her pinned face.
   usage: node toil-doan-steps.js <url> <out.png> [WxH@dpr]  (env FACE, GSEED, DUMP) */
/* BLUSH-STEP ROOM SHEET (toil-looks9, owner 17/11 ~21:15Z real: show each look as the FULL FIGURE in her ROOM, not square face crops).
   3 rows (Hien nay v18 / Giua +20,+10 / Rat nhe +2,+2) x 5 cols (Vung A | Vung B | Doan trang | Kieu diem | Khuynh thanh); every cell = the real game stage crop (same crop everywhere)
   + one close-up (head-and-shoulders crop of the same stage render) band per row. Based on toil-blush-steps.js (BLUSH-STEP PICK SHEET (owner 17/11 ~21:15Z): 9 numbered rows = every combo of step A (Doan trang -> Kieu diem) x step B (Kieu diem -> Khuynh thanh),
   each +1/+2/+3 % of the VISIBLE blush colour (mean R-G over the two cheek centres, minus the same spot bare-faced), Doan trang = base as now.
   Cells per row: Vung A | Vung B (diem dua, v18) | Doan trang | Kieu diem | Khuynh thanh. HER face is PINNED to one picture file in every row (env FACE, default c11-tcold-a18)
   and the LOCAL fit (dev/art/toil-fit2.json + dev/art/mkfit/*.json) is injected. The strengths (TOIL_MKS.dep.bl / tuyet.bl) are CALIBRATED by measurement: the bl value is solved
   from a curve of measured R-G vs bl (LOD boost + alpha cap make the two non-linear), then the final cells are measured again and printed.
   usage: node toil-blush-steps.js <http://host:port/index.html> <out.png> [WxH@dpr = 755x1000@2]  (serve the built site: python3 -m http.server)  env: FACE, GSEED, DUMP */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,URL,OUT,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');
const ROOT=process.env.ART||path.join(process.cwd(),'dev','art');
const FACE=process.env.FACE||'c11-tcold-a18';
const ROWS=[{n:'giua',lab:'Giữa',A:20,B:10},{n:'nhe',lab:'Rất nhẹ',A:2,B:2}];
const SC={x:62,y:223,width:288,height:689},HC={x:112,y:228,width:200,height:150};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof toilMakeup==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const fit2=JSON.parse(fs.readFileSync(path.join(ROOT,'toil-fit2.json'),'utf8'));const mk={};for(const f of fs.readdirSync(path.join(ROOT,'mkfit')))if(f.endsWith('.json'))mk[f.slice(0,-5)]=JSON.parse(fs.readFileSync(path.join(ROOT,'mkfit',f),'utf8'));
 await p.evaluate(([seed,FACE])=>{let x=seed;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});
  /* PIN her face: every picture of her (figure + portrait) is the same consort/age file in every cell and every row */
  const f0=figFor;window.figFor=function(){const s=f0.apply(this,arguments);return typeof s==='string'?s.replace(/consort-c\d+-t[a-z0-9]+-a\d+/,'consort-'+FACE):s};start()},[+(process.env.GSEED||4),FACE]);
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await p.waitForTimeout(3000);
 await p.evaluate(([fit2,mk])=>{TOIL_FIT.fit=fit2;for(const g in mk){MK_FIT.g[g]=mk[g];MK_FIT.ld[g]=1}},[fit2,mk]);
 await p.addStyleTag({content:'.kpets,.petal,[class*=petal]{display:none!important}'});/* falling petals can cover a cheek in a cell; hidden for the sample only */
 const seeds=await p.evaluate(()=>{let a=0,b=0;for(let s=1;s<400&&!(a&&b);s++){const t=toilVungB({seed:s});if(t&&!b)b=s;if(!t&&!a)a=s}return{sA:a,sB:b}});
 const q=await ctx.newPage();/* pixel reader */await q.setContent('<canvas id=c></canvas>');
 const meanRG=async(b64,pts,rad)=>q.evaluate(async([b64,pts,rad])=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();const c=document.getElementById('c');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);let s=0,n=0;for(const[x,y]of pts){const d=g.getImageData(Math.max(0,Math.round(x-rad)),Math.max(0,Math.round(y-rad)),Math.round(rad*2),Math.round(rad*2)).data;for(let i=0;i<d.length;i+=4){s+=d[i]-d[i+1];n++}}return s/n},[b64,pts,rad]);
 let REL=null,CH=null;
 const shot=async(look,seed,bl)=>{/* render one look on her pinned face; bl = {dep,tuyet} override of the blush colour strength (calibration) */
  await p.evaluate(([look,seed,bl])=>{Q.length=0;try{closeModal()}catch(e){}for(const k in TOIL_MKC)delete TOIL_MKC[k];if(bl){if(bl.dep!=null)TOIL_MKS.dep.bl=bl.dep;if(bl.tuyet!=null)TOIL_MKS.tuyet.bl=bl.tuyet;if(bl.vua!=null)TOIL_MKS.vua.bl=bl.vua}const c=toilColFix(null);c.seed=seed;if(look)S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look,col:c};else S.toilette=null;TOIL.prev=null;try{toilMkPre()}catch(e){}render()},[look,seed,bl||null]);
  await p.waitForTimeout(3200);try{await p.evaluate(()=>toilLodPass())}catch(e){}await p.waitForTimeout(1200);{let last='',same=0;for(let i=0;i<40&&same<4;i++){const r=await p.evaluate(()=>{const f=document.querySelector('#mefig').getBoundingClientRect();return[f.x,f.y,f.width].map(v=>Math.round(v*10)).join()});if(r===last)same++;else{same=0;last=r}await p.waitForTimeout(250)}}
  const g=await p.evaluate(()=>{const f=document.querySelector('#mefig');const fr=f.getBoundingClientRect();const k=[...document.querySelectorAll('img.kmkc')].find(e=>e.getBoundingClientRect().width>0&&e.closest('#mefig, .kfxf'));const kr=(k||f).getBoundingClientRect();let cheek=null,file=null;try{file=k.dataset.mkk.split('|')[0];const row=toilRow(file);const pic=k.closest('.kfxf').__img.getBoundingClientRect();cheek=[[row[2],row[3]],[row[4],row[5]]].map(q=>[pic.left+q[0]/100*pic.width,pic.top+q[1]/100*pic.height])}catch(e){window.__cerr=String(e)}return{fig:{x:fr.left,y:fr.top,w:fr.width,h:fr.height},mk:{x:kr.left,y:kr.top,w:kr.width,h:kr.height},step:k?(k.dataset.mkk||'').split('|L')[1]||'0':'-',cheek,file,src:(document.querySelector('#mefig')||{}).src,cerr:window.__cerr,facePx:k?Math.round(kr.width/1.6):0}});
  if(g.cheek&&!REL){REL={mk:{x:(g.mk.x-g.fig.x)/g.fig.w,y:(g.mk.y-g.fig.y)/g.fig.w,w:g.mk.w/g.fig.w,h:g.mk.h/g.fig.w},ch:g.cheek.map(c=>[(c[0]-g.fig.x)/g.fig.w,(c[1]-g.fig.y)/g.fig.w])}}
  const W0=g.fig.w,hx=g.fig.x+REL.mk.x*W0,hy=g.fig.y+REL.mk.y*W0,hw=REL.mk.w*W0,hh=REL.mk.h*W0;const clip={x:Math.max(0,hx-hw*.15),y:Math.max(0,hy-hw*.15),width:hw*1.3,height:hh+hw*.3};
  g.cheek=REL.ch.map(c=>[g.fig.x+c[0]*W0,g.fig.y+c[1]*W0]);
  const buf=await p.screenshot({clip});const b64=buf.toString('base64');const pts=(g.cheek||[]).map(c=>[(c[0]-clip.x)*+m[3],(c[1]-clip.y)*+m[3]]);
  const rg=pts.length?await meanRG(b64,pts,5*+m[3]):null;const stB=(await p.screenshot({clip:SC})).toString('base64'),hdB=(await p.screenshot({clip:HC})).toString('base64');return{b64,g,rg,clip,stB,hdB}};
 /* bare face baseline */
 await shot('vua',7);const bare=await shot(null,7);const dt=await shot('vua',7);CH=dt.g.cheek;bare.g.file=dt.g.file;bare.g.cheek=CH;bare.g.step=dt.g.step;bare.g.facePx=dt.g.facePx;
 console.log('pinned',JSON.stringify({file:bare.g.file,src:bare.g.src,facePx:bare.g.facePx,step:bare.g.step,fitRow:bare.g.cheek}));
 const delta=r=>r.rg-bare.rg;if(process.env.DUMP){fs.mkdirSync(process.env.DUMP,{recursive:true});fs.writeFileSync(process.env.DUMP+'/bare.png',Buffer.from(bare.b64,'base64'));fs.writeFileSync(process.env.DUMP+'/dt.png',Buffer.from(dt.b64,'base64'));await p.screenshot({path:process.env.DUMP+'/full.png'});console.log('pts',JSON.stringify(dt.clip),JSON.stringify(CH))}
 const vA=await shot('vung',seeds.sA),vB=await shot('vung',seeds.sB);

 const BLS=[.03,.06,.09,.12,.15,.18,.21,.26,.31];const curve=[];const orig=await p.evaluate(()=>TOIL_MKS.vua.bl);
 const t0=await shot('vua',7,{vua:orig});curve.push([orig,delta(t0)]);for(const v of BLS){const r=await shot('vua',7,{vua:v});curve.push([v,delta(r)])}curve.sort((a,b)=>a[0]-b[0]);
 const D0=delta(t0);console.log('bare RG',bare.rg.toFixed(2),'today vua bl',orig,'delta',D0.toFixed(2));console.log('curve vua',JSON.stringify(curve.map(c=>[c[0],+c[1].toFixed(2)])));
 const inv=t=>{for(let i=0;i+1<curve.length;i++){const[a,da]=curve[i],[b2,db]=curve[i+1];if((da-t)*(db-t)<=0&&da!==db)return a+(b2-a)*(t-da)/(db-da)}return null};
 const kie=await shot('dep',7,null),khu=await shot('tuyet',7,null);
 const rows=[];for(const f of[1,.8,.6,.4,.2]){let bl=f===1?orig:inv(D0*f);if(bl==null){console.log('UNREACHABLE',f);continue}let r=f===1?t0:await shot('vua',7,{vua:bl});for(let it=0;it<3&&f<1&&Math.abs(delta(r)/D0-f)>.02;it++){const nb=bl+(D0*f-delta(r))*(bl/Math.max(delta(r),1));const r2=await shot('vua',7,{vua:nb});if(Math.abs(delta(r2)/D0-f)<Math.abs(delta(r)/D0-f)){r=r2;bl=nb}else break}rows.push({f,bl,r,d:delta(r)})}
 const out=rows.map(x=>({pct:Math.round(x.f*100),vuaBl:+x.bl.toFixed(4),rg:+x.d.toFixed(2),ratio:+(x.d/D0).toFixed(3)}));console.log(JSON.stringify({seeds,face:bare.g.file,errs,rows:out,kieuBl:await p.evaluate(()=>BAL.toil.blush),dKieu:+delta(kie).toFixed(2),dKhuynh:+delta(khu).toFixed(2)}));
 if(process.env.DUMP){fs.mkdirSync(process.env.DUMP,{recursive:true});fs.writeFileSync(process.env.DUMP+'/doan-rows.json',JSON.stringify(out,null,1))}
 await p.evaluate(()=>{for(const k in TOIL_MKC)delete TOIL_MKC[k]});
 const W=300;const stage=(b64,sub)=>`<div><div style="border:1px solid #c9a227;background:#fff;overflow:hidden"><img src="data:image/png;base64,${b64}" style="display:block;width:${W}px"></div><div style="text-align:center;font:600 13px sans-serif;color:#6e4d0e;padding:3px">${sub}</div></div>`;
 let html=`<body style="margin:0;background:#f4ead8;font:700 15px sans-serif;color:#6e4d0e"><div style="padding:10px 12px"><div style="display:grid;grid-template-columns:repeat(3,${W}px);gap:8px;text-align:center;font-size:20px;margin-bottom:6px"><div>Đoan trang</div><div>Kiều diễm</div><div>Khuynh thành</div></div>`;
 let n=0;for(const x of rows){n++;html+=`<div style="margin:16px 0 4px;font-size:26px;color:#3a2a08">${n} · ${Math.round(x.f*100)} %${x.f===1?' (hiện nay)':''}</div><div style="display:grid;grid-template-columns:repeat(3,${W}px);gap:8px">`+stage(x.r.stB,`R-G Δ ${x.d.toFixed(1)} · bl ${x.bl.toFixed(4)}`)+stage(kie.stB,`R-G Δ ${delta(kie).toFixed(1)}`)+stage(khu.stB,`R-G Δ ${delta(khu).toFixed(1)}`)+`</div>`}
 html+=`<div style="margin:22px 0 4px;font-size:20px;color:#3a2a08">Close-ups (same renders)</div>`;
 n=0;for(const x of rows){n++;html+=`<div style="margin:8px 0 3px;font-size:15px">close-up ${n} · ${Math.round(x.f*100)} %</div><div style="display:grid;grid-template-columns:repeat(3,${W}px);gap:8px">`+stage(x.r.hdB,'')+stage(kie.hdB,'')+stage(khu.hdB,'')+`</div>`}
 html+=`</div></body>`;await q.setContent(html);await q.setViewportSize({width:1000,height:900});await q.waitForTimeout(1200);await q.screenshot({path:OUT,fullPage:true});console.log('done',JSON.stringify({errs}));await b.close()})();
