/* ================= j68f: common event content, part 2 (thời tiết, triều đình, các con, kẻ hầu, tin đồn, chuyện lạ cần tra) ================= */
/* ---------- THỜI TIẾT, MÙA ---------- */
EV6("heatStroke","sea",{a:[],pp:()=>({}),w:C=>C.sea==="Hạ"?(C.wx.f===2?3:1.2):0,
 v:["Nắng gắt như đổ lửa, trong cung oi nồng; ngươi chóng mặt từ sáng.","Ve kêu râm ran, nước giếng cạn dần; cung nhân xin thêm đá lạnh từ hầm băng.","Trời hầm hập, ngự hoa viên vắng tanh, chỉ có Hoàng thượng ngồi câu cá bên hồ.","Đêm hè không gió, các con trằn trọc không ngủ được."],
 o:X=>[c6("Xin đá lạnh hầm băng",{c:{bac:-20},w:{suc:8}}),
  c6("Ra hồ hầu Hoàng thượng",{c:{suc:-8},p:od(BAL.odb.j68f.odP+S.sung/3+mm()),w:{sung:4},l:{suc:-4},lt:[R6("say nắng, ngài sai người đưa về")]}),
  c6("Nằm yên trong cung",{w:{suc:4},k:[R6(`bỏ lỡ dịp gặp ngài: Sủng ${balSg(BAL.eff.j68f.sungOk)}`)],ok:()=>{apply({sung:BAL.eff.j68f.sungOk});return "Ngươi nằm nghỉ, tránh nắng."}})]});
EV6("snowDay","sea",{a:[],pp:()=>({}),w:C=>C.sea==="Đông"?2:0,
 v:["Tuyết phủ trắng mái ngói, lò sưởi trong cung không đủ ấm, cung nhân co ro.","Mai nở trong tuyết ở góc vườn, Hoàng thượng truyền các cung làm thơ vịnh mai.","Ao sen đóng băng, các hoàng tử, công chúa đòi ra trượt băng.","Tuyết dày chặn lối sang Đức Thọ cung, lễ thỉnh an sáng nay khó đi."],
 o:X=>[c6("Phát áo bông cho cung nhân",{c:{bac:-25},w:{maid:8,duc:2}}),
  c6("Làm thơ vịnh mai dâng ngài",{c:{suc:-3},p:od(BAL.odb.j68f.odP_2+S.tai/2+(S.arts.thi||0)*6),w:{sung:3,danh:1},l:{danh:-1},lt:[R6("thơ vụng, bị so với người khác")]}),
  c6("Vẫn lội tuyết đi thỉnh an",{c:{suc:-10},w:{th:typeof trSnowGreet==="function"?trSnowGreet():5,duc:1}})]});
EV6("autumnMoon","sea",{a:["rv"],pp:()=>{const a=rv6();return a==null?null:{a0:a}},w:C=>C.sea==="Thu"?2:0,
 v:["Trăng thu sáng vằng vặc, {A} mời các cung ra đình Thủy Tạ ngâm thơ.","Gió heo may, lá phong đỏ rụng đầy lối; {A} rủ ngươi đi nhặt lá ép vào sách.","Đêm thu nghe tiếng sáo từ cung {A} vọng sang, buồn da diết.","Mùa cua béo, {A} gửi sang một giỏ cua và rượu hoa cúc."],
 o:X=>[c6("Nhận lời, góp vui",{c:{suc:-4},r:[[X.A,7]],w:{danh:1}}),
  c6("Mượn dịp dò lòng nàng",{p:od(BAL.odb.j68f.odP_3+S.tamco/2),w:{mat:1},r:[[X.A,2]],lr:[[X.A,-5]],lt:[R6("nàng thấy bị dò xét")]}),
  c6("Ở nhà đọc sách",{w:{tai:1},r:[[X.A,-3]]})]});
EV6("springAllergy","sea",{a:["doc"],pp:()=>({a0:0}),w:C=>C.sea==="Xuân"?1.5:0,
 v:["Phấn hoa xuân bay khắp nơi, ngươi hắt hơi không dứt, mắt đỏ hoe.","Mưa phùn kéo dài, chăn đệm ẩm mốc, ngươi ngứa ngáy khắp người.","Hoa đào nở rộ, nhưng cung nữ nổi mẩn đỏ từng mảng.","Sương sớm lạnh, ngươi đau họng mất tiếng đúng lúc sắp có yến."],
 o:X=>[c6(`Mời ${X.A.n} kê thuốc`,{c:{bac:-15},w:{suc:6}}),
  c6("Tự pha trà cúc kim ngân",{c:{suc:-2},p:od(BAL.odb.j68f.odP_4+(S.arts.y||0)*15),w:{suc:6,tai:1},l:{suc:-4},lt:[R6("uống sai vị, nặng thêm")]}),
  c6("Gắng chịu, che mặt the",{w:{bac:5},k:[R6(`Sắc ${balSg(BAL.eff.j68f.sacOk)} vài hôm, ngài thấy ngươi tiều tụy`)],ok:()=>{apply({sac:BAL.eff.j68f.sacOk});return "Ngươi gắng chịu cho qua."}})]});
EV6("stormNight","sea",{a:["emp"],pp:()=>({a0:0}),w:C=>C.wx.f===3?3:0,
 v:["Giông tố nổi lên, sét đánh gãy cây hòe cổ trước điện; cả cung xôn xao điềm gở.","Mưa giông cả đêm, cung nhân đồn Hoàng thượng sợ sấm từ thuở nhỏ.","Gió lớn làm đổ giàn hoa, đè lên một tiểu thái giám.","Sấm chớp đùng đùng, các con khóc thét, không ai dỗ được."],
 o:X=>[c6("Sang hầu ngài giữa đêm",{c:{suc:-6},p:od(BAL.odb.j68f.odP_5+S.sung/2),w:{sung:4,an:2},l:{sung:-2},lt:[R6("ngài không muốn ai thấy mình sợ")]}),
  c6("Thắp hương cầu an cho cung",{c:{bac:-10},w:{duc:2,maid:4}}),
  c6("Cứu người, cho thuốc men",{c:{bac:-15,suc:-4},w:{duc:3,danh:1}})]});
/* ---------- TIN TRIỀU ĐÌNH (needs j55 court) ---------- */
const td6=()=>{try{return tdOn()&&S.trieu&&S.trieu.H?S.trieu:null}catch(e){return null}};
EV6("famineDonate","court",{a:[],pp:()=>td6()?{}:null,w:C=>{const T=td6();return T?(T.kho<45?2.5:.5):0},
 v:["Tin dữ từ các tỉnh: dân đói kéo về kinh. Hoàng hậu kêu gọi lục cung giảm chi, quyên góp.","Nội vụ phủ dán cáo thị: cung nào quyên bạc cứu đói sẽ được ghi tên dâng Hoàng thượng.","Thái hậu ăn chay cầu mưa, các phi tần được mời cùng giữ chay một tháng.","Kho lúa vơi, Hộ bộ xin hậu cung bớt yến tiệc."],
 o:X=>[c6("Quyên nhiều bạc",{c:{bac:-60},w:{danh:4,duc:3},k:[R6("cạn túi")],ok:()=>{const T=td6();if(T)T.kho=cl(T.kho+3,0,100);return "Tên ngươi đứng đầu sổ quyên góp. Kho lúa +3."}}),
  c6("Giữ chay, giảm chi tiêu",{c:{suc:-6},w:{duc:2,th:3}}),
  c6("Góp chút ít cho phải lễ",{c:{bac:-10},w:{danh:1},k:[R6("bị so với người quyên nhiều")]})]});
EV6("borderNews","court",{a:["emp"],pp:()=>td6()?{a0:0}:null,w:C=>{const T=td6();return T?(T.bien<45?2.5:.4):0},
 v:["Chiến báo từ biên ải: quân ta thua một trận, Hoàng thượng thức trắng ở Dưỡng Tâm điện.","Sứ thần phương bắc đòi thêm cống phẩm; triều đình chia hai phe chủ chiến, chủ hòa.","Tướng giữ ải xin thêm lương thảo; Hoàng thượng hỏi hậu cung có ai thêu được cờ cho quân.","Quân ta thắng trận nhỏ, ngài vui, muốn ban yến khao quân."],
 o:X=>[c6("Thêu cờ, may áo gửi quân",{c:{suc:-10,bac:-15},w:{danh:3,sung:2},ok:()=>{const T=td6();if(T)T.bien=cl(T.bien+2,0,100);return "Áo cờ hậu cung gửi ra ải, lính tráng phấn chấn. Biên cương +2."}}),
  c6("Mang canh khuya hầu ngài",{c:{suc:-6},p:od(BAL.odb.j68f.odP_6+S.sung/3),w:{sung:3,an:1},l:{sung:-1},lt:[R6("ngài bận, không tiếp")]}),
  c6("Không dính vào việc triều",{w:{duc:1},k:[R6("mất dịp lập tiếng")]})]});
EV6("clanFather","court",{a:["rv"],pp:()=>{const T=td6();if(!T)return null;const a=rv6();return a==null?null:{a0:a,c:pick(Object.keys(T.H))}},w:C=>td6()?1.2:0,
 v:["Nghe đồn nhà {A} sắp bị hặc tội ăn hối lộ; nàng sang cung ngươi, mắt đỏ hoe.","{A} nhờ ngươi chuyển lời tới nhà thượng thư quen biết, xin nói đỡ cho cha nàng.","{A} khoe cha nàng vừa được thăng chức, cả nhà mở tiệc ba ngày.","{A} hỏi ngươi có biết ai trong triều đang nhắm vào nhà nàng."],
 o:X=>[c6("Hứa giúp hết sức",{c:{suc:-4},p:od(BAL.odb.j68f.odP_7+S.danh/3),r:[[X.A,12]],w:{danh:1},lr:[[X.A,-3]],lt:[R6("không giúp được, nàng thất vọng")],k:[R6("dính vào phe phái")]}),
  c6("An ủi, khuyên giữ mình",{r:[[X.A,5]],w:{duc:1},k:[R6("mất nửa buổi")]}),
  c6("Mách lại nhà đối đầu",{p:od(BAL.odb.j68f.odP_8+S.tamco/3),w:{mat:1,bac:30},lr:[[X.A,-15]],lt:[R6("bị lộ, nàng thù")],r:[[X.A,-2]],k:[R6(`Đức ${balSg(BAL.eff.j68f.ducOk)}`)],ok:()=>{apply({duc:BAL.eff.j68f.ducOk});return "Nhà đối đầu trả công ngươi hậu hĩnh."}})]});
/* ---------- CÁC CON ---------- */
EV6("kidSick","kid",{a:["kid","doc"],pp:()=>{const a=kid6(k=>k.age<=12);return a==null?null:{a0:a,a1:0}},w:C=>(C.sea==="Đông"||C.sea==="Xuân")?2:1,
 v:["{A} sốt nóng từ chiều, quấy khóc không chịu bú mớm.","{A} ho khan cả đêm, nhũ mẫu thức trắng.","{A} ăn phải quả lạ trong vườn, đau bụng quặn.","{A} nổi ban đỏ khắp người; thái y nghi là thủy đậu."],
 o:X=>[c6(`Mời ${X.B.n} chữa ngay`,{c:{bac:-20},r:[[X.A,5]],ok:()=>{X.A.o.hp=cl((X.A.o.hp||80)+BAL.eff.j68f.hpOk,0,100);return `${X.A.n} hạ sốt, ngủ yên.`}}),
  c6("Tự mình thức canh",{c:{suc:-12},r:[[X.A,12]],ok:()=>{X.A.o.hp=cl((X.A.o.hp||80)+BAL.eff.j68f.hpOk_2,0,100);return `${X.A.n} khỏe dần trong vòng tay mẹ.`}}),
  c6("Giao nhũ mẫu lo",{w:{suc:2},r:[[X.A,-4]],k:[R6("con bệnh lâu hơn")],ok:()=>{X.A.o.hp=cl((X.A.o.hp||80)-BAL.eff.j68f.hpOk_3,0,100);return "Nhũ mẫu chăm, con lâu khỏi."}})]});
EV6("kidFight","kid",{a:["kid","rv"],pp:()=>{const a=kid6(k=>k.age>=4&&k.age<=15);const b=rv6(v=>(v.kids||[]).some(k=>k.alive));return a==null||b==null?null:{a0:a,a1:b}},w:C=>1.2,
 v:["{A} đánh nhau với con của {B} ở thư phòng, cả hai đều bầm mặt.","Con của {B} giật đồ chơi của {A}, {A} cắn tay nó chảy máu.","{A} bị con của {B} chê là đứa ngốc trước mặt thầy dạy.","{A} và con của {B} trốn học ra hồ câu cá, suýt ngã xuống nước."],
 o:X=>[c6("Dẫn con sang xin lỗi",{c:{suc:-3},r:[[X.B,8],[X.A,-3]],w:{duc:2}}),
  c6("Bênh con, đòi lẽ phải",{p:od(BAL.odb.j68f.odP_9+S.rank*7),r:[[X.A,6]],w:{danh:1},lr:[[X.B,-10]],lt:[R6("hai cung xích mích")],l:{danh:-1}}),
  c6("Phạt con, dạy lễ",{r:[[X.A,-6]],w:{duc:1},ok:()=>{X.A.o.tal=cl((X.A.o.tal||40)+BAL.eff.j68f.talOk,0,100);return `${X.A.n} chép phạt trăm chữ, ngoan hơn.`}})]});
EV6("kidGift","kid",{a:["kid"],pp:()=>{const a=kid6(k=>k.age>=5);return a==null?null:{a0:a}},w:C=>1,
 v:["{A} chạy sang khoe bức tranh vẽ mẹ, nét non nớt mà giống lạ.","{A} học thuộc bài thơ, muốn đọc cho mẹ nghe trước khi đọc cho phụ hoàng.","{A} nhặt được tổ chim non, xin mẹ cho nuôi.","{A} xin mẹ cho học cưỡi ngựa như các anh."],
 o:X=>[c6("Dành cả buổi bên con",{c:{suc:-4},r:[[X.A,10]]}),
  c6("Mời thầy giỏi dạy thêm",{c:{bac:-30},ok:()=>{X.A.o.tal=cl((X.A.o.tal||40)+BAL.eff.j68f.talOk_2,0,100);return `${X.A.n} được thầy giỏi dạy. Tài năng của con ${balSg(BAL.eff.j68f.talOk_2)}.`},wt:[G6("con tiến bộ")]}),
  c6("Dẫn con đến hầu phụ hoàng",{p:od(BAL.odb.j68f.odP_10+S.sung/3),w:{sung:3},r:[[X.A,4]],l:{sung:-1},lt:[R6("ngài bận, con buồn")]})]});
/* ---------- KẺ HẦU (loyalty tests) ---------- */
EV6("bribedServ","serv",{a:["sv","rv"],pp:()=>{const a=sv6();const b=rv6(fo6)??rv6();return a==null||b==null?null:{a0:a,a1:b}},w:C=>1.3,
 v:["{A} lén báo: người của {B} dúi cho hắn mười lượng, hỏi giờ ngươi đi ngủ.","{A} bị bắt gặp nói chuyện thì thầm với cung nữ bên {B} ở góc tường.","{A} tự khai: {B} hứa cho hắn sang hầu cung nàng, lương gấp đôi.","{A} mang về một gói hương lạ, nói người bên {B} tặng."],
 o:X=>[c6("Thưởng hắn vì thành thật",{c:{bac:-15},r:[[X.A,12]]}),
  c6("Bảo hắn giả vờ nhận, làm phản gián",{p:od(BAL.odb.j68f.odP_11+(X.A.o.loyal||50)/2),w:{mat:1},wt:[G6(`chứng cứ ${X.B.n} ${balSg(BAL.eff.j68f.evOk)}`)],r:[[X.A,4]],lt:[R6("hắn hai lòng, lộ chuyện")],l:{danh:-1},ok:()=>{evStory(X.B.o,BAL.eff.j68f.evOk,"mua chuộc người hầu của ngươi");return `${X.A.n} mang về bằng chứng ${X.B.n} mua chuộc người hầu. Chứng cứ ${balSg(BAL.eff.j68f.evOk)}.`}}),
  c6("Đuổi hắn đi cho chắc",{w:{tamco:1},r:[[X.A,-30]],k:[R6("mất một người hầu quen việc")]})]});
EV6("servRomance","serv",{a:["sv"],pp:()=>{const a=sv6(s=>s.role==="maid"&&(s.age||20)>=18);return a==null?null:{a0:a}},w:C=>1,
 v:["{A} bị bắt gặp đứng nói chuyện với một thị vệ gác cửa lúc chập tối.","{A} giấu trong gối một chiếc khăn thêu tên một thị vệ.","{A} xin ngươi cho phép khi mãn hạn được gả cho người đồng hương làm lính ngự lâm.","Người ta đồn {A} có tình ý với tiểu thái giám bên Ngự thiện phòng."],
 o:X=>[c6("Che giấu cho nàng",{r:[[X.A,15]],k:[R6("lộ ra ngươi bị trách quản người không nghiêm")]}),
  c6("Răn dạy, giữ phép cung",{w:{danh:1},r:[[X.A,-6]]}),
  c6("Hứa xin ân điển khi mãn hạn",{c:{bac:-10},r:[[X.A,12]],w:{duc:1}})]});
EV6("servLeave","serv",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a}},w:C=>1,
 v:["{A} quỳ khóc: mẹ ở quê ốm nặng, xin về thăm một chuyến, chỉ sợ không kịp.","{A} xin ngươi cho nghỉ để chịu tang cha.","{A} xin ra cung trước hạn để lo cho em nhỏ mồ côi.","{A} xin ngươi chút bạc chuộc em gái bị bán làm nô tì."],
 o:X=>[c6("Cho về, kèm bạc",{c:{bac:-20},r:[[X.A,18]],w:{duc:2},k:[R6("cung thiếu người một tháng")]}),
  c6("Xin Nội vụ phủ cho phép",{p:od(BAL.odb.j68f.odP_12+S.rank*8),r:[[X.A,10]],w:{danh:1},lr:[[X.A,-4]],lt:[R6("bị bác, nàng buồn")]}),
  c6("Không cho",{w:{suc:1},r:[[X.A,-12]]})]});
EV6("newServSus","serv",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a}},w:C=>1,
 v:["{A} dạo này hay ra vào cửa sau lúc nửa đêm.","Cung nhân bảo {A} có nhiều bạc lạ, mua cả son phấn đắt tiền.","{A} lật xem thư từ trên án của ngươi khi tưởng không ai thấy.","{A} biết những chuyện trong cung ngươi mà lẽ ra không ai kể."],
 o:X=>[c6("Cho người theo dõi",{c:{suc:-3},p:od(BAL.odb.j68f.odP_13+eyes(S)*6),w:{mat:1},wt:[G6("biết hắn có hai lòng hay không")],l:{danh:-1},lt:[R6("hắn biết bị theo dõi")],ok:()=>{const s=X.A.o;const two=!!(s.spyFor&&s.spyFor!=="me");if(two)typeof knSoldFound==="function"&&knSoldFound(s);return two?`${s.name} quả có làm tai mắt cho người khác. Ngươi đã rõ.`:`${s.name} không có hai lòng; chỉ là chuyện riêng.`}}),
  c6("Hỏi thẳng",{p:od(BAL.odb.j68f.odP_7+S.danh/3),r:[[X.A,4]],lr:[[X.A,-8]],lt:[R6("hắn tủi thân hoặc giấu kín hơn")],ok:()=>{const s=X.A.o;if(s.spyFor&&s.spyFor!=="me")typeof knSoldFound==="function"&&knSoldFound(s);return s.spyFor&&s.spyFor!=="me"?`${s.name} quỳ xuống khai thật đang bị người khác sai khiến.`:`${s.name} trong sạch, cảm động vì được hỏi thẳng.`}}),
  c6("Đổi hắn đi việc khác",{w:{tamco:1},r:[[X.A,-6]],k:[R6("mất người quen việc")]})]});
/* ---------- TIN ĐỒN (true or false; she can check; the game reports only the truth) ---------- */
EV6("rumorPreg","rumor",{a:["rv"],pp:()=>{const a=rv6(v=>v.rank>=1);return a==null?null:{a0:a}},w:C=>1.2,
 v:["Cung nhân xì xào: {A} có mang đã hai tháng, đang giấu.","Lời đồn: {A} lén mời bà đỡ ngoài cung vào.","Người ta bảo {A} dạo này hay nôn, chỉ ăn đồ chua.","Có tin {A} xin Thái y viện thuốc an thai."],
 o:X=>[c6("Cho người dò cho chắc",{c:{bac:-15},p:od(BAL.odb.j68f.odP_14+eyes(S)*6),wt:[G6("biết sự thật")],w:{mat:1},l:{danh:-1},lt:[R6("bị lộ là đi dò")],ok:()=>{const v=X.A.o;return v.preg?`Dò ra: ${v.name} quả có mang (tháng ${v.preg}).`:`Dò ra: ${v.name} không có mang; lời đồn sai.`}}),
  c6("Sang chúc mừng thăm dò",{c:{bac:-10},p:od(BAL.odb.j68f.odP_8+S.tamco/3),r:[[X.A,3]],wt:[G6("biết sự thật")],lr:[[X.A,-5]],lt:[R6("nàng thấy ngươi tọc mạch")],ok:()=>{const v=X.A.o;return v.preg?`${v.name} ngượng ngùng nhận là có mang.`:`${v.name} bật cười: chẳng có chuyện ấy.`}}),
  c6("Mặc kệ lời đồn",{w:{duc:1},k:[R6("không biết thật hư")]})]});
EV6("rumorSpy","rumor",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a}},w:C=>1,
 v:["Có kẻ rỉ tai ngươi: {A} là tai mắt người khác cài vào.","Lời đồn trong các dãy nhà hầu: {A} đem chuyện cung ngươi kể ra ngoài.","Người bên Kính sự phòng nói nhỏ: {A} có lui tới các cung khác.","{M} nghi {A} hai lòng, nhưng không có bằng chứng."],
 o:X=>[c6("Thử lòng bằng một tin giả",{c:{suc:-3},p:od(BAL.odb.j68f.odP_15+S.tamco/3),w:{tamco:1},wt:[G6("biết thật hư")],l:{danh:-1},lt:[R6("thử vụng, hắn biết")],ok:()=>{const s=X.A.o;if(s.spyFor&&s.spyFor!=="me")typeof knSoldFound==="function"&&knSoldFound(s);return s.spyFor&&s.spyFor!=="me"?`Tin giả lọt ra ngoài: ${s.name} đúng là tai mắt người khác.`:`Tin giả nằm yên: ${s.name} trung thành, lời đồn sai.`}}),
  c6("Tin hắn, thưởng an lòng",{c:{bac:-10},r:[[X.A,8]],k:[R6("nếu hắn hai lòng thì vẫn lọt tin")]}),
  c6("Đuổi đi cho yên",{w:{suc:1},r:[[X.A,-30]],k:[R6("có thể đuổi oan người tốt")]})]});
EV6("rumorEvidence","rumor",{a:["rv"],pp:()=>{const a=rv6(fo6)??rv6();return a==null?null:{a0:a}},w:C=>1,
 v:["Nghe đồn {A} đang giữ thứ gì đó có thể làm hại ngươi.","Cung nữ bên {A} khoe chủ mình 'nắm thóp' một người trong lục cung.","Lời đồn: {A} sai người lục lọi đồ ngươi vứt bỏ.","Có kẻ bảo {A} đã ghi chép mọi chuyện về ngươi trong một cuốn sổ."],
 o:X=>[c6("Mua tin từ cung nữ bên ấy",{c:{bac:-25},p:od(BAL.odb.j68f.odP_16+eyes(S)*5),wt:[G6("biết thật hư")],w:{mat:1},lt:[R6("mất bạc, không ra gì")],l:{danh:-1},ok:()=>{const n=evG(X.A.o,S);return n>0?`Thật: ${X.A.n} đang giữ ${n} chứng cứ chống lại ngươi.`:`${X.A.n} chưa có chứng cứ gì về ngươi; lời đồn sai.`}}),
  c6("Sang làm lành",{c:{bac:-15},r:[[X.A,8]],k:[R6("nếu nàng có ý hại, làm lành chưa chắc đủ")]}),
  c6("Bỏ ngoài tai",{w:{duc:1},k:[R6("không biết thật hư")]})]});
EV6("rumorEmpLove","rumor",{a:["rv"],pp:()=>{const a=rv6();return a==null?null:{a0:a}},w:C=>1,
 v:["Khắp cung đồn Hoàng thượng sắp phong {A} lên một bậc.","Người ta bảo Hoàng thượng đã chán {A}, cả tháng không lật thẻ nàng.","Lời đồn: {A} được Thái hậu chấm làm Hoàng hậu tương lai.","Có tin {A} sắp bị đưa ra lãnh cung vì phạm lỗi."],
 o:X=>[c6("Hỏi thái giám Kính sự phòng",{c:{bac:-15},p:od(BAL.odb.j68f.odP_17+eyes(S)*4),wt:[G6("biết sự thật")],w:{mat:1},lt:[R6("hắn kín miệng")],l:{bac:-5},ok:()=>{const v=X.A.o;return `Sự thật: ${v.name} hiện ${RANKS[v.queen?7:v.rank]?RANKS[v.queen?7:v.rank].n:"phi tần"}, sủng ${v.sung>=BAL.sungLv.th[1]?"cao":v.sung>=BAL.sungLv.th[0]?"vừa":"thấp"}, Thái hậu ${v.th>=40?"quý":"bình thường với"} nàng.`}}),
  c6("Sang thân thiết với nàng",{c:{bac:-10},r:[[X.A,6]],k:[R6("người ghét nàng sẽ để ý ngươi")]}),
  c6("Lan thêm lời đồn",{p:od(BAL.odb.j68f.odP_18+S.tamco/3),wt:[G6(`${X.A.n} bị soi mói`)],w:{tamco:1},l:{danh:-3,duc:-2},lt:[R6("bị lần ra kẻ tung tin")],k:[R6(`Đức ${balSg(BAL.eff.j68f.ducOk_2)}`)],ok:()=>{apply({duc:BAL.eff.j68f.ducOk_2});X.A.o.danh=Math.max(0,(X.A.o.danh||20)-3);return `Lời đồn lan rộng; danh tiếng ${X.A.n} giảm.`}})]});
/* ---------- CHUYỆN LẠ CẦN TRA (small mysteries; the culprit is real and fixed when the event fires) ---------- */
const MYST6=["cây trâm hồ điệp bằng vàng","ấn tín nhỏ của cung","túi bạc tháng","phong thư nhà gửi","lọ thuốc an thần","chuỗi hạt trầm Thái hậu ban"];
EV6("hairpinThief","myst",{a:["sv","sv","sv"],big:true,items:MYST6,pp:()=>{const L=(S.staff||[]).filter(s=>s.sid!=null);if(L.length<3)return null;const T=shuf(L.slice()).slice(0,3);const g=T.findIndex(s=>netIs(s,"greed"));return{a0:T[0].sid,a1:T[1].sid,a2:T[2].sid,g:g>=0&&roll(70)?g:R(3),it:R(MYST6.length)}},w:C=>hasStaff6(3)?1.4:0,
 v:["Sáng ra, {it} trong tráp của ngươi biến mất. Đêm qua chỉ {A}, {B} và {C} ra vào buồng trong.","{it} mất ngay sau buổi dọn dẹp; ba người có mặt: {A}, {B}, {C}.","Tráp khóa còn nguyên mà {it} không thấy; chìa khóa chỉ {A}, {B} và {C} từng cầm.","Mất {it} giữa ban ngày. {M} nhớ lại chỉ {A}, {B}, {C} lui tới gần đó."],
 o:X=>{const G=[X.A,X.B,X.C][X.p.g];return[
  c6("Tra xét kỹ từng manh mối",{c:{suc:-6},p:od(BAL.odb.j68f.odP_19+S.tamco/3+eyes(S)*4),w:{tamco:1},wt:[G6("tìm ra kẻ lấy, lấy lại đồ")],r:[[G,-25]],l:{danh:-1},lt:[R6("không ra manh mối, đồ mất")],ok:()=>`Vết sáp nến trên tay áo và lời chứng của tiểu thái giám chỉ đúng ${G.n}; đồ tìm thấy dưới gối ${G.n}.`,no:()=>"Manh mối đứt, không ai bị buộc tội oan."}),
  c6("Nhờ Cung Chính ti tra",{c:{bac:-25},p:80,wt:[G6("tìm ra kẻ lấy")],r:[[G,-25]],k:[R6(`chuyện xấu lan ra ngoài: Danh ${balSg(BAL.eff.j68f.danhL)}`)],l:{danh:BAL.eff.j68f.danhL},lt:[R6("tra không ra")],ok:()=>{apply({danh:BAL.eff.j68f.danhL});return `Cung Chính ti tra ra ${G.n}.`}}),
  c6("Cho kẻ lấy một đêm tự trả lại",{w:{duc:2},p:55,wt:[G6("đồ được trả, không ai mất mặt")],lt:[R6("không ai trả, đồ mất hẳn")],l:{tamco:-1},ok:()=>{relDo(G,BAL.eff.j68f.relOk);return "Sáng hôm sau đồ nằm lại trong tráp; ngươi không truy nữa."}})]}});
EV6("poisonedFish","myst",{a:["sv"],pp:()=>{const a=sv6();return a==null?null:{a0:a}},w:C=>1,
 v:["Đàn cá chép trong chậu sứ trước sân chết nổi bụng hết một đêm.","Chú vẹt trong cung bỗng lăn ra chết, mỏ tím tái.","Chậu lan quý héo rũ chỉ sau một đêm, đất có mùi lạ.","Con chó nhỏ cung nữ nuôi ăn thức ăn thừa xong thì nôn mửa."],
 o:X=>[c6("Cho thái y nghiệm độc",{c:{bac:-20},p:70,wt:[G6("biết có độc hay không")],w:{tamco:1},l:{bac:-5},lt:[R6("xét không ra")],ok:()=>{const bad=liveRivals(true).some(v=>{try{return bandOf(danger(v,S))>=3}catch(e){return false}});return bad?"Thái y nói có dấu độc nhẹ; có kẻ đang thử tay. Ngươi đề phòng hơn.":"Thái y nói là do nước tù và trời trở, không có độc."}}),
  c6(`Hỏi ${X.A.n}, người coi việc`,{p:od(BAL.odb.j68f.odP_8+S.tamco/3),r:[[X.A,2]],wt:[G6("biết ai lại gần")],lr:[[X.A,-6]],lt:[R6("hắn sợ bị đổ tội")],ok:()=>`${X.A.n} khai không thấy người lạ; chuyện có lẽ do sơ suất.`}),
  c6("Thay hết nước, đồ ăn",{c:{bac:-10,suc:-2},w:{suc:2},k:[R6("không biết nguyên do")]})]});
EV6("nightSteps","myst",{a:["maid"],pp:()=>S.maid?{a0:0}:null,w:C=>1,
 v:["{M} thề đêm qua nghe tiếng bước chân trên mái ngói buồng ngươi.","Cửa sổ thư phòng sáng ra mở toang, sách vở xô lệch.","Dấu giày lạ in trên nền tuyết ngoài hiên sau.","Có người để lại một nhành hoa khô trước cửa cung ngươi mỗi đêm rằm."],
 o:X=>[c6("Thức đêm rình bắt",{c:{suc:-10},p:od(BAL.odb.j68f.odP_20+eyes(S)*5),w:{mat:1},wt:[G6("biết là ai")],l:{suc:-3},lt:[R6("không bắt được ai")],ok:()=>{const v=liveRivals(true).find(v=>v.plan&&v.plan.t===key(S));return v?`Bóng người chạy về phía cung ${v.name}. Ngươi ghi nhớ.`:"Chỉ là một tiểu thái giám đi tắt lấy nước; không có gì đáng ngại."}}),
  c6("Thuê thêm người gác",{c:{bac:-25},w:{tamco:1},wt:[G6("tuần tới kẻ hại ngươi khó ra tay hơn")],ok:()=>{S.guardWarn=Math.max(S.guardWarn||0,1);return "Cung ngươi có thêm người canh."}}),
  c6(`Bảo ${S.maid.name} im lặng`,{w:{suc:1},r:[[X.A,-3]],k:[R6("không biết thật hư")]})]});
