/* ===== §97 kitScreenVeil · SCREEN-CHANGE VEIL (owner OD 24/11 ~10:20Z, owner bug; review/kit-screenveil) — dev/build/jscrv.js (LAST module) =====
   Owner (verbatim, short): "nó chỉ xuất hiện những cái khung của cái màn đó trước, còn hình nhân vật hay là hình cái phòng nó hiện sau á. Tôi cực kỳ ghét
   cái đó nha. Thà là cho nguyên cái màn hình nó màu trắng rồi hiện cái dòng chữ ... đang vào phòng, hay là đang vào điện, hay là đang về cung".
   ROOT CAUSE (report dev/handover/reports/screenveil.md): every view is built by innerHTML / style.backgroundImage in ONE task and painted on the next
   frame; <img src> and CSS url() pictures are fetched (CDN, cold or evicted SW cache) and decoded only AFTER that first paint, so the frames, buttons and
   text paint first and the pictures pop in later. Only the life gate (jload, entering a life), the picker pages (kitPickerDecode) and the Luân hồi cards
   waited for their pictures.
   THE PART: one plain kit veil (#kveil) + one short cổ trang line (CTM_WAIT.veil*) over the whole game until EVERY picture of the new view that lies in
   the viewport (<img> and CSS background pictures, backdrops included) is loaded AND decoded; then the whole view shows AT ONCE (short fade).
   - Everything already decoded / in the memory cache = no veil at all (decided in the same task, before the first paint).
   - The line appears only after KIT_SCRV.word ms (a short wait = a plain veil, no flashing words); KIT_SCRV.cap = safety cap (a dead line never locks her).
   - Pictures whose src is set a frame later are caught: after each wait the view is scanned again before the reveal.
   API:  kitScreenVeilUntil(root, dest)  → Promise<bool veiled>: veil now if a picture under root is not ready, reveal when all are decoded.
         kitScreenVeil(dest)              → veil at once (before work that builds a new view, e.g. reading a save); kitScreenVeilDone() reveals after decode.
         kitScrvWord(dest)                → the line: dest = place key | "home" | "scene" | "book" | "event" | "board".
   WIRING (one watcher, the whole game): a MutationObserver runs in the same microtask as any DOM build (before paint). It computes the VIEW KEY
   (life · place · tab · event at the head of Q · mini-game board · full-screen overlays on <body>); when the key changed it calls kitScreenVeilUntil.
   So every screen change (Dư đồ → room / điện / cung, tab switch, event picture, mini-game board, motion stages, scenes, save load, co-op join) uses
   this ONE part; code that needs a veil before its own work calls kitScreenVeil(dest). Off while the boot cover / life gate / title is up.
   Test hook: KIT_SCRV.stat {n, veiled, ms[], last}; test: dev/test/screen-veil.js (fails when a frame shows an undecoded picture uncovered). */
const KIT_SCRV={on:true,cap:0,word:0,fade:0,pre:0,stat:{n:0,veiled:0,ms:[],last:null}};
try{Object.assign(KIT_SCRV,BAL.kscrv)}catch(e){}/* the numbers live in BAL.kscrv (law 4) */
const SCRV_OK=new Set(),SCRV_P=new Map(),SCRV_KEEP=new Map();
/* DECODED MEMORY (MAIN 178 ruling on FAIL-4: no veil on a warm tab switch, only on a cold load): every picture the page has shown stays referenced by a detached Image
   (BAL.kscrv.keep, oldest dropped first), so the browser keeps it decoded in its memory cache and the next view that uses it is complete in the same task = no veil. */
function scrvKeep(u,i){try{if(SCRV_KEEP.has(u)){const o=SCRV_KEEP.get(u);SCRV_KEEP.delete(u);SCRV_KEEP.set(u,o);return}
 if(!i){i=new Image();i.decoding="async";i.src=u;if(i.decode)i.decode().catch(()=>{})}SCRV_KEEP.set(u,i);const n=KIT_SCRV.keep==null?300:+KIT_SCRV.keep;/* 0 = keep nothing (was «||300»: 0 silently meant 300, LRM4) */while(SCRV_KEEP.size>n)SCRV_KEEP.delete(SCRV_KEEP.keys().next().value)}catch(e){}}
try{document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&t.currentSrc&&!/^(data|blob):/.test(t.currentSrc))scrvKeep(t.currentSrc)},true)}catch(e){}
function scrvAbs(u){try{return new URL(u,document.baseURI).href}catch(e){return u}}
/* the line for a destination (CTM_WAIT, dev/site/kwait.js; VANPHONG: no "tải") */
function kitScrvWord(dest){const W=(typeof CTM_WAIT==="object"&&CTM_WAIT)||{};const d=dest||"scene";
 if(d==="home")return W.veilHome;if(d==="book")return W.veilBook;if(d==="event")return W.veilEvent;
 if(d==="board")return W.veilBoard;if(d==="scene")return W.veilScene;
 let n="";try{const P=typeof placeOf==="function"?placeOf(d):null;n=(P&&P.n||"").trim().toLowerCase()}catch(e){}
 if(/điện$/.test(n))return W.veilDien;if(/cung$/.test(n))return W.veilCung;if(/hoa viên$/.test(n))return W.veilVuon;
 if(n)return W.veilRoom;return W.veilScene}
/* a picture url is READY when it was decoded before, or the memory cache answers at once (no veil for a cached view) */
function scrvReadyUrl(u){if(SCRV_OK.has(u))return true;if(SCRV_P.has(u))return false;try{const i=new Image();i.src=u;if(i.complete&&i.naturalWidth){SCRV_OK.add(u);return true}}catch(e){}return false}
function scrvWaitUrl(u){if(SCRV_P.has(u))return SCRV_P.get(u);const p=new Promise(r=>{const i=new Image();i.decoding="async";let d=0;const ok=()=>{if(d)return;d=1;SCRV_OK.add(u);SCRV_P.delete(u);scrvKeep(u,i);r()};
  i.onerror=ok;i.onload=()=>{i.decode?i.decode().then(ok,ok):ok()};i.src=u});SCRV_P.set(u,p);return p}
function scrvWaitImg(im){return new Promise(r=>{let d=0;const ok=()=>{if(d)return;d=1;try{if(im.naturalWidth)SCRV_OK.add(scrvAbs(im.currentSrc||im.src))}catch(e){}r()};
 im.addEventListener("error",ok,{once:true});im.addEventListener("load",()=>{im.decode?im.decode().then(ok,ok):ok()},{once:true});if(im.complete)ok()})}
const SCRV_BG=/url\(\s*["']?([^"')]+)["']?\s*\)/g;
/* the pictures under root, inside the viewport, not ready yet → [Promise] (one layout read; computed backgrounds read once each) */
/* in view = inside the viewport AND not clipped away by a scrolling / overflow-hidden box (a picture scrolled out of a panel is not seen, and a
   loading="lazy" one there is never fetched — waiting for it would hold the veil to the cap) */
function scrvInView(e){let r=e.getBoundingClientRect();let L=Math.max(r.left,0),T=Math.max(r.top,0),R=Math.min(r.right,innerWidth),B=Math.min(r.bottom,innerHeight);
 if(R-L<8||B-T<8)return false;for(let n=e.parentElement;n&&n!==document.body;n=n.parentElement){const cs=getComputedStyle(n);if(cs.display==="none")return false;
  if(cs.overflowX!=="visible"||cs.overflowY!=="visible"){const q=n.getBoundingClientRect();L=Math.max(L,q.left);T=Math.max(T,q.top);R=Math.min(R,q.right);B=Math.min(B,q.bottom);if(R-L<4||B-T<4)return false}}return true}
function scrvPend(root){const P=[];const inV=scrvInView;
 try{for(const im of root.querySelectorAll("img")){const s=im.getAttribute("src");if(!s||s.startsWith("data:")||s.startsWith("blob:"))continue;
   if(im.complete){if(im.naturalWidth)SCRV_OK.add(scrvAbs(im.currentSrc||s));continue}if(!inV(im))continue;P.push(scrvWaitImg(im))}
  const seen=new Set();for(const el of root.querySelectorAll("*")){if(el.id==="kveil")continue;const bg=getComputedStyle(el).backgroundImage;if(!bg||bg==="none"||bg.indexOf("url(")<0)continue;
   SCRV_BG.lastIndex=0;let m,us=[];while((m=SCRV_BG.exec(bg)))if(!/^(data|blob):/.test(m[1]))us.push(scrvAbs(m[1]));us=us.filter(u=>!seen.has(u)&&!scrvReadyUrl(u));if(!us.length||!inV(el))continue;
   us.forEach(u=>{seen.add(u);P.push(scrvWaitUrl(u))})}}catch(e){console.error("kitScreenVeil",e)}return P}
/* the veil element (kit: --k-card paper, --k-lab ink, display font) */
function scrvEl(dest){let v=document.getElementById("kveil");if(!v){v=document.createElement("div");v.hidden=true;v.id="kveil";v.className="kscrv";v.setAttribute("role","status");v.setAttribute("aria-live","polite");
  v.innerHTML=`<div class="kscrv-l"></div>`;v.addEventListener("click",e=>{e.stopPropagation();e.preventDefault()},true);document.body.appendChild(v)}
 /* a veil already up keeps its line (the place line stays when the event of that place comes in under it) */
 if(v.hidden||v.classList.contains("out")){v.style.setProperty("--kscrv-word",KIT_SCRV.word+"ms");const l=v.querySelector(".kscrv-l");l.textContent=kitScrvWord(dest);l.style.animation="none";void l.offsetWidth;l.style.animation=""}
 v.classList.remove("out");v.hidden=false;return v}
let SCRV_RUN=null;
function scrvReveal(){const v=document.getElementById("kveil");if(!v||v.hidden||v.classList.contains("out"))return;v.classList.add("out");setTimeout(()=>{if(v.classList.contains("out")){v.hidden=true;v.classList.remove("out")}},KIT_SCRV.fade+20)}
/* at the safety cap a picture still loading is NOT shown half-painted: it stays invisible until it is loaded AND decoded (a hole for a moment, never a stand-in).
   RV-174 FAIL-1 (LRM3): one pass + polling missed pictures attached / changed between polls → once the cap fires a LATE GUARD (MutationObserver on root:
   new nodes, <img src>, style / class changes) hides EVERY picture not yet decoded the moment it is attached or changed: an <img> → visibility hidden until
   load + decode; an element whose CSS background url is not decoded (not in SCRV_OK) → its background-image is lifted until scrvWaitUrl resolves (its
   children stay visible). The guard ends at the next view change (a new veil cycle owns that view) or after BAL.kscrv.late ms. */
let SCRV_LATE=null;
function scrvLateStop(){const L=SCRV_LATE;if(!L)return;SCRV_LATE=null;try{L.mo.disconnect()}catch(e){}try{L.mo2&&L.mo2.disconnect()}catch(e){}clearTimeout(L.t)}
function scrvLateImg(im){const s=im.getAttribute("src");if(!s||s.startsWith("data:")||s.startsWith("blob:"))return;if(im.complete&&im.naturalWidth){SCRV_OK.add(scrvAbs(im.currentSrc||s));return}/* already painted-ready: never blink a picture she already sees */
 if(im.__scrvH===s)return;im.__scrvH=s;im.classList.add("kscrv-hide");/* LRM6 (RV-177 §2 FAIL-1 family, law 11): hidden by the kit class .kscrv-hide {visibility:hidden!important}, never by writing the picture's inline style — the old style.visibility="" on reveal erased a module's OWN inline visibility (a picture its module keeps hidden would show). LRM4: the picture keeps its own watcher until decoded, so a layout that rewrites its class (className =) never unhides it, even after the view guard ended; an inline style rewrite (j59 cssText / visibility="") cannot beat !important */let pmo=null;try{pmo=new MutationObserver(()=>{if(im.__scrvH!==s){pmo.disconnect();return}if(!im.classList.contains("kscrv-hide"))im.classList.add("kscrv-hide")});pmo.observe(im,{attributes:true,attributeFilter:["class"]})}catch(e){}const back=()=>{try{pmo&&pmo.disconnect()}catch(e){}if(im.__scrvH!==s)return;im.__scrvH=0;im.classList.remove("kscrv-hide");KIT_SCRV.stat.lateBack=(KIT_SCRV.stat.lateBack||0)+1};
 KIT_SCRV.stat.late=(KIT_SCRV.stat.late||0)+1;
 im.addEventListener("load",()=>{(im.decode?im.decode():Promise.resolve()).then(()=>{try{SCRV_OK.add(scrvAbs(im.currentSrc||s))}catch(e){}back()},back)},{once:true});im.addEventListener("error",back,{once:true})}
function scrvLateBg(el){if(el.id==="kveil"||el.__scrvB)return;let bg="";try{bg=getComputedStyle(el).backgroundImage}catch(e){return}if(!bg||bg==="none"||bg.indexOf("url(")<0)return;
 SCRV_BG.lastIndex=0;let m;const us=[];while((m=SCRV_BG.exec(bg)))if(!/^(data|blob):/.test(m[1]))us.push(scrvAbs(m[1]));const bad=us.filter(u=>!scrvReadyUrl(u));if(!bad.length)return;
 /* LRM6 (RV-177 §2 FAIL-1, owner OD 24/11 ~10:20Z «a hole for a moment, never a lost picture»): hide with the kit class .kscrv-nobg, never by writing the element's inline style —
    setProperty(…,"none","important") + removeProperty erased an element's OWN inline background for good (kit room backdrop .kbg, jfxkit / jbuoi / jtoil / j93 / j87 / jph / jkstage) */
 el.__scrvB=1;el.classList.add("kscrv-nobg");KIT_SCRV.stat.late=(KIT_SCRV.stat.late||0)+1;
 Promise.all(bad.map(scrvWaitUrl)).then(()=>{el.__scrvB=0;el.classList.remove("kscrv-nobg");KIT_SCRV.stat.lateBack=(KIT_SCRV.stat.lateBack||0)+1})}
function scrvLateScan(n){if(!n||n.nodeType!==1||n.id==="kveil")return;const lt=SCRV_LATE&&SCRV_LATE.light;try{if(n.tagName==="IMG")scrvLateImg(n);else if(!lt)scrvLateBg(n);
  for(const im of n.querySelectorAll("img"))scrvLateImg(im);if(!lt)for(const el of n.querySelectorAll("*"))if(el.tagName!=="IMG")scrvLateBg(el)}catch(e){}}
/* light = the short guard after a NORMAL reveal (LRM4: iPad cold «tab court» showed a figure attached a frame after the reveal): first pass over every <img> (imgs only, no background checks), then only new / changed <img>, for BAL.kscrv.after ms */
function scrvHideLate(root,light){scrvLateStop();root=root||document.body;if(light){SCRV_LATE={light:1};try{for(const im of root.querySelectorAll("img"))scrvLateImg(im)}catch(e){}/* a picture already in the page under a hidden holder (not pending at the check) is caught when the holder shows */}else scrvLateScan(root);
 const mo=new MutationObserver(R=>{if(!SCRV_LATE)return;for(const r of R){if(r.type==="childList")r.addedNodes.forEach(scrvLateScan);
  else if(r.target.nodeType===1){const el=r.target;if(SCRV_LATE.light&&el.tagName!=="IMG")continue;if(el.tagName==="IMG"){if(r.attributeName==="src"||r.attributeName==="srcset")scrvLateImg(el);else if(r.attributeName==="class"&&el.__scrvH&&!el.classList.contains("kscrv-hide")&&!(el.complete&&el.naturalWidth))el.classList.add("kscrv-hide")/* LRM4/LRM6: a layout that rewrites the picture's class must not unhide a picture still decoding (inline style rewrites cannot beat the class's !important) */}else if(!el.__scrvB)scrvLateBg(el)}}});
 mo.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:["src","srcset","style","class"]});
 /* LRM6: pictures attached OUTSIDE the view root (Fold cold Đức Thọ at the cap: the Thái hậu room figure c21-th showed one frame undecoded with no hide mark — the
    frame sweep caught it only after a paint sampler in the same frame) — a second observer on the whole body hides every new / re-sourced <img> at attach (imgs only) */
 let mo2=null;if(root!==document.body){mo2=new MutationObserver(R=>{if(!SCRV_LATE)return;for(const r of R){if(r.type==="childList")r.addedNodes.forEach(n=>{if(n.nodeType!==1||root.contains(n))return;try{if(n.tagName==="IMG")scrvLateImg(n);else for(const im of n.querySelectorAll("img"))scrvLateImg(im)}catch(e){}});
   else if(r.target.tagName==="IMG"&&!root.contains(r.target))scrvLateImg(r.target)}});try{mo2.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src","srcset"]})}catch(e){mo2=null}}
 SCRV_LATE={mo,mo2,key:SCRV_KEY,light:light?1:0,t:setTimeout(scrvLateStop,light?KIT_SCRV.after:(KIT_SCRV.late||30000))};
 /* LRM5: a frame sweep while the guard lives — any <img> not yet decoded that the observer did not hide (Fold cold Đức Thọ: a room figure showed undecoded with the light guard up and no hide mark) is hidden before the next paint */
 const L=SCRV_LATE;const sweep=()=>{if(SCRV_LATE!==L)return;try{for(const im of document.images)if(!im.__scrvH&&!(im.complete&&im.naturalWidth))scrvLateImg(im)}catch(e){}requestAnimationFrame(sweep)};requestAnimationFrame(sweep)}
/* wait (scan again after each wait: pictures set a frame later are caught) until all decoded or the cap */
async function scrvWaitAll(root,t0,P){const raf=()=>new Promise(r=>requestAnimationFrame(()=>r()));
 for(let k=0;k<12;k++){const left=KIT_SCRV.cap-(performance.now()-t0);if(left<=0){scrvHideLate(root);return "cap"}
  await Promise.race([Promise.all(P),new Promise(r=>setTimeout(r,left))]);await raf();P=scrvPend(root);if(!P.length){/* settle: portraits / figures some views set a few frames later */await new Promise(r=>setTimeout(r,90));P=scrvPend(root);if(!P.length)return "ok"}}return "loop"}
function kitScreenVeilUntil(root,dest){root=root||document.body;KIT_SCRV.stat.n++;const P=scrvPend(root);
 if(!P.length){if(!SCRV_RUN)scrvReveal();scrvPrefetch();return Promise.resolve(false)}
 const t0=performance.now();scrvEl(dest);KIT_SCRV.stat.veiled++;(KIT_SCRV.stat.log=KIT_SCRV.stat.log||[]).push(dest);if(KIT_SCRV.stat.log.length>40)KIT_SCRV.stat.log.shift();const run={t0};SCRV_RUN=run;
 return scrvWaitAll(root,t0,P).then(why=>{if(SCRV_RUN!==run)return true;SCRV_RUN=null;const ms=Math.round(performance.now()-t0);KIT_SCRV.stat.ms.push(ms);KIT_SCRV.stat.last={dest,word:kitScrvWord(dest),ms,why,n:P.length};scrvReveal();if(why!=="cap"&&KIT_SCRV.after)scrvHideLate(root,1);scrvPrefetch();return true})}
/* 97.7 IDLE PREFETCH (MAIN 118, 24/11): once a view is settled, the room pictures of the places one walk away (nearest KIT_SCRV.pre,
   by travel time, reachable now) are fetched + decoded one at a time when the device is idle, so most moves find them ready (no veil). */
let SCRV_PRE_T=0;
function scrvPrefetch(){clearTimeout(SCRV_PRE_T);SCRV_PRE_T=setTimeout(()=>{try{if(!KIT_SCRV.pre||typeof S==="undefined"||!S||S.dead||typeof places!=="function"||typeof SCIMG!=="object")return;
  const here=S.place;const L=places().map(p=>p.k).concat(["home"]).filter(k=>k&&k!==here).map(k=>{let t=99;try{t=travel(here,k)}catch(e){}return [k,t]})
   .filter(([k,t])=>{try{return typeof walkOk!=="function"||walkOk(t)}catch(e){return true}}).sort((a,b)=>a[1]-b[1]).slice(0,KIT_SCRV.pre);
  const U=[...new Set(L.map(([k])=>{try{const f=SCIMG[placeOf(k).sc];return f?scrvAbs(IMG_BASE+"img/"+f+".webp"):""}catch(e){return ""}}).filter(u=>u&&!SCRV_OK.has(u)))];
  const idle=window.requestIdleCallback||(f=>setTimeout(f,200));const next=()=>{if(SCRV_RUN||!U.length)return;const u=U.shift();idle(()=>scrvWaitUrl(u).then(next),{timeout:4000})};next();KIT_SCRV.stat.pre=(KIT_SCRV.stat.pre||0)+U.length}catch(e){}},1500)}
/* veil at once (before building a new view); kitScreenVeilDone() = reveal as soon as the built view's pictures are decoded */
function kitScreenVeil(dest){SCRV_HOLD=1;scrvEl(dest);SCRV_RUN={t0:performance.now(),hold:1}}
function kitScreenVeilDone(root,dest){SCRV_HOLD=0;SCRV_RUN=null;scrvKeyNow();return kitScreenVeilUntil(root||document.body,dest).then(v=>{if(!v)scrvReveal();return v})}
let SCRV_HOLD=0;
/* ---- the VIEW KEY watcher (every screen change of the game) ---- */
const SCRV_ID=new WeakMap();let SCRV_IDN=0;const scrvId=o=>{if(!o||typeof o!=="object")return "";let i=SCRV_ID.get(o);if(!i){i=++SCRV_IDN;SCRV_ID.set(o,i)}return i};
/* layers that ARE a new view (motion stages, scenes, roulette, podium, display room, ending, Dư đồ focus, dawn, picture zoom, rank board, co-op
   screens). One selector query per DOM batch; the layer's own element identity is in the key (a new layer = a new view). Scan: dev/test/screen-veil-scan.py */
const SCRV_OV="body>.kmov,#kpodov,.kroul,.kscn,#kdr,.kes-ov,.kfoc,#dawn,#kpzoom,#kpinfo,#krkov,#kctmh,#kctmp,#coopfz,#kchatp";
function scrvOverlays(){let k="";try{for(const c of document.querySelectorAll(SCRV_OV)){if(c.hidden||c.closest("#kveil,#kitpage"))continue;k+="|o"+(c.id||String(c.className).split(" ")[0])+scrvId(c)}}catch(e){}return k}
function scrvKey(){let k="";try{if(typeof S!=="undefined"&&S)k+="L"+scrvId(S)+"|p"+(S.place||"")+"|g"+(S.mg?scrvId(S.mg):"")}catch(e){}
 try{k+="|t"+(typeof tab!=="undefined"?tab:"")}catch(e){}
 try{const M=document.getElementById("modal");if(M&&!M.hidden&&typeof Q!=="undefined"&&Q[0])k+="|q"+scrvId(Q[0])}catch(e){}
 try{const O=document.getElementById("ov");if(O&&!O.hidden)k+="|v"+scrvId(O.firstElementChild)}catch(e){}/* the mini-game board layer (j5 openMG) */
 return k+scrvOverlays()}
function scrvBlocked(){if(!KIT_SCRV.on)return true;if(typeof S==="undefined"||!S)return true;const t=document.getElementById("title");if(t&&!t.hidden)return true;
 if(document.getElementById("klife")||document.querySelector("#kload:not(.out)"))return true;return false}
/* which line: what changed between two keys */
function scrvDest(a,b){const f=(s,c)=>{const m=(s||"").match(new RegExp("\\|"+c+"([^|]*)"));return m?m[1]:""};
 if((a||"").split("|")[0]!==(b||"").split("|")[0])return "book";if(f(a,"p")!==f(b,"p")){const p=f(b,"p");return p==="home"?"home":p}
 if((f(b,"g")&&f(a,"g")!==f(b,"g"))||(f(b,"v")&&f(a,"v")!==f(b,"v")))return "board";if(f(b,"q")&&f(a,"q")!==f(b,"q"))return "event";return "scene"}
let SCRV_KEY="";function scrvKeyNow(){SCRV_KEY=scrvKey()}
function scrvCheck(){if(SCRV_HOLD)return;const k=scrvKey();if(k===SCRV_KEY)return;const old=SCRV_KEY;SCRV_KEY=k;if(SCRV_LATE&&SCRV_LATE.key!==k)scrvLateStop();/* the late guard belongs to the view it was raised in */if(scrvBlocked()||!old)return;const dest=scrvDest(old,k);
 kitScreenVeilUntil(document.body,dest).then(v=>{if(v)return;/* nothing pending now: pictures that a module sets a few frames later (RV-171 FAIL-2, warm tab «act») are caught by two rescans; LRM5: until a rescan veils them the light guard hides each one the moment it is attached (Fold cold tab «act»: card art showed undecoded for one frame, 46 ms before the 50 ms rescan) */
  if(KIT_SCRV.after&&!SCRV_LATE)scrvHideLate(document.body,1);
  for(const ms of [50,160,360])setTimeout(()=>{if(SCRV_RUN||SCRV_KEY!==k||scrvBlocked())return;if(scrvPend(document.body).length)kitScreenVeilUntil(document.body,dest)},ms)})}
(function(){try{const st=document.createElement("style");st.id="kit-scrv";st.textContent=
`.kscrv{position:fixed;inset:0;z-index:9790;/* above the kit chips + toasts (.ktbt 9760): RV-171 FAIL-3 */display:flex;align-items:center;justify-content:center;background:var(--k-card,#fffaf0);opacity:1;transition:opacity ${KIT_SCRV.fade}ms ease;pointer-events:auto;touch-action:none}
.kscrv[hidden]{display:none}.kscrv.out{opacity:0;pointer-events:none}
.kscrv-hide{visibility:hidden!important}.kscrv-nobg{background-image:none!important}/* late guard: an undecoded CSS background waits behind this class (§97.3), the element keeps its own inline value */
.kscrv-l{font-family:var(--display,serif);font-size:1.05rem;letter-spacing:.04em;color:var(--k-lab,#8a7350);opacity:0;animation:kscrvW .3s ease var(--kscrv-word,220ms) forwards}
@keyframes kscrvW{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.kscrv{transition:none}.kscrv-l{animation-duration:.01s}}`;document.head.appendChild(st)}catch(e){console.error("kit-scrv",e)}
 try{const mo=new MutationObserver(scrvCheck);const go=()=>{mo.observe(document.body,{childList:true,subtree:true});const M=document.getElementById("modal");if(M)mo.observe(M,{attributes:true,attributeFilter:["hidden"]})};
  if(document.body)go();else document.addEventListener("DOMContentLoaded",go)}catch(e){console.error("kit-scrv mo",e)}})();
/* kit sample page §97 */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§97",title:"Màn che đổi cảnh: che cả màn, một dòng ngắn, mở ra một lần khi tranh đã đủ",html:()=>
 `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">`+["home","thu","tn","tyv","vuon","event","board","book","scene"].map(d=>
 `<div class="kscrv" style="position:relative;inset:auto;z-index:auto;height:110px;border:1px solid var(--k-hair,#e6d3ac);border-radius:8px"><div class="kscrv-l" style="opacity:1;animation:none">${kitScrvWord(d)}</div></div>`).join("")+`</div>`})}catch(e){}
