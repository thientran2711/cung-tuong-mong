
/* ================= jgift: TẶNG QUÀ dialog (owner 11/15, review/gift-ui) =================
   One dialog for giving ANY item from the chest (bought items, PEND.giftpick with an item; handmade works, PEND.wkgive):
   · left: the ITEM's own picture in its grade frame (kitItem, j98 itemArt: works use img/item-tp-<kind>-b<tier>) — never an event picture;
   · right: the item panel — name, grade, what it is, who made it / where it came from and when, its effect when given, who it suits best;
   · recipients: the kit sub-tabs Chí tôn / Phi tần / Nam nhân / Cung nhân (count "givable/total", only tabs that have people), givable first,
     each a kit person option (portrait via the j25 face hook, name) with odds · tốn · thành · kèm, or "cần: …" when it cannot be given;
   · ✕ in the title bar closes (no Lui / Thôi row). The result card after giving shows the same item picture.
   Dialogs with no picture of their own no longer fall back to "Triều chính" (jk2b kitEvArt default): an unmapped id uses the act category
   picture of its title (giving → Giao thiệp) and lists itself in window.KIT_PICFALL for the picture audit (dev/tools/pic_usage.js). ===== */
function giftArt(e){try{const a=typeof itemArt==="function"?itemArt(e&&e.wk?e:e&&e.k):null;if(a)return a}catch(x){}return{src:"",src512:"",grade:0,gradeName:"Thường"}}
function giftName(e){if(!e)return"";if(e.wk)return e.wk.n;return IT[e.k]?IT[e.k].n:e.k}
function giftE(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
/* every possible recipient: [group, id, target, label]; groups: ct Chí tôn · pt Phi tần · nn Nam nhân · cn Cung nhân */
function giftPeople(e){const L=[];L.push(["ct","emp","emp","Hoàng thượng"]);if(!S.thDead)L.push(["ct","th","th","Thái hậu"]);
 for(const v of liveRivals(true)){const nm=typeof kitName==="function"?giftPlain(kitName(v)):`${rkName(v)} ${v.name}`;L.push([v.queen?"ct":"pt",String(v.id),v,nm])}
 if(e&&e.wk&&S.maid)L.push(["cn","maid","maid",`${S.maid.name} (cung nữ thân tín)`]);return L}
function giftPlain(h){return String(h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}
/* what giving THIS item to THIS person does: {ok, why, x (kit line), v (value, for sorting)} */
function giftEval(e,t){const pre="Nắm chắc · tốn: 2 khắc";
 if(e.wk){const ev=wkEval(S,e.wk,t);if(!ev.ok)return{ok:false,why:ev.why||"không nhận đồ này",v:-1};const g=typeof wkGainTxt==="function"?wkGainTxt(ev):"";return{ok:true,x:`${pre}${g?" · thành: "+g:""}`,v:ev.v||0}}
 const it=IT[e.k];if(!it)return{ok:false,why:"",v:-1};
 if((t==="emp"||t==="th")&&e.t)return{ok:false,why:"không thể dâng đồ đã tẩm",v:-1};
 const g=giftVal(Object.assign({k:e.k},it),t);
 if(t==="emp")return{ok:true,x:`${pre} · thành: Sủng +${Math.max(1,Math.round(g/2))}`,v:g};
 if(t==="th")return{ok:true,x:`${pre} · thành: Thái hậu quý ngươi +${g}`,v:g};
 let x=`${pre} · thành: nàng quý ngươi +${g+3}${t.queen?` · Hoàng hậu với ngươi +${g}`:""}`;
 if(e.t){const sp=typeof oSee==="function"?oSee(t,true):30;x+=` · kèm: nàng phát hiện đồ có vấn đề (${word(sp)}): nàng nắm 2 chứng cứ, quý ngươi -25`}
 if(it.sl&&it.rk>rkOf(t))x+=" · kèm: vượt phẩm của nàng";return{ok:true,x,v:g}}
/* the right-hand item panel */
function giftInfo(e,best){const a=giftArt(e),R=[];
 if(e.wk){const w=e.wk;const art=typeof ARTS!=="undefined"?(ARTS.find(x=>x.k===w.a)||{}).n:"";
  R.push(["Món",`${art?art+", ":""}${w.q} phần`]);
  R.push(["Người làm",w.bn==="ngươi"?"Tự tay ngươi làm":w.bn]);R.push(["Làm lúc",w.d||"—"]);
  if(w.p!=null)R.push(["Lưu ý",w.p<wk()?"đã nguội, không dâng được nữa":"phải dâng trong tuần này, để lâu thì nguội"]);
  R.push(["Khi tặng","Thành chân tình khi đủ: tự tay làm, đúng ý người nhận, đủ thân, không ngay sau khi nhờ việc; mỗi người ghi rõ đủ hay thiếu gì"])}
 else{const it=IT[e.k]||{};if(it.d)R.push(["Dùng",it.d]);const fr=typeof kinvFrom==="function"?kinvFrom(e.from):"";R.push(["Nguồn",fr||"Đồ của ngươi"]);
  if(e.t&&typeof TAINT==="object"&&TAINT[e.t])R.push(["Đã tẩm",TAINT[e.t].n]);R.push(["Khi tặng","Món hợp người nhận thì được nhiều hơn; đồ mua bằng bạc không thành chân tình"])}
 if(best)R.push(["Hợp nhất",best]);
 /* reviewer r6 (LUẬT KIT TRƯỚC): the kit item-card head (.kshdt name in its grade colour + kind · grade, as the shop card 28.13d) and kit rows
    (kitRows in .kinvrows), no private chip / row styles */
 const g=(typeof KIT_GRADE!=="undefined"&&KIT_GRADE[Math.max(0,Math.min(4,a.grade|0))])||{};const sub=[e.wk?(WK[e.wk.kind]?WK[e.wk.kind].n:"Tác phẩm"):(IT[e.k]||{}).kd||"Vật phẩm",e.wk?WTIER[e.wk.ti]:a.gradeName].filter(Boolean).join(" · ");
 return `<div class="kshdt kgift"><b class="kshdn"${g.c?` style="color:${g.c}"`:""}>${giftE(giftName(e))}</b><span class="kshds">${giftE(sub)}</span></div>`+
  `<div class="kinvrows">${kitRows(R.map(([k,v])=>[k,giftE(v)]))}</div>`}
const GIFT_TABS=[["ct","Chí tôn"],["pt","Phi tần"],["nn","Nam nhân"],["cn","Cung nhân"]];
function giftDialog(ix){const e=S.inv[ix];if(!e||e.h)return null;const P=giftPeople(e).map(([g,id,t,lab])=>Object.assign({g,id,t,lab},giftEval(e,t)));
 P.sort((a,b)=>(b.ok-a.ok)||(b.v-a.v));const bestP=P.find(p=>p.ok);const best=bestP?`${bestP.lab}`:"";
 const O=P.map(p=>({n:p.lab,kgt:p.t,fx:{},kgift:p.ok?p.x:"",kgwhy:p.ok?"":(p.why||"không nhận đồ này"),kgg:p.g,lock:!p.ok,
  go:()=>{if(!p.ok)return;spend(2);const t=p.t;const i=S.inv.indexOf(e);window.__kitLastEvArt={src:giftArt(e).src,lab:giftName(e)};log(giveTo(S,t,i))}}));
 O.push({n:"Thôi",fx:{},kgx:1});
 return{t:giftInfo(e,best),o:O}}
(function(){const g0=PEND.giftpick;PEND.giftpick=function(p){if(p&&p.ix!=null&&p.v==null&&S.inv[p.ix]){const d=giftDialog(p.ix);if(d)return d}return g0.apply(this,arguments)}})();
(function(){if(!PEND.wkgive)return;const w0=PEND.wkgive;PEND.wkgive=function(p){if(p&&p.ix!=null&&S.inv[p.ix]&&S.inv[p.ix].wk){const d=giftDialog(p.ix);
  /* keep the poisoned-dish options of j83 */try{const o=w0.apply(this,arguments);if(d&&o&&o.o)o.o.filter(x=>/Hạc đỉnh hồng/.test(x.n)).forEach(x=>d.o.splice(d.o.length-1,0,Object.assign(x,{kgg:"pt"})))}catch(x){}
  if(d)return d}return w0.apply(this,arguments)}})();
/* the option line: kit parse of our own line, or "cần: reason" */
(function(){const d0=dilLine;dilLine=function(c){if(c&&c.kgift)return kitParse(c.kgift);if(c&&c.kgwhy)return `<span class="kwhy">${giftE(c.kgwhy)}</span>`;return d0.apply(this,arguments)}})();
/* which queue items are the gift dialog: pid giftpick / wkgive with an item index and no fixed person */
function giftIxOf(m){try{if(!m||!(m.pid==='giftpick'||m.pid==='wkgive'))return null;const pp=m.pp||{};if(pp.ix==null||pp.v!=null)return null;return S.inv[pp.ix]?pp.ix:null}catch(e){return null}}
/* after the dialog is drawn: item picture left, tabs over the options, locked rows, ✕ instead of Thôi */
let GIFT_TAB=null;
function giftDecorate(){const M=$("modal");const m=Q[0];const gix=giftIxOf(m);if(gix==null||!M||M.hidden)return;const e=S.inv[gix];if(!e)return;
 const dlg=M.querySelector(".dlg");dlg.classList.add("kgiftdlg");const body=M.querySelector("#mb > .kpb")||M.querySelector("#mb");
 /* 1. the item picture replaces any event picture */
 const a=giftArt(e);const have=body.querySelector(":scope > .kgiftpic");body.querySelectorAll(":scope > .kpsubj:not(.kgiftpic)").forEach(x=>x.remove());
 const pic=typeof kitItem==="function"?kitItem({src:a.src||a.src512,name:"",grade:a.grade,size:"lg"}).replace('<span class="kitn"></span>',''):`<img src="${a.src}" alt="">`;
 body.classList.add("kphas");body.classList.remove("kpinfo");if(!have||have.dataset.src!==a.src){if(have)have.remove();body.insertAdjacentHTML("afterbegin",`<div class="kpsubj kpitem kgiftpic" data-src="${a.src}">${pic}</div>`)}
 window.__kitLastEvArt={src:a.src,lab:giftName(e)};
 /* 2. options: group, lock, hide Thôi */
 const B=[...M.querySelectorAll(".opt[data-m]")];const cnt={};let back=null;
 B.forEach(b=>{const o=m.opts[+b.dataset.m];if(!o)return;if(o.kgx){back=b;b.hidden=true;b.classList.add("kgiftback");return}b.dataset.kgg=o.kgg||"pt";
  /* the person's kit portrait (Hậu cung source; silhouette while unmet) — the j25 hook only finds faces by visible name */
  /* review/pcard-actrow (owner 16/11): the row's LEFT picture (KIT §6.2) is the person's own kit portrait — never the generic scene picture + a silhouette
     chip (kitOptPic cannot find a masked "Phi ???" by name). A stranger's portrait is already the kit silhouette (pv). */
  if(o.kgt){try{const t=o.kgt;const f=t==="emp"?pEmp():t==="th"?pTH():t==="maid"?kitFace(S.maid):pv(t);if(f&&f.src&&typeof kitArtFrame==="function"){let art=b.querySelector(":scope > .kaart");
    if(!art&&typeof kpOptArt==="function"){kpOptArt(b);art=b.querySelector(":scope > .kaart")}
    if(art){art.innerHTML=kitArtFrame(f.src,"","kopic kopface","");art.dataset.kzoom=f.src;b.dataset.kopic="face:gift";b.querySelectorAll(":scope > .md").forEach(x=>x.remove())}
    else if(!b.querySelector(".md"))b.insertAdjacentHTML("afterbegin",mdH(f,"xs"))}
   else if(f&&!b.querySelector(".md"))b.insertAdjacentHTML("afterbegin",mdH(f,"xs"))}catch(x){}}
  if(o.lock){b.disabled=true;b.classList.add("kgiftno")}const c=cnt[b.dataset.kgg]||(cnt[b.dataset.kgg]=[0,0]);c[1]++;if(!o.lock)c[0]++});
 const box=M.querySelector(".opts");if(box&&!M.querySelector(".kgifttabs")){const tabs=GIFT_TABS.filter(([k])=>cnt[k]);
  if(!tabs.some(([k])=>k===GIFT_TAB))GIFT_TAB=(tabs.find(([k])=>cnt[k][0])||tabs[0]||[])[0];
  if(typeof kitTabRowHTML==="function"&&tabs.length>1)box.insertAdjacentHTML("beforebegin",`<div class="pctabs kcattabs kgifttabs" role="tablist">${kitTabRowHTML(tabs.map(([k,l])=>({k,label:l,n:`${cnt[k][0]}/${cnt[k][1]}`,tip:`tặng được ${cnt[k][0]} trên ${cnt[k][1]} người`})),GIFT_TAB,"data-kgtab")}</div>`);
  }
 /* the sub-tab filter runs on EVERY draw (a re-layout of the options — jopic / kitDlgFit — made new buttons that never got filtered: Chí tôn showed the whole harem) */
 if(M.querySelector(".kgifttabs"))giftFilter(M);
 /* 3. close: the kit ✕ (32.10, kitCancelIx turns the "Thôi" option into kit-x) — no private ✕ (reviewer r6: there were two) */}
function giftFilter(M){M.querySelectorAll(".opt[data-kgg]").forEach(b=>{b.hidden=GIFT_TAB&&M.querySelector(".kgifttabs")?b.dataset.kgg!==GIFT_TAB&&b.dataset.kgg!=="all":false})}
document.addEventListener("click",ev=>{const t=ev.target.closest&&ev.target.closest("[data-kgtab]");if(!t)return;ev.stopPropagation();ev.preventDefault();GIFT_TAB=t.dataset.kgtab;
 const M=$("modal");M.querySelectorAll("[data-kgtab]").forEach(b=>{const on=b.dataset.kgtab===GIFT_TAB;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});giftFilter(M)},true);
(function(){const s0=showModal;showModal=function(){try{if(giftIxOf(Q[0])!=null||(Q[0]&&Q[0].pid==="giftto"))Q[0].showOut=true}catch(e){}const r=s0.apply(this,arguments);try{giftDecorate()}catch(e){console.error("gift",e)}return r}})();
/* the chest's "Tặng" and the works' "Dâng, tặng": same dialog, titled for what it is */
(function(){const i0=itemAct;itemAct=function(a,ix){if(a==="gift"&&S.inv[ix]&&!S.dead&&!Q.length){if(!can(2))return;GIFT_TAB=null;pushDil(mkP("giftpick",{ix}),"Tặng quà");render();return}return i0.apply(this,arguments)}})();
/* ---------- no "Triều chính" fallback: an id without its own picture uses its title's act category, and is listed for the audit ---------- */
window.KIT_PICFALL=window.KIT_PICFALL||{};
(function(){if(typeof kitEvArt!=="function")return;const k0=kitEvArt;kitEvArt=function(m){if(giftIxOf(m)!=null)return null;const r=k0.apply(this,arguments);try{
  if(!r||!m||m.art||m.stArt)return r;const pp=m.pp||{};const id=m.evId||(m.pid?(m.pid+(pp&&(pp.id||pp.k)?":"+(pp.id||pp.k):"")):"")||(m.kind==="news"||/Tin trong cung/.test(m.t||"")?"news:"+(m.t||""):"");
  const mapped=id&&typeof evArtCat==="function"&&evArtCat(id);if(mapped)return r;
  /* the event's own key without its module prefix (j71f:doanngo → doanngo / fest:doanngo): festivals, invitations… */
  const salt=(typeof S!=="undefined"&&S)?(S.year*100+S.month*3+(S.tuan||0)):0;
  for(const k of [pp.k,pp.id,pp.kind].filter(x=>typeof x==="string"&&x)){for(const kk of [k,"fest:"+k]){const c=evArtCat(kk);if(c){KIT_PICFALL["~"+id]=kk;return{src:evArtOf(kk,salt),lab:typeof evArtTitle==="function"?evArtTitle(kk):""}}}}
  const key=id||"title:"+giftPlain(m.t||"");KIT_PICFALL[key]=(KIT_PICFALL[key]||0)+1;
  /* review/act-pics gives such dialogs the room she is in; keep that. Only the old j89 default (Triều chính) is replaced, by the act category of the title */
  if(!/ev-trieu-chinh/.test(r.src||""))return r;
  const t=giftPlain(m.t||"")+" "+giftPlain(m.h||"").slice(0,80);const a=typeof kitActArt==="function"?kitActArt(t):null;
  return a&&a.src?{src:a.src,lab:a.label||""}:null}catch(e){return r}}})();
(function(){const st=document.createElement("style");st.id="kgift-css";st.textContent=`
.kgiftdlg{position:relative}
.kgiftdlg .kgifttabs{margin:6px 0 4px}
.kgiftdlg .opt.kgiftno{opacity:.62}
/* must out-rank the §6.2 option-card display rule (kitCompactCSS, button.ka.kart.kopt): a hidden row of another sub-tab stayed visible once it had its picture */
html body #modal .kgiftdlg .opt[hidden],html body #modal .kgiftdlg .opt.kgiftback{display:none!important}
.kgiftpic .kitem{width:100%;max-width:220px;margin:0 auto}
`;document.head.appendChild(st)})();
/* ---------- the item someone else wears / holds (person card slots, K1): the kit ITEM dialog, not an info picture ----------
   item picture in its grade frame, name + grade, the owner (small portrait + name), the item's kit rows, ✕ close (no "Đã hiểu"). */
function kitOtherItem(v,x,sl){try{/* KIT §70: the shared item detail card (who = the wearer; Lai lịch = who gave it) */
 if(typeof kitItemCard==="function"&&kitItemCard({wdSlot:sl,who:v},{note:[`${sl==="tram"?"cài":"mặc"} trên người ${v.name}`,x.label?`ta đã biết: ${x.label}`:"đúng phẩm hay không: chưa rõ",
  "hặc ăn mặc sai phẩm: thẻ người của nàng ta, nhóm Hại nặng"]}))return;const W=typeof WD_ITEMS==="object"&&WD_ITEMS[x.k];const g=x.grade|0,gr=KIT_GRADE[g]||KIT_GRADE[0];
 const src=typeof kitItemSrc==="function"?kitItemSrc(x.k,x.icon):(x.icon||"");
 let rows="";try{rows=W&&typeof wdItemRowsE==="function"?wdItemRowsE({k:x.k},{}):typeof kitItemRows==="function"?kitItemRows(x.k,{}):""}catch(e){rows=""}
 const own=`<div class="kgiftown">${typeof mdH==="function"?mdH(pv(v),"sm"):""}<span>Đang mặc: ${typeof kitName==="function"?kitName(v):giftE(v.name)}</span></div>`;
 const F=[x.label?`Ngươi đã biết: ${x.label}.`:"Đúng phẩm hay không: chưa rõ (chưa ai nhận xét).",x.giver?`${x.giver} ban.`:"","Hặc ăn mặc sai phẩm: thẻ người của nàng, nhóm Hại nặng."].filter(Boolean);
 kitModal({kind:"info",title:x.name,sub:`${sl==="tram"?"Trâm cài":"Y phục"} · ${gr.n}`,kx:1,
  itemPic:kitItem({src,name:"",grade:g,size:"lg"}).replace('<span class="kitn"></span>',''),
  html:`${own}${rows?`<div class="kinvrows">${rows}</div>`:""}${kitFacts(F)}`,btn:"Lui"})}catch(e){console.error("kitOtherItem",e)}}
addEventListener("click",ev=>{const t=ev.target.closest&&ev.target.closest("[data-kwear]");if(!t||t.dataset.kwho==="me")return;
 const v=(typeof rivals!=="undefined"&&rivals.find(r=>String(r.id)===t.dataset.kwho))||null;if(!v||typeof wdSlots!=="function")return;const x=wdSlots(v).find(s=>s.slot===t.dataset.kwear);if(!x||x.empty)return;
 ev.stopPropagation();ev.preventDefault();kitOtherItem(v,x,t.dataset.kwear)},true);
/* ✕ for kitOtherItem: the kit (32.10) already turns its "Lui" button into kit-x; the private ✕ that stood beside it is gone (reviewer r6) */
/* a gift that ARRIVES (PEND.giftin) shows the item, too */
(function(){const k0=kitEvArt;kitEvArt=function(m){try{if(m&&m.pid==="giftin"&&m.pp&&m.pp.e){const a=giftArt(m.pp.e);if(a&&a.src)return{src:a.src,lab:giftName(m.pp.e)}}}catch(e){}return k0.apply(this,arguments)}})();
(function(){const st=document.createElement("style");st.textContent=`.kgiftown{display:flex;align-items:center;gap:8px;margin:0 0 6px;font-weight:600}.kgiftown .md{flex:0 0 auto}`;document.head.appendChild(st)})();

/* ---------- every dialog: no empty round dots on plain fact rows ("Tốn: không": one implementation, kitHideOut jk2b §42.6) ---------- */
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const M=$("modal");if(M&&!M.hidden){
  M.querySelectorAll(".kfact > .kfdot").forEach(x=>{if(!x.querySelector("img,.md,.kit")){x.parentElement.classList.add("kfnodot");x.remove()}})}}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kgift-css2";st.textContent=`
.kfact.kfnodot{grid-template-columns:minmax(0,1fr)!important}
/* the event banner with people on the picture (KIT 33.6): category chip in the top-left corner, never over a head; name chips clear of the frame */
html body #mb>.kdlgart.kesonpic .ksart>figcaption,html body #mb>.kdlgart.kesonpic .ksart>.ksart-chip{top:8px!important;bottom:auto!important;left:10px!important;right:auto!important;transform:none!important;z-index:21}
html body #mb .kesov>.kpsn{bottom:12px!important}
html body #mb .kesov>.kpsn[data-row="1"]{bottom:calc(12px + 2.6em)!important}
`;document.head.appendChild(st)})();
/* ---------- Emperor / Thái hậu person card (Hậu cung › Chí tôn): daytime acts with them, beside the deck's "Việc hôm nay" (owner 11/15) ----------
   Only what the game already has, surfaced honestly (kit act cards, real odds):
   · go where he is this buổi (S.where.emp): walk there (Dư đồ cost), or "Xin yết kiến" at Dưỡng Tâm điện / ngự thư phòng (j41 accAsk, accAskO = odA)
   · "Dâng quà": a picker of her bag — handmade works and bought gifts — each with the same evaluation as the gift dialog (wkEval: one handmade
     work a week, repeats tire him; giftVal for bought items); the Thái hậu card: "Thỉnh an" (Đức Thọ cung, mornings, j41) and "Dâng quà".
   Hầu cờ / đánh đàn / dạo ngự hoa viên: KM_EMPACT below (one meeting a day, shared with Xin yết kiến). */
function giftBagFor(t){return S.inv.map((e,i)=>[e,i]).filter(([e])=>e&&!e.h&&(e.wk||IT[e.k])).map(([e,i])=>Object.assign({e,i},giftEval(e,t)))}
PEND.giftto=p=>{const t=p.t;const L=giftBagFor(t);if(!L.length)return{t:"<p>Rương trống: chưa có món nào để dâng.</p>",o:[{n:"Thôi",fx:{},kgx:1}]};
 L.sort((a,b)=>(b.ok-a.ok)||(b.v-a.v));const who=t==="emp"?"Hoàng thượng":"Thái hậu";
 return{t:`<p>Dâng món gì lên ${who}? Mỗi món ghi đúng điều được, theo tâm trạng và sở thích của ${t==="emp"?"ngài":"người"}.</p>`,
  o:L.map(x=>({n:`${giftName(x.e)}${x.e.wk?" ("+WTIER[x.e.wk.ti]+")":""}`,ik:x.i,fx:{},kgift:x.ok?x.x:"",kgwhy:x.ok?"":x.why,lock:!x.ok,kgg:x.e.wk?"wk":"it",
   go:()=>{if(!x.ok)return;spend(2);const i=S.inv.indexOf(x.e);window.__kitLastEvArt={src:giftArt(x.e).src,lab:giftName(x.e)};log(giveTo(S,t,i))}})).concat([{n:"Thôi",fx:{},kgx:1}])}};
function courtMeet(t){const B=[];try{
 if(t==="emp"){const k=(S.where||{}).emp;const night=(S.buoi||0)>=3;
  if(k&&!night&&S.place!==k){const st=accState(k);const nm=accName(k);
   if(st.ask==="yk")B.push(pbtn(`data-acask="${k}"`,`Xin yết kiến ở ${nm}`,accAskLine(k),st.askWhy||(!can(1)?"hết khắc":"")));
   else if(!st.why)B.push(pbtn(`data-kgmgo="${k}"`,`Đến ${nm} gặp ngài`,`Nắm chắc · tốn: ${st.tc||0} khắc · thành: đến nơi ngài đang ngự, gặp được ngài`,!can(st.tc||0)?"hết khắc":""));
   else B.push(pbtn(`data-kgmgo="${k}" disabled`,`Đến ${nm} gặp ngài`,"",st.why))}
  else if(S.place===k)B.push(`<p class="kr3note">Ngài đang ở đây: chạm vào ngài trên sân khấu để trò chuyện.</p>`)}
 if(t==="th"&&!S.thDead){const k="tn";if(S.place!==k){const st=accState(k);B.push(pbtn(`data-kgmgo="${k}"`,"Sang Đức Thọ cung thỉnh an",`Nắm chắc · tốn: ${st.tc||0} khắc · thành: đến Đức Thọ cung, thỉnh an Thái hậu tại đó`,st.why||(!can(st.tc||0)?"hết khắc":"")))}}
 const n=S.inv.filter(e=>e&&!e.h&&(e.wk||IT[e.k])).length;
 B.push(pbtn(`data-kgmgive="${t}"`,t==="emp"?"Dâng quà lên Hoàng thượng":"Dâng quà lên Thái hậu",`Nắm chắc · tốn: 2 khắc · thành: chọn món trong rương (${n} món), mỗi món ghi đúng điều được`,!n?"rương trống":!can(2)?"hết khắc":""))}catch(e){console.error("courtMeet",e)}
 return B}
document.addEventListener("click",ev=>{const g=ev.target.closest&&ev.target.closest("[data-kgmgo],[data-kgmgive]");if(!g||g.disabled)return;ev.stopPropagation();ev.preventDefault();
 try{closeModal()}catch(e){}
 if(g.dataset.kgmgo){if(typeof goTo==="function")goTo(g.dataset.kgmgo);return}
 const t=g.dataset.kgmgive;if(!can(2)||Q.length)return;pushDil(mkP("giftto",{t}),t==="emp"?"Dâng quà lên Hoàng thượng":"Dâng quà lên Thái hậu");render()},true);
(function(){const P0=typeof pcard==="function"?pcard:null;if(!P0)return;pcard=function(o){try{const gi=o&&o.groups?o.groups.findIndex(g=>g&&g[0]==="Việc hôm nay"):-1;if(gi>=0){
   const t=o.rank==="Hoàng thượng"?"emp":/^Thái hậu/.test(o.rank||"")?"th":null;if(t){const B=courtMeet(t);if(B.length){o.groups=o.groups.slice();o.groups.splice(gi,0,["Gặp "+(t==="emp"?"ngài":"Thái hậu")+" ban ngày",B])}}}}catch(e){}return P0.apply(this,arguments)}})();
/* the giftto picker: same decoration as the gift dialog (✕, locked rows), no tabs */
(function(){const g0=giftIxOf;giftIxOf=function(m){return g0(m)}})();
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0],M=$("modal");if(m&&m.pid==="giftto"&&M&&!M.hidden){const dlg=M.querySelector(".dlg");dlg.classList.add("kgiftdlg");let back=null;
  M.querySelectorAll(".opt[data-m]").forEach(b=>{const o=m.opts[+b.dataset.m];if(!o)return;if(o.kgx){back=b;b.hidden=true;b.classList.add("kgiftback");return}if(o.lock){b.disabled=true;b.classList.add("kgiftno")}
   if(!b.querySelector(".kitem")){const it=S.inv.find(e=>e&&giftName(e)===String(o.n).replace(/ \([^)]*\)$/,""));if(it){const a=giftArt(it);b.insertAdjacentHTML("afterbegin",kitItem({src:a.src,name:"",grade:a.grade,size:"sm"}).replace('<span class="kitn"></span>',''))}}});
  }}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.textContent=`.kgiftdlg .opt>.kitem{float:left;width:44px;margin:0 8px 0 0}`;document.head.appendChild(st)})();
/* ---------- three daytime acts with the Emperor (coordinator 11/15, one rule for her and every consort) ----------
   hầu cờ (Kỳ ≥ 1) · đánh đàn hầu ngài (Cầm ≥ 1): odds odA(Kỳ/Cầm bậc, his mood mm(), Sủng); thành: Sủng +2 đến +4, Ân tình +1, then her choice
   inside the result (thắng khéo / cố ý thua, Tâm cơ); hỏng: ngài chán, Sủng −1. 2 khắc, Sức −5.
   mời ngài dạo ngự hoa viên: not in a storm; odds Sủng + Sắc + mood; thành: Sủng +2, a better chance of the tablet tonight (shown as a
   ladder word); hỏng: ngài từ chối khéo; consorts already in the garden see it (ghen +3).
   All need ngài rảnh (daytime, not at Cần Chính điện, not in another palace) and one such act per day per consort (S.kmEmpDay = wk()). */
window.BAL=window.BAL||{};BAL.empDay=Object.assign({p:.06,suc:5,walkNight:15},BAL.empDay||{});
function kmEmpFree(){const k=(S.where||{}).emp;if((S.buoi||0)>=3)return{ok:false,why:"đã tối"};if(!k)return{ok:false,why:"không rõ ngài ở đâu"};
 if(k==="thu")return{ok:false,why:"ngài đang phê tấu ở Cần Chính điện"};if(/^r\d/.test(k)||k==="kn")return{ok:false,why:"ngài đang ở cung phi tần khác"};return{ok:true,k}}
function kmStorm(){const f=S.wx&&S.wx.f;return f===3||f===4}  /* j12 weather flags: 3 giông tố, 4 tuyết dày */
function kmEmpO(a,kind){const sung=a.sung||0;
 if(kind==="ky"||kind==="cam"){const L=(a.arts&&a.arts[kind])||0;return odA(a,25+artW(kind,L)*10+mm()+sung/5)}
 return odA(a,20+sung/3+effSac(a)/6+mm())}
const KM_DAYWHY="hôm nay đã gặp ngài một lần";
function kmEmpWhy(a,kind){if(a.kmEmpDay===wk())return KM_DAYWHY;const f=kmEmpFree();if(!f.ok)return f.why;
 if((kind==="ky"||kind==="cam")&&!((a.arts&&a.arts[kind])>=1))return `cần ${kind==="ky"?"Kỳ":"Cầm"} bậc 1`;if(kind==="walk"&&kmStorm())return S.wx.f===4?"tuyết rơi dày":"trời giông bão";if(a===S&&!can(2))return"hết khắc";if((a.suc||0)<BAL.empDay.suc+5)return"Sức quá thấp";return""}
const KM_EMPACT={ky:["Xin hầu cờ","Ngươi xin bày bàn cờ, hầu Hoàng thượng một ván."],cam:["Xin đánh đàn hầu ngài","Ngươi mang đàn đến, xin gảy một khúc cho ngài nghe."],
 walk:["Mời ngài dạo ngự hoa viên","Ngươi mời Hoàng thượng thong thả dạo ngự hoa viên."]};
function kmEmpLine(kind){const o=kmEmpO(S,kind);if(kind==="walk"){const n0=nightCh(S),n1=cl(n0+BAL.empDay.walkNight,0,70),w0=word(n0),w1=word(n1);
  /* reviewer r6: never "Liều → Liều"; the walk only helps when she can be picked tonight at all (nightCh wrapper: r > 0) */
  const night=n0<=0||n1<=n0?"":w0===w1?`, tối nay dễ được lật thẻ hơn (vẫn ${w0})`:`, tối nay được lật thẻ: ${w0} → ${w1}`;
  return `${word(o)} · tốn: 2 khắc, Sức -${BAL.empDay.suc} · thành: Sủng +2${night} · hỏng: ngài từ chối khéo · kèm: phi tần đang ở vườn thấy, ghen +3`}
 return `${word(o)} · tốn: 2 khắc, Sức -${BAL.empDay.suc} · thành: Sủng +2 đến +4, Ân tình +1, rồi chọn thắng khéo hay cố ý thua · hỏng: ngài chán, Sủng -1`}
/* the act itself — the same function for her and for every consort */
function kmEmpAct(a,kind){const why=kmEmpWhy(a,kind);if(why)return null;a.kmEmpDay=wk();if(a===S)spend(2);ap(a,{suc:-BAL.empDay.suc});const ok=roll(kmEmpO(a,kind));const me=a===S;const nm=me?"Ngươi":`${rkName(a)} ${a.name}`;
 if(kind==="walk"){if(ok){ap(a,{sung:2});a.kmWalk=wk();const seen=liveRivals(true).filter(v=>v!==a&&whereOf(v)==="vuon");seen.forEach(v=>{v.ghen=cl((v.ghen||0)+3,0,100)});
   if(!me)newsAdd(a,"emp",`${nm} cùng Hoàng thượng dạo ngự hoa viên.`);return{ok,txt:`${nm} cùng Hoàng thượng dạo ngự hoa viên. Sủng +2${seen.length?` · ${kitNameList(seen)} thấy cả, ghen +3`:""}.`}}
  return{ok,txt:`Hoàng thượng cười, bảo hôm nay còn bận, hẹn dịp khác.`}}
 if(ok){const g=2+Math.min(2,Math.floor(((a.arts&&a.arts[kind])||0)/2));ap(a,{sung:g,an:1});if(!me)newsAdd(a,"emp",`${nm} ${kind==="ky"?"hầu cờ":"đánh đàn hầu"} Hoàng thượng.`);
  return{ok,g,txt:`${nm} ${kind==="ky"?"hầu Hoàng thượng một ván cờ":"gảy đàn cho Hoàng thượng nghe"}; ngài vui. Sủng +${g} · Ân tình +1.`}}
 ap(a,{sung:-1});return{ok,txt:`Hoàng thượng ${kind==="ky"?"xem":"nghe"} một lúc rồi ngáp dài, cho lui. Sủng -1.`}}
/* tonight: the walk raises her tablet chance */
(function(){const n0=nightCh;nightCh=function(p){const r=n0.apply(this,arguments);try{const q=p||S;if(q&&q.kmWalk===wk()&&r>0)return cl(r+BAL.empDay.walkNight,0,70)}catch(e){}return r}})();
/* her: buttons in the Emperor card, result + the choice inside it */
function kmEmpBtns(){return Object.keys(KM_EMPACT).map(k=>pbtn(`data-kmemp="${k}"`,KM_EMPACT[k][0],kmEmpLine(k),kmEmpWhy(S,k)))}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-kmemp]");if(!b||b.disabled)return;ev.stopPropagation();ev.preventDefault();const kind=b.dataset.kmemp;
 try{closeModal()}catch(e){}const r=kmEmpAct(S,kind);if(!r){render();return}log(r.txt);
 if(r.ok&&kind!=="walk"){const tc=S.tamco||0;const oW=odA(S,30+tc/2),oL=odA(S,40+tc/2);
  Q.push({ev:1,t:KM_EMPACT[kind][0],h:`<p>${KM_EMPACT[kind][1]}</p><p class="g">${r.txt}</p><p>${kind==="ky"?"Ván cờ đến hồi gay cấn.":"Khúc đàn sắp hết."} Ngươi định thế nào?</p>`,
   opts:[{n:kind==="ky"?"Thắng khéo, để ngài thua mà vẫn vui":"Kết khúc thật hay, khoe tài",fx:{},x:`${word(oW)} · thành: Danh +1, Sủng +1 · hỏng: ngài phật ý, Sủng -1`,go:()=>{if(roll(oW)){ap(S,{danh:1,sung:1});log("Ngài khen ngươi khéo léo. Danh +1 · Sủng +1.")}else{ap(S,{sung:-1});log("Ngài thoáng phật ý. Sủng -1.")}}},
    {n:kind==="ky"?"Cố ý thua một nước":"Cố ý đàn chậm lại, để ngài chỉ bảo",fx:{},x:`${word(oL)} · thành: Ân tình +1 · hỏng: ngài nhận ra, Sủng -1`,go:()=>{if(roll(oL)){ap(S,{an:1});log("Ngài đắc ý, càng thương ngươi. Ân tình +1.")}else{ap(S,{sung:-1});log("Ngài nhận ra ngươi cố ý nhường. Sủng -1.")}}}]})}
 else Q.push({t:KM_EMPACT[kind][0],h:`<p>${KM_EMPACT[kind][1]}</p><p class="${r.ok?"g":"r"}">${r.txt}</p>`});
 showModal();render()},true);
(function(){const c0=courtMeet;courtMeet=function(t){const B=c0.apply(this,arguments);if(t==="emp")try{B.splice(Math.max(0,B.length-1),0,...kmEmpBtns())}catch(e){}return B}})();
/* Xin yết kiến shares the one-a-day meeting with the three acts (coordinator 13:35Z): accState gives askWhy (the one reason every
   yết kiến button / card shows), accAsk marks the day. */
(function(){const s0=accState;accState=function(k){const st=s0.apply(this,arguments);try{if(st&&st.ask==="yk"){
   if(S.kmEmpDay===wk()&&!st.empAway){st.askOk=false;st.dayDone=1}
   st.askWhy=st.empAway?"Hoàng thượng không có ở đây":st.dayDone?KM_DAYWHY:!st.askOk?"hết khắc":""}}catch(e){}return st};
 const a0=accAsk;accAsk=function(k){let yk=false;try{const st=accState(k);if(st.ask==="yk"){if(st.dayDone)return;yk=true}}catch(e){}
  const c=used;const r=a0.apply(this,arguments);try{if(yk&&S&&used!==c)S.kmEmpDay=wk()}catch(e){}return r}})();
/* NPC consorts: the same acts, a small chance each tuần (BAL.empDay.p), the one their arts suit */
(function(){if(typeof nextBuoi!=="function")return;const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{if(S&&!S.dead&&(S.buoi||0)===1)for(const v of liveRivals(false)){if(!v||v.out||v.confined||!roll(BAL.empDay.p*100))continue;
   const kind=(v.arts&&v.arts.ky>=1&&roll(40))?"ky":(v.arts&&v.arts.cam>=1&&roll(50))?"cam":"walk";kmEmpAct(v,kind)}}catch(e){}return r}})();
