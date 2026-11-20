/* ONE LAYOUT PER ORIENTATION, SCALED (owner 11/15) — the design canvas. Inlined at the TOP of <head> by build_site.sh, runs before the game.
   The page is a thin HOST: the game runs inside ONE frame (#krotf) whose size is the DESIGN size, scaled uniformly to the screen like a
   resized window, centred, with paper-coloured bars:
     landscape (and narrow portrait phones, pre-rotated)  1180 x 820  (the iPad layout)
     portrait (Fold-size, width/height >= 0.62)          590 x 852   (ONE PAGE = the iPad half + 32 px for its taller tab bar, KIT_FRAME)
     s = min(available width / design width, available height / design height); when the screen is relatively WIDER than the design (Fold portrait 755x1000, wide landscape) the
     scale stays the height fit and the canvas WIDTH grows to the screen width (capped KIT_FRAME.maxGrow x design) — no side bands (owner 17/11 03:54Z, KIT §0.0b)
   Narrow portrait phones (width/height < 0.62: 390x844, 412x915, 412x1058 …): the frame is also rotated 90° so the landscape layout appears
   sideways and the player turns the phone; turned to real landscape the rotation drops (no reload).
   Inside the frame the game sees ONLY the design size: innerWidth/innerHeight, every media query and every JS breakpoint read 1180x820 or
   590x852 (one page), so the layout never reflows on the device (kitView() = {w,h,s,rot}). The browser maps touches and drags through the frame's
   transform, so pointer coordinates (page curl, sliders, map pan) arrive already divided by s and rotated; fixed popovers stay inside the frame.
   screen.orientation.lock('landscape') is tried only for a narrow portrait screen in an installed PWA / fullscreen (never Fold, never iPad).
   ROTATE PROMPT (owner 15/11 05:50Z "390x844 shows the rotate prompt"; review/small-bugs-3): "Xoay ngang điện thoại để chơi" shows EVERY time
   the screen is a narrow portrait (each open, each turn back to portrait) and stays until she turns the phone or taps it (was: once ever,
   4 s, localStorage — a returning player saw only the sideways title). Direct mode (tests, ?khost=0) shows the same prompt (no taps caught).
   The rest of index.html is swallowed by <plaintext> in the host (never executed), then dropped.
   Direct mode (no host, real viewport): ?khost=0, or automated browsers (navigator.webdriver) unless ?khost=1 — old tests keep working.
   Test hook: window.__krot {host, rotated, s, dw, dh}. */
/* KIT_FRAME (KIT §0, owner 16/11 07:47Z + 07:50Z): ONE PAGE = half of the iPad spread. Landscape = SPREAD (2 pages side by side:
   LEFT = room / stage, RIGHT = open tab); portrait = ONE PAGE at a time (room home, a tab opens the right page full screen). The only
   design sizes: spread 1180x820, page 590x852. html.kv2 (spread) / html.kv1 (one page) = THE layout switch for chrome; never width queries. */
/* PAGE BOX (owner 16/11 17:00Z s20, OD:L345 + OD:L1278): the page content box is 582x623 in BOTH modes, so the one page IS the spread's right page
   scaled — same columns, rows and positions (bag rows, fills by free height, everything). The one page's canvas is the spread's height + 32 px
   because its chrome is 32 px taller (bottom bar = two rows of 4 tabs, 76 px, vs the spread's one row, 44 px; owner 16/11 13:25Z (C)).
   box = the page content box both modes must measure (dev/test/page-scale.js fails if they differ). Change chrome height → change page.h. */
window.KIT_FRAME={spread:{w:1180,h:820},page:{w:590,h:852},box:{w:582,h:623},margin:8,pageMargin:4,gutter:0,maxGrow:1.7};
function kvPages(){return innerWidth<innerHeight?1:2}
function kvMark(){var r=document.documentElement,p=kvPages();r.classList.toggle("kv1",p===1);r.classList.toggle("kv2",p===2);
 r.style.setProperty("--kpage-w",(p===1?innerWidth:Math.round(innerWidth/2))+"px");r.style.setProperty("--kpage-h",KIT_FRAME.page.h+"px");/* --kvh = 1 % of the SPREAD height in both modes: page content and pop-ups size by it, never by vh/dvh (the one page is 32 px taller, §0.0a) */r.style.setProperty("--kvh",KIT_FRAME.spread.h/100+"px");
 if(!kvMark.on){kvMark.on=1;addEventListener("resize",kvMark)}}
(function(){var inFrame;try{inFrame=window.top!==window}catch(e){inFrame=true}
 if(inFrame){document.documentElement.classList.add("kview-in");
  window.kitView=function(){var h=null;try{h=parent.__krot}catch(e){}return{w:innerWidth,h:innerHeight,s:h&&h.s||1,rot:!!(h&&h.rotated),design:true,pages:kvPages()}};kvMark();return}
 var q=location.search||"";
 if(/[?&]khost=0/.test(q)||(navigator.webdriver&&!/[?&]khost=1/.test(q))){window.__krot={host:false,rotated:false,s:1};
  window.kitView=function(){return{w:innerWidth,h:innerHeight,s:1,rot:false,design:false,pages:kvPages()}};kvMark();
  /* direct mode: the same rotate prompt on a narrow portrait screen (never catches taps, so automated runs keep working) */
  var dsync=function(){var w=innerWidth,h=innerHeight,on=w>0&&w<h&&w/h<0.62,t=document.getElementById("krottip");if(!document.body)return;
   if(on&&!t){t=document.createElement("div");t.id="krottip";t.setAttribute("style","position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483600;pointer-events:none;background:#2a1a12ee;color:#fff3dc;font:600 16px/1.35 system-ui,sans-serif;padding:14px 18px;border-radius:12px;box-shadow:0 4px 18px #0007;text-align:center;width:max-content;max-width:80vw");
    t.innerHTML='<i style="display:block;font-style:normal;font-size:30px;margin-bottom:4px">⟳</i>Xoay ngang điện thoại để chơi';document.body.appendChild(t)}else if(!on&&t)t.remove()};
  document.addEventListener("DOMContentLoaded",dsync);addEventListener("resize",dsync);return}
 /* HOST: everything after this script (the 2 MB game) is turned into inert hidden text with the classic <plaintext> switch, so the
    game never boots here and the host document still finishes parsing normally (window.stop() leaves a page Chromium never paints) */
 document.write('<plaintext id="krotx" hidden style="display:none">');document.title="Cung Tường Mộng";
 var K=window.__krot={host:true,rotated:false,s:1,dw:1180,dh:820};
 window.kitView=function(){return{w:K.dw,h:K.dh,s:K.s,rot:K.rotated,design:true,pages:K.dw<K.dh?1:2}};
 var d=document,st=d.createElement("style");
 st.textContent="html,body{margin:0;height:100%;overflow:hidden;overscroll-behavior:none;background:#f6efe2 radial-gradient(ellipse at 50% 40%,#fbf5ea 0,#efe3cc 100%)}"+
  "#krotf{position:fixed;top:0;left:0;border:0;display:block;transform-origin:0 0;background:#f6efe2;box-shadow:0 0 24px #8a6a4033}"+
  "#krottip{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;pointer-events:none;background:#2a1a12ee;color:#fff3dc;"+
  "font:600 16px/1.35 system-ui,sans-serif;padding:14px 18px;border-radius:12px;box-shadow:0 4px 18px #0007;text-align:center;transition:opacity .5s;width:max-content;max-width:80vw}"+
  "#krottip.ktap{pointer-events:auto;cursor:pointer}#krottip i{display:block;font-style:normal;font-size:30px;margin-bottom:4px}";
 (d.head||d.documentElement).appendChild(st);
 function narrow(w,h){return w>0&&w<h&&w/h<0.62}
 function lock(){try{var o=screen.orientation,pwa=matchMedia("(display-mode: standalone)").matches||matchMedia("(display-mode: fullscreen)").matches||!!d.fullscreenElement;
  if(o&&o.lock&&pwa&&narrow(innerWidth,innerHeight))o.lock("landscape").catch(function(){})}catch(e){}}
 /* boot cover (kboot.js, KIT §14.1) in the design box, from the first paint until the frame has painted its own copy */
 var cw=d.createElement("div");cw.id="kbootw";cw.style.cssText="position:fixed;top:0;left:0;transform-origin:0 0;overflow:hidden;z-index:4";
 /* SAFE AREA (stage-figsize, owner iPad photo 16/11 3:56 PM: the iOS status bar covered the top of the header — buổi dots, 'Chưa điểm trang', the top of
    her name — and a paper strip sat under the tab bar): the frame is fitted into the screen MINUS env(safe-area-inset-*) (status bar, home indicator,
    notch), never under them; when the screen is taller than the design (4:3 iPads: 1366x1024, 1024x768) the frame stands on the BOTTOM of the safe
    area so the tab bar is flush with the SCREEN bottom (the bottom inset = the home-indicator line is not kept free in landscape; a 44 px tab is still tapped above it) and the spare paper strip goes to the top, beside the status bar. Narrow rotated phones keep the old centring. */
 var sap=null;function insets(){if(window.__kinsetsTest)return window.__kinsetsTest;/* test hook (dev/test/host-safe-area.js) */try{if(!sap){sap=d.createElement("div");sap.style.cssText="position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";(d.body||d.documentElement).appendChild(sap)}
  var c=getComputedStyle(sap);return{t:parseFloat(c.paddingTop)||0,r:parseFloat(c.paddingRight)||0,b:parseFloat(c.paddingBottom)||0,l:parseFloat(c.paddingLeft)||0}}catch(e){return{t:0,r:0,b:0,l:0}}}
 function geo(){var w=window.innerWidth,h=window.innerHeight;if(!w||!h)return null;
  var nr=narrow(w,h),land=nr||w>=h,DW=land?KIT_FRAME.spread.w:KIT_FRAME.page.w,DH=land?KIT_FRAME.spread.h:KIT_FRAME.page.h,I0=nr?{t:0,r:0,b:0,l:0}:insets(),I={t:I0.t,r:I0.r,l:I0.l,b:land?0:I0.b}/* landscape: the tab bar goes flush to the screen bottom, under the thin home-indicator line (owner: no strip under the tabs) */,AW=(nr?h:w)-I.l-I.r,AH=(nr?w:h)-I.t-I.b,s=Math.min(AW/DW,AH/DH);
  /* FULL WIDTH (owner 17/11 03:54Z, review/app-edge): when the screen is relatively WIDER than the design the scale is set by the height, and the canvas WIDTH grows to fill the rest (frames grow, the scale — so text and figures — stays the kit size); capped so the layout never sees an absurd width */
  if(!nr&&AW/s>DW)DW=Math.min(Math.ceil(AW/s),Math.round(DW*KIT_FRAME.maxGrow));
  var ox=I.l+(AW-DW*s)/2,oy=I.t+(nr?(AH-DH*s)/2:(AH-DH*s));
  return{w:w,h:h,nr:nr,DW:DW,DH:DH,s:s,tf:(nr?"translateX("+w+"px) rotate(90deg) ":"")+"translate("+ox.toFixed(2)+"px,"+oy.toFixed(2)+"px) scale("+s.toFixed(4)+")"}}
 function place(el,g){if(el.style.width!==g.DW+"px")el.style.width=g.DW+"px";if(el.style.height!==g.DH+"px")el.style.height=g.DH+"px";el.style.transform=g.tf}
 (function(){var g=geo();if(!g||!window.__kbootHost)return;place(cw,g);d.documentElement.appendChild(cw);window.__kbootHost(cw,g.DW,g.DH);
  var keep=window.__kbootHostDrop;window.__kbootHostDrop=function(){if(keep)keep();if(cw.parentNode)cw.parentNode.removeChild(cw)};
  window.addEventListener("resize",function(){var g2=geo();if(g2&&cw.parentNode)place(cw,g2)})})();
 function go(){if(!d.body)d.documentElement.appendChild(d.createElement("body"));
  var f=d.createElement("iframe");f.id="krotf";f.title="Cung Tường Mộng";f.setAttribute("allow","fullscreen; autoplay; screen-wake-lock");
  f.src=location.pathname+(q?q+"&":"?")+"krot=1"+location.hash;
  var lastW=0,lastH=0;
  function typing(){try{var a=f.contentDocument&&f.contentDocument.activeElement;return a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&!/range|checkbox|radio|button/.test(a.type||"")}catch(e){return false}}
  function fit(){var g=geo();if(!g)return;var w=g.w,h=g.h;
   /* the on-screen keyboard shrinks the height while typing: keep the scale (same width) so the page does not jump */
   if(typing()&&w===lastW&&h<lastH)return;lastW=w;lastH=h;
   K.rotated=g.nr;K.s=+g.s.toFixed(4);K.dw=g.DW;K.dh=g.DH;place(f,g);
   if(g.nr)tip();else untip()}
  var tipped=false;function tip(){if(tipped)return;tipped=true;
   var t=d.createElement("div");t.id="krottip";t.className="ktap";t.innerHTML="<i>⟳</i>Xoay ngang điện thoại để chơi";d.body.appendChild(t);t.addEventListener("click",function(){t.style.opacity="0";setTimeout(function(){t.remove()},500)})}
  function untip(){if(!tipped)return;tipped=false;var t=d.getElementById("krottip");if(t)t.remove()}
  fit();d.body.appendChild(f);var rq=0,re=function(){cancelAnimationFrame(rq);rq=requestAnimationFrame(fit)};
  window.addEventListener("resize",re);window.addEventListener("orientationchange",function(){setTimeout(fit,250)});if(window.visualViewport)window.visualViewport.addEventListener("resize",re);
  lock();d.addEventListener("fullscreenchange",lock);f.addEventListener("load",function(){try{f.contentWindow.focus()}catch(e){}if(window.__kbootHostDrop)window.__kbootHostDrop()})}
 d.addEventListener("DOMContentLoaded",function(){var x=d.getElementById("krotx");if(x)x.remove();go()})})();
