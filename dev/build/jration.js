/* ================= jration: PHẤN SON THEO LỆ — the monthly cosmetics ration (owner PARKING_LOT #5 17/11 ~08:15Z + OD 17/11 ~08:25Z) =================
   Design input: dev/handover/reports/monthly-ration-history.md + item-list-ration.md (Foreman B research). Numbers: BAL.ration (ONE CORE).
   Builds on what exists (PRIORITY #1): the monthly goods of jstip (BAL.stip, stipList / stipGoods, skimming, NPC rule, kitReward chest),
   the ONE bag p.inv (no second inventory), the makeup mirror of jtoil (colour picks TOIL_COL = the palette, levels BAL.toil.tier),
   TAINT (j8), bestow (j8), talkOpts (j2: visit cards), the hàng rong (SHOP_ALL).
   1. ITEMS: one item per (part × tier): part = the four palette rows of the mirror (may = mày, son = son môi, ma = phấn má / yên chi,
      mat = phấn mắt), tier = the ONE grade ladder (Thường · Tinh phẩm · Trân phẩm · Tuyệt phẩm). Each tier has its own name.
      A piece in the bag carries its colour c (a TOIL_COL key of that part) and its lượt left u. Art: Foreman C (list in the report);
      until painted the existing Son phấn picture stands in (listed in CTM_MISSING_PICS kind "item").
   2. RATION: every month Nội vụ phủ issues BAL.ration.n boxes per rank, the parts by the month (some months mày + son, others má + mắt),
      the tier by rank (BAL.ration.tier), the colour as it comes (hash: "phát hộp màu đó thì xài màu đó"). Through stipList, so the
      skimming of jstip (one tier worse or missing), the rank text and the chest all cover it. Low ranks get little (owner: accepted).
   3. USE: one makeup a day (unchanged). The mirror shows only the colours she owns (kitSwatches rows filtered, no new kit part);
      a part she lacks caps the face (BAL.ration.cap by parts owned; none = mặt mộc only). Each sitting spends lượt from each part's box:
      BAL.ration.use by the level (Mặt mộc 0 · Vụng về / Đoan trang 1 · Kiều diễm / Khuynh thành 2) + BAL.ration.bold for Kiểu cầu kỳ.
   4. ROADS when a box runs out: mua gấp (mirror, Nội vụ phủ, price × BAL.ration.rush), hàng rong (shop), mượn a consort (her thiện cảm,
      nết, ghen, whim of the day), xin Hoàng hậu / Thái hậu, lấy trộm from a rival's chest (caught: Danh, Đức, oán, bổng bị khất).
      Two-way: NPCs spend, run out, buy, borrow (also from her, an event she answers) and steal (also from her: she always gets a notice).
   5. POISON: cosmetics join TAINT (pha chì; new: trộn bột ngứa → allergy, Sắc down) — the existing taint / plant / gift / Thái y roads.
   6. TRIBUTE: on a bestowal for a promotion, a son, a contest, Vạn thọ, Hoàng thượng may add a tribute cosmetic (Tuyệt phẩm, e.g. Loa tử đại);
      the others' ghen rises. NPCs the same.
   BAL.ration.on = false turns the whole system off (full palette, nothing spent). ============ */
Object.assign(BAL,{ration:{on:true,
 parts:["may","son","ma","mat"],       /* the four palette rows of the mirror (TOIL_COL), in the order the months rotate them */
 n:[2,2,2,2,2,2,2,2],                  /* boxes issued a month by rank (Đáp ứng … Hoàng hậu): the same count — balance law OD 17/11 08:25Z (C) */
 tier:[0,0,0,1,1,2,2,2],               /* their tier by rank: finer grade, not more boxes */
 uses:[6,6,6,6],                       /* lượt in a full box: the SAME at every tier (balance law C: the tier is a finer look and a dearer box, never more lần) */
 price:[8,16,30,60],                   /* the floor price of a box by tier (Nội vụ phủ, hàng rong; sell back = half, issued = jstip resell) */
 buyK:.2,                              /* law C: she pays at least buyK × her monthly bổng (BAL.pay[rank]) for a box: "giá theo thể diện người mua" (lxPrice) — the same weight at every rank, like BAL.thy.cost */
 use:{moc:0,vung:1,vua:1,dep:2,tuyet:2},bold:1,  /* lượt per part per sitting by level; +bold for Kiểu cầu kỳ (owner table 08:25Z D) */
 cap:["moc","vua","vua","dep","tuyet"],/* the best face by how many parts she has (0..4) */
 rush:1.5,                             /* mua gấp at the mirror: a box of her rank's tier, lxPrice × rush */
 shop:[0,1],                           /* tiers the hàng rong carries */
 coldTier:0,coldN:1,                   /* lãnh cung: one Thường box a month */
 borrow:{base:25,aff:2,ghen:10,whim:20,fail:-2,spare:2,trait:{"Ân cần":15,"Khiêm nhường":10,"Kín đáo":0,"Xảo quyệt":-5,"Tham vọng":-10,"Kiêu ngạo":-15}},
 beg:{hh:15,th:10,stat:2,fail:-3,cd:2},/* xin Hoàng hậu / Thái hậu: base + stat/2 (jveil xin road); fail costs favour; once per cd months */
 steal:{danh:-4,duc:-2,oan:10,cut:1,add:10},/* caught stealing: Danh, Đức, the victim's oán, bổng khất 1 month; odds = plant odds + add */
 npc:{use:3,buy:50},/* NPC month: lượt spent per part; chance to buy when out (borrow / beg / steal / ask her = day-plan choices, jagacts4); (her «Chia» answer: jrcv RCVK.rougeBorrow, the asker quý BAL.rcv.help.af) */
 allergy:{rel:2,chiW:[.3,.45,.25],nguaW:[.2,.45,.35]},/* a tainted box at the sitting → the ONE rash system (jrash rashGive: timed, picture, Thái y): severity weights for pha chì / bột ngứa; the first use of a clean box rolls RASH.cos like any son phấn; rel = her oán toward the one who tainted it */
 tribute:{ch:{promo:60,son:60,contest:35,birthday:50,sinhthan:50,night:5},ghen:3}}});
const LX_KD="Son phấn";
const LX_N={may:["Than liễu","Thanh đại","Họa mi đại","Loa tử đại"],son:["Son sáp","Son hoa hồng","Son điểm giáng","Son thiên chu cống"],
 ma:["Yên chi giấy","Yên chi bánh","Yên chi hoa hồng","Yên chi tiến cống"],mat:["Phấn gạo","Phấn hoa lài","Phấn ngọc trâm","Phấn trân châu ngự"]};
const LX_PART={may:"kẻ mày",son:"tô son",ma:"đánh má",mat:"phấn mắt"};
/* law C (OD 17/11 08:25Z C): a box costs at least BAL.ration.buyK of the buyer's bổng — high ranks pay as much of their purse as low ranks */
function lxPrice(p,t){const B=BAL.ration;const f=B.price[Math.max(0,Math.min(3,t|0))];if(!p||p.out)return f;const r=Math.max(0,Math.min(7,(typeof rkOf==="function"?rkOf(p):p.rank)|0));return Math.max(f,Math.ceil(BAL.pay[r]*B.buyK))}
function lxTierOf(p){return BAL.ration.tier[Math.max(0,Math.min(7,(typeof rkOf==="function"?rkOf(p):p.rank)|0))]}
function lxKeys(){const K=[];for(const part of BAL.ration.parts)for(let t=0;t<4;t++)K.push(lxKey(part,t));return K}
function lxKey(part,t){return "lx"+part+t}
function lxOf(k){const m=/^lx(may|son|ma|mat)([0-3])$/.exec(String(k||""));return m?{part:m[1],t:+m[2]}:null}
function lxOn(){return !!(BAL.ration&&BAL.ration.on)}
/* ---------- the items (into IT: the ONE item table) ---------- */
(function(){const B=BAL.ration;for(const part of B.parts)for(let t=0;t<4;t++){const k=lxKey(part,t);if(IT[k])continue;
  const lb=TOIL_COL[part].label.toLowerCase();IT[k]={n:LX_N[part][t],kd:LX_KD,d:`Hộp ${lb} dùng khi điểm trang${LX_PART[part]===lb?"":` (${LX_PART[part]})`}: dùng được ${B.uses[t]} lần · tặng, bán được`,tg:["rv"],lx:1};
  /* the price reads lxPrice at every use (shop, buy, sell, gift value): ONE number for each place */Object.defineProperty(IT[k],"pr",{get(){return lxPrice(typeof S!=="undefined"?S:null,t)},enumerable:true,configurable:true})}
 try{if(BAL.priceTier)for(const part of B.parts)for(let t=0;t<4;t++){const k=lxKey(part,t);if(BAL.priceTier[k]==null)BAL.priceTier[k]=B.price[t]}}catch(e){}
 /* LUẬT SỬA CẢ NHÓM: the old single "Son phấn Dương Châu" (sonphan) is folded into this family: every old piece becomes a Thường son box
    (IT_ALIAS: itClean renames it on load, taint kept); every giver (shop, bestow, gifts, contests, themes) now names lx boxes (dev/test/sonphan-scan.py) */
 try{if(typeof IT_ALIAS==="object")IT_ALIAS.sonphan=lxKey("son",0)}catch(e){}
 try{if(typeof STIP_UNIT==="object")for(const part of B.parts)for(let t=0;t<4;t++)STIP_UNIT[lxKey(part,t)]="hộp"}catch(e){}
 try{if(typeof SHOP_ALL==="object")for(const part of B.parts)for(const t of B.shop)SHOP_ALL.push(lxKey(part,t))}catch(e){}
 try{if(typeof TAINT==="object"){const K=[];for(const part of B.parts)for(let t=0;t<4;t++)K.push(lxKey(part,t));
   TAINT.chi.on=TAINT.chi.on.filter(k=>k!=="sonphan").concat(K);if(!TAINT.ngua)TAINT.ngua={n:"trộn bột ngứa",on:K,need:"botngua",c:0,hurt:"người dùng nổi mẩn, Sắc giảm"}}}catch(e){}
 try{if(typeof BAL.stip==="object"&&BAL.stip.down)for(const part of B.parts)for(let t=0;t<4;t++)BAL.stip.down[lxKey(part,t)]=t>0?lxKey(part,t-1):null}catch(e){}})();
/* art: until Foreman C paints img/item-lx<part><t>.webp, the existing Son phấn picture at the right grade (LX_ART lists the painted keys) */
const LX_ART={};
(function(){if(typeof itemArt!=="function")return;const a0=itemArt;itemArt=function(key,tier){const k=key&&typeof key==="object"?key.k:key;const r=lxOf(k);if(!r)return a0.apply(this,arguments);
  if(LX_ART[k])return{key:k,src:`img/item-${k}.webp`,src512:`img/item512/item-${k}.webp`,grade:r.t,gradeName:ITEM_GRADE[r.t]};
  try{window.CTM_MISSING_PICS=window.CTM_MISSING_PICS||[];if(!CTM_MISSING_PICS.some(x=>x.kind==="item"&&x.id===k))CTM_MISSING_PICS.push({kind:"item",id:k,title:IT[k].n})}catch(e){}
  const s=a0("sonphan");return s?{key:k,src:s.src,src512:s.src512,grade:r.t,gradeName:ITEM_GRADE[r.t],ph:1}:null};window.itemArt=itemArt})();
/* ---------- a piece: colour + lượt (old saves, gifts, shop, stolen goods: filled on first sight) ---------- */
function lxHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function lxFix(p){if(!p||!p.inv)return;let i=0;for(const e of p.inv){if(e&&e.k==="sonphan")e.k=lxKey("son",0);const r=e&&lxOf(e.k);if(!r){i++;continue}const L=TOIL_COL[r.part].L;
  if(!e.c||!L.some(x=>x[0]===e.c))e.c=L[lxHash(`${p.id!=null?p.id:"me"}:${S.turn}:${r.part}:${i}`)%L.length][0];
  if(typeof e.u!=="number"||!(e.u>=0))e.u=BAL.ration.uses[r.t];i++}}
function lxBoxes(p,part){lxFix(p);return (p&&p.inv||[]).filter(e=>{const r=e&&lxOf(e.k);return r&&r.part===part&&e.u>0&&!e.h})}
function lxHas(p,part){return lxBoxes(p,part).length>0}
function lxCount(p){return BAL.ration.parts.filter(x=>lxHas(p,x)).length}
function lxMiss(p){return BAL.ration.parts.filter(x=>!lxHas(p,x))}
function lxColName(part,c){const e=TOIL_COL[part].L.find(x=>x[0]===c);return e?e[2]:""}
function lxName(e){const r=lxOf(e&&e.k);return r?`${IT[e.k].n} (${lxColName(r.part,e.c)})`:iname(e)}
/* ---------- 2. the monthly ration: added to the rank's goods (jstip stipList) ---------- */
function lxMonthParts(n){const P=BAL.ration.parts,m=Math.max(0,((S&&S.month)||1)-1),L=[];for(let i=0;i<Math.min(n,P.length);i++)L.push(P[(m*n+i)%P.length]);return L}
function lxLines(r,out){const B=BAL.ration;r=Math.max(0,Math.min(7,r|0));const t=out?B.coldTier:B.tier[r],n=out?B.coldN:B.n[r];return lxMonthParts(n).map(part=>[lxKey(part,t),1])}
(function(){if(typeof stipList!=="function")return;const l0=stipList;stipList=function(r,out){const L=l0.apply(this,arguments);try{if(lxOn())L.push(...lxLines(r,out))}catch(e){console.error("rt list",e)}return L}})();
/* NPC month order (review fix 5): the past month's sittings are spent BEFORE the new issue, so a box is not used up the moment it arrives; the roads (buy / borrow / ask / steal) after it */
(function(){if(typeof stipGoods!=="function")return;const g0=stipGoods;stipGoods=function(p){try{if(p&&p!==S&&lxOn())lxNpcSpend(p)}catch(e){console.error("rt spend",e)}const G=g0.apply(this,arguments);try{lxFix(p);if(p!==S&&lxOn())lxNpcMonth(p)}catch(e){console.error("rt goods",e)}return G};window.stipGoods=stipGoods})();
/* the first sight (new life, old save): Nội vụ phủ's issue of her rank once, so the mirror is not empty on day one */
function lxInit(p){if(!p||!lxOn()||p.lxInit)return;p.lxInit=1;p.inv=p.inv||[];for(const [k] of lxLines(rkOf(p),!!p.out))p.inv.push({k,from:"noivu",d:S.turn});
 for(const part of BAL.ration.parts)if(!lxHas(p,part)&&!p.out){const k=lxKey(part,BAL.ration.tier[Math.min(7,rkOf(p))]);p.inv.push({k,from:"noivu",d:S.turn})}lxFix(p)}
function lxInitAll(){try{if(!S||S.dead||!lxOn())return;if(typeof isSrv==="function"&&isSrv())return;lxInit(S);if(typeof mlGuest==="function"&&mlGuest())return;for(const v of consorts())if(v!==S&&v.alive!==false)lxInit(v)}catch(e){console.error("lxInit",e)}}
/* ---------- 3. the sitting: cap by the parts she has, spend lượt (her: the colours she picked; NPC / bot: any box of the part) ---------- */
function lxLvIx(k){return TOIL_LVS.indexOf(TOIL_OLDLV[k]||k)}
function lxCapRec(p,rec){if(!lxOn()||!rec||!rec.makeup)return rec;const n=lxCount(p),cap=BAL.ration.cap[n];rec.lxCap=cap;
 /* review fix 1: the parts she does not own are not painted (col.no, honoured by jtoil toilMkLayer / toilMkDraw / toilMakeupSvg) */const M=lxMiss(p);rec.col=rec.col||{};if(M.length)rec.col.no=M.slice().sort();else delete rec.col.no;
 /* r6 (merge with main's "Điểm trang nhanh", which skips the mirror): every painted part wears a colour she OWNS */for(const part of BAL.ration.parts){const L=lxBoxes(p,part);if(L.length&&!L.some(e=>e.c===rec.col[part]))rec.col[part]=L.slice().sort((a,b)=>b.u-a.u)[0].c}
 if(cap==="moc"){rec.makeup=false;rec.look=null;return rec}const mk=toilMk(rec);if(mk==="vung"||lxLvIx(mk)<=lxLvIx(cap))return rec;
 const T=BAL.toil.tier,top={vung:T[0]-1,vua:T[1]-1,dep:T[2]-1}[cap];if(top!=null){rec.score=Math.min(rec.score|0,top);rec.look=toilTier(rec.score)}return rec}
function lxSpend(p,rec,col){const B=BAL.ration,out={used:[],gone:[],taint:null};if(!lxOn()||!rec||!rec.makeup)return out;const mk=toilMk(rec);
 const u0=B.use[mk]||0;if(!u0)return out;const per=u0+(col&&col.want==="diem"?B.bold:0);
 for(const part of B.parts){const L=lxBoxes(p,part);if(!L.length)continue;const c=col&&col[part];const e=L.find(x=>x.c===c)||L.slice().sort((a,b)=>a.u-b.u)[0];
  const fresh=e.u>=B.uses[lxOf(e.k).t];const n=Math.min(per,e.u);e.u-=n;out.used.push({part,e,n});if(e.t==="ngua"||e.t==="chi")out.taint=e;else if(fresh&&!out.cos&&typeof RASH==="object"&&roll(RASH.cos))out.cos=e;if(e.u<=0){typeof ilUsedUp==="function"&&ilUsedUp(e,p);p.inv.splice(p.inv.indexOf(e),1);out.gone.push(e)}}
 if(out.taint||out.cos)out.rash=lxAllergy(p,out.taint||out.cos,!out.taint);return out}
/* review fix 3: ONE allergy system — the rash of jrash (rashGive: timed, its picture, Thái y / thảo mộc card, Sắc by severity). A pha chì box also hurts its user
   through taintHit (j8, the same as every lead-tainted item); bột ngứa only through the rash; an ordinary new box: RASH.cos, severity 1 ("son phấn không hợp") */
function lxAllergy(p,e,plain){const A=BAL.ration.allergy;if(typeof rashGive!=="function")return"";const by=!plain&&e.by&&typeof byKey==="function"?byKey(e.by):null;
 if(!plain&&e.t==="chi"&&typeof taintHit==="function")taintHit(p,e,true);
 const sev=plain?1:rashPick(e.t==="ngua"?A.nguaW:A.chiW);const t=rashGive(p,sev,plain?"son phấn không hợp":`thoa ${IT[e.k].n} bị ${TAINT[e.t].n}`,by);
 if(!plain&&by&&by!==p)try{if(p===S)oanAdd(S,by,A.rel)}catch(x){}
 if(!plain&&p!==S&&by===S)try{newsAdd(p,"lx",`${rkName(p)} ${p.name} nổi mẩn đỏ khắp mặt sau khi điểm trang`,true)}catch(x){}return t}
/* her sitting (toilFinish / toilAuto call this right after the record is made) */
function lxSit(p,rec){try{if(!lxOn()||!rec)return null;lxCapRec(p,rec);const R=lxSpend(p,rec,rec.col||(TOIL.st&&TOIL.st.col));rec.lx={cap:rec.lxCap,n:R.used.reduce((a,x)=>a+x.n,0),gone:R.gone.map(e=>e.k)};
  if(p===S&&!window.__bot&&R.gone.length)log(`Dùng hết ${R.gone.map(lxName).join(", ")}.`);return R}catch(e){console.error("lxSit",e);return null}}
/* NPC face of the day: capped by her boxes (spent at the month tick, lxNpcMonth) */
function lxNpcCap(v,rec){try{return lxOn()&&v&&v!==S&&!v.coop?lxCapRec(v,rec):rec}catch(e){return rec}}
/* ---------- the mirror: only the colours she owns (kitSwatches rows filtered), what is missing, mua gấp ---------- */
function lxColRows(rows){if(!lxOn())return rows;const own={};for(const part of BAL.ration.parts)own[part]=lxBoxes(S,part);
 return rows.map(r=>{if(/^pre-/.test(r.k)){const it=r.items.filter(i=>{const x=TOIL_PRE.find(y=>y[0]===i.k);return x&&BAL.ration.parts.every(part=>own[part].some(e=>e.c===x[4][part]))});return it.length?Object.assign({},r,{items:it}):null}
  const L=own[r.k];if(!L)return r;const it=r.items.filter(i=>L.some(e=>e.c===i.k)).map(i=>{const E=L.filter(e=>e.c===i.k);const u=E.reduce((a,e)=>a+e.u,0);return Object.assign({},i,{name:`${i.name} · ${E.map(e=>IT[e.k].n).join(", ")}, còn ${u} lần dùng`})});
  return it.length?Object.assign({},r,{items:it}):null}).filter(Boolean)}
function lxColPick(col){if(!lxOn()){delete col.no;return col}const M=lxMiss(S);if(M.length)col.no=M.slice().sort();else delete col.no;for(const part of BAL.ration.parts){const L=lxBoxes(S,part);if(L.length&&!L.some(e=>e.c===col[part]))col[part]=L.slice().sort((a,b)=>b.u-a.u)[0].c}
 if(col.want==="diem"&&!lxColRows([{k:"pre-diem",items:TOIL_PRE.filter(x=>x[2]==="diem").map(x=>({k:x[0]}))}]).length)delete col.want;return col}
function lxRushCost(){const B=BAL.ration;return lxMiss(S).length*Math.ceil(lxPrice(S,lxTierOf(S))*B.rush)}
function lxMirrorNote(){if(!lxOn())return"";const M=lxMiss(S),n=lxCount(S),cap=BAL.ration.cap[n];
 const R=[["Son phấn",n?`${n} trong ${BAL.ration.parts.length} thứ còn dùng được`:"không còn hộp nào"]];
 if(M.length)R.push(["Thiếu",M.map(x=>TOIL_COL[x].label).join(", "),"r"],["Dung nhan",cap==="moc"?`chỉ để ${toilMkW("moc")}`:`đẹp nhất ${TOIL_MK[cap]}`,"r"],["Đường kiếm",`mua gấp ở Nội vụ phủ, hàng rong, mượn phi tần khi đến chơi, xin Hoàng hậu hay Thái hậu`,"n"]);
 return `<div class="kgr">${kitRows(R)}</div>`}
function lxRushBtn(){if(!lxOn()||!lxMiss(S).length)return"";const c=lxRushCost(),ok=(S.bac||0)>=c;
 return `<button class="${kg82Btn(true)}" id="lxrush"${ok?"":" disabled"}>Mua gấp son phấn còn thiếu<small>Bạc -${c}${ok?"":" · không đủ bạc"}</small></button>`}
function lxRush(){const c=lxRushCost();if(!lxOn()||(S.bac||0)<c)return;const M=lxMiss(S);apply({bac:-c});const t=lxTierOf(S);const E=M.map(part=>{const e={k:lxKey(part,t),from:"buy",d:S.turn};S.inv.push(e);return e});lxFix(S);
 log(`Ngươi sai người mua gấp ở Nội vụ phủ: ${E.map(lxName).join(", ")}. Bạc -${c}.`);try{save()}catch(e){}}
/* ---------- 4. roads: borrow (rival visit), beg (Hoàng hậu / Thái hậu), steal (a rival's chest) ---------- */
function lxLend(v,part){const L=lxBoxes(v,part);if(!L.length)return null;const tot=L.reduce((a,e)=>a+e.u,0);return tot>=BAL.ration.borrow.spare?L.slice().sort((a,b)=>b.u-a.u)[0]:null}
function lxBorrowOdds(v,p){p=p||S;const B=BAL.ration.borrow;let o=B.base+Math.round(aff(v,p)/B.aff)-Math.round((v.ghen||0)/B.ghen);for(const t of traitsOf(v))o+=B.trait[t]||0;
 o+=Math.round((lxHash(`${v.id}:${toilWk()}`)%(2*B.whim+1))-B.whim);return cl(o,5,95)}
function lxGive(from,to,e,how){const r=lxOf(e.k);const n=typeof how==="number"?Math.max(1,Math.min(e.u,how)):how==="half"?Math.max(1,Math.ceil(e.u/2)):e.u;e.u-=n;if(e.u<=0){/* E-FIX-3: the whole rest went to the other one (g below): this box is empty, used up */typeof ilUsedUp==="function"&&ilUsedUp(e,from);from.inv.splice(from.inv.indexOf(e),1)}
 const g={k:e.k,c:e.c,u:n,from:how==="steal"?"steal":"borrow",d:S.turn};if(from!==S)g.giver=from.name;if(e.t){g.t=e.t;g.by=e.by}to.inv=to.inv||[];to.inv.push(g);return g}
/* ONE builder per road (role-parity part 2, law 1 + law 4): her talk cards (rival visit / Hoàng hậu, Thái hậu / a rival's chest) and an NPC
   consort's day-plan options cx4:rougeBorrow / rougeBeg / rougeSteal (jagacts4) — the SAME odds function of the doer, the same gain and loss.
   An NPC who asks HER is the receiver side: her answer card (lxAskHer), never a dice in her place. */
const lxNm=p=>p===S?"ngươi":p.name;
function lxBorrowCard(p,v){const M=lxMiss(p);const lend=M.map(part=>[part,lxLend(v,part)]).find(x=>x[1]);const od=lxBorrowOdds(v,p);const lbl=lend?TOIL_COL[lend[0]].label.toLowerCase():"còn thiếu";
 /* RECEIVER CHOICE (jrcv RCVK.rougeBorrow, review FAIL 6 #4): the LENDER answers with the 4 answers — an NPC lender picks (rcvPick, L1876 weights), she as the
    lender gets the card (PEND.rcvAsk). Her asking card shows the lender's willingness word (rcvWord), not odds; od stays the NPC planner's worth (p4O) */
 const ww=typeof rcvWord==="function"?rcvWord(v,p):"";
 return{n:"Mượn son phấn",o:p===S&&ww?null:od,lock:!M.length||!lend,t:!M.length?"son phấn còn đủ":"nàng không có thứ ngươi thiếu",x:`${p===S&&ww?ww:word(od)} · nàng có thể chia một nửa hộp ${lbl}, chia chút ít cho có, từ chối hoặc đem chuyện đi kể · tùy nàng quý ngươi và nết của nàng`,
  run:()=>{if(!lend)return"";if(typeof rcvAsk==="function")return rcvAsk("rougeBorrow",p,v,lend[0])||"";
   if(roll(od)){const g=lxGive(v,p,lend[1],"half");if(p!==S)lxFix(p);return `${v.name} chia cho ${lxNm(p)} ${lxName(g)} (${g.u} lần dùng).`}affAdd(v,p,BAL.ration.borrow.fail);return `${v.name} khéo từ chối${p===S?"":" "+p.name}. Thiện cảm ${BAL.ration.borrow.fail}.`}}}
function lxBegOdds(p,kind){const B=BAL.ration.beg,hh=kind==="hh";return cl((hh?B.hh:B.th)+Math.round(((hh?p.hh:p.th)||0)/B.stat),5,95)}
function lxBegCd(p,kind){const st=p.lxBeg||{};return st[kind]!=null&&S.turn-st[kind]<BAL.ration.beg.cd}
function lxBegCard(p,kind){const B=BAL.ration.beg,hh=kind==="hh",M=lxMiss(p);const od=lxBegOdds(p,kind),cd=lxBegCd(p,kind);const nm=hh?"Hoàng hậu":"Thái hậu";const part=M[0];const t=BAL.ration.tier[Math.min(7,p.rank||0)];
 return{n:"Xin son phấn",o:od,lock:!M.length||cd,t:!M.length?"son phấn còn đủ":`vừa xin rồi, ${B.cd} tháng mới xin lại`,x:`${word(od)} · thành: ${nm} ban một hộp ${part?TOIL_COL[part].label.toLowerCase():"còn thiếu"} · hỏng: ${nm} ${B.fail}`,
  run:()=>{(p.lxBeg=p.lxBeg||{})[kind]=S.turn;if(!part)return"";
   /* RECEIVER CHOICE (jrcv RCVJ.rougeBeg, law 1): the Hoàng hậu decides — she as the Hoàng hậu gets the card, an NPC queen the same answers at these odds (the Thái hậu is NPC-only) */
   if(hh&&typeof rcvJudge==="function"&&queenP()&&queenP()!==p)return rcvJudge("rougeBeg",p,p,od);if(roll(od)){let n;if(p===S)n=goodsGive(S,lxKey(part,t),{from:kind});else{const e={k:lxKey(part,t),from:kind,d:S.turn};(p.inv=p.inv||[]).push(e);n=lxName(e)}lxFix(p);return `${nm} ban cho ${lxNm(p)} ${n}.`}
   const f=hh?{hh:B.fail}:{th:B.fail};if(p===S)apply(f);else ap(p,f);return `${nm} cho là ${lxNm(p)} không biết giữ phận. ${nm} ${B.fail}.`}}}
function lxStealOdds(p,v){return cl((typeof oPlant==="function"&&v.maid?oPlant(p,v):30)+BAL.ration.steal.add,5,95)}
function lxStealCard(p,v){const M=lxMiss(p);const L=BAL.ration.parts.map(part=>lxLend(v,part)).filter(Boolean);const od=lxStealOdds(p,v);const ST=BAL.ration.steal;
 return{n:"Lấy trộm son phấn",o:od,act:1,lock:!L.length,t:"rương nàng không có son phấn",x:`${word(od)} · thành: lấy một hộp son phấn của nàng · hỏng: bị bắt, Danh ${ST.danh}, Đức ${ST.duc}, nàng oán ${balSg(ST.oan)}, Nội vụ phủ khất bổng ${ST.cut} tháng`,
  run:()=>{if(!L.length)return"";const e=L.find(x=>M.includes(lxOf(x.k).part))||L[0];if(roll(od)){const g=lxGive(v,p,e,"all");if(p!==S)lxFix(p);
    if(v===S)lxStolenNote(p,g);else try{newsAdd(v,"lx",`${rkName(v)} ${v.name} mất một hộp son phấn trong rương`,false)}catch(x){}return p===S?`Ngươi lấy được ${lxName(g)} trong rương ${v.name}.`:`${p.name} lấy được ${lxName(g)} trong rương ${lxNm(v)}`}
   lxCaught(p,v);return p===S?`<span class="r">Ngươi bị bắt quả tang lục rương ${v.name}.</span> Danh ${ST.danh}, Đức ${ST.duc}.`:`${p.name} bị bắt quả tang lục rương ${lxNm(v)}`}}}
(function(){if(typeof talkOpts!=="function")return;const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!lxOn()||!S||S.dead||!Array.isArray(A))return A;
  if(p&&p.kind==="rival"&&p.ref&&!p.ref.coop)A.push(lxBorrowCard(S,p.ref));
  if(p&&(p.kind==="hh"||p.kind==="th"))A.push(lxBegCard(S,p.kind));
  if(p&&p.kind==="chest"&&p.ref&&!sameHouse(S,p.ref))A.push(lxStealCard(S,p.ref));
 }catch(e){console.error("rt talk",e)}return A}})();
function lxCaught(a,v){const ST=BAL.ration.steal;ap(a,{danh:ST.danh});if(typeof ducAdd==="function")ducAdd(a,ST.duc,"trộm son phấn");else ap(a,{duc:ST.duc});try{oanAdd(v,a,ST.oan)}catch(e){}a.cutPay=Math.max(a.cutPay||0,ST.cut);a.cutBy="Nội vụ phủ"}
/* ---------- NPCs: the same rule at the month tick (spend, run out → buy / borrow / steal, ask her) ---------- */
function lxNpcOk(v){return !!v&&v!==S&&!v.coop&&v.alive!==false&&!v.out&&!(typeof mlGuest==="function"&&mlGuest())}
/* the past month's sittings (BAL.ration.npc.use lượt per part), spent before the new issue */
function lxNpcSpend(v){if(!lxNpcOk(v))return;const N=BAL.ration.npc;
 for(const part of BAL.ration.parts){let left=N.use;for(const e of lxBoxes(v,part).sort((a,b)=>a.u-b.u)){const n=Math.min(left,e.u);e.u-=n;left-=n;if(e.u<=0){typeof ilUsedUp==="function"&&ilUsedUp(e,v);v.inv.splice(v.inv.indexOf(e),1)}if(!left)break}}}
/* after the issue: a part still missing → buy at her own rank's price (law C). Borrow / ask her / beg / steal are no longer monthly dice:
   they are the NPC's own day-plan choices with the player's odds (jagacts4 cx4:rouge*, role-parity part 2, canon overwrite). */
function lxNpcMonth(v){if(!lxNpcOk(v))return;const N=BAL.ration.npc;
 for(const part of lxMiss(v)){const tt=lxTierOf(v),pr=lxPrice(v,tt);
  if((v.bac||0)>=pr*2&&roll(N.buy)){ap(v,{bac:-pr});v.inv.push({k:lxKey(part,tt),from:"buy",d:S.turn})}}
 lxFix(v)}
/* she always gets a clue when an NPC steals from her (never an invisible loss); who did it only through Tai mắt (newsAdd) */
function lxStolenNote(v,g){try{log(`<span class="r">Một hộp ${lxName(g)} trong rương ngươi không cánh mà bay.</span>`);newsAdd(v,"lx",`${rkName(v)} ${v.name} sai người lấy hộp son phấn trong rương ngươi`,false)}catch(e){}}
/* two-way: a consort asks HER → jrcv RCVK.rougeBorrow (her 4-answer card PEND.rcvAsk, saveable, the ONE notice path); kept as a name for old callers */
function lxAskHer(v,part){try{if(typeof rcvAsk==="function")rcvAsk("rougeBorrow",v,S,part)}catch(x){console.error("rt ask",x)}}
/* ---------- 6. tribute cosmetics with a bestowal ---------- */
(function(){if(typeof bestow!=="function")return;const b0=bestow;bestow=function(p,why){const r=b0.apply(this,arguments);try{const T=BAL.ration.tribute,ch=T.ch[why]||0;if(!lxOn()||!p||p.dead||!ch||!roll(ch))return r;
  const part=BAL.ration.parts[lxHash(`${p.id!=null?p.id:"me"}:${S.turn}:${why}`)%BAL.ration.parts.length],k=lxKey(part,3);p.lxBest=S.turn;
  if(p===S){const n=goodsGive(S,k,{from:"emp",sub:"Hoàng thượng ban cống phẩm"});lxFix(S);log(`Hoàng thượng ban thêm cống phẩm: ${n}.`)}else{p.inv=p.inv||[];p.inv.push({k,from:"emp",d:S.turn});lxFix(p);log(`${p.name} được Hoàng thượng ban cống phẩm ${IT[k].n}.`)}
  for(const v of consorts())if(v!==p&&!v.out&&v.alive!==false&&v!==S)v.ghen=cl((v.ghen||0)+T.ghen,0,100)}catch(e){console.error("rt tribute",e)}return r};window.bestow=bestow})();
/* ---------- item detail: the colour and lượt of each box (kit detail rows' own note line) ---------- */
(function(){if(typeof kitItemDetailRows!=="function")return;const d0=kitItemDetailRows;kitItemDetailRows=function(ref,o){try{const k=ref&&(typeof ref==="string"?ref:ref.k||(ref.e&&ref.e.k));const r=lxOf(k);
  if(r){lxFix(S);const E=(S.inv||[]).filter(e=>e&&e.k===k);if(E.length){o=Object.assign({},o||{});o.note=[].concat(o.note||[],E.map(e=>`màu ${lxColName(r.part,e.c)}: còn ${e.u} lần dùng`))}}}catch(e){}return d0.call(this,ref,o)};window.kitItemDetailRows=kitItemDetailRows})();
/* ---------- first sight on load / new life ---------- */
(function(){for(const f of ["render"]){const g=window[f];if(typeof g!=="function")continue;window[f]=function(){try{if(S&&!S.lxInit)lxInitAll()}catch(e){}return g.apply(this,arguments)}}})();
window.lxPrice=lxPrice;window.lxKeys=lxKeys;window.lxNpcSpend=lxNpcSpend;window.lxSit=lxSit;window.lxNpcCap=lxNpcCap;window.lxColRows=lxColRows;window.lxColPick=lxColPick;window.lxMirrorNote=lxMirrorNote;window.lxRushBtn=lxRushBtn;window.lxRush=lxRush;window.lxInitAll=lxInitAll;window.lxOf=lxOf;window.lxCount=lxCount;window.lxMiss=lxMiss;window.lxFix=lxFix;
