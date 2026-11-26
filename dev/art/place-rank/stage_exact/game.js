// Read-only measurement of the live game stage (no game code changed).
// node game.js W H OUT MODE   MODE=scan | shot:<placeKey>
const {chromium}=require('playwright');const fs=require('fs');
const [,,W,H,OUT,MODE]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const CDN='https://ctm-img.victoria-tntt.workers.dev/';
const ROOM=process.env.ROOM||'';  // local file to show as the stage picture
(async()=>{const px=process.env.HTTPS_PROXY;
 const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:1,hasTouch:true,isMobile:+W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 await ctx.route(/127\.0\.0\.1:8765\/img\//,async r=>{const u=r.request().url();const rel=u.split('127.0.0.1:8765/')[1];
   if(ROOM&&/ngu-hoa-vien[^/]*\.webp/.test(u)){return r.fulfill({body:fs.readFileSync(ROOM),contentType:'image/webp'})}
   if(/unknown-fig/.test(u)){const res=await ctx.request.get(CDN+'img/fig-consort-c06-t1-a18.webp');return r.fulfill({body:await res.body(),contentType:'image/webp'})}
   if(fs.existsSync(rel))return r.fulfill({body:fs.readFileSync(rel)});
   try{const res=await ctx.request.get(CDN+rel);return r.fulfill({status:res.status(),body:await res.body(),headers:{'content-type':res.headers()['content-type']||'image/webp'}})}catch(e){return r.abort()}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto('http://127.0.0.1:8765/index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<200;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1000);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;quiet=true;S.rank=5;S.prSeen={r:5,s:null};tab="act";used=0;goTo("home");render();quiet=false;render()});
 let clear=0;for(let k=0;k<40&&clear<3;k++){const st=await p.evaluate(()=>{const bt=[...document.querySelectorAll('button')].find(x=>/^(Ta biết rồi|Bỏ qua|Tiếp tục|Đã rõ)/.test(x.textContent.trim())&&x.offsetParent);if(bt){bt.click();return 'btn'}const o=[...document.querySelectorAll('div,span,p')].find(e=>e.children.length===0&&/^Chạm để/.test(e.textContent.trim())&&e.offsetParent);if(o)return 'tap';return 'clear'});
  if(st==='tap')await p.mouse.click(+W/2,+H/2);clear=st==='clear'?clear+1:0;await sleep(700)}
 await p.evaluate(()=>{[...document.body.children].forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&e.getBoundingClientRect().width>innerWidth*0.8&&e.getBoundingClientRect().height>innerHeight*0.8&&!e.querySelector('#stage')&&e.id!=='stage')e.remove()});document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}});Q.length=0});
 const measure=()=>p.evaluate(()=>{const st=document.getElementById('stage');const R=st.getBoundingClientRect();
   const bg=document.getElementById('scimg');const cs=getComputedStyle(bg);
   const figs=[...document.querySelectorAll('#tokens .tok.fig .figimg,#mefig')].filter(i=>i.offsetParent).map(i=>{const r=i.getBoundingClientRect();const bb=(window.J59BB||{})[i.getAttribute('src')]||{t:0,b:1};
     return {src:i.getAttribute('src').split('/').pop(),left:r.left-R.left,top:r.top-R.top,w:r.width,h:r.height,visTop:r.top-R.top+bb.t*r.height,feet:r.top-R.top+bb.b*r.height}});
   const tk=document.getElementById('tokens');return {fo:tk&&tk.style.bottom,strip:tk&&tk.classList.contains('j59strip'),bbs:Object.fromEntries(Object.entries(window.J59BB||{}).filter(([k])=>/unknown/.test(k))),place:S.place,stage:{w:R.width,h:R.height,x:R.left,y:R.top},bgimg:bg.style.backgroundImage,bgpos:cs.backgroundPosition,bgsize:cs.backgroundSize,kfloor:st.dataset.kfloor,figs}});
 if(MODE==='scan'){const keys=await p.evaluate(()=>{const o=[];try{for(const q of places())o.push(q.k)}catch(e){}return o.slice(0,80)});
   console.log('places',keys.length);
   for(const k of ['home',...keys]){try{await p.evaluate(k=>{goTo(k);render()},k);await sleep(600);const m=await measure();console.log(k,m.figs.length,m.bgimg.slice(0,80))}catch(e){console.log(k,'ERR',e.message.slice(0,80))}}}
 else{const k=MODE.split(':')[1];if(k){await p.evaluate(k=>{goTo(k);render()},k)}
 if(process.env.FOUR){await p.evaluate(()=>{const pp=S.visit.people;while(pp.length<4)pp.push(Object.assign({},pp[pp.length-1]));render()});await sleep(800);
  await p.evaluate(()=>{for(const k of Object.keys(KIT_FLOOR))if(/ngu-hoa-vien/.test(k))KIT_FLOOR[k]=.66;['ngu-hoa-vien','ngu-hoa-vien-xuan-sang'].forEach(k=>KIT_FLOOR[k]=.66);render()})}
   for(let w=0;w<30;w++){const ok=await p.evaluate(()=>{const im=[...document.querySelectorAll('#tokens img,#mefig')];return im.length>0&&im.every(i=>i.complete&&i.naturalWidth>0)});if(ok)break;await sleep(1000)}
   await sleep(2500);const m=await measure();console.log(JSON.stringify(m));fs.writeFileSync(OUT+'.json',JSON.stringify(m,null,1));await p.screenshot({path:OUT+'.png'})}
 if(errs.length)console.log('errs',errs.slice(0,3));await b.close()})();
