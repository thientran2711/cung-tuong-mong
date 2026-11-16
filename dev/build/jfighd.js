/* ================= jfighd: kitFigHD — HIGH-RES FIGURES WHERE A FIGURE IS SHOWN BIG (review/face-sharp, owner 15/11 "mặt vẫn bị mất nét") =================
   Every full-body figure file (fig-*.webp) is 900 px tall. The identity screen shows her at 94 dvh (~1.7-2.1x on a tablet), the stage at
   1.2-1.4x, dialogs and cards up to ~1.5x: the browser upscales the 900 px file and her face goes soft. img/hd/fig-*.webp is the SAME
   painting at up to 1800 px (dev/figwork/hdcut.py: cut from the gpt-2-6 sheet it came from, all later fixes kept by detail transfer).
   img/FIGURES-hd.json = {"fig-x.webp":[w900,wHd], ...}: the files that have an HD twin.
   ONE rule for every <img> of a figure anywhere in the game: give it srcset "<900 file> w900w, <hd file> wHdw" and sizes = its drawn width,
   so the browser itself loads the HD twin only when the picture is drawn bigger than the 900 px file (width x devicePixelRatio > w900)
   and keeps the light file otherwise (performance budget). src stays the 900 file (all code that compares / keys on src is unchanged).
   A src change by any code drops a stale srcset at once (MutationObserver). Test hook: window.KFHD {n, list}. ================= */
(function(){
 const K=window.KFHD={map:null,n:0,ld:0};const RE=/\/img\/(fig-[^\/?#]+\.webp)(?:[?#].*)?$/;
 function hdUrl(lo){return lo.replace(/\/img\/(fig-[^\/?#]+\.webp)/,"/img/hd/$1")}
 function fit(im){try{const s=im.getAttribute("src")||"";const m=RE.exec(im.src||s);const ent=m&&K.map&&K.map[m[1]];
   if(!ent){if(im.dataset.kfhd){im.removeAttribute("srcset");im.removeAttribute("sizes");delete im.dataset.kfhd}return}
   const ss=`${im.src} ${ent[0]}w, ${hdUrl(im.src)} ${ent[1]}w`;if(im.getAttribute("srcset")!==ss){im.setAttribute("srcset",ss);im.dataset.kfhd=m[1];K.n++}
   const w=Math.round(im.getBoundingClientRect().width);const sz=(w>4?w:ent[0])+"px";if(im.getAttribute("sizes")!==sz)im.setAttribute("sizes",sz)}catch(e){}}
 function all(){if(!K.map)return;document.querySelectorAll("img").forEach(im=>{if(im.dataset.kfhd||RE.test(im.src||""))fit(im)})}
 window.kitFigHD=fit;window.kitFigHDAll=all;
 function load(){if(K.ld)return;K.ld=1;try{fetch("img/FIGURES-hd.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&typeof j==="object"){K.map=j.files||j;K.list=Object.keys(K.map).length;all()}}).catch(()=>{K.ld=0})}catch(e){K.ld=0}}
 load();setInterval(()=>{K.ld=0;load()},300000);
 let T=0;const sched=()=>{if(T)return;T=requestAnimationFrame(()=>{T=0;all()})};
 try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="attributes"){const im=m.target;if(im.tagName==="IMG"&&m.attributeName==="src")fit(im)}else if(m.addedNodes.length){sched();break}}})
  .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src"]})}catch(e){}
 addEventListener("resize",()=>{clearTimeout(window.__kfhdT);window.__kfhdT=setTimeout(all,150)});
 document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&RE.test(t.src||"")&&!t.dataset.kfhdw){t.dataset.kfhdw=1;fit(t)}},true);
})();
/* ---- kitAlphaClean (#kfa) — glows follow the figure, never a rectangle (owner 15/11 "Tại sao vẫn có ô chữ nhật vàng khi chọn") ----
   The cut-out figures keep a faint alpha haze (alpha 1–12) over much of their box (background removal + lossy WebP alpha). Every
   drop-shadow (her rank halo, the selection glow, the ground shadow) also shadows that haze, so the glow showed as a yellow / grey
   RECTANGLE. url(#kfa) comes FIRST in every people-picture filter (p1 #mefig / .tok.fig .figimg, j59 HG/SG, jk4 .kesimg, j79 .kidfig2,
   j90 .kpod-img): alpha' = 1.07·alpha − 0.065, so the haze becomes 0 and the body is unchanged; the drop-shadows then trace the silhouette.
   Static (no animation: KIT motion rule STILL PEOPLE). */
(function(){try{if(document.getElementById("kfa"))return;const d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("width","0");d.setAttribute("height","0");
 d.setAttribute("aria-hidden","true");d.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
 d.innerHTML='<defs><filter id="kfa" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="1.07" intercept="-0.065"/></feComponentTransfer></filter></defs>';
 (document.body||document.documentElement).appendChild(d)}catch(e){}})();
