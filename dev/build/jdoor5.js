/* ================= jdoor5: act-merge J5 rule tables for the ONE door engine (jdoor.js, owned by J1) =================
   Cung nữ pop-ups (srvTalk by person, kind "srv"). Only TRUE duplicates fold (owner 26/11 ~07:32Z); every other act stays its own button.
   A door needs >= 2 members on that person today; the members are the old items UNCHANGED (price, lock, roll, result), run through talk(-1-j). No number typed (law 4). */
(function(){if(typeof DOOR==="undefined"||!DOOR.add)return;
[{k:"s_xin",n:"Xin chủ",kinds:["srv"],rep:"Xin chủ ban thưởng",h:"Xin chủ một ân điển: thưởng, tiến cử, hay cho đi nơi khác.",
  re:/^(Xin chủ ban thưởng|Xin chủ tiến cử lên Nội vụ phủ|Xin chủ cho đi hầu cung khác)$/},
 {k:"s_phan",n:"Phản chủ",kinds:["srv"],rep:"Mật báo",h:"Quay lưng với chủ: mật báo, hay tố cáo trước Hoàng hậu.",
  re:/^(Mật báo chuyện của |Tố cáo .+ trước Hoàng hậu)/},
 {k:"s_gh",n:"Giao hảo",kinds:["srv"],rep:"Trò chuyện",h:"Kết thân với người hầu khác: trò chuyện, hay biếu chút quà.",
  re:/^(Trò chuyện|Biếu quà nhỏ)$/}
].forEach(DOOR.add)})();
