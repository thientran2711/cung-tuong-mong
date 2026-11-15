/* ---- jsl: KIT ÁNH SÁNG NHÂN VẬT THEO BUỔI (review/scene-light, sếp 11/15 10:10Z) ----
   Tranh nhân vật vẽ ở ánh sáng ban ngày; đặt lên nền trưa/chiều/tối thì lạc quẻ. Kit này cho mọi nhân vật đứng trên sân khấu
   (#mefig, #tokens .tok.fig .figimg) và trong hộp thoại sự kiện (.kesimg) nhận MỘT lớp sáng nhẹ khớp buổi + mùa:
     sáng: không đổi · trưa: ấm sáng nhẹ · chiều: phủ vàng ấm mờ + ánh viền ấm một bên (phía trái, như nắng xiên qua cửa)
     tối: tối nhẹ + phủ lam + ánh đèn ấm phía phải.
   Một biến kit duy nhất: --klf (danh sách hàm filter CSS), đặt ở :root theo S.buoi + mùa. Các luật filter của nhân vật
   (p1.html .tok.fig .figimg / #mefig, j59 HG/SG cả keyframes, jk4 .kesimg) viết "filter:var(--klf) drop-shadow(…)".
   Chỉ dùng hàm CSS nội suy được (không url()) để keyframes halo/chọn của j59 vẫn mượt. Phủ lam/vàng = kẹp sepia giữa hai
   hue-rotate ngược nhau: phần sepia (đơn sắc theo độ sáng) đổi sắc, phần còn lại của ảnh giữ nguyên màu → mặt không bẩn.
   KIT_LIGHT.css(buoi, mùa) trả chuỗi filter (dùng cho tờ duyệt dev/shots/scene-light). */
/* NÚM: BAL.klfStrength = 0 (không phủ, mặc định tới khi sếp chọn) · 0.5 (nhẹ) · 1 (đủ). Đổi một dòng: */
if(typeof BAL==="object"&&BAL&&BAL.klfStrength==null)BAL.klfStrength=0;
const KIT_LIGHT=(function(){
 const wash=(deg,s)=>s>0?`hue-rotate(${deg}deg) sepia(${s}) hue-rotate(${-deg}deg)`:"";
 /* hai mức: N = nhẹ (BAL.klfStrength .5), T = đủ (1); 0 = không phủ. Giữa các mức nội suy thẳng. rim: [x,y,mờ,r,g,b,đậm] */
 const N={trua:{hue:-14,w:.04,b:1.015,s:1.015,c:1},
  chieu:{hue:-16,w:.1,b:1,s:.98,c:1,rim:[-2,-1,2,255,208,128,.5]},
  toi:{hue:180,w:.07,b:.9,s:.97,c:1.01,rim:[2,0,2.5,255,172,90,.5]}};
 const T={trua:{hue:-14,w:.07,b:1.03,s:1.03,c:1},
  chieu:{hue:-16,w:.18,b:.99,s:.96,c:.99,rim:[-3,-1,2,255,208,128,.7]},
  toi:{hue:180,w:.2,b:.7,s:.9,c:1.03,rim:[3,0,2.5,255,172,90,.6]}};
 /* mùa: hạ ấm hơn chút, đông lạnh hơn chút (cộng vào độ phủ, theo độ mạnh) */
 const SE={xuan:0,ha:.02,thu:.01,dong:-.02};
 const r3=x=>Math.round(x*1000)/1000;
 function strength(){try{if(typeof BAL==="object"&&BAL&&BAL.klfStrength!=null)return Math.max(0,Math.min(1,+BAL.klfStrength))}catch(e){}return 0}
 function css(bu,se,k){k=k==null?strength():k;if(!T[bu]||k<=0)return "brightness(1)";
  const lo=k<=.5?null:N[bu],hi=k<=.5?N[bu]:T[bu],t=k<=.5?k/.5:(k-.5)/.5;
  const Z={w:0,b:1,s:1,c:1},A=lo||Z,m=f=>r3(A[f]+(hi[f]-A[f])*t);
  let w=m("w")+(bu==="toi"?-(SE[se]||0):(SE[se]||0))*k;w=Math.max(0,r3(w));
  let rim="";if(hi.rim){const R=hi.rim,ra=lo&&lo.rim?lo.rim:[0,0,0,0,0,0,0],q=i=>r3(ra[i]+(R[i]-ra[i])*t);
   rim=`drop-shadow(${q(0)}px ${q(1)}px ${q(2)}px rgba(${R[3]},${R[4]},${R[5]},${q(6)}))`}
  return [wash(hi.hue,w),`brightness(${m("b")}) saturate(${m("s")}) contrast(${m("c")})`,rim].filter(Boolean).join(" ")}
 function key(){try{const four=typeof BUOI!=="undefined"&&BUOI.length>=4,b=S.buoi||0;
   const bu=(four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[b]||"sang";
   const se=(typeof SCN_SEAS==="object"&&SCN_SEAS[SEASON[(S.month||1)-1]])||"xuan";return {bu,se}}catch(e){return {bu:"sang",se:"xuan"}}}
 let last="";
 function sync(){try{if(typeof S!=="object"||!S)return;const k=key(),id=k.bu+"-"+k.se+"-"+strength();if(id===last)return;last=id;
   const r=document.documentElement;r.style.setProperty("--klf",css(k.bu,k.se));r.dataset.klight=k.bu}catch(e){}}
 return {N,T,css,key,sync,strength}})();
window.KIT_LIGHT=KIT_LIGHT;
(function(){const st=document.createElement("style");st.textContent=`:root{--klf:brightness(1)}`;document.head.appendChild(st);
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){KIT_LIGHT.sync();return r0.apply(this,arguments)}}
 if(typeof render==="function"){const r1=render;render=function(){KIT_LIGHT.sync();return r1.apply(this,arguments)}}
 if(typeof kitEventStage==="function"){const k0=kitEventStage;kitEventStage=window.kitEventStage=function(){KIT_LIGHT.sync();return k0.apply(this,arguments)}}
 KIT_LIGHT.sync()})();
/* Tranh cảnh đã vẽ/chỉnh màu riêng cho từng buổi (j94 <tên>-<mùa>-<buổi>): TẮT lớp phủ màu buổi b4Light của j12 (balance-unified)
   — sếp 11/15 duyệt màu đã chỉnh, không phủ thêm. j12 gọi b4Light(b,used,k) với k<1 cho tranh riêng buổi; tranh chung (k=1) vẫn phủ đủ.
   Phủ thời tiết (mưa/sương) của j12 không đổi. Núm: KIT_SCENE_TINT = 0 (tắt) · 1 (bật lại ~1/4 như cũ). */
window.KIT_SCENE_TINT=window.KIT_SCENE_TINT==null?0:window.KIT_SCENE_TINT;
(function(){if(typeof b4Light!=="function")return;const b0=b4Light;
 b4Light=window.B4LIGHT=function(b,u,k){if(k!=null&&k<1&&!window.KIT_SCENE_TINT)return "rgba(0,0,0,0)";return b0.apply(this,arguments)}})();
/* ---- TRANH CẢNH ĐÃ CHỈNH + THỜI TIẾT (sếp 11/15: Ngọc Thanh các chiều mưa tháng tư "nâu sepia, tối như lãnh cung") ----
   Tranh riêng buổi (j94 <tên>-<mùa>-<buổi>, đã chỉnh màu, sếp duyệt) KHÔNG chồng thêm lọc màu cũ của p1.html/j25
   (.sc-home.day: brightness 1.35 + sepia .12; rp1: sepia .25; rp2/rp3: saturate 1.3–1.4) → .stage.kown.
   Trời ướt (mưa phùn, giông, tuyết dày: wet()) trên tranh riêng buổi (sếp 12:35Z: phòng chiều mưa xuân u ám như lãnh cung → ẤM, SÁNG DỊU):
   ánh tán xạ ấm nhẹ — bớt tương phản chút, sáng hơn chút, KHÔNG ngả xám/lam, KHÔNG sepia/nâu; lớp .light (z 0, DƯỚI người) phủ ánh ngà ấm rất nhẹ,
   người giữ nguyên màu (không phủ lên hình). Vệt mưa do lớp hạt j11 vẽ. Lãnh cung giữ nguyên vẻ hoang lạnh của tranh. */
(function(){const css=document.createElement("style");css.textContent=`
.stage.kown .scimg{filter:none!important}
.stage.kown.rp2 .scimg{filter:saturate(1.04)!important}.stage.kown.rp3 .scimg{filter:saturate(1.07) brightness(1.02)!important}
.stage.kown.kwet:not(.sc-lc) .scimg{filter:saturate(.97) contrast(.94) brightness(1.07)!important}
.stage.kown.kwet.night:not(.sc-lc) .scimg{filter:saturate(.95) contrast(.95) brightness(1.01)!important}
.stage.kown.kwet:not(.sc-lc)>.light{background:linear-gradient(rgba(255,238,210,.13),rgba(255,226,188,.08))!important}
.stage.kown.kwet.night:not(.sc-lc)>.light{background:linear-gradient(rgba(255,214,160,.04),rgba(255,200,140,.06))!important}`;document.head.appendChild(css);
 function tag(){try{const st=$("stage");if(!st||!S)return;let own=false;try{own=/-(sang|trua|chieu|toi)$/.test(SCIMG[placeOf(S.place).sc]||"")}catch(e){}
  st.classList.toggle("kown",own);st.classList.toggle("kwet",own&&typeof wet==="function"&&!!wet())}catch(e){}}
 window.kitSceneTag=tag;
 if(typeof renderStage==="function"){const r2=renderStage;renderStage=function(){const r=r2.apply(this,arguments);tag();return r}}
 if(typeof lightTick==="function"){const l0=lightTick;lightTick=function(){const r=l0.apply(this,arguments);tag();return r}}})();
/* ---- TUẦN LỤC: WIDE FIGURES (owner 13:45Z Thái hậu cut by the column; 03:55Z ONE figure scale: full body ≈85–90 % of picture
   height, NEVER shrink to fit) — KIT §56.3 ----
   The person page (.kbk-person.kbk-full) gives the figure a fixed column --porf sized for a normal standing figure. A wider figure
   (Thái hậu, t7/t8 trains, wide sleeves) keeps its kit height and is never scaled:
   · wide pages: the figure column widens only as far as the face + torso need (figure centre + 14 % of its height, ≤ 74 % of the
     page), so the text keeps its room;
   · whatever is still wider (train / outer sleeve) runs BEHIND the text, which then sits on the kit's soft paper panel
     (.kbk-figover = the same panel phones use); the figure's left edge is moved inside the page so nothing is cut on the left;
   · phones (.kbk.narrow): same — figure moved inside the page, never scaled; the text already sits on the paper panel. */
(function(){let q=0;const AR=window.__figAR=window.__figAR||{};const R=window.__kbkRatio=window.__kbkRatio||{h:.86,w:.9};
 const st=document.createElement("style");st.textContent=`.kbk-person.kbk-figover>.kbk-phead,.kbk-person.kbk-figover>.kbk-flow{position:relative;z-index:1;background:color-mix(in srgb,var(--paper,#f3e3c0) 86%,transparent);border-radius:6px;padding:.2em .4em}.kbk-person.kbk-figover>.kbk-por{overflow:visible;z-index:0}`;document.head.appendChild(st);
 /* column width for j87 personBody (called while paginating, so the text is measured in the final column): figure aspect from a
    cache filled on first sight (a book already open re-lays out once the picture is known); page-body ratios measured on live pages */
 window.kitBookFigCol=function(fig,PW,PH){try{const m=/src="([^"]+)"/.exec(fig||"");if(!m||!PW||!PH||PW<440)return "";const src=m[1];
   if(!AR[src]){if(AR[src]!==0){AR[src]=0;const I=new Image();I.onload=()=>{AR[src]=I.naturalWidth/Math.max(1,I.naturalHeight);if(document.querySelector(".kbk"))dispatchEvent(new Event("resize"))};I.src=src}return ""}
   const kfr=+((/--kfr:([\d.]+)/.exec(fig)||[])[1]||1),H=PH*R.h*kfr,w0=AR[src]*H,base=Math.min(PW*.45,PH*.8*.42);if(w0<=base+1)return "";
   const col=Math.min(w0/2+.14*H+4,PW*R.w*.74);return col>base+1?`;grid-template-columns:${Math.round(col)}px minmax(0,1fr)`:""}catch(e){return ""}};
 function clamp(){q=0;try{document.querySelectorAll(".kbk-person.kbk-full .kesfi").forEach(f=>{const box=f.closest(".kbk-person");if(!box)return;
   const por=box.querySelector(":scope>.kbk-por"),pg=box.closest(".kbk-pg");if(!por)return;
   f.style.transform="";const w0=f.offsetWidth,bw=box.getBoundingClientRect().width;if(!w0||!bw){box.classList.remove("kbk-figover");return}
   if(pg&&pg.offsetHeight&&pg.offsetWidth){R.h=+(por.getBoundingClientRect().height/pg.offsetHeight/(+getComputedStyle(box).getPropertyValue("--kfr")||1)*(+getComputedStyle(box).getPropertyValue("--kfr")||1)).toFixed(3);R.w=+(bw/pg.offsetWidth).toFixed(3)}
   const im=f.querySelector("img");if(im&&im.naturalWidth)AR[im.getAttribute("src")]=im.naturalWidth/im.naturalHeight;
   const b=box.getBoundingClientRect(),pr=por.getBoundingClientRect();
   if(box.closest(".kbk.narrow")){   /* phones: unchanged from r7 (OPEN: a figure wider than the whole page is still scaled to the page — owner decision pending) */
    const s=w0>b.width?b.width/w0:1,w=w0*s,l=pr.left+(pr.width-w)/2;let dx=0;if(l<b.left)dx=b.left-l;else if(l+w>b.right)dx=b.right-(l+w);
    const t=(s<1||Math.abs(dx)>0.5)?`translateX(${dx.toFixed(1)}px) scale(${s.toFixed(4)})`:"";f.style.transformOrigin="50% 100%";if(f.style.transform!==t)f.style.transform=t;return}
   const l=pr.left+(pr.width-w0)/2;let dx=0;if(l<b.left)dx=b.left-l;
   box.classList.toggle("kbk-figover",w0>pr.width+1);
   const t=Math.abs(dx)>0.5?`translateX(${dx.toFixed(1)}px)`:"";if(f.style.transform!==t)f.style.transform=t})}catch(e){}}
 function soon(){if(!q){q=requestAnimationFrame(clamp);setTimeout(clamp,450);setTimeout(clamp,1300)}}
 window.kitBookFigClamp=clamp;
 try{new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches(".kbk-person,.kesfi,.kbk")||n.querySelector&&n.querySelector(".kbk-person.kbk-full")))))soon()}).observe(document.body,{childList:true,subtree:true})}catch(e){}
 addEventListener("resize",soon);document.addEventListener("load",e=>{if(e.target&&e.target.classList&&e.target.classList.contains("kesimg"))soon()},true)})();
