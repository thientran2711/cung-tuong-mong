const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,OUT,MODE,PAIR]=process.argv;const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];
fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEW={20:'w/v2c20.png',2:'w/v2c02.png',8:'w/v2c08.png',14:'w/v2c14.png'};
(async()=>{const px=process.env.HTTPS_PROXY;
 const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const hits=[];
 const seen=[];const SET=['w/v2'+PAIR+'.png','w/v2'+PAIR+'.png'];
 const RT=/fig-consort-c(\d+)-[^/]*\.webp/;
 await ctx.route(RT,r=>{const u=r.request().url().split('/').pop();let i=seen.indexOf(u);if(i<0){seen.push(u);i=seen.length-1}hits.push(u+'->'+(i%2));return r.fulfill({body:fs.readFileSync(SET[i%2]),contentType:'image/png'})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;quiet=true;S.rank=5;S.prSeen={r:5,s:null};tab="act";used=0;goTo("home");render();quiet=false;render()});
 const p0=null;
 let clear=0;for(let k=0;k<60&&clear<3;k++){const st=await p.evaluate(()=>{const bt=[...document.querySelectorAll('button')].find(x=>/^(Ta biết rồi|Bỏ qua|Tiếp tục|Đã rõ)/.test(x.textContent.trim())&&x.offsetParent&&x.getBoundingClientRect().width>0);if(bt){bt.click();return 'btn'}const o=[...document.querySelectorAll('div,span,p')].find(e=>e.children.length===0&&/^Chạm để/.test(e.textContent.trim())&&e.offsetParent);if(o)return 'tap';return 'clear'});
  if(st==='tap')await p.mouse.click(W/2,H/2);clear=st==='clear'?clear+1:0;await sleep(1000)}
 const killed=await p.evaluate(()=>{let n=0;[...document.body.children].forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&e.getBoundingClientRect().width>innerWidth*0.8&&e.getBoundingClientRect().height>innerHeight*0.8&&!e.querySelector('#stage')&&e.id!=='stage'){e.remove();n++}});document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});Q.length=0;return n});console.log('killed',killed);await sleep(800);
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 for(let w=0;w<40;w++){const ok=await p.evaluate(()=>{const im=[...document.querySelectorAll('img')].filter(i=>/fig-consort/.test(i.src)||i.id==='mefig');return im.length>0&&im.every(i=>i.complete&&i.naturalWidth>0)});if(ok)break;await sleep(1000)}
 await sleep(1500);
 const shot=async n=>{await p.screenshot({path:`${OUT}/${n}-${PAIR}-${W}x${H}.png`})};
 const closeDlg=async()=>{await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='✕'||x.getAttribute('aria-label')==='Đóng');if(b)b.click()});await sleep(1000)};
 await shot('A-new-big');await shot('B-new-stage');
 await ctx.unroute(RT);
 await p.evaluate(()=>{document.querySelectorAll('img').forEach(i=>{if(/fig-consort/.test(i.src)||i.id==='mefig'){i.src=i.src.split('?')[0]+'?old=1'}})});
 for(let w=0;w<40;w++){const ok=await p.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>/fig-consort/.test(i.src)).every(i=>i.complete&&i.naturalWidth>0));if(ok)break;await sleep(1000)}
 await sleep(1500);await shot('C-old-stage');
 const meh=await p.evaluate(()=>{const e=document.getElementById('mefig');return e?[e.src.split('/').pop(),Math.round(e.getBoundingClientRect().height)]:null});
 console.log(JSON.stringify({meh,hits:hits.length}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
