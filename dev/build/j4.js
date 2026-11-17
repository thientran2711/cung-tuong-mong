
/* origin storylines */
function stEnd(r,tag){S.st.done=r;S.st.tag=tag;if(r===1&&!S.dead)bestow(S,"story")}
function setDil(d){return pushDil(d,"Tuyến truyện")}
function storyMonth(){const s=STORY[S.origin.k];if(S.st.done||!s.month)return"";return s.month()||""}
const STORY={
tt:{t:"Quân cờ của Tể tướng",n:3,goal:"Cha ngươi dùng ngươi làm tai mắt trong cung. Đi đến cùng ván cờ của ông, hoặc lật bàn cờ.",
 init(){S.st.loy=0},
 hint:()=>["Đợi thư nhà","Phe ngoại thích của Hoàng hậu sắp ra tay","Cha đang ngầm điều binh (từ năm thứ 4, hoặc khi ngươi có hoàng tử)"][S.st.step]||"",
 month(){const st=S.st;
  if(st.step===0&&S.turn>=2&&roll(30))return setDil(mkP("tt1"));
  if(st.step===1&&roll(25))return setDil(mkP("tt2"));
  if(st.step===2&&(S.year>=4||mySons().length)&&roll(25)){const son=mySons()[0],o=od(25+st.loy*15+S.tamco/4);
   return setDil(mkP("tt3",{son:son?son.name:null,o}))}
  return""}},
dtq:{t:"Trung thần nơi biên ải",n:3,goal:"Cha ngươi trấn giữ biên cương; thắng bại ngoài ải là vinh nhục của ngươi. Khi có kẻ vu cha mưu phản, phải tìm đủ chứng cứ trong hạn.",
 init(){S.st.proof=0;S.st.acc=0},
 hint:()=>S.st.acc?`Còn ${Math.max(0,S.st.acc-S.turn)} tháng, chứng cứ ${S.st.proof}/2`:`Tháng 4 hằng năm có tin biên ải (thắng: ${chanceW(55)}); từ năm thứ 3, mỗi tháng có kẻ vu cha: ${chanceW(15)}`,
 month(){const st=S.st;let ev="";
  if(S.month===4&&S.turn>1){if(roll(55)){apply({danh:4,sung:3});S.emp.mood=0;ev+=`<span class="g">Tin thắng trận từ biên ải: cha ngươi phá tan quân giặc.</span> Danh +4 · Sủng +3. `}else{apply({danh:-4,sung:-3});S.emp.mood=2;ev+=`<span class="r">Cha ngươi thua một trận ở Nhạn Môn quan.</span> Danh -4 · Sủng -3. `}}
  if(!st.acc&&S.year>=3&&roll(15)){const p=liveRivals(false);if(p.length){const v=mindPickBy(p,x=>Math.max(BAL.mind.pick.j4.floor,BAL.mind.pick.j4.top-(x.rel||0))*mindW(x,"frame"),null);/* npc-mind: was ARGMIN rel */st.acc=S.turn+8;st.accuser=v;st.step=1;v.rel-=10;ev+=`<span class="r">${v.name} xúi cha nàng dâng sớ: Đại tướng quân giữ binh không về, có lòng phản.</span> Hoàng thượng cho 8 tháng tra xét. `}}
  else if(st.acc&&S.turn>=st.acc&&st.proof<2){apply({danh:-20,sung:-15});S.rank=seatDown(S,S.rank-2);stEnd(-1,"Cha bị xử trảm");ev+=`<span class="r">Hết hạn tra xét. Cha ngươi bị xử trảm, ngươi bị giáng xuống ${RANKS[S.rank].n}.</span> Danh -20 · Sủng -15. `}
  return ev},
 acts(){const st=S.st;if(!st.acc)return[];return[{n:"Tìm chứng cứ cha trung thành",t:`Tra quân báo, tìm người làm chứng. Còn ${Math.max(0,st.acc-S.turn)} tháng · chứng cứ ${st.proof}/2.`,c:{bac:-20,suc:-10},o:od(40+S.mat*6+S.tamco/5),w:{},l:{danh:-2},x:"chứng cứ +1",
  go:()=>{st.proof++;st.step=1+st.proof;if(st.proof>=2){const v=st.accuser;apply({danh:8});stEnd(1,"Rửa oan cho cha");log(`<b class="g">Chứng cứ trình lên: cha ngươi trong sạch.</b> Danh +8.`);if(v&&v.alive&&!v.out)fall(v,"bị xét tội vu cáo trung thần")}}}]}},
muoi:{t:"Từ muối lên tước",n:3,goal:"Nhà buôn muối bị coi khinh. Dâng bạc vào quốc khố, được Thái hậu đỡ lời, xin cho cha được phong tước. Buôn lậu bị bắt ba lần là ô danh.",
 init(){S.st.don=0;S.st.caught=0},
 hint:()=>S.st.don<2?`Dâng bạc quốc khố ${S.st.don}/2`:"Xin phong tước cho cha (cần Thái hậu 30)",
 month(){if(roll(12)){apply({danh:-1});return `Các phi tần che miệng cười: “Người có mùi muối.” Danh -1. `}return""},
 acts(){const st=S.st,A=[{n:"Buôn bán lén trong cung",t:"Mua rẻ lụa ngoài cung, bán đắt cho cung nhân.",c:{suc:-5},o:od(65+S.tamco/5),w:{bac:50},l:{danh:-8},x:`bị bắt ${S.st.caught||0}/3 lần thì ô danh, hỏng tuyến truyện`,
  fail:()=>{st.caught++;punish("buôn lậu trong cung",2);if(st.caught>=3){apply({sung:-10});stEnd(-1,"Buôn lậu bị bắt, ô danh");log(`<span class="r">Bị bắt buôn lậu lần thứ hai. Cả cung khinh rẻ ngươi.</span>`)}}}];
  if(st.don<2)A.push({n:"Dâng bạc vào quốc khố",t:"Lấy danh nghĩa cha, giúp triều đình cứu đói.",c:{bac:-100},o:100,w:{danh:3,th:3},x:`lần dâng ${st.don+1}/2`,go:()=>{st.don++;st.step=st.don}});
  else A.push({n:"Xin phong tước cho cha",t:S.th>=30?"Nhờ Thái hậu nói giúp trước mặt Hoàng thượng.":`Cần Thái hậu ủng hộ 30 (nay ${S.th}).`,c:{suc:-5},o:od(45+S.danh/4+S.th/5),w:{danh:10},l:{th:-8},lock:S.th<30,x:"cha được phong tước",go:()=>{st.step=3;stEnd(1,"Nhà được phong tước")}});
  return A}},
cn:{t:"Từ nô tỳ thành chủ tử",n:3,goal:"Chủ cũ khinh ngươi, một mối tình cũ đe dọa hủy ngươi. Lên tới bậc Phi để rửa sạch thân phận.",
 init(){const v=rivals[1+R(4)];v.oldmis=true;v.rel=-25;S.st.mis=v;S.st.guard="thị vệ "+pick(SURN)+" "+pick(MALEN);S.st.secret=0},
 hint:()=>["Chủ cũ sắp làm khó ngươi","Chuyện cũ sắp bị khơi lại",`Lên bậc Phi (nay ${RANKS[S.rank].n})`][S.st.step]||"",
 month(){const st=S.st,m=st.mis;
  if(st.secret===1&&roll(5)){apply({danh:-20,sung:-20});punish("tư tình với thị vệ",2);stEnd(-1,"Lộ chuyện cũ với thị vệ");return `<span class="r">Thư cũ giữa ngươi và ${st.guard} lọt đến tay Hoàng thượng.</span> Danh -20 · Sủng -20. `}
  if(st.step===0&&S.turn>=2&&roll(30))return setDil(mkP("cn1"));
  if(st.step===1&&roll(25)){const o=od(50+S.tamco/3);return setDil(mkP("cn2",{o}))}
  if(st.step===2&&S.rank>=4){apply({danh:5});st.step=3;stEnd(1,"Rửa sạch thân phận cung nữ");return `<b class="g">Ngươi đã là ${RANKS[S.rank].n}. Không ai còn dám gọi ngươi là nô tỳ.</b> Danh +5. `}
  return""}},
nc:{t:"Hòa thân",n:3,goal:"Phụ vương Nam Chiếu muốn ngươi làm tai mắt. Chọn cố quốc hay triều đình; chiến tranh sẽ phân xử.",
 init(){S.st.m=0},
 hint:()=>S.st.step===0?"Mật sứ cố quốc sắp đến":S.year<4?"Chiến tranh nổ ra tháng 9 năm thứ 4":"Chiến tranh nổ ra tháng 9",
 month(){const st=S.st;
  if(st.step===0&&S.turn>=2&&roll(35))return setDil(mkP("nc1"));
  if(st.step>=1&&S.year>=4&&S.month===9){st.step=3;S.emp.mood=3;
   if(st.path==="home"){const o=od(35+st.m*15);if(roll(o)){apply({bac:150});stEnd(1,"Công thần của cố quốc");return `<b class="g">Nam Chiếu thắng trận nhờ tin ngươi gửi về. Đại Hy cầu hòa, cố quốc gửi vàng bạc tạ ơn.</b> Bạc +150. `}
    if(roll(od(30+S.tamco/2))){apply({sung:-15,danh:-10});stEnd(-1,"Bị nghi làm gián điệp");return `<span class="r">Nam Chiếu thua trận. Cả triều nghi ngươi, nhưng không bắt được chứng cứ.</span> Sủng -15 · Danh -10. `}
    stEnd(-1,"Gián điệp bị bắt");deathSentence("Nam Chiếu thua trận, thư mật của ngươi bị tìm thấy");return""}
   if(st.m>=2){apply({danh:10,th:10});stEnd(1,"Đoạn tuyệt cố quốc, được triều đình tin");return `<b class="g">Chiến tranh với Nam Chiếu. Ngươi đứng hẳn về phía Đại Hy, cả triều kính phục.</b> Danh +10 · Thái hậu +10. `}
   apply({sung:-10,danh:-10});stEnd(-1,"Bị nghi kỵ khi chiến tranh");return `<span class="r">Chiến tranh với Nam Chiếu. Triều thần nghi ngươi hai lòng.</span> Sủng -10 · Danh -10. `}
  return""},
 acts(){const st=S.st;if(!st.path)return[];
  if(st.path==="home")return[{n:"Gửi mật thư về Nam Chiếu",t:"Chép bố phòng, giấu trong hộp phấn gửi về.",c:{suc:-5},o:od(55+S.tamco/4+S.mat*3-(DG()?6:0)),w:{bac:30},l:{danh:-5},x:`tin tình báo +1 (đã gửi ${st.m})`,go:()=>{st.m++;st.step=2},
   fail:()=>{if(roll(40)){stEnd(-1,"Gián điệp bị bắt");deathSentence("Mật thư bị chặn, tra ra ngươi làm gián điệp cho Nam Chiếu")}else log("Mật thư bị chặn, may chưa tra ra ngươi.")}}];
  return[{n:"Giảng giải phong tục Nam Chiếu",t:"Giúp Lễ bộ hiểu cố quốc, để triều đình tin ngươi.",c:{suc:-5},o:od(70),w:{danh:3,th:3},l:{},x:`lòng tin +1 (${st.m})`,go:()=>{st.m++;st.step=2}}]}},
td:{t:"Báo thù cho nhà",n:5,goal:"Cả nhà ngươi bị vu mưu phản. Gom 3 chứng cứ, giữ được nhân chứng, lên bậc Tần rồi dâng sớ lật án.",
 init(){const e=rivals[1+R(4)];e.enemy=true;e.rel=-40;S.foe=e.name;S.foeDad="Thượng thư "+e.name.split(" ")[0];S.caseEv=0;S.st.wit=0},
 calc:()=>Math.min(S.caseEv,3)+(S.st.wit?1:0)+(S.avenged?1:0),
 hint:()=>S.caseEv<3?`Chứng cứ ${S.caseEv}/3`:!S.st.wit?"Cần giữ được nhân chứng":S.rank<3?"Lên bậc Tần để dâng sớ":"Có thể dâng sớ lật án",
 month(){const st=S.st;
  if(S.caseEv>=1&&roll(12)){const e=rivals.find(x=>x.enemy);if(roll(oSee(S,false))){if(e)evStory(e,2,"có nhà mẹ đẻ sai người đốt kho hồ sơ Hình bộ");return `Tai mắt báo: ${S.foeDad} sai người đốt kho hồ sơ Hình bộ. Ngươi chặn kịp và nắm 2 chứng cứ với ${S.foe}. `}S.caseEv--;return `<span class="r">Kho hồ sơ Hình bộ bốc cháy trong đêm. Một chứng cứ án cũ mất.</span> `}
  if(S.caseEv>=2&&!st.wit&&roll(35))return setDil(mkP("td1"));
  return""},
 acts(){const A=[{n:"Điều tra án cũ",t:`Lục hồ sơ Hình bộ, tìm người làm chứng. Chứng cứ: ${S.caseEv}/3.`,c:{bac:-20,suc:-10},o:od(40+S.mat*6+S.tai/10+S.tamco/5),w:{},l:{danh:-3},x:"chứng cứ án cũ +1",go:()=>{S.caseEv++}}];
  if(S.caseEv>=3){const ok=S.rank>=3&&S.st.wit;A.unshift({n:"Dâng sớ lật án",t:ok?`Đem chứng cứ và nhân chứng trình Hoàng thượng, trị tội ${S.foeDad}.`:!S.st.wit?"Cần giữ được nhân chứng.":"Cần đạt bậc Tần mới được dâng sớ.",c:{suc:-10},o:ok?od(45+S.danh/4+S.sung/5+(has("nhantu")?5:0)):0,w:{danh:20},l:{danh:-15,sung:-10},lock:!ok,x:"lật án, trị tội kẻ thù",
   go:()=>{S.avenged=true;const e=rivals.find(x=>x.enemy);log(`<b class="g">Án cũ được lật. Cả nhà ngươi được rửa oan, truy phong. ${S.foeDad} bị xử trảm.</b>`);if(e&&e.alive&&!e.out){e.out=true;log(`${e.name} bị phế, đày vào lãnh cung.`)}S.thu=0;stEnd(1,"Đã báo thù");fx("gold")},
   fail:()=>{S.caseEv=0;log(`<span class="r">Hoàng thượng nổi giận vì ngươi lật án của tiên đế. Chứng cứ bị thu hủy.</span>`)}})}
  return A}},
ch:{t:"Quân cờ của Thái hậu",n:3,goal:"Thái hậu đưa ngươi vào cung để thay Hoàng hậu. Mệnh lệnh của bà ngày một nặng. Khi bà mất, chỗ dựa sụp đổ.",
 init(){S.st.tool=0},
 hint:()=>["Thái hậu sắp giao việc","Thái hậu sẽ đòi hỏi hơn","Thái hậu tuổi đã cao"][S.st.step]||"",
 month(){const st=S.st,q=rivals[0];
  if(S.rank>=7){st.step=3;stEnd(1,st.tool>=2?"Thay cô mẫu đoạt ngôi trung cung":"Tự mình lên ngôi trung cung");return""}
  if(st.step<2&&!qOn())st.step=2;
  if(S.year>=8||(st.step>=1&&S.year>=5&&roll(4))){st.step=3;S.th=0;S.thDead=true;apply({hh:-20});
   if(S.rank>=5){stEnd(1,st.tool>=2?"Quân cờ đắc lực của Thái hậu":"Tự đứng vững khi Thái hậu mất");return `<b>Thái hậu băng hà.</b> Ngươi đã là ${RANKS[S.rank].n}, đứng vững được. Hoàng hậu hận ngươi hơn. Hoàng hậu -20. `}
   apply({sung:-10,danh:-10});stEnd(-1,"Mất chỗ dựa khi Thái hậu băng hà");return `<span class="r">Thái hậu băng hà. Không còn ai che chở, Hoàng hậu bắt đầu trả thù.</span> Sủng -10 · Danh -10 · Hoàng hậu -20. `}
  if(st.step===0&&S.turn>=2&&qOn()&&roll(30))return setDil(mkP("ch1"));
  if(st.step===1&&qOn()&&roll(25)){const o=od(40+S.mat*5+S.tamco/4+S.th/5-(DG()?6:0));return setDil(mkP("ch2",{o}))}
  return""}},
thd:{t:"Tài nữ nhà nho",n:3,goal:"Thơ ngươi sẽ làm rạng danh cha. Được phong Tài nữ, rồi xin khắc in sách của cha. Coi chừng kẻ vu ngươi đạo thơ.",
 init(){S.st.stu="Hàn lâm "+pick(SURN)+" "+pick(MALEN);S.st.frames=0;S.st.title=0},
 hint:()=>["Luyện Thi tới bậc 2 hoặc Tài 60","Dự thi Tài nữ (Thi bậc 3 hoặc Tài 70)","Xin khắc in sách của cha (Danh 40)"][S.st.step]||"",
 month(){const st=S.st;
  if(st.step===0&&(S.arts.thi>=2||S.tai>=60)){st.step=1;apply({danh:3});return `Thơ ngươi truyền ra ngoài cung. ${st.stu}, học trò cũ của cha ngươi, đem bình khắp kinh thành. Danh +3. `}
  if(st.step>=1&&roll(10)){const p=liveRivals(false);if(p.length){const v=pick(p),o1=od(30+S.tai/2+artW("thi",S.arts.thi)*8),o2=od(60);
   return setDil(mkP("thd1",{v:v.id,o1,o2}))}}
  return""},
 acts(){const st=S.st;
  if(st.step===1){const ok=S.arts.thi>=3||S.tai>=70;return[{n:"Dự thi Tài nữ ở Hàn lâm viện",t:ok?"Cùng các khuê tú đối thơ trước Hoàng thượng.":"Cần Thi bậc 3 hoặc Tài 70.",c:{suc:-10},o:ok?od(35+S.tai/3+artW("thi",S.arts.thi)*6):0,w:{danh:8,sung:3},l:{danh:-3},lock:!ok,x:"danh hiệu Tài nữ",go:()=>{st.title=1;st.step=2}}]}
  if(st.step===2){const ok=S.danh>=BAL.danhG.fatherBook;return[{n:"Xin khắc in sách của cha",t:ok?"Dâng bản thảo của cha lên Hoàng thượng.":`Cần Danh ${BAL.danhG.fatherBook} (nay ${S.danh}).`,c:{suc:-5},o:ok?od(45+S.danh/4):0,w:{danh:10,duc:5},l:{danh:-3},lock:!ok,x:"sách cha được khắc in",go:()=>{st.step=3;stEnd(1,"Tài nữ, sách cha được khắc in");fx("gold")}}]}
  return[]}}
};

/* storyline dilemmas: rebuildable from saved params */
PEND.tt1=p=>{const st=S.st;return {t:"Thư nhà: cha ngươi đòi ngươi tâu xin cho môn sinh của ông giữ chức Thị lang Lại bộ.",o:[
   {n:"Tâu xin cho người của cha",fx:{sung:-3,hh:-8},x:"cha hài lòng",go:()=>{st.loy++;st.step=1}},
   {n:"Viện cớ thoái thác",fx:{duc:2},x:"cha phật ý",go:()=>{st.step=1}}]}};
PEND.tt2=p=>{const st=S.st;return {t:"Họ ngoại của Hoàng hậu dâng sớ hặc tội cha ngươi kết bè kéo cánh.",o:[
   {n:"Bỏ bạc lo lót triều thần",fx:{bac:-60,hh:-10},x:"cha thoát nạn",go:()=>{st.loy++;st.step=2}},
   {n:"Đứng ngoài, giữ mình",fx:{danh:2},x:"cha bị phạt bổng, hận ngươi",go:()=>{st.step=2}}]}};
PEND.tt3=p=>{const st=S.st,son=p.son?mySons().find(k=>k.name===p.son):null,o=p.o;if(p.son&&!son)return null;return {t:son?`Cha ngươi ngầm điều cấm quân, định ép Hoàng thượng lập ${son.name} làm Thái tử.`:"Cha ngươi ngầm điều cấm quân, định ép Hoàng thượng phế Hoàng hậu, lập ngươi thay.",o:[
    {n:"Theo cha mưu đại sự",fx:{},x:`${word(o)} · thành: ${son?`${son.name} được lập Thái tử`:"Hoàng hậu bị phế"}, Danh +5 · hỏng: cả họ bị tru di`,go:()=>{st.step=3;if(roll(o)){if(son)setHeir(son,null);else if(qOn()){rivals[0].out=true;log(`Hoàng hậu ${rivals[0].name} bị phế.`)}apply({danh:5});stEnd(1,"Cùng cha mưu đại sự thành");log(`<b class="g">Cấm quân vây cung. Hoàng thượng đành nghe theo.</b>`)}else{stEnd(-1,"Mưu phản cùng cha");die("Mưu phản cùng cha, cả họ bị tru di")}}},
    {n:"Mật tâu Hoàng thượng",fx:{danh:12,duc:8,th:10,sung:-5},x:"đại nghĩa diệt thân, nhà ngươi sa sút",go:()=>{st.step=3;stEnd(1,"Đại nghĩa diệt thân, tố giác cha")}}]}};
PEND.cn1=p=>{const st=S.st,m=st.mis;if(!m)return null;return {who:pv(m),t:`${m.name}, chủ cũ của ngươi, bắt ngươi quỳ dâng trà trước mặt các phi tần, nhắc ngươi từng là nô tỳ.`,o:[
   {n:"Nhẫn nhịn",fx:{duc:3,danh:-2},go:()=>{st.step=1}},{n:"Đáp trả sắc sảo",fx:{danh:2},x:`${m.name} thù ngươi hơn`,go:()=>{m.rel-=20;st.step=1}}]}};
PEND.cn2=p=>{const st=S.st,m=st.mis,o=p.o;return {t:`${st.guard}, người từng hẹn ước với ngươi thuở còn làm cung nữ, nay gác cửa cung ngươi. Thái giám của ${m.name} đã đánh hơi thấy.`,o:[
   {n:"Đút bạc bịt miệng",fx:{bac:-50},x:"chuyện chưa dứt hẳn",go:()=>{st.secret=1;st.step=2}},
   {n:"Diệt khẩu tên thái giám",fx:{duc:-8},x:`${word(o)} · thành: bịt được miệng, Tâm cơ +2 · hỏng: lộ chuyện, Danh -8`,go:()=>{S.schemes++;st.step=2;if(roll(o)){st.secret=2;apply({tamco:2});log("Tên thái giám chết đuối ở giếng sau.")}else{st.secret=1;apply({danh:-8});log(`<span class="r">Diệt khẩu hỏng, lời đồn đã lan.</span>`)}}},
   {n:"Xin cho hắn ra biên ải",fx:{bac:-20,duc:4},go:()=>{st.secret=2;st.step=2}}]}};
PEND.nc1=p=>{const st=S.st;return {t:"Mật sứ Nam Chiếu trao thư của phụ vương: muốn ngươi dò bố phòng biên ải Đại Hy.",o:[
   {n:"Trung với cố quốc",fx:{},x:"nhận việc mật; lộ là chết",go:()=>{st.path="home";st.step=1}},
   {n:"Dâng thư lên Hoàng thượng",fx:{th:15,danh:5,sung:3},x:"đoạn tuyệt cố quốc",go:()=>{st.path="court";st.step=1}}]}};
PEND.td1=p=>{const st=S.st;return {t:`Lão thái giám họ Vương, nhân chứng còn sống của vụ án nhà ngươi, đang bị người của ${S.foeDad} truy sát.`,o:[
   {n:"Giấu ông ở Tân Giả Khố",fx:{bac:-40},x:"giữ được nhân chứng",go:()=>{st.wit=1}},
   {n:"Mặc kệ",fx:{},x:"chứng cứ -1",go:()=>{S.caseEv=Math.max(0,S.caseEv-1);log(`<span class="r">Xác lão Vương nổi trên sông Kim Thủy.</span>`)}}]}};
PEND.ch1=p=>{const st=S.st,q=rivals[0];return {who:pTH(),t:kSay("th",S,'Thái hậu gọi ngươi vào Đức Thọ cung: “Hoàng hậu bất tài. {Goi} phải thay nàng ta. Trước hết, dò xem Càn Ninh cung giấu gì.”'),o:[
   {n:"Vâng mệnh cô mẫu",fx:{th:8},x:"chứng cứ Hoàng hậu +1",go:()=>{evStory(q,1,"giấu chuyện riêng trong Càn Ninh cung");st.tool++;st.step=1}},{n:"Thoái thác",fx:{th:-15,duc:2},go:()=>{st.step=1}}]}};
PEND.ch2=p=>{const st=S.st,q=rivals[0],o=p.o;return {who:pTH(),t:'Thái hậu dúi vào tay ngươi một gói thuốc: “Bỏ vào trà của Hoàng hậu.”',o:[
   {n:"Vâng mệnh",fx:{duc:-10},x:`${word(o)} · thành: Hoàng hậu băng hà, Thái hậu +10 · hỏng: bị ban chết`,go:()=>{S.schemes++;st.tool++;st.step=2;if(roll(o)){q.alive=false;apply({th:10,tamco:2});log(`<span class="r">Hoàng hậu ${q.name} băng hà sau chén trà chiều.</span>`)}else{stEnd(-1,"Bị Thái hậu phủi tay");deathSentence("Hạ độc Hoàng hậu bị bắt, Thái hậu phủi tay không nhận")}}},
   {n:"Từ chối, tự gây thế lực",fx:{th:-25,danh:4},go:()=>{st.step=2}}]}};
PEND.thd1=p=>{const st=S.st,v=RV(p.v),o1=p.o1,o2=p.o2;if(!v)return null;const lose=()=>{apply({danh:-15});st.frames++;if(st.title){st.title=0;st.step=1;log(`<span class="r">Ngươi bị tước danh hiệu Tài nữ.</span>`)}if(st.frames>=2)stEnd(-1,"Mang tiếng đạo thơ");log(`<span class="r">Cả cung tin ngươi đạo thơ.</span> Danh -15.`)};const win=()=>{apply({danh:5});v.rel-=10;log(`<span class="g">Ngươi rửa được tiếng oan, ${v.name} bẽ mặt.</span>`)};return {who:pv(v),t:`${v.name} tố ngươi chép thơ người xưa rồi nhận là của mình.`,o:[
    {n:"Ứng tác ngay trước mặt Hoàng thượng",fx:{},x:`${word(o1)} · thành: rửa được tiếng oan, Danh +5 · hỏng: Danh -15`,go:()=>roll(o1)?win():lose()},
    {n:`Nhờ ${st.stu} minh oan`,fx:{bac:-40},x:`${word(o2)} · thành: rửa được tiếng oan, Danh +5 · hỏng: Danh -15`,go:()=>roll(o2)?win():lose()}]}};
