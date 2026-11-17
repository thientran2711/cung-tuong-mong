/* BLUSH-STEP PICK SHEET (owner 17/11 ~21:15Z): 9 numbered rows = every combo of step A (Doan trang -> Kieu diem) x step B (Kieu diem -> Khuynh thanh),
   each +1/+2/+3 % of the VISIBLE blush colour (mean R-G over the two cheek centres, minus the same spot bare-faced), Doan trang = base as now.
   Cells per row: Vung A | Vung B (diem dua, v18) | Doan trang | Kieu diem | Khuynh thanh. HER face is PINNED to one picture file in every row (env FACE, default c11-tcold-a18)
   and the LOCAL fit (dev/art/toil-fit2.json + dev/art/mkfit/*.json) is injected. The strengths (TOIL_MKS.dep.bl / tuyet.bl) are CALIBRATED by measurement: the bl value is solved
   from a curve of measured R-G vs bl (LOD boost + alpha cap make the two non-linear), then the final cells are measured again and printed.
   usage: node toil-blush-steps.js <http://host:port/index.html> <out.png> [WxH@dpr = 755x1000@2]  (serve the built site: python3 -m http.server)  env: FACE, GSEED, DUMP */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,URL,OUT,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');
const ROOT=process.env.ART||path.join(process.cwd(),'dev','art');
const FACE=process.env.FACE||'c11-tcold-a18';
const STEPS=[1,2,3];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof toilMakeup==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const fit2=JSON.parse(fs.readFileSync(path.join(ROOT,'toil-fit2.json'),'utf8'));const mk={};for(const f of fs.readdirSync(path.join(ROOT,'mkfit')))if(f.endsWith('.json'))mk[f.slice(0,-5)]=JSON.parse(fs.readFileSync(path.join(ROOT,'mkfit',f),'utf8'));
 await p.evaluate(([seed,FACE])=>{let x=seed;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});
  /* PIN her face: every picture of her (figure + portrait) is the same consort/age file in every cell and every row */
  const f0=figFor;window.figFor=function(){const s=f0.apply(this,arguments);return typeof s==='string'?s.replace(/consort-c\d+-t[a-z0-9]+-a\d+/,'consort-'+FACE):s};start()},[+(process.env.GSEED||4),FACE]);
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await p.waitForTimeout(3000);
 await p.evaluate(([fit2,mk])=>{TOIL_FIT.fit=fit2;for(const g in mk){MK_FIT.g[g]=mk[g];MK_FIT.ld[g]=1}},[fit2,mk]);
 const seeds=await p.evaluate(()=>{let a=0,b=0;for(let s=1;s<400&&!(a&&b);s++){const t=toilVungB({seed:s});if(t&&!b)b=s;if(!t&&!a)a=s}return{sA:a,sB:b}});
 const q=await ctx.newPage();/* pixel reader */await q.setContent('<canvas id=c></canvas>');
 const meanRG=async(b64,pts,rad)=>q.evaluate(async([b64,pts,rad])=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();const c=document.getElementById('c');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);let s=0,n=0;for(const[x,y]of pts){const d=g.getImageData(Math.max(0,Math.round(x-rad)),Math.max(0,Math.round(y-rad)),Math.round(rad*2),Math.round(rad*2)).data;for(let i=0;i<d.length;i+=4){s+=d[i]-d[i+1];n++}}return s/n},[b64,pts,rad]);
 let REL=null,CH=null;
 const shot=async(look,seed,bl)=>{/* render one look on her pinned face; bl = {dep,tuyet} override of the blush colour strength (calibration) */
  await p.evaluate(([look,seed,bl])=>{Q.length=0;try{closeModal()}catch(e){}for(const k in TOIL_MKC)delete TOIL_MKC[k];if(bl){if(bl.dep!=null)TOIL_MKS.dep.bl=bl.dep;if(bl.tuyet!=null)TOIL_MKS.tuyet.bl=bl.tuyet}const c=toilColFix(null);c.seed=seed;if(look)S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look,col:c};else S.toilette=null;TOIL.prev=null;try{toilMkPre()}catch(e){}render()},[look,seed,bl||null]);
  await p.waitForTimeout(3200);try{await p.evaluate(()=>toilLodPass())}catch(e){}await p.waitForTimeout(1200);{let last='',same=0;for(let i=0;i<40&&same<4;i++){const r=await p.evaluate(()=>{const f=document.querySelector('#mefig').getBoundingClientRect();return[f.x,f.y,f.width].map(v=>Math.round(v*10)).join()});if(r===last)same++;else{same=0;last=r}await p.waitForTimeout(250)}}
  const g=await p.evaluate(()=>{const f=document.querySelector('#mefig');const fr=f.getBoundingClientRect();const k=[...document.querySelectorAll('img.kmkc')].find(e=>e.getBoundingClientRect().width>0&&e.closest('#mefig, .kfxf'));const kr=(k||f).getBoundingClientRect();let cheek=null,file=null;try{file=k.dataset.mkk.split('|')[0];const row=toilRow(file);const pic=k.closest('.kfxf').__img.getBoundingClientRect();cheek=[[row[2],row[3]],[row[4],row[5]]].map(q=>[pic.left+q[0]/100*pic.width,pic.top+q[1]/100*pic.height])}catch(e){window.__cerr=String(e)}return{fig:{x:fr.left,y:fr.top,w:fr.width,h:fr.height},mk:{x:kr.left,y:kr.top,w:kr.width,h:kr.height},step:k?(k.dataset.mkk||'').split('|L')[1]||'0':'-',cheek,file,src:(document.querySelector('#mefig')||{}).src,cerr:window.__cerr,facePx:k?Math.round(kr.width/1.6):0}});
  if(g.cheek&&!REL){REL={mk:{x:(g.mk.x-g.fig.x)/g.fig.w,y:(g.mk.y-g.fig.y)/g.fig.w,w:g.mk.w/g.fig.w,h:g.mk.h/g.fig.w},ch:g.cheek.map(c=>[(c[0]-g.fig.x)/g.fig.w,(c[1]-g.fig.y)/g.fig.w])}}
  const W0=g.fig.w,hx=g.fig.x+REL.mk.x*W0,hy=g.fig.y+REL.mk.y*W0,hw=REL.mk.w*W0,hh=REL.mk.h*W0;const clip={x:Math.max(0,hx-hw*.15),y:Math.max(0,hy-hw*.15),width:hw*1.3,height:hh+hw*.3};
  g.cheek=REL.ch.map(c=>[g.fig.x+c[0]*W0,g.fig.y+c[1]*W0]);
  const buf=await p.screenshot({clip});const b64=buf.toString('base64');const pts=(g.cheek||[]).map(c=>[(c[0]-clip.x)*+m[3],(c[1]-clip.y)*+m[3]]);
  const rg=pts.length?await meanRG(b64,pts,5*+m[3]):null;return{b64,g,rg,clip}};
 /* bare face baseline */
 await shot('vua',7);const bare=await shot(null,7);const dt=await shot('vua',7);CH=dt.g.cheek;bare.g.file=dt.g.file;bare.g.cheek=CH;bare.g.step=dt.g.step;bare.g.facePx=dt.g.facePx;
 console.log('pinned',JSON.stringify({file:bare.g.file,src:bare.g.src,facePx:bare.g.facePx,step:bare.g.step,fitRow:bare.g.cheek}));
 const delta=r=>r.rg-bare.rg;if(process.env.DUMP){fs.mkdirSync(process.env.DUMP,{recursive:true});fs.writeFileSync(process.env.DUMP+'/bare.png',Buffer.from(bare.b64,'base64'));fs.writeFileSync(process.env.DUMP+'/dt.png',Buffer.from(dt.b64,'base64'));await p.screenshot({path:process.env.DUMP+'/full.png'});console.log('pts',JSON.stringify(dt.clip),JSON.stringify(CH))}
 const vA=await shot('vung',seeds.sA),vB=await shot('vung',seeds.sB);
 /* calibration curves: measured delta vs bl for Kieu diem (dep) and Khuynh thanh (tuyet) */
 const BLS=[.1,.16,.21,.26,.31,.36,.42,.5,.62,.8];const curve={dep:[],tuyet:[]};const orig={dep:null,tuyet:null};orig.dep=await p.evaluate(()=>TOIL_MKS.dep.bl);orig.tuyet=await p.evaluate(()=>TOIL_MKS.tuyet.bl);
 const today={};for(const k of['dep','tuyet']){const r=await shot(k,7,{[k]:orig[k]});today[k]=r;curve[k].push([orig[k],delta(r)])}
 for(const k of['dep','tuyet'])for(const v of BLS){const r=await shot(k,7,{[k]:v});curve[k].push([v,delta(r)])}
 for(const k of['dep','tuyet'])curve[k].sort((a,b)=>a[0]-b[0]);
 const inv=(k,target)=>{const c=curve[k];for(let i=0;i+1<c.length;i++){const[a,da]=c[i],[b2,db]=c[i+1];if((da-target)*(db-target)<=0&&da!==db)return a+(b2-a)*(target-da)/(db-da)}return null};
 const D0=delta(dt);console.log('Doan trang delta',D0.toFixed(2),'today Kieu',delta(today.dep).toFixed(2),'Khuynh',delta(today.tuyet).toFixed(2),'bare RG',bare.rg.toFixed(2));console.log('curve dep',JSON.stringify(curve.dep.map(c=>[c[0],+c[1].toFixed(2)])));console.log('curve tuyet',JSON.stringify(curve.tuyet.map(c=>[c[0],+c[1].toFixed(2)])));
 const rows=[];let n=0;const todayRow={n:'ref',A:null,B:null,dep:today.dep,tuyet:today.tuyet,blDep:orig.dep,blTuy:orig.tuyet};rows.push(todayRow);
 for(const A of STEPS)for(const B of STEPS){n++;const tD=D0*(1+A/100),tT=tD*(1+B/100);const bD=inv('dep',tD),bT=inv('tuyet',tT);if(bD==null||bT==null){console.log('UNREACHABLE',A,B,tD,tT,bD,bT);rows.push({n,A,B,fail:1});continue}
  let bd=bD,d=await shot('dep',7,{dep:bd});for(let it=0;it<3&&Math.abs((delta(d)/D0-1)*100-A)>.35;it++){const tt=tD+(tD-delta(d));const nb=inv('dep',tt);if(nb==null)break;const d2=await shot('dep',7,{dep:nb});if(Math.abs((delta(d2)/D0-1)*100-A)<Math.abs((delta(d)/D0-1)*100-A)){d=d2;bd=nb}else break}
  const tT2=delta(d)*(1+B/100);let bt=inv('tuyet',tT2)??bT,t=await shot('tuyet',7,{tuyet:bt});for(let it=0;it<3&&Math.abs((delta(t)/delta(d)-1)*100-B)>.35;it++){const tt=tT2+(tT2-delta(t));const nb=inv('tuyet',tt);if(nb==null)break;const t2=await shot('tuyet',7,{tuyet:nb});if(Math.abs((delta(t2)/delta(d)-1)*100-B)<Math.abs((delta(t)/delta(d)-1)*100-B)){t=t2;bt=nb}else break}
  rows.push({n,A,B,dep:d,tuyet:t,blDep:bd,blTuy:bt,tD,tT})}
 /* restore + verify measured steps */
 const out=[];for(const r of rows){if(r.fail)continue;const mA=(delta(r.dep)/D0-1)*100,mB=(delta(r.tuyet)/delta(r.dep)-1)*100;out.push({n:r.n,A:r.A,B:r.B,blDep:+r.blDep.toFixed(4),blTuy:+r.blTuy.toFixed(4),dDoan:+D0.toFixed(2),dKieu:+delta(r.dep).toFixed(2),dKhuynh:+delta(r.tuyet).toFixed(2),measA:+mA.toFixed(1),measB:+mB.toFixed(1),lodStep:r.dep.g.step})}
 console.log(JSON.stringify({seeds,face:bare.g.file,errs,rows:out},null,0));
 if(process.env.DUMP){fs.mkdirSync(process.env.DUMP,{recursive:true});fs.writeFileSync(process.env.DUMP+'/rows.json',JSON.stringify(out,null,1))}
 const cell=(r,label,sub)=>`<div><div style="border:1px solid #c9a227;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;height:240px"><img src="data:image/png;base64,${r.b64}" style="width:215px;image-rendering:auto"></div><div style="text-align:center;font:400 11px sans-serif;color:#6e4d0e">${sub||''}</div></div>`;
 const head=['Vụng A','Vụng B (diêm dúa)','Đoan trang','Kiều diễm','Khuynh thành'];
 let html=`<body style="margin:0;background:#f4ead8;font:700 15px sans-serif;color:#6e4d0e"><div style="padding:10px 12px"><div style="display:grid;grid-template-columns:repeat(5,230px);gap:8px;text-align:center;margin-bottom:6px">${head.map(h=>`<div>${h}</div>`).join('')}</div>`;
 for(const r of rows){if(r.fail)continue;const lab=r.n==='ref'?`ref · today (v18): Đoan→Kiều +${((delta(r.dep)/D0-1)*100).toFixed(0)} % · Kiều→Khuynh +${((delta(r.tuyet)/delta(r.dep)-1)*100).toFixed(0)} % (measured)`:`${r.n} · Đoan→Kiều +${r.A} % · Kiều→Khuynh +${r.B} %`;
  html+=`<div style="margin:12px 0 4px;font-size:17px;color:#3a2a08">${lab}</div><div style="display:grid;grid-template-columns:repeat(5,230px);gap:8px">`+cell(vA,'', '')+cell(vB,'','')+cell(dt,'',`R-G Δ ${D0.toFixed(1)}`)+cell(r.dep,'',`R-G Δ ${delta(r.dep).toFixed(1)} (${r.n==='ref'?'':'+'}${((delta(r.dep)/D0-1)*100).toFixed(1)} %)`)+cell(r.tuyet,'',`R-G Δ ${delta(r.tuyet).toFixed(1)} (${r.n==='ref'?'':'+'}${((delta(r.tuyet)/delta(r.dep)-1)*100).toFixed(1)} % over Kiều)`)+`</div>`}
 html+=`</div></body>`;await q.setContent(html);await q.setViewportSize({width:1230,height:900});await q.waitForTimeout(800);await q.screenshot({path:OUT,fullPage:true});console.log('done',JSON.stringify({errs}));await b.close()})();
