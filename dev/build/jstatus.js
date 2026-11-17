/* ================= jstatus: kitStatusIcon — ONE status icon (KIT §77.1, owner 16/11 16:25Z, review/status-icons) =================
   Owner: "nhiều game bây giờ nó làm rất là đơn giản. Nó chỉ là một cái icon biểu tượng download nằm ở một cái góc nhỏ … có animation sao đó để cho người chơi
   biết là có cái gì đó đang download về. Người nào muốn biết thông tin thì bấm vô cái nút đó thì nó sẽ hiện những cái thông tin … Cái nào bỏ vô trong cái icon
   được thì mình cứ việc bỏ thôi."  → a status that has no business on screen as a chip/strip is a SQUARE kit icon (the stage rail button, §77) with
   a tiny activity animation while it is running; tap → a kit info panel (kitPanel kind "info", ✕ top-right / tap outside / Esc, NO "Đã hiểu").
   API:  kitStatusIcon.set(id, {title, icon, glyph, busy:()=>bool, done:()=>bool, badge:()=>bool, show:()=>bool, panel:()=>kitPanelSpec | onTap:fn (own card), order})
         kitStatusIcon.refresh()  (call after the state changed) · kitStatusIcon.remove(id) · kitStatusIcon.items()
   - It lives in the stage rail (left column, under the scene title, never over a face); while no game is on screen (title) the same square button sits
     in a fixed bottom-left dock (rail `onTitle`). Nothing else floats; no strip, no chip, no reserved band under the tab bar.
   - busy = glyph bobs up and down (transform + opacity only, BAL.pace slow, off under reduced motion / Hiệu ứng Gọn: `reducedMotion()`); done = still, green;
     badge = the kit seal-red dot (something needs her: paused / error).
   - the icon is PAINTED (K-ICO-3): `icon:"img/kit/ico-download.webp"` (dl) / `"img/kit/ico-update.webp"` (upd); `glyph` (text) stays only as a fallback for a status without a painted icon.
   Old saves: no state, nothing stored (the pause flag stays in localStorage as before). */
(function(){try{
const M=new Map();
/* painted icon (o.icon = path or ()=>path, KIT §77.1: img/kit/ico-download.webp · ico-update.webp); a text glyph only when no icon is given */
function railItem(id,o){return{id:"st-"+id,order:o.order||40,title:o.title,glyph:o.icon?undefined:()=>{try{return(typeof o.glyph==="function"?o.glyph():o.glyph)||"•"}catch(e){return"•"}},icon:o.icon,
 busy:o.busy,done:o.done,badge:o.badge,onTitle:true,when:()=>{try{return o.show?!!o.show():true}catch(e){return false}},onTap:()=>open(id)}}
function set(id,o){if(!id||!o)return;M.set(id,o);if(window.kitStageRail)kitStageRail.add(railItem(id,o))}
function refresh(){if(window.kitStageRail)kitStageRail.paint()}
function remove(id){M.delete(id);if(window.kitStageRail)kitStageRail.remove("st-"+id)}
function open(id){const o=M.get(id);if(o&&typeof o.onTap==="function"){o.onTap();return}if(!o||typeof o.panel!=="function")return;let sp=null;try{sp=o.panel()}catch(e){console.error("kitStatusIcon panel",e)}if(!sp)return;
 sp=Object.assign({kind:"info"},sp);sp.opts=(sp.opts||[]).concat([{n:"Đóng",fx:{},go:()=>{}}]);/* "Đóng" = the close option → kit ✕ + tap outside + Esc (32.10); never "Đã hiểu" */
 try{kitPanel(sp,true);showModal()}catch(e){console.error("kitStatusIcon open",e)}}
window.kitStatusIcon={set,refresh,remove,open,items:()=>[...M.keys()]};
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77.1",title:"kitStatusIcon · icon trạng thái (đang chạy · xong · cần chú ý), chạm → bảng thông tin",
 html:()=>`<div class="kitpg-row" style="position:relative;height:70px"><nav class="krail" style="position:static;flex-direction:row">${[["Đang thỉnh tranh (nhấp nhô)"," kbusy","ico-download"],["Đã thỉnh đủ (viền xanh)"," kdone","ico-download"],["Tạm ngưng (có chấm đỏ)"," kbadge","ico-download"],["Có bản mới (chấm đỏ)"," kbadge","ico-update"]].map(([t,c,g])=>`<button type="button" class="krailb${c}" title="${t}"><img src="img/kit/${g}.webp" alt=""></button>`).join("")}</nav></div>`})}catch(e){}
}catch(e){console.error("jstatus",e)}})();
