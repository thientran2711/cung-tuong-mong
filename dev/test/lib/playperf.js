/* dev/test/lib/playperf.js — in-page PLAY-TIME perf instrumentation shared by dev/test/play-perf.js and dev/test/coop-lag.js.
   INIT (addInitScript, runs in every frame incl. the rot.js game iframe) records into window.__pp:
     ev[]    Event Timing entries (pointerdown/up, click, keydown) >= 16 ms: name, duration (input -> next paint), processing time, interactionId
     loaf[]  long animation frames (>50 ms) with the top script attributions (function name, source position, invoker) — the "who caused it"
     lt[]    long tasks (>50 ms) start + duration
     iv      live setInterval ids -> {ms, src}; to = live setTimeout count; raf counter (frames painted) for FPS windows
   Helpers (node side): snap(frame) / reset(frame) / fps(frame, ms) / metrics(cdp). */
const INIT=()=>{if(window.__pp)return;const P=window.__pp={ev:[],loaf:[],lt:[],iv:{},ivMax:0,to:0,frames:0,t0:performance.now()};
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.duration>=16)P.ev.push({n:e.name,d:Math.round(e.duration),proc:Math.round(e.processingEnd-e.processingStart),
   wait:Math.round(e.processingStart-e.startTime),id:e.interactionId||0,t:Math.round(e.startTime)})}).observe({type:'event',durationThreshold:16,buffered:true})}catch(e){}
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())P.lt.push({t:Math.round(e.startTime),d:Math.round(e.duration)})}).observe({type:'longtask',buffered:true})}catch(e){}
 try{new PerformanceObserver(l=>{for(const e of l.getEntries())P.loaf.push({t:Math.round(e.startTime),d:Math.round(e.duration),block:Math.round(e.blockingDuration||0),
   render:Math.round(e.renderStart?e.startTime+e.duration-e.renderStart:0),style:Math.round(e.styleAndLayoutStart?e.startTime+e.duration-e.styleAndLayoutStart:0),
   s:(e.scripts||[]).map(s=>({d:Math.round(s.duration),fn:s.sourceFunctionName||'',inv:String(s.invoker||'').slice(0,60),pos:s.sourceCharPosition,src:String(s.sourceURL||'').split('/').pop().slice(0,40),
     lay:Math.round(s.forcedStyleAndLayoutDuration||0)})).sort((a,b)=>b.d-a.d).slice(0,4)})}).observe({type:'long-animation-frame',buffered:true})}catch(e){}
 const si=window.setInterval,ci=window.clearInterval,st=window.setTimeout,ct=window.clearTimeout;const live=new Set();
 window.setInterval=function(f,ms){const id=si.apply(this,arguments);let src='';try{src=String(new Error().stack).split('\n').slice(2,4).map(x=>x.trim().replace(/\(.*\//,'(')).join(' < ')}catch(e){}
  P.iv[id]={ms:ms|0,src:src.slice(0,140)};const n=Object.keys(P.iv).length;if(n>P.ivMax)P.ivMax=n;return id};
 window.clearInterval=function(id){delete P.iv[id];return ci.apply(this,arguments)};
 window.setTimeout=function(f,ms){const a=[...arguments];if(typeof f==='function'){const g=f;let id;a[0]=function(){live.delete(id);return g.apply(this,arguments)};id=st.apply(this,a);live.add(id);P.to=live.size;return id}return st.apply(this,a)};
 window.clearTimeout=function(id){live.delete(id);P.to=live.size;return ct.apply(this,arguments)};
 Object.defineProperty(P,'toLive',{get:()=>live.size});
 const rf=window.requestAnimationFrame;const tick=()=>{P.frames++;rf.call(window,tick)};rf.call(window,tick)};

/* snapshot of everything recorded since the last reset (taken in the game frame) */
const SNAP=()=>{const P=window.__pp;if(!P)return null;return{ev:P.ev.slice(),loaf:P.loaf.slice(),lt:P.lt.slice(),iv:Object.values(P.iv),ivN:Object.keys(P.iv).length,toLive:P.toLive,
 dom:document.getElementsByTagName('*').length,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576*10)/10:null}};
const RESET=()=>{const P=window.__pp;if(P){P.ev.length=0;P.loaf.length=0;P.lt.length=0}};
async function snap(f){return f.evaluate(SNAP)}
async function reset(f){return f.evaluate(RESET)}
/* frames painted in ms (rAF ticks of the game frame) -> fps */
async function fps(f,ms){const a=await f.evaluate(()=>window.__pp.frames);await new Promise(r=>setTimeout(r,ms));const b=await f.evaluate(()=>window.__pp.frames);return Math.round((b-a)/(ms/1000)*10)/10}
async function metrics(cdp){const m=(await cdp.send('Performance.getMetrics')).metrics;const g=k=>(m.find(x=>x.name===k)||{}).value;
 return{heapMB:Math.round(g('JSHeapUsedSize')/1048576*10)/10,nodes:g('Nodes'),listeners:g('JSEventListeners'),docs:g('Documents'),frames:g('Frames'),layoutCount:g('LayoutCount'),recalcStyleCount:g('RecalcStyleCount')}}
const pct=(a,p)=>{if(!a.length)return 0;const s=[...a].sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.ceil(p/100*s.length)-1)]};
/* the response time of one tap = the longest Event Timing entry of its interaction (input -> next paint), INP-style */
function tapLatency(ev){const by={};for(const e of ev){if(!e.id)continue;by[e.id]=Math.max(by[e.id]||0,e.d)}const v=Object.values(by);return v.length?Math.max(...v):0}
/* ONE launch setup for the play-time tests: ANGLE SwiftShader + GPU raster = canvases/WebGL composite like on a phone GPU. (The legacy
   --use-gl=swiftshader path reads every WebGL frame back on the main thread: ~70 ms per frame of fake 'commit' cost a real phone never pays.)
   PP_ARGS overrides (space separated). */
const LAUNCH_ARGS=process.env.PP_ARGS!=null?process.env.PP_ARGS.split(' ').filter(Boolean):['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-gpu-rasterization'];
/* new life without the title flow (same as game-feel.js), overlays cleared */
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;/* the identity roulette is a once-per-life show, not play: skipped */try{kitRoulette=function(){}}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
 ['kroul','kroulw','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kbd-roulette').forEach(e=>e.remove());render();return typeof S!=='undefined'&&S?S.name:null};
const CLEAR=()=>{Q.length=0;const m=document.getElementById('modal');if(m&&!m.hidden){try{closeModal()}catch(e){m.hidden=true}}['kroul','dawn','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove())};
/* bot step (in page, JS clicks): answer the open dialog, else tap one enabled act card, else Sang buổi. Mini games are dropped. */
const STEP=()=>{if(typeof S==='undefined'||!S)return'nos';if(S.mg){try{S.mg=null;if(typeof kg82Close==='function')kg82Close(true)}catch(e){}try{render()}catch(e){}return'mg'}
 const vis=x=>x&&x.offsetParent!==null&&!x.disabled;
 if(S.dead){const b=[...document.querySelectorAll('button')].filter(vis);const k=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Nhập cung/.test(x.textContent))||b.find(x=>x.closest('#modal'));if(k){k.click();return'reborn'}return'dead'}
 const T=document.getElementById('title');if(T&&!T.hidden){const b=[...T.querySelectorAll('button')].filter(vis);const k=b.find(x=>/Nhận thân phận|Tiến cung|Vào cung|Lật|Chọn/.test(x.textContent))||b[0];if(k){k.click();return'title'}}
 const ov=[...document.querySelectorAll('button')].find(x=>vis(x)&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"],#dawn')&&/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ|Tiếp|Đi tiếp|Xong)$/.test(x.textContent.trim()));if(ov){ov.click();return'overlay'}
 const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>vis(x)&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'book'}
 const m=document.getElementById('modal');if(m&&!m.hidden){const o=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')].filter(vis);const b=o.length?o[Math.floor(Math.random()*o.length)]:[...m.querySelectorAll('button:not([disabled])')].filter(vis).pop();if(b){b.click();return'modal'}try{closeModal()}catch(e){}return'stuck'}
 window.__bk=(window.__bk||0)+1;const cards=[...document.querySelectorAll('button.card.ka:not(:disabled):not(.kdis)')].filter(vis);
 const tab=document.querySelector('#tabs [data-tab="act"]');if(!cards.length&&vis(tab)&&!window.__tabTried){window.__tabTried=1;tab.click();return'tab'}window.__tabTried=0;
 if(cards.length&&window.__bk%3){cards[Math.floor(Math.random()*cards.length)].click();return'act'}
 const n=document.getElementById('next');if(vis(n)){n.click();window.__buoiN=(window.__buoiN||0)+1;return'next'}return'idle'};

/* open the Hành sự cards (the act tab toggles them on the phone layout) */
const OPENACT=()=>{const v=x=>x&&x.offsetParent!==null;if([...document.querySelectorAll('button.card.ka')].some(v))return 0;const t=document.querySelector('#tabs [data-tab="act"]');if(v(t))t.click();return 1};
/* a new life, retried: right after boot start() can leave S unset for a moment (data still arriving) */
async function newLife(f){let e0=null;for(let i=0;i<6;i++){try{const n=await f.evaluate(()=>{const r=(function(){try{return 1}catch(e){return 0}})();return r});const nm=await f.evaluate(NEWLIFE).catch(e=>{e0=e;return null});if(nm)return nm}catch(e){e0=e}await new Promise(r=>setTimeout(r,1500))}throw e0||new Error('new life failed')}
module.exports={newLife,NEWLIFE,CLEAR,STEP,OPENACT,LAUNCH_ARGS,INIT,SNAP,RESET,snap,reset,fps,metrics,pct,tapLatency};
