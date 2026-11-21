/* ================= jrd_bd2: Bắc Địch roads bd_tuyet (Năm đoàn người chạy nạn) + bd_hen (Lời thề trước lửa thánh) — country Ba Tư for new lives (NCL.bt, owner OD 19/11; E19 mapping) — writer 2 (ROAD_MAP §4.5b) =================
   Same shape as jrd_bd.js: .4 = ARC67.<road> via arcFx (o:"bd"), .5–.11 via rdDef, rares via rdRare (RD97L) ; people from BDP (jrd_bd.js);
   numbers in jbalbd.js (writer-2 block). Land tokens {land} {pv} {mh} {quan} (jrd_nc NCL.bd).
   People (law 6b): A La Hám (BDP asnc, old general of Tật Lăng) in bd_tuyet; Thác Bạt Phong (BDP phong, her betrothed, captain of
   the embassy guard) in bd_hen; the rest are standing court offices (Thượng thư / Lang trung bộ Hộ, quan trấn thủ Ngọc Môn quan, Đại Lý tự,
   Tứ Di quán) or the cast rival {v}. Objects (law 6c) kept in the road flag book "bd.o.<thing>" (bdO): the dowry chest (hoimon: 0 at home ·
   "kho" pledged to the granary · "ve" redeemed · "ban" sold for the refugees' camels), the gate tally of Ngọc Môn quan (lenhbai: 0 with the general ·
   "ta" in her hands · "tra" given back · "asnc" given to the chief), her winter song (khuc: 0 · "thien" the song of mercy · "oan" the song of
   grievance), the oath stone (da: 0 with him · "ta" in her sleeve · "vua" shown to the Emperor · "tra" returned · "chon" buried), the seized
   letter (thu: "dly" held by Đại Lý tự · "dot" burnt · "vua" read before the Emperor), the poisoned cup of the wrestling (chen: 0 · "thaiy"
   with the thái y · "dly" in evidence).
   Harder as she climbs (law 5): every climax (x1) odds list ends with ["m","rank",k<0] (BAL.road.fx / BAL.arc.fx). No new UI: j67 kit cards only. */
/* bdO (the road object book "bd.o.<thing>") is defined once in jrd_bd.js (loads first) */
Object.assign(RTHEME67,{bd_tuyet:"emp",bd_hen:"emp"});

/* ---------- bd_tuyet · Năm đoàn người chạy nạn (Ba Tư; Thiên hạ; GE ge1 Mẹ người chạy nạn · ge2 Lương thảo đổi hòa · ge3 Mở cửa Ngọc Môn · ge4 Khúc ca Nô Nhụ) ---------- */
ARC67.bd_tuyet=bdArc("bd_tuyet",{o:"bd",t:"Năm đoàn người chạy nạn",w:"emp",sj:"đoàn người {land} chạy nạn",g:"Quân Đại Thực lấy thêm ba thành của {land}. Người {land} bỏ nhà, theo con đường tơ lụa chạy về phía đông. A La Hám, lão tướng trấn Tật Lăng, dẫn họ đến quỳ trước Ngọc Môn quan xin lương và xin một chỗ ở. Biên thư về đến kinh, và Hoàng thượng hỏi ngươi.",
 p:[["s1","s2"],["c1","c2","G.rumor","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Thư cấp báo từ Ngọc Môn quan",w:"emp",t:"Thư cấp báo từ Ngọc Môn quan: người {land} chạy nạn quỳ trong gió cát trước cửa ải, xin lương. Người dẫn đầu là A La Hám, lão tướng năm xưa từng bế ngươi lên lưng ngựa trong vườn {pv}.",o:[
  {n:"Xin Hoàng thượng cho mở kho phát chẩn",f:"an",wx:"Hoàng thượng thấy ngươi thương người",go:()=>bdMeet("asnc"),rt:"Hoàng thượng gật đầu, sai Hộ bộ bàn việc phát chẩn."},
  {n:"Xin cho đổi lương lấy bạc, đúng phép chợ ải",f:"le",wx:"Hộ bộ được bạc, người chạy nạn được lương",lx:"Hộ bộ chê ngươi đem việc buôn vào chốn cung",go:()=>bdMeet("asnc"),rt:"Hoàng thượng cười: “Nàng tính như người buôn Tây Thị.” rồi chuẩn cho bàn.",rf:"Thượng thư bộ Hộ tâu: chợ ải mùa đông không họp."},
  {n:"Gửi trang sức riêng ra ải đổi gạo",f:"an",wx:"gạo đến ải ngay trong tuần",go:()=>{bdMeet("asnc");bdO("trangsuc","ban")},rt:"Hộp trang sức theo người lính ải đi trong đêm, đổi được gạo ở chợ Lương Châu."}]},
 s2:{h:"Dấu ấn bạc của lão tướng",w:"me",t:"Một người lính ải mang vào cung một dấu ấn bạc khắc hình ngựa có cánh: dấu riêng của A La Hám. Kèm lời nhắn: “Thần không dám đòi, chỉ dám xin. Nếu Đại Hy không cho, người {land} sẽ chết ngoài cửa ải, hoặc liều vào trong mà kiếm ăn.”",o:[
  {n:"Trình dấu ấn bạc lên Hoàng thượng",f:"le",go:()=>{bdMeet("asnc");bdO("day","vua")},wx:"Hoàng thượng thấy ngươi không giấu gì",lx:"Binh bộ nghe được chữ “liều vào trong”",rt:"Hoàng thượng cầm dấu ấn rất lâu: “Người già mất nước thì nói lời đau. Trẫm hiểu.”",rf:"Binh bộ tâu xin tăng quân giữ ải."},
  {n:"Nhắn lại: chớ liều vào ải, ta sẽ lo",f:"an",go:()=>{bdMeet("asnc");bdO("day","ta")},wx:"lão tướng chịu chờ",lx:"ngươi tự buộc mình vào một lời hứa",rt:"Người lính ải mang lời ngươi đi. Ít lâu sau lão tướng hồi: “Chúng thần xin chờ.”"},
  {n:"Nhắn lại: cứ vào ải mà kiếm ăn, ta sẽ che",f:"uy",go:()=>{bdMeet("asnc");bdO("day","asnc")},wx:"người {land} nể ngươi như nể {quan}",lx:"nếu lộ ra, ngươi gánh tội",rt:"Dấu ấn bạc được gói trong lụa đỏ, gửi trả về ải.",rf:"Người lính ải sợ, khai với quan trấn thủ."}]},
 c1:{h:"Hộ bộ tâu kho cạn",w:"emp",t:"Thượng thư bộ Hộ tâu: kho Thường Bình chỉ đủ cho dân Đại Hy qua đông, không thể chia cho người nước khác.",o:[
  {n:"Xin bớt khẩu phần cung mình gửi ra ải",f:"an",wx:"cả hậu cung bàn về lòng ngươi",rt:"Thượng thiện giám ghi: cung ngươi ăn chay suốt tháng chạp."},
  {n:"Tâu: dân biên đói thì cướp, cướp thì Đại Hy mất hơn",f:"le",wx:"triều thần nghe ra lẽ phải",lx:"Hộ bộ cho là ngươi dạy việc triều",rt:"Hoàng thượng gật đầu: “Phải. Một xe lương rẻ hơn một trận đánh.”",rf:"Thượng thư bộ Hộ cười nhạt: “Nương nương thật lo xa.”"},
  {n:"Im lặng, để triều thần quyết",wx:"không ai trách ngươi",lx:"người ngoài ải đợi thêm",rt:"Ngươi chỉ dâng trà."}]},
 c2:{h:"{v} cười trong buổi thỉnh an",w:"v",need:["v"],t:"{v} nói giữa buổi thỉnh an: “Nước {land} mất thành, mà kẻ phải rơi nước mắt lại là Đại Hy. Người {land} thật khéo kể khổ.”",o:[
  {n:"Đáp: giặc đâu chọn nước mà đánh",wx:"cả điện lặng nghe",lx:"thành ra cãi nhau trước mặt các phi tần",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đỏ mặt, không đáp được.",rf:"Cả điện cười, ngươi và {v} cùng mất mặt."},
  {n:"Mời {v} cùng góp áo bông gửi ra ải",wx:"{v} không còn lời để cười",lx:"{v} có cớ khoe lòng tốt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} góp hai rương áo, tên nàng ta được ghi ngay dưới tên ngươi.",rf:"{v} góp áo rồi kể khắp nơi: chính nàng ta lo cho người {land}."},
  {n:"Cúi đầu im lặng",wx:"giữ thể diện",lx:"lời cười cứ thế lan",rt:"Ngươi chỉ nâng chén trà."}]},
 t1:{h:"Đoàn xe ra ải",w:"emp",t:"Hoàng thượng cho một đoàn xe lương ra ải, rồi hỏi ngươi: ai đi theo giữ xe? Đường Hà Tây dài, lương dễ bị bớt dọc đường.",o:[
  {n:"Xin cho cung nữ thân tín đi cùng, mang theo sổ lương",f:"le",wx:"từng bao lương có sổ",rt:"Cung nữ của ngươi ghi từng bao vào sổ, đóng dấu cung ngươi ở mỗi trạm."},
  {n:"Xin Hoàng thượng cho ngươi tự ra ải phát lương",f:"an",wx:"người {land} thấy mặt ngươi",lx:"triều thần nói phi tần không được ra ải",rt:"Hoàng thượng do dự rồi chuẩn: có cấm quân theo hầu, đi đến Lương Châu là dừng.",rf:"Hoàng thượng lắc đầu: “Ải không phải chỗ của nàng.”"},
  {n:"Cho người của lão tướng vào tận trong ải nhận lương",f:"uy",wx:"lương đến tay người chạy nạn không qua tay quan",lx:"Binh bộ nói ngươi mở cửa cho người nước khác",rt:"Quan trấn thủ mở cửa nhỏ một đêm; người của lão tướng chở lương đi trước khi trời sáng.",rf:"Quan trấn thủ đóng cửa, dâng sớ hỏi ai cho phép."}]},
 x1:{h:"Triều nghị về lương biên",w:"emp",t:"Buổi chầu sáng, triều thần chia làm hai: một nửa xin đóng ải, một nửa xin phát lương. Đêm trước, Hoàng thượng đến cung ngươi hỏi: “Nàng là người {land}. Nàng nói đi.”",o:[
  {n:"Tâu: phát lương, đổi lấy lời thề giữ phép Đại Hy",e:["win","lose"],rt:"Hoàng thượng chuẩn. A La Hám thề trước ngọn lửa mang theo từ quê nhà, xe lương nối nhau qua gió cát.",rf:"Triều nghị không thuận; ải đóng, người {land} chờ ngoài gió cát."},
  {n:"Tâu: đổi lương lấy bạc {land} và lạc đà, Đại Hy có lợi",e:["win2","mid"],rt:"Hộ bộ hài lòng: kho thêm bạc {land}, Thượng tứ viện thêm lạc đà, người chạy nạn có lương.",rf:"Người chạy nạn còn ít bạc, lạc đà gầy, lương đổi được cũng ít."},
  {n:"Thưa: việc triều chính, thần thiếp không dám bàn",e:"mid",lx:"bỏ lỡ dịp cất tiếng",rt:"Hoàng thượng nhìn ngươi lâu rồi đi ra."}]}},
 E:{win:{tag:"Lương qua cửa ải",w:"emp",t:"Lương qua Ngọc Môn quan. Người {land} thề giữ phép Đại Hy, và trong trại người ta nhắc tên ngươi mỗi lần nhóm lửa thánh.",go:(_A,_ok,G)=>e67bien(G[0])},
  win2:{tag:"Lương đổi bạc",w:"emp",t:"Lương đổi bạc: Hộ bộ được bạc, người chạy nạn được ăn. Hoàng thượng khen ngươi biết tính cho Đại Hy."},
  mid:{tag:"Gió cát vẫn thổi",t:"Một ít lương ra ải, một ít người qua được mùa đông. Gió cát vẫn thổi."},
  lose:{tag:"Cửa ải đóng",w:"emp",t:"Cửa ải đóng. Người {land} ngồi lại ngoài gió cát, và có kẻ thề sẽ tự tìm đường vào.",go:(_A,_ok,G)=>e67bien(G[0])}}});
BD97.push({a:"bd_tuyet",tag:"Lửa thánh qua cửa ải",w:"emp",n:"Khoác khăn gấm của {mh}, xin tự dẫn xe lương ra ải",
 path:["mở kho phát chẩn","Gửi trang sức riêng","Trình dấu ấn bạc","chớ liều vào ải","bớt khẩu phần","dân biên đói","góp áo bông","cung nữ thân tín","tự ra ải phát lương"],bad:["cứ vào ải mà kiếm ăn","Cho người của lão tướng vào tận"],
 x:[()=>S.duc>=BAL.arc.rare.bd_tuyet.bar,`Đức từ ${BAL.arc.rare.bd_tuyet.bar}`],
 t:"Ngươi khoác tấm khăn gấm {mh} dệt cho ngày xuất giá, ngồi trên xe đầu của đoàn lương. Đến cửa ải, A La Hám quỳ xuống cát, và cả đoàn người quỳ theo; ngọn lửa họ mang theo suốt đường dài được thắp lên dưới chân Ngọc Môn quan. Người {land} bảo lửa thánh đã nhận ra công chúa. Hoàng thượng nghe kể, ban ngươi chiếc hồ cừu trắng để lần sau ra ải khỏi gió lạnh.",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_hocuu",ti:"Công chúa giữ lửa"});

/* .5 Kho Thường Bình — Hộ bộ's ever-normal granary: ask, buy, or pledge her dowry [emp, v] */
rdDef("bd_tuyet",5,{t:"Kho Thường Bình",w:"emp",sj:"lương kho Thường Bình",cast(A){return rdCast(A,["v"])},
 g:"Mùa đông chưa qua, người chạy nạn còn ngồi ngoài ải. Kho Thường Bình của Hộ bộ là kho lương bình giá của cả kinh kỳ, do một vị Lang trung bộ Hộ giữ sổ. Muốn có lương ra ải, ngươi phải xin, phải mua, hoặc phải đem thứ gì đó ra cầm.",
 p:[["s1","s2","s3","s4"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bộ lạc giữ lời thề",w:"emp",if:()=>RDW(1)()&&rdPrev()!=="win2"&&rdPrev()!=="r97",t:"A La Hám giữ lời thề: cả mùa đông không một người {land} nào tự ý vào ải. Nhưng lương phát lần trước đã cạn, và đường về nước vẫn còn giặc. Hoàng thượng bảo ngươi: “Lần này kho Thường Bình phải tự mở, trẫm không ép Hộ bộ nữa.”",o:[
  {n:"Viết sớ xin Hộ bộ mở kho lần nữa",f:"le",wx:"đúng phép, ai cũng thấy",lx:"Hộ bộ thấy ngươi xin mãi",rt:"Sớ của ngươi được chép vào sổ Hộ bộ.",rf:"Lang trung bộ Hộ gác sớ lại, bảo chờ đầu xuân."},
  {n:"Đem bạc riêng mua lương bình giá",f:"an",wx:"không phải xin ai",lx:"bạc của ngươi cạn dần",rt:"Lang trung bộ Hộ bán cho ngươi đúng giá kho."},
  {n:"Nhắn lão tướng: giữ lời thêm một tháng",wx:"không tốn gì",lx:"người ngoài ải đói thêm",rt:"A La Hám hồi một chữ: “Vâng.”"}]},
 s2:{h:"Bạc đã vào kho",w:"emp",if:()=>rdPrev()==="win2",t:"Bạc {land} đã vào kho Hộ bộ, lạc đà đã vào chuồng Thượng tứ viện; Hộ bộ khen ngươi. Nhưng người ngoài ải hết lương trước khi hết bạc, và A La Hám nhắn: “Đồng bạc cuối cùng là để giữ lửa thánh, thần không dám đổi.”",o:[
  {n:"Xin Hộ bộ trả thêm lương cho số bạc đã nhận",f:"le",wx:"giá bạc thành giá công bằng",lx:"Hộ bộ cho là ngươi đòi thêm",rt:"Hộ bộ chịu bù thêm xe lương.",rf:"Thượng thư bộ Hộ đáp: “Giá đã thuận, không bàn lại.”"},
  {n:"Bảo lão tướng: đổi cả bạc giữ lửa, ta trả giá cao",f:"uy",wx:"Đại Hy có thêm bạc {land}",lx:"người chạy nạn mất của để thờ lửa",rt:"Hòm bạc cuối cùng theo xe lương về kinh.",rf:"A La Hám không đáp thư."},
  {n:"Đem bạc riêng mua lương gửi kèm",f:"an",wx:"người chạy nạn có lương mà giữ được bạc thờ lửa",lx:"bạc của ngươi cạn dần",rt:"Lang trung bộ Hộ bán cho ngươi đúng giá kho."}]},
 s3:{h:"Người chạy nạn ngồi ngoài ải",w:"emp",if:RDW(0),t:"Người {land} chạy nạn vẫn ngồi ngoài Ngọc Môn quan tay không. Bây giờ người ta báo: có trại chết cả nhà. Muốn cứu người còn lại, ngươi phải tự lo lấy lương, vì triều đình đã từ chối một lần.",o:[
  {n:"Viết sớ xin Hộ bộ xét lại",f:"le",wx:"đúng phép, ai cũng thấy",lx:"Hộ bộ thấy ngươi cãi lời triều nghị",rt:"Sớ của ngươi được chép vào sổ Hộ bộ.",rf:"Lang trung bộ Hộ gác sớ lại."},
  {n:"Đem bạc riêng mua lương bình giá",f:"an",wx:"không phải xin ai",lx:"bạc của ngươi cạn dần",rt:"Lang trung bộ Hộ bán cho ngươi đúng giá kho."},
  {n:"Nhắn lão tướng: dẫn người vào núi Kỳ Liên mà kiếm",f:"uy",wx:"người chạy nạn không ngồi chờ chết",lx:"núi Kỳ Liên là đất Đại Hy",rt:"A La Hám dẫn người vào núi Kỳ Liên săn hươu."}]},
 s4:{h:"Xe lương mang tên ngươi",w:"emp",if:()=>rdPrev()==="r97",t:"Từ ngày ngươi ra ải, người {land} gọi đoàn lương là “xe của công chúa”. Hoàng thượng muốn có thêm một đoàn xe nữa, nhưng lần này phải lấy từ kho Thường Bình, đúng phép Hộ bộ.",o:[
  {n:"Viết sớ xin Hộ bộ mở kho, ký tên ngươi",f:"le",wx:"tên ngươi đứng đầu tờ sớ",lx:"Hộ bộ thấy ngươi cậy ơn",rt:"Sớ của ngươi được chép vào sổ Hộ bộ.",rf:"Lang trung bộ Hộ gác sớ lại."},
  {n:"Đem bạc riêng mua lương bình giá",f:"an",wx:"không phải xin ai",lx:"bạc của ngươi cạn dần",rt:"Lang trung bộ Hộ bán cho ngươi đúng giá kho."},
  {n:"Để Hoàng thượng tự định",wx:"không ai nói ngươi cậy ơn",lx:"đoàn xe thứ hai không mang tên ngươi",rt:"Hoàng thượng giao Hộ bộ lo."}]},
 c1:{h:"Sổ kho Thường Bình",w:"maid",t:"Cung nữ của ngươi mượn được bản sao sổ kho Thường Bình từ một thư lại Hộ bộ. Sổ ghi đủ lương, mà người coi kho nói kho đã vơi đi nhiều.",o:[
  {n:"Đưa bản sao sổ lên Hoàng thượng",f:"le",go:()=>bdO("sokho","vua"),wx:"kẻ bớt lương bị lộ",lx:"Hộ bộ ghét ngươi",rt:"Hoàng thượng sai Đô sát viện kiểm kho; một viên quản kho bị cách chức.",rf:"Thư lại bị tra hỏi; bản sao bị coi là giấy trộm."},
  {n:"Gặp riêng Lang trung bộ Hộ, nói ngươi đã biết",f:"uy",go:()=>bdO("sokho","ta"),wx:"Lang trung phải bán cho ngươi giá rẻ",lx:"ngươi nắm thóp người ta, người ta cũng nhớ mặt ngươi",rt:"Lang trung bộ Hộ cúi đầu: “Nương nương muốn bao nhiêu xe?”",rf:"Lang trung bộ Hộ tâu ngược lên: phi tần dò sổ kho."},
  {n:"Trả sổ, coi như chưa thấy",go:()=>bdO("sokho","tra"),wx:"không dây vào Hộ bộ",lx:"lương vơi vẫn vơi",rt:"Thư lại nhận lại sổ, cảm ơn ngươi."}]},
 c2:{h:"Nhà {v} giữ mối lương",w:"v",need:["v"],t:"Người nhà của {v} là đầu mối bán lương cho kho Thường Bình. Nàng ta mời ngươi uống trà: “Tỷ muội với nhau, lương nhà muội bán cho tỷ rẻ một chút.”",o:[
  {n:"Nhận lời, trả đúng giá",wx:"lương đến sớm",lx:"ngươi mang ơn nhà {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Lương nhà {v} lên xe ngay trong tuần."},
  {n:"Từ chối, mua thẳng của kho",wx:"không mang ơn ai",lx:"{v} cho là ngươi chê",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi cảm ơn, rồi sai người đến kho."},
  {n:"Nhận lời, rồi cho người xem lương có mốc không",f:"le",wx:"nếu lương mốc, nhà {v} bị lộ",lx:"nếu lương tốt, ngươi thành kẻ nghi oan",go:(A,ok,G)=>{ok?rdOan(A,"v",G[0]):rdRel(A,"v",G[1])},rt:"Một phần lương nhà {v} đã mốc; Hộ bộ trả lại.",rf:"Lương tốt cả; {v} cười: “Tỷ tỷ cẩn thận quá.”"}]},
 t1:{h:"Rương hồi môn",w:"me",t:"Trong kho cung ngươi còn chiếc rương hồi môn mang từ {land} sang: bình bạc đầu ngựa, chuỗi ngọc lưu ly, tấm thảm của {mh}. Lang trung bộ Hộ nói: cầm rương ấy, kho sẽ cho ứng lương trước.",o:[
  {n:"Đem rương hồi môn cầm cho kho Thường Bình",f:"an",wx:"lương ra ải ngay",lx:"của hồi môn nằm trong kho người ta",go:()=>bdO("hoimon","kho"),rt:"Rương hồi môn được niêm ấn, đưa vào kho Thường Bình; sổ kho ghi tên ngươi."},
  {n:"Giữ rương, xin Hoàng thượng làm bảo lãnh",f:"le",go:()=>bdO("hoimon","ta"),wx:"của hồi môn còn nguyên",lx:"ngươi mượn uy Hoàng thượng",rt:"Hoàng thượng phê một chữ “chuẩn” vào giấy ứng lương.",rf:"Hoàng thượng bảo: “Việc kho là việc của Hộ bộ.”"},
  {n:"Giữ rương, chờ kho tự mở",go:()=>bdO("hoimon","ta"),wx:"của hồi môn còn nguyên",lx:"lương chậm",rt:"Rương hồi môn vẫn nằm trong kho cung ngươi."}]},
 x1:{h:"Ngày kho mở sổ",w:"emp",t:"Đầu tháng giêng, Hộ bộ mở sổ kho Thường Bình trước mặt Hoàng thượng. Lang trung bộ Hộ đọc từng dòng; đến dòng lương ra ải, ngài quay sang hỏi ngươi.",o:[
  {n:"Tâu: xin mở kho theo lệ cứu đói",e:["win","lose"],rt:"Hoàng thượng chuẩn theo lệ cũ. Xe lương ra ải mang dấu kho Thường Bình.",rf:"Lệ cũ chỉ cứu dân Đại Hy; tờ sớ của ngươi bị gác lại."},
  {n:"Tâu: xin mua theo giá kho, bạc của thần thiếp",e:["win","mid"],rt:"Hộ bộ bán cho ngươi theo giá kho; không ai nói được gì.",rf:"Hộ bộ bán, nhưng chỉ đủ nửa số xe."},
  {n:"Thưa: xin Hộ bộ tự định",e:"mid",lx:"lương ra ải ít ỏi",rt:"Lang trung bộ Hộ đọc tiếp dòng khác."}]}},
 E:{win:{tag:"Kho Thường Bình mở cửa",w:"emp",t:"Kho Thường Bình mở cửa cho người ngoài ải. Sổ Hộ bộ ghi tên ngươi bên dòng lương, và ngoài Ngọc Môn quan không thêm trại nào chết đói.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Lương nhỏ giọt",t:"Lương ra ải từng ít một. Có người qua được tháng giêng, có người không."},
  lose:{tag:"Kho đóng, sổ mở",w:"emp",t:"Kho đóng. Tờ sớ của ngươi nằm trong sổ Hộ bộ, và triều thần nhớ ngươi đã xin lương cho người ngoài ải.",go:(_A,G)=>e67bien(G[0])}}});

/* .6 Chợ lương đổi ngựa — grain for horses at the pass market; the price and who sets it [emp, maid] */
rdDef("bd_tuyet",6,{t:"Đổi lương lấy bạc",w:"emp",sj:"giá lương ở chợ ải",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng cho họp chợ ải Ngọc Môn giữa mùa đông: lương Đại Hy đổi lấy bạc {land} và lạc đà của người chạy nạn. Ai định giá, người ấy định người {land} sống hay chết, và Hộ bộ được bao nhiêu bạc.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chợ họp trong gió cát",w:"emp",if:RDW(1),t:"Lương đã ra ải; chợ Ngọc Môn họp lần đầu giữa gió cát. A La Hám mang đến những đồng bạc khắc mặt {quan} và những con lạc đà gầy trơ xương. Quan coi chợ hỏi ngươi: một bao lương đổi bao nhiêu?",o:[
  {n:"Một bao một đồng bạc, lạc đà gầy cũng tính đủ",f:"an",wx:"người {land} thấy Đại Hy không ép",lx:"Hộ bộ chê giá quá hời cho người nước khác",rt:"Quan coi chợ ghi giá. A La Hám chắp tay trước ngực."},
  {n:"Để quan coi chợ định theo lệ",f:"le",wx:"đúng phép, không ai trách",lx:"lệ chợ ải đặt ra cho năm được mùa, giá ép người đói",rt:"Quan coi chợ định theo lệ cũ.",rf:"Lệ cũ ép giá; người {land} lặng lẽ cất bạc đi."},
  {n:"Đòi lạc đà cái làm giá",f:"uy",wx:"Đại Hy có giống lạc đà tốt",lx:"người chạy nạn mất con vật chở đường về",rt:"Quan coi chợ ghi: lương đổi lạc đà cái."}]},
 s2:{h:"Chợ họp mà không ai đến",w:"emp",if:RDW(0),t:"Chợ ải Ngọc Môn mở cửa, nhưng người {land} đến rất ít: họ không tin Đại Hy sau lần ải đóng. A La Hám đứng xa xa, không mang bạc vào.",o:[
  {n:"Viết thư tiếng {land} mời lão tướng vào chợ",f:"an",wx:"lão tướng tin lời người cùng tiếng",lx:"thư tiếng ngoại qua tay Binh bộ",rt:"A La Hám đọc thư, rồi dẫn người vào chợ.",rf:"Binh bộ giữ thư lại hỏi ngươi viết gì."},
  {n:"Xin hạ giá lương một tháng cho người đến trước",f:"le",wx:"người {land} kéo đến",lx:"Hộ bộ thiệt",rt:"Tin hạ giá truyền khắp các trại; chợ đông dần."},
  {n:"Cứ để chợ họp, ai đến thì đến",wx:"không tốn gì",lx:"chợ vắng",rt:"Chợ họp vài phiên rồi đóng."}]},
 c1:{h:"Bao lương ướt",w:"maid",t:"Cung nữ ngươi phái theo chợ báo về: một lái buôn trộn cát vào lương, tưới nước cho nặng cân. Bao lương ướt còn nằm ở trạm Ngọc Môn.",o:[
  {n:"Gửi bao lương ướt về kinh làm chứng",f:"le",go:()=>bdO("baouot","dsv"),wx:"lái buôn bị bắt",lx:"lái buôn ấy có người đỡ ở Hộ bộ",rt:"Bao lương ướt được mở trước Đô sát viện; lái buôn bị tước giấy phép chợ.",rf:"Bao lương về đến kinh thì đã khô; chẳng ai tin."},
  {n:"Bắt lái buôn đền gấp đôi ngay tại chợ",f:"uy",go:()=>bdO("baouot","tram"),wx:"đoàn buôn được đền ngay",lx:"ngươi xử việc của quan coi chợ",rt:"Lái buôn đền lương, quỳ xin tha trước mặt người {land}."},
  {n:"Bù bằng lương của cung ngươi, không làm lớn",f:"an",go:()=>bdO("baouot","tram"),wx:"người chạy nạn không thiệt",lx:"lái buôn vẫn buôn",rt:"Lương của cung ngươi lên xe ra ải."}]},
 c2:{h:"Thư lại Hộ bộ bớt bạc",w:"maid",t:"Cung nữ của ngươi đếm bạc ở trạm: sổ ghi ít hơn số bạc đã đổi. Một thư lại Hộ bộ nấu bớt bạc {land} bán cho phủ của một vị tướng.",o:[
  {n:"Ghi lại số bạc, dâng lên Hoàng thượng",f:"le",wx:"bạc về đủ kho",lx:"vị tướng ấy có người đỡ trong triều",rt:"Hoàng thượng sai đếm lại; thư lại bị đánh trượng, bạc về kho Hộ bộ.",rf:"Sổ đã bị sửa trước khi người của Hoàng thượng đến."},
  {n:"Đòi thư lại trả bạc cho người chạy nạn",f:"an",wx:"người chạy nạn giữ được bạc",lx:"Hộ bộ thiếu bạc",rt:"Thư lại sợ, trả bạc về chợ."},
  {n:"Im lặng, giữ số bạc trong sổ riêng",f:"uy",wx:"ngươi có một món nợ để đòi sau",lx:"bạc vẫn mất",go:()=>{RD_FL("bd_tuyet.ngua",1)},rt:"Cung nữ chép số bạc vào sổ riêng của ngươi."}]},
 t1:{h:"Ngựa trắng tạ ơn",w:"emp",t:"Cuối phiên chợ, A La Hám dắt vào một con ngựa cái trắng giống Nisa, con ngựa cuối cùng từ chuồng {quan}: “Của công chúa.” Theo lệ, phi tần không nhận lễ của người ngoài ải.",o:[
  {n:"Nhận ngựa, dâng lại Hoàng thượng",f:"le",go:()=>bdO("nguatrang","vua"),wx:"Hoàng thượng được ngựa quý",lx:"lão tướng thấy quà mình đi tay khác",rt:"Hoàng thượng cưỡi thử, cười lớn: “Ngựa của nàng.” Ngựa trắng vào chuồng ngự."},
  {n:"Từ chối, bảo lão tướng giữ làm giống",f:"an",go:()=>bdO("nguatrang","asnc"),wx:"người {land} giữ được giống ngựa",lx:"lão tướng tủi lòng",rt:"A La Hám dắt ngựa về, cúi đầu rất thấp."},
  {n:"Nhận ngựa, giữ ở chuồng Thượng tứ viện dưới tên ngươi",f:"uy",go:()=>bdO("nguatrang","ta"),wx:"ngươi có ngựa của riêng mình",lx:"triều thần nói ngươi nhận lễ người ngoài",rt:"Ngựa trắng vào chuồng Thượng tứ viện, tên ngươi trên cọc buộc.",rf:"Đô sát viện dâng sớ hỏi."}]},
 x1:{h:"Định giá chợ ải",w:"emp",t:"Phiên chợ khép lại; Binh bộ và Hộ bộ dâng hai bản giá cho cả mùa đông. Hoàng thượng đặt hai bản trước mặt ngươi: “Nàng hiểu người {land}. Chọn đi.”",o:[
  {n:"Chọn giá công bằng: một bao lương một đồng bạc, người chạy nạn giữ lạc đà",e:["win","lose"],rt:"Hoàng thượng phê giá. Chợ ải họp suốt mùa đông, không ai bỏ về.",rf:"Hộ bộ tâu thiệt bạc; giá bị sửa lại."},
  {n:"Chọn giá có lợi: lương đổi cả hòm bạc giữ lửa của đoàn",e:["win","mid"],rt:"Người chạy nạn nộp hòm bạc giữ lửa để có lương; Hộ bộ khen ngươi.",rf:"Người chạy nạn nộp bạc mà vẫn thiếu lương; lòng người oán."},
  {n:"Thưa: để Binh bộ và Hộ bộ tự bàn",e:"mid",lx:"giá không phải của ngươi",rt:"Hai bộ cãi nhau mãi, rồi lấy giá giữa."}]}},
 E:{win:{tag:"Chợ ải đông vui",w:"emp",t:"Chợ ải Ngọc Môn họp suốt mùa đông. Bạc vào trong, lương ra ngoài, và người hai nước quen mặt nhau.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Chợ họp, lòng chưa họp",t:"Chợ vẫn họp, giá vẫn thuận, nhưng người {land} mặc cả trong im lặng."},
  lose:{tag:"Chợ ải tan",w:"emp",t:"Chợ ải tan giữa chừng. Người {land} cất bạc đi, và từ đó không ai đến nữa.",go:(_A,G)=>e67bien(G[0])}}});

/* .7 Cướp biên — a starving band raids a Đại Hy village; Binh bộ wants punishment [emp, v] */
rdDef("bd_tuyet",7,{t:"Hồ thương bị cướp",w:"emp",sj:"vụ cướp trên đường Lương Châu",cast(A){return rdCast(A,["v"])},
 g:"Một đêm cuối đông, một toán người chạy nạn đói quá, chặn đường Lương Châu cướp một đoàn hồ thương; một lão phu xe người Đại Hy chết. Binh bộ đòi trừng trị, và triều thần nhìn ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lão tướng tự trói người",w:"emp",if:RDW(1),t:"A La Hám đã thề giữ phép Đại Hy. Khi tin đến, lão tự trói những người của mình đã đi cướp, dẫn đến cửa ải: “Lời thề trước lửa thánh của thần bị chúng làm bẩn. Xin Đại Hy xử.”",o:[
  {n:"Xin Hoàng thượng xử theo luật, nhưng nhớ đến lời thề của lão tướng",f:"le",wx:"luật được giữ, lời thề cũng được nhớ",lx:"Binh bộ cho là ngươi xin xỏ",rt:"Hoàng thượng ghi tên A La Hám vào chiếu: người giữ lời."},
  {n:"Xin tha cho bọn họ, bắt làm phu đền cho đoàn hồ thương",f:"an",wx:"đoàn buôn được đền, người được sống",lx:"nhà lão phu xe không nguôi",rt:"Những người ấy kéo xe cho đoàn hồ thương suốt mùa xuân, đến khi đền đủ hàng.",rf:"Nhà lão phu xe kêu lên tận phủ Lương Châu."},
  {n:"Xin chém cả toán, treo đầu ở cửa ải",f:"uy",wx:"không ai dám cướp nữa",lx:"người {land} nhớ ngươi đã đòi đầu người cùng nước",rt:"Những cái đầu treo ở Ngọc Môn quan đến hết tháng."}]},
 s2:{h:"Toán cướp chạy vào núi",w:"emp",if:RDW(0),t:"Toán cướp đã chạy vào núi Kỳ Liên; không ai bị bắt. Binh bộ xin đem quân vào núi lùng, mà dưới núi là trại của người A La Hám dẫn đến.",o:[
  {n:"Viết thư cho lão tướng: tự giao người, Đại Hy không vào núi",f:"an",wx:"trại người chạy nạn không bị đốt",lx:"nếu lão tướng không giao, ngươi mất mặt",rt:"Ít ngày sau, A La Hám giao toán cướp ở cửa ải.",rf:"A La Hám không giao; quân Đại Hy vào núi."},
  {n:"Xin Binh bộ đi, nhưng chỉ bắt kẻ cướp",f:"le",wx:"quân đi có lệnh rõ",lx:"lệnh viết rõ, nhưng lên núi rồi lửa đâu chọn người mà cháy",rt:"Quân Đại Hy bắt được toán cướp, không đốt trại.",rf:"Hai trại bị đốt nhầm."},
  {n:"Chỉ đường cho quân, đổi lấy lời khen của Binh bộ",f:"uy",wx:"Binh bộ nể ngươi",lx:"người {land} biết ai chỉ đường",rt:"Quân Đại Hy vào núi theo đường ngươi chỉ."}]},
 c1:{h:"Nhà lão phu xe",w:"maid",t:"Lão phu xe chết để lại vợ và hai con nhỏ. Cung nữ của ngươi người Lương Châu, khóc kể: nhà ấy không còn hạt thóc nào.",o:[
  {n:"Gửi bạc riêng đền cho nhà lão phu xe",f:"an",wx:"nhà lão phu xe có cái ăn",lx:"bạc của ngươi",rt:"Bạc của ngươi đến tay bà vợ lão phu xe, cùng một tấm vải trắng."},
  {n:"Xin phủ Lương Châu tha thuế cho nhà ấy",f:"le",wx:"nhà ấy được nhẹ",lx:"phủ Lương Châu cho là ngươi xen việc",rt:"Phủ Lương Châu tha thuế một năm.",rf:"Phủ Lương Châu đáp: thuế là việc của Hộ bộ."},
  {n:"Để nhà lão phu xe tự kêu lên quan",wx:"không xen vào",lx:"cung nữ của ngươi buồn",rt:"Cung nữ lau nước mắt, không nói gì."}]},
 c2:{h:"Anh họ {v} ở Binh bộ",w:"v",need:["v"],t:"Anh họ của {v} làm chủ sự ở Binh bộ, dâng sớ: “Cướp đường Lương Châu là vì có kẻ trong cung che chở.” Ai cũng hiểu kẻ ấy là ai.",o:[
  {n:"Dâng sổ lương, chứng minh lương đi đúng sổ",f:"le",wx:"lời sớ thành lời bịa",lx:"Binh bộ soi thêm sổ của ngươi",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Sổ lương của ngươi khớp từng bao; Hoàng thượng gạt tờ sớ đi.",rf:"Sổ khớp, nhưng lời đồn đã lan."},
  {n:"Cho người dò sổ ngựa của anh họ {v}",f:"uy",wx:"nhà {v} cũng có chỗ hở",lx:"hai cung thành thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người của ngươi tìm ra: anh họ {v} giữ bạc chợ ải trong phủ riêng.",rf:"Không tìm ra gì; {v} biết ngươi dò."},
  {n:"Đến cung {v} xin hòa",wx:"tờ sớ bị rút",lx:"{v} thấy ngươi sợ",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cười, hứa bảo anh họ thôi."}]},
 t1:{h:"Lời của A La Hám",w:"emp",t:"A La Hám nhắn vào cung: “Kẻ cướp là người đói. Kẻ đói không phải kẻ thù. Nếu công chúa đứng ra, thần xin đem đàn lạc đà cuối cùng đền cho đoàn hồ thương.”",o:[
  {n:"Nhận lời, đứng ra bảo lãnh cho người chạy nạn",f:"an",wx:"người {land} tin ngươi",lx:"lần sau có cướp, ngươi gánh",go:()=>{bdMeet("asnc");bdO("de","thon")},rt:"Đàn lạc đà cuối cùng của người chạy nạn về tay đoàn hồ thương."},
  {n:"Bảo lão tướng: luật Đại Hy không nhận lạc đà thay đầu",f:"le",go:()=>bdO("de","asnc"),wx:"triều thần thấy ngươi đứng về luật",lx:"lão tướng thấy ngươi xa",rt:"A La Hám im lặng rất lâu."},
  {n:"Nhận lạc đà, giữ lại ở chuồng Thượng tứ viện",f:"uy",go:()=>bdO("de","ta"),wx:"ngươi có thêm của",lx:"đoàn hồ thương không được đền",rt:"Đàn lạc đà vào chuồng Thượng tứ viện dưới tên ngươi.",rf:"Cung nữ hỏi khẽ: “Chủ tử, còn đoàn hồ thương?”"}]},
 x1:{h:"Binh bộ xét án cướp biên",w:"emp",t:"Binh bộ dâng án lên Hoàng thượng. Trước khi phê, ngài hỏi ngươi: “Nàng là người {land}, nàng là phi của trẫm. Án này nàng nói sao?”",o:[
  {n:"Tâu: xử kẻ giết người, tha kẻ đói, đền cho đoàn buôn",e:["win","lose"],rt:"Hoàng thượng phê theo lời ngươi. Đoàn hồ thương được đền, người chạy nạn giữ được người.",rf:"Binh bộ cãi: tha kẻ đói là mở đường cho kẻ cướp. Án bị xử nặng."},
  {n:"Tâu: xử nặng cả toán, giữ uy Đại Hy",e:["win","mid"],rt:"Án xử nặng; Binh bộ khen ngươi biết giữ phép nước.",rf:"Án xử nặng; người {land} gọi ngươi là người đã quên quê nhà."},
  {n:"Thưa: án là của Binh bộ",e:"mid",lx:"không ai biết ngươi đứng đâu",rt:"Hoàng thượng phê theo Binh bộ."}]}},
 E:{win:{tag:"Án cướp được xử phải",w:"emp",t:"Án cướp đường Lương Châu được xử đúng người đúng tội. Đoàn hồ thương lại lên đường, và người {land} thề lần thứ hai.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Án xong, oán chưa xong",t:"Án đã xử. Đoàn hồ thương có người để oán, người chạy nạn có người để thương. Ngươi đứng giữa."},
  lose:{tag:"Đường tơ lụa dậy oán",w:"emp",t:"Án xử nặng, người {land} oán. Lại có đoàn buôn bị chặn, lại có trại bị đốt, và người ta nhắc tên ngươi ở cả hai bên.",go:(_A,G)=>e67bien(G[0])}}});

/* .8 Người lánh nạn ở Ngọc Môn quan — refugees at the gate; the old border general asks the court [emp, maid] */
rdDef("bd_tuyet",8,{t:"Người lánh nạn ở Ngọc Môn quan",w:"emp",sj:"người lánh nạn dưới chân ải",cast(A){return rdCast(A,["v"])},
 g:"Cuối đông, đàn bà và trẻ con {land} kéo đến dưới chân Ngọc Môn quan, ngủ ngoài gió cát. Quan trấn thủ Ngọc Môn dâng sớ: mở cửa thì sợ gian tế, đóng cửa thì người chết ngay dưới chân thành.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"A La Hám dẫn người đến",w:"emp",if:()=>RDW(1)()&&bdAlive("asnc"),t:"Chính A La Hám dẫn đàn bà trẻ con đến chân ải; trai tráng ở lại giữ trại. Lão nhắn ngươi: “Thần tin công chúa, nên thần đưa người đến cửa nhà công chúa.”",o:[
  {n:"Xin cho dựng lều dưới chân thành, trong tầm cung nỏ",f:"le",wx:"người được che gió, ải vẫn giữ được",lx:"quan trấn thủ lo gian tế",go:()=>bdMove("asnc","ai"),rt:"Quan trấn thủ cho dựng lều sát chân thành, lính gác từng đêm."},
  {n:"Gửi áo bông và chăn nỉ của cung ngươi ra ải",f:"an",wx:"trẻ con có áo",lx:"cung ngươi rét",go:()=>{bdMove("asnc","ai");bdO("aobong","ai")},rt:"Những rương áo bông ra ải; trẻ con {land} mặc áo có thêu dấu cung ngươi."},
  {n:"Bảo lão tướng đưa người đi nơi khác, ải không chứa",f:"uy",wx:"triều thần không nói được gì",lx:"lão tướng thấy ngươi quay mặt",rt:"A La Hám nhìn lên tường thành một lúc lâu, rồi quay ngựa."}]},
 s2:{h:"Người lạ dưới chân ải",w:"emp",if:()=>!RDW(1)()||!bdAlive("asnc"),t:"Người dưới chân ải không phải những người ngươi biết; họ đến từ khắp các thành {land} đã mất, vì nghe nói ở Đại Hy có công chúa người {land}.",o:[
  {n:"Xin cho dựng lều dưới chân thành, trong tầm cung nỏ",f:"le",wx:"người được che gió, ải vẫn giữ được",lx:"quan trấn thủ lo gian tế",rt:"Quan trấn thủ cho dựng lều sát chân thành."},
  {n:"Gửi áo bông và chăn nỉ của cung ngươi ra ải",f:"an",wx:"trẻ con có áo",lx:"cung ngươi rét",go:()=>bdO("aobong","ai"),rt:"Những rương áo bông ra ải."},
  {n:"Xin quan trấn thủ đuổi họ đi",f:"uy",wx:"ải yên",lx:"người ta kể ngươi đuổi người cùng tiếng",rt:"Lính ải đánh trống; người dưới chân ải tản dần vào gió cát."}]},
 c1:{h:"Gian tế trong lều",w:"maid",t:"Thám tử của quan trấn thủ báo: trong lều người lánh nạn có một kẻ đếm cung nỏ trên tường thành. Có người nói hắn là người của {pb} ngươi, kẻ đã hàng Đại Thực.",o:[
  {n:"Xin quan trấn thủ bắt riêng kẻ ấy, không động đến lều",f:"le",wx:"gian tế bị bắt, người lánh nạn yên",lx:"nếu bắt nhầm, cả lều sợ",rt:"Quan trấn thủ bắt được kẻ đếm nỏ; trong người hắn có bản vẽ tường thành.",rf:"Bắt nhầm một người dắt lạc đà; cả lều hoảng."},
  {n:"Xin đuổi cả lều ấy đi",f:"uy",wx:"ải không còn mối lo",lx:"đàn bà trẻ con trong lều cũng bị đuổi",rt:"Cả lều bị đuổi ra khỏi tầm ải trong đêm."},
  {n:"Nhắn lão tướng tự tìm kẻ ấy",f:"an",wx:"người {land} tự giữ mình",lx:"chậm",rt:"Người của A La Hám trói kẻ đếm nỏ giao cho lính ải."}]},/*bd6b: he camps under the wall at Ngọc Môn quan (w "ai"), where this line has him*/
 c2:{h:"Cung nữ xin ra ải",w:"maid",t:"Cung nữ thân tín của ngươi quê ở Lương Châu, xin về giúp nấu cháo cho người lánh nạn. Rời cung lúc này là trái lệ.",o:[
  {n:"Xin Thượng cung cục cho nàng về một tháng",f:"le",wx:"có người của ngươi ở ải",lx:"Thượng cung cục ghi ngươi nợ một lệ",rt:"Thượng cung cục cho về. Cung nữ của ngươi nấu cháo dưới chân thành.",rf:"Thượng cung cục không cho."},
  {n:"Gửi bạc theo người khác, giữ nàng ở lại",wx:"bạc đến ải",lx:"cung nữ buồn",rt:"Bạc của ngươi đến tay quan trấn thủ, ghi vào sổ cháo."},
  {n:"Cho nàng đi, ngươi tự gánh lệ",f:"an",wx:"cung nữ thấy ngươi thương người",lx:"Thượng cung cục bắt lỗi",rt:"Cung nữ ra đi lúc trời chưa sáng.",rf:"Thượng cung cục bắt lỗi cung ngươi."}]},
 t1:{h:"Sổ hộ tịch ở Ngọc Môn quan",w:"emp",t:"Quan trấn thủ hỏi: nếu người lánh nạn ở lại qua xuân, có ghi vào sổ hộ tịch Đại Hy không? Ghi thì họ là dân Đại Hy, phải theo luật Đại Hy.",o:[
  {n:"Xin ghi sổ cho ai muốn ở lại",f:"le",wx:"người ở lại có tên có đất",lx:"{land} mất người",rt:"Quan trấn thủ mở sổ; nhiều người xin ghi tên."},
  {n:"Xin không ghi, để khi nước yên họ được về",f:"an",wx:"người {land} vẫn là người {land}",lx:"họ ở lại mà không có tên",rt:"Quan trấn thủ gật đầu, ghi họ là khách qua đông."},
  {n:"Xin ghi sổ, giao họ cho các phủ làm phu",f:"uy",wx:"Đại Hy có thêm người làm",lx:"người lánh nạn thành phu",rt:"Người lánh nạn được chia về các phủ làm phu đắp đê."}]},
 x1:{h:"Sớ của quan trấn thủ",w:"emp",t:"Sớ của quan trấn thủ Ngọc Môn đến tay Hoàng thượng. Ngài đọc cho ngươi nghe đến dòng cuối: “Thần già rồi, mở hay đóng, xin bệ hạ định.” Rồi ngài hỏi ngươi.",o:[
  {n:"Tâu: cho họ ở dưới chân thành qua đông, xuân về thì về",e:["win","lose"],rt:"Hoàng thượng chuẩn. Dưới chân Ngọc Môn quan, khói bếp bốc lên suốt tháng hai.",rf:"Triều thần sợ gian tế, sớ bị bác; lều bị dỡ."},
  {n:"Tâu: cho họ vào trong ải làm dân Đại Hy",e:["win","mid"],rt:"Hoàng thượng chuẩn; người lánh nạn có tên trong sổ hộ tịch.",rf:"Chỉ một phần được vào; số còn lại phải về."},
  {n:"Thưa: việc ải xin để quan trấn thủ định",e:"mid",lx:"ngươi không để lại dấu gì",rt:"Quan trấn thủ định theo lệ cũ."}]}},
 E:{win:{tag:"Khói bếp dưới chân ải",w:"emp",t:"Người lánh nạn qua được mùa đông dưới chân Ngọc Môn quan. A La Hám viết thư cảm ơn ngươi bằng nét chữ run.",go:(_A,G)=>e67bien(G[0])},/*bd6b: he camps under the wall at Ngọc Môn quan (w "ai"), where this line has him*/
  mid:{tag:"Qua đông mà chưa qua lo",t:"Người lánh nạn qua được mùa đông, nhưng chẳng ai biết xuân này họ sẽ đi đâu."},
  lose:{tag:"Lều dỡ trong gió cát",w:"emp",t:"Lều bị dỡ. Người lánh nạn tản vào gió cát, và có những người không bao giờ về đến lều.",go:(_A,G)=>e67bien(G[0])}}});

/* .9 Sốt trong trại — fever in the refugee camp; thái y, steppe healers or quarantine [emp, maid, v] */
rdDef("bd_tuyet",9,{t:"Sốt trong trại",w:"maid",sj:"cơn sốt trong trại lánh nạn",cast(A){return rdCast(A,["v"])},
 g:"Đầu xuân, trại lánh nạn dưới chân Ngọc Môn quan có người sốt, rồi cả lều sốt. Quan trấn thủ đóng cửa thành, tin đến kinh: có kẻ nói là ôn dịch. Thái y viện, thầy thuốc {land}, hay lửa: ngươi phải chọn trước khi tin đồn chọn thay ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của lão tướng",w:"maid",if:()=>RDW(1)()&&bdAlive("asnc"),t:"A La Hám cũng sốt. Lão vẫn gượng viết một dòng: “Thầy thuốc theo đoàn biết bài thuốc sốt đường xa của {land}. Chỉ thiếu thảo dược phương nam.”",o:[
  {n:"Gửi thảo dược phương nam theo bài thuốc {land}",f:"an",wx:"thuốc đúng bệnh người {land}",lx:"thái y viện thấy bị coi thường",rt:"Thảo dược ra ải trong vài ngày; lều đầu tiên hạ sốt.",rf:"Thuốc đến chậm; lều đầu tiên vẫn sốt."},
  {n:"Xin Thái y viện cử người ra ải",f:"le",wx:"thái y xem bệnh tận nơi",lx:"thái y không quen bệnh người {land}",rt:"Một thái y già ra ải, mang theo hai rương thuốc."},
  {n:"Bảo lão tướng giữ người trong lều, không ai ra",f:"uy",wx:"sốt không lan xa",lx:"người trong lều sốt chờ chết",rt:"Lều sốt bị khoanh lại bằng dây thừng đỏ."}]},
 s2:{h:"Sốt lan trong trại",w:"maid",if:()=>!RDW(1)()||!bdAlive("asnc"),t:"Không còn ai trong trại đủ uy để giữ người; người khỏe chạy khỏi người sốt, người sốt nằm lại. Quan trấn thủ hỏi kinh: đốt trại hay cứu.",o:[
  {n:"Gửi thảo dược phương nam theo bài thuốc {land}",f:"an",wx:"có thuốc cho người sốt",lx:"không ai trong trại sắc thuốc",rt:"Cung nữ của ngươi dạy người trong trại sắc thuốc.",rf:"Thuốc đến mà không ai sắc."},
  {n:"Xin Thái y viện cử người ra ải",f:"le",wx:"thái y xem bệnh tận nơi",lx:"thái y không quen bệnh người {land}",rt:"Một thái y già ra ải."},
  {n:"Xin đốt lều sốt, dời người khỏe đi",f:"uy",wx:"sốt dừng lại",lx:"người sốt bị bỏ lại",rt:"Lều sốt cháy trong đêm; người khỏe được dời sang đồi phía đông."}]},
 c1:{h:"Thái y và thầy thuốc {land}",w:"maid",t:"Ở trại, thái y và thầy thuốc {land} cãi nhau: một bên đòi châm cứu, một bên đòi xông hương và uống nước lựu. Người bệnh nằm giữa.",o:[
  {n:"Xin cho hai bên chia lều mà chữa, ghi sổ xem bên nào hạ sốt",f:"le",wx:"có sổ để biết thuốc nào đúng",lx:"chậm vài ngày",rt:"Sổ ghi rõ: lều xông hương hạ sốt trước, lều châm cứu ít người chết hơn."},
  {n:"Nghe thầy thuốc {land}",f:"an",wx:"người bệnh tin thầy của mình",lx:"thái y viện giận",rt:"Lều xông hương hạ sốt trước.",rf:"Khói hương làm hai đứa trẻ ngạt."},
  {n:"Nghe thái y",wx:"Thái y viện vừa lòng",lx:"người bệnh sợ kim",rt:"Thái y châm cứu từng lều."}]},
 c2:{h:"{v} tâu ôn dịch vào kinh",w:"v",need:["v"],t:"{v} tâu trước Thái hậu: cung nữ của ngươi vừa từ ải về, e mang ôn dịch vào cung. Thái hậu cho niêm cửa cung ngươi.",o:[
  {n:"Xin thái y khám cung nữ trước mặt Thái hậu",f:"le",wx:"lời tâu thành lời bịa",lx:"nếu cung nữ có sốt, ngươi mất cả",go:(A,ok,G)=>{ok?rdOan(A,"v",G[0]):rdRel(A,"v",G[1])},rt:"Thái y khám xong, tâu: không sốt. Thái hậu sai mở niêm.",rf:"Cung nữ hơi sốt vì đi đường; cửa cung ngươi niêm thêm ít lâu."},
  {n:"Tự đóng cửa cung, không cãi",f:"an",wx:"ai cũng thấy ngươi biết giữ",lx:"không ai đến cung ngươi",rt:"Ít lâu sau mở cửa, cung ngươi không ai sốt."},
  {n:"Tâu lại: cung nữ nhà {v} cũng vừa đi qua chợ ải",f:"uy",wx:"lời tâu đổi chiều",lx:"hai cung thành thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Thái hậu cho niêm cả cung {v}; {v} giận tái mặt.",rf:"Thái hậu phẩy tay: “Hai người đều im đi.”"}]},
 t1:{h:"Bài thuốc của {mh}",w:"me",t:"Ngươi nhớ bài thuốc {mh} sắc cho ngươi thuở nhỏ sốt trong mùa gió nóng: nước lựu, rễ cam thảo, khói nhũ hương. Viết ra là thành của chung; giữ lại là của riêng nhà ngươi.",o:[
  {n:"Viết bài thuốc, gửi Thái y viện và trại",f:"an",go:()=>bdO("baithuoc","thaiy"),wx:"bài thuốc cứu được nhiều người",lx:"bài thuốc nhà ngươi thành của người",rt:"Thái y viện chép bài thuốc vào sách, ghi: bài thuốc của {mh} {land}."},
  {n:"Tự sắc thuốc, gửi ra ải dưới tên cung ngươi",f:"uy",go:()=>bdO("baithuoc","ta"),wx:"người {land} nhớ ơn ngươi",lx:"một mình ngươi sắc không đủ",rt:"Bình thuốc mang dấu cung ngươi đến từng lều.",rf:"Thuốc không đủ cho cả trại."},
  {n:"Giữ bài thuốc, để thái y tự chữa",go:()=>bdO("baithuoc","ta"),wx:"không dính vào",lx:"có thể đã cứu được người",rt:"Ngươi gấp tờ giấy, cất vào hộp."}]},
 x1:{h:"Tờ chiếu về trại",w:"emp",t:"Lão tướng xin chiếu: chữa hay đốt. Hoàng thượng cầm bút, rồi dừng lại, nhìn ngươi.",o:[
  {n:"Tâu: chữa, gửi thêm thuốc và người",e:["win","lose"],rt:"Hoàng thượng phê chữ “chữa”. Một tháng sau, trại hết sốt.",rf:"Thuốc không kịp; trại mất nhiều người, triều thần trách ngươi đã giữ trại."},
  {n:"Tâu: dời người khỏe, đốt lều sốt",e:["win","mid"],rt:"Lửa dập được sốt; người khỏe sống, người sốt không còn.",rf:"Lửa cháy, sốt vẫn lan sang đồi phía đông."},
  {n:"Thưa: xin nghe Thái y viện",e:"mid",lx:"không phải lời của ngươi",rt:"Hoàng thượng phê theo Thái y viện."}]}},
 E:{win:{tag:"Trại hết sốt",w:"emp",t:"Trại dưới chân Ngọc Môn quan hết sốt. Người lánh nạn gọi ngươi bằng một tiếng {land} nghĩa là người mẹ.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Sốt qua, người vơi",t:"Sốt đã qua. Trại vơi đi một phần, và những người còn lại không nhắc đến những người đã đi."},
  lose:{tag:"Trại vắng sau cơn sốt",w:"emp",t:"Cơn sốt cuốn đi nhiều người, trong đó có A La Hám. Người {land} không chôn người chết: họ dựng một tháp đá bên chân ải, đặt lão tướng lên đó cho chim trời, mặt hướng về phía tây.",go:(_A,G)=>{bdKill("asnc");return e67bien(G[0])}}}});/*bd6b: he dies in the camp under the wall, where .8 put him (w "ai")*/

/* .10 Mở cửa ải — the gate: open for people, open for the tribe, or hold [emp, v] */
rdDef("bd_tuyet",10,{t:"Mở cửa ải",w:"emp",sj:"lệnh bài Ngọc Môn quan",cast(A){return rdCast(A,["v"])},
 g:"Sang xuân, {pb} ngươi đã hàng Đại Thực, dẫn quân đuổi theo những người {land} đã ăn lương Đại Hy. Người chạy nạn dồn về Ngọc Môn quan, lần này có cả trai tráng mang đao. Mở cửa ải hay không, cả triều chờ một tấm lệnh bài.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lệnh bài trong tay ngươi",w:"emp",if:RDW(1),t:"Quan trấn thủ Ngọc Môn nhớ ơn ngươi mùa đông qua, gửi vào cung tấm lệnh bài cửa ải: “Thần không dám tự mở. Thần giao cho nương nương giữ, xin nương nương tâu giúp.”",o:[
  {n:"Dâng lệnh bài lên Hoàng thượng ngay",f:"le",wx:"Hoàng thượng thấy ngươi không giữ quyền riêng",lx:"cửa ải mở hay không không còn do ngươi",go:()=>bdO("lenhbai","tra"),rt:"Hoàng thượng nhận lệnh bài, gửi trả về Ngọc Môn quan, nhìn ngươi khác hẳn."},
  {n:"Giữ lệnh bài, chờ đúng lúc mới tâu",f:"uy",wx:"ngươi nắm cửa ải trong tay",lx:"giữ lệnh bài là giữ một tội",go:()=>bdO("lenhbai","ta"),rt:"Tấm lệnh bài nằm trong hộp gỗ trầm dưới gối ngươi.",rf:"Đô sát viện nghe phong thanh: lệnh bài không ở Ngọc Môn quan."},
  {n:"Gửi trả quan trấn thủ, khuyên ông tâu thẳng",f:"an",wx:"quan trấn thủ giữ được phép",lx:"quan trấn thủ một mình gánh",go:()=>bdO("lenhbai","tra"),rt:"Lệnh bài về lại Ngọc Môn quan; quan trấn thủ tự dâng sớ."}]},
 s2:{h:"Ải đóng chặt",w:"emp",if:RDW(0),t:"Sau mùa đông, quan trấn thủ Ngọc Môn không còn tin ai trong cung. Ải đóng chặt; người {land} chen dưới chân thành, và quân của {pb} ngươi chỉ còn cách vài ngày ngựa.",o:[
  {n:"Viết thư cho quan trấn thủ, nhận hết lỗi mùa đông về mình",f:"an",wx:"quan trấn thủ nguôi lòng",lx:"ngươi nhận lỗi không phải của mình",rt:"Quan trấn thủ hồi thư: “Nương nương đã nói vậy, thần xin nghe.”",rf:"Quan trấn thủ không hồi thư."},
  {n:"Xin Hoàng thượng sai sứ ra ải định việc",f:"le",wx:"việc ải có người của triều",lx:"sứ đi mất nhiều ngày",rt:"Hoàng thượng sai một Thị lang bộ Binh ra ải."},
  {n:"Sai người mua chuộc lính giữ cửa nhỏ",f:"uy",wx:"có một lối cho người qua",lx:"nếu lộ, đó là tội mở ải",go:(_A,ok)=>{if(ok)RD_FL("bd_tuyet.cua",1)},rt:"Lính giữ cửa nhỏ nhận bạc; đêm ấy có lối mở.",rf:"Lính giữ cửa nhận bạc rồi khai."}]},
 c1:{h:"Trai tráng mang đao",w:"emp",t:"Trong đám người dưới chân ải có trai tráng mang đao: họ nói họ chạy khỏi quân {pb}, mà cũng có thể là quân {pb}.",o:[
  {n:"Xin cho người vào, đao để lại ngoài ải",f:"le",wx:"người được cứu, đao không vào",lx:"người {land} không bỏ đao",rt:"Đao chất thành đống ngoài cửa ải; người qua tay không.",rf:"Nhiều người không chịu bỏ đao, quay về phía tây."},
  {n:"Xin cho cả đao vào, để họ giữ ải cùng Đại Hy",f:"uy",wx:"ải có thêm người giữ",lx:"Binh bộ sợ",rt:"Trai tráng {land} đứng trên tường thành cạnh lính Đại Hy.",rf:"Binh bộ dâng sớ: phi tần đưa quân ngoại vào ải."},
  {n:"Xin chỉ cho đàn bà trẻ con vào",f:"an",wx:"người yếu được cứu",lx:"trai tráng phải ở ngoài",rt:"Đàn bà trẻ con qua cửa; trai tráng đứng lại ngoài tường."}]},
 c2:{h:"{v} tâu ngươi giữ lệnh bài",w:"v",need:["v"],t:"{v} tâu với Hoàng hậu: “Nghe nói lệnh bài cửa ải không ở Ngọc Môn quan. Người {land} giữ cửa nhà Đại Hy, thật lạ.”",o:[
  {n:"Mời Hoàng hậu xem hộp trầm của ngươi",f:"le",wx:"ai cũng thấy ngươi không giấu",lx:"nếu lệnh bài ở chỗ ngươi, lời tâu thành thật",go:(A,ok,G)=>{ok?rdOan(A,"v",G[0]):rdRel(A,"v",G[1])},rt:"Hộp chỉ có thư của quan trấn thủ; {v} lặng đi.",rf:"Hoàng hậu thấy lệnh bài trong hộp; ngươi phải tâu cho rõ."},
  {n:"Dò xem ai báo cho {v}",f:"uy",wx:"tìm ra tai mắt trong cung ngươi",lx:"cung nữ nào cũng sợ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Kẻ báo tin là một thái giám quét sân; ngươi trả hắn về Nội vụ phủ.",rf:"Không tìm ra ai."},
  {n:"Im lặng",wx:"không lỡ lời",lx:"lời tâu ở lại",rt:"Ngươi không đáp."}]},
 t1:{h:"Thư của {pb}",w:"emp",t:"Một mũi tên mang thư cắm trên tường thành: {pb} ngươi viết, “Mở cửa ải cho ta qua, ta cho cháu gái làm {mh} của cả {land} dưới cờ Đại Thực.”",o:[
  {n:"Dâng thư lên Hoàng thượng",f:"le",go:()=>bdO("thuthuc","dot"),wx:"Hoàng thượng thấy ngươi không hai lòng",lx:"{pb} biết ngươi đã chọn",rt:"Hoàng thượng đốt thư trước mặt ngươi: “Trẫm tin nàng.”"},
  {n:"Hồi thư: người của ta không theo giặc, quân của Vương thúc cũng đừng hòng qua ải",f:"an",go:()=>bdO("thuthuc","ta"),wx:"{pb} biết ngươi không sợ",lx:"{pb} giận",rt:"Thư hồi đi theo mũi tên khác."},
  {n:"Giữ thư, không tâu, chờ xem ai thắng",f:"uy",wx:"ngươi còn đường lui",lx:"giữ thư giặc là giữ một tội",go:()=>bdO("thuthuc","giu"),rt:"Thư của {pb} nằm dưới đáy hộp trang sức."}]},
 x1:{h:"Ngọc Môn quan",w:"emp",t:"Đêm trước ngày quân {pb} đến chân ải, Hoàng thượng hỏi ngươi lần cuối: “Mở cửa, trẫm cứu người hay cứu giặc? Nàng nói.”",o:[
  {n:"Tâu: mở cửa cho người, đóng cửa với giặc",e:["win","lose"],rt:"Hoàng thượng chuẩn. Cửa ải mở cho người chạy nạn, đóng sau lưng họ; quân {pb} đến thì chỉ thấy tường thành.",rf:"Cửa mở chậm; quân {pb} đuổi đến khi người còn chen ở cửa."},
  {n:"Tự trao lệnh bài cho A La Hám, mở ải cho cả đoàn người",if:()=>(bdO("lenhbai")==="ta"||!!RD_FL("bd_tuyet.cua"))&&bdAlive("asnc"),e:["win","lose"],go:()=>bdO("lenhbai","asnc"),rt:"Cả đoàn người qua ải trong một đêm, cả trai tráng mang đao. Sáng ra Hoàng thượng mới biết.",rf:"Lính ải chặn lại; Binh bộ dâng sớ hỏi tội ngươi mở ải."},
  {n:"Tâu: giữ ải đóng, đợi quân Vương thúc rút",e:"mid",lx:"người dưới chân ải tự lo",rt:"Ải đóng. Quân {pb} đến, đứng mấy ngày rồi rút."}]}},
 E:{win:{tag:"Cửa ải mở cho người",w:"emp",t:"Ngọc Môn quan mở cho người và đóng với giặc. Người {land} qua ải gọi ngươi là người giữ cửa.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Ải đóng, lòng mở",t:"Ải đóng suốt mùa xuân. Người dưới chân ải sống được nhờ áo và lương của ngươi, nhưng không ai vào."},
  lose:{tag:"Cửa ải thành tội",w:"emp",t:"Việc cửa ải thành tội của ngươi. Binh bộ ghi tên ngươi vào sớ, và người {land} chết dưới chân thành.",go:(_A,G)=>e67bien(G[0])}}});

/* .11 Khúc ca mùa xuân — the thaw; who is remembered (road finale; her winter song, ge4, is a chapter option) [emp, v] */
rdDef("bd_tuyet",11,{t:"Khúc ca Nô Nhụ",w:"emp",sj:"tết Nô Nhụ sau năm chạy nạn",cast(A){return rdCast(A,["v"])},
 g:"Ngày xuân phân, người {land} ăn tết Nô Nhụ, năm mới của họ. Hoàng thượng mở yến xuân ở Ngự hoa viên, mời sứ {land} đến dự. Ai được nhớ sau năm chạy nạn, ai bị quên, là chuyện của đêm nay. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sứ {land} mang tin lão tướng",w:"emp",if:()=>RDW(1)()&&bdAlive("asnc"),t:"Sứ {land} mang đến một dấu ấn bạc mới, khắc thêm một cánh chim: A La Hám còn sống, đoàn người đã về đất Tật Lăng, và lão xin được gọi ngươi là con gái.",o:[
  {n:"Nhận dấu ấn bạc, đeo vào cổ tay",f:"an",wx:"người {land} nhận ngươi là người nhà",lx:"triều thần thấy ngươi đeo dấu ngoại tộc",go:()=>{bdMove("asnc","tn");bdO("day2","ta")},rt:"Dấu ấn bạc nằm trên cổ tay ngươi suốt buổi yến."},
  {n:"Xin Hoàng thượng ban cho lão tướng một tước hiệu",f:"le",wx:"người {land} có tên trong sổ Đại Hy",lx:"Lễ bộ phải bàn",go:()=>{bdMove("asnc","tn");bdO("day2","ta")},rt:"Hoàng thượng phong A La Hám làm Thuận nghĩa hầu, giữ chức đô đốc Tật Lăng.",rf:"Lễ bộ tâu: tước hiệu phải chờ năm sau."},
  {n:"Nhắn lão tướng: con gái thì phải được nghe lời",f:"uy",wx:"người {land} nghe lệnh ngươi",lx:"lão thấy ngươi đòi hơn cho",go:()=>{bdMove("asnc","tn");bdO("day2","ta")},rt:"Sứ {land} cúi đầu chuyển lời."}]},
 s2:{h:"Sứ {land} không nhắc đến ngươi",w:"emp",if:()=>!RDW(1)()&&bdAlive("asnc"),t:"Sứ {land} dâng lễ, đọc quốc thư, mà không nhắc tên ngươi. Ở chân ải, A La Hám vẫn sống, nhưng đoàn người đã chia đôi: một nửa tin ngươi, một nửa không.",o:[
  {n:"Xin gặp sứ, gửi lời cho lão tướng",f:"an",wx:"lời ngươi về đến đoàn người",lx:"triều thần thấy ngươi gặp sứ riêng",rt:"Sứ nghe xong, gật đầu: “Lời công chúa, thần đưa về.”"},
  {n:"Im lặng dự yến",wx:"không ai trách ngươi",lx:"đoàn người không nghe ngươi nói gì",rt:"Ngươi uống rượu xuân, không nói một lời."},
  {n:"Xin Hoàng thượng hỏi sứ vì sao không nhắc ngươi",f:"uy",wx:"sứ phải trả lời trước điện",lx:"sứ mất mặt, {land} nhớ",rt:"Sứ quỳ tạ lỗi; quốc thư được đọc lại có tên ngươi."}]},
 s3:{h:"Tháp đá bên chân ải",w:"emp",if:()=>!bdAlive("asnc"),t:"Sứ {land} kể: người {land} đã đặt A La Hám lên tháp đá bên Ngọc Môn quan, theo tục không chôn người chết. Họ xin một điều: được giữ một ngọn lửa thánh bên tháp.",o:[
  {n:"Xin Hoàng thượng cho giữ lửa thánh trên đất Đại Hy",f:"an",go:()=>bdO("damo","ai"),wx:"lão tướng được yên",lx:"triều thần không thích lửa ngoại tộc trên đất mình",rt:"Hoàng thượng chuẩn; bên tháp có một bia nhỏ mang tên lão tướng bằng hai thứ chữ."},
  {n:"Thưa: xin đưa hài cốt lão tướng về Tật Lăng",f:"le",go:()=>bdO("damo","tn"),wx:"đất nào người ấy",lx:"đoàn người phải mang hài cốt qua sa mạc",rt:"Đoàn người mang hài cốt lão tướng về Tật Lăng."},
  {n:"Thưa: việc ấy xin để Lễ bộ",wx:"không xen vào",lx:"đoàn người chờ mãi",rt:"Lễ bộ gác việc ấy lại."}]},
 c1:{h:"Rương hồi môn trong kho",w:"me",if:()=>bdO("hoimon")==="kho",t:"Rương hồi môn ngươi cầm cho kho Thường Bình mùa đông vẫn nằm đó. Lang trung bộ Hộ hỏi: chuộc lại, hay để kho bán.",o:[
  {n:"Chuộc lại rương hồi môn",wx:"của {mh} về tay ngươi",lx:"tốn bạc",go:()=>bdO("hoimon","ve"),rt:"Rương hồi môn về lại kho cung ngươi, niêm ấn còn nguyên."},
  {n:"Để kho bán, lấy tiền mua giống cho người chạy nạn",f:"an",wx:"người chạy nạn có giống lạc đà mới",lx:"của hồi môn thành của người",go:()=>bdO("hoimon","ban"),rt:"Bình bạc và chuỗi lưu ly được bán ở Tây Thị; người chạy nạn có một đàn lạc đà giống."},
  {n:"Xin Hoàng thượng chuộc thay",f:"uy",wx:"không tốn bạc của ngươi",lx:"ngươi nợ Hoàng thượng một ân",go:(_A,ok)=>{if(ok)bdO("hoimon","ve")},rt:"Hoàng thượng cười, sai Nội vụ phủ chuộc.",rf:"Hoàng thượng bảo: “Của nàng thì nàng chuộc.”"}]},
 c2:{h:"{v} ở yến xuân",w:"v",need:["v"],t:"Giữa yến, {v} nâng chén: “Năm nay ai cũng nói đến người {land}. Hay muội muội hát một bài cho người Đại Hy nghe xem người {land} hát thế nào?”",o:[
  {n:"Đứng dậy hát",f:"ca",wx:"cả yến lặng nghe",lx:"hát hỏng thì {v} được cười",go:(A,ok,G)=>{ok?rdOan(A,"v",G[0]):rdRel(A,"v",G[1])},rt:"Ngươi hát một câu dân ca {land}; sứ {land} đứng dậy hát theo.",rf:"Giọng ngươi run; {v} cười nhẹ."},
  {n:"Mời {v} hát trước",wx:"chén rượu quay về tay {v}",lx:"{v} biết ngươi né",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đỏ mặt, hát một bài tiểu khúc."},
  {n:"Cười, nâng chén đáp lễ",wx:"không ai mất mặt",lx:"lời mời còn đó",rt:"Hai chén rượu chạm nhau."}]},
 t1:{h:"Khúc ca Nô Nhụ",w:"me",t:"Suốt mùa đông, đêm nào ngươi cũng ngân một khúc ca không lời. Hoàng thượng nghe được, hỏi ngươi có muốn viết lời cho nó không, để hát trong yến xuân, đúng ngày tết Nô Nhụ.",o:[
  {n:"Viết khúc ca Nô Nhụ: kể người đã cứu người",f:"ca",wx:"người Đại Hy và người {land} đều hát được",lx:"Lễ bộ phải duyệt lời",go:()=>bdO("khuc","thien"),rt:"Khúc ca Nô Nhụ kể chuyện xe lương, chuyện khói bếp dưới chân ải; Lễ bộ chép vào nhạc phủ."},
  {n:"Viết khúc ca oán: kể cửa ải đã đóng",f:"uy",wx:"người {land} thấy ngươi không quên",lx:"triều thần nghe ra lời trách Đại Hy",go:()=>bdO("khuc","oan"),rt:"Khúc ca kể những người chết dưới chân thành; sứ {land} nghe mà khóc.",rf:"Lễ bộ không cho hát khúc ấy trong yến; tờ lời ca về lại tay ngươi."},
  {n:"Giữ khúc ca không lời",wx:"không ai bàn",lx:"không ai nhớ mùa đông qua lời ngươi",rt:"Ngươi ngân khúc ca một mình, rồi thôi."}]},
 x1:{h:"Yến xuân Ngự hoa viên",w:"emp",t:"Yến xuân sắp tan. Hoàng thượng nâng chén cuối, nói trước sứ {land}: “Năm nay biên ải yên là nhờ một người. Trẫm muốn ban cho người ấy một điều.” Ngài nhìn ngươi, chờ ngươi xin.",o:[
  {n:"Xin mỗi năm mở chợ đổi lương lấy bạc ở Ngọc Môn quan",e:["win","lose"],rt:"Hoàng thượng chuẩn trước sứ {land}. Chợ Ngọc Môn thành lệ mỗi năm, họp đúng tết Nô Nhụ.",rf:"Binh bộ và Hộ bộ cùng tâu: lệ chợ phải bàn ở triều. Lời xin của ngươi bị gác."},
  {n:"Xin được tự tay hát khúc ca Nô Nhụ trước sứ {land}",e:["win","mid"],rt:"Ngươi hát; sứ {land} quỳ nghe. Hoàng thượng sai chép khúc ca vào nhạc phủ.",rf:"Ngươi hát, cả yến lặng nghe, rồi yến tan như mọi năm."},
  {n:"Thưa: thần thiếp không dám xin gì",e:"mid",lx:"ân điển trôi qua",rt:"Hoàng thượng gật đầu, uống cạn chén."}]}},
 E:{win:{tag:"Mùa xuân mang tên ngươi",w:"emp",t:"Năm chạy nạn thành chuyện kể. Ở Đại Hy người ta nhắc chợ Ngọc Môn, ở {land} người ta nhắc xe lương, và ở cả hai nơi người ta nhắc tên ngươi.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Xuân về, người ở lại",t:"Xuân về, người ở lại. Mùa đông năm ấy thành một chuyện cũ, người nhớ người quên, và ngươi vẫn là phi tần của Đại Hy."},
  lose:{tag:"Mùa xuân không về",w:"emp",t:"Mùa xuân đến mà không mang theo gì cho ngươi. Triều thần nhớ ngươi đã xin cho người ngoài ải, người ngoài ải nhớ những gì ngươi không xin được.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"bd_tuyet_11",tag:"Bia đá bên Ngọc Môn quan",w:"emp",n:"Xin dựng một tấm bia ở Ngọc Môn quan, khắc khúc ca Nô Nhụ bằng hai thứ chữ",
 path:["mở kho theo lệ cứu đói","Đem bạc riêng mua lương","rương hồi môn cầm","giá công bằng","Bù bằng lương của cung ngươi","tha kẻ đói","Gửi bạc riêng đền","đứng ra bảo lãnh","Gửi áo bông và chăn nỉ","qua đông, xuân về","bài thuốc {land}","Viết bài thuốc","mở cửa cho người","Viết khúc ca Nô Nhụ"],bad:["Xin chém cả toán","Xin đốt lều sốt","Xin đuổi cả lều","khúc ca oán"],
 x:[()=>S.danh>=RR("bd_tuyet_11").bar,"Danh từ "+RR("bd_tuyet_11").bar],
 t:"Tấm bia đá dựng bên Ngọc Môn quan, một mặt chữ Đại Hy, một mặt chữ {land}, khắc khúc ca Nô Nhụ của ngươi. Lính ải học thuộc, người dắt lạc đà học thuộc. Hoàng thượng ban biển ngự bút treo trước cung ngươi, và mỗi mùa đông sau đó, xe lương đầu tiên ra ải đều dừng lại trước tấm bia.",
 go:(_A,G)=>{bdO("khuc","thien");return e67bien(G[0])},rw:"bienngu",ti:"Người hát khúc ca Nô Nhụ"}));

/* ---------- bd_hen · Lời thề trước lửa thánh (Ba Tư; Tình yêu · Tự do; GE ge1 Lời thề trọn vẹn · ge2 Dâng lửa lời thề · ge3 Nghĩa huynh đường xa · ge4 Đòi máu cho chàng) ---------- */
/* Mật Hồ Đạt (BDP phong): .4 rides into the capital with the embassy guard (w "kinh"), lodges at Hội Đồng quán; .9 jailed in Đại Lý tự (w "nguc");
   .10 freed (kinh) · exiled (tn) · dies (alive −1, the road's revenge branch); .11 leaves with the embassy (tn) or his coffin does. */
const bdPh=()=>bdAlive("phong");
ARC67.bd_hen=bdArc("bd_hen",{o:"bd",t:"Lời thề trước lửa thánh",w:"emp",sj:"lời thề trước lửa thánh",g:"Năm ấy, trước ngày ngươi lên xe hoa sang Đại Hy, Mật Hồ Đạt, con một nhà quý tộc lớn của {land}, quỳ trước ngọn lửa thánh trong đền lửa, lấy thần giữ lời thề làm chứng, thề sống chết không quên, rồi đeo vào tay ngươi chiếc nhẫn ấn khắc cánh chim; ngươi trả lại chàng, hẹn khi gặp lại sẽ đeo. Nay sứ đoàn {land} vào kinh xin Đại Hy làm chỗ dựa, và người cầm đầu đoàn hộ vệ chính là chàng.",
 p:[["s1","s2"],["c1","c2","G.rumor","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Đoàn hộ vệ vào kinh",w:"emp",t:"Sứ đoàn {land} qua Ngọ môn. Người cưỡi ngựa đi đầu đoàn hộ vệ ngẩng mặt nhìn lên lầu, nơi các phi tần đứng xem: Mật Hồ Đạt.",o:[
  {n:"Lùi vào sau rèm, không để chàng thấy",f:"phan",wx:"không ai thấy gì",lx:"chàng tưởng ngươi đã quên",go:()=>{bdMove("phong","kinh");bdMeet("phong")},rt:"Rèm buông. Ngươi nghe tiếng vó ngựa xa dần về phía Hội Đồng quán."},
  {n:"Đứng yên, khẽ gật đầu",f:"tinh",wx:"chàng biết ngươi còn nhớ",lx:"có người trên lầu thấy",go:()=>{bdMove("phong","kinh");bdMeet("phong")},rt:"Chàng đặt tay lên ngực, cúi đầu rồi thúc ngựa đi.",rf:"Một phi tần đứng cạnh khẽ hỏi: “Tỷ tỷ quen người ấy sao?”"},
  {n:"Thưa thật với Hoàng thượng: người ấy từng đính ước với thần thiếp",f:"that",wx:"Hoàng thượng thấy ngươi không giấu",lx:"từ nay Hoàng thượng để mắt đến người ấy",go:()=>{bdMove("phong","kinh");bdMeet("phong")},rt:"Hoàng thượng im lặng hồi lâu rồi nói: “Nàng nói trước, trẫm nhớ điều đó.”",rf:"Hoàng thượng đặt chén xuống: “Sao nàng phải nói với trẫm?”"}]},
 s2:{h:"Nhúm tro thơm gói lụa đỏ",w:"me",t:"Một người hầu của sứ đoàn đưa vào cung một nhúm tro thơm gói trong lụa đỏ, tro lấy từ lò lửa thánh ở quê nhà. Không có chữ nào.",o:[
  {n:"Giữ gói tro trong hộp trang sức",f:"tinh",go:()=>{bdMove("phong","kinh");bdMeet("phong");bdO("co","ta")},wx:"lòng ngươi yên",lx:"vật ấy có thể thành chứng cớ",rt:"Gói tro nằm dưới chiếc trâm bạc của {mh}."},
  {n:"Rải gói tro xuống hồ",f:"phan",go:()=>{bdMove("phong","kinh");bdMeet("phong");bdO("co","dot")},wx:"không để lại dấu",lx:"tay ngươi run",rt:"Tro tan trên mặt hồ, mùi nhũ hương còn vương trên tay ngươi."},
  {n:"Gửi lại một sợi chỉ xanh: ta vẫn nhớ, nhưng đừng tìm",f:"nghia",go:(_A,ok)=>{bdMove("phong","kinh");bdMeet("phong");bdO("co","ta");if(ok)bdO("chi","phong")},wx:"chàng hiểu ý ngươi",lx:"người đưa tin có thể bị bắt",rt:"Sợi chỉ xanh về đến Hội Đồng quán trước khi trời tối.",rf:"Người đưa tin bị thị vệ hỏi ở cửa cung."}]},
 c1:{h:"Duyệt đoàn hộ vệ",w:"emp",t:"Hoàng thượng duyệt đoàn hộ vệ {land} ở giáo trường, gọi ngươi đến bên để dịch lời. Mật Hồ Đạt quỳ trước mặt ngài, mắt không nhìn ngươi.",o:[
  {n:"Dịch đúng từng lời, giọng không run",f:"phan",wx:"Hoàng thượng khen ngươi giỏi tiếng",lx:"nếu giọng run, ai cũng nghe",rt:"Lời ngươi dịch rõ ràng; Hoàng thượng ban rượu cho đoàn hộ vệ.",rf:"Đến tên chàng, giọng ngươi chùng xuống."},
  {n:"Dịch thêm một câu khen chàng giỏi cưỡi bắn",f:"tinh",go:(_A,ok)=>{if(ok)bdO("cung","phong")},wx:"Hoàng thượng ban thưởng cho chàng",lx:"Hoàng thượng nhìn ngươi",rt:"Hoàng thượng ban chàng một cây cung sừng.",rf:"Hoàng thượng hỏi: “Sao nàng biết y cưỡi bắn giỏi?”"},
  {n:"Xin cho thông dịch Tứ Di quán dịch thay",wx:"không phải đứng gần chàng",lx:"Hoàng thượng thấy ngươi ngại",rt:"Thông dịch Tứ Di quán bước lên; ngươi lui về sau."}]},
 c2:{h:"{v} để ý",w:"v",need:["v"],t:"{v} cười trong buổi thỉnh an: “Đội trưởng hộ vệ {land} cứ nhìn về phía hậu cung. Chẳng biết là nhìn ai.”",o:[
  {n:"Đáp: người {land} nhìn lửa, không nhìn người",wx:"lời {v} rơi xuống đất",lx:"thành ra cãi nhau",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Cả điện cười; {v} không nói tiếp.",rf:"Cả điện im; ai cũng nhớ câu của {v}."},
  {n:"Gửi lễ cho {v}, xin nàng ta thôi nói",wx:"{v} thôi nói",lx:"{v} biết ngươi sợ",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận lễ, cười khẽ."},/*bd6c: a gift of silver, the option's Bạc cost*/
  {n:"Dò xem ai kể cho {v}",f:"uy",wx:"tìm ra tai mắt",lx:"hai cung thành thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người kể là một thái giám ở Hội Đồng quán; ngươi cho người trả hắn về Nội vụ phủ.",rf:"Không tìm ra ai."}]},
 t1:{h:"Lời hẹn ở Thượng uyển",w:"maid",t:"Cung nữ thân tín của ngươi về báo: Mật Hồ Đạt xin được gặp ngươi một lần, ở góc vườn Thượng uyển nơi đoàn hộ vệ đi tuần, trước khi sứ đoàn vào nghị việc.",o:[
  {n:"Đến gặp, có cung nữ đứng canh",f:"tinh",wx:"được nói một lời",lx:"nếu bị thấy, là tội",rt:"Dưới gốc tùng, chàng chỉ nói: “Ta đến để xem nàng có được sống yên không.”",rf:"Một thị vệ đi qua; hai người phải tách ra, không kịp nói gì."},
  {n:"Nhắn: không gặp, nhưng không quên",f:"nghia",wx:"chàng hiểu",lx:"chàng buồn",rt:"Cung nữ mang lời ngươi đi. Đêm ấy không ai đứng dưới gốc tùng."},
  {n:"Báo cho thị vệ tăng tuần ở vườn",f:"phan",wx:"ngươi giữ được mình",lx:"chàng biết ngươi đã chọn",rt:"Đêm ấy vườn Thượng uyển có thêm đèn và thêm lính."}]},
 x1:{h:"Yến đãi sứ đoàn",w:"emp",t:"Yến đãi sứ đoàn. Hoàng thượng muốn ban thưởng cho đội trưởng hộ vệ, quay sang hỏi ngươi: “Người {land} quý gì nhất?”",o:[
  {n:"Tâu: một con ngựa tốt và lời khen của bệ hạ",e:["win","lose"],go:()=>bdO("nguaban","phong"),rt:"Hoàng thượng ban ngựa. Mật Hồ Đạt quỳ tạ, không ngẩng lên.",rf:"Hoàng thượng ban ngựa, rồi hỏi: “Nàng biết rõ người này nhỉ?”"},
  {n:"Tâu: xin cho chàng ở lại kinh làm hộ vệ quán sứ",e:["win2","mid"],rt:"Hoàng thượng chuẩn. Mật Hồ Đạt ở lại Hội Đồng quán, coi đoàn hộ vệ.",rf:"Hoàng thượng chuẩn, nhưng các phi tần nhìn nhau."},
  {n:"Thưa: thần thiếp không biết",e:"mid",lx:"bỏ lỡ một lời",rt:"Hoàng thượng ban vàng theo lệ."}]}},
 E:{win:{tag:"Lời thề giữ trong lòng",w:"emp",t:"Lời thề cũ ở yên trong lòng ngươi, không ai nhắc. Hoàng thượng tin ngươi, và Mật Hồ Đạt được trọng ở Hội Đồng quán."},
  win2:{tag:"Chàng ở lại kinh thành",w:"emp",t:"Mật Hồ Đạt ở lại kinh thành làm hộ vệ quán sứ. Mỗi sáng, tiếng chiêng đổi gác ở Hội Đồng quán vọng vào tận cung ngươi."},
  mid:{tag:"Gió tây thoảng qua",t:"Sứ đoàn vào nghị việc, đoàn hộ vệ ở lại quán sứ. Chuyện cũ thoảng qua cung cấm như một cơn gió từ phía tây, rồi lặng."},
  lose:{tag:"Lời đồn theo chân ngươi",w:"emp",t:"Lời đồn về ngươi và đội trưởng hộ vệ {land} theo chân ngươi khắp hậu cung, và Hoàng thượng đã nghe."}}});
BD97.push({a:"bd_hen",tag:"Chiếc nhẫn thề trở về",w:"emp",n:"Xin Hoàng thượng làm chứng: lời thề xưa xin đổi thành lời chúc",
 path:["Thưa thật với Hoàng thượng","Gửi lại một sợi chỉ xanh","Dịch đúng từng lời","Nhắn: không gặp","người {land} nhìn lửa","một con ngựa tốt"],bad:["Đến gặp, có cung nữ","Dò xem ai kể"],
 x:[()=>S.duc>=BAL.arc.rare.bd_hen.bar,`Đức từ ${BAL.arc.rare.bd_hen.bar}`],
 t:"Trước mặt sứ đoàn, ngươi kể với Hoàng thượng chuyện lời thề trước lửa thánh năm ấy. Ngài lặng nghe, rồi sai thắp một ngọn đèn trước điện: “Lời thề cũ, trẫm cho nàng trả bằng lời chúc mới.” Mật Hồ Đạt quỳ nhận lại chiếc nhẫn ấn trước ngọn đèn, thề giữ biên ải cho hai nước. Hoàng thượng ban ngươi ngọc bội, và từ đó không ai dám nhắc chuyện cũ.",
 go:()=>{bdO("da","tra");RD_FL("bd_hen.chung",1)},rw:"ngocboi",ti:"Người đổi lời thề thành lời chúc"});

/* .5 Chiếc nhẫn trong tay áo — he sends her the oath stone through Hội Đồng quán; keep, return, or show the Emperor [maid, emp] */
rdDef("bd_hen",5,{t:"Chiếc nhẫn trong tay áo",w:"maid",sj:"chiếc nhẫn ấn thề",cast(A){return rdCast(A,["v"])},
 g:"Một người hầu của sứ đoàn ở Hội Đồng quán gửi vào cung một túi gấm nhỏ. Trong túi là chiếc nhẫn ấn năm ấy, mặt nhẫn khắc cánh chim và tên hai người. Chiếc nhẫn nhỏ, mà nặng.",
 p:[["s1","s2","s3","s4"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Túi gấm đến cung",w:"maid",if:()=>RDW(1)()&&rdPrev()!=="win2"&&rdPrev()!=="r97",t:"Hoàng thượng tin ngươi, và chính vì thế chiếc nhẫn này càng nặng. Kèm túi gấm có một dòng chữ {land}: “Ta giữ lời. Nàng giữ nhẫn.”",o:[
  {n:"Giữ chiếc nhẫn trong tay áo",f:"tinh",wx:"lời thề ở bên ngươi",lx:"chiếc nhẫn có thể thành chứng cớ",go:()=>bdO("da","ta"),rt:"Chiếc nhẫn nằm trong tay áo ngươi, ấm dần."},
  {n:"Gửi trả chiếc nhẫn, kèm một lời cảm ơn",f:"nghia",wx:"lời thề được trả trọn",lx:"chàng đau lòng",go:()=>bdO("da","tra"),rt:"Túi gấm về lại Hội Đồng quán nguyên như cũ."},
  {n:"Đưa chiếc nhẫn cho Hoàng thượng xem",f:"that",wx:"Hoàng thượng thấy ngươi không giấu",lx:"Hoàng thượng biết cả tên người kia",go:()=>bdO("da","vua"),rt:"Hoàng thượng xoay chiếc nhẫn trong tay: “Nàng giữ đi. Trẫm biết là đủ.”",rf:"Hoàng thượng giữ chiếc nhẫn lại, không nói gì."}]},
 s2:{h:"Hộ vệ quán sứ",w:"maid",if:()=>rdPrev()==="win2",t:"Mật Hồ Đạt ở lại kinh làm hộ vệ quán sứ. Ở gần như thế, chàng vẫn gửi chiếc nhẫn vào cung: không phải để nhớ, mà để hỏi ngươi còn giữ lời không.",o:[
  {n:"Giữ chiếc nhẫn trong tay áo",f:"tinh",wx:"lời thề ở bên ngươi",lx:"chàng ở gần, lời đồn càng gần",go:()=>bdO("da","ta"),rt:"Chiếc nhẫn nằm trong tay áo ngươi."},
  {n:"Gửi trả chiếc nhẫn, nhắn chàng về {land}",f:"nghia",wx:"chàng hiểu nên đi đâu",lx:"chàng đau lòng",go:()=>bdO("da","tra"),rt:"Túi gấm về lại Hội Đồng quán."},
  {n:"Đưa chiếc nhẫn cho Hoàng thượng xem",f:"that",wx:"Hoàng thượng thấy ngươi không giấu",lx:"Hoàng thượng biết người kia ở rất gần",go:()=>bdO("da","vua"),rt:"Hoàng thượng xoay chiếc nhẫn trong tay: “Nàng giữ đi.”",rf:"Hoàng thượng giữ chiếc nhẫn lại."}]},
 s3:{h:"Chiếc nhẫn giữa lời đồn",w:"maid",if:RDW(0),t:"Lời đồn còn chưa tắt mà chiếc nhẫn đã đến. Nếu ai thấy túi gấm này, lời đồn sẽ thành chứng cớ.",o:[
  {n:"Giữ chiếc nhẫn trong tay áo",f:"tinh",wx:"lời thề ở bên ngươi",lx:"lời đồn có chứng cớ",go:()=>bdO("da","ta"),rt:"Chiếc nhẫn nằm trong tay áo ngươi."},
  {n:"Gửi trả chiếc nhẫn ngay đêm nay",f:"nghia",wx:"không còn chứng cớ trong cung",lx:"chàng đau lòng",go:()=>bdO("da","tra"),rt:"Túi gấm về lại Hội Đồng quán trước canh ba."},
  {n:"Dâng nhẫn vào lửa thánh ở đền Hỏa Tiên",f:"uy",wx:"không ai tìm ra",lx:"lời thề tan trong lửa",go:()=>bdO("da","chon"),rt:"Đêm ấy ngươi sai người thân tín mang chiếc nhẫn đến đền Hỏa Tiên ở Tây Thị, dâng vào lò lửa."}]},
 s4:{h:"Chiếc nhẫn mới",w:"maid",if:()=>rdPrev()==="r97",t:"Lời thề cũ đã được trả bằng lời chúc trước mặt Hoàng thượng. Nay chàng gửi vào một chiếc nhẫn bạc khác, khắc một chữ: “nghĩa”.",o:[
  {n:"Giữ chiếc nhẫn bạc",f:"nghia",wx:"nghĩa cũ thành nghĩa mới",lx:"người ta hỏi nhẫn từ đâu",go:()=>bdO("da","ta"),rt:"Chiếc nhẫn bạc đặt trên án thư của ngươi."},
  {n:"Đưa chiếc nhẫn cho Hoàng thượng xem",f:"that",wx:"Hoàng thượng thấy ngươi không giấu",lx:"không còn gì là riêng",go:()=>bdO("da","vua"),rt:"Hoàng thượng cười: “Chữ nghĩa, tốt.”"},
  {n:"Gửi trả, nhắn: lời chúc đã đủ",f:"phan",wx:"không còn gì vướng",lx:"chàng hụt hẫng",go:()=>bdO("da","tra"),rt:"Chiếc nhẫn bạc về lại Hội Đồng quán."}]},
 c1:{h:"Cung nữ thấy túi gấm",w:"maid",t:"Một cung nữ quét phòng thấy túi gấm, mặt tái đi. Nàng không biết chữ {land}, nhưng biết túi gấm đàn ông.",o:[
  {n:"Nói thật với nàng, nhờ nàng giữ kín",f:"that",wx:"nàng thành người của ngươi",lx:"thêm một người biết",rt:"Cung nữ quỳ xuống: “Nô tỳ chết cũng không nói.”",rf:"Cung nữ gật đầu, nhưng mắt vẫn sợ."},
  {n:"Cho bạc, dặn nàng quên",f:"uy",wx:"nàng im",lx:"bạc mua được miệng, không mua được lòng",rt:"Cung nữ nhận bạc, cúi đầu lui ra."},
  {n:"Xin Nội vụ phủ chuyển nàng sang cung khác",f:"phan",wx:"không còn ai biết trong cung ngươi",lx:"nàng mang theo điều đã thấy",rt:"Ba hôm sau, cung nữ ấy sang hầu ở Dịch đình."}]},
 c2:{h:"Hoàng thượng hỏi túi gấm",w:"emp",t:"Hoàng thượng đến cung ngươi, thấy túi gấm trên án thư: “Gấm này dệt kiểu {land}. Của ai gửi?”",o:[
  {n:"Thưa thật: của người đã từng đính ước",f:"that",wx:"Hoàng thượng thấy ngươi thật",lx:"ngài nhớ thêm một tên",rt:"Hoàng thượng gật đầu chậm: “Trẫm thích nàng thật.”",rf:"Hoàng thượng đặt túi gấm xuống, không ngồi lâu."},
  {n:"Thưa: {mh} gửi sang",f:"tinh",wx:"Hoàng thượng không hỏi thêm",lx:"một lời dối nằm lại",rt:"Hoàng thượng cười: “{mh} của nàng khéo tay.”",rf:"Hoàng thượng nhìn chữ thêu, rồi nhìn ngươi."},
  {n:"Thưa: quà sứ đoàn tặng các phi tần",wx:"không dối hẳn",lx:"các phi tần khác không có túi gấm nào",rt:"Hoàng thượng không hỏi thêm."}]},
 t1:{h:"Nhẫn ở đâu thì yên",w:"me",t:"Đêm khuya, ngươi cầm chiếc nhẫn trong tay. Nhẫn ở đâu thì lời thề ở đó: trong tay áo, trong lửa thánh, hay trước lò lửa ở quê nhà.",o:[
  {n:"Gửi theo sứ đoàn, dâng lại trước lò lửa quê nhà",f:"nghia",wx:"lời thề về chỗ của nó",lx:"chàng phải tự mang về",if:()=>bdO("da")!=="vua",go:()=>bdO("da","tra"),rt:"Ngươi nhờ sứ đoàn mang chiếc nhẫn về dâng lại trước lò lửa thánh ở quê nhà."},
  {n:"Giữ lại, khâu vào lớp lót áo",f:"tinh",wx:"lời thề theo ngươi mọi lúc",lx:"áo nào cũng có thể bị khám",if:()=>bdO("da")!=="vua",go:()=>{bdO("da","ta");RD_FL("bd_hen.lot",1)},rt:"Chiếc nhẫn nằm trong lớp lót chiếc áo gấm của {mh}."},
  {n:"Dâng nhẫn vào lửa thánh ở đền Hỏa Tiên, coi như lời thề đã trả",f:"uy",wx:"không còn gì để ai tìm",lx:"lòng ngươi nặng",if:()=>bdO("da")!=="vua",go:()=>bdO("da","chon"),rt:"Lửa ở đền Hỏa Tiên bùng lên một lát rồi lặng."},
  {n:"Để chiếc nhẫn ở chỗ Hoàng thượng",f:"that",wx:"không còn gì giấu",lx:"lời thề nằm trong tay người khác",if:()=>bdO("da")==="vua",rt:"Chiếc nhẫn nằm trong hộp gỗ ở Dưỡng Tâm điện."},
  {n:"Xin Hoàng thượng trả lại chiếc nhẫn",f:"tinh",wx:"lời thề về tay ngươi",lx:"Hoàng thượng biết ngươi còn giữ",if:()=>bdO("da")==="vua",go:(_A,ok)=>{if(ok)bdO("da","ta")},rt:"Hoàng thượng đặt chiếc nhẫn vào tay ngươi: “Của nàng thì nàng giữ.”",rf:"Hoàng thượng bảo: “Để trẫm giữ cho nàng.”"}]},
 x1:{h:"Lời đồn đến tai Hoàng thượng",w:"emp",t:"Lời đồn về túi gấm đến tai Hoàng thượng qua miệng người khác. Đêm ấy ngài không mang theo ai, đến thẳng cung ngươi: “Nàng có gì muốn nói với trẫm?”",o:[
  {n:"Kể hết chuyện lời thề trước lửa thánh, xin ngài định",e:["win","lose"],rt:"Hoàng thượng nghe đến cuối: “Người {land} thề trước lửa thì giữ. Trẫm cũng vậy.” Ngài ở lại đến sáng.",rf:"Hoàng thượng nghe xong, đứng dậy đi ra, không nói một lời."},
  {n:"Thưa: chỉ là chuyện cũ ở quê nhà, đã qua rồi",e:["win","mid"],rt:"Hoàng thượng cười: “Chuyện cũ thì để nó cũ.”",rf:"Hoàng thượng gật đầu, nhưng không cười."},
  {n:"Quỳ xuống, không nói",e:"mid",lx:"ngài không biết ngươi nghĩ gì",rt:"Hoàng thượng đỡ ngươi dậy, rồi đi."}]}},
 E:{win:{tag:"Hoàng thượng không nghi",w:"emp",t:"Hoàng thượng không nghi. Chiếc nhẫn nằm đâu thì nằm, lời đồn về túi gấm tắt dần."},
  mid:{tag:"Chiếc nhẫn nằm im",t:"Chiếc nhẫn nằm im. Lời đồn cũng nằm im, chờ ai đó khơi lại."},
  lose:{tag:"Hoàng thượng để tâm",w:"emp",t:"Hoàng thượng để tâm. Tên Mật Hồ Đạt được ghi vào sổ của thị vệ, và đêm nào cũng có người đứng ngoài Hội Đồng quán."}}});

/* .6 Kết nghĩa — a sworn brotherhood before the court turns the old oath into something speakable [emp, v] */
rdDef("bd_hen",6,{t:"Kết nghĩa",w:"emp",sj:"lễ kết nghĩa trước triều",cast(A){return rdCast(A,["v"])},
 g:"Chánh sứ {land} dâng lời: để công chúa và Mật Hồ Đạt kết nghĩa huynh muội trước triều, theo tục {land} thề trước lửa, thì lời thề cũ thành lời có thể nói ra, và lời đồn hết chỗ đứng.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng hỏi ý",w:"emp",if:RDW(1),t:"Hoàng thượng đọc lời của chánh sứ, rồi hỏi ngươi: “Kết nghĩa thì trẫm cho. Nàng muốn không?”",o:[
  {n:"Thưa: thần thiếp muốn, xin bệ hạ chứng",f:"nghia",wx:"lời thề cũ thành nghĩa mới",lx:"chàng phải thôi chờ",rt:"Hoàng thượng gật đầu: “Trẫm chứng.”"},
  {n:"Thưa: lời thề cũ không đổi được, xin bệ hạ đừng ép",f:"tinh",wx:"ngươi giữ lời với chàng",lx:"Hoàng thượng nghe ra ngươi còn thương",rt:"Hoàng thượng im lặng, rồi bảo: “Thế thì để đó.”",rf:"Hoàng thượng đứng dậy: “Nàng nói thật quá.”"},
  {n:"Thưa: xin kết nghĩa, và xin chàng làm thị vệ của cung thần thiếp",f:"uy",wx:"chàng thành người của ngươi trong kinh",lx:"triều thần nói ngươi giữ đàn ông bên mình",rt:"Hoàng thượng do dự rồi chuẩn: Mật Hồ Đạt nhận đai thị vệ.",rf:"Hoàng thượng lắc đầu: “Kết nghĩa thì được. Thị vệ thì không.”"}]},
 s2:{h:"Lời đồn đến triều",w:"emp",if:RDW(0),t:"Lời đồn đã đến triều; có Ngự sử dâng sớ hỏi. Chánh sứ {land} xin kết nghĩa để dập lời đồn. Hoàng thượng chưa trả lời, chờ ngươi.",o:[
  {n:"Thưa: thần thiếp xin kết nghĩa để rửa tiếng",f:"nghia",wx:"lời đồn hết chỗ đứng",lx:"chàng phải thôi chờ",rt:"Hoàng thượng chuẩn, sai Lễ bộ định ngày."},
  {n:"Xin Hoàng thượng đuổi chàng về {land}",f:"phan",wx:"không còn gì để đồn",lx:"chàng nhớ ngươi đã đuổi",rt:"Hoàng thượng ngạc nhiên: “Nàng nỡ sao?” rồi bảo để xét.",rf:"Chánh sứ {land} xin cho chàng ở lại đến hết việc nghị."},
  {n:"Không đáp, chờ lời đồn tự tắt",wx:"không ai nói ngươi vội",lx:"lời đồn chưa tắt",rt:"Ngươi không đáp; Hoàng thượng gác việc kết nghĩa."}]},
 c1:{h:"Ai chủ lễ",w:"emp",t:"Lễ bộ hỏi: lễ kết nghĩa theo tục {land}, ai chủ lễ? Hoàng thượng, Thái hậu, hay chánh sứ {land}?",o:[
  {n:"Xin Hoàng thượng chủ lễ",f:"that",wx:"lễ có uy",lx:"Hoàng thượng phải đứng ra",rt:"Hoàng thượng nhận chủ lễ."},
  {n:"Xin Thái hậu chủ lễ",f:"nghia",need:["th"],wx:"hậu cung thấy lễ đúng phép",lx:"Thái hậu không ưa tục ngoại",rt:"Thái hậu nhận, dặn: “Làm cho gọn.”",rf:"Thái hậu từ chối: “Tục thờ lửa, ai gia không chủ.”"},
  {n:"Xin để chánh sứ {land} chủ lễ",f:"tinh",wx:"lễ đúng tục quê nhà",lx:"triều thần thấy lễ là của người ngoài",rt:"Chánh sứ thắp một ngọn lửa nhỏ, rót rượu nho vào bát bạc."}]},
 c2:{h:"{v} nói kết nghĩa là bình phong",w:"v",need:["v"],t:"{v} nói với các phi tần: “Kết nghĩa là bình phong. Ở {land}, anh nuôi em nuôi lấy nhau là chuyện thường.”",o:[
  {n:"Mời Lễ bộ giảng tục kết nghĩa trước các phi tần",f:"that",wx:"lời {v} thành lời bịa",lx:"phải đợi Lễ bộ",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Lễ bộ giảng: nghĩa huynh muội thề trước lửa của người {land} còn nặng hơn ruột thịt.",rf:"Lễ bộ giảng lửng lơ; lời {v} ở lại."},
  {n:"Đem chuyện anh họ {v} qua lại nhà ca kỹ ra nói",f:"uy",wx:"{v} phải im",lx:"hai cung thành thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt, không nói nữa.",rf:"Không ai tin chuyện ấy; {v} cười."},
  {n:"Im lặng",wx:"không lỡ lời",lx:"lời {v} lan",rt:"Ngươi không đáp."}]},
 t1:{h:"Vật kết nghĩa",w:"me",t:"Theo tục, kết nghĩa phải trao vật. Chàng có con dao đeo lưng của cha để lại; ngươi có chiếc trâm bạc của {mh}.",o:[
  {n:"Trao trâm bạc, nhận con dao",f:"nghia",wx:"hai vật nặng như nhau",lx:"trâm của {mh} theo người đi",go:()=>{bdO("dao","ta");bdO("tram","phong")},rt:"Con dao của chàng nằm trong hộp gỗ trầm của ngươi; chiếc trâm bạc theo chàng về Hội Đồng quán."},
  {n:"Trao một tấm khăn thêu, giữ trâm lại",f:"phan",go:()=>{bdO("khan","phong");bdO("tram","ta")},wx:"vật của {mh} còn ở với ngươi",lx:"chàng biết ngươi giữ khoảng cách",rt:"Chàng nhận khăn thêu, cúi đầu."},
  {n:"Trao trâm bạc, không nhận dao",f:"tinh",go:()=>bdO("tram","phong"),wx:"chàng có vật của ngươi",lx:"ngươi không có gì của chàng",rt:"Chàng cầm chiếc trâm rất lâu."}]},
 x1:{h:"Bát rượu kết nghĩa",w:"emp",t:"Ngày lễ, trước Thái hòa điện, một ngọn lửa nhỏ và bát rượu nho đặt giữa hai người. Uống thì thành huynh muội; không uống thì lời thề cũ còn nguyên, cả triều sẽ nhớ.",o:[
  {n:"Uống bát rượu kết nghĩa trước Hoàng thượng",e:["win","lose"],go:(_A,ok)=>{if(ok)bdO("daingoc","phong")},rt:"Hai người uống cạn bát rượu. Hoàng thượng ban cho Mật Hồ Đạt một đai ngọc: “Nghĩa huynh của ái phi.”",rf:"Rượu đổ một nửa; triều thần xì xào điềm xấu."},
  {n:"Xin hoãn lễ đến khi việc nghị xong",e:["win","mid"],rt:"Hoàng thượng chuẩn; lễ kết nghĩa để đến cuối mùa.",rf:"Hoãn lễ thành ra một lời ai cũng bàn."},
  {n:"Thưa: thần thiếp không uống",e:"mid",lx:"cả triều nhớ ngươi không uống",rt:"Bát rượu được dọn đi."}]}},
 E:{win:{tag:"Nghĩa huynh trước triều",w:"emp",t:"Mật Hồ Đạt thành nghĩa huynh của ngươi trước cả triều. Lời đồn không còn chỗ đứng; người ta gọi chàng là cữu gia {land}.",go:()=>{RD_FL("bd_hen.nghia",1)}},
  mid:{tag:"Chưa thành nghĩa, chưa dứt tình",t:"Lễ kết nghĩa chưa thành. Lời thề cũ vẫn là lời thề cũ."},
  lose:{tag:"Lời đồn thành tiếng",w:"emp",t:"Lễ hỏng, lời đồn lan khắp nơi, không ai ngăn nổi. Ngự sử ghi tên ngươi và tên chàng vào cùng một tờ sớ."}}});

/* .7 Trận đấu vật — {v}'s house sets a trap at the wrestling before the Emperor; a man dies [emp, v] */
rdDef("bd_hen",7,{t:"Trận đấu vật",w:"emp",sj:"cái chết ở sân vật",cast(A){return rdCast(A,["v"])},
 g:"Hội đấu vật mừng sứ đoàn trước điện. Nhà {v} đưa ra một dũng sĩ của phủ mình đấu với Mật Hồ Đạt. Hiệp thứ ba, dũng sĩ ngã xuống và không dậy nữa. Người ta nói Mật Hồ Đạt ra đòn chết người. Trước hiệp đấu, quản sự nhà {v} đã đưa cho dũng sĩ một chén rượu.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếc chén còn trên bàn",w:"emp",if:RDW(1),t:"Ngươi ngồi gần sân vật, thấy rõ chiếc chén quản sự nhà {v} đưa còn nằm trên bàn, đáy chén có cặn đen.",o:[
  {n:"Sai cung nữ lặng lẽ giữ lấy chiếc chén",f:"le",wx:"chứng cớ nằm trong tay ngươi",lx:"nếu bị thấy, ngươi thành người giấu vật chứng",go:(_A,ok)=>{if(ok)bdO("chen","ta")},rt:"Cung nữ của ngươi giấu chiếc chén vào tay áo trước khi bàn được dọn.",rf:"Thái giám dọn bàn nhanh hơn; chiếc chén đã rửa."},
  {n:"Đứng dậy tâu ngay: xin xem chén rượu",f:"that",wx:"cả điện nhìn chiếc chén",lx:"nhà {v} biết ngươi đã thấy",go:(_A,ok)=>{if(ok)bdO("chen","dly")},rt:"Hoàng thượng sai giữ chén. Quản sự nhà {v} tái mặt.",rf:"Chén đã bị đổ; Hoàng thượng hỏi sao ngươi để ý chén của dũng sĩ."},
  {n:"Ngồi yên, chờ xem",f:"phan",wx:"không ai thấy ngươi dính vào",lx:"chiếc chén có thể mất",rt:"Ngươi ngồi yên; chiếc chén được dọn đi cùng mọi chén khác."}]},
 s2:{h:"Ngươi ngồi xa sân vật",w:"emp",if:RDW(0),t:"Từ sau lời đồn, ngươi được xếp ngồi xa sân vật. Khi dũng sĩ ngã, ngươi chỉ thấy người ta khiêng đi, và thấy Mật Hồ Đạt bị trói.",o:[
  {n:"Xin Hoàng thượng cho thái y khám thi thể",f:"le",wx:"có người xem cái chết",lx:"người ta hỏi sao ngươi lo",rt:"Hoàng thượng sai thái y khám."},
  {n:"Xin Hoàng thượng đừng xử vội",f:"nghia",wx:"chàng còn được xét",lx:"ngươi lộ lòng",rt:"Hoàng thượng gật đầu: “Đại Lý tự xét.”",rf:"Hoàng thượng nhìn ngươi lâu."},
  {n:"Đứng xa, không dính",f:"phan",wx:"không ai nói ngươi bênh",lx:"chàng một mình",rt:"Ngươi về cung trước khi tiệc tan."}]},
 c1:{h:"Thái y khám thi thể",w:"maid",t:"Thái y khám thi thể dũng sĩ: môi thâm, móng tay tím. Ông hỏi khẽ người của ngươi: có ai giữ được chén rượu không?",o:[
  {n:"Giao chiếc chén cho thái y",f:"le",if:()=>bdO("chen")==="ta",wx:"thái y có chứng",lx:"chén không còn trong tay ngươi",go:()=>bdO("chen","thaiy"),rt:"Thái y thử cặn chén: có độc. Ông ghi vào sổ thái y viện."},
  {n:"Xin thái y ghi thật điều ông thấy",f:"that",wx:"sổ thái y có dòng chữ thật",lx:"thái y sợ nhà {v}",rt:"Thái y ghi: chết vì độc, không vì đòn.",rf:"Thái y ghi: chết vì đòn đánh vào ngực."},
  {n:"Đưa bạc cho thái y viết như ngươi muốn",f:"uy",wx:"sổ thái y nghiêng về chàng",lx:"bạc trong sổ thái y là một tội",rt:"Thái y nhận bạc, ghi: chết vì độc.",rf:"Thái y không nhận, còn kể lại với viện phán."}]},
 c2:{h:"{v} khóc trước Thái hậu",w:"v",need:["v"],t:"{v} khóc trước Thái hậu: dũng sĩ nhà mình chết dưới tay người {land}, mà người {land} ấy lại là người của cung ngươi.",o:[
  {n:"Chỉ ra quản sự nhà {v} đã đưa chén rượu",f:"uy",wx:"nước mắt {v} thành câu hỏi",lx:"hai nhà thành thù",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Thái hậu hỏi {v}: “Quản sự nhà ngươi đưa chén gì?” {v} không đáp được.",rf:"Thái hậu gạt đi: “Không có chứng thì đừng nói.”"},
  {n:"Đến phủ dũng sĩ viếng tang, gửi bạc cho vợ con",f:"an",wx:"người ta thấy lòng ngươi",lx:"{v} nói ngươi mua miệng",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Vợ dũng sĩ nhận bạc, khóc: “Chồng thiếp uống rượu xong thì kêu đau bụng.”"},
  {n:"Im lặng chờ Đại Lý tự",wx:"không thêm lời",lx:"nước mắt {v} ở lại",rt:"Ngươi không nói gì."}]},
 t1:{h:"Lời nhắn từ quán sứ",w:"maid",t:"Mật Hồ Đạt nhắn ra từ chỗ bị giữ ở quán sứ: “Ta không giết hắn. Hắn ngã trước khi ta ra đòn.”",o:[
  {n:"Nhắn lại: ta tin, ta sẽ tìm chứng",f:"nghia",wx:"chàng có người tin",lx:"ngươi buộc mình vào vụ án",rt:"Lời ngươi đến tay chàng qua người hầu quán sứ."},
  {n:"Nhắn lại: nhận lỗi, xin Hoàng thượng khoan hồng",f:"phan",wx:"vụ án xong sớm",lx:"chàng nhận tội không phải của mình",rt:"Chàng không hồi âm."},
  {n:"Tâu với Hoàng thượng: người {land} nóng tính, xin xử nghiêm",f:"uy",wx:"không ai còn nói ngươi bênh chàng",lx:"ngươi bỏ chàng để giữ mình",rt:"Hoàng thượng nhìn ngươi, gật đầu chậm.",rf:"Hoàng thượng hỏi: “Nàng không thương người cùng tiếng sao?”"}]},
 x1:{h:"Hoàng thượng xét chuyện sân vật",w:"emp",t:"Hoàng thượng gọi Đại Lý tự, nhà {v} và chánh sứ {land} đến trước điện. Trước khi phán, ngài hỏi ngươi: “Nàng đã ngồi đó. Nàng nói đi.”",o:[
  {n:"Tâu: xin tra chén rượu trước khi xử người",e:["win","lose"],rt:"Đại Lý tự tra chén rượu: có độc. Quản sự nhà {v} bị bắt; Mật Hồ Đạt được tha tội giết người.",rf:"Chén rượu không còn; Đại Lý tự cho là ngươi bênh người {land}."},
  {n:"Tâu: chết trên sân vật là rủi, xin xử theo luật đấu vật",e:["win","mid"],rt:"Hoàng thượng chuẩn: chết trên sân vật không thành tội giết người.",rf:"Hoàng thượng chuẩn, nhưng nhà {v} không chịu."},
  {n:"Thưa: việc ấy xin để Đại Lý tự",e:"mid",lx:"chàng một mình",rt:"Hoàng thượng giao Đại Lý tự."}]}},
 E:{win:{tag:"Chén rượu lên tiếng",w:"emp",t:"Chén rượu lên tiếng thay người chết. Nhà {v} mất một quản sự, Mật Hồ Đạt thoát tội, và hậu cung biết ai đã đặt cái bẫy.",go:()=>{RD_FL("bd_hen.ban",1);if(bdO("chen"))bdO("chen","dly")}},
  mid:{tag:"Án treo",t:"Án treo. Không ai bị kết tội, không ai được rửa tiếng. Mật Hồ Đạt bị giữ ở quán sứ."},
  lose:{tag:"Chàng bị nghi giết người",w:"emp",t:"Mật Hồ Đạt bị nghi giết người trước điện. Nhà {v} đòi đền mạng, và tên ngươi đứng ngay sau tên chàng.",go:()=>{RD_FL("bd_hen.nghi",1)}}}});

/* .8 Lá thư bị chặn — a letter in steppe script is seized at the gate [emp, v, maid] */
rdDef("bd_hen",8,{t:"Lá thư bị chặn",w:"emp",sj:"lá thư chữ {land}",cast(A){return rdCast(A,["v"])},
 g:"Lính gác cửa Đông Hoa bắt được một lá thư viết bằng chữ {land} giấu trong giỏ quả gửi vào cung ngươi. Thông dịch Tứ Di quán dịch ra: lời hẹn bỏ trốn. Thư được đưa sang Đại Lý tự.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bản dịch sai",w:"emp",if:RDW(1),t:"Ngươi được xem bản sao: nét chữ đúng là của chàng, nhưng chàng viết “đợi nàng trước lửa”, còn bản dịch ghi “đợi nàng ở cửa Tây”. Người dịch là thông dịch Tứ Di quán, người nhà của {v}.",o:[
  {n:"Xin đọc nguyên văn trước Hoàng thượng",f:"that",wx:"Hoàng thượng nghe lời thật",lx:"ngươi tự nhận đọc thư của chàng",rt:"Ngươi đọc từng chữ; Hoàng thượng sai người dịch lại.",rf:"Hoàng thượng hỏi: “Nàng đọc thư y quen tay quá.”"},
  {n:"Xin Hồng Lô tự cử người dịch lại",f:"le",wx:"có người dịch không phe phái",lx:"chậm",rt:"Thông dịch Hồng Lô tự dịch lại: “đợi nàng trước lửa”, lời của một người nhớ quê."},
  {n:"Nhận là thư cũ, xin xét lòng chứ đừng xét chữ",f:"tinh",wx:"không ai nói ngươi chối",lx:"thư cũ vẫn là thư",rt:"Hoàng thượng thở dài: “Lòng thì trẫm không xét được.”"}]},
 s2:{h:"Lá thư thật",w:"emp",if:RDW(0),t:"Lá thư là thật: chàng viết “đêm rằm, cửa Tây, ngựa đã sẵn”. Chàng muốn đưa ngươi theo đường tơ lụa về {land}. Bản sao còn một tờ trong cung ngươi, cung nữ chưa kịp đốt.",o:[
  {n:"Đốt tờ thư trong cung trước khi bị khám",f:"uy",wx:"không còn chứng trong cung",lx:"đốt thư là nhận có thư",go:(_A,ok)=>{if(ok)bdO("thu","dot")},rt:"Tờ thư cháy trong lò sưởi trước khi người Đại Lý tự đến.",rf:"Người Đại Lý tự đến khi tờ thư còn cháy dở."},
  {n:"Tự mang thư đến Hoàng thượng, xin chịu tội",f:"that",wx:"Hoàng thượng thấy ngươi không trốn",lx:"tội ngươi nằm trên giấy",go:()=>bdO("thu","vua"),rt:"Hoàng thượng đọc xong, im lặng rất lâu: “Nàng không đi. Trẫm nhớ.”",rf:"Hoàng thượng đặt thư xuống: “Nàng để trẫm nghĩ.”"},
  {n:"Tâu: thư giả, có người bắt chước nét chữ",f:"tinh",wx:"thư thành nghi án",lx:"nếu lộ, ngươi khi quân",rt:"Đại Lý tự cho so nét chữ, không kết luận được.",rf:"Đại Lý tự so nét chữ: đúng là chữ chàng."}]},
 c1:{h:"Cung nữ nhận giỏ quả bị bắt",w:"maid",t:"Cung nữ nhận giỏ quả ở cửa Đông Hoa bị Thận hình ty giữ lại tra hỏi.",o:[
  {n:"Đến Thận hình ty nhận nàng là người của ngươi",f:"an",wx:"cung nữ được tha",lx:"ngươi đứng ra trước mọi người",rt:"Thận hình ty thả cung nữ về cung ngươi.",rf:"Thận hình ty giữ cả hai ngày mới thả."},
  {n:"Để nàng tự chịu",f:"uy",wx:"ngươi không dính vào",lx:"cung nữ biết ngươi bỏ mình",rt:"Cung nữ bị đánh mười trượng rồi được thả."},
  {n:"Đưa bạc cho ngục tốt Thận hình ty",f:"uy",wx:"cung nữ đỡ đòn",lx:"bạc trong ngục ai cũng biết",rt:"Ngục tốt nhận bạc, cho cung nữ ngồi chỗ ấm."}]},
 c2:{h:"Thông dịch nhà {v}",w:"v",need:["v"],t:"Thông dịch Tứ Di quán là người nhà {v}. Lời dịch của y đã đi khắp hậu cung trước cả khi đến Đại Lý tự.",o:[
  {n:"Xin cho thông dịch đối chất trước Đại Lý tự",f:"le",wx:"lời dịch phải đứng trước luật",lx:"nhà {v} có người đỡ",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Thông dịch run tay khi đọc lại nguyên văn.",rf:"Thông dịch đọc trơn tru; không ai bắt được lỗi."},
  {n:"Cho người chặn thư nhà {v} gửi ra ngoài",f:"uy",wx:"ngươi cũng có thư của nhà {v}",lx:"ngươi làm đúng điều {v} làm",go:(A,ok,G)=>{rdOan(A,"v",G[0]);if(ok)bdO("thuv","ta")},rt:"Người của ngươi chặn được thư {v} gửi anh họ: dặn thông dịch “dịch cho khéo”.",rf:"Thư nhà {v} không có gì."},
  {n:"Im lặng",wx:"không thêm thù",lx:"lời dịch ở lại",rt:"Ngươi không làm gì."}]},
 t1:{h:"Thư hồi chưa gửi",w:"me",t:"Trong hộp trang sức của ngươi còn một lá thư hồi viết dở, chưa gửi. Nếu Đại Lý tự khám cung, lá thư ấy sẽ nói thay ngươi.",o:[
  {n:"Đốt thư hồi",f:"phan",go:()=>bdO("thuhoi","dot"),wx:"không còn chứng",lx:"lời chưa nói thành tro",rt:"Lá thư hồi cháy, không ai đọc."},
  {n:"Gửi thư hồi qua sứ đoàn",f:"tinh",go:(_A,ok)=>bdO("thuhoi",ok?"phong":"dly"),wx:"chàng biết lòng ngươi",lx:"thêm một lá thư để chặn",rt:"Lá thư theo chánh sứ ra Hội Đồng quán.",rf:"Thư bị chặn ở cửa Đông Hoa lần nữa."},
  {n:"Đưa thư hồi cho Hoàng thượng",f:"that",go:()=>bdO("thuhoi","vua"),wx:"Hoàng thượng thấy ngươi viết gì",lx:"không còn gì riêng",rt:"Hoàng thượng đọc: “Ta ở lại. Chàng về đi.” Ngài gấp thư, cất vào tay áo."}]},
 x1:{h:"Đại Lý tự trình thư",w:"emp",t:"Đại Lý tự trình lá thư lên Hoàng thượng. Mật Hồ Đạt bị gọi đến đứng cuối điện. Hoàng thượng hỏi ngươi trước, rồi mới hỏi chàng.",o:[
  {n:"Tâu: xin đọc nguyên văn trước điện, để chữ tự nói",e:["win","lose"],rt:"Nguyên văn được đọc; lời hẹn bỏ trốn không có trong thư. Hoàng thượng phạt thông dịch Tứ Di quán.",rf:"Nguyên văn được đọc, nhưng lời trong thư đủ để người ta nghi."},
  {n:"Tâu: thần thiếp xin chịu tội, xin tha cho người viết",e:["win","mid"],rt:"Hoàng thượng phạt bổng lộc của ngươi, tha cho chàng tội đưa thư.",rf:"Hoàng thượng phạt ngươi, chàng vẫn bị giữ."},
  {n:"Im lặng",e:"mid",lx:"chàng một mình đứng cuối điện",rt:"Ngươi im lặng; Hoàng thượng hỏi chàng."}]}},
 E:{win:{tag:"Bản dịch bị lật",w:"emp",t:"Bản dịch bị lật trước điện. Lá thư về tay Hoàng thượng, và Tứ Di quán mất một thông dịch.",go:()=>{bdO("thu","vua")}},
  mid:{tag:"Thư nằm ở Đại Lý tự",t:"Lá thư nằm ở Đại Lý tự, chờ ngày xét. Không ai nhắc, cũng không ai quên.",go:()=>{if(bdO("thu")!=="dot")bdO("thu","dly")}},
  lose:{tag:"Lá thư thành tội",w:"emp",t:"Lá thư thành tội. Đại Lý tự giữ thư, giữ cả tên ngươi và tên chàng.",go:()=>{if(bdO("thu")!=="dot")bdO("thu","dly");RD_FL("bd_hen.nghi",1)}}}});

/* .9 Ngục Đại Lý tự — Phong is jailed; the hearing day [emp, maid, v] */
rdDef("bd_hen",9,{t:"Ngục Đại Lý tự",w:"emp",sj:"phiên thẩm ở Đại Lý tự",cast(A){return rdCast(A,["v"])},
 g:"Mật Hồ Đạt bị giải vào ngục Đại Lý tự. Chánh sứ {land} đòi người theo lệ sứ thần; nhà {v} đòi đền mạng. Ngày thẩm đã định.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Giam vì lời đồn",w:"emp",if:RDW(1),t:"Tội nặng đã được gỡ, nhưng triều thần cần một người để chịu lời đồn. Mật Hồ Đạt bị giam “để xét cho rõ”.",o:[
  {n:"Sai cung nữ mang cơm và một lời vào ngục",f:"tinh",wx:"chàng biết ngươi không bỏ",lx:"người ngục biết ngươi gửi",go:()=>bdMove("phong","nguc"),rt:"Cung nữ về kể: chàng ăn hết bát cơm, chỉ hỏi ngươi có khỏe không."},
  {n:"Tìm thái y đã khám thi thể, xin ông làm chứng",f:"le",wx:"có chứng nhân trước phiên thẩm",lx:"thái y sợ",go:()=>bdMove("phong","nguc"),rt:"Thái y nhận làm chứng.",rf:"Thái y cáo ốm."},
  {n:"Nhắn chánh sứ đòi người theo hòa ước",f:"nghia",wx:"chàng có lệ sứ thần che",lx:"việc riêng thành việc hai nước",go:()=>bdMove("phong","nguc"),rt:"Chánh sứ dâng quốc thư đòi người."}]},
 s2:{h:"Giam vì hai tội",w:"emp",if:RDW(0),t:"Tội giết người ở sân vật, tội đưa thư vào cung: hai tội chồng lên nhau. Đại Lý tự cho giam chàng ở ngục trong cùng.",o:[
  {n:"Sai cung nữ mang cơm và một lời vào ngục",f:"tinh",wx:"chàng biết ngươi không bỏ",lx:"người ngục biết ngươi gửi",go:()=>bdMove("phong","nguc"),rt:"Cung nữ về kể: chàng gầy đi, nhưng mắt vẫn sáng."},
  {n:"Tìm thái y đã khám thi thể, xin ông làm chứng",f:"le",wx:"có chứng nhân trước phiên thẩm",lx:"thái y sợ",go:()=>bdMove("phong","nguc"),rt:"Thái y nhận làm chứng.",rf:"Thái y cáo ốm."},
  {n:"Nhắn chánh sứ: cứ để Đại Hy xử",f:"phan",wx:"việc không thành việc hai nước",lx:"chàng biết ngươi buông",go:()=>bdMove("phong","nguc"),rt:"Chánh sứ thôi đòi người."}]},
 c1:{h:"Ngục tốt đòi bạc",w:"maid",t:"Ngục tốt Đại Lý tự nói với cung nữ của ngươi: muốn cơm vào đến tay người trong ngục, phải có bạc.",o:[
  {n:"Đưa bạc cho ngục tốt",f:"uy",wx:"cơm đến tay chàng",lx:"bạc trong ngục ai cũng biết",rt:"Từ hôm ấy, cơm của cung ngươi vào ngục mỗi ngày."},
  {n:"Báo ngục tốt lên quan Đại Lý tự",f:"le",wx:"ngục tốt bị phạt",lx:"cả ngục ghét người của ngươi",rt:"Ngục tốt bị đánh trượng; cơm vào ngục đúng lệ.",rf:"Quan Đại Lý tự bênh ngục tốt."},
  {n:"Thôi gửi cơm",f:"phan",wx:"không ai thấy người của ngươi ở ngục",lx:"chàng đói",rt:"Cung nữ của ngươi thôi đến ngục."}]},
 c2:{h:"{v} tâu ngươi qua lại ngục",w:"v",need:["v"],t:"{v} tâu với Hoàng hậu: “Ngày nào cũng có người cung ấy ra vào ngục Đại Lý tự.”",o:[
  {n:"Tâu lại: quản sự nhà {v} cũng nằm trong ngục ấy",f:"uy",wx:"lời tâu đổi chiều",lx:"hai cung thành thù",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng hậu hỏi {v} về quản sự nhà mình; {v} lui ra.",rf:"Hoàng hậu bảo cả hai im."},
  {n:"Thôi sai người đến ngục",f:"phan",wx:"lời tâu hết chỗ bám",lx:"chàng một mình",rt:"Người của ngươi thôi đến ngục."},
  {n:"Thưa thật: cơm cho người cùng tiếng",f:"that",wx:"Hoàng hậu thấy ngươi không giấu",lx:"ai cũng biết ngươi lo cho chàng",rt:"Hoàng hậu gật đầu: “Cơm thì được.”",rf:"Hoàng hậu cau mày: “Muội muội nên biết giữ.”"}]},
 t1:{h:"Lời khai của ngươi",w:"emp",t:"Đại Lý tự xin lời khai của ngươi, viết tay, đóng dấu cung.",o:[
  {n:"Khai thật: từng đính ước, không có tư tình",f:"that",wx:"lời khai sạch",lx:"chữ “đính ước” nằm trong hồ sơ",rt:"Lời khai của ngươi được đọc trong phiên thẩm."},
  {n:"Khai: không quen biết người ấy",f:"uy",wx:"ngươi đứng ngoài vụ án",lx:"nếu chàng khai khác, ngươi khi quân",rt:"Lời khai ghi: không quen.",rf:"Chàng khai: “Ta biết nàng từ thuở nhỏ.” Lời khai của ngươi thành lời dối."},
  {n:"Khai: chàng là nghĩa huynh, ngươi xin bảo lãnh",f:"nghia",wx:"chàng có người bảo lãnh",lx:"ngươi buộc mình vào án",rt:"Đại Lý tự ghi: có người bảo lãnh."}]},
 x1:{h:"Phiên thẩm thứ nhất",w:"emp",t:"Phiên thẩm thứ nhất ở Đại Lý tự. Hoàng thượng không đến, nhưng sai người mang lời: nếu ái phi có gì muốn nói, hãy nói trong phiên này.",o:[
  {n:"Xin cho thái y làm chứng về chén rượu",e:["win","lose"],rt:"Thái y khai: dũng sĩ chết vì độc. Tội giết người được gỡ.",rf:"Thái y khai lúng túng; phiên thẩm nghiêng về tội."},
  {n:"Xin giao chàng cho sứ đoàn xử theo luật {land}",e:["win","mid"],rt:"Đại Lý tự tâu lên; Hoàng thượng chuẩn giao người cho chánh sứ giữ.",rf:"Đại Lý tự không chuẩn; án chờ phiên sau."},
  {n:"Không gửi lời nào",e:"mid",lx:"phiên thẩm không có tiếng ngươi",rt:"Phiên thẩm kết thúc, chờ phiên sau."}]}},
 E:{win:{tag:"Phiên thẩm nghiêng về chàng",w:"emp",t:"Phiên thẩm nghiêng về chàng. Chỉ còn một phiên xử nữa, và nhà {v} biết mình sắp thua."},
  mid:{tag:"Án chờ phiên sau",t:"Án chờ phiên sau. Chàng ở lại ngục thêm một mùa trăng."},
  lose:{tag:"Phiên thẩm nghiêng về tội",w:"emp",t:"Phiên thẩm nghiêng về tội. Đại Lý tự định ngày xử, và người ta bắt đầu nói đến chữ “trảm”."}}});

/* .10 Đêm trước phiên xử — plead, prove, or open the cell [emp, v] */
rdDef("bd_hen",10,{t:"Đêm trước phiên xử",w:"emp",sj:"phiên xử Mật Hồ Đạt",cast(A){return rdCast(A,["v"])},/*bd6b: .9 puts him in Đại Lý tự on every opening option, so all of .10 has him in the cell*/
 g:"Sáng mai Đại Lý tự xử Mật Hồ Đạt. Đêm nay là đêm cuối ngươi còn làm được một điều: quỳ xin, đưa chứng cớ, hay mở cửa ngục.",/*bd6b: in the cell (.9)*/
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một chứng cớ còn thiếu",w:"emp",if:RDW(1),t:"Phiên thẩm nghiêng về chàng, chỉ thiếu một người: quản sự nhà {v}, kẻ đã đưa chén rượu. Y đang trốn trong phủ ngoại của {v}.",o:[
  {n:"Xin Hoàng thượng sai cấm quân bắt quản sự",f:"le",wx:"chứng nhân đến trước phiên xử",lx:"nhà {v} có người báo trước",rt:"Cấm quân bắt được quản sự lúc canh ba.",rf:"Quản sự đã trốn khỏi phủ."},
  {n:"Sai người dụ quản sự ra khai, hứa tha tội",f:"an",wx:"quản sự tự khai",lx:"hứa tha là hứa thay luật",rt:"Quản sự đến Đại Lý tự trước bình minh.",rf:"Quản sự không tin lời hứa."},
  {n:"Mua chuộc ngục tốt, mở cửa ngục đêm nay",f:"uy",wx:"chàng không phải chờ phiên xử",lx:"mở ngục là tội lớn hơn mọi tội",go:(_A,ok)=>{if(ok)RD_FL("bd_hen.mo",1)},rt:"Ngục tốt nhận bạc, hẹn canh tư.",rf:"Ngục tốt nhận bạc rồi báo lên."}]},/*bd6c: silver, the option's Bạc cost*/
 s2:{h:"Phiên xử nghiêng về tội",w:"emp",if:RDW(0),t:"Phiên thẩm nghiêng về tội; Đại Lý tự đã viết sẵn chữ “trảm”, chỉ chờ Hoàng thượng phê.",o:[
  {n:"Quỳ trước Dưỡng Tâm điện xin Hoàng thượng",f:"that",wx:"Hoàng thượng thấy ngươi",lx:"cả cung thấy ngươi quỳ vì một người đàn ông",rt:"Hoàng thượng mở cửa lúc nửa đêm: “Đứng lên. Trẫm nghe.”",rf:"Cửa điện không mở; ngươi quỳ đến sáng."},
  {n:"Sai người dụ quản sự nhà {v} ra khai",f:"an",wx:"có một chứng nhân",lx:"hứa tha là hứa thay luật",rt:"Quản sự đến Đại Lý tự trước bình minh.",rf:"Quản sự không tin lời hứa."},
  {n:"Mua chuộc ngục tốt, mở cửa ngục đêm nay",f:"uy",wx:"chàng không phải chờ phiên xử",lx:"mở ngục là tội lớn hơn mọi tội",go:(_A,ok)=>{if(ok)RD_FL("bd_hen.mo",1)},rt:"Ngục tốt nhận bạc, hẹn canh tư.",rf:"Ngục tốt nhận bạc rồi báo lên."}]},/*bd6c: silver, the option's Bạc cost*/
 c1:{h:"{v} đến cung ngươi",w:"v",need:["v"],t:"{v} đến cung ngươi lúc đêm: “Tỷ rút lời khai về chén rượu, muội rút đơn đòi đền mạng. Người của tỷ được về {land}.”",o:[
  {n:"Nhận lời {v}",f:"phan",wx:"chàng được về",lx:"quản sự nhà {v} thoát tội",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cười, đi ra. Sáng mai đơn đòi đền mạng sẽ được rút."},
  {n:"Từ chối: người chết cần một lời thật",f:"nghia",wx:"lời thật còn nguyên",lx:"{v} thành thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đứng dậy: “Tỷ tỷ sẽ hối.”"},
  {n:"Đưa ra thư {v} dặn thông dịch, đòi nàng ta rút đơn không điều kiện",f:"uy",wx:"{v} phải lùi",lx:"ngươi nắm thóp người, người nhớ mãi",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} tái mặt, rút đơn ngay đêm ấy.",rf:"{v} cười: “Thư ấy ai tin?”"}]},
 c2:{h:"Thái y viện phán",w:"maid",t:"Viện phán Thái y viện cho người báo: thái y làm chứng bị gọi đi khám bệnh ở ngoại thành đúng sáng mai.",o:[
  {n:"Xin Hoàng thượng giữ thái y ở lại kinh",f:"le",wx:"chứng nhân có mặt",lx:"Hoàng thượng biết ngươi lo đến đâu",rt:"Hoàng thượng truyền giữ thái y lại."},
  {n:"Sai người của ngươi theo hầu thái y đến tận Đại Lý tự",f:"an",wx:"thái y không bị chặn đường",lx:"người của ngươi bị thấy",rt:"Thái y đến Đại Lý tự cùng cung nữ của ngươi."},
  {n:"Để mặc",wx:"không thêm dấu",lx:"chứng nhân có thể vắng",rt:"Ngươi không làm gì."}]},
 t1:{h:"Ngựa ở cửa Tây",w:"emp",t:"Chánh sứ {land} nhắn: ngựa của sứ đoàn đã sẵn ở Kim Quang môn. Nếu sáng mai chàng được tha, hoặc nếu chàng ra được khỏi ngục, đoàn sẽ đi ngay.",o:[
  {n:"Nhắn: chờ ta ở cửa Tây",f:"tinh",wx:"ngươi giữ một đường đi",lx:"lời nhắn ấy là lời bỏ trốn",go:()=>{RD_FL("bd_hen.tay",1)},rt:"Chánh sứ nhận lời, không hỏi thêm."},
  {n:"Nhắn: đoàn cứ đi, đừng chờ ai",f:"phan",wx:"sứ đoàn không dính vào ngươi",lx:"chàng có thể ở lại một mình",rt:"Chánh sứ cúi đầu."},
  {n:"Nhắn: chờ lời phán, đi đúng lệ",f:"le",wx:"sứ đoàn giữ phép",lx:"chậm",rt:"Chánh sứ cho tháo yên ngựa."}]},
 x1:{h:"Canh tư",w:"emp",t:"Canh tư. Ngoài trời gió cuối đông thổi lạnh. Đây là lúc cuối ngươi còn làm được điều gì đó cho chàng.",o:[
  {n:"Tâu hết với Hoàng thượng, xin ngài phán",e:["win","lose"],rt:"Hoàng thượng nghe hết, phê lên án: “Tha.” Sáng ra Mật Hồ Đạt bước ra khỏi ngục Đại Lý tự.",rf:"Hoàng thượng nghe hết, rồi nói: “Luật là luật.”"},/*bd6b: in the cell (.9)*/
  {n:"Cho ngục tốt mở cửa, đưa chàng ra cửa Tây",if:()=>!!RD_FL("bd_hen.mo"),e:["win","lose"],rt:"Cửa ngục mở lúc canh tư; ngựa ở cửa Tây phi đi trước khi trời sáng.",rf:"Cửa ngục mở, nhưng lính tuần đến; tiếng chiêng báo động vang khắp kinh thành."},
  {n:"Chờ trời sáng",e:"mid",lx:"mọi việc tùy Đại Lý tự",rt:"Ngươi ngồi bên đèn đến sáng."}]}},
 E:{win:{tag:"Chàng ra khỏi ngục",w:"emp",t:"Mật Hồ Đạt ra khỏi ngục Đại Lý tự. Ngươi không thấy chàng, chỉ nghe tiếng vó ngựa về phía Hội Đồng quán.",go:()=>{bdMove("phong",RD_FL("bd_hen.mo")?"tn":"kinh")}},/*bd6b: leaves the cell here (bdMove)*/
  mid:{tag:"Án đày",t:"Đại Lý tự xử đày: Mật Hồ Đạt bị trục xuất về {land}, không bao giờ được vào kinh nữa.",go:()=>{bdMove("phong","tn")}},/*bd6b: leaves the cell here (bdMove tn)*/
  lose:{tag:"Tiếng chiêng trong ngục",w:"emp",t:"Đêm ấy ngục Đại Lý tự có tiếng chiêng báo động. Sáng ra người ta báo: Mật Hồ Đạt đã chết, ngực trúng tên của lính ngục. Nhà {v} rút đơn đòi đền mạng.",go:()=>{bdKill("phong");bdMove("phong","nguc")}}}});/*bd6b: dies in the cell here (bdKill)*/

/* .11 Lời thề sau cùng — the embassy leaves; with him, without him, or for him (road finale) [emp, v] */
rdDef("bd_hen",11,{t:"Lời thề sau cùng",w:"emp",sj:"lời thề trước lửa thánh",cast(A){return rdCast(A,["v"])},
 g:"Việc nghị đã xong; sứ đoàn {land} lên đường về tây theo con đường tơ lụa. Lời thề trước lửa thánh năm ấy, đến hôm nay phải có một câu trả lời: đi cùng chàng, ở lại không chàng, hay sống vì chàng. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","s3","s4"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chàng đi cùng sứ đoàn",w:"emp",if:()=>bdPh()&&RDW(1)()&&bdP("phong","w")==="kinh",t:"Mật Hồ Đạt được tha, sẽ đi cùng sứ đoàn. Trước khi đi, chàng xin được gặp ngươi một lần trước mặt Hoàng thượng.",o:[
  {n:"Xin Hoàng thượng cho chàng làm tướng giữ biên, nghĩa huynh của Đại Hy",f:"nghia",wx:"chàng có chỗ đứng ở cả hai nước",lx:"chàng phải thôi chờ ngươi",rt:"Hoàng thượng phong Mật Hồ Đạt làm Hữu vũ vệ tướng quân, giữ đường tơ lụa cho hai nước.",rf:"Hoàng thượng bảo: “Tướng của {land} thì để {quan} phong.”"},
  {n:"Trả lại chiếc nhẫn, chúc chàng bình an",f:"phan",if:()=>bdO("da")==="ta",wx:"lời thề được trả trọn",lx:"chàng đi mà không mang lời nào của ngươi",go:()=>{if(bdO("da")==="ta")bdO("da","tra")},rt:"Chàng nhận chiếc nhẫn, đặt lên ngực, cúi đầu rất thấp."},
  {n:"Nhắn chàng chờ ở cửa Tây",f:"tinh",wx:"lời thề còn sống",lx:"đó là lời bỏ trốn",go:()=>{RD_FL("bd_hen.tay",1)},rt:"Chàng gật đầu, không ai thấy."}]},
 s2:{h:"Chàng bị đày về tây",w:"emp",if:()=>bdPh()&&!RDW(1)(),t:"Mật Hồ Đạt bị đày về {land}, không được vào kinh nữa. Xe tù dừng ở cửa Tây một khắc để sứ đoàn nhận người.",o:[
  {n:"Ra cửa Tây tiễn chàng, công khai",f:"that",wx:"chàng biết ngươi không giấu",lx:"cả kinh thành thấy",rt:"Ngươi đứng ở cửa Tây; chàng nhìn ngươi qua song xe tù."},
  {n:"Gửi theo xe tù chiếc áo gấm của {mh}",f:"tinh",go:()=>{bdO("aolong","phong");if(RD_FL("bd_hen.lot")&&bdO("da")==="ta")bdO("da","phong")},wx:"chàng có áo ấm trên đường tây",lx:"áo ấy là vật của ngươi",rt:"Chiếc áo gấm theo xe tù về tây."},
  {n:"Không ra tiễn",f:"phan",wx:"không ai nói gì",lx:"chàng đi mà không thấy ngươi",rt:"Ngươi ở trong cung, nghe tiếng xe lăn xa."}]},
 s4:{h:"Chàng đã đi trước",w:"emp",if:()=>bdPh()&&RDW(1)()&&bdP("phong","w")==="tn",t:"Đêm canh tư ấy Mật Hồ Đạt đã ra khỏi cửa Tây; giờ chàng đang trên đường về tây, một mình, không có lệnh tha. Sứ đoàn {land} đi sau chàng mấy ngày, hỏi ngươi có gửi gì theo không.",o:[
  {n:"Gửi nhẫn ấn thề theo sứ đoàn, trả về lò lửa quê nhà",f:"nghia",if:()=>bdO("da")==="ta",wx:"lời thề về chỗ của nó",lx:"không còn gì để cầm",go:()=>bdO("da","tra"),rt:"Chánh sứ nhận chiếc nhẫn, hứa dâng lại trước lò lửa thánh ở quê nhà."},
  {n:"Nhắn chàng: đợi ta trước lò lửa quê nhà",f:"tinh",wx:"lời thề còn sống",lx:"đó là lời của người muốn bỏ đi",go:()=>{RD_FL("bd_hen.tay",1)},rt:"Chánh sứ gật đầu, không hỏi thêm."},
  {n:"Xin Hoàng thượng tha tội trốn ngục cho chàng",f:"that",wx:"chàng không còn là kẻ trốn",lx:"Hoàng thượng biết ai đã mở cửa ngục",rt:"Hoàng thượng im lặng rất lâu, rồi phê: “Tha. Không được vào kinh nữa.”",rf:"Hoàng thượng hỏi: “Cửa ngục ai mở?”"}]},
 s3:{h:"Linh cữu theo sứ đoàn",w:"emp",if:()=>!bdPh(),t:"Sứ đoàn {land} về tây, mang theo linh cữu Mật Hồ Đạt. Chánh sứ hỏi ngươi có gửi gì theo chàng không.",o:[
  {n:"Đặt nhẫn ấn thề vào tay chàng",f:"tinh",if:()=>["ta","chon"].includes(bdO("da")),wx:"lời thề theo chàng về lửa thánh",lx:"không còn gì của chàng ở lại",go:()=>{bdO("da","tra")},rt:"Chiếc nhẫn nằm trên tay chàng khi linh cữu được khiêng đi, về tháp đá ở quê nhà."},
  {n:"Thề trước linh cữu: đòi máu cho chàng",f:"uy",wx:"bộ lạc của chàng biết ngươi không quên",lx:"lời thề máu không có đường lùi",go:()=>{RD_FL("bd_hen.mau",1)},rt:"Chánh sứ quỳ xuống, nghe ngươi thề bằng tiếng {land}."},
  {n:"Xin Hoàng thượng truy tội kẻ đã giết chàng",f:"le",wx:"cái chết có người phải trả lời trước luật",lx:"nhà {v} sẽ chống",rt:"Hoàng thượng truyền Đại Lý tự tra lại đêm ấy.",rf:"Hoàng thượng bảo: “Án đã xong.”"}]},
 c1:{h:"Chiếc nhẫn thề",w:"me",if:()=>["ta","chon"].includes(bdO("da")),t:"Chiếc nhẫn thề vẫn ở đó, nơi ngươi để nó. Sứ đoàn đi rồi, nó sẽ ở lại với ngươi suốt đời, hoặc không.",o:[
  {n:"Gửi chiếc nhẫn về lò lửa quê nhà",f:"nghia",wx:"lời thề về chỗ của nó",lx:"không còn gì để cầm",go:()=>{bdO("da","tra")},rt:"Chánh sứ nhận chiếc nhẫn, hứa dâng lại trước lò lửa thánh ở quê nhà."},
  {n:"Giữ chiếc nhẫn trong tay áo suốt đời",f:"tinh",wx:"lời thề ở với ngươi",lx:"một vật có thể thành chứng cớ",go:()=>{bdO("da","ta")},rt:"Chiếc nhẫn nằm trong tay áo ngươi."},
  {n:"Dâng chiếc nhẫn vào lửa thánh",f:"uy",wx:"lời thề nằm yên",lx:"lòng ngươi đóng lại",go:()=>{bdO("da","chon")},rt:"Lò lửa ở đền Hỏa Tiên nuốt chiếc nhẫn, không để lại tro."}]},
 c2:{h:"{v} đến tiễn sứ đoàn",w:"v",need:["v"],t:"{v} cũng đến tiễn sứ đoàn, đứng cạnh ngươi trên lầu cổng: “Tỷ tỷ buồn sao?”",o:[
  {n:"Đáp: buồn, và {tx} biết ai làm {tx} buồn",f:"uy",wx:"{v} biết ngươi không quên",lx:"thù hai cung đi đến cuối đời",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} không cười nữa."},
  {n:"Đáp: không buồn, chỉ nhớ quê",f:"an",wx:"{v} không còn gì để soi",lx:"{v} nghĩ ngươi đã thua",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} khẽ gật đầu."},
  {n:"Không đáp",wx:"không lỡ lời",lx:"{v} đứng đó đến cuối",rt:"Ngươi nhìn theo sứ đoàn."}]},
 t1:{h:"Thư gửi {pv}",w:"emp",t:"Sứ đoàn mang theo thư nhà của ngươi gửi {pv}. Dòng cuối, ngươi phải viết về Mật Hồ Đạt.",o:[/*bd6b: the letter speaks of him alive or dead (both options fit either)*/
  {n:"Xin {pv} trọng đãi bộ lạc của chàng",f:"nghia",wx:"bộ lạc của chàng được che chở",lx:"{pv} hỏi vì sao",rt:"Ngươi viết: “Người ấy đã giữ lời. Xin {pv} che chở người ấy.”"},
  {n:"Xin {pv} không quên ai đã hại chàng",f:"uy",wx:"{land} sẽ nhớ",lx:"thư ấy là mồi lửa",rt:"Ngươi viết, rồi đóng dấu bằng sáp đỏ."},
  {n:"Không nhắc đến chàng",f:"phan",wx:"thư nhà sạch",lx:"chuyện của chàng không ai kể",rt:"Thư nhà chỉ kể chuyện trong cung."}]},
 x1:{h:"Cổng thành lúc bình minh",w:"emp",t:"Bình minh. Sứ đoàn {land} qua cổng Tây. Hoàng thượng đứng cạnh ngươi trên lầu cổng, không nói gì, chờ xem ngươi làm gì.",o:[
  {n:"Hát khúc ca lửa thánh trên lầu cổng",e:["win","lose"],rt:"Giọng ngươi vang xuống cổng thành; cả sứ đoàn dừng ngựa, hát theo. Hoàng thượng đặt tay lên vai ngươi.",rf:"Giọng ngươi vỡ giữa chừng; triều thần nhìn nhau."},
  {n:"Xin Hoàng thượng cho tự tiễn sứ đoàn đến Ngọc Môn quan",e:["win","mid"],rt:"Hoàng thượng chuẩn, cho cấm quân theo hầu. Ngươi tiễn đến chân ải, rồi quay về.",rf:"Hoàng thượng bảo: “Tiễn đến cổng là đủ.”"},
  {n:"Quay vào trong trước khi sứ đoàn khuất",e:"mid",lx:"ngươi không nhìn theo",rt:"Ngươi xuống lầu, không quay lại."}]}},
 E:{win:{tag:"Lời thề giữ trọn",w:"emp",t:"Lời thề trước lửa thánh được giữ trọn theo cách của ngươi. Ở {land} người ta kể chuyện công chúa và người hộ vệ, ở Đại Hy người ta kể chuyện một phi tần không nói dối Hoàng thượng.",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Người đi, lời ở lại",t:"Sứ đoàn đi rồi. Lời thề ở lại, không ai nhắc, như một đốm lửa giữ trong lò."},
  lose:{tag:"Lời thề nhuốm máu",w:"emp",t:"Lời thề trước lửa thánh nhuốm máu. {land} nhớ người đã chết, hậu cung nhớ người còn sống, và không ai quên tên ngươi đứng giữa.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"bd_hen_11",tag:"Hoàng thượng làm chứng lời thề",w:"emp",n:"Xin Hoàng thượng chứng cho lời thề xưa: chàng giữ biên ải, thần thiếp giữ Đại Hy",
 path:["Thưa thật","Đưa chiếc nhẫn cho Hoàng thượng","Kể hết chuyện lời thề","bát rượu kết nghĩa","Xin cho thái y làm chứng","tra chén rượu","Hồng Lô tự","đọc nguyên văn","Khai thật","Tâu hết với Hoàng thượng","Đến Thận hình ty","Xin Hoàng thượng giữ thái y","nghĩa huynh của Đại Hy"],bad:["Mua chuộc ngục tốt","Khai: không quen","Tâu: thư giả","Đưa bạc cho thái y"],
 x:[()=>bdPh()&&S.danh>=RR("bd_hen_11").bar,"Danh từ "+RR("bd_hen_11").bar],
 t:"Trên lầu cổng Tây, trước mặt sứ đoàn, Hoàng thượng cầm tay ngươi và nói bằng tiếng {land} ngươi đã dạy: “Lời thề của nàng, trẫm làm chứng.” Mật Hồ Đạt xuống ngựa quỳ, thề giữ biên ải cho hai nước đến hết đời. Mỗi mùa thu sau đó, một con ngựa trắng từ biên ải về kinh, trên yên buộc một chiếc nhẫn nhỏ.",/*bd6b: the rare x condition requires bdPh() (alive)*/
 go:(_A,G)=>{RD_FL("bd_hen.chung",1);return e67bien(G[0])},rw:"nt_dongchau",ti:"Người được Hoàng thượng chứng lời thề"}));
