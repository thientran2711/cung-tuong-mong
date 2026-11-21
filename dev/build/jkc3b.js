/* jkc3b: shared home arcs kc_ke «Kế mẫu» · kc_hon «Hôn sự» · tm96z «Thuở thanh mai» (format: jkc3.js kc_tt; numbers BAL.kc3.fx).
   No palace seed: what they carry is real — the stepmother / thứ muội favour (thứ muội enters with it), the proof against the stepmother,
   Lời đồn, the suitor people; tm96z writes S.tm96.endZ {tok, promise, force} that tm96a reads ({lvforce}, the token). */
const kc3Di=()=>kc3P("di");
function kc3Proof(n){const d=kc3Di();if(d&&n){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+n;S.kc.diAct=(S.kc.diAct||0)+1}}
function kc3Ld(n){S.kld=Math.max(0,(S.kld||0)+n)}
function kc3Tm(n){if(S.tm96)S.tm96.h=cl((S.tm96.h||0)+n,0,100)}
/* ================= kc_ke «Kế mẫu» ================= */
kc3Reg("kc_ke",{t:"Kế mẫu",w:"di",g:"{diT} {diN} muốn dọn đường cho thứ muội {muoiN}. Trong nội viện, mỗi món quà là một nước cờ; nàng làm được gì với ngươi, ngươi cũng làm được với nàng.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Buổi thỉnh an đầu tháng",w:"di",if:()=>!!kc3Di(),t:"Buổi thỉnh an trước mặt tổ mẫu, {diT} cười nói: “Đại tiểu thư dạo này ngủ trưa lâu quá, chẳng thấy sang thăm ai.”",o:[
  {n:"Cúi đầu nhận lỗi trước mọi người",wx:"tổ mẫu khen ngươi biết nhẫn",lx:"{diT} được thể lấn tới",rt:"Ngươi cúi đầu. Tổ mẫu khẽ gật.",go:(A,ok,G)=>{kc3Af("to",G[0])}},
  {n:"Đáp khéo: hôm ấy chính {diT} đến muộn hơn",f:"sharp",wx:"tổ mẫu thấy ngươi sắc sảo",lx:"{diT} ghi hận",rt:"Tổ mẫu bật cười. {diT} đỏ mặt.",rf:"Tổ mẫu cau mày: con cháu sao dám bắt bẻ người trên.",go:(A,ok,G)=>{if(ok)kc3Af("to",G[0]);const d=kc3Di();if(d)d.oan=(d.oan||0)+G[1]}},
  {n:"Mang trà sâm sang biếu, lấy lòng {diT}",wx:"{diT} dịu giọng",lx:"bạc riêng vơi đi",rt:"{diT} nhận trà, khen ngươi hiếu thuận.",go:(A,ok,G)=>{kc3Af("di",G[0])}}]},
 c1:{h:"Xấp lụa có bùa",w:"di",if:()=>!!kc3Di(),t:"{diT} sai người mang sang một xấp lụa thêu cho ngày đi tuyển. {tyN} giũ ra, trong nếp vải rơi xuống một lá bùa yểm.",o:[
  {n:"Đem lá bùa trình tổ mẫu",f:"proof",wx:"có chứng cứ thật trong tay",lx:"bị nói ngược là tự giắt bùa để vu người",rt:"Tổ mẫu cho tra; gia nhân viện {diT} cúi đầu không cãi được.",rf:"{diT} khóc lóc: ai biết tiểu thư tự giắt vào để vu cho thiếp.",go:(A,ok,G)=>{if(ok)kc3Proof(G[0]);else{S.kc.diAct=(S.kc.diAct||0)+1;kc3Ld(G[1]);S.kgt-=G[2]}}},
  {n:"Lặng lẽ đốt bùa, giữ xấp lụa",wx:"biết {diT} đã ra tay mà nàng không hay",lx:"không còn gì làm chứng",rt:"Lá bùa cháy trong lò hương. Ngươi cất xấp lụa.",go:()=>{S.kc.diAct=(S.kc.diAct||0)+1}},
  {n:"Gửi trả lá bùa vào viện {diT}, giắt trong một gói quà",wx:"{diT} biết sợ, im được một thời gian",lx:"bị bắt gặp thì mang tiếng yểm bùa",rt:"Đêm ấy viện phía tây đốt đèn đến sáng. Mấy tháng liền {diT} không dám động đến ngươi.",rf:"Gia nhân bắt được gói quà. Cả phủ xì xào ngươi yểm bùa.",go:(A,ok,G)=>{S.kc.diAct=(S.kc.diAct||0)+1;if(ok)S.kc.diBan=Math.max(S.kc.diBan||0,S.turn+G[0]);else{kc3Ld(G[1]);S.kgt-=G[2]}}}]},
 c2:{h:"Tỳ nữ bị vu",w:"di",if:()=>!!kc3Di(),t:"Gia nhân của {diT} tố {tyN} lấy trộm trâm vàng. {diT} đòi đánh {tyN} hai mươi trượng rồi bán đi.",o:[
  {n:"Đứng ra bênh, đòi đối chất",wx:"tỳ nữ một lòng với ngươi",lx:"thua thì mất tiếng, tỳ nữ vẫn bị đánh",rt:"Đối chất ba câu, gia nhân kia nói hớ. {diT} phải tha người.",rf:"Không ai đứng về phía ngươi. {tyN} bị đánh.",go:(A,ok,G)=>{if(ok){if(S.maid)S.maid.loyal=cl(S.maid.loyal+G[0],0,100);const d=kc3Di();if(d)d.oan=(d.oan||0)+G[1]}else{S.kgt-=G[2];if(S.maid)S.maid.loyal=cl(S.maid.loyal+G[3],0,100)}}},
  {n:"Bỏ bạc đền trâm, chuộc tội cho tỳ nữ",wx:"tỳ nữ thoát đòn",lx:"{diT} biết ngươi chịu bỏ tiền vì người hầu",rt:"Ngươi đền bạc. {tyN} lạy ngươi ba lạy.",go:(A,ok,G)=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal+G[0],0,100);const d=kc3Di();if(d)d.oan=(d.oan||0)+G[1]}},
  {n:"Lật lại: chỉ ra chính gia nhân kia giấu trâm",f:"turn",wx:"{diT} mất một tay chân",lx:"vu không thành thì chính ngươi mang tiếng",rt:"Gia nhân của {diT} bị đuổi khỏi phủ ngay hôm ấy.",rf:"Lời ngươi không đứng vững. Người ta bảo đại tiểu thư cũng biết vu oan.",go:(A,ok,G)=>{const d=kc3Di();if(ok){if(d)d.oan=(d.oan||0)+G[0]}else{kc3Ld(G[1]);apply({duc:-G[2]})}}}]},
 c3:{h:"Lời đồn ngoài phố",w:"di",if:()=>!!kc3Di(),t:"Ngoài phố có tin đồn đại tiểu thư {house} hay lén ra chùa gặp nam nhân. Người tung tin là bà vú của {diT}.",o:[
  {n:"Mời các phu nhân đến nghe đàn, tự rửa tiếng",wx:"tiếng xấu tan đi",lx:"hao sức cả tháng",rt:"Tiếng đàn hôm ấy được nhắc khắp kinh thành; tin đồn kia chẳng ai nhắc nữa.",rf:"Các phu nhân đến nghe, nhưng ra về vẫn thì thầm.",go:(A,ok,G)=>{if(ok)kc3Ld(-G[0])}},
  {n:"Nhờ tổ mẫu lên tiếng cho mình",if:()=>!!kc3P("to"),wx:"lời tổ mẫu dập tắt tin đồn",lx:"tổ mẫu phiền lòng",rt:"Tổ mẫu mắng bà vú kia trước cả phủ.",go:(A,ok,G)=>{kc3Ld(-G[0]);kc3Af("to",-G[1])}},
  {n:"Tung tin ngược về chuyện cũ của {diT}",f:"turn",wx:"thứ muội mất tiếng trước kỳ tuyển",lx:"lộ ra thì ngươi bị coi là độc miệng",rt:"Chuyện {diT} năm xưa vào phủ bằng cửa sau lan khắp phố.",rf:"Người ta lần ra tin từ khuê phòng ngươi.",go:(A,ok,G)=>{const m=kc3P("muoi");if(ok){if(m)m.danh=Math.max(0,(m.danh||0)-G[0])}else{kc3Ld(G[1]);apply({duc:-G[2]})}}}]},
 t1:{h:"Thứ muội tìm đến",w:"muoi",if:()=>!!kc3P("muoi")&&!!kc3Di(),t:"Đêm khuya, thứ muội {muoiN} gõ cửa khuê phòng, mắt đỏ hoe: “Mẹ muội bắt muội làm những việc muội không muốn. Tỷ tỷ, muội phải làm sao?”",o:[
  {n:"Kết tình chị em với muội ấy",f:"muoi",wx:"thứ muội đứng về phía ngươi",lx:"{diT} mà biết sẽ đổ cả lên đầu muội ấy",rt:"Hai chị em ngồi đến canh ba.",go:(A,ok,G)=>{kc3Af("muoi",G[0])}},
  {n:"Khéo hỏi, để muội ấy kể hết việc của {diT}",f:"proof",wx:"có thêm lời làm chứng",lx:"muội ấy thấy mình bị lợi dụng",rt:"{muoiN} kể hết những việc mẹ mình đã làm. Ngươi ghi nhớ từng lời.",rf:"{muoiN} chợt im bặt, lau nước mắt rồi đi.",go:(A,ok,G)=>{if(ok){if(kc3DiActed())kc3Proof(G[0])}else kc3Af("muoi",-G[1])}},
  {n:"Khuyên muội ấy về, đừng chống lại mẹ",wx:"không dây vào chuyện hai mẹ con",lx:"thứ muội tủi thân",rt:"{muoiN} cúi đầu đi về.",go:(A,ok,G)=>{kc3Af("muoi",-G[0])}}]},
 x1:{h:"Trước mặt tổ mẫu",w:"di",if:()=>!!kc3Di(),t:"{diT} quỳ trước tổ mẫu, kể tội ngươi ngỗ nghịch, yểm bùa, hẹn hò. Cả phủ đứng chật chính sảnh chờ ngươi đáp.",o:[
  {n:"Trình đủ chứng cứ trước tổ mẫu",if:()=>{const d=kc3Di();return !!d&&(S.kc.proof[d.id]||0)>0},e:["win","lose"],wx:"lật được bộ mặt {diT}",lx:"chứng cứ không đủ thì bị nói là vu cho người trên",rt:"Từng món chứng cứ bày ra. {diT} không đáp được câu nào.",rf:"{diT} chối từng món một; tổ mẫu không tin ngươi."},
  {n:"Nhận phần lỗi, xin tổ mẫu cho yên nhà",e:"mid",wx:"cả nhà còn giữ được thể diện",lx:"{diT} vẫn ngồi đó, chờ dịp khác",rt:"Tổ mẫu thở dài, bảo hai người lui về."},
  {n:"Để {diT} nói hết, chờ nàng lỡ lời",e:["win","lose"],wx:"nàng tự vạch mặt mình",lx:"im lặng là nhận tội",rt:"Nói đến đoạn bùa yểm, {diT} lỡ miệng kể đúng chỗ giấu. Tổ mẫu đập bàn.",rf:"{diT} nói không sơ hở. Ngươi im lặng, cả phủ cho là ngươi nhận."}]}},
 E:{
 win:{tag:"{diT} lui về từ đường",t:"Tổ mẫu phạt {diT} {diN} lên từ đường chép kinh sám hối, không được ra vào nội viện. Thứ muội thôi bị mẹ sai khiến; từ nay trong nhà không ai dám động đến ngươi.",go:(A,_,G)=>{const d=kc3Di();if(d){S.kc.diBan=Math.max(S.kc.diBan||0,S.turn+G[1]);d.oan=(d.oan||0)+G[0];kcAf(d,-G[2])}kc3Af("muoi",G[0])}},
 mid:{tag:"Hòa hoãn trong nhà",t:"Hai người cùng lui một bước. {diT} vẫn cười nói mỗi sáng thỉnh an, ngươi cũng vậy; ai cũng biết đó chỉ là ngừng tay.",go:(A,_,G)=>{kc3Af("di",G[0])}},
 lose:{tag:"Bị {diT} giá họa",t:"Tổ mẫu tin {diT}. Ngươi bị cấm túc trong khuê phòng; tiếng xấu theo ngươi ra tận cổng phủ, cha nhìn ngươi lạnh nhạt.",go:(A,_,G)=>{kc3Ld(G[0]);S.kgt-=G[1];kc3Af("cha",-G[2])}}}});
/* ================= kc_hon «Hôn sự» ================= */
function kc3SuitOk(){if(!S.kc.suit.length&&!(S.kc.ev&&S.kc.ev.chieu))S.kc.suit.push(kcSuitor());return S.kc.suit.length>0}
kc3Reg("kc_hon",{t:"Hôn sự",w:"ba",g:"{baN} ra vào chính sảnh, các nhà quyền quý lần lượt dạm hỏi. Gả đi hay giữ mình cho kỳ tuyển tú, mỗi lời đáp đều có giá.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Bà mối đến lần đầu",w:"ba",if:()=>kc3SuitOk(),t:"{baN} ngồi uống trà ở chính sảnh, kể nhà {suitN} giàu sang thế nào, con trai nhà ấy tuấn tú ra sao. Cha quay sang hỏi ý ngươi.",o:[
  {n:"Tiếp bà mối, hỏi kỹ về nhà trai",wx:"biết rõ nhà ấy",lx:"cha tưởng ngươi ưng",rt:"Bà mối kể không sót chuyện gì, kể cả mấy người thiếp.",go:(A,ok,G)=>{kc3Af("ba",G[0])}},
  {n:"Thưa: con xin đợi kỳ tuyển tú",wx:"nhà thôi giục",lx:"cha nhíu mày",rt:"Cha gật đầu: cũng được.",rf:"Cha gạt đi: “Tuyển tú là chuyện xa.”",go:(A,ok,G)=>{if(!ok)kc3Af("cha",G[0])}},
  {n:"Biếu bà mối, nhờ bà đánh tiếng nhà khác",wx:"bà mối đứng về phía ngươi",lx:"bạc riêng vơi đi",rt:"Bà mối cười tít mắt, hứa sẽ lựa nhà xứng hơn.",go:(A,ok,G)=>{kc3Af("ba",G[0])}}]},
 c1:{h:"Thư của nhà trai",w:"ba",if:()=>kc3SuitOk(),t:"Qua tay bà mối, {suitN} gửi đến một bài thơ chép trên giấy hoa tiên, ý tứ khẩn thiết.",o:[
  {n:"Họa lại một bài cho phải lễ",wx:"nhà trai thêm quý ngươi",lx:"nhà trai tưởng có hy vọng",rt:"Bài họa của ngươi được nhà trai chép lại treo trong thư phòng.",go:(A,ok,G)=>{const s=kc3Sx(S.kc.suit[0]);if(s)kcAf(s,G[0])}},
  {n:"Gửi trả bài thơ, không một lời",wx:"nhà trai bớt giục",lx:"nhà trai mất mặt, đi đâu cũng kể",rt:"Bài thơ trở về nguyên nếp gấp.",go:(A,ok,G)=>{const s=kc3Sx(S.kc.suit[0]);if(s)kcAf(s,G[0])}},
  {n:"Đưa bài thơ cho cha xem",wx:"cha thấy ngươi biết phép",lx:"cha giục bà mối tính ngày",rt:"Cha đọc xong, gật gù khen chữ tốt.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 c2:{h:"Thứ muội giành mối",w:"muoi",if:()=>!!kc3P("muoi")&&kc3SuitOk(),t:"Thứ muội {muoiN} lén gặp bà mối, nói tốt cho mình trước nhà {suitN}.",o:[
  {n:"Nhường mối cho thứ muội",wx:"bớt một mối phải chối",lx:"người ngoài cho rằng ngươi bị chê",rt:"Nhà trai quay sang hỏi {muoiN}. Muội ấy cảm ơn ngươi rối rít.",go:(A,ok,G)=>{kc3Af("muoi",G[0]);S.kc.suit.shift()}},
  {n:"Giữ mối, thưa chuyện với cha",wx:"cha đứng về phía ngươi",lx:"cha thấy hai chị em làm loạn",rt:"Cha mắng thứ muội trước cả nhà.",rf:"Cha gạt đi: chuyện đàn bà.",go:(A,ok,G)=>{if(ok){kc3Af("muoi",G[0]);const m=kc3P("muoi");if(m)m.oan=(m.oan||0)+G[1]}else kc3Af("cha",G[0])}},
  {n:"Mặc nàng, xem nhà trai chọn ai",wx:"không phải ra mặt",lx:"thứ muội thấy ngươi coi thường",rt:"Ngươi đứng ngoài. Nhà trai vẫn còn do dự.",go:(A,ok,G)=>{kc3Af("muoi",G[0])}}]},
 c3:{h:"Nhà trai giục cưới",w:"ba",if:()=>kc3SuitOk(),t:"Bà mối báo: nhà {suitN} muốn đưa sính lễ trước mùa thu. Cha bắt đầu cho người dọn chính sảnh.",o:[
  {n:"Giả bệnh, nằm liệt giường",wx:"nhà trai lùi ngày",lx:"lộ ra thì mang tiếng dối trá",rt:"Đại phu lắc đầu bảo cần tĩnh dưỡng nửa năm. Nhà trai lùi ngày.",rf:"Bà mối nhìn thấy ngươi đi dạo trong hoa viên."},
  {n:"Nhờ bà mối nói khéo, kèm lễ vật",wx:"nhà trai chịu chờ",lx:"bạc riêng vơi đi",rt:"Bà mối nói một hồi, nhà trai vui vẻ chờ thêm.",go:(A,ok,G)=>{kc3Af("ba",G[0])}},
  {n:"Ra mắt nhà trai đường hoàng, hẹn sau kỳ tuyển",wx:"được tiếng nết na",lx:"nhà trai càng muốn cưới",rt:"Phu nhân nhà trai khen ngươi hết lời.",go:(A,ok,G)=>{const s=kc3Sx(S.kc.suit[0]);if(s)kcAf(s,G[0])}}]},
 t1:{h:"Cha hỏi ý",w:"cha",t:"Tối ấy cha gọi ngươi vào thư phòng: “Gả vào nhà tử tế là phúc. Vào cung là được ăn cả ngã về không. Con nghĩ sao?”",o:[
  {n:"Thưa: con nghe theo cha",wx:"cha yên lòng",lx:"lời đã nói khó rút lại",rt:"Cha gật đầu, vuốt râu.",go:(A,ok,G)=>{kc3Af("cha",G[0])}},
  {n:"Thưa: con muốn vào cung làm rạng danh nhà",f:"cha",wx:"cha nhìn ngươi khác đi",lx:"cha thấy ngươi cao vọng",rt:"Cha cười lớn: “Được. Con gái ta có chí.”",rf:"Cha lắc đầu: “Đàn bà mà mơ chuyện lớn.”",go:(A,ok,G)=>{kc3Af("cha",ok?G[0]:G[1])}},
  {n:"Im lặng, để cha tự quyết",wx:"không trái ý cha",lx:"cha giục bà mối",rt:"Cha nhìn ngươi rất lâu rồi phẩy tay.",go:(A,ok,G)=>{kc3Af("cha",G[0])}}]},
 x1:{h:"Ngày sính lễ",w:"ba",t:"Bà mối dẫn người nhà {suitN} đến, mâm sính lễ phủ lụa đỏ bày trước chính sảnh. Cả nhà chờ ngươi một lời.",o:[
  {n:"Nhận lời nhà {suitN}",if:()=>S.kc.suit.length>0,wx:"thành thân, yên bề gia thất",lx:"thôi đường vào cung, kiếp này dừng ở đây",rt:"Ngươi cúi đầu nhận lễ.",go:A=>{A.done=1;const s=S.kc.suit[0];if(s)kcMarry(s)}},
  {n:"Trả sính lễ, xin cha cho đi tuyển tú",e:["win","lose"],wx:"giữ mình cho kỳ tuyển",lx:"cha giận, tự định hôn",rt:"Cha trả sính lễ, nói: vậy thì vào cung cho xứng.",rf:"Cha đập bàn: “Sính lễ đã nhận thì không trả.”"},
  {n:"Xin hoãn hôn ước đến sau kỳ tuyển",e:"mid",wx:"cả hai đường vẫn còn",lx:"nhà trai chờ, lời ra tiếng vào",rt:"Nhà trai miễn cưỡng chịu chờ."}]}},
 E:{
 win:{tag:"Giữ mình cho kỳ tuyển",t:"Cha trả hết sính lễ, các nhà dạm hỏi lui đi mà không ai mất mặt. Ngươi chỉ còn một con đường: kỳ tuyển tú.",go:(A,_,G)=>{S.kc.suit=[];S.kap=Math.max(0,S.kap-G[0]);S.kc.forced=0}},
 mid:{tag:"Hôn ước tạm gác",t:"Hôn ước gác lại đến sau kỳ tuyển. Trượt tuyển thì nhà trai vẫn chờ ngươi.",go:(A,_,G)=>{S.kap=Math.max(0,S.kap-G[0]);S.kc.forced=0}},
 lose:{tag:"Cha định hôn",t:"Cha không đợi nữa. Ông tự định ngày cưới.",go:()=>{if(S.kc.suit.length&&!S.kc.forced&&!(S.kc.ev&&S.kc.ev.chieu)){S.kc.forced=1;pushDil(mkP("kcE",{e:"dinhhon"}),"Cha định hôn")}}}}});
/* ================= tm96z «Thuở thanh mai» (prequel to tm96a: its end writes S.tm96.endZ) ================= */
const kc3TmOk=()=>{const m=S.tm96&&kcTmMan();return !!(m&&m.alive!==false)};
function kc3EndZ(tok,promise,force){S.tm96.tok=tok;S.tm96.endZ={tok,promise,force:kc3Fill(force)}}
KC3TOK.tmHow=()=>(TM96V[S.tm96&&S.tm96.k]||{}).how||"thành danh";
kc3Reg("tm96z",{t:"Thuở thanh mai",w:"tm",g:"{tmN} là người ngươi hẹn ước từ thuở nhỏ. Trước kỳ tuyển tú, giữ lời hẹn hay buông tay, mỗi bước đều có người nhìn thấy.",
 p:[["s1"],["c1","c2","c3"],["t1"],["x1"]],
 B:{
 s1:{h:"Gặp lại người xưa",w:"tm",if:kc3TmOk,t:"Ngươi gặp lại {tmN} ở chùa Hộ Quốc. Chàng lặng lẽ trao cho ngươi {tmTok}.",o:[
  {n:"Nhận tín vật",f:"tok",wx:"lời hẹn có vật làm tin",lx:"giữ vật của nam nhân là chuyện có thể bị đồn",rt:"Ngươi giấu tín vật trong tay áo.",go:(A,ok,G)=>{S.tm96.tok=1;kc3Tm(G[0]);kc3Ld(G[1])}},
  {n:"Trả lại, giữ lễ",wx:"không ai nói được gì",lx:"chàng buồn",rt:"Chàng cúi đầu, cất tín vật đi.",go:(A,ok,G)=>{kc3Tm(-G[0])}},
  {n:"Hẹn chàng ngày rằm ở hậu viện chùa",f:"hen",wx:"có lời hẹn riêng",lx:"có người trông thấy",rt:"Chàng gật đầu, không nói thêm.",rf:"Một bà khách hành hương nhìn hai người rất lâu.",go:(A,ok,G)=>{if(ok)kc3Tm(G[0]);else kc3Ld(G[1])}}]},
 c1:{h:"Người ấy thành danh",w:"tm",if:kc3TmOk,t:"{tmN} {tmHow}. Tin bay khắp kinh thành.",o:[
  {n:"Gửi lời chúc mừng",wx:"chàng gửi lại một bài thơ",lx:"bạc riêng vơi đi",rt:"Chàng gửi lại một bài thơ.",go:(A,ok,G)=>{S.tm96.rise=1;kc3Tm(G[0])}},
  {n:"Thêu một chiếc khăn gửi tặng",wx:"chàng giữ khăn bên mình",lx:"khăn có thể lọt vào tay người khác",rt:"Chàng nhận khăn, gấp cất trong ngực áo.",go:(A,ok,G)=>{S.tm96.rise=1;kc3Tm(G[0]);kc3Ld(G[1])}},
  {n:"Im lặng",wx:"giữ được tiếng",lx:"chàng tưởng ngươi đã quên",rt:"Ngươi không gửi gì.",go:(A,ok,G)=>{S.tm96.rise=1;kc3Tm(-G[0])}}]},
 c2:{h:"Cha cấm cửa",w:"cha",if:kc3TmOk,t:"Cha biết chuyện ngươi với {tmN}, cấm chàng bước qua cửa phủ: “Con gái nhà này là để đưa vào cung.”",o:[
  {n:"Cúi đầu vâng lời",f:"forced",wx:"cha yên lòng",lx:"lời hẹn nhạt đi",rt:"Ngươi cúi đầu. Đêm ấy ngươi không ngủ.",go:(A,ok,G)=>{kc3Af("cha",G[0]);kc3Tm(-G[1])}},
  {n:"Cãi lại cha",wx:"lòng chàng càng vững",lx:"cha giận, gọi bà mối",rt:"Cha đập bàn. Bà mối được gọi đến ngay tuần sau.",go:(A,ok,G)=>{kc3Tm(G[0]);kc3Af("cha",-G[1])}},
  {n:"Nhờ nhũ mẫu nói đỡ với cha",if:()=>!!kc3P("nm"),wx:"cha dịu lại",lx:"nhũ mẫu bị cha trách",rt:"Nhũ mẫu thưa chuyện một hồi; cha thôi không nhắc nữa.",rf:"Cha mắng cả nhũ mẫu.",go:(A,ok,G)=>{if(ok)kc3Tm(G[0]);else{kc3Af("nm",-G[1]);A.f.forced=1}}}]},
 c3:{h:"Đêm Thượng nguyên",w:"tm",if:kc3TmOk,t:"Đêm rằm tháng giêng, cả kinh thành treo đèn. {tyN} báo: {tmN} đứng chờ dưới cầu đá.",o:[
  {n:"Ra phố ngắm đèn cùng chàng",f:"hen",wx:"một đêm nhớ suốt đời",lx:"có người nhận ra ngươi",rt:"Dưới đèn hoa, hai người đứng cạnh nhau rất lâu.",rf:"Gia nhân nhà bên nhận ra ngươi dưới cầu.",go:(A,ok,G)=>{if(ok)kc3Tm(G[0]);else kc3Ld(G[1])}},
  {n:"Ở nhà cùng cả nhà",wx:"không ai nói được gì",lx:"chàng chờ đến tàn đèn",rt:"Ngươi ngồi bên cửa sổ nhìn đèn trôi trên sông.",go:(A,ok,G)=>{kc3Tm(-G[0])}},
  {n:"Gửi chàng một chiếc đèn hoa qua tỳ nữ",wx:"chàng biết ngươi vẫn nhớ",lx:"bạc riêng vơi đi",rt:"{tyN} mang về lời nhắn: chàng sẽ đợi.",go:(A,ok,G)=>{kc3Tm(G[0])}}]},
 t1:{h:"Bị bắt gặp",w:"cha",if:kc3TmOk,t:"Gia nhân bắt gặp ngươi với {tmN} trong hoa viên. Cả phủ biết trước khi trời sáng.",o:[
  {n:"Quỳ xin cha tha",f:"forced",wx:"cha nguôi giận",lx:"cha cho gọi bà mối",rt:"Cha cho ngươi cấm túc trong khuê phòng.",go:(A,ok,G)=>{kc3Af("cha",G[0]);S.kc.ldSeen=1}},
  {n:"Nhận hết, xin gả cho chàng",f:"hen",wx:"lòng chàng không còn ngờ vực",lx:"cha giận, cả phủ bàn tán",rt:"Cha không nói một lời, đóng cửa thư phòng.",go:(A,ok,G)=>{kc3Tm(G[0]);kc3Af("cha",-G[1]);S.kc.ldSeen=1;S.kc.askTm=1}},
  {n:"Bảo gia nhân trông lầm người",wx:"giữ được tiếng",lx:"nói dối không thành thì càng nhục",rt:"Gia nhân kia bị phạt vì ăn nói hồ đồ.",rf:"Không ai tin. Tin đồn còn to hơn.",go:(A,ok,G)=>{if(!ok){kc3Ld(G[0]);A.f.forced=1}}}]},
 x1:{h:"Lời rủ trốn đi",w:"tm",if:kc3TmOk,t:"{tmN} gửi thư: đêm mười lăm, thuyền đợi ở bến sông. Nếu nàng đến, hai người đi về phương Nam, không bao giờ trở lại.",o:[
  {n:"Giữ tín vật, hồi thư hẹn kiếp sau",e:["win","lose"],wx:"lời hẹn còn nguyên",lx:"thư lọt vào tay cha",rt:"Ngươi viết một dòng: kiếp này không thành, xin hẹn kiếp sau.",rf:"Phong thư rơi vào tay gia nhân, đến tay cha."},
  {n:"Đốt thư, gửi trả tín vật",e:"mid",wx:"dứt được, không ai nói được gì",lx:"chàng hiểu ngươi đã buông tay",rt:"Ngươi đốt thư trước đèn.",go:(A,ok,G)=>{kc3Tm(-G[0])}},
  {n:"Đến bến sông",e:"lose",wx:"đi theo chàng",lx:"bị bắt lại thì mất hết",rt:"Ngươi khoác áo tối, lẻn ra cửa sau.",go:A=>{kcElope(false);if(S.dead)A.done=1}},
  {n:"✦ Theo chàng đi, có tỳ nữ lo liệu đường đi",if:()=>kcR1Ok()&&kcRare("kcR1",BAL.kc3.rare.r1.p),e:"win",wx:"bỏ trốn cùng người thương",lx:"rời bỏ nhà và kỳ tuyển",rt:"Thuyền rời bến trước khi trống canh tư điểm.",go:A=>{A.done=1;kcElope(true)}}]}},
 E:{
 win:{tag:"Hẹn kiếp sau",t:"Ngươi vẫn giữ {tmTok} và lời hẹn với {tmN}. Vào cung rồi, đó là thứ ngươi phải giấu kỹ nhất.",go:()=>{kc3EndZ(1,1,"Ngày kiệu hoa đến cổng, {tmN} đứng ở đầu ngõ; hai người đã hẹn nhau kiếp sau.")}},
 mid:{tag:"Buông tay",t:"Ngươi gửi trả {tmTok}, dặn {tmN} lập công danh và quên mình.",go:()=>{kc3EndZ(0,0,"Ngươi tự tay gửi trả tín vật, dặn chàng lập công danh và quên mình.")}},
 lose:{tag:"Bị ép chia lìa",t:"Cha cấm cửa {tmN}; hai người không kịp nói một lời từ biệt.",go:()=>{kc3EndZ(S.tm96.tok?1:0,0,"Cha ngươi cấm cửa chàng; hai người không kịp nói một lời từ biệt.")}}}});
