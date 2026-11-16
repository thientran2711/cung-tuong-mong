/* ================= jkpor: ONE portrait framing rule for every kit frame (owner 11/15) =================
   Every por-* picture in a pcPort cell (person card, strips, header, rows…), measured once per picture (canvas, 160 px high):
   1. SIZE (owner 11/15: "never zoom in"; then "kids at different zoom"): the FACE (OpenCV face box per picture, img/POR_FACE2.json made by
      dev/tools/por_face.py) is KIT_POR.face of the window height for EVERY portrait — consorts, maids, mamas, eunuchs, men, officials,
      physicians, the Emperor, Thái hậu, the player, children of every age. z = face target ÷ face height, clamped to KIT_POR.zr = [1, 1.14] (never more zoom
      than the approved 1.14 cut); the target (.2975) is the small face at 1.14, so no picture needs zooming in. KIT_POR.fam can give a family its own target.
   2. HEAD TOP (hair ornaments included = first opaque row) sits KIT_POR.g of the window under the window's top edge — same gap for all;
      the lift is capped so the picture still covers the window bottom.
   3. BODY (mid-point of the shoulder/chest rows, head ignored) centred in the window, offset capped at KIT_POR.dx — and, when the picture's
      own side edge is painted (garment cut by the picture border), capped so that edge never enters the window (reviewer r6: no hard cut).
   Old face-* art and the grey unknown silhouette keep their own rules; pictures without a family (data: avatars) or without a skin row
   keep z = KIT_POR.z. Window in .kin units (% of the kin box): left 14.655, top 20.289, width 70.691, height 49.373 (j60/jk2b). ========== */
/* NO ZOOM beyond the approved cut (owner 11:30Z, coordinator 11/15): z ∈ [1, 1.14] — a picture can only be shown LESS zoomed than the old
   1.14 (down to 1.0, where it still covers the window), never more. So the common face size is the one the SMALL faces have at 1.14:
   face .2975 of the window (5th percentile face 0.261 × 1.14); larger faces are brought down to it (z < 1.14). 5551 of 5744 portraits land
   within ±3 % (old fixed 1.14: 3973); what is left is faces too big even at z = 1 (kid-a4, a few consorts/maids) — see PROGRESS_gift-ui.
   A face box over .40 of the picture is a false detection (5 pictures): those keep z = KIT_POR.z. */
window.KIT_POR=window.KIT_POR||{z:1.14,g:.03,t0:.10,dx:.18,zr:[1,1.14],face:.2975,fbad:.40,fam:{}};
/* img/POR_FACE2.json (dev/tools/por_face.py, OpenCV face boxes of every por picture): {"v":2,"f":{"<name>":[faceTop,faceH,faceX,opaqueTop,bodyX]}}
   reviewer gift-ui-r6: a NEW file name (and v 2 required) on purpose — older builds (zr up to 1.6, still cached by players or on other branches)
   fetch img/POR_FACE.json, which must never be uploaded; only this build (zr [1, 1.14]) reads the manifest, so the upload cannot zoom anyone */
let KPOR_FACE=null;try{fetch("img/POR_FACE2.json").then(r=>r.ok?r.json():null).then(j=>{if(j&&j.v>=2&&j.f){KPOR_FACE=j.f;document.querySelectorAll("img.kpor").forEach(kporApply)}}).catch(()=>{})}catch(e){}
function kporFace(src){const m=/por-([^/?]+)\.webp/.exec(src||"");const v=m&&KPOR_FACE&&KPOR_FACE[m[1]];return v&&v[1]>0&&v[1]<=(KIT_POR.fbad||1)?v:null}
const KPOR_T={};
function kporFam(src){const m=/por-([a-z]+)-[^/]*?(?:-(a\d+))?\.webp/.exec(src||"");if(!m)return"";return m[1]==="kid"?(m[2]?"kid-"+m[2]:""):m[1]}
/* keep in sync with dev/tools/por_family.py */
function kporMeasure(im){const h=160,w=Math.max(1,Math.round(im.naturalWidth*h/im.naturalHeight));const c=document.createElement("canvas");c.width=w;c.height=h;
 const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;const A=(x,y)=>d[(y*w+x)*4+3];
 let tr=0;for(let x=0;x<w;x++)if(A(x,0)<20)tr++;const trans=tr>w*.5;
 const wid=[];for(let y=0;y<h;y++){let n=0;for(let x=0;x<w;x++)if(A(x,y)>60)n++;wid.push(n)}
 let t=0;if(trans){for(let y=0;y<h;y++)if(wid[y]>=Math.max(2,Math.floor(w*.01))){t=y;break}}
 const need=Math.max(3,Math.round(w*.012));let ft=-1;
 for(let y=t;y<Math.floor(t+.6*h)&&ft<0;y++){let n=0;for(let x=0;x<w;x++){const k=(y*w+x)*4;const R=d[k],G=d[k+1],B=d[k+2];
   if(d[k+3]>=200&&R>150&&G>105&&B>85&&R-G>=8&&R-G<=62&&G-B>=-4&&G-B<=48&&R-B<=95)n++}if(n>=need)ft=y}
 let f=null;if(ft>=0){const lo=Math.floor(ft+.12*h),hi=Math.floor(Math.min(h-1,ft+.5*h));let nk=lo,mn=1e9;for(let y=lo;y<hi;y++)if(wid[y]<mn){mn=wid[y];nk=y}f=(nk-ft)/h}
 let sx=0,n=0;if(trans)for(let y=Math.floor(h*.62);y<Math.floor(h*.8);y++){let l=-1,r=-1;for(let x=0;x<w;x++)if(A(x,y)>60){if(l<0)l=x;r=x}if(l>=0){sx+=(l+r+1)/2/w;n++}}
 /* reviewer r6: is the picture's own left/right edge painted (garment cut by the picture border) below the head? then that edge must never
    come inside the window (a hard vertical cut), so the body shift is capped there (kporGeo) */
 let el=0,er=0;for(let y=t;y<h;y++){if(A(0,y)>128)el++;if(A(w-1,y)>128)er++}
 return{t:t/h,f,x:n?sx/n:.5,trans,eL:el>1,eR:er>1}}
function kporTop(src,cb){const o=KPOR_T[src];if(o&&o.v!=null)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KPOR_T[src]=e;
 const im=new Image();im.decoding="async";im.crossOrigin="anonymous";
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f(v)}catch(x){}})};
 im.onload=()=>{let v={t:KIT_POR.t0,f:null,x:.5};try{v=kporMeasure(im);if(!v.trans)v.t=KIT_POR.t0}catch(x){}done(v)};
 im.onerror=()=>done({t:KIT_POR.t0,f:null,x:.5});im.src=src;return null}
/* geometry of one picture → inline custom properties read by the kit CSS below */
function kporGeo(src,v){const K=KIT_POR,WL=14.655,WT=20.289,WW=70.691,WH=49.373;
 /* size: the FACE (OpenCV box from POR_FACE2.json) is K.face of the window height for every picture (a family may override: K.fam) */
 let z=K.z;const F=kporFace(src);if(F){const tgt=K.fam[kporFam(src)]||K.face;z=Math.max(K.zr[0],Math.min(K.zr[1],tgt/F[1]));v=Object.assign({},v,{t:F[3]||v.t,x:F[4]||v.x})}
 const L=Math.min(v.t*z-K.g,z-1);const cv=(z-1)/2/z;/* max shift that keeps the picture covering the window */
 const D=Math.max(-(v.eL?Math.min(K.dx,cv):K.dx),Math.min(v.eR?Math.min(K.dx,cv):K.dx,(v.x||.5)-.5));
 const left=WL-(z-1)*WW/2-D*z*WW,top=WT-L*WH;const s=(z-1)/2;
 return{z,L,D,left,top,w:z*WW,h:z*WH,clip:`inset(${(L/z*100).toFixed(3)}% ${((s-D*z)/z*100).toFixed(3)}% ${((z-1-L)/z*100).toFixed(3)}% ${((s+D*z)/z*100).toFixed(3)}%)`}}
/* D25 veil-zoom: the face-overlay box (.kfxc > .kfx: veil, scar, slap, rash, makeup layers, jk2b section 7) is the SAME box as the picture this rule just
   placed: left/top/width/height of the picture in window units (the .kfxc window = WL/WT/WW/WH of the kin box), so every overlay follows the
   per-picture zoom z, lift L and shift D instead of the fixed 1.14 cut (which sat 3-10 % off the face whenever z < 1.14). One place, every frame. */
function kporFx(img,G){try{const K=KPOR_WIN,fx=img.parentElement&&img.parentElement.querySelector(":scope>.kfxc>.kfx");if(!fx)return;const st=fx.style;
 st.setProperty("--kxl",((G.left-K[0])/K[2]*100).toFixed(3)+"%");st.setProperty("--kxt",((G.top-K[1])/K[3]*100).toFixed(3)+"%");st.setProperty("--kxw",(G.w/K[2]*100).toFixed(3)+"%");st.setProperty("--kxh",(G.h/K[3]*100).toFixed(3)+"%");fx.classList.add("kfxz")}catch(e){}}
const KPOR_WIN=[14.655,20.289,70.691,49.373];
function kporApply(img){try{if(!img||!img.classList||!img.classList.contains("kpor"))return;const src=img.currentSrc||img.getAttribute("src")||"";
 if(!src||/face-|unknown/.test(src))return;
 const set=v=>{const G=kporGeo(src,v);const st=img.style;st.setProperty("--kpl",G.left.toFixed(3)+"%");st.setProperty("--kpt2",G.top.toFixed(3)+"%");st.setProperty("--kpw",G.w.toFixed(3)+"%");
  st.setProperty("--kph",G.h.toFixed(3)+"%");st.setProperty("--kpc",G.clip);img.dataset.kpz=G.z.toFixed(3);img.dataset.kpf=v.f==null?"":v.f.toFixed(3);img.dataset.kpt=v.t.toFixed(3);img.dataset.kpx=(v.x||.5).toFixed(3);img.classList.add("kporz");kporFx(img,G)};
 const v=kporTop(src,set);set(v==null?{t:KIT_POR.t0,f:null,x:.5}:v)}catch(e){}}
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&t.classList.contains("kpor"))kporApply(t)},true);
try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="attributes"){if(m.target.classList&&m.target.classList.contains("kpor"))kporApply(m.target);continue}
  m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.classList.contains("kpor"))kporApply(n);else if(n.querySelectorAll)n.querySelectorAll("img.kpor").forEach(kporApply)})}})
 .observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["src"]})}catch(e){}
(function(){const sel=`.kin>img.kpor.kporz:not([src*="face-"]):not([src*="unknown"])`;
 const st=document.createElement("style");st.id="kpor-css";st.textContent=`
html body ${sel},html body .pcp.kit ${sel},html body span.md.kfc ${sel}{left:var(--kpl)!important;top:var(--kpt2)!important;width:var(--kpw)!important;height:var(--kph)!important;
 object-fit:cover!important;object-position:50% 0!important;clip-path:var(--kpc)!important;border-radius:0!important}`;
  st.textContent+=`
html body .kfxc>.kfx.kfxz{left:var(--kxl)!important;top:var(--kxt)!important;width:var(--kxw)!important;height:var(--kxh)!important}`;
 
 document.head.appendChild(st)})();
