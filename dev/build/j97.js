/* ================= j97 KẾT HIẾM · CƠ DUYÊN HIẾM (owner 11/14) =================
   Mỗi tuyến Mệnh truyện của ARC67 (36 xuất thân + 8 chung + 3 giữa đời) có một KẾT HIẾM. Bọc j67, không sửa j67.
   Mở thế nào: khi hồi cao trào (ô "x" của tuyến) được ra, nếu đủ ĐIỀU KIỆN ẨN thì gieo MỘT lần xác suất nhỏ (R97CFG.p × def.p, 5–15 %).
     Điều kiện ẩn = chuỗi lựa chọn trong các hồi trước (path: chọn đúng hướng ít nhất np lần; bad: chọn ngược hướng một lần là mất)
                    + Lợi thế (A.sc) + một điều kiện về số đo / quan hệ / vật phẩm / con cái (x).
     Gieo trúng: hồi cao trào có thêm một lựa chọn "✦ … · Cơ duyên hiếm" viền sáng (kit .ksel); chỉ hiện chi phí, không hiện kết quả.
     Kết quả gieo lưu trên tuyến (A.r97), ghi sổ lại không gieo lại.
   Kết hiếm: kết cục thắng (E.k=1) riêng của tuyến (ARC67[id].E.r97) + phần thưởng hiếm: một món Ngự tứ (không bán, không tặng) + danh hiệu kiếp này.
   Sổ luân hồi: localStorage "ctm-rare97" ghi các kết hiếm đã gặp qua các kiếp, hiện "x/y kết hiếm đã gặp". Chỉ để nhớ: không mang lợi thế gì sang kiếp sau.
   Móc cho mô-đun khác (j96 tuyến tình): RARE97.add(id,{t:tuyến,tag:kết}) đăng ký thêm một kết hiếm vào sổ; RARE97.meet(id,tag) ghi đã gặp.
   Danh mục đầy đủ (tuyến, điều kiện, xác suất, kết quả): dev/RARE_ENDINGS.md. */
const R97CFG={p:.9};            /* núm chung nhân vào xác suất của từng kết hiếm (đo bằng bot: dev/PROGRESS_story_rare.md) */
const R97={};                  /* arc id → định nghĩa kết hiếm */
const R97X={};                 /* kết hiếm của mô-đun khác (j96…): id → {t,tag} */
/* phần thưởng Ngự tứ: cùng khóa với kho trang phục j92 (review/wardrobe); ở đây đăng ký nếu chưa có, j92 về sau ghi đè tên/ô mặc */
[["nt_nhuy","Trâm ngọc như ý ngự tứ"],["nt_haiduong","Bộ diêu «Hải đường xuân thụy» ngự tứ"],["nt_dongchau","Trâm đông châu ngự tứ"]].forEach(([k,n])=>{const w=BAL.arc.ntItem[k];/* ONE CORE: the wear gain lives in jbalarc.js */
 if(!IT[k])IT[k]={n,kd:"Trang sức",d:`Cài tóc: ${fmt(w).replace(/<[^>]+>/g,"")} · Ngự tứ: chỉ có khi được ban, không bán, không tặng`,pr:0,rk:0,sl:"hair",w,keep:1,nt:1,tg:[]}});
["ngocboi","bienngu"].forEach(k=>{if(IT[k])IT[k].nt=1});
const R97NT=["nt_nhuy","nt_haiduong","nt_dongchau","ngocboi","bienngu"];
/* ---------- helpers for conditions and effects ---------- */
function r97v(A,k){try{return rv67(A,k||"v")}catch(e){return null}}
function r97vRel(A,k){const v=r97v(A,k);return v?(v.rel||0):-99}
function r97has(k){return (S.inv||[]).some(e=>e&&e.k===k&&!e.h)}
function r97allies(n){try{return liveRivals(true).filter(v=>(v.rel||0)>=n).length}catch(e){return 0}}
function r97art(k){return (S.arts&&S.arts[k])||0}
function r97srv(){return typeof isSrv==="function"&&isSrv()}
function r97son(){try{return son67()}catch(e){return null}}
function r97give(k,giver){if(!IT[k])return"";S.inv=S.inv||[];S.inv.push({k,from:"rare",own:"me",giver:giver||"Hoàng thượng",d:S.turn,nt:1});return itm(k).n}
function r97srvRk(n){try{if(S.srv&&!S.srv.risen){const old=S.srv.rk||0;S.srv.rk=Math.max(old,Math.min(BAL.srvRk.nq,n));if(S.srv.rk>old)return `Ngươi được thăng ${SRK.maid[S.srv.rk]}.`}}catch(e){}return""}
function r97rise(why){try{if(S.srv&&!S.srv.risen&&typeof srvRise==="function"){srvRise(why);return "Ngươi được phong Đáp ứng."}}catch(e){console.error(e)}return""}
/* ---------- the catalogue: one rare ending per arc ----------
   a: arc · tag: tên kết · t: lời kể · w: ai hiện mặt · p: xác suất khi đủ điều kiện · n: lựa chọn ở hồi cuối · c: chi phí (chỉ chi phí được hiện)
   path/np/bad: chuỗi lựa chọn (khớp chữ trong tên lựa chọn) · sc: Lợi thế tối thiểu · x: [điều kiện, lời mô tả] · fx: thay đổi · go: hệ quả thêm
   rw: món Ngự tứ · ti: danh hiệu kiếp này · exit: [nút đi, nút ở, tiêu đề, lời, số phận] khi kết hiếm cho phép rời cung */
const AR=a=>BAL.arc.rare[a];
const R97L=[
/* ===== Tể tướng ===== */
{a:"tt_co",tag:"Người cầm ấn phủ Tể tướng",w:"dad",n:"Xin cha giao sổ môn sinh vào tay ngươi",
 path:["Nhắc tên người khác","mua chuộc nàng","Báo cho {v} đề phòng","Tự đến xin Hoàng hậu","Đưa tin giả cho cha","Tự đứng vững"],bad:["Làm theo lời cha","Nhận, để cha yên tâm","Liếc trộm","Bỏ bạc lo lót"],x:[()=>S.tamco>=AR("tt_co").bar,`Tâm cơ từ ${AR("tt_co").bar}`],
 t:"Đêm ấy {dad} lặng nhìn ngươi rất lâu, rồi tự tay đặt cuốn sổ môn sinh lên bàn: “Cha già rồi. Từ nay phủ Tể tướng nghe con.” Ông dâng sớ cáo lão, về quê được ban ngựa xe vinh hiển; người trong triều ai muốn tiến thân đều phải gõ cửa cung ngươi.",
 go:(_A,_ok,G)=>e67dad(G[0]),rw:"nt_nhuy",ti:"Chủ ấn phủ Tể tướng"},
{a:"tt_oan",tag:"Ngự bút minh oan, cha lên Thái sư",w:"emp",n:"Dâng kèm nét chữ thật của kẻ làm sổ giả",
 path:["Lặng lẽ cho người dò sổ","giữ hắn làm chứng","Tự đối chiếu nét chữ","Nhờ Hàn lâm viện","Gom đủ chứng cứ"],bad:["Giữ khoảng cách với phủ","Đốt thư","Gặp riêng {v}, đề nghị dàn xếp"],x:[()=>S.duc>=AR("tt_oan").bar,`Đức từ ${AR("tt_oan").bar}`],
 t:"Giữa triều, nét chữ trong sổ giả khớp từng nét với thư tay của viên thị lang Hộ bộ. Hoàng thượng đập án, sai trói hắn tại chỗ. Ba hôm sau, tấm biển ngự bút treo trước phủ, cha ngươi được phong Thái sư. Ngài nói: “Nhà này sinh được một đứa con gái hơn mười đứa con trai.”",
 go:(_A,_ok,G)=>e67dad(G[0]),rw:"bienngu",ti:"Hiếu nữ phủ Thái sư"},
{a:"tt_tranh",tag:"Huynh trưởng quỳ trước cửa cung",w:"dad",n:"Mời cha và huynh cùng vào cung, ngồi chung một mâm",
 path:["Viết thư hỏi thẳng huynh","hai phần lễ ngang nhau","Khuyên cha chia cho êm","Gửi quà giữ chân","Âm thầm trả nợ cho huynh","Xin Hoàng thượng thăng"],bad:["Lặng lẽ kết thân với {v}","Để sớ đi","Để huynh chịu phạt"],x:[()=>S.duc>=AR("tt_tranh").bar,`Đức từ ${AR("tt_tranh").bar}`],
 t:"Mâm cơm trong cung ngươi đêm ấy chỉ có ba người. Đến tuần rượu thứ ba, huynh trưởng đứng dậy, quỳ xuống trước ngươi và cha: “Muội gánh cả nhà, huynh lại đi đặt cược vào người ngoài.” Từ đó cả họ chỉ có một phe, và người cầm cờ là ngươi.",
 go:(_A,_ok,G)=>e67dad(G[0]),rw:"nt_haiduong",ti:"Người giữ lửa họ ngoại"},
{a:"tt_mat",tag:"Hoàng hậu trao ấn phượng",w:"hh",need:"hh",n:"Đến Càn Ninh cung một mình, nói chuyện như tỷ muội",
 path:["Đọc kỹ, chép lại","Nhận lễ, lựa lời dò ý","Hỏi thẳng cha","Chép kinh tận tâm","Kéo {v} làm đồng minh","Gặp Hoàng hậu nói chuyện"],bad:["Cảnh cáo {v}","Chép qua loa"],x:[()=>(S.hh||0)>=AR("tt_mat").bar,`Hoàng hậu với ngươi từ ${AR("tt_mat").bar}`],
 t:"Hoàng hậu đốt tờ mật ước trước mặt ngươi: “Cha muội và bổn cung đều tính thiệt hơn. Chỉ muội là đến đây tay không.” Bà xin Hoàng thượng cho ngươi hiệp lý lục cung, nắm sổ sách Nội vụ phủ cùng bà. Cả hậu cung hiểu: ai muốn qua Trung cung phải qua ngươi.",
 rw:"nt_dongchau",ti:"Hiệp lý lục cung"},
/* ===== Đại tướng quân ===== */
{a:"dtq_bien",tag:"Bia Nhạn Môn khắc tên ngươi",w:"emp",n:"Xin ra Phụng Tiên điện quỳ tụng kinh suốt ba đêm trận",
 path:["Bán trang sức góp quân lương","Tự may áo rét","Gửi Thái y giỏi nhất","Cầu an cho cha","Báo ngay cho cha","Tìm chứng cứ Binh bộ"],bad:["Đốt thư, coi như không thấy"],x:[()=>S.sung>=AR("dtq_bien").bar,`Sủng từ ${AR("dtq_bien").bar}`],
 t:"Tin thắng trận về kinh cùng một tấm bia: tướng sĩ Nhạn Môn khắc tên ngươi bên tên cha, vì những tấm áo rét và thuốc men ngươi gửi ra ải. Hoàng thượng đứng trước bia rất lâu, rồi ban cho ngươi phong hiệu “Trung Liệt”. Từ đó trong quân, nhắc đến ngươi ai cũng đứng thẳng lưng.",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"ngocboi",ti:"Phong hiệu Trung Liệt"},
{a:"dtq_vu",tag:"Đan thư thiết khoán",w:"emp",n:"Dẫn kẻ khắc ấn giả vào ngay giữa phiên xử",
 path:["Xin xem kỹ nét chữ","Cho người giữ mạng hắn","Tìm thợ khắc ấn","Xin Hoàng thượng so ấn","Để nàng chép, theo dõi","Gom hết chứng cứ"],bad:["Quỳ thề lấy mạng","Mặc kệ","Đe {v}"],x:[()=>S.tamco>=AR("dtq_vu").bar,`Tâm cơ từ ${AR("dtq_vu").bar}`],
 t:"Lão thợ khắc ấn run rẩy chỉ tay vào kẻ đã thuê hắn. Cả triều lặng ngắt. Hoàng thượng ban cho nhà ngươi một tấm đan thư thiết khoán: con cháu họ ngươi đời đời được miễn tội chết một lần. Cha ngươi khóc như trẻ nhỏ trước ngự án.",
 go:(_A,_ok,G)=>e67dad(G[0]),rw:"bienngu",ti:"Nhà có đan thư thiết khoán"},
{a:"dtq_binh",tag:"Người giữ nửa binh phù",w:"emp",n:"Xin ngài cho cha và vua cùng giữ một nửa binh phù",
 path:["Đáp: cha chỉ giữ hộ","Thưa thật: cha già rồi","Dò xem ai khuyên ngài","Hồi thư khuyên cha tự lui","Kết giao với nhà tướng trẻ","Chúc mừng tướng trẻ","chia quân","Khuyên cha về một mình","Đỡ lời cha"],bad:["Hứa với cha sẽ giữ","Tìm lỗi của tướng trẻ","Để cha mang thân binh"],x:[()=>S.sung>=AR("dtq_binh").bar,`Sủng từ ${AR("dtq_binh").bar}`],
 t:"Hoàng thượng bẻ đôi binh phù ngay trên ngự án, một nửa đưa cha ngươi, một nửa đặt vào tay ngươi: “Trẫm tin cha {goi}, vì trẫm tin {goi}.” Từ đó, muốn điều quân phải có đủ hai nửa; và nửa kia nằm trong hộp gấm ở cung ngươi.",
 go:(_A,_ok,G)=>e67dad(G[0]),rw:"ngocboi",ti:"Người giữ nửa binh phù"},
{a:"dtq_huynh",tag:"Huynh về cùng hòa thư",w:"emp",n:"Gửi cho huynh chiếc trâm của mẹ làm tín vật bỏ trốn",
 path:["Tự gom bạc chuộc","Xin gặp riêng sứ giặc","Nhờ Lễ bộ dò ý","Dâng kế đổi tù binh","Lấy thư của huynh","Bỏ bạc mua đường cứu"],bad:["Tránh mặt sứ giặc","Mặc kệ"],x:[()=>S.bac>=AR("dtq_huynh").bar,`Bạc từ ${AR("dtq_huynh").bar}`],
 t:"Huynh trưởng trốn về giữa mùa tuyết, trong áo giấu bản đồ doanh trại và một bức hòa thư của chính công chúa nước giặc, người đã mở cửa ngục cho huynh. Hai nước nghị hòa. Huynh được phong Trấn Bắc hầu; ngày nhận ấn, huynh quay về phía cung ngươi mà lạy ba lạy.",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_haiduong",ti:"Muội muội của Trấn Bắc hầu"},
/* ===== Nhà buôn muối ===== */
{a:"muoi_tuoc",tag:"Hoàng gia thương hội",w:"th",n:"Xin Thái hậu cho nhà ngươi đứng ra lập thương hội cho triều đình",
 path:["Dâng bạc vào quốc khố","Tặng {v} hũ muối","Xin nhà ngươi gánh hết","Góp một phần","Đưa sổ sách sạch","Xin chờ tước thật"],bad:["Nhận hư hàm","Đưa bạc"],x:[()=>(S.th||0)>=AR("muoi_tuoc").bar,`Thái hậu với ngươi từ ${AR("muoi_tuoc").bar}`],
 t:"Thái hậu đặt chén trà xuống: “Bạc nhà con, lòng con, ai gia đều thấy.” Thánh chỉ ban xuống: lập Hoàng gia thương hội lo muối, trà, tơ cho nội đình, nhà ngươi đứng tên hội trưởng đời đời. Kẻ từng chê mùi muối nay xếp hàng xin vào hội.",
 rw:"nt_nhuy",ti:"Người lập Hoàng gia thương hội"},
{a:"muoi_lau",tag:"Lưới muối lậu của Hộ bộ",w:"emp",n:"Dâng sổ tay của quản sự gian kèm danh sách thuyền đêm",
 path:["Dò xem cha có thật bị oan","Tâu xin minh xét","Giữ hắn làm chứng","Bắt hắn viết lời khai","Cho người kiểm khoang","Khéo từ chối, để ý nàng","Lật đến cùng"],bad:["Giữ khoảng cách","Đổi im lặng"],x:[()=>S.mat>=AR("muoi_lau").bar[0]||S.tamco>=AR("muoi_lau").bar[1],`Tai mắt từ ${AR("muoi_lau").bar[0]} hoặc Tâm cơ từ ${AR("muoi_lau").bar[1]}`],
 t:"Sổ tay của quản sự gian lật ra cả một mạng lưới: chính quan Hộ bộ cài muối lậu vào thuyền các nhà buôn để tống tiền. Hoàng thượng chém đầu cả bọn, rồi giao cho cha ngươi chức Diêm vận sứ, coi muối khắp Giang Nam. Cái tên từng bị bôi đen nay sáng nhất bến Giang Khẩu.",
 rw:"nt_haiduong",ti:"Con gái Diêm vận sứ"},
{a:"muoi_doi",tag:"Sinh từ Giang Nam",w:"emp",n:"Xin được đội nón lá ra lều cháo cùng dân một ngày",
 path:["mở kho bán giá cũ","Lập lều cháo","Khuyên Hoàng thượng giảm thuế","Tự nguyện dâng thóc","Bảo cha bán rẻ","Tự ra lều phát thuốc","Gửi thuốc men"],bad:["Nhận bạc gấp đôi","Lo lót để gạch tên","Nghe cha"],x:[()=>S.duc>=AR("muoi_doi").bar,`Đức từ ${AR("muoi_doi").bar}`],
 t:"Năm sau được mùa, dân Giang Nam góp gạch dựng một sinh từ thờ ngươi khi còn sống. Ngự sử về tâu, Hoàng thượng cười mà phong cho ngươi chữ “Nhân” làm phong hiệu. Mỗi lần ngươi qua cổng, người ta thắp hương mà khấn tên ngươi.",
 go:(_A,_ok,G)=>e67kho(G[0]),rw:"bienngu",ti:"Phong hiệu Nhân"},
{a:"muoi_no",tag:"Kim lan trước Phụng Tiên điện",w:"v",n:"Trả sổ nợ cho {v}, rồi xin cùng nàng kết nghĩa",
 path:["Xóa nợ, kết ơn","Cho vay không điều kiện","Không bán, báo cho {v}","Đứng ra nói đó là quà","Cho thêm hạn","Nhắc khéo {v}"],bad:["Bán","Đòi bằng được","Cho vay, kèm điều kiện"],x:[A=>r97vRel(A)>=AR("muoi_no").bar,`{v} có thiện cảm với ngươi từ ${AR("muoi_no").bar}`],
 t:"{v} cầm sổ nợ mà khóc. Trước bàn thờ Phụng Tiên điện, hai người thắp ba nén hương, kết làm tỷ muội kim lan. Từ hôm ấy, mọi lời {v} nói với Hoàng thượng đều có một câu nhắc đến ngươi, và phe nàng thành phe ngươi.",
 go:(A,_ok,G)=>e67ally(r97v(A),G[0]),rw:"nt_nhuy",ti:"Tỷ muội kim lan"},
/* ===== Cung nữ được sủng (cn) ===== */
{a:"cn_chu",tag:"Chủ cũ dâng trà",w:"v",n:"Tự tay pha cho {v} chén trà năm xưa nàng thích",
 path:["Quỳ dâng trà, mỉm cười","Gửi bạc kết thân","Thừa nhận, xin lỗi","Đứng ra nói giúp chủ cũ","Nói tốt về {v}","Gửi lời làm hòa"],bad:["Đứng ngoài nhìn","Kể thật những gì đã chịu","Chuẩn bị đối phó","Đứng dậy đáp sắc sảo"],x:[A=>{const v=r97v(A);return !!v&&S.rank>=v.rank},"phẩm của ngươi không dưới {v}"],
 t:"Chén trà năm xưa nay ngươi pha, {v} nhận lấy bằng hai tay rồi quỳ xuống: “Thuở ấy ta đối đãi muội chẳng ra gì.” Hoàng thượng biết chuyện, khen ngươi “không quên gốc”, ban cho ngươi một cây trâm. {v} từ đó theo ngươi như người nhà.",
 go:(A,_ok,G)=>e67ally(r97v(A),G[0]),rw:"nt_nhuy",ti:"Ân chủ của chủ cũ"},
{a:"cn_tinh",tag:"Người cũ cứu giá",w:"emp",n:"Xin Hoàng thượng cho {n1} theo hộ giá chuyến săn mùa thu",
 path:["Gặp hắn một lần, nói rõ","Xin Nội vụ phủ đổi hắn","Nhờ người hỏi lấy lại thư","Cho {n1} xin ra biên","Âm thầm cứu hắn","Cười nói tự nhiên","Chuẩn bị lời giải thích","đánh tráo thư"],bad:["Lờ đi","Tin rằng hắn đã đốt"],x:[()=>S.duc>=AR("cn_tinh").bar,`Đức từ ${AR("cn_tinh").bar}`],
 t:"Trong cuộc săn, mãnh hổ lao vào ngự giá; {n1} chắn trước Hoàng thượng mà đỡ một vết vuốt. Ngài hỏi hắn muốn gì, hắn chỉ xin cưới một cung nữ ở quê. Đêm ấy Hoàng thượng nắm tay ngươi: “Người cũ của nàng cũng là trung thần của trẫm.” Thư cũ từ đó không còn ai dám nhắc.",
 rw:"ngocboi",ti:"Người Hoàng thượng tin tuyệt đối"},
{a:"cn_ban",tag:"Tố Nga làm nữ quan",w:"maid",n:"Xin Thái hậu cho Tố Nga vào Thượng cung cục",
 path:["Lén gửi thuốc và bạc","Đến Tân Giả khố gặp nàng","Biếu chưởng sự","Hứa che chở","Lén mời thái y","Tự bốc thuốc","Nhận là bạn cũ","Xin Tố Nga về hầu"],bad:["Đốt khăn","Chối","Gửi bạc, phó mặc"],x:[()=>!S.thDead&&(S.th||0)>=AR("cn_ban").bar,`Thái hậu còn sống, với ngươi từ ${AR("cn_ban").bar}`],
 t:"Thái hậu nghe xong chuyện cái giếng thì nhắm mắt rất lâu. Tố Nga được minh oan, phong làm chưởng ấn nữ quan Thượng cung cục, coi sổ sách y phục, đồ dùng cả lục cung. Từ nay, cung nào may áo gì, nhận đồ gì, ngươi đều biết trước một ngày.",
 rw:"nt_haiduong",ti:"Ân nhân của Thượng cung cục"},
{a:"cn_than",tag:"Huyện chúa họ Thẩm",w:"th",n:"Đeo miếng ngọc ra mắt Thái hậu",
 path:["Hỏi thêm chi tiết","Lo hậu sự cho ma ma","Đem ngọc nhờ thợ cung","Nhờ người chép hồ sơ","Xin Hoàng thượng cho xem","Tiếp bà, cho bạc","Thử dò ý {v}","Giữ kín, theo dõi","Quyết nhận"],bad:["Từ chối gặp"],x:[()=>!S.thDead,"Thái hậu còn sống"],
 t:"Thái hậu vừa thấy miếng ngọc đã đứng bật dậy: đó là ngọc bà ban cho người bạn thuở thiếu thời, phu nhân họ Thẩm. Án cũ được lật, cha ngươi được truy phong, còn ngươi được ghi vào tông phả, phong Huyện chúa. Kẻ từng gọi ngươi là “con bé bưng trà” nay phải hành lễ trước.",
 rw:"nt_dongchau",ti:"Huyện chúa họ Thẩm"},
/* ===== Công chúa Cao Ly (legacy ids nc_*) ===== */
{a:"nc_gian",tag:"Hòa ước mang tên ngươi",w:"emp",n:"Viết một bức thư cho cả hai vua, đóng hai ấn",
 path:["Dâng thư lên Hoàng thượng","Đổi nàng về phe mình","sửa sai đi khi gửi","Biếu Tổng quản","Gửi một tin nhỏ vô hại","Báo cho Hoàng thượng chuẩn bị","Gửi tin giả"],bad:["Ghi nhớ một phần"],x:[()=>S.tamco>=AR("nc_gian").bar,`Tâm cơ từ ${AR("nc_gian").bar}`],
 t:"Bức thư hai ấn của ngươi đến tay cả phụ vương lẫn Hoàng thượng cùng một ngày. Hai nước dừng binh bên sông Áp Lục, ký hòa ước mười năm, và trong hòa ước có tên ngươi làm người bảo đảm. Từ đó sứ hai nước sang, đều qua cung ngươi trước.",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_haiduong",ti:"Người bảo đảm hòa ước"},
{a:"nc_su",tag:"Chợ biên Vĩnh Hòa",w:"emp",n:"Dâng tấm bản đồ chợ biên tự tay ngươi vẽ",
 path:["Dạy thế tử huynh lễ nghi","Âm thầm thay bằng sâm","Tra xem ai đánh tráo","Khuyên huynh đổi cống","Nói giúp với Hoàng thượng","Bồi thường riêng","Thưa: con của hai nước","Đứng ra mai mối"],bad:["Để sứ đoàn giữ lễ cố quốc"],x:[()=>S.tai>=AR("nc_su").bar,`Tài từ ${AR("nc_su").bar}`],
 t:"Hoàng thượng trải tấm bản đồ ra, nhìn rất lâu những con đường ngươi vẽ từ trí nhớ thuở nhỏ. Chợ biên Vĩnh Hòa được mở; bạc trà, ngựa, sâm chảy qua hai nước. Ngài cho chợ mang phong hiệu của ngươi, và mỗi mùa thu, thuế chợ có một phần gửi về cung ngươi.",
 rw:"nt_nhuy",ti:"Vĩnh Hòa phu nhân"},
{a:"nc_tuc",tag:"Hạc của Thái hậu",w:"th",n:"Múa cho Thái hậu xem trong áo thêu hạc của mẹ",
 path:["Giải thích ý nghĩa con hạc","Dâng một phần lên Thái hậu","Xin dâng thuốc quê nhà","Mời các phi tần cùng chơi","Viết một khúc hương ca","Kể chuyện Phật giáo"],bad:["Đổi sang y phục Đại Hy","Thôi nấu","Không dám, sợ mang họa"],x:[()=>!S.thDead&&(r97art("vu")>=AR("nc_tuc").bar[0]||S.sac>=AR("nc_tuc").bar[1]),`Thái hậu còn sống; Vũ bậc ${AR("nc_tuc").bar[0]} hoặc Sắc từ ${AR("nc_tuc").bar[1]}`],
 t:"Điệu múa dứt, Thái hậu tự tay cài lên tóc ngươi cây trâm đông châu của chính bà: “Ai gia sống đến tuổi này mới biết, người ngoài là người chưa ai chịu hiểu.” Điệu hạc vũ được ghi vào nhạc phủ, và từ đó ai chê y phục Cao Ly là chê Đức Thọ cung.",
 rw:"nt_dongchau",ti:"Hạc của Đức Thọ cung"},
{a:"nc_vuong",tag:"Nữ vương Cao Ly",w:"emp",n:"Mở phong thư thứ ba, thư của các trưởng lão Cao Ly",
 path:["Xin Hoàng thượng cho để tang","Đọc kỹ, dò xem ai được lòng dân","Trả lại","Vận động Lễ bộ","Quỳ xin Hoàng thượng cứu","Gửi bạc riêng giúp huynh","Nói thật những gì đã dò"],bad:["Nhận vàng","Vận động Binh bộ"],x:[()=>S.sung>=AR("nc_vuong").bar,`Sủng từ ${AR("nc_vuong").bar}`],
 t:"Phong thư thứ ba đóng dấu của mười hai trưởng lão: thế tử huynh và Vương thúc đều đã mất lòng dân, họ xin rước ngươi về làm nữ vương. Hoàng thượng đọc xong, im lặng đến canh ba, rồi nói: “Đi hay ở, trẫm để {goi} chọn. Ở lại, Đại Hy phong {goi} làm Cao Ly trưởng công chúa.”",
 rw:"nt_dongchau",ti:"Cao Ly trưởng công chúa",
 exit:["Về cố quốc lên ngôi nữ vương","Ở lại bên Hoàng thượng","Nữ vương Cao Ly","{me} trở về Cao Ly trong đoàn xe cờ vàng của Đại Hy. Ngày lên ngôi, ngươi đặt quốc hiệu mới, ký hòa ước trăm năm với Đại Hy, và trị vì cố quốc đến bạc đầu. Sử Cao Ly chép ngươi là vị nữ vương hiền nhất.","Về cố quốc làm nữ vương"]},
/* ===== Con gái tội thần ===== */
{a:"td_an",tag:"Nữ quan thảo chiếu",w:"emp",n:"Tự tay viết bản sớ lật án, không nhờ ai chấp bút",
 path:["Bỏ bạc nhờ ông chép","Bịa một quê quán","Giấu ông ở Tân Giả khố","Đưa ông ra khỏi kinh","Mua chuộc gia nhân","Nhờ người trong cung","Dồn sức lấy lòng","Lấy lòng Thái hậu","Cho người cứu hồ sơ"],bad:["Mặc kệ"],x:[()=>S.tai>=AR("td_an").bar,`Tài từ ${AR("td_an").bar}`],
 t:"Bản sớ ngươi viết khiến cả triều không ai cãi nổi một chữ. Án cũ được lật, {foed} bị tống ngục. Rồi Hoàng thượng làm một việc chưa từng có: phong ngươi làm nữ quan thảo chiếu, ngồi bên ngự án chấp bút thánh chỉ. Con gái tội thần năm nào nay viết lời của thiên tử.",
 go:()=>{const v=foe67();return v?e67drop(v,"vì tội của cha"):""},rw:"nt_dongchau",ti:"Nữ quan thảo chiếu"},
{a:"td_ke",tag:"Kim bài tra án hậu cung",w:"emp",n:"Xin Hoàng thượng một đêm, nghe hết từ đầu",
 path:["Lần theo người giả ấn","Hỏi thẳng {foe}","Tìm lại người đưa bạc","Nhận sổ, giữ kỹ","Trình hộp quà","Hứa che chở nhà nàng","Nhắm vào {n1}"],bad:["Thôi, không đào sâu","Từ chối: ngươi không tha"],x:[()=>S.tamco>=AR("td_ke").bar,`Tâm cơ từ ${AR("td_ke").bar}`],
 t:"Hoàng thượng nghe đến sáng. Kẻ đứng sau màn bị tước hết chức tước, cả nhà {foed} lẫn {n1} cùng chịu tội. Ngài đặt vào tay ngươi một tấm kim bài: “Từ nay hậu cung có án, nàng được tra.” Những ai từng có lỗi bắt đầu tìm đến cung ngươi mà tạ tội trước.",
 go:()=>{const v=foe67();return v?e67drop(v,"vì tội của cha"):""},rw:"nt_haiduong",ti:"Người cầm kim bài tra án"},
{a:"td_song",tag:"Em trai thành tướng quân",w:"emp",n:"Xin Hoàng thượng cho gặp chàng lính trẻ ấy một lần",
 path:["Gửi bạc ra biên","Tra xem lái buôn","Nói có một người họ xa","làm hỏa đầu quân","Để em nhận công","Khen chàng lính trẻ","Chuẩn bị xin ân xá"],bad:["Tin vào số mệnh","Cho em trốn đi xa"],x:[()=>S.sung>=AR("td_song").bar,`Sủng từ ${AR("td_song").bar}`],
 t:"Chàng lính trẻ quỳ trước ngự giá, ngẩng lên, và Hoàng thượng nhìn ngươi, rồi nhìn hắn: hai gương mặt giống nhau như hai giọt nước. Ngài không hỏi gì, chỉ ban chiếu: lính phu ấy lập công cứu ải, phong Du kích tướng quân, cho khôi phục họ cũ. Đêm ấy hai chị em khóc trọn một canh.",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_nhuy",ti:"Tỷ tỷ của tướng quân"},
{a:"td_tha",tag:"Cởi oan nghiệt hai nhà",w:"foe",n:"Đưa {foe} đến bàn thờ cha mẹ ngươi",
 path:["Lén gửi bài thuốc","Bước ra an ủi","Ngăn {maid} lại","Trả thư cho {foe}","Gửi lễ mừng","Nói hết nỗi đau"],bad:["Để mặc trời định","Chỉ phao tin","Giữ thư làm chứng","Cảnh cáo nàng"],x:[()=>S.duc>=AR("td_tha").bar,`Đức từ ${AR("td_tha").bar}`],
 t:"{foe} thắp hương trước bài vị cha mẹ ngươi, rồi về khuyên cha tự thú. {foed} dâng sớ nhận tội, xin minh oan cho nhà ngươi trước khi chịu phạt. Hai người con gái của hai nhà thù kết làm tỷ muội. Hoàng thượng nói: “Trẫm chưa thấy ai trả thù đẹp như thế.”",
 go:(_A,_ok,G)=>{const v=foe67();if(v){v.enemy=false;return e67ally(v,G[0])}return""},rw:"bienngu",ti:"Người cởi oan nghiệt"},
/* ===== Cháu Thái hậu ===== */
{a:"ch_co",tag:"Nghĩa nữ của Thái hậu",w:"th",need:"th",n:"Quỳ thưa với cô mẫu: con không muốn làm quân cờ, con muốn làm con",
 path:["Thưa khéo: con còn non","Lấy lòng ma ma","Từ chối thẳng","Nhận thuốc rồi lén đổ","Khéo xin tự lo","Ngầm bắt tay Hoàng hậu","con muốn tự đứng được"],bad:["Uống thuốc của cô mẫu"],x:[()=>!S.thDead&&(S.th||0)>=AR("ch_co").bar,`Thái hậu còn sống, với ngươi từ ${AR("ch_co").bar}`],
 t:"Thái hậu lặng đi, rồi kéo ngươi vào lòng như ngày ngươi còn bé. Hôm sau bà ra ý chỉ: nhận ngươi làm nghĩa nữ, ghi vào ngọc điệp, đổi theo họ của bà. Từ đó ngươi gọi bà là mẫu hậu, và cả hậu cung hiểu Đức Thọ cung chỉ có một người con gái.",
 rw:"nt_dongchau",ti:"Nghĩa nữ của Thái hậu"},
{a:"ch_benh",tag:"Tạm cầm phượng ấn",w:"th",need:"th",n:"Dâng chén thuốc đã cho lương y thử trước mặt cả cung",
 path:["Xin vào hầu thuốc","Tìm thái y giỏi bên ngoài","Xin Hoàng thượng phân xử","Lén đổi thuốc","Tự tay sắc thuốc","Ghi nhớ, không nói","Đề nghị {hh} đi cùng","Mời lương y vào châm cứu","Quỳ ngoài điện"],bad:["Nhịn"],x:[()=>r97art("y")>=AR("ch_benh").bar[0]||S.tamco>=AR("ch_benh").bar[1],`Y thuật bậc ${AR("ch_benh").bar[0]} hoặc Tâm cơ từ ${AR("ch_benh").bar[1]}`],
 t:"Chén thuốc của Thái y viện đổi màu trong tay lương y. Cả điện quỳ rạp. Thái hậu khỏi bệnh, việc đầu tiên bà làm là đòi phượng ấn về Đức Thọ cung, rồi trao tạm vào tay ngươi: “Chừng nào ai gia còn sống, lục cung có chuyện thì hỏi con.”",
 rw:"nt_haiduong",ti:"Nhiếp lục cung sự"},
{a:"ch_ho",tag:"Song phượng Đức Thọ cung",w:"th",n:"Nắm tay {v}, cùng quỳ trước Thái hậu",
 path:["Nhường {v} dâng trước","Đề nghị họ ủng hộ cả hai","Gặp Thái hậu giải thích","Xin bà cứu {v}","Nhường {v}","Bắt tay"],bad:["Thưa: để nàng tự chịu","Từ chối"],x:[A=>r97vRel(A)>=AR("ch_ho").bar,`{v} có thiện cảm với ngươi từ ${AR("ch_ho").bar}`],
 t:"Thái hậu nhìn hai đứa cháu quỳ cạnh nhau, bật cười lần đầu sau nhiều năm: “Ai gia sợ nhà mình chia hai, hóa ra lại được đôi phượng.” Bà xin Hoàng thượng ban cho hai người phong hiệu cặp đôi, cùng ra vào Đức Thọ cung. Từ đó trong cung, đụng một người là đụng cả hai.",
 go:(A,_ok,G)=>e67ally(r97v(A),G[0]),rw:"nt_nhuy",ti:"Song phượng Đức Thọ cung"},
{a:"ch_bi",tag:"Người phi tần năm xưa còn sống",w:"th",need:"th",n:"Đưa lão cung nữ đến gặp Thái hậu lúc không có ai",
 path:["Giữ kỹ, không cho ai biết","Tìm gặp lão cung nữ","Biếu Tổng quản","Dò ngược lại","Thưa thật với bà","Tìm cách lấy lại","Đưa lão cung nữ về bên mình"],bad:["Chối","Đốt ngay"],x:[()=>S.duc>=AR("ch_bi").bar,`Đức từ ${AR("ch_bi").bar}`],
 t:"Lão cung nữ gỡ khăn: chính là vị phi tần năm xưa được cho là đã chết, sống sót nhờ Thái hậu lén thả đi. Hai bà lão nhìn nhau, khóc như hai thiếu nữ. Bí mật hóa ra là một ân tình. Thái hậu nói với ngươi: “Ai gia nợ con một mạng của tình xưa.”",
 rw:"bienngu",ti:"Người giữ ân tình Đức Thọ cung"},
/* ===== Con nhà hàn môn ===== */
{a:"thd_tho",tag:"Nữ học sĩ Hàn lâm",w:"emp",n:"Xin đề bài thơ ấy lên vách Hàn lâm viện",
 path:["Viết thư cảm tạ","Xin Hoàng thượng thứ lỗi","Thức đêm luyện thơ","Mời thầy Hàn lâm","Ứng tác ngay","Từ chối, báo Hàn lâm viện","Đối ngay","Đem nộp Hàn lâm viện"],bad:["Mua đề"],x:[()=>r97art("thi")>=AR("thd_tho").bar[0]||S.tai>=AR("thd_tho").bar[1],`Thi bậc ${AR("thd_tho").bar[0]} hoặc Tài từ ${AR("thd_tho").bar[1]}`],
 t:"Bài thơ về tuyết quê nghèo được khắc lên vách Hàn lâm viện, cạnh thơ của các bậc tiền triều. Hoàng thượng phá lệ phong ngươi Nữ học sĩ, cho dạy thơ các công chúa. Ở quê, người cha nghèo của ngươi được quan huyện đến tận nhà vái chào.",
 rw:"nt_nhuy",ti:"Nữ học sĩ Hàn lâm viện"},
{a:"thd_sach",tag:"Sách cha vào Quốc Tử Giám",w:"emp",n:"Dâng kèm lời bình của chính ngươi ở từng chương",
 path:["Đọc kỹ, chép thêm bản","Từ chối","Cho xem","Dâng chương sách về đê điều","Giấu sách ở Phụng Tiên điện","Để sách giả làm mồi"],bad:["Nhận quà, nói sách đã mất","Nhận"],x:[()=>S.tai>=AR("thd_sach").bar,`Tài từ ${AR("thd_sach").bar}`],
 t:"Hoàng thượng đọc bộ sách ba đêm liền. Kẻ quyền thế bị chỉ mặt bị cách chức tra xét; sách cha ngươi được khắc in, đem dạy ở Quốc Tử Giám, cha được truy tặng Thái phó. Trên trang đầu, cạnh tên cha, có thêm một dòng: “Con gái chú giải.”",
 rw:"bienngu",ti:"Người chú giải sách Thái phó"},
{a:"thd_tro",tag:"Học trò đỗ Trạng nguyên ân khoa",w:"emp",n:"Xin Hoàng thượng mở một kỳ ân khoa, tự ngài ra đề",
 path:["Gửi bạc giúp hắn","Dò xem lời hắn có thật","Khuyên Hoàng thượng phúc khảo","Giữ kín, gom chứng cứ","Mua chuộc người giữ kho","Nhờ học sĩ Hàn lâm","Mời thầy thuốc, giấu hắn","Gửi lời động viên"],bad:["Khuyên hắn về quê","Không xen vào"],x:[()=>S.danh>=BAL.danhG.thdBook,`Danh từ ${BAL.danhG.thdBook}`],
 t:"Kỳ ân khoa do chính Hoàng thượng ra đề. {n1} đỗ Trạng nguyên, cưỡi ngựa dạo phố ba ngày. Ngày vào triều, hắn quỳ hướng về hậu cung mà lạy, và cả triều biết vị Trạng nguyên mới là người của ai. Kẻ mua đề năm trước bị lưu đày.",
 rw:"nt_haiduong",ti:"Ân sư của Trạng nguyên"},
{a:"thd_hoc",tag:"Nữ sư của Đông cung",w:"emp",n:"Dẫn bọn trẻ ra Ngự hoa viên, học bằng những gì chúng thấy",
 path:["Dạy bằng chuyện kể","Kèm riêng","Mời {v} đến dự giờ","Kèm thêm cho con nàng","Để đứa chậm nhất đọc","Đối xử như mọi đứa","Nhận lỗi, xin chăm sóc"],bad:["Dạy nghiêm, phạt đứng","Báo với mẹ nó"],x:[()=>S.tai>=AR("thd_hoc").bar,`Tài từ ${AR("thd_hoc").bar}`],
 t:"Ngày khảo hạch, đứa chậm nhất đứng lên đọc trôi chảy cả một chương. Hoàng thượng vỗ án khen, rồi phong ngươi làm nữ sư của Thượng thư phòng, ngày ngày dạy cả hoàng tử lớn nhất. Các bà mẹ từng nghi ngờ ngươi nay mang lễ đến xin gửi con.",
 go:(_A,_ok,G)=>e67heir(G[0]),rw:"nt_nhuy",ti:"Nữ sư Thượng thư phòng"},
/* ===== Cung nữ (chế độ kẻ hầu) ===== */
{a:"cnv_chu",tag:"Chủ nhân nhận làm nghĩa muội",w:"mis",n:"Quỳ xin chủ nhân để nô tỳ gánh cùng",
 path:["Hỏi chủ có cần giúp","Quỳ xuống: nô tỳ không thấy gì","Lén lấy một ít đem hỏi","Từ chối, báo chủ","Lén đổ thuốc đi","Quỳ xin chủ đừng làm","Thưa khéo cho chủ","Một mình nhận hết"],bad:["Bán một tin vặt","Khai thật với Nội vụ phủ"],x:[()=>(S.tin||0)>=AR("cnv_chu").bar,`Chủ tin từ ${AR("cnv_chu").bar}`],
 t:"{mis} ôm lấy ngươi mà khóc: gói thuốc ấy là để tự hại mình, vì một nỗi oan không ai biết. Ngươi ở bên chủ suốt mùa đông, đến khi nàng đứng dậy được. Ngày xuân, nàng nhận ngươi làm nghĩa muội và tự mình tiến cử ngươi lên Hoàng thượng.",
 go:()=>r97rise("Chủ nhân nhận làm nghĩa muội và tiến cử")||r97srvRk(BAL.srvRk.cs),rw:"nt_nhuy",ti:"Nghĩa muội của chủ nhân"},
{a:"cnv_ban",tag:"Hai chị em vào Thượng cung cục",w:"maid",n:"Đưa chiếc khăn có thêu tên Thu Cúc ra trước chưởng sự",
 path:["Đến xin cho nàng","Lặng lẽ dò xem ai lấy vòng","Rình bắt Thu Cúc","Nói thẳng với Thu Cúc","Lén mang thuốc","Bênh bạn","Lấy lại khăn","Báo trước với chưởng sự","Tìm người làm chứng"],bad:["Không dám","Thưa không rõ"],x:[()=>S.tai>=AR("cnv_ban").bar[0]||S.mat>=AR("cnv_ban").bar[1],`Tài từ ${AR("cnv_ban").bar[0]} hoặc Tai mắt từ ${AR("cnv_ban").bar[1]}`],
 t:"Chiếc khăn lật ngược cả phiên xử. Xuân Đào được minh oan, và chưởng sự Thượng cung cục, người ngồi nghe từ đầu, xin cả hai chị em về làm việc dưới trướng bà: một người coi kim chỉ, một người coi sổ sách. Từ cô gái giặt áo, ngươi thành người được cả lục cục kính nể.",
 go:()=>r97srvRk(BAL.srvRk.nq)||"",rw:"nt_nhuy",ti:"Nữ quan Thượng cung cục"},
{a:"cnv_mat",tag:"Phá lệ phong Quý nhân",w:"emp",n:"Hát lại khúc hát nơi hậu viện, chỉ cho một người nghe",
 path:["nhìn ngài một khoảnh khắc","Xin chủ tiến cử","Pha trà ngài thích","Hát tiếp","Nhờ người báo cho Hoàng thượng","Thưa: nô tỳ chỉ làm phận sự"],bad:["Ngầm nhận lời","Tránh mặt"],x:[()=>(S.nt||0)>=AR("cnv_mat").bar,`Hoàng thượng để ý từ ${AR("cnv_mat").bar}`],
 t:"Khúc hát vừa dứt, Hoàng thượng đứng sau rặng trúc bước ra. Sáng hôm sau, thánh chỉ phá lệ: cung nữ {me} không qua Đáp ứng, Thường tại, phong thẳng Quý nhân, ban hiệu theo khúc hát. Cả Nội vụ phủ lật sổ ba đời cũng không tìm ra tiền lệ.",
 go:()=>{const r=r97rise("Hoàng thượng phá lệ sắc phong");if(r&&S.rank<2){S.rank=2;return "Phá lệ phong thẳng "+RANKS[2].n+"."}return r},rw:"nt_haiduong",ti:"Quý nhân phá lệ"},
{a:"cnv_ma",tag:"Kế nhiệm Lưu ma ma",w:"maid",n:"Xin ma ma cho học nốt bài cuối: cách giữ chìa khóa kho",
 path:["Tập đến khi được","Báo ma ma","Chăm bà","Gửi thuốc rồi về","Tìm người làm chứng","Không động đến","Giữ kín cho ma ma","Khuyên ma ma tự nhận"],bad:["Lén đổ bớt trà","Cất giùm vào tủ"],x:[()=>(S.tin||0)>=AR("cnv_ma").bar[0]||S.duc>=AR("cnv_ma").bar[1],`Chủ tin từ ${AR("cnv_ma").bar[0]} hoặc Đức từ ${AR("cnv_ma").bar[1]}`],
 t:"Lưu ma ma trao cho ngươi chùm chìa khóa đã đeo bên hông bà bốn mươi năm: “Kho này, sổ này, người này, từ nay là của con.” Ngươi thành chưởng sự cô cô trẻ nhất Nội vụ phủ từ trước đến nay; những kẻ từng ghen ngươi nay phải xin ngươi phân việc.",
 go:()=>r97srvRk(BAL.srvRk.cs)||"",rw:"nt_nhuy",ti:"Chưởng sự trẻ nhất Nội vụ phủ"},
/* ===== Tuyến chung ===== */
{a:"s_than",tag:"Mẹ còn sống",w:"emp",n:"Hỏi hắn câu cuối: mẹ ta có hát ru bài gì",
 path:["Hỏi những chuyện chỉ người nhà biết","Đề phòng, theo dõi","Nhận","Phản đòn: hỏi ai đưa hắn vào","Đứng ra bảo lãnh","Tha thứ, cho hắn làm tai mắt"],bad:["Cho là trùng hợp"],x:[()=>S.mat>=AR("s_than").bar[0]||S.duc>=AR("s_than").bar[1],`Tai mắt từ ${AR("s_than").bar[0]} hoặc Đức từ ${AR("s_than").bar[1]}`],
 t:"Hắn hát được bài ru ấy, và hắn biết thêm một điều không ai biết: mẹ ngươi chưa chết trong trận lụt, bà sống ở một am nhỏ ngoài kinh. Hoàng thượng nghe chuyện, sai kiệu đón bà vào cung một ngày. Ngươi gục đầu vào lòng mẹ mà khóc như năm lên sáu.",
 rw:"nt_nhuy",ti:"Người đoàn viên"},
{a:"s_thu",tag:"Thóp của kẻ đứng trên",w:"maid",n:"Đặt cả hai bức thư cạnh một bản sớ cũ của Trung cung",
 path:["Giữ thư, dò nét chữ","Báo ngay cho {v2}","Theo dõi cung nữ ấy","Cho người canh thuốc","Ngầm cho nàng biết","Đề phòng, đổi người hầu","Đưa cả hai thư cho Tổng quản","Chuẩn bị tố"],bad:["Mặc kệ, đây không phải chuyện"],x:[()=>S.tamco>=AR("s_thu").bar,`Tâm cơ từ ${AR("s_thu").bar}`],
 t:"Nét chữ trong thư không phải của {v}: nàng chỉ là người chép lại. Bàn tay viết thư thật ở cao hơn nhiều. Ngươi không tố ai cả; ngươi chỉ gửi đến người ấy một bản chép. Từ hôm đó, mọi mưu nhắm vào ngươi trong hậu cung đều lặng lẽ dừng lại.",
 go:(A,_ok,G)=>{const v=r97v(A);return v?e67ally(v,G[0]):""},rw:"nt_haiduong",ti:"Người nắm thóp kẻ đứng trên"},
{a:"s_hoa",tag:"Cứu ngự họa tiên đế",w:"emp",n:"Quay lại gian trong của Tây cung lấy cuộn tranh",
 path:["Dẫn người của mình đi cứu","Giấu nàng, hỏi kỹ","Đưa nàng lên Tổng quản","Đưa người làm chứng","Bắt hắn khai","Đề nghị dùng bạc","Tìm phần sổ sót lại"],bad:["Thôi, chuyện cũ đã cháy"],x:[()=>S.suc>=AR("s_hoa").bar,`Sức từ ${AR("s_hoa").bar}`],
 t:"Ngươi ôm ra khỏi đám cháy cuộn chân dung tiên hoàng hậu, mẫu thân của Hoàng thượng, bức tranh duy nhất còn lại. Tóc ngươi cháy sém, tay phồng rộp. Hoàng thượng ôm cuộn tranh mà không nói được lời nào; đêm ấy ngài ngồi bên giường ngươi đến sáng.",
 rw:"ngocboi",ti:"Người cứu ngự họa"},
{a:"s_su",tag:"Tên vào sử nước Tây",w:"emp",n:"Tặng sứ thần một bài thơ và nhờ ông dịch",
 path:["Đáp lễ theo lối của họ","Dâng lên Thái hậu","Vạch ngay giữa yến","Lặng lẽ báo Lễ bộ","đổi lấy y thuật và lịch pháp","Mời sứ thần sửa","Đứng ra bảo đảm"],bad:["Giữ làm của riêng"],x:[()=>S.tai>=AR("s_su").bar,`Tài từ ${AR("s_su").bar}`],
 t:"Sứ thần về nước mang theo bài thơ của ngươi và một bức chân dung do họa sĩ trong đoàn vẽ. Mười năm sau, sứ đoàn khác đến, dâng lên Hoàng thượng một cuốn sách in ở phương Tây: trang đầu là chân dung ngươi, chép rằng “Hoàng phi phương Đông, người thông tuệ nhất mà bọn ta từng gặp”.",
 rw:"nt_haiduong",ti:"Hoàng phi trong sử nước Tây"},
{a:"s_dich",tag:"Miếu Dược Vương khắc tên",w:"doc",n:"Tự chủng đậu cho mình trước để mọi người tin",
 path:["Đóng cửa cung mình","Đến Thái y viện xin giúp","Dâng phương lên Thái y viện","Thử cho người trong cung mình","Gửi thuốc và người chăm","Mời Thái y khám công khai","Xin vào hầu","Đứng ra điều phối","Góp bạc mua thuốc"],bad:["Tránh xa"],x:[()=>r97art("y")>=AR("s_dich").bar[0]||S.duc>=AR("s_dich").bar[1],`Y thuật bậc ${AR("s_dich").bar[0]} hoặc Đức từ ${AR("s_dich").bar[1]}`],
 t:"Ngươi sốt ba ngày rồi khỏi, trên tay chỉ còn một vết sẹo nhỏ. Cả kinh thành đổ đi chủng đậu theo phương của ngươi; mùa dịch tắt trước Tết. Hoàng thượng cho dựng miếu Dược Vương, trên bia khắc tên ngươi cạnh các danh y, phong hiệu “Từ Tế”.",
 rw:"bienngu",ti:"Phong hiệu Từ Tế"},
{a:"s_tinh",tag:"Bài thơ tiễn ra biên",w:"emp",n:"Viết cho {man} một bài thơ tiễn, nhờ Hoàng thượng chuyển",
 path:["Cảm ơn rồi đi ngay","Đốt","Từ chối","Dồn sức giành lại Hoàng thượng","Quát hắn, dọa tố","Từ chối, chọn con đường trong cung","Xin hắn rời cung"],bad:["Đứng lại trò chuyện","Giữ lại","Đến, chỉ để nói lời từ biệt","Tìm an ủi bên {man}"],x:[()=>S.duc>=AR("s_tinh").bar,`Đức từ ${AR("s_tinh").bar}`],
 t:"Hoàng thượng đọc bài thơ tiễn trước rồi mới sai người chuyển đi. {man} xin ra biên ải, về sau lập công lớn. Đêm ấy ngài nói: “{Goi} có thể giấu trẫm, mà {goi} lại đưa cho trẫm đọc.” Từ đó, lời gièm nào về ngươi đến tai ngài cũng bị gạt đi.",
 rw:"ngocboi",ti:"Người Hoàng thượng không nghi"},
{a:"s_thay",tag:"Mạng lưới của lão Tổng quản",w:"eun",n:"Ngồi bên giường ông, đọc lại cho ông nghe cuốn sổ",
 path:["Nghe lời, đi lối khác","Hỏi vì sao","Giúp","Ghi lòng tạc dạ","Hỏi phi tần ấy là ai","Đứng ra nói giúp","Giữ kín","Đến thăm, nhận sổ"],bad:["Từ chối khéo","Dùng ngay"],x:[()=>S.mat>=AR("s_thay").bar[0]||S.tamco>=AR("s_thay").bar[1],`Tai mắt từ ${AR("s_thay").bar[0]} hoặc Tâm cơ từ ${AR("s_thay").bar[1]}`],
 t:"Trước lúc nhắm mắt, lão Tổng quản dặn từng người một: các thái giám ở mười hai cung, ba cửa thành, Ngự thiện phòng, Kính sự phòng. “Từ nay các ngươi nghe nàng.” Tai mắt ba đời vua của ông, nay là của ngươi.",
 rw:"nt_haiduong",ti:"Người kế thừa lão Tổng quản"},
{a:"s_ban",tag:"Kim lan lật đổ {v2}",w:"v",n:"Hẹn {v} uống rượu thề dưới gốc hải đường",
 path:["Đỡ lời cho cả {v}","Báo cho {v}","Mời trà, nói chuyện thật lòng","Giúp {v} bắt kẻ gài","Đỡ lời","Bắt tay"],bad:["Chỉ lo cho mình","Giữ kín","Tiếp khách sáo","Mặc kệ","Từ chối"],x:[A=>r97vRel(A)>=AR("s_ban").bar,`{v} có thiện cảm với ngươi từ ${AR("s_ban").bar}`],
 t:"Dưới gốc hải đường, hai người từng là kẻ thù uống chung một chén rượu thề. Ba tháng sau, mọi mưu của {v2} bị chính hai người lật ra trước mặt Hoàng thượng. Cả hậu cung kháo nhau: chọc vào một người là chọc vào cả đôi.",
 go:(A,_ok,G)=>{const v2=r97v(A,"v2");return [e67ally(r97v(A),G[0]),v2?e67drop(v2,"bị vạch mưu"):""].filter(Boolean).join(" ")},rw:"nt_nhuy",ti:"Tỷ muội kim lan"},
/* ===== Giữa đời ===== */
{a:"st_the",tag:"Một hô trăm ứng",w:"emp",n:"Mở tiệc ở cung ngươi, mời mọi người từng chịu ơn ngươi",
 path:["Nhận lời kết nghĩa","Chăm lo cho họ","Đáp lễ, hứa nâng đỡ","Gặp từng người giải thích","Chia cho kẻ hầu và đồng minh","Đứng ra bảo vệ"],bad:["Giữ lại","Để luật xử"],x:[()=>r97allies(AR("st_the").bar[0])>=AR("st_the").bar[1],`ít nhất ${AR("st_the").bar[1]} phi tần có thiện cảm với ngươi từ ${AR("st_the").bar[0]}`],
 t:"Tiệc đêm ấy đông đến mức phải bày thêm bàn ra sân. Phi tần, cung nữ, thái giám, cả người nhà các quan đều đến. Hoàng thượng đi ngang, đứng ở cửa nhìn rất lâu, rồi cười: “Trẫm chưa từng thấy ai có nhiều người thương đến vậy.” Từ đó, việc gì trong cung ngươi nói một câu là có trăm người làm.",
 go:(_A,_ok,G)=>{let n=0;liveRivals(true).filter(v=>(v.rel||0)>=30).slice(0,4).forEach(v=>{relAdd(S,v,G[0]);n++});return n?`${n} người trong phe ngươi thêm thiện cảm (+15).`:""},rw:"nt_haiduong",ti:"Chủ một phe lục cung"},
{a:"st_con",tag:"Hoàng thượng tự tay dạy con",w:"kid",need:"kid",n:"Để con tự dâng Hoàng thượng bài văn nó viết",
 path:["Lão Hàn lâm nghiêm khắc","Tiến sĩ trẻ","Tự thức canh","Tăng người canh","Đêm trước kèm con","Để chúng chơi","Xin Hoàng thượng làm lễ nhỏ","Tìm kẻ tung tin"],bad:["Cấm"],x:[()=>{const s=r97son();return !!s&&(s.fond||0)>=AR("st_con").bar},`có hoàng tử được Hoàng thượng thương từ ${AR("st_con").bar}`],
 t:"Hoàng thượng đọc bài văn của {k}, rồi gác cả tấu chương, tự tay cầm bút sửa từng chữ cho con. Từ hôm ấy, mỗi tối ngài gọi {k} vào ngự thư phòng. Triều thần nhìn nhau: chưa hoàng tử nào được vua tự dạy như thế.",
 go:(_A,_ok,G)=>e67heir(G[0]),rw:"ngocboi",ti:"Mẫu thân của hoàng tử được vua tự dạy"},
{a:"st_dong",tag:"Mật chiếu sau biển Chính đại quang minh",w:"emp",need:"kid",n:"Đêm ấy không xin gì, chỉ ngồi nghe ngài nói về giang sơn",
 path:["Thưa: chọn người hiền","Nhận lời","Cho con cưỡi ngựa bắn cung","Đưa con đến hầu Thái hậu","Dâng lễ lên Đức Thọ cung","Mời thầy giỏi kèm riêng","Tự dạy con","Đổi người nấu, giăng bẫy","Tự nấu cho con"],bad:["Lật lại chuyện con nàng"],x:[()=>{const s=r97son();return !!s&&(s.fond||0)>=AR("st_dong").bar[0]&&S.sung>=AR("st_dong").bar[1]},`có hoàng tử được thương từ ${AR("st_dong").bar[0]}, Sủng từ ${AR("st_dong").bar[1]}`],
 t:"Canh tư, Hoàng thượng một mình trèo lên điện Càn Thanh, đặt một hộp gấm sau tấm biển “Chính đại quang minh”. Sáng ra ngài chỉ nói với ngươi: “{Goi} đã nghe trẫm cả đêm mà không xin gì. Trẫm biết phải viết tên ai.” Tên trong mật chiếu là {k}.",
 go:(_A,_ok,G)=>{const s=r97son();if(s&&typeof setHeir==="function"&&!(S.heir&&S.heir.k===s)){setHeir(s,null);return `${s.name} được lập làm Thái tử.`}return e67heir(G[0])},rw:"nt_dongchau",ti:"Mẫu thân của Thái tử trong mật chiếu"}
];
/* ONE CORE (OD:L1267): an entry's numbers live in BAL.arc.rare[a] (jbalarc.js); AR(a) reads them (its x text prints AR(a).bar) */
function arcRare(d){const R=AR(d.a);if(!R)return d;for(const k of ["p","np","sc","c","fx"])if(R[k]!=null)d[k]=R[k];if(R.g&&d.go){const f=d.go,G=R.g;d.go=function(A,ok){return f(A,ok,G)}}return d}
/* Bắc Địch own roads (jrd_bd.js / jrd_bd2.js, earlier in the script) add their .4 rare rows to BD97, same shape */
if(typeof BD97!=="undefined")R97L.push(...BD97);
if(typeof PF97!=="undefined")R97L.push(...PF97);
R97L.forEach(d=>{R97[arcRare(d).a]=d});
/* the rare ending becomes a real ending of the arc (k:1, a win for the chapter chain and the origin finale) */
/* jreg: rare endings registered later (jroad RD97L via RARE97.defs) get their E.r97 the same way */
regEach(R97,id=>{const a=ARC67[id],d=R97[id];if(!a||!a.E||a.E.r97)return;
 a.E.r97={k:BAL.arc.tier.win,tag:"✦ "+d.tag,w:d.w,t:d.t,fx:d.fx,go:A=>r97After(A,d)}},"R97 ending");
/* ---------- condition, roll, offer ---------- */
function r97Cond(A,d){const q=A.q97||{p:0,b:0};if(q.b)return false;if((q.p||0)<(d.np||2))return false;if((A.sc||0)<(d.sc||0))return false;
 if(d.need==="kid"&&!r97son())return false;if(d.need==="hh"&&!qOn())return false;if(d.need==="th"&&S.thDead)return false;
 try{if(d.x&&!d.x[0](A))return false}catch(e){return false}return true}
function r97Hit(s,list){s=String(s||"");return (list||[]).some(x=>s.includes(x))}
function r97Note(A,o){const d=R97[A.a];if(!d||!o)return;const q=A.q97||(A.q97={p:0,b:0});
 if(r97Hit(o.n,d.bad))q.b=1;else if(r97Hit(o.n,d.path))q.p++}
function r97IsX(A,bid){const a=ARC67[A.a];return !!(a&&bid&&(a.p[3]||[]).includes(bid))}
function r97Gate(A){if(!A||A.r97||!A.nb||!R97[A.a]||!r97IsX(A,A.nb))return;const d=R97[A.a];const c=r97Cond(A,d);
 const p=(d.p||.1)*(R97CFG.p||1);A.r97={c:c?1:0,ok:c&&roll(p*100)?1:0};
 try{const st=S.r97s||(S.r97s={c:0,n:0,ok:0});st.n++;if(c)st.c++;if(A.r97.ok)st.ok++}catch(e){}}
(function(){const f0=fireBeat67;fireBeat67=function(A){try{r97Gate(A)}catch(e){console.error(e)}return f0.apply(this,arguments)}})();
/* record every choice of the arc against its rare path */
(function(){const r0=res67;res67=function(tk,bid,i,odds){let A=null,o=null;try{A=th67(tk);if(A&&A.cur===bid){const b=beatDef67(A,bid);o=opts67(A,b)[i]}}catch(e){}
 const r=r0.apply(this,arguments);try{if(A&&o&&!r97IsX(A,bid))r97Note(A,o)}catch(e){console.error(e)}return r}})();
/* the glowing option on the climax: cost only, never the outcome */
function r97Live(A,bid){return !!(A&&A.r97&&A.r97.ok&&!A.r97.done&&!A.done&&A.cur===bid&&r97IsX(A,bid)&&R97[A.a])}
(function(){const p0=PEND.j67;PEND.j67=function(p){const d=p0.apply(this,arguments);try{if(d&&v267()){const A=th67(p.t);if(r97Live(A,p.b)){const D=R97[A.a];const cost=fmt(D.c||{});
  d.o.push({n:`✦ ${fill67(D.n,A)}`,fx:Object.assign({},D.c||{}),x:"",r97:1,j67:[cost?"tốn: "+cost:"","(Cơ duyên hiếm)"].filter(Boolean).join(" · "),go:()=>r97Take(p.t,p.b)});
  d.t+=`<br><span class="past">✦ Một cơ duyên hiếm vừa hé mở.</span>`}}}catch(e){console.error(e)}return d}})();
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0],M=$("modal");if(m&&m.opts&&M&&!M.hidden)m.opts.forEach((c,i)=>{if(c&&c.r97){const b=M.querySelector(`.opt[data-m="${i}"]`);if(b){b.classList.add("ksel","k97");b.setAttribute("aria-label","Cơ duyên hiếm: "+String(c.n).replace(/<[^>]+>/g,""))}}})}catch(e){}return r}})();
function r97Take(tk,bid){const A=th67(tk);if(!r97Live(A,bid))return;const b=beatDef67(A,bid);const D=R97[A.a];
 A.r97.done=1;A.hist.push(`${fill67(b.l||b.h||"",A)}: ${fill67(D.n,A)} (cơ duyên hiếm)`);A.used.push(bid);A.cur=null;A.i++;
 end67(A,"r97");try{if(D.exit&&!S.dead)pushDil(mkP("j97x",{a:A.a}),"Cơ duyên hiếm")}catch(e){console.error(e)}}
/* reward: one Ngự tứ + a title for this life + the book of rare endings */
function r97After(A,d){let ex=[];try{if(d.go){const g=d.go(A);if(g)ex.push(g)}}catch(e){console.error(e)}
 const k=IT[d.rw]?d.rw:R97NT.find(x=>IT[x]);const nm=k?r97give(k,"Hoàng thượng"):"";if(nm)ex.push(`Phần thưởng hiếm: ${nm} (Ngự tứ, đã vào Rương).`);
 S.r97=S.r97||[];S.r97.push({a:A.a,tag:d.tag,ti:d.ti,t:S.turn});ex.push(`Danh hiệu kiếp này: «${d.ti}».`);
 r97Meet(A.a,fill67(d.tag,A));return ex.join(" ")}
/* leaving the palace when the rare ending allows it (nữ vương…) */
PEND.j97x=p=>{const d=R97[p.a];if(!d||!d.exit||S.dead)return null;const A={act:{},a:p.a};
 return {who:who67(d.w,A),t:`<b>${ARC67[p.a].t}</b><br>${fill67(d.t,A,d.w)}`,o:[
  {n:d.exit[0],fx:{},x:"kết thúc kiếp này",go:()=>{if(typeof kitEndNext==="function")kitEndNext("rare");over(d.exit[2],fill67(d.exit[3],A),d.exit[4],true)}},
  {n:d.exit[1],fx:{},x:"ở lại cung",go:()=>{const W=BAL.arc.r97.stay;apply(W);log(`Ngươi ở lại. ${fill67(d.ti,A)}: Hoàng thượng thương ngươi hơn. ${sgStat(W.sung)}.`)}}]}};
/* ---------- Sổ luân hồi: rare endings met across lives (memory only, no carry-over) ---------- */
function r97Book(){try{return JSON.parse(localStorage.getItem("ctm-rare97")||"{}")||{}}catch(e){return {}}}
function r97Meet(id,tag){try{const b=r97Book();const e=b[id]||{n:0};e.n++;e.tag=tag||e.tag;if(!e.first)e.first={who:S.name,o:S.origin&&S.origin.n,y:S.year};b[id]=e;localStorage.setItem("ctm-rare97",JSON.stringify(b))}catch(e){}}
function r97Total(){return Object.keys(R97).length+Object.keys(R97X).length}
function r97Title(id){if(ARC67[id])return ARC67[id].t;return R97X[id]?R97X[id].t:id}
function r97BookHTML(){const b=r97Book();const ids=Object.keys(b).filter(id=>R97[id]||R97X[id]);const n=ids.length,y=r97Total();
 const rows=[["Kết hiếm đã gặp",`<b>${n}/${y}</b> kết hiếm đã gặp`,n?"g":""]].concat(ids.map(id=>[`✦ ${r97Title(id)}`,`${b[id].tag||""}${b[id].n>1?` · ${b[id].n} lần`:""}${b[id].first?` · lần đầu: ${b[id].first.who||""}${b[id].first.o?", "+b[id].first.o:""}`:""}`]));
 rows.push(["Ghi chú","Sổ chỉ để nhớ: kết hiếm không mang lợi thế nào sang kiếp sau."]);
 return `<h3>Kết hiếm</h3>`+rows67(rows)}
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+r97BookHTML()}catch(e){return h}}})();
if(typeof lifeSave==="function")(function(){const l0=lifeSave;lifeSave=function(fate){try{const L=(S&&S.r97)||[];if(L.length)fate=`${fate} · Kết hiếm: ${L.map(x=>x.tag).join(", ")}`}catch(e){}return l0.call(this,fate)}})();
/* Mệnh truyện panel: this life's rare endings and titles */
(function(){const p0=panel67;panel67=function(){const h=p0.apply(this,arguments);try{const L=(S&&S.r97)||[];if(L.length)return h+`<h3>Cơ duyên hiếm kiếp này</h3>`+rows67(L.map(x=>[`✦ ${ARC67[x.a]?ARC67[x.a].t:x.a}`,x.ti&&x.ti!==x.tag?`${x.tag} · danh hiệu «${x.ti}»`:`danh hiệu «${x.ti||x.tag}»`,"g"]))}catch(e){}return h}})();
/* hook for other modules (j96 love arc): register / record a rare ending outside ARC67 */
window.RARE97={defs:R97,cfg:R97CFG,add:(id,o)=>{if(id&&!R97[id])R97X[id]={t:(o&&o.t)||id,tag:(o&&o.tag)||""}},meet:(id,tag)=>r97Meet(id,tag),total:r97Total,book:r97Book,
 cond:A=>{const d=A&&R97[A.a];return d?r97Cond(A,d):false},
 force:(on)=>{const A=S&&S.st&&S.st.M;if(!A)return null;if(on===false){delete A.r97;return A}A.r97={c:1,ok:1};return A}};
