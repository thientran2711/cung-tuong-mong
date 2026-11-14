
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
/* a short helper line (".kphelp": "Mới biết tên ⓘ") opens its full text on tap too (touch has no hover tooltip) */
document.addEventListener("click",e=>{const h=e.target.closest&&e.target.closest(".kphelp");if(!h||!h.title||typeof kpPop!=="function")return;e.stopPropagation();try{kpPop(h,`<div class="kpopt">${kitStatEsc(h.title)}</div>`)}catch(x){}},true);

/* ---------- KIT 32.2 kitEventStage (owner 11/14 23:50Z, approved): big events and the week book show the people FULL-BODY, standing big
   beside the text, under a wide scene band (the event / header picture), with the option group below (optLayout rows/grid, KIT 31.16).
   Used automatically by every kit panel whose subject is a person (weekly events with a main actor, Mệnh truyện chapters, night / thị tẩm,
   person-act reports, succession) and by the week book's person pages (kitStageFig). A dialog may name its people: stage:[p1,p2] (max 2).
   Figures: kitFigOf(p) (right tier / age band / unknown silhouette) + the scar / veil overlays laid on the drawn figure (kitFxLayers; a rash
   overlay is picked up the same way when KIT_RASH exists). Band: headArt (31.16) or the event picture (kitEvArt), in its category frame. ---------- */
function kitStageFig(p,o){o=o||{};try{if(!p)return"";const q=p.__kp||p;const src=typeof kitFigOf==="function"?kitFigOf(q):"";if(!src)return"";
 let fx="";try{if(typeof kitFxLayers==="function"&&!/unknown-fig/.test(src))fx=kitFxLayers(q,kitFile(src));if(window.KIT_RASH&&KIT_RASH.on&&KIT_RASH.on(q)&&KIT_RASH.style){const st=KIT_RASH.style(kitFile(src));if(st)fx+=`<img class="kscar krash" src="${KIT_RASH.src(q)}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`}}catch(e){}
 let nm="";if(o.cap!==false){try{nm=typeof kitName==="function"?kitName(q,{cap:true}):(q.name||"")}catch(e){nm=q.name||""}}
 /* KIT 33 KIT_FIG: one scale for both people of an event — the tallest (an adult man) fills the box, women ×1/man, children by age */
 let kfr=1;try{kfr=KIT_FIG.fac(src,typeof q.age==="number"?q.age:20)/KIT_FIG.man}catch(e){}
 return `<figure class="kesf"><span class="kesfi"><img class="kesimg" style="--kfr:${kfr.toFixed(3)}" src="${src}" alt="" decoding="async" onerror="kitImgErr(this,{sel:'.kesf',cls:'kesno'})">${fx?`<span class="kfxf kesfx">${fx}</span>`:""}</span>${nm?`<figcaption class="kpsn">${nm}</figcaption>`:""}</figure>`}catch(e){return""}}
function kitStagePeople(m){if(!m)return[];let L=[];const sp=m.stage||(m.kit&&m.kit.stage);
 if(Array.isArray(sp))L=sp;else{const w=m.who||(m.kit&&m.kit.subject);const p=w&&(w.__kp||(w.alive!==undefined||w.name&&w.rank!==undefined?w:null));if(p)L=[p];const w2=m.who2;if(w2)L.push(w2.__kp||w2)}
 return L.filter(p=>p&&typeof p==="object").slice(0,2)}
function kitEventStage(m){try{const M=$("modal"),mb=$("mb");const dlg=M&&M.querySelector(".dlg.kpanel");const body=mb&&mb.querySelector(":scope > .kpb");
 if(!dlg||!body||body.classList.contains("kpid")||body.querySelector(":scope > .kes"))return false;
 const P=kitStagePeople(m);if(!P.length)return false;const figs=P.map(p=>kitStageFig(p)).filter(Boolean);if(!figs.length)return false;
 /* wide band on top: headArt (jk3 .kdlgart) or the event picture moved from the tall left slot */
 if(!mb.querySelector(":scope > .kdlgart")){let a=null;const ev=body.querySelector(":scope > .kpsubj.kpev");
  if(ev){const im=ev.querySelector("img"),fr=ev.querySelector(".ksart");if(im)a={src:im.getAttribute("src"),lab:(fr&&fr.title)||""}}
  if(!a&&typeof kitEvArt==="function")a=kitEvArt(m);
  if(a&&a.src){const d=document.createElement("div");d.className="kdlgart kesband";d.innerHTML=kitSceneArt(a.src,a.lab,Object.assign({shape:"wide",cap:!!a.lab},kitEvCat(m,a)));mb.prepend(d)}}
 body.querySelectorAll(":scope > .kpsubj").forEach(e=>e.remove());
 const s=document.createElement("div");s.className="kpsubj kes kes"+figs.length;s.innerHTML=figs.join("");body.prepend(s);body.classList.add("kphas","kesb");dlg.classList.add("kesdlg");return true}catch(e){console.error("kitEventStage",e);return false}}
window.kitEventStage=kitEventStage;window.kitStageFig=kitStageFig;
/* KIT 32.3 event / news pictures framed by EVENT TYPE: the j89 category of the picture → a kit category frame (colour + corner ornament,
   the same frames as act pictures, 31.17). */
const KIT_EVCAT={"trieu-chinh":"trieu-chinh","tham-quan":"trieu-chinh","duoc-mua":"trieu-chinh","lu-lut":"trieu-chinh","han-han":"trieu-chinh","bien-ai":"trieu-chinh","thang-tran":"trieu-chinh","su-than":"trieu-chinh","hoa-than":"trieu-chinh","quoc-tang":"trieu-chinh","dai-xa":"trieu-chinh","hoang-de-vui":"sung-ai","hoang-de-dem":"sung-ai","vi-hanh":"sung-ai","di-san":"sung-ai","tu-tinh":"sung-ai","mat-uoc":"sung-ai","hoang-de-gian":"trung-phat","hinh-phat":"trung-phat","lanh-cung":"trung-phat","hoa-hoan":"trung-phat","le-xuan":"le-nghi","le-ha":"le-nghi","le-thu":"le-nghi","le-dong":"le-nghi","te-le":"le-nghi","yen-tiec":"le-nghi","tan-phong":"le-nghi","tuyen-tu":"le-nghi","thinh-an":"le-nghi","tang-le":"le-nghi","hh-viec":"le-nghi","sinh-no":"cham-con","con-tre":"cham-con","khach-den":"giao-thiep","thu-nha":"giao-thiep","chuyen-la":"giao-thiep","cung-nhan":"hau-ha","cung-nu":"hau-ha","tai-nghe":"hoc-tap","thoi-tiet":"nghi-ngoi","dieu-troi":"nghi-ngoi","dieu-lanh":"nghi-ngoi","benh-tat":"nghi-ngoi","dich-benh":"nghi-ngoi","tranh-sung":"muu-ke","tin-don":"muu-ke","tai-mat":"muu-ke","vu-oan":"muu-ke","hoi-lo":"muu-ke","dau-doc":"hai-nguoi","hai-thai":"hai-nguoi"};
function kitEvCat(m,a){try{const src=String(a&&a.src||"");const mm=/\/ev-([a-z-]+?)(?:-\d+)?\.webp/.exec(src);let k=mm&&KIT_EVCAT[mm[1]];
  if(!k&&typeof evArtCat==="function"){const c=evArtCat(m.evId||m.pid||"");if(c)k=KIT_EVCAT[c]}
  if(!k)k="giao-thiep";const C=typeof KIT_CAT==="object"&&KIT_CAT[k];return {col:C?C[1]:"#8a6a3a",cls:"kcat-"+k}}catch(e){return {}}}
window.kitEvCat=kitEvCat;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const m=typeof Q!=="undefined"?Q[0]:null;const r=s0.apply(this,arguments);
 try{if(m&&!kitEventStage(m)){/* no person: the event picture keeps its tall slot, framed by its type */const ev=document.querySelector("#mb > .kpb > .kpsubj.kpev .ksart, #mb > .kdlgart > .ksart");
  if(ev&&!ev.classList.contains("ksart-cat")){const im=ev.querySelector("img");const c=kitEvCat(m,{src:im&&im.getAttribute("src")});if(c.col){ev.classList.add("ksart-cat",c.cls);ev.style.setProperty("--kcc",c.col)}}}}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kit-evstage";st.textContent=`
.kpb.kphas.kesb{grid-template-columns:clamp(130px,40%,260px) minmax(0,1fr);gap:12px;align-items:start}
#modal .dlg.kpanel.kesdlg{max-width:min(640px,calc(100vw - 24px))!important}
.kpb.kphas.kesb:has(> .kes2){grid-template-columns:clamp(180px,46%,340px) minmax(0,1fr)}
.kpsubj.kes{display:flex;flex-direction:row;align-items:flex-end;justify-content:center;gap:2px;position:sticky;top:0}
.kesf{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0;flex:1 1 0}
.kesf.kesno{display:none}
.kesfi{position:relative;display:block;max-width:100%}
.kesfi>.kesimg{display:block;width:auto;height:auto;max-width:100%;max-height:calc(clamp(200px,40dvh,400px)*var(--kfr,1));filter:drop-shadow(0 6px 8px #3a201033)}
.kesfi>.kesfx{position:absolute;inset:0;pointer-events:none;z-index:2}
.kesf>.kpsn{margin-top:2px;text-align:center}
#mb>.kdlgart.kesband>.ksart{height:clamp(84px,18dvh,190px)}
/* week book person page: the full-body figure in the portrait column */
.kbk-por .kesf{align-items:center}.kbk-por .kesfi>.kesimg{width:auto;max-width:100%;height:auto;max-height:calc(min(62dvh,560px)*var(--kfr,1))}
.kbk.narrow .kbk-por .kesfi>.kesimg{max-height:calc(46dvh*var(--kfr,1))}
`;document.head.appendChild(st)})();

/* ---------- Thái hậu chip opens HER person card (owner: not the Giao tình tab), same pcard component as the Emperor's card (showEmp) ---------- */
function kitThCardHTML(){try{const R=(typeof kitCourtRows==="function"?kitCourtRows():[]).find(r=>r.k==="th")||{};const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown("th")!==false;
 const L=[typeof tuoi==="function"&&S.thAge?tuoi(S.thAge):"",R.mood&&!/chưa rõ/.test(R.mood[0])?`Tâm trạng: <b>${R.mood[0]}</b>`:"",known?`Thái hậu thương ngươi <b>${S.th|0}</b>`:"Thái hậu thương ngươi: <b>chưa rõ</b>"].filter(Boolean);
 return pcard({f:pTH(),col:"#c9a0e0",name:"Thái hậu",rank:"Thái hậu · Đức Thọ cung",lines:L,groups:[],empty:""})+`<p class="past">Muốn gặp Thái hậu: Hành sự → Thỉnh an Thái hậu (sang Đức Thọ cung).</p>`}catch(e){return""}}
(function(){if(typeof kitCourtOpen!=="function")return;const o0=kitCourtOpen;kitCourtOpen=function(k){if(k==="th"&&typeof pcard==="function"&&!S.thDead){try{if(Q.length&&!/pcm/.test(Q[0].cls||""))return;const h=kitThCardHTML();if(h){Q.unshift({t:"Thái hậu",cls:"pcm",h});showModal();return}}catch(e){}}return o0.apply(this,arguments)}})();
