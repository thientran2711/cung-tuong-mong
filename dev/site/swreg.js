/* Service worker hook-up for Cung Tường Mộng (inlined at the end of index.html by dev/site/build_site.sh; KIT.md §35.2).
   Owner 11/15: the installed app / phone must never stay on an old build.
   - registers sw.js (updateViaCache none) at once and asks the server for a new sw.js: on open, every time the app comes back to the
     foreground (visibilitychange / pageshow / focus / online) and every 20 minutes while open (at most once per 10 s).
   - sw.js changes exactly when the build changes (its name holds the content hash); a new one installs, skips waiting, claims this page
     → 'controllerchange' here → the kit card "Có bản mới" (3 s, then the page opens the new build by itself).
   - never in the middle of a dialog, a queued notice, a mini game or a lesson: the card waits until the screen is free; the game saves
     on every render and once more right before reopening, so every written sổ (hclh-slot / hclh-save-v2-<n>) stays.
   - while the app is in the background with a new build pending and nothing open, it reopens there (the player sees the new build on return).
   Test hook: window.KSW {had, pending, shown, checks, card()}. */
(function(){
if(!("serviceWorker" in navigator)||!/^https?:$/.test(location.protocol))return;
const SW=navigator.serviceWorker,K=window.KSW={had:!!SW.controller,pending:false,shown:false,checks:0};
let reg=null,last=0,timer=0;
function check(force){if(!reg)return;const n=Date.now();if(!force&&n-last<10000)return;last=n;K.checks++;
 reg.update().catch(()=>{});if(reg.waiting)reg.waiting.postMessage({ctm:"skip"})}
SW.register("sw.js",{updateViaCache:"none"}).then(r=>{reg=r;check(true);
 r.addEventListener("updatefound",()=>{const w=r.installing;if(w)w.addEventListener("statechange",()=>{if(w.state==="installed"&&r.waiting)r.waiting.postMessage({ctm:"skip"})})})}).catch(()=>{});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){check(true);if(K.pending)soon()}else if(K.pending&&!busy())go()});
addEventListener("pageshow",e=>{if(e.persisted)check(true)});
addEventListener("focus",()=>check());addEventListener("online",()=>check(true));
setInterval(()=>{if(document.visibilityState==="visible")check()},20*60e3);
SW.addEventListener("controllerchange",()=>{if(!K.had){K.had=true;return}K.pending=true;soon()});

/* the screen is "busy" when leaving now would drop what she is doing */
function vis(e){return !!e&&!e.hidden&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=="hidden"}
function busy(){try{
 if(typeof Q!=="undefined"&&Q&&Q.length)return true;
 if(typeof S!=="undefined"&&S&&S.mg&&!S.dead)return true;
 if(vis(document.getElementById("ov")))return true;
 for(const m of document.querySelectorAll(".modal"))if(m.id!=="kload"&&vis(m))return true;
 for(const m of document.querySelectorAll(".kmov,#kpodov,.kbk,.kcl-host"))if(vis(m))return true;  /* motion moment, honour podium, week book, page turning */
 }catch(e){}return false}
function soon(){clearTimeout(timer);if(!K.pending)return;if(document.visibilityState!=="visible"||busy()){timer=setTimeout(soon,1200);return}card()}
K.card=()=>card();
/* above the bottom tab bar and the background-download chip, whichever is higher */
function place(el){let top=innerHeight;document.querySelectorAll("#tabs,.kloadchip").forEach(e=>{const r=e.getBoundingClientRect();if(r.height&&r.top>innerHeight*.5)top=Math.min(top,r.top)});
 el.style.bottom=Math.max(12,Math.round(innerHeight-top+10))+"px"}
function go(){try{if(typeof save==="function")save()}catch(e){}location.reload()}

/* kit card: kpanel + kpHeader("notice") + kpnote + one .kbtn; plain reload if the kit is missing */
function card(){if(K.shown)return;K.shown=true;
 if(document.getElementById("kload")){go();return}  /* first-entry loading screen: it resumes file by file on the new build */
 if(typeof kpHeader!=="function"){setTimeout(go,3000);return}
 if(!document.getElementById("kit-upd")){const st=document.createElement("style");st.id="kit-upd";st.textContent=`
.kupd{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 74px);transform:translateX(-50%);z-index:9700;width:min(420px,calc(100vw - 24px));animation:kupdIn .3s ease}
.kupd .dlg.kpanel{width:100%;max-width:none;margin:0;box-shadow:0 6px 24px #0006}
.kupd .dlg.kpanel .kpb{padding:8px 14px 2px;min-height:0;flex:none}.kupd .dlg.kpanel .kpnote{margin:0}
.kupd .dlg.kpanel .kpopts{display:flex;justify-content:flex-end;gap:8px;padding:8px 14px 12px;margin:0;min-height:0;position:static}
@media (max-width:599px){.kupd .dlg.kpanel .kpb{padding:6px 10px 2px}.kupd .dlg.kpanel .kpopts{padding:6px 10px 10px}}
@keyframes kupdIn{from{opacity:0;transform:translate(-50%,12px)}}`;document.head.appendChild(st)}
 const el=document.createElement("div");el.className="kupd";el.id="kupd";let n=3;
 const note=()=>`Sổ đã ghi vẫn giữ nguyên. Tự mở bản mới sau ${n} giây.`;
 el.innerHTML=`<div class="dlg kpanel" data-kind="notice">${kpHeader("notice","Có bản mới","Cung Tường Mộng vừa có bản mới")}<div class="kpb"><div class="kpnote">${note()}</div></div><div class="kpopts"><button class="kbtn" data-kupd="1">Mở bản mới</button></div></div>`;
 document.body.appendChild(el);place(el);
 el.querySelector("[data-kupd]").addEventListener("click",go);
 /* she opened something during the 3 s: take the card away and wait again (the tap on the button always opens at once) */
 const t=setInterval(()=>{place(el);if(busy()){clearInterval(t);el.remove();K.shown=false;soon();return}
  n--;if(n<=0){clearInterval(t);go();return}const p=el.querySelector(".kpnote");if(p)p.textContent=note()},1000)}
})();
