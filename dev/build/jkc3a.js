/* jkc3a: origin arcs dtq muoi thd ch td (format: jkc3.js kc_tt). Every number in BAL.kc3.fx.<arc>; go amounts come in as G[i]. */
/* ================= dtq «Tin dữ Nhạn Môn»: the brother lost at the border; seeds dtq_huynh / dtq_bien / dtq_binh ================= */
kc3Reg("kc_dtq",{t:"Tin dữ Nhạn Môn",w:"cha",g:"Huynh trưởng {huynhN} lạc trong trận ở Nhạn Môn. Cha ngươi, {dadT} {chaN}, giữ kín tin dữ, sợ triều đình mượn cớ. Cứu người trong nhà hay giữ thế của nhà trên triều.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Thư biên ải",w:"cha",t:"Thư biên ải: huynh trưởng lạc trong trận ở Nhạn Môn. Cha giữ kín, sợ triều đình mượn cớ.",o:[
  {n:"Giúp cha giữ kín",f:"obey",wx:"cha tin ngươi kín miệng",lx:"mẫu thân chưa hay biết, đêm nào cũng hỏi",rt:"Ngươi đốt thư biên ải trước đèn.",go:(A,ok,G)=>{if(kcLore())S.kc.lost=1;kc3Af("cha",G[0])}},
  {n:"Xin cha dâng sớ cầu viện",f:"own",wx:"mẫu thân thấy ngươi thương huynh",lx:"cha giận ngươi xen việc quân",rt:"Cha gạt đi, nhưng đêm ấy đèn thư phòng sáng đến canh ba.",go:(A,ok,G)=>{if(kcLore())S.kc.lost=1;kc3Af("cha",G[0]);kc3Af("me",G[1])}},
  {n:"Lén hỏi tên lính đưa thư",f:"read",wx:"biết huynh lạc ở hướng nào",lx:"cha biết ngươi dò chuyện quân",rt:"Tên lính kể: huynh trưởng bị vây ở hẻm núi phía bắc, không ai thấy xác.",rf:"Tên lính câm như hến, rồi kể lại với cha.",go:(A,ok,G)=>{if(kcLore())S.kc.lost=1;if(ok)A.f.where=1;else kc3Af("cha",-G[0])}}]},
 c1:{h:"Người lính cũ",w:"cha",t:"Một tên lính cũ về kể: huynh trưởng có thể còn sống, bị giữ ở trại giặc. Giặc đòi bạc chuộc.",o:[
  {n:"Gom bạc riêng chuộc người",f:"ransom",wx:"có hy vọng đưa huynh về",lx:"bạc riêng vơi đi",rt:"Bạc theo một lái buôn ngựa ra biên ải.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Tự cải trang theo lái buôn ra hỏi tin",f:"ransom",wx:"tận mắt biết huynh còn sống",lx:"mệt lả, lộ ra thì mất tiếng khuê nữ",rt:"Ngươi trở về sau nửa tháng: huynh còn sống, gầy rộc trong trại giặc.",rf:"Đi được nửa đường thì bị gia nhân đuổi kịp, đưa về.",go:(A,ok,G)=>{if(ok)kc3Af("cha",G[0])}},
  {n:"Chờ triều đình",wx:"giữ được tiếng nhà",lx:"cha thấy ngươi bỏ mặc huynh",rt:"Ngươi chờ. Tin biên ải mỗi tuần một thưa.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 c2:{h:"Mẫu thân đòi biết",w:"me",if:()=>!!kc3P("me"),t:"Mẫu thân {meN} đoán ra có chuyện, nắm tay ngươi: “Con nói thật đi, huynh con ra sao rồi?”",o:[
  {n:"Nói thật với mẹ",f:"own",wx:"mẹ tin ngươi",lx:"bà mất ăn mất ngủ vì lo",rt:"Mẫu thân khóc suốt đêm, sáng ra lên chùa cầu an.",go:(A,ok,G)=>{kc3Af("me",G[0])}},
  {n:"Giấu mẹ như lời cha dặn",f:"obey",wx:"cha thấy ngươi giữ lời",lx:"mẹ biết ngươi giấu",rt:"Mẫu thân nhìn ngươi rất lâu, không hỏi nữa.",go:(A,ok,G)=>{kc3Af("me",G[0]);kc3Af("cha",G[1])}},
  {n:"Nói nửa thật nửa giấu",wx:"mẹ yên lòng mà cha không giận",lx:"lộ ra thì mất cả hai",rt:"Ngươi nói huynh bị thương, đang dưỡng ở biên ải.",rf:"Một câu lỡ lời, mẹ đoán ra cả.",go:(A,ok,G)=>{if(ok)kc3Af("me",G[0])}}]},
 c3:{h:"Tiệc mừng công",w:"me0",t:"Một nhà tướng đối đầu mở tiệc mừng công, mời các nhà võ quan. Người ta muốn xem nhà ngươi còn đứng vững không.",o:[
  {n:"Đi dự, múa kiếm góp vui",wx:"cả kinh thành thấy nhà tướng quân không nao núng",lx:"mệt lả",rt:"Đường kiếm của ngươi làm cả tiệc im phăng phắc.",rf:"Kiếm tuột tay giữa tiệc."},
  {n:"Cáo bệnh ở nhà",wx:"giữ mình khỏi lời ra tiếng vào",lx:"người ta đồn nhà ngươi có chuyện",rt:"Ngươi ở nhà. Hôm sau tin đồn lan khắp phố.",go:(A,ok,G)=>{S.kgt+=G[0]}},
  {n:"Đi dự, lặng lẽ nghe ngóng",wx:"nghe được nhà kia định tâu gì",lx:"mệt",rt:"Ngươi nghe được: nhà ấy sắp tâu cha ngươi giấu tin bại trận.",go:(A,ok,G)=>{A.f.foe=1;kc3Af("cha",G[0])}}]},
 t1:{h:"Lời gièm trên triều",w:"cha",t:"Trên triều có kẻ tâu cha ngươi giấu tin bại trận, nuôi binh riêng. Cha về nhà, ngồi lặng trước bản đồ biên ải.",o:[
  {n:"Pha trà, ngồi cạnh cha",wx:"cha thấy còn có người hiểu mình",lx:"không đổi được gì trên triều",rt:"Cha kể chuyện thuở mới tòng quân, đến khuya.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Khuyên cha tự dâng sớ nói thật",f:"own",wx:"lời gièm hết chỗ bám",lx:"cha giận ngươi dạy khôn",rt:"Cha dâng sớ nhận tội giấu tin. Hoàng thượng phạt bổng mà không nghi.",rf:"Cha đập bàn: “Con biết gì việc triều!”",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Biếu nhà ngự sử một lễ để bớt lời",wx:"lời gièm thưa đi",lx:"bạc riêng vơi đi",rt:"Mấy hôm sau, không ai nhắc chuyện ấy nữa.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 x1:{h:"Cha muốn tự cầm quân",w:"cha",t:"Cha nói muốn tự mình dẫn quân đi Nhạn Môn, để mặc lời gièm pha trong triều. Ông hỏi ngươi nghĩ sao.",o:[
  {n:"Ủng hộ cha",e:"win",wx:"cha ra trận với lòng con gái",lx:"nhà vắng chủ, triều càng nghi binh quyền",rt:"Cha mặc giáp, xoa đầu ngươi rồi lên ngựa.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Khuyên cha ở lại kinh thành",e:"mid",wx:"cha giữ được thế trên triều",lx:"huynh trưởng vẫn trong tay giặc",rt:"Cha ở lại. Đêm nào ông cũng ngồi trước bản đồ biên ải.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Xin cha chuộc huynh trước, rồi mới bàn binh",e:["win","lose"],wx:"cứu được người mà giữ được thế",lx:"giặc dời trại, mất dấu huynh",rt:"Cha gật đầu. Lái buôn ngựa lại lên đường.",rf:"Giặc dời trại trong đêm. Cha lặng người."},
  {n:"✦ Cải trang nam nhi, theo quân ra Nhạn Môn",if:A=>S.suc>=BAL.kc3.rare.dtqSuc&&!A.f.obey&&kcRare("kcR4",BAL.kc3.rare.r4),wx:"tự tay đưa huynh về",lx:"bỏ cả kỳ tuyển tú",rt:"Ngươi cắt tóc ngắn, đêm ấy theo đoàn quân ra cửa bắc.",go:()=>{kcEnd("kcR4")}}]}},
 E:{
 win:{tag:"Cha ra Nhạn Môn",w:"cha",seed:()=>roll(BAL.kc3.seedP)?"dtq_bien":"dtq_huynh",t:"Cha cầm quân ra biên ải, mang theo lời hứa đưa huynh trưởng về. Vào cung, ngươi sẽ là người đầu tiên nghe tin chiến sự."},
 mid:{tag:"Giữ thế ở kinh thành",w:"cha",seed:"dtq_binh",t:"Nhà ngươi giữ được thế trên triều, nhưng binh quyền của cha thành cái gai trong mắt nhiều người. Hoàng thượng sẽ hỏi ngươi về nó."},
 lose:{tag:"Huynh trưởng vẫn ở đất giặc",w:"cha",seed:"dtq_huynh",t:"Huynh trưởng vẫn bị giữ ở trại giặc. Vào cung, ngươi phải tự tìm đường cứu người."}}});
/* ================= muoi «Sổ muối»: the father buys a title; seeds muoi_tuoc / muoi_lau / muoi_no / muoi_doi ================= */
kc3Reg("kc_muoi",{t:"Sổ muối",w:"cha",g:"Nhà buôn muối giàu nứt vách mà không có tước. Cha ngươi, {chaN}, muốn bỏ nửa gia sản xin một tước vị trước kỳ tuyển. Sổ sách nhà ngươi sạch đến đâu, chỉ ngươi sắp biết.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Một tước vị cho nhà buôn",w:"cha",t:"Cha muốn bỏ nửa gia sản dâng quốc khố để xin một tước vị, để nhà buôn thành nhà có tước trước kỳ tuyển tú.",o:[
  {n:"Ủng hộ cha",f:"obey",wx:"nhà có tước, Gia thanh lên",lx:"gia tư vơi một nửa",rt:"Cha cười lớn, sai người khiêng bạc lên Hộ bộ.",go:(A,ok,G)=>{S.kgtu=Math.max(BAL.kc3.gtuMin,S.kgtu-G[0]);kc3Af("cha",G[1])}},
  {n:"Khuyên cha giữ bạc",f:"own",wx:"nhà còn của làm vốn",lx:"cha chê ngươi đầu óc nhà buôn",rt:"Cha lắc đầu, cất sổ vào rương.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Xin cha dâng một phần, giữ một phần",wx:"được tước mà không cạn của",lx:"cha thấy ngươi so đo",rt:"Cha nghĩ một đêm rồi nghe theo.",rf:"Quan Hộ bộ chê ít, đòi đủ số.",go:(A,ok,G)=>{if(ok){S.kgtu=Math.max(BAL.kc3.gtuMin,S.kgtu-G[0]);S.kgt+=G[1]}else kc3Af("cha",G[2])}}]},
 c1:{h:"Sổ muối có chỗ thiếu",w:"cha",t:"Sổ muối có chỗ thiếu: người của quan Hộ bộ đòi chia phần.",o:[
  {n:"Giúp cha chép lại sổ",f:"obey",wx:"cha coi ngươi là người giữ sổ",lx:"tay ngươi dính vào sổ giả",rt:"Ngươi chép suốt ba đêm, nét chữ khớp từng dòng.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Khuyên cha khai thật",f:"own",wx:"lòng ngay",lx:"cha giận, quan Hộ bộ thù",rt:"Cha nhìn ngươi như nhìn người lạ.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Biếu quan Hộ bộ một lễ, xin giữ nguyên sổ",wx:"sổ yên, người kia thôi đòi",lx:"bạc riêng vơi đi",rt:"Quan Hộ bộ nhận lễ, không nhắc chuyện chia phần nữa.",rf:"Hắn nhận lễ rồi vẫn đòi thêm."}]},
 c2:{h:"Thuyền muối đêm",w:"cha",t:"Thuyền muối đêm cập bến, chở thứ không phải muối. Người chèo thuyền nhận ra ngươi đứng trên bờ.",o:[
  {n:"Giả như không biết",f:"obey",wx:"cha chia cho ngươi một phần lời",lx:"ngươi đã biết điều không nên biết",rt:"Sáng ra trong rương ngươi có thêm một túi bạc.",go:(A,ok,G)=>{kc3Af("cha",G[0]);A.f.lau=1}},
  {n:"Lén ghi lại hàng và giờ thuyền đến",f:"read",wx:"nắm được bằng chứng của nhà",lx:"bị bắt gặp thì cha không tha",rt:"Ngươi ghi đủ ba chuyến, giấu dưới gối.",rf:"Người chèo thuyền thấy ngươi cầm bút, đi báo cha.",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Lặng lẽ về phòng",wx:"không dính vào",lx:"không biết thuyền chở gì",rt:"Ngươi quay về, cài then cửa."}]},
 c3:{h:"Năm đói ở quê",w:"me0",t:"Quê cũ ở Giang Nam mất mùa. Dân đói kéo lên kinh, ngồi kín phố trước cửa kho muối nhà ngươi.",o:[
  {n:"Bỏ bạc riêng nấu cháo phát cho dân",wx:"cả kinh thành nhắc tên ngươi",lx:"bạc riêng vơi đi",rt:"Nồi cháo trước cửa kho muối bốc khói suốt tháng.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Tự tay phát cháo mỗi sáng",wx:"cả kinh thành nhắc tên ngươi",lx:"mệt lả cả tháng",rt:"Tay ngươi phồng rộp, nhưng dân nhớ mặt tiểu thư nhà muối."},
  {n:"Khuyên cha mở kho bán muối rẻ",wx:"nhà vẫn có lời, dân bớt oán",lx:"người ta vẫn chê nhà buôn hám lợi",rt:"Cha bán muối giá rẻ. Lời ít mà tiếng đỡ.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 t1:{h:"Thư lại Hộ bộ dò hỏi",w:"cha",t:"Một thư lại Hộ bộ đến nhà, hỏi ngươi bâng quơ về sổ sách, về thuyền đêm. Hắn cười: “Tiểu thư sắp đi tuyển, chắc không muốn nhà có chuyện.”",o:[
  {n:"Biếu hắn một lễ cho xong",wx:"hắn thôi hỏi",lx:"hắn biết nhà ngươi sợ",rt:"Thư lại nhận lễ, chắp tay ra về.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Đối đáp cho hắn hớ lời",f:"own",wx:"hắn để lộ kẻ sai hắn đến",lx:"hắn về báo lại, nhà bị để ý",rt:"Hắn lỡ miệng nhắc tên một quan Hộ bộ. Ngươi ghi nhớ.",rf:"Hắn cười nhạt, ghi gì đó vào sổ.",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Mời cha ra tiếp, lui vào trong",wx:"giữ được lễ khuê nữ",lx:"cha thấy ngươi không gánh được việc",rt:"Ngươi lui vào trong. Cha tiếp hắn đến tối.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 x1:{h:"Sổ muối và kỳ tuyển",w:"cha",t:"Trước kỳ tuyển, cha đặt sổ muối lên bàn: “Vào cung, con sẽ cần bạc của nhà. Nhà cũng cần một người trong cung che chở.”",o:[
  {n:"Hứa che chở cho nhà",e:"mid",wx:"nhà sẽ gửi bạc vào cung cho ngươi",lx:"ngươi gánh luôn tội của sổ muối",rt:"Cha trao cho ngươi một tờ ngân phiếu lớn.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Đòi cha đốt sổ giả, làm ăn cho sạch",e:["win","lose"],wx:"nhà sạch sổ, tước giữ được lâu",lx:"cha giận, cắt bạc",rt:"Cha đốt sổ giả trước mặt ngươi.",rf:"Cha không chịu. Từ đó ông chỉ gửi bạc khi ngươi xin.",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Không hứa gì, chỉ xin cha giữ mình",e:"lose",wx:"không mắc nợ tội của nhà",lx:"nhà không coi ngươi là chỗ dựa",rt:"Cha gật đầu, cất sổ."},
  {n:"✦ Xin cha giao cho ngươi giữ cả sổ muối",if:()=>S.tamco>=BAL.kc3.rare.muoiTc&&S.kgtu>=BAL.kc2.st.kc.gtuRich&&kcRare("kcR6",BAL.kc3.rare.r6),wx:"cả cơ nghiệp vào tay ngươi",lx:"bỏ kỳ tuyển tú",rt:"Cha trao chìa khóa kho muối.",go:()=>{kcEnd("kcR6")}}]}},
 E:{
 win:{tag:"Sổ sạch, tước vững",w:"cha",seed:"muoi_tuoc",t:"Nhà ngươi có tước mà sổ sách sạch. Vào cung, chuyện xin phong tước cho nhà buôn muối sẽ còn tiếp, và ngươi đi bước đầu bằng tay mình."},
 mid:{tag:"Người che chở cho nhà",w:"cha",seed:()=>roll(BAL.kc3.seedP)?"muoi_lau":"muoi_no",t:"Ngươi mang theo bạc của nhà và cả bí mật của những chuyến thuyền đêm. Có ngày nó sẽ theo ngươi vào cung."},
 lose:{tag:"Nhà ra nhà, ta ra ta",w:"cha",seed:"muoi_doi",t:"Ngươi vào cung không mang nợ của sổ muối, nhưng nhà cũng không coi ngươi là chỗ dựa. Khi Giang Nam lại đói, ngươi sẽ phải tự chọn."}}});
/* ================= thd «Tài nữ kinh thành»: the poor teacher's daughter chases fame; seeds thd_tho / thd_sach / thd_tro / thd_hoc ================= */
kc3Reg("kc_thd",{t:"Tài nữ kinh thành",w:"cha",g:"Cha ngươi, thầy đồ {chaN}, nghèo mà sách đầy nhà. Danh hiệu Tài nữ kinh thành đang chờ người tranh. Tranh lấy tiếng thơm, hay giữ lấy chữ nghĩa của cha.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Lớp học của cha",w:"cha",t:"Cha mở lớp dạy học cho con nhà nghèo, thiếu bạc mua sách.",o:[
  {n:"Bán trâm mua sách cho cha",wx:"cha cảm động, lớp học đủ sách",lx:"bạc riêng vơi đi",rt:"Cha cầm bó sách mới, mắt đỏ hoe.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Mặc cha lo",wx:"giữ thì giờ học cho mình",lx:"cha buồn",rt:"Ngươi về phòng đọc sách. Cha chép tay sách cho học trò đến khuya.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Viết thơ bán ở thư phường lấy tiền mua sách",wx:"thơ ngươi đến tai người ngoài",lx:"mệt nhoài",rt:"Thơ ngươi bán hết trong ba ngày.",rf:"Chủ thư phường trả rẻ, chê thơ con gái."}]},
 c1:{h:"Hội thơ kinh thành",w:"me0",t:"Hội thơ kinh thành: danh hiệu Tài nữ đang chờ người tranh. Khuê hữu của ngươi cũng ghi tên.",o:[
  {n:"Dốc sức tranh",f:"fame",wx:"cả kinh thành nhắc tên ngươi",lx:"mệt lả, khuê hữu ganh",rt:"Bài thơ của ngươi được chép truyền khắp phố.",rf:"Ngươi về nhì, sau một tiểu thư nhà Hàn lâm."},
  {n:"Nhường bạn khuê phòng",wx:"bạn mang ơn ngươi",lx:"tiếng tăm về tay người khác",rt:"Bạn ngươi đứng đầu, ôm ngươi khóc.",go:(A,ok,G)=>{const b=kc3P("ban0");if(b)kcAf(b,G[0])}},
  {n:"Ghi tên dưới bút hiệu, không lộ mặt",wx:"thơ được đọc mà người không bị soi",lx:"chẳng ai biết thơ là của ngươi",rt:"Bút hiệu của ngươi thành câu đố cả kinh thành.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 c2:{h:"Bài thơ bị đạo",w:"me0",t:"Một tiểu thư nhà quyền quý đọc bài thơ của ngươi ở hội hoa, nói là của mình. Người nghe vỗ tay.",o:[
  {n:"Im lặng cho êm",wx:"không gây thù với nhà quyền quý",lx:"thơ ngươi thành của người",rt:"Ngươi cười, nâng chén trà."},
  {n:"Đọc tiếp khổ sau mà nàng không biết",f:"fame",wx:"cả hội biết ai là tác giả",lx:"nhà kia thù ngươi",rt:"Ngươi đọc nốt khổ cuối. Cả hội quay sang nhìn nàng kia.",rf:"Ngươi run giọng, đọc vấp. Người ta cười cả hai.",go:(A,ok,G)=>{if(!ok)S.kgt+=G[0]}},
  {n:"Về nhà viết một bài hay hơn",wx:"chữ nghĩa ngươi lên một bậc",lx:"bài kia mãi là của người",rt:"Bài mới của ngươi lan khắp thư phường."}]},
 c3:{h:"Học trò của cha",w:"cha",t:"Một học trò nghèo của cha xin chép bản thảo của ông để dâng lên Hàn lâm viện, ghi tên mình.",o:[
  {n:"Bằng lòng",wx:"học trò có đường thi đỗ, nhớ ơn nhà",lx:"công cha thành của người",rt:"Học trò lạy cha ba lạy rồi đi.",go:(A,ok,G)=>{kc3Af("cha",G[0]);A.f.tro=1;if(roll(BAL.kc3.thdTro))kc3Af("cha",G[1])}},
  {n:"Đòi ghi tên cha",f:"cha",wx:"bản thảo giữ tên cha",lx:"học trò tủi hổ bỏ đi",rt:"Học trò đỏ mặt, chép lại tên thầy lên trang đầu.",rf:"Học trò bỏ đi, kể với bạn đồng môn nhà thầy đồ hẹp hòi.",go:(A,ok,G)=>{if(ok)kc3Af("cha",G[0])}},
  {n:"Xin cha tự dâng, cho học trò đứng tên cùng",wx:"cả hai đều được",lx:"cha chê ngươi lo việc không phải của mình",rt:"Cha nghĩ lâu rồi gật đầu.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 t1:{h:"Người đọc thơ ngươi",w:"me0",t:"Một thư sinh lạ để lại ở thư phường một bài họa thơ ngươi, chữ đẹp, ý sâu. Ai cũng đoán người ấy xuất thân cao.",o:[
  {n:"Không họa lại",wx:"giữ được danh tiết khuê nữ",lx:"lỡ một tri âm",rt:"Ngươi gấp bài thơ, cất vào hộp.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Họa lại một bài",f:"fame",wx:"tiếng thơ ngươi bay cao",lx:"người ta đồn tiểu thư thư từ với nam nhân",rt:"Bài họa của ngươi được chép thành bản đôi.",rf:"Bài họa không hay bằng bài kia. Người ta chê ngươi."},
  {n:"Biếu thư phường một lễ, nhờ dò ai viết",wx:"biết người kia là ai",lx:"bạc riêng vơi đi",rt:"Chủ thư phường thì thầm: người ấy đi cùng mấy người hầu không nói tiếng nào.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 x1:{h:"Danh hiệu Tài nữ",w:"cha",t:"Trước kỳ tuyển, Hàn lâm viện muốn chọn một Tài nữ kinh thành đọc thơ mừng thọ Thái hậu. Tên ngươi nằm trong ba người.",o:[
  {n:"Dâng bản thảo của cha thay thơ mình",e:"mid",wx:"sách của cha đến tay Hàn lâm",lx:"danh Tài nữ về tay người khác",rt:"Hàn lâm viện nhận bản thảo của cha, hẹn xem xét.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Dốc sức tranh danh hiệu",e:["win","lose"],wx:"cả kinh thành gọi ngươi là Tài nữ",lx:"thua trước mặt cả kinh thành",rt:"Tên ngươi được viết lên bảng vàng ở Hàn lâm viện.",rf:"Ngươi đứng thứ hai. Người đứng đầu là tiểu thư nhà Hàn lâm.",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Rút tên, nhường học trò của cha dâng thơ",e:"lose",wx:"không ai ganh với ngươi",lx:"danh tiếng chẳng còn gì",rt:"Ngươi rút tên. Kinh thành quên ngươi rất nhanh."}]}},
 E:{
 win:{tag:"Tài nữ kinh thành",w:"cha",seed:"thd_tho",t:"Danh Tài nữ theo ngươi vào cung. Thơ ngươi sẽ đến tay Hoàng thượng, và cả những người muốn dùng nó hại ngươi."},
 mid:{tag:"Sách của cha",w:"cha",seed:"thd_sach",t:"Bản thảo của cha đã đến Hàn lâm viện. Vào cung, số phận bộ sách ấy sẽ còn quay về tìm ngươi."},
 lose:{tag:"Tiếng thơ lặng xuống",w:"cha",seed:A=>A&&A.f.tro?"thd_tro":"thd_hoc",t:"Ngươi vào cung chẳng mang danh gì, chỉ có chữ nghĩa cha dạy. Rồi có ngày chữ nghĩa ấy sẽ thành việc của ngươi."}}});
/* ================= ch «Thư của cô mẫu»: Thái hậu tests her against a cousin; seeds ch_co / ch_bi / ch_benh / ch_ho; win → «Thái hậu triệu» ================= */
kc3Reg("kc_ch",{t:"Thư của cô mẫu",w:"th",g:"Thái hậu là cô mẫu của ngươi. Bà cần một người nhà bên cạnh, và đang thử lòng hai người cháu gái. Làm người cháu biết lễ, hay giành lấy chỗ bên cạnh bà.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Thư của cô mẫu",w:"th",t:"Thái hậu, cô mẫu của ngươi, gửi thư hỏi ngươi đã học Nữ tắc đến đâu.",o:[
  {n:"Chép Nữ tắc gửi vào cung",wx:"cô mẫu khen ngươi giữ lễ",lx:"chép đến mỏi tay",rt:"Bản chép của ngươi nét nào cũng ngay ngắn.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}},
  {n:"Viết thư kể chuyện nhà",wx:"cô mẫu thấy ngươi gần gũi",lx:"bà có thể chê ngươi không nghiêm",rt:"Ngươi kể chuyện tổ mẫu, chuyện hoa trong vườn.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}},
  {n:"Gửi kèm một bài thơ mừng thọ",wx:"cô mẫu nhớ đến tài ngươi",lx:"thơ dở thì bị chê",rt:"Cô mẫu hồi thư, khen một câu.",rf:"Cô mẫu hồi thư, dặn con gái nên chuyên Nữ công.",go:(A,ok,G)=>{S.th=Math.max(0,(S.th||0)+(ok?G[0]:G[1]))}}]},
 c1:{h:"Hai người cháu",w:"th",t:"Cô mẫu cũng gửi thư cho một người cháu gái khác trong họ: hai người, một chỗ bên cạnh bà.",o:[
  {n:"Kết thân với người kia",wx:"người kia thành bạn",lx:"cô mẫu thấy ngươi không muốn tranh",rt:"Hai chị em hẹn ngày cùng lên chùa.",go:(A,ok,G)=>{const b=kc3P("ban0");if(b)kcAf(b,G[0])}},
  {n:"Lấn lướt người kia",f:"vs",wx:"người kia lép vế",lx:"người kia ôm hận",rt:"Thư ngươi đến cung trước, dài hơn, kèm quà quý hơn.",rf:"Người kia biết ngươi chơi khăm, kể lại với cô mẫu."},
  {n:"Mặc, để cô mẫu tự chọn",wx:"không ai oán ngươi",lx:"cô mẫu thấy ngươi nhạt",rt:"Ngươi không nhắc đến người kia trong thư.",go:(A,ok,G)=>{S.th=Math.max(0,(S.th||0)+G[0])}}]},
 c2:{h:"Quà vào cung",w:"th",t:"Tiết Trung thu, nhà nào có người trong cung cũng gửi quà. Cô mẫu thích trà Vũ Di và đồ thêu.",o:[
  {n:"Mua trà Vũ Di thượng hạng",wx:"cô mẫu nhận quà quý",lx:"bạc riêng vơi đi",rt:"Người của Đức Thọ cung nhận trà, cúi đầu tạ.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}},
  {n:"Tự thêu một bức Quan Âm",wx:"cô mẫu nhận quà bằng tay cháu",lx:"thức trắng nửa tháng",rt:"Bức thêu được treo trong Phật đường của Đức Thọ cung.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}},
  {n:"Chỉ gửi một phong thư thăm hỏi",wx:"không tốn gì",lx:"cô mẫu thấy thiếu lòng",rt:"Ngươi gửi thư, không kèm quà.",go:(A,ok,G)=>{S.th=Math.max(0,(S.th||0)+G[0])}}]},
 c3:{h:"Lá thư cũ của tổ mẫu",w:"to",if:()=>!!kc3P("to"),t:"Tổ mẫu {toN} đưa ngươi một lá thư cũ của cô mẫu thời còn ở nhà, dặn: “Đọc rồi đốt. Có những chuyện chỉ người nhà được biết.”",o:[
  {n:"Đọc kỹ rồi giữ lại",f:"bi",wx:"biết một bí mật năm xưa của cô mẫu",lx:"tổ mẫu không vui",rt:"Trong thư là chuyện cô mẫu từng có một người thương trước khi vào cung.",go:(A,ok,G)=>{kc3Af("to",G[0])}},
  {n:"Đọc rồi đốt như lời tổ mẫu",f:"bi",wx:"tổ mẫu tin ngươi",lx:"không giữ được gì làm bằng",rt:"Lá thư cháy. Ngươi nhớ từng chữ.",go:(A,ok,G)=>{kc3Af("to",G[0])}},
  {n:"Không đọc, trả lại tổ mẫu",wx:"giữ mình ngoài chuyện cũ",lx:"tổ mẫu thấy ngươi nhát",rt:"Tổ mẫu cất thư, thở dài.",rf:"Tổ mẫu giận: “Người nhà mà không dám biết chuyện nhà.”"}]},
 t1:{h:"Người của cô mẫu đến",w:"th",t:"Một ma ma của Đức Thọ cung đến phủ, ở lại ba ngày, xem ngươi đi đứng, ăn uống, đối đáp với người hầu.",o:[
  {n:"Cư xử như mọi ngày",wx:"ma ma thấy ngươi thật thà",lx:"không có gì nổi bật",rt:"Ma ma về cung, không nói gì.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}},
  {n:"Đánh một khúc đàn cho ma ma nghe",wx:"ma ma kể lại với cô mẫu",lx:"đàn dở thì thành chuyện cười",rt:"Ma ma ngồi nghe đến hết, gật đầu.",rf:"Dây đàn đứt giữa khúc.",go:(A,ok,G)=>{if(ok)S.th=(S.th||0)+G[0]}},
  {n:"Biếu ma ma một lễ",wx:"ma ma nói tốt cho ngươi",lx:"bạc riêng vơi đi",rt:"Ma ma nhận lễ, cười tít mắt.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}}]},
 x1:{h:"Ra mắt người của cô mẫu",w:"th",t:"Thái hậu cho người ra xem mặt ngươi trước kỳ tuyển. Người cháu kia cũng được xem cùng ngày.",o:[
  {n:"Ra mắt khiêm nhường",e:"mid",wx:"cô mẫu thấy ngươi biết giữ lễ",lx:"người kia rực rỡ hơn",rt:"Ngươi cúi đầu suốt buổi. Người của cô mẫu gật đầu.",go:(A,ok,G)=>{S.th=(S.th||0)+G[0]}},
  {n:"Ra mắt rực rỡ",e:["win","lose"],wx:"người của cô mẫu chọn ngươi",lx:"bị chê phô trương",rt:"Cả sảnh lặng đi khi ngươi bước vào.",rf:"Người của cô mẫu nhíu mày: con gái nhà quốc cữu mà phô trương quá.",go:(A,ok,G)=>{if(ok)S.th=(S.th||0)+G[0]}},
  {n:"Nhường người kia ra trước, mình lui sau",e:"lose",wx:"người kia mang ơn ngươi",lx:"cô mẫu không nhớ mặt ngươi",rt:"Người kia ra mắt trước. Ngươi chỉ kịp cúi chào."}]}},
 E:{
 win:{tag:"Cô mẫu chọn ngươi",w:"th",seed:"ch_co",t:"Cô mẫu muốn ngươi ở bên. Vào cung, ngươi sẽ là người bà giao việc, cũng là người bà dùng.",go:()=>{if(!S.kc.thAsk){S.kc.thAsk=1;pushDil(mkP("kcE",{e:"thtrieu"}),"Thái hậu triệu")}return""}},
 mid:{tag:"Người cháu biết lễ",w:"th",seed:A=>A&&A.f.bi?"ch_bi":"ch_benh",t:"Cô mẫu nhớ ngươi là đứa cháu biết lễ. Vào cung, ngươi sẽ được gọi đến Đức Thọ cung khi bà cần người tin cẩn."},
 lose:{tag:"Hai người cháu, một chỗ",w:"th",seed:"ch_ho",t:"Người cháu kia được cô mẫu để mắt hơn. Vào cung, hai người sẽ còn tranh một chỗ bên cạnh bà."}}});
/* ================= td «Án đang dựng»: the case against the father is being built (the house falls when she leaves, kcEnter); seeds td_an / td_song / td_ke / td_tha ================= */
kc3Reg("kc_td",{t:"Án đang dựng",w:"cha",g:"Cha ngươi, Thị lang bộ Lễ {chaN}, còn đứng trên triều, nhưng kẻ thù đã gom chứng cứ để dựng án. Nhà còn đủ mặt. Ngươi chỉ có từ nay đến ngày đi tuyển để chuẩn bị.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Sổ sách thật",w:"cha",t:"Trong triều có kẻ đang dựng một vụ án tham ô nhắm vào bộ Lễ. Cha ngươi chưa bị hặc, nhưng ngươi biết sổ sách thật nằm trong thư phòng.",o:[
  {n:"Giấu sổ sách thật",wx:"sổ thật còn nguyên",lx:"cha mà biết sẽ giận ngươi động vào",rt:"Ngươi giấu sổ dưới sàn khuê phòng.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Đưa sổ cho ngự sử",wx:"lòng ngay với triều đình",lx:"cha thấy con gái đem chuyện nhà ra ngoài",rt:"Ngự sử nhận sổ, hứa sẽ xem xét.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Chép một bản sao, để bản thật lại chỗ cũ",f:"copy",wx:"có bằng chứng mà cha không biết",lx:"chép vội có thể sai",rt:"Ngươi chép suốt đêm dưới ngọn đèn nhỏ.",rf:"Gia nhân thấy đèn sáng thư phòng, kể với quản gia."}]},
 c1:{h:"Người lạ ở cửa sau",w:"me0",t:"Một người lạ tìm đến, nói khẽ: án đã dựng gần xong; nhận tội thay cha thì đổi được mạng cả nhà.",o:[
  {n:"Gạt đi, tìm chứng cứ",f:"foe",wx:"lần ra kẻ sai người lạ đến",lx:"mệt nhoài",rt:"Ngươi sai tỳ nữ theo dấu hắn: hắn vào cửa sau một phủ quan trong kinh.",rf:"Tỳ nữ lạc dấu hắn giữa chợ.",go:(A,ok,G)=>{if(!ok)S.kgt=Math.max(0,S.kgt-G[0])}},
  {n:"Khuyên cha nhận",wx:"có thể giữ mạng cả nhà",lx:"cha giận, kẻ thù biết nhà đã sợ",rt:"Cha đập bàn: “Nhận tội không làm, là bất trung.”",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Đưa bạc cho hắn, hỏi kẻ đứng sau",wx:"có thể biết tên kẻ thù",lx:"bạc riêng vơi đi",rt:"Hắn nhận bạc, chỉ nói: “Người họ ấy ở bộ Lại.”"}]},
 c2:{h:"Thư phòng bị lục",w:"cha",t:"Đêm qua có kẻ lẻn vào thư phòng của cha, lật tung tủ sách. Sáng ra cha giận dữ hỏi cả nhà.",o:[
  {n:"Tự dò xem kẻ nào trong nhà mở cửa",wx:"tìm ra kẻ nội ứng",lx:"kẻ kia biết ngươi dò",rt:"Ngươi tìm ra một gia nhân mới nhận bạc của người ngoài.",rf:"Gia nhân kia biết ngươi dò, bỏ trốn trước."},
  {n:"Đứng ra trấn an cả nhà",wx:"cả nhà yên lòng",lx:"kẻ nội ứng vẫn ở trong nhà",rt:"Ngươi thu xếp lại tủ sách, dặn gia nhân cẩn thận cửa nẻo.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Lặng im, để xem kẻ ấy làm gì tiếp",wx:"kẻ ấy lộ mặt lần sau",lx:"cha thấy ngươi dửng dưng",rt:"Ngươi để ý ai hay đi qua thư phòng lúc tối.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 c3:{h:"Em trai út",w:"me",if:()=>!!kc3P("me"),t:"Mẫu thân {meN} dặn ngươi khẽ: “Nếu nhà có biến, con phải lo cho em út. Nó còn nhỏ quá.”",o:[
  {n:"Hứa với mẹ",wx:"mẹ yên lòng",lx:"một gánh nặng nữa trên vai",rt:"Mẫu thân nắm tay ngươi, không nói thêm.",go:(A,ok,G)=>{kc3Af("me",G[0])}},
  {n:"Gửi bạc cho nhà thế giao, nhờ đón em khi cần",f:"bro",wx:"em út có đường thoát",lx:"bạc riêng vơi đi",rt:"Nhà thế giao nhận lời, hẹn một ám hiệu.",go:(A)=>{A.f.bro=1}},
  {n:"Tự dạy em đường tắt ra cửa sau, đêm nào cũng tập",f:"bro",wx:"em út biết đường chạy",lx:"mệt nhoài, bị phát hiện thì cả nhà hoảng",rt:"Em út thuộc lối đi qua vườn sau, nhắm mắt cũng chạy được.",rf:"Gia nhân bắt gặp hai chị em lúc nửa đêm, kể với cha."}]},
 t1:{h:"Ngự sử hỏi chuyện",w:"cha",t:"Một ngự sử quen của cha ghé nhà, hỏi ngươi bâng quơ về thư từ của cha. Ông ta có thể là bạn, có thể là người của kẻ thù.",o:[
  {n:"Đáp lễ phép, không nói gì",wx:"cha thấy ngươi kín đáo",lx:"lỡ một đồng minh",rt:"Ngự sử cười, uống cạn chén trà rồi về.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Thử lòng ông ta bằng một tin giả",f:"foe",wx:"biết ông ta đứng về phía nào",lx:"tin giả lan ra thì nhà mang tiếng",rt:"Tin giả đến tai phủ kia ngay hôm sau. Ngươi biết ai là người của kẻ thù.",rf:"Ông ta không mắc lừa, còn nhìn ngươi dò xét."},
  {n:"Biếu ông ta một lễ, nhờ để mắt giúp",wx:"ông ta nói đỡ cho cha",lx:"bạc riêng vơi đi",rt:"Ngự sử nhận lễ, hứa sẽ báo nếu có sớ hặc.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 x1:{h:"Còn kịp làm một việc",w:"cha",t:"Cha gọi ngươi vào thư phòng dặn khẽ: dù ngày nào nhà có biến, ngươi cứ đi con đường của mình. Còn kịp làm một việc.",o:[
  {n:"Gửi sổ sao sang nhà thế giao",e:"win",wx:"chứng cứ thật nằm ở nơi an toàn",lx:"nhà thế giao bị kéo vào",rt:"Bản sao sổ sách nằm lại nhà thế giao, chờ ngày cần đến.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Đốt thư từ của cha",e:"mid",wx:"kẻ lục soát chẳng có gì để dựa vào",lx:"mất luôn chứng cứ minh oan",rt:"Thư từ của cha thành tro.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Lần theo người của kẻ thù đến tận phủ hắn",e:["win","lose"],wx:"biết mặt kẻ dựng án",lx:"bị bắt gặp, kẻ thù đề phòng",rt:"Ngươi thấy tận mắt kẻ ra vào phủ ấy: người của nhà đang muốn hại cha.",rf:"Người gác cổng phủ kia nhìn thấy ngươi."}]}},
 E:{
 win:{tag:"Chứng cứ còn đó",w:"cha",seed:"td_an",t:"Ngày nhà ngươi sụp đổ vẫn sẽ đến, nhưng chứng cứ thật đã ở nơi an toàn. Vào cung, ngươi có thứ để lật lại án.",go:A=>{S.kc.tdCopy=1;if(A&&A.f.bro)S.kc.tdBro=1;try{const e=rivals.find(x=>x.enemy);if(e&&A&&A.f.foe)k61Know(e,"con gái kẻ vu cha",true,BAL.kc3.know.foe)}catch(e){}return""}},
 mid:{tag:"Không để lại dấu vết",w:"cha",seed:A=>A&&A.f.bro?"td_song":"td_ke",t:"Ngươi không để lại gì cho kẻ thù bám vào. Nhưng kẻ đứng sau màn vẫn chưa lộ mặt.",go:A=>{if(A&&A.f.bro)S.kc.tdBro=1;if(A&&A.f.copy)S.kc.tdCopy=1;return""}},
 lose:{tag:"Kẻ thù đã biết ngươi",w:"cha",seed:"td_tha",t:"Kẻ dựng án đã thấy mặt ngươi. Vào cung, con gái nhà hắn sẽ nhận ra ngươi trước khi ngươi kịp nhận ra nàng.",go:A=>{if(A&&A.f.bro)S.kc.tdBro=1;try{const e=rivals.find(x=>x.enemy);if(e)k61Know(e,"con gái kẻ vu cha",true,BAL.kc3.know.foe)}catch(e){}return""}}}});
