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
const KIT_LIGHT=(function(){
 const wash=(deg,s)=>s>0?`hue-rotate(${deg}deg) sepia(${s}) hue-rotate(${-deg}deg)`:"";
 const T={
  sang:{w:0,b:1,s:1,c:1,rim:""},
  trua:{hue:-14,w:.07,b:1.03,s:1.03,c:1,rim:""},
  chieu:{hue:-16,w:.18,b:.99,s:.96,c:.99,rim:"drop-shadow(-3px -1px 2px rgba(255,208,128,.7))"},
  toi:{hue:180,w:.2,b:.7,s:.9,c:1.03,rim:"drop-shadow(3px 0 2.5px rgba(255,172,90,.6))"}};
 /* mùa: hạ ấm hơn chút, đông lạnh hơn chút (cộng vào độ phủ) */
 const SE={xuan:0,ha:.02,thu:.01,dong:-.02};
 function css(bu,se){const t=T[bu]||T.sang;if(bu==="sang"||!T[bu])return "brightness(1)";
  let w=t.w+(bu==="toi"?-(SE[se]||0):(SE[se]||0));w=Math.max(0,Math.round(w*100)/100);
  return [wash(t.hue,w),`brightness(${t.b}) saturate(${t.s}) contrast(${t.c})`,t.rim].filter(Boolean).join(" ")}
 function key(){try{const four=typeof BUOI!=="undefined"&&BUOI.length>=4,b=S.buoi||0;
   const bu=(four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[b]||"sang";
   const se=(typeof SCN_SEAS==="object"&&SCN_SEAS[SEASON[(S.month||1)-1]])||"xuan";return {bu,se}}catch(e){return {bu:"sang",se:"xuan"}}}
 let last="";
 function sync(){try{if(typeof S!=="object"||!S)return;const k=key(),id=k.bu+"-"+k.se;if(id===last)return;last=id;
   const r=document.documentElement;r.style.setProperty("--klf",css(k.bu,k.se));r.dataset.klight=k.bu}catch(e){}}
 return {T,css,key,sync}})();
window.KIT_LIGHT=KIT_LIGHT;
(function(){const st=document.createElement("style");st.textContent=`:root{--klf:brightness(1)}`;document.head.appendChild(st);
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){KIT_LIGHT.sync();return r0.apply(this,arguments)}}
 if(typeof render==="function"){const r1=render;render=function(){KIT_LIGHT.sync();return r1.apply(this,arguments)}}
 if(typeof kitEventStage==="function"){const k0=kitEventStage;kitEventStage=window.kitEventStage=function(){KIT_LIGHT.sync();return k0.apply(this,arguments)}}
 KIT_LIGHT.sync()})();
