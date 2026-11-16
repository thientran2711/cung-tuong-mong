/* j64: status panel chances in plain words (owner 11/14): the odds ladder (Liều, Khó…) is for acts only; a standing chance reads as a level */
function chanceLvl(n){return n<=0?"Không có":n<8?"Rất thấp":n<18?"Thấp":n<35?"Vừa":n<60?"Cao":"Rất cao"}
(function(){if(typeof HX==="object"){HX.con="Mỗi lần được thị tẩm, khả năng có thai cao hay thấp. Tăng nhờ Sủng, Sắc, cầu tự, thuốc bổ; giảm theo tuổi.";HX.dem="Mỗi tuần, khả năng Hoàng thượng lật thẻ bài của ngươi. Tăng nhờ Sủng, Sắc; bằng 0 khi đang mang thai, bị cấm túc, bị chặn thẻ hay ở lãnh cung."}
 const r0=renderHud2;renderHud2=function(){r0.apply(this,arguments);const el=$("hud2");if(!el||!S)return;
  const set=(k,lab,v)=>{const b=el.querySelector(`.hc[data-hx="${k}"]`);if(!b)return;const i=b.querySelector("i");b.innerHTML=`${lab} <b>${v}</b>`+(i?i.outerHTML:"")};
  try{set("con","Có thai:",chanceLvl(conceiveCh()))}catch(e){}try{set("dem","Lật thẻ:",chanceLvl(nightCh()))}catch(e){}}})();
