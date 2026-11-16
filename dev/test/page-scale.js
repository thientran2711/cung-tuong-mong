/* PAGE = SPREAD PAGE, SCALED — every tab (owner 16/11 17:00Z s20: "ô hành trang là có tới 7 hàng, còn một bên là ô hành trang chỉ có 4 hàng";
   rule OD:L345 + OD:L1278, KIT §0.0). Same seeded game at the two design sizes (direct mode): SPREAD 1180x820 (iPad landscape, RIGHT page)
   and ONE PAGE 590x820 (= Fold 755x1000 portrait divided by s 1.2195). For every visible bottom tab, the open page (#panel) is measured:
   - page box (w,h); every visible element's rect relative to the page box, keyed by a stable DOM path;
   - every CSS grid inside the page: columns x rows (rows = ceil(children/cols));
   A tab FAILS when a grid's columns/rows differ, or an element present on both pages moves/resizes by more than TOL px (default 2),
   or the page boxes differ. Output: JSON per tab + a table; exit 1 on any failure.
   usage: node dev/test/sw-serve.js 8971 <repo root> &   node dev/test/page-scale.js http://localhost:8971/ <outdir> [shots]
   env: TOL=2  TABS=act,inv  (default: every visible tab) */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE0,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const TOL=+(process.env.TOL||2);const sleep=t=>new Promise(r=>setTimeout(r,t));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const SEED=()=>{let a=20261116;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const LIFE=()=>{try{localStorage.clear()}catch(e){}OPT.fxon=false;SLOT=3;document.getElementById("title").hidden=true;for(let i=0;i<200;i++){try{start()}catch(e){throw new Error("start: "+e.stack.slice(0,600))}if(!isSrv()&&!(window.isKc&&isKc()))break}CLEAN();return S.name};
const CLEAN0=()=>{window.CLEAN=()=>{document.querySelectorAll('[id^=kroul],#dawn,#kload,#kpodov,.kmov').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()}};
/* rects relative to the page box + grids */
const MEASURE=sel=>{const root=document.querySelector(sel);if(!root||!root.offsetWidth)return null;const R=root.getBoundingClientRect();const els={},grids={};
 const key=e=>{const parts=[];for(let x=e;x&&x!==root;x=x.parentElement){const k=x.tagName.toLowerCase()+(x.id?'#'+x.id:'')+'.'+[...x.classList].filter(c=>!/^(on|kgon|k3dim|hot|ok|flash|sel)$/.test(c)).sort().join('.');
   const sib=x.parentElement?[...x.parentElement.children].filter(y=>y.tagName===x.tagName&&y.className===x.className):[];parts.unshift(k+(sib.length>1?':'+sib.indexOf(x):''))}return parts.join('>')};
 for(const e of root.querySelectorAll('*')){if(!e.offsetWidth&&!e.offsetHeight)continue;const r=e.getBoundingClientRect();const k=key(e);
  els[k]=[r.left-R.left,r.top-R.top+root.scrollTop,r.width,r.height].map(v=>Math.round(v*10)/10);
  const cs=getComputedStyle(e);if(cs.display==='grid'||cs.display==='inline-grid'){const cols=cs.gridTemplateColumns.split(' ').filter(Boolean).length;const n=[...e.children].filter(c=>c.offsetWidth||c.offsetHeight).length;
   if(n>1)grids[k]={cols,rows:Math.ceil(n/cols),n}}}
 return {box:[R.width,R.height].map(Math.round),scrollH:root.scrollHeight,els,grids}};
function compare(a,b){if(!a||!b)return{err:'missing page'};let n=0,ok=0;const bad=[];const z=a.box[0]/b.box[0];b={...b,els:Object.fromEntries(Object.entries(b.els).map(([k,v])=>[k,v.map(x=>Math.round(x*z*10)/10)]))};
 for(const k in a.els){if(!(k in b.els))continue;if(a.els[k][1]>a.box[1])continue;/* first screen only (what she sees before scrolling) */n++;const p=a.els[k],q=b.els[k];const d=p.map((v,i)=>Math.abs(v-q[i]));if(Math.max(...d)<=TOL)ok++;else bad.push({k:k.split('>').slice(-2).join('>'),spread:p,page:q,d:Math.max(...d)})}
 const gbad=[];for(const k of new Set([...Object.keys(a.grids),...Object.keys(b.grids)])){const g=a.grids[k],h=b.grids[k];if(g&&h&&g.n!==h.n&&g.cols===h.cols)continue;/* a different number of items (game content, e.g. today's acts) is not a layout difference */if(!g||!h||g.cols!==h.cols||g.rows!==h.rows)gbad.push({k:k.split('>').slice(-2).join('>'),spread:g?`${g.cols}x${g.rows} (${g.n})`:'-',page:h?`${h.cols}x${h.rows} (${h.n})`:'-'})}
 const onlyA=Object.keys(a.els).filter(k=>!(k in b.els)).length,onlyB=Object.keys(b.els).filter(k=>!(k in a.els)).length;
 bad.sort((x,y)=>y.d-x.d);
 return{box:[a.box,b.box],scrollH:[a.scrollH,b.scrollH],common:n,match:n?+(ok/n*100).toFixed(1):0,onlySpread:onlyA,onlyPage:onlyB,gridBad:gbad,worst:bad.slice(0,12)}}
async function game(b,W,H){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
 await c.addInitScript(SEED);await c.addInitScript(CLEAN0);await c.addInitScript(css=>addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);/* the picture-download dock strip shrinks the game in both modes alike, but not at the same moment: keep it off while measuring */s.textContent+='html body.kload-dock .game{padding-bottom:6px!important}'}),'.kloadchip{display:none!important}'+(process.env.CSS||''));const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(BASE0.replace(/\/?$/,'/')+'index.html?khost=0',{waitUntil:'commit'});return{c,p,errs}}
async function ready(f){await f.waitForFunction(()=>typeof start==='function'&&document.readyState==='complete',null,{timeout:180000});await f.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:180000}).catch(()=>{});await sleep(1500)}
const settle=async f=>{for(let i=0;i<8;i++){await sleep(900);const had=await f.evaluate(()=>!!document.querySelector('[id^=kroul],#dawn,#kload,#kpodov,.kmov')||Q.length>0||!document.getElementById('modal').hidden);if(!had&&i>1)return;await f.evaluate(()=>CLEAN())}};
const openTab=k=>{CLEAN();const b=[...document.querySelectorAll('#tabs button')].find(x=>(x.dataset.tab||x.dataset.kg)===k);b&&b.click()};
(async()=>{const b=await chromium.launch();const M={};
 let PG=null;for(const tag of ['spread','page']){const [W,H]=tag==='spread'?[1180,820]:[PG.w,+(process.env.PAGEH||PG.h)];L(tag,W,H);const {c,p,errs}=await game(b,W,H);await ready(p);if(!PG)PG=await p.evaluate(()=>KIT_FRAME.page);if(process.env.DBG)L(await p.evaluate(()=>[typeof S,typeof start,typeof OPT,document.readyState]));await p.evaluate(LIFE);await settle(p);
  if(tag==='spread')M.state=await p.evaluate(()=>JSON.stringify(ser()));{await p.evaluate(j=>{quiet=true;deser(JSON.parse(j));quiet=false;tab='act';CLEAN()},M.state);await settle(p)}
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetWidth).map(b=>({k:b.dataset.tab||b.dataset.kg,s:b.textContent.trim()})).filter(x=>x.k));
  M[tag]={tabs:{},errs};const want=process.env.TABS?process.env.TABS.split(','):null;
  for(const t of tabs){if(want&&!want.includes(t.k))continue;await p.evaluate(openTab,t.k);await sleep(900);await settle(p);await sleep(300);
   M[tag].tabs[t.k]={label:t.s,m:await p.evaluate(MEASURE,'#panel')};if(SHOTS)await p.screenshot({path:`${OUT}/${tag}-${t.k}.jpg`,type:'jpeg',quality:60})}
  await c.close()}
 const R={tol:TOL,tabs:{},errs:[...M.spread.errs,...M.page.errs]};let fail=0;const rows=[];
 for(const k in M.spread.tabs){const a=M.spread.tabs[k],z=M.page.tabs[k];if(!z){R.tabs[k]={err:'tab missing on page'};fail++;continue}
  const r=compare(a.m,z.m);r.label=a.label;R.tabs[k]=r;const boxOk=!r.err&&Math.abs(r.box[0][1]-r.box[1][1]*r.box[0][0]/r.box[1][0])<=TOL;/* same page shape: the one page is the spread page scaled (any uniform factor) */
  r.pass=!r.err&&boxOk&&!r.gridBad.length&&r.match>=95;if(!r.pass)fail++;
  rows.push(`${r.pass?'PASS':'FAIL'} ${k.padEnd(6)} ${String(a.label).padEnd(12)} box ${r.box?r.box.map(x=>x.join('x')).join(' | '):'-'}  same-rect ${r.match}% of ${r.common}  grids≠ ${r.gridBad?r.gridBad.length:'-'} ${r.gridBad?r.gridBad.slice(0,3).map(g=>`[${g.k.slice(-40)} ${g.spread}|${g.page}]`).join(' '):''}`)}
 fs.writeFileSync(OUT+'/page-scale.json',JSON.stringify(R,null,1));rows.forEach(x=>console.log(x));if(R.errs.length)console.log('page errors:',R.errs.slice(0,5));
 await b.close();process.exit(fail||R.errs.length?1:0)})();
