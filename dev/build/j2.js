/* ONE CORE: the "người quen cũ" ally of a new life (start; co-op part B rebase passes the real NPCs of the room world) */
function allyBond(L){const v=pick(L||[]);if(v){relAdd(S,v,BAL.allyRel);v.ghen=0;log(`${v.name} là người quen cũ, sẵn lòng che chở ngươi.`)}return v}

function start(){
  try{if(typeof kmReset==="function")kmReset()}catch(e){}/* a new life starts with no scene / overlay / queued job of the last one (j93 kmReset) */
  const o=(window.__forceOrigin&&originByKey(window.__forceOrigin))||(o0=>originByKey(originBrPick(o0.k,Math.random()))||o0)(pick(ORIGINS));/* hòa thân: country branch (j1) */quiet=true;Q=[];popIdx=null;popMsg="";
  S={year:1,month:3,tuan:0,age:BAL.ageMin+R(3),rank:o.r,sung:8,danh:8,bac:60,suc:80,th:o.th,hh:o.hh,tai:30+R(50),sac:40+R(55),tamco:10+R(20),duc:30,thu:0,
     schemes:0,moreRivals:0,maid:newMaid(nmNew("maid"),50+R(31)),origin:o,name:"",
     preg:0,hidden:false,fake:0,fert:0,anthai:0,doctor:0,pray:0,kids:[],heir:null,lastPromo:0,turn:0,dead:false,
     arts:{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0},artp:{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0},master:0,confined:0,shield:0,tablet:0,
     place:"home",visit:null,tonight:null,inv:[],an:0,nightLog:[],evm:{},rl:{},hieu:"",block:0,dress:null,asthma:false,shop:[],seen:{},emp:mkEmp(),st:{step:0,done:0,tag:""},recorded:false,nights:0,thDead:false,logs:[],caseEv:0,avenged:false,lad6:1/* maid-ladder-6: born on the six-rung maid ladder */};
  if(typeof tmInstall==="function")tmInstall(S);rivals=[];S.name=freshName();apply(o.o);S.ally=o.ally?1:0;
  for(const [r,q] of BAL.ps.harem)rivals.push(newRival(r,q));
  /* palace-start: a young harem (the Emperor's household from before the throne + the first draft), 3–5 small children (psSeedKids), court still weak (S.reign: hook for the Emperor's side story, D5) */
  rivals.forEach(v=>{v.age=BAL.ps.consAge[0]+R(BAL.ps.consAge[1]+1)+(v.queen||v.rank>=4?BAL.ps.consAge[2]:0)});psSeedKids();S.ps=1;S.reign={y0:S.year,power:BAL.ps.power0,ch:0,side:null};/* D5 hook: Emperor side story chapters (ch) and her side road: side = "emp" | "th" | "quyen" */spreadTraits();
  Object.assign(S,drawFace());rivals.forEach(v=>Object.assign(v,drawFace()));S.emp.face=R(Math.max(1,(AV.emperor||[]).length));
  normAll();
  if(S.ally)allyBond(liveRivals(false));
  const s=STORY[o.k];if(s.init)s.init();
  /* origin-arts (owner OD 20/11 ~02:05Z): her start arts + tứ đức = the row of HER identity (origin × the road STORY init just rolled, S.st.f14.road)
     in BAL.orig.art; old saves never pass here, so they keep the arts they have (law 6c) */
  S.vir=S.vir||{};S.virp=S.virp||{};origArtSet(S,o.k,S.st&&S.st.f14&&S.st.f14.road);/* one table BAL.orig.art → the one ladder (jbalcore origArtSet) */
  S.visit={k:"home",people:homePeople(),talked:false};S.buoi=0;rollWx();
  quiet=false;used=0;tab="act";
  const E=S.emp;
  /* review/newgame-ui (owner 15/11 "nhập cung phải có ảnh minh họa chứ, khung sự kiện đâu"): the EVENT frame (KIT 32.2 kitEventStage) — painted
     entering-the-palace band (consort / palace-maid road) + her full-body figure in the person column, the text beside */
  pushModal({t:"Nhập cung",stage:[S],headArt:{src:(o.k==="cnv"||(typeof isSrv==="function"&&isSrv()))?"img/ev-nhap-cung-cn.webp":"img/ev-nhap-cung.webp",label:"Nhập cung"},
   h:`<p>${S.name}, ${S.age} tuổi, ${o.n}. ${o.t} Hôm nay ngươi được đưa vào cung.</p>
   ${kitRows([["Phong",meRankN(),"t"],["Theo hầu",typeof cmRow==="function"?cmRow():`Cung nữ ${S.maid.name} (từ nhà)`,"t"],["Hoàng thượng",`niên hiệu ${empEra()}, ${E.age} tuổi: ${E.traits.map(t=>ETRAITS[t][0]).join(", ")}`,"t"],
    ...(S.ps?[["Hậu cung",psOpenText(),"t"]]:[]),["Tuyến truyện",`${s.t}. ${s.goal}${o.k==="td"?` Kẻ vu cho cha ngươi là ${S.foeDad}; con gái hắn, ${S.foe}, đang ở trong cung.`:""}`,"t"]])}
   <p class="past">Mỗi tháng ba tuần; mỗi tuần bốn buổi (sáng, trưa, chiều, tối), mỗi buổi ${BAL.time.khac} khắc. Mở Bản đồ để đi gặp người, chạm vào người để nói chuyện hay ra tay.</p>`});
  flip();newLots();deal();render();
}
function homePeople(){const p=[{kind:"maid",name:S.maid.name,ini:S.maid.name.split(" ").pop()[0],col:"#b9a48a",info:`${kitMaidTitle()} · thiện cảm ${S.maid.loyal}${typeof cmInfo==="function"?cmInfo(S.maid):""}`}];
  S.kids.filter(k=>k.alive).forEach(k=>p.push({kind:"kid",ref:k,name:k.name,ini:k.sex==="m"?"Tử":"Nữ",col:k.heir?"#f0d070":"#c9a0e0",info:`${k.age} tuổi · Sức khỏe ${k.hp} · Tài ${k.tal} · Hoàng thượng thương ${k.fond}${k.heir?" · Thái tử":""}`}));return p}

function pool(){const L=S.emp.likes,K=S.emp.known,tt=has("trongtai")?2:1;
 const A=[
  {n:"Đánh đàn ở ngự hoa viên",t:K.music?`Tấu ${L.music}, khúc ngài yêu thích.`:"Đợi Hoàng thượng đi ngang.",c:{suc:-10},o:od(BAL.odb.j2.odO+S.tai/3+artOE(S,"cam")+(K.music?15:0)+mm()),w:{sung:K.music?9:7},l:{sung:-1}},
  {n:"Dâng canh ở ngự thư phòng",t:K.dish?`Tự tay nấu ${L.dish}, món ngài thích.`:"Tự tay nấu, sâm mua bằng bạc riêng.",c:{bac:-15,suc:-5},o:od(BAL.odb.j2.odO_2+S.sac/5+(K.dish?15:0)+mm()),w:{sung:K.dish?8:6},l:{danh:-2}},
  P3C.dance(S),
  {n:"Cắm hoa dâng Hoàng thượng",t:K.flower?`Một bình ${L.flower}, loài hoa ngài yêu.`:"Chưa biết ngài thích hoa gì.",c:{bac:-5,suc:-5},o:K.flower?100:od(BAL.odb.j2.odO_4),w:{sung:K.flower?5:2},l:{}},
  P3C.eyes(S),
  {n:"Nghỉ ngơi dưỡng sức",t:"Uống thuốc bổ, ngủ sớm.",c:{...BAL.ag.cx.rest.c},o:BAL.ag.cx.rest.o,w:{...BAL.ag.cx.rest.w},l:{}},
  {n:"Thêu khăn bán ra ngoài",t:"Lén nhờ cung nữ mang ra cửa Thần Vũ.",c:{suc:-10},o:od(BAL.odb.j2.odO_6),w:{bac:35},l:{danh:-4}},
  {n:"Làm thơ dâng lên",t:S.tai>=70?"Thơ ngươi đã truyền khắp cung, danh tiếng thêm vang.":"Tài hoa là con đường dài.",c:{suc:-5},o:od(BAL.odb.j2.odO_7+S.tai/2+artOE(S,"thi")),w:{sung:5,danh:S.tai>=70?6:4},l:{danh:-1}},
  {n:"Cầu tự ở Phụng Tiên điện",t:"Thắp hương xin một hoàng tử.",c:BAL.tw.pray,o:od(BAL.tw.g.prayO),w:{},l:{},lock:S.fert>0||S.pray>0,t:"đang có hiệu lực",x:`2 tháng dễ có thai hơn (nay ${chanceW(conceiveCh())})`,go:()=>S.pray=BAL.tw.g.pray},
  {n:"Phát chẩn cho cung nhân",t:"Ban bạc cho kẻ hầu nghèo.",c:{...BAL.ag.cx.alms.c},o:od(BAL.ag.cx.alms.o),w:{...BAL.ag.cx.alms.w},l:{}},
  {n:"Dưỡng nhan",t:"Ngọc trai nghiền, sữa dê tắm, ngủ đủ giấc.",c:{...BAL.ag.cx.face.c},o:od(BAL.ag.cx.face.o),w:{...BAL.ag.cx.face.w},l:{}},
  {n:"Luyện cầm kỳ thi họa",t:"Ngày đêm khổ luyện bên án thư.",c:{...BAL.ag.cx.arts.c},o:BAL.ag.cx.arts.o,w:{...BAL.ag.cx.arts.w},cx:"arts",x:typeof alLightNote==="function"?alLightNote("arts"):""},
  {n:"Đọc binh thư, sử sách",t:"Học mưu kế người xưa, xem lòng người.",c:{...BAL.ag.cx.book.c},o:BAL.ag.cx.book.o,w:{...BAL.ag.cx.book.w},cx:"book",x:typeof alLightNote==="function"?alLightNote("book"):""},
  {n:"Tụng kinh, làm việc thiện",t:"Thắp hương ở Bảo Hoa điện, bố thí kẻ nghèo.",c:{...BAL.ag.cx.sutra.c},o:BAL.ag.cx.sutra.o,w:{...BAL.ag.cx.sutra.w}},
  {n:"Thưởng cung nữ",t:`Ban cho ${S.maid.name} vòng bạc, giữ lòng nàng.`,c:{...BAL.ag.cx.maidR.c},o:BAL.ag.cx.maidR.o,w:{...BAL.ag.cx.maidR.w}}];
 /* Giả mang thai = a STAGED road (review/m-fix-3, law 7): the corner word is the WHOLE road (oi = j8 fpRoad: the first step × no exposure in
    9 months × the month-10 swap), the first step rolls at oin (runOpt), the book is read for real (fpLast) and the later danger is a Kèm. */
 if(!S.preg&&S.tamco>=50){const o1=od(S.tamco),nr=fpNoRec(S,wk()),rd=fpRoad(S,o1,1,nr),bk=fpLast(S,wk());
  A.push({n:"Giả mang thai",t:"Mua chuộc thái y, độn bụng, chờ tháng thứ chín tráo con.",c:BAL.tw.fakePreg,o:100,inner:1,oin:o1,oi:rd,w:{sung:BAL.tw.g.preg[0],th:BAL.tw.g.preg[1]},l:{danh:BAL.tw.g.preg[2]},
   x:`có 'thai'; tháng 9 phải tráo con · kèm: sổ Kính sự phòng ${bk.n?`ghi đêm cuối ${bk.gap} tuần trước (${nr?"không khớp":"khớp"} tháng thai)`:"chưa ghi đêm nào (không khớp tháng thai)"} · lộ hay tráo hỏng thì bị ban chết (tội khi quân): ${chanceW(100-Math.round(rd*100/Math.max(1,o1)))}`,go:()=>{S.preg=1;S.fake=1;S.hidden=false;S.pregWk=wk();S.khBook=0}})}
 return A}
function artActs(){const A=[],r=S.arts;
 const D=BAL.deck;/* one table + one odds formula with the NPC's same act (BAL.deck, j75 deckOdds) */
 if(r.cam>=D.cam.lv)A.push({n:"Đàn khúc Phượng cầu hoàng",t:"Tiếng đàn đêm trăng vọng đến Dưỡng Hòa điện.",c:Object.assign({},D.cam.c),o:od(deckOdds(S,"cam")),w:deckGain("cam"),l:deckLoss("cam")});
 if(r.vu>=D.vu.lv)A.push({n:"Kinh hồng vũ",t:"Điệu múa trong yến tiệc khiến cả điện lặng người.",c:Object.assign({},D.vu.c),o:od(deckOdds(S,"vu")),w:deckGain("vu"),l:deckLoss("vu"),x:`các phi tần ghen +${ghenN(BAL.tw.g.vu[0])}, thiện cảm ${balSg(-Math.max(0,...liveRivals(true).map(v=>opDnSee(v,S,BAL.tw.g.vu[1]))))}`,go:()=>{ghenAll(BAL.tw.g.vu[0],"ngươi múa Kinh hồng vũ được ngài khen");liveRivals(true).forEach(v=>affAdd(v,S,-BAL.tw.g.vu[1]))}});
 if(r.ky>=D.ky.lv)A.push({n:"Đánh cờ với Hoàng thượng",t:"Biết lúc thắng, biết lúc nhường.",c:Object.assign({},D.ky.c),o:od(deckOdds(S,"ky")),w:deckGain("ky"),l:deckLoss("ky")});
 if(r.hoa>=BAL.ag.cx.portrait.hoa)A.push({n:"Vẽ chân dung tặng Thái hậu",t:"Mất nửa tháng, từng sợi tóc bạc.",c:{...BAL.ag.cx.portrait.c},o:od(BAL.ag.cx.portrait.o+artW("hoa",r.hoa)*BAL.ag.cx.portrait.k),w:{...BAL.ag.cx.portrait.w},l:{...BAL.ag.cx.portrait.l}});
 return A}
function deal(){
 const X=[];
 /* Tranh sủng / Chặn ngự giá are no deck cards any more: they exist ONLY in the card-flip choice at the end of tối (owner OD 16/11 22:45Z; jnf.js §2).
    PARKED (jnf.js nfParked (thin part-E, or a room with a seat off the palace: jnf roomOff); player rooms with both seats in the palace run the new night since ROOT-82): there the live night stays, so the two live cards stay there (live main code; loss = stealLose, one core) */
 {const v=typeof window.nfParked==="function"&&window.nfParked()&&S.tonight&&S.tonight!=="me"?S.tonight:null;
 if(v){X.push({n:"Tranh sủng",t:`Tối nay thẻ bài của ${v.name} được lật. Sai cung nữ giả cớ ngươi đau tim, mời Hoàng thượng sang.`,c:stealCost("feign"),o:oSteal(S),w:{},l:stealLose("feign"),b:B4L,x:stealX(v),go:()=>{log(stealWin(S,v,"feign"))}});
  X.push({n:"Chặn ngự giá",t:`Chờ ở hành lang ngự giá đi qua, múa một khúc dưới đèn lồng, mong ngài dừng bước.`,c:stealCost("road"),o:oSteal(S,"road"),w:{},l:stealLose("road"),b:B4L,x:stealX(v,1),go:()=>{log(stealWin(S,v,"road"))}})}}
 const ua=artActs();if(ua.length)X.push(pick(ua));
 const live=S.kids.filter(k=>k.alive);
 const ed=live.filter(k=>k.age>=3).sort((a,b)=>a.tal-b.tal);
 if(ed.length){const k=ed[0],g=4+Math.round(S.tai/20);X.push({n:`Dạy dỗ ${k.sex==="m"?"hoàng tử":"công chúa"}`,t:`Tự tay dạy ${k.name} chữ nghĩa, lễ nghi.`,c:{suc:-10},o:100,w:{},x:`Tài ${k.name} +${g}`,go:()=>{k.tal=cl(k.tal+g,0,100)}})}
 if(live.length){const k=live.slice().sort((a,b)=>a.fond-b.fond)[0];X.push({n:"Đưa con đến thỉnh an Hoàng thượng",t:`Dắt ${k.name} đến Dưỡng Hòa điện.`,c:{...BAL.ag.cx2.kidGreet.c},o:od(cx2O(S,"kidGreet")),w:{...BAL.ag.cx2.kidGreet.w},l:{},x:`Hoàng thượng thương ${k.name} +${BAL.ag.cx2.kidGreet.fond}`,go:()=>{k.fond=cl(k.fond+BAL.ag.cx2.kidGreet.fond,0,100)}})}
 const sick=live.filter(k=>k.hp<BAL.ag.cx2.kidHeal.hp).sort((a,b)=>a.hp-b.hp)[0];
 if(sick&&S.arts.y>=BAL.ag.cx2.kidHeal.y)X.push({n:"Chữa bệnh cho con",t:`${sick.name} đang yếu, ngươi tự bốc thuốc.`,c:{...BAL.ag.cx2.kidHeal.c},o:100,w:{},x:`Sức khỏe ${sick.name} +${BAL.ag.cx2.kidHeal.up}`,go:()=>{sick.hp=Math.min(100,sick.hp+BAL.ag.cx2.kidHeal.up)}});
 if(S.preg&&!S.fake)X.push(P3C.anthai(S));
 if(S.preg&&S.hidden&&S.preg<=3)X.push({n:"Báo tin có thai",t:"Đang giấu thai. Báo tin thì được sủng ái, nhưng kẻ ác cũng biết.",c:{},o:100,fix:1,w:{sung:BAL.tw.g.ann[0],th:BAL.tw.g.ann[1]},x:`kèm: mọi phi tần ghen +${ghenN(BAL.tw.g.ann[2])}, ai cũng biết ngươi mang thai`,go:()=>{S.hidden=false;ghenAll(BAL.tw.g.ann[2],"ngươi mang long thai")}});
 const s=STORY[S.origin.k];if(!S.st.done&&s.acts)X.push(...s.acts());
 X.push(...directActs());X.push(...illCards());
 X.forEach(a=>{if(!a.dom)a.dom=/Dạy dỗ|con đến|Chữa bệnh/.test(a.n)?"Con cái":/an thai|Báo tin/i.test(a.n)?"Sức khỏe":/Tranh sủng|Chặn ngự giá/.test(a.n)?"Sủng":/Thỉnh an|Hối lộ/.test(a.n)?"Giao thiệp":"Tài nghệ"});
 deck=S.out?coldActs().concat(illCards()):X.concat(pool().sort(()=>Math.random()-.5).slice(0,5));
}
/* place acts also offered directly as cards: same option object as at the place (talkOpts), run once by runOpt */
function directActs(){const A=[],mk=(p,i,n,t)=>{const a=talkOpts(p)[i];if(a)A.push(Object.assign({},a,{n,t}))};
 if(!S.thDead)mk({kind:"th"},0,"Thỉnh an Thái hậu","Sang Đức Thọ cung vấn an, chép kinh cho Thái hậu.");
 /* hotfix 11/15: the deck act is the "Thỉnh an" talk option (moves S.hh), not option 0 "Hỏi han sức khỏe" whose run() a deck act never calls */
 if(qOn())mk({kind:"hh",ref:rivals[0]},Math.max(0,talkOpts({kind:"hh",ref:rivals[0]}).findIndex(a=>a.n==="Thỉnh an")),"Thỉnh an Hoàng hậu",`Sang Càn Ninh cung vấn an Hoàng hậu ${rivals[0].name}.`);A.forEach(a=>{a.lock=false;a.b=0});
 mk({kind:"ksp"},0,"Hối lộ Kính sự phòng","Đút lót Tổng quản thái giám giữ thẻ bài.");
 return A}
/* review ag-all-2 r2 A5 (OD 17/11 ~17:10Z (1), bạc only on success): an option whose bạc buys a person carries it in w (paid when it lands);
   she must still hold it to try (canPay), and the card's BẠI row says a failure costs no bạc (payWinFail: j17/j19/j25 card lines) */
function payWinBac(a){return a&&a.w&&a.w.bac<0&&!(a.l&&a.l.bac)?-a.w.bac:0}
/* J3c: what a failure costs, as words: the stats in l + lx (failure words that are not a stat: route steps, home cards kcCard lf). ONE helper for the card (j19) and the option lines (j17 / j25) */
function failTxt(a){return [fmt(a&&a.l||{}),a&&typeof a.lx==="string"?a.lx:""].filter(Boolean).join(" · ")}
function payWinFail(a,l){return [l,payWinBac(a)?"không mất bạc":""].filter(Boolean).join(", ")}
function canPay(a){const c=a.c&&a.c.bac<0?a.c.bac:0;return !(c&&S.bac+c<0)&&!(payWinBac(a)&&S.bac+c<payWinBac(a))&&!a.lock}
function logReal(b){try{const K=typeof RKEYS!=="undefined"?RKEYS:Object.keys(NAMES).map(k=>[k,NAMES[k]]);const out=[];for(const [k,n] of K){if(!(k in b))continue;/* a key the snapshot did not take never shows as "0→N" */const x=b[k]||0,y=S[k]||0;if(x!==y)out.push(`<span class="${(y>x)!==(k==="ghen")?"g":"r"}">${n} ${x}→${y}</span>`)}return out.join(", ")}catch(e){return""}}
function snapReal(){const b={};/* RKEYS too: logReal lists Ân tình, which NAMES lacks ("Ân tình 0→N" on every act, log-sync) */for(const k of new Set(Object.keys(NAMES).concat(typeof RKEYS!=="undefined"?RKEYS.map(x=>x[0]):[])))b[k]=S[k]||0;return b}
function runOpt(a){if(!canPay(a))return null;window.__oddsSoft="";const capd=oddsCapped(a);if(capd&&!roll(BAL.odds.hi)){oddsSoft(a.n,a.c);return false}/* ODDS CAP: a formerly-sure act fails softly (j63 oddsSoft) */
  const o0=a.o==null?100:a.o,raw=(o0>=100?o0:oddsOf(a))+lotB(S,a.dom),/* oddsOf(a) = the odds the card shows (review/shown-odds-one-path optOdds) */o=o0>=100?(capd?BAL.odds.hi:100):oddsCl(raw);/* 2f3: one rule with NPC cards (jagacts3 p3Run): + lotB, cap BAL.odds */
  const st=a.inner&&a.oin!=null;/* a STAGED act (review/m-fix-3): its corner word is the whole road (a.oi); its FIRST step rolls here at a.oin */
  const ok=st?roll(oddsCl(+a.oin+lotB(S,a.dom))):(o0>=100||agTry(raw));if(!ok&&!st&&agSoft(raw)){oddsSoft(a.n,a.c);return false}/* raw odds at the cap = a sure act: the ONE soft fail (j63 oddsSoft, OD 17/11 ~17:35Z) */
  const b0=snapReal(),s0=S.logSeq||0;if(a.c)apply(a.c);
  apply(ok?(a.w||{}):(a.l||{}));
  {const d=typeof lsRest==="function"?lsRest(b0,lsLines((S.logSeq||0)-s0)):logReal(b0);log(`${a.n}${o<100||st?(ok?': <span class="g">thành</span>.':': <span class="r">hỏng</span>.'):"."}${d?" "+d+".":""}`)}
  if(ok){if(a.go)a.go()}else if(a.fail)a.fail();
  return ok}
function cardCost(a){return a.k||(a.c&&a.c.suc<=-20?4:a.c&&(a.c.suc||a.c.bac||a.c.duc)?2:1)}
/* K-GROUP-COST (RV-188 note a, laws 2/4): a door group card (jdoor DOOR.deck fold) carries its members' cost span: k = the cheapest usable way, kHi = the dearest way it lists;
   the card prints «1–4 khắc», never only the cheapest way while a dearer one sits inside */
function cardCostW(a){const k=cardCost(a);return a&&typeof a.kHi==="number"&&a.kHi>k?`${k}–${a.kHi}`:String(k)}
function act(i){const a=deck[i];if(!a||(a.b!=null&&(S.buoi||0)!==a.b)||!can(cardCost(a))||a.done||S.dead||Q.length||!canPay(a))return;a.done=1;spend(cardCost(a));runOpt(a);render()}

/* places */
function places(){const L=[
  {k:"vuon",n:"Ngự hoa viên",d:"Hoa nở bốn mùa. Xuân thu Hoàng thượng hay dạo bước.",sc:"vuon"},
  {k:"thu",n:"Cần Chính điện",d:"Nơi ngài phê tấu chương. Đến không được gọi dễ làm ngài phật ý.",sc:"thu"},
  {k:"dtd",n:"Dưỡng Hòa điện",d:`Tẩm điện của Hoàng thượng. Sủng dưới ${BAL.m95.dtdSung} thì thái giám không cho vào.`,sc:"dtd"},
  {k:"tn",n:"Đức Thọ cung",d:"Cung của Thái hậu, khói trầm quanh năm.",sc:"tn"}];
 if(qOn())L.push({k:"kn",n:"Càn Ninh cung",d:`Cung của Hoàng hậu ${rivals[0].name}.`,sc:"kn"});
 for(const v of rivals)if(v.alive&&!v.out&&!v.queen)L.push({k:"r"+v.id,n:`Cung ${v.name}`,d:`${RANKS[v.rank].n} ${v.name} ở đây.`,sc:"rv",v});
 L.push({k:"tyv",n:"Thái y viện",d:"Thuốc thang, thái y, bài thuốc bí truyền.",sc:"tyv"},{k:"ksp",n:"Kính sự phòng",d:"Nơi giữ thẻ bài các phi tần.",sc:"ksp"},{k:"lc",n:"Lãnh cung",d:"Nơi các phi tần thất thế sống lay lắt.",sc:"lc"});
 return L}
function placeOf(k){if(k==="home")return{k,n:"Tẩm cung của ngươi",d:"Cung nữ và các con ở đây.",sc:"home"};const f=places().find(p=>p.k===k);if(f)return f;if(k&&k[0]==="r"){let nm="";try{nm=typeof palName==="function"?palName(k):""}catch(e){}const v=RV(+k.slice(1));if(!nm||/ngươi/.test(nm))nm=v?`Cung của ${v.name}`:"Cung phi tần";return{k,n:nm,d:"",sc:"rv"}}return{k,n:"Tẩm cung của ngươi",d:"",sc:"home"}}
function rp(v){return{kind:"rival",ref:v,name:v.name,ini:v.name.split(" ").pop()[0],col:RCOL[v.queen?7:v.rank],info:`${v.queen?"Hoàng hậu":RANKS[v.rank].n} · ${trChip(v)} · Với ngươi: Thiện cảm ${aff(v,S)} · Oán ${oan(v,S)} · Ghen ${v.ghen}${sameHouse(S,v)?" · cùng cung":""}`}}
/* s31 stage-caption: ONE source of who is where = the j95 place record (S.roster.P); falls back to the old S.where only when the record is off */
function recAt(id,k){try{const R=S&&S.roster;if(R&&R.P&&R.P[id]&&typeof j95gate==="function"&&j95gate()&&!(window.COOPW&&COOPW.on)){const e=R.P[id][j95kh()];if(e)return e[0]===k}}catch(e){}return null}
function stageCapFix(V){/* the caption is written AFTER the people are reconciled: person claims follow V.people, never a stale goTo line */
 try{if(!V||!Array.isArray(V.people)||typeof V.msg!=="string")return;
  const c=V.cap;if(c&&c.emp&&c.cur&&V.msg.includes(c.cur)){const w=V.people.some(p=>p.kind==="emp")?c.emp[0]:c.emp[1];if(w!==c.cur){V.msg=V.msg.replace(c.cur,w);c.cur=w}}
  const n=V.people.filter(p=>p.kind!=="chest").length;const cnt=n?`Ở đây có ${n} người.`:"Không gặp ai.";
  if(/Ở đây có \d+ người\./.test(V.msg))V.msg=V.msg.replace(/Ở đây có \d+ người\./,cnt);else if(V.msg==="Không gặp ai."&&n)V.msg=cnt}catch(e){}}
function goTo(k){if(S.dead||Q.length||S.out)return;popIdx=null;popMsg="";
 if(k==="home"){if(S.place!=="home"&&!window.__walkFree){const th=travel(S.place,"home");if(!walkOk(th))return;spend(th)}S.place="home";S.visit={k,people:homePeople(),talked:false,tk:{}};render();return}
 const tc=travel(S.place,k);if(!walkOk(tc)||S.confined)return;const P=placeOf(k);spend(tc);S.place=k;const W=S.where||{};
 const ppl=[];let msg="";const emp={kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:`niên hiệu ${empEra()} · ${MOODS[S.emp.mood][0].toLowerCase()}`};
 const at=(id,w)=>{const r=recAt(id,k);return r==null?w===k:r};const here=liveRivals(true).filter(v=>at("v"+v.id,W[v.id]));const empHere=at("emp",W.emp);const cap={};
 if(k==="vuon"){if(empHere){ppl.push(emp);apply({sung:S.emp.mood<=1?3:1});msg="Ngươi tình cờ gặp Hoàng thượng đang dạo bước. Ngài dừng lại nhìn ngươi.";cap.emp=[msg,"Hoa nở rộ. Hoàng thượng không ra vườn hôm nay."]}else{msg="Hoa nở rộ. Hoàng thượng không ra vườn hôm nay.";cap.emp=["Ngươi tình cờ gặp Hoàng thượng đang dạo bước. Ngài dừng lại nhìn ngươi.",msg]}}
 if(k==="thu"){if(empHere){/* W10 (LAW 11, residual c): she holds a pass for this place (accGrant: an act card walked her here, or a summons) → not turned away; the act card already settled what happened (Múa trong yến tiệc lost Sủng −3 that its card never showed) */if(S.sung<40&&!(typeof accHas==="function"&&accHas(S,k))&&!roll(od(BAL.odb.j2.odGoTo+S.sung+mm()))){apply({sung:-3});S.visit={k,people:[emp],talked:true,tk:{},msg:"Hoàng thượng cau mày: “Trẫm đang bận việc nước.” Ngươi phải lui ra."};log("Đến Cần Chính điện, bị đuổi về.");render();return}
   ppl.push(emp);msg="Hoàng thượng đang phê tấu chương, ngẩng lên nhìn ngươi.";cap.emp=[msg,"Ngài không có ở thư phòng."]}else{msg="Ngài không có ở thư phòng.";cap.emp=["Hoàng thượng đang phê tấu chương, ngẩng lên nhìn ngươi.",msg]}}
 if(k==="dtd"){if(S.sung<BAL.m95.dtdSung)msg=kSay({srv:"m"},S,"Thái giám chặn cửa: “Không có khẩu dụ, {goi} xin hồi cung.”")+(empHere?" Hoàng thượng ở bên trong, ngươi không được gặp.":"");else if(empHere){ppl.push(emp);msg="Hoàng thượng đang nghỉ, cho ngươi vào hầu.";cap.emp=[msg,"Hoàng thượng không có ở điện."]}else{msg="Hoàng thượng không có ở điện.";cap.emp=["Hoàng thượng đang nghỉ, cho ngươi vào hầu.",msg]}}
 if(k==="tn"){if(S.thDead)msg="Đức Thọ cung vắng lặng từ ngày Thái hậu băng hà.";else ppl.push({kind:"th",name:"Thái hậu",ini:"Từ",col:"#c9a0e0",info:`Thái hậu · lòng ${S.th}`})}
 for(const v of here){if(v.ill)v.ill.known=true;if(v.queen&&qOn())ppl.push({...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"Phượng"});else ppl.push(rp(v))}
 if(P.v&&!here.includes(P.v)&&P.v.alive&&!P.v.out){ppl.push({kind:"chest",ref:P.v,name:`Rương của ${P.v.name}`,ini:"Rương",col:"#8a6a4a",info:"Chủ nhân đi vắng"});msg=`${P.v.name} không có ở cung.`}
 if(k==="tyv")ppl.push({kind:"ty",name:(S.court&&S.court.ty&&S.court.ty.name)||"Thái y Trương",ini:"Y",col:"#8fc38a",info:"Thái y viện"});
 if(k==="ksp")ppl.push({kind:"ksp",name:(S.court&&S.court.ksp&&S.court.ksp.name)||"Tổng quản",ini:"Hoạn",col:"#b9a48a",info:"Giữ thẻ bài các phi tần"});
 /* D4 (owner OD:L641): Phế phi họ Tần STAYS beside fallen rivals until she dies; then the post is empty until a real person arrives */
 if(k==="lc")lcPeople("Phế phi").forEach(x=>ppl.push(x));
 if(!msg){msg=ppl.length?`Ở đây có ${ppl.length} người.`:"Không gặp ai.";cap.cnt=1}
 if(cap.emp)cap.cur=msg;S.visit={k,people:ppl,talked:false,tk:{},msg,cap};log(`Đến ${P.n}.`);render()}
function curPeople(){return S.visit?S.visit.people:[]}

function talkOpts(p){const E=S.emp,K=E.known,L=E.likes,b=bestArt(),v=p.ref;
 if(p.kind==="emp"){const A=[
   {n:"Tâng bốc",o:od(cx2O(S,"flat")),w:{...BAL.ag.cx2.flat.w},l:{...BAL.ag.cx2.flat.l},go:()=>{if(roll(BAL.ag.cx2.flat.disc))discover()}},
   {n:"Nói thật lòng",o:od(cx2O(S,"true")),w:{...BAL.ag.cx2.true.w},l:{...BAL.ag.cx2.true.l},x:`biết thêm một điều ngài thích hay không ưa: ${chanceW(BAL.ag.cx2.true.disc)}`,go:()=>{if(roll(BAL.ag.cx2.true.disc))discover()}},
   {n:`Phô tài: ${b.n}`,c:{...BAL.ag.cx2.show.c},o:od(cx2O(S,"show")),w:{sung:BAL.ag.cx2.show.w.sung+b.l,danh:BAL.ag.cx2.show.w.danh},l:{...BAL.ag.cx2.show.l}},
   {n:K.flower?`Dâng ${L.flower}`:"Dâng một cành hoa",c:{bac:-BAL.deck.qf.bac},o:K.flower?100:od(BAL.deck.qf.o),w:{sung:K.flower?BAL.deck.qf.wKnown:BAL.deck.qf.w},l:{}}];
  if(S.sung>=BAL.ag.cx2.favor.min)A.push({n:"Xin ân điển",o:od(cx2O(S,"favor")),w:{...BAL.ag.cx2.favor.w},l:{...BAL.ag.cx2.favor.l},fail:()=>{if(E.mood===3&&roll(BAL.ag.cx2.favor.angry))punish("làm phiền lúc thánh thượng nổi giận",0/* NHẸ: sếp OD 26/11 ~05:55Z · review/home-way */)}});
  if(has("chamchinh"))A.push({n:"Bàn chuyện triều chính",o:od(cx2O(S,"court")),w:{...BAL.ag.cx2.court.w},l:{...BAL.ag.cx2.court.l}});
  return A}
 if(p.kind==="th"){if(false)return[{n:"Xin xăm ở Phật đường",o:100,fix:1,x:"rút hai quẻ, giữ quẻ tốt hơn",run:()=>{reLot(true);return "Ngươi thắp hương, xin một quẻ mới."}},];const t=liveRivals(false).filter(x=>x.ev>0).sort((a,c)=>c.ev-a.ev)[0];return[
   {n:"Thỉnh an, chép kinh",lock:(S.buoi||0)!==0,t:"chỉ buổi sáng",c:{suc:-5},o:od(BAL.odb.j2.odO_6),w:{th:8,danh:2,duc:1},l:{th:-2}},
   {n:"Xin Thái hậu đỡ lời",o:od(BAL.ag.cx.thHelp.o+S.th/BAL.ag.cx.thHelp.div),lock:S.th<BAL.ag.cx.thHelp.min,t:`cần Thái hậu ${BAL.ag.cx.thHelp.min}`,w:{...BAL.ag.cx.thHelp.w},x:"Hoàng hậu nể mặt",l:{...BAL.ag.cx.thHelp.l}},
   P3C.tell(S,t)]}
 if(p.kind==="hh"){return topicOpts(v).filter(a=>["Hỏi han sức khỏe","Tạ lỗi","Nhún nhường","Hậu lễ tạ tội","Nhờ người đứng giữa","Chia sẻ bí mật","Nhờ giúp đỡ"].includes(a.n)).concat([
   {n:"Thỉnh an",lock:(S.buoi||0)!==0,t:"chỉ buổi sáng",c:{suc:-5},o:od(BAL.odb.j2.odO_19),w:{hh:4,danh:2,duc:1},l:{hh:-3},go:()=>{v.ghen=cl(v.ghen-5,0,100)}},
   {n:"Xin Hoàng hậu che chở",lock:S.hh<BAL.ag.cx.hhShield.min,t:`cần Hoàng hậu ${BAL.ag.cx.hhShield.min}`,o:od(BAL.ag.cx.hhShield.o+S.hh/BAL.ag.cx.hhShield.div),w:{...BAL.ag.cx.hhShield.w},x:`${BAL.ag.cx.hhShield.sh} tháng phi tần khó hại ngươi`,l:{...BAL.ag.cx.hhShield.l},go:()=>S.shield=BAL.ag.cx.hhShield.sh},
   {n:"Khiêu khích",lock:typeof mockOK==="function"&&!mockOK(S,v)/* rank respect, two-way (law 1): she does not openly mock a higher rank either (RV-NEWS-SIEVE-2) */,t:"phận dưới không dám khiêu khích bậc trên",tw:"provoke",o:100,w:{danh:2,hh:-15},x:`Hoàng hậu ghen +15, ${pvOan(v,BAL.eff.j2.go,"oán ngươi")}`,go:()=>{ghenUp(v,15,"bị ngươi khiêu khích",S);oanAdd(v,S,BAL.eff.j2.go)}}])}
 if(p.kind==="rival"){const A=topicOpts(v);
  if(!sameHouse(S,v)){/* E-GAIN3c law 3: the hub way says what opening it gets her = the regard the best gift in her chest gives (giftVal, the same number the pick rows show, j25); an empty chest opens nothing → locked with its reason */const gv=(()=>{let m=0;try{for(const e of S.inv||[])if(e&&!e.h){const g=giftRel(Object.assign({k:e.k},IT[e.k]),v);if(g>m)m=g}/* E-GAIN3-LIVE (E-GAIN3c-RV 2): the gift rows' own number (j8 giftRel = giveTo) */}catch(e){}return m})();
   A.push(Object.assign({n:"Tặng quà",o:100,x:gv>0?`chọn món trong rương · nàng quý ngươi ${affSg(v,S,gv)} (món quý nhất)`:"chọn món trong rương",open:()=>{if(S.inv.some(e=>!e.h))pushDil(mkP("giftpick",{v:v.id}),"Tặng quà")}},S.inv.some(e=>!e.h)?{}:{lock:true,t:"rương trống"}));
   const PK=BAL.talk.provoke;A.push({n:"Khiêu khích",lock:typeof mockOK==="function"&&!mockOK(S,v)/* rank respect, two-way (law 1) */,t:"phận dưới không dám khiêu khích bậc trên",tw:"provoke",o:100,w:{danh:PK.danh},x:`nàng quý ngươi ${affSg(v,S,-PK.rel)}, ${pvOan(v,PK.rel*BAL.relOan.hurt,"oán ngươi")}, ghen +${PK.ghen}`,go:()=>{relAdd(S,v,-PK.rel);ghenUp(v,PK.ghen,"bị ngươi khiêu khích",S)}});
   if(v.pg>=BAL.ag.cx2.vent.pg)A.push({n:"Trút giận",tw:"vent",o:100,w:{...BAL.ag.cx2.vent.c},x:"hả cơn ghen; nàng oán",go:()=>{v.pg=0;relAdd(S,v,-BAL.ag.cx2.vent.rel)}});
   A.push(...placeHarms(v,S.place));if(liveRivals(true).filter(x=>whereOf(x)===S.place).length>=2)A.push({n:"Nghe lén câu chuyện",o:od(BAL.ag.wit.hear+eyes(S)*BAL.ag.wit.mat),x:evSg(BAL.eff.j9.evOverhear),run:()=>overhear(S.place)})}
  return A}
 if(p.kind==="chest"){if(sameHouse(S,v))return[];return[{n:"Cài đồ vào rương nàng",o:oddsCl(actOdds(S,v,"plant",{pen:-BAL.actHere.plant,here:1})),x:"chọn món đồ · tại chỗ, dễ hơn sai người",open:()=>{if(S.inv.some(e=>!e.h)&&can(2))pushDil(mkP("plantpick",{v:v.id,here:1}),"Cài đồ vào rương")}},
  {n:"Lục rương tìm chứng cứ",o:od(cx2O(S,"chest")),act:1,x:`${evSg(BAL.ag.ev.one)} nếu nàng có làm điều sai · lộ: bị phạt`,run:()=>{if(roll(od(cx2O(S,"chest")))){return chSearch(S,null,()=>evA(S,v,BAL.ag.ev.one))?`Lục được thư từ của ${v.name}: ${evSg(BAL.ag.ev.one)}.`:chMissed()?`Lục rương ${v.name}: ${chMissTxt(v)}`:`Lục rương ${v.name}: không thấy điều gì sai trái.`}relAdd(S,v,-BAL.ag.cx2.chest.rel);punish("lục lọi cung phi tần",1);return "Bị cung nhân bắt gặp."}}]}
 if(p.kind==="ty"){const A=[];if(illOf(S))A.push(P3C.treat(S));A.push({n:"Bài thuốc dễ thụ thai",c:{...BAL.ag.cx2.fert.c},o:100,x:`${BAL.ag.cx2.fert.m} tháng dễ có thai hơn`,go:()=>S.fert=BAL.ag.cx2.fert.m});
  if(!S.doctor)A.push({n:"Mời làm thái y tâm phúc",c:{...BAL.ag.cx2.doctor.c},o:100,x:"dễ phát hiện xạ hương và độc; bệnh của con nhẹ hơn",go:()=>S.doctor=1});
  const k=S.kids.filter(x=>x.alive&&x.hp<BAL.ag.cx2.kidMed.hp).sort((a,c)=>a.hp-c.hp)[0];if(k)A.push({n:`Xin thuốc cho ${k.name}`,c:{...BAL.ag.cx2.kidMed.c},o:100,x:`Sức khỏe +${BAL.ag.cx2.kidMed.up}`,go:()=>{k.hp=Math.min(100,k.hp+BAL.ag.cx2.kidMed.up)}});
  A.push({n:"Học hỏi y lý",c:{bac:-10},o:100,x:"Y thuật tiến bộ một phần",go:()=>addArt("y",1)});return A}
 if(p.kind==="ksp"){const A=[{n:"Đút lót lật thẻ",c:{bac:-30},o:100,inner:1,lock:S.tablet>0,t:`đang có hiệu lực ${S.tablet} tuần`,x:`2 tuần tới dễ được lật thẻ: ${chanceW(nightCh())} → dễ hơn một bậc`,go:()=>S.tablet=2}];
  if(Object.keys(LIKES).some(k=>!K[k])||(typeof disUnk==="function"&&disUnk("emp"))||(typeof eaOpen==="function"&&eaOpen(S)))A.push({n:"Hỏi sở thích Hoàng thượng",c:{...BAL.ag.cx2.likes.c},o:od(BAL.ag.cx2.likes.o),x:"biết thêm một điều ngài thích hay không ưa",go:()=>discover()});
  A.push({n:"Xem sổ thị tẩm",o:100,fix:1,x:"biết ai đang được sủng",go:()=>log("Sổ thị tẩm: "+kitNameList(liveRivals(true),x=>`${x.name} ${x.nights} lần`)+`; ngươi ${S.nights} lần.`)});return A}
 if(p.kind==="peddler")return S.shop.slice(0,6).map(k=>({n:`Mua ${itm(k).n}`,c:{bac:-itm(k).pr},o:100,fix:1,x:itm(k).d,go:()=>invAdd(S,{k})}));
 if(p.kind==="fallen")return[
   {n:"Đưa cơm áo",c:{bac:-20},o:100,w:{duc:4}},
   {n:"Hỏi chuyện cũ",o:od(cx2O(S,"old")),x:`${evSg(BAL.ag.ev.one)} về một phi tần từng làm điều sai`,go:()=>{const x=evGuilty(S,liveRivals(true));if(x&&chSearch(S,null,()=>evA(S,x,BAL.ag.ev.one)))log(`Phế phi kể chuyện xấu của ${x.name}: ${evSg(BAL.ag.ev.one)}.`);else if(x&&chMissed())log(`Phế phi kể chuyện cũ của ${x.name}. ${chMissTxt(x)}`);else log("Phế phi chỉ kể chuyện cũ vô hại, không có gì làm chứng cứ.")}}];
 if(p.kind==="maid")return[
   {n:"Tâm sự",o:100,w:{...BAL.ag.cx2.maidTalk.w}},
   {n:"Sai đi dò la",o:od(cx2O(S,"maidSpy")),w:{},l:{...BAL.ag.cx2.maidSpy.l},x:`${evSg(BAL.ag.ev.one)} về một phi tần từng làm điều sai`,go:()=>{const x=evGuilty(S,liveRivals(true));if(x&&chSearch(S,S.maid,()=>evA(S,x,BAL.ag.ev.one)))log(`${S.maid.name} nghe lén được chuyện của ${x.name}: ${evSg(BAL.ag.ev.one)}.`);else if(x&&chMissed())log(`${S.maid.name} nghe lén ${x.name}. ${chMissTxt(x)}`);else{const y=pick(liveRivals(true));log(y?`${S.maid.name} nghe lén ${y.name}: không có gì sai trái, chỉ biết ${harmTxt(y)}.`:`${S.maid.name} không nghe được gì.`)}}}];
 return []}
/* khắc of a talk option (ONE rule for its card line and its pay): a parallel-time order (a.pk, jptime BAL.ptime) costs only the order */
function talkK(a){try{if(a&&a.pk&&typeof ptOn==="function"&&ptOn())return ptRow(a.pk).o}catch(e){}return a&&a.act?BAL.time.cost.talkAct:BAL.time.cost.talk}
function talk(oi){if(popIdx==null||!S.visit||S.visit.talked===true||S.dead||Q.length)return;S.visit.tk=S.visit.tk||{};if(S.visit.tk[popIdx])return;const p=curPeople()[popIdx];if(!p)return;const a=talkOpts(p)[oi];if(!a||!canPay(a))return;
 const tcost=talkK(a);if(!can(tcost))return;spend(tcost);
 if(a.run){S.visit.tk[popIdx]=1;if(oddsCapped(a)&&!roll(BAL.odds.hi)){popMsg=`${a.n}: ${oddsSoft(a.n,a.c)}`;render();return}/* ODDS CAP soft fail */if(a.c)apply(a.c);popMsg=fzRun(a.o,typeof a.k==="string"?a.k:null,()=>a.run())||"";/* a.o was read before the spend: the act rolls the odds on the card (j9 fzRun) */if(popMsg)log(`${a.n}: ${popMsg}`);render();return}
 if(a.open){a.open();render();return}
 S.visit.tk[popIdx]=1;const s0=S.logSeq||0;const ok=runOpt(a);
 /* two forms from one line (jvoice kGL / kLitLog): the Sổ ghi line and this card note carry the literary sentence, the result card only the facts */
 let lit="";try{lit=kLitLog(s0,kOutcome(p.kind,ok,p))}catch(e){}
 popMsg=ok===false&&window.__oddsSoft?`${a.n}: ${window.__oddsSoft}`:`${a.n}: ${ok?'<span class="g">thành</span>':'<span class="r">hỏng</span>'}. ${lit?kGL("",lit):""}${fmt(ok?a.w:a.l)}`;render()}

/* arts */
function addArt(k,g){const a=ARTS.find(x=>x.k===k);if(!a)return;crsPush(S.arts,S.artp,k,g,l=>{const f={[a.st]:BAL.art.stUp};if(BAL.art.danh[l])f.danh=BAL.art.danh[l];apply(f);
   log(`<span class="g">${a.n} lên bậc ${l} · ${artNm(l)}.</span> ${fmt(f)}${l===3?` ${typeof placeW==="function"&&placeW("fame3")||"Cả cung nghe danh."}`:l===5?" Tiếng tăm vang khắp kinh thành.":""}`)})}
function lesson(k){const l=S.arts[k],cost=typeof tchFee==="function"?tchFee(k):artFee(l);if(!can(2)||artPts(S,k)>=100||S.bac<cost||S.dead||Q.length||S.mg)return;const open=()=>{render();S.mg={k,l};save();resumeMG()};/* KIT §13.9: charge on «Sẵn sàng» */
  const pay={suc:-BAL.artLes.tch,bac:-cost};/* one typed Sức cost for both paths (one-core: no second copy) */if(typeof kgDefer==="function")kgDefer({...pay,khac:2},open);else{apply(pay);spend(2);open()}}
function resumeMG(){const m=S.mg;if(!m)return;const a=ARTS.find(x=>x.k===m.k);openMG(m.k,m.l,g=>{S.mg=null;log(`Học ${a.n}. Tiến bộ +${g}.`);addArt(m.k,g);render()})}
function hireMaster(){if(S.bac<BAL.bacFee.master||S.master||S.dead)return;apply({bac:-BAL.bacFee.master});S.master=3;log("Mời danh sư vào cung dạy: 3 tháng tiến bộ gấp đôi.");render()}

/* what a won night is worth, in numbers: a full thị tẩm (Sủng, Ân tình, a chance of a child and of a gift); the cost to the rival on a red 'kèm' line */
function stealX(v,road){let c=0;try{c=conceiveCh(S)}catch(e){}const M=BAL.steal.m[road?"road":"feign"];const w=M&&M.win&&Object.keys(M.win).length?` · ${fmt(M.win)}`:"";return `${sgRange(nightG(0),nightG(10))} · Ân tình +${nightA(0)} đến +${nightA(5)}${w}${S.preg?"":` · thai: ${chanceW(c)}`} · có thể được thưởng · kèm: ${stealKem(v,road?"road":"feign")}`}
function stealKem(v,mode){const B=BAL.steal,M=(B.m&&B.m[mode==="road"?"road":"feign"])||{};const rel=M.rel==null?B.rel:M.rel,gh=M.ghen==null?B.ghen:M.ghen;const h=BAL.relOan.hurt;let o=Math.round(rel*h);try{o=Math.round(rel*h*persF(v,"slight",1))}catch(e){}return `${v.name} ghen +${gh}, quý ngươi -${rel}, ${pvOan(v,rel*h,"oán ngươi")}${M.hh?`, Hoàng hậu quý ngươi -${M.hh}`:""}`}
/* save-unseen-lists (review r2 of save-year-rollback, item 4; same family as j6 «Tiếp tục» / j42 srvInit): start() sets quiet=true while it builds the
   life and false at its end; a throw in any step between left quiet on = no save for the whole life. quiet is always released when start returns. */
{const s0=start;start=function(){try{return s0.apply(this,arguments)}finally{quiet=false}}}
