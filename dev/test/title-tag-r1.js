/* review/title-tag-r1: (a) rank/name text-shadow scan over every place that prints rank: PAPER = no shadow, PAINTING = glow; (b) glow-aware contrast of stage tag text vs the painted background with the glow (text made transparent, shadow kept), day + night.
   usage: node dev/test/title-tag-r1.js <url> <outdir> [WxH@dpr] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const [wh,d]=(SZ||'1180x820@2').split('@');const [W,H]=wh.split('x').map(Number);const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(200000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;document.getElementById('modal').hidden=true;deal&&deal();render()});await sleep(1500);
 await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});
 const SCAN=()=>{const SEL=['.krt','.knr>.knr-r','.knr>.knr-n','.stage .tag .j59t','.stage .tag .j59n','.kpsn .kname .kti','.kpsn .kname','.pc .pcl .pcrk','.pc .pcl .pcname','.kpstrip .kpsn small','.kbk-pname .kname .kti','.kpod-plq .kname .kti','.kname .kti','.krn'];const out={};
  for(const s of SEL)for(const e of document.querySelectorAll(s)){if(!(e.offsetParent||e.getClientRects().length))continue;const r=e.getBoundingClientRect();if(r.width<2)continue;const cs=getComputedStyle(e);const ts=cs.textShadow;
   const onP=!!e.closest('.stage,.kesov,.krs,#stage');const k=s+'|'+(onP?'PAINT':'PAPER')+'|'+(ts==='none'?'none':'shadow');out[k]=(out[k]||0)+1}return out};
 const R={};R.home=await p.evaluate(SCAN);
 for(const tab of ['hc','hau','duyet','danh','hanhsu']){}
 // open a few UI places: person pop-up / lists via existing kit page + tabs
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button,.tabs button,nav button')].map(b=>b.textContent.trim()).slice(0,12));R.tabs=tabs;
 for(let i=0;i<tabs.length;i++){await p.evaluate(i=>{const bs=[...document.querySelectorAll('#tabs button,.tabs button,nav button')];bs[i]&&bs[i].click()},i);await sleep(900);R['tab:'+tabs[i]]=await p.evaluate(SCAN);await p.evaluate(()=>{const m=document.getElementById('modal');if(m)m.hidden=true})}
 await p.evaluate(()=>{const bs=[...document.querySelectorAll('#tabs button,.tabs button,nav button')];bs[0]&&bs[0].click()});
 // contrast: day+night stage, glow-aware
 const res=[];for(const bu of [0,3]){await p.evaluate(bu=>{S.place='home';S.buoi=bu;Q.length=0;document.getElementById('modal').hidden=true;render()},bu);await sleep(1800);
  const tags=await p.evaluate(()=>[...document.querySelectorAll('#stage .tag')].filter(g=>g.offsetParent).flatMap(g=>[...g.querySelectorAll('.j59t,.j59n')].map(e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return{mine:g.classList.contains('j59mine'),line:e.classList.contains('j59t')?'rank':'name',txt:e.textContent,x:r.left,y:r.top,w:r.width,h:r.height,col:cs.color,ts:cs.textShadow.slice(0,60)}})));
  await p.addStyleTag({content:'.j59t,.j59n{color:transparent!important}'}).then(h=>h.evaluate(e=>e.id='tr'+Date.now()));
  await p.screenshot({path:`${OUT}/g${bu}.png`});await p.evaluate(()=>document.querySelectorAll('style').forEach(s=>{if(/color:transparent!important/.test(s.textContent)&&s.textContent.length<60)s.remove()}));
  await p.screenshot({path:`${OUT}/v${bu}.jpg`,type:'jpeg',quality:70});res.push({bu,tags})}
 fs.writeFileSync(`${OUT}/r.json`,JSON.stringify({R,res,errs},null,1));console.log(JSON.stringify({errs}));console.log(JSON.stringify(R,null,0).slice(0,6000));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
