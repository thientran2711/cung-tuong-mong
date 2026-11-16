/* proof.js <url> <WxH@dpr> <outdir> <BEFOREDIR> <AFTERDIR> nameA1,nameA2 nameB1,nameB2 ...
   Her room stage (Ngọc Thanh các, home, household filled). For each pair: her figure (#mefig) = name1, the first stage figure = name2,
   once with the files of BEFOREDIR/img (the rosy CDN copies) and once with AFTERDIR/img (the unrosied files), same layout.
   Shots <outdir>/<i>-before.jpg / <i>-after.jpg (stage only). Prints {errs}. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,VP,OUT,BEF,AFT,...PAIRS]=process.argv;const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];const sleep=t=>new Promise(r=>setTimeout(r,t));
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 await ctx.route(/\/img\/(hd\/)?(fig|por)-[^/?]+\.webp(\?.*)?$/,r=>{const u=new URL(r.request().url());const k=decodeURIComponent(u.pathname).replace(/^.*?\/img\//,'img/');
  const src=u.searchParams.get('m')==='before'?BEF:u.searchParams.get('m')==='after'?AFT:null;const f=src&&path.join(src,k);
  if(f&&fs.existsSync(f))return r.fulfill({status:200,contentType:'image/webp',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(f)});return r.continue()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(PAGE,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important} .kmov{display:none!important}'});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
  quiet=true;S.rank=5;S.prSeen={r:5,s:null};S.bac=300;fillStaff(S,true);S.buoi=0;used=0;tab="act";goTo("home");render();quiet=false;render()});
 await sleep(4000);
 const room=await p.evaluate(()=>(document.getElementById('sc-t')||{}).innerText||'');
 let i=0;for(const pr of PAIRS){i++;const N=pr.split(',');
  for(const mode of (i===1?['after','before','after']:['before','after'])){
   await p.evaluate(([N,mode])=>{const C=IMG_BASE||'';const set=(im,n)=>{if(!im)return;im.removeAttribute('srcset');im.src=C+'img/'+n+'?m='+mode};
    set(document.getElementById('mefig'),N[0]);const t=[...document.querySelectorAll('#tokens .tok img.figimg')].filter(x=>x.offsetParent!==null);if(N[1])set(t[0],N[1])},[N,mode]);
   for(let w=0;w<60;w++){const ok=await p.evaluate(()=>[...document.querySelectorAll('#mefig, #tokens img.figimg')].filter(x=>x.offsetParent!==null).every(x=>x.complete&&x.naturalWidth>0));if(ok)break;await sleep(300)}
   await sleep(900);const st=await p.$('#stage');await st.screenshot({path:`${OUT}/${i}-${mode}.jpg`,type:'jpeg',quality:85});
   const R=await p.evaluate(()=>{const s=document.getElementById('stage').getBoundingClientRect();return [...document.querySelectorAll('#mefig, #tokens img.figimg')].filter(x=>x.offsetParent!==null).map(x=>{const r=x.getBoundingClientRect();return [r.left-s.left,r.top-s.top,r.width,r.height]})});
   fs.writeFileSync(`${OUT}/${i}-${mode}.json`,JSON.stringify(R))}}
 console.log(JSON.stringify({room,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
