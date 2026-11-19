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
window.KIT_EMOSEAL=window.KIT_EMOSEAL||{keys:{vui:{m:"sway",d:1.5},binh:{m:"nod",d:1.1},buon:{m:"droop",d:1.6},gian:{m:"shake",d:1.0},so:{m:"tremble",d:1.1},ghen:{m:"flicker",d:1.4},lo:{m:"bob",d:1.3},dau:{m:"wince",d:1.2},muu:{m:"glint",d:1.4},an:{m:"nod",d:1.1},khoc:{m:"droop",d:1.6,name:"Khóc"},hon:{m:"flicker",d:1.4,name:"Hờn"},chanh:{m:"flicker",d:1.4},phanno:{m:"shake",d:1.0},runso:{m:"tremble",d:1.1},matngu:{m:"droop",d:1.6},tutin:{m:"nod",d:1.1},hanghai:{m:"bob",d:1.3},tinhtu:{m:"sway",d:1.5},chuyentam:{m:"nod",d:1.1},hungkhoi:{m:"glint",d:1.4},tinhnghich:{m:"bob",d:1.3},hothen:{m:"droop",d:1.6},chan:{m:"droop",d:1.6},khochiu:{m:"flicker",d:1.4},choang:{m:"wince",d:1.2}},
 defaultMotion:"nod",defaultDur:1.2,idle:{deg:1.2,per:[6,8]},lean:{scale:[1.12,1.18],min:4,max:8,gap:1.2},anim:"img/kit/emo-anim/",fx:"img/kit/emo-fx/",fxScale:1.7};
const KES_HAVE={};/* url -> true | false | "wait" (probe result) */
function kesProbe(url,cb){const h=KES_HAVE[url];if(h===true||h===false){cb(h);return}
 if(h&&h.w){h.w.push(cb);return}const e={w:[cb]};KES_HAVE[url]=e;const im=new Image();const done=ok=>{KES_HAVE[url]=ok;e.w.forEach(f=>{try{f(ok)}catch(x){}})};im.onload=()=>done(true);im.onerror=()=>done(false);im.src=url}
function kesMotionOK(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kesKey(el){const m=/kemo-([a-z0-9_-]+)/.exec(el.className.replace(/kemo-(live|m-\w+)/g,""));return m?m[1]:""}
/* the still name of the seal minus the key: img/kit/emo-<set><k>.webp -> "<set>" */
function kesSet(el,k){const m=/emo-((?:m-|mo-)?)[a-z-]+\.webp/.exec(el.getAttribute("data-kemos")||el.getAttribute("src")||"");return m?m[1]:""}
function kesFxOff(el){const f=el.__fx;if(f){f.remove();el.__fx=null}}
function kesFxSync(el){const f=el.__fx;if(!f||!el.isConnected)return;const w=el.offsetWidth,h=el.offsetHeight,W=w*KIT_EMOSEAL.fxScale,H=h*KIT_EMOSEAL.fxScale;
 f.style.cssText=`left:${(el.offsetLeft+w/2-W/2).toFixed(1)}px;top:${(el.offsetTop+h/2-H/2).toFixed(1)}px;width:${W.toFixed(1)}px;height:${H.toFixed(1)}px`}
function kesReal(el){/* a key whose own still is not on screen (feelArt / feelFb walked to a nearest painting): the real still replaces it once it exists on the CDN */const k=kesKey(el);if(!k||el.__real)return;const set=kesSet(el,k),real=`img/kit/emo-${set}${k}.webp`;if((el.getAttribute("src")||"").indexOf(real)>=0)return;el.__real=1;
 kesProbe(real,ok=>{if(!ok)return;if(el.isConnected){el.dataset.kemos=real;if(!/emo-anim/.test(el.getAttribute("src")||""))el.setAttribute("src",real)}})}
function kesR(a,b){return a+Math.random()*(b-a)}
function kesSpec(k){return KIT_EMOSEAL.keys[k]||KIT_EMOSEAL.keys[k.replace(/^act-/,"")]}
let kesLastLean=0;
function kesLeanEnd(el){if(el.__lt){clearTimeout(el.__lt);el.__lt=0}el.classList.remove("kemo-lean");const still=el.dataset.kemos;if(still&&el.getAttribute("src")!==still)el.setAttribute("src",still);kesFxOff(el)}
function kesSchedule(el){if(el.__ln)clearTimeout(el.__ln);const L=KIT_EMOSEAL.lean;el.__ln=setTimeout(()=>kesLean(el),kesR(L.min,L.max)*1000)}
function kesLean(el,force){el.__ln=0;if(!el.isConnected||!el.classList.contains("kemo-live"))return;
 const L=KIT_EMOSEAL.lean,now=performance.now(),wait=kesLastLean+L.gap*1000-now;
 if(wait>0&&!force){el.__ln=setTimeout(()=>kesLean(el),wait+kesR(100,900));return}/* stagger: never two seals leaning together */
 kesLastLean=now;const k=kesKey(el),spec=kesSpec(k),d=(spec&&spec.d)||KIT_EMOSEAL.defaultDur,still=el.dataset.kemos;
 el.style.setProperty("--kemo-ls",kesR(L.scale[0],L.scale[1]).toFixed(3));el.style.setProperty("--kemo-ld",d+"s");
 el.classList.remove("kemo-lean");void el.offsetWidth;el.classList.add("kemo-lean");
 const set=kesSet(el,k);
 kesProbe(KIT_EMOSEAL.anim+set+k+".webp",ok=>{if(ok&&el.isConnected&&el.classList.contains("kemo-lean")&&el.getAttribute("src")===still)el.setAttribute("src",KIT_EMOSEAL.anim+set+k+".webp")});
 kesProbe(KIT_EMOSEAL.fx+k+".webp",ok=>{if(!ok||!el.isConnected||!el.classList.contains("kemo-lean")||el.__fx||!el.parentNode)return;
  const f=document.createElement("img");f.className="kemofx kemofx-"+k;f.alt="";f.setAttribute("aria-hidden","true");f.src=KIT_EMOSEAL.fx+k+".webp";f.onerror=()=>f.remove();el.parentNode.appendChild(f);el.__fx=f;kesFxSync(el)});
 el.__lt=setTimeout(()=>{kesLeanEnd(el);kesSchedule(el)},d*1000+150)}
function kesLive(el,on){if(!el.isConnected)return;kesReal(el);
 if(!el.dataset.kemos){el.dataset.kemos=el.getAttribute("src")||""}
 const was=el.classList.contains("kemo-live"),live=on&&kesMotionOK();el.classList.toggle("kemo-live",live);const k=kesKey(el),spec=kesSpec(k);if(!/kemo-m-/.test(el.className))el.classList.add("kemo-m-"+(spec?spec.m:KIT_EMOSEAL.defaultMotion));
 if(live){if(!was){const I=KIT_EMOSEAL.idle;el.style.setProperty("--kemo-id",I.deg+"deg");el.style.setProperty("--kemo-ip",kesR(I.per[0],I.per[1]).toFixed(2)+"s");el.style.setProperty("--kemo-i0","-"+kesR(0,I.per[1]).toFixed(2)+"s");if(!el.__ln)kesSchedule(el)}}
 else{if(el.__ln){clearTimeout(el.__ln);el.__ln=0}kesLeanEnd(el)}}
const KES_IO=typeof IntersectionObserver==="function"?new IntersectionObserver(es=>{for(const e of es)kesLive(e.target,e.isIntersecting)},{threshold:.01}):null;
function kesWatch(el){if(!el||el.__kes)return;el.__kes=1;if(KES_IO)KES_IO.observe(el);else kesLive(el,true)}
function kesScan(){document.querySelectorAll("img.kemo").forEach(kesWatch)}
function kesSweep(){/* effect layers whose seal is gone */document.querySelectorAll("img.kemofx").forEach(f=>{const p=f.parentNode;if(!p||![...p.children].some(c=>c.__fx===f))f.remove()})}
let kesQ=0;function kesSched(){if(kesQ)return;kesQ=requestAnimationFrame(()=>{kesQ=0;kesScan();kesSweep()})}
try{new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches&&n.matches("img.kemo")||n.querySelector&&n.querySelector("img.kemo")))||[...m.removedNodes].some(n=>n.nodeType===1)))kesSched()}).observe(document.body,{childList:true,subtree:true})}catch(e){}
addEventListener("resize",()=>document.querySelectorAll("img.kemo.kemo-live").forEach(kesFxSync));
kesScan();
/* r2 reviewer fix: Cảnh động / Gọn switched in Settings applies to the seals already on screen at once (saveOpt does not re-render) */
(function(){if(typeof saveOpt!=="function")return;const o=saveOpt;saveOpt=function(){const r=o.apply(this,arguments);try{document.querySelectorAll("img.kemo").forEach(el=>{if(!el.__kes)return;const b=el.getBoundingClientRect();kesLive(el,b.width>2&&b.bottom>0&&b.top<innerHeight&&b.right>0&&b.left<innerWidth)})}catch(e){}return r}})();
window.kitEmoSeal={scan:kesScan,live:kesLive,probe:kesProbe,lean:kesLean};/* no pop: owner 17/11 ~18:10Z (Sims model), the seal has ONE source (jemo emoSealKey) */
(function(){const st=document.createElement("style");st.id="kemoseal-css";st.textContent=`
img.kemo{transform-origin:50% 60%;will-change:auto}
img.kemofx{position:absolute!important;pointer-events:none;z-index:8;object-fit:contain;max-width:none;max-height:none;margin:0;border-radius:0}
@media (prefers-reduced-motion:no-preference){
img.kemo.kemo-live{animation:kemoIdle var(--kemo-ip,7s) ease-in-out var(--kemo-i0,0s) infinite}
img.kemo.kemo-live.kemo-lean{animation:kemoIdle var(--kemo-ip,7s) ease-in-out var(--kemo-i0,0s) infinite,var(--kemo-lk,kemoL-nod) var(--kemo-ld,1.2s) ease-out 1 both}
img.kemo.kemo-live.kemo-lean.kemo-m-nod{--kemo-lk:kemoL-nod}
img.kemo.kemo-live.kemo-lean.kemo-m-sway{--kemo-lk:kemoL-sway}
img.kemo.kemo-live.kemo-lean.kemo-m-droop{--kemo-lk:kemoL-droop}
img.kemo.kemo-live.kemo-lean.kemo-m-shake{--kemo-lk:kemoL-shake}
img.kemo.kemo-live.kemo-lean.kemo-m-tremble{--kemo-lk:kemoL-tremble}
img.kemo.kemo-live.kemo-lean.kemo-m-flicker{--kemo-lk:kemoL-flicker}
img.kemo.kemo-live.kemo-lean.kemo-m-bob{--kemo-lk:kemoL-bob}
img.kemo.kemo-live.kemo-lean.kemo-m-wince{--kemo-lk:kemoL-wince}
img.kemo.kemo-live.kemo-lean.kemo-m-glint{--kemo-lk:kemoL-glint}
img.kemofx{animation:kemoFx 2.4s ease-in-out infinite}
}
/* IDLE: ONLY the rotate property, extremely slight + slow, never a shake (owner 19/11 ~02:15Z) */
@keyframes kemoIdle{0%,100%{rotate:calc(var(--kemo-id,1.2deg) * -1)}50%{rotate:var(--kemo-id,1.2deg)}}
/* LEAN-IN: scale up to --kemo-ls (ease-out, leaning forward), the feeling's own stronger motion while leaned in, settle back. transform/filter only. */
@keyframes kemoL-nod{0%{transform:scale(1)}18%{transform:scale(var(--kemo-ls))}34%{transform:scale(var(--kemo-ls)) translateY(5%)}50%{transform:scale(var(--kemo-ls))}66%{transform:scale(var(--kemo-ls)) translateY(4%)}82%{transform:scale(var(--kemo-ls))}100%{transform:scale(1)}}
@keyframes kemoL-sway{0%{transform:scale(1)}18%{transform:scale(var(--kemo-ls)) rotate(0);filter:drop-shadow(0 0 4px #ffe9a0) drop-shadow(0 1px 1.5px #000a)}38%{transform:scale(var(--kemo-ls)) rotate(-6deg)}62%{transform:scale(var(--kemo-ls)) rotate(6deg);filter:drop-shadow(0 0 7px #ffe9a0) drop-shadow(0 1px 1.5px #000a)}82%{transform:scale(var(--kemo-ls)) rotate(-3deg)}100%{transform:scale(1);filter:drop-shadow(0 1px 1.5px #000a)}}
@keyframes kemoL-droop{0%{transform:scale(1) translateY(0)}20%{transform:scale(var(--kemo-ls)) translateY(0)}45%{transform:scale(var(--kemo-ls)) translateY(9%) rotate(-3deg)}70%{transform:scale(var(--kemo-ls)) translateY(-2%) rotate(1deg)}85%{transform:scale(var(--kemo-ls)) translateY(6%) rotate(-2deg)}100%{transform:scale(1) translateY(0)}}
@keyframes kemoL-shake{0%{transform:scale(1)}12%{transform:scale(var(--kemo-ls));filter:drop-shadow(0 0 6px #ff7a4a) drop-shadow(0 1px 1.5px #000a)}18%{transform:scale(var(--kemo-ls)) translateX(-5%)}26%{transform:scale(var(--kemo-ls)) translateX(5%)}34%{transform:scale(var(--kemo-ls)) translateX(-5%)}42%{transform:scale(var(--kemo-ls)) translateX(5%)}50%{transform:scale(var(--kemo-ls)) translateX(-4%);filter:drop-shadow(0 0 9px #ff5a2a) drop-shadow(0 1px 1.5px #000a)}58%{transform:scale(var(--kemo-ls)) translateX(4%)}66%{transform:scale(var(--kemo-ls)) translateX(-2%)}76%{transform:scale(var(--kemo-ls)) translateX(0)}100%{transform:scale(1);filter:drop-shadow(0 1px 1.5px #000a)}}
@keyframes kemoL-tremble{0%{transform:scale(1)}15%{transform:scale(var(--kemo-ls)) translate(.8%,0)}25%{transform:scale(var(--kemo-ls)) translate(-.8%,.6%)}35%{transform:scale(var(--kemo-ls)) translate(.6%,-.6%)}45%{transform:scale(var(--kemo-ls)) translate(-.6%,.8%)}55%{transform:scale(var(--kemo-ls)) translate(.8%,0)}65%{transform:scale(var(--kemo-ls)) translate(-.8%,.6%)}75%{transform:scale(var(--kemo-ls)) translate(.6%,-.6%)}85%{transform:scale(var(--kemo-ls)) translate(-.4%,.4%)}100%{transform:scale(1)}}
@keyframes kemoL-bob{0%{transform:scale(1)}20%{transform:scale(var(--kemo-ls)) translateY(0)}38%{transform:scale(var(--kemo-ls)) translateY(-7%)}56%{transform:scale(var(--kemo-ls)) translateY(1%)}74%{transform:scale(var(--kemo-ls)) translateY(-6%)}88%{transform:scale(var(--kemo-ls)) translateY(0)}100%{transform:scale(1)}}
@keyframes kemoL-flicker{0%{transform:scale(1);opacity:1}18%{transform:scale(var(--kemo-ls)) translateX(0)}30%{transform:scale(var(--kemo-ls)) translateX(-5%);opacity:.8}42%{transform:scale(var(--kemo-ls)) translateX(-5%);opacity:1}58%{transform:scale(var(--kemo-ls)) translateX(0)}68%{transform:scale(var(--kemo-ls)) translateX(5%);opacity:.82}80%{transform:scale(var(--kemo-ls)) translateX(5%);opacity:1}100%{transform:scale(1);opacity:1}}
@keyframes kemoL-glint{0%{transform:scale(1);filter:drop-shadow(0 1px 1.5px #000a)}25%{transform:scale(var(--kemo-ls))}50%{transform:scale(var(--kemo-ls));filter:drop-shadow(0 0 8px #d9c4ff) drop-shadow(0 1px 1.5px #000a)}75%{transform:scale(var(--kemo-ls));filter:drop-shadow(0 0 2px #d9c4ff) drop-shadow(0 1px 1.5px #000a)}100%{transform:scale(1);filter:drop-shadow(0 1px 1.5px #000a)}}
@keyframes kemoL-wince{0%{transform:scale(1)}16%{transform:scale(var(--kemo-ls))}30%{transform:scale(calc(var(--kemo-ls) * .9)) rotate(-4deg)}42%{transform:scale(var(--kemo-ls)) rotate(2deg)}60%{transform:scale(calc(var(--kemo-ls) * .93)) rotate(-3deg)}78%{transform:scale(var(--kemo-ls))}100%{transform:scale(1)}}
@keyframes kemoFx{0%,100%{opacity:.9;transform:translateY(0)}50%{opacity:1;transform:translateY(-3%)}}
`;document.head.appendChild(st)})();
