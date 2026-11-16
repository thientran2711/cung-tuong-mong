/* ONE LAYOUT PER ORIENTATION, SCALED (owner 11/15) — the design canvas. Inlined at the TOP of <head> by build_site.sh, runs before the game.
   The page is a thin HOST: the game runs inside ONE frame (#krotf) whose size is the DESIGN size, scaled uniformly to the screen like a
   resized window, centred, with paper-coloured bars:
     landscape (and narrow portrait phones, pre-rotated)  1180 x 820  (the iPad layout)
     portrait (Fold-size, width/height >= 0.62)          755 x 1000
     s = min(available width / design width, available height / design height)
   Narrow portrait phones (width/height < 0.62: 390x844, 412x915, 412x1058 …): the frame is also rotated 90° so the landscape layout appears
   sideways and the player turns the phone; turned to real landscape the rotation drops (no reload).
   Inside the frame the game sees ONLY the design size: innerWidth/innerHeight, every media query and every JS breakpoint read 1180x820 or
   755x1000, so the layout never reflows on the device (kitView() = {w,h,s,rot}). The browser maps touches and drags through the frame's
   transform, so pointer coordinates (page curl, sliders, map pan) arrive already divided by s and rotated; fixed popovers stay inside the frame.
   screen.orientation.lock('landscape') is tried only for a narrow portrait screen in an installed PWA / fullscreen (never Fold, never iPad).
   One-time tip "Xoay ngang điện thoại để chơi" for narrow portrait (localStorage ctm-rot-tip).
   The rest of index.html is swallowed by <plaintext> in the host (never executed), then dropped.
   Direct mode (no host, real viewport): ?khost=0, or automated browsers (navigator.webdriver) unless ?khost=1 — old tests keep working.
   Test hook: window.__krot {host, rotated, s, dw, dh}. */
(function(){var inFrame;try{inFrame=window.top!==window}catch(e){inFrame=true}
 if(inFrame){document.documentElement.classList.add("kview-in");
  window.kitView=function(){var h=null;try{h=parent.__krot}catch(e){}return{w:innerWidth,h:innerHeight,s:h&&h.s||1,rot:!!(h&&h.rotated),design:true}};return}
 var q=location.search||"";
 if(/[?&]khost=0/.test(q)||(navigator.webdriver&&!/[?&]khost=1/.test(q))){window.__krot={host:false,rotated:false,s:1};
  window.kitView=function(){return{w:innerWidth,h:innerHeight,s:1,rot:false,design:false}};return}
 /* HOST: everything after this script (the 2 MB game) is turned into inert hidden text with the classic <plaintext> switch, so the
    game never boots here and the host document still finishes parsing normally (window.stop() leaves a page Chromium never paints) */
 document.write('<plaintext id="krotx" hidden style="display:none">');document.title="Cung Tường Mộng";
 var K=window.__krot={host:true,rotated:false,s:1,dw:1180,dh:820};
 window.kitView=function(){return{w:K.dw,h:K.dh,s:K.s,rot:K.rotated,design:true}};
 var d=document,st=d.createElement("style");
 st.textContent="html,body{margin:0;height:100%;overflow:hidden;overscroll-behavior:none;background:#f6efe2 radial-gradient(ellipse at 50% 40%,#fbf5ea 0,#efe3cc 100%)}"+
  "#krotf{position:fixed;top:0;left:0;border:0;display:block;transform-origin:0 0;background:#f6efe2;box-shadow:0 0 24px #8a6a4033}"+
  "#krottip{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;pointer-events:none;background:#2a1a12ee;color:#fff3dc;"+
  "font:600 16px/1.35 system-ui,sans-serif;padding:14px 18px;border-radius:12px;box-shadow:0 4px 18px #0007;text-align:center;transition:opacity .5s;max-width:80vw}"+
  "#krottip i{display:block;font-style:normal;font-size:30px;margin-bottom:4px}";
 (d.head||d.documentElement).appendChild(st);
 function narrow(w,h){return w>0&&w<h&&w/h<0.62}
 function lock(){try{var o=screen.orientation,pwa=matchMedia("(display-mode: standalone)").matches||matchMedia("(display-mode: fullscreen)").matches||!!d.fullscreenElement;
  if(o&&o.lock&&pwa&&narrow(innerWidth,innerHeight))o.lock("landscape").catch(function(){})}catch(e){}}
 /* boot cover (kboot.js, KIT §14.1) in the design box, from the first paint until the frame has painted its own copy */
 var cw=d.createElement("div");cw.id="kbootw";cw.style.cssText="position:fixed;top:0;left:0;transform-origin:0 0;overflow:hidden;z-index:4";
 function geo(){var w=window.innerWidth,h=window.innerHeight;if(!w||!h)return null;
  var nr=narrow(w,h),land=nr||w>=h,DW=land?1180:755,DH=land?820:1000,AW=nr?h:w,AH=nr?w:h,s=Math.min(AW/DW,AH/DH),ox=(AW-DW*s)/2,oy=(AH-DH*s)/2;
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
   if(g.nr)tip()}
  var tipped=false;function tip(){if(tipped)return;tipped=true;var seen=false;try{seen=localStorage.getItem("ctm-rot-tip")==="1";localStorage.setItem("ctm-rot-tip","1")}catch(e){}if(seen)return;
   var t=d.createElement("div");t.id="krottip";t.innerHTML="<i>⟳</i>Xoay ngang điện thoại để chơi";d.body.appendChild(t);setTimeout(function(){t.style.opacity="0";setTimeout(function(){t.remove()},600)},4200)}
  fit();d.body.appendChild(f);var rq=0,re=function(){cancelAnimationFrame(rq);rq=requestAnimationFrame(fit)};
  window.addEventListener("resize",re);window.addEventListener("orientationchange",function(){setTimeout(fit,250)});if(window.visualViewport)window.visualViewport.addEventListener("resize",re);
  lock();d.addEventListener("fullscreenchange",lock);f.addEventListener("load",function(){try{f.contentWindow.focus()}catch(e){}if(window.__kbootHostDrop)window.__kbootHostDrop()})}
 d.addEventListener("DOMContentLoaded",function(){var x=d.getElementById("krotx");if(x)x.remove();go()})})();
