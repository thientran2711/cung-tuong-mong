/* ONE LAYOUT PER ORIENTATION, SCALED (dev/site/rot.js, KIT § SUPPORTED SCREENS · DESIGN CANVAS).
   usage: node dev/test/sw-serve.js 8955 <repo root>   (another shell);  node dev/test/view-scale.js http://localhost:8955/ <outdir> [shots]
   Taps = real mouse clicks at the transformed screen point (CDP touch input never acks in this GPU-less sandbox).
   Host mode is forced with ?khost=1 (automated browsers otherwise run direct). Per size: the game frame's own viewport is the design size
   (1180x820 landscape / 755x1000 portrait), scale s, layout signature (tab + top-bar cell rects inside the frame) identical across landscape
   sizes, taps at the transformed screen point land on the right tab, 0 errors, no overflow inside the frame; smallest text × s.
   390x844@3 = narrow portrait: frame rotated 90°; swipe direction; turning to 844x390 drops the rotation. */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE0,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const BASE=BASE0+(BASE0.includes('?')?'&':'?')+'khost=1';
const sleep=t=>new Promise(r=>setTimeout(r,t));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
/* Cảnh động off in this test: the sandbox has no GPU and the animated stage starves the renderer, so real input events would queue for minutes */
const LIFE=()=>{try{localStorage.setItem('ctm-rot-tip','1')}catch(e){}OPT.fxon=false;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
 document.querySelectorAll('[id^=kroul],#dawn,#kload,.kmov').forEach(e=>e.remove());if(S.place!=='home'&&typeof goTo==='function'){}render();try{pxScene()}catch(e){}return S.name};
function watch(p,errs){p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())})}
const shot=async(p,n)=>{if(!SHOTS)return;for(let t=0;t<2;t++){try{await p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:55,timeout:150000});return}catch(e){}}};
const SIG=()=>{const r=e=>{const q=e.getBoundingClientRect();return [q.left,q.top,q.width,q.height].map(Math.round).join(',')};
 return [...document.querySelectorAll('#tabs [data-tab],[id^="hud-"]')].filter(e=>e.offsetWidth).map(e=>(e.dataset.tab||e.id)+':'+r(e)).join('|')};
const MINFONT=()=>{let m=99,w='';for(const e of document.querySelectorAll('body *')){if(!e.offsetWidth||!e.childNodes.length)continue;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;const r=e.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)continue;const f=parseFloat(getComputedStyle(e).fontSize);if(f&&f<m){m=f;w=(e.className||e.tagName)+':'+e.textContent.trim().slice(0,20)}}return{px:m,at:w}};
async function frameOf(p){for(let i=0;i<600;i++){const f=p.frames().find(x=>/krot=1/.test(x.url()));if(f){try{if(await f.evaluate(()=>typeof start==='function'))return f}catch(e){}}await sleep(300)}throw new Error('no frame')}
async function tapAt(c,p,x,y){const s=await c.newCDPSession(p);const pt=[{x,y,radiusX:4,radiusY:4,force:1,id:1}];const go=t=>Promise.race([s.send('Input.dispatchTouchEvent',t),sleep(20000)]);
 await go({type:'touchStart',touchPoints:pt});await sleep(80);await go({type:'touchEnd',touchPoints:[]});await s.detach().catch(()=>{})}
async function toOuter(p,lx,ly){return p.evaluate(([lx,ly])=>{const f=document.getElementById('krotf');const m=new DOMMatrix(getComputedStyle(f).transform);const q=m.transformPoint(new DOMPoint(lx,ly));return[q.x,q.y]},[lx,ly])}
(async()=>{const b=await chromium.launch();const R={};
 for(const [W,H,D,tag] of [[1000,755,2,'fold-land'],[1180,820,2,'ipad'],[1366,1024,2,'ipad-pro'],[844,390,3,'phone-land'],[755,1000,2,'fold-port'],[390,844,3,'narrow']]){L(tag);
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await c.newPage();const errs=[];watch(p,errs);
  await p.goto(BASE,{waitUntil:'commit'});await p.waitForSelector('#krotf',{timeout:60000});const f=await frameOf(p);L('frame ok');await f.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:180000}).catch(()=>L('kload wait timeout'));await sleep(1500);for(let i=0;i<4;i++){try{await f.evaluate(LIFE);break}catch(e){L('life retry',e.message.slice(0,80));await sleep(4000)}}await sleep(2500);L('life');
  const r={krot:await p.evaluate(()=>window.__krot),inner:await f.evaluate(()=>({w:innerWidth,h:innerHeight,kv:kitView(),overflowX:document.documentElement.scrollWidth>innerWidth+1})),sig:await f.evaluate(SIG)};
  L('sig');const mf=await f.evaluate(MINFONT);L('font');r.minFont={css:mf.px,screen:+(mf.px*r.krot.s).toFixed(1),at:mf.at};
  /* taps */
  await f.evaluate(()=>{window.__tapLog=[];document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-tab]');__tapLog.push(t?t.dataset.tab:((e.target.id||e.target.className||e.target.tagName)+'').slice(0,40))},true)});
  r.taps=[];for(const k of ['go','inv','act']){const q=await f.evaluate(k=>{const t=document.querySelector(`#tabs [data-tab="${k}"]`);if(!t||!t.offsetWidth)return null;const r=t.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]},k);if(!q){r.taps.push(k+':none');continue}
   const [x,y]=await toOuter(p,q[0],q[1]);await f.evaluate(()=>{document.querySelectorAll('[id^=kroul],#dawn,#kload,#kpodov,.kmov').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true});await p.mouse.click(x,y);await sleep(1000);r.taps.push(k+'→'+await f.evaluate(()=>__tapLog.pop()))}
  L('taps',r.taps.join(' '));await shot(p,`${tag}-${W}x${H}`);L('shot');
  if(tag==='narrow'){/* swipe toward the content's top (outer +x) → the panel scrolls down */
   const sc=await f.evaluate(()=>{const s=[...document.querySelectorAll('*')].filter(e=>/(auto|scroll)/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight+40&&e.clientHeight>100).sort((a,b)=>b.clientHeight*b.clientWidth-a.clientHeight*a.clientWidth)[0];if(!s)return null;s.id=s.id||'kv-sc';s.scrollTop=0;const r=s.getBoundingClientRect();return{id:s.id,c:[r.left+r.width/2,r.top+r.height/2]}});
   if(sc){const [x,y]=await toOuter(p,sc.c[0],sc.c[1]);const cdp=await c.newCDPSession(p);try{const ok=await Promise.race([cdp.send('Input.synthesizeScrollGesture',{x:Math.round(x-50),y:Math.round(y),xDistance:120,yDistance:0,gestureSourceType:'mouse',speed:500}).then(()=>1),sleep(30000).then(()=>0)]);if(!ok)r.swipeErr='timeout'}catch(e){r.swipeErr=e.message}
    await sleep(800);r.swipeScrollTop=await f.evaluate(id=>document.getElementById(id).scrollTop,sc.id)}
   await p.setViewportSize({width:844,height:390});await sleep(1500);r.turned={krot:await p.evaluate(()=>window.__krot),inner:await f.evaluate(()=>[innerWidth,innerHeight]),sig:(await f.evaluate(SIG))===R['phone-land'].sig}}
  r.errs=errs;R[tag]=r;fs.writeFileSync(OUT+'/view-scale.json',JSON.stringify(R,null,1));L(tag,JSON.stringify({s:r.krot.s,rot:r.krot.rotated,inner:[r.inner.w,r.inner.h],minFont:r.minFont,taps:r.taps,errs:errs.length,ovf:r.inner.overflowX,swipe:r.swipeScrollTop,swipeErr:r.swipeErr,turned:r.turned&&{s:r.turned.krot.s,rot:r.turned.krot.rotated,inner:r.turned.inner,same:r.turned.sig}}));await c.close()}
 const land=['fold-land','ipad','ipad-pro','phone-land','narrow'];R.sameLandscapeLayout=land.every(t=>R[t].sig===R.ipad.sig);
 fs.writeFileSync(OUT+'/view-scale.json',JSON.stringify(R,null,1));
 for(const t in R)if(R[t]&&R[t].krot)console.log(t,JSON.stringify({s:R[t].krot.s,rot:R[t].krot.rotated,inner:[R[t].inner.w,R[t].inner.h],minFont:R[t].minFont,taps:R[t].taps,errs:R[t].errs.length,swipe:R[t].swipeScrollTop,turned:R[t].turned&&{s:R[t].turned.krot.s,rot:R[t].turned.krot.rotated,same:R[t].turned.sig}}));
 console.log('sameLandscapeLayout',R.sameLandscapeLayout);await b.close()})();
