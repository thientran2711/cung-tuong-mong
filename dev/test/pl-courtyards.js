/* Phượng Lệnh courtyards (kitPalaceMap L2) for every Dư đồ place: matrix check + sample screenshots + image URL check.
   usage: node dev/test/pl-courtyards.js <url of built index.html> <W>x<H>@dpr <outdir> <tag> [full]
   - matrix: every place x month(12) x tuần(3) x buổi(4): kpmArt() must return a picture that is in KPM_DATA.have; festival days must
     give the festival state when PL has it (else the season x buổi state); prints which festival keys fell back per place.
   - samples: opens the courtyard for sample (place, month, tuần, buổi) and checks the <img> really loaded (naturalWidth>0).
   - 'full': also loads every distinct picture URL used (HEAD-like GET) and counts failures. */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG,FULL]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.pal=null;S.place='home';used=0;tab='go';window.__mapZ=1;render();setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});
 /* 1. matrix */
 const mx=await p.evaluate(()=>{const keys=["vuon","thu","dtd","tn","lc","ksp","nvp","home"],R={},bad=[],urls=new Set();const sv=[S.month,S.tuan,S.buoi];
  const FE={};
  for(const k of keys){const slot="p:"+k;const o={dir:null,states:new Set(),fest:{},noart:0,n:0};R[k]=o;
   for(let m=1;m<=12;m++)for(let t=0;t<3;t++)for(let bu=0;bu<4;bu++){S.month=m;S.tuan=t;S.buoi=bu;const A=kpmArt(slot);o.n++;
    if(!A){o.noart++;continue}o.dir=A.dir;const st=A.src.replace(/^.*img\/pl2\/(.+)\.webp$/,"$1").slice(A.dir.length+1);o.states.add(st);urls.add(A.src);
    if(!(KPM_DATA.have[A.dir]||[]).includes(st))bad.push([k,m,t,bu,st]);
    const f=festToday();if(f){const key=f.k;const fest=/^(newyear|giaothua|nguyentieu|thanhminh|doanngo|thattich|trungthu|trungcuu|dongchi|phoenix)-/.test(st);(o.fest[key]=o.fest[key]||{})[["sang","trua","chieu","toi"][bu]]=fest?st:"fallback:"+st}}
   o.states=[...o.states].sort().length}
  [S.month,S.tuan,S.buoi]=sv;return{R,bad,urls:[...urls],FESTKEYS:Object.keys(FEST)}});
 /* 2. samples */
 const SM=[["thu",1,0,0],["thu",5,0,0],["thu",3,0,0],["thu",12,2,3],["thu",7,1,3],["nvp",6,1,1],["nvp",1,0,1],["vuon",9,0,2],["vuon",8,1,3],["ksp",12,2,3],["tn",2,1,0],["dtd",10,1,3],["lc",4,2,2],["home",8,1,0]];
 const out=[];
 for(const [k,m,t,bu] of SM){const r=await p.evaluate(async([k,m,t,bu])=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.month=m;S.tuan=t;S.buoi=bu;S.place='home';window.__kpm=null;tab='go';window.__mapZ=1;render();
   const slot="p:"+k;kpmOpenSlot(slot,kpmKeyOf(slot));await new Promise(r=>setTimeout(r,800));const im=document.querySelector('#panel .kpmv .mapimg');
   if(im&&!im.complete)await new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,20000)});
   const f=festToday();return{k,m,t,bu,fest:f&&f.k,src:im&&im.src.replace(/^.*img\/pl2\//,''),w:im&&im.naturalWidth,spots:[...document.querySelectorAll('#panel .kpm-spot')].map(x=>x.textContent.trim().replace(/\s+/g,' ')),ox:document.documentElement.scrollWidth>innerWidth}},[k,m,t,bu]);
  out.push(r);await p.waitForTimeout(600);await p.screenshot({path:`${OUT}/${TAG}-${k}-${m}${t}${bu}.jpg`,type:'jpeg',quality:70,animations:'disabled'})}
 let urlfail=null;if(FULL){urlfail=await p.evaluate(async U=>{const bad=[];await Promise.all(U.map(u=>fetch(u,{method:'GET',headers:{Range:'bytes=0-255'}}).then(r=>{if(!(r.ok||r.status===206))bad.push([u,r.status])}).catch(e=>bad.push([u,String(e)]))));return bad},mx.urls)}
 console.log(JSON.stringify({TAG,matrix:mx.R,bad:mx.bad,FESTKEYS:mx.FESTKEYS,nUrls:mx.urls.length,urlfail,samples:out,errs}));await b.close()})();
