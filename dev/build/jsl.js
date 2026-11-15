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
