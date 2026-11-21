/* ================= jnrask_b: help hồi asks of the NPC roads, origins nc · td · ch · thd · cnv (Q1b, QUESTLINES_AUDIT §4 Q1; OD:L1243, OD:L1252, OD:L1601) =================
   DATA ONLY (the engine hook is jnroad.js nrOffer, Q1a). NRASK[<chapter id>] = {k, h, o}:
   k  = the help kind (one of the stock j72 cards nr_emp / nr_th / nr_hh / nr_thu / nr_do / nr_y / nr_che; never «bac», D-Q2): it decides the
        costs, odds and test stat of the two options (BAL.nroad.op / .bac / .suc / .dl — ONE CORE, no number here);
   h  = the ask in the NPC's own voice about THAT chapter's conflict (writer kit: reports/questline-expert.md B2 shapes, B4 voices);
   o  = [[label, loss line], [label, loss line]] — the stock card's two options IN ITS ORDER (emp/th/hh/che: Sức road, bạc road;
        thu/do/y: bạc road, Sức road); the betray option stays the stock one.
   Slots (filled by the engine, VANPHONG §2 — never a typed pronoun): {me} / {Me} = how the asker names herself (muội / tỷ / bổn cung /
   nô tỳ), {call} = how she calls the player (Tỷ tỷ / Muội muội / Tiểu chủ / Nương nương; written only at a sentence start), {he} = the
   asker in the narration (nàng / hắn), {B} = the rival of her road when there is one. Missing entry → the stock card (safe fallback).
   The chapters' own cast tokens ({land} {pa} {n1} {foed} …) belong to the player's road and are never used here. Money is only a COST. */
var NRASK=window.NRASK||(window.NRASK={});
Object.assign(NRASK,{
/* ---------- nc · Công chúa hòa thân ---------- */
/* nc_gian «Mật lệnh cố quốc» */
nc_gian_5:[{k:"thu",h:"Ở Hội Đồng quán có một lái buôn cố hương đang chờ tin của {me}. {Me} không dám để thư đi qua Kính sự phòng, vì ở đó ai cũng biết chữ nước {me}. {call} chỉ cần cho một người kín miệng mang thư ra đến cửa quán.",
 o:[["Sai thái giám của mình mang thư ra quán","thái giám bị khám ở cửa cung, thư nằm trong tay áo"],["Gửi thư theo người nhà mình ra phố","người nhà bị hỏi vì sao lui tới quán của khách ngoại bang"]]}],
nc_gian_6:[{k:"thu",h:"Lão lái buôn bị giữ ở cửa Chính Dương vì thiếu một tấm lộ dẫn của bộ Lễ. Rương của lão mà bị khám đến đáy thì {me} cũng không còn đường lui. Trước khi đoàn buôn phải quay đầu, {call} có cách nào xin được một tờ giấy ấy không?",
 o:[["Bỏ bạc nhờ thái giám lo tấm lộ dẫn","tờ lộ dẫn bị nghi là giả, tên người lo giấy bị ghi lại"],["Nhờ người nhà mình hỏi ở bộ Lễ","bộ Lễ hỏi ngược vì sao nhà ngươi bênh một đoàn buôn lạ"]]}],
nc_gian_7:[{k:"emp",h:"Thị vệ đứng ngoài cung {me} đã ba đêm. Hoàng thượng chưa hỏi, nhưng ngài đang chờ một người khác nói trước. Lúc {call} hầu ngài, xin nói giúp rằng {me} chưa từng làm điều gì sau lưng ngài.",
 o:[["Nhân lúc hầu Hoàng thượng, nói rằng nàng vẫn một lòng","Hoàng thượng hỏi ngược sao ngươi biết rõ lòng người khác"],["Nhờ người thân cận của Hoàng thượng đỡ lời","người thân cận nhận lễ rồi kể lại cho ngài nghe"]]}],
nc_gian_8:[{k:"do",h:"Từ khi biên ải có chuyện, người của {B} đếm từng lá thư {me} viết. {Me} cần biết ai đang canh cửa sổ của {me}, trước khi {me} phải chọn gửi tin thật hay giả về cố quốc.",
 o:[["Sai người canh xem ai rình cung nàng","người của ngươi bị chính kẻ rình bắt gặp"],["Tự để ý trong những buổi thỉnh an","ngươi hỏi han nhiều quá, cả cung đồn ngươi cũng dính vào"]]}],
nc_gian_9:[{k:"thu",h:"Lão {kha} nằm trong ngục Đại Lý tự, chờ phiên thẩm vấn. {Me} chỉ cần lão nghe được một câu: cứ im lặng, nhà lão sẽ có người lo. {call} có ai ra vào được cửa ngục không?",
 o:[["Bỏ bạc nhờ thái giám đưa lời vào ngục","cai ngục nhận bạc rồi đem lời nhắn đi bán"],["Nhờ người nhà mình hỏi thăm ở Đại Lý tự","người nhà bị ghi tên là kẻ quen với phạm nhân"]]}],
nc_gian_10:[{k:"emp",h:"Hoàng thượng đã cho bày hết thư từ lên án, rồi gọi {me} đến một mình. {Me} không xin {call} che tội. {Me} chỉ xin, trước giờ ấy, có người nhắc ngài nhớ những năm {me} đã ở bên ngài.",
 o:[["Hầu Hoàng thượng, nhắc những ngày nàng hầu ngài","Hoàng thượng phật ý, cho rằng ngươi bênh kẻ có tội"],["Dâng lễ nhờ người hầu cận nói giúp một câu","lễ bị trả về, cả cung biết ngươi đứng về phía nàng"]]}],
/* nc_su «Sứ đoàn cố quốc» */
nc_su_5:[{k:"th",h:"Bộ Lễ bắt sứ đoàn cố quốc quỳ ba lần, khấu chín lần, còn huynh trưởng {me} thì không chịu cúi. Chuyện lễ nghi, chỉ Thái hậu nói một lời là xong. {call} có thể thưa giúp {me} để hai bên đều giữ được mặt không?",
 o:[["Vào hầu Thái hậu, thưa chuyện lễ sứ đoàn","Thái hậu cho rằng ngươi bàn chuyện ngoài triều"],["Dâng Thái hậu một lễ, kèm lời xin","Thái hậu nhận lễ mà không nói gì, ngươi mang tiếng chạy chọt"]]}],
nc_su_6:[{k:"che",h:"Bức gấm Bách thọ mẫu thân {me} dệt ba năm bị loang mực một góc, mà lễ Vạn thọ đã gần. Thợ của cung {me} không ai thêu được chỉ cố hương. Nếu bên {call} có người tay khéo, xin cho {me} mượn mấy hôm.",
 o:[["Cho thợ thêu của cung mình sang giúp","thợ thêu thức mấy đêm liền, việc trong cung ngươi bỏ dở"],["Bỏ bạc mời thợ Chức tạo vào cung","thợ ngoài cung nói ra chuyện bức gấm bị hỏng"]]}],
nc_su_7:[{k:"emp",h:"Huynh trưởng {me} say rượu, phi ngựa vào vườn Thượng Lâm, nay bị cấm quân giữ. Chuyện của một sứ thần là chuyện của hai nước. Nếu có dịp hầu ngài, xin {call} nói giúp để huynh ấy chỉ bị phạt, đừng bị giải về nước trong nhục.",
 o:[["Nhân lúc hầu giá, xin ngài khoan dung cho sứ thần","Hoàng thượng cho rằng ngươi xen vào việc bang giao"],["Dâng lễ nhờ người bên cạnh ngài nói đỡ","người nhận lễ lại kể với cấm quân, chuyện thêm to"]]}],
nc_su_8:[{k:"do",h:"Đại yến các nước, ghế của sứ cố quốc đặt ở hàng nào là một câu nói của hai triều. {Me} nghe phong thanh người của {B} đã đổi chỗ trong sổ xếp ghế. {call} giúp {me} hỏi xem ai đã cầm bút.",
 o:[["Sai người hỏi thái giám lo yến","thái giám lo yến báo lên rằng có người dò chuyện tiền triều"],["Tự hỏi chuyện mấy người hầu yến","ngươi bị đồn tò mò việc của tiền triều"]]}],
nc_su_9:[{k:"thu",h:"Điều ước chợ biên phải ký trước tiết Sương giáng, mà bộ Hộ còn chần chừ vì giá muối. Nếu nhà {call} có người ở triều, {me} chỉ xin một lời nhắn đến đúng tay, để sứ đoàn khỏi phải về tay không.",
 o:[["Nhờ thái giám của mình chuyển lời ra bộ Hộ","lời nhắn bị chép lại, bộ Hộ cho là hậu cung xen vào"],["Gửi lời theo người nhà mình vào thăm","người nhà ngươi bị kéo vào chuyện giá muối"]]}],
nc_su_10:[{k:"thu",h:"Ở cửa thành có người tâu xe sứ đoàn mang theo thứ không được phép mang. Huynh trưởng {me} chưa biết. {Me} cần một lá thư đến tay huynh ấy trước khi xe lăn bánh, để huynh ấy bỏ lại thứ ấy.",
 o:[["Bỏ bạc nhờ thái giám đưa thư ra quán sứ","thư đến muộn, xe đã bị khám ở cửa thành"],["Gửi thư theo người nhà mình ra tiễn","người nhà bị cấm quân hỏi vì sao lui tới quán sứ"]]}],
/* nc_tuc «Người ngoại tộc» */
nc_tuc_5:[{k:"hh",h:"Lễ Nguyên đán, Nội vụ phủ bắt mọi người mặc lễ phục theo phẩm. {Me} không dám trái lệ. {Me} chỉ xin được cài một cây trâm cố hương trên tóc. {call} thưa với Hoàng hậu giúp {me} một câu được không?",
 o:[["Thỉnh an Hoàng hậu, thưa xin cho nàng","Hoàng hậu cho rằng ngươi xin phá lệ cho người ngoài"],["Dâng lễ Khôn Ninh cung, xin cho cài trâm cố hương","lễ bị trả về, người ta bàn ngươi mua lòng Trung cung"]]}],
nc_tuc_6:[{k:"y",h:"Bát canh ở cung {me} sạch như nước giếng, vậy mà cả cung đồn {me} bỏ bùa. Thận hình ty chỉ cho một hạn ngắn. {Me} cần một vị thái y chịu nghiệm lại bát canh ấy và nói thật điều tận mắt thấy.",
 o:[["Mời thái y quen nghiệm lại, trả công hậu","thái y sợ liên lụy, ghi tên ngươi vào sổ"],["Tự tìm sách thuốc, xem bát canh có gì","ngươi nói sai một vị thuốc, lời đồn càng to"]]}],
nc_tuc_7:[{k:"che",h:"Lệnh soát cung sắp ban, mà trong cung {me} có bài vị của tổ tiên. Người ta gọi đó là bàn thờ thần lạ. {Me} không nỡ đốt. {call} cất giùm {me} vài hôm, đến khi chuyện lắng xuống.",
 o:[["Cất bài vị trong cung mình","người ta bàn ngươi giữ đồ thờ của người ngoại tộc"],["Bỏ bạc gửi bài vị ra một ngôi chùa ngoài cung","người mang đi bị hỏi giữa đường, bài vị suýt mất"]]}],
nc_tuc_8:[{k:"thu",h:"Có tờ sớ ngoài triều nói người ngoại tộc không nên ở ngôi cao. Tên {me} chưa nêu ra, nhưng ai cũng biết là ai. {Me} cần biết trong triều có những ai đứng sau tờ sớ ấy.",
 o:[["Nhờ thái giám của mình hỏi chép bản sớ","bản chép bị bắt, người ta bảo ngươi dòm ngó việc triều"],["Hỏi người nhà mình ở triều","nhà ngươi bị kể vào phe bênh người ngoại tộc"]]}],
nc_tuc_9:[{k:"th",h:"Lễ Phật đản năm nay giao cho {me} lo, mà {me} chưa từng đứng một lễ nào theo phép nơi này. Thái hậu có một vị ma ma thuộc lễ hơn ai hết. {call} xin giúp cho {me} được theo học mấy buổi.",
 o:[["Hầu Thái hậu một buổi, xin cho nàng theo học","Thái hậu chê nàng chưa học đã xin việc lớn, ngươi cũng bị trách"],["Dâng Thái hậu một lễ nhỏ, xin mượn ma ma","Thái hậu cho là ngươi lấy lễ thay lòng"]]}],
nc_tuc_10:[{k:"do",h:"Có một nhà thế gia muốn nhận {me} làm nghĩa nữ. Ân ấy lớn, mà thứ gì lớn cũng có giá. Trước khi {me} gật đầu, {call} giúp {me} biết nhà ấy muốn gì ở {me}, và {B} có nhúng tay không.",
 o:[["Sai người dò la nhà thế gia ấy","người của ngươi bị nhà ấy bắt gặp, họ ghi mối hận"],["Tự hỏi chuyện các phi tần quen nhà ấy","ngươi hỏi lộ ý, nhà ấy cho là ngươi phá chuyện"]]}],
/* nc_vuong «Ngai vàng cố quốc» */
nc_vuong_5:[{k:"emp",h:"Ngôi ở cố quốc đã có người ngồi, chỉ còn thiếu ấn sách phong. Phe thua đang xin Đại Hy đừng phong. Một lời đến tai Hoàng thượng đúng lúc, cố quốc {me} yên được mười năm.",
 o:[["Nhân buổi hầu giá, nhắc đến ấn sách phong","Hoàng thượng phật ý, bảo ngươi bàn chuyện nước khác"],["Dâng lễ nhờ người hầu Ngự thư phòng nhắc giúp","người hầu nhắc sai lúc, ngài nổi giận"]]}],
nc_vuong_6:[{k:"thu",h:"Binh bộ muốn nhân lúc cố quốc còn yếu mà đòi hai trấn biên, bộ Lễ muốn giữ hòa. Nếu nhà {call} có người nói được trong triều, xin giúp {me}. {Me} không xin gì nhiều, chỉ xin một lời nhắn đến tay vị quan đứng về phía hòa.",
 o:[["Nhờ thái giám của mình đưa lời ra ngoài","lời nhắn lọt vào tay Binh bộ"],["Gửi lời theo người nhà mình","nhà ngươi bị Binh bộ ghi là phe nhún"]]}],
nc_vuong_7:[{k:"thu",h:"Mẫu thân {me} kẹt trong một tòa thành cũ, lương cạn, thuốc hết. Đường đèo chỉ còn đi được đến khi tuyết xuống. {Me} có bạc, chỉ thiếu một người mang được thuốc và thư ra khỏi cung.",
 o:[["Bỏ bạc nhờ thái giám đưa thuốc ra ngoài","thái giám ôm thuốc trốn mất, tên ngươi bị nhắc"],["Gửi thuốc theo người nhà mình vào thăm","người nhà bị khám cửa, lộ ra thư gửi đi ngoại bang"]]}],
nc_vuong_8:[{k:"emp",h:"Hoàng thượng còn đắn đo chuyện xuất binh, và ngài chờ một người hiểu cố quốc nhất trong cung. {Me} không dám tự xin vào chầu. {call} chỉ cần nói với ngài rằng có người biết đường núi bên ấy.",
 o:[["Hầu Hoàng thượng, tiến cử nàng vào chầu","Hoàng thượng bảo ngươi đưa người ngoại tộc vào việc quân"],["Dâng lễ nhờ người thân cận tiến cử giúp","lễ đến tai Binh bộ, cả triều xì xào"]]}],
nc_vuong_9:[{k:"hh",h:"Một cánh quân bị phục ở hẻm núi, và cả triều muốn đổ lỗi cho người cố quốc trong cung. Trung cung đã sai người đến hỏi. {call} thưa với Hoàng hậu giúp {me}: một phi tần ở hậu cung không thể vẽ đường cho giặc.",
 o:[["Thỉnh an Hoàng hậu, đỡ lời cho nàng","Hoàng hậu cho rằng ngươi bênh kẻ có thể có tội"],["Dâng lễ Khôn Ninh cung thay lời","lễ bị trả về, người ta bàn ngươi cùng phe với nàng"]]}],
nc_vuong_10:[{k:"do",h:"Hoàng thượng nói lần này ngài nghe {me}, và chỉ nghe một lần. Trước khi nói, {me} cần biết các quan đang nghiêng về đâu: chia đôi cố quốc, hay dẹp hẳn phe kia. Nghe nói {B} cũng đang dò chuyện này. {Call} có tai mắt ở tiền triều không?",
 o:[["Sai người dò ý các quan","người của ngươi bị bắt gặp nghe lén ở tiền triều"],["Tự hỏi chuyện những người có cha anh làm quan","ngươi hỏi nhiều quá, bị đồn là dò việc triều"]]}],
/* ---------- td · Con gái tội thần ---------- */
/* td_an «Lật lại án cũ» */
td_an_5:[{k:"do",h:"Bản sớ gốc vu cha {me} năm ấy vẫn nằm trong kho Nội các, ấn Binh bộ trên đó là ấn giả. {Me} cần biết thái giám nào đang giữ chìa khóa kho, và hắn có ăn bạc của {B} không.",
 o:[["Sai người dò thái giám giữ kho","người của ngươi bị bắt gặp quanh kho Nội các"],["Tự hỏi chuyện các thái giám Nội các","ngươi bị nghi là tai mắt của nhà tội thần"]]}],
td_an_6:[{k:"thu",h:"Thư lại già ở Hình bộ ba tháng nữa phải đi biên viễn. Ông là người cuối cùng còn nhớ án nhà {me}. {Me} cần một người ra ngoài chép lời ông, trước khi ông lên đường.",
 o:[["Bỏ bạc nhờ thái giám ra gặp thư lại","thái giám bị Hình bộ để ý, lời chép bị thu"],["Nhờ người nhà mình đến chép lời ông","người nhà ngươi bị nhà kia ghi tên"]]}],
td_an_7:[{k:"do",h:"Nhà kẻ thù đã biết {me} đang gom chứng cứ. Họ không ra tay ngoài sáng, mà qua {B} và qua những người còn nợ ơn họ. {call} giúp {me} biết ai trong cung đang nhận lệnh của họ.",
 o:[["Sai người dò những người quanh {B}","người của ngươi bị bắt gặp, nàng ta biết ngươi giúp nàng"],["Tự để mắt trong các buổi thỉnh an","ngươi hỏi lộ ý, bị nghi là cùng một phe"]]}],
td_an_8:[{k:"emp",h:"Hoàng thượng có hỏi nhỏ {me} một câu về án cũ, rồi im. {Me} không đoán được ý ngài. Lúc {call} hầu ngài, xin dò giúp ngài có muốn nghe chuyện ấy nữa không, trước khi sổ cũ bị đốt theo lệ.",
 o:[["Nhân lúc hầu giá, khéo nhắc đến án cũ","Hoàng thượng phật ý, bảo án của tiên đế không ai được bàn"],["Dâng lễ nhờ người thân cận dò ý ngài","người thân cận đem chuyện ra kể, cả cung biết"]]}],
td_an_9:[{k:"th",h:"Tờ sớ xin xét lại án đã soạn xong. Án do tiên đế phê, xin xét lại là chạm đến chữ hiếu. Nếu Thái hậu không phật lòng, Hoàng thượng sẽ dễ gật đầu. {call} hầu Thái hậu, xin dọn đường giúp {me}.",
 o:[["Hầu Thái hậu, kể nỗi oan nhà nàng","Thái hậu cho rằng ngươi khơi lại chuyện của tiên đế"],["Dâng Thái hậu kinh chép tay, kèm lời xin","Thái hậu nhận kinh mà nghi ngươi có ý khác"]]}],
td_an_10:[{k:"thu",h:"Ba nha môn xử án đã ngồi xét, mà phi tần không được ra công đường. Mọi lời của {me} chỉ đến được tay các quan qua giấy. {Me} cần một người đưa tờ khai này đến tay vị Ngự sử còn ngay thẳng.",
 o:[["Bỏ bạc nhờ thái giám đưa tờ khai","tờ khai bị chặn giữa đường, nhà kia đọc trước"],["Gửi theo người nhà mình ra ngoài","người nhà bị hỏi vì sao dính vào án tội thần"]]}],
/* td_ke «Kẻ đứng sau màn» */
td_ke_5:[{k:"do",h:"Năm ấy kẻ vu cha {me} không có đủ bạc để mua thợ giả ấn. Bạc ấy đi qua một hiệu cầm đồ ở cửa Tây. {Me} cần biết người đến lấy bạc có dính đến nhà {B} không, trước khi sổ của hiệu bị đốt.",
 o:[["Sai người đến hiệu cầm đồ dò sổ","chủ hiệu nhận bạc của ngươi, rồi báo cho kẻ kia"],["Tự hỏi chuyện người hầu từng làm ở hiệu ấy","ngươi bị đồn lần theo chuyện bạc của nhà quan"]]}],
td_ke_6:[{k:"y",h:"Kẻ cầm dao năm xưa đang nằm trong ngục, và có người muốn hắn chết trước khi khai. {Me} hận hắn, nhưng {me} cần hắn sống. {Call} có quen vị thái y nào chịu vào xem cơm thuốc của hắn không?",
 o:[["Mời thái y quen vào ngục xem mạch","Thái y viện ghi tên ngươi là người lo cho phạm nhân"],["Tự sắc thuốc giải gửi vào ngục","thuốc bị đổi giữa đường, ngươi bị nghi"]]}],
td_ke_7:[{k:"che",h:"Trong cung {me} đã có người bị mua, {me} không biết còn tin được ai. Chỉ có Tiểu Hà là theo {me} từ nhà. {call} cho Tiểu Hà sang ở nhờ ít hôm, đến khi {me} biết ai là tai mắt.",
 o:[["Cho Tiểu Hà ở nhờ cung mình","người ta bàn ngươi chứa người của nhà tội thần"],["Bỏ bạc lo cho Tiểu Hà một chỗ ở khác","chỗ ấy không kín, kẻ kia tìm ra Tiểu Hà"]]}],
td_ke_8:[{k:"thu",h:"Một người như hắn không chỉ hại nhà {me}. Có một phu nhân ngoài kinh cũng mang thù với hắn. {Me} muốn gửi một lá thư cho bà, mà không để ai trong cung biết hai nhà đã nói chuyện.",
 o:[["Bỏ bạc nhờ thái giám đưa thư ra phủ bà","thư bị đọc trộm, kẻ kia biết có người kết bè"],["Gửi thư theo người nhà mình","người nhà ngươi bị kéo vào mối thù của người khác"]]}],
td_ke_9:[{k:"emp",h:"Cái bẫy đã giăng, chỉ cần Hoàng thượng có mặt đúng lúc kẻ đứng sau ra tay. {Me} không có cách giữ chân ngài. {call} xin ngài đến Ngự hoa viên vào đúng buổi bẫy sập, đừng hỏi vì sao.",
 o:[["Mời Hoàng thượng dạo vườn vào giờ ấy","Hoàng thượng thấy ngươi bày chuyện, ngài phật ý"],["Dâng lễ nhờ thái giám hầu giá dẫn đường","thái giám lỡ lời, kẻ kia biết có bẫy"]]}],
td_ke_10:[{k:"hh",h:"Người làm chứng của {me} đã có, chỉ thiếu một lời cho phép vào cung khai. Trung cung nói được câu ấy. {call} thưa với Hoàng hậu giúp {me}, trước buổi triều hội đầu xuân.",
 o:[["Thỉnh an Hoàng hậu, xin cho người làm chứng vào","Hoàng hậu cho rằng ngươi kéo hậu cung vào việc triều"],["Dâng Khôn Ninh cung một lễ, xin cho người làm chứng","lễ bị trả về, kẻ kia nghe tin trước"]]}],
/* td_song «Người em còn sống» */
td_song_5:[{k:"do",h:"Chuyện tiểu đệ của {me} còn sống đã lọt ra ngoài. {Me} sợ người của {B} đã nghe, chỉ biết nhà kia sợ nhất là con trai nhà bị hại lớn lên. {call} giúp {me} biết tin ấy đã đến tai những ai.",
 o:[["Sai người dò xem tin đã đến đâu","người của ngươi hỏi nhiều quá, tin càng lan"],["Tự hỏi chuyện trong các buổi trà","ngươi bị đồn biết chuyện nhà tội thần"]]}],
td_song_6:[{k:"thu",h:"Có kẻ đang săn thư của cung {me} để đem bán. Một chữ lọt ra là tiểu đệ của {me} mất mạng. {call} cho thư của {me} đi theo đường của cung {call} một lần này thôi.",
 o:[["Nhờ thái giám của mình mang thư ra biên","thư bị chặn, tên ngươi dính vào"],["Gửi thư theo người nhà mình đi buôn ở biên","người nhà bị khám, thư bị lộ"]]}],
td_song_7:[{k:"emp",h:"Có lời đồn sắp đến tai Hoàng thượng: con trai tội thần kết bè trong quân. Nếu Hoàng thượng hỏi {call} có biết gì không, xin đừng nói thêm một chữ. {Me} chỉ xin sự im lặng ấy.",
 o:[["Khi hầu giá, lựa lời lảng sang chuyện khác","Hoàng thượng thấy ngươi giấu, ngài nghi cả ngươi"],["Dâng lễ nhờ người thân cận chặn lời đồn","lời đồn không chặn được, ngươi mang tiếng che chở"]]}],
td_song_8:[{k:"y",h:"Tiểu đệ của {me} trúng tên vào vai, quân y nói không sớm có thuốc tốt thì mất cánh tay. Thuốc ấy chỉ Thái y viện có. {Call} có quen thái y nào cắt giúp {me} một hộp cao không?",
 o:[["Mời thái y quen cắt thuốc, trả công hậu","Thái y viện ghi tên ngươi lấy thuốc trị thương"],["Tự sắc cao thuốc gửi ra biên","thuốc không hợp, nàng trách ngươi"]]}],
td_song_9:[{k:"thu",h:"Hộ bộ sắp tra lại sổ hộ tịch. Tiểu đệ của {me} cần một tờ hộ tịch mới, dưới một cái họ không ai nhớ. Nếu nhà {call} có người quen ở huyện, {me} chỉ cần một lời nhắn.",
 o:[["Bỏ bạc nhờ thái giám lo tờ hộ tịch","tờ hộ tịch bị nghi, Hộ bộ cho người tra"],["Nhờ người nhà mình hỏi ở huyện","nhà ngươi bị kéo vào chuyện làm giả sổ"]]}],
td_song_10:[{k:"emp",h:"Các doanh biên đang đổi phiên, có thể xin cho tiểu đệ của {me} về cấm quân ở kinh. Gần {me}, cũng gần nhà kia. {Me} muốn {call} nói với Hoàng thượng một lời, để ngài tự quyết tiểu đệ của {me} đứng ở đâu.",
 o:[["Nhân lúc hầu giá, nhắc đến người lính trẻ ấy","Hoàng thượng hỏi sao ngươi biết rõ một lính biên"],["Dâng lễ nhờ người bên Binh bộ nói giúp","lễ lọt đến tai nhà kia"]]}],
/* td_tha «Thù hay tha» */
td_tha_5:[{k:"hh",h:"Trung cung sắp hỏi chuyện con búp bê trù ếm. Cả cung chờ xem {me} nói gì về con gái nhà đã hại nhà {me}. {Me} chỉ muốn nói thật. {call} xin Hoàng hậu cho {me} được nói sau cùng.",
 o:[["Thỉnh an Hoàng hậu, xin cho nàng nói sau cùng","Hoàng hậu cho rằng ngươi sắp xếp lời khai"],["Gửi lễ vào Khôn Ninh cung, xin một lời công bằng","lễ bị trả về, người ta bàn ngươi chạy án"]]}],
td_tha_6:[{k:"do",h:"Nhà {B} đang dâng sớ hặc nhà kia, và họ mời {me} chung tay. {Me} chưa trả lời. {call} giúp {me} biết trong tờ sớ ấy họ còn định kéo những ai xuống theo.",
 o:[["Sai người dò bản sớ của nhà {B}","người của ngươi bị bắt gặp, nhà ấy ghi mối hận"],["Tự hỏi chuyện người hầu của {B}","ngươi bị nghi là người của nhà kia"]]}],
td_tha_7:[{k:"che",h:"Con gái nhà kia nhắn muốn gặp {me}. Gặp ở cung {me} thì cả cung biết, gặp ở cung nàng ta thì {me} không dám. {call} cho mượn một gian phòng sau cung {call} trong một buổi tối.",
 o:[["Cho mượn một gian trong cung mình","người ta bàn cung ngươi là chỗ kết bè"],["Bỏ bạc lo một chỗ kín ở nơi khác","chỗ ấy không kín, có người nghe trộm"]]}],
td_tha_8:[{k:"thu",h:"Người của nhà kia đến đưa lời: trả ruộng hương hỏa, thêm một rương bạc, đổi lấy tờ lời khai. {Me} đã có câu trả lời. {call} giúp {me} đưa nó ra tay người đưa lời, đừng để ai đọc trước.",
 o:[["Nhờ thái giám của mình đưa thư trả lời","thư bị đọc trước, cả cung biết chuyện mặc cả"],["Gửi thư trả lời theo người nhà mình","người nhà bị kéo vào chuyện mua bán lời khai"]]}],
td_tha_9:[{k:"che",h:"Đêm giỗ cha mẹ {me}, con gái nhà kia xin đến thắp một nén hương. Mà {B} có tai mắt khắp nơi. {call} cho người của {call} sang canh cửa giúp {me} một đêm.",
 o:[["Cho cung nữ của mình sang canh cửa","cung nữ của ngươi bị người của nàng ta bắt chuyện, lộ ra"],["Bỏ bạc nhờ người khác canh giúp","người được nhờ lại là người của nàng ta"]]}],
td_tha_10:[{k:"emp",h:"Nhà kia tâu {me} là con gái tội thần đổi tên vào cung, tội khi quân. {Me} không chối thân thế. {Me} chỉ xin {call} nói với Hoàng thượng: người vào cung là {me}, chứ không phải tội của cha.",
 o:[["Hầu Hoàng thượng, xin ngài xét người chứ đừng xét họ","Hoàng thượng phật ý, cho rằng ngươi bênh kẻ khi quân"],["Dâng lễ nhờ người thân cận nói đỡ","người thân cận cũng sợ, đem lễ trả về"]]}],
/* ---------- ch · Cháu gái Thái hậu ---------- */
/* ch_co «Quân cờ của cô mẫu» */
ch_co_5:[{k:"th",h:"Cô mẫu muốn {me} làm tai mắt cho Đức Thọ cung, mà trong danh sách có cả cung {call}. {Me} không muốn. Xin {call} theo {me} đến thỉnh an cô mẫu một buổi, để {me} có chuyện vô hại mà thưa.",
 o:[["Cùng nàng đến hầu Thái hậu một buổi","Thái hậu nghi ngươi biết chuyện danh sách"],["Dâng Thái hậu một lễ, xin cho nàng ở lại cung mình","Thái hậu cho là ngươi giành người của bà"]]}],
ch_co_6:[{k:"do",h:"Một trang trong sổ của Đức Thọ cung biến mất, mấy tai mắt của cô mẫu bị lộ tên. {Me} sẽ bị hỏi trước tiên. {call} giúp {me} biết có phải người của {B} đã cầm trang sổ ấy không.",
 o:[["Sai người dò ai cầm trang sổ","người của ngươi bị chính tai mắt kia nhận ra"],["Tự hỏi chuyện các cung nữ Đức Thọ cung","ngươi bị nghi là người lấy trang sổ"]]}],
ch_co_7:[{k:"emp",h:"Cùng một ngày, cô mẫu nhờ {me} một việc, Hoàng thượng nhờ {me} một việc, mà hai việc ngược nhau. {Me} không muốn ngài nghĩ {me} là người của Đức Thọ cung. {call} nói với ngài giúp: {me} vẫn ở bên ngài.",
 o:[["Nhân lúc hầu giá, nói rằng nàng không hai lòng","Hoàng thượng hỏi sao ngươi rành chuyện Đức Thọ cung"],["Dâng lễ nhờ người thân cận nói giúp","người thân cận đem lời kể cho Thái hậu"]]}],
ch_co_8:[{k:"do",h:"Cô mẫu bảo {me} ra tay với {B}. {Me} không làm. Nhưng nếu {me} không làm, sẽ có người khác làm. {call} giúp {me} biết cô mẫu còn giao việc ấy cho ai.",
 o:[["Sai người dò những ai ra vào Đức Thọ cung","người của ngươi bị Thái hậu để ý"],["Tự hỏi chuyện những người thân với {B}","ngươi hỏi lộ ý, nàng ta nghi ngươi"]]}],
ch_co_9:[{k:"th",h:"{Me} đã từ chối cô mẫu. Đức Thọ cung sẽ coi {me} như người dưng, hoặc tệ hơn. {call} vào hầu, xin nói đỡ một lời: {me} không phản bà, {me} chỉ không làm được việc ấy.",
 o:[["Hầu Thái hậu, nói đỡ cho nàng","Thái hậu cho rằng ngươi xui nàng cãi lời"],["Dâng Thái hậu một lễ thay lời nàng","Thái hậu trả lễ, từ đó để bụng ngươi"]]}],
ch_co_10:[{k:"hh",h:"Thọ yến Đức Thọ cung, chỗ của {me} xếp ngay cạnh cô mẫu. Ai nhìn vào cũng thấy {me} là quân cờ. {call} thưa với Hoàng hậu giúp, cho {me} ngồi chỗ khác.",
 o:[["Thỉnh an Hoàng hậu, xin đổi chỗ cho nàng","Hoàng hậu không muốn chạm đến Đức Thọ cung, trách ngươi"],["Dâng lễ nhờ ma ma Khôn Ninh cung xếp lại chỗ ngồi","lễ bị trả về, chuyện đến tai Thái hậu"]]}],
/* ch_benh «Thái hậu lâm bệnh» */
ch_benh_5:[{k:"y",h:"Thái y viện kê một phương, lương y ngoài cung kê một phương khác. Cô mẫu chỉ uống được một. {Me} cần một vị thái y kín miệng xem giúp phương nào đúng, mà không để viện biết {me} hỏi.",
 o:[["Mời thái y quen xem hai phương, trả công hậu","Thái y viện biết ngươi nghi thuốc của viện"],["Tự đọc sách thuốc, so hai phương","ngươi hiểu sai một vị, nàng trách ngươi"]]}],
ch_benh_6:[{k:"do",h:"Cô mẫu vừa lâm bệnh, đã có người đổi chỗ dựa. {Me} muốn biết những ai đang lui tới cung {B} nhiều hơn trước. Nếu {call} có tai mắt, xin giúp {me} một lần.",
 o:[["Sai người đếm xem ai đổi chỗ dựa","người của ngươi bị bắt gặp, cả cung đồn ngươi rình"],["Tự để ý xem ai vắng mặt ở Đức Thọ cung","ngươi bị nghi là người của Đức Thọ cung"]]}],
ch_benh_7:[{k:"che",h:"Chén thuốc của cô mẫu có vị lạ. {Me} đã giữ lại chút bã. Để trong cung {me} thì người ta sẽ nói {me} bày chuyện. {call} cất giùm, đến khi có người nghiệm.",
 o:[["Cất bã thuốc trong cung mình","người ta bàn ngươi giữ vật chứng của chuyện lớn"],["Bỏ bạc gửi bã thuốc ra ngoài cho người nghiệm","người mang đi bị chặn, bã thuốc mất"]]}],
ch_benh_8:[{k:"th",h:"Cô mẫu không cho {me} rời giường bệnh, đã bảy đêm {me} không chợp mắt. {Me} không dám xin ai thay. Chỉ có {call} là cô mẫu không chê. Một đêm thôi.",
 o:[["Vào Đức Thọ cung hầu thay nàng một đêm","Thái hậu trở mình, trách ngươi hầu vụng"],["Dâng sâm quý thay lời thăm hỏi","Thái hậu cho là ngươi lấy sâm thay người"]]}],
ch_benh_9:[{k:"thu",h:"Bệnh của cô mẫu trở nặng, Thái y viện nói còn thiếu một vị thuốc chỉ có ở hiệu thuốc phương nam. {Me} có bạc. {Me} chỉ cần người mang được thư ra ngoài, mà không qua sổ của Nội vụ phủ.",
 o:[["Bỏ bạc nhờ thái giám mang thư ra hiệu thuốc","thư bị chặn, người ta đồn Đức Thọ cung sắp có biến"],["Gửi thư theo người nhà mình ra hiệu thuốc","người nhà về muộn, thuốc lỡ mấy ngày"]]}],
ch_benh_10:[{k:"emp",h:"Thái y viện nói bệnh cô mẫu đã đến hồi nguy kịch. Cô mẫu cứ hỏi đến Hoàng thượng, mà {me} không dám tự đi mời. Nếu {call} gặp được ngài, xin mời ngài đến Đức Thọ cung, dù chỉ một khắc.",
 o:[["Hầu Hoàng thượng, xin ngài đến thăm Thái hậu","Hoàng thượng mệt mỏi, phật ý vì bị giục"],["Dâng lễ nhờ thái giám hầu giá nhắc ngài","thái giám nhắc sai giờ, ngài đến muộn"]]}],
/* ch_ho «Hai người cháu» */
ch_ho_5:[{k:"hh",h:"Ở Đức Thọ cung, cháu nào được gọi vào trước là cả cung nhìn vào, mà cô mẫu hay theo thứ tự thỉnh an ở Khôn Ninh cung. {call} xin Hoàng hậu cho {me} được đứng theo ngôi, đừng xếp sau người cháu kia.",
 o:[["Thỉnh an Hoàng hậu, hỏi chuyện thứ tự","Hoàng hậu cho rằng ngươi khơi chuyện tranh giành"],["Dâng lễ Khôn Ninh cung, nhờ ma ma hỏi giúp","ma ma đem chuyện kể với người kia"]]}],
ch_ho_6:[{k:"che",h:"Lễ mừng thọ cô mẫu sắp đến, mà người cháu kia đã đặt một bức bình phong thêu. {Me} không muốn thua. Nếu bên {call} có cung nữ thêu giỏi, xin cho {me} mượn mười hôm.",
 o:[["Cho cung nữ của mình sang thêu giúp","việc trong cung ngươi bỏ dở mười hôm"],["Bỏ bạc mua tấm thêu ở Chức tạo","người kia biết ngươi bỏ bạc giúp, ghi mối hận"]]}],
ch_ho_7:[{k:"th",h:"Có người gièm với cô mẫu rằng {me} mong bà sớm khuất để được ngồi ghế trên. Lời ấy độc lắm. {call} đến Đức Thọ cung, xin nói đỡ cho {me} một câu.",
 o:[["Hầu Thái hậu một buổi, gỡ lời gièm cho nàng","Thái hậu chê ngươi lắm lời"],["Dâng Thái hậu một lễ thay lời","Thái hậu cho là ngươi mua lòng"]]}],
ch_ho_8:[{k:"thu",h:"Các trưởng bối họ ngoại sắp họp ở phủ Quốc cữu để chọn một người cháu trong cung. {Me} không ra khỏi cung được. {call} giúp {me} gửi một lá thư đến tay phụ thân trước buổi họp.",
 o:[["Nhờ thái giám của mình mang thư ra phủ","thư đến tay người của bên kia trước"],["Gửi thư theo người nhà mình đến phủ Quốc cữu","người nhà ngươi bị kéo vào chuyện của họ ngoại"]]}],
ch_ho_9:[{k:"thu",h:"Ngự sử đài hặc họ ngoại chuyên quyền, nêu tên cả phủ Quốc cữu lẫn nhà người cháu kia. {Me} cần biết tờ sớ nói những gì, để biết nên đứng chung hay đứng riêng.",
 o:[["Bỏ bạc nhờ thái giám hỏi chép bản sớ","bản chép bị bắt, người ta đồn hậu cung dòm việc triều"],["Nhờ người nhà mình hỏi bản sớ ở Ngự sử đài","nhà ngươi bị kể vào phe họ ngoại"]]}],
ch_ho_10:[{k:"th",h:"Cô mẫu muốn {me} ngồi chiếc ghế bên cạnh bà. {Me} không muốn vì chiếc ghế ấy mà bị người cháu kia oán ghét. {call} thưa với cô mẫu giúp, để bà đừng ép.",
 o:[["Hầu Thái hậu, thưa thật lòng nàng","Thái hậu giận, bảo ngươi xen vào chuyện họ nhà bà"],["Dâng Thái hậu một lễ, xin bà nghĩ lại","Thái hậu trả lễ, nàng mất lòng cô mẫu"]]}],
/* ch_bi «Bí mật năm xưa» */
ch_bi_5:[{k:"do",h:"Bản sao lá thư cũ của cô mẫu đã đến tay Hoàng thượng một lần. Kẻ dâng thư chỉ là người bị sai đi. {Me} cần biết có phải người của {B} đã đem thư vào cung, trước khi có bản thứ hai.",
 o:[["Sai người dò đường thư vào cung","người của ngươi bị bắt gặp, cả cung đồn có thư lạ"],["Tự hỏi chuyện những người gác cửa cung","ngươi bị nghi là người biết chuyện năm xưa"]]}],
ch_bi_6:[{k:"thu",h:"Có một người cháu nhà họ Lâm nay làm ở Hàn lâm viện, gửi vào một lời hăm dọa. {Me} muốn viết cho hắn trước, nói rằng còn có đường khác. {call} giúp {me} đưa thư ra.",
 o:[["Nhờ thái giám của mình đưa thư ra Hàn lâm viện","thư bị đọc trộm, chuyện cũ lan thêm một bậc"],["Gửi thư theo người nhà mình đến Hàn lâm viện","người nhà ngươi bị kéo vào bí mật của Đức Thọ cung"]]}],
ch_bi_7:[{k:"th",h:"Cô mẫu gọi {me} đến hỏi chuyện chiếc hộp thư, mà {me} chưa biết nên nói đến đâu. {call} đi cùng {me} một buổi. Có người thứ ba ngồi đó, cô mẫu sẽ hỏi nhẹ hơn.",
 o:[["Cùng nàng đến hầu Thái hậu","Thái hậu không vui vì có người thứ ba nghe chuyện"],["Dâng Thái hậu một lễ, xin hoãn buổi hỏi","Thái hậu cho là ngươi giấu điều gì cho nàng"]]}],
ch_bi_8:[{k:"do",h:"Chiếc hộp gấm đựng bản sao thư biến mất khỏi cung {me}. Ai cầm nó, người ấy cầm Đức Thọ cung trong tay. {Me} nghi người của {B}. {call} giúp {me} dò trước khi nó ra khỏi hậu cung.",
 o:[["Sai người canh các cửa ra vào","người của ngươi bị bắt gặp, nàng ta biết có người lần theo"],["Tự hỏi chuyện cung nữ của {B}","ngươi hỏi lộ ý, nàng ta giấu hộp kỹ hơn"]]}],
ch_bi_9:[{k:"emp",h:"Hoàng thượng đã bắt đầu hỏi về chuyện năm xưa. Nếu ngài hỏi đến {call}, xin {call} chỉ nói điều tận mắt thấy, đừng đoán thêm. Một chữ đoán sai là cô mẫu của {me} không còn đường lui.",
 o:[["Khi hầu giá, chỉ nói điều mình biết chắc","Hoàng thượng thấy ngươi dè dặt, nghi ngươi giấu"],["Dâng lễ nhờ người thân cận lái câu chuyện đi","người thân cận lái vụng, ngài càng để ý"]]}],
ch_bi_10:[{k:"che",h:"Trước tiết Thanh minh, bản sao cuối của lá thư đang ở trong tay {me}. Cung {me} sẽ bị soát nếu có biến. {call} giữ giùm nó ít hôm, đến khi {me} quyết đốt hay dâng.",
 o:[["Giữ lá thư trong cung mình ít hôm","người ta bàn ngươi giữ bí mật của Đức Thọ cung"],["Bỏ bạc gửi lá thư ra một chỗ kín","chỗ ấy không kín, có người mở xem"]]}],
/* ---------- thd · Con gái thầy đồ nghèo ---------- */
/* thd_tho «Danh hiệu Tài nữ» */
thd_tho_5:[{k:"thu",h:"Hàn lâm viện mở kỳ Xuân thí, mà người giữ danh sách dự thí lại là chú của {B}. Tên {me} có thể biến mất trước khi ai đọc đến thơ. {Me} cần thơ của {me} đến tay một vị học sĩ khác.",
 o:[["Nhờ thái giám của mình đưa thơ ra Hàn lâm viện","thơ bị giữ lại, người ta bảo ngươi chạy cửa sau"],["Gửi thơ theo người nhà mình","người nhà ngươi bị viện hỏi vì sao lo chuyện thi"]]}],
thd_tho_6:[{k:"do",h:"Tập thơ nháp {me} chép từ thuở ở quê biến mất khỏi án thư. Không có nó, {me} không chứng được bài nào do {me} viết. {call} giúp {me} hỏi xem đêm ấy người của {B} có vào phòng không.",
 o:[["Sai người hỏi những người trực đêm","người của ngươi bị bắt gặp, kẻ lấy tập thơ giấu kỹ hơn"],["Tự hỏi chuyện cung nữ của nàng","ngươi hỏi lộ ý, cả cung đồn tập thơ có chuyện"]]}],
thd_tho_7:[{k:"emp",h:"Vòng thi ở Ngự hoa viên, một nén hương một bài. Hoàng thượng ngồi trên, chưa chắc nghe hết. Nếu {call} ngồi gần ngài, chỉ cần khi đến bài của {me}, khẽ nhắc ngài lắng tai.",
 o:[["Ngồi hầu, khẽ nhắc ngài nghe bài ấy","Hoàng thượng thấy ngươi thiên vị, ngài phật ý"],["Dâng lễ nhờ thái giám hầu giá nhắc giúp","thái giám nhắc sai bài, chuyện thành trò cười"]]}],
thd_tho_8:[{k:"hh",h:"Người ta tố {me} đạo thơ, chứng là mấy trang chép tay đề ngày ba năm trước. Trung cung sẽ hỏi chuyện này. {Me} chỉ xin {call} thưa với Hoàng hậu cho người soi lại giấy và mực của mấy trang ấy.",
 o:[["Thỉnh an Hoàng hậu, xin soi lại giấy mực mấy trang ấy","Hoàng hậu cho rằng ngươi bênh người bị tố đạo thơ"],["Dâng lễ nhờ nữ quan Trung cung xin soi giấy","lễ bị trả về, người ta bảo ngươi chạy tội cho nàng"]]}],
thd_tho_9:[{k:"thu",h:"Hàn lâm viện cho {me} nộp chứng qua tay thái giám Ngự thư phòng. Thư của cha {me} còn nằm ở quê. {Me} cần một người ra ngoài, mang thư về kịp trước ngày yết bảng.",
 o:[["Bỏ bạc nhờ thái giám ra quê lấy thư","thái giám về muộn, bảng đã gần yết"],["Nhờ người nhà mình về quê lấy giúp","người nhà ngươi bị nhà kia chặn đường"]]}],
thd_tho_10:[{k:"do",h:"Bảng Xuân thí sắp dán. {Me} nghe nói {B} đã sai người đến nhà các học sĩ chấm thơ. {call} giúp {me} biết nàng ta đã đến những nhà nào.",
 o:[["Sai người theo dấu đám người hầu của {B}","người của ngươi bị bắt gặp, nàng ta biết ngươi đứng về phía nàng"],["Tự hỏi chuyện các phi tần có cha anh ở Hàn lâm","ngươi bị đồn chạy chọt bảng thi"]]}],
/* thd_sach «Bản thảo của cha» */
thd_sach_5:[{k:"che",h:"Cha gửi vào cung quyển hạ của bộ sách, có tên từng người nhận bạc đê điều. Giữ trong cung {me} thì {B} sớm muộn sẽ biết. {call} cất giùm {me}, đến khi {me} quyết in hay giấu.",
 o:[["Cất quyển sách trong cung mình","người ta bàn ngươi giữ sách gây chuyện"],["Bỏ bạc gửi sách ra một nhà in kín","nhà in không kín, một trang lọt ra phố"]]}],
thd_sach_6:[{k:"do",h:"Ngoài triều có sớ chê sách của cha {me} là lời thầy đồ vu khống. Trong cung, {B} đã bắt đầu ra tay với {me}. {call} giúp {me} biết nàng ta định làm gì tiếp.",
 o:[["Sai người dò người hầu của {B}","người của ngươi bị bắt gặp, nàng ta ghi mối hận"],["Tự để ý trong những buổi trà","ngươi hỏi nhiều, nàng ta biết ngươi giúp nàng"]]}],
thd_sach_7:[{k:"thu",h:"Trường làng của cha {me} bị đốt một góc, trước cổng có giấy dọa. Cha không chịu rời làng. {Me} cần người mang bạc và thư về, nhờ người trong làng canh cha mấy phiên chợ.",
 o:[["Bỏ bạc nhờ thái giám mang thư về làng","thư đến muộn, kẻ dọa đã quay lại"],["Gửi thư theo người nhà mình về quê","người nhà ngươi bị kẻ dọa để ý"]]}],
thd_sach_8:[{k:"che",h:"Kinh diên mùa thu là dịp dâng trọn bộ sách lên ngự lãm. Bản dâng phải chép sạch, đóng bìa đúng phép, mà {me} chỉ có hai bàn tay. Nếu bên {call} có người biết chữ, xin cho {me} mượn mấy hôm.",
 o:[["Cho người hầu biết chữ của mình sang chép giúp","người hầu chép sai mấy chữ, phải chép lại"],["Bỏ bạc thuê thợ đóng sách ngoài cung","thợ ngoài cung đem bản thảo đi khoe"]]}],
thd_sach_9:[{k:"emp",h:"Người ta cắt nửa câu trong sách của cha {me}, đọc thành lời chê vua. Câu đầy đủ là lời khen ngài. Lúc {call} hầu ngài, xin đọc cho ngài nghe trọn câu ấy, một lần thôi.",
 o:[["Nhân lúc hầu giá, đọc trọn câu cho ngài nghe","Hoàng thượng phật ý, bảo ngươi biện hộ cho kẻ phỉ báng"],["Dâng lễ nhờ học sĩ hầu kinh diên giảng giúp","học sĩ sợ liên lụy, giảng nửa chừng"]]}],
thd_sach_10:[{k:"th",h:"Ngày xét án, cha {me} phải quỳ dưới thềm Cần Chánh điện. Trước ngày ấy {me} chỉ được nói một lời với Hoàng thượng. Nếu Thái hậu nhắc trước rằng thầy đồ già ấy vô hại, lời của {me} sẽ nặng hơn.",
 o:[["Hầu Thái hậu, xin bà nhắc một lời","Thái hậu cho rằng ngươi kéo bà vào việc triều"],["Dâng Thái hậu một lễ thay lời xin","Thái hậu nhận lễ mà không nói gì"]]}],
/* thd_tro «Học trò của cha» */
thd_tro_5:[{k:"do",h:"Đề thi Hương được rao ở chợ sách trước ngày thi. Có kẻ trong bộ Lễ chép đề ra ngoài. Học trò của cha {me} là người đầu tiên thấy. {call} giúp {me} biết kẻ ấy có quen nhà {B} không, trước kỳ thi tới.",
 o:[["Sai người dò ở chợ sách","người của ngươi bị kẻ bán đề nhận ra"],["Tự hỏi chuyện các phi tần có cha anh ở bộ Lễ","ngươi bị đồn dòm ngó chuyện khoa cử"]]}],
thd_tro_6:[{k:"thu",h:"Đề bị bán không chỉ một khoa. Khoa trước có một người đỗ Tiến sĩ, là biểu huynh của một phi tần trong cung. {Me} cần biết bảng vàng năm ấy ai chấm, mà {me} không thể tự hỏi.",
 o:[["Nhờ thái giám của mình hỏi sổ chấm thi","sổ chấm bị giấu, người hỏi bị ghi tên"],["Nhờ người nhà mình hỏi chuyện khoa trước","nhà ngươi bị nhà ngoại của nàng ta ghi mối hận"]]}],
thd_tro_7:[{k:"che",h:"Học trò của cha {me} bị vu đánh người ở tửu lâu, phủ Thuận Thiên phát trát bắt. Vào ngục thì một học trò nghèo có thể chết trước khi được xét. {call} có chỗ nào cho cậu ấy trú mấy hôm không?",
 o:[["Cho người của mình đưa cậu ấy về trú ở nhà mình","người ta bàn nhà ngươi chứa kẻ bị truy"],["Bỏ bạc lo một chỗ trốn ngoài kinh","chỗ ấy không kín, nha dịch tìm đến"]]}],
thd_tro_8:[{k:"emp",h:"Sĩ tử khắp kinh ký hơn trăm tên vào một lá đơn kêu oan, mà đơn không qua được cửa bộ Lễ. Con đường còn lại là qua hậu cung. {Me} không dám tự dâng. Nếu có dịp hầu ngài, xin {call} cho lá đơn ấy đến được ngự án.",
 o:[["Nhân lúc hầu giá, dâng lá đơn lên ngài","Hoàng thượng phật ý vì hậu cung xen vào khoa cử"],["Dâng lễ nhờ thái giám Ngự thư phòng đặt đơn lên án","thái giám để đơn dưới chồng sớ, ngài không đọc"]]}],
thd_tro_9:[{k:"do",h:"Một thư lại bộ Lễ treo cổ trong đêm, ai cũng nói là tự vẫn. {Me} không tin. Nhà ngoại của {B} đang chạy khắp các cửa quan. {call} giúp {me} biết đêm ấy ai đã đến gặp ông.",
 o:[["Sai người hỏi những người gác đêm","người của ngươi bị nhà kia để ý"],["Tự hỏi chuyện người hầu có quen nhà thư lại","ngươi bị đồn nghe chuyện ma"]]}],
thd_tro_10:[{k:"emp",h:"Hoàng thượng cho thi lại ngay trong điện, học trò của cha {me} cũng được gọi. Cậu ấy chỉ sợ đề bị lái về phía có lợi cho người khác. {call} xin ngài tự ra đề, đừng để ai khác cầm bút.",
 o:[["Nhân lúc hầu giá, xin ngài tự ra đề","Hoàng thượng hỏi ngươi nghi ai, ngài không vui"],["Dâng lễ nhờ người thân cận nhắc ngài","người thân cận nói lộ, quan chấm thi biết"]]}],
/* thd_hoc «Thầy giáo trong cung» */
thd_hoc_5:[{k:"che",h:"Một hoàng tự nhỏ trốn học sang chơi ở cung {call}. Đưa về ngay thì cậu bé bị phạt, mà để mãi thì {me} mang tiếng không dạy nổi. {call} giữ cậu bé lại nửa buổi, để {me} đến dỗ.",
 o:[["Giữ đứa trẻ lại cung mình nửa buổi","người ta bàn ngươi giữ hoàng tự của người khác"],["Bỏ bạc nhờ ma ma Thượng thư phòng trông giúp","ma ma kể lại với mẹ đứa trẻ"]]}],
thd_hoc_6:[{k:"do",h:"{B} tin rằng {me} thiên vị mấy thư đồng con nhà quan. Một người mẹ trong cung có thể làm nhiều hơn một lời than. {call} giúp {me} biết nàng ta đã nói gì với ai.",
 o:[["Sai người dò những lời {B} nói","người của ngươi bị bắt gặp, nàng ta càng nghi"],["Tự hỏi chuyện các ma ma Thượng thư phòng","ngươi hỏi lộ ý, mấy ma ma đem chuyện kể lại"]]}],
thd_hoc_7:[{k:"emp",h:"Kỳ khảo hạch này Hoàng thượng sẽ đến khảo bài các hoàng tự nhỏ. Có một đứa trẻ học rất giỏi mà nhút nhát, đứng trước ngài là quên hết chữ {me} dạy. {call} xin ngài hỏi cậu bé sau cùng, khi cậu đã bớt sợ.",
 o:[["Hầu Hoàng thượng, xin ngài đổi thứ tự hỏi bài","Hoàng thượng cho rằng ngươi xếp đặt việc học của hoàng tự"],["Dâng lễ nhờ thái giám Thượng thư phòng đổi thứ tự","thái giám đổi lộ, mấy người mẹ khác biết"]]}],
thd_hoc_8:[{k:"hh",h:"Một đứa trẻ bị phạt trong giờ {me} dạy, mẹ nó đã đến Khôn Ninh cung kêu. Phép phạt của thầy là phép, nhưng ra khỏi cửa lớp thì là chuyện khác. {call} thưa với Hoàng hậu giúp {me} một lời.",
 o:[["Thỉnh an Hoàng hậu, đỡ lời cho người thầy","Hoàng hậu cho rằng ngươi bênh người làm đau hoàng tự"],["Dâng lễ Khôn Ninh cung, xin xét cả lời người thầy","lễ bị trả về, mẹ đứa trẻ ghi mối hận"]]}],
thd_hoc_9:[{k:"thu",h:"{Me} dạy bọn trẻ một câu của Mạnh Tử, nay câu ấy bị đọc lại trước mặt Hoàng thượng như một lời ngông. Nếu nhà {call} quen một bậc đại nho, một bài giải của bậc thầy ngoài cung sẽ gỡ được chuyện này.",
 o:[["Nhờ thái giám của mình xin bài giải ở ngoài","bài giải đến muộn, chuyện đã lan ra triều"],["Nhờ người nhà mình xin chữ một vị đại nho","người nhà ngươi bị kéo vào chuyện chữ nghĩa"]]}],
thd_hoc_10:[{k:"th",h:"Năm học khép lại, Hoàng thượng muốn nghe {me} nói đứa trẻ nào gánh được việc lớn. Một câu của {me} có thể định chỗ đứng của từng đứa. Thái hậu thương các hoàng tôn. {call} xin bà hỏi trước, để lời {me} khỏi thành của riêng {me}.",
 o:[["Hầu Thái hậu, xin bà hỏi chuyện các hoàng tôn","Thái hậu cho rằng ngươi muốn bà chọn người kế"],["Dâng Thái hậu một lễ, kể chuyện lớp học","Thái hậu nhận lễ mà nghi ngươi có ý riêng"]]}],
/* ---------- cnv · Cung nữ tuyển vào cung (the asker is a maid; her own mistress may be the player, so no line names her mistress) ---------- */
/* cnv_chu «Bí mật của chủ nhân» */
cnv_chu_5:[{k:"y",h:"Trong cung {me} hầu có một gói xạ hương. Ở Thái y viện, mỗi lạng xạ hương xuất kho đều ghi tên cung nhận. {Me} cần biết gói ấy từ đâu ra. {Call} có quen thái y nào hỏi giúp được không?",
 o:[["Nhờ thái y quen tra sổ xuất kho, trả công hậu","Thái y viện ghi tên ngươi là người hỏi chuyện xạ hương"],["Tự mang một chút thuốc đi hỏi người biết","người được hỏi ngửi ra xạ hương, đem chuyện kể lại"]]}],
cnv_chu_6:[{k:"do",h:"Người của {B} đang dò khắp nơi: ai trực đêm ấy, ai dọn phòng. {Me} giữ kín được lời của {me}, nhưng không giữ được miệng người khác. {call} giúp {me} biết họ đã hỏi những ai.",
 o:[["Sai người theo dấu kẻ dò hỏi","người của ngươi bị chính kẻ dò hỏi nhận ra"],["Tự hỏi chuyện các cung nữ quanh đó","ngươi hỏi lộ ý, người ta đồn có chuyện giấu"]]}],
cnv_chu_7:[{k:"che",h:"Có người đem một chuyện riêng kể với {me}, rồi chờ xem chuyện ấy có lọt ra không. {Me} sợ người khác nói ra mà {me} mang tiếng. {call} cho {me} một việc ở xa chỗ đông người ít hôm.",
 o:[["Cho nàng làm việc ở hậu viện cung mình","người ta bàn ngươi giữ người hầu của chỗ khác"],["Bỏ bạc lo cho nàng một việc ở Nội vụ phủ","Nội vụ phủ hỏi ngược vì sao nàng muốn đi"]]}],
cnv_chu_8:[{k:"che",h:"Nội vụ phủ sắp đến khám cung {me} hầu. Có một chiếc hộp nhỏ không được để ai thấy. {call} giữ giùm {me} đến khi người khám đi khỏi.",
 o:[["Tự giữ chiếc hộp bên mình","người ta bàn ngươi giấu đồ cho cung bị khám"],["Bỏ bạc gửi chiếc hộp ra ngoài","người mang đi bị chặn ở cửa, hộp bị mở"]]}],
cnv_chu_9:[{k:"hh",h:"Trung cung đòi {me} khai. Nói thật thì nỗi khổ chủ của {me} từng chịu sẽ bị phơi ra hết, giữ kín thì {me} phải gánh tội. {call} thưa với Hoàng hậu giúp: {me} chỉ là người dọn phòng, không biết gì hơn.",
 o:[["Thỉnh an Hoàng hậu, nói rằng nàng chỉ dọn phòng","Hoàng hậu hỏi ngược sao ngươi biết nàng không biết gì"],["Dâng lễ nhờ nữ quan Khôn Ninh cung nói giúp","lễ bị trả về, người ta bảo ngươi che giấu"]]}],
cnv_chu_10:[{k:"do",h:"{Me} sắp bị giải đến Thận hình ty. {B} đã khai tên {me} trước, mà ở đó roi vọt chẳng cần biết ai có tội. {Me} không xin thoát. {Me} chỉ xin {call} cho người nói với viên quản sự một câu, để tay roi nhẹ hơn.",
 o:[["Lo lót cho người ở Thận hình ty nương tay","người nhận bạc đem chuyện đi khoe"],["Tự đến hỏi chuyện viên quản sự","ngươi bị ghi tên là người lui tới Thận hình ty"]]}],
/* cnv_ban «Chị em đồng hương» */
cnv_ban_5:[{k:"do",h:"Chiếc vòng ngọc thật vẫn chưa về chỗ cũ. Nó đi đâu, qua tay ai, là biết {B} có dính vào vụ vu Xuân Đào không. {call} giúp {me} hỏi ở mấy hiệu cầm đồ ngoài cửa cung.",
 o:[["Sai người dò các hiệu cầm đồ","chủ hiệu nhận bạc rồi báo cho kẻ kia"],["Tự hỏi chuyện các thái giám ra phố","ngươi bị đồn lo chuyện của kẻ hầu"]]}],
cnv_ban_6:[{k:"che",h:"Thu Cúc muốn khai ai đã sai nàng vu người, nhưng nàng sợ bị bịt miệng. {Me} hứa với nàng sẽ tìm chỗ nương. {call} che chở cho Thu Cúc ít hôm.",
 o:[["Cho Thu Cúc ở nhờ cung mình","người ta bàn ngươi chứa kẻ đã vu người"],["Bỏ bạc lo cho Thu Cúc chỗ ở khác","chỗ ấy không kín, người sai khiến tìm đến"]]}],
cnv_ban_7:[{k:"y",h:"Xuân Đào bị đánh rồi đày xuống Tân Giả khố, vết thương làm mủ, sốt li bì. Không có thuốc sớm thì nàng khó qua khỏi. {Me} không có đường đến Thái y viện. {call} cứu nàng một lần.",
 o:[["Mời thái y quen xuống xem, trả công hậu","Thái y viện ghi tên ngươi lo cho kẻ bị đày"],["Tự sắc thuốc mang xuống","thuốc sắc vụng, Xuân Đào sốt thêm một đêm"]]}],
cnv_ban_8:[{k:"hh",h:"Xuân Đào muốn đứng ra làm chứng chuyện vòng ngọc. Một người bị đày, không ai cho nói, còn lời của {me} thì chẳng ai nghe. {call} thưa với Hoàng hậu giúp, cho nàng được khai trước Trung cung.",
 o:[["Thỉnh an Hoàng hậu, xin cho Xuân Đào được khai","Hoàng hậu cho rằng ngươi khơi chuyện của kẻ hầu"],["Dâng lễ nhờ ma ma Trung cung mở lời cho Xuân Đào","lễ bị trả về, cả cung bàn tán"]]}],
cnv_ban_9:[{k:"che",h:"Bàn phân xử đã bày, Xuân Đào hay Thu Cúc, một người sẽ phải đi. Dù thế nào, Xuân Đào cũng không còn ở lại được. {call} cho nàng về hầu cung {call}, {me} xin chịu mọi tiếng.",
 o:[["Nhận Xuân Đào về hầu cung mình","chủ cũ của Xuân Đào ghi mối hận với ngươi"],["Bỏ bạc lo cho Xuân Đào việc ở cung khác","cung kia nhận bạc mà đối đãi tệ"]]}],
cnv_ban_10:[{k:"do",h:"Sổ ghi đồ lén đưa ra cửa sau đã đến bàn quản sự Nội vụ phủ. Trong sổ có tên mấy thái giám của chính Nội vụ phủ. Nếu sổ bị chôn, {B} sẽ thoát. {call} giúp {me} chép lại một trang trước.",
 o:[["Sai người chép trộm trang sổ","người của ngươi bị bắt khi đang chép"],["Tự đến Nội vụ phủ xin xem sổ","ngươi bị Nội vụ phủ ghi là kẻ dòm sổ"]]}],
/* cnv_mat «Ánh mắt nơi hành lang» */
cnv_mat_5:[{k:"che",h:"Hoàng thượng nhìn {me} một lần ở hành lang, từ đó lòng người trong cung {me} hầu đổi khác. {Me} không dám mong gì. {call} tìm cho {me} một việc khuất mắt ít lâu.",
 o:[["Giao cho nàng việc ở hậu viện cung mình","người ta bàn ngươi giấu người Hoàng thượng để ý"],["Bỏ bạc lo cho nàng việc ở Nội vụ phủ","nàng đi khỏi, lời đồn càng to"]]}],
cnv_mat_6:[{k:"emp",h:"Hoàng thượng đã mấy lần gọi {me} giữa đường. {Me} không dám trái ý ngài, cũng không dám để người ta thấy. {call} khéo nói với ngài, đừng để {me} đứng giữa hai bên.",
 o:[["Nhân lúc hầu giá, khéo nói đỡ cho nàng","Hoàng thượng phật ý vì ngươi xen vào chuyện của ngài"],["Dâng lễ nhờ thái giám hầu giá nói khéo","thái giám nói vụng, ngài càng để ý đến nàng"]]}],
cnv_mat_7:[{k:"do",h:"Tên {me} đã vào sổ Kính sự phòng, mà {me} chưa từng xin. {Me} nghi {B} đã đưa tên lên. {call} giúp {me} biết là ai, và người ấy muốn gì.",
 o:[["Sai người hỏi ở Kính sự phòng","Kính sự phòng báo lên có người dò sổ"],["Tự hỏi chuyện các thái giám quen","ngươi bị đồn lo chuyện thị tẩm của kẻ hầu"]]}],
cnv_mat_8:[{k:"che",h:"Đêm hầu giá đầu tiên đã định, mà {me} không biết một phép nào. Sai một bước là mang tội. {call} cho {me} một vị ma ma biết lễ, chỉ bảo {me} trước đêm ấy.",
 o:[["Tự dạy nàng phép hầu giá","việc trong cung ngươi bỏ dở cả buổi"],["Bỏ bạc mời ma ma Kính sự phòng chỉ bảo","ma ma kể chuyện ra ngoài"]]}],
cnv_mat_9:[{k:"hh",h:"Từ đêm được gọi hầu giá, các cung nữ cùng phòng không ai nói với {me} một câu, có người còn xé áo của {me}. {Me} vẫn là kẻ hầu, chỉ xin được ở yên. {call} thưa với Hoàng hậu giúp, cho {me} đổi sang phòng khác.",
 o:[["Thỉnh an Hoàng hậu, xin đổi phòng cho nàng","Hoàng hậu cho rằng ngươi bênh một cung nữ mới được gọi"],["Dâng lễ nhờ nữ quan Khôn Ninh cung đổi phòng","nữ quan đem chuyện ra làm trò cười"]]}],
cnv_mat_10:[{k:"th",h:"Người ta tìm thấy một gói bùa trong gối của {me}, đồn {me} quyến rũ Hoàng thượng bằng bùa ngải. Thái hậu ghét nhất chuyện ấy. {call} thưa trước với Thái hậu, trước khi lời đồn đến tai bà.",
 o:[["Hầu Thái hậu, thưa trước chuyện gói bùa","Thái hậu cho rằng ngươi dính vào chuyện bùa ngải"],["Dâng Thái hậu một chuỗi tràng hạt, kèm lời thưa","Thái hậu trả lễ, càng nghi"]]}],
/* cnv_ma «Ma ma dạy việc» */
cnv_ma_5:[{k:"che",h:"Lưu ma ma giao {me} việc thật đầu tiên: xếp lại cả kho áo cho kịp kỳ phát áo mùa. Một mình {me} không kịp. {call} cho người sang phụ {me} một tay, {me} không quên.",
 o:[["Cho người của mình sang phụ một tay","người của ngươi xếp sai, ma ma trách cả hai"],["Bỏ bạc thuê thêm người khuân vác","ma ma biết có người làm thay, chê nàng"]]}],
cnv_ma_6:[{k:"do",h:"Sổ ba năm của Nội vụ phủ hụt gần ba trăm lạng bạc gấm vóc, mà dấu ấn trên phiếu xuất là của Phùng cô cô. {Me} cần thêm chứng cứ trước kỳ khóa sổ. {call} giúp {me} xem hàng có đi qua tay {B} không.",
 o:[["Sai người theo dấu mấy tấm gấm","người của ngươi bị Phùng cô cô bắt gặp"],["Tự hỏi chuyện các cung nữ kho gấm","ngươi hỏi lộ ý, Phùng cô cô ra tay trước"]]}],
cnv_ma_7:[{k:"hh",h:"Phùng cô cô tố ngược Lưu ma ma, Thận hình ty đã giải ma ma đi chờ ngày tra. Ma ma đã già, {me} chỉ sợ ma ma không qua nổi một trận roi. {call} thưa với Hoàng hậu giúp, cho ma ma được hỏi mà không bị đánh.",
 o:[["Thỉnh an Hoàng hậu, xin cho ma ma","Hoàng hậu cho rằng ngươi che cho kẻ ăn bớt"],["Dâng lễ Khôn Ninh cung, xin nương tay với người già","lễ bị trả về, Phùng cô cô biết có người giúp ma ma"]]}],
cnv_ma_8:[{k:"th",h:"Buổi xử án sau cùng sắp đến. Muốn cứu Lưu ma ma phải có một lời của người trên. Ma ma từng hầu ở Đức Thọ cung mười năm, {me} nghe chính ma ma kể. {call} hầu Thái hậu, xin nhắc giúp bà còn nhớ người cũ.",
 o:[["Hầu Thái hậu một buổi, nhắc đến Lưu ma ma","Thái hậu không nhớ, chê ngươi lo chuyện kẻ hầu"],["Dâng Thái hậu một lễ, kèm lời xin cho ma ma","Thái hậu cho là ngươi lấy lễ mua án"]]}],
cnv_ma_9:[{k:"do",h:"Kỳ sát hạch của Nội vụ phủ, Lưu ma ma ngồi ghế chấm. {Me} nghe nói có người muốn gài người chấm thay ma ma để đánh trượt {me}. {call} giúp {me} biết {B} có nhúng tay không.",
 o:[["Sai người dò những người ngồi ghế chấm","người của ngươi bị bắt gặp, cả phủ đồn có gian"],["Tự hỏi chuyện các cô cô Nội vụ phủ","ngươi hỏi lộ ý, kẻ kia đổi cách"]]}],
cnv_ma_10:[{k:"y",h:"Lưu ma ma ngã bệnh, mà một cung nữ già không được Thái y viện ghé đến. {Me} không có bạc mời thầy. Nếu {call} quen một vị thái y, xin mời đến xem cho ma ma.",
 o:[["Mời thái y quen đến xem, trả công hậu","Thái y viện ghi tên ngươi mời thầy cho kẻ hầu"],["Tự sắc thuốc mang sang","thuốc không hợp, ma ma trở nặng một đêm"]]}]
});
/* ---------- second asks (≥ 2 per chapter: one is drawn per life, OD:L1252) — a different ask shape of the same chapter ---------- */
(function(){const A=(k,h,a,b,c,d)=>({k,h,o:[[a,b],[c,d]]});const add=(id,a)=>{NRASK[id]=[].concat(NRASK[id]||[],a)};
/* nc_gian */
add("nc_gian_5",A("do","Thư khen từ cố quốc vừa đến, mà {B} biết trước cả {me}. Đường thư ấy hẳn đã có người nhìn trộm. {Call} giúp {me} xem người của {B} ra vào Hội Đồng quán những hôm nào.",
 "Sai người ngồi uống trà canh cửa Hội Đồng quán","người canh quán bị lái buôn nhận ra là người trong cung","Tự hỏi chuyện các thái giám hay ra phố mua hàng","ngươi hỏi về quán của khách ngoại bang, cả cung bàn tán"));
add("nc_gian_6",A("emp","Rương hàng ở cửa Chính Dương không chỉ có thư, còn có quà {me} dâng Hoàng thượng dịp Vạn thọ. Nếu ngài biết món quà đang bị giữ, một chữ của ngài là rương qua cửa. {Call} nhắc giúp {me} được không?",
 "Hầu Hoàng thượng, kể chuyện món quà kẹt ở cửa thành","Hoàng thượng hỏi sao ngươi rành hàng của khách buôn","Dâng lễ nhờ thái giám Ngự thiện phòng nhắc ngài","thái giám nhắc lộ chuyện rương hàng, cửa thành khám kỹ hơn"));
add("nc_gian_7",A("che","Thị vệ đứng ngoài cửa, mà trong cung {me} còn một cung nữ cố hương biết chữ nước nhà. Người ta sẽ hỏi nàng ấy trước tiên. {Call} cho nàng ấy sang hầu cung {call} ít hôm.",
 "Nhận cung nữ cố hương sang hầu cung mình","thị vệ theo nàng ấy sang tận cửa cung ngươi","Bỏ bạc gửi nàng ấy xuống Châm công cục","Châm công cục hỏi gốc gác, nàng ấy bị giữ lại"));
add("nc_gian_8",A("emp","Hoàng thượng tin {me}, nên kể cả đường hành quân. {Me} không muốn biết thêm một chữ nào nữa. {Call} khéo khuyên ngài đừng bàn việc quân ở cung {me}, để {me} khỏi phải chọn.",
 "Khuyên Hoàng thượng đừng bàn việc quân trong hậu cung","Hoàng thượng cho rằng ngươi dạy ngài cách trị nước","Dâng lễ nhờ lão thái giám hầu ngự khéo can","lão thái giám can vụng, ngài lại càng hỏi nàng"));
add("nc_gian_9",A("y","Lão {kha} có bệnh suyễn, vào ngục mà không có thuốc thì khó qua khỏi. Chết trong ngục thì người ta sẽ nói {me} giết người diệt khẩu. Nếu {call} quen một vị thái y, xin cho lão một thang thuốc.",
 "Mời thái y quen vào ngục bắt mạch cho lão {kha}","Đại Lý tự ghi tên ngươi là người lo thuốc cho phạm nhân","Tự sắc thuốc suyễn gửi vào ngục","thuốc bị cai ngục giữ lại khám, lời đồn lan ra"));
add("nc_gian_10",A("hh","Hoàng thượng gọi {me} đến một mình, mà Trung cung đã sai người đứng chờ ngoài điện. Nếu Hoàng hậu cũng hỏi tội, {me} không còn chỗ đứng. {Call} thưa với Hoàng hậu, xin bà đợi ngài xét xong.",
 "Thỉnh an Hoàng hậu, xin bà khoan hỏi tội","Hoàng hậu cho rằng ngươi chen vào việc của Trung cung","Dâng Khôn Ninh cung một hộp trầm, xin hoãn một ngày","hộp trầm bị trả lại kèm một lời trách"));
/* nc_su */
add("nc_su_5",A("emp","Huynh trưởng {me} không chịu khấu đầu chín lần, Hoàng thượng chưa biết. Nếu ngài nghe chuyện từ miệng bộ Lễ, ngài sẽ giận. {Call} kể trước với ngài, nói rằng ở cố quốc chỉ quỳ ba lần là đủ lễ.",
 "Kể trước với Hoàng thượng lễ quỳ của cố quốc nàng","Hoàng thượng chê ngươi biết chuyện nước ngoài nhiều quá","Dâng lễ nhờ quan Hồng lư tự nói giúp","quan Hồng lư nhận lễ, lại tâu rằng hậu cung nhúng tay"));
add("nc_su_6",A("y","Mực đổ lên bức gấm không phải mực thường, ngửi có mùi phèn. {Me} nghĩ có người cố ý. {Call} nhờ một vị thái y biết thuốc nhuộm xem giúp, để biết còn tẩy được hay không.",
 "Mời thái y quen xem vết mực, trả công hậu","thái y lỡ lời, chuyện bức gấm hỏng lan khắp cung","Tự thử nước tẩy trên một góc gấm","nước tẩy làm bạc màu thêm một khoảng gấm"));
add("nc_su_7",A("thu","Huynh trưởng {me} đang bị giữ ở chỗ cấm quân, chưa ai cho gặp. {Me} cần huynh ấy nghe một lời: đừng nói gì thêm, cứ nhận lỗi say rượu. {Call} có người ra vào được chỗ ấy không?",
 "Bỏ bạc nhờ thái giám đưa lời đến chỗ cấm quân","cấm quân bắt được người đưa lời, cho là thông đồng","Nhờ người nhà mình có quen trong cấm quân nhắn giúp","người nhà ngươi bị điều khỏi kinh vì xen vào"));
add("nc_su_8",A("hh","Hậu cung không dự đại yến, nhưng Trung cung được ban chén rượu đáp lễ sứ các nước. {Me} chỉ xin Hoàng hậu nhắc đến cố quốc một câu trong lời đáp lễ. {Call} thưa giúp {me} được không?",
 "Thỉnh an Hoàng hậu, xin bà nhắc đến sứ cố quốc","Hoàng hậu cho là ngươi bày chuyện cho Trung cung","Dâng lễ nhờ nữ quan soạn lời đáp lễ thêm một câu","nữ quan sợ sai lệ, đem chuyện ra hỏi khắp nơi"));
add("nc_su_9",A("do","Có kẻ đang thổi giá muối lên trong lúc hai bên bàn điều ước, mà người nhà {B} buôn muối ở kinh. {Call} giúp {me} xem họ đã gặp những quan nào của bộ Hộ.",
 "Sai người dò các cửa hàng muối nhà {B}","người của ngươi bị gia nhân nhà kia đánh đuổi","Tự hỏi các phi tần có cha anh ở bộ Hộ","ngươi bị đồn xen vào chuyện giá muối"));
add("nc_su_10",A("emp","Hoàng thượng đã ban quà đáp lễ, giờ có người tâu xe sứ mang đồ cấm. Nếu ngài cho khám xe trước mặt dân, cả hai triều mất mặt. {Call} xin ngài cho khám kín trong quán sứ.",
 "Xin Hoàng thượng cho khám kín xe sứ","Hoàng thượng hỏi sao ngươi lo cho thể diện nước khác","Dâng lễ nhờ quan Lễ bộ xin khám kín","quan Lễ bộ nhận lễ rồi đem chuyện xin xỏ ra triều"));
/* nc_tuc */
add("nc_tuc_5",A("che","Rương áo cố hương của {me} nằm dưới đáy tủ, mà có người trong cung muốn đốt nó để tỏ lòng với Đại Hy. {Me} không nỡ. {Call} giữ giùm rương áo ấy qua ngày Nguyên đán.",
 "Giữ rương áo cố hương trong kho cung mình","người ta bàn ngươi chứa đồ của người ngoại tộc","Bỏ bạc gửi rương áo ra tiệm may ngoài cung","tiệm may làm mất một tấm áo thêu tay"));
add("nc_tuc_6",A("do","{B} ăn bát canh ở cung {me} rồi nôn sốt, mà người hầu bếp hôm ấy lại do Nội vụ phủ mới đưa đến. {Call} giúp {me} biết người hầu bếp ấy trước kia ở cung {B} hay không.",
 "Sai người tra gốc gác người hầu bếp","người tra hỏi bị Nội vụ phủ đuổi ra","Tự hỏi chuyện đám thái giám Ngự thiện phòng","ngươi hỏi lộ, người hầu bếp kia trốn mất"));
add("nc_tuc_7",A("emp","Hoàng thượng mất ngủ, người ta đổ cho bàn thờ của tổ tiên {me}. {Me} chỉ xin ngài nghe một lời trước khi lệnh soát cung ban xuống. {Call} xin ngài ghé cung {me} uống một chén trà.",
 "Mời Hoàng thượng ghé cung nàng một buổi","Hoàng thượng mệt, trách ngươi giữa lúc ngài mất ngủ","Dâng an thần hương kèm lời mời qua thái giám","thái giám đổi lời mời, ngài nghi nàng dùng hương lạ"));
add("nc_tuc_8",A("th","Tờ sớ nói người ngoại tộc không được tự nuôi hoàng tự. Thái hậu xưa nay thương trẻ nhỏ, một lời của bà nặng hơn trăm tờ sớ. {Call} vào hầu, thưa giúp {me} một câu.",
 "Hầu Thái hậu, thưa chuyện tờ sớ nuôi con","Thái hậu cho rằng ngươi đem việc triều vào Đức Thọ cung","Dâng Thái hậu một bộ áo trẻ con thêu tay","Thái hậu nhận áo mà nghi ngươi nhắc khéo"));
add("nc_tuc_9",A("che","Lễ Phật đản cần hai người biết tụng kinh theo giọng Đại Hy. Người của {me} chỉ biết giọng cố hương. {Call} cho {me} mượn hai cung nữ biết kinh đến hết ngày lễ.",
 "Cho hai cung nữ biết kinh sang phụ lễ","việc kinh kệ trong cung ngươi bỏ trống mấy hôm","Bỏ bạc mời hai sư cô ở chùa ngoài vào phụ","sư cô ngoài cung không thuộc lệ, lễ suýt sai"));
add("nc_tuc_10",A("thu","Nhà thế gia ấy muốn nhận {me} làm nghĩa nữ, mà mẫu thân {me} ở cố quốc chưa hay. {Me} không muốn bà nghe tin từ miệng người khác. {Call} giúp {me} gửi một lá thư về trước.",
 "Nhờ thái giám của mình gửi thư theo đoàn buôn","thư đi chậm, tin nghĩa nữ đến trước lá thư","Gửi thư theo người nhà mình ra bến","người nhà ngươi bị hỏi vì sao gửi thư ra ngoại bang"));
/* nc_vuong */
add("nc_vuong_5",A("thu","Quốc thư của tân vương đang nằm ở bộ Lễ. {Me} cần biết vị quan nào đang giữ nó lại, và ông ta muốn gì để chịu đem lên ngự án. {Call} có người quen ở bộ Lễ không?",
 "Nhờ thái giám của mình hỏi chuyện quốc thư ở bộ Lễ","quan bộ Lễ biết hậu cung dò, giữ quốc thư lâu hơn","Nhờ người nhà mình hỏi một vị quan bộ Lễ quen biết","nhà ngươi bị coi là phe của phiên bang"));
add("nc_vuong_6",A("do","Nhà {B} đứng sau Binh bộ đòi hai trấn biên. {Me} cần biết họ được lợi gì từ hai trấn ấy, đất, mỏ hay đường buôn. {Call} giúp {me} dò một lần.",
 "Sai người dò xem nhà {B} có ruộng mỏ ở biên","người của ngươi bị nhà kia bắt quả tang","Tự hỏi chuyện các phu nhân hay vào cung thỉnh an","ngươi hỏi lộ, nhà kia biết ngươi đang soi họ"));
add("nc_vuong_7",A("emp","Mẫu thân {me} kẹt trong thành, chỉ một đội quân nhỏ của Đại Hy là mở được đường. {Me} không dám xin việc quân. {Call} chỉ cần kể với Hoàng thượng rằng trong thành ấy có một bà lão là thân mẫu của phi tần ngài.",
 "Kể với Hoàng thượng chuyện thân mẫu nàng kẹt trong thành","Hoàng thượng cho rằng ngươi kéo ngài vào việc nước khác","Dâng lễ nhờ thái giám hầu giá kể giúp","thái giám kể sai, ngài tưởng nàng xin binh"));
add("nc_vuong_8",A("th","Hoàng thượng còn đắn đo xuất binh, mà Thái hậu không muốn tốn quân vì nước khác. {Me} không xin bà đổi ý, chỉ xin bà đừng cản trước khi ngài nghe đủ lời. {Call} thưa giúp {me}.",
 "Hầu Thái hậu, xin bà nghe hết chuyện biên ải","Thái hậu giận vì ngươi bàn chuyện binh đao","Dâng Thái hậu một tượng Quan Âm, kèm lời xin","Thái hậu nhận tượng mà không nói gì, chuyện đến tai Binh bộ"));
add("nc_vuong_9",A("thu","Cánh quân bị phục ở hẻm núi, mà người dẫn đường lại là người Binh bộ chọn. {Me} cần một bản danh sách người dẫn đường hôm ấy, để biết lỗi không ở người cố quốc.",
 "Bỏ bạc nhờ thái giám chép danh sách dẫn đường","danh sách bị Binh bộ giữ, người chép bị đánh đòn","Nhờ người nhà mình hỏi ở Binh bộ","Binh bộ cho là nhà ngươi bênh phiên bang"));
add("nc_vuong_10",A("emp","Hoàng thượng nói chỉ nghe {me} một lần. {Me} sợ một lần ấy không đủ. {Call} có thể xin ngài cho {me} nói ở Ngự thư phòng, có các đại thần cùng nghe, để lời {me} không thành lời bên gối không?",
 "Xin Hoàng thượng cho nàng nói trước các đại thần","Hoàng thượng phật ý, cho là ngươi dạy ngài cách nghe","Dâng lễ nhờ quan Nội các xin một buổi chầu riêng","quan Nội các nhận lễ, lại đồn hậu cung muốn vào triều"));
/* td_an */
add("td_an_5",A("emp","Bản sớ gốc có son phê của tiên đế. Chỉ Hoàng thượng mới mở được kho Nội các mà không ai dám hỏi. {Call} khéo nhắc ngài một chuyện xưa có dấu ấn giả, để ngài tự muốn xem.",
 "Kể với Hoàng thượng một chuyện xưa về ấn giả","Hoàng thượng đoán ra ý ngươi, phật lòng","Dâng ngài một quyển án lệ cũ qua thái giám","thái giám đặt sách sai chỗ, ngài không đọc"));
add("td_an_6",A("che","Lão quản gia cũ của nhà {me} đã về kinh, mà không có chỗ ở an toàn. Nhà kia đang tìm lão. {Call} cho lão ở tạm trong nhà người thân của {call} ít hôm.",
 "Cho lão quản gia ở nhờ nhà người thân mình","người ta bàn nhà ngươi chứa người của nhà tội thần","Bỏ bạc thuê cho lão một gian trọ kín","gian trọ có người lạ hỏi thăm, lão phải dời đi"));
add("td_an_7",A("hh","Nhà kẻ thù đã cài người vào cung, sắp vu cho {me} tội trộm đồ. Trung cung sẽ phải xử. {Call} thưa trước với Hoàng hậu, để bà nghe {me} trước khi nghe kẻ tố.",
 "Thỉnh an Hoàng hậu, xin bà nghe nàng trước","Hoàng hậu cho rằng ngươi đoán trước chuyện chưa xảy ra","Dâng Khôn Ninh cung lễ, xin một buổi gặp riêng","lễ bị trả về, kẻ tố biết ngươi đứng về phía nàng"));
add("td_an_8",A("thu","Sổ xuất ấn của Binh bộ năm ấy sắp bị đốt theo lệ. {Me} cần một người ngoài cung chép lại trang có ấn giả trước ngày đốt. {Call} giúp {me} tìm người ấy.",
 "Bỏ bạc nhờ thái giám tìm người chép sổ Binh bộ","người chép bị bắt, sổ bị đem đốt sớm","Nhờ người nhà mình hỏi một thư lại Binh bộ","người nhà ngươi bị Binh bộ ghi là kẻ dòm sổ"));
add("td_an_9",A("emp","Tờ sớ đã soạn, chỉ còn chọn ngày. Gần lễ của tiên đế thì chạm chữ hiếu, gặp dịp vui thì như phá cuộc vui. Có khi {call} đoán ý Hoàng thượng được hơn {me}. Xin dò giúp ngài vui vào ngày nào.",
 "Dò ý Hoàng thượng xem ngày nào ngài vui lòng","Hoàng thượng thấy ngươi dò ý, cho là có mưu","Dâng lễ nhờ quan Khâm thiên giám xem ngày giúp","quan Khâm thiên giám nói lộ, nhà kia biết trước"));
add("td_an_10",A("do","Ba nha môn xử án đã ngồi xét, mà {B} lại sai người gặp riêng một vị quan xét án. {Me} cần biết họ đã nói gì với nhau. {Call} giúp {me} một lần.",
 "Sai người dò xem quan xét án đã gặp ai","người của ngươi bị gia nhân quan xét án đuổi","Tự hỏi các phi tần có cha anh ở ba nha môn xử án","ngươi bị đồn chạy án cho nhà tội thần"));
/* td_ke */
add("td_ke_5",A("thu","Năm ấy bạc đi qua một hiệu cầm đồ, mà người giữ sổ hiệu ấy nay đã về quê. {Me} cần một người tìm đến làng ông, hỏi xem ông còn nhớ khách nào đến lấy bạc.",
 "Bỏ bạc nhờ thái giám về quê tìm người giữ sổ","thái giám đi chậm, người giữ sổ đã bị dọa im","Nhờ người nhà mình tìm đến làng ông","người nhà ngươi bị kẻ lạ theo dõi trên đường"));
add("td_ke_6",A("emp","Kẻ cầm dao năm xưa sắp bị xử gấp, như có người muốn hắn câm mãi. {Me} chỉ xin Hoàng thượng hoãn ngày xử mười hôm. Nếu có dịp hầu ngài, xin {call} nói giúp.",
 "Xin Hoàng thượng hoãn ngày xử kẻ cầm dao","Hoàng thượng hỏi sao ngươi muốn giữ mạng một tội nhân","Dâng lễ nhờ quan Hình bộ xin hoãn án","quan Hình bộ nhận lễ rồi báo với người đứng sau"));
add("td_ke_7",A("do","Thị vệ canh cửa cung {me} mới đổi người, mà người mới lại là đồng hương của {B}. {Call} giúp {me} biết ai đã ký lệnh đổi thị vệ ấy.",
 "Sai người tra sổ đổi phiên thị vệ","người tra sổ bị thị vệ trưởng bắt giữ","Tự hỏi chuyện thái giám giữ sổ phiên","ngươi hỏi lộ, thị vệ mới canh ngươi chặt hơn"));
add("td_ke_8",A("che","Phu nhân họ Trịnh muốn gửi vào cung một người hầu cũ biết chuyện, mà không thể để người ấy ở cung {me}. {Call} nhận người ấy làm cung nữ ít lâu.",
 "Nhận người hầu cũ ấy làm cung nữ của mình","người ấy lỡ lời, cả cung biết ngươi chứa chứng nhân","Bỏ bạc lo cho người ấy chỗ ở Hoán y cục","Hoán y cục giao việc nặng, người ấy bỏ trốn"));
add("td_ke_9",A("do","Mồi đã thả, mà {B} lại hay qua lại với người {me} nghi đứng sau. Nếu nàng ta báo trước, bẫy sẽ hỏng. {Call} giúp {me} xem mấy hôm nay {B} gặp những ai.",
 "Sai người canh cửa cung {B} mấy đêm","người canh bị bắt gặp, bẫy lộ một nửa","Tự đến thăm {B}, dò lời trong lúc uống trà","ngươi hỏi lộ ý, nàng ta đề phòng ngươi"));
add("td_ke_10",A("th","Triều hội đầu xuân, kẻ kia đứng hàng đầu, mà Thái hậu xưa nay vẫn khen hắn. Nếu bà bênh, chứng cứ nào cũng nhẹ. {Call} vào hầu, xin bà đừng nói gì trong buổi ấy.",
 "Hầu Thái hậu, xin bà đứng ngoài chuyện triều hội","Thái hậu cho rằng ngươi muốn bịt miệng bà","Dâng Thái hậu một bộ kinh, xin bà tĩnh tâm mấy hôm","Thái hậu đoán ý, ghi hận ngươi"));
/* td_song */
add("td_song_5",A("emp","Tin tiểu đệ của {me} còn sống đã đến tai triều. Nếu Hoàng thượng nghe từ miệng nhà kia, ngài sẽ nghĩ nhà {me} giấu tội. {Call} kể trước với ngài, nói rằng tiểu đệ chỉ là một lính biên.",
 "Kể trước với Hoàng thượng chuyện người lính biên ấy","Hoàng thượng hỏi sao ngươi biết người nhà tội thần","Dâng lễ nhờ thái giám hầu giá nhắc nhẹ","thái giám nhắc sai, ngài nghi có người giấu tội"));
add("td_song_6",A("do","Thư của cung {me} bị chặn ba lần, lần nào cũng ở cùng một cửa. Người gác cửa ấy hay nhận quà của {B}. {Call} giúp {me} biết hắn đem thư đi bán cho ai.",
 "Sai người theo dấu người gác cửa ấy","người theo dấu bị bắt, thư càng khó ra","Tự hỏi chuyện các thái giám cùng phiên với hắn","ngươi hỏi lộ, người gác cửa đổi đường bán thư"));
add("td_song_7",A("thu","Lão quan bộ Lễ là đồng liêu cũ của cha {me}, ông nhận ra tiểu đệ nhưng chưa nói. {Me} muốn gửi ông một lá thư, xin ông nhớ tình xưa mà im lặng.",
 "Nhờ thái giám của mình đưa thư đến phủ lão quan","thư bị gia nhân phủ ấy đưa nhầm tay","Gửi thư theo người nhà mình đến thăm lão quan","lão quan sợ liên lụy, đem thư trả lại"));
add("td_song_8",A("do","Có người đã ký lệnh đẩy đội của tiểu đệ {me} lên tuyến đầu, và tên ấy dính đến nhà {B}. {Call} giúp {me} biết ai đã cầm bút.",
 "Sai người dò lệnh điều quân ở Binh bộ","người dò bị Binh bộ ghi tên","Tự hỏi các phi tần có cha anh làm võ quan","ngươi bị đồn xen vào việc quân"));
add("td_song_9",A("che","Hộ bộ sắp tra sổ hộ tịch, tiểu đệ của {me} cần một chỗ đứng tên trong một nhà khác. {Call} có thể cho tiểu đệ ghi tên làm gia nhân trong một nhà quen của {call} không?",
 "Cho người lính trẻ ghi tên vào nhà quen của mình","người ta bàn nhà ngươi chứa con tội thần","Bỏ bạc mua cho người lính một tên trong sổ làng","sổ làng bị tra lại, tên mới không đứng vững"));
add("td_song_10",A("th","Xin cho tiểu đệ về cấm quân là chuyện Binh bộ, nhưng Thái hậu thương con cháu nhà công thần cũ. {Call} vào hầu, nhắc bà rằng nhà {me} từng có công.",
 "Hầu Thái hậu, nhắc công lao cũ của nhà nàng","Thái hậu nhớ đến án cũ, không vui","Dâng Thái hậu một bức họa cũ của nhà nàng","Thái hậu nhận họa mà hỏi ngươi được gì từ việc này"));
/* td_tha */
add("td_tha_5",A("do","Con búp bê trù ếm tìm thấy trong rương của người đã khuất, mà người mở rương là {B}. {Me} cần biết rương ấy đã nằm trong kho bao lâu, ai đã giữ chìa khóa.",
 "Sai người tra sổ kho giữ rương đồ cũ","người tra sổ bị thái giám giữ kho tố lên","Tự hỏi chuyện các cung nữ từng hầu người đã khuất","ngươi hỏi lộ, người ta đồn ngươi bênh nhà kia"));
add("td_tha_6",A("emp","Có một nhà mời {me} chung tay dâng sớ. {Me} không muốn chung tay, cũng không muốn bị coi là bênh nhà kia. {Call} khéo nói với Hoàng thượng rằng {me} không dính vào tờ sớ nào.",
 "Nói với Hoàng thượng rằng nàng đứng ngoài tờ sớ","Hoàng thượng hỏi ngươi biết gì về tờ sớ ấy","Dâng lễ nhờ thái giám Ngự thư phòng nói giúp","thái giám nói lộ, nhà kia biết nàng từ chối"));
add("td_tha_7",A("y","Con gái nhà kia muốn nói ra điều nàng giấu, nhưng nàng đã ốm mấy hôm vì sợ. Nếu nàng chết trước khi nói, không ai còn biết. {Call} mời giúp một thái y kín miệng xem bệnh cho nàng.",
 "Mời thái y quen xem bệnh cho nàng ta, trả công hậu","Thái y viện biết ngươi lo thuốc cho con gái nhà kia","Tự sắc thuốc an thần mang sang","thuốc an thần làm nàng ta ngủ li bì, lỡ buổi gặp"));
add("td_tha_8",A("emp","Nhà kia đòi đổi ruộng hương hỏa lấy tờ lời khai. {Me} không bán. Nhưng nếu Hoàng thượng biết ruộng ấy vốn của nhà {me}, ngài có thể trả lại mà không cần mặc cả. {Call} nhắc ngài giúp.",
 "Nhắc Hoàng thượng chuyện ruộng hương hỏa của nhà nàng","Hoàng thượng cho rằng ngươi xin đất cho nhà tội thần","Dâng lễ nhờ quan Hộ bộ tâu chuyện ruộng","quan Hộ bộ đem chuyện ra triều, nhà kia biết"));
add("td_tha_9",A("y","Đêm giỗ, con gái nhà kia muốn thắp hương, mà nàng sợ có người bỏ thuốc vào trà. {Me} không muốn có chuyện trong đêm ấy. {Call} nhờ thái y nghiệm trước trà bánh giúp {me}.",
 "Mời thái y quen nghiệm trà bánh đêm giỗ","Thái y viện ghi tên ngươi trong chuyện nhà tội thần","Tự nếm thử trà bánh trước khi dâng","ngươi mệt mỏi cả đêm, có người đồn ngươi bị bỏ thuốc"));
add("td_tha_10",A("do","Tờ sớ tâu {me} đổi tên vào cung có kèm một tờ khai của thái giám giữ sổ tú nữ năm ấy. {Me} nghi {B} đã mua lời khai ấy, xin {call} dò giúp xem bạc đi qua tay ai.",
 "Sai người tìm thái giám giữ sổ tú nữ năm ấy","thái giám ấy đã bị chuyển đi, người dò bị bắt gặp","Tự hỏi chuyện các ma ma từng lo tuyển tú","ngươi hỏi lộ, người ta đồn ngươi sợ bị lật lại gốc gác"));
/* ch_co */
add("ch_co_5",A("do","Trong danh sách tai mắt cô mẫu giao có người của cung {B}. {Me} cần biết người ấy đã báo những gì về Đức Thọ cung trước khi {me} nhận việc.",
 "Sai người theo dõi người tai mắt ở cung {B}","người theo dõi bị chính tai mắt kia nhận ra","Tự hỏi chuyện đám cung nữ ở cung {B}","ngươi hỏi lộ, cả cung đồn ngươi làm tai mắt"));
add("ch_co_6",A("che","Một cung nữ tai mắt của cô mẫu bị lộ, người ta sắp đánh nàng để tra. Nàng chỉ làm theo lệnh. {Call} cho nàng ấy lánh sang chỗ {call} ít hôm.",
 "Cho cung nữ bị lộ ấy lánh sang cung mình","người ta bàn ngươi chứa tai mắt của Đức Thọ cung","Bỏ bạc gửi nàng ấy về quê một thời gian","nàng ấy bị chặn ở cửa cung, khai tên ngươi"));
add("ch_co_7",A("th","Cô mẫu muốn chức Cửu môn đề đốc, người giữ các cửa kinh thành, về tay nhà ngoại, Hoàng thượng muốn người của ngài. {Me} kẹt ở giữa. {Call} thưa với cô mẫu rằng {me} không đủ sức xoay việc triều.",
 "Hầu Thái hậu, thưa rằng nàng không xoay nổi việc ấy","Thái hậu cho rằng ngươi xúi nàng bỏ việc","Dâng Thái hậu một hộp sâm, xin bà thương cháu","Thái hậu nhận sâm, vẫn giao việc cho nàng"));
add("ch_co_8",A("emp","Cô mẫu giao cho {me} một lệnh khó mà {me} không muốn làm. Chỉ khi Hoàng thượng giao cho {me} một việc ở bên ngài, cô mẫu mới không sai được {me}. Xin {call} khéo tiến cử {me} hầu ngài ở Ngự thư phòng ít lâu.",
 "Tiến cử nàng vào hầu mực ở Ngự thư phòng","Hoàng thượng thấy ngươi xếp đặt người bên ngài, phật ý","Dâng lễ nhờ Tổng quản Ngự thư phòng gọi nàng sang","Tổng quản nói lộ, Đức Thọ cung biết chuyện"));
add("ch_co_9",A("che","{Me} đã từ chối cô mẫu, người hầu cũ bà ban cho {me} sắp bị gọi về. Nàng ấy biết nhiều chuyện của {me}. {Call} nhận nàng ấy sang hầu cung {call}, để nàng không phải về Đức Thọ cung.",
 "Nhận người hầu cũ của nàng về cung mình","Đức Thọ cung cho là ngươi giành người của bà","Bỏ bạc lo cho người hầu ấy việc ở Thượng y cục","người hầu ấy bị Đức Thọ cung gọi về giữa chừng"));
add("ch_co_10",A("do","Tin về tờ sớ đã lọt ra từ thọ yến, mà người ngồi gần nhất là người của {B}. {Call} giúp {me} biết tin ấy đã truyền qua những ai.",
 "Sai người dò đường tin lọt ra từ thọ yến","người của ngươi bị nữ quan Đức Thọ cung bắt gặp","Tự hỏi chuyện các phi tần dự thọ yến","ngươi bị đồn là người làm lọt tin"));
/* ch_benh */
add("ch_benh_5",A("th","Cô mẫu không chịu uống thuốc của Thái y viện, chỉ tin phương của lương y ngoài cung. {Me} khuyên không được. {Call} vào hầu, thưa với bà một lời, có khi bà nghe người ngoài hơn nghe cháu.",
 "Hầu Thái hậu, khuyên bà uống thuốc của viện","Thái hậu gắt, cho là ngươi lắm chuyện","Dâng Thái hậu một hộp mứt để dỗ bà uống thuốc","Thái hậu trả mứt, càng không chịu uống"));
add("ch_benh_6",A("emp","Cô mẫu lâm bệnh, có người đã xin Hoàng thượng giao việc lục cung cho kẻ khác. {Me} không xin quyền, chỉ xin ngài đợi cô mẫu khỏi. {Call} nói giúp {me} một lời.",
 "Xin Hoàng thượng chờ Thái hậu khỏi bệnh mới định việc","Hoàng thượng cho rằng ngươi giữ quyền cho Đức Thọ cung","Dâng lễ nhờ thái giám hầu giá nói giúp","thái giám nói lộ, kẻ xin quyền ghi mối hận"));
add("ch_benh_7",A("do","Chén thuốc có vị lạ đi qua tay ba người, một trong số đó hay đến cung {B}. {Call} giúp {me} biết người ấy đã gặp ai trước khi bưng thuốc.",
 "Sai người dò ba người đã bưng chén thuốc","người dò bị Đức Thọ cung bắt, nghi là kẻ hạ độc","Tự hỏi chuyện các cung nữ sắc thuốc","ngươi hỏi lộ, kẻ kia kịp phi tang"));
add("ch_benh_8",A("y","Cô mẫu đau lưng, mỗi đêm thức giấc mấy lần, ngự y chỉ kê thuốc uống. {Me} nghe nói có vị thái y giỏi châm cứu chưa từng được gọi. Nếu {call} quen ông ấy, xin mời giúp.",
 "Mời thái y biết châm cứu đến Đức Thọ cung","Thái y viện trách ngươi vượt mặt ngự y","Tự xoa bóp cho Thái hậu theo sách thuốc","ngươi xoa vụng, Thái hậu đau thêm một đêm"));
add("ch_benh_9",A("hh","Vị thuốc cứu mạng phải qua sổ Nội vụ phủ, mà Trung cung giữ con dấu. {Me} cần Hoàng hậu đóng dấu thật sớm, xin {call} vào Khôn Ninh cung thưa giúp.",
 "Thỉnh an Hoàng hậu, xin bà đóng dấu cho kịp","Hoàng hậu bị đánh thức, trách ngươi vô lễ","Dâng lễ nhờ nữ quan giữ dấu trình gấp","nữ quan trình chậm, thuốc lỡ nửa ngày"));
add("ch_benh_10",A("che","Bệnh cô mẫu đã đến hồi nguy kịch, các tiểu công chúa cô mẫu nuôi không ai trông. {Me} không thể rời giường bệnh. {Call} trông giúp các tiểu công chúa một đêm.",
 "Đón các tiểu công chúa về cung mình một đêm","một tiểu công chúa nhiễm lạnh, người ta trách ngươi","Bỏ bạc nhờ ma ma Đức Thọ cung trông giúp","ma ma ngủ quên, các tiểu công chúa khóc cả đêm"));
/* ch_ho */
add("ch_ho_5",A("th","Ở Đức Thọ cung, người cháu kia được gọi vào trước ba lần liền. {Me} không tranh, chỉ sợ cô mẫu quên {me}. {Call} vào hầu, nhắc tên {me} một câu.",
 "Hầu Thái hậu, nhắc tên nàng một câu","Thái hậu cho rằng ngươi chen vào chuyện họ nhà bà","Dâng Thái hậu một hộp chè sen nàng tự nấu","Thái hậu nhận chè mà khen người cháu kia"));
add("ch_ho_6",A("do","Quà mừng thọ của {me} để trong kho, mới đây đã bị xé một góc. Chìa khóa kho chỉ ba người giữ, một người hay đến cung {B}. {Call} xem giúp {me} người ấy đã vào kho lúc nào.",
 "Sai người tra ba người giữ chìa khóa kho","người tra bị thái giám giữ kho tố lên Đức Thọ cung","Tự hỏi chuyện đám người dọn kho","ngươi hỏi lộ, người kia giấu dấu vết"));
add("ch_ho_7",A("do","Lời gièm đến tai cô mẫu qua một ma ma già hầu bà mười năm. Ma ma ấy hay nhận quà của {B}. {Call} giúp {me} biết bà ta đã nói những gì.",
 "Sai người dò lời ma ma già ở Đức Thọ cung","người dò bị ma ma bắt gặp, chuyện đến tai Thái hậu","Tự đến biếu ma ma chút quà, dò lời","ma ma nhận quà rồi kể lại với người kia"));
add("ch_ho_8",A("emp","Các trưởng bối họ ngoại sẽ chọn người cháu được Hoàng thượng thương hơn. {Me} không xin ân sủng. {Call} chỉ cần để ngài nhắc tên {me} một lần trước mặt người nhà họ ngoại.",
 "Khéo để Hoàng thượng nhắc tên nàng trước họ ngoại","Hoàng thượng thấy bị xếp đặt, không vui","Dâng lễ nhờ thái giám bên ngài nhắc tên nàng","thái giám nhắc lộ, người cháu kia biết chuyện"));
add("ch_ho_9",A("emp","Tờ sớ hặc họ ngoại nêu tên cả nhà {me} lẫn nhà người cháu kia. {Me} không xin Hoàng thượng bỏ qua, chỉ xin ngài xét từng nhà, đừng phạt chung. {Call} nói giúp {me}.",
 "Xin Hoàng thượng xét riêng từng nhà họ ngoại","Hoàng thượng cho rằng ngươi bênh họ ngoại","Dâng lễ nhờ quan Ngự sử đài nói giúp","quan Ngự sử nhận lễ rồi dâng thêm một tờ sớ"));
add("ch_ho_10",A("hh","Chiếc ghế bên Thái hậu là chuyện của Đức Thọ cung, nhưng ở yến tiệc lục cung, Trung cung xếp chỗ. {Call} thưa với Hoàng hậu giúp, xin xếp {me} ngồi sau người cháu kia.",
 "Thỉnh an Hoàng hậu, xin xếp nàng ngồi sau","Hoàng hậu ngại việc của Đức Thọ cung, bảo ngươi lui","Dâng lễ nhờ nữ quan xếp chỗ đổi thứ tự","nữ quan xếp lộn, cả hai người cháu đều giận"));
/* ch_bi */
add("ch_bi_5",A("emp","Bản sao lá thư đã đến tay Hoàng thượng một lần, ngài chưa nói gì. {Me} không biết ngài nghĩ sao về cô mẫu. {Call} hầu ngài, dò giúp {me} ngài còn giận hay không.",
 "Dò ý Hoàng thượng về chuyện lá thư cũ","Hoàng thượng biết ngươi dò, phật ý","Dâng lễ nhờ lão thái giám hầu ngự dò giúp","lão thái giám nói lộ, ngài càng để tâm"));
add("ch_bi_6",A("do","Lâm Khải ở Hàn lâm viện gửi lời hăm dọa, mà người đưa lời vào cung lại là người quen của {B}. {Call} giúp {me} biết hai bên đã gặp nhau mấy lần.",
 "Sai người dò người đưa lời của Lâm Khải","người dò bị Hàn lâm viện để ý","Tự hỏi các phi tần có cha anh ở Hàn lâm viện","ngươi hỏi lộ, Lâm Khải biết có người dò hắn"));
add("ch_bi_7",A("che","Cô mẫu hỏi chuyện hộp thư, mà Đàm ma ma, người làm chứng năm xưa, đang ở cung {me}. Nếu cô mẫu gọi bà ấy đi, {me} không giữ được. {Call} cho Đàm ma ma lánh sang cung {call} ít hôm.",
 "Cho Đàm ma ma lánh sang cung mình","Đức Thọ cung cho rằng ngươi giấu người của bà","Bỏ bạc gửi Đàm ma ma ra chùa ngoài cung","Đàm ma ma bị gọi về giữa đường"));
add("ch_bi_8",A("hh","Chiếc hộp gấm biến mất khỏi cung {me}. Muốn khám các cung khác phải có lệnh của Trung cung. {Call} thưa với Hoàng hậu giúp, xin bà cho khám kín trước khi hộp ra khỏi hậu cung.",
 "Thỉnh an Hoàng hậu, xin lệnh khám kín","Hoàng hậu hỏi trong hộp có gì, ngươi khó trả lời","Dâng lễ nhờ nữ quan Trung cung xin lệnh","nữ quan xin lệnh ầm ĩ, kẻ trộm kịp giấu hộp"));
add("ch_bi_9",A("th","Lá thư cũ có thể bảo vệ cô mẫu, cũng có thể hại bà. {Me} muốn hỏi chính cô mẫu muốn {me} làm gì, mà {me} không dám mở lời. {Call} vào hầu, mở lời giúp {me}.",
 "Hầu Thái hậu, mở lời giúp nàng về lá thư","Thái hậu giận vì ngươi biết chuyện năm xưa","Dâng Thái hậu một bình hoa, xin bà gọi nàng vào","Thái hậu nhận hoa mà không gọi ai"));
add("ch_bi_10",A("do","Trước tiết Thanh minh, người của {B} hay chờ ở cửa Ngự sử đài. {Me} cần biết họ chờ Lâm Khải hay chờ một người khác.",
 "Sai người canh cửa Ngự sử đài mấy đêm","người canh bị thị vệ hỏi tội đi đêm","Tự hỏi chuyện các thái giám gác cửa tây","ngươi hỏi lộ, người của {B} đổi chỗ chờ"));
/* thd_tho */
add("thd_tho_5",A("emp","Danh sách dự thí do chú của một phi tần khác giữ. {Me} chỉ xin Hoàng thượng nói một câu: thơ phi tần ai cũng được dự. {Call} nhắc ngài giúp {me} lúc ngài vui.",
 "Nhắc Hoàng thượng cho mọi phi tần được dự thí","Hoàng thượng cho rằng ngươi chen vào việc Hàn lâm viện","Dâng lễ nhờ thái giám Ngự thư phòng nhắc giúp","thái giám nhắc lộ, người giữ danh sách gạch tên sớm hơn"));
add("thd_tho_6",A("che","Tập thơ nháp mất rồi, còn lại mấy bức thư cha gửi có chép thơ {me}. {Me} sợ chúng cũng mất. {Call} cất giùm mấy bức thư ấy đến ngày yết bảng.",
 "Cất mấy bức thư có chép thơ trong cung mình","người ta bàn ngươi giấu đồ của người đang bị tố","Bỏ bạc gửi thư ra một tiệm sách quen","tiệm sách đem thư cho người khác xem"));
add("thd_tho_7",A("che","Vòng thi ở Ngự hoa viên, mỗi người được đem theo một người mài mực. Người của {me} run tay. {Call} cho {me} mượn cung nữ mài mực khéo nhất cung {call} một buổi.",
 "Cho cung nữ mài mực khéo sang hầu buổi thi","cung nữ của ngươi bị người ta đổ cho làm đổ mực","Bỏ bạc mời một thư đồng Hàn lâm viện mài giúp","thư đồng ấy là người của phe kia"));
add("thd_tho_8",A("do","Mấy trang chép tay đề ngày ba năm trước, giấy lại là giấy mới của Nội vụ phủ năm nay. {Me} cần biết ai đã xin loại giấy ấy, mà {me} nghi người của {B}.",
 "Sai người tra sổ phát giấy của Nội vụ phủ","người tra bị Nội vụ phủ đuổi ra","Tự hỏi chuyện các cung nữ giữ giấy mực","ngươi hỏi lộ, kẻ kia đốt sạch giấy thừa"));
add("thd_tho_9",A("emp","Chứng cứ thơ là của {me} chỉ đến tay Hàn lâm viện, mà ở đó có chú của {B}. {Me} chỉ xin Hoàng thượng tự đọc tập chứng. {Call} xin ngài giúp {me}.",
 "Xin Hoàng thượng tự đọc tập chứng cứ","Hoàng thượng cho rằng ngươi nghi Hàn lâm viện","Dâng lễ nhờ thái giám Ngự thư phòng đặt tập chứng lên án","thái giám đặt nhầm, tập chứng bị trả về viện"));
add("thd_tho_10",A("th","Ngày yết bảng, ai đứng đầu tập Ngự tuyển thì Thái hậu ban một chiếc trâm. Nếu bà hỏi đến bài của {me}, bảng khó bị sửa. {Call} vào hầu, đọc cho bà nghe một bài.",
 "Hầu Thái hậu, đọc cho bà nghe một bài thơ của nàng","Thái hậu không thích thơ, chê ngươi làm phiền","Dâng Thái hậu tập thơ chép tay, kèm lời thưa","Thái hậu nhận tập thơ rồi để quên"));
/* thd_sach */
add("thd_sach_5",A("thu","Sĩ tử ngoài kinh đòi in quyển hạ, mà cha {me} còn đắn đo. {Me} muốn gửi cha một lá thư, khuyên ông chờ đến sau mùa lũ. {Call} giúp {me} gửi đi.",
 "Nhờ thái giám của mình gửi thư về làng thầy đồ","thư bị môn sinh phủ kia đọc trước","Gửi thư theo người nhà mình về làng thầy đồ","người nhà ngươi bị kẻ lạ hỏi chuyện quyển hạ"));
add("thd_sach_6",A("emp","Ngoài triều có sớ chê sách của cha {me} là lời vu khống. Hoàng thượng chưa đọc sách, chỉ đọc sớ. {Call} xin ngài đọc một chương trước khi tin tờ sớ.",
 "Xin Hoàng thượng đọc một chương sách của thầy đồ","Hoàng thượng cho rằng ngươi bênh người viết sách","Dâng sách nhờ thái giám Ngự thư phòng đặt lên án","thái giám đặt sách dưới chồng sớ, ngài không đọc"));
add("thd_sach_7",A("do","Kẻ dán giấy dọa cha {me} hẹn quay lại vào phiên chợ tới. {Me} nghi kẻ ấy là gia nhân nhà {B}. {Call} giúp {me} biết mặt hắn.",
 "Sai người đứng canh phiên chợ làng thầy đồ","người canh bị kẻ dọa đánh trọng thương","Tự hỏi chuyện các thái giám có quê gần làng ấy","ngươi hỏi lộ, kẻ dọa đổi ngày đến"));
add("thd_sach_8",A("hh","Bản dâng phải đóng bìa đúng phép, mà Nội vụ phủ không chịu cấp gấm bìa cho sách của thầy đồ quê. {Call} thưa với Hoàng hậu giúp {me}, xin một tấm gấm bìa theo lệ.",
 "Thỉnh an Hoàng hậu, xin gấm bìa cho bản dâng","Hoàng hậu cho rằng ngươi xin ân cho người ngoài","Dâng lễ nhờ nữ quan Nội vụ phủ cấp gấm","nữ quan cấp gấm sai màu, bản dâng bị chê"));
add("thd_sach_9",A("thu","Người cắt nửa câu sách là một vị Ngự sử, học trò của phủ kia. {Me} cần bản in gốc của cha để chứng câu ấy còn nửa sau. {Call} giúp {me} lấy một bản từ nhà in.",
 "Bỏ bạc nhờ thái giám lấy bản in gốc ở nhà in","nhà in đã bị niêm phong, người đi lấy bị giữ","Nhờ người nhà mình đến nhà in xin một bản","người nhà ngươi bị nghi là đồng đảng của người viết sách"));
add("thd_sach_10",A("do","Ngày xét án cha {me} sẽ quỳ dưới thềm, mà {B} đã sai người gặp quan đứng hầu án. {Call} giúp {me} biết họ đã hứa với nhau những gì.",
 "Sai người dò quan đứng hầu án sách","người dò bị quan ấy bắt, khai tên ngươi","Tự hỏi các phi tần có cha anh ở Đại Lý tự","ngươi bị đồn chạy án cho thầy đồ"));
/* thd_tro */
add("thd_tro_5",A("thu","Đề thi rao ở chợ sách, mà người bán chỉ là tay buôn. Kẻ chép đề phải ngồi trong bộ Lễ. {Me} cần một người ngoài cung mua một tờ đề ấy làm chứng.",
 "Bỏ bạc nhờ thái giám ra chợ sách mua tờ đề","thái giám bị bắt khi đang mua, tên ngươi bị nhắc","Nhờ người nhà mình giả làm sĩ tử mua đề","người nhà ngươi bị nghi là kẻ mua đề"));
add("thd_tro_6",A("emp","Biểu huynh của {B} đỗ khoa trước nhờ đề bán. Muốn lật bảng vàng phải có ý Hoàng thượng. {Call} khéo hỏi ngài có nhớ bài văn của vị Tiến sĩ ấy không.",
 "Khéo hỏi Hoàng thượng về bài văn của vị Tiến sĩ ấy","Hoàng thượng thấy ngươi bới chuyện khoa cử, không vui","Dâng lễ nhờ quan Hàn lâm đọc lại bài văn","quan Hàn lâm nhận lễ, lại báo cho nhà {B}"));
add("thd_tro_7",A("emp","Học trò của cha {me} bị phủ Thuận Thiên truy bắt vì một vụ đánh người cậu ấy không làm. {Call} xin Hoàng thượng cho phủ Thuận Thiên xét kỹ trước khi giam người.",
 "Xin Hoàng thượng cho xét kỹ vụ đánh người","Hoàng thượng cho rằng ngươi chen vào việc phủ Thuận Thiên","Dâng lễ nhờ quan phủ Thuận Thiên khoan bắt","quan phủ nhận lễ, lại bắt sớm hơn"));
add("thd_tro_8",A("th","Lá đơn trăm chữ ký bị chặn trước Ngọ Môn. Thái hậu thương sĩ tử nghèo, bà từng ban gạo cho trường thi. {Call} vào hầu, xin bà nghe chuyện lá đơn.",
 "Hầu Thái hậu, kể chuyện lá đơn của sĩ tử","Thái hậu cho rằng ngươi đem chuyện ngoài triều vào cung","Dâng Thái hậu lá đơn chép lại kèm lời thưa","Thái hậu đọc mà không nói gì, chuyện đến tai bộ Lễ"));
add("thd_tro_9",A("che","Thư lại treo cổ còn một đứa con gái nhỏ, nhà kia đang tìm nó. {Me} không có chỗ giấu. {Call} nhận đứa bé làm cung nữ nhỏ ít lâu.",
 "Nhận đứa bé làm cung nữ nhỏ trong cung mình","người ta bàn ngươi chứa con của người chết oan","Bỏ bạc gửi đứa bé vào một ni viện","ni viện có người lạ đến hỏi, đứa bé phải dời đi"));
add("thd_tro_10",A("do","Kỳ thi lại trong điện, quan coi thi lại là người nhà {B}. {Call} giúp {me} biết họ đã gặp vị Tiến sĩ bị nghi trước ngày thi chưa.",
 "Sai người dò quan coi thi lại","người dò bị quan coi thi tố lên","Tự hỏi các phi tần có cha anh ở bộ Lễ","ngươi bị đồn muốn đổi người coi thi"));
/* thd_hoc */
add("thd_hoc_5",A("do","Hoàng tự nhỏ trốn học vì có người dọa cậu bé ở Thượng thư phòng. {Me} nghi là thư đồng của {B}. {Call} giúp {me} biết đứa thư đồng ấy đã nói gì.",
 "Sai người dò lời đám thư đồng Thượng thư phòng","người dò bị ma ma Thượng thư phòng bắt gặp","Tự hỏi chuyện cậu bé trong lúc chơi","cậu bé kể lại với mẹ, chuyện thành to"));
add("thd_hoc_6",A("emp","Một người mẹ trong cung đã kêu với Hoàng thượng rằng {me} thiên vị. {Me} không cãi. {Call} xin ngài một lần đến dự giờ, để ngài tự thấy {me} dạy thế nào.",
 "Xin Hoàng thượng đến dự một giờ học","Hoàng thượng cho rằng ngươi bênh người thầy","Dâng lễ nhờ thái giám Thượng thư phòng mời ngài","thái giám mời nhầm ngày, ngài thấy lớp vắng"));
add("thd_hoc_7",A("thu","Các Đại học sĩ sẽ ngồi nghe kỳ khảo hạch. {Me} cần biết họ sẽ hỏi sách nào, để bọn trẻ khỏi bị hỏi điều chưa học. {Call} có người nhà quen một vị Đại học sĩ không?",
 "Nhờ thái giám của mình hỏi chuyện sách khảo hạch","quan Đại học sĩ cho rằng hậu cung dò đề","Nhờ người nhà mình hỏi một vị Đại học sĩ quen","người nhà ngươi bị đồn chạy đề cho hoàng tự"));
add("thd_hoc_8",A("y","Đứa trẻ bị phạt quỳ, đầu gối sưng tím, mẹ nó nói {me} đánh con bà. {Me} cần một thái y xem vết thương và ghi đúng là do quỳ. {Call} mời giúp.",
 "Mời thái y quen xem vết thương đứa trẻ","Thái y viện ghi tên ngươi trong chuyện hoàng tự bị phạt","Tự bôi thuốc cho đứa trẻ","đứa trẻ khóc, mẹ nó đổ thêm lỗi cho ngươi"));
add("thd_hoc_9",A("do","Câu Mạnh Tử trong lớp được đọc lại trước Hoàng thượng, mà người kể lại là {B}. {Call} giúp {me} biết nàng ta nghe câu ấy từ đứa trẻ nào.",
 "Sai người dò xem đứa trẻ nào kể chuyện lớp học","người dò làm bọn trẻ sợ, lớp học xôn xao","Tự hỏi chuyện các ma ma trông hoàng tự","ngươi hỏi lộ, {B} biết ngươi lần theo"));
add("thd_hoc_10",A("emp","Hoàng thượng muốn nghe {me} nói đứa trẻ nào gánh được việc lớn. {Me} muốn nói thật, nhưng sợ lời thật làm nhiều người oán. {Call} xin ngài cho {me} viết, đừng bắt nói trước mọi người.",
 "Xin Hoàng thượng cho người thầy viết lời nhận xét","Hoàng thượng cho rằng ngươi dạy ngài cách hỏi","Dâng lễ nhờ thái giám hầu giá xin giúp","thái giám nói lộ, các bà mẹ biết có tờ nhận xét"));
/* cnv_chu (the asker is a maid; no line names her mistress) */
add("cnv_chu_5",A("do","Ở Thái y viện, sổ xuất xạ hương đã bị xé mất một trang. {Me} nghi người của {B} đã vào kho trước. {Call} giúp {me} biết hôm ấy ai trực kho.",
 "Sai người hỏi phiên trực kho Thái y viện","người hỏi bị Thái y viện đuổi ra","Tự hỏi chuyện các thái giám giữ kho thuốc","ngươi hỏi lộ, người ta đồn có xạ hương trong cung"));
add("cnv_chu_6",A("che","Người dò hỏi đã tìm đến cung nữ trực đêm hôm ấy, nàng ấy sợ đến mất ngủ. Nàng chỉ thấy một bóng người. {Call} cho nàng ấy sang làm việc ở chỗ khác ít hôm.",
 "Cho cung nữ trực đêm ấy sang làm việc ở cung mình","kẻ dò hỏi theo nàng ấy sang tận cung ngươi","Bỏ bạc lo cho cung nữ ấy việc ở Hoán y cục","Hoán y cục giao việc nặng, nàng ấy ngã bệnh"));
add("cnv_chu_7",A("do","Phép thử đã bày, mà {B} đã biết chuyện trước cả {me}. Có kẻ đứng ngoài cửa đêm ấy. {Call} giúp {me} biết là ai.",
 "Sai người hỏi những ai đi qua hành lang đêm ấy","người hỏi bị chính kẻ đứng ngoài nhận ra","Tự hỏi chuyện các cung nữ gác đêm","ngươi hỏi lộ, người ta đồn ngươi rình chuyện người khác"));
add("cnv_chu_8",A("hh","Nội vụ phủ sắp khám theo ý Trung cung. {Me} không xin bỏ việc khám, chỉ xin khám vào ban ngày, có nữ quan đứng xem. {Call} thưa giúp với Hoàng hậu.",
 "Thỉnh an Hoàng hậu, xin cho khám vào ban ngày","Hoàng hậu cho rằng ngươi che giấu cho cung bị khám","Dâng lễ nhờ nữ quan Trung cung xin hoãn giờ khám","nữ quan xin hoãn lộ ý, người khám đến sớm hơn"));
add("cnv_chu_9",A("y","Ôn thái y muốn rời kinh, mà chỉ ông nói được gói thuốc kia dùng để làm gì. {Me} cần ông ở lại thêm mấy hôm. {Call} có cách nào giữ ông không?",
 "Trả công hậu giữ Ôn thái y lại thêm mấy hôm","Thái y viện cho rằng ngươi mua chuộc thái y","Tự sang Thái y viện xin Ôn thái y ở lại","ngươi bị đồn lui tới Thái y viện vì chuyện riêng"));
add("cnv_chu_10",A("y","Sau đêm tra hỏi, lưng {me} rách thịt, Thận hình ty không cho thuốc. {Me} không dám xin gì hơn. {Call} cho {me} một lọ thuốc trị thương.",
 "Mời thái y quen cắt thuốc trị thương","Thái y viện ghi tên ngươi cấp thuốc cho kẻ bị tra","Tự pha thuốc đắp gửi sang","thuốc đắp làm vết thương sưng thêm"));
/* cnv_ban */
add("cnv_ban_5",A("hh","Chiếc vòng ngọc thật nằm trong sổ của Trung cung là đồ ngự ban. Mất đồ ngự ban thì Hoàng hậu phải cho tra. {Call} thưa với Hoàng hậu giúp {me}, xin bà cho tra lại.",
 "Thỉnh an Hoàng hậu, xin cho tra lại vòng ngọc","Hoàng hậu cho rằng ngươi khơi lại vụ đã xử","Dâng lễ nhờ nữ quan giữ sổ đồ ngự ban nhắc giúp","nữ quan nhắc vụng, người đứng sau kịp giấu vòng"));
add("cnv_ban_6",A("do","Đường bạc từ cửa sau Nội vụ phủ dẫn về cung {B}. {Me} cần biết thái giám nào đã cầm bạc đi qua cửa ấy.",
 "Sai người canh cửa sau Nội vụ phủ","người canh bị thái giám gác cửa bắt","Tự hỏi chuyện các thái giám hay ra cửa sau","ngươi hỏi lộ, đường bạc đổi sang cửa khác"));
add("cnv_ban_7",A("che","Xuân Đào sốt li bì ở Tân Giả khố, mà ở đó không ai trông. Nếu được về một chỗ có người chăm, nàng còn sống. {Call} xin cho nàng sang chỗ {call} mấy hôm.",
 "Xin đưa Xuân Đào về cung mình dưỡng bệnh","người ta bàn ngươi đón kẻ bị đày về","Bỏ bạc nhờ ma ma Tân Giả khố trông Xuân Đào","ma ma nhận bạc mà bỏ mặc Xuân Đào"));
add("cnv_ban_8",A("do","Phiên làm chứng sắp mở, mà người của {B} đã đến dọa Xuân Đào hai lần. {Call} giúp {me} biết họ còn định dọa những ai.",
 "Sai người canh chỗ ở của Xuân Đào","người canh bị người của {B} đánh đuổi","Tự hỏi chuyện các cung nữ cùng phòng Xuân Đào","ngươi hỏi lộ, người kia đổi cách dọa"));
add("cnv_ban_9",A("hh","Bàn phân xử đã bày, mà chứng cứ chỉ đủ một nửa. Nếu Trung cung cho thêm ít lâu, {me} tìm được nửa kia. {Call} thưa với Hoàng hậu giúp.",
 "Thỉnh an Hoàng hậu, xin hoãn phân xử ít lâu","Hoàng hậu cho rằng ngươi kéo dài chuyện của kẻ hầu","Dâng lễ nhờ nữ quan Trung cung xin hoãn","nữ quan xin hoãn lộ, Thu Cúc bị dọa phải đổi lời"));
add("cnv_ban_10",A("hh","Sổ ghi đồ lén đưa ra cửa sau có tên mấy thái giám Nội vụ phủ. Nếu sổ đến tay Trung cung, không ai chôn được. {Call} xin Hoàng hậu cho người đến lấy sổ.",
 "Thỉnh an Hoàng hậu, xin bà cho người đến lấy sổ","Hoàng hậu cho rằng ngươi gây chuyện với Nội vụ phủ","Dâng lễ nhờ nữ quan Trung cung đi lấy sổ","nữ quan đến chậm, sổ đã bị sửa một trang"));
/* cnv_mat */
add("cnv_mat_5",A("do","Từ khi Hoàng thượng nhìn {me} ở hành lang, có người kể chuyện ấy khắp nơi, thêm thắt đủ điều. {Me} nghi là người của {B}. {Call} giúp {me} biết.",
 "Sai người dò ai kể chuyện hành lang ấy","người dò bị người của {B} nhận ra","Tự hỏi chuyện các cung nữ hay ngồi lê","ngươi hỏi lộ, lời đồn lan thêm một vòng"));
add("cnv_mat_6",A("hh","Hoàng thượng gọi {me} giữa đường ba lần, người ta bắt đầu nói {me} cố ý đứng chờ. {Call} thưa với Hoàng hậu giúp, xin cho {me} đổi sang đường đi khác.",
 "Thỉnh an Hoàng hậu, xin đổi đường đi cho nàng","Hoàng hậu cho rằng ngươi lo cho một cung nữ quá mức","Dâng lễ nhờ nữ quan Trung cung đổi phiên","nữ quan đổi phiên lộ, người ta bàn thêm"));
add("cnv_mat_7",A("che","Tên {me} đã vào sổ Kính sự phòng, từ đó có người ngày đêm đứng ngoài phòng {me}. {Call} cho {me} sang ngủ ở chỗ khác mấy đêm.",
 "Cho nàng sang ngủ ở hậu viện cung mình","người ta bàn ngươi giấu người đã vào sổ thị tẩm","Bỏ bạc lo cho nàng chỗ ngủ ở Châm công cục","chỗ ấy không kín, kẻ đứng ngoài tìm đến"));
add("cnv_mat_8",A("y","Đêm hầu giá đã định, mà mấy hôm nay {me} sốt nhẹ. Hầu giá mà sốt là tội, khai bệnh thì mất dịp. {Call} xin giúp {me} một thang thuốc hạ sốt.",
 "Mời thái y quen cắt thuốc hạ sốt cho nàng","Thái y viện ghi lại, Kính sự phòng biết chuyện","Tự pha một bát nước gừng mang sang","nước gừng làm nàng đỏ mặt, người ta bàn tán"));
add("cnv_mat_9",A("do","Từ đêm được gọi hầu giá, phần áo mùa đông của {me} bị Nội vụ phủ cắt mất một nửa. {Me} nghi người của {B} đã nói với Nội vụ phủ, xin {call} dò xem ai đã ký phiếu cắt.",
 "Sai người tra sổ cấp đồ của Nội vụ phủ","người tra sổ cấp đồ bị quản sự mắng đuổi","Tự hỏi chuyện các thái giám phát đồ","ngươi hỏi lộ, Nội vụ phủ cắt thêm"));
add("cnv_mat_10",A("y","Gói bùa tìm thấy trong gối của {me} có mùi thuốc lạ. Nếu biết trong đó có gì, sẽ biết nó từ đâu ra. {Call} nhờ một thái y nghiệm giúp.",
 "Mời thái y quen nghiệm gói bùa, trả công hậu","Thái y viện ghi tên ngươi trong chuyện bùa ngải","Tự mở gói bùa xem trong có gì","ngươi mở gói bùa, người ta đồn ngươi cũng dùng bùa"));
/* cnv_ma */
add("cnv_ma_5",A("do","Việc xếp kho áo Lưu ma ma giao bị ai đó làm rối hai lần trong đêm, mà cửa kho chỉ người của {B} đi ngang. {Call} giúp {me} biết ai đã vào kho.",
 "Sai người canh kho áo ban đêm","người canh bị ma ma bắt gặp, nghi là kẻ phá","Tự hỏi chuyện các cung nữ cùng phòng","ngươi hỏi lộ, kẻ kia đổi cách phá"));
add("cnv_ma_6",A("hh","Muốn lật sổ ba năm của Nội vụ phủ phải có lệnh Trung cung. Lưu ma ma không dám xin. {Call} thưa với Hoàng hậu giúp, xin bà cho soát sổ trước kỳ khóa.",
 "Thỉnh an Hoàng hậu, xin lệnh soát sổ Nội vụ phủ","Hoàng hậu bảo ngươi lo chuyện của kẻ hầu quá tay","Dâng lễ nhờ nữ quan Trung cung trình việc soát sổ","nữ quan trình lộ, Phùng cô cô kịp sửa sổ"));
add("cnv_ma_7",A("do","Phùng cô cô tố Lưu ma ma mượn dấu, mà người làm chứng cho bà ta lại là cung nữ của {B}. {Call} giúp {me} biết cung nữ ấy được hứa gì.",
 "Sai người dò cung nữ làm chứng cho Phùng cô cô","người dò bị Thận hình ty bắt, nghi là dọa chứng nhân","Tự hỏi chuyện các cung nữ cùng phòng chứng nhân","ngươi hỏi lộ, chứng nhân được dặn kỹ hơn"));
add("cnv_ma_8",A("do","Sổ gốc nằm trong rương riêng của Phùng cô cô, mà người giữ chìa là người của {B}. {Call} giúp {me} biết chìa ấy cất ở đâu.",
 "Sai người dò chỗ cất chìa khóa rương","người dò bị Phùng cô cô bắt gặp","Tự hỏi chuyện các cung nữ hầu Phùng cô cô","ngươi hỏi lộ, rương bị dời đi"));
add("cnv_ma_9",A("che","Kỳ sát hạch sắp đến, mà Lưu ma ma bị Phùng cô cô gây khó, không ai dám ngồi cạnh bà. {Call} cho một ma ma của cung {call} ngồi cùng bà trong buổi chấm.",
 "Cho ma ma của mình ngồi chấm cùng Lưu ma ma","ma ma của ngươi bị Phùng cô cô ghi thù","Bỏ bạc nhờ một cô cô khác ngồi cùng","cô cô ấy nhận bạc rồi đứng về phía Phùng cô cô"));
add("cnv_ma_10",A("che","Lưu ma ma bệnh nặng, ở chỗ chung không ai trông, đêm lạnh. {Me} chỉ xin cho ma ma một chỗ ấm. {Call} cho ma ma sang chỗ {call} dưỡng bệnh ít hôm.",
 "Cho Lưu ma ma sang cung mình dưỡng bệnh","người ta bàn ngươi đón người già bệnh vào cung","Bỏ bạc lo cho ma ma một phòng riêng ở Nội vụ phủ","phòng riêng lạnh hơn, ma ma trở bệnh"));
})();
