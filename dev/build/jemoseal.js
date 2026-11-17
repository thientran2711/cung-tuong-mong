/* ================= jemoseal: kitEmoSeal — EVERY mood seal moves, everywhere it shows (KIT 38.4; owner 17/11 ~18:00Z + ~18:30Z (D)) =================
   ONE kit part for every img.kemo (pcPort frames, person cards, lists, mood box, the figure-head seal of jfigseal): no seal draws its own motion.
   (1) MOTION: a per-key CSS motion class kemo-m-<m> (KIT_EMOSEAL.keys[k].m), switched on only while the seal is ON SCREEN (IntersectionObserver, class kemo-live), only with
       Cảnh động on, no prefers-reduced-motion and not Gọn (OPT.fxon === false): vui glow + gentle sway · bình slow breathe · buồn droop + sink · giận shake + heat pulse · sợ tremble ·
       ghen flicker · lo bob + sweat-drop dip · đau wince pulse · mưu glint · an "?" bob · khóc droop + tear-sink · hờn flicker. Transform / filter only (cheap on Fold with many seals).
   (2) FRAME LOOP source (optional, painted by Foreman C): img/kit/emo-anim/<set><k>.webp (animated webp / apng). Probed once per file; when it exists the seal swaps its still for the loop
       while on screen and back to the still when it leaves (the loop never decodes off screen); no file = the still + the CSS motion. Same asset-set rule as the still: <set> = "" women, "m-" young men, "mo-" mature men.
   (3) EFFECT-SPRITE layer (optional, painted): img/kit/emo-fx/<k>.webp (smoke puffs, tears, sweat, glint …): ONE sibling img.kemofx per live seal, centred on the seal at KIT_EMOSEAL.fxScale x its size,
       pointer-events none, removed when the seal leaves the screen. No file = no layer. Nothing is drawn in code (no code-drawn tears / smoke).
   KEYS: the seal map holds khoc + hon too (names "Khóc", "Hờn"); the mood logic (jemo EMO) decides when a person is in one — until then they never appear. ===== */
window.KIT_EMOSEAL=window.KIT_EMOSEAL||{keys:{vui:{m:"sway"},binh:{m:"breathe"},buon:{m:"droop"},gian:{m:"shake"},so:{m:"tremble"},ghen:{m:"flicker"},lo:{m:"bob"},dau:{m:"wince"},muu:{m:"glint"},an:{m:"bob"},khoc:{m:"droop",name:"Khóc"},hon:{m:"flicker",name:"Hờn"}},
 fb:{khoc:"buon",hon:"gian"},have:{},anim:"img/kit/emo-anim/",fx:"img/kit/emo-fx/",fxScale:1.7};
const KES_HAVE={};/* url -> true | false | "wait" (probe result) */
function kesProbe(url,cb){const h=KES_HAVE[url];if(h===true||h===false){cb(h);return}
 if(h&&h.w){h.w.push(cb);return}const e={w:[cb]};KES_HAVE[url]=e;const im=new Image();const done=ok=>{KES_HAVE[url]=ok;e.w.forEach(f=>{try{f(ok)}catch(x){}})};im.onload=()=>done(true);im.onerror=()=>done(false);im.src=url}
function kesMotionOK(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kesKey(el){const m=/kemo-([a-z]+)/.exec(el.className.replace(/kemo-(live|m-\w+)/g,""));return m?m[1]:""}
/* the still name of the seal minus the key: img/kit/emo-<set><k>.webp -> "<set>" */
function kesSet(el,k){const m=/emo-((?:m-|mo-)?)[a-z]+\.webp/.exec(el.getAttribute("data-kemos")||el.getAttribute("src")||"");return m?m[1]:""}
function kesFxOff(el){const f=el.__fx;if(f){f.remove();el.__fx=null}}
function kesFxSync(el){const f=el.__fx;if(!f||!el.isConnected)return;const w=el.offsetWidth,h=el.offsetHeight,W=w*KIT_EMOSEAL.fxScale,H=h*KIT_EMOSEAL.fxScale;
 f.style.cssText=`left:${(el.offsetLeft+w/2-W/2).toFixed(1)}px;top:${(el.offsetTop+h/2-H/2).toFixed(1)}px;width:${W.toFixed(1)}px;height:${H.toFixed(1)}px`}
function kesReal(el){/* khoc / hon: the real still replaces the fallback picture once it exists */const k=kesKey(el),fb=KIT_EMOSEAL.fb[k];if(!fb||el.__real)return;el.__real=1;const set=kesSet(el,k),real=`img/kit/emo-${set}${k}.webp`;
 kesProbe(real,ok=>{if(!ok)return;KIT_EMOSEAL.have[real]=true;if(el.isConnected){el.dataset.kemos=real;if(!/emo-anim/.test(el.getAttribute("src")||""))el.setAttribute("src",real)}})}
function kesLive(el,on){if(!el.isConnected)return;kesReal(el);
 if(!el.dataset.kemos){el.dataset.kemos=el.getAttribute("src")||""}
 el.classList.toggle("kemo-live",on&&kesMotionOK());const k=kesKey(el),spec=KIT_EMOSEAL.keys[k];if(spec)el.classList.add("kemo-m-"+spec.m);
 const still=el.dataset.kemos;
 if(on&&kesMotionOK()){const set=kesSet(el,k);
  kesProbe(KIT_EMOSEAL.anim+set+k+".webp",ok=>{if(ok&&el.isConnected&&el.classList.contains("kemo-live")&&el.getAttribute("src")===still)el.setAttribute("src",KIT_EMOSEAL.anim+set+k+".webp")});
  kesProbe(KIT_EMOSEAL.fx+k+".webp",ok=>{if(!ok||!el.isConnected||!el.classList.contains("kemo-live")||el.__fx||!el.parentNode)return;
   const f=document.createElement("img");f.className="kemofx kemofx-"+k;f.alt="";f.setAttribute("aria-hidden","true");f.src=KIT_EMOSEAL.fx+k+".webp";f.onerror=()=>f.remove();el.parentNode.appendChild(f);el.__fx=f;kesFxSync(el)});
  kesFxSync(el)}
 else{if(el.getAttribute("src")!==still&&still)el.setAttribute("src",still);kesFxOff(el)}}
const KES_IO=typeof IntersectionObserver==="function"?new IntersectionObserver(es=>{for(const e of es)kesLive(e.target,e.isIntersecting)},{threshold:.01}):null;
function kesWatch(el){if(!el||el.__kes)return;el.__kes=1;if(KES_IO)KES_IO.observe(el);else kesLive(el,true)}
function kesScan(){document.querySelectorAll("img.kemo").forEach(kesWatch)}
function kesSweep(){/* effect layers whose seal is gone */document.querySelectorAll("img.kemofx").forEach(f=>{const p=f.parentNode;if(!p||![...p.children].some(c=>c.__fx===f))f.remove()})}
let kesQ=0;function kesSched(){if(kesQ)return;kesQ=requestAnimationFrame(()=>{kesQ=0;kesScan();kesSweep()})}
try{new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches&&n.matches("img.kemo")||n.querySelector&&n.querySelector("img.kemo")))||[...m.removedNodes].some(n=>n.nodeType===1)))kesSched()}).observe(document.body,{childList:true,subtree:true})}catch(e){}
addEventListener("resize",()=>document.querySelectorAll("img.kemo.kemo-live").forEach(kesFxSync));
kesScan();
window.kitEmoSeal={scan:kesScan,live:kesLive,probe:kesProbe};/* no pop: owner 17/11 ~18:10Z (Sims model), the seal has ONE source (jemo emoSealKey) */
(function(){const st=document.createElement("style");st.id="kemoseal-css";st.textContent=`
img.kemo{transform-origin:50% 60%;will-change:auto}
img.kemofx{position:absolute!important;pointer-events:none;z-index:8;object-fit:contain;max-width:none;max-height:none;margin:0;border-radius:0}
@media (prefers-reduced-motion:no-preference){
img.kemo.kemo-live.kemo-m-sway{animation:kemoSway 3.2s ease-in-out infinite}
img.kemo.kemo-live.kemo-m-breathe{animation:kemoBreathe 4.6s ease-in-out infinite}
img.kemo.kemo-live.kemo-m-droop{animation:kemoDroop 3.6s ease-in-out infinite}
img.kemo.kemo-live.kemo-m-shake{animation:kemoShake 1.9s ease-in-out infinite}
img.kemo.kemo-live.kemo-m-tremble{animation:kemoTremble .5s linear infinite}
img.kemo.kemo-live.kemo-m-flicker{animation:kemoFlicker 2.2s steps(1,end) infinite}
img.kemo.kemo-live.kemo-m-bob{animation:kemoBob 2.8s ease-in-out infinite}
img.kemo.kemo-live.kemo-m-wince{animation:kemoWince 2.6s ease-in-out infinite}
img.kemo.kemo-live.kemo-m-glint{animation:kemoGlint 3.4s ease-in-out infinite}
img.kemofx{animation:kemoFx 2.4s ease-in-out infinite}
}
@keyframes kemoSway{0%,100%{transform:rotate(-3deg);filter:drop-shadow(0 1px 1.5px #000a)}50%{transform:rotate(3deg);filter:drop-shadow(0 0 4px #ffe9a0) drop-shadow(0 1px 1.5px #000a)}}
@keyframes kemoBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
@keyframes kemoDroop{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(7%) rotate(-3deg)}}
@keyframes kemoShake{0%,100%{transform:translateX(0);filter:drop-shadow(0 1px 1.5px #000a)}15%{transform:translateX(-4%)}30%{transform:translateX(4%)}45%{transform:translateX(-3%);filter:drop-shadow(0 0 5px #ff9a6a) drop-shadow(0 1px 1.5px #000a)}60%{transform:translateX(2%)}75%{transform:translateX(0)}}
@keyframes kemoTremble{0%{transform:translate(.8%,0)}25%{transform:translate(-.8%,.6%)}50%{transform:translate(.6%,-.6%)}75%{transform:translate(-.6%,.8%)}100%{transform:translate(.8%,0)}}
@keyframes kemoFlicker{0%{opacity:1}30%{opacity:.78}38%{opacity:1}70%{opacity:.86}78%{opacity:1}}
@keyframes kemoBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6%)}}
@keyframes kemoWince{0%,100%{transform:scale(1)}8%{transform:scale(.93)}16%{transform:scale(1.02)}30%{transform:scale(1)}}
@keyframes kemoGlint{0%,100%{filter:drop-shadow(0 1px 1.5px #000a)}50%{filter:drop-shadow(0 0 5px #d9c4ff) drop-shadow(0 1px 1.5px #000a)}}
@keyframes kemoFx{0%,100%{opacity:.9;transform:translateY(0)}50%{opacity:1;transform:translateY(-3%)}}
`;document.head.appendChild(st)})();
