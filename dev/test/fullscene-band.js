/* review/makeup-set r4 (MAIN 148 25/11 ~23:39Z, law 12): a full-bleed scene (KIT 81b .km-full) covers the WHOLE screen on Fold + iPad: no dark band
   at the top or bottom. Scenes: the makeup result reveal (step-in + zoomed camera, jtoil toilReveal) and «Học thành tài» (jlevel kitLearn, KIT 81c picture).
   A band = a strip of the top / bottom 60 px that is near the overlay's dark colour (mean luminance < 40 and low spread).
   usage: node dev/test/fullscene-band.js <worktree|url> [WxH@dpr,...] [shotdir]   (exit 1 on a FAIL) */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,SIZES,DIR]=process.argv;
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;const rows=[];const ok=(n,c,x)=>{if(!c)bad++;console.log(`${c?'PASS':'FAIL'} ${n}${x!==undefined?' '+JSON.stringify(x).slice(0,300):''}`)};
/* the band test runs in the page on a canvas copy of the screenshot */
async function band(p,buf){return p.evaluate(async b64=>{const im=new Image();im.src="data:image/png;base64,"+b64;await im.decode();const c=document.createElement("canvas");c.width=im.width;c.height=im.height;const g=c.getContext("2d");g.drawImage(im,0,0);
 const sc=im.width/innerWidth,h=Math.round(60*sc);const st=y0=>{const d=g.getImageData(0,y0,im.width,h).data;let s=0,s2=0,n=0;for(let i=0;i<d.length;i+=16){const l=.299*d[i]+.587*d[i+1]+.114*d[i+2];s+=l;s2+=l*l;n++}const m=s/n;return{m:Math.round(m),sd:Math.round(Math.sqrt(Math.max(0,s2/n-m*m)))}};
 const t=st(0),bt=st(im.height-h);return{top:t,bot:bt,topBand:t.m<40&&t.sd<12,botBand:bt.m<40&&bt.sd<12}},buf.toString('base64'))}
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();if(DIR)fs.mkdirSync(DIR,{recursive:true});
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);console.log('== '+sz);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.evaluate(()=>{new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,#klife').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  const shot=async(n)=>{const buf=await p.screenshot({type:'png'});if(DIR)fs.writeFileSync(`${DIR}/${n}-${wh}.png`,buf);return band(p,buf)};
  /* 1. makeup reveal: step-in, then the zoomed camera with the result card */
  await p.evaluate(()=>{S.buoi=0;delete S.toilette;toilOpen();TOIL.st.dv="hopdip";toilColUI();S.toilette={day:toilWk()*10,wk:toilWk(),score:95,makeup:true,col:toilColFix(TOIL.st.col),look:"tuyet"};toilReveal({look:"tuyet",made:true,good:true,pre:"Sương mai",manual:true},()=>{})});
  await p.evaluate(async()=>{const i=new Image();i.src=IMG_U("img/toil-mirror-room.webp");try{await i.decode()}catch(e){}});await sleep(2500);let r=await shot('reveal-in');ok(`reveal step-in: no band`,!r.topBand&&!r.botBand,r);
  await p.evaluate(()=>{TOIL_REV.zoom()});await sleep(2500);r=await shot('reveal-zoom');ok(`reveal zoom: no band`,!r.topBand&&!r.botBand,r);
  await p.evaluate(()=>{try{TOIL_REV.close()}catch(e){}try{kg82Close()}catch(e){}});await sleep(800);
  /* 2. «Học thành tài» (kitLearn): a subject level-up */
  await p.evaluate(()=>{try{kmReset&&kmReset()}catch(e){}const k="cam";kitLearn({kind:"art",k,from:1,to:2})});await sleep(2500);
  const has=await p.evaluate(()=>!!document.getElementById('klearnov'));if(has){r=await shot('learn');ok(`Học thành tài: no band`,!r.topBand&&!r.botBand,r)}else ok('Học thành tài opened',false);
  await ctx.close()}
 await b.close();if(SV)SV.close();console.log(bad?`FAIL ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
