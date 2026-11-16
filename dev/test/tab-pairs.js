/* TAB MODE family test (design-scale p2, KIT TAB MODE in j6 renderPanel): every tab-mode class of .game (KIT_TABMODE: maptab, cardtab) is
   reset on every tab change. For every ordered pair of visible tabs A→B (real mouse taps through the host transform, ?khost=1) the state after
   B must equal B's state reached from every other tab: same .game tab-mode classes, same stage/panel visibility, same panel box.
   Bug it guards: Dư đồ → Hậu cung kept .maptab (full-width panel, stage hidden on iPad).
   usage: node dev/test/sw-serve.js 8971 <repo root> &   node dev/test/tab-pairs.js http://localhost:8971/ [W x H @D …]  (default 1180x820@2 755x1000@2) */
const {chromium}=require('playwright');const [,,BASE0,...SZ]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const SEED=()=>{let a=20261116;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const LIFE=()=>{try{localStorage.clear()}catch(e){}OPT.fxon=false;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<200;i++){start();if(!isSrv()&&!(window.isKc&&isKc()))break}
 window.CLEAN=()=>{document.querySelectorAll('[id^=kroul],#dawn,#kload,#kpodov,.kmov').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()};CLEAN();return S.name};
(async()=>{const b=await chromium.launch();const sizes=(SZ.length?SZ:['1180x820@2','755x1000@2']).map(s=>{const m=s.match(/(\d+)x(\d+)@?(\d*)/);return[+m[1],+m[2],+(m[3]||1)]});let fail=0;
 for(const [W,H,D] of sizes){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block',hasTouch:true,isMobile:W<1100});await c.addInitScript(SEED);
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(BASE0.replace(/\/?$/,'/')+'index.html?khost=1',{waitUntil:'commit'});
  await p.waitForSelector('#krotf',{timeout:60000});let f;for(let i=0;i<600&&!f;i++){f=p.frames().find(x=>/krot=1/.test(x.url()));if(!f)await sleep(300)}
  await f.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await f.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:180000}).catch(()=>{});await sleep(1500);
  await f.evaluate(LIFE);for(let i=0;i<5;i++){await sleep(800);await f.evaluate(()=>CLEAN())}
  const tabs=await f.evaluate(()=>[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetWidth).map(b=>b.dataset.tab||b.dataset.kg).filter(Boolean));
  const tap=async t=>{await f.evaluate(()=>CLEAN());const q=await f.evaluate(t=>{const e=[...document.querySelectorAll('#tabs button')].find(b=>b.offsetWidth&&(b.dataset.tab||b.dataset.kg)===t);if(!e)return null;const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]},t);if(!q)return false;
   const [x,y]=await p.evaluate(([lx,ly])=>{const m=new DOMMatrix(getComputedStyle(document.getElementById('krotf')).transform);const o=m.transformPoint(new DOMPoint(lx,ly));return[o.x,o.y]},q);await p.mouse.click(x,y);await sleep(700);return true};
  const sig=()=>f.evaluate(()=>{const g=document.querySelector('.game'),v=e=>!!(e&&e.offsetWidth&&getComputedStyle(e).visibility!=='hidden'),P=document.getElementById('panel'),r=P&&P.getBoundingClientRect();
   return{cls:['maptab','cardtab','k3home','k3pop'].filter(c=>g.classList.contains(c)).join(' '),stage:v(document.getElementById('stage')),panel:v(P),box:r&&r.width?[r.left,r.width].map(Math.round).join(','):'',tab}});
  const home=async()=>{/* one page: back to the room so the next A tap opens a page */await f.evaluate(()=>{const r=document.getElementById('k3room');if(r&&r.offsetWidth)r.click()});await sleep(300)};
  const ref={},bad=[];let n=0;
  for(const A of tabs)for(const B of tabs){if(A===B)continue;await home();await tap(A);await tap(B);const s=await sig();n++;const k=JSON.stringify({...s,tab:undefined});
   if(!ref[B])ref[B]={k,from:A};else if(ref[B].k!==k)bad.push(`${A}→${B}: ${k} ≠ (from ${ref[B].from}) ${ref[B].k}`);
   if(/maptab/.test(s.cls)&&s.tab!=='go')bad.push(`${A}→${B}: .maptab on tab ${s.tab}`);if(s.tab!=='go'&&kv2(W,H)&&!s.stage)bad.push(`${A}→${B}: stage hidden on the spread (tab ${s.tab})`)}
  function kv2(w,h){return !(w<h&&w/h>=0.62)}
  console.log(`${W}x${H}: ${tabs.length} tabs [${tabs.join(' ')}] · ${n} pairs · mismatches ${bad.length} · errors ${errs.length}`);Object.entries(ref).forEach(([t,v])=>console.log('  ',t,v.k));
  bad.slice(0,20).forEach(x=>console.log('  FAIL',x));errs.slice(0,5).forEach(x=>console.log('  ERR',x));fail+=bad.length+errs.length;await c.close()}
 await b.close();process.exit(fail?1:0)})();
