
/* ================= jk4: KIT 4 (kit owner #3, owner 11/14) — ONE STAT CELL + ONE STAT ROW (KIT 32) =================
   Owner: "the shared kit — why do workers draw their own?" Every place a number stat (Sắc · Tài · Tâm cơ · Đức · Bạc · Sức · Sủng · Danh …)
   is shown as a cell uses kitStatCell; every row of them is a kitStatRow. A cell = TWO lines with fixed line boxes:
     label line (icon + name)  — height --kst-l, one font size
     number line (the value)   — height --kst-n, one font size (display face, tabular numbers)
     bar slot (optional 0–100 bar, kept as an empty slot when there is none, so every cell has the same height)
   Because every cell has the same line boxes and every group starts at the same top, ALL label lines share one baseline and ALL number
   lines share one baseline, across groups (measured by dev/test/kit_dupes.js + the kit sweep).
   The top bar's two groups (Tư chất | Bạc · Sức · Sủng · Danh) are static markup in p1.html written in this exact form (so early renders
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
function kitStatSet(c,v,o){if(!c)return;o=o||{};const s=c.querySelector(".kstv");const t=v==null?"":String(v);if(s&&s.textContent!==t)s.textContent=t;
 if(o.bar!=null){const u=c.querySelector(".kstb u");if(u)u.style.width=Math.max(0,Math.min(100,+o.bar||0))+"%"}
 if(o.title!=null&&c.title!==o.title)c.title=o.title;
 let w=c.querySelector(".kstw");if(o.warn&&!w){w=document.createElement("i");w.className="kstw";c.insertBefore(w,c.querySelector(".kstb"));w.textContent="!"}
 if(w){if(o.warn)w.setAttribute("aria-label",o.warn);else w.remove()}}
/* kitStatRow([{id,cls,title,cells:[html…]}…],{id,cls}) → HTML: groups side by side, divided by a hairline */
function kitStatRow(groups,o){o=o||{};return `<div class="kstrow${o.cls?" "+o.cls:""}"${o.id?` id="${o.id}"`:""}>${groups.map(g=>`<div class="kstg${g.cls?" "+g.cls:""}"${g.id?` id="${g.id}"`:""}${g.title?` title="${kitStatEsc(g.title)}"`:""}>${g.cells.join("")}</div>`).join("")}</div>`}
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
.k3tc .k3tt .kstl .k3r{display:inline-block;vertical-align:top;font-size:.7rem;line-height:var(--kst-l);height:var(--kst-l)}.k3tc .k3tt .kstl .k3r>*{vertical-align:baseline}.k3tc .k3tt .kstl .k3dots{display:inline-flex;vertical-align:-1px;margin-left:5px}
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
 #kstrow>.kstg{flex:1 1 0;grid-auto-columns:minmax(0,1fr);column-gap:4px}
}
/* phones < 600 px: the same row, label line = icon only (name in the tooltip), number line below */
@media (max-width:599px){
 html body header.hud{grid-template-columns:auto minmax(0,1fr)!important;grid-template-areas:"menu me" "tc tc" "stats stats"!important}
 html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"menu me room" "tc tc tc" "stats stats stats"!important}
 html body header.hud>#k3tc{justify-self:stretch}
 .k3tc .k3tt{grid-template-rows:auto!important;grid-auto-flow:column;justify-content:start;gap:0 12px!important}
 .k3tt>.kstl,.k3tt>.kstv{height:24px;line-height:24px;font-size:.7rem;font-family:var(--body,inherit)}.k3tc .k3tt .kstl .k3r{height:24px;line-height:24px}
 #kstrow>.kstg+.kstg{padding-left:6px}#kstrow{gap:0 6px}
 #kstrow .kst>.kstl{font-size:0;gap:0}#kstrow .kst>.kstl img.ic{width:16px;height:16px}
}
`;document.head.appendChild(st)})();
