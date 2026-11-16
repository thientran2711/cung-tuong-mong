/* ================= jinv: kitInvGrid — the BAG (owner 11/15 04:00Z, shot 1115-49c7629b) =================
   KIT 33. A game-style inventory: a grid of EMPTY SQUARE SLOTS (like an RPG bag), split by item-type tabs (the ONE tab row of
   k3CatTabs: kitTabRowHTML in `.pctabs.kcattabs`). Items fill the first slots: kitItem size "slot" (painted icon on the grade ground,
   ×N count, worn band, corner tag); the remaining slots stay empty squares; the grid always ends on a full row (≥ minRows rows).
   Tap a slot → the caller's onPick(item) (Tư trang: the item panel, kitModal with the item picture, facts and act cards).
     kitInvGrid({key, tabs:[{k,label}], items:[{cat, src, name, grade, qty, on, onText, mark, tip, id}], minRows:4, onPick:fn(item), side:html, sum:html, below:html}) → HTML
     BAG + WEAR LAYOUT (owner 16/11 16:20Z, review/tutrang-layout): where a bag also shows what is worn, pass side = kitEquipSlots({col:true,…}) (ONE vertical
     column on the LEFT, width = one square slot), sum = the worn-bonus chips (a line under the grid), the PET box goes in the same column under Y phục (jpet petSideHTML);
     the grid (wider, more cells) sits on the right. Every place with wear slots + a bag (Tư trang, Chọn y phục) uses this one arrangement.
   The chosen tab is remembered per key (`hclh-kinv-<key>`). Items are only ever EARNED (bought, given, bestowed): the bag starts empty. */
const KINV={reg:{},cur:{}};
function kitInvGrid(o){o=o||{};const key=o.key||"bag";KINV.reg[key]=o;
 let cur=KINV.cur[key];if(cur==null){try{cur=localStorage.getItem("hclh-kinv-"+key)}catch(e){}}
 const tabs=[{k:"all",label:"Tất cả"}].concat(o.tabs||[]);if(!tabs.some(t=>t.k===cur))cur="all";KINV.cur[key]=cur;
 const L=(o.items||[]).filter(x=>cur==="all"||x.cat===cur);
 const cnt=k=>(o.items||[]).filter(x=>k==="all"||x.cat===k).reduce((a,x)=>a+(x.qty||1),0);
 const row=kitTabRowHTML(tabs.map(t=>{const n=cnt(t.k);return{k:t.k,label:t.label,n,tip:`${n} món`}}),cur,`data-kinvkey="${key}" data-kinvtab`);
 const slots=L.map((x,i)=>kitItem({src:x.src,name:x.name,grade:x.grade,qty:x.qty,on:x.on,onText:x.onText,mark:x.mark,lux:x.lux,sel:x.sel,size:"slot",
   tip:x.tip||x.name,data:`data-kinvkey="${key}" data-kinvi="${(o.items||[]).indexOf(x)}" role="button" tabindex="0"`})).join("");
 return `<div class="kinv" data-kinv="${key}" data-min="${o.minRows||4}"><div class="pctabs kcattabs kinvtabs" role="tablist">${row}</div>`+
  `<div class="kinvbody${o.side?" kinvws":""}">${o.side?`<div class="kinvside">${o.side}</div>`:""}<div class="kinvmain">`+
  `<div class="kinvg" data-n="${L.length}">${slots}${kitInvEmpty(Math.max(0,(o.minSlots||24)-L.length))}</div>`+
  `${o.sum?`<div class="keqsum kinvsum">${o.sum}</div>`:""}${o.below||""}</div></div></div>`}
function kitInvEmpty(n){let h="";for(let i=0;i<n;i++)h+=kitItem({empty:true,size:"slot",tip:"Ô trống"});return h}
/* fill the grid to whole rows (≥ minRows rows) once its column count is known; inside the panel, the grid also GROWS by whole rows into
   any free height left at the bottom of the panel (owner 11/15: no big empty gap under the bag; equipment panel stays below it). */
function kitInvFit(){document.querySelectorAll(".kinv .kinvg").forEach(g=>{try{
 /* refit whenever the grid's width or the panel's height changes (late layout, rotation, book page open) */
 if(!g.__kro&&typeof ResizeObserver==="function"){let w0=0,h0=0;g.__kro=new ResizeObserver(()=>{const P=g.closest("#panel");const w=g.clientWidth,h=P?P.clientHeight:0;if(w===w0&&h===h0)return;w0=w;h0=h;
   clearTimeout(g.__kroT);g.__kroT=setTimeout(kitInvFit,40)});g.__kro.observe(g);const P=g.closest("#panel");if(P)g.__kro.observe(P)}
 if(!g.clientWidth)return;g.style.removeProperty("--kinvsz");let cols=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;
 /* wear column (kinvside): its slot = one bag cell, shrunk so the 6 slots + names fit the panel height (never below 44 px); sized BEFORE the free height is measured */
 try{const sd=g.closest(".kinv").querySelector(".kinvside");if(sd){const P0=g.closest("#panel"),cs0=getComputedStyle(P0),n0=sd.querySelectorAll(".keqc").length||6,h4=(sd.querySelector(".kpst")||{offsetHeight:0}).offsetHeight+4;
   const avail=P0.getBoundingClientRect().bottom-(parseFloat(cs0.paddingBottom)||0)-(sd.getBoundingClientRect().top-(parseFloat(getComputedStyle(sd.querySelector(".keq")).paddingTop)||0)*0)-6;
   const pi=[...sd.querySelectorAll(".keqpi")].reduce((a,e)=>a+e.offsetHeight,0),nk=sd.querySelectorAll(".keq").length;g.__kper=Math.floor((avail-h4*nk-12*nk-pi)/n0-5-13);const kv0=sd.parentElement.parentElement;let ks=Math.max(40,Math.min(72,g.__kper));kv0.style.setProperty("--kside",ks+"px");
   /* measured pass: the column must end inside the panel (labels may wrap); shrink the slot by the overflow, never below 40 px */
   const lim=P0.getBoundingClientRect().bottom-(parseFloat(cs0.paddingBottom)||0)-14;for(let it=0;it<14;it++){const ov=sd.getBoundingClientRect().bottom-lim;if(ov<=1||ks<=40)break;ks=Math.max(40,ks-Math.max(1,Math.ceil(ov/n0)));kv0.style.setProperty("--kside",ks+"px")}
   /* still too tall at the 40 px floor (short iPad page + pets): the pet box drops its title and spare lines (the slot + name already say what it is) */
   kv0.classList.toggle("kinvtight",sd.getBoundingClientRect().bottom-lim>1);g.__kper=ks}}catch(e){}
 const n=+g.dataset.n||0,min=+(g.closest(".kinv").dataset.min||4);const want=Math.max(min*cols,Math.ceil(n/cols)*cols);let have=g.children.length;
 if(have<want){g.insertAdjacentHTML("beforeend",kitInvEmpty(want-have));have=want}else for(let i=have;i>Math.max(want,n);i--){const c=g.lastElementChild;if(c&&c.classList.contains("kitem-empty")){c.remove();have--}else break}
 const P=g.closest("#panel");if(!P||!P.clientHeight||!g.firstElementChild)return;const pr=P.getBoundingClientRect(),cs=getComputedStyle(P);
 /* free height = panel content bottom − bottom of the last IN-FLOW child (absolute decorations such as corner petals do not count) */
 const freeOf=()=>{let bot=-1e9;for(const c of P.children){const s=getComputedStyle(c);if(s.position==="absolute"||s.position==="fixed"||s.display==="none")continue;const km=c.querySelector&&c.querySelector(".kinvmain");const r=(km&&km.closest(".kinv")?km:c).getBoundingClientRect();/* with a wear column the bag column fills the free height; the column is sized to fit on its own */if(r.height)bot=Math.max(bot,r.bottom+(parseFloat(s.marginBottom)||0))}
  return pr.bottom-(parseFloat(cs.borderBottomWidth)||0)-(parseFloat(cs.paddingBottom)||0)-bot-2-(g.closest(".kinvws")?12:0)};const free=freeOf();
 const rh=g.firstElementChild.getBoundingClientRect().height+(parseFloat(getComputedStyle(g).rowGap)||0);const add=rh>8?Math.floor(free/rh):0;
 if(add>0&&P.scrollHeight<=P.clientHeight+1)g.insertAdjacentHTML("beforeend",kitInvEmpty(add*cols));
 /* still a gap smaller than one row: one more COLUMN (slightly smaller slots), then whole rows again; keep it only if the gap shrinks
    and nothing scrolls (up to 3 steps) */
 const colsOf=()=>getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length||1;
 const fitRows=c=>{const w=Math.max(min*c,Math.ceil(n/c)*c);for(let i=g.children.length;i>Math.max(w,n);i--){const x=g.lastElementChild;if(x&&x.classList.contains("kitem-empty"))x.remove();else break}
  if(g.children.length<w)g.insertAdjacentHTML("beforeend",kitInvEmpty(w-g.children.length));if(g.children.length%c)g.insertAdjacentHTML("beforeend",kitInvEmpty(c-g.children.length%c));
  const r=g.firstElementChild.getBoundingClientRect().height+(parseFloat(getComputedStyle(g).rowGap)||0);const k=r>8?Math.floor(freeOf()/r):0;if(k>0)g.insertAdjacentHTML("beforeend",kitInvEmpty(k*c))};
 for(let t=0;t<(g.closest(".kinvws")?0:3);t++){/* with a wear column the cells keep their natural size: whole rows only */const f0=freeOf();if(f0<12||P.scrollHeight>P.clientHeight+1)break;const gap=parseFloat(getComputedStyle(g).columnGap)||0,W=g.clientWidth-(parseFloat(getComputedStyle(g).paddingLeft)||0)-(parseFloat(getComputedStyle(g).paddingRight)||0);
  const sz=Math.floor((W+gap)/(cols+1)-gap);if(sz<44)break;const prev=g.style.getPropertyValue("--kinvsz"),pc=cols,ph=g.children.length;
  g.style.setProperty("--kinvsz",sz+"px");const c2=colsOf();if(c2<=pc){if(prev)g.style.setProperty("--kinvsz",prev);else g.style.removeProperty("--kinvsz");break}fitRows(c2);
  const f1=freeOf();if(P.scrollHeight>P.clientHeight+1||f1<-1||f1>=f0){if(prev)g.style.setProperty("--kinvsz",prev);else g.style.removeProperty("--kinvsz");
   for(let i=g.children.length;i>ph;i--){const x=g.lastElementChild;if(x&&x.classList.contains("kitem-empty"))x.remove();else break}if(g.children.length<ph)g.insertAdjacentHTML("beforeend",kitInvEmpty(ph-g.children.length));cols=pc;break}
  cols=c2}
 /* what is left (less than one bag row) goes to the equipment slots, which grow up to 112 px */
 try{const kv=g.closest(".kinv"),cw=g.firstElementChild?g.firstElementChild.getBoundingClientRect().width:0;if(cw)kv.style.setProperty("--kcell",Math.round(cw)+"px");
  const sd=kv.querySelector(".kinvside");if(sd&&cw)kv.style.setProperty("--kside",Math.max(40,Math.min(72,g.__kper||999))+"px")}catch(e){}
 const q=P.querySelector(".keq:not(.keqv):not(.keqr)");if(q){q.style.removeProperty("--keqsz");if(P.scrollHeight<=P.clientHeight+1){const f2=freeOf()-8;const sl0=q.querySelector(".keqc>.kitem");const s0=sl0?sl0.getBoundingClientRect().width:0;
  const c0=q.querySelector(".keqc");const maxW=c0?c0.clientWidth:150;if(f2>4&&s0)q.style.setProperty("--keqsz",Math.round(Math.min(112,maxW,s0+f2))+"px")}
  else{/* a few px too tall: shrink the equipment slots rather than scroll (never below 64 px) */const over=P.scrollHeight-P.clientHeight;const sl0=q.querySelector(".keqc>.kitem");const s0=sl0?sl0.getBoundingClientRect().width:0;
   if(s0&&over>0&&over<=60)q.style.setProperty("--keqsz",Math.max(64,Math.floor(s0-over-2))+"px")}}}catch(e){console.error("kitInvFit",e)}});try{kitTabStick()}catch(e){}}
addEventListener("resize",()=>{clearTimeout(window.__kinvT);window.__kinvT=setTimeout(kitInvFit,60)});
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-kinvtab]");if(t){e.stopPropagation();const k=t.dataset.kinvkey;KINV.cur[k]=t.dataset.kinvtab;
  try{localStorage.setItem("hclh-kinv-"+k,t.dataset.kinvtab)}catch(x){}try{render()}catch(x){}return}
 const s=e.target.closest&&e.target.closest("[data-kinvi]");if(s){e.stopPropagation();const o=KINV.reg[s.dataset.kinvkey];const it=o&&o.items&&o.items[+s.dataset.kinvi];if(it&&o.onPick)o.onPick(it)}},true);
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.kinvi!=null){e.preventDefault();e.target.click()}});
(function(){const st=document.createElement("style");st.id="kinv-css";st.textContent=`
.kinv{display:flex;flex-direction:column;gap:0;margin:0 0 10px}
.kinv .kinvg{display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--kinvsz,60px),1fr));gap:6px;padding:8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#f4ead8;box-shadow:inset 0 1px 3px #5a3a2018}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
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
 for(const [e,i] of vis){/* handmade works (j83 IT.tp, e.wk) are each their own piece: own name, tier, painting */const g=e.wk?null:G.find(x=>x.k===e.k&&!x.wk&&!!x.t===!!(e.by==="me"&&e.t)&&!x.w&&!e.w);if(g)g.n++;else G.push({k:e.k,t:e.by==="me"?e.t:null,w:e.w,i,n:1,from:e.from,wk:e.wk||null,e})}return G}
/* a work: picture of its kind + tier (j98 itemArt(entry)), its own name ("Bát chè hạt sen", "Khăn thêu uyên ương"), grade = its tier (Thường · Khá · Tinh xảo · Tuyệt phẩm) */
function kinvWork(g){const w=g.wk,a=typeof itemArt==="function"?itemArt(g.e):null,ti=Math.max(0,Math.min(3,w.ti|0)),tn=typeof WTIER!=="undefined"?WTIER[ti]:"";
 return{id:g.i,g,cat:"tap",src:a?a.src:"",src512:a?a.src512:"",name:w.n,grade:ti,gname:tn,qty:1,on:false,onText:"",mark:null,lux:0,tip:`${w.n} · ${tn}`}}
function kinvItems(){return kinvGroups().map(g=>{if(g.wk)return kinvWork(g);const it=IT[g.k];let a=typeof itemArt==="function"?itemArt(g.k):null;
 /* veils (jveil mc*): their own painting + grade (KIT §54.1 kitItemInfo) — before: no picture, always Thường */
 if(!a&&it.vl&&typeof kitItemInfo==="function"){const I=kitItemInfo({k:g.k});a={src:I.src,src512:I.src512,grade:I.grade}}
 const src=a?a.src:(typeof ITIMG==="object"&&ITIMG[g.k]?`img/item-${ITIMG[g.k]}.webp`:"");
 return{id:g.i,g,cat:kinvCat(it.kd),src,src512:a?a.src512:src,name:it.n,grade:a?a.grade:0,qty:g.n,on:!!g.w,onText:"Đang mặc"/* VANPHONG: one badge for every equipped item */,
  mark:g.t&&typeof TAINT==="object"&&TAINT[g.t]?["đã tẩm","r"]:null,lux:IT[g.k].sl||IT[g.k].dr?luxVal(g.k):0,tip:`${it.n}${g.n>1?" ×"+g.n:""} · ${it.kd}`}})}
/* KIT 33c kitItemRows(k, o) — the ONE fact block of an item (owner 11/15): kit act-card rows (kitRows) Phẩm · Được · Mất · Ghi chú.
   Used under every "Đang mang" slot (no tap needed) and at the top of the item panel. o = {months, worn, ownTaint, dress, compact}.
   Được = what it gives (worn effects ×1.5 when above her rank, as j8 wearBonus); Mất = risks (vượt phẩm, contraband, loss);
   Ghi chú = duration / slot / rank it suits. Empty slot: kitItemHint(slot) — one short line on what the slot is for. */
/* kitItemLists(k,o) → {gr, D, M, G, lux, slot} = the facts as lists (KIT §70 kitItemDetail composes them; kitItemRows = the old 4-row block) */
function kitItemLists(k,o){o=o||{};const it=IT[k];if(!it)return null;const a=typeof itemArt==="function"?itemArt(k):null;const gr=KIT_GRADE[a?a.grade|0:0];
 const over=!!(it.rk&&it.rk>S.rank),m=over?1.5:1,N=typeof NAMES==="object"?NAMES:{};const eff=w=>Object.entries(w||{}).filter(([x,v])=>v).map(([x,v])=>{const n=Math.round(v*m);return `${N[x]||x} ${n>0?"+":""}${n}`});
 const D=[],M=[],G=[];
 if(o.dress||(!it.sl&&it.dr&&o.worn))D.push(`Sắc +${Math.round(it.dr*m)}`);else if(it.dr)D.push(`may áo: Sắc +${Math.round(it.dr*m)}`);
 if(it.w)D.push(...eff(it.w));
 if(it.use){const u=Object.entries(it.use).filter(([x,v])=>v).map(([x,v])=>`${N[x]||x} ${v>0?"+":""}${v}`);if(u.length)D.push((it.kd==="Thư từ"?"đọc: ":"dùng: ")+u.join(", "))}
 if(it.ant)D.push("an thai");if(it.fert)D.push(`${it.fert} tháng dễ thụ thai`);if(it.anti)D.push("cứu một lần trúng độc");if(it.evi)D.push(`chứng cứ +${it.evi}`);
 if(it.keep)D.push("Sủng không dưới 15");if(it.gv)D.push("đem tặng: hợp ý");if(k==="botngua")D.push("phi tần trúng: Danh -5");if(it.mat)D.push("trộn vào túi thơm, hương trầm");
 if(over)M.push("vượt phẩm: dễ bị tố");if(it.il)M.push("bị khám ra là có tội");if(it.keep)M.push("mất là đại họa");
 if(o.ownTaint&&typeof TAINT==="object"&&TAINT[o.ownTaint])M.push(`đã ${TAINT[o.ownTaint].n}: ${TAINT[o.ownTaint].hurt}`);
 const lux=it.sl||it.dr?luxVal(k):0;if(o.months!=null)G.push(`còn ${o.months} tháng`);else if(it.dr)G.push("áo mặc 3 tháng");
 const slot=it.sl?({hair:"cài tóc",wrist:"đeo tay",waist:"đeo eo",scent:"đeo bên mình"}[it.sl]||""):"";if(it.rk)G.push(`hợp phẩm từ ${RANKS[Math.min(7,it.rk)].n}`);
 return{gr,D,M,G,lux,slot}}
function kitItemRows(k,o){const L=kitItemLists(k,o);if(!L)return"";const G=(L.lux?[`xa xỉ ${L.lux}`]:[]).concat(L.G,L.slot?[L.slot]:[]);
 return kitRows([["Phẩm",`<span class="ef n" style="color:${L.gr.c};font-weight:700">${L.gr.n}</span>`],["Được",L.D,"g"],["Mất",L.M,"r"],["Ghi chú",G,"n"]])}
function kitItemHint(sl){return sl==="hair"?"cài trâm, bộ diêu: thêm Sắc, có món thêm Danh":sl==="wrist"?"đeo vòng: thêm Sắc, Danh":sl==="waist"?"đeo ngọc bội ngự ban: thêm Danh":sl==="scent"?"đeo túi thơm: thêm Sắc":sl==="veil"?"che vết hủy dung hay mẩn ngứa":sl==="dress"?"may áo từ vải: thêm Sắc trong 3 tháng":""}
function kinvOpenWork(x){const g=x.g,w=g.wk,i=g.i,A=typeof ARTS!=="undefined"?ARTS.find(a=>a.k===w.a):null;const t2=typeof whyTime==="function"?whyTime(2):"",t1=typeof whyTime==="function"?whyTime(1):"";
 const B=[pbtn(`data-wk="give" data-ix="${i}"`,"Dâng, tặng","tốn: 2 khắc · thành: chọn người, xem được bao nhiêu",t2),pbtn(`data-wk="sell" data-ix="${i}"`,"Bán ra ngoài cung",`tốn: 1 khắc · thành: Bạc +${typeof wkSellVal==="function"?wkSellVal(w):""}`,t1)];
 if(!w.show&&w.p==null)B.push(pbtn(`data-wk="show" data-ix="${i}"`,"Bày ở yến tiệc",`tốn: 2 khắc · thành: Danh +${typeof WSHOW!=="undefined"?WSHOW[w.ti|0]:""}`,t2));
 const F=[`${w.bn==="ngươi"?"Tự tay ngươi làm":"Của "+w.bn}${w.d?" · "+w.d:""}.`];if(w.p!=null)F.push("Phải dâng trong tuần này.");if(w.show)F.push("Đã bày ở yến tiệc.");
 kitModal({kind:"info",title:w.n,sub:`Tác phẩm tự tay · ${x.gname}`,
  itemPic:kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"lg"}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${typeof kitItemDetailRows==="function"?kitItemDetailRows({ix:i}):""}</div>${kitFacts(F.slice(1))}<div class="rbtn kinvacts">${B.join("")}</div>`})}
function kinvOpen(x){if(x&&x.g&&x.g.wk)return kinvOpenWork(x);const g=x.g,it=IT[g.k],i=g.i;const over=it.rk&&it.rk>S.rank;const B=[];
 if(it.sl)B.push(pbtn(`data-kinvact="wear" data-ix="${i}"`,g.w?"Tháo":"Đeo",g.w?"thành: cất vào rương":`thành: ${kinvPlain(it.w)}${over?" · kèm: vượt phẩm, dễ bị tố":""}`,""));
 if(it.dr)B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"May áo",`thành: Sắc +${it.dr} trong 3 tháng${over?" · kèm: vượt phẩm, dễ bị tố":""}`,""));
 if(it.use||it.evi||g.k==="botngua")B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"Dùng",g.k==="botngua"?"tốn: 2 khắc · thành: chọn một phi tần, nàng Danh -5 · kèm: bị khám ra là có tội":it.evi?`thành: chọn người, chứng cứ +${it.evi}`:`thành: ${kinvPlain(it.use)}`,g.k==="botngua"?whyTime(2):""));
 if(g.k!=="ngocboi"||g.t)B.push(pbtn(`data-kinvact="gift" data-ix="${i}"`,"Tặng","tốn: 2 khắc · thành: chọn người nhận",whyTime(2)));
 if(it.pr)B.push(pbtn(`data-kinvact="sell" data-ix="${i}"`,"Bán",`thành: Bạc +${Math.floor(it.pr/2)}`,""));
 if(typeof TAINT==="object"&&Object.values(TAINT).some(T=>T.on.includes(g.k))&&!g.t)B.push(pbtn(`data-kinvact="taint" data-ix="${i}"`,"Tẩm","thành: chọn cách tẩm, giữ làm mưu kế · kèm: Đức -3",""));
 if(g.from&&g.from!=="me"&&g.from!=="emp"&&g.from!=="th")B.push(pbtn(`data-kinvact="test" data-ix="${i}"`,"Nghiệm độc","tốn: Bạc 10 · thành: Thái y xem đồ có bị tẩm không",S.bac<10?"thiếu bạc (cần 10)":""));
 const F=[];if(g.n>1)F.push(`Trong rương: ${g.n} món.`);if(g.w)F.push("Ngươi đang mặc.");
 /* origin (kinvFrom) is the "Lai lịch" row of the item detail (KIT §70) */
 kitModal({kind:"info",title:it.n,sub:`${it.kd} · ${KIT_GRADE[x.grade|0].n}`,
  itemPic:kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"lg",qty:g.n,lux:x.lux}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${kitItemRows(g.k,{ownTaint:g.t,worn:g.w,e:S.inv[i]})}</div>${F.length?kitFacts(F):""}${B.length?`<div class="rbtn kinvacts">${B.join("")}</div>`:""}`,btn:"Lui"})}
/* kit panel: `itemPic` = the panel's subject picture is an ITEM (KIT 8: "picture only if it depicts the subject … or a specific item");
   it takes the left subject column, so no info/category art is added; act cards inside the body get the kit act-card frame. */
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){const r=b0.apply(this,arguments);try{const sp=m&&m.kit;{const dl=M.querySelector(".dlg");if(dl)dl.classList.remove("kitslot")}/* the .dlg element is reused: a stale .kitslot from an earlier bag pop-up made the next notice compact */if(!sp||!sp.itemPic)return r;
 const body=M.querySelector("#mb > .kpb");if(!body)return r;const old=body.querySelector(":scope > .kpsubj");if(old)old.remove();
 body.classList.add("kphas");body.classList.remove("kpinfo");body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpitem">${sp.itemPic}</div>`);
 if(sp.kind!=="notice")kitSlotDress(M,body);/* KIT 28.13b/f split (main s14): a NOTICE with an item picture (kitLose "Mất đồ", receive / reward) is a centre display = the item alone, big, frameless (28.13b); info panels (bag item pop-up, slot cards) are the compact card (28.13f) */
 if(typeof kitFix==="function")kitFix(body)}catch(e){console.error("itemPic",e)}return r}})();
/* ---------- KIT 28.13f ITEM / EQUIPMENT-SLOT CARD — compact (owner 11/15 "ĐIỀU · Ô cài tóc" far too big) ----------
   Every item panel (bag tile → kinvOpen / wdOpen / wdFabOpen) and every equipment-slot panel (Bên mình: cài tóc, đeo tay, đeo eo,
   túi thơm, khăn che mặt, y phục → keqPick / wdSlotOpen) is the standard kit dialog box (kit panel width, never taller than the person
   dialog 32.7: min(100dvh − 32 px, 720 px), only the body scrolls), laid out:
   1. TOP ROW: the small item tile (kitItem at the bag-grid tile size, 64 px; empty slot = its faint ghost) LEFT, its kit rows RIGHT
      (Phẩm / Được / Mất / Ghi chú) + the "Đã biết" chip.
   2. The info lines FULL WIDTH under that row (Rương chưa có…, Nhờ thái giám mua đồ…), plain lines without the round fact dots or faces;
      the pick-a-piece row (.keqpick) full width too.
   3. The acts by the option rule (kitOptLayout 32.9): short acts (name + ≤ 1 row) share a 2–3 column grid, an act with two or more rows
      (Cần / Tốn / Được / Kèm, odds) is a full-width row (short cells pack together first: grid-auto-flow dense); every card keeps all its lines, tight (content height, no stretched cells).
   4. No "Lui": the header ✕ (32.10), a tap outside, Esc. */
function kitSlotDress(M,body){const dlg=M.querySelector(".dlg");if(!dlg)return;dlg.classList.add("kitslot");const subj=body.querySelector(":scope > .kpsubj.kpitem"),main=body.querySelector(":scope > .kpmain");if(!subj||!main)return;
 /* KIT 28.13b/f split (main s14): the compact bag / slot card keeps the grade FRAME + ground (kitem-fr switches the frameless big mode off); only the centre notices (kitLose, reward, receive) show the item alone */
 subj.querySelectorAll(".kitem-lg,.kitem-xl").forEach(e=>e.classList.add("kitem-fr"));
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
#modal .dlg.kitslot .kfact>:not(.kft){display:none!important}
#modal .dlg.kitslot .kpmain>p.past{margin:4px 0}
#modal .dlg.kitslot .kinvacts{grid-template-columns:repeat(auto-fill,minmax(min(100%,180px),1fr));grid-auto-flow:row dense;align-items:start;gap:6px;margin-top:8px}
#modal .dlg.kitslot .kinvacts>button{height:auto!important;min-height:0!important;align-self:start}
#modal .dlg.kitslot .kinvacts>button.ksllong{grid-column:1/-1}
/* kv:(min-width:1000px) */#modal .dlg.kitslot .kinvacts{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}
`;document.head.appendChild(st)})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kinvact]");if(!b)return;e.stopPropagation();if(b.disabled)return;
 const a=b.dataset.kinvact,ix=+b.dataset.ix;try{closeModal()}catch(x){}itemAct(a,ix)},true);
/* ---------- KIT 33b kitEquipSlots — "Đang mang": the named EQUIPMENT slots (owner 11/15, RPG-style), under the bag ----------
   kitEquipSlots({key, title, slots:[{k, label, item:{src,name,grade,tip}|null, ghost:src, note}], sum:html, onPick:fn(slot)}) → HTML
   Each slot = kitItem size "slot" (same grade ground + frame as the bag); an EMPTY slot shows its type as a faint silhouette (o.ghost).
   Under each: the slot name + what is in it (or "trống"). The header carries the bonus summary of everything worn. Tap → onPick(slot). */
const KEQ={reg:{}};
function kitEquipSlots(o){o=o||{};const key=o.key||"eq";KEQ.reg[key]=o;const L=o.slots||[];
 const cell=(x,i)=>kitItem(x.item?{src:x.item.src,name:x.item.name,grade:x.item.grade,lux:x.item.lux,sel:x.sel,size:"slot",tip:x.item.tip||x.item.name,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`}
   :{empty:true,size:"slot",ghost:x.ghost,sel:x.sel,tip:`${x.label}: trống`,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`});
 /* col = the VERTICAL "Đang mang" column beside the bag: slot picture + the slot name (small) under it; the item name, chips and note live in the tap panel / tooltip */
 if(o.col)return `<div class="keq keqv" data-keq="${key}"><h4 class="kpst">${o.title||"Bên mình"}</h4><div class="keqs">`+L.map((x,i)=>`<div class="keqc">${cell(x,i)}<b class="keql"${x.lc?` style="color:${x.lc}"`:""}>${x.label}</b>${x.info?`<span class="keqpi">${x.info}</span>`:""}</div>`).join("")+`</div></div>`;
 return `<div class="keq" data-keq="${key}" style="--keqn:${L.length}"><div class="keqh"><h4 class="kpst">${o.title||"Bên mình"}</h4><div class="keqsum">${o.sum||""}</div></div><div class="keqs">`+
  L.map((x,i)=>`<div class="keqc">${kitItem(x.item?{src:x.item.src,name:x.item.name,grade:x.item.grade,lux:x.item.lux,sel:x.sel,size:"slot",tip:x.item.tip||x.item.name,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`}
   :{empty:true,size:"slot",ghost:x.ghost,sel:x.sel,tip:`${x.label}: trống`,data:`data-keqk="${key}" data-keqi="${i}" role="button" tabindex="0"`})}${x.item?`<b class="keqnm" style="color:${KIT_GRADE[x.item.grade|0].c}">${x.item.name}</b>${keqMiniSplit(x.mini)}`:`<b class="keql">${x.label}</b>`}</div>`).join("")+`</div></div>`}
/* ROW ALIGNMENT (owner 15/11 05:45Z OCD rule; review/pets-fix): each slot is 4 fixed rows on a CSS subgrid — picture · name · chips · note line
   (.keql2: "theo hầu · Khỏe", "còn N tháng", ⚠) — so across a row of slots the names, the chip lines and the note lines sit on one line even when
   one slot has a chip and its neighbour has none (was: the followed pet's status line 17 px lower). */
function keqMiniSplit(m){m=m||"";const i=m.indexOf('<span class="keql2">');const chips=i<0?m:m.slice(0,i),note=i<0?"":m.slice(i);
 return `<span class="keqfx">${chips}</span><span class="keqnote">${note}</span>`}
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
/* kv: dropped @media (max-width:899px) (one page = spread page, KIT §0) */
.keq .keqc{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;text-align:center}
.keq .keqc>.kitem-slot{width:min(var(--keqsz,96px),100%)}
@supports (grid-template-rows:subgrid){.keq .keqs{grid-auto-rows:auto;align-items:start}.keq .keqc{display:grid;grid-row:span 4;grid-template-rows:subgrid;row-gap:2px;align-items:start;justify-items:center;align-content:start}
 .keq .keqc>.keqfx:empty,.keq .keqc>.keqnote:empty{min-height:0}.keq .keqc>.keqnm{margin-top:0}}
.keq .keqnote{display:flex;justify-content:center;min-width:0}.keq .keqnote>.keql2{flex-basis:auto}
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
/* vertical wear column + pet strip (review/tutrang-layout) */
.kinvbody{display:block}.kinvbody.kinvws{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:start}.kinvmain{min-width:0}
.keq.keqv{margin:0;padding:6px 4px 6px;width:max(66px,calc(var(--kside,72px) + 14px));box-sizing:border-box;text-align:center}.keq.keqv .kpst{margin:0 0 4px;font-size:.52rem;letter-spacing:0;white-space:nowrap;border:0;padding:0}
.keq.keqv .keqs{display:flex;flex-direction:column;gap:5px}.keq.keqv .keqc{display:flex;flex-direction:column;align-items:center;gap:1px}
.keq.keqv .keqc>.kitem-slot{width:var(--kside,72px)}.keq.keqv .keql{font-size:.58rem;line-height:1.1;color:var(--ink2,#7a6a58);font-weight:600;overflow-wrap:anywhere;max-width:100%}
.keq.keqv+.keq.keqv{margin-top:6px}.keq.keqv .keqpi{display:flex;flex-direction:column;gap:1px;font-size:.56rem;line-height:1.15;color:var(--ink2,#7a6a58);overflow-wrap:anywhere;max-width:100%}
.keq.keqv .keqpi .kchip{font-size:.56rem;padding:0 4px;margin:0;white-space:nowrap}.keq.keqv .keql[style]{font-size:.62rem}
.kinvtight .keq.keqv+.keq.keqv>.kpst,.kinvtight .keq.keqv .keqpi>span:nth-child(n+3){display:none}
.kinvsum{margin:6px 0 0;padding:0 2px}
`;document.head.appendChild(st)})();
/* ---------- new wear slots (owner 11/15): EXTEND j8 IT, no new item list. Only items that have a painting get a slot:
   Đeo eo = ngocboi (ngọc bội ngự ban worn at the waist: shows imperial favour, Danh +1; still a keepsake: never given, never sold),
   Túi thơm = tuithom (worn at the belt: Sắc +1 instead of being used up; a tainted sachet keeps hurting through j8 taintHit as before).
   Hoa tai / Khăn che mặt / Giày hoa: no item painting exists → not added (owner to approve new art first). Old saves: worn hair/wrist keep their slots;
   a sachet or pendant becomes wearable, nothing is auto-worn. wearBonus counts every stat key (it only knew Sắc/Danh). ---------- */
try{if(IT.ngocboi){IT.ngocboi.sl="waist";IT.ngocboi.w={danh:1};IT.ngocboi.d="Đeo eo: Danh +1 · còn giữ: Sủng không dưới 15 · mất là đại họa"}
 if(IT.tuithom){IT.tuithom.sl="scent";IT.tuithom.w={sac:1};delete IT.tuithom.use;IT.tuithom.d="Đeo bên mình: Sắc +1, thơm dịu"}}catch(e){}
/* ---------- per-rank pieces of the promotion set (D45 small-art, review/small-art-wire): same slots as above, one painting per rank.
   Đeo eo ngocboi_r0..r7 (the plain Ngọc bội of a rank, NOT the ngự ban keepsake `ngocboi`), Đeo tay vongngoc_r1..r4 (r0 = vongngoc, r5..r7 = vongvang),
   Túi thơm tuithom_r1..r7 (r0 = tuithom). rk = the rank that receives it, so it is never "vượt phẩm" for the one who is given it. Not in any shop or
   Mệnh truyện pool: they come only through jpromo (BAL.promo.waist / wrist / scent). A sachet can be tainted like tuithom (TAINT lists it). ---------- */
const RANKED_W=[["Ngọc bội trơn",40,1],["Ngọc bội vân như ý",55,1],["Ngọc bội lá sen",70,1],["Ngọc bội hồ điệp",90,2],["Ngọc bội song ngư",110,2],["Ngọc bội phượng bài",140,2],["Ngọc hoàn kết tua",180,3],["Bộ ngọc bội phượng đại lễ",240,3]];
const RANKED_B={1:["Vòng ngọc khảm vàng",60,2,1],2:["Vòng phỉ thúy",75,3,1],3:["Vòng vàng xoắn xâu ngọc",90,3,2],4:["Đôi vòng ngọc khóa phượng vàng",105,4,2]};
const RANKED_S=[null,["Túi thơm hình quả đào",10,1],["Túi thơm hồ lô",14,1],["Túi thơm uyên ương",20,2],["Túi thơm mẫu đơn",28,2],["Túi thơm sen",40,2],["Túi thơm phượng song nang",55,3],["Cầu hương kim ty",75,3]];
try{RANKED_W.forEach(([n,pr,d],r)=>{IT["ngocboi_r"+r]={n,kd:"Trang sức",d:`Đeo eo: Danh +${d}`,pr,rk:r,sl:"waist",w:{danh:d},tg:["rv"]}});
 for(const r in RANKED_B){const [n,pr,s,d]=RANKED_B[r];IT["vongngoc_r"+r]={n,kd:"Trang sức",d:`Đeo tay: Sắc +${s}, Danh +${d}`,pr,rk:+r,sl:"wrist",w:{sac:s,danh:d},tg:["th","hh","rv"]}}
 RANKED_S.forEach((x,r)=>{if(!x)return;const [n,pr,s]=x;IT["tuithom_r"+r]={n,kd:"Hương liệu",d:`Đeo bên mình: Sắc +${s}, thơm dịu`,pr,rk:r,sl:"scent",w:{sac:s},tg:["rv","hh"]};
  if(typeof TAINT==="object"){TAINT.xa.on.push("tuithom_r"+r);TAINT.bua.on.push("tuithom_r"+r)}})}catch(e){console.error("ranked items",e)}
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
 return kitEquipSlots({key:"tutrang",title:"Bên mình",slots,sum,onPick:keqPick,col:true})}
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
   data:`data-kid="${e.k}" data-kix="${i}" data-kidpick="${x.k==="dress"?"use":"wear"}" role="button" tabindex="0"`,tip:`${it.n} · ${fx} · chạm để xem`})});
 kitModal({kind:"info",title:`Ô ${x.label.toLowerCase()}`,sub:"trống",itemPic:kitItem({empty:true,ghost:x.ghost,size:"lg",name:""}).replace('<span class="kitn"></span>',''),
  html:T.length?`<p class="past">Chạm một món để xem rồi ${x.k==="dress"?"may áo mặc":"đeo vào"}.</p><div class="keqpick">${T.join("")}</div>`
   :kitFacts([x.k==="dress"?"Rương chưa có vải để may áo.":`Rương chưa có món nào ${({hair:"cài tóc",wrist:"đeo tay",waist:"đeo eo",scent:"đeo bên mình"})[x.k]} được.`,"Nhờ thái giám mua đồ, hoặc chờ được ban thưởng."]),btn:"Lui"})}
if(typeof invHTML==="function"){const inv0=invHTML;invHTML=function(){let h=inv0.apply(this,arguments);try{
  const i=h.indexOf('<div class="cards">');if(i>=0)h=h.slice(0,i);h=h.replace(/^<div class="ph">[\s\S]*?<\/div>\s*/,"");
  const bag=kitInvGrid({key:"tutrang",tabs:KINV_CATS.map(c=>({k:c[0],label:c[1]})).concat(S.inv.some(e=>!e.h&&IT[e.k]&&kinvCat(IT[e.k].kd)==="tap")?[{k:"tap",label:"Tạp vật"}]:[]),
   items:kinvItems(),minRows:2,onPick:kinvOpen,side:keqTT()+(typeof petSideHTML==="function"?petSideHTML():""),sum:(KEQ.reg.tutrang||{}).sum});
  return kinvSubHTML(h,bag)}catch(e){console.error("kitInvGrid",e);return inv0.apply(this,arguments)}}}
/* ---------- Tư trang SUB-TABS (owner 11/15): the ONE sub-tab control (.ksub > .ksubb, KIT 20 — same as Hậu cung) at the top:
   "Túi đồ" | "Thú cưng" (all her pets as kit cards + care/buy/follow/send back, jpet petPanelHTML; the left-column pet box opens it) | "Việc"; "Túi đồ" (default: the bag grid with its category chips + the "Bên mình" equipment slots, seen without scrolling past any act) ·
   "Việc" (Nhờ thái giám mua đồ, Soát đồ, Sai cung nữ… — the act cards, doable ones first: kitDoableFirst, KIT 37.1).
   The pick is remembered per viewer (hclh-inv-sub); both panes are rendered, the other one is hidden. ---------- */
let KINV_SUB=(()=>{try{return localStorage.getItem("hclh-inv-sub")||"tui"}catch(e){return"tui"}})();
function kinvSubHTML(acts,bag){const pets=typeof petPanelHTML==="function"?petPanelHTML():"";const cur=KINV_SUB==="viec"&&acts.trim()?"viec":KINV_SUB==="thu"&&pets?"thu":"tui";const P=[["tui","Túi đồ"]].concat(pets?[["thu","Thú cưng"]]:[],[["viec","Việc"]]);
 const nav=`<div class="kinvsubw"><nav class="ksub kinvsub" role="tablist">${P.map(([k,l])=>`<button type="button" class="ksubb${k===cur?" on":""}" role="tab" aria-selected="${k===cur}" data-kinvsub="${k}">${l}</button>`).join("")}</nav></div>`;
 return nav+`<div class="kinvpane" data-kinvpane="tui"${cur==="tui"?"":" hidden"}>${bag}</div>${pets?`<div class="kinvpane" data-kinvpane="thu"${cur==="thu"?"":" hidden"}>${pets}</div>`:""}<div class="kinvpane kdoable" data-kinvpane="viec"${cur==="viec"?"":" hidden"}>${acts}</div>`}
function kinvDoable(){try{const pane=document.querySelector('#panel [data-kinvpane="viec"]');if(!pane)return;
 const first=typeof kitDoableFirst==="function"?kitDoableFirst:function(box,sel){const L=[...box.children].filter(c=>!sel||c.matches(sel));if(L.length<2)return;
   const off=e=>e.disabled||e.classList.contains("kdis")||e.getAttribute("aria-disabled")==="true"||(!/^(BUTTON|A)$/.test(e.tagName)&&!!(e.querySelector("button")&&e.querySelector("button").disabled));
   const want=L.filter(e=>!off(e)).concat(L.filter(off));if(want.every((e,i)=>e===L[i]))return;const mk=document.createComment("kd");box.insertBefore(mk,L[0]);want.forEach(e=>box.insertBefore(e,mk));mk.remove()};
 pane.querySelectorAll(".rbtn, .cards, .opts").forEach(b=>first(b,"button"));first(pane,null)}catch(e){console.error("kinvDoable",e)}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kinvsub]");if(!b)return;e.preventDefault();e.stopPropagation();
 KINV_SUB=b.dataset.kinvsub;try{localStorage.setItem("hclh-inv-sub",KINV_SUB)}catch(x){}const P=document.getElementById("panel");if(P)P.scrollTop=0;try{renderPanel()}catch(x){render()}},true);
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{if(tab==="inv")kinvDoable()}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kinvsub-css";st.textContent=`
#panel .kinvpane[hidden]{display:none!important}
#panel .kinvsubw{position:sticky;top:0;z-index:6;background:var(--k-card,#fffaf0);padding-bottom:2px}
#panel .kinvsubw>.ksub.kinvsub{margin:0 0 8px;position:static}
/* kgSub (j79) owns a direct-child .ksub of #panel: ours sits in .kinvsubw so it is not removed */
`;document.head.appendChild(st)})();

/* ================= KIT 28.13d kitShop — THE SHOP (owner 11/15 09:40Z + 10:30Z + 10:45Z markups; shop-fix 11/15: the shop IS the person dialog) =================
   Every buying screen (Nội vụ phủ "Nhờ thái giám mua đồ", later Tư trang buy, gifts) is this one pattern:
   - The card IS the KIT 32.7 person dialog (kitDpApply / kitDpFit, jk4): same size (people + 470 px, height min(100dvh − 32 px, 720 px)),
     same header, the seller full-body in the left column at the kit figure scale, name chip under the feet. No size of its own.
   - RIGHT column (where a person dialog has text + options): info line + "Ta có N bạc", the Mua | Bán tab row, then the tile grid —
     the only thing that scrolls.
   - TILE GRID (KIT 28.13e): every tile has the SAME fixed rows — picture · name (2 lines kept) · use line (2 lines kept) · price · [−] q [+] ·
     button — so pictures, names, use lines, prices, steppers and buttons sit on one line across a row. Buying is ON the tile: "Mua"
     (q = 1) / "Mua · 60 bạc" (q > 1); greyed "Thiếu bạc" / "Hết hàng" / "Rương đầy". q ≤ what she can afford, the stock and the bag
     limit per kind. q > 1 shows as the Tư trang stack badge (kitItem qty "×N") on the picture. Tab Bán = the same ("Bán · N bạc").
   - Tap the picture → the kit item card floats over the dialog (kitItem lg + Tốn/Được + kitItemRows), closed by its ✕ (kit-x).
   - No "Thôi": the dialog closes with the header ✕ (kit-x, KIT 32.10).
     kitShop({key, title, info, stage:[{__fig, __cap, __role, age}], items:[{k, src, name, grade, lux, price, unit, eff, rows, stock, have, onBuy(x,q)}],
              money:()=>n, carry:9, sell:{items, empty}})  */
const KSHOP={reg:{}};
/* the seller on the stage: a pseudo person {__fig, __cap} → kitFigOf / kitName use them as is */
(function(){if(typeof kitFigOf==="function"){const f0=kitFigOf;kitFigOf=function(p){if(p&&p.__fig)return p.__fig;return f0.apply(this,arguments)};window.kitFigOf=kitFigOf}
 if(typeof kitName==="function"){const n0=kitName;kitName=function(p){if(p&&p.__fig)return p.__cap?`<b class="kname"><span class="kti" style="--rt:${kitRtOf(p.__role||"")}">${p.__role||""}</span>${p.__cap}</b>`:"";return n0.apply(this,arguments)};window.kitName=kitName}})();
/* the shop panel: no info / category art (the stage shows the seller); the header ✕ closes it (no "Thôi" row) */
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){const r=b0.apply(this,arguments);try{const dlg=M.querySelector(".dlg");if(!dlg)return r;
 const on=!!(m&&m.kit&&(m.kit.shop||m.kit.pick));dlg.classList.toggle("kshopd",on);if(!on)return r;
 const body=M.querySelector("#mb > .kpb");if(body){body.querySelectorAll(":scope > .kpsubj").forEach(e=>e.remove());body.classList.remove("kphas","kpinfo")}
 if(typeof kitXAdd==="function")kitXAdd(dlg)}catch(e){console.error("kitShop",e)}return r}})();
function kitShopList(o){const L=o.mode==='sell'&&o.sell?(o.sell.items()||[]):(o.items||[]);const ok=L.filter(x=>kitShopMax(o,x)>0),no=L.filter(x=>kitShopMax(o,x)<1);return ok.concat(no)}
function kitShopMax(o,x){if(x.sell)return x.why?0:Math.max(0,x.have?x.have():0);const money=o.money?o.money():0;const carry=(o.carry||9)-(x.have?x.have():0);return Math.max(0,Math.min(Math.floor(money/Math.max(1,x.price)),x.stock==null?99:x.stock,carry))}
function kitShopWhyQ(o,x,q){if(x.sell)return x.why||(q>(x.have?x.have():0)?"Không đủ":"");const money=o.money?o.money():0;if(x.why)return x.why;if((x.have?x.have():0)>=(o.carry||9))return"Rương đã đầy món này";if(x.stock!=null&&q>x.stock)return"Hết hàng";if(q*x.price>money)return"Thiếu bạc";return""}
/* the short word on a tile's button (the full reason is its tooltip) */
function kitShopWhyShort(w){return !w?"":w==="Rương đã đầy món này"?"Rương đầy":w.length>12?"Chưa được":w}
function kitShopQ(o,x){const mx=kitShopMax(o,x);return Math.max(1,Math.min((o.q||{})[x.k]||1,Math.max(1,mx)))}
function kitShopTile(o,x,i){const key=o.key||"shop",u=x.unit||"bạc";const g=KIT_GRADE[Math.max(0,Math.min(4,x.grade|0))]||KIT_GRADE[0];const mx=kitShopMax(o,x),q=kitShopQ(o,x);
 const why=kitShopWhyQ(o,x,q),tot=q*x.price,verb=x.sell?"Bán":"Mua";const lab=why?kitShopWhyShort(why):(q>1?`${verb} · ${tot} ${u}`:verb);
 const A=`data-kshop="${key}" data-kshi="${i}"`;
 return `<div class="kshc${mx<1?" kshno":""}" ${A}>`+
  `<button type="button" class="kshpic" ${A} data-kshdet="1" aria-label="Xem ${x.name}">${kitItem({src:x.src,name:x.name,grade:x.grade,lux:x.lux,qty:q,size:"slot",mark:x.mark,tip:`${x.name} · chạm để xem`})}</button>`+
  `<span class="kshn" style="color:${g.c}" title="${x.name}">${x.name}</span><span class="kshe"${x.eff?` title="${x.eff}"`:""}>${x.eff||""}</span>`+
  `<span class="kshp">${x.sell?"bán ":""}${x.price} ${u}${x.sell&&x.have?` · có ${x.have()}`:""}</span>`+
  `<span class="kshst"><button type="button" class="kbtn alt kshqb" ${A} data-kshq="-" aria-label="Bớt một"${q<=1?" disabled":""}>−</button><b class="kshqn" aria-live="polite">${q}</b>`+
  `<button type="button" class="kbtn alt kshqb" ${A} data-kshq="+" aria-label="Thêm một"${q>=mx?" disabled":""}>+</button></span>`+
  `<button type="button" class="kbtn kshgo" ${A} data-kshbuy="1"${why?` disabled title="${why}"`:""}>${lab}</button></div>`}
/* the kit item card, floating over the dialog (tap a tile picture); ✕ = kit-x */
function kitShopDet(o){const x=(o.list||[]).find(y=>y.k===o.det);if(!x)return"";const key=o.key||"shop",u=x.unit||"bạc";const g=KIT_GRADE[Math.max(0,Math.min(4,x.grade|0))]||KIT_GRADE[0];
 const cost=x.sell?[["Được",`Bạc +${x.price} mỗi món`,"g"]]:[["Tốn",`Bạc −${x.price} mỗi món`,"r"]];
 /* KIT §70: the card body is the shared item detail (picture, name, grade, kind, theme, Được / Mất, Xa xỉ…) under the price row */
 const ref=typeof kitItemRef==="function"&&!x.crafted&&x.rows!==""?kitItemRef({k:x.k}):null;
 if(ref)return `<div class="kshdet" data-kshop="${key}" data-kshdetx="1"><div class="kshdc" role="dialog" aria-label="${x.name}">${kitXHTML(`data-kshop="${key}" data-kshdetx="1"`)}${kitItemDetail(ref,{lead:cost})}</div></div>`;
 return `<div class="kshdet" data-kshop="${key}" data-kshdetx="1"><div class="kshdc" role="dialog" aria-label="${x.name}">${kitXHTML(`data-kshop="${key}" data-kshdetx="1"`)}`+
  `<div class="kshdi">${kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"md",lux:x.lux}).replace('<span class="kitn"></span>','')}`+
  `<div class="kshdt"><b class="kshdn" style="color:${g.c}">${x.name}</b>${x.sub?`<span class="kshds">${x.sub}</span>`:""}</div></div>`+
  `<div class="kinvrows">${kitRowsJoin(kitRows(cost),x.rows||"")}</div></div></div>`}
function kitShopBody(o){const key=o.key||"shop";const money=o.money?o.money():0;o.list=kitShopList(o);o.q=o.q||{};
 const tabs=o.sell?`<div class="pctabs kcattabs kshtabs" role="tablist">${kitTabRowHTML([{k:"buy",label:"Mua"},{k:"sell",label:"Bán"}],o.mode==="sell"?"sell":"buy",`data-kshop="${key}" data-kshtab`)}</div>`:"";
 const empty=o.mode==="sell"&&!o.list.length?`<p class="past kshempty">${(o.sell&&o.sell.empty)||"Chưa có gì để bán."}</p>`:"";
 return `<div class="kshop" data-kshop="${key}"><div class="kshl">${o.info||""}<span class="kshm">Ta có <b>${money}</b> ${o.unit||"bạc"}</span></div>${tabs}`+
  (empty||`<div class="kshg">${o.list.map((x,i)=>kitShopTile(o,x,i)).join("")}</div>`)+(o.det!=null?kitShopDet(o):"")+`</div>`}
function kitShop(o){o=o||{};const key=o.key||"shop";o.q={};o.det=null;o.mode="buy";KSHOP.reg[key]=o;
 return kitModal({kind:"info",title:o.title||"Mua đồ",html:kitShopBody(o),btn:o.btn||"Đóng",shop:key,stage:o.stage,onClose:o.onClose})}
function kitShopRefresh(key){const o=KSHOP.reg[key];if(!o)return;const html=kitShopBody(o);
 const el=document.querySelector(`.kshop[data-kshop="${key}"]`);if(!el)return;const g=el.querySelector(".kshg"),st=g?g.scrollTop:0;el.outerHTML=html;
 const g2=document.querySelector(`.kshop[data-kshop="${key}"] .kshg`);if(g2)g2.scrollTop=st;
 const x=document.querySelector(`.kshop[data-kshop="${key}"] .kshdc .kit-x`);if(x)try{x.focus({preventScroll:true})}catch(e){}}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-kshdetx],[data-kshdet],[data-kshq],[data-kshbuy],[data-kshtab]");if(!t)return;
 const o=KSHOP.reg[t.dataset.kshop];if(!o)return;e.stopPropagation();const key=o.key||"shop";
 if(t.dataset.kshdetx!=null){if(t.classList.contains("kshdet")&&e.target!==t)return;o.det=null;kitShopRefresh(key);return}
 if(t.dataset.kshtab!=null){o.mode=t.dataset.kshtab;o.det=null;o.q={};kitShopRefresh(key);return}
 const x=(o.list||[])[+t.dataset.kshi];if(!x)return;
 if(t.dataset.kshdet!=null){o.det=x.k;kitShopRefresh(key);return}
 if(t.dataset.kshq!=null){const mx=Math.max(1,kitShopMax(o,x)),q=kitShopQ(o,x);o.q[x.k]=t.dataset.kshq==="-"?Math.max(1,q-1):Math.min(mx,q+1);kitShopRefresh(key);return}
 if(t.dataset.kshbuy!=null){const q=kitShopQ(o,x);if(kitShopWhyQ(o,x,q))return;try{x.onBuy&&x.onBuy(x,q)}catch(err){console.error(err)}if(x.stock!=null&&!x.sell)x.stock-=q;o.q[x.k]=1;
  kitShopRefresh(key);try{render()}catch(err){}}},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){for(const k in KSHOP.reg){const o=KSHOP.reg[k];if(o.det!=null&&document.querySelector(`.kshop[data-kshop="${k}"] .kshdet`)){o.det=null;kitShopRefresh(k);e.stopPropagation();e.preventDefault();return}}}},true);
(function(){const st=document.createElement("style");st.id="kshop-css";st.textContent=`
.dlg.kshopd #mr{display:none!important}
.dlg.kshopd.kdper>#mb>.kpb>.kpmain{grid-row:1/-1;min-height:0;display:flex;flex-direction:column;position:static}
.kshop{display:flex;flex-direction:column;gap:8px;min-width:0;min-height:0;flex:1 1 auto}
.kshl{display:flex;flex-direction:column;gap:4px;min-width:0;flex:none}
.kshl p{margin:0;line-height:1.4}
.kshm{font-size:.86rem;color:var(--ink2,#6a5040)}
.kshtabs{margin:0;flex:none}
.kshempty{margin:6px 0;padding:10px;border:1px dashed var(--k-hair,#e6d3ac);border-radius:10px}
/* KIT 28.13e tile grid: equal columns, every tile the same fixed rows → everything on one line across a row */
.kshg{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;display:grid;grid-template-columns:repeat(auto-fill,minmax(var(--kshsz,118px),1fr));
 grid-auto-rows:max-content;align-content:start;gap:10px 6px;padding:8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#f4ead8;box-shadow:inset 0 1px 3px #5a3a2018}
.kshc{--kshl:1.2;display:grid;grid-template-rows:auto calc(2rem * 1.2 * .8) calc(2rem * 1.2 * .72) calc(1rem * 1.3 * .8) 30px 34px;row-gap:4px;
 justify-items:center;align-items:start;min-width:0;text-align:center;border-radius:8px;padding:4px 3px 5px}
.kshpic{all:unset;box-sizing:border-box;display:block;width:100%;max-width:84px;aspect-ratio:1;cursor:zoom-in;border-radius:6px}
.kshpic:focus-visible{box-shadow:0 0 0 2px var(--gold,#c9a46a)}
.kshpic>.kitem-slot{width:100%;height:100%}
.kshc.kshno .kshpic>.kitem-slot{filter:grayscale(.85) brightness(.92);opacity:.7}
.kshn,.kshe{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;line-height:var(--kshl);overflow-wrap:anywhere;width:100%;align-self:start}
.kshn{font-weight:700;font-size:.8rem}
.kshe{font-size:.72rem;color:var(--ink2,#6a5040);align-self:start}
.kshp{font-size:.8rem;line-height:1.3;font-weight:600;color:var(--ink,#3a2418);white-space:nowrap;align-self:end}
.kshst{display:flex;align-items:center;justify-content:center;gap:6px;height:30px;width:100%}
.kshst .kbtn.kshqb{min-height:0;height:30px;width:30px;padding:0;font-size:1rem;line-height:1;flex:none}
.kshqn{min-width:1.8em;text-align:center;font-size:.98rem}
.kshc .kbtn.kshgo{min-height:0;height:34px;width:100%;padding:0 6px;font-size:.8rem;white-space:nowrap;align-self:end}
.kshc .kbtn:disabled{filter:grayscale(1);opacity:.55;cursor:default}
/* pick mode (28.13e, j83 recipes): no stepper row, the picture is not a zoom button */
.kshc.kshpick{grid-template-rows:auto calc(2rem * 1.2 * .8) calc(2rem * 1.2 * .72) calc(1rem * 1.3 * .8) 34px}
.kshc.kshpick>.kshpic{cursor:default}
/* the floating kit item card */
.dlg.kshopd{position:relative}
.kshdet{position:absolute;inset:0;z-index:40;display:grid;place-items:center;padding:16px;background:#2a1a1240;border-radius:inherit}
.kshdc{position:relative;width:min(380px,100%);max-height:100%;overflow:auto;display:flex;flex-direction:column;gap:10px;padding:14px 14px 12px;
 border:1px solid var(--gold,#c9a46a);border-radius:12px;background:var(--k-card,#fffaf0);box-shadow:0 10px 30px #2a1a1250}
.kshdc>.kit-x{position:absolute;top:8px;right:8px}
.kshdi{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:start;padding-right:40px}
.kshdt{display:flex;flex-direction:column;gap:2px;min-width:0}
.kshdn{font-family:var(--display);font-size:1.05rem}
.kshds{font-size:.8rem;color:var(--ink2,#6a5040)}
/* kv:(min-width:1000px) */.kshg{--kshsz:124px}
/* short landscape screens (phone landscape): the seller's line is dropped, "Ta có N bạc" sits left of the tab row, smaller pictures → a whole tile row shows */

`;document.head.appendChild(st)})();
/* Nội vụ phủ: "Nhờ thái giám mua đồ" (j8 PEND.shop items S.shop, price IT[k].pr) through kitShop */
function kitShopEff(k){const it=IT[k];if(!it)return"";if(it.dr)return `may áo: Sắc +${it.dr}, 3 tháng`;
 if(it.sl&&it.w){const v={hair:"cài tóc",wrist:"đeo tay",waist:"đeo eo",scent:"đeo"}[it.sl]||"đeo";return `${v}: ${kinvPlain(it.w)}`}
 if(it.use){const u=kinvPlain(it.use);if(u)return `dùng: ${u}`}if(it.anti)return"giải độc một lần";if(it.ant)return"an thai";if(it.fert)return `${it.fert} tháng dễ thụ thai`;
 if(it.w){const u=kinvPlain(it.w);if(u)return u}if(it.gv)return"đem tặng: hợp ý";return String(it.d||"").split(/[.;]/)[0].slice(0,40)}
/* sell data (coordinator 11/15): the economy worker exposes econSellable(S) / econPrice(item) over j83's handmade works (IT.tp entries {k:"tp",
   wk:{n,kind,ti…}}, wkName, wkSellVal, wkSell) on review/balance-unified. The shop calls THEM when they exist; until they land, kitShopSellable /
   kitShopPrice below do the same from the inventory: each handmade work is its own tile (wk.n, wkSellVal, sold by wkSell = j83's odds), plus
   ordinary items with a price (half price, j8 sellItem). Group shape: {k, key, name, ix:[inventory indexes], n, crafted, src?, sell?:fn}. */
function kitShopSellable(p){const g={};(p.inv||[]).forEach((e,i)=>{if(!e||e.h||e.w)return;
 if(e.wk){const key="wk:"+e.wk.n;(g[key]=g[key]||{k:e.k,key,name:e.wk.n,wk:e.wk,crafted:true,ix:[],n:0}).ix.push(i);g[key].n++;return}
 const it=IT[e.k];if(!it||it.keep||!(it.pr>0))return;const key="it:"+e.k;(g[key]=g[key]||{k:e.k,key,name:it.n,ix:[],n:0}).ix.push(i);g[key].n++});return Object.values(g)}
function kitShopPrice(x){if(x&&x.wk&&typeof wkSellVal==="function")return wkSellVal(x.wk);const it=x&&IT[x.k];return it?Math.floor((it.pr||0)/2):0}
/* review/econ (jecon.js): econSellable(p) → one entry per bag index {ix,k,name,grade,src,price,via:"noivu"|"agent",risk,no}; the Nội vụ phủ tab
   shows the legal ones (via "noivu", 70 % price, no risk) grouped by k+name so equal goods stack; selling one = econSellUI(ix) (her sale),
   else econSell(S,ix). "no" = why it can't be sold now (shown on the greyed button). */
function kitShopSellList(){try{if(typeof econSellable==="function"){const g={};
  for(const x of (econSellable(S)||[])){if(!x||(x.via&&x.via!=="noivu"))continue;const key="e:"+x.k+"|"+(x.name||"");
   const G=g[key]=g[key]||{k:x.k,key,name:x.name,grade:x.grade,src:x.src,price:x.price,no:x.no||"",crafted:x.k==="tp",ix:[],n:0};G.ix.push(x.ix);G.n++}
  return Object.values(g).map(G=>Object.assign(G,{sell:()=>{const ix=G.ix[G.ix.length-1];if(typeof econSellUI==="function")return econSellUI(ix);if(typeof econSell==="function")return econSell(S,ix)}}))}}
 catch(e){console.error("econSellable",e)}return kitShopSellable(S)}
function kitShopSellPrice(x){if(x&&x.price!=null)return x.price;try{if(typeof econPrice==="function"&&x&&x.ix&&x.ix.length){const v=econPrice(S,S.inv[x.ix[0]]);if(v!=null)return v}}catch(e){}return kitShopPrice(x)}
function kitShopSellItems(){return (kitShopSellList()||[]).map(g=>{const k=g.k,it=IT[k]||{n:g.name||k};const a=typeof itemArt==="function"?itemArt(k):null;const nm=g.name||it.n;
 return{k:g.key,sell:true,src:g.src||kitItemSrc(k,""),src512:a&&a.src512||"",name:nm,sub:g.crafted?"Tác phẩm tự tay":`${it.kd||""}${it.kd?" · ":""}${KIT_GRADE[a?a.grade|0:0].n}`,grade:g.grade!=null?g.grade|0:(a?a.grade|0:0),lux:0,price:kitShopSellPrice(g),why:g.no||"",
  eff:g.crafted?"tự tay làm":kitShopEff(k),rows:!g.crafted&&IT[k]?kitItemRows(k):"",have:()=>((kitShopSellList()||[]).find(y=>y.key===g.key)||{n:0}).n,
  onBuy:(x,q)=>{let got=0,n=0;for(let i=0;i<q;i++){const cur=(kitShopSellList()||[]).find(y=>y.key===g.key);if(!cur||!(cur.n>0))break;const b0=S.bac;
    if(typeof cur.sell==="function")cur.sell();else{const ix=cur.ix[cur.ix.length-1];if(cur.wk&&typeof wkSell==="function"){const r=wkSell(S,ix);if(r)log(r)}else sellItem(S,ix)}got+=S.bac-b0;n++}
   if(!g.crafted)log(`Bán ${nm}${n>1?` ×${n}`:""}. Bạc +${got}`)}}})}
function kitShopNvp(){const c=S.court&&S.court.ped;let nm=c&&c.name?c.name:"";
 /* j61 naming: a eunuch she has not learnt the name of shows "<role> ???" (not "Thái giám Nội vụ phủ / thái giám ???") */
 try{if(nm&&c&&typeof k61Named==="function"&&!k61Named(c))nm="???"}catch(e){}
 const items=(S.shop||[]).filter((k,i,a)=>IT[k]&&a.indexOf(k)===i).map(k=>{const it=IT[k];const a=typeof itemArt==="function"?itemArt(k):null;
  return{k,src:kitItemSrc(k,""),src512:a&&a.src512||"",name:it.n,sub:`${it.kd} · ${KIT_GRADE[a?a.grade|0:0].n}`,grade:a?a.grade|0:0,lux:it.sl||it.dr?luxVal(k):0,price:it.pr||0,
   eff:kitShopEff(k),rows:kitItemRows(k),stock:5,have:()=>S.inv.filter(e=>e.k===k&&!e.h).length,
   onBuy:(x,q)=>{apply({bac:-x.price*q});for(let i=0;i<q;i++)S.inv.push({k});log(`Mua ${it.n}${q>1?` ×${q}`:""}. Bạc -${x.price*q}`)}}});
 return kitShop({key:"nvp",title:"Nhờ thái giám mua đồ",carry:9,
  info:(()=>{const xc=(typeof lowRank==="function"?lowRank():S.rank<3)?"tiểu chủ":"nương nương";return `<p>Thái giám Nội vụ phủ bưng vào một khay đồ mua từ ngoài cung, dâng lên cho ta chọn: “Đồ mới mang vào, xin ${xc} xem qua.”</p>`})(),
  stage:[{__fig:"img/fig-eunuch-ndp-tray.webp",__cap:nm,__role:"Thái giám Nội vụ phủ",age:28,sex:"m"}],items,money:()=>S.bac,
  sell:{items:kitShopSellItems,empty:"Chưa có gì để bán. Đồ thêu, tranh, chữ… làm ra khi luyện tài nghệ (mục Tài nghệ); đồ trong rương Tư trang cũng bán được."}})}
if(typeof invAct==="function"){const ia0=invAct;invAct=function(a){if(a==="shop"&&S&&!S.dead&&!Q.length&&typeof kitShop==="function"){try{kitShopNvp();render();return}catch(e){console.error("kitShop",e)}}return ia0.apply(this,arguments)}}
