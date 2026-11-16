/* review/page-curl2: Tuần lục book page turn = landscape CURL, portrait paper SLIDE; no swipe on the game page; tab tap = short animation.
   usage: node dev/test/page-curl2.js <baseURL> <W>x<H>@dpr <outdir> <tag> [noshots]   → one JSON line */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG,NOSHOT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text().slice(0,160))});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{document.querySelectorAll('.kroul,#kload,#kroul').forEach(x=>x.remove());document.querySelectorAll('.kbd').forEach(x=>x.remove());SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await p.waitForTimeout(1500);
 const shot=n=>NOSHOT?0:p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:78});
 const R={TAG,W,H};
 /* 1. swipe on the game page must NOT change the tab (touch + mouse) */
 await p.evaluate(()=>{document.querySelector('#tabs [data-tab=rv]').click()});await p.waitForTimeout(1800);
 const tab0=await p.evaluate(()=>tab);
 const swipe=async dx=>{await p.evaluate(dx=>{const pn=document.getElementById('panel');const r=pn.getBoundingClientRect();const x0=r.left+r.width*(dx<0?.75:.25),y=r.top+r.height*.75;
   const t=document.elementFromPoint(x0,y)||pn;const mk=x=>new Touch({identifier:1,target:t,clientX:x,clientY:y});
   t.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[mk(x0)],changedTouches:[mk(x0)]}));
   t.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[mk(x0+dx)]}))},dx);await p.waitForTimeout(1600);return p.evaluate(()=>tab)};
 R.swipeKeepsTab=[await swipe(-170),await swipe(170)].every(t=>t===tab0);
 /* 2. tab tap = short animation (portrait: slide, landscape: curl) */
 R.tabTap=await p.evaluate(()=>{const b=[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.offsetParent&&x.dataset.tab!=='go'&&x.dataset.tab!==tab)[1];b.click();const s=document.querySelector('.kcl-host .ksht');if(window.kitCurlSwap&&kitCurlSwap.hold)kitCurlSwap.hold(.5);return s?(s.classList.contains('ksht-slide')?'slide':'curl'):'none'});
 await p.waitForTimeout(400);await shot('tab-50');
 await p.evaluate(()=>kitCurlSwap.end&&kitCurlSwap.end());await p.waitForTimeout(500);
 R.tabMs=await p.evaluate(async()=>{const b=[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.offsetParent&&x.dataset.tab!=='go'&&x.dataset.tab!==tab)[0];const t0=performance.now();b.click();const s=()=>document.querySelector('.kcl-host .ksht');
   await new Promise(r=>{const f=()=>{if(!s()||performance.now()-t0>3000)r();else requestAnimationFrame(f)};requestAnimationFrame(f)});return Math.round(performance.now()-t0)});
 await p.waitForTimeout(500);
 /* 3. week book */
 await p.evaluate(()=>{document.querySelectorAll('.kroul,#kload').forEach(x=>x.remove());dawn()});await p.waitForTimeout(2600);
 R.mode=await p.evaluate(()=>window.__kbk&&window.__kbk.mode);R.pages=await p.evaluate(()=>window.__kbk&&window.__kbk.max);
 await shot('book-0');
 /* tap next, sample mid-turn */
 await p.evaluate(()=>{window.__kbk.go(0);window.__kbk.next()});
 const ms0=Date.now();const mid=await p.evaluate(()=>new Promise(r=>{const t0=performance.now();let kind='none',seen=0;const f=()=>{const s=document.querySelector('.kbk-book .ksht');if(s){kind=s.classList.contains('ksht-slide')?'slide':'curl'}
   if(kind!=='none')seen++;if(performance.now()-t0>3000){r({kind,seen,ms:Math.round(performance.now()-t0)});return}requestAnimationFrame(f)};requestAnimationFrame(f)}));
 R.btnTurn=mid.kind;
 await p.waitForTimeout(1500);R.curAfterNext=await p.evaluate(()=>window.__kbk.cur);
 /* slide timing: time from next() to sheet gone */
 R.turnMs=await p.evaluate(()=>new Promise(r=>{window.__kbk.go(1);window.__kbk.next();const t0=performance.now();let started=false;const f=()=>{const s=document.querySelector('.kbk-book .ksht');if(s)started=true;if((started&&!s)||performance.now()-t0>3500)r(Math.round(performance.now()-t0));else requestAnimationFrame(f)};requestAnimationFrame(f)}));
 await p.waitForTimeout(600);
 /* drag with mouse: 40% of width, hold, screenshot, release */
 const bb=await p.evaluate(()=>{const r=document.querySelector('.kbk-book').getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});
 const sx=bb.x+bb.w*(R.mode==='spread'?.8:.8),sy=bb.y+bb.h*.6,span=R.mode==='spread'?bb.w*.5:bb.w*.8;
 await p.evaluate(()=>window.__kbk.go(1));await p.waitForTimeout(400);const cur0=await p.evaluate(()=>window.__kbk.cur);
 await p.mouse.move(sx,sy);await p.mouse.down();for(let i=1;i<=8;i++){await p.mouse.move(sx-span*.45*i/8,sy);await p.waitForTimeout(20)}
 await p.waitForTimeout(250);await shot('drag-mid');R.dragKind=await p.evaluate(()=>{const s=document.querySelector('.kbk-book .ksht');return s?(s.classList.contains('ksht-slide')?'slide':'curl'):'none'});
 for(let i=1;i<=4;i++){await p.mouse.move(sx-span*(.45+.2*i/4),sy);await p.waitForTimeout(20)}
 await p.mouse.up();await p.waitForTimeout(1600);R.dragCommit=(await p.evaluate(()=>window.__kbk.cur))-cur0;
 /* small drag springs back (<30% / <42%) */
 const cur1=await p.evaluate(()=>window.__kbk.cur);
 await p.mouse.move(sx,sy);await p.mouse.down();for(let i=1;i<=6;i++){await p.mouse.move(sx-span*.12*i/6,sy);await p.waitForTimeout(40)}await p.waitForTimeout(500);await p.mouse.up();await p.waitForTimeout(1500);
 R.dragSpring=(await p.evaluate(()=>window.__kbk.cur))-cur1;
 /* back button */
 await p.evaluate(()=>window.__kbk.prev());await p.waitForTimeout(1600);R.backOk=(await p.evaluate(()=>window.__kbk.cur))<cur1+1;
 R.fast=await p.evaluate(async()=>{for(let i=0;i<8;i++){window.__kbk.next();await new Promise(r=>setTimeout(r,60))}await new Promise(r=>setTimeout(r,2200));return{cur:window.__kbk.cur,sheets:document.querySelectorAll('.ksht').length}});
 R.ox=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 /* Gọn */
 await p.evaluate(()=>{OPT.fxon=false;window.__kbk.go(1)});await p.waitForTimeout(300);
 R.gon=await p.evaluate(async()=>{const c0=window.__kbk.cur;window.__kbk.next();const t0=performance.now();const sh=()=>document.querySelectorAll('.ksht').length;let sawSheet=sh()>0;await new Promise(r=>setTimeout(r,400));return{moved:window.__kbk.cur-c0,sawSheet,ms:Math.round(performance.now()-t0)}});
 R.errs=errs.slice(0,6);console.log(JSON.stringify(R));await b.close()})();
