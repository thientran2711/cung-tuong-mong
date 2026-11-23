/* palace-intrigue events: each is {id, ok (gate), pp (params, saved), b (builder from params)}; registered in PEND so a pending one survives reload */
const EV=[];const EVI={};
function ev(id,ok,pp,b){const e={id,ok,pp,b};EV.push(e);EVI[id]=e;PEND[id]=b}
function mkEv(id){const e=EVI[id];if(!e)return null;const pp=e.pp?e.pp():{};if(pp===null)return null;S.seen=S.seen||{};S.seen[id]=S.turn;const d=mkP(id,pp);if(d&&typeof nrMark==="function")nrMark("j7",id);/* ORDER THIN: cross-life memory */return d}
function evFresh(e){const s=S.seen&&S.seen[e.id];return s==null||S.turn-s>=12}
function freshEvents(){return EV.filter(e=>{try{return evFresh(e)&&e.ok()}catch(x){return false}})}
const KID=n=>S.kids.find(k=>k.name===n&&k.alive)||null;
/* npc-purpose G1: the actor of a card = the person whose own goal drives it (kinds in jagwhy1; makeDil hands over its pick in DILX) */
const rvWhy=(k,c)=>(typeof DILX!=="undefined"&&DILX&&DILX.kind===k)?DILX:npcWhy(k,c);
const rvPair=k=>{const X=rvWhy(k);return X&&X.tgt?{a:X.who.id,b:X.tgt.id,y:X.why}:null};
const rvOmen=p=>{const a=p&&p.a!=null&&RV(p.a);return a?`<br>Trong cung xì xào: ${a.name} ${p.y}, đã lót tay Khâm Thiên giám.`:""};
const rvY=(p,s)=>p&&p.y?(s||", ")+p.y:"";
const mon=m=>S.month===m;
const kidHurt=(k,n)=>{k.hp=Math.max(0,k.hp-n);if(k.hp<=0)log(kidDie(k,"không qua khỏi cơn bệnh",true))};
/* harem cap (BAL.harem.cap): the room is checked again when she is chosen, not only when the event was queued (tuyển tú may fill the harem meanwhile) */
const newGirl=rel=>{if(!roomFor("consort"))return null;const n=newRival(1+R(2));Object.assign(n,drawFace());n.rel=rel;rivals.push(n);return n};

/* framing */
ev("doll",()=>S.rank>=1&&liveRivals(false).length,()=>{const X=rvWhy("meHarm");return X?{v:X.who.id,y:X.why,o:od(BAL.odb.j7.odO+eyes(S)*6+S.tamco/4)}:null},p=>{const v=RV(p.v);if(!v)return null;return{who:pMaid(),
 t:`Canh ba, ${S.maid.name} hớt hải quỳ xuống: dưới gốc quế sân ngươi có hình nhân vải ghi ngày sinh của Hoàng thượng.<br>Người của Cung Chính ti đang trên đường tới.`,o:[
 {n:"Đốt ngay, lần dấu kẻ chôn",fx:{},x:`${word(p.o)} · thành: chứng cứ ${v.name} ${balSg(BAL.eff.j7.evGo_3)} · hỏng: bị phạt`,go:()=>{if(roll(p.o)){evStory(v,BAL.eff.j7.evGo_3,"chôn hình nhân trù ẻo hại ngươi");log(`Dấu giày dưới gốc quế dẫn về cung ${v.name}${rvY(p,": nàng ")}.`)}else punish("chôn hình nhân trù ẻo",2)}},
 {n:"Tự trình lên Hoàng thượng",fx:{danh:-3},x:`${word(od(BAL.odb.j7.odX+S.duc/3))} · thành: Sủng ${balSg(BAL.eff.j7.sungGo)} · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_2)}`,go:()=>{if(roll(od(BAL.odb.j7.odX+S.duc/3)))apply({sung:BAL.eff.j7.sungGo,duc:2});else apply({sung:BAL.eff.j7.sungGo_2})}},
 {n:"Mua chuộc Cung Chính ti",fx:{bac:-60},x:"chuyện chìm xuống"}]}});
ev("poisongift",()=>liveRivals(false).length&&S.rank>=1,()=>{const X=rvWhy("meHarm");if(!X)return null;const v=npwPick(liveRivals(false).filter(x=>x!==X.who),y=>Math.max(0,hostility(X.who,y))+Math.max(0,aff(y,S)));/* npc-purpose: the plotter's own aim — a woman she resents, best one close to the player (the frame breaks that tie too) */return v?{v:v.id,a:X.who.id,y:X.why,o:od(BAL.odb.j7.odO_2+eyes(S)*5+S.tamco/4)}:null},p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Hộp điểm tâm đề tên ngươi gửi sang cung ${v.name}; cung nữ nếm thử liền thổ huyết.<br>Cả hậu cung xôn xao: ngươi hạ độc.`,o:[
 {n:"Kêu oan, xin tra người đưa quà",fx:{},x:`${word(p.o)} · thành: được minh oan, Danh ${balSg(BAL.eff.j7.danhGo)} · hỏng: bị phạt nặng`,go:()=>{if(roll(p.o)){apply({danh:BAL.eff.j7.danhGo});{const a=p.a!=null&&RV(p.a);log(a?`Tra ra tiểu thái giám đưa quà bị người của ${a.name} mua chuộc (nàng ${p.y}); ngươi được minh oan.`:"Tra ra tiểu thái giám đưa quà đã bị mua chuộc; ngươi được minh oan.")}}else{apply({danh:-6});v.rel-=20;punish("gửi quà có độc",2)}}},
 {n:"Nhờ Thái hậu đứng ra",fx:{th:BAL.cv.poison.th},x:`thành: thoát nạn ngay, khỏi phải đối chất (Thái hậu ém chuyện) · kèm: thiện cảm ${balSg(BAL.cv.poison.rel)} (nàng vẫn nghi ngươi)`,go:()=>{v.rel+=BAL.cv.poison.rel}},
 {n:"Đẩy tội cho cung nữ",fx:{maid:BAL.cv.poison.maid,duc:BAL.cv.poison.duc},x:"thành: thoát nạn ngay, khỏi phải đối chất · kèm: cung nữ bị đánh ba mươi trượng"}]}});
/* rumours */
ev("guardrumour",()=>S.nights>=1,()=>{const X=rvWhy("meHarm");return X?{v:X.who.id,y:X.why,o:od(BAL.odb.j7.odO_3+S.duc/2)}:null},p=>{const v=p.v!=null?RV(p.v):null;return{
 t:"Lời đồn lan khắp các cung: đêm đêm có thị vệ lẻn vào tẩm cung của ngươi.<br>Hoàng thượng chưa nói gì, nhưng đã hai tuần không lật thẻ ngươi.",o:[
 {n:"Xin Hoàng thượng tra xét",fx:{},x:`${word(p.o)} · thành: Danh ${balSg(BAL.eff.j7.danhGo_2)}, ${sgStat(BAL.eff.j7.sungGuardOk)} · hỏng: ${sgStat(BAL.eff.j7.sungGo_3)}, Danh ${balSg(BAL.eff.j7.danhGuardFail)}`,go:()=>{if(roll(p.o))apply({danh:BAL.eff.j7.danhGo_2,sung:BAL.eff.j7.sungGuardOk});else apply({sung:BAL.eff.j7.sungGo_3,danh:BAL.eff.j7.danhGuardFail})}},
 {n:"Đút bạc dập lời đồn",fx:{bac:-BAL.cv.rumor.bac,danh:-BAL.cv.rumor.danh},x:"thành: lời đồn tắt, không lan thêm"},
 {n:"Tìm kẻ tung tin",fx:v?{suc:BAL.cv.spy.suc}:{},x:v?`${word(oSpy())} · thành: chứng cứ ${v.name} ${balSg(BAL.eff.j7.evGo_4)}, thiện cảm ${balSg(BAL.cv.spy.rel)}`:"thành: không ai đứng sau, ngươi yên lòng",go:v?()=>{if(roll(oSpy())){evStory(v,BAL.eff.j7.evGo_4,"tung tin đồn bẩn về ngươi");v.rel+=BAL.cv.spy.rel;log(`Kẻ tung tin là người của ${v.name}${rvY(p,": nàng ")}.`)}}:()=>{}/* review/odds-no-unknown: no one to find = nothing rolled, the card is certain (j79 read the roll(oSpy()) of the other branch) */}]}});
ev("ghost",()=>SEASON[S.month-1]==="Thu"||SEASON[S.month-1]==="Đông",()=>{const X=rvWhy("meHarm");return X?{v:X.who.id,y:X.why}:null},p=>{const v=p.v!=null?RV(p.v):null;return{
 t:"Cung nhân thì thầm: đêm qua có bóng áo trắng khóc bên giếng sau cung ngươi.<br>Ba cung nữ xin đổi đi nơi khác.",o:[
 {n:"Mời sư làm lễ trừ tà",fx:{bac:-30,duc:2,suc:5}},
 {n:"Rình bắt kẻ giả ma",fx:v?{...BAL.cv.ghost.watch}:{},x:v?`${word(od(BAL.odb.j7.odX_2+eyes(S)*5))} · thành: chứng cứ ${v.name} ${balSg(BAL.eff.j7.evGo_5)}`:"thành: chỉ là mèo hoang, cung nữ yên lòng",go:v?()=>{if(roll(od(BAL.odb.j7.odX_2+eyes(S)*5))){evStory(v,BAL.eff.j7.evGo_5,"sai cung nữ giả ma dọa ngươi");log(`Kẻ giả ma là cung nữ của ${v.name}${rvY(p,": nàng ")}.`)}}:()=>{}/* odds-no-unknown family (npc-purpose: no one with a reason = no culprit): nothing rolled, the card is certain */},
 {n:"Mặc kệ",fx:{...BAL.cv.ghost.skip,suc:BAL.cv.rest},x:"giữ sức, không thức canh giếng"}]}});
/* alliances */
ev("pact",()=>qOn()&&liveRivals(false).length,()=>{const X=rvWhy("meAlly");return X?{v:X.who.id,y:X.why}:null},p=>{const v=RV(p.v),q=rivals[0];if(!v)return null;return{who:pv(v),
 t:`${v.name}${rvY(p,", vốn ")}, hẹn ngươi ở đình Thiên Thu: “Hoàng hậu ${q.name} đè đầu cả hậu cung đã lâu.<br>Hai ta chung một thuyền, được chăng?”`,o:[
 {n:"Kết minh",fx:{hh:-5},x:`${v.name} thiện cảm +25 · nàng kể chuyện sai trái của Hoàng hậu, nếu có: chứng cứ ${balSg(BAL.eff.j7.evGo)}`,go:()=>{v.rel+=25;/*evok: capped; preview says "nếu có"*/evA(S,q,BAL.eff.j7.evGo)}},
 {n:"Mật báo Hoàng hậu",fx:{hh:12},x:`${v.name} thù -30`,go:()=>{v.rel-=30;ghenUp(v,10,"bị ngươi mật báo với Hoàng hậu",S)}},
 {n:"Từ chối khéo",fx:{duc:1}}]}});
/* 2f2 (owner OD 17/11 ~16:50Z): the volunteer is a REAL servant of another palace who wants something from her (tmVol: her tmOdds for that person
   reach BAL.ag.know.tm.vol.min) — he chose to come; she decides. No nameless "Tai mắt ${balSg(BAL.eff.j7.matGo)}". */
ev("eunuch",()=>typeof tmVol==="function"&&!!tmVol(),()=>{const s=tmVol();return{sid:s.sid,o:od(BAL.odb.j7.odO_4+S.tamco/3)}},p=>{const s=servById(p.sid),o=s&&ownerOf(s);if(!s||!o||o===S||s.spyFor!=null)return null;const B=BAL.ag.know.tm.vol.bac;return{
 t:`${s.name}, ${s.role==="eunuch"?"thái giám":"cung nữ"} hầu cung ${o.name}, quỳ ngoài thềm: “${s.role==="eunuch"?"Nô tài":"Nô tỳ"} nguyện làm tai mắt cho `+kSay({srv:s.role==="eunuch"?"m":"f"},S,"{goi}")+".”",o:[
 {n:"Nhận làm tai mắt",fx:{bac:-B},x:`thành: ${s.name} làm tai mắt cho ngươi trong cung ${o.name}`,go:()=>{tmTake(S,s)}},
 {n:"Thử lòng trước",fx:{},x:`${word(agOdd(p.o))} · thành: ${s.name} làm tai mắt cho ngươi · bại: kẻ hai lòng, mang chuyện cung ngươi đi bán`,go:()=>{if(roll(agOdd(p.o)))tmTake(S,s);else{apply({danh:-3});log(`<span class="r">${s.name} mang chuyện cung ngươi đi bán.</span>`)}}},
 {n:"Đuổi đi",fx:{duc:1}}]}});
/* the Emperor */
ev("empnight",()=>!S.preg&&S.sung>=BAL.visit.minSung,()=>({o:od(BAL.visit.show.o+bestArt().w*BAL.visit.show.w+mm())}),p=>({who:pEmp(),
 t:"Đêm khuya, không đèn lồng, không thái giám báo trước. Hoàng thượng đứng ngoài rèm cửa cung ngươi.<br>“Trẫm không ngủ được.”",o:[
 {n:"Thắp đèn hầu rượu",fx:{},x:"được thị tẩm",go:()=>{S.tonight="me";nightScene()}},
 {n:`Phô tài: ${bestArt().n}`,fx:{suc:-BAL.visit.show.suc},x:`${word(p.o)} · thành: Sủng +${BAL.visit.show.sung}, Danh +${BAL.visit.show.danh}`,go:()=>{if(roll(p.o))apply({sung:BAL.visit.show.sung,danh:BAL.visit.show.danh})}},
 {n:"Khuyên ngài giữ long thể",fx:{duc:3,sung:-1}}]}));
ev("minister",()=>S.rank>=2,()=>({o:od(BAL.odb.j7.odO_5+S.tai/3+(has("chamchinh")?15:0))}),p=>({who:pEmp(),
 t:"Hoàng thượng đặt bản tấu xuống: “"+(typeof minOff==="function"?minOff("Hộ bộ","Thượng thư Hộ bộ"):"Thượng thư Hộ bộ")+" xin tăng thuế muối. "+kSay("emp",S,"{Goi}")+" nghĩ sao?”",o:[
 {n:"Can gián thẳng thắn",fx:{},x:`${word(p.o)} · thành: Danh ${balSg(BAL.eff.j7.danhGo_3)}, Sủng ${balSg(BAL.eff.j7.sungGo_4)} · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_5)}`,go:()=>{if(roll(p.o))apply({danh:BAL.eff.j7.danhGo_3,sung:BAL.eff.j7.sungGo_4});else apply({sung:BAL.eff.j7.sungGo_5})}},
 {n:"“Hậu cung không bàn chính sự”",fx:{duc:3,sung:-1}},
 {n:"Nói đỡ cho viên quan",fx:{bac:60,duc:-4},x:"đã nhận bạc của Thượng thư"}]}));
ev("jealousprince",()=>mySons().some(k=>k.age>=8),()=>({k:mySons().filter(k=>k.age>=8)[0].name}),p=>{const k=KID(p.k);if(!k)return null;return{who:pEmp(),
 t:`Triều thần vây quanh ${k.name} sau buổi giảng kinh. Hoàng thượng nhìn từ xa, sắc mặt sa sầm.`,o:[
 {n:"Bắt con đóng cửa đọc sách",fx:{danh:-2},x:`Hoàng thượng thương ${k.name} ${balSg(BAL.eff.j7.fondGo)}`,go:()=>{k.fond=cl(k.fond+BAL.eff.j7.fondGo,0,100)}},
 {n:"Để con tiếp tục kết giao",fx:{danh:4,sung:-6},x:`Tài ${k.name} ${balSg(BAL.eff.j7.talGo)}`,go:()=>{k.tal=cl(k.tal+BAL.eff.j7.talGo,0,100)}},
 {n:"Xin cho con đi tuần biên",fx:{sung:4},x:`Hoàng thượng thương ${k.name} -${balAb(BAL.eff.j7.fondGo_2)}`,go:()=>{k.fond=cl(k.fond-BAL.eff.j7.fondGo_2,0,100)}}]}});
/* court ties */
ev("flood",()=>SEASON[S.month-1]==="Hạ",null,()=>({
 t:"Hoàng Hà vỡ đê, ba châu chìm trong nước. Hoàng hậu truyền các cung quyên góp cứu tế.",o:[
 {n:"Dâng 100 lượng",fx:{bac:-100,danh:6,duc:3}},
 {n:"Dâng 30 lượng",fx:{bac:-30,danh:2}},
 {n:"Cắt bổng lộc cung nhân để dâng",fx:{danh:3,maid:-15}}]}));
ev("newgirl",()=>liveRivals(true).length<9&&roomFor("consort"),null,()=>({
 t:"Con gái Thượng thư Lễ bộ được tuyển vào cung, nghe nói dung mạo khuynh thành.<br>Hôm nay nàng đến các cung bái kiến.",o:[
 {n:"Tặng trâm, kết thân",fx:{bac:-BAL.cv.newgirl},x:`tân nhân thiện cảm ${balSg(BAL.cv.ngAff.warm)}`,go:function(){const n=newGirl(BAL.cv.ngAff.warm);if(!n){apply({bac:-((this&&this.fx&&this.fx.bac)||0)});log("Hậu cung đã đủ người, tân nhân được đưa về nhà.");return}log(`${n.name} vào cung, phong ${RANKS[n.rank].n}; nàng mến ngươi.`)}},
 {n:"Tiếp đãi lạnh nhạt",fx:{},x:`thành: giữ lại ${BAL.cv.newgirl} lượng bạc · mất: tân nhân thiện cảm ${balSg(BAL.cv.ngAff.cold)}`,go:()=>{const n=newGirl(BAL.cv.ngAff.cold);if(!n){log("Hậu cung đã đủ người, tân nhân được đưa về nhà.");return}log(`${n.name} vào cung, phong ${RANKS[n.rank].n}.`)}},
 {n:"Dằn mặt ngay buổi đầu",fx:{duc:-4,tamco:1},x:"tân nhân sợ, thù -25",go:()=>{const n=newGirl(-25);if(!n){log("Hậu cung đã đủ người, tân nhân được đưa về nhà.");return}ghenUp(n,15,"bị ngươi dằn mặt ngày đầu vào cung",S);log(`${n.name} vào cung, khóc suốt đêm sau buổi bái kiến.`)}}]}));
/* children */
ev("princefever",()=>S.kids.some(k=>k.alive&&k.age<10)&&(mon(1)||mon(8)),()=>({k:S.kids.filter(k=>k.alive&&k.age<10).sort((x,y)=>(x.hp||0)-(y.hp||0)||(x.age||0)-(y.age||0))[0].name,o:od(BAL.odb.j7.odO_6+artO(S,"y"))}),p=>{const k=KID(p.k);if(!k)return null;return{
 t:`Đêm yến tiệc, ${k.name} sốt cao co giật. Tiếng nhạc bên Thái Hòa điện vẫn vọng sang.`,o:[
 {n:"Bỏ yến, thức trắng bên con",fx:{suc:-20,sung:-3},x:`Sức khỏe ${k.name} ${balSg(BAL.eff.j7.hpGo)}`,go:()=>{k.hp=Math.min(100,k.hp+BAL.eff.j7.hpGo)}},
 {n:"Mời thái y, vẫn dự yến",fx:{bac:-30,sung:3},x:`Sức khỏe ${k.name} ${balSg(BAL.eff.j7.hpGo_2)}`,go:()=>{k.hp=Math.min(100,k.hp+BAL.eff.j7.hpGo_2)}},
 {n:"Tự bốc thuốc",fx:{},x:`${word(p.o)} · thành: Sức khỏe ${balSg(BAL.eff.j7.hpGo_3)} · hỏng: Sức khỏe -25`,go:()=>{if(roll(p.o))k.hp=Math.min(100,k.hp+BAL.eff.j7.hpGo_3);else kidHurt(k,25)}}]}});
ev("foreignwed",()=>myDaus().some(k=>k.age>=BAL.age.wed),()=>{const d=myDaus().filter(k=>k.age>=BAL.age.wed)[0];return d?{k:d.name,o:od(BAL.odb.j7.odO_7+S.sung/3+mm())}:null},p=>{const k=KID(p.k);if(!k)return null;return{who:pEmp(),
 t:`Sứ thần Bắc Địch dâng ngựa quý, cầu hôn ${k.name}. Triều thần đều nói: một nàng công chúa đổi mười năm yên biên ải.`,o:[
 {n:"Thuận theo đại cục",fx:{danh:10,th:5,suc:-15},x:`${k.name} xuất giá phương bắc`,go:()=>{k.alive=false;k.wed=1;log(`${k.name} khóc từ biệt mẫu thân, theo đoàn sứ lên phương bắc.`)}},
 {n:"Quỳ xin giữ con lại",fx:{},x:`${word(p.o)} · thành: giữ được con, gả một tông nữ thay · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_6)}`,go:()=>{if(roll(p.o))log("Hoàng thượng động lòng, gả một tông nữ thay.");else apply({sung:BAL.eff.j7.sungGo_6,danh:-3})}},
 {n:"Tiến cử một tông nữ",fx:{...BAL.cv.tong},x:`thành: giữ được ${k.name}, một tông nữ đi thay`}]}});
/* servants */
ev("maidhostage",()=>liveRivals(false).length,()=>{const X=rvWhy("meHarm");return X?{v:X.who.id,y:X.why,o:od(BAL.odb.j7.odO_8+S.tamco/3+S.maid.loyal/5)}:null},p=>{const v=RV(p.v);if(!v)return null;return{who:pMaid(),
 t:`${S.maid.name} quỳ khóc: người của ${v.name} giữ cha mẹ nàng, bắt nàng lấy trộm thư từ của ngươi.${p.y?`<br>(${v.name} ${p.y}.)`:""}`,o:[
 {n:"Bỏ bạc chuộc người",fx:{bac:-BAL.cv.ransom,maid:BAL.cv.hostage.pay}},
 {n:"Bày kế phản gián",fx:{},x:`${word(p.o)} · thành: chứng cứ ${v.name} ${balSg(BAL.eff.j7.evGo_6)} · hỏng: Thiện cảm của cung nữ -20`,go:()=>{if(roll(p.o)){evStory(v,BAL.eff.j7.evGo_6,"bắt cha mẹ cung nữ của ngươi để ép nàng trộm thư");apply({maid:10})}else apply({maid:-20})}},
 {n:"Bỏ mặc",fx:{maid:BAL.cv.hostage.skip},x:`thành: giữ lại ${BAL.cv.ransom} lượng bạc`}]}});
ev("doctorblack",()=>S.doctor,()=>({o:od(BAL.odb.j7.odO_9+S.tamco/3+eyes(S)*4)}),p=>({who:pDoc(),
 t:"Thái y tâm phúc của ngươi lén báo: có kẻ biết ông từng kê nhầm thuốc cho tiên phi, đòi 50 lượng mỗi tháng.",o:[
 {n:"Trả bạc thay ông",fx:{bac:-50}},
 {n:"Diệt kẻ tống tiền",fx:{duc:-6},x:`${word(p.o)} · thành: bịt được miệng kẻ tống tiền · hỏng: bị phạt`,go:()=>{S.schemes++;if(!roll(p.o)){apply({danh:-5});punish("giết người diệt khẩu",2)}}},
 {n:"Để ông tự lo",fx:{},x:"mất thái y tâm phúc",go:()=>{S.doctor=0}}]}));
/* omens */
ev("comet",()=>S.year>=2,()=>{const X=rvWhy("omen");if(!X||!X.tgt)return null;const me=X.tgt===S;return{me,v:me?null:X.tgt.id,a:X.who.id,y:X.why}},p=>{const v=p.me?null:RV(p.v);if(!p.me&&!v)return null;
 if(p.me)return{t:"Sao chổi quét ngang trời tây. Khâm Thiên giám tâu: âm khí xung từ cung của ngươi."+rvOmen(p),o:[
  {n:"Trai giới cầu đảo",fx:{suc:-15,duc:4,danh:2}},{n:"Mua chuộc Khâm Thiên giám",fx:{bac:-80},x:"lời tâu đổi hướng"},{n:"Cắn răng chịu tiếng",fx:{danh:-8,sung:-5}}]};
 return{who:pv(v),t:`Sao chổi hiện. Khâm Thiên giám tâu: ${v.name} mệnh khắc với long thể.<br>Nàng quỳ ngoài Dưỡng Hòa điện cả đêm.${rvOmen(p)}`,o:[
  {n:"Đứng ra nói đỡ",fx:{duc:3,danh:-2},x:`${v.name} thiện cảm +25`,go:()=>{v.rel+=25}},
  {n:"Đổ thêm dầu vào lửa",fx:{duc:-5},x:`${v.name} Sủng -15, thù -20`,go:()=>{v.sung=cl(v.sung-15,0,100);v.rel-=20}},
  {n:"Im lặng",fx:{}}]}});
ev("phoenix",()=>S.rank>=3&&S.rank<7,null,()=>({
 t:"Thầy tướng ở chùa Bảo Hoa phán: trong hậu cung có một người mệnh phượng hoàng, và chỉ vào cung ngươi.",o:[
 {n:"Khiêm nhường chối từ",fx:{duc:3,hh:5}},
 {n:"Để lời đồn lan xa",fx:{danh:8,hh:-15},x:`cả hậu cung ghen +${ghenN(BAL.ghen.rumor)}`,go:()=>ghenAll(BAL.ghen.rumor,"lời đồn về ngươi lan khắp cung")},
 {n:"Bịt miệng thầy tướng",fx:{bac:-30,tamco:1}}]}));
/* festivals */
ev("doanngo",()=>mon(5),null,()=>({
 t:"Tết Đoan ngọ, thuyền rồng đua trên Thái Dịch trì. Các cung treo ngải cứu, gói bánh ú.",o:[
 {n:"Gói bánh ú dâng Thái hậu",fx:{suc:-5,th:6}},
 {n:"Đeo túi ngải cho các con",fx:{},x:"các con khỏe thêm 10",go:()=>S.kids.forEach(k=>{if(k.alive)k.hp=Math.min(100,k.hp+BAL.eff.j7.hpGo_4)})},
 {n:"Đặt cược thuyền rồng",fx:{bac:-20},x:`${word(50)} · thắng: Bạc ${balSg(BAL.eff.j7.bacGo)}`,go:()=>{if(roll(50)){apply({bac:BAL.eff.j7.bacGo});log("Thuyền ngươi cược về nhất.")}}}]}));
ev("trungcuu",()=>mon(9),()=>({o:od(BAL.odb.j7.odO_10+S.tai/2+artOE(S,"thi"))}),p=>({who:pEmp(),
 t:"Tiết Trùng cửu, Hoàng thượng lên Cảnh Sơn ngắm cúc, uống rượu thù du.",o:[
 {n:"Theo ngài lên núi",fx:{suc:-15,sung:5}},
 {n:"Dâng rượu cúc chúc thọ Thái hậu",fx:{bac:-15,th:6}},
 {n:"Làm thơ Trùng cửu",fx:{},x:`${word(p.o)} · thành: Danh ${balSg(BAL.eff.j7.danhGo_4)}, Sủng ${balSg(BAL.eff.j7.sungGo_7)}`,go:()=>{if(roll(p.o))apply({danh:BAL.eff.j7.danhGo_4,sung:BAL.eff.j7.sungGo_7})}}]}));
ev("vulan",()=>mon(7),null,()=>({
 t:"Rằm tháng bảy, lễ Vu Lan. Đèn hoa đăng trôi trên kênh Kim Thủy, cung nhân khấn vái người đã khuất.",o:[
 {n:"Thả đèn cầu siêu",fx:{...BAL.cv.vulan.den},x:"cả cung thấy ngươi thả đèn"},
 {n:"Cúng các phi tần chết oan",fx:{...BAL.cv.vulan.cung},x:`quỳ khấn suốt đêm, cung nhân cảm phục, Thiện cảm của cung nữ +${BAL.cv.vulan.cungMaid}`,go:()=>apply({maid:BAL.cv.vulan.cungMaid})},
 {n:"Mượn lễ dò hỏi cung nhân",fx:{tamco:1},x:statTxt("mat",BAL.eff.j7.matGo_2),go:()=>apply({mat:BAL.eff.j7.matGo_2})}]}));
ev("dongchi",()=>mon(11)||mon(12),null,()=>({
 t:"Đông chí, Hoàng thượng ra đàn Nam Giao tế trời. Tuyết phủ trắng mái ngói lưu ly.",o:[
 {n:"Xin theo hầu lễ tế",fx:{suc:-20,danh:S.rank>=3?6:2}},
 {n:"Nấu chè mừng cả cung",fx:{bac:-25,maid:10,duc:2}},
 {n:"Ở cung giữ ấm",fx:{suc:15}}]}));
ev("thbirthday",()=>!S.thDead&&mon(10),()=>({o:od(BAL.odb.j7.odO_11+S.tai/3+artOE(S,"hoa"))}),p=>({who:pTH(),
 t:"Thánh thọ Thái hậu. Các cung đua nhau dâng lễ; ai được Thái hậu khen sẽ nở mày nở mặt.",o:[
 {n:"Dâng ngọc Như Ý",fx:{bac:-80,th:12}},
 {n:"Tự thêu trăm chữ Thọ",fx:{suc:-20},x:`${word(p.o)} · thành: Thái hậu ${balSg(BAL.eff.j7.thGo)}, Danh ${balSg(BAL.eff.j7.danhGo_5)} · hỏng: Thái hậu ${balSg(BAL.eff.j7.thGo_2)}`,go:()=>apply(roll(p.o)?{th:BAL.eff.j7.thGo,danh:BAL.eff.j7.danhGo_5}:{th:BAL.eff.j7.thGo_2})},
 {n:"Lễ mọn cho phải phép",fx:{bac:-10,th:1,danh:-2}}]}));
/* punishments */
ev("caning",()=>qOn()&&liveRivals(false).length,()=>{const X=rvWhy("hhCane");return X&&X.tgt?{v:X.tgt.id,y:X.why}:null},p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Trước Càn Ninh cung, ${v.name} bị lột trâm, đánh hai mươi trượng vì tội bất kính. Hoàng hậu bắt các phi tần đứng xem.${p.y?`<br>Ai cũng biết Hoàng hậu ${p.y}.`:""}`,o:[
 {n:"Quỳ xin tha cho nàng",fx:{hh:-6,duc:3},x:`${v.name} thiện cảm +30`,go:()=>{v.rel+=30}},
 {n:"Đứng xem, mặt không đổi sắc",fx:{tamco:2,duc:-2}},
 {n:"Thêm một lời buộc tội",fx:{hh:5,duc:-4},x:`${v.name} Sủng -10, thù -30`,go:()=>{v.sung=cl(v.sung-10,0,100);v.rel-=30}}]}});
ev("condemnedmaid",()=>true,()=>({o:od(BAL.odb.j7.odO_12+S.duc/2+(has("nhantu")?20:0))}),p=>({
 t:"Một cung nữ cung khác bị khép tội trộm, sắp bị đánh chết. Nàng gào tên ngươi khi bị lôi qua cửa.",o:[
 {n:"Quỳ xin tha",fx:{},x:`${word(p.o)} · thành: Đức ${balSg(BAL.eff.j7.ducGo)}, ${statTxt("mat",BAL.eff.j7.matGo_3)} · bại: Sủng ${balSg(BAL.eff.j7.sungGo_8)}`,go:()=>apply(roll(p.o)?{duc:BAL.eff.j7.ducGo,danh:2,mat:BAL.eff.j7.matGo_3}:{sung:BAL.eff.j7.sungGo_8})},
 {n:"Lén gửi bạc cho nhà nàng",fx:{bac:-20,duc:2}},
 {n:"Không can dự",fx:{...BAL.cv.cmaidSkip,suc:BAL.cv.rest},x:"giữ sức, không dây vào án"}]}));
ev("coldvisit",()=>rivals.some(v=>v.alive&&v.out),()=>{const X=rvWhy("coldAsk");return X?{f:X.who.id,y:X.why,o:od(BAL.odb.j7.odO_13+S.sung/3+(has("nhantu")?15:0))}:null},p=>{const f=RV(p.f);if(!f)return null;return{who:pv(f),
 t:`Gió lùa qua song cửa lãnh cung. ${f.name} gầy rộc, níu tay áo ngươi: “Ta biết những chuyện họ muốn chôn.”`,o:[
 {n:"Mang chăn ấm, thuốc men",fx:{bac:-20,duc:4},x:`chứng cứ ${balSg(BAL.eff.j7.evGo_2)} về một phi tần từng làm điều sai`,go:()=>{const x=evGuilty(S,liveRivals(true));if(x&&evA(S,x,BAL.eff.j7.evGo_2))log(`${f.name} kể chuyện xấu của ${x.name}: chứng cứ ${balSg(BAL.eff.j7.evGo_2)}.`);else log(`${f.name} cảm tạ, kể chuyện cũ trong cung; không có gì làm chứng cứ.`)}},
 (o=>roomFor("consort")||typeof kitOff!=="function"?o:kitOff(o,"hậu cung đã đủ người"))({n:"Xin Hoàng thượng ân xá",fx:{},x:`${word(p.o)} · thành: nàng về cung, thiện cảm +40 · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_9)}`,go:()=>{if(!roomFor("consort")){log("Hậu cung đã đủ người, nàng chưa được về cung.");return}if(roll(p.o)){f.out=false;f.rank=0;f.rel+=40;log(`${f.name} được ân xá, về cung làm ${RANKS[0].n}.`)}else apply({sung:BAL.eff.j7.sungGo_9})}}),
 {n:"Quay lưng bỏ đi",fx:{duc:-2}}]}});
/* dangers */
ev("taster",()=>S.rank>=2&&liveRivals(false).length,()=>{const X=rvWhy("meHarm");return X?{v:X.who.id,y:X.why,o:oSpy()}:null},p=>{const v=RV(p.v);if(!v)return null;return{
 t:"Tiểu thái giám nếm canh ngự ban cho ngươi bỗng ôm bụng ngã gục, môi tím tái.",o:[
 {n:"Truy đến cùng Ngự thiện phòng",fx:{suc:-10},x:`${word(p.o)} · thành: chứng cứ ${v.name} ${balSg(BAL.eff.j7.evGo_7)}`,go:()=>{if(roll(p.o)){evStory(v,BAL.eff.j7.evGo_7,"sai người bỏ thuốc vào đồ ăn của ngươi");log(`Đầu bếp khai ra người của ${v.name}${rvY(p,": nàng ")}.`)}else v.rel-=10}},
 {n:"Đổi người nấu, giấu chuyện",fx:{bac:-30},x:"2 tháng phi tần khó hại ngươi",go:()=>{S.shield=Math.max(S.shield,2)}},
 {n:"Khóc kể với Hoàng thượng",fx:{sung:3},x:`cả hậu cung bị tra, ai cũng ghen +${ghenN(BAL.ghen.cry)}`,go:()=>ghenAll(BAL.ghen.cry,"ngươi khóc kể khiến cả hậu cung bị tra")}]}});
ev("letterhome",()=>S.turn>=3,()=>({o:od(BAL.odb.j7.odO_14+S.sung/3)}),p=>({
 t:`Thư nhà giấu trong giỏ trái cây: ${S.origin.k==="td"?"vú nuôi năm xưa":S.kc&&S.kc.fam&&!S.kc.fam.some(m=>m.r==="me")?"tổ mẫu":"mẹ già"} lâm bệnh nặng, chỉ mong gặp mặt ngươi lần cuối.`,o:[
 {n:"Gửi 50 lượng chữa bệnh",fx:{bac:-50,duc:3}},
 {n:"Xin ân chuẩn về thăm",fx:{},x:`${word(p.o)} · thành: Đức ${balSg(BAL.eff.j7.ducGo_2)}, Sức ${balSg(BAL.eff.j7.sucGo)} · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_10)}`,go:()=>apply(roll(p.o)?{duc:BAL.eff.j7.ducGo_2,suc:BAL.eff.j7.sucGo}:{sung:BAL.eff.j7.sungGo_10})},
 {n:"Viết thư hỏi han",fx:{suc:-5,duc:1}}]}));
ev("fire",()=>liveRivals(false).length,()=>{const X=rvWhy("arson");return X&&X.tgt?{v:X.tgt.id,a:X.who.id,y:X.why,o:od(BAL.odb.j7.odO_15+S.suc/4)}:null},p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Nửa đêm, Đông lục cung bốc cháy. Lửa liếm mái cung ${v.name}; tiếng trẻ khóc lẫn tiếng chiêng.`,o:[
 {n:"Lao vào cứu người",fx:{suc:-25},x:`${word(p.o)} · thành: ${v.name} thiện cảm +40, Danh ${balSg(BAL.eff.j7.danhGo_6)} · hỏng: Sức ${balSg(BAL.eff.j7.sucGo_2)}`,go:()=>{if(roll(p.o)){v.rel+=40;apply({danh:BAL.eff.j7.danhGo_6,sung:3})}else apply({suc:BAL.eff.j7.sucGo_2})}},
 {n:"Chỉ huy cung nhân dập lửa",fx:{danh:3,maid:5}},
 {n:"Ngầm tra kẻ phóng hỏa",fx:{},x:`${word(oSpy())} · thành: biết ai phóng hỏa, nếu là người trong cung: chứng cứ ${balSg(BAL.eff.j7.evN)}`,go:()=>{if(roll(oSpy())){const x=p.a!=null?RV(p.a):null;const n=x?evA(S,x,BAL.eff.j7.evN):0;log(n?`Dấu dầu hỏa dẫn về người của ${x.name}${rvY(p,": nàng ")}: chứng cứ +${n}.`:"Dấu dầu hỏa dẫn ra ngoài cung: chỉ là tai nạn, không ai trong hậu cung đứng sau.")}}}]}});
/* rivals against each other: the player witnesses */
ev("rvframe",()=>liveRivals(false).length>=2,()=>rvPair("rvHarm"),p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(a),
 t:`Ngươi nghe lén sau hòn non bộ: ${a.name}${rvY(p,", vốn ")}, bàn với thái giám giấu đồ ngự dụng vào cung ${b.name} để vu tội trộm.`,o:[
 {n:`Báo cho ${b.name}`,fx:{duc:2},x:`${b.name} thiện cảm +25 · ${a.name} thù -15`,go:()=>{b.rel+=25;a.rel-=15}},
 {n:`Giúp ${a.name} một tay`,fx:{duc:-5},x:`${a.name} thiện cảm +20 · ${b.name} thất thế: ${chanceW(BAL.rk.helpFall)}`,go:()=>{a.rel+=20;S.schemes++;if(roll(BAL.rk.helpFall))fall(b,"bị vu trộm đồ ngự dụng")}},
 {n:"Ghi nhớ làm chứng cứ",fx:{tamco:1},x:`chứng cứ ${a.name} ${balSg(BAL.eff.j7.evGo_8)}`,go:()=>{evStory(a,BAL.eff.j7.evGo_8,`bàn mưu giấu đồ ngự dụng vào cung ${b.name} để vu tội trộm`)}}]}});
ev("rvquarrel",()=>liveRivals(false).length>=2,()=>rvPair("rvFeud"),p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(a),
 t:`Trong Ngự hoa viên, ${a.name} và ${b.name} tranh nhau một chậu mẫu đơn Hoàng thượng ban, lời qua tiếng lại${rvY(p,` (${a.name} `)}${p.y?")":""}.`,o:[
 {n:"Đứng ra can ngăn",fx:{duc:2,danh:1},x:"cả hai thiện cảm +5",go:()=>{a.rel+=5;b.rel+=5}},
 {n:`Đứng về phía ${a.name}`,fx:{},x:`${a.name} thiện cảm +15 · ${b.name} thù -15`,go:()=>{a.rel+=15;b.rel-=15}},
 {n:"Mách Hoàng hậu",fx:{hh:qOn()?BAL.cv.quarrel.hh:0,duc:-BAL.cv.quarrel.duc},x:`thành: ${a.name} và ${b.name} bị răn, ân sủng mỗi người sút ${BAL.cv.quarrel.sung} phần`,go:()=>{a.sung=cl(a.sung-BAL.cv.quarrel.sung,0,100);b.sung=cl(b.sung-BAL.cv.quarrel.sung,0,100)}}]}});
ev("rvmusk",()=>liveRivals(false).length>=2,()=>{const t=rvPair("rvHarm");if(!t)return null;t.o=od(BAL.odb.j7.odO_16+RV(t.a).ev*10+S.danh/5);return t},p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(b),
 t:`${S.maid.name} thì thầm: ${a.name}${rvY(p,", vốn ")}, trộn xạ hương vào túi thơm tặng ${b.name}, mong nàng không bao giờ có con.`,o:[
 {n:`Cảnh báo ${b.name}`,fx:{duc:3},x:`${b.name} thiện cảm +30 · ${a.name} thù -20`,go:()=>{b.rel+=30;a.rel-=20}},
 {n:"Tố lên Hoàng thượng",fx:{},x:`${word(p.o)} · thành: ${a.name} thất thế · hỏng: Danh ${balSg(BAL.eff.j7.danhGo_7)}`,go:()=>{if(roll(p.o))fall(a,"bị tố trộn xạ hương hại phi tần");else apply({danh:BAL.eff.j7.danhGo_7})}},
 {n:"Làm ngơ",fx:{tamco:1,duc:-3}}]}});
ev("rvbribe",()=>liveRivals(false).length>=2,()=>rvPair("rvHarm"),p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pEunCourt("ksp"),
 t:`${a.name}${rvY(p,", vốn ")}, đút lót Kính sự phòng giấu thẻ bài của ${b.name}. Tổng quản thái giám đánh tiếng: ngươi muốn chen một chân không?`,o:[
 {n:"Góp bạc, giấu cả thẻ nàng",fx:{bac:-30},x:"tuần này và tuần sau dễ được thị tẩm",go:()=>{S.tablet=2;b.sung=cl(b.sung-5,0,100)}},
 {n:`Mách ${b.name}`,fx:{},x:`${b.name} thiện cảm +20 · ${a.name} ghen +10`,go:()=>{b.rel+=20;ghenUp(a,10,`bị ngươi mách với ${b.name}`,S)}},
 {n:"Không dính vào",fx:{}}]}});
