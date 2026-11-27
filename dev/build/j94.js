/* ---- j94: CẢNH NỀN THEO MÙA × BUỔI (dữ liệu + một hàm chọn ảnh; không CSS, không sửa file cũ) ----
   img/<tên>-<mùa>-<buổi>.webp, mùa = xuan/ha/thu/dong (SEASON[S.month-1]), buổi = sang/trua/chieu/toi.
   Thang buổi: BUOI có 4 phần tử → S.buoi 0..3 = sáng/trưa/chiều/tối; 3 phần tử (cũ) → 0..2 = sáng/chiều/tối.
   Thiếu bản đúng buổi → bản cùng mùa ở buổi gần nhất (ngày lùi về ngày, tối chỉ lấy tối) → ảnh gốc <tên>.webp.
   Áp vào renderStage (j6), pxScene (j11), evArt (j17) bằng cách bọc hàm: trước mỗi lần gọi, SCIMG[k] được đặt
   thành tên bản mùa/buổi; KIT_FLOOR (kit-2b) được nhân bản cho tên mới để đường sàn vẫn đúng. */
const SCN_SEAS={"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"};
/* SCN_VAR: bản có thật trong img/ — cảnh: "mùa-buổi …" (viết lại bằng dev/art/gen_scene_seasons.py) */
const SCN_VAR={"duong-tam-dien":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","khon-ninh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","kinh-su-phong":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","lanh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","ngu-hoa-vien":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","ngu-thu-phong":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","phi-tan-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","tam-cung-dem":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","thai-y-vien":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","tu-ninh-cung":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","tan-gia-kho":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi","phong-cung-nu":"xuan-sang xuan-trua xuan-chieu xuan-toi ha-sang ha-trua ha-chieu ha-toi thu-sang thu-trua thu-chieu thu-toi dong-sang dong-trua dong-chieu dong-toi"};/*@SCN_VAR*/
const SCN_HAVE={};for(const s in SCN_VAR)for(const v of SCN_VAR[s].split(" "))if(v)SCN_HAVE[s+"-"+v]=1;
const SCN_NEAR={sang:["sang","trua","chieu"],trua:["trua","sang","chieu"],chieu:["chieu","trua","sang"],toi:["toi"]};
function sceneImg(base){try{if(!base||!S)return base;const se=SCN_SEAS[SEASON[(S.month||1)-1]];if(!se)return base;
 const four=typeof BUOI!=="undefined"&&BUOI.length>=4,b=S.buoi||0,bu=(four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[b]||"sang";
 for(const x of SCN_NEAR[bu]){const n=base+"-"+se+"-"+x;if(SCN_HAVE[n])return n}return SCN_FALL[base]?sceneImg(SCN_FALL[base]):base}catch(e){return base}}
/* SCN_FALL: a place whose own picture is not live yet shows the stand-in's picture (base -> stand-in base, its own seasons/floor); scnLive(pic) probes the file
   once and registers it in SCN_HAVE the moment it exists, so the real picture takes over with no code change (review/places-wire-nvp-tn) */
const SCN_FALL={};
function scnLive(pic,n){try{/* offline-fast: only probe a picture the offline set lists; manifest not read yet → ask again in 2 s (max ~1 min) */const hv=typeof kitAssetHas==="function"?kitAssetHas("img/"+pic+".webp"):true;if(hv===false)return;if(hv===null){if((n||0)<30)setTimeout(()=>scnLive(pic,(n||0)+1),2000);return}const im=new Image();im.onload=()=>{try{SCN_HAVE[pic]=1;if(typeof scnSync==="function")scnSync();if(typeof PX==="object")PX.key=""}catch(e){}};im.src="img/"+pic+".webp"}catch(e){}}
/* review/place-art (coordinator 15/11): own paintings for the two places that borrowed another place's picture.
   Tân Giả khố (j42 placeOf sc "tgk", was the lãnh cung painting "lc") = tan-gia-kho-<mùa>-<buổi>; the maid's room (j42 placeOf "home"
   while isSrv(), sc "maid", was her consort room tam-cung-dem) = phong-cung-nu-<mùa>-<buổi>. Floor line + open-floor anchor read from
   the paintings (jk2b merges window.KIT_FLOOR / KIT_FANCHOR set before it). */
if(typeof SCIMG==="object"){SCIMG.tgk="tan-gia-kho";SCIMG.maid="phong-cung-nu"}
window.KIT_FLOOR=Object.assign(window.KIT_FLOOR||{},{"tan-gia-kho":.55,"phong-cung-nu":.6});
window.KIT_FANCHOR=Object.assign(window.KIT_FANCHOR||{},{"tan-gia-kho":{x:.5,feet:.9},"phong-cung-nu":{x:.5,feet:.9}});
(function(){if(typeof SCIMG!=="object")return;const BASE=Object.assign({},SCIMG),SET={};
 function sync(){try{for(const k in SCIMG){if(SET[k]!==SCIMG[k])BASE[k]=SCIMG[k]}/* chỗ khác đổi SCIMG sau này: nhận làm gốc mới */
  for(const k in BASE){const n=sceneImg(BASE[k]);SCIMG[k]=n;SET[k]=n;
   const F=window.KIT_FLOOR;if(F&&n!==BASE[k]&&F[n]==null&&F[BASE[k]]!=null)F[n]=F[BASE[k]]}}catch(e){}}
 window.scnSync=sync;
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){sync();return r0.apply(this,arguments)}}
 if(typeof evArt==="function"){const e0=evArt;evArt=function(){sync();return e0.apply(this,arguments)}}
 if(typeof pxScene==="function"){const p0=pxScene;let last="";pxScene=function(){sync();try{const P=placeOf(S.place),n=SCIMG[P.sc]||"";if(n!==last){last=n;if(typeof PX==="object")PX.key=""}}catch(e){}return p0.apply(this,arguments)}}
 sync()})();
/* ---- Dư đồ (bản đồ) theo MÙA × BUỔI: img/map-<mùa>-<buổi>.webp có đủ 4 mùa × 4 buổi (trưa thêm 14/11, review/place-seasons).
   j26 mapImg dùng BUK=["sang","chieu","toi"] theo S.buoi; khi game có 4 buổi (BUOI.length>=4) chèn "trua" vào BUK để chỉ số khớp
   (một lần, không chèn trùng nếu chỗ khác đã chèn). Ngày hội không có tranh trưa → lấy tranh hội buổi sáng/chiều thay vì mất cảnh hội. */
window.B4_TRUA_IMG=1;
(function(){if(typeof mapImg!=="function"||typeof BUK==="undefined")return;
 function fix(){try{if(typeof BUOI!=="undefined"&&BUOI.length>=4){if(BUK.length===3&&BUK.indexOf("trua")<0)BUK.splice(1,0,"trua");else if(BUK.length===4&&BUK[1]==="sang")BUK[1]="trua"}}catch(e){}}/* jtime4z (balance-unified) chèn "sang" tạm khi chưa có tranh trưa: đã có → đổi thành "trua" */
 const m0=mapImg;mapImg=function(){fix();try{if(BUK[S.buoi||0]==="trua"&&typeof festToday==="function"){const f=festToday();
   if(f&&f.files&&!f.files.trua){const x=f.files.sang||f.files.chieu;if(x)return x}}}catch(e){}return m0.apply(this,arguments)};
 if(typeof mapHTML==="function"){const h0=mapHTML;mapHTML=function(){fix();return h0.apply(this,arguments)}}
 fix()})();
