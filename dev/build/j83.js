/* ================= TÁC PHẨM TỰ TAY (j83): every study / practice session of an art ends with a work (the study act and the
   "make a work" act are one). Tier = the art's mini-game score (0..10) + her grade in that art + materials; "Học nhanh" (skip) still raises the art but makes NO product (owner rule)
   takes the fixed average 5. Works go to the chest; then present / give / sell / show; a dish can be secretly poisoned (Hạc đỉnh hồng).
   Bought treasures stay worth more; handmade earns "chân tình" with sincere people and "hợp ý" with matching tastes.
   Every consort uses the same rules. Folds the old j2 acts "Dâng canh", "Cắm hoa dâng Hoàng thượng", "Thêu khăn bán ra ngoài",
   "Làm thơ dâng lên" into the study sessions. ================= */
const WTIER=["Thường","Khá","Tinh xảo","Tuyệt phẩm"],WAVG=5/* tier thresholds: BAL.mgTier.wk.th (wkTier) */;
/* gift value per tier; a bought gift's value is IT.gv or pr/12+2 (Đệm gấm 4, Vòng ngọc 6, Nghiên mực 8, Tranh cổ / Đàn cổ 10) */
/* WVAL = gift value by grade: BAL.craftGift (jecon fills this mirror); the sale price is BAL.craftSell (jecon wkSellVal; one-core: j83's own 6/10/16/24 was a second, unused table) */
const WVAL=[],WCAP=8,WSHOW=[1,2,3,5];
const WK={
 tranh:{a:"hoa",n:"Vẽ tranh thủy mặc",w:"Bức tranh",need:6,mat:[0,6,25],mn:["giấy thường","giấy Tuyên, màu khoáng","lụa trắng, màu ngọc"],sub:["Mai","Lan","Trúc","Cúc","Sơn thủy","Song hạc","Sen hồ"]},
 theu:{a:"hoa",n:"Thêu khăn",w:"Khăn thêu",need:2,mat:[0,4,15],mn:["vải thường","lụa, chỉ màu","lụa Hàng Châu, chỉ kim tuyến"],sub:["uyên ương","hoa mẫu đơn","cánh én","hoa sen"]},
 bhoa:{a:"hoa",n:"Cắm hoa",w:"Bình hoa",need:2,mat:[0,4,15],mn:["bình gốm thường","bình sứ men xanh","bình ngọc"],per:1},
 tho:{a:"thi",n:"Viết thơ, thư pháp",w:"Bức thư pháp",need:2,mat:[0,4,15],mn:["giấy thường","giấy hoa tiên","giấy dát vàng, mực Huy Châu"],sub:["Xuân nhật","Thu dạ","Vọng nguyệt","Tống biệt","Hoa triêu"]},
 kinh:{a:"thi",n:"Chép kinh",w:"Quyển kinh chép tay",need:4,mat:[0,4,15],mn:["giấy thường","giấy Tuyên","giấy vàng, mực trầm"],sub:["Kim Cương","Bát Nhã","Dược Sư","Địa Tạng"],fin:{duc:1}},
 khuc:{a:"cam",n:"Phổ khúc đàn",w:"Khúc đàn tự phổ",need:4,mat:[0,5,20],mn:["giấy thường","giấy hoa tiên","dây đàn tơ mới, phổ lụa"],sub:["Thu thủy","Nguyệt hạ","Xuân hiểu","Lạc mai"]},
 the:{a:"ky",n:"Soạn thế cờ tàn",w:"Thế cờ tàn",need:2,mat:[0,4,15],mn:["giấy thường","bàn cờ gỗ","bàn cờ ngọc"],sub:["Song long","Cô thành","Bát trận","Tứ diện"]},
 mua:{a:"vu",n:"Biên điệu múa",w:"Điệu múa",need:4,mat:[0,4,15],mn:["tập chay","thuê nhạc công","nhạc công, lụa múa mới"],sub:["Nghê thường","Lục yêu","Bạch trữ","Lăng ba"],only:["emp","th"]},
 ao:{a:"vu",n:"May áo múa",w:"Áo múa tự may",need:6,mat:[0,8,30],mn:["vải thường","lụa mỏng","gấm, kim tuyến"],sub:["Nghê thường","Lưu tiên","Thải vân"]},
 mon:{a:"y",n:"Nấu món",w:"Món",need:2,mat:[0,6,20],mn:["đồ bếp sẵn","sâm, táo đỏ","yến sào, sâm trăm năm"],per:1},
 huong:{a:"y",n:"Làm túi hương",w:"Túi hương",need:2,mat:[0,4,15],mn:["hương thường","trầm, quế","trầm kỳ nam, long diên"],sub:["hoa lài","trầm quế","hoa quế","lan"]}};
/* j85 owns the arts "theu" (Thêu thùa, may vá) and "nau" (Nấu nướng); when they exist, embroidery / sewing / dishes belong to them */
function wkHasArt(k){return ARTS.some(x=>x.k===k)}
Object.defineProperty(WK.theu,"a",{get:()=>wkHasArt("theu")?"theu":"hoa"});Object.defineProperty(WK.ao,"a",{get:()=>wkHasArt("theu")?"theu":"vu"});Object.defineProperty(WK.mon,"a",{get:()=>wkHasArt("nau")?"nau":"y"});
const WMAT=BAL.wk.matQ;/* material bonus to the score (BAL.wk) */
function wkLv(p,a){return typeof artLv==="function"?(artLv(p,a)||0):((p&&p.arts)||{})[a]||0}
function wkTier(q){const T=BAL.mgTier.wk.th;return q>=T[2]?3:q>=T[1]?2:q>=T[0]?1:0}/* mg-balance: thresholds in BAL.mgTier.wk.th */
/* the tier line printed on every work card (j83 / jwkr / jtds): ONE CORE, reads BAL.mgTier.wk.th (mg-balance-r1) */
function wkThTxt(){const T=BAL.mgTier.wk.th;return `Thường dưới ${T[0]} · Khá ${T[0]} · Tinh xảo ${T[1]} · Tuyệt phẩm ${T[2]}`}
/* score = mini-game raw 0..10 + grade + material; shown plainly */
/* Công (Tứ đức, j85): its quality bonus (0..100 scale, 10 per phần here) and +1 tier from Công bậc 3 */
function wkCong(p){if(typeof virtueBonus!=="function")return{lv:0,q:0};let v;try{v=virtueBonus(p,"cong")}catch(e){return{lv:0,q:0}}if(v==null)return{lv:0,q:0};if(typeof v==="number")return{lv:v,q:0};return{lv:+(v.lv!=null?v.lv:v.level!=null?v.level:0)||0,q:+(v.q||0)||0}}
function wkCongPh(p){return Math.round(wkCong(p).q/10)}
function wkLvQ(p,a){const L=BAL.mgTier.wk.lvQ;return L[cl(Math.round(wkLv(p,a)),0,L.length-1)]}/* mg-balance: her art level adds a little (BAL), the play decides */
function wkScore(p,kind,mat,raw){return raw+wkLvQ(p,WK[kind].a)+WMAT[mat]+wkCongPh(p)}
function wkCongUp(p,t){const C=BAL.mgTier.wk.cong;return wkCong(p).lv>=C[0]&&t<C[1]?1:0}/* mg-balance-r1: the Công lift (+1 tier) stops at BAL.mgTier.wk.cong[1] (Tinh xảo), so Tuyệt phẩm always needs the play score */
function wkTierP(p,q,mat){const t0=wkTier(q),t=Math.min(3,t0+wkCongUp(p,t0));return mat==null?t:Math.min(t,BAL.wk.cap[mat])}
/* lowest play score (0..10) that reaches tier t with this material, or -1 (out of reach) */
function wkNeedRaw(p,kind,mat,t){for(let r=0;r<=10;r++)if(wkTierP(p,wkScore(p,kind,mat,r),mat)>=t)return r;return -1}
function wkParts(p,kind,mat,raw){const K=WK[kind],a=ARTS.find(x=>x.k===K.a),c=wkCong(p),cp=wkCongPh(p);return `phần chơi ${raw}${wkLvQ(p,K.a)?` + ${a.n} bậc ${wkLv(p,K.a)}: +${wkLvQ(p,K.a)}`:""}${WMAT[mat]?` + vật liệu: +${WMAT[mat]}`:""}${cp?` + Công: +${cp}`:""} = ${wkScore(p,kind,mat,raw)} phần${wkCongUp(p,wkTier(wkScore(p,kind,mat,raw)))?`; Công bậc ${c.lv}: +1 bậc`:""}${wkTierP(p,wkScore(p,kind,mat,raw))>wkTierP(p,wkScore(p,kind,mat,raw),mat)?`; ${WK[kind].mn[mat]} chỉ tới ${WTIER[BAL.wk.cap[mat]]}`:""}`}
/* act-text (owner 15/11): the quality tiers in ONE clear line, no code-like signs: "chơi 5 phần ra Khá, 9 phần ra Tinh xảo, Tuyệt phẩm cần vật liệu quý" */
function wkTierTxt(p,kind,mat){const lo=wkTierP(p,wkScore(p,kind,mat,WAVG),mat),N=[1,2,3].filter(t=>t>lo).map(t=>{const r=wkNeedRaw(p,kind,mat,t);return r<0?(t===3&&BAL.wk.cap[mat]<3?`${WTIER[t]} cần vật liệu quý`:`${WTIER[t]} chưa với tới`):`${r} phần ra ${WTIER[t]}`});
 const L=(lo>0?[`${WAVG} phần đã ra ${WTIER[lo]}`]:[]).concat(N);return L.length?(/^\d/.test(L[0])?"chơi ":"")+L.join(", "):`chơi ${WAVG} phần đã ra ${WTIER[lo]}`}
/* for act cards / options: the tier line as one Ghi chú "(…)", the gains of the better material as Được items */
function wkOddsTxt(p,kind,mat){const g=[];if(BAL.wk.val[mat])g.push(`quà giá trị +${BAL.wk.val[mat]}`);if(BAL.wk.sell[mat]&&WK[kind].mat[mat])g.push(`bán ra thêm Bạc +${Math.round(WK[kind].mat[mat]*BAL.wk.sell[mat])}`);
 return [`(${wkTierTxt(p,kind,mat)})`].concat(g).join(" · ")}
function wkRawOfPts(p){return [0,4,7,10][p]||0}
const WDEF={cam:"khuc",ky:"the",thi:"tho",hoa:"tranh",vu:"mua",y:"huong",theu:"theu",nau:"mon"};
function wkKindsOf(a){return Object.keys(WK).filter(k=>WK[k].a===a)}
function wkSubj(kind){const K=WK[kind],E=S.emp;if(kind==="mon")return E.known.dish?E.likes.dish:pick(LIKES.dish);if(kind==="bhoa")return E.known.flower?E.likes.flower:pick(LIKES.flower);if(kind==="khuc"&&E.known.music)return "theo "+E.likes.music;return pick(K.sub)}
function wkName(kind,subj){const K=WK[kind];return kind==="mon"?`Bát ${subj}`:kind==="bhoa"?`Bình ${subj}`:kind==="theu"?`Khăn thêu ${subj}`:kind==="huong"?`Túi hương ${subj}`:`${K.w} «${subj}»`}
const WMON=["","giêng","hai","ba","tư","năm","sáu","bảy","tám","chín","mười","mười một","chạp"],WYR=["","nhất","hai","ba","tư","năm","sáu","bảy","tám","chín","mười"];
function wkDate(){return `tháng ${WMON[S.month]||S.month}, năm thứ ${WYR[S.year]||S.year}`}
function wkMake(p,kind,mat,raw,subj){const K=WK[kind],q=wkScore(p,kind,mat,raw),ti=wkTierP(p,q,mat);const s=subj||wkSubj(kind);
 return {k:"tp",wk:{kind,a:K.a,n:wkName(kind,s),s,q,ti,raw,lv:wkLv(p,K.a),m:mat,by:key(p),bn:p===S?"ngươi":`${rkName(p)} ${p.name}`,d:wkDate(),p:K.per?wk():null,from:key(p)}}}
/* the chest item type: handmade works share one IT entry; the work data rides on the inventory entry */
IT.tp={n:"Tác phẩm tự tay",kd:"Tác phẩm",d:"Tự tay làm",pr:0,rk:0,tg:["rv"]};
(function(){const i0=iname;iname=function(e){return e&&e.wk?`${e.wk.n} (${WTIER[e.wk.ti]})`:i0.apply(this,arguments)}})();
/* ---- taste and sincerity: true reasons, used for both the shown numbers and the result ---- */
function wkEmpMatch(w){const E=S.emp,K=E.known,L=E.likes,R=[];
 if(has("trongtai")&&["cam","ky","thi","hoa"].includes(w.a))R.push("ngài trọng tài nghệ");
 if(w.kind==="khuc"&&K.music&&/theo /.test(w.s))R.push(`phổ theo ${L.music}, khúc ngài yêu`);
 if(w.kind==="mon"&&K.dish&&w.s===L.dish)R.push(`${L.dish}, món ngài thích`);
 if(w.kind==="bhoa"&&K.flower&&w.s===L.flower)R.push(`${L.flower}, hoa ngài yêu`);
 if(has("chamchinh")&&w.a==="ky")R.push("ngài thích bàn cờ, bàn việc");
 if(has("mesac")&&(w.kind==="ao"||w.kind==="huong"))R.push("ngài trọng sắc");
 return R}
function wkSincere(r){if(r==="emp")return has("nhantu")||has("datinh");if(r==="th")return (traitsOf("th")[0]||"")==="Ân cần";if(r==="maid")return true;if(r&&typeof r==="object")return traitsOf(r).some(t=>t==="Ân cần"||t==="Khiêm nhường");return false}
function wkProud(r){return r&&typeof r==="object"&&traitsOf(r).includes("Kiêu ngạo")}
function wkBestArt(r){const a=(r&&r.arts)||{};let b=null,l=0;for(const k in a)if(a[k]>l){l=a[k];b=k}return b}
/* emperor's fatigue: handmade gifts to him in the last 3 weeks, and the same kind among them */
function wkEmpLog(){S.wkE=(S.wkE||[]).filter(x=>wk()-x.w<3);return S.wkE}
function wkEmpRecent(by){return wkEmpLog().filter(x=>x.by===by)}
const WFAT=[1,.6,.35];
/* full evaluation of giving work w from giver a to target r: returns {ok,why,fx,rel,v,notes} */
function wkEval(a,w,r){const ev=wkEval0(a,w,r);if(!ev.ok)return ev;const m=w.m||0,add=BAL.wk.val[m]+(ev.notes.includes("chân tình")?BAL.wk.tinh[m]:0);if(!add)return ev;
 ev.notes.push(m===2?"vật liệu quý, dụng tâm":"vật liệu tốt");const v=Math.min(WCAP+BAL.wk.val[m],ev.v+add),d=v-ev.v;if(!d)return ev;ev.v=v;const f=ev.fx;
 if(r==="emp")f.sung=Math.max(1,Math.round(v/2));else if(r==="th")f.th=v;else if(r==="maid")f.maid=v*2;else{ev.rel=v+2;if(f.hh)f.hh=v}return ev}
function wkEval0(a,w,r){const notes=[];let v=WVAL[w.ti];
 if(w.p!=null&&w.p<wk())return{ok:false,why:"món đã nguội, hoa đã héo"};
 if(r==="emp"){const M=wkEmpMatch(w);if(M.length){v+=1;notes.push("hợp ý: "+M[0])}
  if(wkSincere("emp")){v+=1;notes.push("chân tình")}
  const rec=wkEmpRecent(key(a));if(rec.some(x=>x.w===wk()))return{ok:false,why:"tuần này ngài đã nhận một tác phẩm, tuần sau mới dâng tiếp"};
  const same=rec.filter(x=>x.kind===w.kind).length;if(same){v-=same;notes.push(`${WK[w.kind].w.toLowerCase()} lặp lại`)}
  v=Math.min(WCAP,v)*(WFAT[Math.min(2,rec.length)]);v=Math.max(1,Math.round(v));
  const fx={sung:Math.max(1,Math.round(v/2))};if(w.ti===3)fx.an=1;return{ok:true,fx,v,notes}}
 if(r==="th"){if(S.thDead)return{ok:false,why:"Thái hậu đã mất"};if(["kinh","tranh","theu"].includes(w.kind)){v+=1;notes.push("Thái hậu quý tranh, kinh, đồ thêu")}
  if(wkSincere("th")){v+=2;notes.push("chân tình")}v=Math.min(WCAP,v);const fx={th:v};if(w.ti>=2)fx.danh=w.ti-1;return{ok:true,fx,v,notes}}
 if(r==="maid"){if(!a.maid)return{ok:false,why:"không có cung nữ thân tín"};v+=2;notes.push("chân tình");return{ok:true,fx:{maid:v*2},v,notes}}
 if(r&&typeof r==="object"){if(wkProud(r))return{ok:false,why:"nàng Kiêu ngạo, chỉ nhận đồ quý mua bằng bạc"};
  if(wkSincere(r)){v+=2;notes.push("chân tình")}
  if(wkBestArt(r)===w.a){v+=1;notes.push("nàng mê "+ARTS.find(x=>x.k===w.a).n)}
  if(traitsOf(r).includes("Tham vọng")){v=Math.max(1,Math.round(v/2));notes.push("nàng Tham vọng, coi nhẹ đồ tự làm")}
  v=Math.min(WCAP,v);const fx={};if(r.queen&&a===S)fx.hh=v;return{ok:true,fx,rel:v+2,v,notes}}
 return{ok:false,why:""}}
/* give a work: two-way, same function for her and for every consort */
function wkGive(a,r,ix,quietLog){const e=a.inv[ix];if(!e||!e.wk)return"";const w=e.wk;const ev=wkEval(a,w,r);if(!ev.ok)return"";a.inv.splice(ix,1);if(typeof giveTo==="function")giveTo.out=r===S?"sent":"take";/* K-GIFT-OUT (KK64): «sent» to her, else «take» — overwritten below by the receiver choice («back» / «found», d19-gift-npc) */
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`,wn=`${w.n} (${WTIER[w.ti]})`;
 if(r==="emp"){S.wkE=wkEmpLog();S.wkE.push({w:wk(),by:key(a),kind:w.kind});ap(a,ev.fx);if(a!==S)newsAdd(a,"gift",`${by} dâng ${wn} tự tay làm lên Hoàng thượng.`);
  return `${by} dâng ${wn} lên Hoàng thượng${ev.notes.length?" ("+ev.notes.join("; ")+")":""}. ${a===S?fmt(ev.fx):"Sủng +"+ev.fx.sung}. `}
 if(r==="th"){ap(a,ev.fx);if(a!==S)newsAdd(a,"gift",`${by} dâng ${wn} tự tay làm lên Thái hậu.`);return `${by} dâng ${wn} lên Thái hậu${ev.notes.length?" ("+ev.notes.join("; ")+")":""}. ${a===S?fmt(ev.fx):""}`}
 if(r==="maid"){ap(a,ev.fx);return `${by} tặng ${a.maid.name} ${wn}. Thiện cảm ${a.maid.name} +${ev.fx.maid}. `}
 const ent=Object.assign({},e,{wk:Object.assign({},w,{from:key(a)})});const keepGain=()=>{relAdd(a,r,ev.rel);if(ev.fx.hh)ap(a,{hh:ev.fx.hh})};
 if(r===S){keepGain();pushDil(mkP("giftin",{f:key(a),e:ent}),"Quà tặng");newsAdd(a,"gift",`${by} tặng ngươi ${wn} tự tay làm.`,true);return `${by} sai người mang ${wn} sang tặng ngươi. `}
 /* d19-gift-npc (law 1 + 11): a work given to an NPC gets HER answer too, as every item (jrcv rcvGiftIn: Nhận / Trả lại quà / Xét nghiệm, the
    OD 18/11 ~21:15Z receiver choice) — before, a work skipped it, so an NPC could never send a work back. A work sent back goes home to the
    giver's chest (rcvGiftIn copies the original piece back, law 6c) and buys no liking (law 3). */
 const ans=typeof rcvGiftIn==="function"?rcvGiftIn(a,r,Object.assign({},e)):null;
 if(ans==="back"){if(typeof giveTo==="function")giveTo.out="back";return `${r.name} trả lại ${wn} cho ${NM(a)}. `}
 if(ans&&!["take","check"].includes(ans)){if(typeof giveTo==="function")giveTo.out="found";return ans}
 keepGain();invAdd(r,ent);if(a!==S)newsAdd(a,"gift",`${by} tặng ${rkName(r)} ${r.name} ${wn} tự tay làm.`);
 return `${by} tặng ${rkName(r)} ${r.name} ${wn}${ev.notes.length?" ("+ev.notes.join("; ")+")":""}: ${pvQuy(r,ev.rel,"thiện cảm")}. `}
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];if(e&&e.wk)return wkGive(a,r,ix)||"";return g0.apply(this,arguments)}})();
/* sell outside the palace: silver, risk of Danh if found out (same odds for every consort) */
function wkSellVal(w){return 0}/* replaced by jecon (BAL.craftSell) */
function wkSellO(p){return oddsCl(75+(eyes(p)*3))}
function wkSell(p,ix){const e=p.inv[ix];if(!e||!e.wk)return"";const w=e.wk;p.inv.splice(ix,1);const nm=p===S?"Ngươi":`${rkName(p)} ${p.name}`;
 if(aRoll(wkSellO(p),p)){ap(p,{bac:wkSellVal(w)});return `${nm} nhờ người mang ${w.n} ra cửa Thần Vũ bán. Bạc +${wkSellVal(w)}. `}
 ilGone(p,e,"conf")/* charge-followups (a): caught at the gate = tịch thu → Nội vụ phủ store, not sold to the market */;ap(p,{danh:BAL.eff.j83.danhWkSell});if(p!==S)newsAdd(p,"sell",`${nm} lén bán đồ tự làm ra ngoài cung, bị bắt gặp.`,false);return `<span class="r">${nm} lén bán ${w.n} ra ngoài cung thì bị thị vệ cửa Thần Vũ bắt gặp, đồ bị tịch thu.</span> Danh ${balSg(BAL.eff.j83.danhWkSell)}. `}
/* show at a banquet: Danh by tier, once per work, the work stays */
function wkShow(ix){const e=S.inv[ix];if(!e||!e.wk||e.wk.show||!can(BAL.btn.wkShow.k))return;spend(BAL.btn.wkShow.k);e.wk.show=1;const w=e.wk;const f={danh:WSHOW[w.ti]};apply(f);if(w.ti===3)ghenAll(BAL.ghen.showTreasure,"ngươi khoe bảo vật");
 log(`Bày ${w.n} (${WTIER[w.ti]}) ở yến tiệc, cả điện truyền tay nhau xem. ${fmt(f)}${w.ti===3?` · phi tần ghen +${ghenN(BAL.ghen.showTreasure)}`:""}`);render()}
/* contest (Tranh ghế, vòng Tài nghệ): a Tinh xảo / Tuyệt phẩm of that art in the chest adds to the score */
function wkContestB(p,art){let b=0;for(const e of (p.inv||[]))if(e.wk&&e.wk.a===art&&e.wk.ti>=2)b=Math.max(b,e.wk.ti-1);return b}
(function(){if(typeof tScore!=="function")return;const t0=tScore;tScore=function(p,art){const s=t0.apply(this,arguments);return cl(s+wkContestB(p,art),0,10)}})();
/* ---- making = studying: every lesson / practice session ends with a work ----
   S.mg.wk = {kind,mat} is the product chosen for the session; default WDEF[art] with plain material (e.g. the bot's lesson()). */
let wkPend=null;
/* Đức from handmade works (Chép kinh, Vật cầu phúc; WK.fin): at most BAL.wkFinCap per month across all such works (review/tuduc-sub-r1:
   a bậc-5 "Tự học" could otherwise farm Đức +1 every 2 khắc). The work itself is still made and keeps its value. */
function wkFinLeft(){const m=S&&S.wkFin;return Math.max(0,(BAL.wkFinCap|0)-(m&&m.t===S.turn?m.n|0:0))}
function wkFinTxt(K){return !K||!K.fin?"":wkFinLeft()>0?`${plain(fmt(K.fin))}, mỗi tháng một lần`:"tháng này Đức đã tăng rồi"}
/* lesson progress points of one play (0..3 by BAL.mgTier.lessonPts): ONE rule for her lesson (openMG below) and an NPC's (j85 npcStudyDo, mg2) */
function wkLessonPts(raw){const P=BAL.mgTier.lessonPts;return raw>=P[2]?3:raw>=P[1]?2:raw>=P[0]?1:0}
function wkFinishLesson(k,pick,raw,how){const kind=WK[pick.kind]&&WK[pick.kind].a===k?pick.kind:WDEF[k];const mat=pick.mat||0;const e=wkMake(S,kind,mat,raw,pick.subj);invAdd(S,e);const K=WK[kind];
 let fin="";if(K.fin){if(wkFinLeft()>0){apply(K.fin);S.wkFin=S.wkFin&&S.wkFin.t===S.turn?S.wkFin:{t:S.turn,n:0};S.wkFin.n++;fin=" "+fmt(K.fin)}else fin=" Tháng này Đức đã tăng rồi, món này không thêm Đức."}
 S.wkN=(S.wkN||0)+1;log(`<span class="g">Buổi ${how} làm ra ${e.wk.n}: phẩm ${WTIER[e.wk.ti]}</span> (${wkParts(S,kind,mat,raw)}). Cất vào rương${K.per?"; phải dâng trong tuần này":""}.${fin}`)}
(function(){const o0=openMG;openMG=function(k,lv,cb){const m=S&&S.mg;if(!m||m.k!==k)return o0.apply(this,arguments);if(m.pa&&typeof playArt==="function"){S.mg=null;playArt({art:k,title:"Tự học",quick:{n:"Học nhanh",sure:1,win:"không ra thành phẩm"},onDone:(raw,o)=>{if(!(o&&o.skipped))wkFinishLesson(k,m.wk||{kind:WDEF[k],mat:0},cl(Math.round(raw),0,10),"tự học");else log("Tự học nhanh: không ra thành phẩm.");render()}});return}
 if(!m.wk)m.wk=wkPend||{kind:WDEF[k],mat:0};wkPend=null;const pick=m.wk;let skip=false;const ms=S.master?2:1;
 const cb2=g=>{const raw=wkRawOfPts(Math.round(g/ms));if(m.mode==="prac"){S.mg=null;if(skip)log("Tự học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,raw,"tự học");render();return}if(skip)return cb(g);
  const r=cb(g);try{wkFinishLesson(k,pick,raw,m.mode==="self"?"tự học":m.mode==="th"?"học với Thái hậu":"học");render()}catch(x){}return r};
 if(typeof playArt==="function"){try{const an=ARTS.find(x=>x.k===k).n;playArt({art:k,title:`${m.mode==="prac"?"Tự học":"Học"} ${an}`,quick:m.mode==="prac"?{n:"Học nhanh",sure:1,win:"không ra thành phẩm"}:{n:"Học nhanh",roll:1,win:`tiến bộ ${kStepW(lesG(m.mode,ms))}, không ra thành phẩm`,lose:"không tiến bộ"},onDone:(raw,o)=>{const sk2=!!(o&&o.skipped);raw=cl(Math.round(raw||0),0,10);const pts=sk2?(o.ok!=null?(o.ok?1:0):(kitQuickRoll()?1:0)):wkLessonPts(raw)/* ONE tier rule (ag) */;
   if(m.mode==="prac"){S.mg=null;if(sk2)log("Tự học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,raw,"tự học");render();return}cb(pts*ms);if(sk2)return;try{wkFinishLesson(k,pick,raw,m.mode==="self"?"tự học":m.mode==="th"?"học với Thái hậu":"học");render()}catch(x){}}});return}catch(x){}}
 const r=o0.call(this,k,lv,cb2);
 try{const sk=$("mgskip"),os=sk.onclick;const kind=WK[pick.kind]?pick.kind:WDEF[k];sk.innerHTML=`Học nhanh<small>${kitParse(kitQuickSub(m.mode==="prac"?{sure:1,win:"không ra thành phẩm"}:{win:`tiến bộ ${kStepW(lesG(m.mode,ms))}, không ra thành phẩm`,lose:"không tiến bộ"}))}</small>`;
  sk.onclick=()=>{skip=true;os()};const h=$("mgh");if(h)h.textContent+=` Tự tay làm (chơi): ra thành phẩm, ${WK[kind].w.toLowerCase()}: phẩm = phần chơi (từ 0 đến 10) + ${ARTS.find(x=>x.k===k).n} bậc ${wkLv(S,k)}: +${wkLv(S,k)}${WMAT[pick.mat||0]?` + vật liệu: +${WMAT[pick.mat||0]}`:""}.`}catch(x){}
 return r}})();
/* product dialog in front of every lesson button (and the practice button once an art is mastered) */
function wkLessonOK(k,mode){const l=S.arts[k],cost=tchFee(k);if(!S||S.dead||Q.length||S.mg)return false;if(mode==="prac")return l>=5&&can(BAL.artLes.pk)&&S.suc>=BAL.sucNeed.wk;if(l>=5)return false;
 if(mode==="self")return can(BAL.artLes.k)&&S.suc>=BAL.sucNeed.self;if(mode==="th")return can(BAL.artLes.k)&&S.th>=40&&(S.buoi||0)===0&&!S.thDead;return can(BAL.artLes.k)&&S.bac>=cost}
function wkAsk(k,mode,run){const a=ARTS.find(x=>x.k===k),l=S.arts[k],fee=mode==="teacher"?tchFee(k):0;const O=[];
 for(const kind of wkKindsOf(k)){const K=WK[kind];for(let m=0;m<3;m++)O.push({n:`${K.w} · ${K.mn[m]}`,fx:K.mat[m]?{bac:-K.mat[m]}:{},x:`${wkOddsTxt(S,kind,m)}${K.per?" · phải dâng trong tuần":""}${K.fin?" · "+wkFinTxt(K):""}`,go:()=>{wkPend={kind,mat:m};run();if(!S.mg){wkPend=null;if(K.mat[m])apply({bac:K.mat[m]})}}})}
 O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:`${mode==="prac"?"Tự học":"Học"} ${a.n}: làm ra tác phẩm gì?`,who:pMe(),h:`<p>Tự tay làm (chơi trò tài nghệ): ra thành phẩm. Học nhanh: ${mode==="prac"?"":"vẫn tiến bộ, "}không ra thành phẩm.</p>${kitNumBox(`<p>Phẩm = phần chơi trò tài nghệ (từ 0 đến 10) + ${a.n} bậc ${l}: +${wkLvQ(S,k)} + vật liệu (thường +${WMAT[0]}, tốt +${WMAT[1]}, quý +${WMAT[2]}).</p><p class="past">${wkThTxt()}</p>`)}<p>Chỉ vật liệu quý mới thành Tuyệt phẩm. Vật liệu tốt, quý còn làm quà giá trị hơn và bán được giá hơn.${fee?` Phí thầy ${fee} bạc trả riêng.`:""}</p>`,opts:O});showModal();render()}
(function(){const l0=lessonMode;lessonMode=function(k,mode){if(wkPend||!wkLessonOK(k,mode))return l0.apply(this,arguments);wkAsk(k,mode,()=>l0.call(this,k,mode))}})();
/* practice once mastered: j82's playArt gives the raw score directly when present; otherwise the art's lesson game */
function wkPractice(k){if(!wkLessonOK(k,"prac"))return;wkAsk(k,"prac",()=>{if(!wkLessonOK(k,"prac"))return;
 const pc={suc:-BAL.artLes.prac,khac:BAL.artLes.pk};if(typeof playArt==="function"&&typeof kgDefer==="function"){kgDefer(pc,()=>wkPracOpen(k));return}apply({suc:pc.suc});spend(pc.khac);wkPracOpen(k)})}
/* KIT §13.9: the practice charge (Sức -10, 2 khắc) is taken on «Sẵn sàng» (kgDefer); the ✕ before it = free back */
function wkPracOpen(k){{
 if(typeof playArt==="function"){const pick=wkPend||{kind:WDEF[k],mat:0};wkPend=null;const an=ARTS.find(x=>x.k===k).n;S.mg={k,l:5,mode:"prac",wk:pick,pa:1};
  try{playArt({art:k,title:`Tự học ${an}`,quick:{n:"Học nhanh",sure:1,win:"không ra thành phẩm"},onDone:(raw,o)=>{S.mg=null;if(o&&o.skipped)log("Tự học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,cl(Math.round(raw),0,10),"tự học");render()}});return}catch(x){S.mg=null}}
 S.mg={k,l:5,mode:"prac"};save();render();resumeMG()}}
/* perishable works spoil at the end of the week */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){const n0=S.inv.length;S.inv=S.inv.filter(e=>!(e.wk&&e.wk.p!=null&&e.wk.p<wk()));if(S.inv.length<n0)log("Món nấu, bình hoa để quá tuần đã hỏng, phải bỏ.");for(const v of rivals)if(v.inv)v.inv=v.inv.filter(e=>!(e.wk&&e.wk.p!=null&&e.wk.p<wk()))}}catch(x){}return r}})();
/* ---- fold the old j2 acts into this system ---- */
const WFOLD=/^(Dâng canh ở ngự thư phòng|Cắm hoa dâng Hoàng thượng|Thêu khăn bán ra ngoài|Làm thơ dâng lên)$/;
(function(){const p0=pool;pool=function(){const A=p0.apply(this,arguments);return Array.isArray(A)?A.filter(a=>!WFOLD.test(a.n)):A}})();
/* the deck offers one quick study session that ends with a dish, flowers, a poem or a handkerchief (the folded acts) */
function wkDeckCard(){const k=pick(["mon","bhoa","tho","theu"]),K=WK[k],a=K.a,m=k==="mon"?1:0;const s=wkSubj(k),l=S.arts[a],prac=l>=5;
 const t=k==="mon"?(S.emp.known.dish?`Tự tay nấu ${s}, món ngài thích.`:`Tự tay nấu ${s}; chưa biết ngài thích món gì.`):k==="bhoa"?(S.emp.known.flower?`Cắm một bình ${s}, loài hoa ngài yêu.`:`Cắm một bình ${s}; chưa biết ngài thích hoa gì.`):k==="tho"?"Mài mực, viết một bài thơ.":"Thêu một chiếc khăn lụa.";
 const an=ARTS.find(x=>x.k===a).n;
 return{n:`${prac?"Tự học":"Tự học"} ${an}: ${K.n.toLowerCase()}`,t,c:Object.assign({suc:prac?-BAL.artLes.prac:-BAL.artLes.self},K.mat[m]?{bac:-K.mat[m]}:{}),o:100,k:2,w:{},dom:"Tài nghệ",lock:!prac&&S.suc<BAL.sucNeed.self,
  x:`${prac?"":`tiến bộ ${an} ${crsGainW("self",l)} · `}tự tay chơi thì ra thành phẩm · ${wkOddsTxt(S,k,m)}`,go:()=>{S.mg={k:a,l,mode:prac?"prac":"self",wk:{kind:k,mat:m,subj:s}};save();resumeMG()}}}
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);try{if(!S||S.out||(S.srv&&!S.srv.risen)||(typeof isSrv==="function"&&isSrv())||!Array.isArray(deck))return;/* ROLE PARITY: a risen maid gets the works card like a born consort */deck.push(wkDeckCard())}catch(e){}}})();
/* ---- the chest: works listed with every use and its true gain and cost ---- */
function wkTargets(a){const L=[["emp","Hoàng thượng"]];if(!S.thDead)L.push(["th","Thái hậu"]);liveRivals(true).forEach(v=>L.push([v.id,`${rkName(v)} ${v.name}`]));if(a.maid)L.push(["maid",`${a.maid.name} (cung nữ thân tín)`]);return L}
function wkTgt(id){return id==="emp"||id==="th"||id==="maid"?id:RV(+id)}
function wkGainTxt(ev,r){const F=[];if(ev.fx.sung)F.push(sgStat(ev.fx.sung)/* SG-CARD marker: drawn once */);if(ev.fx.an)F.push(`Ân tình +${ev.fx.an}`);if(ev.fx.th)F.push(`Thái hậu với ngươi +${ev.fx.th}`);if(ev.fx.danh)F.push(`Danh +${ev.fx.danh}`);if(ev.fx.hh)F.push(`Hoàng hậu với ngươi +${ev.fx.hh}`);if(ev.fx.maid)F.push(`Thiện cảm +${ev.fx.maid}`);if(ev.rel)F.push(pvQuy(r&&typeof r==="object"?r:null,ev.rel,"thiện cảm nàng"));return F.concat(ev.notes.map(n=>n)).join(" · ")}
PEND.wkgive=p=>{const e=S.inv[p.ix];if(!e||!e.wk)return null;const w=e.wk;const O=[],no=[];
 for(const [id,n] of wkTargets(S)){const r=wkTgt(id);if(!r)continue;const ev=wkEval(S,w,r);if(!ev.ok){if(ev.why)no.push(`${n}: ${ev.why}`);continue}
  O.push({n,fx:{},x:wkGainTxt(ev,r),go:()=>{spend(BAL.btn.wkGive.k);log(wkGive(S,r,S.inv.indexOf(e)))}})}
 if(w.kind==="mon"&&S.inv.some(x=>x.k==="hacdinh"&&!x.h))for(const v of liveRivals(true)){const sp=caughtOdds(S,v,true);
  O.push({n:`Lén bỏ Hạc đỉnh hồng rồi tặng ${rkName(v)} ${v.name}`,fx:{},x:`${word(oPoison(S))} · thành: nàng trúng độc, Sức ${balSg(-BAL.rl.j8.hit.strong)}, thường là chết, dùng hết 1 Hạc đỉnh hồng · hỏng: bị tra ra, ban chết · kèm: Đức ${balSg(ACT.poison.c.duc)} · nàng phát giác trước, nắm ${balAb(BAL.eff.j8.evCaught)} chứng cứ: ${chanceW(sp)}`,/* previews: caught (ACT.poison.f, via wkPoison) */go:()=>{spend(BAL.btn.wkGive.k);log(wkPoison(S,v,S.inv.indexOf(e)))}})}
 O.push({n:"Thôi",fx:{}});
 return{t:`<p>Dâng, tặng <b>${w.n}</b> (${WTIER[w.ti]}, ${w.bn==="ngươi"?"tự tay ngươi làm":"của "+w.bn}) cho ai? Tốn ${BAL.btn.wkGive.k} khắc.</p><p class="past">Đồ quý mua bằng bạc giá trị hơn: dâng Hoàng thượng: Tranh cổ ${sgStat(Math.max(1,Math.round(IT.tranhco.gv/2)))}, Đàn cổ ${sgStat(Math.max(1,Math.round(IT.dancoc.gv/2)))}. Đồ tự tay làm được thêm chân tình với người hiền hậu, thêm hợp ý khi trúng sở thích.${no.length?"<br>"+no.join("<br>"):""}</p>`,o:O}};
function wkAct(a,ix){const e=S.inv[ix];if(!e||!e.wk||S.dead||Q.length)return;
 if(a==="give"){if(!can(BAL.btn.wkGive.k))return;pushDil(mkP("wkgive",{ix}),"Dâng, tặng tác phẩm");render();return}
 if(a==="sell"){if(!can(BAL.btn.wkSell.k))return;const fz=wkSellO(S);/* read before the spend (j9 fzRun) */spend(BAL.btn.wkSell.k);log(fzRun(fz,null,()=>wkSell(S,ix)));render();return}
 if(a==="show"){wkShow(ix);return}}
if(typeof wrapR==="function")wrapR("wkAct",(a,ix)=>({give:"Dâng, tặng",sell:"Bán ra ngoài cung",show:"Bày ở yến tiệc"})[a]||"");
function wkCardsHTML(){const L=S.inv.map((e,i)=>[e,i]).filter(([e])=>e.wk&&!e.h);if(!L.length)return"";const t2=whyTime(BAL.btn.wkGive.k),t1=whyTime(BAL.btn.wkSell.k);
 return `<div class="ph"><span>Tác phẩm tự tay (${L.length})</span><span>Thường · Khá · Tinh xảo · Tuyệt phẩm</span></div><div class="cards">`+L.map(([e,i])=>{const w=e.wk,a=ARTS.find(x=>x.k===w.a);const sv=wkSellVal(w),so=wkSellO(S);const cb=wkContestB(S,w.a);
  const B=[pbtn(`data-wk="give" data-ix="${i}"`,"Dâng, tặng",`tốn: ${BAL.btn.wkGive.k} khắc · thành: chọn người, xem được bao nhiêu`,t2),
   pbtn(`data-wk="sell" data-ix="${i}"`,"Bán ra ngoài cung",`${word(so)} · tốn: ${BAL.btn.wkSell.k} khắc · thành: Bạc +${sv} · hỏng: Danh ${balSg(BAL.eff.j83.danhWkSell)}, mất tác phẩm`,t1)];
  if(!w.show&&!(w.p!=null))B.push(pbtn(`data-wk="show" data-ix="${i}"${capAt(BAL.btn.wkShow)}`,"Bày ở yến tiệc",`${capW()} · tốn: ${BAL.btn.wkShow.k} khắc · thành: Danh +${WSHOW[w.ti]}${w.ti===3?` · kèm: phi tần ghen +${ghenN(BAL.ghen.showTreasure)}`:""}`,t2));
  return `<div class="card"><h4>${ic(AIMG[w.a],20)}${w.n}</h4><p><b>${WTIER[w.ti]}</b> (${w.q} phần) · ${a?a.n:""} · ${w.bn==="ngươi"?"tự tay ngươi làm":"của "+w.bn} · ${w.d}${w.p!=null?" · phải dâng trong tuần này":""}${w.show?" · đã bày ở yến tiệc":""}${cb?` · Tranh ghế vòng Tài nghệ +${cb}`:""}</p><div class="rbtn">${B.join("")}</div></div>`}).join("")+`</div>`}
(function(){const i0=invHTML;invHTML=function(){const W=S.inv.filter(e=>e.wk&&!e.h);W.forEach(e=>e.h=1);let h;try{h=i0.apply(this,arguments)}finally{W.forEach(e=>delete e.h)}
 if(!W.length)return h;h=h.replace(/<p class="past">Rương trống\.[^<]*<\/p>/,"");return h+wkCardsHTML()}})();
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-wk]");if(!b||b.disabled)return;ev.stopPropagation();const k=b.dataset.wk;
 if(k==="give"||k==="sell"||k==="show")wkAct(k,+b.dataset.ix);else if(k==="prac")wkPractice(b.dataset.art)},true);
/* ---- the Tài nghệ tab: what each art's sessions produce; practice once mastered ---- */
function wkTabHTML(){const why=whyTime(BAL.artLes.pk)||(S.suc<BAL.sucNeed.wk?"Sức dưới "+BAL.sucNeed.wk:"");
 let h=`<div class="ph"><span>Mỗi buổi học hay tự học mà tự tay chơi trò tài nghệ thì ra một tác phẩm (Học nhanh: không ra thành phẩm), cất vào rương để dâng, tặng, bán, bày ở yến tiệc. Phẩm = phần chơi trò tài nghệ (từ 0 đến 10) + chút bậc tài nghệ + vật liệu.</span><span>Đồ mua bằng bạc vẫn quý hơn</span></div><div class="arts">`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],ks=wkKindsOf(a.k);if(!ks.length)return"";const B=l>=5?[pbtn(`data-wk="prac" data-art="${a.k}"`,"Tự học, làm tác phẩm",`tốn: Sức ${balSg(-BAL.artLes.prac)}, ${BAL.artLes.pk} khắc · thành: một tác phẩm, ${wkOddsTxt(S,ks[0],0)}`,why)]:[];
  return `<div class="art"><b>${ic(AIMG[a.k],20)}${a.n} · bậc ${l}: +${wkLvQ(S,a.k)}</b><span class="u">${ks.map(k=>`${WK[k].w}${WK[k].per?" (để 1 tuần)":""}${WK[k].fin?" ("+wkFinTxt(WK[k])+")":""}`).join(" · ")}</span><span class="u">${wkTierTxt(S,ks[0],0)}</span>${B.length?`<div class="pcb">${B.join("")}</div>`:""}</div>`}).join("")+`</div>`;
 return h}
(function(){const a0=artTabHTML;artTabHTML=function(){return a0.apply(this,arguments)+wkTabHTML()}})();
/* ---- incoming gift dialog shows the work's real name ---- */
(function(){const g0=PEND.giftin;PEND.giftin=function(p){const d=g0.apply(this,arguments);try{if(d&&p&&p.e&&p.e.wk){const w=p.e.wk;d.t=d.t.replace(/<b>Tác phẩm tự tay<\/b>/,`<b>${w.n}</b>`).replace(/<p class="past">Tự tay làm<\/p>/,`<p class="past">${WTIER[w.ti]} (${w.q} phần) · ${w.bn} tự tay làm · ${w.d}</p>`)}}catch(x){}return d}})();
/* ---- NPC consorts use the same system: each of their lessons ends with a work (raw score 0..10, same formula); they present, give or sell ---- */
function wkNpcMake(v,a){const ks=wkKindsOf(a);if(!ks.length)return;const k=pick(ks),K=WK[k];const mat=v.bac>=80&&roll(50)?2:v.bac>=20&&roll(50)?1:0;if(K.mat[mat])ap(v,{bac:-K.mat[mat]});invAdd(v,wkMake(v,k,mat,wkNpcRaw(v,k)))}
/* an NPC's stand-in for the player's mini-game score of a handmade work (0–10): ONE function for every NPC-made work (wkNpcMake, jagharm cook) */
/* AG-ALL-2b mg2 (owner OD 17/11 ~15:25Z (3)): the work's own game (jwkg WKGAME) on her practice board (occ hoc, as playArt) = one draw of jmgt mgNpcRaw;
   no maker given (an old caller) = the matching-level board. Off (agOn false) = the old flat R(11). */
function wkNpcRaw(v,k){if(!(typeof mg2On==="function"&&mg2On()))return R(11);const g=(typeof WKGAME!=="undefined"&&WKGAME[k])||k||"banh";
 return mgNpcRaw(g,v,v?{occ:"hoc"}:{occ:"hoc",d:0})}
function wkNpcUse(v){const i=v.inv.findIndex(e=>e.wk&&!e.h);if(i<0)return;const w=v.inv[i].wk;if(!npcWhy("wkUse",{p:v,w}))return;/* npc-purpose G2c: she uses her work for her own aim (favour, a friend, need of bạc, a grudge) */
 const o=npwPick(wkUseOpts(v,w),x=>x.s);if(!o)return;
 if(o.k==="poison"){if(roll(BAL.ag.why.g2wk.poisonP)){const r=wkPoison(v,o.t,i);if(o.t===S&&r)log(r)}return}
 if(o.k==="sell"){wkSell(v,i);return}
 const r=o.t;if(r){const t=wkGive(v,r,i);if(r===S&&t)log(t)}}
function wkGrudge(v,t){return t===S?Math.max(v.ghen||0,hostility(v,S)):hostility(v,t)}
function wkUseOpts(v,w){const B=BAL.ag.why.g2wk,L=[];
 if(w.kind==="mon"&&v.malice>B.malice&&v.inv.some(e=>e.k==="hacdinh"&&!e.h)){const t=npwPick(others(v).filter(t=>t.alive&&!t.out),t=>wkGrudge(v,t)-B.host);if(t)L.push({k:"poison",t,s:wkGrudge(v,t)})}
 if(v.sung<B.sungHi&&wkEval(v,w,"emp").ok)L.push({k:"emp",t:"emp",s:B.emp+(B.sungHi-v.sung)});
 if(!S.thDead&&(v.th||0)<B.thWant&&wkEval(v,w,"th").ok)L.push({k:"th",t:"th",s:B.th+(B.thWant-(v.th||0))/2});
 const f=npwPick(others(v).filter(t=>t!==v&&(t===S?v.rel>=netTh(v,"quen"):rel(v,t)>0)&&wkEval(v,w,t).ok),t=>1+(t===S?v.rel:rel(v,t)));if(f)L.push({k:"gift",t:f,s:B.gift+(f===S?v.rel:rel(v,f))});
 if(w.ti<=1&&!WK[w.kind].per&&(v.bac||0)<B.poor)L.push({k:"sell",s:B.sell+B.poor-(v.bac||0)});return L}
(function(){const m0=npcMonthly;npcMonthly=function(v){const b=v&&v.arts?Object.assign({},v.arts):null,bp=v&&v.artp?Object.assign({},v.artp):null;const ev=m0.apply(this,arguments);
 try{if(v&&v.alive&&!v.out){if(!v.inv)v.inv=[];if(b&&bp)for(const a in v.arts)if(v.arts[a]!==b[a]||(v.artp||{})[a]!==bp[a]){if(v.inv.filter(e=>e.wk).length<4)wkNpcMake(v,a);break}wkNpcUse(v)}}catch(x){}return ev}})();
/* ---- poison in a dish: a scheme with the same odds, evidence trail and Đức loss as Hạ độc (ACT.poison); needs Hạc đỉnh hồng in the chest ---- */
function wkPoison(a,t,ix){const e=a.inv[ix];if(!e||!e.wk||e.wk.kind!=="mon"||!a.inv.some(x=>x.k==="hacdinh"&&!x.h)||!t||!t.alive)return"";a.inv.splice(ix,1);
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`;const r=ACT.poison.f(a,t);return `${by} lén bỏ Hạc đỉnh hồng vào ${e.wk.n} rồi sai người mang tặng ${t===S?"ngươi":rkName(t)+" "+t.name}. ${r||""}`}
if(typeof wrapR==="function")wrapR("wkPoisonPick",()=>"Bỏ độc vào món");
/* ================= ĐỒ CẤM: reliable but risky ways to get poison, same rules for every consort =================
   effect and how traceable each poison is, shown on the chest card */
const WILL={hacdinh:{eff:"chết",tr:"dễ lần ra: thái y nhận ra ngay, tra được người mua"},xahuong:{eff:"sảy thai (trộn vào túi thơm, hương trầm)",tr:"khó lần ra: mùi lẫn trong hương"},botngua:{eff:"ngứa, mất thể diện, Danh {n:eff.j8.danhUseItem}",tr:"vừa: áo dính bột còn để lại dấu"}};sgRuleObj(WILL.botngua,"eff");/* the same key j8 useItem applies */
/* jreg: forbidden goods added later (jpoison docngam/phanhuy/meduoc) get the same Hiệu quả / Dấu vết line */
regEach(WILL,k=>{if(IT[k]&&!/Hiệu quả:/.test(itm(k).d))IT[k].d+=` · Hiệu quả: ${WILL[k].eff} · Dấu vết: ${WILL[k].tr}`},"WILL desc");
/* who ends up holding evidence when a buyer is exposed: the Empress, else the most hostile consort */
function illWitness(p){const q=queenP();if(q&&q!==p)return q;const L=consorts().filter(x=>x!==p&&x.alive&&!x.out);if(!L.length)return null;return mindPickBy(L,x=>BAL.mind.pick.j83.base+hostility(x,p)*mindW(x,"frame"),null)}/* npc-mind: was ARGMAX */
/* she is a holder too (S has no alive flag: review FAIL 6 #3, the act was one-way) */
function illAllies(p){return consorts().filter(v=>v!==p&&(v===S||v.alive)&&!v.out&&!v.coop&&aff(v,p)>=netTh(v,"than")&&(v.inv||[]).some(e=>WILL[e.k]&&!e.h&&!e.t))}
const IROUTE={
 maid:{n:"Sai cung nữ thân tín mua lén ngoài cung",k:1,ks:Object.keys(WILL),cost:k=>itm(k).pr+15,o:p=>oddsCl(Math.round(55+(p.maid?p.maid.loyal:0)/3+eyes(p)*2)),
  need:p=>!p.maid?"không có cung nữ thân tín":p.maid.loyal<BAL.loy.low?`Thiện cảm ${p.maid.name} dưới ${balAb(BAL.loy.low)}, nàng không dám đi`:"",when:"tuần sau mới mang về",fail:p=>`${p.maid?p.maid.name:"cung nữ"} bị bắt ở cửa Thần Vũ, khai ra ngươi (${balAb(BAL.eff.j83.evIllBuy_2)} chứng cứ), Thiện cảm -${balAb(BAL.eff.j83.loyalIllBuy)}, mất bạc`},
 thaiy:{n:"Hối lộ người ở Thái y viện",k:1,ks:["hacdinh","xahuong"],cost:k=>itm(k).pr+40,o:p=>oddsCl(70+eyes(p)*3),need:()=>"",when:"có ngay",fail:()=>`thái y tố giác: Danh ${balSg(BAL.eff.j83.danhIllThaiy)}, người đứng sau nắm ${balAb(BAL.eff.j83.evIllBuy_3)} chứng cứ, mất bạc`},
 cho:{n:"Chợ đen ở cửa Thần Vũ",k:2,ks:Object.keys(WILL),cost:k=>itm(k).pr,o:p=>oddsCl(Math.round(60+(p.tamco||0)/5)),need:p=>p.confined?"đang bị cấm túc":!(S.tuan===2&&(S.buoi||0)===B4L)?"chỉ họp buổi tối hạ tuần":"",when:"có ngay",/* previews: illBuy */fail:()=>`thị vệ bắt gặp: Danh ${balSg(BAL.eff.j83.danhIllCho)}, người đứng sau nắm ${balAb(BAL.eff.j83.evIllBuy_4)} chứng cứ, mất bạc`},
 ally:{n:"Xin đồng minh",k:2,ks:Object.keys(WILL),cost:()=>0,o:()=>100,need:p=>illAllies(p).length?"":"chưa có đồng minh thân tình đang giữ đồ cấm",when:"tùy đồng minh trả lời",fail:()=>""}};
/* one attempt: same function for her and for every consort; returns the log line */
function illBuy(p,r,k,from,paid){const R0=IROUTE[r],nm=p===S?"Ngươi":`${rkName(p)} ${p.name}`;
 /* RECEIVER CHOICE (review FAIL 6 #3): the holder answers with the 4 answers (jrcv RCVK.illAlly) — an NPC holder picks, she as the holder gets the card.
    evok: the holder's chứng cứ is given in rcvIllGive (evA(holder, asker, BAL.eff.j83.evIllBuy)) */
 if(r==="ally"){const v=from||illAllies(p).find(x=>(x.inv||[]).some(e=>e.k===k&&!e.h&&!e.t));if(!v)return"";
  if(typeof rcvAsk==="function")return rcvAsk("illAlly",p,v,k)||"";
  const i=v.inv.findIndex(e=>e.k===k&&!e.h&&!e.t);if(i<0)return"";v.inv.splice(i,1);invAdd(p,{k,from:key(v)});/*evok: illBuy deed*/evA(v,p,BAL.eff.j83.evIllBuy);return `${nm} xin ${rkName(v)} ${v.name} ${itm(k).n}. Nàng nắm ${balAb(BAL.eff.j83.evIllBuy)} chứng cứ của ${p===S?"ngươi":p.name}. `}
 /* RECEIVER CHOICE (review FAIL 6 #2): the trusted maid is ORDERED — she answers Vâng lệnh / Từ chối / Mật báo (jagstf2 stf2Ord, the j42 cnvOrdOpts card,
    the same pick as every dirty act's sent servant j29 DIRTY / DIRTY_SENT: bribel, laydo, laydol), her maid and an NPC's alike; refused → nothing spent */
 let hf=0;if(r==="maid"&&p.maid&&typeof stf2Ord==="function"){const oc=stf2Ord(p,p.maid,null,"illMaid");/* «làm qua loa» (parallel-time stf2Ord «half»): she goes, at the odds − BAL.road.hp.half (as every dirty order, j29 ordHalf) */if(oc==="half")hf=BAL.road.hp.half;if(oc&&oc!=="obey"&&oc!=="half"){if(paid&&p===S)apply({bac:R0.cost(k)});if(p===S)p.maid.kn=1;
   return p===S?(oc==="refuse"?`${p.maid.name} quỳ xin nương nương đừng sai việc mua đồ cấm; việc không thành. `:`${p.maid.name} viện cớ thoái thác, không đi; việc không thành. `):`${nm} sai ${p.maid.name} mua lén đồ cấm, nàng không đi. `}}
 const c=R0.cost(k);if(!paid){if(p.bac<c)return"";ap(p,{bac:-c})}if(typeof ducAdd==="function")ducAdd(p,BAL.rl.j83.ducIllBuy,"mua đồ cấm");else ap(p,{duc:BAL.rl.j83.ducIllBuy});
 if(roll(hf?oddsCl(R0.o(p)-hf):R0.o(p))){if(r==="maid"){p.illP=p.illP||[];p.illP.push({k,w:wk()+1});return `${nm} sai ${p.maid.name} lén mua ${itm(k).n} ngoài cung; tuần sau mang về. Bạc -${c}. `}invAdd(p,{k});return `${nm} có được ${itm(k).n} (${R0.n.toLowerCase()}). Bạc -${c}. `}
 const w=illWitness(p);if(r==="maid"){evA(w,p,BAL.eff.j83.evIllBuy_2);if(p.maid)p.maid.loyal=cl(p.maid.loyal-BAL.eff.j83.loyalIllBuy,0,100)}else if(r==="thaiy"){ap(p,{danh:BAL.eff.j83.danhIllThaiy});evA(w,p,BAL.eff.j83.evIllBuy_3)}else{ap(p,{danh:BAL.eff.j83.danhIllCho});evA(w,p,BAL.eff.j83.evIllBuy_4)}
 if(p!==S)newsAdd(p,"illicit",`Người của ${nm} bị bắt khi lén mua đồ cấm.`);
 return `<span class="r">${nm} mua lén ${itm(k).n} không thành: ${R0.fail(p)}${w?` (${w===S?"ngươi":rkName(w)+" "+w.name} giữ chứng cứ)`:""}.</span> `}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)for(const p of consorts()){if(!p.illP||!p.illP.length)continue;const now=p.illP.filter(x=>x.w<=wk());p.illP=p.illP.filter(x=>x.w>wk());for(const x of now){invAdd(p,{k:x.k});if(p===S)log(`${S.maid?S.maid.name:"Cung nữ"} lén mang ${itm(x.k).n} về, giấu trong rương.`)}}}catch(x){}return r}})();
function illAsk(r){const R0=IROUTE[r];if(S.dead||Q.length||!can(R0.k)||R0.need(S))return;const O=[];
 if(r==="ally"){for(const v of illAllies(S))for(const e of v.inv.filter(e=>WILL[e.k]&&!e.h&&!e.t).slice(0,3))O.push({n:`${itm(e.k).n} của ${rkName(v)} ${v.name}`,fx:{},
  x:`${typeof rcvWord==="function"?rcvWord(v,S):capW()} · nàng có thể đưa, nhường lại lấy bạc, từ chối hoặc đem chuyện đi mách · đưa: có ${itm(e.k).n} (${WILL[e.k].eff}), nàng nắm ${balAb(BAL.eff.j83.evIllBuy)} chứng cứ của ngươi`,go:()=>{spend(R0.k);log(illBuy(S,"ally",e.k,v))}})}
 else for(const k of R0.ks){const c=R0.cost(k);O.push({n:`${itm(k).n}: ${WILL[k].eff}`,fx:{bac:-c},x:`${word(R0.o(S))} · thành: có ${itm(k).n}, ${R0.when} · hỏng: ${R0.fail(S)} · kèm: Đức ${balSg(BAL.rl.j83.ducIllBuy)}`,go:()=>{spend(R0.k);log(illBuy(S,r,k,null,1))}})}
 O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:R0.n,who:pMe(),h:`<p>${R0.n}. Tốn ${R0.k} khắc.</p><p class="past">${Object.keys(WILL).map(k=>`${itm(k).n}: ${WILL[k].eff}; ${WILL[k].tr}`).join("<br>")}</p>`,opts:O});showModal();render()}
if(typeof wrapR==="function")wrapR("illAsk",r=>IROUTE[r]?IROUTE[r].n:"");
/* ACT-MERGE J4: «Mua đồ» = ONE button; the three buying roads (nhờ cung nữ · Thái y viện · chợ đen) are ways inside its option dialog, each keeps its own odds, price, failure and Đức -3.
   «Xin đồng minh» stays its own button (a favour from a friend, answered by her, not a purchase). */
const ILL_WAYS=()=>Object.keys(IROUTE).filter(r=>r!=="ally");
function illWayLine(r){const R0=IROUTE[r],lo=Math.min(...R0.ks.map(R0.cost)),hi=Math.max(...R0.ks.map(R0.cost));return `${word(R0.o(S))} · tốn: ${R0.k} khắc, Bạc -${lo} đến -${hi} · thành: có độc dược, ${R0.when} · hỏng: ${R0.fail(S)} · kèm: Đức ${balSg(BAL.rl.j83.ducIllBuy)}`}
const ILL_SHOP_X="thành: xem hàng, mua đồ từ ngoài cung qua thái giám Nội vụ phủ";/* the public road's line: one text for the door row and the card's Được (E-GAIN3) */
function illDoor(){if(S.dead||Q.length)return;/* ONE DOOR ENGINE: rows only, the card is DOOR.card via j4Card (jactj4.js) */
 const O=[{n:"Nhờ thái giám mua đồ",x:ILL_SHOP_X,go:()=>invAct("shop")}];
 for(const r of ILL_WAYS()){const R0=IROUTE[r],why=whyTime(R0.k)||R0.need(S);O.push(Object.assign({n:R0.n,x:illWayLine(r),go:()=>illAsk(r)},why?{off:{why:String(why)}}:{}))}
 j4Card("Mua đồ","Chọn đường mua. Ba đường lén mua đồ cấm (độc dược không bán công khai): bị lộ là có người nắm chứng cứ của ngươi.",O)}
function illHTML(){const W=ILL_WAYS(),kk=W.map(r=>IROUTE[r].k),all=W.flatMap(r=>IROUTE[r].ks.map(IROUTE[r].cost)),A=IROUTE.ally,nd=A.need(S);
 return `<div class="ph"><span>Đồ cấm: độc dược không bán công khai. Bị lộ là có người nắm chứng cứ của ngươi.</span></div><div class="rbtn" style="margin-bottom:6px">`
 +pbtn(`data-ill="door"`,"Mua đồ",`chọn đường mua: Nội vụ phủ (công khai) / nhờ cung nữ / Thái y viện / chợ đen (đồ cấm: mỗi đường có thành bại riêng; tốn ${Math.min(...kk)} đến ${Math.max(...kk)} khắc, Bạc -${Math.min(...all)} đến -${Math.max(...all)})${(g=>g?" · "+g:"")(typeof doorGain==="function"?doorGain([ILL_SHOP_X].concat(W.map(illWayLine))):"")}`,"")
 +pbtn(`data-ill="ally"`,A.n,`tốn: ${A.k} khắc · tùy đồng minh: đưa, nhường lại lấy bạc, từ chối hoặc đem đi mách · đưa: nàng nắm ${balAb(BAL.eff.j83.evIllBuy)} chứng cứ của ngươi`,whyTime(A.k)||nd)+`</div>`}
(function(){const i0=invHTML;invHTML=function(){const h=i0.apply(this,arguments);const j=h.indexOf('</div>',h.indexOf('class="rbtn"'));return j<0?h+illHTML():h.slice(0,j+6)+illHTML()+h.slice(j+6)}})();
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-ill]");if(!b||b.disabled)return;ev.stopPropagation();(b.dataset.ill==="door"?illDoor():illAsk(b.dataset.ill))},true);
/* NPCs: the malicious look for poison by the same routes — no longer a monthly dice (malice > 60, roll 8): an NPC consort CHOOSES a route in her
   day plan (jagacts4 cx4:ill<route>, role-parity part 2, canon overwrite) with the same need / cost / odds / failure (IROUTE + illBuy). */
