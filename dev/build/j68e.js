/* ================= j68e: common event content, part 1 (đời thường, khách đến, Hoàng thượng) =================
   Every option: a real gain and a real cost or risk; odds by the ladder; outcomes and reports are true (NPCs may believe wrong things, the game never lies). */
const T6=(v,t)=>tr6(v).includes(t);
const fr6=v=>aff(v,S)>=10,fo6=v=>{try{return bandOf(danger(v,S))>=1}catch(e){return aff(v,S)<-10}};
const sea6=s=>SEASON[S.month-1]===s;
const hasStaff6=n=>(S.staff||[]).length>=(n||1);

/* ---------- ĐỜI THƯỜNG ---------- */
EV6("gossipTea","day",{a:["rv"],pp:()=>{const a=rv6(fr6,v=>5+aff(v,S)/5);return a==null?null:{a0:a}},w:C=>2,
 v:["{A} ghé uống trà, kể nhỏ chuyện cung nọ cung kia, rồi hỏi ngươi nghĩ gì về Hoàng hậu.","Chiều {S}, {A} mang hộp mứt sang, ngồi bên hiên than thở chuyện bị cung nhân khinh nhờn, muốn nghe ngươi khuyên.","{A} sang chơi cờ, giữa ván buột miệng kể một chuyện cũ của phi tần đã khuất.","{A} rủ ngươi ngồi bên cửa sổ thêu hoa, vừa thêu vừa dò xem ngươi có định tranh ghế trống không.","Trời {W}, {A} đội áo tơi sang cung ngươi tránh mưa, nán lại kể chuyện vặt đến tối."],
 o:X=>[c6("Nghe và giữ kín",{c:{suc:-3},r:[[X.A,6]],k:[R6("mất nửa buổi chiều")]}),
  c6("Gợi chuyện để dò tin",{p:od(40+S.tamco/3),w:{mat:1},r:[[X.A,2]],lr:[[X.A,-6]],lt:[R6("nàng thấy ngươi tò mò quá")],ok:()=>`${X.A.n} buột miệng kể vài chuyện có ích. ${statTxt("mat",1)}.`}),
  c6("Khéo cáo mệt",{w:{suc:4},r:[[X.A,-3]]})]});
EV6("giftArrive","day",{a:["rv"],pp:()=>{const a=rv6(v=>aff(v,S)>-20);return a==null?null:{a0:a}},w:C=>1.6,
 v:["Cung nữ của {A} mang sang một hộp gỗ đàn hương, trong có hai lọ hương liệu, nói là quà đáp lễ.","{A} sai người gửi tặng một xấp lụa Hàng Châu, kèm lời nhắn 'chút lòng thành'.","Một hộp điểm tâm hoa quế đề tên {A} được đưa tới, còn ấm.","{A} gửi sang một chậu lan quý, nói hoa nở đúng lúc nhớ đến ngươi."],
 o:X=>[c6("Nhận, đáp lễ hậu hĩnh",{c:{bac:-20},r:[[X.A,8]],w:{danh:1}}),
  c6("Nhận, cho người thử trước",{c:{suc:-2},w:{tamco:1},r:[[X.A,2]],k:[R6(`nếu ${X.A.n} biết, có thể phật ý`)],ok:()=>`Đồ của ${X.A.n} sạch sẽ, không có gì lạ.`}),
  c6("Khéo trả lại",{w:{duc:1},r:[[X.A,-6]]})]});
EV6("lostItem","day",{a:["maid"],pp:()=>S.maid?{a0:0,it:R(4)}:null,w:C=>1.4,
 v:["Sáng ra {M} tái mặt: chiếc trâm bạc ngươi hay cài không thấy đâu, hộp trang sức vẫn khóa.","{M} báo: chuỗi hạt trầm Thái hậu ban đêm qua đứt dây, lạc mất mấy hạt dưới gầm sập.","Chiếc quạt lụa ngươi đề thơ để quên ở đình nghỉ, cung nhân đi tìm về tay không.","Đôi hoa tai ngọc trai mất một chiếc sau buổi tắm hoa ở hậu viện."],
 o:X=>[c6("Lục soát kỹ cả cung",{c:{suc:-6},p:od(55+eyes(S)*4),w:{tamco:1},wt:[G6("tìm lại được")],lr:[[X.A,-4]],l:{danh:-1},lt:[R6("cung nhân bất bình vì bị nghi")],ok:()=>"Món đồ rơi trong kẽ ván sàn; tìm lại được."}),
  c6("Thưởng ai tìm được",{c:{bac:-10},p:80,w:{danh:1},wt:[G6("tìm lại được")],l:{bac:-5},lt:[R6("món đồ mất hẳn")],ok:()=>"Một tiểu thái giám nhặt được, mang trả lấy thưởng."}),
  c6("Thôi, bỏ qua",{w:{duc:1},wt:[G6("cung nhân yên lòng")],k:[R6("mất món đồ")]})]});
EV6("sickServant","serv",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a}},w:C=>(C.sea==="Đông"||C.sea==="Hạ"?2:1),
 v:["{A} sốt cao từ đêm, nằm mê man ở dãy nhà hầu phía sau.","{A} ho ra máu, các cung nhân sợ lây, không ai dám lại gần.","{A} trượt chân ngã ở bậc đá, sưng cả cổ chân, vẫn cố đứng dậy làm việc.","{A} bị trúng nắng khi đi lấy nước, ngất ngay ở giếng."],
 o:X=>[c6("Mời thái y chữa",{c:{bac:-25},r:[[X.A,15]],w:{duc:2}}),
  c6("Tự sắc thuốc cho",{c:{suc:-8},p:od(35+(S.arts.y||0)*15),r:[[X.A,12]],w:{duc:1},lr:[[X.A,-2]],lt:[R6("bệnh kéo dài thêm")],ok:()=>`Thuốc ngươi sắc có hiệu nghiệm; ${X.A.n} đỡ hẳn.`}),
  c6("Cho nghỉ, giảm việc",{w:{duc:1},r:[[X.A,5]],k:[R6("cung thiếu người hầu vài hôm")]}),
  c6("Bắt làm tiếp",{w:{suc:2},r:[[X.A,-12]],k:[R6("Đức -1")],ok:()=>{apply({duc:-1});return `${X.A.n} gượng làm, trong lòng oán.`}})]});
EV6("maidQuarrel","serv",{a:["sv","sv"],pp:()=>{const L=(S.staff||[]).filter(s=>s.sid!=null);if(L.length<2)return null;const a=pick(L),b=pick(L.filter(x=>x!==a));return{a0:a.sid,a1:b.sid}},w:C=>1.5,
 v:["{A} và {B} cãi nhau to ở sân sau, chỉ vì một tấm khăn tay ai cũng nhận là của mình.","{B} tố {A} ăn vụng điểm tâm dâng ngươi; {A} khóc lóc kêu oan.","{A} và {B} giành nhau phần trực đêm gần lò sưởi, suýt xô xát.","Lời qua tiếng lại giữa {A} và {B} về chuyện ai được ngươi thưởng nhiều hơn đã lan ra ngoài cung."],
 o:X=>[c6(`Xử nghiêng về ${X.A.n}`,{r:[[X.A,8],[X.B,-10]]}),c6(`Xử nghiêng về ${X.B.n}`,{r:[[X.B,8],[X.A,-10]]}),
  c6("Phạt cả hai, giữ phép",{w:{danh:1},r:[[X.A,-4],[X.B,-4]]}),
  c6("Hòa giải, mỗi người một phần",{c:{bac:-8},p:od(45+S.duc/3),r:[[X.A,4],[X.B,4]],lr:[[X.A,-3],[X.B,-3]],lt:[R6("cả hai vẫn ấm ức")]})]});
EV6("strayCat","day",{a:[],pp:()=>({}),w:C=>C.sea==="Đông"?1.6:1,
 v:["Một con mèo mướp lạc vào cung, nằm cuộn tròn trên gối tựa của ngươi, không chịu đi.","Đêm {S}, tiếng mèo con kêu dưới gầm hiên; {M} bế lên một con mèo trắng gầy trơ xương.","Con mèo vàng của ai đó cắp mất con cá Hoàng thượng ban, chạy vào bụi trúc.","Có con mèo đen hay trèo lên mái cung ngươi; cung nhân thì thầm là điềm gở."],
 o:X=>[c6("Giữ lại nuôi",{c:{bac:-5},w:{duc:1,suc:3},k:[R6("nuôi mèo dễ làm kinh thai nếu có mang (cung nhân bảo vậy)")]}),
  c6("Cho người mang đi xa",{w:{tamco:1},k:[R6("cung nhân bảo ngươi nhẫn tâm: Đức -1")],ok:()=>{apply({duc:-1});return "Con mèo được đưa ra ngoài cửa Tây Hoa."}}),
  c6("Dò xem mèo của ai",{c:{suc:-3},p:60,w:{danh:1},wt:[G6("trả đúng chủ, được tiếng tử tế")],lt:[R6("mất công vô ích")],l:{suc:-2}})]});
EV6("brokenHeirloom","day",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a,it:R(4)}},w:C=>1.2,
 v:["{A} lau dọn sơ ý làm vỡ chiếc bình men lam của mẹ ngươi để lại.","Tiếng choang vang lên: {A} đánh rơi đôi chén ngọc Hoàng thượng ban hôm sinh thần ngươi.","{A} làm nứt chiếc gương đồng hồi môn của ngươi khi bưng nước.","Bức họa Thái hậu ban bị {A} làm đổ mực loang một góc."],
 o:X=>[c6("Tha, cho người sửa",{c:{bac:-20},r:[[X.A,12]],w:{duc:2}}),
  c6("Phạt quỳ nửa ngày",{w:{danh:1},r:[[X.A,-10]]}),
  c6("Giấu chuyện, tự chắp lại",{c:{suc:-5},p:od(40+(S.arts.hoa||0)*10),w:{tai:1},r:[[X.A,6]],lt:[R6("vết nứt lộ rõ; nếu người ban hỏi đến thì khó ăn nói")],l:{danh:-1}})]});
EV6("spoiledFood","day",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a}},w:C=>C.sea==="Hạ"?2:.8,
 v:["Ngự thiện phòng gửi sang mâm cơm đã ôi; {A} ngửi thấy mùi chua, không dám dọn lên.","Phần yến sào tháng này của cung ngươi bị bớt mất một nửa; {A} nói thái giám Ngự thiện phòng ăn chặn.","Canh gà đưa sang nguội ngắt, váng mỡ đông lại; {A} bất bình thay ngươi.","Nội vụ phủ cấp than {S} toàn than ẩm khói mù, {A} ho sặc sụa."],
 o:X=>[c6("Sai người đi hỏi tội",{p:od(30+S.rank*8+S.danh/4),w:{danh:2},wt:[G6("từ nay phần của cung ngươi đủ")],l:{danh:-2},lt:[R6("bị đồn là khó tính")],r:[[X.A,4]]}),
  c6("Bỏ tiền mua bù",{c:{bac:-15},w:{suc:3},r:[[X.A,3]]}),
  c6("Nhịn cho êm",{w:{duc:1},k:[R6("Sức -3"),R6("bên dưới dễ lấn lướt")],ok:()=>{apply({suc:-3});return "Ngươi nhịn, ăn tạm cho qua."}})]});
EV6("leakRoof","sea",{a:[],pp:()=>({}),w:C=>(C.wx.f===1||C.wx.f===3||C.wx.f===4)?3:0,
 v:["Mưa {W} suốt đêm, mái ngói tẩm cung dột, nước nhỏ tong tong xuống án thư.","Tuyết dày đè gãy một cành mai cổ trước sân, mái hiên phía tây sụt một góc.","Gió giông thổi bật cánh cửa sổ, tranh chữ trên vách ướt nhòe.","Sân sau ngập nước, hũ gạo và than trong kho ẩm hết."],
 o:X=>[c6("Xin Nội vụ phủ sửa gấp",{p:od(35+S.rank*9),w:{suc:3},wt:[G6("sửa xong trong tuần")],l:{suc:-4},lt:[R6("bị hẹn lần lữa")]}),
  c6("Bỏ bạc thuê thợ ngay",{c:{bac:-30},w:{suc:4,danh:1}}),
  c6("Cùng cung nhân tự che chắn",{c:{suc:-6},w:{maid:5,duc:1}})]});
EV6("letterHome","day",{a:[],pp:()=>({}),w:C=>1,
 v:["Thư nhà gửi vào: mẹ ngươi ốm, cha xin ngươi đừng lo, nhưng chữ run run.","Người nhà nhắn vào: em trai ngươi thi hỏng, muốn ngươi xin cho một chân thư lại.","Thư nhà kể ruộng vườn mất mùa, cả nhà thắt lưng buộc bụng.","Cha ngươi gửi thư dặn dò: trong cung giữ mình, chớ kết bè kết phái."],
 o:X=>[c6("Gửi bạc về nhà",{c:{bac:-30},w:{duc:3},wt:[G6("nhà yên lòng")]}),
  c6("Viết thư an ủi",{c:{suc:-2},w:{duc:1,tai:1}}),
  c6("Xin Hoàng thượng ân điển",{p:od(25+S.sung/2),w:{an:2,danh:1},wt:[G6("ngài ban thuốc quý về nhà")],l:{sung:-3},lt:[R6("ngài cho là ngươi cậy sủng")]})]});
EV6("eunuchSqueeze","day",{a:["eun"],pp:()=>({a0:0}),w:C=>C.rank<=3?2:.4,
 v:["Thái giám phát bổng lộc tháng này đưa thiếu, cười nhạt: 'Lệ ở đây phải có chút trà nước.'","Người của {A} úp mở: muốn thẻ tên ngươi nằm trên cùng mâm thẻ bài thì nên biết điều.","Thái giám coi kho cố tình đưa vải cũ thay vải mới, chờ ngươi nhét bạc.","Tiểu thái giám truyền chỉ đứng mãi không đi, rõ ràng chờ tiền thưởng."],
 o:X=>[c6("Đưa bạc cho xong",{c:{bac:-15},w:{suc:2},wt:[G6("được việc, hắn nể mặt")]}),
  c6("Mắng thẳng mặt",{p:od(35+S.rank*8+S.danh/3),w:{danh:2},l:{danh:-1,sung:-1},lt:[R6("hắn thù, rỉ tai bên trên")]}),
  c6("Ghi lại, mách Tổng quản",{c:{suc:-2},p:od(40+eyes(S)*5),w:{mat:1},wt:[G6("hắn bị đổi đi")],lt:[R6("Tổng quản bao che")],l:{danh:-1}})]});
EV6("embroidery","day",{a:["rv"],pp:()=>{const a=rv6();return a==null?null:{a0:a}},w:C=>1,
 v:["Cục Thượng y nhờ các cung thêu góp một vạt cho bức bình phong mừng thọ; {A} đã thêu xong phần mình, đẹp lạ.","{A} khoe chiếc túi thơm thêu uyên ương, hỏi ngươi có muốn đổi mẫu thêu không.","Cung nữ đồn {A} thêu áo tặng Hoàng thượng; ngươi có nên thêu một chiếc khác?","Ngươi được giao thêu đôi gối mừng một vị thân vương; {A} cùng được giao, ai nhanh hơn sẽ được khen."],
 o:X=>[c6("Thêu thật kỹ, thức khuya",{c:{suc:-10},p:od(30+S.tai/2+S.sac/4),w:{danh:3,sung:1},l:{danh:-1},lt:[R6("mũi thêu vội, bị chê")]}),
  c6("Thuê thợ thêu ngoài cung",{c:{bac:-35},w:{danh:2},k:[R6("lộ ra thì mất mặt")]}),
  c6(`Rủ ${X.A.n} thêu chung`,{c:{suc:-5},r:[[X.A,6]],w:{danh:1},k:[R6("công chia đôi")]})]});
EV6("flowerBloom","sea",{a:[],pp:()=>({}),w:C=>(C.sea==="Xuân"||C.sea==="Thu")?2:.5,
 v:["Khóm mẫu đơn trước sân nở cùng lúc chín bông, cung nhân bảo điềm lành.","Hoa quỳnh trong chậu sắp nở đêm nay, chỉ nở một lần rồi tàn.","Rặng cúc vàng sau cung nở rộ, ong bướm kéo về.","Cây mai già tưởng chết bỗng trổ nụ giữa {S}."],
 o:X=>[c6("Mời Hoàng thượng thưởng hoa",{p:od(30+S.sung/2+mm()),w:{sung:4},l:{danh:-1},lt:[R6("ngài bận, cả cung biết ngươi bị từ chối")]}),
  c6("Ngắt hoa dâng Thái hậu",{c:{suc:-2},w:{th:4},k:[R6("vườn trơ trụi, cung nhân tiếc")]}),
  c6("Mời các phi tần ngắm hoa",{c:{bac:-15},w:{danh:2},k:[R6(`người ghen thêm: phi tần ghen +${ghenN(BAL.ghen.flowerParty)}`)],ok:()=>{ghenAll(BAL.ghen.flowerParty);return "Buổi thưởng hoa vui vẻ, ai cũng khen cung ngươi."}})]});
EV6("servGamble","serv",{a:["sv"],pp:()=>{const a=sv6(s=>netIs(s,"greed")||R(3)===0);return a==null?null:{a0:a}},w:C=>1,
 v:["{A} bị bắt quả tang đánh bạc với đám thái giám gác cổng, thua sạch tiền tháng.","Người ta đồn {A} mang đồ cũ của cung ngươi ra ngoài bán lấy tiền tiêu.","{A} nợ tiền một thái giám bên Ngự thiện phòng, hắn đến tận cửa đòi.","{A} lén nhận bạc của người lạ để chuyển thư ra ngoài cung."],
 o:X=>[c6("Trả nợ, răn đe",{c:{bac:-15},r:[[X.A,10]],k:[R6("dễ quen thói")]}),
  c6("Phạt theo phép cung",{w:{danh:1},r:[[X.A,-12]]}),
  c6("Tra hỏi cho ra lẽ",{c:{suc:-3},p:od(45+S.tamco/3),w:{mat:1},wt:[G6("biết được ai đứng sau")],r:[[X.A,-4]],lr:[[X.A,-8]],lt:[R6("hắn sinh lòng oán")]})]});

/* ---------- KHÁCH ĐẾN (people come to her) ---------- */
EV6("proudVisit","visit",{a:["rv"],pp:()=>{const a=rv6(v=>T6(v,"Kiêu ngạo")||v.rank>S.rank);return a==null?null:{a0:a}},w:C=>1.3,
 v:["{A} ghé qua, đứng giữa sân chê cây cảnh cung ngươi quê mùa, cười bảo nên học cung nàng.","{A} khoe chiếc trâm Hoàng thượng mới ban, cố ý hỏi ngươi được ban gì gần đây.","{A} đến 'thăm', ngồi ghế chủ vị, sai cung nữ của ngươi pha trà lại vì 'nhạt'.","Kiệu của {A} dừng trước cửa, nàng không xuống, chỉ cho người hỏi sao lâu không sang thỉnh an."],
 o:X=>[c6("Nhún nhường tiếp đãi",{c:{bac:-10},w:{duc:2},r:[[X.A,5]],k:[R6("cung nhân thấy ngươi yếu thế")]}),
  c6("Đáp lời sắc sảo",{p:od(35+S.tai/3+S.tamco/4),w:{danh:2},r:[[X.A,-6]],l:{danh:-2},lt:[R6("bị nắm thóp lời nói")],lr:[[X.A,-8]]}),
  c6("Cáo bệnh không tiếp",{w:{suc:3},r:[[X.A,-4]]})]});
EV6("kindVisit","visit",{a:["rv"],pp:()=>{const a=rv6(v=>T6(v,"Ân cần")||T6(v,"Khiêm nhường")||fr6(v));return a==null?null:{a0:a}},w:C=>1.4,
 v:["{A} mang canh hạt sen sang, bảo dạo này thấy ngươi gầy đi.","{A} rủ ngươi cùng chép kinh cầu phúc cho Thái hậu.","{A} sang hỏi cách ướp trà hoa nhài, ngồi nán lại rất lâu như có điều muốn nói.","{A} nhờ ngươi xem giúp bài thơ nàng định dâng Hoàng thượng."],
 o:X=>[c6("Tiếp chuyện cả buổi",{c:{suc:-4},r:[[X.A,8]]}),
  c6("Nhận lời giúp hết lòng",{c:{suc:-6},p:od(40+S.tai/2),r:[[X.A,12]],w:{danh:1},lr:[[X.A,-2]],lt:[R6("giúp không tới, nàng hơi buồn")]}),
  c6("Hẹn hôm khác",{w:{suc:2},r:[[X.A,-3]]})]});
EV6("slyVisit","visit",{a:["rv"],pp:()=>{const a=rv6(v=>T6(v,"Xảo quyệt")||T6(v,"Kín đáo")||fo6(v));return a==null?null:{a0:a}},w:C=>1.2,
 v:["{A} sang chơi, mắt cứ đảo quanh án thư và hộp thuốc của ngươi.","{A} niềm nở lạ thường, rủ ngươi ngày mai cùng đi dạo hồ sen lúc vắng người.","{A} hỏi han tỉ mỉ giờ giấc ngươi dùng bữa, ngủ nghỉ, 'để tiện sang thăm'.","{A} mang quà sang, nhất định đòi tận tay cài trâm cho ngươi."],
 o:X=>[c6("Tiếp, nhưng cho người canh chừng",{c:{suc:-4},w:{tamco:1},wt:[G6("không lọt chuyện gì ra")],r:[[X.A,2]]}),
  c6("Dò ngược ý nàng",{p:od(35+S.tamco/2),w:{mat:1},wt:[G6(`ghi nhận ý đồ của ${X.A.n}`)],l:{danh:-1},lt:[R6("nàng biết ngươi đề phòng")],lr:[[X.A,-6]],ok:()=>{try{noteAdd(X.A.o.id,"Sang dò giờ giấc, đồ dùng của ngươi")}catch(e){}return `${X.A.n} dò hỏi quá kỹ; ngươi ghi nhớ.`}}),
  c6("Lạnh nhạt tiễn khách",{w:{suc:2},r:[[X.A,-6]]})]});
EV6("thMama","visit",{a:["th"],pp:()=>S.thDead?null:{a0:0},w:C=>1.2,
 v:["Ma ma thân tín của Thái hậu ghé cung ngươi, đi một vòng nhìn từ bếp đến buồng ngủ.","Ma ma bên Đức Thọ cung mang sang một gói trà, nhắn Thái hậu nhớ đến ngươi.","Ma ma của Thái hậu đến hỏi ngươi có rảnh chép giúp vài trang kinh cho kịp ngày rằm.","Ma ma Đức Thọ cung đến, hỏi nhỏ chuyện các phi tần dạo này có ai hay lui tới Càn Thanh cung."],
 o:X=>[c6("Biếu ma ma chút quà",{c:{bac:-15},w:{th:4}}),
  c6("Kể thật những gì mình biết",{w:{th:5},k:[R6(`người bị kể có thể biết: một phi tần mất thiện cảm ${balSg(BAL.eff.j68e.ok)}`)],ok:()=>{const v=pick(liveRivals(false));if(v)relAdd(S,v,BAL.eff.j68e.ok);return "Ma ma ghi nhớ, về bẩm Thái hậu."}}),
  c6("Giữ lễ, không nói nhiều",{w:{duc:1},k:[R6("Thái hậu với ngươi -1")],ok:()=>{apply({th:-1});return "Ma ma về tay không, nhưng không bắt bẻ được gì."}})]});
EV6("docCheck","visit",{a:["doc"],pp:()=>({a0:0}),w:C=>S.suc<60?2:.8,
 v:["Thái y {A} đến bắt mạch định kỳ, nhíu mày khi chạm cổ tay ngươi.","{A} được Thái y viện cử sang xem bệnh phong hàn mùa {S} trong cung.","{A} tình cờ đi ngang, nghe tiếng ngươi ho liền xin vào bắt mạch.","{A} mang theo đơn thuốc bổ mới, hỏi ngươi có muốn dùng thử."],
 o:X=>[c6("Để thái y kê thuốc bổ",{c:{bac:-20},w:{suc:10}}),
  c6("Hỏi thăm dò chuyện các cung",{c:{bac:-10},p:od(35+S.tamco/3),w:{mat:1},wt:[G6("biết cung nào hay gọi thái y")],l:{danh:-1},lt:[R6("thái y kín miệng, còn ngại ngươi")]}),
  c6("Cảm ơn, không cần",{w:{bac:5},k:[R6("Sức không hồi thêm")],ok:()=>"Ngươi tiễn thái y, giữ lại tiền thuốc."})]});
EV6("painter","visit",{a:["man"],pp:()=>{const a=man6("họa sư");return a==null?null:{a0:a}},w:C=>1,
 v:["{A} vâng chỉ vẽ tranh chân dung các phi tần, đến cung ngươi trước.","{A} xin vẽ cảnh {S} trong sân cung ngươi để dâng Hoàng thượng.","{A} mang đến mấy bức họa mẫu, mời ngươi chọn thế ngồi.","{A} được Nội vụ phủ cử đến tô lại bức bình phong cũ trong cung."],
 o:X=>[c6("Bỏ bạc nhờ vẽ cho đẹp",{c:{bac:-30},w:{sac:1,sung:2},k:[R6("người ta bảo ngươi đút lót họa sư")]}),
  c6("Ngồi cho vẽ đúng thật",{c:{suc:-4},p:od(40+S.sac/2),w:{sung:3},l:{sung:-1},lt:[R6("bức tranh nhạt, không ai để ý")]}),
  c6("Hỏi học vài nét bút",{c:{suc:-5},w:{tai:1},k:[R6("tiếp đàn ông lâu, dễ bị đồn")],ok:()=>{addArt("hoa",1);return `${X.A.n} chỉ cho ngươi vài nét. Họa tiến bộ.`}})]});
EV6("musician","visit",{a:["man"],pp:()=>{const a=man6("nhạc sư");return a==null?null:{a0:a}},w:C=>1,
 v:["{A} của Giáo phường ty mang đàn đến, nói phụng mệnh dạy một khúc mới cho yến tiệc.","{A} xin ngươi nghe thử khúc nhạc hắn vừa phổ từ bài thơ của ngươi.","{A} đến chỉnh lại dây đàn cầm trong cung ngươi.","{A} được cử sang hỏi ngươi có muốn tập múa cho buổi yến sắp tới."],
 o:X=>[c6("Học một khúc mới",{c:{suc:-6,bac:-10},w:{tai:1},k:[R6("tốn sức")],ok:()=>{addArt("cam",1);return "Ngươi thuộc thêm một khúc. Cầm tiến bộ."}}),
  c6("Nhờ phổ nhạc bài thơ dâng Hoàng thượng",{c:{bac:-20},p:od(30+S.tai/2),w:{sung:3,danh:1},l:{danh:-1},lt:[R6("khúc nhạc không hợp ý ngài")]}),
  c6("Mời về sớm",{w:{duc:1},k:[R6("lỡ dịp học")],ok:()=>"Ngươi giữ lễ, mời nhạc sư về sớm."})]});
EV6("newGirlAdvice","visit",{a:["rv"],pp:()=>{const a=rv6(v=>v.rank<S.rank&&v.rank<=2);return a==null?null:{a0:a}},w:C=>S.rank>=2?1.4:0,
 v:["{A} mới vào cung chưa lâu, rụt rè xin ngươi chỉ bảo lễ nghi hầu Thái hậu.","{A} khóc vì bị cung nhân bắt nạt, tìm đến ngươi vì nghe nói ngươi tốt bụng.","{A} xin theo ngươi sang thỉnh an Hoàng hậu cho đỡ sợ.","{A} hỏi ngươi nên mặc gì cho yến tiệc tháng tới."],
 o:X=>[c6("Tận tình chỉ bảo",{c:{suc:-4},r:[[X.A,12]],w:{duc:2}}),
  c6("Nhận làm người dưới trướng",{c:{bac:-15},r:[[X.A,15]],w:{danh:1},k:[R6(`người khác thấy ngươi kéo bè: phi tần ghen +${ghenN(BAL.ghen.follower)}`)],ok:()=>{ghenAll(BAL.ghen.follower);return `${X.A.n} từ nay đi theo ngươi.`}}),
  c6("Khuyên vài câu rồi thôi",{w:{suc:1},r:[[X.A,2]],k:[R6("lỡ một đồng minh")]})]});
EV6("eunRequest","visit",{a:["sv"],pp:()=>{const a=sv6(s=>s.role!=="maid");return a==null?null:{a0:a}},w:C=>1,
 v:["{A} quỳ xin ngươi nói giúp để cháu hắn được vào làm tiểu thái giám ở Ngự dược phòng.","{A} xin nghỉ ba hôm về quê chịu tang mẹ nuôi.","{A} xin ngươi đứng ra cho hắn nhận một tiểu thái giám làm con nuôi.","{A} xin chút bạc sửa mộ cha mẹ ngoài kinh."],
 o:X=>[c6("Nhận lời giúp",{c:{bac:-15},r:[[X.A,12]]}),
  c6("Giúp, đổi lấy tai mắt",{c:{bac:-10},p:od(45+S.tamco/3),w:{mat:1},r:[[X.A,4]],lr:[[X.A,-6]],lt:[R6("hắn thấy bị lợi dụng")]}),
  c6("Từ chối",{w:{bac:0,suc:1},r:[[X.A,-8]]})]});

/* ---------- HOÀNG THƯỢNG (moods and whims) ---------- */
EV6("empDish","emp",{a:["emp"],pp:()=>S.sung>=15?{a0:0}:null,w:C=>1+(S.emp.mood===0?1:0),
 v:["Hoàng thượng sai người mang sang một bát chè tổ yến ngài ăn dở, nhắn 'ngon, nàng thử'.","Ngài muốn ăn món quê ngươi; thái giám Càn Thanh cung đến hỏi cách nấu.","Ngự thiện phòng chế món cá hấp mới, ngài muốn ngươi nếm và nói thật.","Ngài bỗng thèm bánh hoa quế do chính tay phi tần làm, truyền khắp lục cung."],
 o:X=>[c6("Tự tay vào bếp",{c:{suc:-8},p:od(40+S.tai/4+(S.arts.y||0)*6),w:{sung:4,an:1},l:{sung:-1},lt:[R6("món ăn không vừa miệng ngài")]}),
  c6("Thuê đầu bếp giỏi làm thay",{c:{bac:-25},w:{sung:2},k:[R6("lộ ra bị chê dối")]}),
  c6("Nói thật món ăn chưa ngon",{p:od(35+S.duc/2+mm()),w:{sung:3,danh:1},wt:[G6("ngài quý người thật thà")],l:{sung:-3},lt:[R6("ngài phật ý")]})]});
EV6("empPoem","emp",{a:["emp"],pp:()=>S.sung>=20?{a0:0}:null,w:C=>1,
 v:["Hoàng thượng sai thái giám mang sang một bài thơ ngài vừa viết, hỏi ngươi nên sửa chữ nào.","Ngài viết được nửa bài thơ vịnh {S}, muốn ngươi nối hai câu cuối.","Ngài đố ngươi đoán bài thơ trên quạt là của danh sĩ nào.","Ngài gửi một câu đối vế trên, chờ vế dưới trước khi lên đèn."],
 o:X=>[c6("Nghiêm túc góp ý",{c:{suc:-3},p:od(30+S.tai/2+(S.arts.thi||0)*6),w:{sung:4,tai:1},l:{sung:-2},lt:[R6("góp ý vụng, ngài cụt hứng")]}),
  c6("Khen hết lời",{w:{sung:1},k:[R6("ngài thấy ngươi nịnh: Danh -1")],ok:()=>{apply({danh:-1});return "Ngài cười, không nói gì thêm."}}),
  c6("Nhờ người chấp bút",{c:{bac:-20},p:65,w:{sung:3},l:{sung:-4,danh:-2},lt:[R6("bị nhận ra nét chữ lạ")]})]});
EV6("empSulk","emp",{a:["emp"],pp:()=>S.emp.mood>=2&&S.sung>=20?{a0:0}:null,w:C=>S.emp.mood>=2?2.5:0,
 v:["Bãi triều, Hoàng thượng mặt lạnh như sương, ghé cung ngươi ngồi im không nói.","Ngài ném tấu chương xuống đất, rồi cho gọi ngươi sang Dưỡng Tâm điện mài mực.","Đêm khuya ngài không ngủ, đứng một mình ngoài hiên cung ngươi.","Ngài cáu gắt với cả thái giám thân cận, rồi hỏi ngươi: 'Nàng thấy trẫm có sai không?'"],
 o:X=>[c6("Lặng lẽ ở bên, pha trà",{c:{suc:-4},p:od(45+S.duc/3+S.sung/5),w:{sung:3,an:2},l:{sung:-2},lt:[R6("ngài muốn yên tĩnh, ngươi làm phiền")]}),
  c6("Khuyên giải chuyện triều chính",{p:od(25+S.tai/3+S.tamco/4),w:{sung:5,danh:1},l:{sung:-5},lt:[R6("hậu cung bàn chính sự, ngài giận")]}),
  c6("Kể chuyện vui cho ngài khuây",{c:{suc:-3},p:od(40+S.sac/4+S.tai/4),w:{sung:3},l:{sung:-1},lt:[R6("chuyện không đúng lúc")]})]});
EV6("empChess","emp",{a:["emp"],pp:()=>S.sung>=25?{a0:0}:null,w:C=>1,
 v:["Canh hai, thái giám gõ cửa: Hoàng thượng muốn một ván cờ, ngài đang đợi ở thư phòng.","Ngài thua cờ Thân vương, muốn ngươi bày lại thế cờ cho ngài gỡ.","Ngài thách ngươi đánh cờ, cược một chiếc trâm.","Ngài muốn đánh cờ dưới giàn hoa, bảo ngươi đừng nhường."],
 o:X=>[c6("Đánh hết sức",{c:{suc:-5},p:od(25+(S.arts.ky||0)*14+S.tamco/5),w:{sung:4,tai:1},l:{sung:-1},lt:[R6("thua, ngài cụt hứng")]}),
  c6("Khéo để ngài thắng sát nút",{c:{suc:-5},p:od(45+S.tamco/3),w:{sung:3},l:{sung:-2},lt:[R6("ngài nhận ra bị nhường")]}),
  c6("Cáo mệt xin hôm khác",{w:{suc:3},k:[R6("Sủng -2")],ok:()=>{apply({sung:-2});return "Ngài cho lui, hơi tiếc."}})]});
EV6("empAsksAbout","emp",{a:["emp","rv"],pp:()=>{const b=rv6();return b==null||S.sung<25?null:{a0:0,a1:b}},w:C=>1,
 v:["Hoàng thượng hỏi bâng quơ: 'Nàng thấy {B} là người thế nào?'","Ngài hỏi ngươi có biết vì sao {B} dạo này hay cáo bệnh.","Ngài muốn ban thưởng cho {B}, hỏi ngươi nên ban gì.","Ngài nhắc {B} múa đẹp, rồi nhìn ngươi chờ xem phản ứng."],
 o:X=>[c6(`Nói tốt cho ${X.B.n}`,{w:{duc:2},r:[[X.B,8]],k:[R6(`ngài để ý ${X.B.n} hơn`)],ok:()=>{X.B.o.sung=cl((X.B.o.sung||30)+2,0,100);return `Ngài gật gù, nhớ đến ${X.B.n}.`}}),
  c6("Nói thật, không thêm bớt",{w:{danh:1,duc:1},wt:[G6("ngài tin lời ngươi hơn")],k:[R6("lời thật có khi mất lòng")]}),
  c6("Khéo nói xấu một câu",{p:od(30+S.tamco/2+S.sung/5),w:{sung:2},wt:[G6(`ngài lạnh với ${X.B.n}`)],l:{sung:-3,duc:-2},lt:[R6("ngài ghét kẻ gièm pha")],ok:()=>{X.B.o.sung=cl((X.B.o.sung||30)-3,0,100);return `Ngài nhíu mày khi nhắc đến ${X.B.n}.`}})]});
EV6("empGiftOdd","emp",{a:["emp"],pp:()=>S.sung>=30?{a0:0}:null,w:C=>.9,
 v:["Hoàng thượng ban cho ngươi một con vẹt biết nói 'vạn tuế', nhưng nó chỉ kêu suốt đêm.","Ngài ban một tấm áo lông chồn của nước ngoài cống, cả hậu cung nhìn ngươi khác hẳn.","Ngài ban một bộ cờ ngọc, kèm lời: 'Đánh với trẫm thì phải dùng bộ này.'","Ngài ban cho cung ngươi thêm một đầu bếp giỏi của Ngự thiện phòng."],
 o:X=>[c6("Tạ ơn, khoe khắp các cung",{w:{danh:3},k:[R6(`phi tần ghen +${ghenN(BAL.ghen.boast)}`)],ok:()=>{ghenAll(BAL.ghen.boast);return "Cả lục cung biết ngươi được ban thưởng."}}),
  c6("Tạ ơn, cất giữ kín đáo",{w:{duc:1,sung:1},k:[R6("không được tiếng")]}),
  c6("Dâng lại Thái hậu",{w:{th:6},k:[R6("Sủng -1: ngài hơi phật lòng")],ok:()=>{apply({sung:-1});return "Thái hậu khen ngươi hiếu thuận."}})]});
EV6("empIncognito","emp",{a:["emp"],pp:()=>S.sung>=45&&S.rank>=2?{a0:0}:null,w:C=>.7,big:true,
 v:["Hoàng thượng thì thầm: đêm nay muốn cải trang ra chợ đêm ngoài cửa Đông Hoa, chỉ dẫn theo ngươi.","Ngài muốn mặc áo thường dân, cùng ngươi ra bến sông xem hội đèn.","Ngài rủ ngươi giả làm vợ chồng lái buôn, ra phố xem dân tình.","Ngài muốn đi chùa ngoài thành cầu phúc, không báo lễ bộ, chỉ ngươi theo hầu."],
 o:X=>[c6("Theo ngài",{c:{suc:-8},p:od(55+S.tamco/4),w:{sung:6,an:3},l:{danh:-4,th:-5},lt:[R6("bị lộ; Thái hậu trách ngươi xui ngài làm liều")]}),
  c6("Can ngài vì an nguy",{w:{duc:2,th:3},k:[R6("Sủng -3")],ok:()=>{apply({sung:-3});return "Ngài thở dài nghe lời."}}),
  c6("Theo, nhưng báo ngầm thị vệ",{c:{bac:-20},p:od(70+S.tamco/5),w:{sung:4,an:2},l:{sung:-3},lt:[R6("ngài thấy thị vệ, mất hứng")]})]});
EV6("empSleepRead","emp",{a:["emp"],pp:()=>S.sung>=35?{a0:0}:null,w:C=>.9,
 v:["Ngài đến lúc chiều, bảo ngươi đọc sách cho nghe; mới vài trang ngài đã ngủ gục trên gối ngươi.","Ngài nằm nghe ngươi gảy đàn, rồi thiếp đi, tay vẫn nắm vạt áo ngươi.","Ngài ghé qua, nói chuyện thuở nhỏ, rồi ngủ quên trên trường kỷ đến giờ thượng triều.","Ngài bảo mệt, chỉ muốn ngồi trong cung ngươi uống trà, không ai được làm phiền."],
 o:X=>[c6("Để ngài ngủ, thức canh",{c:{suc:-8},w:{sung:3,an:2}}),
  c6("Đánh thức đúng giờ thượng triều",{w:{danh:2,duc:1},k:[R6("Sủng -1: ngài ngái ngủ, cáu")],ok:()=>{apply({sung:-1});return "Ngài kịp giờ thượng triều."}}),
  c6("Nhân lúc ngài vui, xin ân điển",{p:od(30+S.sung/3),w:{bac:40,an:1},l:{sung:-3},lt:[R6("ngài cho là ngươi tính toán")]})]});
