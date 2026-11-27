/* ================= jkpp: KIT §6.4b PERSON INFO PANEL — info only, big portrait (owner 27/11 ~00:32Z + ~00:42Z, CANON OVERWRITE of the 26/11 ~20:15Z option-B «Việc» tab) =================
   ONE kit part for every person-info card of the PERSON TABS (KPP.on: Hậu cung › Chí tôn / Phi tần / Nam nhân / Cung nhân = court rv men staff, Hoàng tự = kid kvo kin hon qt):
   LEFT  = the ORIGINAL big portrait column she liked (LIVE §6.4: kitPcFitPortrait size, name, rank — untouched).
   RIGHT = kit tabs (.pctabs/.pct) «Thông tin» (.pcf + .kpfacts + .kwear) · «Giao tình» (.kpbars + .pcrows + .kpkey, law 1); footer = exactly TWO kit buttons
           «Tìm gặp» (.kbtn) · «Ghé cung» (.kbtn.alt) side by side (.kppbtns). NO act tab: the act groups the card
           still receives are kept out of sight (.kppact, display:none, nothing deleted) — the acts live where the person really is (Dư đồ meet pop-up / Hành sự, ACT-MOVE).
   BUTTONS: the targets come from ACT-MOVE's hook `amCardBtns(v,kind)` → positional [tìm, ghé] (html | "" | {why} | null = kit defaults) (existing buttons, their own data-* handlers); until it exists the kit uses
           the same existing buttons itself (j21 seeBtn / scoutBtn «Sai tai mắt dò nơi ở» / visitBtn, jgift courtMeet). The kit only owns the LOOK: title «Tìm gặp» /
           «Ghé cung», one short small line (place · odds word · khắc, or the lock reason), the source button's data-* attributes + disabled state are kept.
   Every other pcard (Việc nhờ, Kỳ tuyển tú, Giao tình, dialogs) keeps LIVE §6.4 unchanged. Built INSIDE the card after kitPcFix/kitPcKeyFit (no observer). */
const KPP={ws:46,wsMin:30,fSteps:[1,.96,.92,.89,.86],cur:"info",tabs:[["info","Thông tin"],["rel","Giao tình"]],on:["court","rv","men","staff","kid","kvo","kin","hon","qt"]};
/* who is this card about: pcard stamps the face key (pv/pEmp/pTH/pMaid f.w) as data-kppw; men / staff / kids fall back to the name */
function kppWho(pc){try{if(pc.dataset.amw&&typeof window.amWhoOf==="function"){const W=window.amWhoOf(pc.dataset.amw);if(W)return W}/* ACT-MOVE stamps staff / kids / lãnh cung cards */
 const w=(pc.dataset.kppw||"").split(":"),k=w[0];
 if(k==="r"){const v=rivals.find(x=>String(x.id)===w[1]);return v?{v,kind:"rv"}:null}
 if(k==="e")return{v:S.emp,kind:"emp"};if(k==="t")return{v:S.thO||{name:"Thái hậu"},kind:"th"};if(k==="m")return{v:S.maid,kind:"maid"};
 const nm=((pc.querySelector(":scope>.pcl>.pcname")||{}).textContent||"").trim();let v=typeof kitPersonByName==="function"?kitPersonByName(nm):null;
 if(!v&&S.men)v=S.men.find(x=>x&&x.name===nm)||null;if(!v&&S.kids)v=S.kids.find(x=>x&&typeof sname==="function"&&sname(x)===nm)||null;return v?{v,kind:"p"}:null}catch(e){return null}}
window.kppWho=kppWho;
/* the two source buttons (html) — ACT-MOVE hook first, else the existing buttons; a known reason when there is no target */
function kppSrc(W){const v=W.v,kind=W.kind;let r=null;
 /* ACT-MOVE hook (review/act-move jamove.js §6, ACT-MOVE-5): amCardBtns(v,kind) for EVERY kind (rv | emp | th | maid | p = staff / kids / court /
    other palaces' servants / lãnh cung) → positional [tìm, ghé]: html button · "" none · {why} disabled · null = kit defaults below (men → null) */
 if(typeof window.amCardBtns==="function"){try{const a=window.amCardBtns(v,kind);if(Array.isArray(a))r=[a[0]==null?"":a[0],a[1]==null?"":a[1]]}catch(e){console.error("amCardBtns",e)}}
 if(!r){r=["",""];try{
  if(kind==="rv"){r=[seeBtn(v)||scoutBtn(v)||"",visitBtn(v)||""];
   const why=!v.alive?"đã mất":v.out?"đang ở lãnh cung":"";if(!r[0])r[0]={why:why||(together(S,v)?"đang ở cùng chỗ với ta":"")};if(!r[1])r[1]={why:why||(sameHouse(S,v)?"ở cùng cung với ta":"")}}
  else if(kind==="emp"){const b=courtMeet("emp").find(h=>/data-(acask|kgmgo)=/.test(h));r=[b||{why:(S.where||{}).emp===S.place?"ngài đang ở đây":""},""]}
  else if(kind==="th"){const b=courtMeet("th").find(h=>/data-kgmgo=/.test(h));r=["",b||{why:S.place==="tn"?"đang ở Đức Thọ cung":""}]}
 }catch(e){console.error("kppSrc",e)}}
 return r}
/* one kit button from a source: title + ONE short small line (place · odds word · N khắc, or the lock reason) */
function kppBtn(src,title,alt){const cls=`kbtn${alt?" alt":""} kppb`;
 if(!src)return"";if(typeof src==="object"){return src.why?`<button type="button" class="${cls}" disabled>${title}<small><span class="kwhy">${src.why}</span></small></button>`:""}
 const t=document.createElement("div");t.innerHTML=src;const b=t.querySelector("button");if(!b)return"";
 const at=[...b.attributes].filter(a=>/^data-/.test(a.name)).map(a=>`${a.name}="${String(a.value).replace(/"/g,"&quot;")}"`).join(" ");
 const why=b.disabled?((b.querySelector(".kwhy")||{}).textContent||"").trim():"";
 const txt=(b.textContent||"").replace(/\s+/g," ");const kh=(txt.match(/(\d+)\s*khắc/)||[])[1];
 const od=b.querySelector(".kodds,.oc");const odw=od?(od.querySelector(".kow,.ocw")||od).textContent.replace(/\s+/g," ").trim():"";
 let pl="";try{const d=b.dataset;if(d.see)pl=placeName(whereOf(rivals.find(x=>x.id===+d.see)));else if(d.visit)pl=accName(palaceOf(rivals.find(x=>x.id===+d.visit)));
  else if(d.scout)pl="dò nơi ở";else if(d.kgmgo||d.acask)pl=accName(d.kgmgo||d.acask);else if(d.kppl)pl=d.kppl}catch(e){}
 const sm=why?`<span class="kwhy">${why}</span>`:[pl,odw,kh?kh+" khắc":""].filter(Boolean).join(" · ");
 return `<button type="button" class="${cls}" ${at}${b.disabled?" disabled":""}>${title}${sm?`<small>${sm}</small>`:""}</button>`}
function kitPPBtns(pc){try{const R=pc.querySelector(":scope>.pcr");if(!R)return;let box=R.querySelector(":scope>.kppbtns");const W=kppWho(pc);
 const h=W?(()=>{const r=kppSrc(W);return kppBtn(r[0],"Tìm gặp",false)+kppBtn(r[1],"Ghé cung",true)})():"";
 if(!h){if(box)box.remove();return}if(!box){box=document.createElement("div");box.className="kppbtns";R.appendChild(box)}
 if(box.dataset.h!==h){box.innerHTML=h;box.dataset.h=h}}catch(e){console.error("kitPPBtns",e)}}
window.kitPPBtns=kitPPBtns;
/* ONE FACT ONCE in «Thông tin» (law 11, every KPP.on kind): one label = one line. Labels are read from the kit rows (.krl), the stat chips (.kstl) and the
   «Label: …» lines of the facts block; «Tính» = «Tính nết». A later line with a label already shown is dropped (an informative one replaces an earlier «chưa rõ»);
   a facts line keeps only its «Hay: …» part (.past) when its label is already shown. Nothing is deleted from the game data — only the repeat on this card. */
const KPP_LBL={"tính":"tính nết","tính cách":"tính nết"};
function kppLbl(t){t=String(t||"").replace(/[:：]\s*$/,"").replace(/\s+/g," ").trim().toLowerCase();return KPP_LBL[t]||t}
function kppUnk(t){return /^(chưa rõ|\?|không rõ|chưa biết)$/i.test(String(t||"").replace(/\s+/g," ").trim())}
function kitPPDedupe(box){try{const seen={};
 const rowOf=(lab,val,el)=>{const k=kppLbl(lab);if(!k)return;const o=seen[k];
  if(!o){seen[k]={el,unk:kppUnk(val)};return}
  if(o.unk&&!kppUnk(val)){o.el.dataset.kppdup="1";o.el.hidden=true;seen[k]={el,unk:false};return}
  el.dataset.kppdup="1";el.hidden=true};
 box.querySelectorAll(".pcf .kr").forEach(r=>{const l=r.querySelector(":scope>.krl"),v=r.querySelector(":scope>.krv");if(l)rowOf(l.textContent,v?v.textContent:"",r)});
 box.querySelectorAll(".kpfacts .pcinfo>span").forEach(sp=>{if(sp.dataset.kppd)return;const m=/^\s*([^:：]{1,24})[:：]/.exec(sp.firstChild&&sp.firstChild.nodeType===3?sp.firstChild.textContent:"");if(!m)return;const k=kppLbl(m[1]);
  if(!seen[k]){seen[k]={el:sp,unk:false};return}const hay=sp.querySelector(":scope>.past");sp.dataset.kppd="1";if(hay)sp.replaceChildren(hay);else{sp.hidden=true;sp.dataset.kppdup="1"}});
 box.querySelectorAll(".kst").forEach(c=>{const l=c.querySelector(".kstl"),v=c.querySelector(".kstv");if(l)rowOf(l.textContent,v?v.textContent:"",c)});
 box.querySelectorAll(".chips>.chip").forEach(c=>{const m=/^\s*(Tính nết|Tính)\b/i.exec(c.textContent||"");if(m)rowOf(m[1],c.textContent.slice(m[0].length),c)})}catch(e){console.error("kitPPDedupe",e)}}
window.kitPPDedupe=kitPPDedupe;
function kitPPTab(pc,v){pc.dataset.kppv=v;KPP.cur=v;pc.querySelectorAll(":scope>.pcr>.kppt>.pct").forEach(x=>x.classList.toggle("on",x.dataset.kppv===v));requestAnimationFrame(()=>{kitPPWear(pc);kitPPFitTab(pc)})}
/* the wear row of «Thông tin» stays ONE line: slot size = the width / slots (KPP.ws max 46, min KPP.wsMin), so nothing wraps under the fold of the tab */
function kitPPWear(pc){try{const kw=pc.querySelector(':scope>.pcr>.kppv[data-v="info"]>.kwear');if(!kw||!kw.offsetParent)return;const n=kw.querySelectorAll(":scope>.kitem").length;if(!n)return;
 const W=kw.clientWidth,g=4;const z=Math.max(KPP.wsMin,Math.min(KPP.ws,Math.floor((W-g*(n-1))/n)));kw.style.setProperty("--kppws",z+"px")}catch(e){}}
window.kitPPWear=kitPPWear;
/* the open tab never scrolls when a step smaller text fits it: font steps 1 → KPP.fMin em (like the name font-fit); still too long at the floor → that tab scrolls on its own (never cut) */
function kitPPFitTab(pc){try{const v=pc.querySelector(`:scope>.pcr>.kppv[data-v="${pc.dataset.kppv}"]`);if(!v||!v.offsetParent)return;v.style.removeProperty("--kppif");
 for(const f of KPP.fSteps){v.style.setProperty("--kppif",f);if(v.scrollHeight<=v.clientHeight+1)return}}catch(e){}}
window.kitPPFitTab=kitPPFitTab;
function kppOn(pc){try{return pc.closest("#panel")&&typeof tab!=="undefined"&&KPP.on.includes(tab)}catch(e){return false}}
function kitPP(pc,force){try{if(!pc||!pc.classList||!pc.classList.contains("kpwide")||!pc.matches("[data-k2]")||!(force===true||pc.dataset.kpp==="1"||kppOn(pc)))return;const L=pc.querySelector(":scope > .pcl"),R=pc.querySelector(":scope > .pcr");if(!L||!R)return;
 let V=pc.dataset.kpp==="1"?{info:R.querySelector(':scope>.kppv[data-v="info"]'),rel:R.querySelector(':scope>.kppv[data-v="rel"]'),act:R.querySelector(':scope>.kppact')}:null;
 if(!V){V={};for(const [v,t] of KPP.tabs){const d=document.createElement("div");d.className="kppv";d.dataset.v=v;d.setAttribute("aria-label",t);V[v]=d}
  V.act=document.createElement("div");V.act.className="kppact";V.act.hidden=true;
  /* everything the right column held (sticky info block, note, act groups) → the hidden act holder; then «Sở trường…» (.pcf) out of it → «Thông tin» */
  [...R.children].forEach(c=>V.act.appendChild(c));
  const tb=document.createElement("div");tb.className="pctabs kppt";tb.setAttribute("role","tablist");
  for(const [v,t] of KPP.tabs){const b=document.createElement("button");b.type="button";b.className="pct";b.dataset.kppv=v;b.textContent=t;b.addEventListener("click",e=>{e.stopPropagation();e.preventDefault();kitPPTab(pc,v)});tb.appendChild(b)}
  R.append(tb,V.info,V.rel,V.act);pc.dataset.kpp="1"}
 /* sort (again, idempotent): kitPcScroll / late wrappers may add rows under the portrait after the first pass */
 const pcf=V.act.querySelector(".kpstick>.pcf, :scope>.pcf");if(pcf)V.info.prepend(pcf);
 const put=(sel,box)=>pc.querySelectorAll(sel).forEach(e=>{if(e.parentNode!==box)box.appendChild(e)});
 put(":scope>.pcl .kpbars",V.rel);put(":scope>.pcl .pcrows",V.rel);put(":scope>.pcl .kpkey",V.rel);
 put(":scope>.pcl .kpfacts",V.info);put(":scope>.pcl .kwear",V.info);
 /* wear row in «Thông tin» = the kit SLOT size (kitItem size "slot") so the row stays one line */
 {const kw=V.info.querySelector(":scope>.kwear:not([data-kpps])");if(kw&&typeof kitWearSlots==="function"&&typeof kitPersonByName==="function"){const p=kitPersonByName((L.querySelector(".pcname")||{}).textContent||"");const h=p?kitWearSlots(p,{size:"slot"}):"";if(h){const tmp=document.createElement("div");tmp.innerHTML=h;const nw=tmp.firstElementChild;if(nw){nw.dataset.kpps="1";kw.replaceWith(nw)}}}}
 /* the two buttons are the right column footer: one row, kept once (late wrappers may sweep children around) */
 {const bs=[...pc.querySelectorAll(".kppbtns")];bs.slice(1).forEach(b=>b.remove());if(bs[0]&&bs[0].parentNode!==R)R.appendChild(bs[0])}
 const sc=L.querySelector(":scope>.kplscr");[...(sc?sc.children:[])].forEach(c=>V.info.appendChild(c));/* anything else under the portrait: Thông tin, never lost */
 [...L.children].forEach(c=>{if(!c.matches(".pcname,.pcrk,.pcp,.kplscr,.kpnm,.pgh,.kppbtns"))V.info.appendChild(c)});
 kitPPDedupe(V.info);
 for(const k of ["info","rel"])V[k].classList.toggle("kppempty",!V[k].children.length);
 kitPPBtns(pc);kitPPTab(pc,pc.dataset.kppv||KPP.cur)}catch(e){console.error("kitPP",e)}}
window.kitPP=kitPP;
(function(){
 if(typeof pcard==="function"){const p0=pcard;pcard=function(o){const h=p0.apply(this,arguments);try{const w=o&&o.f&&o.f.w;if(w&&typeof h==="string")return h.replace(/<div class="pc(?=[ "])/,`<div data-kppw="${w.join(":")}" class="pc`)}catch(e){}return h};window.pcard=pcard}
 if(typeof kitPcFix==="function"){const f0=kitPcFix;kitPcFix=function(pc){const r=f0.apply(this,arguments);kitPP(pc);return r};window.kitPcFix=kitPcFix}
 if(typeof kitPcKeyFit==="function"){const k0=kitPcKeyFit;kitPcKeyFit=function(pc){const r=k0.apply(this,arguments);kitPP(pc);return r};window.kitPcKeyFit=kitPcKeyFit}
 addEventListener("resize",()=>{clearTimeout(window.__kppR);window.__kppR=setTimeout(()=>document.querySelectorAll(".pc[data-kpp]").forEach(pc=>{kitPPWear(pc);kitPPFitTab(pc)}),120)});
 const P="html body .pc.kpwide[data-k2][data-kpp]";
 const st=document.createElement("style");st.id="kit-pp";st.textContent=`
${P}>.pcl>.kplscr{display:none!important}
${P}>.pcr>.kppbtns{display:flex;gap:8px;margin:4px 0 0;padding-top:5px;border-top:1px solid var(--line,#d8c3a0)}
${P}>.pcr>.kppbtns>.kbtn{flex:1 1 0;min-width:0;margin:0;min-height:42px;padding:4px 8px;white-space:normal;text-align:center;line-height:1.2}
${P}>.pcr>.kppbtns>.kbtn>small{display:block;font-size:.74em;font-weight:400;opacity:.9;margin-top:1px;line-height:1.25}
${P}>.pcr{overflow:hidden!important;display:flex!important;flex-direction:column;padding-bottom:4px}
${P}>.pcr>*{flex-shrink:0}
${P}>.pcr>.kppt{display:flex;gap:4px;margin:0 0 6px;flex-wrap:nowrap}
${P}>.pcr>.kppt>.pct{flex:1 1 0;text-align:center;white-space:nowrap}
${P}>.pcr>.kppv{font-size:calc(var(--kppif,1)*1em);display:none;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--gold,#b8892f) transparent}
${P}>.pcr>.kppact{display:none!important}
${P}[data-kppv="info"]>.pcr>.kppv[data-v="info"],${P}[data-kppv="rel"]>.pcr>.kppv[data-v="rel"]{display:block;flex:1 1 0}
${P}>.pcr>.kppv.kppempty::before{content:"Chưa rõ.";display:block;color:var(--dim);font-size:.9em;padding:6px 2px}
${P}>.pcr>.kppv[data-v="info"] .pcf{max-height:none!important;overflow:visible!important}
${P}>.pcr>.kppv .kwear{float:none;width:auto;margin:6px 0 0;display:flex!important;flex-wrap:wrap;gap:4px;align-items:flex-start}
${P}>.pcr>.kppv .kwear>.kitem{flex:0 0 var(--kppws,46px)!important;width:var(--kppws,46px)!important;max-width:var(--kppws,46px)!important;min-width:0!important}
${P}>.pcr>.kppv .kwear>.kitem .kitb{width:var(--kppws,46px)!important;height:var(--kppws,46px)!important}
`;document.head.appendChild(st);
 try{document.querySelectorAll(".pc[data-k2]").forEach(kitPP)}catch(e){}
})();
/* sample page §6.4b (#kit): a LIVE consort card (rvCard) in a Fold-size box, built by the same kitPcFix → kitPP chain; no live life → a note */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.4b",title:"Khung người (chỉ thông tin): khung chân dung lớn + 2 thẻ Thông tin · Giao tình + 2 nút Tìm gặp · Ghé cung",where:"<b>kitPP</b> (jkpp) on every <code>.pc.kpwide[data-k2]</code> of the person tabs (<code>KPP.on</code>) via kitPcFix / kitPcKeyFit; buttons <code>kitPPBtns</code> (targets: ACT-MOVE <code>amCardBtns(v,kind)</code>, else j21 / jgift buttons).",html:()=>{
 const live=typeof S!=="undefined"&&S&&typeof rivals!=="undefined"&&rivals&&rivals[0]&&typeof rvCard==="function";if(!live)return `<div class="kitpg-row"><i>Mở một kiếp rồi mở trang mẫu để xem khung người.</i></div>`;
 setTimeout(()=>{try{document.querySelectorAll("#kitpage .kpp-demo .pc").forEach(pc=>{pc.style.setProperty("--kpcmax","520px");kitPcFix(pc);kitPP(pc,true)})}catch(e){console.error(e)}},60);
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
