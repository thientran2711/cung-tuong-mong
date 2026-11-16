
/* ================= jk4: KIT 4 (kit owner #3, owner 11/14) — ONE STAT CELL + ONE STAT ROW (KIT 32) =================
   Owner: "the shared kit — why do workers draw their own?" Every place a number stat (Sắc · Tài · Tâm cơ · Đức · Bạc · Sức · Sủng · Danh …)
   is shown as a cell uses kitStatCell; every row of them is a kitStatRow. A cell = TWO lines with fixed line boxes:
     label line (icon + name)  — height --kst-l, one font size
     number line (the value)   — height --kst-n, one font size (display face, tabular numbers)
     bar slot (optional 0–100 bar, kept as an empty slot when there is none, so every cell has the same height)
   Because every cell has the same line boxes and every group starts at the same top, ALL label lines share one baseline and ALL number
   lines share one baseline, across groups (measured by dev/test/kit_dupes.js + the kit sweep).
   The top bar's two groups (owner 15/11 ~17:50Z: LEFT Sắc · Tài · Tâm cơ · Đức · Danh · Sủng | RIGHT Bạc · Sức) are static markup in p1.html written in this exact form (so early renders
   find #hud-bac …); the time block (#k3tt, jk3) uses the same two lines: buổi + khắc dots on the label line, weather + Quẻ on the number line. */
function kitStatEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function kitStatIcon(icon){if(!icon)return"";if(/[\/.]/.test(icon))return `<img class="ic" src="${icon}" width="14" height="14" alt="" onerror="this.remove()">`;return typeof ic==="function"?ic(icon,14):""}
/* kitStatCell(icon,label,value,{id,k,bar,title,warn,cls,vcls,tag,nobar}) → HTML.
   Sizes (cls): default = top-bar cell (two fixed lines + bar slot) · "kst-tile" = info tile (status sheet / identity card / person stats grid)
   · "kst-chip" = one-line chip (person-card info grid). Same parts in every size: .kstl label line, .kstv value.
   bar: 0–100 shows the thin bar; null keeps the empty slot (row cells) — nobar drops it (tiles, chips). */
function kitStatCell(icon,label,value,o){o=o||{};const bar=o.bar==null?"":Math.max(0,Math.min(100,+o.bar||0));const tg=o.tag==="span"?"span":"div";
 const b=o.nobar?"":`<i class="mini kstb${bar===""?" kstb0":""}"><u${bar===""?"":` style="width:${bar}%"`}></u></i>`;
 return `<${tg} class="kst${o.cls?" "+o.cls:""}"${o.id?` id="${o.id}"`:""}${o.k?` data-k="${o.k}"`:""}${o.title?` title="${kitStatEsc(o.title)}"`:""}><small class="kstl">${kitStatIcon(icon)}${label}</small><span class="kstv${o.vcls?" "+o.vcls:""}">${value==null?"":value}</span>${o.warn?`<i class="kstw" aria-label="${kitStatEsc(o.warn)}">!</i>`:""}${b}</${tg}>`}
/* kitStatSet(cell,value,{bar,title,warn}): update a live cell in place (no re-render, no flicker) */
function kitStatSet(c,v,o){if(!c)return;o=o||{};const s=c.querySelector(".kstv");const t=v==null?"":String(v);if(s&&s.textContent!==t){const was=s.textContent;s.textContent=t;try{if(was!==""&&typeof kitStatDelta==="function"&&!c.id.startsWith("hud-"))kitStatDelta(c,was,t)}catch(e){}}
 if(o.bar!=null){const u=c.querySelector(".kstb u");if(u)u.style.width=Math.max(0,Math.min(100,+o.bar||0))+"%"}
 if(o.title!=null&&c.title!==o.title)c.title=o.title;
 let w=c.querySelector(".kstw");if(o.warn&&!w){w=document.createElement("i");w.className="kstw";c.insertBefore(w,c.querySelector(".kstb"));w.textContent="!"}
 if(w){if(o.warn)w.setAttribute("aria-label",o.warn);else w.remove()}}
/* kitStatRow([{id,cls,title,cells:[html…]}…],{id,cls}) → HTML: groups side by side, divided by a hairline. Each group carries --kn = its cell
   count, so where the row is stretched (two-row bar, phones) every CELL gets the same width whatever the group sizes (6 | 2 on the top bar). */
function kitStatRow(groups,o){o=o||{};return `<div class="kstrow${o.cls?" "+o.cls:""}"${o.id?` id="${o.id}"`:""}>${groups.map(g=>`<div class="kstg${g.cls?" "+g.cls:""}"${g.id?` id="${g.id}"`:""} style="--kn:${g.cells.length}"${g.title?` title="${kitStatEsc(g.title)}"`:""}>${g.cells.join("")}</div>`).join("")}</div>`}
window.kitStatCell=kitStatCell;window.kitStatSet=kitStatSet;window.kitStatRow=kitStatRow;
(function(){const st=document.createElement("style");st.id="kit-stat";st.textContent=`
:root{--kst-l:15px;--kst-n:21px;--kst-b:4px}
.kstrow{display:flex;align-items:flex-start;gap:0 12px;min-width:0}
.kstg{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(46px,auto);column-gap:10px;align-items:start;min-width:0}
.kstg+.kstg{border-left:1px solid var(--k-hair,#e6d3ac);padding-left:12px}
.kstg[role=button]{cursor:pointer}
.kst:not(.kst-tile):not(.kst-chip){position:relative;display:grid;grid-template-rows:var(--kst-l) var(--kst-n) var(--kst-b);justify-items:center;min-width:0;padding:0}
.kst:not(.kst-tile):not(.kst-chip)>.kstl,.k3tt>.kstl{display:flex;align-items:center;justify-content:center;gap:3px;height:var(--kst-l);line-height:var(--kst-l);font-size:.7rem;color:var(--dim);white-space:nowrap}
.kst>.kstl img.ic{width:14px;height:14px;vertical-align:0}
.kst:not(.kst-tile):not(.kst-chip)>.kstv{display:block;height:var(--kst-n);line-height:var(--kst-n);font-family:var(--display);font-size:1.02rem;font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--ink)}
.kst>.kstb{display:block;align-self:center;width:100%;height:3px;margin:0}
.kst>.kstb0{visibility:hidden}
.kst-tile>.kstv:not(.kunk){font-weight:700}.kst-tile>.kstl img.ic,.kst-chip>.kstl img.ic{width:13px;height:13px;vertical-align:-2px}
/* one-row bar (cells sized to content): a cell wearing the "!" keeps the badge inside its own box (owner 15/11: Danh now follows Đức) */
@media (min-width:1000px){header.hud:not(.khd2) #kstrow .kst:has(>.kstw){padding-right:12px}}
.kst>.kstw{position:absolute;left:calc(50% + 1.1em);top:calc(var(--kst-l) + (var(--kst-n) - 13px)/2);font-style:normal;font-weight:800;font-size:.62rem;line-height:13px;color:#fff;background:var(--gold);border-radius:50%;width:13px;height:13px;text-align:center}
/* the time block: same two line boxes as a stat cell */
.k3tc .k3tt{display:grid!important;grid-template-rows:var(--kst-l) var(--kst-n) var(--kst-b);gap:0!important;min-width:0}
/* each line is a block whose own font is the stat cell's font for that line: the line's strut puts the baseline exactly where the cells
   have theirs; the smaller words on it sit on that baseline */
.k3tt>.kstl,.k3tt>.kstv{display:block;white-space:nowrap;text-align:left}
.k3tt>.kstl{height:var(--kst-l);line-height:var(--kst-l);font-size:.7rem}
.k3tt>.kstv{height:var(--kst-n);line-height:var(--kst-n);font-family:var(--display);font-size:1.02rem}
.k3tt>*>*{vertical-align:baseline;margin-right:10px}.k3tt>*>*:last-child{margin-right:0}
.k3tc .k3tt .k3r{display:inline-flex;align-items:baseline;min-height:0!important;line-height:1;font-family:var(--body,inherit);font-size:.74rem}
.k3tc .k3tt .kstl .k3r{display:inline-block;vertical-align:top;font-size:.7rem;line-height:var(--kst-l);height:var(--kst-l)}
.k3tt .k3r>.k3l+b{margin-left:.3em}.k3tc .k3tt .kstl .k3r>*{vertical-align:baseline}.k3tc .k3tt .kstl .k3dots{display:inline-flex;vertical-align:-1px;margin-left:5px}
.k3tc .k3tt .k3wx{min-height:0!important}
.k3tc .k3tt .k3wx img{width:18px!important;height:18px!important;border-radius:50%;align-self:center}
.k3tc .k3dots{display:inline-flex;gap:3px;align-self:center}.k3tc .k3dots i{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--gold);background:transparent}.k3tc .k3dots i.on{background:var(--gold)}
.k3tt>.kstv:empty{visibility:hidden}
/* the top bar grid (all devices). iPad ≥ 1000 px: one row — menu · me · time · Tư chất | Bạc Sức Sủng Danh */
html body header.hud>#kstrow{grid-area:stats;justify-self:end;align-self:center;margin:0}
html body header.hud>#k3tc{grid-area:tc;display:block;align-self:center;justify-self:center;border:0;padding:0;min-width:0}
html body header.hud{grid-template-columns:auto auto minmax(0,1fr) auto!important;grid-template-areas:"menu me tc stats"!important}
html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto auto auto minmax(0,1fr) auto!important;grid-template-areas:"menu me room tc stats"!important}
html body .game#game.k3ph header.hud>#k3room:not([hidden]){grid-area:room}
/* Fold / tablets portrait 600–999 px: row 1 menu · me · time, row 2 all eight cells, both groups share the label and number lines */
@media (max-width:999px){
 html body header.hud{grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"menu me tc" "stats stats stats"!important;row-gap:2px!important}
 html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto minmax(0,1fr) auto auto!important;grid-template-areas:"menu me room tc" "stats stats stats stats"!important}
 html body header.hud>#kstrow{justify-self:stretch;border-top:1px solid var(--k-hair,#e6d3ac);padding-top:3px}
 html body header.hud>#k3tc{justify-self:end}
 #kstrow>.kstg{flex:var(--kn,1) 1 0;grid-auto-columns:minmax(0,1fr);column-gap:4px}
}
/* KIT 32.12 TOP BAR GRID (header-fix, owner 11/15 Fold shot: name on 2 lines, chips under "‹ Ngự hoa viên", date on 3 lines).
   Her block never wraps and never shrinks (name 1 line · rank + age chips 1 line · date 1 line); the time block is the column that gives.
   ≥ 600 px only (phones < 600 keep their own rows below). */
/* KIT §0: the one page uses the spread's top bar (same rows, same cells) */
@media all{
 html body header.hud>.me,html body header.hud>.me .mi{min-width:max-content!important;flex-shrink:0!important}
 html body header.hud>.me .mi>b,html body header.hud>.me .k3rr,html body header.hud>.me .rk,html body header.hud #me-d{white-space:nowrap!important}
 html body header.hud{grid-template-columns:auto max-content minmax(0,1fr) auto!important}
 /* her portrait is as tall as her name block (owner 15/11 10:30Z): the frame box stretches to the block's height, width by the frame's ratio */
 html body header.hud>.me>#me-p{flex:none;line-height:0}
 html body header.hud[style*="--kmeh"]>.me>#me-p>span.md.kfc.kfc{width:calc(var(--kmeh) * 550 / 795)!important;height:auto!important}
}
/* two-row bar (600–999 px, and ≥ 1000 px when the one row does not fit: class .khd2 from kitHdFit) —
   row 1: menu · her block · RIGHT COLUMN (time block; "‹ Nơi" button under it, same left/right edges); row 2: the eight stat cells */
@media (max-width:999px){
 html body .game#game header.hud,html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto max-content minmax(0,1fr) minmax(0,max-content)!important;
  grid-template-areas:"menu me . tc" "menu me . room" "stats stats stats stats"!important;grid-template-rows:auto auto auto!important;row-gap:0!important}
 html body header.hud>#k3tc{justify-self:stretch!important;align-self:end!important}
 html body header.hud:not(:has(#k3room:not([hidden])))>#k3tc{align-self:center!important}
 html body .game#game header.hud>#k3room:not([hidden]){grid-area:room!important;justify-self:end!important;align-self:start!important;margin-top:2px;min-height:34px;padding:0 6px}
 html body header.hud>#kstrow{margin-top:3px!important}
 html body header.hud .k3tc .k3tt{grid-template-rows:auto auto!important}
 html body header.hud .k3tt>.kstl,html body header.hud .k3tt>.kstv{white-space:normal!important;height:auto!important;min-height:var(--kst-l)}
}
/* KIT §0 one page: "Về phòng" sits under the menu button (icon; label = tooltip), so the top bar keeps the spread's height */
@media (max-width:999px){
 html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-areas:"menu me . tc" "room me . tc" "stats stats stats stats"!important;grid-template-rows:auto minmax(0,1fr) auto!important}
 html body .game#game.k3ph header.hud>#k3room:not([hidden]){grid-area:room!important;justify-self:center!important;align-self:start!important;padding:0!important;min-height:0!important;margin-top:2px}
 html body .game#game.k3ph header.hud>#k3room.kbackb:has(.kbi) .kbl{display:none}
}
html body .game#game header.hud.khd2{grid-template-columns:auto max-content minmax(0,1fr) minmax(0,max-content)!important;grid-template-areas:"menu me . tc" "menu me . room" "stats stats stats stats"!important;
 grid-template-rows:auto auto auto!important;row-gap:0!important}
html body header.hud.khd2>#k3tc{justify-self:stretch!important;align-self:center!important}
html body header.hud.khd2>#kstrow{justify-self:stretch!important;border-top:1px solid var(--k-hair,#e6d3ac);padding-top:3px;margin-top:3px!important}
html body header.hud.khd2>#kstrow>.kstg{flex:var(--kn,1) 1 0;grid-auto-columns:minmax(0,1fr);column-gap:4px}
html body header.hud.khd2 .k3tc .k3tt{grid-template-rows:auto auto!important}
html body header.hud.khd2 .k3tt>.kstl,html body header.hud.khd2 .k3tt>.kstv{white-space:normal!important;height:auto!important;min-height:var(--kst-l)}
/* phones < 600 px: the same row, label line = icon only (name in the tooltip), number line below */
@media (max-width:0px){/* KIT §0: retired — no phone top bar; the one page (590) uses the two-row bar above (phase 3 deletes this block) */
 html body header.hud{grid-template-columns:auto minmax(0,1fr)!important;grid-template-areas:"menu me" "tc tc" "stats stats"!important}
 html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto minmax(0,1fr)!important;grid-template-areas:"menu me" "room tc" "stats stats"!important;align-items:center}
 html body header.hud>#k3tc{justify-self:stretch}
 .k3tc .k3tt{grid-template-rows:auto!important;grid-auto-flow:column;justify-content:start;gap:0 12px!important}
 /* KIT 31.2a (review/small-bugs-3): the state row never runs past the edge — under 600 px both lines flow as ONE wrapping row of whole
    items (time, toilette, weather, quẻ, every K3_STATE chip): an item is never split, the next one drops to a new line */
 html body header.hud .k3tc .k3tt{display:flex!important;flex-wrap:wrap;align-items:center;column-gap:12px;row-gap:0;min-width:0;max-width:100%}
 html body header.hud .k3tt>.kstl,html body header.hud .k3tt>.kstv{display:contents!important}
 html body header.hud .k3tt .k3r{white-space:nowrap;margin-right:0!important;max-width:100%}
 .k3tt>.kstl,.k3tt>.kstv{height:24px;line-height:24px;font-size:.7rem;font-family:var(--body,inherit)}.k3tc .k3tt .kstl .k3r{height:24px;line-height:24px}
 #kstrow>.kstg+.kstg{padding-left:6px}#kstrow{gap:0 6px}
 #kstrow .kst>.kstl{font-size:0;gap:0}#kstrow .kst>.kstl img.ic{width:16px;height:16px}
}
`;document.head.appendChild(st)})();
/* KIT 32.12 kitHdFit: ≥ 1000 px the bar is one row only when it fits (her block, the whole time block and the eight cells side by side);
   otherwise .khd2 = the two-row bar (same grid as 600–999 px). Measured in the one-row form, in one synchronous pass (no flicker).
   ≥ 600 px it also sets --kmeh = her name block's height: the frame keeps the width it had when its crest+window+band (550/795) was exactly that tall (owner 15/11 10:30Z);
   since tassel-fix (owner 15/11 06:35Z) the jade pendant + tassel hang below it whole (cell 550/1037), so the frame is 1037/795 of the name block. */
function kitHdMe(hd){try{const mi=hd.querySelector(":scope>.me .mi");const h=mi&&matchMedia("all").matches?Math.round(mi.getBoundingClientRect().height):0;
 const v=h>20?h+"px":"";if(hd.style.getPropertyValue("--kmeh")!==v){if(v)hd.style.setProperty("--kmeh",v);else hd.style.removeProperty("--kmeh")}}catch(e){}}
/* review/small-bugs-3 (1000x755: a long date "Tháng chạp · trung tuần · năm thứ hai mươi ba" ran under the weather icon): her block and the time
   block never touch — the right edge of her text + 8 px must stay left of the time block's first text/icon, else the two-row bar */
function kitHdClash(hd,tc){try{const me=hd.querySelector(":scope>.me");if(!me||!tc||!tc.offsetParent)return false;let r=0,l=1e9;
 const leaf=(root,f)=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(!n.nodeValue.trim())continue;const rg=document.createRange();rg.selectNodeContents(n);for(const q of rg.getClientRects())if(q.width)f(q)}
  root.querySelectorAll("img,svg").forEach(e=>{const q=e.getBoundingClientRect();if(q.width)f(q)})};
 leaf(me,q=>{r=Math.max(r,q.right)});leaf(tc,q=>{l=Math.min(l,q.left)});return r>0&&l<1e9&&r+8>l}catch(e){return false}}
/* one-row bar only from this width (1366 iPad Pro); 1000–1279 (iPad 1180, split views) = the two-row bar, always */
const KHD1_MIN=1280;
function kitHdFit(){try{const hd=document.querySelector("header.hud");if(!hd)return;kitHdMe(hd);const wide=matchMedia("(min-width:1000px)").matches;
 if(!wide){hd.classList.remove("khd2");return}const had=hd.classList.contains("khd2");
 /* review/stage-side (owner 16/11 "nó không có giữ cố định một chỗ"): the bar form is FIXED per viewport, never re-decided by content
    (a dialog, a longer clothes / weather line). < KHD1_MIN px wide = always two rows; wider = one row, measured once per viewport size,
    and once it needed two rows it keeps them for that size (one-way latch = hysteresis: it never flips back on shorter text). */
 const vk=innerWidth+"x"+innerHeight;if(window.__khdVk!==vk){window.__khdVk=vk;window.__khd2=innerWidth<KHD1_MIN}
 let bad=!!window.__khd2;
 if(!bad){hd.classList.remove("khd2");
 /* the one-row bar always wears the seal in its right gutter (KIT 39 .kseal-pad: 1000–1179 px cells icon-only) — measure it in that form */
 if(hd.classList.contains("has-kseal"))hd.classList.add("kseal-pad");
 const tc=document.getElementById("k3tc"),tt=document.getElementById("k3tt");
 bad=hd.scrollWidth>hd.clientWidth+1||!!(tc&&tt&&tc.offsetParent&&tt.scrollWidth>tc.clientWidth+1)||kitHdClash(hd,tc);if(bad)window.__khd2=true}
 hd.classList.toggle("khd2",bad);try{window.kitSealHud&&kitSealHud()}catch(e){}if(had!==bad){try{const hb=hd.getBoundingClientRect();document.documentElement.style.setProperty("--k3hb",Math.round(hb.bottom)+"px");window.j59lay&&j59lay()}catch(e){}}}catch(e){}}
window.kitHdFit=kitHdFit;
if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);kitHdFit();return r}}
if(typeof render==="function"){const r1=render;render=function(){const r=r1.apply(this,arguments);kitHdFit();return r}}
addEventListener("resize",()=>{clearTimeout(window.__khdf);window.__khdf=setTimeout(kitHdFit,40)});
try{document.fonts&&document.fonts.ready.then(kitHdFit)}catch(e){}
/* review/small-bugs-3-r1: the bar re-fits when its CONTENT changes after render (a later module writes the date / weather / quẻ, a picture
   loads): 1180x820 "Mộ Dung Tuyết Nhi · Tháng chạp · thượng tuần · năm thứ hai mươi ba" stayed one row under the weather icon */
(function(){let q=0;const kick=()=>{if(!q)q=requestAnimationFrame(()=>{q=0;kitHdFit()})};const go=()=>{const hd=document.querySelector("header.hud");if(!hd)return setTimeout(go,500);
 new MutationObserver(kick).observe(hd,{subtree:true,childList:true,characterData:true});hd.addEventListener("load",kick,true)};
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();
/* a short helper line (".kphelp": "Mới biết tên ⓘ") opens its full text on tap too (touch has no hover tooltip) */
document.addEventListener("click",e=>{const h=e.target.closest&&e.target.closest(".kphelp");if(!h||!h.title||typeof kpPop!=="function")return;e.stopPropagation();try{kpPop(h,`<div class="kpopt">${kitStatEsc(h.title)}</div>`)}catch(x){}},true);

/* ---------- KIT 32.2 kitEventStage (owner 11/14 23:50Z, approved): big events and the week book show the people FULL-BODY, standing big
   beside the text, under a wide scene band (the event / header picture), with the option group below (optLayout rows/grid, KIT 31.16).
   Used automatically by every kit panel whose subject is a person (weekly events with a main actor, Mệnh truyện chapters, night / thị tẩm,
   person-act reports, succession) and by the week book's person pages (kitStageFig). A dialog may name its people: stage:[p1,p2] (max 2).
   Figures: kitFigOf(p) (right tier / age band / unknown silhouette) + the scar / veil overlays laid on the drawn figure (kitFxLayers; the rash, pallor, poison and handprint layers come through the same call). Band: headArt (31.16) or the event picture (kitEvArt), in its category frame. ---------- */
function kitStageFig(p,o){o=o||{};try{if(!p)return"";const q=p.__kp||p;const src=o.src||(typeof kitFigOf==="function"?kitFigOf(q):"");if(!src)return"";
 let fx="";try{if(typeof kitFxLayers==="function"&&!/unknown-fig/.test(src))fx=kitFxLayers(q,kitFile(src));/* the rash layer comes from kitFxLayers (jface registry: jrash) */}catch(e){}
 let nm="";if(o.cap!==false){try{nm=typeof kitName==="function"?kitName(q,{cap:true,named:typeof S!=="undefined"&&q===S}):(q.name||"")/* owner 15/11: rank + name always together — her own figure too (was "Ngươi") */}catch(e){nm=q.name||""}}
 /* KIT 33 KIT_FIG: one scale for both people of an event — the tallest (an adult man) fills the box, women ×1/man, children by age */
 let kfr=1;try{kfr=KIT_FIG.fac(src,typeof q.age==="number"?q.age:20)/KIT_FIG.man}catch(e){}
 const dh=o.plate&&typeof kitTitlePlate==="function"?kitTitlePlate(kitTitleWorn(q)):"";return `<figure class="kesf"><span class="kesfi"><img class="kesimg" style="--kfr:${kfr.toFixed(3)}" data-sil="${typeof kitSilFig==="function"?kitSilFig(q):""}" src="${src}" alt="" crossorigin="anonymous" decoding="sync" onerror="kitStageFigErr(this)">${fx?`<span class="kfxf kesfx">${fx}</span>`:""}</span>${nm?`<figcaption class="kpsn">${dh}${nm}</figcaption>`:""}</figure>`}catch(e){return""}}
/* D50: a figure file that fails to load swaps to the kit silhouette once (never an empty column); only a failing silhouette hides the figure */
function kitStageFigErr(im){try{const sil=im.dataset.sil;if(sil&&(im.getAttribute("src")||"").indexOf("unknown-fig")<0){im.removeAttribute("data-sil");im.src=sil;return}}catch(e){}kitImgErr(im,{sel:".kesf",cls:"kesno"})}
window.kitStageFigErr=kitStageFigErr;
function kitStagePeople(m){if(!m)return[];let L=[];const sp=m.stage||(m.kit&&m.kit.stage);
 if(Array.isArray(sp))L=sp;else{const w=m.who||(m.kit&&m.kit.subject);const p=w&&(w.__kp||(w.alive!==undefined||w.name&&w.rank!==undefined?w:null));if(p)L=[p];const w2=m.who2;if(w2)L.push(w2.__kp||w2)}
 return L.filter(p=>p&&typeof p==="object").slice(0,2)}
/* KIT 50.3 default banner (OD:L448): the picture of a person pop-up whose event has none — the info picture of its title (kitInfoArt: info-*.webp / act-cat-*), else one per kind */
const KIT_KIND_BANNER={info:"giao-thiep",rule:"hoc-tap",notice:"giao-thiep",result:"le-nghi",night:"sung-ai",intel:"muu-ke",end:"le-nghi",news:"giao-thiep",choice:"giao-thiep",reward:"ban-thuong",guide:"hoc-tap"};
function kitDefaultBanner(m,kind){try{const ia=typeof kitInfoArt==="function"?kitInfoArt(m&&m.t||""):null;if(ia&&ia.src)return{src:ia.src,lab:""};
 const have=(typeof KIT_ACTS==="object"&&KIT_ACTS.have)||[];const c=KIT_KIND_BANNER[kind]||"giao-thiep";const k=have.includes("act-cat-"+c)?c:(have.includes("act-cat-giao-thiep")?"giao-thiep":"");return k?{src:`img/act-cat-${k}.webp`,lab:""}:null}catch(e){return null}}
window.kitDefaultBanner=kitDefaultBanner;
function kitEventStage(m){try{const M=$("modal"),mb=$("mb");const dlg=M&&M.querySelector(".dlg.kpanel");const body=mb&&mb.querySelector(":scope > .kpb");
 if(!dlg||!body||body.classList.contains("kpid")||body.querySelector(":scope > .kes"))return false;
 /* owner 16/11 07:35Z (OD:L448): EVERY pop-up with a person — events AND info / rule / person reports — shows the person FULL-BODY on the left; the small 3:4 portrait (.kpsubj) is retired for people (a person pop-up outside #modal: kitPersonDlg, jpdlg.js) */
 const P=kitStagePeople(m);if(!P.length)return false;const figs=P.map(p=>kitStageFig(p,{plate:true})).filter(Boolean);if(!figs.length)return false;
 /* wide band on top: headArt (jk3 .kdlgart) or the event picture moved from the tall left slot */
 if(!mb.querySelector(":scope > .kdlgart")){let a=null;const ev=body.querySelector(":scope > .kpsubj.kpev");
  if(ev){const im=ev.querySelector("img"),fr=ev.querySelector(".ksart");if(im)a={src:im.getAttribute("src"),lab:(fr&&fr.title)||""}}
  if(!a&&typeof kitEvArt==="function")a=kitEvArt(m);
  /* owner 16/11 07:35Z (OD:L448) + reviewer popup-fullbody-r1 #2: EVERY person pop-up has the event picture RIGHT TOP — a kind without its own picture (ĐIỀU / LUẬT / BÁO / KẾT QUẢ / ĐÊM / tai mắt) gets its default banner by kind */
  if(!a||!a.src)a=kitDefaultBanner(m,dlg.dataset.kind||"");
  if(a&&a.src){const d=document.createElement("div");d.className="kdlgart kesband";d.innerHTML=kitSceneArt(a.src,a.lab,Object.assign({shape:"wide",cap:!!a.lab},kitEvCat(m,a),a.mark?{mark:a.mark,markAlt:a.markAlt||""}:{}));mb.prepend(d)}}
 body.querySelectorAll(":scope > .kpsubj").forEach(e=>e.remove());
 const s=document.createElement("div");s.className="kpsubj kes kes"+figs.length;s.innerHTML=figs.join("");body.prepend(s);body.classList.add("kphas","kesb");dlg.classList.add("kesdlg");return true}catch(e){console.error("kitEventStage",e);return false}}
window.kitEventStage=kitEventStage;window.kitStageFig=kitStageFig;
/* KIT 33.6 EVENT STAGE BODY FIT (owner 11/15 "the Quý phi is far shorter than the guard"): the figure box used to cap the CANVAS height
   (and the column width), so a wide-robed or tall-headdressed consort shrank. Now every figure is sized by its BODY: kitFigBody(src)
   reads the alpha bbox (t,b,l,r) and the head top = the first rows of fair skin (forehead) minus a hair allowance, so crowns, hairpins
   and phoenix headdresses above the head are not counted. Body (head-top..feet) = .9 × box height × KIT_FIG ratio (man 1, woman 1/man,
   child by age); feet on one line (the transparent margin under the feet is pulled out); side margins do not take room; if the row is
   too narrow, every figure scales by the SAME factor. Applies to every kitEventStage row (.kes), Fold and iPad alike. */
/* (the kitFigBody measurement lives in jkit.js — one copy; review/men had its own here, dropped at merge 11/15) */
function kitEsFit(row){try{if(!row||!row.isConnected)return;const F=[...row.querySelectorAll(":scope > .kesf")].filter(f=>!f.classList.contains("kesno"));if(!F.length)return;
 const L=F.map(f=>{const im=f.querySelector(".kesimg"),src=im&&im.getAttribute("src");return{f,im,wr:f.querySelector(".kesfi"),src,kfr:parseFloat(im&&im.style.getPropertyValue("--kfr"))||1,b:src?kitFigBody(src,()=>kitEsFit(row)):null}});
 if(L.some(x=>!x.b))return;
 const H=Math.max(200,Math.min(400,innerHeight*.40));const W=Math.max(80,row.clientWidth-4);const gap=4;
 L.forEach(x=>{const bf=Math.max(.3,x.b.b-x.b.ht);x.h=H*.9*x.kfr/bf;x.w=x.h*x.b.ar;x.vis=x.w*Math.max(.15,x.b.r-x.b.l)});
 const tot=L.reduce((a,x)=>a+x.vis,0)+gap*(L.length-1);const sc=Math.min(1,W/tot);
 L.forEach(x=>{const h=x.h*sc,w=x.w*sc;x.f.style.flex="0 0 auto";x.f.style.minWidth="0";x.f.style.maxWidth="none";
  Object.assign(x.wr.style,{width:w+"px",height:h+"px",maxWidth:"none",marginLeft:(-x.b.l*w)+"px",marginRight:(-(1-x.b.r)*w)+"px",marginBottom:(-(1-x.b.b)*h)+"px"});
  Object.assign(x.im.style,{width:w+"px",height:h+"px",maxWidth:"none",maxHeight:"none"});
  const cap=x.f.querySelector(".kpsn");if(cap){cap.style.maxWidth=Math.max(80,x.vis*sc)+"px";cap.style.position="relative";cap.style.zIndex="3"}});
 row.style.gap=gap+"px";row.dataset.kfit="1"}catch(e){console.error("kitEsFit",e)}}
window.kitEsFit=kitEsFit;
(function(){const k0=kitEventStage;kitEventStage=function(){const r=k0.apply(this,arguments);try{document.querySelectorAll("#mb .kpsubj.kes").forEach(kitEsFit)}catch(e){}return r};window.kitEventStage=kitEventStage;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{try{document.querySelectorAll(".kpsubj.kes[data-kfit]").forEach(kitEsFit)}catch(e){}},150)})})();

/* KIT 32.3 event / news pictures framed by EVENT TYPE: the j89 category of the picture → a kit category frame (colour + corner ornament,
   the same frames as act pictures, 31.17). */
const KIT_EVCAT={"trieu-chinh":"trieu-chinh","tham-quan":"trieu-chinh","duoc-mua":"trieu-chinh","lu-lut":"trieu-chinh","han-han":"trieu-chinh","bien-ai":"trieu-chinh","thang-tran":"trieu-chinh","su-than":"trieu-chinh","hoa-than":"trieu-chinh","quoc-tang":"trieu-chinh","dai-xa":"trieu-chinh","hoang-de-vui":"sung-ai","hoang-de-dem":"sung-ai","vi-hanh":"sung-ai","di-san":"sung-ai","tu-tinh":"sung-ai","mat-uoc":"sung-ai","hoang-de-gian":"trung-phat","hinh-phat":"trung-phat","lanh-cung":"trung-phat","hoa-hoan":"trung-phat","le-xuan":"le-nghi","le-ha":"le-nghi","le-thu":"le-nghi","le-dong":"le-nghi","te-le":"le-nghi","yen-tiec":"le-nghi","tan-phong":"le-nghi","tuyen-tu":"le-nghi","thinh-an":"le-nghi","tang-le":"le-nghi","hh-viec":"le-nghi","sinh-no":"cham-con","con-tre":"cham-con","khach-den":"giao-thiep","thu-nha":"giao-thiep","chuyen-la":"giao-thiep","cung-nhan":"hau-ha","cung-nu":"hau-ha","tai-nghe":"hoc-tap","thoi-tiet":"nghi-ngoi","dieu-troi":"nghi-ngoi","dieu-lanh":"nghi-ngoi","benh-tat":"nghi-ngoi","dich-benh":"nghi-ngoi","tranh-sung":"muu-ke","tin-don":"muu-ke","tai-mat":"muu-ke","vu-oan":"muu-ke","hoi-lo":"muu-ke","dau-doc":"hai-nguoi","hai-thai":"hai-nguoi",/* review/ev-art-fit groups */"mat-bao":"muu-ke","am-muu":"muu-ke","bac-tien":"giao-thiep","canh-phong":"hau-ha","hao-huu":"giao-thiep","tham-hoi":"giao-thiep","qua-tang":"giao-thiep","tin-cung":"giao-thiep","nguy-gia":"sung-ai"};
function kitEvCat(m,a){try{const src=String(a&&a.src||"");const mm=/\/ev-([a-z-]+?)(?:-\d+)?\.webp/.exec(src);let k=mm&&KIT_EVCAT[mm[1]];
  if(!k&&typeof evArtCat==="function"){const c=evArtCat(m.evId||m.pid||"");if(c)k=KIT_EVCAT[c]}
  if(!k)k="giao-thiep";const C=typeof KIT_CAT==="object"&&KIT_CAT[k];return {col:C?C[1]:"#8a6a3a",cls:"kcat-"+k}}catch(e){return {}}}
window.kitEvCat=kitEvCat;
/* KIT §8.2 ONE PICTURE · EVENT FRAME (owner 16/11 "Má nó, kit chung đâu", review/kit-sweep): a dialog with NO person (no stage figure, no
   person portrait) shows ONE picture, in the event-frame slot LEFT of its rows (.kpb.kpinfo > .kpsubj.kpiart.kpev), never a wide band on
   top PLUS a second tall picture. The item's own picture (headArt band) wins over the generic fallback (kitEvArt room / kitInfoArt).
   One rule for the whole family: place cards, chapter detail, pet / tsb / fire notices, any headArt dialog without people. */
function kitOnePic(m){try{const mb=document.getElementById("mb");const body=mb&&mb.querySelector(":scope > .kpb");if(!body||body.classList.contains("kpid"))return;
 const band=mb.querySelector(":scope > .kdlgart:not(.kesband)");if(!band)return;const sj=body.querySelector(":scope > .kpsubj");
 if(sj&&!sj.matches(".kpiart,.kpev"))return;/* a person portrait (info about a person) keeps its own approved layout */
 const im=band.querySelector("img");const src=im&&im.getAttribute("src");if(!src)return;const fc=band.querySelector("figcaption");const lab=fc?fc.textContent.trim():"";
 const mk=band.querySelector(".ksart-mark,.kmark");
 if(sj)sj.remove();band.remove();body.classList.remove("kpshort");body.classList.add("kphas","kpinfo");
 body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpiart kpev">${kitSceneArt(src,lab,{shape:"tall",cap:!!lab})}</div>`);
 if(mk){const f=body.querySelector(":scope > .kpsubj .ksart");if(f)f.appendChild(mk)}}catch(e){console.error("kitOnePic",e)}}
window.kitOnePic=kitOnePic;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const m=typeof Q!=="undefined"?Q[0]:null;const r=s0.apply(this,arguments);
 try{if(m&&!kitEventStage(m)){kitOnePic(m);/* no person: the event picture keeps its tall slot, framed by its type */const ev=document.querySelector("#mb > .kpb > .kpsubj.kpev .ksart, #mb > .kdlgart > .ksart");
  if(ev&&!ev.classList.contains("ksart-cat")){const im=ev.querySelector("img");const c=kitEvCat(m,{src:im&&im.getAttribute("src")});if(c.col){ev.classList.add("ksart-cat",c.cls);ev.style.setProperty("--kcc",c.col)}}}}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kit-evstage";st.textContent=`
.kpb.kphas.kesb{grid-template-columns:clamp(130px,40%,260px) minmax(0,1fr);gap:12px;align-items:start}
.kpb.kphas.kesb:has(> .kes2){grid-template-columns:clamp(180px,46%,340px) minmax(0,1fr)}
.kpsubj.kes{display:flex;flex-direction:row;align-items:flex-end;justify-content:center;gap:2px;position:sticky;top:0}
.kesf{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0;flex:1 1 0}
.kesf.kesno{display:none}
.kesfi{position:relative;display:block;max-width:100%}
.kesfi>.kesimg{display:block;width:auto;height:auto;max-width:100%;max-height:calc(clamp(200px,40dvh,400px)*var(--kfr,1));filter:url(#kfa) var(--klf,brightness(1)) drop-shadow(0 6px 8px #3a201033)}
.kesfi>.kesfx{position:absolute;inset:0;pointer-events:none;z-index:2}
.kesf>.kpsn{margin-top:2px;text-align:center}
/* KIT 33.5: the event-stage / book-page name chip is the same two-line chip as the stage: rank / role small on top, name below, rank-tinted */
.kesf .kpsn .kname{display:flex;flex-direction:column;align-items:center;line-height:1.2;color:color-mix(in srgb,var(--rc,#2a1a12) 45%,#2a1a12);font-size:1rem}
.kesf .kpsn .kname .kti{font-size:.74rem;font-weight:600;letter-spacing:.02em;line-height:1.1;color:color-mix(in srgb,var(--rc,#7a5530) 75%,#2a1a12)}
#mb>.kdlgart.kesband>.ksart{height:clamp(84px,18dvh,190px)}
/* week book person page: the full-body figure in the portrait column */
.kbk-por .kesf{align-items:center}.kbk-por .kesfi>.kesimg{width:auto;max-width:100%;height:auto;max-height:calc(min(62dvh,560px)*var(--kfr,1))}
.kbk.narrow .kbk-por .kesfi>.kesimg{max-height:calc(46dvh*var(--kfr,1))}
`;document.head.appendChild(st)})();

/* ---------- Thái hậu chip opens HER person card (owner: not the Giao tình tab), same pcard component as the Emperor's card (showEmp) ---------- */
function kitThCardHTML(){try{const R=(typeof kitCourtRows==="function"?kitCourtRows():[]).find(r=>r.k==="th")||{};const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown("th")!==false;
 const L=[typeof tuoi==="function"&&S.thAge?tuoi(S.thAge):"",R.mood&&!/chưa rõ/.test(R.mood[0])?`Tâm trạng: <b>${R.mood[0]}</b>`:"",known?`Thái hậu → ta: thiện cảm <b>${S.th|0}</b>`:"Thái hậu → ta: thiện cảm: <b>chưa rõ</b>"].filter(Boolean);
 return pcard({f:pTH(),col:"#c9a0e0",name:"Thái hậu",rank:"Thái hậu · Đức Thọ cung",lines:L,groups:[],empty:""})+`<p class="past">Muốn gặp Thái hậu: Hành sự → Thỉnh an Thái hậu (sang Đức Thọ cung).</p>`}catch(e){return""}}
(function(){if(typeof kitCourtOpen!=="function")return;const o0=kitCourtOpen;kitCourtOpen=function(k){if(k==="th"&&typeof pcard==="function"&&!S.thDead){try{if(Q.length&&!/pcm/.test(Q[0].cls||""))return;const h=kitThCardHTML();if(h){Q.unshift({t:"Thái hậu",cls:"pcm",h});showModal();return}}catch(e){}}return o0.apply(this,arguments)}})();

/* ================= KIT 32.5 · DIALOG: ONLY THE OPTIONS SCROLL (owner 11/15, dev/owner-shots/1115-dlg-scroll-*.jpg) =================
   Every option dialog / event card (showModal with .opts — kitEventStage people, headArt, speaker portrait, story text, notes): the dialog
   is a flex column; the title, the picture / figures and the story text stay FIXED and visible (flex:none); ONLY the options list
   scrolls (flex:1, overflow auto) with a soft top shadow once it is scrolled. The picture may shrink on short screens (max 28vh;
   Fold / phones 24vh); if the fixed part still takes more than 55 % of the dialog, the picture is compressed first (down to 14vh),
   figures scale with it. Dialogs without .opts (Đã rõ cards, person cards, Luân hồi / identity panels .kpscopts) are unchanged. */
function kitDlgFit(){try{const M=document.getElementById("modal");if(!M||M.hidden)return;const d=M.querySelector(".dlg"),mb=document.getElementById("mb");
 const o=mb&&mb.querySelector(":scope > .opts");if(!d||!o){if(d)d.classList.remove("kdscroll");return}
 d.classList.add("kdscroll");d.style.removeProperty("--kdpic");o.classList.remove("kdsh");
 const fixedH=()=>{let h=0;[...d.children].forEach(c=>{if(c!==mb&&c.offsetParent)h+=c.offsetHeight});[...mb.children].forEach(c=>{if(c!==o&&c.offsetParent)h+=c.offsetHeight});return h};
 const D=d.clientHeight||innerHeight;let vh=28;/* KIT §0: same in the page and the spread */
 while(vh>14&&fixedH()>D*.55&&o.scrollHeight>o.clientHeight+2){vh-=2;d.style.setProperty("--kdpic",vh+"vh")}
 if(!o.dataset.kdsh){o.dataset.kdsh=1;o.addEventListener("scroll",()=>o.classList.toggle("kdsh",o.scrollTop>2),{passive:true})}
 kitDlgText(d,mb,o);
 try{if(typeof kitEsFit==="function")mb.querySelectorAll(".kpsubj.kes").forEach(kitEsFit)}catch(e){}}catch(e){console.error("kitDlgFit",e)}}
/* KIT 32.5b · THE TEXT AREA SCROLLS (review/kit-keeper-2, Foreman D D-R1 finding "event-frame body #mb is overflow:hidden, so long text is clipped"):
   in the fixed event frame the body #mb stays overflow:hidden (title, picture, figures, buttons never scroll away) and has TWO scroll areas:
   the options list (.opts, §32.5) and the story text (.kpb > .kpmain). The text keeps its natural height (fixed, fully visible) as long as the
   options keep at least min(their content, 42 % of the body); a longer text is capped to the rest and scrolls inside itself (.kdtx, soft top
   shadow once scrolled). Person dialogs (kdper) scroll their whole right column instead (kitDpAll / .kdpall) and do not use the cap. */
function kitDlgText(d,mb,o){try{const kb=mb.querySelector(":scope > .kpb"),tx=kb&&kb.querySelector(":scope > .kpmain");if(!kb||!tx)return;
 d.classList.remove("kdtx");kb.style.removeProperty("max-height");tx.classList.remove("kdsh");
 if(d.classList.contains("kdper"))return;
 const cs=getComputedStyle(mb),pad=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0),gap=parseFloat(cs.rowGap)||0;
 const inner=mb.clientHeight-pad,optNat=Math.min(o.scrollHeight,Math.max(96,Math.round(inner*.42)));
 const room=Math.max(72,Math.floor(inner-optNat-gap)),nat=kb.scrollHeight;
 if(nat>room+1){d.classList.add("kdtx");kb.style.maxHeight=room+"px"}
 if(!tx.dataset.kdsh){tx.dataset.kdsh=1;tx.addEventListener("scroll",()=>tx.classList.toggle("kdsh",tx.scrollTop>2),{passive:true})}}catch(e){console.error("kitDlgText",e)}}
window.kitDlgFit=kitDlgFit;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitDlgFit();requestAnimationFrame(kitDlgFit)}catch(e){}return r};
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(kitDlgFit,120)})})();
(function(){const st=document.createElement("style");st.id="kit-dlgscroll";st.textContent=`
.modal .dlg.kdscroll{display:flex!important;flex-direction:column;overflow:hidden!important}
.modal .dlg.kdscroll>*{flex:none}
.modal .dlg.kdscroll>#mb{flex:1 1 auto!important;min-height:0;display:flex!important;flex-direction:column;overflow-x:hidden!important;overflow-y:auto!important;overscroll-behavior:contain}
.modal .dlg.kdscroll>#mb>*{flex:none}
.modal .dlg.kdscroll>#mb>.opts{flex:1 1 auto!important;min-height:96px;overflow-y:auto!important;overscroll-behavior:contain;transition:box-shadow .2s}
.modal .dlg.kdscroll>#mb>.opts{grid-template-rows:none!important;grid-auto-rows:max-content!important;align-content:start!important}
.modal .dlg.kdscroll>#mb>.opts>*{min-height:max-content;flex:none}
.modal .dlg.kdscroll>#mb>.opts.kdsh{box-shadow:inset 0 10px 8px -8px rgba(58,32,16,.28)}
.modal .dlg.kdscroll>#mb>.kpb{flex:0 1 auto!important;min-height:0}
.modal .dlg.kdscroll.kdtx>#mb>.kpb{overflow:hidden;display:flex;flex-direction:column}
.modal .dlg.kdscroll.kdtx>#mb>.kpb.kphas{display:grid;grid-template-rows:minmax(0,1fr)}
.modal .dlg.kdscroll.kdtx>#mb>.kpb>.kpmain{min-height:0;overflow-y:auto;overscroll-behavior:contain;transition:box-shadow .2s;flex:1 1 auto}
.modal .dlg.kdscroll.kdtx>#mb>.kpb>.kpmain.kdsh{box-shadow:inset 0 10px 8px -8px rgba(58,32,16,.28)}
.modal .dlg.kdscroll>#mb .kpsubj img,.modal .dlg.kdscroll>#mb .kdlgart .ksart,.modal .dlg.kdscroll>#mb .kpsubj .ksart{max-height:var(--kdpic,28vh)}
.modal .dlg.kdscroll>#mb .kpsubj.kes{max-height:calc(var(--kdpic,28vh) + 40px)}
/* kv: dropped @media (max-width:999px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();

/* ================= KIT 32.6 · PEOPLE ON THE PICTURE (owner 11/15, dev/owner-shots/1115-figs-on-scene.jpg) =================
   Event dialogs (kitEventStage): when there is a place / event picture band, the people stand ON it — feet on the picture's floor
   line (86 % of its height), body height KIT_FIG.h × picture height (kitFigBody: forehead to feet; men ×KIT_FIG.man, capped under the
   top edge; children by age), standing in the kit's fixed slots (kitSlotCx, never overlapping), name chips inside the picture's bottom edge.
   No separate figure column: the story text runs full width under the picture, then the options (KIT 32.5: picture + people + text
   fixed, only the options scroll). Without a picture band the old figure column stays. kitEsOvFit re-lays the figures whenever the
   picture height changes (kitDlgFit compresses the picture on short screens; figures scale with it). */
function kitEsOvFit(){try{const ov=document.querySelector("#mb .kesov");if(!ov)return;const art=ov.parentElement;const H=art.clientHeight,W=art.clientWidth;if(H<40||W<40)return;
 const F=[...ov.querySelectorAll(":scope > .kesf")].filter(f=>!f.classList.contains("kesno"));if(!F.length)return;let wait=false;
 const L=F.map(f=>{const im=f.querySelector(".kesimg"),src=im&&im.getAttribute("src");const b=src?kitFigBody(src,()=>requestAnimationFrame(kitEsOvFit)):null;if(!b||!im.naturalWidth){wait=true;if(im&&!im.dataset.kov){im.dataset.kov=1;im.addEventListener("load",()=>requestAnimationFrame(kitEsOvFit))}}
  const kfr=parseFloat(im&&im.style.getPropertyValue("--kfr"))||1;return{f,im,b,fac:kfr*(KIT_FIG.man||1)}});
 if(wait)return;
 const floor=H*.86,top=H*.03;
 const sz=L.map(x=>{const bt=x.b.ht>x.b.t?x.b.ht:x.b.t;const body=Math.min(KIT_FIG.h*H*x.fac,floor-top);const ih=body/Math.max(.2,x.b.b-bt);const iw=ih*(x.b.ar||x.im.naturalWidth/x.im.naturalHeight);
  const cl=x.b.cl!=null?x.b.cl:x.b.l,cr=x.b.cr!=null?x.b.cr:x.b.r;return{ih,iw,core:iw*(cr-cl),cl,cr,l:x.b.l,r:x.b.r,b:x.b.b}});
 /* review/stage-slots-fix-r1 (owner OD:L1049, whole group): people on the picture stand in the SAME fixed slots as a room stage (kitSlotCx / kitSlotScale, jkit):
    1 → centre, 2 → 1/3 · 2/3 of the picture's free width; the whole visible art (l..r) fits its slot, never overlapping; one common scale-down when too wide */
 const k=sz.length,av=W-16,k0=kitSlotScale(sz.map(s=>s.iw*(s.r-s.l)),av);
 L.forEach((it,i)=>{const s=sz[i];const ih=s.ih*k0,iw=s.iw*k0;const cx=kitSlotCx(i,k,8,av);const left=cx-iw*(s.l+s.r)/2;
  it.f.style.left=left.toFixed(1)+"px";it.f.style.width=iw.toFixed(1)+"px";it.im.style.height=ih.toFixed(1)+"px";it.im.style.width=iw.toFixed(1)+"px";
  it.f.style.top=(floor-ih*s.b).toFixed(1)+"px";it.f.style.zIndex=String(2+i);it.f.style.visibility="";/* a figure kitDpFit hid while unmeasured must show once placed */
  const cap=it.f.querySelector(".kpsn");if(cap){cap.style.left=cx.toFixed(1)+"px";cap.dataset.row="0"}});
 /* name chips: inside the picture bottom, never cut; neighbours that touch go to a second row */
 const caps=L.map(it=>it.f.querySelector(".kpsn")).filter(Boolean);caps.forEach(c=>{c.style.translate="";ov.appendChild(c)});
 let prev=null;caps.forEach(c=>{const r=c.getBoundingClientRect(),A=art.getBoundingClientRect();let s=0;if(r.left<A.left+4)s=A.left+4-r.left;else if(r.right>A.right-4)s=A.right-4-r.right;if(s)c.style.translate=s.toFixed(1)+"px 0";
  const q=c.getBoundingClientRect();if(prev&&q.left<prev.right+4&&prev.c.dataset.row==="0")c.dataset.row="1";prev={right:q.right,c}})}catch(e){console.error("kitEsOvFit",e)}}
window.kitEsOvFit=kitEsOvFit;
(function(){if(typeof kitEventStage!=="function")return;const k0=kitEventStage;kitEventStage=function(m){const r=k0.apply(this,arguments);
 try{if(r){const mb=document.getElementById("mb");const band=mb&&mb.querySelector(":scope > .kdlgart");const art=band&&band.querySelector(".ksart");const col=mb&&mb.querySelector(":scope > .kpb > .kpsubj.kes");
  /* KIT 50 kitEventDp (owner 11/15): an event WITH a person keeps the person column (32.7) and the event picture becomes a landscape
     BANNER at the top of the right column — the people are no longer put on the picture (32.6 is retired for person events) */
  if(art&&col&&window.KIT_EVENT_DP!==false){band.classList.add("kdpban")}
  else if(art&&col&&!art.querySelector(".kesov")){const ov=document.createElement("div");ov.className="kesov";[...col.querySelectorAll(":scope > .kesf")].forEach(f=>ov.appendChild(f));art.appendChild(ov);col.remove();
   band.classList.add("kesonpic");const b=mb.querySelector(":scope > .kpb");if(b)b.classList.add("kesfull");requestAnimationFrame(kitEsOvFit)}}}catch(e){console.error("kesov",e)}return r};window.kitEventStage=kitEventStage})();
(function(){if(typeof kitDlgFit!=="function")return;const d0=kitDlgFit;kitDlgFit=function(){const r=d0.apply(this,arguments);try{kitEsOvFit()}catch(e){}return r};window.kitDlgFit=kitDlgFit;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(kitEsOvFit,140)})})();
(function(){const st=document.createElement("style");st.id="kit-esov";st.textContent=`
#mb>.kdlgart.kesonpic>.ksart{position:relative;height:var(--kdpic,30vh)!important;max-height:none!important;min-height:150px}
#mb>.kdlgart.kesonpic>.ksart>img{object-position:center 60%}
#mb .kesov{position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden}
#mb .kesov>.kesf{position:absolute;margin:0;display:block}
#mb .kesov>.kesf .kesfi{display:block;position:relative}
#mb .kesov>.kesf .kesimg{display:block;max-width:none!important;max-height:none!important;filter:url(#kfa) var(--klf,brightness(1)) drop-shadow(0 4px 5px #0006)}
#mb .kesov>.kpsn{position:absolute;bottom:3px;transform:translateX(-50%);z-index:20;white-space:nowrap;background:none;border:0;padding:0 6px;font-size:.78rem;line-height:1.25;text-align:center}
#mb .kesov>.kpsn[data-row="1"]{bottom:calc(3px + 2.6em)}
#mb>.kdlgart.kesonpic .ksart>figcaption,#mb>.kdlgart.kesonpic .ksart>.ksart-chip{top:6px;bottom:auto}
#mb>.kpb.kesfull{display:block!important;grid-template-columns:none!important}
#mb>.kpb.kesfull>*{max-width:none!important;width:auto}
/* kv: dropped @media (max-width:999px) (one page = spread page, KIT §0) */
`;document.head.appendChild(st)})();

/* ================= KIT 32.7 · ONE / TWO PEOPLE, NO SCENE PICTURE — person column left, text + options right (owner 11/15 04:45Z,
   iPad shot "VIỆC · Có người đến": "full chân dung bên trái, bên phải trên là thông tin sự kiện, dưới là nút chọn") =================
   Every kitEventStage dialog WITHOUT a place / event picture band (visitors, people who ask something, choice / invite cards with a
   person, Thái hậu's questions, two visitors…): the figure column on the LEFT is the full height of the dialog (under the title down to
   the bottom) and the people stand in it at the KIT_FIG scale of that column (woman body .79 × column, men ×1.07, children by age; feet
   on one line above the name chips; two people packed by their core with ≤ 20 % overlap, KIT 33 rule 4). RIGHT: the event text on top
   (the small face of a fact row stays; the empty dot of a "world" row is dropped), the options below, stacked one per row with their
   full Cần / Tốn / Được / Mất / Kèm lines and the odds; ONLY the options scroll (32.5). Dialogs with a picture band keep 32.6.
   Phones (< 600 px): figure on top (big: min(48dvh, 460 px)), text, then the options; only the options scroll.
   No DOM move: .kpb becomes display:contents so its figure column and text join #mb's grid next to .opts (kitDlgFit keeps working). */
function kitDpOn(){const M=document.getElementById("modal"),mb=document.getElementById("mb");if(!M||M.hidden||!mb)return null;const d=M.querySelector(".dlg.kesdlg");
 const col=mb.querySelector(":scope > .kpb > .kpsubj.kes");if(!d||!col||mb.querySelector(".kesov"))return null;return{d,mb,col}}
function kitDpApply(){try{const o=kitDpOn();const d0=document.querySelector("#modal .dlg");if(!o){if(d0&&d0.classList.contains("kdper")){d0.classList.remove("kdper","kdper2","kdnarrow");d0.style.removeProperty("--kdpw");d0.style.removeProperty("height")}return}
 const {d,mb,col}=o;d.__kdpN=0;d.classList.add("kdper");d.classList.toggle("kdper2",col.querySelectorAll(":scope > .kesf").length>1);
 const body=col.parentElement;body.classList.add("kdpb");
 /* a "world" fact row's empty dot means nothing beside a full figure */
 body.querySelectorAll(".kfact > .kfdot").forEach(x=>{x.parentElement.classList.add("kfnodot");x.remove()});
 const kids=[...mb.children].filter(c=>c!==body&&!c.classList.contains("opts"));kids.forEach(c=>c.classList.add("kdpr"));
 /* KIT 50 kitEventDp: banner (event picture) on top of the right column, focus point per picture; short options two per row */
 const ban=mb.querySelector(":scope > .kdlgart.kdpban");d.classList.toggle("kdpbanner",!!ban);
 if(ban){const im=ban.querySelector("img");if(im){const f=(im.getAttribute("src")||"").replace(/^.*\//,"");im.style.setProperty("object-position",(window.KIT_FOCUS||{})[f]||"50% 50%","important")}}
 const op=mb.querySelector(":scope > .opts");if(op){const B=[...op.children].filter(x=>x.matches("button,.opt"));
  const short=B.length>=2&&B.every(b=>b.querySelectorAll(".kr").length<=2&&(b.textContent||"").replace(/\s+/g," ").trim().length<=70);op.classList.toggle("kdpo2",short)}
 kitDpFit()}catch(e){console.error("kitDpApply",e)}}
/* KIT 50: banner focus points (object-position) for vertical event art; anything not listed = "50% 50%" (chosen from the crop sheets, dev/review/event-banners.md) */
window.KIT_FOCUS=Object.assign({"ev-trieu-chinh-2.webp":"50% 15%","ev-thang-tran.webp":"50% 55%","ev-hoang-de-gian.webp":"50% 15%","ev-di-san.webp":"50% 15%","ev-le-thu.webp":"50% 15%","ev-le-thu-2.webp":"50% 15%","ev-le-thu-3.webp":"50% 15%","ev-le-dong-2.webp":"50% 15%","ev-thoi-tiet-3.webp":"50% 15%","ev-dieu-troi.webp":"50% 15%","ev-dieu-lanh.webp":"50% 15%","ev-mat-uoc.webp":"50% 15%"},window.KIT_FOCUS||{});/* dev/review/event-banners.md */
function kitDpFit(){try{const o=kitDpOn();if(!o||!o.d.classList.contains("kdper"))return;const {d,mb,col}=o;
 const narrow=false;d.classList.toggle("kdnarrow",narrow);/* KIT §0: dialogs are the same in the page and the spread */
 const F=[...col.querySelectorAll(":scope > .kesf")].filter(f=>!f.classList.contains("kesno"));if(!F.length)return;let wait=false;
 const L=F.map(f=>{const im=f.querySelector(".kesimg"),src=im&&im.getAttribute("src");let b=src?kitFigBody(src,()=>requestAnimationFrame(kitDpFit)):null;if(im&&!im.complete&&!im.dataset.kdpl){im.dataset.kdpl=1;im.addEventListener("load",()=>requestAnimationFrame(kitDpFit),{once:true})}
  if(!b){wait=true}else if(im&&im.naturalWidth&&im.naturalHeight&&Math.abs(b.ar-im.naturalWidth/im.naturalHeight)>.005)b=Object.assign({},b,{ar:im.naturalWidth/im.naturalHeight});/* the true aspect always (never squash a person) */const kfr=parseFloat(im&&im.style.getPropertyValue("--kfr"))||1;return{f,im,b,fac:kfr*(KIT_FIG.man||1),cap:f.querySelector(".kpsn")||col.querySelector(`:scope > .kpsn[data-kdp="${F.indexOf(f)}"]`)}});
 /* KIT 32.7c (owner 11/15 "Khung to quá"): the dialog is as tall as its CONTENT (title + text + options), never stretched to the screen:
    height = clamp(min(100dvh − 32, 500 px), natural, min(100dvh − 32, 720 px)); the people are then scaled to that column. A dialog whose
    content is taller (many options, the shop grid) stays at the cap, so the shop and a full person dialog keep the same box. */
 if(!narrow){const cap=Math.min(innerHeight-32,720),lo=Math.min(innerHeight-32,KIT_DP_MINH);const h0=d.style.height;d.style.height="auto";
  const nat=kitDpNat(d,mb,col);const h=Math.round(Math.max(lo,Math.min(cap,nat)));d.style.height=h+"px";
  if(h0!==h+"px"){d.__kdpN=(d.__kdpN||0)+1;if(d.__kdpN<4)requestAnimationFrame(kitDpFit)}}
 if(wait){L.forEach(x=>{if(!x.b)x.f.style.visibility="hidden"});return}/* review r1: a figure not yet measured (kitFigBody, CORS read of a CDN picture) is hidden, never shown at its raw picture size */ /* (stage-fig-size) the dialog takes its content height even while a figure is still loading */
 /* KIT 48 (owner 11/15): the name + rank (kitNameRank chip) sit ABOVE the people, at the top of the column; KIT 32.7b (owner 11/15): every
    person FILLS the column from just under the chips down to the column bottom — the painted top (hair, crown, hat) under the chips, the feet
    on the column floor; man and woman alike (aspect kept), children by age (KIT_FIG.fac < 1). */
 L.forEach((x,i)=>{if(x.cap){x.cap.dataset.kdp=i;x.cap.classList.add("kdpcap","knr");if(x.cap.parentElement!==col)col.appendChild(x.cap);
  /* review shop-fix (main): kitEsFit (33.6) may have left position:relative + a narrow max-width inline on a cached figure; clear them */
  x.cap.style.removeProperty("position");x.cap.style.removeProperty("z-index");x.cap.style.removeProperty("max-width")}});
 const capH=Math.max(0,...L.map(x=>x.cap?x.cap.offsetHeight:0));
 /* reviewer popup-fullbody-r1 / evidence panel: a person panel WITHOUT an options group scrolls as a whole (#mb); the figure column must be the visible height of #mb (sticky at the top), never the whole scroll height (figure 1100 px below the fold) */
 if(!narrow&&!mb.querySelector(":scope > .opts")){col.style.removeProperty("height");col.style.removeProperty("align-self");if(mb.scrollHeight>mb.clientHeight+2){col.style.alignSelf="start";col.style.height=Math.max(200,mb.clientHeight-20)+"px"}}
 const H=col.clientHeight;if(H<80)return;const floor=H-2;
 const capW=Math.max(0,...L.map(x=>x.cap?x.cap.scrollWidth:0));
 /* KIT 32.2 CAP + CROP (owner 15/11 "Sao khung này, khung trái nhân vật to vậy … nếu cắt váy thì cũng ok mà", review/stage-fig-size):
    the column is never wider than KIT_DP_COL (36 % of the dialog, ≤ 264 px) — the people are fitted INTO it, it never grows for them.
    What must fit the width is the figure from the painted top down to KIT_DP_CROP.knee (waist; kitFigBody width profile wl/wr); a skirt hem or sleeve
    that flares wider below that line is cut by the column edge. When the column is short (people under KIT_DP_CROP.minH of the screen
    height) the people are drawn bigger and cut at the column floor instead of shrinking the face: at least head → KIT_DP_CROP.minVis of
    the body stays in view (owner: cutting the skirt is fine); the face is never cut or squashed (aspect kept). A person shorter than the
    column stands on the floor with the name chip right above the head. */
 const dwAt=narrow?col.clientWidth:(d.clientWidth||Math.min(innerWidth-24,KIT_DP_COL.max+470));/* KIT 8.1: the frame has ONE size (--kpw); the column is cut to fit inside it (merge review/newgame-ui-r1) */
 const Wmax=narrow?col.clientWidth:Math.max(120,Math.min(KIT_DP_COL.max,KIT_DP_COL.pct*dwAt,dwAt-250-44));
 const prof=(b,f)=>{if(!b.wl)return[b.l,b.r];const k=Math.max(0,Math.min(20,Math.ceil(f*20-1e-6)));return[b.wl[k],b.wr[k]]};
 const lay=(top,rows)=>{const Hu=floor-top;if(Hu<40)return false;
  const at=m=>{const sz=L.map(x=>{const rel=Math.min(1,x.fac);const span=Math.max(.2,x.b.b-x.b.t);const ih=Hu/span*rel*m;const iw=ih*(x.b.ar||1);
    const fv=Math.min(1,Hu/(ih*span));const [vl,vr]=prof(x.b,Math.min(fv,L.length>1?1:KIT_DP_CROP.knee));/* two people: the whole visible part counts (review/stage-slots-fix-r1: no overlap); one person: the column edge may cut a hem */
    const cl=x.b.cl!=null?x.b.cl:x.b.l,cr=x.b.cr!=null?x.b.cr:x.b.r;return{ih,iw,span,fv,core:iw*(cr-cl),cl,cr,l:Math.min(vl,cl),r:Math.max(vr,cr),t:x.b.t,b:x.b.b}});
   /* review/stage-slots-fix-r1 (owner OD:L1049): fixed slots (kitSlot*, jkit), no overlap: the column must be as wide as the widest visible art × (k+1) for k ≥ 2 people */
   const tot=kitSlotNeed(sz.map(s=>s.iw*(s.r-s.l)));return{sz,tot}};
  /* target scale: 1 = the tallest person fills the column; a short column zooms (crop at the floor) up to minVis of the body in view */
  const minFull=KIT_DP_CROP.minH*innerHeight;const mT=Hu<minFull?Math.min(minFull/Hu,1/KIT_DP_CROP.minVis):1;
  let m=mT,A=at(m);if(A.tot+12>Wmax){let lo=.1,hi=mT;for(let i=0;i<22;i++){const md=(lo+hi)/2;if(at(md).tot+12<=Wmax)lo=md;else hi=md}m=lo;A=at(m)}
  const {sz,tot}=A;const need=Math.min(Wmax,Math.max(tot,capW)+12);if(!narrow)d.style.setProperty("--kdpw",Math.round(need)+"px");
  const W=narrow?col.clientWidth:need;const kN=sz.length;
  /* the tallest person sets the chip line: right above the painted top when the people are shorter than the column */
  const gap=Math.max(0,Hu-Math.max(...sz.map(s=>s.ih*s.span)));col.dataset.kdpcrop=sz.some(s=>s.fv<.995)?"1":"0";
  L.forEach((it,i)=>{const s=sz[i];const ih=s.ih,iw=s.iw;const cxs=kitSlotCx(i,kN,6,W-12);const left=cxs-iw*(s.l+s.r)/2;
   const ftop=s.fv<.995?top-ih*s.t:floor-ih*s.b;/* cropped: painted top under the chips, the rest runs past the floor (cut) */
   Object.assign(it.f.style,{left:left.toFixed(1)+"px",top:ftop.toFixed(1)+"px",width:iw.toFixed(1)+"px",zIndex:String(2+i),visibility:""});
   const wr=it.f.querySelector(".kesfi");if(wr)Object.assign(wr.style,{width:iw.toFixed(1)+"px",height:ih.toFixed(1)+"px",margin:"0",maxWidth:"none"});
   Object.assign(it.im.style,{width:iw.toFixed(1)+"px",height:ih.toFixed(1)+"px"});
   if(it.cap){it.cap.style.left=Math.max(0,Math.min(W,cxs)).toFixed(1)+"px";it.cap.style.translate="";it.cap.dataset.row=rows&&i%2?"1":"0";it.cap.style.top=(gap+(rows&&i%2?capH+4:0)).toFixed(1)+"px"}});
  /* chips never cut: clamp inside the column; report whether two touch */
  const C=col.getBoundingClientRect();let prev=null,touch=false;L.forEach(it=>{const c=it.cap;if(!c)return;const r=c.getBoundingClientRect();let s=0;if(r.left<C.left+2)s=C.left+2-r.left;else if(r.right>C.right-2)s=C.right-2-r.right;if(s)c.style.translate=s.toFixed(1)+"px 0";
   const q=c.getBoundingClientRect();if(prev&&q.left<prev.right+4&&c.dataset.row===prev.row)touch=true;prev={right:q.right,row:c.dataset.row}});return touch};
 /* two chips that touch → the second one goes to a second line above the heads and the people start under it */
 if(lay(capH+6,false))lay(2*capH+10,true);
 col.dataset.kdpfit="1"}catch(e){console.error("kitDpFit",e)}}
window.kitDpApply=kitDpApply;window.kitDpFit=kitDpFit;
/* KIT 50.1 (owner 11/15 13:00Z/13:15Z, review r8 acceptance "VIỆC · Thái hậu triệu"):
   - height = content with a 300 px floor (KIT_DP_MINH; was 500: a two-choice summons left ~120 px empty under its options);
   - ONE person in the left column: the main one (stage[0] / who); a second person is named in the text (owner "several people → only the
     main one");
   - EVERY event with a person gets the landscape banner: its own event picture, else the picture of its kind — "j24:<title>" (Có người đến,
     Thái hậu triệu, Hoàng thượng đến, Kẻ hầu xin, Một ánh mắt, Việc của kẻ hầu) or the week-book meaning table (KBK_EVRE, j87) read from
     the title + text; a dialog about herself alone (who = Ta) gets a banner only when that table finds a real meaning. */
var KIT_DP_MINH=300;
/* KIT 32.2 cap + crop (review/stage-fig-size): figure column ≤ pct of the dialog and ≤ max px; crop: knee line (share of the painted
   height that must fit the column width), minH (people shorter than this share of the screen height are drawn bigger and cut at the
   floor), minVis (never less than this share of the body in view: head → thighs); knee = .5 (head → waist) */
var KIT_DP_COL={pct:.36,max:264},KIT_DP_CROP={knee:.5,minH:.40,minVis:.6};
/* a festival dialog (j71 invitation j71i / feast invitation j71x / the festival day / its contests) → its festival key, so the banner is the
   festival's own picture ("fest:<k>" in EVENTS.json: Đoan ngọ = ev-le-ha) instead of the Triều chính default (owner 13:00Z) */
function kitFestKey(m){try{if(typeof FEST!=="object")return"";const pp=m.pp||{};if(pp.k&&FEST[pp.k])return pp.k;
 if(pp.kk&&typeof FX7==="object"&&FX7[pp.kk]){return {xuan:"newyear",tt:"thattich"}[FX7[pp.kk].f]||""}
 const t=String(m.t||"").replace(/<[^>]+>/g," ").trim();if(/^Thi tài ngày Thất tịch/.test(t))return"thattich";if(/^Yến tiệc đầu xuân/.test(t))return"newyear";
 for(const k in FEST){const n=String(FEST[k].name||"").replace(/\s*\([^)]*\)\s*$/,"");if(n&&t.indexOf(n)===0)return k}}catch(e){}return""}
/* the dialog's natural height (32.7c / 50.1): its height minus #mb + the right column stacked at content size (the options' own content,
   not the stretched grid cell; the figure column has no height of its own — the people are sized to the result) */
/* review/pcard-actrow (owner 16/11 "no tiny nested scroll box", spy-target dialog on iPad landscape): in the ONE fixed frame (§8.1) a person dialog whose picture + text
   leave the options list less than ~280 px, about two rows (a tiny scroll box, rows cut in half) scrolls its WHOLE right column as one list (picture, text, then the long option
   rows, nothing cut); the person stays pinned on the left (sticky). Otherwise the §32.5 rule stands (text fixed, only the options scroll). Class `kdpall`. */
function kitDpAll(){try{const o=kitDpOn();if(!o||!o.d.classList.contains("kdper"))return;const {d,mb}=o;const op=mb.querySelector(":scope > .opts");if(!op)return;
 d.classList.remove("kdpall");const tiny=op.scrollHeight>op.clientHeight+2&&op.clientHeight<280;if(tiny){d.classList.add("kdpall");if(!d.__kdpTop){d.__kdpTop=1;mb.scrollTop=0}}mb.style.setProperty("--kdpmbh",mb.clientHeight+"px")}catch(e){}}
window.kitDpAll=kitDpAll;
function kitDpNat(d,mb,col){try{const cs=e=>getComputedStyle(e);const items=[...mb.querySelectorAll(":scope > *, :scope > .kpb > *")].filter(e=>e!==col&&e.offsetParent&&cs(e).display!=="contents"&&cs(e).gridColumnStart==="2");
 let sum=0;items.forEach(e=>{const c=cs(e);let h=e.offsetHeight;if(e.classList.contains("opts")){const K=[...e.children].filter(x=>x.offsetParent);if(K.length){const t=e.getBoundingClientRect().top;h=Math.max(...K.map(x=>x.getBoundingClientRect().bottom))-t+e.scrollTop+parseFloat(c.paddingBottom||0)}}
  sum+=h+parseFloat(c.marginTop||0)+parseFloat(c.marginBottom||0)});
 const m=cs(mb);sum+=parseFloat(m.paddingTop||0)+parseFloat(m.paddingBottom||0)+(parseFloat(m.rowGap)||0)*Math.max(0,items.length-1);
 return d.offsetHeight-mb.offsetHeight+sum}catch(e){return d.scrollHeight}}
(function(){const f0=kitDpFit;kitDpFit=function(){const r=f0.apply(this,arguments);try{kitDpAll()}catch(e){}return r};window.kitDpFit=kitDpFit})();
(function(){const st=document.createElement("style");st.id="kit-dp-all";st.textContent=`
html body #modal .dlg.kdper.kdpall>#mb{overflow-y:auto!important;overscroll-behavior:contain;grid-template-rows:max-content max-content!important;align-content:start}
html body #modal .dlg.kdper.kdpall>#mb>.kpb>.kpsubj.kes{position:sticky!important;top:0;align-self:start;grid-row:1/-1;height:var(--kdpmbh,100%)!important}
html body #modal .dlg.kdper.kdpall>#mb>.opts{grid-row:2!important;overflow:visible!important;min-height:max-content!important;align-self:start}
`;document.head.appendChild(st)})();
(function(){const p0=kitStagePeople;kitStagePeople=function(m){let L=p0.apply(this,arguments);
 /* coordinator 15/11 ("Hoàng hậu triệu kiến" showed the PLAYER): the column shows the MAIN ACTOR — the first person who is not the player;
    the player stands there only when the event is about her alone */
 try{if(L.length&&typeof S!=="undefined"&&S&&L.every(p=>p===S||p.__kp===S)&&m){const w=m.who&&(m.who.__kp||m.who);if(w&&w!==S&&typeof w==="object"&&(w.name||w.kind))L=[w].concat(L)}}catch(e){}
 try{if(L.length>1&&typeof S!=="undefined"&&S){const o=L.filter(p=>p!==S&&p.__kp!==S);if(o.length)L=o.concat(L.filter(p=>p===S||p.__kp===S))}}catch(e){}
 return window.KIT_EVENT_DP===false?L:L.slice(0,1)};window.kitStagePeople=kitStagePeople;
 if(typeof kitEvArt!=="function")return;const a0=kitEvArt;kitEvArt=function(m){try{/* review r8: a festival dialog whose festival has no "fest:<k>" category in EVENTS.json (Vu Lan, Lạp bát, Thánh thọ, Vạn thọ)
   takes the festival's own band (img/ev-fest-<k>-b.webp, the one the festival day already shows, j71) — not the Hoàng thượng / Thái hậu picture */
  if(m&&!m.art&&!m.stArt&&!(m.evId&&typeof evArtCat==="function"&&evArtCat(m.evId))){const f=kitFestKey(m);if(f&&typeof evArtCat==="function"&&!evArtCat("fest:"+f))return{src:`img/ev-fest-${f}-b.webp`,lab:String(FEST[f].name||"").replace(/\s*\([^)]*\)\s*$/,"")}}
  if(m&&!m.evId&&!m.art&&!m.stArt){const f=kitFestKey(m);if(f&&typeof evArtCat==="function"&&evArtCat("fest:"+f))m.evId="fest:"+f;
   /* review/ev-art-fit (owner 15/11 "ảnh minh họa không liên quan"): no "who is on the stage" default any more (visitor → gift box,
      Emperor → ngự giá, Thái hậu → thỉnh an). Order: its own id (pid / e68) → its MEANING (jevfit kitEvFit: title + first sentences) →
      a j24 approach title → the week-book table on the title → nothing (jph placeholder, listed as missing). */
   else if(typeof evArtCat==="function"){const pp=m.pp||{};const own=m.pid?m.pid+(pp.id||pp.k?":"+(pp.id||pp.k):""):"";const e68=/^e68/.test(m.pid||"")?"e68:"+m.pid.slice(3):"";
    if(own&&evArtCat(own)){}else if(e68&&evArtCat(e68))m.evId=e68;
    else{const fit=typeof kitEvFit==="function"?kitEvFit(m):null;
     if(fit&&fit.art){window.__evFitWhy="fit:"+fit.rule;return{src:fit.art.src,lab:fit.art.lab||""}}
     if(fit){m.evId=fit.id;KIT_EVFIT_WHY.set(m,fit.rule)}
     else if(typeof kpSlug==="function"&&kitStagePeople(m).length){const sl=kpSlug(String(m.t||"").replace(/<[^>]+>/g," "));if(sl&&evArtCat("j24:"+sl))m.evId="j24:"+sl;
      else if(typeof KBK_EVRE!=="undefined"){const txt=String(m.t||"").replace(/<[^>]+>/g," ").replace(/^\s*(Chính tuyến|Phụ tuyến) · /,"");/* "Phụ tuyến" read as "yến" (feast) *//* the title only: the body matched loosely (a tea chat read as "poison") */
       const hit=KBK_EVRE.find(([re])=>re.test(txt));if(hit&&evArtCat(hit[1]))m.evId=hit[1]}}}}}
  try{if(m&&/^cat:/.test(m.evId||""))window.__evFitWhy="fit:"+(KIT_EVFIT_WHY.get(m)||"saved")}catch(e){}}catch(e){}
  const r=a0.apply(this,arguments);if(r||!window.__kesArt||!m||window.KIT_EVENT_DP===false)return r;
  try{if(typeof evArtCat!=="function"||typeof evArtOf!=="function")return r;const P=kitStagePeople(m);if(!P.length)return r;
   const salt=S?(S.year*100+S.month*3+(S.tuan||0)):0;const t=String(m.t||"").replace(/<[^>]+>/g," ");const slug=typeof kpSlug==="function"?kpSlug(t):"";
   let id="";{const fit=typeof kitEvFit==="function"?kitEvFit(m):null;if(fit){window.__evFitWhy="fit:"+fit.rule;if(fit.art)return{src:fit.art.src,lab:fit.art.lab||""};id=fit.id}}if(!id&&slug&&evArtCat("j24:"+slug))id="j24:"+slug;
   if(!id&&typeof KBK_EVRE!=="undefined"){const txt=t+" "+String(m.h||"").replace(/<[^>]+>/g," ");const hit=KBK_EVRE.find(([re])=>re.test(txt));
    if(hit&&evArtCat(hit[1]))id=hit[1]}  /* no "who is on the stage" default (review/ev-art-fit) */
   if(!id)return r;const src=evArtOf(id,salt);return src?{src,lab:typeof evArtTitle==="function"?evArtTitle(id):""}:r}catch(e){return r}};window.kitEvArt=kitEvArt;
 const k0=kitEventStage;kitEventStage=function(){window.__kesArt=1;try{return k0.apply(this,arguments)}finally{window.__kesArt=0}};window.kitEventStage=kitEventStage})();
/* review/stage-fig-size (kit-sample race: a 1180 run drew no figure): kitFigOf needs the figure list (FIGURES.json from the CDN, j28 FIGS);
   a person dialog opened before it arrives fell back to the small portrait and stayed so. For 60 s, every 300 ms: whenever the list
   changes (first list, then the merged one) and the open dialog names a person but has no stage column, the dialog is drawn again (same Q[0], showModal). */
(function(){let n=0,last=null;const t=setInterval(()=>{try{if(++n>200){clearInterval(t);return}if(typeof FIGS==="undefined"||!FIGS.length||FIGS===last)return;last=FIGS;/* j28 sets a first list (FIGURES.json), j39 loadFigs replaces it with the merged one (Thái hậu, officials …): retry on each */
 const M=document.getElementById("modal");const m=typeof Q!=="undefined"&&Q[0];if(!M||M.hidden||!m)return;const d=M.querySelector(".dlg.kpanel");
 if(!d||(/^(info|rule|person)$/.test(d.dataset.kind||"")&&!Array.isArray(m.stage||(m.kit&&m.kit.stage)))||M.querySelector("#mb .kpsubj.kes")||!kitStagePeople(m).length)return;showModal()}catch(e){}},300)})();
/* kitEsFit (33.6) sizes figures in the old side column; a 32.7 column is sized by kitDpFit instead */
(function(){const e0=kitEsFit;kitEsFit=function(row){if(row&&row.closest&&row.closest(".dlg.kdper"))return kitDpFit();return e0.apply(this,arguments)};window.kitEsFit=kitEsFit})();
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitDpApply();requestAnimationFrame(kitDpFit)}catch(e){}return r};
 const d0=kitDlgFit;kitDlgFit=function(){const r=d0.apply(this,arguments);try{kitDpFit()}catch(e){}return r};window.kitDlgFit=kitDlgFit;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(kitDpFit,160)})})();
(function(){const st=document.createElement("style");st.id="kit-dlgperson";st.textContent=`
#modal .dlg.kpanel.kdper{display:flex!important;flex-direction:column;overflow:hidden!important}
#modal .dlg.kpanel.kdper>*{flex:none}
#modal .dlg.kdper>#mb,.modal .dlg.kdscroll.kdper>#mb{flex:1 1 auto!important;min-height:0;display:grid!important;overflow:hidden!important;
 grid-template-columns:var(--kdpw,240px) minmax(0,1fr);grid-template-rows:max-content minmax(0,1fr);column-gap:14px;align-content:stretch}
#modal .dlg.kdper>#mb>.kpb.kdpb{display:contents!important}
#modal .dlg.kdper>#mb>.kpb>.kpsubj.kes{grid-column:1;grid-row:1/-1;position:relative!important;display:block!important;top:auto;max-height:none!important;height:auto;min-height:0;overflow:clip!important;margin:0}
/* KIT 32.2 crop (review/stage-fig-size): the column clips — a hem / sleeve wider than the capped column and the legs of a cropped figure are cut at its edge */
#modal .dlg.kdper>#mb>.kpb>.kpmain,#modal .dlg.kdper>#mb>.kdpr{grid-column:2;min-width:0}
#modal .dlg.kdper>#mb>.opts{grid-column:2;grid-row:-2/-1;min-height:0!important;max-height:none;overflow-y:auto!important;align-self:stretch;margin-top:8px;
 display:flex!important;flex-direction:column!important;gap:8px;grid-template-columns:none!important}
html body #modal .dlg.kdper>#mb>.opts,html body #modal .dlg.kdper>#mb>.opts.k3grid:has(> button.ka){display:flex!important;flex-direction:column!important;grid-template-columns:none!important}
html body #modal .dlg.kdper>#mb>.opts>*:disabled{order:1!important}
html body #modal .dlg.kdper>#mb>.opts>*{width:100%!important;max-width:none!important;flex:none!important;order:0!important;grid-column:auto!important;min-height:max-content!important;height:auto!important}
#modal .dlg.kdper .kes>.kesf{position:absolute;margin:0;display:block;flex:none}
#modal .dlg.kdper .kes>.kesf .kesfi{display:block;position:relative}
#modal .dlg.kdper .kes .kesimg{display:block;max-width:none!important;max-height:none!important}
#modal .dlg.kdper .kes>.kpsn.kdpcap{position:absolute;top:0;bottom:auto;transform:translateX(-50%);z-index:20;white-space:nowrap;margin:0;text-align:center;
 background:none;border:0;padding:1px 8px}
/* (KIT 48) the second chip line is placed by kitDpFit (style.top) */
#modal .dlg.kdper .kes>.kpsn .kname{display:flex;flex-direction:column;align-items:center;line-height:1.2;color:color-mix(in srgb,var(--rc,#2a1a12) 45%,#2a1a12);font-size:1rem}
#modal .dlg.kdper .kes>.kpsn .kname .kti{font-size:.74rem;font-weight:600;letter-spacing:.02em;line-height:1.1;color:color-mix(in srgb,var(--rc,#7a5530) 75%,#2a1a12)}
#modal .dlg.kdper .kfact.kfnodot{grid-template-columns:minmax(0,1fr)}
/* act-card kit (coordinator 15/11, kit-sample audit): the tiny portrait a card title carries (j25 "Thưa rằng do Hoàng thượng định") is ONE
   text line high — the framed mini portrait (.md.kfc, 26x49) is zoomed to ≈ 21 px so the title keeps one line and its card the height of its
   neighbours (KIT 31.16 / 32.9). Same rule on act cards and dialog option cards. */
html body button.ka .kan>.md.kfc{zoom:.43;margin:0 8px 0 0!important;vertical-align:middle}
#modal .dlg.kdper #mr{padding-left:calc(var(--kdpw,240px) + 28px)}
#modal .dlg.kdper.kdnarrow>#mb{grid-template-columns:minmax(0,1fr)!important;grid-template-rows:none!important;grid-auto-rows:max-content}
#modal .dlg.kdper.kdnarrow>#mb:has(>.opts){grid-template-rows:min(48dvh,460px) max-content minmax(0,1fr)!important}
#modal .dlg.kdper.kdnarrow>#mb:not(:has(>.opts)){grid-template-rows:min(48dvh,460px) max-content!important}
#modal .dlg.kdper.kdnarrow>#mb>.kpb>.kpsubj.kes{grid-column:1;grid-row:1}
#modal .dlg.kdper.kdnarrow>#mb>.kpb>.kpmain,#modal .dlg.kdper.kdnarrow>#mb>.kdpr{grid-column:1}
#modal .dlg.kdper.kdnarrow>#mb>.opts{grid-column:1;grid-row:-2/-1}
#modal .dlg.kdper.kdnarrow #mr{padding-left:10px}
`;document.head.appendChild(st)})();
/* ================= KIT 32.10 · kit-x — THE close ✕ (owner 11/15: no "Thôi" buttons; a card closes with ONE ✕ at the top right of its header) =================
   `kitXHTML(attrs, label)` → `<button class="kit-x" aria-label="Đóng">✕</button>` (36 px square, kit ink on the header ground, gold ring on focus).
   `kitXAdd(dlg)` puts one into a kit panel header (.kph, right end, absolutely placed so the header keeps the height of every other
   dialog) and makes it close the panel the normal way (#mclose: onClose runs);
   the panel's button row (#mr) is then hidden by the caller's class. Floating cards inside a panel (shop item card) use the same class. */
function kitXHTML(attrs,label){return `<button type="button" class="kit-x" aria-label="${label||"Lui"}" title="${label||"Lui"}"${attrs?" "+attrs:""}>✕</button>`}
function kitXAdd(dlg,close){try{if(!dlg)return null;const h=dlg.querySelector(":scope > .kph");let x=dlg.querySelector(":scope > .kph > .kit-x, :scope > .kit-x.kxabs");if(x)return x;
 if(h){h.insertAdjacentHTML("beforeend",kitXHTML('data-kitx="panel"'));x=h.lastElementChild}else{dlg.insertAdjacentHTML("afterbegin",kitXHTML('data-kitx="panel"'));x=dlg.firstElementChild;x.classList.add("kxabs")}
 x.addEventListener("click",e=>{e.stopPropagation();e.preventDefault();if(typeof close==="function")close();else kitModalClose()});return x}catch(e){console.error("kitXAdd",e);return null}}
window.kitXHTML=kitXHTML;window.kitXAdd=kitXAdd;
(function(){const st=document.createElement("style");st.id="kit-x";st.textContent=`
.kit-x{flex:none;margin-left:auto;width:36px;height:36px;min-height:0;padding:0;display:inline-grid;place-items:center;border-radius:8px;cursor:pointer;
 border:1px solid var(--k-hair,#e6d3ac);background:#fffaf0cc;color:var(--ink,#3a2418);font:700 1.05rem/1 system-ui,sans-serif;box-shadow:none}
.kph>.kit-x{position:absolute;right:10px;top:50%;transform:translateY(-50%);margin:0}
.kph:has(>.kit-x){padding-right:56px!important}
.kit-x:hover{background:#fff;border-color:var(--gold,#c9a46a)}
.kit-x:focus-visible{outline:none;box-shadow:0 0 0 2px var(--gold,#c9a46a)}

`;document.head.appendChild(st)})();
/* ================= KIT 48 · kitNameRank — name + rank ABOVE the picture (owner 11/15: "people read top to bottom") ==========   ONE block for every portrait / figure label: the rank on one small line (rank colour), the name under it, then the picture below.
   `kitNameRank(rank, name, col)` → `<div class="knr" style="--rc:col"><small class="knr-r">rank</small><b class="knr-n">name</b></div>`.
   Used by: Ân oán cards (kitRel3), every person dialog (32.7 chips = `.kpsn.knr` at the column top, kitDpFit), the shop seller, person
   cards (Hậu cung / Cung nhân: `.pcl` name + rank moved above the portrait). The same look as the 32.7 chip's kitName (rank over name). */
function kitNameRank(rank,name,col,me,small){const rt=rank?kitRankTone(rank,col):"";if(me==null)me=kitIsMyName(name);return `<div class="knr${small?" knr-s":""}" style="--rc:${col||"#7a5530"}">${rank?`<small class="knr-r krt" style="--rt:${rt}">${rank}</small>`:""}<b class="knr-n krn${me?" kmy":""}">${name||""}</b></div>`}
window.kitNameRank=kitNameRank;
/* ================= KIT 48.1 · RANK TITLE (owner, ref. shot "a title floating above the character's name") ==========
   The rank / role line above every name is a TITLE: serif (var(--display)), bold, in the rank's OWN colour = the colour family of that rank's
   portrait frame, VIVID (≥ 4.4:1 on paper). Owner 15/11 22:25Z: glow + thin dark outline ONLY on a painting (stage tags over the scene,
   captions over a picture .kesov; the title there is the tone lightened 72 %); in framed UI (dialogs, cards, Tuần lục, lists, podium) it is
   PLAIN text in the vivid tone. The NAME line under it is plain dark ink (paper halo on a painting).
   `kitRankTone(title, col)` → the title colour, looked up by the title's WORDS (one table, so every builder agrees whatever --rc it passes):
   consorts Đáp ứng ivory-champagne · Thường tại green · Quý nhân blue · Tần pink · Phi purple · Quý phi rose-red · Hoàng quý phi amber ·
   Hoàng hậu gold; Phế phi / lãnh cung ash; Thái hậu bronze; Hoàng thượng imperial yellow; maids follow MRCOL (thô sử grey-jade, Cung nữ jade, Đại cung nữ blue, Chưởng sự cô cô terracotta,
   Nữ quan lavender), ma ma sand; men never pink/purple: eunuchs sage → steel → bronze, Thái y teal, officials / guards steel blue;
   Hoàng tử sky, Công chúa coral; stranger grey. Unknown title → the caller's colour, darkened 20 %.
   Classes: `.krt` title, `.krn` name (kitNameRank sets both); the same look is given (CSS below) to every rank-over-name block that is built
   elsewhere: stage name tags (.j59t / .j59n), kitEventDp / 32.7 captions (.kpsn .kname .kti — kitName sets --rt on .kti), person cards
   (.pcrk over .pcname), the Tuần lục person heading (.kbk-pname). Inline titles inside sentences (kitName in prose) keep the plain look. */
/* KIT 48.1f THE TONE (owner 11/16 13:00Z "nhạt nhòa → tươi hơn"): the colour of a title on PAPER is DERIVED from the one palette (RCOL / MRCOL / ERCOL /
   RCOL_COLD / KIT_ROLE, j1): same hue, saturation kept high, lightness lowered only as far as needed for >= 3.6:1 on parchment #fbf3e2 (jewel tones: framed UI shows the vivid tone as PLAIN text (no edge, owner 11/16 13:50Z); only paintings get the light halo 48.1d/e).
   No second table of hexes: change a base in j1 and every title, chip, ring, halo and portrait ground changes with it. */
const KIT_TONE_CACHE={};
function kitToneOf(base,paper){const key=base+"|"+(paper||"");if(KIT_TONE_CACHE[key])return KIT_TONE_CACHE[key];
 const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),lin=c=>(c/=255)<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4),lum=h=>{const[r,g,b]=rgb(h).map(lin);return .2126*r+.7152*g+.0722*b};
 const P=paper||"#fbf3e2",cr=h=>{const a=lum(h),b=lum(P);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
 let[r,g,b]=rgb(base).map(x=>x/255);const M=Math.max(r,g,b),m=Math.min(r,g,b);let l=(M+m)/2,s=0,H=0;
 if(M!==m){const d=M-m;s=l>.5?d/(2-M-m):d/(M+m);H=M===r?(g-b)/d+(g<b?6:0):M===g?(b-r)/d+2:(r-g)/d+4;H*=60}
 if(s>=.4)s=Math.max(s,.9);/* vivid families stay vivid; steel-grey stays grey */
 const hx=(H,s,l)=>{const f=n=>{const k=(n+H/30)%12,a=s*Math.min(l,1-l);return Math.round((l-a*Math.max(-1,Math.min(k-3,9-k,1)))*255).toString(16).padStart(2,"0")};return"#"+f(0)+f(8)+f(4)};
 let x=hx(H,s,l);while(cr(x)<3.6&&l>.04){l-=.005;x=hx(H,s,l)}return KIT_TONE_CACHE[key]=x}
window.kitToneOf=kitToneOf;
/* title words -> the BASE colour (read live from the j1 palette), then kitToneOf */
const KIT_RT=[[/hoàng quý phi/,()=>RCOL[6]],[/phế phi|lãnh cung/,()=>RCOL_COLD],[/quý phi/,()=>RCOL[5]],[/hoàng hậu/,()=>RCOL[7]],[/thái hậu/,()=>KIT_ROLE.th],
 [/hoàng thượng|hoàng đế|thánh thượng|thiên tử/,()=>KIT_ROLE.emp],[/phi$/,()=>RCOL[4]],[/(^|\s)tần$/,()=>RCOL[3]],[/quý nhân/,()=>RCOL[2]],[/thường tại/,()=>RCOL[1]],
 [/đáp ứng/,()=>RCOL[0]],[/thô sử/,()=>MRCOL[0]],[/chưởng sự|cô cô/,()=>MRCOL[3]],[/nữ quan/,()=>MRCOL[4]],[/đại cung nữ/,()=>MRCOL[2]],[/cung nữ|thị nữ/,()=>MRCOL[1]],
 [/ma ma|nhũ mẫu|vú/,()=>KIT_ROLE.mama],[/tổng quản/,()=>ERCOL[3]],[/thủ lĩnh/,()=>ERCOL[2]],[/tiểu thái giám/,()=>ERCOL[0]],[/thái giám|nội giám/,()=>ERCOL[1]],
 [/thái y|ngự y/,()=>KIT_ROLE.ty],[/hoàng tử|thái tử|vương/,()=>KIT_ROLE.prince],[/công chúa/,()=>KIT_ROLE.princess],[/người lạ/,()=>KIT_ROLE.stranger],
 [/tể tướng|tướng quân|thượng thư|học sĩ|quan|thị lang|đại nhân/,()=>KIT_ROLE.official],[/thị vệ|vệ|lính|tướng/,()=>KIT_ROLE.guard]];
function kitRankTone(t,col){const s=String(t==null?"":t).replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim().toLowerCase();
 for(const [re,c] of KIT_RT)if(re.test(s))return kitToneOf(c());return /^#[0-9a-f]{6}$/i.test(col||"")?kitToneOf(col):KIT_ROLE.slate}
/* KIT 48.1g PORTRAIT GROUND .rk-c0..c7 (the round avatar / portrait ground by rank): generated from RCOL (was typed in p1.html + j59, two stale copies) */
(function(){const m=(c,p)=>`color-mix(in srgb,${c} ${p}%,#fff)`;let css="";
 RCOL.forEach((c,i)=>{const bg=i===3||i===4?`repeating-linear-gradient(45deg,${m(c,22)} 0 6px,${m(c,38)} 6px 12px)`:i>=5?`radial-gradient(circle at 30% 20%,${m(c,28)},${m(c,66)})`:`linear-gradient(160deg,${m(c,20)},${m(c,52)})`;
  css+=`.rk-c${i}{background:${bg}!important;border-color:${c}!important${i>=6?`;box-shadow:0 0 0 1px #fff,0 0 0 3px ${m(c,70)},0 3px 10px ${c}55!important`:""}}\n`});
 const st=document.createElement("style");st.id="kit-rk";st.textContent=css;document.head.appendChild(st)})();
window.kitRankTone=kitRankTone;window.KIT_RT=KIT_RT;
/* KIT 48.1b (owner 15/11 ~20:10Z): HER own name (the local player's character only, also in co-op) = black ink + a soft light-gold glow
   (class .kmy on the name line), so she spots herself at once; everybody else's name stays plain ink. kitIsMyName(name) = it is S.name. */
function kitIsMyName(n){try{const s=String(n==null?"":n).replace(/<[^>]*>/g,"").trim();return !!(s&&typeof S!=="undefined"&&S&&S.name&&s===String(S.name).trim())}catch(e){return false}}
window.kitIsMyName=kitIsMyName;
(function(){const st=document.createElement("style");st.id="kit-rt";
 const H=x=>x.map(y=>"html body "+y).join(",");
 const T=H([".krt",".knr>.knr-r",".stage .tok .tag .j59t",".stage #j59metag .tag .j59t",".kpsn .kname .kti",".pc .pcl .pcrk",".kpstrip .kpsn small",".kbk-pname .kname .kti",".kpod-plq .kname .kti"]);
 const N=H([".krn",".knr>.knr-n",".stage .tok .tag .j59n",".stage #j59metag .tag .j59n",".kpsn .kname",".pc .pcl .pcname",".kpstrip .kpsn b",".kbk-pname .kname",".kpod-plq .kname"]);
 /* ON A PAINTING (owner 22:25Z): stage name tags over the scene, captions laid over a picture (.kesov), the kit sample's scene row (.krs) */
 const PT=H([".stage .tok .tag .j59t",".stage #j59metag .tag .j59t","#mb .kesov>.kpsn .kname .kti",".krs .krt",".krs .knr>.knr-r"]);
 const HT=H([".stage #j59metag .tag .j59t",".stage .tok .tag.j59mine .j59t"]);/* HER rank line: brighter than the others */
 const PN=H([".stage .tok .tag .j59n",".stage #j59metag .tag .j59n","#mb .kesov>.kpsn .kname",".krs .krn",".krs .knr>.knr-n"]);
 /* 48.1e GLOW ON PAINTINGS ONLY (owner 11/16 13:55Z, option 1): on a painted background (stage tags, .kesov captions, .krs) EVERY person's RANK line glows in its own rank colour, the NAME line gets the light-gold glow, her tag glows brighter than the others; on paper / frames there is NO edge and NO glow (plain vivid text). */
 st.textContent=`
:root{--krt-ol:#1c100a;--krt-ink:#2a1a12}
${T}{font-family:var(--display,"Noto Serif",Georgia,serif)!important;font-weight:700!important;font-style:normal;letter-spacing:.03em!important;
 color:var(--rt,color-mix(in srgb,var(--rc,var(--tc,#7a5a30)) 80%,#000))!important;text-shadow:none!important;
 background:none!important;box-shadow:none!important;line-height:1.2!important;padding:0 2px!important}
${N}{color:var(--krt-ink)!important;font-weight:700;text-shadow:none!important}
${PT}{color:var(--rt,color-mix(in srgb,var(--rc,var(--tc,#7a5a30)) 80%,#000))!important;/* 48.1d/e: rank line on a painting = its rank tone + a glow in its own rank colour (neon) over a hairline paper rim */
 text-shadow:0 0 1px #fff8ee,0 0 3px var(--tc,var(--rc,var(--rt))),0 0 8px var(--tc,var(--rc,var(--rt)))!important}
${HT}{text-shadow:0 0 1px #fff8ee,0 0 3px var(--tc,var(--rc,var(--rt))),0 0 8px var(--tc,var(--rc,var(--rt))),0 0 14px var(--tc,var(--rc,var(--rt))),0 0 20px var(--tc,var(--rc,var(--rt)))!important}
${PN}{text-shadow:0 0 1px #fff8ee,0 0 3px #ffe9a8,0 0 7px #f3cf6a,0 0 11px #e8bd4a99!important}
html body .kpsn .kname .kti{display:block;font-size:.84rem!important}
/* stage side cards (.ksh .k3c, review/pick-hint-r1): a person's title + name (kitRankNamePaint / kitName) stack as rank line over name,
   like every other card head (48.1), so the side column keeps its width at 755 / 844 */
html body .ksh .k3c .k3ct .kname{display:block;white-space:normal}html body .ksh .k3c .k3ct .kname .kti{display:block;font-size:.84em!important;letter-spacing:0!important;padding:0!important}
html body .kpstrip .kpsn small{order:-1}
html body .knr>.knr-r,html body .stage .tok .tag .j59t,html body .stage #j59metag .tag .j59t{font-size:.84rem!important;margin:0 0 1px!important}
/* KIT 48 small size (review/rel-picker fix by the kit keeper): kitNameRank(rank,name,col,me,true) → .knr.knr-s = rank .66rem over name .72rem (the smallest kit sizes, §2); used by the compact picker strips (§49.2c) */
html body .knr.knr-s>.knr-r{font-size:.66rem!important;margin:0!important;white-space:nowrap}html body .knr.knr-s>.knr-n{font-size:.72rem;white-space:nowrap}
html body .stage .tok .tag .j59t.j59only,html body .stage #j59metag .tag .j59t.j59only{font-size:.92rem!important}
html body .kbk-pname .kname .kti{display:block;font-size:.62em!important;margin:0 0 .1em}
/* stage tags: never a plate (owner 11/13 "figure name labels without background"), also in the compact stage (.j59c) */
html body .stage.j59 #tokens .tok .tag,html body .stage.j59 #j59metag .tag{background:none!important;border:0!important;box-shadow:none!important;padding:0!important}
/* 48.1c (owner 15/11 ~20:40Z): person-dialog captions (kitEventDp .kdpcap, event-stage .kesov captions) have NO box */
html body #mb .kesov>.kpsn,html body #modal .dlg.kdper .kes>.kpsn.kdpcap,html body .kesf>.kpsn{background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important}
/* 48.3 (owner 15/11 session 8): a title INSIDE a line (kitName in prose, picker rows, lists, logs, toasts; kitRankPaint) is in its rank
   tone too — the line's own font, plain: no glow, no outline, no shadow; lightened on .modal.night (below) */
html body .kname .kti{color:var(--rt,inherit)!important;text-shadow:none!important}
html body .modal.night .kname .kti{color:color-mix(in oklch,var(--rt,#7a5a30) 64%,#fff)!important}
/* dark panels (.modal.night): name in parchment, title in its lightened tone (plain, no glow) */
html body .modal.night .kpsn .kname,html body .modal.night .knr>.knr-n,html body .modal.night .krn,html body .modal.night .kbk-pname .kname{color:#f3e6cf!important}
html body .modal.night .krt,html body .modal.night .knr>.knr-r,html body .modal.night .kpsn .kname .kti,html body .modal.night .kbk-pname .kname .kti{color:color-mix(in oklch,var(--rt,#7a5a30) 64%,#fff)!important}
/* 48.1b her own name: black; on a painting + a soft light-gold glow, in framed UI plain black bold */
html body .kmy,html body .modal.night .kmy{color:#1a0f08!important;font-weight:700!important;text-shadow:none!important}
html body .stage .tok .tag .j59n.kmy,html body .stage #j59metag .tag .j59n.kmy,html body #mb .kesov>.kpsn .kname.kmy,html body .krs .krn.kmy,html body .krs .knr>.knr-n.kmy{color:#1a0f08!important;
 text-shadow:0 0 1px #fff6d8,0 0 3px #ffe9a8,0 0 6px #f3cf6a,0 0 11px #e8bd4acc!important}
`;document.head.appendChild(st)})();
(function(){const st=document.createElement("style");st.id="kit-nr";st.textContent=`
.knr{display:flex;flex-direction:column;align-items:center;text-align:center;line-height:1.2;max-width:100%;min-width:0}
.knr>.knr-r{font-size:.74rem;font-weight:600;letter-spacing:.02em;color:color-mix(in srgb,var(--rc,#7a5530) 75%,#2a1a12)}
.knr>.knr-n{font-size:.98rem;color:color-mix(in srgb,var(--rc,#7a5530) 45%,#2a1a12);overflow-wrap:anywhere}
/* person cards (j15 pcard + jk2b layout): the same order — rank line, name, THEN the portrait. Narrow card: the name block is a full row
   above the portrait and the bars (was beside the portrait); wide card: rank above the name, both above the portrait. */
.pc.kpnar[data-k2]>.pcl{grid-template-areas:"nm nm" "por bars" "por fx"!important;grid-template-rows:auto auto 1fr!important}
.pc.kpnar[data-k2]>.pcl>.kpnm{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:0!important;margin:0 0 4px}
.pc.kpnar[data-k2]>.pcl>.kpnm>.pcrk{order:-1}
html body .pc.kpwide[data-k2]>.pcl>.pcrk{order:-4!important;margin:0!important}
html body .pc.kpwide[data-k2]>.pcl>.pcname{align-items:flex-start!important}
`;document.head.appendChild(st)})();
/* ================= KIT 50 · kitEventDp — THE event-with-a-person dialog (owner 11/15) =================
   Every event where a person appears (visits "Có người đến", invitations, confrontations, the Emperor's visits): the 32.7 person dialog
   (LEFT: the people full height, name + rank above — 32.7b / 37; content height — 32.7c) and, when the event has a picture, the picture is a
   landscape BANNER at the top of the RIGHT column (cover-cropped at its focus point KIT_FOCUS[file] || "50% 50%"), then the event text as
   kit rows (no blank dots), then the options: two per row when every option is short (name + at most one row), else one per row. */
(function(){const st=document.createElement("style");st.id="kit-event-dp";st.textContent=`
#modal .dlg.kdper.kdpbanner>#mb{grid-template-rows:max-content max-content minmax(0,1fr)!important}
#modal .dlg.kdper>#mb>.kdlgart.kdpban{grid-column:2!important;grid-row:1!important;margin:0 0 8px!important;padding:0!important;min-width:0;width:auto!important;height:auto!important;max-height:none!important}
html body #modal .dlg.kdper>#mb>.kdlgart.kdpban>.ksart{width:100%!important;height:clamp(96px,24vh,190px)!important;min-height:0!important;max-height:none!important;aspect-ratio:auto!important;margin:0!important}
html body #modal .dlg.kdper>#mb>.kdlgart.kdpban>.ksart img{width:100%!important;height:100%!important;object-fit:cover!important}
#modal .dlg.kdper.kdpbanner>#mb>.kpb>.kpmain,#modal .dlg.kdper.kdpbanner>#mb>.kdpr:not(.kdlgart){grid-column:2}
html body #modal .dlg.kdper>#mb>.opts.kdpo2,html body #modal .dlg.kdper>#mb>.opts.kdpo2.k3grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;align-content:start;gap:8px}
/* 50.1: a kdpo2 group is all short by KIT 50 (≤ 2 rows): no 32.9 "long" full-width cell / reorder inside it; the natural height is measured
   from the right column's own parts (kitDpNat: banner + text + the options' content), so the dialog fits its options instead of scrolling them */
html body #modal .dlg.kdper>#mb>.opts.kdpo2.kdpo2>button.ka.k3long,html body #modal .dlg.kdper>#mb>.opts.kdpo2.kdpo2>button.ka.k3odd{grid-column:auto!important;order:0!important}

`;document.head.appendChild(st)})();

/* ================= KIT 32.10 · CLOSING A PANEL — ✕ + tap outside + Esc, once for every panel (owner 11/15: no "Thôi" / "Lui" / "Đóng" /
   "Đã hiểu" buttons that only close) =================
   #modal (every dialog / card / place card / person card / shop / Tư trang card / title pages): after each render kitCloseSync() looks for
   the way this panel closes —
   · a dialog with options: the option that only closes (j3 kitCancelIx: "Thôi" / "Lui" / "Đóng" / "Đã hiểu", no effect) — j3 never draws
     it; ✕ runs it through chooseM (its go / wrappers run as before);
   · a card without options: the button row's close word ("Đã hiểu", "Lui", "‹ Lui", "Đã rõ") — hidden, ✕ clicks it (onClose runs);
     a card whose only button means something ("Tạ ơn", "Cúi đầu", "Chuyển kiếp", "Tiếp tục"…) keeps it and gets no ✕;
   · none of these = a FORCED panel (an event that must be chosen): no ✕, a tap outside does nothing, Esc does nothing.
   Closable → ONE kit-x at the top right of the header (.kph; a card without .kph: the dialog's own top-right corner), a tap on the dimmed
   ground outside the box closes (only when the press STARTED on the ground and did not move: a drag / scroll that ends outside never
   closes), Esc closes. kitCloseLayer(root, box, close) gives other overlays (kitBook, game results, the room person card) the same. */
const KIT_XW=/^(?:✕\s*)?(?:‹\s*)?(Thôi|Lui|Đóng|Đã hiểu|Đã rõ|OK|Xong)$/;
function kitModalCloser(){const M=document.getElementById("modal");if(!M||M.hidden)return null;
 const mr=document.getElementById("mr");
 const rowB=mr?[...mr.querySelectorAll("button")]:[];const xb=rowB.filter(b=>b.dataset.kxw==="1"||KIT_XW.test(kitCloseTxt(b.textContent)));
 if(xb.length){xb.forEach(b=>{if(!b.hidden)b.hidden=true;if(b.dataset.kxw!=="1")b.dataset.kxw="1"});const b=xb[0];return()=>b.click()}
 const m=typeof Q!=="undefined"?Q[0]:null;const onQ=m&&!M.classList.contains("kptitle");
 if(onQ&&m.opts){const i=kitCancelIx(m);if(i>=0)return()=>chooseM(i)}
 return null}
function kitModalClose(){const M=document.getElementById("modal");if(!M||M.hidden)return false;const f=M.__kx||kitModalCloser();if(!f)return false;f();return true}
function kitCloseSync(){try{const M=document.getElementById("modal");if(!M)return;const dlg=M.querySelector(".dlg");if(!dlg)return;
 const f=M.hidden?null:kitModalCloser();M.__kx=f;const kx=f?"1":"0";if(M.dataset.kx!==kx)M.dataset.kx=kx;
 const old=dlg.querySelectorAll(".kit-x[data-kitx=panel]");
 if(!f){old.forEach(x=>x.remove());return}
 const hasHead=!!dlg.querySelector(":scope > .kph");old.forEach(x=>{if(hasHead?!x.parentElement.matches(".kph"):!x.classList.contains("kxabs"))x.remove()});
 kitXAdd(dlg)}catch(e){console.error("kitCloseSync",e)}}
window.kitModalClose=kitModalClose;window.kitCloseSync=kitCloseSync;
/* the same for any other overlay: root = the dimmed full-screen layer, box = the panel, close = what closing does */
const KIT_LAYERS=[];
function kitCloseLayer(root,box,close,o){o=o||{};if(!root||root.__kxl)return;root.__kxl={box,close,pri:o.pri||0};KIT_LAYERS.push(root);
 let down=null;root.addEventListener("pointerdown",e=>{down=(e.target===root||(o.ground&&e.target.matches(o.ground)))?{x:e.clientX,y:e.clientY,t:Date.now()}:null},true);
 root.addEventListener("click",e=>{const d=down;down=null;if(!d||!(e.target===root||(o.ground&&e.target.matches(o.ground))))return;
  if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>10||Date.now()-d.t>900)return;e.stopPropagation();close()})}
window.kitCloseLayer=kitCloseLayer;
(function(){const M=document.getElementById("modal");if(!M)return;
 /* after every render (outermost wrapper: installed once every module has loaded) and whenever the button row / header changes */
 setTimeout(()=>{const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);kitCloseSync();return r}},0);
 let q=0;new MutationObserver(()=>{if(q)return;q=1;Promise.resolve().then(()=>{q=0;kitCloseSync()})}).observe(M,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden"]});
 let down=null;
 M.addEventListener("pointerdown",e=>{down=e.target===M&&M.__kx?{x:e.clientX,y:e.clientY,t:Date.now()}:null},true);
 M.addEventListener("click",e=>{const d=down;down=null;if(!d||e.target!==M)return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>10||Date.now()-d.t>900)return;e.stopPropagation();kitModalClose()})})();
/* Esc: the top-most open closable panel (another overlay over the dialog first, then the dialog, then the room person card) */
document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;setTimeout(()=>{if(e.defaultPrevented||document.body.classList.contains("kbk-open"))return;
 if([...document.querySelectorAll(".kpod")].some(x=>x.offsetParent))return;
 const L=KIT_LAYERS.filter(r=>r.isConnected&&!r.hidden&&getComputedStyle(r).display!=="none"&&r.__kxl.box()).sort((a,b)=>b.__kxl.pri-a.__kxl.pri);
 if(L.length){e.preventDefault();L[0].__kxl.close();return}
 if(kitModalClose()){e.preventDefault();return}
 const px=document.getElementById("popx");if(px&&px.offsetParent){e.preventDefault();px.click()}},0)});
/* game / lesson results in #ov (kg82 "Đã hiểu", j92 Chải chuốt, the old j5 "Xong"): the result card closes with ✕ / tap outside / Esc,
   which press that button (its own handler applies the result as before); while the game runs there is no ✕ */
/* (review kit-fig2 11/15, LUẬT SỬA CẢ NHÓM "overlay never closes"): only the result button of the panel ON SCREEN counts — a button left in a
   panel another game hid (the j5 lesson panel under kg82) is never pressed (it carried an old lesson's callback: the result twice). */
function kitOvBtn(){const ov=document.getElementById("ov");if(!ov||ov.hidden)return null;const b=[...ov.querySelectorAll("#kg82ok, #kg92ok, #mgok")].find(x=>{if(!x.isConnected)return false;const pan=[...ov.children].find(c=>c.contains(x));return !(pan&&pan.hidden)});return b||null}
/* #ov hygiene: the j5 lesson controls exist only while a j5 lesson game is up (#mgskip hidden otherwise); a game panel that closes leaves #ov
   hidden when nothing else is on screen, and a lesson left in S.mg with no game on screen is ended (no lesson can start while S.mg is set). */
(function(){const sk=document.getElementById("mgskip");if(sk&&typeof mgDone!=="undefined"&&mgDone)sk.hidden=true;
 const ov=document.getElementById("ov");if(!ov)return;
 const live=()=>[...ov.children].some(c=>!c.hidden&&(c.id==="kg82"||c.id==="kg92"||!c.classList.contains("mg")||(typeof mgDone!=="undefined"&&!mgDone)));
 new MutationObserver(()=>{try{if(ov.hidden)return;if(!live()){ov.hidden=true}}catch(e){}}).observe(ov,{childList:true,attributes:true,attributeFilter:["hidden"],subtree:false});
 if(typeof resumeMG==="function"){const r0=resumeMG;resumeMG=function(){let r;try{r=r0.apply(this,arguments)}catch(e){console.error("resumeMG",e)}try{if(S&&S.mg&&ov.hidden){console.warn("lesson game did not open; S.mg cleared",S.mg);S.mg=null}}catch(e){}return r};window.resumeMG=resumeMG}
 if(typeof kg82Close==="function"){const c0=kg82Close;kg82Close=function(){const r=c0.apply(this,arguments);try{if(!ov.hidden&&!live())ov.hidden=true}catch(e){}return r};window.kg82Close=kg82Close}})();
function kitOvSync(){try{const b=kitOvBtn();if(!b)return;if(!b.hidden)b.hidden=true;const row=b.parentElement;if(row&&row!==b.closest(".kpanel,.mg")&&![...row.children].some(c=>!c.hidden)&&!row.hidden)row.hidden=true;
 const pan=b.closest("#kg82, .mg")||b.closest(".kpanel");if(!pan||pan.querySelector(".kit-x[data-kitx=ov]"))return;const h=pan.querySelector(".kph");
 const html=kitXHTML('data-kitx="ov"');if(h){if(getComputedStyle(h).position==="static")h.style.position="relative";h.insertAdjacentHTML("beforeend",html)}else{pan.style.position=pan.style.position||"relative";pan.insertAdjacentHTML("afterbegin",html);pan.firstElementChild.classList.add("kxabs")}
 const x=pan.querySelector(".kit-x[data-kitx=ov]");x.addEventListener("click",e=>{e.stopPropagation();e.preventDefault();const c=kitOvBtn();if(c)c.click()})}catch(e){console.error("kitOvSync",e)}}
(function(){const ov=document.getElementById("ov");if(!ov)return;let q=0;new MutationObserver(()=>{if(q)return;q=1;Promise.resolve().then(()=>{q=0;kitOvSync()})}).observe(ov,{childList:true,subtree:true});
 kitCloseLayer(ov,()=>kitOvBtn(),()=>{const c=kitOvBtn();if(c)c.click()},{pri:2})})();
/* the person card opened from the room (#popw, KIT 28.18): its ✕ is #popx; a tap on the empty scene closes it too */
(function(){const st=document.getElementById("stage");if(!st)return;let dn=null;const free=t=>!t.closest("button,a,input,.pop,#popw,[data-p],.k3p,.hud2");
 st.addEventListener("pointerdown",e=>{dn=free(e.target)?{x:e.clientX,y:e.clientY,t:Date.now()}:null},true);
 st.addEventListener("click",e=>{const d=dn;dn=null;if(!d||!free(e.target))return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>10||Date.now()-d.t>900)return;
  const px=document.getElementById("popx");if(px&&px.offsetParent)px.click()})})();
(function(){const st=document.createElement("style");st.id="kit-x-close";st.textContent=`
#modal .dlg:has(>.kit-x.kxabs){position:relative}
#modal .dlg>.kit-x.kxabs{position:absolute;top:8px;right:8px;z-index:9}
#modal .dlg.kpanel:has(>.kit-x.kxabs){overflow:auto}
#modal[data-kx="1"] .dlg>#mr:not(:has(>:not([hidden]))){display:none!important}
#modal .dlg>#mr>[hidden],#ov [hidden]{display:none!important}
#ov .kph>.kit-x{position:absolute;right:10px;top:50%;transform:translateY(-50%);margin:0}
#ov .kit-x.kxabs{position:absolute;top:8px;right:8px;z-index:9}
`;document.head.appendChild(st)})();

/* ================= KIT 32.10 · THE TAP CATCHER (owner 11/15: "the outside tap closed the result card AND ran the act under it") =================
   A closable card that floats WITHOUT its own dimmed ground (the act result card #rtoast — THÀNH / HỎNG / BẤT LỢI) gets a full-screen
   transparent catcher (#kxcatch) right under it while it is open. The first tap outside the card ONLY closes it: pointerdown, touchstart,
   touchend, mousedown, mouseup and click on the catcher are all swallowed (preventDefault + stopPropagation), nothing underneath fires, and
   the catcher stays 400 ms after the close to eat a late ghost click. Dialogs (#modal), the book and game results already have their own
   full-screen ground that closes on a real tap (kitCloseSync / kitCloseLayer) — the same rule: the tap is spent on closing. */
function kitCatchOn(card,close){let c=document.getElementById("kxcatch");if(!c){c=document.createElement("div");c.id="kxcatch";c.setAttribute("aria-hidden","true");document.body.appendChild(c)
  const eat=e=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()};
  /* the close happens on the release (pointerup / touchend), never on the later click: a touch whose touchend is cancelled sends no click;
     the catcher then stays 400 ms and eats the click / ghost click that may still come */
  const shut=()=>{if(!c.__close||c.__closing)return;c.__closing=1;try{c.__close()}catch(x){}setTimeout(()=>{c.hidden=true;c.__closing=0;c.__close=null},400)};
  ["pointerdown","touchstart","mousedown","mouseup","contextmenu","click","dblclick"].forEach(t=>c.addEventListener(t,eat,{passive:false}));
  c.addEventListener("pointerup",e=>{eat(e);shut()},{passive:false});c.addEventListener("touchend",e=>{eat(e);shut()},{passive:false})}
 const z=parseInt(getComputedStyle(card).zIndex)||45;c.style.zIndex=String(z-1);c.__close=close;c.__closing=0;c.hidden=false}
function kitCatchOff(){const c=document.getElementById("kxcatch");if(c&&!c.__closing){c.hidden=true;c.__close=null}}
window.kitCatchOn=kitCatchOn;window.kitCatchOff=kitCatchOff;
(function(){let obs=null;const watch=t=>{if(!t||t.__kxw)return;t.__kxw=1;
  const sync=()=>{const on=t.classList.contains("on")&&!t.hidden&&getComputedStyle(t).visibility!=="hidden";if(on)kitCatchOn(t,()=>{t.classList.remove("on");clearTimeout(window.__rtT)});else kitCatchOff()};
  new MutationObserver(sync).observe(t,{attributes:true,attributeFilter:["class","hidden"]});sync()};
 const find=()=>watch(document.getElementById("rtoast"));find();
 obs=new MutationObserver(()=>{if(document.getElementById("rtoast")){find();obs.disconnect()}});obs.observe(document.body,{childList:true})})();
/* ================= KIT 32.10a · A FLOATING CARD NEVER COVERS A DIALOG (review/small-bugs-3; owner shot 844x390: the result card sat on the
   dialog's option buttons and its tap catcher ate the first tap) =================
   While any dialog is open (#modal, every [role=dialog] layer: reward box, game frame, book, item sheet, podium…) the floating cards — the act
   result card #rtoast and the one-line pill #kupdline (kitLine) — are PARKED: hidden, no tap catcher. When the last dialog closes, a parked
   result card comes back with a fresh timer (its lines are also in Sổ ghi). One body class `kdlg-on`, set by kitDialogOpen(). */
function kitDialogOpen(){for(const d of document.querySelectorAll('#modal,[role="dialog"]')){if(d.closest("#rtoast,#kupdline"))continue;
  if(d.id==="modal"){if(!d.hidden&&getComputedStyle(d).display!=="none")return true;continue}
  if(d.closest("#modal"))continue;if(!d.getClientRects().length)continue;const cs=getComputedStyle(d);if(cs.visibility==="hidden"||+cs.opacity===0)continue;return true}return false}
window.kitDialogOpen=kitDialogOpen;
(function(){let pend=0,on=false;const css=document.createElement("style");css.id="kit-dlg-park";
 css.textContent="body.kdlg-on #rtoast,body.kdlg-on #kupdline{visibility:hidden!important;pointer-events:none!important;transition:none!important}";document.head.appendChild(css);
 const sync=()=>{pend=0;const d=kitDialogOpen();if(d===on)return;on=d;document.body.classList.toggle("kdlg-on",d);const t=document.getElementById("rtoast");
  if(d){if(typeof kitCatchOff==="function")kitCatchOff();return}
  if(t&&t.classList.contains("on")&&!t.hidden){clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),7000);
   if(typeof kitCatchOn==="function")kitCatchOn(t,()=>{t.classList.remove("on");clearTimeout(window.__rtT)})}};
 const kick=()=>{if(!pend)pend=requestAnimationFrame(sync)};
 const go=()=>{new MutationObserver(kick).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["hidden","class"]});kick()};
 if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();
/* the result card's own catcher never turns on under an open dialog */
(function(){const k0=window.kitCatchOn;if(typeof k0!=="function")return;window.kitCatchOn=kitCatchOn=function(card){if(card&&card.id==="rtoast"&&document.body.classList.contains("kdlg-on"))return;return k0.apply(this,arguments)}})();
(function(){const st=document.createElement("style");st.id="kit-catch";st.textContent=`
#kxcatch{position:fixed;inset:0;background:transparent;touch-action:none;-webkit-tap-highlight-color:transparent}
#kxcatch[hidden]{display:none!important}
`;document.head.appendChild(st)})();
/* ================= KIT 43 · kitActCompact (cherry-picked from review/kit-fig2 3e212597e by tabs-kit r7; kit-fig2 KIT §39 → §42 → §43, reviewer r7: main close-bugs owns §42) — act cards in a NARROW pane beside a portrait / figure (owner 11/15: "the act picture squeezes the
   text into a thin column") =================
   Panes that hold a person on the left (person card `.pc > .pcr`: Hậu cung · Thánh thượng / Phi tần / Cung nhân "Việc hôm nay", Hoàng tự
   child cards) are inline-size containers named `kpane`. When the pane is under 640 px wide every act card (`button.ka.kart`) inside it
   takes the compact form — ONE CSS rule set, no other markup:
   - LEFT: the same act picture as a SMALL PORTRAIT RECTANGLE 3:4 (84x112 px; 72x96 under 420 px; owner 16/11, was a square), cover-cropped, 2 px border in its category colour
     (`--kcc0`); the frame ornaments / category ribbon of the big slot are hidden (the card keeps its 4 px category edge).
   - RIGHT (≥ 60 % of the card): title row = title + odds ladder on ONE line (the title may wrap, the odds never); a ONE-line description
     (full text on hover / long-press title); the Cần / Tốn / Được / Mất / Kèm rows as compact label + value chips that wrap as WHOLE chips.
   - Cards stack vertically, one card per row. `kitActCompactOn(root)` adds the description tooltips after a render.
   (tabs-kit r7) `.kpanec` = any other act area that sits in a narrow column (skill card acts, Việc nhờ) is a kpane too: same rules. */
/* owner 11/15: the person-card acts (Gặp mặt / Giao thiệp / Hại nhỏ … — plain button.ka) get THEIR OWN act picture (ACTS.json key via
   kitActKey → kpActArt). No own picture → NO thumbnail (owner: never a category / group picture as a stand-in): the text takes the full width.
   The same rule for every act card inside a kpane (a deck card whose only picture is its category picture loses the thumbnail there). */
function kitActCompactOn(root){try{const R0=root||document;
 R0.querySelectorAll(".pc>.pcr button.ka, .kpanec button.ka").forEach(b=>{try{const kan=b.querySelector(".kan");if(!kan)return;const nm=typeof kpActName==="function"?kpActName(kan):kan.textContent.trim();
   const key=typeof kitActKey==="function"?kitActKey(nm):"";const has=!!key||(typeof kitPhActReady==="function"&&kitPhActReady());/* KIT §59: no own picture → the placeholder (jph) */b.classList.toggle("kanoart",!has);if(has&&!b.classList.contains("kart")&&typeof kpActArt==="function"){delete b.dataset.kart;kpActArt(b)}}catch(e){}});
 R0.querySelectorAll(".pc>.pcr button.ka.kart .klead, .kpanec button.ka.kart .klead").forEach(e=>{if(!e.title)e.title=e.textContent.trim()})}catch(e){}}
window.kitActCompactOn=kitActCompactOn;
/* owner 11/15 14:30Z + 15:45Z ("no group images"): EVERY act card (Hành sự deck, person cards, Ân oán, panes) shows its OWN act picture only.
   No own picture (ACTS.json key via kitActKey) → no picture at all: no act-cat-* category picture, no brocade category tile; the card is
   marked .kanoart and its text takes the full width. (kitActArt keeps returning cat / label for the category edge colour.) */
(function(){if(typeof kitActArt!=="function")return;const k0=kitActArt;kitActArt=function(name){const r=k0.apply(this,arguments);try{const key=typeof kitActKey==="function"?kitActKey(name):"";if(!key&&r)r.src=""}catch(e){}return r};window.kitActArt=kitActArt;
 if(typeof kpActArt!=="function")return;const p0=kpActArt;kpActArt=function(b){const r=p0.apply(this,arguments);try{const kan=b.querySelector(".kan");const nm=kan?(typeof kpActName==="function"?kpActName(kan):kan.textContent.trim()):"";
  const own=!!(nm&&typeof kitActKey==="function"&&kitActKey(nm))||(typeof kitPhActReady==="function"&&kitPhActReady());/* KIT §59: the placeholder stands in */b.classList.toggle("kanoart",!own);if(!own){const a=b.querySelector(":scope > .kaart");if(a)a.remove();b.classList.remove("kart")}}catch(e){}return r};window.kpActArt=kpActArt})();
(function(){if(typeof render!=="function")return;const r0=render;render=function(){const r=r0.apply(this,arguments);try{kitActCompactOn(document.getElementById("panel"))}catch(e){}return r};window.render=render})();
/* ================= KIT 43.1 · small act card: tap the picture = big picture + more info; "!" on cards without an odds label (owner 16/11, review/actcard-small) =================
   Owner: keep the big Hành sự card; the SMALL card (kpane form above) has a 3:4 portrait picture. Tap the picture (or the "!" mark of a card
   that has no odds label) → kitActZoom: the picture large + full description + the Cần/Tốn/Được rows (+ "Vì sao <bậc>?" when the card has odds).
   Tapping the odds label itself keeps opening the why popover (jwhy). Option cards (.kopt, review/opt-pics) are not touched here. */
function kitActZoom(b){try{const im=b.querySelector(":scope > .kaart img");const src=im?im.getAttribute("src"):"";const kan=b.querySelector(".kan");const ttl=kan?(typeof kpActName==="function"?kpActName(kan):kan.textContent.trim()):"";
 const lead=b.querySelector(".klead");const kb=b.querySelector("small.kb");const od=b.querySelector(".kodm");let why="";
 if(od&&typeof kitWhyHtml==="function"){try{why=kitWhyHtml(b,+od.dataset.kodds)||""}catch(e){}}
 const secs=[];if(od)secs.push({h:"",html:od.outerHTML});if(lead)secs.push({h:"",html:`<div class="kpnote">${lead.textContent}</div>`});if(kb)secs.push({h:"",html:kb.outerHTML});if(why)secs.push({h:"",html:why});
 kitModal({kind:"info",title:ttl,sub:"",sections:secs,btn:"Đã rõ"});
 if(src){const a=document.querySelector("#modal .kpiart");if(a)a.innerHTML=kitArtFrame(src,ttl)}}catch(e){console.error(e)}}
window.kitActZoom=kitActZoom;
function kitActInfoMark(root){try{(root||document).querySelectorAll(".pc>.pcr button.ka.kart:not(.kopt), .kpanec button.ka.kart:not(.kopt)").forEach(b=>{const kat=b.querySelector(".kat");if(!kat)return;
  const has=!!b.querySelector(".kodm");let m=kat.querySelector(":scope > .kainfo");if(has){if(m)m.remove();return}if(!m){m=document.createElement("span");m.className="kainfo ktinfo";m.innerHTML='<span class="kgl">ⓘ</span>';m.title="Xem thêm";m.setAttribute("role","button");kat.appendChild(m)}})}catch(e){}}
window.kitActInfoMark=kitActInfoMark;
window.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;const hit=t.closest(".pc>.pcr button.ka.kart:not(.kopt) > .kaart, .kpanec button.ka.kart:not(.kopt) > .kaart, button.ka.kart:not(.kopt) .kainfo");if(!hit)return;
 const b=hit.closest("button.ka");if(!b||!b.closest(".pc>.pcr, .kpanec"))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();kitActZoom(b)}catch(x){}},true);
(function(){const k0=kitActCompactOn;kitActCompactOn=function(root){const r=k0.apply(this,arguments);try{kitActInfoMark(root)}catch(e){}return r};window.kitActCompactOn=kitActCompactOn})();
/* KIT §43 + §6.2 (review/opt-pics): the compact card rules are ONE string (kitCompactCSS(B)) used twice: inside a narrow kpane, and ALWAYS for a
   dialog option card (B = button.ka.kart.kopt, jopic) — the one compact act-card form game-wide. w × h = picture box: owner override 15/11 — the small card's picture is a 3:4 PORTRAIT RECTANGLE (84x112;
   72x96 in a pane under 420 px), the act art's own aspect, never a square crop; the big Hành sự card is untouched. */
function kitCompactCSS(B,w,h){w=w||84;h=h||w;return `
 ${B}{--kaw:${w}px!important;--kah:${h}px!important;display:flex!important;flex-direction:row!important;align-items:flex-start!important;gap:10px!important;width:100%!important;min-width:0!important;max-width:none!important;padding:8px 10px!important}
 ${B}>.kaart{flex:0 0 ${w}px!important;width:${w}px!important;height:${h}px!important;border-radius:6px!important;overflow:hidden!important;box-shadow:0 0 0 2px var(--kcc0,#b08a4a)!important;background:#efe4cc!important}
 ${B}>.kaart>.ksart{width:100%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}
 ${B}>.kaart>.ksart>:not(img){display:none!important}
 ${B}>.kaart>.ksart>img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;border:0!important;border-radius:0!important;margin:0!important}
 ${B}>.kabody{flex:1 1 auto!important;min-width:0!important;gap:3px!important}
 ${B} .kat{flex-wrap:nowrap!important;align-items:flex-start!important;gap:6px!important}
 ${B} .kat>.kan{flex:1 1 auto!important;min-width:0!important}
 ${B} .kat>:not(.kan){flex:0 0 auto!important;white-space:nowrap!important}
 ${B} .klead{display:-webkit-box!important;-webkit-box-orient:vertical!important;-webkit-line-clamp:1!important;overflow:hidden!important}
 /* KIT §51 (kit-table r6): the Cần/Tốn/Được rows stay ONE kit table (j63 .kb grid, rows display:contents) so every value starts at the
    same x; only the value cell flows its chips. (Was a flex chip flow: short values sat beside the label, long ones under it.) */
 ${B} small.kb{display:grid!important;grid-template-columns:fit-content(var(--kt-lab,max(34%,7rem))) minmax(0,1fr)!important;column-gap:6px!important;row-gap:2px!important}
 ${B} small.kb>.kr>.krl{font-size:.66rem!important;align-self:baseline}
 ${B} small.kb>.kr>.krv{display:flex!important;flex-wrap:wrap!important;gap:2px 4px!important;min-width:0!important}
 ${B} small.kb>.kr>.krv>*{display:inline-block!important;white-space:normal!important;max-width:100%!important;overflow-wrap:anywhere}
 ${B} small.kb>.kr>.krv>.ksep{display:none!important}

`}
window.kitCompactCSS=kitCompactCSS;
(function(){const st=document.createElement("style");st.id="kit-act-compact";st.textContent=`
button.ka.kanoart>.kaart{display:none!important}
.pc>.pcr,.kpanec{container:kpane/inline-size}
@container kpane (max-width:640px){
 button.ka.kanoart>.kaart{display:none!important}
 .pcb:has(> button.ka.kart),.cards:has(> button.ka.kart){display:flex!important;flex-direction:column!important;gap:8px!important;grid-template-columns:none!important}
${kitCompactCSS("button.ka.kart",84,112)}
}
@container kpane (max-width:420px){
 button.ka.kart{--kaw:72px!important;--kah:96px!important}
 button.ka.kart>.kaart{flex-basis:72px!important;width:72px!important;height:96px!important}
}
`;document.head.appendChild(st)})();
/* ================= KIT §6.3 · PERSON-CARD ACT ROWS (owner 16/11, iPad shot: Tâm sự / Sai đi dò la / Nghe ngóng chung drawn as tall boxes in a 2-column
   grid, text clipped, uneven heights; review/pcard-actrow) =================
   ONE rule for every act a person card offers (stage pop-up .pcpop, Hậu cung / Giao tình / court / staff / kids cards = `.pc > .pcr`), at EVERY width
   (not only inside the narrow-pane container query): the act is the §6.2 LONG HORIZONTAL OPTION ROW = the compact act card (kitCompactCSS) — picture left,
   title + odds ladder, Cần / Tốn / Được / Mất rows right — ONE per line, full width, never a grid cell, never clipped (a card with more text grows).
   Where the act has no picture of its own the §59 placeholder stands in (kitActCompactOn); the pop-up is processed too (it is not inside #panel):
   kaNorm → kitActCompactOn(root) after every normalisation pass, so no place has to call it by hand. The Hành sự deck (.cards in #panel, its own kit part)
   and dialog options (.kopt, §6.2) are not touched. */
(function(){const st=document.createElement("style");st.id="kit-pcard-actrow";st.textContent=`
.pc>.pcr .pcb:has(> button.ka),.pc>.pcr .rbtn:has(> button.ka){display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;gap:8px!important;grid-template-columns:none!important;align-items:stretch!important}
.pc>.pcr .pcb>button.ka,.pc>.pcr .rbtn>button.ka{width:100%!important;min-width:0!important;max-width:none!important;height:auto!important;min-height:0!important;flex:0 0 auto!important;box-sizing:border-box}
.pc>.pcr button.ka.kanoart>.kaart{display:none!important}
${kitCompactCSS(".pc>.pcr button.ka.kart",84,112)}
@container kpane (max-width:420px){
 .pc>.pcr button.ka.kart{--kaw:72px!important;--kah:96px!important}
 .pc>.pcr button.ka.kart>.kaart{flex-basis:72px!important;width:72px!important;height:96px!important}
}
`;document.head.appendChild(st)})();
(function(){if(typeof kaNorm!=="function")return;const k0=kaNorm;kaNorm=function(root){const r=k0.apply(this,arguments);try{kitActCompactOn(root&&root.querySelectorAll?root:document)}catch(e){}return r};window.kaNorm=kaNorm})();
