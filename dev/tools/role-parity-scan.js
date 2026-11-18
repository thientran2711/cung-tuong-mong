/* ROLE PARITY SCAN (owner OD 18/11 ~21:30Z; law 1 two-way + law 4 one core) — role × act × {player, NPC}, built from the LIVE game.
   Roles: maid (cung nữ) · t1…t7 (phi tần ranks Đáp ứng … Hoàng quý phi = rank 0…6) · hh (Hoàng hậu seat, rank 7) · up (a maid just promoted to
   consort: the player's srvRise and an NPC maid's amRise — both must hold EXACTLY the t1 act set).
   NPC side: the live registries — every AGREG provider of the person's group (agGrp: consort / hh / maid) called on a rich NPC of that role over many
   draws (keys o.k), plus the shared gates TW[k].req / ACT[k].ok(a,t) / hh acts over every target.
   Player side: the live builders — Hành sự deck (deal + pool + artActs + directActs + illCards), talkOpts of every person at every place (goTo),
   topicOpts + rvCard of every consort, Kẻ hầu / phe / Tài nghệ tabs (consort life); srvCards + srvTalk + srvStaffHTML (maid life).
   Labels → keys through the game's own label tables (TW.n, ACT.n, AGC2BTN, AGC3BTN) + the small KEYLAB table below (keys whose button text lives
   inside a builder). A row's verdict per role: SAME (both sides, ONE function) · NUM (both sides, same BAL row, two code paths) · P-ONLY / N-ONLY
   (a gap) · EXEMPT (documented, EXEMPT table) · — (neither side holds it in that role).
   usage: node dev/tools/role-parity-scan.js [dev/index.html] [--md out.md] [--json out.json]   → prints the table; exit 0
   module: require('./role-parity-scan.js').scan(htmlPath) → {roles, rows, gaps}                                                                       */
const path=require('path');
/* keys whose player button text is not in a label table (from the AG-ALL-2 parity table, dev/handover/reports/ag-all-parity.md) */
const KEYLAB={
 "effort":["Kinh hồng vũ","Đàn khúc Phượng cầu hoàng","Đánh cờ với Hoàng thượng","Dâng một cành hoa","Dâng "],
 "cx:face":["Dưỡng nhan"],"cx:arts":["Luyện cầm kỳ thi họa"],"cx:book":["Đọc binh thư, sử sách"],"cx:alms":["Phát chẩn cho cung nhân"],"cx:sutra":["Tụng kinh, làm việc thiện"],
 "cx:maidR":["Thưởng cung nữ"],"cx:rest":["Nghỉ ngơi dưỡng sức"],"cx:study":["Tự học","Học với thầy","Luyện "],"cx:thHelp":["Xin Thái hậu đỡ lời"],"cx:hhShield":["Xin Hoàng hậu che chở"],
 "cx:buy":["Xem hàng Nội vụ phủ","Mua ","Nhờ thái giám mua đồ","Để ta xem"],"cx:ally":["Kết giao"],"cx:portrait":["Vẽ chân dung tặng Thái hậu"],"cx:humble":["Nhún nhường"],"cx:tqGift":["Biếu"],
 "hh:judge":["Xử tội"],"hh:conf":["Tịch thu trang sức (có cớ)","Tịch thu vô cớ"],"hh:reward":["Ban thưởng"],"hh:pardon":["Ân xá"],"hh:cutpay":["Khất bổng lộc"],
 "maid:sweep":["Quét sân, lau điện","Đốc thúc cung nữ quét dọn"],"maid:tea":["Dâng trà, hầu điểm tâm"],"maid:follow":["Theo hầu chủ"],"maid:nvp":["Lĩnh đồ ở Nội vụ phủ"],
 "maid:rite":["Học lễ nghi với cô cô"],"maid:study":["Luyện thêu thùa, chữ nghĩa"],"maid:groom":["Chải chuốt, giữ nhan sắc"],"maid:rest":["Nghỉ lấy sức"],"maid:embro":["Thêu khăn bán ra ngoài"],
 "maid:med":["Mua thuốc bổ"],"maid:books":["Quản sổ sách trong cung"],"maid:spy":["Lén báo tin cho"],"maid:massage":["Đấm lưng, hầu chuyện"],"maid:askRew":["Xin chủ ban thưởng"],
 "maid:tellMis":["Bẩm tin dò được"],"maid:askRec":["Xin chủ tiến cử lên Nội vụ phủ"],"maid:leave":["Xin chủ cho đi hầu cung khác"],"maid:beside":["Hầu bên cạnh chủ"],
 "maid:empTea":["Quỳ dâng trà"],"maid:greet":["Hành lễ thỉnh an"],"maid:betray":["Mật báo chuyện của"],"maid:accuse":["Tố cáo"],"maid:chat":["Trò chuyện"],"maid:gift":["Biếu quà nhỏ","Biếu quà"],
 "maid:ask":["Nhờ dò tin"],"maid:frame":["Tố lỗi với chủ"],"maid:poison":["Bỏ độc vào bát cơm"],"maid:tonic":["Xin thuốc bổ"],"maid:learn":["Học lỏm nghề thuốc"],"maid:hail":["Chào hỏi đúng lễ"],
 "maid:flirt":["Liếc mắt đưa tình"],"maid:token":["Trao khăn tay, thư"],"maid:tryst":["Hẹn gặp riêng"],"maid:vow":["Hẹn ước trăm năm"],"maid:cut":["Cắt đứt"],"maid:pil":["Lén giữ đồ Nội vụ phủ phát"],
 "maid:listen":["Việc chủ sai","Làm xong","Nghe ngóng cho chủ"],"maid:scout":["Việc chủ sai","Làm xong"],"maid:watch":["Việc chủ sai","Làm xong","Canh chừng cung chủ"],"maid:errand":["Việc chủ sai","Làm xong"],
 "ksp":["Hối lộ Kính sự phòng","Đút lót lật thẻ"],"cx2:maidSpy":["Sai cung nữ đi dò la","Sai đi dò la"],"cx3:qin":["Đánh đàn ở ngự hoa viên","Đánh đàn chờ ngự giá"],"cx3:def_canh":["Giao việc phòng bị","Phòng bị"],
 "cx3:def_thudoc":["Giao việc phòng bị","Phòng bị"],"cx3:def_theodoi":["Giao việc phòng bị","Phòng bị"],"cx3:def_giuchung":["Giao việc phòng bị","Phòng bị"],"check":["Kiểm tra đồ","Soát quà được tặng"],
 "cx3:work":["Tự học, làm tác phẩm","Tự học"],"cx3:anthai":["Tự bào chế thuốc an thai","An thai"],"cx2:kidGreet":["Dẫn đi thỉnh an Hoàng thượng","Đưa con đến thỉnh an Hoàng thượng"],
 "cx2:kidHeal":["Tự bốc thuốc cho con","Chữa bệnh cho con"],"cx3:charity":["Đưa cơm áo","Phát bạc cứu giúp cung nhân nghèo"],"cx3:facFound":["Lập phe cùng"],"cx3:tyGift":["Biếu"]};
/* function class of a key (from the AG-ALL-2 parity table, after part 5): SAME = both sides call ONE function; NUM = same BAL row, two code paths */
const SAMEPFX=["harm:","cx3:","hh:"];const SAMEK=new Set(["help","apol","visit","mediate","humil","test","drop","follow","gossip","flaunt","admon","warn","provoke","check","cx:buy","cx:gift","cx:ally",
 "cx2:bribeSrv","cx2:plantSrv","cx2:help","cx2:maidTalk","cx2:maidSpy","cx:study","maid:leave","maid:empTea","maid:poison","maid:follow","maid:cut","maid:listen","maid:scout","maid:watch","maid:pil"]);
const fnClass=k=>SAMEK.has(k)||SAMEPFX.some(p=>k.startsWith(p))||/^[a-z]+$/.test(k)&&!/^effort$/.test(k)?"SAME":"NUM";
/* documented exemptions (role, key or label, reason) — information-only buttons or a side with no state for it (ag-all-parity.md exemption lists) */
const EXEMPT=require('./role-parity-exempt.json');
const ALIAS={"harm:ally":"cx:ally","harm:gift":"cx:gift"};
const CON=["t1","t2","t3","t4","t5","t6","t7"];const ROLES=["maid","t1","t2","t3","t4","t5","t6","t7","hh","up"];
const ROLE_N={maid:"cung nữ",t1:"Đáp ứng",t2:"Thường tại",t3:"Quý nhân",t4:"Tần",t5:"Phi",t6:"Quý phi",t7:"Hoàng quý phi",hh:"Hoàng hậu",up:"cung nữ → phi tần"};

/* ---------------- in-page probes ---------------- */
function inPage(arg){const {phase,TRIES}=arg;const res={P:{},N:{},err:[],cov:{}};
 /* one seeded dice for both sides: each probe starts from the same seed, so a random pick never makes a one-sided row */
 const R0=Math.random;let seed=1;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};const SEED=n=>{seed=n||1;Math.random=rnd};
 const E=(w,e)=>{if(res.err.length<30)res.err.push(w+": "+(e&&e.message||e))};
 const RKN=(typeof RANKS!=="undefined"?RANKS.map(x=>x.n):[]).sort((a,b)=>b.length-a.length);
 const addP=(role,n,src)=>{if(!n)return;n=String(n).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();for(const r of RKN)if(n.startsWith(r)&&n.length>r.length&&n[r.length]!==" "){n=n.slice(r.length);break}if(!n)return;const R=res.P[role]=res.P[role]||{};(R[n]=R[n]||{})[src]=1};
 const addN=(role,k,src)=>{if(!k)return;const R=res.N[role]=res.N[role]||{};(R[k]=R[k]||{})[src]=1};
 const SKIPA=/data-(tab|pg|pv|sub|close|x|kinvpane|ksub|mode|rail|lay|kitsample|kitx|maplist|v85tab|cl|coop|sl|new|kt53)=/;
 const lab=h=>{const L=[];const re=/<button([^>]*)>([\s\S]*?)(<small|<\/button>)/g;let m;while((m=re.exec(h)))if(!/\bdisabled\b/.test(m[1])&&/data-[a-z0-9]+=/.test(m[1])&&!SKIPA.test(m[1]))L.push(m[2]);return L};
 const g0=p=>{try{return agGrp(p)}catch(e){return""}};
 const others=a=>[S].concat(liveRivals(true)).filter(x=>x&&x!==a&&!x.out&&x.alive!==false);
 /* SYMMETRIC WORLDS: the same mutation is applied to the doer whichever side she is (S or an NPC), so a state-gated act is open to both or neither */
 const richK=a=>{if(a===S){S.kh=0;try{used=0}catch(e){}}};
 const rich=a=>{Object.assign(a,{bac:5000,suc:100,danh:90,duc:90,tamco:80,sung:60,th:70,hh:60,tai:80,sac:80});a.arts=a.arts||{};for(const k of ["cam","ky","thi","hoa","vu","y"])a.arts[k]=Math.max(a.arts[k]||0,80);
  if(a.st&&typeof a.st==="object")Object.assign(a.st,{bac:5000,suc:100,danh:90,duc:90,tamco:80});a.fakeIll=0;a.pray=0;a.fert=0;a.tablet=0;a.confined=0;if(a===S){S.kh=0;try{used=0}catch(e){}}};
 const VAR=[
  ["base",a=>{}],
  ["tired",a=>{a.suc=20;a.bac=30;if(a.st&&typeof a.st==="object")Object.assign(a.st,{suc:20,bac:30})}],
  ["social",a=>{for(const t of others(a)){try{oanAdd(t,a,40);affAdd(a,t,50);relAdd(a,t,40);if(t!==S){t.suc=30;t.sung=15}}catch(e){}}}],
  ["proof",a=>{for(const t of others(a)){try{if(typeof evA==="function")evA(a,t,3,"scan");else t.ev=3}catch(e){}}}],
  ["body",a=>{a.preg=2;a.hidden=true;a.fake=0;a.pregWk=wk();try{const k={name:"Tiểu Bảo",sex:"m",age:5,hp:30,tal:20,fond:20,alive:true};a.kids=(a.kids||[]).concat([k])}catch(e){}}],
  ["chest",a=>{a.inv=a.inv||[];try{for(const k of Object.keys(IT).slice(0,6))a.inv.push({k})}catch(e){}}],
  ["rival-down",a=>{for(const t of others(a))if(t!==S){t.confined=2}}],
  /* part 2: her rouge boxes ran out (jration): both doers miss every part, so the borrow / beg / steal roads open for her and for an NPC */
  ["rouge",a=>{try{for(const part of BAL.ration.parts)for(const e of lxBoxes(a,part))a.inv.splice(a.inv.indexOf(e),1)}catch(e){}}],
  /* part 2: a neglected consort (Sủng low) with the palace men out at the garden this buổi (j22 / jmen S.menW): her talk with them, an NPC's road to them */
  ["men",a=>{try{menInit();S.menW=S.menW||{};for(const m of S.men||[])if(m.alive)S.menW[m.id]="vuon";a.sung=20}catch(e){}}],
  /* part 2: a malicious consort (malice, the NPC's character gate of the Đồ cấm road) who hates someone */
  ["malice",a=>{a.malice=80;for(const t of others(a)){try{oanAdd(a,t,60)}catch(e){}}}],
  /* part 2: the doer has SEEN everyone's dress and phẩm (same buổi, same place: jdress dressLook + j92 wdSee), as the player's walk through
     the places gives her — so «Tố xa xỉ» / «Hặc ăn mặc sai phẩm» are probed for an NPC doer too (were P-ONLY by probe only) */
  ["seen",a=>{for(const t of others(a)){try{if(typeof luxOf==="function"){const x=luxOf(t);if(x&&x.sc<=x.bud&&t.inv){const L=t.inv.filter(e=>e&&IT[e.k]&&itm(e.k).pr>0);if(L[0])t.wear=Object.assign(t.wear||{},{tram:L[0]})}}
    if(typeof dressLook==="function")dressLook(a,t,"cùng chỗ");if(typeof wdSee==="function"&&typeof wdStatus==="function"){const st=wdStatus(t);wdSee(a,t,st==="ok"?"over":st,"cùng chỗ",true)}}catch(e){}}}]];
 const N0={};try{for(const k of Object.keys(agNeedsC(liveRivals(true)[0]||S)))N0[k]=100}catch(e){};["company","desire","tea","order","love","self","tin","mp"].forEach(k=>N0[k]=100);
 const snapW=()=>JSON.stringify({menW:S.menW||null,S:{malice:S.malice,rank:S.rank,preg:S.preg,hidden:S.hidden,kids:S.kids,inv:S.inv,confined:S.confined},R:rivals.map(v=>({id:v.id,rank:v.rank,queen:v.queen,confined:v.confined,suc:v.suc,sung:v.sung,preg:v.preg,hidden:v.hidden,kids:v.kids,inv:v.inv,ev:v.ev,malice:v.malice}))});
 const restoreW=j=>{const o=JSON.parse(j);S.menW=o.menW||{};Object.assign(S,o.S);for(const x of o.R){const v=rivals.find(r=>r.id===x.id);if(v)Object.assign(v,x)}};
 const npcOpts=(role,v,grps)=>{for(const [vn,f] of VAR){const W=snapW();SEED(7);try{rich(v);f(v)}catch(e){E("var "+vn,e)}
   for(let t=0;t<TRIES;t++){try{for(const o of agOptsG(v,Object.assign({},N0),null)||[])addN(role,o.k,"agOptsG")}catch(e){E("agOptsG",e)}
    /* part 2: her own real needs too (agNeeds: a full Đức / Danh weighs its cost little), not only the flat all-needs world N0 */
    let NR=null;try{NR=Object.assign({},N0,agNeeds(v))}catch(e){}if(NR)for(const g of grps)for(const k in AGREG[g]||{}){try{for(const o of AGREG[g][k](v,Object.assign({},NR),null)||[])if(o&&o.k)addN(role,o.k,g+"."+k+"#real")}catch(e){}}
    for(const need of [null].concat(Object.keys(N0)))for(const g of grps)for(const k in AGREG[g]||{}){try{for(const o of AGREG[g][k](v,Object.assign({},N0),need)||[])if(o&&o.k)addN(role,o.k,g+"."+k)}catch(e){}}
    try{if(typeof agOpts==="function"&&g0(v)!=="maid")for(const need of [null,"sung","ally","spite","danh","safe","kid","rest","th","hh","bac"])for(const o of agOpts(v,Object.assign({},N0),need)||[])addN(role,o.k,"agOpts")}catch(e){}}
   if(g0(v)!=="maid"&&g0(v)!=="srv")gates(role,v);restoreW(W)}};
 /* shared gates: TW deeds and ACT deeds — the same req/ok function decides for her and an NPC */
 /* the NPC side counts a shared-gate deed only when its option set can offer it (haOpts: BANDS + HA_VAR − HA_NO; agOpts: AGSELF / AGSOC; hh: admon) */
 const OFF=(()=>{const H=new Set(BANDS.flatMap(b=>b[2]).concat(Object.keys(HA_VAR),["taint","cook","tieuhuy"]));for(const k of HA_NO)H.delete(k);
  const T=new Set(["admon"]);for(const M of [typeof AGSELF!=="undefined"?AGSELF:{},typeof AGSOC!=="undefined"?AGSOC:{}])for(const x in M){const e=M[x];if(Array.isArray(e))T.add(e[0]);else if(e&&e.k)T.add(e.k);T.add(x)}return{H,T}})();
 /* the same targets for both doers: the other consorts (never S, never the probed NPC) */
 const gates=(role,a)=>{const T=liveRivals(true).filter(x=>x&&x!==a&&x!==S&&x!==window.__rpV&&!x.out&&x.alive!==false);for(const k in TW){const D=TW[k];if(!D.req){addGate(role,a,k);continue}for(const t of T.concat([null])){try{if(D.req(a,t)){addGate(role,a,k);break}}catch(e){}}}
  for(const k in ACT){const A=ACT[k];if(!A||!A.ok)continue;for(const t of T){try{if(A.ok(a,t)){addGate(role,a,"harm:"+k);break}}catch(e){}}}};
 const addGate=(role,a,k)=>{if(a===S){addP(role,"§"+k,"gate");return}const h=/^harm:(.+)$/.exec(k);if(h?!OFF.H.has(h[1]):!OFF.T.has(k))return;addN(role,"§"+k,"gate")};
 const PLS=()=>{try{return places().map(x=>x.k).concat(["home"])}catch(e){return["home"]}};
 const playerOnce=role=>{
  for(let t=0;t<TRIES;t++){richK(S);try{deal();for(const c of deck||[])addP(role,c.n,"deck")}catch(e){E("deal",e)}}
  if(!isSrv()){for(const f of ["pool","artActs","directActs","illCards"])try{for(const c of window[f]()||[])addP(role,c.n,"deck")}catch(e){}
   try{const q=qinCard(S);if(q)addP(role,q.n,"garden")}catch(e){}}
  if(!isSrv())try{for(const a of talkOpts({kind:"emp"})||[])addP(role,a.n,"talk:emp")}catch(e){}
  for(const k of PLS()){richK(S);Q.length=0;try{S.place="home";goTo(k);Q.length=0}catch(e){E("goTo "+k,e)}
   for(const pp of (S.visit&&S.visit.people)||[]){try{for(const a of talkOpts(pp)||[])addP(role,a.n,"talk:"+pp.kind)}catch(e){E("talk "+pp.kind,e)}}}
  S.place="home";Q.length=0;
  if(!isSrv()){for(let i=0;i<rivals.length;i++){const v=rivals[i];if(v===S)continue;try{for(const n of lab(rvCard(v,i)))addP(role,n,"rv")}catch(e){E("rv",e)}try{for(const a of topicOpts(v)||[])addP(role,a.n,"topic")}catch(e){E("topic",e)}}
   for(const f of ["staffTabHTML","staffHTML","facHTML","artTabHTML","invHTML","wkTabHTML","petPanelHTML","kidTabHTML"])try{for(const n of lab(window[f]()||""))addP(role,n,f)}catch(e){E(f,e)}}
  else{try{for(const c of srvCards()||[])addP(role,c.n,"srvCards")}catch(e){E("srvCards",e)}try{for(const n of lab(srvStaffHTML()))addP(role,n,"srvStaff")}catch(e){E("srvStaff",e)}}
  if(!isSrv())gates(role,S)};
 const playerLabels=role=>{for(const [vn,f] of VAR){const W=snapW();SEED(7);try{rich(S);f(S)}catch(e){E("pvar "+vn,e)}playerOnce(role);restoreW(W)}};
 if(phase==="consort"){
  const v=liveRivals(true).find(x=>!x.queen&&!x.out&&!x.confined);window.__rpV=v;
  for(let r=0;r<=6;r++){v.rank=r;v.queen=false;npcOpts("t"+(r+1),v,["consort"])}
  let q=queenP();if(!q||q===S){v.queen=true;v.rank=6;const i=rivals.indexOf(v);rivals.splice(i,1);rivals.unshift(v);q=v}
  for(const t of liveRivals(true).filter(x=>x!==q&&!x.out))(q.rl=q.rl||{})[t.id]=60;
  npcOpts("hh",q,["consort","hh"]);
  if(q===v){v.queen=false;v.rank=5}
  for(let r=0;r<=7;r++){S.rank=r;if(r===7)for(const x of rivals)if(x!==S)x.queen=false;playerLabels(r===7?"hh":"t"+(r+1))}
  S.rank=0;
  /* PROMOTION (NPC): an NPC maid raised by amRise, then her exact clone with the maid origin removed (= a born Đáp ứng): the act sets must be equal */
  try{const o=liveRivals(true).find(x=>!x.out&&x!==S&&(x.staff||[]).some(s=>s&&s.role==="maid"))||liveRivals(true).find(x=>!x.out&&x!==S);
   let m=(o.staff||[]).find(s=>s&&s.role==="maid");if(!m){fillStaff(o,true);m=(o.staff||[]).find(s=>s&&s.role==="maid")}
   const before=rivals.length;amRise(m,o,"send");const n=rivals[rivals.length-1];res.upNpc={ok:rivals.length>before&&n.rank===0,grp:g0(n),rank:n.rank,fromMaidOf:n.fromMaidOf||null};
   n.preg=0;n.hidden=false;const b=JSON.parse(JSON.stringify(Object.assign({},n,{staff:null,maid:null})));b.id=++rid;b.staff=n.staff;b.maid=n.maid;for(const k of ["fromMaid","fromMaidOf","wasMaid"])delete b[k];if(b.ag)delete b.ag.o;rivals.push(b);
   for(const t of liveRivals(true))if(t!==n&&t!==b){try{(t.rl=t.rl||{})[b.id]=(t.rl||{})[n.id];if(t.aff)t.aff[b.id]=t.aff[n.id];if(t.oan)t.oan[b.id]=t.oan[n.id]}catch(e){}}
   npcOpts("up",n,["consort"]);npcOpts("t1born",b,["consort"]);rivals.splice(rivals.indexOf(b),1)}catch(e){E("upNpc",e)}}
 if(phase==="maid"){
  try{const L=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))if(s&&s.role==="maid"&&g0(s)==="maid")L.push(s);for(const s of L.slice(0,16))npcOpts("maid",s,["maid"])}catch(e){E("npcMaid",e)}
  playerLabels("maid");
  /* PROMOTION (player): srvRise, then the same S with the maid origin removed (= a born Đáp ứng in the same world): the act sets must be equal */
  try{S.age=Math.max(S.age||0,18);srvRise("role-parity scan");res.upMe={ok:!isSrv()&&S.rank===0,rank:S.rank};S.preg=0;S.hidden=false;playerLabels("up");
   const sv=S.srv;delete S.srv;playerLabels("t1me");S.srv=sv}catch(e){E("upMe",e)}}
 const LT={};for(const k in TW)LT[k]=[TW[k].n];for(const k in ACT)if(ACT[k]&&ACT[k].n)LT["harm:"+k]=[ACT[k].n];
 for(const k in (window.AGC2BTN||{}))LT["cx2:"+k]=[AGC2BTN[k]];for(const k in (window.AGC3BTN||{}))LT["cx3:"+k]=[AGC3BTN[k]];for(const k in (window.AGC4BTN||{}))LT["cx4:"+k]=[AGC4BTN[k]];
 res.LT=LT;Math.random=R0;return res}

async function scan(html,opt){opt=opt||{};const {chromium}=require('playwright');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const b=await chromium.launch();const out={P:{},N:{},err:[],pageErr:[]};
 for(const phase of ["consort","maid"]){const p=await b.newPage({viewport:{width:755,height:1000}});p.on('pageerror',e=>out.pageErr.push(phase+": "+e.message));
  await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  /* part 2: the same world every run (the life start() draws was unseeded: rows that depend on a draw flipped between runs) */
  await p.evaluate(({phase})=>{let sd=20261118;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
   for(let i=0;i<60&&(phase==="maid"?!isSrv():isSrv());i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}},{phase});
  const r=await p.evaluate(inPage,{phase,TRIES:opt.tries||4});
  Object.assign(out.P,r.P);Object.assign(out.N,r.N);out.err.push(...r.err.map(x=>phase+": "+x));if(r.upNpc)out.upNpc=r.upNpc;if(r.upMe)out.upMe=r.upMe;out.LT=Object.assign(out.LT||{},r.LT);await p.close()}
 await b.close();return build(out)}

/* ---------------- table ---------------- */
function build(o){const LT=Object.assign({},o.LT);for(const k in KEYLAB)LT[k]=(LT[k]||[]).concat(KEYLAB[k]);
 const keyOfLabel=n=>{const hits=[];for(const k in LT)for(const l of LT[k]){if(!l)continue;if(n===l||(l.endsWith(" ")||n.length>l.length)&&n.startsWith(l)&&/^[\s:{(]|^$/.test(n.slice(l.length,l.length+1)||" "))hits.push([k,l.length])}
  hits.sort((a,b)=>b[1]-a[1]);return hits.length?hits.filter(h=>h[1]===hits[0][1]).map(h=>h[0]):[]};
 /* player keys per role: gate keys (§k) + labels mapped to keys; unmapped labels stay as label rows */
 const PK={},UNM={};for(const role in o.P){PK[role]={};for(const n in o.P[role]){if(n[0]==="§"){PK[role][n.slice(1)]=1;continue}
   let ks=keyOfLabel(n);/* one label, two roads: a maid key counts in the maid column, a consort key (cx*) in the consort columns */
   if(ks.length>1){const mk=ks.filter(k=>k.startsWith("maid:")),ck=ks.filter(k=>/^cx\d?:/.test(k));if(mk.length&&ck.length)ks=role==="maid"?ks.filter(k=>!/^cx\d?:/.test(k)):ks.filter(k=>!k.startsWith("maid:"))}
   if(ks.length)ks.forEach(k=>PK[role][k]=1);else{(UNM[n]=UNM[n]||{})[role]=Object.keys(o.P[role][n]).join("|")}}}
 const NK={},NKA={};for(const role in o.N){NK[role]={};NKA[role]={};for(const k in o.N[role]){const kk=k[0]==="§"?k.slice(1):k;NK[role][kk]=1;
   /* the promotion check compares the ACT SET: an option seen only under her own real needs (#real pass) depends on her life, not her rank */
   if(Object.keys(o.N[role][k]).some(x=>!/#real$/.test(x)))NKA[role][kk]=1}}
 /* aliases: the same ACT function under two keys (her gate key harm:x = an NPC's cx:x option, jagacts cx:ally → ACT.ally.f, cx:gift → giveTo) */
 for(const role in NK)for(const a in ALIAS)if(NK[role][ALIAS[a]])NK[role][a]=1;o.N=NK;
 const keys=new Set();for(const R of [PK,o.N])for(const role in R)for(const k in R[role])keys.add(k);
 const isEx=(role,k)=>EXEMPT.find(e=>(e.key===k||"label:"+e.label===k||e.re&&new RegExp(e.re).test(k))&&(!e.roles||e.roles.includes(role)));
 const GRP={maid:["maid"],t1:CON,t2:CON,t3:CON,t4:CON,t5:CON,t6:CON,t7:CON,hh:["hh"],up:["up"]};
 const gateKey=k=>!!(o.LT[k]&&(k.startsWith("harm:")||!k.includes(":")))||k.startsWith("hh:");
 const rows=[];const gaps=[];const lbl=k=>k.startsWith("label:")?k.slice(6):(LT[k]||[k])[0];
 const PKL={};for(const role in PK){PKL[role]=Object.assign({},PK[role]);}for(const n in UNM)for(const role in UNM[n])(PKL[role]=PKL[role]||{})["label:"+n]=1;
 const allK=new Set();for(const R of [PKL,o.N])for(const role in R)for(const k in R[role])allK.add(k);
 for(const k of [...allK].sort()){const row={key:k,label:lbl(k),fn:k.startsWith("label:")?"?":fnClass(k),cells:{}};
  for(const role of ROLES){const G=GRP[role];const has=(R,r)=>!!(R[r]&&R[r][k]);const p=has(PKL,role),n=has(o.N,role);const pG=G.some(r=>has(PKL,r)),nG=G.some(r=>has(o.N,r));
   let c;if(p&&n)c=row.fn;else if(pG&&!nG)c=p?"P-ONLY":"—";else if(nG&&!pG)c=n?"N-ONLY":"—";else if(p||n)c=gateKey(k)?(p?"P-RANK":"N-RANK"):(p?"P":"N")+"·draw";else c="—";
   if(/ONLY|RANK/.test(c)&&isEx(role,k))c="EXEMPT";row.cells[role]=c;if(/ONLY|RANK/.test(c))gaps.push({role,key:k,label:row.label,side:c,src:k.startsWith("label:")?(UNM[k.slice(6)]||{})[role]:""})}
  rows.push(row)}
 /* promotion: the risen maid's act set equals her clone born as Đáp ứng (NPC: amRise; player: srvRise) */
 const setEq=(A,B)=>{A=A||{};B=B||{};return{onlyRisen:Object.keys(A).filter(x=>!(x in B)),onlyBorn:Object.keys(B).filter(x=>!(x in A))}};
 const promo={npc:Object.assign({},o.upNpc,setEq(NKA.up,NKA.t1born)),me:Object.assign({},o.upMe,setEq(PKL.up,PKL.t1me))};
 for(const w of ["npc","me"])for(const side of ["onlyRisen","onlyBorn"])for(const k of promo[w][side])gaps.push({role:"up",key:k,label:lbl(k),side:"PROMO-"+w+"-"+side});
 return{roles:ROLES,roleN:ROLE_N,rows,gaps,promo,err:o.err,pageErr:o.pageErr}}

function md(R){const L=[];L.push("| act key | player button | fn | "+R.roles.map(r=>R.roleN[r]).join(" | ")+" |");L.push("|"+"---|".repeat(3+R.roles.length));
 for(const r of R.rows){if(R.roles.every(x=>r.cells[x]==="—"))continue;L.push(`| ${r.key} | ${r.label} | ${r.fn} | `+R.roles.map(x=>r.cells[x]).join(" | ")+" |")}
 return L.join("\n")}
module.exports={scan,md,build,KEYLAB,ROLES};
if(require.main===module){(async()=>{const a=process.argv.slice(2);const html=a.find(x=>!x.startsWith('--')&&!/\.(md|json)$/.test(x))||'dev/index.html';
 const R=await scan(html);const mo=a.indexOf('--md'),jo=a.indexOf('--json');
 if(mo>=0)require('fs').writeFileSync(a[mo+1],md(R)+"\n");if(jo>=0)require('fs').writeFileSync(a[jo+1],JSON.stringify(R,null,1));
 const cnt={};for(const r of R.rows)for(const x of R.roles){const c=r.cells[x];cnt[c]=(cnt[c]||0)+1}
 console.log("ROLE PARITY: rows "+R.rows.length+" · cells "+JSON.stringify(cnt)+" · gaps "+R.gaps.length);
 const by={};for(const g of R.gaps)(by[g.role]=by[g.role]||[]).push(g.side[0]+":"+g.key);for(const r in by)console.log("  "+r+" ("+by[r].length+"): "+by[r].join(", "));
 console.log("PROMOTION npc: "+JSON.stringify(R.promo.npc));console.log("PROMOTION me:  "+JSON.stringify(R.promo.me));
 if(R.err.length)console.log("probe errors: "+R.err.slice(0,10).join(" ; "));if(R.pageErr.length)console.log("PAGE ERRORS: "+R.pageErr.slice(0,5).join(" ; "))})()}
