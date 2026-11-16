/* palace-intrigue events: each is {id, ok (gate), pp (params, saved), b (builder from params)}; registered in PEND so a pending one survives reload */
const EV=[];const EVI={};
function ev(id,ok,pp,b){const e={id,ok,pp,b};EV.push(e);EVI[id]=e;PEND[id]=b}
function mkEv(id){const e=EVI[id];if(!e)return null;const pp=e.pp?e.pp():{};if(pp===null)return null;S.seen=S.seen||{};S.seen[id]=S.turn;return mkP(id,pp)}
function evFresh(e){const s=S.seen&&S.seen[e.id];return s==null||S.turn-s>=12}
function freshEvents(){return EV.filter(e=>{try{return evFresh(e)&&e.ok()}catch(x){return false}})}
const KID=n=>S.kids.find(k=>k.name===n&&k.alive)||null;
const rvTop=(f)=>{const L=liveRivals(false).slice().sort(f);return L[0]||null};
const rvAny=()=>{const L=liveRivals(false);return L.length?pick(L):null};
const two=()=>{const L=liveRivals(false);if(L.length<2)return null;const a=pick(L);const b=pick(L.filter(x=>x!==a));return{a:a.id,b:b.id}};
const mon=m=>S.month===m;
const kidHurt=(k,n)=>{k.hp=Math.max(0,k.hp-n);if(k.hp<=0)log(kidDie(k,"không qua khỏi cơn bệnh",true))};
const newGirl=rel=>{const n=newRival(1+R(2));Object.assign(n,drawFace());n.rel=rel;rivals.push(n);return n};

/* framing */
ev("doll",()=>S.rank>=1&&liveRivals(false).length,()=>({v:rvTop((a,b)=>b.ghen-a.ghen).id,o:od(35+S.mat*6+S.tamco/4)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pMaid(),
 t:`Canh ba, ${S.maid.name} hớt hải quỳ xuống: dưới gốc quế sân ngươi có hình nhân vải ghi ngày sinh của Hoàng thượng.<br>Người của Cung Chính ti đang trên đường tới.`,o:[
 {n:"Đốt ngay, lần dấu kẻ chôn",fx:{},x:`${word(p.o)} · thành: chứng cứ ${v.name} +2 · hỏng: bị phạt`,go:()=>{if(roll(p.o)){evStory(v,2,"chôn hình nhân trù ẻo hại ngươi");log(`Dấu giày dưới gốc quế dẫn về cung ${v.name}.`)}else punish("chôn hình nhân trù ẻo",2)}},
 {n:"Tự trình lên Hoàng thượng",fx:{danh:-3},x:`${word(od(50+S.duc/3))} · thành: Sủng +4 · hỏng: Sủng -8`,go:()=>{if(roll(od(50+S.duc/3)))apply({sung:4,duc:2});else apply({sung:-8})}},
 {n:"Mua chuộc Cung Chính ti",fx:{bac:-60},x:"chuyện chìm xuống"}]}});
ev("poisongift",()=>liveRivals(false).length&&S.rank>=1,()=>({v:rvAny().id,o:od(40+S.mat*5+S.tamco/4)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Hộp điểm tâm đề tên ngươi gửi sang cung ${v.name}; cung nữ nếm thử liền thổ huyết.<br>Cả hậu cung xôn xao: ngươi hạ độc.`,o:[
 {n:"Kêu oan, xin tra người đưa quà",fx:{},x:`${word(p.o)} · thành: được minh oan, Danh +3 · hỏng: bị phạt nặng`,go:()=>{if(roll(p.o)){apply({danh:3});log("Tra ra tiểu thái giám đưa quà đã bị mua chuộc; ngươi được minh oan.")}else{apply({danh:-6});v.rel-=20;punish("gửi quà có độc",2)}}},
 {n:"Nhờ Thái hậu đứng ra",fx:{th:-12},x:"Thái hậu ém chuyện; nàng vẫn nghi ngươi",go:()=>{v.rel-=15}},
 {n:"Đẩy tội cho cung nữ",fx:{maid:-40,duc:-6},x:"nàng bị đánh 30 trượng"}]}});
/* rumours */
ev("guardrumour",()=>S.nights>=1,()=>({v:(rvAny()||{}).id,o:od(40+S.duc/2)}),p=>{const v=p.v!=null?RV(p.v):null;return{
 t:"Lời đồn lan khắp các cung: đêm đêm có thị vệ lẻn vào tẩm cung của ngươi.<br>Hoàng thượng chưa nói gì, nhưng đã hai tuần không lật thẻ ngươi.",o:[
 {n:"Xin Hoàng thượng tra xét",fx:{},x:`${word(p.o)} · thành: Danh +4 · hỏng: Sủng -10`,go:()=>{if(roll(p.o))apply({danh:4,sung:2});else apply({sung:-10,danh:-6})}},
 {n:"Đút bạc dập lời đồn",fx:{bac:-40,danh:-2}},
 {n:"Tìm kẻ tung tin",fx:{suc:-10},x:v?`${word(oSpy())} · thành: chứng cứ ${v.name} +1`:"không ra manh mối",go:()=>{if(v&&roll(oSpy())){evStory(v,1,"tung tin đồn bẩn về ngươi");v.rel-=10;log(`Kẻ tung tin là người của ${v.name}.`)}}}]}});
ev("ghost",()=>SEASON[S.month-1]==="Thu"||SEASON[S.month-1]==="Đông",()=>({v:(rvAny()||{}).id}),p=>{const v=p.v!=null?RV(p.v):null;return{
 t:"Cung nhân thì thầm: đêm qua có bóng áo trắng khóc bên giếng sau cung ngươi.<br>Ba cung nữ xin đổi đi nơi khác.",o:[
 {n:"Mời sư làm lễ trừ tà",fx:{bac:-30,duc:2,suc:5}},
 {n:"Rình bắt kẻ giả ma",fx:{suc:-10},x:v?`${word(od(45+S.mat*5))} · thành: chứng cứ ${v.name} +2`:"chỉ là mèo hoang",go:()=>{if(v&&roll(od(45+S.mat*5))){evStory(v,2,"sai cung nữ giả ma dọa ngươi");log(`Kẻ giả ma là cung nữ của ${v.name}.`)}}},
 {n:"Mặc kệ",fx:{danh:-3,maid:-5}}]}});
/* alliances */
ev("pact",()=>qOn()&&liveRivals(false).length,()=>({v:rvTop((a,b)=>b.rel-a.rel).id}),p=>{const v=RV(p.v),q=rivals[0];if(!v)return null;return{who:pv(v),
 t:`${v.name} hẹn ngươi ở đình Thiên Thu: “Hoàng hậu ${q.name} đè đầu cả hậu cung đã lâu.<br>Hai ta chung một thuyền, được chăng?”`,o:[
 {n:"Kết minh",fx:{hh:-5},x:`${v.name} thiện cảm +25 · nàng kể chuyện sai trái của Hoàng hậu, nếu có: chứng cứ +1`,go:()=>{v.rel+=25;/*evok: capped; preview says "nếu có"*/evA(S,q,1)}},
 {n:"Mật báo Hoàng hậu",fx:{hh:12},x:`${v.name} thù -30`,go:()=>{v.rel-=30;v.ghen=cl(v.ghen+10,0,100)}},
 {n:"Từ chối khéo",fx:{duc:1}}]}});
ev("eunuch",()=>S.mat<10,()=>({o:od(50+S.tamco/3)}),p=>({
 t:"Tiểu thái giám Tiểu Đức Tử quỳ ngoài thềm: “Nô tài nguyện làm chó săn cho nương nương.”<br>Hắn từng hầu ở Kính sự phòng.",o:[
 {n:"Nhận làm tai mắt",fx:{bac:-30,mat:1}},
 {n:"Thử lòng hắn trước",fx:{},x:`${word(p.o)} · thành: Tai mắt +1 · hỏng: hắn là gián điệp`,go:()=>{if(roll(p.o))apply({mat:1});else{apply({danh:-3});log('<span class="r">Tiểu Đức Tử mang chuyện cung ngươi đi bán.</span>')}}},
 {n:"Đuổi đi",fx:{duc:1}}]}));
/* the Emperor */
ev("empnight",()=>!S.preg&&S.sung>=20,()=>({o:od(40+bestArt().w*8+mm())}),p=>({who:pEmp(),
 t:"Đêm khuya, không đèn lồng, không thái giám báo trước. Hoàng thượng đứng ngoài rèm cửa cung ngươi.<br>“Trẫm không ngủ được.”",o:[
 {n:"Thắp đèn hầu rượu",fx:{},x:"được thị tẩm",go:()=>{S.tonight="me";nightScene()}},
 {n:`Phô tài: ${bestArt().n}`,fx:{suc:-5},x:`${word(p.o)} · thành: Sủng +6, Danh +2`,go:()=>{if(roll(p.o))apply({sung:6,danh:2})}},
 {n:"Khuyên ngài giữ long thể",fx:{duc:3,sung:-1}}]}));
ev("minister",()=>S.rank>=2,()=>({o:od(40+S.tai/3+(has("chamchinh")?15:0))}),p=>({who:pEmp(),
 t:"Hoàng thượng đặt bản tấu xuống: “Thượng thư Hộ bộ xin tăng thuế muối. Ái phi nghĩ sao?”",o:[
 {n:"Can gián thẳng thắn",fx:{},x:`${word(p.o)} · thành: Danh +5, Sủng +3 · hỏng: Sủng -5`,go:()=>{if(roll(p.o))apply({danh:5,sung:3});else apply({sung:-5})}},
 {n:"“Hậu cung không bàn chính sự”",fx:{duc:3,sung:-1}},
 {n:"Nói đỡ cho viên quan",fx:{bac:60,duc:-4},x:"đã nhận bạc của Thượng thư"}]}));
ev("jealousprince",()=>mySons().some(k=>k.age>=8),()=>({k:mySons().filter(k=>k.age>=8)[0].name}),p=>{const k=KID(p.k);if(!k)return null;return{who:pEmp(),
 t:`Triều thần vây quanh ${k.name} sau buổi giảng kinh. Hoàng thượng nhìn từ xa, sắc mặt sa sầm.`,o:[
 {n:"Bắt con đóng cửa đọc sách",fx:{danh:-2},x:`Hoàng thượng thương ${k.name} +6`,go:()=>{k.fond=cl(k.fond+6,0,100)}},
 {n:"Để con tiếp tục kết giao",fx:{danh:4,sung:-6},x:`Tài ${k.name} +5`,go:()=>{k.tal=cl(k.tal+5,0,100)}},
 {n:"Xin cho con đi tuần biên",fx:{sung:4},x:`Hoàng thượng thương ${k.name} -8`,go:()=>{k.fond=cl(k.fond-8,0,100)}}]}});
/* court ties */
ev("flood",()=>SEASON[S.month-1]==="Hạ",null,()=>({
 t:"Hoàng Hà vỡ đê, ba châu chìm trong nước. Hoàng hậu truyền các cung quyên góp cứu tế.",o:[
 {n:"Dâng 100 lượng",fx:{bac:-100,danh:6,duc:3}},
 {n:"Dâng 30 lượng",fx:{bac:-30,danh:2}},
 {n:"Cắt bổng lộc cung nhân để dâng",fx:{danh:3,maid:-15}}]}));
ev("newgirl",()=>liveRivals(true).length<9&&roomFor("consort"),null,()=>({
 t:"Con gái Thượng thư Lễ bộ được tuyển vào cung, nghe nói dung mạo khuynh thành.<br>Hôm nay nàng đến các cung bái kiến.",o:[
 {n:"Tặng trâm, kết thân",fx:{bac:-20},x:"tân nhân thiện cảm +20",go:()=>{const n=newGirl(20);log(`${n.name} vào cung, phong ${RANKS[n.rank].n}; nàng mến ngươi.`)}},
 {n:"Tiếp đãi lạnh nhạt",fx:{},x:"tân nhân thiện cảm -10",go:()=>{const n=newGirl(-10);log(`${n.name} vào cung, phong ${RANKS[n.rank].n}.`)}},
 {n:"Dằn mặt ngay buổi đầu",fx:{duc:-4,tamco:1},x:"tân nhân sợ, thù -25",go:()=>{const n=newGirl(-25);n.ghen=cl(n.ghen+15,0,100);log(`${n.name} vào cung, khóc suốt đêm sau buổi bái kiến.`)}}]}));
/* children */
ev("princefever",()=>S.kids.some(k=>k.alive&&k.age<10)&&(mon(1)||mon(8)),()=>({k:pick(S.kids.filter(k=>k.alive&&k.age<10)).name,o:od(40+artO(S,"y"))}),p=>{const k=KID(p.k);if(!k)return null;return{
 t:`Đêm yến tiệc, ${k.name} sốt cao co giật. Tiếng nhạc bên Thái Hòa điện vẫn vọng sang.`,o:[
 {n:"Bỏ yến, thức trắng bên con",fx:{suc:-20,sung:-3},x:`Sức khỏe ${k.name} +20`,go:()=>{k.hp=Math.min(100,k.hp+20)}},
 {n:"Mời thái y, vẫn dự yến",fx:{bac:-30,sung:3},x:`Sức khỏe ${k.name} +8`,go:()=>{k.hp=Math.min(100,k.hp+8)}},
 {n:"Tự bốc thuốc",fx:{},x:`${word(p.o)} · thành: Sức khỏe +30 · hỏng: Sức khỏe -25`,go:()=>{if(roll(p.o))k.hp=Math.min(100,k.hp+30);else kidHurt(k,25)}}]}});
ev("foreignwed",()=>myDaus().some(k=>k.age>=18),()=>{const d=myDaus().filter(k=>k.age>=18)[0];return d?{k:d.name,o:od(30+S.sung/3+mm())}:null},p=>{const k=KID(p.k);if(!k)return null;return{who:pEmp(),
 t:`Sứ thần Bắc Địch dâng ngựa quý, cầu hôn ${k.name}. Triều thần đều nói: một nàng công chúa đổi mười năm yên biên ải.`,o:[
 {n:"Thuận theo đại cục",fx:{danh:10,th:5,suc:-15},x:`${k.name} xuất giá phương bắc`,go:()=>{k.alive=false;k.wed=1;log(`${k.name} khóc từ biệt mẫu thân, theo đoàn sứ lên phương bắc.`)}},
 {n:"Quỳ xin giữ con lại",fx:{},x:`${word(p.o)} · thành: giữ được con, gả một tông nữ thay · hỏng: Sủng -10`,go:()=>{if(roll(p.o))log("Hoàng thượng động lòng, gả một tông nữ thay.");else apply({sung:-10,danh:-3})}},
 {n:"Tiến cử một tông nữ",fx:{bac:-50,danh:-2}}]}});
/* servants */
ev("maidhostage",()=>liveRivals(false).length,()=>({v:rvAny().id,o:od(40+S.tamco/3+S.maid.loyal/5)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pMaid(),
 t:`${S.maid.name} quỳ khóc: người của ${v.name} giữ cha mẹ nàng, bắt nàng lấy trộm thư từ của ngươi.`,o:[
 {n:"Bỏ bạc chuộc người",fx:{bac:-60,maid:25}},
 {n:"Bày kế phản gián",fx:{},x:`${word(p.o)} · thành: chứng cứ ${v.name} +2 · hỏng: Lòng cung nữ -20`,go:()=>{if(roll(p.o)){evStory(v,2,"bắt cha mẹ cung nữ của ngươi để ép nàng trộm thư");apply({maid:10})}else apply({maid:-20})}},
 {n:"Bỏ mặc",fx:{maid:-35}}]}});
ev("doctorblack",()=>S.doctor,()=>({o:od(35+S.tamco/3+S.mat*4)}),p=>({who:pDoc(),
 t:"Thái y tâm phúc của ngươi lén báo: có kẻ biết ông từng kê nhầm thuốc cho tiên phi, đòi 50 lượng mỗi tháng.",o:[
 {n:"Trả bạc thay ông",fx:{bac:-50}},
 {n:"Diệt kẻ tống tiền",fx:{duc:-6},x:`${word(p.o)} · thành: bịt được miệng kẻ tống tiền · hỏng: bị phạt`,go:()=>{S.schemes++;if(!roll(p.o)){apply({danh:-5});punish("giết người diệt khẩu",2)}}},
 {n:"Để ông tự lo",fx:{},x:"mất thái y tâm phúc",go:()=>{S.doctor=0}}]}));
/* omens */
ev("comet",()=>S.year>=2,()=>{const me=roll(40)||!liveRivals(false).length;return{me,v:me?null:rvAny().id}},p=>{const v=p.me?null:RV(p.v);if(!p.me&&!v)return null;
 if(p.me)return{t:"Sao chổi quét ngang trời tây. Khâm Thiên giám tâu: âm khí xung từ cung của ngươi.",o:[
  {n:"Trai giới cầu đảo",fx:{suc:-15,duc:4,danh:2}},{n:"Mua chuộc Khâm Thiên giám",fx:{bac:-80},x:"lời tâu đổi hướng"},{n:"Cắn răng chịu tiếng",fx:{danh:-8,sung:-5}}]};
 return{who:pv(v),t:`Sao chổi hiện. Khâm Thiên giám tâu: ${v.name} mệnh khắc với long thể.<br>Nàng quỳ ngoài Dưỡng Hòa điện cả đêm.`,o:[
  {n:"Đứng ra nói đỡ",fx:{duc:3,danh:-2},x:`${v.name} thiện cảm +25`,go:()=>{v.rel+=25}},
  {n:"Đổ thêm dầu vào lửa",fx:{duc:-5},x:`${v.name} Sủng -15, thù -20`,go:()=>{v.sung=cl(v.sung-15,0,100);v.rel-=20}},
  {n:"Im lặng",fx:{}}]}});
ev("phoenix",()=>S.rank>=3&&S.rank<7,null,()=>({
 t:"Thầy tướng ở chùa Bảo Hoa phán: trong hậu cung có một người mệnh phượng hoàng, và chỉ vào cung ngươi.",o:[
 {n:"Khiêm nhường chối từ",fx:{duc:3,hh:5}},
 {n:"Để lời đồn lan xa",fx:{danh:8,hh:-15},x:"cả hậu cung ghen +12",go:()=>ghenAll(12)},
 {n:"Bịt miệng thầy tướng",fx:{bac:-30,tamco:1}}]}));
/* festivals */
ev("doanngo",()=>mon(5),null,()=>({
 t:"Tết Đoan ngọ, thuyền rồng đua trên Thái Dịch trì. Các cung treo ngải cứu, gói bánh ú.",o:[
 {n:"Gói bánh ú dâng Thái hậu",fx:{suc:-5,th:6}},
 {n:"Đeo túi ngải cho các con",fx:{},x:"các con khỏe thêm 10",go:()=>S.kids.forEach(k=>{if(k.alive)k.hp=Math.min(100,k.hp+10)})},
 {n:"Đặt cược thuyền rồng",fx:{bac:-20},x:`${word(50)} · thắng: Bạc +60`,go:()=>{if(roll(50)){apply({bac:60});log("Thuyền ngươi cược về nhất.")}}}]}));
ev("trungcuu",()=>mon(9),()=>({o:od(35+S.tai/2+artOE(S,"thi"))}),p=>({who:pEmp(),
 t:"Tiết Trùng cửu, Hoàng thượng lên Cảnh Sơn ngắm cúc, uống rượu thù du.",o:[
 {n:"Theo ngài lên núi",fx:{suc:-15,sung:5}},
 {n:"Dâng rượu cúc chúc thọ Thái hậu",fx:{bac:-15,th:6}},
 {n:"Làm thơ Trùng cửu",fx:{},x:`${word(p.o)} · thành: Danh +5, Sủng +2`,go:()=>{if(roll(p.o))apply({danh:5,sung:2})}}]}));
ev("vulan",()=>mon(7),null,()=>({
 t:"Rằm tháng bảy, lễ Vu Lan. Đèn hoa đăng trôi trên kênh Kim Thủy, cung nhân khấn vái người đã khuất.",o:[
 {n:"Thả đèn cầu siêu",fx:{bac:-10,duc:3}},
 {n:"Cúng các phi tần chết oan",fx:{duc:5,danh:1},x:"cung nhân cảm phục, Lòng cung nữ +8",go:()=>apply({maid:8})},
 {n:"Mượn lễ dò hỏi cung nhân",fx:{tamco:1},x:"Tai mắt +1",go:()=>apply({mat:1})}]}));
ev("dongchi",()=>mon(11)||mon(12),null,()=>({
 t:"Đông chí, Hoàng thượng ra đàn Nam Giao tế trời. Tuyết phủ trắng mái ngói lưu ly.",o:[
 {n:"Xin theo hầu lễ tế",fx:{suc:-20,danh:S.rank>=3?6:2}},
 {n:"Nấu chè mừng cả cung",fx:{bac:-25,maid:10,duc:2}},
 {n:"Ở cung giữ ấm",fx:{suc:15}}]}));
ev("thbirthday",()=>!S.thDead&&mon(10),()=>({o:od(35+S.tai/3+artOE(S,"hoa"))}),p=>({who:pTH(),
 t:"Thánh thọ Thái hậu. Các cung đua nhau dâng lễ; ai được Thái hậu khen sẽ nở mày nở mặt.",o:[
 {n:"Dâng ngọc Như Ý",fx:{bac:-80,th:12}},
 {n:"Tự thêu trăm chữ Thọ",fx:{suc:-20},x:`${word(p.o)} · thành: Thái hậu +15, Danh +4 · hỏng: Thái hậu +3`,go:()=>apply(roll(p.o)?{th:15,danh:4}:{th:3})},
 {n:"Lễ mọn cho phải phép",fx:{bac:-10,th:1,danh:-2}}]}));
/* punishments */
ev("caning",()=>qOn()&&liveRivals(false).length,()=>({v:rvAny().id}),p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Trước Càn Ninh cung, ${v.name} bị lột trâm, đánh hai mươi trượng vì tội bất kính. Hoàng hậu bắt các phi tần đứng xem.`,o:[
 {n:"Quỳ xin tha cho nàng",fx:{hh:-6,duc:3},x:`${v.name} thiện cảm +30`,go:()=>{v.rel+=30}},
 {n:"Đứng xem, mặt không đổi sắc",fx:{tamco:2,duc:-2}},
 {n:"Thêm một lời buộc tội",fx:{hh:5,duc:-4},x:`${v.name} Sủng -10, thù -30`,go:()=>{v.sung=cl(v.sung-10,0,100);v.rel-=30}}]}});
ev("condemnedmaid",()=>true,()=>({o:od(35+S.duc/2+(has("nhantu")?20:0))}),p=>({
 t:"Một cung nữ cung khác bị khép tội trộm, sắp bị đánh chết. Nàng gào tên ngươi khi bị lôi qua cửa.",o:[
 {n:"Quỳ xin tha",fx:{},x:`${word(p.o)} · thành: Đức +5, Tai mắt +1 · hỏng: Sủng -5`,go:()=>apply(roll(p.o)?{duc:5,danh:2,mat:1}:{sung:-5})},
 {n:"Lén gửi bạc cho nhà nàng",fx:{bac:-20,duc:2}},
 {n:"Không can dự",fx:{duc:-1}}]}));
ev("coldvisit",()=>rivals.some(v=>v.alive&&v.out),()=>({f:pick(rivals.filter(v=>v.alive&&v.out)).id,o:od(30+S.sung/3+(has("nhantu")?15:0))}),p=>{const f=RV(p.f);if(!f)return null;return{who:pv(f),
 t:`Gió lùa qua song cửa lãnh cung. ${f.name} gầy rộc, níu tay áo ngươi: “Ta biết những chuyện họ muốn chôn.”`,o:[
 {n:"Mang chăn ấm, thuốc men",fx:{bac:-20,duc:4},x:"chứng cứ +1 về một phi tần từng làm điều sai",go:()=>{const x=evGuilty(S,liveRivals(true));if(x&&evA(S,x,1))log(`${f.name} kể chuyện xấu của ${x.name}: chứng cứ +1.`);else log(`${f.name} cảm tạ, kể chuyện cũ trong cung; không có gì làm chứng cứ.`)}},
 {n:"Xin Hoàng thượng ân xá",fx:{},x:`${word(p.o)} · thành: nàng về cung, thiện cảm +40 · hỏng: Sủng -6`,go:()=>{if(roll(p.o)){f.out=false;f.rank=0;f.rel+=40;log(`${f.name} được ân xá, về cung làm ${RANKS[0].n}.`)}else apply({sung:-6})}},
 {n:"Quay lưng bỏ đi",fx:{duc:-2}}]}});
/* dangers */
ev("taster",()=>S.rank>=2&&liveRivals(false).length,()=>({v:rvTop((a,b)=>b.malice-a.malice).id,o:oSpy()}),p=>{const v=RV(p.v);if(!v)return null;return{
 t:"Tiểu thái giám nếm canh ngự ban cho ngươi bỗng ôm bụng ngã gục, môi tím tái.",o:[
 {n:"Truy đến cùng Ngự thiện phòng",fx:{suc:-10},x:`${word(p.o)} · thành: chứng cứ ${v.name} +2`,go:()=>{if(roll(p.o)){evStory(v,2,"sai người bỏ thuốc vào đồ ăn của ngươi");log(`Đầu bếp khai ra người của ${v.name}.`)}else v.rel-=10}},
 {n:"Đổi người nấu, giấu chuyện",fx:{bac:-30},x:"2 tháng phi tần khó hại ngươi",go:()=>{S.shield=Math.max(S.shield,2)}},
 {n:"Khóc kể với Hoàng thượng",fx:{sung:3},x:"cả hậu cung bị tra, ai cũng ghen +5",go:()=>ghenAll(5)}]}});
ev("letterhome",()=>S.turn>=3,()=>({o:od(30+S.sung/3)}),p=>({
 t:`Thư nhà giấu trong giỏ trái cây: ${S.origin.k==="td"?"vú nuôi năm xưa":S.kc&&S.kc.fam&&!S.kc.fam.some(m=>m.r==="me")?"tổ mẫu":"mẹ già"} lâm bệnh nặng, chỉ mong gặp mặt ngươi lần cuối.`,o:[
 {n:"Gửi 50 lượng chữa bệnh",fx:{bac:-50,duc:3}},
 {n:"Xin ân chuẩn về thăm",fx:{},x:`${word(p.o)} · thành: Đức +4, Sức +10 · hỏng: Sủng -4`,go:()=>apply(roll(p.o)?{duc:4,suc:10}:{sung:-4})},
 {n:"Viết thư hỏi han",fx:{suc:-5,duc:1}}]}));
ev("fire",()=>liveRivals(false).length,()=>({v:rvAny().id,o:od(45+S.suc/4)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Nửa đêm, Đông lục cung bốc cháy. Lửa liếm mái cung ${v.name}; tiếng trẻ khóc lẫn tiếng chiêng.`,o:[
 {n:"Lao vào cứu người",fx:{suc:-25},x:`${word(p.o)} · thành: ${v.name} thiện cảm +40, Danh +6 · hỏng: Sức -15`,go:()=>{if(roll(p.o)){v.rel+=40;apply({danh:6,sung:3})}else apply({suc:-15})}},
 {n:"Chỉ huy cung nhân dập lửa",fx:{danh:3,maid:5}},
 {n:"Ngầm tra kẻ phóng hỏa",fx:{},x:`${word(oSpy())} · thành: biết ai phóng hỏa, nếu là người trong cung: chứng cứ +2`,go:()=>{if(roll(oSpy())){const x=evGuilty(S,liveRivals(false).filter(x=>x!==v));const n=x?evA(S,x,2):0;log(n?`Dấu dầu hỏa dẫn về người của ${x.name}: chứng cứ +${n}.`:"Dấu dầu hỏa dẫn ra ngoài cung: chỉ là tai nạn, không ai trong hậu cung đứng sau.")}}}]}});
/* rivals against each other: the player witnesses */
ev("rvframe",()=>liveRivals(false).length>=2,two,p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(a),
 t:`Ngươi nghe lén sau hòn non bộ: ${a.name} bàn với thái giám giấu đồ ngự dụng vào cung ${b.name} để vu tội trộm.`,o:[
 {n:`Báo cho ${b.name}`,fx:{duc:2},x:`${b.name} thiện cảm +25 · ${a.name} thù -15`,go:()=>{b.rel+=25;a.rel-=15}},
 {n:`Giúp ${a.name} một tay`,fx:{duc:-5},x:`${a.name} thiện cảm +20 · ${b.name} thất thế: ${chanceW(50)}`,go:()=>{a.rel+=20;S.schemes++;if(roll(50))fall(b,"bị vu trộm đồ ngự dụng")}},
 {n:"Ghi nhớ làm chứng cứ",fx:{tamco:1},x:`chứng cứ ${a.name} +2`,go:()=>{evStory(a,2,`bàn mưu giấu đồ ngự dụng vào cung ${b.name} để vu tội trộm`)}}]}});
ev("rvquarrel",()=>liveRivals(false).length>=2,two,p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(a),
 t:`Trong Ngự hoa viên, ${a.name} và ${b.name} tranh nhau một chậu mẫu đơn Hoàng thượng ban, lời qua tiếng lại.`,o:[
 {n:"Đứng ra can ngăn",fx:{duc:2,danh:1},x:"cả hai thiện cảm +5",go:()=>{a.rel+=5;b.rel+=5}},
 {n:`Đứng về phía ${a.name}`,fx:{},x:`${a.name} thiện cảm +15 · ${b.name} thù -15`,go:()=>{a.rel+=15;b.rel-=15}},
 {n:"Mách Hoàng hậu",fx:{hh:qOn()?5:0,duc:-1},x:"cả hai Sủng -5",go:()=>{a.sung=cl(a.sung-5,0,100);b.sung=cl(b.sung-5,0,100)}}]}});
ev("rvmusk",()=>liveRivals(false).length>=2,()=>{const t=two();if(!t)return null;t.o=od(40+RV(t.a).ev*10+S.danh/5);return t},p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(b),
 t:`${S.maid.name} thì thầm: ${a.name} trộn xạ hương vào túi thơm tặng ${b.name}, mong nàng không bao giờ có con.`,o:[
 {n:`Cảnh báo ${b.name}`,fx:{duc:3},x:`${b.name} thiện cảm +30 · ${a.name} thù -20`,go:()=>{b.rel+=30;a.rel-=20}},
 {n:"Tố lên Hoàng thượng",fx:{},x:`${word(p.o)} · thành: ${a.name} thất thế · hỏng: Danh -5`,go:()=>{if(roll(p.o))fall(a,"bị tố trộn xạ hương hại phi tần");else apply({danh:-5})}},
 {n:"Làm ngơ",fx:{tamco:1,duc:-3}}]}});
ev("rvbribe",()=>liveRivals(false).length>=2,two,p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pEunCourt("ksp"),
 t:`${a.name} đút lót Kính sự phòng giấu thẻ bài của ${b.name}. Tổng quản thái giám đánh tiếng: ngươi muốn chen một chân không?`,o:[
 {n:"Góp bạc, giấu cả thẻ nàng",fx:{bac:-30},x:"tuần này và tuần sau dễ được thị tẩm",go:()=>{S.tablet=2;b.sung=cl(b.sung-5,0,100)}},
 {n:`Mách ${b.name}`,fx:{},x:`${b.name} thiện cảm +20 · ${a.name} ghen +10`,go:()=>{b.rel+=20;a.ghen=cl(a.ghen+10,0,100)}},
 {n:"Không dính vào",fx:{}}]}});
