/* ---------- cnv_ban · Chị em đồng hương ---------- */
/* BAL.road keys needed: none (deadlines are worded in the story: "trước phiên chợ rằm", "trước khi trời sáng", "trước Tết").
   Story: the jade bracelet Xuân Đào was accused of stealing went out of the palace through thái giám Phúc An (story-only NPC, the cart
   eunuch at the back gate of Nội vụ phủ); Thu Cúc ({mis}'s favourite maid, already in the .4 arc) owed him gambling silver, and {v}'s palace
   paid her debt in exchange for goods and for a scapegoat. Xuân Đào once saw the bracelet in the hands of {v}'s maid, so {v} wants her gone
   (second frame .7). Testimony (.8), {mis} judges (.9), the ledger reaches {eun} (.10), the finale decides Xuân Đào's fate (.11).
   Servant start (ROAD_MAP §8.4): every chapter reads right whether she is still a maid (isSrv) or already raised (S.srv.risen; {mis} is then
   her former mistress). Maid-only effects (tin, nt, e67merit, e67srvUp) only through need:["srv"] options or BAN_MIS / BAN_NT.
   {mis} = the road's mistress, kept once in S.st.f14.act.mis (CNV_MC, _hd_cnv.js). This road is Xuân Đào's, so it runs on when {mis} dies:
   only .9 (she judges) needs her alive; elsewhere her options carry if:CNV_MOK and her texts switch with CNV_MT. */
const BAN_R=()=>!!(S.srv&&S.srv.risen);
const BAN_T=(a,b)=>A=>{const x=BAN_R()?b:a;return typeof x==="function"?x(A):x};/* text: maid wording / consort wording */
function BAN_MIS(n){return CNV_REL(n)}
function BAN_NT(n){try{if(typeof isSrv==="function"&&isSrv()){S.nt=Math.max(0,Math.min(100,(S.nt||0)+n));return `Hoàng thượng để ý +${n}.`}apply({sung:Math.round(n/3)});return `Sủng +${Math.round(n/3)}.`}catch(e){return""}}
const BAN_E=()=>BAN_R()?S.sung:S.nt;/* odds term for options that reach the Emperor */

rdDef("cnv_ban",5,{t:"Chiếc vòng ngọc",w:"maid",sj:"chiếc vòng ngọc thật",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Vụ Xuân Đào khép lại, nhưng chiếc vòng ngọc thật chưa về chỗ cũ. Nó đi đâu, qua tay ai, ai được lợi: lần theo nó là lần ra kẻ đứng sau Thu Cúc.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Vòng ngọc giả",w:"maid",if:()=>rdPrev()==="win",t:BAN_T("Xuân Đào được tha. Nhưng thợ ngọc của Nội vụ phủ xem chiếc vòng tìm thấy trong đồ Thu Cúc, lắc đầu: ngọc nhuộm, vòng giả. Vòng thật đã ra khỏi cung.","Xuân Đào được tha, chạy sang tận cửa cung ngươi khóc. Nhưng thợ ngọc của Nội vụ phủ nói chiếc vòng tìm thấy trong đồ Thu Cúc là vòng giả. Vòng thật đã ra khỏi cung."),o:[
  {n:"Xin xem chiếc vòng giả",sc:1,f:"clue",wx:"biết vòng giả làm ở đâu",lx:"thợ ngọc không cho, đi đồn ngươi tọc mạch, tiếng sút; ngươi mệt mà vô ích",rt:"Lòng vòng có dấu khắc của một tiệm ngọc ngoài phố Đông.",rf:"Thợ ngọc cất vòng vào hộp, khóa lại."},
  {n:"Hỏi Xuân Đào đã thấy gì",wx:"Xuân Đào kể hết với ngươi",lx:"nàng sợ, nói lộn xộn, người ta bảo ngươi khơi chuyện cũ, tiếng sút",rt:"Xuân Đào nhớ Thu Cúc hay ra cửa sau Nội vụ phủ lúc chạng vạng."},
  {n:"Để Nội vụ phủ tự tra",wx:"không phải dính thêm",lx:"Nội vụ phủ tra chậm như rùa, người ta bảo ngươi bỏ tỷ muội, tiếng sút",rt:"Ngươi quay về, bụng không yên."}]},
 s2:{h:"Tỷ muội ở cung khác",w:"maid",if:()=>rdPrev()==="mid",t:CNV_MT("Xuân Đào đã bị đổi sang cung khác. Chiếc vòng chưa tìm thấy, còn Thu Cúc vẫn đứng hầu bên {mis} như chưa có gì.","Xuân Đào đã bị đổi sang cung khác. Chiếc vòng chưa tìm thấy, còn Thu Cúc vẫn ung dung như chưa có gì."),o:[
  {n:"Gửi bánh, hỏi thăm Xuân Đào",wx:"nàng biết ngươi chưa quên",lx:"tốn bạc, người đưa bánh nhiều chuyện",rt:"Xuân Đào gửi lại một chiếc khăn thêu hoa đào quê nhà."},
  {n:"Để mắt đến Thu Cúc",sc:1,f:"clue",wx:"biết Thu Cúc đi đâu buổi tối",lx:"Thu Cúc biết bị rình, đi đồn ngươi thù vặt, tiếng sút; ngươi mệt rã",rt:"Thu Cúc ra cửa sau Nội vụ phủ, tay ôm một bọc nhỏ.",rf:"Thu Cúc quay lại, cười với ngươi."},
  {n:"Quên chuyện cũ cho yên",wx:"lòng nhẹ",lx:"tiếng xấu của Xuân Đào vẫn còn, người ta bảo ngươi bỏ tỷ muội, tiếng sút",rt:"Ngươi tự nhủ: chuyện đã qua."}]},
 s3:{h:"Phòng chứa củi",w:"maid",if:()=>rdPrev()!=="win"&&rdPrev()!=="mid",t:"Ngươi bị phạt quỳ, Thu Cúc đắc ý. Xuân Đào bị nhốt ở phòng chứa củi chờ xét lại. Muốn cứu nàng, phải tìm ra chiếc vòng thật trước khi Nội vụ phủ xét lần hai.",o:[
  {n:"Lén mang cơm cho Xuân Đào",wx:"nàng còn sức chờ",lx:"ngày việc đêm lén đi, ngươi mệt rã; bị bắt gặp là thêm tội",rt:"Xuân Đào ăn vội, nắm tay ngươi: “Tỷ đừng bỏ muội.”"},
  {n:"Dò xem Thu Cúc giấu gì",sc:1,f:"clue",wx:"có manh mối",lx:"lại bị cho là vu cáo, tiếng ngươi sút; bạc mất trắng",rt:"Thu Cúc có một tờ biên nhận cầm đồ giấu trong hộp kim chỉ.",rf:"Thu Cúc la lên, cả phòng xúm lại."},
  {n:"Xin {mis} cho xét lại sớm",if:CNV_MOK,sc:1,wx:"vụ án được xét sớm",lx:"{mis} chán nghe chuyện này, bớt tin ngươi; tiếng sút",go:(A,ok)=>{if(!ok)BAN_MIS(-4)},rt:"{mis} hứa xét lại sau rằm.",rf:"{mis} phẩy tay."}]},
 c1:{h:"Thái giám cửa sau",w:"me",t:"Một cung nữ giặt áo kể: Thu Cúc hay gặp thái giám Phúc An, kẻ coi xe chở đồ giặt ra ngoài cung qua cửa sau Nội vụ phủ.",o:[
  {n:"Rình Phúc An",sc:1,f:"fence",wx:"thấy hắn giấu đồ dưới đáy xe",lx:"hắn đổi giờ chở, biết có người rình, đồn ngươi lắm chuyện, tiếng sút; ngươi mệt rã",rt:"Dưới chồng áo bẩn có một bọc lụa, bên trong có ánh ngọc.",rf:"Hôm ấy xe đi sớm, ngươi đến muộn."},
  {n:"Đưa bạc hỏi Phúc An",sc:1,wx:"hắn hé ra một chút",lx:"hắn báo lại cho người của hắn, ngươi bị nhớ mặt, tiếng sút; bạc mất trắng",rt:"Phúc An cười: “Đồ ta chở là đồ có người gửi. Ta không hỏi ai.”",rf:"Hắn nhận bạc, nói không biết gì."},
  {n:"Báo cho {eun} biết",wx:"việc đến tai người có quyền",lx:"chạy việc đến rã người; Phúc An là người của Nội vụ phủ, tin đến tai hắn trước",rt:"Người của {eun} ghi lại, bảo ngươi về chờ."}]},
 c2:{h:"Tiệm cầm đồ phố Đông",w:"maid",t:"Người nhà Xuân Đào ở kinh thành nhắn vào: ở tiệm cầm đồ phố Đông có một chiếc vòng ngọc y hệt. Phải chuộc trước phiên chợ rằm, kẻo tiệm bán đi.",o:[
  {n:"Gửi bạc chuộc vòng",f:"ring",wx:"vòng thật về tay ngươi",lx:"tốn một khoản bạc lớn, tiệm biết có người trong cung tìm",rt:"Người nhà Xuân Đào chuộc được vòng, lén gửi vào trong giỏ rau."},
  {n:"Nhờ người chép sổ tiệm",sc:1,f:"ledger",wx:"biết ai đem vòng đến cầm",lx:"chủ tiệm nghi, giấu sổ, bạc mất trắng; ngươi áy náy vì xui người làm bậy",rt:"Sổ ghi: người cầm là một thái giám mặt rỗ, xưng tên Phúc An.",rf:"Chủ tiệm đóng cửa sớm."},
  {n:"Không động, sợ lộ",wx:"không để lại dấu ngoài cung",lx:"vòng có thể bị bán mất, người ta bảo ngươi nhát, tiếng sút",rt:"Ngươi nhắn người nhà Xuân Đào chờ thêm."}]},
 t1:{h:"Phúc An nói",w:"me",t:"Ngươi chặn được Phúc An ở cửa sau. Hắn tái mặt: “Ta chỉ chở. Đồ là của cung {v} gửi đi bán. Thu Cúc chỉ là đứa giao.”",o:[
  {n:"Bắt hắn viết lời khai",sc:1,f:"wit",wx:"có lời khai trên giấy",lx:"hắn chạy, lời khai mất, tiếng ngươi sút; ngươi mệt rã",rt:"Phúc An run tay viết, điểm chỉ.",rf:"Hắn giật tờ giấy, chạy mất."},
  {n:"Tha hắn, đổi lấy tin sau này",wx:"có tai mắt ở cửa sau",lx:"tốn bạc nuôi tin, hắn vẫn chở đồ cho cung {v}",rt:"Phúc An cúi rạp: “Có gì ta báo.”"},
  {n:"Giải hắn lên {eun}",sc:1,wx:"việc vào sổ Nội vụ phủ",lx:"{eun} bao che người của mình, ghi ngươi là kẻ lắm chuyện, tiếng sút",rt:"{eun} cho giữ Phúc An lại hỏi.",rf:"{eun} thả hắn sau một tuần trà."}]},
 x1:{h:"Vòng ngọc về đâu",w:"mis",t:"Ngươi đã biết vòng thật ra khỏi cung qua tay Phúc An. Đem điều ấy đến đâu trước?",o:[
  {n:"Đem tang vật đến {mis}",if:CNV_MOK,e:["win","lose"],rt:"{mis} cầm vòng thật, nhìn sang Thu Cúc rất lâu.",rf:"{mis} hỏi: “Bằng gì ngươi nói đây là vòng của ta?”"},
  {n:"Đem tang vật đối chất với Thu Cúc",if:()=>!CNV_MOK(),e:["win","lose"],rt:"Thu Cúc nhìn vòng thật, tái mặt, quỳ xuống trước mặt cả phòng.",rf:"Thu Cúc cười: “Bằng gì ngươi nói đây là vòng ấy?”"},
  {n:"Giữ tang vật, chờ bắt kẻ lớn hơn",e:"mid",lx:"Xuân Đào còn mang tiếng thêm ít lâu, người ta bảo ngươi bỏ tỷ muội, tiếng sút; vụ chỉ dừng ở giữa",rt:"Ngươi giấu mọi thứ dưới đáy rương."},
  {n:"Báo Nội vụ phủ xử theo phép",wx:"vụ vào sổ Nội vụ phủ, tên ngươi là người trình",lx:"Nội vụ phủ có người của Phúc An, bạc lo lót mất trắng, vụ chỉ dừng ở giữa hoặc hỏng",e:["mid","lose"],rt:"Nội vụ phủ ghi nhận, hứa tra.",rf:"Hồ sơ biến mất khỏi bàn Nội vụ phủ."}]}},
 E:{win:{k:1,tag:"Vòng thật về chỗ cũ",w:"mis",t:CNV_MT("{mis} nhận lại vòng thật. Xuân Đào sạch tiếng hẳn, còn Thu Cúc bị phạt quỳ nửa ngày. Nhưng ai cũng biết Thu Cúc không đủ gan làm một mình.","Vòng thật về lại kho Nội vụ phủ. Xuân Đào sạch tiếng hẳn, còn Thu Cúc bị phạt quỳ nửa ngày. Nhưng ai cũng biết Thu Cúc không đủ gan làm một mình."),go:()=>{BAN_MIS(8);return e67merit(4)}},
  mid:{k:0,tag:"Tang vật trong tay ngươi",t:"Ngươi giữ chứng cứ, chưa nói với ai. Kẻ đứng sau chưa biết ngươi đã biết."},
  lose:{k:-1,tag:"Tang vật mất dấu",t:CNV_MT("Phúc An đốt sổ, vòng ngọc biến mất lần nữa. {mis} cho là ngươi cứ gây chuyện vì tỷ muội.","Phúc An đốt sổ, vòng ngọc biến mất lần nữa. Nội vụ phủ cho là ngươi cứ gây chuyện vì tỷ muội."),go:()=>BAN_MIS(-6)}}});

rdDef("cnv_ban",6,{t:"Kẻ vu",w:"v",sj:"kẻ đứng sau Thu Cúc",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Thu Cúc không đủ gan một mình vu người. Có kẻ đã hứa che cho nàng. Đường bạc từ cửa sau Nội vụ phủ dẫn về cung {v}.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời Thu Cúc",w:"maid",if:RDW(1),t:"Thu Cúc bị phạt quỳ. Lúc ngươi đi ngang, nàng ngẩng lên: “Ngươi tưởng ta làm một mình sao? Ngươi chưa biết mình đắc tội ai đâu.”",o:[
  {n:"Đến gặp Thu Cúc lúc nàng bị phạt",sc:1,wx:"nàng hé ra một cái tên",lx:"nàng chửi ngươi to tiếng trước mọi người, tiếng sút; ngươi mệt rã",rt:"Thu Cúc nói khẽ: “Cung {v}. Giờ thì ngươi vui chưa?”",rf:"Thu Cúc nhổ nước bọt xuống chân ngươi."},
  {n:"Hỏi {mis} Thu Cúc từng qua lại cung nào",if:CNV_MOK,sc:1,wx:"{mis} nhớ ra vài chuyện",lx:"{mis} không muốn nghĩ xấu người cũ, bớt tin ngươi; ngươi áy náy vì nghi người",go:(A,ok)=>{if(!ok)BAN_MIS(-3)},rt:"{mis} nhớ Thu Cúc hay xin đi đưa lễ sang cung {v}.",rf:"{mis} nói: “Đừng moi móc nữa.”"},
  {n:"Để Thu Cúc tự chịu",wx:"không thêm oán",lx:"kẻ đứng sau còn trong bóng tối, người ta bảo ngươi đứng nhìn, tiếng sút",rt:"Ngươi đi qua, không nhìn."}]},
 s2:{h:"Bọc nhỏ mỗi tối",w:"maid",if:RDW(0),t:CNV_MT("Thu Cúc vẫn được {mis} sai việc như cũ. Mỗi tối nàng mang một bọc nhỏ ra cửa sau, quay về tay không.","Cung {mis} vắng chủ, Thu Cúc được Nội vụ phủ giữ lại coi đồ cũ. Mỗi tối nàng mang một bọc nhỏ ra cửa sau, quay về tay không."),o:[
  {n:"Theo Thu Cúc",sc:1,f:"fence",wx:"thấy nàng giao bọc cho ai",lx:"bị nàng phát hiện, đi đồn ngươi rình người, tiếng sút; ngươi mệt rã",rt:"Nàng giao bọc cho Phúc An; Phúc An đưa lại một gói bạc có dấu cung {v}.",rf:"Thu Cúc rẽ vào nhà xí, ngươi mất dấu."},
  {n:"Lén mở bọc",sc:1,wx:"biết nàng mang gì ra",lx:"bị bắt quả tang lục đồ người khác, tiếng ngươi sút",rt:"Trong bọc là đôi bông tai của {mis}.",rf:"Thu Cúc bắt gặp, la toáng lên."},
  {n:"Mách {mis}",if:CNV_MOK,sc:1,wx:"{mis} để ý Thu Cúc",lx:"{mis} cho là ngươi thù vặt, bớt tin; tiếng sút",go:(A,ok)=>BAN_MIS(ok?4:-4),rt:"{mis} cho người đếm lại hộp trang sức.",rf:"{mis} mắng ngươi nhiều chuyện."}]},
 c1:{h:"Điều Xuân Đào đã thấy",w:"maid",t:"Xuân Đào nhớ lại: trước hôm bị vu, nàng mang lụa đến cung {v} và thấy Phúc An dúi chiếc vòng ngọc vào tay cung nữ thân cận của {v}.",o:[
  {n:"Bảo Xuân Đào kể lại trước người làm chứng",sc:1,f:"wit",wx:"lời Xuân Đào có người nghe",lx:"tin lọt đến cung {v}, {v} để bụng; ngươi mệt mà vô ích",rt:"Một ma ma già nghe hết, gật đầu nhận sẽ nhớ.",rf:"Người làm chứng đi kể khắp nơi."},
  {n:"Dặn Xuân Đào quên đi để giữ mạng",wx:"Xuân Đào an toàn hơn",lx:"mất một nhân chứng, người ta bảo ngươi bịt miệng tỷ muội, tiếng sút",rt:"Xuân Đào gật đầu, mắt vẫn sợ."},
  {n:"Đem chuyện này hỏi khéo {v}",need:["v"],sc:1,wx:"xem {v} phản ứng",lx:"{v} biết Xuân Đào đã thấy, oán nặng hơn; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?4:8)},rt:"{v} đánh rơi chén trà.",rf:"{v} cười: “Ai thấy gì, cứ nói ra.”"}]},
 c2:{h:"{v} ban ơn",w:"v",need:["v"],t:"{v} cho người mang đến cho Xuân Đào một bộ áo mới, kèm lời nhắn: “Cung ta thiếu người khâu vá. Muốn sang không?”",o:[
  {n:"Khuyên Xuân Đào nhận để dò bên trong",sc:1,f:"inside",wx:"có người ở trong cung {v}",lx:"Xuân Đào vào hang cọp, lòng ngươi cắn rứt",rt:"Xuân Đào sang cung {v}, mỗi tuần lén gửi ngươi một mẩu tin.",rf:"Xuân Đào bị giữ ở phòng giặt, không ra được."},
  {n:"Bảo Xuân Đào từ chối",wx:"Xuân Đào ở chỗ an toàn",lx:"{v} phật ý, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"Xuân Đào gửi trả bộ áo."},
  {n:"Tự đến cảm ơn {v} thay Xuân Đào",sc:1,wx:"{v} tưởng hai chị em đã yên phận",lx:"{v} nhìn thấu, sinh ghét; quà biếu mất trắng",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} nhận lễ, nói Xuân Đào có phúc.",rf:"{v} nói: “Ta không cần người đến cảm ơn thay.”"}]},
 t1:{h:"Sổ nợ của Thu Cúc",w:"me",t:"Ngươi biết được: Thu Cúc nợ Phúc An một món bạc lớn vì đánh bạc ở cửa sau. Người trả nợ thay nàng là cung {v}, đổi lại nàng phải làm theo lệnh.",o:[
  {n:"Trả nợ cho Thu Cúc để kéo nàng về",sc:1,f:"turn",wx:"Thu Cúc thoát khỏi tay cung {v}",lx:"Thu Cúc nhận bạc mà không đổi lòng, ngươi áy náy vì đã mua người; bạc mất trắng",rt:"Thu Cúc cầm bạc, khóc: “Sao ngươi lại giúp ta?”",rf:"Thu Cúc cầm bạc, quay đi không nói."},
  {n:"Nói chuyện nợ với {mis}",if:CNV_MOK,wx:"{mis} biết Thu Cúc bị nắm thóp",lx:"chạy việc đến rã người; Thu Cúc biết ngươi mách, thù ngươi thêm",go:()=>BAN_MIS(4),rt:"{mis} lặng người: “Tám năm. Vậy mà ta không biết.”"},
  {n:"Giữ làm lá bài",wx:"cầm được điểm yếu của Thu Cúc",lx:"chưa ai được cứu, lòng ngươi áy náy vì giữ bí mật làm vốn",rt:"Ngươi ghi số nợ vào sổ riêng."}]},
 x1:{h:"Đêm Thu Cúc đến cung {v}",w:"v",t:"Đêm nay Thu Cúc lẻn đến cung {v} lần cuối, mang theo bạc. Chặn đường nàng, theo đến tận cửa, hay để nàng đi?",o:[
  {n:"Chặn Thu Cúc giữa đường, ép nàng khai",e:["win","lose"],rt:"Thu Cúc quỳ xuống: “Là {v} sai. Ta khai.”",rf:"Thu Cúc la lên. Thị vệ cung {v} chạy ra."},
  {n:"Theo đến cửa cung {v}, nhìn tận mắt",lx:"bạc lo đường mất trắng, thấy mà chưa bắt được, vụ chỉ dừng ở giữa",e:["win","mid"],rt:"Ngươi thấy cung nữ của {v} nhận bạc, và cả {v} đứng sau song cửa.",rf:"Cửa đóng trước khi ngươi kịp nhìn."},
  {n:"Để nàng đi, ghi lại giờ giấc",e:"mid",lx:"cung {v} chưa bị chạm đến, vụ chỉ dừng ở giữa",rt:"Ngươi ghi: canh hai, cửa Tây, mang bọc lụa."}]}},
 E:{win:{k:1,tag:"Lộ mặt kẻ đứng sau",w:"v",t:"Kẻ hứa che Thu Cúc là {v}. Ngươi biết, và {v} biết ngươi biết. Từ nay giữa ngươi và cung {v} là thù thật.",go:A=>{rdOan(A,"v",10);rdRel(A,"v",-10)}},
  mid:{k:0,tag:"Biết mà chưa có chứng",t:"Ngươi biết đường đi của chiếc vòng và của bạc. Nhưng biết thì chưa đủ để ai bị xử."},
  lose:{k:-1,tag:"Bị {v} phát hiện",w:"v",t:"Người của {v} thấy ngươi rình. Từ đêm ấy, cung {v} tìm cách dập cả ngươi lẫn Xuân Đào.",go:A=>{rdOan(A,"v",8)}}}});

rdDef("cnv_ban",7,{t:"Xuân Đào bị phạt",w:"maid",sj:"mạng của Xuân Đào",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Cung {v} ra tay trước: Xuân Đào bị vu lần thứ hai, bị đánh rồi đày xuống Tân Giả khố. Vết thương làm mủ, nàng sốt li bì. Phải có thuốc trước khi trời sáng.",
 p:[["s1","s2"],["c1","c2"],["t1","t2"],["x1"]],
 B:{s1:{h:"Chiếc trâm trong gối",w:"maid",if:RDW(1),t:BAN_T("Ngươi vừa lộ mặt cung {v} thì sáng hôm sau Xuân Đào bị bắt: trong gối nàng có chiếc trâm vàng của cung {v}. Nàng bị đánh hai mươi trượng.","Ngươi vừa lộ mặt cung {v} thì sáng hôm sau Xuân Đào bị bắt: trong gối nàng có chiếc trâm vàng của cung {v}. Ngươi nay là tiểu chủ, không thể chạy xuống sân Nội vụ phủ như xưa; mỗi bước của ngươi đều có người nhìn."),o:[
  {n:"Chạy đến xin tha trước khi đánh",need:["srv"],sc:1,wx:"Xuân Đào bớt roi",lx:"bị cho là đồng bọn, tiếng ngươi sút",rt:"Roi giảm còn mười.",rf:"Ngươi bị đẩy ra khỏi sân."},
  {n:"Sai người xuống sân Nội vụ phủ xin tha",need:["nsrv"],sc:1,wx:"Xuân Đào bớt roi",lx:"cả lục cung biết ngươi bênh kẻ chịu phạt, tiếng sút; bạc lo lót mất trắng",rt:"Roi giảm còn mười.",rf:"Người của ngươi bị đuổi ra khỏi sân."},
  {n:"Ghi lại kẻ nào đã gài trâm",sc:1,f:"clue",wx:"biết ai vào phòng Xuân Đào",lx:"không ai nhận, người ta bảo ngươi vu vạ, tiếng sút",rt:"Cung nữ thân cận của {v} vào phòng ấy lúc mọi người đi giặt.",rf:"Ai cũng nói không thấy."},
  {n:"Giữ bình tĩnh, lo đường thuốc",f:"med",wx:"có thời gian chuẩn bị thuốc",lx:"Xuân Đào chịu đủ roi, lòng ngươi cắn rứt",rt:"Ngươi chạy đi tìm người quen ở Thái y viện."}]},
 s2:{h:"Đòn thứ hai",w:"maid",if:RDW(0),t:"Ngươi còn chưa có chứng cứ thì Xuân Đào đã bị vu lần nữa: mất một cuộn lụa của cung {v}, và cuộn lụa được tìm thấy dưới giường nàng. Nàng bị đánh, đày xuống Tân Giả khố.",o:[
  {n:"Lo bạc đút lót người coi Tân Giả khố",wx:"Xuân Đào được nằm chỗ khô",lx:"bạc trong hộp vơi đi một khoản",rt:"Người coi nhận bạc, cho nàng nằm gần bếp."},
  {n:"Tìm người làm chứng nàng vô tội",sc:1,f:"wit",wx:"có người thấy kẻ gài lụa",lx:"không ai dám, còn đồn ngươi xúi người, tiếng sút; ngươi mệt rã",rt:"Một tiểu thái giám thấy người của cung {v} ôm lụa vào phòng.",rf:"Ai cũng lắc đầu."},
  {n:"Khóc một đêm rồi đi làm",wx:"giữ được sức",lx:"Xuân Đào một mình chịu, người ta bảo ngươi bạc tình, tiếng sút",rt:BAN_T("Sáng ra ngươi rửa mặt, cầm chổi.","Sáng ra ngươi rửa mặt, đi thỉnh an như thường.")}]},
 c1:{h:"Thuốc ở Thái y viện",w:"doc",t:"Thái y viện không cấp thuốc cho kẻ chịu phạt ở Tân Giả khố nếu không có lệnh.",o:[
  {n:"Mua thuốc ngoài cung qua cửa sau",sc:1,f:"med",wx:"có thuốc trước đêm",lx:"Phúc An biết ngươi cần gì, đồn ra, tiếng sút; bạc mất trắng",rt:"Thuốc đến tay ngươi trước giờ khóa cửa.",rf:"Gói thuốc bị đánh tráo bằng lá khô."},
  {n:"Xin thuốc dưới tên mình",f:"med",wx:"có thuốc ngay",lx:"chạy đi chạy lại đến rã người; Thái y viện ghi tên ngươi vào sổ",rt:BAN_T("Ngươi giả đau lưng, lĩnh được một thang thuốc.","Ngươi cho người lĩnh thuốc về cung, nói là cho mình.")},
  {n:"Tự sắc lá thuốc theo cách quê nhà",sc:1,f:"med",wx:"không ai biết",lx:"lá thuốc không đủ mạnh, ngươi thức trắng đến kiệt sức",rt:"Lá trầu, lá ngải, giã nhỏ đắp vết thương. Mủ rút dần.",rf:"Vết thương vẫn sưng đỏ."}]},
 c2:{h:"Ma ma coi Tân Giả khố",w:"me",t:"Ma ma coi Tân Giả khố là người cũ của cung {v}. Bà bắt Xuân Đào giặt nước lạnh dù đang sốt.",o:[
  {n:"Đút lót ma ma",sc:1,wx:"Xuân Đào được nghỉ",lx:"ma ma ăn bạc rồi báo cung {v}, người ta bảo ngươi lo lót, tiếng sút; bạc mất trắng",rt:"Ma ma cất bạc, cho Xuân Đào nằm.",rf:"Ma ma cất bạc, rồi bắt giặt thêm."},
  {n:"Làm thay phần việc của Xuân Đào",need:["srv"],wx:"Xuân Đào được nằm nghỉ",lx:"làm hai phần việc đến kiệt sức; việc của mình bỏ dở, Chủ tin sút",rt:"Ngươi giặt đến nửa đêm, hai tay tím tái."},
  {n:"Sai người của mình xuống giúp",need:["nsrv"],wx:"Xuân Đào có người đỡ",lx:"tốn bạc nuôi người; cả cung biết ngươi bênh một kẻ chịu phạt",rt:"Người của ngươi xuống giặt thay, ma ma không dám nói."},
  {n:"Tố ma ma lên Nội vụ phủ",sc:1,wx:"ma ma bị nhắc",lx:"cung {v} biết ngươi còn đó, thêm oán; hỏng thì người ta bảo ngươi tố bừa, tiếng sút",go:A=>{rdOan(A,"v",3)},rt:"Nội vụ phủ nhắc ma ma theo đúng phép.",rf:"Nội vụ phủ gạt đi."}]},
 t1:{h:"Đêm sốt",w:"maid",need:["srv"],t:"Đêm ấy Xuân Đào mê sảng, gọi tên mẹ và tên làng. Nàng nắm tay ngươi: “Tỷ, muội thấy rồi. Thấy chiếc vòng trong tay người ấy.”",o:[
  {n:"Ở lại canh đến sáng",f:"stay",wx:"nàng không một mình",lx:"thức trắng đến kiệt sức",rt:"Gần sáng, nàng ngủ được."},
  {n:"Ghi lại lời nàng nói",f:"wit",wx:"có lời kể của nhân chứng",lx:"tốn bạc mua giấy mực, đèn dầu; ghi lời người mê sảng, ai tin",rt:"Ngươi ghi từng chữ vào mặt trong vạt áo."},
  {n:"Mời thái y lén đến",sc:1,f:"med",wx:"có thái y xem bệnh",lx:"thái y bị bắt gặp, tiếng ngươi sút; bạc mất trắng",rt:"Thái y chích mủ, để lại thuốc.",rf:"Thái y bị gác cổng chặn lại."}]},
 /* raised twin of t1 (review road-b3-r1 item 4): a tiểu chủ does not spend the night at Tân Giả khố; she sends someone, or goes down once */
 t2:{h:"Đêm sốt",w:"maid",need:["nsrv"],t:"Đêm ấy người ngươi gửi xuống Tân Giả khố chạy về báo: Xuân Đào mê sảng, gọi tên mẹ và tên làng, nắm tay người ấy mà nói: “Tỷ ơi, muội thấy rồi. Thấy chiếc vòng trong tay người ấy.”",o:[
  {n:"Lén xuống Tân Giả khố ngồi cạnh nàng",f:"stay",wx:"nàng không một mình",lx:"tiểu chủ đêm xuống Tân Giả khố, người ta xì xào, tiếng sút; thức đến kiệt sức",rt:"Gần sáng, nàng ngủ được, tay vẫn nắm vạt áo ngươi."},
  {n:"Sai người ghi lại lời nàng nói",f:"wit",wx:"có lời kể của nhân chứng",lx:"tốn bạc giấy mực, thưởng người đi; ghi lời người mê sảng, ai tin",rt:"Người của ngươi chép từng chữ, mang về trước canh năm."},
  {n:"Mời thái y lén đến",sc:1,f:"med",wx:"có thái y xem bệnh",lx:"thái y bị bắt gặp, tiếng ngươi sút; bạc mất trắng",rt:"Thái y chích mủ, để lại thuốc.",rf:"Thái y bị gác cổng chặn lại."}]},
 x1:{h:"Trước khi trời sáng",w:"maid",t:"Cơn sốt lên đến đỉnh. Phải cứu Xuân Đào trước khi trời sáng.",o:[
  {n:"Cho nàng uống thuốc đã có",lx:"thuốc không hợp thì nguy",e:["win","lose"],rt:"Mồ hôi vã ra, cơn sốt lui.",rf:"Thuốc không đủ, nàng lịm đi."},
  {n:"Xin đưa nàng ra khỏi Tân Giả khố chữa bệnh",lx:"quỳ xin đến rã người; hỏng thì nợ Nội vụ phủ một ân, vụ chỉ dừng ở giữa",e:["win","mid"],rt:"Nội vụ phủ cho nàng về phòng bệnh.",rf:"Nội vụ phủ chỉ cho nàng nằm chỗ ấm hơn."},
  {n:"Quỳ chặn kiệu Hoàng thượng xin cứu tỷ muội",need:["srv"],lx:"chủ giận vì kẻ hầu dám chặn kiệu, Chủ tin sút",e:["win","lose"],rt:"Hoàng thượng dừng kiệu, nhìn ngươi, sai thái y đi theo.",rf:"Thị vệ kéo ngươi ra khỏi đường kiệu."},
  {n:"Xin Hoàng thượng cho thái y xuống Tân Giả khố",need:["nsrv"],lx:"xin ơn cho kẻ chịu phạt là tiêu một phần ân sủng; hỏng thì ngài cho là ngươi lo chuyện kẻ hầu, Sủng sút thêm",e:["win","mid"],rt:"Hoàng thượng gật đầu, sai thái y đi ngay.",rf:"Hoàng thượng nói: “Việc ấy để Nội vụ phủ lo.”"}]}},
 E:{win:{k:1,tag:"Xuân Đào qua cơn nguy",w:"maid",t:"Sáng ra Xuân Đào mở mắt, gọi tên ngươi. Nàng nói: “Muội sống rồi, muội sẽ nói hết.”",go:()=>e67merit(4)},
  mid:{k:0,tag:"Xuân Đào sống, nhưng yếu",t:"Xuân Đào qua được, nhưng gầy như que củi, còn phải ở lại Tân Giả khố."},
  lose:{k:-1,tag:"Xuân Đào sợ đến câm lặng",w:"maid",t:"Xuân Đào qua được cơn sốt, nhưng sợ đến mức không dám nhận mình đã thấy gì. Cung {v} đã đạt được điều nó muốn.",go:A=>{rdOan(A,"v",4)}}}});

rdDef("cnv_ban",8,{t:"Lời làm chứng",w:"mis",sj:"phiên làm chứng vụ vòng ngọc",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:BAN_T("Nội vụ phủ mở lại vụ chiếc vòng. Cần một người dám đứng ra nói về những gì đã thấy ở cửa sau. Ngươi là người biết nhiều nhất, và cũng mất nhiều nhất nếu lời mình bị bác.","Nội vụ phủ mở lại vụ chiếc vòng. Cần một người dám nói về những gì đã thấy ở cửa sau. Ngươi nay là tiểu chủ, không đứng giữa sân phủ được: lời chứng của ngươi phải viết thành tờ, đóng dấu cung, để thái giám cung ngươi mang đến đọc. Ngươi biết nhiều nhất, và cũng mất nhiều nhất nếu lời mình bị bác."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Xuân Đào muốn nói",w:"maid",if:RDW(1),t:"Xuân Đào còn yếu, nhưng nắm tay ngươi: “Muội muốn đứng ra. Tỷ đứng cạnh muội nhé.”",o:[
  {n:"Hứa đứng cạnh nàng",f:"wit",wx:"Xuân Đào có gan nói",lx:"buộc mình vào phiên chứng, người ta xì xào, tiếng sút",rt:"Xuân Đào gật đầu, mắt sáng lên."},
  {n:"Dặn nàng chỉ nói điều tận mắt thấy",sc:1,wx:"lời nàng khó bị bắt bẻ",lx:"nàng rối, quên nửa, lòng ngươi áy náy vì ép nàng tập",rt:"Hai chị em tập đi tập lại từng câu.",rf:"Nàng càng tập càng rối."},
  {n:"Khuyên nàng để ngươi nói thay",wx:"Xuân Đào được nghỉ",lx:"gánh thêm việc đến rã người; lời ngươi bị coi là lời bênh tỷ muội",rt:"Xuân Đào thở phào."}]},
 s2:{h:"Xuân Đào không dám",w:"maid",if:RDW(0),t:"Xuân Đào trốn mặt mọi người. Khi ngươi nhắc đến phiên chứng, nàng khóc: “Muội không dám. Lần sau họ giết muội mất.”",o:[
  {n:"Ôm nàng, không ép",wx:"nàng biết ngươi thương",lx:"mất lời của nhân chứng chính, người ta bảo ngươi mềm lòng, tiếng sút",rt:"Nàng khóc đến ngủ thiếp."},
  {n:"Hứa bảo vệ nàng đến cùng",sc:1,f:"wit",wx:"nàng chịu nói",lx:"nàng hứa rồi lại sợ, ngươi áy náy vì đã hứa suông; ngươi mệt rã",rt:"Nàng lau nước mắt: “Vì tỷ.”",rf:"Nàng gật đầu, nhưng hôm sau trốn đi."},
  {n:"Tìm nhân chứng khác",sc:1,wx:"có người khác thay Xuân Đào",lx:"người ấy nhận bạc rồi cáo ốm, đòi thêm bạc",rt:"Cung nữ giặt áo năm trước nhận sẽ nói.",rf:"Người ấy nhận bạc rồi cáo ốm."}]},
 c1:{h:"Phúc An đổi lời",w:"me",t:"Phúc An được ai đó lo lót, nay chối hết: hắn chưa từng chở vòng ngọc, chưa từng biết Thu Cúc.",o:[
  {n:"Đưa ra lời khai hắn đã viết",sc:1,wx:"hắn cứng họng",lx:"lời khai bị nói là ép viết, tiếng ngươi sút",rt:"Dấu điểm chỉ của hắn còn đỏ trên giấy.",rf:"Hắn nói bị ép, Nội vụ phủ gạt tờ giấy."},
  {n:"Dọa hắn bằng sổ cầm đồ",sc:1,wx:"hắn sợ, khai lại",lx:"hắn báo cung {v}, đồn ngươi dọa người, tiếng sút; bạc mất trắng",rt:"Phúc An tái mặt, xin khai lại.",rf:"Hắn cười: “Sổ ấy ai chứng?”"},
  {n:"Bỏ hắn, chỉ dựa vào người khác",wx:"không dây với kẻ trở mặt",lx:"mất một mắt xích, người ta bảo ngươi thiếu chứng, tiếng sút",rt:"Ngươi gạch tên hắn khỏi danh sách."}]},
 c2:{h:"Kiệu Hoàng thượng đi ngang",w:"emp",t:BAN_T("Phiên hỏi đang ở sân Nội vụ phủ thì kiệu Hoàng thượng đi ngang. Ngài cho dừng, hỏi chuyện gì mà đông người.","Phiên hỏi đang ở sân Nội vụ phủ. Ngươi thỉnh an về, đi ngang cổng phủ thì gặp kiệu Hoàng thượng. Ngài cho dừng, hỏi trong ấy chuyện gì mà đông người."),o:[
  {n:"Ngẩng đầu thưa rõ từng lời",need:["srv"],sc:1,wx:"Hoàng thượng nhớ mặt kẻ hầu dám nói",lx:"chủ cho là ngươi lấn, Chủ tin sút",rt:"Hoàng thượng nghe hết, hỏi tên ngươi.",rf:"Tổng quản quát ngươi im."},
  {n:"Xin Hoàng thượng dừng kiệu nghe một lời",need:["nsrv"],sc:1,wx:"Hoàng thượng để tâm đến vụ án",lx:"bị cho là lấy chuyện nhỏ làm phiền, Sủng sút",rt:"Hoàng thượng nghe, dặn Nội vụ phủ xử cho minh bạch.",rf:"Hoàng thượng nói: “Việc của Nội vụ phủ.”"},
  {n:"Cúi đầu, để phiên hỏi đi đúng phép",wx:"không ai trách được",lx:"lỡ một dịp, người ta bảo ngươi nhát, tiếng sút",rt:"Kiệu đi qua. Phiên hỏi tiếp tục."}]},
 t1:{h:"{mis} hỏi riêng",w:"mis",if:CNV_MOK,t:"{mis} gọi ngươi vào trước phiên: “Ngươi làm chứng thì Thu Cúc chết. Nó theo ta tám năm.”",o:[
  {n:"Thưa: chỉ nói điều đã thấy",f:"wit",wx:"giữ được lẽ thẳng",lx:"{mis} buồn, bớt tin; người trong cung chê ngươi cứng, tiếng sút",go:()=>BAN_MIS(-3),rt:"{mis} gật đầu: “Ừ. Ngươi cứ nói.”"},
  {n:"Hứa không nhắc tên Thu Cúc",wx:"{mis} cảm kích",lx:"lời chứng hở một chỗ, lòng ngươi áy náy",go:()=>BAN_MIS(5),rt:"{mis} nắm tay ngươi: “Ta nhớ.”"},
  {n:"Xin {mis} tự xử Thu Cúc trước phiên",sc:1,wx:"{mis} giữ thể diện",lx:"{mis} cho là ngươi dạy nàng, bớt tin; ngươi mệt mà vô ích",go:(A,ok)=>BAN_MIS(ok?4:-5),rt:"{mis} cho gọi Thu Cúc vào phòng riêng.",rf:"{mis} quay mặt: “Ngươi lui ra.”"}]},
 x1:{h:"Phiên làm chứng",w:"mis",t:BAN_T("Cả sân Nội vụ phủ đứng nghe. Người của cung {v} đứng ở hàng đầu.","Thái giám cung ngươi cầm tờ chứng đóng dấu bước ra giữa sân Nội vụ phủ. Người của cung {v} đứng ở hàng đầu. Viết gì vào tờ ấy là việc của ngươi."),o:[
  {n:"Làm chứng, kể hết",lx:"bị bác là thành kẻ vu cáo lần hai",e:["win","lose"],rt:"Từng lời ngươi khớp với sổ cầm đồ và lời Xuân Đào.",rf:"Người của cung {v} có lời khai khác, khớp hơn."},
  {n:"Chỉ làm chứng về Phúc An",wx:"Phúc An bị kết tội nhờ lời ngươi",lx:"cung {v} không bị nhắc, hỏng thì lời ngươi bị bác",e:["mid","lose"],rt:"Phúc An bị kết tội chở đồ ra ngoài.",rf:"Lời ngươi bị nói là không đủ."},
  {n:"Để Xuân Đào tự nói",e:"mid",lx:"lời của một cung nữ chịu phạt nhẹ cân, người ta bảo ngươi đẩy tỷ muội ra trước, tiếng sút; vụ chỉ dừng ở giữa",rt:"Xuân Đào nói run run, nhưng nói hết."}]}},
 E:{win:{k:1,tag:"Lời chứng đứng vững",w:"mis",t:"Nội vụ phủ ghi lời ngươi làm chứng. Phúc An bị giam, Thu Cúc bị gọi tên. Cả cung biết người cùng quê với Xuân Đào không phải người dễ bỏ tỷ muội.",go:A=>{rdOan(A,"v",6);return e67merit(5)}},
  mid:{k:0,tag:"Nửa lời chứng",t:"Phúc An bị xử, nhưng Thu Cúc và cung {v} vẫn đứng ngoài."},
  lose:{k:-1,tag:"Lời chứng bị bác",t:BAN_T("Lời ngươi bị bác. Ngươi bị phạt quỳ vì vu cáo lần hai, chủ không còn tin ngươi như trước.","Lời ngươi bị bác. Nội vụ phủ tâu lên, Hoàng thượng phê phạt bổng ngươi vì vu cáo; cả lục cung xì xào."),go:A=>{BAN_MIS(-8);rdOan(A,"v",4)}}}});

rdDef("cnv_ban",9,{t:"Chủ phân xử",w:"mis",sj:"lời phân xử của {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Thu Cúc theo {mis} tám năm. Xuân Đào là người cùng quê với ngươi. Chứng cứ nằm trên bàn, và {mis} phải chọn. Lời ngươi có thể làm nàng nghiêng về một bên.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bàn phân xử",w:"mis",if:RDW(1),t:BAN_T("Sau phiên làm chứng, Nội vụ phủ trả vụ Thu Cúc về cho {mis} tự xử, vì Thu Cúc là người cung nàng. {mis} cho gọi ngươi đứng hầu bên bàn.","Sau phiên làm chứng, Nội vụ phủ trả vụ Thu Cúc về cho {mis} tự xử. Ngươi nay là tiểu chủ, được {mis} mời sang ngồi nghe, vì ngươi từng là người cung nàng."),o:[
  {n:"Đứng hầu, không nói",need:["srv"],wx:"{mis} thấy ngươi biết phận",lx:"không góp được lời, người ta bảo ngươi câm, tiếng sút",go:()=>BAN_MIS(3),rt:"Ngươi đứng sau {mis} suốt buổi."},
  {n:"Ngồi nghe, không nói",need:["nsrv"],wx:"{mis} thấy ngươi giữ lễ",lx:"không góp được lời, người ta bảo ngươi câm, tiếng sút",go:()=>BAN_MIS(3),rt:"Ngươi ngồi nghe suốt buổi, không chen một lời."},
  {n:"Xin được trình bày trước",sc:1,wx:"{mis} nghe ngươi trước",lx:"bị cho là lấn lời, tiếng ngươi sút; ngươi mệt mà vô ích",rt:"{mis} gật đầu cho ngươi nói.",rf:"{mis} nói: “Chờ đến lượt.”"},
  {n:"Đưa Xuân Đào đến cùng",f:"wit",wx:"Xuân Đào có mặt khi bị xử thay",lx:"Xuân Đào phải nhìn Thu Cúc, người ta bảo ngươi làm to chuyện, tiếng sút",rt:"Xuân Đào đứng nép sau lưng ngươi."}]},
 s2:{h:"Chủ không muốn xử",w:"mis",if:RDW(0),t:"Vụ án dở dang. {mis} không muốn xử, cứ hẹn lần hẹn lữa. Trong lúc ấy Thu Cúc vẫn hầu trà cho nàng mỗi sáng.",o:[
  {n:"Xin {mis} xử cho dứt",sc:1,wx:"{mis} đặt ngày xử",lx:"{mis} khó chịu, bớt tin; tiếng sút",go:(A,ok)=>BAN_MIS(ok?2:-4),rt:"{mis} thở dài: “Mười lăm này.”",rf:"{mis} nói: “Ngươi giục ta?”"},
  {n:"Đưa thêm chứng cứ cho {mis}",sc:1,wx:"{mis} không thể làm ngơ",lx:"chứng cứ bị Thu Cúc giành trước, đồn ngươi bịa, tiếng sút; bạc mất trắng",rt:"{mis} đọc tờ sổ cầm đồ, mặt tái.",rf:"Thu Cúc nói tờ sổ là giả."},
  {n:"Chờ thêm",wx:"không bị coi là ép chủ",lx:"Thu Cúc có thời gian lo liệu, người ta bảo ngươi nhát, tiếng sút",rt:"Ngươi chờ."}]},
 c1:{h:"Thu Cúc quỳ",w:"me",t:"Thu Cúc quỳ trước {mis}, khóc kể món nợ ở cửa sau, kể cung {v} ép nàng thế nào. Nàng xin tha một mạng.",o:[
  {n:"Xin {mis} tha Thu Cúc một mạng",f:"mercy",wx:"Thu Cúc nợ ngươi một ân",lx:"Xuân Đào chịu oan không ai đền, người ta bảo ngươi mềm, tiếng sút",rt:"Thu Cúc ngẩng lên nhìn ngươi, không tin nổi."},
  {n:"Nhắc {mis} Xuân Đào đã chịu những gì",sc:1,wx:"{mis} nhìn Xuân Đào",lx:"{mis} cho là ngươi thiên vị, tiếng sút",rt:"{mis} nhìn những vết roi trên tay Xuân Đào, im lặng.",rf:"{mis} nói: “Ta biết. Không cần nhắc.”"},
  {n:"Im lặng",wx:"không để ai bắt lỗi",lx:"mất lượt nói, lòng ngươi áy náy",rt:"Ngươi đứng yên."}]},
 c2:{h:"{v} gửi lời",w:"v",need:["v"],t:"{v} sai người đến nói với {mis}: “Chuyện trong cung ai nấy tự xử. Đừng để lan sang cung khác.”",o:[
  {n:"Nói với {mis}: {v} đang sợ",sc:1,wx:"{mis} thấy rõ ai đứng sau",lx:"{mis} sợ thay vì giận, lòng ngươi áy náy vì đã dọa chủ; {v} vẫn thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?6:3)},rt:"{mis} đặt chén trà xuống: “Sợ thì phải có lý do.”",rf:"{mis} nói: “Cung ta không đủ sức đối đầu.”"},
  {n:"Tránh nhắc đến {v}",wx:"vụ án nhỏ lại",lx:"{v} thoát, người ta bảo ngươi sợ cung {v}, tiếng sút",rt:"Ngươi chỉ nói về Thu Cúc."},
  {n:"Tự đến cung {v} đáp lời",sc:1,wx:"{v} biết ngươi không lùi",lx:"vượt phận, tiếng ngươi sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:6)},rt:"Ngươi nói đúng một câu rồi lui. {v} không đáp được.",rf:"{v} cho người đuổi ngươi ra."}]},
 t1:{h:"Cái giá của công bằng",w:"mis",t:"{mis} hỏi ngươi: “Nếu ta xử đúng, cung {v} sẽ thù cung ta. Ngươi gánh được cùng ta không?”",o:[
  {n:"Thưa: xin gánh cùng",f:"bond",wx:"{mis} thấy có người đứng cạnh",lx:"buộc mình vào thù của nàng, lo nghĩ đến rã người",go:()=>BAN_MIS(6),rt:"{mis} gật đầu chậm."},
  {n:"Thưa: xử theo lẽ phải, việc sau tính sau",wx:"giữ được lẽ thẳng",lx:"{mis} thấy ngươi để nàng gánh một mình, người ta chê ngươi, tiếng sút",rt:"{mis} cười buồn: “Lẽ phải không có ai gánh hộ.”"},
  {n:"Khuyên xử nhẹ cho êm",f:"soft",wx:"cung {mis} yên",lx:"Xuân Đào không được rửa hẳn, lòng ngươi áy náy",rt:"{mis} gật đầu, như trút được gánh."}]},
 x1:{h:"Lời phân xử",w:"mis",t:"{mis} cầm bút. Trên bàn là sổ cầm đồ, lời khai của Phúc An và vết roi trên tay Xuân Đào.",o:[
  {n:"Xin {mis} xử theo chứng cứ",lx:"hỏng thì {mis} che Thu Cúc, Thu Cúc thành kẻ thù",e:["win","lose"],rt:"{mis} viết: Thu Cúc đuổi về Tân Giả khố, Xuân Đào rửa oan.",rf:"{mis} buông bút: “Ta không xử được người tám năm.”"},
  {n:"Xin xử nhẹ cả hai, giữ êm cung",e:"mid",lx:"Xuân Đào chưa được rửa sạch, lòng ngươi áy náy; vụ chỉ dừng ở giữa",rt:"Thu Cúc bị phạt bổng, Xuân Đào được về phòng cũ."},
  {n:"Dâng chứng cứ thẳng lên Nội vụ phủ, bỏ qua {mis}",lx:"{mis} mất mặt, không bao giờ quên ngươi vượt đầu nàng",e:["out","lose"],rt:"Nội vụ phủ xử Thu Cúc theo phép.",rf:"Nội vụ phủ trả hồ sơ về cho {mis}."}]}},
 E:{win:{k:1,tag:"Chủ xử theo lẽ phải",w:"mis",t:"Thu Cúc bị đuổi về Tân Giả khố. Xuân Đào được rửa oan trước cả cung. {mis} nói với ngươi: “Ngươi làm ta mất một người, nhưng trả lại cho ta chữ tín.”",go:()=>{BAN_MIS(10);return e67merit(5)}},
  mid:{k:0,tag:"Xử cho êm",t:"Cả hai bị phạt nhẹ, không ai được rửa hẳn. Cung {mis} yên, nhưng chỉ là yên mặt nước."},
  out:{k:0,tag:"Vượt mặt chủ",w:"eun",t:"Nội vụ phủ xử đúng, nhưng {mis} không bao giờ quên ngươi đã đi qua đầu nàng.",go:()=>BAN_MIS(-10)},
  lose:{k:-1,tag:"Chủ che Thu Cúc",w:"mis",t:"{mis} không nỡ xử Thu Cúc. Xuân Đào vẫn mang tiếng, còn Thu Cúc nhìn ngươi bằng ánh mắt của kẻ được tha.",go:()=>BAN_MIS(-5)}}});

rdDef("cnv_ban",10,{t:"Trả lại sự thật",w:"eun",sj:"cuốn sổ đồ ra cửa sau",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Sổ đồ ra cửa sau của Phúc An đã đến bàn {eun}. Trong sổ có tên Thu Cúc, tên cung {v}, và tên mấy thái giám của chính Nội vụ phủ. Sự thật được trả lại, hay bị chôn để giữ yên cả một phủ?",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sổ trên bàn {eun}",w:"eun",if:RDW(1),t:"Thu Cúc đã bị xử. Nhưng trước khi đi Tân Giả khố, nàng khai ra cuốn sổ của Phúc An. Cuốn sổ nay nằm trên bàn {eun}.",o:[
  {n:"Xin {eun} cho xem sổ",sc:1,wx:"biết trong sổ có những ai",lx:"{eun} ghi nhớ ngươi là kẻ lắm chuyện, tiếng sút; ngươi mệt mà vô ích",rt:"Ngươi đọc thấy tên cung {v} bảy lần.",rf:"{eun} gập sổ: “Việc của phủ.”"},
  {n:"Chép trước một bản",sc:1,wx:"có bản sao phòng khi sổ mất",lx:"bị bắt là trộm hồ sơ, tiếng ngươi sút; bạc mất trắng",rt:"Một thư lại chép cho ngươi nửa cuốn.",rf:"Thư lại bị bắt, khai ra ngươi."},
  {n:"Chờ {eun} tự xử",wx:"không đắc tội Nội vụ phủ",lx:"sổ có thể biến mất, người ta bảo ngươi buông tay, tiếng sút",rt:"Ngươi chờ."}]},
 s2:{h:"Sổ suýt mất",w:"eun",if:RDW(0),t:"Vụ án dở dang. Nghe đồn cuốn sổ của Phúc An sắp bị đốt trong lò của Nội vụ phủ trước Tết.",o:[
  {n:"Tìm cách giữ cuốn sổ",sc:1,f:"book",wx:"cuốn sổ còn",lx:"bị nghi lấy trộm, tiếng ngươi sút; bạc mất trắng",rt:"Một thư lại giấu cuốn sổ vào kho cũ.",rf:"Cuốn sổ đã bị dời đi."},
  {n:"Báo cho {mis} biết",if:CNV_MOK,wx:"{mis} cùng giữ",lx:"{mis} không muốn dính thêm, ngươi áy náy vì kéo nàng vào",go:()=>BAN_MIS(3),rt:"{mis} nói: “Để ta nhờ người.”"},
  {n:"Để mặc",wx:"không dính thêm",lx:"sự thật có thể thành tro, người ta bảo ngươi buông tay, tiếng sút",rt:"Ngươi không đi."}]},
 c1:{h:"Phúc An mất tích",w:"me",t:"Phúc An không còn ở cửa sau. Người ta nói hắn bị điều ra Hoàng lăng.",o:[
  {n:"Cho người ra Hoàng lăng tìm",sc:1,f:"fence",wx:"Phúc An còn sống để khai",lx:"người đi tìm về tay không, ngươi áy náy vì sai người đi xa vô ích; bạc mất trắng",rt:"Phúc An còn sống, run rẩy nhận sẽ khai nếu được về kinh.",rf:"Ở Hoàng lăng không ai tên Phúc An."},
  {n:"Tìm người thay hắn coi xe",sc:1,wx:"biết đường đồ vẫn chảy",lx:"kẻ mới cũng là người của cung {v}, lòng ngươi áy náy vì cài người",rt:"Kẻ mới vẫn chở bọc lụa ra mỗi tối.",rf:"Kẻ mới không nói gì."},
  {n:"Thôi, đủ chứng rồi",wx:"không gây thêm",lx:"mất một nhân chứng, người ta bảo ngươi bỏ cuộc, tiếng sút",rt:"Ngươi không tìm nữa."}]},
 c2:{h:"Xuân Đào muốn về quê",w:"maid",t:"Xuân Đào xin ngươi giúp nàng xin xuất cung sớm: “Muội sợ rồi, tỷ ạ. Muội muốn về làng.”",o:[
  {n:"Hứa giúp nàng về quê",f:"home",wx:"Xuân Đào yên lòng",lx:"tốn bạc lo đường; sắp mất người cùng quê",rt:"Xuân Đào ôm ngươi khóc."},
  {n:"Khuyên nàng ở lại đến khi rửa sạch tiếng",sc:1,f:"stay",wx:"Xuân Đào ở lại",lx:"nàng giận ngươi, lòng ngươi áy náy",rt:"Xuân Đào gật đầu: “Vì tỷ.”",rf:"Xuân Đào im lặng, quay đi."},
  {n:"Xin {mis} cho Xuân Đào về cùng phòng",need:["srv"],if:CNV_MCUR,sc:1,f:"keep",wx:"hai chị em ở gần nhau",lx:"{mis} cho là ngươi đòi hỏi, Chủ tin sút",rt:"{mis} gật đầu.",rf:"{mis} nói: “Người đã đi thì đừng gọi về.”"},
  {n:"Xin Nội vụ phủ cho Xuân Đào về hầu cung mình",need:["nsrv"],f:"keep",wx:"Xuân Đào ở trong tay ngươi",lx:"tốn bạc lo lót; cung {v} thấy ngươi giữ nhân chứng",rt:"Nội vụ phủ phân Xuân Đào về cung ngươi."}]},
 t1:{h:"{eun} mặc cả",w:"eun",t:"{eun} nói: “Ta khép sổ. Thu Cúc chịu tội một mình, cung {v} không dính. Đổi lại Xuân Đào được trắng án, người của ta cũng yên.”",o:[
  {n:"Nhận lời",f:"deal",wx:"Xuân Đào chắc được trắng án",lx:"cung {v} không bị chạm đến, người ta bảo ngươi bán lẽ phải, tiếng sút",rt:"{eun} gật đầu, cất sổ vào ngăn kéo."},
  {n:"Đòi đưa cả sổ lên",sc:1,f:"truth",wx:"{eun} không dám ém",lx:"{eun} thành kẻ thù, tiếng ngươi sút; ngươi mệt rã",rt:"{eun} nhíu mày: “Gan đấy. Được.”",rf:"{eun} nói: “Vậy thì không ai được gì.”"},
  {n:"Xin thêm bạc lộ phí cho Xuân Đào về quê",sc:1,f:"deal",wx:"Xuân Đào có vốn về làng",lx:"bị coi là mặc cả sự thật, lòng ngươi áy náy; hỏng thì bị chê tham, tiếng sút",rt:"{eun} cười, đẩy sang một túi bạc.",rf:"{eun} nói: “Đừng được voi đòi tiên.”"}]},
 x1:{h:"Cuốn sổ",w:"eun",t:"Cuốn sổ nằm giữa bàn. Sự thật được trả lại hay bị chôn, đêm nay quyết.",o:[
  {n:"Dâng cả cuốn sổ lên Hoàng thượng",lx:"dâng sổ đến kiệt sức; hỏng thì đắc tội cả Nội vụ phủ, cuốn sổ bị đốt",e:["win","lose"],go:(A,ok)=>ok?BAN_NT(8):"",rt:"Hoàng thượng đọc sổ, cho gọi {eun} đến.",rf:"Cuốn sổ không đến được ngự án."},
  {n:"Nhận cuộc mặc cả của {eun}",e:"mid",lx:"cung {v} không bị đụng đến, ngươi đổi lẽ phải lấy yên ổn, lòng áy náy; vụ chỉ dừng ở giữa",rt:"{eun} khép sổ. Xuân Đào trắng án."},
  {n:"Đưa sổ cho {mis}, để nàng dùng",if:CNV_MOK,lx:"sự thật thành lá bài của người khác, vụ chỉ dừng ở giữa",e:["mid","lose"],go:()=>BAN_MIS(5),rt:"{mis} cất sổ, nói sẽ dùng khi cần.",rf:"{mis} sợ, đốt cuốn sổ."}]}},
 E:{win:{k:1,tag:"Sự thật ra ánh sáng",w:"emp",t:"Hoàng thượng đọc sổ. Phúc An và mấy thái giám bị xử, cung {v} bị phạt bổng và cấm túc. Tên Xuân Đào được trả lại sạch.",go:A=>{rdOan(A,"v",12);return e67merit(5)}},
  mid:{k:0,tag:"Sự thật bị chôn một nửa",t:"Xuân Đào trắng án, nhưng cuốn sổ nằm im trong ngăn kéo. Cung {v} biết ngươi đã thả nó.",go:A=>{rdOan(A,"v",3)}},
  lose:{k:-1,tag:"Cuốn sổ bị đốt",w:"eun",t:"Cuốn sổ bị đốt trong lò Nội vụ phủ. Không còn gì chứng minh Xuân Đào vô tội ngoài lời ngươi.",go:A=>{rdOan(A,"v",4)}}}});

rdDef("cnv_ban",11,{t:"Đồng hương",w:"maid",sj:"số phận của Xuân Đào",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Chuyện chiếc vòng ngọc đi đến hồi cuối. Xuân Đào được trả lại tên sạch, được về quê hay mất hẳn, tùy những gì ngươi làm bây giờ. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Túi thơm hoa đào",w:"maid",if:RDW(1),t:BAN_T("Sổ đã lên ngự án. Tối ấy Xuân Đào ngồi bên cửa sổ phòng kẻ hầu, khâu cho ngươi chiếc túi thơm thêu hoa đào quê nhà.","Sổ đã lên ngự án. Tối ấy Xuân Đào sang cung ngươi, khâu cho ngươi chiếc túi thơm thêu hoa đào quê nhà."),o:[
  {n:"Ngồi khâu cùng nàng",f:"stay",wx:"hai chị em gần nhau như thuở mới vào",lx:"một đêm không làm gì khác, người ta bảo ngươi lơ là, tiếng sút",rt:"Hai chị em hát khẽ bài hát làng."},
  {n:"Hỏi nàng muốn gì sau này",wx:"biết lòng nàng",lx:"câu trả lời làm ngươi buồn, lòng nặng trĩu",rt:"Xuân Đào cười: “Muội chưa dám nghĩ.”"},
  {n:"Tặng nàng một món bạc",f:"home",wx:"nàng có vốn phòng thân",lx:"bạc trong hộp vơi đi một khoản",rt:"Xuân Đào không nhận, ngươi phải nhét vào tay nàng."}]},
 s2:{h:"Xuân Đào gầy đi",w:"maid",if:RDW(0),t:"Sự thật chưa ra ánh sáng. Xuân Đào gầy đi từng ngày, còn cung {v} vẫn sai người đi qua cửa phòng nàng mỗi tối.",o:[
  {n:"Đổi chỗ ngủ cho nàng",wx:"nàng ngủ yên hơn",lx:"lo dời chỗ đến rã người; người của {v} sẽ tìm ra",rt:"Xuân Đào ngủ được một đêm trọn."},
  {n:"Đến cung {v} cảnh cáo",need:["v"],sc:1,wx:"{v} lùi một bước",lx:"{v} thêm oán, tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?8:6)},rt:"{v} cười nhạt, nhưng người đi qua cửa không còn nữa.",rf:"{v} cho người tiễn ngươi ra cửa."},
  {n:"Nhờ {mis} che chở nàng",if:CNV_MOK,sc:1,wx:"có người trên bảo vệ nàng",lx:"{mis} không muốn dính, lòng ngươi áy náy vì làm phiền chủ",go:(A,ok)=>{if(ok)BAN_MIS(2)},rt:"{mis} cho Xuân Đào về hầu gần phòng mình.",rf:"{mis} nói: “Ta đã làm đủ rồi.”"}]},
 c1:{h:"Thư từ làng",w:"maid",t:"Mẹ Xuân Đào gửi thư vào cung: nhà có người hỏi cưới, mong con được xuất cung trước Tết.",o:[
  {n:"Góp bạc lo đường xuất cung",f:"home",wx:"Xuân Đào có đường về",lx:"bạc trong hộp vơi đi một khoản lớn",rt:"Người của Nội vụ phủ nhận bạc, ghi tên Xuân Đào vào danh sách xuất cung."},
  {n:"Giữ thư lại, chờ xong việc",f:"stay",wx:"Xuân Đào không bị phân lòng",lx:"giấu thư của mẹ người ta, lòng ngươi áy náy",rt:"Ngươi cất thư vào hộp."},
  {n:"Đọc thư cùng Xuân Đào",wx:"nàng tự chọn",lx:"nàng khóc cả đêm, người ta bảo ngươi khơi chuyện nhà, tiếng sút",rt:"Xuân Đào đọc thư, khóc rồi cười."}]},
 c2:{h:"Thu Cúc ở Tân Giả khố",w:"me",t:"Thu Cúc nay giặt áo ở Tân Giả khố, gầy rộc. Nàng nhờ người nhắn muốn gặp ngươi.",o:[
  {n:"Đến gặp Thu Cúc",sc:1,f:"confess",wx:"Thu Cúc nói điều chưa ai biết",lx:"bị cho là thông đồng với kẻ tội, tiếng ngươi sút",rt:"Thu Cúc nói: “Ta sẽ khai hết. Ta không muốn chết với cái tên của cung {v}.”",rf:"Thu Cúc chỉ khóc, không nói được gì."},
  {n:"Gửi thuốc, không gặp",wx:"Thu Cúc biết ngươi không thù",lx:"tốn bạc mua thuốc; bỏ lỡ điều nàng muốn nói",rt:"Thu Cúc nhận thuốc, nhờ người gửi lại một chữ: «Tạ»."},
  {n:"Không đến",wx:"không dây thêm",lx:"lời Thu Cúc chôn theo nàng, người ta bảo ngươi lạnh lòng, tiếng sút",rt:"Ngươi không đi."}]},
 t1:{h:"Xuân Đào hỏi",w:"maid",t:"Xuân Đào hỏi: “Tỷ muốn muội ở lại hay về?”",o:[
  {n:"Ở lại cùng tỷ",f:"stay",wx:"có người một lòng bên cạnh",lx:"giữ nàng trong nơi nguy hiểm, lòng ngươi áy náy",rt:"Xuân Đào gật đầu, nắm chặt tay ngươi."},
  {n:"Về đi, sống cho mình",f:"home",wx:"nàng được tự do",lx:"ngươi ở lại một mình, mất người canh lưng, tiếng sút",rt:"Xuân Đào ôm ngươi rất lâu."},
  {n:"Tùy muội",wx:"nàng tự quyết",lx:"nàng thấy ngươi lạnh, người ta chê ngươi, tiếng sút",rt:"Xuân Đào im lặng một lúc: “Để muội nghĩ.”"}]},
 x1:{h:"Ngày tuyên án vòng ngọc",w:"maid",t:BAN_T("Nội vụ phủ tuyên án vụ vòng ngọc. Xuân Đào quỳ giữa sân, như ngày đầu bị trói ở sân sau.","Nội vụ phủ tuyên án vụ vòng ngọc. Xuân Đào quỳ giữa sân, như ngày đầu bị trói ở sân sau. Ngươi là tiểu chủ, không xuống sân được: lời ngươi đi qua tờ đóng dấu cung và thái giám cung ngươi."),o:[
  {n:"Đưa Xuân Đào ra trước Nội vụ phủ đòi minh oan",need:["srv"],lx:"thua là cả hai cùng mất",e:["win","lose"],rt:"Nội vụ phủ đọc to: Xuân Đào vô tội.",rf:"Nội vụ phủ giữ nguyên án cũ."},
  {n:"Sai thái giám cung mình mang tờ đòi minh oan cho Xuân Đào",need:["nsrv"],lx:"viết tờ đến kiệt sức; thua là cả hai cùng mất",e:["win","lose"],rt:"Thái giám cung ngươi đọc tờ ấy giữa sân. Nội vụ phủ đọc to: Xuân Đào vô tội.",rf:"Nội vụ phủ nhận tờ, rồi giữ nguyên án cũ."},
  {n:"Xin cho Xuân Đào xuất cung với tên sạch",lx:"bạc lo đường đã bỏ ra; mất người cùng quê bên cạnh, hỏng thì mất hẳn Xuân Đào",e:["mid","lose"],rt:"Tên Xuân Đào được xóa khỏi sổ tội, ghi vào sổ xuất cung.",rf:"Nội vụ phủ không cho xuất cung người còn mang án."},
  {n:"Nhận một phần tội về mình để nàng sạch",need:["srv"],e:"mid",lx:"tên ngươi vào sổ tội, tiếng sút nặng",rt:"Ngươi bước ra quỳ cạnh Xuân Đào."},
  {n:"Viết tờ nhận một phần lỗi về cung mình để nàng sạch",need:["nsrv"],e:"mid",lx:"tên ngươi vào sổ lỗi, tiếng sút; nộp bạc chuộc lỗi thay nàng",rt:"Thái giám cung ngươi đọc tờ ấy giữa sân. Tên ngươi vào sổ lỗi, tên Xuân Đào được xóa."}]}},
 E:{win:{k:1,tag:"Xuân Đào rửa oan, một lòng theo ngươi",w:"maid",t:BAN_T("Xuân Đào được minh oan trước cả Nội vụ phủ. Nàng ở lại trong cung, làm cánh tay của ngươi: đi đâu ngươi có người canh lưng, nói gì ngươi có người tin.","Xuân Đào được minh oan trước cả Nội vụ phủ. Nàng xin về hầu cung ngươi, và từ đó cung ngươi có một người không bao giờ phản."),go:A=>{rdOan(A,"v",6);return [BAN_NT(10),e67srvUp(6)].filter(Boolean).join(" ")}},
  mid:{k:0,tag:"Rửa oan, về quê",w:"maid",t:"Xuân Đào được xóa tên khỏi sổ tội và xuất cung về làng trước Tết. Mỗi mùa đào nở, nàng gửi vào cho ngươi một chiếc khăn thêu."},
  lose:{k:-1,tag:"Mất Xuân Đào",w:"maid",t:"Án giữ nguyên. Xuân Đào bị đưa ra Hoàng lăng coi mộ, xa kinh thành ba ngày đường. Ngươi ở lại, mang theo chiếc túi thơm hoa đào nàng khâu dở.",go:()=>BAN_MIS(-4)}}});
RD97L.push(rdRare({a:"cnv_ban_11",tag:"Thu Cúc tự thú, hai chị em cùng lên",w:"maid",n:"Đưa Thu Cúc đến trước Nội vụ phủ tự thú",
 path:["Đến gặp Thu Cúc","Gửi thuốc, không gặp","Ở lại cùng tỷ","Đọc thư cùng Xuân Đào","Ngồi khâu cùng nàng","Nhờ {mis} che chở nàng"],bad:["Không đến","Giữ thư lại, chờ xong việc","Tùy muội"],x:[()=>S.duc>=RR("cnv_ban_11").bar||S.mat>=RR("cnv_ban_11").bar2,"Đức từ "+RR("cnv_ban_11").bar+" hoặc Tai mắt từ "+RR("cnv_ban_11").bar2],
 t:"Thu Cúc bước vào sân Nội vụ phủ, quỳ cạnh Xuân Đào, khai từng món đồ, từng nén bạc, từng lần cung {v} sai. Cả sân lặng đi. {eun} không ém được nữa. Xuân Đào được minh oan, còn được thưởng vì chịu oan mà không cắn ai; ngươi được ghi công vì đã không bỏ tỷ muội. Từ ngày ấy, hai chị em cùng quê cùng bước lên, và trong cung người ta gọi hai người là «đôi hoa đào».",
 go:A=>{try{rdOan(A,"v",10)}catch(e){}return [BAN_NT(12),e67srvUp(8)].filter(Boolean).join(" ")},rw:"nt_nhuy",ti:"Đôi hoa đào cùng quê"}));
CNV_QFIX("cnv_ban");
