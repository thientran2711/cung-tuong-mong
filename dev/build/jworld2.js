/* ================= jworld2 — WORLD EVENTS batch 2 (review/world-events-2) =================
   Owner OD:L1587 rule 4 + OD 17/11 13:48Z ("càng nhiều sự kiện thì nó càng đa dạng phong phú") + OD 17/11 ~14:30Z (CENTER pop-up at start
   and end, her options, a Tuần lục line; NEVER a Dư đồ "!"). Rows of dev/research/world-events-2.md §3, on the ONE window layer of jworld.js
   (same S.wwin record, same worldStart / worldWin / worldPlanW / gates; helpers from window.WORLD_X — no second copy). Numbers: BAL.world.<k>.
   Every event has a REAL cause (a state, the calendar, a real person); the few rolls only decide WHEN a real cause becomes a window.
   Effects reach EVERYONE (her and every NPC group) through the existing gates (nightCh, festToday, stipend, mindW, placeWhere, worldPlanW)
   and through the same option list: NPCs choose by mindPick, she chooses in the start pop-up.
   PARKED: #9 Địa chấn (research: no repair-debt state, no content). */
(function(){
const X=window.WORLD_X;if(!X)return;
const {B,now,T_,wZ,wErr,WN,TANG_NO,EVD,XH,liveR,cons,moodFloor,moodSet,nmList,npcPick,mW,monthsWord,meCons,pid,byPid,wNow0}=X;
const ws=(k,c,o)=>window.worldStart(k,c,o);const ww=k=>window.worldWin(k);
Object.assign(WN,{day:"Yến đầy tháng",lap:"Đại lễ sắc lập Thái tử",hau:"Đổi ngôi Hoàng hậu",thb:"Thái hậu bệnh nặng",thi:"Khoa thi Đình",vuong:"Phiên vương nhập triều",
 ret:"Đại hàn, tuyết lớn",trung:"Nạn châu chấu",vuco:"Đại án vu cổ",cam:"Cấm cung giới nghiêm",trom:"Án mất trộm ngự khố",phong:"Đại phóng cung nhân",hon:"Công chúa xuất giá",
 ngoai:"Đại án ngoại thích",phat:"Lễ Phật đản",benh:"Long thể bất an",tinh:"Tỉnh thân"});
for(const k of ["day","thi","vuong","tinh","hon"])if(!TANG_NO.includes(k))TANG_NO.push(k);
const notSrv=()=>!(typeof isSrv==="function"&&isSrv());
const kidByName=n=>{try{return allKids().find(([k])=>k.name===n)||null}catch(e){return null}};
const mom=v=>v?v:S;/* allKids gives [kid, mother|null]; null = her */
const nmOf=p=>p===S?"ngươi":p.name;
const houseOf2=p=>{try{return tdHouse(p)}catch(e){return null}};
const emptyOpts=()=>undefined;
/* her own choice on a window (co-op: per player, never in the shared S.wwin record — a "me" key there is seat-relative and broke the merge) */
const meSet=(w,k,v)=>{const M=S.wwMe=S.wwMe||{};(M[w.id]=M[w.id]||{})[k]=v;const lo=(wZ().seq||0)-20;for(const i in M)if(+i<lo)delete M[i]};
const meGet=(w,k)=>{const M=S&&S.wwMe;return M&&M[w.id]?M[w.id][k]:undefined};
function info(w,t,extra){return{t:t||window.worldName(w),who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>${extra||""}`}}
function giftRound(b,who,mother,tag){/* NPCs give by their own silver and grudges (the same three options as hers) */
 const G=[],C=[],K=[];for(const v of liveR()){if(v===mother||v.out||v.confined)continue;const g=Math.round((v.bac||0)*b.npcGift);
  const cold=(v.ghen||0)>=b.coldGhen||(mother&&mother!==S&&typeof oan==="function"&&oan(v,mother)>=b.coldOan);
  const k=npcPick(v,[["give",mW(v,"social")*(g>=b.mid?b.npcW.give[0]:b.npcW.give[1])],["cold",mW(v,"harm")*(cold?b.npcW.cold[0]:b.npcW.cold[1])],["skip",b.npcW.skip]]);
  if(k==="give"&&g>0){ap(v,{bac:-g});if(mother)affAdd(mother,v,g>=b.big?b.bigAff:b.midAff);G.push(v)}else if(k==="cold"){if(mother&&mother!==S)relAdd(mother,v,-b.skipOan);C.push(v)}else K.push(v)}
 return{G,C,K}}
/* ---------- 1 YẾN ĐẦY THÁNG (row 1): a real living child, one month after the birth (j8 birth / mkKid). Mother: Danh, Sủng; Kho lúa.
   NPCs gift by their own silver; jealous ones send a cold gift or stay away (the mother's grudge). */
EVD.day={nm:w=>w.x.sex==="m"?"Yến đầy tháng hoàng tử":"Yến đầy tháng công chúa",place:w=>{const m=byPid(w.x.who);return m&&m!==S&&typeof palaceOf==="function"?palaceOf(m):"tn"},
 start(w){const b=B().day,boy=w.x.sex==="m"?0:1;const m=byPid(w.x.who);const T=T_();if(T)T.kho=cl(T.kho-b.kho[boy],0,100);
  if(m){if(m===S)apply({danh:b.mDanh[boy],sung:b.mSung[boy]});else ap(m,{danh:b.mDanh[boy],sung:b.mSung[boy]})}
  const r=giftRound(b,null,m&&m!==S?m:null);w.x.G=r.G.map(pid);
  return `Hoàng thượng ban yến đầy tháng cho ${w.x.kid}${m?`, con của ${nmOf(m)}`:""}; mẹ được thêm Danh, Sủng.${r.G.length?` Mang quà mừng: ${nmList(r.G)}.`:""}${r.C.length?` Quà lạnh nhạt hoặc cáo bệnh không tới: ${nmList(r.C)}.`:""}`},
 end(w){return `Yến đầy tháng ${w.x.kid} đã tan; quà các cung đã ghi sổ.`},
 card(w){const b=B().day;const m=byPid(w.x.who);if(!meCons())return info(w);
  if(m===S)return Object.assign(info(w),{opts:[{n:"Mở tiệc lớn mời các cung",fx:{bac:-b.feastBac},x:`thành: Danh +${b.feastDanh}`,go:()=>apply({danh:b.feastDanh})},
   {n:"Giữ lễ đơn sơ",fx:{},x:`thành: Đức +${b.plainDuc}`,go:()=>apply({duc:b.plainDuc})}]});
  if(!m)return info(w);
  return Object.assign(info(w),{who:pv(m),opts:[{n:"Dâng quà quý",fx:{bac:-b.big},x:`thành: ${m.name} quý ngươi +${b.bigAff}`,go:()=>affAdd(m,S,b.bigAff)},
   {n:"Quà vừa phải",fx:{bac:-b.mid},x:`thành: ${m.name} quý ngươi +${b.midAff}`,go:()=>affAdd(m,S,b.midAff)},
   {n:"Cáo bệnh không tới",fx:{},x:`kèm: ${m.name} để bụng`,go:()=>relAdd(m,S,-b.skipOan)}]})},
 night(){return false}};
/* ---------- 2 ĐẠI LỄ SẮC LẬP THÁI TỬ (row 2): S.heir set (j3 heirMonth / j51 kế vị / setHeir). The mother's house gains power (j55
   tdPowAdd); mothers of other sons scheme more (act); no night on the rite tuần; may bring a small amnesty. */
EVD.lap={place:()=>"thu",
 start(w){const b=B().lap;const m=byPid(w.x.who);const h=m?houseOf2(m):null;if(h)try{tdPowAdd(h,b.pow)}catch(e){}
  let n=0;for(const v of liveR()){if(v===m||v.out)continue;const g=Math.round((v.bac||0)*b.npcGift);if(g>0&&npcPick(v,[["g",mW(v,"social")],["n",mW(v,"harm")*(sonsOf(v).length?b.sonHarm[0]:b.sonHarm[1])]])==="g"){ap(v,{bac:-g});if(m)affAdd(m,v,b.giftAff);n++}}
  return `${w.x.kid} được sắc lập làm Thái tử; bá quan mặc triều phục bái mừng, đêm ấy không ai được thị tẩm.${h?` Nhà ${h} thêm thế lực.`:""}${n?` ${n} cung dâng lễ mừng.`:""}`},
 end(w){if(roll(B().lap.xaP))ws("xa","Lập Thái tử, ban ân điển");return `Lễ sắc lập ${w.x.kid} đã xong; chiếu chỉ ban khắp thiên hạ.`},
 card(w){const b=B().lap;const m=byPid(w.x.who);if(!meCons()||!m||m===S)return info(w);
  return Object.assign(info(w),{who:pv(m),opts:[{n:"Dâng lễ mừng Thái tử",fx:{bac:-b.gift},x:`thành: ${m.name} quý ngươi +${b.giftAff}`,go:()=>affAdd(m,S,b.giftAff)},{n:"Đứng xem lễ",fx:{},x:"không được mất gì"}]})},
 night(w){return wNow0(w)<1}};
/* ---------- 3 ĐỔI NGÔI HOÀNG HẬU (row 3): the queen seat really changes (j4 / j8 / j34 lập hậu, a death or a deposition). The old
   queen's house falls, the new one's rises (j55); alliances re-form (act ally / social). The đại xá of batch 1 still fires on lập hậu. */
EVD.hau={nm:w=>w.x.sub==="phe"?"Phế hậu, lập hậu mới":"Lập Hoàng hậu mới",place:()=>"kn",
 start(w){const b=B().hau;const o=byPid(w.x.from),n=byPid(w.x.to);const ho=o?houseOf2(o):null,hn=n?houseOf2(n):null;
  try{if(ho&&w.x.sub==="phe")tdPowAdd(ho,b.fall);if(hn)tdPowAdd(hn,b.rise)}catch(e){}
  return `${w.x.sub==="phe"&&o?`${nmOf(o)} bị phế ngôi Hoàng hậu. `:""}${n?`${n===S?"Ngươi":n.name} được sắc phong Hoàng hậu, chưởng quản lục cung.`:"Ngôi Hoàng hậu đổi chủ."}${hn?` Nhà ${hn} lên thế.`:""}${ho&&w.x.sub==="phe"?` Nhà ${ho} sa sút.`:""} Cả hậu cung chầu mừng ở Càn Ninh cung.`},
 end(){return "Lễ sắc phong đã xong; lục cung theo về Càn Ninh cung."},
 card(w){const b=B().hau;const n=byPid(w.x.to);if(!meCons()||!n||n===S)return info(w);
  return Object.assign(info(w),{who:pv(n),opts:[{n:"Đến Càn Ninh cung chúc mừng",fx:{bac:-b.gift},x:`thành: Hoàng hậu quý ngươi +${b.giftAff}`,go:()=>affAdd(n,S,b.giftAff)},{n:"Giữ khoảng cách",fx:{},x:"không được mất gì"}]})},
 night(){return false}};
/* ---------- 4 THÁI HẬU BỆNH NẶNG (row 4): S.thIll reaches stage BAL (j13 monthly). Phiên hầu bệnh at Đức Thọ cung (force slot), fewer
   nights for everyone (nightMul), no yến; the Hoàng hậu takes on more; NPCs nurse / pray by their own weights (Thái hậu's favour). A death
   flows into the batch-1 quốc tang. */
EVD.thb={place:()=>"tn",
 start(w){const b=B().thb;moodFloor(b.mood);const N=[];for(const v of liveR()){if(v.out||v.confined)continue;const k=npcPick(v,[["nurse",mW(v,"greet")*((v.suc||0)>=b.npcW.suc?1:b.npcW.weak)],["pray",mW(v,"pray")],["no",mW(v,"scheme")*b.npcW.no]]);
   if(k==="nurse"){ap(v,{suc:-b.nurse.suc});v.th=(v.th||0)+b.npcTh[0];N.push(v)}else if(k==="pray")v.th=(v.th||0)+b.npcTh[1]}
  try{const q=liveR().find(v=>v.queen);if(q)ap(q,{danh:b.qDanh})}catch(e){}
  return `Bệnh Thái hậu trở nặng; Đức Thọ cung chia phiên hầu bệnh, hậu cung bớt thị tẩm, bãi yến.${N.length?` Vào hầu bệnh: ${nmList(N)}.`:""}`},
 tick(w){if(S.thDead||!S.thIll)w.t1=Math.min(w.t1,now()+1)},
 end(){return S.thDead?"":"Bệnh Thái hậu đã thuyên giảm; Đức Thọ cung thôi chia phiên."},
 card(w){const b=B().thb;if(!meCons())return info(w);const o=od(b.nurse.o[0]+((S.arts&&S.arts.y)||0)*b.nurse.o[1]);
  return Object.assign(info(w),{who:pTH(),opts:[{n:"Xin vào hầu bệnh",fx:{suc:-b.nurse.suc},x:`${word(o)} · thành: Thái hậu +${b.nurse.th} · hỏng: không được gì`,go:()=>{if(roll(o))apply({th:b.nurse.th})}},
   {n:"Chép kinh cầu an",fx:{suc:-b.pray.suc},x:`thành: Đức +${b.pray.duc}, Thái hậu +${b.pray.th}`,go:()=>apply({duc:b.pray.duc,th:b.pray.th})},
   {n:"Gửi thuốc bổ",fx:{bac:-b.med.bac},x:`thành: Thái hậu +${b.med.th}`,go:()=>apply({th:b.med.th})}]})},
 nightMul(){return B().thb.nightMul},feast:1};
/* ---------- 5 KHOA THI ĐÌNH (row 5): calendar, every 3 years in spring (the Hàn lâm clock). The house whose students win gains power
   (pow + sk weighted); consorts of that house gain face; she may ask her father to back a student (her own house only). */
EVD.thi={place:()=>"thu",
 start(w){const b=B().thi;const T=T_();if(!T||typeof CLANS==="undefined")return "Bảng vàng treo ở cửa Ngọ Môn.";
  const L=CLANS.map(c=>[c,Math.max(1,(T.H[c].pow||b.dflt)+(T.H[c].sk||b.dflt)+(c==="Hàn lâm"?b.hanlam:0))]);const c=npcPick(null,L.slice());w.x.c=c;
  tdPowAdd(c,b.pow[0]);const M=consorts().filter(p=>houseOf2(p)===c&&p!==S);for(const p of M)ap(p,{danh:b.danh});if(houseOf2(S)===c&&notSrv())apply({danh:b.danh});
  return `Khoa thi Đình mở ở Cần Chính điện; trạng nguyên là môn sinh nhà ${c}. Nhà ${c} thêm thế lực${M.length?`; ${nmList(M)} thêm thể diện`:""}.`},
 end(w){return "Tân khoa đã vinh quy; triều đình có thêm quan mới."},
 card(w){const b=B().thi;const h=houseOf2(S);if(!meCons()||!h)return info(w);const o=od(b.letter.o[0]+(S.dad||b.dflt)/b.letter.o[1]);
  return Object.assign(info(w),{opts:[{n:"Viết thư nhờ cha nâng đỡ học trò",fx:{bac:-b.letter.bac},x:`${word(o)} · thành: nhà ${h} thêm thế lực · hỏng: không được gì`,go:()=>{if(roll(o))tdPowAdd(h,b.letter.pow)}},
   {n:"Chỉ xem bảng vàng sau rèm",fx:{},x:"không được mất gì"}]})},
 night(){return false}};
/* ---------- 6 PHIÊN VƯƠNG NHẬP TRIỀU (row 6): calendar (autumn, every 3 years) + a real living Vương gia (j22 S.men, j24 vgAlly). Gia yến;
   the prince meets the women at Đức Thọ cung; a weak border makes the Emperor wary (mood). Meeting him: tinh up, but gossip (tư thông). */
const vgOf=()=>{try{menInit()}catch(e){}return (S.men||[]).find(m=>m.alive&&m.role==="Vương gia")||null};
EVD.vuong={place:()=>"tn",
 start(w){const b=B().vuong;const m=vgOf();const T=T_();if(T&&T.bien<b.bien)moodFloor(b.mood);
  let g=null;const L=liveR().filter(v=>!v.out&&!v.confined);if(m&&L.length){const v=npcPick(null,L.map(v=>[v,mW(v,"social")*(1+(v.sung||0)/b.sungDiv)]));if(v&&roll(b.gossip)){g=v;ap(v,{danh:b.meet.danh});try{newsAdd(v,"vuong",`Có kẻ đồn ${v.name} trò chuyện lâu với ${m.name}.`)}catch(e){}}}
  return `${m?m.name:"Vương gia"} về kinh triều kiến; Hoàng thượng mở gia yến, nữ quyến vương phủ vào Đức Thọ cung thỉnh an.${T&&T.bien<b.bien?" Biên cương chưa yên, ngài có phần dè chừng.":""}${g?` Lời đồn bay quanh ${g.name}.`:""}`},
 end(w){const m=vgOf();return `${m?m.name:"Vương gia"} đã về phiên trấn.`},
 card(w){const b=B().vuong;const m=vgOf();if(!meCons()||!m)return info(w);const o=od(b.meet.o[0]+(S.tai||0)/b.meet.o[1]);
  return Object.assign(info(w),{opts:[{n:`Ra mắt ${m.name} ở Đức Thọ cung`,fx:{},x:`${word(o)} · thành: ${m.name} ${typeof tinhW==="function"?"có cảm tình":"quý ngươi"} hơn · hỏng: bị đồn, Danh ${b.meet.danh}`,go:()=>{if(roll(o))m.tinh=cl((m.tinh||0)+b.meet.tinh,0,100);else apply({danh:b.meet.danh})}},
   {n:"Tránh mặt cho phải lễ",fx:{},x:"không được mất gì"}]})},
 night(){return false}};
/* ---------- 7 ĐẠI HÀN (row 7): heavy snow (j12 WX "tuyết dày", f 4) `run` tuần in a row. Charcoal by rank: low ranks buy or suffer
   (Sức, phong hàn of j13), lãnh cung worst (j14); rich high ranks share (Đức, Danh) or keep — the same options for her. */
EVD.ret={place:()=>"home",
 start(w){const b=B().ret;const Sh=[],Su=[];for(const v of liveR()){if(v.out){if(roll(b.lcCatch))catchIll(v,b.ill);continue}
   if(rkOf(v)<=b.rank){if((v.bac||0)>=b.buy.bac&&npcPick(v,[["buy",1],["no",mW(v,"bribe")]])==="buy")ap(v,{bac:-b.buy.bac});else{ap(v,{suc:-b.cold.suc});if(roll(b.catch))catchIll(v,b.ill);Su.push(v)}}
   else if((v.bac||0)>=b.share.bac&&npcPick(v,[["share",mW(v,"help")],["keep",1]])==="share"){ap(v,{bac:-b.share.bac,duc:b.share.duc,danh:b.share.danh});Sh.push(v)}}
  try{for(const s of allServ())if(s&&s.role==="maid"&&roll(b.maidCatch))s.suc=Math.max(0,(s.suc||b.maidSuc)-b.suc)}catch(e){}
  return `Tuyết lớn phủ kín cung cấm; than sưởi chia theo phẩm, cung thấp và lãnh cung rét cóng.${Sh.length?` Chia than cho các cung thấp: ${nmList(Sh)}.`:""}${Su.length?` Chịu rét: ${nmList(Su)}.`:""}`},
 end(){phongAfter(B().ret.phongP,"Sau trận đại hàn, Hoàng thượng cho giảm bớt người trong cung");return "Tuyết đã tan; Nội vụ phủ phát than như thường."},
 card(w){const b=B().ret;if(!meCons())return info(w);if(rkOf(S)<=b.rank)return Object.assign(info(w),{opts:[{n:"Bỏ bạc mua thêm than",fx:{bac:-b.buy.bac},x:"thành: qua mùa rét yên ổn"},
   {n:"Chịu rét cho qua",fx:{suc:-b.cold.suc},x:"kèm: có thể bị nhiễm phong hàn",go:()=>{if(roll(b.catch)){const r=catchIll(S,b.ill);if(r)log(r)}}}]});
  return Object.assign(info(w),{opts:[{n:"Chia than cho các cung thấp",fx:{bac:-b.share.bac},x:`thành: Đức +${b.share.duc}, Danh +${b.share.danh}`,go:()=>apply({duc:b.share.duc,danh:b.share.danh})},{n:"Giữ than cho cung mình",fx:{},x:"không được mất gì"}]})},
 night(){return false}};
/* ---------- 8 NẠN CHÂU CHẤU (row 8): a flood / drought whose relief failed (j55) left Kho lúa low but not yet famine (dis.kho..kho),
   in the growing months. Kho lúa falls more, pay in kind cut (stipend gate), the Emperor eats less; NPCs donate or hoard; plague may follow. */
EVD.trung={place:()=>"cnh",
 start(w){const b=B().trung;const T=T_();if(T)T.kho=cl(T.kho-b.khoCut,0,100);moodFloor(b.mood);const G=[];
  for(const v of liveR())if(npcPick(v,[["give",mW(v,"help")*(B().dis.npcW.base+Math.min(B().dis.npcW.cap,(v.bac||0)/B().dis.npcW.per))],["keep",mW(v,"bribe")*B().dis.npcW.keep]])==="give"&&(v.bac||0)>=b.give){ap(v,{bac:-b.give,danh:b.giveDanh});v.th=(v.th||0)+b.giveTh;G.push(v)}
  return `Châu chấu kéo qua đồng, lúa mất trắng; Kho lúa -${b.khoCut}, giá gạo trong cung lên cao, bổng lộc bớt ${Math.round(b.payCut*10)} phần 10.${G.length?` Quyên bạc mua gạo: ${nmList(G)}.`:""}`},
 end(w){if(roll(B().trung.xaP))ws("xa","Qua nạn châu chấu, ban ân điển");return "Nạn châu chấu đã qua; giá gạo trở lại."},
 card(w){const b=B().trung;if(!meCons())return info(w);return Object.assign(info(w),{opts:[{n:"Quyên bạc mua gạo",fx:{bac:-b.give},x:`thành: Danh +${b.giveDanh}, Thái hậu +${b.giveTh}`,go:()=>apply({danh:b.giveDanh,th:b.giveTh})},
  {n:"Bớt chi dùng trong cung",fx:{},x:`thành: Đức +${b.thrift.duc}`,go:()=>apply(b.thrift)},{n:"Làm như không biết",fx:{},x:"không được mất gì"}]})},
 night(){return false},pay:1};
/* ---------- 10 ĐẠI ÁN VU CỔ (row 10): a REAL bùa frame is found (j8 frame / j42 plant / month search / jtruth → framed()) while the
   Emperor, Thái hậu or a child is ill. Every cung searched: planted spies may be caught (s.spyFor), the real planter may be caught by her
   own schemes, else a scapegoat; nights paused, pay held back. Her part: open the doors, quietly clean up, or name a suspect. */
EVD.vuco={place:()=>"home",
 start(w){const b=B().vuco;const F=[];for(const p of [S].concat(liveR())){const st=typeof staffOf==="function"?staffOf(p):(p.staff||[]);
   for(const s of st.slice())if(s&&s.spyFor&&roll(b.spyFind)){const i=(p.staff||[]).indexOf(s);if(i>=0){p.staff.splice(i,1);F.push(s.name)}}}
  w.x.F=F.length;return `Hình nhân bùa ngải trong tẩm cung ${w.x.tn||"một phi tần"} giữa lúc ${w.x.why||"người trong hoàng tộc lâm bệnh"}; Thận hình ti lục soát mọi cung, thị tẩm tạm dừng.${F.length?` Lôi ra tai mắt cài cắm: ${F.join(", ")}.`:""}`},
 end(w){const b=B().vuco;const by=byPid(w.x.by);const me=meGet(w,"me")||"";let r="";let got=null;
  if(by&&(by===S||by.alive)){let o=b.catch+(by.schemes||0)*b.schemeK;if(by===S&&me==="clean")o*=b.clean.mul;if(by!==S&&meGet(w,"acc")===by.id)o+=b.accuseK;if(by===S&&me==="open")o+=b.accuseK;
   if(roll(Math.round(o))){punish(by,"dùng bùa ngải hãm hại người",2);got=by;r=`Thận hình ti tra ra kẻ đặt bùa: ${nmOf(by)}.`}}
  if(meGet(w,"acc")!=null&&notSrv()){const a=byPid(meGet(w,"acc"));if(got&&got===a)apply({danh:b.accuse.danh});else apply({danh:b.accuse.miss})}
  if(!got&&roll(b.innocent)){const L=liveR().filter(v=>!v.out&&v.id!==w.x.tgt&&!(by&&v===by)).sort((x,y)=>rkOf(x)-rkOf(y));const v=L[0];if(v){punish(v,"bị nghi dính vào vu cổ",1);got=v;r=`Không tra ra kẻ chủ mưu; ${v.name} bị bắt làm người chịu tội.`}}
  if(got&&roll(b.toCam))ws("cam","Án vu cổ khép lại, cung cấm giới nghiêm");return (r||"Án vu cổ không tra ra ai; Thận hình ti đóng hồ sơ.")+" Thị tẩm trở lại."},
 card(w){const b=B().vuco;if(!meCons())return info(w);const t=liveR().filter(v=>!v.out).sort((x,y)=>(typeof oan==="function"?oan(S,y)-oan(S,x):0))[0];
  const O=[{n:"Tự mở cửa cho khám xét",fx:{},x:`thành: Đức +${b.open.duc}, ngay thẳng thì khỏi bị nghi`,go:()=>{meSet(w,"me","open");apply(b.open)}},
   {n:"Ngầm dọn dẹp tẩm cung trước",fx:{bac:-b.clean.bac},x:"thành: đồ vật khả nghi được giấu kín",go:()=>{meSet(w,"me","clean")}}];
  if(t)O.push({n:`Tố giác ${t.name}`,fx:{},x:`thành nếu đúng người: Danh +${b.accuse.danh} · sai: Danh ${b.accuse.miss}`,go:()=>{meSet(w,"acc",t.id)}});return Object.assign(info(w),{opts:O})},
 night(){return true},pay:1};
/* ---------- 11 CẤM CUNG GIỚI NGHIÊM (row 11): after a vu cổ / ngoại thích verdict, or Biên cương below BAL after a lost battle. Gates shut:
   the open places close for everyone (place 0; her walk too), schemes thrive with no witnesses, guards watch. */
EVD.cam={place:()=>"home",
 start(w){return `Cửa cung đóng chặt, cấm quân canh gác gấp đôi; ${B().cam.closed.map(k=>{try{return placeOf(k).n}catch(e){return k}}).join(", ")} cấm lui tới, thư từ ra vào bị tra xét.`},
 end(){return "Lệnh giới nghiêm đã bỏ; cửa cung mở lại."},
 card(w){return info(w)},night(){return false}};
{const g0=goTo;goTo=function(k){try{if(S&&B().on&&ww("cam")&&B().cam.closed.includes(k)){log("Cung cấm đang giới nghiêm, cấm quân không cho qua.");try{render()}catch(e){}return}}catch(e){}return g0.apply(this,arguments)}}
/* ---------- 12 ÁN MẤT TRỘM NGỰ KHỐ (row 12): the year-end audit (j72 kho_tet season) finds a gap made by a REAL greedy servant
   (jnet netIs greed). Every cung audited: greedy servants may be caught; pay docked; no thief → a scapegoat cung. Her household: open,
   bribe the audit (Đức −) or clean her own house. */
const greedy=s=>{try{return typeof netIs==="function"&&netIs(s,"greed")}catch(e){return false}};
EVD.trom={place:()=>"home",
 start(w){const b=B().trom;const C=[];for(const v of liveR())for(const s of (v.staff||[]).slice())if(greedy(s)&&roll(b.catch)){v.staff.splice(v.staff.indexOf(s),1);C.push(s.name)}w.x.C=C.length;
  return `Nội vụ phủ kiểm kê cuối năm, ngự khố thiếu cả rương lụa và vàng; kiểm từng cung, bổng lộc tạm giữ lại.${C.length?` Bắt được kẻ ăn cắp: ${C.join(", ")}.`:""}`},
 end(w){const b=B().trom;let n=w.x.C||0;const me=meGet(w,"me")||"open";const mine=(S.staff||[]).filter(greedy);
  if(me==="self"||(me==="open"))for(const s of mine)if(me==="self"||roll(b.catch)){S.staff.splice(S.staff.indexOf(s),1);n++;log(`${s.name} trong cung ngươi bị bắt vì trộm của ngự khố.`)}
  let r="";if(!n&&roll(b.scape)){const v=pick(liveR().filter(v=>!v.out));if(v){ap(v,{danh:b.scapeDanh});r=` Không bắt được ai; cung ${v.name} bị đổ tiếng.`}}
  phongAfter(b.phongP,"Sau án trộm, Hoàng thượng cho giảm bớt người trong cung");return `Án trộm ngự khố đã xong.${r}`},
 card(w){const b=B().trom;if(!meCons())return info(w);return Object.assign(info(w),{opts:[{n:"Mở kho cung mình cho kiểm",fx:{},x:"thành: kẻ gian trong cung ngươi có thể bị bắt",go:()=>{meSet(w,"me","open")}},
  {n:"Lo lót Nội vụ phủ cho qua",fx:{bac:-b.bribe.bac},x:`kèm: Đức ${b.bribe.duc}`,go:()=>{meSet(w,"me","bribe");apply({duc:b.bribe.duc})}},
  {n:"Tự tra người của mình",fx:{},x:`thành: kẻ tham trong cung ngươi bị lôi ra, Đức +${b.self.duc}`,go:()=>{meSet(w,"me","self");apply({duc:b.self.duc})}}]})},
 night(){return false},pay:1};
/* ---------- 13 ĐẠI PHÓNG CUNG NHÂN (row 13): maids at BAL.srvAge.ask (j42 rule, ageing j17) leave every household at once (spring, or
   after a trộm / rét); rich NPCs pay Nội vụ phủ to keep a good one; Nội vụ phủ refills (fillStaff) at the end. Her: send them off with silver,
   keep one, or let them go. */
/* mãn hạn = the j42 rule she meets as a maid: at BAL.srvAge.ask Nội vụ phủ asks her to leave; a chưởng sự (rk >= 3) may stay as ma ma.
   (srvAge.out 30 was never reached in a live household: NPC maids turn over or rise to rk 3 first — world-ret-phong r1 bot, 0 in 2700 tuần.) */
const aged=s=>s&&s.role==="maid"&&(s.age||0)>=BAL.srvAge.ask&&!s.eid&&!s.coop&&!((s.rk||0)>=3)&&s!==S.maid;
/* ONE pool for every phóng cung opener and for the release itself: her household + the living NPC households not in lãnh cung
   (a dead or cold-palace household is never counted, so the gate never opens an empty release). */
const phongHH=()=>liveR();/* liveRivals: alive and not in lãnh cung */
const phongN=()=>[S].concat(phongHH()).reduce((n,v)=>n+(v&&v.staff||[]).filter(aged).length,0);
/* ONE opener (spring calendar, trộm end, đại hàn end): the cause's own BAL odds (clamped BAL.odds.lo..hi), then phong.min aged maids in
   the pool; worldStart keeps phong's cd / maxOpen / host gate. */
const phongOpen=(p,cause,o)=>{if(roll(cl(p,BAL.odds.lo,BAL.odds.hi))&&phongN()>=B().phong.min)return ws("phong",cause,o);return null};
const phongAfter=(p,cause)=>phongOpen(p,cause);
EVD.phong={place:()=>"home",
 start(w){const b=B().phong;let n=0;for(const v of phongHH()){const L=(v.staff||[]).filter(aged);if(!L.length)continue;let keep=null;
   if(L.length>=2&&(v.bac||0)>=b.keep.bac&&roll(b.npcKeep)){/* keep one only when another still leaves: a release is never empty */keep=L.sort((x,y)=>(y.loyal||0)-(x.loyal||0))[0];ap(v,{bac:-b.keep.bac})}
   for(const s of L)if(s!==keep){v.staff.splice(v.staff.indexOf(s),1);n++}}
  w.x.n=n;w.x.mine=(S.staff||[]).filter(aged).length;return `Chiếu cho cung nữ mãn hạn xuất cung về quê${n?`; ${n} người ở các cung đã ra đi`:""}.${w.x.mine?` Trong cung ngươi có ${w.x.mine} người đến tuổi.`:""}`},
 end(w){const b=B().phong;const me=meGet(w,"me")||"let";const L=(S.staff||[]).filter(aged);let keep=null;if(me==="keep"&&L.length)keep=L.sort((x,y)=>(y.loyal||0)-(x.loyal||0))[0];
  for(const s of L)if(s!==keep)S.staff.splice(S.staff.indexOf(s),1);
  for(const v of [S].concat(liveR()))try{if(v.staff&&typeof fillStaff==="function")fillStaff(v,true)}catch(e){}
  return `Nội vụ phủ đã đưa cung nữ mới về các cung.${keep?` ${keep.name} được giữ lại bên ngươi.`:""}`},
 card(w){const b=B().phong;const n=w.x.mine||0;if(!meCons()||!n)return info(w);return Object.assign(info(w),{opts:[{n:"Tặng bạc hồi hương",fx:{bac:-b.gift.bac*n},x:`thành: Đức +${b.gift.duc}, người đi nhớ ơn`,go:()=>{meSet(w,"me","let");apply({duc:b.gift.duc})}},
  {n:"Lo lót Nội vụ phủ giữ lại một người thân tín",fx:{bac:-b.keep.bac},x:"thành: người trung thành nhất ở lại",go:()=>{meSet(w,"me","keep")}},{n:"Để các nàng ra đi",fx:{},x:"không được mất gì",go:()=>{meSet(w,"me","let")}}]})},
 night(){return false}};
/* ---------- 14 CÔNG CHÚA XUẤT GIÁ (row 14): a real daughter's wedding (j54 ban hôn / hòa thân, k.wed). Hồi môn from Kho lúa; the
   mother's face; every cung sends a gift by its own silver (hòa thân's Biên cương +20 stays in j55/j54). */
EVD.hon={nm:w=>w.x.hoa?"Công chúa hòa thân":"Công chúa xuất giá",place:()=>"tn",
 start(w){const b=B().hon;const m=byPid(w.x.who);const T=T_();if(T)T.kho=cl(T.kho-b.kho,0,100);if(m){if(m===S){if(notSrv())apply({danh:b.mDanh})}else ap(m,{danh:b.mDanh})}
  let n=0;for(const v of liveR()){if(v===m||v.out)continue;const g=Math.round((v.bac||0)*b.npcGift);if(g>0&&npcPick(v,[["g",mW(v,"social")],["n",mW(v,"harm")]])==="g"){ap(v,{bac:-g});if(m&&m!==S)affAdd(m,v,b.npcAff);n++}}
  return `${w.x.kid} ${w.x.hoa?"lên đường hòa thân, ngàn dặm xa xứ":"xuất giá, kiệu hoa ra cửa Tây Hoa"}; hồi môn lấy từ kho, Kho lúa -${b.kho}.${n?` ${n} cung gửi quà tiễn.`:""}`},
 end(w){return `Lễ tiễn ${w.x.kid} đã xong.`},
 card(w){const b=B().hon;const m=byPid(w.x.who);if(!meCons()||!m||m===S)return info(w);
  return Object.assign(info(w),{who:pv(m),opts:[{n:"Gửi quà tiễn công chúa",fx:{bac:-b.gift},x:`thành: ${m.name} quý ngươi +${b.giftAff}`,go:()=>affAdd(m,S,b.giftAff)},{n:"Chỉ đến dự lễ",fx:{},x:"không được mất gì"}]})},
 night(){return false}};
/* ---------- 15 ĐẠI ÁN NGOẠI THÍCH (row 15): a house's power (j55 T.H pow) passes BAL while the Emperor is young or ill, or it is the
   queen's house. The Emperor strikes (purge: the house falls, its consorts lose favour; giới nghiêm may follow) or bends (it rises). Her: if
   it is her own house she may write to her father to step back. */
EVD.ngoai={place:()=>"thu",
 start(w){const b=B().ngoai;moodFloor(b.mood);const M=consorts().filter(p=>houseOf2(p)===w.x.c);
  return `Nhà ${w.x.c} thế lực lấn át triều đình, môn sinh chiếm nửa sáu bộ; Hoàng thượng triệu đại thần bàn kín.${M.length?` Phi tần nhà ấy: ${nmList(M)}.`:""}`},
 end(w){const b=B().ngoai;const T=T_();const h=T&&T.H[w.x.c];if(!h)return "";const ill=!!(S.emp.ill&&S.emp.ill.st>=b.illSt);const M=consorts().filter(p=>houseOf2(p)===w.x.c);
  if(h.pow>=b.pow+b.keepPow&&roll(ill?b.purge[1]:b.purge[0])){tdPowAdd(w.x.c,b.fall);for(const p of M){if(p===S){if(notSrv())apply({sung:b.sung,danh:b.danh})}else ap(p,{sung:b.sung,danh:b.danh})}
   if(roll(b.toCam))ws("cam",`Trừ phe ngoại thích nhà ${w.x.c}, cung cấm giới nghiêm`);return `Hoàng thượng ra tay: nhà ${w.x.c} bị tước quyền, môn sinh bị đuổi.${M.length?` ${nmList(M)} thất sủng.`:""}`}
  tdPowAdd(w.x.c,b.rise);return `Hoàng thượng nhún nhường; nhà ${w.x.c} càng thêm thế.`},
 card(w){const b=B().ngoai;if(!meCons()||houseOf2(S)!==w.x.c)return info(w);const o=od(b.advise.o[0]+(S.tamco||0)/b.advise.o[1]);
  return Object.assign(info(w),{opts:[{n:"Viết thư khuyên cha lui bớt",fx:{},x:`${word(o)} · thành: nhà ${w.x.c} bớt thế lực, khó bị trừ · hỏng: cha không nghe`,go:()=>{if(roll(o))tdPowAdd(w.x.c,b.advise.pow)}},
   {n:"Đứng về phía nhà mình",fx:{},x:"không được mất gì"}]})},
 night(){return false}};
/* ---------- 16 LỄ PHẬT ĐẢN / ĐẠI TRAI ĐÀN (row 16): yearly (month 4, mild) and a great assembly one tuần into a disaster (dis / dich /
   trung) while Thái hậu lives — the great one may end that disaster early. Donations reach Thái hậu (th); pray weight up; big: no night. */
EVD.phat={nm:w=>w.x.big?"Đại trai đàn cầu phúc":"Lễ Phật đản",place:()=>"cnh",
 start(w){const b=B().phat;let n=0;for(const v of liveR()){if(v.out||v.confined)continue;const g=Math.round((v.bac||0)*b.npcGive);if(g>0&&npcPick(v,[["g",mW(v,"pray")],["n",1]])==="g"){ap(v,{bac:-g});v.th=(v.th||0)+b.npcTh;n++}}
  return `${w.x.big?"Thái hậu mở đại trai đàn cầu phúc cho thiên hạ; ngự thiện ăn chay, đêm ấy không ai thị tẩm.":"Chùa trong cung mở lễ Phật đản; ngự thiện ăn chay, các cung tụng kinh."}${n?` ${n} cung cúng dường.`:""}`},
 end(w){const b=B().phat;if(w.x.big&&roll(b.endDis)){const d=["dis","dich","trung"].map(ww).find(Boolean);if(d){d.t1=Math.min(d.t1,now()+1);return "Trai đàn tan; lòng người yên lại, cơn nạn sắp qua."}}return "Lễ Phật đã xong."},
 card(w){const b=B().phat;if(!meCons())return info(w);return Object.assign(info(w),{opts:[{n:"Cúng dường hậu hĩnh",fx:{bac:-b.big.bac},x:`thành: Thái hậu +${b.big.th}`,go:()=>{if(!S.thDead)apply({th:b.big.th})}},
  {n:"Chép kinh cầu phúc",fx:{suc:-b.sutra.suc},x:`thành: Đức +${b.sutra.duc}, Thái hậu +${b.sutra.th}`,go:()=>apply(S.thDead?{duc:b.sutra.duc}:{duc:b.sutra.duc,th:b.sutra.th})},{n:"Lễ Phật rồi về",fx:{},x:"không được mất gì"}]})},
 night(w){return !!w.x.big}};
/* ---------- 17 LONG THỂ BẤT AN (row 17): S.emp.ill reaches stage BAL (j3 monthly). Silence: no yến, no thị tẩm; consorts from BAL rank take
   the medicine shifts at Dưỡng Hòa điện (force slot); heirs' mothers scheme (act). Her: ask to nurse (odds), send ginseng, pray. */
EVD.benh={place:()=>"dtd",
 start(w){const b=B().benh;moodFloor(b.mood);const N=[];for(const v of liveR()){if(v.out||v.confined||rkOf(v)<b.force[0].rank)continue;if(npcPick(v,[["n",mW(v,"greet")],["x",mW(v,"scheme")]])==="n"){ap(v,{sung:b.npcSung[0]});N.push(v)}}
  return `Hoàng thượng lâm bệnh nặng; hậu cung lặng như tờ, bãi yến, thôi thị tẩm.${N.length?` Được vào hầu thuốc: ${nmList(N)}.`:""}`},
 tick(w){if(!(S.emp&&S.emp.ill))w.t1=Math.min(w.t1,now()+1)},
 end(){return S.emp&&S.emp.ill?"Long thể đã đỡ phần nào; hậu cung dần trở lại.":"Long thể đã an; hậu cung trở lại như thường."},
 card(w){const b=B().benh;if(!meCons())return info(w);const ok=rkOf(S)>=b.force[0].rank;const o=od(b.nurse.o[0]+((S.arts&&S.arts.y)||0)*b.nurse.o[1]);
  const O=[];if(ok)O.push({n:"Xin vào hầu thuốc",fx:{suc:-b.nurse.suc},x:`${word(o)} · thành: Sủng +${b.nurse.sung}`,go:()=>{if(roll(o))apply({sung:b.nurse.sung})}});
  O.push({n:"Dâng sâm quý",fx:{bac:-b.gin.bac},x:`thành: Sủng +${b.gin.sung}`,go:()=>apply({sung:b.gin.sung})},{n:"Cầu phúc ở chùa",fx:{},x:`thành: Đức +${b.pray.duc}`,go:()=>apply({duc:b.pray.duc})});
  return Object.assign(info(w),{opts:O})},
 night(){return true},feast:1};
/* ---------- 18 TỈNH THÂN (row 18): yearly after Tết (j68g mệnh phụ vào cung). Families come by their house power (j55 S.dad / T.H pow):
   silver from home, strong houses show off (Danh); schemers get funds (act). Her: take the gift, or ask her father to speak for her. */
EVD.tinh={place:()=>"home",
 start(w){const b=B().tinh;let n=0,sh=[];for(const v of liveR()){if(v.out)continue;let h=v.dad;if(h==null)try{const hd=tdHeadOf(v);h=hd?hd.pow:null}catch(e){h=null}const g=Math.round(h!=null?h*b.bacK:b.base*b.bacK);ap(v,{bac:g});n++;if(h!=null&&h>=b.showPow){ap(v,{danh:b.showDanh});sh.push(v)}}
  return `Sau Tết, gia quyến các cung được vào thỉnh an; thư nhà, quà quê theo vào.${sh.length?` Nhà thế lớn phô trương: ${nmList(sh)}.`:""}`},
 end(){return "Gia quyến đã ra về; cửa cung đóng lại như cũ."},
 card(w){const b=B().tinh;if(!meCons()||S.out)return info(w);const g=Math.round((S.dad!=null?S.dad:b.base)*b.bacK);const o=od(b.ask.o[0]+(S.dad||0)/b.ask.o[1]);
  return Object.assign(info(w),{opts:[{n:"Nhận quà nhà gửi vào",fx:{},x:`thành: Bạc +${g}`,go:()=>apply({bac:g})},
   {n:"Nhờ cha nói giúp trước triều",fx:{},x:`${word(o)} · thành: Danh +${b.ask.danh} · hỏng: không được gì`,go:()=>{if(roll(o))apply({danh:b.ask.danh})}}]})},
 night(){return false}};
/* LUẬT SỬA CẢ NHÓM (world_scan, batch 2): the j7 weekly "empnight" card (the Emperor at her door at night) ignored the night gate — while
   a window bars the night for her (long thể bất an, ôn dịch, vu cổ, away, the first weeks of a quốc tang, đại trai đàn) it leaves the pool. */
if(typeof freshEvents==="function"){const f0=freshEvents;freshEvents=function(){const L=f0.apply(this,arguments);try{if(B().on&&window.worldNightBlocked(S))return L.filter(e=>!(e&&e.id==="empnight"))}catch(e){}return L}}
/* ---------- real causes (the tuần tick, after batch 1's calendar) ---------- */
function seen2(){const z=wZ();let K=[],W=[];try{for(const [k,v] of allKids()){if(k.alive)K.push(k.name);if(k.wed===1)W.push(k.name)}}catch(e){}
 const q=(typeof qOn==="function"&&qOn()&&rivals[0]&&rivals[0].queen)?rivals[0]:null;const h=S.heir&&S.heir.k&&S.heir.k.alive?S.heir.k.name:null;
 return{K,W,q:S.rank>=7?"me":(q?q.id:null),h}}
function x2Tick(){if(!S||S.dead)return;const b=B(),z=wZ(),t=now(),y=S.year,m=S.month,tu=S.tuan||0;const n=seen2();const o=z.s2;z.s2=n;
 if(o){/* births → đầy tháng a month later */
  for(const nm of n.K)if(!o.K.includes(nm)){const r=kidByName(nm);if(r&&(r[0].age||0)<=1)(z.dq=z.dq||[]).push({kid:nm,sex:r[0].sex,who:pid(mom(r[1])),at:t+b.day.delay})}
  /* heir */
  if(n.h&&n.h!==o.h){const r=kidByName(n.h);ws("lap",`Chiếu sắc lập ${n.h} làm Thái tử`,{len:b.lap.len,x:{kid:n.h,who:r?pid(mom(r[1])):null}})}
  /* queen seat */
  if(n.q!=null&&n.q!==o.q){const old=o.q!=null?byPid(o.q):null;const phe=!!(old&&(old===S?!S.dead:old.alive));ws("hau",phe?"Hoàng hậu bị phế, lập Hoàng hậu mới":"Sắc phong Hoàng hậu mới",{len:b.hau.len,x:{from:o.q,to:n.q,sub:phe?"phe":"lap"}})}
  /* weddings */
  for(const nm of n.W)if(!o.W.includes(nm)){const r=kidByName(nm);if(r)ws("hon",`${nm} đến tuổi xuất giá`,{len:b.hon.len,x:{kid:nm,who:pid(mom(r[1])),hoa:r[0].hW&&r[0].hW.kind==="hoa"?1:0}})}}
 for(const d of (z.dq||[]).slice())if(t>=d.at){z.dq.splice(z.dq.indexOf(d),1);const r=kidByName(d.kid);if(r&&r[0].alive)ws("day",`${d.kid} tròn một tháng`,{len:b.day.len,x:d})}
 /* the sick: Thái hậu, the Emperor (state, not dice) */
 if(!S.thDead&&S.thIll&&(S.thIll.st||1)>=b.thb.st&&!ww("thb"))ws("thb",`Thái hậu mắc ${typeof ILL!=="undefined"&&ILL[S.thIll.k]?ILL[S.thIll.k].n.toLowerCase():"bệnh"}, bệnh trở nặng`,{len:b.thb.len});
 if(S.emp&&S.emp.ill&&(S.emp.ill.st||1)>=b.benh.st&&!ww("benh")&&!ww("away"))ws("benh","Hoàng thượng lâm bệnh, Thái y viện ngày đêm hội chẩn",{len:b.benh.len});
 /* the calendar */
 if(m===b.thi.month&&tu===0&&y%b.thi.every===b.thi.off)ws("thi",`Năm thứ ${y}, khoa thi Đình theo lệ ba năm`,{len:b.thi.len});
 if(m===b.vuong.month&&tu===0&&y%b.vuong.every===b.vuong.off&&vgOf()&&!ww("away"))ws("vuong",`${vgOf().name} về kinh triều kiến`,{len:b.vuong.len});
 if(m===b.tinh.month&&tu===b.tinh.t&&!ww("cam"))ws("tinh","Sau Tết, gia quyến được vào cung thỉnh an",{len:b.tinh.len});
 if(m===b.phat.month&&tu===b.phat.t)ws("phat","Mồng tám tháng tư, lễ Phật đản",{len:b.phat.len});
 if(m===b.trom.month&&tu===b.trom.t&&allServ().some(greedy)&&roll(b.trom.p))ws("trom","Kiểm kê ngự khố cuối năm thấy thiếu hụt",{len:b.trom.len});
 if(m===b.phong.month&&tu===0)phongOpen(b.phong.p,"Cung nữ mãn hạn, theo lệ cho xuất cung",{len:b.phong.len});
 /* the weather: heavy snow (rollWx f 4) in `run` of the last run+1 tuần */
 z.snowL=(z.snowL||[]).concat(wxDayAny(4)?1:0).slice(-(b.ret.run+1));z.snowR=z.snowL.reduce((a,c)=>a+c,0);if(wxDayAny(4)&&z.snowR>=b.ret.run)ws("ret","Tuyết lớn nhiều tuần liền, than sưởi không đủ",{len:b.ret.len});
 /* the court: a house too strong (monthly) */
 if(tu===0){const T=T_();if(T&&typeof CLANS!=="undefined"){const E=S.emp||{};const weak=(E.age||b.ngoai.young)<b.ngoai.young||!!(E.ill&&E.ill.st>=b.ngoai.illSt);const q=liveR().find(v=>v.queen);const qh=q?houseOf2(q):(S.rank>=7?houseOf2(S):null);
   const c=CLANS.filter(c=>T.H[c]&&T.H[c].pow>=b.ngoai.pow&&(weak||c===qh)).sort((a,c2)=>T.H[c2].pow-T.H[a].pow)[0];if(c)ws("ngoai",`Nhà ${c} chuyên quyền`,{len:b.ngoai.len,x:{c}})}}
 /* a great assembly one tuần into a disaster, while Thái hậu lives */
 for(const k of ["dis","dich","trung"]){const d=ww(k);if(d&&wNow0(d)>=1&&!d.x.ph){d.x.ph=1;if(!S.thDead&&roll(b.phat.afterP))ws("phat","Thái hậu mở đại trai đàn cầu phúc cho dân",{len:b.phat.len,x:{big:1},cd:0})}}
}
XH.push(x2Tick);
/* the court roll (batch-1 wCourt reads S.wMM): châu chấu after a failed relief that left Kho lúa between dis.kho and trung.kho;
   giới nghiêm when Biên cương falls below BAL after a lost battle */
XH.push(function(){if((S.tuan||0)!==0)return;const M=S.wMM,T=T_();if(!M||!T||M.done2)return;M.done2=1;const b=B();
 if((M.k==="lut"||M.k==="han")&&M.fail&&T.kho>=b.dis.kho&&T.kho<b.trung.kho&&S.month>=b.trung.m0&&S.month<=b.trung.m1)ws("trung","Sau trận "+(M.k==="lut"?"lũ":"hạn")+", châu chấu nổi lên ăn lúa",{len:b.trung.len});
 if(M.k==="giac"&&M.fail&&T.bien<b.cam.bien)ws("cam","Giặc tràn qua biên ải, kinh thành giới nghiêm",{len:b.cam.len})});
/* vu cổ: a REAL bùa / hình nhân found while someone of the Emperor's house is ill. ONE cause function, called from both roads that dig one up:
   framed() (j8 Vu oan, j42 plant, the month search, jtruth) and the j8 "kframe" act (hình nhân trù ẻo in a son's room, no framed() call). */
function vucoCause(p,by){try{if(!S||!B().on||(typeof worldOn==="function"&&!worldOn())||!p||ww("vuco"))return;
  const kid=(()=>{try{return allKids().find(([k])=>k.alive&&(k.hp||100)<B().vuco.kidHp)}catch(e){return null}})();
  const why2=S.emp&&S.emp.ill?"long thể bất an":(!S.thDead&&S.thIll)?"Thái hậu đang bệnh":kid?`${kid[0].name} ốm yếu`:"";
  if(why2&&!((wZ().q||[]).some(a=>a.k==="vuco")))window.worldQueue("vuco","Phát hiện hình nhân bùa ngải",{len:B().vuco.len,x:{tgt:pid(p),tn:p===S?"ngươi":p.name,by:by?pid(by):null,why:why2}})}catch(e){wErr("vuco",e)}}
if(typeof framed==="function"){const f0=framed;framed=function(p,why){const r=f0.apply(this,arguments);if(/bùa|hình nhân|trù ẻo/.test(String(why||"")))vucoCause(p,typeof ACTX!=="undefined"?ACTX.a:null);return r}}
try{const K=typeof ACT!=="undefined"&&ACT.kframe;if(K&&K.f){const f0=K.f;K.f=function(a,t){const r=f0.apply(this,arguments);if(/đào được hình nhân/.test(String(r||"")))vucoCause(t,a);return r}}}catch(e){wErr("kframe",e)}
})();
