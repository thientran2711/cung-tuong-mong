
/* ================= jkpor: ONE portrait framing rule for every kit frame (owner 11/15: "the head floats too low, the face is too small") =================
   Replaces the fixed "1.14x, raised 5 %" cut (KIT 28.0 C1) for por-* art: every portrait is zoomed KIT_POR.z times the photo window and
   lifted so the TOP OF THE HEAD (hair ornaments included, = first opaque row of the por art, measured once per picture) sits KIT_POR.g of
   the window height under the window's top edge — the same gap for every frame, role, rank and size. Clipped to the window.
   Old face-* art and the grey unknown silhouette keep their own rules. Before a picture is measured, the median head top (KIT_POR.t0) is used.
   Window in .kin units (% of the kin box): left 14.655, top 20.289, width 70.691, height 49.373 (j60/jk2b). ===================================== */
window.KIT_POR=window.KIT_POR||{z:1.32,g:.05,t0:.10};
const KPOR_T={};
function kporTop(src,cb){const o=KPOR_T[src];if(o&&o.v!=null)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KPOR_T[src]=e;
 const im=new Image();im.decoding="async";im.crossOrigin="anonymous";
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f(v)}catch(x){}})};
 im.onload=()=>{let v=KIT_POR.t0;try{const h=160,w=Math.max(1,Math.round(im.naturalWidth*h/im.naturalHeight));const c=document.createElement("canvas");c.width=w;c.height=h;
   const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;
   /* opaque art only (por with a painted background have no transparent top: keep the median) */
   let opaqueTop=-1,trans=0;for(let i=3;i<w*4;i+=4)if(d[i]<20)trans++;
   if(trans>w*.5){for(let y=0;y<h&&opaqueTop<0;y++){let n=0;const q=y*w*4;for(let i=0;i<w;i++)if(d[q+i*4+3]>60)n++;if(n>=Math.max(2,w*.01))opaqueTop=y}}
   if(opaqueTop>=0)v=opaqueTop/h}catch(x){}done(v)};
 im.onerror=()=>done(KIT_POR.t0);im.src=src;return null}
function kporApply(img){try{if(!img||!img.classList||!img.classList.contains("kpor"))return;const src=img.currentSrc||img.getAttribute("src")||"";
 if(!src||/face-|unknown/.test(src))return;const set=t=>{img.style.setProperty("--kpt",(+t).toFixed(4));img.classList.add("kporz")};
 const t=kporTop(src,set);set(t==null?KIT_POR.t0:t)}catch(e){}}
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&t.classList.contains("kpor"))kporApply(t)},true);
try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="attributes"){if(m.target.classList&&m.target.classList.contains("kpor"))kporApply(m.target);continue}
  m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.classList.contains("kpor"))kporApply(n);else if(n.querySelectorAll)n.querySelectorAll("img.kpor").forEach(kporApply)})}})
 .observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]})}catch(e){}
(function(){const Z=KIT_POR.z,G=KIT_POR.g,WL=14.655,WT=20.289,WW=70.691,WH=49.373;
 const h=(Z*WH).toFixed(3),w=(Z*WW).toFixed(3),l=(WL-(Z-1)*WW/2).toFixed(3),side=((Z-1)/2/Z*100).toFixed(3);
 /* top (kin %) = WT - (t*Z - G)*WH ; clip top = (WT - top)/h ; clip bottom = (top + h - (WT+WH))/h */
 const top=`calc(${WT}% - (var(--kpt,${KIT_POR.t0}) * ${Z} - ${G}) * ${WH}%)`;
 const ct=`calc((var(--kpt,${KIT_POR.t0}) * ${Z} - ${G}) / ${Z} * 100%)`;
 const cb=`calc((${Z} - 1 - (var(--kpt,${KIT_POR.t0}) * ${Z} - ${G})) / ${Z} * 100%)`;
 const sel=`.kin>img.kpor.kporz:not([src*="face-"]):not([src*="unknown"])`;
 const st=document.createElement("style");st.id="kpor-css";st.textContent=`
html body ${sel},html body .pcp.kit ${sel},html body span.md.kfc ${sel}{left:${l}%!important;top:${top}!important;width:${w}%!important;height:${h}%!important;
 object-fit:cover!important;object-position:50% 0!important;clip-path:inset(${ct} ${side}% ${cb} ${side}%)!important;border-radius:0!important}`;
 document.head.appendChild(st)})();
