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
/* KIT 33.11 · the way back to the map = ONE button in the LEFT column (the stage rail, jrail kitStageRail, same spot on the room stage, the
   place painting and every Dư đồ level): it replaces the old "‹ Dư đồ" pill at the stage's bottom-left (j38 #tomap, over her name chip) and
   the courtyard's "‹ Dư đồ" button on the picture (jpm .kpm-back, over the "Tây phối điện" label, pl-courtyards-r2 review) — whole group */
function kplBack(){try{if(typeof tab!=="undefined"&&tab==="go"&&window.__kpm)return{t:"Về Dư đồ",go:()=>{window.__kpm=null;render()}};
 const b=document.getElementById("tomap");if(b&&typeof tab!=="undefined"&&tab!=="go"){const lab=(b.getAttribute("aria-label")||"Về Dư đồ").replace(/^Về bản đồ hoàng cung$/,"Về Dư đồ").replace(/^Về bản đồ /,"Về ");return{t:lab,go:()=>b.click()}}}catch(e){}return null}
try{if(window.kitStageRail)kitStageRail.add({id:"back",order:1,icon:"img/kit/ico-map.webp",title:"Về Dư đồ",when:()=>!!kplBack(),onTap:()=>{const x=kplBack();if(x)x.go()}});
 /* the rail item's label follows the level (Về Dư đồ / Về <cung>) */
 const t0=renderStage;renderStage=function(){const r=t0.apply(this,arguments);try{const x=kplBack(),e=document.querySelector('#krail [data-rail="back"]');if(x&&e&&e.title!==x.t){e.title=x.t;e.setAttribute("aria-label",x.t)}}catch(e){}return r}}catch(e){}
/* kit CSS (component-owned): the painting fills the page; the side columns sit on it exactly as in her room (33.11) */
(function(){const css=document.createElement("style");css.id="kplfs-css";css.textContent=`
html body #tomap{display:none!important}
html body .mapv .kpm-back{display:none!important}
html body .game#game.kplfs.k3ph.k3home:not(.maptab)>#stage{border-radius:var(--r,10px)}
/* 33.11 Dư đồ levels: the right column + left rail stand inside the leather like on the room stage; the map and the hall rows use the space between */
html body .mapv.kside>#kshR{top:34px;right:34px;z-index:9}html body .mapv.kside>#krail{z-index:9}
html body .mapv.kside>#krail{left:34px!important;top:34px!important}
html body .mapv.kside>:not(#kshR):not(#krail):not(.kl-tone){margin-left:56px!important;margin-right:calc(var(--kgrw,150px) + 8px)!important}
`;document.head.appendChild(css)})();
/* kit sample page: the rule text (the view itself needs a live place) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§33.10",title:"Nơi chốn toàn màn hình · tầng cuối Dư đồ",
 html:()=>`<p style="max-width:52em">Ở mọi nơi không phải phòng mình: tranh nơi chốn chiếm trọn trang, cột trái (lối tắt + nút về Dư đồ) và cột phải y như phòng ngủ, người đứng theo tỉ lệ chuẩn, cột cố định, vuốt sang trái/phải, chip "+N" hai bên; chạm người → thẻ người ấy; "Hành sự" = trang thẻ việc riêng. Phòng mình giữ sân khấu Hành sự (iPad: sân khấu | thẻ).</p>`})}catch(e){}
