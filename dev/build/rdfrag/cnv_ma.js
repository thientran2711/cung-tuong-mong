/* ---------- cnv_ma · Ma ma dạy việc ---------- */
/* BAL.road keys needed:
     cnvMaRk: 3   // cnv_ma .11 win (still a maid): the servant rank she is given, printed as SRK.maid[BAL.road.cnvMaRk] (index 3 today)
   Two states (ROAD_MAP §8.4): still a maid (isSrv) or already raised (S.srv.risen). Texts are functions of the state; options split with
   need:["srv"] / need:["nsrv"]; maid-only effects (tin, nt, e67merit, e67srvUp, the servant rank) only through lmmSrv / lmmRk.
   The road: Lưu ma ma's first real task (.5) → a missing sum in the Nội vụ phủ books (.6) → Phùng cô cô accuses ma ma of it (.7) →
   defending the teacher (.8) → the exam / the maid selection (.9) → ma ma falls ill, her box of names (.10) → who takes ma ma's place (.11).
   As a maid she climbs the Nội vụ phủ ladder under ma ma; as a tiểu chủ she protects her old teacher and uses (or shields) the network of
   maids and eunuchs ma ma trained across the palaces. {v} = the consort whose palace (and family silk shop) eats the missing sum: real hostile.
   Story-only NPCs: Lưu ma ma (ROAD_MAP §5.4), Phùng cô cô (NEW: Nội vụ phủ chưởng sự, ma ma's former pupil turned rival, {v}'s hand inside
   Nội vụ phủ; face = mama pool). Same two names in every chapter.
   Beats a tiểu chủ cannot play (handing out the six palaces' coal, stealing a ledger …) have a raised twin (need srv / nsrv); odds that read
   the inner palace's favour use CNV_QV (Hoàng hậu, Thái hậu for an empty seat, the Emperor when both are gone, _hd_cnv.js). */
const LMMR=()=>!!(S.srv&&S.srv.risen);
const LMMT=(m,c)=>A=>{const x=LMMR()?c:m;return typeof x==="function"?x(A):x};
const lmmSrv=o=>{if(!S.srv||S.srv.risen)return"";ap67(o);try{return fmt(o)}catch(e){return""}};
const lmmCon=o=>{if(!LMMR())return"";ap67(o);try{return fmt(o)}catch(e){return""}};
/* ma ma's state after .8: cleared ("win"), freed without her post ("mid"), condemned to Tân Giả khố ("lose") */
const LMMF=()=>rdEnd(8)||"win";
/* the box of names (.10) is whole for the rare finale: .10 ended win or mid, and she did not burn it (flag set by the burn option) */
const LMMBOX=()=>{const e=rdEnd(10);let b="";try{b=S.st.f14.lmmBox||""}catch(x){}return (e==="win"||e==="mid")&&b!=="burn"};
/* the servant rank a chapter ending gives at once (cap: the top servant rank); consort: nothing */
function lmmRk(n){try{if(S.srv&&!S.srv.risen){const old=S.srv.rk||0,to=Math.min(n,SRK.maid.length-1);if(to>old){S.srv.rk=to;S.srv.mp=0;S.srv.ex={};
  try{if(typeof exSrvDrop==="function")exSrvDrop()}catch(e){}log(`<b class="g">Được giao chức ${SRK.maid[to]}</b>.`);return `Được giao chức ${SRK.maid[to]}.`}
  return e67merit(8)}}catch(e){console.error(e)}return""}

rdDef("cnv_ma",5,{t:"Bài học thứ nhất",w:"maid",sj:"việc đầu tiên Lưu ma ma giao",cast(A){return rdCast(A,["v"])},
 g:LMMT("Lưu ma ma giao ngươi việc thật đầu tiên: chia áo rét và than sưởi cho sáu cung trước ngày sương giá đầu mùa. Thiếu một tấm, cung nào cũng có người kêu; thừa một tấm, sổ Nội vụ phủ không khớp.",
  "Than sưởi mùa đông của cung ngươi bị Nội vụ phủ cắt mất ba phần. Lưu ma ma, người thầy cũ, xin vào thỉnh an: bà muốn dạy ngươi bài học đầu tiên của một tiểu chủ, đòi đúng phần lệ mà không gây thù, trước ngày sương giá."),
 p:[["s1","s2"],["c1","c2","c3","c4"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Việc thật đầu tiên",w:"maid",if:RDW(1),t:LMMT("Từ ngày ngươi đỗ kỳ khảo, Lưu ma ma không gọi ngươi là “con bé” nữa. Bà đặt trước mặt ngươi sổ áo rét sáu cung: “Mười ngày nữa sương xuống. Làm đi, ta chỉ xem.”",
   "Lưu ma ma quỳ trước ngươi theo phép, rồi đứng dậy nói như năm xưa: “Tiểu chủ mới lên, người ta thử. Than cắt hôm nay, mai cắt gấm, mốt cắt người.”"),o:[
  {n:"Tự tay kiểm từng tấm",need:["srv"],c:{suc:-6},w:{tin:4},f:"hard",wx:"ma ma gật đầu",lx:"thức trắng mấy đêm, kiệt sức",rt:"Ngươi đếm đến tấm áo cuối cùng khi gà gáy."},
  {n:"Chia việc cho các cung nữ khác",need:["srv"],c:{},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"lead",wx:"việc nhanh",l:{tin:-5},lx:"có đứa làm ẩu, ma ma trách, Chủ tin sút",rt:"Ba ngày đã xong hai cung.",rf:"Một đứa đếm nhầm, áo cung Hoàng hậu thiếu hai tấm."},
  {n:"Xin ma ma dạy phép đòi lệ",need:["nsrv"],c:{suc:-2},w:{duc:2,tamco:1},f:"hard",wx:"biết luật của Nội vụ phủ",lx:"phải học như học trò đến mệt rã",rt:"Ma ma giở sổ lệ: phần than của ngươi ghi rõ từng cân."},
  {n:"Sai người đến thẳng Nội vụ phủ đòi",need:["nsrv"],c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"lead",wx:"than về đủ",l:{danh:-2},lx:"Nội vụ phủ ghi oán, đồn cung ngươi hống hách, tiếng sút",rt:"Than về trước giờ ngọ.",rf:"Người của ngươi bị đuổi về tay không."}]},
 s2:{h:"Lần thứ hai",w:"maid",if:RDW(0),t:LMMT("Ngươi chưa đỗ, vẫn về giặt áo. Nhưng một sáng, Lưu ma ma đứng ở cửa giặt: “Còn một việc. Làm được, ta xin cho ngươi khảo lại.” Việc là chia áo rét sáu cung trước sương giá.",
   "Ngươi đã lên làm tiểu chủ mà chưa từng đỗ kỳ khảo của ma ma. Bà vẫn đến, giọng vẫn nghiêm: “Than cung tiểu chủ bị cắt. Làm chủ mà không giữ nổi phần mình, thì cũng như năm xưa trượt khảo.”"),o:[
  {n:"Nhận việc, không hỏi điều kiện",need:["srv"],c:{suc:-5},w:{tin:5},f:"hard",wx:"ma ma thấy ngươi chịu khó",lx:"vừa giặt vừa làm, sức cạn",rt:"Ngươi giặt ban ngày, đếm áo ban đêm."},
  {n:"Xin ma ma một người phụ",need:["srv"],c:{},o:()=>40+S.tin/4,w:{tamco:2},sc:1,f:"lead",wx:"có người đỡ việc",l:{tin:-5},lx:"ma ma cho là ngươi lười, Chủ tin sút",rt:"Ma ma cho một cung nữ nhỏ theo ngươi.",rf:"Ma ma lạnh lùng: “Ta chọn ngươi, không chọn hai người.”"},
  {n:"Mời ma ma ngồi, xin dạy lại từ đầu",need:["nsrv"],c:{danh:-2},w:{duc:3},f:"hard",wx:"ma ma nguôi giận",lx:"hạ mình trước người hầu cũ, bị cười, tiếng sút",rt:"Ma ma ngồi xuống, lần đầu tiên trước mặt ngươi."},
  {n:"Bảo ma ma đây là việc của cung ngươi",need:["nsrv"],c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"lead",wx:"tỏ ra tự lo được",l:{danh:-2},lx:"mất người thầy, người ta bảo ngươi quên ơn, tiếng sút",rt:"Ma ma cười: “Thế thì tiểu chủ làm cho ta xem.”",rf:"Ma ma lui ra, không quay lại."}]},
 c1:{h:"Phùng cô cô",w:"maid",need:["srv"],t:"Phùng cô cô, chưởng sự của Nội vụ phủ, từng là học trò của Lưu ma ma, đưa ngươi một cuốn sổ khác: “Chép theo sổ này cho nhanh. Sổ cũ của bà ấy rối lắm.”",o:[
  {n:"Cảm ơn, nhưng chép theo sổ cũ",c:{suc:-3},w:{duc:3},f:"honest",wx:"không dính vào sổ lạ",lx:"chép lại cả quyển đến mệt rã; Phùng cô cô phật ý",rt:"Phùng cô cô cười: “Học trò bà ấy, cứng y như bà.”"},
  {n:"Nhận sổ, lén đối chiếu",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"thấy sổ mới thiếu hai mươi tấm gấm",l:{danh:-2},lx:"Phùng cô cô biết ngươi soi, đồn ngươi đa nghi, tiếng sút; ngươi mệt rã",rt:"Sổ mới ít hơn sổ cũ đúng hai mươi tấm gấm Tô Châu.",rf:"Phùng cô cô lấy lại sổ trước khi ngươi so xong."},
  {n:"Chép theo sổ mới",c:{duc:-2},w:{suc:3},wx:"nhẹ việc",lx:"che một chỗ thiếu mà không biết, lòng ngươi áy náy về sau",rt:"Việc xong sớm hai ngày."}]},
 c2:{h:"Cung {v} đòi thêm",w:"v",need:["srv"],t:"Người của cung {v} đến đòi thêm than và áo bông: “Chủ ta sợ lạnh.” Phần ấy không có trong lệ, và nếu đưa, cung khác sẽ thiếu.",o:[
  {n:"Đưa đúng lệ, không thêm",c:{danh:-1},w:{duc:3},f:"honest",wx:"sổ khớp",lx:"{v} ghi oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"Người của {v} bỏ về, đá đổ một sọt than."},
  {n:"Đưa thêm, ghi vào sổ là “hao hụt”",c:{duc:-3},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"{v} hài lòng",l:{danh:-3},lx:"làm sổ gian, lòng ngươi áy náy; hỏng thì sổ có vết, tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?6:2)},rt:"{v} sai người mang sang một hộp mứt cảm ơn.",rf:"Ma ma thấy chữ “hao hụt”, nhíu mày."},
  {n:"Bảo người của {v} đến gặp ma ma",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"không phải mình gánh",l:{danh:-2},lx:"bị cho là đùn đẩy, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Ma ma chỉ nói một câu, người kia cúi đầu lui.",rf:"Người kia về kể {v} là ngươi khinh nàng."}]},
 /* raised twins of c1/c2/t1/x1 (review road-b3-r1 item 4): a tiểu chủ does not hand out the six palaces' coal; her own share was cut */
 c3:{h:"Phùng cô cô",w:"maid",need:["nsrv"],t:"Phùng cô cô, chưởng sự của Nội vụ phủ, từng là học trò của Lưu ma ma, đích thân mang sổ lệ đến cung ngươi: “Lệ mới, than mỗi cung bớt ba phần. Sổ cũ của bà ấy, bỏ rồi.”",o:[
  {n:"Đòi theo sổ cũ của ma ma",c:{suc:-2},w:{duc:3},f:"honest",wx:"không nhận lệ không có chiếu",lx:"đối chiếu từng trang đến mệt rã; Phùng cô cô phật ý",rt:"Phùng cô cô cười: “Học trò bà ấy, cứng y như bà.”"},
  {n:"Nhận sổ lệ mới, lén đối chiếu",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"thấy lệ mới hụt đúng hai mươi tấm gấm",l:{danh:-2},lx:"Phùng cô cô biết ngươi soi, đồn cung ngươi đa nghi, tiếng sút; ngươi mệt rã",rt:"Sổ lệ mới ít hơn sổ cũ đúng hai mươi tấm gấm Tô Châu, phần ấy không về cung nào.",rf:"Phùng cô cô cho người lấy lại sổ trước khi ngươi so xong."},
  {n:"Nhận lệ mới cho yên",c:{duc:-2},w:{suc:3},wx:"nhẹ việc",lx:"cung ngươi chịu thiếu, che một chỗ hở mà không biết, lòng áy náy về sau",rt:"Than về đúng bảy phần. Ngươi cho người khâu thêm chăn."}]},
 c4:{h:"Than cung ngươi ở đâu",w:"v",need:["nsrv"],t:"Người của cung {v} đến cung ngươi: “Chủ ta sợ lạnh. Phần than cung tiểu chủ bị cắt, nghe nói đã chuyển sang cung ta. Tiểu chủ muốn đòi thì cứ đến.”",o:[
  {n:"Sai người đến Nội vụ phủ đòi đúng lệ",c:{suc:-2},o:()=>45+S.danh/4,w:{danh:2},sc:1,f:"honest",wx:"than về đủ",l:{danh:-2},lx:"Nội vụ phủ đùn sang cung {v}, {v} ghi oán; hỏng thì tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?4:2)},rt:"Nội vụ phủ trả lại hai phần than trước giờ ngọ.",rf:"Nội vụ phủ bảo: “Than đã phát, hỏi cung {v}.”"},
  {n:"Nhường cung {v} một phần, đổi lấy một lời hứa",c:{duc:-2},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"{v} nợ ngươi một lần",l:{danh:-2},lx:"nhường của mình cho kẻ ăn bớt, lòng ngươi áy náy; hỏng thì {v} nhận mà không nhớ, tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?6:2)},rt:"{v} sai người mang sang một hộp mứt cảm ơn.",rf:"{v} nhận than, rồi kể khắp nơi cung ngươi sợ nàng."},
  {n:"Mời ma ma ra nói với người của {v}",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"không phải mình gánh",l:{danh:-2},lx:"bị cho là núp sau người thầy, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Ma ma chỉ nói một câu, người kia cúi đầu lui.",rf:"Người kia về kể {v} là ngươi khinh nàng."}]},
 t1:{h:"Thiếu hai mươi tấm",w:"maid",need:["srv"],t:"Đếm lại lần cuối: kho thiếu hai mươi tấm gấm Tô Châu, đúng phần của cung Hoàng hậu. Sương giá còn ba ngày.",o:[
  {n:"Báo ngay với ma ma",c:{danh:-2},w:{duc:2},f:"honest",wx:"ma ma biết sớm",lx:"việc của ngươi thành việc của bà, người ta bảo ngươi non tay, tiếng sút",rt:"Ma ma nhìn sổ, mặt tái đi: “Ta biết ai rồi.”"},
  {n:"Xin đổi gấm thường cho đủ số",need:["srv"],c:{bac:-5},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"số khớp",l:{tin:-6},lx:"Càn Ninh cung biết gấm khác, ma ma trách, Chủ tin sút; bạc mất trắng",rt:"Không ai để ý.",rf:"Ma ma Càn Ninh cung sờ một cái là biết."},
  {n:"Chép riêng một bản sổ để giữ",c:{suc:-2},w:{mat:1},f:"know",wx:"giữ chứng cứ",lx:"chép đến khuya mệt rã; giữ sổ riêng là phạm luật",rt:"Ngươi giấu bản chép trong gối."}]},
 t2:{h:"Thiếu hai mươi tấm",w:"maid",need:["nsrv"],t:"Lưu ma ma giở sổ lệ cùng ngươi đến khuya: than cung ngươi bị cắt, mà kho còn thiếu cả hai mươi tấm gấm Tô Châu, đúng phần của cung Hoàng hậu. Sương giá còn ba ngày.",o:[
  {n:"Tự bù bằng gấm của cung mình",c:{bac:-40},w:{hh:3},wx:"Hoàng hậu không thiếu",lx:"tốn bạc, che kẻ gian",rt:"Gấm cung ngươi đến Càn Ninh cung đúng hẹn."},
  {n:"Để ma ma báo lên Tổng quản",c:{danh:-2},w:{duc:2},f:"honest",wx:"chuyện lên đúng chỗ",lx:"cung ngươi dính vào sổ sách Nội vụ phủ, người ta bảo ngươi lắm chuyện, tiếng sút",rt:"Ma ma chống gậy đi ngay trong đêm: “Ta biết ai rồi.”"},
  {n:"Chép riêng một bản sổ lệ để giữ",c:{suc:-2},w:{mat:1},f:"know",wx:"giữ chứng cứ",lx:"chép đến khuya mệt rã; giữ sổ riêng của Nội vụ phủ là phạm luật",rt:"Ngươi khóa bản chép trong hộp trang sức."}]},
 x1:{h:"Ngày sương giá",w:"maid",need:["srv"],t:"Sương xuống. Sáu cung chờ áo rét và than. Phùng cô cô đứng ở cửa kho, tay cầm sổ.",o:[
  {n:"Giao đủ sáu cung, ghi thiếu đúng chỗ thiếu",c:{suc:-4},o:A=>40+(A.f.honest?15:0)+(A.f.hard?10:0)+S.duc/6,e:["win","lose"],rt:"Sáu cung đủ áo. Trong sổ, dòng thiếu ghi rõ: “chờ Nội vụ phủ tra.”",rf:"Phùng cô cô tâu lên rằng ngươi làm mất gấm."},
  {n:"Giao đủ, lặng lẽ khép sổ",c:{duc:-2},o:A=>45+(A.f.lead?15:0)+S.tamco/6,e:["win","mid"],lx:"che chỗ thiếu trong sổ, lòng ngươi áy náy; hỏng thì chỉ dừng ở giữa",rt:"Sáu cung đủ áo, không ai kêu.",rf:"Có một cung kêu, nhưng nhỏ."},
  {n:"Xin ma ma đứng ra giao",c:{},w:{duc:2},e:"mid",lx:"việc đầu không phải của ngươi, chuyện chỉ dừng ở giữa",rt:"Ma ma đứng ra, ngươi đứng sau."}]},
 x2:{h:"Ngày sương giá",w:"maid",need:["nsrv"],t:"Sương xuống. Than cung ngươi vẫn thiếu ba phần. Phùng cô cô đến thỉnh an, tay cầm sổ lệ mới, chờ ngươi nói một lời.",o:[
  {n:"Đòi đủ phần than theo sổ cũ, chỉ rõ chỗ thiếu",c:{suc:-4},o:A=>40+(A.f.honest?15:0)+(A.f.hard?10:0)+S.duc/6,e:["win","lose"],rt:"Phùng cô cô cúi đầu. Than về đủ trước tối; dòng thiếu trong sổ ghi: “chờ Nội vụ phủ tra.”",rf:"Phùng cô cô tâu lên rằng cung ngươi đòi quá lệ."},
  {n:"Nhận than lệ mới, lặng lẽ cho người mua thêm",c:{bac:-20},o:A=>45+(A.f.lead?15:0)+S.tamco/6,e:["win","mid"],lx:"tốn bạc bù chỗ thiếu, chỗ hở trong sổ vẫn bị che; hỏng thì chỉ dừng ở giữa",rt:"Cung ngươi đủ ấm, không ai kêu.",rf:"Than mua ngoài ít hơn ngươi tưởng."},
  {n:"Mời ma ma đứng ra nói",c:{},w:{duc:2},e:"mid",lx:"việc đầu không phải của ngươi, chuyện chỉ dừng ở giữa",rt:"Ma ma đứng ra, ngươi ngồi sau."}]}},
 E:{win:{k:1,tag:"Việc đầu trót lọt",w:"maid",t:LMMT("Sáu cung đủ áo rét trước sương giá. Lưu ma ma vỗ vai ngươi: “Được.” Cả Nội vụ phủ biết bà có một học trò làm được việc.",
   "Than về đủ, không ai bị mắng. Lưu ma ma cúi chào ngươi theo phép tiểu chủ, nhưng khi lui ra, bà khẽ nói: “Học trò của ta.”"),fx:{danh:4},go:()=>[lmmSrv({tin:6}),e67merit(5),lmmCon({tamco:2})].join(" ")},
  mid:{k:0,tag:"Xong việc, còn nợ một câu hỏi",t:"Việc xong, nhưng hai mươi tấm gấm vẫn chưa ai trả lời. Ma ma không nhắc, ngươi cũng không quên.",fx:{duc:2},go:()=>e67merit(2)},
  lose:{k:-1,tag:"Mang tiếng làm mất gấm",t:LMMT("Phùng cô cô tâu rằng ngươi làm mất gấm. Ngươi bị phạt bổng ba tháng. Lưu ma ma không nói gì, chỉ cầm bản sổ của ngươi đi.",
   "Nội vụ phủ tâu rằng cung ngươi “đòi quá lệ”. Hoàng hậu nhắc một câu trước cả điện. Lưu ma ma cúi đầu nhận lỗi thay ngươi."),fx:{danh:-4},go:()=>[lmmSrv({tin:-6}),lmmCon({[CNV_QK()]:-3})].join(" ")}}});

rdDef("cnv_ma",6,{t:"Sổ sách Nội vụ phủ",w:"eun",sj:"khoản thiếu trong sổ Nội vụ phủ",cast(A){return rdCast(A,["v"])},
 g:"Hai mươi tấm gấm chỉ là đầu mối. Lật sổ ba năm, Nội vụ phủ hụt gần ba trăm lạng bạc gấm vóc. Dấu ấn trên các phiếu xuất là của Phùng cô cô; hàng đi về phía cung {v}. Phải có chứng cứ trước kỳ khóa sổ cuối năm, sau đó sổ niêm phong, không ai lật được nữa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ma ma giao chìa khóa",w:"maid",if:RDW(1),t:LMMT("Lưu ma ma đưa ngươi chìa khóa phòng sổ: “Ban đêm, không ai lên đó. Ta già, mắt kém. Ngươi đọc cho ta.”",
   "Lưu ma ma xin vào cung ngươi lúc chiều tối, trong tay áo là ba cuốn sổ cũ: “Tiểu chủ có người, có đèn, có chỗ kín. Ta xin mượn.”"),o:[
  {n:"Đọc sổ suốt đêm",c:{suc:-5},w:{mat:1},f:"proof",wx:"tìm ra dòng sai",lx:"kiệt sức",rt:"Đến canh tư, ngươi tìm ra mười hai phiếu cùng một nét chữ."},
  {n:"Chỉ chép những trang có dấu Phùng cô cô",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"proof",wx:"nhanh và gọn",l:{danh:-2},lx:"bỏ sót, bị chê làm ẩu, tiếng sút; ngươi mệt rã",rt:"Mười hai phiếu, cùng một dấu, cùng một nơi nhận.",rf:"Ngươi chép sai một trang, phải làm lại."},
  {n:"Khuyên ma ma đừng lật nữa",c:{mat:-1},w:{duc:2},f:"safe",wx:"ma ma được yên",lx:"kẻ gian còn đó, mất một đầu mối",rt:"Ma ma nhìn ngươi lâu, rồi cất sổ: “Ngươi cũng sợ.”"}]},
 s2:{h:"Ma ma bị khóa cửa",w:"maid",if:RDW(0),t:"Sau chuyện áo rét, Phùng cô cô đổi khóa phòng sổ. Lưu ma ma không vào được nữa. Bà chỉ còn bản chép tay ngươi giữ.",o:[
  {n:"Đưa bản chép cho ma ma",c:{mat:-1},w:{duc:2},f:"proof",wx:"ma ma có đầu mối",lx:"bản chép rời tay ngươi, mất một đầu mối",rt:"Ma ma đọc dưới đèn, tay run."},
  {n:"Nhờ tiểu thái giám giữ kho mở cửa",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"vào được phòng sổ",l:{danh:-2},lx:"tiểu thái giám khai ra, tiếng sút; bạc mất trắng",rt:"Tiểu thái giám mở cửa nửa canh giờ.",rf:"Tiểu thái giám nhận bạc rồi báo Phùng cô cô."},
  {n:"Giữ bản chép, chờ thời",c:{danh:-1},w:{tamco:2},f:"safe",wx:"chứng cứ còn trong tay",lx:"kỳ khóa sổ đến gần, người ta bảo ngươi chần chừ, tiếng sút",rt:"Ngươi khâu bản chép vào lót áo."}]},
 c1:{h:"Tiệm lụa ngoài cung",w:"v",t:"Phiếu xuất ghi nơi nhận là cung {v}. Nhưng gấm không ở cung nàng: nó được đem ra bán ở một tiệm lụa ngoài kinh thành, tiệm của nhà ngoại {v}.",o:[
  {n:"Nhờ người ngoài cung mua lại một tấm làm chứng",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"tấm gấm còn dấu Nội vụ phủ",l:{danh:-2},lx:"người ngoài biết chuyện, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)rdOan(A,"v",4)},rt:"Tấm gấm về, mép còn dấu son Nội vụ phủ.",rf:"Tiệm đã cắt mép dấu."},
  {n:"Ghi lại, chưa động",c:{danh:-1},w:{tamco:2},wx:"không lộ",lx:"chưa có vật chứng, người ta bảo ngươi nhát, tiếng sút",rt:"Ngươi ghi tên tiệm vào sổ riêng."},
  {n:"Cho {v} biết là ngươi đã biết",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"{v} phải dè chừng",l:{danh:-3},lx:"{v} ra tay trước, oán nặng; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?6:10)},rt:"{v} ngừng nhận gấm từ Nội vụ phủ.",rf:"{v} cười: “Ngươi là gì mà dám?”"}]},
 c2:{h:"Phùng cô cô thăm dò",w:"maid",t:LMMT("Phùng cô cô gọi ngươi vào phòng riêng, rót trà: “Ngươi thông minh. Bà già ấy sắp về quê rồi. Theo ta, năm sau ngươi có ghế.”",
   "Phùng cô cô xin vào thỉnh an cung ngươi, mang lễ hậu: “Tiểu chủ mới lên, cần người trong Nội vụ phủ. Bà Lưu già rồi. Có nô tỳ, cung tiểu chủ không bao giờ thiếu than.”"),o:[
  {n:"Nhận lời ngoài mặt",c:{duc:-3},o:()=>45+S.tamco/4,w:{tamco:3},sc:1,f:"two",wx:"được vào sâu hơn",l:{danh:-3},lx:"lòng ngươi áy náy vì nói dối; hỏng thì ma ma nghe được, tiếng sút",rt:"Phùng cô cô tin ngươi, cho ngươi xem sổ riêng của bà ta.",rf:"Lưu ma ma thấy ngươi ra khỏi phòng Phùng cô cô."},
  {n:"Từ chối thẳng",c:{danh:-2},w:{duc:3},f:"safe",wx:"giữ nghĩa thầy trò",lx:"kẻ bị từ chối ghi oán, mất lòng người, tiếng sút",rt:"Phùng cô cô đặt chén trà xuống: “Tiếc.”"},
  {n:"Nhận lễ, kể lại cho ma ma",need:["nsrv"],c:{duc:-2},w:{bac:30},wx:"có thêm bạc",lx:"nhận lễ rồi phản, lòng ngươi áy náy; Phùng cô cô sẽ đòi",rt:"Ma ma nghe xong, cười khan: “Nó vẫn thế.”"},
  {n:"Hỏi Phùng cô cô sao lại phản thầy",need:["srv"],c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"nghe được một nửa sự thật",l:{tin:-4},lx:"Phùng cô cô giận, mách ma ma ngươi hỗn, Chủ tin sút",rt:"Phùng cô cô im lâu: “Bà ấy chưa từng tiến cử ta.”",rf:"Phùng cô cô quát ngươi ra ngoài."}]},
 t1:{h:"Kỳ khóa sổ còn năm ngày",w:"eun",t:"Còn năm ngày đến kỳ khóa sổ. Một tiểu thái giám kho thì thầm: Phùng cô cô đang cho người chép lại sổ ba năm, “cho sạch”.",o:[
  {n:"Lấy trộm một cuốn sổ gốc",need:["srv"],c:{suc:-3},o:()=>35+S.mat*5+S.tamco/6,w:{mat:2},sc:2,f:"proof",wx:"có sổ gốc",l:{danh:-4},lx:"trộm sổ là tội nặng, tiếng sút nặng; ngươi mệt rã",rt:"Ngươi ôm cuốn sổ gốc qua ba dãy hành lang mà không ai hỏi.",rf:"Thị vệ thấy bóng người, khóa cổng kho."},
  {n:"Sai người thân tín lấy một cuốn sổ gốc",need:["nsrv"],c:{bac:-20},o:()=>35+S.mat*5+S.tamco/6,w:{mat:2},sc:2,f:"proof",wx:"có sổ gốc",l:{danh:-4},lx:"người của ngươi bị bắt là cả cung mang tiếng trộm sổ, tiếng sút nặng; bạc mất trắng",rt:"Người của ngươi ôm cuốn sổ gốc qua ba dãy hành lang mà không ai hỏi.",rf:"Thị vệ thấy bóng người, khóa cổng kho."},
  {n:"Báo Tổng quản thái giám",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"có người trên biết",l:{danh:-2},lx:"Tổng quản đứng về phía kia, đồn ngươi tố bừa, tiếng sút",rt:"{eun} cho niêm phong kho ngay đêm ấy.",rf:"{eun} gật đầu, rồi không làm gì."},
  {n:"Không làm gì, giữ những gì đã có",c:{mat:-1},w:{duc:2},f:"safe",wx:"không phạm luật",lx:"sổ gốc sẽ bị chép lại, mất một đầu mối",rt:"Ngươi chờ."}]},
 x1:{h:"Đêm khóa sổ",w:"eun",t:"Đêm khóa sổ, Nội vụ phủ đèn đuốc sáng trưng. Ai có chứng cứ thì đưa ra đêm nay, mai sổ đã niêm.",o:[
  {n:"Dâng chứng cứ lên Tổng quản",c:{suc:-4},o:A=>35+(A.f.proof?15:0),e:["win","lose"],rt:"{eun} lật từng trang, rồi cho giữ Phùng cô cô lại.",rf:"{eun} bảo: “Chứng cứ mỏng quá.” Phùng cô cô nhìn ngươi."},
  {n:"Đưa chứng cứ cho ma ma tự xử",c:{mat:-1},o:A=>45+(A.f.safe?10:0)+(A.f.two?10:0),e:["win","mid"],lx:"chứng cứ rời tay ngươi, mất một đầu mối; hỏng thì chỉ dừng ở giữa",rt:"Ma ma cầm sổ đến thẳng Tổng quản, đòi tra.",rf:"Ma ma cất sổ đi: “Chưa phải lúc.”"},
  {n:"Đốt bản chép, giữ mình",c:{},w:{duc:1},e:"mid",lx:"đầu mối mất, chuyện chỉ dừng ở giữa",rt:"Ngọn lửa nhỏ trong lò, ngươi nhìn đến khi tắt."}]}},
 E:{win:{k:1,tag:"Sổ gốc đã ra ánh sáng",w:"eun",t:"Kho Nội vụ phủ bị niêm, Phùng cô cô bị giữ lại hỏi. Nhưng ngươi biết: người như bà ta không ngã một lần là xong.",fx:{danh:5,mat:1},go:A=>{rdOan(A,"v",6);return [lmmSrv({tin:5}),e67merit(4),lmmCon({tamco:2})].join(" ")}},
  mid:{k:0,tag:"Sổ đã niêm",t:"Sổ niêm phong. Chứng cứ còn trong tay ai đó, chưa ai dùng. Phùng cô cô bình yên, nhưng đã biết có người lật sổ.",fx:{duc:2}},
  lose:{k:-1,tag:"Chứng cứ mỏng",t:"Tổng quản gác lại. Phùng cô cô bình yên, và đã biết ai lật sổ. Lưu ma ma bảo ngươi: “Từ giờ, ngủ đừng sâu.”",fx:{danh:-3},go:()=>lmmSrv({tin:-4})}}});

rdDef("cnv_ma",7,{t:"Ma ma bị tố",w:"eun",sj:"lời tố Lưu ma ma",cast(A){return rdCast(A,["v"])},
 g:"Phùng cô cô ra tay trước: bà ta tố chính Lưu ma ma là kẻ ăn bớt gấm vóc ba năm, dấu ấn trên phiếu là “bà ấy mượn dấu của ta”. Thận hình ty đã đến giải ma ma đi. Bảy ngày nữa tra.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Giải đi giữa ngày",w:"eun",if:RDW(1),t:LMMT("Giữa trưa, người Thận hình ty đến Nội vụ phủ, trói Lưu ma ma trước mặt cả đám học trò. Bà không kêu, chỉ nhìn ngươi một cái.",
   "Tin đến cung ngươi giữa trưa: Lưu ma ma bị Thận hình ty giải đi. Người hầu của ngươi, vốn là học trò của bà, quỳ khóc ngoài sân."),o:[
  {n:"Sai người mang áo ấm theo",if:LMMR,c:{suc:-2},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"heart",wx:"ma ma biết ngươi không bỏ",l:{danh:-2},lx:"người ngươi sai bị đuổi về, cung ngươi bị ghi là che người có tội, tiếng sút",rt:"Người Thận hình ty nhận áo, cho bà khoác thêm.",rf:"Người Thận hình ty đuổi người ngươi sai về, ném áo xuống đất."},
  {n:"Chạy theo, xin cho mang áo ấm",if:()=>!LMMR(),c:{suc:-2},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"heart",wx:"ma ma biết ngươi không bỏ",l:{danh:-2},lx:"bị ghi là đồng bọn, tiếng sút; chạy theo đến rã người",rt:"Người Thận hình ty cho bà khoác thêm áo.",rf:"Người Thận hình ty đẩy ngươi ngã."},
  {n:"Đứng yên, ghi nhớ từng người",c:{duc:-2},w:{tamco:2},f:"cold",wx:"biết ai vui ai buồn",lx:"ma ma đi một mình, lòng ngươi cắn rứt",rt:"Phùng cô cô đứng ở hành lang, khóe miệng cong lên."},
  {n:"Sai người mang bạc lo lót trong ngục",need:["nsrv"],c:{bac:-30},w:{duc:2},wx:"ma ma không bị đánh",lx:"tốn bạc, lộ là ngươi che",rt:"Ma ma được ở phòng có cửa sổ."}]},
 s2:{h:"Ma ma đã nhận tội?",w:"eun",if:RDW(0),t:"Ngươi nghe tin: Lưu ma ma bị giải đi, và có người nói bà đã điểm chỉ một tờ nhận tội. Ngươi không tin.",o:[
  {n:"Sai người tin cẩn vào ngục gặp bà",if:LMMR,c:{bac:-10},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"heart",wx:"biết sự thật",l:{danh:-2},lx:"tên cung ngươi vào sổ thăm tù, tiếng sút; bạc mất trắng",rt:"Người ngươi sai về kể: ma ma lắc đầu, “Ta chưa điểm chỉ gì cả.”",rf:"Lính ngục không cho vào."},
  {n:"Xin vào ngục gặp bà",if:()=>!LMMR(),c:{bac:-10},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"heart",wx:"biết sự thật",l:{danh:-2},lx:"tên ngươi vào sổ thăm tù, tiếng sút; bạc mất trắng",rt:"Ma ma lắc đầu: “Ta chưa điểm chỉ gì cả.”",rf:"Lính ngục không cho vào."},
  {n:"Dò xem tờ nhận tội ở đâu",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"biết tờ ấy giả",l:{danh:-2},lx:"Thận hình ty biết ngươi dò, tiếng sút; ngươi mệt rã",rt:"Tờ nhận tội điểm chỉ ngón trái. Ma ma thuận tay trái đã cụt một đốt từ năm xưa.",rf:"Không ai cho xem."},
  {n:"Lặng lẽ giữ khoảng cách",c:{danh:-2},w:{duc:1},f:"cold",wx:"không bị kéo vào",lx:"ma ma tưởng ngươi bỏ bà, người ta bảo ngươi bạc, tiếng sút",rt:"Ngươi không đến."}]},
 c1:{h:"Học trò của ma ma",w:"maid",t:LMMT("Mấy cung nữ cùng được ma ma dạy rủ nhau ký đơn xin tha. Nếu đơn bị bác, ai ký cũng bị ghi tên.",
   "Học trò của Lưu ma ma đang hầu ở các cung tìm đến ngươi: họ muốn ký đơn xin tha, nhưng cần một tiểu chủ đứng tên đầu."),o:[
  {n:"Ký tên đầu",c:{danh:-2},o:()=>40+S.danh/4,w:{duc:3},sc:1,f:"heart",wx:"cả mạng lưới của ma ma đứng sau ngươi",l:{danh:-2},lx:"ký là mang tiếng bênh người có tội; hỏng thì đơn bị bác, tiếng sút thêm",rt:"Hai mươi ba cái tên, tên ngươi ở đầu.",rf:"Đơn bị giữ lại ở cửa Thận hình ty."},
  {n:"Bảo họ chưa ký, chờ chứng cứ",c:{danh:-1},w:{tamco:2},f:"cold",wx:"không ai bị ghi tên oan",lx:"họ cho là ngươi nhát, tiếng sút",rt:"Họ gật đầu, nhưng có người bỏ về."},
  {n:"Ghi tên từng người, giữ lại cho sau",c:{suc:-2},w:{mat:1},wx:"biết ai còn trung với ma ma",lx:"chép đến mệt rã; giữ danh sách là việc nguy",rt:"Ngươi chép hai mươi ba cái tên vào lót áo."}]},
 c2:{h:"{v} đứng sau",w:"v",t:"Có tin: chính {v} đã xin Hoàng hậu cho Thận hình ty “tra cho nghiêm”. Nàng muốn vụ án khép nhanh, trước khi ai hỏi đến tiệm lụa nhà ngoại nàng.",o:[
  {n:"Tìm gặp {v}",c:{suc:-2},o:()=>35+S.duc/4+S.danh/6,w:{duc:2},sc:1,wx:"{v} nới tay",l:{danh:-2},lx:"{v} biết ngươi biết, trở mặt; tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} khẽ nói: “Ta chỉ cần án khép. Ai chịu tội, ta không quan tâm.”",rf:"{v} quay đi."},
  {n:"Gửi lời đến Hoàng hậu trước {v}",c:{},o:()=>35+CNV_QV()/4+S.danh/5,w:{hh:2},sc:1,wx:"Hoàng hậu không nghe một phía",l:{hh:-3},lx:"Hoàng hậu thấy phiền, không vui",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu dặn Thận hình ty: “Tra cho rõ, đừng vội.”",rf:"Hoàng hậu không tiếp."},
  {n:"Im lặng, không động đến {v}",c:{danh:-2},w:{duc:1},wx:"không thêm kẻ thù",lx:"{v} rảnh tay, người ta bảo ngươi sợ, tiếng sút",rt:"Ngươi để {v} yên."}]},
 t1:{h:"Phùng cô cô gặp riêng",w:"maid",t:LMMT("Phùng cô cô chặn ngươi ở hành lang: “Đưa ta bản chép sổ, ta rút lời tố. Bà ấy về quê dưỡng già, ngươi có ghế. Ai cũng yên.”","Phùng cô cô xin gặp riêng: “Tiểu chủ đưa nô tỳ bản chép sổ, nô tỳ rút lời tố. Bà ấy về quê dưỡng già, cung tiểu chủ không bao giờ thiếu than. Ai cũng yên.”"),o:[
  {n:"Đưa bản chép",c:{duc:-4},w:{suc:3},f:"deal",wx:"ma ma có thể về yên",lx:"chứng cứ mất, lòng ngươi cắn rứt",rt:"Phùng cô cô cầm bản chép, đốt ngay trước mặt ngươi."},
  {n:"Đưa bản chép giả",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"proof",wx:"bà ta tưởng đã thắng",l:{danh:-3},lx:"lộ thì thành thù sống chết, tiếng sút; ngươi mệt rã",rt:"Phùng cô cô đốt bản giả, cười.",rf:"Phùng cô cô lật hai trang là biết."},
  {n:"Từ chối",c:{suc:-2},w:{duc:3},f:"heart",wx:"giữ được chứng cứ",lx:"Phùng cô cô càng ra tay nặng, ngươi giữ thế đến mệt rã",rt:"Phùng cô cô bỏ đi, không nói."}]},
 x1:{h:"Ngày đầu tra",w:"eun",t:LMMT("Ngày đầu tra hỏi. Thận hình ty gọi người làm chứng. Tên ngươi có trong danh sách.","Ngày đầu tra hỏi. Ngươi nay là tiểu chủ, Thận hình ty không được gọi ngươi đến tận nơi; {eun} sai người đến cung ngươi lấy lời chứng, viết thành tờ đóng dấu cung."),o:[
  {n:"Khai đúng những gì đã thấy trong sổ",c:{suc:-3},o:A=>35+(A.f.proof?15:0),e:["win","lose"],rt:"Lời ngươi khớp với sổ gốc. Thận hình ty cho hoãn án, gọi Phùng cô cô.",rf:"Lời ngươi không có vật chứng, bị gạt đi."},
  {n:"Khai ít, chỉ nói ma ma là người tốt",c:{},o:A=>45+(A.f.heart?15:0),e:["mid","lose"],lx:"lời tốt không thay được chứng cứ, hỏng thì ma ma bị xử nặng",rt:"Thận hình ty ghi: “Có người bảo lãnh.” Án hoãn.",rf:"Thận hình ty cho là ngươi bênh thầy."},
  {n:"Cáo bệnh, không làm chứng",c:{duc:-3},w:{suc:3},e:"mid",lx:"ma ma không có ai nói giúp, lòng ngươi cắn rứt; án chỉ treo lại",rt:LMMT("Ngươi nằm trong phòng, nghe tiếng trống tra vọng lại.","Ngươi cáo bệnh, không viết tờ chứng nào. Chiều ấy tiếng trống tra vọng đến tận cung ngươi.")}]}},
 E:{win:{k:1,tag:"Án hoãn, Phùng cô cô bị gọi",w:"eun",t:"Thận hình ty hoãn án Lưu ma ma, gọi Phùng cô cô đến hỏi. Lần đầu tiên, bà ta phải quỳ.",fx:{danh:4},go:A=>{rdOan(A,"v",4);return lmmSrv({tin:4})}},
  mid:{k:0,tag:"Án treo",t:"Án treo. Ma ma vẫn trong ngục, nhưng chưa bị xử. Còn ít ngày để tìm cách.",fx:{duc:1}},
  lose:{k:-1,tag:"Ma ma bị xử nặng",t:"Thận hình ty nghiêng về lời tố. Ma ma bị đánh hai mươi trượng, chờ xử chung thẩm. Phùng cô cô được giao giữ sổ.",fx:{danh:-3},go:()=>lmmSrv({tin:-5})}}});

rdDef("cnv_ma",8,{t:"Bảo vệ thầy",w:"maid",sj:"Lưu ma ma trước ngày chung thẩm",cast(A){return rdCast(A,["v"])},
 g:"Ba ngày nữa Thận hình ty xử chung thẩm. Muốn cứu Lưu ma ma phải có một trong ba thứ trước ngày ấy: sổ gốc, người làm chứng, hoặc một lời của người trên. Mỗi thứ đều có giá.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phùng cô cô run tay",w:"maid",if:RDW(1),t:"Phùng cô cô bị gọi tra, về Nội vụ phủ thì đóng cửa ba ngày. Người của bà ta chạy ra vào cung {v} liên tục.",o:[
  {n:"Cho người canh cửa cung {v}",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"biết họ bàn gì",l:{danh:-2},lx:"{v} phát hiện, thêm oán; tiếng sút; bạc mất trắng",go:(A,ok)=>{if(!ok)rdOan(A,"v",6)},rt:"Người canh thấy Phùng cô cô mang một rương gỗ vào cung {v}.",rf:"Người canh bị bắt, khai tên ngươi."},
  {n:"Thừa thắng, xin Tổng quản xét nhanh",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"high",wx:"án đi nhanh",l:{danh:-2},lx:"bị nói là nóng vội, tiếng sút; ngươi mệt rã",rt:"{eun} hứa xét ngay ngày chung thẩm.",rf:"{eun} bảo: “Đừng dạy ta làm việc.”"},
  {n:"Báo tin vui vào ngục",c:{bac:-5},w:{duc:2},wx:"ma ma có sức chờ",lx:"tốn chút bạc lo cửa ngục; lộ đường đi của ngươi",rt:LMMT("Ma ma nắm tay ngươi qua song sắt.","Người ngươi sai về kể: ma ma nghe tin, cười lần đầu từ ngày bị giải đi.")}]},
 s2:{h:"Ma ma yếu đi",w:"doc",if:RDW(0),t:"Sau trận đòn, Lưu ma ma sốt cao trong ngục. Nếu bà không gượng nổi đến ngày chung thẩm, án sẽ khép theo lời tố.",o:[
  {n:"Lo thuốc vào ngục",c:{bac:-10},w:{duc:3},f:"heart",wx:"ma ma qua cơn sốt",lx:"tốn bạc, có người thấy",rt:"Ma ma uống thuốc, đêm ấy hạ sốt."},
  {n:"Xin thái y vào khám",c:{suc:-2},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"high",wx:"có thái y làm chứng vết đòn",l:{danh:-2},lx:"Thái y viện ngại dính vào, đồn ngươi làm to chuyện, tiếng sút",rt:"Thái y ghi vết đòn vào sổ.",rf:"Thái y không dám đến."},
  {n:"Viết lại lời khai của ma ma",c:{suc:-2},w:{mat:1},f:"proof",wx:"có lời khai trước khi muộn",lx:"chép đến đèn cạn, ngươi mệt rã",rt:LMMT("Ma ma đọc, ngươi chép, đến khi đèn cạn.","Ma ma đọc, người ngươi sai vào ngục chép, đến khi đèn cạn.")}]},
 c1:{h:"Tiểu thái giám giữ kho",w:"eun",t:"Tiểu thái giám giữ kho từng thấy Phùng cô cô tự đóng dấu phiếu xuất. Hắn sợ: làm chứng thì mất mạng nghề, không làm thì lương tâm cắn.",o:[
  {n:"Hứa che chở cho hắn",c:{suc:-2},o:()=>40+S.danh/4+(LMMR()?10:0),w:{duc:2},sc:1,f:"wit",wx:"có nhân chứng",l:{danh:-2},lx:"hắn bỏ trốn, người ta bảo ngươi hứa suông, tiếng sút; ngươi mệt rã",rt:"Hắn gật đầu: “Nô tài nói.”",rf:"Hắn bỏ trốn khỏi kinh thành."},
  {n:"Cho hắn bạc về quê sau khi khai",c:{bac:-20},o:()=>50+S.mat*4,w:{mat:1},sc:1,f:"wit",wx:"nhân chứng chắc",l:{danh:-3},lx:"mang tiếng mua chứng, tiếng sút; bạc mất trắng",rt:"Hắn nhận bạc, hứa khai.",rf:"Hắn nhận bạc rồi đổi lời."},
  {n:"Để hắn tự quyết",c:{mat:-1},w:{duc:2},wx:"không ép ai",lx:"có thể không có nhân chứng, mất một đầu mối",rt:"Hắn cúi đầu, không hứa."}]},
 c2:{h:"Người trên",w:"hh",if:CNV_QON,t:LMMT("Lưu ma ma từng dạy ma ma thân cận của Hoàng hậu. Nếu ngươi đến xin, một cung nữ nhỏ có thể bị đuổi ra, cũng có thể được nghe một câu.",
   "Lưu ma ma từng dạy ma ma thân cận của Hoàng hậu. Một tiểu chủ đến xin, Hoàng hậu sẽ nghe, nhưng sẽ nhớ ngươi nợ bà một lần."),o:[
  {n:"Đến Càn Ninh cung xin",c:{hh:-2},o:()=>35+S.danh/4+CNV_QV()/5,w:{danh:2},sc:1,f:"high",wx:"Hoàng hậu nhắc Thận hình ty",l:{hh:-3},lx:"nợ Hoàng hậu một lần; hỏng thì bà thấy ngươi lắm chuyện, không vui thêm",rt:"Hoàng hậu nói: “Tra cho công bằng.” Câu ấy đến Thận hình ty trước khi trời tối.",rf:"Hoàng hậu không tiếp."},
  {n:"Nhờ ma ma Càn Ninh cung nói giúp",c:{bac:-10},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"có lời bên tai Hoàng hậu",l:{danh:-2},lx:"nợ một ân tình, hỏng thì đồn ra, tiếng sút; bạc mất trắng",rt:"Ma ma Càn Ninh cung gật đầu: “Thầy ta cũng là thầy ngươi.”",rf:"Bà ấy sợ, từ chối."},
  {n:"Không cầu người trên",c:{danh:-2},w:{duc:2},wx:"không nợ ai",lx:"không có ai đỡ, người ta bảo ngươi kiêu, tiếng sút",rt:"Ngươi tự lo."}]},
 t1:{h:"Đêm trước chung thẩm",w:"maid",t:"Đêm trước chung thẩm, Phùng cô cô gửi lời: “Bà ấy nhận một nửa, ta nhận một nửa. Không ai chết, không ai thắng.”",o:[
  {n:"Chuyển lời cho ma ma",c:{tamco:-1},w:{duc:2},f:"deal",wx:"ma ma tự quyết",lx:"lời ấy là cái bẫy, ngươi bớt sắc sảo",rt:"Ma ma nghe, im rất lâu: “Để ta nghĩ.”"},
  {n:"Từ chối thay ma ma",c:{suc:-2},w:{tamco:2},f:"high",wx:"không lùi một bước",lx:"có thể mất cả; ngươi giữ thế đến mệt rã",rt:"Ngươi gửi lại một chữ: “Không.”"},
  {n:"Đòi Phùng cô cô nhận cả",c:{},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,f:"high",wx:"bà ta lung lay",l:{danh:-2},lx:"bà ta liều, đồn ngươi ép người, tiếng sút",rt:"Người đưa tin của bà ta run run lui ra.",rf:"Phùng cô cô cười lạnh."}]},
 x1:{h:"Chung thẩm",w:"eun",t:LMMT("Thận hình ty mở án chung thẩm. Lưu ma ma quỳ một bên, Phùng cô cô quỳ một bên. Tổng quản thái giám ngồi trên.","Thận hình ty mở án chung thẩm. Lưu ma ma quỳ một bên, Phùng cô cô quỳ một bên. Tổng quản thái giám ngồi trên. Ngươi là tiểu chủ, không ngồi ở đó được: thái giám cung ngươi mang sổ và lời ngươi đến thay."),o:[
  {n:"Đưa nhân chứng và sổ ra",c:{suc:-4},o:A=>35+(A.f.wit?15:0)+(A.f.proof?10:0),e:["win","lose"],rt:"Tiểu thái giám khai, sổ gốc khớp từng dòng. Phùng cô cô cúi rạp.",rf:"Nhân chứng run rẩy đổi lời. Sổ không đủ."},
  {n:"Xin Tổng quản xét lòng ma ma ba mươi năm",c:{danh:-2},o:A=>40+(A.f.high?15:0)+(A.f.heart?10:0)+S.danh/6,e:["win","mid"],lx:"đem tình riêng ra xin, người ta bảo ngươi bênh thầy, tiếng sút; không bắt được kẻ gian, hỏng thì ma ma mất chức",rt:"{eun} gật đầu: “Ba mươi năm không một vết.” Ma ma được tha.",rf:"Ma ma được tha tội, nhưng mất chức."},
  {n:"Chấp nhận mỗi bên nhận một nửa",c:{duc:-3},w:{suc:2},e:"mid",lx:"ma ma mang một nửa tội không phải của bà, lòng ngươi cắn rứt",rt:"Hai người cùng bị phạt bổng. Không ai thắng."}]}},
 E:{win:{k:1,tag:"Thầy được minh oan",w:"maid",t:"Lưu ma ma được tha, trở về Nội vụ phủ. Phùng cô cô bị cắt bổng, giáng xuống giữ kho. Bà ta nhìn ngươi khi đi ngang: chưa xong đâu.",fx:{danh:6,duc:2},go:A=>{rdOan(A,"v",6);return [lmmSrv({tin:8}),e67merit(5),lmmCon({mat:1})].join(" ")}},
  mid:{k:0,tag:"Thầy được tha mà mất chức",t:"Lưu ma ma được tha, nhưng mất chức chưởng quản. Bà dọn về một gian nhà nhỏ cuối Nội vụ phủ. Phùng cô cô vẫn ngồi chỗ cũ.",fx:{duc:2},go:()=>e67merit(2)},
  lose:{k:-1,tag:"Thầy bị đày Tân Giả khố",t:"Lưu ma ma bị xử đày Tân Giả khố. Ba mươi năm dạy người, cuối cùng về giặt áo. Phùng cô cô lên ngồi ghế của bà.",fx:{danh:-4},go:A=>{rdOan(A,"v",3);return lmmSrv({tin:-6})}}}});

rdDef("cnv_ma",9,{t:"Kỳ sát hạch",w:"eun",sj:"kỳ sát hạch của Nội vụ phủ",cast(A){return rdCast(A,["v"])},
 g:LMMT("Kỳ sát hạch cuối năm của Nội vụ phủ: ai qua được thì lên chưởng sự. Ba bài: bày yến, giữ sổ, dạy người. Người chấm năm nay có cả Phùng cô cô.",
  "Kỳ tuyển cung nữ cuối năm: mỗi tiểu chủ được chọn người về hầu. Phùng cô cô lo danh sách, và trong danh sách có tai mắt của {v}. Học trò của Lưu ma ma cũng đứng đó."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ma ma ngồi ghế chấm",w:"maid",if:()=>LMMF()==="win",t:LMMT("Lưu ma ma đã về ghế cũ, ngồi chấm cạnh Phùng cô cô. Bà dặn ngươi: “Ta không nâng ngươi. Ngươi tự qua.”",
   "Lưu ma ma đã về ghế cũ, lặng lẽ đưa ngươi một mảnh giấy: tên bảy cung nữ bà dạy, và tên ba người “đừng nhận”."),o:[
  {n:"Ôn lại từng bài như năm đầu",need:["srv"],c:{suc:-5},w:{tai:2},f:"hard",wx:"tay nghề chắc",lx:"không còn sức cho việc khác",rt:"Ngươi bưng khay trà qua sân sỏi, không sóng một giọt."},
  {n:"Dò bài Phùng cô cô sẽ ra",need:["srv"],c:{bac:-8},o:()=>40+S.mat*5,w:{tamco:2},sc:1,f:"know",wx:"biết trước bẫy",l:{tin:-5},lx:"ma ma biết ngươi dò bài, Chủ tin sút; bạc mất trắng",rt:"Bài giữ sổ có một trang sai cố ý.",rf:"Người dò bài bán tin cho Phùng cô cô."},
  {n:"Nhận danh sách của ma ma",need:["nsrv"],c:{danh:-2},w:{mat:1},f:"know",wx:"biết chọn ai",lx:"chọn theo danh sách là đắc tội Phùng cô cô, bị chê thiên vị, tiếng sút",rt:"Ngươi gấp mảnh giấy vào tay áo."},
  {n:"Tự xem người, không cần danh sách",need:["nsrv"],c:{suc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"hard",wx:"mắt của mình",l:{danh:-1},lx:"có thể nhận nhầm, tiếng sút; ngươi mệt rã",rt:"Ngươi nhìn ra một cung nữ đếm sai cố ý.",rf:"Ngươi chọn trúng một người của {v}."}]},
 s2:{h:"Không còn thầy bên cạnh",w:"maid",if:()=>LMMF()!=="win",t:LMMT("Lưu ma ma không còn ghế chấm. Phùng cô cô ngồi giữa, nhìn ngươi như nhìn một bài đã chấm trượt sẵn.",
   "Lưu ma ma không còn ghế trong Nội vụ phủ. Phùng cô cô lo cả danh sách tuyển, và người nào bà ta đưa đến cung ngươi, ngươi biết là tai mắt của ai."),o:[
  {n:"Đến hỏi ma ma một lời",c:{bac:-5},w:{tamco:2},f:"know",wx:"ma ma vẫn dạy",lx:"tốn bạc lo cửa; bị thấy đi gặp người có tội",rt:"Ma ma chỉ nói: “Bài thứ ba, đừng sợ.”"},
  {n:"Làm như không có gì",c:{suc:-2},w:{duc:2},f:"hard",wx:"không ai bắt bẻ",lx:"đi một mình, gồng đến mệt rã",rt:"Ngươi bước vào như mọi người."},
  {n:"Xin đổi người chấm",c:{suc:-2},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"bớt một bàn tay",l:{danh:-2},lx:"Phùng cô cô càng ghét, đồn ngươi sợ thi, tiếng sút; ngươi mệt rã",rt:"{eun} cho thêm một người chấm ngoài.",rf:"{eun} bảo: “Ai chấm cũng là chấm.”"}]},
 c1:{h:"Hoàng thượng đi qua",w:"emp",t:LMMT("Giữa bài bày yến, có tiếng hô giá. Hoàng thượng đi tắt qua sân Nội vụ phủ, dừng lại nhìn bàn yến của ngươi.",
   "Hoàng thượng ghé qua kỳ tuyển, ngồi cạnh ngươi xem một lúc: “Nàng chọn người kiểu gì?”"),o:[
  {n:"Cúi đầu làm tiếp",need:["srv"],c:{tai:-1},w:{nt:5,duc:2},wx:"ngài thấy ngươi chăm chú",lx:"không dám ngẩng lên, tài mọn không được thấy",rt:"Ngài nhìn lâu rồi đi, không nói gì."},
  {n:"Dâng ngài một chén trà",need:["srv"],c:{suc:-2},o:()=>40+S.sac/4,w:{nt:12},sc:1,wx:"ngài nhớ mặt ngươi",l:{tin:-5},lx:"Phùng cô cô ghi là rời bài, ma ma trách, Chủ tin sút",rt:"Ngài uống, hỏi: “Học ai?” Ngươi thưa: Lưu ma ma.",rf:"Phùng cô cô bị chấm hạ vì rời bàn."},
  {n:"Thưa: chọn người như ma ma đã dạy",need:["nsrv"],c:{},o:()=>40+S.tai/4,w:{sung:2},sc:1,wx:"ngài nhớ tên Lưu ma ma",l:{danh:-2},lx:"Phùng cô cô nghe, đồn ngươi kết bè, tiếng sút",rt:"Ngài gật đầu: “Bà ấy dạy được người.”",rf:"Ngài chỉ ừ một tiếng."},
  {n:"Mời ngài cùng chọn",need:["nsrv"],c:{suc:-2},w:{sung:2},wx:"ngài vui",lx:"chọn đến mệt rã; người ngài chọn có thể là tai mắt",rt:"Ngài chỉ một cung nữ đứng cuối hàng."}]},
 c2:{h:"Tai mắt của {v}",w:"v",t:LMMT("Một thí sinh cùng kỳ là người cung {v}: nàng ta được báo bài trước, và được dặn làm ngươi trượt bài bày yến.",
   "Ba người trong hàng tuyển là tai mắt {v} gửi qua Phùng cô cô. Nhận thì cung ngươi có thêm tai mắt người ngoài; không nhận thì Phùng cô cô sẽ hỏi vì sao."),o:[
  {n:"Đề phòng mà không làm ầm",c:{suc:-2},w:{tamco:2},f:"know",wx:"không bị gài",lx:"đề phòng đến mệt rã; kẻ gài vẫn còn",rt:"Ngươi giữ mắt trên bàn yến của mình."},
  {n:"Tố với người chấm ngoài",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"kẻ gài bị loại",l:{danh:-2},lx:"{v} biết, thêm oán; hỏng thì tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Người chấm ngoài cho kẻ ấy ra khỏi hàng.",rf:"Không ai tin."},
  {n:"Nhận một người, để dùng ngược",need:["nsrv"],c:{},o:()=>40+S.tamco/3,w:{mat:2},sc:1,wx:"có đường đưa tin giả cho {v}",l:{danh:-2},lx:"tai mắt ở ngay trong cung, hỏng thì tiếng sút, {v} thêm oán",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"Người ấy về cung ngươi, mang theo đúng những gì ngươi muốn {v} biết.",rf:"Người ấy biết bị dùng, báo lại {v}."}]},
 t1:{h:"Bài thứ ba: dạy người",w:"maid",t:LMMT("Bài cuối: dạy một cung nữ mới trong một nén nhang. Phùng cô cô chọn cho ngươi đứa vụng nhất.",
   "Bài cuối của kỳ tuyển: mỗi tiểu chủ nói vì sao chọn người mình chọn. Phùng cô cô hỏi ngươi trước mặt mọi người."),o:[
  {n:"Dạy như ma ma đã dạy",need:["srv"],c:{suc:-3},o:()=>40+S.tai/4+S.duc/6,w:{danh:2},sc:1,f:"hard",wx:"cách của Lưu ma ma được nhắc lại",l:{danh:-2},lx:"Phùng cô cô bắt bẻ, tiếng sút; ngươi mệt rã",rt:"Đứa vụng bưng khay qua sân, chỉ sóng một giọt.",rf:"Đứa vụng làm đổ khay."},
  {n:"Kể vì sao chọn từng người, như ma ma đã dạy",need:["nsrv"],c:{suc:-3},o:()=>40+S.tai/4+S.duc/6,w:{danh:2},sc:1,f:"hard",wx:"cách của Lưu ma ma được nhắc lại",l:{danh:-2},lx:"Phùng cô cô bắt bẻ, tiếng sút; ngươi mệt rã",rt:"Ngươi kể từng người ngươi chọn và vì sao. Phùng cô cô không bắt được chỗ nào.",rf:"Ngươi nói vấp một chỗ, Phùng cô cô bắt bẻ ngay."},
  {n:"Nói thẳng về sổ sách năm xưa",c:{},o:()=>35+S.danh/4,w:{danh:3},sc:1,wx:"Phùng cô cô mất mặt",l:{danh:-3},lx:LMMT("khơi chuyện cũ giữa kỳ thi, tiếng sút","khơi chuyện cũ giữa kỳ tuyển, tiếng sút"),rt:"Phùng cô cô đỏ mặt, ngồi im.",rf:LMMT("Tổng quản gạt đi: “Đây là kỳ thi.”","Tổng quản gạt đi: “Đây là kỳ tuyển.”")},
  {n:"Nói ít, làm gọn",c:{danh:-1},w:{duc:2},wx:"không bị bắt bẻ",lx:"không ai nhớ, tiếng ngươi nhạt đi",rt:"Ngươi xong trước nén nhang."}]},
 x1:{h:"Ngày công bố",w:"eun",t:LMMT("Tổng quản đọc danh sách người lên chưởng sự. Phùng cô cô cầm bút, chờ ghi.",
   "Danh sách tuyển công bố. Người về cung nào là người của cung ấy cả đời."),o:[
  {n:"Đứng thẳng chờ",c:{danh:-2},o:A=>40+(A.f.hard?15:0)+S.duc/6,e:["win","mid"],lx:"phó mặc cho người chấm, người ta bảo ngươi không dám nói, tiếng sút; hỏng thì chỉ dừng ở giữa",rt:LMMT("Tên ngươi được đọc đầu tiên.","Người ngươi chọn được đọc tên đầu tiên."),rf:LMMT("Tên ngươi được đọc, nhưng ở cuối.","Người ngươi chọn được đọc tên, nhưng kèm một tai mắt.")},
  {n:"Nhắc Tổng quản những gì đã thấy",c:{suc:-3},o:A=>35+(A.f.know?15:0)+S.danh/5,e:["win","lose"],rt:LMMT("{eun} gạch một cái tên của Phùng cô cô, ghi tên ngươi vào.","{eun} gạch ba cái tên Phùng cô cô cài vào, đưa người ngươi chọn về cung ngươi."),rf:"{eun} cho là ngươi tranh."},
  {n:"Nhường chỗ cho học trò khác của ma ma",c:{},w:{duc:3},e:"mid",lx:"chờ thêm một kỳ, chuyện chỉ dừng ở giữa",rt:LMMT("Ngươi lùi một bước. Một người khác của ma ma được đọc tên.","Ngươi nhường người giỏi nhất cho một cung khác. Một học trò của ma ma được đọc tên ở đó.")}]}},
 E:{win:{k:1,tag:"Qua kỳ sát hạch",w:"eun",t:LMMT("Ngươi qua cả ba bài. Tên ngươi vào danh sách chờ ghế chưởng sự. Phùng cô cô ghi tên ngươi bằng nét bút rất mạnh.",
   "Cung ngươi nhận đúng những người ngươi muốn. Bảy học trò của Lưu ma ma về các cung, và cả bảy đều biết ai đã đứng ra."),fx:{danh:5},go:A=>{rdOan(A,"v",4);return [lmmSrv({tin:4}),e67merit(6),lmmCon({mat:2})].join(" ")}},
  mid:{k:0,tag:"Qua mà chưa có ghế",t:LMMT("Ngươi qua, nhưng xếp cuối. Năm nay chưa có ghế cho ngươi.","Ngươi nhận được người, nhưng cũng nhận một tai mắt. Phùng cô cô vẫn giữ danh sách."),fx:{duc:2},go:()=>e67merit(3)},
  lose:{k:-1,tag:"Bị đánh trượt",t:LMMT("Phùng cô cô chấm ngươi trượt bài giữ sổ “vì sửa sổ cũ”. Ngươi chờ thêm một năm.",
   "Phùng cô cô đổi danh sách vào giờ chót: ba người về cung ngươi đều là người của {v}."),fx:{danh:-3},go:()=>[lmmSrv({tin:-4}),lmmCon({mat:-1})].join(" ")}}});

rdDef("cnv_ma",10,{t:"Ma ma lâm bệnh",w:"doc",sj:"bệnh của Lưu ma ma",cast(A){return rdCast(A,["v"])},
 g:LMMT("Sau bao năm và một trận tra, Lưu ma ma ngã bệnh. Bà gọi ngươi đến, chỉ vào một chiếc hộp gỗ dưới giường: trong đó là tên mọi cung nữ, thái giám bà từng dạy, ở khắp các cung. Phùng cô cô cũng biết chiếc hộp ấy có thật.",
  "Lưu ma ma ngã bệnh. Bà xin vào cung ngươi một lần cuối, mang theo chiếc hộp gỗ: tên mọi cung nữ, thái giám bà từng dạy, ở khắp các cung. “Trao cho tiểu chủ, hay đốt đi, ta chưa quyết.”"),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bệnh từ lúc nào",w:"doc",if:RDW(1),t:()=>`${LMMF()==="lose"?"Từ Tân Giả khố, tin báo ra: Lưu ma ma ho ra máu, nằm trên đống áo bẩn.":"Lưu ma ma đang ngồi chấm sổ thì gục xuống."} Thái y nói: phải có nhân sâm trước khi trăng tròn, không thì khó qua.`,o:[
  {n:"Lo nhân sâm",c:{bac:-15},w:{duc:3},f:"heart",wx:"ma ma qua cơn",lx:"bạc trong hộp vơi đi một khoản",rt:"Nhân sâm đến kịp. Ma ma mở mắt."},
  {n:"Xin Thái y viện cấp thuốc theo lệ",c:{suc:-2},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"rule",wx:"không tốn bạc riêng",l:{danh:-2},lx:"Thái y viện chậm, đồn ngươi lắm chuyện, tiếng sút; ngươi mệt rã",rt:"Thái y viện cấp thuốc trong ba ngày.",rf:"Thái y viện bảo: “Ma ma không có lệ sâm.”"},
  {n:"Tự sắc thuốc thức đêm",c:{suc:-6},w:{duc:3},f:"heart",wx:"ma ma biết ai ở bên",lx:"sức ngươi cạn",rt:"Ma ma nắm tay ngươi: “Như mẹ ta ngày xưa.”"}]},
 s2:{h:"Bệnh trong lúc đen đủi",w:"doc",if:RDW(0),t:()=>`${LMMF()==="lose"?"Ở Tân Giả khố, Lưu ma ma không còn ai chăm. Người ta để bà nằm cạnh lò hấp áo.":"Không có ghế, không có lương, Lưu ma ma ngã bệnh trong gian nhà nhỏ cuối Nội vụ phủ."} Phải có thuốc trước khi trăng tròn.`,o:[
  {n:"Đưa thuốc lén vào",c:{bac:-10},o:()=>45+S.mat*4,w:{duc:3},sc:1,f:"heart",wx:"ma ma có thuốc",l:{danh:-2},lx:"bị bắt mang đồ cho người có tội, tiếng sút; bạc mất trắng",rt:"Thuốc đến tay ma ma đúng đêm sốt nặng nhất.",rf:"Người canh tịch thu thuốc."},
  {n:"Xin Tổng quản cho bà ra chỗ ấm",c:{suc:-2},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"rule",wx:"bà có chỗ nằm",l:{danh:-2},lx:"Tổng quản ghi ngươi nợ, đồn ra, tiếng sút; ngươi mệt rã",rt:"{eun} cho bà về phòng có lò sưởi.",rf:"{eun} không trả lời."},
  {n:"Gửi lời, không dám đến",c:{duc:-3},w:{suc:2},wx:"giữ mình",lx:"ma ma một mình, lòng ngươi cắn rứt",rt:"Lời gửi đi. Ma ma đọc xong, cười buồn."}]},
 c1:{h:"Phùng cô cô đến thăm",w:"maid",t:"Phùng cô cô mang theo một hộp bánh đến thăm Lưu ma ma. Bà ta ngồi bên giường lâu, mắt không rời gầm giường.",o:[
  {n:"Ngồi lại đến khi bà ta về",c:{suc:-3},w:{tamco:2},f:"guard",wx:"hộp gỗ không rời mắt ngươi",lx:"mất cả buổi, ngồi đến mỏi rã",rt:"Phùng cô cô ngồi đến tối, rồi về tay không."},
  {n:"Mời bà ta ra, nói thẳng",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"bà ta biết đã bị nhìn thấu",l:{danh:-2},lx:"bà ta liều hơn, đồn ngươi gây sự, tiếng sút",rt:"Phùng cô cô bỏ về, để quên cả hộp bánh.",rf:"Phùng cô cô bảo: “Ta thăm thầy ta, ngươi là gì?”"},
  {n:"Để hai thầy trò cũ nói chuyện",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"peace",wx:"có thể hòa",l:{mat:-1},lx:"hộp gỗ có thể mất, mất một đầu mối",rt:"Ngươi nghe tiếng Phùng cô cô khóc sau cửa.",rf:"Sáng ra, hộp gỗ đã bị lục."}]},
 c2:{h:"{v} muốn chiếc hộp",w:"v",t:"{v} sai người đến hỏi mua chiếc hộp gỗ, trả một giá rất cao. Có tên trong hộp, nàng sẽ biết ai trong các cung có thể mua chuộc.",o:[
  {n:"Từ chối thẳng",c:{danh:-2},w:{duc:3},f:"guard",wx:"giữ được mạng lưới",lx:"kẻ bị từ chối ghi oán, mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",6)},rt:"Người của {v} về, mặt hằm hằm."},
  {n:"Bán một bản chép giả",c:{duc:-3},o:()=>40+S.tamco/3,w:{bac:40},sc:1,wx:"bạc vào, {v} mua phải tên sai",l:{danh:-3},lx:"lừa người, lòng ngươi áy náy; lộ thì thành thù sống chết, tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?4:12)},rt:"{v} trả bạc cho một danh sách toàn người đã xuất cung.",rf:"{v} nhận ra, sai người đến đòi bạc lại."},
  {n:"Báo Hoàng hậu {v} dòm ngó người các cung",c:{},o:()=>35+CNV_QV()/4+S.danh/5,w:{hh:2},sc:1,wx:"{v} bị nhắc",l:{hh:-2},lx:"Hoàng hậu hỏi chiếc hộp có gì, không vui",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Hoàng hậu nhắc {v} “đừng nhúng tay vào việc Nội vụ phủ”.",rf:"Hoàng hậu hỏi ngược: “Hộp gì?”"}]},
 t1:{h:"Ma ma kể chuyện cũ",w:"maid",t:"Đêm ấy ma ma tỉnh, kể: năm xưa bà từng che cho một chưởng sự ăn bớt, vì người ấy có mẹ già. Người ấy là Phùng cô cô. Bà chưa từng tiến cử nàng, vì sợ nàng lại tham.",o:[
  {n:"Khuyên ma ma nói với Phùng cô cô",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"peace",wx:"có thể gỡ nút thắt",l:{danh:-1},lx:"Phùng cô cô không nghe, đồn ra, tiếng sút",rt:"Ma ma gật đầu: “Mai gọi nó đến.”",rf:"Ma ma lắc đầu: “Muộn rồi.”"},
  {n:"Ghi lại lời ma ma làm chứng",c:{suc:-2},w:{mat:1},f:"guard",wx:"thêm một lá bài",lx:"chép đến mệt rã; lấy lời người bệnh làm vũ khí",rt:"Ngươi chép, ma ma điểm chỉ."},
  {n:"Bảo ma ma nghỉ, đừng nghĩ nữa",c:{mat:-1},w:{duc:2},wx:"ma ma yên giấc",lx:"chuyện cũ chôn theo, mất một đầu mối",rt:"Ma ma ngủ, tay vẫn nắm tay ngươi."}]},
 x1:{h:"Chiếc hộp gỗ",w:"maid",t:LMMT("Ma ma mở hộp, đặt tay lên những cuốn sổ nhỏ: “Trao cho ngươi, ngươi sẽ có cả Nội vụ phủ, và cả kẻ thù của ta. Đốt đi, mọi người được yên.”",
   "Ma ma đặt chiếc hộp lên bàn cung ngươi: “Một tiểu chủ có mạng lưới này, sẽ không ai dám động. Nhưng người trong ấy là người của ta, không phải quân của ai.”"),o:[
  {n:"Nhận hộp, hứa giữ người trong ấy",c:{suc:-3},o:A=>35+(A.f.guard?15:0),e:["win","lose"],rt:"Ma ma đặt hộp vào tay ngươi, nhắm mắt nhẹ nhõm.",rf:"Đêm ấy, có người lẻn vào lấy mất nửa hộp."},
  {n:"Xin ma ma tự giữ đến khi khỏe",c:{bac:-15},o:A=>45+(A.f.heart?15:0)+(A.f.peace?10:0),e:["win","mid"],lx:"lo thuốc thang để ma ma tự giữ hộp, tốn bạc; hộp chưa về tay ngươi, hỏng thì chỉ dừng ở giữa",rt:"Ma ma cười: “Thế thì ta phải khỏe.” Đêm ấy bà hạ sốt.",rf:"Ma ma giữ hộp, bệnh không thêm không bớt."},
  {n:"Đốt hộp cùng ma ma",c:{mat:-1},w:{duc:4},e:"mid",go:()=>{try{S.st.f14.lmmBox="burn"}catch(e){}return""},lx:"mạng lưới tan, mất một đầu mối",rt:"Hai người ngồi nhìn lửa đến khi chỉ còn tro."}]}},
 E:{win:{k:1,tag:"Ma ma qua cơn bệnh",w:"maid",t:"Lưu ma ma qua cơn bệnh. Chiếc hộp gỗ ở chỗ an toàn, và Phùng cô cô biết bà ta không lấy được nữa.",fx:{danh:3,duc:2},go:()=>[lmmSrv({tin:5}),lmmCon({mat:1})].join(" ")},
  mid:{k:0,tag:"Ma ma yếu dần",t:"Ma ma qua được đợt này, nhưng yếu đi nhiều. Bà nói đã đến lúc xin về quê.",fx:{duc:2}},
  lose:{k:-1,tag:"Nửa hộp gỗ bị lấy",t:"Nửa chiếc hộp gỗ biến mất trong đêm. Mấy ngày sau, ba cung nữ có tên trong ấy bị đổi đi cung {v}.",fx:{danh:-3,mat:-1},go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("cnv_ma",11,{t:"Chưởng sự",w:"maid",sj:"ghế của Lưu ma ma",cast(A){return rdCast(A,["v"])},
 g:LMMT("Lưu ma ma xin xuất cung về quê. Ghế chưởng sự của bà còn trống, và Phùng cô cô đã ngồi gần nhất. Ai ngồi ghế ấy, người ấy giữ cả lớp cung nữ mới. Đây là kết cục truyện xuất thân của ngươi.",
  "Lưu ma ma xin xuất cung về quê. Ghế của bà ở Nội vụ phủ còn trống, và Phùng cô cô đã ngồi gần nhất. Ai ngồi ghế ấy, người ấy giữ than, gấm và người của cả hậu cung. Đây là kết cục truyện xuất thân của ngươi."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ma ma tiến cử",w:"maid",if:RDW(1),t:LMMT("Trước khi đi, Lưu ma ma viết một tờ tiến cử, đặt tên ngươi lên đầu. Tờ ấy phải đến tay Tổng quản trước ngày bà xuất cung.",
   "Trước khi đi, Lưu ma ma hỏi ngươi: “Ghế của ta, tiểu chủ muốn ai ngồi?” Bà sẽ viết tên ấy vào tờ tiến cử, trước ngày xuất cung."),o:[
  {n:"Tự mang tờ tiến cử đến Tổng quản",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"seat",wx:"tờ tiến cử đến tay",l:{danh:-2},lx:"bị nói là tự tiến cử, tiếng sút; ngươi mệt rã",rt:"{eun} đọc, gật đầu: “Bà Lưu chưa từng tiến cử ai.”",rf:"{eun} bảo để đó."},
  {n:"Xin ma ma viết tên học trò khác",c:{danh:-2},w:{duc:3},f:"give",wx:"không ai nói ngươi tham",lx:"ghế không về tay ngươi, người ta bảo ngươi nhún quá, tiếng sút",rt:"Ma ma nhìn ngươi, rồi viết một tên khác, nét bút chậm."},
  {n:"Xin ma ma đừng tiến cử ai",c:{danh:-2},w:{tamco:2},f:"wait",wx:"không ai thành bia",lx:"để ghế cho người mạnh nhất, tiếng ngươi sút",rt:"Ma ma gấp giấy lại: “Cũng được.”"}]},
 s2:{h:"Ma ma ra đi lặng lẽ",w:"maid",if:RDW(0),t:"Lưu ma ma xin xuất cung, không ai tiễn. Bà đi qua cổng Thần Vũ với một tay nải nhỏ. Ghế của bà, Phùng cô cô đã dọn vào trước khi bà ra khỏi cổng.",o:[
  {n:"Ra cổng Thần Vũ tiễn bà",c:{suc:-2},w:{duc:4},f:"give",wx:"nghĩa thầy trò trọn",lx:"đi bộ ra cổng đến mỏi rã; bị thấy đi tiễn người có tội",rt:"Ma ma quay lại, cúi đầu chào ngươi một lần."},
  {n:"Tặng bà bạc lộ phí",c:{bac:-10},w:{duc:3},wx:"bà về quê đỡ khổ",lx:"bạc trong hộp vơi đi một khoản",rt:"Ma ma nhận, gói vào khăn."},
  {n:"Đứng xa nhìn theo",c:{duc:-2},w:{tamco:2},f:"wait",wx:"không ai ghi tên ngươi",lx:"bà không biết ngươi đến, lòng ngươi áy náy",rt:"Ngươi đứng trên lầu, nhìn đến khi bà khuất."}]},
 c1:{h:"Phùng cô cô ngả giá",w:"maid",t:LMMT("Phùng cô cô gọi ngươi: “Ghế ấy ta ngồi. Ngươi làm phó, ta không đụng đến ngươi.”",
   "Phùng cô cô xin vào cung ngươi, quỳ rất thấp: “Nô tỳ ngồi ghế ấy, cung tiểu chủ năm nào cũng đủ than đủ gấm. Còn chuyện cũ, nô tỳ không nhắc.”"),o:[
  {n:"Từ chối",c:{suc:-2},w:{duc:3},f:"seat",wx:"không bán nghĩa thầy",lx:"Phùng cô cô càng ra tay nặng, ngươi giữ thế đến mệt rã",rt:"Phùng cô cô đứng dậy, phủi gối: “Rồi xem.”"},
  {n:"Nhận lời, giữ lại tờ lời khai của ma ma",c:{duc:-3},w:{tamco:3},f:"wait",wx:"yên, mà vẫn cầm thóp",lx:"bắt tay kẻ phản thầy, lòng ngươi cắn rứt; Nội vụ phủ trong tay Phùng cô cô",rt:"Phùng cô cô biết ngươi cầm thứ gì. Bà ta cúi đầu sâu hơn."},
  {n:"Bảo bà ta đi gặp ma ma trước",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,f:"give",wx:"có thể hòa",l:{danh:-1},lx:"bà ta không đi, đồn ngươi dạy đời, tiếng sút",rt:"Phùng cô cô ra cổng Thần Vũ, quỳ trước tay nải của thầy.",rf:"Phùng cô cô cười: “Gặp để làm gì?”"}]},
 c2:{h:"{v} chen vào",w:"v",t:"{v} xin Hoàng hậu cho một ma ma của cung nàng ngồi ghế ấy, “người già dặn”. Có ghế ấy, gấm vóc Nội vụ phủ lại chảy về tiệm lụa nhà nàng.",o:[
  {n:"Dâng lên Hoàng hậu chuyện tiệm lụa",c:{suc:-2},o:()=>35+S.mat*5+S.danh/6,w:{danh:3},sc:1,f:"seat",wx:"{v} phải rút",l:{hh:-2},lx:"Hoàng hậu thấy phiền, không vui; {v} thêm oán; ngươi mệt rã",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"Hoàng hậu bác người của {v}.",rf:"Hoàng hậu bảo: “Chuyện cũ, đừng nhắc.”"},
  {n:"Gặp {v} chia phần",c:{duc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,wx:"{v} lui",l:{danh:-2},lx:"chia phần với kẻ gian, lòng ngươi áy náy; hỏng thì {v} trở mặt, tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} rút người, đổi lấy một phần gấm mỗi năm.",rf:"{v} nhận lời rồi vẫn tiến cử."},
  {n:"Để Hoàng hậu tự xét",c:{danh:-2},w:{duc:2},wx:"không gây thù",lx:"{v} có thể thắng, người ta bảo ngươi buông tay, tiếng sút",rt:"Ngươi không nói gì."}]},
 t1:{h:"Học trò của ma ma",w:"maid",t:"Hai mươi ba học trò của Lưu ma ma ở các cung gửi tin: họ chờ một lời của ngươi. Một lời, họ cùng ký tên xin cho người ngươi chọn.",o:[
  {n:"Xin họ cùng ký",c:{suc:-2},o:()=>40+S.mat*4+S.danh/6,w:{mat:1},sc:1,f:"seat",wx:"cả mạng lưới đứng ra",l:{danh:-2},lx:"lộ ra ngươi có cả một mạng lưới, tiếng sút; ngươi mệt rã",rt:"Hai mươi ba cái tên, mực còn ướt.",rf:"Mấy người sợ, rút tên."},
  {n:"Bảo họ đứng ngoài, giữ mình",c:{mat:-1},w:{duc:3},f:"give",wx:"không ai bị liên lụy",lx:"mất một sức mạnh, mất một đầu mối",rt:"Họ nhận lời, nhưng ai cũng gửi kèm một chữ “Chờ”."},
  {n:"Chỉ nhờ ba người thân nhất",c:{danh:-1},w:{tamco:2},f:"wait",wx:"kín mà chắc",lx:"ít tiếng nói, tiếng ngươi nhỏ đi",rt:"Ba người, ba lời, đến tai Tổng quản vào ba lúc khác nhau."}]},
 x1:{h:"Tổng quản chọn người",w:"eun",t:LMMT("Tổng quản gọi ba người vào: ngươi, Phùng cô cô và một ma ma già. “Ghế này, ai ngồi được?”",
   "Tổng quản đến cung ngươi: “Hoàng hậu giao việc chọn người cho nô tài. Nô tài muốn nghe một lời của tiểu chủ.”"),o:[
  {n:"Nói: ghế ấy phải về người của Lưu ma ma",c:{suc:-4},o:A=>35+(A.f.seat?15:0)+S.danh/6,e:["win","lose"],rt:"{eun} gật đầu chậm: “Người của bà Lưu, thì sổ sẽ sạch.”",rf:"{eun} lắc đầu: “Ai cũng nói thế.”"},
  {n:"Nói: ai ngồi cũng được, miễn sổ sạch",c:{mat:-1},o:A=>45+(A.f.give?15:0)+S.duc/6,e:["win","mid"],lx:"không đòi ghế cho người của ma ma, mạng lưới lỏng ra; hỏng thì chỉ dừng ở giữa",rt:"{eun} cười: “Câu ấy, bà Lưu cũng nói.”",rf:"{eun} chọn người già nhất."},
  {n:"Không nói gì",c:{},w:{duc:2},e:"mid",lx:"để ghế cho người khác quyết, chuyện chỉ dừng ở giữa",rt:"Ngươi chỉ cúi đầu."}]}},
 E:{win:{k:1,tag:"Người nối nghiệp Lưu ma ma",w:"maid",t:LMMT(`Ngươi ngồi ghế của Lưu ma ma. Ngày nhận chức, ngươi bưng khay trà đầy đi qua sân sỏi Nội vụ phủ, không sóng một giọt. Cả lớp cung nữ mới đứng nhìn.`,
   "Ghế của Lưu ma ma về tay học trò bà, người do ngươi chọn. Than, gấm và người của Nội vụ phủ, từ nay đi qua tay người của ngươi. Ma ma gửi về một lá thư: “Giữ lấy họ.”"),fx:{danh:8},go:A=>{rdOan(A,"v",4);return [lmmRk(BAL.road.cnvMaRk),lmmCon({mat:2,tamco:2})].join(" ")}},
  mid:{k:0,tag:"Ghế về tay người khác",t:LMMT("Ghế về tay một ma ma già, không phe ai. Ngươi được ghi tên chờ kỳ sau. Lưu ma ma về quê, mang theo nụ cười yên lòng.",
   "Ghế về tay một ma ma già, không phe ai. Nội vụ phủ không thuộc về ngươi, nhưng cũng không còn rò. Lưu ma ma về quê yên lòng."),fx:{duc:3,danh:2},go:()=>e67merit(6)},
  lose:{k:-1,tag:"Nội vụ phủ về tay Phùng cô cô",t:LMMT("Phùng cô cô ngồi ghế. Việc đầu tiên bà ta làm là đẩy ngươi về giặt áo. Đường còn dài, chỉ là từ chỗ thấp nhất.",
   "Phùng cô cô ngồi ghế. Mùa đông năm ấy, than cung ngươi lại thiếu ba phần, và học trò của Lưu ma ma bị đổi đi từng người một."),fx:{danh:-4},go:A=>{rdOan(A,"v",4);return [lmmSrv({tin:-8}),lmmCon({mat:-1})].join(" ")}}}});
RD97L.push({a:"cnv_ma_11",tag:"Lưu ma ma trao lại cả Nội vụ phủ",w:"maid",p:.12,n:"Mời Lưu ma ma và Phùng cô cô cùng ngồi một bàn",c:{suc:-4},
 path:["Bảo bà ta đi gặp ma ma","Ra cổng Thần Vũ tiễn bà","Xin họ cùng ký","Từ chối","chuyện tiệm lụa","Tự mang tờ tiến cử"],np:2,bad:["Nhận lời, giữ lại tờ lời khai","Gặp {v} chia phần"],sc:2,x:[()=>S.duc>=35&&LMMBOX(),"Đức từ 35, chiếc hộp gỗ còn nguyên"],
 t:"Ngươi mời Lưu ma ma và Phùng cô cô ngồi chung một bàn, đặt chiếc hộp gỗ ở giữa. Ma ma mở hộp, nói với Phùng cô cô điều bà giấu ba mươi năm. Phùng cô cô khóc, tự dâng sổ riêng lên Tổng quản. Trước khi xuất cung, ma ma trao chiếc hộp cho ngươi: từ Càn Ninh cung đến Tân Giả khố, ở đâu cũng có người gọi ngươi là “học trò của Lưu ma ma”.",
 fx:{danh:10,mat:2,duc:3},go:()=>[lmmRk(BAL.road.cnvMaRk),lmmCon({tamco:3})].join(" "),rw:"nt_haiduong",ti:"Học trò của Lưu ma ma"});
CNV_QFIX("cnv_ma");
