
/* ================= jk3: KIT 3 — FOLD LAYOUT (kit owner, owner 11/14 Fold screenshots) =================
   One layout rule set for every screen and mode (consort road, cung nữ road, lãnh cung):
   1. TOP BAR = ONE slim row (phones: two): ☰ · her small frame + name + rank chip + short date · Bạc / Sức / Sủng / Danh.
      The Hoàng thượng box, the Thái hậu / Hoàng hậu chips and the status chip row leave the top bar (they live on the stage, 2).
   2. STAGE HUD: semi-transparent kit plaques in two side gutters of the stage (--kgl / --kgr); the figures stand in the middle
      (j59 lays them out inside the gutters, so a plaque never covers a figure). Left: place name · time (buổi, còn N khắc,
      weather, Quẻ tuần) · Tư chất · Tình trạng. Right: Hoàng thượng / Thái hậu / Hoàng hậu chips (attitude + mood when known) ·
      her servant (Lòng) · servant-road facts. Tap a plaque = the full status sheet (kit sheet, centred, scrolls inside).
   3. ONE STAGE SIZE on every tab (portrait: --kstH of the screen height; landscape: the left column). The panel below scrolls.
   4. STICKY HEADERS (sub-tabs, person-card strip, panel headers) are opaque and in the flow; nothing scrolls visibly behind them.
   5. CHIP LISTS / SELECTORS wrap (never clipped); the panel scrolls.
   One fact, one place: the date (top bar only), khắc (time plaque only, no dots), weather (time plaque only), attitude of
   Thái hậu / Hoàng hậu (their chip only), Sủng (top bar only). */
(function(){
const $$=s=>document.getElementById(s);
const T=s=>String(s==null?"":s).replace(/\s+/g," ").trim();
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* ---------- short date (VANPHONG: "Tháng ba · thượng tuần · năm thứ nhất") ---------- */
function k3Date(){try{const mo=(typeof KP_MON!=="undefined"&&KP_MON[(S.month-1)%12])||S.month;const yr=typeof kpYear==="function"?kpYear(S.year):"năm thứ "+S.year;
 return `Tháng ${mo} · ${TUAN[S.tuan]} · ${yr}`}catch(e){return""}}
window.k3Date=k3Date;
/* the status sheet always starts closed (it is opened from a stage plaque) */
try{localStorage.setItem("hclh-h2c","1")}catch(e){}window.__h2c=true;
function k3Hud(){try{if(!S)return;const d=$$("me-d");if(d){const t=k3Date();if(d.textContent!==t)d.textContent=t}}catch(e){}}
if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);k3Hud();return r}}

/* ---------- stage HUD ---------- */
const K3_TIME=["buoi","lot"],K3_STAT=["sac","tai","tamco","duc"],K3_STATE=["preg","ill","fake","out","block","doc","conf","shield","birth"];
const K3_RIGHT=["srk","nt","chu","wage","merit"];/* "tin" (Chủ tin) is in the top bar on the servant road */
const K3_ICO={sac:"sac",tai:"tai",tamco:"tam-co",duc:"duc"};
function k3hc(k){const h=$$("hud2");return h&&h.querySelector(`.hc[data-hx="${k}"]`)}
function k3val(b){const x=b&&b.querySelector("b");return x?T(x.textContent):""}
function k3lab(b){if(!b)return"";const c=b.cloneNode(true);c.querySelectorAll("b,i,img,.kodm").forEach(e=>e.remove());return T(c.textContent)}
function k3row(k,lab,val,cls,ico){return `<button type="button" class="k3r ${cls||""}" data-k3="${k}" title="${lab}${val!==""&&val!=null?" "+val:""}">${ico||""}<span class="k3l">${lab}</span>${val!==""&&val!=null?`<b>${val}</b>`:""}</button>`}
function k3court(){let R=[];try{R=typeof kitCourtRows==="function"?kitCourtRows():[]}catch(e){}
 return R.map(r=>{const m=r.mood;const moodTxt=m&&!/chưa rõ/.test(m[0])?`<span class="ef ${m[1]==="g"?"g":m[1]==="r"?"r":"n"}">${esc(m[0])}</span>`:"";
  let att="";if(r.k==="th"||r.k==="hh"){const n=r.k==="th"?(S.th|0):(S.hh|0);const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown(r.k)!==false;
   if(known)att=`<span class="k3v"><small>với ngươi</small> <span class="ef ${n>0?"g":n<0?"r":"n"}">${n>0?"+":""}${n}</span></span>`}
  return `<button type="button" class="k3c kcrow" data-kc="${r.k}" title="${r.who} · chạm để xem thẻ">${mdH(r.f,"xs")}<span class="k3ct"><b>${r.who}</b>${moodTxt}${att}</span></button>`}).join("")}
function k3maid(){const b=k3hc("maid");if(!b||!S.maid||(typeof isSrv==="function"&&isSrv()))return"";let f="";try{f=mdH(pMaid(),"xs")}catch(e){}
 const v=k3val(b),n=+v;return `<button type="button" class="k3c" data-k3go="staff" title="Cung nữ thân tín · chạm để xem">${f}<span class="k3ct"><b>${esc(S.maid.name)}</b><span class="k3v"><small>Lòng</small> <span class="ef ${n>=60?"g":n<45?"r":"n"}">${esc(v)}</span></span></span></button>`}
function k3Stage(){try{const st=$$("stage");if(!st)return;const stop=st.querySelector(".stop");const gm=document.querySelector(".game");
 let L=$$("kshL"),R=$$("kshR");const off=!S||S.dead||!stop||(gm&&gm.classList.contains("maptab"));
 if(off){if(L)L.hidden=true;if(R)R.hidden=true;st.classList.remove("k3g");return}
 if(!L){L=document.createElement("div");L.id="kshL";L.className="ksh kshL"}if(L.parentNode!==stop)stop.appendChild(L);
 if(!R){R=document.createElement("div");R.id="kshR";R.className="ksh kshR";st.appendChild(R)}
 L.hidden=false;R.hidden=false;st.classList.add("k3g");
 /* left: time · tư chất · tình trạng */
 const bu=k3hc("buoi"),lot=k3hc("lot"),wx=$$("hud2")&&$$("hud2").querySelector(".kmwx");
 let t="";if(bu){const w=String(BUOI[S.buoi||0]);t+=`<button type="button" class="k3r k3time" data-k3="buoi"><span class="k3l">${esc(w)}</span><b>còn ${typeof used!=="undefined"?Math.max(0,4-used):""} khắc</b></button>`}
 if(wx){const c=wx.cloneNode(true);c.className="k3r k3wx kmwx";window.__k3wx=c.outerHTML}if(window.__k3wx&&S.wx)t+=window.__k3wx
 if(lot){const lt=k3lab(lot)||T(lot.textContent);t+=`<button type="button" class="k3r k3lot ${lot.classList.contains("ok")?"ok":lot.classList.contains("hot")?"hot":""}" data-k3="lot"><span class="k3l">${esc(lt)}</span></button>`}
 let s="";K3_STAT.forEach(k=>{const b=k3hc(k);if(!b)return;const im=b.querySelector("img.ic");s+=k3row(k,esc(k3lab(b)),esc(k3val(b)),b.classList.contains("hot")?"hot":"",im?im.outerHTML:(typeof ic==="function"&&K3_ICO[k]?ic(K3_ICO[k],14):""))});
 let x="";K3_STATE.forEach(k=>{const b=k3hc(k);if(!b)return;x+=k3row(k,esc(k3lab(b)),esc(k3val(b)),b.classList.contains("hot")?"hot":b.classList.contains("ok")?"ok":"")});
 const hL=(t?`<div class="k3p k3pt">${t}</div>`:"")+(s?`<div class="k3p k3ps" data-k3sheet="1"><b class="k3h">Tư chất</b>${s}</div>`:"")+(x?`<div class="k3p k3px">${x}</div>`:"");
 if(L.dataset.h!==hL){L.innerHTML=hL;L.dataset.h=hL}
 /* right: court chips · servant · servant-road facts */
 let y="";K3_RIGHT.forEach(k=>{const b=k3hc(k);if(!b)return;y+=k3row(k,esc(k3lab(b)),esc(k3val(b)),b.classList.contains("hot")?"hot":b.classList.contains("ok")?"ok":"")});
 const hR=`<div class="k3cs">${k3court()}${k3maid()}</div>`+(y?`<div class="k3p k3py" data-k3sheet="1">${y}</div>`:"");
 if(R.dataset.h!==hR){R.innerHTML=hR;R.dataset.h=hR}
 k3Gut()}catch(e){console.error("k3Stage",e)}}
window.k3Stage=k3Stage;
/* gutter widths: from the stage width, then grown to the plaques' real width; j59 keeps the figures between them */
function k3Gut(){const st=$$("stage");if(!st)return;const W=st.clientWidth;if(!W)return;
 const g=Math.round(Math.max(W<520?96:116,Math.min(190,W*.2)));st.classList.toggle("k3n",g<116);const L=$$("kshL"),R=$$("kshR");
 st.style.setProperty("--kgw",g+"px");
 const need=el=>el&&!el.hidden?Math.ceil(el.getBoundingClientRect().width)+10:0;
 const gl=Math.max(need(L),0),gr=Math.max(need(R),0);const ol=st.style.getPropertyValue("--kgl"),or=st.style.getPropertyValue("--kgr");
 st.style.setProperty("--kgl",gl+"px");st.style.setProperty("--kgr",gr+"px");
 if((ol!==gl+"px"||or!==gr+"px")&&typeof window.j59lay==="function"){try{window.j59lay()}catch(e){}}}
document.addEventListener("click",e=>{const p=e.target.closest&&e.target.closest("#kshL [data-k3], #kshR [data-k3], #kshR [data-k3go], .k3p[data-k3sheet]");if(!p)return;
 if(p.classList.contains("kmwx"))return;e.stopPropagation();
 if(p.dataset.k3go){const b=document.querySelector(`[data-tab="${p.dataset.k3go}"]`);if(b)b.click();return}
 const k=p.dataset.k3,h=$$("hud2");if(!h)return;
 if(k==="lot"){const b=k3hc("lot");if(b){const c=h.classList.contains("col");h.classList.remove("col");b.click();if(c&&$$("hud2"))$$("hud2").classList.add("col")}return}
 k3Sheet(true)},true);
function k3Sheet(open){const h=$$("hud2");if(!h)return;const isOpen=!h.classList.contains("col");if(open===isOpen)return;const t=h.querySelector(".h2t");if(t)t.click()}
window.k3Sheet=k3Sheet;
/* the sheet: tap on the dim backdrop closes it */
document.addEventListener("click",e=>{const h=$$("hud2");if(h&&e.target===h&&!h.classList.contains("col"))k3Sheet(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){const h=$$("hud2");if(h&&!h.classList.contains("col"))k3Sheet(false)}});
if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{k3Stage()}catch(e){}return r}}
if(typeof renderHud2==="function"){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{k3Stage();k3Hud()}catch(e){}return r}}
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{k3Hud();k3Stage()}catch(e){}return r}}
try{const st=$$("stage");if(st&&window.ResizeObserver)new ResizeObserver(()=>{clearTimeout(window.__k3g);window.__k3g=setTimeout(k3Gut,30)}).observe(st)}catch(e){}

/* ---------- CSS: the one layout ---------- */
const css=document.createElement("style");css.id="k3-layout";css.textContent=`
:root{--k3pl:rgba(255,250,240,.88)}
/* stage frame (KIT 31.3): portrait screens get a FIXED aspect — Fold/tablets 600–999 px wide: 2:1 (width:height); phones < 600 px: 3:2.
   The panel below takes the rest and scrolls. Landscape: the left column (unchanged). */
:root{--kstH:calc((100vw - 16px) / 2)}
@media (max-width:599px){:root{--kstH:calc((100vw - 12px) / 1.5)}}
/* 3 · ONE STAGE SIZE (portrait): same on every tab; the panel scrolls */
@media (max-aspect-ratio:1/1){
 html body .game#game:not(.maptab),html body .game#game.cardtab:not(.maptab){grid-template-rows:auto var(--kstH) minmax(0,1fr) auto!important}
}
/* 1 · TOP BAR: one slim row */
html body header.hud{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"menu me stats"!important;align-items:center!important;gap:0 10px!important;padding:4px 8px!important;min-height:0!important;flex-wrap:nowrap!important}
html body header.hud>#menu{grid-area:menu;min-height:40px!important;min-width:40px!important;padding:0 8px!important;align-self:center}
html body header.hud>.me{grid-area:me;min-width:0!important;max-width:none!important;flex:none!important;display:flex!important;align-items:center;gap:8px;padding:0!important;background:none!important;border:0!important;text-align:left}
html body header.hud>.me .mi{display:flex!important;flex-direction:column;min-width:0;gap:1px}
html body header.hud>.me .mi>b{font-size:1.02rem!important;line-height:1.15}
html body header.hud>.me .rk{align-self:flex-start;font-size:.74rem!important}
html body header.hud>.me .dt,html body header.hud #me-d{font-size:.74rem!important;line-height:1.25!important;white-space:normal!important;display:block!important;color:var(--dim)}
html body header.hud>.stats{grid-area:stats;margin:0!important;display:flex!important;gap:6px!important;flex-wrap:nowrap!important;justify-content:flex-end;order:0!important;flex-basis:auto!important}
html body header.hud>.stats .st{min-width:54px;max-width:none!important}
html body header.hud>#emp,html body header.hud>.kcbox,html body header.hud .kcchips,#hud2>.kcchips{display:none!important}
html body header.hud>#hud2,html body #hud2.khud{position:fixed!important;left:0!important;top:0!important;width:0!important;height:0!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;overflow:visible!important;background:none!important;box-shadow:none!important;z-index:60}
html body #hud2.hud2>:not(.khg):not(#k3x){display:none!important}
@media (max-width:599px){
 html body header.hud{grid-template-columns:auto minmax(0,1fr)!important;grid-template-areas:"menu me" "stats stats"!important;gap:2px 8px!important;padding:4px 6px!important}
 html body header.hud>.stats{justify-content:space-around}
 html body header.hud>.stats .st{min-width:0}
}
/* the full status sheet: a centred kit sheet over a dim backdrop, scrolls inside */
html body #hud2:not(.col)::before{content:"";position:fixed;inset:0;background:#2a1a1266;z-index:0}
html body #hud2 .khg{position:fixed!important;z-index:1!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%);width:min(760px,calc(100vw - 24px))!important;max-height:calc(100dvh - 32px)!important;overflow:auto!important;overscroll-behavior:contain;box-sizing:border-box}
html body #hud2 .khg .khsh{position:sticky;top:-8px;z-index:2;background:var(--k-card,#fffaf0);margin:-8px -8px 0;padding:8px}
html body #hud2 .khg .khc .hc{white-space:normal!important}
/* one fact, one place: Thái hậu / Hoàng hậu attitude is in the Trong cung column of the sheet (and on their stage chips) */
html body #hud2 .khg .khc .hc[data-hx="th"],html body #hud2 .khg .khc .hc[data-hx="hh"]{display:none!important}
@media (max-width:599px){html body #hud2 .khg{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
/* 4 · STICKY HEADERS in the panel (sub-tabs .ksub and any later sticky bar): opaque, and the panel's 8 px top padding band above them is
   covered too, so rows scrolling up never show above the bar */
html body #panel .ksub{top:0!important;z-index:7!important;box-shadow:0 -9px 0 0 var(--panel),0 3px 6px -4px #5a3a2040;overflow:visible!important}
html body #panel .ksub .ksubb:first-child{border-radius:8px 0 0 8px}html body #panel .ksub .ksubb:last-child{border-radius:0 8px 8px 0}
/* 5 · CHIP LISTS / SELECTORS wrap, never clip (the panel scrolls) */
html body #panel .relsel,html body #panel .pctabs,html body #panel .chips,html body #panel .kchips{flex-wrap:wrap!important;overflow:visible!important;max-height:none!important}
/* 2 · STAGE HUD plaques */
html body .stage.k3g .stop{right:auto!important;width:var(--kgw,150px)!important;max-width:var(--kgw,150px)!important;flex-direction:column!important;align-items:stretch!important;gap:5px!important;max-height:calc(100% - 16px)!important;pointer-events:none}
html body .stage.k3g .stop .scene-t{max-width:none!important;width:auto;flex:0 0 auto!important;font-size:.95rem}
html body .stage.k3g .stop .scene-t *{white-space:normal!important}
html body .stage.k3g #sc-t h2{display:block!important;font-size:1.05rem;line-height:1.15;margin:0}html body .stage.k3g #sc-t h2>*{display:inline!important;min-width:0!important}
html body .stage.k3g.k3n #sc-t h2{font-size:.86rem}
.ksh{display:flex;flex-direction:column;gap:5px;pointer-events:none;min-width:0}
.ksh[hidden]{display:none!important}
.kshR{position:absolute;top:8px;right:8px;width:var(--kgw,150px);z-index:2;align-items:stretch}
.ksh .k3p,.ksh .k3c{pointer-events:auto;background:var(--k3pl);border:1px solid var(--line);border-radius:8px;box-shadow:0 1px 4px #3a20101f;backdrop-filter:blur(2px)}
.ksh .k3p{display:flex;flex-direction:column;padding:3px 6px;gap:0}
.ksh .k3h{font-family:var(--display);font-size:.7rem;color:var(--gold);letter-spacing:.03em;border-bottom:1px solid var(--k-hair,#e6d3ac);margin-bottom:1px}
.ksh .k3r{display:flex!important;align-items:center;gap:4px;border:0;background:none;padding:1px 0;margin:0;font:inherit;font-size:.75rem;line-height:1.25;color:var(--ink);text-align:left;cursor:pointer;min-height:0;width:100%}
.ksh .k3r .k3l{flex:1 1 auto;min-width:0;white-space:normal}
.ksh .k3r>b{font-weight:700;white-space:nowrap;margin-left:auto}
.ksh .k3r img.ic{width:14px;height:14px;flex:0 0 auto}
.ksh .k3r.hot,.ksh .k3r.hot b{color:var(--bad)}.ksh .k3r.ok,.ksh .k3r.ok b{color:var(--good)}
.ksh .k3lot .k3l{font-weight:600}
.ksh .k3time{flex-wrap:wrap;column-gap:4px}.ksh .k3time .k3l{font-weight:700;color:var(--gold);flex:0 1 auto}.ksh .k3time>b{margin-left:0}
.ksh .k3wx{padding-left:0!important;font-size:.75rem!important;background:none!important;border:0!important;box-shadow:none!important;min-height:0!important}
.ksh .k3wx img{width:18px!important;height:18px!important;border-radius:50%}
.ksh .k3cs{display:flex;flex-direction:column;gap:4px}
.ksh .k3c{display:flex;align-items:center;gap:5px;padding:2px 6px 2px 3px;font:inherit;text-align:left;cursor:pointer;min-height:0;color:var(--ink);width:100%}
.ksh .k3c .md{flex:0 0 auto}
.ksh .k3c .k3ct{display:flex;flex-direction:column;line-height:1.2;min-width:0}
.ksh .k3c .k3ct>b{font-size:.75rem;color:var(--gold);font-weight:700;white-space:normal}
.ksh .k3c .k3ct>.ef,.ksh .k3c .k3v{font-size:.72rem;font-weight:600}
.ksh .k3c .k3v small{font-weight:400;color:var(--dim);font-size:.68rem}
/* narrow stage (phones): smaller type, Tư chất as icon + number (label in the tooltip), chips keep title + value */
.stage.k3n .ksh .k3r,.stage.k3n .ksh .k3c .k3ct>b{font-size:.64rem}.stage.k3n .ksh .k3c .k3ct>.ef,.stage.k3n .ksh .k3c .k3v{font-size:.62rem}
.stage.k3n .ksh .k3c{padding:2px 4px 2px 2px;gap:3px}.stage.k3n .ksh .k3c .md{width:20px!important}
.stage.k3n .ksh .k3ps{display:grid;grid-template-columns:1fr 1fr;column-gap:6px}.stage.k3n .ksh .k3ps .k3h{grid-column:1/-1}
.stage.k3n .ksh .k3ps .k3r .k3l{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.stage.k3n .ksh .k3c .k3v small{font-size:.58rem}
`;document.head.appendChild(css);

/* ---------- 6. kitPhoneShell (KIT 31.7, owner 11/14): portrait screens under 1000 px wide (Fold, phones) work as TWO views.
   HOME = the room scene full screen between the slim top bar and the bottom tab bar (stage HUD plaques on it; tap a person = card).
   PANEL = a bottom tab opens full screen in place of the room (sub-tabs, picker, person card get the whole height).
   Back to the room: tap the active tab again, or the "Phòng" button in the top bar; "Qua buổi" always lands in the room. A person card
   opened from the room (#popw) shows full screen too and returns to the room when closed. Result cards / events overlay as before.
   Wider or landscape screens keep the split stage | panel. ---------- */
const K3SH={home:true};
function k3Phone(){return innerWidth<1000&&innerHeight>innerWidth}
function k3Shell(){try{const gm=document.querySelector(".game");if(!gm)return;const on=k3Phone()&&!!S&&!S.dead;gm.classList.toggle("k3ph",on);
 const pw=$$("popw");const pop=!!(pw&&pw.children.length&&pw.textContent.trim());
 gm.classList.toggle("k3home",on&&K3SH.home&&!pop);gm.classList.toggle("k3pop",on&&pop);
 let rb=$$("k3room");const hd=document.querySelector("header.hud");
 if(on&&!rb&&hd){rb=document.createElement("button");rb.id="k3room";rb.type="button";rb.className="btn k3room";rb.innerHTML="‹ Phòng";rb.title="Về phòng";rb.addEventListener("click",e=>{e.stopPropagation();k3Home()});hd.appendChild(rb)}
 if(rb)rb.hidden=!(on&&(!K3SH.home||pop));
 document.querySelectorAll("#tabs [data-tab]").forEach(b=>b.classList.toggle("k3dim",on&&K3SH.home&&!pop))}catch(e){console.error("k3Shell",e)}}
window.k3Shell=k3Shell;
function k3Home(){K3SH.home=true;try{if(typeof popIdx!=="undefined"&&popIdx!=null){popIdx=null;if(typeof renderStage==="function")renderStage()}}catch(e){}const pw=$$("popw");if(pw&&pw.children.length)pw.innerHTML="";k3Shell();setTimeout(()=>{try{window.j59lay&&j59lay();typeof kitFloorFit==="function"&&kitFloorFit()}catch(e){}},30)}
window.k3Home=k3Home;
document.addEventListener("click",e=>{if(!k3Phone())return;const b=e.target.closest&&e.target.closest("#tabs [data-tab], #tabs [data-kg]");
 if(b){const active=b.classList.contains("on")||b.classList.contains("kgon")||b.getAttribute("aria-selected")==="true";
  if(!K3SH.home&&active&&!b.classList.contains("kghide")){e.preventDefault();e.stopPropagation();k3Home();return}
  K3SH.home=false;setTimeout(k3Shell,0);return}
 if(e.target.closest&&e.target.closest("#next")){K3SH.home=true;setTimeout(k3Home,0)}},true);
try{const pw=$$("popw");if(pw)new MutationObserver(()=>{clearTimeout(window.__k3pw);window.__k3pw=setTimeout(k3Shell,0)}).observe(pw,{childList:true})}catch(e){}
addEventListener("resize",()=>{clearTimeout(window.__k3sh);window.__k3sh=setTimeout(k3Shell,60)});
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{k3Shell()}catch(e){}return r}}
/* any code path that switches tab on its own (rank chip, court chips, links "Xem đầy đủ ở Nhật ký") opens the panel view */
(function(){let t0=typeof tab!=="undefined"?tab:null;setInterval(()=>{try{if(tab!==t0){t0=tab;if(k3Phone()&&K3SH.home&&!window.__k3quiet){K3SH.home=false;k3Shell()}}}catch(e){}},150)})();
const cssS=document.createElement("style");cssS.id="k3-shell";cssS.textContent=`
html body .game#game.k3ph.k3home:not(.maptab){grid-template-rows:auto minmax(0,1fr) 0 auto!important}
html body .game#game.k3ph.k3home:not(.maptab)>#panel{display:none!important}
html body .game#game.k3ph:not(.k3home):not(.maptab){grid-template-rows:auto 0 minmax(0,1fr) auto!important}
html body .game#game.k3ph:not(.k3home):not(.maptab)>#stage{visibility:hidden!important;min-height:0!important;height:0!important;border:0!important;overflow:hidden!important}
html body .game#game.k3ph.k3pop>#panel{display:none!important}
html body .game#game.k3ph:not(.k3pop)>#popw{display:none!important}
html body header.hud>#k3room{grid-area:stats;justify-self:start;min-height:40px;padding:0 12px;font-weight:600;color:var(--gold);white-space:nowrap}
html body header.hud>#k3room[hidden]{display:none!important}
html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto minmax(0,1fr) auto auto!important;grid-template-areas:"menu me room stats"!important}
html body .game#game.k3ph header.hud>#k3room:not([hidden]){grid-area:room}
@media (max-width:599px){html body .game#game.k3ph header.hud:has(#k3room:not([hidden])){grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"menu me room" "stats stats stats"!important}}
#tabs [data-tab].k3dim{background:var(--panel)!important;color:var(--ink)!important;box-shadow:none!important}
`;document.head.appendChild(cssS);
})();
