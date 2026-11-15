
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
 const L=[typeof tuoi==="function"&&S.thAge?tuoi(S.thAge):"",R.mood&&!/chưa rõ/.test(R.mood[0])?`Tâm trạng: <b>${R.mood[0]}</b>`:"",known?`Thái hậu thương ngươi <b>${S.th|0}</b>`:"Thái hậu thương ngươi: <b>chưa rõ</b>"].filter(Boolean);
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
 const D=d.clientHeight||innerHeight;let vh=innerWidth<1000?24:28;
 while(vh>14&&fixedH()>D*.55&&o.scrollHeight>o.clientHeight+2){vh-=2;d.style.setProperty("--kdpic",vh+"vh")}
 if(!o.dataset.kdsh){o.dataset.kdsh=1;o.addEventListener("scroll",()=>o.classList.toggle("kdsh",o.scrollTop>2),{passive:true})}
 try{if(typeof kitEsFit==="function")mb.querySelectorAll(".kpsubj.kes").forEach(kitEsFit)}catch(e){}}catch(e){console.error("kitDlgFit",e)}}
window.kitDlgFit=kitDlgFit;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitDlgFit();requestAnimationFrame(kitDlgFit)}catch(e){}return r};
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(kitDlgFit,120)})})();
(function(){const st=document.createElement("style");st.id="kit-dlgscroll";st.textContent=`
.modal .dlg.kdscroll{display:flex!important;flex-direction:column;overflow:hidden!important}
.modal .dlg.kdscroll>*{flex:none}
.modal .dlg.kdscroll>#mb{flex:1 1 auto!important;min-height:0;display:flex!important;flex-direction:column;overflow:hidden!important}
.modal .dlg.kdscroll>#mb>*{flex:none}
.modal .dlg.kdscroll>#mb>.opts{flex:1 1 auto!important;min-height:96px;overflow-y:auto!important;overscroll-behavior:contain;transition:box-shadow .2s}
.modal .dlg.kdscroll>#mb>.opts{grid-template-rows:none!important;grid-auto-rows:max-content!important;align-content:start!important}
.modal .dlg.kdscroll>#mb>.opts>*{min-height:max-content;flex:none}
.modal .dlg.kdscroll>#mb>.opts.kdsh{box-shadow:inset 0 10px 8px -8px rgba(58,32,16,.28)}
.modal .dlg.kdscroll>#mb .kpsubj img,.modal .dlg.kdscroll>#mb .kdlgart .ksart,.modal .dlg.kdscroll>#mb .kpsubj .ksart{max-height:var(--kdpic,28vh)}
.modal .dlg.kdscroll>#mb .kpsubj.kes{max-height:calc(var(--kdpic,28vh) + 40px)}
@media (max-width:999px){.modal .dlg.kdscroll>#mb .kpsubj img,.modal .dlg.kdscroll>#mb .kdlgart .ksart,.modal .dlg.kdscroll>#mb .kpsubj .ksart{max-height:var(--kdpic,24vh)}}
`;document.head.appendChild(st)})();

/* ================= KIT 32.6 · PEOPLE ON THE PICTURE (owner 11/15, dev/owner-shots/1115-figs-on-scene.jpg) =================
   Event dialogs (kitEventStage): when there is a place / event picture band, the people stand ON it — feet on the picture's floor
   line (86 % of its height), body height KIT_FIG.h × picture height (kitFigBody: forehead to feet; men ×KIT_FIG.man, capped under the
   top edge; children by age), packed side by side by their core width (overlap ≤ 25 %), name chips inside the picture's bottom edge.
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
 /* pack: core widths with up to 25 % overlap, outer sleeves inside the picture */
 const tot=o=>sz.reduce((a,s,i)=>a+s.core*(i?1-o:1),0)+sz[0].iw*(sz[0].cl-sz[0].l)+sz[sz.length-1].iw*(sz[sz.length-1].r-sz[sz.length-1].cr);
 let o=0;const av=W-16;if(tot(0)>av){const v=sz.slice(1).reduce((a,s)=>a+s.core,0);o=Math.min(.25,v?(tot(0)-av)/v:0)}
 let k=1;const t=tot(o);if(t>av)k=av/t;/* still too wide (very narrow picture): one common factor */
 let x=(W-t*k)/2+sz[0].iw*k*(sz[0].cl-sz[0].l);
 L.forEach((it,i)=>{const s=sz[i];const ih=s.ih*k,iw=s.iw*k;if(i)x-=s.core*k*o;const left=x-iw*s.cl;
  it.f.style.left=left.toFixed(1)+"px";it.f.style.width=iw.toFixed(1)+"px";it.im.style.height=ih.toFixed(1)+"px";it.im.style.width=iw.toFixed(1)+"px";
  it.f.style.top=(floor-ih*s.b).toFixed(1)+"px";it.f.style.zIndex=String(2+i);x+=s.core*k;
  const cap=it.f.querySelector(".kpsn");if(cap){cap.style.left=(left+iw*(s.cl+s.cr)/2).toFixed(1)+"px";cap.dataset.row="0"}});
 /* name chips: inside the picture bottom, never cut; neighbours that touch go to a second row */
 const caps=L.map(it=>it.f.querySelector(".kpsn")).filter(Boolean);caps.forEach(c=>{c.style.translate="";ov.appendChild(c)});
 let prev=null;caps.forEach(c=>{const r=c.getBoundingClientRect(),A=art.getBoundingClientRect();let s=0;if(r.left<A.left+4)s=A.left+4-r.left;else if(r.right>A.right-4)s=A.right-4-r.right;if(s)c.style.translate=s.toFixed(1)+"px 0";
  const q=c.getBoundingClientRect();if(prev&&q.left<prev.right+4&&prev.c.dataset.row==="0")c.dataset.row="1";prev={right:q.right,c}})}catch(e){console.error("kitEsOvFit",e)}}
window.kitEsOvFit=kitEsOvFit;
(function(){if(typeof kitEventStage!=="function")return;const k0=kitEventStage;kitEventStage=function(m){const r=k0.apply(this,arguments);
 try{if(r){const mb=document.getElementById("mb");const band=mb&&mb.querySelector(":scope > .kdlgart");const art=band&&band.querySelector(".ksart");const col=mb&&mb.querySelector(":scope > .kpb > .kpsubj.kes");
  if(art&&col&&!art.querySelector(".kesov")){const ov=document.createElement("div");ov.className="kesov";[...col.querySelectorAll(":scope > .kesf")].forEach(f=>ov.appendChild(f));art.appendChild(ov);col.remove();
   band.classList.add("kesonpic");const b=mb.querySelector(":scope > .kpb");if(b)b.classList.add("kesfull");requestAnimationFrame(kitEsOvFit)}}}catch(e){console.error("kesov",e)}return r};window.kitEventStage=kitEventStage})();
(function(){if(typeof kitDlgFit!=="function")return;const d0=kitDlgFit;kitDlgFit=function(){const r=d0.apply(this,arguments);try{kitEsOvFit()}catch(e){}return r};window.kitDlgFit=kitDlgFit;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(kitEsOvFit,140)})})();
(function(){const st=document.createElement("style");st.id="kit-esov";st.textContent=`
#mb>.kdlgart.kesonpic>.ksart{position:relative;height:var(--kdpic,30vh)!important;max-height:none!important;min-height:150px}
#mb>.kdlgart.kesonpic>.ksart>img{object-position:center 60%}
#mb .kesov{position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden}
#mb .kesov>.kesf{position:absolute;margin:0;display:block}
#mb .kesov>.kesf .kesfi{display:block;position:relative}
#mb .kesov>.kesf .kesimg{display:block;max-width:none!important;max-height:none!important;filter:drop-shadow(0 4px 5px #0006)}
#mb .kesov>.kpsn{position:absolute;bottom:3px;transform:translateX(-50%);z-index:20;white-space:nowrap;background:rgba(255,250,240,.92);border:1px solid var(--line,#e6d3ac);border-radius:6px;padding:0 6px;font-size:.78rem;line-height:1.25;text-align:center}
#mb .kesov>.kpsn[data-row="1"]{bottom:calc(3px + 2.6em)}
#mb>.kdlgart.kesonpic .ksart>figcaption,#mb>.kdlgart.kesonpic .ksart>.ksart-chip{top:6px;bottom:auto}
#mb>.kpb.kesfull{display:block!important;grid-template-columns:none!important}
#mb>.kpb.kesfull>*{max-width:none!important;width:auto}
@media (max-width:999px){#mb>.kdlgart.kesonpic>.ksart{height:var(--kdpic,26vh)!important;min-height:130px}}
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
function kitDpApply(){try{const o=kitDpOn();const d0=document.querySelector("#modal .dlg");if(!o){if(d0&&d0.classList.contains("kdper")){d0.classList.remove("kdper","kdper2","kdnarrow");d0.style.removeProperty("--kdpw")}return}
 const {d,mb,col}=o;d.classList.add("kdper");d.classList.toggle("kdper2",col.querySelectorAll(":scope > .kesf").length>1);
 const body=col.parentElement;body.classList.add("kdpb");
 /* a "world" fact row's empty dot means nothing beside a full figure */
 body.querySelectorAll(".kfact > .kfdot").forEach(x=>{x.parentElement.classList.add("kfnodot");x.remove()});
 const kids=[...mb.children].filter(c=>c!==body&&!c.classList.contains("opts"));kids.forEach(c=>c.classList.add("kdpr"));
 kitDpFit()}catch(e){console.error("kitDpApply",e)}}
function kitDpFit(){try{const o=kitDpOn();if(!o||!o.d.classList.contains("kdper"))return;const {d,mb,col}=o;
 const narrow=innerWidth<600;d.classList.toggle("kdnarrow",narrow);
 const F=[...col.querySelectorAll(":scope > .kesf")].filter(f=>!f.classList.contains("kesno"));if(!F.length)return;let wait=false;
 const L=F.map(f=>{const im=f.querySelector(".kesimg"),src=im&&im.getAttribute("src");const b=src?kitFigBody(src,()=>requestAnimationFrame(kitDpFit)):null;
  if(!b){wait=true}const kfr=parseFloat(im&&im.style.getPropertyValue("--kfr"))||1;return{f,im,b,fac:kfr*(KIT_FIG.man||1),cap:f.querySelector(".kpsn")||col.querySelector(`:scope > .kpsn[data-kdp="${F.indexOf(f)}"]`)}});
 if(wait)return;
 /* name chips live in the column (absolute), measured first so the feet stand above them */
 L.forEach((x,i)=>{if(x.cap){x.cap.dataset.kdp=i;x.cap.classList.add("kdpcap");if(x.cap.parentElement!==col)col.appendChild(x.cap)}});
 const capH=Math.max(0,...L.map(x=>x.cap?x.cap.offsetHeight:0));
 const H=col.clientHeight;if(H<80)return;const floor=H-capH-6,top=4;
 const sz=L.map(x=>{const bt=x.b.ht>x.b.t?x.b.ht:x.b.t;const body=Math.min(KIT_FIG.h*H*x.fac,floor-top);const ih=body/Math.max(.2,x.b.b-bt);const iw=ih*(x.b.ar||1);
  const cl=x.b.cl!=null?x.b.cl:x.b.l,cr=x.b.cr!=null?x.b.cr:x.b.r;return{ih,iw,core:iw*(cr-cl),cl,cr,l:x.b.l,r:x.b.r,b:x.b.b}});
 const ov=sz.length>1?.2:0;/* KIT 33 rule 4: each later figure may step back over its neighbour by ≤ 20 % of its core */
 const tot=sz.reduce((a,s,i)=>a+s.core*(i?1-ov:1),0)+sz[0].iw*(sz[0].cl-sz[0].l)+sz[sz.length-1].iw*(sz[sz.length-1].r-sz[sz.length-1].cr);
 const capW=Math.max(0,...L.map(x=>x.cap?x.cap.scrollWidth:0));
 /* column width: the people (or the widest name chip); the right column keeps ≥ 300 px (iPad) — if not, one common factor */
 let need=Math.max(tot,capW)+12,k=1;
 if(narrow){const W=col.clientWidth;if(need>W){k=W/need;need=W}}
 else{const dw=Math.min(innerWidth-24,need+470);const room=dw-280-44;if(need>room){k=room/need;need=room}d.style.setProperty("--kdpw",Math.round(need)+"px")}
 const W=narrow?col.clientWidth:need;let x=(W-tot*k)/2+sz[0].iw*k*(sz[0].cl-sz[0].l);
 L.forEach((it,i)=>{const s=sz[i];const ih=s.ih*k,iw=s.iw*k;if(i)x-=s.core*k*ov;const left=x-iw*s.cl;
  Object.assign(it.f.style,{left:left.toFixed(1)+"px",top:(floor-ih*s.b).toFixed(1)+"px",width:iw.toFixed(1)+"px",zIndex:String(2+i)});
  const wr=it.f.querySelector(".kesfi");if(wr)Object.assign(wr.style,{width:iw.toFixed(1)+"px",height:ih.toFixed(1)+"px",margin:"0",maxWidth:"none"});
  Object.assign(it.im.style,{width:iw.toFixed(1)+"px",height:ih.toFixed(1)+"px"});
  if(it.cap){it.cap.style.left=(left+iw*(s.cl+s.cr)/2).toFixed(1)+"px";it.cap.style.translate="";it.cap.dataset.row="0"}x+=s.core*k});
 /* chips never cut: clamp inside the column; two that touch → the second one goes up a row (over the hem) */
 const C=col.getBoundingClientRect();let prev=null;L.forEach(it=>{const c=it.cap;if(!c)return;const r=c.getBoundingClientRect();let s=0;if(r.left<C.left+2)s=C.left+2-r.left;else if(r.right>C.right-2)s=C.right-2-r.right;if(s)c.style.translate=s.toFixed(1)+"px 0";
  const q=c.getBoundingClientRect();if(prev&&q.left<prev.right+4)c.dataset.row="1";prev={right:q.right}});
 col.dataset.kdpfit="1"}catch(e){console.error("kitDpFit",e)}}
window.kitDpApply=kitDpApply;window.kitDpFit=kitDpFit;
/* kitEsFit (33.6) sizes figures in the old side column; a 32.7 column is sized by kitDpFit instead */
(function(){const e0=kitEsFit;kitEsFit=function(row){if(row&&row.closest&&row.closest(".dlg.kdper"))return kitDpFit();return e0.apply(this,arguments)};window.kitEsFit=kitEsFit})();
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitDpApply();requestAnimationFrame(kitDpFit)}catch(e){}return r};
 const d0=kitDlgFit;kitDlgFit=function(){const r=d0.apply(this,arguments);try{kitDpFit()}catch(e){}return r};window.kitDlgFit=kitDlgFit;
 let t=0;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(kitDpFit,160)})})();
(function(){const st=document.createElement("style");st.id="kit-dlgperson";st.textContent=`
#modal .dlg.kpanel.kdper{display:flex!important;flex-direction:column;overflow:hidden!important;height:min(calc(100dvh - 32px),720px);
 width:min(calc(var(--kdpw,240px) + 470px),calc(100vw - 24px));max-width:none!important}
#modal .dlg.kpanel.kdper>*{flex:none}
#modal .dlg.kdper>#mb,.modal .dlg.kdscroll.kdper>#mb{flex:1 1 auto!important;min-height:0;display:grid!important;overflow:hidden!important;
 grid-template-columns:var(--kdpw,240px) minmax(0,1fr);grid-template-rows:max-content minmax(0,1fr);column-gap:14px;align-content:stretch}
#modal .dlg.kdper>#mb>.kpb.kdpb{display:contents!important}
#modal .dlg.kdper>#mb>.kpb>.kpsubj.kes{grid-column:1;grid-row:1/-1;position:relative!important;display:block!important;top:auto;max-height:none!important;height:auto;min-height:0;overflow:visible;margin:0}
#modal .dlg.kdper>#mb>.kpb>.kpmain,#modal .dlg.kdper>#mb>.kdpr{grid-column:2;min-width:0}
#modal .dlg.kdper>#mb>.opts{grid-column:2;grid-row:-2/-1;min-height:0!important;max-height:none;overflow-y:auto!important;align-self:stretch;margin-top:8px;
 display:flex!important;flex-direction:column!important;gap:8px;grid-template-columns:none!important}
html body #modal .dlg.kdper>#mb>.opts,html body #modal .dlg.kdper>#mb>.opts.k3grid:has(> button.ka){display:flex!important;flex-direction:column!important;grid-template-columns:none!important}
html body #modal .dlg.kdper>#mb>.opts>*{width:100%!important;max-width:none!important;flex:none!important;order:0!important;grid-column:auto!important;min-height:max-content!important;height:auto!important}
#modal .dlg.kdper .kes>.kesf{position:absolute;margin:0;display:block;flex:none}
#modal .dlg.kdper .kes>.kesf .kesfi{display:block;position:relative}
#modal .dlg.kdper .kes .kesimg{display:block;max-width:none!important;max-height:none!important}
#modal .dlg.kdper .kes>.kpsn.kdpcap{position:absolute;bottom:2px;transform:translateX(-50%);z-index:20;white-space:nowrap;margin:0;text-align:center;
 background:rgba(255,250,240,.92);border:1px solid var(--line,#e6d3ac);border-radius:6px;padding:1px 8px}
#modal .dlg.kdper .kes>.kpsn.kdpcap[data-row="1"]{bottom:calc(2px + 3em)}
#modal .dlg.kdper .kes>.kpsn .kname{display:flex;flex-direction:column;align-items:center;line-height:1.2;color:color-mix(in srgb,var(--rc,#2a1a12) 45%,#2a1a12);font-size:1rem}
#modal .dlg.kdper .kes>.kpsn .kname .kti{font-size:.74rem;font-weight:600;letter-spacing:.02em;line-height:1.1;color:color-mix(in srgb,var(--rc,#7a5530) 75%,#2a1a12)}
#modal .dlg.kdper .kfact.kfnodot{grid-template-columns:minmax(0,1fr)}
#modal .dlg.kdper #mr{padding-left:calc(var(--kdpw,240px) + 28px)}
#modal .dlg.kdper.kdnarrow{width:calc(100vw - 16px);height:calc(100dvh - 24px)}
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
function kitXHTML(attrs,label){return `<button type="button" class="kit-x" aria-label="${label||"Đóng"}" title="${label||"Đóng"}"${attrs?" "+attrs:""}>✕</button>`}
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
.modal.night .kit-x{background:#2a1610;color:#e9c07a;border-color:#4a2a20}
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
function kitOvBtn(){const ov=document.getElementById("ov");if(!ov||ov.hidden)return null;const b=ov.querySelector("#kg82ok, #kg92ok, #mgok");return b&&b.isConnected?b:null}
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
(function(){const st=document.createElement("style");st.id="kit-catch";st.textContent=`
#kxcatch{position:fixed;inset:0;background:transparent;touch-action:none;-webkit-tap-highlight-color:transparent}
#kxcatch[hidden]{display:none!important}
`;document.head.appendChild(st)})();
