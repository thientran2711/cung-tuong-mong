/* ---- jplw: two NEW place pictures wired into the existing scene path (j94 season x buổi sets); code hook-up only, no art here.
   nvp               Nội vụ phủ (place "nvp", jact.js; was the Kính sự phòng picture "ksp") -> img/nvp-ha-sang.webp
   tu-ninh-cung-ngu  Thái hậu's bedroom at Từ Ninh (place "tn" at the night buổi B4L, when she sleeps: j95planTH c=3 "sleep", the
                     "Hầu Thái hậu một đêm" errand j72) -> img/tu-ninh-cung-ngu-ha-sang.webp. By day "tn" stays the reception hall.
   Same variant rule as every place (j94 SCN_HAVE + SCN_NEAR): only hạ-sáng exists, the other 15 variants fall back.
   FALLBACK: until the file is live (Foreman C swaps it in) the scene key resolves to the CURRENT picture (nvp -> kinh-su-phong,
   tu-ninh-cung-ngu -> tu-ninh-cung, each with its own season set): no broken image, no blank frame. A silent one-time image probe flips
   the new variant on by itself the moment the file exists (SCN_HAVE), so the swap needs no code change. Frame/floor/figures = the
   fallback place's (KIT_FLOOR / KIT_FANCHOR copies), same kit stage as every place scene. */
const PLW={nvp:{fb:"kinh-su-phong",pic:"nvp-ha-sang"},"tu-ninh-cung-ngu":{fb:"tu-ninh-cung",pic:"tu-ninh-cung-ngu-ha-sang"}};
(function(){
 if(typeof SCIMG!=="object"||typeof sceneImg!=="function")return;
 SCIMG.nvp="nvp";SCIMG.tnn="tu-ninh-cung-ngu";/* scene keys: the base name; j94 sync turns it into the season/buổi (or fallback) picture */
 const F=window.KIT_FLOOR=window.KIT_FLOOR||{};
 for(const k in PLW){if(F[k]==null&&F[PLW[k].fb]!=null)F[k]=F[PLW[k].fb]}/* sync copies it to the variant names */
 const s0=sceneImg;
 sceneImg=function(b){const r=s0.apply(this,arguments);const x=PLW[b];return x&&r===b?s0(x.fb):r};/* no live variant for this season/buổi -> the current picture */
 const p0=placeOf;
 placeOf=function(k){const P=p0.apply(this,arguments);try{
  if(k==="tn"&&P&&P.sc==="tn"&&S&&(S.buoi||0)===B4L)return Object.assign({},P,{sc:"tnn"});/* night at Đức Thọ/Từ Ninh = her bedroom */
 }catch(e){}return P};
 /* probe the live files once; present -> register the variant, resync, repaint on the next render */
 for(const k in PLW){const n=PLW[k].pic;try{const im=new Image();im.onload=()=>{try{SCN_HAVE[n]=1;if(typeof scnSync==="function")scnSync();if(typeof PX==="object")PX.key=""}catch(e){}};im.src="img/"+n+".webp"}catch(e){}}
 if(typeof scnSync==="function")scnSync();
})();
