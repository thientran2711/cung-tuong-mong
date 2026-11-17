
/* ================= j70 MƯU HẠI THÀNH CHUỖI: a plot is a visible chain, not one die =================
   motive (danger band, a slight, jealousy after her favour rises, a rival heir, faction orders) -> preparation over weeks
   (each step leaves a TELL tied to a method and a place) -> execution when an opportunity comes (festival, illness,
   pregnancy, labour, rain, a lonely spell, a quiet night) -> aftermath (who is blamed, the evidence trail).
   One rule for everyone: NPC -> her, NPC -> NPC and her -> NPC run through the same chain, the same tells and the same
   detection; execution reuses the existing acts (ACT/runAct/mindRun), evidence (evA/evG), caught/punish/accuse.
   Wraps only (mindTell, jointScheme, doAct, goTo, endTurn); edits no other module. Off switch: window.__j70off=1.
   True information only reaches her: what she is told is what really happens (NPCs may still blame the wrong person). */
/* mot 3 / prep 10 = the measured balance values (BALANCE_REPORT 11/14); one-core: they were 1.5 / 0 here and set again in jbal2 */
const J70CFG={cap:4,capMe:2,capOwn:2,mot:3,prep:10,npcSeen:.55,cool:2,waitMax:3};
const G70=t=>`<span class="g">${t}</span>`,R70=t=>`<span class="r">${t}</span>`;
function j70(){if(!S)return null;const z=S.j70=S.j70||{};z.pl=z.pl||[];z.n=z.n||0;z.sh=z.sh||[];z.done=z.done||0;z.types=z.types||{};return z}
function j70On(){return !!(S&&!S.dead&&!S.out&&!window.__j70off&&!(typeof isSrv==="function"&&isSrv()))}
function duc70(p,n,why){try{if(typeof ducAdd==="function")ducAdd(p,n,why)}catch(e){}}
function busy70(){try{if(typeof evBusy==="function"&&evBusy())return true;if(typeof storyBusy==="function"&&storyBusy())return true}catch(e){}return false}
function mark70(){try{if(typeof evBusyMark==="function")evBusyMark()}catch(e){}}
function tc70(p){try{return witOf(p)}catch(e){return p===S?S.tamco||0:p.tamco||0}}
function nm70(p){return p===S?"ngươi":p.name}
function who70(p){try{return p===S?null:pv(p)}catch(e){return null}}
/* a choice through the shared kit helper (j68) with a local fallback */
function ch70(n,s){if(typeof evChoice==="function")return evChoice(n,s);s=s||{};const p=s.p==null?null:cl(Math.round(s.p),5,95);
 const wt=(s.wt||[]).join(", "),lt=(s.lt||[]).join(", ");let x=p!=null?`${word(p)} · thành: ${wt||G70("êm chuyện")} · hỏng: ${lt||"không mất gì"}`:wt;if(s.k&&s.k.length)x+=(x?" · ":"")+"kèm: "+s.k.join(", ");
 return{n,fx:s.c||{},x,go:()=>{const ok=p==null||Math.random()*100<p;let t="";try{t=ok?(s.ok?s.ok():""):(s.no?s.no():"")}catch(e){}log(ok?(t||n+"."):`${R70("Không thành:")} ${t||n+"."}`)}}}

/* ---------- opportunities: timing chosen by what the week offers ---------- */
const OPP70={
 fest:{n:"ngày hội đông người, ai cũng lơ là",ok:(p,t)=>{try{return !!festToday()}catch(e){return false}},b:10},
 ill:{n:"lúc nàng đang đau ốm, thuốc thang lẫn lộn",ok:(p,t)=>{try{return !!illOf(t)}catch(e){return false}},b:10},
 preg:{n:"khi nàng đang mang thai",ok:(p,t)=>!!t.preg,b:4},
 birth:{n:"lúc nàng trở dạ",ok:(p,t)=>(t.preg||0)>=8,b:12},
 rain:{n:"sau cơn mưa, bậc đá trơn",ok:()=>!!(S.wx&&/mưa|bão|tuyết/i.test(S.wx.n||"")),b:8},
 lonely:{n:"lúc nàng thất sủng, ít người qua lại",ok:(p,t)=>(t===S?S.sung:t.sung||0)<25,b:6},
 night:{n:"một đêm vắng",ok:()=>true,b:0}};
/* ---------- methods x routes (stage templates). k = the existing act that executes it ---------- */
/* route: n name · tl [tell of step 1, tell of step 2] (what her people see, third person, no subject) · pl place key where it can be seen
   vis tell visibility · need prep weeks · bac price · acc accomplice ('tsv' a servant of the target) · gd her guard · st how she can cut it */
const M70={
 poison:{k:"poison",band:3,n:"Hạ độc vào điểm tâm",opp:["fest","ill","night"],R:[
  {id:"tyv",n:"Mua thạch tín ở Thái y viện",tl:["vào Thái y viện hỏi mua thạch tín, nói là để trừ chuột","lén cất một gói bột trắng dưới đáy hộp phấn"],pl:"tyv",vis:8,need:2,bac:20,gd:"Cho người nếm thử mọi món ăn",st:"Nhờ thái y tâm phúc đánh tráo gói thạch tín"},
  {id:"bep",n:"Mua chuộc người ở Ngự thiện phòng",tl:["có người Ngự thiện phòng lén nhận bạc lúc canh ba","hỏi kỹ giờ nấu điểm tâm cho các cung"],pl:null,vis:2,need:2,bac:40,gd:"Chỉ dùng bếp nhỏ trong cung mình",st:"Bỏ bạc mua lại tên đầu bếp, bắt hắn khai"},
  {id:"tsv",n:"Mua chuộc cung nữ dâng trà",tl:["hẹn gặp một cung nữ bên cung nạn nhân ở góc tường sau","dúi cho cung nữ ấy một túi bạc nặng"],pl:null,vis:0,need:2,bac:40,acc:"tsv",gd:"Đổi người dâng trà, khóa tủ trà",st:"Gọi riêng cung nữ bị mua, cho nàng đường lui"}]},
 poison2:{k:"poison",band:3,n:"Hạ độc dần qua đồ dùng",opp:["ill","lonely","night"],R:[
  {id:"tra",n:"Tẩm độc vào trà cống đem tặng",tl:["sai người mua loại trà quý ngoài cung, đóng hộp rất cầu kỳ","đóng cửa sao trà ban đêm, mùi lạ bay ra"],pl:null,vis:4,need:3,bac:30,gd:"Đem mọi món quà đi thử trước khi dùng",st:"Sai người đổi hộp trà trước khi đến tay"},
  {id:"son",n:"Trộn chu sa vào son phấn",tl:["hỏi mua chu sa và thủy ngân ở chợ ngoài","sai thợ làm một hộp son mới, khắc hoa rất đẹp"],pl:null,vis:3,need:3,bac:30,gd:"Chỉ dùng son phấn của Nội vụ phủ",st:"Chặn hộp son ở Nội vụ phủ"},
  {id:"huong",n:"Trộn hương độc vào lò trầm",tl:["mua một loại hương lạ, nói là trị mất ngủ","hỏi thăm cung nữ coi lò hương của nạn nhân"],pl:"tyv",vis:6,need:3,bac:25,gd:"Mở cửa thông gió, đổi lò hương",st:"Đem mẫu hương đến Thái y viện nghiệm"}]},
 musk:{k:"musk",band:3,n:"Hại thai",opp:["preg","ill","night"],R:[
  {id:"xh",n:"Mua xạ hương ở chợ ngoài cung",tl:["lén mua xạ hương ở chợ ngoài cung","may một túi thơm rất khéo, nói là để tặng"],pl:null,vis:5,need:2,bac:30,gd:"Không nhận túi thơm, đồ tặng của ai",st:"Chặn người đưa xạ hương ở cửa cung"},
  {id:"ty",n:"Mua chuộc thái y đổi thuốc an thai",tl:["mời một thái y sang cung trò chuyện rất lâu","thái y ấy bỗng có thêm bạc gửi về quê"],pl:"tyv",vis:6,need:3,bac:50,gd:"Chỉ uống thuốc do thái y tâm phúc sắc",st:"Đổi thái y, giữ lại bã thuốc làm chứng"},
  {id:"hh",n:"Trộn hồng hoa vào canh",tl:["hỏi mua hồng hoa, nói là để nhuộm vải","dò xem bếp nào nấu canh bổ cho nạn nhân"],pl:"tyv",vis:6,need:2,bac:25,gd:"Mọi bát canh đều qua tay ma ma thử",st:"Bắt quả tang kẻ mang hồng hoa vào bếp"},
  {id:"tsv",n:"Mua cung nữ sắc thuốc an thai",tl:["gặp riêng cung nữ sắc thuốc của nạn nhân","cung nữ ấy dạo này hay giật mình, tay có vết bỏng lạ"],pl:null,vis:2,need:2,bac:40,acc:"tsv",gd:"Tự tay coi ấm thuốc",st:"Gọi cung nữ sắc thuốc ra hỏi chuyện"}]},
 catswap:{k:"catswap",band:3,n:"Tráo hài nhi lúc sinh",opp:["birth"],R:[
  {id:"bd",n:"Mua chuộc bà đỡ",tl:["cho một bà đỡ lạ ra vào cung mình","bà đỡ ấy được may áo mới, đeo vòng bạc"],pl:null,vis:5,need:2,bac:50,gd:"Chọn bà đỡ do Thái hậu ban",st:"Đổi bà đỡ ngay trước kỳ sinh"},
  {id:"nv",n:"Nhờ Nội vụ phủ cử bà đỡ của mình",tl:["đút lót quản sự Nội vụ phủ về việc cắt cử bà đỡ","dò ngày dự sinh của nạn nhân"],pl:null,vis:3,need:3,bac:60,gd:"Xin Hoàng thượng tự chỉ định bà đỡ",st:"Tố với Nội vụ phủ, bắt sửa danh sách"},
  {id:"dọa",n:"Dọa nạt gia quyến bà đỡ",tl:["sai người ra ngoài cung tìm nhà một bà đỡ","bà đỡ ấy mặt cắt không còn hột máu"],pl:null,vis:4,need:2,bac:30,gd:"Cho bà đỡ ở hẳn trong cung mình",st:"Che chở gia quyến bà đỡ, đổi lấy lời khai"}]},
 kpoison:{k:"kpoison",band:3,n:"Hạ độc con nàng",opp:["ill","fest","night"],R:[
  {id:"vu",n:"Mua chuộc vú nuôi",tl:["hẹn gặp vú nuôi của hoàng tự ở cửa sau","vú nuôi ấy được cho một đôi hoa tai vàng"],pl:null,vis:4,need:2,bac:50,gd:"Đổi vú nuôi, tự trông con",st:"Gọi vú nuôi ra, hứa che chở nếu khai"},
  {id:"keo",n:"Tặng bánh kẹo tẩm độc",tl:["đặt một hộp bánh hạt sen rất đẹp ngoài chợ","hỏi xem hoàng tự thích ăn món gì"],pl:null,vis:5,need:2,bac:20,gd:"Không cho con ăn đồ ai mang đến",st:"Chặn hộp bánh, đem đi nghiệm"},
  {id:"chao",n:"Bỏ độc vào cháo qua bếp",tl:["vào Thái y viện hỏi mua thạch tín, nói là để trừ chuột","người Ngự thiện phòng hỏi giờ dâng cháo cho các con"],pl:"tyv",vis:7,need:2,bac:30,gd:"Nấu cháo cho con trong cung mình",st:"Cắt đường bếp, bắt kẻ mua thuốc"}]},
 pond:{k:"pond",band:3,n:"Đẩy con nàng xuống hồ",opp:["fest","rain"],R:[
  {id:"lo",n:"Dò lối đi chơi của hoàng tự",tl:["hay dẫn người ra hồ sen dò lối, hỏi giờ các hoàng tự đi chơi","sai người nhổ bớt lan can gỗ bên hồ"],pl:"vuon",vis:7,need:2,bac:0,gd:"Không cho con ra hồ khi không có người lớn",st:"Báo Nội vụ phủ sửa lan can, canh hồ"},
  {id:"hoi",n:"Chờ ngày hội đông người",tl:["hỏi kỹ lịch lễ hội và chỗ các con đứng xem","sai người lạ trà trộn vào đám thị vệ"],pl:"vuon",vis:5,need:3,bac:20,gd:"Giữ con sát bên trong ngày hội",st:"Nhờ thị vệ tâm phúc canh chừng"},
  {id:"dieu",n:"Dụ con nàng bằng con diều",tl:["mua một con diều hình phượng rất đẹp","thả diều gần hồ mấy chiều liền"],pl:"vuon",vis:6,need:2,bac:10,gd:"Dặn con không đi theo người lạ",st:"Bắt kẻ thả diều hỏi chuyện"}]},
 pushp:{k:"pushp",band:3,n:"Đẩy nàng xuống hồ sen",opp:["rain","fest","night"],R:[
  {id:"gio",n:"Dò giờ nàng dạo vườn",tl:["dò giờ người ta đi qua bậc đá trơn sau mưa","đứng lâu bên hồ sen mỗi chiều"],pl:"vuon",vis:7,need:2,bac:0,gd:"Không dạo vườn một mình lúc chiều tối",st:"Báo Nội vụ phủ rắc cát bậc đá, canh hồ"},
  {id:"den",n:"Chờ đêm hội đèn",tl:["hỏi đường đi của các cung trong đêm hội","sai người tắt bớt đèn bên hồ"],pl:"vuon",vis:5,need:3,bac:10,gd:"Đi hội có thị vệ đi kèm",st:"Nhờ thị vệ thắp đèn suốt bờ hồ"},
  {id:"tsv",n:"Mua cung nữ dẫn nàng ra hồ",tl:["gặp riêng cung nữ hầu nàng đi dạo","cung nữ ấy hay rủ chủ ra hồ sen ngắm trăng"],pl:null,vis:2,need:2,bac:30,acc:"tsv",gd:"Không theo lời rủ ra hồ lúc vắng",st:"Gọi cung nữ ấy ra hỏi chuyện"}]},
 kframe:{k:"kframe",band:3,n:"Vu con nàng trù ẻo",opp:["lonely","night","fest"],R:[
  {id:"bup",n:"May búp bê trù ẻo",tl:["mua vải vàng và kim bạc, đóng cửa may vá ban đêm","hỏi ngày sinh tháng đẻ của hoàng tự"],pl:null,vis:5,need:3,bac:20,gd:"Lục soát phòng con mỗi tối",st:"Cho người lục và đốt búp bê trước"},
  {id:"thay",n:"Mua chuộc thầy dạy",tl:["mời thầy dạy của hoàng tự đến uống rượu","thầy dạy ấy bỗng hay hỏi chuyện chữ viết của hoàng tự"],pl:null,vis:3,need:3,bac:40,gd:"Đổi thầy dạy cho con",st:"Nói chuyện riêng với thầy dạy, cho hắn đường lui"},
  {id:"chu",n:"Giả chữ viết của hoàng tự",tl:["thu gom giấy viết bỏ của hoàng tự","thuê người khéo tay nhại chữ"],pl:null,vis:3,need:3,bac:30,gd:"Đốt hết giấy nháp của con",st:"Tìm người nhại chữ, bắt hắn khai"}]},
 frame:{k:"frame",band:2,n:"Vu oan bùa ngải",opp:["lonely","night","fest"],R:[
  {id:"bup",n:"May búp bê chôn trong vườn nàng",tl:["mua vải vàng và kim bạc, đóng cửa may vá ban đêm","sai người đêm đêm lảng vảng quanh vườn cung khác"],pl:null,vis:5,need:2,bac:20,gd:"Cho người đào xới, lục soát vườn",st:"Đào búp bê lên trước, giữ làm tang chứng"},
  {id:"tsv",n:"Mua cung nữ giấu bùa trong phòng",tl:["gặp riêng một cung nữ bên cung nạn nhân","cung nữ ấy hay vào phòng chủ lúc không ai gọi"],pl:null,vis:2,need:2,bac:40,acc:"tsv",gd:"Khóa phòng ngủ, tự giữ chìa",st:"Gọi cung nữ ấy ra tra hỏi"},
  {id:"thu",n:"Giả thư tư thông với ngoại thần",tl:["thu gom thư từ, giấy viết của nạn nhân","thuê người nhại chữ ở ngoài cung"],pl:null,vis:3,need:3,bac:30,gd:"Đốt hết giấy viết thừa",st:"Tìm kẻ nhại chữ, bắt hắn khai"}]},
 plant:{k:"plant",band:2,n:"Cài đồ cấm vào rương",opp:["night","fest"],R:[
  {id:"lv",n:"Lẻn vào lúc vắng người",tl:["lảng vảng quanh cung người khác lúc vắng người","hỏi giờ cung nữ bên ấy đi lĩnh lương"],pl:null,vis:5,need:2,bac:0,gd:"Luôn để người trông cung",st:"Lục rương trước, vứt đồ lạ đi"},
  {id:"tsv",n:"Mua cung nữ cài đồ",tl:["gặp riêng một cung nữ bên cung nạn nhân","cung nữ ấy giấu một bọc nhỏ trong tay áo"],pl:null,vis:2,need:2,bac:40,acc:"tsv",gd:"Tự giữ chìa khóa rương",st:"Gọi cung nữ ấy ra hỏi"}]},
 bribe:{k:"bribe",band:2,n:"Mua người trong cung nàng",opp:["night","lonely"],R:[
  {id:"bac",n:"Dùng bạc",tl:["đem bạc đổi thành ngân phiếu nhỏ","hẹn gặp kẻ hầu cung khác lúc canh ba"],pl:null,vis:3,need:2,bac:20,gd:"Thưởng thêm cho kẻ hầu, giữ lòng họ",st:"Tăng lương kẻ hầu, hỏi xem ai bị dụ"},
  {id:"doa",n:"Dọa gia quyến kẻ hầu",tl:["sai người ra ngoài cung dò nhà kẻ hầu","một kẻ hầu bên ấy dạo này thất thần"],pl:null,vis:4,need:2,bac:10,gd:"Hỏi han gia cảnh kẻ hầu",st:"Che chở gia quyến kẻ hầu"},
  {id:"hua",n:"Hứa cho đổi cung, thăng chức",tl:["nhờ quản sự Nội vụ phủ giữ chỗ trống","một kẻ hầu bên ấy hay khoe sắp được đổi chỗ tốt"],pl:null,vis:3,need:3,bac:20,gd:"Hứa cho kẻ hầu tương lai tốt hơn",st:"Hỏi thẳng Nội vụ phủ"}]},
 block:{k:"block",band:2,n:"Rút thẻ bài",opp:["night","lonely"],R:[
  {id:"ksp",n:"Đút lót Kính sự phòng",tl:["gặp thái giám Kính sự phòng ban đêm","thái giám ấy có thêm một chiếc nhẫn ngọc"],pl:"ksp",vis:6,need:2,bac:40,gd:"Biếu Kính sự phòng trước",st:"Đến Kính sự phòng nói chuyện thẳng"},
  {id:"tq",n:"Biếu quà Tổng quản",tl:["đem lễ vật hậu sang chỗ Tổng quản","Tổng quản bỗng lạnh nhạt khi nhắc tên nạn nhân"],pl:null,vis:4,need:2,bac:50,gd:"Biếu Tổng quản một phần lễ",st:"Nhờ người nói khéo với Tổng quản"},
  {id:"benh",n:"Tung tin nàng đang có bệnh",tl:["hỏi Thái y viện về bệnh truyền nhiễm","đồn nhỏ rằng nạn nhân ho suốt đêm"],pl:"tyv",vis:5,need:2,bac:10,gd:"Mời thái y viết giấy khỏe mạnh",st:"Mời thái y bắt mạch công khai"}]},
 rumor:{k:"rumor",band:1,n:"Tung tin đồn bẩn",opp:["fest","lonely","night"],R:[
  {id:"mama",n:"Trả bạc cho các ma ma già",tl:["mời các ma ma già uống trà, kể chuyện thâu đêm","ma ma bên ấy thì thầm tên nạn nhân"],pl:null,vis:5,need:2,bac:10,gd:"Giữ kẻ hầu kín miệng",st:"Gặp các ma ma, cho bạc gấp đôi để im"},
  {id:"tho",n:"Dán thơ nặc danh",tl:["mua giấy và mực loại rẻ","người bên ấy đi đêm qua các cổng"],pl:null,vis:4,need:2,bac:5,gd:"Cho người gỡ thơ ngay khi thấy",st:"Rình bắt kẻ dán thơ"},
  {id:"tg",n:"Tung tin qua thái giám",tl:["hay trò chuyện với thái giám các cung","thái giám bên ấy bỗng biết nhiều chuyện riêng"],pl:"ksp",vis:4,need:2,bac:10,gd:"Ít để kẻ lạ ra vào cung",st:"Gọi thái giám ấy ra hỏi"}]},
 accuse:{k:"accuse",band:2,n:"Gom chứng cứ rồi tố",opp:["lonely","night"],R:[
  {id:"do",n:"Cho người rình rập",tl:["cho người rình trước cửa cung nạn nhân","hỏi han cung nữ bên ấy giờ giấc chủ"],pl:null,vis:5,need:3,bac:20,gd:"Cẩn trọng lời ăn tiếng nói",st:"Bắt kẻ rình, đuổi đi"},
  {id:"chung",n:"Mua lời khai",tl:["tìm một kẻ hầu bị đuổi của nạn nhân","kẻ hầu cũ ấy được cho ăn ở tử tế"],pl:null,vis:4,need:3,bac:40,gd:"Đối xử tử tế với kẻ hầu cũ",st:"Tìm kẻ hầu cũ trước, cho bạc"},
  {id:"so",n:"Chờ nàng sơ hở",tl:["ghi chép từng việc nạn nhân làm","đếm số đồ trang sức nạn nhân đeo"],pl:null,vis:3,need:3,bac:0,gd:"Không mặc đồ quá phẩm, giữ lễ",st:"Xin gặp nói chuyện thẳng, gỡ mối"}]},
 ksab:{k:"ksab",band:2,n:"Phá việc học của con nàng",opp:["night"],R:[
  {id:"thay",n:"Mua chuộc thầy dạy",tl:["mời thầy dạy của hoàng tự uống rượu","thầy dạy ấy dạo này hay cho nghỉ học"],pl:null,vis:3,need:2,bac:30,gd:"Tự kèm con học",st:"Đổi thầy dạy"},
  {id:"choi",n:"Dụ con nàng ham chơi",tl:["mua dế và diều tặng hoàng tự","người lạ hay rủ hoàng tự ra vườn"],pl:"vuon",vis:5,need:2,bac:15,gd:"Giữ con ở thư phòng",st:"Bắt kẻ dụ con, đuổi đi"},
  {id:"tin",n:"Tung tin con nàng đần độn",tl:["hỏi han thầy dạy về bài vở của hoàng tự","đồn nhỏ rằng hoàng tự học mãi không thuộc"],pl:null,vis:4,need:2,bac:10,gd:"Cho con trả bài trước mặt mọi người",st:"Mời thầy dạy nói rõ trước Hoàng thượng"}]},
 joint:{k:"joint",band:2,n:"Phe cánh liên thủ vu cáo",opp:["lonely","night"],R:[
  {id:"hop",n:"Họp phe ban đêm",tl:["người trong phe họp kín ở cung chủ phe ban đêm","người các cung trong phe qua lại dày đặc"],pl:null,vis:6,need:2,bac:0,gd:"Tìm người làm chứng cho mình",st:"Chia rẽ phe ấy bằng quà"},
  {id:"chu",n:"Cùng nhau gom tội",tl:["người trong phe lần lượt hỏi chuyện kẻ hầu của nạn nhân","một ma ma trong phe ghi chép giờ giấc nạn nhân"],pl:null,vis:5,need:3,bac:0,gd:"Giữ mình, không để sơ hở",st:"Gặp riêng kẻ yếu nhất trong phe"}]}};
const MOT70={band:"oán hận đã lâu",nhuc:"vừa bị làm nhục",ghen:"ghen vì ân sủng của nạn nhân tăng nhanh",ngoi:"lo hoàng tử của nạn nhân tranh ngôi",fac:"phe cánh ra lệnh"};
/* her own plots: which act buttons open the chain */
const OWN70={poison:["poison","poison2"],musk:["musk"],catswap:["catswap"],kpoison:["kpoison"],pond:["pond"],kframe:["kframe"],frame:["frame"],ksab:["ksab"],rumor:["rumor"],block:["block"]};
function routes70(){let n=0;for(const k in M70)n+=M70[k].R.length;return n}
window.j70Count=function(){return{methods:Object.keys(M70).length,types:routes70(),motives:Object.keys(MOT70).length,opps:Object.keys(OPP70).length}};

/* ---------- plot helpers ---------- */
function P70(id){const z=j70();return z?z.pl.find(p=>p.id===id)||null:null}
function pa70(p){return p.a==="me"?S:RV(p.a)}
function pt70(p){return p.t==="me"?S:RV(p.t)}
function pm70(p){return M70[p.m]}
function r70vis(p){const r=pr70(p);return r?r.vis:0}
function pr70(p){const M=M70[p.m];return M?M.R.find(r=>r.id===p.r)||M.R[0]:null}
function alive70(x){return !!x&&(x===S?!S.dead:x.alive&&!x.out)}
function tKid70(p){const t=pt70(p);try{return t?tKid(t)||kidsOf(t)[0]:null}catch(e){return null}}
function okAct70(a,t,k){if(k==="joint")return !!(typeof facOf==="function"&&facOf(a));if(k==="pushp"||k==="trip")return true;const A=ACT[k];if(!A)return false;try{return !!A.ok(a,t)}catch(e){return false}}
function oddsOf70(a,t,k,bonus){if(k==="joint"||!ACT[k]||!ACT[k].o)return null;let o=null;try{const e0=a.__err;a.__err=-(bonus||0);o=ACT[k].o(a,t);a.__err=e0}catch(e){return null}return o==null?null:cl(Math.round(o),5,95)}
function tellOf70(p,i){const r=pr70(p);if(!r)return"có động tĩnh lạ";let s=r.tl[Math.min(i,r.tl.length-1)];const t=pt70(p);return s.replace(/nạn nhân/g,t?(t===S?"ngươi":t.name):"người khác")}
function where70(p){const r=pr70(p);return r&&r.pl?placeName(r.pl):""}
function cnt70(f){const z=j70();return z?z.pl.filter(p=>!p.end&&f(p)).length:0}
function canNew70(aKey,tKey){if(aKey!=="me"&&cnt70(p=>p.a===aKey))return false;if(aKey==="me")return cnt70(p=>p.a==="me")<J70CFG.capOwn;if(tKey==="me"&&cnt70(p=>p.t==="me"&&p.a!=="me")>=J70CFG.capMe)return false;return cnt70(p=>p.a!=="me")<J70CFG.cap}
/* method family for an act key (the act j40 or the player chose) */
function methFor70(k){const L=Object.keys(M70).filter(m=>M70[m].k===k);return L.length?pick(L):null}
/* an NPC picks a route by price, wit (the clever avoid loud routes) and who can be bought */
function pickRoute70(a,t,M){const tc=tc70(a);const L=M.R.filter(r=>{if(a!==S&&r.bac&&(a.bac||0)<r.bac)return false;if(r.acc==="tsv"&&!((t.staff||[]).length))return false;return true});if(!L.length)return null;
 const w=L.map(r=>[r,Math.max(.2,(tc>=BAL.wit.hi?10-r.vis:5)+(r.acc&&traitsOf(a).includes("Xảo quyệt")?3:0))]);let s=Math.random()*w.reduce((x,y)=>x+y[1],0),i=0;while(s>w[i][1]&&i<w.length-1){s-=w[i][1];i++}return w[i][0]}
function newPlot70(a,t,m,rid,mo,opt){const z=j70();const M=M70[m];if(!M)return null;const r=rid?M.R.find(x=>x.id===rid):pickRoute70(a,t,M);if(!r)return null;
 const tc=tc70(a);const p={id:++z.n,a:a===S?"me":a.id,t:t===S?"me":t.id,m,r:r.id,mo:mo||"band",st:"prep",pg:0,need:r.need+(a!==S&&tc>=BAL.wit.hi?1:0),born:wk(),g:0,kn:0,kt:[],err:(opt&&opt.err)||0,cool:0,wt:0};
 if(opt&&opt.fac)p.fac=1;if(M.k==="kpoison"||M.k==="pond"||M.k==="kframe"||M.k==="ksab"){const k=tKid70(p);if(k)p.kid=k.name}
 if(a!==S&&r.bac)ap(a,{bac:-r.bac});
 z.pl.push(p);z.types[m+":"+r.id]=(z.types[m+":"+r.id]||0)+1;try{if(typeof evHistMark==="function")evHistMark("j70:"+m+":"+r.id)}catch(e){}
 /* the accomplice: a servant of the target is approached; the loyal refuse and tell their mistress, the rest betray */
 if(r.acc==="tsv"){const L=(t.staff||[]).filter(s=>s.spyFor!==p.a);const s=L.sort((x,y)=>(x.loyal+nq(x,"loyal",BAL.net.k.firmLoyal))-(y.loyal+nq(y,"loyal",BAL.net.k.firmLoyal)))[0];
  if(s){p.acc=s.sid;/* 2f2: the approached servant CHOOSES by tmOdds (traits, lòng, what she wants); a refusal is told as before */if(!roll(typeof tmOdds==="function"?tmOdds(a,s):(s.loyal+nq(s,"loyal",BAL.net.k.firmLoyal)+nq(s,"greed",BAL.net.k.firmGreed)>=60?25:100))){p.end="refused";p.sv=s.sid;evA(t,a,BAL.eff.j70.evNewPlot70);s.loyal=cl(s.loyal+BAL.eff.j70.loyalNewPlot70,0,100);try{mindLog(a,"_abandon")}catch(e){}
    if(t===S){p.kn=1;p.kt.push(tellOf70(p,0));p.pend="serv"}else if(a===S){p.pend="ownfail"}
    if(a!==S&&a.plan&&a.plan.j70===p.id)a.plan=null;return p}
   s.spyFor=s.spyFor||p.a;p.bonus=(p.bonus||0)+8}}
 return p}

/* ---------- motive -> plot ---------- */
function motives70(v){const out=[];const z=j70();const sh=z.sh;const rise=sh.length>=4?S.sung-sh[sh.length-4]:0;
 if(rise>=8&&(v.ghen||0)>=35)out.push([S,"ghen"]);
 if(v.slightAt!=null&&bq()-v.slightAt<=6){const L=others(v).filter(x=>x===S||alive70(x));const t=mindPickBy(L.filter(x=>oan(v,x)>=20),x=>oan(v,x),v);if(t)out.push([t,"nhuc"])/* npc-mind: was ARGMAX oán; gate oán≥20 kept */}
 try{if(sonsOf(v).length&&mySons().length&&(mySons().some(k=>k.heir)||rkOf(S)>=rkOf(v)))out.push([S,"ngoi"])}catch(e){}
 return out}
function motiveTick70(){const z=j70();for(const v of liveRivals(true)){if(v.confined||v.plan||cnt70(p=>p.a===v.id))continue;const M=motives70(v);if(!M.length)continue;
  const [t,mo]=pick(M);if(!alive70(t)||(typeof sameHouse==="function"&&sameHouse(v,t)))continue;const b=bandOf(danger(v,t));if(!b)continue;
  const T=traitsOf(v);let c=J70CFG.mot*(T.includes("Xảo quyệt")?1.6:1)*(T.includes("Ân cần")?.3:1)*(T.includes("Khiêm nhường")?.5:1)*(b>=2?1.2:1);if(t===S&&typeof BAL==="object"&&BAL.hz)c*=Math.min(1.2,BAL.hz);
  if(!roll(c)||!canNew70(v.id,key(t)))continue;
  let O=[];try{O=mindMenu(v,t)}catch(e){O=[]}O=O.filter(x=>methFor70(x[0])&&M70[methFor70(x[0])].band<=b);if(!O.length)continue;const k=wpick(O);const m=methFor70(k);if(!m||!okAct70(v,t,k))continue;
  const p=newPlot70(v,t,m,null,mo);if(p&&!p.end){v.plan={k:M70[m].k,t:key(t),due:1e9,err:0,j70:p.id};try{mindLog(v,"_tell")}catch(e){}}}}
/* j40's big-scheme plan becomes a chain (the plan stays as the 'one scheme at a time' lock) */
(function(){if(typeof mindTell!=="function")return;const m0=mindTell;mindTell=function(v,t,k){try{if(j70On()&&v&&v.plan&&t&&!v.plan.j70&&canNew70(v.id,key(t))){const m=methFor70(k);if(m){const mo=t===S&&(v.ghen||0)>=Math.max(oan(v,S),-aff(v,S))?"ghen":"band";const p=newPlot70(v,t,m,null,mo,{err:v.plan.err||0});if(p){if(p.end)v.plan=null;else{v.plan.due=1e9;v.plan.j70=p.id}try{mindLog(v,"_tell")}catch(e){}return}}}}catch(e){console.error(e)}return m0.apply(this,arguments)}})();
/* a consort preparing a chain still lives her normal life: small acts (rumour, spying, tripping, accusing) go on; only a second big scheme waits */
(function(){const n0=npcAct;npcAct=function(v,t){if(!v||!v.plan||!v.plan.j70||window.__j70off)return n0.apply(this,arguments);const P=v.plan;v.plan=null;let r="";
  try{r=n0.apply(this,arguments)}finally{if(v.plan&&v.plan!==P){v.plan=P;r=""}else v.plan=P}return r}})();
/* faction orders: a joint scheme against her is prepared as a chain too */
let jointScheme0=null;
(function(){if(typeof jointScheme!=="function")return;jointScheme0=jointScheme;jointScheme=function(f,t){try{if(j70On()&&t===S&&!window.__j70exec){const l=facLeader(f);if(l&&l!==S&&!l.plan&&canNew70(l.id,"me")){const p=newPlot70(l,S,"joint",null,"fac",{fac:1});if(p&&!p.end){l.plan={k:"joint",t:"me",due:1e9,err:0,j70:p.id};return ""}}}}catch(e){console.error(e)}return jointScheme0.apply(this,arguments)}})();

/* ---------- detection (same shape for everyone) ---------- */
function spyIn70(watcher,a){if(a===S)return(S.staff||[]).some(s=>s.spyFor===key(watcher));return(a.staff||[]).some(s=>s.spyFor===(watcher===S?"me":key(watcher)))}
function seeP70(p,step){const a=pa70(p),t=pt70(p),r=pr70(p);const tc=tc70(a);let c;
 if(t===S||(a!==S&&t!==S)){/* her eyes */c=10+(S.mat||0)*6+(S.staff||[]).filter(s=>netIs(s,"sharp")||netIs(s,"talk")).length*6+(tc<BAL.wit.mid?12:0)-(tc>=BAL.wit.top?8:0)+(r?r.vis:0)+(spyIn70(S,a)?30:0)+(r&&r.pl&&S.place===r.pl?15:0)-nq(a,"hide",BAL.net.k.hide);
  if(t===S)c+=(S.maid&&S.maid.loyal>=BAL.loy.trust?10:0);else c*=J70CFG.npcSeen}
 return cl(Math.round(c),3,85)}
/* an NPC target (also when she is the plotter) notices with its own people */
function npcSee70(p){const a=pa70(p),t=pt70(p),r=pr70(p);if(t===S)return 0;const tc=tc70(a);return cl(Math.round(8+tc70(t)/4+(t.maid&&t.maid.loyal>=BAL.loy.trust?8:0)+(r?r.vis:0)+(spyIn70(t,a)?30:0)+(tc<BAL.wit.mid?12:0)-(tc>=BAL.wit.top?8:0)),3,80)}

/* ---------- the weekly step ---------- */
function abandon70(p,why){p.end=why||"cool";const a=pa70(p);if(a&&a!==S&&a.plan&&a.plan.j70===p.id)a.plan=null;try{if(a&&a!==S)mindLog(a,"_abandon")}catch(e){}
 if(p.kn&&a&&a!==S&&why==="cool"&&roll(seeP70(p,p.pg))){noteAdd(a.id,`có vẻ đã nguôi giận, bỏ dở mưu ${pm70(p).n.toLowerCase()}`);log(`Tai mắt báo: ${a.name} đã bỏ dở mưu ${pm70(p).n.toLowerCase()} nhắm vào ${nm70(pt70(p))}.`)}}
function step70(p){const a=pa70(p),t=pt70(p),M=pm70(p);if(!M||!a||!t){p.end="gone";return}
 if(!alive70(a)||!alive70(t)){abandon70(p,"gone");return}
 if(a!==S&&a.confined)return;/* paused while confined */
 if(p.kid&&!(t===S?S.kids:t.kids||[]).some(k=>k.alive&&k.name===p.kid)){abandon70(p,"gone");return}
 /* motive cools: the band needed for the method is no longer reached */
 if(a!==S&&!p.fac){if(bandOf(danger(a,t))<M.band){p.cool++;if(p.cool>=J70CFG.cool){abandon70(p,"cool");return}}else p.cool=0}
 if(p.st==="prep"){const i=p.pg;p.pg++;
  /* her eyes on a plot by someone else */
  if(a!==S&&!p.kn&&roll(seeP70(p,i))){p.kn=1;p.kt.push(tellOf70(p,i));p.pend=t===S?"seen":"npc";noteAdd(a.id,`Tai mắt báo: ${tellOf70(p,i)}${where70(p)?` (ở ${where70(p)})`:""}${t===S?" — có lẽ nhắm vào ngươi":` — có lẽ nhắm vào ${t.name}`}`);try{newsAdd(a,M.k,`Người của ${a.name} ${tellOf70(p,i)}`,true)}catch(e){}}
  else if(a!==S&&p.kn&&roll(seeP70(p,i)))p.kt.push(tellOf70(p,i));
  /* the target's own people */
  if(t!==S&&roll(npcSee70(p))){p.g+=20;if(roll(35))evA(t,a,BAL.eff.j70.evStep70);if(a===S&&S.maid&&S.maid.loyal>=BAL.loy.close&&roll(50))p.warnOwn=1/* her maid saw their guard go up */}
  /* allies warn her of a plot she has not seen */
  if(t===S&&!p.kn){const al=liveRivals(true).filter(x=>x!==a&&aff(x,S)>=40&&!x.confined&&roll(cl(6+tc70(x)/5+(r70vis(p)),3,40)));if(al.length){const w=pick(al);/* an ally whose own people really saw the tell */p.kn=1;p.ally=w.id;p.kt.push(tellOf70(p,i));p.pend="warn";relAdd(S,w,BAL.eff.j70.step70)}}
  /* her first weeks: a murder plot never lands without one warning */
  if(t===S&&!p.kn&&M.band>=3&&p.pg>=p.need&&S.turn<4){p.kn=1;p.kt.push(tellOf70(p,i));p.pend="seen";p.forced=1}
  if(p.pg>=p.need){p.st="wait";p.wt=0;if(a===S)p.pend="when"}return}
 if(p.st==="wait"){p.wt++;
  if(a===S){return}/* she chooses the moment herself */
  /* a seen warning not yet shown waits one week so she can answer it */
  if(t===S&&p.pend&&p.pend!=="aft"&&p.wt<=1)return;
  const o=M.opp.find(k=>k!=="night"&&OPP70[k].ok(p,t));if(o||p.wt>J70CFG.waitMax)exec70(p,o||"night")}}
/* ---------- execution: the existing act does the work ---------- */
function exec70(p,opp){const a=pa70(p),t=pt70(p),M=pm70(p);const O=OPP70[opp]||OPP70.night;p.opp=opp;p.st="done";p.end="done";j70().done++;
 if(a!==S&&a.plan&&a.plan.j70===p.id)a.plan=null;
 if(!okAct70(a,t,M.k)&&M.k!=="joint"){p.end="miss";try{mindLog(a,"_abandon")}catch(e){}if(p.kn&&a!==S)log(`${a.name} bày mưu ${M.n.toLowerCase()} nhưng thời cơ đã qua, đành thôi.`);return ""}
 let r="";const bonus=J70CFG.prep+O.b+(p.bonus||0);const err=(p.err||0)+p.g-bonus;
 if(p.foil){/* cut at the root earlier *//*evok: plot deed (newPlot70)*/evA(t===S?S:t,a,BAL.eff.j70.evExec70);r=`${a===S?"Ngươi":a.name} định ra tay (${M.n.toLowerCase()}) ${O.n}, nhưng đường dây đã bị cắt từ trước. ${t===S?`Ngươi nắm thêm ${balAb(BAL.eff.j70.evExec70)} chứng cứ về ${a.name}.`:""}`;try{if(a!==S){a.fails=a.fails||{};a.fails[M.k]=(a.fails[M.k]||0)+1}}catch(e){}}
 else if(p.trap){/*evok: plot deed*/evA(S,a,BAL.eff.j70.evExec70_2);try{punish(a,`bị bắt quả tang ${M.n.toLowerCase()} nhắm vào ${nm70(t)}`,2)}catch(e){}relAdd(a,S,BAL.eff.j70.exec70);r=`Bẫy của ngươi sập đúng lúc: người của ${a.name} bị bắt quả tang ${M.n.toLowerCase()} ${O.n}. Chứng cứ ${balSg(BAL.eff.j70.evExec70_2)}.`}
 else{window.__j70exec=1;try{
   if(M.k==="joint"){const f=facOf(a);r=f&&jointScheme0?jointScheme0(f,t):""}
   else if(a===S){S.__err=err;try{r=runAct(S,t,M.k)}finally{S.__err=0}}
   else if(M.k==="plant"){const ix=(a.inv||[]).findIndex(e=>e.t||(IT[e.k]&&itm(e.k).il));if(ix<0){p.end="miss";return ""}a.__err=err;try{r=runAct(a,t,"plant",ix)}finally{a.__err=0}}
   else r=mindRun(a,t,M.k,err)}catch(e){console.error(e)}finally{window.__j70exec=0}
  if(a!==S&&t!==S&&!p.kn)r=seenNPC(a,t,r)||"";}
 p.res=String(r||"").replace(/<br>/g," ").replace(/<[^>]+>/g,"").slice(0,400);p.resH=String(r||"").slice(0,1500);
 if(r)log(`${R70("Mưu hại")} · ${r}`);
 if(t===S&&!S.dead){p.pend="aft";p.trail=(p.kn?1:0)+(p.kt.length>1?1:0)+(p.acc?1:0)}
 else if(a===S&&!S.dead){p.pend="ownres"}
 return r}

/* ---------- modals (persisted through PEND so a save keeps them) ---------- */
function intro70(p,stage){const a=pa70(p),t=pt70(p),M=pm70(p),r=pr70(p);const W=where70(p);const tl=p.kt.length?p.kt[p.kt.length-1]:tellOf70(p,0);
 if(stage==="warn"){const w=RV(p.ally);return `<p>${w?w.name:"Một người chị em"} lén sai người sang báo: “Người của ta tận mắt thấy người của ${a.name} ${tl}. Muội nên cẩn thận.”</p>`}
 if(stage==="serv"){const s=servById(p.sv);return `<p>${s?s.name:"Một cung nữ"} quỳ trước mặt ngươi, run run dâng ra túi bạc: người của ${a.name} muốn mua nàng ${r?r.n.toLowerCase():"làm việc mờ ám"}. Nàng không nhận.</p>`}
 if(stage==="npc")return `<p>Tai mắt báo: người của ${a.name} ${tl}${W?` (ở ${W})`:""}. Xem ra nàng đang bày mưu <b>${M.n.toLowerCase()}</b> nhắm vào ${t.name}.</p>`;
 return `<p>${p.forced&&S.maid?`${S.maid.name} hớt hải chạy vào: `:"Tai mắt báo: "}người của ${a.name} ${tl}${W?` (ở ${W})`:""}.</p>`}
/* the motive as it really stands now (real values of the plotter toward the target) */
function mot70(p){const a=pa70(p),t=pt70(p);if(p.mo==="fac"||p.mo==="ngoi"||p.mo==="nhuc"||!a||!t||a===S)return MOT70[p.mo]||MOT70.band;
 const g=t===S?(a.ghen||0):0,o=Math.round(oan(a,t)),h=Math.max(0,-aff(a,t));if(g>=o&&g>=h)return `ghen với ${nm70(t)} (Ghen ${g})`;if(o>=h)return `oán ${nm70(t)} (Oán ${o})`;return `ghét ${nm70(t)} (thiện cảm ${aff(a,t)})`}
function know70(p){const M=pm70(p),r=pr70(p);const a=pa70(p);const ev=a?evG(S,a):0;
 return `<p class="past">Từ dấu vết ấy: mưu <b>${M.n.toLowerCase()}</b>${p.dig?` (cách: ${r.n.toLowerCase()}; nàng sẽ chờ ${M.opp.map(k=>OPP70[k].n).slice(0,2).join(" hoặc ")})`:""}, vì ${mot70(p)}. Đã chuẩn bị ${Math.min(p.pg,p.need)}/${p.need} bước. Chứng cứ về ${a?a.name:"nàng"}: ${ev}${ev>=2?"":" (cần 2 để tố giác)"}.</p>`}
function optsSeen70(p){const a=pa70(p),M=pm70(p),r=pr70(p);const mat=S.mat||0,tc=S.tamco||0;const o=[];const A={o:a,n:a.name,k:"rv"};
 o.push(ch70(`Đề phòng: ${r.gd.toLowerCase()}`,{c:{bac:-10},wt:[G70("mưu của nàng khó thành hơn nhiều (giữ được mình)")],k:[R70("nàng vẫn còn ý hại")],ok:()=>{p.g+=25;p.pend=0;return `Ngươi ${r.gd.toLowerCase()}. Mưu của ${a.name} khó thành hơn.`}}));
 if(!p.dig)o.push(ch70("Cho người dò tiếp",{c:{bac:-15},p:40+mat*7+tc/6,wt:[G70(`chứng cứ về ${a.name} ${balSg(BAL.eff.j70.evOk)}`),G70("biết rõ cách và thời cơ nàng chờ")],lt:[R70("nàng biết bị dò, ra tay sớm hơn")],ok:()=>{/*evok: plot deed*/evA(S,a,BAL.eff.j70.evOk);p.dig=1;p.pend=0;return `Người của ngươi lần ra: ${a.name} ${r.n.toLowerCase()}, chờ ${OPP70[M.opp[0]].n}. Chứng cứ ${balSg(BAL.eff.j70.evOk)}.`},no:()=>{p.pg=Math.max(p.pg,p.need);p.pend=0;return `${a.name} biết mình bị dò, gấp rút ra tay.`}}));
 o.push(ch70(`Chặn từ gốc: ${r.st.toLowerCase()}`,{c:{bac:-30},p:42+mat*5+tc/5+(p.dig?12:0),/* previews: exec70 (p.foil) */wt:[G70("mưu bị cắt đứt"),G70(`chứng cứ về ${a.name} ${balSg(BAL.eff.j70.evExec70)}`)],lt:[R70(`${a.name} oán ngươi ${balSg(BAL.eff.j70.no)}`),R70("mưu vẫn tiếp tục")],ok:()=>{p.foil=1;p.pend=0;return `Ngươi ${r.st.toLowerCase()}. Đường dây của ${a.name} đã đứt.`},no:()=>{oanAdd(a,S,BAL.eff.j70.no);p.pend=0;return `Việc chặn không thành, ${a.name} sinh nghi.`}}));
 if(ACT.accuse&&(rkOf(a)<7||rkOf(S)>=3)){const c=ch70(`Tố giác ${a.name} ngay`,{need:[{t:kitWhyEv(a,accNeed(a)),ok:accOK(S,a),w:kitWhenEv()}],p:oAccuse(S,a),wt:[G70("nàng bị xử theo chứng cứ, mưu tan")],lt:[R70("tố hụt: mất chứng cứ, Danh giảm")]});c.go=()=>{p.pend=0;const x=runAct(S,a,"accuse");if(!alive70(a)||a.confined)abandon70(p,"exposed");log(x||"Ngươi tố giác.")};o.push(c)}
 o.push(ch70("Lấy kế trả kế: để nàng ra tay rồi bắt quả tang",{c:{suc:-5},p:32+mat*6+tc/4+(p.dig?15:0),/* previews: exec70 (p.trap) */wt:[G70("nàng bị bắt quả tang, bị phạt"),G70(`chứng cứ về ${a.name} ${balSg(BAL.eff.j70.evExec70_2)}`)],lt:[R70("bẫy hở: nàng ra tay dễ hơn")],ok:()=>{p.trap=1;p.pend=0;return `Ngươi giăng sẵn người, chờ ${a.name} ra tay.`},no:()=>{p.g-=10;p.pend=0;return `Bẫy của ngươi bị lộ, lại khiến mình lơ là.`}}));
 const alt=others(a).filter(x=>x!==S&&alive70(x)&&oan(a,x)>=20&&!(typeof sameHouse==="function"&&sameHouse(a,x)));
 if(alt.length&&M.k!=="musk"&&M.k!=="catswap"&&!p.kid){const x=alt.sort((u,v)=>oan(a,v)-oan(a,u))[0];o.push(ch70(`Xui khiến nàng nhắm sang ${x.name}`,{c:{bac:-40},p:28+tc/4+mat*3,wt:[G70("mưu đổi hướng khỏi ngươi")],lt:[R70(`${a.name} oán ngươi ${balSg(BAL.eff.j70.no_2)}`)],k:[R70(`${x.name} có thể gặp nạn`)],ok:()=>{p.t=x.id;p.pend=0;p.kn=1;duc70(S,-3,"xui người hại kẻ khác");return `Lời xui của ngươi lọt tai: ${a.name} quay sang nhắm vào ${x.name}.`},no:()=>{oanAdd(a,S,BAL.eff.j70.no_2);p.pend=0;return `${a.name} biết ngươi giật dây.`}}))}
 o.push(ch70("Mặc kệ, đợi xem",{wt:[G70("không tốn gì")],k:[R70("mưu vẫn tiến hành")],ok:()=>{p.pend=0;return "Ngươi lặng im chờ xem."}}));return o}
function optsNpc70(p){const a=pa70(p),t=pt70(p),M=pm70(p),mat=S.mat||0;return[
 ch70(`Lén báo cho ${t.name}`,{c:{bac:-5},wt:[G70(`${t.name} thiện cảm ${balSg(BAL.eff.j70.ok)}`),G70("mưu khó thành")],k:[R70(`nếu lộ, ${a.name} oán ngươi`)],ok:()=>{p.g+=25;relAdd(S,t,BAL.eff.j70.ok);p.pend=0;duc70(S,2,"báo tin cứu người");if(roll(30)){oanAdd(a,S,BAL.eff.j70.ok_2);return `${t.name} cảm kích. Nhưng ${a.name} biết là ngươi mách.`}return `${t.name} cảm kích, đã đề phòng.`}}),
 ch70("Gom chứng cứ, để dành",{c:{bac:-15},p:45+mat*7,wt:[G70(`chứng cứ về ${a.name} ${balSg(BAL.eff.j70.evOk_2)}`)],lt:[R70("mất bạc")],ok:()=>{/*evok: plot deed*/evA(S,a,BAL.eff.j70.evOk_2);p.pend=0;return `Ngươi nắm thêm ${balAb(BAL.eff.j70.evOk_2)} chứng cứ về ${a.name}.`},no:()=>{p.pend=0;return "Người của ngươi không lấy được gì."}}),
 ch70("Ngồi xem hai bên sứt mẻ",{wt:[G70("không dính líu")],k:[R70(`${t.name} có thể gặp nạn`)],ok:()=>{p.pend=0;return "Ngươi đứng ngoài."}})]}
function optsAft70(p){const a=pa70(p),M=pm70(p),mat=S.mat||0;const o=[];const ev=evG(S,a);
 o.push(ch70("Tra xét đến cùng",{c:{bac:-20},p:30+mat*8+(p.trail||0)*12+(p.dig?10:0),wt:[G70("lần ra kẻ chủ mưu thật"),G70(`chứng cứ ${balSg(BAL.eff.j70.evOk_3)}`)],lt:[R70("dấu vết đứt, không biết là ai")],ok:()=>{/*evok: plot deed*/evA(S,a,BAL.eff.j70.evOk_3);p.pend=0;const s=p.acc?servById(p.acc):null;noteAdd(a.id,`đứng sau vụ ${M.n.toLowerCase()} nhắm vào ngươi${s?` (đồng lõa: ${s.name})`:""}`);return `Tra ra rồi: chính ${a.name} đứng sau${s?`, ${s.name} trong cung ngươi là đồng lõa`:""}. Chứng cứ ${balSg(BAL.eff.j70.evOk_3)}.`},no:()=>{p.pend=0;return "Dấu vết đứt giữa chừng; ngươi chưa biết là ai."}}));
 const s=p.acc?servById(p.acc):null;if(s&&(S.staff||[]).includes(s)&&p.dig)o.push(ch70(`Giao ${s.name} cho Thận Hình ti`,{wt:[G70("bớt một kẻ phản trong cung")],k:[R70("kẻ hầu khác run sợ")],ok:()=>{S.staff.splice(S.staff.indexOf(s),1);(S.staff||[]).forEach(x=>x.loyal=cl(x.loyal-BAL.eff.j70.loyalOk,0,100));p.pend=0;return `${s.name} bị giải đi.`}}));
 if(rkOf(a)<7||rkOf(S)>=3){const c=ch70(`Tố giác ${a.name}`,{need:[{t:kitWhyEv(a,accNeed(a)),ok:accOK(S,a),w:kitWhenEv()}],p:oAccuse(S,a),wt:[G70("nàng bị xử theo chứng cứ")],lt:[R70("tố hụt: mất chứng cứ, Danh giảm")]});c.go=()=>{p.pend=0;log(runAct(S,a,"accuse")||"Ngươi tố giác.")};o.push(c)}
 o.push(ch70("Nuốt giận, đợi thời",{wt:[G70("Đức +1")],k:[R70(`${a.name} vẫn nhởn nhơ`)],ok:()=>{apply({duc:1});p.pend=0;return "Ngươi nén giận, chờ thời cơ."}}));return o}
/* her own plot: the start, the moment, the end */
function optsWhen70(p){const t=pt70(p),M=pm70(p);const now=M.opp.find(k=>k!=="night"&&OPP70[k].ok(p,t))||"night";const bn=J70CFG.prep+OPP70[now].b+(p.bonus||0)-p.g;const o0=oddsOf70(S,t,M.k,bn);const o=[];
 const ex=ch70(`Ra tay ${OPP70[now].n}`,{p:o0==null?null:o0,wt:[G70(`${M.n} thành`)],lt:[R70("dễ bị lộ, nàng nắm chứng cứ")],k:p.g>0?[R70(`${t.name} có vẻ đã đề phòng`)]:[]});ex.go=()=>{p.pend=0;exec70(p,now)};if(o0==null)ex.x=`thành: ${G70(M.n)} · kèm: ${R70("dễ bị lộ, nàng nắm chứng cứ")}`;o.push(ex);
 const fut=M.opp.filter(k=>k!==now&&k!=="night");if(fut.length&&p.wt<6){const k=fut[0];const o1=oddsOf70(S,t,M.k,J70CFG.prep+OPP70[k].b+(p.bonus||0)-p.g);o.push(ch70(`Đợi ${OPP70[k].n}`,{wt:[G70(o1!=null?`lúc đó: ${word(o1)}`:"thời cơ tốt hơn")],k:[R70("đợi lâu, dấu vết càng nhiều")],ok:()=>{p.pend=0;p.hold=k;return `Ngươi chờ ${OPP70[k].n}.`}}))}
 o.push(ch70("Bỏ mưu",{wt:[G70("không còn rủi ro")],k:[R70("bạc đã bỏ ra không lấy lại")],ok:()=>{abandon70(p,"own");return "Ngươi bỏ mưu, xóa dấu vết."}}));return o}
PEND.j70=pp=>{const p=P70(pp.id);if(!p||!S)return null;const a=pa70(p),t=pt70(p);if(!a||!t)return null;const st=pp.s;
 if(st==="seen"||st==="warn"||st==="serv"){/* previews: newPlot70 (serv / ownfail: the refusal evA) */if(st==="serv")return{t:intro70(p,st)+`<p class="past">Chứng cứ về ${a.name} ${balSg(BAL.eff.j70.evNewPlot70)}. Đường dây này đã đứt, nhưng nàng vẫn còn ý hại ngươi.</p>`,o:[ch70(`Thưởng ${(servById(p.sv)||{}).name||"nàng"} 10 lượng`,{c:{bac:-10},wt:[G70("kẻ hầu càng trung thành")],ok:()=>{const s=servById(p.sv);if(s)s.loyal=cl(s.loyal+BAL.eff.j70.loyalOk_2,0,100);return "Ngươi thưởng bạc cho kẻ hầu trung thành."}}),ch70("Dặn nàng giữ kín, coi như chưa có gì",{wt:[G70("kẻ chủ mưu không biết ngươi đã rõ")],k:[R70("nàng ta vẫn còn ý hại")],ok:()=>"Ngươi dặn kẻ hầu giữ kín."})],who:(()=>{const s=servById(p.sv);try{return s?pServ(s):who70(a)}catch(e){return who70(a)}})()};
  if(p.end)return null;return{t:intro70(p,st)+know70(p),o:optsSeen70(p),who:st==="warn"&&RV(p.ally)?pv(RV(p.ally)):who70(a)}}
 if(st==="npc"){if(p.end)return null;return{t:intro70(p,st),o:optsNpc70(p),who:who70(a)}}
 if(st==="aft"){const M=pm70(p);return{t:`<p>${p.resH||p.res||`Vụ ${M.n.toLowerCase()} vừa xảy ra.`}</p><p class="past">Sau vụ này cả cung xôn xao. ${p.kn?`Ngươi đã từng thấy dấu hiệu từ người của ${a.name}.`:"Ngươi chưa rõ ai đứng sau."}</p>`,o:optsAft70(p),who:p.kn?who70(a):null}}
 if(st==="when"){if(p.end)return null;const M=pm70(p);return{t:`<p>Mưu <b>${M.n.toLowerCase()}</b> nhắm vào ${t.name} đã chuẩn bị xong.${p.warnOwn&&S.maid?` ${S.maid.name} thì thầm: hình như bên ${t.name} đã sinh nghi.`:""}</p><p class="past">Chờ được thời cơ tốt thì càng dễ thành, nhưng mỗi tuần chờ thêm là thêm một lần dấu vết có thể lộ.</p>`,o:optsWhen70(p),who:who70(t)}}
 if(st==="ownres"){const M=pm70(p);return{t:`<p>${p.res||`Mưu ${M.n.toLowerCase()} đã xong.`}</p><p class="past">${p.g>0?`${t.name} đã có đề phòng từ trước; nàng có thể đang tra xét.`:"Chưa thấy ai lần ra dấu vết."}</p>`,o:[ch70("Xóa dấu vết",{c:{bac:-20},p:45+(S.tamco||0)/4+(S.mat||0)*4,wt:[G70(`${t.name} mất ${balAb(BAL.eff.j70.evOk_4)} chứng cứ về ngươi`)],lt:[R70("mất bạc, dấu vết còn đó")],ok:()=>{evA(t,S,BAL.eff.j70.evOk_4);return "Ngươi cho người dọn sạch dấu vết."}}),ch70("Để yên",{wt:[G70("không tốn bạc")],k:[R70("dấu vết còn đó")],ok:()=>"Ngươi để mọi chuyện lắng xuống."})],who:who70(t)}}
 if(st==="ownfail"){const s=servById(p.acc);return{t:`<p>${s?s.name:"Kẻ hầu"} bên cung ${t.name} không nhận bạc của ngươi, lại đem chuyện kể với chủ.</p><p class="past">${t.name} nắm thêm ${balAb(BAL.eff.j70.evNewPlot70)} chứng cứ về ngươi; mưu này đành bỏ.</p>`,o:[ch70("Đành vậy",{wt:[G70("giữ được bạc")],k:[R70(`${t.name} đề phòng ngươi`)],ok:()=>"Ngươi đành bỏ mưu."})],who:who70(t)}}
 if(st==="start"){return null}
 return null};
const T70={seen:"Mưu hại",warn:"Lời cảnh báo",serv:"Kẻ hầu trung thành",npc:"Tai mắt báo tin",aft:"Sau vụ mưu hại",when:"Thời cơ ra tay",ownres:"Mưu đã xong",ownfail:"Mưu bị lộ"};
function inQ70(p){return Q.some(m=>m.pid==="j70"&&m.pp&&m.pp.id===p.id)}
function push70(p,front){if(inQ70(p))return false;const st=p.pend;const d=mkP("j70",{id:p.id,s:st});if(!d){p.pend=0;return false}const m={t:T70[st]||"Mưu hại",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp};if(d.kit)m.kit=d.kit;if(front)Q.unshift(m);else Q.push(m);
 if(st!=="seen"&&st!=="warn"&&st!=="npc")p.pend=0;return true}
/* one big beat per tuần; aftermath and her own decisions first */
function show70(){const z=j70();if(!z)return;const L=z.pl.filter(p=>p.pend&&!inQ70(p));if(!L.length)return;
 const pr={aft:0,serv:1,seen:2,warn:2,when:3,ownfail:3,ownres:4,npc:5};L.sort((x,y)=>(pr[x.pend]||9)-(pr[y.pend]||9));
 const urgent=L[0].pend==="aft"||(L[0].forced);if(Q.length>2&&!urgent)return;if(busy70()&&!urgent)return;
 const p=L[0];if(p.pend==="npc"){if(typeof evCooldown==="function"&&!evCooldown("j70npc",3)){p.pend=0;return}}
 if(push70(p))mark70()}
function tick70(){const z=j70();if(!z)return;z.sh.push(S.sung||0);if(z.sh.length>8)z.sh.shift();
 try{motiveTick70()}catch(e){console.error(e)}
 for(const p of z.pl.slice()){if(p.end)continue;try{step70(p)}catch(e){console.error(e);p.end="err"}if(S.dead)return}
 z.pl=z.pl.filter(p=>!p.end||p.pend||wk()-p.born<36).slice(-30);
 try{show70()}catch(e){console.error(e)}}
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(j70On()&&w0!=null&&wk()!==w0){tick70();if(Q.length&&$("modal").hidden)showModal()}}catch(x){console.error(x)}return r}})();

/* ---------- places and her own spying reveal plots ---------- */
(function(){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(j70On()&&S.place===k){const z=j70();for(const p of z.pl){if(p.end||p.kn||p.st!=="prep"||p.a==="me")continue;const R=pr70(p);if(!R||R.pl!==k||!roll(35))continue;const a=pa70(p);p.kn=1;p.kt.push(tellOf70(p,p.pg));p.pend=p.t==="me"?"seen":"npc";noteAdd(a.id,`Ở ${placeName(k)}, ngươi thấy người của nàng ${tellOf70(p,p.pg)}`);log(`Ở ${placeName(k)}, ngươi tình cờ thấy người của ${a.name} ${tellOf70(p,p.pg)}.`);break}}}catch(e){console.error(e)}return r}})();
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];
  /* her own plot: a big act can be done at once (as before) or prepared as a chain */
  try{if(j70On()&&v&&OWN70[k]&&!window.__j70inst&&ACT[k]&&can(2)&&!Q.length&&v.alive&&!v.out&&ACT[k].ok(S,v)&&!(typeof sameHouse==="function"&&sameHouse(S,v))){Q.push(start70(v,k));showModal();render();return}}catch(e){console.error(e)}
  const r=d0.apply(this,arguments);
  try{if(j70On()&&k==="spy"&&v){const p=j70().pl.find(p=>!p.end&&p.a===v.id&&!p.kn);if(p&&roll(50)){p.kn=1;p.dig=1;p.kt.push(tellOf70(p,p.pg));p.pend=p.t==="me"?"seen":"npc";noteAdd(v.id,`dò la ra: nàng đang bày mưu ${pm70(p).n.toLowerCase()} nhắm vào ${nm70(pt70(p))}`);log(`Dò la ra: ${v.name} đang bày mưu ${pm70(p).n.toLowerCase()} nhắm vào ${nm70(pt70(p))}.`)}}}catch(e){console.error(e)}
  return r}})();
function start70(v,k){const d=mkP("j70start",{v:v.id,k});return{t:"Bày mưu",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,kit:{kind:"choice",title:"Bày mưu",subject:v,facts:pfacts70(d.t)}}}
PEND.j70start=pp=>{const v=RV(pp.v),A=ACT[pp.k];if(!v||!A||!S)return null;const k=pp.k;const o0=A.o?(()=>{try{return cl(A.o(S,v),5,95)}catch(e){return null}})():null;const O=[];
 const now=ch70(`Ra tay ngay: ${A.n.toLowerCase()}`,{p:o0,wt:[G70(A.x&&!/^cần|^lộ/.test(A.x)?A.x:A.n)],lt:[R70("dễ bị lộ, nàng nắm chứng cứ")],k:A.c&&Object.keys(A.c).length?[R70(fmt(A.c))]:[]});now.go=()=>{window.__j70inst=1;try{doAct(rivals.indexOf(v),k)}finally{window.__j70inst=0}};if(o0==null)now.x=`thành: ${G70(A.x||A.n)} · kèm: ${R70("dễ bị lộ")}${A.c&&Object.keys(A.c).length?", "+R70(fmt(A.c)):""}`;O.push(now);
 const busyOwn=!canNew70("me",v.id);
 for(const m of OWN70[k]){const M=M70[m];for(const r of M.R){if(O.length>=5)break;if(r.acc==="tsv"&&!(v.staff||[]).length)continue;const o1=oddsOf70(S,v,M.k,J70CFG.prep+6+(r.acc?8:0));
   const c=ch70(`Bày mưu: ${r.n.toLowerCase()}`,{c:r.bac?{bac:-r.bac}:{},wt:[G70(`chuẩn bị ${r.need} tuần, chờ ${OPP70[M.opp[0]].n}`),G70(o1!=null?`lúc ra tay: ${word(o1)}`:"dễ thành hơn")],k:[R70(`dấu vết: ${r.tl[0].replace(/nạn nhân/g,v.name)}`),R70(`${v.name} có thể phát hiện`)]});
   c.go=()=>{if(!canNew70("me",v.id)){log("Ngươi đang theo đuổi đủ mưu rồi.");return}spend(2);const p=newPlot70(S,v,m,r.id,"own");if(p&&!p.end)log(`Ngươi bắt đầu bày mưu ${M.n.toLowerCase()} nhắm vào ${v.name}: ${r.n.toLowerCase()}.`);if(p&&p.pend==="ownfail"){push70(p,true)}};if(!busyOwn)O.push(c)}}
 O.push(ch70("Thôi",{ok:()=>"Ngươi gác lại ý định."}));
 return{t:`<p>Ngươi định ${A.n.toLowerCase()} ${v.name}.</p><p class="past">Ra tay ngay thì nhanh mà dễ hỏng; bày mưu từ từ thì dễ thành hơn, nhưng mỗi tuần chuẩn bị là thêm một lần người của nàng có thể bắt gặp.${busyOwn?" Ngươi đang theo đuổi đủ mưu, chỉ có thể ra tay ngay.":""}</p>`,o:O,who:pv(v)}};
/* her pending decision on a held plot comes back when the awaited moment arrives (or after a while) */
(function(){const s0=step70;step70=function(p){if(p.a==="me"&&p.st==="wait"&&!p.end&&!p.pend){const t=pt70(p);if(!alive70(t)){abandon70(p,"gone");return}p.wt++;if(t!==S&&roll(npcSee70(p))){p.g+=10;if(roll(25))evA(t,S,BAL.eff.j70.evTop)}
  if(!inQ70(p)&&(!p.hold||OPP70[p.hold].ok(p,t)||p.wt>=6)){p.hold=null;p.pend="when"}return}return s0.apply(this,arguments)}})();

/* ---------- testing helpers (in page) ---------- */
window.j70Force=function(m,rid,aId,tKey){const M=M70[m];if(!M||!S)return null;const a=aId==null?liveRivals(true).filter(v=>!v.plan)[0]:(aId==="me"?S:RV(aId));const t=tKey==null||tKey==="me"?S:RV(tKey);if(!a||!t)return null;
 const p=newPlot70(a,t,m,rid||null,"band");if(p&&a!==S&&!p.end)a.plan={k:M.k,t:key(t),due:1e9,err:0,j70:p.id};return p};
window.j70Tick=function(){tick70();if(Q.length&&$("modal").hidden)showModal();return(j70().pl||[]).map(p=>({id:p.id,m:p.m,r:p.r,st:p.st,pg:p.pg,need:p.need,kn:p.kn,pend:p.pend,end:p.end}))};

/* ================= j70 PHÒNG BỊ: defences are HER standing orders; every threat notice says who, why, what stopped it, what she gained =================
   Orders (one per servant): canh (guard the palace), thudoc (taste food), theodoi (watch one consort), giuchung (keep records, stand witness).
   Each has a real effect, a real price (bạc per month, the servant's lòng, the servant is busy and cannot be sent on her errands) and a real risk
   (a servant already bribed by someone else gives no protection and tells that mistress). The old automatic "loyal maid guards you" bonus is now
   an explicit standing order (canh by her head maid) she can see and change. Data for the kit: defenceOrders(), threatsAgainstMe(), resolveNotices(). */
const ORD70={
 canh:{n:"Canh chừng cung",d:"bắt kẻ lẻn vào cài đồ, đẩy ngã, tung tin; thấy dấu vết mưu sớm hơn",bac:0,lo:0,acts:["plant","frame","pushp","trip","rumor","bribe","kframe","pond","ksab","catswap","block"]},
 thudoc:{n:"Thử độc đồ ăn",d:"nếm trước mọi món; dễ phát hiện độc, xạ hương; có khi chính kẻ thử ngã thay ngươi",bac:10,lo:-2,acts:["poison","kpoison","musk"]},
 theodoi:{n:"Theo dõi một người",d:"bám theo một phi tần: thấy mưu của nàng sớm hơn nhiều, mỗi tháng có thể lấy thêm chứng cứ",bac:10,lo:0,tgt:1},
 giuchung:{n:"Giữ sổ sách, làm chứng",d:"ghi chép giờ giấc, giữ đồ đạc: vu oan, cài đồ, tung tin, tố giác nhắm vào ngươi khó thành hơn",bac:5,lo:0,acts:["frame","plant","kframe","rumor","accuse","vp"]}};
function ords70(){const z=j70();if(!z)return[];if(!z.ord)z.ord=[];
 for(let i=z.ord.length-1;i>=0;i--)if(!sv70(z.ord[i].sid))z.ord.splice(i,1);return z.ord}
function sv70(sid,p){if(p&&p!==S)return(p.staff||[]).find(s=>s.sid===sid)||null;if(sid==="maid")return S.maid||null;return(S.staff||[]).find(s=>s.sid===sid)||null}
/* an NPC consort's standing orders (AG-ALL-2e3 parity: her Phòng bị button, the NPC side = cx3:defOrd in jagacts3): the same ORD70 orders, kept on p.ord70 */
function tid70(x){return x===S?"me":x&&x.id}
function ords70Of(p){if(!p||p===S)return ords70();const L=p.ord70||[];for(let i=L.length-1;i>=0;i--)if(!sv70(L[i].sid,p))L.splice(i,1);return L}
function svN70(sid){const s=sv70(sid);return s?s.name:"kẻ hầu"}
function ordOf70(sid){return ords70().find(o=>o.sid===sid)||null}
function traitor70(s){return !!(s&&s.spyFor&&s.spyFor!=="me")}
/* the protection an order really gives (zero if that servant secretly serves someone else) */
function canhB70(o,p){const s=sv70(o.sid,p);if(!s||traitor70(s))return 0;return cl(Math.round(4+(s.loyal||0)/10),4,14)}
function ordFor70(k,a){return ords70().filter(o=>{const O=ORD70[o.k];if(!O)return false;if(o.k==="theodoi")return a&&o.tgt===a.id;return O.acts&&O.acts.includes(k)})}
function title70(p){if(!p||p===S)return"ngươi";try{const t=(typeof kitTitle==="function"&&kitTitle(p))||rkName(p);return `${t} ${p.name}`}catch(e){return p.name}}
/* her detection: the head maid's old built-in +10 now comes only from an explicit guard order */
(function(){const o0=oSee;oSee=function(t,p){let r=o0.apply(this,arguments);try{if((t||S)===S&&S&&!window.__j70off){if(S.maid&&S.maid.loyal>=BAL.loy.trust)r-=10;
  for(const o of ords70()){if(o.k==="canh")r+=canhB70(o);if(o.k==="thudoc"&&p&&!traitor70(sv70(o.sid)))r+=20;if(o.k==="theodoi"&&window.__j70A&&o.tgt===window.__j70A.id&&!traitor70(sv70(o.sid)))r+=12}
  r+=(window.__j70self||0);
  r=cl(Math.round(r),5,95)}
  else if(t&&t!==S&&t.ord70&&t.ord70.length&&!window.__j70off){for(const o of ords70Of(t)){if(traitor70(sv70(o.sid,t)))continue;if(o.k==="canh")r+=canhB70(o,t);if(o.k==="thudoc"&&p)r+=20;if(o.k==="theodoi"&&window.__j70A&&o.tgt===tid70(window.__j70A))r+=12}r=cl(Math.round(r),5,95)}}catch(e){}return r}})();
(function(){const c0=caught;caught=function(a){const p0=window.__j70A;window.__j70A=a;try{return c0.apply(this,arguments)}finally{window.__j70A=p0}}})();
/* her ordered servants are busy: she cannot send them on her own errands */
(function(){const b0=bestSent;bestSent=function(p){if(p&&p!==S&&p.ord70&&p.ord70.length&&!window.__j70off){const r=b0.apply(this,arguments);const busy=p.ord70.map(o=>o.sid);if(!r||!busy.includes(r.sid))return r;const L=(p.staff||[]).filter(s=>!s.spyFor&&!busy.includes(s.sid));if(!L.length)return null;return L.slice().sort((a,b)=>(b.loyal+nq(b,"sharp",BAL.net.k.spySharp))-(a.loyal+nq(a,"sharp",BAL.net.k.spySharp)))[0]}if(p===S&&S&&!window.__j70off){const busy=ords70().map(o=>o.sid);const L=(S.staff||[]).filter(s=>!s.spyFor&&!busy.includes(s.sid));if(!L.length)return null;return L.slice().sort((a,b)=>(b.loyal+nq(b,"sharp",BAL.net.k.spySharp))-(a.loyal+nq(a,"sharp",BAL.net.k.spySharp)))[0]}return b0.apply(this,arguments)}})();
/* plots by someone she has a watcher on, or with a guard posted, are seen earlier; a traitor watcher feeds the plotter instead */
(function(){const s0=seeP70;seeP70=function(p,step){let c=s0.apply(this,arguments);try{const a=pa70(p);if(a&&a!==S){if(S.maid&&S.maid.loyal>=BAL.loy.trust&&p.t==="me"){c-=10;if(roll(selfP70maid()))c+=10}for(const o of ords70()){if(o.k==="theodoi"&&o.tgt===a.id&&!traitor70(sv70(o.sid)))c+=30;if(o.k==="canh"&&p.t==="me")c+=canhB70(o)}
  const z=j70();if(z.allyW&&z.allyW.until>=wk()&&p.t==="me"&&z.allyW.id!==a.id)c+=15}
  const t=pt70(p);if(t&&t!==S&&t.ord70&&t.ord70.length)for(const o of ords70Of(t)){if(traitor70(sv70(o.sid,t)))continue;if(o.k==="theodoi"&&a&&o.tgt===tid70(a))c+=30;if(o.k==="canh")c+=canhB70(o,t)}}catch(e){}return cl(Math.round(c),3,90)}})();
/* monthly: prices, lòng, the watcher's evidence and risk */
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{if(S&&!S.dead&&!window.__j70off){ordMonth70();for(const v of liveRivals(true))if(v.ord70&&v.ord70.length)ordMonth70npc(v)}}catch(e){console.error(e)}return r}})();
function ordMonth70(){const L=ords70();for(const o of L.slice()){const O=ORD70[o.k],s=sv70(o.sid);if(!O||!s)continue;
  if(O.bac){if(S.bac>=O.bac)apply({bac:-O.bac});else{L.splice(L.indexOf(o),1);log(`Không đủ ${O.bac} lượng bạc, lệnh ${O.n.toLowerCase()} của ${s.name} phải bãi.`);continue}}
  if(O.lo)s.loyal=cl((s.loyal||0)+O.lo,0,100);
  if(o.k==="theodoi"){const v=RV(o.tgt);if(!v||!v.alive||v.out){L.splice(L.indexOf(o),1);continue}
   if(traitor70(s)){if(s.spyFor===key(v)&&roll(30))log(`${s.name} theo dõi ${title70(v)} nhưng chẳng mang về tin gì.`);continue}
   if(roll(BAL.def70.caught)){oanAdd(v,S,BAL.eff.j70.ordMonth70);s.loyal=cl((s.loyal||0)-BAL.eff.j70.loyalOrdMonth70,0,100);log(`${R70("Bị lộ:")} ${s.name} bám theo ${title70(v)} bị người bên ấy bắt gặp. ${v.name} oán ngươi ${balSg(BAL.eff.j70.ordMonth70)}, lòng ${s.name} -${balAb(BAL.eff.j70.loyalOrdMonth70)}.`)}
   else if(roll(BAL.def70.ev)){evA(S,v,BAL.eff.j70.evOrdMonth70);noteAdd(v.id,`${s.name} theo dõi, lấy được ${balAb(BAL.eff.j70.evOrdMonth70)} chứng cứ (nay ${evG(S,v)})`);log(`${s.name} theo dõi ${title70(v)}: thêm ${balAb(BAL.eff.j70.evOrdMonth70)} chứng cứ (nay ${evG(S,v)}).`)}}}}
/* the same monthly price / lòng / watcher evidence for an NPC consort's orders (she pays bạc, the servant's lòng moves, a watcher may be caught or bring evidence) */
function ordMonth70npc(p){const L=ords70Of(p);for(const o of L.slice()){const O=ORD70[o.k],s=sv70(o.sid,p);if(!O||!s)continue;
  if(O.bac){if((p.bac||0)>=O.bac)ap(p,{bac:-O.bac});else{L.splice(L.indexOf(o),1);continue}}
  if(O.lo)s.loyal=cl((s.loyal||0)+O.lo,0,100);
  if(o.k==="theodoi"){const v=o.tgt==="me"?S:RV(o.tgt);if(!v||v.alive===false||v.out){L.splice(L.indexOf(o),1);continue}if(traitor70(s))continue;
   if(roll(BAL.def70.caught)){oanAdd(v,p,BAL.eff.j70.ordMonth70);s.loyal=cl((s.loyal||0)-BAL.eff.j70.loyalOrdMonth70,0,100);if(v===S)log(`${s.name}, người của ${title70(p)}, bám theo ngươi bị bắt gặp.`)}
   else if(roll(BAL.def70.ev))evA(p,v,BAL.eff.j70.evOrdMonth70)}}}
/* (a) people close to her protect her unasked: chance from lòng / affection / nature; each one who acts is named in the notice */
function selfP70maid(){return S.maid?cl(Math.round((S.maid.loyal-50)*4),0,95):0}
function self70(a){const out=[];const busy=ords70().map(o=>o.sid);
 if(S.maid&&!busy.includes("maid")&&roll(selfP70maid()))out.push({n:S.maid.name,b:10,t:`${S.maid.name} tự canh chừng cho ngươi (lòng ${S.maid.loyal})`});
 for(const s of S.staff||[]){if(busy.includes(s.sid)||traitor70(s)||netIs(s,"timid"))continue;const p=netIs(s,"loyal")?(s.loyal-50)*2:(s.loyal-80)*3;if(p>0&&roll(cl(p,0,85)))out.push({n:s.name,b:8,t:`${s.name} tự để mắt cho ngươi (lòng ${s.loyal}${s.kn?`, tính ${netTxt(s)}`:""})`})}
 for(const v of liveRivals(true)){if(v===a||v.confined)continue;const f=aff(v,S);if(f>=50&&roll(cl((f-40)/2,0,25)))out.push({n:v.name,b:8,t:`${title70(v)} thân với ngươi (thiện cảm ${f}), cho người báo tin`})}
 if((S.sung||0)>=70&&roll(10))out.push({n:"Hoàng thượng",b:10,t:`Hoàng thượng thương ngươi (Sủng ${S.sung}), cho thị vệ để mắt`});
 if(!S.thDead&&(S.th||0)>=60&&roll(8))out.push({n:"Thái hậu",b:8,t:`Thái hậu quý ngươi (${S.th}), sai người trông chừng`});
 return out}
/* giuchung makes slanders against her harder; thudoc's taster may fall in her place */
(function(){const r0=runAct;runAct=function(a,t,k,extra){if(t!==S||!a||a===S||!ACT[k]||!S||window.__j70off)return r0.apply(this,arguments);
  const snap={danh:S.danh,sung:S.sung,suc:S.suc,duc:S.duc,bac:S.bac,rank:S.rank,preg:S.preg||0,kids:(S.kids||[]).filter(x=>x.alive).length,cold:!!S.out,scar:!!S.scar};const e0=evG(S,a);const mo=motNow70(a);
  const used=[];let pre="";
  const tq=ordFor70(k,a).find(o=>o.k==="thudoc"&&!traitor70(sv70(o.sid)));
  if(tq&&roll(BAL.def70.taste)){const s=sv70(tq.sid);evA(S,a,BAL.eff.j70.evTop_2);const died=k!=="huydung"&&roll(BAL.def70.die);if(died&&tq.sid!=="maid"){S.staff.splice(S.staff.indexOf(s),1)}else s.loyal=cl((s.loyal||0)+BAL.eff.j70.loyalTop,0,100);try{if(k!=="huydung"&&!(died&&tq.sid!=="maid")&&typeof pzGive==="function"){pzGive(s,1,"nếm độc thay chủ",a,2);if(s.pz)s.pz.dx=1}}catch(e){}
   const n=note70({a,k,ok:false,mo,by:[`lệnh ${ORD70.thudoc.n.toLowerCase()} (${s.name})`],gain:evG(S,a)-e0,snap,body:k==="huydung"?`${s.name} thử hộp phấn trên tay trước, tay sưng phồng; phấn độc không chạm mặt ngươi.`:`${s.name} nếm trước bát thuốc, ${died&&tq.sid!=="maid"?"ngã gục, không qua khỏi":"đau bụng mấy ngày nhưng qua được"}; độc không đến miệng ngươi.`,known:true});return n}
  const gc=ordFor70(k,a).filter(o=>o.k==="giuchung"&&!traitor70(sv70(o.sid)));const e1=a.__err||0;if(gc.length)a.__err=e1+15;
  const SP=["ally","gift","spy"].includes(k)?[]:self70(a);const w0=window.__j70self;window.__j70self=SP.reduce((x,y)=>x+y.b,0);
  let r;try{r=r0.apply(this,arguments)}finally{a.__err=e1;window.__j70self=w0}if(!r)return r;
  const body=String(r).replace(/^<b>\[[^\]]*\]<\/b>\s*/,"").replace(/\s*<span class="g">\(Phòng bị của ngươi:[^<]*<\/span>/,"");
  const plain=body.replace(/<[^>]+>/g,"");const ok=!(FAILRE.test(plain)||/chặn kịp|phát giác|bắt quả tang|may có thuốc giải|không nhận|báo cho chủ|kể với/.test(plain));
  const known=plain.includes(a.name);
  if(!ok){ordFor70(k,a).forEach(o=>{if(!traitor70(sv70(o.sid)))used.push(`lệnh ${ORD70[o.k].n.toLowerCase()} của ngươi (${svN70(o.sid)})`)});
   if(S.doctor&&/độc|xạ hương/.test(ACT[k].n))used.push("thái y tâm phúc ngươi đã kết giao");if(S.shield)used.push("Hoàng hậu đang che chở ngươi");if(S.guardWarn)used.push("thị vệ ngươi đã nhờ canh chừng");if((S.mat||0)>0)used.push(`Tai mắt ${S.mat}`)}
  return note70({a,k,ok,mo,by:used,self:SP,gain:evG(S,a)-e0,snap,body,known})}})();
function motNow70(a){const g=a.ghen||0,o=Math.round(oan(a,S)),h=Math.max(0,-aff(a,S));if(g>=o&&g>=h&&g>0)return{k:"ghen",v:g,t:`ghen với ngươi, Ghen ${g}`};if(o>=h&&o>0)return{k:"oan",v:o,t:`oán ngươi, Oán ${o}`};if(h>0)return{k:"ghet",v:-h,t:`ghét ngươi, thiện cảm ${-h}`};return{k:"khac",v:0,t:"vì lợi riêng"}}
function loss70(sn){const L=[];const d=(k,n)=>{const v=(S[k]||0)-(sn[k]||0);if(v)L.push(`${n} ${v>0?"+":""}${v}`)};d("danh","Danh");d("sung","Sủng");d("suc","Sức");d("duc","Đức");if(S.rank<sn.rank)L.push(`bị giáng xuống ${RANKS[S.rank]?RANKS[S.rank].n:"phẩm thấp hơn"}`);if(sn.preg&&!S.preg)L.push("mất cái thai");const kd=(S.kids||[]).filter(x=>x.alive).length;if(kd<sn.kids)L.push(`mất ${sn.kids-kd} đứa con`);if(!sn.cold&&S.out)L.push("bị đày vào lãnh cung");if(S.scar&&!sn.scar)L.push(`bị hủy dung (${SCAR70[S.scar.sev].n}): Sắc -${S.scar.d} đến khi lành`);return L}
/* one clear notice: who (rank + name), what, why (the real grudge), what stopped it (her own orders), what she gained or lost */
function note70(o){const z=j70();const a=o.a,A=ACT[o.k];const who=o.known?title70(a):"Kẻ giấu mặt";const what=A?A.n.toLowerCase():"hại ngươi";const lost=loss70(o.snap);const need=accNeed(a);const ev=evG(S,a);
 const N={wk:wk(),id:o.known?a.id:null,who,rank:o.known?rkName(a):null,act:o.k,actName:A?A.n:"",ok:o.ok,why:o.known?o.mo.t:null,whyK:o.known?o.mo.k:null,whyV:o.known?o.mo.v:null,by:o.ok?[]:o.by,gainEv:o.gain>0?o.gain:0,evNow:o.known?ev:null,evNeed:need,lost,body:String(o.body||"").replace(/<[^>]+>/g,"").trim()};
 z.nt=(z.nt||[]);z.nt.unshift(N);if(z.nt.length>20)z.nt.length=20;
 N.self=(o.self||[]).map(x=>x.t);const sent=/\(sai ([^)]+) đi\)/.exec(N.body);let body=String(o.body||"").replace(/\s*\(sai ([^)]+) đi\)/,"");N.sentBy=sent?sent[1]:null;
 /* owner 15/11 ("Gì mà viết liên tục vậy"): one fact per row — who · what, who was sent, the result, then each detail as its own sentence;
    every row ends with a full stop so the kit (kpSentences) cuts it into its own line, never glued to the next name */
 const rows=[];rows.push(`<b>${who}</b>${o.known?"":" (chưa rõ là ai)"} ${o.ok?"đã":"định"} <b>${what}</b> nhắm vào ngươi.`);
 if(o.known)rows.push(`Vì sao: nàng ${o.mo.t}.`);
 if(sent)rows.push(`Người được sai đi ${what} ngươi: ${sent[1]}.`);
 const clean=/không tìm ra điều gì sai trái; chỉ biết ([^.<]+)/.exec(String(body).replace(/<[^>]+>/g,""));
 if(clean){rows.push(G70("Kết quả: không tìm ra điều gì sai trái của ngươi."));rows.push(`${o.known?"Nàng":"Kẻ ấy"} chỉ biết thêm ${clean[1].trim()}.`)}
 else{rows.push(o.ok?R70("Kết quả: mưu ấy đã thành."):G70("Kết quả: không thành."));
  const bd=String(body).trim();if(bd)rows.push(/[.!?](<\/span>)?$/.test(bd)?bd:bd+".")}
 for(const x of (o.self||[]))rows.push(`Tự ý giúp ngươi: ${x.t}${o.ok?", nhưng không ngăn được":""}.`);
 if(!o.ok&&o.by.length)rows.push(`Phòng bị đã chặn: ${o.by.join(", ")}.`);else if(!o.ok&&!(o.self||[]).length)rows.push("Không có lệnh phòng bị nào của ngươi dính vào; kẻ ấy tự hỏng việc.");
 if(o.gain>0)rows.push(G70(`Ngươi được: ${o.gain} chứng cứ về ${who} (chứng minh nàng ${what}); nay có ${ev}${ev>=need?", đủ để tố giác":`, cần ${need} để tố giác`}.`));
 /* log-sync r1: a loss the body already states ("Sức -43") is not said twice (the Sổ ghi would count it twice) */
 {const bt=String(o.body||"").replace(/<[^>]+>/g,"");const L2=lost.filter(x=>!bt.includes(x));if(L2.length)rows.push(R70(`Ngươi mất: ${L2.join(", ")}.`))}
 return rows.join(" ").trim()+" "}
(function(){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(r&&a&&a!==S&&t!==S)return String(r).replace(/\(sai ([^)]+) đi\)/,`(${a.name} sai $1 đi)`)}catch(e){}return r}})();
/* ---------- data for the kit ---------- */
window.defenceOrders=function(){if(!S)return[];const L=ords70().map(o=>{const s=sv70(o.sid),O=ORD70[o.k];return{k:o.k,name:O.n,desc:O.d,servant:{sid:o.sid,name:s?s.name:"",loyal:s?s.loyal:0},target:o.tgt!=null&&RV(o.tgt)?{id:o.tgt,name:title70(RV(o.tgt))}:null,costMonth:{bac:O.bac,loyal:O.lo},busy:true,standing:!!o.std,since:o.since,power:o.k==="canh"?canhB70(o):null}});
 const E=[];if(S.doctor)E.push({k:"doctor",name:"Thái y tâm phúc",desc:"dễ nhận ra độc, xạ hương"});if(S.shield)E.push({k:"shield",name:"Hoàng hậu che chở",desc:`còn ${S.shield} tháng`});if(S.guardWarn)E.push({k:"guard",name:"Thị vệ canh chừng",desc:`còn ${S.guardWarn} tuần: kẻ hại ngươi khó ra tay`});if((S.inv||[]).some(e=>e.k==="giaidoc"))E.push({k:"antidote",name:"Thuốc giải trong rương",desc:"cứu được khi trúng độc"});
 return {orders:L,earned:E,types:Object.keys(ORD70).map(k=>({k,name:ORD70[k].n,desc:ORD70[k].d,costMonth:{bac:ORD70[k].bac,loyal:ORD70[k].lo},needsTarget:!!ORD70[k].tgt}))}};
window.threatsAgainstMe=function(){if(!S)return[];kn();const out=[];const z=j70();
 for(const p of z.pl){if(p.end||p.t!=="me"||!p.kn)continue;const a=pa70(p),M=pm70(p),r=pr70(p);if(!a)continue;out.push({id:a.id,who:title70(a),kind:"plot",plot:p.id,method:M.n,route:p.dig?r.n:null,stage:p.st==="prep"?`chuẩn bị ${Math.min(p.pg,p.need)}/${p.need}`:"chờ thời cơ",waitsFor:p.dig?M.opp.map(k=>OPP70[k].n):null,tells:p.kt.slice(),why:mot70(p),ev:evG(S,a),evNeed:accNeed(a)})}
 for(const v of liveRivals(true)){if(out.some(x=>x.id===v.id))continue;if(!(S.dKnown&&S.dKnown[v.id])&&!knows(v))continue;const b=bandOf(danger(v,S));if(!b)continue;out.push({id:v.id,who:title70(v),kind:"danger",band:BANDS[b][1],why:motNow70(v).t,ev:evG(S,v),evNeed:accNeed(v)})}
 return out};
window.resolveNotices=function(){const z=S&&j70();return z?(z.nt||[]).slice():[]};
window.openDefence=function(){if(!S||S.dead||Q.length)return false;Q.push(def70m({s:1}));showModal();return true};
/* ---------- the orders, given through the kit dialog ---------- */
function def70m(pp){const d=mkP("j70def",pp);return{t:"Phòng bị",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,kit:{kind:"choice",title:"Phòng bị",facts:pfacts70(d.t)}}}
function ordLine70(o){const s=sv70(o.sid),O=ORD70[o.k];return `${s?s.name:"?"}: ${O.n.toLowerCase()}${o.tgt!=null&&RV(o.tgt)?` ${title70(RV(o.tgt))}`:""}`}
PEND.j70def=pp=>{if(!S)return null;const L=ords70();const cur=L.length?`<p>Lệnh đang có: ${L.map(ordLine70).join("; ")}.</p>`:"<p>Chưa có lệnh phòng bị nào.</p>";
 const free=[S.maid?"maid":null].concat((S.staff||[]).map(s=>s.sid)).filter(x=>x!=null&&!ordOf70(x)&&sv70(x));
 if(pp.s===1){const o=[];for(const k in ORD70){const O=ORD70[k];if(!free.length)break;const c=ch70(`Giao việc: ${O.n.toLowerCase()}`,{wt:[G70((k==="canh"?"giữ được cung: ":"")+O.d)],k:[R70(`mỗi tháng${O.bac?` Bạc -${O.bac}`:""}${O.lo?`, lòng kẻ hầu ${O.lo}`:""}${!O.bac&&!O.lo?" không tốn bạc":""}`),R70("kẻ hầu ấy bận, không sai đi việc khác được")]});c.go=()=>{Q.unshift(def70m({s:2,o:k}));};o.push(c)}
  for(const x of L.slice(0,3)){const c=ch70(`Bãi lệnh: ${ordLine70(x)}`,{wt:[G70(`${svN70(x.sid)} rảnh tay${ORD70[x.k].bac?`, đỡ ${ORD70[x.k].bac} lượng mỗi tháng`:""}`)],k:[R70(`mất tác dụng ${ORD70[x.k].n.toLowerCase()}`)],ok:()=>{L.splice(L.indexOf(x),1);return `Ngươi bãi lệnh ${ORD70[x.k].n.toLowerCase()} của ${svN70(x.sid)}.`}});o.push(c)}
  o.push(ch70("Giữ nguyên",{wt:[G70("không tốn gì thêm")],k:[R70("phòng bị như cũ")],ok:()=>"Ngươi giữ nguyên các lệnh."}));
  return{t:cur+`<p class="past">Mỗi kẻ hầu nhận một việc. Kẻ đã bị người khác mua chuộc thì giữ việc cũng như không, lại đem chuyện kể với chủ của hắn.${free.length?"":" Không còn kẻ hầu nào rảnh."}</p>`,o,who:S.maid?pMaid():null}}
 if(pp.s===2){const O=ORD70[pp.o];if(!O)return null;const o=free.slice(0,5).map(sid=>{const s=sv70(sid);const pw=pp.o==="canh"?cl(Math.round(4+(s.loyal||0)/10),4,14):null;
   const c=ch70(`${s.name} (lòng ${s.loyal||0})`,{wt:[G70(pw!=null?`giữ được cung: dễ bắt kẻ hại hơn +${pw}`:O.d)],k:[R70(`${s.name} bận việc này`)].concat(O.bac?[R70(`Bạc -${O.bac} mỗi tháng`)]:[]).concat((s.loyal||0)<BAL.loy.low?[R70("lòng thấp: dễ bị mua chuộc")]:[])});
   c.go=()=>{if(O.tgt){Q.unshift(def70m({s:3,o:pp.o,sid}));return}L.push({k:pp.o,sid,since:wk()});log(`Ngươi giao cho ${s.name} việc ${O.n.toLowerCase()}.`)};return c});
  o.push(ch70("Thôi",{wt:[G70("không tốn gì")],k:[R70("chưa có thêm phòng bị")],ok:()=>"Ngươi gác lại."}));return{t:`<p>Giao cho ai việc <b>${O.n.toLowerCase()}</b>?</p><p class="past">${O.d}.</p>`,o,who:S.maid?pMaid():null}}
 if(pp.s===4){const s=sv70(pp.sid);if(!s)return null;const cur=ordOf70(pp.sid);const o=[];
  for(const k in ORD70){const O=ORD70[k];if(cur&&cur.k===k&&!O.tgt)continue;const pw=k==="canh"?cl(Math.round(4+(s.loyal||0)/10),4,14):null;
   const c=ch70(`${O.n}`,{wt:[G70(pw!=null?`dễ bắt kẻ hại hơn +${pw}; ${O.d}`:O.d)],k:[R70(`${s.name} bận việc này`)].concat(O.bac?[R70(`Bạc -${O.bac} mỗi tháng`)]:[]).concat(O.lo?[R70(`lòng ${s.name} ${O.lo} mỗi tháng`)]:[]).concat((s.loyal||0)<BAL.loy.low?[R70("lòng thấp: dễ bị mua chuộc")]:[])});
   c.go=()=>{if(cur)L.splice(L.indexOf(cur),1);if(O.tgt){Q.unshift(def70m({s:3,o:k,sid:pp.sid}));return}L.push({k,sid:pp.sid,since:wk()});log(`Ngươi giao cho ${s.name} việc ${O.n.toLowerCase()}.`)};o.push(c)}
  if(cur)o.push(ch70(`Bãi lệnh ${ORD70[cur.k].n.toLowerCase()}`,{wt:[G70(`${s.name} rảnh tay${ORD70[cur.k].bac?`, đỡ ${ORD70[cur.k].bac} lượng mỗi tháng`:""}`)],k:[R70("mất phòng bị này")],ok:()=>{L.splice(L.indexOf(cur),1);return `Ngươi bãi lệnh của ${s.name}.`}}));
  o.push(ch70("Thôi",{wt:[G70("không tốn gì")],k:[R70("giữ như cũ")],ok:()=>"Ngươi giữ như cũ."}));
  return{t:`<p>Giao cho <b>${s.name}</b> (lòng ${s.loyal||0}) việc phòng bị nào?${cur?` Hiện đang: ${ORD70[cur.k].n.toLowerCase()}.`:""}</p><p class="past">Mỗi kẻ hầu một việc; kẻ đang giữ việc không sai đi việc khác được. Kẻ đã bị người khác mua chuộc thì giữ việc cũng như không.</p>`,o,who:pp.sid==="maid"?pMaid():(()=>{try{return pServ(s)}catch(e){return null}})()}}
 if(pp.s===3){const s=sv70(pp.sid);if(!s)return null;const T=liveRivals(true).filter(v=>!v.confined||true).slice().sort((a,b)=>danger(b,S)-danger(a,S)).slice(0,5);
  const o=T.map(v=>{const c=ch70(`Theo dõi ${title70(v)}`,{wt:[G70(`thấy mưu của nàng sớm hơn nhiều; mỗi tháng có thể thêm chứng cứ`)],k:[R70("Bạc -10 mỗi tháng"),R70(`nếu bị bắt gặp, ${v.name} oán ngươi`)]});c.go=()=>{L.push({k:"theodoi",sid:pp.sid,tgt:v.id,since:wk()});log(`Ngươi sai ${s.name} theo dõi ${title70(v)}.`)};return c});
  o.push(ch70("Thôi",{wt:[G70("không tốn gì")],k:[R70("chưa theo dõi ai")],ok:()=>"Ngươi gác lại."}));return{t:`<p>${s.name} sẽ theo dõi ai?</p>`,o,who:(()=>{try{return pServ(s)}catch(e){return null}})()}}
 return null};
/* ---------- every warning carries concrete answers ---------- */
function thrOpts70(v){const o=[];const mat=S.mat||0;
 o.push(Object.assign(ch70("Ra lệnh phòng bị",{wt:[G70("giữ được mình: chọn kẻ hầu canh cung, thử độc, theo dõi nàng")],k:[R70("kẻ hầu bận việc, có lệnh tốn bạc mỗi tháng")]}),{go:()=>{Q.unshift(def70m({s:1}))}}));
 o.push(Object.assign(ch70(`Dò la ${v.name}`,{c:{},p:oSpy(S),/* previews: spyFind (runAct spy) */wt:[G70(`chứng cứ về ${v.name} ${balSg(BAL.eff.jtruth.evN)}`)],lt:[R70(`${v.name} mất thiện cảm`)],k:[R70("Bạc -15")]}),{go:()=>{if(S.bac<15){log("Không đủ bạc để dò la.");return}log(runAct(S,v,"spy")||"Ngươi cho người dò la.")}}));
 if(accOK(S,v)){const c=ch70(`Tố giác ${title70(v)}`,{p:oAccuse(S,v),wt:[G70("nàng bị xử theo chứng cứ")],lt:[R70("tố hụt: mất chứng cứ, Danh giảm")]});c.go=()=>log(runAct(S,v,"accuse")||"Ngươi tố giác.");o.push(c)}
 if(!S.thDead)o.push(ch70("Xin Thái hậu che chở",{c:{bac:-20},p:cl(30+(S.th||0)/2,5,95),wt:[G70("3 tuần tới kẻ hại ngươi khó ra tay gấp đôi")],lt:[R70(`Thái hậu với ngươi ${balSg(BAL.eff.j70.thShield)}`)],ok:()=>{S.guardWarn=Math.max(S.guardWarn||0,3);return "Thái hậu sai thị vệ để mắt đến cung ngươi."},no:()=>{apply({th:BAL.eff.j70.thShield});return "Thái hậu không muốn dính vào chuyện hậu cung."}}));
 const al=liveRivals(true).filter(x=>x!==v&&aff(x,S)>=40&&!x.confined).sort((a,b)=>aff(b,S)-aff(a,S))[0];
 if(al)o.push(ch70(`Nhờ ${title70(al)} để ý giúp`,{wt:[G70(`6 tuần: người của ${al.name} báo khi thấy mưu nhắm vào ngươi`)],k:[R70(`${al.name} thiện cảm ${balSg(BAL.eff.j70.ok_3)} (ngươi mắc nợ ân)`)],ok:()=>{j70().allyW={id:al.id,until:wk()+6};relAdd(S,al,BAL.eff.j70.ok_3);return `${al.name} hứa để mắt giúp ngươi.`}}));
 o.push(ch70(`Tránh mặt ${v.name}`,{c:{danh:-1},wt:[G70("6 tuần không ở chung chỗ: mưu tay đôi của nàng khó thành")],k:[R70("người ta bảo ngươi nhút nhát")],ok:()=>{const z=j70();z.avoid=z.avoid||{};z.avoid[v.id]=wk()+6;return `Ngươi tránh những chỗ ${v.name} hay lui tới.`}}));
 if(ACT.frame&&!(typeof sameHouse==="function"&&sameHouse(S,v)))o.push(Object.assign(ch70("Ra tay trước",{wt:[G70("mở mưu kế nhắm vào nàng (chọn cách ở bước sau)")],k:[R70("lộ thì nàng nắm chứng cứ về ngươi")]}),{go:()=>{Q.unshift(start70(v,"frame"))}}));
 o.push(ch70("Để sau",{wt:[G70("không tốn gì")],k:[R70("nàng vẫn rình rập")],ok:()=>"Ngươi tạm gác."}));return o}
PEND.j70thr=pp=>{const v=RV(pp.v);if(!v||!S)return null;const b=bandOf(danger(v,S));const mo=motNow70(v);
 return{t:(pp.h||"")+`<p class="past">${title70(v)}: ${mo.t}; mức nguy hiểm với ngươi: ${BANDS[b][1]}. Chứng cứ ngươi có về nàng: ${evG(S,v)} (cần ${accNeed(v)} để tố giác).</p>`,o:thrOpts70(v),who:pp.m?pMaid():pv(v)}};
/* avoiding her: tay-đôi acts need her near; plots from her are harder for those weeks */
(function(){const o0=okAct70;okAct70=function(a,t,k){const z=S&&S.j70;if(t===S&&a&&a!==S&&z&&z.avoid&&z.avoid[a.id]>=wk()&&(k==="pushp"||k==="trip"))return false;return o0.apply(this,arguments)}})();
(function(){const t0=together;together=function(a,b){const z=S&&S.j70;if(z&&z.avoid&&((a===S&&b&&z.avoid[b.id]>=wk())||(b===S&&a&&z.avoid[a.id]>=wk())))return false;return t0.apply(this,arguments)}})();
/* warnings pushed by older modules (head maid's warning, the old tell) get the same answers */
function thrify70(){for(let i=0;i<Q.length;i++){const m=Q[i];if(m.opts||m.pid||!/^(Lời cảnh báo|Tai mắt báo tin)$/.test(m.t||""))continue;
  let v=null;if(m.who&&m.who.w&&m.who.w[0]==="r")v=RV(m.who.w[1]);if(!v)v=liveRivals(true).find(x=>String(m.h||"").includes(x.name));if(!v)continue;
  const d=mkP("j70thr",{v:v.id,h:String(m.h||"").replace(/<p>[^<]*Chắc chắn[^<]*<\/p>/,""),m:m.who&&m.who.w&&m.who.w[0]==="m"?1:0});if(!d)continue;Q[i]={t:m.t,h:d.t,opts:d.o,who:d.who||m.who,pid:d.pid,pp:d.pp};if(d.kit)Q[i].kit=d.kit}
 /* review kit-fig2 r8: one warning per consort in the queue — two "Lời cảnh báo" about the same consort (the maid's tell queued twice, or
    by two older modules in one turn) became two identical j70thr dialogs; a later one is dropped (Q[0], the dialog on screen, is kept) */
 const seen=new Set();for(let i=0;i<Q.length;i++){const m=Q[i];if(!m||m.pid!=="j70thr"||!m.pp)continue;const key=String(m.pp.v);if(seen.has(key)&&i>0){Q.splice(i,1);i--;continue}seen.add(key)}}
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{if(S&&!S.dead&&!window.__j70off&&Q.length){thrify70();if(!$("modal").hidden)showModal()}}catch(e){console.error(e)}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&!window.__j70off){thrify70();if(Q.length&&$("modal").hidden===false)showModal()}}catch(e){console.error(e)}return r}})();
/* the 'seen' dialog also offers standing orders and protection */
(function(){const o0=optsSeen70;optsSeen70=function(p){const o=o0.apply(this,arguments);try{const a=pa70(p);const ex=thrOpts70(a).filter(c=>/^Ra lệnh phòng bị|^Xin Thái hậu/.test(c.n));o.splice(o.length-1,0,...ex)}catch(e){}return o}})();
/* the kit's servant row names the order (data only, inside the existing info line) */
(function(){if(typeof staffHTML!=="function")return;const s0=staffHTML;staffHTML=function(){let h=s0.apply(this,arguments);try{for(const o of ords70()){if(o.sid==="maid")continue;const s=sv70(o.sid);if(!s)continue;h=h.replace(`<b>${s.name}</b><span>`,`<b>${s.name}</b><span>Lệnh: ${ORD70[o.k].n.toLowerCase()}${o.tgt!=null&&RV(o.tgt)?" "+RV(o.tgt).name:""} · `)}
  const lab=sid=>{const o=ordOf70(sid);return o?`đang: ${ORD70[o.k].n.toLowerCase()}`:"canh cung, thử độc, theo dõi"};
  for(const s of S.staff||[])h=h.replace(`<button data-sv="doi" data-sid="${s.sid}">`,`<button data-j70o="${s.sid}" ${S.dead?"disabled":""}>Phòng bị<small>${lab(s.sid)}</small></button><button data-sv="doi" data-sid="${s.sid}">`);
  if(S.maid)h=h.replace(`cung nữ thân tín · lòng ${S.maid.loyal}</span></div></div>`,`cung nữ thân tín · lòng ${S.maid.loyal}${ordOf70("maid")?` · Lệnh: ${ORD70[ordOf70("maid").k].n.toLowerCase()}`:""}</span></div><div class="rbtn"><button data-j70o="maid" ${S.dead?"disabled":""}>Phòng bị<small>${lab("maid")}</small></button></div></div>`)}catch(e){}return h}})();
/* the Kẻ hầu tab is built from kit cards (pcard/pbtn): add a "Phòng bị" kit button to each of her servants and to the head maid, and a line naming the current order */
function ordSub70(sid){const o=ordOf70(sid);return o?`đang giữ việc: ${ORD70[o.k].n.toLowerCase()}${o.tgt!=null&&RV(o.tgt)?" "+RV(o.tgt).name:""}`:"Chắc chắn · thành: chọn canh cung, thử độc, theo dõi, giữ sổ sách"}
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&!window.__j70off&&o&&typeof tab!=="undefined"&&tab==="staff"){let sid=null;if(o.rank==="Cung nữ thân tín"&&S.maid&&o.name===S.maid.name)sid="maid";else{const sv=(S.staff||[]).find(x=>x.name===o.name);if(sv&&(o.rank==="Cung nữ"||o.rank==="Thái giám"))sid=sv.sid}
   if(sid!=null){o=Object.assign({},o);const od=ordOf70(sid);if(od)o.lines=(o.lines||[]).concat([`Lệnh phòng bị: <b>${ORD70[od.k].n.toLowerCase()}${od.tgt!=null&&RV(od.tgt)?" "+RV(od.tgt).name:""}</b>`]);
    o.groups=(o.groups||[]).concat([["Phòng bị",[pbtn(`data-j70o="${sid}"`,od?"Đổi việc phòng bị":"Giao việc phòng bị",ordSub70(sid),S.dead?"đã hết kiếp":"")]]])}}}catch(e){}return p0.call(this,o)}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-j70o]");if(!b||b.disabled)return;e.preventDefault();e.stopPropagation();if(!S||S.dead||Q.length)return;const sid=b.dataset.j70o==="maid"?"maid":+b.dataset.j70o;Q.push(def70m({s:4,sid}));showModal()},true);

/* ---------- kit panels (j79): threat card for warnings, one fact per row for reports ---------- */
function pfacts70(h){return String(h||"").replace(/<br>/g,"\n").replace(/<\/p>/g,"\n").replace(/<(?!\/?(b|span)\b)[^>]+>/g,"").split(/\n+/).map(x=>x.trim()).filter(Boolean)}
function stage70(p){const M=pm70(p);return p.st==="prep"?`đang chuẩn bị (${Math.min(p.pg,p.need)}/${p.need} bước)${p.dig?`; sẽ chờ ${M.opp.map(k=>OPP70[k].n).slice(0,2).join(" hoặc ")}`:""}`:p.st==="wait"?`đã chuẩn bị xong, đang chờ thời cơ`:"đã ra tay"}
(function(){const b0=PEND.j70;PEND.j70=function(pp){const d=b0.apply(this,arguments);try{if(!d||typeof kitThreat!=="function")return d;const p=P70(pp.id);if(!p)return d;const a=pa70(p),t=pt70(p),M=pm70(p);const st=pp.s;const tl=p.kt.length?p.kt[p.kt.length-1]:tellOf70(p,0);
  if(st==="seen"||st==="warn"){d.kit={kind:"threat",title:T70[st],subject:st==="warn"&&RV(p.ally)?RV(p.ally):null,sections:[{html:kitThreat({who:a,how:`${M.n}: người của nàng ${tl}${where70(p)?` (ở ${where70(p)})`:""}`,when:stage70(p)})},{facts:[st==="warn"?pfacts70(intro70(p,st))[0]:(p.forced&&S.maid?`${S.maid.name} tận mắt thấy và báo cho ngươi.`:"Tai mắt của ngươi tận mắt thấy.")].concat([`Vì ${mot70(p)}.`,`Chứng cứ ngươi có về ${a.name}: ${evG(S,a)} (cần ${accNeed(a)} để tố giác).`])}]}}
  else if(st==="npc")d.kit={kind:"intel",title:T70[st],sections:[{html:kitThreat({who:a,how:`${M.n} nhắm vào ${t.name}: người của nàng ${tl}`,when:stage70(p)})}]};
  else if(st==="aft"||st==="ownres"||st==="ownfail"||st==="when"||st==="serv")d.kit={kind:st==="when"?"choice":"result",title:T70[st],subject:st==="aft"&&p.kn?a:(st==="serv"?null:t),facts:pfacts70(d.t)}}catch(e){console.error(e)}return d}})();
(function(){const b0=PEND.j70thr;PEND.j70thr=function(pp){const d=b0.apply(this,arguments);try{if(!d||typeof kitThreat!=="function")return d;const v=RV(pp.v);const b=bandOf(danger(v,S));
  d.kit={kind:"threat",title:"Lời cảnh báo",subject:pp.m&&S.maid?null:null,sections:[{html:kitThreat({who:v,how:b?`có thể hại ngươi mức ${BANDS[b][1]} (vì ${motNow70(v).t})`:`chưa tới mức ra tay (vì ${motNow70(v).t})`,when:"chưa rõ lúc nào"})},{facts:pfacts70(pp.h||"").concat([`Chứng cứ ngươi có về ${v.name}: ${evG(S,v)} (cần ${accNeed(v)} để tố giác).`])}]}}catch(e){console.error(e)}return d}})();

/* ================= j70 HỦY DUNG: disfiguring a rival, one rule for everyone =================
   Act "huydung" (band hại nặng). Routes in the chain: phấn trộn độc (nặng hơn, dễ lần ra), canh nóng "lỡ tay" (vừa, khó buộc tội), dụ mèo/ong (nhẹ),
   son phấn hỏng (nhẹ-vừa). Scar: p.scar={sev 1-3, d Sắc lost now, need weeks, pg, perm, veil, cure, by}. Effective Sắc (effSac) carries the scar, so
   nights, contests and jealousy follow by themselves. Recovery weekly for everyone: base 1 step, +1 trusted physician, +1 Y talent ≥2, +1 under treatment.
   nhẹ heals fully, vừa leaves −3 Sắc, nặng leaves −15 unless a rare cure (Ngọc dung cao / Tuyết liên). Defence: thử độc (son phấn), canh cung. */
const SCAR70=[null,{n:"nhẹ",d:10,sung:4,danh:1,need:4,perm:0},{n:"vừa",d:25,sung:8,danh:3,need:8,perm:3},{n:"nặng",d:45,sung:14,danh:5,need:14,perm:15}];
const HDR70={phan:[.2,.45,.35],canh:[.3,.5,.2],meo:[.65,.3,.05],son:[.5,.4,.1]};
function scarOf(p){p=p||S;const s=p&&p.scar;if(!s)return null;const left=Math.max(0,s.need-s.pg);return{sev:s.sev,name:SCAR70[s.sev].n,sacLost:Math.round(s.d*(s.veil?2/3:1)),weeksLeft:left,veil:!!s.veil,treated:(s.tr||0)>0,permanent:s.cure?0:SCAR70[s.sev].perm,chip:`Hủy dung (${SCAR70[s.sev].n}) · còn ${left} tuần`}}
window.scarOf=scarOf;
(function(){const e0=effSac;effSac=function(p){let r=e0.apply(this,arguments);try{if(p&&p.scar)r=cl(r-Math.round(p.scar.d*(p.scar.veil?2/3:1)),0,130)}catch(e){}return r}})();
function scar70(t,sev,a,how){const L=SCAR70[sev];t.scar={sev,d:L.d,need:L.need,pg:0,veil:0,tr:0,cure:0,by:a?key(a):null,at:wk(),how:how||""};ap(t,{sung:-L.sung,danh:-L.danh});
 if(t===S){for(const v of liveRivals(true))v.ghen=cl((v.ghen||0)-Math.round(6*sev),0,100)}return L}
A("huydung","Hủy dung",{c:{bac:-30,duc:-8},ok:(a,t)=>(a.bac||0)>=30&&!t.scar,o:a=>odA(a,38+(a.tamco||0)/5+(a.mat||0)*4),x:"Sắc nàng giảm mạnh, ân sủng giảm",f:(a,t)=>{
 ap(a,{bac:-30});if(typeof ducAdd==="function")ducAdd(a,-8,"hủy dung");else ap(a,{duc:-8});a.schemes=(a.schemes||0)+1;const how=window.__j70hd||"phan";
 const c=caught(a,t,how==="phan"||how==="son","hủy dung "+NM(t)+(how==="canh"?" bằng bát canh nóng":how==="meo"?" bằng cách dụ mèo dữ":" bằng phấn trộn độc"));if(c)return c;
 if(!roll(odA(a,38+(a.tamco||0)/5+(a.mat||0)*4))){if(how!=="canh"||roll(40))evA(t,a,BAL.eff.j70.evF);return `${NMc(a)} định hủy dung ${NM(t)} nhưng không thành, ${how==="canh"?"bát canh chỉ đổ ra sàn":"bị lộ dấu vết"}. `}
 const W=HDR70[how]||HDR70.phan;let x=Math.random(),sev=1;if(x>W[0])sev=2;if(x>W[0]+W[1])sev=3;const L=scar70(t,sev,a,how);if(how==="phan"&&roll(35))evA(t,a,BAL.eff.j70.evF_2);
 return `<span class="r">${NMc(t)} bị hủy dung (${L.n}): Sắc -${L.d} khi còn sẹo, Sủng -${L.sung}, Danh -${L.danh}.</span> ${how==="canh"?"Ai cũng bảo là lỡ tay.":how==="meo"?"Con mèo dữ không biết từ đâu ra.":"Phấn son có độc."} `}});
try{if(!BANDS[2][2].includes("huydung"))BANDS[2][2].push("huydung")}catch(e){}
/* two-way law (owner 16/11 s21): the player has the same act in her Sát hại group (was NPC-only) */
try{const G=RVGRP.find(x=>x[0]==="Sát hại");if(G&&!G[1].includes("huydung"))G[1].push("huydung")}catch(e){}
try{if(typeof BIG!=="undefined"&&!BIG.includes("huydung"))BIG.push("huydung")}catch(e){}
(function(){const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const b=bandOf(danger(v,t));if(b>=2&&!t.scar&&ACT.huydung.ok(v,t)){let w=2*persW(v,"huydung");if(traitsOf(v).includes("Kiêu ngạo")||(t!==S&&(t.sac||0)>(v.sac||0)+10)||(t===S&&(S.sac||0)>(v.sac||0)+10))w*=1.6;if(w>0)O.push(["huydung",w])}}catch(e){}return O}})();
M70.huydung={k:"huydung",band:2,n:"Hủy dung",opp:["fest","night","lonely"],R:[
 {id:"phan",n:"Trộn độc vào phấn thoa mặt",tl:["hỏi mua thủy ngân và lưu huỳnh ở chợ ngoài cung","sai người đổi hộp phấn mới, nói là quà Nội vụ phủ"],pl:null,vis:5,need:2,bac:30,gd:"Thử son phấn trên tay kẻ hầu trước",st:"Chặn hộp phấn ở cửa cung, đem đi nghiệm"},
 {id:"canh",n:"Bát canh nóng lỡ tay",tl:["dò xem ai dâng canh cho nạn nhân trong yến tiệc","cung nữ bên ấy tập bưng khay nóng nhiều lần"],pl:null,vis:3,need:2,bac:20,gd:"Không để ai lạ đứng gần lúc dâng canh",st:"Gọi cung nữ bưng khay ra hỏi"},
 {id:"meo",n:"Dụ mèo dữ, ong độc",tl:["nuôi mấy con mèo hoang trong góc vườn","bôi mật ong lên áo cũ bỏ ở lối đi"],pl:"vuon",vis:6,need:2,bac:10,gd:"Không ra vườn khi có mèo lạ, cho người đuổi ong",st:"Cho thái giám bắt mèo, phá tổ ong"},
 {id:"son",n:"Son phấn hỏng tặng làm quà",tl:["mua loại son rẻ bị mốc ở chợ","gói hộp son thật đẹp, đề tên một người khác"],pl:null,vis:4,need:2,bac:15,gd:"Không dùng son phấn người khác tặng",st:"Nghiệm hộp son trước khi dùng"}]};
OWN70.huydung=["huydung"];
try{ORD70.thudoc.acts.push("huydung");ORD70.canh.acts.push("huydung");ORD70.thudoc.d="nếm trước mọi món, thử son phấn; dễ phát hiện độc, xạ hương, phấn độc; có khi chính kẻ thử ngã thay ngươi"}catch(e){}
/* the route chooses the severity spread */
(function(){const x0=exec70;exec70=function(p,opp){const pw=window.__j70hd;if(p&&p.m==="huydung")window.__j70hd=p.r;try{return x0.apply(this,arguments)}finally{window.__j70hd=pw}}})();
/* her button on a rival card (same markup as the other scheme buttons) */
(function(){const r0=rvButtons;rvButtons=function(v,i){let h=r0.apply(this,arguments);try{if(!S||!v||h.indexOf('data-a="huydung"')>=0||h.indexOf('data-a="poison"')<0)return h;const a=ACT.huydung,dis=!can(2)||!v.alive||v.out||S.dead,ok=a.ok(S,v),o=a.o(S,v);
  const btn=`<button data-r="${i}" data-a="huydung" ${dis||!ok?"disabled":""}>${a.n}<small>${[ok?word(cl(o,5,95)):"",fmt(a.c),v.scar?"nàng đang có sẹo":S.bac<30?"cần 30 bạc":a.x].filter(Boolean).join(" · ")}</small></button>`;
  h=h.replace(/(<button[^>]*data-a="poison")/,btn+"$1")}catch(e){}return h}})();
/* recovery, the same weekly rule for everyone */
function heal70(p){const s=p.scar;if(!s)return;let st=1;const me=p===S;if(me?S.doctor:(p.doc||roll(20)))st++;if(me&&(S.arts&&S.arts.y>=2))st++;if(s.tr>0){st++;s.tr--}s.pg+=st;
 if(!me&&!s.cure&&s.sev>=2&&(p.bac||0)>=120&&roll(8)){p.bac-=120;s.cure=1}
 if(s.pg>=s.need){const L=SCAR70[s.sev];const perm=s.cure?0:L.perm;if(perm)p.sac=Math.max(5,(p.sac||0)-perm);p.scar=null;
  if(me)log(perm?`Vết thương trên mặt ngươi đã lành, nhưng để lại sẹo: Sắc -${perm} mãi mãi.`:`Vết thương trên mặt ngươi đã lành hẳn, nhan sắc như xưa.`);else if(knows(p))log(`${title70(p)} đã lành vết thương trên mặt${perm?`, còn sẹo (Sắc -${perm})`:""}.`)}}
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&w0!=null&&wk()!==w0&&!window.__j70off){heal70(S);for(const v of rivals)if(v.alive&&v.scar)heal70(v);
  if(S.scar&&!Q.some(m=>m.pid==="j70scar")&&(typeof evCooldown!=="function"||evCooldown("j70scar",4))&&!busy70()){const d=mkP("j70scar",{});if(d){Q.push({t:"Chữa vết thương",h:d.t,opts:d.o,who:null,pid:d.pid,pp:d.pp,kit:{kind:"choice",title:"Chữa vết thương",facts:pfacts70(d.t)}});mark70();if($("modal").hidden)showModal()}}}}catch(x){console.error(x)}return r}})();
PEND.j70scar=pp=>{const s=S&&S.scar;if(!s)return null;const sc=scarOf(S);const o=[];
 o.push(ch70("Mời thái y chữa trị",{c:{bac:-30,suc:-5},wt:[G70("4 tuần tới mỗi tuần lành thêm một bước")],k:[R70("thuốc đắng, Sức -5")],ok:()=>{s.tr=4;return "Thái y kê đơn, mỗi ngày bôi thuốc."}}));
 if(!s.cure&&s.sev>=2)o.push(ch70("Mua Ngọc dung cao",{c:{bac:-120},wt:[G70("lành không để sẹo")],k:[R70("giá rất đắt")],ok:()=>{s.cure=1;return "Ngươi có được hộp Ngọc dung cao, vết thương sẽ lành không sẹo."}}));
 if(!s.cure&&s.sev>=2&&!S.thDead)o.push(ch70("Xin Thái hậu ban Tuyết liên",{p:cl(20+(S.th||0)/2,5,95),wt:[G70("lành không để sẹo")],lt:[R70(`Thái hậu với ngươi ${balSg(BAL.eff.j70.thLotus)}`)],ok:()=>{s.cure=1;return "Thái hậu thương tình, ban cho một đóa Tuyết liên."},no:()=>{apply({th:BAL.eff.j70.thLotus});return "Thái hậu bảo Tuyết liên để dành cho việc lớn."}}));
 o.push(ch70(s.veil?"Bỏ mạng che mặt":"Che mạng khi ra ngoài",{wt:[G70(s.veil?"không còn vướng víu":`người ta ít thấy vết thương, phần Sắc mất còn ${Math.round(s.d*2/3)}`)],k:[R70(s.veil?`Sắc mất trở lại ${s.d}`:"Hoàng thượng thấy lạ, ít hứng thú hơn lúc không che")],ok:()=>{s.veil=s.veil?0:1;return s.veil?"Ngươi đeo mạng che mặt.":"Ngươi bỏ mạng che mặt."}}));
 o.push(ch70("Để tự lành",{wt:[G70("không tốn gì")],k:[R70(`còn ${sc.weeksLeft} tuần${SCAR70[s.sev].perm&&!s.cure?`, sẽ để lại sẹo (Sắc -${SCAR70[s.sev].perm})`:""}`)],ok:()=>"Ngươi để vết thương tự lành."}));
 return{t:`<p>Mặt ngươi bị thương (${sc.name}): Sắc đang mất ${sc.sacLost}; còn ${sc.weeksLeft} tuần nữa mới lành.${SCAR70[s.sev].perm&&!s.cure?` Không có thuốc quý thì sẽ để lại sẹo (Sắc -${SCAR70[s.sev].perm}).`:""}</p>`,o}};
/* the chip on person cards (kit chip) */
(function(){const p0=pcard;pcard=function(o){try{if(S&&o&&o.name){const p=o.name===S.name?S:rivals.find(v=>v.name===o.name);const sc=p&&scarOf(p);if(sc&&(p===S||knows(p)))o=Object.assign({},o,{chips:(o.chips||[]).concat([chip(sc.chip,"hot")])})}}catch(e){}return p0.call(this,o)}})();
/* ONE Ngọc dung cao (j67 gives it as a chapter reward, j70 sells it on the scar card): the rare cure for hủy dung.
   Used on a scarred face: the wound will heal without a permanent scar (cure) and 4 weeks sooner; on a clear face only Sắc +3. Same for everyone. */
(function(){if(typeof IT!=="object")return;IT.ngocdungcao=Object.assign({},IT.ngocdungcao||{kd:"Thuốc",pr:0,tg:[]},{n:"Ngọc dung cao",d:"Thoa mặt: chữa hủy dung (lành không để sẹo, sớm 4 tuần); mặt lành thì Sắc +3",use:{sac:3}});
 const u0=useItem;useItem=function(p,ix,tgt){const e=p&&p.inv&&p.inv[ix];if(e&&e.k==="ngocdungcao"&&!e.h&&p.scar){const s=p.scar;p.inv.splice(ix,1);s.cure=1;s.pg=Math.min(s.need,(s.pg||0)+4);
   return `${NMc(p)} thoa Ngọc dung cao: vết thương trên mặt sẽ lành không để sẹo, sớm hơn 4 tuần (còn ${Math.max(0,s.need-s.pg)} tuần).`}return u0.apply(this,arguments)}})();
