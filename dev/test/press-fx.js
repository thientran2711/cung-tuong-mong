/* review/press-fx — owner 15/11 "Whole tab panel bounces on any tap" (LUẬT SỬA CẢ NHÓM scan).
   The press/sink feedback (jfx game-feel, KIT §54) belongs ONLY to the real tappable element under the finger, never to a pane / tab panel /
   container / empty space / text. For every main tab, every sub-tab of its panel and two dialogs, at every viewport, the scan presses (synthetic pointerdown/up — the jfx handler — plus the CSS :active press rules
   matched on every ancestor of the finger) a grid of EMPTY points (no button / link / input / role=button|tab / data-tab / onclick / pointer cursor under the finger) and lists
   every element that got the press: the .kfdown class, a CSS :active scale, or the release bounce animation (scale keyframes).
   FAIL: any element pressed from empty space that is bigger than 50% of the viewport (BIG), or any non-tappable container pressed at all.
   It also checks real buttons still press (main tab button, an act card, a dialog option).
   usage: node dev/test/sw-serve.js <port> <repo root> main=<dir with main's index.html,sw.js,assets.json>   (another shell)
          node dev/test/press-fx.js http://localhost:<port>/ [label]      (GET /__ver/main first to scan the old build) → JSON on stdout */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,BASE,LABEL]=process.argv;const VP=(process.env.VP||'755x1000,1000x755,1180x820,1366x1024,844x390').split(',').map(s=>s.split('x').map(Number));
const NEWLIFE=()=>{window.__nlInner=1;document.querySelectorAll('#kload,[id^=kroul]').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
 Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());render()};
/* in-page helpers (installed once per page) */
const HELP=()=>{window.__pf={
 real:'button,a[href],input,select,textarea,label,summary,.btn,.kbtn,.opt,[role="button"],[role="tab"],[onclick],canvas,#me,#emp,.tok',
 empty(x,y){const t=document.elementFromPoint(x,y);if(!t)return null;for(let e=t;e&&e!==document.documentElement;e=e.parentElement){if(e.matches(this.real))return null;if(getComputedStyle(e).cursor==="pointer")return null}return t},
 probe(pts){const A=innerWidth*innerHeight,hits=new Map();let tested=0;
  const act=[];for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(x){continue}for(const r of rs)if(r.selectorText&&/:active/.test(r.selectorText)&&r.style&&(r.style.scale||/scale/.test(r.style.transform||'')))act.push(r.selectorText.replace(/:active/g,':not(#__none)'))}
  const add=(e,how,at)=>{const r=e.getBoundingClientRect();const k=this.name(e);const o=hits.get(k)||{el:k,frac:+(r.width*r.height/A).toFixed(2),how:[],tap:e.matches(this.real)||getComputedStyle(e).cursor==='pointer',at};if(!o.how.includes(how))o.how.push(how);hits.set(k,o)};
  for(const [x,y] of pts){const t=this.empty(x,y);if(!t)continue;tested++;const at=this.name(t);
   const o={bubbles:true,cancelable:true,composed:true,clientX:x,clientY:y,button:0,buttons:1,pointerId:1,pointerType:'mouse',isPrimary:true};
   t.dispatchEvent(new PointerEvent('pointerdown',o));for(const e of document.querySelectorAll('.kfdown'))add(e,'kfdown',at);
   for(let e=t;e&&e!==document.documentElement;e=e.parentElement){if(act.some(sel=>{try{return e.matches(sel)}catch(x){return false}}))add(e,'css:active',at)}
   t.dispatchEvent(new PointerEvent('pointerup',Object.assign({},o,{buttons:0})));
   for(const a of document.getAnimations())try{if(a.effect&&a.effect.target&&a.effect.getKeyframes().some(k=>k.scale!=null)&&a.effect.target.isConnected){add(a.effect.target,'bounce',at);a.cancel()}}catch(x){}
   document.querySelectorAll('.kfrip').forEach(e=>e.remove())}
  return {tested,hits:[...hits.values()]}},
 name(e){return e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.classList.length?'.'+[...e.classList].filter(c=>c!=='kfdown').slice(0,3).join('.'):'')},
 pressed(x,y){const A=innerWidth*innerHeight,out=[],seen=new Set();const C=new Set(document.querySelectorAll('.kfdown'));
  for(let e=document.elementFromPoint(x,y);e&&e!==document.documentElement;e=e.parentElement)C.add(e);
  for(const a of document.getAnimations())try{if(a.effect&&a.effect.target&&a.effect.getKeyframes().some(k=>k.scale!=null))C.add(a.effect.target)}catch(x){}
  for(const e of C){const r=e.getBoundingClientRect();if(!r.width)continue;
   const cs=getComputedStyle(e);const sc=cs.scale&&cs.scale!=='none'&&cs.scale!=='1';const kd=e.classList.contains('kfdown');
   const an=e.getAnimations?e.getAnimations().some(a=>{try{return a.effect&&a.effect.getKeyframes().some(k=>k.scale!=null)}catch(x){return false}}):false;
   if(kd||sc||an)out.push({el:this.name(e),frac:+(r.width*r.height/A).toFixed(2),how:[kd&&'kfdown',sc&&'scale',an&&'bounce'].filter(Boolean).join('+'),tap:e.matches(this.real)||getComputedStyle(e).cursor==='pointer'})}
  return out}}};
(async()=>{const b=await chromium.launch();const rows=[];const ok=[];
 for(const [W,H] of VP){const c=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:false});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitGain,null,{timeout:180000});await sleep(1500);
  await p.evaluate(NEWLIFE);await sleep(2500);await p.evaluate(()=>{document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());Q.length=0;showModal()});await p.evaluate(HELP);await sleep(400);
  const vp=`${W}x${H}`;
  /* states: every main tab × its sub-tabs; then two dialogs */
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('button[data-tab]')].filter((x,i,a)=>a.indexOf(x)===i&&x.offsetParent).map(x=>x.dataset.tab));
  const states=[];for(const t of tabs){states.push({tab:t,sub:-1});
   const n=await p.evaluate(t=>{document.querySelector(`button[data-tab="${t}"]`).click();return document.querySelectorAll('#panel [role="tab"],#panel .pct,#panel [data-ksub]').length},t);await sleep(150);
   for(let i=0;i<Math.min(n,8);i++)states.push({tab:t,sub:i})}
  states.push({dlg:'text'},{dlg:'opts'});
  const enter=async s=>p.evaluate(s=>{Q.length=0;showModal();document.querySelectorAll('.kmov,.kflockwhy,[id^=kroul],#dawn').forEach(e=>e.remove());
   if(s.dlg){Q.push(s.dlg==='text'?{t:'Thử khung',h:'<p>Một đoạn chữ dài để chạm vào chỗ trống trong khung hộp thoại. '.repeat(4)+'</p>'}:{t:'Thử chọn',h:'<p>Chọn một đường.</p>',opts:[{n:'Đường một',fx:{}},{n:'Đường hai',fx:{}}],mustChoose:1});showModal();return 'dlg:'+s.dlg}
   const tb=document.querySelector(`button[data-tab="${s.tab}"]`);if(!tb)return null;tb.click();if(s.sub>=0){const L=[...document.querySelectorAll('#panel [role="tab"],#panel .pct,#panel [data-ksub]')];const x=L[s.sub];if(!x)return null;x.click();return s.tab+'/'+(x.textContent||'').trim().slice(0,14)}return s.tab},s);
  for(const s of (process.env.SCAN==='0'?[]:states)){const nm=await enter(s);if(!nm)continue;await sleep(250);
   const pts=[];const NX=6,NY=8;for(let i=0;i<NX;i++)for(let j=0;j<NY;j++)pts.push([Math.round((i+.5)*W/NX),Math.round((j+.5)*H/NY)]);
   const R=await p.evaluate(pts=>__pf.probe(pts),pts);const tested=R.tested;const hits=new Map(R.hits.map(o=>[o.el,o]));
   await p.evaluate(()=>{document.querySelectorAll('.kfdown').forEach(e=>e.classList.remove('kfdown'))});
   for(const o of hits.values()){const big=o.frac>.5,cont=!o.tap;rows.push({vp,state:nm,tested,el:o.el,frac:o.frac,how:o.how.join('+'),firstAt:o.at,big,cont,bad:big||cont})}
   console.error(vp,nm,tested,hits.size)
   if(!hits.size)rows.push({vp,state:nm,tested,el:'-',bad:false})}
  /* real buttons still press */
  const chk=async(sel,label,pre)=>{if(pre)await p.evaluate(pre);await sleep(900);const r=await p.evaluate(sel=>{const L=[...document.querySelectorAll(sel)].filter(x=>x.getBoundingClientRect().width&&!x.disabled);let e=L.find(x=>{const r=x.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight});
   /* r1: phones / portrait put the act list below the fold: scroll the first one into view instead of reporting 'not found' */
   if(!e&&L[0]){e=L[0];e.scrollIntoView({block:'center'})}if(!e)return null;const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;
   /* a result card / reward left by the previous check's tap covers it: move it out of the way (test artefact, not the game) */
   for(let i=0;i<6;i++){const t=document.elementFromPoint(x,y);if(!t||e.contains(t))break;let c=t;while(c.parentElement&&c.parentElement!==document.body&&!c.parentElement.contains(e))c=c.parentElement;c.style.display='none'}
   return [x,y]},sel);
   if(!r){ok.push({vp,label,res:'not found'});return}await p.mouse.move(r[0],r[1]);await p.mouse.down();await sleep(70);const d=await p.evaluate(([x,y])=>{const e=document.querySelector('.kfdown');return e?__pf.name(e):null},r);
   const why=d?'':await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y);return e?__pf.name(e):'-'},r);await p.mouse.up();ok.push({vp,label,res:d||('NO PRESS under '+why)})};
  /* r1 (owner 16/11 "Nút tắt bị che"): the room person card's ✕ (#popx) is on top in every tab, panel and card scrolled to the end */
  for(const t of tabs){const r=await p.evaluate(async t=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));Q.length=0;showModal();document.querySelector(`button[data-tab="${t}"]`).click();await sl(200);
   popIdx=null;renderStage();await sl(100);const ps=document.querySelector('#stage [data-p]');if(!ps)return null;popIdx=+ps.dataset.p;renderStage();await sl(700);
   const P=document.getElementById('panel');P.scrollTop=P.scrollHeight;const pc=document.querySelector('#popw .pc');if(pc)pc.scrollTop=pc.scrollHeight;await sl(300);
   const x=document.getElementById('popx');if(!x||!x.offsetParent)return null;const r=x.getBoundingClientRect();const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
   const res=top&&x.contains(top)?'on top':'NO PRESS: ✕ covered by '+(top?__pf.name(top):'-');popIdx=null;renderStage();return res},t);
   if(r)ok.push({vp,label:'✕ on top · '+t,res:r})}
  await chk('#tabs [data-tab]','main tab button',()=>{Q.length=0;showModal()});
  await chk('#modal .opt','dialog option',()=>{Q.length=0;Q.push({t:'Thử chọn',h:'<p>x</p>',opts:[{n:'Đường một',fx:{}},{n:'Đường hai',fx:{}}],mustChoose:1});showModal()});
  await chk('#panel button.card.ka:not(.kdis),#panel button.ka:not(.kdis)','act card',()=>{Q.length=0;showModal();document.querySelector('button[data-tab="act"]').click();const all=document.querySelector('#panel .kcattabs [data-kcat="all"]');if(all)all.click()});
  if(errs.length)ok.push({vp,label:'page errors',res:errs.slice(0,3).join(' | ')});
  await c.close()}
 await b.close();const bad=rows.filter(r=>r.bad);
 console.log(JSON.stringify({label:LABEL||'',states:new Set(rows.map(r=>r.vp+r.state)).size,bad:bad.length,rows,ok},null,0));process.exit(bad.length||ok.some(o=>/NO PRESS/.test(o.res))?1:0)})();
