/* review/press-fx — owner 15/11 "Whole tab panel bounces on any tap" (LUẬT SỬA CẢ NHÓM scan).
   The press/sink feedback (jfx game-feel, KIT §54) belongs ONLY to the real tappable element under the finger, never to a pane / tab panel /
   container / empty space / text. For every main tab, every sub-tab of its panel and two dialogs, at every viewport, the scan presses (real mouse
   down → up) a grid of EMPTY points (no button / link / input / role=button|tab / data-tab / onclick / pointer cursor under the finger) and lists
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
   for(let i=0;i<Math.min(n,6);i++)states.push({tab:t,sub:i})}
  states.push({dlg:'text'},{dlg:'opts'});
  const enter=async s=>p.evaluate(s=>{Q.length=0;showModal();document.querySelectorAll('.kmov,.kflockwhy,[id^=kroul],#dawn').forEach(e=>e.remove());
   if(s.dlg){Q.push(s.dlg==='text'?{t:'Thử khung',h:'<p>Một đoạn chữ dài để chạm vào chỗ trống trong khung hộp thoại. '.repeat(4)+'</p>'}:{t:'Thử chọn',h:'<p>Chọn một đường.</p>',opts:[{n:'Đường một',fx:{}},{n:'Đường hai',fx:{}}],mustChoose:1});showModal();return 'dlg:'+s.dlg}
   const tb=document.querySelector(`button[data-tab="${s.tab}"]`);if(!tb)return null;tb.click();if(s.sub>=0){const L=[...document.querySelectorAll('#panel [role="tab"],#panel .pct,#panel [data-ksub]')];const x=L[s.sub];if(!x)return null;x.click();return s.tab+'/'+(x.textContent||'').trim().slice(0,14)}return s.tab},s);
  for(const s of states){const nm=await enter(s);if(!nm)continue;await sleep(250);
   const pts=[];const NX=5,NY=6;for(let i=0;i<NX;i++)for(let j=0;j<NY;j++)pts.push([Math.round((i+.5)*W/NX),Math.round((j+.5)*H/NY)]);
   const hits=new Map();let tested=0;
   for(const [x,y] of pts){const e=await p.evaluate(([x,y])=>{const t=__pf.empty(x,y);return t?__pf.name(t):null},[x,y]);if(!e)continue;tested++;
    await p.mouse.move(x,y);await p.mouse.down();await sleep(70);const d=await p.evaluate(([x,y])=>__pf.pressed(x,y),[x,y]);await p.mouse.up();await sleep(60);const u=await p.evaluate(([x,y])=>__pf.pressed(x,y),[x,y]);
    for(const q of d.concat(u)){const k=q.el;const o=hits.get(k)||{el:k,frac:q.frac,how:new Set(),tap:q.tap,at:e};q.how.split('+').forEach(h=>o.how.add(h));hits.set(k,o)}
    /* a tap on empty space may have changed the scene: go back */
    const moved=await p.evaluate(s=>{const M=document.getElementById('modal');return s.dlg?M.hidden:!M.hidden||document.querySelector('.kmov')},s);if(moved){await enter(s);await sleep(200)}}
   for(const o of hits.values()){const big=o.frac>.5,cont=!o.tap;rows.push({vp,state:nm,tested,el:o.el,frac:o.frac,how:[...o.how].join('+'),firstAt:o.at,big,cont,bad:big||cont})}
   if(!hits.size)rows.push({vp,state:nm,tested,el:'-',bad:false})}
  /* real buttons still press */
  const chk=async(sel,label,pre)=>{if(pre)await p.evaluate(pre);await sleep(250);const r=await p.evaluate(sel=>{const e=[...document.querySelectorAll(sel)].find(x=>{const r=x.getBoundingClientRect();return r.width&&r.top>=0&&r.bottom<=innerHeight&&!x.disabled});if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},sel);
   if(!r){ok.push({vp,label,res:'not found'});return}await p.mouse.move(r[0],r[1]);await p.mouse.down();await sleep(70);const d=await p.evaluate(([x,y])=>{const e=document.querySelector('.kfdown');return e?__pf.name(e):null},r);await p.mouse.up();
   ok.push({vp,label,res:d||'NO PRESS'})};
  await chk('#tabs [data-tab]','main tab button',()=>{Q.length=0;showModal()});
  await chk('#panel button.card.ka:not(.kdis),#panel button.ka:not(.kdis)','act card',()=>{Q.length=0;showModal();document.querySelector('button[data-tab="act"]').click()});
  await chk('#modal .opt','dialog option',()=>{Q.length=0;Q.push({t:'Thử chọn',h:'<p>x</p>',opts:[{n:'Đường một',fx:{}},{n:'Đường hai',fx:{}}],mustChoose:1});showModal()});
  if(errs.length)ok.push({vp,label:'page errors',res:errs.slice(0,3).join(' | ')});
  await c.close()}
 await b.close();const bad=rows.filter(r=>r.bad);
 console.log(JSON.stringify({label:LABEL||'',states:new Set(rows.map(r=>r.vp+r.state)).size,bad:bad.length,rows,ok},null,0));process.exit(bad.length||ok.some(o=>/NO PRESS/.test(o.res))?1:0)})();
