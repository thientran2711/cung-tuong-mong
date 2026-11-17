/* ================= jnroadm: U3 MEN ROADS (owner OD:L1243/L1252/L1386; ROAD_MAP §4.10 PROPOSED by Foreman D, canon check = Foreman B) =================
   20 road templates × 8 chapters (.4–.11) for the REAL men of a life: S.men (Thị vệ, Thái y, Vương gia, Nhạc sư, Sứ thần, Họa sư; the
   Thanh mai trúc mã man m96 is excluded — his story owns him), the court men (S.court: Tổng quản tq, Kính sự phòng ksp, Thái y ty,
   Nội vụ phủ ped), every staff eunuch (allServ role eunuch), the five house heads (trS().H; the player's own father excluded — her road
   owns him) and the sons of NPC consorts old enough (BAL.nroad.men.kidAge; the player's own children are her story, ch12).
   Same engine as the women (jnroad.js): due chapter → his own odds (base + his stat / div + Lợi thế after a won chapter + help),
   gain AND loss on his REAL fields (BAL.nroad.men.fx): S.men loyal (jmen bribe odds), court men af (their lean toward a consort or the
   player: ksp af.me = night-register odds, jcycle), house heads pow + house relations (j55), princes fond/tal/hp (j1 kids), staff
   eunuchs mp/loyal (j14). A real rival kept for the whole road (another man of his kind / another house / another prince / another
   house's eunuch), recast and told when gone. Help hồi = the same 8 nr_* j72 follow-ups (asker kinds man/doc/eun/ksp/off/sv/rsv).
   Chapter tags are story words only: they never claim a rank, a death, a dismissal or an heir (real state stays with its own systems).
   Row format: [title, cast key w, win tag, lose tag]; .11 row: [title, w, win, middle, lose]. */
(function(){const MID="việc còn dở dang";
 const def=(id,k,t,sk,rows)=>{const c={};rows.forEach((r,i)=>{const n=BAL.road.first-1+i;const last=i===rows.length-1;
   c[n]={t:r[0],w:r[1],sk,mk:k,E:{a:{k:1,tag:r[2]},m:{k:0,tag:last?r[3]:MID},b:{k:-1,tag:last?r[4]:r[3]}}}});NRM[id]={k,t,sk,c}};
 /* gd — Thị vệ */
 def("gd_tl","gd","Đường lên Thống lĩnh","loyal",[["Ca trực đêm mưa","gd","giữ vững cổng cung","để lọt kẻ lạ"],["Kẻ đứng trên","gd","được Thống lĩnh để mắt","bị Thống lĩnh quở"],
  ["Đồng liêu ghen","gd","êm chuyện với đồng liêu","bị đồng liêu gài"],["Bạc lót tay","bac","từ chối bạc bẩn","dính tiếng nhận bạc"],["Hộ giá đi săn","emp","hộ giá chu toàn","để ngựa kinh trước thánh giá"],
  ["Kỳ khảo võ","gd","đứng đầu kỳ khảo","thua kém người sau"],["Lời tiến cử","off","được tiến cử","lời tiến cử bị gác lại"],["Đường lên Thống lĩnh","emp","được Hoàng thượng nhớ tên","giữ được chỗ đứng","lỡ đường thăng tiến"]]);
 def("gd_tinh","gd","Mối tình bên cổng cung","loyal",[["Chiếc khăn rơi","gd","trả khăn kín đáo","bị người khác trông thấy"],["Lời hẹn dưới cây hòe","gd","giữ được lời hẹn","lỡ hẹn"],
  ["Kẻ dòm ngó","eun","qua mắt kẻ dòm ngó","bị kẻ dòm ngó ghi tên"],["Thư tay","man","thư đến tay người nhận","thư lạc đường"],["Lệnh đổi ca","gd","vẫn được trực chỗ cũ","bị đổi đi xa"],
  ["Tin đồn trong cung","eun","tin đồn lắng xuống","tin đồn lan rộng"],["Chọn giữa tình và chức","gd","giữ được cả hai","phải buông một"],["Mối tình bên cổng cung","gd","hẹn ngày nàng ra cung","giữ trong lòng, không nói","dứt tình cho yên thân"]]);
 def("gd_kho","gd","Án mất trộm ngự khố","loyal",[["Đêm ngự khố mất đồ","eun","báo kịp lúc","bị nghi đầu tiên"],["Dấu chân bên tường","gd","lần ra dấu vết","dấu vết bị xóa"],
  ["Kẻ tình nghi","eun","tìm ra kẻ đáng ngờ","bị đổ oan một phần"],["Thận Hình ti tra hỏi","eun","khai rõ ràng, được thả","chịu đòn tra"],["Món đồ trở lại","bac","tìm lại món đồ","món đồ bặt tăm"],
  ["Kẻ đứng sau","off","lần ra kẻ đứng sau","bị chặn đường tra xét"],["Trình án","emp","án được trình lên","án bị dìm"],["Án mất trộm ngự khố","emp","rửa sạch tiếng, được thưởng","án khép lại, không ai được gì","mang tiếng mãi"]]);
 /* ty — Thái y (S.men Thái y and the court Thái y) */
 def("ty_thu","ty","Y thư thất truyền","loyal",[["Cuốn sách nát","man","giữ được cuốn sách","sách mất mấy trang"],["Phương thuốc lạ","man","đọc ra phương thuốc","đọc sai một vị"],
  ["Thử thuốc","bac","thuốc có hiệu","thuốc vô hiệu"],["Đồng liêu dị nghị","off","thuyết phục được Thái y viện","bị chê là tà thuật"],["Bệnh dịch ngoài thành","emp","cứu được nhiều người","dịch lan rộng"],
  ["Tranh công","off","giữ được công lao","bị kẻ khác nhận công"],["Dâng sách","emp","sách được dâng lên","sách bị gác xó"],["Y thư thất truyền","emp","y thư được chép vào Thái y viện","giữ riêng một bản","sách cháy, chỉ còn trong trí nhớ"]]);
 def("ty_tra","ty","Đơn thuốc bị tráo","loyal",[["Thang thuốc khác màu","man","nhận ra kịp","không nhận ra"],["Ai chạm vào thuốc","eun","lần ra người chạm thuốc","dấu vết đứt"],
  ["Lời đe dọa","v","đứng vững trước lời dọa","im lặng vì sợ"],["Bệnh nhân trở nặng","bac","cứu được bệnh nhân","bệnh nhân nguy kịch"],["Thái y viện xét việc","off","được tin","bị nghi"],
  ["Chứng cứ","v","giữ được chứng cứ","chứng cứ bị lấy mất"],["Trước mặt Hoàng hậu","hh","lời khai được tin","bị buộc tội"],["Đơn thuốc bị tráo","hh","rửa oan, kẻ tráo thuốc lộ mặt","giữ được tiếng, mất lòng tin","mang tiếng oan, vẫn bị nghi"]]);
 /* vg — Vương gia */
 def("vg_dat","vg","Đất phong","loyal",[["Chiếu ban đất","emp","nhận đất màu mỡ","nhận đất cằn"],["Mùa màng","bac","mùa được","mất mùa"],
  ["Quan địa phương","off","quan địa phương phục","quan địa phương chống"],["Lời gièm vào kinh","emp","lời gièm bị gạt","lời gièm lọt tai Hoàng thượng"],["Thuế đất","bac","nộp đủ thuế","thiếu thuế"],
  ["Thái hậu hỏi han","th","được Thái hậu khen","bị Thái hậu trách"],["Dâng biểu","emp","biểu được chuẩn","biểu bị bác"],["Đất phong","emp","đất phong yên ổn, dân quý","giữ được đất, mất lòng triều","đất phong lụn bại"]]);
 def("vg_bien","vg","Lòng người ngoài biên","loyal",[["Tin biên ải","emp","được đi trấn biên","bị giữ lại kinh"],["Quân lương","bac","đủ quân lương","thiếu quân lương"],
  ["Tướng dưới quyền","gd","tướng dưới quyền phục","tướng dưới quyền ngờ vực"],["Sứ giặc đến","envoy","giữ thể diện triều đình","để sứ giặc lấn lời"],["Trận đầu","gd","thắng trận đầu","thua trận đầu"],
  ["Lời đồn mưu phản","emp","lời đồn tan","lời đồn bám theo"],["Về kinh","emp","về kinh trong vinh dự","về kinh lặng lẽ"],["Lòng người ngoài biên","emp","biên ải yên, lòng người theo","giữ được biên, mất lòng triều","bị Hoàng thượng nghi kỵ"]]);
 /* ns — Nhạc sư · st — Sứ thần · hs — Họa sư */
 def("ns_tho","ns","Khúc nhạc mừng thọ","loyal",[["Lệnh soạn khúc","th","nhận lệnh vui vẻ","nhận lệnh trong lo âu"],["Bản phổ cũ","man","tìm được bản phổ cũ","bản phổ thiếu trang"],
  ["Đàn bị hỏng","bac","sửa được đàn","đàn hỏng hẳn"],["Nhạc công bỏ đi","man","giữ được nhạc công","thiếu người tấu"],["Tập trước Thái hậu","th","Thái hậu gật đầu","Thái hậu nhíu mày"],
  ["Kẻ chép trộm","man","giữ được khúc nhạc","khúc nhạc bị chép trộm"],["Đêm trước tiệc thọ","th","mọi thứ sẵn sàng","còn dở dang"],["Khúc nhạc mừng thọ","th","khúc nhạc vang khắp Đức Thọ cung","tấu xong, không ai nhắc","lạc một nhịp trước Thái hậu"]]);
 def("st_uoc","st","Điều ước hai nước","loyal",[["Quốc thư","envoy","trao quốc thư đúng lễ","sai lễ khi trao quốc thư"],["Lễ bộ tiếp sứ","off","được tiếp đãi chu đáo","bị Lễ bộ làm khó"],
  ["Điều khoản đầu","off","giữ được lợi cho bản quốc","phải nhượng một điều"],["Quà dâng Thái hậu","th","quà được nhận","quà bị trả lại"],["Tai mắt quanh sứ quán","gd","thoát được tai mắt","bị theo dõi sát"],
  ["Hội đàm","emp","hội đàm êm thấm","hội đàm căng thẳng"],["Đóng ấn","emp","ấn được đóng","việc đóng ấn bị hoãn"],["Điều ước hai nước","emp","điều ước thành, hai nước giao hảo","điều ước tạm hoãn","hội đàm đổ vỡ"]]);
 def("hs_hoa","hs","Bức họa mỹ nhân","loyal",[["Lệnh vẽ chân dung","emp","nhận lệnh vẽ","nhận lệnh trong lo sợ"],["Phi tần ngồi họa","v","nét vẽ được khen","bị chê vẽ không giống"],
  ["Bạc lót tay","bac","từ chối bạc lót tay","nhận bạc, vẽ đẹp thêm"],["Bức họa bị đổi","eun","giữ được bức thật","bức họa bị tráo"],["Hoàng thượng xem tranh","emp","Hoàng thượng khen","Hoàng thượng phật ý"],
  ["Lời vu","v","gạt được lời vu","mang tiếng vu"],["Bức họa cuối","emp","hoàn thành bức họa","bức họa dang dở"],["Bức họa mỹ nhân","emp","bức họa treo ở Càn Ninh cung","tranh cất vào kho","bị cấm cầm cọ một thời"]]);
 /* tq — Tổng quản · ksp — Kính sự phòng · eun — tiểu thái giám (staff eunuchs, Nội vụ phủ) */
 def("tq_an","tq","Ấn Tổng quản","loyal",[["Ấn bị dời chỗ","eun","tìm lại ấn","ấn trễ một ngày"],["Kẻ nhòm ngó ghế","eun","dẹp được kẻ nhòm ngó","kẻ nhòm ngó lớn mạnh"],
  ["Sổ chi tiêu","bac","sổ sách sạch","sổ sách hụt"],["Phe phi tần","v","giữ được thế đứng giữa","bị kéo vào một phe"],["Hoàng thượng hỏi tội","emp","được tha","bị quở"],
  ["Thái hậu ra mặt","th","Thái hậu che chở","Thái hậu lạnh nhạt"],["Người nối tay","eun","chọn được người tin cẩn","người nối tay trở mặt"],["Ấn Tổng quản","emp","giữ ấn vững vàng","giữ ấn, mất lòng người dưới","suýt mất ấn"]]);
 def("tq_que","tq","Đường về quê","loyal",[["Thư từ quê","man","thư báo bình an","thư báo tin dữ"],["Xin phép về thăm","emp","được chuẩn","bị bác"],
  ["Gửi bạc về quê","bac","bạc đến nơi","bạc bị chặn"],["Họ hàng tìm đến","man","giúp được họ hàng","họ hàng làm khó"],["Người cũ trong làng","man","gặp lại người cũ","người cũ đã khuất"],
  ["Lời đồn ăn bớt","eun","lời đồn bị bác","lời đồn bám theo"],["Ngôi mộ tổ","bac","sửa được mộ tổ","không kịp sửa mộ"],["Đường về quê","emp","lo xong việc quê, lòng nhẹ nhõm","lo được một nửa","quê nhà xa mãi"]]);
 def("ksp_so","ksp","Sổ ghi Kính sự phòng","loyal",[["Một dòng bị tẩy","eun","phát hiện kịp","không ai hay"],["Thẻ bài lật sai","emp","sửa được sai sót","sai sót đến tai bề trên"],
  ["Phi tần đút lót","v","từ chối khéo","nhận bạc, mang nợ"],["Hoàng hậu xem sổ","hh","sổ sạch","sổ có chỗ lạ"],["Kẻ chép sổ","eun","giữ được sổ","sổ bị chép ra ngoài"],
  ["Tin có thai","man","ghi đúng ngày","ghi lệch ngày"],["Sổ được trình","emp","sổ khớp từng dòng","sổ lệch một dòng"],["Sổ ghi Kính sự phòng","emp","sổ được tin như vàng","giữ được sổ, người ghi bị nghi","sổ thành mối họa"]]);
 def("eun_len","eun","Từ tiểu thái giám đi lên","loyal",[["Việc nặng đầu tiên","eun","làm xong chu toàn","làm hỏng việc"],["Sư phụ","eun","được sư phụ nhận dạy","bị sư phụ bỏ"],
  ["Đồng liêu chèn ép","eun","qua được chèn ép","bị chèn ép"],["Việc kín của chủ","mis","giữ kín việc của chủ","để lộ việc của chủ"],["Bạc đầu tiên","bac","để dành được bạc","mất bạc"],
  ["Được giao việc lớn","mis","việc lớn thành","việc lớn hỏng"],["Lời tiến cử","eun","được tiến cử","bị gạt tên"],["Từ tiểu thái giám đi lên","mis","thành người tin cẩn của chủ","vẫn là kẻ hầu lặng lẽ","bị chủ ghẻ lạnh"]]);
 /* off — the five house heads (j55) */
 def("off_ghe","off","Giữ ghế trong triều","sk",[["Tờ biểu đầu năm","emp","biểu được khen","biểu bị chê"],["Kẻ dòm ghế","off","dẹp được kẻ dòm ghế","kẻ dòm ghế lớn mạnh"],
  ["Việc trong bộ","off","việc trong bộ trôi chảy","việc trong bộ ách tắc"],["Ngự sử xét sổ","off","qua được kỳ xét","bị bắt lỗi"],["Lòng Hoàng thượng","emp","Hoàng thượng tin","Hoàng thượng ngờ"],
  ["Môn sinh","off","môn sinh đắc lực","môn sinh phản thầy"],["Buổi chầu lớn","emp","đứng vững trước triều","bị triều thần vây"],["Giữ ghế trong triều","emp","ghế vững như bàn thạch","giữ được ghế, mất bè cánh","ghế lung lay"]]);
 def("off_dan","off","Lời đàn hặc","sk",[["Tấu đàn hặc","off","tấu bị gạt","tấu được đem ra nghị"],["Ngự sử tra xét","off","sổ sách sạch","sổ sách có vết"],
  ["Đồng minh trong triều","off","đồng minh đứng ra","đồng minh im lặng"],["Chứng cứ","off","chứng cứ bị bác","chứng cứ được tin"],["Lời trong hậu cung","hh","hậu cung nói đỡ","hậu cung im lặng"],
  ["Đại Lý tự xét","off","được minh oan một phần","bị kết một tội nhẹ"],["Hoàng thượng định đoạt","emp","được tha","bị phạt bổng"],["Lời đàn hặc","emp","rửa sạch, kẻ đàn hặc mất mặt","qua được, tiếng còn vương","mang tội, phủ suy"]]);
 def("off_thong","off","Thông gia với phủ khác","sk",[["Lời ngỏ","off","lời ngỏ được nhận","lời ngỏ bị từ chối"],["Xem tuổi","off","tuổi hợp","tuổi xung"],
  ["Sính lễ","bac","sính lễ xứng","sính lễ thiếu"],["Kẻ chen ngang","off","gạt được kẻ chen ngang","bị kẻ chen ngang phá"],["Hoàng thượng hỏi đến","emp","Hoàng thượng chuẩn","Hoàng thượng chần chừ"],
  ["Lời đồn trong kinh","off","lời đồn tan","lời đồn làm hai phủ ngờ nhau"],["Ngày cưới","off","lễ cưới linh đình","lễ cưới lặng lẽ"],["Thông gia với phủ khác","emp","hai phủ kết thành một khối","thông gia mà không thân","hôn sự đổ vỡ, hai phủ thành thù"]]);
 NRM.off_thong.ally=1;/* this road's other house is the partner, not the foe: a win binds the two houses (j55 rel +), a loss splits them */
 /* hz — sons of NPC consorts (BAL.nroad.men.kidAge) */
 def("hz_hoc","hz","Thái phó và học vấn","tal",[["Ngày đầu ở Thượng thư phòng","off","được Thái phó khen","bị Thái phó phạt"],["Kinh sử","off","thuộc làu kinh sử","học trước quên sau"],
  ["Đồng môn","off","kết thân với đồng môn","bất hòa với đồng môn"],["Phụ hoàng khảo bài","emp","trả lời trôi chảy","ấp úng trước phụ hoàng"],["Cưỡi ngựa bắn cung","gd","bắn trúng hồng tâm","ngã ngựa"],
  ["Bài văn đầu tay","off","bài văn được truyền tay","bài văn bị chê"],["Kỳ khảo cuối","emp","đứng đầu các hoàng tử","đứng sau các hoàng tử"],["Thái phó và học vấn","emp","văn võ song toàn, phụ hoàng đẹp lòng","học hành bình thường","bị phụ hoàng chê lười"]]);
 def("hz_le","hz","Lễ trưởng thành","tal",[["Lễ đội mũ","emp","được ban áo mũ","lễ bị hoãn"],["Phủ đệ đầu tiên","bac","phủ đệ chu toàn","phủ đệ thiếu thốn"],
  ["Người hầu cận","eun","chọn được người hầu tin cẩn","người hầu ăn bớt"],["Ra mắt tông thân","th","tông thân khen","tông thân chê"],["Việc triều đầu tiên","off","làm tròn việc","làm hỏng việc"],
  ["Lời khuyên của mẫu phi","mom","nghe lời mẫu phi","trái ý mẫu phi"],["Phụ hoàng ban thưởng","emp","được ban thưởng","không được nhắc tên"],["Lễ trưởng thành","emp","được phụ hoàng tin giao việc","trưởng thành lặng lẽ","bị chê chưa ra dáng"]]);
 def("hz_tran","hz","Ra trận lập công","tal",[["Xin ra trận","emp","được chuẩn","bị giữ lại"],["Tướng già dạy việc","gd","được tướng già nhận dạy","bị tướng già coi thường"],
  ["Quân lương","bac","quân lương đủ","quân lương thiếu"],["Trận đầu","gd","thắng trận đầu","thua trận đầu"],["Thư mẫu phi","mom","thư đến kịp","thư thất lạc"],
  ["Công và tội","off","công được ghi","tội bị kể"],["Khải hoàn","emp","khải hoàn trong tiếng reo","trở về lặng lẽ"],["Ra trận lập công","emp","lập công lớn, phụ hoàng ban thưởng","về bình an, công nhỏ","bại trận, mang tiếng"]]);
})();

/* ---------- the men of this life (real people only) ---------- */
const NRMR={"Thị vệ":"gd","Thái y":"ty","Vương gia":"vg","Nhạc sư":"ns","Sứ thần":"st","Họa sư":"hs"};
function nrMenL(){const L=[];const B=nrB().men;
 for(const m of(S.men||[]))if(m&&m.alive!==false&&m.id!=="m96"&&NRMR[m.role])L.push({p:m,k:NRMR[m.role],a:["man",m.id],g:"men",n:m.name});
 const C=S.court||{};for(const [c,k,a] of [["tq","tq",["eun",null]],["ksp","ksp",["ksp",null]],["ty","ty",["doc",null]],["ped","eun",null]])if(C[c]&&C[c].name)L.push({p:C[c],k,a,g:"court",n:C[c].name});
 try{const T=trS();if(T)for(const c in T.H){const h=T.H[c];if(h&&h.dadOf!=="me")L.push({p:h,k:"off",a:["off",c],g:"off",c,n:`${TDOFF[c]||c} ${h.name}`})}}catch(e){}
 try{for(const [kd,mo] of allKids())if(mo&&kd&&kd.sex==="m"&&kd.alive&&(kd.age||0)>=B.kidAge)L.push({p:kd,k:"hz",a:null,g:"hz",mo,n:kd.name})}catch(e){}
 return L}
function nrMenInit(e){const p=e.p;if(p.nr)return p.nr;const held=nrMenL().filter(x=>x.k===e.k&&x.p!==p&&x.p.nr&&!x.p.nr.x).map(x=>x.p.nr.r);const r=nrPickRoad(e.k,held);if(!r)return null;p.nr=nrNew(e.k,r);return p.nr}
/* his test stat: the template's stat on him (S.men loyal, house head sk, prince tal); court men have none → BAL.nroad.men.st */
function nrMenStat(e){const T=NRM[e.p.nr.r];const v=T&&e.p[T.sk];return typeof v==="number"?v:nrB().men.st}
const nrCKey=p=>p===S?"me":p.id;
function nrCWho(k){return k==="me"?S:RV(k)}
/* his rival (kept for the whole road; recast and told when gone) */
function nrMenRival(e){const N=e.p.nr;const B=nrB().men;
 if(e.g==="men"){const L=(S.men||[]).filter(m=>m!==e.p&&m.alive!==false&&m.id!=="m96");const p=N.c!=null&&L.find(m=>m.id===N.c);if(p)return p;if(N.c!=null){N.rc=N.cn||"";N.c=null}if(!L.length)return null;const q=pick(L);N.c=q.id;N.cn=q.name;return q}
 if(e.g==="off"){const T=trS();const L=Object.keys(T.H).filter(c=>c!==e.c);if(N.c&&L.includes(N.c))return N.c;if(!L.length)return null;
  L.sort((a,b)=>NRM[N.r].ally?tdRel(e.c,b)-tdRel(e.c,a):tdRel(e.c,a)-tdRel(e.c,b));N.c=L[Math.min(L.length-1,R(Math.min(nrB().offTop,L.length)))];return N.c}
 if(e.g==="hz"){const L=allKids().map(z=>z[0]).filter(k=>k!==e.p&&k.sex==="m"&&k.alive);const p=N.c&&L.find(k=>k.name===N.c);if(p)return p;if(N.c){N.rc=N.c;N.c=null}if(!L.length)return null;const q=pick(L);N.c=q.name;return q}
 /* court men: the consort he leans toward (patron pk) and the one he leans against (c), from his af (key "me" = the player) */
 const C=liveRivals(true).filter(p=>!p.coop).concat(S.out||S.dead||nrLearn()?[]:[S]);const af=p=>(e.p.af&&e.p.af[nrCKey(p)])||0;
 const ok=k=>{const p=k!=null&&nrCWho(k);return p&&(p===S||p.alive&&!p.out)};
 if(!ok(N.pk)||!ok(N.c)){if(N.c!=null&&!ok(N.c)){const o=RV(N.c);N.rc=o?o.name:""}if(C.length<2)return null;C.sort((a,b)=>af(b)-af(a));N.pk=nrCKey(C[0]);N.c=nrCKey(C[C.length-1])}
 return nrCWho(N.c)}
const nrMy=k=>allKids().some(z=>z[0]===k&&!z[1]);
function nrMenPlay(e){const p=e.p,N=p.nr,A=nrCh(N.r,N.n);if(!A){N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;return null}const B=nrB(),M=B.men;
 const pr=odA(p,B.base+nrMenStat(e)/B.div+(N.k>0?B.sc:0)+(N.hb||0));const k=roll(pr)?1:roll(pr/2)?0:-1;
 const riv=nrMenRival(e);let me="",hit=false;const w=k>0?"win":"lose";
 if(e.g==="men"){const fx=k>0?M.men.fx.win:k<0?M.men.fx.lose:M.men.fx.mid;for(const z in fx)p[z]=cl((p[z]||B.loy0)+fx[z],0,100);
  if(riv&&k!==0)riv.loyal=cl((riv.loyal||B.loy0)+M.men.rv[w],0,100)}
 else if(e.g==="off"){const ally=NRM[N.r].ally;if(k!==0){tdPowAdd(e.c,M.off.pow[w]);if(riv){tdPowAdd(riv,M.off.rv[w]);tdRelAdd(e.c,riv,ally?(k>0?M.off.ally:-M.off.ally):-M.off.rel)}}
  if(riv&&riv===tdHouse(S)&&k!==0){hit=true;me=ally?(k>0?" Nhà ngươi thêm một chỗ dựa.":" Nhà ngươi với phủ ấy thêm hiềm khích."):(k>0?" Nhà ngươi bị lấn một bước.":" Nhà ngươi bớt một mối lo.")}}
 else if(e.g==="hz"){const fx=k>0?M.hz.fx.win:k<0?M.hz.fx.lose:M.hz.fx.mid;for(const z in fx)p[z]=cl((p[z]||0)+fx[z],0,100);
  if(riv&&k!==0){riv.fond=cl((riv.fond||0)+M.hz.rv[w],0,100);if(nrMy(riv)){hit=true;me=k>0?` ${riv.name} bị lép một phần trước phụ hoàng.`:` ${riv.name} được phụ hoàng để mắt hơn.`}}}
 else{/* court */const pk=N.pk,ck=N.c;p.af=p.af||{};if(pk!=null&&k!==0){p.af[pk]=cl((p.af[pk]||0)+(k>0?M.court.af:-M.court.af),-100,100);
   if(k>0&&ck!=null)p.af[ck]=cl((p.af[ck]||0)-M.court.af,-100,100);if(k<0){const pp=nrCWho(pk);if(pp)ap(pp,{danh:-M.court.danh})}}
  if(k!==0&&(pk==="me"||ck==="me")){hit=true;me=pk==="me"?(k>0?" Hắn nghiêng về phía ngươi thêm một phần.":" Hắn vấp ngã, ngươi mang tiếng lây."):(k>0?" Hắn càng xa ngươi.":"")}}
 const tag=nrEnd(A,k,"hắn");N.e=tag;N.k=k;N.l.push([N.n,k]);N.hb=0;const n0=N.n;N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;
 N.t=S.turn+nrR(B.gap);if(N.h&&N.h<=n0)N.hs=N.hs||-1;
 const rn=riv&&typeof riv==="object"?(riv===S?"ngươi":riv.name):typeof riv==="string"?(TDOFF[riv]||riv):"người khác";
 const rc=N.rc?` ${N.rc} nay không còn, kẻ đứng đối mặt hắn là ${rn}.`:"";N.rc="";
 return {n:n0,t:plain(A.t),tag,k,rc,me,hit}}
/* motive to ask the player (real reasons only): a man fond of her (tinh), a court man / house head who leans to her (af.me), a house
   allied with hers; princes and the Nội vụ phủ buyer never ask (their mother / their master does) */
function nrMenAsk(e){try{if(isSrv()||S.out||nrLearn()||!e.a)return false;const M=nrB().men,p=e.p;
 if(e.g==="men")return (p.tinh||0)>=M.askTinh;const af=(p.af&&p.af.me)||0;if(af>=M.askAf)return true;
 if(e.g==="off"){const h=tdHouse(S);return !!(h&&tdRel(e.c,h)>=M.askRel)}return false}catch(x){return false}}
function nrMenOffer(e){const N=e.p.nr,A=nrCh(N.r,N.n);if(!A||!e.a||typeof q72!=="function")return false;const hk=nrKind(A);if(!T72I["nr_"+hk])return false;const q=q72();if(!q)return false;
 const [rk,ri]=e.a;if(q.ch.concat(q.a).some(c=>nrSameA(c,rk,ri)&&/^nr_/.test(c.tid)))return false;
 const riv=nrMenRival(e);let bk=null,bi=null;if(e.g==="men"&&riv){bk="man";bi=riv.id}else if(e.g==="off"&&riv){bk="off";bi=riv}else if(e.g==="court"&&riv&&riv!==S){bk=riv.queen?"hh":"rv";bi=riv.id}
 q.ch.push({tid:"nr_"+hk,at:wk(),rk,ri,bk,bi,p:{nr:N.r,nn:N.n}});N.hk=hk;N.hs=1;N.t=Math.max(N.t,S.turn+Math.ceil((nrB().dl+2)/3));return true}
function nrMenMonth(news){const B=nrB();let n=news||0;
 for(const e of nrMenL()){try{const N=e.p.nr||nrMenInit(e);if(!N||N.x||!N.n||S.turn<N.t)continue;
  if(N.h&&N.n===N.h&&!N.hs&&nrMenAsk(e)&&nrMenOffer(e))continue;
  /* fix (r1 finding 6, whole group): his help hồi decides THIS chapter — wait while the player works on it; an unshown request is withdrawn */
  if(N.hs===1&&e.a&&nrHoldM(x=>nrSameA(x,e.a[0],e.a[1])))continue;
  const r=nrMenPlay(e);if(!r)continue;
  const line=`<span class="past">${e.g==="off"?"Tin trong triều":"Tin trong cung"} · ${e.n} · «${nrTitle(N.r)}» chương ${r.n}: «${r.t}»${r.tag?` — ${r.tag}`:""}.${r.rc}${r.me}</span>`;
  if(r.hit||n<B.newsMo){log(line);n++}}catch(x){console.error(x)}}
 return n}
/* the voice of a man in the help hồi (VANPHONG §2): eunuchs nô tài, a Vương gia bản vương, other men and officials thần */
function nrVoiceM(X,goi){const k=X&&X.A&&X.A.k;if(k==="eun"||k==="ksp")return{me:"nô tài",call:goi()};
 if(k==="man")return{me:X.A.o&&X.A.o.role==="Vương gia"?"bản vương":"thần",call:goi()};if(k==="doc"||k==="off")return{me:"thần",call:goi()};return null}
/* his road on his card (Nam nhân / Kẻ hầu / Triều đình / con cái cards): one more line of the kit person card (pcard lines, j70 pattern) */
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&!window.__nroff&&o&&o.name&&!(o.lines||[]).some(l=>/Tuyến truyện:/.test(l))){
  const sn=x=>typeof shortN==="function"?shortN(x):x;const e=nrMenL().find(z=>z.p.nr&&(z.n===o.name||z.p.name===o.name||sn(z.p.name)===o.name));
  if(e){const l=nrLine(e.p);if(l){o=Object.assign({},o);o.lines=(o.lines||[]).concat([l])}}}}catch(x){console.error(x)}return p0.call(this,o)}})();
window.nrMenL=nrMenL;window.nrMenInit=nrMenInit;window.nrMenPlay=nrMenPlay;
