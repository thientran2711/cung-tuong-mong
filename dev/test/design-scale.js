/* ONE DESIGN FRAME + UNIFORM SCALE (KIT §0, owner 16/11 07:47Z + 07:50Z): the one-page view (portrait) must be the spread's page, scaled.
   usage: node dev/test/sw-serve.js 8971 <repo root> &   node dev/test/design-scale.js http://localhost:8971/ <outdir> [shots]
   A. LAYOUT (direct mode at the two design sizes, same seeded game): open Hậu cung (Chí tôn: Hoàng thượng) on the SPREAD 1180x820 and on
      ONE PAGE 590x820; every visible element of the RIGHT page (#panel) is measured relative to the page box; match = same x, y, w, h within
      1 CSS px (xw = same x and width only). Same for the LEFT page (#stage, room home). Mismatches are listed by element.
   B. DEVICES (host mode ?khost=1, real clicks through the transform): 755x1000@2 1180x820@2 1366x1024@2 412x1058@2 390x844@3 844x390@3:
      canvas w/h, pages, scale s, rotation; tab → page → active tab → room on the one-page view; 0 page errors; no overflow in the canvas. */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE0,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const SEED=()=>{let a=20261116;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const LIFE=()=>{try{localStorage.clear()}catch(e){}OPT.fxon=false;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}CLEAN();return S.name};
const CLEAN0=()=>{window.CLEAN=()=>{document.querySelectorAll('[id^=kroul],#dawn,#kload,#kpodov,.kmov').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()}};
/* element rects relative to a page box, keyed by a stable path (tag.class:nth among same-key siblings) */
const RECTS=sel=>{const root=document.querySelector(sel);if(!root||!root.offsetWidth)return null;const R=root.getBoundingClientRect();const out={};
 const key=e=>{const parts=[];for(let x=e;x&&x!==root;x=x.parentElement){const k=x.tagName.toLowerCase()+(x.id?'#'+x.id:'')+'.'+[...x.classList].filter(c=>!/^(on|kgon|k3dim|hot|ok|flash)$/.test(c)).sort().join('.');
   const sib=x.parentElement?[...x.parentElement.children].filter(y=>y.tagName===x.tagName&&y.className===x.className):[];parts.unshift(k+(sib.length>1?':'+sib.indexOf(x):''))}return parts.join('>')};
 for(const e of root.querySelectorAll('*')){if(!e.offsetWidth&&!e.offsetHeight)continue;const r=e.getBoundingClientRect();if(r.bottom<R.top||r.top>R.bottom)continue;
  out[key(e)]=[r.left-R.left,r.top-R.top,r.width,r.height].map(v=>Math.round(v*10)/10)}
 return {box:[R.width,R.height].map(Math.round),els:out}};
function compare(a,b){if(!a||!b)return{err:'missing page'};let n=0,full=0,xw=0;const bad=[];
 for(const k in a){if(!(k in b))continue;n++;const p=a[k],q=b[k];const okx=Math.abs(p[0]-q[0])<=1&&Math.abs(p[2]-q[2])<=1,oky=Math.abs(p[1]-q[1])<=1&&Math.abs(p[3]-q[3])<=1;
  if(okx)xw++;if(okx&&oky)full++;else bad.push({k:k.split('>').slice(-2).join('>'),spread:p,page:q})}
 const onlyA=Object.keys(a).filter(k=>!(k in b)).length,onlyB=Object.keys(b).filter(k=>!(k in a)).length;
 return{common:n,onlySpread:onlyA,onlyPage:onlyB,xw:+(xw/n*100).toFixed(1),full:+(full/n*100).toFixed(1),worst:bad.slice(0,25)}}
async function game(b,W,H,url,D){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D||1,serviceWorkers:'block',hasTouch:!!D,isMobile:W<1100&&!!D});
 await c.addInitScript(SEED);await c.addInitScript(CLEAN0);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});await p.goto(url,{waitUntil:'commit'});return{c,p,errs}}
async function ready(f){await f.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await f.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:180000}).catch(()=>{});await sleep(1500)}
const settle=async f=>{for(let i=0;i<8;i++){await sleep(1200);const had=await f.evaluate(()=>!!document.querySelector('[id^=kroul],#dawn,#kload,#kpodov,.kmov')||Q.length>0||!document.getElementById('modal').hidden);if(!had&&i>2)return;await f.evaluate(()=>CLEAN())}};
const openTab=k=>{CLEAN();const b=document.querySelector(`#tabs [data-kg="${k}"]`)||document.querySelector(`#tabs [data-tab="${k}"]`);b&&b.click()};
(async()=>{const b=await chromium.launch();const R={layout:{},devices:{}};const BASE=BASE0.replace(/\/?$/,'/')+'index.html';
 /* A. layout */
 const M={};for(const [W,H,tag] of [[1180,820,'spread'],[590,820,'page']]){L('A',tag);const {c,p,errs}=await game(b,W,H,BASE+'?khost=0');await ready(p);await p.evaluate(LIFE);await settle(p);/* the whole save (ser/deser: S + rivals + kids …), not only S — rivals are a global, and the two viewports draw a different number of randoms */if(tag==='spread')M.state=await p.evaluate(()=>JSON.stringify(ser()));else{await p.evaluate(j=>{quiet=true;deser(JSON.parse(j));quiet=false;tab='act';CLEAN()},M.state);await settle(p)}
  M[tag]={pages:await p.evaluate(()=>kitView().pages),stage:await p.evaluate(RECTS,'#stage')};
  if(SHOTS)await p.screenshot({path:`${OUT}/A-${tag}-home.jpg`,type:'jpeg',quality:55});
  await p.evaluate(openTab,'rv');await sleep(1500);await settle(p);M[tag].panel=await p.evaluate(RECTS,'#panel');M[tag].who=await p.evaluate(()=>S.name);
  if(SHOTS)await p.screenshot({path:`${OUT}/A-${tag}-hau-cung.jpg`,type:'jpeg',quality:55});M[tag].errs=errs;await c.close()}
 R.layout={sameGame:M.spread.who===M.page.who,pages:[M.spread.pages,M.page.pages],
  right:{boxSpread:M.spread.panel&&M.spread.panel.box,boxPage:M.page.panel&&M.page.panel.box,...compare(M.spread.panel&&M.spread.panel.els,M.page.panel&&M.page.panel.els)},
  left:{boxSpread:M.spread.stage&&M.spread.stage.box,boxPage:M.page.stage&&M.page.stage.box,...compare(M.spread.stage&&M.spread.stage.els,M.page.stage&&M.page.stage.els)},errs:[...M.spread.errs,...M.page.errs]};
 L('A right',JSON.stringify({box:[R.layout.right.boxSpread,R.layout.right.boxPage],xw:R.layout.right.xw,full:R.layout.right.full}),'left',JSON.stringify({box:[R.layout.left.boxSpread,R.layout.left.boxPage],xw:R.layout.left.xw,full:R.layout.left.full}));
 /* B. devices */
 if(process.env.ONLY==='A'){fs.writeFileSync(OUT+'/design-scale.json',JSON.stringify(R,null,1));await b.close();return}
 for(const [W,H,D,tag] of [[755,1000,2,'fold'],[1180,820,2,'ipad'],[1366,1024,2,'ipad-pro'],[412,1058,2,'fold-cover'],[390,844,3,'phone'],[844,390,3,'phone-land']].filter(x=>!process.env.SIZES||process.env.SIZES.split(',').includes(x[3]))){L('B',tag);
  const {c,p,errs}=await game(b,W,H,BASE+'?khost=1',D);await p.waitForSelector('#krotf',{timeout:60000});let f;for(let i=0;i<600&&!f;i++){f=p.frames().find(x=>/krot=1/.test(x.url()));if(!f)await sleep(300)}
  await ready(f);await f.evaluate(LIFE);await settle(f);
  const r={krot:await p.evaluate(()=>window.__krot),view:await f.evaluate(()=>({w:innerWidth,h:innerHeight,kv:kitView(),ovf:document.documentElement.scrollWidth>innerWidth+1}))};
  const click=async(sel)=>{/* r1 note 4: a late "Luân hồi" roulette / dawn overlay must be gone before the tap (timing under load) */for(let i=0;i<10;i++){const had=await f.evaluate(()=>!!document.querySelector('[id^=kroul],#dawn,#kload,#kpodov,.kmov')||Q.length>0);if(!had)break;await f.evaluate(()=>CLEAN());await sleep(400)}const q=await f.evaluate(s=>{const t=document.querySelector(s);if(!t||!t.offsetWidth)return null;const r=t.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]},sel);if(!q)return false;
   const [x,y]=await p.evaluate(([lx,ly])=>{const m=new DOMMatrix(getComputedStyle(document.getElementById('krotf')).transform);const o=m.transformPoint(new DOMPoint(lx,ly));return[o.x,o.y]},q);await p.mouse.click(x,y);await sleep(1200);return true};
  const view=()=>f.evaluate(()=>{const g=document.querySelector('.game');const v=e=>!!(e&&e.offsetWidth&&getComputedStyle(e).visibility!=='hidden');return{stage:v(document.getElementById('stage')),panel:v(document.getElementById('panel')),home:g.classList.contains('k3home')}});
  r.flow=[await view()];await click('#tabs [data-tab="court"]');r.flow.push(await view());await click('#tabs [data-tab="court"]');r.flow.push(await view());
  r.panelSig=await f.evaluate(()=>{const p=document.getElementById('panel');return p&&p.offsetWidth?[p.offsetWidth,p.offsetHeight]:null});
  if(SHOTS)await p.screenshot({path:`${OUT}/B-${tag}-${W}x${H}.jpg`,type:'jpeg',quality:55});r.errs=errs;R.devices[tag]=r;
  L(tag,JSON.stringify({canvas:[r.view.w,r.view.h],pages:r.view.kv.pages,s:r.krot.s,rot:r.krot.rotated,flow:r.flow.map(x=>x.home?'room':x.panel?'page':'?').join('→'),errs:errs.length,ovf:r.view.ovf}));await c.close()}
 fs.writeFileSync(OUT+'/design-scale.json',JSON.stringify(R,null,1));
 const d=R.devices;if(process.env.SIZES){console.log(JSON.stringify(Object.fromEntries(Object.entries(d).map(([k,v])=>[k,v.flow]))));await b.close();return}R.ok={pageCanvas:d.fold.view.w===590&&d.fold.view.h===820&&d.fold.view.kv.pages===1,spread:['ipad','ipad-pro','phone-land','fold-cover','phone'].every(t=>d[t].view.w===1180&&d[t].view.kv.pages===2),
  rotated:d['fold-cover'].krot.rotated&&d.phone.krot.rotated,oneAtATime:d.fold.flow.map(x=>x.home?'room':x.panel?'page':'?').join('→')==='room→page→room',noErrors:Object.values(d).every(x=>!x.errs.length)&&!R.layout.errs.length,rightPageMatch:R.layout.right.full};
 console.log(JSON.stringify(R.ok));await b.close()})();
