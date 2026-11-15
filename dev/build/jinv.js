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
 const slots=L.map((x,i)=>kitItem({src:x.src,name:x.name,grade:x.grade,qty:x.qty,on:x.on,onText:x.onText,mark:x.mark,lux:x.lux,size:"slot",
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
 if(!g.clientWidth)return;g.style.removeProperty("--kinvsz");let cols=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;
 const n=+g.dataset.n||0,min=+(g.closest(".kinv").dataset.min||4);const want=Math.max(min*cols,Math.ceil(n/cols)*cols);let have=g.children.length;
 if(have<want){g.insertAdjacentHTML("beforeend",kitInvEmpty(want-have));have=want}else for(let i=have;i>Math.max(want,n);i--){const c=g.lastElementChild;if(c&&c.classList.contains("kitem-empty")){c.remove();have--}else break}
 const P=g.closest("#panel");if(!P||!P.clientHeight||!g.firstElementChild)return;const pr=P.getBoundingClientRect(),cs=getComputedStyle(P);
 /* free height = panel content bottom − bottom of the last IN-FLOW child (absolute decorations such as corner petals do not count) */
 const freeOf=()=>{let bot=-1e9;for(const c of P.children){const s=getComputedStyle(c);if(s.position==="absolute"||s.position==="fixed"||s.display==="none")continue;const r=c.getBoundingClientRect();if(r.height)bot=Math.max(bot,r.bottom+(parseFloat(s.marginBottom)||0))}
  return pr.bottom-(parseFloat(cs.borderBottomWidth)||0)-(parseFloat(cs.paddingBottom)||0)-bot-2};const free=freeOf();
 const rh=g.firstElementChild.getBoundingClientRect().height+(parseFloat(getComputedStyle(g).rowGap)||0);const add=rh>8?Math.floor(free/rh):0;
 if(add>0&&P.scrollHeight<=P.clientHeight+1)g.insertAdjacentHTML("beforeend",kitInvEmpty(add*cols));
 /* still a gap smaller than one row: one more COLUMN (slightly smaller slots), then whole rows again; keep it only if the gap shrinks
    and nothing scrolls (up to 3 steps) */
 const colsOf=()=>getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;
 const fitRows=c=>{const w=Math.max(min*c,Math.ceil(n/c)*c);for(let i=g.children.length;i>Math.max(w,n);i--){const x=g.lastElementChild;if(x&&x.classList.contains("kitem-empty"))x.remove();else break}
  if(g.children.length<w)g.insertAdjacentHTML("beforeend",kitInvEmpty(w-g.children.length));if(g.children.length%c)g.insertAdjacentHTML("beforeend",kitInvEmpty(c-g.children.length%c));
  const r=g.firstElementChild.getBoundingClientRect().height+(parseFloat(getComputedStyle(g).rowGap)||0);const k=r>8?Math.floor(freeOf()/r):0;if(k>0)g.insertAdjacentHTML("beforeend",kitInvEmpty(k*c))};
 for(let t=0;t<3;t++){const f0=freeOf();if(f0<12||P.scrollHeight>P.clientHeight+1)break;const gap=parseFloat(getComputedStyle(g).columnGap)||0,W=g.clientWidth-(parseFloat(getComputedStyle(g).paddingLeft)||0)-(parseFloat(getComputedStyle(g).paddingRight)||0);
  const sz=Math.floor((W+gap)/(cols+1)-gap);if(sz<44)break;const prev=g.style.getPropertyValue("--kinvsz"),pc=cols,ph=g.children.length;
  g.style.setProperty("--kinvsz",sz+"px");const c2=colsOf();if(c2<=pc){if(prev)g.style.setProperty("--kinvsz",prev);else g.style.removeProperty("--kinvsz");break}fitRows(c2);
  const f1=freeOf();if(P.scrollHeight>P.clientHeight+1||f1<-1||f1>=f0){if(prev)g.style.setProperty("--kinvsz",prev);else g.style.removeProperty("--kinvsz");
   for(let i=g.children.length;i>ph;i--){const x=g.lastElementChild;if(x&&x.classList.contains("kitem-empty"))x.remove();else break}if(g.children.length<ph)g.insertAdjacentHTML("beforeend",kitInvEmpty(ph-g.children.length));cols=pc;break}
  cols=c2}
 /* what is left (less than one bag row) goes to the equipment slots, which grow up to 112 px */
 const q=P.querySelector(".keq");if(q){q.style.removeProperty("--keqsz");if(P.scrollHeight<=P.clientHeight+1){const f2=freeOf()-8;const sl0=q.querySelector(".keqc>.kitem");const s0=sl0?sl0.getBoundingClientRect().width:0;
  const c0=q.querySelector(".keqc");const maxW=c0?c0.clientWidth:150;if(f2>4&&s0)q.style.setProperty("--keqsz",Math.round(Math.min(112,maxW,s0+f2))+"px")}
  else{/* a few px too tall: shrink the equipment slots rather than scroll (never below 64 px) */const over=P.scrollHeight-P.clientHeight;const sl0=q.querySelector(".keqc>.kitem");const s0=sl0?sl0.getBoundingClientRect().width:0;
   if(s0&&over>0&&over<=60)q.style.setProperty("--keqsz",Math.max(64,Math.floor(s0-over-2))+"px")}}}catch(e){}});try{kitTabStick()}catch(e){}}
addEventListener("resize",()=>{clearTimeout(window.__kinvT);window.__kinvT=setTimeout(kitInvFit,60)});
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-kinvtab]");if(t){e.stopPropagation();const k=t.dataset.kinvkey;KINV.cur[k]=t.dataset.kinvtab;
  try{localStorage.setItem("hclh-kinv-"+k,t.dataset.kinvtab)}catch(x){}try{render()}catch(x){}return}
 const s=e.target.closest&&e.target.closest("[data-kinvi]");if(s){e.stopPropagation();const o=KINV.reg[s.dataset.kinvkey];const it=o&&o.items&&o.items[+s.dataset.kinvi];if(it&&o.onPick)o.onPick(it)}},true);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.kinvi!=null){e.preventDefault();e.target.click()}});
(function(){const st=document.createElement("style");st.id="kinv-css";st.textContent=`
.kinv{display:flex;flex-direction:column;gap:0;margin:0 0 10px}
.kinv .kinvg{display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--kinvsz,60px),1fr));gap:6px;padding:8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#f4ead8;box-shadow:inset 0 1px 3px #5a3a2018}
@media (max-width:599px){.kinv .kinvg{--kinvsz:54px;gap:5px;padding:6px}}
.kinv .kinvg>.kitem-slot>.kitb{border-radius:7px}
.kinv .kinvg>.kitem-slot[role=button]:hover>.kitb,.kinv .kinvg>.kitem-slot[role=button]:focus-visible>.kitb{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e));outline:none}
.kinv .kinvg>.kitem-slot:focus{outline:none}
.kpsubj.kpitem>.kitem{--isz:100%;width:100%}
.dlg.kpanel .kinvacts{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px;margin-top:6px}
`;document.head.appendChild(st)})();
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){try{const c=S&&S.court&&S.court.ped;if(c&&/hàng rong/.test(c.n||""))c.n="Thái giám Nội vụ phủ lo mua đồ"}catch(e){}const r=r0.apply(this,arguments);try{kitInvFit();requestAnimationFrame(kitInvFit)}catch(e){}return r}}

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
  mark:g.t&&typeof TAINT==="object"&&TAINT[g.t]?["đã tẩm","r"]:null,lux:IT[g.k].sl||IT[g.k].dr?luxVal(g.k):0,tip:`${it.n}${g.n>1?" ×"+g.n:""} · ${it.kd}`}})}
/* KIT 33c kitItemRows(k, o) — the ONE fact block of an item (owner 11/15): kit act-card rows (kitRows) Phẩm · Được · Mất · Ghi chú.
   Used under every "Đang mang" slot (no tap needed) and at the top of the item panel. o = {months, worn, ownTaint, dress, compact}.
   Được = what it gives (worn effects ×1.5 when above her rank, as j8 wearBonus); Mất = risks (vượt phẩm, contraband, loss);
   Ghi chú = duration / slot / rank it suits. Empty slot: kitItemHint(slot) — one short line on what the slot is for. */
function kitItemRows(k,o){o=o||{};const it=IT[k];if(!it)return"";const a=typeof itemArt==="function"?itemArt(k):null;const gr=KIT_GRADE[a?a.grade|0:0];
 const over=!!(it.rk&&it.rk>S.rank),m=over?1.5:1,N=typeof NAMES==="object"?NAMES:{};const eff=w=>Object.entries(w||{}).filter(([x,v])=>v).map(([x,v])=>{const n=Math.round(v*m);return `${N[x]||x} ${n>0?"+":""}${n}`});
 const D=[],M=[],G=[];
 if(o.dress||(!it.sl&&it.dr&&o.worn))D.push(`Sắc +${Math.round(it.dr*m)}`);else if(it.dr)D.push(`may áo: Sắc +${Math.round(it.dr*m)}`);
 if(it.w)D.push(...eff(it.w));
 if(it.use){const u=Object.entries(it.use).filter(([x,v])=>v).map(([x,v])=>`${N[x]||x} ${v>0?"+":""}${v}`);if(u.length)D.push((it.kd==="Thư từ"?"đọc: ":"dùng: ")+u.join(", "))}
 if(it.ant)D.push("an thai");if(it.fert)D.push(`${it.fert} tháng dễ thụ thai`);if(it.anti)D.push("cứu một lần trúng độc");if(it.evi)D.push(`chứng cứ +${it.evi}`);
 if(it.keep)D.push("Sủng không dưới 15");if(it.gv)D.push("đem tặng: hợp ý");if(k==="botngua")D.push("phi tần trúng: Danh -5");if(it.mat)D.push("trộn vào túi thơm, hương trầm");
 if(over)M.push("vượt phẩm: dễ bị tố");if(it.il)M.push("bị khám ra là có tội");if(it.keep)M.push("mất là đại họa");
 if(o.ownTaint&&typeof TAINT==="object"&&TAINT[o.ownTaint])M.push(`đã ${TAINT[o.ownTaint].n}: ${TAINT[o.ownTaint].hurt}`);
 if(it.sl||it.dr)G.push(`xa xỉ ${luxVal(k)}`);if(o.months!=null)G.push(`còn ${o.months} tháng`);else if(it.dr)G.push("áo mặc 3 tháng");
 if(it.sl)G.push({hair:"cài tóc",wrist:"đeo tay",waist:"đeo eo",scent:"đeo bên mình"}[it.sl]||"");if(it.rk)G.push(`hợp phẩm từ ${RANKS[Math.min(7,it.rk)].n}`);
 return kitRows([["Phẩm",`<span class="ef n" style="color:${gr.c};font-weight:700">${gr.n}</span>`],["Được",D,"g"],["Mất",M,"r"],["Ghi chú",G,"n"]])}
function kitItemHint(sl){return sl==="hair"?"cài trâm, bộ diêu: thêm Sắc, có món thêm Danh":sl==="wrist"?"đeo vòng: thêm Sắc, Danh":sl==="waist"?"đeo ngọc bội ngự ban: thêm Danh":sl==="scent"?"đeo túi thơm: thêm Sắc":sl==="veil"?"che vết hủy dung hay mẩn ngứa":sl==="dress"?"may áo từ vải: thêm Sắc trong 3 tháng":""}
function kinvOpen(x){const g=x.g,it=IT[g.k],i=g.i;const over=it.rk&&it.rk>S.rank;const B=[];
 if(it.sl)B.push(pbtn(`data-kinvact="wear" data-ix="${i}"`,g.w?"Tháo":"Đeo",g.w?"thành: cất vào rương":`thành: ${kinvPlain(it.w)}${over?" · kèm: vượt phẩm, dễ bị tố":""}`,""));
 if(it.dr)B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"May áo",`thành: Sắc +${it.dr} trong 3 tháng${over?" · kèm: vượt phẩm, dễ bị tố":""}`,""));
 if(it.use||it.evi||g.k==="botngua")B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"Dùng",g.k==="botngua"?"tốn: 2 khắc · thành: chọn một phi tần, nàng Danh -5 · kèm: bị khám ra là có tội":it.evi?`thành: chọn người, chứng cứ +${it.evi}`:`thành: ${kinvPlain(it.use)}`,g.k==="botngua"?whyTime(2):""));
 if(g.k!=="ngocboi"||g.t)B.push(pbtn(`data-kinvact="gift" data-ix="${i}"`,"Tặng","tốn: 2 khắc · thành: chọn người nhận",whyTime(2)));
 if(it.pr)B.push(pbtn(`data-kinvact="sell" data-ix="${i}"`,"Bán",`thành: Bạc +${Math.floor(it.pr/2)}`,""));
 if(typeof TAINT==="object"&&Object.values(TAINT).some(T=>T.on.includes(g.k))&&!g.t)B.push(pbtn(`data-kinvact="taint" data-ix="${i}"`,"Tẩm","thành: chọn cách tẩm, giữ làm mưu kế · kèm: Đức -3",""));
 if(g.from&&g.from!=="me"&&g.from!=="emp"&&g.from!=="th")B.push(pbtn(`data-kinvact="test" data-ix="${i}"`,"Nghiệm độc","tốn: Bạc 10 · thành: Thái y xem đồ có bị tẩm không",S.bac<10?"thiếu bạc (cần 10)":""));
 const F=[];if(g.n>1)F.push(`Trong rương: ${g.n} món.`);if(g.w)F.push(it.sl?"Ngươi đang đeo.":"Ngươi đang dùng.");
 const fr=kinvFrom(g.from);if(fr)F.push(fr+".");
 kitModal({kind:"info",title:it.n,sub:`${it.kd} · ${KIT_GRADE[x.grade|0].n}`,
  itemPic:kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"lg",qty:g.n,lux:x.lux}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${kitItemRows(g.k,{ownTaint:g.t,worn:g.w})}</div>${F.length?kitFacts(F):""}${B.length?`<div class="rbtn kinvacts">${B.join("")}</div>`:""}`,btn:"Lui"})}
/* kit panel: `itemPic` = the panel's subject picture is an ITEM (KIT 8: "picture only if it depicts the subject … or a specific item");
   it takes the left subject column, so no info/category art is added; act cards inside the body get the kit act-card frame. */
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){const r=b0.apply(this,arguments);try{const sp=m&&m.kit;if(!sp||!sp.itemPic)return r;
 const body=M.querySelector("#mb > .kpb");if(!body)return r;const old=body.querySelector(":scope > .kpsubj");if(old)old.remove();
 body.classList.add("kphas");body.classList.remove("kpinfo");body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpitem">${sp.itemPic}</div>`);
 kitSlotDress(M,body);
 if(typeof kitFix==="function")kitFix(body)}catch(e){console.error("itemPic",e)}return r}})();
/* ---------- KIT 28.13f ITEM / EQUIPMENT-SLOT CARD — compact (owner 11/15 "ĐIỀU · Ô cài tóc" far too big) ----------
   Every item panel (bag tile → kinvOpen / wdOpen / wdFabOpen) and every equipment-slot panel (Bên mình: cài tóc, đeo tay, đeo eo,
   túi thơm, khăn che mặt, y phục → keqPick / wdSlotOpen) is the standard kit dialog box (kit panel width, never taller than the person
   dialog 32.7: min(100dvh − 32 px, 720 px), only the body scrolls), laid out:
   1. TOP ROW: the small item tile (kitItem at the bag-grid tile size, 64 px; empty slot = its faint ghost) LEFT, its kit rows RIGHT
      (Phẩm / Được / Mất / Ghi chú) + the "Đã biết" chip.
   2. The info lines FULL WIDTH under that row (Rương chưa có…, Nhờ thái giám mua đồ…), plain lines without the round fact dots;
      the pick-a-piece row (.keqpick) full width too.
   3. The acts by the option rule (kitOptLayout 32.9): short acts (name + ≤ 1 row) share a 2–3 column grid, an act with two or more rows
      (Cần / Tốn / Được / Kèm, odds) is a full-width row; every card keeps all its lines, tight (content height, no stretched cells).
   4. No "Lui": the header ✕ (32.10), a tap outside, Esc. */
function kitSlotDress(M,body){const dlg=M.querySelector(".dlg");if(!dlg)return;dlg.classList.add("kitslot");const subj=body.querySelector(":scope > .kpsubj.kpitem"),main=body.querySelector(":scope > .kpmain");if(!subj||!main)return;
 const head=document.createElement("div");head.className="kslhead";const info=document.createElement("div");info.className="kslinfo";
 const rows=main.querySelector(":scope > .kinvrows");if(rows)info.appendChild(rows);
 /* a chip line right after the rows ("Đã biết: Đúng phẩm") belongs to the item */
 const nx=main.firstElementChild;if(rows&&nx&&nx.tagName==="P"&&nx.children.length===1&&nx.firstElementChild.matches(".kchip"))info.appendChild(nx);
 head.appendChild(subj);head.appendChild(info);body.insertBefore(head,main);body.classList.add("kslb")}
function kitSlotFit(){try{const d=document.querySelector("#modal .dlg.kitslot");if(!d)return;
 d.querySelectorAll(".kinvacts").forEach(g=>{const B=[...g.querySelectorAll(":scope > button")];const long=b=>typeof kitOptIsLong==="function"?kitOptIsLong(b):b.querySelectorAll(".kr").length>=2;
  B.forEach(b=>b.classList.remove("ksllong"));B.forEach(b=>{if(long(b))b.classList.add("ksllong")});
  /* a grid cell too narrow for its own line (an effect value that wraps, a name over two lines) becomes a full row too */
  B.forEach(b=>{if(b.classList.contains("ksllong"))return;const t=b.querySelector(".kan");const lt=parseFloat(t?getComputedStyle(t).lineHeight:0)||20;
   if((t&&t.getBoundingClientRect().height>lt*1.6)||[...b.querySelectorAll(".krv")].some(v=>{const l=parseFloat(getComputedStyle(v).lineHeight)||18;return v.getBoundingClientRect().height>l*1.6}))b.classList.add("ksllong")})})}catch(e){console.error("kitSlotFit",e)}}
setTimeout(()=>{if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kitSlotFit();requestAnimationFrame(kitSlotFit)}catch(e){}return r}},0);
(function(){const st=document.createElement("style");st.id="kslot-css";st.textContent=`
#modal .dlg.kpanel.kslot{max-height:min(calc(100dvh - 32px),720px);width:min(560px,calc(100vw - 24px))}
#modal .dlg.kitslot #mb>.kpb.kslb{display:block!important}
#modal .dlg.kitslot .kslhead{display:grid;grid-template-columns:64px minmax(0,1fr);gap:4px 12px;align-items:start;margin:0 0 6px}
#modal .dlg.kitslot .kslhead>.kpsubj.kpitem{position:static!important;width:64px;margin:0;padding:0;top:auto}
#modal .dlg.kitslot .kslhead>.kpsubj.kpitem>.kitem{--isz:64px!important;width:64px!important}
#modal .dlg.kitslot .kslhead>.kpsubj.kpitem .kitg{display:none}
#modal .dlg.kitslot .kslhead>.kpsubj.kpitem .kitx{font-size:.62rem;padding:1px 4px}
#modal .dlg.kitslot .kslinfo{min-width:0}
#modal .dlg.kitslot .kslinfo>.kinvrows{margin:0}
#modal .dlg.kitslot .kslinfo>p{margin:4px 0 0}
#modal .dlg.kitslot .kpmain>.kfacts,#modal .dlg.kitslot .kpmain .kfacts{margin:2px 0 6px;gap:2px}
#modal .dlg.kitslot .kfact{grid-template-columns:minmax(0,1fr)!important;min-height:0;padding:2px 0;border:0}
#modal .dlg.kitslot .kfact>.kfdot{display:none!important}
#modal .dlg.kitslot .kpmain>p.past{margin:4px 0}
#modal .dlg.kitslot .kinvacts{grid-template-columns:repeat(auto-fill,minmax(min(100%,180px),1fr));align-items:start;gap:6px;margin-top:8px}
#modal .dlg.kitslot .kinvacts>button{height:auto!important;min-height:0!important;align-self:start}
#modal .dlg.kitslot .kinvacts>button.ksllong{grid-column:1/-1}
@media (min-width:1000px){#modal .dlg.kitslot .kinvacts{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}}
`;document.head.appendChild(st)})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kinvact]");if(!b)return;e.stopPropagation();if(b.disabled)return;
 const a=b.dataset.kinvact,ix=+b.dataset.ix;try{closeModal()}catch(x){}itemAct(a,ix)},true);
/* ---------- KIT 33b kitEquipSlots — "Đang mang": the named EQUIPMENT slots (owner 11/15, RPG-style), under the bag ----------
   kitEquipSlots({key, title, slots:[{k, label, item:{src,name,grade,tip}|null, ghost:src, note}], sum:html, onPick:fn(slot)}) → HTML
   Each slot = kitItem size "slot" (same grade ground + frame as the bag); an EMPTY slot shows its type as a faint silhouette (o.ghost).
   Under each: the slot name + what is in it (or "trống"). The header carries the bonus summary of everything worn. Tap → onPick(slot). */
const KEQ={reg:{}};
function kitEquipSlots(o){o=o||{};const key=o.key||"eq";KEQ.reg[key]=o;const L=o.slots||[];
 return `<div class="keq" data-keq="${key}" style="--keqn:${L.length}"><div class="keqh"><h4 class="kpst">${o.title||"Bên mình"}</h4><div class="keqsum">${o.sum||""}</div></div><div class="keqs">`+
  L.map((x,i)=>`<div class="keqc">${kitItem(x.item?{src:x.item.src,name:x.item.name,grade:x.item.grade,lux:x.item.lux,size:"slot",tip:x.item.tip||x.item.name,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`}
   :{empty:true,size:"slot",ghost:x.ghost,tip:`${x.label}: trống`,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`})}${x.item?`<b class="keqnm" style="color:${KIT_GRADE[x.item.grade|0].c}">${x.item.name}</b>${x.mini?`<span class="keqfx">${x.mini}</span>`:""}`:`<b class="keql">${x.label}</b>`}</div>`).join("")+`</div></div>`}
document.addEventListener("click",e=>{const s=e.target.closest&&e.target.closest("[data-keqi]");if(!s)return;e.stopPropagation();const o=KEQ.reg[s.dataset.keqk];const x=o&&o.slots&&o.slots[+s.dataset.keqi];if(x&&o.onPick)o.onPick(x)},true);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.keqi!=null){e.preventDefault();e.target.click()}});
(function(){const st=document.createElement("style");st.id="keq-css";st.textContent=`
.keq{border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#fbf4e7;padding:8px 10px 10px;margin:4px 0 6px}
.keq .keqh{display:flex;align-items:center;justify-content:space-between;gap:6px 10px;flex-wrap:wrap;margin:0 0 6px}.keq .keqh .kpst{margin:0}
.keq .keqsum{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:.8rem}
.keq .keqs{display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:12px 8px}
.keq .keqnm{font-size:.74rem;line-height:1.2;overflow-wrap:anywhere;margin-top:2px}
.keq .keqfx{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2px}.keq .keqfx .kchip{font-size:.68rem;margin:0;padding:0 5px}
.keq .keql2{flex-basis:100%;display:flex;justify-content:center;align-items:center;gap:3px}.keq .keqm{font-size:.68rem;color:var(--ink2,#7a6a58)}.keq .keqw{color:#c23b22;font-size:.8rem;line-height:1;cursor:help}
@media (max-width:899px){.keq{--keqsz:76px}.keq .keqs{gap:8px}}
.keq .keqc{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;text-align:center}
.keq .keqc>.kitem-slot{width:min(var(--keqsz,96px),100%)}
.keq .keqrows{align-self:stretch;text-align:left;margin-top:4px;padding-top:4px;border-top:1px dashed var(--k-hair,#e6d3ac)}
.keq .keqrows .kpkb{font-size:.74rem}.keq .keqrows .krl{white-space:nowrap}
.keq .keqhint{font-size:.7rem;line-height:1.25;color:var(--ink2,#7a6a58);font-style:italic;margin-top:2px}
.keq .kchip,.kinvrows .kchip{max-width:none;white-space:normal;overflow:visible;text-overflow:clip}
.keq .keqsum{min-width:0}
.dlg.kpanel .kinvrows{margin:0 0 6px}
.keq .keql{font-size:.78rem;color:var(--ink)}.keq .keqn{font-size:.68rem;line-height:1.2;color:var(--ink2,#7a6a58);overflow-wrap:anywhere}
.keq .kitem-slot[role=button]:hover>.kitb,.keq .kitem-slot[role=button]:focus-visible>.kitb{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e));outline:none}
.keq .kitem-slot:focus{outline:none}
.dlg.kpanel .keqpick{display:flex;flex-wrap:wrap;gap:10px;margin:6px 0}
`;document.head.appendChild(st)})();
/* ---------- new wear slots (owner 11/15): EXTEND j8 IT, no new item list. Only items that have a painting get a slot:
   Đeo eo = ngocboi (ngọc bội ngự ban worn at the waist: shows imperial favour, Danh +1; still a keepsake: never given, never sold),
   Túi thơm = tuithom (worn at the belt: Sắc +1 instead of being used up; a tainted sachet keeps hurting through j8 taintHit as before).
   Hoa tai / Khăn che mặt / Giày hoa: no item painting exists → not added (owner to approve new art first). Old saves: worn hair/wrist keep their slots;
   a sachet or pendant becomes wearable, nothing is auto-worn. wearBonus counts every stat key (it only knew Sắc/Danh). ---------- */
try{if(IT.ngocboi){IT.ngocboi.sl="waist";IT.ngocboi.w={danh:1};IT.ngocboi.d="Đeo eo: Danh +1 · còn giữ: Sủng không dưới 15 · mất là đại họa"}
 if(IT.tuithom){IT.tuithom.sl="scent";IT.tuithom.w={sac:1};delete IT.tuithom.use;IT.tuithom.d="Đeo bên mình: Sắc +1, thơm dịu"}}catch(e){}
/* ---------- LUXURY axis (owner 11/15): besides vượt phẩm (above her rank → tố), what she wears can be too LAVISH for her standing.
   Shown as NUMBERS (owner 11/15): every item / garment has "Xa xỉ N" = [8,16,28,44,64][grade] + giá/10 (luxVal);
   her allowance = 36 + 16 × rank (+10 if Sủng ≥ 60) (luxAllow). Total worn vs allowance, e.g. "Xa xỉ 112 / 84".
   Level (internal): 0 nothing worn · 1 ≤ allowance · 2 ≤ 1.5 × allowance · 3 above.
   Monthly (j8 itemMonth, player and every NPC alike): Xa hoa → others' Ghen +1 (×trait); Quá xa xỉ → Ghen +3 (×trait), Thái hậu/Hoàng hậu
   may frown (chance falls with Đức): Thái hậu -3 for her / Danh -2 for an NPC, gossip 1 in 4: Danh -1. Giản dị from Tần up: 1 in 4 Đức +1. ---------- */
const LUX_W=[0,1,2,3,5],LUX_N=[["Giản dị","n"],["Vừa phẩm","g"],["Xa hoa","n"],["Quá xa xỉ: dễ bị ghen","r"]],LUX_TR={"Kiêu ngạo":1.5,"Tham vọng":1.5,"Hiểm độc":1.2,"Đa nghi":1,"Hiền lành":.5,"Nhu mì":.5};
function luxWorn(p){const L=(p.inv||[]).filter(e=>e.w&&!e.h&&IT[e.k]&&IT[e.k].sl).map(e=>e.k);if(p.dress&&p.dress.until>S.turn&&IT[p.dress.k])L.push(p.dress.k);return L}
function luxGrade(k){const a=typeof itemArt==="function"?itemArt(k):null;return a?a.grade|0:0}
const LUX_V=[8,16,28,44,64];
function luxVal(k){const it=IT[k];if(!it)return 0;return LUX_V[luxGrade(k)]+Math.round((it.pr||0)/10)}
function luxAllow(p){return 36+16*Math.max(0,Math.min(7,rkOf(p)|0))+((p.sung|0)>=60?10:0)}
function luxOf(p){const L=luxWorn(p);const sc=L.reduce((s,k)=>s+luxVal(k),0);const bud=luxAllow(p);
 const lv=sc===0?0:sc<=bud?1:sc<=bud*1.5?2:3;return{lv,sc,bud,name:LUX_N[lv][0],cls:LUX_N[lv][1]}}
/* kit chip: total worn luxury vs allowance; over the allowance = red */
/* owner 11/15: only the worn TOTAL, neutral — never the allowance, never a level word or colour; she learns the limit from what happens */
function kitLuxChip(x){return `<span class="kchip n kluxc">Xa xỉ <b>${x.sc}</b></span>`}
function luxMonth(p){try{if(!p||p.out||p.alive===false)return"";const x=luxOf(p);let r="";const me=p===S;
 if(x.lv>=2){const n=x.lv===3?3:1;liveRivals(true).forEach(v=>{if(v===p)return;const m=LUX_TR[v.trait]||1;v.ghen=cl((v.ghen||0)+Math.max(1,Math.round(n*m*(me?1:.5))),0,100)});
  if(me&&x.lv===3)r+="Hậu cung xì xào ngươi ăn mặc quá xa xỉ, nhiều người ghen. "}
 if(x.lv===3&&roll(cl(50-(p.duc|0)/2,10,50))){if(me){apply({th:-3});r+="Thái hậu chê ngươi phô trương. Thái hậu -3. "}else ap(p,{danh:-2})}
 if(x.lv===3&&roll(25)){if(me){apply({danh:-1});r+="Lời đồn ngươi phung phí lan khắp cung. Danh -1. "}else ap(p,{danh:-1})}
 if(x.lv===0&&rkOf(p)>=3&&roll(25)){if(me){apply({duc:1});r+="Ngươi ăn mặc giản dị, được khen có đức. Đức +1. "}else ap(p,{duc:1})}
 return r}catch(e){return""}}
if(typeof itemMonth==="function"){const im0=itemMonth;itemMonth=function(p){let r=im0.apply(this,arguments)||"";r+=luxMonth(p);return r}}
if(typeof wearBonus==="function")wearBonus=function(p){const b={sac:0,danh:0};if(!p||!p.inv)return b;const r=rkOf(p);
 for(const e of p.inv)if(e.w&&!e.h&&IT[e.k]&&IT[e.k].w){const m=IT[e.k].rk>r?1.5:1;for(const s in IT[e.k].w)b[s]=(b[s]||0)+Math.round(IT[e.k].w[s]*m)}
 if(p.dress&&p.dress.until>S.turn&&IT[p.dress.k]){const it=IT[p.dress.k];b.sac+=Math.round(it.dr*(it.rk>r?1.5:1))}return b};
/* Tư trang: the slots that really exist in the rules (j8): Cài tóc (IT.sl "hair"), Đeo tay (IT.sl "wrist"), Y phục (áo may từ vải: S.dress, 3 tháng) */
const KEQ_TT=[["hair","Cài tóc","tramngoc"],["wrist","Đeo tay","vongngoc"],["waist","Đeo eo","ngocboi"],["scent","Túi thơm","tuithom"],["veil","Khăn che mặt",""],["dress","Y phục","luahang"]];
/* ---------- Khăn che mặt (owner 11/15): the hủy dung veil of j70 (`p.scar = {sev, known, veil}`; drawn by KIT_VEIL over every portrait).
   It is not a chest item: she has one once her face was harmed (p.scar exists). Art = KIT_VEIL's own veil for her rank
   (img/veil-t1..t8.png pearl strands for consorts, img/veil-silk-ivory/pink.png silk for cung nữ, ma ma, lãnh cung).
   Rules (player and NPC alike, read/written on the same p.scar.veil field j70 uses):
     worn with a mark (sev > 0): hides it, Sắc +2 (wearBonus);  worn with no mark left: 1 in 4 a month, people whisper she hides something, Danh -1.
   Not counted in the luxury score (a necessity). ---------- */
function veilHas(p){return !!(p&&p.scar)}
function veilOn(p){try{return !!(p&&p.scar&&p.scar.veil)}catch(e){return false}}
function veilNeed(p){return !!(p&&p.scar&&(p.scar.sev|0)>0)}
function veilSrc(p){try{if(window.KIT_VEIL&&KIT_VEIL.src)return KIT_VEIL.src(KIT_VEIL.tierOf(p))}catch(e){}return "img/veil-silk-ivory.png"}
function veilGrade(p){try{const t=window.KIT_VEIL?KIT_VEIL.tierOf(p):"silk";const n=+String(t).replace(/\D/g,"");return !n?0:n<=2?0:n<=4?1:n<=6?2:n===7?3:4}catch(e){return 0}}
function veilSet(p,on){if(!p)return;p.scar=p.scar||{sev:0};p.scar.veil=on?1:0}
(function(){const wb0=wearBonus;wearBonus=function(p){const b=wb0.apply(this,arguments);if(veilOn(p)&&veilNeed(p))b.sac=(b.sac||0)+2;return b}})();
(function(){const im1=itemMonth;itemMonth=function(p){let r=im1.apply(this,arguments)||"";try{if(veilOn(p)&&!veilNeed(p)&&roll(25)){if(p===S){apply({danh:-1});r+="Có kẻ xì xào ngươi che mặt để giấu điều gì. Danh -1. "}else ap(p,{danh:-1})}}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-keqveil]");if(!b)return;e.stopPropagation();if(b.disabled)return;veilSet(S,b.dataset.keqveil==="on");try{closeModal()}catch(x){}try{render()}catch(x){}},true);
/* Y phục slot shows the GARMENT, not the fabric roll (owner 11/15): the j92 wardrobe paintings img/wd512/wd-<tier>-y-NN.webp
   (10 per tier, NN 01-04 Thường · 05-07 Tinh phẩm · 08-09 Trân phẩm · 10 Tuyệt phẩm). j92 has no fabric→outfit table, so the outfit is
   picked deterministically: her tier (rank → dapung…hh; cung nữ → m1) and, inside the band of the fabric's grade, a stable hash of fabric key + rank. */
const KEQ_TIER=["dapung","thuongtai","quynhan","tan","phi","quyphi","hqp","hh"],KEQ_YBAND=[[1,4],[5,7],[8,9],[10,10],[10,10]];
function keqTier(){try{if(typeof isSrv==="function"&&isSrv())return"m1"}catch(e){}return KEQ_TIER[Math.max(0,Math.min(7,S.rank|0))]}
function keqRobe(k){const a=typeof itemArt==="function"?itemArt(k):null;const b=KEQ_YBAND[a?a.grade|0:0];let h=0;const str=k+"|"+(S.rank|0);for(let i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))>>>0;
 const n=b[0]+h%(b[1]-b[0]+1);return `img/wd512/wd-${keqTier()}-y-${String(n).padStart(2,"0")}.webp`}
function keqArt(k){const a=typeof itemArt==="function"?itemArt(k):null;return a?a.src:(typeof ITIMG==="object"&&ITIMG[k]?`img/item-${ITIMG[k]}.webp`:"")}
function keqTT(){const wb=wearBonus(S),vp=vpItems(S);const slots=KEQ_TT.map(([sl,label,gk])=>{let item=null,note="",ix=-1;
  if(sl==="veil"){if(veilOn(S))item={src:veilSrc(S),name:"Khăn che mặt",grade:veilGrade(S),tip:veilNeed(S)?"Khăn che mặt: che vết trên mặt":"Khăn che mặt: mặt đã lành"}}
  else if(sl==="dress"){if(S.dress&&S.dress.until>S.turn&&IT[S.dress.k]){const it=IT[S.dress.k],a=typeof itemArt==="function"?itemArt(S.dress.k):null;const m=S.dress.until-S.turn;
    item={src:keqRobe(S.dress.k),name:`Áo ${it.n}`,grade:a?a.grade:0,lux:luxVal(S.dress.k),tip:`Áo may từ ${it.n} · còn ${m} tháng`};note=`áo may từ ${it.n} · còn ${m} tháng`}}
  else{ix=S.inv.findIndex(e=>!e.h&&e.w&&IT[e.k]&&IT[e.k].sl===sl);if(ix>=0){const k=S.inv[ix].k,a=typeof itemArt==="function"?itemArt(k):null;item={src:keqArt(k),name:IT[k].n,grade:a?a.grade:0,lux:luxVal(k),tip:`${label}: ${IT[k].n}`}}}
  let mini="";if(item&&sl==="veil")mini=veilNeed(S)?kitChip("Sắc",2):`<span class="keql2"><span class="keqm">mặt đã lành</span><span class="keqw" title="che mặt không cần: dễ bị đồn" aria-label="che mặt không cần: dễ bị đồn">⚠</span></span>`;
  else if(item){const k=sl==="dress"?S.dress.k:S.inv[ix].k,it=IT[k],over=!!(it.rk&&it.rk>S.rank),m=over?1.5:1,N=typeof NAMES==="object"?NAMES:{};
   const fx=sl==="dress"?[["Sắc",Math.round(it.dr*m)]]:Object.entries(it.w||{}).filter(([a,v])=>v).map(([a,v])=>[N[a]||a,Math.round(v*m)]);
   const risk=over?"vượt phẩm: dễ bị tố":"";
   mini=fx.map(([a,v])=>kitChip(a,v)).join("")+(sl==="dress"||risk?`<span class="keql2">${sl==="dress"?`<span class="keqm">còn ${S.dress.until-S.turn} tháng</span>`:""}${risk?`<span class="keqw" title="${risk}" aria-label="${risk}">⚠</span>`:""}</span>`:"")}
  return{k:sl,label,item,note,ix,mini,hint:kitItemHint(sl),ghost:sl==="dress"?`img/wd512/wd-${keqTier()}-y-01.webp`:sl==="veil"?"img/veil-silk-ivory.png":keqArt(gk)}});
 const C=[];if(wb.sac)C.push(["Sắc",wb.sac]);if(wb.danh)C.push(["Danh",wb.danh]);
 const sum=(C.length?kitChips(C):`<span class="past">chưa mang gì: không thêm</span>`)+kitLuxChip(luxOf(S))+(vp.length?kitChip(`${vp.length} món vượt phẩm: dễ bị tố`,"no"):"");
 return kitEquipSlots({key:"tutrang",title:"Bên mình",slots,sum,onPick:keqPick})}
function keqPick(x){if(x.k==="veil"){const on=veilOn(S),need=veilNeed(S),has=veilHas(S);
  const rows=kitRows([["Được",need?["che vết trên mặt","Sắc +2"]:[],"g"],["Mất",on&&!need?["mặt đã lành mà vẫn che: dễ bị đồn, Danh -1"]:[],"r"],["Ghi chú",[has?(need?"vết hủy dung còn trên mặt":"mặt đã lành"):"chỉ có khi bị hủy dung hay nổi mẩn"],"n"]]);
  const B=has?[pbtn(`data-keqveil="${on?"off":"on"}"`,on?"Bỏ khăn":"Che mặt",on?(need?"kèm: vết trên mặt lộ ra, Sắc -2":"thành: hết bị đồn che mặt"):(need?"thành: che vết trên mặt, Sắc +2":"kèm: mặt lành mà che, dễ bị đồn"),"")]:[];
  kitModal({kind:"info",title:"Khăn che mặt",sub:on?"đang che":"trống",itemPic:kitItem(on?{src:veilSrc(S),name:"",grade:veilGrade(S),size:"lg"}:{empty:true,ghost:"img/veil-silk-ivory.png",size:"lg",name:""}).replace('<span class="kitn"></span>',''),
   html:`<div class="kinvrows">${rows}</div>${B.length?`<div class="rbtn kinvacts">${B.join("")}</div>`:""}`,btn:"Lui"});return}
 if(x.item){if(x.k==="dress"){const it=IT[S.dress.k];kitModal({kind:"info",title:"Áo mới",sub:`áo may từ ${it.n} · còn ${S.dress.until-S.turn} tháng`,
   itemPic:kitItem({src:x.item.src,name:"",grade:x.item.grade,size:"lg",lux:x.item.lux}).replace('<span class="kitn"></span>',''),
   html:`<div class="kinvrows">${kitItemRows(S.dress.k,{dress:1,months:S.dress.until-S.turn})}</div>`,btn:"Lui"});return}
  const it=kinvItems().find(y=>y.g.i===x.ix);if(it)kinvOpen(it);return}
 const L=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h&&IT[e.k]&&(x.k==="dress"?IT[e.k].dr:IT[e.k].sl===x.k));const seen=new Set();
 const T=L.filter(([e])=>{if(seen.has(e.k))return false;seen.add(e.k);return true}).map(([e,i])=>{const it=IT[e.k],a=typeof itemArt==="function"?itemArt(e.k):null;
  const fx=x.k==="dress"?`Sắc +${it.dr}, 3 tháng`:kinvPlain(it.w);return kitItem({src:keqArt(e.k),name:it.n,grade:a?a.grade:0,size:"md",label:[it.rk>S.rank?"vượt phẩm":fx,it.rk>S.rank?"no":"n"],
   data:`data-kinvact="${x.k==="dress"?"use":"wear"}" data-ix="${i}" role="button" tabindex="0"`,tip:`${x.k==="dress"?"May áo":"Đeo"}: ${it.n} · ${fx}`})});
 kitModal({kind:"info",title:`Ô ${x.label.toLowerCase()}`,sub:"trống",itemPic:kitItem({empty:true,ghost:x.ghost,size:"lg",name:""}).replace('<span class="kitn"></span>',''),
  html:T.length?`<p class="past">Chạm một món để ${x.k==="dress"?"may áo mặc":"đeo vào"}.</p><div class="keqpick">${T.join("")}</div>`
   :kitFacts([x.k==="dress"?"Rương chưa có vải để may áo.":`Rương chưa có món nào ${({hair:"cài tóc",wrist:"đeo tay",waist:"đeo eo",scent:"đeo bên mình"})[x.k]} được.`,"Nhờ thái giám mua đồ, hoặc chờ được ban thưởng."]),btn:"Lui"})}
if(typeof invHTML==="function"){const inv0=invHTML;invHTML=function(){let h=inv0.apply(this,arguments);try{
  const i=h.indexOf('<div class="cards">');if(i>=0)h=h.slice(0,i);h=h.replace(/^<div class="ph">[\s\S]*?<\/div>\s*/,"");
  return h+kitInvGrid({key:"tutrang",tabs:KINV_CATS.map(c=>({k:c[0],label:c[1]})).concat(S.inv.some(e=>!e.h&&IT[e.k]&&kinvCat(IT[e.k].kd)==="tap")?[{k:"tap",label:"Tạp vật"}]:[]),
   items:kinvItems(),minRows:2,onPick:kinvOpen})+keqTT()}catch(e){console.error("kitInvGrid",e);return inv0.apply(this,arguments)}}}
