/* ===================================================================================================================
   jk95 — what the person card shows from j95 (who is where). Data from j95 (habitsKnown, j95habitsMine), look from the kit only
   (kpsec / kpst section, kitRows grid KIT §51, kitChip, kpnote): no CSS of its own (LUẬT KIT TRƯỚC). Guarded by typeof: the game runs
   with or without j95. Port 16/11 (review/schedules3) of wip/kit-j95 c13abcd; reviewer FAIL points of that branch:
   1. person card "Thói quen" in the card's facts column; stale reports carry the chip "tin cũ · N tuần trước" (no "có thể");
   2. her own card "Nơi ngươi hay đến" inside the facts column too, never under the card; the watchers as a red kit chip (warning, no ✗),
      shown only once her tai mắt have reported them.
   Not ported (KIT REQUEST, the data API is ready): the map's two-shadows mark (j95mapSigns) and the "N người theo hầu" line on the stage name
   tag (j95followers) need new kit parts; the crowd chip is obsolete (the map now counts only the people she would meet, like the stage).
   =================================================================================================================== */
/* the card's facts column (kit 28.7): right column facts, else the right column, else the left one */
function kitFactsCol(pc){return pc.querySelector(":scope > .pcr > .kpfacts")||pc.querySelector(":scope > .pcr")||pc.querySelector(".kpfacts")||pc.querySelector(".pcl")}
/* 1 */
function kitHabitsHTML(p){try{if(typeof habitsKnown!=="function"||!p||p===S)return"";const L=habitsKnown(p)||[];if(!L.length)return"";
 return `<div class="kpsec khab"><h4 class="kpst">Thói quen</h4>`+kitRows(L.map(h=>[h.buoi||"",[h.placeName||h.place,
   `<span class="ef n">${/^Tai mắt/.test(h.by||"")?"Tai mắt kể":/^Nghe/.test(h.txt||"")?"Nghe nói":"Chính ngươi thấy"}${h.seen>1?` · ${h.seen} lần`:""}</span>`+
   (h.old?" "+kitChip(h.week!=null&&typeof wk==="function"?`tin cũ · ${Math.max(1,wk()-h.week)} tuần trước`:"tin cũ","n"):"")],"t"]))+`</div>`}catch(e){return""}}
/* 3 */
function kitHabitsMineHTML(){try{if(typeof j95habitsMine!=="function")return"";const L=(j95habitsMine()||[]).filter(x=>x.told!==false);if(!L.length)return"";
 return `<div class="kpsec khab khabme"><h4 class="kpst">Nơi ngươi hay đến</h4>`+kitRows(L.map(x=>[x.buoi||"",[x.placeName||x.place,x.watchers?kitChip(`${x.watchers} kẻ đang rình chỗ này`,"r"):`<span class="ef n">chưa thấy ai rình</span>`],"t"]))+
  `<div class="kpnote">Đi đâu quen một giờ thì kẻ thù dễ đón đường: đổi nơi, đổi buổi để tránh.</div></div>`}catch(e){return""}}
(function(){if(typeof kitPcFix!=="function")return;const k0=kitPcFix;kitPcFix=function(pc){const r=k0.apply(this,arguments);try{if(!pc||pc.querySelector(".khab"))return r;const nm=(pc.querySelector(".pcname")||{}).textContent;
  const p=typeof kitPersonByName==="function"?(kitPersonByName(nm)||kitPersonByName(String(nm||"").replace(/^\s*Hoàng hậu\s+/,""))):null;/* r1: the Hoàng hậu's card name reads "Hoàng hậu <name>" */if(!p)return r;const h=p===S?kitHabitsMineHTML():kitHabitsHTML(p);if(!h)return r;/* in the facts block; with no facts block, in the right column just before the act-group tabs (28.7 order: facts → tabs → act cards) */
  const f=kitFactsCol(pc);if(!f)return r;const tb=f.classList.contains("pcr")?f.querySelector(":scope > .pctabs, :scope > .pcb"):null;if(tb)tb.insertAdjacentHTML("beforebegin",h);else f.insertAdjacentHTML("beforeend",h)}catch(e){}return r}})();
