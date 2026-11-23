/* ================= jplst: PLACE STAGE LAYOUT (owner 18/11 ~02:50Z + ~03:02Z, s43 chat; OD:L1814, OD:L1818) =================
   NO plaque over the stage (#sc-t stays in the DOM as the carrier of the place name + visit line, but is hidden).
   (1) people-count chip = TOP of the left button column (kitStageRail item "here", kit chip j59ico + number),
   (2) place name = TOP of the right column (#kpname, kit paper .k3p, bigger font); the court cards (#kshR) stand under it,
   (3) the place-entry line (S.visit.msg: "Thái giám chặn cửa", "Hoàng thượng không ra vườn hôm nay"…) = the TIN BÁO TOAST of review/tinbao-ui (owner 18/11
       ~03:3xZ: "chip giống tai mắt báo"): `#ktbtoast.ktbt`, ONE gold pill line under the top bar, BAL.entryToastMs then fades, once per visit line. kitLineToast(text) here is a
       thin twin of jtinbao's toastShow (same ids/classes/CSS, copied verbatim); when jtinbao lands, kitLineToast becomes a call into it.
       A line that carries a BUTTON ("… vừa rời đi [Theo]") must stay tappable, so only that kind stays as the persistent top-of-stage chip (.kmnote.kmslot),
   (4) figures keep their full size; nothing is drawn over a head (the chip is one line high, the columns are at the edges). */
(function(){try{
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
function hereN(){try{return typeof kitHereCount==="function"?kitHereCount():0}catch(e){return 0}}
const onStage=()=>{try{return typeof kitSideHost!=="function"||kitSideHost()===$("stage")}catch(e){return true}};
function kitLineToast(text){try{if(!text)return null;try{const md=document.getElementById("modal");if(md&&!md.hidden)return null}catch(e){}
 const hud=document.querySelector("header.hud");let el=document.getElementById("ktbtoast");if(el)el.remove();
 el=document.createElement("div");el.id="ktbtoast";el.className="ktbt";el.setAttribute("role","status");el.innerHTML=`<span>${esc(text)}</span>`;
 const r=hud&&hud.getClientRects().length?hud.getBoundingClientRect():null;el.style.top=(r?Math.round(r.bottom+6):6)+"px";document.body.appendChild(el);
 /* keep-clear (jclose kitToastClear): below the tab rows / place name; no room left → the bottom spot above the tab bar, sliding up */
 try{if(typeof kitToastPlace==="function")kitToastPlace(el,"down")}catch(e){}
 try{if(typeof kitToastWatch==="function")kitToastWatch()}catch(e){}
 el.addEventListener("click",()=>el.remove());clearTimeout(kitLineToast.t);kitLineToast.t=setTimeout(()=>{el.classList.add("out");setTimeout(()=>{if(el.classList.contains("out"))el.remove()},500)},window.__toastKeep?60000:BAL.entryToastMs);return el}catch(e){return null}}
window.kitLineToast=window.kitLineToast||kitLineToast;
function lay(){try{const st=$("stage");if(!st)return;let nm=$("kpname"),en=$("kpent");
 const t=$("sc-t"),live=!!t&&!!S&&!S.dead&&onStage()&&st.getBoundingClientRect().height>40;
 const name=live?((t.querySelector(".rt1")||{}).textContent||"").trim():"";
 let line="";if(live){const m=t.querySelector(".rmsg");let raw=m?m.innerHTML:"";
  raw=raw.replace(/^\s*·\s*/,"").replace(/^\s*Ở đây (?:có|còn) \d+ người\.?\s*/,"").trim();/* the count is the icon now; a longer line keeps its own text */
  if(raw&&!/^Không gặp ai\.?$/.test(raw.replace(/<[^>]+>/g,"").trim()))line=raw}
 let toast="";if(line&&!/<button/i.test(line)){toast=line.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();line=""}
 /* once per visit + line (renders repeat; a new visit, even to the same place with the same text, toasts again) */
 const tk=S&&S.visit?S.visit:null;if(toast&&live){if(lay.v!==tk||lay.t!==toast){lay.v=tk;lay.t=toast;(window.kitLineToast||kitLineToast)(toast)}}else if(!toast&&live){lay.v=tk;lay.t=""}/* stage-here: a hidden stage (map tab, Fold panel tab) is not a new visit line: coming back never re-toasts it */
 /* (2) place name, top of the right column */
 if(name){if(!nm){nm=document.createElement("div");nm.id="kpname";nm.className="kpname";st.appendChild(nm)}
  /* owner 18/11 ~20:55Z: plain TEXT on the scene picture, no plaque / frame, not fixed-width; (owner 21/11 overwrites this: the big PALACE on line 1 (top), her smaller HALL on line 2 below) */
  const parts=name.split(/\s*·\s*/).filter(Boolean).slice(0,2),hh=parts.map(x=>`<span>${esc(x)}</span>`).join("");if(nm.__h!==hh){nm.innerHTML=hh;nm.__h=hh}nm.hidden=false;
  const h=Math.ceil(nm.getBoundingClientRect().height)+6;st.style.setProperty("--kpnh",h+"px");st.classList.add("kpn")}
 else{if(nm)nm.hidden=true;st.style.setProperty("--kpnh","0px");st.classList.remove("kpn")}
 /* (3) entry line chip, top of the stage */
 if(line){if(!en){en=document.createElement("div");en.id="kpent";en.className="kmnote kmslot";en.setAttribute("role","status")}
  const h='<span class="kchip n">'+line+'</span>';if(en.__h!==h){en.innerHTML=h;en.__h=h}if(en.parentNode!==st)st.appendChild(en);en.hidden=false}
 else if(en)en.hidden=true;
 }catch(e){console.error("jplst",e)}}
/* the chip never covers her marker (the flower above her head): if they meet, the chip starts to the right of the marker */
function placeEnt(){try{const en=$("kpent"),st=$("stage");if(!en||en.hidden||!st)return;en.style.left="";const ch=en.querySelector(".kchip");if(!ch)return;const mk=document.querySelector(".kmemark");
 if(mk&&mk.getClientRects().length){const R=st.getBoundingClientRect(),q=mk.getBoundingClientRect(),c=ch.getBoundingClientRect();
  if(q.right>c.left-4&&q.left<c.right+4&&q.top<c.bottom+2&&q.bottom>c.top-2)en.style.left=Math.round(q.right-R.left+8)+"px"}}catch(e){}}
function lay2(){lay();placeEnt();clearTimeout(lay2.a);clearTimeout(lay2.b);lay2.a=setTimeout(placeEnt,400);lay2.b=setTimeout(placeEnt,1300)}
/* ag-deed-perf (C-AG #12 18/11): a stage redraw INSIDE a sim step (j95 final wrapper, window.__rdefer > 0) queues lay2 (layout reads only:
   getBoundingClientRect + the toast/name/chip DOM; nothing in S) with the other stage fits for the next frame (jlag2 renderAfter, coalesced;
   a render() before then flushes it); every other redraw runs it at once, as before */
const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);if(window.__rdefer>0&&typeof window.renderAfter==="function")renderAfter("plst-lay",lay2);else lay2();return r};
if(typeof render==="function"){const rr=render;render=function(){const r=rr.apply(this,arguments);try{requestAnimationFrame(()=>{try{kitToastRefit()}catch(e){}})}catch(e){}return r}}/* toasts keep clear after every screen change */
try{addEventListener("resize",()=>{clearTimeout(lay.__t);lay.__t=setTimeout(lay2,90)})}catch(e){}
/* (1) the count chip: the kit rail's first slot */
try{if(window.kitStageRail)kitStageRail.add({id:"here",order:0,chip:()=>{const n=hereN();return n&&typeof j59ico==="function"?`<span class="kchip n j59hchip" role="img" aria-label="Ở đây còn ${n} người">${j59ico()}<span class="j59n">${n}</span></span>`:""},when:()=>hereN()>0&&onStage()})}catch(e){}
const css=document.createElement("style");css.id="kit-plst";css.textContent=`
:root{--kts:0 0 2px #fff8ee,0 0 5px #fff8ee,0 0 9px #fff8eecc}
html body .stage #sc-t{display:none!important}
.kpname{position:absolute;top:8px;right:10px;z-index:3;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-end;max-width:calc(100% - 80px);pointer-events:none;text-align:right;font-weight:800;font-size:1.1rem;line-height:1.2;color:#2a1a12;text-shadow:var(--kts)}
.kpname>span{white-space:nowrap}
html body .stage.kpn .kshR{top:calc(8px + var(--kpnh,0px))}
html body .stage.kpn .kshR.kasx{max-height:calc(100% - 16px - var(--kpnh,0px) - var(--kgrb,0px))}
html body .stage .kmnote.kmslot{position:absolute!important;top:6px!important;bottom:auto!important;left:62px;right:calc(var(--kgrw,150px) + 16px);translate:none!important;max-width:none;animation:none;display:flex;justify-content:center;z-index:6;pointer-events:none}
html body .stage .kmnote.kmslot[hidden]{display:none!important}
.kmnote.kmslot .kchip{font-size:.74rem;line-height:1.25;padding:3px 10px;white-space:normal;text-align:center;max-width:100%;pointer-events:auto}
.kmnote.kmslot .kchip .btn,.kmnote.kmslot .kchip button{pointer-events:auto;margin-left:6px}
.krailc{pointer-events:none;display:flex}
.ktbt{position:fixed;left:50%;transform:translateX(-50%);z-index:9760;max-width:calc(100vw - 24px);box-sizing:border-box;display:flex;align-items:center;gap:6px;padding:2px 12px 2px 4px;border-radius:13px;border:1.5px solid var(--trim,#e6c25a);
 background:#fffaf0f4;color:var(--ink,#3a2418);font:600 .8rem/1.25 var(--body,inherit);box-shadow:0 4px 14px #0004,0 0 0 1px var(--gold,#b8892b);cursor:pointer;transition:opacity .5s}
.ktbt.out{opacity:0}
`;document.head.appendChild(css);
}catch(e){console.error("jplst init",e)}})();
