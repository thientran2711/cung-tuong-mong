/* ================= jinv: kitInvGrid — the BAG (owner 11/15 04:00Z, shot 1115-49c7629b) =================
   KIT 33. A game-style inventory: a grid of EMPTY SQUARE SLOTS (like an RPG bag), split by item-type tabs (the ONE tab row of
   k3CatTabs: kitTabRowHTML in `.pctabs.kcattabs`). Items fill the first slots: kitItem size "slot" (painted icon on the grade ground,
   ×N count, worn band, corner tag); the remaining slots stay empty squares; the grid always ends on a full row (≥ minRows rows).
   Tap a slot → the caller's onPick(item) (Tư trang: the item panel, kitModal with the item picture, facts and act cards).
     kitInvGrid({key, tabs:[{k,label}], items:[{cat, src, name, grade, qty, on, onText, mark, tip, id}], minRows:4, onPick:fn(item)}) → HTML
   The chosen tab is remembered per key (`hclh-kinv-<key>`). Items are only ever EARNED (bought, given, bestowed): the bag starts empty. */
const KINV={reg:{},cur:{}};
function kitInvGrid(o){o=o||{};const key=o.key||"bag";KINV.reg[key]=o;
 let cur=KINV.cur[key];if(cur==null){try{cur=localStorage.getItem("hclh-kinv-"+key)}catch(e){}}
 const tabs=[{k:"all",label:"Tất cả"}].concat(o.tabs||[]);if(!tabs.some(t=>t.k===cur))cur="all";KINV.cur[key]=cur;
 const L=(o.items||[]).filter(x=>cur==="all"||x.cat===cur);
 const cnt=k=>(o.items||[]).filter(x=>k==="all"||x.cat===k).reduce((a,x)=>a+(x.qty||1),0);
 const row=kitTabRowHTML(tabs.map(t=>{const n=cnt(t.k);return{k:t.k,label:t.label,n,tip:`${n} món`}}),cur,`data-kinvkey="${key}" data-kinvtab`);
 const slots=L.map((x,i)=>kitItem({src:x.src,name:x.name,grade:x.grade,qty:x.qty,on:x.on,onText:x.onText,mark:x.mark,size:"slot",
   tip:x.tip||x.name,data:`data-kinvkey="${key}" data-kinvi="${(o.items||[]).indexOf(x)}" role="button" tabindex="0"`})).join("");
 return `<div class="kinv" data-kinv="${key}" data-min="${o.minRows||4}"><div class="pctabs kcattabs kinvtabs" role="tablist">${row}</div>`+
  `<div class="kinvg" data-n="${L.length}">${slots}${kitInvEmpty(Math.max(0,(o.minSlots||24)-L.length))}</div></div>`}
function kitInvEmpty(n){let h="";for(let i=0;i<n;i++)h+=kitItem({empty:true,size:"slot",tip:"Ô trống"});return h}
/* fill the grid to whole rows (≥ minRows rows) once its column count is known */
function kitInvFit(){document.querySelectorAll(".kinv .kinvg").forEach(g=>{try{const cols=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;
 const n=+g.dataset.n||0,min=+(g.closest(".kinv").dataset.min||4);const want=Math.max(min*cols,Math.ceil(n/cols)*cols);const have=g.children.length;
 if(have<want)g.insertAdjacentHTML("beforeend",kitInvEmpty(want-have));else for(let i=have;i>Math.max(want,n);i--){const c=g.lastElementChild;if(c&&c.classList.contains("kitem-empty"))c.remove();else break}}catch(e){}})}
addEventListener("resize",()=>{clearTimeout(window.__kinvT);window.__kinvT=setTimeout(kitInvFit,60)});
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-kinvtab]");if(t){e.stopPropagation();const k=t.dataset.kinvkey;KINV.cur[k]=t.dataset.kinvtab;
  try{localStorage.setItem("hclh-kinv-"+k,t.dataset.kinvtab)}catch(x){}try{render()}catch(x){}return}
 const s=e.target.closest&&e.target.closest("[data-kinvi]");if(s){e.stopPropagation();const o=KINV.reg[s.dataset.kinvkey];const it=o&&o.items&&o.items[+s.dataset.kinvi];if(it&&o.onPick)o.onPick(it)}},true);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.kinvi!=null){e.preventDefault();e.target.click()}});
(function(){const st=document.createElement("style");st.id="kinv-css";st.textContent=`
.kinv{display:flex;flex-direction:column;gap:6px;margin:6px 0 10px}
.kinv .kinvg{display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--kinvsz,60px),1fr));gap:6px;padding:8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#f4ead8;box-shadow:inset 0 1px 3px #5a3a2018}
@media (max-width:599px){.kinv .kinvg{--kinvsz:54px;gap:5px;padding:6px}}
.kinv .kinvg>.kitem-slot>.kitb{border-radius:7px}
.kinv .kinvg>.kitem-slot[role=button]:hover>.kitb,.kinv .kinvg>.kitem-slot[role=button]:focus-visible>.kitb{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e));outline:none}
.kinv .kinvg>.kitem-slot:focus{outline:none}
.kpsubj.kpitem>.kitem{--isz:100%;width:100%}
.dlg.kpanel .kinvacts{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px;margin-top:6px}
`;document.head.appendChild(st)})();
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{kitInvFit()}catch(e){}return r}}

/* ---------- Tư trang (the player's chest, j8 items) on the bag ---------- */
/* real item kinds of IT (j8 `kd`) → bag tabs; anything else (handmade works, later kinds) → Tạp vật */
const KINV_CATS=[["trang","Trang sức",["Trang sức"]],["vai","Vải vóc",["Vải vóc"]],["thuoc","Thuốc men",["Thuốc bổ","Thuốc","Độc dược"]],
 ["huong","Hương liệu",["Hương liệu"]],["le","Lễ vật",["Lễ vật","Kỷ vật"]],["thu","Thư từ",["Thư từ"]]];
function kinvCat(kd){const c=KINV_CATS.find(c=>c[2].includes(kd));return c?c[0]:"tap"}
function kinvPlain(o){const N=typeof NAMES==="object"?NAMES:{};return Object.entries(o||{}).filter(([k,v])=>N[k]&&v).map(([k,v])=>`${N[k]} ${v>0?"+":""}${v}`).join(", ")}
function kinvFrom(f){if(!f||f==="me")return"";if(f==="th")return"Thái hậu ban";if(f==="hh")return"Hoàng hậu ban";if(f==="emp")return"Hoàng thượng ban";
 try{const v=typeof RV==="function"?RV(f):null;if(v&&v.name)return v.name+" tặng"}catch(e){}return""}
function kinvGroups(){const vis=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h&&IT[e.k]);const G=[];
 for(const [e,i] of vis){const g=G.find(x=>x.k===e.k&&!!x.t===!!(e.by==="me"&&e.t)&&!x.w&&!e.w);if(g)g.n++;else G.push({k:e.k,t:e.by==="me"?e.t:null,w:e.w,i,n:1,from:e.from})}return G}
function kinvItems(){return kinvGroups().map(g=>{const it=IT[g.k];const a=typeof itemArt==="function"?itemArt(g.k):null;
 const src=a?a.src:(typeof ITIMG==="object"&&ITIMG[g.k]?`img/item-${ITIMG[g.k]}.webp`:"");
 return{id:g.i,g,cat:kinvCat(it.kd),src,src512:a?a.src512:src,name:it.n,grade:a?a.grade:0,qty:g.n,on:!!g.w,onText:it.sl?"Đang đeo":"Đang dùng",
  mark:g.t&&typeof TAINT==="object"&&TAINT[g.t]?["đã tẩm","r"]:null,tip:`${it.n}${g.n>1?" ×"+g.n:""} · ${it.kd}`}})}
function kinvOpen(x){const g=x.g,it=IT[g.k],i=g.i;const over=it.rk&&it.rk>S.rank;const B=[];
 if(it.sl)B.push(pbtn(`data-kinvact="wear" data-ix="${i}"`,g.w?"Tháo":"Đeo",g.w?"thành: cất vào rương":`thành: ${kinvPlain(it.w)}${over?" · kèm: vượt phẩm, dễ bị tố":""}`,""));
 if(it.dr)B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"May áo",`thành: Sắc +${it.dr} trong 3 tháng${over?" · kèm: vượt phẩm, dễ bị tố":""}`,""));
 if(it.use||it.evi||g.k==="botngua")B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"Dùng",g.k==="botngua"?"tốn: 2 khắc · thành: chọn một phi tần, nàng Danh -5 · kèm: bị khám ra là có tội":it.evi?`thành: chọn người, chứng cứ +${it.evi}`:`thành: ${kinvPlain(it.use)}`,g.k==="botngua"?whyTime(2):""));
 if(g.k!=="ngocboi"||g.t)B.push(pbtn(`data-kinvact="gift" data-ix="${i}"`,"Tặng","tốn: 2 khắc · thành: chọn người nhận",whyTime(2)));
 if(it.pr)B.push(pbtn(`data-kinvact="sell" data-ix="${i}"`,"Bán",`thành: Bạc +${Math.floor(it.pr/2)}`,""));
 if(typeof TAINT==="object"&&Object.values(TAINT).some(T=>T.on.includes(g.k))&&!g.t)B.push(pbtn(`data-kinvact="taint" data-ix="${i}"`,"Tẩm","thành: chọn cách tẩm, giữ làm mưu kế · kèm: Đức -3",""));
 if(g.from&&g.from!=="me"&&g.from!=="emp"&&g.from!=="th")B.push(pbtn(`data-kinvact="test" data-ix="${i}"`,"Nghiệm độc","tốn: Bạc 10 · thành: Thái y xem đồ có bị tẩm không",S.bac<10?"thiếu bạc (cần 10)":""));
 const F=[it.d];if(g.n>1)F.push(`Trong rương: ${g.n} món.`);if(g.w)F.push(it.sl?"Ngươi đang đeo.":"Ngươi đang dùng.");
 if(g.t&&TAINT[g.t])F.push(`Ngươi đã ${TAINT[g.t].n}.`);if(it.rk)F.push(`Hợp phẩm từ ${RANKS[Math.min(7,it.rk)].n}${over?": vượt phẩm của ngươi":""}.`);const fr=kinvFrom(g.from);if(fr)F.push(fr+".");
 kitModal({kind:"info",title:it.n,sub:`${it.kd} · ${KIT_GRADE[x.grade|0].n}`,
  itemPic:kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"lg",qty:g.n}).replace('<span class="kitn"></span>',''),
  html:`${kitFacts(F)}${B.length?`<div class="rbtn kinvacts">${B.join("")}</div>`:""}`,btn:"Lui"})}
/* kit panel: `itemPic` = the panel's subject picture is an ITEM (KIT 8: "picture only if it depicts the subject … or a specific item");
   it takes the left subject column, so no info/category art is added; act cards inside the body get the kit act-card frame. */
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){const r=b0.apply(this,arguments);try{const sp=m&&m.kit;if(!sp||!sp.itemPic)return r;
 const body=M.querySelector("#mb > .kpb");if(!body)return r;const old=body.querySelector(":scope > .kpsubj");if(old)old.remove();
 body.classList.add("kphas");body.classList.remove("kpinfo");body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpitem">${sp.itemPic}</div>`);
 if(typeof kitFix==="function")kitFix(body)}catch(e){console.error("itemPic",e)}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kinvact]");if(!b)return;e.stopPropagation();if(b.disabled)return;
 const a=b.dataset.kinvact,ix=+b.dataset.ix;try{closeModal()}catch(x){}itemAct(a,ix)},true);
if(typeof invHTML==="function"){const inv0=invHTML;invHTML=function(){let h=inv0.apply(this,arguments);try{
  const i=h.indexOf('<div class="cards">');if(i>=0)h=h.slice(0,i);
  return h+kitInvGrid({key:"tutrang",tabs:KINV_CATS.map(c=>({k:c[0],label:c[1]})).concat(S.inv.some(e=>!e.h&&IT[e.k]&&kinvCat(IT[e.k].kd)==="tap")?[{k:"tap",label:"Tạp vật"}]:[]),
   items:kinvItems(),minRows:4,onPick:kinvOpen})}catch(e){console.error("kitInvGrid",e);return inv0.apply(this,arguments)}}}
