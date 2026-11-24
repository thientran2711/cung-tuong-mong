/* jbook kitCurl (= kitSheetTurn, whole sheet) in the week book (j87): mid-turn frames + reduced-motion fade + drag.
   usage: node dev/test/page-curl.js <baseURL> <W>x<H>@dpr <outdir>
   Frames are taken by freezing requestAnimationFrame and stepping the tween by hand (exact progress, no timing luck). */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=`${W}x${H}`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const P=kpPeople().filter(x=>x[1]!==S).slice(0,4);const say=['sai người mang lễ vật sang cung ngươi. Thiện cảm +3.','gặp ngươi ở Ngự hoa viên, chuyện trò nửa buổi.','nghe tin đồn về ngươi, sắc mặt không vui.','được Hoàng thượng khen ở yến tiệc.'];
  P.forEach(([n],i)=>{log(`${n} ${say[i%4]}`);log(`${n} ${say[(i+1)%4]}`)});log('Triều đình: Được mùa ở Giang Nam, kho lúa đầy.');log('Thiên hạ: sứ thần phương nam vào kinh dâng cống.')});
 await p.evaluate(()=>{dawn()});await p.waitForTimeout(3500);
 await p.evaluate(()=>{const d=document.querySelector('#kmcal,.kmcal');if(d)d.click()});await p.waitForTimeout(800);
 await p.evaluate(()=>window.__kbk.go(1));await p.waitForTimeout(500);
 /* freeze rAF */
 await p.evaluate(()=>{window.__q=[];window.__T=performance.now();window.__rafo=window.requestAnimationFrame;window.requestAnimationFrame=f=>{__q.push(f);return __q.length};
  window.__step=t=>{window.__T=t;const q=__q;__q=[];q.forEach(f=>f(t))}});
 const t0=await p.evaluate(()=>{const t=__T;window.__kbk.next();return performance.now()});
 for(const f of [.38,.5,.64]){await p.evaluate(([t0,f])=>{__step(t0+KIT_TURN_MS*f)},[t0,f]);await p.waitForTimeout(250);
  console.log(f,await p.evaluate(()=>{const k=[...document.querySelectorAll('.ksht-sheet')];return k.length+' '+k.slice(0,18).map(e=>e.style.transform.replace(/[^0-9.-]/g,'')).join(',')}));
  await p.screenshot({path:`${OUT}/curl-${tag}-${Math.round(f*100)}.jpg`,type:'jpeg',quality:82})}
 await p.evaluate(t0=>{__step(t0+2000);window.requestAnimationFrame=__rafo},t0);await p.waitForTimeout(400);
 const after=await p.evaluate(()=>({cur:__kbk.cur,curls:document.querySelectorAll('.ksht').length}));
 /* backwards */
 await p.evaluate(()=>{window.requestAnimationFrame=f=>{__q.push(f);return __q.length}});
 const t1=await p.evaluate(()=>{window.__kbk.prev();return performance.now()});
 await p.evaluate(t1=>{__step(t1+KIT_TURN_MS*.4)},t1);await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/curl-${tag}-back40.jpg`,type:'jpeg',quality:82});
 await p.evaluate(t1=>{__step(t1+2000);window.requestAnimationFrame=__rafo},t1);await p.waitForTimeout(300);
 /* drag with the finger: half-way hold */
 const box=await p.evaluate(()=>{const r=document.querySelector('.kbk-book').getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});
 await p.mouse.move(box.x+box.w*.95,box.y+box.h*.6);await p.mouse.down();for(let i=1;i<=8;i++){await p.mouse.move(box.x+box.w*(.95-.06*i),box.y+box.h*.6-i*2);await p.waitForTimeout(30)}
 await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/curl-${tag}-drag.jpg`,type:'jpeg',quality:82});
 await p.mouse.up();await p.waitForTimeout(900);
 const real=await p.evaluate(()=>new Promise(res=>{const c0=__kbk.cur;let fr=0,t0=performance.now();const tick=()=>{fr++;if(performance.now()-t0<650)requestAnimationFrame(tick);else res({frames:fr,curls:document.querySelectorAll('.ksht').length})};__kbk.next();requestAnimationFrame(tick)}));
 await p.waitForTimeout(500);
 /* reduced motion → cross-fade, no curl */
 await p.evaluate(()=>{OPT.fxon=false});const rm=await p.evaluate(()=>new Promise(res=>{__kbk.next();setTimeout(()=>res({curls:document.querySelectorAll('.ksht').length,cur:__kbk.cur}),80)}));
 await p.evaluate(()=>{OPT.fxon=true});
 const ox=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 console.log(JSON.stringify({tag,after,real,rm,overflowX:ox,errs}));await b.close()})();
