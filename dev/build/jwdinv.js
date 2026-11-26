/* ================= jwdinv: ONE Tư trang for the wardrobe (review/balance-unified, 15/11) =================
   Before: j92 (trâm cài + y phục, WD items, hidden Đúng/Vượt phẩm) had its own block "Đang mặc / Rương đồ" (jk2b K2) on top of the
   approved Tư trang of jinv (bag kitInvGrid + "Đang mang" kitEquipSlots): two hair slots, two dress slots, two Sắc rules.
   Now there is ONE of each:
   - Bag (kitInvGrid): WD trâm under "Trang sức", WD y phục under a new tab "Y phục" (painting img/wd-<key>.webp, grade ground);
     worn ones carry the worn band, pawned ones the corner tag "đang cầm". Tap = one item panel (kinvOpen) with the j92 acts
     (Cài / Mặc 1 khắc, Tháo, Tặng, Bán lén, Cầm cố, Chuộc lại).
   - "Đang mang": Cài tóc = p.wd.tram, Y phục = p.wd.y (the j92 store, same for every woman, so NPC rules are untouched);
     Đeo tay / Đeo eo / Túi thơm / Khăn che mặt stay jinv's. Tap a slot = change it (+ Tự chọn đồ, Chải chuốt).
   - Every j8 hair item (incl. j97 ngự tứ hairpins) is a WD trâm; fabric "May áo" now sews a real WD garment into the Y phục slot
     (S.dress, the 3-month áo, is gone; old saves convert it).
   - ONE wearBonus: jewellery (IT.sl, ×1.5 above her rank as j8), the two WD slots (their own effect, never ×1.5: Vượt phẩm stays
     HIDDEN, so the shown numbers are the real ones), the veil (+2 while it hides a mark).
   - ONE luxury score: luxOf reads the WD slots too (Xa xỉ N per item = the approved [8,16,28,44,64][grade] + giá/10).
     The hidden allowance also covers the phẩm phục of her own rank (so Nội vụ phủ's issue is never "too lavish");
     consequences = the approved luxury law (jinv luxMonth). j92's hidden Đúng/Vượt phẩm rule stays (remarks, Hặc, Chải chuốt,
     Tự chọn): its level is never shown, only what someone said or what she learnt. */
(function(){if(typeof WD_ITEMS!=="object")return;
 /* 1. remaining hair items (j97 ngự tứ hairpins…) become WD trâm */
 /* jreg: hair items of later modules too */
 regEach(IT,k=>{const it=IT[k];if(!it||it.sl!=="hair"||WD_ITEMS[k])return;let a=null;try{a=typeof itemArt==="function"?itemArt(k):null}catch(e){}
  WD_ITEMS[k]={k,sl:"tram",n:it.n,P:it.nt?8:Math.min(8,(it.rk|0)+1),g:it.nt?4:(a?a.grade|0:0),col:"vang",w:Object.assign({},it.w||{}),nt:it.nt?1:0,pr:it.nt?0:(it.pr||0),
   icon:a&&a.src?a.src:(typeof ITIMG==="object"&&ITIMG[k]?`img/item-${ITIMG[k]}.webp`:""),note:""};
  it.wsl="tram";it.wd=1;it.kd="Trâm cài";delete it.sl},"WD hair")})();
/* 2. fabric → the garment it is sewn into (same names as the j92 store) */
const WD_FAB={luahang:"y_vanthuy",gamto:"y_maudon",gamvang:"y_minhhoang"};
function wdFabOf(k){const it=IT[k];if(!it||!it.dr)return null;if(WD_FAB[k]&&WD_ITEMS[WD_FAB[k]])return WD_FAB[k];return wdPickAt(Math.min(8,(it.rk|0)+1),"y",0)}
/* jreg: fabrics of later modules (jstip vaibong, aolong) read the same «May áo» line (their old «May áo thường: Sắc +1» text was wrong: sewing gives a garment) */
regEach(IT,k=>{const g=IT[k]&&itm(k).dr?wdFabOf(k):null;if(g&&WD_ITEMS[g]){const w=WD_ITEMS[g];IT[k].d=`May áo: ${w.n} (Y phục, ${plainFx(w.w)||"giản dị"})`}},"WD fabric desc");
function wdSew(p,fk){const g=wdFabOf(fk);if(!g)return null;const e={k:g,src:"may",fab:fk,d:wdWhen()};
 /* the tailors know the cloth: the garment's phẩm is known to its owner */
 if(p===S){S.wdk=S.wdk||{};S.wdk[g]=1}else{p.wdk=p.wdk||{};p.wdk[g]=1}wdWearEntry(p,e);return e}
(function(){const u0=useItem;useItem=function(p,ix,tgt){const e=p&&p.inv&&p.inv[ix],it=e&&IT[e.k];
  if(it&&it.dr&&!e.h){const g=wdFabOf(e.k);if(g){p.inv.splice(ix,1);wdSew(p,e.k);return `${NMc(p)} may ${WD_ITEMS[g].n} bằng ${it.n}. `}}
  return u0.apply(this,arguments)}})();
/* 3. old saves: a worn hair item (e.w) goes into the Cài tóc slot; a running S.dress becomes its garment in the Y phục slot */
(function(){const o0=wdOf;wdOf=function(p){if(p&&typeof p==="object"&&!p.__wdmig){p.__wdmig=1;try{
  const worn=[];if(p.inv)for(let i=p.inv.length-1;i>=0;i--){const e=p.inv[i];if(e&&e.w&&!e.h&&IT[e.k]&&itm(e.k).wsl&&itm(e.k).wsl!=="hd"){p.inv.splice(i,1);delete e.w;worn.push(e)}}
  if(!p.wd)o0.call(this,p);
  for(const e of worn){if(!p.wd.tram||p.wd.tram.from==="base"||p.wd.tram.src==="cap")wdWearEntry(p,e);else{p.inv=p.inv||[];p.inv.push(e)}}
  if(p.dress){const d=p.dress;p.dress=null;if(d.until>((S&&S.turn)|0)&&IT[d.k])wdSew(p,d.k)}}catch(e){console.error("wdmig",e)}finally{delete p.__wdmig}}
  return o0.apply(this,arguments)};window.wdOf=wdOf})();
/* 4. ONE wearBonus */
wearBonus=function(p){const b={sac:0,danh:0};if(!p)return b;const r=rkOf(p);
 for(const e of (p.inv||[]))if(e&&e.w&&!e.h&&IT[e.k]&&itm(e.k).w&&itm(e.k).sl){const m=itm(e.k).rk>r?1.5:1;for(const s in itm(e.k).w)b[s]=(b[s]||0)+Math.round(itm(e.k).w[s]*m)}
 try{const w=wdOf(p);for(const sl of ["tram","y"]){const it=wdItem(w[sl]);if(it)for(const s in it.w)b[s]=(b[s]||0)+it.w[s]}}catch(e){}
 try{if(veilOn(p)&&veilNeed(p))b.sac+=2}catch(e){}return b};
/* 5. ONE luxury score */
function wdLux(k){const w=WD_ITEMS[k];return w?LUX_V[Math.max(0,Math.min(4,w.g|0))]+Math.round((w.pr||0)/10):0}
luxGrade=function(k){const w=WD_ITEMS[k];if(w)return w.g|0;const a=typeof itemArt==="function"?itemArt(k):null;return a?a.grade|0:0};
luxWorn=function(p){const L=(p.inv||[]).filter(e=>e&&e.w&&!e.h&&IT[e.k]&&itm(e.k).sl).map(e=>e.k);
 try{if(p.alive!==false&&(p===S||p.wd||p.rank!=null)){const w=wdOf(p);for(const sl of ["tram","y"])if(w[sl]&&WD_ITEMS[w[sl].k])L.push(w[sl].k)}}catch(e){}return L};
const WD_BASELUX={};function wdBaseLux(P){if(WD_BASELUX[P]!=null)return WD_BASELUX[P];let s=0;
 for(const sl of ["tram","y"]){const L=wdPool(sl,P,true);if(L.length)s+=L.reduce((a,k)=>a+luxVal(k),0)/L.length}return WD_BASELUX[P]=Math.round(s)}
(function(){const a0=luxAllow;luxAllow=function(p){let b=a0.apply(this,arguments);try{b+=wdBaseLux(Math.min(8,wdPOf(p)))}catch(e){}return b}})();
/* 6. vượt phẩm: jewellery above her rank (j8, visible rule) + WD items of a Vượt phẩm outfit (j92, hidden) — consequences;
   wdVpSeen = what she can see (jewellery rule, and the WD part only once she knows her outfit's status) */
vpItems=function(p){const r=rkOf(p);const L=(p.inv||[]).filter(e=>e&&e.w&&!e.h&&IT[e.k]&&itm(e.k).sl&&itm(e.k).rk>r).map(e=>({k:e.k}));
 try{if(wdStatus(p)==="over"){const w=wdOf(p);for(const sl of ["tram","y"]){const e=w[sl],it=wdItem(e);if(it&&wdP(e,p)>wdPOf(p))L.push({k:e.k,wd:sl})}}}catch(e){}return L};
function wdVpSeen(){const r=rkOf(S);const L=(S.inv||[]).filter(e=>e&&e.w&&!e.h&&IT[e.k]&&itm(e.k).sl&&itm(e.k).rk>r).length;let n=0;try{if(wdKnownStatus(S)==="over")n=vpItems(S).filter(x=>x.wd).length}catch(e){}return L+n}
/* sources */
(function(){const s0=wdSrcTxt;wdSrcTxt=function(e){if(e&&e.src==="may")return`may từ ${IT[e.fab]?itm(e.fab).n:"vải"}${e.d?", "+e.d:""}`;return s0.apply(this,arguments)}})();

/* 7. the bag: WD items in their tabs, with their painting, grade and Xa xỉ N; worn + pawned ones too */
try{const t=KINV_CATS.find(c=>c[0]==="trang");if(t&&!t[2].includes("Trâm cài"))t[2].push("Trâm cài");
 if(!KINV_CATS.some(c=>c[0]==="y"))KINV_CATS.splice(1,0,["y","Y phục",["Y phục"]])}catch(e){}
function wdBagItem(k,extra){const w=WD_ITEMS[k];return Object.assign({cat:w.sl==="y"?"y":"trang",src:w.icon,src512:w.icon,name:w.n,grade:w.g|0,qty:1,lux:wdLux(k),
 tip:`${w.n} · ${wdSlN(w.sl,0)}`},extra)}
(function(){const k0=kinvItems;kinvItems=function(){const L=k0.apply(this,arguments).map(x=>WD_ITEMS[x.g.k]?Object.assign(x,wdBagItem(x.g.k,{qty:x.qty,tip:`${WD_ITEMS[x.g.k].n}${x.qty>1?" ×"+x.qty:""} · ${wdSlN(WD_ITEMS[x.g.k].sl,0)}`})):x);
  try{const w=wdOf(S);const W=["tram","y"].filter(sl=>w[sl]&&WD_ITEMS[w[sl].k]).map(sl=>wdBagItem(w[sl].k,{id:-1,g:{k:w[sl].k,i:-1,n:1,w:1,wdSlot:sl},on:true,onText:"Đang mặc"}));
   const P=(S.wdPawn||[]).map((x,i)=>x&&x.e&&WD_ITEMS[x.e.k]?wdBagItem(x.e.k,{id:-1,g:{k:x.e.k,i:-1,n:1,wdPawn:i},mark:["đang cầm","n"]}):null).filter(Boolean);
   return W.concat(L,P)}catch(e){console.error(e);return L}}})();
/* the item panel of a WD item / a fabric */
function wdEntryOf(g){if(g.wdSlot)return wdOf(S)[g.wdSlot];if(g.wdPawn!=null)return ((S.wdPawn||[])[g.wdPawn]||{}).e;return S.inv[g.i]}
/* wdItemLists(e,o) → {gr, D, M, G, lux, from, known} (KIT §70 kitItemDetail composes them; wdItemRowsE = the old 4-row block) */
function wdItemLists(e,o){o=o||{};const w=wdItem(e);if(!w)return null;const gr=KIT_GRADE[w.g|0];const D=[],M=[],G=[];const fx=plainFx(w.w);
 D.push(w.sl==="hd"?`${wdSlN("hd",3)}: đặt khéo thì dung nhan thêm phần, xa xỉ cộng vào tổng`:`${wdSlN(w.sl,3)}: ${fx||"giản dị, không thêm"}`);
 const known=wdKnowsE(e);if(known&&wdP(e,S)>wdPOf(S)&&!(w.nt&&e.own))M.push("đồ phẩm trên ngươi: dễ bị hặc");if(w.nt)M.push("mất, làm vỡ là tội bất kính");
 if(e.h&&e.gh)M.push("không phải đồ của ngươi");
 G.push(known?`đồ phẩm ${wdPName(wdP(e,S))}`:"chưa rõ phẩm");const from=wdSrcTxt(e)||"";
 if(o.pawn)G.push(`cầm cố: còn ${Math.max(0,o.pawn.due-wk())} tuần để chuộc`);if(w.note)G.push(w.note);
 return{gr,D,M,G,lux:wdLux(w.k),from,known}}
function wdItemRowsE(e,o){const L=wdItemLists(e,o);if(!L)return"";const G=[`xa xỉ ${L.lux}`].concat(L.G,L.from?[L.from]:[]);
 return kitRows([["Phẩm",`<span class="ef n" style="color:${L.gr.c};font-weight:700">${L.gr.n}</span>`],["Được",L.D,"g"],["Mất",L.M,"r"],["Ghi chú",G,"n"]])}
function wdActBtns(e,g){const w=wdItem(e);if(!w)return[];const B=[];const ag=wdAgent(S);const sl=w.sl;
 if(g.wdPawn!=null){const P=S.wdPawn[g.wdPawn];B.push(pbtn(`data-wd="redeem" data-i="${g.wdPawn}"`,"Chuộc lại",`tốn: ${BAL.btn.wdTrade.k} khắc, Bạc -${P.back} · thành: món đồ về lại rương`,S.bac<P.back?`thiếu bạc (cần ${P.back})`:whyTime(BAL.btn.wdTrade.k)));return B}
 if(g.wdSlot){if(sl==="tram")B.push(pbtn(`data-wd="off" data-sl="tram"`,"Tháo trâm","thành: cất vào rương, để tóc trơn",""));return B}
 const ix=g.i;if(sl!=="hd")B.push(pbtn(`data-wd="wear" data-ix="${ix}"`,wdSlN(sl,1),`tốn: ${BAL.btn.wear.k} khắc · thành: vào ô ${wdSlN(sl,2)}, ${plainFx(w.w)||"giản dị"}`,whyTime(BAL.btn.wear.k)));
 B.push(pbtn(`data-kinvact="gift" data-ix="${ix}"`,"Tặng",`tốn: ${BAL.btn.give.k} khắc · thành: chọn người nhận`,w.nt?"đồ ngự tứ: không được đem tặng":whyTime(BAL.btn.give.k)));
 const ntWhy=w.nt?"đồ ngự tứ: bán, cầm là bất kính":"",agWhy=ag?"":"chưa có ma ma hay thái giám tin cẩn";const pr=w.pr||0;
 const lo=Math.round(pr*WD.sellLo/100),hi=Math.round(pr*WD.sellHi/100),pct=ag?wdSellPct(S,ag):0;
 B.push(pbtn(`data-wd="sell" data-ix="${ix}"`,"Bán lén",`${word(100-wdLeak(S,ag))} · tốn: ${BAL.btn.wdTrade.k} khắc · thành: Bạc +${ag?Math.round(pr*pct/100):lo+"–"+hi} · kèm: lộ ra thì mang tiếng túng thiếu, Danh -${WD.sellDanh}`,ntWhy||agWhy||whyTime(BAL.btn.wdTrade.k)));
 B.push(pbtn(`data-wd="pawn" data-ix="${ix}"`,"Cầm cố",`${word(100-wdLeak(S,ag,true))} · tốn: ${BAL.btn.wdTrade.k} khắc · thành: Bạc +${Math.round(pr*WD.pawnPct/100)}, chuộc lại ${Math.round(pr*WD.redeemPct/100)} bạc trong ${WD.pawnWeeks} tuần · kèm: lộ ra thì Danh -${WD.sellDanh}`,ntWhy||agWhy||whyTime(BAL.btn.wdTrade.k)));
 return B}
function wdOpen(x){const g=x.g,e=wdEntryOf(g),w=wdItem(e);if(!w)return;const B=wdActBtns(e,g);const pawn=g.wdPawn!=null?S.wdPawn[g.wdPawn]:null;
 const F=[];if(g.n>1)F.push(`Trong rương: ${g.n} món.`);if(g.wdSlot)F.push("Ngươi đang mặc.");if(g.wdSlot==="y")F.push("Muốn thay, chạm ô Y phục ở Đang mang rồi chọn bộ khác.");
 kitModal({kind:"info",title:w.n,sub:`${wdSlN(w.sl,0)} · ${KIT_GRADE[w.g|0].n}`,
  itemPic:kitItem({src:w.icon,name:"",grade:w.g,size:"lg",qty:g.n,lux:wdLux(w.k)}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${wdItemRowsE(e,{pawn})}</div>${F.length?kitFacts(F):""}${B.length?`<div class="rbtn kinvacts">${B.join("")}</div>`:""}`,btn:"Lui"})}
function wdFabOpen(x){const g=x.g,it=itm(g.k),gk=wdFabOf(g.k),w=WD_ITEMS[gk];const B=[];const i=g.i;
 B.push(pbtn(`data-kinvact="use" data-ix="${i}"`,"May áo",`thành: ${w.n} vào ô Y phục, ${plainFx(w.w)||"giản dị"} · kèm: áo đang mặc cất vào rương`,""));
 B.push(pbtn(`data-kinvact="gift" data-ix="${i}"`,"Tặng",`tốn: ${BAL.btn.give.k} khắc · thành: chọn người nhận`,whyTime(BAL.btn.give.k)));
 if(it.pr)B.push(pbtn(`data-kinvact="sell" data-ix="${i}"`,"Bán",`thành: Bạc +${Math.floor(it.pr/2)}`,""));
 const gr=KIT_GRADE[x.grade|0];const rows=kitItemRows(g.k,{e:S.inv[i]});const fr="";/* origin: the Lai lịch row (KIT §70) */
 kitModal({kind:"info",title:it.n,sub:it.kd,itemPic:kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"lg",qty:g.n}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${rows}</div>${g.n>1||fr?kitFacts([g.n>1?`Trong rương: ${g.n} món.`:"",fr?fr+".":""].filter(Boolean)):""}<div class="rbtn kinvacts">${B.join("")}</div>`,btn:"Lui"})}
(function(){const o0=kinvOpen;kinvOpen=function(x){try{if(x&&x.g&&WD_ITEMS[x.g.k])return wdOpen(x);if(x&&x.g&&IT[x.g.k]&&itm(x.g.k).dr&&wdFabOf(x.g.k))return wdFabOpen(x)}catch(e){console.error("wdOpen",e)}return o0.apply(this,arguments)}})();
/* a [data-wd] act inside an item panel closes the panel first (like jinv's [data-kinvact]) */
addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-wd]");if(!b||b.disabled)return;if(b.closest("#mb,.dlg,.modal")){try{if(Q.length)closeModal()}catch(e){}}},true);

/* 8. "Đang mang": Cài tóc / Y phục read the WD slots */
function wdSlotItem(sl){const e=wdOf(S)[sl],w=wdItem(e);if(!w)return null;return{e,w,item:{src:w.icon,name:w.n,grade:w.g|0,lux:wdLux(w.k),tip:`${sl==="tram"?"Cài tóc":"Y phục"}: ${w.n}`}}}
function wdStatusChip(){try{const lab=wdKnownStatus(S);if(lab)return kitChip(`Đã biết: ${WD_LABEL[lab]}`,lab==="ok"?"ok":"no");
 const s=S.wdSelf&&S.wdSelf.it===wdCur(S)?S.wdSelf:null;if(s)return kitChip(`Lời ${s.by}: ${WD_LABEL[s.st]}, chưa chắc`,"n")}catch(e){}return""}
(function(){const t0=keqTT;keqTT=function(){const html=t0.apply(this,arguments);try{const o=KEQ.reg.tutrang;if(!o)return html;
  for(const x of o.slots){const sl=x.k==="hair"?"tram":x.k==="dress"?"y":null;if(!sl)continue;const s=wdSlotItem(sl);x.wd=sl;x.ix=-1;x.note="";
   x.ghost=sl==="tram"?keqArt("tramngoc")||"img/wd-tramngoc.webp":(WD_ITEMS.y_luamoc?WD_ITEMS.y_luamoc.icon:x.ghost);
   if(!s){x.item=null;x.mini="";continue}x.item=s.item;const fx=Object.entries(s.w.w||{}).filter(([a,v])=>v).map(([a,v])=>[NAMES[a]||a,v]);
   x.mini=fx.length?fx.map(([a,v])=>kitChip(a,v)).join(""):`<span class="keqm">giản dị</span>`}
  const wb=wearBonus(S),C=[],ws=wb.sac-(wb.shSac||0)/* worn only: the shelf set Sắc is not worn */;if(ws)C.push(["Sắc",ws]);if(wb.danh)C.push(["Danh",wb.danh]);const vp=wdVpSeen();
  const sum=(C.length?kitChips(C):`<span class="past">chưa mang gì: không thêm</span>`)+kitLuxChip(luxOf(S))+wdStatusChip()+(vp?kitChip(`${vp} món vượt phẩm: dễ bị tố`,"no"):"");
  return kitEquipSlots({key:"tutrang",title:"Đang mang",slots:o.slots,sum,onPick:keqPick,col:true})}catch(e){console.error("keqTT wd",e);return html}}})();
function wdSlotOpen(x){const sl=x.wd;const s=wdSlotItem(sl);const seen=new Set();
 const T=(S.inv||[]).map((e,i)=>[e,i]).filter(([e])=>e&&!e.h&&wdItem(e)&&wdItem(e).sl===sl&&!seen.has(e.k)&&seen.add(e.k)).map(([e,i])=>{const w=wdItem(e);
  return kitItem({src:w.icon,name:w.n,grade:w.g,size:"md",label:[wdKnowsE(e)?"đồ phẩm "+wdPName(wdP(e,S)):(plainFx(w.w)||"giản dị"),"n"],data:`data-kid="${e.k}" data-kix="${i}" data-kidpick="wear" role="button" tabindex="0"`,
   tip:`${sl==="tram"?"Cài":"Mặc"}: ${w.n} · ${plainFx(w.w)||"giản dị"} · tốn ${BAL.btn.wear.k} khắc`})});
 if(sl==="y"){const fs=new Set();(S.inv||[]).forEach((e,i)=>{const it=e&&IT[e.k];if(!it||e.h||!it.dr||fs.has(e.k))return;fs.add(e.k);const g=wdFabOf(e.k);if(!g)return;let a=null;try{a=itemArt(e.k)}catch(x){}
  T.push(kitItem({src:a?a.src:keqArt(e.k),name:it.n,grade:a?a.grade:0,size:"md",label:["may áo","n"],data:`data-kid="${e.k}" data-kix="${i}" data-kidpick="use" role="button" tabindex="0"`,tip:`May áo: ${WD_ITEMS[g].n}`}))})}
 const B=[];if(s&&sl==="tram")B.push(pbtn(`data-wd="off" data-sl="tram"`,"Tháo trâm","thành: cất vào rương, để tóc trơn",""));
 B.push(pbtn(`data-wd="auto"`,"Tự chọn đồ",`${word(wdAutoOdds())} · thành: thay ngay bộ ngươi cho là hợp phẩm · kèm: có thể trúng bộ sai phẩm (${wdUnknownN()} món chưa rõ phẩm)`,""));
 B.push(pbtn(`data-wd="groom"`,"Chải chuốt",`tốn: ${BAL.btn.groom.k} khắc · thành: trò chải chuốt ${WD.groomSec} giây, kim dừng giữa là đúng phẩm · kèm: cao quá thành vượt phẩm, thấp quá thành quá giản dị`,whyTime(BAL.btn.groom.k)));
 const st=wdStatusChip();
 kitModal({kind:"info",title:`Ô ${x.label.toLowerCase()}`,sub:s?s.w.n:"trống",
  itemPic:kitItem(s?{src:s.w.icon,name:"",grade:s.w.g,size:"lg",lux:wdLux(s.w.k)}:{empty:true,ghost:x.ghost,size:"lg",name:""}).replace('<span class="kitn"></span>',''),
  html:(s?`<div class="kinvrows">${wdItemRowsE(s.e)}</div>`:"")+(st?`<p>${st}</p>`:"")+
   (T.length?`<p class="past">Chạm một món để xem rồi ${sl==="tram"?"cài":"thay"} (${BAL.btn.wear.k} khắc).</p><div class="keqpick">${T.join("")}</div>`
    :kitFacts([sl==="tram"?"Rương chưa có trâm cài nào khác.":"Rương chưa có y phục hay vải nào khác.","Nhờ thái giám mua đồ, hoặc chờ được ban thưởng."]))+
   `<div class="rbtn kinvacts">${B.join("")}</div>`,btn:"Lui"})}
(function(){const p0=keqPick;keqPick=function(x){if(x&&x.wd)return wdSlotOpen(x);return p0.apply(this,arguments)}})();
window.wdLux=wdLux;window.wdSew=wdSew;
