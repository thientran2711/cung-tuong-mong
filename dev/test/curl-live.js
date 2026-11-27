/* Live game: tab switch = page curl of #panel (kitCurlSwap), Dư đồ = leather map (kitLeather), unroll on entering the map.
   usage: node dev/test/curl-live.js <baseURL> <W>x<H>@dpr <outdir> <tag>
   Writes <tag>-map.jpg, <tag>-unroll-40.jpg, <tag>-tab-{25,45,65}.jpg (Hậu cung → Cung nhân frozen mid-curl), <tag>-back-45.jpg,
   <tag>-after.jpg; prints overflow / errors / truncation checks. */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text())});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await p.waitForTimeout(1500);
 const click=t=>p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab=${t}]`);if(b)b.click();return !!b},t);
 const freeze=()=>p.evaluate(()=>{window.__q=[];window.__rafo=window.__rafo||requestAnimationFrame;window.requestAnimationFrame=f=>{__q.push(f);return __q.length};window.__step=t=>{const q=__q;__q=[];q.forEach(f=>f(t))}});
 const thaw=t0=>p.evaluate(t0=>{__step(t0+5000);window.requestAnimationFrame=__rafo},t0);
 const audit=n=>p.evaluate(n=>{const vw=innerWidth;const bad=[];document.querySelectorAll('#panel *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>vw+1)bad.push(e.className)});
  return{n,overflowX:document.documentElement.scrollWidth>vw,bad:bad.slice(0,4),curls:document.querySelectorAll('.kcl').length,ids:document.querySelectorAll('#panel').length}},n);
 const A=[];const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
 L('map');
 await click('act');await p.waitForTimeout(600);
 await p.evaluate(()=>{document.getAnimations().forEach(a=>a.cancel())});
 await click('go');await p.waitForTimeout(250);
 await p.evaluate(()=>{const a=document.querySelector('.kleather').getAnimations();a.forEach(x=>{x.pause();x.currentTime=230})});await p.waitForTimeout(200);
 await p.screenshot({path:`${OUT}/${TAG}-unroll-40.jpg`,type:'jpeg',quality:84});
 await p.evaluate(()=>document.getAnimations().forEach(a=>a.finish()));await p.waitForTimeout(1200);
 await p.screenshot({path:`${OUT}/${TAG}-map.jpg`,type:'jpeg',quality:84});
 A.push(await audit('map'),await p.evaluate(()=>({strip:[...document.querySelectorAll('.maptools>.past,.maptools>.fest')].map(e=>getComputedStyle(e).display),leather:!!document.querySelector('.game.maptab .kleather')})));
 L('tab');
 await click('rv');await p.waitForTimeout(1200);
 await freeze();
 const t0=await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab=staff]');b.click();return kitCurlSwap.t0});
 for(const f of [.25,.45,.65]){await p.evaluate(([t0,f])=>__step(t0+720*f),[t0,f]);await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${TAG}-tab-${Math.round(f*100)}.jpg`,type:'jpeg',quality:84});A.push(await audit('tab'+f))}
 await thaw(t0);await p.waitForTimeout(500);A.push(await audit('after'));
 L('back');
 await freeze();
 const t1=await p.evaluate(()=>{document.querySelector('#tabs [data-tab=act]').click();return kitCurlSwap.t0});
 await p.evaluate(t1=>__step(t1+720*.45),t1);await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${TAG}-back-45.jpg`,type:'jpeg',quality:84});
 await thaw(t1);await p.waitForTimeout(600);
 await p.screenshot({path:`${OUT}/${TAG}-after.jpg`,type:'jpeg',quality:84});A.push(await audit('end'));
 L('tour');
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab));
 for(const t of tabs){await click(t);await p.waitForTimeout(250)}await p.waitForTimeout(900);A.push(await audit('tour'));
 /* reduced motion: no curl */
 await p.evaluate(()=>{OPT.fxon=false});await click('rv');const rm=await p.evaluate(()=>document.querySelectorAll('.kcl').length);await p.evaluate(()=>{OPT.fxon=true});
 console.log(JSON.stringify({TAG,A,rm,errs}));await b.close()})();
