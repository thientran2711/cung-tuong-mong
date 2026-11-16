/* kit-fit round 3 — (1) Luân hồi origin cards span the background width; (2) face picker has no tabs, face set chosen by the game.
   usage: node dev/test/kit-fit3.js <url> <outdir> [WxH,...]   shots go to <outdir> (scratch, never git); prints measurements + violations.
   CDN pictures cached under <outdir>/cdn. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,PURL,OUT,SZS]=process.argv;const SIZES=(SZS||'1180x820,1366x1024,755x1000,412x1058,390x844').split(',');fs.mkdirSync(OUT+'/cdn',{recursive:true});
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let bad=0;
 for(const SZ of SIZES){const [W,H]=SZ.split('x').map(Number);
  for(const mode of ['solo','maid']){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\/.*\.webp/,async rt=>{const u=new URL(rt.request().url());const f=OUT+'/cdn/'+u.pathname.replace(/\//g,'_');
   if(fs.existsSync(f))return rt.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'image/webp','access-control-allow-origin':'*'}});
   for(let i=0;i<4;i++){try{const r=await rt.fetch();const bd=await r.body();if(r.status()===200){fs.writeFileSync(f,bd);return rt.fulfill({response:r,body:bd})}}catch(e){}await sleep(500)}return rt.abort()});
  await ctx.route('**/*',rt=>{if(rt.request().headers()['x-ctm-load'])return rt.abort();return rt.fallback()});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PURL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await sleep(2500);
  await p.evaluate(m=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
    if(m==='maid'){window.ow69Pick=()=>'cnv';try{ow69Pick=()=>'cnv'}catch(e){}}start()},mode);
  for(let i=0;i<60;i++){if(await p.evaluate(()=>!!document.querySelector('#kroul .krgrid'))){break}await sleep(500)}
  await sleep(800);
  const m1=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return{l:Math.round(r.left),t:Math.round(r.top),r:Math.round(r.right),b:Math.round(r.bottom),w:Math.round(r.width),h:Math.round(r.height)}};
   const g=document.querySelector('#kroul .krgrid');if(!g)return null;const ts=[...g.querySelectorAll('.krt')].map(R);const hd=R(document.querySelector('#kroul .krhead')),bar=R(document.querySelector('#kroul .krbar'));
   const gr=R(g);const gx=new Set(),gy=new Set();ts.forEach((t,i)=>{});const xs=[...new Set(ts.map(t=>t.l))].sort((a,b)=>a-b),ys=[...new Set(ts.map(t=>t.t))].sort((a,b)=>a-b);
   const colGap=xs.length>1?xs.slice(1).map((x,i)=>x-ts.find(t=>t.l===xs[i]).r):[];const rowGap=ys.length>1?ys.slice(1).map((y,i)=>y-ts.find(t=>t.t===ys[i]).b):[];
   const f=document.querySelector('#kroul .krt .krf');const fs=getComputedStyle(document.querySelector('#kroul .krn'));
   return{n:ts.length,card:ts[0],cols:xs.length,rows:ys.length,grid:gr,head:hd,bar,colGap,rowGap,sideL:Math.min(...ts.map(t=>t.l)),sideR:innerWidth-Math.max(...ts.map(t=>t.r)),fontPx:fs.fontSize,
    ph:document.documentElement.scrollWidth>innerWidth,over:ts.some(t=>t.r>innerWidth||t.l<0||t.b>innerHeight)||bar.b>innerHeight||hd.t<0,hidden:getComputedStyle(document.querySelector('#kroul')).overflow}});
  console.log(SZ,mode,'luanhoi',JSON.stringify(m1));
  await p.screenshot({path:`${OUT}/${mode}-roul0-${SZ}.png`});
  if(m1&&(m1.over||m1.ph)){bad++;console.log('VIOLATION luanhoi overflow',SZ)}
  /* shuffle + pick step shot */
  await p.evaluate(()=>document.querySelector('#kroul .krgo').click());await sleep(3500);
  await p.screenshot({path:`${OUT}/${mode}-roul2-${SZ}.png`});
  await p.evaluate(()=>{const t=document.querySelector('#kroul .krt');t&&t.click()});await sleep(2600);
  await p.screenshot({path:`${OUT}/${mode}-roul3-${SZ}.png`});
  await p.evaluate(()=>document.querySelector('#kroul .krgo').click());
  for(let i=0;i<30;i++){if(await p.evaluate(()=>!document.getElementById('kroul')&&!!document.querySelector('#modal .kpick')))break;await sleep(500)}
  await sleep(2500);
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await sleep(1200);
  await p.screenshot({path:`${OUT}/${mode}-idcard-${SZ}.png`});
  const idn=await p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return[Math.round(r.top),Math.round(r.bottom),Math.round(r.height)]};const sc=document.querySelector('#modal .kpscroll')||document.querySelector('#mb');const n=document.querySelector('#modal .kpidn');const a=document.querySelector('#modal .kpidart');const d=document.querySelector('#modal .dlg');return{name:R(n),art:R(a),scroll:R(sc),dlg:R(d),vh:innerHeight,nameVisible:!!n&&n.getBoundingClientRect().top>=(sc?sc.getBoundingClientRect().top-1:0)&&n.getBoundingClientRect().bottom<=(sc?sc.getBoundingClientRect().bottom+1:innerHeight)-26}});console.log(SZ,mode,'idn',JSON.stringify(idn));if(!idn.nameVisible){bad++;console.log('VIOLATION name+age line clipped',SZ)}
  const m2=await p.evaluate(()=>{const k=document.querySelector('#modal .kpick');if(!k)return null;const R=e=>{const r=e.getBoundingClientRect();return[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
   const items=[...k.querySelectorAll('.kpki')];return{tabs:k.querySelectorAll('[data-pkf]').length,tabbar:!!k.querySelector('.kpktabs,.kpkf'),total:items.length,scope:kitFaceScope(),origin:S.origin&&S.origin.k,srv:isSrv(),kids:[...k.children].map(c=>c.className),
    maidN:items.filter(i=>/maid:/.test(i.dataset.pk)).length,consN:items.filter(i=>/consort:/.test(i.dataset.pk)).length,pages:k.__kpc&&k.__kpc.pages,rect:R(k),txt:(k.querySelector('.kpkh,.kpkt')||{}).textContent}});
  console.log(SZ,mode,'face',JSON.stringify(m2));
  if(m2&&(m2.tabs||m2.tabbar)){bad++;console.log('VIOLATION face tabs',SZ)}
  await p.evaluate(()=>{const k=document.querySelector('#modal .kpick');k&&k.scrollIntoView({block:'center',behavior:'instant'})});await sleep(1500);
  await p.screenshot({path:`${OUT}/${mode}-face-${SZ}.png`});
  if(errs.length){bad++;console.log('PAGE ERRORS',errs)}
  await ctx.close();if(process.env.ONLYSOLO)break}}
 console.log('violations',bad);await b.close()})();
