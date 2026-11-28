/* ===== KIT «VÒNG BẢO VẬT» kitRingItem — the ITEM ring of the one new animation kit (owner OD 26/11 ~18:50Z, ~18:55Z, ~19:00Z; MOTION-BUILD, review/motion-bao-vat) =====
   Same motion language as the person / group ring (kitRing, RING-BUILD jkring.js): items stand on a rotating ring, the FRONT item is BRIGHT = the centre, the rest DIM;
   spin by swipe (inertia) or ‹ ›, tap a side item = it turns to the front; tap the bright item → it ZOOMS big to the LEFT, its kit info + the caller's action buttons DROP
   on the RIGHT (Tặng / Dùng / Mua / Bán / Đeo …); an action runs the game's real function and its RESULT shows IN PLACE as kit result rows («không» rows kept).
   Ring maths (angle per slot, depth scale, front/far, inertia, snap) = the mock maths of motion-design-4 mẫu 2 / RING-DESIGN (ONE ring maths; on merge with jkring.js the
   KRING_MATH block is the shared core). Motion = transform + opacity only (60 fps; no animated filter / layout). Calm (reduced motion / Gọn) = no tweening, same flow.
   API  kitRingItem.open(o) → R      o = {
     title, sub, bg (scene picture), key,
     tabs:[{k,label,n}], tab, onTab(k) → re-read items,
     items: [] | ()=>[]   item = {id, src, src512, name, grade, qty, sub, lock (true/why), mark, lux, ref (kitItemRef arg for the kit info), rows (extra html)},
     info:(it)=>html      (default: kinlDetail / kitItemDetail of it.ref),
     acts:(it)=>[{n, main, off:"why", q:{max}, fn:(it,q)=>result}]   result = {ok, title, rows:[{k:"duoc"|"mat"|"note", label, items:[html]}]} | "close" | null,
     empty: html, onClose }
   R = {el, rot, front(), turnTo(i), focus(), back(), refresh(), close()}.  kitRingItem.cur = the open ring.  Wiring (adapters) at the end of this file. */
/* tw = the FRONT tile size in px (MAIN look note 26/11: front ≈1.5× the old 82 px, more on iPad); side tiles keep the old size curve (side = old kitItem md 72 px) */
const KIT_RINGI={tw:{fold:124,ipad:150},side:72,big:{fold:2.0,ipad:2.0},dim:.42,farHide:.5,ry:{fold:.085,ipad:.075},rx:{fold:.40,ipad:.34},cy:{fold:.52,ipad:.56},
 openMs:420,focusMs:520,dropMs:360,stagger:26,/* K-RING-ALL (law 6c, KK59): no item cap — every real item stands on the ring (the ring shows KRING_MATH.seats at a time; the rest come round by spin / ‹ ›) */
 /* a TEXT tile (kit title plate, it.tile): law 10 one size on every device = the plate text at plateRem; depth shrinks it only by plateDepth of the picture curve (side plates stay readable) */plateRem:1.6,plateDepth:.4};
/* ---------- ring maths = KRING_MATH (§104.1, jkring.js; numbers in BAL.kring) — KK44 ruling 26/11: ONE core, KRING_MATH deleted ---------- */
function kriCalm(){try{return(typeof reducedMotion==="function"&&reducedMotion())||(typeof kfStill==="function"&&kfStill())}catch(e){return false}}
function kriE(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function kriIp(){return document.documentElement.classList.contains("kv2")}
(function(){const st=document.createElement("style");st.id="kri-css";st.textContent=`
.kri{touch-action:none;user-select:none;-webkit-user-select:none}
.kri .kscn-bg{filter:blur(2px) brightness(.9)!important}.kri .kscn-veil{opacity:.5}
.kri-top{position:absolute;left:0;right:0;top:0;z-index:60;display:flex;align-items:center;gap:8px;padding:8px 10px 0 12px;pointer-events:none}
.kri-top>*{pointer-events:auto}
.kri-tt{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;align-items:flex-start}
.kri-tt .kptitle{font-family:var(--display);font-size:1.12rem;color:#fff6e4;text-shadow:0 1px 3px #0009;line-height:1.2}
.kri-tt small{color:#f2e3c6;font-size:.8rem;text-shadow:0 1px 2px #0008}
.kri-tabs{position:absolute;left:12px;right:12px;z-index:60;display:flex;justify-content:center;margin:0}
.kri-tabs .pctabs{margin:0;background:#fffaf0e6;border-radius:10px;padding:2px}
.kri-ring{position:absolute;width:0;height:0;z-index:40;pointer-events:none}
.kri-t{position:absolute;left:0;top:0;transform-origin:50% 50%;will-change:transform,opacity;pointer-events:auto;cursor:pointer}
.kri-t .kitem{pointer-events:none}
.kri-t .kitn{display:none}.kri-t:not(.kri-front) .kgchip{opacity:0}
.kri-t.kri-lock .kitem{opacity:.62}
.kri-band{position:absolute;left:0;right:0;z-index:35;touch-action:none}
.kri-ar{position:absolute;z-index:45;padding:0!important;font-size:1.5rem!important;line-height:1!important}
.kri-name{position:absolute;z-index:46;left:50%;transform:translateX(-50%);max-width:80%;text-align:center;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:2px}
.kri-name b{font-family:var(--display);font-size:1.05rem;background:#fffaf0f0;border-radius:10px;padding:3px 12px;box-shadow:0 2px 8px #0004;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.kri-gr{display:inline-block;padding:0 6px;border-radius:6px;background:#fffaf0;color:var(--gc);font-weight:700;text-shadow:none;margin-right:4px}
.kri-name small{font-size:.78rem;color:#fff3dc;text-shadow:0 1px 2px #000a}
.kri-hint{position:absolute;z-index:46;left:50%;transform:translateX(-50%);font-size:.8rem;color:#fff3dc;text-shadow:0 1px 2px #000a;pointer-events:none;white-space:nowrap}
/* K-RING-SUBLINE (KK62): the hint is the LAST child of the name block — it follows the real text height by layout, never by a measured top (a JS top missed late height changes: Fold cover Dâng quà front 11, 11 px over). min-height = the old +58 px floor + the hint line */
.kri-name{min-height:76px}.kri-name>.kri-hint{position:static;transform:none;margin-top:auto;padding-top:4px}
.kri-big{position:absolute;z-index:50;left:0;top:0;transform-origin:50% 50%;will-change:transform,opacity;pointer-events:none}
.kri-glow{position:absolute;z-index:49;pointer-events:none;border-radius:50%;background:radial-gradient(circle,rgba(255,226,150,.9),rgba(255,226,150,.35) 45%,rgba(255,226,150,0) 70%);will-change:opacity,transform;opacity:0}
.kri-pane{position:absolute;z-index:55;display:flex;flex-direction:column;gap:8px;min-height:0;will-change:transform,opacity}
.kri-pane.dlg{margin:0;max-width:none;padding:10px 12px 12px}
.kri-pane .kri-body{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;display:flex;flex-direction:column;gap:8px}
.kri-acts{display:flex;flex-wrap:wrap;gap:8px;flex:none}
.kri-acts .kbtn{flex:1 1 calc(50% - 4px);min-width:0}
.kri-acts .kbtn.kri-main{flex-basis:100%}
.kri-acts .kbtn:disabled{filter:grayscale(1);opacity:.55}
.kri-q{display:flex;align-items:center;justify-content:center;gap:10px;flex:none}
.kri-q .kbtn{min-height:0;height:34px;width:34px;padding:0;font-size:1.1rem;flex:none}
.kri-q b{min-width:2em;text-align:center;font-size:1.05rem}
.kri-res .kb{display:flex;flex-direction:column;gap:4px}
.kri-res .kat{display:flex;align-items:center;gap:8px}
.kri-res .seal{font-family:var(--display)}
.kri-back{flex:none}
.kri-empty{position:absolute;z-index:46;left:50%;top:45%;transform:translate(-50%,-50%);max-width:80%;background:#fffaf0f0;border-radius:12px;padding:12px 16px;text-align:center}
`;document.head.appendChild(st)})();
const kitRingItem={cur:null,
 open(o){o=o||{};kitRingItem.close(true);if(typeof kitScene!=="object")return null;const ip=kriIp(),K=ip?"ipad":"fold";
  const Sc=kitScene.open({bg:o.bg||(typeof IMG_U==="function"?IMG_U("img/ngu-hoa-vien.webp"):"")});const L=Sc.L;L.classList.add("kri");document.body.classList.add("kring-on");
  const g=L.g,w=g.w,H=g.H;const R={o,Sc,L,ip,K,w,H,rot:0,v:0,tiles:[],items:[],st:"ring",busy:0,tab:o.tab};kitRingItem.cur=R;
  const top=document.createElement("div");top.className="kri-top";top.innerHTML=`<div class="kri-tt"><span class="kptitle">${kriE(o.title||"")}</span>${o.sub?`<small>${o.sub}</small>`:""}</div>${typeof kitXHTML==="function"?kitXHTML('data-kri="x"',"Lui"):'<button class="kit-x" data-kri="x">✕</button>'}`;L.appendChild(top);R.top=top;
  top.querySelector('[data-kri="x"]').addEventListener("click",e=>{e.stopPropagation();if(R.st==="focus"&&!o.oneStep)kriBack(R);else kitRingItem.close()});
  if(o.tabs&&o.tabs.length>1){const t=document.createElement("div");t.className="kri-tabs";t.style.top=(top.offsetHeight+6)+"px";L.appendChild(t);R.tabsEl=t;kriTabs(R)}
  /* the geometry */R.geo=()=>{const tw=KIT_RINGI.tw[K];const top0=(R.tabsEl?R.tabsEl.offsetTop+R.tabsEl.offsetHeight:top.offsetHeight)+8;const cy=Math.max(top0+tw*1.3,H*KIT_RINGI.cy[K]);
   return{tw,cx:w/2,cy,Rx:Math.min(w*KIT_RINGI.rx[K],ip?400:300),Ry:H*KIT_RINGI.ry[K],top0}};
  kriBuild(R,true);kriBand(R);
  L.animate([{opacity:0},{opacity:1}],{duration:kriCalm()?120:300,easing:"ease-out",fill:"both"});
  return kitRingItem.api(R)},
 api(R){return{el:R.L,get rot(){return R.rot},front:()=>KRING_MATH.front(R.rot,R.tiles.length),turnTo:i=>kriTurnTo(R,i),focus:()=>kriFocus(R),back:()=>kriBack(R),refresh:()=>kriRefresh(R),close:()=>kitRingItem.close(),get state(){return R.st},get items(){return R.items}}},
 front(){const R=kitRingItem.cur;return R?KRING_MATH.front(R.rot,R.tiles.length):-1},
 close(now){const R=kitRingItem.cur;if(!R)return;kitRingItem.cur=null;cancelAnimationFrame(R.raf||0);document.body.classList.remove("kring-on");const cb=R.o.onClose;
  try{if(kitScene.cur&&kitScene.cur.L===R.L)kitScene.close(now);else R.L.remove()}catch(e){try{R.L.remove()}catch(x){}}if(cb)try{cb()}catch(e){console.error("kri close",e)}}};
function kriItems(R){let L=[];try{L=typeof R.o.items==="function"?R.o.items(R.tab):(R.o.items||[])}catch(e){console.error("kri items",e)}return (L||[]).filter(Boolean)}
function kriTabs(R){const o=R.o;R.tabsEl.innerHTML=`<div class="pctabs kcattabs" role="tablist">${typeof kitTabRowHTML==="function"?kitTabRowHTML(o.tabs,R.tab,'data-kritab'):o.tabs.map(t=>`<button class="pct${t.k===R.tab?" on":""}" data-kritab="${t.k}">${kriE(t.label)}</button>`).join("")}</div>`;
 R.tabsEl.querySelectorAll("[data-kritab]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const k=b.dataset.kritab||b.getAttribute("data-kritab");if(!k||k===R.tab)return;R.tab=k;try{o.onTab&&o.onTab(k)}catch(x){}if(R.st==="focus")kriBack(R,true);R.rot=0;kriTabs(R);kriBuild(R,true)}))}
/* ---------- build / place the ring ---------- */
function kriBuild(R,bloom){const g=R.geo();R.items=kriItems(R);if(R.ring)R.ring.remove();[R.arL,R.arR,R.nameEl,R.hint,R.emptyEl].forEach(e=>e&&e.remove());
 const ring=document.createElement("div");ring.className="kri-ring";ring.style.left=g.cx+"px";ring.style.top=g.cy+"px";R.L.appendChild(ring);R.ring=ring;
 if(!R.items.length){const e=document.createElement("div");e.className="kri-empty";e.innerHTML=R.o.empty||"Chưa có món nào.";R.L.appendChild(e);R.emptyEl=e;R.tiles=[];return}
 R.plateW=0;R.tiles=R.items.map((it,i)=>{const t=document.createElement("div");t.className="kri-t"+(it.lock?" kri-lock":"");t.style.width=g.tw+"px";
  /* it.tile = a kit html for the tile (title plates · faces) instead of kitItem */
  t.innerHTML=it.tile?it.tile:typeof kitItem==="function"?kitItem({src:it.src,name:it.name,grade:it.grade,qty:it.qty>1?it.qty:0,lux:it.lux,mark:it.mark,size:"md"}):`<img src="${kriE(it.src)}" alt="">`;if(it.tile)t.classList.add("kri-tile");
  const ki=t.firstElementChild;if(ki&&ki.classList&&ki.classList.contains("kitem"))ki.style.setProperty("--isz",g.tw+"px");ring.appendChild(t);t.__i=i;return t});
 const mk=(txt,css,fn,lab)=>{const b=document.createElement("button");b.type="button";b.className="kbtn alt kri-ar";b.textContent=txt;b.setAttribute("aria-label",lab);b.style.cssText=css;b.addEventListener("click",e=>{e.stopPropagation();fn()});R.L.appendChild(b);return b};
 const ab=R.ip?46:42,ay=g.cy-ab/2;R.arL=mk("‹",`left:${Math.max(6,g.cx-g.Rx-g.tw*.55-ab)}px;top:${ay}px;width:${ab}px;height:${ab}px;min-height:${ab}px`,()=>kriTurnBy(R,-1),"Quay trái");
 R.arR=mk("›",`left:${Math.min(R.w-ab-6,g.cx+g.Rx+g.tw*.55)}px;top:${ay}px;width:${ab}px;height:${ab}px;min-height:${ab}px`,()=>kriTurnBy(R,1),"Quay phải");
 const nm=document.createElement("div");nm.className="kri-name";nm.style.top=(g.cy+g.tw*.95)+"px";R.L.appendChild(nm);R.nameEl=nm;
 const hi=document.createElement("div");hi.className="kri-hint";hi.textContent="Vuốt để xoay · chạm món sáng để xem";nm.appendChild(hi);R.hint=hi;
 kriPlace(R);
 if(bloom&&!kriCalm()){const N=R.tiles.length;R.tiles.forEach((t,i)=>{const fin=t.style.transform,op=t.style.opacity;t.animate([{transform:`translate(${-g.tw/2}px,${-g.tw*.6}px) scale(.1)`,opacity:0},{transform:fin,opacity:op}],{duration:KIT_RINGI.openMs,delay:i*KIT_RINGI.stagger,easing:"cubic-bezier(.2,1.25,.4,1)"})});
  [R.arL,R.arR,nm,hi].forEach(b=>b.animate([{opacity:0},{opacity:1}],{duration:260,delay:280,fill:"backwards"}))}}
function kriPlace(R){const N=R.tiles.length;if(!N)return;const g=R.geo();let fi=KRING_MATH.front(R.rot,N);
 R.tiles.forEach((t,i)=>{const m=KRING_MATH.slot(i,R.rot,N);const T=KRING_MATH.tier(m.a);let sc=T.sc;/* owner 21:45Z: the 3 size tiers of the ring core (BAL.kring), same as vòng người */let Rx=g.Rx;if(t.classList.contains("kri-tile")){sc=1-(1-sc)*KIT_RINGI.plateDepth;/* a wide text plate stays inside the stage: the ring narrows by the widest plate (+ the ‹ › room) */const pw=R.plateW||(R.plateW=Math.max(0,...R.tiles.map(x=>{const k=x.querySelector(".kdh");return k?k.offsetWidth:0})));Rx=Math.max(40,Math.min(Rx,g.cx-56-pw/2))}const x=Rx*m.s,y=-g.Ry*m.c;
  t.style.transform=`translate(${(x-g.tw/2).toFixed(1)}px,${(y-g.tw*.6).toFixed(1)}px) scale(${sc.toFixed(3)})`;
  const front=Math.abs(m.a)<.5;const op=m.hide?0:Math.min(1,(1-T.dim*(1-KIT_RINGI.dim))*Math.min(1,(KRING_MATH.seats/2-Math.abs(m.a))));/* dim tiers: L none, M light, S = KIT_RINGI.dim */t.style.opacity=op.toFixed(3);t.style.visibility=op<.02?"hidden":"";t.style.zIndex=Math.round(100+m.c*50);t.classList.toggle("kri-front",front)});
 if(R.nameEl&&R.__nf!==fi){R.__nf=fi;const it=R.items[fi];const G=typeof KIT_GRADE!=="undefined"?KIT_GRADE[Math.max(0,Math.min(4,it.grade|0))]:null;
  R.nameEl.innerHTML=`<b>${kriE(it.name)}</b><small>${G&&G.n?`<span class="kri-gr" style="--gc:${G.c||"#888"}">${kriE(G.n)}</span> `:""}${kriE(it.sub||"")}</small>`;
  /* K-RING-SUBLINE (KK61): the hint goes under the name block's REAL height (a sub line that wraps to 2–3 lines on Fold overlapped the fixed +58 px hint) */
  kriHintAt(R)}}
/* K-RING-SUBLINE (KK61 → KK62): the name block is refilled on every front change; the hint goes back in as its last child (layout keeps it under the text) */
function kriHintAt(R){try{if(R.hint&&R.nameEl&&R.hint.parentNode!==R.nameEl||R.hint&&R.nameEl&&R.nameEl.lastChild!==R.hint)R.nameEl.appendChild(R.hint)}catch(e){}}
/* ---------- spin: swipe with inertia, ‹ ›, tap a side item, tap the bright item ---------- */
function kriBand(R){const L=R.L;let x0=0,y0=0,last=0,lt=0,drag=0,moved=0;
 const step=()=>{const g=R.geo(),N=Math.max(3,Math.min(KRING_MATH.seats,R.tiles.length));return g.Rx*2*Math.PI/N*.75};
 L.addEventListener("pointerdown",e=>{if(R.st!=="ring"||!R.tiles.length||e.target.closest("button,.kri-pane,.kri-tabs"))return;drag=1;moved=0;x0=last=e.clientX;y0=e.clientY;lt=performance.now();R.v=0;cancelAnimationFrame(R.raf||0)});
 L.addEventListener("pointermove",e=>{if(!drag)return;const now=performance.now(),dx=e.clientX-last;if(Math.abs(e.clientX-x0)>6)moved=1;if(!moved)return;R.rot-=dx/step();R.v=-(dx/step())/Math.max(1,now-lt);last=e.clientX;lt=now;kriPlace(R)});
 const up=e=>{if(!drag)return;drag=0;if(!moved){const t=document.elementsFromPoint(e.clientX,e.clientY).find(x=>x.classList&&x.classList.contains("kri-t"));if(t){const i=t.__i;if(i===KRING_MATH.front(R.rot,R.tiles.length)&&Math.abs(KRING_MATH.short(i,R.rot,R.tiles.length))<.5)kriFocus(R);else kriTurnTo(R,i)}return}kriFling(R,R.v)};
 L.addEventListener("pointerup",up);L.addEventListener("pointercancel",up);
 L.addEventListener("keydown",e=>{if(R.st!=="ring")return;if(e.key==="ArrowLeft")kriTurnBy(R,-1);else if(e.key==="ArrowRight")kriTurnBy(R,1);else if(e.key==="Enter")kriFocus(R)});L.tabIndex=-1}
function kriLoop(R,fn){cancelAnimationFrame(R.raf||0);let lt=performance.now();const f=now=>{const dt=Math.min(48,now-lt);lt=now;if(fn(dt)!==false)R.raf=requestAnimationFrame(f);else R.raf=0};R.raf=requestAnimationFrame(f)}
function kriTween(R,to,ms){if(kriCalm()||ms<=0){R.rot=to;kriPlace(R);return Promise.resolve()}const from=R.rot,t0=performance.now();return new Promise(res=>kriLoop(R,()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,3);R.rot=from+(to-from)*e;kriPlace(R);if(k>=1){res();return false}}))}
function kriFling(R,v){if(kriCalm())return kriTween(R,Math.round(R.rot),0);R.v=v;return new Promise(res=>kriLoop(R,dt=>{R.rot+=R.v*dt;R.v*=Math.pow(KRING_MATH.decay,dt/16.67);kriPlace(R);if(Math.abs(R.v)<KRING_MATH.stop){kriTween(R,Math.round(R.rot),KRING_MATH.snapMs).then(res);return false}}))}
function kriTurnBy(R,d){if(R.st!=="ring"||!R.tiles.length)return;return kriTween(R,Math.round(R.rot)+d,KRING_MATH.stepMs)}
function kriTurnTo(R,i){const N=R.tiles.length;if(!N)return;const d=KRING_MATH.short(i,R.rot,N);return kriTween(R,R.rot+d,Math.min(700,220+Math.abs(d)*90))}
/* ---------- focus: the bright item zooms big to the LEFT, info + buttons drop on the RIGHT ---------- */
async function kriFocus(R){if(R.st!=="ring"||R.busy||!R.tiles.length)return;R.busy=1;await kriTween(R,Math.round(R.rot),120);
 /* KIT-KRI-XL (Foreman F «kriFocus TypeError reading 'tile'», 2/13 lives): the front index is read AFTER the snap — the list may have been rebuilt meanwhile (kriBack / kriRefresh / a tab: an item given or sold away), and an old index past the new end gave it = undefined */
 if(kitRingItem.cur!==R||R.st!=="ring"||!R.tiles.length){R.busy=0;return}const N=R.tiles.length,fi=KRING_MATH.front(R.rot,N);
 const it=R.items[fi],t=R.tiles[fi];if(!it||!t){R.busy=0;return}const g=R.geo(),calm=kriCalm();R.st="focus";R.fi=fi;
 const sc0=1.12,bigS=KIT_RINGI.big[R.K];const colW=R.ip?R.w*.42:R.w*.44,lx=colW/2,ly=Math.max(g.top0+g.tw*bigS*.62,R.H*.44);
 const big=document.createElement("div");big.className="kri-big";big.style.width=g.tw+"px";big.innerHTML=it.tile?(it.tileBig||it.tile):typeof kitItem==="function"?kitItem({src:it.src512||it.src,name:it.name,grade:it.grade,qty:it.qty>1?it.qty:0,lux:it.lux,mark:it.mark,size:"md"}):"";
 R.L.appendChild(big);R.big=big;const gl=document.createElement("div");gl.className="kri-glow";const gs=g.tw*bigS*1.5;gl.style.cssText=`width:${gs}px;height:${gs}px;left:${lx-gs/2}px;top:${ly-gs/2}px`;R.L.insertBefore(gl,big);R.glow=gl;
 const from=`translate(${g.cx-g.tw/2}px,${g.cy-g.tw*.6}px) scale(${sc0})`,to=`translate(${lx-g.tw/2}px,${ly-g.tw*.6}px) scale(${bigS})`;big.style.transform=to;t.style.visibility="hidden";
 const E="cubic-bezier(.2,.75,.25,1)",D=calm?0:KIT_RINGI.focusMs;
 if(D){big.animate([{transform:from},{transform:to}],{duration:D,easing:E});gl.animate([{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"none"}],{duration:D,easing:E,fill:"forwards"})}else gl.style.opacity=1;
 /* the ring folds down and away (opacity + transform only) */
 [R.ring,R.arL,R.arR,R.nameEl,R.hint].forEach(e=>{if(!e)return;if(D)e.animate(e===R.ring?[{opacity:1,transform:"none"},{opacity:0,transform:"translateY(70px) scale(.85)"}]:[{opacity:1},{opacity:0}],{duration:D*.8,easing:E,fill:"forwards"});else e.style.opacity=0;e.style.pointerEvents="none"});
 kriPane(R,it);R.busy=0}
function kriPane(R,it,res){if(R.pane)R.pane.remove();const g=R.geo(),o=R.o;const x=R.ip?R.w*.44:R.w*.46,pw=R.w-x-10,top=g.top0,ph=R.H-top-10;
 const p=document.createElement("div");p.className="dlg kpanel kri-pane";p.style.cssText=`left:${x}px;top:${top}px;width:${pw}px;max-height:${ph}px`;
 let info="";try{info=o.info?o.info(it):(it.ref!=null&&typeof kinlDetail==="function"?kinlDetail(it.ref,{key:"kri",noLux:false}):(typeof kitItemDetail==="function"&&it.ref!=null?kitItemDetail(it.ref):""))}catch(e){console.error("kri info",e)}
 if(!info)info=`<div class="kpmain"><b>${kriE(it.name)}</b>${it.sub?`<p>${kriE(it.sub)}</p>`:""}</div>`;
 const acts=res?[]:kriActs(R,it);R.q=1;
 const lock=it.lock&&it.lock!==true?`<p class="kshm"><span class="kwhy">${kriE(it.lock)}</span></p>`:"";
 const qMax=Math.max(0,...acts.map(a=>a.q&&a.q.max||0));
 p.innerHTML=`<div class="kri-body">${res?kriResHTML(res):info+(it.rows||"")+lock}</div>`+
  (qMax>1?`<div class="kri-q"><button type="button" class="kbtn alt" data-kriq="-" aria-label="Bớt một">−</button><b data-kriqn>1</b><button type="button" class="kbtn alt" data-kriq="+" aria-label="Thêm một">+</button></div>`:"")+
  `<div class="kri-acts">${acts.map((a,i)=>`<button type="button" class="kbtn${a.main?" kri-main":" alt"}" data-kria="${i}"${a.off?` disabled title="${kriE(a.off)}"`:""}>${kriE(a.n)}${a.off?`<small class="kwhy"> · ${kriE(a.off)}</small>`:""}</button>`).join("")}`+
  (o.oneStep&&!res?"":`<button type="button" class="kbtn alt kri-back" data-krib="1">${res?"Xem món khác":"‹ Vòng"}</button>`)+`</div>`;
 R.L.appendChild(p);R.pane=p;R.acts=acts;
 p.querySelectorAll("[data-kria]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();kriAct(R,+b.dataset.kria)}));
 const qb=p.querySelectorAll("[data-kriq]");qb.forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();R.q=Math.max(1,Math.min(qMax,R.q+(b.dataset.kriq==="+"?1:-1)));p.querySelector("[data-kriqn]").textContent=R.q;
  p.querySelectorAll("[data-kria]").forEach(x=>{const a=acts[+x.dataset.kria];if(a&&a.label)x.firstChild.textContent=a.label(R.q)})}));
 const bk=p.querySelector("[data-krib]");if(bk)bk.addEventListener("click",e=>{e.stopPropagation();kriBack(R)});
 if(!kriCalm())p.animate([{transform:"translateY(-36px)",opacity:0},{transform:"none",opacity:1}],{duration:KIT_RINGI.dropMs,delay:res?0:KIT_RINGI.focusMs*.45,easing:"cubic-bezier(.2,.9,.3,1.1)",fill:"backwards"});
 [...p.querySelectorAll(".kri-acts>.kbtn")].forEach((b,i)=>{if(!kriCalm()&&!res)b.animate([{transform:"translateY(-18px)",opacity:0},{transform:"none",opacity:1}],{duration:280,delay:KIT_RINGI.focusMs*.45+KIT_RINGI.dropMs*.6+i*60,easing:"cubic-bezier(.2,.9,.3,1.2)",fill:"backwards"})})}
function kriActs(R,it){let A=[];try{A=R.o.acts?R.o.acts(it)||[]:[]}catch(e){console.error("kri acts",e)}return A.filter(Boolean)}
/* the result IN PLACE: the kit result rows (same classes as the §7 / §93.8 result card), «không» rows kept */
function kriResHTML(r){const SL=typeof kitResultSeal==="function"?kitResultSeal(r.ok==null?null:!!r.ok):{cls:"sure",t:"KẾT QUẢ"};
 const rows=(r.rows||[]).filter(Boolean).map(x=>({k:x.k||"note",label:x.label||"",items:(x.items&&x.items.length)?x.items:['<span class="ef n">không</span>']}));
 if(!rows.length)rows.push({k:"note",label:"Ghi chú",items:['<span class="ef n">ta không được gì, cũng không mất gì</span>']});
 return `<div class="karesult kri-res ${SL.cls}"><div class="rt"><span class="kat"><b class="seal">${SL.t}</b><span class="kan">${kriE(r.title||"")}</span></span>${r.sen?`<span class="ksen">${r.sen}</span>`:""}<span class="kb">${rows.map(x=>`<span class="kr kr-${x.k}"><span class="krl">${x.label}</span><span class="krv">${x.items.map((v,j)=>`${j?'<span class="ksep">·</span>':""}<span class="kitem">${/^<span class="ef /.test(v)?v:`<span class="ef ${x.k==="duoc"?"g":x.k==="mat"?"r":"n"}">${v}</span>`}</span>`).join("")}</span></span>`).join("")}</span></div></div>`}
async function kriAct(R,i){const a=R.acts&&R.acts[i];if(!a||a.off||R.busy||R.st!=="focus")return;const it=R.items[R.fi];if(!it)return;/* KIT-KRI-XL: same guard as kriFocus */R.busy=1;let r=null;
 const logs0=kriLogMark(),away0=kriAway(),promise=kriPromise(R);try{r=await a.fn(it,R.q)}catch(e){console.error("kri act",e)}R.busy=0;
 if(!kitRingItem.cur||kitRingItem.cur!==R)return;/* the act closed the ring (a dialog of its own opened) */
 if(r==="close"){kitRingItem.close();return}
 if(r==null){const L=kriLogSince(logs0);r={ok:null,title:a.n+" · "+it.name,rows:[{k:"note",label:"Ghi chú",items:L}]}}
 r=kriPending(r,away0,promise);
 /* the item flies a little (the act happened), then the result rows replace the info, the ring list refreshes behind */
 if(R.big&&!kriCalm())R.big.animate([{transform:R.big.style.transform},{transform:R.big.style.transform+" scale(1.08)"},{transform:R.big.style.transform}],{duration:420,easing:"ease-out"});
 kriPane(R,it,r);try{render()}catch(e){}}
/* the act's real changes as kit result rows: her stats (j1 NAMES), the person's thiện cảm (aff), items in / out of Tư trang */
function kriSnap(v){const s={};try{for(const k in NAMES)if(typeof S[k]==="number")s[k]=S[k];if(v){s.__aff=typeof aff==="function"?aff(v,S):null}s.__inv=(S.inv||[]).slice()}catch(e){}return s}
/* ONE ROW PER PERSON (MAIN 186 order 28/11 ~06:35Z; iPad ring gift to the queen read «Hoàng hậu → ta: thiện cảm +6 · Lữ Mạn Nhu → ta: thiện cảm +6»):
   her S.hh («Hoàng hậu → ta») / S.th («Thái hậu → ta») IS the receiver's thiện cảm when the receiver is the queen / Thái hậu — one change, ONE row, named by
   the receiver (who). Same rule as the act result card (j63 kaResultRows: the queen's person row skips "hh"). */
function kriSame(v){const k=new Set();try{if(!v)return k;if(typeof queenP==="function"&&queenP()===v)k.add("hh");if(typeof emoByKey==="function"&&emoByKey("th")===v)k.add("th")}catch(e){}return k}
function kriDiffRows(a,v,who){const b=kriSnap(v),D=[],M=[];try{const one=a.__aff!=null&&b.__aff!=null?kriSame(v):new Set();let dSame=0;
 for(const k in a){if(k.startsWith("__"))continue;const d=Math.round((b[k]||0)-(a[k]||0));if(!d)continue;if(one.has(k)){dSame=dSame||d;continue}(d>0?D:M).push(`${NAMES[k]||k} ${d>0?"+":""}${d}`)}
 if(a.__aff!=null&&b.__aff!=null){const d=Math.round(b.__aff-a.__aff)||dSame;if(d)(d>0?D:M).push(`${kriE(who||"Người nhận")} → ta: thiện cảm ${d>0?"+":""}${d}`)}
 const nm=e=>{try{return typeof giftName==="function"?giftName(e):(IT[e.k]||{}).n||e.k}catch(x){return e.k}};
 a.__inv.filter(e=>!b.__inv.includes(e)).forEach(e=>M.push(kriE(nm(e))));b.__inv.filter(e=>!a.__inv.includes(e)).forEach(e=>D.push(kriE(nm(e))+" vào Tư trang"))}catch(e){}
 return[{k:"duoc",label:"Được",items:D},{k:"mat",label:"Mất",items:M}]}
/* SENT-OFF ACTS (MAIN look note 26/11: «THÀNH · Được: không» while the card promised thiện cảm): an act that sends someone on an errand (jptime ptSend:
   gifts carried by a servant, …) has no result yet. The seal is KẾT QUẢ (not THÀNH), Được = the card's own Được row (what the errand brings when it lands),
   Ghi chú = who went and when they are back (the ptSend notice words). Whole family: every kitRingItem act runs through kriAct → kriPending. */
function kriAway(){try{return (S.away||[]).filter(a=>a.by==="me"&&!a.back).map(a=>a.id)}catch(e){return[]}}
function kriPromise(R){try{const r=R.pane&&R.pane.querySelector(".kr-duoc .krv");return r?[...r.querySelectorAll(":scope > .ef")].map(e=>e.innerHTML):[]}catch(e){return[]}}
function kriPending(r,away0,promise){try{if(!r||typeof r!=="object"||!Array.isArray(r.rows))return r;const N=(S.away||[]).filter(a=>a.by==="me"&&!a.back&&!away0.includes(a.id));if(!N.length)return r;
 r.ok=null;const du=r.rows.find(x=>x.k==="duoc");if(du&&!(du.items||[]).length&&promise.length)du.items=promise.map(x=>r.who?x.replace(/^nàng → ta/,kriE(r.who)+" → ta"):x);
 const W=N.map(a=>`${kriE(a.nm)} đã ${/^đi /.test(a.lbl||"")?kriE(a.lbl):"đi "+kriE(a.lbl||"làm việc")}, về ${typeof ptWhen==="function"?ptWhen(a.due):"sau"}; phần Được đến khi việc xong.`);
 let no=r.rows.find(x=>x.k==="note");if(!no){no={k:"note",label:"Ghi chú",items:[]};r.rows.push(no)}no.items=W.concat((no.items||[]).filter(x=>!/^Tặng quà:/.test(x)))}catch(e){console.error("kri pending",e)}return r}
/* K-GIFT-OUT (KK64): the piece's own name (the ring tile name, as the log lines name it; escaped like kriLogSince lines) and the act's real outcome:
   take → THÀNH · sent (to her: she answers later) → KẾT QUẢ · back / refused / found / caught → BẠI; plantpick: plantItem.out ok / caught;
   tsgiftpick also fails when the receiver keeps her heart closed (the same outcomes); no outcome recorded (a work piece wkGive, an act that is not a gift) → the old reading of its OWN lines */
function kriBaseName(it){try{if(it&&it.name)return kriE(String(it.name).replace(/<[^>]+>/g,"").trim());/* the ring tile name = the piece's own name (a handmade work: its title, never the kind «Tác phẩm tự tay») */const e=it&&it.ref&&it.ref.e;return e?kriE(((typeof itm==="function"?itm(e.k):IT[e.k])||{}).n||""):""}catch(x){return""}}
/* K-GIFT-NOTE (KK65, RV-178 nit a): the game's choice log (j3 logChoice) folds every line of the tick into ONE «Title: choice — s1. s2. summary.» line,
   so a world sentence written in the same tick («… phát hiện … không thành») rode inside the piece's own line. Ghi chú keeps, from each line that
   names the piece, only the sentences that name the piece or the receiver (the stat summary is already the rows above); a line left with no such
   sentence is dropped (the title already names the act). */
function kriNoteLines(L,bn,who){if(!bn)return L;const w=who?kriE(who):"";const out=[];
 for(const x of L){if(!x.includes(bn))continue;const i=x.indexOf(" — ");if(i<0){out.push(x);continue}
  const keep=x.slice(i+3).split(kRx("(?<=[.!?…»”])\\s+")).filter(t=>t.includes(bn)||(w&&t.includes(w)));if(keep.length)out.push(x.slice(0,i)+" — "+keep.join(" "))}
 return out}
function kriGiftOk(pid,L){const o=pid==="plantpick"?(typeof plantItem==="function"?plantItem.out:null):(typeof giveTo==="function"?giveTo.out:null);
 if(o==="take"||o==="ok")return true;if(o==="sent")return null;if(o)return false;return !L.some(x=>/phát hiện|trả lại|từ chối|không nhận|— bại —|không thành|bị bắt/.test(x))}
function kriLogMark(){try{return S.logSeq||0}catch(e){return 0}}
function kriLogSince(n){try{const nw=Math.min(6,(S.logSeq||0)-n);if(nw<=0)return[];const P=typeof plain==="function"?plain:(x=>String(x).replace(/<[^>]+>/g,""));
  return S.logs.slice(0,nw).reverse().map(x=>kriE(P(String(x).replace(/<span class="ld">[^<]*<\/span>/,"")).trim())).filter(Boolean)}catch(e){return[]}}
function kriBack(R,quick){if(R.st!=="focus")return;R.st="ring";R.busy=1;/* KIT-KRI-XL: no focus / act until the ring is rebuilt (done) — a tap in the back animation used the old list */const calm=kriCalm()||quick,D=calm?0:380,g=R.geo();const t=R.tiles[R.fi];
 if(R.pane){const p=R.pane;R.pane=null;if(D)p.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateY(-24px)"}],{duration:D*.7,fill:"forwards"}).onfinish=()=>p.remove();else p.remove()}
 if(R.glow){const gl=R.glow;R.glow=null;if(D)gl.animate([{opacity:1},{opacity:0}],{duration:D,fill:"forwards"}).onfinish=()=>gl.remove();else gl.remove()}
 /* the list may have changed (sold / given / bought): rebuild the ring, keep the front near the same place */
 const big=R.big;R.big=null;const keep=R.items[R.fi]&&R.items[R.fi].id;
 const done=()=>{R.busy=0;if(big)big.remove();const old=R.rot;kriBuild(R,false);const j=R.items.findIndex(x=>x.id===keep);R.rot=j>=0?j:Math.min(Math.round(old),Math.max(0,R.items.length-1));kriPlace(R);
  if(!calm)[R.ring,R.arL,R.arR,R.nameEl,R.hint].forEach(e=>e&&e.animate([{opacity:0},{opacity:1}],{duration:260,fill:"backwards"}))};
 if(big&&D){const to=`translate(${g.cx-g.tw/2}px,${g.cy-g.tw*.6}px) scale(1.12)`;big.animate([{transform:big.style.transform,opacity:1},{transform:to,opacity:.2}],{duration:D,easing:"cubic-bezier(.3,.6,.3,1)",fill:"forwards"}).onfinish=done}else done();if(t)t.style.visibility=""}
function kriRefresh(R){if(R.st==="focus"){const it=R.items[R.fi];if(!it){kriBack(R,true);return}/* KIT-KRI-XL: the focused item left the list */kriPane(R,it)}else{const old=R.rot;kriBuild(R,false);R.rot=Math.min(old,Math.max(0,R.items.length-1));kriPlace(R)}}
try{window.kitRingItem=kitRingItem;window.KRING_MATH=KRING_MATH}catch(e){}
/* ======================= WIRING: every item / treasure picker → kitRingItem (KK44 NEW-KIT FAMILY SCAN §5) ======================= */
function kriOn(){try{return !window.__bot&&!window.__kriOff&&typeof kitScene==="object"&&!!document.querySelector("header.hud")&&!(typeof S!=="undefined"&&S&&S.dead)}catch(e){return false}}
/* the scene picture = the stage she stands on now (place / palace), else her room */
function kriBg(){try{const c=[...document.querySelectorAll("#stage, #stage *")].slice(0,40);for(const e of c){const b=getComputedStyle(e).backgroundImage;const m=b&&b.match(/url\(["']?([^"')]+)/);if(m&&/\.(webp|jpe?g|png)/.test(m[1]))return m[1]}}catch(e){}
 return typeof IMG_U==="function"?IMG_U("img/toil-mirror-room.webp"):"img/toil-mirror-room.webp"}
(function(){const st=document.createElement("style");st.textContent=`#modal.kri-hide{visibility:hidden!important}#modal.kri-hide *{pointer-events:none!important}/* a title plate on the ring: the kit plate (kitTitlePlate) at the ring's tile size — size only */.kri-t.kri-tile{display:flex;justify-content:center}.kri-t.kri-tile .kdh{font-size:${KIT_RINGI.plateRem}rem;max-width:none;white-space:nowrap}.kri.kri-nog .kgchip,.kri.kri-nog .kri-gr{display:none}#kg82.kri-hide{visibility:hidden!important}#kg82.kri-hide *{pointer-events:none!important}`;document.head.appendChild(st)})();
/* ---- (1) jgpick family: giftpick / giftto / plantpick (+ wkgive when it carries items): the #modal dialog stays the engine (every wrapper, cost, odds, item hook);
        the ring is its face. Act = the dialog's own option (chooseM). ---- */
let KRI_DLG=null;
function kriGiftOpen(){const m=Q[0],M=$("modal");if(!m||!M||M.hidden||typeof kipOn!=="function"||!kipOn(m)||KRI_DLG===m)return;KRI_DLG=m;
 const ops=M.querySelector(".opts");const L=m.opts.map((c,i)=>[c,i]).filter(([c,i])=>c&&c.ik!=null&&S.inv[c.ik]&&ops&&ops.querySelector(`.opt[data-m="${i}"]`));
 L.sort((a,b)=>(kipLocked(a[0])-kipLocked(b[0]))||(a[1]-b[1]));M.classList.add("kri-hide");
 const verb=(typeof KIP_VERB!=="undefined"&&KIP_VERB[m.pid])||"Chọn";let V=m.pp&&m.pp.v;try{if(V!=null&&typeof V!=="object")V=(typeof byKey==="function"&&byKey(V))||liveRivals(true).find(x=>x.id===V)||null}catch(e){V=null}
 const who=V&&V.name?(typeof kitKnownName!=="function"||kitKnownName(V)?(typeof rkName==="function"&&V!==S?rkName(V)+" ":"")+V.name/* MAIN 186 ruling 28/11 ~06:44Z: rank title + name, as the card's title and Ghi chú */:""):m.pid==="giftto"?(m.pp&&m.pp.t==="emp"?"Hoàng thượng":m.pp&&m.pp.t==="th"?"Thái hậu":""):"";/* KK62 (RV-176 §7 c): Dâng quà names the receiver from its own pp.t (jgift «Dâng quà lên Hoàng thượng / Thái hậu»), never the dialog title («Dâng cho Dâng quà») */
 /* KIT-KRI-XL (E-S5 kipgo-ui3 «re-opened, no gift»): the dialog's option buttons are looked up LIVE — an opener (jts tsOpener) or any re-render shows the SAME dialog again with NEW .opts nodes, and the ring's «Chọn» clicked the stale detached button: no chooseM, the picker stayed queued and re-opened forever */
 const optB=i=>{const M2=$("modal"),o2=M2&&M2.querySelector(".opts");return(o2&&o2.querySelector(`.opt[data-m="${i}"]`))||null};
 const why=(c,i)=>{const b=optB(i);return c.kgwhy||(b&&b.disabled?((b.querySelector(".kwhy")||{}).textContent||"Chưa được"):kipLocked(c)?"Thiếu bạc":"")};
 kitRingItem.open({key:"gift:"+m.pid,title:(M.querySelector(".kptitle")||{}).textContent||verb,sub:who?`${verb} ${m.pid==="plantpick"?"của":"cho"} ${kriE(who)}`:""/* KK62: «Cài vào rương của <người>» (planting goes INTO her chest), every other verb «… cho <người>»; no name known = no line (never the dialog title) */,bg:kriBg(),
  items:()=>{/* K-RING-QTY (KK61, RV-176 nit, law 6c): the grid folds same-kind same-offer twins into ONE tile ×N (jgpick inv-stack) and removes their cards —
    the ring shows the same count on that tile (kit stack badge), so no piece of her chest is out of sight */
   const sg=c=>{const e=S.inv[c.ik];return typeof invCan==="function"&&invCan(e)?[invSig(e),kipLocked(c),c.n||"",c.x||""].join("#"):null};const QN=new Map(),SEEN=new Set();
   m.opts.forEach(c=>{if(!c||c.ik==null||!S.inv[c.ik])return;const s=sg(c);if(!s)return;QN.set(s,QN.has(s)?QN.get(s)+1:1+(typeof invMoreOnce==="function"?invMoreOnce(S,S.inv[c.ik],SEEN):0))});
   return L.filter(([c])=>S.inv[c.ik]).map(([c,i])=>{const I=kipItem(S.inv[c.ik]);const w=why(c,i);const s=sg(c);return{id:i,src:I.src,name:I.name,grade:I.grade,qty:s?QN.get(s)||1:1,sub:[I.kind,I.use].filter(Boolean).join(" · "),lock:w||false,ref:{e:S.inv[c.ik]},c,i}})},
  /* info = the item's kit detail + the option's own kit card (odds · Tốn · Được · Mất · Kèm) — the same display copy as the old grid detail (kipDetail) */
  info:it=>{try{kipSelect(M,m,it.i);const d=M.querySelector(".kipd");if(d){const c=d.cloneNode(true);c.querySelectorAll(".kipgo").forEach(x=>x.remove());c.classList.remove("kipd");return c.innerHTML}}catch(e){}return""},
  acts:it=>[{n:verb,main:1,off:it.lock||"",fn:()=>{if(!Q[0]||Q[0].pid!==m.pid)return"close";/* the picker is no longer the open dialog */const b=optB(it.i);if(!b||b.disabled)return null;const a=kriSnap(V),l0=kriLogMark(),bn=kriBaseName(it);giveTo.out=null;if(typeof plantItem==="function")plantItem.out=null;window.__kriAct=1;try{b.click()}finally{window.__kriAct=0}
   M.classList.remove("kri-hide");KRI_DLG=null;/* a follow-up dialog of the act → the ring steps aside for it */if(Q.length&&!$("modal").hidden){return"close"}
   /* K-GIFT-OUT (KK64, KIT-KRI-XL leftover 2): the seal comes from what really became of the piece (giveTo.out / plantItem.out), never from log words —
      a world line written in the same tick («… phát hiện …», «… không thành …» of someone else) sealed a kept gift BẠI. Ghi chú = only the lines about THIS piece. */
   const L0=kriLogSince(l0).filter(x=>!bn||x.includes(bn)),ok=kriGiftOk(m.pid,L0),L=kriNoteLines(L0,bn,who);return{ok,who,title:`${verb} ${it.name}${who?" · "+who:""}`,rows:kriDiffRows(a,V,who).concat(L.length?[{k:"note",label:"Ghi chú",items:L}]:[])}}}],
  onClose:()=>{M.classList.remove("kri-hide");if(KRI_DLG===m&&Q[0]===m&&!M.hidden){KRI_DLG=null;const x=M.querySelector(".kit-x");if(x)x.click();else if(typeof closeModal==="function")closeModal()}KRI_DLG=null}})}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{if(kriOn())kriGiftOpen()}catch(e){console.error("kri gift",e)}return r}})();
/* the carried-gift flight of the old grid points at a hidden dialog: with the ring its result shows in place instead */
if(typeof kitFxGiftCarry==="function"){const f0=kitFxGiftCarry;kitFxGiftCarry=function(){if(window.__kriAct||kitRingItem.cur)return;return f0.apply(this,arguments)}}
/* ---- (5)(6) kitShop: buy + sell (Nội vụ phủ, pet shop, every kitShop caller and its wrappers jact / jil / jtq14; co-op data mode untouched) ---- */
if(typeof kitShop==="function"){const ks0=kitShop;kitShop=function(o){if(!o||window.__kshData||!kriOn())return ks0.apply(this,arguments);
 const key=o.key||"shop";o.q={};o.det=null;o.mode="buy";KSHOP.reg[key]=o;const money=()=>o.money?o.money():S.bac;
 const sub=()=>`Ta có ${money()} bạc`;
 const R=kitRingItem.open({key:"shop:"+key,title:o.title||"Mua đồ",sub:sub(),bg:kriBg(),tabs:o.sell?[{k:"buy",label:"Mua"},{k:"sell",label:"Bán"}]:null,tab:"buy",
  onTab:k=>{o.mode=k},empty:o.sell&&o.sell.empty?`<p>Ta chưa có gì để bán.</p><p class="kshm">${o.sell.empty}</p>`:"Chưa có món nào.",
  items:t=>{o.mode=t||"buy";o.list=kitShopList(o);return o.list.map(x=>{const u=x.unit||"bạc",mx=kitShopMax(o,x);return{id:x.k,src:x.src,src512:x.src512,name:x.name,grade:x.grade,lux:x.lux,mark:x.mark,
   sub:`${x.price} ${u}${x.eff?" · "+x.eff:""}`,lock:mx<1?(kitShopWhyQ(o,x,1)||"Chưa được"):false,x}})},
  info:it=>{const x=it.x,u=x.unit||"bạc";const cost=x.sell?[["Được",`Bạc +${x.price} mỗi món`,"g"]]:[["Tốn",`Bạc −${x.price} mỗi món`,"r"]];
   const ref=typeof kitItemRef==="function"&&!x.crafted&&x.rows!==""?kitItemRef({k:x.k}):null;if(ref&&typeof kitItemDetail==="function")return kitItemDetail(ref,{lead:cost});
   return `<div class="kshdt"><b class="kshdn">${kriE(x.name)}</b>${x.sub?`<span class="kshds">${x.sub}</span>`:""}</div><div class="kinvrows">${kitRowsJoin(kitRows(cost),x.rows||"")}</div>`},
  acts:it=>{const x=it.x,u=x.unit||"bạc",verb=x.sell?"Bán":"Mua",mx=kitShopMax(o,x);const lab=q=>`${verb}${q>1?" ×"+q:""} · ${q*x.price} ${u}`;
   return[{n:lab(1),label:lab,main:1,off:mx<1?(kitShopWhyQ(o,x,1)||"Chưa được"):"",q:{max:mx},fn:(it2,q)=>{q=Math.max(1,Math.min(q,kitShopMax(o,x)));const b0=money(),h0=x.have?x.have():0;
    const ok=kitShopBuy(key,x.k,q,o.mode);const dB=money()-b0;const T=kitRingItem.cur;if(T&&T.top){const s=T.top.querySelector("small");if(s)s.textContent=sub()}
    if(!ok)return{ok:false,title:`${verb} ${x.name}`,rows:[{k:"note",label:"Vì sao",items:[kriE(kitShopWhyQ(o,x,q)||"Chưa được")]}]};
    return x.sell?{ok:true,title:`Bán ${x.name}${q>1?" ×"+q:""}`,rows:[{k:"duoc",label:"Được",items:[`Bạc +${dB}`]},{k:"mat",label:"Mất",items:[`${kriE(x.name)} ×${q}`]}]}
     :{ok:true,title:`Mua ${x.name}${q>1?" ×"+q:""}`,rows:[{k:"duoc",label:"Được",items:[`${kriE(x.name)} ×${q} vào Tư trang`]},{k:"mat",label:"Mất",items:[`Bạc ${dB}`]}]}}}]},
  onClose:()=>{try{delete KSHOP.reg[key]}catch(e){}try{o.onClose&&o.onClose()}catch(e){}try{render()}catch(e){}}});
 return R}}
/* ---- (2)(3)(8)(9)(12) the bag family: every kitInvGrid({inline}) tile (Tư trang: items, wardrobe dresses / hairpins, works, recipe books, «Trưng bày») →
        the ring on the SAME list (same category tab), focused on the tapped item. Info + acts = the item's own capture spec (kinlCapture: every kinvOpen wrapper
        jwdinv / jecon / jrcp / jmark / jshelf stays the engine); an act = its own data-* button, clicked in the document (every delegated route stays). ---- */
function kriSpecOf(o,x){try{return typeof kinlCapture==="function"?kinlCapture(o,x):null}catch(e){return null}}
function kriSplitActs(html){const t=document.createElement("div");t.innerHTML=html||"";const A=[...t.querySelectorAll(".kinvacts button, .kinvacts .kbtn, [data-shelfput]")];
 const acts=A.map(b=>({b,n:(b.childNodes[0]&&b.childNodes[0].textContent||b.textContent||"").trim(),off:b.disabled?((b.querySelector(".kwhy")||{}).textContent||b.title||"Chưa được"):""}));
 t.querySelectorAll(".kinvacts").forEach(a=>a.remove());return{info:t.innerHTML,acts}}
/* one hidden host in the ring layer: a replayed button lives there while it is clicked (delegated document handlers see a real attached element) */
function kriClick(btn){const R=kitRingItem.cur;const h=document.createElement("div");h.style.cssText="position:fixed;left:-9999px;top:0;width:10px;height:10px;overflow:hidden";h.className="rbtn kinvacts";
 const b=btn.cloneNode(true);b.disabled=false;h.appendChild(b);document.body.appendChild(h);try{b.click()}finally{h.remove()}}
function kriFromGrid(o,x0){const key=o.key||"bag";const tabs=[{k:"all",label:"Tất cả"}].concat(o.tabs||[]);let tab=(typeof KINV!=="undefined"&&KINV.cur[key])||"all";
 const list=t=>(o.items||[]).filter(x=>t==="all"||x.cat===t);
 const toItem=x=>({id:typeof kinlId==="function"?kinlId(x):x.name,src:x.src,src512:x.src512,name:x.name,grade:x.grade,qty:x.qty,lux:x.lux,mark:x.mark,sub:x.onText||x.sub||"",x});
 const title=key==="tutrang"?"Tư trang":key==="toil"?"Rương trang phục":(o.title||"Tư trang");
 const R=kitRingItem.open({key:"inv:"+key,title,sub:o.sumTitle||"",bg:o.bg||kriBg(),tabs:tabs.length>2?tabs:null,tab,onTab:k=>{tab=k;try{KINV.cur[key]=k}catch(e){}},
  items:t=>{/* the bag may have changed (sold / given / worn): the grid's own item list is rebuilt by its owner on render → re-read the registered grid */
   const o2=(typeof KINV!=="undefined"&&KINV.reg[key])||o;o=o2;return list(t||tab).map(toItem)},
  info:it=>{const sp=kriSpecOf(o,it.x);it.__sp=sp?kriSplitActs(sp.html):{info:"",acts:[]};return it.__sp.info||""},
  acts:it=>{const sp=it.__sp||kriSplitActs((kriSpecOf(o,it.x)||{}).html);return sp.acts.map((a,i)=>({n:a.n,main:i===0,off:a.off,fn:()=>{const s=kriSnap(null),l0=kriLogMark();window.__kriAct=1;
   try{kriClick(a.b)}finally{window.__kriAct=0}try{render()}catch(e){}
   /* the act opened its own dialog (e.g. Tặng → who?) or a scene: the ring steps aside for it */
   const M=$("modal");if((M&&!M.hidden&&Q.length)||document.querySelector("#kg82:not([hidden])"))return"close";
   const L=kriLogSince(l0);return{ok:L.length?true:null,title:`${a.n} · ${it.name}`,rows:kriDiffRows(s,null).concat(L.length?[{k:"note",label:"Ghi chú",items:L}]:[])}}}))},
  empty:"Rương trống."});
 if(R&&x0){const i=R.items.findIndex(y=>y.x===x0||y.id===(typeof kinlId==="function"?kinlId(x0):""));if(i>=0){kitRingItem.cur.rot=i;kriPlace(kitRingItem.cur);setTimeout(()=>kriFocus(kitRingItem.cur),kriCalm()?0:180)}}
 return R}
if(typeof kinlPick==="function"){const kp0=kinlPick;kinlPick=function(o,x){if(o&&kriOn()&&!window.__kriAct&&o.inline&&o.onPick){try{if(kriFromGrid(o,x))return}catch(e){console.error("kri bag",e)}}return kp0.apply(this,arguments)}}
/* ---- generic: a picker that draws its own kit strip (kinlHTML: .kinlinfo + .kinlacts) for the picked item → the ring pane takes that strip's info + buttons ---- */
function kriStripParts(html){const t=document.createElement("div");t.innerHTML=html||"";const d=t.querySelector(".kinldet");if(!d)return{info:"",acts:[]};
 const A=[...d.querySelectorAll(".kinlacts button, .kinvacts button")].map(b=>({b,n:(b.childNodes[0]&&b.childNodes[0].textContent||b.textContent||"").trim(),off:b.disabled?((b.querySelector(".kwhy")||{}).textContent||"Chưa được"):""}));
 const inf=d.querySelector(".kinlinfo");if(inf){inf.querySelectorAll(".kinvacts,.kinln,.kinlsub").forEach(x=>x.remove())}return{info:inf?inf.innerHTML:"",acts:A}}
function kriActsFrom(parts,it){return parts.acts.map((a,i)=>({n:a.n,main:i===0,off:a.off,fn:()=>{const s=kriSnap(null),l0=kriLogMark();window.__kriAct=1;try{kriClick(a.b)}finally{window.__kriAct=0}try{render()}catch(e){}
 const M=$("modal");if((M&&!M.hidden&&Q.length)||document.querySelector("#kg82:not([hidden])"))return"close";const L=kriLogSince(l0);
 return{ok:L.length?true:null,title:`${a.n} · ${it.name}`,rows:kriDiffRows(s,null).concat(L.length?[{k:"note",label:"Ghi chú",items:L}]:[])}}}))}
/* ---- (10) veil chest (jveil vlInvHTML, Tư trang): tap a veil → the ring of every veil in the chest; info + Đeo / Tặng / Bán = the veil block's own strip ---- */
function kriVeilOpen(ix0){if(typeof vlChest!=="function")return false;const strip=ix=>{const p0=window.__vlPick;window.__vlPick=ix;try{return kriStripParts(vlInvHTML())}finally{window.__vlPick=p0}};
 const R=kitRingItem.open({key:"veil",title:"Mạng che mặt",bg:kriBg(),items:()=>vlChest(S).map(x=>({id:"v"+x.ix,src:vlSrc(x.e.k),name:itm(x.e.k).n,grade:vlG(x.e),sub:vlKnows(S,x.e)?"đồ phẩm "+wdPName(vlP(x.e,S)):"chưa rõ phẩm",ix:x.ix})),
  info:it=>{it.__p=strip(it.ix);return it.__p.info},acts:it=>kriActsFrom(it.__p||strip(it.ix),it),empty:"Rương chưa có mạng che mặt."});
 if(!R)return false;const i=kitRingItem.cur.items.findIndex(y=>y.ix===ix0);if(i>=0){kitRingItem.cur.rot=i;kriPlace(kitRingItem.cur);setTimeout(()=>kriFocus(kitRingItem.cur),kriCalm()?0:180)}return true}
window.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-vlpick]");if(!b||!kriOn()||window.__kriAct)return;try{if(kriVeilOpen(+b.dataset.vlpick)){ev.stopImmediatePropagation();ev.preventDefault()}}catch(e){console.error("kri veil",e)}},true);
/* ---- (15) pets (Tư trang › Thú cưng): tap a pet's picture → the ring of her pets; acts = the pet card's own buttons (Chăm / Cho theo hầu / Gửi về) ---- */
function kriPetOpen(i0){if(typeof tsbPets!=="function")return false;const card=i=>{const t=document.createElement("div");t.innerHTML=petPanelHTML();const c=t.querySelectorAll(".kpetcards > *")[i];return c};
 const R=kitRingItem.open({key:"pets",title:"Thú cưng",bg:kriBg(),items:()=>tsbPets(S).map((P,i)=>{const T=petT(P);return{id:"p"+i+":"+P.t,src:petPSrc(P),name:T.n,grade:Math.max(0,Math.min(4,T.tr|0)),sub:`${PET_TIER[T.tr]} · ${S.petOn===i?"theo hầu":"ở tẩm cung"}`,i}}),
  info:it=>{const c=card(it.i);if(!c)return"";const d=c.querySelector(".kskd,.kdesc,.kskdesc")||c;const x=d.cloneNode(true);x.querySelectorAll("button,.kskacts,.rbtn").forEach(e=>e.remove());return x.innerHTML},
  acts:it=>{const c=card(it.i);const A=c?[...c.querySelectorAll("button[data-pet]")].map(b=>({b,n:(b.childNodes[0]&&b.childNodes[0].textContent||"").trim(),off:b.disabled?"Chưa được":""})):[];return kriActsFrom({acts:A},it)},
  empty:"Ta chưa nuôi con thú nào."});
 if(!R)return false;const i=kitRingItem.cur.items.findIndex(y=>y.i===i0);if(i>=0){kitRingItem.cur.rot=i;kriPlace(kitRingItem.cur);setTimeout(()=>kriFocus(kitRingItem.cur),kriCalm()?0:180)}return true}
window.addEventListener("click",ev=>{const c=ev.target.closest&&ev.target.closest(".kpetcards > *");if(!c||!kriOn()||window.__kriAct||ev.target.closest("button"))return;const L=[...c.parentElement.children];const i=L.indexOf(c);
 if(i<0||!(typeof tsbPets==="function")||i>=tsbPets(S).length)return;try{if(kriPetOpen(i)){ev.stopImmediatePropagation();ev.preventDefault()}}catch(e){console.error("kri pet",e)}},true);
/* ---- (4) toilette dress (#kg82 «Rương trang phục», jtoil toilDressUI): tap a chest piece or a worn slot → the ring on the same tabs, focused on it;
   acts = Cài / Mặc / Đeo (wear at once + saved, owner E95) or Tháo — the toilette's own toilAct; closing the ring redraws the toilette (live figure preview) ---- */
function kriToilOpen(x0){if(typeof toilAct!=="function"||typeof TOIL==="undefined"||!TOIL.st||TOIL.st.dv)return false;const reg=()=>(typeof KINV!=="undefined"&&KINV.reg.toil)||null;if(!reg())return false;
 const verb=g=>{const sl=typeof toilSlotOf==="function"?toilSlotOf(g.k):null;return sl==="tram"||sl==="hair"?"Cài":sl==="y"?"Mặc":"Đeo"};
 const tabs=[{k:"all",label:"Tất cả"}].concat(reg().tabs||[]);let tab=(typeof KINV!=="undefined"&&KINV.cur.toil)||"all";if(!tabs.some(t=>t.k===tab)||(x0&&tab!=="all"&&x0.cat!==tab))tab="all";
 /* the toilette overlay (#kg82, above the stage) steps aside while the ring is open; closing the ring brings it back redrawn */
 const K82=document.getElementById("kg82");
 const R=kitRingItem.open({key:"inv:toil",title:"Rương trang phục",bg:kriBg(),tabs,tab,onTab:k=>{tab=k;try{KINV.cur.toil=k}catch(e){}},
  items:t=>((reg()||{}).items||[]).filter(x=>x&&x.g&&((t||tab)==="all"||x.cat===(t||tab))).map(x=>({id:typeof kinlId==="function"?kinlId(x):x.name,src:x.src,src512:x.src512,name:x.name,grade:x.grade,lux:x.lux,mark:x.mark,sub:x.onText||x.sub||"",x})),
  info:it=>{try{const r=kitItemRef({g:it.x.g});return r&&typeof kinlDetail==="function"?kinlDetail(r,{key:"kri"}):""}catch(e){return""}},
  acts:it=>{const g=it.x.g,worn=!!g.wdSlot||!!g.w,sl=typeof toilSlotOf==="function"?toilSlotOf(g.k):null;
   return[{n:worn?"Tháo":verb(g),main:1,off:worn&&sl==="y"?"Y phục chỉ thay: chọn bộ khác":"",fn:()=>{const s=kriSnap(null),l0=kriLogMark();
    TOIL.st.sel={k:g.k,wdSlot:g.wdSlot||null,w:!!g.w};window.__kriAct=1;try{toilAct(worn?"off":"wear")}finally{window.__kriAct=0}
    /* putting a piece on / taking it off moves it between the slot and the chest; it is not a new item (no «Rương đồ / Vừa vào Tư trang» box, j93 kmDiff) */
    try{if(typeof kmSnap==="function"&&KMS===S)KMSNAP=kmSnap()}catch(e){}
    const L=kriLogSince(l0);return{ok:true,title:`${worn?"Tháo":verb(g)} · ${it.name}`,rows:kriDiffRows(s,null).concat(L.length?[{k:"note",label:"Ghi chú",items:L}]:[])}}}]},
  empty:"Ngăn này chưa có món nào.",onClose:()=>{if(K82)K82.classList.remove("kri-hide");try{if(TOIL.st&&!TOIL.st.dv)toilDressUI()}catch(e){console.error("kri toil",e)}}});
 if(!R)return false;if(K82)K82.classList.add("kri-hide");if(x0){const C=kitRingItem.cur;const i=C.items.findIndex(y=>y.x===x0||(y.x.g&&x0.g&&y.x.g.k===x0.g.k&&!!y.x.g.w===!!x0.g.w&&!!y.x.g.wdSlot===!!x0.g.wdSlot));if(i>=0){C.rot=i;kriPlace(C);setTimeout(()=>kriFocus(C),kriCalm()?0:180)}}return true}
window.addEventListener("click",ev=>{if(!kriOn()||window.__kriAct)return;const t=ev.target.closest&&ev.target.closest('#kg82 [data-kinvkey="toil"][data-kinvi], #kg82 [data-keqk="toil"][data-keqi]');if(!t)return;
 try{let x=null;if(t.dataset.kinvi!=null){const o=KINV.reg.toil;x=o&&o.items&&o.items[+t.dataset.kinvi]}else{const o=KEQ.reg.toil;const sl=o&&o.slots&&o.slots[+t.dataset.keqi];if(!sl||!sl.item)return;
   const L=(KINV.reg.toil||{}).items||[];x=L.find(y=>y.g&&(y.g.wdSlot===sl.k||(y.g.w&&typeof toilSlotOf==="function"&&toilSlotOf(y.g.k)===sl.k)))||null;if(x)try{KINV.cur.toil=x.cat}catch(e){}}
  if(x&&kriToilOpen(x)){ev.stopImmediatePropagation();ev.preventDefault()}}catch(e){console.error("kri toil",e)}},true);
/* ---- (11) titles (Danh hiệu panel, jdh dhPanel): «Đeo «…»» / «Đổi phần thưởng «…»» → the ring of her earned titles (tile = the kit title plate kitTitlePlate);
   acts = the title's bonus choices = the options of the title's own dhPick panel (run by their own go), «Tháo» on the worn one ---- */
function kriDhKeys(){try{return (window.DHKEYS?window.DHKEYS():[]).filter(k=>dhObj(S,k)&&!((S.dh||{})[k]||{}).conf)}catch(e){return[]}}
function kriDhWorn(){const w=S&&S.titleWorn;return typeof w==="string"&&/^dh-/.test(w)?w.slice(3):null}
/* the bonus options of dhPick(key) without showing its panel; a title with one bonus wears at once inside dhPick → put back, act = «Đeo» */
function kriDhOpts(key){const kp=kitPanel,sm=showModal;let cap=null;const w0=kriDhWorn(),e=(S.dh||{})[key],pk=e&&e.pick;
 kitPanel=spec=>{cap=spec};showModal=()=>{};try{dhPick(key,0)}catch(x){console.error("kri dh",x)}finally{kitPanel=kp;showModal=sm}
 if(!cap){try{if(e)e.pick=pk;if(kriDhWorn()!==w0)dhWear(S,w0,true)}catch(x){}return null}return (cap.opts||[]).slice(0,-1)}
function kriDhOpen(key0){if(typeof dhPick!=="function"||typeof kitTitlePlate!=="function")return false;const M=$("modal");
 const R=kitRingItem.open({key:"titles",title:"Danh hiệu",sub:"Mỗi lần chỉ đeo một danh hiệu, lấy một phần thưởng",bg:kriBg(),
  items:()=>kriDhKeys().map(k=>dhObj(S,k)).sort((a,b)=>b.tier-a.tier).map(o=>({id:o.key,key:o.key,name:o.name,grade:Math.max(0,Math.min(4,Math.round((o.tier|0)/2))),sub:o.key===kriDhWorn()?"đang đeo":"",
   tile:`<div class="kt3">${kitTitlePlate(o)}</div>`,o})),
  info:it=>{const o=it.o;return `<div class="kt3">${kitTitlePlate(o)}</div>`+(typeof kitRows==="function"?`<div class="kgr">${kitRows([["Cách có",kriE(o.how||"")],["Khi đeo",kriE(o.fx||"chỉ để làm đẹp")]])}</div>`:"")},
  acts:it=>{const k=it.key,O=kriDhOpts(k);const A=(O||[{n:"Đeo",one:1}]).map((op,i)=>({n:op.one?"Đeo":op.n,main:i===0,fn:()=>{const s=kriSnap(null),l0=kriLogMark();window.__kriAct=1;
    try{if(op.one)dhPick(k,0);else if(op.go)op.go()}finally{window.__kriAct=0}try{render()}catch(e){}const L=kriLogSince(l0);
    return{ok:true,title:`Đeo «${it.name}»`,rows:kriDiffRows(s,null).concat(L.length?[{k:"note",label:"Ghi chú",items:L}]:[])}}}));
   if(k===kriDhWorn())A.push({n:"Tháo danh hiệu",fn:()=>{const s=kriSnap(null);dhWear(S,null);try{render()}catch(e){}return{ok:true,title:`Tháo «${it.name}»`,rows:kriDiffRows(s,null)}}});return A},
  empty:"Ta chưa có danh hiệu nào.",onClose:()=>{if(M)M.classList.remove("kri-hide");try{if(Q.length&&/^Danh hiệu/.test(((M&&M.querySelector(".kptitle"))||{}).textContent||"")){Q.shift();dhPanel()}}catch(e){console.error("kri dh",e)}}});
 if(!R)return false;if(M)M.classList.add("kri-hide");const C=kitRingItem.cur;const i=C.items.findIndex(y=>y.key===key0);if(i>=0){C.rot=i;kriPlace(C);setTimeout(()=>kriFocus(C),kriCalm()?0:180)}return true}
window.addEventListener("click",ev=>{if(!kriOn()||window.__kriAct)return;const b=ev.target.closest&&ev.target.closest("#modal .opt[data-m]");if(!b||!Q[0])return;const M=$("modal");
 if(!/^Danh hiệu/.test(((M&&M.querySelector(".kptitle"))||{}).textContent||""))return;const op=Q[0].opts&&Q[0].opts[+b.dataset.m];const m=op&&/^(?:Đeo|Đổi phần thưởng) «(.+)»$/.exec(op.n||"");if(!m)return;
 const k=kriDhKeys().find(k=>dhObj(S,k).name===m[1]);if(k==null)return;try{if(kriDhOpen(k)){ev.stopImmediatePropagation();ev.preventDefault()}}catch(e){console.error("kri dh",e)}},true);
/* ---- (13) hoa điền (toilette makeup step, jhd hdStep): the owned hoa điền on the ring; «Dán» = the step's own [data-hdk] button (→ the drag board),
   «Không dán» = its «Không dán»; ✕ leaves the step's buttons as they were ---- */
if(typeof hdStep==="function"){const h0=hdStep;hdStep=function(ctx){const r=h0.apply(this,arguments);try{if(r&&kriOn()&&ctx&&ctx.box)kriHdOpen(ctx.box)}catch(e){console.error("kri hd",e)}return r}}
function kriHdOpen(box){const btn=k=>box.querySelector(`[data-hdk="${k}"]`);const K82=document.getElementById("kg82");
 /* the toilette overlay steps aside while the ring is open (an act returns "close" → it comes back for the drag board / the next step) */
 const R=kitRingItem.open({onClose:()=>{if(K82)K82.classList.remove("kri-hide")},key:"hd",title:"Hoa điền",sub:"Chọn một hoa điền để dán",bg:kriBg(),
  items:()=>hdOwned(S).filter(e=>btn(e.k)).map(e=>{const I=typeof kipItem==="function"?kipItem(e):{src:kitItemSrc(e.k,""),name:WD_ITEMS[e.k].n,grade:WD_ITEMS[e.k].g|0};return{id:e.k,k:e.k,src:I.src,name:I.name,grade:I.grade,sub:I.kind||"",ref:{e}}}),
  acts:it=>[{n:"Dán",main:1,fn:()=>{const b=btn(it.k);if(!b)return null;window.__kriAct=1;try{b.click()}finally{window.__kriAct=0}return"close"}},
   {n:"Không dán",fn:()=>{const b=btn("");if(!b)return null;window.__kriAct=1;try{b.click()}finally{window.__kriAct=0}return"close"}}],
  empty:"Ta chưa có hoa điền nào."});if(R&&K82)K82.classList.add("kri-hide");return R}
/* ---- (14) face (dung mạo, new-game card j86 fpHTML → kitPicker «face»): MAIN ruling 26/11 = the item ring (choosing a look, not a person).
   A tap on a face cell → the ring of the faces (portrait as the tile picture), act «Chọn» = the picker's own fpPick ---- */
function kriFaceOpen(k0){if(typeof fpItems!=="function"||typeof fpPick!=="function"||typeof kitScene!=="object")return false;const M=$("modal");
 const tile=x=>typeof kitItem==="function"?kitItem({src:x.face&&x.face.src,name:x.label||x.k,grade:0,size:"md"}):"";
 const R=kitRingItem.open({key:"face",title:"Dung mạo",sub:"Dung mạo chỉ để nhìn, không đổi tư chất.",bg:kriBg(),
  items:()=>fpItems().map(x=>({id:x.k,k:x.k,src:x.face&&x.face.src,name:x.label||x.k,grade:0,sub:x.k===S.pid?"đang chọn":"",tile:tile(x),
   tileBig:typeof kitItem==="function"?kitItem({src:(x.face&&(x.face.big||x.face.src)),name:x.label||x.k,grade:0,size:"md"}):"",x})),
  info:it=>`<div class="kpmain"><b>${kriE(it.name)}</b><p>Dung mạo chỉ để nhìn, không đổi tư chất.</p></div>`,
  acts:it=>[{n:"Chọn",main:1,off:it.k===S.pid?"Đang là dung mạo này":"",fn:()=>{fpPick(it.k);return{ok:null,title:`Chọn · ${it.name}`,rows:[{k:"note",label:"Ghi chú",items:["Dung mạo đã đổi; về thẻ thân phận mà xem."]}]}}}],
  onClose:()=>{if(M)M.classList.remove("kri-hide");try{if(typeof fpRedraw==="function")fpRedraw()}catch(e){}}});
 if(!R)return false;kitRingItem.cur.L.classList.add("kri-nog");/* a face has no grade */if(M)M.classList.add("kri-hide");const C=kitRingItem.cur;const i=C.items.findIndex(y=>String(y.k)===String(k0));if(i>=0){C.rot=i;kriPlace(C);setTimeout(()=>kriFocus(C),kriCalm()?0:180)}return true}
/* the new-game card has no game HUD yet: this one caller only needs kitScene + a living S (bots keep the old picker) */
window.addEventListener("click",ev=>{const t=ev.target.closest&&ev.target.closest('.kpick[data-pick="face"] [data-pk]');if(!t||window.__bot||window.__kriOff||window.__kriAct||typeof S==="undefined"||!S)return;
 try{if(kriFaceOpen(t.dataset.pk)){ev.stopImmediatePropagation();ev.preventDefault()}}catch(e){console.error("kri face",e)}},true);
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§104",title:"kitRingItem · Vòng bảo vật (món đứng trên vòng xoay, món trước sáng, chạm → phóng to trái, nút thả phải, kết quả tại chỗ)",where:"mọi chỗ chọn món: tặng quà, dâng, cài đồ, mua / bán, Tư trang, mạng che mặt, thú cưng",
 html:()=>`<div class="kitpg-row"><button type="button" class="kbtn alt" data-kriring="1"${typeof S!=="undefined"&&S?"":" disabled"}>Mở vòng bảo vật (Tư trang)</button></div>`})}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-kriring]");if(!b)return;e.stopPropagation();const pg=document.getElementById("kitpage");if(pg)pg.hidden=true;
 const L=(S.inv||[]).map((e2,ix)=>({e:e2,ix})).filter(x=>x.e&&!x.e.h&&IT[x.e.k]);
 kitRingItem.open({title:"Vòng bảo vật",sub:"mẫu kit §104",items:L.map(x=>{const I=typeof kipItem==="function"?kipItem(x.e):{src:kitItemSrc(x.e.k),name:IT[x.e.k].n,grade:0};return{id:x.ix,src:I.src,name:I.name,grade:I.grade,sub:I.kind||"",ref:{e:x.e}}}),
  acts:it=>[{n:"Xem thử",main:1,fn:()=>({ok:true,title:"Mẫu kit · "+it.name,rows:[{k:"duoc",label:"Được",items:[]},{k:"mat",label:"Mất",items:[]}]})}],onClose:()=>{if(pg)pg.hidden=false}})},true);
