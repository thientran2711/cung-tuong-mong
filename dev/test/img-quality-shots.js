/* img-quality-shots.js — before/after shots of the worst person-picture spots found by img-quality.js.
   usage: node dev/test/img-quality-shots.js <baseURL> <outdir> <tag> [755x1000@2]
   Writes <tag>-1-nguoi-la.jpg (a stranger's card: court eunuch, never met), <tag>-2-nam-nhan.jpg (a palace man's card once known:
   Sứ thần / nhạc sư … — the old face-official fallback), <tag>-3-cong-tu.jpg (Hoàng tự marriage list), <tag>-4-the-mo.jpg (a card at
   first paint, before the portraits load: the old square face-* fallback). Same game seed for both builds (Math.random seeded). */
const {chromium}=require('playwright');
const [,,BASE,OUT,TAG,SZ]=process.argv;const [WH,D]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const PX=process.env.HTTPS_PROXY||process.env.https_proxy;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{}); /* pictures come from the CDN (dev/art/CDN.md) */const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(D||2),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{window.__bot=1;let s=12345;Math.random=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2500);
 const clean=()=>p.evaluate(()=>{const r=document.getElementById('kroul');if(r)r.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!isSrv())break}});
 await p.waitForTimeout(3000);await clean();await p.waitForTimeout(1500);await clean();
 await p.evaluate(()=>{setInterval(()=>{const r=document.getElementById('kroul');if(r)r.remove()},150)});
 /* the consort road (a servant start has no Cung nhân/Nam nhân tabs): start again while the life is a servant's */
 for(let i=0;i<20&&await p.evaluate(()=>typeof isSrv==='function'&&isSrv());i++){await p.evaluate(()=>{try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(1500);await clean()}
 await p.evaluate(()=>render());
 const tab=t=>p.evaluate(t=>{{const r=document.getElementById('kroul');if(r)r.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}let b=document.querySelector(`#tabs [data-tab="${t}"]`);if(!b){const g=document.querySelector('#tabs [data-tab="rv"]');if(g)g.click();b=document.querySelector(`[data-ksub="${t}"]`)}if(b)b.click()},t);
 const card=async(name,ms)=>{await p.waitForTimeout(ms||2500);const el=await p.$('#panel .pc, .panel .pc');const box=el&&await el.boundingBox();
  await p.screenshot({path:`${OUT}/${TAG}-${name}.jpg`,type:'jpeg',quality:86,clip:box?{x:box.x,y:box.y,width:Math.min(box.width,W-box.x),height:Math.min(box.height,H-box.y,900)}:undefined})};
 /* 4: first paint — a known servant's card the moment it opens (portraits not loaded yet) */
 await p.evaluate(()=>{for(const e of k61All())S.known[kOf61(e)]=3;K61VER++});await tab('staff');
 await p.evaluate(()=>{const b=document.querySelector('.pface[data-pg="staff"][data-pi="3"]');if(b)b.click()});await card('4-the-mo',60);
 /* 1: a stranger (court eunuch) */
 await p.evaluate(()=>{const c=S.court||{};for(const k in c){if(c[k])S.known[kOf61(c[k])]=0}K61VER++;render()});await tab('staff');
 await p.evaluate(()=>{const L=[...document.querySelectorAll('.pface[data-pg="staff"]')];const b=L.find(x=>x.querySelector('.kr-other,.kr-unknown'))||L[2];if(b)b.click()});await card('1-nguoi-la');
 /* 2: a palace man, known (the sứ thần if there is one) */
 await p.evaluate(()=>{for(const e of k61All())S.known[kOf61(e)]=3;K61VER++;render()});await tab('kid');await p.waitForTimeout(1500);await tab('men');await p.waitForTimeout(1500);
 /* the Hoàng tự marriage list drew the công tử first (they used to take the men's identities): pick a man still on an old face-* if any */
 await p.evaluate(()=>{const L=[...document.querySelectorAll('.pface[data-pg="men"]')];let b=L.find(x=>/face-/.test((x.querySelector('img.kpor,img')||{}).getAttribute?.('src')||''));
  if(!b){const i=Math.max(0,(S.men||[]).findIndex(m=>m.rw==='sứ thần'));b=L[Math.min(i,L.length-1)]}if(b)b.click()});await card('2-nam-nhan');
 /* 3: the công tử list (Hoàng tự) */
 await tab('kid');await p.waitForTimeout(2500);const h=await p.$('.h54box, #panel');const bx=h&&await h.boundingBox();
 await p.screenshot({path:`${OUT}/${TAG}-3-cong-tu.jpg`,type:'jpeg',quality:86});
 console.log(JSON.stringify({TAG,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
