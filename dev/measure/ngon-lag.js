/* NGON-LAG measure (E96, owner OD 26/11 ~01:25Z «cái môn ngôn lời nói trong game lag lắm nha, ở chổ nói chuyện với cung nữ»).
   Real path: her trusted maid's person view → «Trò chuyện với cung nữ» → the kit rules card «Sẵn sàng» → the on-figure «Lời hay» game (jdfg words).
   Measures, with the CPU slowed like a phone (CDP throttle, default 4x): frame intervals while the game runs (p50 / p95 / max ms, frames > 33 ms),
   main-thread time per frame spent in the game's own frame (script), and the tap → dialog paint time of «Sai đi dò la» (pick-who picker).
   usage: node dev/measure/ngon-lag.js <baseURL> <path> [W H] [throttle] [secs]   e.g. http://127.0.0.1:8796 dev/index.html 755 1000 4 4 */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,BASE,PATH,W,H,THR,SECS]=process.argv;
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;return S.name})()`;
const CLEAN=`(()=>{for(const e of document.querySelectorAll('.kmov,#klife,#kmrew,#kpodov'))e.parentNode&&e.parentNode.removeChild(e);try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;
 try{if(DF.play){DF.play.destroy&&DF.play.destroy();DF.play=null}if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}used=0;S.suc=Math.max(S.suc,80);try{setTab('act')}catch(e){}render()})()`;
const pct=(a,q)=>{const s=a.slice().sort((x,y)=>x-y);return s.length?s[Math.min(s.length-1,Math.floor(q*s.length))]:0};
(async()=>{const b=await chromium.launch();const c=await b.newContext({serviceWorkers:'block',viewport:{width:+W||755,height:+H||1000},deviceScaleFactor:2});
 const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(BASE+'/'+PATH);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:90000});await sleep(1500);
 await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);
 /* a life whose trusted maid stands in her room (the stage roster moves people around) */
 for(let k=0;k<15;k++){const ok=await p.evaluate(CLEAN+`;window.__walkFree=1;goTo('home');window.__walkFree=0;render();curPeople().some(x=>x.kind==='maid')`);if(ok)break;await p.evaluate(NEWLIFE);await sleep(1500)}
 const cdp=await c.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:+THR||4});
 const openMaid=async()=>{await p.evaluate(CLEAN);await sleep(300);const i=await p.evaluate(()=>curPeople().findIndex(x=>x.kind==='maid'));if(i<0)return false;await p.locator(`#tokens .tok[data-p="${i}"]`).click();await sleep(900);return true};
 const out={vp:(W||755)+'x'+(H||1000),thr:+THR||4};
 /* 1. the word game */
 if(await openMaid()){
  await p.locator('.kfoc button.kfoc-b',{hasText:'Trò chuyện'}).first().click();await sleep(700);
  const go=p.locator('.kfoc button',{hasText:'Sẵn sàng'}).first();if(await go.count()){await go.click()}
  await p.waitForFunction(()=>!!(window.DFG&&DFG.cur),null,{timeout:8000}).catch(()=>{});
  out.game=await p.evaluate(secs=>new Promise(res=>{const T=[];let last=performance.now();const t0=last;let lt=0;
   let obs=null;try{obs=new PerformanceObserver(l=>{for(const e of l.getEntries())lt+=e.duration});obs.observe({entryTypes:['longtask']})}catch(e){}
   const f=()=>{const n=performance.now();T.push(n-last);last=n;if(n-t0<secs*1000&&window.DFG&&DFG.cur)requestAnimationFrame(f);else{try{obs&&obs.disconnect()}catch(e){}res({T,lt,running:!!(window.DFG&&DFG.cur)})}};requestAnimationFrame(f)}),+SECS||4);
  const T=out.game.T.slice(2);out.game={frames:T.length,p50:+pct(T,.5).toFixed(1),p95:+pct(T,.95).toFixed(1),max:+Math.max(0,...T).toFixed(1),over33:T.filter(x=>x>33.4).length,longTaskMs:Math.round(out.game.lt),stillRunning:out.game.running};
 }else out.game='no maid';
 /* 2. tap → picker paint: «Sai đi dò la» */
 if(await openMaid()){const tab=p.locator('.kfoc button.pct',{hasText:'Mưu kế'});if(await tab.count())await tab.first().click();await sleep(400);
  const card=p.locator('.kfoc button.kfoc-b',{hasText:'Sai đi dò la'});
  if(await card.count()){const t0=Date.now();await card.first().click();
   const ok=await p.waitForFunction(()=>{const M=document.getElementById('modal');return !Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(M)&&M.getBoundingClientRect().height>0},null,{timeout:6000}).then(()=>true).catch(()=>false);
   out.spyPicker={painted:ok,ms:ok?Date.now()-t0:null,queued:await p.evaluate(()=>Q.map(m=>String(m.t||'').slice(0,40)))}}else out.spyPicker='no card'}
 out.pageErrors=pe;console.log(JSON.stringify(out));await b.close()})();
