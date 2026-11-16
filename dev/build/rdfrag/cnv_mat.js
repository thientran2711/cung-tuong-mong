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

rdDef("cnv_mat",5,{t:"Chủ nhân ghen",w:"mis",sj:"cơn ghen của {mis}",cast(A){return MATM()&&rdCast(A,["v"],MATV)},
 g:MATT("Từ đêm Trung thu, {mis} nhìn ngươi như nhìn cái gai trong mắt. Nàng đày ngươi làm việc nặng, chờ ngươi tự ngã. Chịu đựng, né tránh, hay tìm chỗ dựa khác.",
  "Ngươi nay là tiểu chủ, nhưng {mis} vẫn coi ngươi là nô tỳ cũ của nàng. Trước mặt cả hậu cung, nàng muốn ngươi cúi đầu như xưa. Cúi, ngẩng, hay tìm chỗ dựa khác."),
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sau lời hỏi xin",w:"mis",if:()=>rdK()>0&&rdPrev()!=="win2",t:MATT("Hoàng thượng đã hỏi xin ngươi, nhưng thánh chỉ chưa xuống. Trong lúc chờ, {mis} sai ngươi ra hậu viện giặt áo giữa tháng rét: “Muốn lên cao thì tập quen đất lạnh trước.”",
   "Thánh chỉ đã xuống, ngươi dọn khỏi dãy nhà cung nữ. Sáng hôm sau thỉnh an, {mis} nói đủ cho cả điện nghe: “Nô tỳ của ta, mặc áo mới vẫn là nô tỳ của ta.”"),o:[
  {n:"Cắn răng giặt áo",need:["srv"],c:{suc:-6},w:{tin:5},f:"bear",wx:"chủ thấy ngươi biết phận",lx:"tay nứt nẻ, ngươi kiệt sức, mà Hoàng thượng chẳng thấy ngươi",rt:"Mười ngày sau, {mis} cho ngươi về hầu trà. Nàng không nói gì, nhưng thôi lườm."},
  {n:"Nhờ tiểu thái giám truyền tin cho Hoàng thượng",need:["srv"],c:{bac:-8},o:()=>40+S.nt/4,w:{nt:8},sc:1,f:"bold",wx:"ngài biết ngươi bị đày",l:{tin:-10},lx:"chủ biết ngươi mách, Chủ tin sút; bạc mua miệng mất trắng",rt:"Hoàng thượng sai người mang lò sưởi tay ra hậu viện. Cả cung im phắc.",rf:"Tiểu thái giám nhận bạc rồi đem chuyện kể cho {mis}."},
  {n:"Cúi đầu đáp lễ như xưa",need:["nsrv"],c:{danh:-3},w:{duc:3},f:"bear",wx:"người ta thấy ngươi không quên gốc",lx:"bị cười là còn nô tính, tiếng ngươi sút",go:()=>matMis(4),rt:"Ngươi cúi đầu. {mis} sững lại, rồi quay đi không nói nữa."},
  {n:"Đáp: nay thiếp cùng hầu Hoàng thượng như tỷ",need:["nsrv"],c:{suc:-2},o:()=>40+S.tai/4+S.danh/5,w:{danh:3},sc:1,f:"bold",wx:"cả điện nể ngươi",l:{sung:-2},lx:"thành chuyện cãi nhau trước Hoàng hậu, Hoàng thượng phiền, Sủng sút; {mis} thêm oán",go:(A,ok)=>matMis(0,ok?8:4),rt:"Câu đáp vừa đủ lễ vừa đủ cứng. {mis} đỏ mặt, không cãi được.",rf:"Hoàng hậu nhíu mày: “Mới lên đã học cãi.”"},
  {n:"Lặng lẽ tìm {v} xin chỗ dựa",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người che chở",l:{danh:-2},lx:"{v} trở mặt, đồn ngươi đi cầu cạnh, tiếng sút; lòng ngươi áy náy vì tìm kẻ thù của chủ cũ",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} mỉm cười: “Người ta không thương ngươi, ta thương.”",rf:"{v} chỉ hứa suông, rồi đem chuyện ra làm trò cười."}]},
 s2:{h:"Chủ tiến cử rồi hối",w:"mis",if:()=>rdPrev()==="win2",t:MATT("Chính {mis} tự tay tiến cử ngươi. Nhưng từ đó Hoàng thượng đến cung chỉ hỏi “con bé pha trà đâu”. Đêm qua nàng ngồi một mình rất lâu, sáng nay sai ngươi trực đêm suốt một tháng.",
   "Chính {mis} tiến cử ngươi lên. Nay ngài đến cung ngươi nhiều hơn đến cung nàng. Nàng gửi sang một hộp bánh, kèm một lời: “Đừng quên ai đã mở cửa cho ngươi.”"),o:[
  {n:"Trực đêm không than",need:["srv"],c:{suc:-5},w:{tin:6},f:"bear",wx:"chủ nguôi dần",lx:"thức trắng, sức tàn",rt:"Đến đêm thứ hai mươi, {mis} khoác cho ngươi tấm áo bông của nàng."},
  {n:"Thưa thật với chủ: nô tỳ không dám quên ơn",need:["srv"],c:{},o:()=>45+S.tin/4,w:{tin:8},sc:1,f:"bear",wx:"chủ tin lời ngươi",l:{tin:-6},lx:"chủ cho là ngươi khéo miệng, Chủ tin sút",go:(A,ok)=>matMis(ok?6:-3),rt:"{mis} thở dài: “Ta biết. Chỉ là ta sợ.”",rf:"{mis} cười nhạt: “Miệng ngươi ngọt thật.”"},
  {n:"Đáp lễ hậu hơn",need:["nsrv"],c:{bac:-30},w:{duc:3},f:"bear",wx:"nàng thấy ngươi nhớ ơn",lx:"tốn bạc, nàng vẫn ghen",go:()=>matMis(6),rt:"Ngươi gửi lại một bộ trâm. {mis} cầm lên ngắm rất lâu."},
  {n:"Khuyên Hoàng thượng đến cung {mis}",need:["nsrv"],c:{sung:-3},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"bear",wx:"{mis} biết ngươi nhường",l:{sung:-2},lx:"đẩy ngài đi là mất ơn, Sủng sút; hỏng thì ngài phật ý, sút thêm",go:(A,ok)=>matMis(ok?10:2),rt:"Đêm ấy ngài ngự cung {mis}. Sáng ra nàng sai người mang sang một đĩa mứt.",rf:"Ngài cau mày: “Trẫm đi đâu, không cần nàng xếp.”"},
  {n:"Gặp {v} hỏi chuyện cung {mis}",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"biết nàng sắp làm gì",l:{danh:-2},lx:"{v} khoe khắp nơi ngươi đến tìm, tiếng sút; lòng ngươi áy náy",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} kể: {mis} đã hỏi Kính sự phòng tên ngươi.",rf:"{v} đem chuyện kể lại cho {mis}."}]},
 s3:{h:"Bị đày việc nặng",w:"mis",if:RDW(0),t:MATT("Sau đêm Trung thu, {mis} đẩy ngươi xuống bếp sau, ngày gánh nước, đêm canh lò. Ai nhắc tên ngươi trước mặt nàng đều bị phạt.",
   "Ngươi đã được phong, nhưng {mis} đi khắp các cung kể chuyện ngươi từng làm vỡ chén, từng ăn vụng, từng bị phạt quỳ. Chuyện cũ thành trò cười mới."),o:[
  {n:"Gánh nước, không nói một lời",need:["srv"],c:{suc:-6},w:{duc:3,tin:3},f:"bear",wx:"cả bếp thương ngươi",lx:"gánh nước đến kiệt sức, Hoàng thượng không thấy ngươi nữa",rt:"Lão thái giám bếp lén cho ngươi bát cháo nóng."},
  {n:"Hát khẽ bài dân ca bên giếng",need:["srv"],c:{},o:()=>35+S.sac/4,w:{nt:10},sc:1,f:"bold",wx:"có người đứng nghe",l:{tin:-8},lx:"chủ cho là ngươi cố ý, Chủ tin sút",rt:"Sáng hôm sau, ngự thiện phòng nhận lệnh: “Ai hát bên giếng, cho về hầu trà.”",rf:"Người nghe là chưởng sự, mách lại với {mis}."},
  {n:"Cười mà nhận hết",need:["nsrv"],c:{danh:-3},w:{duc:4},f:"bear",wx:"người ta thấy ngươi rộng lượng",lx:"chuyện cũ càng lan, tiếng ngươi sút",rt:"Ngươi cười: “Đúng là thiếp từng làm vỡ chén của tỷ.” Câu chuyện tự nhạt."},
  {n:"Kể lại một chuyện cũ của {mis}",need:["nsrv"],c:{duc:-3},o:()=>40+S.tamco/4,w:{danh:2},sc:1,f:"bold",wx:"nàng biết ngươi cũng có chuyện để nói",l:{danh:-3},lx:"thành ra hai người cùng mất mặt, tiếng sút; lòng ngươi áy náy, {mis} thêm oán",go:()=>matMis(0,6),rt:"{mis} im bặt. Từ đó nàng thôi kể.",rf:"Cả hậu cung bàn tán cả hai."},
  {n:"Lặng lẽ tìm {v} xin chỗ dựa",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người che chở",l:{danh:-2},lx:"{v} trở mặt, đồn ngươi đi cầu cạnh, tiếng sút; lòng ngươi áy náy vì tìm kẻ thù của chủ cũ",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} cho người đến xin ngươi sang giúp việc vài hôm.",rf:"{v} cười, bảo ngươi tự lo."}]},
 c1:{h:"Một chén trà bị đổ",w:"mis",t:MATT("Hoàng thượng ghé cung. {mis} cố ý gọi ngươi dâng trà, rồi hất tay áo cho chén trà đổ lên long bào.",
   "Yến nhỏ ở cung Hoàng hậu. {mis} cố ý gọi ngươi rót trà như thuở còn hầu nàng, rồi hất tay áo cho chén trà đổ lên vạt áo Hoàng thượng."),o:[
  {n:"Quỳ nhận lỗi về mình",c:{suc:-4},w:{duc:4},f:"bear",wx:"không ai bị kéo vào",lx:"quỳ đến rã gối, bị phạt oan",go:()=>{matMis(4);return matSrv({tin:4})},rt:"Hoàng thượng phẩy tay: “Thôi.” Ngài nhìn {mis} lâu hơn một chút."},
  {n:"Lau áo cho ngài, nói khẽ một câu",c:{},o:()=>40+S.sac/4+S.tai/6,w:{sung:2},sc:1,f:"bold",wx:"ngài cười",l:{danh:-3},lx:"bị nói là lẳng lơ trước mặt chủ, tiếng sút; {mis} thêm oán",go:(A,ok)=>{matMis(0,ok?6:3);if(ok)return matSrv({nt:6})},rt:"Ngài bật cười, quên cả chén trà.",rf:"Ngài lạnh mặt đứng dậy."},
  {n:"Lặng lẽ cho người thấy tay {mis} hất",c:{},o:()=>35+S.tamco/3,w:{tamco:2},sc:1,wx:"có người làm chứng",l:{duc:-2},lx:"{mis} biết ngươi đề phòng nàng, thêm oán; lòng ngươi áy náy",go:(A,ok)=>matMis(0,ok?8:4),rt:"Một tiểu thái giám thấy rõ. Chuyện đến tai ngài.",rf:"Không ai dám nói đã thấy."}]},
 c2:{h:"{v} đưa tay",w:"v",t:MATT("{v} lại sai người đến: nếu ngươi chịu sang hầu nàng, nàng sẽ xin Nội vụ phủ đổi người. Nàng chỉ cần ngươi kể chuyện cung {mis}.",
   "{v} mời ngươi đến thưởng hoa, nói nhỏ: “Nàng ta ghen, ai cũng thấy. Ngươi đứng với ta, ta che cho ngươi.” Cái giá là những chuyện ngươi biết về cung {mis}."),o:[
  {n:"Nhận lời {v}",c:{duc:-4},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người đứng sau",l:{danh:-3},lx:"thành kẻ phản chủ cũ, lòng ngươi cắn rứt, {mis} bớt tin; hỏng thì tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?10:-4);matMis(-6);return matSrv({tin:-8})},rt:"{v} nắm tay ngươi: “Từ nay là người nhà.”",rf:"{v} lấy được tin rồi trở mặt."},
  {n:"Từ chối, báo {mis}",if:MATM,c:{danh:-1},w:{duc:3},wx:"người cũ biết ngươi giữ lòng",lx:"{v} phật ý, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",6);matMis(6);return matSrv({tin:6})},rt:"{mis} nghe xong, im rất lâu."},
  {n:"Đưa {v} tin vặt, giữ lại tin thật",c:{},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,wx:"cả hai bên đều tưởng ngươi theo mình",l:{danh:-3},lx:"lộ thì cả hai cùng ghét, {v} thêm oán, tiếng ngươi sút",go:(A,ok)=>{if(!ok)rdOan(A,"v",8)},rt:"{v} hài lòng với mấy chuyện vặt.",rf:"{v} nhận ra ngươi đùa nàng."}]},
 t1:{h:"Chủ ra lệnh cuối",w:"mis",if:MATM,t:MATT("{mis} gọi ngươi vào: “Ta cho ngươi chọn: ở lại hầu ta trọn đời, ta tiến cử ngươi lên Đại cung nữ. Hoặc đi, và đừng mong ai ở cung này nhắc tên ngươi.”",
   "{mis} hẹn ngươi ở đình sau: “Ngươi muốn yên, thì mỗi lần ngài đến cung ngươi, ngươi khuyên ngài sang ta một đêm. Không thì ta kể hết chuyện ngươi hầu ta năm xưa.”"),o:[
  {n:"Hứa với {mis}",c:{sung:-3},w:{duc:3},f:"bear",wx:"người cũ yên lòng",lx:"buộc mình vào lời hứa, phải lùi trước Hoàng thượng, Sủng sút",go:()=>{matMis(8);return matSrv({tin:8})},rt:"{mis} gật đầu: “Nhớ lấy.”"},
  {n:"Xin {mis} cho ngươi tự đi đường mình",c:{suc:-3},o:()=>40+S.duc/4,w:{danh:2},sc:1,f:"bold",wx:"không còn nợ ai",l:{danh:-2},lx:"{mis} giận, thêm oán; tiếng sút; ngươi mệt rã",go:(A,ok)=>{if(!ok)matMis(-6,6)},rt:"{mis} quay mặt: “Đi đi.” Giọng nàng không còn giận.",rf:"{mis} đập vỡ chén: “Rồi ngươi xem.”"},
  {n:"Im lặng lui ra",c:{danh:-2},w:{tamco:2},wx:"không hứa gì",lx:"{mis} hiểu là ngươi từ chối, bớt thương; người ta bảo ngươi lạnh, tiếng sút",go:()=>matMis(-3),rt:"Ngươi lui ra. Sau lưng, nàng gọi mãi tên ngươi."}]},
 x1:{h:"Trước mặt Hoàng thượng",w:"emp",t:MATT("Hoàng thượng thấy tay ngươi nứt nẻ, hỏi: “Ai bắt ngươi làm việc này?” {mis} đứng ngay đó, mặt trắng bệch.",
   "Hoàng thượng nghe lời đồn ở cung {mis}, hỏi ngươi: “Nàng ta làm khó nàng?” {mis} đứng ngay đó, mặt trắng bệch."),o:[
  {n:"Thưa: là phận sự, không ai bắt",c:{suc:-3},o:A=>40+(A.f.bear?15:0)+S.duc/5,e:["win","mid"],rt:"Ngài nhìn ngươi, rồi nhìn {mis}: “Người của nàng biết giữ thể diện cho nàng.”",rf:"Ngài gật đầu, không nói thêm."},
  {n:"Thưa thật, xin ngài xét",c:{duc:-2},o:A=>35+(A.f.bold?15:0)+S.sac/5,e:["win","lose"],rt:"Ngài phạt {mis} cấm túc nửa tháng, ban cho ngươi một bình thuốc mỡ.",rf:"Ngài cho là ngươi mách lẻo, quay đi."},
  {n:"Nhìn sang {v} cầu cứu",c:{},o:A=>40+(A.f.v?15:0)+S.tamco/5,e:["mid","lose"],lx:"nợ {v} một lần; hỏng thì {v} trở mặt",go:(A,ok)=>{rdRel(A,"v",ok?4:-4)},rt:"{v} nói giúp một câu, chuyện êm.",rf:"{v} lảng mắt đi chỗ khác."}]}},
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
  {n:"Giờ Tuất đến rừng mai",c:{suc:-2},o:()=>40+S.sac/4,w:{sung:2},sc:1,f:"meet",wx:"ngài thấy ngươi đến",l:{danh:-3},lx:"có người thấy ngươi ra khỏi cung ban đêm, tiếng sút; {mis} thêm oán",go:(A,ok)=>{if(ok)return matSrv({nt:10});matMis(0,4)},rt:"Ngài đứng dưới gốc mai, không nói gì, chỉ khoác áo choàng lên vai ngươi.",rf:"Người của {mis} thấy ngươi đi."},
  {n:"Gửi lại cành mai, không đến",c:{danh:-2},w:{duc:3},f:"hide",wx:"giữ được thân",lx:"ngài chờ một mình, người ta bảo ngươi phụ ơn trên, tiếng sút",go:()=>matSrv({tin:4}),rt:"Ngươi cắm cành mai vào bình, đứng nhìn rất lâu."},
  {n:"Hỏi tiểu thái giám ai sai",c:{bac:-5},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"không bị lừa",l:{danh:-2},lx:"tiểu thái giám mách lại, tiếng ngươi sút; bạc mất trắng",rt:"Đúng là lời ngài. Ngươi biết đây không phải bẫy.",rf:"Tiểu thái giám nói dối, rồi kể khắp nơi ngươi đa nghi."}]},
 s2:{h:"Ngài không còn ghé",w:"emp",if:RDW(0),t:MATT("Đã một tháng Hoàng thượng không ghé cung {mis}. Ngươi nghe nói ngài thường dạo một mình ở hồ sen lúc chạng vạng.",
   "Đã một tháng ngài không đến cung ngươi. Ngươi nghe nói ngài thường dạo một mình ở hồ sen lúc chạng vạng, và đêm nào {mis} cũng sai người đứng chờ ở đó."),o:[
  {n:"Đi qua hồ sen như tình cờ",c:{suc:-2},o:()=>35+S.sac/4,w:{sung:2},sc:1,f:"meet",wx:"ngài thấy ngươi",l:{danh:-2},lx:"bị nói là rình rập, tiếng ngươi sút",go:(A,ok)=>{if(ok)return matSrv({nt:10})},rt:"Ngài dừng bước: “Lại là nàng.” Giọng ngài vui.",rf:"Ngài đi lối khác. Người của {mis} thì thấy ngươi."},
  {n:"Ở yên trong cung, thêu một chiếc túi thơm",c:{bac:-5},w:{duc:2},f:"hide",wx:"lòng yên",lx:"tốn bạc mua chỉ; ngài không biết ngươi chờ",rt:"Ngươi thêu cánh sen đến khuya."},
  {n:"Nhờ người dâng ngài một bình trà",c:{bac:-10},o:()=>40+S.tai/4,w:{sung:2},sc:1,wx:"ngài nhớ vị trà",l:{danh:-2},lx:"Ngự trà phòng biết ngươi nhờ vả, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)return matSrv({nt:6})},rt:"Ngài uống một ngụm, hỏi: “Ai pha?”",rf:"Bình trà bị Ngự trà phòng giữ lại."}]},
 c1:{h:"{mis} canh đường",w:"mis",if:MATM,t:"{mis} cho người canh mọi lối ra vào, ghi lại mỗi lần ngươi rời cung. Sổ ấy sẽ đến tay Hoàng hậu nếu ngươi sơ sẩy.",o:[
  {n:"Đi lối Ngự thiện phòng",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"meet",wx:"không ai ghi tên ngươi",l:{danh:-2},lx:"bị bắt gặp đi đường vòng, tiếng sút; bạc mất trắng",rt:"Lão thái giám bếp mở cửa sau cho ngươi.",rf:"Người canh ghi: “đi lối bếp, giờ Tuất.”"},
  {n:"Đến gặp {mis}, nói thẳng",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"nàng thôi canh",l:{danh:-2},lx:"nàng biết ngươi có chuyện giấu, bớt thương; tiếng sút",go:(A,ok)=>matMis(ok?6:-4),rt:"{mis} cười buồn: “Ngươi tưởng ta muốn canh sao?” Người canh rút đi.",rf:"{mis} canh chặt hơn."},
  {n:"Không đi đâu cả",c:{danh:-2},w:{duc:2},f:"hide",wx:"sổ trắng trơn",lx:"lỡ những lần ngài tìm, người ta bảo ngươi kiêu, tiếng sút",go:()=>matSrv({nt:-3}),rt:"Cả tháng ngươi không bước ra khỏi cổng."}]},
 c2:{h:"{v} mở cửa",w:"v",t:"{v} nhắn: Hoàng thượng hay ghé cung nàng sau giờ ngọ, ngươi cứ đến “giúp nàng cắm hoa”. Nàng cần ngươi nợ nàng.",o:[
  {n:"Đến cung {v}",c:{duc:-2},o:()=>45+S.sac/5,w:{sung:2},sc:1,f:"meet",wx:"gặp ngài ở chỗ không ai canh",l:{danh:-2},lx:"nợ {v}, lòng ngươi áy náy; hỏng thì tiếng sút",go:(A,ok)=>{rdRel(A,"v",4);if(ok)return matSrv({nt:8})},rt:"Ngài thấy ngươi bên bình hoa, ngồi lại lâu hơn mọi khi.",rf:"Ngài không đến. {v} vẫn ghi ngươi một món nợ."},
  {n:"Cảm ơn mà từ chối",c:{danh:-1},w:{duc:2},f:"hide",wx:"không nợ ai",lx:"{v} phật ý, thêm oán; tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"{v} cười nhạt: “Rồi ngươi sẽ cần ta.”"},
  {n:"Báo cho {mis} biết {v} đang dụ ngươi",if:MATM,c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,wx:"{mis} thấy ngươi không phản",l:{danh:-2},lx:"{v} biết ngươi mách, oán nặng; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?6:8);if(ok)matMis(6)},rt:"{mis} nghe, mắt dịu đi một chút.",rf:"{mis} không tin, {v} thì biết."}]},
 t1:{h:"Ngài hỏi thẳng",w:"emp",t:MATT("Lần gặp sau, Hoàng thượng hỏi khẽ: “Trẫm gọi, sao nàng không đến? Sợ chủ, hay không muốn?”",
   "Lần gặp sau, Hoàng thượng hỏi khẽ: “Trẫm phong nàng, mà nàng chưa một lần tìm trẫm. Sợ, hay không muốn?”"),o:[
  {n:"Thưa: sợ làm khó người cũ",c:{danh:-2},w:{duc:3},f:"hide",wx:"ngài thấy ngươi có tình nghĩa",lx:"ngài chờ thêm, người ta bảo ngươi nhát, tiếng sút",go:()=>matMis(4),rt:"Ngài gật đầu: “Trẫm hiểu.”"},
  {n:"Thưa: muốn, nhưng không dám",c:{},o:()=>40+S.sac/4+S.tai/6,w:{sung:3},sc:1,f:"meet",wx:"ngài cười",l:{danh:-2},lx:"lời ấy lọt ra ngoài, tiếng ngươi sút",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Ngài cười, cài lại cây trâm lệch trên tóc ngươi.",rf:"Có tiếng chân sau hòn non bộ."},
  {n:"Im lặng cúi đầu",c:{danh:-2},w:{tamco:2},wx:"không để lộ lòng",lx:"ngài không biết ngươi nghĩ gì, người ta bảo ngươi nhạt, tiếng sút",rt:"Ngài thở dài, bỏ đi trước."}]},
 x1:{h:"Đêm hội đèn",w:"emp",t:"Đêm hội đèn Nguyên tiêu, cả hậu cung ra Ngự hoa viên. Hoàng thượng đi giữa đám đèn, mắt tìm một người.",o:[
  {n:"Đứng chỗ đèn sáng nhất",c:{suc:-3},o:A=>35+(A.f.meet?15:0)+S.sac/5,e:["win","lose"],rt:"Ngài dừng trước mặt ngươi, chọn một chiếc đèn cá chép, đặt vào tay ngươi.",rf:"Ngài thấy ngươi cùng lúc với {mis}. Nàng kéo ngài đi."},
  {n:"Đứng sau, để ngài tự tìm",c:{},o:A=>40+(A.f.hide?15:0)+S.duc/5,e:["win","mid"],lx:"có thể ngài không tìm thấy, chuyện chỉ dừng ở giữa",rt:"Ngài vòng qua ba dãy đèn để đến chỗ ngươi.",rf:"Ngài nhìn quanh, rồi thôi."},
  {n:"Cáo ốm ở lại",c:{},w:{duc:2},e:"mid",lx:"lỡ một đêm hội, chuyện chỉ dừng ở giữa",rt:"Ngươi ngồi bên cửa sổ nhìn đèn trôi."}]}},
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
  {n:"Quỳ tạ, rồi tạ {mis}",need:["srv"],c:{danh:-2},w:{tin:6},wx:"chủ không thể nói ngươi vô ơn",lx:"phải cúi thêm một lần, người ta cười, tiếng sút",go:()=>matMis(4),rt:"{mis} đỡ ngươi dậy trước mặt mọi người."},
  {n:"Lặng lẽ nhận, không nói gì",need:["srv"],c:{tin:-3},w:{tamco:2},wx:"không để ai bắt lời",lx:"chủ cho là ngươi kiêu, Chủ tin sút",go:()=>matMis(-3),rt:"Ngươi về phòng, đóng cửa."},
  {n:"Đưa bạc cho thái giám, trước kỳ lật thẻ",need:["nsrv"],c:{bac:-40},w:{sung:2},wx:"thẻ lên trên",lx:"bạc trong hộp vơi một khoản, thành lệ, lần sau hắn lại đòi",rt:"Thái giám cúi gập người: “Tiểu chủ yên tâm.”"},
  {n:"Không đưa, chờ ngài tự lật",need:["nsrv"],c:{},o:()=>35+S.sung/3,w:{duc:3},sc:1,wx:"tay sạch",l:{sung:-2},lx:"thẻ nằm dưới thêm một tháng, Sủng sút",rt:"Ngài lật thẻ ngươi giữa một khay đầy.",rf:"Cả tháng thẻ ngươi không được lật."}]},
 s2:{h:"Ngài nói mà chưa ghi",w:"eun",if:RDW(0),t:MATT("Ngươi nghe nói Hoàng thượng đã bảo Kính sự phòng “nhớ lấy con bé ở cung {mis}”. Nhưng mười ngày qua, sổ vẫn chưa có tên ngươi.",
   "Thẻ của ngươi nằm dưới đáy khay đã hai tháng. Có người nói, mỗi lần khay dâng lên, thẻ ấy lại bị rút ra."),o:[
  {n:"Nhờ người dò ai giữ lại",c:{bac:-10},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"biết kẻ cản",l:{danh:-2},lx:"Kính sự phòng biết ngươi dò, tiếng sút; bạc mất trắng",rt:"Kẻ rút thẻ là một tiểu thái giám ăn bạc của {v}.",rf:"Người dò bị đuổi về."},
  {n:"Chờ, không hỏi",c:{danh:-2},w:{duc:3},wx:"giữ thể diện",lx:"tên ngươi càng xa sổ, người ta bảo ngươi thất thế, tiếng sút",go:()=>matSrv({nt:-2}),rt:"Ngươi tiếp tục ngày của mình."},
  {n:"Dâng ngài một chiếc túi thơm",need:["srv"],c:{bac:-5},o:()=>40+S.nt/4,w:{nt:8},sc:1,wx:"ngài nhớ lại",l:{tin:-8},lx:"chủ biết, Chủ tin sút; tốn bạc mua chỉ",rt:"Ngài đeo túi thơm suốt buổi chầu.",rf:"Túi thơm đến tay {mis} trước."},
  {n:"Gửi ngài một bài thơ",need:["nsrv"],c:{suc:-2},o:()=>35+S.tai/3,w:{sung:3},sc:1,wx:"ngài nhớ chữ ngươi",l:{danh:-2},lx:"bài thơ bị truyền tay, tiếng ngươi sút; ngươi thức khuya mệt rã",rt:"Ngài phê một chữ “Được” bên lề.",rf:"Bài thơ đến tay {v} trước, nàng chép ra cười."}]},
 c1:{h:"{v} mua thái giám",w:"v",t:"Ngươi biết chắc: {v} trả bạc cho một tiểu thái giám Kính sự phòng để tên ngươi lần nào cũng nằm dưới cùng.",o:[
  {n:"Trả bạc cao hơn {v}",c:{bac:-15},o:()=>45+S.mat*4,w:{sung:2},sc:1,wx:"tiểu thái giám đổi phe",l:{danh:-3},lx:"thành kẻ đi mua thẻ, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Tiểu thái giám nhận cả hai bên, nhưng đặt thẻ ngươi lên trên.",rf:"Hắn ăn cả hai, chẳng làm gì."},
  {n:"Báo Tổng quản thái giám",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"clean",wx:"kẻ ăn bạc bị đuổi",l:{danh:-2},lx:"{v} biết ngươi tố, thêm oán; hỏng thì tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{eun} cho đánh tiểu thái giám hai mươi trượng.",rf:"{eun} ậm ừ, không xử ai."},
  {n:"Gặp {v} hỏi thẳng",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{v} thôi tay",l:{danh:-2},lx:"{v} chối, càng hận; tiếng ngươi sút",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} cười gượng: “Đùa thôi mà.” Từ đó thẻ ngươi yên.",rf:"{v} nói: “Ngươi có chứng cứ không?”"}]},
 c2:{h:"{mis} xin gạch tên",w:"mis",if:MATM,t:MATT("{mis} đến Kính sự phòng, nói ngươi “thân thể yếu, chưa hợp hầu giá”, xin gạch tên. Hoàng hậu sẽ xét trước kỳ lật thẻ.",
   "{mis} tâu với Hoàng hậu rằng ngươi “mới lên, chưa thuộc phép thị tẩm”, xin cho ngươi học thêm một năm. Hoàng hậu sẽ xét trước kỳ lật thẻ."),o:[
  {n:"Xin thái y bắt mạch làm chứng",c:{bac:-10},o:()=>50+S.suc/10,w:{danh:2},sc:1,wx:"lời {mis} hóa vô căn",l:{danh:-2},lx:"thái y nói lấp lửng, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)matMis(0,4)},rt:"Thái y viết: “Khí huyết đầy đủ.” Hoàng hậu gật đầu.",rf:"Thái y viết: “Hơi hư nhược.” Ngươi phải chờ."},
  {n:"Xin {mis} rút lại",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"không làm to chuyện",l:{danh:-2},lx:"phải cầu xin người cũ, nàng bớt thương; tiếng sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?6:-4),rt:"{mis} im lâu, rồi rút đơn.",rf:"{mis} bảo: “Đã muộn.”"},
  {n:"Để Hoàng hậu xét",c:{hh:-2},w:{duc:2},wx:"không ai nói ngươi tranh",lx:"phó mặc cho người khác, Hoàng hậu thấy phiền",rt:"Hoàng hậu giữ đơn lại, chưa phê."}]},
 t1:{h:"Ngày lật thẻ gần kề",w:"eun",t:"Còn ba ngày đến kỳ lật thẻ. Thái giám Kính sự phòng nói nhỏ: “Thẻ có thể lên, có thể xuống. Tùy người.”",o:[
  {n:"Tặng thái giám một vật cũ",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"buy",wx:"có người giúp",l:{danh:-2},lx:"lộ thì mang tiếng mua thẻ, tiếng sút; mất món đồ",rt:"Hắn nhận chiếc trâm bạc, gật đầu.",rf:"Hắn nhận rồi nói với {v}."},
  {n:"Không cho gì",c:{suc:-2},w:{duc:3},f:"clean",wx:"tay sạch",lx:"thẻ tùy may rủi, ngươi thấp thỏm đến mệt rã",rt:"Ngươi chỉ cảm ơn rồi về."},
  {n:"Nhờ người thân cận ngài nhắc tên",c:{suc:-2},o:()=>35+S.sac/5+S.danh/5,w:{sung:2},sc:1,wx:"ngài tự hỏi",l:{danh:-2},lx:"người ta bảo ngươi cầu cạnh, tiếng sút; ngươi mệt rã",go:(A,ok)=>{if(ok)return matSrv({nt:6})},rt:"Ngài hỏi: “Thẻ người ấy đâu?”",rf:"Người được nhờ quên mất."}]},
 x1:{h:"Đêm lật thẻ",w:"emp",t:"Khay thẻ dâng lên Dưỡng Tâm điện. Hoàng thượng đưa tay lướt qua hàng thẻ xanh.",o:[
  {n:"Tin vào lời ngài đã nói",c:{},o:A=>40+(A.f.clean?15:0)+S.sac/6+S.duc/6,e:["win","mid"],lx:"không làm gì thêm, hỏng thì chuyện chỉ dừng ở giữa",rt:"Ngài lật thẻ ngươi, không do dự.",rf:"Ngài lật thẻ người khác. Thẻ ngươi vẫn ở đó."},
  {n:"Để người đã mua đặt thẻ lên trên",c:{bac:-10},o:A=>40+(A.f.buy?20:0)+(A.f.know?10:0),e:["win","lose"],rt:"Thẻ ngươi nằm trên cùng. Ngài lật.",rf:"Tổng quản bắt quả tang tiểu thái giám đổi khay."},
  {n:"Xin rút thẻ một kỳ",c:{},w:{duc:3},e:"mid",lx:"chờ thêm, chuyện chỉ dừng ở giữa",go:()=>matMis(3),rt:"Ngươi xin nghỉ một kỳ, {mis} yên lòng."}]}},
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
  {n:"Ra chào {mis} trước khi đi",need:["srv"],c:{suc:-2},o:()=>40+S.tin/3,w:{tin:6},sc:1,f:"mis",wx:"chủ không thể nói ngươi vô ơn",l:{tin:-6},lx:"chủ quay lưng, Chủ tin sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?8:-2),rt:"{mis} sửa lại cổ áo cho ngươi: “Đi đi.”",rf:"{mis} đóng cửa trước mặt ngươi."},
  {n:"Lên kiệu, không ngoái lại",need:["srv"],c:{tin:-4},w:{tamco:2},wx:"lòng không vướng",lx:"chủ ghi nhớ, Chủ tin sút",go:()=>matMis(-4),rt:"Kiệu đi. Sau lưng ngươi, một cánh cửa đóng lại."},
  {n:"Sửa sang cung, dặn người hầu kín miệng",need:["nsrv"],c:{bac:-20},w:{mat:1},f:"mis",wx:"chuyện đêm nay không lọt ra",lx:"bạc trong hộp vơi đi một khoản",rt:"Người hầu của ngươi gật đầu, khép hết cửa sổ."},
  {n:"Sai người báo {mis} một tiếng",need:["nsrv"],c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"mis",wx:"người cũ biết ngươi không giấu",l:{danh:-2},lx:"bị cười là còn sợ chủ cũ, tiếng sút",go:(A,ok)=>matMis(ok?6:-2),rt:"{mis} gửi lại một câu: “Chúc tiểu chủ bình an.”",rf:"{mis} không đáp."}]},
 s2:{h:"Lời gọi bất ngờ",w:"emp",if:RDW(0),t:MATT("Không qua sổ, không qua thẻ, Hoàng thượng sai người gọi thẳng “cung nữ hầu trà ở cung {mis}” đến Dưỡng Tâm điện giữa đêm mưa. Kính sự phòng chưa kịp biết.",
   "Không lật thẻ, Hoàng thượng đi bộ một mình đến cung ngươi giữa đêm mưa. Người hầu của ngươi hoảng hốt thắp đèn."),o:[
  {n:"Đi ngay, không kịp sửa soạn",c:{},o:()=>40+S.sac/4,w:{sung:2},sc:1,f:"plain",wx:"ngài thấy ngươi đúng như ngươi",l:{danh:-2},lx:"bị cười là quê mùa, tiếng sút",rt:"Ngài nhìn tóc ngươi còn ướt, bật cười.",rf:"Thái giám Dưỡng Tâm điện lắc đầu khi thấy ngươi."},
  {n:"Xin một khắc để sửa soạn",c:{suc:-2},w:{danh:2},wx:"giữ được thể diện",lx:"để ngài chờ, ngươi cuống đến mệt rã",rt:"Ngươi búi tóc, cài một cây trâm bạc."},
  {n:"Xin ngài theo đúng phép",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"rule",wx:"không ai bắt lỗi được",l:{sung:-2},lx:"ngài mất hứng, Sủng sút",rt:"Ngài cười: “Được, trẫm theo phép.” Ngài cho người báo Kính sự phòng.",rf:"Ngài phẩy tay bỏ về."}]},
 c1:{h:"{v} cho người chặn",w:"v",t:"Nửa đường, một cung nữ của {v} đâm sầm vào ngươi, đánh đổ hộp hương. Nàng ta khóc lóc, kéo dài thời gian.",o:[
  {n:"Bỏ hộp hương, đi tiếp",c:{bac:-5},w:{tamco:2},wx:"không trễ giờ",lx:"mất hộp hương mua bằng bạc; {v} thêm oán",go:A=>{rdOan(A,"v",3)},rt:"Ngươi đến đúng giờ, tay không."},
  {n:"Đỡ nàng ta dậy, hỏi ai sai",c:{suc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"có lời khai",l:{danh:-2},lx:"trễ giờ, bị chê, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Nàng ta run run khai tên {v}.",rf:"Nàng ta chạy mất."},
  {n:"Gọi thị vệ đến",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,wx:"có người làm chứng",l:{danh:-2},lx:"ồn ào cả hành lang, tiếng sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thị vệ ghi lại tên cung nữ ấy.",rf:"Thị vệ bảo đó chỉ là va chạm."}]},
 c2:{h:"Lời dặn của ma ma",w:"maid",t:"Ma ma Kính sự phòng dặn: “Đừng nói nhiều, đừng hỏi gì, đừng xin gì. Đêm đầu mà xin là đêm cuối.”",o:[
  {n:"Ghi nhớ từng lời",c:{tai:-1},w:{duc:2},f:"rule",wx:"không phạm phép",lx:"học thuộc phép mà quên mình, tài mọn không dùng tới; ngươi sẽ chỉ là một người như mọi người",rt:"Ngươi gật đầu."},
  {n:"Hỏi ma ma ngài thích gì",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"biết ý ngài",l:{danh:-2},lx:"ma ma kể lại với người khác, tiếng sút; bạc mất trắng",rt:"Ma ma nói nhỏ: “Ngài thích người kể chuyện quê.”",rf:"Ma ma nói thứ ai cũng biết."},
  {n:"Tự nghĩ cách riêng",c:{suc:-2},w:{tai:1},f:"plain",wx:"không giống ai",lx:"nghĩ đến khuya mệt rã; có thể sai phép",rt:"Ngươi nhẩm lại bài dân ca quê nhà."}]},
 t1:{h:"Ngài hỏi chuyện quê",w:"emp",t:"Đèn đã tắt một nửa. Hoàng thượng hỏi: “Quê nàng có gì?”",o:[
  {n:"Kể chuyện mùa gặt",c:{},o:()=>40+S.tai/4,w:{sung:2},sc:1,f:"plain",wx:"ngài nghe say",l:{danh:-1},lx:"ngài ngủ quên, chuyện lọt ra thành trò cười, tiếng sút",rt:"Ngài nghe đến tận canh ba.",rf:"Ngài ngủ trước khi chuyện hết."},
  {n:"Hát bài dân ca bên giếng",c:{suc:-2},o:()=>35+S.sac/5+S.tai/5,w:{sung:3},sc:1,f:"plain",wx:"ngài nhớ giọng ngươi",l:{danh:-2},lx:"tiếng hát lọt ra ngoài, tiếng sút; hát đến khản giọng",rt:"Ngài nhắm mắt: “Bài này trẫm đã nghe một lần, sau cửa hậu viện.”",rf:"Thái giám gác cửa kể lại cho cả cung."},
  {n:"Thưa: không dám nói",c:{danh:-2},w:{duc:2},f:"rule",wx:"giữ phép",lx:"ngài thấy ngươi nhạt, người ta bảo ngươi vô vị, tiếng sút",rt:"Ngài gật đầu, thôi hỏi."}]},
 x1:{h:"Gần sáng",w:"emp",t:MATT("Trời gần sáng. Thái giám Kính sự phòng đứng ngoài rèm hỏi: “Giữ hay không giữ?” Hoàng thượng quay sang nhìn ngươi.",
   "Trời gần sáng. Hoàng thượng ngồi dậy, khoác áo, nhìn ngươi rất lâu, như đang quyết định có quay lại hay không."),o:[
  {n:"Không xin gì, chỉ cúi đầu",c:{},o:A=>40+(A.f.rule?15:0)+S.duc/5,e:["win","mid"],lx:"để mặc ngài quyết, hỏng thì chỉ dừng ở giữa",rt:"Ngài nói: “Giữ.”",rf:"Ngài im lặng bước ra."},
  {n:"Nói một câu thật lòng",c:{suc:-2},o:A=>35+(A.f.plain?15:0)+(A.f.know?5:0)+S.sac/5,e:["win","lose"],rt:"Ngài bật cười, rồi nắm tay ngươi rất lâu.",rf:"Ngài nhíu mày: “Nàng nói nhiều quá.”"},
  {n:"Xin ngài nhớ đến {mis}",if:MATM,c:{sung:-3},o:A=>50+(A.f.mis?15:0),e:["mid","lose"],go:()=>matMis(6),lx:"nhường ơn cho người cũ, Sủng sút",rt:"Ngài ngạc nhiên, rồi gật đầu.",rf:"Ngài cho là ngươi đang diễn."}]}},
 E:{win:{k:1,tag:"Ngài giữ ngươi lại",w:"emp",t:A=>A.f.up?`Sáng ra, thánh chỉ đến trước cả nắng: cung nữ hầu trà được phong ${RANKS[S.rank].n}. {mis} quỳ nghe chỉ cùng cả cung, rồi đứng dậy trước.`
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
  {n:"Xin ngồi sau {mis}",c:{sung:-2},w:{duc:4},f:"low",wx:"người cũ được giữ thể diện",lx:"ngài thấy ngươi từ chối ơn, Sủng sút",go:()=>{matMis(8);return matSrv({tin:6})},rt:"{mis} nhìn ngươi, mắt hơi đỏ."},
  {n:"Ngồi đúng chỗ được xếp",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"high",wx:"cả điện biết vị trí của ngươi",l:{danh:-2},lx:"{mis} mất mặt, thêm oán; tiếng ngươi sút",go:(A,ok)=>matMis(0,ok?6:4),rt:"Ngươi ngồi, thẳng lưng. Không ai dám cười.",rf:"Có người cười khẽ: “Mới hôm qua còn bưng khay.”"},
  {n:"Đổi chỗ với {mis} mà không nói",c:{suc:-2},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,f:"low",wx:"cả hai cùng có mặt mũi",l:{danh:-2},lx:"Hoàng hậu thấy loạn phép, tiếng sút",go:(A,ok)=>matMis(ok?6:0),rt:"Ngươi khéo đứng dậy rót trà, rồi ngồi xuống ghế dưới. {mis} hiểu.",rf:"Hoàng hậu nhắc: “Ai ngồi chỗ nấy.”"}]},
 s2:{h:"Người cũ không cúi",w:"mis",if:RDW(0),t:MATT("Từ đêm ấy, {mis} không sai ngươi việc gì nữa, cũng không cho ngươi đi. Ngươi ở trong cung nàng như một cái bóng.",
   "Người hầu cũ của {mis}, những người từng ngủ cùng phòng với ngươi, nay gặp ngươi không cúi chào. {mis} để mặc."),o:[
  {n:"Tự tìm việc mà làm",need:["srv"],c:{suc:-3},w:{tin:5},f:"low",wx:"không ai nói ngươi ăn không",lx:"làm đến mệt rã, vẫn là bóng",rt:"Ngươi lau lại từng ô cửa. {mis} nhìn mà không nói."},
  {n:"Xin {mis} cho một chỗ rõ ràng",need:["srv"],c:{},o:()=>40+S.tin/3,w:{tin:5},sc:1,wx:"có chỗ đứng",l:{tin:-6},lx:"chủ cho là ngươi đòi, Chủ tin sút",go:(A,ok)=>matMis(ok?6:-3),rt:"{mis} cho ngươi trông phòng trà riêng.",rf:"{mis} bảo: “Ngươi tự biết.”"},
  {n:"Cười cho qua",need:["nsrv"],c:{danh:-2},w:{duc:3},f:"low",wx:"không thành chuyện",lx:"phép cung bị coi nhẹ, tiếng ngươi sút",rt:"Ngươi chỉ gật đầu chào trước họ."},
  {n:"Gọi họ lại, dạy phép",need:["nsrv"],c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"high",wx:"phép cung được giữ",l:{danh:-2},lx:"bị nói là quên gốc, tiếng sút; {mis} thêm oán",go:(A,ok)=>matMis(0,ok?4:6),rt:"Họ quỳ xuống. Một người khóc.",rf:"Họ quỳ, rồi chạy về mách {mis}."}]},
 c1:{h:"Bạn cùng phòng năm xưa",w:"maid",t:MATT("Mấy cung nữ ngủ cùng phòng với ngươi bỗng xa cách. Một người lén hỏi: “Sau này tỷ có nhớ bọn muội không?”",
   "Một cung nữ từng ngủ cùng phòng với ngươi xin chuyển sang hầu cung ngươi. {mis} chưa cho."),o:[
  {n:"Hứa sẽ nhớ",c:{bac:-5},w:{duc:3},wx:"có người thật lòng",lx:"tốn bạc quà; lời hứa nặng",rt:"Nàng ta ôm ngươi khóc."},
  {n:"Rủ họ cùng làm việc như xưa",need:["srv"],c:{suc:-2},w:{tin:3,duc:1},wx:"tình cũ còn",lx:"mệt thêm một ca",rt:"Cả phòng cười như năm đầu vào cung."},
  {n:"Xin {mis} cho người ấy theo ngươi",need:["nsrv"],c:{suc:-2},o:()=>35+S.tamco/4,w:{mat:1},sc:1,wx:"có người tin cẩn",l:{danh:-2},lx:"{mis} cho là ngươi lấy người của nàng, bớt thương; tiếng sút",go:(A,ok)=>matMis(ok?2:-4),rt:"{mis} gật đầu: “Đem đi.”",rf:"{mis} từ chối, còn phạt nàng kia."},
  {n:"Giữ khoảng cách",c:{duc:-1},w:{tamco:2},wx:"không ai nắm được ngươi",lx:"người cũ buồn, lòng ngươi áy náy",rt:"Ngươi chỉ cười, không hứa."}]},
 c2:{h:"{v} khích",w:"v",t:"{v} nói nhỏ với ngươi: “{mis} nắm cả quá khứ của ngươi. Không đẩy nàng xuống, nàng sẽ kéo ngươi xuống.”",o:[
  {n:"Bắt tay {v} chèn {mis}",c:{duc:-5},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"high",wx:"{mis} yếu đi",l:{danh:-3},lx:"thành kẻ phản chủ cũ, lòng ngươi cắn rứt, {mis} thêm oán; hỏng thì tiếng sút",go:(A,ok)=>{rdRel(A,"v",6);matMis(-8,ok?12:6)},rt:"Một tháng sau, {mis} bị cắt bổng vì “quản người không nghiêm”.",rf:"{mis} biết ngươi bắt tay {v}."},
  {n:"Từ chối, báo {mis}",c:{danh:-1},w:{duc:3},f:"low",wx:"người cũ thấy ngươi giữ nghĩa",lx:"{v} phật ý, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",8);matMis(8)},rt:"{mis} nghe xong, lần đầu gọi ngươi là “muội”."},
  {n:"Gật đầu cho {v} yên, không làm gì",c:{duc:-2},w:{tamco:2},wx:"không ai biết ý ngươi",lx:"{v} sẽ đòi, thêm oán; lòng ngươi áy náy",go:A=>{rdOan(A,"v",3)},rt:"{v} tưởng ngươi đã theo nàng."}]},
 t1:{h:"Chuyện cũ trong tay {mis}",w:"mis",if:MATM,t:"{mis} cầm một tờ giấy: sổ phạt ngày ngươi làm vỡ ngự trản năm đầu vào cung. Một tờ giấy nhỏ, đủ để người ta nói ngươi gian dối.",o:[
  {n:"Xin {mis} đốt đi",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"low",wx:"chuyện cũ khép lại",l:{danh:-2},lx:"phải hạ mình, tiếng sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?8:-4),rt:"{mis} thả tờ giấy vào lò.",rf:"{mis} cất tờ giấy vào tay áo."},
  {n:"Tự kể với Hoàng thượng trước",c:{sung:-2},o:()=>40+S.sac/5+S.duc/5,w:{danh:2},sc:1,f:"high",wx:"tờ giấy hết giá",l:{danh:-2},lx:"ngài biết thêm một lỗi cũ, Sủng sút; hỏng thì tiếng sút",rt:"Ngài cười: “Ngự trản ấy trẫm cũng chẳng thích.”",rf:"Ngài nhíu mày, nhưng không hỏi thêm."},
  {n:"Đổi lấy một lời hứa",c:{danh:-1},w:{tamco:2},wx:"cả hai giữ thóp nhau",lx:"không ai tin ai, người ta bảo ngươi mặc cả, tiếng sút",go:()=>matMis(2),rt:"Ngươi hứa không bao giờ nói xấu nàng trước mặt ngài. Nàng giữ tờ giấy, nhưng không dùng."}]},
 x1:{h:"Một lời của {mis}",w:"mis",t:MATT("Hoàng thượng hỏi {mis} trước mặt ngươi: “Người này, nàng thấy thế nào?” Một lời của nàng có thể mở cửa hay khóa cửa.",
   "Hoàng hậu hỏi {mis} trước mặt cả điện: “Người hầu cũ của muội, nay là tiểu chủ. Muội thấy thế nào?”"),o:[
  {n:"Nhìn {mis}, không nói gì",c:{},o:A=>40+(A.f.low?20:0)+S.duc/6,e:["win","mid"],lx:"phó mặc cho người cũ, hỏng thì chỉ dừng ở giữa",rt:"{mis} nói: “Là người tốt.” Câu ấy, cả cung nghe.",rf:"{mis} chỉ nói: “Tùy bệ hạ.”"},
  {n:"Tự trả lời trước",c:{suc:-2},o:A=>35+(A.f.high?15:0)+S.tai/5,e:["win","lose"],rt:"Ngươi nói: “Nếu không có tỷ, không có hôm nay.” {mis} ngẩn ra.",rf:"Ngươi nói hớ một câu, {mis} cười lạnh."},
  {n:"Cúi đầu lui",c:{},w:{duc:2},e:"mid",lx:"không ai biết lòng ngươi, chuyện chỉ dừng ở giữa",rt:"Ngươi lui ra. Câu hỏi treo lơ lửng."}]}},
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
  {n:"Xin khám luôn phòng người khác",c:{suc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"fight",wx:"lộ ra ai từng vào phòng",l:{danh:-3},lx:"bị coi là cãi lệnh, tiếng sút nặng; ngươi mệt rã",rt:"Trong phòng một cung nữ của {v} còn nửa cuộn chỉ đỏ cùng màu.",rf:"Thái giám không nghe."},
  {n:"Nhận là không biết, xin tra",c:{danh:-3},w:{duc:3},f:"calm",wx:"bình tĩnh",lx:"chưa ai tin, tiếng ngươi sút",rt:"Ngươi quỳ, giọng không run."},
  {n:"Đốt ngay trước mặt mọi người",c:{danh:-3},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,wx:"vật chứng mất",l:{danh:-3},lx:"bị cho là phi tang, tiếng sút nặng",rt:"Gói vải cháy, chỉ còn lời nói.",rf:"Thái giám giật lại, ghi thêm tội."}]},
 s2:{h:"Lời đồn đã thành án",w:"hh",if:RDW(0),t:"Lời đồn đến tai Hoàng hậu trước khi đến tai ngươi. Hoàng hậu cho gọi ngươi đến hỏi, có cả {v} ngồi bên.",o:[
  {n:"Quỳ nghe, không cãi",c:{danh:-3},w:{duc:3},f:"calm",wx:"Hoàng hậu thấy ngươi biết phép",lx:"lời đồn chưa được bác, tiếng ngươi sút",rt:"Hoàng hậu gật đầu: “Để ta xét.”"},
  {n:"Hỏi {v} có thấy tận mắt không",c:{suc:-2},o:()=>40+S.tai/4+S.danh/5,w:{danh:3},sc:1,f:"fight",wx:"{v} lúng túng",l:{hh:-3},lx:"Hoàng hậu thấy ngươi hỗn, không vui; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"{v} đỏ mặt: “Người ta nói thế.”",rf:"{v} đáp: “Ta không thấy, nhưng ai cũng nói.”"},
  {n:"Xin thái y khám người",c:{bac:-10},o:()=>50+S.duc/6,w:{danh:2},sc:1,wx:"không có bùa, không có thuốc",l:{danh:-2},lx:"chịu nhục, tiếng sút; bạc mất trắng",rt:"Thái y tâu: không có gì lạ.",rf:"Thái y ngập ngừng, không dám nói chắc."}]},
 c1:{h:"Người tung tin",w:"maid",t:"Một cung nữ đồng hương nói nhỏ: người kể đầu tiên là a hoàn của {v}, kể ở giếng nước, ngay chiều hôm Hoàng thượng gọi ngươi.",o:[
  {n:"Tìm a hoàn ấy hỏi",c:{bac:-10},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"wit",wx:"có người khai",l:{danh:-2},lx:"{v} biết ngươi dò, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"A hoàn khóc: “Chủ bắt nô tỳ nói.”",rf:"A hoàn đã bị đưa ra khỏi cung."},
  {n:"Nhờ người đồng hương làm chứng",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"wit",wx:"có nhân chứng",l:{danh:-2},lx:"nàng ấy bị liên lụy, tiếng ngươi sút",rt:"Nàng gật đầu, run run.",rf:"Nàng sợ, rút lời."},
  {n:"Giữ kín, chờ thời",c:{danh:-2},w:{tamco:2},wx:"chưa lộ bài",lx:"lời đồn cứ lan, tiếng ngươi sút",rt:"Ngươi ghi nhớ cái tên."}]},
 c2:{h:"{mis} đứng đâu",w:"mis",if:MATM,t:MATT("Người ta đến hỏi {mis}: người hầu của nàng có thật dùng bùa? Một lời của nàng nặng hơn mười lời đồn.",
   "Người ta hỏi {mis}: người hầu cũ của nàng có thật dùng bùa? Một lời của chủ cũ nặng hơn mười lời đồn."),o:[
  {n:"Đến xin {mis} nói giúp",c:{suc:-3},o:()=>35+S.duc/4+(MATR()?0:S.tin/5),w:{duc:2},sc:1,f:"mis",wx:"có người đứng ra",l:{danh:-2},lx:"phải cầu người cũ, nàng bớt thương; tiếng sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?8:-3),rt:"{mis} nói: “Nó hầu ta ba năm, chưa từng có thứ ấy.”",rf:"{mis} nói: “Ta không biết.”"},
  {n:"Không cầu, để {mis} tự chọn",c:{danh:-2},w:{duc:2},wx:"không nợ ai",lx:"có thể nàng im, người ta bảo ngươi kiêu, tiếng sút",rt:"Ngươi không đến. {mis} cũng không đến."},
  {n:"Cho {mis} biết {v} cũng định kéo nàng vào",c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"mis",wx:"{mis} cùng chống {v}",l:{danh:-2},lx:"{mis} thấy bị lợi dụng, bớt thương; tiếng sút",go:(A,ok)=>{if(ok){matMis(6);rdOan(A,"v",4)}else matMis(-3)},rt:"{mis} nheo mắt: “Nó dám?”",rf:"{mis} không tin."}]},
 t1:{h:"Thái hậu hỏi",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi đến Đức Thọ cung: “Người ta nói ngươi dùng bùa. Ngươi dùng gì?”",o:[
  {n:"Thưa: dùng trà và lòng thành",c:{},o:()=>40+S.tai/4+S.duc/6,w:{th:4},sc:1,f:"calm",wx:"Thái hậu bật cười",l:{th:-3},lx:"Thái hậu cho là ngươi lẻo mép, không vui",rt:"Thái hậu cười: “Trà ngươi pha, ta muốn nếm.”",rf:"Thái hậu không cười."},
  {n:"Quỳ xin Thái hậu cho tra đến cùng",c:{suc:-2},w:{duc:3},f:"fight",wx:"tỏ ra không sợ",lx:"quỳ đến rã gối; chuyện thành lớn",rt:"Thái hậu gật đầu: “Được, tra.”"},
  {n:"Dâng Thái hậu một chén trà tự pha",c:{suc:-2},o:()=>45+S.tai/5,w:{th:3},sc:1,wx:"Thái hậu nhớ tay ngươi",l:{th:-2},lx:"chén trà bị nghi, Thái hậu không vui; ngươi mệt rã",rt:"Thái hậu uống hết chén.",rf:"Ma ma Đức Thọ cung đổ chén trà đi."}]},
 x1:{h:"Phiên tra ở Càn Ninh cung",w:"hh",t:"Hoàng hậu ngồi trên, {v} ngồi bên, gói vải đỏ đặt trên khay. Hoàng thượng chưa đến.",o:[
  {n:"Đưa nhân chứng ra",c:{suc:-3},o:A=>35+(A.f.wit?20:0)+(A.f.fight?5:0)+S.tamco/6,e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",ok?12:4)},rt:"A hoàn của {v} khai ra tất cả. {v} tái mặt.",rf:"Nhân chứng rút lời giữa chừng."},
  {n:"Chờ Hoàng thượng đến",c:{},o:A=>40+(A.f.calm?15:0)+S.sac/6,e:["win","mid"],lx:"phó mặc cho một lời, hỏng thì án gác lại",rt:"Ngài đến, nhìn gói vải, nói: “Trẫm không cần bùa để nhìn ai.”",rf:"Ngài không đến. Án treo đó."},
  {n:"Xin {mis} đứng ra",if:MATM,c:{},o:A=>40+(A.f.mis?20:0),e:["mid","lose"],lx:"nợ người cũ một lần; hỏng thì {mis} bớt thương",go:(A,ok)=>matMis(ok?6:-2),rt:"{mis} đứng ra nói một câu, Hoàng hậu cho gác án.",rf:"{mis} không đến."}]}},
 E:{win:{k:1,tag:"Lời đồn đổ ngược",w:"emp",t:"Gói vải đỏ được đem đốt trước Càn Ninh cung. {v} bị phạt cấm túc, còn tên ngươi từ nay không ai dám đem ra đùa.",fx:{danh:5},go:A=>{rdOan(A,"v",6);return [matSrv({nt:8,tin:4}),matCon({sung:4})].join(" ")}},
  mid:{k:0,tag:"Án gác lại",t:"Không ai bị phạt. Lời đồn lặn xuống, nhưng còn đó, như than dưới tro.",fx:{duc:2,danh:-1}},
  lose:{k:-1,tag:"Mang tiếng hồ mị",t:MATT("Ngươi bị phạt quỳ ba ngày trước Càn Ninh cung, suýt bị đày Tân Giả khố. Từ đó, mỗi lần Hoàng thượng nhìn ngươi, có người ghi lại.",
   "Ngươi bị cấm túc một tháng. Hoàng thượng không nói gì, nhưng từ đó ngài đến cung ngươi ít hẳn."),fx:{danh:-5},go:()=>[matSrv({tin:-8,nt:-5}),matCon({sung:-5})].join(" ")}}});

rdDef("cnv_mat",11,{t:"Ánh mắt ấy",w:"emp",sj:"điều ánh mắt ấy trở thành",cast(A){return rdCast(A,["v"],MATV)},
 g:MATT("Từ chiếc ô dưới mưa đến hôm nay, ánh mắt của Hoàng thượng đã đi một quãng dài. Giờ ngài hỏi ngươi muốn gì. Đây là kết cục truyện xuất thân của ngươi.",
  "Từ chiếc ô dưới mưa đến chiếc ghế ngươi đang ngồi, ánh mắt của Hoàng thượng đã đi một quãng dài. Giờ phải biết nó là ân tình, hay chỉ là một lần nhìn. Đây là kết cục truyện xuất thân của ngươi."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếc ô cũ",w:"emp",if:RDW(1),t:"Hoàng thượng sai người mang đến chiếc ô năm xưa, cán ô đã khắc thêm một chữ. Ngài hẹn gặp ngươi dưới đúng mái hiên ấy, chiều mưa tới.",o:[
  {n:"Đến dưới hiên, mang theo ô",c:{suc:-2},o:()=>45+S.sac/5,w:{sung:2},sc:1,f:"love",wx:"ngài nhớ ngày đầu",l:{danh:-2},lx:"có người thấy, tiếng sút; đội mưa mệt rã",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Ngài đứng đó, tay không. Ngươi che ô cho ngài như năm xưa.",rf:"Trời không mưa. Người ta thấy ngươi đứng chờ một mình."},
  {n:"Gửi lại ô, kèm một lời",c:{danh:-2},w:{duc:3},f:"calm",wx:"giữ được thể diện",lx:"ngài có thể buồn, người ta bảo ngươi phụ ơn, tiếng sút",rt:"Ngài đọc lời ngươi, cất ô vào Dưỡng Tâm điện."},
  {n:"Hỏi chữ khắc là chữ gì",c:{},o:()=>40+S.tai/4,w:{tai:1},sc:1,f:"love",wx:"biết lòng ngài",l:{danh:-1},lx:"bị cho là tò mò, tiếng sút",rt:"Thái giám thưa: chữ “Niệm”.",rf:"Thái giám không dám nói."}]},
 s2:{h:"Ánh mắt nhạt dần",w:"emp",if:RDW(0),t:MATT("Đã lâu Hoàng thượng không ghé hậu viện. Ngươi vẫn hầu trà ở cung {mis}, vẫn đứng dưới mái hiên cũ, mà chẳng ai dừng lại.",
   "Đã lâu Hoàng thượng không lật thẻ ngươi. Cung ngươi vắng đến mức người hầu bắt đầu xin đi."),o:[
  {n:"Đứng hầu dưới mái hiên cũ",c:{suc:-2},o:()=>35+S.sac/4,w:{sung:2},sc:1,f:"love",wx:"ngài dừng lại",l:{danh:-2},lx:"bị cười là ngóng, tiếng sút; đứng đến mỏi rã",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Một chiều mưa, ngài dừng lại. Không nói gì, chỉ đứng cạnh ngươi.",rf:"Ngài đi qua, không ngoảnh lại."},
  {n:"Thôi ngóng, sống ngày của mình",c:{danh:-3},w:{duc:4},f:"calm",wx:"lòng nhẹ",lx:"ngài có thể quên thật, người ta bảo ngươi thất sủng, tiếng sút",rt:"Ngươi trồng một chậu lan trước cửa."},
  {n:"Nhờ {v} nói giúp một câu",c:{bac:-10},o:()=>35+S.tamco/4,w:{sung:2},sc:1,wx:"có người nhắc tên",l:{danh:-2},lx:"nợ {v}, hỏng thì {v} trở mặt; tiếng sút; bạc mất trắng",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} nhắc tên ngươi trong bữa ngự thiện.",rf:"{v} nhận bạc, quên lời."}]},
 c1:{h:"{mis} lần cuối",w:"mis",if:MATM,t:MATT("{mis} gọi ngươi vào, lần đầu bảo ngươi ngồi: “Ta già rồi. Ngươi muốn đi, ta không giữ nữa.”",
   "{mis} sang cung ngươi, lần đầu không cần ngươi ra đón: “Ta và ngươi, rốt cuộc là gì của nhau?”"),o:[
  {n:"Quỳ lạy {mis} một lạy",c:{danh:-2},w:{duc:4},f:"mis",wx:"nghĩa cũ được trả",lx:"có người cười ngươi hạ mình, tiếng sút",go:()=>{matMis(10);return matSrv({tin:8})},rt:"{mis} đỡ ngươi dậy. Hai người không nói gì nữa."},
  {n:"Thưa: là tỷ muội",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"mis",wx:"có một người chị",l:{danh:-1},lx:"nàng chưa sẵn lòng, bớt thương; tiếng sút",go:(A,ok)=>matMis(ok?10:-2),rt:"{mis} cười, mắt đỏ hoe.",rf:"{mis} lắc đầu: “Chưa đâu.”"},
  {n:"Thưa: là người từng hầu và người từng được hầu",c:{duc:-1},w:{tamco:2},wx:"rạch ròi",lx:"nàng buồn, bớt thương; lòng ngươi áy náy",go:()=>matMis(-3),rt:"{mis} gật đầu, đứng dậy về."}]},
 c2:{h:"{v} nước cuối",w:"v",t:"{v} tâu với Hoàng hậu xin đưa ngươi đi hầu Thái hậu ở hành cung, “cho xa lời đồn”. Đi rồi thì khó về.",o:[
  {n:"Xin Hoàng hậu cho ở lại",c:{hh:-3},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"calm",wx:"ở lại",l:{danh:-2},lx:"Hoàng hậu thấy ngươi bám víu, không vui; hỏng thì tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu bác đơn của {v}.",rf:"Hoàng hậu chưa phê."},
  {n:"Đem chuyện gói bùa ra nói lại",c:{suc:-2},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,wx:"{v} phải lui",l:{danh:-3},lx:"khơi lại chuyện cũ, tiếng sút; {v} thêm oán; ngươi mệt rã",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{v} rút đơn ngay chiều ấy.",rf:"Chuyện cũ khơi lên, dính cả ngươi."},
  {n:"Gặp {v}, xin hòa",c:{bac:-10},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"bớt một kẻ thù",l:{danh:-2},lx:"{v} thấy ngươi yếu, hỏng thì trở mặt; tiếng sút; quà mất trắng",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} thở dài: “Ta chỉ sợ ngài quên ta.”",rf:"{v} nhận bạc, cười."}]},
 t1:{h:"Ngài hỏi điều ngươi muốn",w:"emp",t:"Hoàng thượng hỏi: “Từ ngày ấy, nàng chưa xin trẫm điều gì. Hôm nay xin đi.”",o:[
  {n:"Xin ngài đừng quên chiều mưa ấy",c:{},o:()=>40+S.sac/5+S.tai/5,w:{sung:3},sc:1,f:"love",wx:"ngài cười",l:{danh:-1},lx:"lời xin nhẹ quá, người ta cười, tiếng sút",go:(A,ok)=>{if(ok)return matSrv({nt:8})},rt:"Ngài nói: “Trẫm chưa từng quên.”",rf:"Ngài chỉ gật đầu."},
  {n:"Xin ơn cho {mis}",if:MATM,c:{sung:-2},w:{duc:4},f:"mis",wx:"người cũ được ơn",lx:"không xin cho mình, nhường ơn đi, Sủng sút",go:()=>matMis(8),rt:"Ngài nhướng mày, rồi ban cho {mis} một xấp gấm."},
  {n:"Không xin gì",c:{danh:-1},w:{duc:3},f:"calm",wx:"ngài nể",lx:"không được gì ngay, người ta bảo ngươi khờ, tiếng sút",rt:"Ngài nhìn ngươi lâu: “Lạ thật.”"}]},
 x1:{h:"Dưới mái hiên",w:"emp",t:"Chiều mưa. Cùng mái hiên năm ấy. Hoàng thượng đứng đó, như đang chờ ngươi nói câu cuối cùng.",o:[
  {n:"Bước đến che ô cho ngài",c:{suc:-3},o:A=>35+(A.f.love?15:0)+S.sac/6,e:["win","lose"],rt:"Ngài nắm tay ngươi dưới ô: “Năm ấy trẫm cũng muốn làm thế này.”",rf:"Ngài nhận ô, nhưng mắt nhìn đi nơi khác."},
  {n:"Đứng yên, để ngài bước đến",c:{},o:A=>40+(A.f.calm?15:0)+S.duc/6,e:["win","mid"],lx:"có thể ngài không bước, chuyện chỉ dừng ở giữa",rt:"Ngài bước đến, đứng cạnh ngươi đến khi tạnh mưa.",rf:"Ngài đứng đó, ngươi đứng đây. Mưa tạnh."},
  {n:"Cúi đầu, lui vào trong",c:{},w:{duc:3},e:"mid",lx:"khép lại một ánh nhìn, chuyện chỉ dừng ở giữa",rt:"Ngươi lui. Ngài không gọi."}]}},
 E:{win:{k:1,tag:"Ánh mắt thành ân tình",w:"emp",t:MATT("Hoàng thượng nói với Kính sự phòng: “Người này, đừng ai làm khó.” Ngươi vẫn chưa có phẩm vị, nhưng cả hậu cung biết ngài đã chọn. Ngày sắc phong chỉ còn là chuyện thời gian.",
   "Ngài ban cho cung ngươi một tấm biển tự tay đề chữ “Niệm”. Cả hậu cung hiểu: ngươi được phong vì một ánh mắt, và được giữ vì một tấm lòng."),fx:{danh:8,duc:2},go:()=>[matSrv({nt:20,tin:5}),matCon({sung:6})].join(" ")},
  mid:{k:0,tag:"Được nhìn mà bị ghét",t:MATT("Hoàng thượng vẫn nhìn ngươi, nhưng ánh nhìn ấy kéo theo bao cặp mắt ghen. Ngươi vẫn là cung nữ, chờ một ngày ngài nhớ lại.",
   "Ngươi là tiểu chủ, được ngài nhớ, mà hậu cung không ai quên ngươi từng là nô tỳ. Có ân sủng, không có tri kỷ."),fx:{danh:2},go:A=>{rdOan(A,"v",4);return [matSrv({nt:6}),matCon({sung:2})].join(" ")}},
  lose:{k:-1,tag:"Ánh mắt khép lại",t:MATT("Ngài thôi nhìn về phía hậu viện. Ngươi vẫn là cung nữ, vẫn pha trà, vẫn sống. Con đường còn dài, chỉ không còn chiếc ô năm ấy.",
   "Ngài thôi đến. Ngươi vẫn là tiểu chủ, vẫn có cung riêng, chỉ không còn ai nhìn ngươi như chiều mưa năm ấy."),fx:{danh:-3},go:()=>[matSrv({nt:-6}),matCon({sung:-4})].join(" ")}}});
RD97L.push({a:"cnv_mat_11",tag:"Chủ cũ thành tỷ muội",w:"mis",p:.12,n:"Xin {mis} cùng đứng dưới mái hiên",c:{suc:-4},
 path:["Quỳ lạy {mis}","Thưa: là tỷ muội","Xin ơn cho {mis}","Gặp {v}, xin hòa","Thôi ngóng"],np:2,bad:["Thưa: là người từng hầu","Đem chuyện gói bùa"],sc:2,x:[()=>{const m=srvMis67();return !!(m&&m.alive&&(m.rel||0)>=20)},"Chủ cũ thương ngươi (quan hệ từ 20)"],
 t:"Ngươi sai người mời {mis} ra mái hiên. Hoàng thượng thấy hai người đứng chung một chiếc ô, bật cười: “Hóa ra người trẫm nhìn năm ấy, là người nàng dạy ra.” Từ đó, cung {mis} và cung ngươi đi chung một đường, ai động đến người này là động đến cả hai.",
 fx:{danh:10,duc:4},go:()=>{matMis(20);return [matSrv({nt:15,tin:15}),matCon({sung:5})].join(" ")},rw:"nt_nhuy",ti:"Chủ tớ thành tỷ muội"});
/* Empty Hoàng hậu seat (qOn() false): every text of this road that names the Hoàng hậu / Càn Ninh cung / Trung cung reads the Thái hậu /
   Đức Thọ cung instead, Hoàng hậu favour (hh) in costs/gains/endings becomes Thái hậu favour (th), and the speaker portrait follows.
   Getters keep strings as strings (arcReveal67 and rare-path matching still see text). Shared by the four cnv roads. */
var CNV_QFIX=typeof CNV_QFIX==="function"?CNV_QFIX:function(road){
 const W=/Hoàng hậu|Càn Ninh cung|Trung cung/,qn=()=>{try{return qOn()}catch(e){return true}};
 const sub=s=>typeof s!=="string"||!W.test(s)?s:s.replace(/“Bản cung/g,"“Ai gia").replace(/Càn Ninh cung/g,"Đức Thọ cung").replace(/Trung cung/g,"Thái hậu").replace(/Hoàng hậu/g,"Thái hậu").replace(/Thái hậu và Thái hậu chuẩn/g,"Thái hậu").replace(/Thái hậu đã cho người tra, và Thái hậu đã nghe/g,"Thái hậu đã cho người tra").replace(/đi hầu Thái hậu ở hành cung/g,"đi hầu người ở hành cung").replace(/“Người hầu cũ của muội, nay là tiểu chủ\. Muội thấy/g,"“Người hầu cũ của ngươi, nay là tiểu chủ. Ngươi thấy");
 const th=o=>{const r={};for(const k in o){const j=k==="hh"?"th":k;r[j]=(r[j]||0)+o[k]}return r};
 const fix=(ob,keys)=>{if(!ob)return;for(const k of keys){if(!Object.prototype.hasOwnProperty.call(ob,k))continue;const v=ob[k];
  if(k==="w"&&typeof v==="string"){if(v==="hh")Object.defineProperty(ob,k,{get:()=>qn()?"hh":"th",enumerable:true,configurable:true});continue}
  if(typeof v==="string"){if(W.test(v))Object.defineProperty(ob,k,{get:()=>qn()?v:sub(v),enumerable:true,configurable:true})}
  else if(typeof v==="function"){if(k!=="n")ob[k]=function(A){const s=v.apply(this,arguments);return qn()?s:sub(s)}}
  else if(v&&typeof v==="object"&&"hh" in v){const t=th(v);Object.defineProperty(ob,k,{get:()=>qn()?v:t,enumerable:true,configurable:true})}}};
 for(const id in ARC67){const a=ARC67[id];if(!a||a.road!==road)continue;fix(a,["g","t","w"]);
  for(const bk in a.B||{}){const b=a.B[bk];fix(b,["t","h","l","w"]);if(Array.isArray(b.o))for(const o of b.o)fix(o,["n","rt","rf","lx","wx","c","w","l"])}
  for(const ek in a.E||{})fix(a.E[ek],["t","tag","fx","w"])}
 for(const r of (typeof RD97L!=="undefined"?RD97L:[]))if(r&&String(r.a).indexOf(road+"_")===0)fix(r,["t","tag","ti","n","fx","w"])};
CNV_QFIX("cnv_mat");
