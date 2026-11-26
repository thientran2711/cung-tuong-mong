/* ONE SIEVE stills: the fullest «Trong cung vừa qua» result card of a bot life (seed) + the Sổ ghi tab, on one viewport.
   usage: node dev/test/one-sieve-shots.js <page.html> <outPrefix> <w> <h> [seed] [tuần] */
const {chromium}=require('playwright');const path=require('path');
const [PG,OUT,W,H,SD,DY]=process.argv.slice(2);const SEED=+SD||1,DAYS=+DY||8;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+W,height:+H},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(PG),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate((SEED)=>{let s=SEED*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render();window.__best=null},SEED);
 for(let d=0;d<DAYS;d++)await p.evaluate(()=>{const drain=()=>{let g=0;while(Q.length&&g++<40){const m=Q[0];try{if(m&&m.opts&&m.opts.length){let i=m.opts.findIndex(c=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));chooseM(i<0?0:i);if(Q[0]===m)Q.shift()}else Q.shift()}catch(e){Q.shift()}}Q.length=0;S.mg=0};
  for(let bb=0;bb<5;bb++){drain();try{placeWhere()}catch(e){}const bf=rsnap();try{nextBuoi()}catch(e){}if(S.dead)return;
   /* measure this span's card size without showing it (rows of the LIVE way = per-person changes) */
   let n=0;try{const R=bf.rel||{};for(const v of rivals){const x=R[v.id];if(!x)continue;if(Math.round(aff(v,S))!==Math.round(x.a)||(v.ghen||0)!==x.g||Math.round(oan(v,S))!==x.o)n++}}catch(e){}
   if(!window.__best||n>window.__best.n)window.__best={n,save:JSON.stringify({bf})};drain()}});
 /* replay is not possible: show the card of the LAST buổi with the most changes instead — play one more buổi until a big one */
 let shown=0;for(let k=0;k<40&&!shown;k++)shown=await p.evaluate(()=>{const bf=rsnap();try{nextBuoi()}catch(e){}Q.length=0;S.mg=0;let n=0;const R=bf.rel||{};for(const v of rivals){const x=R[v.id];if(!x)continue;if((v.ghen||0)!==x.g||Math.round(oan(v,S))!==x.o)n++}
  if(n<6)return 0;try{closeModal&&closeModal()}catch(e){}document.querySelectorAll('.kbk,.dawn,#curtain,#klife,#kmrew,.kmcal,#kdaytc').forEach(e=>e.remove());document.getElementById('modal')&&(document.getElementById('modal').hidden=true);window.__bot=0;try{resultShow('Trong cung vừa qua',bf,null)}catch(e){}window.__bot=1;clearTimeout(window.__rtT);const t=document.getElementById('rtoast');if(t){for(const [k,v] of [['opacity','1'],['visibility','visible'],['z-index','2147483600'],['display','block']])t.style.setProperty(k,v,'important')}return n});
 await p.waitForTimeout(700);const t=await p.$('#rtoast.on');if(t){await p.screenshot({path:OUT+'-card.png'})}
 await p.evaluate(()=>{const t=document.getElementById('rtoast');if(t){t.classList.remove('on');t.removeAttribute('style')}document.querySelectorAll('.kbk,.dawn,#curtain,#klife,#kmrew,.kmcal,#kdaytc').forEach(e=>e.remove());tab='log';try{const b=document.querySelector('[data-tab="log"]');if(b)b.click();else renderPanel()}catch(e){renderPanel()}});await p.waitForTimeout(800);
 await p.screenshot({path:OUT+'-soghi.png'});
 console.log(JSON.stringify({card:!!t,changes:shown,errs:errs.slice(0,3)}));await b.close()})();
