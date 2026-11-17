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
function wkGive(a,r,ix,quietLog){const e=a.inv[ix];if(!e||!e.wk)return"";const w=e.wk;const ev=wkEval(a,w,r);if(!ev.ok)return"";a.inv.splice(ix,1);
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`,wn=`${w.n} (${WTIER[w.ti]})`;
 if(r==="emp"){S.wkE=wkEmpLog();S.wkE.push({w:wk(),by:key(a),kind:w.kind});ap(a,ev.fx);if(a!==S)newsAdd(a,"gift",`${by} dâng ${wn} tự tay làm lên Hoàng thượng.`);
  return `${by} dâng ${wn} lên Hoàng thượng${ev.notes.length?" ("+ev.notes.join("; ")+")":""}. ${a===S?fmt(ev.fx):"Sủng +"+ev.fx.sung}. `}
 if(r==="th"){ap(a,ev.fx);if(a!==S)newsAdd(a,"gift",`${by} dâng ${wn} tự tay làm lên Thái hậu.`);return `${by} dâng ${wn} lên Thái hậu${ev.notes.length?" ("+ev.notes.join("; ")+")":""}. ${a===S?fmt(ev.fx):""}`}
 if(r==="maid"){ap(a,ev.fx);return `${by} tặng ${a.maid.name} ${wn}. Lòng ${a.maid.name} +${ev.fx.maid}. `}
 relAdd(a,r,ev.rel);if(ev.fx.hh)ap(a,{hh:ev.fx.hh});
 const ent=Object.assign({},e,{wk:Object.assign({},w,{from:key(a)})});
 if(r===S){pushDil(mkP("giftin",{f:key(a),e:ent}),"Quà tặng");newsAdd(a,"gift",`${by} tặng ngươi ${wn} tự tay làm.`,true);return `${by} sai người mang ${wn} sang tặng ngươi. `}
 r.inv.push(ent);if(a!==S)newsAdd(a,"gift",`${by} tặng ${rkName(r)} ${r.name} ${wn} tự tay làm.`);
 return `${by} tặng ${rkName(r)} ${r.name} ${wn}${ev.notes.length?" ("+ev.notes.join("; ")+")":""}: thiện cảm +${ev.rel}. `}
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];if(e&&e.wk)return wkGive(a,r,ix)||"";return g0.apply(this,arguments)}})();
/* sell outside the palace: silver, risk of Danh if found out (same odds for every consort) */
function wkSellVal(w){return 0}/* replaced by jecon (BAL.craftSell) */
function wkSellO(p){return cl(75+((p.mat||0)*3),5,95)}
function wkSell(p,ix){const e=p.inv[ix];if(!e||!e.wk)return"";const w=e.wk;p.inv.splice(ix,1);const nm=p===S?"Ngươi":`${rkName(p)} ${p.name}`;
 if(roll(wkSellO(p))){ap(p,{bac:wkSellVal(w)});return `${nm} nhờ người mang ${w.n} ra cửa Thần Vũ bán. Bạc +${wkSellVal(w)}. `}
 ap(p,{danh:-3});if(p!==S)newsAdd(p,"sell",`${nm} lén bán đồ tự làm ra ngoài cung, bị bắt gặp.`,false);return `<span class="r">${nm} lén bán ${w.n} ra ngoài cung thì bị thị vệ cửa Thần Vũ bắt gặp, đồ bị tịch thu.</span> Danh -3. `}
/* show at a banquet: Danh by tier, once per work, the work stays */
function wkShow(ix){const e=S.inv[ix];if(!e||!e.wk||e.wk.show||!can(2))return;spend(2);e.wk.show=1;const w=e.wk;const f={danh:WSHOW[w.ti]};apply(f);if(w.ti===3)ghenAll(BAL.ghen.showTreasure);
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
function wkFinishLesson(k,pick,raw,how){const kind=WK[pick.kind]&&WK[pick.kind].a===k?pick.kind:WDEF[k];const mat=pick.mat||0;const e=wkMake(S,kind,mat,raw,pick.subj);S.inv.push(e);const K=WK[kind];
 let fin="";if(K.fin){if(wkFinLeft()>0){apply(K.fin);S.wkFin=S.wkFin&&S.wkFin.t===S.turn?S.wkFin:{t:S.turn,n:0};S.wkFin.n++;fin=" "+fmt(K.fin)}else fin=" Tháng này Đức đã tăng rồi, món này không thêm Đức."}
 S.wkN=(S.wkN||0)+1;log(`<span class="g">Buổi ${how} làm ra ${e.wk.n}: phẩm ${WTIER[e.wk.ti]}</span> (${wkParts(S,kind,mat,raw)}). Cất vào rương${K.per?"; phải dâng trong tuần này":""}.${fin}`)}
(function(){const o0=openMG;openMG=function(k,lv,cb){const m=S&&S.mg;if(!m||m.k!==k)return o0.apply(this,arguments);if(m.pa&&typeof playArt==="function"){S.mg=null;playArt({art:k,title:"Tự học",onDone:(raw,o)=>{if(!(o&&o.skipped))wkFinishLesson(k,m.wk||{kind:WDEF[k],mat:0},cl(Math.round(raw),0,10),"tự học");else log("Tự học nhanh: không ra thành phẩm.");render()}});return}
 if(!m.wk)m.wk=wkPend||{kind:WDEF[k],mat:0};wkPend=null;const pick=m.wk;let skip=false;const ms=S.master?2:1;
 const cb2=g=>{const raw=wkRawOfPts(Math.round(g/ms));if(m.mode==="prac"){S.mg=null;if(skip)log("Tự học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,raw,"tự học");render();return}if(skip)return cb(g);
  const r=cb(g);try{wkFinishLesson(k,pick,raw,m.mode==="self"?"tự học":m.mode==="th"?"học với Thái hậu":"học");render()}catch(x){}return r};
 if(typeof playArt==="function"){try{const an=ARTS.find(x=>x.k===k).n;playArt({art:k,title:`${m.mode==="prac"?"Tự học":"Học"} ${an}`,onDone:(raw,o)=>{const sk2=!!(o&&o.skipped);raw=cl(Math.round(raw||0),0,10);const pts=sk2?(roll(od(35))?1:0):(P=>raw>=P[2]?3:raw>=P[1]?2:raw>=P[0]?1:0)(BAL.mgTier.lessonPts);
   if(m.mode==="prac"){S.mg=null;if(sk2)log("Tự học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,raw,"tự học");render();return}cb(pts*ms);if(sk2)return;try{wkFinishLesson(k,pick,raw,m.mode==="self"?"tự học":m.mode==="th"?"học với Thái hậu":"học");render()}catch(x){}}});return}catch(x){}}
 const r=o0.call(this,k,lv,cb2);
 try{const sk=$("mgskip"),os=sk.onclick;const kind=WK[pick.kind]?pick.kind:WDEF[k];sk.innerHTML=`Học nhanh<small>${kitParse(`${m.mode==="prac"?"Chắc chắn":word(od(35))} · thành: ${m.mode==="prac"?"":"tiến bộ một phần · "}không ra thành phẩm`)}</small>`;
  sk.onclick=()=>{skip=true;os()};const h=$("mgh");if(h)h.textContent+=` Tự tay làm (chơi): ra thành phẩm, ${WK[kind].w.toLowerCase()}: phẩm = phần chơi (từ 0 đến 10) + ${ARTS.find(x=>x.k===k).n} bậc ${wkLv(S,k)}: +${wkLv(S,k)}${WMAT[pick.mat||0]?` + vật liệu: +${WMAT[pick.mat||0]}`:""}.`}catch(x){}
 return r}})();
/* product dialog in front of every lesson button (and the practice button once an art is mastered) */
function wkLessonOK(k,mode){const l=S.arts[k],cost=tchFee(k);if(!S||S.dead||Q.length||S.mg)return false;if(mode==="prac")return l>=5&&can(2)&&S.suc>=15;if(l>=5)return false;
 if(mode==="self")return can(2)&&S.suc>=25;if(mode==="th")return can(2)&&S.th>=40&&(S.buoi||0)===0&&!S.thDead;return can(2)&&S.bac>=cost}
function wkAsk(k,mode,run){const a=ARTS.find(x=>x.k===k),l=S.arts[k],fee=mode==="teacher"?tchFee(k):0;const O=[];
 for(const kind of wkKindsOf(k)){const K=WK[kind];for(let m=0;m<3;m++)O.push({n:`${K.w} · ${K.mn[m]}`,fx:K.mat[m]?{bac:-K.mat[m]}:{},x:`${wkOddsTxt(S,kind,m)}${K.per?" · phải dâng trong tuần":""}${K.fin?" · "+wkFinTxt(K):""}`,go:()=>{wkPend={kind,mat:m};run();if(!S.mg){wkPend=null;if(K.mat[m])apply({bac:K.mat[m]})}}})}
 O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:`${mode==="prac"?"Tự học":"Học"} ${a.n}: làm ra tác phẩm gì?`,who:pMe(),h:`<p>Tự tay làm (chơi trò tài nghệ): ra thành phẩm. Học nhanh: ${mode==="prac"?"":"vẫn tiến bộ, "}không ra thành phẩm. Phẩm = phần chơi trò tài nghệ (từ 0 đến 10) + ${a.n} bậc ${l}: +${wkLvQ(S,k)} + vật liệu (thường +${WMAT[0]}, tốt +${WMAT[1]}, quý +${WMAT[2]}).</p><p class="past">${wkThTxt()}</p><p>Chỉ vật liệu quý mới thành Tuyệt phẩm. Vật liệu tốt, quý còn làm quà giá trị hơn và bán được giá hơn.${fee?` Phí thầy ${fee} bạc trả riêng.`:""}</p>`,opts:O});showModal();render()}
(function(){const l0=lessonMode;lessonMode=function(k,mode){if(wkPend||!wkLessonOK(k,mode))return l0.apply(this,arguments);wkAsk(k,mode,()=>l0.call(this,k,mode))}})();
/* practice once mastered: j82's playArt gives the raw score directly when present; otherwise the art's lesson game */
function wkPractice(k){if(!wkLessonOK(k,"prac"))return;wkAsk(k,"prac",()=>{if(!wkLessonOK(k,"prac"))return;apply({suc:-10});spend(2);
 if(typeof playArt==="function"){const pick=wkPend||{kind:WDEF[k],mat:0};wkPend=null;const an=ARTS.find(x=>x.k===k).n;S.mg={k,l:5,mode:"prac",wk:pick,pa:1};
  try{playArt({art:k,title:`Tự học ${an}`,onDone:(raw,o)=>{S.mg=null;if(o&&o.skipped)log("Tự học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,cl(Math.round(raw),0,10),"tự học");render()}});return}catch(x){S.mg=null}}
 S.mg={k,l:5,mode:"prac"};save();render();resumeMG()})}
/* perishable works spoil at the end of the week */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){const n0=S.inv.length;S.inv=S.inv.filter(e=>!(e.wk&&e.wk.p!=null&&e.wk.p<wk()));if(S.inv.length<n0)log("Món nấu, bình hoa để quá tuần đã hỏng, phải bỏ.");for(const v of rivals)if(v.inv)v.inv=v.inv.filter(e=>!(e.wk&&e.wk.p!=null&&e.wk.p<wk()))}}catch(x){}return r}})();
/* ---- fold the old j2 acts into this system ---- */
const WFOLD=/^(Dâng canh ở ngự thư phòng|Cắm hoa dâng Hoàng thượng|Thêu khăn bán ra ngoài|Làm thơ dâng lên)$/;
(function(){const p0=pool;pool=function(){const A=p0.apply(this,arguments);return Array.isArray(A)?A.filter(a=>!WFOLD.test(a.n)):A}})();
/* the deck offers one quick study session that ends with a dish, flowers, a poem or a handkerchief (the folded acts) */
function wkDeckCard(){const k=pick(["mon","bhoa","tho","theu"]),K=WK[k],a=K.a,m=k==="mon"?1:0;const s=wkSubj(k),l=S.arts[a],prac=l>=5;
 const t=k==="mon"?(S.emp.known.dish?`Tự tay nấu ${s}, món ngài thích.`:`Tự tay nấu ${s}; chưa biết ngài thích món gì.`):k==="bhoa"?(S.emp.known.flower?`Cắm một bình ${s}, loài hoa ngài yêu.`:`Cắm một bình ${s}; chưa biết ngài thích hoa gì.`):k==="tho"?"Mài mực, viết một bài thơ.":"Thêu một chiếc khăn lụa.";
 const an=ARTS.find(x=>x.k===a).n;
 return{n:`${prac?"Tự học":"Tự học"} ${an}: ${K.n.toLowerCase()}`,t,c:Object.assign({suc:prac?-10:-15},K.mat[m]?{bac:-K.mat[m]}:{}),o:100,k:2,w:{},dom:"Tài nghệ",lock:!prac&&S.suc<25,
  x:`${prac?"":`tiến bộ ${an} ${kStepW(1,2)} · `}tự tay chơi thì ra thành phẩm · ${wkOddsTxt(S,k,m)}`,go:()=>{S.mg={k:a,l,mode:prac?"prac":"self",wk:{kind:k,mat:m,subj:s}};save();resumeMG()}}}
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);try{if(!S||S.out||S.srv||(typeof isSrv==="function"&&isSrv())||!Array.isArray(deck))return;deck.push(wkDeckCard())}catch(e){}}})();
/* ---- the chest: works listed with every use and its true gain and cost ---- */
function wkTargets(a){const L=[["emp","Hoàng thượng"]];if(!S.thDead)L.push(["th","Thái hậu"]);liveRivals(true).forEach(v=>L.push([v.id,`${rkName(v)} ${v.name}`]));if(a.maid)L.push(["maid",`${a.maid.name} (cung nữ thân tín)`]);return L}
function wkTgt(id){return id==="emp"||id==="th"||id==="maid"?id:RV(+id)}
function wkGainTxt(ev){const F=[];if(ev.fx.sung)F.push(`Sủng +${sg(ev.fx.sung)}`);if(ev.fx.an)F.push(`Ân tình +${ev.fx.an}`);if(ev.fx.th)F.push(`Thái hậu với ngươi +${ev.fx.th}`);if(ev.fx.danh)F.push(`Danh +${ev.fx.danh}`);if(ev.fx.hh)F.push(`Hoàng hậu với ngươi +${ev.fx.hh}`);if(ev.fx.maid)F.push(`Lòng +${ev.fx.maid}`);if(ev.rel)F.push(`thiện cảm nàng +${ev.rel}`);return F.concat(ev.notes.map(n=>n)).join(" · ")}
PEND.wkgive=p=>{const e=S.inv[p.ix];if(!e||!e.wk)return null;const w=e.wk;const O=[],no=[];
 for(const [id,n] of wkTargets(S)){const r=wkTgt(id);if(!r)continue;const ev=wkEval(S,w,r);if(!ev.ok){if(ev.why)no.push(`${n}: ${ev.why}`);continue}
  O.push({n,fx:{},x:wkGainTxt(ev),go:()=>{spend(2);log(wkGive(S,r,S.inv.indexOf(e)))}})}
 if(w.kind==="mon"&&S.inv.some(x=>x.k==="hacdinh"&&!x.h))for(const v of liveRivals(true)){const sp=cl(oSee(v,true)-4*(facN(S)-1),5,95);
  O.push({n:`Lén bỏ Hạc đỉnh hồng rồi tặng ${rkName(v)} ${v.name}`,fx:{},x:`${word(oPoison(S))} · thành: nàng trúng độc, Sức -120, thường là chết, dùng hết 1 Hạc đỉnh hồng · hỏng: bị tra ra, ban chết · kèm: Đức -10 · nàng phát giác trước (${word(100-sp)} qua mắt nàng) thì nàng nắm 2 chứng cứ`,go:()=>{spend(2);log(wkPoison(S,v,S.inv.indexOf(e)))}})}
 O.push({n:"Thôi",fx:{}});
 return{t:`<p>Dâng, tặng <b>${w.n}</b> (${WTIER[w.ti]}, ${w.bn==="ngươi"?"tự tay ngươi làm":"của "+w.bn}) cho ai? Tốn 2 khắc.</p><p class="past">Đồ quý mua bằng bạc giá trị hơn: Tranh cổ, Đàn cổ dâng Hoàng thượng Sủng +5. Đồ tự tay làm được thêm chân tình với người hiền hậu, thêm hợp ý khi trúng sở thích.${no.length?"<br>"+no.join("<br>"):""}</p>`,o:O}};
function wkAct(a,ix){const e=S.inv[ix];if(!e||!e.wk||S.dead||Q.length)return;
 if(a==="give"){if(!can(2))return;pushDil(mkP("wkgive",{ix}),"Dâng, tặng tác phẩm");render();return}
 if(a==="sell"){if(!can(1))return;spend(1);log(wkSell(S,ix));render();return}
 if(a==="show"){wkShow(ix);return}}
if(typeof wrapR==="function")wrapR("wkAct",(a,ix)=>({give:"Dâng, tặng",sell:"Bán ra ngoài cung",show:"Bày ở yến tiệc"})[a]||"");
function wkCardsHTML(){const L=S.inv.map((e,i)=>[e,i]).filter(([e])=>e.wk&&!e.h);if(!L.length)return"";const t2=whyTime(2),t1=whyTime(1);
 return `<div class="ph"><span>Tác phẩm tự tay (${L.length})</span><span>Thường · Khá · Tinh xảo · Tuyệt phẩm</span></div><div class="cards">`+L.map(([e,i])=>{const w=e.wk,a=ARTS.find(x=>x.k===w.a);const sv=wkSellVal(w),so=wkSellO(S);const cb=wkContestB(S,w.a);
  const B=[pbtn(`data-wk="give" data-ix="${i}"`,"Dâng, tặng",`Chắc chắn · tốn: 2 khắc · thành: chọn người, xem được bao nhiêu`,t2),
   pbtn(`data-wk="sell" data-ix="${i}"`,"Bán ra ngoài cung",`${word(so)} · tốn: 1 khắc · thành: Bạc +${sv} · hỏng: Danh -3, mất tác phẩm`,t1)];
  if(!w.show&&!(w.p!=null))B.push(pbtn(`data-wk="show" data-ix="${i}"`,"Bày ở yến tiệc",`Chắc chắn · tốn: 2 khắc · thành: Danh +${WSHOW[w.ti]}${w.ti===3?` · kèm: phi tần ghen +${ghenN(BAL.ghen.showTreasure)}`:""}`,t2));
  return `<div class="card"><h4>${ic(AIMG[w.a],20)}${w.n}</h4><p><b>${WTIER[w.ti]}</b> (${w.q} phần) · ${a?a.n:""} · ${w.bn==="ngươi"?"tự tay ngươi làm":"của "+w.bn} · ${w.d}${w.p!=null?" · phải dâng trong tuần này":""}${w.show?" · đã bày ở yến tiệc":""}${cb?` · Tranh ghế vòng Tài nghệ +${cb}`:""}</p><div class="rbtn">${B.join("")}</div></div>`}).join("")+`</div>`}
(function(){const i0=invHTML;invHTML=function(){const W=S.inv.filter(e=>e.wk&&!e.h);W.forEach(e=>e.h=1);let h;try{h=i0.apply(this,arguments)}finally{W.forEach(e=>delete e.h)}
 if(!W.length)return h;h=h.replace(/<p class="past">Rương trống\.[^<]*<\/p>/,"");return h+wkCardsHTML()}})();
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-wk]");if(!b||b.disabled)return;ev.stopPropagation();const k=b.dataset.wk;
 if(k==="give"||k==="sell"||k==="show")wkAct(k,+b.dataset.ix);else if(k==="prac")wkPractice(b.dataset.art)},true);
/* ---- the Tài nghệ tab: what each art's sessions produce; practice once mastered ---- */
function wkTabHTML(){const why=whyTime(2)||(S.suc<15?"Sức dưới 15":"");
 let h=`<div class="ph"><span>Mỗi buổi học hay tự học mà tự tay chơi trò tài nghệ thì ra một tác phẩm (Học nhanh: không ra thành phẩm), cất vào rương để dâng, tặng, bán, bày ở yến tiệc. Phẩm = phần chơi trò tài nghệ (từ 0 đến 10) + chút bậc tài nghệ + vật liệu.</span><span>Đồ mua bằng bạc vẫn quý hơn</span></div><div class="arts">`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],ks=wkKindsOf(a.k);if(!ks.length)return"";const B=l>=5?[pbtn(`data-wk="prac" data-art="${a.k}"`,"Tự học, làm tác phẩm",`Chắc chắn · tốn: Sức -10, 2 khắc · thành: một tác phẩm, ${wkOddsTxt(S,ks[0],0)}`,why)]:[];
  return `<div class="art"><b>${ic(AIMG[a.k],20)}${a.n} · bậc ${l}: +${wkLvQ(S,a.k)}</b><span class="u">${ks.map(k=>`${WK[k].w}${WK[k].per?" (để 1 tuần)":""}${WK[k].fin?" ("+wkFinTxt(WK[k])+")":""}`).join(" · ")}</span><span class="u">${wkTierTxt(S,ks[0],0)}</span>${B.length?`<div class="pcb">${B.join("")}</div>`:""}</div>`}).join("")+`</div>`;
 return h}
(function(){const a0=artTabHTML;artTabHTML=function(){return a0.apply(this,arguments)+wkTabHTML()}})();
/* ---- incoming gift dialog shows the work's real name ---- */
(function(){const g0=PEND.giftin;PEND.giftin=function(p){const d=g0.apply(this,arguments);try{if(d&&p&&p.e&&p.e.wk){const w=p.e.wk;d.t=d.t.replace(/<b>Tác phẩm tự tay<\/b>/,`<b>${w.n}</b>`).replace(/<p class="past">Tự tay làm<\/p>/,`<p class="past">${WTIER[w.ti]} (${w.q} phần) · ${w.bn} tự tay làm · ${w.d}</p>`)}}catch(x){}return d}})();
/* ---- NPC consorts use the same system: each of their lessons ends with a work (raw score 0..10, same formula); they present, give or sell ---- */
function wkNpcMake(v,a){const ks=wkKindsOf(a);if(!ks.length)return;const k=pick(ks),K=WK[k];const mat=v.bac>=80&&roll(50)?2:v.bac>=20&&roll(50)?1:0;if(K.mat[mat])ap(v,{bac:-K.mat[mat]});v.inv.push(wkMake(v,k,mat,R(11)))}
function wkNpcUse(v){if(!roll(40))return;const i=v.inv.findIndex(e=>e.wk&&!e.h);if(i<0)return;const w=v.inv[i].wk;
 if(w.kind==="mon"&&v.malice>70&&roll(15)&&v.inv.some(e=>e.k==="hacdinh"&&!e.h)){const t=pick(others(v).filter(t=>t.alive&&!t.out&&(t===S?v.ghen>=50:hostility(v,t)>=50)));if(t){const r=wkPoison(v,t,i);if(t===S&&r)log(r);return}}
 let r=null;if(v.sung<70&&wkEval(v,w,"emp").ok&&roll(60))r="emp";else if(!S.thDead&&roll(50)&&wkEval(v,w,"th").ok)r="th";
 if(!r){const fr=others(v).filter(t=>t!==v&&(t===S?v.rel>5:rel(v,t)>0)&&wkEval(v,w,t).ok);if(fr.length)r=pick(fr)}
 if(!r&&w.ti<=1&&!WK[w.kind].per&&roll(30)){wkSell(v,i);return}
 if(r){const t=wkGive(v,r,i);if(r===S&&t)log(t)}}
(function(){const m0=npcMonthly;npcMonthly=function(v){const b=v&&v.arts?Object.assign({},v.arts):null,bp=v&&v.artp?Object.assign({},v.artp):null;const ev=m0.apply(this,arguments);
 try{if(v&&v.alive&&!v.out){if(!v.inv)v.inv=[];if(b&&bp)for(const a in v.arts)if(v.arts[a]!==b[a]||(v.artp||{})[a]!==bp[a]){if(v.inv.filter(e=>e.wk).length<4)wkNpcMake(v,a);break}wkNpcUse(v)}}catch(x){}return ev}})();
/* ---- poison in a dish: a scheme with the same odds, evidence trail and Đức loss as Hạ độc (ACT.poison); needs Hạc đỉnh hồng in the chest ---- */
function wkPoison(a,t,ix){const e=a.inv[ix];if(!e||!e.wk||e.wk.kind!=="mon"||!a.inv.some(x=>x.k==="hacdinh"&&!x.h)||!t||!t.alive)return"";a.inv.splice(ix,1);
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`;const r=ACT.poison.f(a,t);return `${by} lén bỏ Hạc đỉnh hồng vào ${e.wk.n} rồi sai người mang tặng ${t===S?"ngươi":rkName(t)+" "+t.name}. ${r||""}`}
if(typeof wrapR==="function")wrapR("wkPoisonPick",()=>"Bỏ độc vào món");
/* ================= ĐỒ CẤM: reliable but risky ways to get poison, same rules for every consort =================
   effect and how traceable each poison is, shown on the chest card */
const WILL={hacdinh:{eff:"chết",tr:"dễ lần ra: thái y nhận ra ngay, tra được người mua"},xahuong:{eff:"sảy thai (trộn vào túi thơm, hương trầm)",tr:"khó lần ra: mùi lẫn trong hương"},botngua:{eff:"ngứa, mất thể diện, Danh -5",tr:"vừa: áo dính bột còn để lại dấu"}};
for(const k in WILL)if(IT[k]&&!/Hiệu quả:/.test(itm(k).d))IT[k].d+=` · Hiệu quả: ${WILL[k].eff} · Dấu vết: ${WILL[k].tr}`;
/* who ends up holding evidence when a buyer is exposed: the Empress, else the most hostile consort */
function illWitness(p){const q=queenP();if(q&&q!==p)return q;const L=consorts().filter(x=>x!==p&&x.alive&&!x.out);if(!L.length)return null;return mindPickBy(L,x=>BAL.mind.pick.j83.base+hostility(x,p)*mindW(x,"frame"),null)}/* npc-mind: was ARGMAX */
function illAllies(p){return consorts().filter(v=>v!==p&&v.alive&&!v.out&&aff(v,p)>=40&&(v.inv||[]).some(e=>WILL[e.k]&&!e.h&&!e.t))}
const IROUTE={
 maid:{n:"Sai cung nữ thân tín mua lén ngoài cung",k:1,ks:Object.keys(WILL),cost:k=>itm(k).pr+15,o:p=>cl(Math.round(55+(p.maid?p.maid.loyal:0)/3+(p.mat||0)*2),5,95),
  need:p=>!p.maid?"không có cung nữ thân tín":p.maid.loyal<BAL.loy.low?`Lòng ${p.maid.name} dưới ${balAb(BAL.loy.low)}, nàng không dám đi`:"",when:"tuần sau mới mang về",fail:p=>`${p.maid?p.maid.name:"cung nữ"} bị bắt ở cửa Thần Vũ, khai ra ngươi (2 chứng cứ), Lòng -10, mất bạc`},
 thaiy:{n:"Hối lộ người ở Thái y viện",k:1,ks:["hacdinh","xahuong"],cost:k=>itm(k).pr+40,o:p=>cl(70+(p.mat||0)*3,5,95),need:()=>"",when:"có ngay",fail:()=>"thái y tố giác: Danh -6, người đứng sau nắm 1 chứng cứ, mất bạc"},
 cho:{n:"Chợ đen ở cửa Thần Vũ",k:2,ks:Object.keys(WILL),cost:k=>itm(k).pr,o:p=>cl(Math.round(60+(p.tamco||0)/5),5,95),need:p=>p.confined?"đang bị cấm túc":!(S.tuan===2&&(S.buoi||0)===B4L)?"chỉ họp buổi tối hạ tuần":"",when:"có ngay",fail:()=>"thị vệ bắt gặp: Danh -8, người đứng sau nắm 2 chứng cứ, mất bạc"},
 ally:{n:"Xin đồng minh",k:2,ks:Object.keys(WILL),cost:()=>0,o:()=>100,need:p=>illAllies(p).length?"":"chưa có đồng minh thân (thiện cảm 40) đang giữ đồ cấm",when:"có ngay",fail:()=>""}};
/* one attempt: same function for her and for every consort; returns the log line */
function illBuy(p,r,k,from,paid){const R0=IROUTE[r],nm=p===S?"Ngươi":`${rkName(p)} ${p.name}`;
 if(r==="ally"){const v=from||illAllies(p)[0];if(!v)return"";const i=v.inv.findIndex(e=>e.k===k&&!e.h&&!e.t);if(i<0)return"";v.inv.splice(i,1);p.inv.push({k,from:key(v)});/*evok: illBuy deed*/evA(v,p,BAL.eff.j83.evIllBuy);return `${nm} xin ${rkName(v)} ${v.name} ${itm(k).n}. Nàng nắm 1 chứng cứ của ${p===S?"ngươi":p.name}. `}
 const c=R0.cost(k);if(!paid){if(p.bac<c)return"";ap(p,{bac:-c})}if(typeof ducAdd==="function")ducAdd(p,-3,"mua đồ cấm");else ap(p,{duc:-3});
 if(roll(R0.o(p))){if(r==="maid"){p.illP=p.illP||[];p.illP.push({k,w:wk()+1});return `${nm} sai ${p.maid.name} lén mua ${itm(k).n} ngoài cung; tuần sau mang về. Bạc -${c}. `}p.inv.push({k});return `${nm} có được ${itm(k).n} (${R0.n.toLowerCase()}). Bạc -${c}. `}
 const w=illWitness(p);if(r==="maid"){evA(w,p,BAL.eff.j83.evIllBuy_2);if(p.maid)p.maid.loyal=cl(p.maid.loyal-10,0,100)}else if(r==="thaiy"){ap(p,{danh:-6});evA(w,p,BAL.eff.j83.evIllBuy_3)}else{ap(p,{danh:-8});evA(w,p,BAL.eff.j83.evIllBuy_4)}
 if(p!==S)newsAdd(p,"illicit",`Người của ${nm} bị bắt khi lén mua đồ cấm.`);
 return `<span class="r">${nm} mua lén ${itm(k).n} không thành: ${R0.fail(p)}${w?` (${w===S?"ngươi":rkName(w)+" "+w.name} giữ chứng cứ)`:""}.</span> `}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)for(const p of consorts()){if(!p.illP||!p.illP.length)continue;const now=p.illP.filter(x=>x.w<=wk());p.illP=p.illP.filter(x=>x.w>wk());for(const x of now){p.inv.push({k:x.k});if(p===S)log(`${S.maid?S.maid.name:"Cung nữ"} lén mang ${itm(x.k).n} về, giấu trong rương.`)}}}catch(x){}return r}})();
function illAsk(r){const R0=IROUTE[r];if(S.dead||Q.length||!can(R0.k)||R0.need(S))return;const O=[];
 if(r==="ally"){for(const v of illAllies(S))for(const e of v.inv.filter(e=>WILL[e.k]&&!e.h&&!e.t).slice(0,3))O.push({n:`${itm(e.k).n} của ${rkName(v)} ${v.name}`,fx:{},x:`thành: có ${itm(e.k).n} (${WILL[e.k].eff}) · kèm: nàng nắm 1 chứng cứ của ngươi`,go:()=>{spend(R0.k);log(illBuy(S,"ally",e.k,v))}})}
 else for(const k of R0.ks){const c=R0.cost(k);O.push({n:`${itm(k).n}: ${WILL[k].eff}`,fx:{bac:-c},x:`${word(R0.o(S))} · thành: có ${itm(k).n}, ${R0.when} · hỏng: ${R0.fail(S)} · kèm: Đức -3`,go:()=>{spend(R0.k);log(illBuy(S,r,k,null,1))}})}
 O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:R0.n,who:pMe(),h:`<p>${R0.n}. Tốn ${R0.k} khắc.</p><p class="past">${Object.keys(WILL).map(k=>`${itm(k).n}: ${WILL[k].eff}; ${WILL[k].tr}`).join("<br>")}</p>`,opts:O});showModal();render()}
if(typeof wrapR==="function")wrapR("illAsk",r=>IROUTE[r]?IROUTE[r].n:"");
function illHTML(){return `<div class="ph"><span>Đồ cấm: độc dược không bán công khai. Bị lộ là có người nắm chứng cứ của ngươi.</span></div><div class="rbtn" style="margin-bottom:6px">`+Object.entries(IROUTE).map(([r,R0])=>{const nd=R0.need(S);const lo=Math.min(...R0.ks.map(R0.cost)),hi=Math.max(...R0.ks.map(R0.cost));
 return pbtn(`data-ill="${r}"`,R0.n,r==="ally"?`Chắc chắn · tốn: ${R0.k} khắc · thành: có đồ cấm · kèm: nàng nắm 1 chứng cứ của ngươi`:`${word(R0.o(S))} · tốn: ${R0.k} khắc, Bạc -${lo} đến -${hi} · thành: có độc dược, ${R0.when} · hỏng: ${R0.fail(S)} · kèm: Đức -3`,whyTime(R0.k)||nd)}).join("")+`</div>`}
(function(){const i0=invHTML;invHTML=function(){const h=i0.apply(this,arguments);const j=h.indexOf('</div>',h.indexOf('class="rbtn"'));return j<0?h+illHTML():h.slice(0,j+6)+illHTML()+h.slice(j+6)}})();
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-ill]");if(!b||b.disabled)return;ev.stopPropagation();illAsk(b.dataset.ill)},true);
/* NPCs: the malicious look for poison by the same routes */
(function(){const m0=npcMonthly;npcMonthly=function(v){const ev=m0.apply(this,arguments);try{if(v&&v.alive&&!v.out&&!v.confined&&v.malice>60&&roll(8)&&!(v.inv||[]).some(e=>WILL[e.k])){const k=roll(60)?"hacdinh":roll(50)?"xahuong":"botngua";
  const rs=["maid","thaiy","cho","ally"].filter(r=>IROUTE[r].ks.includes(k)&&(r!=="ally"||illAllies(v).some(a=>a.inv.some(e=>e.k===k)))&&(r==="ally"||v.bac>=IROUTE[r].cost(k)+20)&&(r!=="maid"||(v.maid&&v.maid.loyal>=BAL.loy.low))&&(r!=="cho"||!v.confined));
  if(rs.length){const t=illBuy(v,pick(rs),k);if(t&&/không thành/.test(t)&&(illWitness(v)===S))log(t)}}}catch(x){}return ev}})();
