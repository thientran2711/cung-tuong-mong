/* ================= jdisp: kitDisplayRoom — NƠI TRƯNG BÀY, the full-screen display room (KIT §87; owner OD 17/11 ~18:30Z (A), ~18:25Z (c)(d), ~18:33Z (3)) =================
   KIT PART ONLY (view + drawer + rail icon). Data = the C-AG display-shelf API (review/display-shelf, jshelf.js): shelfOf(p).g[group], shelfPut(p,ix),
   shelfTake(p,group), shelfWhyNot(p,e), shelfGrp(k), BAL.shelf.groups, luxPiece(k). Until that branch lands on main every call is guarded: no real API ⇒ the rail icon
   stays hidden (no one-way door for the player) and the view only opens in FIXTURE mode (kit page sample, tests): kitDisplayRoomOpen(S,{fixture:true}).
   - Like Dư đồ: fills the area between the top bar (header.hud) and the bottom bar (nav.bar), both stay visible; painted backdrop KDR_BG (ART REQUEST display-backdrop → Foreman C;
     until then the existing kit ground img/kit/bg-default.webp under a warm veil).
   - Layout: html.kv2 (iPad landscape) = 2 columns × 6 shelves, no scroll; otherwise (Fold / phone) = 1 column × 12 shelves, the room scrolls.
   - One shelf = one group label (kit chip) + the item as a CUT-OUT picture standing on the plank (NO item frame); empty shelf = a soft dashed placeholder.
   - Tap a shelf (her room) → a TƯ TRANG DRAWER rises from the bottom: "Đang bày" (the placed piece: tap → kit item card with "Cất xuống") + ONLY the owned items of
     that group in the Tư trang grid (kitItem "slot" on the `.kinvg` tray; Xa xỉ number; red "Vượt phẩm" corner mark when the piece is above her rank — imperial gifts may still be placed).
     Tap an item → the kit item card (kitItemCard) with the ONE act "Trưng bày" → placed, the card and the drawer close.
   - Read-only (an NPC's room, opts.p ≠ S): same view, no drawer; a tap on a placed piece = the kit item card, no acts.
   API: kitDisplayRoomOpen(p,{fixture,known}) · kitDisplayRoomClose() · kitDisplayRoomHTML(model) (pure; the kit page sample) · rail id "disp" (kitStageRail, order 40).
   Old saves: nothing stored here. ================================================================================================================ */
(function(){try{
const KDR={fix:null,p:null,ro:false,fixture:false,known:true,drawer:null,raf:0};
const KDR_BG="img/kit/bg-default.webp";
const GFIX=[["cay","Cây cảnh"],["chuong","Chuông gió"],["rem","Rèm, mành"],["phong","Bình phong"],["su","Đồ sứ"],["tranh","Tranh, thư pháp"],["van","Văn phòng tứ bảo"],["nhac","Nhạc khí"],["ngoc","Ngọc khí"],["huong","Lư hương"],["den","Đèn, lồng"],["tham","Thảm, gối tựa"]];
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const real=()=>typeof shelfOf==="function"&&typeof shelfPut==="function"&&typeof shelfTake==="function"&&typeof BAL!=="undefined"&&!!BAL.shelf&&Array.isArray(BAL.shelf.groups);
const groups=()=>KDR.fixture||!real()?GFIX:BAL.shelf.groups;
const gName=g=>{const x=groups().find(z=>z[0]===g);return x?x[1]:g};
const rk=()=>{try{return rkOf(S)|0}catch(e){return 0}};
const lux=k=>{try{if(typeof luxPiece==="function")return luxPiece(k)|0}catch(e){}try{return luxVal(k)|0}catch(e){return 0}};
const gradeOf=k=>{try{const a=typeof itemArt==="function"?itemArt(k):null;return a?a.grade|0:0}catch(e){return 0}};
const nameOf=k=>{try{return itm(k).n||k}catch(e){return k}};
const srcOf=k=>{try{return typeof kitItemSrc==="function"?kitItemSrc(k,""):""}catch(e){return""}};
const imperial=e=>!!e&&(e.from==="emp"||e.from==="th"||e.ngu===1);
/* ---------- data layer: real API or fixtures ---------- */
function mkFix(){/* a believable chest: 2 real pieces per group, 5 groups already on the shelf; one piece above her rank to show the warning */
 const keys=[];try{for(const k of Object.keys(IT)){if(k&&srcOf(k)&&!/^wd-/.test(k))keys.push(k);if(keys.length>=26)break}}catch(e){}
 const G=GFIX,inv=[],placed={};
 keys.forEach((k,i)=>{const g=G[i%G.length][0];const e={k,g,over:i===3?1:0};if(i===5)e.from="emp";if(i<5)placed[g]=e;else inv.push(e)});
 return{inv,placed}}
const fixOf=()=>KDR.fix||(KDR.fix=mkFix());
function placedOf(g){if(KDR.fixture||!real()){return KDR.p===S||!KDR.p?fixOf().placed[g]||null:null}
 try{return shelfOf(KDR.p).g[g]||null}catch(e){return null}}
function ownedOf(g){/* [{e, ix}] owned pieces of this group, in chest order (her room only) */
 if(KDR.fixture||!real())return fixOf().inv.map((e,ix)=>({e,ix})).filter(x=>x.e.g===g);
 const out=[];(S.inv||[]).forEach((e,ix)=>{try{if(e&&!e.h&&shelfGrp(e.k)===g)out.push({e,ix})}catch(x){}});return out}
const whyNot=e=>{if(KDR.fixture||!real())return"";try{return shelfWhyNot(S,e)||""}catch(x){return""}};
function doPut(ix){if(KDR.fixture||!real()){const F=fixOf(),e=F.inv[ix];if(!e)return{ok:false};const old=F.placed[e.g];F.inv.splice(ix,1);if(old)F.inv.push(old);F.placed[e.g]=e;return{ok:true,g:e.g,n:nameOf(e.k)}}
 return shelfPut(S,ix)}
function doTake(g){if(KDR.fixture||!real()){const F=fixOf(),e=F.placed[g];if(!e)return"";delete F.placed[g];F.inv.push(e);return nameOf(e.k)}
 return shelfTake(S,g)}
/* a piece as the view needs it */
function pc(e){if(!e)return null;const k=e.k;const over=e.over!=null?!!e.over:(()=>{try{return itm(k).rk>rk()}catch(x){return false}})();
 return{k,e,name:nameOf(k),src:srcOf(k),grade:gradeOf(k),lux:lux(k),over,ngu:imperial(e),wither:!!(e.pc!=null&&typeof BAL!=="undefined"&&BAL.shelf&&BAL.shelf.plant&&(e.pc|0)<BAL.shelf.plant.wither)}}
/* ---------- markup (pure) ---------- */
function shelfHTML(g,e,o){const P=pc(e),ro=!!o.ro;
 const lab=`<span class="kdr-lab kchip n">${esc(gName(g))}</span>`;
 const tags=P&&!ro?`${P.over?`<span class="kdr-tag kchip r">Vượt phẩm</span>`:""}${P.wither?`<span class="kdr-tag kchip r">Héo</span>`:""}`:"";
 const stand=P?`<span class="kdr-stand"><img class="kdr-it${P.wither?" kdr-wither":""}" src="${esc(P.src)}" alt="" draggable="false" onerror="this.style.visibility='hidden'"></span>`:`<span class="kdr-stand"><i class="kdr-empty">${ro&&!o.known?"Chưa thấy":"Còn trống"}</i></span>`;
 const lbl=`${gName(g)}: ${P?P.name:"còn trống"}`;
 return `<button type="button" class="kdr-sh${P?" has":""}" data-kdrg="${esc(g)}" aria-label="${esc(lbl)}" title="${esc(lbl)}">${lab}${tags}${stand}<span class="kdr-plank" aria-hidden="true"></span></button>`}
function kitDisplayRoomHTML(m){m=m||{};const G=m.groups||groups(),ro=!!m.ro;const n=G.filter(x=>m.placed&&m.placed[x[0]]).length;
 const title=m.title||"Nơi trưng bày";
 return `<div class="kdr-hd"><span class="kdr-cart">${esc(title)}</span><span class="kdr-cnt">${ro&&!m.known?"":`Đã bày ${n}/${G.length} món`}</span>${typeof kitXHTML==="function"?kitXHTML('data-kdrx="1"',"Đóng"):'<button type="button" class="kit-x" data-kdrx="1" aria-label="Đóng">✕</button>'}</div>`+
  `<div class="kdr-sc"><div class="kdr-grid" style="--kdr-n:${G.length}">${G.map(x=>shelfHTML(x[0],m.placed&&m.placed[x[0]],{ro,known:m.known!==false})).join("")}</div></div>`}
function tileHTML(x,g){const P=pc(x.e),why=whyNot(x.e);
 return kitItem({src:P.src,name:P.name,grade:P.grade,lux:P.lux,mark:P.over?["Vượt phẩm","r"]:(P.ngu?["Ngự tứ","n"]:null),size:"slot",tip:`${P.name} · xa xỉ ${P.lux}${P.over?" · vượt phẩm":""}${why?" · "+why:""}`,
  data:`data-kdrix="${x.ix}" data-kdrk="${esc(P.k)}" role="button" tabindex="0"${why?' aria-disabled="true"':""}`})}
function drawerHTML(g){const cur=placedOf(g),L=ownedOf(g),P=pc(cur);
 const head=`<div class="kdr-dh"><b>${esc(gName(g))}</b><small>${cur?"Chọn món khác để thay":"Chọn một món trong tư trang"}</small>${typeof kitXHTML==="function"?kitXHTML('data-kdrdx="1"',"Đóng"):'<button type="button" class="kit-x" data-kdrdx="1">✕</button>'}</div>`;
 const on=P?`<div class="kdr-on"><span class="kdr-onl">Đang bày</span>${kitItem({src:P.src,name:P.name,grade:P.grade,lux:P.lux,mark:P.over?["Vượt phẩm","r"]:null,size:"slot",tip:P.name,data:`data-kdron="${esc(g)}" role="button" tabindex="0"`})}<span class="kdr-onn">${esc(P.name)}<small>xa xỉ ${P.lux}</small></span></div>`:"";
 const tiles=L.map(x=>tileHTML(x,g)).join("");
 const body=L.length?`<div class="kinv kdr-inv" data-min="1"><div class="kinvbody"><div class="kinvmain"><div class="kinvg" data-n="${L.length}">${tiles}</div></div></div></div>`
  :`<p class="kdr-none">Tư trang chưa có món nào thuộc nhóm này${typeof kitInvEmpty==="function"?"":"."}</p>`;
 return head+on+`<div class="kdr-db">${body}</div>`}
/* ---------- the view ---------- */
const $k=()=>document.getElementById("kdr");
function box(){/* the area between the top bar and the bottom bar, inside the game frame */
 const gm=document.getElementById("game"),h=gm&&gm.querySelector("header.hud"),b=gm&&gm.querySelector("nav.bar");if(!gm||!h||!b)return null;
 const g=gm.getBoundingClientRect(),a=h.getBoundingClientRect(),c=b.getBoundingClientRect();return{l:g.left,r:innerWidth-g.right,t:Math.round(a.bottom+4),b:Math.round(innerHeight-c.top+4)}}
function place(){const el=$k();if(!el)return;const x=box();if(!x)return;el.style.left=x.l+"px";el.style.right=x.r+"px";el.style.top=x.t+"px";el.style.bottom=x.b+"px"}
function model(){const m={ro:KDR.ro,known:KDR.known,groups:groups(),placed:{},title:KDR.ro&&KDR.p&&KDR.p!==S?`Nơi trưng bày của ${esc((KDR.p&&KDR.p.name)||"")}`:"Nơi trưng bày"};for(const x of m.groups)m.placed[x[0]]=KDR.known?placedOf(x[0]):null;return m}
function paint(){const el=$k();if(!el)return;const keep=el.querySelector(".kdr-sc"),st=keep?keep.scrollTop:0;el.innerHTML=kitDisplayRoomHTML(model())+`<div class="kdr-drw" id="kdrdrw" hidden></div>`;
 const s2=el.querySelector(".kdr-sc");if(s2)s2.scrollTop=st;if(KDR.drawer)drawer(KDR.drawer,true);place()}
function kitDisplayRoomOpen(p,o){o=o||{};kitDisplayRoomClose(true);KDR.p=p||S;KDR.ro=!!o.ro||(KDR.p!==S);KDR.fixture=!!o.fixture||!real();KDR.known=o.known!==false;try{if(KDR.ro&&real()&&o.known==null&&typeof shelfView==='function')KDR.known=!!shelfView(KDR.p).known}catch(e){}KDR.drawer=null;
 if(KDR.fixture&&!o.fixture)return null;/* no real API yet: never open for the player with made-up data */
 const el=document.createElement("div");el.id="kdr";el.className="kdr";el.setAttribute("role","dialog");el.setAttribute("aria-label","Nơi trưng bày");el.style.setProperty("--kdr-bg",`url("${KDR_BG}")`);if(KDR.ro)el.dataset.ro="1";
 document.body.appendChild(el);paint();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(e){}return el}
function kitDisplayRoomClose(quiet){const el=$k();if(el)el.remove();KDR.drawer=null;try{if(typeof kitItemCardClose==="function")kitItemCardClose()}catch(e){}if(!quiet)try{if(typeof kitStageRail!=="undefined")kitStageRail.paint()}catch(e){}}
function drawer(g,still){const el=$k();if(!el||KDR.ro)return;const d=el.querySelector("#kdrdrw");if(!d)return;KDR.drawer=g;d.innerHTML=drawerHTML(g);const was=d.hidden;d.hidden=false;
 el.querySelectorAll(".kdr-sh").forEach(b=>b.classList.toggle("sel",b.dataset.kdrg===g));
 try{kitInvFit()}catch(e){}
 const calm=typeof reducedMotion==="function"&&reducedMotion();if(was&&!still&&!calm){d.classList.remove("kdr-up");void d.offsetWidth;d.classList.add("kdr-up")}}
function drawerClose(){const el=$k();KDR.drawer=null;if(!el)return;const d=el.querySelector("#kdrdrw");if(d){d.hidden=true;d.innerHTML=""}el.querySelectorAll(".kdr-sh.sel").forEach(b=>b.classList.remove("sel"))}
/* tap handling */
function note(t){try{if(typeof kitLine==="function")kitLine(t)}catch(e){}}
document.addEventListener("click",ev=>{const el=$k();if(!el)return;const t=ev.target;if(!t||!t.closest||!el.contains(t))return;
 if(t.closest("[data-kdrx]")){ev.stopPropagation();ev.preventDefault();kitDisplayRoomClose();return}
 if(t.closest("[data-kdrdx]")){ev.stopPropagation();ev.preventDefault();drawerClose();return}
 const sh=t.closest(".kdr-sh");
 if(sh){ev.stopPropagation();ev.preventDefault();const g=sh.dataset.kdrg;
  if(KDR.ro){const e=placedOf(g);if(e)try{kitItemCard({k:e.k})}catch(x){console.error(x)}return}
  drawer(g);return}
 const on=t.closest("[data-kdron]");
 if(on){ev.stopPropagation();ev.preventDefault();const g=on.dataset.kdron,e=placedOf(g);if(!e)return;
  kitItemCard({k:e.k},{acts:[{id:"take",n:"Cất xuống",sub:"thành: món về lại tư trang · kèm: nhóm này để trống",go:()=>{const n=doTake(g);note(n?`Đã cất ${n} xuống.`:"Đã cất xuống.");drawerClose();paint()}}]});return}
 const tile=t.closest("[data-kdrix]");
 if(tile){ev.stopPropagation();ev.preventDefault();const ix=+tile.dataset.kdrix,g=KDR.drawer;const row=ownedOf(g).find(x=>x.ix===ix);if(!row)return;const why=whyNot(row.e);const P=pc(row.e);
  const sub=`thành: bày lên kệ ${gName(g).toLowerCase()}${placedOf(g)?`, món đang bày về lại tư trang`:""} · kèm: còn bày thì không tặng hay bán được${P.over?" · kèm: vượt phẩm, dễ bị tố":""}`;
  kitItemCard({k:row.e.k},{acts:[{id:"put",n:"Trưng bày",sub,why,go:()=>{const R=doPut(ix);if(R&&R.ok){note(`Đã bày ${R.n}.`);drawerClose();paint()}}}]});return}
},true);
document.addEventListener("keydown",ev=>{const el=$k();if(!el)return;if(ev.key==="Escape"&&!document.getElementById("kidfl")){const m=document.getElementById("modal");if(m&&!m.hidden)return;ev.stopPropagation();if(KDR.drawer)drawerClose();else kitDisplayRoomClose()}},true);
const rp=()=>{cancelAnimationFrame(KDR.raf);KDR.raf=requestAnimationFrame(place)};addEventListener("resize",rp);addEventListener("orientationchange",rp);
/* the room is her room's view: leaving the game (title screen) closes it */
try{const r1=render;render=function(){const r=r1.apply(this,arguments);try{if($k()&&(typeof S==="undefined"||!S||S.dead))kitDisplayRoomClose();else if($k()){place()}}catch(e){}return r};window.render=render}catch(e){}
/* ---------- rail icon (KIT §77): only when the real data API exists ---------- */
try{if(typeof kitStageRail!=="undefined")kitStageRail.add({id:"disp",order:40,icon:"img/kit/ico-room.webp",title:"Nơi trưng bày",when:()=>real()&&!S.dead&&!S.out,onTap:()=>kitDisplayRoomOpen(S)})}catch(e){}
window.kitDisplayRoomOpen=kitDisplayRoomOpen;window.kitDisplayRoomClose=kitDisplayRoomClose;window.kitDisplayRoomHTML=kitDisplayRoomHTML;
/* ---------- css ---------- */
const css=document.createElement("style");css.id="kit-disp";css.textContent=`
.kdr{position:fixed;z-index:22;display:flex;flex-direction:column;min-height:0;border-radius:10px;overflow:hidden;background:#f1e4c8 var(--kdr-bg) center/cover;box-shadow:0 2px 10px #0004,inset 0 0 0 1px var(--gold,#b8892b)}
.kdr:before{content:"";position:absolute;inset:0;background:linear-gradient(#fff6e3b0,#ead7b0c8);pointer-events:none}
.kdr>*{position:relative}
.kdr-hd{display:flex;align-items:center;gap:8px;padding:6px 8px;flex:0 0 auto}
.kdr-cart{font:700 1.02rem/1.2 var(--serif,var(--display,inherit));color:var(--ink,#3a2418);padding:3px 12px;border:1px solid var(--gold,#b8892b);border-radius:8px;background:var(--k-card,#fffaf0);box-shadow:inset 0 0 0 2px var(--k-card,#fffaf0),inset 0 0 0 3px var(--k-hair,#e6d3ac)}
.kdr-cnt{flex:1;min-width:0;font-size:.78rem;color:var(--ink,#3a2418);opacity:.8}
.kdr-hd .kit-x{position:static;flex:0 0 auto}
.kdr-sc{flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;padding:0 8px 8px;-webkit-overflow-scrolling:touch}
.kdr-grid{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:132px;gap:6px}
html.kv2 .kdr-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(6,minmax(0,1fr));grid-auto-rows:unset;height:100%}
.kdr-sh{position:relative;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;min-width:0;min-height:0;margin:0;padding:6px 8px 0;border:0;border-radius:8px;background:none;cursor:pointer;font:inherit;color:inherit}
.kdr-sh:active .kdr-stand{transform:scale(.97)}
.kdr-sh.sel .kdr-plank{box-shadow:0 0 0 2px var(--gold,#b8892b),0 3px 6px #0004}
.kdr-lab{position:absolute;left:6px;top:4px;z-index:2;max-width:calc(100% - 12px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kdr-tag{position:absolute;right:6px;top:4px;z-index:2}
.kdr-stand{position:relative;flex:1 1 auto;min-height:0;width:100%;display:flex;align-items:flex-end;justify-content:center;transition:transform .12s}
.kdr-it{position:absolute;left:50%;bottom:-4px;transform:translateX(-50%);height:calc(100% - 22px);max-width:70%;width:auto;object-fit:contain;display:block;filter:drop-shadow(0 6px 7px #3a201666) drop-shadow(0 1px 2px #3a20164d);}
.kdr-it.kdr-wither{filter:grayscale(.6) sepia(.4) drop-shadow(0 4px 5px #3a201655)}
.kdr-empty{align-self:center;margin-bottom:10px;padding:4px 14px;border:1px dashed #8a6a3a88;border-radius:8px;font-size:.74rem;font-style:normal;color:#6a4a2a;opacity:.7}
.kdr-plank{flex:0 0 12px;width:100%;border-radius:3px;background:linear-gradient(#b98a52,#8c5f33 70%,#6b4524);box-shadow:0 3px 5px #3a201655,inset 0 1px 0 #e2bd8a}
.kdr-drw{position:absolute;left:0;right:0;bottom:0;z-index:5;max-height:min(62%,440px);display:flex;flex-direction:column;border-radius:14px 14px 0 0;background:var(--k-card,#fffaf0);border:1px solid var(--gold,#b8892b);border-bottom:0;box-shadow:0 -6px 16px #0005,inset 0 0 0 2px var(--k-card,#fffaf0),inset 0 0 0 3px var(--k-hair,#e6d3ac);padding:8px 10px 10px}
.kdr-drw[hidden]{display:none}
.kdr-drw.kdr-up{animation:kdrUp calc(.28s*var(--pace,1)) ease-out}
@keyframes kdrUp{from{transform:translateY(100%)}to{transform:none}}
.kdr-drw:before{content:"";align-self:center;width:44px;height:4px;border-radius:2px;background:var(--k-hair,#e6d3ac);margin:-2px 0 6px}
.kdr-dh{display:flex;align-items:baseline;gap:8px;padding-right:40px;position:relative;min-height:34px}
.kdr-dh b{font-size:1rem;color:var(--ink,#3a2418)}.kdr-dh small{font-size:.76rem;opacity:.75}
.kdr-dh .kit-x{position:absolute;top:-2px;right:0}
.kdr-on{display:flex;align-items:center;gap:10px;margin:6px 0;padding:6px 8px;border-radius:8px;background:#f4ead8;border:1px solid var(--k-hair,#e6d3ac)}
.kdr-on .kitem-slot{width:56px;flex:0 0 56px}
.kdr-onl{font-size:.7rem;text-transform:uppercase;letter-spacing:.04em;opacity:.7}
.kdr-onn{display:flex;flex-direction:column;font-weight:600}.kdr-onn small{font-weight:400;opacity:.75}
.kdr-db{flex:1 1 auto;min-height:0;overflow-y:auto}
.kdr-inv .kinvg{grid-template-columns:repeat(auto-fill,minmax(68px,1fr))}
.kdr-none{margin:10px 4px;font-size:.85rem;opacity:.8}
`;document.head.appendChild(css);
/* ---------- kit page sample ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§87",title:"kitDisplayRoom · Nơi trưng bày (phòng trưng bày + ngăn kéo tư trang)",
 html:()=>{let F=null;try{F=mkFix()}catch(e){}const placed=F?F.placed:{};const m={groups:GFIX,placed};
  return `<div class="kitpg-row" style="position:relative;height:420px;overflow:hidden"><div class="kdr" style="position:absolute;inset:0;--kdr-bg:url('${KDR_BG}')">${kitDisplayRoomHTML(m)}</div></div>`}})}catch(e){}
}catch(e){console.error("jdisp",e)}})();
