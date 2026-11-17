/* ================= jshelf: NƠI TRƯNG BÀY — a display shelf per person + DWELLING xa xỉ + plant care (owner OD 17/11 ~18:30Z (A) + ~18:00Z s35 Lượt 26) =================
   Brief: dev/handover/briefs/display-shelf-build.md (handover branch). Numbers: BAL.shelf (this file, one table). Reuses, never rebuilds:
   · items = ONE table BAL.shelf.it (12 groups / 70 pieces, dev/research/display-shelf-items.md): existing IT pieces + new décor (IT kd "Bày biện") + her own
     handmade works (j83 tp); one luxury number per piece = jlux luxPiece (new décor: the kit formula luxVal on its BAL grade + price).
   · rank: a piece above her rank may stand only if it is ngự ban; imperial pieces never; anyone may accuse (seen / tip / guess) — owner OD 17/11 ~18:25Z (d).
   · rank allowance = jinv luxAllow (BAL.lux.allow) × BAL.shelf.allowF — a SECOND score, separate from the worn-outfit xa xỉ (owner: "hai điểm xa xỉ").
   · sightings / evidence = the jdress model (p.dsn) → p.shn[wdKey(t)]: SAME place (visit), Dò la (spyFind, both ways), her maid's Sai đi dò la,
     rumours (knowledge only, never proof: jtruth rule 4).  Accuse = the existing "Tố xa xỉ" act (jdress ACT.xx) gains a second cause: the room.
   · NPC visits = a new shared deed TW "call" (Ghé chơi) in the agent day plan (jagent AGSOC), landing at the target's palace; her visiting them =
     walking into their palace (j2 goTo). Same rules both ways (OD:L1386).
   · mood = the ONE jemo bar (emoSet); plants = the jpet care model (decay a week, servants by lòng/traits, neglect → withered → dead pot).
   STORAGE (old saves: nothing to migrate, all lazy): p.shelf = {g:{<group>: entry}, sd} — a displayed entry is MOVED out of p.inv, so it cannot be
   gifted / sold / used / worn until taken down (owner (1)); jil (one item ledger) counts shelf entries as the owner's (ilSlots / ilOut wrapped).
   Plant entry fields: pc (care 0..100), pz (weeks at 0), pm (week of her own care). Seen: p.shn[key] = {w, sc, bud, n, sig, by, pf (proof)}.
   UI: KIT FIRST — the left-rail icon, painted shelf backdrop and cut-out items are KIT REQUESTS (dev/kit/KIT_REQUESTS.md 17/11 display-shelf);
   this module only feeds data: shelfView(p). Interim entry points are kit parts only (item panel act card "Trưng bày", kitModal + kitRows + pbtn).
   ================================================================================================================================================ */
Object.assign(BAL,{shelf:{
 /* the groups: ONE displayed piece per group (owner). 12 groups / 70 pieces = dev/research/display-shelf-items.md (handover 90713f53), history expert */
 groups:[["hoa","Hoa cảnh"],["su","Đồ sứ"],["ngoc","Ngọc ngoạn"],["thuhoa","Thư họa"],["huong","Hương lô"],["chuong","Chuông gió"],
  ["phong","Bình phong, rèm"],["tay","Đồ Tây dương"],["quat","Quạt"],["chim","Chim cá"],["nhac","Nhạc khí"],["van","Văn phòng, đèn"]],
 /* ONE table of displayable pieces. g group · rk lowest rank (0 Đáp ứng … 7 Hoàng hậu) that may place it; above it only a ngự ban piece (from "emp") may stand
    (owner OD 17/11 ~18:25Z (d)); imp:1 = imperial only (Hoàng thượng / Thái hậu): no consort may ever place it, no source gives it.
    New pieces: gr = kit grade (0 Thường … 4 Ngự tứ) + pr = price → luxury by the kit formula luxVal (LUX_V[gr] + pr/10, jinv); existing IT pieces keep their own.
    care: "cay" plants / "nuoi" birds & fish (the jpet care model), hw = tuần untended until it withers; per = tuần it lasts on the shelf (incense burns).
    src: m Nội vụ phủ shop · n ngự ban (bestow, a décor list) · p a consort's gift / her own buying (NPC seeds) · v Nội vụ phủ issue */
 it:{
  /* 1 Hoa cảnh */
  lanquy:{g:"hoa",rk:0,care:"cay",hw:3,src:"mp"},cuc:{g:"hoa",rk:0,gr:0,pr:40,care:"cay",hw:2,src:"mp"},maitrang:{g:"hoa",rk:1,gr:1,pr:100,care:"cay",hw:3,src:"mp"},
  thuytien:{g:"hoa",rk:0,gr:0,pr:20,care:"cay",hw:2,src:"mpv"},maudon:{g:"hoa",rk:2,gr:1,pr:200,care:"cay",hw:2,src:"n"},haiduong:{g:"hoa",rk:2,gr:1,pr:140,care:"cay",hw:3,src:"mp"},
  caytung:{g:"hoa",rk:3,gr:2,pr:240,care:"cay",hw:5,src:"n"},phatthu:{g:"hoa",rk:2,gr:1,pr:160,care:"cay",hw:3,src:"p"},
  caykho:{g:"hoa",rk:0,gr:0,pr:0,dead:1},/* a plant left to die (same piece, the ledger keeps it) */
  /* 2 Đồ sứ */
  binhsu:{g:"su",rk:0,gr:0,pr:140,src:"m"},dialt:{g:"su",rk:1,gr:1,pr:140,src:"mp"},maibinh:{g:"su",rk:2,gr:1,pr:220,src:"np"},cuudao:{g:"su",rk:2,gr:1,pr:240,src:"np"},
  phanthai:{g:"su",rk:4,gr:2,pr:300,src:"n"},dauthai:{g:"su",rk:5,gr:3,pr:260,src:"n"},nhudieu:{g:"su",imp:1,gr:4,pr:360},
  /* 3 Ngọc ngoạn */
  holo:{g:"ngoc",rk:0,gr:0,pr:80,src:"mp"},tuan:{g:"ngoc",rk:1,gr:1,pr:120,src:"mp"},nhuy:{g:"ngoc",rk:2,gr:1,pr:240,src:"np"},sanho:{g:"ngoc",rk:4,gr:2,pr:280,src:"n"},
  caithao:{g:"ngoc",rk:4,gr:3,pr:200,src:"n"},ngocson:{g:"ngoc",imp:1,gr:4,pr:320},ngocty:{g:"ngoc",imp:1,gr:4,pr:460},
  /* 4 Thư họa (+ her own Bức tranh / Bức thư pháp, BAL.shelf.tp; the Biển vàng / Biển ngự bút hang at the door, never on the shelf) */
  tranhco:{g:"thuhoa",rk:1,src:"mp"},caudoi:{g:"thuhoa",rk:1,gr:0,pr:120,src:"mpv"},chuphuc:{g:"thuhoa",rk:2,gr:1,pr:240,src:"n"},mynhan:{g:"thuhoa",rk:4,gr:2,pr:220,src:"n"},
  /* 5 Hương lô */
  huongtram:{g:"huong",rk:0,per:1,src:"mp"},luhuong:{g:"huong",rk:0,gr:0,pr:100,src:"mp"},tuyenduc:{g:"huong",rk:2,gr:1,pr:200,src:"np"},
  phaplam:{g:"huong",rk:4,gr:2,pr:240,src:"n"},luhac:{g:"huong",rk:3,gr:1,pr:240,src:"p"},hoannghi:{g:"huong",rk:2,gr:1,pr:180,src:"p"},
  /* 6 Chuông gió */
  chuongso:{g:"chuong",rk:0,gr:0,pr:20,src:"mp"},chuonggio:{g:"chuong",rk:0,gr:0,pr:80,src:"m"},chuongngoc:{g:"chuong",rk:2,gr:1,pr:180,src:"np"},
  chuongpl:{g:"chuong",rk:4,gr:2,pr:260,src:"n"},thietma:{g:"chuong",rk:3,gr:1,pr:140,src:"mv"},
  /* 7 Bình phong, rèm */
  remtruc:{g:"phong",rk:0,gr:0,pr:20,src:"mv"},banbinh:{g:"phong",rk:1,gr:1,pr:100,src:"mp"},remlua:{g:"phong",rk:1,gr:1,pr:120,src:"mp"},
  remchau:{g:"phong",rk:2,gr:1,pr:260,src:"np"},bpxacu:{g:"phong",rk:4,gr:2,pr:300,src:"n"},bpngubut:{g:"phong",rk:5,gr:3,pr:220,src:"n"},
  /* 8 Đồ Tây dương */
  tuminh:{g:"tay",rk:3,gr:2,pr:300,src:"n"},hopnhac:{g:"tay",rk:2,gr:1,pr:280,src:"n"},guongtay:{g:"tay",rk:2,gr:1,pr:220,src:"n"},
  kinhvv:{g:"tay",rk:4,gr:2,pr:220,src:"n"},diacau:{g:"tay",rk:5,gr:2,pr:200,src:"n"},
  /* 9 Quạt */
  quattron:{g:"quat",rk:0,gr:0,pr:60,src:"mp"},quatgap:{g:"quat",rk:1,gr:0,pr:120,src:"mp"},quatdh:{g:"quat",rk:2,gr:1,pr:200,src:"n"},
  quatcong:{g:"quat",rk:4,gr:2,pr:280,src:"n"},quattri:{g:"quat",imp:1,gr:4,pr:210},
  /* 10 Chim cá (décor creatures; real pets stay in jpet) */
  hoami:{g:"chim",rk:1,gr:1,pr:120,care:"nuoi",hw:2,src:"mp"},vet:{g:"chim",rk:2,gr:1,pr:240,care:"nuoi",hw:2,src:"np"},kimngu:{g:"chim",rk:1,gr:1,pr:140,care:"nuoi",hw:2,src:"mp"},
  de:{g:"chim",rk:0,gr:0,pr:40,care:"nuoi",hw:1,src:"mp"},longtrong:{g:"chim",rk:0,gr:0,pr:0,dead:1},/* a creature left to die: the empty cage stays (ledger) */
  /* 11 Nhạc khí */
  saotruc:{g:"nhac",rk:0,gr:0,pr:60,src:"mp"},dancoc:{g:"nhac",rk:2,src:"mp"},tyba:{g:"nhac",rk:1,gr:1,pr:200,src:"mp"},dantranh:{g:"nhac",rk:1,gr:1,pr:140,src:"mp"},
  ngocdich:{g:"nhac",rk:4,gr:2,pr:260,src:"n"},
  /* 12 Văn phòng, đèn */
  nghien:{g:"van",rk:1,src:"mp"},tranchi:{g:"van",rk:1,gr:1,pr:120,src:"mp"},thaiho:{g:"van",rk:3,gr:2,pr:200,src:"np"},cungdang:{g:"van",rk:0,gr:0,pr:60,src:"mv"},
  daminh:{g:"van",rk:5,gr:3,pr:280,src:"n"}},
 tp:{tranh:"thuhoa",tho:"thuhoa",bhoa:"hoa"},/* her own handmade works (j83 IT.tp, wk.kind) that may stand on the shelf; luxury by bậc (kit grade) */
 shopN:2,           /* Nội vụ phủ: each restock adds shopN décor pieces (src m) to her tray (the old shop list keeps its balance) */
 bestO:25,          /* a bestowal (j8 bestow) is a décor piece bestO in 100 (roll) (src n), may be above her rank (ngự ban, owner (d)) */
 ui:0,              /* 1 = her interim entry points (item-panel act card) are on; stays 0 until the kit shelf part is KIT READY (no one-way door: she must be able to take pieces down) */
 allowF:1,          /* dwelling allowance = her rank allowance (jinv luxAllow) × allowF */
 plainF:.15,lv3:1.5,/* sc below plainF × allowance = đơn sơ; above allowance = xa hoa; above lv3 × allowance = quá xa xỉ */
 /* what a visitor's eye does (once per visitor and owner every see.cdW tuần) */
 see:{cdW:4,supAff:[0,0,-4,-8],ghen:[0,0,3,6],npcOanK:.5,fitAff:2,nguGhen:2,witherAff:-2,seenW:12},
 /* her mood (and every NPC's), weekly, the one jemo bar */
 mood:{fit:22,lux:34,wither:20},
 rum:{lv:2,o:12},   /* a room at or above lv (or with a piece above the owner's rank) spreads: each consort hears it o in 100 a week (roll) (a tip, never proof) */
 rep:1,             /* quá xa xỉ: tiếng xa hoa (jlux p.luxRep) +rep each month */
 /* NPC shelves: seed pieces by rank (0..7) on first look, then they arrange their chest weekly within capF × allowance (proud traits capHi) */
 npc:{seed:[0,1,1,2,2,3,3,4],capF:.9,capHi:1.3,proud:["Kiêu ngạo","Tham vọng"],care:.8},
 /* plants + creatures (jpet model): care 0..100, falls (start-wither)/hw a tuần; servants care by default (0 khắc), quality by lòng and traits; her own care = the minigame */
 plant:{start:80,hw:3,wither:35,deadW:3,witherLux:.3,khacSelf:1,/* OWNER DECIDED (OD 17/11 ~18:15Z, option 1): servants care plants + pets at 0 khắc to her; 'Tự tay chăm' = khacSelf khắc; ONE 'Chăm sóc' act */srvBase:.45,srvLoyK:.006,srvMax:1.1,qCut:[.6,.9],/* servant care words: below qCut[0] vụng về, below qCut[1] tạm được, else khéo tay */srvTr:{"Cẩn thận":.2,"Chăm chỉ":.2,"Lười biếng":-.3,"Vụng về":-.2},
  gain:[10,45],game:{rounds:3,steps:10,band:[6,8],ms:[260,170]}},
 /* the shared deed "Ghé chơi" (TW call): friendship + a look at the room */
 visit:{rel:3,w:.6,affMin:-15,dayP:12,base:5,herW:15,upW:5},/* dayP: a consort who keeps her schedule this buổi still drops in on someone dayP in 100 (owner: daily visits); target weight base + liking (+ her, + a superior) *//* anyone not on bad terms may call (owner: NPCs come to her room as she goes to theirs) */
 seeDeeds:["call","visit","help","apol","provoke","humil","test","mediate","warn"],
 /* Tố xa xỉ / Tố vượt phẩm, the room cause. Nobody knows the scores (owner (d)): a charge rests on what one SAW, a TIP (rumour) or a GUESS; the inquiry settles the truth.
    guessO: a hostile NPC with nothing seen / heard still accuses on a guess guessO in 100 a month (npcO in 100 with something seen / heard); vp*: a ngự ban piece above rank is allowed, so a proven charge only sends it back to the chest */
 acc:{cdA:48,cdT:72,hostMin:50,ghenMin:70,npcO:15,guessO:2,ducT:-2,danhT:-4,repT:2,danhA:2,rel:-10,waveDanhA:-2,falseDanhA:-5,falseDanhT:2,falseRel:-12,vpDanhT:-2}}});

/* ---------- new décor pieces (IT, kd "Bày biện"): only earned (bought, given, bestowed); names + one line each (player text, VANPHONG) ---------- */
(function(){const D={
 cuc:["Chậu cúc thu","Cúc vàng nở tiết trùng cửu, tượng ẩn sĩ sống lâu"],maitrang:["Chậu mai trắng","Mai trắng nở trong tuyết, giữ tiết thanh cao"],
 thuytien:["Chậu thủy tiên","Củ thủy tiên ủ cho nở đúng Tết, rẻ mà xinh"],maudon:["Chậu mẫu đơn","Hoa vương, tượng phú quý; người phẩm thấp bày e quá phô"],
 haiduong:["Chậu hải đường","Hải đường đỏ thắm, tượng ngọc đường phú quý"],caytung:["Chậu tùng thọ","Tùng uốn thế trong chậu men, tượng thọ, ít phải chăm"],
 phatthu:["Chậu Phật thủ","Quả Phật thủ thơm cả phòng, tượng phúc thọ"],caykho:["Chậu cây khô","Cây trong chậu đã chết khô vì bỏ bê"],
 binhsu:["Bình sứ thanh hoa","Bình sứ men lam vẽ sen, nhà khá giả nào cũng có"],dialt:["Đĩa men ngọc Long Tuyền","Đĩa men xanh như ngọc, quà nhã nhặn"],
 maibinh:["Mai bình men lam","Bình dáng mai để cắm một cành mai"],cuudao:["Đĩa cửu đào","Đĩa vẽ chín quả đào, quà mừng thọ"],
 phanthai:["Bình phấn thái hoa điểu","Sứ phấn thái vẽ hoa chim, của lò ngự dụng"],dauthai:["Chén đấu thái","Chén vẽ gà mái con, báu vật ngự dụng"],
 nhudieu:["Bình men Nhữ","Sứ men thiên thanh hiếm có, của riêng bậc chí tôn"],
 holo:["Hồ lô ngọc nhỏ","Hồ lô ngọc, tượng phúc lộc"],tuan:["Tư ấn ngọc bích","Con dấu riêng khắc tên hiệu, đóng lên tranh chữ"],
 nhuy:["Như ý ngọc","Như ý ngọc bích, vật ngự ban cầu điều tốt lành"],sanho:["Cây san hô đỏ","San hô đỏ biển nam dựng trên đế, vật tiến cống"],
 caithao:["Cải thảo phỉ thúy","Cải thảo ngọc có châu chấu đậu, tượng con cháu đầy đàn"],ngocson:["Núi ngọc Đại Vũ trị thủy","Núi ngọc chạm, chỉ bậc chí tôn mới có"],
 ngocty:["Ngọc tỷ nhỏ","Ấn ngọc của bậc chí tôn; kẻ khác giữ là đại bất kính"],
 caudoi:["Câu đối đỏ thêu chỉ vàng","Đôi câu đối treo trong phòng ngày Tết"],chuphuc:["Chữ Phúc ngự bút","Chữ Phúc Hoàng thượng tự tay viết ban dịp Tết"],
 mynhan:["Tranh mỹ nhân","Một bức trong bộ mười hai mỹ nhân, của cung đình"],
 luhuong:["Lư hương đồng nhỏ","Lư đồng ba chân, khói trầm thoang thoảng"],tuyenduc:["Lư hương Tuyên Đức","Lư đồng đỏ đời Tuyên Đức, người sành đồ quý"],
 phaplam:["Lư pháp lam bốn chân","Lư men pháp lam, đồ xưởng ngự dụng"],luhac:["Lư hạc","Lư hình hạc đứng, khói ra từ mỏ, tượng thọ"],
 hoannghi:["Hoan Nghi hương","Hương xông phòng thơm ngọt"],
 chuongso:["Chuông gió vỏ sò","Vỏ sò xâu dây tơ, gió qua kêu khẽ"],chuonggio:["Chuông gió đồng","Chuông đồng treo hiên, gió qua kêu khẽ"],
 chuongngoc:["Chuông gió ngọc khánh","Những miếng ngọc khánh xâu lại, tiếng trong như ngọc"],chuongpl:["Chuông gió pha lê Tây dương","Pha lê tiến cống, tiếng khác hẳn đồng"],
 thietma:["Thiết mã nhỏ","Chuông đồng treo góc mái hiên"],
 remtruc:["Rèm trúc","Rèm trúc xanh che nắng hè"],banbinh:["Bình phong thêu để bàn","Bình phong nhỏ thêu Tô Châu"],remlua:["Rèm lụa mỏng","Rèm lụa mỏng, gió lùa nhẹ"],
 remchau:["Rèm châu","Rèm kết hạt châu, lấp lánh dưới đèn"],bpxacu:["Bình phong khảm xà cừ","Bình phong sơn mài khảm xà cừ"],
 bpngubut:["Bình phong ngự bút","Bình phong vẽ tứ quân tử, nét bút Hoàng thượng"],
 tuminh:["Đồng hồ tự minh chung","Đồng hồ Tây dương tự gõ giờ"],hopnhac:["Hộp nhạc Tây dương","Hộp lên dây, mở ra tự phát nhạc"],
 guongtay:["Gương pha lê Tây","Gương Tây dương soi rõ hơn gương đồng"],kinhvv:["Kính viễn vọng","Ống kính Tây dương nhìn xa"],diacau:["Địa cầu nhỏ","Quả cầu vẽ đất trời, của Tây dương tiến"],
 quattron:["Quạt tròn lụa","Quạt tròn lụa trắng; người ta hay ví với kẻ bị bỏ quên khi thu sang"],quatgap:["Quạt gấp trúc vẽ","Quạt gấp vẽ tay, quà thường tặng nhau"],
 quatdh:["Quạt đàn hương chạm","Quạt gỗ đàn hương chạm thủng, phe phẩy thơm"],quatcong:["Quạt lông công","Quạt lông đuôi công, đồ nghi trượng"],
 quattri:["Quạt lông trĩ","Quạt dài lông trĩ, chỉ dùng trong nghi trượng của bậc chí tôn"],
 hoami:["Chim họa mi lồng trúc","Họa mi hót sớm trong lồng trúc: phải cho ăn"],vet:["Chim vẹt biết nói","Vẹt học tiếng người, nghe gì nói nấy: phải cho ăn"],
 kimngu:["Chậu cá vàng","Cá vàng bơi trong chậu sứ: phải thay nước"],de:["Dế trong lồng","Dế mèn trong lồng con, gáy đêm: phải cho ăn"],
 longtrong:["Lồng trống","Lồng chim, chậu cá bỏ trống vì không ai chăm"],
 saotruc:["Sáo trúc treo giá","Ống sáo trúc treo trên giá"],tyba:["Tỳ bà lưng ngà","Tỳ bà khảm ngà"],dantranh:["Đàn tranh nhỏ","Đàn tranh dây tơ"],
 ngocdich:["Sáo ngọc","Sáo chạm bằng ngọc, hiếm có"],
 tranchi:["Chặn giấy ngọc","Chặn giấy bằng ngọc trên bàn viết"],thaiho:["Đá Thái Hồ nhỏ","Hòn đá Thái Hồ dáng lạ, kẻ sĩ ưa chuộng"],
 cungdang:["Cung đăng lụa","Đèn lụa treo trong điện"],daminh:["Dạ minh châu","Ngọc châu sáng trong đêm"]};
 const P=BAL.shelf.it;for(const k in D){if(IT[k])continue;const s=P[k];IT[k]={n:D[k][0],kd:"Bày biện",d:`${D[k][1]} · bày ở Nơi trưng bày`,pr:s.pr|0,rk:0,tg:s.dead||s.imp?[]:["rv","th","hh"],gv:3}}})();
/* Nội vụ phủ tray + ngự ban: décor joins without changing the old lists' balance */
(function(){const P=BAL.shelf.it,has=(k,c)=>!!(P[k]&&!P[k].imp&&!P[k].dead&&(P[k].src||"").includes(c)&&IT[k]);window.SHELF_SRC=c=>Object.keys(P).filter(k=>has(k,c));
 if(typeof restock==="function"){const r0=restock;restock=function(){const r=r0.apply(this,arguments);try{if(S&&Array.isArray(S.shop))for(const k of shuf(SHELF_SRC("m")).slice(0,BAL.shelf.shopN))if(!S.shop.includes(k))S.shop.push(k)}catch(e){console.error("shelf restock",e)}return r};window.restock=restock}
 if(typeof bestow==="function"){const b0=bestow;bestow=function(p,why){if(!BEST||why==="son"||!roll(BAL.shelf.bestO))return b0.apply(this,arguments);const w=BEST[why]?why:"night",L0=BEST[w];
   BEST[w]=SHELF_SRC("n");try{return b0.apply(this,arguments)}finally{BEST[w]=L0}};window.bestow=bestow}})();
/* the one luxury number per piece (jlux luxPiece): a new décor piece = the kit formula luxVal on its BAL grade + price */
function shelfLuxK(k){const s=BAL.shelf.it[k];return s&&s.gr!=null?LUX_V[s.gr]+Math.round((s.pr||0)/10):null}
(function(){if(typeof luxPiece!=="function")return;const l0=luxPiece;luxPiece=function(k){const v=shelfLuxK(k);if(v!=null)return v;return l0.apply(this,arguments)};window.luxPiece=luxPiece})();

/* ---------- data ---------- */
const SHELF_LV=["Đơn sơ","Hợp phẩm","Xa hoa","Quá xa xỉ"];
function shelfGrp(k){const s=BAL.shelf.it[k];return s?s.g:null}
/* the group of a chest entry: a table piece by its key, her own handmade work (j83 IT.tp) by its kind */
function shelfGrpE(e){if(!e)return null;if(e.k==="tp")return e.wk&&BAL.shelf.tp[e.wk.kind]||null;return shelfGrp(e.k)}
function shelfGName(g){const x=BAL.shelf.groups.find(z=>z[0]===g);return x?x[1]:g}
/* living pieces (plants, birds, fish) need care: "cay" / "nuoi" (word set SHELF_CARE); everything else none */
const SHELF_CARE={cay:{bad:"héo úa",act:"Tưới, tỉa lá",stop:"Dừng tưới",how:"Nước dâng dần: chạm Dừng tưới khi vừa đủ.",dead:"caykho",died:"đã chết khô",fresh:"tươi lại",kind:"chậu cây"},
 nuoi:{bad:"ủ rũ",act:"Cho ăn, thay nước",stop:"Dừng tay",how:"Mồi, nước đổ dần: chạm Dừng tay khi vừa đủ.",dead:"longtrong",died:"đã chết, chỉ còn lồng trống",fresh:"khỏe lại",kind:"chim cá"}};
function shelfCareK(e){const s=e&&BAL.shelf.it[e.k];return s&&s.care||""}
function shelfIsPlant(e){return !!shelfCareK(e)}
function shelfWord(e){return SHELF_CARE[shelfCareK(e)]||SHELF_CARE.cay}
function shelfBad(e){return shelfIsPlant(e)&&(e.pc|0)<BAL.shelf.plant.wither}
/* the lowest rank allowed to place a piece (imperial-only = nobody) */
function shelfRk(e){if(!e||e.k==="tp")return 0;const s=BAL.shelf.it[e.k];return !s?0:s.imp?99:(s.rk|0)}
function shelfOver(p,e){return shelfRk(e)>(rkOf(p)|0)}
function shelfOf(p){if(!p)return{g:{}};const z=p.shelf=p.shelf&&typeof p.shelf==="object"?p.shelf:{g:{}};z.g=z.g||{};if(p!==S&&!z.sd){z.sd=1;try{shelfSeed(p)}catch(e){console.error("shelfSeed",e)}}return z}
function shelfList(p){const z=shelfOf(p);return BAL.shelf.groups.map(x=>z.g[x[0]]).filter(Boolean)}
/* why a chest entry cannot go on display ("" = it can). Above her rank only a ngự ban piece may stand (owner OD 17/11 ~18:25Z (d)) */
function shelfWhyNot(p,e){if(!e||!IT[e.k])return"không có món này";const g=shelfGrpE(e);if(!g)return"món này không để bày";if(e.h)return"không có trong rương";
 if(e.w)return"đang mặc, tháo ra trước";if(p.out)return"ở lãnh cung không được bày biện";const s=BAL.shelf.it[e.k];if(s&&s.imp)return"đồ của bậc chí tôn, phi tần không được bày";
 if(shelfOver(p,e)&&e.from!=="emp")return"vượt phẩm: quá phẩm mình chỉ đồ ngự ban mới được bày";return""}
/* put chest entry ix on display (the piece already in that group goes back to the chest) */
function shelfPut(p,ix){const e=(p.inv||[])[ix];const why=shelfWhyNot(p,e);if(why)return{ok:false,why};const z=shelfOf(p),g=shelfGrpE(e),old=z.g[g];
 p.inv.splice(ix,1);if(old)p.inv.push(old);if(shelfIsPlant(e)&&e.pc==null){e.pc=BAL.shelf.plant.start;e.pz=0}e.shw=wk();z.g[g]=e;return{ok:true,g,old:old?shelfNm(old):"",n:shelfNm(e)}}
function shelfNm(e){if(!e)return"";if(e.k==="tp"&&e.wk)return e.wk.n||itm("tp").n;return itm(e.k).n}
function shelfTake(p,g){const z=shelfOf(p),e=z.g[g];if(!e)return"";delete z.g[g];p.inv=p.inv||[];p.inv.push(e);return shelfNm(e)}
/* the one luxury number of a displayed piece: table / IT pieces = jlux luxPiece; her handmade work = the kit grade of its bậc (LUX_V); a living piece in bad care counts witherLux */
function shelfPiece(e){if(!e)return 0;let v=0;try{if(e.k==="tp"){const a=itemArt(e);v=LUX_V[a?a.grade|0:0]}else v=luxPiece(e.k)}catch(x){v=0}if(shelfBad(e))v=Math.round(v*BAL.shelf.plant.witherLux);return v}
/* the DWELLING score: sum of the displayed pieces vs the rank allowance × allowF (never shown to anyone: owner (d); the player learns it from consequences) */
function shelfLux(p){const L=shelfList(p);const sc=L.reduce((s,e)=>s+shelfPiece(e),0);let bud=1;try{bud=Math.max(1,Math.round(luxAllow(p)*BAL.shelf.allowF))}catch(e){}
 const B=BAL.shelf;const lv=sc<bud*B.plainF?0:sc<=bud?1:sc<=bud*B.lv3?2:3;return{sc,bud,lv,name:SHELF_LV[lv],n:L.length,wither:L.some(shelfBad),vr:L.filter(e=>shelfOver(p,e)).length}}
function shelfSig(p){return shelfList(p).map(e=>(e.k==="tp"&&e.wk?"tp-"+e.wk.kind+(e.wk.ti|0):e.k)+(shelfBad(e)?"~":"")).sort().join("|")}
window.shelfOf=shelfOf;window.shelfPut=shelfPut;window.shelfTake=shelfTake;window.shelfLux=shelfLux;window.shelfList=shelfList;

/* ---------- NPC shelves: seeded once by rank, arranged weekly from their own chest (same data, same rule) ---------- */
function shelfPool(p,src){const B=BAL.shelf.it,r=rkOf(p)|0;return Object.keys(B).filter(k=>IT[k]&&!B[k].imp&&!B[k].dead&&(B[k].rk|0)<=r&&/[mpv]/.test(src||B[k].src||""))}
function shelfSeed(p){const B=BAL.shelf,n=B.npc.seed[Math.max(0,Math.min(7,rkOf(p)|0))]|0;if(!n)return;let bud=1;try{bud=luxAllow(p)*B.allowF}catch(e){}
 const z=p.shelf;const pool=shelfPool(p);let left=bud*B.npc.capF;
 for(const k of shuf(pool.slice())){if(Object.keys(z.g).length>=n)break;const g=shelfGrp(k);if(z.g[g])continue;const v=luxPiece(k);if(v>left)continue;
  const e={k,from:"me"};if(B.it[k].care){e.pc=B.plant.start;e.pz=0}e.shw=wk();z.g[g]=e;left-=v}}
function shelfArrange(p){const B=BAL.shelf,z=shelfOf(p);let bud=1;try{bud=luxAllow(p)*B.allowF}catch(e){}
 let T=[];try{T=traitsOf(p)||[]}catch(e){}const cap=bud*(T.some(t=>B.npc.proud.includes(t))?B.npc.capHi:B.npc.capF);
 for(let i=(p.inv||[]).length-1;i>=0;i--){const e=p.inv[i];if(shelfWhyNot(p,e)||e.t)continue;const g=shelfGrpE(e),cur=z.g[g];
  const now=shelfLux(p).sc,gain=shelfPiece(e)-(cur?shelfPiece(cur):0);if(gain>0&&now+gain<=cap)shelfPut(p,i)}}

/* ---------- what people SEE of a room (jdress model): same place, Dò la, maid's report; rumours = a tip (belief), never proof ---------- */
function shelfRec(t,by,pf){const x=shelfLux(t);return{w:wk(),sc:x.sc,bud:x.bud,lv:x.lv,n:x.n,wi:x.wither?1:0,vr:x.vr,sig:shelfSig(t),by:by||"",pf:pf?1:0}}
function shelfLook(obs,t,by,pf){if(!obs||!t||obs===t||t.alive===false)return null;const r=shelfRec(t,by,pf!==false);obs.shn=obs.shn||{};const k=wdKey(t),o=obs.shn[k];
 /* a rumour never overwrites proof of the same room */if(!r.pf&&o&&o.pf&&o.sig===r.sig&&wk()-o.w<=BAL.shelf.see.seenW)return o;
 /* NPCs keep only what matters (an over-allowance room, a piece above rank, a withered plant): saves stay small */if(obs!==S&&r.lv<2&&!r.wi&&!r.vr){delete obs.shn[k];return r}
 obs.shn[k]=r;return r}
function shelfSeen(obs,t){const r=obs&&obs.shn&&obs.shn[wdKey(t)];if(!r||wk()-r.w>BAL.shelf.see.seenW)return null;return r}
function shelfNow(obs,t){const r=shelfSeen(obs,t);return r&&r.sig===shelfSig(t)?r:null}
window.shelfLook=shelfLook;window.shelfSeen=shelfSeen;window.shelfNow=shelfNow;
/* a visitor's eye on the room: her view of the owner (superiors frown on a room above its rank, peers envy, a fitting room is admired) */
function shelfReact(obs,t){if(!obs||!t||obs===t||obs===S)return"";const B=BAL.shelf.see;obs.shR=obs.shR||{};const k=wdKey(t);if(obs.shR[k]!=null&&wk()-obs.shR[k]<B.cdW)return"";obs.shR[k]=wk();
 const x=shelfLux(t);if(!x.n)return"";const sup=obs.queen||rkOf(obs)>rkOf(t);let m=1;try{m=tv(LUX_TR,obs)||1}catch(e){}
 if(x.lv>=2){if(sup)affAdd(obs,t,B.supAff[x.lv]);else{const n=Math.round(B.ghen[x.lv]*m);if(t===S)obs.ghen=cl((obs.ghen||0)+n,0,100);else oanAdd(obs,t,n*B.npcOanK)}}
 else if(x.lv===1)affAdd(obs,t,B.fitAff);
 if(!sup&&shelfList(t).some(e=>e.from==="emp"||e.from==="th")){if(t===S)obs.ghen=cl((obs.ghen||0)+B.nguGhen,0,100);else oanAdd(obs,t,B.nguGhen*B.npcOanK)}
 if(x.wither)affAdd(obs,t,B.witherAff);return x.name}
window.shelfReact=shelfReact;
function shelfSee(obs,t,by){const r=shelfLook(obs,t,by,true);if(r)shelfReact(obs,t);return r}
const SHELF_PW={k:""};/* once per buổi (placeWhere runs many times a buổi: perf) */
/* her walk into a palace: she sees the rooms of everyone living there; NPCs at her palace the same buổi see hers */
(function(){if(typeof goTo==="function"){const g0=goTo;goTo=function(){const was=S&&S.place;const r=g0.apply(this,arguments);try{if(S&&S.place!==was&&!S.out)for(const v of liveRivals(true))if(v.alive&&palaceOf(v)===S.place)shelfSee(S,v,"tận mắt")}catch(e){console.error("shelf goTo",e)}return r}}
 if(typeof placeWhere==="function"){const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{const kb=wk()+"-"+(S&&S.buoi||0);if(S&&!S.dead&&S.where&&SHELF_PW.k!==kb&&(SHELF_PW.k=kb))for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const w=whereOf(v);
   if(w==="home"&&!S.out)shelfSee(v,S,"tận mắt");else for(const o of liveRivals(true))if(o!==v&&o.alive&&!o.out&&palaceOf(o)===w&&w!==palaceOf(v))shelfSee(v,o,"tận mắt")}}catch(e){console.error("shelf where",e)}return r}}})();
/* Dò la (both ways) also reports the room; her maid's "Sai đi dò la" the same */
function shelfSpyTxt(a,t,by){const r=shelfSee(a,t,by);if(!r||a!==S)return"";return `Phòng của ${NM(t)}: ${r.n?`bày ${r.n} món, ${SHELF_LV[r.lv].toLowerCase()}`:"không bày gì"}${r.vr?", có món quá phẩm nàng":""}${r.wi?", có cây cảnh, chim cá bỏ bê":""}. `}
(function(){if(typeof spyFind==="function"){const s0=spyFind;spyFind=function(a,t){const r=s0.apply(this,arguments);let add="";try{add=shelfSpyTxt(a,t,a===S?"dò la":(a.name||""))}catch(e){}return (r||"")+add}}
 if(typeof spyMaidRun==="function"){const m0=spyMaidRun;spyMaidRun=function(v,ag){const ok=m0.apply(this,arguments);try{if(ok&&v){const m=ag||S.maid||{};const t=shelfSpyTxt(S,v,m.name||"cung nữ");if(t){log(`${m.name||"Cung nữ"} báo: ${t}`);try{noteAdd(v.id,t)}catch(e){}}}}catch(e){console.error(e)}return ok}}})();

/* ---------- NPC VISITS (owner (2): "tại sao người ta không tới phòng của tôi?") — the shared deed Ghé chơi, two-way ---------- */
(function(){try{BAL.tw.g.call=BAL.shelf.visit.rel;
 TWD("call",{n:"Ghé chơi",req:(a,t)=>!!t&&t!==a&&!t.out&&t.alive!==false,run:(a,t)=>{relAdd(a,t,BAL.tw.g.call);shelfSee(a,t,"ghé chơi");if(t!==S)shelfSee(t,a,"ghé chơi");return `${twNm(a)} ghé chơi cung ${NM(t)}`}});
 SOC.call={w:BAL.shelf.visit.w,ok:(v,t)=>t!==v&&!t.out&&aff(v,t)>=BAL.shelf.visit.affMin,run:(v,t)=>twDo(v,t,"call",true)};
 if(typeof AGSOC==="object"){AGSOC.call=["call","social","ally",g=>({ally:g.call})];AGACTW.call="ghé chơi"}}catch(e){console.error("shelf call",e)}})();
/* the visit happens AT the target's palace (her room / theirs), not wherever she is that khắc */
(function(){if(typeof agOpts!=="function")return;const o0=agOpts;agOpts=function(){const O=o0.apply(this,arguments);try{for(const o of O)if(o.k==="call")o.at=(kh,vv,tt)=>tt?palaceOf(tt):null}catch(e){}return O}})();
/* daily life: a consort who keeps her schedule this buổi may drop in on someone (her room weighs more: the player's palace is where life is seen) */
(function(){if(typeof agDecide0!=="function")return;const d0=agDecide0;agDecide0=function(v){const r=d0.apply(this,arguments);try{const V=BAL.shelf.visit;if(r||!v||v.confined||!roll(V.dayP))return r;
  const L=[S].concat(liveRivals(true)).filter(x=>x&&x!==v&&x.alive!==false&&!x.out&&aff(v,x)>=V.affMin).map(x=>[x,V.base+Math.max(0,aff(v,x))+(x===S?V.herW:0)+(rkOf(x)>rkOf(v)?V.upW:0)]);
  const t=L.length?agPw(L):null;if(!t)return r;const c={k:"call",t,tag:"social",act:AGACTW.call,need:"ally",at:(kh,vv,tt)=>palaceOf(tt)};const sl=agSlot(v,c.at,t);if(!sl)return r;
  let N={};try{N=agNeedsC(v)}catch(e){}agPlan(v,c,N,sl[0],sl[1]);return 1}catch(e){console.error("shelf call day",e)}return r}})();
/* any visiting deed landing at the target's palace shows the visitor the room (sang thăm, giúp, tạ lỗi, khiêu khích …) */
(function(){if(typeof agLand0!=="function")return;const l0=agLand0;agLand0=function(p){const r=l0.apply(this,arguments);try{if(r&&p&&BAL.shelf.seeDeeds.includes(p.k)&&p.k!=="call"){const v=RV(p.vid),t=agPerson(p.t);if(v&&t&&p.pl===palaceOf(t))shelfSee(v,t,"tận mắt")}}catch(e){console.error("shelf land",e)}return r}})();

/* ---------- Tố xa xỉ / Tố vượt phẩm: the room is a second cause of the SAME acts (jdress ACT.xx, j8 ACT.vp) ----------
   Owner OD 17/11 ~18:25Z (d): nobody knows the exact scores; anyone may accuse on what she SAW (visit, Dò la), on a TIP (rumour, someone told her) or on a GUESS;
   the inquiry settles the truth (a false charge costs the accuser). The player may guess at anyone; an NPC guesses only in the monthly pass (shelfNpcAccuse). */
function shelfCause(a,t,kind){if(!a||!t||a===t||t.alive===false||t.out)return null;const r=shelfSeen(a,t);
 if(r&&(kind==="vp"?r.vr>0:r.lv>=2))return{how:r.pf?"pf":"tip",r};return a===S?{how:"guess",r:null}:null}
window.shelfCause=shelfCause;
function shelfStrip(t){const L=BAL.shelf.groups.map(g=>[g[0],shelfOf(t).g[g[0]]]).filter(x=>x[1]).sort((x,y)=>shelfPiece(y[1])-shelfPiece(x[1]));return L.length?shelfTake(t,L[0][0]):""}
function shelfInq(a,t){for(const o of liveRivals(true))if(o!==a&&o!==t&&o.alive&&!o.out)shelfLook(o,t,"tra xét",true)}/* the inquiry makes the room known */
function shelfFalse(a,t,what){const B=BAL.shelf.acc,A0=NMc(a),T0=NM(t);ap(a,{danh:B.falseDanhA});ap(t,{danh:B.falseDanhT});relAdd(a,t,B.falseRel);
 return `${A0} tố ${T0} ${what}; <span class="${a===S?"r":"g"}">tra xét ra không có chuyện đó</span>, ${a===S?"ngươi":a.name} bị quở vì tố bừa. Danh ${B.falseDanhA}, ${T0} Danh +${B.falseDanhT}. `}
function shelfAccuse(a,t){const B=BAL.shelf.acc;const x=shelfLux(t);let judge="";try{judge=judgeName(t)}catch(e){judge="Hoàng hậu"}const A0=NMc(a),T0=NM(t);shelfInq(a,t);
 if(x.sc<=x.bud)return shelfFalse(a,t,"bày biện xa xỉ");
 const w=SHELF_LV[x.lv].toLowerCase();
 if(!roll(oVP(a))){ap(a,{danh:B.waveDanhA});relAdd(a,t,B.rel);return `${A0} tố ${T0} bày biện xa xỉ (phòng ${w}), ${judge} bỏ qua, chỉ dặn lần sau giữ ý. ${a===S?"Danh "+B.waveDanhA+". ":""}`}
 relAdd(a,t,B.rel);ap(a,{danh:B.danhA});const off=shelfStrip(t);ap(t,{duc:B.ducT,danh:B.danhT});try{t.luxRep=Math.min(BAL.lux.repMax,(t.luxRep||0)+B.repT)}catch(e){}
 return `${A0} tố ${T0} bày biện xa xỉ (phòng ${w}): <span class="${t===S?"r":"g"}">thành</span>. ${off?off+" phải cất vào rương. ":""}${NMc(t)} Đức ${B.ducT}, Danh ${B.danhT}. `}
window.shelfAccuse=shelfAccuse;
/* a ngự ban piece above rank may stand (owner (d)), so a proven charge only sends it back to the chest with a small loss of Danh: the risk of showing it */
function shelfVpAccuse(a,t){const B=BAL.shelf.acc;let judge="";try{judge=judgeName(t)}catch(e){judge="Hoàng hậu"}const A0=NMc(a),T0=NM(t);shelfInq(a,t);
 const z=shelfOf(t),G=Object.keys(z.g).filter(g=>shelfOver(t,z.g[g]));if(!G.length)return shelfFalse(a,t,"bày đồ vượt phẩm");
 if(!roll(oVP(a))){ap(a,{danh:B.waveDanhA});relAdd(a,t,B.rel);return `${A0} tố ${T0} bày đồ vượt phẩm, ${judge} xét là đồ ngự ban nên bỏ qua. ${a===S?"Danh "+B.waveDanhA+". ":""}`}
 relAdd(a,t,B.rel);ap(a,{danh:B.danhA});const off=G.map(g=>shelfTake(t,g)).filter(Boolean);ap(t,{danh:B.vpDanhT});
 return `${A0} tố ${T0} bày đồ vượt phẩm: <span class="${t===S?"r":"g"}">thành</span>. ${judge} dạy đồ ngự ban quá phẩm thì cất giữ, không bày ra: ${off.join(", ")} phải cất vào rương. ${NMc(t)} Danh ${B.vpDanhT}. `}
window.shelfVpAccuse=shelfVpAccuse;
/* hook the two acts (load order free: jdress may be assembled before OR after this file, and its A("xx") replaces ACT.xx) — run now, after every module, and before each week */
function shelfHook1(id,name,why,run){const X=typeof ACT==="object"?ACT[id]:null;if(X&&X.__sh)return;
 const okR=(a,t)=>!!shelfCause(a,t,id);
 if(X){const ok0=X.ok,f0=X.f;X.ok=(a,t)=>{let d=false;try{d=!!ok0(a,t)}catch(e){}return d||okR(a,t)};X.f=(a,t)=>{let d=false;try{d=!!ok0(a,t)}catch(e){}return d?f0(a,t):run(a,t)};X.x=(X.x||"")+" · "+why;X.__sh=1;return}
 A(id,name,{c:{},ok:okR,o:a=>oVP(a),x:why,f:(a,t)=>run(a,t)});ACT[id].__sh=1}
function shelfAccHook(){shelfHook1("xx","Tố xa xỉ","hoặc phòng nàng bày biện quá mức phẩm mình: tố theo điều thấy, nghe hay đoán; tra xét không ra thì bị quở",shelfAccuse);
 shelfHook1("vp","Tố vượt phẩm","hoặc phòng nàng bày đồ quá phẩm mình: tố theo điều thấy, nghe hay đoán; tra xét không ra thì bị quở",shelfVpAccuse)}
try{shelfAccHook()}catch(e){console.error("shelfAccHook",e)}
setTimeout(()=>{try{shelfAccHook()}catch(e){console.error("shelfAccHook",e)}},0);
/* an NPC with a belief (seen or heard) and a motive brings the charge herself, monthly; a hostile one with nothing may still guess (same acts, same odds oVP) */
function shelfNpcAccuse(){const B=BAL.shelf.acc;for(const a of liveRivals(true)){if(!a.alive||a.out)continue;if(a.shA!=null&&wk()-a.shA<B.cdA)continue;
  const T=[S].concat(liveRivals(true)).filter(t=>t&&t!==a&&t.alive!==false&&!t.out&&!(t.shT!=null&&wk()-t.shT<B.cdT));
  for(const t of shuf(T)){const mot=hostility(a,t)>=B.hostMin||(t===S&&(a.ghen||0)>=B.ghenMin);if(!mot)continue;
   const r=shelfSeen(a,t);let kind=r&&r.vr>0?"vp":r&&r.lv>=2?"xx":null;
   if(kind?!roll(B.npcO):!roll(B.guessO))continue;if(!kind)kind="xx";/* a guess */
   a.shA=wk();t.shT=wk();const txt=kind==="vp"?shelfVpAccuse(a,t):shelfAccuse(a,t);if(t===S)Q.push({t:kind==="vp"?"Bị tố bày đồ vượt phẩm":"Bị tố bày biện xa xỉ",who:typeof pv==="function"?pv(a):null,h:`<p>${txt}</p>`});else try{newsAdd(a,kind,txt,false)}catch(e){}break}}}

/* ---------- the week: plants (decay, servants' care, withered, dead pot), NPC arrange, mood, rumours; the month: reputation, NPC charges ---------- */
function shelfSrvQ(s){const P=BAL.shelf.plant;if(!s)return 0;let q=P.srvBase+(s.loyal||0)*P.srvLoyK;const T=[].concat(s.traits||[],typeof s.tr==="string"?[s.tr]:[]);for(const t of T)q+=P.srvTr[t]||0;return cl(q,0,P.srvMax)}
const SHELF_SRVW=["vụng về","tạm được","khéo tay"];
function shelfSrvWord(q){const C=BAL.shelf.plant.qCut;return SHELF_SRVW[q<C[0]?0:q<C[1]?1:2]}
function shelfSrvBest(p){const L=(p===S?(S.staff||[]):(p.staff||[])).concat(p.maid?[p.maid]:[]).filter(Boolean);return L.sort((a,b)=>shelfSrvQ(b)-shelfSrvQ(a))[0]||null}
function shelfDecay(e){const P=BAL.shelf.plant,s=BAL.shelf.it[e.k]||{};return (P.start-P.wither)/Math.max(1,s.hw||P.hw)}/* hardy pieces (hw) fall slower */
/* pieces that do not last: burnt incense (table per = tuần on the shelf), a cut-flower vase (j83 wk.p) — consumables, gone from the shelf like from the chest */
function shelfSpent(e){if(!e)return false;if(e.wk&&e.wk.p!=null)return e.wk.p<wk();const s=BAL.shelf.it[e.k];return !!(s&&s.per&&e.shw!=null&&wk()-e.shw>=s.per)}
function shelfPlantWeek(p){const P=BAL.shelf.plant,z=shelfOf(p),me=p===S;const s=shelfSrvBest(p);const out=[];
 for(const g in z.g){const e=z.g[g];if(shelfSpent(e)){delete z.g[g];out.push(["spent",g,shelfNm(e)]);continue}if(!shelfIsPlant(e))continue;const d=shelfDecay(e);
  const was=(e.pc|0)>=P.wither;e.pc=cl((e.pc==null?P.start:e.pc)-d,0,100);
  if(e.pm!==wk()){/* she did not tend it herself this tuần: the servant does (0 khắc for her); an NPC's household as their pets */
   const q=me?shelfSrvQ(s):BAL.shelf.npc.care;e.pc=cl(e.pc+d*q,0,100)}
  e.pz=e.pc<=0?(e.pz|0)+1:0;
  if(e.pz>=P.deadW){const W=shelfWord(e),n=shelfNm(e);e.k=W.dead;delete e.pc;delete e.pz;out.push(["dead",g,n,W]);continue}
  if(was&&e.pc<P.wither)out.push(["wither",g])}
 if(me&&out.length&&!(typeof tsbBot==="function"&&tsbBot()))for(const [w,g,n0,W0] of out){if(w==="spent"){log(`${n0} bày trong phòng đã tàn.`);continue}
  if(w==="dead"){log(`<span class="r">${n0} bày trong phòng bị bỏ bê lâu ngày, ${W0.died}.</span>`);continue}
  const e=z.g[g],W=shelfWord(e),n=shelfNm(e);Q.push({t:`${n} ${W.bad}`,who:typeof pMe==="function"?pMe():null,h:`<p>${n} bày trong phòng ${W.bad}${s?`: ${s.name} chăm chưa khéo`:", không ai chăm"}. Để lâu thì ${W.died}; khách đến thấy cũng chê.</p>`,
   opts:[{n:"Tự tay chăm",fx:{},x:`tốn: ${P.khacSelf} khắc · thành: ${W.fresh}`,go:()=>setTimeout(()=>{try{shelfPlantOpen(g)}catch(e){}},60)},{n:"Để người hầu lo",fx:{},x:s?`${s.name} chăm tiếp, khéo vụng tùy lòng`:`không ai chăm: ${W.bad} thêm`}]})}return out}
function shelfMood(p){if(typeof emoSet!=="function")return;const x=shelfLux(p),M=BAL.shelf.mood;
 if(x.wither)emoSet(p,"buon",M.wither,"cây cảnh, chim cá trong phòng bỏ bê");else if(x.lv>=2)emoSet(p,"vui",M.lux,"phòng ốc bày biện lộng lẫy");else if(x.lv===1)emoSet(p,"vui",M.fit,"phòng ốc bày biện vừa ý")}
function shelfRumour(){const B=BAL.shelf.rum;const P=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false&&!p.out);let heardMe=0;
 for(const t of P){const x=shelfLux(t);if(x.lv<B.lv&&!x.vr)continue;for(const o of P){if(o===t||shelfSeen(o,t))continue;if(!roll(B.o))continue;shelfLook(o,t,"tin đồn",false);if(t===S)heardMe++;
   else if(o===S){try{noteAdd(t.id,`Nghe đồn phòng ${t.name} ${x.vr?"bày đồ quá phẩm nàng":"bày biện "+SHELF_LV[x.lv].toLowerCase()}.`)}catch(e){}}}}
 if(heardMe&&!(typeof tsbBot==="function"&&tsbBot()))log(`Hậu cung xì xào về đồ bày trong phòng ngươi.`)}
function shelfWeek(){if(!S||S.dead)return;try{shelfAccHook()}catch(e){}const P=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false);
 for(const p of P){try{if(p.out){if(p.shelf&&p.shelf.g)for(const g in p.shelf.g)shelfTake(p,g);continue}if(p!==S)shelfArrange(p);shelfPlantWeek(p);shelfMood(p)}catch(e){console.error("shelfWeek",e)}}
 try{shelfRumour()}catch(e){console.error("shelfRumour",e)}
 if(S.shM!==S.turn){S.shM=S.turn;for(const p of P){try{if(shelfLux(p).lv>=3)p.luxRep=Math.min(BAL.lux.repMax,(p.luxRep|0)+BAL.shelf.rep)}catch(e){}}try{shelfNpcAccuse()}catch(e){console.error("shelfNpcAccuse",e)}}}
window.shelfWeek=shelfWeek;
(function(){if(typeof petWeek!=="function")return;const w0=petWeek;petWeek=function(){const r=w0.apply(this,arguments);try{shelfWeek()}catch(e){console.error("shelfWeek",e)}return r}})();

/* ---------- jil: a displayed piece is still the owner's (one ledger, conservation law) ---------- */
(function(){if(typeof ilSlots==="function"){const s0=ilSlots;ilSlots=function(p){const o=s0.apply(this,arguments);try{if(p&&p.shelf&&p.shelf.g)for(const g in p.shelf.g){const e=p.shelf.g[g];if(e&&e.k)o.push(e)}}catch(e){}return o}}
 if(typeof ilOut==="function"){const o0=ilOut;ilOut=function(p,e){try{if(p&&p.shelf&&p.shelf.g)for(const g in p.shelf.g)if(p.shelf.g[g]===e){delete p.shelf.g[g];return}}catch(x){}return o0.apply(this,arguments)}}})();

/* ---------- PLANT CARE (owner (4)): the act "Chăm sóc" lists pets + plants; plant screen = the jpetcare kit screen shape ---------- */
const SHPC={g:null,game:null};
function shelfCareList(){const L=[];try{tsbPets(S).forEach((P,i)=>L.push({kind:"pet",i,n:petT(P).n}))}catch(e){}for(const g in shelfOf(S).g){const e=shelfOf(S).g[g];if(shelfIsPlant(e))L.push({kind:"plant",g,n:shelfNm(e),fresh:shelfWord(e).fresh})}return L}
function shelfCareOpen(){const L=shelfCareList();const t1=whyTime(BAL.shelf.plant.khacSelf);
 kitModal({kind:"info",title:"Chăm sóc",html:L.length?`<div class="rbtn">${L.map(x=>x.kind==="pet"?pbtn(`data-shc="pet" data-i="${x.i}"`,`Chăm ${x.n.toLowerCase()}`,`thành: mở chăm thú nuôi`,""):pbtn(`data-shc="plant" data-g="${x.g}"`,`Chăm ${x.n.toLowerCase()}`,`tốn: ${BAL.shelf.plant.khacSelf} khắc · thành: ${x.fresh}`,t1)).join("")}</div>`:kitFacts(["Chưa có thú nuôi, cây cảnh hay chim cá nào cần chăm."]),btn:"Lui"})}
window.shelfCareOpen=shelfCareOpen;
function shelfPlantBody(e,msg){const P=BAL.shelf.plant,W=shelfWord(e);const s=shelfSrvBest(S);const t1=whyTime(P.khacSelf);
 return kitStatRow([{cells:[kitStatCell("","Tươi tốt",Math.round(e.pc|0),{bar:Math.round(e.pc|0),title:`Tươi tốt ${Math.round(e.pc|0)}/100`})]}])+
  kitRows([["Mỗi tuần",[`${s?s.name+" chăm hộ":"không ai chăm"}${s?` (${shelfSrvWord(shelfSrvQ(s))})`:""}`],"n"],["Bỏ bê",[`${W.bad} thì phòng kém sang, ai thấy cũng chê; để lâu thì ${W.died}`],"r"]].concat(msg?[["Vừa rồi",[msg],"n"]]:[]))+
  `<div id="kshpgw"></div><div class="rbtn">${pbtn(`data-shc="water"`,W.act,`tốn: ${P.khacSelf} khắc · thành: Tươi tốt tăng · dừng tay khi vừa đủ (${P.game.rounds} lần)`,t1)}</div>`}
function shelfPlantOpen(g){const e=shelfOf(S).g[g];if(!shelfIsPlant(e))return;SHPC.g=g;SHPC.game=null;try{if(!document.getElementById("modal").hidden)closeModal()}catch(x){}
 kitModal({kind:"info",title:`Chăm ${shelfNm(e).toLowerCase()}`,sub:shelfGName(g),itemPic:kitItem({src:typeof kitItemSrc==="function"?kitItemSrc(e.k,""):"",name:"",grade:0,size:"lg"}).replace('<span class="kitn"></span>',''),
  html:`<div id="kshp">${shelfPlantBody(e)}</div>`,onClose:()=>{SHPC.g=null;SHPC.game=null}})}
window.shelfPlantOpen=shelfPlantOpen;
/* the care minigame (also the Thử tay calibration entry): water rises step by step; stop it inside the band; score = closeness over the rounds */
function shelfWaterGame(box,done,W){W=W||SHELF_CARE.cay;const G=BAL.shelf.plant.game;let r=0,lv=0,tm=0,sum=0;const stop=()=>clearTimeout(tm);
 const draw=()=>{box.innerHTML=`<div class="rbtn"><button type="button" class="kgbtn" data-shw="stop">${W.stop}</button></div>`+kitFacts([`Lần ${r+1}/${G.rounds} · đã đổ ${lv}/${G.steps} · vừa đủ: ${G.band[0]}–${G.band[1]}`])};
 const tick=()=>{if(!document.body.contains(box)){stop();return}lv++;if(lv>G.steps){end(0);return}draw();tm=setTimeout(tick,G.ms[0]-(G.ms[0]-G.ms[1])*r/Math.max(1,G.rounds-1))};
 const end=s=>{stop();sum+=s;r++;lv=0;if(r>=G.rounds){SHPC.game=null;done(sum/G.rounds);return}draw();tm=setTimeout(tick,G.ms[0])};
 box.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shw]");if(!b)return;ev.preventDefault();ev.stopPropagation();
  const d=lv<G.band[0]?G.band[0]-lv:lv>G.band[1]?lv-G.band[1]:0;end(cl(1-d/G.band[0],0,1))});draw();tm=setTimeout(tick,G.ms[0]);SHPC.peek=()=>lv;return stop}
window.shelfWaterGame=shelfWaterGame;
function shelfPlantGain(score){const e=shelfOf(S).g[SHPC.g];if(!e)return;const G=BAL.shelf.plant.gain;const v=Math.round(G[0]+(G[1]-G[0])*score);const p0=e.pc|0;e.pc=cl(p0+v,0,100);e.pm=wk();e.pz=0;
 const msg=`Tươi tốt +${Math.round(e.pc-p0)}${score>=.8?" · rất khéo tay":score<.35?" · chưa khéo":""}.`;log(`Ngươi tự tay chăm ${shelfNm(e).toLowerCase()} (${msg})`);
 const box=document.getElementById("kshp");if(box){box.innerHTML=shelfPlantBody(e,msg);try{if(typeof kitFix==="function")kitFix(box)}catch(x){}}}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shc]");if(!b||b.disabled)return;ev.stopPropagation();const k=b.dataset.shc;
 if(k==="pet"){try{closeModal()}catch(x){}petcOpen(+b.dataset.i);return}
 if(k==="plant"){shelfPlantOpen(b.dataset.g);return}
 if(k==="water"){if(SHPC.game||!SHPC.g)return;const c=BAL.shelf.plant.khacSelf;if(c&&!can(c))return;if(c)spend(c);const w=document.getElementById("kshpgw");if(!w)return;
  const W=shelfWord(shelfOf(S).g[SHPC.g]);w.innerHTML=kitGameFrame({art:"Chăm",title:W.act,how:W.how,id:"kshpgame"});SHPC.game="water";shelfWaterGame(document.getElementById("kshpgame"),shelfPlantGain,W)}},true);
/* Thử tay (calibration, OD 17/11 ~17:10Z (3)): every new minigame registers its entry; the calibration page lists window.MG_CAL */
(window.MG_CAL=window.MG_CAL||[]).push({k:"chamcay",n:"Chăm cây (tưới, tỉa lá)",run:box=>new Promise(res=>shelfWaterGame(box,res))});

/* ---------- interim entry points (kit parts only; the shelf screen itself waits for KIT READY) ---------- */
/* item panel (jinv kinvOpen): an act card "Trưng bày" on every displayable piece */
(function(){if(typeof kinvOpen!=="function")return;const k0=kinvOpen;kinvOpen=function(x){const r=k0.apply(this,arguments);if(!BAL.shelf.ui)return r;try{const i=x&&x.g?x.g.i:-1,e=S.inv[i];const g=e&&shelfGrpE(e);
  if(g){const cur=shelfOf(S).g[g];const card=pbtn(`data-shelfput="${i}"`,"Trưng bày",`thành: bày lên kệ nhóm ${shelfGName(g)}${cur?` thay ${shelfNm(cur)}`:""} · kèm: còn bày thì không tặng hay bán được`,shelfWhyNot(S,e));
   const acts=document.querySelector("#modal .kinvacts"),body=document.querySelector("#modal .kpb");if(acts)acts.insertAdjacentHTML("beforeend",card);else if(body)body.insertAdjacentHTML("beforeend",`<div class="rbtn kinvacts">${card}</div>`)}}catch(e){console.error("shelf kinvOpen",e)}return r}})();
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shelfput],[data-shelftake]");if(!b||b.disabled)return;ev.stopPropagation();
 if(b.dataset.shelfput!=null){const R=shelfPut(S,+b.dataset.shelfput);try{closeModal()}catch(x){}if(R.ok)log(`Ngươi bày ${R.n} ở Nơi trưng bày${R.old?`, cất ${R.old} vào rương`:""}.`);try{render()}catch(x){}return}
 const n=shelfTake(S,b.dataset.shelftake);try{closeModal()}catch(x){}if(n)log(`Ngươi cất ${n} vào rương.`);try{render()}catch(x){}},true);
/* interim shelf dialog (kit parts only: kitModal + kitRows + pbtn) until the painted shelf part lands: what stands in each group + take down / care */
function shelfOpen(p){p=p||S;const V=shelfView(p),me=p===S;const rows=V.groups.filter(x=>x.item).map(x=>[x.n,[x.item.name+(x.item.plant&&x.item.plant.wither?` (${x.item.plant.bad})`:"")+(x.item.over?" · ngự ban, quá phẩm":"")],x.item.plant&&x.item.plant.wither?"r":"n"]);
 const acts=me?V.groups.filter(x=>x.item).map(x=>pbtn(x.item.take,`Cất ${x.item.name.toLowerCase()}`,"thành: về rương · tặng, bán, dùng được lại","")+(x.item.plant?pbtn(`data-shc="plant" data-g="${x.g}"`,`Chăm ${x.item.name.toLowerCase()}`,`tốn: ${BAL.shelf.plant.khacSelf} khắc · thành: ${x.item.plant.fresh}`,whyTime(BAL.shelf.plant.khacSelf)):"")).join(""):"";
 kitModal({kind:"info",title:me?"Nơi trưng bày":`Nơi trưng bày của ${p.name}`,html:(rows.length?kitRows(rows):kitFacts([V.known?"Chưa bày món nào.":"Chưa thấy phòng nàng bày gì."]))+(V.lux?kitFacts([`Phòng ốc: ${V.lux.name.toLowerCase()}`]):"")+(acts?`<div class="rbtn">${acts}</div>`:""),btn:"Lui"})}
window.shelfOpen=shelfOpen;
/* the data the kit shelf part will draw (KIT REQUEST 17/11 display-shelf): one slot per group, cut-out picture, no frame */
function shelfView(p){p=p||S;const z=shelfOf(p),me=p===S;let known=me?null:shelfSeen(S,p);
 return{who:me?"me":wdKey(p),groups:BAL.shelf.groups.map(([g,n])=>{const e=z.g[g];if(!e||(!me&&!known))return{g,n,item:null};
   return{g,n,item:{k:e.k,name:shelfNm(e),src:typeof kitItemSrc==="function"?kitItemSrc(e.k==="tp"?e:e.k,""):"",plant:shelfIsPlant(e)?{care:Math.round(e.pc|0),wither:shelfBad(e),kind:shelfCareK(e),bad:shelfWord(e).bad,fresh:shelfWord(e).fresh}:null,over:shelfOver(p,e),from:e.from||"",take:me?`data-shelftake="${g}"`:""}}}),
  lux:me||known?{lv:me?shelfLux(p).lv:known.lv,name:me?shelfLux(p).name:SHELF_LV[known.lv]}:null,known:me||!!known}}
window.shelfView=shelfView;
