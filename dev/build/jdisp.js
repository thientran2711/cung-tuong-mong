/* ================= jdisp: kitDisplayRoom — ĐA BẢO CÁC, the full-screen display room (KIT §89; owner OD 17/11 ~18:30Z (A), ~18:25Z (c)(d), ~18:33Z (3)) =================
   KIT PART ONLY (view + drawer + rail icon). Data = the C-AG display-shelf API (review/display-shelf, jshelf.js): shelfOf(p).g[group], shelfPut(p,ix),
   shelfTake(p,group), shelfWhyNot(p,e), shelfGrp(k), BAL.shelf.groups, luxPiece(k). Until that branch lands on main every call is guarded: no real API ⇒ the rail icon
   stays hidden (no one-way door for the player) and the view only opens in FIXTURE mode (kit page sample, tests): kitDisplayRoomOpen(S,{fixture:true}).
   - Like Dư đồ: fills the area between the top bar (header.hud) and the bottom bar (nav.bar), both stay visible; painted backdrop KDR_BG (ART REQUEST display-backdrop → Foreman C;
     until then the existing kit ground img/kit/bg-default.webp under a warm veil).
   - Layout: html.kv2 (iPad landscape) = 2 columns × 6 shelves, no scroll; otherwise (Fold / phone) = 1 column × 12 shelves, the room scrolls.
   - One shelf = one group label (kit chip) + the item as a CUT-OUT picture standing on the plank (NO item frame); empty shelf = a soft dashed placeholder.
   - Tap a shelf (her room) → a TƯ TRANG DRAWER rises from the bottom: "Đang bày" (the placed piece: tap → kit item card with "Cất xuống") + ONLY the owned items of
     that group in the Tư trang grid (kitItem "slot" on the `.kinvg` tray; Xa xỉ number; red "Vượt phẩm" corner mark when the piece is above her rank — imperial gifts may still be placed).
     Tap an item → the §70.6 inline strip (kinlDetail, under the drawer grid, no pop-up) with the ONE act "Trưng bày" → placed, the drawer closes.
   - Read-only (an NPC's room, opts.p ≠ S): same view, no drawer; a tap on a placed piece = the kit item card, no acts.
   API: kitDisplayRoomOpen(p,{fixture,known}) · kitDisplayRoomClose() · kitDisplayRoomHTML(model) (pure; the kit page sample) · rail id "disp" (kitStageRail, order 40).
   Old saves: nothing stored here. ================================================================================================================ */
(function(){try{
const KDR={fix:null,p:null,ro:false,fixture:false,known:true,drawer:null,raf:0};
const KDR_BG="img/kit/bg-default.webp";
/* THE PAINTED CABINET (owner OD 17/11 ~21:55Z: "cái hình nền này nó có sẵn mấy cái kệ trên nó luôn"): one painted curio cabinet (đa bảo các), 12 compartments, painted by Foreman C.
   land = ONE picture 2 cols x 6 rows (kv2); port = a tall 1 x 12 picture (or stacked segments) that scrolls. Slot = fractions of ITS picture: cx = centre x, fy = the shelf floor line y,
   w x h = the compartment interior; a piece stands on (cx,fy), its group label chip sits at the compartment's top-left. Numbers below are the STUB (even grid) until
   reports/display-bg.md (measured slot points) lands: then paste its slot arrays into KDR_PIC.*.slots / .segs[].slots; nothing else changes. Picture missing on the CDN = the stub look (.kdr-nopic). */
const gridSlots=(cols,rows,m)=>{m=m==null?.035:m;const w=(1-2*m)/cols,h=(1-2*m)/rows,o=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)o.push({cx:m+w*(c+.5),fy:m+h*(r+1)-h*.06,w:w*.92,h:h*.88});return o};
const KDR_PIC={land:{segs:[{src:"img/display/cabinet-land.webp",ar:1.5,slots:gridSlots(2,6)}]},
 port:{segs:[{src:"img/display/cabinet-port.webp",ar:.42,slots:gridSlots(1,12)}]}};
const kv2=()=>document.documentElement.classList.contains("kv2");
const GFIX=[["cay","Cây cảnh"],["chuong","Chuông gió"],["rem","Rèm, mành"],["phong","Bình phong"],["su","Đồ sứ"],["tranh","Tranh, thư pháp"],["van","Văn phòng tứ bảo"],["nhac","Nhạc khí"],["ngoc","Ngọc khí"],["huong","Lư hương"],["den","Đèn, lồng"],["tham","Thảm, gối tựa"]];
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const real=()=>typeof shelfOf==="function"&&typeof shelfPut==="function"&&typeof shelfTake==="function"&&typeof BAL!=="undefined"&&!!BAL.shelf&&!!BAL.shelf.ui&&Array.isArray(BAL.shelf.groups);/* batch s36a: one switch BAL.shelf.ui (jshelf) opens both entries; 0 = room hidden */
const groups=()=>KDR.fixture||!real()?GFIX:BAL.shelf.groups;
const gName=g=>{const x=groups().find(z=>z[0]===g);return x?x[1]:g};
const rk=()=>{try{return rkOf(S)|0}catch(e){return 0}};
const lux=k=>{try{if(typeof luxPiece==="function")return luxPiece(k)|0}catch(e){}try{return luxVal(k)|0}catch(e){return 0}};
const gradeOf=k=>{try{const a=typeof itemArt==="function"?itemArt(k):null;return a?a.grade|0:0}catch(e){return 0}};
const nameOf=k=>{try{return itm(k).n||k}catch(e){return k}};
const srcOf=k=>{try{return typeof kitItemSrc==="function"?kitItemSrc(k,""):""}catch(e){return""}};
const imperial=e=>!!e&&(e.from==="emp"||e.from==="th"||e.ngu===1);
/* ---------- data layer: real API or fixtures (review/display-shelf-r3: UP TO BAL.shelf.per pieces per group, slots "<g>", "<g>~1".."<g>~(per-1)") ---------- */
const FIXON=()=>KDR.fixture||!real();
const perN=()=>FIXON()?5:Math.max(1,(BAL.shelf.per|0)||1);
const slotsOf=g=>{if(!FIXON()&&typeof shelfSlots==="function")return shelfSlots(g);const L=[g];for(let i=1;i<perN();i++)L.push(g+"~"+i);return L};
const grpOfE=e=>{try{if(FIXON())return e.g;return typeof shelfGrpE==="function"?shelfGrpE(e):shelfGrp(e.k)}catch(x){return null}};
function mkFix(){/* a believable chest: 2 real pieces per group; 5 groups already on the shelf, two of them holding 2-3 pieces; one piece above her rank to show the warning */
 const keys=[];try{for(const k of Object.keys(IT)){if(k&&srcOf(k)&&!/^wd-/.test(k))keys.push(k);if(keys.length>=30)break}}catch(e){}
 const G=GFIX,inv=[],placed={},used={},kg={};
 keys.forEach((k,i)=>{const g=G[i%G.length][0];(kg[g]=kg[g]||[]).push(k);const e={k,g,over:i===3?1:0};if(i===5)e.from="emp";if(i<3)e.set={id:"fx1",name:"Bộ mẫu",full:true};if(i===4)e.set={id:"fx2",name:"Bộ dở",full:false};
  if(i<5||i===15||i===16||i===27){const n=used[g]=(used[g]||0);used[g]++;placed[n?g+"~"+n:g]=e}else inv.push(e)});
 return{inv,placed,kg}}
const fixOf=()=>KDR.fix||(KDR.fix=mkFix());
function placedOf(g){/* [[slot, entry]] of one group in slot order (a piece keeps its spot) */
 if(FIXON()){if(KDR.p!==S&&KDR.p)return[];const F=fixOf();return slotsOf(g).filter(s=>F.placed[s]).map(s=>[s,F.placed[s]])}
 try{const z=shelfOf(KDR.p).g;return slotsOf(g).filter(s=>z[s]).map(s=>[s,z[s]])}catch(e){return[]}}
/* grey SILHOUETTE of an EMPTY slot (owner OD 21:20Z): made in code from the group's existing painted cut-outs (representative piece, varied over the group's pieces), no new art */
function silKeys(g){if(FIXON())return(fixOf().kg||{})[g]||[];try{const I=BAL.shelf.it,o=[];for(const k in I)if(I[k].g===g&&k!=="caykho"&&srcOf(k))o.push(k);return o}catch(e){return[]}}
/* complete SET glow (data: C-AG set builder, shelfView items[i].set {id,name,full}); fixture: e.set */
function setMap(){const m={};if(FIXON()){const F=fixOf();for(const s in F.placed)if(F.placed[s].set)m[s]=F.placed[s].set;return m}
 try{if(typeof shelfView==="function")for(const G of shelfView(KDR.p).groups)for(const it of G.items||[])if(it.set)m[it.slot]=it.set}catch(e){}return m}
/* SET LINES (owner OD 17/11 ~20:47Z: she must see what to collect; random pieces show nothing): data = shelfView(S).sets [{id,on,k,t}] (her own room only); fixture: 4 sample lines */
const SETFIX=[{id:"fx1",on:1,k:"on",t:"Bộ mẫu: đang được tính."},{id:"fx3",on:0,k:"wait",t:"Bộ đủ món: đã đủ món, tuần sau mới được tính."},{id:"fx2",on:0,k:"miss",t:"Bộ dở: còn thiếu chậu lan quý."},{id:"fx4",on:0,k:"bad",t:"Bộ khuyết: cây cảnh héo úa."}];
function setLines(){if(FIXON())return KDR.p&&KDR.p!==S?[]:SETFIX;try{return typeof shelfView==="function"?(shelfView(KDR.p).sets||[]):[]}catch(e){return[]}}
/* kitSetLines(lines): the ONE fact strip of the set lines (display room footer + interim shelfOpen dialog). One row per set: state dot + the line as written by jshelf. k: on = counting now (gold, glows like its pieces), wait = whole, counts next week, miss = pieces still missing, bad = broken. Empty list = "". */
function kitSetLines(L){L=(L||[]).filter(x=>x&&x.t);if(!L.length)return"";const kk=x=>x.k||(x.on?"on":/khuyết/.test(x.t)?"bad":"miss");
 return `<div class="kdr-sets" role="list" aria-label="Các bộ đồ bày">${L.map(x=>{const k=kk(x);return `<div class="kdr-set kdr-s-${k}" role="listitem" data-set="${esc(x.id||"")}"><i class="kdr-sd" aria-hidden="true"></i><span class="kdr-st">${esc(x.t)}</span></div>`}).join("")}</div>`}
function ownedOf(g){/* [{e, ix}] owned pieces of this group, in chest order (her room only) */
 if(FIXON())return fixOf().inv.map((e,ix)=>({e,ix})).filter(x=>x.e.g===g);
 const out=[];(S.inv||[]).forEach((e,ix)=>{try{if(e&&!e.h&&grpOfE(e)===g)out.push({e,ix})}catch(x){}});return out}
const whyNot=e=>{if(FIXON())return"";try{return shelfWhyNot(S,e)||""}catch(x){return""}};
function doPut(ix){if(FIXON()){const F=fixOf(),e=F.inv[ix];if(!e)return{ok:false};const S0=slotsOf(e.g);let s=S0.find(x=>!F.placed[x]);let old=null;if(!s){s=S0[S0.length-1];old=F.placed[s]}
  F.inv.splice(ix,1);if(old)F.inv.push(old);F.placed[s]=e;return{ok:true,g:e.g,n:nameOf(e.k)}}
 return shelfPut(S,ix)}
function doTake(slot){if(FIXON()){const F=fixOf(),e=F.placed[slot];if(!e)return"";delete F.placed[slot];F.inv.push(e);return nameOf(e.k)}
 return shelfTake(S,slot)}
/* a piece as the view needs it */
function pc(e){if(!e)return null;const k=e.k;const over=e.over!=null?!!e.over:(()=>{try{return itm(k).rk>rk()}catch(x){return false}})();
 return{k,e,name:nameOf(k),src:srcOf(k),grade:gradeOf(k),lux:lux(k),over,ngu:imperial(e),wither:!!(e.pc!=null&&typeof BAL!=="undefined"&&BAL.shelf&&BAL.shelf.plant&&(e.pc|0)<BAL.shelf.plant.wither)}}
/* ---------- markup (pure) ---------- */
/* spot x (fraction of the picture) of the i-th of n pieces of a compartment: slot.spots (measured, reports/display-bg.md) or n evenly spaced points across the compartment (stub) */
const spotX=(s,i,n)=>s.spots&&s.spots[i]!=null?s.spots[i]:s.cx-s.w/2+s.w*(i+.5)/n;
function shelfHTML(g,list,o){const ro=!!o.ro,s=o.slot,n=o.per||5;list=list||[];
 const Ps=list.map(([sl,e],i)=>({sl,P:pc(e),i}));const SM=o.sets||{};const full=new Set(list.map(x=>x[0]));
 const lab=`<span class="kdr-lab kchip n">${esc(gName(g))}</span>`;
 const over=!ro&&Ps.some(x=>x.P.over),wi=!ro&&Ps.some(x=>x.P.wither);
 const tags=`${over?`<span class="kdr-tag kchip r">Vượt phẩm</span>`:""}${wi?`<span class="kdr-tag kchip r">Héo</span>`:""}`;
 const si=sl=>{const k=String(sl).split("~");return k.length>1?+k[1]:0};
 const SK=silKeys(g),sil=SK.length?slotsOf(g).map((sl,i)=>full.has(sl)?"":`<img class="kdr-sil" style="left:${((spotX(s,i,n)-(s.cx-s.w/2))/s.w*100).toFixed(2)}%;max-width:${(92/n).toFixed(1)}%" src="${esc(srcOf(SK[i%SK.length]))}" alt="" aria-hidden="true" draggable="false" onerror="this.remove()">`).join(""):"";
 const stand=sil+(Ps.length||sil?"":`<i class="kdr-empty">${ro&&!o.known?"Chưa thấy":"Còn trống"}</i>`)+Ps.map(x=>{const sx=spotX(s,si(x.sl),n),left=((sx-(s.cx-s.w/2))/s.w*100).toFixed(2);return `<img class="kdr-it${x.P.wither?" kdr-wither":""}${SM[x.sl]&&SM[x.sl].full?" kdr-glow":""}" data-kdrp="${esc(x.sl)}" style="left:${left}%;max-width:${(92/n).toFixed(1)}%" src="${esc(x.P.src)}" alt="" draggable="false" onerror="this.style.visibility='hidden'">`}).join("");
 const lbl=`${gName(g)}: ${Ps.length?Ps.map(x=>x.P.name).join(", "):"còn trống"}`;
 const box=`left:${((s.cx-s.w/2)*100).toFixed(3)}%;top:${((s.fy-s.h)*100).toFixed(3)}%;width:${(s.w*100).toFixed(3)}%;height:${(s.h*100).toFixed(3)}%`;
 return `<button type="button" class="kdr-sh${Ps.length?" has":""}" data-kdrg="${esc(g)}" aria-label="${esc(lbl)}" title="${esc(lbl)}" style="${box}">${lab}${tags}${stand}<span class="kdr-plank" aria-hidden="true"></span></button>`}
function kitDisplayRoomHTML(m){m=m||{};const G=m.groups||groups(),ro=!!m.ro;const n=G.reduce((a,x)=>a+((m.placed&&m.placed[x[0]])||[]).length,0);
 const title=m.title||"Đa Bảo Các";const P=(m.land!=null?m.land:kv2())?KDR_PIC.land:KDR_PIC.port;let gi=0;
 const segs=P.segs.map(sg=>`<div class="kdr-seg" style="--ar:${sg.ar}"><img class="kdr-bgi" src="${esc(sg.src)}" alt="" draggable="false" onload="this.parentNode.classList.remove('kdr-nopic')" onerror="this.remove()">`+
  sg.slots.map(sl=>{const x=G[gi++];return x?shelfHTML(x[0],m.placed&&m.placed[x[0]],{ro,known:m.known!==false,slot:sl,per:m.per||5,sets:m.sets||{}}):""}).join("")+`</div>`).join("");
 return `<div class="kdr-hd"><span class="kdr-cart">${esc(title)}</span><span class="kdr-cnt">${ro&&!m.known?"":`Đã bày ${n} món`}</span>${typeof kitXHTML==="function"?kitXHTML('data-kdrx="1"',"Đóng"):'<button type="button" class="kit-x" data-kdrx="1" aria-label="Đóng">✕</button>'}</div>`+
  `<div class="kdr-sc"><div class="kdr-cab">${segs}</div></div>`+(ro?"":kitSetLines(m.setLines))}
function tileHTML(x,g){const P=pc(x.e),why=whyNot(x.e);
 return kitItem({src:P.src,name:P.name,grade:P.grade,lux:P.lux,mark:P.over?["Vượt phẩm","r"]:(P.ngu?["Ngự tứ","n"]:null),size:"slot",tip:`${P.name}${P.over?" · vượt phẩm":""}${why?" · "+why:""}`,
  data:`data-kdrix="${x.ix}" data-kdrk="${esc(P.k)}" role="button" tabindex="0"${why?' aria-disabled="true"':""}`})}
function drawerHTML(g){const cur=placedOf(g),L=ownedOf(g),n=perN();
 const head=`<div class="kdr-dh"><b>${esc(gName(g))}</b><small>${cur.length>=n?`Đã đủ ${n} món, bày thêm thì thay món kém nhất`:"Chọn một món trong tư trang"}</small>${typeof kitXHTML==="function"?kitXHTML('data-kdrdx="1"',"Đóng"):'<button type="button" class="kit-x" data-kdrdx="1">✕</button>'}</div>`;
 const on=cur.length?`<div class="kdr-on"><span class="kdr-onl">Đang bày ${cur.length}/${n}</span>${cur.map(([sl,e])=>{const P=pc(e);return kitItem({src:P.src,name:P.name,grade:P.grade,lux:P.lux,mark:P.over?["Vượt phẩm","r"]:null,size:"slot",tip:P.name,data:`data-kdron="${esc(sl)}" role="button" tabindex="0"`})}).join("")}</div>`:"";
 const tiles=L.map(x=>tileHTML(x,g)).join("");
 const body=L.length?`<div class="kinv kdr-inv" data-min="1"><div class="kinvbody"><div class="kinvmain"><div class="kinvg" data-n="${L.length}">${tiles}</div></div></div></div>`
  :`<p class="kdr-none">Tư trang chưa có món nào thuộc nhóm này.</p>`;
 return head+on+`<div class="kdr-db">${body}</div><div class="kdr-det" id="kdrdet">${typeof kinlDetail==="function"?kinlDetail(null,{key:"kdr"}):""}</div>`}
/* ---------- the view ---------- */
const $k=()=>document.getElementById("kdr");
function box(){/* the area between the top bar and the bottom bar, inside the game frame */
 const gm=document.getElementById("game"),h=gm&&gm.querySelector("header.hud"),b=gm&&gm.querySelector("nav.bar");if(!gm||!h||!b)return null;
 const g=gm.getBoundingClientRect(),a=h.getBoundingClientRect(),c=b.getBoundingClientRect();return{l:g.left,r:innerWidth-g.right,t:Math.round(a.bottom+4),b:Math.round(innerHeight-c.top+4)}}
function place(){const el=$k();if(!el)return;const x=box();if(!x)return;el.style.left=x.l+"px";el.style.right=x.r+"px";el.style.top=x.t+"px";el.style.bottom=x.b+"px"}
function model(){const m={ro:KDR.ro,known:KDR.known,groups:groups(),placed:{},title:KDR.ro&&KDR.p&&KDR.p!==S?`Đa Bảo Các của ${esc((KDR.p&&KDR.p.name)||"")}`:"Đa Bảo Các"};m.per=perN();m.sets=KDR.known?setMap():{};m.setLines=KDR.known&&!KDR.ro?setLines():[];for(const x of m.groups)m.placed[x[0]]=KDR.known?placedOf(x[0]):[];return m}
function paint(){const el=$k();if(!el)return;try{el.classList.toggle("kdr-calm",typeof reducedMotion==="function"&&reducedMotion())}catch(e){}const keep=el.querySelector(".kdr-sc"),st=keep?keep.scrollTop:0;el.innerHTML=kitDisplayRoomHTML(model())+`<div class="kdr-drw" id="kdrdrw" hidden></div>`;
 const s2=el.querySelector(".kdr-sc");if(s2)s2.scrollTop=st;if(KDR.drawer)drawer(KDR.drawer,true);place()}
function kitDisplayRoomOpen(p,o){o=o||{};kitDisplayRoomClose(true);KDR.p=p||S;KDR.ro=!!o.ro||(KDR.p!==S);KDR.fixture=!!o.fixture||!real();KDR.known=o.known!==false;try{if(KDR.ro&&real()&&o.known==null&&typeof shelfView==='function')KDR.known=!!shelfView(KDR.p).known}catch(e){}KDR.drawer=null;
 if(KDR.fixture&&!o.fixture)return null;/* no real API yet: never open for the player with made-up data */
 const el=document.createElement("div");el.id="kdr";el.className="kdr";el.setAttribute("role","dialog");el.setAttribute("aria-label","Đa Bảo Các");el.style.setProperty("--kdr-bg",`url("${KDR_BG}")`);if(KDR.ro)el.dataset.ro="1";
 document.body.appendChild(el);paint();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(e){}return el}
function kitDisplayRoomClose(quiet){const el=$k();if(el)el.remove();KDR.drawer=null;try{if(typeof kitItemCardClose==="function")kitItemCardClose()}catch(e){}if(!quiet)try{if(typeof kitStageRail!=="undefined")kitStageRail.paint()}catch(e){}}
function drawer(g,still){const el=$k();if(!el||KDR.ro)return;const d=el.querySelector("#kdrdrw");if(!d)return;KDR.drawer=g;d.innerHTML=drawerHTML(g);const was=d.hidden;d.hidden=false;
 el.querySelectorAll(".kdr-sh").forEach(b=>b.classList.toggle("sel",b.dataset.kdrg===g));
 try{kitInvFit()}catch(e){}
 const calm=typeof reducedMotion==="function"&&reducedMotion();if(was&&!still&&!calm){d.classList.remove("kdr-up");void d.offsetWidth;d.classList.add("kdr-up")}}
function drawerClose(){const el=$k();KDR.drawer=null;if(!el)return;const d=el.querySelector("#kdrdrw");if(d){d.hidden=true;d.innerHTML=""}el.querySelectorAll(".kdr-sh.sel").forEach(b=>b.classList.remove("sel"))}
/* tap handling */
/* bag-inline-3 F2: a drawer tile / a displayed piece opens the §70.6 strip UNDER the drawer grid (kinlDetail), no floating card; its one act is the strip's button */
function kdrShow(cell,k,act){const el=$k(),host=el&&el.querySelector("#kdrdet");if(!host||typeof kinlDetail!=="function"){kitItemCard({k},{acts:[Object.assign({id:"a"},act)]});return}
 KDR.act=act;host.innerHTML=kinlDetail({k},{key:"kdr",acts:[pbtn(`data-kdract="1"`,act.n,act.sub||"",act.why||"")]});
 el.querySelectorAll(".kdr-db .kitem-sel,.kdr-on .kitem-sel").forEach(b=>b.classList.remove("kitem-sel"));if(cell)cell.classList.add("kitem-sel");
 try{if(typeof kitFix==="function")kitFix(host)}catch(e){}try{host.scrollIntoView({block:"nearest"})}catch(e){}try{if(typeof sfx==="function")sfx("tap")}catch(e){}}
function note(t){try{if(typeof kitLine==="function")kitLine(t)}catch(e){}}
document.addEventListener("click",ev=>{const el=$k();if(!el)return;const t=ev.target;if(!t||!t.closest||!el.contains(t))return;
 if(t.closest("[data-kdrx]")){ev.stopPropagation();ev.preventDefault();kitDisplayRoomClose();return}
 if(t.closest("[data-kdrdx]")){ev.stopPropagation();ev.preventDefault();drawerClose();return}
 const sh=t.closest(".kdr-sh");
 if(sh){ev.stopPropagation();ev.preventDefault();const g=sh.dataset.kdrg;
  if(KDR.ro){const pe=t.closest("[data-kdrp]"),L=placedOf(g),hit=(pe&&L.find(x=>x[0]===pe.dataset.kdrp))||L[0];if(hit)try{kitItemCard({k:hit[1].k})}catch(x){console.error(x)}return}
  drawer(g);return}
 const ab=t.closest("[data-kdract]");
 if(ab){ev.stopPropagation();ev.preventDefault();if(!ab.disabled&&KDR.act)try{KDR.act.go()}catch(x){console.error(x)}return}
 const on=t.closest("[data-kdron]");
 if(on){ev.stopPropagation();ev.preventDefault();const sl=on.dataset.kdron,e=placedOf(KDR.drawer).find(x=>x[0]===sl);if(!e)return;
  kdrShow(on,e[1].k,{n:"Cất xuống",sub:"thành: món về lại tư trang · kèm: chỗ này để trống",go:()=>{const n=doTake(sl);note(n?`Đã cất ${n} xuống.`:"Đã cất xuống.");drawerClose();paint()}});return}
 const tile=t.closest("[data-kdrix]");
 if(tile){ev.stopPropagation();ev.preventDefault();const ix=+tile.dataset.kdrix,g=KDR.drawer;const row=ownedOf(g).find(x=>x.ix===ix);if(!row)return;const why=whyNot(row.e);const P=pc(row.e);
  const sub=`thành: bày lên kệ ${gName(g).toLowerCase()}${placedOf(g).length>=perN()?`, đã đủ ${perN()} món nên món kém nhất về lại tư trang`:""} · kèm: còn bày thì không tặng hay bán được${P.over?" · kèm: vượt phẩm, dễ bị tố":""}`;
  kdrShow(tile,row.e.k,{n:"Trưng bày",sub,why,go:()=>{const R=doPut(ix);if(R&&R.ok){note(`Đã bày ${R.n}.`);drawerClose();paint()}}});return}
},true);
document.addEventListener("keydown",ev=>{const el=$k();if(!el)return;if(ev.key==="Escape"&&!document.getElementById("kidfl")){const m=document.getElementById("modal");if(m&&!m.hidden)return;ev.stopPropagation();if(KDR.drawer)drawerClose();else kitDisplayRoomClose()}},true);
const rp=()=>{cancelAnimationFrame(KDR.raf);KDR.raf=requestAnimationFrame(place)};addEventListener("resize",rp);addEventListener("orientationchange",rp);
/* the room is her room's view: leaving the game (title screen) closes it */
try{const r1=render;render=function(){const r=r1.apply(this,arguments);try{if($k()&&(typeof S==="undefined"||!S||S.dead))kitDisplayRoomClose();else if($k()){place()}}catch(e){}return r};window.render=render}catch(e){}
/* ---------- rail icon (KIT §77): only when the real data API exists ---------- */
try{if(typeof kitStageRail!=="undefined")kitStageRail.add({id:"disp",order:40,icon:"img/kit/ico-room.webp",title:"Đa Bảo Các",when:()=>real()&&!S.dead&&!S.out,onTap:()=>kitDisplayRoomOpen(S)})}catch(e){}
window.kitSetLines=kitSetLines;window.kitDisplayRoomOpen=kitDisplayRoomOpen;window.kitDisplayRoomClose=kitDisplayRoomClose;window.kitDisplayRoomHTML=kitDisplayRoomHTML;
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
.kdr-sc{container-type:size}
.kdr-cab{display:flex;flex-direction:column;align-items:center}
.kdr-seg{position:relative;flex:0 0 auto;width:100cqw;aspect-ratio:var(--ar);background:#ecdcb8}
html.kv2 .kdr-seg{width:min(100cqw,calc(100cqh*var(--ar)));margin:0 auto}
.kdr-bgi{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;pointer-events:none}
.kdr-sh{position:absolute;display:block;min-width:0;min-height:0;margin:0;padding:0;border:0;border-radius:6px;background:none;cursor:pointer;font:inherit;color:inherit}
.kdr-sh:active .kdr-it{transform:translateX(-50%) scale(.97)}
.kdr-sh.sel{box-shadow:0 0 0 2px var(--gold,#b8892b);background:#fff6e330}
.kdr-lab{position:absolute;left:4px;top:3px;z-index:2;max-width:calc(100% - 8px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kdr-tag{position:absolute;right:4px;top:3px;z-index:2}
.kdr-it{position:absolute;left:50%;bottom:0;transform:translateX(-50%);max-height:calc(100% - 26px);max-width:84%;width:auto;height:auto;object-fit:contain;display:block;filter:drop-shadow(0 6px 7px #3a201666) drop-shadow(0 1px 2px #3a20164d);transition:transform .12s}
.kdr-it.kdr-wither{filter:grayscale(.6) sepia(.4) drop-shadow(0 4px 5px #3a201655)}
.kdr-empty{position:absolute;left:50%;bottom:14%;transform:translateX(-50%);white-space:nowrap;padding:3px 12px;border:1px dashed #8a6a3a88;border-radius:8px;font-size:.74rem;font-style:normal;color:#6a4a2a;opacity:.7;background:#fff6e340}
.kdr-sil{position:absolute;bottom:0;transform:translateX(-50%);max-height:calc(100% - 26px);width:auto;height:auto;object-fit:contain;display:block;pointer-events:none;filter:brightness(0) opacity(.2) drop-shadow(0 0 1px #3a201688)}
.kdr-glow{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e)) drop-shadow(0 6px 7px #3a201666);animation:kdrGlow calc(2.4s*var(--pace,1)) ease-in-out infinite}
@keyframes kdrGlow{0%,100%{opacity:1}50%{opacity:.86}}
@media (prefers-reduced-motion:reduce){.kdr-glow{animation:none}}
.kdr-calm .kdr-glow{animation:none}
.kdr-sets{flex:0 0 auto;max-height:min(26%,5.6rem);overflow-y:auto;margin:0 8px 8px;padding:5px 10px;border-radius:8px;background:var(--k-card,#fffaf0);border:1px solid var(--k-hair,#e6d3ac);display:flex;flex-direction:column;gap:3px;-webkit-overflow-scrolling:touch}
.kdr-set{display:flex;align-items:flex-start;gap:8px;font-size:.78rem;line-height:1.3;color:var(--ink,#3a2418)}
.kdr-sd{flex:0 0 9px;width:9px;height:9px;margin-top:.34em;border-radius:50%;background:#a99a7e}
.kdr-s-on .kdr-sd{background:#e0a92a;box-shadow:var(--k-glow,0 0 5px #ffd66e);animation:kdrGlow calc(2.4s*var(--pace,1)) ease-in-out infinite}
.kdr-s-on .kdr-st{font-weight:700}
.kdr-s-wait .kdr-sd{background:#e0a92a;opacity:.55}
.kdr-s-bad .kdr-sd{background:#b5402e}.kdr-s-bad .kdr-st{color:#8a2c1e}
@media (prefers-reduced-motion:reduce){.kdr-s-on .kdr-sd{animation:none}}
.kdr-calm .kdr-s-on .kdr-sd{animation:none}
#modal .kdr-sets{margin:8px 0;max-height:none}
.kdr-plank{display:none}
/* STUB ONLY: while the painted cabinet is not on the CDN yet (img onerror removes it) the compartments show a plain plank so the room stays usable; gone as soon as the picture loads */
.kdr-seg:not(:has(.kdr-bgi)) .kdr-plank{display:block;position:absolute;left:0;right:0;bottom:-6px;height:10px;border-radius:3px;background:linear-gradient(#b98a52,#8c5f33 70%,#6b4524);box-shadow:0 3px 5px #3a201655}
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
.kdr-det{flex:0 0 auto}.kdr-det .kinldet{margin-top:6px}
.kdr-none{margin:10px 4px;font-size:.85rem;opacity:.8}
`;document.head.appendChild(css);
/* ---------- kit page sample ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§89",title:"kitDisplayRoom · Đa Bảo Các (tủ trưng bày + ngăn kéo tư trang)",
 html:()=>{let F=null;try{F=mkFix()}catch(e){}const placed=F?F.placed:{};const m={groups:GFIX,placed,setLines:SETFIX};
  return `<div class="kitpg-row" style="position:relative;height:420px;overflow:hidden"><div class="kdr" style="position:absolute;inset:0;--kdr-bg:url('${KDR_BG}')">${kitDisplayRoomHTML(m)}</div></div>`}})}catch(e){}
}catch(e){console.error("jdisp",e)}})();
