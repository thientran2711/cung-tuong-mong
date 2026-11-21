/* ================= jroad8: ONE 8-TAB BAR ON EVERY ROAD (owner 21/11 ~03:15Z, mark #32; MAIN CHÍNH 85 brief maid-8tabs) =================
   Owner (verbatim, OD 21/11 ~03:15Z): "Mình vẫn giữ đủ 8 cái tab, nhưng mà mỗi một cái tab mình để y chang luôn … tôi nghĩ là mình không có nên thay đổi
   những cái tab này … trước mắt là cứ làm cái layout là 8 cái tab. Còn mà đổi cái gì vào trong cái tab gì cho nó đúng thì tôi sẽ báo bạn sau."
   Every road — consort, cung nữ (isSrv, j42), tiểu thư ngoài cung (isKc, jkc/jkc2) — shows the SAME 8 bottom tabs (Hành sự · Dư đồ · Hậu cung · Giao tình ·
   Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện) with the same groups and sub-tabs (j79 KG, kit sub-tab row .ksub). No locks.
   ROAD8 = the ONE mapping table (change only this when she rules the final mapping): per road, consort tab key → what her road shows there:
     (key not listed)      the consort panel as it is (it works on her road: Chí tôn, Phi tần, Ân oán, Hoàng tự, Tư trang, Tài nghệ, Sổ ghi …)
     {k:"<her key>"}       her road's own panel, rendered with tab = that key (the road modules keep their own panels)
     {l:"label" | ()=>…}   the sub-tab label on her road
     {empty:[topic,line]}  the kit empty card (kitEmpty, KIT §21): a tab with nothing yet, never a lock
     {hide:1}              not a sub-tab on her road (the bottom tab itself always opens) */
const ROAD8={
 /* cung nữ: Phận sự → Hành sự (act), Dư đồ → Dư đồ (go), Đồng liêu → Hậu cung › Đồng liêu (staff: the shared person pager, j42 srvStaffTabHTML),
    Thân phận → Mệnh truyện › Thân phận (story), Sổ ghi → Mệnh truyện › Sổ ghi (log); Phi tần → «Chủ tử» (owner 21/11 ~03:25Z mark #36); every other tab = the consort panel */
 srv:{rv:{l:"Chủ tử"},staff:{l:"Đồng liêu"},story:{l:"Thân phận"}},
 /* tiểu thư ngoài cung (KCTABS names follow her variant, jkc2 KC2W): Khuê phòng → Hành sự, Thư từ → Hậu cung › first sub-tab, Gia tộc → Hậu cung › second,
    Giao du → Giao tình, Hoàng tự = empty card; Dư đồ / Tư trang / Tài nghệ / Mệnh truyện = hers */
 kc:{court:{k:"kid",l:()=>KCTABS.kid},rv:{l:()=>KCTABS.rv},men:{hide:1},staff:{hide:1},rel:{k:"staff",l:()=>KCTABS.staff},fac:{hide:1},
  kid:{empty:["Hoàng tự","Ngươi chưa vào cung, chưa có con."]},kvo:{hide:1},kin:{hide:1},hon:{hide:1},qt:{hide:1},
  q72:{hide:1},nho:{hide:1},quest:{hide:1},req:{hide:1},log:{hide:1}}};
/* ROAD8_LAB = the ONE label table of the stage right column groups (owner 21/11 ~03:25Z mark #36: "bất kỳ một cái gì thông tin nào ở bên phi tần có thì bên
   cung nữ đều có, nhưng mà mình có thể linh động đổi tên lại … cung nhân ở bên phi tần thì mình có thể đổi lại là đồng liêu ở bên cung nữ … chủ tử").
   Same boxes, same kit parts on every road; only these words change. cn = the household box (kit square button + fold + phone rail), ct = the court box. */
const ROAD8_LAB={"":{cn:"Cung nhân",ct:"Chí tôn"},srv:{cn:"Đồng liêu"},kc:{}};
function road8Lab(k){const r=road8();const L=ROAD8_LAB[r]||{};return L[k]||ROAD8_LAB[""][k]||""}
window.ROAD8_LAB=ROAD8_LAB;window.road8Lab=road8Lab;
function road8(){try{if(!S||S.dead)return"";if(typeof isKc==="function"&&isKc())return"kc";if(typeof isSrv==="function"&&isSrv())return"srv"}catch(e){}return""}
function road8E(k){const r=road8();return r&&ROAD8[r]&&ROAD8[r][k]||null}
function road8Hide(k){const e=road8E(k);return !!(e&&e.hide)}
function road8Label(k){const e=road8E(k);if(!e||!e.l)return"";try{return typeof e.l==="function"?e.l()||"":e.l}catch(x){return""}}
/* where a key lives on her road, for help / goal lines: "Hậu cung › Đồng liêu"; "" on the consort road (the callers keep their own words) */
function road8Name(k){try{if(!road8()||road8Hide(k))return"";const g=typeof kgOf==="function"?kgOf(k):null;
  if(g&&KG[g]){const L=kgKeys(g);if(L.length<2)return KG[g].l;return `${KG[g].l} › ${kgLabel(k)}`}
  const b=document.querySelector(`#tabs [data-tab="${k}"]`);return b?(b.dataset.l0||b.textContent).trim():""}catch(e){return""}}
window.ROAD8=ROAD8;window.road8=road8;window.road8Hide=road8Hide;window.road8Label=road8Label;window.road8Name=road8Name;
/* a key with no bar button, or one her road leaves out, opens Hành sự (old saves / old links of the old servant and home bars) */
(function(){const r0=render;render=function(){try{if(road8()){const b=document.querySelector(`#tabs [data-tab="${tab}"]`);if(!b||road8Hide(tab))tab="act"}}catch(e){}return r0.apply(this,arguments)}})();
(function(){const p0=renderPanel0;renderPanel0=function(){const e=road8E(tab);const el=$("panel");if(!e||e.hide){if(el)el.__r8=null;return p0.apply(this,arguments)}
 if(e.empty){const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");const h=kitEmpty(e.empty[0],e.empty[1]);
  if(el.dataset.tab!==tab||el.__r8!==h){el.innerHTML=h;el.__r8=h;el.dataset.tab=tab;el.dataset.pg="";try{kitFix(el)}catch(x){}}return}
 el.__r8=null;
 /* her own panel: the road module draws it under its own key; the bar, groups and sub-tabs keep the consort key */
 if(e.k&&e.k!==tab){const t0=tab;tab=e.k;try{return p0.apply(this,arguments)}finally{tab=t0}}
 return p0.apply(this,arguments)}})();
