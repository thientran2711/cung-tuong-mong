/* ================= jnwb — NO TEXT IN MINI-GAME PLAY, group b (owner OD 20/11 ~05:10Z: "không có một cái mini game nào mà có chữ hết trơn") =================
   The ONE small icon set + helpers that the play areas of the group-b kinds use instead of words (rules screen «Luật chơi» / «Hướng dẫn» text is untouched):
   td_cong td_dung td_ngon td_hanh chai le tc xa thq hoadien duho kinh may doi tho. Numbers / score / clock chips stay.
   Icons are plain inline SVG (stroke = currentColor) until the painted ones exist: see dev/kit/KIT_REQUESTS.md «mg-noword-b». Pips = CSS dots (no glyph).
   Used: NWB.btn(id, icon, {alt, cls, label}) -> an icon-only button (label = aria-label / tooltip only, never a visible text node);
         NWB.ic(name) -> svg string; NWB.pips(n, on) -> row of dots; NWB.POP = symbol pops (✓ ✗ ★) for canvas feedback. */
const NWB={
 P:{
  hint:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  voice:'<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  cross:'<path d="M6 6l12 12M18 6L6 18"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 21h8"/><path d="M9 6c-1-1.2 1-2 0-3.2M13 6c-1-1.2 1-2 0-3.2"/>',
  adult:'<circle cx="12" cy="8" r="3.6"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7z"/>',
  elder:'<circle cx="12" cy="9" r="3.4"/><circle cx="12" cy="4.2" r="1.4"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7z"/><path d="M20 13v8"/>',
  child:'<circle cx="12" cy="12.5" r="3"/><path d="M7 21c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5z"/>',
  sick:'<circle cx="11" cy="9" r="3.4"/><path d="M4 21c0-4 3-7 7-7s7 3 7 7z"/><path d="M19 4.5c1.4 1.8 1.4 3 0 3.6-1.4-.6-1.4-1.8 0-3.6z"/>',
  rotl:'<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/>',rotr:'<path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 4v5h-5"/>',
  left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',
  up:'<path d="M5 15l7-7 7 7"/>',down:'<path d="M5 9l7 7 7-7"/>'},
 ic(k,cls){return `<svg class="nwb-i${cls?" "+cls:""}" viewBox="0 0 24 24" aria-hidden="true">${NWB.P[k]||""}</svg>`},
 /* the hint / done buttons are the SAME signs as group a (j91 k91Btns): «?» and «✓» on .kgbtn, the word only in the tooltip (mg-noword-a); other signs are the svg icons */
 btn(id,k,o){o=o||{};const lab=o.label||"",inner=k==="hint"?"?":k==="check"?"✓":NWB.ic(k);return `<button type="button" class="${o.cls||"kgbtn"} nwb-btn" id="${id}" aria-label="${lab}" title="${lab}">${inner}</button>`},
 pips(n,on,cls){let s="";for(let i=0;i<n;i++)s+=`<i class="nwb-pip${i<on?" on":""}"></i>`;return `<span class="nwb-pips${cls?" "+cls:""}" aria-hidden="true">${s}</span>`},
 /* care games (thu_tam / thu_choi / tuoi): the progress line is dots, not words. n dots, on filled; band [lo,hi] = the right zone drawn as green-ringed dots (a sign, never text) */
 cnt(n,on,_h,band){let s="";for(let i=0;i<n;i++){const b=band&&i+1>=band[0]&&i+1<=band[1];s+=`<i class="nwb-pip${i<on?" on":""}${b?" band":""}"></i>`}return `<div class="nwb-pool nwb-cnt"><span class="nwb-pips" aria-hidden="true">${s}</span></div>`},
 who(name){return/già|lão|góa|cao|ma ma/i.test(name)?"elder":/nhỏ|tiểu|mới|còn nhỏ/i.test(name)?"child":/ốm|yếu|đói/i.test(name)?"sick":"adult"},
 POP:{ok:"✓",bad:"✗",s3:"★★★",s2:"★★",s1:"★"}};
(function(){const st=document.createElement("style");st.id="nwb-css";st.textContent=`
/* the frame's «Cách chơi» sentence is the RULES: it goes while the game runs (kg-run is put on #kg82 by kg82Play), every kind */
#kg82.kg-run .kghow,#kg82.kg-ready .kghow{display:none}/* the rules block (.kgr) holds the same sentence: no duplicate */
.nwb-i{width:1.5em;height:1.5em;vertical-align:middle;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.nwb-btn{display:inline-flex;align-items:center;justify-content:center;min-width:56px;min-height:48px}.nwb-btn .nwb-i{width:1.8em;height:1.8em}
.nwb-pips{display:inline-flex;gap:5px;align-items:center;vertical-align:middle}.nwb-pip{width:13px;height:13px;border-radius:50%;border:2px solid var(--k-hair,#b59a6a);box-sizing:border-box;background:transparent}
.nwb-pip.band{border-color:#2f8f4e;border-width:3px}.nwb-cnt{display:flex;justify-content:center;padding:6px 0}
.nwb-pip.on{background:var(--gold,#d99a1e);border-color:var(--gold,#d99a1e)}
.nwb-cap{font:700 .75rem/1.25 var(--body,sans-serif);color:var(--ink,#3a1a0c);text-align:center;overflow-wrap:anywhere}/* huong-cue-2: the one-line guiding caption beside pips (needs / left) */
.nwb-row{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:6px 0}.nwb-row .nwb-mid{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}
.nwb-row .nwb-who .nwb-i{width:2.2em;height:2.2em}
.nwb-pool{display:flex;gap:4px;justify-content:center;align-items:center;margin:4px 0;flex-wrap:wrap}.nwb-pool .nwb-i{width:1.6em;height:1.6em}
`;document.head.appendChild(st)})();
