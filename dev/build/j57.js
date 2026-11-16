/* ================= j57: ONE subject frame in dialogs (owner 11/14: "Thân phận kiếp này" showed a small cropped face) =================
   Root cause 1 (size): the kit's .pcp carries max-height:58% (meant for the person-card column). Inside a dialog's .faces
   <figure> that percentage resolves against the figure's own height, so the 3:4 frame was cut to 180x139 and the figure kept
   the full 3:4 height underneath: a short landscape box over an empty gap. .dlg .spk>.pfr had the override, .faces did not.
   Root cause 2 (picture): pMe()/pv()/... ask porOf() for the identity's tall portrait (por-*.webp, the same art the consort and
   prince cards show); until that file has loaded porOf returns the old square face and only re-renders the main screen, never
   an open dialog. The identity card opens right after start(), so it always showed the square fallback.
   Fix: .faces frames keep their 3:4 size per breakpoint (var(--pfw)), captions use the person-card name/rank style, and any
   open dialog swaps the fallback for the portrait as soon as it has loaded. */
(function(){const st=document.createElement("style");st.textContent=
 ".faces .pfr,.faces .pcp.pfr{max-height:none!important;height:auto;aspect-ratio:3/4;width:100%}"+
 ".faces figure{flex:0 1 var(--pfw);max-width:var(--pfw);min-width:0}.faces .pfwrap{width:100%}"+
 ".modal .faces figcaption{margin-top:4px;text-align:center;max-width:100%}"+
 ".modal .faces figcaption b{font-family:var(--display);font-size:1rem;line-height:1.2;color:var(--ink);overflow-wrap:anywhere}"+
 ".modal .faces figcaption small{font-size:.76rem;font-weight:600;color:var(--gold);overflow-wrap:anywhere}";
 document.head.appendChild(st)})();
/* fallback face -> portrait, swapped into the open dialog once loaded */
const POR57={};
function por57Swap(){try{const M=$("modal");if(!M||M.hidden)return;M.querySelectorAll(".pcp img:not(.pcb2)").forEach(im=>{const s=im.getAttribute("src");const to=POR57[s];if(to&&PORK[to]===1)im.setAttribute("src",to)})}catch(e){}}
if(typeof porOf==="function")(function(){const p0=porOf;porOf=function(who,fb){const r=p0.apply(this,arguments);try{if(r===fb&&fb&&who&&FIGS.length){
  const src=figFor(who===S?S:who===S.emp?{kind:"emp"}:who===S.thO?{kind:"th"}:{ref:who},"por");
  if(src&&src!==fb&&PORK[src]!==0){POR57[fb]=src;if(PORK[src]===1)return src;let n=0;const t=setInterval(()=>{if(PORK[src]===1||PORK[src]===0||++n>40){clearInterval(t);por57Swap()}},150)}}}catch(e){}return r}})();
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);por57Swap();return r}})();
/* audit j54: the round face in the princess / suitor rows is a block (display:grid) and sat on a line of its own; inline like j53's rows */
(function(){const st=document.createElement("style");st.textContent=".h54r>span>.md,.h54box .h54r .md{display:inline-grid;vertical-align:middle}.h54r>span{line-height:1.5}";document.head.appendChild(st)})();
/* bottom tabs, no truncated text and one treatment for all: every label on ONE line at every width. Below 1280px every tab shows
   its short label (data-s: Hành sự, Dư đồ, Phi tần, Ân oán, Phe, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh, Sổ ghi (j84 TABS); servant mode sets
   its own), at full width the long label. One font size for the whole bar: shrunk together (never per tab) until the widest label
   fits its column (columns = number of visible tabs, two rows on phones), re-measured on resize and whenever the labels change. */
(function(){const X="html body #tabs.tabs button";const st=document.createElement("style");st.textContent=
 X+"{white-space:nowrap!important;overflow:hidden!important;text-overflow:clip!important;font-size:var(--tfs,.85rem)!important;padding-left:1px!important;padding-right:1px!important}"+
 "/* kv3:unwrap */"+X+"{font-size:0!important}"+X+"::after{content:attr(data-s)!important;font-size:var(--tfs,.8rem)!important;white-space:nowrap!important}"+
 "/* kv3:.kv1 */:where(.kv1) "+X+"::after{font-size:var(--tfs,.86rem)!important}";document.head.appendChild(st)})();
let TFS_CV=null;
function tabsFit(){try{const T=$("tabs");if(!T)return;const short=true;const one=kitView().pages===1,base=one?.86:.8;
 T.style.setProperty("--tfs",base+"rem");const B=[...T.querySelectorAll("button")].filter(b=>b.offsetParent);if(!B.length)return;
 const n=B.length,cols=one?Math.ceil(n/2):n;/* KIT §0: the spread = ONE row of tabs; the one page = TWO rows of ceil(n/2) big buttons (8 tabs → 4+4; phone-bars) */T.style.setProperty("grid-template-columns",`repeat(${cols},minmax(0,1fr))`,"important");
 TFS_CV=TFS_CV||document.createElement("canvas").getContext("2d");let k=1;
 B.forEach(b=>{const cs=getComputedStyle(b,short?"::after":null);TFS_CV.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const txt=short?(b.dataset.s||b.textContent):b.textContent;
  const w=TFS_CV.measureText(txt.trim()).width+1;const room=b.clientWidth-parseFloat(getComputedStyle(b).paddingLeft)-parseFloat(getComputedStyle(b).paddingRight);if(w>room&&room>0)k=Math.min(k,room/w)});
 if(k<1)T.style.setProperty("--tfs",(base*k).toFixed(3)+"rem")}catch(e){}}
addEventListener("resize",()=>{clearTimeout(window.__tfsT);window.__tfsT=setTimeout(tabsFit,80)});
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);tabsFit();return r}})();
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(tabsFit)}catch(e){}
setTimeout(tabsFit,0);
/* status panel toggle (owner, Fold): the ▾ was display:none from 1200px up (and a 22px box below), so on a wide screen it could
   not be tapped and "col" never changed anything there. Now one toggle at every width: a 36px kit button with icon + word as the
   panel's first item; collapsed keeps only the key chips, at every width. A wide screen with no saved choice starts open. */
(function(){const H="html body #hud2.hud2";const st=document.createElement("style");st.textContent=
 H+" .h2t{display:inline-flex!important;position:static!important;order:-1;align-items:center;justify-content:center;gap:4px;flex:0 0 auto;width:auto!important;min-width:36px;height:36px!important;min-height:36px;padding:0 10px!important;border:1px solid var(--trim,var(--line));border-radius:8px;background:#fffaf0;color:var(--gold);font-family:var(--body,inherit);font-size:.78rem!important;font-weight:600;white-space:nowrap;cursor:pointer;touch-action:manipulation;z-index:2}"+
 H+" .h2t i{font-style:normal;font-size:.9rem;line-height:1}"+
 H+"{padding-right:5px!important}"+H+".col .hc:not(.keep){display:none!important}"+
 "";document.head.appendChild(st)})();
(function(){const r0=renderHud2;renderHud2=function(){try{}catch(e){}
 const r=r0.apply(this,arguments);try{const el=$("hud2"),b=el&&el.querySelector(".h2t");if(b){const col=el.classList.contains("col");b.innerHTML=col?"<i>▾</i>Chỉ số":"<i>▴</i>Thu gọn";b.setAttribute("aria-label",col?"Mở rộng bảng chỉ số":"Thu gọn bảng chỉ số");b.setAttribute("aria-expanded",String(!col));b.type="button"}}catch(e){}return r}})();
/* the real tap bug below 1200px: the toggle re-renders #hud2 (innerHTML) inside its own click, so the button is detached by the
   time the click bubbles to j24's "click outside the panel collapses it" listener; closest("#hud2") on the detached node is null,
   so that listener collapsed the panel straight back. Remember the hit before anything runs and stop that click at the panel. */
(function(){document.addEventListener("click",e=>{try{e.__h2in=!!(e.target&&e.target.closest&&e.target.closest("#hud2"))}catch(x){}},true);
 const el=$("hud2");if(el)el.addEventListener("click",e=>{if(e.__h2in)e.stopPropagation()})})();
