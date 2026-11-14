/* ---- j94: CẢNH NỀN THEO MÙA × BUỔI (dữ liệu + một hàm chọn ảnh; không CSS, không sửa file cũ) ----
   img/<tên>-<mùa>-<buổi>.webp, mùa = xuan/ha/thu/dong (SEASON[S.month-1]), buổi = sang/trua/chieu/toi.
   Thang buổi: BUOI có 4 phần tử → S.buoi 0..3 = sáng/trưa/chiều/tối; 3 phần tử (cũ) → 0..2 = sáng/chiều/tối.
   Thiếu bản đúng buổi → bản cùng mùa ở buổi gần nhất (ngày lùi về ngày, tối chỉ lấy tối) → ảnh gốc <tên>.webp.
   Áp vào renderStage (j6), pxScene (j11), evArt (j17) bằng cách bọc hàm: trước mỗi lần gọi, SCIMG[k] được đặt
   thành tên bản mùa/buổi; KIT_FLOOR (kit-2b) được nhân bản cho tên mới để đường sàn vẫn đúng. */
const SCN_SEAS={"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"};
/* SCN_VAR: bản có thật trong img/ — cảnh: "mùa-buổi …" (viết lại bằng dev/art/gen_scene_seasons.py) */
const SCN_VAR={"duong-tam-dien":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","khon-ninh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","kinh-su-phong":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","lanh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","ngu-hoa-vien":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","ngu-thu-phong":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","phi-tan-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","tam-cung-dem":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","thai-y-vien":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","tu-ninh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi"};/*@SCN_VAR*/
const SCN_HAVE={};for(const s in SCN_VAR)for(const v of SCN_VAR[s].split(" "))if(v)SCN_HAVE[s+"-"+v]=1;
const SCN_NEAR={sang:["sang","trua","chieu"],trua:["trua","sang","chieu"],chieu:["chieu","trua","sang"],toi:["toi"]};
function sceneImg(base){try{if(!base||!S)return base;const se=SCN_SEAS[SEASON[(S.month||1)-1]];if(!se)return base;
 const four=typeof BUOI!=="undefined"&&BUOI.length>=4,b=S.buoi||0,bu=(four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[b]||"sang";
 for(const x of SCN_NEAR[bu]){const n=base+"-"+se+"-"+x;if(SCN_HAVE[n])return n}return base}catch(e){return base}}
(function(){if(typeof SCIMG!=="object")return;const BASE=Object.assign({},SCIMG),SET={};
 function sync(){try{for(const k in SCIMG){if(SET[k]!==SCIMG[k])BASE[k]=SCIMG[k]}/* chỗ khác đổi SCIMG sau này: nhận làm gốc mới */
  for(const k in BASE){const n=sceneImg(BASE[k]);SCIMG[k]=n;SET[k]=n;
   const F=window.KIT_FLOOR;if(F&&n!==BASE[k]&&F[n]==null&&F[BASE[k]]!=null)F[n]=F[BASE[k]]}}catch(e){}}
 window.scnSync=sync;
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){sync();return r0.apply(this,arguments)}}
 if(typeof evArt==="function"){const e0=evArt;evArt=function(){sync();return e0.apply(this,arguments)}}
 if(typeof pxScene==="function"){const p0=pxScene;let last="";pxScene=function(){sync();try{const P=placeOf(S.place),n=SCIMG[P.sc]||"";if(n!==last){last=n;if(typeof PX==="object")PX.key=""}}catch(e){}return p0.apply(this,arguments)}}
 sync()})();
