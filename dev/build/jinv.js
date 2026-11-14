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
/* fill the grid to whole rows (≥ minRows rows) once its column count is known; inside the panel, the grid also GROWS by whole rows into
   any free height left at the bottom of the panel (owner 11/15: no big empty gap under the bag; equipment panel stays below it). */
function kitInvFit(){document.querySelectorAll(".kinv .kinvg").forEach(g=>{try{
 /* refit whenever the grid's width or the panel's height changes (late layout, rotation, book page open) */
 if(!g.__kro&&typeof ResizeObserver==="function"){let w0=0,h0=0;g.__kro=new ResizeObserver(()=>{const P=g.closest("#panel");const w=g.clientWidth,h=P?P.clientHeight:0;if(w===w0&&h===h0)return;w0=w;h0=h;
   clearTimeout(g.__kroT);g.__kroT=setTimeout(kitInvFit,40)});g.__kro.observe(g);const P=g.closest("#panel");if(P)g.__kro.observe(P)}
 if(!g.clientWidth)return;const cols=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;
 const n=+g.dataset.n||0,min=+(g.closest(".kinv").dataset.min||4);const want=Math.max(min*cols,Math.ceil(n/cols)*cols);let have=g.children.length;
 if(have<want){g.insertAdjacentHTML("beforeend",kitInvEmpty(want-have));have=want}else for(let i=have;i>Math.max(want,n);i--){const c=g.lastElementChild;if(c&&c.classList.contains("kitem-empty")){c.remove();have--}else break}
 const P=g.closest("#panel");if(!P||!P.clientHeight||!g.firstElementChild)return;const pr=P.getBoundingClientRect(),cs=getComputedStyle(P);
 let bot=-1e9;for(const c of P.children){const r=c.getBoundingClientRect();if(r.height)bot=Math.max(bot,r.bottom+(parseFloat(getComputedStyle(c).marginBottom)||0))}
 const free=pr.bottom-(parseFloat(cs.borderBottomWidth)||0)-(parseFloat(cs.paddingBottom)||0)-bot-2;
 const rh=g.firstElementChild.getBoundingClientRect().height+(parseFloat(getComputedStyle(g).rowGap)||0);const add=rh>8?Math.floor(free/rh):0;
 if(add>0&&P.scrollHeight<=P.clientHeight+1)g.insertAdjacentHTML("beforeend",kitInvEmpty(add*cols));
 /* what is left (less than one bag row) goes to the equipment slots, which grow up to 150 px */
 const q=P.querySelector(".keq");if(q){q.style.removeProperty("--keqsz");if(P.scrollHeight<=P.clientHeight+1){let b2=-1e9;for(const c of P.children){const r=c.getBoundingClientRect();if(r.height)b2=Math.max(b2,r.bottom)}
  const f2=pr.bottom-(parseFloat(cs.paddingBottom)||0)-b2-10;const s0=parseFloat(getComputedStyle(q.querySelector(".keqs")).gridTemplateColumns)||0;
  const n=q.querySelectorAll(".keqc").length||1;const maxW=(q.clientWidth-24-(n-1)*12)/n;if(f2>4&&s0)q.style.setProperty("--keqsz",Math.round(Math.min(150,maxW,s0+f2))+"px")}}}catch(e){}})}
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
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{kitInvFit();requestAnimationFrame(kitInvFit)}catch(e){}return r}}

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
/* ---------- KIT 33b kitEquipSlots — "Đang mang": the named EQUIPMENT slots (owner 11/15, RPG-style), under the bag ----------
   kitEquipSlots({key, title, slots:[{k, label, item:{src,name,grade,tip}|null, ghost:src, note}], sum:html, onPick:fn(slot)}) → HTML
   Each slot = kitItem size "slot" (same grade ground + frame as the bag); an EMPTY slot shows its type as a faint silhouette (o.ghost).
   Under each: the slot name + what is in it (or "trống"). The header carries the bonus summary of everything worn. Tap → onPick(slot). */
const KEQ={reg:{}};
function kitEquipSlots(o){o=o||{};const key=o.key||"eq";KEQ.reg[key]=o;const L=o.slots||[];
 return `<div class="keq" data-keq="${key}" style="--keqn:${L.length}"><div class="keqh"><h4 class="kpst">${o.title||"Đang mang"}</h4><div class="keqsum">${o.sum||""}</div></div><div class="keqs">`+
  L.map((x,i)=>`<div class="keqc">${kitItem(x.item?{src:x.item.src,name:x.item.name,grade:x.item.grade,size:"slot",tip:x.item.tip||x.item.name,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`}
   :{empty:true,size:"slot",ghost:x.ghost,tip:`${x.label}: trống`,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`})}<b class="keql">${x.label}</b><span class="keqn">${x.item?x.note||x.item.name:"trống"}</span></div>`).join("")+`</div></div>`}
document.addEventListener("click",e=>{const s=e.target.closest&&e.target.closest("[data-keqi]");if(!s)return;e.stopPropagation();const o=KEQ.reg[s.dataset.keqk];const x=o&&o.slots&&o.slots[+s.dataset.keqi];if(x&&o.onPick)o.onPick(x)},true);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.keqi!=null){e.preventDefault();e.target.click()}});
(function(){const st=document.createElement("style");st.id="keq-css";st.textContent=`
.keq{border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#fbf4e7;padding:8px 10px 10px;margin:4px 0 6px}
.keq .keqh{display:flex;align-items:center;justify-content:space-between;gap:6px 10px;flex-wrap:wrap;margin:0 0 6px}.keq .keqh .kpst{margin:0}
.keq .keqsum{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:.8rem}
.keq .keqs{display:grid;grid-template-columns:repeat(var(--keqn),minmax(0,var(--keqsz,96px)));gap:12px;justify-content:center}
@media (max-width:599px){.keq .keqs{--keqsz:84px;gap:8px}}
.keq .keqc{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;text-align:center}
.keq .keql{font-size:.78rem;color:var(--ink)}.keq .keqn{font-size:.68rem;line-height:1.2;color:var(--ink2,#7a6a58);overflow-wrap:anywhere}
.keq .kitem-slot[role=button]:hover>.kitb,.keq .kitem-slot[role=button]:focus-visible>.kitb{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e));outline:none}
.keq .kitem-slot:focus{outline:none}
.dlg.kpanel .keqpick{display:flex;flex-wrap:wrap;gap:10px;margin:6px 0}
`;document.head.appendChild(st)})();
/* Tư trang: the slots that really exist in the rules (j8): Cài tóc (IT.sl "hair"), Đeo tay (IT.sl "wrist"), Y phục (áo may từ vải: S.dress, 3 tháng) */
const KEQ_TT=[["hair","Cài tóc","tramngoc"],["wrist","Đeo tay","vongngoc"],["dress","Y phục","luahang"]];
function keqArt(k){const a=typeof itemArt==="function"?itemArt(k):null;return a?a.src:(typeof ITIMG==="object"&&ITIMG[k]?`img/item-${ITIMG[k]}.webp`:"")}
function keqTT(){const wb=wearBonus(S),vp=vpItems(S);const slots=KEQ_TT.map(([sl,label,gk])=>{let item=null,note="",ix=-1;
  if(sl==="dress"){if(S.dress&&S.dress.until>S.turn&&IT[S.dress.k]){const it=IT[S.dress.k],a=typeof itemArt==="function"?itemArt(S.dress.k):null;const m=S.dress.until-S.turn;
    item={src:keqArt(S.dress.k),name:it.n,grade:a?a.grade:0,tip:`Áo may bằng ${it.n} · còn ${m} tháng`};note=`${it.n} · còn ${m} tháng`}}
  else{ix=S.inv.findIndex(e=>!e.h&&e.w&&IT[e.k]&&IT[e.k].sl===sl);if(ix>=0){const k=S.inv[ix].k,a=typeof itemArt==="function"?itemArt(k):null;item={src:keqArt(k),name:IT[k].n,grade:a?a.grade:0,tip:`${label}: ${IT[k].n}`}}}
  return{k:sl,label,item,note,ix,ghost:keqArt(gk)}});
 const C=[];if(wb.sac)C.push(["Sắc",wb.sac]);if(wb.danh)C.push(["Danh",wb.danh]);
 const sum=(C.length?kitChips(C):`<span class="past">chưa mang gì: không thêm</span>`)+(vp.length?kitChip("vượt phẩm: dễ bị tố","no"):"");
 return kitEquipSlots({key:"tutrang",title:"Đang mang",slots,sum,onPick:keqPick})}
function keqPick(x){if(x.item){if(x.k==="dress"){const it=IT[S.dress.k];kitModal({kind:"info",title:it.n,sub:`Y phục · ${KIT_GRADE[x.item.grade|0].n}`,
   itemPic:kitItem({src:(typeof itemArt==="function"&&itemArt(S.dress.k)||{}).src512||x.item.src,name:"",grade:x.item.grade,size:"lg"}).replace('<span class="kitn"></span>',''),
   html:kitFacts([`Áo mới may bằng ${it.n}: Sắc +${it.dr}${it.rk>S.rank?" (vượt phẩm: dễ bị tố)":""}.`,`Còn mặc ${S.dress.until-S.turn} tháng nữa.`]),btn:"Lui"});return}
  const it=kinvItems().find(y=>y.g.i===x.ix);if(it)kinvOpen(it);return}
 const L=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h&&IT[e.k]&&(x.k==="dress"?IT[e.k].dr:IT[e.k].sl===x.k));const seen=new Set();
 const T=L.filter(([e])=>{if(seen.has(e.k))return false;seen.add(e.k);return true}).map(([e,i])=>{const it=IT[e.k],a=typeof itemArt==="function"?itemArt(e.k):null;
  const fx=x.k==="dress"?`Sắc +${it.dr}, 3 tháng`:kinvPlain(it.w);return kitItem({src:keqArt(e.k),name:it.n,grade:a?a.grade:0,size:"md",label:[it.rk>S.rank?"vượt phẩm":fx,it.rk>S.rank?"no":"n"],
   data:`data-kinvact="${x.k==="dress"?"use":"wear"}" data-ix="${i}" role="button" tabindex="0"`,tip:`${x.k==="dress"?"May áo":"Đeo"}: ${it.n} · ${fx}`})});
 kitModal({kind:"info",title:`Ô ${x.label.toLowerCase()}`,sub:"trống",itemPic:kitItem({empty:true,ghost:x.ghost,size:"lg",name:""}).replace('<span class="kitn"></span>',''),
  html:T.length?`<p class="past">Chạm một món để ${x.k==="dress"?"may áo mặc":"đeo vào"}.</p><div class="keqpick">${T.join("")}</div>`
   :kitFacts([x.k==="dress"?"Rương chưa có vải để may áo.":`Rương chưa có món nào ${x.k==="hair"?"cài tóc":"đeo tay"} được.`,"Mua ở gánh hàng rong, hoặc chờ được ban thưởng."]),btn:"Lui"})}
if(typeof invHTML==="function"){const inv0=invHTML;invHTML=function(){let h=inv0.apply(this,arguments);try{
  const i=h.indexOf('<div class="cards">');if(i>=0)h=h.slice(0,i);h=h.replace(/^<div class="ph">[\s\S]*?<\/div>\s*/,"");
  return h+kitInvGrid({key:"tutrang",tabs:KINV_CATS.map(c=>({k:c[0],label:c[1]})).concat(S.inv.some(e=>!e.h&&IT[e.k]&&kinvCat(IT[e.k].kd)==="tap")?[{k:"tap",label:"Tạp vật"}]:[]),
   items:kinvItems(),minRows:3,onPick:kinvOpen})+keqTT()}catch(e){console.error("kitInvGrid",e);return inv0.apply(this,arguments)}}}
