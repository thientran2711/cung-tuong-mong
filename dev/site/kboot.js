/* KBOOT — BOOT COVER (owner 15/11 "Khi vừa bấm vào game, có chừng ít hơn 1 giây hiện khung này"; KIT §14.1).
   Before: while the 4 MB page parsed, the browser painted the bare static markup of p1.html (HUD box, a vertical stat label list, empty
   panels, the old 11-tab bar) for ~1 s on a warm open and many seconds on a cold one, before any kit CSS/JS existed.
   Now: from the FIRST paint the player sees only the title backdrop (KIT §30 KIT_BD.title art) with ONE kit scene panel (KIT §14 frame:
   rgba(255,250,240,.90) + blur, gold hairline, right column in landscape / lower part in portrait): "Cung Tường Mộng" + "Cửa cung đang mở"
   + a quiet moving bar in the kit progress track (KIT §35 .kprog look). It needs no kit JS: this file is inlined at the top of <head>
   (build_site.sh, right after rot.js) with its own small CSS that mirrors those kit values — the only screen that exists before the kit.
   - HOST page (rot.js design canvas): the cover is drawn at once in the design box (same size + transform as the game frame), so the
     long first download shows the cover, not an empty paper; it is dropped (no fade) the moment the frame has painted its own cover.
   - GAME document (in the frame, or direct mode): the cover is added before <body> exists, so nothing of the game ever paints first.
     kbootDone() (called by the last <script> of the page, dev/build/assemble.py) waits two frames (title built; on a device with no picture
     cache yet, until jload's #kload loading screen is up, at most 1.5 s), then fades the cover out (.35 s) and removes it.
   - WATCHDOG (owner iPad 15/11 "Bị gì đây mới vào game": stuck on the skeleton): if the game script did not run to its end
     (window.__ctmBuilt, set by assemble.py; data-why=broken) or the game is not ready after 30 s (15 s: a "still building" note; data-why=slow,
     lifted as soon as the game gets ready), the panel turns into a failure card: "Cửa cung chưa mở
     được", buttons "Tải lại" and "Xóa bộ nhớ đệm rồi tải lại" (drops the shell caches + service worker, keeps pictures and saves), and the
     last error text, small. Errors before the game is ready are kept in localStorage "ctm-boot-err" (last 8) for the coordinator.
   - automated direct mode (navigator.webdriver, no host, no ?kboot=1): removed at once, no fade, so old tests see the game as before.
   Backdrop values = KIT_BD.title in dev/build/jbd.js (change both together). Test: dev/test/boot-flash.js. Hook: window.__kbootDone. */
(function(){var W=window.CTM_WAIT||{},d=document,IMG="__IMG__",T=IMG+"img/title-key",inFrame;try{inFrame=window.top!==window}catch(e){inFrame=true}
 var css="#kboot{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;overflow:hidden;transition:opacity .35s ease;font-family:'Be Vietnam Pro',system-ui,sans-serif;color:#2a1a12;"+
  "background:linear-gradient(rgba(245,236,220,0) 56%,rgba(245,236,220,.72)),url("+T+".webp) center top/cover no-repeat,#f3e6d6}"+
  "#kboot[data-o=l]{background:linear-gradient(90deg,rgba(245,236,220,0) 58%,rgba(245,236,220,.18)),url("+T+"-l.webp) left 25%/cover no-repeat,#f3e6d6}"+
  "#kboot[data-o=m]{background:linear-gradient(90deg,rgba(245,236,220,0) 58%,rgba(245,236,220,.18)),url("+T+"-m.webp) left center/cover no-repeat,#f3e6d6}"+
  "#kboot.out{opacity:0;pointer-events:none}"+
  "#kboot .kbtp{position:absolute;left:50%;bottom:6%;transform:translateX(-50%);width:min(440px,86%);box-sizing:border-box;padding:14px 18px 16px;"+
  "background:rgba(255,250,240,.90);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);border:1px solid #c9a46a;border-radius:14px;box-shadow:0 10px 32px rgba(60,25,10,.28)}"+
  "#kboot:not([data-o=p]) .kbtp{left:auto;right:4%;bottom:auto;top:50%;transform:translateY(-50%);width:min(440px,44%)}"+
  "#kboot .kbtp b{display:block;font:700 22px/1.25 'Noto Serif',Georgia,serif;color:#8f5f0c}"+
  "#kboot .kbtp small{display:block;margin-top:2px;font-size:13px;color:#6b5643}"+
  "#kboot .kbtp i{display:block;position:relative;margin-top:10px;height:8px;border-radius:6px;border:1px solid #d2b071;background:#f6ead6;overflow:hidden;box-shadow:inset 0 1px 2px #3a210f22}"+
  "#kboot .kbtp i:after{content:'';position:absolute;top:0;bottom:0;left:0;width:35%;border-radius:6px;background:linear-gradient(90deg,#b0402c,#c98a2a);transform:translateX(-100%);will-change:transform;animation:kbootRun 1.6s ease-in-out infinite}"+
  /* transform only: runs on the compositor, never makes the busy parser re-layout */
  /* failure card (watchdog): the kit button look (.kbtn / .kbtn.alt, j79) mirrored, since the kit may never have loaded */
  "#kboot .kbtx{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}#kboot .kbtx button{flex:1 1 150px;min-height:42px;padding:8px 14px;border-radius:8px;cursor:pointer;"+
  "font:700 15px/1.2 'Noto Serif',Georgia,serif;letter-spacing:.02em;color:#fff8e6;background:linear-gradient(#b0402c,#8a2a1e);border:1px solid #6e1d12;box-shadow:inset 0 0 0 1px #f0d07066,0 1px 0 #d9c49a}"+
  "#kboot .kbtx button.alt{background:#fffaf0;color:#2a1a12;border-color:#d2b071;box-shadow:none}"+
  "#kboot .kbtd{display:inline-block;margin-top:10px;font-size:12px;color:#8a6b3f;text-decoration:underline;cursor:pointer}#kboot .kbte{margin-top:6px;font:11px/1.35 ui-monospace,monospace;color:#6b5643;max-height:4.2em;overflow:hidden;word-break:break-word}#kboot.fail .kbtp i{display:none}"+
  "@keyframes kbootRun{to{transform:translateX(286%)}}@media (prefers-reduced-motion:reduce){#kboot .kbtp i:after{animation:none;transform:none;width:30%}#kboot{transition:none}}";
 function shape(w,h){return w<h?"p":w/h<=1.4?"m":"l"}
 function make(w,h){if(!d.getElementById("kboot-css")){var s=d.createElement("style");s.id="kboot-css";s.textContent=css;(d.head||d.documentElement).appendChild(s)}
  var c=d.createElement("div");c.id="kboot";c.setAttribute("aria-busy","true");c.setAttribute("data-o",shape(w,h));
  c.innerHTML='<div class="kbtp" role="status"><b>Cung Tường Mộng</b><small>'+W.bootOpen+'</small><i></i></div>';return c}
 /* HOST (rot.js calls this with the design box it fits like the frame) */
 window.__kbootHost=function(box,w,h){var c=make(w,h);box.appendChild(c);window.__kbootHostDrop=function(){if(c.parentNode)c.parentNode.removeChild(c);window.__kbootHostDrop=null}};
 var q=location.search||"";
 if(!inFrame&&!(/[?&]khost=0/.test(q)||(navigator.webdriver&&!/[?&]khost=1/.test(q))))return;  /* host page: rot.js mounts it */
 if(!inFrame&&navigator.webdriver&&!/[?&]kboot=1/.test(q)){window.__kbootDone=1;window.kbootDone=function(){};return}
 var c=make(innerWidth,innerHeight);d.documentElement.appendChild(c);
 /* errors while booting: kept (localStorage ctm-boot-err, last 8, for the coordinator) and shown small on the failure card */
 var ERR=[];function keep(t){t=String(t||"").slice(0,300);if(!t)return;ERR.push(t);try{var L=JSON.parse(localStorage.getItem("ctm-boot-err")||"[]");
   L.push({t:t,at:new Date().toISOString(),ua:navigator.userAgent.slice(0,160),done:!!window.__kbootDone});localStorage.setItem("ctm-boot-err",JSON.stringify(L.slice(-8)))}catch(e){}}
 window.addEventListener("error",function(e){if(!window.__kbootDone)keep((e.message||"error")+(e.filename?" @"+String(e.filename).split("/").pop().split("?")[0]+":"+e.lineno+":"+e.colno:""))});
 window.addEventListener("unhandledrejection",function(e){if(!window.__kbootDone){var r=e.reason;keep("promise: "+(r&&(r.message||r.name)||r))}});
 /* WATCHDOG: never leave the player on the cover (or the bare skeleton): the game script did not finish, or 15 s passed → a failure card */
 var MSG_BROKEN=W.bootFailBroken;
 function fail(why){if(window.__kbootDone)return;if(c.classList.contains("fail")){if(why==="broken"&&c.getAttribute("data-why")!=="broken"){c.setAttribute("data-why","broken");var sm=c.querySelector(".kbtp small");if(sm)sm.textContent=MSG_BROKEN}return}c.classList.add("fail");c.setAttribute("data-why",why);c.setAttribute("aria-busy","false");
  var p=c.querySelector(".kbtp");p.innerHTML='<b>'+W.bootFail+'</b><small>'+(why==="slow"?W.bootFailSlow:MSG_BROKEN)+'</small>'+
   '<div class="kbtx"><button type="button" data-kb="re">'+W.bootRe+'</button><button type="button" class="alt" data-kb="clr">'+W.bootClr+'</button></div>'+
   (ERR.length?'<a class="kbtd" role="button" tabindex="0" data-kb="dt">'+W.bootDetail+'</a><div class="kbte" hidden></div>':"");var e=p.querySelector(".kbte");if(e)e.textContent=ERR.slice(-2).join(" · ");
  p.addEventListener("click",function(ev){var b=ev.target.closest&&ev.target.closest("[data-kb]");if(!b)return;
   if(b.getAttribute("data-kb")==="dt"){/* the raw error line (English, for a bug report) shows only behind this small tap */if(e)e.hidden=!e.hidden;return}
   b.disabled=true;
   if(b.getAttribute("data-kb")==="re"){try{return window.top.location.reload()}catch(x){return location.reload()}}
   /* the stale-shell risk: drop the app-shell caches and the service worker; pictures (ctm-assets, content-keyed) and saves stay */
   var jobs=[];try{if(window.caches)jobs.push(caches.keys().then(function(K){return Promise.all(K.filter(function(k){return k!=="ctm-assets"&&!/^ctm-\d+$/.test(k)}).map(function(k){return caches.delete(k)}))}))}catch(x){}
   try{if(navigator.serviceWorker)jobs.push(navigator.serviceWorker.getRegistrations().then(function(R){return Promise.all(R.map(function(r){return r.unregister()}))}))}catch(x){}
   Promise.all(jobs).then(null,function(){}).then(function(){
    /* the whole page (host too, it may be the stale copy), query kept (?room= joins), new kfresh before the #hash (a hash-only change does not reload) */
    var L=location;try{if(window.top.location.href)L=window.top.location}catch(x){}var s=L.search.replace(/([?&])kfresh=\d+&?/,"$1").replace(/[?&]$/,"");
    L.replace(L.origin+L.pathname+s+(s?"&":"?")+"kfresh="+Date.now()+L.hash)})})}
 /* review r1: a SLOW but working first open (the 4 MB page still downloading/parsing) is not a failure. 15 s: the cover keeps its moving bar
    and says "Đường xa, cung đang dựng dần…"; 30 s: the card with the two buttons (data-why=slow). Either way the moment the game is ready
    the cover/card lets go (kbootDone below) — only a game script that did not finish (data-why=broken) keeps the card. */
 var dog=setTimeout(function(){if(window.__kbootDone||c.classList.contains("fail"))return;var s=c.querySelector(".kbtp small");if(s)s.textContent=W.bootSlow;
  dog=setTimeout(function(){fail("slow")},15000)},15000);
 /* the host may drop its copy once this one has painted */
 /* ...after its backdrop picture is decoded here too (else the swap shows a bare paper for a moment); at most 3 s */
 if(inFrame){var o=c.getAttribute("data-o"),pic=new Image(),hd=false,hdrop=function(){if(hd)return;hd=true;requestAnimationFrame(function(){requestAnimationFrame(function(){try{parent.__kbootHostDrop&&parent.__kbootHostDrop()}catch(e){}})})};
  pic.onload=pic.onerror=hdrop;pic.src=T+(o==="p"?"":"-"+o)+".webp";if(pic.complete)hdrop();setTimeout(hdrop,3000)}
 var done=false;
 window.kbootDone=function(){if(done)return;done=true;
  /* the game script stopped before its end (a parse error on an older browser, or a throw): fail now, never show the half-built page */
  if(!window.__ctmBuilt){keep("bản game dừng giữa chừng (game script did not finish)");return fail("broken")}var t0=Date.now(),first=false,asked=false;
  /* a device with no picture cache yet gets the loading screen (jload #kload) right after its own caches.has(): wait for it (max 1.5 s)
     so the title never flashes in between; a returning player goes straight on */
  var seen=false;try{seen=localStorage.getItem("ctm-booted")==="1"}catch(e){}  /* opened here before: no need to ask the cache */
  try{var K0=window.KLOAD;if(!seen&&K0&&K0.phase==="check"&&window.caches){asked=true;caches.has("ctm-assets").then(function(h){first=!h;asked=false},function(){asked=false})}}catch(e){asked=false}
  (function wait(){var K=window.KLOAD;
   if((asked||first&&K&&K.phase==="check")&&!d.getElementById("kload")&&Date.now()-t0<1500)return requestAnimationFrame(wait);
   requestAnimationFrame(function(){requestAnimationFrame(function(){if(c.getAttribute("data-why")==="broken")return;window.__kbootDone=1;try{localStorage.setItem("ctm-booted","1")}catch(e){}clearTimeout(dog);c.classList.add("out");
    try{parent.__kbootHostDrop&&parent.__kbootHostDrop()}catch(e){}setTimeout(function(){if(c.parentNode)c.parentNode.removeChild(c)},450)})})})()}})();
