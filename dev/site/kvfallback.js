/* KIT §0 fallback (design-scale p2 review): the game reads kitView().pages / html.kv1 / html.kv2 / KIT_FRAME, which rot.js defines. The built
   root index.html always has rot.js; dev/index.html (assemble.py, used by coop-e2e and direct-mode tests) does not — without this every
   kitView() call threw "kitView is not defined" and no :where(.kv1/.kv2) chrome rule applied. Same definitions as rot.js direct mode;
   never overrides rot.js when it is there. */
if(typeof window.kitView!=="function")(function(){window.KIT_FRAME=window.KIT_FRAME||{spread:{w:1180,h:820},page:{w:590,h:820},margin:8,pageMargin:4,gutter:0};
 var P=function(){return innerWidth<innerHeight?1:2};
 var M=function(){var r=document.documentElement,p=P();r.classList.toggle("kv1",p===1);r.classList.toggle("kv2",p===2);
  r.style.setProperty("--kpage-w",KIT_FRAME.page.w+"px");r.style.setProperty("--kpage-h",KIT_FRAME.page.h+"px")};
 window.kitView=function(){return{w:innerWidth,h:innerHeight,s:1,rot:false,design:false,pages:P()}};M();addEventListener("resize",M)})();
