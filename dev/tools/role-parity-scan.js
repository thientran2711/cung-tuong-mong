/* ROLE PARITY SCAN (owner OD 18/11 ~21:30Z; law 1 two-way + law 4 one core) — role × act × {player, NPC}, built from the LIVE game.
   Roles: maid (cung nữ) · t1…t7 (phi tần ranks Đáp ứng … Hoàng quý phi = rank 0…6) · hh (Hoàng hậu seat, rank 7) · up (a maid just promoted to
   consort: the player's srvRise and an NPC maid's amRise — both must hold EXACTLY the t1 act set).
   NPC side: the live registries — every AGREG provider of the person's group (agGrp: consort / hh / maid) called on a rich NPC of that role over many
   draws (keys o.k), plus the shared gates TW[k].req / ACT[k].ok(a,t) / hh acts over every target.
   Player side: the live builders — Hành sự deck (deal + pool + artActs + directActs + illCards), talkOpts of every person at every place (goTo),
   topicOpts + rvCard of every consort, Kẻ hầu / phe / Tài nghệ tabs (consort life); srvCards + srvTalk + every Đồng liêu card, srvStaffTabHTML, rvCard of every consort (Chủ tử, maid life).
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
 "maid:listen":["Việc chủ sai","Làm xong","Nghe ngóng cho chủ"],"maid:scout":["Việc chủ sai","Làm xong","Tự đi dò la cho chủ"],"maid:watch":["Việc chủ sai","Làm xong","Canh chừng cung chủ"],"maid:errand":["Việc chủ sai","Làm xong"],
 "ksp":["Hối lộ Kính sự phòng","Đút lót lật thẻ"],"cx2:maidSpy":["Sai cung nữ đi dò la","Sai đi dò la"],"cx3:qin":["Đánh đàn ở ngự hoa viên","Đánh đàn chờ ngự giá"],"cx3:def_canh":["Giao việc phòng bị","Phòng bị"],
 "cx3:def_thudoc":["Giao việc phòng bị","Phòng bị"],"cx3:def_theodoi":["Giao việc phòng bị","Phòng bị"],"cx3:def_giuchung":["Giao việc phòng bị","Phòng bị"],"check":["Kiểm tra đồ","Soát quà được tặng"],
 "cx3:work":["Tự học, làm tác phẩm","Tự học"],"cx3:anthai":["Tự bào chế thuốc an thai","An thai"],"cx2:kidGreet":["Dẫn đi thỉnh an Hoàng thượng","Đưa con đến thỉnh an Hoàng thượng"],
 "cx2:kidHeal":["Tự bốc thuốc cho con","Chữa bệnh cho con"],"cx3:charity":["Đưa cơm áo","Phát bạc cứu giúp cung nhân nghèo"],"cx3:facFound":["Lập phe cùng"],"cx3:tyGift":["Biếu"],
 /* B3: the kid card says «Dạy chữ» (j53 ktBtns); AGC3BTN.teachV holds only "học chữ" */
 "cx3:teachV":["Dạy chữ"],
 /* B3: buttons the wider probe now reads (item menu, every sub-tab / person page): the same act keys as the NPC side */
 "cx:gift":["Tặng"],"harm:taint":["Tẩm"],"ml:beat":["Bắt quỳ, vả miệng"],"ml:frame":["Vu tội"]};
KEYLAB["cx:study"]=KEYLAB["cx:study"].concat(["Học với Thái hậu","Học lối mới với thầy"]);
/* function class of a key (from the AG-ALL-2 parity table, after part 5): SAME = both sides call ONE function; NUM = same BAL row, two code paths */
const SAMEPFX=["harm:","cx3:","hh:","ml:"];const SAMEK=new Set(["help","apol","visit","mediate","humil","test","drop","follow","gossip","flaunt","admon","warn","provoke","check","cx:buy","cx:gift","cx:ally",
 "cx2:bribeSrv","cx2:plantSrv","cx2:help","cx2:maidTalk","cx2:maidSpy","cx:study","maid:leave","maid:empTea","maid:poison","maid:follow","maid:cut","maid:listen","maid:scout","maid:watch","maid:pil"]);
const fnClass=k=>SAMEK.has(k)||SAMEPFX.some(p=>k.startsWith(p))||/^[a-z]+$/.test(k)&&!/^effort$/.test(k)?"SAME":"NUM";
/* documented exemptions (role, key or label, reason) — information-only buttons or a side with no state for it (ag-all-parity.md exemption lists) */
const EXEMPT=require('./role-parity-exempt.json');
const SRCONLY={"cx3:facDiv":/^facHTML$/};
/* role-parity-bundle-fix: harm:petcare = cx3:petcare (jagacts3 agRunReg cx3:petcare → runAct(v,t,"petcare") = ACT.petcare, the same act as her button);
   P-ONLY by mapping only once the night-balance-bundle dice gave a consort a pet in the maid-life world (up column) */
const ALIAS={"harm:ally":"cx:ally","harm:gift":"cx:gift","harm:petcare":"cx3:petcare"};
const CON=["t1","t2","t3","t4","t5","t6","t7"];const ROLES=["maid","t1","t2","t3","t4","t5","t6","t7","hh","up"];
const ROLE_N={maid:"cung nữ",t1:"Đáp ứng",t2:"Thường tại",t3:"Quý nhân",t4:"Tần",t5:"Phi",t6:"Quý phi",t7:"Hoàng quý phi",hh:"Hoàng hậu",up:"cung nữ → phi tần"};

/* ---------------- in-page probes ---------------- */
function inPage(arg){const {phase,TRIES}=arg;const RANKS_P=arg.ranks||[0,1,2,3,4,5,6,7];const res={P:{},N:{},err:[],cov:{}};
 /* one seeded dice for both sides: each probe starts from the same seed, so a random pick never makes a one-sided row */
 const R0=Math.random;let seed=1;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};const SEED=n=>{seed=n||1;Math.random=rnd};
 const E=(w,e)=>{if(res.err.length<30)res.err.push(w+": "+(e&&e.message||e))};
 const RKN=(typeof RANKS!=="undefined"?RANKS.map(x=>x.n):[]).sort((a,b)=>b.length-a.length);
 const addP=(role,n,src)=>{if(!n)return;n=String(n).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();for(const r of RKN)if(n.startsWith(r)&&n.length>r.length&&n[r.length]!==" "){n=n.slice(r.length);break}if(!n)return;const R=res.P[role]=res.P[role]||{};(R[n]=R[n]||{})[src]=1};
 const addN=(role,k,src)=>{if(!k)return;const R=res.N[role]=res.N[role]||{};(R[k]=R[k]||{})[src]=1};
 /* role-parity-drift-2 (law 11, whole group): the kit info chips .kchipb «Chứng cứ N ›» (data-kev → kitEvidencePanel) and «Đã biết: N tin ›» / «Xem thêm N điều ›»
    (data-kintel → kitIntelPanel) only OPEN an info panel (j79 click hook): navigation, not an act — they became a row when a drawn rival happened to hold proof */
 /* role-parity-drift-kyngo: data-pct = the person-card act-group tab (j15 / j56 «Hành sự 3/5», jpcf «Chuyện cũ»): it only switches the shown group (j25
    click hook), the buttons of every group are read anyway — a tab label is navigation, never an act (up PROMO-me «Chuyện cũ» / «Hại nặng 11/18») */
 const SKIPA=/data-(tab|pct|pg|pv|sub|close|x|kinvpane|ksub|ktsv|kinvsub|kinvtab|mode|rail|lay|kitsample|kitx|maplist|v85tab|cl|coop|sl|new|kt53|kev|kintel)=/;
 /* B3: a real act button that also carries a navigation-like attribute (Tài nghệ «Tự học» data-learn + data-mode; kid card «Dạy chữ» data-kt53) is
    still an act: the probe used to drop it (cx:study / cx3:teachV / cx3:teachD were N-ONLY by probe only); sub-tab rows (data-ktsv) are navigation */
 const DOA=/data-(learn|vlearn)="|data-kt53="(?!none")/;
 const lab=h=>{const L=[];const re=/<button([^>]*)>([\s\S]*?)(<small|<\/button>)/g;let m;while((m=re.exec(h)))if(!/\bdisabled\b/.test(m[1])&&/data-[a-z0-9]+=/.test(m[1])&&(!SKIPA.test(m[1])||DOA.test(m[1])))L.push(m[2]);return L};
 const g0=p=>{try{return agGrp(p)}catch(e){return""}};
 const others=a=>[S].concat(liveRivals(true)).filter(x=>x&&x!==a&&!x.out&&x.alive!==false);
 /* SYMMETRIC WORLDS: the same mutation is applied to the doer whichever side she is (S or an NPC), so a state-gated act is open to both or neither */
 const richK=a=>{if(a===S){S.kh=0;try{used=0}catch(e){}}};
 const rich=a=>{Object.assign(a,{bac:5000,suc:100,danh:90,duc:90,tamco:80,sung:60,th:70,hh:60,tai:80,sac:80});a.arts=a.arts||{};for(const k of ["cam","ky","thi","hoa","vu","y"])a.arts[k]=Math.max(a.arts[k]||0,80);
  if(a.st&&typeof a.st==="object")Object.assign(a.st,{bac:5000,suc:100,danh:90,duc:90,tamco:80});a.fakeIll=0;a.pray=0;a.fert=0;a.tablet=0;a.confined=0;if(a===S){S.kh=0;try{used=0}catch(e){}}};
 const VAR=[
  ["base",a=>{}],
  ["tired",a=>{a.suc=20;a.bac=30;if(a.st&&typeof a.st==="object")Object.assign(a.st,{suc:20,bac:30})}],
  ["social",a=>{for(const t of others(a)){try{oanAdd(t,a,40);affAdd(a,t,50);relAdd(a,t,40);if(t!==S){t.suc=30;t.sung=15}}catch(e){}}
   /* role-parity-drift-2: NPCs already know each other (k61 «Quen biết» 3, exempt «first meeting»); her Phe phái / person lists show only people she knows
      (j61 k61Hide). In the social world she is acquainted (Quen biết) with them too, so «Lập phe cùng» is judged by its rule at her rank, never by whom
      the drawn life had met (hh / up cx3:facFound were N-ONLY by draw only after 98f9f0f1 shifted the dice) */
   if(a===S)try{const K=typeof k61S==="function"&&k61S();if(K){const K0=Object.assign({},K);UNDO.push(()=>{for(const z in K)delete K[z];Object.assign(K,K0)});
    for(const t of others(a)){const kk=t&&t!==S&&kOf61(t);if(kk&&(+K[kk]||0)<3)K[kk]=3;
     /* E22h r4 (same family): her own acts on another palace's maid (j15 «Mưu kế»: Mua chuộc / jmline Bắt quỳ, vả miệng / Vu tội) sit on that maid's card,
        which a stranger shows disabled (j61 k61Dis «Chưa biết người này là ai»); whether she knew any of them hung on the drawn life (hh N-ONLY ml:beat /
        ml:frame once the probe asked the NPC Hoàng hậu's asHitPick on every maid-palace). In the social world she knows their households too */
     for(const sv of (t&&t!==S&&t.staff)||[]){const ks=kOf61(sv);if(ks&&(+K[ks]||0)<3)K[ks]=3}}}}catch(e){}}],
  /* npc-purpose G1 #14: the doer is WELL REGARDED (everyone else's thiện cảm toward her = 60): the acts that need another's goodwill — «Xin Hoàng hậu
     giáng» (aff(Hoàng hậu, doer) ≥ BAL.m30.xinhhAff), «Nhờ ơn người quen rút thẻ bài» (jecon econFavor: someone with rel ≥ BAL.favorRel) — are judged by
     their rule, not by how the seeded world's regard fell (npc-purpose moves regard by real causes: rumours, remarks). Same for both doers; undone after. */
  ["liked",a=>{/* the raw j9 fields (not affAdd: its gameplay wrappers — trust trait, mood, feel — scale a gain differently when the doer is S) */
    const setA=(t,v)=>{if(t===S){S.rl[a.id]=v}else if(a===S){t.rel=v}else{t.rl=t.rl||{};t.rl[a.id]=v}};
    for(const t of others(a)){try{const b=t===S?S.rl[a.id]:a===S?t.rel:(t.rl||{})[a.id];UNDO.push(()=>setA(t,b));setA(t,60)}catch(e){}}}],
  /* G1 #14 (same family as role-parity-drift-2's social-world acquaintance): the proof is held on people she KNOWS (a stranger's card shows no
     Chứng cứ / Xử tội). Who she knows at the start follows the seeded house draw, so the one target with real deeds (deedCap) could be a stranger and
     her Chứng cứ / Xử tội rows fell out by probe only (hh:judge N-ONLY): in the proof world she knows every target too (k61S «Quen biết» 3), undone after */
  ["proof",a=>{if(a===S)try{const K=typeof k61S==="function"&&k61S();if(K){const K0=Object.assign({},K);UNDO.push(()=>{for(const z in K)delete K[z];Object.assign(K,K0)});
    for(const t of others(a)){const kk=t&&t!==S&&kOf61(t);if(kk&&(+K[kk]||0)<3)K[kk]=3}}}catch(e){}
   for(const t of others(a)){try{if(typeof evA==="function")evA(a,t,3,"scan");else t.ev=3}catch(e){}}}],
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
    if(typeof dressLook==="function")dressLook(a,t,"cùng chỗ");if(typeof wdSee==="function"&&typeof wdStatus==="function"){const st=wdStatus(t);wdSee(a,t,st==="ok"?"over":st,"cùng chỗ",true)}}catch(e){}}}],
  /* B3: wares — a gift-worthy item, a tonic while tired, a sellable jewel while short of bạc, a present from another consort (jagacts cx:gift /
     jagacts3 p3UseIx / p3SellIx / p3TestIx: the NPC roads her item menu offers — Tặng quà / Dùng / Bán / Nghiệm độc — open for both doers) */
  ["wares",a=>{const o=others(a).find(t=>t&&t!==S)||others(a)[0];a.inv=a.inv||[];a.bac=30;a.suc=40;if(a.st&&typeof a.st==="object")Object.assign(a.st,{bac:30,suc:40});
   try{const tonic=Object.keys(IT).find(k=>{const it=itm(k);return it.use&&it.use.suc&&!(it.ant||it.fert||it.dr||it.sl||it.evi||it.anti||it.keep||it.mat||it.gv||it.il)});
    for(const k of [tonic,"tranhco","tramngoc"])if(k&&IT[k])a.inv.push({k});if(IT.nghien&&o)a.inv.push({k:"nghien",from:key(o)})}catch(e){}}],
  /* B3: a rival faction of three other consorts the doer hates (j10 found / jagacts3 p3FacFoe): her Phe phái card «Ly gián» and the NPC cx3:facDiv */
  ["faction",a=>{try{const T=others(a).filter(t=>t&&t!==S&&!facOf(t)).slice(0,3);if(T.length<3)return;S.facs=(S.facs||[]).concat([{id:9090901,m:T.map(key),name:"Phe dò"}]);for(const t of T)oanAdd(a,t,60)}catch(e){}}],
  /* B3: consorts in disfavour (jagacts AGHHG conf / cutpay): Hoàng hậu standing low, bad relation with the doer, a jewel worth stealing in each chest (vòng ngọc, ≥ LO.minPr) — the NPC
     Empress's Tịch thu / Khất bổng lộc roads open as her Quyền Hoàng hậu buttons do, and every doer has someone to rob (jlost loStealOk: before, only the Empress held such items, so the NPC Empress never could — P-ONLY by probe only) */
  ["disfavour",a=>{for(const t of others(a)){try{t.hh=-50;relAdd(a,t,-60);t.cutPay=0;t.inv=t.inv||[];if(IT.vongngoc)t.inv.push({k:"vongngoc"})}catch(e){}}}],
  /* part-1 fix (b): the doer's OWN servants (the targets of Thưởng / Phạt / Đổi người / Che chở / Hỏi chuyện / Tâm sự / Tiến cử) span every state those
     acts read (loyal low / very low / high, in trouble this tuần, fond of someone) — the same states for her household and an NPC's, so a staff row is
     judged by the rule at that rank, never by how loyal the drawn servants happened to be */
  ["staff",a=>{const L=(a.staff||[]).filter(s=>s&&!s.out&&s.loyal!=null);
    /* role-parity-drift-2: her confidant maid (a.maid, not in a.staff) in a «not yet fully close» state (lòng under BAL.ag.cx2.maidTalk.below), the same for
       her and an NPC: «Trò chuyện với cung nữ» (cx2:maidTalk) is weighed by an NPC only below that lòng — up was P-ONLY by the drawn maid's lòng only */
    const cm=a.maid&&!a.maid.out&&a.maid.loyal!=null&&!L.includes(a.maid)?a.maid:null;if(cm){const b0=cm.loyal;UNDO.push(()=>{cm.loyal=b0});cm.loyal=Math.min(cm.loyal,BAL.ag.cx2.maidTalk.below-25)}const o=liveRivals(true).find(x=>x&&x!==a&&!x.out);
    const ST=[s=>{s.loyal=10},s=>{s.loyal=25},s=>{s.loyal=45},s=>{s.trouble=wk();s.loyal=60},s=>{if(o)s.af=Object.assign({},s.af||{},{[o.id]:40});s.loyal=80}];
    L.forEach((s,i)=>{const b={loyal:s.loyal,trouble:s.trouble,af:s.af};UNDO.push(()=>Object.assign(s,b));ST[i%ST.length](s)})}],
  /* role-parity-drift-kyngo: proof on someone she ALSO resents — the «proof» world's 3 proofs plus the doer's own grudge (oán 60) and ill regard (−60) toward
     each target, one world, the same for her and an NPC. An NPC tells / judges only from a motive (jagacts3 par3 tell: evG > 0 and agSpite > 0; jagacts
     AGHHG judge: evG ≥ BAL.ag.ev.judge and rel < 0); the player decides herself. hh / up cx3:tell and hh hh:judge were held by the NPC side only because
     the proof world's a.evm leaked into the later worlds (fixed in snapW). Raw j9 fields (as «liked»), only the doer → target direction, undone after
     (UNDO), so no other world or doer sees this state */
  ["proof-foe",a=>{if(a===S)try{const K=typeof k61S==="function"&&k61S();if(K){const K0=Object.assign({},K);UNDO.push(()=>{for(const z in K)delete K[z];Object.assign(K,K0)});
    for(const t of others(a)){const kk=t&&t!==S&&kOf61(t);if(kk&&(+K[kk]||0)<3)K[kk]=3}}}catch(e){}
   const F=t=>a===S?[S.ro,t.id,S.rl,t.id]:t===S?[a,"oan",a,"rel"]:[(a.ro=a.ro||{}),t.id,(a.rl=a.rl||{}),t.id];
   /* law 6a REAL EVIDENCE: a proof needs a real wrong behind it (jtruth deedCap). In the maid-life page nobody has done one yet, so no proof could exist for
      either doer (up cx3:tell: her card stayed the LOCKED «Kể tội một phi tần · cần chứng cứ», the NPC had no one to tell on). Each target gets one real
      recorded wrong (deedAdd «bày mưu», weight 3) before the proofs, undone after — the same for both doers */
   for(const t of others(a)){try{if(typeof deedCap==="function"&&typeof deedAdd==="function"&&deedCap(t)<3){const d0=t.dw,w0=t.wrongs?t.wrongs.slice():t.wrongs;
     UNDO.push(()=>{t.dw=d0;t.wrongs=w0});deedAdd(t,"plot",null,3-deedCap(t),"bày mưu")}}catch(e){}}
   for(const t of others(a)){try{if(typeof evA==="function")evA(a,t,3,"scan");else t.ev=3;const [O,ok,R,rk]=F(t);const o0=O[ok],r0=R[rk];UNDO.push(()=>{O[ok]=o0;R[rk]=r0});
    O[ok]=Math.max(+o0||0,60);R[rk]=Math.min(+r0||0,-60)}catch(e){}}
   try{if(a!==S&&typeof HA==="object"&&HA){const G=HA.gv=HA.gv||{};G[a.id]=(G[a.id]||0)+1}}catch(e){}}]];
 const UNDO=[];
 /* B4 (maid column): worlds of a maid life, the SAME mutation for the player maid (S, S.srv) and an NPC maid — friends / a same-palace foe /
    a hostile palace's maid (Nhờ dò tin, Tố lỗi, Bỏ độc), no friend yet (Biếu quà), the master out (Theo hầu chủ, Hầu bên cạnh chủ), a senior bậc
    (Quản sổ sách), worn out with bạc (Mua thuốc bổ, Xin thuốc bổ, Nghỉ lấy sức), plain (Chải chuốt), the master's secret + news (Mật báo, Tố cáo,
    Bẩm tin), the Emperor at the garden, where a maid may walk (Quỳ dâng trà). Used ONLY in the maid phase; each m-world is undone (mSnap/mRest). */
 const MST=a=>a===S?srvM():ownerOf(a);const AF=a=>a===S?(S.srv.af=S.srv.af||{}):(a.af=a.af||{});
 const ME=(a,x)=>{if(a===S&&!S.srv.met.includes(x.sid))S.srv.met.push(x.sid)};
 const SV=a=>a===S?S.srv:a;
 const mHome=a=>{const m=MST(a);if(!m)return;const h=palaceOf(m);S.where=S.where||{};S.where[m.id]=h;const e=S.roster&&S.roster.P&&S.roster.P["v"+m.id];if(e)for(const x of e)if(Array.isArray(x))x[0]=h};
 const MVAR=[
  ["m-peers",a=>{const m=MST(a);if(!m)return;const all=allServ().filter(x=>x!==a&&!x.out);const F=AF(a);
    const fr=all.find(x=>ownerOf(x)&&ownerOf(x)!==m);if(fr){F[fr.sid]=SRVA.ask.af+10;ME(a,fr)}
    const foe=all.find(x=>ownerOf(x)===m);if(foe)F[foe.sid]=-30;
    const t=liveRivals(true).find(v=>v!==m&&!v.out&&(v.staff||[]).some(x=>x&&x.role==="maid"&&x!==a&&x!==fr));
    if(t){oanAdd(m,t,60);oanAdd(t,m,60);const z=t.staff.find(x=>x&&x.role==="maid"&&x!==a&&x!==fr);F[z.sid]=-40;ME(a,z)}}],
  ["m-away",a=>{const m=MST(a);if(!m)return;S.where=S.where||{};S.where[m.id]="vuon";const e=S.roster&&S.roster.P&&S.roster.P["v"+m.id];if(e)for(const x of e)if(Array.isArray(x))x[0]="vuon"}],
  /* npc-purpose G1 #14: the master AT HOME (the twin of m-away). NPCs now walk by purpose (jagwhy), so in the seeded start world every probed
     NPC master may be out — the srvTalk "mis" acts (Dâng trà, Đấm lưng, Xin ban thưởng, Bẩm tin, Xin tiến cử: jagstaff asOpts home = asMisHome)
     were then P-ONLY by probe only. Same mutation for her master (srvM) and an NPC maid's master. */
  ["m-home",a=>mHome(a)],
  ["m-senior",a=>{SV(a).rk=SRVA.books.rk}],
  ["m-worn",a=>{a.suc=30;a.bac=200}],
  ["m-plain",a=>{a.sac=10;a.tai=10;a.duc=10}],
  ["m-secret",a=>{const m=MST(a);if(!m)return;const v=liveRivals(true).find(x=>x!==m&&!x.out&&!x.queen);const X=SV(a);X.sec=Math.max(2,SRVA.accuse.sec||0);X.intel=v?[v.id]:[];if(v){oanAdd(v,m,60)}
    /* G1 #14: «Bẩm tin dò được» is told to the master face to face (jagstaff asOpts home): the news world has her at home, for both doers */mHome(a)}],
  /* person-minigame-acts round B (20/11, the role-parity-drift-2 way): the palace men and the Hoàng hậu stand in the garden all day — her srvTalk «Chào hỏi
     đúng lễ» / «Liếc mắt đưa tình» (a man where she is, j42 srvVisitOf ← S.menW) and «Tố cáo … trước Hoàng hậu» (sk hh) needed them at the place she
     probes; before, they met her only by the seeded day plan (main: the Thái y viện), so any new NPC option (jpma) moved them away (N-ONLY maid:hail /
     flirt / accuse). The same world for an NPC maid (her road to them is the agent plan). Restored by mSnap / mRest. */
  ["m-meet",a=>{const X="vuon";S.where=S.where||{};S.menW=S.menW||{};const P=S.roster&&S.roster.P;const put=id=>{const e=P&&P[id];if(e)for(const x of e)if(Array.isArray(x))x[0]=X};
    try{menInit()}catch(e){}for(const m of S.men||[])if(m.alive){S.menW[m.id]=X;put(m.id)}const q=queenP();if(q&&q!==S&&q!==MST(a)){S.where[q.id]=X;put("v"+q.id);
     /* the Hoàng hậu has no roster rel: goTo re-places her by S.where (back to her palace, where a maid of another palace is not let in), so the
        player side of this world reads the card she gets when the Hoàng hậu stands before her (the srvVisitOf person entry, sk "hh") — playerOnce */
     window.__rpMeetHH=q;UNDO.push(()=>{window.__rpMeetHH=null})}}],
  ["m-emp",a=>{S.where=S.where||{};S.where.emp="vuon";const e=S.roster&&S.roster.P&&S.roster.P.emp;if(e)for(const x of e)if(Array.isArray(x))x[0]="vuon"}],
  ["m-lonely",a=>{if(a===S)S.srv.af={};else a.af={}}],
  /* role-parity-drift-2: a sour servant (her lòng with her master under BAL.eit.pil.loyal: S.tin for the player maid, loyal for an NPC maid) — the state
     «Lén giữ đồ Nội vụ phủ phát» needs on both roads (j42 card eitPilMaidOk / jeitem eitPilWho); the player maid had it only by the drawn S.tin */
  ["m-sour",a=>{const lo=BAL.eit.pil.loyal-15;if(a===S){const t0=S.tin;UNDO.push(()=>{S.tin=t0});S.tin=Math.min(S.tin|0,lo)}else{const l0=a.loyal;UNDO.push(()=>{a.loyal=l0});a.loyal=Math.min(a.loyal|0,lo)}}]];
 const mSnap=()=>JSON.stringify({where:S.where,roster:S.roster,srv:S.srv,S:{suc:S.suc,sac:S.sac,tai:S.tai,duc:S.duc,bac:S.bac,ro:S.ro},sv:allServ().map(x=>({sid:x.sid,af:x.af,loyal:x.loyal,tin:x.tin,rk:x.rk,sec:x.sec,intel:x.intel,suc:x.suc,bac:x.bac,sac:x.sac,tai:x.tai,duc:x.duc})),R:rivals.filter(v=>v!==S).map(v=>({id:v.id,ro:v.ro,oan:v.oan}))});
 /* rel-men-servants r6 (F5, j9 relOwner): a servant's Thiện cảm toward ITS master is s.loyal for every master (one store), so the symmetric worlds that
    affAdd / relAdd the doer toward every other consort («social», «disfavour», …) now reach an NPC maid's loyal when the target is her own mistress
    (before, that write sat in the unused s.af["r"+id]). Both snapshots (snapW for every world, mSnap for the maid worlds) hold every servant's loyal / tin / af — else a world leaked into the next (loyal → 100 → 40)
    and the maid's REAL needs (asNeeds tin gap) hid «Bỏ độc» (maid P-ONLY maid:poison by probe only). Game rules untouched; baseline not lowered. */
 const mRest=j=>{const o=JSON.parse(j);S.where=o.where;S.roster=o.roster;S.srv=o.srv;Object.assign(S,o.S);for(const x of o.sv){const s=servById(x.sid);if(s)Object.assign(s,x)}for(const x of o.R){const v=rivals.find(r=>r.id===x.id);if(v)Object.assign(v,x)}};
 const N0={};try{for(const k of Object.keys(agNeedsC(liveRivals(true)[0]||S)))N0[k]=100}catch(e){};["company","desire","tea","order","love","self","tin","mp"].forEach(k=>N0[k]=100);
 /* role-parity-drift-kyngo: the world snapshot also holds each NPC's own proof book (evm). The «proof» world gives the doer 3 proofs on every target:
    for her they sit on the target (t.ev, restored here), for an NPC doer in her own a.evm — which was NOT restored, so an NPC's proof leaked into every
    later world (malice / seen / wares / disfavour / staff) and the promoted maid (probed first) showed Uy hiếp / Bán cho phe khác / Tố giác that
    neither she nor her born-Đáp-ứng clone holds in those worlds (up N-ONLY + PROMO-npc rows, red on LIVE d74f86a5 by the shifted draw only) */
 const snapW=()=>JSON.stringify({sv:allServ().map(x=>({sid:x.sid,loyal:x.loyal,tin:x.tin,af:x.af})),facs:S.facs||[],menW:S.menW||null,S:{malice:S.malice,hh:S.hh,cutPay:S.cutPay,rank:S.rank,preg:S.preg,hidden:S.hidden,kids:S.kids,inv:S.inv,confined:S.confined},R:rivals.map(v=>({id:v.id,rank:v.rank,queen:v.queen,confined:v.confined,suc:v.suc,sung:v.sung,preg:v.preg,hidden:v.hidden,kids:v.kids,inv:v.inv,ev:v.ev,evm:v.evm||{},malice:v.malice,hh:v.hh,cutPay:v.cutPay}))});
 const restoreW=j=>{while(UNDO.length)try{UNDO.pop()()}catch(e){}const o=JSON.parse(j);for(const x of o.sv||[]){const s=servById(x.sid);if(s)Object.assign(s,x)}S.facs=o.facs||[];S.menW=o.menW||{};Object.assign(S,o.S);for(const x of o.R){const v=rivals.find(r=>r.id===x.id);if(v)Object.assign(v,x)}};
 const npcOpts=(role,v,grps,VL)=>{for(const [vn,f] of (VL||VAR)){const W=snapW(),W2=/^m-/.test(vn)?mSnap():null;SEED(7);try{AG.sc={}}catch(e){}try{rich(v);f(v)}catch(e){E("var "+vn,e)}
   for(let t=0;t<TRIES;t++){try{for(const o of agOptsG(v,Object.assign({},N0),null)||[])addN(role,o.k,"agOptsG")}catch(e){E("agOptsG",e)}
    /* part 2: her own real needs too (agNeeds: a full Đức / Danh weighs its cost little), not only the flat all-needs world N0 */
    let NR=null;try{NR=Object.assign({},N0,(g0(v)==="maid"||g0(v)==="srv")&&typeof asNeeds==="function"?asNeeds(v):agNeeds(v))}catch(e){}/* B4: a maid's own needs = asNeeds (agNeeds throws on a staff: the #real pass never ran for maids) */if(NR)for(const g of grps)for(const k in AGREG[g]||{}){try{for(const o of AGREG[g][k](v,Object.assign({},NR),null)||[])if(o&&o.k)addN(role,o.k,g+"."+k+"#real")}catch(e){}}
    for(const need of [null].concat(Object.keys(N0)))for(const g of grps)for(const k in AGREG[g]||{}){try{for(const o of AGREG[g][k](v,Object.assign({},N0),need)||[])if(o&&o.k)addN(role,o.k,g+"."+k)}catch(e){}}
    /* B3: a consort's choice to hit another palace's maid (jagstaff asHitPick, run monthly by jmline mlHit) is not an AGREG option: read it here.
       «Bắt quỳ» is weighed only by a cruel consort (Xảo quyệt / Kiêu ngạo): the probe asks it as such a consort too */
    /* E22d r2: the Hoàng hậu is in consorts() too (jmline mlMonth runs mlHit for her), so she is asked as well (agGrp = "hh") */
    if((g0(v)==="consort"||g0(v)==="hh")&&typeof asHitPick==="function"){const T0=window.traitsOf;for(const cr of [0,1]){if(cr)window.traitsOf=p=>p===v?["Xảo quyệt"]:T0(p);
     /* drift-2 method (E22d r2): the probe world is explicit — every other palace that has a maid is asked as the target in turn (j8 pickTarget's
        hashed-by-Math.random pick no longer decides which acts the probe sees; a new module's draws moved hh off its only maid-palace target) */
     const P0=window.pickTarget;let TG=[];try{TG=(others(v)||[]).filter(x=>(x.staff||[]).some(s=>s.role==="maid"))}catch(e){}if(!TG.length)TG=[null];
     try{for(const tg of TG){if(tg)window.pickTarget=()=>tg;for(let i=0;i<12;i++){const r=asHitPick(v);if(r&&r.k&&r.k!=="bribe")addN(role,"ml:"+r.k,"asHitPick")}}}catch(e){E("asHitPick",e)}finally{window.traitsOf=T0;window.pickTarget=P0}}}
    /* E22e round C (drift-2 method, no exempt): a scheme's target is ONE hashed pick (jagharm haOpts0 → jmind mindPickBy keyed on the doer), so which
       deeds the probe saw hung on the doer's id and on every other module's draws (the risen maid and her born clone picked different targets:
       PROMO onlyBorn / up P-ONLY harm:taint). The probe world is explicit: every target in her danger band is asked in turn, the same for every doer */
    if((g0(v)==="consort"||g0(v)==="hh")&&typeof haOpts0==="function"&&typeof haTargets==="function"){const M0=window.mindPickBy;let TT=[];
     try{TT=haTargets(v)}catch(e){E("haTargets",e)}/* E22g: EVERY target, each given the grudge FIRST (the band ≥ 1 gate of haOpts0 reads danger = oán, so the band is asked after the grudge, not before) */
     /* her nature too: a scheme's weight is persW of her traits (drawn per person), so she is asked as she is and as a scheming consort (Xảo quyệt),
        the same as the asHitPick probe above */
     const T0=window.traitsOf;try{for(const cr of [0,1]){if(cr)window.traitsOf=p=>p===v?["Xảo quyệt"]:T0(p);for(const tg of TT.concat([null])){window.mindPickBy=(L,w,p)=>p===v&&tg&&(L||[]).includes(tg)?tg:M0(L,w,p);/* and a real grudge toward that target (the m-peers oán), undone after *//* E22g fix: oán lives where j9 oan() reads it — toward her = v.oan (a NUMBER), toward an NPC = v.ro[id]; the old probe wrote v.oan[id] (a no-op on a number), so no grudge was ever set */const toS=tg===S,o0=tg?(toS?v.oan:(v.ro||{})[tg.id]):null;if(tg){if(toS)v.oan=Math.max(v.oan||0,80);else{v.ro=v.ro||{};v.ro[tg.id]=Math.max(v.ro[tg.id]||0,80)}}/* E22h r4 (drift-2 method, no exempt): «Phóng hỏa kho đồ» (harm:phonghoa) needs a target whose store holds something that burns (jtsb tsbBurnable); whether any target had one hung on the drawn stores (the pm planner option shifted the draws: t1 P-ONLY harm:phonghoa). Each target is asked with one burnable piece added (Túi thơm thêu, Hương liệu), taken out after */const iv0=tg?tg.inv:null;if(tg)tg.inv=(tg.inv||[]).concat([{k:"tuithom",rp:1}]);/* and under her own needs too (the part-2 #real world: a full Đức weighs a deed's Đức cost little — «Phóng hỏa» costs Đức 8, so the flat all-needs world never weighs it up) */try{for(const NN of [N0].concat(NR?[NR]:[]))for(const need of [null,"spite"])for(const o of haOpts0(v,Object.assign({},NN),need)||[])if(o&&o.k)addN(role,o.k,NN===N0?"haOpts0@target":"haOpts0@target#real")}finally{if(tg){tg.inv=iv0;if(toS)v.oan=o0;else if(o0==null)delete v.ro[tg.id];else v.ro[tg.id]=o0}}}}}catch(e){E("haOpts0",e)}finally{window.mindPickBy=M0;window.traitsOf=T0}}
    try{if(typeof agOpts==="function"&&g0(v)!=="maid")for(const need of [null,"sung","ally","spite","danh","safe","kid","rest","th","hh","bac"])for(const o of agOpts(v,Object.assign({},N0),need)||[])addN(role,o.k,"agOpts")}catch(e){}}
   /* role-parity-drift-2: an NPC servant's «Lén giữ đồ Nội vụ phủ phát» is no agent option: jeitem eitPilfer runs on her master's monthly goods (stipGoods),
       chosen by eitPilWho (lòng under BAL.eit.pil.loyal or a spy, not caught lately) — the same gate as her card (eitPilMaidOk: S.tin under the same loyal,
       spyFor, pilDet) plus this month's Nội vụ phủ piece (eitPilPick). Read that gate for the NPC side (maid:pil was P-ONLY by probe only once 98f9f0f1
       gave every master this month's goods) */
    /* E22e round C: «Việc chủ sai» (a master's errand) — the player maid gets it as a card (j42 S.srv.err, roll SRVA.errand.offer), an NPC servant
       as her record row (j95 planner: a household staff of a master not in lãnh cung is sent «chủ sai đi lấy thuốc / Kính sự phòng», p.__err). Both
       are draws; the probe read only hers (P-ONLY whenever her draw came up). Read the NPC gate (same rule: a servant of a master outside lãnh cung) */
    if(g0(v)==="maid")try{const m=ownerOf(v);if(m&&m.alive!==false&&!m.out)addN(role,"maid:errand","j95 errand gate")}catch(e){E("errandGate",e)}
    if(g0(v)==="maid"&&typeof eitPilWho==="function")try{const m=ownerOf(v);if(m&&!m.out&&eitPilPick(m)&&eitPilWho(m).some(c=>c.s===v&&c.ch>0))addN(role,"maid:pil","eitPilWho")}catch(e){E("eitPilWho",e)}
   if(g0(v)!=="maid"&&g0(v)!=="srv")gates(role,v);restoreW(W);if(W2)mRest(W2)}};
 /* shared gates: TW deeds and ACT deeds — the same req/ok function decides for her and an NPC */
 /* the NPC side counts a shared-gate deed only when its option set can offer it (haOpts: BANDS + HA_VAR − HA_NO; agOpts: AGSELF / AGSOC; hh: admon) */
 const OFF=(()=>{const H=new Set(BANDS.flatMap(b=>b[2]).concat(Object.keys(HA_VAR),["taint","cook","tieuhuy"]));for(const k of HA_NO)H.delete(k);
  const T=new Set(["admon"]);for(const M of [typeof AGSELF!=="undefined"?AGSELF:{},typeof AGSOC!=="undefined"?AGSOC:{}])for(const x in M){const e=M[x];if(Array.isArray(e))T.add(e[0]);else if(e&&e.k)T.add(e.k);T.add(x)}return{H,T}})();
 /* the same targets for both doers: the other consorts (never S, never the probed NPC) */
 /* part-1 fix (b), reviewer item b: a TARGET LADDER, the same for both doers — one fixed target L (the first non-Empress consort of the shared
    target list) is put at every rank (Đáp ứng … Hoàng quý phi, then the Hoàng hậu seat), once as she is and once in the state a face-to-face or
    theft deed needs (standing with the doer in the garden — jagharm HA.here, the same hook the NPC deed uses when it lands —, holding a stealable
    piece (jlost loOk), at odds with a third person (Hòa giải), no slap mark yet). A shared-gate deed (Tát / Ngáng chân / Đẩy xuống hồ sen /
    Sai người lấy trộm / Hòa giải / Nương theo …) is then judged by its RULE at the doer's rank, never by where the drawn targets stood that buổi */
 let LOK=null;const lokK=()=>{if(LOK===null){LOK="";try{for(const k of Object.keys(IT))if(loOk({k})){LOK=k;break}}catch(e){}}return LOK};
 const ladder=(a,T,test)=>{const L=T.find(x=>!x.queen);if(!L)return false;const X=T.find(x=>x!==L&&!x.queen);
  const b={rank:L.rank,queen:L.queen,slap:L.slap,inv:L.inv,ro:L.ro,oan:L.oan},h0=HA.here;let hit=false;
  try{for(const r of [0,1,2,3,4,5,6,"hh"])for(const st of [0,1]){L.rank=r==="hh"?6:r;L.queen=r==="hh";L.slap=b.slap;L.inv=b.inv;L.ro=b.ro;L.oan=b.oan;HA.here=h0;
    if(st){HA.here={[a===S?"me":a.id]:"vuon",[L.id]:"vuon"};L.slap=null;const ik=lokK();if(ik)L.inv=(b.inv||[]).concat([{k:ik}]);L.ro=Object.assign({},b.ro||{});if(X)oanAdd(L,X,40)}
    try{if(test(L)){hit=true;throw 0}}catch(e){if(hit)throw e}}}catch(e){if(!hit)E("ladder",e)}
  finally{Object.assign(L,b);HA.here=h0}return hit};
 const gates=(role,a)=>{const T=liveRivals(true).filter(x=>x&&x!==a&&x!==S&&x!==window.__rpV&&!x.out&&x.alive!==false);for(const k in TW){const D=TW[k];if(!D.req){addGate(role,a,k);continue}let f=false;for(const t of T.concat([null])){try{if(D.req(a,t)){f=true;break}}catch(e){}}
   if(f||ladder(a,T,t=>D.req(a,t)))addGate(role,a,k)}
  /* E22h r4 (drift-2 method): «Phóng hỏa kho đồ» opens on a target whose store holds something that burns (jtsb tsbBurnable); the drawn stores decided it
     (t1 P-ONLY harm:phonghoa by draw). Every target holds one burnable piece while the gates are asked (the same world as the NPC target loop), taken out after */
  const IV=T.map(t=>[t,t.inv]);for(const t of T)t.inv=(t.inv||[]).concat([{k:"tuithom",rp:1}]);
  try{for(const k in ACT){const A=ACT[k];if(!A||!A.ok)continue;let f=false;for(const t of T){try{if(A.ok(a,t)){f=true;break}}catch(e){}}if(f||ladder(a,T,t=>A.ok(a,t)))addGate(role,a,"harm:"+k)}}finally{for(const [t,iv] of IV)t.inv=iv}};
 const addGate=(role,a,k)=>{if(a===S){addP(role,"§"+k,"gate");return}const h=/^harm:(.+)$/.exec(k);if(h?!OFF.H.has(h[1]):!OFF.T.has(k))return;addN(role,"§"+k,"gate")};
 /* B3: a tab builder shows ONE sub-tab (KTSUB: Tứ đức / Cầm kỳ thi họa …) and ONE person page (PG[tab]: data-pg/data-pi) at a time —
    walk every sub-tab and every page it offers (two levels), so a button on a later sub-tab / person page is not a P-side probe limit */
 const tabAll=f=>{const KS=typeof KTSUB==="object"&&KTSUB?KTSUB:{},PS=typeof PG==="object"&&PG?PG:{};const K0=Object.assign({},KS),P0=Object.assign({},PS);const out=[],seen=new Set();
  const put=(O,B)=>{for(const z in O)delete O[z];Object.assign(O,B)};
  const walk=(d,used)=>{const h=window[f]()||"";if(seen.has(h))return;seen.add(h);out.push(h);if(d>=2)return;const st=[];let m;
   const rs=/data-ktsub="([^"]+)"/g;while((m=rs.exec(h))){const seg=h.slice(m.index,m.index+4000).split(/data-ktsub="/)[1]||"";const rv=/data-ktsv="([^"]+)"/g;let q;while((q=rv.exec(seg)))st.push(["K",m[1],q[1]])}
   const rp=/data-pg="([^"]+)" data-pi="(\d+)"/g;while((m=rp.exec(h)))st.push(["P",m[1],+m[2]]);
   for(const [t,k,x] of st.filter(z=>!used.has(z[0]+z[1])).slice(0,80)){const K1=Object.assign({},KS),P1=Object.assign({},PS);if(t==="K")KS[k]=x;else PS[k]=x;try{walk(d+1,new Set([...used,t+k]))}catch(e){}put(KS,K1);put(PS,P1)}};
  try{walk(0,new Set())}finally{put(KS,K0);put(PS,P0)}return out};
 const PLS=()=>{try{return places().map(x=>x.k).concat(["home"])}catch(e){return["home"]}};
 const playerOnce=role=>{
  for(let t=0;t<TRIES;t++){richK(S);try{deal();for(const c of deck||[])addP(role,c.n,"deck")}catch(e){E("deal",e)}}
  if(!isSrv()){for(const f of ["pool","artActs","directActs","illCards"])try{for(const c of window[f]()||[])addP(role,c.n,"deck")}catch(e){}
   try{const q=qinCard(S);if(q)addP(role,q.n,"garden")}catch(e){}}
  if(!isSrv())try{for(const a of talkOpts({kind:"emp"})||[])addP(role,a.n,"talk:emp")}catch(e){}
  /* role-parity-drift (19/11): live-servants (j95s) puts a «Chọn người theo hầu» card before her FIRST departure of the day (goTo returns at the card;
     the visit happens only after her tap). The probe = her tap «Đi một mình»: the card's own go([]) writes S.ent {d: today, ids: [], at: k} — the same
     write here, so goTo walks the real path (gates, khắc, people) instead of stopping at the card. S.ent is restored after each place. */
  for(const k of PLS()){richK(S);Q.length=0;const e0=S.ent;try{S.place="home";if(typeof j95sDay==="function")S.ent={d:j95sDay(),ids:[],at:k};goTo(k);Q.length=0}catch(e){E("goTo "+k,e)}finally{if(e0===undefined)delete S.ent;else S.ent=e0}
   for(const pp of (S.visit&&S.visit.people)||[]){try{for(const a of talkOpts(pp)||[])addP(role,a.n,"talk:"+pp.kind)}catch(e){E("talk "+pp.kind,e)}}}
  /* review coop-name-clash r1: a player maid meets the Hoàng hậu only where the seeded world puts her this khắc (a names change re-draws the
     seeded world: no place held her, so "Tố cáo … trước Hoàng hậu" was read as an NPC-only act although the player holds it). The
     Hoàng hậu is asked directly, as a visit person (j42 srvVisitOf: {kind:"srv",sk:"hh",ref}), like every NPC maid's hh probe */
  if(isSrv())try{const m=srvM(),q=rivals.find(v=>v&&v.queen&&v.alive!==false&&!v.out&&v!==m);if(q)for(const a of talkOpts({kind:"srv",sk:"hh",ref:q,name:q.name})||[])addP(role,a.n,"talk:srv-hh")}catch(e){E("talk srv-hh",e)}
  /* b-nameclash-rp (21/11, same family as the srv-hh fix above): her «Lục rương tìm chứng cứ» / «Lấy trộm son phấn» sit on the chest person j2 goTo puts
     in a palace whose owner is away (P.v not here); whether any visited palace was empty this khắc hung on the seeded day plan (the coop-name-clash
     names draw moved every owner home in the hh probe: hh N-ONLY cx2:chest / cx4:rougeSteal). The card has no rank gate; the NPC road (jagacts2
     cx2:chest, jagacts4 p4StealT) goes to the target's palace by rule. So the chest of every other consort is asked directly (owner away) */
  if(!isSrv())for(const v of liveRivals(true)){if(!v||v===S||v.out||v.alive===false)continue;try{for(const a of talkOpts({kind:"chest",ref:v,name:`Rương của ${v.name}`,ini:"Rương",col:"#8a6a4a",info:"Chủ nhân đi vắng"})||[])addP(role,a.n,"talk:chest-direct")}catch(e){E("talk chest",e)}}
  S.place="home";Q.length=0;
  /* m-meet world: the Hoàng hậu before her (the same person entry j42 srvVisitOf builds: kind srv, sk hh) */
  if(isSrv()&&window.__rpMeetHH){const q=window.__rpMeetHH;try{for(const a of talkOpts({kind:"srv",sk:"hh",ref:q,name:"Hoàng hậu "+q.name,ini:q.name.split(" ").pop()[0]})||[])addP(role,a.n,"talk:hh")}catch(e){E("talk hh",e)}}
  /* maid-acts-a (MAIN CHÍNH 90): the cung nữ road opens the SAME Hậu cung › Chủ tử card (j15 rvCard, act table jroad8 ROAD8.srv.acts) — scanned in the maid column
     too, so a consort act leaking onto her card is a P-ONLY gap (it used to be read only when !isSrv(): ~50 consort acts there went unseen) */
  if(isSrv())for(let i=0;i<rivals.length;i++){const v=rivals[i];if(v===S)continue;try{for(const n of lab(rvCard(v,i)))addP(role,n,"rv-srv")}catch(e){E("rv-srv",e)}}
  if(!isSrv()){for(let i=0;i<rivals.length;i++){const v=rivals[i];if(v===S)continue;try{for(const n of lab(rvCard(v,i)))addP(role,n,"rv")}catch(e){E("rv",e)}try{for(const a of topicOpts(v)||[])addP(role,a.n,"topic")}catch(e){E("topic",e)}}
   for(const f of ["staffTabHTML","staffHTML","facHTML","artTabHTML","invHTML","wkTabHTML","petPanelHTML","kidTabHTML"])try{for(const h of tabAll(f))for(const n of lab(h))addP(role,n,f)}catch(e){E(f,e)}
   /* B3: the item-detail menu (jinv kinvOpen: Dùng / Bán / Nghiệm độc / Tặng …) opens per item in a kit modal — read each item's buttons */
   try{const M0=window.kitModal;let mh="";window.kitModal=o=>{mh+=(o&&o.html)||""};try{for(const it of kinvItems()||[]){mh="";try{kinvOpen(it)}catch(e){}for(const n of lab(mh))addP(role,n,"kinvOpen")}}finally{window.kitModal=M0}}catch(e){E("kinvOpen",e)}}
  /* E22e round C: the master has an errand for her this buổi (explicit world, the twin of the NPC j95 errand gate in npcOpts): SRVA.errand.offer
     forced for this read only, her drawn errand cleared before and restored after (the card was there only when the seeded draw came up) */
  else{const E0=SRVA.errand.offer,R0=S.srv&&S.srv.err;try{SRVA.errand.offer=100;if(S.srv)S.srv.err=null;for(const c of srvCards()||[])addP(role,c.n,"srvCards")}catch(e){E("srvCards",e)}finally{SRVA.errand.offer=E0;if(S.srv)S.srv.err=R0}try{/* Hậu cung › Đồng liêu = the shared pager (j42 srvStaffTabHTML, one card at a time, its groups = kit sub-tabs): tabAll walks every card and every group, like the consort's Cung nhân tab */for(const h of tabAll("srvStaffTabHTML"))for(const n of lab(h))addP(role,n,"srvStaff")}catch(e){E("srvStaff",e)}}
  if(!isSrv())gates(role,S)};
 const playerLabels=(role,VL)=>{for(const [vn,f] of (VL||VAR)){const W=snapW(),W2=/^m-/.test(vn)?mSnap():null;SEED(7);try{rich(S);f(S)}catch(e){E("pvar "+vn,e)}playerOnce(role);restoreW(W);if(W2)mRest(W2)}};
 if(phase==="consort"){
  const v=liveRivals(true).find(x=>!x.queen&&!x.out&&!x.confined);window.__rpV=v;
  for(let r=0;r<=6;r++){v.rank=r;v.queen=false;npcOpts("t"+(r+1),v,["consort"])}
  let q=queenP();if(!q||q===S){v.queen=true;v.rank=6;const i=rivals.indexOf(v);rivals.splice(i,1);rivals.unshift(v);q=v}
  for(const t of liveRivals(true).filter(x=>x!==q&&!x.out))(q.rl=q.rl||{})[t.id]=60;
  npcOpts("hh",q,["consort","hh"]);
  if(q===v){v.queen=false;v.rank=5}
  for(let r=0;r<=7;r++){if(!RANKS_P.includes(r))continue;S.rank=r;if(r===7)for(const x of rivals)if(x!==S)x.queen=false;playerLabels(r===7?"hh":"t"+(r+1))}
  S.rank=0;
}
 if(phase==="maid"){
  try{const L=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))if(s&&s.role==="maid"&&g0(s)==="maid")L.push(s);for(const s of L.slice(0,16))npcOpts("maid",s,["maid"],VAR.concat(MVAR))}catch(e){E("npcMaid",e)}
  playerLabels("maid",VAR.concat(MVAR));
  /* maid:pil (Lén giữ đồ Nội vụ phủ phát, parallel-time r5): ONE act, two timings — her card (j42 srvCards, jeitem eitPilMaidOk) and the NPC servant's
     monthly pass when the goods come (jeitem eitPilfer → eitPilWho by ag2Ch → eitPilNpc: the same eitPilSee odds, the same four answers eitPilJudge).
     The day options never hold the monthly pass, so both sides are judged by the RULE (as the target ladder): the same lòng states for both doers
     (as she is, and low: 10), with her master holding a piece Nội vụ phủ gave this month (the pass runs only when goods came). */
  try{const P=BAL.eit.pil;const m=srvM();const t0=S.tin;let tmp=null;
   if(m&&typeof eitPilPick==="function"&&!eitPilPick(m)){const k=Object.keys(IT).find(x=>{try{return itm(x).pr>0}catch(e){return false}});if(k){tmp={k,from:"noivu",d:S.turn};m.inv=m.inv||[];m.inv.push(tmp)}}
   for(const tin of [t0,10]){S.tin=tin;if(eitPilMaidOk())addP("maid","Lén giữ đồ Nội vụ phủ phát","pil-rule")}S.tin=t0;if(tmp)m.inv.splice(m.inv.indexOf(tmp),1);
   const L=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))if(s&&s.role==="maid"&&g0(s)==="maid")L.push([v,s]);
   for(const [v,s] of L.slice(0,16)){const l0=s.loyal;for(const lo of [l0,10]){s.loyal=lo;if(eitPilWho(v).some(c=>c.s===s))addN("maid","maid:pil","eitPilWho")}s.loyal=l0}}catch(e){E("pil",e)}
  /* PROMOTION (player): srvRise, then the same S with the maid origin removed (= a born Đáp ứng in the same world): the act sets must be equal */
  try{S.age=Math.max(S.age||0,18);srvRise("role-parity scan");res.upMe={ok:!isSrv()&&S.rank===0,rank:S.rank};S.preg=0;S.hidden=false;playerLabels("up");
   const sv=S.srv;delete S.srv;playerLabels("t1me");S.srv=sv}catch(e){E("upMe",e)}
  /* B4: the NPC promotion runs in the SAME world as hers (this maid-life page, right after her srvRise): the «up» column compares one world, not two */
  /* PROMOTION (NPC): an NPC maid raised by amRise, then her exact clone with the maid origin removed (= a born Đáp ứng): the act sets must be equal */
  try{const o=liveRivals(true).find(x=>!x.out&&x!==S&&(x.staff||[]).some(s=>s&&s.role==="maid"))||liveRivals(true).find(x=>!x.out&&x!==S);
   let m=(o.staff||[]).find(s=>s&&s.role==="maid");if(!m){fillStaff(o,true);m=(o.staff||[]).find(s=>s&&s.role==="maid")}
   const before=rivals.length;amRise(m,o,"send");const n=rivals[rivals.length-1];res.upNpc={ok:rivals.length>before&&n.rank===0,grp:g0(n),rank:n.rank,fromMaidOf:n.fromMaidOf||null};
   n.preg=0;n.hidden=false;const b=JSON.parse(JSON.stringify(Object.assign({},n,{staff:null,maid:null})));b.id=++rid;b.staff=n.staff;b.maid=n.maid;for(const k of ["fromMaid","fromMaidOf","wasMaid"])delete b[k];if(b.ag)delete b.ag.o;rivals.push(b);
   for(const t of liveRivals(true))if(t!==n&&t!==b){try{(t.rl=t.rl||{})[b.id]=(t.rl||{})[n.id];if(t.aff)t.aff[b.id]=t.aff[n.id];if(t.oan)t.oan[b.id]=t.oan[n.id]}catch(e){}}
   npcOpts("up",n,["consort"]);npcOpts("t1born",b,["consort"]);rivals.splice(rivals.indexOf(b),1)}catch(e){E("upNpc",e)}}
 const LT={};for(const k in TW)LT[k]=[TW[k].n];for(const k in ACT)if(ACT[k]&&ACT[k].n)LT["harm:"+k]=[ACT[k].n];
 for(const k in (window.AGC2BTN||{}))LT["cx2:"+k]=[AGC2BTN[k]];for(const k in (window.AGC3BTN||{}))LT["cx3:"+k]=[AGC3BTN[k]];for(const k in (window.AGC4BTN||{}))LT["cx4:"+k]=[AGC4BTN[k]];
 res.LT=LT;Math.random=R0;return res}

async function scan(html,opt){opt=opt||{};const {chromium}=require('playwright');const URL=/^(https?|file):/.test(html)?html:'file://'+path.resolve(html);
 const b=await chromium.launch();const out={P:{},N:{},err:[],pageErr:[]};
 /* map-places mem fix r2 (21/11): the consort phase used to run its 8 player roles in ONE page.evaluate = one synchronous task of ~1700 goTo+render.
    Inside one task the game's own deferred UI timers (renderStage / showModal / kitFrame / kmmSched layout passes, ~150 per goTo) never run, so the
    detached stage DOM they close over is never freed: renderer RSS grew ~1.2 GB per role (LIVE b1033eb0 peak 12.5 GB; +2 places = OOM at 13.7 GB).
    Real play is one tap = one task (800 goTo as separate tasks: ~440 MB, LIVE = branch). The fix runs each consort player role in its own fresh page
    (the world set-up and the NPC part run again in each page, seeded the same): every role is probed from the SAME world, whatever its order
    (before, a later role saw the world left by the earlier ones); rows are the union, as before. */
 const PAGES=[0,1,2,3,4,5,6,7].map(r=>["consort",[r]]).concat([["maid",null]]);
 for(const [phase,ranks] of PAGES){const p=await b.newPage({viewport:{width:755,height:1000}});p.on('pageerror',e=>{const x=phase+": "+e.message;if(!out.pageErr.includes(x))out.pageErr.push(x)});
  /* part 2: one deterministic page (as ag2perf-diff): seeded Math.random + crypto, frozen clocks — a row never flips between runs */
  await p.addInitScript(()=>{let x=424242;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};let y=777;crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++){y=(y*1103515245+12345)%2147483648;a[i]=Math.floor(y/2147483648*4294967296)%(a instanceof Uint8Array?256:4294967296)}return a};performance.now=()=>1000;Date.now=()=>1763000000000});
  /* part-1 fix: no network at all (as ag2perf-deeds): a CDN build (build_site.sh) otherwise loads the CDN asset index while the probe runs, so the
     same game gave different rows on the CDN build and the plain build — media and every http(s) request are aborted, file:// stays */
  await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  /* part 2: the same world every run (the life start() draws was unseeded: rows that depend on a draw flipped between runs) */
  await p.evaluate(({phase})=>{let sd=20261118;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
   for(let i=0;i<60&&(phase==="maid"?!isSrv():isSrv());i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}},{phase});
  const r=await p.evaluate(inPage,{phase,ranks,TRIES:opt.tries||4});
  Object.assign(out.P,r.P);for(const role in r.N){const T=out.N[role]=out.N[role]||{};for(const k in r.N[role])T[k]=Object.assign(T[k]||{},r.N[role][k])}for(const x of r.err.map(x=>phase+": "+x))if(!out.err.includes(x))out.err.push(x);if(r.upNpc)out.upNpc=r.upNpc;if(r.upMe)out.upMe=r.upMe;out.LT=Object.assign(out.LT||{},r.LT);await p.close()}
 await b.close();return build(out)}

/* ---------------- table ---------------- */
function build(o){const LT=Object.assign({},o.LT);for(const k in KEYLAB)LT[k]=(LT[k]||[]).concat(KEYLAB[k]);
 const keyOfLabel=n=>{const hits=[];for(const k in LT)for(const l of LT[k]){if(!l)continue;if(n===l||(l.endsWith(" ")||n.length>l.length)&&n.startsWith(l)&&/^[\s:{(]|^$/.test(n.slice(l.length,l.length+1)||" "))hits.push([k,l.length])}
  hits.sort((a,b)=>b[1]-a[1]);return hits.length?hits.filter(h=>h[1]===hits[0][1]).map(h=>h[0]):[]};
 /* player keys per role: gate keys (§k) + labels mapped to keys; unmapped labels stay as label rows */
 const PK={},UNM={};for(const role in o.P){PK[role]={};for(const n in o.P[role]){if(n[0]==="§"){PK[role][n.slice(1)]=1;continue}
   let ks=keyOfLabel(n);/* one label, two roads: a maid key counts in the maid column, a consort key (cx*) in the consort columns */
   if(ks.length>1){const mk=ks.filter(k=>k.startsWith("maid:")),ck=ks.filter(k=>/^cx\d?:/.test(k));if(mk.length&&ck.length)ks=role==="maid"?ks.filter(k=>!/^cx\d?:/.test(k)):ks.filter(k=>!k.startsWith("maid:"))}
   /* B3: one label, two acts by SOURCE: «Ly gián» is the faction card's cx3:facDiv only on the Phe phái tab (facHTML); elsewhere (Hành sự deck,
      rival card) it is the ACT harm:lygian — the probe used to credit her with cx3:facDiv from the deck card (P-ONLY by mapping only) */
   if(ks.length>1){const src=Object.keys(o.P[role][n]);const k2=ks.filter(k=>!SRCONLY[k]||src.some(x=>SRCONLY[k].test(x)));if(k2.length)ks=k2}
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
