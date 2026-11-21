/* ================= jseal: kitSeal · ẤN TRÂN NỮ (owner 11/15, review/brand; KIT §39) =================
   Ported from Phượng Lệnh public/choi/js/kit/seal.js (word() glyph builder, the pl-seal-ink filter, the pl-seal-tn carved mask): a square
   cinnabar seal, TRÂN over NỮ cut white into the cinnabar (bạch văn) in Vietnamese seal-script capitals drawn in code (one even stroke on a
   6 x 10 grid, diacritics carved the same way), the edge worn and the ink grained by FIXED-seed turbulence (same on every render), tilted -2°.
   Inline SVG, no image. kitSeal(o) returns the markup; the top bar wears one in its top-right corner (a mark only: aria-hidden, no tap,
   pointer-events none) and the Buổi/Quẻ block steps left to make its room (never under the quẻ line or the "Có bản mới" chip). */
const KSEAL_G={T:"M0 0L6 0M3 0L3 10",H:"M0 0L0 10M6 0L6 10M0 5L6 5",I:"M0.6 0L5.4 0M3 0L3 10M0.6 10L5.4 10",
 R:"M0 10L0 0L4.6 0Q6 0 6 1.4L6 3.6Q6 5 4.6 5L0 5M2.8 5L6 8.2L6 10",A:"M0 10L0 2Q0 0 2 0L4 0Q6 0 6 2L6 10M0 5.4L6 5.4",
 N:"M0 10L0 0L6 10L6 0",U:"M0 0L0 8Q0 10 2 10L4 10Q6 10 6 8L6 0",
 B:"M0 0L0 10L4.6 10Q6 10 6 8.6L6 6.4Q6 5 4.6 5L0 5M0 0L4.2 0Q5.6 0 5.6 1.4L5.6 3.6Q5.6 5 4.2 5",
 O:"M2 0L4 0Q6 0 6 2L6 8Q6 10 4 10L2 10Q0 10 0 8L0 2Q0 0 2 0",Gg:"M6 1.6Q6 0 4.4 0L1.6 0Q0 0 0 1.6L0 8.4Q0 10 1.6 10L4.4 10Q6 10 6 8.4L6 5.4L3.2 5.4"};
const KSEAL_MARK={"^":"M1.4 -1.2L3 -2.9L4.6 -1.2","~":"M0.6 -3.6Q1.5 -5.9 3 -4.6Q4.5 -3.3 5.4 -5.6","`":"M1.9 -3L3.7 -1.3",horn:"M6 0.2L7.4 0.2L7.4 -1.6"};
const KSEAL_PARTS={T:["T"],H:["H"],I:["I"],R:["R"],A:["A"],N:["N"],U:["U"],B:["B"],G:["Gg"],"Â":["A","^"],"À":["A","`"],O:["O"],"Ò":["O","`"],"Ạ":["A","dot"],"Ữ":["U","horn","~"]};
/* a word of seal glyphs filling the box (x, y, bw, bh); sw = the stroke in the seal's own units (room above for marks, below for a dot) */
function kitSealWord(w,x,y,bw,bh,sw){const ls=[...w],gap=2.6,top=ls.includes("Ữ")?6.2:ls.some(c=>/[ÂÀÒ]/.test(c))?4:0.8,bot=ls.some(c=>c==="Ạ")?2.6:0.8;
 const unitsW=ls.length*6+(ls.length-1)*gap+(ls.includes("Ữ")?1.4:0),sx=(bw-sw)/unitsW,sy=(bh-sw)/(10+top+bot);let cx=0,out="";
 for(const c of ls){const X=u=>x+sw/2+(cx+u)*sx,Y=v=>y+sw/2+(v+top)*sy;
  for(const k of KSEAL_PARTS[c]||[]){
   if(k==="dot"){out+=`<rect x="${X(3)-sw*0.6}" y="${Y(11.4)-sw*0.6}" width="${sw*1.2}" height="${sw*1.2}" fill="#000"/>`;continue}
   const d=(KSEAL_G[k]||KSEAL_MARK[k]).replace(/([MLQ])/g," $1 ").trim().replace(/\s+/g," "),pts=d.split(" ");let path="",i=0;
   while(i<pts.length){const t=pts[i++];if(t==="M"||t==="L"){path+=`${t}${X(+pts[i]).toFixed(2)} ${Y(+pts[i+1]).toFixed(2)}`;i+=2}
    else if(t==="Q"){path+=`Q${X(+pts[i]).toFixed(2)} ${Y(+pts[i+1]).toFixed(2)} ${X(+pts[i+2]).toFixed(2)} ${Y(+pts[i+3]).toFixed(2)}`;i+=4}}
   out+=`<path d="${path}" fill="none" stroke="#000" stroke-width="${sw}" stroke-linecap="square" stroke-linejoin="round"/>`}
  cx+=6+gap+(c==="Ữ"?1.4:0)}
 return out}
/* the shared defs, once per page: the worn edge + grain filter and the carved TRÂN NỮ mask (ids kseal-*) */
function kitSealDefs(){if(document.getElementById("kseal-defs"))return;const NS="http://www.w3.org/2000/svg",d=document.createElementNS(NS,"svg");
 d.id="kseal-defs";d.setAttribute("aria-hidden","true");d.setAttribute("width","0");d.setAttribute("height","0");d.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
 const carve=(id,w,h,body)=>`<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#fff"/>${body}</mask>`;
 d.innerHTML=`<defs><filter id="kseal-ink" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="edge"/>
  <feDisplacementMap in="SourceGraphic" in2="edge" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="worn"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves="1" seed="11" result="g"/>
  <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -30 0 0 0 20.5" result="grain"/>
  <feComposite in="worn" in2="grain" operator="in" result="speck"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="2" result="lo"/>
  <feColorMatrix in="lo" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0 0 0 0.62" result="even"/>
  <feComposite in="speck" in2="even" operator="in"/></filter>
  ${carve("kseal-tn",64,64,`<rect x="5.5" y="5.5" width="53" height="53" fill="none" stroke="#000" stroke-width="1.6"/>${kitSealWord("TRÂN",10,9,44,24,2.6)}${kitSealWord("NỮ",17,35,30,21,2.6)}`)}</defs>`;
 (document.body||document.documentElement).prepend(d)}
/* kitSeal({cls, title}) -> markup of the Trân nữ seal (square, 64-unit viewBox; size it with CSS --kseal) */
function kitSeal(o){o=o||{};try{kitSealDefs()}catch(e){}
 return `<span class="kseal ${o.cls||""}" aria-hidden="true"><svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g transform="rotate(-2 32 32)" filter="url(#kseal-ink)"><rect x="2" y="2" width="60" height="60" rx="1.5" fill="currentColor" mask="url(#kseal-tn)"/></g></svg></span>`}
window.kitSeal=kitSeal;
/* the top bar's corner seal: once; the bar keeps it across renders (renderHUD only updates its own parts) */
/* two ways to make its room, chosen by the bar's own layout (measured, so every device and later layout change is covered):
   - the bar wraps (portrait, phone landscape): the Buổi/Quẻ block ends the first row on the right -> that block steps left (margin);
   - one row (iPad / desktop landscape): the stat cells end the row -> the whole bar keeps a right gutter and the seal sits centred in it */
function kitSealHud(){const h=document.querySelector("header.hud");if(!h)return;
 if(!h.querySelector(":scope > .kseal-hud")){h.insertAdjacentHTML("beforeend",kitSeal({cls:"kseal-hud"}));h.classList.add("has-kseal")}
 const tc=document.getElementById("k3tc"),sr=document.getElementById("kstrow");if(!tc||!sr)return;
 h.classList.remove("kseal-pad");const a=tc.getBoundingClientRect(),b=sr.getBoundingClientRect();
 const one=b.top<a.bottom-2&&b.left>a.left;h.classList.toggle("kseal-pad",one)}
addEventListener("resize",()=>{try{kitSealHud()}catch(e){}});
(function(){const st=document.createElement("style");st.id="kseal-css";st.textContent=`
.kseal{display:inline-block;line-height:0;color:#b02a20}
.kseal svg{display:block;width:100%;height:100%;overflow:visible}
header.hud.has-kseal{position:relative;--kseal:38px;--ksealT:7px;--ksealR:8px}
header.hud>.kseal-hud{position:absolute;top:var(--ksealT);right:var(--ksealR);width:var(--kseal);height:var(--kseal);pointer-events:none;z-index:2;opacity:.92;mix-blend-mode:multiply}
header.hud.has-kseal:not(.kseal-pad)>#k3tc{margin-right:calc(var(--kseal) + var(--ksealR) + 4px)!important}
header.hud.has-kseal.kseal-pad{padding-right:calc(var(--kseal) + var(--ksealR) + 8px)!important}
header.hud.kseal-pad>.kseal-hud{top:calc(50% - var(--kseal) / 2)}
/* one-row bar 1000–1179 px (iPad landscape small): the quẻ line ran into the stat cells even before the seal (−58 px with "Quẻ Thượng
   thượng (Giao thiệp)" at 1000 px); the stat cells take the phone's label form (icon only, name in the tooltip) so time + quẻ, cells and
   seal all fit */

`;document.head.appendChild(st)})();
if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);try{(window.renderAfter||((k,f)=>f()))("kitSealHud",kitSealHud)/* oi-render: reads the bar's boxes — once at the end of a render (jlag2) */}catch(e){}return r}}
try{kitSealHud()}catch(e){}
/* ================= §39.1 THE SEAL ON EVERY EVENT FRAME (owner 15/11 ~20:15Z, review/cal-plus) =================
   Every event dialog (#modal showing an event of the queue: kitEventDp person dialogs, the 32.7 person dialog, place-event frames, event stages,
   plain event cards, news / intel / result / night / end / reward cards — kpKind in KSEAL_EV.kinds; tool panels such as rules, info, the person
   card, shop, act pickers, the calendar are not events) wears ONE kitSeal in a corner of its frame. A mark only (aria-hidden, no tap).
   Placement (owner 21/11 ~03:47Z, #44): ONE fixed place on every frame, never measured: the top-right corner of the header bar (.kph), one size (KSEAL_EV.fix); the header reserves the room. */
const KSEAL_EV={fix:34,padT:4,padR:52,sz:[34],pad:6,gap:3,kinds:new Set(["choice","notice","news","intel","result","night","end","threat","evidence","reward","honor"])};
function kitSealEvIs(m,dlg){try{if(!m||!dlg)return false;if(/pcm/.test(m.cls||"")||m.act||m.shop)return false;
 if(m.pid&&typeof KIT_ACT_PIDS!=="undefined"&&KIT_ACT_PIDS.has(m.pid))return false;
 const k=dlg.dataset.kind||(typeof kpKind==="function"?kpKind(m):"");const own=m.kit&&m.kit.kind;
 if(own)return KSEAL_EV.kinds.has(k);
 /* a queue item without its own kind is something that HAPPENED (event, news, pay day …); only the HUD help cards are tools */
 if(k==="rule"&&(/^(Thang|Ra vào|Quẻ)/.test(String(m.t||""))||(typeof HXN==="object"&&Object.keys(HXN||{}).some(x=>HXN[x]===m.t))))return false;return true}catch(e){return false}}
/* the parts of the dialog the seal must never touch (screen rects) */
function kitSealOcc(dlg,seal){const L=[];const add=r=>{if(r.width>0.5&&r.height>0.5)L.push(r)};const vis=e=>{const c=getComputedStyle(e);return c.visibility!=="hidden"&&c.display!=="none"&&+c.opacity>0.05};
 const tw=document.createTreeWalker(dlg,NodeFilter.SHOW_TEXT,{acceptNode:n=>/\S/.test(n.nodeValue)&&!(seal&&seal.contains(n))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
 const rg=document.createRange();let n;while((n=tw.nextNode())){const p=n.parentElement;if(!p||!p.offsetParent&&getComputedStyle(p).position!=="fixed")continue;rg.selectNodeContents(n);for(const r of rg.getClientRects())add(r)}
 dlg.querySelectorAll("button,a,input,textarea,select,img,svg,canvas,video,[role=button],.kchip,.ksart,.kit-x,.pframe,.kmood,.kemo").forEach(e=>{if(seal&&(seal===e||seal.contains(e)))return;if(e.closest("svg")&&e.tagName.toLowerCase()!=="svg")return;if(!e.getClientRects().length||!vis(e))return;add(e.getBoundingClientRect())});
 dlg.querySelectorAll("*").forEach(e=>{if(seal&&seal.contains(e))return;if(e.scrollHeight>e.clientHeight+2||e.scrollWidth>e.clientWidth+2){const c=getComputedStyle(e);if(/(auto|scroll)/.test(c.overflowY+c.overflowX))add(e.getBoundingClientRect())}});
 return L}
function kitSealEvPlace(){const M=document.getElementById("modal");const dlg=M&&!M.hidden?M.querySelector(".dlg"):null;
 document.querySelectorAll("#modal .kseal-ev").forEach(x=>{if(!dlg||x.parentNode!==dlg)x.remove()});if(!dlg)return;const m=Q[0];
 let s=dlg.querySelector(":scope > .kseal-ev");if(!kitSealEvIs(m,dlg)){if(s)s.remove();dlg.classList.remove("kseal-room");dlg.__ksM=null;return}
 if(dlg.__ksM!==m){dlg.__ksM=m;dlg.classList.remove("kseal-room")}
 if(!s){dlg.insertAdjacentHTML("beforeend",kitSeal({cls:"kseal-ev"}));s=dlg.querySelector(":scope > .kseal-ev")}
 if(getComputedStyle(dlg).position==="static")dlg.style.position="relative";
 /* OWNER 21/11 ~03:47Z (#44): "chỗ có, chỗ không" — ONE rule, ONE place, ONE size on EVERY dialog frame, Fold + iPad: the TOP-RIGHT corner of the frame's header bar (.kph),
    size KSEAL_EV.fix; the header reserves the room (padding-right), so it never covers a word. No measuring, no corner search, no bottom strip. */
 dlg.classList.remove("kseal-room");s.style.setProperty("--kseal",KSEAL_EV.fix+"px");s.style.left="auto";s.style.bottom="auto";s.style.right=KSEAL_EV.padR+"px";s.style.top=KSEAL_EV.padT+"px";s.dataset.c="tr";s.dataset.sz=KSEAL_EV.fix}
window.kitSealEvPlace=kitSealEvPlace;
(function(){let tm=0;const later=()=>{if(tm)return;tm=setTimeout(()=>{tm=0;try{kitSealEvPlace()}catch(e){}},90)};window.__ksealLater=later;
 if(typeof showModal==="function"){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{requestAnimationFrame(()=>{try{kitSealEvPlace()}catch(e){}});setTimeout(later,400);setTimeout(later,1200)}catch(e){}return r}}
 addEventListener("resize",later);document.addEventListener("load",e=>{if(e.target&&e.target.tagName==="IMG"&&e.target.closest&&e.target.closest("#modal"))later()},true);
 const hook=()=>{const M=document.getElementById("modal");if(!M||M.__ksObs)return;M.__ksObs=1;
  try{const mine=n=>n&&n.nodeType===1&&n.closest&&n.closest(".kseal-ev");
  new MutationObserver(ms=>{if(ms.some(x=>x.type==="attributes"?!mine(x.target):![...x.addedNodes,...x.removedNodes].every(mine)))later()}).observe(M,{childList:true,subtree:true,attributes:true,attributeFilter:["hidden","class","style"]})}catch(e){}
  try{window.__ksRO=new ResizeObserver(later);const d=M.querySelector(".dlg");if(d){d.__ksRO=1;window.__ksRO.observe(d)}}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",hook);else hook()})();
(function(){const st=document.createElement("style");st.id="kseal-ev-css";st.textContent=`
#modal .dlg>.kseal-ev{position:absolute;width:var(--kseal,36px);height:var(--kseal,36px);z-index:3;pointer-events:none;opacity:.9;mix-blend-mode:multiply}
#modal .dlg:has(>.kseal-ev)>.kph{padding-right:calc(var(--kseal,34px) + 62px)!important;box-sizing:border-box}`;document.head.appendChild(st)})();
