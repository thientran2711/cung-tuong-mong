/* ================= jrd_cn: the four full roads of «Cung nữ được sủng hạnh» (cn), chapters .5–.11 (ROAD_MAP.md §4.4) =================
   Same arc shape as j67 (p = pools of hồi: mở đầu / rắc rối / bước ngoặt / cao trào; B = hồi; E = kết cục). Openings read how the chapter
   before ended (RDW / rdPrev / rdEnd, OD:L1253); the road's people are cast once and carried (rdCast); hostile roles real both ways (rdRel /
   rdOan, OD:L1247); every option has a real gain AND a real loss (review road-map-r1); chapter-level numbers in BAL.road.<road> (ONE CORE).
   Engine + shared helpers: jroad.js. History rules: a consort is never in a court hall or at a trial (road-history pass 1). */
/* punishments the chapter texts promise, applied for real (review road-b1-r1 item 4): cấm túc = p.confined months (j8), khất bổng =
   p.cutPay pay periods (j8 payday), months from BAL.road.cn_*; printed with kitNumVi */
const CN_OK=p=>!!p&&(p===S||typeof rvOk67!=="function"||rvOk67(p));
const CN_CAM=(p,m)=>{if(!CN_OK(p))return"";p.confined=Math.max(p.confined||0,m);return p===S?`Ngươi bị cấm túc ${kitNumVi(m)} tháng.`:`${p.name} bị cấm túc ${kitNumVi(m)} tháng.`};
const CN_PAY=(p,m,by)=>{if(!CN_OK(p))return"";p.cutPay=Math.max(p.cutPay||0,m);p.cutBy=by||"";return p===S?`Cung ngươi bị khất bổng ${kitNumVi(m)} tháng.`:`${p.name} bị khất bổng ${kitNumVi(m)} tháng.`};
/* road-long flags (a choice read by a later chapter of the same road), S.st.f14.fb */
const CN_FL=rdFb;/* the road flag book (jroad.js rdFb; one helper for every origin) */
/* named predicates the odds terms in BAL.road.fx read (rdOdds "q"/"k"); their bars are BAL.road keys */
RDQ.cnchuUp=A=>CNCHU_UP(A)>=0;RDQ.cnchuGap=A=>CNCHU_UP(A)>=BAL.road.cn_chu.gap;RDQ.cnTinhDanh=()=>S.danh>=BAL.road.cn_tinh.danh;RDQ.artY=()=>S.arts&&S.arts.y||0;
/* cn_ban twist proven: the .4 win put a "vụ bỏ thuốc ở giếng" evidence point on the Hoàng hậu (j67 cn_ban E.win) — take it back */
const CN_HHCLEAR=()=>{try{if(!qOn()||rdEnd(BAL.road.first-1)!=="win")return"";const q=rivals[0];const W=q.wrongs||[];const i=W.findIndex(d=>d.k==="story"&&/giếng/.test(d.x||""));if(i>=0){q.dw=Math.max(0,(q.dw||0)-W[i].w);W.splice(i,1)}evA(S,q,-1);return `Chứng cứ về Hoàng hậu ${q.name} −1: nàng được rửa tiếng.`}catch(e){return""}};
/* who stands in for the Hoàng hậu when there is none (rivals[0] dead/deposed, or she is the Hoàng hậu herself): the Thái hậu, else the
   Emperor (review road-b1-r1 item 6). Q = title, QP = palace, QI = how that person says "I", QY = how that person calls her. */
const CN_QK=()=>{try{return qOn()?"hh":S.thDead?"emp":"th"}catch(e){return"hh"}};
const CN_Q=()=>({hh:"Hoàng hậu",th:"Thái hậu",emp:"Hoàng thượng"})[CN_QK()],CN_QP=()=>({hh:"Càn Ninh cung",th:"Đức Thọ cung",emp:"Dưỡng Tâm điện"})[CN_QK()];
const CN_TH=()=>{try{return S.thDead?CN_Q():"Thái hậu"}catch(e){return"Thái hậu"}};
/* cn_ban .10 retrial (road-history rules 2/5): who hears it under the Emperor's chỉ, and who submits the verdict for his phê */
const CN_J=()=>({hh:"Hoàng thượng hạ chỉ giao Hoàng hậu xét lại án ở Càn Ninh cung, phi tần lục cung ngồi nghe",th:"Hoàng thượng hạ chỉ giao Thái hậu xét lại án ở Đức Thọ cung",emp:"Hoàng thượng hạ chỉ giao Thận hình ty xét lại án, tâu lên ngự án"})[CN_QK()];
const CN_PHE=()=>CN_QK()==="emp"?"Thận hình ty tâu lên, Hoàng thượng phê":`${CN_Q()} tâu lên, Hoàng thượng phê`;
/* cn_than: how the .4 chapter ended (win = name restored, mid = father cleared, lose = called an impostor) */
const CNT4=()=>rdEnd(BAL.road.first-1);/* "r97" (rare: name restored + father truy phong) */
const CNT4W=()=>["win","r97"].includes(CNT4()),CNT4F=()=>["mid","r97"].includes(CNT4());
/* identity-bound roles (review road-b1-r1 item 7): the old mistress (cn_chu) and the Thượng thư house's daughter (cn_than) are one
   person; if she is gone the role is not handed to a random consort (rdCast recasts only through this filter, which allows nobody) */
const CN_NORECAST={keep:["v"]};
/* cn_ban .8: a jewellery item she owns and is not wearing in the hair slot (index in S.inv, −1 = none); selling it removes it */
const CN_JEWEL=()=>{try{const w=typeof wdOf==="function"?wdOf(S):null;const wk=w&&w.tram?w.tram.k:null;return (S.inv||[]).findIndex(e=>e&&!e.h&&IT[e.k]&&IT[e.k].kd==="Trang sức"&&e.k!==wk)}catch(e){return -1}};
const CN_QI=c=>{const w=({hh:"bản cung",th:"ai gia",emp:"trẫm"})[CN_QK()];return c?w[0].toUpperCase()+w.slice(1):w},CN_QY=c=>{const w=({hh:"muội",th:"con",emp:"ái phi"})[CN_QK()];return c?w[0].toUpperCase()+w.slice(1):w};
/* ---------- cn_chu · Chủ cũ ---------- */
/* The rival {v} is her old mistress (cast in .4, marked v.oldmis). Rank comparisons read S.rank and the rival's own rank field, never a typed name. */
const CNCHU_RN=i=>RANKS[Math.max(0,Math.min(i|0,RANKS.length-1))].n;
const CNCHU_VR=A=>{const v=A&&A.act?rv67(A,"v"):null;return v?(v.rank|0):Math.min((S.rank|0)+1,RANKS.length-1)};
/* cn_chu .8 opening: the sentence that is true for the real rank gap */
const CNCHU_GAPT=A=>{const u=CNCHU_UP(A);return u>=0?"Ngươi đã ngang nàng, cả cung chờ xem ngươi có vượt lên không.":u+1===0?"Chỉ còn một bước, cả cung đã bắt đầu đổi cách chào ngươi.":`Nàng còn hơn ngươi ${kitNumVi(-u)} bậc, vậy mà cả cung đã bắt đầu đổi cách chào ngươi.`};
const CNCHU_UP=A=>(S.rank|0)-CNCHU_VR(A);/* >0: she sits above her old mistress; 0: equal; <0: still below */
const CNCHU_MARK=A=>{const v=rv67(A,"v");if(v)v.oldmis=true;return true};

rdDef("cn_chu",5,{t:"Chén trà năm xưa",w:"v",sj:"chuyện ai từng rót trà cho ai",cast(A){return rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A)},
 g:"{v} không để cả cung quên ngươi từng quỳ rót trà cho nàng. Mỗi lời nhắc là một mũi kim. Đứng cho vững mà không thành kẻ hẹp lượng.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bộ chén men lam",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&rdK()>0&&rdPrev()!=="win2",t:()=>(rdPrev()==="r97"?"Từ chén trà năm xưa ngươi tự tay pha, {v} đã quỳ tạ lỗi và theo ngươi như người nhà.":"Từ yến Trung thu, {v} dịu đi với ngươi.")+" Nàng sai người mang sang bộ chén men lam ngươi từng rửa mỗi sáng. Trong cung xì xào: chủ cũ ban thưởng cho tớ cũ.",o:[
  {n:"Nhận chén, mời {v} sang dùng trà",sc:1,f:"kind",wx:"tình chủ tớ thành tình tỷ muội",lx:"lời xì xào chưa tắt",go:A=>{rdRel(A,"v",6)},rt:"{v} sang, tự tay rót cho ngươi chén đầu tiên."},
  {n:"Đáp lễ bằng món quà ngang giá",sc:1,wx:"ai cũng thấy hai cung ngang nhau",lx:"{v} cho là ngươi tính toán",go:(A,ok)=>{if(!ok)rdRel(A,"v",-6)},rt:"Lễ đáp lễ, lời xì xào đổi giọng.",rf:"{v} nhận quà, mặt lạnh hẳn đi."},
  {n:"Cất chén vào rương, không nhắc",wx:"không cho ai cớ bàn",lx:"bị bảo là bạc với lòng tốt của {v}",go:A=>{rdRel(A,"v",-4)},rt:"Bộ chén nằm yên dưới đáy rương."}]},
 s3:{h:"Lời kể lan khắp cung",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&rdPrev()==="win2",t:"Từ ngày phải cúi chào ngươi trước, {v} cho cung nữ đi kể khắp nơi: năm xưa ngươi quỳ rửa chân cho nàng, bị nàng tát vì trà nguội.",o:[
  {n:"Cho người kể lại chuyện thật",sc:1,f:"hard",wx:"lời kể của {v} thành chuyện cười",lx:"hai cung thành cảnh cãi nhau",go:A=>{rdOan(A,"v",6)},rt:"Người ta nhớ ra chính {v} mới là kẻ hay đánh người hầu.",rf:"Hai bên kể qua kể lại, chẳng ai còn tin ai."},
  {n:"Tự nhận: thiếp từng hầu, không nhục",sc:1,f:"kind",wx:"người ta phục ngươi thẳng thắn",lx:"lời nhận thành cớ chê",rt:"Ngươi nói trước mặt mọi người. Từ đó lời kể của {v} hết ai nghe.",rf:"Có kẻ chép lời ngươi đi kể tiếp, thêm thắt."},
  {need:["hh"],n:"Bẩm Hoàng hậu cấm đồn",wx:"Hoàng hậu ra lệnh im",lx:"Hoàng hậu thấy ngươi nhỏ nhen",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Hoàng hậu phạt cung nữ của {v} quỳ ngoài sân.",rf:"Hoàng hậu bảo: chuyện phi tần, tự lo lấy."}]},
 s2:{h:"Ấm trà ở buổi thỉnh an",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&RDW(0)(),t:()=>`Buổi thỉnh an ở ${CN_QP()}, {v} đẩy ấm trà về phía ngươi: “Muội rót đi, tay muội quen việc này nhất.”`,o:[
  {need:["hh"],n:"Rót, nhưng mời Hoàng hậu trước",sc:1,f:"kind",wx:"biến nhục thành lễ",lx:"vẫn bị cười là kẻ hầu",rt:"Hoàng hậu nhận chén, khen ngươi biết phép.",rf:"Có tiếng cười khẽ sau tay áo."},
  {need:["hh"],n:"Đẩy ấm về chỗ cũ",f:"hard",wx:"{v} biết ngươi không còn quỳ",lx:"Hoàng hậu cho là ngươi vô lễ",go:A=>{rdOan(A,"v",5)},rt:"Ngươi cười: “Ấm ở gần tỷ hơn.” Không ai nói thêm.",rf:"Hoàng hậu cau mày vì hai người làm ồn."},
  {n:"Gọi {maid} vào rót thay",wx:"giữ được thể diện",lx:"người ta nói ngươi lên mặt",go:A=>{rdOan(A,"v",3)},rt:"{maid} rót trà khéo léo, {v} không nói được gì."}]},
 c1:{h:"Phi tần mới hỏi chuyện",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Mấy phi tần mới vào cung vây lấy ngươi, hỏi có thật ngươi từng là cung nữ của {v}. {v} đứng gần đó, nghe hết.",o:[
  {n:"Kể thật, kể cả cái khổ",sc:1,wx:"các nàng mới kính ngươi",lx:"chuyện thành trò đàm tiếu",rt:"Các nàng lặng đi, rồi cúi đầu chào ngươi sâu hơn.",rf:"Có nàng che miệng cười."},
  {n:"Kể chuyện {v} từng che chở ngươi",f:"kind",wx:"{v} mềm lòng",lx:"phải nói điều chỉ thật một nửa",go:A=>{rdRel(A,"v",8)},rt:"{v} quay đi, vành tai đỏ lên."},
  {n:"Đổi chuyện sang thơ phú",wx:"các nàng thấy ngươi có học",lx:"bị coi là né tránh",rt:"Ngươi đọc một câu thơ, cả hiên khen hay.",rf:"Câu thơ ngươi đọc sai một chữ."}]},
 c2:{h:"Lão thái giám dạy pha trà",w:"eun",t:"Lão thái giám ở Càn Thanh cung, người từng dạy ngươi pha trà, tìm đến. Lão sắp bị đuổi về quê vì già, xin ngươi một lời.",o:[
  {n:"Xin {eun} giữ lão lại",sc:1,wx:"có tai mắt ở Càn Thanh cung",lx:"{eun} cho là ngươi vươn tay quá dài",rt:"Lão được giữ lại trông kho trà.",rf:"{eun} từ chối, lại kể với người khác."},
  {n:"Cho lão bạc về quê",wx:"lão mang ơn ngươi",lx:"mất một người quen việc",rt:"Lão dập đầu ba cái rồi đi."},
  {n:"Hỏi lão chuyện cũ của {v}",sc:1,f:"hard",wx:"biết một điều {v} giấu",lx:"lão thấy mình bị dùng",rt:"Lão kể: năm ấy chính {v} làm vỡ chén ngọc, rồi đổ cho ngươi.",rf:"Lão lắc đầu: chuyện cũ, lão quên rồi."}]},
 t1:{h:"Lời của {v} lọt đến Càn Thanh cung",w:"emp",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} nói trước mặt Hoàng thượng: “Trà ở cung muội ấy ngon lắm, ngày xưa là tay thiếp dạy.” Hoàng thượng cười, hẹn sẽ thử.",o:[
  {n:"Luyện lại trà suốt đêm",sc:1,wx:"tay nghề trở lại",lx:"sức kiệt trước ngày tiệc",rt:"Đến canh tư, chén trà đã trong như ngày xưa."},
  {n:"Cho người dò {v} định làm gì",sc:1,f:"hard",wx:"biết trước mũi tên",lx:"người dò bị bắt gặp",rt:"Người của ngươi nghe được: {v} định đổi lá trà của ngươi.",rf:"Người dò bị {v} bắt, đuổi ra."},
  {n:"Gửi {v} ít trà mới, cảm ơn lời khen",f:"kind",wx:"{v} khó ra tay",lx:"nàng có thể cho là ngươi sợ",go:A=>{rdRel(A,"v",4)},rt:"{v} nhận trà, nhìn ngươi lâu một lúc."}]},
 x1:{h:"Tiệc trà ở Ngự hoa viên",w:"emp",if:A=>!!rv67(A,"v"),need:["v"],t:"Hoàng thượng mở tiệc trà. {v} tâu: “Xin cho muội ấy pha, tay nghề năm xưa là nhất cung.” Cả tiệc quay về phía ngươi.",o:[
  {n:"Pha trà, nói thẳng học ở đâu",e:["win","lose"],rt:"Ngươi pha trà, nói rõ: “Thiếp học trong cung {v}.” Hoàng thượng cười lớn, khen gốc không nhục.",rf:"Tay ngươi run, nước sôi tràn chén. {v} che miệng cười."},
  {n:"Pha trà, mời {v} nếm trước",e:["win","mid"],rt:"{v} nếm, gật đầu, chẳng nói được lời chê.",rf:"{v} nếm, đặt chén xuống: “Cũng thường.”"},
  {n:"Xin miễn, dâng trà Ngự thiện phòng",e:"mid",lx:"bị coi là sợ",rt:"Ngươi khéo léo chối, tiệc trôi qua yên ổn."}]}},
 E:{win:{k:1,tag:"Trà ngon, gốc không nhục",w:"emp",t:"Từ hôm ấy, Hoàng thượng hay ghé cung ngươi uống trà. Chuyện ngươi từng hầu {v} thành chuyện người ta kể để khen.",go:A=>{rdRel(A,"v",4);return ""}},
  mid:{k:0,tag:"Chén trà nguội",t:"Tiệc tan, không ai nhớ chén trà. Cũng không ai quên ngươi từng là ai."},
  lose:{k:-1,tag:"Bị cười là cung nữ",t:"Cả cung kể chuyện chén trà tràn. {v} nói khắp nơi: “Tớ cũ quên nghề rồi.”",go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("cn_chu",6,{t:"Đồng liêu cũ",w:"maid",sj:"những cung nữ từng cùng ngươi hầu {v}",cast(A){return rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A)},
 g:"Ba người từng cùng ngươi hầu {v} vẫn còn trong cung: một kẻ ganh, một người xin nương nhờ, một người đã thành tai mắt của {v}. Phân rõ ai là ai trước rằm, khi Nội vụ phủ xếp lại người hầu các cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Người cùng chiếu năm xưa",w:"maid",if:RDW(1),t:"Tiếng ngươi được khen lan đến dãy nhà cung nữ. Người từng ngủ cùng chiếu với ngươi nhờ {maid} gửi lời: nàng xin sang hầu ngươi.",o:[
  {n:"Nhận nàng về cung",sc:1,f:"kind",wx:"thêm người tin được",lx:"{v} biết ngươi rút người",go:A=>{rdOan(A,"v",4)},rt:"Nàng ôm gói đồ sang, khóc như mưa."},
  {need:["hh"],n:"Gửi nàng sang cung Hoàng hậu",sc:1,wx:"có người quen bên Hoàng hậu",lx:"nàng tủi vì không được ở cạnh ngươi",rt:"Hoàng hậu nhận nàng vào hầu kim chỉ.",rf:"Hoàng hậu không cần thêm người, nàng phải quay về."},
  {n:"Từ chối, gửi chút bạc",wx:"không mắc nợ ai",lx:"nàng tủi thân, kể với người khác",rt:"Nàng nhận bạc, cúi đầu lui ra."}]},
 s2:{h:"Lời chặn ở giếng nước",w:"maid",if:RDW(0),t:"Một đồng liêu cũ chặn {maid} ở giếng nước, cười: “Chủ nhà ngươi ngày trước còn giặt váy cho ta.” Lời ấy đã lan đến ba dãy nhà.",o:[
  {n:"Gọi nàng đến, hỏi cho ra",sc:1,f:"hard",wx:"nàng biết sợ",lx:"nàng kể thêm cho cả dãy nhà",rt:"Nàng quỳ xin tha, thề không nói nữa.",rf:"Nàng ngẩng mặt: “Nô tì nói thật mà.”"},
  {n:"Cho nàng một việc tốt hơn",sc:1,f:"kind",wx:"miệng ganh thành miệng khen",lx:"nàng nhận rồi vẫn nói",rt:"Nàng được sang Thượng y cục, gặp ai cũng khen ngươi.",rf:"Nàng nhận việc, rồi chê việc ấy cũng là ngươi bố thí."},
  {n:"Mặc kệ lời nàng",wx:"không chấp kẻ dưới",lx:"lời ấy cứ lan, tiếng ngươi sứt",rt:"Ngươi dặn {maid} thôi ra giếng ấy."}]},
 c1:{h:"Kẻ ganh",w:"maid",t:"Đồng liêu cũ hay ganh nhất nay hầu ở Thượng thực cục. Nàng nói với ai cũng bảo: ngươi được sủng hạnh vì đổ trà vào áo Hoàng thượng, cố ý.",o:[
  {n:"Bỏ bạc bịt miệng",wx:"lời đồn tắt",lx:"nàng biết nói là có bạc",rt:"Nàng nhận bạc, im được một mùa."},
  {n:"Bẩm cô cô quản sự",sc:1,f:"hard",wx:"nàng bị phạt quỳ",lx:"bị nói là quên đồng liêu cũ",rt:"Cô cô phạt nàng chép cung quy ba trăm lượt.",rf:"Cô cô bảo chuyện cung nữ nói chơi, bỏ qua."},
  {n:"Mời nàng đến, ôn chuyện cũ",sc:1,f:"kind",wx:"nàng xấu hổ, thôi ganh",lx:"nàng đem chuyện trong cung ngươi ra kể",rt:"Hai người nhắc lại những đêm cùng trực, nàng bật khóc.",rf:"Nàng uống trà của ngươi rồi đi kể ngươi khoe khoang."}]},
 c2:{h:"Tai mắt của {v}",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{maid} phát hiện: người đồng liêu ít nói nhất nay mỗi tối đều sang cung {v}, kể việc trong cung ngươi.",o:[
  {n:"Để nàng mang tin giả về",sc:1,f:"hard",wx:"{v} nghe sai đường",lx:"nàng nhận ra bị lừa",go:(A,ok)=>{if(ok)rdOan(A,"v",4)},rt:()=>`{v} tin rằng ngươi sắp xin về hầu ${CN_TH()}.`,rf:"Nàng nghe ngươi nói xong thì không sang cung {v} nữa."},
  {n:"Lặng lẽ kéo nàng về phía mình",sc:1,wx:"tai mắt hai chiều",lx:"nàng ăn cả hai bên",rt:"Nàng nhận bạc, từ nay kể việc cung {v} cho ngươi.",rf:"Nàng nhận bạc rồi kể luôn chuyện này với {v}."},
  {n:"Nói thẳng với {v}",f:"kind",wx:"{v} thấy ngươi không giấu",lx:"{v} cười ngươi ngây thơ",go:(A,ok)=>{rdRel(A,"v",ok?8:-4)},rt:"{v} đỏ mặt, gọi người ấy về hẳn.",rf:"{v} nói: “Người cũ của ta, ta hỏi thăm không được sao?”"}]},
 t1:{h:"Danh sách của Nội vụ phủ",w:"eun",t:"{eun} sắp chốt danh sách người hầu các cung trước rằm. Ai được ở, ai bị chuyển, chỉ một lời của người có phẩm.",o:[
  {n:"Xin giữ cả ba người ở gần",sc:1,wx:"cả ba trong tầm mắt",lx:"{eun} ghi nhớ ngươi xin nhiều",rt:"{eun} gật đầu, sửa ba cái tên.",rf:"{eun} chỉ sửa một tên, còn đòi thêm lễ."},
  {n:"Xin chuyển kẻ ganh ra xa",wx:"bớt một miệng nói",lx:"bị nói là trả thù đồng liêu cũ",rt:"Kẻ ganh bị chuyển sang Hoán y cục."},
  {n:"Không xin gì",wx:"tay sạch",lx:"mất dịp cài người, bớt tai mắt",rt:"Ngươi để danh sách tự đi."}]},
 x1:{h:"Đồng liêu bị vu",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Người đồng liêu hiền nhất bị vu lấy trộm vòng bạc trong cung {v}. Thận hình ty sẽ xử trước rằm. Nàng nhờ người gửi đến ngươi một chữ: “Cứu.”",o:[
  {n:"Đến cung {v} đòi người",e:["win","lose"],go:A=>{rdOan(A,"v",6)},rt:"Ngươi tìm ra chiếc vòng trong rương của chính cung nữ tố cáo. {v} phải thả người.",rf:"{v} đóng cửa không tiếp, còn tâu ngươi xen vào việc cung khác."},
  {n:"Đền bạc, xin nàng về hầu",e:["win","mid"],rt:"Thận hình ty nhận bạc đền, giao nàng sang cung ngươi.",rf:"Nàng được tha, nhưng bị chuyển đi Hoán y cục."},
  {n:"Để Thận hình ty xử theo phép",e:"mid",lx:"nàng chịu phạt oan",rt:"Nàng bị phạt mười trượng. Ngươi gửi thuốc đến."}]}},
 E:{win:{k:1,tag:"Đồng liêu cũ thành người nhà",w:"maid",t:"Những người từng cùng ngươi hầu {v} nay đứng về phía ngươi. Chuyện trong cung {v}, ngươi biết trước cả nàng."},
  mid:{k:0,tag:"Mỗi người một ngả",t:"Ba người đồng liêu cũ đi ba ngả. Không ai hại ngươi, cũng không ai liều vì ngươi."},
  lose:{k:-1,tag:"Đồng liêu cũ quay lưng",t:"Người ta nói ngươi lên cao rồi bỏ mặc đồng liêu cũ. Dãy nhà cung nữ không còn ai gọi tên ngươi thân thiết nữa.",go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("cn_chu",7,{t:"Bẫy trong yến tiệc",w:"hh",sj:"cái bẫy trong yến mừng thọ",cast(A){return rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A)},
 g:()=>`${CN_Q()} mở yến mừng thọ. {v} được giao lo trà rượu, ngươi được giao dâng chén lễ chúc. Có người thấy {v} dặn riêng Ngự thiện phòng một việc.`,
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời báo trước",w:"maid",if:RDW(1),t:()=>rdPrev()==="win"?"Đồng liêu cũ ở cung {v} lén báo: chủ nàng sai thợ ngọc làm một chiếc chén giống hệt chén lễ của ngươi.":"{maid} nghe phong thanh: {v} dặn Ngự thiện phòng đổi một chén trên mâm lễ của ngươi.",o:[
  {n:"Cho người canh mâm lễ",sc:1,f:"watch",wx:"biết ai động vào mâm",lx:"người canh bị nghi gian",rt:"Người canh ghi được mặt kẻ đổi chén.",rf:"Người canh ngủ gật, chẳng thấy gì."},
  {n:"Tự chuẩn bị chén khác",sc:1,wx:"có chén dự phòng",lx:"tốn bạc mà chưa chắc dùng",rt:"Ngươi đặt thợ làm thêm một chén ngọc."},
  {need:["hh"],n:"Báo trước cho Hoàng hậu",wx:"Hoàng hậu để mắt",lx:"Hoàng hậu cho là ngươi gây chuyện ngày vui",rt:"Hoàng hậu gật đầu: “Bản cung biết rồi.”",rf:"Hoàng hậu chau mày: “Ngày vui đừng nói chuyện xấu.”"}]},
 s2:{h:"Chỗ ngồi xuống thấp",w:"maid",if:RDW(0),t:"Danh sách chỗ ngồi đến tay ngươi: ngươi bị xếp ngồi cuối hàng, sát chỗ cung nữ đứng hầu. Người lo việc ấy là {v}.",o:[
  {need:["hh"],n:"Xin Hoàng hậu xếp lại theo phẩm",sc:1,wx:"ngồi đúng chỗ",lx:"Hoàng hậu phiền",go:(A,ok)=>{if(ok)rdOan(A,"v",4)},rt:"Hoàng hậu cho sửa danh sách, còn nhắc {v} cẩn thận.",rf:"Hoàng hậu bảo: chỗ ngồi đã định, đừng đổi."},
  {n:"Ngồi cuối, ăn mặc thật đẹp",f:"watch",wx:"Hoàng thượng để ý ngươi",lx:"chịu ngồi dưới",rt:"Hoàng thượng nhìn xuống cuối hàng, hỏi sao nàng ngồi đó."},
  {need:["hh"],n:"Cáo bệnh không đến",wx:"tránh được bẫy",lx:"Hoàng hậu cho là ngươi giận dỗi",rt:"Ngươi gửi lễ chúc thọ qua {maid}."}]},
 c1:{h:"Chén ngọc có vết nứt",w:"maid",t:"Đêm trước yến, {maid} lau chén lễ thì thấy một vết nứt chân tơ. Chén này từ kho cung {v} đưa sang.",o:[
  {n:"Giữ chén nứt làm chứng",sc:1,f:"proof",wx:"có tang vật",lx:"chén rơi vỡ, bị trách sơ ý",rt:"{maid} gói chén nứt trong lụa đỏ, cất kỹ.",rf:"Chén nứt rơi vỡ hẳn khi gói."},
  {n:"Đổi bằng chén bạc của mình",wx:"lễ chúc trọn vẹn",lx:"bỏ qua dấu vết",rt:"Chén bạc chạm hoa sáng loáng."},
  {n:"Gửi trả chén cho {v}",wx:"{v} biết ngươi đã biết",lx:"{v} chuẩn bị bẫy khác",go:A=>{rdOan(A,"v",3)},rt:"Cung {v} nhận lại chén, im lặng.",rf:"{v} nói ngươi tự làm nứt rồi đổ cho nàng."}]},
 c2:{h:"Bài thơ chúc thọ",w:"hh",t:()=>`${CN_Q()} muốn mỗi phi tần đọc một câu chúc. {v} cười: “Muội ấy chắc chưa học chữ nhiều, tha cho muội ấy.”`,o:[
  {n:"Đọc một bài tự làm",sc:1,wx:"cả yến khen",lx:"vấp chữ trước mọi người",rt:()=>`Bài thơ của ngươi được ${CN_Q()} cho chép lại.`,rf:"Ngươi vấp một vần, {v} cười thành tiếng."},
  {need:["hh"],n:"Chúc ngắn, mộc mạc mà thật",wx:"Hoàng hậu thấy lòng thành",lx:"{v} được dịp chê ngươi thiếu học",rt:"Hoàng hậu nói: “Lời thật hơn lời hoa.”"},
  {need:["hh"],n:"Xin đọc sau cùng",sc:1,wx:"nghe hết người khác rồi mới nói",lx:"Hoàng hậu thấy ngươi khéo né",rt:"Ngươi chúc câu khéo nhất, lấy ý từ mọi người trước.",rf:"Đến lượt ngươi, yến đã nhạt."}]},
 t1:{h:"Người trong Ngự thiện phòng",w:"eun",t:"Một tiểu thái giám Ngự thiện phòng lén tìm {maid}: hắn được trả bạc để đặt chén lễ của ngươi vào mâm sau cùng, chỗ đèn tối.",o:[
  {n:"Giữ hắn làm chứng",sc:2,f:"witness",wx:"có người khai",lx:"hắn đổi lời khi bị dọa",rt:"Hắn đồng ý khai nếu được che chở.",rf:"Hắn sợ, trốn về quê."},
  {n:"Trả gấp đôi để hắn làm ngược",sc:1,f:"watch",wx:"chén của ngươi đặt chỗ sáng nhất",lx:"hắn ăn hai đầu",rt:"Mâm lễ của ngươi được bưng lên đầu tiên."},
  {n:"Báo {eun} bắt hắn",wx:"bẫy bị cắt sớm",lx:"kẻ đứng sau biết mà lui",rt:"Hắn bị đuổi khỏi Ngự thiện phòng trước yến.",rf:"{eun} nói không đủ chứng, thả hắn."}]},
 x1:{h:"Chén lễ chúc thọ",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Đến lượt ngươi dâng chén lễ. {v} kêu lên: “Chén của muội có vết nứt! Ngày thọ mà dâng chén nứt là điềm gở.” Cả yến lặng đi.",o:[
  {n:"Đưa chứng cứ ra ngay",e:["win","lose"],rt:()=>`Chén nứt thật và người khai được đưa ra. ${CN_Q()} quay sang nhìn {v}.`,rf:()=>`Không đủ chứng. ${CN_Q()} bảo ngươi lui xuống.`},
  {n:"Nói: nứt mà không vỡ, như phúc dày",e:["win","mid"],rt:()=>`${CN_Q()} bật cười, nâng chén: “Nói hay lắm.” Lời gở thành lời chúc.`,rf:"Có người cười theo, có người lắc đầu. Yến tiếp tục."},
  {need:["hh"],n:"Quỳ tạ lỗi, xin đổi chén",e:"mid",lx:"chịu tiếng sơ suất",rt:"Hoàng hậu cho đổi chén, không trách thêm."}]}},
 E:{win:{k:1,tag:"Bẫy quay về chủ",w:"hh",t:()=>`${CN_Q()} phạt {v} cấm túc ${kitNumVi(BAL.road.cn_chu.cam)} tháng vì gây chuyện ngày thọ. Trong yến, người ta chỉ nhớ câu chúc của ngươi.`,go:A=>{const v=rdOan(A,"v",8);return v?[e67pun(v,5),CN_CAM(v,BAL.road.cn_chu.cam)].join(" "):""}},
  mid:{k:0,tag:"Thoát bẫy",t:"Ngươi qua được yến, không mất gì cũng không được gì. {v} biết lần sau phải tinh hơn."},
  lose:{k:-1,tag:()=>`Mất mặt trước ${CN_Q()}`,w:"hh",t:()=>`Người ta nhớ chén lễ nứt của ngươi lâu hơn mọi câu chúc. ${CN_Q()} lạnh nhạt với ngươi một mùa.`}}});

rdDef("cn_chu",8,{t:"Ngang hàng",w:"emp",sj:"chuyện ngươi ngồi ngang chủ cũ",cast(A){return rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A)},
 g:()=>`Hoàng thượng hỏi ${CN_Q()}: phẩm của ngươi đã nên ngang {v} chưa. Ngồi ngang chủ cũ là vinh, mà cũng là cái đích cho mọi mũi tên.`,
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một bước nữa",w:"emp",need:["v"],if:A=>!!rv67(A,"v")&&RDW(1)(),t:A=>`Ngươi đang ở bậc ${CNCHU_RN(S.rank)}, {v} ở bậc ${CNCHU_RN(CNCHU_VR(A))}. ${CNCHU_GAPT(A)}`,o:[
  {n:"Giữ lễ với {v} như cũ",f:"kind",wx:"không ai chê ngươi kiêu",lx:"người dưới tưởng ngươi vẫn kém nàng",go:A=>{rdRel(A,"v",5)},rt:"Ngươi vẫn chào {v} trước, như mọi khi."},
  {n:"Nhận lời chào của người dưới",sc:1,f:"hard",wx:"uy của ngươi thành hình",lx:"bị nói là đã quên mình",rt:"Các phi tần nhỏ bắt đầu sang cung ngươi thỉnh an.",rf:"Người ta bảo ngươi vội ngồi lên chỗ chưa phải của mình."},
  {need:["th"],n:"Xin Hoàng thượng khoan bàn phẩm",wx:"Thái hậu khen biết điều",lx:"lời bàn nguội đi",rt:"Thái hậu nghe chuyện, gật gù khen."}]},
 s2:{h:"Lời bàn bị gác",w:"emp",need:["v"],if:A=>!!rv67(A,"v")&&RDW(0)(),t:A=>`Lời bàn nâng ngươi lên bậc ${CNCHU_RN((S.rank|0)+1)} bị gác lại. Có người tâu: cung nữ cũ ngồi ngang chủ, e loạn tôn ti.`,o:[
  {n:"Tìm xem ai tâu",sc:1,f:"hard",wx:"biết người cản đường",lx:"người bị dò biết chuyện",rt:"Lời tâu đi từ người nhà {v}, qua một Ngự sử.",rf:"Người dò chỉ nghe được lời đồn."},
  {need:["th"],n:"Chép kinh dâng Thái hậu",sc:1,wx:"Thái hậu nói giúp một câu",lx:"chép kinh mà không ai đọc",rt:"Thái hậu bảo: “Phẩm là ân trên, xuất thân là chuyện cũ.”",rf:"Thái hậu nhận kinh, không nói gì."},
  {n:"Chờ, không nói gì",wx:"không ai bắt được lỗi",lx:"người khác nói thay, Hoàng thượng nghe một phía",rt:"Ngươi đóng cửa cung, chờ."}]},
 c1:{h:"{v} đến Đức Thọ cung",w:"v",if:A=>!!rv67(A,"v"),need:["v","th"],t:"{v} đến Đức Thọ cung khóc với Thái hậu: thiếp không dám tranh, chỉ sợ phép tôn ti trong cung mất đi.",o:[
  {n:"Cũng đến Đức Thọ cung hầu",sc:1,wx:"Thái hậu nghe cả hai phía",lx:"thành cảnh hai người tranh trước Thái hậu",go:A=>{rdOan(A,"v",4)},rt:"Thái hậu nắm tay cả hai: “Đều là người của hoàng gia.”",rf:"Thái hậu mệt, đuổi cả hai về."},
  {n:"Gửi {v} lời: thiếp không tranh",f:"kind",wx:"{v} hết lời để khóc",lx:"có kẻ tưởng ngươi sợ",go:A=>{rdRel(A,"v",6)},rt:"{v} đọc thư, thôi không đến Đức Thọ cung nữa."},
  {n:"Nhờ đồng liêu cũ kể chuyện thật",sc:1,f:"hard",wx:"Thái hậu biết {v} từng đối với ngươi thế nào",lx:"lộ ngươi có người ở Đức Thọ cung",rt:"Một mama già kể với Thái hậu chuyện năm xưa.",rf:"Thái hậu hỏi: “Ai cho cung nữ nói chuyện chủ?”"}]},
 c2:{h:"Ai chào ai trước",w:"hh",if:A=>!!rv67(A,"v"),need:["v"],t:()=>`Buổi thỉnh an, {v} và ngươi đến cùng lúc ở cửa ${CN_QP()}. Theo lệ, bậc thấp chào trước. Bao con mắt đang nhìn.`,o:[
  {n:"Chào {v} trước, như xưa",f:"kind",wx:"lòng độ lượng được thấy",lx:"có người cười ngươi vẫn là tớ",go:A=>{rdRel(A,"v",5)},rt:"{v} khựng lại, rồi đáp lễ ngang."},
  {n:"Đứng chờ {v} chào theo phẩm",f:"hard",wx:"phép tôn ti đứng về phía ngươi",lx:()=>`${CN_Q()} thấy hai người đứng đờ`,go:A=>{rdOan(A,"v",6)},rt:"{v} cắn môi, cúi chào ngươi.",rf:()=>`Cả hai cùng đứng, ${CN_Q()} cho người ra mời vào.`},
  {n:"Cùng chào nhau một lúc",sc:1,wx:"không ai thua",lx:"chuyện thành trò cười",rt:()=>`Hai người cúi chào cùng lúc, ${CN_Q()} cười khen khéo.`,rf:"Hai người cúi trùng nhau, đụng trâm."}]},
 t1:{h:"Hoàng thượng hỏi riêng",w:"emp",need:["nsrv"],t:"Đêm ấy Hoàng thượng hỏi: “Nàng có muốn ngồi ngang chủ cũ không?”",o:[
  {n:"Thưa thật: thiếp muốn",sc:1,wx:"ngài thích ngươi thẳng",lx:"ngài cho là ngươi tham",rt:"Hoàng thượng cười: “Có chí.”",rf:"Hoàng thượng im lặng một lúc lâu."},
  {n:"Thưa: phẩm là ân của Hoàng thượng",wx:"lời khéo",lx:"đêm dài giữ lời, mệt sức",rt:"Hoàng thượng gật đầu, không hỏi thêm."},
  {n:"Xin ngài cũng ban ân cho {v}",sc:1,f:"kind",wx:"Hoàng thượng thấy lòng rộng",lx:"{v} được lợi từ lời ngươi",go:A=>{rdRel(A,"v",8)},rt:"Hoàng thượng ban cho {v} một xấp gấm, nói là nhờ lời ngươi.",rf:"Hoàng thượng bảo: “Chuyện của nàng ấy, nàng đừng lo.”"}]},
 x1:{h:"Ngày tuyên chỉ",w:"emp",if:A=>!!rv67(A,"v"),need:["v"],t:()=>`Thánh chỉ được đọc ở ${CN_QP()}: phẩm bậc giữ nguyên, nhưng từ nay trong các lễ, ngươi được đứng cùng hàng với {v}. {v} cáo bệnh không đến.`,o:[
  {n:"Tự đến cung {v} mời nàng",e:["win","mid"],rt:()=>`{v} ra cửa đón ngươi. Hai người cùng đến ${CN_QP()}.`,rf:"{v} sai người đáp: bệnh nặng, không ra được."},
  {need:["hh"],n:"Tâu Hoàng hậu {v} kháng lễ",e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",8);if(ok)return CN_PAY(rv67(A,"v"),BAL.road.cn_chu.phat,"Hoàng hậu")},rt:()=>`Hoàng hậu sai Thái y đến xem. {v} không bệnh, bị khất bổng ${kitNumVi(BAL.road.cn_chu.phat)} tháng.`,rf:"Thái y nói {v} bệnh thật. Ngươi thành kẻ hẹp lượng."},
  {n:"Nhận chỉ, không nhắc đến {v}",e:"mid",lx:"cái ghế ngang hàng còn để trống",rt:"Ngươi nhận chỉ, lễ tan trong lặng lẽ."}]}},
 E:{win:{k:1,tag:"Ngồi ngang chủ cũ",w:"emp",t:"Cả cung thấy ngươi và {v} đứng một hàng. Không ai còn dám gọi ngươi là tớ cũ trước mặt."},
  mid:{k:0,tag:"Ngang mà chưa yên",t:"Ngươi đứng ngang {v} trên giấy. Trong lòng người ta, chuyện ai từng hầu ai vẫn chưa xong."},
  lose:{k:-1,tag:"Bị cho là vội",t:"Người ta nói ngươi chưa ngồi ấm chỗ đã muốn đè chủ cũ. Hoàng thượng nhạt với ngươi một dạo.",go:A=>{rdOan(A,"v",5);return ""}}}});

rdDef("cn_chu",9,{t:"Vượt bậc",w:"v",sj:"lúc {v} sa cơ",cast(A){const ok=rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A);if(ok)CN_PAY(rv67(A,"v"),BAL.road.cn_chu.phat,"Nội vụ phủ");return ok},
 g:()=>`Sổ sách cung {v} bị Nội vụ phủ bắt lỗi. Bổng lộc cung nàng bị khất ${kitNumVi(BAL.road.cn_chu.phat)} tháng, người hầu bỏ đi. Cả cung chờ xem kẻ hầu năm xưa trả thù hay thương xót.`,
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Người hầu của {v} đến cửa",w:"maid",need:["v"],if:A=>!!rv67(A,"v")&&RDW(1)(),t:"Cung nữ thân cận của {v} quỳ trước cửa cung ngươi: mùa đông đến mà cung nàng chưa có than, chủ nàng ho suốt đêm.",o:[
  {n:"Lặng lẽ gửi than sang",f:"kind",wx:"{v} biết ơn ai",lx:"người khác bảo ngươi ra vẻ",go:A=>{rdRel(A,"v",10)},rt:"Đêm ấy cung {v} có lửa."},
  {n:"Bảo nàng tự xin Nội vụ phủ",f:"hard",wx:"không dính vào cung sa cơ",lx:"mang tiếng đóng cửa với kẻ sa cơ",go:A=>{rdOan(A,"v",5)},rt:"Cung nữ ấy lau nước mắt đứng dậy."},
  {need:["hh"],n:"Xin Hoàng hậu xét lại bổng lộc",sc:1,wx:"việc công, ơn kín",lx:"Hoàng hậu thấy ngươi lo việc người khác",rt:"Hoàng hậu cho cấp lại than cho mọi cung.",rf:"Hoàng hậu bảo việc ấy đã định."}]},
 s2:{h:"Ngọn gió đổi chiều",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&RDW(0)(),t:A=>`Dù ngươi còn ở bậc ${CNCHU_RN(S.rank)}, cung {v} đã vắng hẳn người. Các phi tần đổ sang cung ngươi, mang theo lời chê {v}.`,o:[
  {n:"Đóng cửa không nghe lời chê",f:"kind",wx:"người ta thấy ngươi không đạp người ngã",lx:"mất lòng những kẻ đến nịnh",rt:"Ngươi tiễn khách ra cửa sớm."},
  {n:"Nghe hết, ghi lại",sc:1,f:"hard",wx:"biết ai theo gió",lx:"bị coi là đồng lõa",rt:"Ngươi biết rõ ai đổi phe nhanh nhất.",rf:"Có kẻ đi kể với {v} rằng ngươi cười trên nỗi khổ của nàng."},
  {n:"Gửi {v} thuốc bổ",sc:1,wx:"một sợi dây chưa đứt",lx:"{v} cho là ngươi thương hại",go:(A,ok)=>{rdRel(A,"v",ok?8:-4)},rt:"{v} nhận thuốc, không gửi lại lời nào.",rf:"{v} ném thuốc ra sân."}]},
 c1:{h:"Kẻ đạp người ngã",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Một phi tần trẻ rủ ngươi: “Ngày xưa nàng bắt tỷ quỳ, nay ta bắt nàng quỳ lại. Tỷ chỉ cần đứng xem.”",o:[
  {n:"Ngăn lại",sc:1,f:"kind",wx:"{v} được giữ thể diện",lx:"phi tần trẻ thành thù",go:(A,ok)=>{if(ok)rdRel(A,"v",8)},rt:"Phi tần trẻ đỏ mặt bỏ đi.",rf:"Nàng ta cười: “Tỷ thương hại kẻ đã đánh tỷ sao?”"},
  {n:"Đứng xem",f:"hard",wx:"nỗi uất năm xưa được trả",lx:"tiếng ác lan ra",go:A=>{rdOan(A,"v",10)},rt:"{v} quỳ giữa sân, không nhìn ngươi lấy một lần."},
  {n:"Bảo nàng ta đi, tự nói với {v}",sc:1,wx:"{v} thấy ai che cho nàng",lx:"{v} chưa chắc nhận",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} nghe xong, chỉ nói: “Ta nợ muội.”",rf:"{v} quay mặt: “Không cần muội.”"}]},
 c2:{h:"Kho cung {v}",w:"eun",if:A=>!!rv67(A,"v"),need:["v"],t:"{eun} hỏi ngươi có muốn lấy những món cung {v} phải trả lại Nội vụ phủ: bình phong, đôn sứ, cả bộ chén men lam năm xưa.",o:[
  {n:"Xin lấy bộ chén men lam",f:"hard",wx:"giữ được kỷ vật",lx:"{v} cho là ngươi cướp",go:A=>{rdOan(A,"v",4)},rt:"Bộ chén về cung ngươi, đúng chiếc ngươi từng làm mẻ."},
  {n:"Xin để đồ lại cho {v}",sc:1,f:"kind",wx:"{v} còn thể diện",lx:"{eun} tiếc lễ",go:(A,ok)=>{if(ok)rdRel(A,"v",8)},rt:"Đồ trong cung {v} được giữ nguyên.",rf:"{eun} nhận bạc mà chỉ giữ được nửa."},
  {n:"Không lấy gì",wx:"tay sạch",lx:"người ta bảo ngươi không dám nhận",rt:"Đồ cung {v} được chia cho các cung khác."}]},
 t1:{h:"Tờ đơn của {v}",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} gửi đến một tờ giấy, chữ run run: nàng xin ngươi nói một lời với Hoàng thượng cho cung nàng được cấp lại bổng lộc trước mùa rét.",o:[
  {n:"Nói giúp với Hoàng thượng",sc:1,f:"kind",wx:"{v} nợ ngươi một ân lớn",lx:"ngài không vui khi phi tần bàn triều",go:(A,ok)=>{if(ok){rdRel(A,"v",15);const v=rv67(A,"v");if(v)v.cutPay=0}},rt:"Cung {v} được cấp lại bổng lộc.",rf:"Hoàng thượng bảo: “Việc triều không phải việc của nàng.”"},
  {n:"Trả lời: thiếp không dám",wx:"giữ được lòng Hoàng thượng",lx:"{v} biết ngươi nhớ thù, tiếng bạc",go:A=>{rdOan(A,"v",4)},rt:"Ngươi gửi trả tờ giấy."},
  {n:"Đổi lời giúp lấy một lời thật",sc:1,f:"hard",wx:"{v} khai chuyện chén ngọc năm xưa",lx:"{v} thấy bị ép",rt:"{v} viết: “Chén ngọc là ta làm vỡ.” Ngươi giữ tờ giấy ấy.",rf:"{v} xé đơn, không xin nữa."}]},
 x1:{h:"Phán một lỗi của {v}",w:"hh",if:A=>!!rv67(A,"v"),need:["v"],t:A=>`Cung nữ của {v} làm vỡ đồ ngự dụng. ${CN_Q()} bảo: “${CN_QY(1)} ${CNCHU_UP(A)>0?"nay đứng trên nàng":CNCHU_UP(A)===0?"nay đứng ngang nàng":"thấy tận mắt"}, việc này ${CN_QY()} phán.” Cả cung chờ xem.`,o:[
  {n:"Tha, tự đền đồ vỡ",e:["win","mid"],go:A=>{rdRel(A,"v",8)},rt:"{v} cúi đầu thật sâu trước ngươi, lần đầu tiên.",rf:"Ngươi tha, người ta bảo ngươi mềm yếu."},
  {n:"Xử đúng phép, không nặng không nhẹ",e:["win","lose"],rt:"Cả cung phục: ngươi xử như xử bất kỳ ai.",rf:"Người ta nói ngươi mượn phép để trả thù."},
  {need:["hh"],n:"Xin Hoàng hậu tự phán",e:"mid",lx:"bỏ dịp tỏ lòng",rt:"Hoàng hậu phạt nhẹ, không nhắc tên ngươi."}]}},
 E:{win:{k:1,tag:"Ơn trên kẻ dưới",t:"Người ta nói: kẻ hầu năm xưa đứng trên chủ cũ mà không đạp lên nàng. Tiếng ngươi vượt cả phẩm của ngươi."},
  mid:{k:0,tag:"Phép là phép",t:"Việc xong theo lệ. {v} không mang ơn, cũng không thêm oán."},
  lose:{k:-1,tag:"Mang tiếng đạp người ngã",t:()=>`Người ta kể ngươi ra tay khi {v} sa cơ. ${CN_TH()} lắc đầu khi nghe tên ngươi.`,go:A=>{rdOan(A,"v",8);return ""}}}});

rdDef("cn_chu",10,{t:"Đối diện",w:"v",sj:"đêm ngươi và {v} ngồi đối diện",cast(A){return rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A)},
 g:"Một đêm mưa, {v} mời ngươi đến gian trà nhỏ sau cung nàng, chính nơi ngươi từng quỳ suốt đêm năm xưa. Chỉ có hai người. Những điều chưa nói, đêm nay phải nói.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đèn lồng trong mưa",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&RDW(1)(),t:"{v} tự cầm đèn ra cửa đón ngươi. Không cung nữ nào theo. Nàng rót trà, tay hơi run.",o:[
  {n:"Đỡ ấm, tự rót cho nàng",sc:1,f:"kind",wx:"đêm nay mở lòng",lx:"nàng thấy ngươi vẫn còn là tớ",go:A=>{rdRel(A,"v",5)},rt:"{v} nhìn tay ngươi rót, khẽ cười."},
  {n:"Ngồi yên, để nàng rót",sc:1,wx:"đêm nay hai người ngang nhau",lx:"nàng thấy bị thử, ngươi mang tiếng kiêu",rt:"{v} rót trà cho ngươi, như rót cho khách quý.",rf:"Nàng đặt ấm xuống mạnh tay."},
  {n:"Hỏi thẳng vì sao mời",sc:1,f:"hard",wx:"vào thẳng chuyện",lx:"nàng đóng lòng lại",rt:"{v} thở dài: “Ta muốn nói chuyện trước khi già.”",rf:"{v} cười nhạt: “Muội vẫn nóng như xưa.”"}]},
 s2:{h:"Gian trà lạnh",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&RDW(0)(),t:"Gian trà không đốt lò. {v} ngồi sẵn, chỉ chỗ đất trước mặt: “Năm ấy muội quỳ đúng chỗ này.”",o:[
  {n:"Ngồi xuống ghế, không quỳ",sc:1,f:"hard",wx:"nàng biết ngươi không còn quỳ",lx:"phải hạ mình gọi nàng lại",go:A=>{rdOan(A,"v",3)},rt:"Ngươi ngồi xuống. {v} không nói gì.",rf:"{v} đứng dậy định bỏ đi, ngươi phải gọi lại."},
  {n:"Đứng đúng chỗ ấy mà nhìn nàng",sc:1,wx:"nàng thấy cái giá của năm xưa",lx:"lòng ngươi đau lại",rt:"{v} cụp mắt trước.",rf:"Chân ngươi nhũn ra, phải vịn bàn."},
  {n:"Sai {maid} đốt lò, mang trà mới",f:"kind",wx:"gian trà ấm lại",lx:"{v} thấy ngươi lấn cung nàng",rt:"Lửa lên, mặt {v} dịu đi đôi chút."}]},
 c1:{h:"Chén ngọc vỡ năm ấy",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Ngươi nhắc đến chén ngọc năm ấy. {v} im rất lâu, rồi hỏi: “Muội vẫn nghĩ là ta làm vỡ?”",o:[
  {n:"Đưa ra lời của lão thái giám",sc:1,f:"hard",wx:"nàng không chối được",lx:"nàng thấy bị tra",rt:"{v} gật đầu: “Phải. Ta sợ bị đuổi khỏi cung.”",rf:"{v} bảo lão thái giám già lẩn rồi."},
  {n:"Nói: thiếp không cần biết nữa",sc:1,f:"kind",wx:"nàng tự nói ra",lx:"cái oan của ngươi không ai rửa",rt:"{v} cúi đầu: “Là ta. Ta nợ muội một lời.”"},
  {n:"Hỏi ai đứng sau nàng năm ấy",sc:1,wx:"biết một kẻ thứ ba",lx:"{v} ngờ ngươi đào chuyện",rt:()=>`{v} kể: năm ấy một mama của Hoàng hậu cũ ép nàng phải đổ cho ai đó.`,rf:"{v} lắc đầu, không nói."}]},
 c2:{h:"Trận đòn năm ấy",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} nhắc trận đòn hai mươi roi năm xưa: “Nếu ta không đánh, người ta đánh muội đến chết.”",o:[
  {n:"Tin nàng",sc:1,f:"kind",wx:"một nút thắt gỡ ra",lx:"có thể nàng chỉ biện minh",go:A=>{rdRel(A,"v",8)},rt:"{v} khóc. Ngươi để yên cho nàng khóc."},
  {n:"Bảo nàng nói thật",sc:1,f:"hard",wx:"nghe được điều thật",lx:"nàng thấy ngươi không tin, giận bỏ đi",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"{v} nhận: một nửa là sợ, một nửa là ghen ngươi được Hoàng thượng để mắt.",rf:"{v} đứng dậy: “Muội tin hay không, tùy muội.”"},
  {n:"Cho nàng xem vết sẹo",sc:1,wx:"nàng thấy cái giá thật",lx:"lòng ngươi đau lại",rt:"{v} chạm vào vết sẹo, tay run lên.",rf:"{v} quay mặt, không dám nhìn."}]},
 t1:{h:"Điều nàng sợ",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Gần sáng, {v} nói điều nàng sợ nhất: ngươi lên cao rồi sẽ đuổi nàng ra một cung xa, để nàng già đi một mình.",o:[
  {n:"Hứa không bao giờ làm thế",sc:1,f:"kind",wx:"nàng yên lòng",lx:"một lời hứa trói tay ngươi",go:A=>{rdRel(A,"v",8)},rt:"{v} nắm lấy tay ngươi."},
  {n:"Nói: tùy tỷ đối với thiếp thế nào",sc:1,f:"hard",wx:"nàng biết phải giữ mình",lx:"nàng sợ thêm, cho là ngươi còn giận",rt:"{v} gật đầu: “Ta hiểu rồi.”",rf:"{v} cười buồn: “Vậy là muội vẫn giận.”"},
  {n:"Im lặng",wx:"không hứa điều mình chưa chắc",lx:"nàng đoán theo ý xấu nhất",rt:"Mưa ngoài hiên cũng tạnh."}]},
 x1:{h:"Rạng đông",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Trời hửng sáng. Chuông Càn Thanh cung điểm. {v} đứng dậy, chờ ngươi nói câu cuối.",o:[
  {n:"Đưa tay ra: “Tỷ tỷ, chuyện cũ thôi.”",e:["win","mid"],go:A=>{rdRel(A,"v",10)},rt:"{v} nắm tay ngươi, hai người cùng đi dưới mái hiên ướt.",rf:"{v} chạm tay ngươi rồi rụt lại."},
  {n:"Đòi nàng quỳ nói lời xin lỗi",e:["win","lose"],rt:"{v} quỳ xuống chỗ ngươi từng quỳ. Ngươi đỡ nàng dậy.",rf:"{v} đứng thẳng: “Ta đã nói hết. Muội đi đi.”"},
  {n:"Lặng lẽ ra về",e:"mid",lx:"lời chưa nói vẫn nằm đó",rt:"Ngươi khoác áo, bước ra trong sương sớm."}]}},
 E:{win:{k:1,tag:"Hiểu nhau",t:"Đêm ấy khép lại một mối oán. {v} không còn là chủ cũ của ngươi, mà là người biết ngươi từ thuở chẳng có gì.",go:A=>{rdRel(A,"v",10);return ""}},
  mid:{k:0,tag:"Lời chưa nói hết",t:"Hai người chia tay ở cửa gian trà. Có điều đã nói, có điều vẫn để đó."},
  lose:{k:-1,tag:"Vết thương mở lại",t:"Đêm ấy chỉ khơi lại vết thương cũ. {v} kể với người khác rằng ngươi đến để làm nhục nàng.",go:A=>{rdOan(A,"v",10);return ""}}}});

rdDef("cn_chu",11,{t:"Chủ tớ năm xưa",w:"v",sj:"mối chủ tớ giữa ngươi và {v}",cast(A){return rdCast(A,["v"],CN_NORECAST)&&CNCHU_MARK(A)},
 g:()=>`${CN_Q()} muốn khép chuyện chủ tớ giữa ngươi và {v} trước mặt cả cung, để từ nay không ai còn đem nó ra nói. Đây là kết cục truyện xuất thân của ngươi.`,
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:()=>`${CN_Q()} triệu cả hai`,w:"hh",need:["v"],if:A=>!!rv67(A,"v")&&RDW(1)(),t:()=>`${CN_Q()} triệu ngươi và {v} cùng đến. Người cười: “Nghe nói hai muội đã thân lại. Bản cung muốn cả cung cùng thấy.”`,o:[
  {n:"Xin cùng {v} dâng lễ chung",sc:1,f:"kind",wx:"cả cung thấy hai người một lòng",lx:"có kẻ bảo ngươi kéo {v} lên",go:A=>{rdRel(A,"v",6)},rt:"Hai người cùng dâng một bức thêu, mỗi người thêu một nửa."},
  {need:["hh"],n:"Xin Hoàng hậu đừng làm lớn",sc:1,wx:"việc giữ trong vòng nhỏ",lx:"Hoàng hậu thấy ngươi khách sáo",rt:"Hoàng hậu gật đầu: “Vậy chỉ mời vài người.”",rf:"Hoàng hậu bảo: “Bản cung đã định rồi.”"},
  {n:"Hỏi ý {v} trước",wx:"không làm nàng bất ngờ",lx:"việc chậm lại, phải chạy qua lại",go:A=>{rdRel(A,"v",3)},rt:"{v} nói: “Muội định thế nào, ta theo thế ấy.”"}]},
 s2:{h:()=>`${CN_Q()} muốn dứt chuyện`,w:"hh",need:["v"],if:A=>!!rv67(A,"v")&&RDW(0)(),t:()=>`${CN_Q()} triệu ngươi đến một mình: “Chuyện của ${CN_QY()} và {v} làm cả cung bàn tán đã lâu. ${CN_QI(1)} không muốn nghe nữa.”`,o:[
  {need:["hh"],n:"Xin Hoàng hậu cho nói lời cuối",sc:1,wx:"được một dịp nói thẳng",lx:"Hoàng hậu bực",rt:"Hoàng hậu cho mở một buổi trà, mời cả {v}.",rf:"Hoàng hậu bảo: “Muội tự giải lấy.”"},
  {n:"Nhận lỗi về mình",f:"kind",wx:()=>`${CN_Q()} thấy ngươi biết lui`,lx:"{v} được tiếng là kẻ bị hại",rt:()=>`${CN_Q()} dịu giọng: “Biết lui là tốt.”`},
  {n:"Đưa chứng cứ chuyện năm xưa",sc:1,f:"hard",wx:()=>`${CN_Q()} biết ai sai trước`,lx:"bị coi là bới chuyện cũ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:()=>`${CN_Q()} đọc tờ giấy, nhìn ngươi khác đi.`,rf:()=>`${CN_Q()} bảo: “Giấy cũ, ai biết thật giả.”`}]},
 c1:{h:"Gian nhà cung nữ cũ",w:"eun",t:"{eun} báo: dãy nhà cung nữ cũ sau cung {v}, nơi ngươi từng ở, sắp bị dỡ để xây kho.",o:[
  {n:"Xin giữ lại một gian",sc:1,wx:"nhắc mình nhớ gốc",lx:"người ta bảo ngươi khoe khổ",rt:"Gian nhà được giữ, ngươi treo vào đó một tấm biển gỗ.",rf:"{eun} nhận bạc, nhưng gian nhà vẫn bị dỡ."},
  {n:"Rủ {v} cùng đến xem lần cuối",sc:1,f:"kind",wx:"hai người cùng nhớ chuyện cũ",lx:"{v} từ chối trước mặt người khác",go:(A,ok)=>{rdRel(A,"v",ok?8:-3)},rt:"{v} đứng ở bậc cửa, kể ngày ngươi mới đến, mặt còn lấm bụi.",rf:"{v} sai người đáp: không rảnh."},
  {n:"Để dỡ",wx:"quá khứ không còn chỗ đứng",lx:"một phần đời mất đi, người cũ trách",rt:"Dãy nhà đổ trong một buổi chiều."}]},
 c2:{h:"Người cũ nhìn vào",w:"maid",if:A=>!!rv67(A,"v"),need:["v"],t:"Cung nữ khắp cung đều đang nhìn: kẻ từng như họ nay sẽ đối xử với chủ cũ thế nào. Cách ngươi làm hôm nay là cách họ mong được đối xử.",o:[
  {n:"Ban thưởng cho cung nữ cả hai cung",wx:"cung nhân khắp nơi nhớ ơn",lx:"tốn bạc",rt:"Cung nữ hai cung đều được một xấp vải."},
  {n:"Giữ phép, không ban riêng",f:"hard",wx:"không ai bảo ngươi mua lòng người",lx:"cung nhân thấy ngươi đã xa họ",rt:"Ngươi giữ lệ cũ."},
  {n:"Cho {maid} đứng cạnh mình trong lễ",sc:1,f:"kind",wx:"cung nhân thấy ngươi không quên",lx:"có phi tần chê ngươi mất phép",rt:"{maid} đứng cạnh ngươi, mắt đỏ hoe.",rf:()=>`${CN_Q()} bảo {maid} lui xuống hàng sau.`}]},
 t1:{h:()=>`${CN_Q()} hỏi ngươi muốn gì`,w:"hh",if:A=>!!rv67(A,"v"),need:["v","hh"],t:()=>`Trước buổi lễ, ${CN_Q()} hỏi riêng: “${CN_QY(1)} muốn ${CN_QI()} xử thế nào với {v}?”`,o:[
  {need:["hh"],n:"Xin để {v} đứng cạnh mình",sc:1,f:"kind",wx:"Hoàng hậu thấy ngươi rộng lượng",lx:"Hoàng hậu ngờ ngươi giả",rt:"Hoàng hậu gật đầu, cho đặt hai ghế ngang nhau.",rf:"Hoàng hậu bảo: “Để bản cung xem đã.”"},
  {need:["hh"],n:"Xin Hoàng hậu xử theo phép",f:"hard",wx:"phép cung đứng về phía ngươi",lx:"{v} biết ngươi xin, tiếng không rộng lượng",go:A=>{rdOan(A,"v",5)},rt:"Hoàng hậu ghi lại mọi lỗi cũ của {v}."},
  {need:["hh"],n:"Thưa: thiếp không muốn gì",wx:"Hoàng hậu yên lòng",lx:"việc tùy người khác định",rt:"Hoàng hậu cười: “Muội khéo lắm.”"}]},
 x1:{h:"Trước mặt cả cung",w:"hh",if:A=>!!rv67(A,"v"),need:["v"],t:()=>`Ở sân ${CN_QP()}, phi tần và cung nhân đứng chật. {v} bước ra trước mặt ngươi. Từ hôm nay, mối chủ tớ năm xưa sẽ được nhớ theo cách ngươi làm.`,o:[
  {n:"Đỡ {v} dậy, gọi một tiếng tỷ",e:["win","mid"],go:A=>{rdRel(A,"v",15)},rt:()=>`Ngươi đỡ {v} dậy trước khi nàng kịp quỳ. Cả sân lặng đi, rồi ${CN_Q()} gật đầu.`,rf:"Ngươi gọi tỷ, {v} đáp khẽ, mắt vẫn tránh ngươi."},
  {n:"Để phép cung xử {v}",e:["win2","lose"],go:A=>{rdOan(A,"v",12)},rt:()=>`${CN_Q()} đọc từng lỗi cũ của {v}. Nàng bị giáng một bậc, khất bổng, lui về cuối hàng.`,rf:"Cả sân nhìn ngươi như nhìn kẻ trả thù."},
  {n:"Nói: chuyện cũ đã xong",e:"mid",lx:"không ai thật lòng tin",rt:"Ngươi nói một câu rồi lui về chỗ. Lễ tan."}]}},
 E:{win:{k:1,tag:"Chủ tớ thành tỷ muội",w:"v",t:()=>`Cả cung kể: kẻ hầu trà năm xưa đỡ chủ cũ đứng dậy. {v} từ đó là người đỡ lời ngươi trước ${CN_Q()}, và cung nữ khắp nơi gọi tên ngươi bằng giọng kính.`,go:A=>e67ally(rv67(A,"v"),25)},
  win2:{k:1,tag:"Chủ cũ sa cơ",t:"{v} bị giáng một bậc, đứng cuối hàng trong mọi lễ. Không ai còn dám nhắc ngươi từng là tớ của ai. Nhưng trong cung có người nói nhỏ: đừng làm mất lòng nương nương ấy.",go:A=>{const v=rv67(A,"v");return v?[e67pun(v,8),e67drop(v,"vì lỗi cũ"),CN_PAY(v,BAL.road.cn_chu.phat,CN_Q())].filter(Boolean).join(" "):""}},
  mid:{k:0,tag:"Mỗi người một vết sẹo",t:"Chuyện chủ tớ khép lại trên giấy. Ngươi và {v} gặp nhau vẫn chào, nhưng cả hai đều mang một vết sẹo không ai thấy."},
  lose:{k:-1,tag:"Mang tiếng vong ân",t:()=>`Người ta nhớ ngươi là kẻ hầu lên cao rồi quay lại hại chủ. ${CN_QK()==="hh"&&!S.thDead?"Thái hậu và Hoàng hậu":CN_Q()} đều nhạt với ngươi. {v} được thương như người bị hại.`,go:A=>{const v=rv67(A,"v");if(v)v.sung=(v.sung||0)+4;return v?`${v.name} được Hoàng thượng thương xót.`:""}}}});
RD97L.push(rdRare({a:"cn_chu_11",tag:"Chủ cũ tạ lỗi trước Hoàng hậu",w:"v",n:"Mời {v} cùng nói chuyện năm xưa trước Hoàng hậu",
 path:["mời {v} sang dùng trà","Kể chuyện {v} từng che chở","Đền bạc, xin nàng về hầu","Lặng lẽ gửi than sang","Tha, tự đền đồ vỡ","Đưa tay ra","Đỡ {v} dậy"],bad:["Đứng xem","Để phép cung xử","Đòi nàng quỳ"],x:[()=>qOn()&&S.duc>=RR("cn_chu_11").bar,"Hoàng hậu còn tại vị, Đức từ "+RR("cn_chu_11").bar],
 t:()=>`Trước mặt ${CN_Q()} và cả cung, {v} tự nói ra: năm ấy chính nàng làm vỡ chén ngọc, để kẻ hầu nhỏ chịu đòn thay. Nàng cúi đầu xin ngươi tha thứ. Ngươi đỡ nàng dậy, và từ đó cả cung gọi hai người là tỷ muội.`,go:A=>e67ally(rv67(A,"v"),35),rw:"nt_nhuy",ti:"Người hầu trà được chủ cũ tạ lỗi"}));

/* ---------- cn_tinh · Mối tình thuở hầu trà ---------- */
/* {n1} = the guard of .4 (ARC67.cn_tinh cast A.n1). jroad carries only A.act, so the name is kept once in S.st.f14.cnG and read back
   every chapter (taken from the .4 thread when it is still reachable, else a new name). {v} = the consort whose people held the letter
   in .4 (introduced here from .5 on and carried by rdCast). */
const CNTINH_G=A=>{try{const f=S.st.f14||{};if(!f.cnG){let n=f.n1||"";if(!n)for(const t of [S.st.M].concat(S.st.X||[]))if(t&&t.a==="cn_tinh"&&t.n1){n=t.n1;break}
  f.cnG=n||("thị vệ "+pick(SURN)+" "+pick(MALEN))}A.n1=f.cnG}catch(e){A.n1="thị vệ năm xưa"}return true};

rdDef("cn_tinh",5,{t:"Thư cũ",w:"maid",sj:"những bức thư năm xưa",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:"Một bức thư đã từng bị trình lên Hoàng thượng. Những bức còn lại vẫn trôi nổi đâu đó, và người của {v}, kẻ đứng sau lần trình thư trước, cũng đang tìm. Phải tìm thấy trước họ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phòng hắn bị lục",w:"maid",if:RDW(1),t:()=>rdPrev()==="r97"?"{n1} đã đỡ vuốt hổ cứu giá, Hoàng thượng nhớ mặt hắn. Vậy mà {maid} mang về lời của {n1}: phòng hắn ở trại thị vệ vừa bị lục, có kẻ tìm thư.":rdPrev()==="win2"?"Kẻ trình thư đã bị phạt, nhưng {v}, người sai hắn, vẫn bình yên. {maid} mang về lời của {n1}: phòng hắn ở trại thị vệ vừa bị lục.":"Hoàng thượng đã tin ngươi. Vậy mà {maid} mang về lời của {n1}: phòng hắn vừa bị lục, có kẻ tìm thư.",o:[
  {n:"Bảo hắn đưa hết thư cho {maid}",sc:1,f:"letters",wx:"thư về tay người mình",lx:"{maid} bị thấy đi lại trại thị vệ",rt:"{n1} gói một bức thư trong khăn, trao lại không nói lời nào.",rf:"{maid} bị lính tuần hỏi vì sao lui tới trại."},
  {n:"Bỏ bạc nhờ đội trưởng canh phòng hắn",sc:1,wx:"không ai lục được nữa",lx:"đội trưởng tò mò",rt:"Đội trưởng nhận bạc, cho người canh gian phòng ấy.",rf:"Đội trưởng nhận bạc rồi hỏi: “Nương nương quen hắn sao?”"},
  {n:"Không đáp, để hắn tự lo",wx:"không để lại dấu",lx:"hắn thấy bị bỏ rơi, thư có thể lọt",rt:"Ngươi không gửi lại lời nào."}]},
 s2:{h:"Ánh mắt Hoàng thượng",w:"maid",if:RDW(0),t:"Hoàng thượng thôi nhắc chuyện cũ, nhưng mỗi lần ngài nhìn ngươi đều lâu hơn trước. {maid} báo nhỏ: thư còn, và người của {v} cũng đang tìm.",o:[
  {n:"Hỏi {maid} nhớ những gì",sc:1,wx:"biết thư nằm ở đâu",lx:"nhắc chuyện cũ làm ngươi mất ngủ",rt:"{maid} nhớ: một bức hắn gửi về quê, một bức hắn giữ trong người.",rf:"{maid} chỉ nhớ lờ mờ."},
  {n:"Dồn sức chiều lòng Hoàng thượng",wx:"ngài bớt nghi",lx:"việc tìm thư chậm lại",rt:"Hoàng thượng ở lại cung ngươi ba đêm liền."},
  {n:"Cho người theo dõi cung {v}",sc:1,f:"watch",wx:"biết {v} tìm đến đâu",lx:"người theo dõi bị bắt gặp",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"Người của ngươi biết {v} đã sai một thái giám ra ngoài cung.",rf:"{v} bắt được người theo dõi, cười nhạt."}]},
 c1:{h:"Trại thị vệ",w:"eun",t:"Nếu thư còn trong trại thị vệ, phải lấy ra trước khi đổi ca. Trại ấy đàn bà không được bước vào.",o:[
  {n:"Sai một tiểu thái giám tin cẩn",sc:1,f:"letters",wx:"lấy được thư",lx:"tiểu thái giám biết chuyện",rt:"Tiểu thái giám mang về một bức thư nhàu, chữ ngươi còn rõ.",rf:"Tiểu thái giám bị đuổi ra, tay không."},
  {n:"Nhờ {eun} kiểm trại, mượn cớ khác",sc:1,wx:"lục trại mà không ai nghi",lx:"{eun} đoán ra",rt:"{eun} kiểm trại tìm đồ lậu, tiện tay đưa ngươi một phong thư.",rf:"{eun} nhìn ngươi lâu, nói: “Nô tài không thấy gì.”"},
  {n:"Gửi lời bảo hắn tự đốt",f:"trust",wx:"tin vào hắn",lx:"không biết hắn có làm, lòng không yên",rt:"Hắn đáp lại một chữ: “Vâng.”"}]},
 c2:{h:"Hộp gỗ ở quê",w:"maid",t:"{n1} từng gửi một hộp gỗ về quê cho mẹ. Trong đó có thể có thư của ngươi. Phải lấy về trước khi tuyết phủ kín đường.",o:[
  {n:"Sai người về quê hắn",sc:1,f:"letters",wx:"hộp gỗ về tay",lx:"người đi đường biết chuyện",rt:"Người của ngươi mang về hộp gỗ: một bức thư, một chiếc khăn ngươi thêu năm mười lăm tuổi.",rf:"Người đi về tay không, mẹ hắn đã đem hộp đi đâu."},
  {n:"Viết thư cho mẹ hắn bằng tên người khác",sc:1,wx:"bà lão tự đốt",lx:"thêm một bức thư đi ngoài cung",rt:"Bà lão hồi âm: đã đốt hết, xin cô nương yên lòng.",rf:"Thư không đến, đường đã tuyết."},
  {n:"Gửi bạc nuôi mẹ hắn",f:"trust",wx:"nhà hắn mang ơn ngươi",lx:"hộp gỗ vẫn còn đó",rt:"Mẹ {n1} nhận bạc, nhờ người gửi lời chúc ngươi bình an."}]},
 t1:{h:"Người đưa tin hai mang",w:"maid",need:["v"],t:"{maid} phát hiện: tiểu cung nữ chuyên đưa lời giữa ngươi và {n1} đã bán tin cho người của {v}.",o:[
  {n:"Đuổi nàng ra khỏi cung",wx:"cắt đường rò",lx:"người ta bảo ngươi tàn nhẫn",go:A=>{rdOan(A,"v",3)},rt:"Tiểu cung nữ bị đưa sang Hoán y cục."},
  {n:"Để nàng mang tin giả về",sc:2,f:"watch",wx:"{v} đi tìm sai chỗ",lx:"nàng nhận ra bị lừa",rt:"{v} cho người đào cả gốc hòe sau trại, chẳng thấy gì.",rf:"Tiểu cung nữ thôi không đến nữa."},
  {n:"Trả gấp đôi để giữ miệng",wx:"có tai trong cung {v}",lx:"nàng bán được thì bán nữa",rt:"Tiểu cung nữ thề thốt, nhận bạc."}]},
 x1:{h:"Đêm đốt thư",w:"maid",need:["v"],t:"Đêm cuối tháng, thư đã gom về đủ. Nhưng lính tuần vừa đổi người: đội tuần mới do người của {v} dẫn đầu.",o:[
  {n:"Đốt ngay trong tẩm điện",e:["win","lose"],rt:"Thư cháy thành tro trong lò hương. Khói lẫn vào mùi trầm, không ai biết.",rf:"Lính tuần ngửi thấy mùi giấy cháy, gõ cửa hỏi."},
  {n:"Giao thư cho {n1} tự đốt",e:["win","mid"],rt:"Sáng hôm sau, hắn gửi về một nắm tro gói trong lá sen.",rf:"Hắn nhận thư, nhưng không ai biết hắn có đốt."},
  {n:"Khâu vào lót kinh Phật",e:"mid",lx:"thư vẫn còn trên đời",rt:"{maid} khâu thư vào lót bộ kinh trên án thờ."}]}},
 E:{win:{k:1,tag:"Thư đã thành tro",t:"Những bức thư năm xưa không còn. Quá khứ chỉ còn trong trí nhớ của ngươi và một người."},
  mid:{k:0,tag:"Thư chưa rõ còn mất",t:"Ngươi không chắc tất cả đã mất. Mỗi lần có người lạ đến cửa cung, tim ngươi lại thắt."},
  lose:{k:-1,tag:"Thư sang tay {v}",t:"Một bức thư lọt vào tay {v}. Nàng chưa trình lên ai, nhưng nàng cho ngươi biết nàng đang giữ.",go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("cn_tinh",6,{t:"Kẻ cầm thư",w:"v",sj:"bức thư trong tay {v}",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:"Một bức thư của ngươi đang nằm trong tay {v}. Nàng chưa trình lên ai: nàng muốn đổi. Thái giám của nàng đã ra giá, hạn trước rằm tháng sau.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bản chép gửi đến",w:"v",need:["v"],if:RDW(1),t:"Ngươi tưởng thư đã thành tro. Vậy mà {v} sai người gửi sang một bản chép, kèm lời nhắn: “Bản gốc thứ ba, muội quên rồi sao?”",o:[
  {n:"So bản chép với trí nhớ",sc:1,f:"fake",wx:"biết thư thật hay bịa",lx:"đêm ấy không ngủ",rt:"Có hai chữ ngươi chưa từng viết. Bản gốc có thể là giả.",rf:"Nét chữ giống đến rợn người."},
  {n:"Gửi lại một câu: muội không hiểu",sc:1,wx:"{v} không biết ngươi sợ",lx:"{v} thấy bị khinh, ép mạnh hơn",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"{v} im lặng ba ngày.",rf:"{v} cho người kể bóng gió khắp cung."},
  {n:"Hỏi {n1} có thư thứ ba không",f:"trust",wx:"nghe từ người trong cuộc",lx:"lại một lần gửi lời cho hắn, dễ bị thấy",rt:"Hắn đáp: có một bức hắn từng làm mất, năm ngươi được sủng hạnh."}]},
 s2:{h:"Thái giám của {v}",w:"v",need:["v"],if:RDW(0),t:"Thái giám thân cận của {v} đến thỉnh an, cúi rất thấp: “Chủ nhân nô tài nhặt được một thứ của nương nương. Muốn trả, chỉ là đường xa, cần chút lộ phí.”",o:[
  {n:"Hỏi giá thẳng",sc:1,wx:"biết {v} muốn gì",lx:"lộ ra ngươi đang sợ",rt:"Hắn nói: một túi bạc nặng, hoặc một lời của nương nương với Hoàng thượng.",rf:"Hắn chỉ cười: “Nương nương tự biết.”"},
  {n:"Đuổi hắn ra",f:"hard",wx:"không chịu bị dọa",lx:"{v} giận, kể bóng gió khắp cung",go:A=>{rdOan(A,"v",5)},rt:"Hắn lui ra, lẩm bẩm câu gì đó."},
  {n:"Thưởng hắn, giữ hắn nói chuyện",sc:1,f:"turn",wx:"dò được hắn",lx:"hắn báo lại với chủ",rt:"Hắn ngồi lâu, lỡ miệng nói thư cất trong hộp trang sức của {v}.",rf:"Hắn uống trà xong, về kể hết."}]},
 c1:{h:"Cái giá",w:"v",need:["v"],t:"Cái giá của {v}: một túi bạc nặng, hoặc ngươi nhường nàng ba đêm Hoàng thượng định ghé cung ngươi. Hạn trước rằm.",o:[
  {n:"Gom bạc dần, chưa trả",sc:1,f:"pay",wx:"có sẵn nửa túi bạc khi cần: ngày rằm chỉ phải bù nửa còn lại",lx:"bạc nằm im, không sinh lời",rt:"Ngươi cất riêng một túi bạc."},
  {n:"Nhường {v} ba đêm",sc:1,f:"night",wx:"{v} có cái nàng muốn",lx:"mất ân sủng, Hoàng thượng lấy làm lạ",go:(A,ok)=>{if(ok)rdRel(A,"v",8)},rt:"Ngươi cáo mệt, khéo nhắc tên {v}. Ba đêm ấy Hoàng thượng sang cung nàng.",rf:"Hoàng thượng hỏi: “Sao nàng cứ đẩy trẫm đi?”"},
  {n:"Kéo dài, nói cần thời gian",sc:1,wx:"thêm ngày để tìm đường khác",lx:"{v} mất kiên nhẫn",rt:"{v} cho thêm mười ngày.",rf:"{v} gửi lời: “Muội đang đùa với ta.”"}]},
 c2:{h:"Hộp trang sức",w:"maid",need:["v"],t:"Có tin: thư nằm trong hộp trang sức của {v}, cất ở tẩm điện nàng. Cung nữ quét dọn ở đó là đồng hương của {maid}.",o:[
  {n:"Nhờ cung nữ ấy lấy trộm",sc:2,f:"stole",wx:"lấy lại thư tận tay",lx:"nếu bị bắt thì thành tội trộm",go:(A,ok)=>{rdOan(A,"v",ok?6:10)},rt:"Cung nữ ấy giấu thư trong búi tóc mang ra.",rf:"Cung nữ ấy bị bắt quả tang, khai ra {maid}."},
  {n:"Chỉ nhờ xem thư thật hay giả",sc:1,f:"fake",wx:"biết thư có đáng sợ không",lx:"cung nữ ấy bị nghi",rt:"Cung nữ ấy nói: thư thật, nhưng không đề ngày.",rf:"Cung nữ ấy chưa kịp xem đã bị đổi việc."},
  {n:"Không đụng vào cung {v}",wx:"tay sạch",lx:"thư vẫn trong tay nàng, lòng không yên",rt:"Ngươi dặn {maid} quên chuyện này."}]},
 t1:{h:"Một điều {v} giấu",w:"maid",need:["v"],t:"{maid} nghe được: {v} từng đút lót Kính sự phòng để được ghi thêm đêm thị tẩm. Nếu Hoàng thượng biết, nàng mất hết.",o:[
  {n:"Tìm chứng cứ việc đút lót",sc:2,f:"leash",wx:"cầm dây cương của {v}",lx:"người Kính sự phòng biết ngươi dò",rt:"Một thái giám Kính sự phòng chép cho ngươi hai dòng sổ.",rf:"Người Kính sự phòng đóng sổ, báo cho {v}."},
  {n:"Gửi {v} một lời bóng gió",sc:1,f:"leash",wx:"{v} biết ngươi cũng có bài",lx:"{v} nói lại ngươi vu khống",go:A=>{rdOan(A,"v",4)},rt:"{v} đánh rơi chén trà khi nghe lời nhắn.",rf:"{v} cười: “Muội nghe ai nói bậy?”"},
  {n:"Không dùng điều ấy",wx:"không lấy bẩn trả bẩn",lx:"bỏ một lá bài",rt:"Ngươi bảo {maid} quên điều vừa nghe."}]},
 x1:{h:"Bên hồ sen",w:"v",need:["v"],t:"Rằm. {v} hẹn ngươi bên hồ sen, tay cầm phong thư, cười: “Muội chọn đi.”",o:[
  {n:"Đưa bạc, lấy thư",if:A=>!A.f.pay,e:["win","mid"],go:(A,ok)=>{if(ok)rdRel(A,"v",4)},rt:"{v} đếm bạc, trao thư. Ngươi đốt thư ngay trên mặt hồ.",rf:"{v} nhận bạc, trao thư, rồi nói: “Ta đã chép lại một bản.”"},
  {n:"Đưa túi bạc đã gom, bù nửa còn lại",if:A=>!!A.f.pay,e:["win","mid"],go:(A,ok)=>{if(ok)rdRel(A,"v",4)},rt:"{v} đếm bạc, trao thư. Ngươi đốt thư ngay trên mặt hồ.",rf:"{v} nhận bạc, trao thư, rồi nói: “Ta đã chép lại một bản.”"},
  {n:"Đưa ra chuyện Kính sự phòng",e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"{v} tái mặt, ném phong thư xuống chân ngươi.",rf:"{v} cười to: “Muội không có chứng cứ.” Nàng cất thư đi."},
  {n:"Bảo nàng cứ trình lên",e:"mid",lx:"thư vẫn nằm trong tay nàng",go:A=>{rdOan(A,"v",3)},rt:"{v} khựng lại. Nàng không trình, nhưng cũng không trả."}]}},
 E:{win:{k:1,tag:"Đổi được thư",t:"Bức thư cuối cùng đã cháy. {v} không còn thứ gì để kề vào cổ ngươi."},
  mid:{k:0,tag:"Thư đổi chủ, nợ còn",t:"Thư về tay ngươi, hoặc nằm yên trong tay {v}. Nhưng ngươi biết nàng vẫn nắm một sợi dây."},
  lose:{k:-1,tag:"{v} giữ thư làm dây cương",t:"{v} giữ thư và giữ cả ngươi. Từ nay, nàng nói gì, ngươi phải nghe.",go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("cn_tinh",7,{t:"Thị vệ bị điều đi",w:"eun",sj:"lệnh điều {n1} ra biên ải",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:"Binh bộ ra lệnh điều {n1} ra biên ải. Lệnh đi đúng phép, nhưng có người đã nói một lời. Tìm ra ai, và quyết có nên ngăn.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lệnh đến lặng lẽ",w:"eun",if:RDW(1),t:"{eun} báo tin như chuyện thường: {n1} được điều ra trấn biên. Hắn không xin gì, chỉ nhờ người gửi lời chào ngươi.",o:[
  {n:"Để hắn đi, không gửi lời",f:"clean",wx:"không để lại dấu",lx:"hắn đi mà không biết lòng ngươi",rt:"Ngươi chỉ gật đầu với {eun}."},
  {n:"Hỏi {eun} lệnh từ đâu",sc:1,f:"who",wx:"biết người ra tay",lx:"lời ngươi hỏi lọt đến tai Hoàng thượng",rt:"{eun} hạ giọng: có người bên {v} nói với Binh bộ.",rf:"{eun} bảo: “Việc Binh bộ, nô tài không rõ.”"},
  {n:"Gửi áo rét theo đoàn",f:"kind",wx:"trọn nghĩa cũ",lx:"áo có thể bị lần ra",rt:"Một gói áo rét đi theo xe lương, không đề tên."}]},
 s2:{h:"{v} chúc mừng",w:"v",need:["v"],if:RDW(0),t:"{v} gặp ngươi ở hành lang, cười: “Nghe nói người gác cửa cung muội sắp đi xa. Muội chắc nhẹ lòng lắm.”",o:[
  {n:"Đáp: thiếp không biết hắn",sc:1,f:"clean",wx:"{v} không bắt được gì",lx:"lời chối lộ vẻ gượng",rt:"{v} nhún vai đi qua.",rf:"{v} cười to hơn: “Vậy sao mặt muội đỏ thế?”"},
  {n:"Hỏi lại: tỷ quen Binh bộ sao?",sc:1,f:"who",wx:"{v} lỡ lời",lx:"{v} biết ngươi đoán ra, kể ngươi đa nghi",go:A=>{rdOan(A,"v",4)},rt:"{v} buột miệng nhắc tên một Thị lang.",rf:"{v} quay đi không đáp."},
  {n:"Cúi chào, không đáp",wx:"không mắc câu",lx:"{v} đắc ý",rt:"Ngươi đi tiếp."}]},
 c1:{h:"Tờ lệnh của Binh bộ",w:"eun",t:"Tờ lệnh điều {n1} ký bởi một Thị lang Binh bộ. Thị lang ấy năm ngoái nhận lễ mừng thọ từ một nhà có con gái trong cung.",o:[
  {n:"Xin Hoàng thượng giữ hắn lại",sc:1,wx:"hắn ở lại kinh",lx:"Hoàng thượng hỏi vì sao ngươi lo cho một thị vệ",rt:"Hoàng thượng bảo Binh bộ cứ để hắn ở lại.",rf:"Hoàng thượng nhíu mày: “Một thị vệ thì có gì đáng nói?”"},
  {n:"Ghi tên Thị lang vào sổ",f:"who",wx:"nhớ kẻ nào đứng sau",lx:"thức đêm dò sổ, lệnh vẫn đi",rt:"Ngươi ghi tên Thị lang dưới tên {v}."},
  {n:"Để lệnh đi, coi như ơn trời",f:"clean",wx:"mối nguy rời xa",lx:"bị coi là phụ người cũ",rt:"Lệnh đóng dấu, ngày đi đã định."}]},
 c2:{h:"Mẹ già của {n1}",w:"maid",t:"Mẹ {n1} lên kinh tìm con, ngồi khóc trước cổng Tây Hoa môn. Bà không biết người con trai ấy từng thương ai.",o:[
  {n:"Gửi bạc lo chỗ ở cho bà",f:"kind",wx:"hắn yên lòng ra đi",lx:"người gửi bạc có thể bị lần ra",rt:"Bà lão được ở một quán trọ sạch, nhờ người cảm ơn “vị ân nhân trong cung”."},
  {n:"Nhờ {eun} cho bà gặp con",sc:1,wx:"mẹ con gặp nhau",lx:"{eun} biết ngươi lo cho nhà hắn",rt:"Hai mẹ con gặp nhau một khắc ở cổng.",rf:"{eun} bảo phép cung không cho."},
  {n:"Không dính vào",f:"clean",wx:"không ai nối ngươi với hắn",lx:"bà lão khóc mãi ở cổng",rt:"Bà lão ngồi đến tối rồi đi."}]},
 t1:{h:"Lời nhờ cuối",w:"maid",t:"Đêm trước ngày đi, {n1} nhờ {maid} một câu: hắn xin được nhìn ngươi một lần, từ xa cũng được.",o:[
  {n:"Từ chối",f:"clean",wx:"không có gì để thấy",lx:"lòng ngươi nặng, hắn tủi",rt:"{maid} quay lại, không nói gì thêm."},
  {n:"Gửi hắn chiếc khăn cũ",sc:1,f:"kind",wx:"hắn mang theo một lời từ biệt",lx:"chiếc khăn có thể bị thấy",rt:"Hắn cất khăn vào ngực áo.",rf:"Chiếc khăn rơi ở cổng, có kẻ nhặt được."},
  {n:"Hẹn đứng trên tường thành",sc:1,f:"see",wx:"được nhìn nhau lần cuối",lx:"lính gác có thể thấy",rt:"Lính gác đổi ca đúng lúc ngươi lên.",rf:"Một lính gác thấy bóng áo phi tần trên thành."}]},
 x1:{h:"Tây Hoa môn lúc canh năm",w:"maid",t:"Canh năm, đoàn lính ra cổng Tây Hoa môn. {n1} đi cuối hàng, ngoái lại một lần.",o:[
  {n:"Đứng trên thành nhìn theo",e:["win","lose"],rt:"Hắn thấy ngươi, cúi đầu thật sâu, rồi đi. Không ai khác nhìn lên.",rf:"Có kẻ thấy ngươi trên thành lúc canh năm, và nhận ra ngươi nhìn ai."},
  {n:"Để {maid} đưa một gói thuốc",e:["win","mid"],rt:"Hắn nhận thuốc, gửi lại một câu: “Thần sẽ giữ mình.”",rf:"{maid} đến muộn, đoàn đã ra cổng."},
  {n:"Ở trong tẩm điện, đóng cửa",e:"mid",lx:"hắn đi mà không có lời từ biệt",rt:"Ngươi nghe tiếng vó ngựa xa dần qua cửa sổ."}]}},
 E:{win:{k:1,tag:"Đi trong yên lặng",t:"{n1} ra biên ải, không một lời đồn theo sau. Ngươi biết hắn sẽ giữ kín đến cuối đời."},
  mid:{k:0,tag:"Người đi, lòng còn",t:"Hắn đã đi xa. Chuyện cũ không ai nhắc, nhưng nó vẫn nằm trong lòng ngươi như hòn than chưa tắt."},
  lose:{k:-1,tag:"Bị thấy lúc tiễn",t:"Cả cung bắt đầu thì thầm về bóng áo trên tường thành lúc canh năm. {v} là người kể nhiều nhất.",go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("cn_tinh",8,{t:"Lời đồn tư tình",w:"hh",sj:"lời đồn ngươi tư tình với thị vệ",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:()=>`Khắp cung xì xào ngươi có tư tình với một thị vệ. Lời đồn đi nhanh hơn ngựa trạm, và nó vừa dừng ở cửa ${CN_QP()}.`,
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời đồn không đầu đuôi",w:"maid",if:RDW(1),t:"Lời đồn lan ra, nhưng chẳng ai nói được tên thị vệ, cũng chẳng ai nói được đêm nào. {maid} bảo: đồn kiểu này là có người thổi.",o:[
  {n:"Để lời đồn tự chết",wx:"không thổi thêm lửa",lx:"lời đồn lớn thêm một ít",rt:"Ngươi sống như thường, không đổi một thói quen."},
  {n:"Tìm người thổi lời đồn",sc:1,f:"src",wx:"biết gốc lời đồn",lx:"người bị dò biết ngươi đang sợ",rt:"Gốc lời đồn là một cung nữ hầu nước bên cung {v}.",rf:"Người dò chỉ thu về toàn chuyện vu vơ."},
  {n:"Tung một chuyện khác cho cung bàn",sc:1,wx:"lời đồn bị lấn",lx:"chuyện tung ra bị lần về ngươi",rt:"Cả cung quay sang bàn chuyện một phi tần mất trâm.",rf:"Người ta bảo: kẻ có tật mới đi tung chuyện khác."}]},
 s2:{h:"Lời đồn có ngày giờ",w:"maid",if:RDW(0),t:()=>rdPrev()==="lose"?"Lời đồn lần này có đủ cả: tên {n1}, cổng Tây Hoa môn, cả chiếc khăn thêu. Người ta còn thêm: ngươi khóc khi hắn đi.":"Lời đồn chưa tắt hẳn. Lần này có kẻ thêm vào đủ cả: tên {n1}, cổng Tây Hoa môn, cả chiếc khăn thêu.",o:[
  {n:"Nhận đã quen hắn khi còn hầu trà",sc:1,f:"true",wx:"lời đồn mất cái để giấu",lx:"Hoàng thượng nghe được",rt:"Người ta bảo: quen từ trước, thì có gì đâu.",rf:"Người ta bảo: nhận quen tức là có thật."},
  {n:"Bắt người truyền lời đồn",sc:1,f:"src",wx:"cả cung biết sợ",lx:"càng bắt càng như có tật",rt:"Hai cung nữ bị phạt quỳ, lời đồn lặng đi.",rf:"Bắt người rồi, lời đồn còn lan nhanh hơn."},
  {n:"Đóng cửa cung chép kinh",wx:"tỏ lòng trong sạch",lx:"nửa tháng không gặp Hoàng thượng",rt:"Ngươi chép kinh suốt nửa tháng."}]},
 c1:{h:"Cung nữ hầu nước",w:"v",need:["v"],t:"Cung nữ hầu nước bên cung {v} là người đầu tiên kể chuyện. Nàng có một người em trai làm thị vệ cùng trại với {n1}.",o:[
  {n:"Hỏi người em trai ấy",sc:1,f:"src",wx:"biết lời đồn bịa từ đâu",lx:"người em báo lại chị",rt:"Người em khai: chị hắn được {v} trả bạc để kể.",rf:"Người em nhận bạc rồi biến mất."},
  {need:["hh"],n:"Đưa nàng lên Hoàng hậu hỏi",sc:1,wx:"lời đồn có chủ",lx:"Hoàng hậu thấy ngươi làm to chuyện",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Cung nữ ấy run rẩy khai: nghe từ người trong cung {v}.",rf:"Cung nữ ấy khóc, bảo nghe người ta nói lại."},
  {n:"Để yên, giữ làm chứng sau",sc:1,wx:"một lá bài để dành",lx:"lời đồn vẫn chạy",rt:"Ngươi ghi tên nàng lại."}]},
 c2:{h:"Hoàng thượng nghe",w:"emp",need:["nsrv"],t:"Hoàng thượng không hỏi gì. Nhưng ba đêm liền, ngài không lật thẻ ngươi.",o:[
  {n:"Tự đến Dưỡng Tâm điện",sc:1,f:"true",wx:"ngài nghe ngươi nói",lx:"bị cho là có tật nên vội",rt:"Hoàng thượng nghe ngươi kể, rồi chỉ hỏi: “Bây giờ thì sao?”",rf:"Thái giám bảo Hoàng thượng đã nghỉ."},
  {n:"Gửi ngài một chén canh, không thư",wx:"nhắc ngài ngươi vẫn ở đây",lx:"ngài chưa hết nghi",rt:"Chén canh được nhận, không có lời đáp."},
  {n:"Chờ ngài tự đến",wx:"giữ thể diện",lx:"ngài nghe người khác nói trước",rt:"Ngươi ngồi đọc sách, chờ."}]},
 t1:{h:()=>`${CN_Q()} cho gọi`,w:"hh",t:()=>`Cô cô của ${CN_Q()} đến: mai ${CN_Q()} muốn gặp ngươi. Bên kia sẽ có {v} và một người làm chứng.`,o:[
  {n:"Chuẩn bị người làm chứng ngược",sc:2,f:"witness",wx:"có người nói thật về đêm ấy",lx:"người làm chứng có thể sợ",rt:"Lính gác đêm canh năm hứa nói: không thấy ai trên thành.",rf:"Lính gác ấy xin thôi."},
  {need:["hh"],n:"Gửi lễ đến cô cô của Hoàng hậu",sc:1,wx:"biết trước Hoàng hậu nghĩ gì",lx:"lễ bị coi là đút lót",rt:"Cô cô nói nhỏ: Hoàng hậu không tin {v} lắm.",rf:"Cô cô trả lễ, mặt lạnh."},
  {n:"Ngủ một giấc thật sâu",wx:"mai tỉnh táo",lx:"không chuẩn bị gì",rt:"Ngươi ngủ yên, lạ thay."}]},
 x1:{h:()=>`Trước mặt ${CN_Q()}`,w:"hh",need:["v"],t:()=>`Ở ${CN_QP()}, {v} đưa ra người làm chứng: một thái giám thề đã thấy ngươi trao khăn cho thị vệ.`,o:[
  {n:"Đối chất với người làm chứng",e:["win","lose"],go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:()=>`Hỏi ba câu, hắn khai sai giờ, sai cổng. ${CN_Q()} cho đánh hắn ba mươi trượng.`,rf:()=>`Hắn nói trơn tru. ${CN_Q()} nhìn ngươi lâu.`},
  {need:["hh"],n:"Nhận chuyện cũ, xin Hoàng hậu xét",e:["win","mid"],rt:"Hoàng hậu nói: “Chuyện trước khi vào hầu Hoàng thượng, bản cung không xét.”",rf:"Hoàng hậu bảo: “Để Kính sự phòng tra cho rõ.”"},
  {n:"Xin tự đến Kính sự phòng chịu tra",e:"mid",lx:"thành vụ tra xét",rt:()=>`${CN_Q()} gật đầu: “Trong sạch thì sợ gì tra.”`}]}},
 E:{win:{k:1,tag:"Lời đồn bị dập",w:"hh",t:()=>`Người làm chứng bị phạt, lời đồn chết giữa đường. ${CN_Q()} nói với cả cung: ai còn nhắc, phạt như kẻ vu khống.`},
  mid:{k:0,tag:"Giao Kính sự phòng tra",t:"Việc không ai phán, được giao cho Kính sự phòng. Ngươi không bị tội, nhưng tên ngươi nằm trên một tờ án."},
  lose:{k:-1,tag:()=>`${CN_Q()} nghi ngươi`,w:"hh",t:()=>`${CN_Q()} không phạt, nhưng cũng không tin. Việc giao Kính sự phòng, và cả cung biết ${CN_Q()} đứng về phía {v}.`,go:A=>{rdOan(A,"v",3);return ""}}}});

rdDef("cn_tinh",9,{t:"Kính sự phòng tra xét",w:"eun",sj:"cuộc tra xét của Kính sự phòng",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:"Kính sự phòng mở sổ: từng đêm ngươi được triệu, từng người ra vào cung ngươi. {eun} đứng đầu việc tra. Chỉ một dòng sai là đủ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tra cho có lệ",w:"eun",if:RDW(1),t:()=>`{eun} đến, giọng nhã nhặn: “${CN_Q()} đã dặn, tra để khép miệng thiên hạ. Nương nương chỉ cần đáp vài câu.”`,o:[
  {n:"Đáp đủ, không thừa",sc:1,f:"calm",wx:"sổ ghi gọn",lx:"một câu đáp hớ, sổ ghi thêm",rt:"{eun} ghi ba dòng rồi gấp sổ.",rf:"Một câu đáp của ngươi khiến {eun} ghi thêm."},
  {n:"Biếu {eun} chút lễ",sc:1,wx:"{eun} nghiêng về ngươi",lx:"lễ này ghi vào lòng hắn, không vào sổ",rt:"{eun} nhận lễ, cười: “Nương nương chu đáo.”"},
  {n:"Xin tra kỹ cho sạch hẳn",sc:1,f:"open",wx:"tỏ ra không giấu gì",lx:"tra kỹ thì lộ điều nhỏ",rt:"{eun} gật đầu kính phục.",rf:"Tra kỹ, {eun} thấy một đêm ngươi nói dối là ốm."}]},
 s2:{h:"Sổ mở trên án",w:"eun",if:RDW(0),t:"Sổ Kính sự phòng mở trên án. {eun} không ngẩng lên: “Đêm mười bốn tháng chín, nương nương cáo bệnh. Đêm ấy {n1} gác cửa.”",o:[
  {n:"Đưa ra lời Thái y đêm ấy",sc:1,f:"calm",wx:"đêm ấy có người làm chứng",lx:"Thái y nhớ lờ mờ, sổ ghi ngờ",rt:"Thái y xác nhận đêm ấy ngươi sốt cao.",rf:"Thái y bảo không nhớ rõ."},
  {n:"Nói thẳng: thiếp ốm thật",sc:1,f:"open",wx:"lời thật",lx:"lời không có chứng",rt:"{eun} ghi: “Lời khai rõ ràng.”",rf:"{eun} ghi: “Không có người chứng.”"},
  {n:"Lặng im, xin gặp Hoàng thượng",wx:"không để sổ dẫn mình đi",lx:"{eun} ghi: không chịu khai",rt:"{eun} gấp sổ, đi báo."}]},
 c1:{h:"Sổ ra vào cổng",w:"eun",t:"Sổ ra vào cung ngươi ghi tên {n1} gác đêm mười lăm lần trong một năm. Kẻ xếp ca là ai, sổ không ghi.",o:[
  {n:"Tìm người xếp ca năm ấy",sc:2,f:"roster",wx:"biết ca gác do người khác xếp",lx:"người ấy đã được ai dặn",rt:"Người xếp ca khai: ca gác là do lệ, ngươi không xin gì.",rf:"Người xếp ca đã về quê."},
  {n:"Xin so với sổ các cung khác",sc:1,f:"roster",wx:"thấy thị vệ nào cũng gác chừng ấy đêm",lx:"việc tra kéo dài, mệt người",rt:"Sổ cung khác cũng chừng ấy đêm. Chuyện mười lăm lần hết nghĩa.",rf:"{eun} bảo không có lệ so sổ."},
  {n:"Không nói gì về sổ",wx:"không tỏ ra lo",lx:"con số mười lăm cứ nằm đó",rt:"Ngươi để {eun} đọc tiếp."}]},
 c2:{h:"{maid} bị gọi hỏi",w:"maid",t:"{maid} bị Kính sự phòng gọi đi hỏi riêng. Nàng là người duy nhất biết hết chuyện năm xưa.",o:[
  {n:"Dặn {maid} từng câu",sc:1,wx:"lời khai khớp với ngươi",lx:"lời học thuộc nghe như học thuộc",rt:"{maid} khai khớp từng chữ.",rf:"{eun} hỏi một câu ngươi chưa dặn, {maid} lúng túng."},
  {n:"Bảo nàng cứ nói thật",f:"open",wx:"{maid} không phải nói dối vì ngươi",lx:"lời thật làm Hoàng thượng chạnh lòng",rt:"{maid} khai: chuyện cũ là trước khi tiểu chủ được sủng hạnh, sau đó không còn gì."},
  {n:"Xin cho {maid} nghỉ bệnh",sc:1,wx:"tránh được một buổi hỏi",lx:"{eun} cho là giấu người",rt:"{maid} được nghỉ, buổi hỏi bị hoãn.",rf:"{eun} sai Thái y đến xem, {maid} không ốm."}]},
 t1:{h:"Hoàng thượng đến giữa đêm",w:"emp",need:["nsrv"],t:"Giữa những ngày tra, Hoàng thượng đến cung ngươi một mình, không báo trước. Ngài ngồi rất lâu, không hỏi gì.",o:[
  {n:"Kể hết chuyện năm xưa",sc:1,f:"open",wx:"ngài nghe từ miệng ngươi",lx:"ngài nghe điều không muốn nghe",rt:"Hoàng thượng nghe xong, nắm tay ngươi: “Trẫm biết rồi.”",rf:"Hoàng thượng đứng dậy đi, không nói lời nào."},
  {n:"Pha trà như thuở hầu trà",wx:"ngài nhớ ngày đầu gặp ngươi",lx:"chuyện không được nói ra, đêm thức trắng",rt:"Hoàng thượng uống chén trà, mỉm cười như năm nào."},
  {n:"Xin ngài đừng nghe lời đồn",sc:1,wx:"ngài biết ngươi bị vu",lx:"ngài thấy ngươi lo quá",rt:"Hoàng thượng bảo: “Trẫm chỉ nghe sổ.”",rf:"Hoàng thượng hỏi: “Nàng sợ điều gì?”"}]},
 x1:{h:"Tờ trình của Kính sự phòng",w:"eun",t:"{eun} dâng tờ trình lên Hoàng thượng. Ngài đọc, rồi quay sang ngươi: “Nàng có muốn nói thêm gì không?”",o:[
  {n:"Thưa: thiếp để sổ nói thay",e:["win","mid"],rt:"Tờ trình viết: không có chứng. Hoàng thượng gấp lại: “Xong.”",rf:"Tờ trình viết: chưa đủ chứng, chưa thể kết."},
  {n:"Xin đối chất với kẻ tố",e:["win","lose"],go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Kẻ tố lắp bắp, khai ra người của {v} đã dặn mình.",rf:"Kẻ tố khóc lóc thề thốt. Hoàng thượng cho ngươi cấm túc chờ xét."},
  {n:"Xin tự cấm túc cho yên lòng người",e:"mid",lx:()=>`cấm túc ${kitNumVi(BAL.road.cn_tinh.cam)} tháng, không gặp Hoàng thượng`,go:()=>CN_CAM(S,BAL.road.cn_tinh.cam),rt:"Ngươi tự đóng cửa cung. Người ta bảo ngươi biết phép."}]}},
 E:{win:{k:1,tag:"Trong sạch trên sổ",w:"emp",t:"Kính sự phòng kết: không có chứng. Hoàng thượng sai đốt tờ tố, và đêm ấy lật thẻ ngươi."},
  mid:{k:0,tag:"Án treo",t:"Không kết tội, cũng không kết sạch. Tờ trình nằm trong tủ Kính sự phòng, chờ ai đó mở lại."},
  lose:{k:-1,tag:"Bị cấm túc chờ xét",w:"emp",t:"Hoàng thượng cho ngươi cấm túc chờ xét. Cửa cung đóng, người hầu bị hỏi từng người. {n1} bị gọi về kinh.",go:A=>{rdOan(A,"v",3);return CN_CAM(S,BAL.road.cn_tinh.cam)}}}});

rdDef("cn_tinh",10,{t:"Hắn chọn",w:"emp",sj:"lời khai của {n1}",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:"{n1} bị gọi từ biên ải về kinh để đối chất. Một lời của hắn có thể cứu ngươi, hay cứu chính hắn. Ngươi chỉ còn cách cho hắn một lý do.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hắn về giữa mùa tuyết",w:"maid",if:RDW(1),t:"Dù án đã khép, {v} vẫn xin Hoàng thượng cho gọi {n1} về hỏi một lần cho “sạch hẳn”. Hắn về kinh giữa mùa tuyết, gầy rộc.",o:[
  {n:"Gửi áo ấm vào chỗ giam",f:"kind",wx:"hắn biết ngươi chưa quên ơn",lx:"áo có thể bị lần ra",rt:"Hắn mặc áo, không hỏi ai gửi."},
  {n:"Xin Hoàng thượng thôi hỏi",sc:1,wx:"việc hỏi nhẹ đi",lx:"ngài thấy ngươi lo cho hắn",rt:"Hoàng thượng bảo: “Hỏi một buổi rồi thôi.”",rf:"Hoàng thượng bảo: “{v} xin, trẫm đã chuẩn.”"},
  {n:"Để mặc, tin vào án đã khép",wx:"không để lại dấu",lx:"hắn một mình trước bên tố",rt:"Ngươi không hỏi đến."}]},
 s2:{h:"Hắn về trong xiềng",w:"maid",if:RDW(0),t:"{n1} về kinh trong xiềng. {maid} nghe người ta nói hắn chưa khai một lời, nhưng sắp bị dụng hình.",o:[
  {n:"Bỏ bạc xin đừng dụng hình",sc:1,f:"kind",wx:"hắn được tha đòn",lx:"bạc của ngươi để lại dấu",rt:"Hắn được hỏi bằng lời, không bằng roi.",rf:"Bạc đến tay người không có quyền."},
  {need:["hh"],n:"Nhờ Hoàng hậu cho hỏi đúng phép",sc:1,wx:"việc hỏi công minh",lx:"Hoàng hậu thấy ngươi để tâm",rt:"Hoàng hậu dặn: hỏi đúng phép, không ép cung.",rf:"Hoàng hậu bảo: “Việc của Kính sự phòng.”"},
  {n:"Không làm gì",wx:"không ai nối ngươi với hắn",lx:"hắn chịu một mình",rt:"Ngươi nhắm mắt trước tin dữ."}]},
 c1:{h:"Bức thư từ biên ải",w:"maid",t:"Trước khi bị giải về, {n1} gửi cho {maid} một bức thư. Thư chưa mở. Nếu bị bắt gặp, đó là chứng cứ mới.",o:[
  {n:"Đốt, không đọc",f:"clean",wx:"không để thêm dấu",lx:"không biết hắn muốn nói gì",rt:"Thư cháy, ngươi không biết hắn viết gì."},
  {n:"Đọc rồi đốt",sc:1,f:"know",wx:"biết hắn định khai gì",lx:"có người thấy {maid} mang thư",rt:"Hắn viết: “Thần sẽ không nói gì sai với nương nương.”",rf:"Có kẻ thấy {maid} cầm thư lạ."},
  {n:"Trình thư lên Hoàng thượng",sc:1,f:"open",wx:"không giấu ngài điều gì",lx:"thư có thể nói điều chết người",rt:"Thư chỉ có lời từ biệt mẹ già. Hoàng thượng gấp lại, thở dài.",rf:"Trong thư có một câu nhắc chuyện cũ. Hoàng thượng lặng đi."}]},
 c2:{h:"Lời hứa của bên tố",w:"v",need:["v"],t:"Người của {v} vào chỗ giam, hứa với {n1}: nếu hắn khai ngươi dụ dỗ hắn, hắn được tha về quê với mẹ.",o:[
  {n:"Lo cho mẹ hắn trước",f:"kind",wx:"hắn không còn bị dọa bằng mẹ",lx:"tốn bạc",rt:"Mẹ {n1} được đưa về một nơi yên ổn, có người trông."},
  {n:"Tố người của {v} vào chỗ giam",sc:1,f:"witness",wx:"lời hứa bị lộ",lx:"{v} biết ngươi canh chỗ giam",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Người của {v} bị bắt ở cửa ngục.",rf:"Không bắt được ai, chỉ có lời ngươi."},
  {n:"Tin hắn không bán ngươi",f:"trust",wx:"không phải mua lòng ai",lx:"lời hứa kia vẫn treo trước mặt hắn",rt:"Ngươi không làm gì."}]},
 t1:{h:"Một lời qua song sắt",w:"maid",t:"{maid} có thể vào chỗ giam đúng một lần, mang theo đúng một câu của ngươi.",o:[
  {n:"“Cứ nói thật.”",sc:1,f:"truth",wx:"hắn không phải nói dối",lx:"sự thật làm Hoàng thượng chạnh lòng",rt:"Hắn nghe, gật đầu, mắt sáng lên.",rf:"Hắn nghe mà như không hiểu."},
  {n:"“Hãy giữ mình.”",f:"kind",wx:"hắn biết ngươi lo cho hắn",lx:"hắn có thể hiểu là ngươi bảo hắn tự cứu",rt:"Hắn lặng đi một lúc lâu."},
  {n:"Không gửi gì",f:"clean",wx:"không có lời nào để lộ",lx:"hắn tưởng ngươi bỏ hắn",rt:"{maid} không đi."}]},
 x1:{h:"Lời khai",w:"emp",t:"Trước mặt Hoàng thượng và {eun}, {n1} quỳ. Người ta hỏi: “Ngươi và nương nương có tư tình không?” Hắn ngẩng lên nhìn ngươi.",o:[
  {n:"Nhìn thẳng hắn, gật đầu khẽ",e:["win","lose"],rt:"Hắn khai: “Năm ấy có thương, nhưng từ ngày nương nương được sủng hạnh, thần chưa gặp riêng một lần.” Hoàng thượng tin.",rf:"Hắn hiểu sai cái gật đầu, khai rằng ngươi bảo hắn nhận hết. Lời khai rối tung."},
  {n:"Xin Hoàng thượng tha cho hắn trước",e:["win","mid"],rt:"Hoàng thượng nhìn ngươi, rồi chuẩn. {n1} khai thật, không sợ gì nữa.",rf:"Hoàng thượng chuẩn tha, nhưng {n1} chỉ im lặng."},
  {n:"Cúi mặt, để hắn tự chọn",e:"mid",lx:"hắn đứng một mình",rt:"Hắn im lặng rất lâu, rồi chỉ nói: “Thần không biết gì.”"}]}},
 E:{win:{k:1,tag:"Hắn giữ lời",w:"emp",t:"{n1} khai thật mà không hại ngươi. Hoàng thượng nói: “Chuyện trước khi vào hầu trẫm, trẫm không bắt lỗi.” Bên tố im bặt.",go:A=>{rdOan(A,"v",4);return ""}},
  mid:{k:0,tag:"Hắn im lặng",t:"{n1} không khai gì. Không ai kết được tội, cũng không ai tin hẳn. Hắn bị giữ lại chờ xét."},
  lose:{k:-1,tag:"Lời khai rối",t:"Lời khai của {n1} rối tung. Bên tố nắm lấy từng chữ. Ngươi bị giữ trong cung chờ ngày khép án."}}});

rdDef("cn_tinh",11,{t:"Chôn quá khứ",w:"emp",sj:"chuyện cũ giữa ngươi và {n1}",cast(A){return CNTINH_G(A)&&rdCast(A,["v"])},
 g:"Hoàng thượng tự tay khép vụ này. Thư cũ, người cũ, lời đồn, tất cả sẽ được chôn hôm nay, theo cách ngươi chọn. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngày khép án đã định",w:"emp",if:RDW(1),t:"Hoàng thượng định ngày khép án. Ngài nói với ngươi: “Trẫm muốn nghe nàng một lần cuối, rồi không ai nhắc lại nữa.”",o:[
  {n:"Xin ngài cho {n1} có mặt",sc:1,f:"brave",wx:"khép án trước mặt cả hai",lx:"ngài thấy ngươi còn vương",rt:"Hoàng thượng gật đầu: “Được.”",rf:"Hoàng thượng bảo: “Không cần hắn.”"},
  {n:"Xin khép án trong lặng lẽ",f:"quiet",wx:"ít người biết",lx:"kẻ tố không bị gọi tên",rt:"Hoàng thượng chuẩn, chỉ cho {eun} hầu."},
  {n:"Xin gọi cả {v} đến",sc:1,f:"brave",wx:"kẻ tố phải đứng đó nghe",lx:"{v} có dịp nói thêm",go:A=>{rdOan(A,"v",4)},rt:"{v} được triệu, mặt tái.",rf:"{v} cáo bệnh, không đến."}]},
 s2:{h:"Cửa cung đóng",w:"maid",if:RDW(0),t:"Cửa cung ngươi vẫn đóng. {maid} mang cơm vào, nói nhỏ: “Mai khép án. Người ta bảo Hoàng thượng chưa quyết.”",o:[
  {n:"Viết một tờ tấu tự trình",sc:1,f:"brave",wx:"ngài đọc lời ngươi trước",lx:"lời viết ra không rút lại được",rt:"Tờ tấu đến tay Hoàng thượng trong đêm.",rf:"{eun} giữ tờ tấu, mai mới trình."},
  {need:["th"],n:"Nhờ Thái hậu nói một lời",sc:1,wx:"có người đỡ lời",lx:"Thái hậu biết chuyện cũ",rt:"Thái hậu sai người nói với Hoàng thượng: “Đừng xử nặng đứa nhỏ ấy.”",rf:"Thái hậu bảo không xen vào chuyện hậu cung."},
  {n:"Ngồi yên chờ",wx:"giữ sức cho ngày mai",lx:"không ai nói giúp",f:"quiet",rt:"Ngươi ngồi bên cửa sổ đến sáng."}]},
 c1:{h:"Bức thư cuối cùng",w:"maid",t:"{maid} đưa ra một thứ nàng giấu bao năm: bức thư đầu tiên ngươi viết cho {n1}, chưa từng gửi đi.",o:[
  {n:"Đốt ngay",f:"quiet",wx:"không còn một chữ",lx:"mất bằng chứng chuyện ấy trước khi vào hầu",rt:"Bức thư cháy trong lò sưởi."},
  {n:"Giữ để chứng ngày tháng",sc:2,f:"date",wx:"thư đề ngày trước khi được sủng hạnh",lx:"thêm một bức thư trên đời",rt:"Thư đề rõ năm tháng, khi ngươi còn là cung nữ hầu trà.",rf:"Mực đã nhòe, ngày tháng không đọc được."},
  {n:"Đưa {maid} cất ra ngoài cung",wx:"thư nằm nơi không ai tìm",lx:"{maid} gánh rủi ro",rt:"{maid} gửi thư về nhà một người họ hàng."}]},
 c2:{h:"Nước cờ cuối của {v}",w:"v",need:["v"],t:"{v} dâng lên một chiếc khăn thêu, bảo là tìm thấy trong người {n1}: chiếc khăn ngươi thêu năm mười lăm tuổi.",o:[
  {n:"Nhận đó là khăn của mình",sc:1,f:"truth",wx:"không để {v} giữ lời buộc tội",lx:"chiếc khăn là thật",rt:"Ngươi nói: “Khăn của thiếp, thêu khi chưa vào hầu Hoàng thượng.” Hoàng thượng gật đầu.",rf:"Hoàng thượng cầm chiếc khăn rất lâu."},
  {n:"Hỏi {v} lấy khăn từ đâu",sc:1,f:"date",wx:"lộ ra {v} sai người lục đồ hắn",lx:"{v} có lời đáp sẵn",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"{v} lúng túng. Hoàng thượng hỏi ai cho nàng lục đồ của tù.",rf:"{v} đáp trơn tru: người canh ngục đưa."},
  {n:"Im lặng",wx:"không thêm lời để bắt bẻ",lx:"chiếc khăn tự nói thay",rt:"Ngươi không nói gì."}]},
 t1:{h:"Câu hỏi cuối",w:"emp",need:["nsrv"],t:"Hoàng thượng hỏi khẽ, chỉ đủ cho ngươi nghe: “Bây giờ, nàng còn thương hắn không?”",o:[
  {n:"“Thiếp thương người đang hỏi thiếp.”",sc:1,wx:"ngài yên lòng",lx:"ngài nghe như lời khéo",rt:"Hoàng thượng nhìn ngươi, rồi cười.",rf:"Hoàng thượng bảo: “Nàng khéo nói lắm.”"},
  {n:"“Thiếp biết ơn hắn, không hơn.”",f:"truth",wx:"lời thật",lx:"ngài nghe chữ ơn mà chạnh lòng",rt:"Hoàng thượng gật đầu chậm rãi."},
  {n:"Quỳ xuống, không đáp",sc:1,wx:"không nói điều có thể sai",lx:"ngài đoán theo ý ngài",rt:"Hoàng thượng đỡ ngươi dậy.",rf:"Hoàng thượng thở dài, quay đi."}]},
 x1:{h:"Ngày khép án",w:"emp",t:"Ở Dưỡng Tâm điện, Hoàng thượng đặt tờ án trước mặt ngươi. {n1} quỳ bên dưới. Ngài chờ.",o:[
  {n:"Xin ngài đốt hết trước mặt mọi người",e:["win","lose"],rt:"Hoàng thượng gật đầu. Tờ án, khăn, thư cùng cháy trong lò. Ngài nói: “Từ nay không ai nhắc.”",rf:"Hoàng thượng không đốt. Ngài nói: “Có những thứ trẫm phải giữ.”"},
  {n:"Thưa thật mọi điều, xin tha cho hắn",e:["win","mid"],rt:"Hoàng thượng nghe hết, rồi tha cho cả hai: chuyện trước khi vào hầu, không thành tội.",rf:"Hoàng thượng tha cho ngươi. {n1} xin nhận hết lỗi về mình."},
  {n:"Im lặng, để {n1} nhận lỗi",e:"mid",lx:"hắn gánh thay ngươi",rt:"{n1} dập đầu: “Là thần vọng tưởng, nương nương không hay biết.”"}]}},
 E:{win:{k:1,tag:"Chôn sạch quá khứ",w:"emp",t:"Thư, khăn, tờ án đều thành tro. Hoàng thượng không bao giờ nhắc lại. {n1} được về quê phụng dưỡng mẹ già, và cả cung chỉ nhớ ngươi là người được Hoàng thượng tin trọn.",go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Hắn gánh tội thay",t:"{n1} nhận hết lỗi, bị đày ra biên ải xa hơn. Ngươi bình yên, Hoàng thượng không trách. Chỉ là mỗi mùa tuyết, ngươi lại nhớ đến một người."},
  lose:{k:-1,tag:"Lộ chuyện cũ, bị phạt",w:"emp",t:"Chuyện cũ lộ ra trước triều. Hoàng thượng không giết ai: ngươi bị khất bổng, cấm túc, mang tiếng một thời. {n1} bị đuổi khỏi cung. Ngươi vẫn là phi tần, và đường còn dài.",go:A=>{rdOan(A,"v",2);return [CN_CAM(S,BAL.road.cn_tinh.cam),CN_PAY(S,BAL.road.cn_tinh.phat,"Hoàng thượng")].join(" ")}}}});
RD97L.push(rdRare({a:"cn_tinh_11",tag:"Hộ vệ thề trọn đời",w:"emp",n:"Xin Hoàng thượng để {n1} chuộc lỗi bằng cả đời canh cửa",
 path:["Giao thư cho {n1} tự đốt","Gửi bạc nuôi mẹ hắn","Gửi áo rét theo đoàn","Nhận chuyện cũ","Bảo nàng cứ nói thật","Kể hết chuyện năm xưa","Cứ nói thật","Lo cho mẹ hắn trước","Thưa thật mọi điều"],bad:["Bảo nàng cứ trình lên","Im lặng, để {n1} nhận lỗi","Đóng cửa cung chép kinh"],x:[()=>S.sung>=RR("cn_tinh_11").bar,"Sủng từ "+RR("cn_tinh_11").bar],
 t:"Hoàng thượng nhìn người thị vệ quỳ dưới thềm, rồi nhìn ngươi. Ngài bảo: “Kẻ đã giữ kín lời suốt bao năm, trẫm tin hắn giữ được cửa.” {n1} quỳ thề trước Dưỡng Tâm điện: trọn đời canh cửa cung ngươi, không bao giờ ngẩng nhìn chủ. Từ đó không kẻ gian nào lọt qua cổng cung ngươi.",rw:"ngocboi",ti:"Người gác cửa thề trọn đời"}));

/* ---------- cn_ban · Tri kỷ ở Tân Giả khố ---------- */
/* Road of «Cung nữ được sủng hạnh»: Tố Nga (story-only NPC, ROAD_MAP §5.4) knows the truth of the poisoned well (.4). From .5 the hand
   behind it is a consort {v} who borrowed Càn Ninh cung's name: she framed Tố Nga and the Hoàng hậu both. Cast once, carried. */
const CNB_ILL=()=>kitNumVi(BAL.road.cn_ban.ill);

rdDef("cn_ban",5,{t:"Kẻ muốn Tố Nga câm lặng",w:"maid",sj:"kẻ muốn Tố Nga câm lặng",cast(A){return rdCast(A,["v"])},
 g:"Chuyện cái giếng chưa ngủ yên. Có kẻ sợ Tố Nga còn nhớ quá nhiều. Giữ được mạng nàng, ngươi mới giữ được sự thật.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Bát cháo có mùi lạ",w:"maid",if:RDW(1),t:()=>(rdPrev()==="r97"?"Tố Nga nay là nữ quan Thượng cung cục, mà kẻ đứng sau vẫn chưa lộ mặt. ":"")+"Cung nữ bị bắt vì vụ cái giếng thắt cổ trong ngục trước khi khai ra chủ. Đêm ấy, bát cháo đưa đến cho Tố Nga có mùi hạnh nhân đắng.",o:[
  {n:"Cho thái y nghiệm bát cháo",sc:1,f:"proof",wx:"có chứng cứ kẻ hạ độc",lx:"cả cung biết Tố Nga bị nhắm",go:(A,ok)=>{if(ok)rdOan(A,"v",4)},rt:"Thái y nghiệm ra thạch tín. Bát cháo đã đi qua tay một tiểu thái giám của cung {v}.",rf:"Bát cháo bị đánh đổ trước khi đến tay thái y; lời đồn chạy nhanh hơn ngươi."},
  {n:"Cho Tố Nga ăn chung mâm với ngươi",f:"bond",wx:"không ai dám đụng mâm của chủ",lx:"người trong cung chê ngươi ngồi chung với kẻ hầu",rt:"Từ nay Tố Nga ăn sau ngươi, từ cùng một nồi, cùng một đôi đũa bạc."},
  {n:"Lặng lẽ đổ đi, giả như không biết",f:"quiet",wx:"kẻ hạ độc tưởng nàng đã ăn",lx:"ngươi thức canh nàng, hao sức; kẻ ấy sẽ thử lần nữa",rt:"Ngươi bảo Tố Nga giả ốm nằm liệt. Bên ngoài đồn nàng sắp chết."}]},
 s2:{h:"Tên nàng vẫn trong sổ tội nô",w:"eun",if:RDW(0),t:"Sau chuyện cái giếng, sổ tội nô của Nội vụ phủ vẫn còn tên Tố Nga. Chưởng sự mới của Tân Giả khố bắt nàng giặt áo trong nước đá từ canh tư.",o:[
  {n:"Biếu chưởng sự mới",sc:1,wx:"Tố Nga được làm việc trong nhà",lx:"chưởng sự biết ngươi có chỗ yếu, sẽ còn đòi",rt:"Chưởng sự cất bạc, đổi Tố Nga sang khâu áo bên lò sưởi."},
  {n:"Nhờ {eun} đổi chưởng sự",sc:1,wx:"chưởng sự ác bị điều đi",lx:"Tổng quản cho là ngươi xen việc Nội vụ phủ",rt:"{eun} điều chưởng sự đi coi chuồng ngựa.",rf:"{eun} cười: “{Xung} lo việc trong cung mình là đủ.”"},
  {n:"Tự xuống Tân Giả khố thăm nàng",sc:1,f:"bond",wx:"Tố Nga biết ngươi chưa bỏ nàng",lx:"bị đồn phi tần lui tới chỗ tội nô",rt:"Tố Nga ôm lấy vạt áo ngươi, khóc không thành tiếng.",rf:"Có người thấy kiệu ngươi dừng trước Tân Giả khố; chuyện ấy đến tai cả lục cung."}]},
 s3:{h:"Tai mắt bị nhận ra",w:"maid",if:()=>rdPrev()==="win2",t:()=>`Tố Nga hầu bên ngươi được ba tháng thì có người nhận ra nàng hay đứng nghe ở cửa sau ${CN_QP()}.`,o:[
  {n:"Giấu nàng vào hậu viện một thời gian",f:"quiet",wx:"nàng tạm an",lx:"mất tai mắt một thời gian",rt:"Tố Nga lui về hậu viện, chỉ coi việc phơi áo."},
  {n:"Để nàng nghe tiếp, dặn kín hơn",sc:1,f:"proof",wx:"nghe được ai đang săn nàng",lx:"nàng bị bắt quả tang",rt:"Tố Nga nghe được: một cung khác đang hỏi giờ nàng đi lấy nước.",rf:"Tố Nga bị một ma ma túm tay ngay ở cửa sau."}]},
 c1:{h:"Chén trà của {v}",w:"v",need:["v"],t:"{v} đến cung ngươi uống trà, giữa câu chuyện hỏi như vô tình: “Nghe nói muội có một người quen cũ ở Tân Giả khố?”",o:[
  {n:"Cười, nói không nhớ ai",wx:"{v} không đoán được ngươi biết gì",lx:"{v} biết ngươi nói dối",rt:"{v} đặt chén xuống, nói sang chuyện hoa.",rf:"{v} khẽ cười: “Muội quên nhanh thật.”"},
  {n:"Nhận thật, nhìn thẳng nàng ta",sc:1,f:"face",wx:"thấy {v} giật mình",lx:"{v} rêu rao ngươi bênh tội nô, tiếng ngươi sụt",go:A=>{rdOan(A,"v",5)},rt:"{v} đánh rơi nắp chén. Ngươi biết đã chạm đúng chỗ."},
  {n:"Mời {v} cùng che chở Tố Nga",wx:"{v} mắc nợ một lời hứa",lx:"{v} cười lạnh",go:(A,ok)=>{rdRel(A,"v",ok?8:-5)},rt:"{v} gượng gật đầu; trước mặt người khác, nàng ta không dám đụng đến Tố Nga.",rf:"{v} nói: “Kẻ hầu thì nên biết thân phận.”"}]},
 c2:{h:"Thái giám đưa cơm",w:"eun",t:"Tiểu thái giám đưa cơm cho Tân Giả khố bị bắt gặp nhận bạc của người lạ. Hắn khai: người ta mua tin Tố Nga ngủ ở gian nào.",o:[
  {n:"Giao hắn cho Thận hình ty",wx:"ai cũng biết Tố Nga có người che",lx:"tốn bạc lo lót Thận hình ty; kẻ trả bạc kịp xóa dấu",rt:"Hắn bị đánh hai mươi trượng. Người lạ không quay lại nữa."},
  {n:"Mua hắn lại, làm người của ngươi",sc:1,f:"spy",wx:"biết ai đang dò Tố Nga",lx:"hắn bán ngươi lần nữa",rt:"Hắn thề từ nay mang tin về cho ngươi trước.",rf:"Hắn cầm bạc cả hai đầu, rồi trốn sang cung khác."},
  {n:"Dời chỗ ngủ của Tố Nga",f:"quiet",wx:"kẻ dò mất dấu",lx:"Tố Nga phải ngủ cạnh lò than, ho nặng thêm",rt:"Đêm ấy Tố Nga ngủ ở kho chăn, không ai biết."}]},
 c3:{h:"Tố Nga xin ngươi buông tay",w:"maid",t:"Tố Nga quỳ: “Tỷ tỷ cứ để muội chết. Muội sống ngày nào, tỷ tỷ bị liên lụy ngày ấy.”",o:[
  {n:"Nắm tay nàng, hứa không bỏ",sc:1,f:"bond",wx:"Tố Nga vững lòng",lx:"ngươi gánh thêm một mối lo",rt:"Tố Nga gật đầu, lần đầu tiên dám ngẩng mặt."},
  {n:"Nói thật: nàng là nhân chứng, phải sống",wx:"Tố Nga hiểu mình quý ở đâu",lx:"nàng buồn vì bị coi là quân cờ, lòng ngươi áy náy",rt:"Tố Nga lau nước mắt: “Vậy muội sống, vì tỷ tỷ cần.”"}]},
 t1:{h:()=>`Kẻ mượn danh ${CN_QP()}`,w:"maid",need:["v"],t:()=>`Manh mối dẫn đến cung {v}: một cung nữ cung ấy từng mượn danh ${CN_QP()} để lĩnh thuốc ở Thái y viện, đúng tháng cái giếng bị bỏ thuốc.`,o:[
  {n:"Ghi lại, chưa động",sc:1,f:"hold",wx:"nắm manh mối trong tay",lx:"thức đêm dò sổ, hao sức; {v} còn thời gian xóa dấu",rt:"Ngươi chép tên cung nữ ấy vào sổ riêng."},
  {need:["hh"],n:"Báo Hoàng hậu có kẻ mượn danh",sc:1,f:"hh",wx:"Hoàng hậu biết có kẻ đổ vạ cho mình",lx:"Hoàng hậu cho là ngươi gây chuyện",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu im lặng hồi lâu rồi nói: “Bản cung nhớ rồi.”",rf:"Hoàng hậu lạnh giọng: “Chuyện cũ, đừng nhắc nữa.”"},
  {n:"Gửi lời bóng gió cho {v}",sc:1,f:"warn",wx:"{v} phải dè chừng",lx:"{v} rêu rao ngươi đặt điều, tiếng ngươi sụt",go:A=>{rdOan(A,"v",4)},rt:"{v} đóng cửa cung ba ngày không ra.",rf:"{v} hiểu ý, và quyết làm cho xong sớm."}]},
 x1:{h:"Đêm canh Tố Nga",w:"maid",t:"Tin báo: đêm nay sẽ có người tìm đến chỗ Tố Nga ngủ. Kẻ ấy muốn nàng không thấy được sáng mai.",o:[
  {n:"Cho thị vệ phục, bắt tận tay",e:["win","lose"],rt:"Kẻ cầm dây thừng bị bắt ngay ở cửa. Hắn là thái giám coi lò của cung {v}.",rf:"Kẻ đến chạy thoát. Tố Nga bị bóp cổ đến ngất, ngươi bị trách làm ầm cả hậu cung."},
  {n:"Đưa Tố Nga đi nơi khác trong đêm",e:["win","mid"],rt:"Kẻ đến chỉ thấy chăn trống, hoảng hốt bỏ chạy, đánh rơi một chiếc hài thêu hoa mai.",rf:"Tố Nga thoát, nhưng kẻ đến không để lại dấu gì."},
  {n:"Xin Thái hậu cho Tố Nga vào Phật đường",need:["th"],e:"mid",lx:"Tố Nga xa ngươi, kẻ đứng sau vẫn yên",rt:"Tố Nga cạo tóc mai, vào Phật đường Đức Thọ cung tụng kinh. Không ai dám vào đó giết người."}]}},
 E:{win:{k:1,tag:"Bắt được kẻ hạ thủ",w:"maid",t:"Kẻ đến giết Tố Nga bị bắt sống. Hắn chưa khai, nhưng ai cũng biết hắn từ cung nào ra. Tố Nga sống, và nàng nhớ thêm một điều.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Tố Nga còn sống",t:"Tố Nga qua được đêm ấy. Kẻ muốn nàng câm vẫn ở trong bóng tối, chờ dịp khác."},
  lose:{k:-1,tag:"Tố Nga trọng thương",t:"Tố Nga sống sót mà khản cả giọng, nằm liệt nửa tháng. Người trong cung nói ngươi chuốc họa vào thân vì một tội nô."}}});

rdDef("cn_ban",6,{t:"Bí mật Càn Ninh cung",w:"maid",sj:"điều Tố Nga thấy bên giếng",cast(A){return rdCast(A,["v"])},
 g:()=>`Tố Nga không chỉ thấy người đổ thuốc. Nàng thấy cả đôi hài kẻ ấy mang. Bí mật này làm hai cung cùng sợ: ${CN_QP()} và cung {v}.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ bị bắt khai một nửa",w:"eun",if:RDW(1),t:"Thái giám bị bắt đêm ấy chịu đòn ba ngày mới khai một câu: “Nô tài chỉ nghe lệnh người đeo hài hoa mai.”",o:[
  {n:"Xin {eun} cho hỏi tiếp",sc:1,f:"shoe",wx:"biết thêm chủ của đôi hài",lx:"hắn chết trong ngục trước khi nói",rt:"Hắn khai: hoa mai là hoa thêu riêng của cung {v}.",rf:"Sáng ra, hắn đã tắt thở. {eun} bảo là bệnh."},
  {n:"Để Thận hình ty tự xử",wx:"tay ngươi sạch",lx:"lời khai bị chôn, ngươi mất thế chủ động",rt:"Án ghi: thái giám trộm cắp, đánh chết."},
  {n:"Rỉ tai lời khai ra khắp cung",sc:1,wx:"ai cũng nhìn chân {v}",lx:"bị cho là đặt điều",need:["v"],go:A=>{rdOan(A,"v",6)},rt:"Ba hôm sau, {v} thôi mang hài thêu hoa.",rf:"Lời đồn quay về chính cửa cung ngươi."}]},
 s2:{h:"Tố Nga không dám nói",w:"maid",if:RDW(0),t:"Từ đêm ấy, Tố Nga giật mình mỗi khi nghe tiếng bước chân. Hỏi gì về cái giếng nàng cũng chỉ lắc đầu.",o:[
  {n:"Ngồi với nàng suốt đêm",sc:1,f:"bond",wx:"Tố Nga mở lòng",lx:"ngươi mệt rã, sáng ra hầu giá vụng về",rt:"Gần sáng, Tố Nga thì thầm: “Kẻ ấy đi hài thêu hoa mai.”"},
  {n:"Cho nàng uống thuốc an thần",sc:1,f:"shoe",wx:"nàng ngủ được, rồi nhớ lại",lx:"nàng mê man, quên nhiều hơn nhớ",rt:"Tỉnh dậy, Tố Nga nhớ rõ đôi hài.",rf:"Tố Nga ngủ hai ngày, tỉnh dậy chỉ nhớ tiếng nước."},
  {n:"Không ép, chờ nàng tự nói",wx:"giữ được lòng tin của nàng",lx:"ngươi lo đến hao sức; kẻ kia kịp chuẩn bị",rt:"Ngươi chỉ để lại cho nàng một ngọn đèn."}]},
 c1:{h:"Đôi hài hoa mai",w:"maid",need:["v"],t:"Ngươi cho người dò Châm công cục: chỉ một cung đặt thêu hài hoa mai năm ấy, là cung {v}. Sổ đặt hàng còn trong kho.",o:[
  {n:"Mua người chép sổ Châm công cục",sc:1,f:"book",wx:"có giấy trắng mực đen",lx:"kẻ giữ kho đi báo",rt:"Bản chép có dấu đỏ của Châm công cục.",rf:"Kẻ giữ kho nhận bạc rồi báo cho cung {v}."},
  {n:"Tự đến Châm công cục xem đồ",sc:1,f:"book",wx:"tận mắt thấy mẫu thêu",lx:"cả Châm công cục biết ngươi dò",rt:"Ngươi chọn vải, tiện tay lật sổ cũ.",rf:"Sổ năm ấy đã bị ai mượn đi."},
  {n:"Chỉ ghi nhớ, không động",wx:"không ai biết ngươi để ý",lx:"không có giấy làm bằng; người dò của ngươi bị nghi, mất một tai mắt",rt:"Ngươi giữ chuyện đôi hài trong lòng."}]},
 c2:{h:()=>`${CN_Q()} triệu ngươi`,w:"hh",need:["hh"],t:()=>`${CN_Q()} gọi ngươi đến ${CN_QP()}, hỏi thẳng: “Tố Nga đã nói gì với {xung} về cung của ${CN_QI()}?”`,o:[
  {need:["hh"],n:"Kể hết, cả chuyện mượn danh",sc:1,f:"hh",wx:"Hoàng hậu biết mình bị đổ vạ",lx:"Hoàng hậu cho là ngươi bịa để lấy lòng",rt:"Hoàng hậu bóp chặt chuỗi hạt: “Kẻ nào dám mượn tên bản cung?”",rf:"Hoàng hậu lạnh mặt: “Lời một tội nô, {xung} cũng tin?”"},
  {need:["hh"],n:"Thưa nàng không nói gì",wx:"giữ bài trong tay",lx:"Hoàng hậu không tin, thiện cảm với ngươi giảm",rt:"Hoàng hậu nhìn ngươi rất lâu rồi cho lui."},
  {need:["hh"],n:"Hỏi lại Hoàng hậu về cái giếng",sc:1,wx:"đọc được mặt Hoàng hậu",lx:"Hoàng hậu giận ngươi hỗn",rt:"Hoàng hậu thoáng sững sờ: bà thật không biết chuyện.",rf:"Hoàng hậu đập bàn: “Ngươi tra hỏi bản cung?”"}]},
 c3:{h:"Sổ lĩnh thuốc của Thái y viện",w:"doc",t:()=>`Thái y viện cuối năm đốt sổ cũ. Trong sổ năm ấy có dòng lĩnh thuốc tuyệt tự, ký tên ${CN_QP()}. Phải lấy trước kỳ đốt sổ.`,o:[
  {n:"Nhờ thái y quen chép dòng ấy",sc:1,f:"book",wx:"có dòng chữ lĩnh thuốc",lx:"thái y bị nghi, đuổi khỏi viện",rt:()=>`Thái y chép kèm cả nét chữ ký: không phải chữ của người ${CN_QP()}.`,rf:"Thái y bị bắt gặp, sổ bị đốt sớm."},
  {n:"Để mặc, không dính vào Thái y viện",wx:"không ai nghi ngươi",lx:"chứng cứ thành tro, lòng ngươi cắn rứt",rt:"Cuối năm, khói từ sân Thái y viện bay cả buổi."}]},
 t1:{h:"Hai cánh cửa",w:"maid",t:()=>`Tố Nga hỏi: “Tỷ tỷ định đem chuyện này đến đâu? Đến ${CN_QP()}, hay giữ trong tay?”`,o:[
  {need:["hh"],n:"Định nói với Hoàng hậu",f:"hh",wx:"có chỗ dựa ở Trung cung",lx:"lộ ý chọn phe, {v} sẽ biết",rt:"Tố Nga gật đầu: “Vậy muội sẽ kể lại từng chữ.”"},
  {n:"Giữ trong tay, chờ thời",sc:1,f:"hold",wx:"bí mật là bài của ngươi",lx:"Tố Nga sống trong nguy hiểm thêm, lòng ngươi áy náy",rt:"Tố Nga gật đầu, giấu bản chép vào đế giày."},
  {n:"Hỏi Tố Nga muốn gì",f:"bond",wx:"nàng thấy mình là người, không phải quân cờ",lx:"nàng chỉ muốn yên, ngươi mất thế chủ động",rt:"Tố Nga khóc: “Muội chỉ muốn tên mình sạch.”"}]},
 x1:{h:"Ai sợ bí mật ấy",w:"v",need:["v"],t:"{v} cho người hẹn ngươi ở đình giữa hồ: “Có những chuyện, nói ra thì cả hai ta cùng chết.”",o:[
  {need:["hh"],n:"Đem đôi hài và sổ lên Hoàng hậu",e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",10);if(ok)return CN_CAM(rv67(A,"v"),BAL.road.cn_ban.cam)},rt:"Hoàng hậu nhìn sổ, nhìn hài, rồi sai người phong cửa cung {v}.",rf:"Sổ chép bị bảo là giả. Hoàng hậu trách ngươi làm loạn hậu cung."},
  {n:"Đến gặp {v}, ra giá",e:["win2","mid"],go:(A,ok)=>{rdOan(A,"v",ok?6:4)},rt:"{v} tái mặt, hứa không bao giờ đụng đến Tố Nga nữa.",rf:"{v} cười: “Muội không có gì cả.” Hai bên chia tay, ai cũng biết ai."},
  {n:"Đốt hết, chỉ xin Tố Nga được yên",e:"mid",lx:"bí mật mất, Tố Nga mất cơ minh oan",go:A=>{rdRel(A,"v",6)},rt:"Ngươi đốt bản chép ngay trước mặt người của {v}."}]}},
 E:{win:{k:1,tag:()=>`${CN_Q()} biết kẻ mượn danh`,w:"hh",t:()=>`${CN_Q()} biết có kẻ dùng tên ${CN_QP()} để làm điều ác. Không ai nói ra, nhưng từ đó ngươi được nhìn khác trước, và {v} bị nhìn rất lạnh.`,go:()=>CN_HHCLEAR()},
  win2:{k:1,tag:"Bí mật trong tay ngươi",w:"v",t:"{v} biết ngươi nắm thóp nàng ta. Từ đó, cung {v} nhường ngươi từng bước, nhưng mắt vẫn rình."},
  mid:{k:0,tag:"Bí mật ngủ yên",t:"Bí mật lại chìm xuống đáy giếng. Tố Nga được yên một thời gian, nhưng cái oan của nàng vẫn còn đó."},
  lose:{k:-1,tag:"Bị cho là bịa chuyện",t:()=>`Lời ngươi bị bác. ${CN_Q()} cho là ngươi lấy chuyện cũ để hại người; {v} được an ủi, còn ngươi bị phạt chép kinh.`}}});

rdDef("cn_ban",7,{t:"Kẻ vu Tố Nga",w:"v",sj:"cây trâm vàng trong chăn Tố Nga",cast(A){return rdCast(A,["v"])},
 g:"Tội của Tố Nga năm xưa là trộm trâm vàng của chủ. Cây trâm được tìm thấy trong chăn nàng. Ai đã đặt nó vào đó?",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Hồ sơ án trộm",w:"eun",if:RDW(1),t:"Nhân lúc cung {v} bị để ý, {eun} chịu cho ngươi xem hồ sơ án trộm trâm năm xưa của Tố Nga.",o:[
  {n:"Đọc kỹ lời khai từng người",sc:1,f:"file",wx:"thấy lời khai vênh nhau",lx:"đọc mãi không ra gì",rt:"Ba nhân chứng khai ba giờ khác nhau. Một người trong đó nay hầu cung {v}.",rf:"Lời khai trơn tru như đã học thuộc."},
  {n:"Biếu {eun} để mượn hồ sơ về",sc:1,f:"file",wx:"hồ sơ trong tay",lx:"nợ {eun} một ân",rt:"Hồ sơ nằm trong tráp của ngươi ba đêm."}]},
 s2:{h:"Cánh cửa đóng",w:"eun",if:RDW(0),t:"Từ sau chuyện bí mật, Nội vụ phủ khóa hồ sơ cũ. {eun} nói: “Án đã xử, {xung} đừng lật.”",o:[
  {n:"Nhờ ma ma cũ ở Nội vụ phủ",sc:1,f:"file",wx:"có người mở cửa sau",lx:"ma ma bị đuổi về quê",rt:"Ma ma lén đọc cho ngươi nghe từng dòng.",rf:"Ma ma bị bắt khi đang mở tủ."},
  {n:"Hỏi lại người cùng phòng năm xưa",sc:1,wx:"có người nhớ đêm ấy",lx:"ký ức mờ, khó làm bằng",rt:"Một cung nữ cũ nhớ: đêm mất trâm, có người lạ vào phòng lúc canh ba."}]},
 c1:{h:"Nhân chứng thứ ba",w:"maid",need:["v"],t:"Một trong ba nhân chứng nay là cung nữ hầu trà của {v}. Năm ấy nàng ta khai thấy Tố Nga giấu trâm.",o:[
  {n:"Lén gặp nàng ta, hứa che chở",sc:2,f:"wit",wx:"nàng ta chịu khai lại",lx:"nàng ta chạy đi báo chủ",go:(A,ok)=>{if(ok)rdOan(A,"v",5)},rt:"Nàng ta khóc: “Chủ nô tì bảo khai thế, không thì đánh chết.”",rf:"Nàng ta chạy thẳng về cung {v}."},
  {n:"Dọa nàng ta về tội khai man",sc:1,f:"wit",wx:"nàng ta sợ, nói thật",lx:"bị đồn ngươi ức hiếp cung nữ",rt:"Nàng ta run rẩy kể lại đêm ấy.",rf:"Nàng ta cắn răng không nói."},
  {n:"Để yên, tìm đường khác",wx:"không ai bị liên lụy",lx:"mất nhân chứng sống, phải lặn lội đường khác",rt:"Ngươi không đến gần nàng ta."}]},
 c2:{h:"Thợ kim hoàn",w:"maid",t:"Cây trâm năm ấy có vết hàn mới. Một thợ kim hoàn ở Nội vụ phủ nhớ đã sửa nó, theo lệnh người không phải chủ cây trâm.",o:[
  {n:"Đưa bạc, xin hắn viết lời chứng",sc:1,f:"smith",wx:"có lời chứng giấy trắng",lx:"hắn đổi ý vì sợ",rt:"Hắn viết, điểm chỉ: người đem trâm đến là thái giám cung {v}.",rf:"Hắn cầm bạc rồi nói không nhớ."},
  {n:"Nhờ hắn chỉ mặt kẻ đem trâm",sc:1,f:"smith",wx:"biết mặt kẻ đem trâm",lx:"bị thấy dẫn thợ đi dạo hậu cung",rt:"Hắn chỉ đúng một thái giám cung {v}.",rf:"Hắn chỉ nhầm người, náo loạn một phen."}]},
 c3:{h:"{v} đến tìm ngươi",w:"v",need:["v"],t:"{v} đến cung ngươi, mang theo hộp yến sào: “Chuyện cũ của kẻ hầu, đáng để hai ta mất hòa khí sao?”",o:[
  {n:"Nhận quà, nói khéo",wx:"{v} tưởng ngươi đã mềm",lx:"Tố Nga biết thì đau lòng",go:A=>{rdRel(A,"v",6)},rt:"{v} cười, ra về nhẹ nhõm."},
  {n:"Trả quà, nói thẳng",wx:"lòng ngay",lx:"{v} nói xấu ngươi kiêu, tiếng ngươi sụt",go:A=>{rdOan(A,"v",6)},rt:"{v} đứng dậy, váy quét qua ngưỡng cửa."},
  {n:"Giữ quà, cho người nghiệm",sc:1,wx:"biết {v} có ý gì",lx:"chẳng thấy gì, lại mang tiếng nghi người",rt:"Yến sào sạch, nhưng hộp có hai đáy: một mảnh giấy dò lời.",rf:"Yến sào sạch, chẳng có gì."}]},
 t1:{h:"Ghép mảnh",w:"maid",t:"Tố Nga nghe lại từng lời chứng, rồi nói khẽ: “Đêm ấy muội vừa từ giếng về. Họ đặt trâm để muội không kịp kể.”",o:[
  {n:"Cho Tố Nga đối chất kín",sc:1,f:"face",wx:"lời Tố Nga khớp chứng",lx:"Tố Nga sợ, nói lắp",rt:"Từng chi tiết khớp nhau như mộng gỗ.",rf:"Tố Nga run quá, nói trước quên sau."},
  {n:"Gom hết vào một bản",sc:1,wx:"chứng cứ gọn gàng",lx:"thức trắng chép sổ; một bản thì mất là mất hết",rt:"Ngươi chép tất cả vào một cuốn sổ mỏng."}]},
 x1:{h:"Gọi tên kẻ vu",w:"v",need:["v"],t:"Đủ mảnh rồi. Kẻ đặt trâm là thái giám cung {v}, theo lệnh {v}. Ngươi gọi tên, hay cầm lấy?",o:[
  {n:"Tố lên Tổng quản, xin tra lại án",e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Thái giám kia bị bắt, khai ra lệnh từ {v}. Án trộm trâm được ghi lại để xét.",rf:"Thái giám kia đã bị điều ra hoàng lăng. Không ai đối chất, ngươi bị trách vu người."},
  {n:"Đưa chứng cứ cho {v} xem, đòi trả tên Tố Nga",e:["win","mid"],go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"{v} cắn môi đến bật máu, cho người rút lời khai cũ.",rf:"{v} nghe xong chỉ nói: “Rồi sao?”"},
  {n:"Cất chứng cứ, chờ ngày tốt hơn",e:"mid",lx:"Tố Nga còn mang tiếng trộm",rt:"Ngươi khóa sổ vào rương, chìa đeo trên cổ."}]}},
 E:{win:{k:1,tag:"Lộ mặt kẻ vu",w:"v",t:"Ai cũng biết {v} đứng sau cây trâm. Án chưa lật, nhưng Tố Nga thôi bị gọi là kẻ trộm sau lưng."},
  mid:{k:0,tag:"Biết mà chưa nói",t:"Ngươi biết kẻ vu là ai. Chứng cứ nằm trong rương, chờ một ngày đủ gió."},
  lose:{k:-1,tag:"Bị gọi là vu cáo",t:"Không ai đối chất, lời ngươi thành lời vu. {v} được Hoàng thượng an ủi, còn cung ngươi bị khất bổng.",go:()=>CN_PAY(S,BAL.road.cn_ban.phat,"Hoàng thượng")}}});

rdDef("cn_ban",8,{t:"Tố Nga lâm bệnh",w:"doc",sj:"cơn bệnh của Tố Nga",cast(A){return rdCast(A,["v"])},
 g:()=>`Tố Nga ho ra máu, Thái y viện không chữa cho tội nô. Thái y nói: không có sâm trăm năm, trong ${CNB_ILL()} tháng nàng không qua nổi.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ho ra máu",w:"maid",if:RDW(1),t:"Đúng lúc kẻ vu bị lộ mặt, Tố Nga ngã quỵ bên giếng giặt. Mấy năm nước đá và roi vọt giờ mới đổ bệnh.",o:[
  {n:"Đưa nàng về cung ngươi chữa",sc:1,f:"near",wx:"Tố Nga được nằm chỗ ấm",lx:"bị chê đưa tội nô vào cung phi",rt:"Tố Nga nằm ở gian bên, nghe tiếng ngươi đọc sách mà ngủ."},
  {n:"Biếu Tân Giả khố cho nàng nghỉ",wx:"nàng thôi phải giặt",lx:"vẫn nằm chỗ ẩm, bệnh khó lui",rt:"Chưởng sự cho Tố Nga nằm kho chăn."}]},
 s2:{h:"Không ai chữa cho tội nô",w:"doc",if:RDW(0),t:"Thái y viện trả lời: tội nô không có tên trong sổ thì không được kê đơn. Tố Nga ho suốt đêm.",o:[
  {n:"Xin Thái y viện phá lệ",sc:1,f:"doc",wx:"có thái y chịu xem",lx:"Viện phán nói ngươi coi thường phép",rt:"Một thái y trẻ chịu xem mạch.",rf:"Viện phán gạt đi."},
  {n:"Tự bốc thuốc theo sách",sc:1,wx:"đỡ được cơn ho",lx:"sai một vị, nàng nặng thêm",rt:"Thuốc của ngươi làm Tố Nga thở được.",rf:"Tố Nga nôn hết thuốc."}]},
 c1:{h:"Sâm trăm năm",w:"doc",t:()=>`Thái y nói: phải có sâm trăm năm, uống đủ ${CNB_ILL()} tháng. Kho Nội vụ phủ có, mà giá cao.`,o:[
  {n:"Bỏ bạc mua sâm",sc:1,f:"ginseng",wx:"Tố Nga có thuốc tốt",lx:"bạc cạn, tháng sau khó xoay",rt:"Củ sâm được gói trong lụa đỏ, mang đến lúc nửa đêm."},
  {n:"Bán trang sức đổi sâm",if:()=>CN_JEWEL()>=0,sc:1,f:"ginseng",wx:"có sâm mà không động bạc, mất một món trang sức",lx:"bị thấy cầm đồ, mất mặt",go:(A,ok)=>{if(ok){const i=CN_JEWEL();if(i>=0){const e=S.inv.splice(i,1)[0];return `Ngươi mất ${IT[e.k].n}.`}}},rt:"Một món trang sức của ngươi đổi được nửa củ sâm.",rf:"Đồ cầm bị nhận ra, sâm vẫn chưa có."},
  {n:"Xin Hoàng thượng ban sâm",need:["nsrv"],sc:1,f:"ginseng",wx:"sâm ngự ban",lx:"Hoàng thượng thấy ngươi xin cho tội nô",rt:"Hoàng thượng phẩy tay: “Cho nàng một củ.”",rf:"Hoàng thượng hỏi: “Tội nô ấy là gì của nàng?”"}]},
 c2:{h:"Thuốc bị tráo",w:"maid",need:["v"],t:"Thang thuốc thứ ba của Tố Nga có vị lạ. Người sắc thuốc khai được một cung nữ cung {v} cho bạc.",o:[
  {n:"Bắt người sắc thuốc khai trước Tổng quản",sc:1,f:"swap",wx:"thêm một tội cho {v}",lx:"người ấy chối, ngươi bị chê làm lớn",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Lời khai được ghi, có điểm chỉ.",rf:"Người ấy nói nhầm thuốc, không ai cho bạc."},
  {n:"Tự sắc thuốc cho nàng",wx:"không ai đụng được thuốc",lx:"ngươi tiều tụy, lơ việc hầu giá",rt:"Mỗi đêm ngươi ngồi canh lò thuốc."}]},
 c3:{h:"Tố Nga muốn trăng trối",w:"maid",t:"Tố Nga thều thào: “Nếu muội không qua, tỷ tỷ đem lời muội viết đi. Đừng để nó chết theo muội.”",o:[
  {n:"Ngồi chép lời nàng",sc:1,f:"words",wx:"có lời khai bằng giấy",lx:"Tố Nga mệt thêm",rt:"Ngươi chép, Tố Nga điểm chỉ bằng ngón tay run."},
  {n:"Bảo nàng thôi nghĩ chuyện ấy",wx:"nàng yên lòng nghỉ",lx:"lời khai chưa có, ngươi mất một con bài",rt:"Tố Nga nhắm mắt, nắm tay ngươi mà ngủ."}]},
 t1:{h:"Cơn sốt cuối",w:"doc",t:"Đêm thứ chín, Tố Nga sốt mê man. Thái y nói: qua được đêm nay thì sống.",o:[
  {n:"Thức canh bên giường",sc:1,wx:"nàng biết ngươi ở đó",lx:"ngươi kiệt sức",rt:"Gần sáng, mồ hôi Tố Nga vã ra."},
  {n:"Mời thái y ở lại cả đêm",sc:1,f:"doc",wx:"có thầy giỏi bên cạnh",lx:"thái y bỏ về giữa chừng",rt:"Thái y châm ba mũi, cơn sốt lui.",rf:"Thái y bị gọi đi cung khác."}]},
 x1:{h:"Giữ hay mất",w:"doc",t:()=>`Hạn ${CNB_ILL()} tháng đã gần hết. Tố Nga còn thở, nhưng thái y nói phải chọn một phương thuốc cuối.`,o:[
  {n:"Dùng phương mạnh, liều một phen",e:["win","lose"],rt:"Tố Nga ra mồ hôi suốt một đêm, sáng ra đòi ăn cháo.",rf:"Phương mạnh làm Tố Nga lịm đi ba ngày, tỉnh dậy yếu hẳn."},
  {n:"Dùng phương ôn, chữa từ từ",e:["win","mid"],rt:"Tố Nga qua mùa rét, má hồng trở lại.",rf:"Tố Nga sống, nhưng ho thành bệnh cũ."},
  {n:"Xin cho nàng về quê dưỡng bệnh",need:["nsrv"],e:"mid",lx:"nàng xa ngươi, lời khai khó đến tay",rt:"Hoàng thượng chuẩn cho Tố Nga về quê dưỡng bệnh nửa năm."}]}},
 E:{win:{k:1,tag:"Tố Nga qua cơn bệnh",w:"maid",t:"Tố Nga khỏi bệnh. Nàng cầm tay ngươi: “Mạng này của tỷ tỷ. Tỷ tỷ muốn muội nói ở đâu, muội nói ở đó.”"},
  mid:{k:0,tag:"Bệnh lui mà chưa dứt",t:"Tố Nga sống, nhưng yếu hẳn. Mỗi lần trở trời, nàng ho đến không đứng dậy được."},
  lose:{k:-1,tag:"Tố Nga kiệt sức",t:"Tố Nga qua khỏi, nhưng chỉ còn nửa người. Ngươi nợ bạc, mỏi mệt, và cung {v} cười sau lưng."}}});

rdDef("cn_ban",9,{t:"Lời khai",w:"maid",sj:"lời khai của Tố Nga",cast(A){return rdCast(A,["v"])},
 g:"Tố Nga muốn khai hết: cái giếng, đôi hài, cây trâm. Một lời khai là con dao: giữ ở đâu thì an, đưa cho ai thì cắt ai.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tố Nga đòi khai",w:"maid",if:RDW(1),t:"Khỏi bệnh, Tố Nga quỳ: “Muội muốn khai trước người có quyền. Muội không sợ nữa.”",o:[
  {n:"Giúp nàng soạn lời khai",sc:1,f:"draft",wx:"lời khai chặt chẽ",lx:"lời có vẻ được dạy",rt:"Lời khai viết ba bản, không một chỗ hở."},
  {n:"Để nàng tự nói bằng lời mình",f:"own",wx:"lời thật, nghe là tin",lx:"nàng có thể lộn xộn trước người lạ, ngươi mất thế chủ động",rt:"Tố Nga tập nói một mình bên cửa sổ."}]},
 s2:{h:"Tố Nga do dự",w:"maid",if:RDW(0),t:"Còn yếu, Tố Nga sợ: “Khai rồi, nếu không ai tin, muội chết đã đành, còn tỷ tỷ thì sao?”",o:[
  {n:"Hứa gánh cùng nàng",sc:1,f:"own",wx:"nàng dám khai",lx:"ngươi buộc mình vào số phận nàng",rt:"Tố Nga nắm tay ngươi: “Vậy muội nói.”"},
  {n:"Cho nàng thêm thời gian",wx:"nàng không bị ép",lx:"ngươi lo đến mất ngủ; kẻ kia có thêm thời gian",rt:"Ngươi không nhắc lại chuyện ấy cả tháng."}]},
 c1:{h:"Thận hình ty muốn giữ người",w:"eun",t:"{eun} báo: nếu Tố Nga khai, nàng phải vào Thận hình ty chờ đối chất. Ở đó, chết một tội nô không ai hỏi.",o:[
  {n:"Biếu {eun} để nàng ở cung ngươi",sc:1,f:"keep",wx:"Tố Nga không vào Thận hình ty",lx:"{eun} nhận bạc mà không làm",rt:"{eun} ghi: nhân chứng giao cho cung {xung} trông giữ.",rf:"{eun} cất bạc, vẫn cho người đến bắt."},
  {n:"Xin Thái hậu cho nàng ở Đức Thọ cung",need:["th"],sc:1,f:"keep",wx:"không ai dám vào Đức Thọ cung",lx:"Thái hậu không muốn dính vào",rt:"Thái hậu cho Tố Nga ở gian sau Phật đường.",rf:"Thái hậu nói: “Ai gia già rồi, không lo được việc ấy.”"},
  {n:"Để nàng vào, cho người canh",wx:"theo đúng phép, không ai bắt bẻ",lx:"Tố Nga ở giữa hang hổ",rt:"Hai thái giám của ngươi đứng ngoài cửa ngục suốt đêm."}]},
 c2:{h:"{v} mặc cả",w:"v",need:["v"],t:"{v} gửi lời: “Rút lời khai, ta xin Nội vụ phủ xóa tên Tố Nga khỏi sổ tội nô. Nàng ta được tự do, ngươi được yên.”",o:[
  {n:"Nhận lời, đổi lấy tự do cho nàng",wx:"Tố Nga được xóa tên",lx:"kẻ vu không bị gì",f:"deal",go:A=>{rdRel(A,"v",8);CN_FL("cn_ban.deal",1)},rt:"Tên Tố Nga được gạch khỏi sổ."},
  {n:"Từ chối thẳng",sc:1,wx:"lời khai vẫn đó",lx:"{v} dồn sức hại, ngươi phải căng mình đề phòng",go:A=>{rdOan(A,"v",6)},rt:"Người của {v} lui ra, mặt xám ngắt."},
  {n:"Giả vờ nhận, kéo dài thời gian",sc:1,wx:"có thời gian gom chứng",lx:"{v} biết bị lừa, giận hơn",go:(A,ok)=>{if(!ok)rdOan(A,"v",8)},rt:"{v} chờ, ngươi gom thêm hai người chứng.",rf:"{v} biết ngay ngươi không thật lòng."}]},
 c3:{h:"Người cùng phòng năm xưa",w:"maid",t:"Một cung nữ cũ cùng phòng với ngươi và Tố Nga, nay hầu ở Thượng cung cục, gửi lời: nàng nhớ đêm mất trâm.",o:[
  {n:"Xin nàng làm chứng thêm",sc:1,f:"two",wx:"thêm một lời chứng",lx:"nàng sợ, rút lui",rt:"Nàng ký tên dưới lời khai.",rf:"Nàng xin thôi, sợ bị liên lụy."},
  {n:"Bảo nàng đừng dính vào",wx:"giữ an cho người vô can",lx:"mất một lời chứng",rt:"Nàng cúi đầu cảm tạ."}]},
 t1:{h:"Đêm trước ngày khai",w:"maid",t:"Đêm trước ngày khai, ai đó ném một con dao găm vào cửa sổ nơi Tố Nga ngủ, kèm mảnh giấy: “Câm.”",o:[
  {n:"Đổi nàng sang phòng ngươi",sc:1,wx:"nàng ngủ an",lx:"ngươi thức trắng",rt:"Tố Nga ngủ dưới chân giường ngươi."},
  {n:"Giữ con dao làm chứng",sc:1,f:"knife",wx:"thêm một vật chứng",lx:"con dao không có dấu gì; người giữ dao bị nghi, mất một tai mắt",rt:"Chuôi dao khắc dấu một kho đồ của cung {v}.",rf:"Chuôi dao trơn nhẵn, không biết từ đâu."}]},
 x1:{h:"Giao lời khai cho ai",w:"maid",t:"Lời khai đã xong, có điểm chỉ. Giao cho ai, Tố Nga an với người ấy, mà cũng hiểm với người ấy.",o:[
  {n:"Dâng lên Hoàng hậu, xin phân xử lục cung",need:["hh"],e:["win","lose"],go:A=>{rdOan(A,"v",8)},rt:"Hoàng hậu nhận, đóng dấu: án sẽ được xét lại.",rf:"Hoàng hậu nhận rồi để đó, cung {v} biết hết."},
  {n:"Dâng lên Tổng quản theo phép",e:["win","mid"],rt:"{eun} ghi lời khai vào sổ, hứa trình lên.",rf:"{eun} ghi vào sổ, rồi sổ nằm yên."},
  {n:"Cất lời khai, chưa đưa ai",e:"mid",lx:"án chưa xét lại",rt:"Lời khai khâu trong lớp lót áo của ngươi."}]}},
 E:{win:{k:1,tag:"Lời khai lên đến nơi",w:"maid",t:"Lời khai của Tố Nga đã nằm trên án thư người có quyền xét. Lần đầu tiên, nàng ngủ một giấc không mộng."},
  mid:{k:0,tag:"Lời khai còn trong tay",t:"Lời khai vẫn đó, chưa ai xét. Tố Nga được yên, còn {v} không ngủ yên."},
  lose:{k:-1,tag:"Lời khai bị ỉm",t:"Lời khai bị ỉm đi. Người của {v} biết từng chữ, và Tố Nga lại sống trong sợ hãi."}}});

rdDef("cn_ban",10,{t:"Rửa oan",w:"hh",sj:"phiên xét lại án Tố Nga",cast(A){return rdCast(A,["v"])},
 g:()=>(CN_FL("cn_ban.deal")?"Tên Tố Nga đã được gạch khỏi sổ tội nô nhờ lời hứa với {v}, nhưng tiếng trộm trâm vẫn còn. ":"")+"Án trộm trâm của Tố Nga được đem ra xét lại. {v} có người, có lời, có thế; ngươi có Tố Nga và những gì đã gom.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ngày xét án",w:"hh",if:RDW(1),t:()=>`Lời khai đã lên. ${CN_J()}.`,o:[
  {n:"Xin cho Tố Nga mặc áo sạch ra trình",wx:"nàng đứng thẳng trước lục cung",lx:"bị chê làm màu cho tội nô",rt:"Tố Nga bước vào trong áo vải mới, đầu ngẩng cao."},
  {need:["hh"],n:"Đến sớm, gặp riêng Hoàng hậu",sc:1,f:"hh",wx:"Hoàng hậu nghe ngươi trước",lx:"Hoàng hậu không thích bị cầu cạnh",rt:"Hoàng hậu gật: “Bản cung sẽ xét công bằng rồi mới tâu.”",rf:"Hoàng hậu nói: “Vào chỗ của mình đi.”"}]},
 s2:{h:"Xin mở lại án",w:"maid",if:RDW(0),t:"Lời khai chưa ai xét. Muốn mở lại án, ngươi phải tự quỳ xin, hoặc mượn tay người khác.",o:[
  {n:()=>`Quỳ trước ${CN_QP()} xin xét`,sc:1,wx:"cả cung thấy ngươi thành tâm",lx:"bị cười là quỳ vì tội nô",rt:()=>CN_QK()==="emp"?"Đến trưa, Hoàng thượng hạ chỉ cho xét lại án.":`Đến trưa, ${CN_Q()} tâu lên; Hoàng thượng hạ chỉ cho xét lại án.`,rf:"Quỳ hết buổi, cửa vẫn đóng."},
  {n:"Nhờ Ngự sử nói ngoài triều",sc:1,wx:"việc lan ra ngoài, không ỉm được",lx:"Hoàng thượng không vui chuyện hậu cung ra triều",rt:"Một Ngự sử dâng sớ, Hoàng thượng phê: xét lại.",rf:"Ngự sử bị gạt, việc thành chuyện cười."}]},
 c1:{h:"Nhân chứng của {v}",w:"v",need:["v"],t:"{v} đưa ra hai ma ma thề rằng thấy Tố Nga lẻn vào phòng chủ đêm mất trâm.",o:[
  {n:"Hỏi vặn từng người",sc:2,f:"cross",wx:"lời hai ma ma vênh nhau",lx:"ngươi bị đáp trả",rt:"Một ma ma nói canh hai, một nói canh tư. Cả điện xì xào.",rf:"Hai ma ma khai trơn tru như đọc."},
  {n:"Đưa thợ kim hoàn ra đối",sc:1,f:"cross",wx:"vết hàn nói thay người",lx:"thợ sợ, nói lí nhí",rt:"Thợ chỉ vết hàn: trâm đã qua tay người khác trước khi vào chăn Tố Nga.",rf:"Thợ cúi đầu, nói không nhớ rõ."}]},
 c2:{h:"Hoàng thượng ghé qua",w:"emp",t:()=>`Giữa phiên xét, Hoàng thượng ghé ${CN_QP()}. Ngài nhìn Tố Nga, rồi nhìn ngươi: “Một tội nô đáng để làm ầm thế sao?”`,o:[
  {n:"Thưa: nàng là người cùng phòng của thiếp",need:["nsrv"],sc:1,wx:"Hoàng thượng động lòng",lx:"ngài nhớ ra ngươi xuất thân kẻ hầu",rt:"Hoàng thượng lặng đi: “Nàng chưa quên người cũ.”",rf:"Hoàng thượng nhíu mày rồi đi."},
  {n:"Thưa: oan thì phải rửa, dù là ai",wx:"lời ngay khiến người nể",lx:"Hoàng thượng thấy ngươi cứng, ân sủng nguội đi",rt:"Hoàng thượng gật đầu, ngồi xuống nghe."}]},
 c3:{h:"Mảnh giấy dọa",w:"maid",need:["v"],t:"Trong lúc nghỉ, có người dúi vào tay Tố Nga mảnh giấy: nếu khai đến cái giếng, quê nhà nàng sẽ có người chết.",o:[
  {n:"Bảo nàng chỉ nói về cây trâm",f:"narrow",wx:"người nhà nàng an",lx:"chuyện cái giếng chưa được nói, ngươi bỏ một con bài",rt:"Tố Nga gật đầu, gấp mảnh giấy cất đi."},
  {need:["hh"],n:"Đưa mảnh giấy cho Hoàng hậu xem",sc:1,wx:"{v} bị thêm tội đe dọa",lx:"không ai nhận, Hoàng hậu thấy ngươi làm rối",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Hoàng hậu cho người về quê Tố Nga canh giữ.",rf:"Mảnh giấy không dấu, không ai nhận."}]},
 t1:{h:"Tố Nga đứng lên",w:"maid",t:"Đến lượt Tố Nga. Nàng nhìn ngươi, chờ một cái gật đầu.",o:[
  {n:"Gật đầu, để nàng nói hết",sc:1,wx:"lời nàng chạm lòng người nghe",lx:"nàng nghẹn, nói đứt quãng, người nghe xì xào",rt:"Tố Nga kể, giọng không run.",rf:"Tố Nga òa khóc giữa chừng."},
  {n:"Đứng lên nói thay nàng",sc:1,wx:"lời gọn, đúng chỗ",lx:"người nghe cho là ngươi dạy nàng",rt:"Ngươi nói, Tố Nga chỉ gật đầu từng câu."}]},
 x1:{h:"Lời tâu cuối",w:"hh",t:()=>CN_QK()==="emp"?"Thận hình ty khép phiên xét, hỏi ngươi có lời gì muốn tâu lên ngự án. Mắt mọi người đổ về ngươi.":`${CN_Q()} khép phiên xét: “{Xung} có lời gì muốn ${CN_QI()} tâu lên Hoàng thượng?” Mắt cả điện đổ về ngươi.`,o:[
  {n:"Xin minh oan và trị tội kẻ vu",e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",12);if(ok)return CN_CAM(rv67(A,"v"),BAL.road.cn_ban.cam)},rt:()=>`${CN_PHE()}: Tố Nga vô tội, kẻ làm chứng gian bị đánh, {v} bị cấm túc.`,rf:()=>`${CN_PHE()}: chứng cứ chưa đủ, án giữ nguyên.`},
  {n:"Chỉ xin minh oan cho Tố Nga",e:["win","mid"],rt:()=>`${CN_PHE()}: Tố Nga vô tội, tên được xóa khỏi sổ tội nô.`,rf:()=>`${CN_PHE()}: Tố Nga được giảm tội, nhưng chưa xóa hẳn.`},
  {need:["hh"],n:"Xin Hoàng hậu xử nhẹ cho êm",e:"mid",lx:"Tố Nga chỉ được giảm tội",go:A=>{rdRel(A,"v",5)},rt:"Hoàng hậu tâu xin, Hoàng thượng phê: Tố Nga ra khỏi Tân Giả khố, án để lại đó."}]}},
 E:{win:{k:1,tag:"Tố Nga được minh oan",w:"hh",t:"Tên Tố Nga được gạch khỏi sổ tội nô. Nàng quỳ trước ngươi, dập đầu ba cái, không nói được lời nào."},
  mid:{k:0,tag:"Oan được giảm",t:"Tố Nga thoát Tân Giả khố nhưng án chưa xóa hẳn. Nàng vẫn chưa ngẩng được đầu trước người cũ."},
  lose:{k:-1,tag:"Án giữ nguyên",t:"Án giữ nguyên. Tố Nga về lại Tân Giả khố, ngươi bị chê làm ầm lục cung vì một tội nô."}}});

rdDef("cn_ban",11,{t:"Tình chị em",w:"maid",sj:"số phận của Tố Nga",cast(A){return rdCast(A,["v"])},
 g:"Mọi chuyện đi đến cuối. Tố Nga ở lại, ra đi, hay không qua khỏi, là điều ngươi định trong chương này. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tố Nga tự do",w:"maid",if:RDW(1),t:"Tố Nga được trả tên. Nàng đứng trước cửa cung ngươi, tay ôm một bọc áo: “Muội nên đi, hay nên ở?”",o:[
  {n:"Giữ nàng lại hầu bên mình",f:"stay",wx:"có người tin cẩn nhất",lx:"nàng không về được quê, lòng ngươi áy náy",rt:"Tố Nga đặt bọc áo xuống, cười như thuở mười lăm."},
  {n:"Để nàng tự chọn",f:"free",wx:"nàng thấy mình được làm người",lx:"có thể mất nàng; trong lúc nàng nghĩ, ngươi thiếu người tin cẩn",rt:"Tố Nga xin ba ngày để nghĩ."}]},
 s2:{h:"Tố Nga lại ngã bệnh",w:"doc",if:RDW(0),t:"Bao nhiêu năm khổ dồn lại. Tố Nga lại ho ra máu, lần này nặng hơn trước.",o:[
  {n:"Mời thái y giỏi nhất",sc:1,f:"cure",wx:"bệnh lui một bậc",lx:"thái y lắc đầu",rt:"Thái y nói: còn cứu được nếu nàng được nghỉ hẳn.",rf:"Thái y chỉ kê thuốc giảm đau."},
  {n:"Ngồi bên nàng mỗi tối",sc:1,wx:"nàng không thấy mình bị bỏ",lx:"ngươi bỏ bê việc trong cung",rt:"Tố Nga kể chuyện thuở hai người còn chung phòng."}]},
 c1:{h:"{v} đứng sau lần cuối",w:"v",need:["v"],t:"{v} cho người đến nói: “Tố Nga còn ở trong cung một ngày, ta còn nhớ nàng ta một ngày.”",o:[
  {n:"Đáp: cứ nhớ, ta cũng nhớ",sc:1,wx:"{v} biết ngươi không sợ",lx:"mối thù sâu thêm, {v} rêu rao ngươi cứng đầu",go:A=>{rdOan(A,"v",6)},rt:"Người của {v} lui ra, không dám đáp."},
  {n:"Gửi lời giảng hòa, đổi lấy yên ổn",wx:"{v} buông tay",lx:"{v} cho là ngươi yếu",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} nhận quà, hứa không nhắc tên Tố Nga nữa.",rf:"{v} trả quà, kèm một câu mỉa."}]},
 c2:{h:"Thư từ quê",w:"maid",t:"Mẹ già của Tố Nga ở quê gửi thư: bà yếu lắm rồi, chỉ mong được nhìn con một lần.",o:[
  {n:"Gửi bạc và người đón mẹ nàng lên kinh",sc:1,f:"mom",wx:"mẹ con nàng gặp nhau",lx:"tốn bạc, lại thêm người ngoài biết chuyện",rt:"Bà lão đến cổng cung, ôm con gái khóc cả buổi."},
  {n:"Giấu thư, sợ nàng muốn đi",f:"stay",wx:"nàng không nghĩ đến chuyện đi",lx:"nếu nàng biết, lòng nàng nguội",rt:"Ngươi cất thư vào hộc bàn."},
  {n:"Đưa thư cho nàng đọc",f:"free",wx:"nàng biết ngươi thật lòng",lx:"nàng nhớ nhà, lơ việc nghe ngóng",rt:"Tố Nga đọc xong, ngồi nhìn trời rất lâu."}]},
 c3:{h:"Chuyện cái giếng lần cuối",w:"maid",need:["v"],t:"Tố Nga hỏi: “Chuyện cái giếng, tỷ tỷ còn muốn nói ra không? Muội còn nhớ từng chữ.”",o:[
  {n:"Chép lại lần cuối, cất kỹ",sc:1,f:"well",wx:"bí mật còn đó cho ngày sau",lx:"{v} vẫn chưa đền tội",rt:"Ngươi khóa bản chép vào hộp gỗ trầm."},
  {n:"Thôi, để nó chìm",wx:"Tố Nga thôi sợ",lx:"người bị hại năm xưa không được đòi, ngươi bỏ con bài cuối",rt:"Tố Nga thở ra như trút gánh."}]},
 t1:{h:"Đêm trăng chung phòng",w:"maid",t:"Đêm rằm, hai người ngồi như thuở còn chung phòng ở Nội vụ phủ. Tố Nga hỏi: “Tỷ tỷ có hối hận vì đã cứu muội không?”",o:[
  {n:"Đáp: chưa bao giờ",sc:1,wx:"tình chị em bền chặt",lx:"Tố Nga khóc, ngươi thức khuya dỗ nàng",rt:"Tố Nga dựa đầu vào vai ngươi."},
  {n:"Đáp thật: có lúc sợ",sc:1,wx:"hai người thật lòng với nhau",lx:"Tố Nga áy náy, ngươi cũng chạnh lòng",rt:"Tố Nga cười: “Muội cũng sợ. Vậy mà vẫn qua.”"}]},
 x1:{h:"Ngày quyết",w:"maid",t:"Nội vụ phủ hỏi: Tố Nga ở lại cung làm cung nữ của {xung}, hay xuất cung? Tố Nga chờ ngươi nói trước.",o:[
  {n:"Xin Tố Nga làm chưởng sự cung ngươi",e:["win","lose"],rt:"Tố Nga nhận ấn chưởng sự, đứng sau ngươi từ đó.",rf:"Bệnh cũ trở lại giữa mùa đông. Tố Nga nắm tay ngươi mà đi, môi còn mỉm cười."},
  {n:"Để Tố Nga về quê với mẹ",wx:"Tố Nga đi với cái tên sạch",e:["mid","lose"],rt:"Tố Nga lạy ngươi ba lạy ở cổng Thần Vũ, rồi đi không ngoảnh lại.",rf:"Tố Nga lên đường giữa mùa rét. Tin về: nàng không qua khỏi trên đường."},
  {n:"Hỏi Tố Nga, theo ý nàng",e:"mid",lx:"có thể phải xa nàng mãi",rt:"Tố Nga chọn về quê, hẹn mỗi năm gửi một đôi hài tự khâu."}]}},
 E:{win:{k:1,tag:"Tố Nga ở lại bên ngươi",w:"maid",t:"Tố Nga thành chưởng sự cung ngươi. Người từng chung phòng thuở hàn vi nay đứng sau lưng ngươi, biết từng hơi thở của hậu cung."},
  mid:{k:0,tag:"Tố Nga về quê",t:"Tố Nga ra cung, về với mẹ già. Mỗi năm một đôi hài vải gửi vào cung, đường khâu vẫn như thuở xưa."},
  lose:{k:-1,tag:"Tố Nga không qua khỏi",t:"Tố Nga mất. Không ai trách ngươi; nàng ra đi với cái tên đã sạch. Chỉ là từ đó, trong cung không còn ai gọi ngươi là tỷ tỷ."}}});
RD97L.push(rdRare({a:"cn_ban_11",tag:"Bí mật cái giếng hạ bệ kẻ vu",w:"maid",n:"Để Tố Nga kể chuyện cái giếng trước Thái hậu",
 path:["Cho thái y nghiệm bát cháo","Mua hắn lại","Đưa Tố Nga đi nơi khác","Mua người chép sổ","Nhờ thái y quen chép","Lén gặp nàng ta","Đưa bạc, xin hắn viết","Bắt người sắc thuốc khai","Ngồi chép lời nàng","Giữ con dao làm chứng","Hỏi vặn từng người","Chép lại lần cuối"],
 bad:["Đốt hết","Nhận lời, đổi lấy tự do","Thôi, để nó chìm","Gửi lời giảng hòa"],x:[A=>!S.thDead&&qOn()&&!!rv67(A,"v")&&S.duc>=RR("cn_ban_11").bar,"Thái hậu còn sống, Hoàng hậu còn tại vị, Đức từ "+RR("cn_ban_11").bar],
 t:()=>`Tố Nga quỳ trước Thái hậu, kể từng chữ chuyện cái giếng: đôi hài hoa mai, dòng lĩnh thuốc mượn tên ${CN_QP()}, cây trâm đặt vào chăn. Thái hậu cho mở sổ Châm công cục và Thái y viện. Kẻ mượn danh Trung cung bị giáng xuống hàng thấp nhất; ${CN_Q()}, được rửa tiếng, sai người mang đến cung ngươi một đôi như ý.`,go:A=>{const v=rdOan(A,"v",15);let r="";if(v&&(typeof rvOk67!=="function"||rvOk67(v))&&!v.queen&&v.rank>0){v.rank=0;r=`${v.name} bị giáng xuống ${RANKS[0].n}.`}return [r,CN_HHCLEAR()].filter(Boolean).join(" ")},rw:"nt_dongchau",ti:"Người rửa oan cho giếng cũ"}));

/* ---------- cn_than · Thân thế thật ---------- */
/* Road of «Cung nữ được sủng hạnh»: the dying mama of .4 told her she is the daughter of Thẩm Thị lang, demoted under the late emperor.
   From .5: the mama's keepsake holds half a page of an old relief ledger; the man who impeached her father to bury it was the grandfather
   of the consort {v} (cast once, carried). The old Thẩm steward (unnamed walk-on) holds the other half outside the palace. */
const CNT_DL=()=>kitNumVi(BAL.road.cn_than.dl);

rdDef("cn_than",5,{t:"Di vật của ma ma",w:"maid",sj:"bọc di vật lão ma ma để lại",cast(A){return rdCast(A,["v"],CN_NORECAST)},
 g:"Lão ma ma đã mất, để lại một bọc vải chưa ai mở. Trong đó có thể là lá thư của mẹ ruột ngươi, cũng có thể là thứ khiến kẻ khác mất ngủ.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Người đến chúc mừng",w:"maid",if:RDW(1),t:()=>(rdPrev()==="r97"?"Từ ngày miếng ngọc được nhận ra và ngươi được phong Huyện chúa,":"Từ ngày tên họ Thẩm được nhắc lại,")+" cung ngươi đông khách. Giữa đám người chúc mừng, một tiểu thái giám hỏi khéo: lão ma ma có để lại gì không?",o:[
  {n:"Hỏi ngược ai sai hắn đến",sc:1,f:"who",wx:"biết có kẻ thèm di vật",lx:"hắn chạy mất",rt:"Hắn lắp bắp, lỡ miệng nhắc đến một phủ lão Thái phó.",rf:"Hắn cười trừ, xin lui."},
  {n:"Đáp ma ma chẳng để lại gì",f:"quiet",wx:"kẻ dò tạm yên",lx:"nói dối trước đông người, lòng áy náy; phải lấy bọc vải gấp hơn",rt:"Tiểu thái giám gật gù đi ra."}]},
 s2:{h:"Di vật không người nhận",w:"eun",if:RDW(0),t:()=>(rdPrev()==="mid"?"Cha ruột ngươi đã được rửa oan, nhưng ngươi vẫn mang thân phận cũ.":"Ngươi bị coi là mạo nhận, thân thế còn lưng chừng.")+" Đồ đạc của lão ma ma bị Nội vụ phủ giữ lại vì không ai đứng ra nhận, sắp đem đốt cùng đồ người chết.",o:[
  {n:"Đến Nội vụ phủ nhận thay",sc:1,f:"bundle",wx:"bọc vải về tay ngươi",lx:"bị cười là nhận đồ của kẻ hầu chết",rt:"{eun} sai người đem bọc vải đến tận cung ngươi."},
  {n:"Biếu người giữ kho lấy lén",sc:1,f:"bundle",wx:"lấy được mà không ai biết",lx:"người giữ kho đã bán cho kẻ khác",rt:"Bọc vải được giấu dưới đáy một sọt than.",rf:"Người giữ kho nói: có người đã lấy trước rồi."}]},
 s3:{h:"Tiếng cười sau lưng",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&rdPrev()==="lose",t:"Chuyện ngươi “mạo nhận dòng dõi” thành trò cười. {v} che quạt nói to: “Con bé bưng trà mà đòi làm tiểu thư nhà quan.”",o:[
  {n:"Cười đáp, không cãi",wx:"người nghe nể ngươi biết nhịn",lx:"lời mỉa vẫn lan, tiếng ngươi sụt",rt:"Ngươi cười, rót trà mời {v}. Nàng ta mất hứng bỏ đi."},
  {n:"Đáp lại sắc sảo",sc:1,wx:"lấy lại thể diện",lx:"bị chê hỗn",go:A=>{rdOan(A,"v",4)},rt:"Ngươi đáp một câu, cả vườn nín cười, {v} đỏ mặt.",rf:"Ngươi đáp hớ, tiếng cười to hơn."}]},
 c1:{h:"Lá thư của mẹ",w:"maid",t:"Trong bọc vải có lá thư Thẩm phu nhân viết vội trước ngày phủ bị niêm: “Con gái ta, nếu có ngày đọc được, hãy tìm lão quản gia.”",o:[
  {n:"Đọc kỹ, tìm chữ giấu",sc:1,f:"letter",wx:"thấy dòng chữ viết bằng nước gạo",lx:"chỉ đọc được lời mẹ dặn",rt:"Hơ lửa, dòng chữ hiện ra: “Nửa trang sổ trong lớp lót.”",rf:"Lá thư chỉ có lời một người mẹ."},
  {n:"Cất thư, khóc một đêm",wx:"lòng ngươi nhẹ đi",lx:"chưa đọc ra điều gì thêm",rt:"Đêm ấy ngươi ôm lá thư mà ngủ."}]},
 c2:{h:"Nửa trang sổ",w:"maid",t:"Lớp lót bọc vải có nửa trang sổ: sổ bạc cứu đê năm lũ lớn, ghi rõ ai nhận bao nhiêu. Có dấu triện của phủ một vị Thái phó.",o:[
  {n:"Đem so dấu triện với văn thư cũ",sc:1,f:"seal",wx:"biết triện ấy của ai",lx:"người so dấu đi kể",rt:"Triện là của lão Thái phó, ông nội {v}. Chính ông năm xưa hặc cha ngươi.",rf:"Người so dấu nhận ra, đi báo một nhà quyền thế."},
  {n:"Khâu lại vào lớp lót",f:"quiet",wx:"nửa trang an toàn",lx:"thức đêm khâu lại; chưa biết nó nặng bao nhiêu",rt:"Nửa trang sổ trở về chỗ cũ, như chưa ai động."}]},
 c3:{h:"Kẻ lục phòng",w:"maid",t:"Đêm, có người lẻn vào phòng ngươi, lục rương. Cung nữ canh đêm chỉ thấy một bóng áo xám.",o:[
  {n:"Đổi chỗ giấu ngay trong đêm",sc:1,wx:"bọc vải không mất",lx:"kẻ kia biết chắc ngươi có thứ đáng giấu",rt:"Ngươi giấu bọc vải trong hộp kinh Phật."},
  {n:"Bày bẫy, để rương mở",sc:1,f:"who",wx:"bắt được kẻ lục",lx:"kẻ kia không quay lại, rương mở bị mất đồ",rt:"Đêm sau, kẻ lục bị túm tay. Hắn là người khiêng kiệu của cung {v}.",rf:"Đêm sau không ai đến."}]},
 t1:{h:"Ma ma còn dặn",w:"maid",t:"Một cung nữ già từng hầu bên giường lão ma ma đến gặp: “Ma ma dặn, nếu tiểu chủ mở được bọc vải, phải biết ai đang tìm nó.”",o:[
  {n:"Biếu bà, hỏi kỹ",sc:1,wx:"biết thêm người đang tìm",lx:"bà sợ, nói nửa chừng",rt:"Bà nói: phủ lão Thái phó cho người vào cung hỏi từ tháng ma ma ốm.",rf:"Bà chỉ khóc, nói ma ma tội nghiệp."},
  {n:"Nhận bà về hầu cung ngươi",wx:"có người nhớ chuyện cũ bên cạnh",lx:"thêm miệng ăn, thêm người biết chuyện",rt:"Bà dập đầu, từ nay coi việc hương đèn."}]},
 x1:{h:"Kẻ đòi bọc vải",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} sai người đến, lời lẽ mềm mỏng: nhà nàng ta muốn mua lại “đồ cũ của một bà già”, giá bao nhiêu cũng được.",o:[
  {n:"Từ chối, giữ trọn bọc vải",e:["win","lose"],go:A=>{rdOan(A,"v",6)},rt:"Người của {v} về tay không. Bọc vải nằm yên trong hộp kinh.",rf:"Đêm ấy kho cung ngươi cháy. Bọc vải còn, nhưng nửa trang sổ thành tro."},
  {n:"Bán lá thư giả, giữ trang sổ",e:["win","mid"],go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"Nhà {v} nhận một lá thư vô hại, tưởng đã yên.",rf:"Nhà {v} biết bị lừa, nhưng chưa làm gì được."},
  {n:"Bán cả bọc, lấy bạc giữ mình",e:"mid",lx:"mất dấu vết cha ruột",go:A=>{rdRel(A,"v",8)},rt:"Người của {v} cười, cất bọc vải vào tay áo."}]}},
 E:{win:{k:1,tag:"Nửa trang sổ trong tay",w:"maid",t:"Ngươi giữ được lá thư của mẹ và nửa trang sổ bạc cứu đê. Cha ngươi bị giáng không vì can gián, mà vì biết quá nhiều."},
  mid:{k:0,tag:"Chỉ còn lời mẹ",t:"Ngươi biết thêm sự thật, mà chứng cứ thì lưng chừng. Chỉ có câu dặn của mẹ: “Tìm lão quản gia.”"},
  lose:{k:-1,tag:"Di vật thành tro",t:"Nửa trang sổ cháy mất. Nhà {v} yên tâm, còn ngươi chỉ còn lá thư của một người mẹ chưa từng gặp."}}});

rdDef("cn_than",6,{t:"Nhà {v} trong án cũ",w:"v",sj:"ông nội của {v} trong án cũ",cast(A){return rdCast(A,["v"],CN_NORECAST)},
 g:"Người hặc cha ngươi năm xưa là ông nội {v}. Lão Thái phó đã trí sĩ, nhưng con trai lão vẫn ngồi ghế Thượng thư, còn cháu gái lão ở ngay trong hậu cung với ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"{v} biết ngươi biết",w:"v",need:["v"],if:A=>!!rv67(A,"v")&&RDW(1)(),t:()=>`{v} đến thỉnh an ${CN_Q()} cùng giờ với ngươi. Ra đến hành lang, nàng ta khẽ nói: “Chuyện của ông nội ta, muội tính làm gì?”`,o:[
  {n:"Hỏi lại: tỷ biết bao nhiêu?",sc:1,f:"read",wx:"đọc được {v} biết gì",lx:"{v} không để lộ, còn rêu rao ngươi tra hỏi nàng ta",rt:"{v} biết có án, mà không biết có sổ.",rf:"{v} mỉm cười, không nói thêm."},
  {n:"Đáp thật: muốn cha ruột được sạch tên",wx:"lời ngay khó bắt bẻ",lx:"{v} biết đường ngươi đi, ngươi mất thế bất ngờ",go:A=>{rdOan(A,"v",3)},rt:"{v} im lặng một lúc: “Người chết rồi, muội làm khổ người sống làm gì.”"}]},
 s2:{h:"Gió từ nhà Thượng thư",w:"eun",if:RDW(0),t:"Nhà {v} không đợi ngươi ra tay. Bổng lộc cung ngươi bị Nội vụ phủ cắt nửa, lấy cớ sổ sách lẫn lộn.",o:[
  {n:"Xin {eun} tra lại sổ",sc:1,wx:"lấy lại bổng lộc",lx:"{eun} không muốn dính vào; bổng lộc vẫn bị khất",go:(A,ok)=>{if(!ok)return CN_PAY(S,BAL.road.cn_than.phat,"Nội vụ phủ")},rt:"{eun} tra, trả lại bổng lộc kèm lời xin lỗi.",rf:"{eun} nói sổ đã khóa, sang năm tính."},
  {n:"Nhịn, tự bù bằng bạc riêng",f:"quiet",wx:"nhà {v} tưởng ngươi đã sợ",lx:"bạc của ngươi vơi",rt:"Ngươi không nói một lời, cung vẫn đủ ăn."}]},
 c1:{h:"Lão Thái phó",w:"eun",if:A=>!!rv67(A,"v"),need:["v"],t:"Lão Thái phó tuy trí sĩ vẫn gửi thư vào cung mỗi tháng. Thư nào cũng qua tay {v}.",o:[
  {n:"Mua người đưa thư chép lại",sc:1,f:"mail",wx:"biết nhà ấy tính gì",lx:"người đưa thư bị bắt",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Thư dặn {v}: “Đừng để con bé ấy gặp lão quản gia họ Thẩm.”",rf:"Người đưa thư bị đánh, khai tên cung ngươi."},
  {n:"Để mặc, không đụng thư nhà người",wx:"tay ngươi sạch",lx:"không biết họ tính gì, tai mắt hụt một đường",rt:"Ngươi để thư nhà người đi đường của nó."}]},
 c2:{h:"{v} lâm bệnh",w:"doc",need:["v"],if:(A)=>{const v=rv67(A,"v");return !!v&&typeof illOf==="function"&&!!illOf(v)},t:"{v} đang lâm bệnh, đêm đêm trở mình gọi mẹ. Thái y viện đang bận cung khác. Ngươi có một phương thuốc bổ khí.",o:[
  {n:"Gửi thuốc, không để tên",sc:1,f:"kind",wx:"{v} đỡ bệnh",lx:"không ai biết công ngươi",go:A=>{rdRel(A,"v",10)},rt:"{v} đỡ hẳn, hỏi mãi ai gửi thuốc."},
  {n:"Gửi thuốc kèm lời hỏi thăm",sc:1,wx:"{v} nợ ngươi một ân",lx:"{v} ngờ ngươi có ý",go:(A,ok)=>{rdRel(A,"v",ok?12:2)},rt:"{v} sai người đến tạ, lời đã bớt gai.",rf:"{v} sai đổ thuốc đi, sợ có độc."},
  {n:"Không xen vào",wx:"không dính chuyện người",lx:"bỏ người bệnh, lòng ngươi áy náy",rt:"Ngươi đóng cửa đọc sách."}]},
 c3:{h:"Hồ sơ năm lũ",w:"maid",t:"Bạc cứu đê năm lũ lớn có sổ gốc ở Hộ bộ. Nếu nửa trang trong tay ngươi khớp sổ gốc, ấy là chứng cứ không chối được.",o:[
  {n:"Nhờ người trong Hộ bộ đối chiếu",sc:1,f:"match",wx:"sổ khớp từng dòng",lx:"sổ gốc đã bị sửa",rt:"Sổ gốc thiếu đúng những dòng có trong nửa trang của ngươi.",rf:"Sổ gốc đã được chép lại sạch sẽ, không còn dấu vết."},
  {n:"Nhớ lấy, chưa động đến Hộ bộ",wx:"không ai biết ngươi tìm",lx:"ngươi tự dò sách cũ đến khuya; chứng cứ chưa chắc",rt:"Ngươi chỉ ghi tên kho sổ vào lòng."}]},
 t1:{h:"Một lời đề nghị",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} hẹn gặp riêng: “Ta không làm gì có lỗi với muội. Tội ông ta, ta không gánh. Muội muốn gì?”",o:[
  {n:"Tin nàng ta, mời cùng tìm sự thật",wx:"{v} có thể đứng về phía ngươi",sc:1,f:"ally",lx:"nàng ta chỉ dò ý, rồi kể khắp cung",go:(A,ok)=>{rdRel(A,"v",ok?10:-3)},rt:"{v} cắn môi: “Nếu ông ta có lỗi thật, ta không bao che.”",rf:"{v} cười: “Muội ngây thơ quá.”"},
  {n:"Đáp: không cần gì ở tỷ",sc:1,wx:"không để lộ ý",lx:"lời lạnh làm ngươi mất nết hiền; {v} coi ngươi là kẻ thù",go:A=>{rdOan(A,"v",4)},rt:"{v} đứng dậy, váy quét qua ghế."}]},
 x1:{h:"Hai nhà một bàn",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Thượng thư, cha {v}, cho người vào cung nói: nhà ông sẵn lòng trả lại phủ cũ của họ Thẩm, nếu nửa trang sổ biến mất.",o:[
  {n:"Từ chối, nói sẽ trình sổ",e:["win","lose"],go:A=>{rdOan(A,"v",8)},rt:"Nhà Thượng thư lùi một bước, cho người rút khỏi Nội vụ phủ.",rf:"Nhà Thượng thư cười: “Xem ai trình trước.” Bổng lộc nhà nuôi ngươi ngoài quê bị cắt."},
  {n:"Ra điều kiện: phủ cũ và một lời xin lỗi",e:["win","mid"],go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"Nhà Thượng thư trả phủ cũ, {v} đến cung ngươi nói thay một lời.",rf:"Nhà Thượng thư chỉ trả phủ, lời xin lỗi không có."},
  {n:"Im lặng, không đáp",e:"mid",lx:"phủ cũ vẫn trong tay người",rt:"Ngươi để người đưa tin đứng chờ đến tối."}]}},
 E:{win:{k:1,tag:"Nhà Thượng thư phải lùi",w:"v",t:"Nhà {v} biết ngươi không phải đứa con gái mồ côi dễ dọa. Từ nay họ đề phòng ngươi như đề phòng một nhà quan."},
  mid:{k:0,tag:"Hai nhà giữ thế",t:"Hai bên nhìn nhau, chưa ai ra đòn. Nửa trang sổ vẫn trong tay ngươi; phủ cũ họ Thẩm vẫn trong tay người."},
  lose:{k:-1,tag:"Nhà {v} ra tay trước",t:"Nhà {v} ra tay trước. Nhà nuôi ngươi ngoài quê bị làm khó, còn trong cung, ai cũng biết ngươi chọc vào nhà Thượng thư."}}});

rdDef("cn_than",7,{t:"Người thân còn sống",w:"maid",sj:"lão quản gia họ Thẩm ngoài cung",cast(A){return rdCast(A,["v"],CN_NORECAST)},
 g:()=>`Lão quản gia họ Thẩm còn sống, trốn ở một ngôi chùa ngoài kinh, giữ nửa trang sổ còn lại. Nhà {v} cũng đang tìm lão. Tin báo lão ốm, chỉ cầm cự được ${CNT_DL()} tháng.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tin từ ngôi chùa",w:"maid",if:RDW(1),t:"Một sư cô đến cung dâng hương, dúi vào tay ngươi một chuỗi hạt gỗ: chuỗi hạt cha ngươi đeo năm xưa. Lão quản gia gửi.",o:[
  {n:"Gửi thư hẹn lão qua sư cô",sc:1,f:"line",wx:"có đường tin với lão",lx:"sư cô sợ, không đi nữa",rt:"Sư cô nhận thư, hẹn tháng sau trở lại.",rf:"Sư cô trả thư: “Bần ni không dám.”"},
  {n:"Cho người theo sư cô về chùa",sc:1,f:"place",wx:"biết lão ở đâu",lx:"người theo có thể bị nhà {v} để ý",rt:"Người của ngươi về báo tên chùa và gian sau."}]},
 s2:{h:"Di mẫu lại đến",w:"maid",if:RDW(0),t:"Người phụ nhân từng nhận là di mẫu ngươi lại xin vào cung. Bà nói biết lão quản gia ở đâu, đòi giá cao.",o:[
  {n:"Trả bạc lấy tin",sc:1,f:"place",wx:"biết nơi lão trốn",lx:"bà cầm bạc rồi bán tin cho nhà khác",rt:"Bà chỉ đúng tên ngôi chùa.",rf:"Bà chỉ một ngôi chùa đã bỏ hoang."},
  {n:"Hỏi chuyện cũ để thử bà",sc:1,f:"aunt",wx:"biết bà thật hay giả",lx:"bà giận bỏ đi",rt:"Bà kể đúng tên mẹ ngươi lúc nhỏ. Bà là di mẫu thật.",rf:"Bà nói lắp, ngươi không đoán được thật giả."}]},
 c1:{h:"Ra cung thế nào",w:"eun",t:"Phi tần không được tự ý ra cung. Muốn gặp lão quản gia, phải có cớ, hoặc có người đi thay.",o:[
  {n:"Xin đi chùa cầu phúc cho Thái hậu",need:["th"],sc:1,f:"out",wx:"có cớ chính đáng ra cung",lx:"Thái hậu thấy ngươi mượn tên bà",rt:"Thái hậu chuẩn, còn ban hương trầm.",rf:"Thái hậu nói: “Cầu ở Phật đường trong cung là đủ.”"},
  {n:"Sai thái giám tin cẩn đi thay",sc:1,f:"out",wx:"không cần ra cung",lx:"lão không tin người lạ",rt:"Lão nhận chuỗi hạt làm tin, chịu nói chuyện.",rf:"Lão đóng cửa, không gặp."},
  {n:"Viết thư tay, gửi theo người đưa hương ra chùa",sc:1,f:"out",wx:"nét chữ của ngươi đủ để lão tin",lx:"thư lọt ra ngoài, người nhà {v} đọc được",rt:"Lão đọc thư, khóc, rồi gửi lời hẹn gặp người của ngươi.",rf:"Thư bị chặn giữa đường; lão chẳng nhận được gì."}]},
 c2:{h:"Người của nhà {v} quanh chùa",w:"maid",if:A=>!!rv67(A,"v"),need:["v"],t:"Người của ngươi báo: có kẻ lạ ăn mặc như khách hành hương đã thuê phòng trọ đối diện ngôi chùa ba hôm nay.",o:[
  {n:"Báo quan phủ bắt kẻ lạ",sc:1,wx:"đuổi được kẻ rình",lx:"quan phủ nể nhà Thượng thư",go:(A,ok)=>{if(ok)rdOan(A,"v",5)},rt:"Kẻ lạ bị giải đi, khai là gia nhân nhà Thượng thư.",rf:"Quan phủ hỏi qua loa rồi thả."},
  {n:"Đưa lão đi trong đêm",sc:1,f:"moved",wx:"lão thoát vòng rình",lx:"lão ốm, đi đường càng yếu",rt:"Lão được khiêng sang một trang trại nhỏ của di mẫu."}]},
 c3:{h:"Lão quản gia ốm nặng",w:"doc",t:()=>`Lão quản gia ho ra máu. Thầy thuốc trong làng nói lão chỉ còn chừng ${CNT_DL()} tháng nếu không có thuốc tốt.`,o:[
  {n:"Gửi thuốc và bạc",sc:1,f:"cure",wx:"lão gượng được",lx:"bạc của ngươi vơi",rt:"Lão uống thuốc, ngồi dậy được."},
  {n:"Chép phương, nhờ thái y kê",sc:1,f:"cure",wx:"phương thuốc hợp bệnh",lx:"thái y hỏi sao lo cho người ngoài",rt:"Phương mới làm lão bớt ho.",rf:"Thái y không chịu kê cho người ngoài cung."}]},
 t1:{h:"Lão kể",w:"maid",t:"Lão quản gia nói: “Đêm phủ bị niêm, lão gia giao tiểu thư cho ma ma, giao nửa trang sổ cho lão. Lão giữ hai mươi năm, chờ ngày này.”",o:[
  {n:"Xin lão viết lại mọi chuyện",sc:1,f:"words",wx:"có lời chứng của người trong phủ",lx:"lão run tay, chữ không rõ",rt:"Lão viết chín trang, điểm chỉ từng trang.",rf:"Lão viết được nửa thì kiệt sức."},
  {n:"Hỏi lão về mẹ",wx:"biết mẹ là người thế nào",lx:"ngồi nghe đến khuya; chưa hỏi được chuyện sổ",rt:"Lão kể mẹ ngươi hay hát ru bằng giọng Giang Nam."}]},
 x1:{h:"Đưa nửa trang sổ vào cung",w:"maid",t:"Lão trao nửa trang sổ còn lại. Từ chùa vào cung còn qua cổng thành, cổng cung, và mắt nhà {v}.",o:[
  {n:"Giấu trong lễ vật dâng chùa",e:["win","lose"],rt:"Nửa trang sổ vào cung trong bụng một pho tượng gỗ.",rf:"Lễ vật bị soát ở cổng cung. Nửa trang sổ biến mất trong tay thị vệ."},
  {n:"Để lão giữ, đưa lão về nơi kín",e:["win","mid"],rt:"Lão và nửa trang sổ ở yên nơi kín, chỉ ngươi biết.",rf:"Lão phải đổi chỗ ba lần, sổ còn mà lão yếu hẳn."},
  {n:"Bảo lão chép lại, giữ bản gốc ngoài cung",e:"mid",lx:"bản chép không đủ sức nặng",rt:"Lão chép lại từng dòng; bản gốc chôn dưới gốc mai sau chùa."}]}},
 E:{win:{k:1,tag:"Ghép đủ trang sổ",w:"maid",t:"Hai nửa trang sổ khớp nhau từng vết rách. Bạc cứu đê năm ấy chảy về đâu, ghi rõ từng dòng."},
  mid:{k:0,tag:"Lão quản gia còn sống",t:"Lão quản gia còn sống, sổ còn đó. Ngươi có chứng cứ, nhưng chưa nắm trong tay."},
  lose:{k:-1,tag:"Sổ rơi vào tay người",t:"Nửa trang sổ mất ở cổng cung. Không ai nhận đã lấy, nhưng nhà {v} bỗng thôi cho người rình ngôi chùa."}}});

rdDef("cn_than",8,{t:"Kẻ không muốn án lật",w:"emp",sj:"tờ sớ hặc ngươi lật án tiên đế",cast(A){return rdCast(A,["v"],CN_NORECAST)},
 g:"Ngoài triều, một Ngự sử dâng sớ: phi tần trong cung dò sổ Hộ bộ, toan lật án tiên đế đã xử. Tờ sớ không nêu tên, nhưng ai cũng biết là ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng hỏi",w:"emp",need:["nsrv"],if:RDW(1),t:"Hoàng thượng đặt tờ sớ lên bàn trang điểm của ngươi: “Nàng có gì muốn nói với trẫm không?”",o:[
  {n:"Kể hết, dâng trang sổ",sc:1,f:"told",wx:"Hoàng thượng biết từ miệng ngươi",lx:"ngài giận vì ngươi giấu lâu",rt:"Hoàng thượng đọc trang sổ rất lâu, rồi gấp lại: “Để trẫm nghĩ.”",rf:"Hoàng thượng nói: “Nàng giấu trẫm bao lâu rồi?”"},
  {n:"Thưa chỉ muốn biết cha mình là ai",wx:"ngài thương ngươi",lx:"ngài nghĩ ngươi chưa nói hết, ân sủng nguội đi",rt:"Hoàng thượng thở dài: “Ai mà không muốn biết.”"}]},
 s2:{h:"Lời đồn đi trước",w:"maid",if:RDW(0),t:"Chưa ai hỏi ngươi, mà lời đồn đã đi khắp cung: cung nữ được sủng hạnh muốn lật án tiên đế để leo cao.",o:[
  {n:"Đóng cửa, thôi mọi việc dò la",f:"low",wx:"lời đồn không có thêm củi",lx:"đóng cửa như nhận tội, tiếng ngươi sụt; việc tìm sự thật chậm lại",rt:"Ngươi đóng cửa chép kinh nửa tháng."},
  {n:"Tìm gốc lời đồn",sc:1,wx:"biết ai thổi gió",lx:"tìm ra chỉ là cung nữ vô danh",rt:"Lời đồn đi ra từ cung {v}.",rf:"Lời đồn không có đầu."}]},
 c1:{h:"Thái hậu triệu",w:"th",need:["th"],t:"Thái hậu gọi ngươi đến Đức Thọ cung: “Án ấy là tiên đế xử. Ngươi lật, là bảo tiên đế sai.”",o:[
  {n:"Thưa: tiên đế bị kẻ dưới lừa",sc:2,f:"th",wx:"Thái hậu nghe lọt tai",lx:"Thái hậu cho là ngươi khéo miệng",rt:"Thái hậu lặng hồi lâu: “Tiên đế đúng là ghét kẻ nói dối.”",rf:"Thái hậu phẩy tay: “Lui đi.”"},
  {n:"Xin Thái hậu tha tội, không dám lật",wx:"Thái hậu yên lòng",lx:"ngươi tự buộc tay mình, phụ lòng cha ruột",rt:"Thái hậu cho ngươi chén trà sen."}]},
 c2:{h:"Ngự sử dâng sớ",w:"eun",t:"Ngự sử dâng sớ là môn sinh nhà Thượng thư, cha {v}. Ai cũng biết, nhưng không ai nói.",o:[
  {n:"Cho người tìm điểm yếu của Ngự sử",sc:1,f:"dirt",wx:"có cái để buộc miệng hắn",lx:"bị đồn phi tần trả đũa triều thần",rt:"Ngự sử từng nhận đất của nhà Thượng thư. Giấy tờ còn đó.",rf:"Ngự sử thanh bạch, ngươi thành kẻ đi bới móc."},
  {n:"Để mặc, giữ tay sạch",wx:"không ai bắt lỗi ngươi",lx:"tờ sớ cứ thế mà lan, tiếng ngươi sụt",rt:"Ngươi không đáp một lời."}]},
 c3:{h:"{v} đứng về đâu",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} gặp ngươi ở vườn ngự uyển: “Cha ta bảo ta khóc trước Hoàng thượng, nói muội ghen ghét nhà ta.”",o:[
  {n:"Xin nàng ta đừng khóc",sc:1,f:"ally",wx:"{v} đứng ngoài",lx:"{v} vẫn nghe cha, khóc trước Hoàng thượng, ân sủng ngươi nguội",go:(A,ok)=>{rdRel(A,"v",ok?8:-2)},rt:"{v} nhìn hoa rất lâu: “Ta không khóc cho một chuyện ta không làm.”",rf:"{v} nói: “Cha ta là cha ta.”"},
  {n:"Đáp: cứ khóc, ta có sổ",wx:"{v} biết ngươi không sợ",lx:"{v} khóc thật trước Hoàng thượng, ân sủng ngươi nguội",go:A=>{rdOan(A,"v",6)},rt:"{v} tái mặt, quay đi."}]},
 t1:{h:"Một người đồng khoa",w:"eun",t:"Giữa lúc ấy, một lão Ngự sử tóc bạc dâng sớ khác: ông đồng khoa với Thẩm Thị lang, xin xét lại cho rõ.",o:[
  {n:"Lén gửi lời cảm tạ ông",sc:1,f:"friend",wx:"có người ngoài triều",lx:"bị bắt gặp thì ông mang tiếng kết bè",rt:"Ông gửi lại một câu: “Cha cháu là người tốt.”"},
  {n:"Không liên lạc, để ông tự đứng",wx:"ông không bị vạ lây",lx:"ông đứng một mình, ngoài triều ít người nói cho ngươi",rt:"Lão Ngự sử một mình đối đáp cả triều."}]},
 x1:{h:"Trước ngự án",w:"emp",t:"Hoàng thượng gọi cả hai bên vào Dưỡng tâm điện. Tờ sớ hặc ngươi nằm một bên ngự án; trang sổ nằm bên kia.",o:[
  {n:"Dâng trang sổ ở Ngự thư phòng, xin ngài tự đọc",e:["win","lose"],rt:"Hoàng thượng phê: tờ sớ hặc phi tần bị bác, trang sổ giao Đại Lý tự.",rf:"Hoàng thượng phê: hậu cung không được xen việc triều. Trang sổ bị giữ lại."},
  {n:"Xin chỉ một điều: được giữ trang sổ",e:["win","mid"],rt:"Hoàng thượng cho ngươi giữ sổ, tờ sớ lặng lẽ rút đi.",rf:"Hoàng thượng cho giữ sổ, nhưng tờ sớ vẫn nằm đó."},
  {n:"Xin nhận lỗi, thôi dò án",e:"mid",lx:"án cũ tạm khép",rt:"Hoàng thượng gật đầu, dặn ngươi nghỉ ngơi."}]}},
 E:{win:{k:1,tag:"Tờ sớ bị bác",w:"emp",t:"Tờ sớ hặc ngươi bị bác. Ngự sử dâng sớ bị điều ra ngoài, còn trang sổ đi đến tay người có quyền xét."},
  mid:{k:0,tag:"Gió tạm lặng",t:"Không ai thắng. Tờ sớ còn, trang sổ còn. Ngoài triều, người ta chờ xem ai mỏi trước."},
  lose:{k:-1,tag:"Bị cấm xen việc triều",t:"Hoàng thượng cấm ngươi xen việc triều. Trang sổ bị giữ ở ngự thư phòng, còn nhà {v} mở tiệc."}}});

rdDef("cn_than",9,{t:"Nhận hay không",w:"emp",sj:"việc ngươi nhận họ Thẩm",cast(A){rdCast(A,["v"],CN_NORECAST);return true},
 g:()=>(CNT4W()?"Họ Thẩm đã nhận lại ngươi, nhưng tên ngươi vẫn chưa vào tông phả và sổ cung vẫn ghi xuất thân cũ. ":"")+"Nhận họ Thẩm thì cả triều nhìn ngươi như con một nhà bị oan, mà cũng như cái gai trong mắt nhà Thượng thư. Giữ thân phận cũ thì an, mà cha ruột mãi không có ai thắp hương.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Đại Lý tự đã đọc",w:"emp",if:RDW(1),t:"Đại Lý tự tâu: trang sổ là thật. Hoàng thượng hỏi ngươi: “Nàng muốn trẫm xử thế nào?”",o:[
  {n:"Xin xét cho công bằng, không xin gì riêng",wx:"Hoàng thượng nể",lx:"ngài không hứa gì; người ngoài cho là ngươi chẳng có chỗ đứng",rt:"Hoàng thượng gật đầu: “Nàng khác người ta nghĩ.”"},
  {n:"Xin cho được thờ cha ruột",need:["nsrv"],sc:1,f:"rite",wx:"có chỗ thắp hương cha",lx:"ngài chưa đáp",rt:"Hoàng thượng cho ngươi lập bài vị trong Phật đường cung mình.",rf:"Hoàng thượng nói: “Chờ án xong đã.”"}]},
 s2:{h:"Người ta khuyên",w:"maid",if:RDW(0),t:"Người hầu thân tín quỳ khuyên: “{Xung} đã có ân sủng, có cung riêng. Họ Thẩm cho được gì mà phải liều?”",o:[
  {n:"Nghe khuyên, nghĩ lại",f:"calm",wx:"lòng bớt nóng",lx:"người hầu nghĩ ngươi đã nản, lòng ngươi thẹn với cha",rt:"Ngươi ngồi một mình đến khuya."},
  {n:"Đáp: không vì được gì, vì cha",sc:1,wx:"người hầu càng tin ngươi",lx:"đường liều không lùi được, ngươi mất ngủ nhiều đêm",rt:"Người hầu lau nước mắt, đứng dậy."}]},
 c1:{h:"Tông phả họ Thẩm",w:"eun",t:"Muốn nhận họ, phải có tông phả. Tông phả họ Thẩm bị niêm cùng phủ cũ, nay nằm trong kho Lễ bộ.",o:[
  {n:"Xin Lễ bộ cho xem",sc:1,f:"book",wx:"tên ngươi có trong tông phả",lx:"Lễ bộ đẩy qua đẩy lại",rt:"Dòng cuối tông phả: “Nữ, sinh tháng chạp, chưa đặt tên.”",rf:"Lễ bộ nói kho bị ẩm, sổ hỏng."},
  {n:"Nhờ lão quản gia làm chứng thay",sc:1,wx:"có người trong phủ nhận ngươi",lx:"lời một lão bộc không đủ, bị chê dựa vào kẻ hầu",rt:"Lão quản gia viết rõ ngày giờ ngươi sinh.",rf:"Lão quản gia đã quá yếu để viết."}]},
 c2:{h:"Nhà nuôi ngươi",w:"maid",t:"Cha mẹ nuôi ngoài quê gửi thư run run: nghe nói con nhận họ khác, con còn nhận cha mẹ này không?",o:[
  {n:"Hồi thư: ơn nuôi không bao giờ quên",wx:"nhà nuôi yên lòng",lx:"người ta bảo ngươi hai lòng hai họ",rt:"Mẹ nuôi gửi lại một đôi hài vải."},
  {n:"Chưa hồi thư, để sau",wx:"chưa phải chọn",lx:"nhà nuôi buồn, ngươi mang tiếng bạc tình",rt:"Lá thư nằm trong hộc bàn."}]},
 c3:{h:"Lời của nhà Thượng thư",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} mang lời cha nàng ta: nếu ngươi không nhận họ, nhà ấy trả phủ cũ, lập miếu cho Thẩm Thị lang, coi như xong.",o:[
  {n:"Nhận lời, đổi lấy miếu thờ",wx:"cha có miếu thờ",lx:"không bao giờ mang được họ Thẩm; người biết chuyện chê ngươi bán họ",f:"deal",go:A=>{rdRel(A,"v",8);CN_FL("cn_than.deal",1)},rt:"{v} thở ra: “Muội khôn ngoan.”"},
  {n:"Từ chối",sc:1,wx:"giữ trọn đường nhận họ",lx:"nhà ấy thôi nhân nhượng, bổng lộc cung ngươi lại bị khất",go:A=>{rdOan(A,"v",6);return CN_PAY(S,BAL.road.cn_than.phat,"Nội vụ phủ")},rt:"{v} lắc đầu bỏ về."}]},
 t1:{h:"Miếng ngọc",w:"maid",t:"Ngươi lấy miếng ngọc chữ ‘Thẩm’ ra, ngắm dưới đèn. Đeo ra ngoài hay cất vào tráp?",o:[
  {n:"Đeo ra ngoài, không giấu nữa",sc:1,f:"jade",wx:"ai cũng thấy ngươi chọn",lx:"không còn đường lui; người ta xì xào trước mặt Hoàng thượng",rt:"Miếng ngọc đong đưa trên ngực áo khi ngươi đi qua sân."},
  {n:"Cất vào tráp, chờ chiếu",wx:"chưa ai bắt bẻ được",lx:"người ta nghĩ ngươi còn sợ, tiếng ngươi sụt",rt:"Tráp khóa lại, chìa đeo trên cổ."}]},
 x1:{h:"Ngày quyết",w:"emp",t:()=>CNT4W()?"Hoàng thượng hỏi lần cuối: “Nàng muốn ghi tên vào tông phả họ Thẩm, hay giữ tên trong sổ cung như cũ?”":"Hoàng thượng hỏi lần cuối: “Nàng muốn mang họ Thẩm, hay giữ thân phận đã có?”",o:[
  {n:"Xin mang họ Thẩm",if:A=>!A.f.deal,e:["win","lose"],rt:"Hoàng thượng chuẩn: tên ngươi được ghi vào tông phả họ Thẩm.",rf:"Hoàng thượng nói: “Chờ án xong. Bây giờ chưa phải lúc.” Cả cung cho là ngài từ chối."},
  {n:"Xin chỉ được thờ cha, chưa đổi họ",e:["win","mid"],rt:"Hoàng thượng cho lập bài vị Thẩm Thị lang ở chùa trong cung.",rf:"Hoàng thượng chưa chuẩn, chỉ an ủi."},
  {n:"Giữ thân phận đã có",e:"mid",lx:"họ Thẩm không người nối",rt:"Ngươi cúi đầu. Hoàng thượng nắm tay ngươi, không nói gì."}]}},
 E:{win:{k:1,tag:"Tên ghi vào tông phả",w:"emp",t:"Tên ngươi được ghi vào dòng cuối tông phả họ Thẩm. Ngươi là con gái nhà quan, không ai còn gọi ngươi là con bé bưng trà."},
  mid:{k:0,tag:"Thân phận cũ, lòng mới",t:"Ngươi giữ thân phận cũ, nhưng trong lòng đã biết mình là ai."},
  lose:{k:-1,tag:"Chưa được nhận",t:"Việc nhận họ bị gác lại. Người ta bảo ngươi đã quá tham, và nhà Thượng thư nắm lấy cớ ấy."}}});

rdDef("cn_than",10,{t:"Minh oan cho cha ruột",w:"emp",sj:"tờ trình minh oan cho Thẩm Thị lang",cast(A){rdCast(A,["v"],CN_NORECAST);return true},/* review road-b1-fixa-r1: .10/.11 run without {v} (her beats are guarded; texts name the Thượng thư house) — the road never skips its last chapters */
 g:()=>(CNT4F()?"Cha ruột ngươi đã được rửa oan, nhưng kẻ vu ông chưa bị gọi tên. ":"")+"Có chỉ của Hoàng thượng, Đại Lý tự mở lại án bạc cứu đê. Đây không còn là chuyện của một mình ngươi: lật án này là gọi tên một lão Thái phó và cả nhà Thượng thư.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Đại Lý tự gọi chứng",w:"eun",if:RDW(1),t:"Đại Lý tự cần lão quản gia làm chứng. Lão yếu lắm rồi, đường vào kinh xa.",o:[
  {n:"Cho kiệu đón lão vào kinh",sc:1,f:"wit",wx:"nhân chứng đến kịp",lx:"đường xa làm lão kiệt sức",rt:"Lão quản gia vào kinh, quỳ trước Đại Lý tự mà không cần ai đỡ."},
  {n:"Xin Đại Lý tự đến lấy lời tại chỗ",sc:1,f:"wit",wx:"lão khỏi đi đường",lx:"Đại Lý tự không muốn phiền",rt:"Một quan Đại Lý tự đến tận trang trại lấy lời.",rf:"Đại Lý tự nói chứng phải đến tận nơi."}]},
 s2:{h:"Án mở mà không ai đẩy",w:"eun",if:RDW(0),t:"Án được nhận, rồi nằm yên. Đại Lý tự bảo đợi, đợi mãi không thấy ngày xét.",o:[
  {n:"Nhờ lão Ngự sử đồng khoa thúc",sc:1,f:"friend",wx:"có người thúc ngoài triều",lx:"ông bị nhà Thượng thư làm khó",rt:"Lão Ngự sử dâng sớ, án được xếp ngày xét.",rf:"Lão Ngự sử bị điều đi coi kho sách."},
  {n:"Đợi, không thúc",wx:"không ai bảo ngươi nóng vội",lx:"đếm ngày đến hao người; chứng cứ có thể mất",rt:"Ngươi đếm từng tuần trăng."}]},
 c1:{h:"Sổ gốc Hộ bộ",w:"eun",t:"Đại Lý tự đòi sổ gốc Hộ bộ năm lũ. Hộ bộ nói sổ đã mất trong vụ cháy kho mười năm trước.",o:[
  {n:"Tìm bản sao ở phủ huyện ven đê",sc:1,f:"copy",wx:"có bản sao đối chiếu",lx:"bản sao cũng bị sửa",rt:"Huyện ven đê còn giữ bản sao, khớp với trang sổ của ngươi.",rf:"Bản sao đã bị cạo sửa từ lâu."},
  {n:"Tâu rằng vụ cháy là có ý",sc:1,wx:"Đại Lý tự tra vụ cháy",lx:"bị cho là nói càn",rt:"Đại Lý tự tra ra người giữ kho năm ấy là gia nhân nhà Thượng thư.",rf:"Không ai tin, chỉ cười."}]},
 c2:{h:"Lão Thái phó lên tiếng",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"Lão Thái phó, ông nội {v}, chống gậy vào triều: “Lão phu làm quan bốn mươi năm, chẳng lẽ thua một trang giấy rách?”",o:[
  {n:"Xin cho lão quản gia đối mặt",sc:1,f:"face",wx:"lão Thái phó lúng túng",lx:"lão quản gia run sợ",go:A=>{rdOan(A,"v",6)},rt:"Lão quản gia nhắc một đêm năm xưa, lão Thái phó đánh rơi gậy.",rf:"Lão quản gia cúi đầu không dám nhìn."},
  {n:"Gửi lời qua {v}: xin lão tự thú",sc:1,wx:"có thể kết êm",lx:"lão Thái phó cười khẩy, kể khắp triều ngươi van xin",go:(A,ok)=>{rdRel(A,"v",ok?6:-2)},rt:"{v} khóc, mang lời về. Lão Thái phó im lặng cả đêm.",rf:"Lão Thái phó đuổi người đưa tin."}]},
 c3:{h:()=>`${CN_Q()} hỏi han`,w:"hh",need:["hh"],t:()=>`${CN_Q()} gọi ngươi: “Án ngoài triều kéo vào hậu cung, lục cung không yên. {Xung} định khi nào thôi?”`,o:[
  {need:["hh"],n:"Thưa: xin Hoàng hậu thêm thời gian",sc:1,wx:"Hoàng hậu đứng ngoài",lx:"Hoàng hậu cho là ngươi gây rối",rt:"Hoàng hậu gật: “Bản cung không xen vào.”",rf:"Hoàng hậu nói: “Bản cung đã nhắc rồi.”"},
  {need:["hh"],n:"Hứa giữ hậu cung yên",wx:"Hoàng hậu yên tâm",lx:"ngươi phải nhịn mọi lời khiêu khích",rt:"Ngươi đóng cửa, không gặp ai ngoài người của án."}]},
 t1:{h:"Đêm trước ngày xét",w:"maid",t:"Đêm trước ngày Đại Lý tự xét, lão quản gia lên cơn ho. Lão nói: “Tiểu thư, lão chỉ còn sức nói một lần.”",o:[
  {n:"Ngồi bên lão cả đêm",sc:1,wx:"lão giữ được sức",lx:"ngươi mệt rã",rt:"Sáng ra lão uống được bát cháo."},
  {n:"Bảo lão nói trước, ghi lại phòng khi",sc:1,f:"rec",wx:"lời lão không mất",lx:"lão mất sức trước giờ xét, ngươi áy náy vì ép lão",rt:"Lời lão chép kín ba trang giấy."}]},
 x1:{h:"Đại Lý tự xét",w:"emp",t:"Đại Lý tự mở phiên xét. Một bên là lão Thái phó bốn mươi năm làm quan; bên kia là trang sổ rách và lão quản gia. Ngươi ở trong cung chờ tin; lời ngươi đã theo tờ trình của nhà họ Thẩm lên tận ngự án.",o:[
  {n:"Xin xét đến cùng, gọi tên kẻ tham",e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Đại Lý tự tâu, Hoàng thượng phê: Thẩm Thị lang bị vu; lão Thái phó bị tước hàm, nhà Thượng thư phải nộp lại bạc cứu đê.",rf:"Đại Lý tự tâu, Hoàng thượng phê: chứng cứ không đủ, án cũ giữ nguyên."},
  {n:"Chỉ xin rửa oan cho cha",e:["win","mid"],rt:"Đại Lý tự tâu, Hoàng thượng phê: Thẩm Thị lang vô tội, được truy phục chức.",rf:"Đại Lý tự tâu, Hoàng thượng phê: Thẩm Thị lang được tha tội, nhưng không ai bị gọi tên."},
  {n:"Rút đơn để giữ mạng lão quản gia",e:"mid",lx:"án dừng giữa chừng",go:A=>{rdRel(A,"v",5)},rt:"Ngươi rút đơn. Lão quản gia được về quê nằm nghỉ."}]}},
 E:{win:{k:1,tag:"Cha ruột được minh oan",w:"emp",t:"Thẩm Thị lang được minh oan trước cả triều. Lão Thái phó tóc bạc lặng lẽ rời kinh; nhà Thượng thư mất nửa thế."},
  mid:{k:0,tag:"Oan được gỡ một nửa",t:"Cha ruột ngươi được tha tội, mà kẻ hại ông vẫn chưa bị gọi tên."},
  lose:{k:-1,tag:"Án cũ giữ nguyên",t:"Án giữ nguyên. Nhà Thượng thư mở tiệc, còn ngươi ngồi bên lão quản gia đang ho từng cơn."}}});

rdDef("cn_than",11,{t:"Họ thật",w:"emp",sj:"họ Thẩm sau cùng",cast(A){rdCast(A,["v"],CN_NORECAST);return true},
 g:"Mọi việc đi đến cuối. Họ Thẩm có trở lại được với đầy đủ danh phận, hay chỉ lặng lẽ sống trong lòng ngươi? Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Phủ cũ mở cửa",w:"maid",if:RDW(1),t:"Phủ cũ họ Thẩm được trả. Cỏ mọc cao ngang gối, bức hoành phi còn treo lệch trên cửa chính.",o:[
  {n:"Bỏ bạc tu sửa phủ",sc:1,f:"house",wx:"phủ cũ sáng lại",lx:"bạc của ngươi cạn",rt:"Ba tháng sau, phủ có lại tiếng người."},
  {n:"Giữ nguyên, chỉ dựng lại từ đường",f:"shrine",wx:"cha mẹ có chỗ thờ",lx:"phủ vẫn hoang",rt:"Từ đường nhỏ dựng lên giữa vườn cỏ."}]},
 s2:{h:"Phủ cũ vẫn trong tay người",w:"maid",if:RDW(0),t:"Phủ cũ họ Thẩm vẫn mang biển nhà khác. Ngươi đứng ngoài nhìn vào qua lỗ cửa kiệu.",o:[
  {n:"Bỏ bạc chuộc lại",sc:1,f:"house",wx:"phủ về tay họ Thẩm",lx:"chủ mới không bán",rt:"Chủ mới chịu bán, giá cao mà thật.",rf:"Chủ mới đóng cửa không tiếp."},
  {n:"Lập bài vị ở chùa ngoài kinh",f:"shrine",wx:"cha mẹ có chỗ thờ",lx:"không phải nhà mình",rt:"Bài vị cha mẹ đặt cạnh tượng Phật nơi lão quản gia từng trốn."}]},
 c1:{h:"Lão quản gia",w:"maid",t:"Lão quản gia đã yếu lắm. Lão xin được chết trong phủ họ Thẩm, nơi lão sống nửa đời.",o:[
  {n:"Đưa lão về phủ cũ",sc:1,f:"old",wx:"lão ra đi yên lòng",lx:"tốn bạc, lại để lộ nơi lão ở",rt:"Lão nằm trong gian nhà cũ, nhìn mái ngói mà cười."},
  {n:"Đưa lão về quê nghỉ",wx:"lão được yên",lx:"lão buồn vì không về được phủ",rt:"Lão vái về phía kinh thành rồi lên xe."}]},
 c2:{h:"{v} sau cơn bão",w:"v",if:A=>!!rv67(A,"v"),need:["v"],t:"{v} gầy đi nhiều. Nàng ta đến cung ngươi, không mang quà: “Nhà ta nợ nhà muội. Muội muốn ta làm gì?”",o:[
  {n:"Tha cho nàng ta, coi như hết",wx:"lòng nhẹ, có thể có thêm một người tri kỷ",lx:"người khác cho là ngươi mềm, mất chút uy",go:A=>{rdRel(A,"v",12)},rt:"{v} khóc, lần đầu không giấu mặt."},
  {n:"Đòi nàng ta quỳ tạ trước bài vị cha",sc:1,wx:"cha được người nhà kẻ hại cúi đầu",lx:"bị chê thù dai",go:A=>{rdOan(A,"v",10)},rt:"{v} quỳ, dập đầu ba lần trước bài vị.",rf:"{v} đứng dậy bỏ đi: “Ta không quỳ.”"}]},
 c3:{h:"Thái hậu gọi",w:"th",need:["th"],t:"Thái hậu gọi ngươi đến: “Tiên đế xử oan một người tốt. Ai gia phải nói một lời.”",o:[
  {n:"Xin Thái hậu một lời cho cha",sc:2,f:"th",wx:"có lời của Đức Thọ cung",lx:"Thái hậu thấy ngươi đòi nhiều",rt:"Thái hậu nói trước mặt mệnh phụ: “Thẩm Thị lang là trung thần.”",rf:"Thái hậu nói: “Ai gia nhớ rồi.” Rồi thôi."},
  {n:"Thưa không dám để Thái hậu phiền",wx:"Thái hậu thương ngươi biết điều",lx:"không có lời của Thái hậu, họ Thẩm thiếu một tiếng nói",rt:"Thái hậu xoa đầu ngươi như cháu gái."}]},
 t1:{h:"Mộ mẹ",w:"maid",t:"Lão quản gia nói nơi mẹ ngươi nằm: một gò đất không bia ở ngoài đất lưu đày năm xưa.",o:[
  {n:"Xin dời mộ mẹ về quê nội",sc:1,f:"mom",wx:"cha mẹ được nằm cạnh nhau",lx:"tốn bạc và công",rt:"Mộ mẹ được dời về, đặt cạnh mộ gió của cha."},
  {n:"Dựng bia ở nơi cũ",wx:"mẹ có tên trên bia",lx:"mẹ vẫn nằm xa",rt:"Tấm bia khắc: “Thẩm môn phu nhân.”"}]},
 x1:{h:"Ngày tế",w:"emp",t:"Ngày tế cha mẹ ruột. Hoàng thượng hỏi: “Nàng muốn trẫm ban gì cho họ Thẩm?”",o:[
  {n:"Xin truy phong tước cho cha, ghi họ Thẩm vào sổ quan",if:()=>!CN_FL("cn_than.deal"),e:["win","lose"],rt:"Hoàng thượng truy phong Thẩm Thị lang, cho họ Thẩm lại có tên trong sổ quan.",rf:"Hoàng thượng nói tước truy phong cần triều nghị. Triều nghị bác."},
  {n:"Xin chỉ một tấm biển cho từ đường",wx:"từ đường có biển ngự ban",e:["mid","lose"],rt:"Hoàng thượng ban biển “Trung thần chi gia” treo ở từ đường.",rf:"Hoàng thượng nói chưa phải lúc, triều đang bàn án khác."},
  {n:"Không xin gì, chỉ thắp hương",e:"mid",lx:"họ Thẩm không có danh phận mới",rt:"Ngươi thắp ba nén hương, không xin gì thêm."}]}},
 E:{win:{k:1,tag:"Họ Thẩm trở lại",w:"emp",t:"Thẩm Thị lang được truy phong, họ Thẩm có lại tên trong sổ quan. Người từng bưng trà nay là con gái một nhà trung thần, và cả cung biết điều ấy."},
  mid:{k:0,tag:"Lặng lẽ mang họ Thẩm",t:"Không có tước mới, không có tiệc. Chỉ có một từ đường nhỏ, ba nén hương mỗi năm, và ngươi biết mình là ai."},
  lose:{k:-1,tag:"Họ Thẩm không được nhận",t:"Triều đình gác lại. Họ Thẩm vẫn chỉ là cái tên trong lòng ngươi; người ta lại gọi ngươi là cung nữ được sủng hạnh."}}});
RD97L.push(rdRare({a:"cn_than_11",tag:"Cố nhân của cha thành chỗ dựa",w:"emp",n:"Mời lão Ngự sử đồng khoa của cha đến dự lễ tế",
 path:["Đọc kỹ, tìm chữ giấu","Đem so dấu triện","Bày bẫy","Nhờ người trong Hộ bộ","Gửi thuốc, không để tên","Chép phương","Xin lão viết lại","Thưa: tiên đế bị kẻ dưới lừa","Lén gửi lời cảm tạ ông","Nhờ lão Ngự sử đồng khoa thúc","Tìm bản sao","Xin Thái hậu một lời"],
 bad:["Bán cả bọc","Nhận lời, đổi lấy miếu thờ","Xin nhận lỗi, thôi dò án","Rút đơn"],x:[()=>S.danh>=RR("cn_than_11").bar,"Danh từ "+RR("cn_than_11").bar],
 t:"Lão Ngự sử tóc bạc, người đồng khoa với cha ngươi, quỳ trước bài vị Thẩm Thị lang mà khóc: “Hai mươi năm ta không dám nói một lời.” Từ hôm ấy, ông nhận ngươi làm cháu, đem cả nhóm môn sinh cũ của cha ngươi đứng sau lưng ngươi. Ngoài triều, mỗi khi có kẻ nhắc đến xuất thân của ngươi, đều có người đứng dậy đáp thay.",rw:"ngocboi",ti:"Con gái nhà trung thần"}));

