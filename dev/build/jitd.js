/* ================= jitd — KIT §70 ITEM DETAIL (owner 15/11 "Khi bấm vào món đồ không thấy hiện thông tin món đồ", review/item-info) =================
   ONE shared answer to "tap an item cell → what is this item". Every item cell in the game (Tư trang bag + Bên mình, dress pick, shop, reward box,
   event item tag, Hội phối đồ board, veil picker, other people's worn slots…) shows THIS block; nobody builds their own item card.
   API (all take a ref: "key" | {k} | an S.inv entry | a kitInvGrid tile {g} | {ix: inv index} | {wdSlot:"tram"|"y"} | {e: entry}; + who):
     kitItemRef(ref)               → R {k, e, g, I (kitItemInfo §54.1), wd, it, work, veil, worn, who} — the resolver (null = no such item)
     kitItemDetailRows(ref, o)     → kitRows (KIT §51): Phẩm · Loại · Hợp đề · Được · Mất · Xa xỉ · Lai lịch · Ghi chú (empty rows dropped)
                                     o = {months, dress, pawn, note:[…], lead:[[label,val,cls]…] rows put first (price), noLux}
     kitItemDetail(ref, o)         → HTML block `.kidet`: picture (kitItem, the kit graded frame) · name in the grade colour (the grade chip is ON the
                                     picture frame, kitItem KIT §54.1b) · kind · "Đang mặc" chip · the rows · o.acts (pbtn buttons, any data-* the caller handles). o.size "md"|"lg".
     kitItemCard(ref, o)           → floats the block over the screen (above dialogs and minigames): ✕ (kit-x) / tap outside / Esc close it.
                                     o.acts = [{id, n, sub, why, go()}] → kit buttons; a tap runs go() and closes the card.
     kitItemTap(ref)               → `data-kid… role="button" tabindex="0"` attributes: any tile carrying them opens kitItemCard on tap
                                     (read-only cells: reward box, event tag, other people's slots). Cells with their own picker logic call
                                     kitItemDetail themselves (dress pick strip, Hội phối đồ, veil picker).
   kitItemRows(k, o) (jinv) and wdItemRowsE(e, o) (jwdinv) now return kitItemDetailRows, so every older caller (Tư trang panels, shop card,
   gift picker, slot panels) shows the same rows. Numbers: BAL.itd (jbal2). */
function kidEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function kidIsEntry(r){return !!(r&&typeof r==="object"&&r.k&&(r.from!==undefined||r.w!==undefined||r.wk||r.t!==undefined||r.by!==undefined||r.giver!==undefined||r.src!==undefined||r.h!==undefined))}
function kitItemRef(r){try{if(r==null||r==="")return null;if(r.k!=null&&r.I&&r.kidR)return r;if(typeof r==="string")r={k:r};
 const WD=typeof WD_ITEMS==="object"?WD_ITEMS:{};let k=r.k,e=null,g=r.g||null;const who=r.who||null;const inv=(who&&who.inv)||(typeof S!=="undefined"&&S&&S.inv)||[];
 if(g){k=g.k;try{e=WD[k]&&typeof wdEntryOf==="function"?wdEntryOf(g):(g.i!=null&&g.i>=0?inv[g.i]:null)}catch(x){}if(!e&&g.e)e=g.e}
 else if(r.wdSlot){try{e=wdOf(who||S)[r.wdSlot]}catch(x){}k=e&&e.k}
 else if(r.ix!=null&&r.ix>=0){e=inv[r.ix]||null;k=e&&e.k}
 else if(r.e){e=r.e;k=e.k}
 else if(kidIsEntry(r))e=r;
 if(!k)return null;const it=(typeof IT==="object"&&IT[k])||null;if(!it&&!WD[k])return null;
 const I=typeof kitItemInfo==="function"?kitItemInfo(e||{k}):{k,name:it?it.n:k,src:"",grade:0,gname:"Thường",col:"#9a8a78",sub:""};
 const wd=!!WD[k],work=!!(e&&e.wk),veil=!!(it&&it.vl);
 let worn=false;try{if(wd){const W=wdOf(who||S);worn=!!(g&&g.wdSlot)||!!(e&&(W.tram===e||W.y===e))||!!r.wdSlot}else if(veil){worn=!!(e&&(who||S).vl===e)}else worn=!!(e&&e.w)}catch(x){}
 return{kidR:1,k,e,g,I,wd,it,work,veil,worn,who:who&&who!==S?who:null,qty:(g&&g.n)||r.qty||1}}catch(err){console.error("kitItemRef",err);return null}}
/* kind · slot: "Trâm cài · cài tóc", "Trang sức · đeo tay", "Tác phẩm tự tay · Thêu" */
function kidKind(R){const it=R.it||{};if(R.work){const A=typeof ARTS!=="undefined"?ARTS.find(a=>a.k===R.e.wk.a):null;return"Tác phẩm tự tay"+(A?" · "+A.n:"")}
 if(R.wd){const w=WD_ITEMS[R.k];return w.sl==="tram"?"Trâm cài · cài tóc":"Y phục · mặc"}
 if(R.veil)return(it.kd||"Mạng che mặt")+" · che mặt";
 const sl=it.sl?({hair:"cài tóc",wrist:"đeo tay",waist:"đeo eo",scent:"đeo bên mình"}[it.sl]||""):it.dr?"may áo":"";return(it.kd||"Đồ vật")+(sl?" · "+sl:"")}
/* theme tags (Hội phối đồ đề, jts TS_THEME + any item's own `th` list) */
function kidThemes(k){const L=[];try{if(typeof TS_THEME==="object")for(const t in TS_THEME)if((TS_THEME[t].tags||[]).includes(k))L.push(TS_THEME[t].n)}catch(e){}
 try{const own=(IT[k]&&itm(k).th)||(typeof WD_ITEMS==="object"&&WD_ITEMS[k]&&WD_ITEMS[k].th)||[];for(const t of [].concat(own))if(t&&!L.includes(t))L.push(t)}catch(e){}return L}
/* Xa xỉ: this piece · what she wears now → after wearing it · her rank's allowance (BAL.itd.allow) — wearables of the player only */
function kidLux(R,o){if(R.who||R.work||R.veil)return null;const B=(typeof BAL==="object"&&BAL.itd)||{};let lux=0,cur=0;
 try{if(R.wd){const w=WD_ITEMS[R.k];lux=wdLux(R.k);const c=wdOf(S)[w.sl];cur=c&&WD_ITEMS[c.k]?wdLux(c.k):0}
  else if(R.it&&R.it.sl){lux=luxVal(R.k);const c=(S.inv||[]).find(x=>x&&x.w&&!x.h&&IT[x.k]&&itm(x.k).sl===R.it.sl);cur=c?luxVal(c.k):0}
  else if(R.it&&R.it.dr){lux=luxVal(R.k);return{vals:[`món này ${lux}`],over:false}}
  else return null;
  if(o&&o.luxItem)return{vals:[`món này ${lux}`],over:false};/* a board that is not worn (Hội phối đồ): the piece only, no "Bên mình" change */
  const x=luxOf(S);const after=R.worn?x.sc:x.sc-cur+lux;const over=B.allow!==false&&after>x.bud;
  const V=[`món này ${lux}`,R.worn||after===x.sc?`Bên mình ${x.sc}`:`Bên mình ${x.sc} → ${after}`];if(B.allow!==false)V.push(`hạn mức phẩm ta ${x.bud}`);
  return{vals:V,over}}catch(e){return lux?{vals:[`món này ${lux}`],over:false}:null}}
function kidFrom(R){const e=R.e;if(!e)return"";try{if(R.wd)return typeof wdSrcTxt==="function"?wdSrcTxt(e)||"":"";
  if(R.work){const w=e.wk;return w.bn==="ngươi"||e.by==="me"?"tự tay ta làm":w.bn?"của "+w.bn:""}
  if(R.veil&&typeof vlSrcTxt==="function")return vlSrcTxt(e)||"";
  if(e.by==="me"&&!e.from)return"tự tay ta làm";const f=typeof kinvFrom==="function"?kinvFrom(e.from):"";return f||(e.from==="buy"?"tự mua":"")}catch(x){return""}}
function kidGradeVal(gr,name,extra){return `<span class="ef n" style="color:${gr.c};font-weight:700">${kidEsc(name||gr.n)}</span>${extra?` <span class="ef n">${kidEsc(extra)}</span>`:""}`}
function kitItemDetailRows(ref,o){o=o||{};const R=kitItemRef(ref);if(!R)return"";const I=R.I,KG=KIT_GRADE;let gr=KG[I.grade|0]||KG[0],D=[],M=[],G=[],gx="";
 try{if(R.work){const w=R.e.wk;let gi=I.grade|0;try{if(typeof econWkGrade==="function"){gi=econWkGrade(w);gr=KG[gi]}}catch(x){}gx=w.q!=null?`(${w.q} phần)`:"";
   try{if(BAL.craftGift)D.push(`đem tặng: quý ${BAL.craftGift[gi]}`)}catch(x){}try{if(typeof econPrice==="function")D.push(`Nội vụ phủ mua: Bạc +${econPrice(S,R.e)}`)}catch(x){}
   try{if(typeof wkSellVal==="function")D.push(`bán ra ngoài: Bạc +${wkSellVal(w)}`)}catch(x){}
   const A=typeof ARTS!=="undefined"?ARTS.find(a=>a.k===w.a):null;if(w.raw!=null&&A)G.push(`${w.q} phần: chơi ${w.raw} + ${A.n} bậc ${w.lv}${w.m?" + vật liệu":""}`);
   if(w.d)G.push(w.d);if(w.p!=null)G.push("phải dâng trong tuần này");if(w.show)G.push("đã bày ở yến tiệc")}
  else if(R.wd){const L=wdItemLists(R.e||{k:R.k},{pawn:o.pawn});if(L){gr=L.gr;D=L.D;M=L.M;G=L.G}
   if(R.who){M=M.filter(m=>!/ngươi/.test(m));G=G.filter(g=>!/^(đồ phẩm|chưa rõ phẩm)/.test(g))}}
  else if(R.veil){const e=R.e||{k:R.k};try{const g=typeof vlG==="function"?vlG(e):I.grade;gr=KG[g]||gr;if(typeof VL_COVER!=="undefined")D.push(VL_COVER[g]);
   if(typeof vlKnows==="function")G.push(vlKnows(S,e)?`đồ phẩm ${wdPName(vlP(e,S))}`:"chưa rõ phẩm")}catch(x){}}
  else{const L=kitItemLists(R.k,{ownTaint:R.e&&R.e.t,worn:R.worn,months:o.months,dress:o.dress});if(L){gr=L.gr;D=L.D;M=L.M;G=L.G}
   /* a fabric under the wardrobe rules (jwdinv): it is sewn into a garment of its own */
   const fg=R.it&&R.it.dr&&!o.dress&&typeof wdFabOf==="function"?wdFabOf(R.k):null;if(fg&&WD_ITEMS[fg]){const W=WD_ITEMS[fg];D=D.filter(x=>!/^may áo/.test(x));D.unshift(`may thành ${W.n}: ${plainFx(W.w)||"giản dị"}`);G=G.filter(x=>x!=="áo mặc 3 tháng");G.push(`áo may xong: xa xỉ ${wdLux(fg)}`)}
   if(!D.length&&!M.length&&R.it&&R.it.d)G.unshift(R.it.d)}}catch(err){console.error("kitItemDetailRows",err)}
 if(R.qty>1)G.push(`trong rương: ${R.qty} món`);if(o.note)G.push(...[].concat(o.note).filter(Boolean));
 const T=kidThemes(R.k),X=o.noLux?null:kidLux(R,o),F=kidFrom(R);
 return kitRows((o.lead||[]).concat([["Phẩm",kidGradeVal(gr,R.work&&typeof econWkGrade!=="function"?I.gname:gr.n,gx)],["Loại",kidKind(R),"n"],["Hợp đề",T,"n"],["Được",D,"g"],["Mất",M,"r"],
  ["Xa xỉ",X?X.vals.map((v,i)=>i===1&&X.over?`<span class="ef r">${v}: quá hạn mức</span>`:v):[],"n"],["Lai lịch",F,"n"],["Ghi chú",G,"n"]]))}
/* the block */
function kitItemDetail(ref,o){o=o||{};const R=kitItemRef(ref);if(!R)return"";const I=R.I;const sz=o.size||"md";
 const pic=kitItem({src:sz==="lg"?I.src512||I.src:I.src,name:"",grade:I.grade,gname:I.gname,size:sz,qty:R.qty>1?R.qty:0,tip:I.name}).replace('<span class="kitn"></span>','');
 const kind=kidKind(R);/* the grade = the chip ON the picture frame (kitItem, KIT §54.1b), not a second chip here */
 const acts=(o.acts||[]).map(a=>typeof a==="string"?a:pbtn(`data-kidact="${a.id}"`,a.n,a.sub||"",a.why||"")).join("");
 return `<div class="kidet kidet-${sz}${o.cls?" "+o.cls:""}" data-kidk="${kidEsc(R.k)}"><div class="kidhd"><span class="kidpic">${pic}</span><div class="kidt">`+
  `<b class="kidn" style="color:${I.col}">${kidEsc(I.name)}</b><span class="kidsub"><span class="kidkind">${kidEsc(kind)}</span>${R.worn?(typeof kitChip==="function"?kitChip("Đang mặc","g"):""):""}</span></div></div>`+
  `<div class="kinvrows kidrows">${kitItemDetailRows(R,o)}</div>${acts?`<div class="rbtn kidacts">${acts}</div>`:""}</div>`}
/* the floating card */
const KIDC={card:null};
function kitItemCardClose(){const f=document.getElementById("kidfl");if(f)f.remove();KIDC.card=null}
function kitItemCard(ref,o){o=o||{};const R=kitItemRef(ref);if(!R)return null;kitItemCardClose();const acts=o.acts||[];
 const f=document.createElement("div");f.id="kidfl";f.className="kidfl";
 /* KIT §8.2 T2 (review/kit-sweep, owner 16/11 "kit chung đâu"): the item card is the kit PANEL frame (kpHeader seal ĐIỀU + name + kind,
    kit ✕ in the header) with the item picture LEFT (.kpsubj.kpiart) and its kit rows + acts RIGHT; no private card frame. */
 const I=R.I,acts2=acts.map(a=>typeof a==="string"?a:pbtn(`data-kidact="${a.id}"`,a.n,a.sub||"",a.why||"")).join("");
 const pic=kitItem({src:I.src512||I.src,name:"",grade:I.grade,gname:I.gname,size:"lg",qty:R.qty>1?R.qty:0,tip:I.name}).replace('<span class="kitn"></span>','');
 const worn=R.worn&&typeof kitChip==="function"?kitChip("Đang mặc","g"):"";
 const head=(typeof kpHeader==="function"?kpHeader("info",`<span style="color:${I.col}">${kidEsc(I.name)}</span>`,kidEsc(kidKind(R))):`<div class="kph"><b>${kidEsc(I.name)}</b></div>`).replace(/<\/div>$/,(typeof kitXHTML==="function"?kitXHTML('data-kidx="1"'):'<button type="button" class="kit-x" data-kidx="1" aria-label="Lui">✕</button>')+"</div>");
 f.innerHTML=`<div class="dlg kpanel kidc" data-kind="info" role="dialog" aria-modal="true" aria-label="${kidEsc(I.name)}">${head}<div class="body kidb"><div class="kpb kphas kpinfo kidet" data-kidk="${kidEsc(R.k)}"><div class="kpsubj kpiart kidpic">${pic}</div><div class="kpmain">${worn?`<div class="kpsec">${worn}</div>`:""}<div class="kinvrows kidrows">${kitItemDetailRows(R,o)}</div>${acts2?`<div class="rbtn kidacts">${acts2}</div>`:""}</div></div></div></div>`;
 document.body.appendChild(f);KIDC.card={R,o};try{if(typeof kitFix==="function")kitFix(f)}catch(e){}try{const x=f.querySelector(".kit-x");x&&x.focus({preventScroll:true})}catch(e){}
 try{if(typeof sfx==="function")sfx("tap")}catch(e){}return f}
function kitItemTap(ref){const R=kitItemRef(ref);if(!R)return"";const e=R.e,inv=(typeof S!=="undefined"&&S&&S.inv)||[];const ix=e?inv.indexOf(e):-1;
 return `data-kid="${kidEsc(R.k)}"${ix>=0?` data-kix="${ix}"`:""} role="button" tabindex="0"`}
document.addEventListener("click",ev=>{const t=ev.target;if(!t||!t.closest)return;const f=document.getElementById("kidfl");
 if(f&&f.contains(t)){const b=t.closest("[data-kidact]");if(b&&f.contains(b)){ev.stopPropagation();if(b.disabled)return;const a=KIDC.card&&(KIDC.card.o.acts||[]).find(x=>x.id===b.dataset.kidact);kitItemCardClose();try{a&&a.go&&a.go()}catch(err){console.error(err)}return}
  /* a plain act button of the caller (data-kinvact / data-wd …): its own handler runs; the card (and the panel under it) closes */
  const pb=t.closest(".kidacts button");if(pb&&!pb.disabled){const cm=KIDC.card&&KIDC.card.o.closeModal;kitItemCardClose();if(cm){try{if(typeof Q!=="undefined"&&Q.length)closeModal()}catch(err){}}return}
  if(t.closest("[data-kidx]")||t===f){ev.stopPropagation();kitItemCardClose()}return}
 const c=t.closest("[data-kid]");if(!c)return;ev.stopPropagation();ev.preventDefault();const ix=c.dataset.kix!=null?+c.dataset.kix:-1;
 const e=ix>=0&&typeof S!=="undefined"&&S&&S.inv[ix]&&S.inv[ix].k===c.dataset.kid?S.inv[ix]:null;
 const who=c.dataset.kidwho!=null&&typeof rivals!=="undefined"?rivals.find(r=>String(r.id)===c.dataset.kidwho):null;
 const pick=c.dataset.kidpick;kitItemCard(e?{e}:who&&c.dataset.kidsl?{wdSlot:c.dataset.kidsl,who}:{k:c.dataset.kid,who},pick&&e?{acts:kidPickActs(e,ix,pick),closeModal:true}:{})},true);
/* a pick tile inside a slot panel (Bên mình: "Chạm một món để cài / đeo / may áo") → the card with the ONE act (no blind wear) */
function kidPickActs(e,ix,pick){const W=typeof WD_ITEMS==="object"?WD_ITEMS:{};const it=IT[e.k]||{};
 try{if(W[e.k]){const w=W[e.k];return[pbtn(`data-wd="wear" data-ix="${ix}"`,w.sl==="tram"?"Cài":"Mặc",`tốn: 1 khắc · thành: vào ô ${w.sl==="tram"?"Cài tóc":"Y phục"}, ${plainFx(w.w)||"giản dị"}`,typeof whyTime==="function"?whyTime(1):"")]}
  if(pick==="use"||it.dr){const g=typeof wdFabOf==="function"?wdFabOf(e.k):null;return[pbtn(`data-kinvact="use" data-ix="${ix}"`,"May áo",g&&W[g]?`thành: ${W[g].n} vào ô Y phục, ${plainFx(W[g].w)||"giản dị"} · kèm: áo đang mặc cất vào rương`:`thành: Sắc +${it.dr} trong 3 tháng`,"")]}
  const over=it.rk&&it.rk>S.rank;return[pbtn(`data-kinvact="wear" data-ix="${ix}"`,"Đeo",`thành: ${kinvPlain(it.w)}${over?" · kèm: vượt phẩm, dễ bị tố":""}`,"")]}catch(err){return[]}}
document.addEventListener("keydown",ev=>{const f=document.getElementById("kidfl");if(f&&ev.key==="Escape"){ev.stopPropagation();ev.preventDefault();kitItemCardClose();return}
 if((ev.key==="Enter"||ev.key===" ")&&ev.target&&ev.target.dataset&&ev.target.dataset.kid!=null){ev.preventDefault();ev.target.click()}},true);
/* older row builders → the one block (same rows everywhere) */
if(typeof kitItemRows==="function")kitItemRows=function(k,o){o=o||{};return kitItemDetailRows(o.e?{e:o.e}:{k},o)};
if(typeof wdItemRowsE==="function")wdItemRowsE=function(e,o){return kitItemDetailRows(e&&e.k?{e}:e,o)};
(function(){const st=document.createElement("style");st.id="kid-css";st.textContent=`
.kidet{display:flex;flex-direction:column;gap:6px;min-width:0}
.kidet .kidhd{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;align-items:center}
.kidet .kidpic>.kitem{margin:0}
.kidet .kidt{display:flex;flex-direction:column;gap:3px;min-width:0}
.kidet .kidn{font-family:var(--display);font-size:1.05rem;line-height:1.25;overflow-wrap:anywhere}
.kidet .kidsub{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;font-size:.78rem;color:var(--ink2,#6a5040)}
.kidet .kidsub .kchip{margin:0}
.kidet .kidrows{margin:0}
.kidet .kidacts{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr));gap:6px;margin:2px 0 0}
.kidet .kidacts>button{height:auto!important;min-height:44px;align-self:start}
.kidet.kidet-strip{padding:8px 10px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:var(--k-card,#fffaf0)}
.kidfl{position:fixed;inset:0;z-index:9470;display:grid;place-items:center;padding:16px;background:#2a1a1255}
#kidfl>.dlg.kpanel{width:var(--kpw,min(560px,calc(100vw - 28px)));max-height:var(--kph,calc(100dvh - 32px));display:flex;flex-direction:column;overflow:hidden}
#kidfl>.dlg.kpanel>.kidb{overflow:auto;overscroll-behavior:contain;padding:10px 14px 12px}
.kidc .kidhd,.kshdc .kidet .kidhd{padding-right:40px}
.kmrow[data-kid],.kmsh[data-kid],.kiev [data-kid],[data-kid].kitem{cursor:pointer}

`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§70",title:"kitItemDetail · kitItemCard (chạm món đồ: thông tin món đồ)",
 html:()=>`<div class="kitpg-row" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px">${["tramngoc","vongngoc","luahang","nhansam","thu"].concat(typeof WD_ITEMS==="object"?["y_haiduong","nt_nhuy"]:[]).map(k=>kitItemDetail(k,{cls:"kidet-strip"})).join("")}</div>`+
  `<div class="kitpg-row">${["tramngoc","boodieu","y_saxanh"].map(k=>kitItem(Object.assign(kitItemInfo(k),{name:kitItemInfo(k).name,size:"md",data:kitItemTap(k)}))).join(" ")}</div>`})}catch(e){}
window.kitItemRef=kitItemRef;window.kitItemDetail=kitItemDetail;window.kitItemDetailRows=kitItemDetailRows;window.kitItemCard=kitItemCard;window.kitItemCardClose=kitItemCardClose;window.kitItemTap=kitItemTap;
