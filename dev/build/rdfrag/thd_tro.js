/* ---------- thd_tro · Học trò của cha ---------- */
/* BAL.road keys needed: none (deadlines are written into the hồi text; no chapter-level constant).
   Story-only NPCs (ROAD_MAP §5.4): {n1} = the student of her father (same person as ARC67.thd_tro .4, carried in S.st.f14.thdN1);
   {n2} = the false Tiến sĩ of an earlier exam, elder cousin (biểu huynh) of {v}, from {v}'s maternal house (S.st.f14.thdN2).
   Enemy house = {v}'s maternal house (bought the paper in .4); the official behind the leak = "Thị lang bộ Lễ" (Phó chủ khảo), never named. */
function thdTroCast(A){try{const f=S.st&&S.st.f14;const nm=()=>pick(SURN)+" "+pick(MALEN);
  if(f){A.n1=f.thdN1||(f.thdN1=nm());A.n2=f.thdN2||(f.thdN2=nm())}else{A.n1=nm();A.n2=nm()}}catch(e){A.n1=A.n1||"học trò của cha";A.n2=A.n2||"biểu huynh của nàng ta"}
 return rdCast(A,["v"])}
/* the student of .4 keeps his name in .5–.11: ARC67.thd_tro casts A.n1, the road only carries A.act, so keep it here */
(function(){if(typeof chEnd67!=="function")return;const e0=chEnd67;chEnd67=function(A){try{if(A&&A.a==="thd_tro"&&A.n1&&S.st&&S.st.f14)S.st.f14.thdN1=A.n1}catch(e){}return e0.apply(this,arguments)}})();

rdDef("thd_tro",5,{t:"Đề thi bị bán",w:"maid",sj:"kẻ bán đề thi trong Lễ bộ",cast:thdTroCast,
 g:"Khoa án của {n1} đã khép, mà đề thi vẫn có người bán. Có kẻ trong Lễ bộ chép đề ra ngoài trước ngày thi. Tìm ra kẻ bán trước khi hắn bán tiếp cho khoa sau.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đề thi Hương rao ở chợ sách",w:"maid",if:RDW(1),t:"{n1} nay đã làm quan ở Hàn lâm viện. Hắn gửi vào cung một tờ giấy: đề thi Hương năm nay đang được rao bán ở chợ sách ngoài cửa Chính Dương, ba trăm lạng một bản.",o:[
  {n:"Mua một bản làm chứng",c:{bac:-40},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"paper",wx:"có tận tay đề bị bán",l:{danh:-2},lx:"kẻ bán đánh hơi",rt:"Bản đề mua về khớp từng chữ với đề niêm trong Lễ bộ.",rf:"Kẻ bán đưa đề giả rồi biến mất."},
  {n:"Bảo {n1} báo ngay Lễ bộ",c:{danh:-2},w:{duc:2},wx:"giữ đúng phép",lx:"tin báo lọt về tai kẻ bán",f:"clean",rt:"Lễ bộ đổi đề trong một đêm. Kẻ bán im hơi lặng tiếng."},
  {n:"Lặng lẽ theo dấu bạc",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"trail",wx:"biết bạc chảy về đâu",l:{sung:-2},lx:"Hoàng thượng nghe ngươi cho người ra chợ",rt:"Bạc bán đề chảy về một hiệu cầm đồ của nhà ngoại {v}.",rf:"Người theo dấu bị lạc giữa chợ."}]},
 s2:{h:"Kẻ mua đề vẫn ung dung",w:"maid",if:()=>rdK()===0,t:"{n1} được ghi tên bảng vàng, nhưng nhà mua đề không ai bị xử. Hắn nhắn vào cung: ở Quốc Tử Giám người ta đã rao đề của kỳ sau.",o:[
  {n:"Gửi bạc nhờ {n1} dò giúp",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"trail",wx:"có người dò ở Quốc Tử Giám",l:{danh:-2},lx:"{n1} bị để ý",rt:"{n1} biết được tên hiệu sách nhận đặt đề.",rf:"Giám sinh thấy {n1} hỏi han, đi báo thầy."},
  {n:"Khuyên {n1} yên phận làm quan",c:{danh:-2},w:{duc:2},wx:"học trò của cha được yên",lx:"kẻ bán đề càng lộng",rt:"{n1} cúi đầu vâng lời, nhưng thư sau hắn vẫn nhắc chuyện đề."},
  {n:"Viết thư hỏi {dad}",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"cha nhớ ra một người quen cũ ở Lễ bộ",l:{duc:-1},lx:"cha già lo lắng",rt:"Cha hồi thư: người khắc đề ở Lễ bộ xưa kia từng học trường làng cạnh nhà.",rf:"Thư đi chậm, cha hồi khi việc đã nguội."}]},
 s3:{h:"Học trò sắp về quê",w:"maid",if:()=>rdK()<0,t:"Từ ngày ngươi bị trách xen việc triều, nhà ngoại {v} khoe khắp kinh. {n1} trượt bảng, sắp về quê, nhưng hắn nhớ một điều: tờ đề trong tay kẻ mua có dấu son của Lễ bộ.",o:[
  {n:"Giữ {n1} ở lại kinh",c:{bac:-30},w:{duc:3},wx:"còn nhân chứng ở kinh",lx:"{v} biết ngươi chưa buông",go:A=>{rdOan(A,"v",4)},rt:"{n1} thuê lại căn gác cũ gần Quốc Tử Giám."},
  {n:"Để hắn về, chỉ xin hắn vẽ lại dấu son",c:{suc:-2},w:{mat:1},f:"paper",wx:"có hình dấu son",lx:"mất nhân chứng ở kinh",rt:"{n1} vẽ lại dấu son trên mảnh giấy dó, rồi lên đường về quê."},
  {n:"Tạ lỗi với Hoàng thượng trước đã",c:{suc:-3},o:()=>35+S.sung/3,w:{sung:3},sc:1,wx:"Hoàng thượng nguôi giận",l:{sung:-2},lx:"ngài nhắc lại lời trách",rt:"Hoàng thượng chỉ nói: “Việc của nàng là hậu cung.” Nhưng ngài ở lại dùng bữa.",rf:"Ngài phẩy tay cho lui."}]},
 c1:{h:"Thư lại khắc đề",w:"maid",t:"Đề thi do phòng khắc in của Lễ bộ khắc bản. Một tên thư lại ở đó vừa mua nhà mới — lương mười năm của hắn không đủ trả một gian. Phải hỏi được hắn trước khi Lễ bộ khóa sổ cuối năm.",o:[
  {n:"Cho người hỏi chuyện vợ hắn",c:{bac:-20},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"biết ai đưa bạc",l:{danh:-2},lx:"vợ hắn kể lại với chồng",rt:"Vợ hắn khoe: bạc mua nhà là “quà của quan trên”.",rf:"Vợ hắn đóng cửa không tiếp."},
  {n:"Báo Đô sát viện",c:{suc:-3},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"clean",wx:"việc ra ánh sáng",l:{danh:-2},lx:"kẻ đứng sau kịp bịt miệng",rt:"Ngự sử nhận lời tra phòng khắc in.",rf:"Ngự sử đến thì sổ khắc đã bị thay."},
  {n:"Mua chuộc hắn khai",c:{bac:-50,duc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"paper",wx:"có lời khai viết tay",l:{bac:-20},lx:"hắn nhận bạc hai đầu",rt:"Hắn viết một tờ khai, điểm chỉ đỏ lòm.",rf:"Hắn nhận bạc rồi chạy đi báo quan trên."}]},
 c2:{h:"Lễ vật của {v}",w:"v",need:["v"],t:"{v} sai người mang lễ sang: lụa, trà, và một câu nhắn: “Chuyện thi cử là việc đàn ông ngoài triều. Muội đừng mệt.”",o:[
  {n:"Nhận lễ, giả như nghe lời",c:{duc:-2},w:{bac:40},f:"feint",wx:"{v} tưởng ngươi đã lùi",lx:"nhận lễ là để lại dấu",rt:"{v} cười hài lòng, thôi sai người rình cung ngươi."},
  {n:"Trả lễ, nói thẳng",c:{danh:-1},w:{duc:2},wx:"giữ tay sạch",lx:"{v} biết ngươi không lùi",go:A=>{rdOan(A,"v",6)},rt:"Lễ được trả nguyên phong. {v} đập vỡ chén trà."},
  {n:"Mời {v} uống trà, dò ý",c:{suc:-2},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"biết nàng biết đến đâu",l:{sung:-2},lx:"{v} đi kể ngươi bới chuyện nhà nàng",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} buột miệng: “Nhà ngoại ta chỉ nhờ người quen trong Lễ bộ thôi.”",rf:"{v} chỉ cười, không đáp."}]},
 t1:{h:"Dấu son trên tờ đề",w:"dad",t:"Dấu son trên tờ đề bị bán là dấu riêng của quan Phó chủ khảo — chính Thị lang bộ Lễ. {dad} nhìn hình dấu, lặng đi: năm xưa, hắn cùng khoa thi với cha, và cha trượt.",o:[
  {n:"Giữ tờ đề, chưa động",c:{duc:-2},w:{tamco:2},wx:"cầm một lá bài",lx:"Thị lang còn thời gian xóa dấu",rt:"Ngươi cất tờ đề vào hộp trang sức."},
  {n:"Nhờ {n1} so dấu son ở Hàn lâm viện",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"paper",wx:"dấu son được đối chiếu",l:{danh:-2},lx:"Thị lang biết có người so dấu",rt:"Dấu son khớp với dấu trên một tờ trình cũ của Thị lang.",rf:"Người giữ hồ sơ không cho mượn."},
  {n:"Hỏi cha chuyện khoa thi năm xưa",c:{danh:-2},w:{duc:2},wx:"hiểu mối hận cũ của cha",lx:"vết thương cũ của cha bị khơi lại",rt:"Cha kể: năm ấy bài của cha bị chấm trượt, còn bài của hắn đỗ — với một câu văn của cha."}]},
 x1:{h:"Ba ngày trước khi thư lại bị đưa đi",w:"maid",t:"Lễ bộ bất ngờ điều tên thư lại khắc đề đi Vân Nam. Ba ngày nữa hắn lên đường. Lời khai của hắn chỉ còn lấy được trước hôm ấy.",o:[
  {n:"Giữ hắn lại, lấy lời khai",c:{suc:-5},o:A=>35+S.mat*4,e:["win","lose"],rt:"Hắn khai trước mặt Ngự sử: đề được chép ra theo lệnh Thị lang bộ Lễ, bán qua nhà ngoại {v}.",rf:"Đêm trước hôm khai, hắn đã bị đưa đi sớm."},
  {n:"Mua bản sao sổ khắc đề",c:{bac:-60},o:A=>40+(A.f.paper?15:0)+S.tamco/5,e:["win","mid"],rt:"Sổ khắc đề ghi rõ ai đã mượn bản khắc đêm trước ngày thi.",rf:"Bản sao thiếu đúng trang cần."},
  {n:"Để hắn đi, chỉ ghi lại tên",c:{},w:{duc:2},e:"mid",lx:"lời khai đi theo hắn",rt:"Ngươi ghi tên hắn vào sổ riêng."}]}},
 E:{win:{k:1,tag:"Lần ra kẻ bán đề",w:"v",t:"Đầu mối đã rõ: Thị lang bộ Lễ cho chép đề, nhà ngoại {v} bán ra. Từ hôm nay, cả hai nhà ấy biết tên ngươi.",fx:{danh:5,mat:1},go:A=>{rdOan(A,"v",8);return""}},
  mid:{k:0,tag:"Biết tên mà chưa có chứng",t:"Ngươi biết ai bán đề, nhưng trong tay chỉ có vài tờ giấy. Kẻ bán vẫn ngồi ghế cũ.",fx:{tamco:1}},
  lose:{k:-1,tag:"Manh mối đứt",t:"Thư lại đi Vân Nam, sổ khắc đã bị thay. Nhà ngoại {v} cười, và {n1} thấy mình bị người lạ theo dõi.",fx:{danh:-3},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",6,{t:"Bảng vàng",w:"v",sj:"bảng vàng khoa trước",cast:thdTroCast,
 g:"Đề bị bán không chỉ một khoa. Khoa trước, {n2} — biểu huynh của {v} — đỗ Tiến sĩ, nay làm Tri huyện. Muốn lật bảng vàng cũ là phải lật cả nhà ngoại {v}.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời khai nêu thêm một tên",w:"maid",if:RDW(1),t:"Lời khai của thư lại có một dòng ngươi suýt bỏ qua: khoa trước, đề cũng được chép ra, và người mua là nhà ngoại {v} — cho {n2}.",o:[
  {n:"Lấy danh sách khoa trước",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"paper",wx:"biết ai đỗ khoa ấy",l:{danh:-2},lx:"Lễ bộ biết có người lục bảng cũ",rt:"Tên {n2} đứng thứ ba bảng Tiến sĩ, chữ trong quyển thi đẹp như chữ một người khác.",rf:"Người giữ bảng nói bảng cũ đã cất vào kho."},
  {n:"Giữ kín, chờ thêm chứng",c:{duc:-2},w:{tamco:2},wx:"không động rừng",lx:"{n2} vẫn ngồi ghế quan",rt:"Ngươi chép dòng ấy vào sổ riêng."},
  {n:"Nhờ {n1} hỏi đồng khoa của {n2}",c:{bac:-20},o:()=>40+S.danh/4,w:{danh:1},sc:1,wx:"có lời đồng khoa",l:{duc:-1},lx:"{n1} bị kéo sâu thêm",rt:"Một đồng khoa kể: {n2} làm thơ ở yến Quỳnh Lâm mà không thành câu.",rf:"Đồng khoa sợ, không ai nói."}]},
 s2:{h:"Một sĩ tử già gõ cửa nhà cha",w:"dad",if:RDW(0),t:"Một sĩ tử già lặn lội đến nhà {dad} ở quê, kể: khoa trước, {n2} — biểu huynh của {v} — chữ còn viết sai mà đỗ Tiến sĩ, nay làm Tri huyện.",o:[
  {n:"Đón sĩ tử già lên kinh",c:{bac:-30},w:{duc:2},f:"witness",wx:"thêm một người làm chứng",lx:"tốn bạc nuôi người",rt:"Ông lão trọ ở chùa ngoài thành, ngày ngày chép kinh chờ."},
  {n:"Nhờ cha ghi lại lời ông",c:{suc:-2},w:{mat:1},f:"paper",wx:"có giấy trắng mực đen",lx:"lời kể chưa phải bằng chứng",rt:"Cha chép lời ông lão, ký tên làm chứng."},
  {n:"Khuyên ông lão đừng nói nữa",c:{duc:-2},w:{tamco:1},wx:"không động nhà {v}",lx:"ông lão thất vọng về cha con ngươi",rt:"Ông lão chống gậy ra về, không ngoảnh lại."}]},
 c1:{h:"Quyển thi trong kho Lễ bộ",w:"maid",t:"Quyển thi cũ còn trong kho Lễ bộ: bản mực do thí sinh tự viết, bản son do thư lại chép lại. Cuối năm kho sẽ đốt quyển cũ — phải lấy được trước ngày ấy.",o:[
  {n:"Lo cho người giữ kho mở cửa",c:{bac:-50},o:()=>45+S.mat*4,w:{mat:2},sc:1,f:"paper",wx:"có quyển mực của {n2}",l:{danh:-3},lx:"lấy đồ trong kho là tội",rt:"Bản mực của {n2} viết bằng một nét chữ không phải của hắn.",rf:"Người giữ kho nhận bạc rồi báo Thị lang."},
  {n:"Xin Hoàng thượng cho Hàn lâm viện xem lại quyển cũ",c:{suc:-3},o:()=>35+S.sung/4,w:{danh:2},sc:1,f:"clean",wx:"việc làm theo phép",l:{sung:-3},lx:"ngài thấy ngươi lại xen việc khoa cử",rt:"Hoàng thượng cho Hàn lâm viện mượn quyển, không hỏi lý do.",rf:"Ngài hỏi: “Nàng lại muốn lật bảng nào?”"},
  {n:"Để mặc kho đốt quyển",c:{danh:-2},w:{duc:1},wx:"không phạm phép",lx:"chứng cứ thành tro",rt:"Khói kho Lễ bộ bay suốt một buổi chiều."}]},
 c2:{h:"{v} mời ngươi dự tiệc",w:"v",need:["v"],t:"{v} mời ngươi dự tiệc mừng nhà ngoại nàng được ban biển. Ở tiệc, nàng nói khẽ: “Biểu huynh ta là người hiếu nghĩa. Ai làm hại huynh ấy, ta không quên.”",o:[
  {n:"Dự tiệc, nói lời mừng",c:{bac:-20},w:{duc:2},wx:"giữ hòa khí",lx:"nuốt giận cười",go:A=>{rdRel(A,"v",4)},rt:"{v} rót cho ngươi một chén, mắt không cười."},
  {n:"Đáp: người hiếu nghĩa thì không sợ bảng vàng bị xem lại",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,wx:"cả tiệc nể ngươi",l:{sung:-2},lx:"thành ra cãi nhau",go:A=>{rdOan(A,"v",8)},rt:"Cả tiệc lặng đi. {v} tái mặt.",rf:"{v} tâu với Hoàng hậu là ngươi phá tiệc."},
  {n:"Cáo bệnh không dự",c:{duc:-1},w:{tamco:1},wx:"không để lộ ý",lx:"{v} cho là ngươi khinh nhà nàng",go:A=>{rdOan(A,"v",3)},rt:"Ngươi gửi một bình hoa thay mình."}]},
 t1:{h:"{n2} xin bái sư",w:"dad",t:"{n2} gửi lễ hậu về quê, xin bái {dad} làm thầy. Ai cũng hiểu: có danh là học trò của cha ngươi, hắn sẽ khó bị lật.",o:[
  {n:"Khuyên cha nhận, giữ hắn gần",c:{duc:-2},w:{bac:30},f:"near",wx:"biết hắn tính gì",lx:"danh cha bị hắn mượn",rt:"Cha nhận lễ, giao hắn chép một trang Luận ngữ. Chữ hắn vụng như trẻ lên mười."},
  {n:"Khuyên cha từ chối",c:{danh:-1},w:{duc:3},wx:"tay cha sạch",lx:"nhà {v} thêm một mối hận",go:A=>{rdOan(A,"v",4)},rt:"Cha trả lễ: “Thầy đồ nghèo không dạy nổi quan Tri huyện.”"},
  {n:"Để cha thử tài hắn trước mặt người làng",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"witness",wx:"cả làng thấy hắn không viết nổi",l:{danh:-2},lx:"hắn biết bị thử",rt:"{n2} cầm bút run tay, viết sai hai chữ.",rf:"Hắn cáo bận, không đến."}]},
 x1:{h:"Thơ mừng thọ ở Hàn lâm viện",w:"emp",t:"Hoàng thượng triệu các Tiến sĩ khoa trước về Hàn lâm viện làm thơ mừng thọ Thái hậu; {n2} cũng có tên. Ngài hỏi ngươi: “Đề nên ra thế nào cho thú?”",o:[
  {n:"Xin ra đề làm thơ ngay tại chỗ",c:{suc:-4},o:A=>35+S.tai/5,e:["win","lose"],rt:"{n2} cầm bút cả canh giờ, nộp tờ giấy chỉ có bốn câu sai luật. Hoàng thượng nhíu mày.",rf:"{n2} đã được nhắc bài trước, thơ trơn tru. Hoàng thượng khen hắn, còn nhìn ngươi lạ lùng."},
  {n:"Lặng lẽ trao quyển mực cũ cho Hàn lâm viện",c:{bac:-20},o:A=>40+(A.f.paper?15:0)+S.mat*3,e:["win","mid"],rt:"Học sĩ Hàn lâm so chữ, thấy chữ trong quyển cũ không phải chữ {n2}.",rf:"Học sĩ nhận quyển nhưng không dám nói."},
  {n:"Thưa: đề do Hoàng thượng ra mới quý",c:{},w:{sung:2},e:"mid",lx:"bỏ lỡ dịp vạch mặt",rt:"Hoàng thượng ra đề về hoa cúc, {n2} làm bài tầm thường mà qua."}]}},
 E:{win:{k:1,tag:"Bảng vàng lộ vết",w:"emp",t:"Hoàng thượng sai giữ {n2} ở kinh chờ xét. Nhà ngoại {v} rối loạn, và lần đầu tiên nàng không cười khi gặp ngươi.",fx:{danh:5,sung:2},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Nghi mà chưa lật",t:"Trong Hàn lâm viện người ta thì thầm về chữ của {n2}, nhưng hắn vẫn về huyện làm quan.",fx:{danh:1}},
  lose:{k:-1,tag:"Nhà ngoại {v} đứng vững",t:"{n2} được khen trước điện. Nhà ngoại {v} biết ai đã muốn hại hắn, và họ bắt đầu ra tay trước.",fx:{sung:-3,danh:-2},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("thd_tro",7,{t:"Học trò bị truy",w:"maid",sj:"lệnh truy bắt {n1}",cast:thdTroCast,
 g:"Nhà ngoại {v} không đợi bị lật. Chúng vu cho {n1} tội đánh người ở tửu lâu, phủ Thuận Thiên phát trát bắt. Vào ngục rồi, một học trò nghèo có thể chết trước khi được xét.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ lạ ngã vỡ đầu",w:"maid",if:RDW(1),t:"Ba hôm sau buổi thơ, có kẻ lạ gây sự với {n1} ở tửu lâu rồi tự lao đầu vào cột. Sáng ra, trát bắt đã dán ở cửa thành.",o:[
  {n:"Tìm người làm chứng ở tửu lâu",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"witness",wx:"có người thấy tận mắt",l:{danh:-2},lx:"kẻ vu biết ngươi tìm người",rt:"Tiểu nhị tửu lâu thấy kẻ lạ tự đập đầu.",rf:"Tiểu nhị đã bị đuổi về quê."},
  {n:"Giấu {n1} ngay trong đêm",c:{bac:-20},w:{duc:2},f:"hide",wx:"hắn chưa bị bắt",lx:"trốn là mang tiếng có tội",rt:"{n1} trốn vào hậu viện một ngôi chùa ngoài thành."},
  {n:"Khuyên hắn ra trình diện",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"tỏ ra không sợ",l:{duc:-2},lx:"đặt mạng hắn vào tay phủ Thuận Thiên",rt:"Phủ doãn thấy học trò tự đến, cho tại ngoại chờ xét.",rf:"Hắn bị giam ngay."}]},
 s2:{h:"Trát bắt dán ở cửa thành",w:"maid",if:RDW(0),t:"{n2} vẫn ngồi vững, và giờ đến lượt nhà ngoại {v} ra tay: một kẻ lạ tố {n1} đánh người ở tửu lâu. Trát bắt đã dán ở cửa thành.",o:[
  {n:"Giấu {n1} ở nhà cha",c:{bac:-20},w:{duc:2},f:"hide",wx:"xa kinh, khó tìm",lx:"liên lụy đến cha",rt:"{n1} về quê, ở gian chái nhà {dad}."},
  {n:"Cho người dò kẻ tố",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"witness",wx:"biết kẻ tố là ai",l:{danh:-2},lx:"bị nói là che tội phạm",rt:"Kẻ tố là gia nhân nhà ngoại {v}.",rf:"Kẻ tố đã đổi chỗ ở."},
  {n:"Mặc cho phủ Thuận Thiên xét",c:{duc:-2},w:{tamco:1},wx:"không dính vào",lx:"{n1} một mình chống án",rt:"Ngươi chỉ gửi ra một gói bạc nhỏ cho hắn tiêu."}]},
 c1:{h:"Mười ngày của trát bắt",w:"maid",t:"Trát bắt có hạn mười ngày; quá hạn không bắt được thì án phải trình lên Hình bộ, nơi nhà {v} không có người. Giữ {n1} cho qua mười ngày ấy.",o:[
  {n:"Lo lót cho bộ khoái chậm chân",c:{bac:-50,duc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"qua được mười ngày",l:{danh:-3},lx:"lo lót bộ khoái là tội",rt:"Bộ khoái lục soát sai chỗ ba lần.",rf:"Bộ khoái nhận bạc rồi vẫn đi đúng chỗ."},
  {n:"Đổi chỗ trốn mỗi đêm",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"hide",wx:"không ai đoán được",l:{duc:-1},lx:"{n1} kiệt sức",rt:"Mười ngày, mười chỗ ngủ. {n1} gầy rộc mà vẫn sống.",rf:"Một chỗ trốn bị lộ, hắn phải chạy giữa đêm mưa."},
  {n:"Viết thư cầu Hình bộ nhận án sớm",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"clean",wx:"án về nơi công tâm",l:{sung:-2},lx:"lộ tên ngươi trong vụ án",rt:"Hình bộ nhận án, phủ Thuận Thiên hết quyền bắt.",rf:"Hình bộ bảo phải đợi đủ hạn."}]},
 c2:{h:"{v} đến cung ngươi",w:"v",need:["v"],t:"{v} đến thăm, đặt lên bàn một tờ giấy: lệnh bãi trát bắt, chỉ thiếu chữ ký. “Muội bỏ chuyện bảng vàng, ta lo xong chuyện tửu lâu.”",o:[
  {n:"Nhận lời, đổi lấy mạng {n1}",c:{duc:-3},w:{tamco:1},wx:"{n1} được bãi trát",lx:"bảng vàng cũ được yên",f:"deal",go:A=>{rdRel(A,"v",8)},rt:"Ba ngày sau, trát bắt được gỡ khỏi cửa thành."},
  {n:"Từ chối",c:{danh:-1},w:{duc:2},wx:"không bán lẽ phải",lx:"{v} siết chặt hơn",go:A=>{rdOan(A,"v",8)},rt:"{v} cầm tờ giấy đi: “Vậy thì mặc trời.”"},
  {n:"Giả vờ nghĩ thêm, giữ tờ giấy làm chứng",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"witness",wx:"có chữ của nhà {v} trên tờ lệnh",l:{sung:-2},lx:"{v} biết bị lừa",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Tờ lệnh có ấn của một Chủ sự là người nhà ngoại {v}.",rf:"{v} giật lại tờ giấy."}]},
 t1:{h:"Thị vệ cùng quê",w:"maid",t:"Một thị vệ gác cửa Tây Hoa là người cùng làng với {dad}, từng học vỡ lòng ở trường cha. Hắn nói nhỏ: “Đêm mai phủ Thuận Thiên lục soát chùa ngoài thành.”",o:[
  {n:"Nhờ hắn báo tin mỗi đêm",c:{bac:-20},w:{mat:1},wx:"có tai mắt ở cửa thành",lx:"hắn liều mạng vì ngươi",rt:"Thị vệ gật đầu: “Ơn thầy dạy chữ, con chưa trả.”"},
  {n:"Không để hắn dính vào",c:{danh:-2},w:{duc:2},wx:"không ai vì ngươi mà mất việc",lx:"mất một đường tin",rt:"Ngươi chỉ gửi hắn ít tiền về cho mẹ già."},
  {n:"Nhờ hắn đưa {n1} vào thành",c:{suc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"hide",wx:"chỗ nguy nhất là chỗ an",l:{danh:-3},lx:"đưa người bị truy vào thành là tội",rt:"{n1} nấp trong kho cỏ của trại thị vệ, ngay dưới mũi phủ Thuận Thiên.",rf:"Cửa thành đổi phiên, kế hoạch hỏng."}]},
 x1:{h:"Đêm lục soát",w:"maid",t:"Đêm cuối của trát bắt. Đuốc phủ Thuận Thiên đã sáng ở đầu ngõ.",o:[
  {n:"Đưa nhân chứng tửu lâu đến trước phủ doãn",c:{suc:-5},o:A=>35+(A.f.witness?15:0),e:["win","lose"],rt:"Tiểu nhị khai trước công đường: kẻ lạ được trả bạc để tự ngã. Phủ doãn hủy trát.",rf:"Nhân chứng run sợ nói lắp, phủ doãn không tin."},
  {n:"Giấu {n1} cho qua đêm cuối",c:{bac:-30},o:A=>40+(A.f.hide?20:0)+S.mat*3,e:["mid","lose"],rt:"Trời sáng, trát hết hạn. {n1} còn sống, nhưng vẫn mang tiếng trốn án.",rf:"Bộ khoái tìm ra chỗ trốn lúc canh tư."},
  {n:"Quỳ xin Hoàng thượng một lời khoan",c:{sung:-4},o:A=>40+S.sung/4,e:["mid","lose"],rt:"Hoàng thượng phê một chữ “Hoãn”. Án chờ Hình bộ.",rf:"Ngài không muốn can án của phủ Thuận Thiên."}]}},
 E:{win:{k:1,tag:"Vạch trần vụ vu",w:"maid",t:"Án tửu lâu bị lật. Kẻ lạ khai ra gia nhân nhà ngoại {v}. {n1} được trả tự do, và sĩ tử khắp kinh bắt đầu nói về nhà ấy.",fx:{danh:5,duc:2},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Giữ được người, chưa sạch tiếng",t:"{n1} còn sống, còn tự do, nhưng trên giấy tờ hắn vẫn là kẻ có án treo.",fx:{duc:2}},
  lose:{k:-1,tag:"{n1} bị bắt vào ngục",t:"{n1} bị giam ở ngục phủ Thuận Thiên. Hắn còn sống, nhưng mỗi ngày trong ngục là một ngày nhà ngoại {v} có thể ra tay.",fx:{danh:-3,duc:-1},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",8,{t:"Đơn kêu oan",w:"emp",sj:"lá đơn kêu oan của sĩ tử",cast:thdTroCast,
 g:"Sĩ tử khắp kinh soạn một lá đơn kêu oan, ký hơn trăm tên, kể tội mua bán đề thi. Đơn không qua được cửa Lễ bộ. Con đường còn lại là qua tay ngươi đến ngự án.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lá đơn trăm chữ ký",w:"maid",if:RDW(1),t:"Được tự do, {n1} viết lá đơn kêu oan, trăm sĩ tử ký tên dưới. Hắn gửi vào cung, kèm một câu: “Xin nương nương đừng vì con mà liều.”",o:[
  {n:"Đọc kỹ từng chữ",c:{suc:-2},w:{mat:1},f:"read",wx:"biết lá đơn mạnh yếu chỗ nào",lx:"mất thêm ngày",rt:"Lá đơn chắc chắn, chỉ có một câu nhắc đến Thị lang hơi quá lời."},
  {n:"Gửi lời cảm ơn trăm sĩ tử",c:{bac:-30},w:{danh:3},wx:"sĩ lâm nhớ ơn",lx:"nhà {v} biết ngươi đứng sau",go:A=>{rdOan(A,"v",4)},rt:"Sĩ tử truyền nhau: trong cung có người nghe họ."},
  {n:"Bảo {n1} giữ đơn thêm ít ngày",c:{duc:-2},w:{tamco:2},wx:"chờ thời",lx:"sĩ tử nóng ruột",rt:"{n1} cất lá đơn vào ống tre."}]},
 s2:{h:"Cha lên kinh",w:"dad",if:RDW(0),t:"Nghe tin học trò gặp nạn, {dad} chống gậy lên kinh. Ông ký tên đầu lá đơn: “Thầy của {n1}”.",o:[
  {n:"Xin cho cha vào cung gặp mặt",c:{suc:-3},o:()=>40+S.sung/4,w:{duc:3},sc:1,wx:"cha con gặp nhau",l:{sung:-2},lx:"bị nói là đem chuyện nhà vào cung",rt:"Cha đứng dưới hiên, chỉ nói: “Con đừng sợ. Cha già rồi.”",rf:"Hoàng thượng không cho."},
  {n:"Khuyên cha gạch tên mình",c:{duc:-2},w:{tamco:1},wx:"cha khỏi bị liên lụy",lx:"lá đơn yếu đi",rt:"Cha không gạch. Ông nói: “Thầy không bỏ trò.”"},
  {n:"Gửi bạc lo chỗ trọ cho cha",c:{bac:-30},w:{duc:2},wx:"cha yên chỗ ở",lx:"tốn bạc",rt:"Cha ở trọ cạnh Quốc Tử Giám, sáng nào cũng nghe sĩ tử đọc sách."}]},
 c1:{h:"Câu chữ trong đơn",w:"maid",t:"Lá đơn nêu thẳng tên Thị lang bộ Lễ và nhà ngoại {v}. Một Hàn lâm già khuyên: nêu tên quan đại thần mà không đủ chứng là tội vu cáo.",o:[
  {n:"Giữ nguyên tên",c:{},o:()=>40+S.mat*5,w:{danh:3},sc:1,f:"bold",wx:"lá đơn sắc như dao",l:{danh:-3},lx:"dễ bị bắt lỗi vu cáo",rt:"Ngươi giữ từng chữ.",rf:"Có kẻ đã chép lá đơn đưa sang phủ Thị lang."},
  {n:"Bỏ tên, chỉ kể việc",c:{danh:-2},w:{duc:2},f:"soft",wx:"không ai bắt lỗi được",lx:"kẻ đứng sau có đường lách",rt:"Lá đơn chỉ còn kể việc, không chỉ mặt ai."},
  {n:"Đính kèm chứng cứ đã có",c:{suc:-2},o:()=>45+S.tamco/4,w:{mat:1},sc:1,f:"paper",wx:"đơn có chứng đi kèm",l:{mat:-1},lx:"chứng cứ lộ ra trước giờ",rt:"Tờ khai, tờ đề, quyển mực — xếp gọn dưới lá đơn.",rf:"Một tờ chứng bị thất lạc trên đường."}]},
 c2:{h:"{v} khóc trước Thái hậu",w:"th",need:["v","th"],t:"{v} khóc ở Đức Thọ cung: có kẻ trong cung xúi sĩ tử làm loạn, bôi nhọ nhà ngoại nàng. Thái hậu cho gọi ngươi đến.",o:[
  {n:"Thưa thật với Thái hậu",c:{suc:-3},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"Thái hậu thấy ngươi ngay thẳng",l:{sung:-2},lx:"Thái hậu ghét chuyện ầm ĩ",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thái hậu nghe xong, bảo {v}: “Nhà ngươi nên tự xét.”",rf:"Thái hậu phạt cả hai chép kinh."},
  {n:"Nhận lỗi, xin Thái hậu bớt giận",c:{danh:-2},w:{duc:2},wx:"Thái hậu nguôi",lx:"{v} được thể",go:A=>{rdRel(A,"v",3)},rt:"Thái hậu phẩy tay cho lui, chuyện tạm lắng."},
  {n:"Hỏi {v} vì sao sợ một lá đơn",c:{},o:()=>40+S.tai/4,w:{tamco:2},sc:1,wx:"{v} lỡ lời",l:{danh:-2},lx:"Thái hậu chê ngươi sắc sảo",go:A=>{rdOan(A,"v",6)},rt:"{v} buột miệng: “Vì trong đơn có tên Thị lang!” — mà đơn chưa ai đọc.",rf:"{v} khóc to hơn."}]},
 t1:{h:"Trống Đăng Văn",w:"maid",t:"Sĩ tử nóng ruột, muốn kéo nhau đánh trống Đăng Văn trước cửa Ngọ Môn. Đánh trống là đơn tới thẳng vua, nhưng kẻ đánh trống phải chịu đòn trước.",o:[
  {n:"Can họ, để ngươi đưa đơn",c:{danh:-2},w:{duc:2},wx:"sĩ tử khỏi chịu đòn",lx:"mọi chuyện đè lên vai ngươi",rt:"Sĩ tử về, chờ tin ngươi."},
  {n:"Để họ đánh trống",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"drum",wx:"cả kinh thành nghe tiếng",l:{duc:-2},lx:"người đánh trống chịu đòn",rt:"Ba hồi trống vang qua Ngọ Môn. Cả triều biết có oan khoa cử.",rf:"Thị vệ bắt người trước khi trống kịp vang."},
  {n:"Xin cha đứng ra đánh trống",c:{suc:-3},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"drum",wx:"một thầy đồ già, ai nỡ đánh",l:{danh:-2},lx:"cha già chịu nhục",rt:"Thị vệ thấy ông lão tóc bạc, không ai dám vung roi.",rf:"Cha bị đánh mười roi trước khi đơn được nhận."}]},
 x1:{h:"Đến ngự án",w:"emp",t:"Đêm ấy Hoàng thượng đến cung ngươi. Lá đơn nằm trong ống tay áo. Đưa hay không, đưa thế nào, chỉ trong một đêm.",o:[
  {n:"Dâng cả đơn và chứng",c:{suc:-5},o:A=>35+(A.f.paper?15:0),e:["win","lose"],rt:"Hoàng thượng đọc đến canh ba, rồi phê: “Giao Tam pháp ty tra xét.”",rf:"Hoàng thượng gấp đơn lại: “Hậu cung lại dính vào khoa cử?”"},
  {n:"Chỉ thưa có lá đơn, xin ngài tự đọc",c:{},o:A=>45+(A.f.drum?15:0)+S.sung/6,e:["win","mid"],lx:"không nói thì không ai biết ngươi tin gì",rt:"Ngài đọc đơn ở Dưỡng Tâm điện, sáng hôm sau giao Tam pháp ty.",rf:"Đơn được nhận, nhưng nằm trong chồng tấu."},
  {n:"Không đưa, để sĩ tử tự lo",c:{},w:{sung:2},e:"mid",lx:"sĩ tử thấy ngươi bỏ họ",rt:"Ngươi giữ ống tay áo im lặng cả đêm."}]}},
 E:{win:{k:1,tag:"Lá đơn đến ngự án",w:"emp",t:"Hoàng thượng giao Tam pháp ty tra án khoa cử. Sĩ tử khắp kinh quỳ trước Quốc Tử Giám tạ ơn, và ai cũng biết lá đơn đi qua tay ai.",fx:{danh:7,duc:2},go:A=>{rdOan(A,"v",8);return""}},
  mid:{k:0,tag:"Đơn được nhận, chưa phê",t:"Lá đơn nằm trên ngự án, chưa có lời phê. Mỗi ngày chờ, nhà ngoại {v} lại có thêm thời gian xóa dấu.",fx:{danh:2}},
  lose:{k:-1,tag:"Lá đơn bị trả về",t:"Hoàng thượng trả đơn, trách ngươi để sĩ tử dựa vào hậu cung. Nhà ngoại {v} mở tiệc.",fx:{sung:-6,danh:-2},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",9,{t:"Triều đình chấn động",w:"emp",sj:"khoa án rung chuyển Lễ bộ",cast:thdTroCast,
 g:"Án khoa cử lan ra ngoài triều. Lễ bộ run sợ, Thị lang tìm người gánh tội thay, nhà ngoại {v} chạy khắp các cửa quan. Chuyện không còn là của một học trò nữa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư lại treo cổ",w:"maid",if:RDW(1),t:"Tam pháp ty vừa mở án thì tin đến: một thư lại phòng khắc in treo cổ trong nhà, để lại thư nhận hết tội. Ai cũng hiểu đó là con dê thế tội.",o:[
  {n:"Cho người khám lá thư tuyệt mệnh",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:2},sc:1,f:"paper",wx:"thấy chữ trong thư không phải của hắn",l:{danh:-2},lx:"bị nói là tò mò việc ma chay",rt:"Chữ trong thư tuyệt mệnh giống chữ một môn khách của Thị lang.",rf:"Thư đã nộp lên Tam pháp ty, không ai được xem."},
  {n:"Lo hậu sự cho nhà hắn",c:{bac:-40},w:{duc:3},wx:"vợ con hắn mang ơn",lx:"tốn bạc",rt:"Vợ hắn khóc: chồng bà không biết chữ đủ để viết lá thư ấy."},
  {n:"Im lặng, để Tam pháp ty tự xét",c:{duc:-2},w:{tamco:1},wx:"không dính thêm",lx:"con dê thế tội được dùng",rt:"Ngươi thắp một nén hương cho người chết."}]},
 s2:{h:"Ngự sử tự tìm đến",w:"emp",if:RDW(0),t:"Lá đơn chưa được phê, nhưng tin đã lan. Một Ngự sử trẻ tự dâng sớ đàn hặc Lễ bộ, xin tra khoa cử. Hắn nhắn vào cung, xin một chứng cứ.",o:[
  {n:"Trao chứng cho Ngự sử",c:{suc:-3},o:()=>40+S.mat*5,w:{danh:3},sc:1,f:"paper",wx:"sớ có chứng",l:{danh:-2},lx:"lộ ngươi là nguồn chứng",rt:"Sớ của Ngự sử khiến Hoàng thượng phải mở án.",rf:"Chứng đến muộn, sớ đã bị gác."},
  {n:"Để Ngự sử tự lo",c:{danh:-2},w:{duc:2},wx:"tay ngươi sạch",lx:"sớ yếu",rt:"Ngự sử dâng sớ với những gì hắn có."},
  {n:"Khuyên Ngự sử đợi thời",c:{duc:-2},w:{tamco:2},wx:"không bắn trượt",lx:"thời không chờ ai",rt:"Ngự sử cất sớ, không vui."}]},
 c1:{h:"Danh sách của Thị lang",w:"maid",t:"Thị lang bộ Lễ cho người lén đưa vào cung một danh sách: hai mươi Tiến sĩ ba khoa gần đây cũng mua đề, có cả con Thượng thư, cháu Đô đốc. “Lật hắn thì lật cả triều. Nương nương tính kỹ.”",o:[
  {n:"Giữ danh sách, không đáp",c:{duc:-2},w:{tamco:3},wx:"nắm thóp nửa triều",lx:"cầm danh sách là cầm lửa",rt:"Ngươi khóa danh sách trong hộp ngọc."},
  {n:"Trả lại, nhắn: chỉ cần công bằng cho một người",c:{danh:-2},w:{duc:2},f:"narrow",wx:"Thị lang thấy ngươi không tham",lx:"bỏ lỡ một lá bài",rt:"Thị lang nhận lại, im lặng ba ngày."},
  {n:"Đưa danh sách lên Hoàng thượng",c:{suc:-4},o:()=>35+S.sung/4,w:{sung:3},sc:1,f:"wide",wx:"ngài thấy ngươi không giấu",l:{danh:-4},lx:"nửa triều thành kẻ thù",rt:"Hoàng thượng đọc rồi khóa danh sách vào tủ ngự.",rf:"Hoàng thượng hỏi: “Ai đưa nàng danh sách này?”"}]},
 c2:{h:"{v} quỳ trước Hoàng thượng",w:"v",need:["v"],t:"{v} tháo trâm, quỳ trước Dưỡng Tâm điện xin tha cho nhà ngoại. Hoàng thượng chưa nói gì; cả hậu cung nhìn xem ngươi làm gì.",o:[
  {n:"Quỳ cạnh nàng, xin tha cho người già trẻ nhỏ",c:{suc:-3},w:{duc:4},wx:"cả cung thấy ngươi rộng lượng",lx:"thành ra như xin tha cho kẻ có tội",go:A=>{rdRel(A,"v",10)},rt:"{v} nhìn ngươi, không hiểu."},
  {n:"Đứng ngoài, không xen",c:{duc:-2},w:{tamco:1},wx:"không mắc nợ ai",lx:"người ta nói ngươi lạnh",rt:"Ngươi đóng cửa cung chép kinh."},
  {n:"Tâu: có tội thì xét, không tội thì tha",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"Hoàng thượng thấy ngươi công tâm",l:{sung:-2},lx:"{v} cho là ngươi đẩy nàng xuống",go:A=>{rdOan(A,"v",6)},rt:"Hoàng thượng gật đầu, cho {v} về cung.",rf:"Hoàng thượng chán cả hai."}]},
 t1:{h:"Lời của Thái hậu",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi đến Đức Thọ cung: “Triều đình đang rung. Hậu cung mà rung theo thì xã tắc nghiêng. Ngươi biết dừng ở đâu chưa?”",o:[
  {n:"Thưa: thiếp chỉ xin công bằng cho sĩ tử",c:{},o:()=>40+S.duc/4,w:{duc:3},sc:1,wx:"Thái hậu nể",l:{danh:-2},lx:"Thái hậu cho là ngươi cứng",rt:"Thái hậu im lặng hồi lâu, rồi cho lui.",rf:"Thái hậu phạt ngươi chép Nữ huấn."},
  {n:"Xin Thái hậu chỉ dạy",c:{sung:-2},w:{danh:1},f:"narrow",wx:"Thái hậu hài lòng",lx:"bị dắt theo ý bà",rt:"Thái hậu dặn: “Xử kẻ đầu sỏ thôi. Đừng đụng đến những nhà khác.”"},
  {n:"Lặng im nghe",c:{duc:-2},w:{tamco:2},wx:"không để lộ ý",lx:"Thái hậu không biết ngươi nghĩ gì",rt:"Ngươi cúi đầu đến khi Thái hậu cho lui."}]},
 x1:{h:"Hoàng thượng hỏi đến đâu",w:"emp",t:"Đêm khuya, Hoàng thượng đặt bản tấu của Tam pháp ty trước mặt ngươi: “Xử đến đâu, nàng nói thử.”",o:[
  {n:"Xử kẻ đầu sỏ, tha kẻ bị lôi theo",c:{suc:-4},o:A=>40+(A.f.narrow?15:0),e:["win","mid"],rt:"Thị lang bộ Lễ bị cách chức tra xét. Hai mươi nhà kia thở phào và nhớ ơn ngươi.",rf:"Thị lang thoát, chỉ vài thư lại bị xử."},
  {n:"Xử tất cả, khoa trường mới sạch",c:{suc:-4},o:A=>35+(A.f.wide?15:0)+S.danh/6,e:["win","lose"],rt:"Thị lang bị cách, ba khoa thi được xét lại. Cả triều run.",rf:"Nửa triều dâng sớ nói hậu cung khuấy triều chính."},
  {n:"Thưa: việc triều, thiếp không dám bàn",c:{},w:{duc:3},e:"mid",lx:"để người khác quyết thay",rt:"Hoàng thượng thở dài, tự phê."}]}},
 E:{win:{k:1,tag:"Thị lang bộ Lễ bị cách chức",w:"emp",t:"Thị lang bị cách chức chờ xét, nhà ngoại {v} bị niêm phong sổ sách. Sĩ lâm khắp nơi biết tên ngươi.",fx:{danh:7,sung:2},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Chỉ kẻ nhỏ bị xử",t:"Vài thư lại bị xử, Thị lang được giữ ghế. Án chưa khép, ai cũng chờ nước sau.",fx:{danh:1}},
  lose:{k:-1,tag:"Ngươi bị nghi khuấy triều",t:"Triều thần dâng sớ nói hậu cung khuấy triều chính. Hoàng thượng thôi bàn chuyện khoa cử với ngươi.",fx:{sung:-6,danh:-3},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",10,{t:"Thi lại",w:"emp",sj:"kỳ thi lại trong điện",cast:thdTroCast,
 g:"Hoàng thượng cho thi lại ngay trong điện: mọi Tiến sĩ bị nghi, cả {n2}, phải làm bài trước mặt ngài; {n1} cũng được gọi để tỏ thực tài. Một ngày thi, hai số phận.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếu thi lại",w:"emp",if:RDW(1),t:"Chiếu ban: mười ngày nữa thi lại ở điện Bảo Hòa. Hoàng thượng nói với ngươi: “Trẫm muốn tự mắt xem ai có chữ.”",o:[
  {n:"Gửi sách cho {n1} ôn",c:{bac:-20},w:{duc:2},wx:"hắn yên tâm học",lx:"bị nói là ngươi lo cho hắn",rt:"{n1} đọc sách thâu đêm ở căn gác cũ."},
  {n:"Dặn {n1} giữ mình, ăn ngủ cẩn thận",c:{suc:-2},w:{mat:1},f:"guard",wx:"hắn đề phòng",lx:"hắn lo sợ thêm",rt:"{n1} thôi ăn ở quán, tự nấu cơm."},
  {n:"Nhờ cha ở lại kèm hắn",c:{suc:-2},o:()=>45+S.danh/5,w:{danh:2},sc:1,wx:"thầy trò cùng ôn",l:{duc:-1},lx:"cha già thức khuya",rt:"Cha ra đề cho {n1} mỗi tối như thuở ở trường làng.",rf:"Cha ngã bệnh vì gió kinh thành."}]},
 s2:{h:"Thi lại vì sĩ tử làm ầm",w:"emp",if:RDW(0),t:"Án chưa khép, sĩ tử vẫn tụ trước Quốc Tử Giám. Để yên lòng thiên hạ, Hoàng thượng cho thi lại ở điện Bảo Hòa — nhưng ngài không hỏi ý ngươi lần nào.",o:[
  {n:"Xin vào hầu ngày thi",c:{suc:-3},o:()=>35+S.sung/3,w:{sung:2},sc:1,wx:"được ngồi sau bình phong",l:{sung:-3},lx:"ngài thấy ngươi để tâm quá",rt:"Hoàng thượng gật đầu: “Nàng đến thì đến.”",rf:"Ngài bảo ngươi ở cung."},
  {n:"Lo cho {n1} giữ sức",c:{bac:-20},w:{duc:2},f:"guard",wx:"hắn khỏe mạnh vào thi",lx:"tốn bạc",rt:"{n1} được ăn no ngủ đủ mười ngày."},
  {n:"Đứng ngoài hẳn",c:{duc:-2},w:{tamco:2},wx:"không ai nói được ngươi",lx:"không ai giúp {n1}",rt:"Ngươi không hỏi một lời về kỳ thi."}]},
 c1:{h:"Tờ phao trong tay áo",w:"maid",t:"Người của ngươi nghe được: nhà ngoại {v} đã mua một tên tạp dịch điện Bảo Hòa. Ngày thi, hắn sẽ nhét tờ phao vào tay áo {n1} rồi hô bắt. Phải chặn trước ngày thi.",o:[
  {n:"Đổi tên tạp dịch ấy đi",c:{bac:-30},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"mối nguy được dời",l:{danh:-2},lx:"nhà {v} biết ngươi đã biết",rt:"Tên tạp dịch bị điều đi quét Ngự hoa viên.",rf:"Hắn được thay bằng một kẻ khác ngươi không biết."},
  {n:"Dặn {n1} mặc áo không tay rộng",c:{duc:-2},w:{tamco:2},f:"guard",wx:"chẳng có chỗ nhét phao",lx:"lạnh mà phải chịu",rt:"{n1} vào thi trong áo vải bó tay, run cả buổi sáng."},
  {n:"Để chúng làm, bắt quả tang",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"trap",wx:"bắt được người nhà {v}",l:{danh:-3},lx:"liều cả danh {n1}",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Thị vệ của ngươi giữ tay tên tạp dịch khi tờ phao còn trong tay hắn.",rf:"Tạp dịch nhanh tay hơn."}]},
 c2:{h:"{v} xin ngươi tha cho {n2}",w:"v",need:["v"],t:"{v} đến không mang lễ, chỉ mang nước mắt: “Biểu huynh ta là trụ cột nhà mẹ ta. Trượt kỳ này thì cả nhà chết. Ngươi muốn gì, ta đổi.”",o:[
  {n:"Xin nàng đổi lấy lời khai về Thị lang",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:2},sc:1,wx:"có chứng mới",l:{duc:-2},lx:"ép người lúc cùng đường",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} kể: Thị lang lấy ba phần mười bạc bán đề.",rf:"{v} bỏ đi: “Ngươi tàn nhẫn hơn ta tưởng.”"},
  {n:"Hứa không làm gì thêm với nhà nàng",c:{danh:-2},w:{duc:3},wx:"{v} dịu lại",lx:"{n2} có thể lại thoát",go:A=>{rdRel(A,"v",12)},rt:"{v} cúi đầu cảm ơn, lần đầu tiên."},
  {n:"Từ chối: thi là thi",c:{sung:-1},w:{danh:2},wx:"giữ thẳng",lx:"{v} cùng đường thì liều",go:A=>{rdOan(A,"v",8)},rt:"{v} lau nước mắt, ánh mắt lạnh đi."}]},
 t1:{h:"Đề thi do ai ra",w:"emp",t:"Hoàng thượng hỏi đùa: “Nàng là con thầy đồ. Nếu nàng ra đề, nàng ra đề gì?”",o:[
  {n:"Đề về dân sinh, không ai học vẹt được",c:{},o:()=>40+S.tai/4,w:{sung:3},sc:1,f:"theme",wx:"ngài thích ý ấy",l:{sung:-2},lx:"ngài thấy ngươi bàn quá việc",rt:"Hoàng thượng chép câu ngươi nói vào tay áo.",rf:"Ngài cười: “Đề thì để trẫm.”"},
  {n:"Thưa: đề là việc của vua",c:{danh:-2},w:{duc:2},wx:"giữ phận",lx:"mất dịp chọn đề công bằng",rt:"Hoàng thượng gật đầu."},
  {n:"Xin ngài ra đề ngay trước giờ thi",c:{duc:-2},w:{tamco:2},f:"theme",wx:"không ai kịp mua đề",lx:"Lễ bộ thấy ngươi nghi họ",rt:"Ngài cười: “Ý hay. Trẫm cũng chẳng tin ai.”"}]},
 x1:{h:"Điện Bảo Hòa",w:"emp",t:"Ngày thi lại. Ba mươi thí sinh quỳ trong điện, Hoàng thượng ngồi trên, ngươi ngồi sau bình phong. Mọi điều chuẩn bị đều dồn vào một buổi.",o:[
  {n:"Gửi ra một mảnh giấy xin ngài ra đề tại chỗ",c:{suc:-4},o:A=>35+(A.f.theme?15:0),e:["win","lose"],rt:"Đề ra tại chỗ. {n1} viết kín giấy; {n2} nộp giấy trắng.",rf:"Thái giám thấy mảnh giấy, tâu ngươi xen vào kỳ thi."},
  {n:"Ngồi yên, tin vào {n1}",c:{},o:A=>45+(A.f.guard?15:0)+(A.f.trap?5:0),e:["win","mid"],lx:"không làm gì nếu có biến",rt:"{n1} làm bài trôi chảy, {n2} viết lủng củng.",rf:"Cả hai đều đỗ, bảng chưa rõ ai hơn ai."},
  {n:"Xin không ngồi hầu",c:{},w:{duc:2},e:"mid",lx:"không ai che chở nếu có biến",rt:"Ngươi ở cung, chờ tin."}]}},
 E:{win:{k:1,tag:"{n1} đứng đầu kỳ thi lại",w:"emp",t:"{n1} đứng đầu kỳ thi lại, {n2} bị tước danh Tiến sĩ. Cả điện Bảo Hòa nhìn về phía bình phong.",fx:{danh:7,sung:3},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Cả hai cùng đỗ",t:"{n1} và {n2} đều đỗ. Bảng mới vẫn có tên kẻ mua đề, nhưng giờ cũng có tên người bị oan.",fx:{danh:2}},
  lose:{k:-1,tag:"Kỳ thi lại hỏng",t:"Mảnh giấy của ngươi bị bắt. Kỳ thi bị nói là có hậu cung nhúng tay, kết quả treo lại.",fx:{sung:-5,danh:-4},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",11,{t:"Công bằng khoa cử",w:"emp",sj:"công bằng cho khoa trường",cast:thdTroCast,
 g:"Án khoa cử đi đến hồi kết. Hoàng thượng sẽ định tội, định công, và định cả phép thi về sau. Đây là kết cục truyện xuất thân của ngươi: con gái một thầy đồ nghèo, đứng giữa chữ nghĩa và quyền thế.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sĩ lâm chờ một lời",w:"emp",if:RDW(1),t:"Sĩ tử khắp nơi gửi thơ vào kinh ca tụng kỳ thi lại. Hoàng thượng đọc một bài, cười: “Họ ca nàng nhiều hơn ca trẫm.”",o:[
  {n:"Thưa: công là của bệ hạ",c:{danh:-2},w:{sung:3},wx:"ngài vui",lx:"công của mình nhường hết",rt:"Hoàng thượng gõ nhẹ quạt lên tay ngươi."},
  {n:"Xin ngài cấm sĩ tử nhắc tên thiếp",c:{danh:-2},w:{duc:3},wx:"tránh tiếng chuyên quyền",lx:"sĩ lâm bớt nhớ ngươi",rt:"Chiếu ban: thơ ca kỳ thi chỉ ca ơn vua."},
  {n:"Im lặng, mỉm cười",c:{},o:()=>40+S.sung/4,w:{danh:2},sc:1,wx:"ngài thấy ngươi đáng yêu",l:{sung:-2},lx:"ngài thấy ngươi tự đắc",rt:"Hoàng thượng cười theo.",rf:"Ngài đặt bài thơ xuống, không cười nữa."}]},
 s2:{h:"Án treo lơ lửng",w:"emp",if:RDW(0),t:"Án khoa cử treo đã nửa năm. {dad} viết từ quê: “Cha già rồi, chỉ mong trước khi nhắm mắt thấy học trò được trả tên.”",o:[
  {n:"Xin Hoàng thượng định án trước Tết",c:{suc:-3},o:()=>40+S.sung/4,w:{danh:2},sc:1,wx:"án có hạn chót",l:{sung:-3},lx:"ngài thấy ngươi giục",rt:"Hoàng thượng gật đầu: “Trước Tết.”",rf:"Ngài không đáp."},
  {n:"Gửi thư an ủi cha",c:{danh:-2},w:{duc:2},wx:"cha yên lòng",lx:"án vẫn treo",rt:"Cha hồi: “Có con là đủ.”"},
  {n:"Gom lại mọi chứng cứ còn lại",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"paper",wx:"chứng đủ để định án",l:{danh:-2},lx:"nhà {v} biết ngươi chưa dừng",rt:"Ngươi xếp lại tờ khai, quyển mực, tờ phao — đủ cả.",rf:"Vài tờ chứng đã bị đánh tráo."}]},
 c1:{h:"Số phận {n2}",w:"v",t:"Luật định: mua đề thì chém. {n2} sẽ bị xử theo luật, trừ khi có người xin cho hắn tội nhẹ hơn.",o:[
  {n:"Xin tha chết, đày đi biên ải",c:{suc:-2},w:{duc:4},f:"mercy",wx:"giữ đức cho mình",lx:"kẻ có tội còn sống",go:A=>{rdRel(A,"v",10)},rt:"{n2} bị đày đi Quỳnh Châu. {v} khóc, không biết nên hận hay nên cảm ơn."},
  {n:"Để luật xử",c:{sung:-1},w:{danh:3},f:"law",wx:"phép nước nghiêm",lx:"nhà {v} hận đến chết",go:A=>{rdOan(A,"v",12)},rt:"Ngươi không nói một lời nào cho {n2}."},
  {n:"Đổi mạng {n2} lấy lời khai về Thị lang",c:{suc:-3},o:()=>40+S.tamco/3,w:{mat:2},sc:1,f:"law",wx:"kẻ đứng đầu không thoát",l:{duc:-2},lx:"mặc cả mạng người",go:(A,ok)=>{rdRel(A,"v",ok?4:-6)},rt:"{n2} khai hết trước Tam pháp ty, được tha chết.",rf:"{n2} không dám khai, vẫn bị xử."}]},
 c2:{h:"{v} lần cuối",w:"v",need:["v"],t:"{v} đến cung ngươi, không trang điểm. “Nhà mẹ ta sắp mất tất cả. Ngươi thắng rồi. Ngươi còn muốn gì?”",o:[
  {n:"Muốn nàng thôi hận",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"có thể bớt một kẻ thù",l:{danh:-1},lx:"nàng không tin",go:(A,ok)=>{rdRel(A,"v",ok?15:-4)},rt:"{v} ngồi rất lâu, rồi nói: “Ta sẽ thử.”",rf:"{v} cười khan: “Ngươi tưởng dễ thế sao?”"},
  {n:"Không muốn gì",c:{duc:-1},w:{tamco:2},wx:"giữ thế trên",lx:"nàng về với lòng hận",go:A=>{rdOan(A,"v",6)},rt:"Ngươi rót trà, không nói gì thêm."},
  {n:"Hứa giữ cho người già trẻ nhỏ nhà nàng",c:{bac:-40},w:{duc:4},wx:"người vô tội được yên",lx:"tốn bạc lo cho nhà kẻ thù",go:A=>{rdRel(A,"v",10)},rt:"{v} quỳ xuống trước ngươi, lần đầu và lần cuối."}]},
 t1:{h:"Lời của cha",w:"dad",t:"{dad} gửi lên kinh một cuộn giấy: một đời dạy học, ông chỉ mong học trò thi đỗ bằng chữ của chính mình. “Con giúp được nhiều người hơn cha, thì giúp.”",o:[
  {n:"Xin Hoàng thượng đổi phép thi",c:{suc:-2},w:{danh:2},f:"reform",wx:"cả thiên hạ được lợi",lx:"Lễ bộ coi ngươi là cái gai",rt:"Ngươi chép lời cha vào một tờ tấu nhỏ."},
  {n:"Chỉ lo cho học trò của cha",c:{danh:-2},w:{duc:2},f:"narrow",wx:"việc vừa sức",lx:"phép thi cũ vẫn còn kẽ hở",rt:"Ngươi gấp cuộn giấy, cất đi."},
  {n:"Mời cha vào cung bái kiến Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/4,w:{danh:3},sc:1,f:"reform",wx:"vua nghe tận tai lời thầy đồ",l:{sung:-2},lx:"bị nói là đưa người nhà tiến thân",rt:"Hoàng thượng nghe cha nói một khắc, rồi ban trà.",rf:"Hoàng thượng bận việc, không tiếp."}]},
 x1:{h:"Định án khoa cử",w:"emp",t:"Hoàng thượng đặt bút: định tội Thị lang, định danh {n1}, định phép thi về sau. Ngài nhìn ngươi: “Nàng còn điều gì muốn tâu?”",o:[
  {n:"Tâu: xin rọc phách, chép lại bài để quan chấm không thấy tên",c:{suc:-5},o:A=>35+(A.f.reform?15:0)+S.danh/8,e:["win","lose"],rt:"Chiếu ban phép thi mới. Kẻ mua đề bị xử, {n1} được trả bảng vàng.",rf:"Lễ bộ cùng dâng sớ phản đối, Hoàng thượng gác cả án lẫn phép mới."},
  {n:"Tâu: chỉ xin trả tên cho người bị oan",c:{},o:A=>50+(A.f.paper?10:0)+(A.f.narrow?10:0),e:["mid","lose"],lx:"phép thi cũ còn nguyên",rt:"{n1} được trả tên, án khép lặng lẽ.",rf:"Án bị gác lại, không ai được trả tên."},
  {n:"Tâu: thiếp không dám bàn, xin ngài tự định",c:{},w:{duc:3},e:"mid",lx:"để người khác quyết",rt:"Hoàng thượng tự phê: {n1} được trả tên, Thị lang về hưu."}]}},
 E:{win:{k:1,tag:"Khoa trường trong sạch",w:"emp",t:"Thị lang bộ Lễ bị xử, nhà ngoại {v} mất hết bảng vàng mua được. {n1} được trả danh, phép thi mới được ban khắp thiên hạ. Ở quê, {dad} đọc chiếu rồi khóc.",fx:{danh:12,sung:4,duc:3},go:A=>{rdOan(A,"v",6);return""}},
  mid:{k:0,tag:"Học trò được trả tên",t:"{n1} được trả tên, làm quan. Kẻ mua đề phần lớn lặng lẽ về hưu. Chuyện khép lại mà không ai hô to.",fx:{danh:4,duc:3}},
  lose:{k:-1,tag:"Khoa án bị chôn vùi",t:"Án khoa cử bị gác mãi. {n1} về quê dạy học cạnh {dad}. Ngươi vẫn giữ ngôi vị trong cung, nhưng sĩ lâm thôi nhắc tên ngươi.",fx:{danh:-6,sung:-2},go:A=>{rdOan(A,"v",4);return""}}}});
RD97L.push({a:"thd_tro_11",tag:"Học trò thành Ngự sử, một lòng với ngươi",w:"emp",p:.12,n:"Xin Hoàng thượng cho {n1} vào Ngự sử đài",c:{suc:-4},
 path:["Mua một bản làm chứng","Mua bản sao sổ khắc đề","Lấy danh sách khoa trước","Đưa nhân chứng tửu lâu","Dâng cả đơn và chứng","Xử kẻ đầu sỏ","Gửi ra một mảnh giấy","rọc phách"],np:3,bad:["Nhận lời, đổi lấy mạng","Mua chuộc hắn khai","Lo lót cho bộ khoái","Không đưa, để sĩ tử tự lo"],sc:2,x:[()=>S.danh>=45,"Danh từ 45"],
 t:"Hoàng thượng chuẩn cho {n1} làm Giám sát Ngự sử. Ngày nhận ấn, hắn quỳ ngoài cửa cung ngươi lạy ba lạy: “Đời con, ngòi bút này không cong.” Từ đó trên triều có một Ngự sử chỉ biết phép nước và ơn thầy.",
 fx:{danh:12,sung:4},go:A=>{rdOan(A,"v",4);return""},rw:"nt_haiduong",ti:"Ân nhân của khoa trường"});
