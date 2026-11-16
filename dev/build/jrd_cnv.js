/* ================= jrd_cnv: the four full roads of «Cung nữ tuyển vào cung» (cnv, servant start), chapters .5–.11 (ROAD_MAP.md §4.9) =================
   Pattern = jrd_tt.js. ROAD_MAP §8.4 decision (B3): the road stays 8 chapters; the rise to tiểu chủ happens INSIDE the roads (each road has a
   real path that raises «Hoàng thượng để ý», the game's own rise rule BAL.ntRise then offers the rise; cnv_mat .8 may raise her at once), so
   ms:len14 is no longer a middle chapter. Every chapter reads right whether she is still a maid or already raised (S.srv.risen); if she is
   still a maid when the road ends, chapter 12 is «Từ kẻ hầu thành tiểu chủ» (jend14.js). */

/* ---------- cnv_chu · Bí mật của chủ nhân ---------- */
/* BAL.road keys needed: none (deadlines are worded in the story: "trước khi trời sáng", "trước rằm").
   Story (one secret in layers): the musk {mis} hid left Thái y viện under the name of {v}'s palace; Ôn thái y (story-only NPC) warned {mis}
   in the letter she burned; {mis} stole the packet on its way to the kitchen of a pregnant consort (the good deed she never told, because
   telling means confessing how she lost her own child to the same musk). Half of it leaks (.8), the Trung cung asks (.9), Thận hình ty
   questions (.10), the Emperor decides (.11).
   Servant start (ROAD_MAP §8.4): every chapter reads right whether she is still a maid (isSrv) or already raised (S.srv.risen; {mis} is then
   her former mistress, srvM keeps her). Maid-only effects (tin, nt, e67merit) only through need:["srv"] options or CHU_MIS / CHU_NT. */
const CHU_R=()=>!!(S.srv&&S.srv.risen);
const CHU_T=(a,b)=>()=>CHU_R()?b:a;/* text: maid wording / consort wording */
const CHU_Q=()=>{try{return qOn()?"Hoàng hậu":"Thái hậu"}catch(e){return"Hoàng hậu"}};/* who holds the inner palace */
/* {mis} relation, real both ways (OD:L1247); as a maid also Chủ tin */
function CHU_MIS(n){try{const m=srvMis67();if(m&&m.alive){relAdd(S,m,n);if(n<0&&typeof oanAdd==="function")oanAdd(m,S,-n)}
 if(typeof isSrv==="function"&&isSrv())S.tin=Math.max(0,Math.min(100,(S.tin||0)+n))}catch(e){}return""}
/* the Emperor's eye: Hoàng thượng để ý while a maid (BAL.ntRise then offers the rise), Sủng once raised */
function CHU_NT(n){try{if(typeof isSrv==="function"&&isSrv()){S.nt=Math.max(0,Math.min(100,(S.nt||0)+n));return `Hoàng thượng để ý +${n}.`}apply({sung:Math.round(n/3)});return `Sủng +${Math.round(n/3)}.`}catch(e){return""}}
const CHU_E=()=>CHU_R()?S.sung:S.nt;/* odds term for options that reach the Emperor */

rdDef("cnv_chu",5,{t:"Gói thuốc",w:"doc",sj:"gói thuốc của {mis}",cast(A){return rdCast(A,["v"])},
 g:"Gói xạ hương {mis} giấu vẫn nằm đó. Ở Thái y viện, mỗi lạng xạ hương xuất kho đều ghi tên cung nhận. Biết gói thuốc từ đâu ra là biết bí mật này nặng đến đâu.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chìa khóa rương thuốc",w:"mis",if:()=>rdPrev()==="win",t:CHU_T("Từ đêm ấy {mis} coi ngươi là tâm phúc. Nàng giao ngươi giữ chìa khóa rương thuốc, dặn: “Gói giấy dầu ở đáy rương, không ai được đụng, kể cả ngươi.”","Ngươi đã rời cung {mis}, nhưng nàng vẫn coi ngươi là người duy nhất biết chuyện. Nàng sai người lén đưa sang chìa khóa rương thuốc: “Giữ hộ ta. Cung ta không còn ai đáng tin.”"),o:[
  {n:"Giữ chìa khóa, không mở rương",c:{},w:{duc:2},wx:"{mis} thêm tin ngươi",lx:"không biết trong rương có gì",go:()=>CHU_MIS(4),rt:"Ngươi đeo chìa khóa vào cổ, chưa từng tra vào ổ."},
  {n:"Mở rương xem gói giấy dầu",c:{},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"biết gói thuốc ghi tên cung nào",l:{danh:-1},lx:"{mis} thấy dấu niêm bị động",go:(A,ok)=>{if(!ok)CHU_MIS(-6)},rt:"Giấy dầu có dấu đỏ của Thái y viện, ghi «xuất cho cung {v}».",rf:"Dấu niêm rách một góc. Hôm sau {mis} nhìn ngươi khác hẳn."},
  {n:"Xin {mis} cho biết thật",c:{suc:-2},o:()=>40+S.duc/4,w:{tamco:1},sc:1,wx:"nghe từ chính miệng nàng",l:{},lx:"{mis} cho là ngươi tò mò",go:(A,ok)=>CHU_MIS(ok?5:-4),rt:"{mis} chỉ nói: “Thứ này không phải của ta. Ta giữ nó để nó không đến tay người khác.”",rf:"{mis} lạnh giọng: “Giữ chìa khóa là đủ.”"}]},
 s2:{h:"Kẻ đã nói",w:"mis",if:()=>rdPrev()==="win2",t:CHU_T("Ngươi đã trình chuyện lên trên, nhưng không đủ chứng cứ để động đến {mis}. Nội vụ phủ trả ngươi về hầu nàng như cũ, và nàng biết chính ngươi đã nói.","Ngươi đã trình chuyện lên trên. Nay ngươi là tiểu chủ, còn {mis}, chủ cũ của ngươi, gặp ngươi ở đâu cũng quay mặt đi."),o:[
  {n:"Quỳ xin {mis} tha lỗi",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{mis} nguôi một phần",l:{danh:-1},lx:"bị cho là kẻ hai lòng",go:(A,ok)=>CHU_MIS(ok?6:-3),rt:"{mis} im rất lâu rồi nói: “Ngươi nói vì ngươi sợ. Ta hiểu sợ là gì.”",rf:"{mis} bước qua, không nhìn."},
  {n:"Lặng lẽ tìm thêm chứng cứ",c:{bac:-15},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"có manh mối về gói thuốc",l:{},lx:"bị {mis} bắt gặp",go:(A,ok)=>{if(!ok)CHU_MIS(-5)},rt:"Một y đồng nói gói xạ hương ấy xuất kho dưới tên cung {v}.",rf:"{mis} bắt gặp ngươi lục rương."},
  {n:"Báo tiếp lên trên mỗi điều thấy",c:{duc:-2},w:{hh:4},f:"tell",wx:"Trung cung nhớ ngươi",lx:"{mis} coi ngươi là kẻ phản",go:()=>CHU_MIS(-8),rt:"Ngươi gửi thêm một lời qua người của Trung cung."}]},
 s3:{h:"Mẩu giấy trong gối",w:"me",if:()=>rdPrev()!=="win"&&rdPrev()!=="win2",t:"Ngươi đã tránh xa chuyện ấy. Nhưng tối qua có ai nhét vào gối ngươi một mẩu giấy: «Xạ hương ở cung {mis} là của ai, ngươi biết.»",o:[
  {n:"Đốt mẩu giấy",c:{},w:{duc:2},wx:"không để lại dấu",lx:"kẻ viết vẫn rình đâu đó",rt:"Ngươi đốt mẩu giấy trong lò, chờ tro nguội mới ngủ."},
  {n:"Đem mẩu giấy đến {mis}",c:{suc:-2},o:()=>40+S.duc/4,w:{tamco:1},sc:1,wx:"{mis} biết ngươi đứng về phía nàng",l:{},lx:"{mis} nghi chính ngươi viết",go:(A,ok)=>CHU_MIS(ok?8:-5),rt:"{mis} đọc, tay run: “Có kẻ biết rồi.”",rf:"{mis} nhìn nét chữ rồi nhìn ngươi."},
  {n:"Lần ra kẻ nhét giấy",c:{bac:-15},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"biết ai đang rình",l:{danh:-1},lx:"kẻ ấy biết ngươi dò",rt:"Nét chữ là của một cung nữ áo xanh, người hay qua lại cung {v}.",rf:"Không ai nhận."}]},
 c1:{h:"Sổ xuất kho Thái y viện",w:"doc",t:"Mỗi lạng xạ hương ra khỏi Thái y viện đều phải ghi sổ. Một y đồng nói có thể cho ngươi xem, nếu có bạc, và phải trước khi sổ tháng này nộp lên viện phán.",o:[
  {n:"Đưa bạc xem sổ",c:{bac:-30},o:()=>50+S.mat*4,w:{mat:1},sc:1,f:"know",wx:"thấy tận mắt tên cung nhận thuốc",l:{danh:-2},lx:"y đồng khai ra ngươi",rt:"Sổ ghi: ba lạng xạ hương xuất cho cung {v}; người ký nhận thay là Ôn thái y.",rf:"Viện phán bắt gặp y đồng, hắn khai có người trong cung hỏi sổ."},
  {n:"Hỏi khéo một thái y quen",c:{suc:-2},o:()=>40+S.tai/4,w:{tamco:1},sc:1,wx:"biết chuyện mà không để dấu",l:{},lx:"thái y lảng đi",rt:"Thái y thở dài: “Hỏi Ôn thái y. Ông ấy ký sổ tháng ấy.”",rf:"Thái y nói không nhớ."},
  {n:"Thôi, không dò nữa",c:{},w:{duc:2},wx:"không dính vào Thái y viện",lx:"manh mối nguội dần",rt:"Ngươi quay về, không hỏi ai."}]},
 c2:{h:"{v} hỏi sổ thuốc",w:"v",need:["v"],t:"{v} sai người đến Thái y viện hỏi: tháng trước có ai tra sổ xạ hương không. Nàng đang tìm gói thuốc thất lạc.",o:[
  {n:"Xóa dấu chân mình",c:{bac:-20},w:{mat:1},wx:"không ai biết ngươi đã đến viện",lx:"tốn bạc, y đồng vẫn nhớ mặt",rt:"Y đồng nhận bạc, quên luôn ngày ngươi đến."},
  {n:"Để mặc {v} dò",c:{},w:{duc:1},wx:"không phải làm gì thêm",lx:"{v} để mắt đến cung {mis}",go:A=>{rdOan(A,"v",4)},rt:"Người của {v} đi một vòng, ghi chép rồi về."},
  {n:"Thả tin giả cho {v}",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} đi tìm sai chỗ",l:{danh:-2},lx:"{v} biết có người giở trò",go:(A,ok)=>{rdOan(A,"v",ok?6:8)},rt:"{v} cho lục cả kho hương của Ngự thiện phòng.",rf:"{v} cười nhạt: “Kẻ nào bày trò này, ta sẽ biết.”"}]},
 t1:{h:"Ôn thái y",w:"doc",t:"Ngươi gặp Ôn thái y ở hành lang Thái y viện. Ông già run tay, nói khẽ: “Bức thư {mis} đốt là của ta. Ta xin ngươi đừng hỏi nữa.”",o:[
  {n:"Hứa giữ kín cho ông",c:{},w:{duc:3},f:"doc",wx:"Ôn thái y nợ ngươi một lần",lx:"điều ông biết vẫn khóa trong miệng ông",rt:"Ông cúi đầu cảm ơn, đi rất nhanh."},
  {n:"Ép ông nói hết",c:{suc:-3},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"know",wx:"biết thêm nửa câu chuyện",l:{duc:-3},lx:"ông sợ, xin cáo bệnh",rt:"Ông nói: gói thuốc ra khỏi viện dưới tên cung {v}, nhưng đến tay {mis} bằng đường khác. Ông chỉ dám nói đến đó.",rf:"Ông ôm ngực, gọi người đỡ về."},
  {n:"Báo {mis} rằng ông đã nói",c:{},w:{tamco:1},wx:"{mis} biết ngươi không giấu nàng",lx:"Ôn thái y không còn tin ngươi",go:()=>CHU_MIS(5),rt:"{mis} gật đầu: “Ông ấy là người tốt. Đừng làm khó ông.”"}]},
 x1:{h:"Gói thuốc trong tay ai",w:"mis",t:"Giờ ngươi biết gói xạ hương ra khỏi Thái y viện dưới tên cung {v}. Đem điều ấy về đâu?",o:[
  {n:"Nói với {mis} điều ngươi biết",c:{suc:-4},o:A=>35+A.sc*8+(A.f.know?10:0)+S.duc/6,e:["win","lose"],rt:"{mis} nắm tay ngươi: “Vậy ngươi đã hiểu vì sao ta giấu.”",rf:"{mis} tái mặt: “Ai cho ngươi đi dò?”"},
  {n:"Giữ trong lòng, chép lại một bản",c:{},w:{mat:1},e:"mid",lx:"một mình gánh chuyện",rt:"Ngươi chép tên cung {v} vào mảnh lụa, khâu vào lót áo."},
  {n:"Lén cho {v} biết có người đã biết",c:{duc:-3},o:()=>40+S.tamco/3,e:["mid","lose"],go:A=>{rdOan(A,"v",6)},rt:"{v} thôi sai người dò hỏi, nhưng nhìn ngươi như nhìn cây gai.",rf:"{v} lần ra chính ngươi gửi lời."}]}},
 E:{win:{k:1,tag:"Người cùng giữ bí mật",w:"mis",t:"{mis} kể ngươi nghe nửa câu chuyện: gói xạ hương ấy nàng lấy được từ tay người khác, không phải để dùng. Nửa kia nàng chưa nói, nhưng từ nay ngươi là người duy nhất nàng nói cùng.",fx:{tamco:2,danh:2},go:()=>{CHU_MIS(10);return e67merit(4)}},
  mid:{k:0,tag:"Biết mà im",t:"Ngươi biết gói thuốc từ đâu ra. Chưa ai biết ngươi biết.",fx:{mat:1}},
  lose:{k:-1,tag:"{mis} nghi ngươi",w:"mis",t:"{mis} cho là ngươi dò chuyện để bán. Từ nay nàng khóa rương, đổi chỗ giấu, và không gọi ngươi vào phòng trong nữa.",fx:{danh:-2},go:()=>CHU_MIS(-10)}}});

rdDef("cnv_chu",6,{t:"Kẻ dò hỏi",w:"v",sj:"kẻ dò hỏi chuyện cung {mis}",cast(A){return rdCast(A,["v"])},
 g:"Cung {v} đã biết mất một gói xạ hương. Người của nàng bắt đầu dò khắp nơi: ai trực đêm ấy, ai dọn phòng, ai biết gì. Giữ miệng mình, và miệng người quanh mình.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cung nữ áo xanh",w:"maid",if:RDW(1),t:CHU_T("Từ khi {mis} kể ngươi nửa câu chuyện, nàng hay gọi ngươi vào nói riêng. Cũng từ đó, một cung nữ áo xanh của cung {v} sáng nào cũng ngồi cạnh ngươi ở giếng nước.","Từ khi {mis} kể ngươi nửa câu chuyện, nàng hay sai người mời ngươi sang uống trà. Cũng từ đó, một cung nữ áo xanh xin vào hầu cung ngươi, nói là Nội vụ phủ phân xuống."),o:[
  {n:"Làm như không biết, nói chuyện vặt",c:{},w:{tamco:1},wx:"nàng không moi được gì",lx:"nàng vẫn ngồi đó mỗi ngày",rt:"Ngươi kể chuyện quê, chuyện giặt áo, chuyện mưa."},
  {n:"Hỏi ngược lại nàng",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"own",wx:"biết nàng là người của ai",l:{},lx:"nàng biết ngươi đã đề phòng",rt:"Nàng lỡ miệng nhắc tên cung {v}.",rf:"Nàng cười, đổi chuyện."},
  {n:"Báo {mis} có kẻ rình",c:{},w:{duc:1},wx:"{mis} thêm tin ngươi",lx:"cả cung căng như dây đàn",go:()=>CHU_MIS(5),rt:"{mis} gật đầu: “Để nó rình. Ta biết rồi.”"}]},
 s2:{h:"Nén bạc ở giếng nước",w:"maid",if:RDW(0),t:CHU_T("{mis} giữ ngươi ở xa. Một sáng ở giếng nước, cung nữ áo xanh của cung {v} dúi vào tay ngươi một nén bạc: “Kể ta nghe đêm ấy chủ ngươi đốt gì.”","{v} tự mời ngươi sang uống trà, rót cho ngươi chén đầu, hỏi như vô tình: “Muội từng hầu {mis}, hẳn biết nàng hay mất ngủ vì chuyện gì?”"),o:[
  {n:"Nhận bạc, kể chuyện vô hại",c:{duc:-3},w:{bac:20},wx:"có bạc, họ tưởng ngươi đã ngả",lx:"một lần nhận là có lần sau",rt:"Ngươi kể {mis} hay đau đầu, hay đốt trầm."},
  {n:"Từ chối thẳng",c:{},w:{duc:2},wx:"giữ được mình",lx:"cung {v} ghi tên ngươi",go:A=>{rdOan(A,"v",4)},rt:"Ngươi đặt lại nén bạc, đứng dậy."},
  {n:"Giả nhận, quay về báo {mis}",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"own",wx:"{mis} biết ngươi một lòng",l:{danh:-2},lx:"bị nghi là kẻ hai mang",go:(A,ok)=>CHU_MIS(ok?8:-4),rt:"{mis} nghe xong, lần đầu mỉm cười với ngươi.",rf:"Có người thấy ngươi nhận bạc, chạy đi kể trước."}]},
 c1:{h:"Đôi hoa tai bạc",w:"maid",t:CHU_T("Một cung nữ cùng phòng có thêm đôi hoa tai bạc mới. Nàng tránh mắt ngươi.","Một cung nữ trong cung ngươi có thêm đôi hoa tai bạc mới. Nàng tránh mắt ngươi."),o:[
  {n:"Hỏi thẳng nàng",c:{},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"nàng khai đã bán tin gì",l:{},lx:"nàng chạy đi mách",rt:"Nàng khóc: chỉ kể giờ ngươi trực đêm.",rf:"Nàng chối, rồi xin đổi chỗ."},
  {n:"Theo xem nàng gặp ai",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"own",wx:"biết đường tin đi",l:{},lx:"bị nàng phát hiện",rt:"Nàng đưa tin cho cung nữ áo xanh ở sau giả sơn.",rf:"Nàng ngoái lại, thấy ngươi."},
  {n:"Cho nàng bạc gấp đôi để quay về",c:{bac:-30},w:{duc:1},wx:"đường rò thành của ngươi",lx:"tốn bạc, nàng có thể ăn hai đầu",rt:"Nàng nhận bạc, dập đầu."}]},
 c2:{h:"{v} ra mặt",w:"v",need:["v"],t:"{v} chặn ngươi ở cửa ngự hoa viên: “Thứ gì của cung ta, sớm muộn cũng về cung ta. Ngươi nên nghĩ cho mình.”",o:[
  {n:"Cúi đầu, không đáp",c:{},w:{duc:2},wx:"không để lọt một lời",lx:"{v} cho là ngươi sợ",rt:"{v} phẩy tay áo bỏ đi."},
  {n:"Đáp cứng: không biết gì",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"{v} biết ngươi không dễ dọa",l:{danh:-2},lx:"{v} nổi giận",go:(A,ok)=>{rdOan(A,"v",ok?5:8)},rt:"{v} nhìn ngươi một lúc, rồi cười: “Được.”",rf:"{v} tát ngươi trước mặt người qua lại."},
  {n:"Hỏi {v} muốn đổi gì",c:{duc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"biết {v} sợ điều gì",l:{},lx:"{v} nghĩ ngươi bán được",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} buột miệng: “Chỉ cần gói giấy dầu, không cần gì khác.”",rf:"{v} không đáp, chỉ nhớ mặt ngươi."}]},
 t1:{h:"Ai đứng sau cung nữ áo xanh",w:"eun",t:"Ngươi lần ra: tin cung nữ áo xanh gom được đều qua tay một thái giám dưới quyền {eun} trước khi đến cung {v}. Nghĩa là Nội vụ phủ cũng đã nghe.",o:[
  {n:"Mua chuộc thái giám ấy",c:{bac:-40},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"tin đi qua tay hắn sẽ bị lọc",l:{},lx:"hắn ăn bạc rồi báo lên",rt:"Hắn nhận bạc, hứa “chép sai vài chữ”.",rf:"Hắn nhận bạc, rồi báo lại {eun}."},
  {n:"Báo {mis} đề phòng Nội vụ phủ",c:{},w:{tamco:1},wx:"{mis} kịp đổi chỗ giấu",lx:"Nội vụ phủ thấy cung {mis} giữ kẽ",go:()=>CHU_MIS(4),rt:"{mis} dời gói thuốc ra khỏi rương ngay đêm ấy."},
  {n:"Để yên, giả như chưa biết",c:{},w:{duc:1},wx:"không đánh động ai",lx:"đường tin vẫn chảy",rt:"Ngươi im lặng quan sát."}]},
 x1:{h:"Bắt kẻ dò hỏi",w:"maid",t:"Đêm nay cung nữ áo xanh hẹn gặp người mua tin ở góc sân sau. Bắt tận tay, cho nàng mang tin giả về, hay để yên?",o:[
  {n:"Bắt tận tay, giao {mis} xử",c:{suc:-5},o:A=>40+A.sc*8+S.mat*4,e:["win","lose"],rt:"Cung nữ áo xanh bị bắt cùng mẩu giấy ghi giờ trực của cả cung.",rf:"Nàng chạy thoát, chỉ còn lời ngươi nói."},
  {n:"Cho nàng mang tin giả về",c:{},lx:"kẻ dò hỏi vẫn ở lại trong cung",o:A=>40+(A.f.own?15:0)+S.tamco/4,e:["win","mid"],rt:"Cung {v} tin rằng gói thuốc đã bị đốt.",rf:"Tin giả bị nghi, nhưng nàng không moi thêm được gì."},
  {n:"Để yên, khép kín cửa",c:{},w:{duc:2},e:"mid",lx:"kẻ dò hỏi vẫn ở đó",rt:"Ngươi khóa cửa sân sau, đi ngủ sớm."}]}},
 E:{win:{k:1,tag:"Kẻ dò hỏi bị bắt",w:"mis",t:"Người của {v} bị bắt hoặc bị lừa. {mis} biết, trong lúc cả cung chao đảo, ngươi là người đứng giữ cửa.",fx:{danh:4},go:A=>{rdOan(A,"v",8);CHU_MIS(8);return e67merit(4)}},
  mid:{k:0,tag:"Cửa đã khép",t:"Tin không lọt thêm, nhưng kẻ dò hỏi vẫn còn đó, và {v} vẫn chưa thôi tìm.",fx:{mat:1}},
  lose:{k:-1,tag:"Tin đã lọt",w:"v",t:"{v} biết đêm ấy ai trực ở cung {mis}. Từ nay ánh mắt nàng dừng trên ngươi mỗi khi gặp.",fx:{danh:-3},go:A=>{rdOan(A,"v",6)}}}});

rdDef("cnv_chu",7,{t:"Chủ thử lòng",w:"mis",sj:"phép thử của {mis}",cast(A){return rdCast(A,["v"])},
 g:"{mis} không tin ai trọn vẹn, kể cả ngươi. Nàng bày một phép thử: cho ngươi biết một điều, rồi xem điều ấy có lọt ra ngoài không.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đứa con năm ngoái",w:"mis",if:RDW(1),t:CHU_T("Sau vụ cung nữ áo xanh, {mis} gọi ngươi vào, đóng cửa, kể: “Năm ngoái ta mất một đứa con. Trong lò hương phòng ta có xạ hương.” Nàng dừng ở đó, nhìn ngươi.","Sau vụ cung nữ áo xanh, {mis} sang tận cung ngươi, cho người hầu lui hết, kể: “Năm ngoái ta mất một đứa con. Trong lò hương phòng ta có xạ hương.” Nàng dừng ở đó, nhìn ngươi."),o:[
  {n:"Hỏi ai đã làm",c:{},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"nghe tên kẻ hại nàng",l:{},lx:"{mis} cho là ngươi hỏi nhiều",go:(A,ok)=>{if(!ok)CHU_MIS(-3)},rt:"{mis} không nói tên, chỉ nhìn về phía cung {v}.",rf:"{mis} quay mặt đi."},
  {n:"Quỳ xuống nghe, không hỏi",c:{},w:{duc:2},f:"loyal",wx:"{mis} thấy ngươi biết giữ",lx:"chỉ biết được nửa chuyện",go:()=>CHU_MIS(5),rt:"{mis} đặt tay lên vai ngươi rất lâu."},
  {n:"Khuyên nàng tâu lên",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"{mis} nghĩ đến lẽ phải",l:{},lx:"{mis} giận ngươi ngây thơ",go:(A,ok)=>CHU_MIS(ok?3:-5),rt:"{mis} lắc đầu: “Chưa đủ chứng. Nói ra là ta chết trước.”",rf:"{mis} cười buồn: “Ngươi chưa biết trong cung này lời nói rẻ đến đâu.”"}]},
 s2:{h:"Lời đồn về ngươi",w:"mis",if:RDW(0),t:"{mis} gọi ngươi đến, giọng lạnh: “Có người nói ngươi đã kể chuyện đêm ấy. Ta muốn nghe từ miệng ngươi.”",o:[
  {n:"Thề chưa nói với ai",c:{},o:()=>40+S.duc/4,w:{duc:1},sc:1,f:"loyal",wx:"{mis} tạm tin",l:{},lx:"{mis} không tin lời thề",go:(A,ok)=>CHU_MIS(ok?5:-4),rt:"{mis} gật đầu: “Ta sẽ xem.”",rf:"{mis} cười nhạt: “Ai cũng thề.”"},
  {n:"Kể thật mình từng bị dò",c:{},w:{tamco:1},wx:"{mis} biết ai đang nhắm vào nàng",lx:"{mis} biết ngươi từng giấu nàng",go:()=>CHU_MIS(2),rt:"{mis} nghe hết, im lặng."},
  {n:"Im lặng chịu trách",c:{suc:-3},w:{duc:2},wx:"không thêm lời nào để bị bắt bẻ",lx:"{mis} cho là ngươi có tật",go:()=>CHU_MIS(-3),rt:"Ngươi cúi đầu suốt buổi."}]},
 c1:{h:"Lời đồn giả",w:"mis",t:"Hôm sau cả cung xôn xao: «{mis} giấu thư tình trong rương». Hôm qua, chỉ có ngươi nghe {mis} nhắc đến cái rương. Hoặc đó là phép thử.",o:[
  {n:"Đi tìm gốc lời đồn",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"chứng minh không phải ngươi",l:{},lx:"càng dò càng bị nghi",rt:"Lời đồn bắt đầu từ chính một cung nữ {mis} vừa dặn riêng.",rf:"Không ai nhận đã nói trước."},
  {n:"Đến thưa với {mis}: không phải ngươi",c:{},o:()=>40+S.duc/4,w:{duc:1},sc:1,f:"loyal",wx:"{mis} thấy ngươi thẳng",l:{},lx:"tự đến là tự nhận nghi",go:(A,ok)=>CHU_MIS(ok?5:-3),rt:"{mis} cười: “Ta biết. Ta chỉ xem ngươi có đến không.”",rf:"{mis} chỉ nói: “Lui ra.”"},
  {n:"Im lặng, để thời gian nói",c:{},w:{tamco:1},wx:"không tự đưa mình vào bẫy",lx:"lời đồn sống thêm vài ngày",rt:"Ngươi làm việc như thường."}]},
 c2:{h:"Hộp gấm niêm phong",w:"mis",t:"{mis} đưa ngươi một hộp gấm niêm phong: “Đem đến chỗ Ôn thái y, trước giờ Thái y viện đóng cửa. Không được mở.”",o:[
  {n:"Đem đi, không mở",c:{suc:-2},w:{duc:2},f:"loyal",wx:"qua phép thử",lx:"không biết mình mang gì",go:()=>CHU_MIS(6),rt:"Ôn thái y nhận hộp, mở ra: chỉ là một gói trà. Ông cười: “Nàng thử ngươi đấy.”"},
  {n:"Lén mở xem",c:{},o:()=>45+S.tamco/4,w:{mat:1},sc:1,wx:"biết hộp chỉ là phép thử",l:{},lx:"dấu niêm không còn như cũ",go:(A,ok)=>{if(!ok)CHU_MIS(-8)},rt:"Trong hộp chỉ có trà. Ngươi niêm lại khéo đến mức không ai nhận ra.",rf:"Niêm bị lệch, Ôn thái y nhìn thấy."},
  {n:"Hỏi vì sao phải giấu",c:{},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"{mis} nói thật một phần",l:{},lx:"{mis} cho là ngươi cãi",go:(A,ok)=>CHU_MIS(ok?3:-4),rt:"{mis} nói: “Vì ta muốn biết ngươi có hỏi không. Ngươi đã hỏi.”",rf:"{mis} giật lại hộp, sai người khác."}]},
 t1:{h:"Lý do của phép thử",w:"mis",t:"{mis} thú nhận: những việc nguy nàng từng sai ngươi đều là phép thử. “Ta chưa từng định hại ai. Ta chỉ cần biết ai sẽ làm khi được sai.”",o:[
  {n:"Giận vì bị thử",c:{},w:{tamco:2},wx:"{mis} biết ngươi không phải con rối",lx:"chủ tớ xa thêm một bước",go:()=>CHU_MIS(-4),rt:"Ngươi đáp: “Lòng người không phải để thử.”"},
  {n:"Hiểu cho nàng",c:{},w:{duc:3},f:"loyal",wx:"{mis} nhẹ lòng",lx:"chấp nhận còn bị thử",go:()=>CHU_MIS(6),rt:"{mis} thở dài: “Ở đây, không thử thì chết.”"},
  {n:"Hỏi gói thuốc thật ra để làm gì",c:{suc:-2},o:()=>40+S.duc/4,w:{mat:1},sc:1,f:"know",wx:"biết gói thuốc là chứng cứ",l:{},lx:"{mis} đóng lòng lại",rt:"{mis} nói: “Nó là thứ đã giết con ta. Ta giữ để có ngày đặt nó trước mặt kẻ đã làm.”",rf:"{mis} nói: “Chưa đến lúc.”"}]},
 x1:{h:"Phép thử cuối",w:"mis",t:"{mis} để gói xạ hương trên bàn rồi ra ngoài. Cửa không khóa. Ngoài sân, người của cung {v} đang đi qua.",o:[
  {n:"Ngồi canh gói thuốc đến khi chủ về",c:{suc:-4},o:A=>45+A.sc*8+(A.f.loyal?10:0),e:["win","mid"],rt:"{mis} về, thấy ngươi vẫn ngồi đó, mắt đỏ vì thức.",rf:"Ngươi thiếp đi lúc gần sáng. Gói thuốc còn đó, nhưng {mis} thấy ngươi ngủ."},
  {n:"Cất gói thuốc vào chỗ kín",c:{},lx:"tay ngươi chạm vào gói thuốc",o:A=>40+S.tamco/4+A.sc*6,e:["win","lose"],rt:"{mis} về, không thấy gói thuốc, nhìn ngươi. Ngươi chỉ chỗ. Nàng gật đầu: “Ngươi nghĩ trước ta một bước.”",rf:"{mis} về, không thấy gói thuốc, cho là ngươi định lấy."},
  {n:"Đem trả gói thuốc cho Thái y viện",c:{duc:-1},o:()=>40+S.duc/5,e:["mid","lose"],go:()=>CHU_MIS(-6),rt:"Thái y viện nhận lại, không hỏi. {mis} mất chứng cứ nhưng không mất mạng.",rf:"Viện phán giữ gói thuốc lại, ghi tên cung {mis}."}]}},
 E:{win:{k:1,tag:"Qua phép thử",w:"mis",t:"{mis} kể hết: xạ hương đã giết đứa con của nàng năm ngoái, và gói này là chứng cứ duy nhất nàng có. Từ nay nàng không thử ngươi nữa.",fx:{danh:2,tamco:1},go:()=>{CHU_MIS(12);return e67merit(5)}},
  mid:{k:0,tag:"Nửa tin nửa ngờ",t:"{mis} tin ngươi giữ được miệng, nhưng chưa tin ngươi giữ được việc.",fx:{duc:1}},
  lose:{k:-1,tag:"Trượt phép thử",w:"mis",t:"{mis} cho là ngươi rắp tâm lấy gói thuốc. Nàng chuyển ngươi ra xa, và đổi người giữ chìa khóa.",fx:{danh:-2},go:()=>CHU_MIS(-12)}}});

rdDef("cnv_chu",8,{t:"Bí mật lộ một nửa",w:"eun",sj:"lời đồn về xạ hương ở cung {mis}",cast(A){return rdCast(A,["v"])},
 g:"Lời đồn đến tai Trung cung: «cung {mis} có xạ hương». Chỉ một nửa sự thật lọt ra, nửa tệ nhất. Trước khi trời sáng, Nội vụ phủ sẽ khám cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin báo nửa đêm",w:"eun",if:RDW(1),t:()=>`{mis} đã tin ngươi trọn. Nửa đêm, một tiểu thái giám chạy đến báo: sáng mai Nội vụ phủ khám cung {mis}, theo lệnh ${CHU_Q()}. Gói thuốc vẫn ở chỗ cũ.`,o:[
  {n:"Mang gói thuốc ra khỏi cung",c:{suc:-3},o:()=>40+S.mat*5,w:{tamco:2},sc:1,f:"hide",wx:"gói thuốc không còn ở cung {mis}",l:{danh:-3},lx:"bị bắt đang mang xạ hương",rt:"Ngươi giấu gói thuốc trong giỏ đồ giặt, đưa ra khỏi cung trước canh tư.",rf:"Thị vệ gác cửa nhìn giỏ đồ rất lâu, nhớ mặt ngươi."},
  {n:"Giấu vào chỗ không ai khám",c:{},o:()=>45+S.tamco/4,w:{mat:1},sc:1,f:"hide",wx:"gói thuốc vẫn trong tầm tay",l:{},lx:"chỗ giấu không chắc",rt:"Ngươi nhét gói thuốc vào ruột chiếc gối thêu của {mis}.",rf:"Chỗ giấu ngươi chọn, Nội vụ phủ nào cũng biết."},
  {n:"Khuyên {mis} tự đem nộp trước",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"clean",wx:"không còn gì để bị khám ra",l:{},lx:"{mis} cho là ngươi bỏ nàng",go:(A,ok)=>CHU_MIS(ok?2:-6),rt:"{mis} nghĩ rất lâu: “Nếu nộp, ta phải nói nó từ đâu.”",rf:"{mis} hất tay ngươi ra."}]},
 s2:{h:"Ánh mắt cả cung",w:"mis",if:RDW(0),t:"Cả cung đồn có kẻ từng hầu cung {mis} đã khai chuyện xạ hương. Mọi ánh mắt đổ về ngươi, và sáng mai Nội vụ phủ khám cung.",o:[
  {n:"Đến gặp {mis} trước khi ai khác",c:{suc:-2},o:()=>40+S.duc/4,w:{duc:1},sc:1,wx:"{mis} nghe ngươi trước",l:{},lx:"{mis} đã tin lời đồn",go:(A,ok)=>CHU_MIS(ok?6:-4),rt:"{mis} nghe xong, nói: “Không phải ngươi. Ta biết là ai.”",rf:"{mis} không cho ngươi vào."},
  {n:"Tìm ra kẻ thật sự đã nói",c:{bac:-20},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"biết lời đồn đi từ cung {v}",l:{},lx:"tốn bạc mà không ra",rt:"Lời đồn đi ra từ cung {v}, qua miệng cung nữ áo xanh.",rf:"Ai cũng nói nghe người khác kể."},
  {n:"Xin nghỉ ốm tránh mặt",c:{},w:{suc:3},wx:"tránh được bão miệng",lx:"vắng mặt là có tật",rt:"Ngươi nằm trong phòng, nghe tiếng bàn tán ngoài sân."}]},
 c1:{h:"Đoàn khám cung",w:"eun",t:CHU_T("Thái giám của {eun} lục từng rương. Một người dừng lại trước chỗ ngươi ngủ.","Đoàn khám cung đến cả cung ngươi, vì ngươi từng là người cung {mis}. Một thái giám của {eun} dừng lại trước rương áo của ngươi."),o:[
  {n:"Đứng yên cho khám",c:{},w:{duc:2},wx:"không có gì phải giấu",lx:"đồ riêng bị lật tung",rt:"Hắn lật hết, không thấy gì."},
  {n:"Dúi bạc cho thái giám",c:{bac:-30},o:()=>50+S.mat*3,w:{tamco:1},sc:1,wx:"hắn khám qua loa",l:{danh:-2},lx:"hắn báo có người đút lót",rt:"Hắn khám qua loa rồi đi.",rf:"Hắn cầm bạc, ghi luôn vào sổ: «có người lo lót»."},
  {n:"Hỏi có lệnh bằng giấy chưa",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"đoàn khám phải giữ phép",l:{},lx:"bị cho là chống lệnh",rt:"Hắn lúng túng, chỉ khám lướt.",rf:"Hắn đọc lệnh to cho cả sân nghe."}]},
 c2:{h:"{v} châm dầu",w:"v",need:["v"],t:()=>`{v} đến thỉnh an ${CHU_Q()}, buột miệng: “Nghe nói người trực đêm ở cung {mis} biết hết.”`,o:[
  {n:"Xin vào thỉnh an cùng lúc, đối mặt",c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"lời {v} bị chặn ngay",l:{danh:-2},lx:"bị cho là hỗn",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"Ngươi thưa đúng một câu, {v} không đáp được.",rf:"Ngươi bị cho lui ra ngoài cửa."},
  {n:"Nhờ người nói đỡ",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"có người đỡ lời",l:{},lx:"người nói đỡ cũng bị nghi",rt:"Một nữ quan cũ nói: người trực đêm đâu biết gì.",rf:"Không ai dám mở miệng."},
  {n:"Để mặc {v} nói",c:{},w:{duc:1},wx:"không bị kéo vào cãi",lx:"lời {v} ở lại trong tai Trung cung",go:A=>{rdOan(A,"v",3)},rt:"Ngươi không làm gì."}]},
 t1:{h:"Trung cung cho gọi",w:"hh",need:["hh"],t:"Hoàng hậu {hh} cho gọi ngươi riêng: “Bản cung chỉ hỏi một câu: xạ hương trong cung {mis} là để hại ai?”",o:[
  {n:"Thưa: không để hại ai",c:{},o:()=>40+S.hh/4,w:{hh:3},sc:1,wx:"Hoàng hậu ngờ có ẩn tình",l:{hh:-3},lx:"Hoàng hậu cho là ngươi bao che",rt:"Hoàng hậu nhìn ngươi rất lâu: “Vậy là để giữ.”",rf:"Hoàng hậu nói: “Ai giấu xạ hương cũng nói thế.”"},
  {n:"Thưa: không biết",c:{hh:-2},w:{tamco:1},wx:"không lộ thêm một chữ",lx:"Hoàng hậu không vui",rt:"Hoàng hậu cho lui."},
  {n:"Xin Hoàng hậu cho thêm thời gian",c:{suc:-2},o:()=>35+S.duc/4,w:{hh:2},sc:1,wx:"có thời gian tìm chứng",l:{hh:-2},lx:"bị cho là trì hoãn",rt:"Hoàng hậu cho ba ngày.",rf:"Hoàng hậu nói: “Trời sáng là khám.”"}]},
 x1:{h:"Trời sáng",w:"eun",t:"Đoàn khám cung đến rương cuối cùng. Gói thuốc ở đâu, chỉ ngươi và {mis} biết.",o:[
  {n:"Đánh lạc hướng đoàn khám",c:{suc:-5},o:A=>40+A.sc*8+(A.f.hide?10:0)+S.tamco/5,e:["win","lose"],rt:"Đoàn khám về tay không.",rf:"Gói thuốc lộ ra giữa sân."},
  {n:"Để {mis} tự nộp, nói rõ gốc gác",c:{},lx:"{mis} phải kể nỗi đau của mình",o:A=>40+(A.f.clean?10:0)+S.duc/5,e:["mid","lose"],rt:()=>`${CHU_Q()} nghe nửa đầu câu chuyện, cho {mis} thời gian.`,rf:"Không ai tin nửa sau câu chuyện."},
  {n:"Nhận gói thuốc là của mình",c:{danh:-4},w:{duc:3},e:"take",lx:"ngươi mang tiếng giữ xạ hương",rt:"Ngươi bước ra, quỳ xuống: “Gói ấy là của người này.”"}]}},
 E:{win:{k:1,tag:"Đoàn khám về tay không",w:"mis",t:"Nội vụ phủ không tìm thấy gì. Lời đồn chết dần. {mis} biết đêm ấy ai đã cứu nàng.",fx:{danh:3},go:A=>{rdOan(A,"v",6);CHU_MIS(10);return e67merit(4)}},
  mid:{k:0,tag:"Nửa sự thật trước Trung cung",t:"Trung cung biết có gói thuốc, biết nó ra từ cung {v}, nhưng chưa biết vì sao nó ở cung {mis}.",fx:{mat:1}},
  take:{k:0,tag:"Gánh thay chủ",w:"mis",t:CHU_T("Ngươi nhận gói thuốc là của mình, bị phạt quỳ ba ngày ở sân Nội vụ phủ. {mis} đứng sau rèm nhìn, không nói gì, nhưng đêm ấy sai người mang thuốc xuống cho ngươi.","Ngươi nhận gói thuốc là của mình, bị cấm túc một tháng. {mis} sai người lén mang trà sang, kèm một chữ: «Nợ»."),fx:{danh:-2,duc:2},go:()=>CHU_MIS(15)},
  lose:{k:-1,tag:"Gói thuốc bị tìm ra",w:"eun",t:"Gói xạ hương lộ ra giữa sân. {mis} bị cấm túc chờ tra, còn ngươi bị giữ lại để hỏi.",fx:{danh:-4,suc:-5},go:()=>CHU_MIS(-6)}}});

rdDef("cnv_chu",9,{t:"Giữ hay nói",w:"hh",sj:"lời khai về {mis}",cast(A){return rdCast(A,["v"])},
 g:"Trung cung đòi một lời khai. Nói thật thì {mis} lộ cả điều nàng giấu lẫn điều nàng chịu; giữ kín thì ngươi gánh. Ôn thái y là người duy nhất có thể nói thay ngươi, và ông đang muốn đi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Gọi lúc canh hai",w:"hh",if:RDW(1),t:()=>`Đoàn khám cung về tay không, nhưng ${CHU_Q()} không bỏ. Lúc canh hai, người của Trung cung đến gọi ngươi đi, chỉ một mình.`,o:[
  {n:"Đi ngay, không báo {mis}",c:{},w:{duc:1},wx:"không ai nói ngươi thông đồng",lx:"{mis} sẽ biết ngươi đi một mình",go:()=>CHU_MIS(-2),rt:"Ngươi khoác áo, theo đèn lồng đi."},
  {n:"Nhắn {mis} một lời trước khi đi",c:{suc:-2},o:()=>45+S.mat*4,w:{tamco:1},sc:1,wx:"{mis} biết ngươi đi đâu",l:{},lx:"người nhắn bị bắt gặp",go:(A,ok)=>{if(ok)CHU_MIS(4)},rt:"{mis} nhắn lại: “Nói gì cũng được, đừng nói về đứa con.”",rf:"Người của Trung cung thấy ngươi dừng lại thì thầm."},
  {n:"Xin đến vào sáng mai",c:{},o:()=>35+S.danh/4,w:{suc:2},sc:1,wx:"có một đêm nghĩ",l:{hh:-3},lx:"Trung cung phật ý",rt:"Người của Trung cung đồng ý.",rf:"Họ đứng chờ ở cửa, không đi."}]},
 s2:{h:"Lời nhắn của {mis}",w:"mis",if:RDW(0),t:"{mis} bị giữ trong cung, không ai được ra vào. Nàng nhờ người nhắn ngươi: “Nếu bị hỏi, cứ nói thật về cung {v}. Đừng nói về ta.”",o:[
  {n:"Nhận lời, làm như nàng dặn",c:{},w:{duc:1},f:"loyal",wx:"{mis} yên lòng",lx:"chỉ nói được nửa sự thật",go:()=>CHU_MIS(4),rt:"Ngươi gật đầu với người đưa tin."},
  {n:"Nhắn lại: phải nói cả hai",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{mis} nghĩ lại",l:{},lx:"{mis} cho là ngươi đã ngả",go:(A,ok)=>CHU_MIS(ok?2:-5),rt:"{mis} nhắn: “Vậy thì nói, nhưng chờ Ôn thái y.”",rf:"{mis} không nhắn lại nữa."},
  {n:"Tìm cách vào gặp nàng",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"nghe tận miệng nàng",l:{danh:-2},lx:"bị bắt vì vào nơi cấm",rt:"Ngươi vào được nửa canh giờ.",rf:"Thị vệ giữ ngươi ở cửa."}]},
 c1:{h:"Ôn thái y muốn đi",w:"doc",t:"Ôn thái y xin cáo bệnh về quê, đi trước rằm. Nếu ông đi, không ai còn nói được gói thuốc ra khỏi viện thế nào.",o:[
  {n:"Đến xin ông ở lại",c:{suc:-3},o:A=>40+(A.f.doc?10:0)+S.duc/4,w:{duc:2},sc:1,f:"doc",wx:"ông ở lại thêm ít ngày",l:{},lx:"ông sợ, vẫn đi",rt:"Ông thở dài: “Thêm mười ngày. Không hơn.”",rf:"Ông đã thu xếp hòm xiểng."},
  {n:"Xin ông viết lời khai trước khi đi",c:{bac:-20},o:()=>45+S.tamco/4,w:{mat:1},sc:1,f:"know",wx:"có lời khai trên giấy",l:{},lx:"ông không dám ký tên",rt:"Ông viết, ký, đóng dấu riêng.",rf:"Ông viết nhưng không ký."},
  {n:"Để ông đi",c:{},w:{duc:2},wx:"ông giữ được mạng",lx:"mất người làm chứng",rt:"Ngươi tiễn ông đến cửa Tây."}]},
 c2:{h:"Hộp trâm của {v}",w:"v",need:["v"],t:"{v} gửi ngươi một hộp trâm vàng: “Chuyện ở cung {mis} chẳng liên quan đến cung ta, phải không?”",o:[
  {n:"Nhận hộp trâm",c:{duc:-3},w:{bac:40},wx:"{v} tưởng ngươi đã im",lx:"cầm của {v} là mắc nợ {v}",go:A=>{rdRel(A,"v",5)},rt:"Ngươi cất hộp trâm dưới đáy rương."},
  {n:"Trả nguyên hộp",c:{},w:{duc:2},wx:"tay sạch",lx:"{v} biết ngươi không mua được",go:A=>{rdOan(A,"v",6)},rt:"Hộp trâm về lại cung {v}, niêm còn nguyên."},
  {n:"Nhận rồi trình lên Trung cung",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"{v} lộ ý mua chuộc",l:{danh:-2},lx:"bị cho là tham rồi đổ vạ",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"Trung cung giữ hộp trâm làm chứng.",rf:"{v} nói đó là quà thưởng, không có ý gì."}]},
 t1:{h:"Điều {mis} chưa nói",w:"mis",t:"{mis} kể nốt: gói xạ hương ấy nàng lấy trộm từ tay người của cung {v}, trên đường đến bếp một phi tần đang mang thai. Nàng đốt thư Ôn thái y để giữ mạng ông. Nàng không nói ra, vì nói ra là phải kể mình đã mất con thế nào.",o:[
  {n:"Khuyên nàng nói hết",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"clean",wx:"{mis} chịu nói",l:{},lx:"{mis} sợ",go:(A,ok)=>CHU_MIS(ok?4:-3),rt:"{mis} gật đầu: “Nếu ngươi đứng cạnh ta.”",rf:"{mis} lắc đầu, khóc."},
  {n:"Hứa giữ đến cùng",c:{},w:{duc:1},f:"loyal",wx:"{mis} tin ngươi trọn",lx:"việc thiện của nàng sẽ không ai biết",go:()=>CHU_MIS(8),rt:"{mis} nắm tay ngươi, không nói gì."},
  {n:"Hỏi phi tần mang thai năm ấy là ai",c:{},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"save",wx:"có thêm một người làm chứng",l:{},lx:"{mis} sợ kéo người khác vào",rt:"Nàng là một phi tần ở Tây cung; đứa trẻ năm ấy nay đã biết đi.",rf:"{mis} không nói."}]},
 x1:{h:"Lời khai",w:"hh",t:()=>`Đêm ấy ${CHU_Q()} hỏi lần cuối. Ngươi nói gì, {mis} sống theo lời ấy.`,o:[
  {n:"Giữ kín, thưa không biết gì",c:{suc:-4},o:A=>40+A.sc*8+(A.f.loyal?15:0),e:["win","lose"],rt:"Không có lời khai, Trung cung không xử được {mis}.",rf:"Trung cung không tin ngươi, cho người canh giữ."},
  {n:"Kể hết, cả điều tốt lẫn điều xấu",c:{},lx:"điều {mis} giấu không còn là của nàng",o:A=>35+(A.f.know?10:0)+(A.f.save?10:0)+S.duc/5,e:["win","mid"],rt:"Trung cung nghe đến chuyện phi tần mang thai thì đặt chén trà xuống.",rf:"Trung cung nghe hết, nhưng chưa tin nửa sau."},
  {n:"Khai {mis} giấu xạ hương, không nói vì sao",c:{duc:-4},w:{hh:6},e:"tell",lx:"{mis} sẽ không tha",rt:"Ngươi khai đúng một nửa. Nửa kia ngươi giữ cho mình."}]}},
 E:{win:{k:1,tag:"Bí mật còn trong tay ngươi",w:"mis",t:"Lời khai của ngươi giữ {mis} đứng vững qua đêm ấy. Trung cung biết có ẩn tình, và biết ngươi là người nắm nó.",fx:{danh:3,tamco:1},go:()=>CHU_MIS(10)},
  mid:{k:0,tag:"Sự thật nằm trên bàn Trung cung",t:"Cả câu chuyện đã được kể. Trung cung chưa tin hết, nhưng cũng chưa xử ai.",fx:{duc:3}},
  tell:{k:0,tag:"Đứng về phía Trung cung",w:"hh",t:"Ngươi khai nửa xấu của sự thật. Trung cung nhớ ngươi là người biết điều. {mis} nhớ ngươi là người đã bán nàng.",fx:{hh:6,danh:2},go:()=>CHU_MIS(-15)},
  lose:{k:-1,tag:"Lời khai bị nghi",t:"Trung cung cho là ngươi và {mis} thông đồng. Cả hai bị canh giữ, chờ Thận hình ty.",fx:{danh:-4},go:()=>CHU_MIS(3)}}});

rdDef("cnv_chu",10,{t:"Đêm tra hỏi",w:"eun",sj:"đêm tra hỏi ở Thận hình ty",cast(A){return rdCast(A,["v"])},
 g:"Vụ xạ hương được giao cho Thận hình ty. Đêm nay mọi người từng hầu cung {mis} bị gọi đi hỏi, từng người một. {eun} ngồi ghế trên, người của {v} đứng sau rèm.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Roi của Thận hình ty",w:"eun",if:RDW(1),t:CHU_T("Lời ngươi đã giữ được {mis} qua một đêm. Nhưng {v} xin giao vụ cho Thận hình ty, nơi lời khai được lấy bằng roi. Tên ngươi là tên thứ ba trong danh sách.","Lời ngươi đã giữ được {mis} qua một đêm. Nhưng {v} xin giao vụ cho Thận hình ty. Ngươi nay là tiểu chủ, không ai dám đánh, nhưng {eun} xin ngươi đến «đối chứng» trong một gian phòng kín."),o:[
  {n:"Đến sớm, xem ai bị hỏi trước",c:{suc:-2},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"biết lời khai của người khác",l:{},lx:"bị đuổi ra",rt:"Ngươi nghe được cung nữ áo xanh đã khai trước.",rf:"Thị vệ đóng cửa trước mặt ngươi."},
  {n:"Lo bạc cho người canh",c:{bac:-30},w:{suc:2},wx:"được ngồi chờ chỗ ấm",lx:"tốn bạc",rt:"Người canh mang cho ngươi chén nước nóng."},
  {n:"Đi như thường, không lo lót",c:{},w:{duc:2},wx:"không ai bắt được lỗi",lx:"phải chờ cả đêm trong lạnh",rt:"Ngươi ngồi chờ đến canh ba."}]},
 s2:{h:"Gọi tên đầu tiên",w:"eun",if:RDW(0),t:"Từ sau lời khai đêm trước, ai cũng tránh ngươi. Đêm nay Thận hình ty gọi tên ngươi đầu tiên.",o:[
  {n:"Đi ngay, giữ bình tĩnh",c:{suc:-3},w:{duc:2},wx:"không để lộ sợ hãi",lx:"vào trước là bị hỏi kỹ nhất",rt:"Ngươi bước vào, quỳ xuống, chờ."},
  {n:"Xin {mis} gửi người đi cùng",c:{},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"có người làm chứng cho ngươi",l:{},lx:"{mis} không dám",go:(A,ok)=>{if(ok)CHU_MIS(3)},rt:"{mis} gửi một ma ma già đi theo.",rf:"{mis} im lặng."},
  {n:"Dúi bạc để được hỏi sau",c:{bac:-40},o:()=>50+S.mat*3,w:{mat:1},sc:1,wx:"biết người khác khai gì trước",l:{danh:-2},lx:"bị ghi là lo lót",rt:"Tên ngươi bị dời xuống cuối.",rf:"Thái giám nhận bạc rồi vẫn gọi ngươi."}]},
 c1:{h:"Cung nữ áo xanh khai",w:"maid",t:"Cung nữ áo xanh của cung {v} khai: đêm ấy nàng thấy ngươi cầm gói thuốc đi về phía bếp một phi tần khác.",o:[
  {n:"Bác lời nàng bằng giờ trực",c:{},o:()=>40+S.mat*5,w:{danh:2},sc:1,wx:"lời khai của nàng sai giờ",l:{danh:-3},lx:"giờ trực bị sửa",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Sổ trực ghi giờ ấy ngươi đang ở phòng {mis}.",rf:"Trang sổ trực đêm ấy đã bị xé."},
  {n:"Hỏi nàng ai dạy nói",c:{suc:-3},o:()=>35+S.tamco/3,w:{tamco:2},sc:1,wx:"nàng run, khai sai thêm",l:{},lx:"bị cho là ép nhân chứng",rt:"Nàng nhìn về phía rèm, nơi người của {v} đứng.",rf:"Nàng khóc to, {eun} quát ngươi im."},
  {n:"Im lặng, chờ người khác bác",c:{},w:{duc:1},wx:"không tự làm rối",lx:"lời nàng ở lại trong hồ sơ",rt:"Ngươi chỉ cúi đầu."}]},
 c2:{h:"Ôn thái y bị giữ",w:"doc",t:"Ôn thái y bị giữ ở Thận hình ty. Ông già yếu, không chịu nổi roi.",o:[
  {n:"Lo bạc cho ông bớt roi",c:{bac:-40},w:{duc:3},wx:"ông còn sức để khai",lx:"tốn bạc",rt:"Người coi ngục nhận bạc, cho ông nằm chỗ khô."},
  {n:"Xin {eun} cho gặp ông",c:{suc:-2},o:()=>40+S.danh/4,w:{mat:1},sc:1,f:"know",wx:"nghe ông dặn lời cuối",l:{},lx:"bị nghi thông cung",rt:"Ông thì thầm: “Lời khai của ta ở chỗ {mis}. Ta đã viết từ năm ngoái.”",rf:"{eun} lắc đầu."},
  {n:"Mặc ông tự khai",c:{},w:{tamco:1},wx:"không dính tay",lx:"ông có thể khai sai vì sợ",rt:"Ngươi không đến."}]},
 t1:{h:"{eun} ra giá",w:"eun",t:"{eun} nói khẽ: “Vụ này lên đến Hoàng thượng là có người mất đầu. Ta khép được nó, nếu có người nhận một tội nhỏ: giữ thuốc không báo.”",o:[
  {n:"Nhận tội nhỏ thay chủ",c:{danh:-3},w:{duc:2},f:"loyal",wx:"{mis} thoát",lx:"tên ngươi vào sổ tội",go:()=>CHU_MIS(8),rt:"{eun} gật đầu, ghi một dòng."},
  {n:"Không nhận, đòi xét đến cùng",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"clean",wx:"{eun} không dám ép",l:{},lx:"{eun} ghi nhớ ngươi",rt:"{eun} cười: “Gan đấy.”",rf:"{eun} nói: “Vậy thì cứ hỏi tiếp.”"},
  {n:"Đưa bạc cho y khép vụ",c:{bac:-60},o:()=>45+S.mat*3,w:{tamco:1},sc:1,wx:"vụ được khép êm",l:{danh:-3},lx:"y lấy bạc mà không khép",rt:"{eun} cất bạc, gật đầu.",rf:"{eun} cất bạc, rồi vẫn hỏi tiếp."}]},
 x1:{h:"Đối chứng",w:"eun",t:()=>`Canh tư, {eun} cho ngươi đứng đối mặt cung nữ áo xanh, trước người của {v} và người của ${CHU_Q()}.`,o:[
  {n:"Đưa sổ xuất kho và lời Ôn thái y",c:{suc:-4},o:A=>35+A.sc*8+(A.f.know?10:0)+S.mat*4,e:["win","lose"],rt:"Sổ ghi tên cung {v}. Cung nữ áo xanh quỳ sụp.",rf:"Lời Ôn thái y không có dấu, {eun} gạt đi."},
  {n:"Giữ một lời: không biết",c:{},lx:"cung {v} không bị đụng đến",o:A=>45+S.tamco/5,e:["mid","lose"],rt:"Không ai bẻ được lời ngươi. Vụ treo lại.",rf:"Cung nữ áo xanh khai thêm, ngươi không có gì để bác."},
  {n:"Xin dâng chuyện lên Hoàng thượng",c:{suc:-4},o:A=>35+A.sc*6+CHU_E()/4+S.danh/6,e:["win","mid"],go:(A,ok)=>ok?CHU_NT(9):"",rt:"Hoàng thượng nghe chuyện, cho đòi hồ sơ lên ngự án.",rf:"Lời xin bị giữ lại ở Nội vụ phủ."}]}},
 E:{win:{k:1,tag:"Lời khai lật ngược",w:"eun",t:"Mũi tra hỏi quay về cung {v}. Cung nữ áo xanh khai ra ai đã sai nàng. {mis} được nới cấm túc.",fx:{danh:4},go:A=>{rdOan(A,"v",10);CHU_MIS(8);return e67merit(5)}},
  mid:{k:0,tag:"Vụ án treo lại",t:"Không ai bị kết tội, không ai được rửa. Hồ sơ nằm trên bàn {eun}, chờ một tay đẩy.",fx:{tamco:1}},
  lose:{k:-1,tag:"{mis} bị kết tội giữ xạ hương",w:"mis",t:"Thận hình ty kết tội {mis} giữ xạ hương không báo. Nàng bị cấm túc, ngươi bị ghi tên là người biết mà không nói.",fx:{danh:-4},go:()=>CHU_MIS(-4)}}});

rdDef("cnv_chu",11,{t:"Dao hai lưỡi",w:"mis",sj:"bí mật của {mis}",cast(A){return rdCast(A,["v"])},
 g:"Vụ xạ hương đi đến hồi cuối. Bí mật của {mis} sẽ thành ơn hay thành tội, và ngươi đứng ở đâu khi nó ngã xuống. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Trước khi trời sáng",w:"mis",if:RDW(1),t:CHU_T("Thận hình ty đã quay mũi về cung {v}. {mis} được nới cấm túc, đến tìm ngươi ở phòng kẻ hầu lúc trời chưa sáng: “Ngày mai Hoàng thượng hỏi. Ta muốn ngươi đứng cạnh ta.”","Thận hình ty đã quay mũi về cung {v}. {mis} được nới cấm túc, đến cung ngươi lúc trời chưa sáng: “Ngày mai Hoàng thượng hỏi. Ta muốn muội đứng cạnh ta.”"),o:[
  {n:"Nhận lời đứng cạnh nàng",c:{},w:{duc:2},f:"loyal",wx:"{mis} vững lòng",lx:"buộc mình vào số phận nàng",go:()=>CHU_MIS(6),rt:"{mis} siết tay ngươi."},
  {n:"Xin đứng riêng, nói riêng",c:{},w:{tamco:2},f:"self",wx:"giữ đường lui cho mình",lx:"{mis} buồn",go:()=>CHU_MIS(-3),rt:"{mis} gật đầu chậm: “Ừ. Ngươi cũng phải sống.”"},
  {n:"Hỏi nàng muốn nói đến đâu",c:{suc:-2},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"biết nàng dám nói hết",l:{},lx:"nàng còn do dự",rt:"{mis} nói: “Đến đứa con. Hết.”",rf:"{mis} nói: “Ta chưa biết.”"}]},
 s2:{h:"Cây trâm gãy",w:"mis",if:RDW(0),t:"{mis} vẫn bị giam lỏng. Nàng nhờ người mang đến cho ngươi một cây trâm gãy đôi: “Còn một việc ta chỉ nhờ được ngươi.”",o:[
  {n:"Nhận trâm, nghe việc",c:{},w:{duc:2},f:"loyal",wx:"{mis} còn tin ngươi",lx:"nhận là phải làm",go:()=>CHU_MIS(5),rt:"Việc ấy là tìm người mẹ năm xưa ở Tây cung."},
  {n:"Gửi trả trâm",c:{},w:{tamco:1},f:"self",wx:"rút chân khỏi vụ án",lx:"{mis} chỉ còn một mình",go:()=>CHU_MIS(-6),rt:"Ngươi gói trâm lại, gửi trả."},
  {n:"Đến tận nơi gặp nàng",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"nghe tận miệng nàng",l:{danh:-2},lx:"bị bắt vì vào nơi cấm",rt:"{mis} gầy rộc, nhưng mắt vẫn sáng.",rf:"Thị vệ giữ ngươi lại ở cửa."}]},
 c1:{h:"Người mẹ ở Tây cung",w:"me",t:"Phi tần ở Tây cung năm ấy nay đã có một đứa con biết đi. Nàng chưa từng biết có gói xạ hương trên đường đến bếp mình.",o:[
  {n:"Xin nàng làm chứng",c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"good",wx:"có người được cứu đứng ra",l:{},lx:"nàng sợ, đóng cửa",rt:"Nàng ôm con, nói: “Ta sẽ đến.”",rf:"Nàng sai người đóng cổng."},
  {n:"Kể cho nàng biết ai đã cứu con nàng",c:{},w:{duc:3},f:"good",wx:"nàng mang ơn {mis}",lx:"thêm một người biết chuyện",rt:"Nàng khóc, gửi tặng {mis} một chiếc khóa vàng."},
  {n:"Không kéo nàng vào",c:{},w:{duc:1},wx:"mẹ con nàng được yên",lx:"mất một nhân chứng",rt:"Ngươi đứng nhìn đứa trẻ chơi trong sân, rồi đi."}]},
 c2:{h:"{v} cầu hòa",w:"v",need:["v"],t:"{v} sai người đến: “Dừng ở đây. Cung ta sẽ không bao giờ đụng đến ngươi nữa.”",o:[
  {n:"Nhận lời giảng hòa",c:{duc:-2},w:{suc:3},wx:"một kẻ thù bớt đi",lx:"cái chết của đứa trẻ năm ấy không ai trả",go:A=>{rdRel(A,"v",10)},rt:"{v} gửi thêm một hộp trà."},
  {n:"Từ chối, giữ đường cũ",c:{},w:{duc:2},wx:"không bán sự thật",lx:"{v} dốc hết sức chống lại",go:A=>{rdOan(A,"v",8)},rt:"Ngươi để người đưa tin đứng chờ ở cửa đến tối."},
  {n:"Giả nhận để {v} lơi tay",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} không chuẩn bị gì cho ngày mai",l:{danh:-2},lx:"{v} biết bị lừa",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{v} tin, cho người canh về nghỉ.",rf:"{v} cười: “Ngươi tưởng ta ngốc?”"}]},
 t1:{h:"Câu hỏi của {mis}",w:"mis",t:"{mis} hỏi: “Nếu chỉ một người được đứng dậy sau chuyện này, ngươi muốn là ai?”",o:[
  {n:"Đáp: là chủ nhân",c:{},w:{duc:2},f:"loyal",wx:"{mis} nhớ suốt đời",lx:"đặt mình xuống dưới",go:()=>CHU_MIS(6),rt:"{mis} quay đi lau mắt."},
  {n:"Đáp: là cả hai",c:{},w:{tamco:1},f:"both",wx:"{mis} thấy ngươi không bỏ ai",lx:"đòi cả hai là có thể mất cả hai",go:()=>CHU_MIS(3),rt:"{mis} cười: “Tham thật.”"},
  {n:"Đáp: là chính mình",c:{duc:-2},w:{tamco:2},f:"self",wx:"nói thật lòng",lx:"{mis} lạnh đi",go:()=>CHU_MIS(-5),rt:"{mis} gật đầu: “Ít nhất ngươi không nói dối.”"}]},
 x1:{h:"Trước ngự án",w:"emp",t:"Hồ sơ vụ xạ hương lên đến ngự án. Hoàng thượng cho gọi {mis}, cho gọi cả ngươi.",o:[
  {n:"Nói hết, xin công cho {mis}",c:{suc:-5},o:A=>35+A.sc*8+(A.f.loyal?10:0)+(A.f.good?10:0)+S.duc/6,e:["win","both"],rt:"Hoàng thượng nghe đến đứa trẻ ở Tây cung thì đứng dậy.",rf:"Hoàng thượng nghe, nhưng không có chứng, ngài chỉ thở dài."},
  {n:"Nói phần mình, để {mis} tự gánh phần nàng",c:{},lx:"{mis} đứng một mình",o:A=>40+(A.f.self?10:0)+S.tamco/5+CHU_E()/6,e:["rise","both"],rt:"Hoàng thượng nhớ ngươi là người nói thật đầu tiên.",rf:"Lời ngươi lẫn vào lời mọi người."},
  {n:"Xin Hoàng thượng khép vụ, không truy",c:{},w:{duc:3},e:"both",lx:"không ai được rửa tiếng",rt:"Hoàng thượng phẩy tay: “Khép.”"}]}},
 E:{win:{k:1,tag:"Tâm phúc trọn đời của {mis}",w:"mis",t:"Hoàng thượng biết gói xạ hương năm ấy đã cứu một long thai. {mis} được rửa tiếng, cung {v} bị phạt cấm túc. Từ nay {mis} gọi ngươi là người nhà, và đi đâu cũng nhắc tên ngươi trước mặt Hoàng thượng.",fx:{danh:8,duc:3},go:A=>{rdOan(A,"v",12);CHU_MIS(25);const r=CHU_NT(15);return [r,e67merit(8)].filter(Boolean).join(" ")}},
  rise:{k:0,tag:"{mis} ngã, ngươi đứng lên",w:"emp",t:"{mis} bị phạt bổng một năm vì giữ xạ hương không báo. Hoàng thượng nhớ ngươi là người nói thật trước mặt ngài. Ngươi bước lên, còn {mis} ở lại phía sau, nhìn theo.",fx:{danh:5},go:()=>{CHU_MIS(-20);return CHU_NT(18)}},
  both:{k:-1,tag:"Chủ tớ cùng lùi một bước",t:"Vụ án khép lại, không ai được rửa tiếng. {mis} bị phạt bổng, ngươi bị ghi tên trong sổ tội nhỏ của Nội vụ phủ. Hai người lặng lẽ sống tiếp, mỗi người mang một nửa bí mật.",fx:{danh:-4},go:()=>CHU_MIS(5)}}});
RD97L.push({a:"cnv_chu_11",tag:"Việc thiện trong bóng tối",w:"emp",p:.12,n:"Xin Hoàng thượng cho gọi người mẹ ở Tây cung đến",c:{suc:-4},
 path:["Kể cho nàng biết ai đã cứu con nàng","Xin nàng làm chứng","Đáp: là cả hai","Đáp: là chủ nhân","Từ chối, giữ đường cũ","Nhận lời đứng cạnh nàng","Nhận trâm, nghe việc"],np:2,bad:["Đáp: là chính mình","Nhận lời giảng hòa","Gửi trả trâm"],sc:2,x:[()=>S.duc>=40,"Đức từ 40"],
 t:"Người mẹ ở Tây cung bế con quỳ trước ngự án: “Nếu không có nàng ấy, đứa trẻ này đã không được sinh ra.” Hoàng thượng lặng đi rất lâu. Ngài ban cho {mis} một chữ «Nhân» viết tay, và khi {mis} xin chia công, ngài cho gọi cả ngươi lên nhận thưởng. Từ đó trong cung ai cũng biết: hai người đã giữ một việc thiện suốt bao năm mà không đòi ai trả.",
 fx:{danh:12,duc:4},go:A=>{CHU_MIS(30);try{rdOan(A,"v",12)}catch(e){}return CHU_NT(20)},rw:"nt_dongchau",ti:"Người giữ việc thiện"});

/* ---------- cnv_mat · Ánh mắt nơi hành lang ---------- */
/* BAL.road keys needed: none (the .8 rise reads the game's own BAL.ntRise.at; everything else is inline per option like the pilot).
   Two states (ROAD_MAP §8.4): she may still be a maid (isSrv) or already raised (S.srv.risen). Texts are functions that read the state;
   options split with need:["srv"] (still a maid) / need:["nsrv"] (raised); maid-only effects (tin, nt, e67merit) only through matSrv.
   {mis} = her (former) mistress: srvM() keeps S.srv.mid after the rise, so the same woman is named in both states.
   The road: the Emperor's gaze (.4) → the mistress's jealousy (.5) → meet him or hide (.6) → the Kính sự phòng register (.7) →
   the first night, the only chapter that may raise her (.8) → facing the mistress as a near equal (.9) → {v}'s seduction rumour (.10) →
   what the gaze becomes (.11). {v} = the consort who wanted to buy her in .4, cast once and kept (never the mistress). */
const MATR=()=>!!(S.srv&&S.srv.risen);
const MATT=(m,c)=>()=>MATR()?c:m;
const MATM=()=>{const m=srvMis67();return !!(m&&m.alive)};
const matMis=(n,o)=>{const m=srvMis67();if(!m||!m.alive)return;if(n)relAdd(S,m,n);if(o)oanAdd(m,S,o)};
const matSrv=o=>{if(!S.srv||S.srv.risen)return"";ap67(o);try{return fmt(o)}catch(e){return""}};
const matCon=o=>{if(!MATR())return"";ap67(o);try{return fmt(o)}catch(e){return""}};
const MATV={v:x=>x.id!==(S.srv&&S.srv.mid)};

rdDef("cnv_mat",5,{t:"Chủ nhân ghen",w:"mis",sj:"cơn ghen của {mis}",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Từ đêm Trung thu, {mis} nhìn ngươi như nhìn cái gai trong mắt. Nàng đày ngươi làm việc nặng, chờ ngươi tự ngã. Chịu đựng, né tránh, hay tìm chỗ dựa khác.",
  "Ngươi nay là tiểu chủ, nhưng {mis} vẫn coi ngươi là nô tỳ cũ của nàng. Trước mặt cả hậu cung, nàng muốn ngươi cúi đầu như xưa. Cúi, ngẩng, hay tìm chỗ dựa khác."),
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sau lời hỏi xin",w:"mis",if:()=>rdK()>0&&rdPrev()!=="win2",t:MATT("Hoàng thượng đã hỏi xin ngươi, nhưng thánh chỉ chưa xuống. Trong lúc chờ, {mis} sai ngươi ra hậu viện giặt áo giữa tháng rét: “Muốn lên cao thì tập quen đất lạnh trước.”",
   "Thánh chỉ đã xuống, ngươi dọn khỏi dãy nhà cung nữ. Sáng hôm sau thỉnh an, {mis} nói đủ cho cả điện nghe: “Nô tỳ của ta, mặc áo mới vẫn là nô tỳ của ta.”"),o:[
  {n:"Cắn răng giặt áo",need:["srv"],c:{suc:-6},w:{tin:5},f:"bear",wx:"chủ thấy ngươi biết phận",lx:"tay nứt nẻ, Hoàng thượng chẳng thấy ngươi",rt:"Mười ngày sau, {mis} cho ngươi về hầu trà. Nàng không nói gì, nhưng thôi lườm."},
  {n:"Nhờ tiểu thái giám truyền tin cho Hoàng thượng",need:["srv"],c:{bac:-8},o:()=>40+S.nt/4,w:{nt:8},sc:1,f:"bold",wx:"ngài biết ngươi bị đày",l:{tin:-10},lx:"chủ biết ngươi mách",rt:"Hoàng thượng sai người mang lò sưởi tay ra hậu viện. Cả cung im phắc.",rf:"Tiểu thái giám nhận bạc rồi đem chuyện kể cho {mis}."},
  {n:"Cúi đầu đáp lễ như xưa",need:["nsrv"],c:{danh:-3},w:{duc:3},f:"bear",wx:"người ta thấy ngươi không quên gốc",lx:"bị cười là còn nô tính",go:()=>matMis(4),rt:"Ngươi cúi đầu. {mis} sững lại, rồi quay đi không nói nữa."},
  {n:"Đáp: nay thiếp cùng hầu Hoàng thượng như tỷ",need:["nsrv"],c:{suc:-2},o:()=>40+S.tai/4+S.danh/5,w:{danh:3},sc:1,f:"bold",wx:"cả điện nể ngươi",l:{sung:-2},lx:"thành chuyện cãi nhau trước Hoàng hậu",go:(A,ok)=>matMis(0,ok?8:4),rt:"Câu đáp vừa đủ lễ vừa đủ cứng. {mis} đỏ mặt, không cãi được.",rf:"Hoàng hậu nhíu mày: “Mới lên đã học cãi.”"},
  {n:"Lặng lẽ tìm {v} xin chỗ dựa",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người che chở",l:{danh:-2},lx:"{v} ghi cho ngươi một món nợ",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} mỉm cười: “Người ta không thương ngươi, ta thương.”",rf:"{v} chỉ hứa suông, rồi đem chuyện ra làm trò cười."}]},
 s2:{h:"Chủ tiến cử rồi hối",w:"mis",if:()=>rdPrev()==="win2",t:MATT("Chính {mis} tự tay tiến cử ngươi. Nhưng từ đó Hoàng thượng đến cung chỉ hỏi “con bé pha trà đâu”. Đêm qua nàng ngồi một mình rất lâu, sáng nay sai ngươi trực đêm suốt một tháng.",
   "Chính {mis} tiến cử ngươi lên. Nay ngài đến cung ngươi nhiều hơn đến cung nàng. Nàng gửi sang một hộp bánh, kèm một lời: “Đừng quên ai đã mở cửa cho ngươi.”"),o:[
  {n:"Trực đêm không than",need:["srv"],c:{suc:-5},w:{tin:6},f:"bear",wx:"chủ nguôi dần",lx:"thức trắng, sức tàn",rt:"Đến đêm thứ hai mươi, {mis} khoác cho ngươi tấm áo bông của nàng."},
  {n:"Thưa thật với chủ: nô tỳ không dám quên ơn",need:["srv"],c:{},o:()=>45+S.tin/4,w:{tin:8},sc:1,f:"bear",wx:"chủ tin lời ngươi",l:{tin:-6},lx:"chủ cho là ngươi khéo miệng",go:(A,ok)=>matMis(ok?6:-3),rt:"{mis} thở dài: “Ta biết. Chỉ là ta sợ.”",rf:"{mis} cười nhạt: “Miệng ngươi ngọt thật.”"},
  {n:"Đáp lễ hậu hơn",need:["nsrv"],c:{bac:-30},w:{duc:3},f:"bear",wx:"nàng thấy ngươi nhớ ơn",lx:"tốn bạc, nàng vẫn ghen",go:()=>matMis(6),rt:"Ngươi gửi lại một bộ trâm. {mis} cầm lên ngắm rất lâu."},
  {n:"Khuyên Hoàng thượng đến cung {mis}",need:["nsrv"],c:{sung:-3},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"bear",wx:"{mis} biết ngươi nhường",l:{sung:-2},lx:"ngài thấy ngươi đẩy ngài đi",go:(A,ok)=>matMis(ok?10:2),rt:"Đêm ấy ngài ngự cung {mis}. Sáng ra nàng sai người mang sang một đĩa mứt.",rf:"Ngài cau mày: “Trẫm đi đâu, không cần nàng xếp.”"},
  {n:"Gặp {v} hỏi chuyện cung {mis}",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"biết nàng sắp làm gì",l:{danh:-2},lx:"{v} khoe khắp nơi ngươi đến tìm",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} kể: {mis} đã hỏi Kính sự phòng tên ngươi.",rf:"{v} đem chuyện kể lại cho {mis}."}]},
 s3:{h:"Bị đày việc nặng",w:"mis",if:RDW(0),t:MATT("Sau đêm Trung thu, {mis} đẩy ngươi xuống bếp sau, ngày gánh nước, đêm canh lò. Ai nhắc tên ngươi trước mặt nàng đều bị phạt.",
   "Ngươi đã được phong, nhưng {mis} đi khắp các cung kể chuyện ngươi từng làm vỡ chén, từng ăn vụng, từng bị phạt quỳ. Chuyện cũ thành trò cười mới."),o:[
  {n:"Gánh nước, không nói một lời",need:["srv"],c:{suc:-6},w:{duc:3,tin:3},f:"bear",wx:"cả bếp thương ngươi",lx:"Hoàng thượng không thấy ngươi nữa",rt:"Lão thái giám bếp lén cho ngươi bát cháo nóng."},
  {n:"Hát khẽ bài dân ca bên giếng",need:["srv"],c:{},o:()=>35+S.sac/4,w:{nt:10},sc:1,f:"bold",wx:"có người đứng nghe",l:{tin:-8},lx:"chủ cho là ngươi cố ý",rt:"Sáng hôm sau, ngự thiện phòng nhận lệnh: “Ai hát bên giếng, cho về hầu trà.”",rf:"Người nghe là chưởng sự, mách lại với {mis}."},
  {n:"Cười mà nhận hết",need:["nsrv"],c:{danh:-3},w:{duc:4},f:"bear",wx:"người ta thấy ngươi rộng lượng",lx:"chuyện cũ càng lan",rt:"Ngươi cười: “Đúng là thiếp từng làm vỡ chén của tỷ.” Câu chuyện tự nhạt."},
  {n:"Kể lại một chuyện cũ của {mis}",need:["nsrv"],c:{duc:-3},o:()=>40+S.tamco/4,w:{danh:2},sc:1,f:"bold",wx:"nàng biết ngươi cũng có chuyện để nói",l:{danh:-3},lx:"thành ra hai người cùng mất mặt",go:()=>matMis(0,6),rt:"{mis} im bặt. Từ đó nàng thôi kể.",rf:"Cả hậu cung bàn tán cả hai."},
  {n:"Lặng lẽ tìm {v} xin chỗ dựa",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người che chở",l:{danh:-2},lx:"{v} ghi cho ngươi một món nợ",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} cho người đến xin ngươi sang giúp việc vài hôm.",rf:"{v} cười, bảo ngươi tự lo."}]},
 c1:{h:"Một chén trà bị đổ",w:"mis",t:MATT("Hoàng thượng ghé cung. {mis} cố ý gọi ngươi dâng trà, rồi hất tay áo cho chén trà đổ lên long bào.",
   "Yến nhỏ ở cung Hoàng hậu. {mis} cố ý gọi ngươi rót trà như thuở còn hầu nàng, rồi hất tay áo cho chén trà đổ lên vạt áo Hoàng thượng."),o:[
  {n:"Quỳ nhận lỗi về mình",c:{suc:-4},w:{duc:4},f:"bear",wx:"không ai bị kéo vào",lx:"bị phạt oan",go:()=>{matMis(4);return matSrv({tin:4})},rt:"Hoàng thượng phẩy tay: “Thôi.” Ngài nhìn {mis} lâu hơn một chút."},
  {n:"Lau áo cho ngài, nói khẽ một câu",c:{},o:()=>40+S.sac/4+S.tai/6,w:{sung:2},sc:1,f:"bold",wx:"ngài cười",l:{danh:-3},lx:"bị nói là lẳng lơ trước mặt chủ",go:(A,ok)=>{matMis(0,ok?6:3);if(ok)return matSrv({nt:6})},rt:"Ngài bật cười, quên cả chén trà.",rf:"Ngài lạnh mặt đứng dậy."},
  {n:"Lặng lẽ cho người thấy tay {mis} hất",c:{},o:()=>35+S.tamco/3,w:{tamco:2},sc:1,wx:"có người làm chứng",l:{duc:-2},lx:"{mis} biết ngươi đề phòng nàng",go:(A,ok)=>matMis(0,ok?8:4),rt:"Một tiểu thái giám thấy rõ. Chuyện đến tai ngài.",rf:"Không ai dám nói đã thấy."}]},
 c2:{h:"{v} đưa tay",w:"v",t:MATT("{v} lại sai người đến: nếu ngươi chịu sang hầu nàng, nàng sẽ xin Nội vụ phủ đổi người. Nàng chỉ cần ngươi kể chuyện cung {mis}.",
   "{v} mời ngươi đến thưởng hoa, nói nhỏ: “Nàng ta ghen, ai cũng thấy. Ngươi đứng với ta, ta che cho ngươi.” Cái giá là những chuyện ngươi biết về cung {mis}."),o:[
  {n:"Nhận lời {v}",c:{duc:-4},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người đứng sau",l:{danh:-3},lx:"thành kẻ phản chủ cũ",go:(A,ok)=>{rdRel(A,"v",ok?10:-4);matMis(-6);return matSrv({tin:-8})},rt:"{v} nắm tay ngươi: “Từ nay là người nhà.”",rf:"{v} lấy được tin rồi trở mặt."},
  {n:"Từ chối, báo {mis}",if:MATM,c:{},w:{duc:3},wx:"người cũ biết ngươi giữ lòng",lx:"{v} phật ý",go:A=>{rdOan(A,"v",6);matMis(6);return matSrv({tin:6})},rt:"{mis} nghe xong, im rất lâu."},
  {n:"Đưa {v} tin vặt, giữ lại tin thật",c:{},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,wx:"cả hai bên đều tưởng ngươi theo mình",l:{danh:-3},lx:"lộ thì cả hai cùng ghét",go:(A,ok)=>{if(!ok)rdOan(A,"v",8)},rt:"{v} hài lòng với mấy chuyện vặt.",rf:"{v} nhận ra ngươi đùa nàng."}]},
 t1:{h:"Chủ ra lệnh cuối",w:"mis",if:MATM,t:MATT("{mis} gọi ngươi vào: “Ta cho ngươi chọn: ở lại hầu ta trọn đời, ta tiến cử ngươi lên Đại cung nữ. Hoặc đi, và đừng mong ai ở cung này nhắc tên ngươi.”",
   "{mis} hẹn ngươi ở đình sau: “Ngươi muốn yên, thì mỗi lần ngài đến cung ngươi, ngươi khuyên ngài sang ta một đêm. Không thì ta kể hết chuyện ngươi hầu ta năm xưa.”"),o:[
  {n:"Hứa với {mis}",c:{sung:-3},w:{duc:3},f:"bear",wx:"người cũ yên lòng",lx:"buộc mình vào lời hứa",go:()=>{matMis(8);return matSrv({tin:8})},rt:"{mis} gật đầu: “Nhớ lấy.”"},
  {n:"Xin {mis} cho ngươi tự đi đường mình",c:{suc:-3},o:()=>40+S.duc/4,w:{danh:2},sc:1,f:"bold",wx:"không còn nợ ai",l:{danh:-2},lx:"{mis} giận",go:(A,ok)=>{if(!ok)matMis(-6,6)},rt:"{mis} quay mặt: “Đi đi.” Giọng nàng không còn giận.",rf:"{mis} đập vỡ chén: “Rồi ngươi xem.”"},
  {n:"Im lặng lui ra",c:{},w:{tamco:2},wx:"không hứa gì",lx:"{mis} hiểu là ngươi từ chối",go:()=>matMis(-3),rt:"Ngươi lui ra. Sau lưng, nàng gọi mãi tên ngươi."}]},
 x1:{h:"Trước mặt Hoàng thượng",w:"emp",t:MATT("Hoàng thượng thấy tay ngươi nứt nẻ, hỏi: “Ai bắt ngươi làm việc này?” {mis} đứng ngay đó, mặt trắng bệch.",
   "Hoàng thượng nghe lời đồn ở cung {mis}, hỏi ngươi: “Nàng ta làm khó nàng?” {mis} đứng ngay đó, mặt trắng bệch."),o:[
  {n:"Thưa: là phận sự, không ai bắt",c:{suc:-3},o:A=>40+(A.f.bear?15:0)+S.duc/5,e:["win","mid"],rt:"Ngài nhìn ngươi, rồi nhìn {mis}: “Người của nàng biết giữ thể diện cho nàng.”",rf:"Ngài gật đầu, không nói thêm."},
  {n:"Thưa thật, xin ngài xét",c:{duc:-2},o:A=>35+(A.f.bold?15:0)+S.sac/5,e:["win","lose"],rt:"Ngài phạt {mis} cấm túc nửa tháng, ban cho ngươi một bình thuốc mỡ.",rf:"Ngài cho là ngươi mách lẻo, quay đi."},
  {n:"Nhìn sang {v} cầu cứu",c:{},o:A=>40+(A.f.v?15:0)+S.tamco/5,e:["mid","lose"],lx:"nợ {v} một lần",go:(A,ok)=>{rdRel(A,"v",ok?4:-4)},rt:"{v} nói giúp một câu, chuyện êm.",rf:"{v} lảng mắt đi chỗ khác."}]}},
 E:{win:{k:1,tag:"Cơn ghen lắng xuống",w:"emp",t:MATT("Hoàng thượng nói một câu, cả cung hiểu: người ngài nhìn thì đừng ai đày đọa. {mis} thôi làm khó ngươi, dù trong mắt nàng vẫn còn gai.",
   "Hoàng thượng nói một câu, cả hậu cung hiểu: tiểu chủ mới không phải nô tỳ của ai nữa. {mis} thôi kể chuyện cũ, dù trong mắt nàng vẫn còn gai."),fx:{danh:4},go:A=>{matMis(4);return [matSrv({nt:8,tin:4}),matCon({sung:3})].join(" ")}},
  mid:{k:0,tag:"Ghen ngầm",t:"Không ai bị phạt. {mis} thôi ra mặt, nhưng ngươi biết nàng chỉ đang chờ.",fx:{duc:2},go:()=>matSrv({nt:3})},
  lose:{k:-1,tag:"Chủ cũ thành kẻ thù",w:"mis",t:MATT("{mis} thắng ván này. Ngươi bị đẩy xuống bếp sau, Hoàng thượng ít thấy ngươi hơn, và cả cung biết nàng ghét ngươi.",
   "{mis} thắng ván này. Hậu cung cười chuyện cũ của ngươi, Hoàng thượng ngại đến cung ngươi, và nàng không giấu nữa: nàng ghét ngươi."),fx:{danh:-3},go:()=>{matMis(-8,10);return [matSrv({tin:-10,nt:-3}),matCon({sung:-3})].join(" ")}}}});

rdDef("cnv_mat",6,{t:"Tránh hay gặp",w:"emp",sj:"những lần Hoàng thượng tìm ngươi",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng bắt đầu tìm cớ gặp ngươi: một lời gọi qua tiểu thái giám, một lần đi lạc vào hậu viện. Gặp thì {mis} biết, tránh thì ngài quên.",
  "Từ ngày sắc phong, ngài chưa một lần lật thẻ của ngươi, nhưng hễ gặp là nhìn. Ngài đang chờ ngươi bước tới, hay chờ ngươi giữ mình. Đi tìm ngài, hay chờ."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một lời gọi",w:"eun",if:RDW(1),t:MATT("Một tiểu thái giám của Dưỡng Tâm điện lén dúi vào tay ngươi mảnh giấy: “Giờ Tuất, rừng mai sau Ngự hoa viên.” Không có chữ ký, nhưng ai cũng biết là của ai.",
   "Tiểu thái giám Dưỡng Tâm điện mang đến một cành mai: “Hoàng thượng bảo, mai ở rừng sau Ngự hoa viên đã nở.” Đêm nay ngài không lật thẻ ai."),o:[
  {n:"Giờ Tuất đến rừng mai",c:{suc:-2},o:()=>40+S.sac/4,w:{sung:2},sc:1,f:"meet",wx:"ngài thấy ngươi đến",l:{danh:-3},lx:"có người thấy ngươi ra khỏi cung ban đêm",go:(A,ok)=>{if(ok)return matSrv({nt:10});matMis(0,4)},rt:"Ngài đứng dưới gốc mai, không nói gì, chỉ khoác áo choàng lên vai ngươi.",rf:"Người của {mis} thấy ngươi đi."},
  {n:"Gửi lại cành mai, không đến",c:{},w:{duc:3},f:"hide",wx:"giữ được thân",lx:"ngài chờ một mình",go:()=>matSrv({tin:4}),rt:"Ngươi cắm cành mai vào bình, đứng nhìn rất lâu."},
  {n:"Hỏi tiểu thái giám ai sai",c:{bac:-5},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"không bị lừa",l:{danh:-2},lx:"tiểu thái giám mách lại",rt:"Đúng là lời ngài. Ngươi biết đây không phải bẫy.",rf:"Tiểu thái giám nói dối, rồi kể khắp nơi ngươi đa nghi."}]},
 s2:{h:"Ngài không còn ghé",w:"emp",if:RDW(0),t:MATT("Đã một tháng Hoàng thượng không ghé cung {mis}. Ngươi nghe nói ngài thường dạo một mình ở hồ sen lúc chạng vạng.",
   "Đã một tháng ngài không đến cung ngươi. Ngươi nghe nói ngài thường dạo một mình ở hồ sen lúc chạng vạng, và đêm nào {mis} cũng sai người đứng chờ ở đó."),o:[
  {n:"Đi qua hồ sen như tình cờ",c:{suc:-2},o:()=>35+S.sac/4,w:{sung:2},sc:1,f:"meet",wx:"ngài thấy ngươi",l:{danh:-2},lx:"bị nói là rình rập",go:(A,ok)=>{if(ok)return matSrv({nt:10})},rt:"Ngài dừng bước: “Lại là nàng.” Giọng ngài vui.",rf:"Ngài đi lối khác. Người của {mis} thì thấy ngươi."},
  {n:"Ở yên trong cung, thêu một chiếc túi thơm",c:{bac:-5},w:{duc:2},f:"hide",wx:"lòng yên",lx:"ngài không biết ngươi chờ",rt:"Ngươi thêu cánh sen đến khuya."},
  {n:"Nhờ người dâng ngài một bình trà",c:{bac:-10},o:()=>40+S.tai/4,w:{sung:2},sc:1,wx:"ngài nhớ vị trà",l:{danh:-2},lx:"Ngự trà phòng biết ngươi nhờ vả",go:(A,ok)=>{if(ok)return matSrv({nt:6})},rt:"Ngài uống một ngụm, hỏi: “Ai pha?”",rf:"Bình trà bị Ngự trà phòng giữ lại."}]},
 c1:{h:"{mis} canh đường",w:"mis",if:MATM,t:"{mis} cho người canh mọi lối ra vào, ghi lại mỗi lần ngươi rời cung. Sổ ấy sẽ đến tay Hoàng hậu nếu ngươi sơ sẩy.",o:[
  {n:"Đi lối Ngự thiện phòng",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"meet",wx:"không ai ghi tên ngươi",l:{danh:-2},lx:"bị bắt gặp đi đường vòng",rt:"Lão thái giám bếp mở cửa sau cho ngươi.",rf:"Người canh ghi: “đi lối bếp, giờ Tuất.”"},
  {n:"Đến gặp {mis}, nói thẳng",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"nàng thôi canh",l:{danh:-2},lx:"nàng biết ngươi có chuyện giấu",go:(A,ok)=>matMis(ok?6:-4),rt:"{mis} cười buồn: “Ngươi tưởng ta muốn canh sao?” Người canh rút đi.",rf:"{mis} canh chặt hơn."},
  {n:"Không đi đâu cả",c:{},w:{duc:2},f:"hide",wx:"sổ trắng trơn",lx:"lỡ những lần ngài tìm",go:()=>matSrv({nt:-3}),rt:"Cả tháng ngươi không bước ra khỏi cổng."}]},
 c2:{h:"{v} mở cửa",w:"v",t:"{v} nhắn: Hoàng thượng hay ghé cung nàng sau giờ ngọ, ngươi cứ đến “giúp nàng cắm hoa”. Nàng cần ngươi nợ nàng.",o:[
  {n:"Đến cung {v}",c:{duc:-2},o:()=>45+S.sac/5,w:{sung:2},sc:1,f:"meet",wx:"gặp ngài ở chỗ không ai canh",l:{danh:-2},lx:"nợ {v}",go:(A,ok)=>{rdRel(A,"v",4);if(ok)return matSrv({nt:8})},rt:"Ngài thấy ngươi bên bình hoa, ngồi lại lâu hơn mọi khi.",rf:"Ngài không đến. {v} vẫn ghi ngươi một món nợ."},
  {n:"Cảm ơn mà từ chối",c:{},w:{duc:2},f:"hide",wx:"không nợ ai",lx:"{v} phật ý",go:A=>{rdOan(A,"v",4)},rt:"{v} cười nhạt: “Rồi ngươi sẽ cần ta.”"},
  {n:"Báo cho {mis} biết {v} đang dụ ngươi",if:MATM,c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,wx:"{mis} thấy ngươi không phản",l:{danh:-2},lx:"{v} biết ngươi mách",go:(A,ok)=>{rdOan(A,"v",ok?6:8);if(ok)matMis(6)},rt:"{mis} nghe, mắt dịu đi một chút.",rf:"{mis} không tin, {v} thì biết."}]},
 t1:{h:"Ngài hỏi thẳng",w:"emp",t:MATT("Lần gặp sau, Hoàng thượng hỏi khẽ: “Trẫm gọi, sao nàng không đến? Sợ chủ, hay không muốn?”",
   "Lần gặp sau, Hoàng thượng hỏi khẽ: “Trẫm phong nàng, mà nàng chưa một lần tìm trẫm. Sợ, hay không muốn?”"),o:[
  {n:"Thưa: sợ làm khó người cũ",c:{},w:{duc:3},f:"hide",wx:"ngài thấy ngươi có tình nghĩa",lx:"ngài chờ thêm",go:()=>matMis(4),rt:"Ngài gật đầu: “Trẫm hiểu.”"},
  {n:"Thưa: muốn, nhưng không dám",c:{},o:()=>40+S.sac/4+S.tai/6,w:{sung:3},sc:1,f:"meet",wx:"ngài cười",l:{danh:-2},lx:"lời ấy lọt ra ngoài",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Ngài cười, cài lại cây trâm lệch trên tóc ngươi.",rf:"Có tiếng chân sau hòn non bộ."},
  {n:"Im lặng cúi đầu",c:{},w:{tamco:2},wx:"không để lộ lòng",lx:"ngài không biết ngươi nghĩ gì",rt:"Ngài thở dài, bỏ đi trước."}]},
 x1:{h:"Đêm hội đèn",w:"emp",t:"Đêm hội đèn Nguyên tiêu, cả hậu cung ra Ngự hoa viên. Hoàng thượng đi giữa đám đèn, mắt tìm một người.",o:[
  {n:"Đứng chỗ đèn sáng nhất",c:{suc:-3},o:A=>35+(A.f.meet?15:0)+S.sac/5,e:["win","lose"],rt:"Ngài dừng trước mặt ngươi, chọn một chiếc đèn cá chép, đặt vào tay ngươi.",rf:"Ngài thấy ngươi cùng lúc với {mis}. Nàng kéo ngài đi."},
  {n:"Đứng sau, để ngài tự tìm",c:{},o:A=>40+(A.f.hide?15:0)+S.duc/5,e:["win","mid"],lx:"có thể ngài không tìm thấy",rt:"Ngài vòng qua ba dãy đèn để đến chỗ ngươi.",rf:"Ngài nhìn quanh, rồi thôi."},
  {n:"Cáo ốm ở lại",c:{},w:{duc:2},e:"mid",lx:"lỡ một đêm hội",rt:"Ngươi ngồi bên cửa sổ nhìn đèn trôi."}]}},
 E:{win:{k:1,tag:"Gặp nhau dưới đèn",w:"emp",t:MATT("Chiếc đèn cá chép treo trên đầu giường ngươi. Cả cung biết: Hoàng thượng không còn nhìn trộm nữa, ngài nhìn thẳng.",
   "Chiếc đèn cá chép treo trước cửa cung ngươi. Cả hậu cung biết: ngài đã tìm đến người ngài phong."),fx:{danh:3},go:()=>{matMis(0,4);return [matSrv({nt:12}),matCon({sung:4})].join(" ")}},
  mid:{k:0,tag:"Lỡ một lần",t:"Ngài vẫn nhớ, ngươi vẫn giữ mình. Giữa hai người chỉ còn một khoảng hành lang.",fx:{duc:2},go:()=>matSrv({nt:3})},
  lose:{k:-1,tag:"{mis} chen giữa",w:"mis",t:"{mis} đứng giữa ngươi và ngài suốt đêm hội. Ngài đi với nàng, còn ngươi bị người ta nhìn thấy đứng chờ.",fx:{danh:-3},go:()=>{matMis(-4,6);return [matSrv({tin:-6}),matCon({sung:-2})].join(" ")}}}});

rdDef("cnv_mat",7,{t:"Kính sự phòng ghi tên",w:"eun",sj:"tên ngươi trong sổ Kính sự phòng",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng truyền Kính sự phòng ghi tên một cung nữ vào sổ. Từ khi tên ấy vào sổ đến đêm lật thẻ còn mười ngày: đủ để {mis} xin gạch, đủ để {v} mua chuộc.",
  "Thẻ xanh mang tên ngươi đã nằm trên khay Kính sự phòng, nhưng luôn ở dưới cùng. Trước kỳ lật thẻ tới, phải đưa thẻ lên, hoặc chấp nhận chờ."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tên đã vào sổ",w:"eun",if:RDW(1),t:MATT("Sáng nay, thái giám Kính sự phòng đến cung {mis}, đọc to tên ngươi. Cả cung quỳ nghe. {mis} cười, mà tay bóp nát cánh hoa.",
   "Thái giám Kính sự phòng đến tận cửa: “Hoàng thượng hỏi thẻ của tiểu chủ. Nô tài sẽ đặt lên trên, chỉ là… khay nặng lắm.” Hắn chờ bạc."),o:[
  {n:"Quỳ tạ, rồi tạ {mis}",need:["srv"],c:{},w:{tin:6},wx:"chủ không thể nói ngươi vô ơn",lx:"phải cúi thêm một lần",go:()=>matMis(4),rt:"{mis} đỡ ngươi dậy trước mặt mọi người."},
  {n:"Lặng lẽ nhận, không nói gì",need:["srv"],c:{},w:{tamco:2},wx:"không để ai bắt lời",lx:"chủ cho là ngươi kiêu",go:()=>matMis(-3),rt:"Ngươi về phòng, đóng cửa."},
  {n:"Đưa bạc cho thái giám, trước kỳ lật thẻ",need:["nsrv"],c:{bac:-40},w:{sung:2},wx:"thẻ lên trên",lx:"thành lệ, lần sau hắn lại đòi",rt:"Thái giám cúi gập người: “Tiểu chủ yên tâm.”"},
  {n:"Không đưa, chờ ngài tự lật",need:["nsrv"],c:{},o:()=>35+S.sung/3,w:{duc:3},sc:1,wx:"tay sạch",l:{sung:-2},lx:"thẻ nằm dưới thêm một tháng",rt:"Ngài lật thẻ ngươi giữa một khay đầy.",rf:"Cả tháng thẻ ngươi không được lật."}]},
 s2:{h:"Ngài nói mà chưa ghi",w:"eun",if:RDW(0),t:MATT("Ngươi nghe nói Hoàng thượng đã bảo Kính sự phòng “nhớ lấy con bé ở cung {mis}”. Nhưng mười ngày qua, sổ vẫn chưa có tên ngươi.",
   "Thẻ của ngươi nằm dưới đáy khay đã hai tháng. Có người nói, mỗi lần khay dâng lên, thẻ ấy lại bị rút ra."),o:[
  {n:"Nhờ người dò ai giữ lại",c:{bac:-10},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"biết kẻ cản",l:{danh:-2},lx:"Kính sự phòng biết ngươi dò",rt:"Kẻ rút thẻ là một tiểu thái giám ăn bạc của {v}.",rf:"Người dò bị đuổi về."},
  {n:"Chờ, không hỏi",c:{},w:{duc:3},wx:"giữ thể diện",lx:"tên ngươi càng xa sổ",go:()=>matSrv({nt:-2}),rt:"Ngươi tiếp tục ngày của mình."},
  {n:"Dâng ngài một chiếc túi thơm",need:["srv"],c:{bac:-5},o:()=>40+S.nt/4,w:{nt:8},sc:1,wx:"ngài nhớ lại",l:{tin:-8},lx:"chủ biết",rt:"Ngài đeo túi thơm suốt buổi chầu.",rf:"Túi thơm đến tay {mis} trước."},
  {n:"Gửi ngài một bài thơ",need:["nsrv"],c:{suc:-2},o:()=>35+S.tai/3,w:{sung:3},sc:1,wx:"ngài nhớ chữ ngươi",l:{danh:-2},lx:"bài thơ bị truyền tay",rt:"Ngài phê một chữ “Được” bên lề.",rf:"Bài thơ đến tay {v} trước, nàng chép ra cười."}]},
 c1:{h:"{v} mua thái giám",w:"v",t:"Ngươi biết chắc: {v} trả bạc cho một tiểu thái giám Kính sự phòng để tên ngươi lần nào cũng nằm dưới cùng.",o:[
  {n:"Trả bạc cao hơn {v}",c:{bac:-15},o:()=>45+S.mat*4,w:{sung:2},sc:1,wx:"tiểu thái giám đổi phe",l:{danh:-3},lx:"thành kẻ đi mua thẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Tiểu thái giám nhận cả hai bên, nhưng đặt thẻ ngươi lên trên.",rf:"Hắn ăn cả hai, chẳng làm gì."},
  {n:"Báo Tổng quản thái giám",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"clean",wx:"kẻ ăn bạc bị đuổi",l:{danh:-2},lx:"{v} biết ngươi tố",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{eun} cho đánh tiểu thái giám hai mươi trượng.",rf:"{eun} ậm ừ, không xử ai."},
  {n:"Gặp {v} hỏi thẳng",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{v} thôi tay",l:{danh:-2},lx:"{v} chối, càng hận",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} cười gượng: “Đùa thôi mà.” Từ đó thẻ ngươi yên.",rf:"{v} nói: “Ngươi có chứng cứ không?”"}]},
 c2:{h:"{mis} xin gạch tên",w:"mis",if:MATM,t:MATT("{mis} đến Kính sự phòng, nói ngươi “thân thể yếu, chưa hợp hầu giá”, xin gạch tên. Hoàng hậu sẽ xét trước kỳ lật thẻ.",
   "{mis} tâu với Hoàng hậu rằng ngươi “mới lên, chưa thuộc phép thị tẩm”, xin cho ngươi học thêm một năm. Hoàng hậu sẽ xét trước kỳ lật thẻ."),o:[
  {n:"Xin thái y bắt mạch làm chứng",c:{bac:-10},o:()=>50+S.suc/10,w:{danh:2},sc:1,wx:"lời {mis} hóa vô căn",l:{danh:-2},lx:"thái y nói lấp lửng",go:(A,ok)=>{if(ok)matMis(0,4)},rt:"Thái y viết: “Khí huyết đầy đủ.” Hoàng hậu gật đầu.",rf:"Thái y viết: “Hơi hư nhược.” Ngươi phải chờ."},
  {n:"Xin {mis} rút lại",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"không làm to chuyện",l:{danh:-2},lx:"phải cầu xin người cũ",go:(A,ok)=>matMis(ok?6:-4),rt:"{mis} im lâu, rồi rút đơn.",rf:"{mis} bảo: “Đã muộn.”"},
  {n:"Để Hoàng hậu xét",c:{hh:-2},w:{duc:2},wx:"không ai nói ngươi tranh",lx:"phó mặc cho người khác",rt:"Hoàng hậu giữ đơn lại, chưa phê."}]},
 t1:{h:"Ngày lật thẻ gần kề",w:"eun",t:"Còn ba ngày đến kỳ lật thẻ. Thái giám Kính sự phòng nói nhỏ: “Thẻ có thể lên, có thể xuống. Tùy người.”",o:[
  {n:"Tặng thái giám một vật cũ",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"buy",wx:"có người giúp",l:{danh:-2},lx:"lộ thì mang tiếng mua thẻ",rt:"Hắn nhận chiếc trâm bạc, gật đầu.",rf:"Hắn nhận rồi nói với {v}."},
  {n:"Không cho gì",c:{},w:{duc:3},f:"clean",wx:"tay sạch",lx:"thẻ tùy may rủi",rt:"Ngươi chỉ cảm ơn rồi về."},
  {n:"Nhờ người thân cận ngài nhắc tên",c:{suc:-2},o:()=>35+S.sac/5+S.danh/5,w:{sung:2},sc:1,wx:"ngài tự hỏi",l:{danh:-2},lx:"người ta bảo ngươi cầu cạnh",go:(A,ok)=>{if(ok)return matSrv({nt:6})},rt:"Ngài hỏi: “Thẻ người ấy đâu?”",rf:"Người được nhờ quên mất."}]},
 x1:{h:"Đêm lật thẻ",w:"emp",t:"Khay thẻ dâng lên Dưỡng Tâm điện. Hoàng thượng đưa tay lướt qua hàng thẻ xanh.",o:[
  {n:"Tin vào lời ngài đã nói",c:{},o:A=>40+(A.f.clean?15:0)+S.sac/6+S.duc/6,e:["win","mid"],lx:"không làm gì thêm",rt:"Ngài lật thẻ ngươi, không do dự.",rf:"Ngài lật thẻ người khác. Thẻ ngươi vẫn ở đó."},
  {n:"Để người đã mua đặt thẻ lên trên",c:{bac:-10},o:A=>40+(A.f.buy?20:0)+(A.f.know?10:0),e:["win","lose"],rt:"Thẻ ngươi nằm trên cùng. Ngài lật.",rf:"Tổng quản bắt quả tang tiểu thái giám đổi khay."},
  {n:"Xin rút thẻ một kỳ",c:{},w:{duc:3},e:"mid",lx:"chờ thêm",go:()=>matMis(3),rt:"Ngươi xin nghỉ một kỳ, {mis} yên lòng."}]}},
 E:{win:{k:1,tag:"Thẻ được lật",w:"emp",t:MATT("Thánh dụ truyền xuống: ngày mai cung nữ ở cung {mis} hầu giá. Cả cung chạy tới chạy lui. Lần đầu tiên, tên ngươi đứng trên một tờ giấy vàng.",
   "Thẻ xanh mang tên ngươi được lật. Đêm mai, kiệu Kính sự phòng sẽ đến cửa cung ngươi."),fx:{danh:3},go:A=>{rdOan(A,"v",4);return [matSrv({nt:10}),matCon({sung:3})].join(" ")}},
  mid:{k:0,tag:"Tên còn chờ",t:"Tên ngươi vẫn ở đó, không lên không xuống. Kỳ sau, hay kỳ sau nữa.",fx:{duc:2},go:()=>matSrv({nt:3})},
  lose:{k:-1,tag:"Mang tiếng mua thẻ",t:"Chuyện đổi khay lộ ra. Không ai chứng được ngươi sai khiến, nhưng ai cũng nói. Kính sự phòng ghi chú bên tên ngươi một dấu đỏ.",fx:{danh:-5},go:()=>[matSrv({nt:-4,tin:-5}),matCon({sung:-3})].join(" ")}}});

rdDef("cnv_mat",8,{t:"Đêm đầu",w:"emp",sj:"đêm đầu tiên bên Hoàng thượng",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng gọi ngươi đến hầu đêm. Một cung nữ chưa có phẩm vị mà được gọi, thì hoặc sáng ra thành tiểu chủ, hoặc bị trả về như chưa từng có. Trước khi trời sáng, mọi chuyện sẽ ngã ngũ.",
  "Đêm đầu tiên ngài ngự ở cung ngươi. Một đêm có thể khiến ngài nhớ mãi, hoặc khiến ngài không quay lại. Và cả hậu cung đang thức để nghe."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kiệu đến cửa",w:"eun",if:RDW(1),t:MATT("Kiệu Kính sự phòng dừng trước cung {mis}. Ma ma tắm gội cho ngươi bằng nước hoa bưởi. {mis} đứng ở cửa, không vào, cũng không đi.",
   "Kiệu Kính sự phòng dừng trước cửa cung ngươi. Cả dãy cung đèn tắt mà không ai ngủ."),o:[
  {n:"Ra chào {mis} trước khi đi",need:["srv"],c:{suc:-2},o:()=>40+S.tin/3,w:{tin:6},sc:1,f:"mis",wx:"chủ không thể nói ngươi vô ơn",l:{tin:-6},lx:"chủ quay lưng",go:(A,ok)=>matMis(ok?8:-2),rt:"{mis} sửa lại cổ áo cho ngươi: “Đi đi.”",rf:"{mis} đóng cửa trước mặt ngươi."},
  {n:"Lên kiệu, không ngoái lại",need:["srv"],c:{},w:{tamco:2},wx:"lòng không vướng",lx:"chủ ghi nhớ",go:()=>matMis(-4),rt:"Kiệu đi. Sau lưng ngươi, một cánh cửa đóng lại."},
  {n:"Sửa sang cung, dặn người hầu kín miệng",need:["nsrv"],c:{bac:-20},w:{mat:1},f:"mis",wx:"chuyện đêm nay không lọt ra",lx:"tốn bạc",rt:"Người hầu của ngươi gật đầu, khép hết cửa sổ."},
  {n:"Sai người báo {mis} một tiếng",need:["nsrv"],c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"mis",wx:"người cũ biết ngươi không giấu",l:{danh:-2},lx:"bị cười là còn sợ chủ cũ",go:(A,ok)=>matMis(ok?6:-2),rt:"{mis} gửi lại một câu: “Chúc tiểu chủ bình an.”",rf:"{mis} không đáp."}]},
 s2:{h:"Lời gọi bất ngờ",w:"emp",if:RDW(0),t:MATT("Không qua sổ, không qua thẻ, Hoàng thượng sai người gọi thẳng “cung nữ hầu trà ở cung {mis}” đến Dưỡng Tâm điện giữa đêm mưa. Kính sự phòng chưa kịp biết.",
   "Không lật thẻ, Hoàng thượng đi bộ một mình đến cung ngươi giữa đêm mưa. Người hầu của ngươi hoảng hốt thắp đèn."),o:[
  {n:"Đi ngay, không kịp sửa soạn",c:{},o:()=>40+S.sac/4,w:{sung:2},sc:1,f:"plain",wx:"ngài thấy ngươi đúng như ngươi",l:{danh:-2},lx:"bị cười là quê mùa",rt:"Ngài nhìn tóc ngươi còn ướt, bật cười.",rf:"Thái giám Dưỡng Tâm điện lắc đầu khi thấy ngươi."},
  {n:"Xin một khắc để sửa soạn",c:{suc:-2},w:{danh:2},wx:"giữ được thể diện",lx:"để ngài chờ",rt:"Ngươi búi tóc, cài một cây trâm bạc."},
  {n:"Xin ngài theo đúng phép",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"rule",wx:"không ai bắt lỗi được",l:{sung:-2},lx:"ngài mất hứng",rt:"Ngài cười: “Được, trẫm theo phép.” Ngài cho người báo Kính sự phòng.",rf:"Ngài phẩy tay bỏ về."}]},
 c1:{h:"{v} cho người chặn",w:"v",t:"Nửa đường, một cung nữ của {v} đâm sầm vào ngươi, đánh đổ hộp hương. Nàng ta khóc lóc, kéo dài thời gian.",o:[
  {n:"Bỏ hộp hương, đi tiếp",c:{bac:-5},w:{tamco:2},wx:"không trễ giờ",lx:"mất hương",go:A=>{rdOan(A,"v",3)},rt:"Ngươi đến đúng giờ, tay không."},
  {n:"Đỡ nàng ta dậy, hỏi ai sai",c:{suc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"có lời khai",l:{danh:-2},lx:"trễ giờ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Nàng ta run run khai tên {v}.",rf:"Nàng ta chạy mất."},
  {n:"Gọi thị vệ đến",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,wx:"có người làm chứng",l:{danh:-2},lx:"ồn ào cả hành lang",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thị vệ ghi lại tên cung nữ ấy.",rf:"Thị vệ bảo đó chỉ là va chạm."}]},
 c2:{h:"Lời dặn của ma ma",w:"maid",t:"Ma ma Kính sự phòng dặn: “Đừng nói nhiều, đừng hỏi gì, đừng xin gì. Đêm đầu mà xin là đêm cuối.”",o:[
  {n:"Ghi nhớ từng lời",c:{},w:{duc:2},f:"rule",wx:"không phạm phép",lx:"ngươi sẽ chỉ là một người như mọi người",rt:"Ngươi gật đầu."},
  {n:"Hỏi ma ma ngài thích gì",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"biết ý ngài",l:{danh:-2},lx:"ma ma kể lại với người khác",rt:"Ma ma nói nhỏ: “Ngài thích người kể chuyện quê.”",rf:"Ma ma nói thứ ai cũng biết."},
  {n:"Tự nghĩ cách riêng",c:{suc:-2},w:{tai:1},f:"plain",wx:"không giống ai",lx:"có thể sai phép",rt:"Ngươi nhẩm lại bài dân ca quê nhà."}]},
 t1:{h:"Ngài hỏi chuyện quê",w:"emp",t:"Đèn đã tắt một nửa. Hoàng thượng hỏi: “Quê nàng có gì?”",o:[
  {n:"Kể chuyện mùa gặt",c:{},o:()=>40+S.tai/4,w:{sung:2},sc:1,f:"plain",wx:"ngài nghe say",l:{danh:-1},lx:"ngài ngủ quên",rt:"Ngài nghe đến tận canh ba.",rf:"Ngài ngủ trước khi chuyện hết."},
  {n:"Hát bài dân ca bên giếng",c:{suc:-2},o:()=>35+S.sac/5+S.tai/5,w:{sung:3},sc:1,f:"plain",wx:"ngài nhớ giọng ngươi",l:{danh:-2},lx:"tiếng hát lọt ra ngoài",rt:"Ngài nhắm mắt: “Bài này trẫm đã nghe một lần, sau cửa hậu viện.”",rf:"Thái giám gác cửa kể lại cho cả cung."},
  {n:"Thưa: không dám nói",c:{},w:{duc:2},f:"rule",wx:"giữ phép",lx:"ngài thấy ngươi nhạt",rt:"Ngài gật đầu, thôi hỏi."}]},
 x1:{h:"Gần sáng",w:"emp",t:MATT("Trời gần sáng. Thái giám Kính sự phòng đứng ngoài rèm hỏi: “Giữ hay không giữ?” Hoàng thượng quay sang nhìn ngươi.",
   "Trời gần sáng. Hoàng thượng ngồi dậy, khoác áo, nhìn ngươi rất lâu, như đang quyết định có quay lại hay không."),o:[
  {n:"Không xin gì, chỉ cúi đầu",c:{},o:A=>40+(A.f.rule?15:0)+S.duc/5,e:["win","mid"],lx:"để mặc ngài quyết",rt:"Ngài nói: “Giữ.”",rf:"Ngài im lặng bước ra."},
  {n:"Nói một câu thật lòng",c:{suc:-2},o:A=>35+(A.f.plain?15:0)+(A.f.know?5:0)+S.sac/5,e:["win","lose"],rt:"Ngài bật cười, rồi nắm tay ngươi rất lâu.",rf:"Ngài nhíu mày: “Nàng nói nhiều quá.”"},
  {n:"Xin ngài nhớ đến {mis}",if:MATM,c:{sung:-3},o:A=>50+(A.f.mis?15:0),e:["mid","lose"],go:()=>matMis(6),rt:"Ngài ngạc nhiên, rồi gật đầu.",rf:"Ngài cho là ngươi đang diễn."}]}},
 E:{win:{k:1,tag:"Ngài giữ ngươi lại",w:"emp",t:A=>A.f.up?`Sáng ra, thánh chỉ đến trước cả nắng: cung nữ hầu trà được phong ${RANKS[0].n}. {mis} quỳ nghe chỉ cùng cả cung, rồi đứng dậy trước.`
   :MATR()?"Ngài ở lại đến khi trời sáng hẳn, và trước khi đi, dặn Kính sự phòng: “Thẻ này, đặt trên cùng.”"
   :"Ngài muốn giữ ngươi, nhưng Kính sự phòng tâu: cung nữ chưa đủ danh, chưa thể phong. Ngài chỉ nói: “Trẫm nhớ rồi.” Ngươi được đưa về cung {mis} trước khi trời sáng.",
   fx:{danh:4},go:A=>{if(S.srv&&!S.srv.risen&&S.nt>=BAL.ntRise.at&&typeof srvRise==="function"){A.f.up=1;srvRise("Hoàng thượng giữ ngươi lại Dưỡng Tâm điện");return ""}
    return [matSrv({nt:14}),matCon({sung:5})].join(" ")}},
  mid:{k:0,tag:"Một đêm lặng lẽ",t:MATT("Ngươi được đưa về trước khi trời sáng, không giữ, không trả. Kính sự phòng ghi: “Hầu trà.” Ngài vẫn nhớ, nhưng chưa quyết.",
   "Ngài đi lúc trời chưa sáng. Không có ban thưởng, cũng không có lời trách. Một đêm như mọi đêm."),fx:{duc:2},go:()=>[matSrv({nt:6}),matCon({sung:1})].join(" ")},
  lose:{k:-1,tag:"Lời gọi bị trả về",w:"mis",t:MATT("Kính sự phòng đưa ngươi về giữa đêm, như trả một món đồ. Sáng ra cả cung biết. {mis} không nói gì, chỉ sai ngươi trở lại bếp sau.",
   "Ngài đi giữa đêm. Sáng ra cả hậu cung biết. {v} sai người mang sang một hộp bánh “an ủi”."),fx:{danh:-4},go:A=>{rdOan(A,"v",3);return [matSrv({tin:-5,nt:-4}),matCon({sung:-4})].join(" ")}}}});

rdDef("cnv_mat",9,{t:"Từ tớ thành chủ",w:"mis",sj:"ngươi và {mis}",cast(A){return MATM()&&rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng đã gọi tên ngươi, mà ngươi vẫn mặc áo cung nữ, vẫn hầu {mis}. Cả cung không biết gọi ngươi là gì. {mis} cũng không biết.",
  "Ngươi nay ngồi ngang hàng với người ngươi từng quỳ hầu. Người hầu cũ của {mis} phải cúi chào ngươi. Đứng thế nào cho phải, là việc của chương này."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chỗ ngồi",w:"hh",if:RDW(1),t:MATT("Hoàng hậu mở yến. {mis} được mời, còn ngươi được gọi theo hầu. Nhưng Hoàng thượng sai đặt thêm một chiếc ghế đẩu cạnh ngự tọa “cho con bé hầu trà”.",
   "Yến thưởng cúc ở cung Hoàng hậu. Ghế của ngươi được đặt ngay trên ghế {mis}: ngài vừa ban ngươi thêm ân sủng, phép cung xếp theo ơn."),o:[
  {n:"Xin ngồi sau {mis}",c:{sung:-2},w:{duc:4},f:"low",wx:"người cũ được giữ thể diện",lx:"ngài thấy ngươi từ chối ơn",go:()=>{matMis(8);return matSrv({tin:6})},rt:"{mis} nhìn ngươi, mắt hơi đỏ."},
  {n:"Ngồi đúng chỗ được xếp",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"high",wx:"cả điện biết vị trí của ngươi",l:{danh:-2},lx:"{mis} mất mặt",go:(A,ok)=>matMis(0,ok?6:4),rt:"Ngươi ngồi, thẳng lưng. Không ai dám cười.",rf:"Có người cười khẽ: “Mới hôm qua còn bưng khay.”"},
  {n:"Đổi chỗ với {mis} mà không nói",c:{suc:-2},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,f:"low",wx:"cả hai cùng có mặt mũi",l:{danh:-2},lx:"Hoàng hậu thấy loạn phép",go:(A,ok)=>matMis(ok?6:0),rt:"Ngươi khéo đứng dậy rót trà, rồi ngồi xuống ghế dưới. {mis} hiểu.",rf:"Hoàng hậu nhắc: “Ai ngồi chỗ nấy.”"}]},
 s2:{h:"Người cũ không cúi",w:"mis",if:RDW(0),t:MATT("Từ đêm ấy, {mis} không sai ngươi việc gì nữa, cũng không cho ngươi đi. Ngươi ở trong cung nàng như một cái bóng.",
   "Người hầu cũ của {mis}, những người từng ngủ cùng phòng với ngươi, nay gặp ngươi không cúi chào. {mis} để mặc."),o:[
  {n:"Tự tìm việc mà làm",need:["srv"],c:{suc:-3},w:{tin:5},f:"low",wx:"không ai nói ngươi ăn không",lx:"vẫn là bóng",rt:"Ngươi lau lại từng ô cửa. {mis} nhìn mà không nói."},
  {n:"Xin {mis} cho một chỗ rõ ràng",need:["srv"],c:{},o:()=>40+S.tin/3,w:{tin:5},sc:1,wx:"có chỗ đứng",l:{tin:-6},lx:"chủ cho là ngươi đòi",go:(A,ok)=>matMis(ok?6:-3),rt:"{mis} cho ngươi trông phòng trà riêng.",rf:"{mis} bảo: “Ngươi tự biết.”"},
  {n:"Cười cho qua",need:["nsrv"],c:{danh:-2},w:{duc:3},f:"low",wx:"không thành chuyện",lx:"phép cung bị coi nhẹ",rt:"Ngươi chỉ gật đầu chào trước họ."},
  {n:"Gọi họ lại, dạy phép",need:["nsrv"],c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"high",wx:"phép cung được giữ",l:{danh:-2},lx:"bị nói là quên gốc",go:(A,ok)=>matMis(0,ok?4:6),rt:"Họ quỳ xuống. Một người khóc.",rf:"Họ quỳ, rồi chạy về mách {mis}."}]},
 c1:{h:"Bạn cùng phòng năm xưa",w:"maid",t:MATT("Mấy cung nữ ngủ cùng phòng với ngươi bỗng xa cách. Một người lén hỏi: “Sau này tỷ có nhớ bọn muội không?”",
   "Một cung nữ từng ngủ cùng phòng với ngươi xin chuyển sang hầu cung ngươi. {mis} chưa cho."),o:[
  {n:"Hứa sẽ nhớ",c:{bac:-5},w:{duc:3},wx:"có người thật lòng",lx:"lời hứa nặng",rt:"Nàng ta ôm ngươi khóc."},
  {n:"Rủ họ cùng làm việc như xưa",need:["srv"],c:{suc:-2},w:{tin:3,duc:1},wx:"tình cũ còn",lx:"mệt thêm một ca",rt:"Cả phòng cười như năm đầu vào cung."},
  {n:"Xin {mis} cho người ấy theo ngươi",need:["nsrv"],c:{suc:-2},o:()=>35+S.tamco/4,w:{mat:1},sc:1,wx:"có người tin cẩn",l:{danh:-2},lx:"{mis} cho là ngươi lấy người của nàng",go:(A,ok)=>matMis(ok?2:-4),rt:"{mis} gật đầu: “Đem đi.”",rf:"{mis} từ chối, còn phạt nàng kia."},
  {n:"Giữ khoảng cách",c:{},w:{tamco:2},wx:"không ai nắm được ngươi",lx:"người cũ buồn",rt:"Ngươi chỉ cười, không hứa."}]},
 c2:{h:"{v} khích",w:"v",t:"{v} nói nhỏ với ngươi: “{mis} nắm cả quá khứ của ngươi. Không đẩy nàng xuống, nàng sẽ kéo ngươi xuống.”",o:[
  {n:"Bắt tay {v} chèn {mis}",c:{duc:-5},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"high",wx:"{mis} yếu đi",l:{danh:-3},lx:"thành kẻ phản chủ cũ",go:(A,ok)=>{rdRel(A,"v",6);matMis(-8,ok?12:6)},rt:"Một tháng sau, {mis} bị cắt bổng vì “quản người không nghiêm”.",rf:"{mis} biết ngươi bắt tay {v}."},
  {n:"Từ chối, báo {mis}",c:{},w:{duc:3},f:"low",wx:"người cũ thấy ngươi giữ nghĩa",lx:"{v} thù",go:A=>{rdOan(A,"v",8);matMis(8)},rt:"{mis} nghe xong, lần đầu gọi ngươi là “muội”."},
  {n:"Gật đầu cho {v} yên, không làm gì",c:{},w:{tamco:2},wx:"không ai biết ý ngươi",lx:"{v} sẽ đòi",go:A=>{rdOan(A,"v",3)},rt:"{v} tưởng ngươi đã theo nàng."}]},
 t1:{h:"Chuyện cũ trong tay {mis}",w:"mis",if:MATM,t:"{mis} cầm một tờ giấy: sổ phạt ngày ngươi làm vỡ ngự trản năm đầu vào cung. Một tờ giấy nhỏ, đủ để người ta nói ngươi gian dối.",o:[
  {n:"Xin {mis} đốt đi",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"low",wx:"chuyện cũ khép lại",l:{danh:-2},lx:"phải hạ mình",go:(A,ok)=>matMis(ok?8:-4),rt:"{mis} thả tờ giấy vào lò.",rf:"{mis} cất tờ giấy vào tay áo."},
  {n:"Tự kể với Hoàng thượng trước",c:{sung:-2},o:()=>40+S.sac/5+S.duc/5,w:{danh:2},sc:1,f:"high",wx:"tờ giấy hết giá",l:{danh:-2},lx:"ngài biết thêm một lỗi cũ",rt:"Ngài cười: “Ngự trản ấy trẫm cũng chẳng thích.”",rf:"Ngài nhíu mày, nhưng không hỏi thêm."},
  {n:"Đổi lấy một lời hứa",c:{},w:{tamco:2},wx:"cả hai giữ thóp nhau",lx:"không ai tin ai",go:()=>matMis(2),rt:"Ngươi hứa không bao giờ nói xấu nàng trước mặt ngài. Nàng giữ tờ giấy, nhưng không dùng."}]},
 x1:{h:"Một lời của {mis}",w:"mis",t:MATT("Hoàng thượng hỏi {mis} trước mặt ngươi: “Người này, nàng thấy thế nào?” Một lời của nàng có thể mở cửa hay khóa cửa.",
   "Hoàng hậu hỏi {mis} trước mặt cả điện: “Người hầu cũ của muội, nay là tiểu chủ. Muội thấy thế nào?”"),o:[
  {n:"Nhìn {mis}, không nói gì",c:{},o:A=>40+(A.f.low?20:0)+S.duc/6,e:["win","mid"],lx:"phó mặc cho người cũ",rt:"{mis} nói: “Là người tốt.” Câu ấy, cả cung nghe.",rf:"{mis} chỉ nói: “Tùy bệ hạ.”"},
  {n:"Tự trả lời trước",c:{suc:-2},o:A=>35+(A.f.high?15:0)+S.tai/5,e:["win","lose"],rt:"Ngươi nói: “Nếu không có tỷ, không có hôm nay.” {mis} ngẩn ra.",rf:"Ngươi nói hớ một câu, {mis} cười lạnh."},
  {n:"Cúi đầu lui",c:{},w:{duc:2},e:"mid",lx:"không ai biết lòng ngươi",rt:"Ngươi lui ra. Câu hỏi treo lơ lửng."}]}},
 E:{win:{k:1,tag:"Ngang hàng mà còn nghĩa",w:"mis",t:MATT("{mis} xin Hoàng thượng cho ngươi thôi hầu nàng, “để nó chờ chỉ dụ cho đàng hoàng”. Ngươi vẫn ở cung nàng, nhưng không còn là nô tỳ của ai.",
   "{mis} gọi ngươi là “muội” trước mặt cả điện. Từ đó không ai còn dám nhắc ngươi từng hầu nàng."),fx:{danh:4,duc:2},go:()=>{matMis(10);return [matSrv({tin:8,nt:6}),matCon({sung:2})].join(" ")}},
  mid:{k:0,tag:"Không thân không thù",t:"Ngươi và {mis} gặp nhau thì chào, xong thì thôi. Giữa hai người còn một tờ giấy chưa đốt.",fx:{duc:2}},
  lose:{k:-1,tag:"{mis} thành kẻ thù công khai",w:"mis",t:MATT("{mis} nói trước mặt ngài: “Nó hầu ta ba năm, ta biết nó.” Câu ấy đủ để ngài lưỡng lự. Từ đó nàng không giấu lòng ghét nữa.",
   "{mis} nói trước cả điện: “Hầu ta ba năm, ta biết nó là người thế nào.” Từ đó nàng không giấu lòng ghét nữa."),fx:{danh:-4},go:()=>{matMis(-8,10);return [matSrv({tin:-10,nt:-3}),matCon({sung:-3})].join(" ")}}}});

rdDef("cnv_mat",10,{t:"Lời đồn quyến rũ",w:"v",sj:"lời đồn ngươi quyến rũ Hoàng thượng",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Khắp hậu cung truyền nhau: cung nữ ở cung {mis} dùng bùa mê dụ dỗ thánh thượng. Với một cung nữ, đó là tội đày Tân Giả khố. Kẻ tung tin là {v}. Hoàng hậu đã cho người tra.",
  "Khắp hậu cung truyền nhau: tiểu chủ xuất thân cung nữ dùng bùa mê dụ dỗ thánh thượng. Kẻ tung tin là {v}. Hoàng hậu đã cho người tra, và Thái hậu đã nghe."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Gói bùa trong gối",w:"v",if:RDW(1),t:"Một sáng, thái giám Hoàng hậu đến khám phòng ngươi. Trong gối có một gói vải đỏ thêu chữ lạ. Ngươi chưa thấy nó bao giờ.",o:[
  {n:"Xin khám luôn phòng người khác",c:{suc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"fight",wx:"lộ ra ai từng vào phòng",l:{danh:-3},lx:"bị coi là cãi lệnh",rt:"Trong phòng một cung nữ của {v} còn nửa cuộn chỉ đỏ cùng màu.",rf:"Thái giám không nghe."},
  {n:"Nhận là không biết, xin tra",c:{},w:{duc:3},f:"calm",wx:"bình tĩnh",lx:"chưa ai tin",rt:"Ngươi quỳ, giọng không run."},
  {n:"Đốt ngay trước mặt mọi người",c:{danh:-3},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,wx:"vật chứng mất",l:{danh:-3},lx:"bị cho là phi tang",rt:"Gói vải cháy, chỉ còn lời nói.",rf:"Thái giám giật lại, ghi thêm tội."}]},
 s2:{h:"Lời đồn đã thành án",w:"hh",if:RDW(0),t:"Lời đồn đến tai Hoàng hậu trước khi đến tai ngươi. Hoàng hậu cho gọi ngươi đến hỏi, có cả {v} ngồi bên.",o:[
  {n:"Quỳ nghe, không cãi",c:{},w:{duc:3},f:"calm",wx:"Hoàng hậu thấy ngươi biết phép",lx:"lời đồn chưa được bác",rt:"Hoàng hậu gật đầu: “Để ta xét.”"},
  {n:"Hỏi {v} có thấy tận mắt không",c:{suc:-2},o:()=>40+S.tai/4+S.danh/5,w:{danh:3},sc:1,f:"fight",wx:"{v} lúng túng",l:{hh:-3},lx:"Hoàng hậu thấy ngươi hỗn",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"{v} đỏ mặt: “Người ta nói thế.”",rf:"{v} đáp: “Ta không thấy, nhưng ai cũng nói.”"},
  {n:"Xin thái y khám người",c:{bac:-10},o:()=>50+S.duc/6,w:{danh:2},sc:1,wx:"không có bùa, không có thuốc",l:{danh:-2},lx:"chịu nhục",rt:"Thái y tâu: không có gì lạ.",rf:"Thái y ngập ngừng, không dám nói chắc."}]},
 c1:{h:"Người tung tin",w:"maid",t:"Một cung nữ đồng hương nói nhỏ: người kể đầu tiên là a hoàn của {v}, kể ở giếng nước, ngay chiều hôm Hoàng thượng gọi ngươi.",o:[
  {n:"Tìm a hoàn ấy hỏi",c:{bac:-10},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"wit",wx:"có người khai",l:{danh:-2},lx:"{v} biết ngươi dò",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"A hoàn khóc: “Chủ bắt nô tỳ nói.”",rf:"A hoàn đã bị đưa ra khỏi cung."},
  {n:"Nhờ người đồng hương làm chứng",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"wit",wx:"có nhân chứng",l:{danh:-2},lx:"nàng ấy bị liên lụy",rt:"Nàng gật đầu, run run.",rf:"Nàng sợ, rút lời."},
  {n:"Giữ kín, chờ thời",c:{},w:{tamco:2},wx:"chưa lộ bài",lx:"lời đồn cứ lan",rt:"Ngươi ghi nhớ cái tên."}]},
 c2:{h:"{mis} đứng đâu",w:"mis",if:MATM,t:MATT("Người ta đến hỏi {mis}: người hầu của nàng có thật dùng bùa? Một lời của nàng nặng hơn mười lời đồn.",
   "Người ta hỏi {mis}: người hầu cũ của nàng có thật dùng bùa? Một lời của chủ cũ nặng hơn mười lời đồn."),o:[
  {n:"Đến xin {mis} nói giúp",c:{suc:-3},o:()=>35+S.duc/4+(MATR()?0:S.tin/5),w:{duc:2},sc:1,f:"mis",wx:"có người đứng ra",l:{danh:-2},lx:"phải cầu người cũ",go:(A,ok)=>matMis(ok?8:-3),rt:"{mis} nói: “Nó hầu ta ba năm, chưa từng có thứ ấy.”",rf:"{mis} nói: “Ta không biết.”"},
  {n:"Không cầu, để {mis} tự chọn",c:{},w:{duc:2},wx:"không nợ ai",lx:"có thể nàng im",rt:"Ngươi không đến. {mis} cũng không đến."},
  {n:"Cho {mis} biết {v} cũng định kéo nàng vào",c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"mis",wx:"{mis} cùng chống {v}",l:{danh:-2},lx:"{mis} thấy bị lợi dụng",go:(A,ok)=>{if(ok){matMis(6);rdOan(A,"v",4)}else matMis(-3)},rt:"{mis} nheo mắt: “Nó dám?”",rf:"{mis} không tin."}]},
 t1:{h:"Thái hậu hỏi",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi đến Đức Thọ cung: “Người ta nói ngươi dùng bùa. Ngươi dùng gì?”",o:[
  {n:"Thưa: dùng trà và lòng thành",c:{},o:()=>40+S.tai/4+S.duc/6,w:{th:4},sc:1,f:"calm",wx:"Thái hậu bật cười",l:{th:-3},lx:"Thái hậu cho là ngươi lẻo mép",rt:"Thái hậu cười: “Trà ngươi pha, ta muốn nếm.”",rf:"Thái hậu không cười."},
  {n:"Quỳ xin Thái hậu cho tra đến cùng",c:{suc:-2},w:{duc:3},f:"fight",wx:"tỏ ra không sợ",lx:"chuyện thành lớn",rt:"Thái hậu gật đầu: “Được, tra.”"},
  {n:"Dâng Thái hậu một chén trà tự pha",c:{suc:-2},o:()=>45+S.tai/5,w:{th:3},sc:1,wx:"Thái hậu nhớ tay ngươi",l:{th:-2},lx:"chén trà bị nghi",rt:"Thái hậu uống hết chén.",rf:"Ma ma Đức Thọ cung đổ chén trà đi."}]},
 x1:{h:"Phiên tra ở Càn Ninh cung",w:"hh",t:"Hoàng hậu ngồi trên, {v} ngồi bên, gói vải đỏ đặt trên khay. Hoàng thượng chưa đến.",o:[
  {n:"Đưa nhân chứng ra",c:{suc:-3},o:A=>35+(A.f.wit?20:0)+(A.f.fight?5:0)+S.tamco/6,e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",ok?12:4)},rt:"A hoàn của {v} khai ra tất cả. {v} tái mặt.",rf:"Nhân chứng rút lời giữa chừng."},
  {n:"Chờ Hoàng thượng đến",c:{},o:A=>40+(A.f.calm?15:0)+S.sac/6,e:["win","mid"],lx:"phó mặc cho một lời",rt:"Ngài đến, nhìn gói vải, nói: “Trẫm không cần bùa để nhìn ai.”",rf:"Ngài không đến. Án treo đó."},
  {n:"Xin {mis} đứng ra",if:MATM,c:{},o:A=>40+(A.f.mis?20:0),e:["mid","lose"],lx:"nợ người cũ một lần",go:(A,ok)=>matMis(ok?6:-2),rt:"{mis} đứng ra nói một câu, Hoàng hậu cho gác án.",rf:"{mis} không đến."}]}},
 E:{win:{k:1,tag:"Lời đồn đổ ngược",w:"emp",t:"Gói vải đỏ được đem đốt trước Càn Ninh cung. {v} bị phạt cấm túc, còn tên ngươi từ nay không ai dám đem ra đùa.",fx:{danh:5},go:A=>{rdOan(A,"v",6);return [matSrv({nt:8,tin:4}),matCon({sung:4})].join(" ")}},
  mid:{k:0,tag:"Án gác lại",t:"Không ai bị phạt. Lời đồn lặn xuống, nhưng còn đó, như than dưới tro.",fx:{duc:2,danh:-1}},
  lose:{k:-1,tag:"Mang tiếng hồ mị",t:MATT("Ngươi bị phạt quỳ ba ngày trước Càn Ninh cung, suýt bị đày Tân Giả khố. Từ đó, mỗi lần Hoàng thượng nhìn ngươi, có người ghi lại.",
   "Ngươi bị cấm túc một tháng. Hoàng thượng không nói gì, nhưng từ đó ngài đến cung ngươi ít hẳn."),fx:{danh:-5},go:()=>[matSrv({tin:-8,nt:-5}),matCon({sung:-5})].join(" ")}}});

rdDef("cnv_mat",11,{t:"Ánh mắt ấy",w:"emp",sj:"điều ánh mắt ấy trở thành",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Từ chiếc ô dưới mưa đến hôm nay, ánh mắt của Hoàng thượng đã đi một quãng dài. Giờ ngài hỏi ngươi muốn gì. Đây là kết cục truyện xuất thân của ngươi.",
  "Từ chiếc ô dưới mưa đến chiếc ghế ngươi đang ngồi, ánh mắt của Hoàng thượng đã đi một quãng dài. Giờ phải biết nó là ân tình, hay chỉ là một lần nhìn. Đây là kết cục truyện xuất thân của ngươi."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếc ô cũ",w:"emp",if:RDW(1),t:"Hoàng thượng sai người mang đến chiếc ô năm xưa, cán ô đã khắc thêm một chữ. Ngài hẹn gặp ngươi dưới đúng mái hiên ấy, chiều mưa tới.",o:[
  {n:"Đến dưới hiên, mang theo ô",c:{suc:-2},o:()=>45+S.sac/5,w:{sung:2},sc:1,f:"love",wx:"ngài nhớ ngày đầu",l:{danh:-2},lx:"có người thấy",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Ngài đứng đó, tay không. Ngươi che ô cho ngài như năm xưa.",rf:"Trời không mưa. Người ta thấy ngươi đứng chờ một mình."},
  {n:"Gửi lại ô, kèm một lời",c:{},w:{duc:3},f:"calm",wx:"giữ được thể diện",lx:"ngài có thể buồn",rt:"Ngài đọc lời ngươi, cất ô vào Dưỡng Tâm điện."},
  {n:"Hỏi chữ khắc là chữ gì",c:{},o:()=>40+S.tai/4,w:{tai:1},sc:1,f:"love",wx:"biết lòng ngài",l:{danh:-1},lx:"bị cho là tò mò",rt:"Thái giám thưa: chữ “Niệm”.",rf:"Thái giám không dám nói."}]},
 s2:{h:"Ánh mắt nhạt dần",w:"emp",if:RDW(0),t:MATT("Đã lâu Hoàng thượng không ghé hậu viện. Ngươi vẫn hầu trà ở cung {mis}, vẫn đứng dưới mái hiên cũ, mà chẳng ai dừng lại.",
   "Đã lâu Hoàng thượng không lật thẻ ngươi. Cung ngươi vắng đến mức người hầu bắt đầu xin đi."),o:[
  {n:"Đứng hầu dưới mái hiên cũ",c:{suc:-2},o:()=>35+S.sac/4,w:{sung:2},sc:1,f:"love",wx:"ngài dừng lại",l:{danh:-2},lx:"bị cười là ngóng",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Một chiều mưa, ngài dừng lại. Không nói gì, chỉ đứng cạnh ngươi.",rf:"Ngài đi qua, không ngoảnh lại."},
  {n:"Thôi ngóng, sống ngày của mình",c:{},w:{duc:4},f:"calm",wx:"lòng nhẹ",lx:"ngài có thể quên thật",rt:"Ngươi trồng một chậu lan trước cửa."},
  {n:"Nhờ {v} nói giúp một câu",c:{bac:-10},o:()=>35+S.tamco/4,w:{sung:2},sc:1,wx:"có người nhắc tên",l:{danh:-2},lx:"nợ {v}",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} nhắc tên ngươi trong bữa ngự thiện.",rf:"{v} nhận bạc, quên lời."}]},
 c1:{h:"{mis} lần cuối",w:"mis",if:MATM,t:MATT("{mis} gọi ngươi vào, lần đầu bảo ngươi ngồi: “Ta già rồi. Ngươi muốn đi, ta không giữ nữa.”",
   "{mis} sang cung ngươi, lần đầu không cần ngươi ra đón: “Ta và ngươi, rốt cuộc là gì của nhau?”"),o:[
  {n:"Quỳ lạy {mis} một lạy",c:{danh:-2},w:{duc:4},f:"mis",wx:"nghĩa cũ được trả",lx:"có người cười ngươi hạ mình",go:()=>{matMis(10);return matSrv({tin:8})},rt:"{mis} đỡ ngươi dậy. Hai người không nói gì nữa."},
  {n:"Thưa: là tỷ muội",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"mis",wx:"có một người chị",l:{danh:-1},lx:"nàng có thể chưa sẵn lòng",go:(A,ok)=>matMis(ok?10:-2),rt:"{mis} cười, mắt đỏ hoe.",rf:"{mis} lắc đầu: “Chưa đâu.”"},
  {n:"Thưa: là người từng hầu và người từng được hầu",c:{},w:{tamco:2},wx:"rạch ròi",lx:"nàng buồn",go:()=>matMis(-3),rt:"{mis} gật đầu, đứng dậy về."}]},
 c2:{h:"{v} nước cuối",w:"v",t:"{v} tâu với Hoàng hậu xin đưa ngươi đi hầu Thái hậu ở hành cung, “cho xa lời đồn”. Đi rồi thì khó về.",o:[
  {n:"Xin Hoàng hậu cho ở lại",c:{hh:-3},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"calm",wx:"ở lại",l:{danh:-2},lx:"Hoàng hậu thấy ngươi bám víu",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu bác đơn của {v}.",rf:"Hoàng hậu chưa phê."},
  {n:"Đem chuyện gói bùa ra nói lại",c:{suc:-2},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,wx:"{v} phải lui",l:{danh:-3},lx:"khơi lại chuyện cũ",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{v} rút đơn ngay chiều ấy.",rf:"Chuyện cũ khơi lên, dính cả ngươi."},
  {n:"Gặp {v}, xin hòa",c:{bac:-10},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"bớt một kẻ thù",l:{danh:-2},lx:"{v} thấy ngươi yếu",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} thở dài: “Ta chỉ sợ ngài quên ta.”",rf:"{v} nhận bạc, cười."}]},
 t1:{h:"Ngài hỏi điều ngươi muốn",w:"emp",t:"Hoàng thượng hỏi: “Từ ngày ấy, nàng chưa xin trẫm điều gì. Hôm nay xin đi.”",o:[
  {n:"Xin ngài đừng quên chiều mưa ấy",c:{},o:()=>40+S.sac/5+S.tai/5,w:{sung:3},sc:1,f:"love",wx:"ngài cười",l:{danh:-1},lx:"lời xin nhẹ quá",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Ngài nói: “Trẫm chưa từng quên.”",rf:"Ngài chỉ gật đầu."},
  {n:"Xin ơn cho {mis}",if:MATM,c:{sung:-2},w:{duc:4},f:"mis",wx:"người cũ được ơn",lx:"không xin cho mình",go:()=>matMis(8),rt:"Ngài nhướng mày, rồi ban cho {mis} một xấp gấm."},
  {n:"Không xin gì",c:{},w:{duc:3},f:"calm",wx:"ngài nể",lx:"không được gì ngay",rt:"Ngài nhìn ngươi lâu: “Lạ thật.”"}]},
 x1:{h:"Dưới mái hiên",w:"emp",t:"Chiều mưa. Cùng mái hiên năm ấy. Hoàng thượng đứng đó, như đang chờ ngươi nói câu cuối cùng.",o:[
  {n:"Bước đến che ô cho ngài",c:{suc:-3},o:A=>35+A.sc*5+(A.f.love?15:0)+S.sac/6,e:["win","lose"],rt:"Ngài nắm tay ngươi dưới ô: “Năm ấy trẫm cũng muốn làm thế này.”",rf:"Ngài nhận ô, nhưng mắt nhìn đi nơi khác."},
  {n:"Đứng yên, để ngài bước đến",c:{},o:A=>40+(A.f.calm?15:0)+S.duc/6,e:["win","mid"],lx:"có thể ngài không bước",rt:"Ngài bước đến, đứng cạnh ngươi đến khi tạnh mưa.",rf:"Ngài đứng đó, ngươi đứng đây. Mưa tạnh."},
  {n:"Cúi đầu, lui vào trong",c:{},w:{duc:3},e:"mid",lx:"khép lại một ánh nhìn",rt:"Ngươi lui. Ngài không gọi."}]}},
 E:{win:{k:1,tag:"Ánh mắt thành ân tình",w:"emp",t:MATT("Hoàng thượng nói với Kính sự phòng: “Người này, đừng ai làm khó.” Ngươi vẫn chưa có phẩm vị, nhưng cả hậu cung biết ngài đã chọn. Ngày sắc phong chỉ còn là chuyện thời gian.",
   "Ngài ban cho cung ngươi một tấm biển tự tay đề chữ “Niệm”. Cả hậu cung hiểu: ngươi được phong vì một ánh mắt, và được giữ vì một tấm lòng."),fx:{danh:8,duc:2},go:()=>[matSrv({nt:20,tin:5}),matCon({sung:6})].join(" ")},
  mid:{k:0,tag:"Được nhìn mà bị ghét",t:MATT("Hoàng thượng vẫn nhìn ngươi, nhưng ánh nhìn ấy kéo theo bao cặp mắt ghen. Ngươi vẫn là cung nữ, chờ một ngày ngài nhớ lại.",
   "Ngươi là tiểu chủ, được ngài nhớ, mà hậu cung không ai quên ngươi từng là nô tỳ. Có ân sủng, không có bạn."),fx:{danh:2},go:A=>{rdOan(A,"v",4);return [matSrv({nt:6}),matCon({sung:2})].join(" ")}},
  lose:{k:-1,tag:"Ánh mắt khép lại",t:MATT("Ngài thôi nhìn về phía hậu viện. Ngươi vẫn là cung nữ, vẫn pha trà, vẫn sống. Con đường còn dài, chỉ không còn chiếc ô năm ấy.",
   "Ngài thôi đến. Ngươi vẫn là tiểu chủ, vẫn có cung riêng, chỉ không còn ai nhìn ngươi như chiều mưa năm ấy."),fx:{danh:-3},go:()=>[matSrv({nt:-6}),matCon({sung:-4})].join(" ")}}});
RD97L.push({a:"cnv_mat_11",tag:"Chủ cũ thành tỷ muội",w:"mis",p:.12,n:"Xin {mis} cùng đứng dưới mái hiên",c:{suc:-4},
 path:["Quỳ lạy {mis}","Thưa: là tỷ muội","Xin ơn cho {mis}","Gặp {v}, xin hòa","Thôi ngóng"],np:2,bad:["Thưa: là người từng hầu","Đem chuyện gói bùa"],sc:2,x:[()=>{const m=srvMis67();return !!(m&&m.alive&&(m.rel||0)>=20)},"Chủ cũ thương ngươi (quan hệ từ 20)"],
 t:"Ngươi sai người mời {mis} ra mái hiên. Hoàng thượng thấy hai người đứng chung một chiếc ô, bật cười: “Hóa ra người trẫm nhìn năm ấy, là người nàng dạy ra.” Từ đó, cung {mis} và cung ngươi đi chung một đường, ai động đến người này là động đến cả hai.",
 fx:{danh:10,duc:4},go:()=>{matMis(20);return [matSrv({nt:15,tin:15}),matCon({sung:5})].join(" ")},rw:"nt_nhuy",ti:"Chủ tớ thành tỷ muội"});
