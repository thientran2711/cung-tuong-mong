/* ================= jemoseal: kitEmoSeal — EVERY mood seal moves, everywhere it shows (KIT 38.4; owner 17/11 ~18:00Z + ~18:30Z (D)) =================
   ONE kit part for every img.kemo (pcPort frames, person cards, lists, mood box, the figure-head seal of jfigseal): no seal draws its own motion.
   (1) MOTION (owner 19/11 ~02:15Z): IDLE = every live seal sways extremely slightly and slowly (CSS `rotate` only, KIT_EMOSEAL.idle: +-deg, period s, never a shake); LEAN-IN = every few seconds
       (random KIT_EMOSEAL.lean.min..max s per seal, never two seals together: global gap KIT_EMOSEAL.lean.gap) the seal scales up (KIT_EMOSEAL.lean.scale, as if leaning forward to talk), plays its
       feeling's OWN stronger motion kemoL-<m> (KIT_EMOSEAL.keys[k].m, duration .d) and settles back to idle. Motions (data, per feeling): shake giận (fast + heat glow) · droop buồn/khóc (slow sad up-down) ·
       sway vui (bright sway + glow) · tremble sợ · bob lo · flicker ghen/hờn (side glance) · glint mưu · wince đau · nod bình/an. Unknown key = defaultMotion. Live only while ON SCREEN (kemo-live), only with
       Cảnh động on, no prefers-reduced-motion and not Gọn (OPT.fxon === false). Idle = `rotate`, lean = `transform`/`filter`: separate properties, never fight. Cheap on Fold (no layout, no per-frame JS).
   (2) FRAME LOOP source (optional, painted by Foreman C): img/kit/emo-anim/<set><k>.webp (animated webp / apng). Probed once per file; when it exists the seal swaps its still for the loop
       DURING THE LEAN-IN only and back to the still when the lean ends or the seal leaves the screen; no file = the still + the CSS motion. Same asset-set rule as the still: <set> = "" women, "m-" young men, "mo-" mature men.
   (3) EFFECT-SPRITE layer (optional, painted): img/kit/emo-fx/<k>.webp (smoke puffs, tears, sweat, glint …): ONE sibling img.kemofx per leaning seal, centred on the seal at KIT_EMOSEAL.fxScale x its size,
       pointer-events none, removed when the lean ends or the seal leaves the screen. No file = no layer. Nothing is drawn in code (no code-drawn tears / smoke).
   KEYS: the seal map holds khoc + hon too (names "Khóc", "Hờn"); the mood logic (jemo EMO) decides when a person is in one — until then they never appear. ===== */
window.KIT_EMOSEAL=window.KIT_EMOSEAL||{keys:{vui:{m:"sway",d:2.8},binh:{m:"nod",d:3.0},buon:{m:"droop",d:3.6},gian:{m:"shake",d:2.0},so:{m:"tremble",d:2.4},ghen:{m:"flicker",d:3.0},lo:{m:"bob",d:2.8},dau:{m:"wince",d:2.8},muu:{m:"glint",d:3.0},an:{m:"nod",d:3.0},khoc:{m:"droop",d:3.6,name:"Khóc"},hon:{m:"flicker",d:3.0,name:"Hờn"},chanh:{m:"flicker",d:3.0},phanno:{m:"shake",d:2.0},runso:{m:"tremble",d:2.4},matngu:{m:"droop",d:3.6},tutin:{m:"nod",d:3.0},hanghai:{m:"bob",d:2.8},tinhtu:{m:"sway",d:2.8},chuyentam:{m:"nod",d:3.0},hungkhoi:{m:"glint",d:3.0},tinhnghich:{m:"bob",d:2.8},hothen:{m:"droop",d:3.6},chan:{m:"droop",d:3.6},khochiu:{m:"flicker",d:3.0},choang:{m:"wince",d:2.8}},
 defaultMotion:"nod",defaultDur:3.0,idle:{deg:.6,per:[8,11]},lean:{scale:[2.2,2.4],minS:1.2,minFrac:.2,maxFrac:.5,margin:.09,marginPx:4,grow:1.6,shrink:1.6,holdMin:5,loops:2,min:4,max:8,gap:1.2,z:9990},anim:"img/kit/emo-anim/",fx:"img/kit/emo-fx/",fxScale:1.7};
const KES_HAVE={};/* url -> true | false | "wait" (probe result) */
function kesProbe(url,cb){const h=KES_HAVE[url];if(h===true||h===false){cb(h);return}
 if(h&&h.w){h.w.push(cb);return}const e={w:[cb]};KES_HAVE[url]=e;const im=new Image();const done=ok=>{KES_HAVE[url]=ok;e.w.forEach(f=>{try{f(ok)}catch(x){}})};im.onload=()=>done(true);im.onerror=()=>done(false);im.src=url}
function kesMotionOK(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kesKey(el){const m=/kemo-([a-z0-9_-]+)/.exec(el.className.replace(/kemo-(live|m-\w+)/g,""));return m?m[1]:""}
/* the still name of the seal minus the key: img/kit/emo-<set><k>.webp -> "<set>" */
function kesSet(el,k){const m=/emo-((?:m-|mo-)?)[a-z-]+\.webp/.exec(el.getAttribute("data-kemos")||el.getAttribute("src")||"");return m?m[1]:""}
function kesFxOff(el){const f=el.__fx;if(f){f.remove();el.__fx=null}}
function kesFxSync(el){const f=el.__fx,c=el.__big;if(!f||!c||!c.isConnected)return;const r=c.getBoundingClientRect(),W=r.width*KIT_EMOSEAL.fxScale,H=r.height*KIT_EMOSEAL.fxScale;
 f.style.cssText=`position:fixed!important;z-index:${KIT_EMOSEAL.lean.z+1};left:${(r.left+r.width/2-W/2).toFixed(1)}px;top:${(r.top+r.height/2-H/2).toFixed(1)}px;width:${W.toFixed(1)}px;height:${H.toFixed(1)}px`}
function kesReal(el){/* a key whose own still is not on screen (feelArt / feelFb walked to a nearest painting): the real still replaces it once it exists on the CDN */const k=kesKey(el);if(!k||el.__real)return;const set=kesSet(el,k),real=`img/kit/emo-${set}${k}.webp`;if((el.getAttribute("src")||"").indexOf(real)>=0)return;el.__real=1;
 kesProbe(real,ok=>{if(!ok)return;if(el.isConnected){el.dataset.kemos=real;if(!/emo-anim/.test(el.getAttribute("src")||""))el.setAttribute("src",real)}})}
function kesR(a,b){return a+Math.random()*(b-a)}
function kesSpec(k){return KIT_EMOSEAL.keys[k]||KIT_EMOSEAL.keys[k.replace(/^act-/,"")]}
/* LEAN-IN (owner 19/11 ~05:05Z): the seal is still while small. Every few seconds ONE seal (global stagger) is lifted onto a fixed overlay clone `img.kemo-big` (above every UI, never clipped by a frame,
   clamped inside the screen), GROWS slowly to lean.scale x its size (lean.grow s), HOLDS big while the feeling's motion loops n times (n x keys[k].d s, at least lean.holdMin s AND lean.loops loops),
   SHRINKS slowly back (lean.shrink s) onto the still seal. Envelope = CSS `scale`/`translate` (keyframes kemoGrow, kemoShrink), feeling motion = `transform` (kemoL-<m>, one loop = keys[k].d). Numbers all in KIT_EMOSEAL. */
let kesCur=null,kesLastEnd=0;
function kesLeanEnd(el){if(el.__lt){clearTimeout(el.__lt);el.__lt=0}if(el.__lw){clearInterval(el.__lw);el.__lw=0}el.classList.remove("kemo-lean");const c=el.__big;if(c){c.remove();el.__big=null}
 const still=el.dataset.kemos;if(still&&el.getAttribute("src")!==still)el.setAttribute("src",still);kesFxOff(el);if(kesCur===el){kesCur=null;kesLastEnd=performance.now()}}
function kesSchedule(el){if(el.__ln)clearTimeout(el.__ln);const L=KIT_EMOSEAL.lean;el.__ln=setTimeout(()=>kesLean(el),kesR(L.min,L.max)*1000)}
function kesLean(el,force){el.__ln=0;if(!el.isConnected||!el.classList.contains("kemo-live"))return;
 const L=KIT_EMOSEAL.lean,now=performance.now();
 if(!force&&((kesCur&&kesCur!==el&&kesCur.isConnected&&kesCur.classList.contains("kemo-lean"))||kesLastEnd+L.gap*1000>now)){/* stagger: never two seals leaning together, next only after the previous one fully ended + gap */
  el.__ln=setTimeout(()=>kesLean(el),Math.max(300,kesLastEnd+L.gap*1000-now)+kesR(100,900));return}
 if(kesCur&&kesCur!==el)kesLeanEnd(kesCur);
 const r=el.getBoundingClientRect();if(r.width<2||r.bottom<=0||r.top>=innerHeight||r.right<=0||r.left>=innerWidth){kesSchedule(el);return}
 kesCur=el;const k=kesKey(el),spec=kesSpec(k),d=(spec&&spec.d)||KIT_EMOSEAL.defaultDur,still=el.dataset.kemos;
 const n=Math.max(L.loops,Math.ceil(L.holdMin/d)),hold=n*d,tot=L.grow+hold+L.shrink;
 const sc=Math.min(innerWidth,innerHeight)/Math.max(r.width,r.height);let S=Math.max(kesR(L.scale[0],L.scale[1]),L.minFrac*sc);S=Math.max(L.minS,Math.min(S,L.maxFrac*sc));/* big enough to read the face: >= minFrac of the short screen side, never past maxFrac */
 const bw=r.width*S,bh=r.height*S,m=Math.round(Math.max(bw,bh)*L.margin)+L.marginPx,/* margin = room for the feeling motion (shake / sway amplitude) */ cx=r.left+r.width/2,cy=r.top+r.height/2;
 const bl=Math.max(m,Math.min(cx-bw/2,innerWidth-bw-m)),bt=Math.max(m,Math.min(cy-bh/2,innerHeight-bh-m));/* clamped inside the screen */
 const c=document.createElement("img");c.className="kemo-big kemo-m-"+(spec?spec.m:KIT_EMOSEAL.defaultMotion);c.alt="";c.setAttribute("aria-hidden","true");c.src=el.getAttribute("src");
 c.style.cssText=`position:fixed;z-index:${L.z};left:${bl.toFixed(1)}px;top:${bt.toFixed(1)}px;width:${bw.toFixed(1)}px;height:${bh.toFixed(1)}px;pointer-events:none;object-fit:${getComputedStyle(el).objectFit||"contain"};`+
  `--kb-dx:${(cx-(bl+bw/2)).toFixed(1)}px;--kb-dy:${(cy-(bt+bh/2)).toFixed(1)}px;--kb-s:${(1/S).toFixed(4)};--kb-ss:${L.shrink}s;--kb-sd:${(L.grow+hold).toFixed(2)}s;--kb-d:${d}s;--kb-n:${n};--kb-gs:${L.grow}s`;
 document.body.appendChild(c);el.__big=c;el.classList.add("kemo-lean");
 const set=kesSet(el,k);
 kesProbe(KIT_EMOSEAL.anim+set+k+".webp",ok=>{if(ok&&el.isConnected&&el.__big===c)c.src=KIT_EMOSEAL.anim+set+k+".webp"});
 kesProbe(KIT_EMOSEAL.fx+k+".webp",ok=>{if(!ok||!el.isConnected||el.__big!==c||el.__fx)return;
  const f=document.createElement("img");f.className="kemofx kemofx-"+k;f.alt="";f.setAttribute("aria-hidden","true");f.src=KIT_EMOSEAL.fx+k+".webp";f.onerror=()=>f.remove();document.body.appendChild(f);el.__fx=f;kesFxSync(el)});
 const ox=r.left,oy=r.top;/* the small seal left the screen / moved (scroll, re-render): end the lean at once */
 el.__lw=setInterval(()=>{if(!el.isConnected||!el.classList.contains("kemo-live")){kesLeanEnd(el);return}const q=el.getBoundingClientRect();if(Math.abs(q.left-ox)>10||Math.abs(q.top-oy)>10||q.bottom<=0||q.top>=innerHeight){kesLeanEnd(el);kesSchedule(el)}},250);
 el.__lt=setTimeout(()=>{kesLeanEnd(el);kesSchedule(el)},tot*1000+80)}
function kesLive(el,on){if(!el.isConnected)return;kesReal(el);
 if(!el.dataset.kemos){el.dataset.kemos=el.getAttribute("src")||""}
 const was=el.classList.contains("kemo-live"),live=on&&kesMotionOK();el.classList.toggle("kemo-live",live);const k=kesKey(el),spec=kesSpec(k);if(!/kemo-m-/.test(el.className))el.classList.add("kemo-m-"+(spec?spec.m:KIT_EMOSEAL.defaultMotion));
 if(live){if(!was){const I=KIT_EMOSEAL.idle;el.style.setProperty("--kemo-id",I.deg+"deg");el.style.setProperty("--kemo-ip",kesR(I.per[0],I.per[1]).toFixed(2)+"s");el.style.setProperty("--kemo-i0","-"+kesR(0,I.per[1]).toFixed(2)+"s");if(!el.__ln)kesSchedule(el)}}
 else{if(el.__ln){clearTimeout(el.__ln);el.__ln=0}kesLeanEnd(el)}}
const KES_IO=typeof IntersectionObserver==="function"?new IntersectionObserver(es=>{for(const e of es)kesLive(e.target,e.isIntersecting)},{threshold:.01}):null;
function kesWatch(el){if(!el||el.__kes)return;el.__kes=1;if(KES_IO)KES_IO.observe(el);else kesLive(el,true)}
function kesScan(){document.querySelectorAll("img.kemo").forEach(kesWatch)}
function kesSweep(){/* effect layers + big clones whose seal is gone */const L=[...document.querySelectorAll("img.kemo")];document.querySelectorAll("img.kemofx").forEach(f=>{if(!L.some(c=>c.__fx===f))f.remove()});document.querySelectorAll("img.kemo-big").forEach(f=>{if(!L.some(c=>c.__big===f))f.remove()})}
let kesQ=0;function kesSched(){if(kesQ)return;kesQ=requestAnimationFrame(()=>{kesQ=0;kesScan();kesSweep()})}
try{new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches&&n.matches("img.kemo")||n.querySelector&&n.querySelector("img.kemo")))||[...m.removedNodes].some(n=>n.nodeType===1)))kesSched()}).observe(document.body,{childList:true,subtree:true})}catch(e){}
addEventListener("resize",()=>document.querySelectorAll("img.kemo.kemo-lean").forEach(el=>{kesLeanEnd(el);kesSchedule(el)}));
kesScan();
/* r2 reviewer fix: Cảnh động / Gọn switched in Settings applies to the seals already on screen at once (saveOpt does not re-render) */
(function(){if(typeof saveOpt!=="function")return;const o=saveOpt;saveOpt=function(){const r=o.apply(this,arguments);try{document.querySelectorAll("img.kemo").forEach(el=>{if(!el.__kes)return;const b=el.getBoundingClientRect();kesLive(el,b.width>2&&b.bottom>0&&b.top<innerHeight&&b.right>0&&b.left<innerWidth)})}catch(e){}return r}})();
window.kitEmoSeal={scan:kesScan,live:kesLive,probe:kesProbe,lean:kesLean};/* no pop: owner 17/11 ~18:10Z (Sims model), the seal has ONE source (jemo emoSealKey) */
(function(){const st=document.createElement("style");st.id="kemoseal-css";st.textContent=`
img.kemo{transform-origin:50% 60%;will-change:auto}
img.kemofx{position:absolute!important;pointer-events:none;z-index:8;object-fit:contain;max-width:none;max-height:none;margin:0;border-radius:0}
img.kemo.kemo-lean{visibility:hidden}
img.kemo-big{transform-origin:50% 58%;will-change:transform,scale;filter:drop-shadow(0 4px 10px #000a)}
@media (prefers-reduced-motion:no-preference){
img.kemo.kemo-live{animation:kemoIdle var(--kemo-ip,9s) ease-in-out var(--kemo-i0,0s) infinite}
img.kemo-big{animation:kemoGrow var(--kb-gs,1.6s) cubic-bezier(.4,0,.25,1) 0s 1 both,kemoShrink var(--kb-ss,1.6s) cubic-bezier(.4,0,.25,1) var(--kb-sd,8s) 1 forwards,var(--kb-k,kemoL-nod) var(--kb-d,3s) ease-in-out var(--kb-gs,1.6s) var(--kb-n,2) both}
img.kemo-big.kemo-m-nod{--kb-k:kemoL-nod}
img.kemo-big.kemo-m-sway{--kb-k:kemoL-sway}
img.kemo-big.kemo-m-droop{--kb-k:kemoL-droop}
img.kemo-big.kemo-m-shake{--kb-k:kemoL-shake}
img.kemo-big.kemo-m-tremble{--kb-k:kemoL-tremble}
img.kemo-big.kemo-m-flicker{--kb-k:kemoL-flicker}
img.kemo-big.kemo-m-bob{--kb-k:kemoL-bob}
img.kemo-big.kemo-m-wince{--kb-k:kemoL-wince}
img.kemo-big.kemo-m-glint{--kb-k:kemoL-glint}
img.kemofx{animation:kemoFx 2.4s ease-in-out infinite}
}
/* IDLE: ONLY the rotate property, barely visible + very slow (owner 19/11 ~05:05Z: the small seal is still) */
@keyframes kemoIdle{0%,100%{rotate:calc(var(--kemo-id,.6deg) * -1)}50%{rotate:var(--kemo-id,.6deg)}}
/* ENVELOPE (CSS scale + translate props, never fights the feeling's transform): small (at the real seal) -> big (kemoGrow) -> hold -> small (kemoShrink, delayed by grow+hold) */
@keyframes kemoGrow{from{scale:var(--kb-s);translate:var(--kb-dx) var(--kb-dy)}to{scale:1;translate:0 0}}
@keyframes kemoShrink{from{scale:1;translate:0 0}to{scale:var(--kb-s);translate:var(--kb-dx) var(--kb-dy)}}
/* FEELING MOTIONS: ONE slow readable loop each (length = keys[k].d), played n times during the hold. transform/filter only, amplitudes as % of the BIG seal. */
@keyframes kemoL-nod{0%,100%{transform:translateY(0)}30%{transform:translateY(3%)}60%{transform:translateY(0) rotate(-1deg)}80%{transform:translateY(2%)}}
@keyframes kemoL-sway{0%,100%{transform:rotate(0);filter:drop-shadow(0 0 6px #ffe9a0)}25%{transform:translateY(-3%) rotate(-4deg)}50%{transform:rotate(0);filter:drop-shadow(0 0 12px #ffe9a0)}75%{transform:translateY(-3%) rotate(4deg)}}
@keyframes kemoL-droop{0%,100%{transform:translateY(0) rotate(0)}40%{transform:translateY(6%) rotate(-3deg)}65%{transform:translateY(5%) rotate(-3deg)}85%{transform:translateY(1%) rotate(0)}}
@keyframes kemoL-shake{0%,100%{transform:translateX(0);filter:drop-shadow(0 0 8px #ff7a4a)}12%{transform:translateX(-4%) rotate(-1.5deg)}25%{transform:translateX(4%) rotate(1.5deg);filter:drop-shadow(0 0 14px #ff5a2a)}38%{transform:translateX(-4%) rotate(-1.5deg)}50%{transform:translateX(3%) rotate(1deg);filter:drop-shadow(0 0 14px #ff5a2a)}62%{transform:translateX(-2%)}75%{transform:translateX(0)}}
@keyframes kemoL-tremble{0%,100%{transform:translate(0,0)}15%{transform:translate(1.2%,0)}30%{transform:translate(-1.2%,.8%)}45%{transform:translate(.8%,-.8%)}60%{transform:translate(-1%,1%)}75%{transform:translate(1%,0)}90%{transform:translate(-.6%,.4%)}}
@keyframes kemoL-bob{0%,100%{transform:translateY(0)}25%{transform:translateY(-5%)}50%{transform:translateY(0)}75%{transform:translateY(-4%)}}
@keyframes kemoL-flicker{0%,100%{transform:translateX(0);opacity:1}20%{transform:translateX(-4%);opacity:.85}40%{transform:translateX(-4%);opacity:1}60%{transform:translateX(0)}80%{transform:translateX(4%);opacity:.85}}
@keyframes kemoL-glint{0%,100%{filter:drop-shadow(0 0 2px #d9c4ff)}50%{filter:drop-shadow(0 0 14px #d9c4ff)}}
@keyframes kemoL-wince{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-3deg) scale(.96)}50%{transform:rotate(2deg) scale(1)}75%{transform:rotate(-2deg) scale(.97)}}
@keyframes kemoFx{0%,100%{opacity:.9;transform:translateY(0)}50%{opacity:1;transform:translateY(-3%)}}
`;document.head.appendChild(st)})();
