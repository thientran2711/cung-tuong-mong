/* ================= jexam: KHẢO HẠCH TẤN PHONG (owner 15/11 17:20Z, review/promo-exam) =================
   Promotion needs an exam. Meeting the conditions (Sủng/Danh/Đức, Hoàng hậu/Thái hậu, the wait since the last decree) only makes her ELIGIBLE.
   - Player: eligibility opens a window of BAL.ex.win tuần; she takes the exam with the act card «Khảo hạch tấn phong» (Hành sự, honest odds,
     Cần/Tốn). Missing the window: eligibility lapses for BAL.ex.cd[to] months. Pass: the existing decree (promoteP, edict animation, and the
     rank chest of review/gift-chest when merged). Fail: no promotion, cooldown BAL.ex.cd[to] months.
   - Exam = 2–3 rounds of the game's existing mini-games (j82/j91 engines; jnwq skill games for lễ nghi / trị cung / xử án /
     Thái hậu hỏi) chosen by the target rank: low ranks lễ nghi + nữ công, middle cầm kỳ thi họa + câu đối, high trị cung + xử án + Thái hậu hỏi.
     Score = mean of rounds × BAL.ex.wPlay + two Tứ đức courses × BAL.ex.wVir + one tài nghệ × BAL.ex.wArt. The bar BAL.ex.bar[tier] moves with
     the examiner's attitude (Hoàng hậu for low/middle ranks, Thái hậu for high ranks; the other one when absent).
   - NPC consorts: the same rule, rolled with the same per-level mini-game draw as j82 (kg82NpcMean); they fail too (news line).
   - One gate for every path: promoReqP gets the exam row, so promoteP, fillSeats (j30), candOK / contests (j34), the seat board and every
     "đủ điều kiện" text read it. Son birth (j8 birthP) no longer promotes on the spot: it grants an exam at once (exGrace).
   - Owner 15/11 20:05Z (review/promo-rules): a SON's birth = direct promotion, no exam (exSonUp); a DAUGHTER's birth = an exam at once with
     the conditions waived (exGrace(p,"f")). Owner 16/11 06:20Z (review/promo-skip): every LONG-road reward is a direct decree (exDirectUp:
     son, Hoàng thượng side winning the reign road, jreign); ordinary promotion by conditions keeps the exam; the servant / ma ma road's merit rises (j42 srvMonth, j14 servRanks for NPC servants, the
     «Ở lại làm ma ma» choice) go through the same exam (exSrv*, below). Imperial picks (srvRise "Hoàng thượng để mắt"), story decrees
     (j97 r97rise/r97srvRk), cold-palace restore (j14) and pardon (j7/j8) stay decrees (no exam).
   - Old saves: p.ex is created on first read; a save made before this rule gets one notice line.
   State p.ex = {to, pass, cd (turn), w0/w1 (tuần, player), lapse, grace, n, last:{s,b,ok,t}, pend (player, exam in progress)}. */
const EXK={
 le:{e:"lay",vir:"dung",n:"Lễ nghi",t:"Bày lễ",how:"Ma ma Nội vụ phủ bày một bàn lễ làm mẫu. Kéo từng vật đến đúng chỗ như mẫu. Chưa rõ thì chạm Gợi ý. Làm nhanh thì được trọn phần."},
 tc:{e:"sort",vir:"hanh",n:"Trị cung",t:"Phân kho",how:"Hàng hóa của lục cung về kho. Kéo từng món vào kho có hàng mẫu cùng loại. Chưa rõ thì chạm Gợi ý. Làm nhanh thì được trọn phần."},
 xa:{e:"clue",vir:"ngon",n:"Xử án",t:"Khám vật chứng",how:"Vụ án để lại vật chứng. Chạm vào người có áo và vật mang theo khớp vật chứng. Chưa rõ thì chạm Gợi ý. Làm nhanh thì được trọn phần."},
 thq:{e:"seat",vir:"ngon",n:"Thái hậu hỏi",t:"Xếp chỗ ngồi yến",how:"Thái hậu bảo xếp chỗ ngồi yến. Nhiều ngọc ghim là phẩm cao, ngồi gần Thái hậu. Kéo từng người vào ghế. Chưa rõ thì chạm Gợi ý. Làm nhanh thì được trọn phần."}};
/* family C (owner 16/11 07:20Z, no word games): the exam games are skill games of jnwq (lay / sort / clue / seat); no question banks remain.
   The kinds join KG82_KIND (they are not festival contest subjects: j71 SC7 is unchanged) */
(function(){if(typeof KG82_KIND==="undefined")return;for(const k in EXK)if(!KG82_KIND[k])KG82_KIND[k]=EXK[k]})();

/* ---------- rules (numbers in BAL.ex, jbal2) ---------- */
const EX_VIR=[["cong","dung"],["dung","ngon"],["ngon","hanh"]];
const EX_CKTT=[["cam","dan"],["ky","co"],["thi","tho"],["hoa","ve"]];
function exOn(){return !!(typeof S!=="undefined"&&S&&BAL&&BAL.ex)}
function exSrv(p){return p===S&&typeof isSrv==="function"&&isSrv()}
function exRk(to){return to>=7?"Hoàng hậu":RANKS[Math.max(0,to)].n}
function exTier(to){return to<=BAL.cut.exTier[0]?0:to<=BAL.cut.exTier[1]?1:2}
function exCd(to){const c=BAL.ex.cd;return c[Math.max(0,Math.min(c.length-1,to))]}
function exLv(p,k){try{if(EXK[k])return typeof virLv==="function"?virLv(p,EXK[k].vir):0;return kg82LvFor(p,k)}catch(e){return 0}}
function exArt(p,k){try{return typeof artLv==="function"?artLv(p,k):((p.arts||{})[k]||0)}catch(e){return 0}}
function exVirN(k){const v=(typeof VIR!=="undefined"?VIR:[]).find(x=>x.k===k);return v?v.n:k}
function exS(p){if(!p)return{};const to=rkOf(p)+1;let e=p.ex;if(!e||typeof e!=="object"||e.to!==to){const g=e&&e.grace===to?to:null,gw=e&&e.gw;e=p.ex={to};if(g){e.grace=g;if(gw)e.gw=gw}}return e}
/* why the exam was granted without the conditions: a daughter's birth ("f"); old saves (son grace before 20:05Z) read as "m" */
function exGw(e){return e&&e.gw==="f"?"mừng công chúa":"mừng hoàng tử"}
/* the rounds for the target rank */
function exRounds(p,tier){if(tier===0)return["le",exArt(p,"nau")>exArt(p,"theu")?"banh":"theu"];
 if(tier===1){let b=EX_CKTT[0];for(const x of EX_CKTT)if(exArt(p,x[0])>exArt(p,b[0]))b=x;return[b[1],"doi"]}return["tc","xa","thq"]}
function exArtPart(p,tier){const w=BAL.ex.wArt;if(tier===0){const t=exArt(p,"theu"),n=exArt(p,"nau");return n>t?{v:n*w,l:`Nấu nướng bậc ${n}`}:{v:t*w,l:`Thêu thùa bậc ${t}`}}
 if(tier===1){let b=EX_CKTT[0];for(const x of EX_CKTT)if(exArt(p,x[0])>exArt(p,b[0]))b=x;const l=exArt(p,b[0]);const nm=(typeof ARTS!=="undefined"&&(ARTS.find(a=>a.k===b[0])||{}).n)||b[0];return{v:l*w,l:`${nm} bậc ${l}`}}
 const d=Math.max(0,Math.round(p.duc||0));return{v:Math.floor(d/20)*w,l:`Đức ${d}`}}
/* the examiner: Hoàng hậu for the low and middle ranks, Thái hậu for the high ranks; the other one when absent */
function exExaminer(p,tier){const q=typeof queenP==="function"?queenP():null;
 const hh=q&&q!==p&&!q.out?{k:"hh",who:q,name:`Hoàng hậu ${q.name}`,att:Math.round(p.hh||0)}:null;
 const th=!S.thDead?{k:"th",who:S.thO||null,name:"Thái hậu",att:Math.round(p.th||0)}:null;return tier===2?(th||hh):(hh||th)}
function exPlan(p){const e=exS(p),to=e.to,tier=exTier(to);const ex=exExaminer(p,tier);const B=BAL.ex;
 const sh=ex?cl(Math.round(ex.att/B.attDiv),-B.attMax,B.attMax):0;const V=EX_VIR[tier];const A=exArtPart(p,tier);
 return{to,tier,rounds:exRounds(p,tier),ex,bar0:B.bar[tier],sh,bar:B.bar[tier]-sh,V,vir:(virLv(p,V[0])+virLv(p,V[1]))*B.wVir,virL:`${exVirN(V[0])} ${virLv(p,V[0])}, ${exVirN(V[1])} ${virLv(p,V[1])}`,art:A.v,artL:A.l}}
function exScore(P,raws){const avg=raws.reduce((a,b)=>a+b,0)/Math.max(1,raws.length);const play=Math.round(avg*BAL.ex.wPlay);const total=play+P.vir+P.art;return{avg:Math.round(avg*10)/10,play,total,pass:total>=P.bar}}
/* one round rolled by level: the j82 rule for every person (raw ≈ 4 + 0.4·bậc ± 4) */
function exRaw(lv,rnd){const r=(rnd()+rnd()+rnd())/3;return cl(Math.round(kg82NpcMean(lv)+(r-.5)*8),0,10)}
function exSim(p,rnd){rnd=rnd||Math.random;const P=exPlan(p);const raws=P.rounds.map(k=>exRaw(exLv(p,k),rnd));return Object.assign(exScore(P,raws),{P,raws})}
function exRng(seed){let a=seed>>>0||1;return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
/* the honest chance shown on the card: the same draw, many times (stable between renders) */
function exChance(p){const P=exPlan(p);const rnd=exRng(((p.id||7)*977+S.turn*131+P.to*17+P.vir*3+P.art)|0);const N=BAL.ex.mc;let ok=0;
 for(let i=0;i<N;i++){const raws=P.rounds.map(k=>exRaw(exLv(p,k),rnd));if(exScore(P,raws).pass)ok++}return Math.round(100*ok/N)}
/* the conditions before the exam: every promoReqP row except the seat rows (a seat is waited for after the exam); for the Hoàng hậu seat
   the wait since the last decree does not count (as candOK, j34) */
const EX_SKIP=/^Ghế |Chờ ghế|Đang tranh ghế/;let exQ0=null;
function exBase(p){const to=rkOf(p)+1;return (exQ0?exQ0(p):[]).filter(x=>!EX_SKIP.test(x[1])&&!(to===7&&/Cách lần/.test(x[1])))}
function exElig(p){if(!exOn()||!p||rkOf(p)>=7||p.out||p.confined||exSrv(p)||(p!==S&&p.alive===false))return false;const e=exS(p);if(e.grace===e.to&&e.to<7)return true;const L=exBase(p);return L.length>0&&L.every(x=>x[0])}
function exCanSit(p){const e=exS(p);return !e.pass&&!(e.cd>S.turn)&&exElig(p)}
/* dates in the game's own words (kitDate) */
function exDateT(turn,tuan){const d=turn-S.turn;const m0=S.month-1+d;const m=((m0%12)+12)%12+1,y=S.year+Math.floor(m0/12);
 try{if(typeof kitDate==="function")return kitDate(m,y,tuan)}catch(e){}return `tháng ${m}${tuan!=null?" "+TUAN[tuan]:""}`}
function exDateW(w){return exDateT(Math.floor(w/3),w%3)}
/* the examiner's name only: how her liking moves the bar is said once, on the «Mức đỗ» row (exBarTxt) — keeps the round frame short on phones */
function exExTxt(P){return P.ex?P.ex.name:"Quan Nội vụ phủ"}
function exBarTxt(P){return P.sh?`${P.bar} phần (mức ${P.bar0}, ${P.sh>0?"hạ":"nâng"} ${Math.abs(P.sh)} vì ${P.ex.k==="th"?"Thái hậu":"Hoàng hậu"} ${P.sh>0?"quý":"không ưa"} ngươi)`:`${P.bar} phần`}

/* ---------- the exam row in every requirement list (one gate for every promotion path) ---------- */
function exRow(p){const e=exS(p),to=e.to,rk=exRk(to);if(e.pass)return[true,`Đã đỗ khảo hạch tấn phong ${rk}`];
 if(e.cd>S.turn)return[false,`Khảo hạch tấn phong: ${e.lapse?"lỡ hạn thi":"vừa trượt"}, chờ đến ${exDateT(e.cd)} mới được thi lại`];
 if(p===S&&e.w1!=null)return[false,`Khảo hạch tấn phong ${rk}: được thi, hạn đến hết ${exDateW(e.w1)}`];
 if(e.grace===to)return[false,`Khảo hạch tấn phong ${rk}: được ân thi ngay (${exGw(e)})`];
 return[false,`Khảo hạch tấn phong ${rk}: đủ các điều kiện trên thì được thi`]}
(function(){if(typeof promoReqP!=="function")return;exQ0=promoReqP;const q1=promoReqP;promoReqP=function(p){const L=q1.apply(this,arguments);
 try{if(exOn()&&p&&rkOf(p)<7&&!p.out&&!exSrv(p))L.push(exRow(p))}catch(e){console.error("exam row",e)}return L}})();

/* ---------- births (owner 20:05Z): a son = a decree on the spot (no exam); a daughter = an exam at once, the conditions waived ---------- */
/* owner 16/11 06:20Z (review/promo-skip): a reward that ends a LONG road (a son's birth, the Hoàng thượng side winning the reign road)
   is a decree on the spot, no exam: one helper for every such road. Never past Hoàng quý phi (the Hoàng hậu seat keeps its own rules),
   never from lãnh cung. o.fx: jealousy + the promote feedback (the son's birth does its own). */
function exDirectUp(p,why,o){o=o||{};const me=p===S;if(!p||rkOf(p)>=6||p.out)return"";if(me)S.rank++;else p.rank++;p.lastPromo=S.turn;if(p.ex)p.ex={to:rkOf(p)+1};
 if(me){exDrop();if(o.fx){try{ghenAll(BAL.psk.ghen)}catch(e){}try{feedback("promote",{t:"Tấn phong"})}catch(e){}}}
 return me?`<b class="g">Thánh chỉ: ${why}, tấn phong ${S.name} làm ${RANKS[S.rank].n}</b> (không qua khảo hạch). `:`${p.name} được tấn phong ${RANKS[p.rank].n} (${why}). `}
function exSonUp(p){return exDirectUp(p,"mừng hoàng tử")}
/* the ONE player text of these rules (j6 / jtabs help lines, the «Khảo hạch tấn phong» gloss): reads PROMO_SRC, never typed per place */
function promoRuleTxt(){const d=k=>PROMO_SRC[k]==="direct";return `Sinh hoàng tử đầu lòng: ${d("son1")?"tấn phong ngay, không phải thi":"được ân thi ngay"}; hoàng tử sau và công chúa: được ân thi ngay, không cần đủ điều kiện. Phe mình thắng cuộc triều cục: tấn phong thẳng, không qua khảo hạch. Ghế trên đã đủ người thì được hậu thưởng thay, muốn lên vẫn phải thi như mọi người.`}
/* ONE hook for every long-road promotion reward (owner 16/11 06:45Z + 07:15Z). PROMO_SRC = the switch per source: "direct" rank, "grace" =
   an exam at once with the conditions waived, "none" = no rank. son1 = that mother's FIRST prince; later sons and every princess = grace.
   Faction road: every winning side = direct (07:15Z). Seats (j30 SEATCAP) still apply: a direct reward that meets a full seat becomes
   a large one-off compensation (promoFullSeat, owner 07:20Z). EVERY reward has a gain AND a loss (owner 07:15Z): the loss per source is promoCost, numbers BAL.psk (jbal2). */
const PROMO_SRC={son1:"direct",son:"grace",dau:"grace",emp:"direct",th:"direct",quyen:"direct"};
const PROMO_WHY={son1:"mừng hoàng tử",emp:"phò tá có công",th:"Thái hậu tâu xin",quyen:"triều thần dâng sớ tiến cử"};
function promoReward(p,src,o){o=o||{};const m=PROMO_SRC[src]||"none";if(m==="none"||!p||rkOf(p)>=6||p.out)return"";
 if(m==="grace")return typeof exGrace==="function"?exGrace(p,src==="dau"?"f":"m"):"";
 const nx=rkOf(p)+1;const r=(typeof seatFree==="function"&&!seatFree(nx))?promoFullSeat(p,src,o):exDirectUp(p,o.why||PROMO_WHY[src]||"ân điển",o);
 return r?r+promoCost(p,src):""}
/* the loss that comes with each reward (owner 07:15Z); same rule for an NPC (her rivals feel it the same way) */
function promoCost(p,src){const B=BAL.psk,me=p===S;let t="";try{
 if(src==="son1"){const q=typeof queenP==="function"?queenP():null;if(q&&q!==p)oanAdd(q,p,B.son1.hhOan);
  let n=0;for(const v of liveRivals(true))if(v!==p&&v!==q&&!v.out&&typeof sonsOf==="function"&&sonsOf(v).length){oanAdd(v,p,B.son1.momOan);n++}
  if(p!==S&&S!==q&&!S.out&&typeof sonsOf==="function"&&sonsOf(S).length)oanAdd(S,p,B.son1.momOan);
  if(me)t=`Hoàng hậu${n?` và ${n} vị có hoàng tử`:""} thấy ngươi thành mối lo (oán ngươi +${B.son1.hhOan}${n?`, +${B.son1.momOan}`:""}). `}
 else if(src==="emp"){if(me)apply({th:-B.emp.th});let n=0;
  for(const v of liveRivals(true)){const s=typeof rgSideOf==="function"?rgSideOf(v):null;if(s&&s!=="emp"){oanAdd(v,p,B.emp.oan);n++}}
  if(me)t=`Thái hậu lạnh nhạt (Thái hậu quý ngươi −${B.emp.th}); ${n?`${n} phi tần phe thua`:"phe thua"} để bụng ngươi (oán +${B.emp.oan}). `}
 else if(src==="th"){if(me){apply({sung:-B.th.sung});S.psErr={n:B.th.errN,at:wk()+B.th.errAt};
  t=`Bệ hạ coi ngươi là người của Thái hậu (Sủng −${B.th.sung}); Thái hậu sẽ còn sai ngươi làm việc (${B.th.errN} việc nhờ). `}}
 else if(src==="quyen"){if(me){apply({danh:-B.quyen.danh});S.psStrike={at:S.turn+B.quyen.after,p:B.quyen.p,n:0};
  t=`Thiên hạ chê ngươi dựa thế nhà quyền thần (Danh −${B.quyen.danh}); bệ hạ lớn lên rồi, e có ngày tính sổ. `}}
 }catch(e){console.error("promoCost",e)}return t}
/* full seat (owner 07:20Z, replaces «Ân chỉ chờ phong»): a LARGE one-off compensation instead of the rank — big silver, rare gifts (Hoàng
   thượng's bestow), an honorific name character (phong hiệu, no rank change; silver instead if she already has one), an office / favour for her
   family (house power). Loss: the other consorts' jealousy. Her rank stays; the next one goes through the normal exam. Numbers BAL.psk.seat. */
function promoFullSeat(p,src,o){const B=BAL.psk.seat,me=p===S,to=rkOf(p)+1,rk=RANKS[to].n;const parts=[];
 let bac=Math.round(B.bacM*(BAL.pay[Math.min(7,to)]||100));let hieu="";if(!p.hieu&&typeof dhHieuGrant==="function")hieu=dhHieuGrant(p,"seat",{quiet:1});/* the ONE grant (jdh2): book + seal, Danh +BAL.dh.hieu.danhG; none if her hiệu is confiscated */
 if(!hieu)bac+=B.hieuBac;ap(p,{bac,danh:B.danh});parts.push(`Bạc +${bac}`);if(hieu)parts.push(`phong hiệu «${hieu}»`);
 for(let i=0;i<B.gifts;i++)try{bestow(p,"promo")}catch(e){}if(B.gifts)parts.push(`${B.gifts} món ngự ban`);
 try{const c=clanOf(p);if(c&&typeof tdPowAdd==="function"&&typeof CLANS!=="undefined"&&CLANS.includes(c))tdPowAdd(c,B.pow);if(me)S.dad=cl((S.dad||40)+B.dad,0,100)}catch(e){}parts.push("nhà ngoại được ân");
 let cost="";if(me){ghenAll(B.ghen);cost=`Lục cung ghen với ngươi (ghen +${ghenN(B.ghen)}). `}else{for(const v of consorts())if(v!==p&&!v.out)oanAdd(v,p,B.oan)}
 const t=me?`<b class="g">Ghế ${rk} đã đủ người</b>: Hoàng thượng ban hậu thưởng thay cho tấn phong: ${parts.join(", ")}. Muốn lên ${rk} vẫn phải qua khảo hạch như mọi người. ${cost}`
  :`${p.name} được hậu thưởng (ghế ${rk} đã đủ người). `;
 if(!me)try{newsAdd(p,"promo",t,true)}catch(e){}return t}
/* monthly: the Thái hậu errands and the quyền thần strike-back (BAL.psk) */
function promoMonth(){let ev="";try{const B=BAL.psk;
 const E=S.psErr;if(E&&!S.dead&&!S.out&&!S.thDead&&wk()>=E.at&&typeof q72CanOffer==="function"&&q72CanOffer()&&!(typeof evBusy==="function"&&evBusy())){
  /* a Thái hậu errand (j72 việc nhờ, requester Thái hậu): the first template of hers that can be built now */
  const A=typeof q72A==="function"?q72A("th"):null;const L=(typeof T72!=="undefined"?T72:[]).filter(T=>T.r==="th"&&!T.fu);let x=null;
  for(const T of L.sort(()=>Math.random()-.5)){try{x=A&&q72Make(T,A)}catch(e){x=null}if(x)break}
  if(x){q72Offer(x,"");E.n--;E.at=wk()+B.th.errGap;if(E.n<=0)S.psErr=null}}
 const k=S.psStrike;if(k&&!S.dead&&S.turn>=k.at&&!S.empDead){if(k.n>=B.quyen.max){S.psStrike=null}else if(roll(k.p)){k.n++;S.psStrike=null;
  apply({sung:-B.quyen.hitSung,danh:-B.quyen.hitDanh});log(`<span class="r">Bệ hạ đã lớn, nhớ chuyện cũ nhà quyền thần tiến cử ngươi</span>: Sủng −${B.quyen.hitSung}, Danh −${B.quyen.hitDanh}.`)}}
 }catch(e){console.error("promoMonth",e)}return ev}
(function(){if(typeof rivalsMonth!=="function")return;const r0=rivalsMonth;rivalsMonth=function(){const a=promoMonth();return a+(r0.apply(this,arguments)||"")}})();
function exGrace(p,sex){const e=exS(p);e.grace=e.to;e.gw=sex==="f"?"f":"m";e.cd=0;e.lapse=0;const me=p===S;const why=exGw(e);
 return me?`${why[0].toUpperCase()+why.slice(1)}: Hoàng thượng ân cho ngươi dự khảo hạch tấn phong ${exRk(e.to)} ngay, không cần đủ điều kiện. `:`${p.name} được ân dự khảo hạch tấn phong ${exRk(e.to)} (${why}). `}
function exGraceUp(p){const me=p===S;const why=exGw(p.ex);if(me)S.rank++;else p.rank++;p.lastPromo=S.turn;if(me){try{ghenAll(BAL.psk.ghen)}catch(e){}try{feedback("promote",{t:"Tấn phong"})}catch(e){}}
 const t=me?`<b class="g">Thánh chỉ: tấn phong ${S.name} làm ${RANKS[S.rank].n}.</b> Lý do: ân điển ${why}, đã đỗ khảo hạch. `:`${p.name} được tấn phong ${RANKS[p.rank].n}. Lý do: ân điển ${why}, đã đỗ khảo hạch. `;
 if(!me)try{newsAdd(p,"promo",t,true)}catch(e){}return t}

/* ---------- the result, for her and for every NPC ---------- */
window.__exN=window.__exN||{sit:0,pass:0,npcSit:0,npcPass:0,lapse:0};
function exDone(p,r){const e=exS(p),to=e.to,rk=exRk(to),me=p===S;e.n=(e.n||0)+1;e.last={s:r.total,b:r.P.bar,ok:r.pass?1:0,t:S.turn};e.w0=e.w1=null;e.pend=null;
 const N=window.__exN;if(me){N.sit++;if(r.pass)N.pass++}else{N.npcSit++;if(r.pass)N.npcPass++}
 if(r.pass){e.pass=true;e.lapse=0;if(!me)return"";log(`<b class="g">Đỗ khảo hạch tấn phong ${rk}</b> (${r.total} phần, mức đỗ ${r.P.bar}).`);exDrop();
  const t=promoteP(S);if(t)log(t);else log(to>=7?"Đã đỗ: chờ Hoàng thượng chọn người lập Hoàng hậu.":`Đã đỗ: chờ ghế ${rk} trống thì có thánh chỉ.`);return t||""}
 e.cd=S.turn+exCd(to);e.lapse=0;
 if(me){log(`<span class="r">Trượt khảo hạch tấn phong ${rk}</span> (${r.total} phần, mức đỗ ${r.P.bar}): chờ đến ${exDateT(e.cd)} mới được thi lại.`);exDrop();return""}
 try{newsAdd(p,"exam",`${p.name} trượt khảo hạch tấn phong ${rk}.`,true)}catch(x){}return""}
/* NPCs sit the exam when the month's decree would look at them (rivalsMonth → promoteP); a son's grace raises the rank once passed */
(function(){if(typeof promoteP!=="function")return;const p0=promoteP;promoteP=function(p){
 try{if(exOn()&&p&&rkOf(p)<7&&!exSrv(p)){const e=exS(p);if(p!==S&&exCanSit(p))exDone(p,exSim(p));
   if(e.pass&&e.grace===e.to&&rkOf(p)<6&&!p.out&&!p.confined&&(typeof seatFree!=="function"||seatFree(rkOf(p)+1)))return exGraceUp(p)/* seats still apply (owner 06:45Z): a full seat waits */}}catch(x){console.error("exam",x)}
 return p0.apply(this,arguments)}})();

/* ---------- her window: opens when she becomes eligible, lapses when it runs out ---------- */
function exTick(){if(!exOn()||S.dead||S.out||exSrv(S)||S.rank>=7)return;const e=exS(S);
 if(S.exV==null){S.exV=1;if((S.turn||0)>0)log("Luật mới trong cung: từ nay muốn thăng phẩm phải qua khảo hạch tấn phong; đủ điều kiện chỉ là được thi.")}
 if(e.pend&&!document.getElementById("kg82"))exAbort();
 if(e.pass||e.pend)return;const w=wk();
 if(e.w1!=null){if(w>e.w1){e.w0=e.w1=null;e.cd=S.turn+exCd(e.to);e.lapse=1;window.__exN.lapse++;exDrop();
   log(`<span class="r">Lỡ hạn khảo hạch tấn phong ${exRk(e.to)}</span>: chờ đến ${exDateT(e.cd)} mới được thi.`)}
  else if(!exElig(S)){e.w0=e.w1=null;exDrop()}return}
 if(e.cd>S.turn||!exElig(S))return;e.w0=w;e.w1=w+BAL.ex.win-1;e.lapse=0;const P=exPlan(S);
 log(`<b class="g">Được dự khảo hạch tấn phong ${exRk(e.to)}</b>: ${P.ex?P.ex.name:"Nội vụ phủ"} khảo, hạn đến hết ${exDateW(e.w1)}. Thẻ «Khảo hạch tấn phong» ở Hành sự.`);exAdd()}
/* the act card: true cost, the honest chance (as one who plays at her own level), what a fail costs */
function exCard(){const e=exS(S),P=exPlan(S),o=cl(exChance(S),5,95);const names=P.rounds.map(k=>KG82_KIND[k].n.toLowerCase()).join(", ");
 return{n:"Khảo hạch tấn phong",exam:1,t:`${P.ex?P.ex.name:"Quan Nội vụ phủ"} khảo ngươi trước khi sắc phong ${exRk(e.to)}: ${names}. Đỗ hay trượt tùy tài nghệ của ngươi; tự thi càng giỏi thì càng dễ đỗ.`,
  c:{suc:-BAL.ex.suc},k:BAL.ex.k,o,dom:"Khảo hạch",w:{},l:{},x:`thánh chỉ tấn phong ${exRk(e.to)}`,lock:!exElig(S),go:()=>exStart()}}
function exAdd(){try{if(Array.isArray(deck)&&!deck.some(a=>a&&a.exam))deck.unshift(exCard())}catch(e){}}
function exDrop(){try{if(Array.isArray(deck))deck=deck.filter(a=>!(a&&a.exam))}catch(e){}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(exOn()&&!S.out&&!exSrv(S)&&S.ex&&S.ex.w1!=null&&!S.ex.pass)exAdd()}catch(e){}return r}})();
(function(){const r0=runOpt;runOpt=function(a){if(a&&a.exam){if(!canPay(a))return null;if(a.c)apply(a.c);log(`${a.exLbl||`Dự khảo hạch tấn phong ${exRk(exS(S).to)}.`} ${fmt(a.c)||""}`);try{a.go()}catch(e){console.error(e)}return true}return r0.apply(this,arguments)}})();
(function(){const c0=cardH;cardH=function(a){let h=c0.apply(this,arguments);try{if(a&&a.exam)h=h.split("không mất gì").join(`trượt: chờ ${a.cdN||exCd(exS(S).to)} tháng mới được thi lại`).replace(/<button\b/,'<button data-kexam="1"')}catch(e){}return h}})();
/* its category word on the picture frame: an exam of etiquette and duties is «Lễ nghi», not the default «Giao thiệp» (same pattern as j79 sung-ai) */
try{KIT_ACT_CATS.unshift(["le-nghi",/khảo hạch tấn phong|khảo hạch nội vụ phủ/i])}catch(e){}
/* the act picture (owner 14:30Z: no group images): the exam card shows ONLY its own picture (ACTS.json «Khảo hạch tấn phong»); with no own key
   (or before ACTS.json arrives) it gets NO picture slot at all — never the category tile / category picture of kitActArt */
(function(){if(typeof kpActArt!=="function")return;const k0=kpActArt;kpActArt=function(b){try{if(b&&b.dataset&&b.dataset.kexam&&!(typeof kitActKey==="function"&&kitActKey("Khảo hạch tấn phong"))&&!(typeof kitPhActReady==="function"&&kitPhActReady())){
  b.dataset.kart="none";b.classList.remove("kart");b.classList.add("kanoart");const a=b.querySelector(":scope > .kaart");if(a)a.remove();return}if(b&&b.dataset&&b.dataset.kexam)b.classList.remove("kanoart")}catch(e){}return k0.apply(this,arguments)}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{exTick()}catch(e){console.error("exam tick",e)}return r}})();
(function(){const r0=render;render=function(){try{exTick()}catch(e){console.error("exam tick",e)}return r0.apply(this,arguments)}})();

/* ---------- the exam itself: the kit game frame (j82), one round after another, then the result ---------- */
/* exRun(P, st, done): P = a plan (exPlan / exSrvPlan), st = the state holding .pend (survives a reload: exAbort* finish it at the same level),
   done(r) = the result. P.rk = the rank word, P.passTxt = the verdict line on a pass, P.cdN = months to wait on a fail. */
function exFinish(P,pd){const raws=pd.raws.slice();while(raws.length<P.rounds.length)raws.push(Math.round(kg82NpcMean(exLv(S,P.rounds[raws.length]))));return Object.assign(exScore(P,raws),{P,raws})}
function exAbort(){const e=exS(S),pd=e.pend;if(!pd)return;exDone(S,exFinish(exPlan(S),pd))}
function exStart(){const P=exPlan(S);P.rk=exRk(P.to);P.passTxt=P.to>=7?"Được dự chọn ngôi Hoàng hậu.":`Thánh chỉ tấn phong ${P.rk}.`;P.cdN=exCd(P.to);
 if(window.__exAuto||typeof kg82Open!=="function"||!document.getElementById("ov")){exDone(S,exSim(S));return}exRun(P,exS(S),r=>exDone(S,r))}
function exRun(P,e,done){e.pend={raws:[]};const raws=e.pend.raws;let i=0;const n=P.rounds.length;
 const round=()=>{const k=P.rounds[i],K=KG82_KIND[k];KG82.ctx="thi";const lv=exLv(S,k);mgSet(k,{occ:"exam",rank:P.to,lv});/* mg-balance: board ease from the tier; skip keeps her level */try{kg82Preload(k)}catch(x){}
  const d=kg82Open({art:"Khảo hạch",title:`Môn ${i+1}/${n} · ${K.n}`,how:K.how,round:"Môn",roundV:`${i+1}/${n}`,pic:kg82Pic(k)});if(!d){e.pend=null;done(exFinish(P,{raws}));return}
  const box=kg82Box();const SK=Math.round(kg82NpcMean(lv));
  box.innerHTML=`<h4 class="kpst">Khảo hạch ${P.srv?"lên":"tấn phong"} ${P.rk}</h4>`+kg82Rows([["Giám khảo",exExTxt(P),"t"],["Môn thi",`${i+1}/${n}: ${K.n} · ${K.t}`,"t"],["Độ khó",mgDiffTxt(KG82.tier,k),"n"],["Mức đỗ",`${exBarTxt(P)}, tính cả ${n} môn cùng Tứ đức và tài nghệ`,"n"]])+
   `<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu thi</button><button class="${kg82Btn(true)}" id="kg82skip">Để tài nghệ quyết định<small>môn này tính ${SK}/10, như người cùng bậc</small></button></div>`;
  $("kg82go").onclick=()=>kg82Play(k,raw=>after(raw,false));$("kg82skip").onclick=()=>after(SK,true)};
 const after=(raw,sk)=>{raws.push(raw);i++;const last=i>=n;try{save()}catch(x){}
  kg82ShowRes(kg82Rows([[`Môn ${i}`,`${raw}/10 · ${kg82Word(raw)}${sk?" (để tài nghệ quyết định)":""}`,"t"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">${last?"Xem kết quả":"Môn kế tiếp"}</button></div>`,raw>=5);
  kg82Set("score",`${raw}/10`);kg82Set("round",`${i}/${n}`);$("kg82ok").onclick=()=>{if(last)result();else round()}};
 const result=()=>{const sc=exScore(P,raws);const r=Object.assign(sc,{P,raws});
  kg82Open({art:"Khảo hạch",round:"Môn",pic:kg82Pic(P.rounds[P.rounds.length-1]||"tho"),title:`Kết quả · ${P.rk}`,how:"Tổng phần = phần thi các môn + Tứ đức + tài nghệ. Đạt mức đỗ của giám khảo thì đỗ."});
  const parts=[["Các môn",raws.map((x,j)=>`${KG82_KIND[P.rounds[j]].n} ${x}/10`).join(" · ")],[`Phần thi (trung bình ${String(sc.avg).replace(".",",")} × ${BAL.ex.wPlay})`,`+${sc.play}`],[`Tứ đức (${P.virL})`,`+${P.vir}`],[P.artL,`+${P.art}`],["Mức đỗ","cần "+exBarTxt(P)]];
  const note=sc.pass?`Đỗ. ${P.passTxt}`:`Trượt. Chờ ${P.cdN} tháng mới được thi lại.`;
  kg82ShowRes(kitGameResult({parts,total:`${sc.total} phần · cần ${P.bar}`,note})+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`,P.srv?!!sc.pass:null);/* final: player exam = null (exDone plays examPass / examFail); servant exam has no exDone sound, so the panel plays it */
  kg82Set("score",String(sc.total));kg82Set("round",`${n}/${n}`);kg82Set("time","đã hết");try{$("kg82ok").scrollIntoView({block:"nearest"})}catch(x){}
  $("kg82ok").onclick=()=>{e.pend=null;kg82Close();done(r);try{save()}catch(x){}render()}};
 round()}

/* ================= SERVANT / MA MA ROAD (owner 15/11 20:05Z): the merit rise of a cung nữ goes through an exam too =================
   Her: when j42 srvMonth finds the merit and the mistress's trust enough for the next maid rank, the rise is NOT given: a window of BAL.ex.win
   tuần opens (card «Khảo hạch Nội vụ phủ» in Phận sự); pass = the rise at once (the old j42 rise: rank, merit 0, Chủ tin +5, «Thăng bậc»);
   fail / missed window = wait BAL.ex.srvCd[to] months. The choice «Ở lại làm ma ma» (age 25) is an exam the same way (target "mama").
   Rounds = the low-rank exam (lễ nghi + nữ công, exRounds tier 0); examiner = a ma ma of Nội vụ phủ; her mistress's trust (Chủ tin) moves
   the bar like the examiner's liking (BAL.ex.attDiv). Bar BAL.ex.srvBar[to] (to 1..4, 5 = ma ma).
   NPC servants (j14 servRanks, maids and eunuchs): the same exam, rolled at their rank as level (exRaw), seeded by servant + month so both
   co-op clients roll the same; fail = wait BAL.ex.srvCd months. State: S.srv.ex = {to, w0, w1, cd, lapse, pend, last, n}; NPC s.exCd. */
function exSrvName(to){return to==="mama"?"Ma ma":SRK.maid[to]||"Cung nữ"}
function exSrvIx(to){return to==="mama"?5:Math.max(1,Math.min(4,to|0))}
function exSrvCdN(to){const c=BAL.ex.srvCd;return c[exSrvIx(to)]}
function exSrvS(){if(!S||!S.srv)return{};let e=S.srv.ex;if(!e||typeof e!=="object")e=S.srv.ex={};return e}
function exSrvPlan(to){const B=BAL.ex;const V=EX_VIR[0];const A=exArtPart(S,0);const tin=Math.round(S.tin||0);
 const sh=cl(Math.round((tin-50)/B.attDiv),-B.attMax,B.attMax);const bar0=B.srvBar[exSrvIx(to)];
 return{to,srv:1,tier:0,rounds:exRounds(S,0),ex:{k:"mm",name:"Ma ma Nội vụ phủ",att:tin},bar0,sh,bar:bar0-sh,V,vir:(virLv(S,V[0])+virLv(S,V[1]))*B.wVir,
  virL:`${exVirN(V[0])} ${virLv(S,V[0])}, ${exVirN(V[1])} ${virLv(S,V[1])}`,art:A.v,artL:A.l,rk:exSrvName(to),cdN:exSrvCdN(to),
  passTxt:to==="mama"?"Được ở lại cung làm ma ma.":`Được thăng ${exSrvName(to)}.`}}
function exSrvBarTxt(P){return P.sh?`${P.bar} phần (mức ${P.bar0}, ${P.sh>0?"hạ":"nâng"} ${Math.abs(P.sh)} vì chủ nhân ${P.sh>0?"tin cậy":"không tin"} ngươi)`:`${P.bar} phần`}
(function(){const b0=exBarTxt;exBarTxt=function(P){return P&&P.srv?exSrvBarTxt(P):b0.apply(this,arguments)}})();
function exSrvSim(P,rnd){rnd=rnd||Math.random;const raws=P.rounds.map(k=>exRaw(exLv(S,k),rnd));return Object.assign(exScore(P,raws),{P,raws})}
function exSrvChance(P){const rnd=exRng(((S.turn||0)*131+exSrvIx(P.to)*17+P.vir*3+P.art+P.sh)|0);let ok=0;const N=BAL.ex.mc;for(let i=0;i<N;i++)if(exSrvSim(P,rnd).pass)ok++;return Math.round(100*ok/N)}
/* j42 srvMonth asks before a merit rise: true = the exam decides (window opened / waiting), false = give the rise as before */
function exSrvGate(to){if(!exOn()||!isSrv())return false;const e=exSrvS();if(e.to==="mama"&&(e.w1!=null||e.pend))return true;if(e.to!==to){S.srv.ex={to};return exSrvOpen(to)}
 if(e.pend||e.w1!=null)return true;if(e.cd>S.turn)return true;return exSrvOpen(to)}
function exSrvOpen(to){const e=exSrvS();const w=wk();e.to=to;e.w0=w;e.w1=w+BAL.ex.win-1;e.lapse=0;
 log(`<b class="g">Được dự khảo hạch ${exSrvName(to)}</b>: ma ma Nội vụ phủ khảo, hạn đến hết ${exDateW(e.w1)}. Thẻ «Khảo hạch Nội vụ phủ» ở Phận sự.`);exSrvAdd();return true}
/* the rise itself (the old j42 lines), given on a pass */
function exSrvRise(to){if(to==="mama"){S.srv.mama=1;log("Ngươi ở lại cung làm ma ma.");return}
 const m=srvM();S.srv.rk=Math.max(S.srv.rk||0,to);S.srv.mp=0;S.tin=cl(S.tin+BAL.eff.jexam.tinExSrvRise,0,100);log(`<b class="g">Được thăng ${SRK.maid[S.srv.rk]}.</b>`);
 Q.push({t:"Thăng bậc",who:pMe(),h:`<p>Nội vụ phủ ghi công: ngươi đỗ khảo hạch, được thăng <b>${SRK.maid[S.srv.rk]}</b>${m?` trong cung ${m.name}`:""}.</p><p class="past">Lương tháng ${CNV_WAGE[S.srv.rk]} bạc.</p>`})}
function exSrvDone(r){const e=exSrvS(),to=e.to;e.n=(e.n||0)+1;e.last={s:r.total,b:r.P.bar,ok:r.pass?1:0,t:S.turn};e.w0=e.w1=null;e.pend=null;exSrvDrop();
 const N=window.__exN;N.srvSit=(N.srvSit||0)+1;if(r.pass)N.srvPass=(N.srvPass||0)+1;
 if(r.pass){log(`<b class="g">Đỗ khảo hạch ${exSrvName(to)}</b> (${r.total} phần, mức đỗ ${r.P.bar}).`);S.srv.ex={};exSrvRise(to);return}
 e.cd=S.turn+exSrvCdN(to);log(`<span class="r">Trượt khảo hạch ${exSrvName(to)}</span> (${r.total} phần, mức đỗ ${r.P.bar}): chờ đến ${exDateT(e.cd)} mới được thi lại.`);
 if(to==="mama")log("Không được ở lại làm ma ma; đến tuổi thì xuất cung theo lệ.")}
function exSrvStart(){const e=exSrvS();const P=exSrvPlan(e.to);if(window.__exAuto||typeof kg82Open!=="function"||!document.getElementById("ov")){exSrvDone(exSrvSim(P));return}exRun(P,e,exSrvDone)}
function exSrvCard(){const e=exSrvS(),P=exSrvPlan(e.to),o=cl(exSrvChance(P),5,95);const names=P.rounds.map(k=>KG82_KIND[k].n.toLowerCase()).join(", ");
 return{n:"Khảo hạch Nội vụ phủ",exam:2,exLbl:`Dự khảo hạch ${exSrvName(e.to)}.`,cdN:P.cdN,t:`Ma ma Nội vụ phủ khảo ngươi trước khi cho ${e.to==="mama"?"ở lại làm ma ma":"lên "+exSrvName(e.to)}: ${names}. Cơ may tính như người cùng bậc tài nghệ; tự thi giỏi thì dễ đỗ hơn.`,
  c:{suc:-BAL.ex.suc},k:BAL.ex.k,o,dom:"Khảo hạch",w:{},l:{},x:e.to==="mama"?"được ở lại cung làm ma ma":`thăng ${exSrvName(e.to)}`,go:()=>exSrvStart()}}
function exSrvAdd(){try{if(Array.isArray(deck)&&!deck.some(a=>a&&a.exam===2))deck.unshift(exSrvCard())}catch(e){}}
function exSrvDrop(){try{if(Array.isArray(deck))deck=deck.filter(a=>!(a&&a.exam===2))}catch(e){}}
function exSrvTick(){if(!exOn()||!isSrv()||S.dead)return;const e=exSrvS();if(e.pend&&!document.getElementById("kg82")){exSrvDone(exFinish(exSrvPlan(e.to),e.pend));return}
 if(e.w1!=null&&wk()>e.w1){const to=e.to;e.w0=e.w1=null;e.cd=S.turn+exSrvCdN(to);e.lapse=1;exSrvDrop();log(`<span class="r">Lỡ hạn khảo hạch ${exSrvName(to)}</span>: chờ đến ${exDateT(e.cd)} mới được thi.`);
  if(to==="mama")log("Không được ở lại làm ma ma; đến tuổi thì xuất cung theo lệ.")}}
/* the ma ma choice (j42 cnvAge «Ở lại làm ma ma»): an exam instead of the flag */
function exSrvMama(){if(!exOn()){S.srv.mama=1;log("Ngươi ở lại cung làm ma ma.");return}S.srv.ex={to:"mama"};exSrvOpen("mama")}
/* NPC servants: one seeded roll per month at their rank as level; true = the rise is given */
function exSrvNpc(s){try{if(!exOn())return true;if(s.coop)return true;if(s.exCd>S.turn)return false;const lv=srk(s);
 const rnd=exRng(((s.sid||1)*7919+(S.turn||0)*104729)|0);const raws=[0,1].map(()=>exRaw(lv,rnd));const avg=(raws[0]+raws[1])/2;const B=BAL.ex;
 const tot=Math.round(avg*B.wPlay)+Math.round((s.loyal||50)/25);const pass=tot>=B.srvBar[Math.max(1,Math.min(4,lv+1))];
 const N=window.__exN;N.npcSrvSit=(N.npcSrvSit||0)+1;if(pass){N.npcSrvPass=(N.npcSrvPass||0)+1;s.exCd=0;return true}
 s.exCd=S.turn+(B.srvCd||[1,1,1,2,2])[Math.max(1,Math.min(4,lv+1))];return false}catch(e){return true}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(exOn()&&isSrv()&&S.srv.ex&&S.srv.ex.w1!=null)exSrvAdd()}catch(e){}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{exSrvTick()}catch(e){console.error("srv exam tick",e)}return r}})();
(function(){const r0=render;render=function(){try{exSrvTick()}catch(e){}return r0.apply(this,arguments)}})();

/* ---------- Mệnh truyện › Sắc phong: the exam chips (kit .kchip) ---------- */
function exChips(){if(!exOn()||S.rank>=7||S.out)return"";const e=exS(S);const L=[];
 if(e.pass)L.push(["g",`Đã đỗ khảo hạch ${exRk(e.to)}`]);
 else if(e.cd>S.turn)L.push(["r",`Thi lại từ ${exDateT(e.cd)}`]);
 else if(e.w1!=null)L.push(["g",`Khảo hạch: hạn hết ${exDateW(e.w1)}`]);
 else if(e.grace===e.to)L.push(["g","Được ân thi ngay"]);
 else L.push(["n","Đủ điều kiện thì được dự khảo hạch"]);
 if(e.last&&!e.pass)L.push(["n",`Lần trước: ${e.last.s}/${e.last.b} phần`]);
 return L.map(([c,t])=>kitChip(t,c)).join(" ")}  /* kit status chips (KIT kitChip(text,"g"|"r"|"n")) */
if(typeof KIT_GLOSS!=="undefined")KIT_GLOSS["Khảo hạch tấn phong"]="";
(function(){const t=()=>{try{const B=BAL.ex;KIT_GLOSS["Khảo hạch tấn phong"]=`Đủ điều kiện sắc phong chỉ là được thi. Từ lúc đủ, ngươi có ${B.win} tuần để dự khảo hạch (thẻ ở Hành sự); lỡ hạn thì chờ như trượt. Phẩm thấp thi lễ nghi và nữ công; phẩm giữa thi cầm kỳ thi họa và câu đối; phẩm cao thi trị cung, xử án và đối đáp với Thái hậu. Tổng phần = phần thi các môn (mỗi môn 0–10, lấy trung bình nhân ${B.wPlay}) + Tứ đức + tài nghệ; giám khảo (Hoàng hậu, phẩm cao: Thái hậu) quý ngươi thì hạ mức đỗ, ghét thì nâng. Trượt: chờ ${B.cd[1]}–${B.cd[7]} tháng (phẩm càng cao càng lâu). Phi tần khác cũng thi như vậy. ${promoRuleTxt()} Cung nữ lên bậc cũng phải qua khảo hạch của Nội vụ phủ.`}catch(e){}};
 if(typeof renderPanel0==="function"){const r0=renderPanel0;renderPanel0=function(){t();return r0.apply(this,arguments)}}})();
window.exSrvPlan=exSrvPlan;window.exSrvGate=exSrvGate;window.exSrvNpc=exSrvNpc;window.exSrvS=exSrvS;window.exSrvStart=exSrvStart;window.exSrvMama=exSrvMama;window.exSonUp=exSonUp;window.exDirectUp=exDirectUp;window.promoRuleTxt=promoRuleTxt;window.promoReward=promoReward;window.promoFullSeat=promoFullSeat;window.PROMO_SRC=PROMO_SRC;window.exGrace=exGrace;
window.exPlan=exPlan;window.exChance=exChance;window.exSim=exSim;window.exElig=exElig;window.exS=exS;window.exTick=exTick;window.exStart=exStart;
