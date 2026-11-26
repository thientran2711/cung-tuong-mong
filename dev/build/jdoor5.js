/* ================= jdoor5: act-merge J5 rule tables for the ONE door engine (jdoor.js, owned by J1) =================
   Cung nữ pop-ups (srvTalk by person, kind "srv") + the DECK doors of the three roads (cung nữ Phận sự, lãnh cung, khuê các). Only TRUE duplicates fold (owner 26/11 ~07:32Z); every other act stays its own button.
   A door needs >= 2 members on that person today; the members are the old items UNCHANGED (price, lock, roll, result), run through talk(-1-j). No number typed (law 4). */
(function(){if(typeof DOOR==="undefined"||!DOOR.add)return;
[{k:"s_xin",n:"Xin chủ",kinds:["srv"],rep:"Xin chủ ban thưởng",h:"Xin chủ một ân điển: thưởng, tiến cử, hay cho đi nơi khác.",
  re:/^(Xin chủ ban thưởng|Xin chủ tiến cử lên Nội vụ phủ|Xin chủ cho đi hầu cung khác)$/},
 {k:"s_phan",n:"Phản chủ",kinds:["srv"],rep:"Mật báo",h:"Quay lưng với chủ: mật báo, hay tố cáo trước Hoàng hậu.",
  re:/^(Mật báo chuyện của |Tố cáo .+ trước Hoàng hậu)/},
 {k:"s_gh",n:"Giao hảo",kinds:["srv"],rep:"Trò chuyện",h:"Kết thân với người hầu khác: trò chuyện, hay biếu chút quà.",
  re:/^(Trò chuyện|Biếu quà nhỏ)$/}
].forEach(DOOR.add);
/* ---- deck doors (jdoor.js DOOR.deck) ---- */
const SRVG=[
 {n:"Hầu việc",t:"Việc hằng ngày hầu chủ trong cung: chọn một việc.",re:/^(Quét sân, lau điện|Đốc thúc cung nữ quét dọn|Dâng trà, hầu điểm tâm|Theo hầu chủ|Lĩnh đồ ở Nội vụ phủ|Việc chủ sai|Quản sổ sách trong cung|Hầu trà khi ngự giá|Lui sau bình phong)$/},
 {n:"Dò la cho chủ",t:"Thay chủ để mắt đến người khác: chọn cách làm.",re:/^(Nghe ngóng cho chủ|Tự đi dò la cho chủ|Canh chừng cung chủ)$/},
 {n:"Học",t:"Học thêm một nghề hay một lễ: chọn môn.",re:/^(Học lễ nghi với cô cô|Luyện thêu thùa, chữ nghĩa)$/},
 {n:"Nghỉ ngơi",t:"Lấy lại sức và sắc: chọn cách nghỉ.",re:/^(Nghỉ lấy sức|Chải chuốt, giữ nhan sắc|Mua thuốc bổ)$/},
 {n:"Kiếm thêm",t:"Kiếm thêm chút bạc ngoài phần lương: chọn đường.",re:/^(Thêu khăn bán ra ngoài|Lén giữ đồ Nội vụ phủ phát)$/}];
const COLDG=[
 {n:"Nghỉ ngơi",t:"Một lúc yên tĩnh trong lãnh cung: chọn cách nghỉ.",re:/^(Nghỉ ngơi một lát|Đọc sách giải khuây)$/},
 {n:"Xin ân xá",t:"Xin được tha khỏi lãnh cung: chọn đường xin.",re:/^(Cầu xin|Gửi bài thơ cũ|Nhờ .+ cầu xin)$/},
 {n:"Kêu oan",t:"Nhờ người ngoài kêu oan thay ngươi: chọn người nhờ.",re:/^(Nhờ người bên ngoài|Nhờ .+ đưa thư kêu oan)$/},
 {n:"Kiếm sống",t:"Làm lụng kiếm chút bạc và rau ăn: chọn việc.",re:/^(Trồng rau|Thêu khăn bán)$/},
 {n:"Rời cung",t:"Rời hẳn chốn này: chọn đường đi.",re:/^(Xuất gia|Nghĩ cách trốn khỏi cung|Xin phế làm thứ dân)$/},
 /* the same letter by two carriers (thái giám đưa cơm / cung nữ thân tín) = ONE letter card, the carrier is the way */
 {key:a=>{const m=/^(Gửi thư .+?) \(nhờ .+\)$/.exec(a.n||"");return m?m[1]:null},t:"Một bức thư gửi ra ngoài: chọn người đưa thư."}];
/* khuê các (G13, same rule: only TRUE duplicates). Two kinds of duplicate: (1) a TWIN = the card that already says tw:"<the card it mirrors>" (r2, owner 15/11: the same act paid in
   bạc or in Sức / khắc / a favour — law 2 equal-value ways of ONE act, kept on every road jkc / jkc2 / jkc3); (2) acts of one purpose with the SAME result,
   named below. Everything else (a person's own thỉnh an, hầu cha, the places chùa / chợ / trà lâu / thư phường, Gặp riêng, scene cards) stays its own button. */
const KCR=[
 [/^(?:Làm vừa lòng|Hầu) (.+?)(?: trọn buổi)?$/,m=>`Hầu ${m[1]}`,"Hầu người nhà: dâng quà, hay ngồi hầu trọn buổi."],
 [/^(?:Kết thân|Giúp) (.+?)(?: một việc)?$/,m=>`Gần gũi ${m[1]}`,"Gần gũi người nhà: tặng quà nhỏ, hay giúp một việc."],
 [/^(?:Sai tỳ nữ )?[Nn]gáng chân (.+)$/,m=>`Hại ${m[1]}`,"Ngáng chân kẻ đối đầu: tự tay làm, hay sai tỳ nữ."],
 [/^(?:Dò la viện|Sai tỳ nữ nghe ngóng viện|Rình viện) (.+?)(?: cả đêm)?$/,m=>`Dò xét viện ${m[1]}`,"Dò xem viện ấy bàn tính gì: chọn cách dò."],
 [/^(?:Đi lễ chùa|Lên chùa chép kinh)$/,()=>"Lễ chùa","Lên chùa: dâng lễ, hay chép kinh giúp nhà chùa."],
 [/^(?:Dạo phố chợ|Đi xem chợ, không mua)$/,()=>"Ra chợ","Ra chợ nghe tin: mua sắm, hay chỉ đi xem."],
 [/^(?:Nghe chuyện ở trà lâu|Nghe lỏm ngoài hiên trà lâu)$/,()=>"Nghe tin ở trà lâu","Nghe khách bàn chuyện cung đình: thuê nhã gian, hay đứng ngoài hiên."],
 [/^(?:Lựa sách ở thư phường|Đứng đọc ở thư phường)$/,()=>"Thư phường","Đến thư phường: mua sách, hay đứng đọc."],
 [/^(?:Thăm|Mang bánh nhà làm thăm) (.+)$/,m=>`Đi thăm ${m[1]}`,"Sang phủ thế giao thăm bạn: mang lễ, hay mang bánh nhà làm."],
 [/^(?:Giả bệnh tránh xem mặt|Nhịn ăn tránh xem mặt|Khéo từ chối nhà .+)$/,()=>"Tránh xem mặt","Bỏ mối xem mặt này: khéo từ chối, giả bệnh, hay nhịn ăn."],
 [/^(?:Gửi thư cho người ấy|Tự tay đưa thư cho người ấy)$/,()=>"Thư cho người ấy","Gửi thư cho người ấy: nhờ tỳ nữ, hay tự tay đưa."],
 [/^(?:Viết thư vào cung|Gửi thư theo người đi chợ|Mua tin của thái giám ra cung|Nhờ huynh trưởng dò tin trong cung)$/,()=>"Dò tin trong cung","Biết thêm về các phi tần trong cung: chọn đường."],
 [/^(?:Gửi quà vào cung cho|Gửi bức thêu tự tay làm cho) (.+)$/,m=>`Gửi lễ cho ${m[1]}`,"Gửi lễ vào cung: mua quà, hay tự tay thêu."],
 [/^(?:Học lễ nghi cung đình|Tự học lễ nghi theo sách)$/,()=>"Học lễ nghi","Học lễ nghi: theo ma ma xuất cung, hay tự học theo sách."],
 [/^(?:Mời danh sư|Xin tổ mẫu mời danh sư)$/,()=>"Mời thầy giỏi","Mời thầy giỏi về dạy: dùng bạc, hay nhờ tổ mẫu."],
 [/^(?:Xin cha dâng sớ tiến cử|Nhờ tổ mẫu khuyên cha dâng sớ)$/,()=>"Xin vào cung sớm","Đưa ngươi vào cung sớm: xin cha, hay nhờ tổ mẫu khuyên cha."]];
const TWN={"Mua thuốc cho mẹ":"Thuốc cho mẹ","Góp bạc cưới vợ cho huynh trưởng":"Cưới vợ cho huynh trưởng","Trả bớt nợ nhà lý trưởng":"Trả nợ nhà lý trưởng","Biếu quà lý trưởng":"Lễ lý trưởng","Học lễ nghi với bà Tư":"Học lễ nghi bà Tư","Học lễ nghi Đại Hy với ma ma sứ đoàn":"Học lễ nghi Đại Hy","Gửi lễ vật cho sứ thần":"Lễ vật cho sứ thần"};

/* register: SRVG → cung nữ Phận sự, COLDG → lãnh cung, KCR + tw twins → khuê các */
SRVG.forEach((r,i)=>DOOR.deck({k:"d_srv"+i,n:r.n,roads:["srv"],t:r.t,re:r.re}));
COLDG.forEach((r,i)=>DOOR.deck(r.key?{k:"d_cold"+i,n:r.n||"letter",roads:["cold"],t:r.t,key:r.key}:{k:"d_cold"+i,n:r.n,roads:["cold"],t:r.t,re:r.re}));
DOOR.deck({k:"d_kc",n:"kc",roads:["kc"],
 key:(a,L)=>{for(const [re,f] of KCR){const m=re.exec(a.n||"");if(m)return f(m)}
  const tw=new Set(L.filter(x=>x&&x.tw).map(x=>x.tw));const b=a.tw||(tw.has(a.n)?a.n:null);return b?(TWN[b]||b+" (cách khác)"):null},
 t:(key,ways)=>{for(const [re,f,t] of KCR)if(ways.every(w=>re.test(w.n||"")))return t;return"Một việc, hai đường: chọn cách làm (mỗi cách tốn khác nhau)."}});
})();
