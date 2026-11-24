/* ================= jmoment: KHOẢNH KHẮC CHÂN DUNG — collectible painted moments (owner PARKING_LOT row 9, 20/11 ~06:35Z; build order OD 24/11 ~05:20Z) =================
   Expert notes: dev/handover/reports/moment.md (handover branch). The idea: the court painter (Họa sư, a REAL man of the palace, j22 MROLES, law 6b; where he stands = jmen menSched work orders)
   paints a consort in one special scene — under the snowy plum, by the lotus pond on a moon night, holding a lantern at Thượng Nguyên… — the way Qing
   court painters made 行乐图 leisure portraits and festival scenes. Each painting is a REAL item (law 6c): an entry {k:"chandung", mo, of, ofN, y, by, src}
   in a chest, routed by the one item ledger (jil ilLog / ilGone), giveable (j8 giveTo, it pleases Hoàng thượng), stealable (jlost loOk: pr ≥ LO.minPr,
   not keep), displayable on the Đa bảo các shelf (BAL.shelf.it, group Thư họa).
   ONE TABLE BAL.mo.list (law 4): every moment = consort × trigger, trigger = season + place + buổi, or a festival (FEST key, j31 festToday), or an event
   (promotion: the investiture portrait). How it is earned (rare; it costs khắc, gain-only, law 3):
     · the painter must really be there: S.menW[painter] === the place (jmen work orders send him to the garden on some tuần; a festival tuần adds ONE
       lawful work order at the feast, menSched wrap below, so everyone sees him there);
     · she arrives (goTo) → one card «Họa sư … đang vẽ cảnh …» with two equal roads (law 2) + leave: Ngồi cho vẽ (khắc) · Lót tay họa sư (bạc, better
       odds, a rumour risk) · Thôi. Odds = moOdds: her Sắc against BAL.mo.bar[rank] — the bar RISES with rank (law 5: a high consort's portrait is
       judged harder), + Hoàng thượng there. Once per moment per year per person; at most BAL.mo.capY a year; one sitter per painter per buổi.
     · NPCs collect by the SAME rule (law 1): at each buổi (placeWhere) every NPC consort standing where the painter is, with a moment open, chooses to
       sit (BAL.mo.npcSit) and rolls the same moOdds; host only in co-op (jmort convention). An NPC who sat first keeps the painter busy that buổi.
     · promotion (promoteP, one function for her and NPCs): BAL.mo.promoP chance of the investiture portrait «Ngày nhận sắc phong».
   Picture: BAL.mo.art[moment] (CDN, Foreman C ART ORDER in the report) when painted; until then the «chưa vẽ» guard moPic shows the sitter's own
   portrait snapshot (e.src, figFor "por" at the time of painting), then her live portrait, then the kit painting tranh-co — never a blank.
   UI: kit only — the standard dialog (Q opts, act cards with odds word), the bag (kitInvGrid via kitItemInfo), kit rows67 in Sổ luân hồi. A card ALBUM
   part does not exist: KIT REQUEST filed (dev/kit/KIT_REQUESTS.md «moment album»); BAL.mo.album stays 0 until KIT READY.
   Old saves: nothing to migrate (p.moY / S.moBusy are made on first use). */
Object.assign(BAL,{mo:{on:1,
 /* the moments: k → n name · sea season (SEASON word) · pl place key · b buổi list (0 sáng 1 trưa 2 chiều 3 tối; omitted = any) · fest FEST key · ev event */
 /* fest moments: b = the ONE buổi of the festival tuần the Họa sư paints the feast (a lawful work order in jmen menSched, wrapped below) */
 list:{
  xuandao:{n:"Dạo bước dưới hoa đào",sea:"Xuân",pl:"vuon",b:[0,1,2],d:"Hoa đào xuân rụng trên vai áo, nàng đứng bên lối đá."},
  hasen:{n:"Hồ sen đêm trăng",sea:"Hạ",pl:"vuon",b:[3],d:"Trăng lên trên hồ sen, nàng tựa lan can đình thủy tạ."},
  haquat:{n:"Hóng mát bên thủy tạ",sea:"Hạ",pl:"vuon",b:[1,2],d:"Trưa hè, nàng cầm quạt lụa ngồi bên hiên nước."},
  thucuc:{n:"Thưởng cúc trời thu",sea:"Thu",pl:"vuon",b:[0,1,2],d:"Giữa vườn cúc vàng, nàng cài một nhánh lên tóc."},
  dongmai:{n:"Dưới tuyết mai",sea:"Đông",pl:"vuon",b:[0,1,2],d:"Tuyết phủ cành mai, nàng khoác áo choàng lông đứng ngắm."},
  newyear:{n:"Đón xuân ngày Tết",fest:"newyear",pl:"vuon",b:[0],d:"Đầu năm, nàng treo câu đối đỏ bên cửa cung."},
  nguyentieu:{n:"Cầm lồng đèn Thượng Nguyên",fest:"nguyentieu",pl:"vuon",b:[3],d:"Đêm rằm tháng giêng, nàng cầm lồng đèn hoa sen đi dưới dãy đèn."},
  doanngo:{n:"Xem đua thuyền Đoan ngọ",fest:"doanngo",pl:"vuon",b:[0],d:"Bên hồ, nàng đeo túi thơm ngải, xem thuyền rồng."},
  thattich:{n:"Xâu kim đêm Thất tịch",fest:"thattich",pl:"vuon",b:[3],d:"Dưới trời sao, nàng xâu kim ngũ sắc cầu khéo tay."},
  trungthu:{n:"Ngắm trăng Trung thu",fest:"trungthu",pl:"vuon",b:[3],d:"Trăng rằm tháng tám, nàng ngồi bên án bánh trái."},
  trungcuu:{n:"Lên cao ngày Trùng cửu",fest:"trungcuu",pl:"vuon",b:[0],d:"Trên giả sơn, nàng cài cành thù du, nâng chén rượu cúc."},
  sacphong:{n:"Ngày nhận sắc phong",ev:"promo",d:"Triều phục chỉnh tề, nàng ngồi ngay ngắn trong ngày nhận sắc phong."}},
 bar:[40,44,48,52,56,60,64,68],/* the Sắc a sitter needs for an even sitting, by rank 0 Đáp ứng … 7 Hoàng hậu (rises: law 5) */
 base:50,sacK:.8,taiK:.2,empB:12,lo:8,hi:90,/* moOdds = base + (Sắc − bar)·sacK + (Tài − bar)·taiK + empB when Hoàng thượng is there, clamped lo..hi */
 kh:1,                /* khắc the sitting costs (Ngồi cho vẽ) */
 bribe:[20,25,30,40,50,60,70,80],bribeB:15,rumor:30,rumorDanh:-1,/* Lót tay họa sư: bạc by rank, + odds, rumour roll → Danh */
 danh:1,sungEmp:1,    /* a finished portrait: Danh + (seen at court); Hoàng thượng there: Sủng + */
 capY:2,              /* most portraits one person may get in one year */
 npcSit:60,           /* an NPC who stands where the painter is, with a moment open, chooses to sit (agent choice, then the same moOdds) */
 promoP:35,           /* promotion: chance of the investiture portrait (her and NPCs, one rule) */
 pr:120,gv:8,         /* item price (theft / gift worth, jlost LO.minPr 30) and gift worth */
 art:{},              /* moment key → CDN picture when Foreman C has painted it (ART ORDER, report moment.md); empty = «chưa vẽ» guard */
 album:0}});          /* 1 when the KIT album part is READY (KIT_REQUESTS «moment album»); until then: bag + Sổ luân hồi rows only */

/*CORE{*/
function moRk(p){try{return typeof rkOf==="function"?rkOf(p):(p&&p.queen?7:(p&&p.rank)|0)}catch(e){return 0}}
/* the ONE odds of a sitting (her and NPCs) */
function moOdds(p,emp){const B=BAL.mo,r=Math.max(0,Math.min(7,moRk(p))),bar=B.bar[r];
 const x=B.base+((p&&p.sac||0)-bar)*B.sacK+((p&&p.tai||0)-bar)*B.taiK+(emp?B.empB:0);return Math.round(Math.max(B.lo,Math.min(B.hi,x)))}
/* the moments open now for place k (season + buổi, or the festival of this tuần); events are not here */
function moOpen(k,sea,b,fk){const out=[];const L=BAL.mo.list;for(const m in L){const M=L[m];if(M.ev||M.pl!==k)continue;
if(M.fest){if(M.fest===fk&&(!M.b||M.b.indexOf(b)>=0))out.push(m);continue}if(M.sea&&M.sea!==sea)continue;if(M.b&&M.b.indexOf(b)<0)continue;out.push(m)}return out}
/* may p still get moment m this year? */
function moFree(p,m,y){const H=p&&p.moY||{};if(H[m]===y)return false;let n=0;for(const k in H)if(H[k]===y)n++;return n<BAL.mo.capY}
/*}CORE*/

(function(){if(typeof BAL!=="object"||!BAL.mo)return;const B=BAL.mo;
const cw=()=>window.COOPW&&COOPW.on,host=()=>!cw()||COOPW.seat==="a";
function painter(){try{return (S.men||[]).find(m=>m&&m.alive!==false&&m.rw==="họa sư")||null}catch(e){return null}}
function fk(){try{const f=festToday();return f?f.k:""}catch(e){return""}}
function sea(){return SEASON[S.month-1]}
/* is the painter at place k now? ONLY where the men's schedule really puts him (S.menW: jmen menSched work orders / j22 walk / j95 khắc view) */
function painterAt(k,pt){return !!pt&&!!S.menW&&S.menW[pt.id]===k}
/* festival tuần: the feast painting is a lawful work order (jmen menSched): at the moment's buổi the Họa sư stands at the feast, seen by everyone */
if(typeof menSched==="function"){const s0=menSched;menSched=function(){const r=s0.apply(this,arguments);try{const pt=painter(),f=fk(),b=S.buoi||0;
 if(B.on&&pt&&f&&S.menW&&!(typeof menBanned==="function"&&menBanned(pt)))for(const m in B.list){const M=B.list[m];if(M.fest!==f||(M.b&&M.b.indexOf(b)<0))continue;
  if(typeof menLawful==="function"&&!menLawful(pt,M.pl,"order"))continue;S.menW[pt.id]=M.pl;(S.menWhy=S.menWhy||{})[pt.id]={w:"order",k:M.pl};break}}catch(e){console.error("moment fest order",e)}return r}}
function busyKey(){return `${S.year}|${S.month}|${S.tuan}|${S.buoi||0}`}
function busy(){return S.moBusy&&S.moBusy.k===busyKey()?S.moBusy:null}
function empAt(k){try{return !!S.where&&S.where.emp===k}catch(e){return false}}
function pKey(p){return p===S?"me":p&&p.id}
function pName(p){try{return p===S?S.name:p.name}catch(e){return""}}
function snap(p){try{return typeof figFor==="function"?figFor(p===S?S:{ref:p},"por")||"":""}catch(e){return""}}
/* the ONE grant: a real item into p's chest, written in the ledger */
function grant(p,m,how){const M=B.list[m];if(!M)return null;const pt=painter();
 const e={k:"chandung",mo:m,of:pKey(p),ofN:pName(p),y:S.year,by:pt?pt.name:"",src:snap(p)};
 (p.inv=p.inv||[]).push(e);(p.moY=p.moY||{})[m]=S.year;
 try{if(typeof ilLog==="function")ilLog(e,"",p===S?"me":String(p.id),how||"họa sư vẽ")}catch(x){}
 try{if(e.iu)(S.moIu=S.moIu||{})[e.iu]={mo:e.mo,of:e.of,ofN:e.ofN,y:e.y,by:e.by,src:e.src}}catch(x){}
 try{if(B.danh)p.danh=(p.danh||0)+B.danh}catch(x){}return e}
/* the SAME piece keeps what it is: j8 giveTo / gift paths copy only {k, from, iu}; the ledger id restores moment, sitter, year, painter */
function moFix(e){try{if(e&&e.k==="chandung"&&!e.mo&&e.iu&&S&&S.moIu&&S.moIu[e.iu])Object.assign(e,S.moIu[e.iu])}catch(x){}return e}
function moFixAll(){try{for(const p of [S].concat(rivals||[]))for(const e of (p&&p.inv)||[])moFix(e)}catch(x){}}
window.moFix=moFix;window.moGrant=grant;window.moOdds=moOdds;window.moOpen=moOpen;window.moFree=moFree;window.moPainter=painter;
/* the item */
try{IT.chandung={n:"Tranh chân dung",kd:"Kỷ vật",d:"Bức họa của họa sư cung đình vẽ một khoảnh khắc · tặng được, bày được trên kệ Thư họa",pr:B.pr,gv:B.gv,tg:["emp"]};
 if(typeof ITIMG==="object"&&ITIMG)ITIMG.chandung=ITIMG.tranhco||"tranh-co";
 const n0=iname;iname=function(e){const r=n0.apply(this,arguments);try{moFix(e);if(e&&e.k==="chandung"&&e.mo&&B.list[e.mo])return `Tranh «${B.list[e.mo].n}»${e.ofN?` · ${e.ofN}`:""}`}catch(x){}return r}}catch(e){console.error("chandung",e)}
/* displayable on the Đa bảo các shelf, group Thư họa (kit grade 2, the item price) */
try{if(BAL.shelf&&BAL.shelf.it)BAL.shelf.it.chandung={g:"thuhoa",rk:0,gr:2,pr:B.pr,src:""}}catch(e){}
/* «chưa vẽ» guard: the moment painting, else the sitter's portrait (snapshot, then live), else the kit painting — never blank */
function moPic(e){try{const a=e&&B.art[e.mo];if(a)return a}catch(x){}
 if(e&&e.src)return e.src;
 try{const p=e&&(e.of==="me"?S:RV(+e.of));const s=p?snap(p):"";if(s)return s}catch(x){}
 try{const s=kitItemInfo({k:"tranhco"}).src;if(s)return s}catch(x){}return `img/item-${(typeof ITIMG==="object"&&ITIMG.tranhco)||"tranh-co"}.webp`}
function moDrawn(e){return !!(e&&B.art[e.mo])}
window.moPic=moPic;window.moDrawn=moDrawn;
if(typeof kitItemInfo==="function"){const k0=kitItemInfo;kitItemInfo=function(x){const r=k0.apply(this,arguments);try{const e=x&&typeof x==="object"?x:null;
 if(e&&e.k==="chandung"){moFix(e);r.src=moPic(e);r.src512=r.src;r.grade=2;if(e.mo&&B.list[e.mo])r.name=iname(e);r.sub=moDrawn(e)?"Tranh chân dung":"Tranh chân dung · chưa vẽ cảnh"}}catch(err){}return r};window.kitItemInfo=kitItemInfo}

/* the bag (jinv kitInvGrid, no new part): every painting is its own piece (own tile, picture, name, grade), never stacked ×N like plain goods */
if(typeof kinvGroups==="function"){const g0=kinvGroups;kinvGroups=function(){moFixAll();const G=g0.apply(this,arguments);try{if(!G.some(g=>g.k==="chandung"))return G;
 const out=G.filter(g=>g.k!=="chandung");(S.inv||[]).forEach((e,i)=>{if(e&&e.k==="chandung"&&!e.h)out.push({k:"chandung",t:null,w:e.w,i,n:1,from:e.from,wk:null,e})});return out}catch(x){return G}}}
if(typeof kinvItems==="function"){const i0=kinvItems;kinvItems=function(){const L=i0.apply(this,arguments);try{for(const x of L){if(!x||!x.g||x.g.k!=="chandung"||!x.g.e)continue;const I=kitItemInfo(x.g.e);
 x.src=I.src;x.src512=I.src512;x.name=I.name;x.grade=I.grade;x.gname=I.gname;x.qty=1;x.tip=`${I.name} · Kỷ vật`}}catch(e){}return L}}
/* ---- HER: arriving where the painter works ---- */
function offer(k){if(!B.on||!S||S.dead||S.out||Q.length)return;const pt=painter();if(!painterAt(k,pt))return;const bz=busy();
 const open=moOpen(k,sea(),S.buoi||0,fk()).filter(m=>moFree(S,m,S.year));if(!open.length)return;
 if(bz){if(bz.who!=="me"&&!bz.told){bz.told=1;log(`${pt.name} đang vẽ cho ${bz.n}; hôm nay không vẽ thêm ai.`)}return}
 const m=open[0],M=B.list[m],emp=empAt(k),p0=moOdds(S,emp),r=Math.max(0,Math.min(7,moRk(S))),br=B.bribe[r],p1=Math.min(B.hi,p0+B.bribeB);
 S.moBusy={k:busyKey(),who:"asked"};
 const done=(ok,how)=>{S.moBusy={k:busyKey(),who:"me",n:S.name};if(!ok){log(`${pt.name} phác mấy nét rồi lắc đầu: dáng hôm nay chưa ra hồn, để dịp khác.`);return}
  const e=grant(S,m,how);if(emp&&B.sungEmp)S.sung=(S.sung||0)+B.sungEmp;
  Q.push({t:"Khoảnh khắc chân dung",kind:"reward",who:typeof pMe==="function"?pMe():null,h:`<p>${pt.name} vẽ xong bức «${M.n}». ${M.d}</p>`+rows67([["Được",iname(e),"g"],["Danh",`+${B.danh}`,"g"]].concat(emp&&B.sungEmp?[["Sủng",`+${B.sungEmp}`,"g"]]:[]).concat([["Cất ở","Rương của ngươi (Tư trang)","t"]]))+`<p class="past">Bức tranh cất trong rương: tặng được, bày lên kệ được, cũng có thể bị kẻ khác lấy mất.</p>`})};
 Q.push({t:"Họa sư đang vẽ",who:typeof pMan==="function"?pMan(pt):null,
  h:`<p>${pt.name} bày giá vẽ ${M.fest?"giữa ngày hội":"giữa cảnh"} «${M.n}», ngỏ ý mời ngươi ngồi cho vẽ.${emp?" Hoàng thượng đang ở gần, ngài cũng dừng chân xem.":""}</p>`,
  opts:[{n:"Ngồi cho họa sư vẽ",p:p0,x:`tốn: ${B.kh} khắc · được: tranh «${M.n}»`,off:typeof can==="function"&&!can(B.kh),go:()=>{spend(B.kh);done(roll(p0),"ngồi cho vẽ")}},
   {n:"Lót tay họa sư",p:p1,fx:{bac:-br},x:`được: tranh «${M.n}» · có thể bị đồn đút lót`,go:()=>{const ok=roll(p1);if(roll(B.rumor)){S.danh=(S.danh||0)+B.rumorDanh;log(`Có người đồn ngươi đút lót họa sư. Danh ${B.rumorDanh}.`)}done(ok,"lót tay họa sư")}},
   {n:"Thôi, để dịp khác",go:()=>{S.moBusy={k:busyKey(),who:"none"}}}]});
 setTimeout(()=>{try{const Md=$("modal");if(Md&&Md.hidden&&Q.length)showModal()}catch(e){}},0)}
if(typeof goTo==="function"){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(S&&S.place===k)offer(k)}catch(e){console.error("moment offer",e)}return r}}

/* ---- NPCs: the same rule at every buổi (placeWhere sets S.where; j22 sets S.menW in its wrap, which runs before this one) ---- */
function npcPass(){if(!B.on||!S||S.dead||!host())return;const pt=painter();if(!pt||busy())return;const W=S.where||{};
 const L=liveRivals(true).filter(v=>v&&!v.coop&&v.alive&&!v.out);for(let i=L.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[L[i],L[j]]=[L[j],L[i]]}
 for(const v of L){const k=W[v.id];if(!k||!painterAt(k,pt))continue;const open=moOpen(k,sea(),S.buoi||0,fk()).filter(m=>moFree(v,m,S.year));if(!open.length)continue;
  if(!roll(B.npcSit))continue;const emp=W.emp===k;S.moBusy={k:busyKey(),who:String(v.id),n:v.name};
  if(roll(moOdds(v,emp))){grant(v,open[0],"họa sư vẽ");if(emp&&B.sungEmp)v.sung=(v.sung||0)+B.sungEmp;
   try{if((S.mat||0)>=2||k===S.place)log(`${NM(v)}: ${pt.name} vẽ nàng trong cảnh «${B.list[open[0]].n}».`)}catch(e){}}
  return}}
if(typeof placeWhere==="function"){const w0=placeWhere;placeWhere=function(){const r=w0.apply(this,arguments);try{moFixAll();if(S&&S.place&&S.place!=="home")offer(S.place);npcPass()}catch(e){console.error("moment npc",e)}return r}}

/* ---- promotion: the investiture portrait (one rule for her and NPCs) ---- */
if(typeof promoteP==="function"){const p0=promoteP;promoteP=function(p){const k0=p?moRk(p):0;const r=p0.apply(this,arguments);
 try{if(B.on&&p&&moRk(p)>k0&&painter()&&(p===S||host())&&moFree(p,"sacphong",S.year)&&roll(B.promoP)){const e=grant(p,"sacphong","vẽ ngày sắc phong");
  if(p===S)log(`Hoàng thượng truyền họa sư vẽ ngươi trong ngày nhận sắc phong. Được ${iname(e)}.`)}}catch(e){console.error("moment promo",e)}return r};window.promoteP=promoteP}

/* ---- the gallery: Sổ luân hồi, kit rows (the album grid waits for the KIT part) ---- */
function moBookHTML(){if(!S||S.dead||!S.origin)return"";const mine=(S.inv||[]).filter(e=>e&&e.k==="chandung");
 const R=[];const tot=Object.keys(B.list).length;const got=new Set(mine.filter(e=>e.of==="me").map(e=>e.mo));
 R.push(["Đã có",`${got.size} / ${tot} cảnh của ngươi`,got.size?"g":"t"]);
 for(const m in B.list){const M=B.list[m];const e=mine.find(x=>x.mo===m&&x.of==="me");
  const when=M.fest&&typeof FEST==="object"&&FEST[M.fest]?FEST[M.fest].name:M.ev?"Khi được thăng phong":`${M.sea?M.sea+" · ":""}${typeof placeOf==="function"?placeOf(M.pl).n:M.pl}`;
  R.push([M.n,e?`Năm ${e.y}${e.by?` · ${e.by} vẽ`:""}`:`chưa có · ${when}`,e?"g":""])}
 const oth=mine.filter(e=>e.of!=="me");if(oth.length)R.push(["Tranh người khác",oth.map(e=>iname(e)).join(", "),"t"]);
 return `<h3>Khoảnh khắc chân dung</h3>`+rows67(R)}
window.moBookHTML=moBookHTML;window.moNpcPass=npcPass;window.moOffer=offer;
if(typeof pastHTML==="function"){const h0=pastHTML;pastHTML=function(){const h=h0.apply(this,arguments);try{return h+moBookHTML()}catch(e){return h}}}
})();
