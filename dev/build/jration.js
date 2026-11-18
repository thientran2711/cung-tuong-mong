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
 uses:[3,4,5,6],                       /* lượt in a full box by tier */
 price:[8,20,45,90],                   /* Nội vụ phủ price by tier (hàng rong the same; sell back = half, issued = jstip resell) */
 use:{moc:0,vung:1,vua:1,dep:2,tuyet:2},bold:1,  /* lượt per part per sitting by level; +bold for Kiểu cầu kỳ (owner table 08:25Z D) */
 cap:["moc","vua","vua","dep","tuyet"],/* the best face by how many parts she has (0..4) */
 rush:1.5,                             /* mua gấp at the mirror: Nội vụ phủ price × rush, tier 0 */
 shop:[0,1],                           /* tiers the hàng rong carries */
 coldTier:0,coldN:1,                   /* lãnh cung: one Thường box a month */
 borrow:{base:25,aff:2,ghen:10,whim:20,fail:-2,spare:2,trait:{"Ân cần":15,"Khiêm nhường":10,"Kín đáo":0,"Xảo quyệt":-5,"Tham vọng":-10,"Kiêu ngạo":-15}},
 beg:{hh:15,th:10,stat:2,fail:-3,cd:2},/* xin Hoàng hậu / Thái hậu: base + stat/2 (jveil xin road); fail costs favour; once per cd months */
 steal:{danh:-4,duc:-2,oan:10,cut:1,add:10},/* caught stealing: Danh, Đức, the victim's oán, bổng khất 1 month; odds = plant odds + add */
 npc:{use:3,buy:50,borrow:40,steal:12,stealGhen:50,ask:25,askAff:10},/* NPC month: lượt spent per part; chance to buy / borrow / steal when out; ask her */
 allergy:{sac:-4,rel:2,chiSac:-1,chiSuc:-3},  /* pha chì: the same numbers as the j8 use-effect of a lead-tainted item */               /* a tainted box (bột ngứa) at the sitting: Sắc; Thái y road unchanged */
 tribute:{ch:{promo:60,son:60,contest:35,birthday:50,night:5},ghen:3}}});
const LX_KD="Son phấn";
const LX_N={may:["Than liễu","Thanh đại","Họa mi đại","Loa tử đại"],son:["Son sáp","Son hoa hồng","Son điểm giáng","Son thiên chu cống"],
 ma:["Yên chi giấy","Yên chi bánh","Yên chi hoa hồng","Yên chi tiến cống"],mat:["Phấn gạo","Phấn hoa lài","Phấn ngọc trâm","Phấn trân châu ngự"]};
const LX_PART={may:"kẻ mày",son:"tô son",ma:"đánh má",mat:"phấn mắt"};
function lxKey(part,t){return "lx"+part+t}
function lxOf(k){const m=/^lx(may|son|ma|mat)([0-3])$/.exec(String(k||""));return m?{part:m[1],t:+m[2]}:null}
function lxOn(){return !!(BAL.ration&&BAL.ration.on)}
/* ---------- the items (into IT: the ONE item table) ---------- */
(function(){const B=BAL.ration;for(const part of B.parts)for(let t=0;t<4;t++){const k=lxKey(part,t);if(IT[k])continue;
  IT[k]={n:LX_N[part][t],kd:LX_KD,d:`Hộp ${TOIL_COL[part].label.toLowerCase()} dùng khi điểm trang (${LX_PART[part]}): dùng được ${B.uses[t]} lần · tặng, bán được`,pr:B.price[t],tg:["rv"],lx:1}}
 try{if(BAL.priceTier)for(const part of B.parts)for(let t=0;t<4;t++){const k=lxKey(part,t);if(BAL.priceTier[k]==null)BAL.priceTier[k]=B.price[t]}}catch(e){}
 try{if(typeof STIP_UNIT==="object")for(const part of B.parts)for(let t=0;t<4;t++)STIP_UNIT[lxKey(part,t)]="hộp"}catch(e){}
 try{if(typeof SHOP_ALL==="object")for(const part of B.parts)for(const t of B.shop)SHOP_ALL.push(lxKey(part,t))}catch(e){}
 try{if(typeof TAINT==="object"){const K=[];for(const part of B.parts)for(let t=0;t<4;t++)K.push(lxKey(part,t));
   TAINT.chi.on=TAINT.chi.on.concat(K);if(!TAINT.ngua)TAINT.ngua={n:"trộn bột ngứa",on:K,need:"botngua",c:0,hurt:"người dùng nổi mẩn, Sắc giảm"}}}catch(e){}
 try{if(typeof BAL.stip==="object"&&BAL.stip.down)for(const part of B.parts)for(let t=0;t<4;t++)BAL.stip.down[lxKey(part,t)]=t>0?lxKey(part,t-1):null}catch(e){}})();
/* art: until Foreman C paints img/item-lx<part><t>.webp, the existing Son phấn picture at the right grade (LX_ART lists the painted keys) */
const LX_ART={};
(function(){if(typeof itemArt!=="function")return;const a0=itemArt;itemArt=function(key,tier){const k=key&&typeof key==="object"?key.k:key;const r=lxOf(k);if(!r)return a0.apply(this,arguments);
  if(LX_ART[k])return{key:k,src:`img/item-${k}.webp`,src512:`img/item512/item-${k}.webp`,grade:r.t,gradeName:ITEM_GRADE[r.t]};
  try{window.CTM_MISSING_PICS=window.CTM_MISSING_PICS||[];if(!CTM_MISSING_PICS.some(x=>x.kind==="item"&&x.id===k))CTM_MISSING_PICS.push({kind:"item",id:k,title:IT[k].n})}catch(e){}
  const s=a0("sonphan");return s?{key:k,src:s.src,src512:s.src512,grade:r.t,gradeName:ITEM_GRADE[r.t],ph:1}:null};window.itemArt=itemArt})();
/* ---------- a piece: colour + lượt (old saves, gifts, shop, stolen goods: filled on first sight) ---------- */
function lxHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function lxFix(p){if(!p||!p.inv)return;let i=0;for(const e of p.inv){const r=e&&lxOf(e.k);if(!r){i++;continue}const L=TOIL_COL[r.part].L;
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
(function(){if(typeof stipGoods!=="function")return;const g0=stipGoods;stipGoods=function(p){const G=g0.apply(this,arguments);try{lxFix(p);if(p!==S&&lxOn())lxNpcMonth(p)}catch(e){console.error("rt goods",e)}return G};window.stipGoods=stipGoods})();
/* the first sight (new life, old save): Nội vụ phủ's issue of her rank once, so the mirror is not empty on day one */
function lxInit(p){if(!p||!lxOn()||p.lxInit)return;p.lxInit=1;p.inv=p.inv||[];for(const [k] of lxLines(rkOf(p),!!p.out))p.inv.push({k,from:"noivu",d:S.turn});
 for(const part of BAL.ration.parts)if(!lxHas(p,part)&&!p.out){const k=lxKey(part,BAL.ration.tier[Math.min(7,rkOf(p))]);p.inv.push({k,from:"noivu",d:S.turn})}lxFix(p)}
function lxInitAll(){try{if(!S||S.dead||!lxOn())return;if(typeof isSrv==="function"&&isSrv())return;lxInit(S);if(typeof mlGuest==="function"&&mlGuest())return;for(const v of consorts())if(v!==S&&v.alive!==false)lxInit(v)}catch(e){console.error("lxInit",e)}}
/* ---------- 3. the sitting: cap by the parts she has, spend lượt (her: the colours she picked; NPC / bot: any box of the part) ---------- */
function lxLvIx(k){return TOIL_LVS.indexOf(TOIL_OLDLV[k]||k)}
function lxCapRec(p,rec){if(!lxOn()||!rec||!rec.makeup)return rec;const n=lxCount(p),cap=BAL.ration.cap[n];rec.lxCap=cap;
 if(cap==="moc"){rec.makeup=false;rec.look=null;return rec}const mk=toilMk(rec);if(mk==="vung"||lxLvIx(mk)<=lxLvIx(cap))return rec;
 const T=BAL.toil.tier,top={vung:T[0]-1,vua:T[1]-1,dep:T[2]-1}[cap];if(top!=null){rec.score=Math.min(rec.score|0,top);rec.look=toilTier(rec.score)}return rec}
function lxSpend(p,rec,col){const B=BAL.ration,out={used:[],gone:[],taint:null};if(!lxOn()||!rec||!rec.makeup)return out;const mk=toilMk(rec);
 const u0=B.use[mk]||0;if(!u0)return out;const per=u0+(col&&col.want==="diem"?B.bold:0);
 for(const part of B.parts){const L=lxBoxes(p,part);if(!L.length)continue;const c=col&&col[part];const e=L.find(x=>x.c===c)||L.slice().sort((a,b)=>a.u-b.u)[0];
  const n=Math.min(per,e.u);e.u-=n;out.used.push({part,e,n});if(e.t==="ngua"||e.t==="chi")out.taint=e;if(e.u<=0){p.inv.splice(p.inv.indexOf(e),1);out.gone.push(e)}}
 if(out.taint)lxAllergy(p,out.taint);return out}
function lxAllergy(p,e){const A=BAL.ration.allergy;if(e.t==="ngua"){ap(p,{sac:A.sac});p.lxRash=S.turn}else ap(p,{sac:BAL.ration.allergy.chiSac,suc:BAL.ration.allergy.chiSuc});
 const by=typeof byKey==="function"?byKey(e.by):null;if(p===S){log(`<span class="r">Mặt ngươi nổi mẩn sau khi thoa ${lxName(e)}: ${TAINT[e.t].n}.</span> Sắc ${A.sac}.`);
  if(by&&by!==S)try{oanAdd(S,by,A.rel)}catch(x){}}else if(by===S)try{newsAdd(p,"lx",`${rkName(p)} ${p.name} nổi mẩn đỏ khắp mặt sau khi điểm trang`,true)}catch(x){}}
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
function lxColPick(col){if(!lxOn())return col;for(const part of BAL.ration.parts){const L=lxBoxes(S,part);if(L.length&&!L.some(e=>e.c===col[part]))col[part]=L.slice().sort((a,b)=>b.u-a.u)[0].c}
 if(col.want==="diem"&&!lxColRows([{k:"pre-diem",items:TOIL_PRE.filter(x=>x[2]==="diem").map(x=>({k:x[0]}))}]).length)delete col.want;return col}
function lxRushCost(){const B=BAL.ration;return lxMiss(S).length*Math.ceil(B.price[0]*B.rush)}
function lxMirrorNote(){if(!lxOn())return"";const M=lxMiss(S),n=lxCount(S),cap=BAL.ration.cap[n];
 const R=[["Son phấn",n?`${n} trong ${BAL.ration.parts.length} thứ còn dùng được`:"không còn hộp nào"]];
 if(M.length)R.push(["Thiếu",M.map(x=>TOIL_COL[x].label).join(", "),"r"],["Dung nhan",cap==="moc"?`chỉ để ${toilMkW("moc")}`:`đẹp nhất ${TOIL_MK[cap]}`,"r"],["Đường kiếm",`mua gấp ở Nội vụ phủ, hàng rong, mượn phi tần khi đến chơi, xin Hoàng hậu hay Thái hậu`,"n"]);
 return `<div class="kgr">${kitRows(R)}</div>`}
function lxRushBtn(){if(!lxOn()||!lxMiss(S).length)return"";const c=lxRushCost(),ok=(S.bac||0)>=c;
 return `<button class="${kg82Btn(true)}" id="lxrush"${ok?"":" disabled"}>Mua gấp son phấn còn thiếu<small>Bạc -${c}${ok?"":" · không đủ bạc"}</small></button>`}
function lxRush(){const c=lxRushCost();if(!lxOn()||(S.bac||0)<c)return;const M=lxMiss(S);apply({bac:-c});const E=M.map(part=>{const e={k:lxKey(part,0),from:"buy",d:S.turn};S.inv.push(e);return e});lxFix(S);
 log(`Ngươi sai người mua gấp ở Nội vụ phủ: ${E.map(lxName).join(", ")}. Bạc -${c}.`);try{save()}catch(e){}}
/* ---------- 4. roads: borrow (rival visit), beg (Hoàng hậu / Thái hậu), steal (a rival's chest) ---------- */
function lxLend(v,part){const L=lxBoxes(v,part);if(!L.length)return null;const tot=L.reduce((a,e)=>a+e.u,0);return tot>=BAL.ration.borrow.spare?L.slice().sort((a,b)=>b.u-a.u)[0]:null}
function lxBorrowOdds(v){const B=BAL.ration.borrow;let o=B.base+Math.round(aff(v,S)/B.aff)-Math.round((v.ghen||0)/B.ghen);for(const t of traitsOf(v))o+=B.trait[t]||0;
 o+=Math.round((lxHash(`${v.id}:${toilWk()}`)%(2*B.whim+1))-B.whim);return cl(o,5,95)}
function lxGive(from,to,e,how){const r=lxOf(e.k);const n=how==="half"?Math.max(1,Math.ceil(e.u/2)):e.u;e.u-=n;if(e.u<=0)from.inv.splice(from.inv.indexOf(e),1);
 const g={k:e.k,c:e.c,u:n,from:how==="steal"?"steal":"borrow",d:S.turn};if(from!==S)g.giver=from.name;if(e.t){g.t=e.t;g.by=e.by}to.inv=to.inv||[];to.inv.push(g);return g}
(function(){if(typeof talkOpts!=="function")return;const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!lxOn()||!S||S.dead||!Array.isArray(A))return A;const M=lxMiss(S);
  if(p&&p.kind==="rival"&&p.ref&&!p.ref.coop){const v=p.ref;const lend=M.map(part=>[part,lxLend(v,part)]).find(x=>x[1]);const od=lxBorrowOdds(v);
   A.push({n:"Mượn son phấn",o:od,lock:!M.length||!lend,t:!M.length?"son phấn còn đủ":"nàng không có thứ ngươi thiếu",x:`${word(od)} · thành: nàng chia cho ngươi một nửa hộp ${lend?TOIL_COL[lend[0]].label.toLowerCase():"còn thiếu"} · hỏng: thiện cảm ${BAL.ration.borrow.fail} · tùy nàng quý ngươi, nết, cơn ghen và hứng hôm nay`,
    run:()=>{if(!lend)return"";if(roll(od)){const g=lxGive(v,S,lend[1],"half");return `${v.name} chia cho ngươi ${lxName(g)} (${g.u} lần dùng).`}affAdd(v,S,BAL.ration.borrow.fail);return `${v.name} khéo từ chối. Thiện cảm ${BAL.ration.borrow.fail}.`}})}
  if(p&&(p.kind==="hh"||p.kind==="th")){const B=BAL.ration.beg,st=S.lxBeg||(S.lxBeg={}),hh=p.kind==="hh";const od=cl((hh?B.hh:B.th)+Math.round((hh?S.hh:S.th)/B.stat),5,95);const cd=st[p.kind]!=null&&S.turn-st[p.kind]<B.cd;
   const nm=hh?"Hoàng hậu":"Thái hậu";const part=M[0];const t=BAL.ration.tier[Math.min(7,S.rank)];
   A.push({n:"Xin son phấn",o:od,lock:!M.length||cd,t:!M.length?"son phấn còn đủ":`vừa xin rồi, ${B.cd} tháng mới xin lại`,x:`${word(od)} · thành: ${nm} ban một hộp ${part?TOIL_COL[part].label.toLowerCase():"còn thiếu"} · hỏng: ${hh?"Hoàng hậu":"Thái hậu"} ${B.fail}`,
    run:()=>{st[p.kind]=S.turn;if(!part)return"";if(roll(od)){const n=goodsGive(S,lxKey(part,t),{from:p.kind});lxFix(S);return `${nm} ban cho ngươi ${n}.`}apply(hh?{hh:B.fail}:{th:B.fail});return `${nm} cho là ngươi không biết giữ phận. ${nm} ${B.fail}.`}})}
  if(p&&p.kind==="chest"&&p.ref&&!sameHouse(S,p.ref)){const v=p.ref;const L=BAL.ration.parts.map(part=>lxLend(v,part)).filter(Boolean);const od=cl((typeof oPlant==="function"?oPlant(S,v):30)+BAL.ration.steal.add,5,95);const ST=BAL.ration.steal;
   A.push({n:"Lấy trộm son phấn",o:od,act:1,lock:!L.length,t:"rương nàng không có son phấn",x:`${word(od)} · thành: lấy một hộp son phấn của nàng · hỏng: bị bắt, Danh ${ST.danh}, Đức ${ST.duc}, nàng oán ${balSg(ST.oan)}, Nội vụ phủ khất bổng ${ST.cut} tháng`,
    run:()=>{if(!L.length)return"";const e=L.find(x=>M.includes(lxOf(x.k).part))||L[0];if(roll(od)){const g=lxGive(v,S,e,"all");try{newsAdd(v,"lx",`${rkName(v)} ${v.name} mất một hộp son phấn trong rương`,false)}catch(x){}return `Ngươi lấy được ${lxName(g)} trong rương ${v.name}.`}
     lxCaught(S,v);return `<span class="r">Ngươi bị bắt quả tang lục rương ${v.name}.</span> Danh ${ST.danh}, Đức ${ST.duc}.`}})}
 }catch(e){console.error("rt talk",e)}return A}})();
function lxCaught(a,v){const ST=BAL.ration.steal;ap(a,{danh:ST.danh});if(typeof ducAdd==="function")ducAdd(a,ST.duc,"trộm son phấn");else ap(a,{duc:ST.duc});try{oanAdd(v,a,ST.oan)}catch(e){}a.cutPay=Math.max(a.cutPay||0,ST.cut);a.cutBy="Nội vụ phủ"}
/* ---------- NPCs: the same rule at the month tick (spend, run out → buy / borrow / steal, ask her) ---------- */
function lxNpcMonth(v){if(!v||v===S||v.coop||v.alive===false||v.out)return;if(typeof mlGuest==="function"&&mlGuest())return;const N=BAL.ration.npc;
 for(const part of BAL.ration.parts){let left=N.use;for(const e of lxBoxes(v,part).sort((a,b)=>a.u-b.u)){const n=Math.min(left,e.u);e.u-=n;left-=n;if(e.u<=0)v.inv.splice(v.inv.indexOf(e),1);if(!left)break}}
 const asked=[];for(const part of lxMiss(v)){const pr=BAL.ration.price[0];
  if((v.bac||0)>=pr*2&&roll(N.buy)){ap(v,{bac:-pr});v.inv.push({k:lxKey(part,0),from:"buy",d:S.turn});continue}
  const fr=consorts().filter(x=>x!==v&&x!==S&&!x.out&&x.alive!==false&&aff(x,v)>=N.askAff&&lxLend(x,part)).sort((a,b)=>aff(b,v)-aff(a,v))[0];if(fr&&roll(N.borrow)){lxGive(fr,v,lxLend(fr,part),"half");continue}
  if(lxLend(S,part)&&aff(v,S)>=N.askAff&&roll(N.ask)){asked.push(part);continue}
  if(((v.ghen||0)>=N.stealGhen||traitsOf(v).includes("Xảo quyệt"))&&roll(N.steal)){const vic=[S].concat(consorts().filter(x=>x!==v&&!x.out&&x.alive!==false)).filter(x=>lxLend(x,part)).sort((a,b)=>(b.lxBest||0)-(a.lxBest||0)||(b===S)-(a===S))[0];
   if(vic){const e=lxLend(vic,part);const g=lxGive(vic,v,e,"all");if(vic===S)lxStolenNote(v,g);else try{newsAdd(vic,"lx",`${rkName(vic)} ${vic.name} mất hộp son phấn, có kẻ lén lấy`,false)}catch(x){}}}}
 lxFix(v);if(asked.length)lxAskHer(v,asked[0])}
/* she always gets a clue when an NPC steals from her (never an invisible loss); who did it only through Tai mắt (newsAdd) */
function lxStolenNote(v,g){try{log(`<span class="r">Một hộp ${lxName(g)} trong rương ngươi không cánh mà bay.</span>`);newsAdd(v,"lx",`${rkName(v)} ${v.name} sai người lấy hộp son phấn trong rương ngươi`,false)}catch(e){}}
/* two-way: a consort asks HER (an event card; her answer is remembered as thiện cảm) */
function lxAskHer(v,part){try{if(window.__bot||(typeof isSrv==="function"&&isSrv()))return;const e=lxLend(S,part);if(!e)return;const lbl=TOIL_COL[part].label.toLowerCase();
 Q.push({ev:1,t:"Sang mượn son phấn",who:typeof pv==="function"?pv(v):null,h:`<p>Cung nữ của ${rkName(v)} ${v.name} sang thưa: chủ tử nhà nàng hết ${lbl}, xin ngươi chia cho một ít.</p>${kitRows([["Rương ngươi",`${lxName(e)}, còn ${e.u} lần dùng`,"n"]])}`,
  opts:[{n:"Chia cho nàng một nửa",fx:{},x:`thành: ${v.name} thiện cảm ${balSg(BAL.ration.npc.askAff)} · mất: nửa hộp ${lbl}`,go:()=>{const g=lxGive(S,v,e,"half");affAdd(v,S,BAL.ration.npc.askAff);log(`Ngươi chia cho ${v.name} ${lxName(g)}, ${g.u} lần dùng.`)}},
   {n:"Khéo từ chối",fx:{},x:`mất: ${v.name} thiện cảm ${BAL.ration.borrow.fail}`,go:()=>{affAdd(v,S,BAL.ration.borrow.fail);log(`Ngươi khéo từ chối ${v.name}.`)}}]})}catch(x){console.error("rt ask",x)}}
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
window.lxSit=lxSit;window.lxNpcCap=lxNpcCap;window.lxColRows=lxColRows;window.lxColPick=lxColPick;window.lxMirrorNote=lxMirrorNote;window.lxRushBtn=lxRushBtn;window.lxRush=lxRush;window.lxInitAll=lxInitAll;window.lxOf=lxOf;window.lxCount=lxCount;window.lxMiss=lxMiss;window.lxFix=lxFix;
