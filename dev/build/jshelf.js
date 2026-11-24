/* ================= jshelf: ĐA BẢO CÁC — a display shelf per person + DWELLING xa xỉ + plant care (owner OD 17/11 ~18:30Z (A) + ~18:00Z s35 Lượt 26) =================
   Brief: dev/handover/briefs/display-shelf-build.md (handover branch). Numbers: BAL.shelf (this file, one table). Reuses, never rebuilds:
   · UP TO BAL.shelf.per pieces per group (owner OD 17/11 ~22:05Z); a group's luxury = best piece full + falling shares BAL.shelf.wt.
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
    rk is NOT a block (owner OD 17/11 ~19:50Z, L1682 (d) overwritten): ANY owned piece may be displayed; above rk is only a ground for a vượt phẩm charge.
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
  sonthuy:{g:"thuhoa",rk:2,gr:1,pr:200,src:"mp"},hoadieu:{g:"thuhoa",rk:2,gr:1,pr:200,src:"mp"},/* NEW (set Danh gia cổ họa, display-set-bonus D) */
  /* 5 Hương lô */
  huongtram:{g:"huong",rk:0,per:1,src:"mp"},luhuong:{g:"huong",rk:0,gr:0,pr:100,src:"mp"},tuyenduc:{g:"huong",rk:2,gr:1,pr:200,src:"np"},
  phaplam:{g:"huong",rk:4,gr:2,pr:240,src:"n"},luhac:{g:"huong",rk:3,gr:1,pr:240,src:"p"},hoannghi:{g:"huong",rk:2,gr:1,pr:180,src:"p"},
  hophuong:{g:"huong",rk:1,gr:0,pr:100,src:"m"},/* NEW (set Đồng khí) */
  /* 6 Chuông gió */
  chuongso:{g:"chuong",rk:0,gr:0,pr:20,src:"mp"},chuonggio:{g:"chuong",rk:0,gr:0,pr:80,src:"m"},chuongngoc:{g:"chuong",rk:2,gr:1,pr:180,src:"np"},
  chuongpl:{g:"chuong",rk:4,gr:2,pr:260,src:"n"},thietma:{g:"chuong",rk:3,gr:1,pr:140,src:"mv"},
  /* 7 Bình phong, rèm */
  remtruc:{g:"phong",rk:0,gr:0,pr:20,src:"mv"},banbinh:{g:"phong",rk:1,gr:1,pr:100,src:"mp"},remlua:{g:"phong",rk:1,gr:1,pr:120,src:"mp"},
  remchau:{g:"phong",rk:2,gr:1,pr:260,src:"np"},bpxacu:{g:"phong",rk:4,gr:2,pr:300,src:"n"},bpngubut:{g:"phong",rk:5,gr:3,pr:220,src:"n"},
  /* 8 Đồ Tây dương */
  tuminh:{g:"tay",rk:3,gr:2,pr:300,src:"n"},hopnhac:{g:"tay",rk:2,gr:1,pr:280,src:"n"},guongtay:{g:"tay",rk:2,gr:1,pr:220,src:"n"},
  kinhvv:{g:"tay",rk:4,gr:2,pr:220,src:"n"},diacau:{g:"tay",rk:5,gr:2,pr:200,src:"n"},
  nhatquy:{g:"tay",rk:4,gr:2,pr:240,src:"n"},/* NEW (set Thiên văn) */
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
  daminh:{g:"van",rk:5,gr:3,pr:280,src:"n"},
  butlong:{g:"van",rk:1,gr:0,pr:80,src:"m"},muchuy:{g:"van",rk:1,gr:0,pr:100,src:"m"}},/* NEW (set Ngũ bảo thư phòng) */
 per:5,            /* owner OD 17/11 ~22:05Z: each group holds UP TO per pieces (12 groups × per). Slots: "<g>" (the first, old saves) then "<g>~1" … "<g>~(per-1)" */
 wt:[1,.5,.3,.2,.1],/* room xa xỉ of one group: its best piece counts in full, the next ones these falling shares (owner: luxury must not explode; 5 cheap never beat 1 fine) */
 tp:{tranh:"thuhoa",tho:"thuhoa",bhoa:"hoa"},/* her own handmade works (j83 IT.tp, wk.kind) that may stand on the shelf; luxury by bậc (kit grade) */
 shopN:2,           /* Nội vụ phủ: each restock adds shopN décor pieces (src m) to her tray (the old shop list keeps its balance) */
 bestO:25,          /* a bestowal (j8 bestow) is a décor piece bestO in 100 (roll) (src n), may be above her rank (ngự ban, owner (d)) */
 ui:0,              /* 1 = her interim entry points (item-panel act card) are on; stays 0 until the kit shelf part is KIT READY (no one-way door: she must be able to take pieces down) */
 allowF:1,          /* dwelling allowance = her rank allowance (jinv luxAllow) × allowF */
 plainF:.15,lv3:1.5,/* sc below plainF × allowance = đơn sơ; above allowance = xa hoa; above lv3 × allowance = quá xa xỉ */
 /* what a visitor's eye does (once per visitor and owner every see.cdW tuần) */
 see:{cdW:4,supAff:[0,0,-4,-8],ghen:[0,0,3,6],npcOanK:.5,fitAff:2,nguGhen:2,witherAff:-2,seenW:12},
 /* EACH person's own taste for luxury (owner OD 17/11 ~19:50Z: "mỗi người sẽ có một cái độ thích và ghét xa xỉ khác nhau"): taste −1 (hates show) … +1 (loves it)
    = Σ nết weights (tr, the one trait pool) + trọng weights (jtrong) + a once-per-life personal lean (S.ctxSeed hash, ± spread), clamped.
    The viewer judges a room against HER OWN line: allowance × (1 + taste × k) — a frugal eye calls a lawful (even ngự ban) room "quá xa xỉ", a lover of show admires
    what others frown on (likeAff × taste). The inquiry still judges by the rule (true allowance), never by taste. */
 taste:{tr:{"Kiêu ngạo":.5,"Ham vui":.4,"Tham vọng":.3,"Ham lợi":.3,"Xu nịnh":.2,"Vì mình":.2,"Khiêm nhường":-.5,"Thanh liêm":-.5,"An phận":-.3,"Cương trực":-.3,"Ân cần":-.2,"Thật thà":-.2,"Điềm tĩnh":-.1},
  trong:{"Kiệm":-.5,"Khiêm":-.3,"Lễ":-.2},spread:.3,k:.5,fMin:.2,/* a viewer's line never below fMin × allowance */likeAff:3,npcCapK:.4},
 /* Thái hậu hears of a room her own taste calls too lavish (someone saw it or the talk reached her) and rebukes the owner: o in 100 a month, th favour, Danh, mood */
 th:{o:20,thAff:-6,danh:-2,mood:24},
 /* her mood (and every NPC's), weekly, the one jemo bar */
 mood:{fit:22,lux:34,wither:20},
 rum:{lv:2,o:12},   /* a room at or above lv (or with a piece above the owner's rank) spreads: each consort hears it o in 100 a week (roll) (a tip, never proof) */
 rep:1,             /* quá xa xỉ: tiếng xa hoa (jlux p.luxRep) +rep each month */
 /* NPC shelves: seed pieces by rank (0..7) on first look, then they arrange their chest weekly within capF × allowance (proud traits capHi) */
 npc:{seed:[0,1,1,2,2,3,3,4],capF:.9,care:.8},/* + taste × taste.npcCapK: a lover of show fills her shelf further, and only she puts a non-gift piece above her rank */
 /* plants + creatures (jpet model): care 0..100, falls (start-wither)/hw a tuần; servants care by default (0 khắc), quality by lòng and traits; her own care = the minigame */
 plant:{start:80,hw:3,wither:35,deadW:3,witherLux:.3,khacSelf:1,/* OWNER DECIDED (OD 17/11 ~18:15Z, option 1): servants care plants + pets at 0 khắc to her; 'Tự tay chăm' = khacSelf khắc; ONE 'Chăm sóc' act */srvBase:.45,srvLoyK:.006,srvMax:1.1,qCut:[.6,.9],/* servant care words: below qCut[0] vụng về, below qCut[1] tạm được, else khéo tay */srvTr:{"Cẩn thận":.2,"Chăm chỉ":.2,"Lười biếng":-.3,"Vụng về":-.2},
  gain:[10,45],word:[.35,.8],/* her care score: below word[0] "chưa khéo", at or above word[1] "rất khéo tay" */game:{rounds:3,steps:10,band:[6,8],ms:[260,170]}},
 /* the shared deed "Ghé chơi" (TW call): friendship + a look at the room */
 visit:{rel:3,w:.6,dayP:24,base:5,herW:15,upW:5},/* a drop-in visit = kind g3call (her ally need); dayP = the chance (in 100) her free buổi lets her go (read in npcWhy done; 24 = the old 12 for everyone, raised as only consorts with an ally need ≥ g3.call.min now have the reason: 12-seed probe, visits to her 0.73× at 18; G1 #7); target weight base + liking (+ her, + a superior) *//* anyone not on bad terms may call (owner: NPCs come to her room as she goes to theirs) */
 seeDeeds:["call","visit","help","apol","provoke","humil","test","mediate","warn"],
 /* Tố xa xỉ / Tố vượt phẩm, the room cause. Nobody knows the scores (owner (d)): a charge rests on what one SAW, a TIP (rumour) or a GUESS; the inquiry settles the truth.
    guessO: a hostile NPC with nothing seen / heard still accuses on a guess guessO in 100 a month (npcO in 100 with something seen / heard); vp*: a ngự ban piece above rank is allowed, so a proven charge only sends it back to the chest */
 acc:{cdA:48,vpConf:1,/* proven vượt phẩm: a ngự ban piece only goes back to the chest (vpDanhT); any other over-rank piece is confiscated + punish(vượt phẩm, vpConf) */cdT:72,ghenMin:70,npcO:15,guessO:2,ducT:-2,danhT:-4,repT:2,danhA:2,rel:-10,waveDanhA:-2,falseDanhA:-5,falseDanhT:2,falseRel:-12,vpDanhT:-2}}});

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
 cungdang:["Cung đăng lụa","Đèn lụa treo trong điện"],daminh:["Dạ minh châu","Ngọc châu sáng trong đêm"],
 sonthuy:["Sơn thủy cổ họa","Bức sơn thủy cổ, núi sông mờ sương, cùng một tay danh gia"],hoadieu:["Hoa điểu cổ họa","Bức hoa điểu cổ, chim đậu cành hoa, cùng một tay danh gia"],
 hophuong:["Hạp hương đồng","Hộp hương đồng nắp tròn, kèm muỗng và kẹp gắp hương"],nhatquy:["Nhật quy nhỏ","Mặt nhật quy bằng đồng thau của Tây dương, xem bóng biết giờ"],
 butlong:["Bút lông","Bút lông cán trúc gác trên giá ngọc"],muchuy:["Mực Huy","Thỏi mực Huy Châu đen nhánh, khắc chữ vàng"]};
 const P=BAL.shelf.it;for(const k in D){if(IT[k])continue;const s=P[k];IT[k]={n:D[k][0],kd:"Bày biện",d:`${D[k][1]} · bày ở Đa Bảo Các`,pr:s.imp?0:s.pr|0,/* imperial: no price, so no shop / weekly rare item can ever offer it */rk:0,tg:s.dead||s.imp?[]:["rv","th","hh"],gv:3}}})();
/* the Nội vụ phủ tray offers only décor within her rank (reviewer r1 fix (1), kept by builder #2): a BUYING rule — OD 17/11 ~19:50Z lifts only the DISPLAY block (an over-rank piece she owns, from a gift or bought before a demotion, may still stand) */
/* Nội vụ phủ tray + ngự ban: décor joins without changing the old lists' balance */
(function(){const P=BAL.shelf.it,has=(k,c)=>!!(P[k]&&!P[k].imp&&!P[k].dead&&(P[k].src||"").includes(c)&&IT[k]);window.SHELF_SRC=c=>Object.keys(P).filter(k=>has(k,c));
 if(typeof restock==="function"){const r0=restock;restock=function(){const r=r0.apply(this,arguments);try{if(S&&Array.isArray(S.shop))for(const k of shuf(SHELF_SRC("m").filter(k=>(P[k].rk|0)<=(rkOf(S)|0))).slice(0,BAL.shelf.shopN))if(!S.shop.includes(k))S.shop.push(k)}catch(e){console.error("shelf restock",e)}return r};window.restock=restock}
 if(typeof bestow==="function"){const b0=bestow;bestow=function(p,why){if(!BEST||why==="son"||!roll(BAL.shelf.bestO))return b0.apply(this,arguments);const w=BEST[why]?why:"night",L0=BEST[w];
   BEST[w]=SHELF_SRC("n");try{return b0.apply(this,arguments)}finally{BEST[w]=L0}};window.bestow=bestow}})();
/* the one luxury number per piece (jlux luxPiece): a new décor piece = the kit formula luxVal on its BAL grade + price */
function shelfLuxK(k){const s=BAL.shelf.it[k];return s&&s.gr!=null?LUX_V[s.gr]+Math.round((s.pr||0)/10):null}
(function(){if(typeof luxPiece!=="function")return;const l0=luxPiece;luxPiece=function(k){const v=shelfLuxK(k);if(v!=null)return v;return l0.apply(this,arguments)};window.luxPiece=luxPiece})();

/* the kit item info (grade chip, colour) of a new décor piece = its BAL grade gr, the same grade the luxury formula uses (one core) */
(function(){if(typeof kitItemInfo!=="function")return;const k0=kitItemInfo;kitItemInfo=function(x){const I=k0.apply(this,arguments);try{const k=x&&typeof x==="object"?x.k:x,s=BAL.shelf.it[k];
 if(I&&s&&s.gr!=null&&!(x&&x.wk)){const g=Math.max(0,Math.min(4,s.gr|0)),G=(typeof KIT_GRADE!=="undefined"&&KIT_GRADE[g])||null;I.grade=g;if(G){I.gname=G.n;I.col=G.c}}}catch(e){}return I};window.kitItemInfo=kitItemInfo})();
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
function shelfSlots(g){const L=[g];for(let i=1;i<BAL.shelf.per;i++)L.push(g+"~"+i);return L}
function shelfSlotG(s){return String(s).split("~")[0]}
function shelfIn(p,g){const z=shelfOf(p);return shelfSlots(g).filter(s=>z.g[s]).map(s=>[s,z.g[s]])}/* [slot, entry] of one group */
function shelfList(p){const z=shelfOf(p);const L=[];for(const x of BAL.shelf.groups)for(const s of shelfSlots(x[0]))if(z.g[s])L.push(z.g[s]);return L}
/* why a chest entry cannot go on display ("" = it can). NO rank block (owner OD 17/11 ~19:50Z): over rank only risks a charge (shelfOver) */
function shelfWhyNot(p,e){if(!e||!IT[e.k])return"không có món này";const g=shelfGrpE(e);if(!g)return"món này không để bày";if(e.h)return"không có trong rương";
 if(e.w)return"đang mặc, tháo ra trước";if(p.out)return"ở lãnh cung không được bày biện";return""}
/* put chest entry ix on display (the piece already in that group goes back to the chest) */
/* the slot a new piece of group g takes: the first free one, else (group full) the least luxurious piece's slot — that piece goes back to the chest */
function shelfSlotFor(p,g){const z=shelfOf(p),S0=shelfSlots(g),fr=S0.find(s=>!z.g[s]);if(fr)return fr;return S0.slice().sort((a,b)=>shelfPiece(z.g[a])-shelfPiece(z.g[b]))[0]}
function shelfPut(p,ix,slot){const e=(p.inv||[])[ix];const why=shelfWhyNot(p,e);if(why)return{ok:false,why};const z=shelfOf(p),g=shelfGrpE(e);
 const s=slot&&shelfSlotG(slot)===g&&shelfSlots(g).includes(slot)?slot:shelfSlotFor(p,g),old=z.g[s];
 p.inv.splice(ix,1);if(old)p.inv.push(old);if(shelfIsPlant(e)&&e.pc==null){e.pc=BAL.shelf.plant.start;e.pz=0}e.shw=wk();z.g[s]=e;if(old)shelfSetSync(p);return{ok:true,g,slot:s,old:old?shelfNm(old):"",n:shelfNm(e)}}
function shelfNm(e){if(!e)return"";if(e.k==="tp"&&e.wk)return e.wk.n||itm("tp").n;return itm(e.k).n}
function shelfTake(p,g){const z=shelfOf(p),e=z.g[g];if(!e)return"";delete z.g[g];p.inv=p.inv||[];p.inv.push(e);shelfSetSync(p);return shelfNm(e)}
/* the one luxury number of a displayed piece: table / IT pieces = jlux luxPiece; her handmade work = the kit grade of its bậc (LUX_V); a living piece in bad care counts witherLux */
function shelfPiece(e){if(!e)return 0;let v=0;try{if(e.k==="tp"){const a=itemArt(e);v=LUX_V[a?a.grade|0:0]}else v=luxPiece(e.k)}catch(x){v=0}if(shelfBad(e))v=Math.round(v*BAL.shelf.plant.witherLux);return v}
/* the DWELLING score: sum of the displayed pieces vs the rank allowance × allowF (never shown to anyone: owner (d); the player learns it from consequences) */
/* one group's share of the room: best piece full, the next ones BAL.shelf.wt (sorted high → low) */
function shelfGrpLux(p,g){const W=BAL.shelf.wt;return shelfIn(p,g).map(x=>shelfPiece(x[1])).sort((a,b)=>b-a).reduce((s,v,i)=>s+v*(W[i]!=null?W[i]:0),0)}
function shelfLux(p){const L=shelfList(p);const sc=Math.round(BAL.shelf.groups.reduce((s,x)=>s+shelfGrpLux(p,x[0]),0));let bud=1;try{bud=Math.max(1,Math.round(luxAllow(p)*BAL.shelf.allowF))}catch(e){}
 const B=BAL.shelf;const lv=sc<bud*B.plainF?0:sc<=bud?1:sc<=bud*B.lv3?2:3;return{sc,bud,lv,name:SHELF_LV[lv],n:L.length,wither:L.some(shelfBad),vr:L.filter(e=>shelfOver(p,e)).length}}
function shelfSig(p){return shelfList(p).map(e=>(e.k==="tp"&&e.wk?"tp-"+e.wk.kind+(e.wk.ti|0):e.k)+(shelfBad(e)?"~":"")).sort().join("|")}
window.shelfOf=shelfOf;window.shelfPut=shelfPut;window.shelfTake=shelfTake;window.shelfLux=shelfLux;window.shelfList=shelfList;

/* ---------- NPC shelves: seeded once by rank, arranged weekly from their own chest (same data, same rule) ---------- */
function shelfPool(p,src){const B=BAL.shelf.it,r=rkOf(p)|0;return Object.keys(B).filter(k=>IT[k]&&!B[k].imp&&!B[k].dead&&(B[k].rk|0)<=r&&/[mpv]/.test(src||B[k].src||""))}
function shelfSeed(p){const B=BAL.shelf,n=B.npc.seed[Math.max(0,Math.min(7,rkOf(p)|0))]|0;if(!n)return;let bud=1;try{bud=luxAllow(p)*B.allowF}catch(e){}
 const z=p.shelf;const pool=shelfPool(p);let left=bud*B.npc.capF;
 for(const k of shuf(pool.slice())){if(Object.keys(z.g).length>=n)break;const g=shelfGrp(k);const sl=shelfSlots(g).find(s=>!z.g[s]);if(!sl)continue;const v=luxPiece(k);if(v>left)continue;
  const e={k,from:"me"};if(B.it[k].care){e.pc=B.plant.start;e.pz=0}e.shw=wk();z.g[sl]=e;left-=v}}
function shelfArrange(p){const B=BAL.shelf,z=shelfOf(p);let bud=1;try{bud=luxAllow(p)*B.allowF}catch(e){}
 const ta=shelfTaste(p),cap=bud*(B.npc.capF+ta*B.taste.npcCapK);
 /* try each chest piece in its slot (free, or replacing the group's least piece); keep it only if the room gains and stays within her cap, else undo */
 for(let i=(p.inv||[]).length-1;i>=0;i--){const e=p.inv[i];if(shelfWhyNot(p,e)||e.t)continue;if(shelfOver(p,e)&&e.from!=="emp"&&ta<=0)continue;
  const now=shelfLux(p).sc,R=shelfPut(p,i);if(!R.ok)continue;const aft=shelfLux(p).sc;if(aft>now&&aft<=cap)continue;
  const old=R.old?p.inv.pop():null;if(old)z.g[R.slot]=old;else delete z.g[R.slot];p.inv.splice(i,0,e)}}

/* ---------- TASTE: each person's own like ↔ dislike of luxury (owner OD 17/11 ~19:50Z), numbers BAL.shelf.taste ---------- */
function shelfTaste(p){const T=BAL.shelf.taste;if(!p)return 0;let v=0;try{for(const n of (typeof traitsOf==="function"?traitsOf(p==="th"?{kind:"th"}:p):[])||[])v+=T.tr[n]||0}catch(e){}
 try{if(typeof trongOf==="function")for(const n of trongOf(p)||[])v+=T.trong[n]||0}catch(e){}
 try{const h=ctxHash(ctxSeed()+"|shelfTaste|"+(p==="th"?"th":ctxKey(p)));v+=[-1,-.5,0,.5,1][h%5]*T.spread}catch(e){}return cl(v,-1,1)}
window.shelfTaste=shelfTaste;
const SHELF_TASTE_W=[[-.5,"ghét xa hoa"],[-.15,"chuộng giản dị"],[.15,"không để ý"],[.5,"ưa sang trọng"],[9,"mê xa hoa"]];
function shelfTasteWord(p){const v=shelfTaste(p);return SHELF_TASTE_W.find(x=>v<x[0])[1]}
/* the room as ONE viewer sees it: the same sum against her own line (allowance × (1 + taste × k)); the inquiry uses the rule (shelfLux) */
function shelfLvFor(obs,t){const x=shelfLux(t),B=BAL.shelf;if(!obs||obs===t)return x.lv;const f=Math.max(B.taste.fMin,1+shelfTaste(obs)*B.taste.k);
 return x.sc<x.bud*B.plainF?0:x.sc<=x.bud*f?1:x.sc<=x.bud*B.lv3*f?2:3}
window.shelfLvFor=shelfLvFor;

/* ---------- what people SEE of a room (jdress model): same place, Dò la, maid's report; rumours = a tip (belief), never proof ---------- */
function shelfRec(t,by,pf,obs){const x=shelfLux(t);return{w:wk(),lv:shelfLvFor(obs,t),n:x.n,wi:x.wither?1:0,vr:x.vr,sig:shelfSig(t),by:by||"",pf:pf?1:0}}
function shelfLook(obs,t,by,pf){if(!obs||!t||obs===t||t.alive===false)return null;const r=shelfRec(t,by,pf!==false,obs);obs.shn=obs.shn||{};const k=wdKey(t),o=obs.shn[k];
 /* a rumour never overwrites proof of the same room */if(!r.pf&&o&&o.pf&&o.sig===r.sig&&wk()-o.w<=BAL.shelf.see.seenW)return o;
 /* NPCs keep only what matters (an over-allowance room, a piece above rank, a withered plant): saves stay small */if(obs!==S&&r.lv<2&&!r.wi&&!r.vr){delete obs.shn[k];return r}
 obs.shn[k]=r;return r}
function shelfSeen(obs,t){const r=obs&&obs.shn&&obs.shn[wdKey(t)];if(!r||wk()-r.w>BAL.shelf.see.seenW)return null;return r}
function shelfNow(obs,t){const r=shelfSeen(obs,t);return r&&r.sig===shelfSig(t)?r:null}
window.shelfLook=shelfLook;window.shelfSeen=shelfSeen;window.shelfNow=shelfNow;
/* a visitor's eye on the room: her view of the owner (superiors frown on a room above its rank, peers envy, a fitting room is admired) */
function shelfReact(obs,t){if(!obs||!t||obs===t||obs===S)return"";const B=BAL.shelf.see;obs.shR=obs.shR||{};const k=wdKey(t);if(obs.shR[k]!=null&&wk()-obs.shR[k]<B.cdW)return"";obs.shR[k]=wk();
 const x=shelfLux(t);if(!x.n)return"";const pl=shelfLvFor(obs,t),ta=shelfTaste(obs);const sup=obs.queen||rkOf(obs)>rkOf(t);let m=1;try{m=tv(LUX_TR,obs)||1}catch(e){}
 /* by HER OWN eye (taste): too lavish → a superior frowns, a peer envies; to her liking → admired, a lover of show admires more */
 if(pl>=2){if(sup)affAdd(obs,t,B.supAff[pl]);else{const n=Math.round(B.ghen[pl]*m);if(t===S)obs.ghen=cl((obs.ghen||0)+n,0,100);else oanAdd(obs,t,n*B.npcOanK)}}
 else if(pl===1)affAdd(obs,t,B.fitAff+Math.round(Math.max(0,ta)*BAL.shelf.taste.likeAff*(x.lv>=2?1:.5)));
 if(!sup&&shelfList(t).some(e=>e.from==="emp"||e.from==="th")){if(t===S)obs.ghen=cl((obs.ghen||0)+B.nguGhen,0,100);else oanAdd(obs,t,B.nguGhen*B.npcOanK)}
 if(x.wither)affAdd(obs,t,B.witherAff);return SHELF_LV[pl]}
window.shelfReact=shelfReact;
function shelfSee(obs,t,by){const r=shelfLook(obs,t,by,true);if(r)shelfReact(obs,t);return r}
const SHELF_PW={k:""};/* once per buổi (placeWhere runs many times a buổi: perf) */
/* her walk into a palace: she sees the rooms of everyone living there; NPCs at her palace the same buổi see hers */
(function(){if(typeof goTo==="function"){const g0=goTo;goTo=function(){const was=S&&S.place;const r=g0.apply(this,arguments);try{if(S&&S.place!==was&&!S.out)for(const v of liveRivals(true))if(v.alive&&palaceOf(v)===S.place)shelfSee(S,v,"tận mắt")}catch(e){console.error("shelf goTo",e)}return r}}
 if(typeof placeWhere==="function"){const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{const kb=wk()+"-"+(S&&S.buoi||0);if(S&&!S.dead&&S.where&&!shelfGuest()&&SHELF_PW.k!==kb&&(SHELF_PW.k=kb))for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const w=whereOf(v);
   if(w==="home"&&!S.out)shelfSee(v,S,"tận mắt");else for(const o of liveRivals(true))if(o!==v&&o.alive&&!o.out&&palaceOf(o)===w&&w!==palaceOf(v))shelfSee(v,o,"tận mắt")}}catch(e){console.error("shelf where",e)}return r}}})();
/* Dò la (both ways) also reports the room; her maid's "Sai đi dò la" the same */
function shelfSpyTxt(a,t,by){const r=shelfSee(a,t,by);if(!r||a!==S)return"";return `Phòng của ${NM(t)}: ${r.n?`bày ${r.n} món, ${SHELF_LV[r.lv].toLowerCase()}`:"không bày gì"}${r.vr?", có món quá phẩm nàng":""}${r.wi?", có cây cảnh, chim cá bỏ bê":""}. `}
(function(){if(typeof spyFind==="function"){const s0=spyFind;spyFind=function(a,t){const r=s0.apply(this,arguments);let add="";try{add=shelfSpyTxt(a,t,a===S?"dò la":(a.name||""))}catch(e){}return (r||"")+add}}
 if(typeof spyMaidRun==="function"){const m0=spyMaidRun;spyMaidRun=function(v,ag){const ok=m0.apply(this,arguments);try{if(ok&&v){const m=ag||S.maid||{};const t=shelfSpyTxt(S,v,m.name||"cung nữ");if(t){log(`${m.name||"Cung nữ"} báo: ${t}`);try{noteAdd(v.id,t)}catch(e){}}}}catch(e){console.error(e)}return ok}}})();

/* ---------- NPC VISITS (owner (2): "tại sao người ta không tới phòng của tôi?") — the shared deed Ghé chơi, two-way ---------- */
(function(){try{BAL.tw.g.call=BAL.shelf.visit.rel;
 TWD("call",{n:"Ghé chơi",req:(a,t)=>!!t&&t!==a&&!t.out&&t.alive!==false,run:(a,t)=>/* RECEIVER CHOICE (jrcv RCVK.call): the host answers */rcvAsk("call",a,t)});
 SOC.call={w:BAL.shelf.visit.w,ok:(v,t)=>t!==v&&!t.out&&aff(v,t)>netTh(v,"ky"),run:(v,t)=>twDo(v,t,"call",true)};
 if(typeof AGSOC==="object"){AGSOC.call=["call","social","ally",g=>({ally:g.call})];AGACTW.call="ghé chơi"}}catch(e){console.error("shelf call",e)}})();
/* two-way (OD:L1386): the deed NPCs do to her is also hers — "Ghé chơi" in her talk list (jtwoway topicOpts), same deed, same gain, both see the rooms */
(function(){if(typeof topicOpts!=="function")return;const t0=topicOpts;topicOpts=function(v){const A=t0.apply(this,arguments);try{const D=TW.call;
 if(S&&v&&D&&!(typeof sameHouse==="function"&&sameHouse(S,v))&&D.req(S,v)&&!A.some(a=>a.n===D.n))A.push({n:D.n,o:100,x:`nàng quý ngươi +${BAL.tw.g.call} · hai bên thấy phòng ốc của nhau`,run:()=>{try{chatMark(v)}catch(e){}return twDo(S,v,"call",true)+"."}})}catch(e){console.error("shelf talk",e)}return A};window.topicOpts=topicOpts})();
/* the visit happens AT the target's palace (her room / theirs), not wherever she is that khắc */
(function(){if(typeof agOpts!=="function")return;const o0=agOpts;agOpts=function(){const O=o0.apply(this,arguments);try{for(const o of O)if(o.k==="call")o.at=(kh,vv,tt)=>tt?palaceOf(tt):null}catch(e){}return O}})();
/* daily life: a consort who keeps her schedule this buổi may drop in on someone (her room weighs more: the player's palace is where life is seen)
   NPC-PURPOSE G3: only when her ALLY need (0..1 × g3.call.k) is real (≥ BAL.ag.why.g3.call.min) and at most once per BAL.ag.why.cd.g3call tuần; the one she visits = near-best
   of the people she likes (old weights); no daily dice */
npwReg("g3call",{who:c=>[c.v],why:v=>{const V=BAL.shelf.visit;let N={};try{N=agNeedsC(v)}catch(e){}const n=(N.ally||0)*BAL.ag.why.g3.call.k;/* need 0..1 → the 0..100 score scale */if(n<BAL.ag.why.g3.call.min)return null;
  const L=[S].concat(liveRivals(true)).filter(x=>x&&x!==v&&x.alive!==false&&!x.out&&aff(v,x)>netTh(v,"ky"));const t=npwPick(L,x=>V.base+Math.max(0,aff(v,x))+(x===S?V.herW:0)+(rkOf(x)>rkOf(v)?V.upW:0),{all:true});/* G1 #7: every one she likes may be the one (old agPw weights); top-only sent the herW-boosted player most calls: visits to her 174→383 */
  return t?{s:n,t,r:"muốn thân với "+npwNm(t),k:palaceOf(t)}:null}});
(function(){if(typeof agDecide0!=="function")return;const d0=agDecide0;agDecide0=function(v){const r=d0.apply(this,arguments);try{if(r||!v||v.confined)return r;
  const w=npcWhy("g3call",{v},()=>roll(BAL.shelf.visit.dayP));/* the chance to drop in this buổi = the old dayP (her free buổi); cd stamped only when she goes */const t=w&&w.tgt;if(!t)return r;const c={k:"call",t,tag:"social",act:AGACTW.call,need:"ally",why:w.why,at:(kh,vv,tt)=>palaceOf(tt)};const sl=agSlot(v,c.at,t);if(!sl)return r;
  let N={};try{N=agNeedsC(v)}catch(e){}agPlan(v,c,N,sl[0],sl[1]);return 1}catch(e){console.error("shelf call day",e)}return r}})();
/* any visiting deed landing at the target's palace shows the visitor the room (sang thăm, giúp, tạ lỗi, khiêu khích …) */
(function(){if(typeof agLand0!=="function")return;const l0=agLand0;agLand0=function(p){const r=l0.apply(this,arguments);try{if(r&&p&&BAL.shelf.seeDeeds.includes(p.k)&&p.k!=="call"){const v=RV(p.vid),t=agPerson(p.t);if(v&&t&&p.pl===palaceOf(t))shelfSee(v,t,"tận mắt")}}catch(e){console.error("shelf land",e)}return r}})();

/* ---------- Tố xa xỉ / Tố vượt phẩm: the room is a second cause of the SAME acts (jdress ACT.xx, j8 ACT.vp) ----------
   Owner OD 17/11 ~18:25Z (d): nobody knows the exact scores; anyone may accuse on what she SAW (visit, Dò la), on a TIP (rumour, someone told her) or on a GUESS;
   the inquiry settles the truth (a false charge costs the accuser). The player may guess at anyone; an NPC guesses only in the monthly pass (shelfNpcAccuse). */
function shelfCause(a,t,kind){if(!a||!t||a===t||t.alive===false||t.out)return null;const r=shelfSeen(a,t);
 if(r&&(kind==="vp"?r.vr>0:r.lv>=2))return{how:r.pf?"pf":"tip",r};return a===S?{how:"guess",r:null}:null}
window.shelfCause=shelfCause;
function shelfStrip(t){const z=shelfOf(t);const L=Object.keys(z.g).filter(s=>z.g[s]).sort((x,y)=>shelfPiece(z.g[y])-shelfPiece(z.g[x]));return L.length?shelfTake(t,L[0]):""}
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
/* any piece may stand (owner OD 17/11 ~19:50Z); a proven vượt phẩm finding is judged: a ngự ban piece only goes back to the chest (Danh vpDanhT),
   any other over-rank piece is confiscated (jil "conf", Nội vụ phủ store) and she is punished like a worn vượt phẩm (j8 vpAccuse: punish + BAL.eff.j8.danhVpAccuse) */
function shelfVpAccuse(a,t){const B=BAL.shelf.acc;let judge="";try{judge=judgeName(t)}catch(e){judge="Hoàng hậu"}const A0=NMc(a),T0=NM(t);shelfInq(a,t);
 const z=shelfOf(t),G=Object.keys(z.g).filter(g=>shelfOver(t,z.g[g]));if(!G.length)return shelfFalse(a,t,"bày đồ vượt phẩm");
 const ngu=G.filter(g=>z.g[g].from==="emp"),own=G.filter(g=>z.g[g].from!=="emp");
 if(!roll(oVP(a))){ap(a,{danh:B.waveDanhA});relAdd(a,t,B.rel);return `${A0} tố ${T0} bày đồ vượt phẩm, ${judge} bỏ qua${own.length?"":", vì là đồ ngự ban"}. ${a===S?"Danh "+B.waveDanhA+". ":""}`}
 relAdd(a,t,B.rel);ap(a,{danh:B.danhA});const back=ngu.map(g=>shelfTake(t,g)).filter(Boolean);let gone=[];
 if(own.length){const E=own.map(g=>z.g[g]);gone=E.map(shelfNm);for(const g of own)shelfTake(t,g);try{ilFilter(t,e=>!E.includes(e),"conf")}catch(x){t.inv=(t.inv||[]).filter(e=>!E.includes(e))}
  ap(t,{danh:BAL.eff.j8.danhVpAccuse});try{punish(t,"vượt phẩm",B.vpConf)}catch(x){}}else ap(t,{danh:B.vpDanhT});
 return `${A0} tố ${T0} bày đồ vượt phẩm: <span class="${t===S?"r":"g"}">thành</span>. ${back.length?`${judge} dạy đồ ngự ban quá phẩm thì cất giữ, không bày ra: ${back.join(", ")} phải cất vào rương. `:""}${gone.length?`${gone.join(", ")} bị tịch thu. `:""}${NMc(t)} Danh ${own.length?balSg(BAL.eff.j8.danhVpAccuse):B.vpDanhT}. `}
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
  /* NPC-PURPOSE G3: her target = the one she resents most (was: a shuffled list); seen / heard first, a guess only on the one she hates */
  const w=npcWhy("g3acc",{a,T});const t=w&&w.tgt;if(!t)continue;{
   const r=shelfSeen(a,t);let kind=r&&r.vr>0?"vp":r&&r.lv>=2?"xx":null;
   if(kind?!roll(B.npcO):!roll(B.guessO))continue;if(!kind)kind="xx";/* a guess */
   a.shA=wk();t.shT=wk();const txt=kind==="vp"?shelfVpAccuse(a,t):shelfAccuse(a,t);if(t===S)Q.push({t:kind==="vp"?"Bị tố bày đồ vượt phẩm":"Bị tố bày biện xa xỉ",who:typeof pv==="function"?pv(a):null,h:`<p>${txt}</p>`});else try{newsAdd(a,kind,txt,false)}catch(e){}}}}
npwReg("g3acc",{who:c=>[c.a],why:(a,c)=>{const B=BAL.shelf.acc;const L=c.T.filter(t=>hostility(a,t)>=netTh(a,"host")||(t===S&&(a.ghen||0)>=B.ghenMin));
  const t=npwPick(L,x=>hostility(a,x)+(shelfSeen(a,x)?netTh(a,"host"):0));return t?{s:Math.min(100,hostility(a,t)),t,r:"oán "+npwNm(t)}:null}});

/* Thái hậu: her own taste decides; she hears of a room through the palace talk (someone saw it or heard of it) — even ngự ban can be "quá xa xỉ" to her (owner OD 17/11 ~19:50Z) */
function shelfThRebuke(){if(!S||S.thDead)return;const B=BAL.shelf.th;const P=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false&&!p.out);
 for(const t of P){if(shelfLvFor("th",t)<2)continue;/* G3: someone who saw the room carries it to her (a grudge against the owner, npcTell); nobody → she never hears */const tl=npcTell(t,{from:P.filter(o=>o!==t&&o!==S&&shelfSeen(o,t)),to:S.thO||{}});if(!tl||!roll(B.o))continue;
  const ngu=shelfList(t).some(e=>e.from==="emp");ap(t,{th:B.thAff,danh:B.danh});/* the one stat path (Thái hậu favour runs −100…100) */try{if(typeof emoSet==="function")emoSet(t,"buon",B.mood,"bị Thái hậu quở vì phòng ốc xa xỉ")}catch(e){}
  const h=`Thái hậu nghe ${npwNm(tl.who)} nói phòng ${t===S?"ngươi":t.name} bày biện quá xa xỉ${ngu?", đồ ngự ban cũng không nên phô ra như thế":""}, cho gọi đến quở trách. Thái hậu thiện cảm ${B.thAff}, Danh ${B.danh}.`;
  if(t===S){if(!(typeof tsbBot==="function"&&tsbBot()))Q.push({t:"Thái hậu quở",who:typeof pTH==="function"?pTH():null,h:`<p>${h}</p>`})}else try{newsAdd(t,"xx",h,false)}catch(e){}}}
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
function shelfMood(p){if(typeof emoSet!=="function")return;const x=Object.assign({},shelfLux(p)),M=BAL.shelf.mood;if(p!==S&&shelfTaste(p)<0&&x.lv>=2)x.lv=1;/* a frugal owner takes no joy in show */
 if(x.wither)emoSet(p,"buon",M.wither,"cây cảnh, chim cá trong phòng bỏ bê");else if(x.lv>=2)emoSet(p,"vui",M.lux,"phòng ốc bày biện lộng lẫy");else if(x.lv===1)emoSet(p,"vui",M.fit,"phòng ốc bày biện vừa ý")}
function shelfRumour(){const B=BAL.shelf.rum;const P=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false&&!p.out);let heardMe=0;
 for(const t of P){const x=shelfLux(t);if(x.lv<B.lv&&!x.vr)continue;for(const o of P){if(o===t||shelfSeen(o,t))continue;/* G3: a rumour has a mouth — one who saw the room and resents its owner or likes the listener (npcTell) */const tl=npcTell(t,{from:P.filter(w=>w!==o&&w!==t&&w!==S&&shelfSeen(w,t)),to:o});if(!tl||!roll(B.o))continue;shelfLook(o,t,"tin đồn",false);if(t===S)heardMe++;
   else if(o===S){try{noteAdd(t.id,`Nghe đồn phòng ${t.name} ${x.vr?"bày đồ quá phẩm nàng":"bày biện "+SHELF_LV[x.lv].toLowerCase()}.`)}catch(e){}}}}
 if(heardMe&&!(typeof tsbBot==="function"&&tsbBot()))log(`Hậu cung xì xào về đồ bày trong phòng ngươi.`)}
/* co-op: the world (NPC shelves, rumours, NPC charges, Thái hậu, reputation) is computed once on the host (jcoopone rule); the guest runs only her own room */
function shelfGuest(){try{return typeof worldOn==="function"&&!worldOn()}catch(e){return false}}
function shelfWeek(){if(!S||S.dead)return;try{shelfAccHook()}catch(e){}const gu=shelfGuest();const P=(gu?[S]:[S].concat(liveRivals(true))).filter(p=>p&&p.alive!==false);
 for(const p of P){try{if(p.out){if(p.shelf&&p.shelf.g)for(const g in p.shelf.g)shelfTake(p,g);shelfSetSync(p);continue}if(p!==S)shelfArrange(p);shelfPlantWeek(p);shelfSetCheck(p);shelfMood(p)}catch(e){console.error("shelfWeek",e)}}
 if(gu)return;try{shelfRumour()}catch(e){console.error("shelfRumour",e)}
 if(S.shM!==S.turn){S.shM=S.turn;for(const p of P){try{if(shelfLux(p).lv>=3)p.luxRep=Math.min(BAL.lux.repMax,(p.luxRep|0)+BAL.shelf.rep)}catch(e){}}try{shelfNpcAccuse()}catch(e){console.error("shelfNpcAccuse",e)}try{shelfThRebuke()}catch(e){console.error("shelfThRebuke",e)}}}
window.shelfWeek=shelfWeek;
(function(){if(typeof petWeek!=="function")return;const w0=petWeek;petWeek=function(){const r=w0.apply(this,arguments);try{shelfWeek()}catch(e){console.error("shelfWeek",e)}return r}})();

/* ---------- jil: a displayed piece is still the owner's (one ledger, conservation law) ---------- */
(function(){if(typeof ilSlots==="function"){const s0=ilSlots;ilSlots=function(p){const o=s0.apply(this,arguments);try{if(p&&p.shelf&&p.shelf.g)for(const g in p.shelf.g){const e=p.shelf.g[g];if(e&&e.k)o.push(e)}}catch(e){}return o}}
 if(typeof ilOut==="function"){const o0=ilOut;ilOut=function(p,e){try{if(p&&p.shelf&&p.shelf.g)for(const g in p.shelf.g)if(p.shelf.g[g]===e){delete p.shelf.g[g];shelfSetSync(p);return}}catch(x){}return o0.apply(this,arguments)}}})();

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
 kitModal({kind:"info",title:`Chăm ${shelfNm(e).toLowerCase()}`,sub:shelfGName(shelfSlotG(g)),itemPic:kitItem({src:typeof kitItemSrc==="function"?kitItemSrc(e.k,""):"",name:"",grade:0,size:"lg"}).replace('<span class="kitn"></span>',''),
  html:`<div id="kshp">${shelfPlantBody(e)}</div>`,onClose:()=>{kgTutDrop();SHPC.g=null;SHPC.game=null}})}
window.shelfPlantOpen=shelfPlantOpen;
/* the care minigame (also the Thử tay calibration entry): water rises step by step; stop it inside the band; score = closeness over the rounds */
/* MG11: env (optional) = the board ease (BAL.mgTier.lev.tuoi f × the pour pace; middle ease = the old pace, law 5) + the round on the HUD; the SAME board is the Thử tay kind tuoi (jmgx) */
function shelfWaterGame(box,done,W,env){W=W||SHELF_CARE.cay;const G=BAL.shelf.plant.game,F=env?mgLev(env,"tuoi","f"):1;let r=0,lv=0,tm=0,sum=0;const stop=()=>clearTimeout(tm);const hr=()=>{if(env&&env.hud)env.hud({round:`${Math.min(r+1,G.rounds)}/${G.rounds}`})};
 const draw=()=>{box.innerHTML=`<div class="rbtn"><button type="button" class="kgbtn" data-shw="stop" aria-label="${W.stop}" title="${W.stop}" data-kgsign="●">●</button></div>`+NWB.cnt(G.steps,lv,0,G.band)};
 const tick=()=>{if(!document.body.contains(box)){stop();return}lv++;if(lv>G.steps){end(0);return}draw();tm=setTimeout(tick,F*(G.ms[0]-(G.ms[0]-G.ms[1])*r/Math.max(1,G.rounds-1)))};
 const end=s=>{stop();sum+=s;r++;lv=0;hr();if(r>=G.rounds){SHPC.game=null;done(sum/G.rounds);return}draw();tm=setTimeout(tick,F*G.ms[0])};
 box.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shw]");if(!b)return;ev.preventDefault();ev.stopPropagation();
  const d=lv<G.band[0]?G.band[0]-lv:lv>G.band[1]?lv-G.band[1]:0;end(cl(1-d/G.band[0],0,1))});draw();hr();tm=setTimeout(tick,F*G.ms[0]);SHPC.peek=()=>lv;return stop}
window.shelfWaterGame=shelfWaterGame;
function shelfPlantGain(score){const e=shelfOf(S).g[SHPC.g];if(!e)return;const G=BAL.shelf.plant.gain;const v=Math.round(G[0]+(G[1]-G[0])*score);const p0=e.pc|0;e.pc=cl(p0+v,0,100);e.pm=wk();e.pz=0;
 const msg=`Tươi tốt +${Math.round(e.pc-p0)}${score>=BAL.shelf.plant.word[1]?" · rất khéo tay":score<BAL.shelf.plant.word[0]?" · chưa khéo":""}.`;log(`Ngươi tự tay chăm ${shelfNm(e).toLowerCase()} (${msg})`);
 shelfPlantDraw(msg)}
/* the open plant screen redrawn (one function: co-op thin F4 replays it on her phone after the host's answer) */
function shelfPlantDraw(msg){kgTutDrop();const e=shelfOf(S).g[SHPC.g];const box=document.getElementById("kshp");if(box&&e){box.classList.remove("kg-open");box.innerHTML=shelfPlantBody(e,msg);try{if(typeof kitFix==="function")kitFix(box)}catch(x){}}}
/* "Để trời định" (the quick roll of the care game): one engine */
function shelfPlantQuick(){if(!shelfOf(S).g[SHPC.g])return;if(kitQuickRoll()){shelfPlantGain(BAL.skip.care);return}const msg="Để trời định: chưa thành, không thêm gì.";log(msg);shelfPlantDraw(msg)}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shc]");if(!b||b.disabled)return;ev.stopPropagation();const k=b.dataset.shc;
 if(k==="pet"){try{closeModal()}catch(x){}petcOpen(+b.dataset.i);return}
 if(k==="plant"){shelfPlantOpen(b.dataset.g);return}
 if(k==="water"){if(SHPC.game||!SHPC.g)return;const c=BAL.shelf.plant.khacSelf;if(c&&!can(c))return;const w=document.getElementById("kshpgw");if(!w)return;{const c=document.getElementById("kshp");if(c)c.classList.add("kg-open")}
  /* KIT §13.7 (mg-ui-rest, owner OD:L1981): the tap opens the RULES screen (kgReady: luật + «Hướng dẫn» + «Sẵn sàng»); the khắc are spent and the game starts only on «Sẵn sàng» */
  const W=shelfWord(shelfOf(S).g[SHPC.g]);w.innerHTML=kitGameFrame({art:"Chăm",title:W.act,how:W.how,id:"kshpgame",kind:"tuoi"})+`<div class="kg82act">${kitQuick({id:"kshpquick",n:"Để trời định",win:"được nửa phần như chăm vừa tay",lose:"không thêm gì"})}</div>`;SHPC.game="rules";SHPC.rdy=0;
  const box=document.getElementById("kshpgame");box.innerHTML=`<div class="kg82act"><button type="button" class="${kg82Btn()}" id="kshpgo">Bắt đầu</button></div>`;
  kgReady(box,{n:"Chăm",t:W.act,how:W.how,e:"hold",go:"#kshpgo",pic:"",ev:false,timed:false,tutor:(b,env)=>{const G=BAL.shelf.plant.game;const stop=shelfWaterGame(b,()=>{SHPC.game="rules";KG82.hint=null;env.end()},W,env);
    KG82.hint=()=>{const bt=b.querySelector("[data-shw]");if(!bt)return null;const r=bt.getBoundingClientRect(),lv=SHPC.peek?SHPC.peek():0;return{x:r.left+r.width/2,y:r.top+r.height/2,soon:lv>=G.band[0]-1&&lv<=G.band[1]}};
    return()=>{stop();KG82.hint=null;SHPC.game="rules"}}});
  try{const t=box.querySelector("#kgrtut")||box.querySelector("#kshpgo");if(t)t.scrollIntoView({block:"nearest"})}catch(e){}
  box.querySelector("#kshpgo").addEventListener("click",()=>{if(SHPC.game!=="rules"||SHPC.rdy)return;if(c&&!can(c))return;if(c)spend(c);SHPC.rdy=1;box.classList.remove("kgintro");box.innerHTML="";SHPC.game="water";/* MG11: the ONE result path (mgPlayRes: graded, her hand b learns it, identity offset), then the gain */const env=mgPlayEnv("tuoi",raw=>shelfPlantGain(mgPlayRes("tuoi",raw)/10));SHPC.stop=shelfWaterGame(box,s=>env.end(10*s),W,env)})}},true);
/* mg-skip-all (KIT §13.6): the quick option of the care game: won = BAL.skip.care of the gain, lost = nothing; the game in the frame stops */
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("#kshpquick");if(!b)return;ev.preventDefault();ev.stopPropagation();if(SHPC.game!=="water"&&SHPC.game!=="rules")return;
 if(!SHPC.rdy){const c=BAL.shelf.plant.khacSelf;if(c&&!can(c))return;if(c)spend(c)}/* «Để trời định» from the rules screen is a play-through too: same khắc */
 kgTutDrop();try{if(SHPC.stop)SHPC.stop()}catch(x){}SHPC.stop=null;SHPC.game=null;SHPC.rdy=0;const w=document.getElementById("kshpgw");if(w)w.innerHTML="";{const c=document.getElementById("kshp");if(c)c.classList.remove("kg-open")}
 shelfPlantQuick()},true);
/* Thử tay (calibration, OD 17/11 ~17:10Z (3)): every new minigame registers its entry; the calibration page lists window.MG_CAL */
(window.MG_CAL=window.MG_CAL||[]).push({k:"chamcay",n:"Chăm cây (tưới, tỉa lá)",run:box=>new Promise(res=>shelfWaterGame(box,res))});

/* ---------- interim entry points (kit parts only; the shelf screen itself waits for KIT READY) ---------- */
/* item panel (jinv kinvOpen): an act card "Trưng bày" on every displayable piece */
(function(){if(typeof kinvOpen!=="function")return;const k0=kinvOpen;kinvOpen=function(x){const r=k0.apply(this,arguments);if(!BAL.shelf.ui)return r;try{const i=x&&x.g?x.g.i:-1,e=S.inv[i];const g=e&&shelfGrpE(e);
  if(g){const sl=shelfSlotFor(S,g),cur=shelfOf(S).g[sl];const card=pbtn(`data-shelfput="${i}"`,"Trưng bày",`thành: bày lên kệ nhóm ${shelfGName(g)}${cur?` (đã đủ ${BAL.shelf.per} món) thay ${shelfNm(cur)}`:""} · kèm: còn bày thì không tặng hay bán được${shelfOver(S,e)?", quá phẩm mình: dễ bị tố vượt phẩm":""}`,shelfWhyNot(S,e));
   const acts=document.querySelector("#modal .kinvacts"),body=document.querySelector("#modal .kpb");if(acts)acts.insertAdjacentHTML("beforeend",card);else if(body)body.insertAdjacentHTML("beforeend",`<div class="rbtn kinvacts">${card}</div>`)}}catch(e){console.error("shelf kinvOpen",e)}return r}})();
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-shelfput],[data-shelftake]");if(!b||b.disabled)return;ev.stopPropagation();
 if(b.dataset.shelfput!=null){const R=shelfPut(S,+b.dataset.shelfput);try{closeModal()}catch(x){}if(R.ok)log(`Ngươi bày ${R.n} ở Đa Bảo Các${R.old?`, cất ${R.old} vào rương`:""}.`);try{render()}catch(x){}return}
 const n=shelfTake(S,b.dataset.shelftake);try{closeModal()}catch(x){}if(n)log(`Ngươi cất ${n} vào rương.`);try{render()}catch(x){}},true);
/* interim shelf dialog (kit parts only: kitModal + kitRows + pbtn) until the painted shelf part lands: what stands in each group + take down / care */
function shelfOpen(p){p=p||S;const V=shelfView(p),me=p===S;const rows=[],acts=[];
 for(const x of V.groups)for(const it of x.items){rows.push([x.n,[it.name+(it.plant&&it.plant.wither?` (${it.plant.bad})`:"")+(it.over?" · quá phẩm":"")],it.plant&&it.plant.wither?"r":"n"]);
  if(me)acts.push(pbtn(it.take,`Cất ${it.name.toLowerCase()}`,"thành: về rương · tặng, bán, dùng được lại","")+(it.plant?pbtn(`data-shc="plant" data-g="${it.slot}"`,`Chăm ${it.name.toLowerCase()}`,`tốn: ${BAL.shelf.plant.khacSelf} khắc · thành: ${it.plant.fresh}`,whyTime(BAL.shelf.plant.khacSelf)):""))}
 kitModal({kind:"info",title:me?"Đa Bảo Các":`Đa Bảo Các của ${p.name}`,html:(rows.length?kitRows(rows):kitFacts([V.known?"Chưa bày món nào.":"Chưa thấy phòng nàng bày gì."]))+(V.lux?kitFacts([`Phòng ốc: ${V.lux.name.toLowerCase()}`]):"")+(V.sets&&V.sets.length?(typeof kitSetLines==="function"?kitSetLines(V.sets):kitFacts(V.sets.map(x=>x.t))):"")+(acts.length?`<div class="rbtn">${acts.join("")}</div>`:""),btn:"Lui"})}
window.shelfOpen=shelfOpen;
/* the data the kit shelf part draws (KIT REQUEST 17/11 display-shelf): per group UP TO BAL.shelf.per cut-out pieces side by side (owner OD 17/11 ~22:05Z), no frame.
   groups[i] = {g, n, per, items:[{slot, k, name, src, plant, over, from, take}] (best first), item: items[0] (kept for the old one-piece shape)} */
function shelfView(p){p=p||S;const z=shelfOf(p),me=p===S;let known=me?null:shelfSeen(S,p);const SST=me||known?shelfSetState(p):[];/* set glow (owner OD 17/11 ~21:20Z): items[i].set */
 const one=(s,e)=>({slot:s,k:e.k,name:shelfNm(e),src:typeof kitItemSrc==="function"?kitItemSrc(e.k==="tp"?e:e.k,""):"",plant:shelfIsPlant(e)?{care:Math.round(e.pc|0),wither:shelfBad(e),kind:shelfCareK(e),bad:shelfWord(e).bad,fresh:shelfWord(e).fresh}:null,over:shelfOver(p,e),from:e.from||"",take:me?`data-shelftake="${s}"`:"",set:shelfSetOfE(p,e,SST)});
 return{who:me?"me":wdKey(p),per:BAL.shelf.per,groups:BAL.shelf.groups.map(([g,n])=>{const items=me||known?shelfIn(p,g).sort((a,b)=>shelfPiece(b[1])-shelfPiece(a[1])).map(x=>one(x[0],x[1])):[];return{g,n,per:BAL.shelf.per,items,item:items[0]||null}}),
  lux:me||known?{lv:me?shelfLux(p).lv:known.lv,name:me?shelfLux(p).name:SHELF_LV[known.lv]}:null,known:me||!!known,
  sets:me?shelfSetLines(p):[]/* set bonus lines (owner OD 17/11 ~20:47Z): only her own room; [{id,on,k,t}] k = on / wait / bad / miss (kit part kitSetLines, jdisp) */}}
window.shelfView=shelfView;

/* ================= SET BONUS (bộ) of the display shelf — owner OD 17/11 ~20:42Z/~20:47Z (sets 2 / 3 / 5 inside a group), ~21:10Z (random pieces: room xa xỉ only),
   ~21:15Z APPROVED table dev/research/display-set-bonus.md @500faf22 (26 sets / 12 groups). Brief: dev/handover/briefs/display-set-bonus-build.md.
   · ONE table BAL.shelf.set (numbers) + SHELF_SET_N (player words). A piece belongs to ONE set; pieces outside a set give nothing.
   · a set is WHOLE when every member stands on the shelf (any slot of its group) and none is withered / dead (shelfBad; caykho / longtrong are not members)
     or above the owner's rank without being ngự ban (a vượt phẩm charge waits on it). Burnt incense, given away, confiscated, sold = not on the shelf.
   · checked ONCE a tuần (shelfWeek → shelfSetCheck): only that check GIVES; any break TAKES BACK at once (shelfSetSync on put / take / ledger out),
     regained at the next whole check. Old saves (no p.shSet): nothing until the first check.
   · stats through the EXISTING paths (no new bonus path): Sắc = the ONE wearBonus (one more wrapper, never ×1.5); Danh / Đức / Tài / Tâm cơ and the minus
     (Danh, Thái hậu / Hoàng hậu favour) = the title flat apply / take-back (jdh dhApplyFx pattern): applied amounts kept in p.shSet.on, taken back exactly.
   · cap: plus points of one person ≤ cap, Danh ≤ capDanh; never Sủng. NPCs: the same table and check in the weekly shelf pass (host only in co-op). */
Object.assign(BAL.shelf,{set:{cap:6,capDanh:3,size:{2:1,3:2,5:3},/* pair +1, triple +2, five +3 of the set's stat */
 /* id: g group · m members (BAL.shelf.it keys; "tp:<kind>" = her own handmade work, j83) · st the stat · minus (always, while the set is whole) */
 s:{tqt:{g:"hoa",m:["lanquy","cuc","maitrang"],st:"duc"},ngocduong:{g:"hoa",m:["maudon","haiduong"],st:"danh"},hoatet:{g:"hoa",m:["thuytien","phatthu"],st:"sac"},
  lambach:{g:"su",m:["binhsu","maibinh"],st:"danh"},ngudieu:{g:"su",m:["cuudao","phanthai","dauthai"],st:"danh",minus:{th:-1,hh:-1}},
  phuctu:{g:"ngoc",m:["holo","caithao"],st:"duc"},nhuy:{g:"ngoc",m:["nhuy","sanho"],st:"sac",minus:{danh:-1}},
  tayminh:{g:"thuhoa",m:["tp:tranh","tp:tho"],st:"tai"},tetlien:{g:"thuhoa",m:["caudoi","chuphuc"],st:"danh"},danhgia:{g:"thuhoa",m:["tranhco","sonthuy","hoadieu"],st:"tai"},
  dongkhi:{g:"huong",m:["luhuong","tuyenduc","hophuong"],st:"tamco"},huongcung:{g:"huong",m:["phaplam","luhac"],st:"sac"},
  phonglinh:{g:"chuong",m:["chuonggio","thietma"],st:"duc"},daychuong:{g:"chuong",m:["chuongso","chuongngoc","chuongpl"],st:"duc"},
  remha:{g:"phong",m:["remtruc","remlua"],st:"tamco"},bpto:{g:"phong",m:["banbinh","bpxacu"],st:"danh"},
  cogioi:{g:"tay",m:["tuminh","hopnhac"],st:"danh",minus:{th:-1}},thienvan:{g:"tay",m:["kinhvv","diacau","nhatquy"],st:"tai"},
  quatmua:{g:"quat",m:["quattron","quatgap"],st:"sac"},quatquy:{g:"quat",m:["quatdh","quatcong"],st:"danh"},
  chimlong:{g:"chim",m:["hoami","vet"],st:"tamco"},thuvui:{g:"chim",m:["de","kimngu"],st:"sac",minus:{danh:-1}},
  day:{g:"nhac",m:["dancoc","tyba","dantranh"],st:"tai"},saongoc:{g:"nhac",m:["saotruc","ngocdich"],st:"tai"},
  ngubao:{g:"van",m:["nghien","tranchi","thaiho","butlong","muchuy"],st:"tai"},denda:{g:"van",m:["cungdang","daminh"],st:"danh"}}}});
/* player words (VANPHONG, cổ trang): set name + the minus reason */
const SHELF_SET_N={tqt:["Tam quân tử"],ngocduong:["Ngọc đường phú quý"],hoatet:["Hoa Tết"],lambach:["Lam bạch Cảnh Đức Trấn"],
 ngudieu:["Ngự diêu","chủ vị không ưa khoe của"],phuctu:["Phúc tử"],nhuy:["Như ý cát tường","người ta chê khoe của"],tayminh:["Tay mình"],tetlien:["Tết liễn"],
 danhgia:["Danh gia cổ họa"],dongkhi:["Đồng khí"],huongcung:["Hương cung đình"],phonglinh:["Phong linh"],daychuong:["Dây chuông"],remha:["Rèm hạ"],
 bpto:["Bình phong Tô thêu"],cogioi:["Cơ giới Tây","Thái hậu không ưa đồ ngoại bang"],thienvan:["Thiên văn"],quatmua:["Quạt mùa"],quatquy:["Quạt quý"],
 chimlong:["Chim lồng"],thuvui:["Thú vui nhàn","người ta chê mê chơi"],day:["Dây"],saongoc:["Sáo ngọc"],ngubao:["Ngũ bảo thư phòng"],denda:["Đèn dạ"]};
const SHELF_SET_STAT={sac:"Sắc",danh:"Danh",duc:"Đức",tai:"Tài",tamco:"Tâm cơ",th:"Thái hậu thiện cảm",hh:"Hoàng hậu thiện cảm"};
/* member id of a shelf entry: a table key, or "tp:<kind>" for her own handmade work */
function shelfSetMem(e){if(!e)return"";if(e.k==="tp")return e.wk&&e.wk.kind?"tp:"+e.wk.kind:"";return e.k}
function shelfSetMemNm(m){if(m.startsWith("tp:")){const k=m.slice(3);return k==="tranh"?"Bức tranh tự vẽ":k==="tho"?"Bức thư pháp tự viết":"Đồ tự làm"}return IT[m]?IT[m].n:m}
/* why a standing member does not count ("" = it counts) */
function shelfSetBreak(p,e){if(shelfBad(e))return shelfWord(e).bad;if(shelfOver(p,e)&&e.from!=="emp")return"quá phẩm, chờ tra xét";return""}
/* every set's state for a person: have / miss / bad members, whole */
function shelfSetState(p){const T=BAL.shelf.set.s,out=[];if(!p||!p.shelf||!p.shelf.g)return out;const by={};
 for(const sl in p.shelf.g){const e=p.shelf.g[sl],m=shelfSetMem(e);if(!m)continue;if(!(m in by)||(shelfSetBreak(p,by[m])&&!shelfSetBreak(p,e)))by[m]=e}/* two of one kind count once (the sound one) */
 for(const id in T){const x=T[id],have=[],miss=[],bad=[];for(const m of x.m){const e=by[m];if(!e){miss.push(m);continue}have.push(m);const w=shelfSetBreak(p,e);if(w)bad.push([m,w])}
  out.push({id,x,have,miss,bad,whole:!miss.length&&!bad.length})}return out}
/* the points the given sets give (caps: plus ≤ cap, Danh ≤ capDanh; order = biggest set first, table order); minus always */
function shelfSetPts(ids){const B=BAL.shelf.set,o={},per={};let tot=0,dn=0;
 const L=(ids||[]).filter(id=>B.s[id]).sort((a,b)=>B.s[b].m.length-B.s[a].m.length);
 for(const id of L){const x=B.s[id];let v=B.size[x.m.length]|0;v=Math.max(0,Math.min(v,B.cap-tot));if(x.st==="danh")v=Math.max(0,Math.min(v,B.capDanh-dn));
  if(v){o[x.st]=(o[x.st]||0)+v;tot+=v;if(x.st==="danh")dn+=v}per[id]={st:x.st,v,minus:x.minus||null};for(const k in (x.minus||{}))o[k]=(o[k]||0)+x.minus[k]}
 return{o,per}}
/* the sets that count NOW = the last check's sets still whole (a break takes back at once) */
function shelfSetLive(p){const z=p&&p.shSet;if(!z||!Array.isArray(z.ids)||!z.ids.length)return[];const W=new Set(shelfSetState(p).filter(x=>x.whole).map(x=>x.id));return z.ids.filter(id=>W.has(id))}
/* apply / take back the non-Sắc part exactly (the jdh dhApplyFx pattern; Thái hậu / Hoàng hậu favour runs −100…100) */
function shelfSetApply(p){if(!p||p.coop)return;const z=p.shSet;if(!z)return;const P=shelfSetPts(z.ids).o,want={};for(const k in P)if(k!=="sac"&&P[k])want[k]=P[k];const on=z.on||{};
 for(const s of new Set(Object.keys(on).concat(Object.keys(want)))){const d=(want[s]||0)-(on[s]||0);if(!d)continue;const lo=s==="th"||s==="hh"?-100:0;
  const before=p[s]||0;p[s]=Math.max(lo,Math.min(100,before+d));on[s]=(on[s]||0)+((p[s]||0)-before)/* read back: hh is the Empress's own regard (j24 hhSet → affAdd) */;if(!on[s])delete on[s]}z.on=on}
function shelfSetTxt(id,v){const x=BAL.shelf.set.s[id],N=SHELF_SET_N[id]||[id];const mi=x.minus?Object.keys(x.minus).map(k=>`${SHELF_SET_STAT[k]} ${x.minus[k]}`).join(", "):"";
 return `Bộ ${N[0]}: ${v?`${SHELF_SET_STAT[x.st]} +${v}`:"đủ bộ, nhưng đã tới mức, không thêm"}${mi?`, ${mi}, vì ${N[1]}`:""}.`}
function shelfSetQuiet(p){return p!==S||(typeof tsbBot==="function"&&tsbBot())}
/* break → take back at once (never gives) */
function shelfSetSync(p){try{const z=p&&p.shSet;if(!z||!Array.isArray(z.ids)||!z.ids.length)return;const live=shelfSetLive(p);if(live.length===z.ids.length)return;
 const st=shelfSetState(p),lost=z.ids.filter(id=>!live.includes(id));z.ids=live;shelfSetApply(p);
 if(!shelfSetQuiet(p))for(const id of lost){const r=st.find(x=>x.id===id);const why=r&&r.bad.length?`${shelfSetMemNm(r.bad[0][0]).toLowerCase()} ${r.bad[0][1]}`:r&&r.miss.length?`${shelfSetMemNm(r.miss[0]).toLowerCase()} không còn bày`:"";
  log(`Bộ ${(SHELF_SET_N[id]||[id])[0]} khuyết${why?": "+why:""}.`)}}catch(e){console.error("shelfSetSync",e)}}
/* the weekly check: the whole sets now count (gain); others are dropped */
function shelfSetCheck(p){try{if(!p)return;const z=p.shSet=p.shSet&&typeof p.shSet==="object"?p.shSet:{ids:[],on:{}};const old=Array.isArray(z.ids)?z.ids.slice():[];
 const ids=shelfSetState(p).filter(x=>x.whole).map(x=>x.id);z.ids=ids;z.w=wk();z.ev=z.ev||[];shelfSetApply(p);
 if(!shelfSetQuiet(p)){const per=shelfSetPts(ids).per;for(const id of ids)if(!old.includes(id)){const back=z.ev.includes(id);log(back?`Bộ ${(SHELF_SET_N[id]||[id])[0]} đủ lại.`:shelfSetTxt(id,per[id]?per[id].v:0))}}
 for(const id of ids)if(!z.ev.includes(id))z.ev.push(id)}catch(e){console.error("shelfSetCheck",e)}}
window.shelfSetState=shelfSetState;window.shelfSetPts=shelfSetPts;window.shelfSetLive=shelfSetLive;window.shelfSetCheck=shelfSetCheck;window.shelfSetSync=shelfSetSync;
/* Sắc = the ONE wearBonus (effSac reads it), like the title's Sắc (jdh): one more wrapper, never ×1.5; b.shSac names this part (the night-prep jewellery reader leaves it out) */
(function(){if(typeof wearBonus!=="function")return;const w0=wearBonus;wearBonus=function(p){const b=w0.apply(this,arguments);try{if(p&&p.shSet&&!p.coop){const v=shelfSetPts(shelfSetLive(p)).o.sac|0;if(v){b.sac=(b.sac||0)+v;b.shSac=v}}}catch(e){}return b};window.wearBonus=wearBonus})();
/* the player's set lines for the shelf screen (owner: she must know what to collect; random pieces show nothing) */
function shelfSetLines(p){const live=shelfSetLive(p),per=shelfSetPts(live).per;const L=[];
 for(const r of shelfSetState(p)){if(!r.have.length)continue;const N=(SHELF_SET_N[r.id]||[r.id])[0];
  if(live.includes(r.id))L.push({id:r.id,on:1,k:"on",t:shelfSetTxt(r.id,per[r.id]?per[r.id].v:0)});
  else if(r.whole)L.push({id:r.id,on:0,k:"wait",t:`Bộ ${N}: đã đủ món, tuần sau mới được tính.`});
  else if(r.bad.length)L.push({id:r.id,on:0,k:"bad",t:`Bộ ${N} khuyết: ${r.bad.map(([m,w])=>shelfSetMemNm(m).toLowerCase()+" "+w).join(", ")}.`});
  else L.push({id:r.id,on:0,k:"miss",t:`Bộ ${N}: còn thiếu ${r.miss.map(shelfSetMemNm).join(", ")}.`})}return L}
window.shelfSetLines=shelfSetLines;
/* the set of one displayed piece for the shelf view (owner OD 17/11 ~21:20Z: a whole set GLOWS so she sees it is one set): {id, name, full} or null.
   full = every member stands and none is broken (the same test the weekly check uses); random pieces: null */
function shelfSetOfE(p,e,st){const m=shelfSetMem(e);if(!m)return null;const T=BAL.shelf.set.s;const id=Object.keys(T).find(i=>T[i].m.includes(m));if(!id)return null;
 const r=(st||shelfSetState(p)).find(x=>x.id===id);return{id,name:(SHELF_SET_N[id]||[id])[0],full:!!(r&&r.whole)}}
window.shelfSetOfE=shelfSetOfE;
