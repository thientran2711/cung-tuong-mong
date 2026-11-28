/* kit-notice-action.js — KK29 SOFTLOCK (F BIG REVIEWER #5, bc-stack-review): a «Tin báo» panel with MANY notices (25 / 60) PLUS one ACTION notice (go → «Để ta xem» / «Để sau», v3 figure-left frame)
   must keep «Để ta xem / Để sau» IN VIEW and tappable (the notice list scrolls inside the frame, the options never leave the screen), and a real tap on «Để sau» closes it. Whole family: N = 1, 6, 25, 60 notices
   with / without the action; Fold 755x1000 + iPad 1180x820. usage: node dev/test/kit-notice-action.js <index.html> [outdir]  Exit 1 on a FAIL. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R=[];
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitNoticeOpen==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
  for(const n of [1,6,25,60])for(const act of [false,true]){
   await p.evaluate(()=>{try{while(Q.length){const k=Q.length;closeModal();if(Q.length>=k)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;try{NT.list.length=0}catch(e){}});await p.waitForTimeout(200);
   await p.evaluate(([n,act])=>{for(let i=0;i<n;i++){const o={id:'t'+i,line:'Tin thứ '+(i+1)+': Nghe nói một chuyện nhỏ trong cung, đủ dài để chiếm một dòng trọn vẹn.',again:true};if(act&&i===n-1)o.go=function(){window.__went=1};kitNotice(o)}window.__went=0;window.__it=kitNoticeOpen();},[n,act]);
   await p.waitForTimeout(1500);
   const s=await p.evaluate(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');if(!d)return {none:1};const vis=e=>{const r=e.getBoundingClientRect();return e.getClientRects().length>0&&r.width>0&&r.height>0};const bt=[...d.querySelectorAll('.opts > button')].filter(vis);const inView=bt.every(x=>{const r=x.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth});
    const dr=d.getBoundingClientRect();const x=d.querySelector('.kit-x');const xin=x&&vis(x)?(()=>{const r=x.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight})():false;
    const sc=[...d.querySelectorAll('*')].filter(e=>e.scrollHeight>e.clientHeight+4&&/auto|scroll/.test(getComputedStyle(e).overflowY)).length;
    return {opts:bt.length,inView,xin,frameFits:dr.top>=-1&&dr.bottom<=innerHeight+1,scrollers:sc,hasText:/Tin thứ/.test(d.textContent)}});
   if(s.none){R.push({dev:W+'x'+H,n,act,res:'no panel',FAIL:true});continue}
   if(OUT&&n===60&&act){fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/${W}-notice-60-act.png`})}
   let exit=s.xin;let how=exit?'✕':'';let closed=null;
   const tap=await p.evaluate(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');const bt=[...d.querySelectorAll('.opts > button')].filter(e=>e.getClientRects().length);const e=d.querySelector('.kit-x')||bt[bt.length-1];/* KK56: «Để sau» is the frame ✕ now */if(!e)return null;const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,ok:r.top>=0&&r.bottom<=innerHeight}});
   if(tap&&tap.ok){await p.touchscreen.tap(tap.x,tap.y);await p.waitForTimeout(900);closed=await p.evaluate(()=>document.getElementById('modal').hidden||!Q.length||Q[0].t!=='Tin báo')}
   const okRow=(s.opts===(act?1:0)||!act)&&(act?s.inView&&s.xin:true)&&s.frameFits&&(act?closed===true:(s.xin||s.opts>0||true));
   R.push({dev:W+'x'+H,n,action:act,opts:s.opts,'opts in view':s.inView,'✕ in view':s.xin,'frame fits':s.frameFits,scrollers:s.scrollers,'tap closes':closed,FAIL:!okRow})}
  await ctx.close()}
 await b.close();console.table(R);const bad=R.filter(r=>r.FAIL);console.log('cases',R.length,'FAIL',bad.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
