/* ================= UPDATE NOTES (D10) — "Thông tin cập nhật" =================
   ONE maintained list: CTM_NOTES below (newest FIRST). The coordinator adds ONE entry per release (or a line to today's entry):
     {id:"2026-11-16", n:["Câu ngắn, cổ trang, không dấu %.", ...]}          // id = ISO date (+ letter b, c… for a second release the same day)
   Nothing else to touch: the date line, the pop-up, the Settings list all derive from this list.
   - Pop-up: once per release (the newest id is remembered in localStorage["ctm-notes-seen"]), shown ONLY in play when nothing else is up
     (no dialog, mini game, loading, title, co-op room); never delays boot, a save load or a co-op sync (it is just a queued kit panel).
     A brand-new player (no sổ yet) gets no pop-up; the id is only recorded. If several releases were missed, they are shown together (≤ 3).
   - Settings: a row "Thông tin cập nhật" (kit .kctl row + .kbtn.alt) in Thiết lập; it opens the title's own sub-screen "notes" (j74 go('notes'), ‹ Lui back to Thiết lập) with the recent releases (≤ 8).
   Only kit parts: kitModal kind "notice" (news/info/rule add a picture column) (sections + facts), kctl row, kbtn. No private CSS. */
const CTM_NOTES=[
 {id:"2026-11-16b",n:[
  "Mỗi đời chọn được mức Dễ, Vừa hay Khó; có thêm những lối riêng để rời cung, xuất gia hay sống ẩn dật.",
  "Tứ đức có trò chơi nhỏ riêng và làm ra đồ thủ công; chạm vào chương mục tiêu để xem chi tiết.",
  "Thắng thua trò chơi nhỏ có tiếng báo; nhiều thẻ có tranh mới; sưu tầm đủ món được danh hiệu.",
  "Chữ trên thẻ hành động rõ hơn; mỗi tháng có kỳ nguyệt sự, xem được sổ nguyệt sự ở Kính sự phòng."]},
 {id:"2026-11-16",n:[
  "Thiết lập có mục «Thông tin cập nhật»: xem lại những điều mới của từng lần cập nhật.",
  "Sổ chơi một mình và phòng chơi cùng hảo hữu ghi riêng, không đè lên nhau.",
  "Chơi cùng hảo hữu: có đồng hồ chung; máy ngủ dậy vẫn vào lại được phòng.",
  "Thẻ lựa chọn: tranh đặt bên trái, chữ bên phải; nút chạm vào có lún xuống."]},
 {id:"2026-11-15",n:[
  "Có bản mới khi đang chơi: không bị ngắt giữa chừng, chỉ hiện dấu «Có bản mới» trên thanh trên; sang buổi sau bản mới tự mở, vào lại đúng sổ."]}
];
(function(){try{
const KEY="ctm-notes-seen",MON=["giêng","hai","ba","tư","năm","sáu","bảy","tám","chín","mười","mười một","chạp"];
const $n=id=>document.getElementById(id);
const ls={get(){try{return localStorage.getItem(KEY)}catch(e){return null}},set(v){try{localStorage.setItem(KEY,v)}catch(e){}}};
function when(id){const m=/^(\d{4})-(\d\d)-(\d\d)/.exec(id||"");return m?`Ngày ${+m[3]} tháng ${MON[+m[2]-1]||m[2]}`:String(id||"")}
const sec=e=>({h:when(e.id),facts:e.n.map(t=>({text:t,kind:"world"}))});
function show(list,title,sub,btn){kitModal({kind:"notice",title,sub,sections:list.map(sec),btn})}
function hasSave(){try{return [1,2,3].some(n=>loadSlot(n))}catch(e){return false}}
function vis(e){return !!e&&!e.hidden&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=="hidden"}
function calm(){try{const s=typeof S!=="undefined"?S:null;if(!s||s.dead||s.mg)return false;const t=$n("title");if(!t||!t.hidden||$n("kload"))return false;
 if(typeof Q!=="undefined"&&Q&&Q.length)return false;
 const c=window.COOP;if(c&&c.state&&(c.state.status!=="off"||c.state.playing))return false;if(window.COOPW&&COOPW.on)return false;
 if(vis($n("ov")))return false;
 for(const m of document.querySelectorAll(".modal,.kmov,#kpodov,.kbk,.kcl-host"))if(m.id!=="kload"&&vis(m))return false;if($n("kupd"))return false}catch(e){return false}return true}
function unseen(){const seen=ls.get();const i=CTM_NOTES.findIndex(e=>e.id===seen);return i<0?CTM_NOTES.slice(0,1):CTM_NOTES.slice(0,Math.min(i,3))}
let ok=0;
function tick(){try{if(!CTM_NOTES.length){clearInterval(T);return}
 const top=CTM_NOTES[0].id,seen=ls.get();
 if(seen===top){clearInterval(T);return}
 if(seen==null&&!hasSave()){ls.set(top);clearInterval(T);return}   /* first visit ever: nothing "new" to tell */
 if(!calm()){ok=0;return}if(++ok<2)return;
 const u=unseen();ls.set(top);clearInterval(T);if(u.length)show(u,"Điều mới trong cung","Xem lại ở Thiết lập, mục «Thông tin cập nhật».","Đã hiểu")}catch(e){}}
const T=setInterval(tick,1500);
/* body() = the Thông tin cập nhật sub-screen of the title / Thiết lập (j74 page "notes"): kit sections, same markup kitPanel builds */
const body=()=>CTM_NOTES.slice(0,8).map(e=>`<div class="kpsec"><h4 class="kpst">${when(e.id)}</h4>${kitFacts(e.n.map(t=>({text:t,kind:"world"})),{group:false})}</div>`).join("");
window.CTM_NOTES_UI={list:CTM_NOTES,seen:ls.get,body,tick,calm,reset(){try{localStorage.removeItem(KEY)}catch(e){}}};
/* Settings: one more kit row at the end of the Thiết lập grid (label + .kbtn.alt, same row part as the switches) */
const o0=optHTML;
optHTML=function(){let h=o0.apply(this,arguments);const row=`<div class="kctl"><span class="kctl-l">Thông tin cập nhật<small>những điều mới từng lần</small></span><span class="kctl-c"><button type="button" class="kbtn alt" data-tgo="notes">Xem</button></span></div>`;
 return h.replace(/<\/div>\s*$/,row+"</div>")};
}catch(e){console.error(e)}})();
