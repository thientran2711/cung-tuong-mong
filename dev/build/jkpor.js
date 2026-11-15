
/* ================= jkpor: ONE portrait framing rule for every kit frame (owner 11/15: "the head floats too low, the face is too small") =================
   Keeps the SAME scale as the old cut (KIT 28.0 C1: the por picture is 1.14x the window, chest-up; owner 11/15: never zoom in) and only MOVES
   the picture up, per picture, so the TOP OF THE HEAD (hair ornaments included, = first opaque row of the por art, measured once) sits
   KIT_POR.g of the window height under the window's top edge — the same gap for every frame, role, rank and size; more of the body shows
   at the bottom. The lift is capped so the picture always still covers the window bottom (lift ≤ z − 1). Horizontally the BODY (mid-point of
   the shoulder/chest rows, head ignored) is moved to the window centre (owner 11/15: portraits sat too far left), offset capped at KIT_POR.dx.
   Clipped to the window.
   Old face-* art and the grey unknown silhouette keep their own rules. Before a picture is measured, the median head top (KIT_POR.t0) is used.
   Window in .kin units (% of the kin box): left 14.655, top 20.289, width 70.691, height 49.373 (j60/jk2b). ===================================== */
window.KIT_POR=window.KIT_POR||{z:1.14,g:.03,t0:.10,dx:.18};
const KPOR_T={};
function kporTop(src,cb){const o=KPOR_T[src];if(o&&o.v!=null)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KPOR_T[src]=e;
 const im=new Image();im.decoding="async";im.crossOrigin="anonymous";
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f(v)}catch(x){}})};
 im.onload=()=>{let v=KIT_POR.t0,cx=.5;try{const h=160,w=Math.max(1,Math.round(im.naturalWidth*h/im.naturalHeight));const c=document.createElement("canvas");c.width=w;c.height=h;
   const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;
   /* opaque art only (por with a painted background have no transparent top: keep the median) */
   let opaqueTop=-1,trans=0;for(let i=3;i<w*4;i+=4)if(d[i]<20)trans++;
   if(trans>w*.5){for(let y=0;y<h&&opaqueTop<0;y++){let n=0;const q=y*w*4;for(let i=0;i<w;i++)if(d[q+i*4+3]>60)n++;if(n>=Math.max(2,w*.01))opaqueTop=y}}
   if(opaqueTop>=0)v=opaqueTop/h;
   /* body centre: mid-point of the opaque span on the shoulder/chest rows (62-80 % of the picture), averaged — the head is ignored */
   let sx=0,n=0;if(trans>w*.5)for(let y=Math.round(h*.62);y<Math.round(h*.8);y++){const q=y*w*4;let l=-1,r=-1;for(let i=0;i<w;i++)if(d[q+i*4+3]>60){if(l<0)l=i;r=i}if(l>=0){sx+=(l+r+1)/2/w;n++}}
   cx=n?sx/n:.5}catch(x){}done({t:v,x:cx})};
 im.onerror=()=>done({t:KIT_POR.t0,x:.5});im.src=src;return null}
function kporApply(img){try{if(!img||!img.classList||!img.classList.contains("kpor"))return;const src=img.currentSrc||img.getAttribute("src")||"";
 if(!src||/face-|unknown/.test(src))return;const set=v=>{img.style.setProperty("--kpt",(+v.t).toFixed(4));
  /* x: body centre offset from the picture centre, capped so a side never opens more than the zoom slack */
  const D=Math.max(-KIT_POR.dx,Math.min(KIT_POR.dx,(v.x||.5)-.5));img.style.setProperty("--kpd",D.toFixed(4));img.classList.add("kporz")};
 const v=kporTop(src,set);set(v==null?{t:KIT_POR.t0,x:.5}:v)}catch(e){}}
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&t.classList.contains("kpor"))kporApply(t)},true);
try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="attributes"){if(m.target.classList&&m.target.classList.contains("kpor"))kporApply(m.target);continue}
  m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.classList.contains("kpor"))kporApply(n);else if(n.querySelectorAll)n.querySelectorAll("img.kpor").forEach(kporApply)})}})
 .observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]})}catch(e){}
(function(){const Z=KIT_POR.z,G=KIT_POR.g,WL=14.655,WT=20.289,WW=70.691,WH=49.373;
 const h=(Z*WH).toFixed(3),w=(Z*WW).toFixed(3),l0=(WL-(Z-1)*WW/2).toFixed(3),s0=((Z-1)/2).toFixed(4);
 /* horizontal: the BODY centre (--kpd = body x − 0.5, fraction of the picture) goes to the window centre */
 const l=`calc(${l0}% - var(--kpd,0) * ${(Z*WW).toFixed(3)}%)`,cl=`calc((${s0} + var(--kpd,0) * ${Z}) / ${Z} * 100%)`,cr=`calc((${s0} - var(--kpd,0) * ${Z}) / ${Z} * 100%)`;
 /* lift L (window heights) = min(t*Z - G, Z - 1) */
 const L=`min(var(--kpt,${KIT_POR.t0}) * ${Z} - ${G}, ${(Z-1).toFixed(3)})`;
 const top=`calc(${WT}% - ${L} * ${WH}%)`;
 const ct=`calc(${L} / ${Z} * 100%)`;
 const cb=`calc((${Z} - 1 - ${L}) / ${Z} * 100%)`;
 const sel=`.kin>img.kpor.kporz:not([src*="face-"]):not([src*="unknown"])`;
 const st=document.createElement("style");st.id="kpor-css";st.textContent=`
html body ${sel},html body .pcp.kit ${sel},html body span.md.kfc ${sel}{left:${l}!important;top:${top}!important;width:${w}%!important;height:${h}%!important;
 object-fit:cover!important;object-position:50% 0!important;clip-path:inset(${ct} ${cr} ${cb} ${cl})!important;border-radius:0!important}`;
 document.head.appendChild(st)})();
