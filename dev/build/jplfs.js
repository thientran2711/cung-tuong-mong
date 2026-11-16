/* ---- jplfs: KIT 33.10 PLACE VIEW — the last Dư đồ level, FULL SCREEN (owner 16/11 18:22Z SWIPE STAGE + 19:15Z HÀNH SỰ STAGE) ----
   Owner: "Dư đồ is full screen; every screen opened from it is full screen" … "Only two places show people on a backdrop: her own room
   and the last Dư đồ level" … "HÀNH SỰ STAGE = HER ROOM only" (OD 18:22Z / 19:15Z).
   RULE (one switch, no new parts): while she stands anywhere that is NOT her own residence (S.place !== "home"; consort road, alive,
   not lãnh cung, not the maid road), the game uses the ONE-PAGE shell (jk3 k3Phone, KIT §0 kv1) on EVERY screen size:
   - the stage page = the place painting over the WHOLE game area (no split with the Hành sự panel, no right plaque column, no left
     plaques): people at the kit figure scale (KIT_FIG, 33), fixed equal columns (33.7b kitSlotCxE), swipe + "+N" chips both sides (33.9);
   - the Hành sự tab = the act cards page (full area, no stage beside it), so the split Hành sự stage only ever shows her room;
   - tap a person = that person's pop-up page (k3pop), closing returns to the painting;
   - "‹ Dư đồ" / "‹ <cung>" (j38 #tomap + jpm courtyard return) stays on the painting.
   Her own residence (every hall of it) keeps the normal layout (iPad: stage | panel, 2 per view, KIT 33.7b). */
function kplAway(){try{if(!S||S.dead||S.out)return false;if(typeof isSrv==="function"&&isSrv())return false;const k=S.place;return !!k&&k!=="home"}catch(e){return false}}
window.kplAway=kplAway;
(function(){
 /* the one-page shell (jk3 k3Phone) and the hidden plaque columns (jk3 k3Stage) read kplAway() in jk3 itself (kit shell) */
 /* the way back to the map is always on the painting (not only right after a map tap) */
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){try{if(kplAway()&&typeof tab!=="undefined"&&tab!=="go")window.__fromMap=1}catch(e){}return r0.apply(this,arguments)}}
 /* arriving somewhere by any road (map, person card, follow, event) opens the painting page; coming home restores the spread */
 if(typeof goTo==="function"){const g0=goTo;goTo=function(k){const p0=S&&S.place;const r=g0.apply(this,arguments);
   try{if(S&&!S.dead&&S.place!==p0&&typeof k3Shell==="function"){if(kplAway()&&typeof k3ShowPlace==="function")k3ShowPlace();else k3Shell();setTimeout(()=>{try{window.j59lay&&j59lay()}catch(e){}},60)}}catch(e){}return r}}
})();
/* kit CSS (component-owned): the painting fills the page; the right column, left plaques and the split are off */
(function(){const css=document.createElement("style");css.id="kplfs-css";css.textContent=`
html body .stage.kplfs>#kshR,html body .stage.kplfs #kshL{display:none!important}
/* the way back (KIT §75 painted back button) sits in the free top-right corner: the bottom-left corner is her name chip's */
html body .stage.kplfs>#tomap.kbackb{left:auto!important;right:8px!important;top:8px!important;bottom:auto!important}
html body .game#game.kplfs.k3ph.k3home:not(.maptab)>#stage{border-radius:var(--r,10px)}
`;document.head.appendChild(css)})();
/* kit sample page: the rule text (the view itself needs a live place) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§33.10",title:"Nơi chốn toàn màn hình · tầng cuối Dư đồ",
 html:()=>`<p style="max-width:52em">Ở mọi nơi không phải phòng mình: tranh nơi chốn chiếm trọn trang (không cột bảng phải), người đứng theo tỉ lệ chuẩn, cột cố định, vuốt sang trái/phải, chip "+N" hai bên; chạm người → thẻ người ấy; "Hành sự" = trang thẻ việc riêng. Phòng mình giữ sân khấu Hành sự (iPad: sân khấu | thẻ).</p>`})}catch(e){}
