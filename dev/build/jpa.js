/* ================= jpa: PERSON VIEW · PERSON DIALOG · DOABLE FIRST · WHOLE FRAME (review/person-acts, owner 11/15) — KIT §37 =================
   1. kitDoableFirst / kitSortDoable: in every list of acts or buttons, the ones she can do NOW come first, the greyed ones after
      (stable, by kitIsOff). One list of containers (KIT_DOABLE) — Hành sự deck, person acts, dialog options, place / servant / shop rows.
   2. The person view opened from the stage (#popw .pc): name with the rank line ABOVE it at the top left, her FULL-BODY figure right under
      it (KIT_FIG, kitStageFig — no portrait frame here), the facts on the right as kit sections ("Quan hệ" with KIT_REL words, "Việc làm
      được"), and the acts grouped in kit sub-tabs (kitTabRowHTML: Giao hảo · Nhún · Dò xét · Đối đầu · Khác), each tab with the number of
      acts doable now; the default tab is the first one with a doable act.
   3. The court chips (Hoàng thượng, Thái hậu) open the kit PERSON DIALOG (KIT 32.7: full-body figure left, kit sections right:
      Tính nết · Luật riêng / Điều thích / Quan hệ) instead of the old portrait card with a floating quote box.
   4. The big portrait frame (person card, Hậu cung, Giao tình) shows the WHOLE 550x1037 canvas: the box grows DOWN so the ngọc bội pendant
      and the tua rua tassel hang under the same-size frame (the opening keeps its size and place).
   KIT_REL / kitRel come from review/act-audit (jaudit). */
(function(){
/* KIT_REL / kitRel / .krel colours: jaudit (review/act-audit, merged 11/15) — jpa only uses them */
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const T=s=>String(s==null?"":s).replace(/\s+/g," ").trim();

/* ---------- 1. DOABLE FIRST (owner 11/15, global rule) ---------- */
function kitIsOff(e){if(!e||e.nodeType!==1)return false;if(e.disabled||e.classList.contains("kdis")||e.classList.contains("off")||e.getAttribute("aria-disabled")==="true")return true;
 if(!/^(BUTTON|A)$/.test(e.tagName)){const b=e.querySelector("button");return !!(b&&b.disabled)}return false}
/* act-card lists (every child a button.ka: Hành sự .cards, .rbtn, the person view .pcb) belong to kitActSort (KIT 31.19: order decided once per
   buổi, an act turning "đã làm" never makes the list jump). Sorting them here too made the two observers move the done card back and forth
   forever (reviewer 11/15: ~250 DOM mutations a second after one act). kitDoableFirst sorts the other lists only. */
function kitActOwned(box){if(typeof window.kitActSort!=="function"||!box.matches(".cards, .rbtn, #popw .pcb"))return false;const k=[...box.children];return k.length>0&&k.every(e=>e.matches("button.ka"))}
function kitDoableFirst(box,sel){try{if(!box)return false;if(kitActOwned(box))return false;const L=[...box.children].filter(c=>!sel||c.matches(sel));if(L.length<2)return false;
 const want=L.filter(e=>!kitIsOff(e)).concat(L.filter(kitIsOff));if(want.every((e,i)=>e===L[i]))return false;
 const mark=document.createComment("kd");box.insertBefore(mark,L[0]);want.forEach(e=>box.insertBefore(e,mark));mark.remove();return true}catch(e){return false}}
/* every list of acts / options: [container, item selector] — add new lists here (or give the container class .kdoable) */
const KIT_DOABLE=[["#panel .cards","button.ka"],["#popw .pcb",".ka"],["#mb .opts","button"],["#panel .rbtn","button"],["#popw .rbtn","button"],
 ["#panel .kshop","button"],["#panel .kinvact","button"],["#panel .opts","button"],[".kdoable",null]];
function kitSortDoable(){KIT_DOABLE.forEach(([c,s])=>document.querySelectorAll(c).forEach(b=>kitDoableFirst(b,s)))}
window.kitIsOff=kitIsOff;window.kitDoableFirst=kitDoableFirst;window.kitSortDoable=kitSortDoable;window.KIT_DOABLE=KIT_DOABLE;

/* ---------- 2. PERSON VIEW from the stage (#popw) ---------- */
const KPA_G=[["gh","Giao hảo",/^(Chào|Hỏi han|Khen|Chia sẻ|Nhờ|Cảnh báo|Giúp|Tặng|Thăm|Mời|Kết|Bái kiến|Thỉnh an|Tâm sự|Trò chuyện|Uống trà|Đánh cờ|Ngâm|Nói|Hỏi chuyện|Rủ|Xin|Ban thưởng|Ân xá|Che chở|An ủi|Chúc|Đưa thư|Gửi)/],
 ["nh","Nhún",/^(Tạ lỗi|Nhún|Xin lỗi|Cầu hòa|Lấy lòng|Nịnh|Quỳ|Nhận lỗi|Dâng|Hòa giải|Nhường)/],
 ["dx","Dò xét",/^(Dò|Bàn tán|Hỏi người hầu|Soát|Theo dõi|Nghe ngóng|Mua chuộc|Hối lộ|Cài người|Sai người|Rình)/],
 ["dd","Đối đầu",/(Khiêu khích|Tung tin|Đẩy|Ngáng|Vu oan|Hạ độc|Tố|Vạch|Hãm|Giá họa|Cài|Xử tội|Tịch thu|Dọa|Bôi|Đầu độc|hại|Phá|Ép|Chặn|Tranh|Cướp|Trả thù|Mắng|Phạt|Đánh|Xạ hương|Đổi mèo|Ban chết|Cấm túc|Làm nhục|Chọc)/]];
const KPA_TAB={};/* person key → chosen tab (this session) */
function kpaName(b){const n=b.querySelector(":scope > b, .kan, h4, .kat, .kah");return T((n||b).textContent).replace(/^\s*[^A-Za-zÀ-ỹ]+/,"")}
function kpaGroup(name){for(const [k,,re] of KPA_G)if(re.test(name))return k;return "kh"}
function kpaPerson(){try{const pc=document.querySelector("#popw .pc");if(!pc||typeof curPeople!=="function")return;const ppl=curPeople();
 const pi=typeof popIdx==="number"?popIdx:null;const p=pi!=null?ppl[pi]:null;if(!p)return;pc.classList.add("kpa");
 const who=typeof figWho==="function"?figWho(p):(p.ref||p);const key=(who&&(who.id!=null?who.id:who.name))||p.name||"?";
 const L=pc.querySelector(":scope > .pcl"),Rr=pc.querySelector(":scope > .pcr");
 /* a. full-body figure (KIT_FIG) in place of the portrait frame */
 if(L){const pp=L.querySelector(":scope > .pcp");if(pp&&typeof kitStageFig==="function"){let h="";try{h=kitStageFig(p.kind==="emp"?S.emp:p.kind==="th"&&S.thO?S.thO:who,{cap:false})}catch(e){}
   if(h){const d=document.createElement("div");d.className="kpafig";d.innerHTML=h;pp.replaceWith(d)}}}
 /* b. facts → the right column, as kit sections */
 if(Rr){const pcb=Rr.querySelector(":scope > .pcb");const facts=L&&L.querySelector(":scope > .kpfacts");
  const grid=L&&L.querySelector(":scope > .kpgrid");
  if(pcb&&(facts||grid)){let s=Rr.querySelector(":scope > .kpaq");if(!s){s=document.createElement("section");s.className="kpaq kpsec";s.innerHTML=`<h4 class="kpst">Giao tình</h4>`;Rr.insertBefore(s,pcb)}
   if(grid)s.insertBefore(grid,s.children[1]||null);if(facts)s.appendChild(facts)}
  if(pcb){let h=Rr.querySelector(":scope > .kpst.kpaacts");if(!h){h=document.createElement("h4");h.className="kpst kpaacts";h.textContent="Việc làm được";Rr.insertBefore(h,pcb)}
   /* c. act sub-tabs */
   const acts=[...pcb.querySelectorAll(":scope > .ka")];if(acts.length){const by={};acts.forEach(b=>{const g=kpaGroup(kpaName(b));b.dataset.kpag=g;(by[g]=by[g]||[]).push(b)});
    const order=KPA_G.map(g=>g[0]).concat("kh").filter(k=>by[k]);const lab=k=>(KPA_G.find(g=>g[0]===k)||[0,"Khác"])[1];
    const ok=k=>by[k].filter(b=>!kitIsOff(b)).length;let cur=KPA_TAB[key];if(!cur||!by[cur])cur=order.find(k=>ok(k)>0)||order[0];KPA_TAB[key]=cur;
    let row=Rr.querySelector(".kpatabs");/* jk2b moves a .pcr > .pctabs row into the sticky bar (.kpstick): find it there */if(!row){row=document.createElement("div");row.className="pctabs kpatabs";row.setAttribute("role","tablist");Rr.insertBefore(row,pcb)}
    const html=order.length>1?kitTabRowHTML(order.map(k=>({k,label:lab(k),n:ok(k),tip:`${ok(k)} việc làm được bây giờ (trong ${by[k].length})`})),cur,"data-kpag"):"";
    if(row.dataset.h!==html){row.innerHTML=html;row.dataset.h=html}row.hidden=!html;row.dataset.key=key;
    acts.forEach(b=>{b.hidden=order.length>1&&b.dataset.kpag!==cur})}
   /* section order: Giao tình · Việc làm được · tabs · acts */
   [Rr.querySelector(":scope > .kpaq"),h,Rr.querySelector(":scope > .kpatabs")].forEach(e=>{if(e)Rr.insertBefore(e,pcb)});
   if(kitActOwned(pcb))kitActSort(pc);else kitDoableFirst(pcb,".ka")}}}catch(e){console.error("kpaPerson",e)}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".kpatabs [data-kpag]");if(!b)return;e.stopPropagation();e.preventDefault();
 const row=b.closest(".kpatabs");KPA_TAB[row.dataset.key]=b.dataset.kpag;kpaPerson()},true);

/* ---------- 2b. a person card's rules note ("<b>Trọng tài</b>: …" lines, the old floating quote box) → a kit section of kit rows ---------- */
function kpaNotes(){try{document.querySelectorAll("#panel .pc .pcr .pcn:not(.kpres), #popw .pc .pcr .pcn:not(.kpres)").forEach(n=>{
 const items=n.querySelector("li")?[...n.querySelectorAll("li")].map(l=>l.innerHTML):n.innerHTML.split(/<br\s*\/?>/i);
 const rows=[];for(const h of items){const t=T(h.replace(/<[^>]+>/g," "));if(!t)continue;const m=/<b[^>]*>([^<]+)<\/b>\s*:?\s*([\s\S]*)$/i.exec(h.trim().replace(/^<[^b][^>]*>/,""));if(!m)return;rows.push([T(m[1]).replace(/:$/,""),T(m[2].replace(/<[^>]+>/g," ")).replace(/^:\s*/,"")])}
 if(!rows.length)return;const s=document.createElement("div");s.className="kpsec kpanote";s.innerHTML=`<h4 class="kpst">Tính nết · Luật riêng</h4>`+kitRows(rows);n.replaceWith(s)})}catch(e){console.error("kpaNotes",e)}}

/* ---------- 3. PERSON DIALOG for the court chips (KIT 32.7) ---------- */
/* the kit's own sections (kpBuild spec.sections: h4.kpst header + kitRows rows) and seal "NGƯỜI" (kind person) — no hand-made boxes */
function kitPersonDialog(who,title,sections){Q.unshift({t:title,stage:[who],cls:"kpdlg",kit:{kind:"person",sections:sections.filter(s=>s&&(s.rows&&s.rows.length||s.html))}});showModal()}
window.kitPersonDialog=kitPersonDialog;
const note=t=>`<p class="kpdn">${t}</p>`;
function empDlg(){const E=S.emp;
 const rules=(E.traits||[]).filter(t=>typeof ETRAITS!=="undefined"&&ETRAITS[t]).map(t=>[ETRAITS[t][0],ETRAITS[t][1]]);
 const likes=typeof LIKES!=="undefined"?Object.keys(LIKES).map(k=>[LIKEN[k],E.known&&E.known[k]?E.likes[k]:"chưa rõ"]):[];
 const rel=[["Tuổi",String(E.age)],["Tâm trạng",MOODS[E.mood][0]],[kitRel("them","Ngài sủng ta"),String(S.sung)],["Ân tình",String(S.an||0)]];
 return [{h:"Tính nết · Luật riêng",rows:rules},{h:"Điều ngài thích",rows:likes,html:note("Nói thật lòng với ngài, hoặc hỏi Kính sự phòng, để biết ngài thích gì.")},{h:"Giao tình",rows:rel}]}
function thDlg(){const R=(typeof kitCourtRows==="function"?kitCourtRows():[]).find(r=>r.k==="th")||{};const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown("th")!==false;
 const rel=[S.thAge?["Tuổi",String(S.thAge)]:null,R.mood&&!/chưa rõ/.test(R.mood[0])?["Tâm trạng",R.mood[0]]:null,[kitRel("them","Thái hậu → ta: thiện cảm"),known?String(S.th|0):"chưa rõ"]].filter(Boolean);
 return [{h:"Giao tình",rows:rel},{h:"Gặp Thái hậu",rows:[],html:note("Hành sự → Thỉnh an Thái hậu (sang Đức Thọ cung).")}]}
try{if(typeof showEmp==="function"){const e0=showEmp;showEmp=function(){try{kitPersonDialog(S.emp,empName(),empDlg());return}catch(e){console.error("empDlg",e)}return e0.apply(this,arguments)}}}catch(e){}
try{if(typeof kitCourtOpen==="function"){const c0=kitCourtOpen;kitCourtOpen=function(k){try{if(k==="th"&&!S.thDead&&!(Q.length&&!/pcm|kpdlg/.test(Q[0].cls||""))){if(Q.length&&/kpdlg|pcm/.test(Q[0].cls||""))Q.shift();
   kitPersonDialog(S.thO||{kind:"th",name:"Thái hậu"},"Thái hậu",thDlg());return}
  if(k==="emp"&&Q.length&&/kpdlg|pcm/.test(Q[0].cls||""))Q.shift()}catch(e){console.error("thDlg",e)}return c0.apply(this,arguments)}}}catch(e){}

/* ---------- hooks: after every stage / panel / dialog render ---------- */
const after=()=>{kpaPerson();kpaNotes();kitSortDoable()};
["renderStage","renderPanel","showModal"].forEach(nm=>{try{const f=window[nm];if(typeof f!=="function")return;const w=function(){const r=f.apply(this,arguments);try{after()}catch(e){}return r};
 if(nm==="renderStage")renderStage=w;else if(nm==="renderPanel")renderPanel=w;else showModal=w}catch(e){}});
let jt=0;try{new MutationObserver(()=>{if(!jt)jt=setTimeout(()=>{jt=0;after()},30)}).observe(document.body,{childList:true,subtree:true})}catch(e){}

const st=document.createElement("style");st.id="jpa-css";st.textContent=`
/* §37.2 person view: rank line above the name, at the very top; the figure right under it */
html body #popw .pc.kpa>.pcl{display:flex!important;flex-direction:column;align-items:stretch;gap:4px;padding-top:0!important}
html body #popw .pc.kpa>.pcl>.pcname{order:-1!important;display:flex!important;flex-direction:column-reverse;align-items:flex-start;min-height:0!important;margin:0!important;line-height:1.15}
html body #popw .pc.kpa>.pcl>.pcrk{order:-2!important;font-size:.8rem;font-weight:600;margin:0!important}
html body #popw .pc.kpa .kpafig{order:1!important;display:flex;justify-content:center;align-items:flex-end;margin:0;width:100%}
html body #popw .pc.kpa .kpafig .kesf{margin:0;display:flex;flex-direction:column;align-items:center}
html body #popw .pc.kpa .kpafig .kesfi{position:relative;display:block}
html body #popw .pc.kpa .kpafig .kesimg{display:block;height:calc(min(58dvh,520px) * var(--kfr,1) * ${(1/1.07).toFixed(4)});width:auto;max-width:none;filter:drop-shadow(0 6px 6px #0004)}
html body #popw .pc.kpa>.pcl>.kwear{order:2}
html body #popw .pc.kpa .kpsec{margin:0 0 10px}
html body #popw .pc.kpa .kpaacts{margin:2px 0 6px}
html body #popw .pc.kpa .kpatabs{margin:0 0 6px}
html body #popw .pc.kpa .pcb>.ka[hidden]{display:none!important}
.kpdn{margin:4px 0 0;font-size:.8rem;color:var(--dim)}
/* §37.4 whole frame: the box is the full 550x1037 canvas (it grows DOWN; the opening keeps its size and place), so the pendant and tassel show */
html body .pc>.pcl>.pcp.kit{aspect-ratio:550/1037!important;overflow:visible!important}
html body .pc>.pcl>.pcp.kit>.kin{height:100%!important}
`;document.head.appendChild(st);
})();
