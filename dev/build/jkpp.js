/* ================= jkpp: KIT §6.5 PERSON PANEL B — THE person-info panel (owner 26/11 ~20:15Z «Chọn cách B cho hậu cung», OD row same time) =================
   ONE kit part for EVERY person-info card (pcard → kitPcFix → kitPcKeyFit): Hậu cung Chí tôn / Phi tần / Nam nhân / Cung nhân, Hoàng tự, Việc nhờ,
   Kỳ tuyển tú, family / ward / thái tử cards — any .pc.kpwide[data-k2] (Fold 755x1000 portrait and iPad 1180x820 landscape are both «wide»).
   LEFT  = slim standing-portrait strip: name + rank + the SAME kit frame (pcPort) at KPP.w px (her pick: smaller here, overrides OD 18/11
           «không thu nhỏ ảnh» for this panel ONLY).
   RIGHT = 3 tabs (kit tabs .pctabs/.pct): «Thông tin» (Sở trường/Tính nết/Đã biết/Dạo này .pcf + tiles/facts .kpfacts + wear .kwear) ·
           «Giao tình» (relation bars .kpbars + relation rows .pcrows + the two-way key .kpkey, law 1) · «Việc» (act-group tabs + note + acts).
           Default «Việc»; the pick is remembered for the next card (KPP.cur).
   ACTS  = the COMPACT ACT FORM (kitActMini, KIT §13.7): same button.ka, same handlers; one line «title · odds word · ⓘ», one line «Tốn … · Được …»,
           «Cần: …» only on a closed act. Line 2 may fold behind ⓘ (owner, same OD row); ⓘ = the existing kitActZoom enlarge (NO FLIP, OD 26/11 ~23:58Z).
   No scroll: the card is the fixed frame (--kpcmax); the act area fits whole buttons (kitPPFit); only if a person has more acts than fit, the act
   grid snaps by whole rows (a button is never cut).
   Built INSIDE the card right after kitPcFix/kitPcKeyFit (no MutationObserver, no DOM hack after paint): real nodes are moved, nothing copied. */
const KPP={w:104,l:116,cur:"act",tabs:[["info","Thông tin"],["rel","Giao tình"],["act","Việc"]]};
function kitActMini(b){try{if(!b||b.querySelector(":scope>.kam"))return;const T=x=>x?x.textContent.replace(/\s+/g," ").trim():"";
 const t=b.querySelector(".kan"),od=b.querySelector(".kodds,.oc"),rows=[...b.querySelectorAll(".kb .kr")],lab=r=>T(r.querySelector(".krl"));
 const ton=rows.filter(r=>/^Tốn$/i.test(lab(r))).map(r=>r.querySelector(".krv"))[0];
 const du=rows.filter(r=>/^(Được|Thành)$/i.test(lab(r))).map(r=>T(r.querySelector(".krv"))).filter(Boolean);
 const nd=b.querySelector(".kpabox .krv")||rows.filter(r=>/^Cần$/i.test(lab(r))).map(r=>r.querySelector(".krv"))[0],info=b.querySelector(".kainfo");
 const tonTx=ton?([...ton.children].length>1?[...ton.children].map(T).filter(x=>x&&!/^[·•\s]+$/.test(x)).join(" · "):T(ton)):"";
 const d=document.createElement("span");d.className="kam";
 d.innerHTML=`<span class="kam1"><span class="kamt">${T(t)}</span>${od?od.outerHTML:""}${info?'<span class="kami" role="button" title="Xem thêm">ⓘ</span>':""}</span>`+
  `<span class="kam2">${tonTx?'<span class="krl">Tốn</span>'+tonTx:""}${tonTx&&du.length?'<span class="kamsep">·</span>':""}${du.length?'<span class="krl">Được</span>'+du.join(" · "):""}</span>`+
  (b.classList.contains("kdis")&&nd?`<span class="kam3">Cần: ${T(nd)}</span>`:"");
 b.appendChild(d);b.classList.add("kamini");const i=d.querySelector(".kami");if(i&&info)i.addEventListener("click",e=>{e.stopPropagation();e.preventDefault();info.click()})}catch(e){console.error("kitActMini",e)}}
window.kitActMini=kitActMini;
function kitPPTab(pc,v){pc.dataset.kppv=v;KPP.cur=v;pc.querySelectorAll(":scope>.pcr>.kppt>.pct").forEach(x=>x.classList.toggle("on",x.dataset.kppv===v));requestAnimationFrame(()=>{kitPPName(pc);kitPPFit(pc)})}
function kitPP(pc){try{if(!pc||!pc.classList||!pc.classList.contains("kpwide")||!pc.matches("[data-k2]"))return;const L=pc.querySelector(":scope > .pcl"),R=pc.querySelector(":scope > .pcr");if(!L||!R)return;
 let V=pc.dataset.kpp==="1"?{info:R.querySelector(':scope>.kppv[data-v="info"]'),rel:R.querySelector(':scope>.kppv[data-v="rel"]'),act:R.querySelector(':scope>.kppv[data-v="act"]')}:null;
 if(!V){V={};for(const [v,t] of KPP.tabs){const d=document.createElement("div");d.className="kppv";d.dataset.v=v;d.setAttribute("aria-label",t);V[v]=d}
  /* everything the right column held (sticky info block, note, act groups) → «Việc», then «Sở trường…» (.pcf) out of the sticky block → «Thông tin» */
  [...R.children].forEach(c=>V.act.appendChild(c));
  const tb=document.createElement("div");tb.className="pctabs kppt";tb.setAttribute("role","tablist");
  for(const [v,t] of KPP.tabs){const b=document.createElement("button");b.type="button";b.className="pct";b.dataset.kppv=v;b.textContent=t;b.addEventListener("click",e=>{e.stopPropagation();e.preventDefault();kitPPTab(pc,v)});tb.appendChild(b)}
  R.append(tb,V.info,V.rel,V.act);pc.dataset.kpp="1"}
 /* sort (again, idempotent): kitPcScroll / late wrappers may add rows under the portrait after the first pass */
 const pcf=V.act.querySelector(":scope>.kpstick>.pcf");if(pcf)V.info.prepend(pcf);
 const put=(sel,box)=>pc.querySelectorAll(sel).forEach(e=>{if(e.parentNode!==box)box.appendChild(e)});
 put(":scope>.pcl .kpbars",V.rel);put(":scope>.pcl .pcrows",V.rel);put(":scope>.pcl .kpkey",V.rel);
 put(":scope>.pcl .kpfacts",V.info);put(":scope>.pcl .kwear",V.info);
 /* wear row in «Thông tin» = the kit SLOT size (kitItem size "slot": picture + grade chip, name on tap/tooltip) so the whole row fits one line on Fold + iPad */
 {const kw=V.info.querySelector(":scope>.kwear:not([data-kpps])");if(kw&&typeof kitWearSlots==="function"&&typeof kitPersonByName==="function"){const p=kitPersonByName((L.querySelector(".pcname")||{}).textContent||"");const h=p?kitWearSlots(p,{size:"slot"}):"";if(h){const tmp=document.createElement("div");tmp.innerHTML=h;const nw=tmp.firstElementChild;if(nw){nw.dataset.kpps="1";kw.replaceWith(nw)}}}}
 const sc=L.querySelector(":scope>.kplscr");[...(sc?sc.children:[])].forEach(c=>V.info.appendChild(c));/* anything else under the portrait: Thông tin, never lost */
 [...L.children].forEach(c=>{if(!c.matches(".pcname,.pcrk,.pcp,.kplscr,.kpnm,.pgh"))V.info.appendChild(c)});
 for(const k of ["info","rel"])V[k].classList.toggle("kppempty",!V[k].children.length);
 pc.querySelectorAll(".pcb>button.ka").forEach(kitActMini);
 kitPPTab(pc,pc.dataset.kppv||KPP.cur)}catch(e){console.error("kitPP",e)}}
window.kitPP=kitPP;
/* the act grid shows whole buttons only: all fit → natural height; more than fit → every row = the area / n (snap by row) */
function kitPPFit(pc){try{const pcb=pc.querySelector(':scope>.pcr>.kppv[data-v="act"] .pcg.on>.pcb');if(!pcb||!pcb.offsetParent)return;pcb.style.removeProperty("--kppch");
 if(pcb.scrollHeight<=pcb.clientHeight+2){pcb.dataset.kppn="all";return}const cs=[...pcb.querySelectorAll(":scope>button.ka")].filter(e=>e.offsetParent);if(!cs.length)return;
 const gap=parseFloat(getComputedStyle(pcb).rowGap)||5;let H=0;cs.forEach(e=>{H=Math.max(H,Math.ceil(e.getBoundingClientRect().height))});
 const A=pcb.clientHeight;if(A<20)return;const n=Math.max(1,Math.floor((A+gap)/(H+gap)));pcb.style.setProperty("--kppch",Math.floor((A-gap*(n-1))/n)+"px");pcb.dataset.kppn=n}catch(e){}}
window.kitPPFit=kitPPFit;
/* the name never wraps and is never cut: the font steps down until it fits the strip (16 → 11 px); a name still too long at 11 px wraps */
function kitPPName(pc){try{const n=pc.querySelector(":scope>.pcl>.pcname");if(!n||!n.offsetParent)return;const L=n.parentNode;const W=L.clientWidth-4;n.classList.remove("kppwrap");pc.style.removeProperty("--kppnf");
 for(let f=16;f>=11;f--){pc.style.setProperty("--kppnf",f+"px");if(n.scrollWidth<=W)return}n.classList.add("kppwrap")}catch(e){}}
window.kitPPName=kitPPName;
(function(){
 if(typeof kitPcFix==="function"){const f0=kitPcFix;kitPcFix=function(pc){const r=f0.apply(this,arguments);kitPP(pc);return r};window.kitPcFix=kitPcFix}
 if(typeof kitPcKeyFit==="function"){const k0=kitPcKeyFit;kitPcKeyFit=function(pc){const r=k0.apply(this,arguments);kitPP(pc);return r};window.kitPcKeyFit=kitPcKeyFit}
 if(typeof kaNorm==="function"){const n0=kaNorm;kaNorm=function(root){const r=n0.apply(this,arguments);try{const R0=root&&root.querySelectorAll?root:document;R0.querySelectorAll(".pc[data-kpp] .pcb>button.ka").forEach(kitActMini)}catch(e){}return r};window.kaNorm=kaNorm}
 addEventListener("resize",()=>{clearTimeout(window.__kppR);window.__kppR=setTimeout(()=>document.querySelectorAll(".pc[data-kpp]").forEach(pc=>{kitPPName(pc);kitPPFit(pc)}),120)});
 const P="html body .pc.kpwide[data-k2][data-kpp]";
 const st=document.createElement("style");st.id="kit-pp";st.textContent=`
${P}{--kpcw:${KPP.w}px!important;--kpcl:${KPP.l}px!important;grid-template-columns:${KPP.l}px minmax(0,1fr)!important}
${P}>.pcl>.kplscr{display:none!important}
${P}>.pcl>.pcname{white-space:nowrap;overflow:visible;font-size:var(--kppnf,1rem)!important;text-align:center;max-width:100%;justify-content:center}
${P}>.pcl>.pcname.kppwrap{white-space:normal!important}
${P}>.pcr{overflow:hidden!important;display:flex!important;flex-direction:column;padding-bottom:4px}
${P}>.pcr>*{flex-shrink:0}
${P}>.pcr>.kppt{display:flex;gap:4px;margin:0 0 6px;flex-wrap:nowrap}
${P}>.pcr>.kppt>.pct{flex:1 1 0;text-align:center;white-space:nowrap}
${P}>.pcr>.kppv{display:none;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--gold,#b8892f) transparent}
${P}[data-kppv="info"]>.pcr>.kppv[data-v="info"],${P}[data-kppv="rel"]>.pcr>.kppv[data-v="rel"]{display:block;flex:1 1 0}
${P}[data-kppv="act"]>.pcr>.kppv[data-v="act"]{display:flex;flex-direction:column;flex:1 1 0;overflow:hidden}
${P}>.pcr>.kppv.kppempty::before{content:"Chưa rõ.";display:block;color:var(--dim);font-size:.9em;padding:6px 2px}
${P}>.pcr>.kppv[data-v="act"]>*{flex-shrink:0}
${P}>.pcr>.kppv[data-v="act"]>.kpstick{position:static!important;box-shadow:none!important;margin:0 0 4px!important;padding:2px 0 4px!important}
${P}>.pcr>.kppv[data-v="act"]>.pcg.on{display:flex!important;flex-direction:column;flex:1 1 0;min-height:0}
${P}>.pcr>.kppv[data-v="act"]>.pcg.on>.pcb{flex:1 1 0;min-height:0;overflow-y:auto;overflow-x:hidden;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:5px;align-content:start;grid-auto-rows:var(--kppch,auto);scroll-snap-type:y mandatory;scrollbar-width:thin}
${P}>.pcr>.kppv[data-v="info"] .pcf{max-height:none!important;overflow:visible!important}
${P}>.pcr>.kppv .kwear{float:none;width:auto;margin:6px 0 0;display:flex!important;flex-wrap:wrap;gap:4px;align-items:flex-start}
${P}>.pcr>.kppv .kwear>.kitem{flex:0 0 46px!important;width:46px!important;max-width:46px!important;min-width:0!important}
${P}>.pcr>.kppv .kwear>.kitem .kitb{width:46px!important;height:46px!important}
${P} .pcb>button.ka.kamini{scroll-snap-align:start;box-sizing:border-box;display:block!important;height:auto;min-height:0!important;padding:5px 9px 6px!important;text-align:left}
${P} .pcb>button.ka.kamini>*:not(.kam){display:none!important}
${P} .pcb>button.ka.kamini[style*="--kppch"],${P} .pcb[style*="--kppch"]>button.ka.kamini{height:100%}
.kam{display:block;min-width:0}
.kam1{display:flex;align-items:center;gap:6px;justify-content:space-between}
.kamt{font-weight:700;font-size:.92em;min-width:0}
.kam2{display:block;font-size:.8em;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.kam2 .krl{margin-right:3px}.kam2 .kamsep{opacity:.5;margin:0 4px}
.kam3{display:block;font-size:.76em;color:#9a2c1c;margin-top:1px}
.kami{margin-left:4px;font-size:.95em;opacity:.75;padding:0 2px;cursor:pointer}
`;document.head.appendChild(st);
 try{document.querySelectorAll(".pc[data-k2]").forEach(kitPP)}catch(e){}
})();
/* sample page §6.4b (#kit): a LIVE consort card (rvCard) in a Fold-size box, built by the same kitPcFix → kitPP chain; no live life → a note */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.4b",title:"Khung người B: dải chân dung + 3 thẻ Thông tin · Giao tình · Việc + nút việc gọn",where:"<b>kitPP</b> (jkpp) on every <code>.pc.kpwide[data-k2]</code> via kitPcFix / kitPcKeyFit; compact act form <code>kitActMini(button.ka)</code>; sizes <code>KPP.w</code> / <code>KPP.l</code>.",html:()=>{
 const live=typeof S!=="undefined"&&S&&typeof rivals!=="undefined"&&rivals&&rivals[0]&&typeof rvCard==="function";if(!live)return `<div class="kitpg-row"><i>Mở một kiếp rồi mở trang mẫu để xem khung người B.</i></div>`;
 setTimeout(()=>{try{document.querySelectorAll("#kitpage .kpp-demo .pc").forEach(pc=>{pc.style.setProperty("--kpcmax","520px");kitPcFix(pc);kitPP(pc);if(typeof kaNorm==="function")kaNorm(pc)})}catch(e){console.error(e)}},60);
 return `<div class="kitpg-row kpp-demo" style="width:min(735px,100%);height:540px;overflow:hidden">${rvCard(rivals[0],0)}</div>`}})}catch(e){}

/* KIT §6.4c ROUND PICKER AVATAR — Hậu cung person-picker row ONLY (owner 27/11 ~00:05Z «trên này nên để hình tròn đi, cho đỡ choáng chỗ» + ~00:08Z «Chỉ có chỗ đó đổi tròn thôi,
   còn khung ở avatar người được chọn vẫn ở dưới»; overrides KIT §4.2 «no round avatars» for THIS row only). The pager strip faces of Chí tôn / Phi tần / Nam nhân / Cung nhân
   (pager keys court · rv · men · staff) show the SAME portrait picture (mdH → pcPort cell) cropped to a KPR.d px circle: frame, pendant, tassel, crest, label hidden. Every other
   picker / list (Hoàng tự, Giao tình, dialogs) and the selected person's big frame below are unchanged. */
const KPR={d:50,keys:["court","rv","men","staff"]};
(function(){const S0=KPR.keys.map(k=>`html body #panel .pstrip .pface[data-pg="${k}"]>.md.kit`).join(",");const S=x=>KPR.keys.map(k=>`html body #panel .pstrip .pface[data-pg="${k}"]>.md.kit${x}`).join(",");
 const st=document.createElement("style");st.id="kit-pp-round";st.textContent=`
${S0}{width:${KPR.d}px!important;height:${KPR.d}px!important;min-width:${KPR.d}px!important;max-width:none!important;aspect-ratio:1!important;border-radius:50%!important;overflow:hidden!important;margin:0 auto 2px!important;padding:0!important;position:relative!important;display:block!important;box-shadow:0 0 0 2px var(--rt,#c9a24a),0 1px 3px #0003!important;background:var(--k-card,#fffaf0)}
${S(">.kin")}{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;transform:none!important;margin:0!important}
${S(" .kin>.kfr")},${S(" .kin>.kgem")},${S(" .kin>.kemb")},${S(" .kin>.kemo")},${S(" .kin>.klab")},${S(" .kin>.kcrest")}{display:none!important}
${S(" .kin>.kbg")}{left:0!important;top:0!important;width:100%!important;height:100%!important}
${S(" .kin>img.kpor")}{left:0!important;top:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:50% 6%!important;transform:scale(1.15);transform-origin:50% 10%}
${KPR.keys.map(k=>`html body #panel .pstrip .pface[data-pg="${k}"]`).join(",")}{min-height:0!important}
${KPR.keys.map(k=>`html body #panel .pstrip .pface[data-pg="${k}"].on>.md.kit`).join(",")}{box-shadow:0 0 0 3px var(--gold,#b8892f),0 0 6px 1px #e8c46a!important}
`;document.head.appendChild(st)})();
