/* ================= jreveal: kitReveal — FACE REVEAL motion (owner 18/11 ~06:20Z, KIT §79) =================
   When she first SEES a person's face (the grey stranger frame / grey stage silhouette becomes the real picture) the real picture appears IN PLACE out of
   the grey: the grey silhouette stays on top of the real picture and a soft hole opens from the face outward (ink-wash clears), BAL.faceReveal.ms (~1 s,
   ease-out). Never an instant swap, never a scene change, never blocks a tap. Gọn / reduced motion / "Cảnh động" off: a short fade of the grey (BAL.faceReveal.lite).
   ONE kit part for every place a person's picture is drawn: tall frame (pcPort / pframe), small avatar (mdH), room-stage figure (#tokens .tok), event-stage figure
   (kitStageFig). Those four outer wrappers only MARK the element: data-krv = the person's key (kOf61), data-krvs = 1 face shown / 0 grey, data-krvk = kind, data-krvsil =
   the grey picture. The player is the observer: it fires once per kind per reveal, in whichever place draws the new face first (a place that opens within
   BAL.faceReveal.win of the learning still plays; one that opens later shows the face as is).
   WHEN a reveal starts: (1) k61Know / k61Meet (every way of learning a face: greet, arrival, scouting, reports, event dialogs) flip a stranger's face-known state;
   (2) a place that was drawn grey is drawn with the face. Co-op: local only (a render of local state; nothing is sent). Fires only on a flip, so loading a save shows
   everyone as is. Test: node dev/test/face-reveal.js. ================= */
const KRV={last:{},ev:{},rect:{}};
function krvKey(p){try{if(!p||typeof k61PortEnt!=="function")return"";const e=k61PortEnt(p)||(p.__kp&&typeof p.__kp==="object"?p.__kp:null);if(!e||e===S)return"";return kOf61(e)}catch(x){return""}}
function krvKnown(p){try{return kitIsKnown(p.__kp&&typeof p.__kp==="object"?p.__kp:k61PortEnt(p)||p)}catch(x){return true}}
function krvSex(p){try{return kitSilG(p.__kp&&typeof p.__kp==="object"?p.__kp:k61PortEnt(p)||p)}catch(x){return"f"}}
function krvMark(h,rootRe,p,kind,sil){try{if(typeof h!=="string"||!p)return h;const k=krvKey(p);if(!k)return h;const m=/^\s*<[a-z]+[^>]*>/.exec(h);if(!m||!rootRe.test(m[0]))return h;
 return h.replace(/^(\s*<[a-z]+)/,`$1 data-krv="${k}" data-krvs="${krvKnown(p)?1:0}" data-krvk="${kind}" data-krvsil="${sil}"`)}catch(x){return h}}
/* the three outer wrappers (this module loads last: they sit outside every other wrapper of the same function) */
(function(){const P=pcPort;pcPort=function(f){const h=P.apply(this,arguments);return krvMark(h,/class="pcp/,f,"pc",KIT_DIR+"unknown-"+krvSex(f||{})+".webp")}})();
(function(){const M=mdH;mdH=function(p){const h=M.apply(this,arguments);return krvMark(h,/class="md /,p,"md",KIT_DIR+"unknown-"+krvSex(p||{})+".webp")}})();
(function(){const F=kitStageFig;kitStageFig=function(p){const h=F.apply(this,arguments);try{const q=p&&(p.__kp||p);return krvMark(h,/class="kesf"/,q,"kes",KIT_DIR+"unknown-fig-"+krvSex(q)+".webp")}catch(x){return h}}})();
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{krvStage()}catch(x){}return r}})();
function krvStage(){const ppl=typeof curPeople==="function"?curPeople():[];document.querySelectorAll("#tokens .tok.fig").forEach(b=>{const p=ppl[+b.dataset.p];if(!p)return;const w=(typeof figWho==="function"?figWho(p):null)||p.ref||(p.kind==="emp"?S.emp:p.kind==="th"?S.thO:p.kind==="maid"?S.maid:p);
 const k=krvKey(w);if(!k)return;b.dataset.krv=k;b.dataset.krvk="fig";b.dataset.krvs=krvKnown(w)?"1":"0";b.dataset.krvsil=KIT_DIR+"unknown-fig-"+krvSex(w)+".webp"})}
/* ---- flips: every way of learning a face goes through k61Know / k61Meet ---- */
function krvUnknownKeys(){const o={};try{for(const e of k61All())if(e&&e!==S&&!isKnown61(e))o[kOf61(e)]=1}catch(x){}return o}
function krvFlip(k){const n=Date.now(),v=KRV.ev[k];if(v&&n-v.t<BAL.faceReveal.win)return;KRV.ev[k]={t:n,p:{}};KRV.last[k]=1;krvSoon()}
(function(){const K=k61Know,M=k61Meet;const W=f0=>function(){let b=null;try{if(S&&S.known)b=krvUnknownKeys()}catch(x){}const r=f0.apply(this,arguments);try{if(b){const a=krvUnknownKeys();for(const k in b)if(!a[k])krvFlip(k)}}catch(x){}return r};
 k61Know=W(K);k61Meet=W(M)})();
/* ---- the player ---- */
function krvTarget(el,kind){if(kind==="pc")return el.querySelector(".kin>img.kpor");if(kind==="fig")return el.querySelector(".figimg");if(kind==="kes")return el.querySelector(".kesimg");return el.querySelector(".kin>img.kpor")||el.querySelector("img:not(.kfr):not(.kgem):not(.kemb)")}
function krvPlay(el,kind,elapsed){const t=krvTarget(el,kind);if(!t||!t.parentNode)return false;const sil=el.dataset.krvsil;if(!sil)return false;
 const lite=typeof kmReduced==="function"&&kmReduced();const ms=BAL.faceReveal[lite?"lite":"ms"];if(elapsed>=ms)return true;
 const g=document.createElement("img");g.src=sil;g.alt="";g.setAttribute("aria-hidden","true");g.draggable=false;g.className="krvg"+(lite?" krvlite":"")+(kind==="fig"||kind==="kes"?" krvfig":"");
 g.style.setProperty("--krvms",ms+"ms");g.style.setProperty("--krvd",(-elapsed)+"ms");const P=t.parentNode;let sync=null;
 if(t.classList.contains("kpor")&&P.classList.contains("kin")){g.classList.add("kpor","krvk");if(/face-/.test(t.getAttribute("src")||""))g.classList.add("krvf");P.insertBefore(g,t.nextSibling)}
 else{const cs=getComputedStyle(t);g.style.objectFit=cs.objectFit;g.style.objectPosition=cs.objectPosition;g.style.borderRadius=cs.borderRadius;P.insertBefore(g,t.nextSibling);
  /* the grey ghost keeps the box of the real picture every frame (a figure is sized when its picture finishes loading) */
  sync=()=>{if(!g.isConnected||!t.isConnected)return;const o=g.offsetParent;if(o){const a=o.getBoundingClientRect();let b=t.getBoundingClientRect();if(b.width<2||b.height<2){const m=KRV.rect[el.dataset.krv+kind];if(m)b={left:m[0],top:m[1],width:m[2],height:m[3]}}const sx=a.width/(o.offsetWidth||1)||1,sy=a.height/(o.offsetHeight||1)||1;
   g.style.left=(b.left-a.left)/sx-(o.clientLeft||0)+"px";g.style.top=(b.top-a.top)/sy-(o.clientTop||0)+"px";g.style.width=b.width/sx+"px";g.style.height=b.height/sy+"px"}requestAnimationFrame(sync)};sync()}
 /* the ghost waits for the real picture to be there (a still-loading picture would otherwise end under the veil's clearing) */
 if(!t.complete){g.style.animationPlayState="paused";const go=()=>{g.style.animationPlayState=""};t.addEventListener("load",go,{once:true});t.addEventListener("error",go,{once:true});setTimeout(go,2500)}
 const done=()=>{try{g.remove()}catch(x){}};g.addEventListener("animationend",done);setTimeout(done,ms+(t.complete?900:3500)+Math.max(0,-elapsed));return true}
/* run in the mutation microtask, before the next paint: the real picture is never seen unveiled for a frame */
function krvSoon(){krvTick()}
function krvTick(){try{if(!S||KRV.off||screenOff())return;const L=document.querySelectorAll("[data-krv]");if(!L.length)return;const n=Date.now(),grey={},shown={};let retry=false;
 L.forEach(el=>{const k=el.dataset.krv;if(el.dataset.krvs==="1")shown[k]=1;else{grey[k]=1;try{const t=krvTarget(el,el.dataset.krvk),r=t&&t.getBoundingClientRect();if(r&&r.width>4&&r.height>4)KRV.rect[k+el.dataset.krvk]=[r.left,r.top,r.width,r.height]}catch(x){}}});
 for(const k in grey)if(!shown[k])KRV.last[k]=0;
 for(const k in shown)if(!grey[k]&&KRV.last[k]===0)krvFlip(k);else if(!grey[k]&&KRV.last[k]==null)KRV.last[k]=1;
 L.forEach(el=>{if(el.dataset.krvs!=="1"||el.__krvd)return;const k=el.dataset.krv,v=KRV.ev[k];if(!v||n-v.t>BAL.faceReveal.win)return;const kind=el.dataset.krvk,pl=v.p[kind];
  if(pl&&n-pl.t0>=BAL.faceReveal[typeof kmReduced==="function"&&kmReduced()?"lite":"ms"])return;if(krvPlay(el,kind,pl?n-pl.t0:0)){el.__krvd=1;if(!pl)v.p[kind]={t0:n}}else retry=true});
 /* a picture still loading has no size yet: look again soon, within the reveal window */
 if(retry&&!krvTick.r){krvTick.r=setTimeout(()=>{krvTick.r=0;krvTick()},160)}}catch(x){console.error("krv",x)}}
(function(){const mo=new MutationObserver(krvSoon);const go=()=>{try{mo.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["data-krvs"]})}catch(x){}};if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();
window.kitReveal={KRV,play:krvTick,flip:krvFlip};
/* kit CSS: the grey veil only */
(function(){const st=document.createElement("style");st.id="kreveal";st.textContent=`
@property --krvr{syntax:"<percentage>";inherits:false;initial-value:0%}
.krvg{position:absolute;pointer-events:none;z-index:5;margin:0;max-width:none!important;max-height:none!important;object-fit:cover;--krvx:50%;--krvy:42%;
 -webkit-mask-image:radial-gradient(circle at var(--krvx) var(--krvy),transparent calc(var(--krvr) - 24%),#000 var(--krvr));mask-image:radial-gradient(circle at var(--krvx) var(--krvy),transparent calc(var(--krvr) - 24%),#000 var(--krvr));
}
img.krvg.krvg.krvg.krvg.krvg{animation:krvwipe var(--krvms,1000ms) cubic-bezier(.3,.15,.35,1) var(--krvd,0ms) both!important}
.krvg.krvfig{--krvy:16%;object-fit:contain;object-position:50% 100%}
.krvg.krvk.krvf{top:20.289%!important;height:49.373%!important}
.krvg.krvlite{-webkit-mask-image:none;mask-image:none}
img.krvg.krvg.krvg.krvg.krvg.krvlite{animation:krvfade var(--krvms,350ms) ease-out var(--krvd,0ms) both!important}
@keyframes krvwipe{0%{--krvr:0%;opacity:1}70%{opacity:1}100%{--krvr:165%;opacity:0}}
@keyframes krvfade{from{opacity:1}to{opacity:0}}
`;document.head.appendChild(st)})();
