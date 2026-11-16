/* ---------- thd_hoc · Thầy giáo trong cung ---------- */
/* BAL.road keys: thd_hoc.vlAge (the vỡ lòng age, jbal2.js). Pupils = children of vỡ lòng age (review road-b3-fix-r1 item 1: a life starts
   with the oldest child at BAL.ps.kidAge[1] = 4 at most and the 14 chapters span only one or two years, so a school-age gate
   (BAL.tc.hienAge = 6) closed the road; the class is the vỡ lòng morning class, road-history pass 2). Beats that need a school-age child
   (court exam before the Lục bộ, horse and bow, attending court) switch on thdHocBig = {n1} at BAL.tc.hienAge or more (vỡ lòng twins).
   The premise ARC67.thd_hoc (.4) is rolled only when a royal child of vỡ lòng age with a living mother exists (ok), and casts that
   mother first, so the road can run .5 on with the same {v}.
   Condition copied from ARC67.thd_hoc .4: {v} = a live consort WITH a live child; from .5 the road needs that child to be of vỡ lòng age
   (castRv67 filter); the road keeps the same {v}; a chapter whose {v} has no child in class any more recasts (told) or cannot run (cast → false).
   Children are REAL children of this life (allKids), never an infant: {n1} = {v}'s child of vỡ lòng age (a son first; the engine carries the
   name in S.st.f14.n1); {n2} = another live royal child of vỡ lòng age (prefers a rival's child, else hers; engine-carried S.st.f14.n2), or ""
   when there is none: then every beat runs its one-pupil wording (the class's other pupils are the unnamed thư đồng, the officials' sons who
   study beside the princes at Thượng thư phòng). Texts on Đông cung / court duty switch on the sex of {n1} (thdHocSon). */
const thdHocAge=()=>BAL.road.thd_hoc.vlAge;
const thdHocIn=k=>!!k&&k.alive&&(k.age||0)>=thdHocAge();
function thdHocKids(){try{return allKids().filter(([k])=>thdHocIn(k))}catch(e){return[]}}
function thdHocKid(nm){try{const p=allKids().find(([k])=>k&&k.name===nm);return p?p[0]:null}catch(e){return null}}
/* {n1} is of school age (BAL.tc.hienAge): the school-age wording; else the vỡ lòng twin */
const thdHocBig=A=>{const k=thdHocKid(A&&A.n1);return !!k&&(k.age||0)>=BAL.tc.hienAge};
const thdHocSon=A=>{const k=thdHocKid(A&&A.n1);return !!k&&k.sex==="m"};
/* {n2} as a token when a second pupil exists, else the given one-pupil wording */
const thdN2=(A,alt)=>A&&A.n2?"{n2}":alt;
const thdHocTwo=A=>!!(A&&A.n2);
function thdHocCast(A){const vf=v=>(v.kids||[]).some(thdHocIn);
 /* the carried mother has no child in class any more: she leaves the road, another mother of a pupil is cast (the engine tells the recast) */
 let gone=null;try{const K=S.st.f14&&S.st.f14.act,v0=K&&K.v!=null?RV(K.v):null;if(v0&&!vf(v0)){gone=v0;delete K.v}}catch(e){}
 if(!rdCast(A,["v"],{v:vf}))return false;const v=rv67(A,"v");if(!v||!vf(v))return false;
 /* told to the player like the engine recast (review road-b3-r1: deleting K.v made rdCast silent) */
 if(gone&&gone.id!==v.id)try{const L=`${gone.name} ${gone.alive?"không còn con theo học":"nay đã khuất"}, người mẹ có con trong lớp nay là ${v.name}.`;(A.rc=A.rc||[]).push(L);log(`<i>${L}</i>`)}catch(e){}
 try{const f=(S.st&&S.st.f14)||{};const L=thdHocKids();const vk=(v.kids||[]).filter(thdHocIn).sort((x,y)=>(y.sex==="m")-(x.sex==="m"));
  const a=f.n1&&vk.some(k=>k.name===f.n1)?f.n1:vk[0].name;
  let b=f.n2&&f.n2!==a&&L.some(([k])=>k.name===f.n2)?f.n2:"";
  if(!b){const o=L.filter(([k])=>k.name!==a);const o2=o.filter(([,m])=>m);const p=o2[0]||o[0];b=p?p[0].name:""}
  A.n1=a;A.n2=b}catch(e){return false}
 return true}
const thdHocOk=()=>thdHocKids().length>0;
/* the premise (.4, j67) is rolled only when a pupil exists for .5: a royal child of vỡ lòng age whose mother lives (review road-b3-fix-r1
   item 1); its {v} is that mother first (else any consort with a live child, as j67) */
if(ARC67.thd_hoc)try{const P=ARC67.thd_hoc;P.ok=()=>thdHocKids().some(([k,m])=>m&&liveRivals(false).includes(m));
 P.cast=function(A){castRv67(A,"v",v=>(v.kids||[]).some(thdHocIn))||castRv67(A,"v",v=>(v.kids||[]).some(k=>k.alive));return true}}catch(e){console.error(e)}

rdDef("thd_hoc",5,{t:"Học trò nhỏ",w:"emp",sj:"hai học trò nhỏ ở Thượng thư phòng",ok:thdHocOk,cast:thdHocCast,
 g:A=>"Theo chỉ của Hoàng thượng, ngươi làm giáo tập buổi sáng nhỏ ở Thượng thư phòng: dạy vỡ lòng các hoàng tự chưa vào học chính; kinh sử vẫn do các sư phó Hàn lâm giảng. "+(thdHocTwo(A)?"Có hai đứa trẻ khiến ngươi mất ngủ: {n1}, con của {v}, sáng dạ mà lười; và {n2}, chăm đến mức các anh em ganh. Dạy được một đứa đã khó; dạy cả hai mà không ai oán còn khó hơn.":"Trong lớp, ngoài mấy thư đồng con nhà quan, chỉ có {n1}, con của {v}, là hoàng tự: sáng dạ mà lười. Dạy một đứa trẻ nên người đã khó; dạy mà mẹ nó không oán còn khó hơn."),
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Học trò trốn học",w:"emp",if:RDW(1),t:"Sau kỳ khảo hạch, Hoàng thượng giao hẳn buổi học vỡ lòng sáng sớm ở Thượng thư phòng cho ngươi. Ngay hôm đầu, {n1} trốn học ra Ngự hoa viên bắt dế.",o:[
  {n:"Ra vườn bắt dế cùng nó",c:{suc:-2},w:{duc:2},f:"gentle",wx:"nó chịu theo ngươi về lớp",lx:"chạy theo trò khắp vườn, hao sức; các thầy khác chê ngươi chiều trò",rt:"Bắt được con dế, {n1} ngoan ngoãn theo ngươi về, tay còn nắm ống tre."},
  {n:"Phạt nó chép bài",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,f:"strict",wx:"cả lớp biết phép",l:{duc:-1},lx:"{v} nghe con bị phạt, kể khắp cung thầy khắt khe, tổn đức",go:(A,ok)=>{if(!ok)rdOan(A,"v",3)},rt:"{n1} chép xong mười trang, mắt đỏ mà không khóc.",rf:"{n1} xé giấy, chạy về mách mẹ."},
  {n:"Cho người báo {v} đến đón con",c:{duc:-2},w:{tamco:1},wx:"không gánh trách một mình",lx:"đứa trẻ giận ngươi mách mẹ, thấy thầy không giữ lời, tổn đức",go:A=>{rdRel(A,"v",2)},rt:"{v} đến, kéo con đi, ngoái lại nhìn ngươi một cái."}]},
 s2:{h:"Đứa trẻ tìm đến cung ngươi",w:"v",if:()=>rdK()===0,t:"Không ai khen to công dạy của ngươi, nhưng {n1} cứ trốn sang cung ngươi đòi nghe kể chuyện. {v} biết, không vui.",o:[
  {n:"Kể chuyện, rồi dắt nó về tận cung mẹ",c:{suc:-2},w:{duc:3},f:"gentle",wx:"đứa trẻ quý ngươi",lx:"kể chuyện rồi dắt bộ đến tận cung mẹ, hao sức; {v} thấy con quấn người khác",go:A=>{rdRel(A,"v",3)},rt:"Đến cửa cung {v}, {n1} còn níu tay áo ngươi."},
  {n:"Không cho nó vào nữa",c:{duc:-2},w:{tamco:1},wx:"tránh điều tiếng",lx:"đóng cửa với một đứa trẻ, tổn đức; đứa trẻ tủi thân",rt:"{n1} đứng ngoài cửa một lúc rồi đi."},
  {n:"Sang thưa với {v}",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"{v} hiểu ý tốt",l:{danh:-1},lx:"{v} cho là ngươi lên mặt, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} gật đầu: “Nó thích ngươi thì cứ để nó học.”",rf:"{v} chỉ nói: “Con ta, ta tự lo.”"}]},
 s3:{h:"Dạy lại một đứa trẻ",w:"emp",if:()=>rdK()<0,t:"Hoàng thượng đã thôi giao việc dạy cho ngươi. Nhưng thầy mới quá nghiêm, {n1} khóc không chịu đến lớp. Ngài bực mình, sai ngươi kèm riêng đứa trẻ ấy — thử thêm một lần.",o:[
  {n:"Nhận lời, dạy ở cung mình",c:{suc:-3},w:{duc:2},f:"gentle",wx:"còn một lần thử",lx:"kèm riêng mỗi tối, hao sức; thất bại lần nữa thì hết",rt:"{n1} ngồi bên bàn ngươi, lần đầu cầm bút mà không khóc."},
  {n:"Xin dạy ngay tại Thượng thư phòng",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"strict",wx:"lấy lại chỗ đứng",l:{sung:-2},lx:"thầy mới ghét ngươi, tâu ngươi giành việc, Hoàng thượng phật ý",rt:"Hoàng thượng chuẩn. Thầy mới đành nhường một góc lớp.",rf:"Ngài bảo: “Dạy được một đứa đã rồi hẵng nói.”"},
  {n:"Từ chối khéo",c:{sung:-2},w:{tamco:1},wx:"khỏi gánh việc khó",lx:"ngài thấy ngươi giận dỗi, phật ý",rt:"Hoàng thượng cau mày, rồi tự giao cho người khác."}]},
 c1:{h:"Bút nghiên bị giấu",w:"emp",if:thdHocTwo,t:"{n2} đọc thuộc cả quyển Tam tự kinh. Các anh em ganh, giấu bút nghiên của nó, và {n1} cũng góp tay.",o:[
  {n:"Phạt cả lớp chép phạt",c:{sung:-1},w:{danh:2},f:"strict",wx:"phép lớp nghiêm",lx:"bọn trẻ đều về mách mẹ, các mẹ kêu lên Hoàng thượng, ân sủng nhạt đi",go:A=>{rdOan(A,"v",2)},rt:"Cả lớp chép bài đến trưa, không ai dám giấu đồ ai nữa."},
  {n:"Cho {n1} và {n2} ngồi chung một bàn",c:{suc:-2},o:()=>40+S.duc/4,w:{duc:3},sc:1,f:"gentle",wx:"hai đứa thân nhau",l:{danh:-1},lx:"hai đứa cãi nhau suốt buổi, người ta bảo thầy không giữ được lớp, tiếng tăm sứt mẻ",rt:"Đến chiều, {n1} đã mượn bút của {n2}.",rf:"Hai đứa giật nhau cái nghiên vỡ đôi."},
  {n:"Làm như không biết",c:{duc:-2},w:{tamco:1},wx:"không động mẹ nào",lx:"làm ngơ cho trẻ bị bắt nạt, tổn đức; {n2} tủi thân",rt:"{n2} lặng lẽ viết bằng que tre."}]},
 /* one-pupil variant of c1 (no second royal child of school age) */
 c3:{h:"Bút nghiên bị giấu",w:"emp",if:A=>!thdHocTwo(A),t:"{n1} giấu bút nghiên của chính mình dưới gầm bàn để khỏi phải viết, rồi bảo có thư đồng lấy mất. Mấy thư đồng con nhà quan cúi đầu, không đứa nào dám cãi một hoàng tự.",o:[
  {n:"Bắt nó tự tìm, chép phạt",c:{sung:-1},w:{danh:2},f:"strict",wx:"cả lớp biết phép",lx:"nó về mách mẹ, mẹ nó kêu lên Hoàng thượng, ân sủng nhạt đi",go:A=>{rdOan(A,"v",2)},rt:"{n1} lôi bút nghiên ra từ gầm bàn, chép bài đến trưa."},
  {n:"Ngồi xuống tìm cùng nó",c:{suc:-2},o:()=>40+S.duc/4,w:{duc:3},sc:1,f:"gentle",wx:"nó tự nhận",l:{danh:-1},lx:"nó đổ cho thư đồng đến cùng, người ta bảo thầy không giữ được lớp, tiếng tăm sứt mẻ",rt:"Tìm đến gầm bàn, {n1} đỏ mặt nhận là mình giấu.",rf:"{n1} vẫn đổ cho thư đồng, thằng bé bị gọi về nhà."},
  {n:"Làm như không biết",c:{duc:-2},w:{tamco:1},wx:"không động mẹ nó",lx:"để một thư đồng chịu tiếng oan, tổn đức",rt:"Thư đồng bị mắng thay, {n1} ngồi im cả buổi."}]},
 c2:{h:"Điểm tâm của {v}",w:"v",need:["v"],t:"{v} gửi sang một hộp điểm tâm và một lời nhắn: “Con ta phải đứng đầu lớp. Ngươi biết phải làm sao.”",o:[
  {n:"Nhận hộp, hứa kèm thêm",c:{suc:-3},w:{bac:20},wx:"{v} hài lòng",lx:"kèm thêm mỗi chiều, hao sức; thành ra thiên vị",go:A=>{rdRel(A,"v",6)},rt:"{v} gửi thêm một xấp lụa."},
  {n:"Trả hộp, nhắn: đứng đầu phải tự học",c:{danh:-1},w:{duc:2},wx:"giữ công bằng",lx:"trả lễ, {v} phật ý, kể ngươi kiêu, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",5)},rt:"Hộp điểm tâm về nguyên. {v} ném nó cho cung nữ."},
  {n:"Nhận hộp, chia cho cả lớp",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"cả lớp vui, {v} không bắt bẻ được",l:{danh:-1},lx:"{v} thấy bị coi thường, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?2:-4)},rt:"Bọn trẻ cảm ơn {v} đồng thanh, nàng không nói được gì.",rf:"{v} biết chuyện, giận đỏ mặt."}]},
 t1:{h:"Vết roi trên tay",w:"v",t:"Ngươi thấy lòng bàn tay {n1} có vết roi. Nó nói nhỏ: “Không đứng đầu thì mẹ đánh.”",o:[
  {n:"Sang khuyên {v}",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"đứa trẻ bớt đòn",l:{danh:-2},lx:"{v} cho là ngươi xen chuyện nhà, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-8)},rt:"{v} cúi đầu: “Ta cũng chỉ sợ nó thua người.”",rf:"{v} đóng cửa: “Ngươi dạy chữ, đừng dạy ta.”"},
  {n:"Thoa thuốc, không nói gì",c:{bac:-10},w:{duc:2},f:"gentle",wx:"đứa trẻ tin ngươi",lx:"tốn bạc mua thuốc; vết roi vẫn còn đó",rt:"{n1} để yên cho ngươi thoa thuốc, rồi ngủ gục trên bàn."},
  {n:"Tâu Hoàng thượng",c:{},o:()=>35+S.sung/4,w:{sung:2},sc:1,wx:"Hoàng thượng để ý đứa trẻ",l:{sung:-2},lx:"{v} khóc với Hoàng thượng rằng ngươi bới chuyện, ngài phật ý",go:A=>{rdOan(A,"v",8)},rt:"Hoàng thượng dặn {v}: “Con của trẫm, nàng đừng đánh.”",rf:"Ngài bảo chuyện dạy con là của mẹ nó."}]},
 x1:{h:"Buổi bình văn đầu tháng",w:"emp",t:"Đầu tháng, Hoàng thượng ghé Thượng thư phòng nghe bọn trẻ đọc bài. {v} đứng sau ngài.",o:[
  {n:"Để {n1} đọc bài nó thích",c:{suc:-3},o:A=>45+(A.f.gentle?15:0),e:["win","lose"],rt:"{n1} đọc bài thơ về con dế, giọng vang. Hoàng thượng cười to.",rf:"{n1} quên giữa chừng, đứng khóc."},
  /* the resentment the hint names is applied (review road-b3-r1 item 3) */
  {n:"Để {n2} đọc trước, {n1} đọc sau",if:thdHocTwo,c:{},o:A=>30+(A.f.strict?10:0)+S.danh/6,e:["win","mid"],lx:"{v} thấy con bị xếp sau, thêm oán",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"{n2} đọc hay, {n1} không chịu thua, đọc càng hay.",rf:"{n2} đọc hay, {n1} lí nhí."},
  {n:"Để các thư đồng đọc trước, {n1} đọc sau",if:A=>!thdHocTwo(A),c:{},o:A=>30+(A.f.strict?10:0)+S.danh/6,e:["win","mid"],lx:"{v} thấy con bị xếp sau mấy đứa con quan, thêm oán",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"Các thư đồng đọc trơn tru, {n1} không chịu thua, đọc càng hay.",rf:"Các thư đồng đọc trơn tru, {n1} lí nhí."},
  {n:"Xin ngài nghe cả lớp đọc chung",c:{danh:-2},w:{duc:2},e:"mid",lx:"không đứa nào nổi bật, người ta bảo thầy giấu trò, tiếng tăm sứt mẻ",rt:"Cả lớp đồng thanh. Hoàng thượng gật đầu rồi đi."}]}},
 E:{win:{k:1,tag:"Đứa trẻ chịu học",w:"v",t:"{n1} chịu ngồi yên học chữ. {v} không nói ra, nhưng gửi sang cung ngươi một chậu lan.",fx:{danh:4,duc:2},go:A=>{rdRel(A,"v",6);return""}},
  mid:{k:0,tag:"Lớp học còn lộn xộn",t:"Bọn trẻ vẫn nghịch, nhưng đã biết sợ thầy. Chưa ai khen, chưa ai trách.",fx:{duc:1}},
  lose:{k:-1,tag:"{n1} bẽ mặt trước cha",t:"{n1} khóc trước mặt Hoàng thượng. {v} dắt con về, không chào ngươi.",fx:{sung:-3,danh:-2},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("thd_hoc",6,{t:"Mẹ của học trò",w:"v",sj:"lòng nghi của {v}",ok:thdHocOk,cast:thdHocCast,
 g:A=>"{v} tin rằng ngươi thiên vị "+thdN2(A,"mấy thư đồng con nhà quan")+". Một người mẹ trong cung không chỉ lo con học chữ: nàng lo cho con một chỗ đứng. Và nàng có thể làm nhiều điều hơn một lời than.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{v} ngồi dự giờ",w:"v",if:RDW(1),t:A=>"{n1} chịu học, nhưng điều đầu tiên nó khoe với mẹ lại là: “Thầy khen "+thdN2(A,"thư đồng")+" viết đẹp hơn con.” Hôm sau, {v} đến Thượng thư phòng ngồi xem cả buổi.",o:[
  {n:"Dạy như mọi ngày",c:{danh:-2},w:{duc:2},wx:"không giả dối",lx:"{v} soi từng lời khen rồi kể ra ngoài, tiếng tăm sứt mẻ",rt:A=>"Ngươi khen "+thdN2(A,"thư đồng")+" một lần, {n1} hai lần. {v} đếm cả."},
  {n:"Mời {v} ra đề cho bọn trẻ",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} thấy mình được trọng",l:{danh:-1},lx:A=>"đề của nàng làm khó "+thdN2(A,"mấy thư đồng")+", người ta bảo thầy để mẹ trò dạy thay, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-2)},rt:"{v} ra đề, {n1} làm được. Nàng mỉm cười lần đầu.",rf:A=>"{v} ra đề hiểm, "+thdN2(A,"một thư đồng")+" làm sai, cả lớp cười."},
  {n:"Khen {n1} nhiều hơn hôm ấy",c:{duc:-2},w:{sung:1},wx:"{v} vui",lx:A=>"khen lệch lòng mình, tổn đức; "+thdN2(A,"mấy thư đồng")+" buồn",go:A=>{rdRel(A,"v",4)},rt:"{v} về, bảo cung nữ: “Thầy ấy cũng biết điều.”"}]},
 s2:{h:"Cung nữ đứng ngoài cửa lớp",w:"v",if:RDW(0),t:"Sau buổi bình văn, {v} sai một cung nữ đứng ngoài cửa Thượng thư phòng, ghi lại từng lời ngươi nói với con nàng.",o:[
  {n:"Mời cung nữ vào ngồi nghe cho rõ",c:{danh:-2},w:{duc:2},wx:"không có gì phải giấu",lx:"lớp có thêm một tai mắt, người ta bảo thầy sợ mẹ trò, tiếng tăm sứt mẻ",rt:"Cung nữ ngồi ghi, chữ nàng ta viết sai be bét."},
  {n:"Đuổi cung nữ đi",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"giữ phép lớp",l:{danh:-2},lx:"{v} có cớ nói ngươi giấu, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",5)},rt:"Cung nữ lui. {v} không dám làm to.",rf:()=>qOn()?"{v} tâu với Hoàng hậu là ngươi có điều mờ ám.":"{v} khóc với Hoàng thượng là ngươi có điều mờ ám."},
  {n:"Nói chuyện thẳng với {v}",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"hai bên hiểu nhau hơn",l:{sung:-1},lx:"{v} càng nghi, khóc với Hoàng thượng, ân sủng nhạt đi",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} thở dài: “Ta chỉ có một đứa con.”",rf:"{v} nói: “Ngươi dạy con ai thì lo con người ấy.”"}]},
 c1:{h:"Lễ tạ thầy",w:"v",need:["v"],t:"{v} gửi sang một lễ tạ thầy nặng tay: bạc, ngọc, và một lời: “Từ nay mong thầy để tâm đến {n1} hơn.”",o:[
  {n:"Nhận lễ",c:{duc:-3},w:{bac:60},wx:"{v} yên lòng",lx:"nhận lễ là mắc nợ, tổn đức",go:A=>{rdRel(A,"v",6)},rt:"{v} cho là đã mua được thầy."},
  {n:"Nhận một phần, trả phần còn lại",c:{},o:()=>40+S.tamco/3,w:{bac:20,duc:1},sc:1,wx:"giữ lễ mà không mắc nợ",l:{danh:-1},lx:"{v} không hiểu ý, kể ngươi chê lễ, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?3:-3)},rt:"{v} hiểu: thầy nhận lòng, không nhận giá.",rf:"{v} cho là ngươi chê lễ mỏng."},
  {n:"Trả hết",c:{danh:-1},w:{duc:3},wx:"tay sạch",lx:"trả hết, {v} thấy bị khinh, kể khắp cung, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",6)},rt:"Lễ về nguyên. {v} lặng thinh."}]},
 c2:{h:"Lời gièm ở buổi thỉnh an",w:"hh",need:["hh","v"],t:"Ở buổi thỉnh an, {v} than với Hoàng hậu: “Thầy dạy chữ mà có lòng riêng, con của các tỷ muội chịu thiệt.”",o:[
  {n:"Xin Hoàng hậu cho người đến xem lớp",need:["hh"],c:{suc:-2},o:()=>40+S.hh/4,w:{danh:2},sc:1,wx:"có người làm chứng ngươi công bằng",l:{hh:-2},lx:"Hoàng hậu thêm việc, phật lòng",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Ma ma của Trung cung xem ba buổi, về thưa: thầy công bằng.",rf:"Hoàng hậu bảo: “Việc nhỏ, tự lo.”"},
  {n:"Nhận lời trách, hứa để tâm",c:{danh:-2},w:{hh:2},wx:"Hoàng hậu hài lòng",lx:"nhận lời trách như nhận mình thiên vị, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",3)},rt:"Hoàng hậu gật đầu cho qua."},
  {n:"Đáp: thầy chỉ có một lòng là dạy",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,wx:"cả điện nể",l:{hh:-2},lx:"thành ra cãi nhau trước Hoàng hậu, Trung cung phật lòng",go:A=>{rdOan(A,"v",5)},rt:"Không ai đáp lại được câu ấy.",rf:"Hoàng hậu phạt cả hai im lặng."}]},
 t1:{h:"Đứa trẻ hỏi",w:"v",t:"{n1} kéo áo ngươi: “Thầy ơi, mẹ con bảo thầy ghét con. Có thật không?”",o:[
  {n:"Ôm nó, nói thầy thương nó",c:{danh:-2},w:{duc:2},f:"gentle",wx:"đứa trẻ yên lòng",lx:"nó kể lại với mẹ, mẹ nó càng ghen, đồn thầy dụ trò, tiếng tăm sứt mẻ",rt:A=>"{n1} cười, chạy đi khoe với "+thdN2(A,"thư đồng")+"."},
  {n:"Nói: thầy thương trò nào chăm",c:{sung:-2},w:{danh:1},f:"strict",wx:"đứa trẻ có mục tiêu",lx:"nó thấy mình chưa được thương, kể với phụ hoàng, ngài phật ý",rt:"{n1} ngồi xuống, mở sách ra."},
  {n:"Bảo nó hỏi mẹ vì sao nghĩ vậy",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} phải tự nghĩ lại",l:{danh:-1},lx:"{v} cho là ngươi xúi con, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?5:-5)},rt:"Tối ấy {v} ngồi rất lâu bên giường con.",rf:"{v} cho là ngươi dạy con cãi mẹ."}]},
 x1:{h:"Gặp nhau ở Ngự hoa viên",w:"v",t:"Chiều ấy, {v} chặn ngươi ở Ngự hoa viên, hai đứa trẻ đứng sau lưng hai người. “Hôm nay ngươi nói cho rõ: con ta là gì trong mắt ngươi?”",o:[
  {n:"Mời {v} cùng dạy một buổi",c:{suc:-4},o:A=>42+S.duc/5,e:["win","lose"],rt:"{v} ngồi cạnh con, cùng đọc một trang sách. Lần đầu nàng thấy con mình học giỏi đến thế.",rf:"{v} thấy bị đem ra làm trò cười trước hai đứa trẻ."},
  {n:"Cử {n1} làm trưởng lớp",c:{danh:-2},o:A=>36+(A.f.gentle?10:0)+S.tamco/6,e:["win","mid"],rt:"{v} hài lòng; {n1} lần đầu biết giữ phép cho các em.",rf:A=>thdHocTwo(A)?"{v} nhận, nhưng {n2} và các mẹ khác không vui.":"{v} nhận, nhưng các mẹ khác không vui."},
  /* the resentment the hint names is applied (review road-b3-r1 item 3) */
  {n:"Thưa: trong lớp, đứa nào cũng như nhau",c:{danh:-2},w:{duc:3},e:"mid",lx:"{v} chưa nguôi, thêm oán; các mẹ bảo thầy né, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",4)},rt:"{v} nhìn ngươi rất lâu, rồi dắt con đi."}]}},
 E:{win:{k:1,tag:"{v} nguôi lòng",w:"v",t:"{v} thôi sai người rình lớp. Nàng không nói lời cảm ơn, nhưng bảo con: “Nghe lời thầy.”",fx:{danh:4,duc:3},go:A=>{rdRel(A,"v",10);return""}},
  mid:{k:0,tag:"Nghi ngờ còn đó",t:"{v} không làm gì thêm, nhưng cũng không tin ngươi hơn.",fx:{duc:1}},
  lose:{k:-1,tag:"{v} coi ngươi là kẻ thù",t:"{v} bỏ về, từ đó gặp ngươi là quay mặt. Nàng bắt đầu kể với các cung khác rằng thầy dạy chữ có lòng riêng.",fx:{danh:-3},go:A=>{rdOan(A,"v",10);return""}}}});

rdDef("thd_hoc",7,{t:"Kỳ khảo hạch",w:"emp",sj:"kỳ khảo hạch các hoàng tự",ok:thdHocOk,cast:thdHocCast,
 g:A=>(thdHocBig(A)?"Cuối xuân, Hoàng thượng khảo hạch các hoàng tự trước triều thần.":"Cuối xuân, Hoàng thượng ngự đến Thượng thư phòng khảo bài vỡ lòng của các hoàng tự nhỏ, có mấy vị Đại học sĩ ngồi nghe.")+" Ai cũng biết: đứa nào đối đáp giỏi, đứa ấy được nhìn như người gánh được việc lớn. Mẹ nào cũng muốn con mình đứng đầu; thầy thì chỉ có một.",
 p:[["s1","s2"],["c1","c2"],["t1","t2"],["x1"]],
 B:{s1:{h:"Chiếu khảo hạch",w:"emp",if:RDW(1),t:A=>"Hoàng thượng báo trước ba tháng: kỳ khảo năm nay "+(thdHocBig(A)?"có cả Lục bộ Thượng thư ngồi nghe":"có Đại học sĩ ngồi nghe")+". Ngài nói riêng với ngươi: “Trẫm muốn xem đứa nào biết nghĩ, không phải đứa nào thuộc lòng.”",o:[
  {n:"Dạy bọn trẻ tự đặt câu hỏi",c:{suc:-3},w:{duc:2},f:"think",wx:"bọn trẻ biết nghĩ",lx:"dạy chậm từng câu, tốn công, hao sức",rt:"Ba tháng, {n1} hỏi ngươi nhiều câu hơn cả năm trước."},
  {n:"Ra đề luyện mỗi ngày",c:{sung:-2},w:{danh:2},f:"drill",wx:"bài nào cũng thuộc",lx:"bọn trẻ mệt, mách phụ hoàng, ngài phật ý",rt:"Bàn của bọn trẻ cao chồng giấy."},
  {n:"Hỏi Hoàng thượng ngài muốn nghe gì",c:{},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"biết ý vua",l:{sung:-2},lx:"ngài thấy ngươi dò đề, Hoàng thượng phật ý",rt:"Ngài cười: “Nghe chúng nói thật.”",rf:"Ngài nhíu mày: “Thầy mà cũng đi hỏi đề?”"}]},
 s2:{h:"Các mẹ đến tận lớp",w:"v",if:RDW(0),t:"Tin khảo hạch vừa ra, các mẹ thay nhau đến lớp. {v} đến sớm nhất, mang theo một thầy dạy riêng của nhà ngoại.",o:[
  {n:"Cho thầy riêng của {v} kèm thêm buổi chiều",c:{duc:-2},w:{tamco:1},wx:"{v} yên lòng",lx:"để thầy ngoài chen vào lớp, trò rối, tổn đức",go:A=>{rdRel(A,"v",5)},rt:"Chiều chiều {n1} học thêm, sáng ra ngủ gật."},
  {n:"Từ chối: lớp chỉ một thầy",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"giữ phép Thượng thư phòng",l:{danh:-2},lx:"{v} giận, kể khắp cung thầy độc đoán, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",5)},rt:"{v} đưa thầy riêng về.",rf:"{v} xin Hoàng thượng, ngài cho thầy riêng ở lại."},
  {n:"Hẹn các mẹ một buổi nói chung",c:{suc:-2},w:{duc:2},wx:"mọi mẹ nghe cùng một lời",lx:"nói chuyện với các mẹ đến khàn giọng, hao sức; mẹ nào cũng muốn hơn mẹ khác",rt:"Các mẹ ngồi nghe, ai cũng gật, ai cũng nghi."}]},
 c1:{h:"Đề khảo bị bán",w:"eun",t:"Một thái giám hầu ngự thư phòng lén tìm ngươi: hắn có bản đề khảo năm nay, giá năm mươi lạng, phải trả trước khi ngự thư phòng niêm đề.",o:[
  {n:"Mua đề",c:{bac:-50,duc:-4},o:()=>50+S.mat*3,w:{tamco:2},sc:1,f:"cheat",wx:"biết trước đề",l:{sung:-6},lx:"mua đề là tội lớn, lộ ra thì Hoàng thượng ghét bỏ",rt:"Bản đề thật. Ngươi biết bọn trẻ sẽ bị hỏi gì.",rf:"Bản đề giả, và thái giám đi kể khắp nơi."},
  {n:"Báo Hoàng thượng",c:{suc:-2},o:()=>40+S.sung/4,w:{sung:3},sc:1,wx:"ngài tin ngươi",l:{sung:-2},lx:"có người cho là ngươi cũng đã xem, Hoàng thượng nghi, phật ý",rt:"Hoàng thượng đổi đề, phạt thái giám.",rf:"Ngài hỏi: “Sao hắn lại tìm đến nàng?”"},
  {n:"Đuổi hắn đi, không nói ai",c:{danh:-2},w:{duc:2},wx:"tay sạch",lx:"hắn đem đề bán cho mẹ khác, ngươi mang tiếng biết mà không báo, tiếng tăm sứt mẻ",rt:"Thái giám lủi đi. Đêm ấy có tiếng gõ cửa cung {v}."}]},
 c2:{h:"{n1} ngã bệnh",w:"v",need:["v"],t:"{v} bắt {n1} học đến canh ba. Đứa trẻ sốt, mà nàng không cho nghỉ một buổi nào trước ngày khảo.",o:[
  {n:"Xin {v} cho con nghỉ",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"đứa trẻ được nghỉ",l:{danh:-2},lx:"{v} cho là ngươi ngáng đường con nàng, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} để con ngủ hai ngày. {n1} dậy, đòi đến lớp.",rf:"{v} đáp: “Ngươi muốn con ta thua?”"},
  {n:"Mời thái y đến xem",c:{bac:-20},w:{duc:2},wx:"thái y ra lệnh nghỉ",lx:"tốn bạc mời thái y; {v} biết ai mời",go:A=>{rdOan(A,"v",2)},rt:"Thái y kê đơn, dặn nghỉ năm ngày. {v} không cãi được thái y."},
  {n:"Dạy nhẹ đi trong lớp",c:{duc:-2},w:{tamco:1},f:"think",wx:"đứa trẻ thở được ở lớp",lx:"dạy nhẹ cho riêng một đứa, tổn đức; ở nhà nó vẫn bị ép",rt:"Ở lớp, ngươi cho {n1} vẽ tranh thay chép bài."}]},
 t1:{h:"{n2} sẽ vượt mặt",w:"emp",if:thdHocTwo,t:"{n2} giỏi hơn {n1} thấy rõ. Ngày khảo, nếu {n2} đứng đầu, {v} sẽ cho là ngươi cố ý.",o:[
  {n:"Để {n2} cứ tỏa sáng",c:{sung:-1},w:{danh:2},f:"fair",wx:"công bằng",lx:"các mẹ kêu thầy để một đứa lấn hết, Hoàng thượng phật ý; {v} sẽ oán",go:A=>{rdOan(A,"v",4)},rt:"Ngươi giao {n2} bài khó nhất."},
  {n:"Bảo {n2} nhường một chút",c:{duc:-3},w:{tamco:1},wx:"{v} không bị bẽ mặt",lx:"dạy trò giấu tài, tổn đức",go:A=>{rdRel(A,"v",4)},rt:"{n2} gật đầu, mắt buồn."},
  {n:"Mỗi đứa giữ một môn",c:{suc:-2},o:()=>45+S.tai/5,w:{duc:2},sc:1,f:"fair",wx:"đứa nào cũng có chỗ đứng",l:{danh:-1},lx:"chia môn mà không khéo thì lộ, tiếng tăm sứt mẻ",rt:A=>thdHocSon(A)&&thdHocBig(A)?"{n2} giữ phần kinh nghĩa, {n1} giữ phần cưỡi ngựa bắn cung.":thdHocBig(A)?"{n2} giữ phần kinh nghĩa, {n1} giữ phần thư pháp.":"{n2} giữ phần đọc bài, {n1} giữ phần đọc thơ.",rf:"Bọn trẻ tranh nhau môn của đứa khác."}]},
 /* one-pupil variant of t1: {n1} is the only royal child of school age in the khảo */
 t2:{h:"Một mình trước điện",w:"emp",if:A=>!thdHocTwo(A),t:"{n1} là hoàng tự duy nhất trong lớp đủ tuổi vào khảo. Cả điện sẽ chỉ nhìn một mình nó, và nếu nó vấp, {v} sẽ đổ mọi lời chê lên thầy.",o:[
  {n:"Kèm riêng nó mỗi tối",c:{suc:-3},w:{duc:2},wx:"nó bớt sợ",lx:"kèm đến khuya, hao sức; mấy thư đồng bị bỏ lại sau",rt:"Đến tối thứ mười, {n1} tự đứng đọc trước gương."},
  {n:"Khuyên {v} đừng hứa gì với nó",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"đứa trẻ thôi sợ thua",l:{danh:-1},lx:"{v} cho là ngươi xen chuyện nhà, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?4:-4)},rt:"{v} gật đầu: “Thi được đến đâu, ta nhận đến đó.”",rf:"{v} đáp: “Con ta phải đứng đầu.”"},
  {n:"Để nó tự lo",c:{duc:-2},w:{tamco:1},wx:"nó học cách tự đứng",lx:"bỏ một đứa trẻ một mình với nỗi sợ, tổn đức",rt:"{n1} ôm sách ngồi một mình đến khuya."}]},
 x1:{h:"Ngày khảo hạch",w:"emp",t:A=>thdHocBig(A)?"Điện Văn Hoa. Lục bộ Thượng thư ngồi hai bên, Hoàng thượng ngồi trên, bọn trẻ quỳ thành hàng. Phi tần không được bước vào điện; ngươi chỉ kịp dặn bọn trẻ một lời ở cửa Thượng thư phòng, rồi ngồi chờ thái giám chạy tin.":"Thượng thư phòng. Hoàng thượng ngồi trên, mấy vị Đại học sĩ ngồi hai bên, bọn trẻ đứng thành hàng, đứa nhỏ nhất còn phải kiễng chân. Ngươi đứng cuối phòng, chỉ kịp dặn bọn trẻ một lời trước khi ngài đến.",o:[
  {n:"Để bọn trẻ đối đáp tự do",c:{suc:-4},o:A=>45+(A.f.think?15:0)+S.tai/6,e:["win","lose"],rt:A=>thdHocBig(A)?"{n1} trả lời một câu về đê điều làm cả triều ngẩn người. Hoàng thượng gõ bàn khen.":"{n1} giảng chữ “Hiếu” bằng chuyện mẹ nó ốm, cả phòng lặng đi. Hoàng thượng gõ bàn khen.",rf:A=>thdHocBig(A)?"Bọn trẻ nói lan man, một Thượng thư bật cười.":"Bọn trẻ nói lan man, một vị Đại học sĩ bật cười."},
  {n:"Cho bọn trẻ đọc bài đã luyện",c:{suc:-4},o:A=>40+(A.f.drill?15:0)+(A.f.cheat?10:0),e:["win","mid"],rt:A=>"Không đứa nào sai một chữ. "+(thdHocBig(A)?"Triều thần":"Các vị Đại học sĩ")+" gật gù.",rf:"Thuộc làu mà không đứa nào nói được ý mình."},
  {n:"Xin Hoàng thượng chấm cả lớp như một",c:{danh:-2},w:{duc:3},e:"mid",lx:"không đứa nào được khen riêng, các mẹ bảo thầy né, tiếng tăm sứt mẻ",rt:"Hoàng thượng ban cả lớp mỗi đứa một cây bút."}]}},
 E:{win:{k:1,tag:"Cả lớp đối đáp lưu loát",w:"emp",t:A=>(thdHocBig(A)?"Triều thần ra về bàn tán về Thượng thư phòng. {n1} được Hoàng thượng xoa đầu trước điện.":"Các vị Đại học sĩ ra về bàn tán về lớp vỡ lòng. {n1} được Hoàng thượng xoa đầu trước mặt cả lớp.")+" Tối ấy {v} sang Thượng thư phòng, lần đầu cúi chào ngươi.",fx:{danh:6,sung:3},go:A=>{rdRel(A,"v",8);return""}},
  mid:{k:0,tag:"Khảo hạch qua êm",t:"Không đứa nào nổi bật, không đứa nào hỏng. Hoàng thượng gật đầu, rồi quên.",fx:{danh:1}},
  lose:{k:-1,tag:"Khảo hạch rối loạn",t:A=>(thdHocBig(A)?"Một Thượng thư bật cười giữa điện.":"Một vị Đại học sĩ bật cười giữa lớp.")+" {v} đổ lỗi cho ngươi, và lần này các mẹ khác cũng gật đầu theo.",fx:{danh:-4,sung:-2},go:A=>{rdOan(A,"v",8);return""}}}});

rdDef("thd_hoc",8,{t:"Đứa trẻ bị phạt",w:"v",sj:"đứa trẻ bị phạt trong giờ ngươi dạy",ok:thdHocOk,cast:thdHocCast,
 g:"Một đứa trẻ bị phạt trong giờ ngươi dạy. Ở Thượng thư phòng, phép phạt của thầy là phép; ra khỏi cửa lớp, phép phạt ấy là chuyện của mẹ nó.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đứa trẻ sinh kiêu",w:"v",if:RDW(1),t:A=>"Được khen trước điện, {n1} sinh kiêu. Giữa lớp, nó xé vở của "+thdN2(A,"một thư đồng")+", cười: “Phụ hoàng khen ta, không khen ngươi.”",o:[
  {n:"Bắt nó xin lỗi trước lớp",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,f:"strict",wx:"phép lớp còn",l:{duc:-1},lx:"nó thấy bị làm nhục, tổn đức",rt:"{n1} lí nhí xin lỗi, mặt đỏ tía.",rf:"{n1} chạy ra khỏi lớp."},
  {n:"Gọi riêng nó ra nói chuyện",c:{suc:-2},w:{duc:2},f:"gentle",wx:"nó hiểu lỗi",lx:A=>"ngồi nói với trò cả buổi, hao sức; "+thdN2(A,"thư đồng")+" thấy thầy bênh {n1}",rt:"Ngồi ngoài hiên, {n1} khóc: “Mẹ bảo con phải hơn hết mọi người.”"},
  {n:"Cho {n2} tự xử",if:thdHocTwo,c:{duc:-2},w:{tamco:1},wx:"{n2} học cách tự đứng",lx:"để trẻ tự xử, hai đứa đánh nhau, tổn đức",rt:"{n2} lặng lẽ dán lại vở, rồi xé đôi tờ bài của {n1}."},
  {n:"Để thư đồng tự xử",if:A=>!thdHocTwo(A),c:{duc:-2},w:{tamco:1},wx:"thằng bé học cách tự đứng",lx:"để một thư đồng tự đối mặt với hoàng tự, tổn đức",rt:"Thư đồng lặng lẽ dán lại vở, không dám nhìn {n1}."}]},
 s2:{h:"Đứa trẻ bị chế giễu",w:"v",if:RDW(0),t:"Sau kỳ khảo, {n1} bị anh em chế giễu. Nó lao vào đánh một hoàng tự lớn hơn, cả hai sứt đầu ngay trong giờ ngươi dạy.",o:[
  {n:"Can ra, băng bó cho cả hai",c:{bac:-10},w:{duc:2},wx:"không đứa nào nặng thêm",lx:"tốn bạc thuốc men; chuyện vẫn lan ra",rt:"Hai đứa ngồi hai đầu lớp, mắt còn tóe lửa."},
  {n:"Phạt cả hai đứng góc lớp",c:{sung:-1},w:{danh:2},f:"strict",wx:"giữ phép",lx:"hai mẹ đều giận, kêu lên Hoàng thượng, ân sủng nhạt đi",go:A=>{rdOan(A,"v",3)},rt:"Hai đứa đứng đến trưa, không đứa nào chịu khóc."},
  {n:"Hỏi rõ ai gây trước",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"biết đầu đuôi",l:{danh:-1},lx:"bọn trẻ bao che nhau, người ta bảo thầy tra trò như tra tội, tiếng tăm sứt mẻ",rt:"Hoàng tự lớn chọc trước: “Con của {v} dốt.”",rf:"Không đứa nào chịu nói."}]},
 c1:{h:"Phép của Thượng thư phòng",w:"emp",t:"Phép cũ của Thượng thư phòng: không ai được đánh hoàng tự; trò phạm lỗi thì quỳ chép sách, mười lượt. Thầy không phạt thì thầy mang lỗi.",o:[
  {n:"Bắt quỳ chép đủ mười lượt",c:{sung:-1},w:{danh:3},f:"strict",wx:"giữ phép như thầy đồ",lx:"đứa trẻ quỳ đến tê chân, Hoàng thượng xót con, ân sủng nhạt đi; {v} thêm oán",go:A=>{rdOan(A,"v",6)},rt:"Quỳ đến lượt cuối, {n1} cắn môi không kêu. Ngươi đau hơn nó."},
  {n:"Cho ngồi chép ba lượt",c:{},o:()=>45+S.tamco/4,w:{duc:2},sc:1,wx:"giữ phép mà nương tay",l:{danh:-2},lx:"bị nói là sợ mẹ trò, tiếng tăm sứt mẻ",rt:"Ba lượt chép, {n1} hiểu thầy nương tay.",rf:"Có người tâu thầy không giữ phép."},
  {n:"Ngồi kèm trò chép bài",c:{suc:-2},w:{duc:3},f:"gentle",wx:"đứa trẻ khỏi phải quỳ",lx:"ngồi kèm trò chép bài đến tối, hao sức; không đúng phép cũ",rt:"{n1} chép một trăm lần chữ “Nhẫn”, đến chữ cuối viết đẹp nhất."}]},
 c2:{h:"{v} xông vào lớp",w:"v",need:["v"],t:"{v} xông vào Thượng thư phòng, kéo con ra sau lưng: “Ai cho ngươi động vào con ta?”",o:[
  {n:"Quỳ xuống thưa rõ đầu đuôi",c:{danh:-2},o:()=>40+S.duc/4,w:{duc:3},sc:1,wx:"{v} nghe được lẽ phải",lx:"thầy quỳ trước mẹ trò, mất mặt",go:(A,ok)=>{rdRel(A,"v",ok?8:-4)},rt:"{v} nghe xong, buông tay con.",rf:"{v} không nghe, dắt con đi."},
  {n:"Đứng thẳng: đây là lớp, không phải cung nàng",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,wx:"giữ uy thầy",l:{danh:-2},lx:"{v} thấy bị khinh trước con, kể khắp cung, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",8)},rt:"{v} lùi ra cửa, không nói được lời nào.",rf:"{v} hét lên trước mặt cả lớp."},
  {n:"Để {n1} tự nói với mẹ",c:{duc:-2},w:{tamco:2},wx:"đứa trẻ nhận lỗi",lx:"đặt đứa trẻ vào giữa, tổn đức",go:A=>{rdRel(A,"v",2)},rt:"{n1} níu áo mẹ: “Con sai trước.”"}]},
 t1:{h:"Đứa trẻ sốt đêm",w:"doc",t:"Đêm ấy {n1} lên cơn sốt. {v} cho là vì bị phạt. Thái y viện chưa ai dám kết luận.",o:[
  {n:"Sang thức trông nó",c:{suc:-4},w:{duc:4},wx:"đứa trẻ nắm tay thầy",lx:"thức trông trò cả đêm, kiệt sức",go:A=>{rdRel(A,"v",6)},rt:"Gần sáng, {n1} hạ sốt, mở mắt gọi: “Thầy.”"},
  {n:"Mời thái y giỏi nhất xem bệnh",c:{bac:-30},o:()=>50+S.mat*3,w:{danh:2},sc:1,wx:"thái y nói không phải do bị phạt",l:{danh:-2},lx:"thái y nói mập mờ, người ta bảo ngươi mời thái y để chạy tội, tiếng tăm sứt mẻ",rt:"Thái y nói: trẻ bị cảm từ ba hôm trước.",rf:"Thái y chỉ nói: “Trẻ con yếu.”"},
  {n:"Ở yên trong cung mình",c:{duc:-2},w:{tamco:1},wx:"không cho {v} cớ",lx:"người ta nói thầy vô tình, tổn đức",rt:"Ngươi chỉ gửi sang một bát cháo."}]},
 x1:{h:"Ai chịu lỗi",w:"emp",t:"Chuyện đến tai Hoàng thượng. Ngài cho gọi ngươi và {v}: “Con trẫm bị phạt quỳ trong lớp, về cung thì sốt. Lỗi ở ai?”",o:[
  {n:"Thầy chịu lỗi thay trò",c:{suc:-4},o:A=>40+(A.f.gentle?10:0)+S.duc/6,e:["win","mid"],rt:"Ngươi quỳ nhận hết. {n1} chạy ra quỳ cạnh: “Là con sai.” Hoàng thượng phẩy tay tha cả hai.",rf:"Hoàng thượng quở ngươi một câu trước lớp, chuyện khép lại."},
  {n:"Tâu thật: trò sai, thầy giữ phép",c:{},o:A=>40+(A.f.strict?15:0)+S.danh/5,e:["win","lose"],lx:"{v} bị bẽ trước vua",rt:"Hoàng thượng gật đầu: “Thầy nghiêm thì trò nên người.”",rf:"Hoàng thượng thấy ngươi cứng, {v} khóc to."},
  {n:"Xin ngài tha cho cả lớp",c:{sung:-2},w:{duc:2},e:"mid",lx:"xin tha mà chẳng rõ trắng đen, Hoàng thượng phật ý",rt:"Hoàng thượng cho lui, không nói thêm."}]}},
 E:{win:{k:1,tag:"Thầy chịu thay trò",w:"v",t:"{n1} từ hôm ấy gọi ngươi là thầy bằng cả tấm lòng. {v} không còn cớ để trách, và lần đầu nàng sai người mang trà sang cảm ơn.",fx:{danh:4,duc:4},go:A=>{rdRel(A,"v",10);return""}},
  mid:{k:0,tag:"Chuyện khép mà chưa lành",t:"Không ai bị phạt nặng. {n1} vẫn đến lớp, nhưng {v} dặn con đừng thân thầy quá.",fx:{duc:1}},
  lose:{k:-1,tag:"{v} tố ngươi hành con nàng",t:"{v} kể khắp hậu cung rằng ngươi phạt con nàng đến sốt. Có người tin. Nàng thề không bỏ qua.",fx:{danh:-4,sung:-3},go:A=>{rdOan(A,"v",12);return""}}}});

rdDef("thd_hoc",9,{t:"Bài học đạo lý",w:"emp",sj:"bài giảng Mạnh Tử của ngươi",ok:thdHocOk,cast:thdHocCast,
 g:"Ngươi dạy bọn trẻ một câu của Mạnh Tử: “Dân là quý, xã tắc thứ hai, vua là nhẹ.” Đến bữa tối, {n1} đem câu ấy đọc trước mặt Hoàng thượng. Một câu chữ trong lớp, nay thành chuyện ngoài triều.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng bật cười",w:"emp",if:RDW(1),t:"Hoàng thượng nghe {n1} đọc, bật cười: “Vua là nhẹ? Vậy con giải nghĩa cho phụ hoàng nghe.” Đứa trẻ giải được, ngài kể lại ở triều.",o:[
  {n:"Thưa: thiếp chỉ dạy theo sách",c:{danh:-2},w:{duc:2},wx:"khiêm nhường",lx:"công dạy bị giấu đi, danh lùi một bước",rt:"Hoàng thượng gật đầu: “Sách hay, thầy cũng hay.”"},
  {n:"Xin ngài khen {n1} trước mặt mẹ nó",c:{suc:-2},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"{v} được nở mày",l:{sung:-1},lx:"các mẹ khác ganh, kêu lên Hoàng thượng, ân sủng nhạt đi",go:(A,ok)=>{if(ok)rdRel(A,"v",6)},rt:"Hoàng thượng khen {n1} trước {v}. Nàng đỏ mắt.",rf:"Ngài bận, quên mất."},
  {n:"Dặn {n1} đừng đọc câu ấy ngoài lớp",c:{duc:-2},w:{tamco:2},wx:"bớt sóng gió",lx:"dạy trò giấu chữ, tổn đức",rt:"{n1} gật đầu, không hiểu vì sao."}]},
 s2:{h:"{v} mang câu ấy đến ngự tiền",w:"v",if:RDW(0),t:"{v} dắt con đến trước Hoàng thượng, bắt nó đọc lại câu ấy: “Bệ hạ nghe xem, thầy dạy con ta coi nhẹ vua cha.”",o:[
  {n:"Xin ngài cho thiếp giảng trọn câu",c:{suc:-3},o:()=>40+S.tai/4,w:{danh:3},sc:1,wx:"lẽ phải sáng ra",l:{sung:-2},lx:"ngài không muốn nghe, Hoàng thượng phật ý",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Ngươi giảng: vua coi dân là quý thì xã tắc bền. Hoàng thượng gật gù.",rf:"Ngài phẩy tay: “Thôi, đừng dạy câu ấy nữa.”"},
  {n:"Nhận lỗi, bỏ câu ấy khỏi bài",c:{danh:-2},w:{sung:2},wx:"ngài yên lòng",lx:"thầy bỏ sách vì sợ, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",2)},rt:A=>"Câu ấy biến khỏi bài học, "+thdN2(A,"bọn trẻ")+" hỏi mãi vì sao."},
  {n:"Im lặng nhìn {v}",c:{duc:-1},w:{tamco:2},wx:"để nàng tự lộ",lx:"im lặng để lời gièm còn đó, tổn đức",go:A=>{rdOan(A,"v",3)},rt:"{v} nói thêm vài câu, rồi tự thấy mình quá lời."}]},
 c1:{h:"Sớ của Thị giảng Hàn lâm",w:"emp",t:"Một Thị giảng Hàn lâm viện, vốn mong được dạy hoàng tự, dâng sớ: phi tần dạy Mạnh Tử cho hoàng tự là “vượt phận”.",o:[
  {n:"Mời Thị giảng đến dự giờ",c:{suc:-2},o:()=>40+S.tai/4,w:{danh:3},sc:1,wx:"Thị giảng thấy ngươi dạy đúng",l:{danh:-2},lx:"Thị giảng bới lỗi, ghi thêm vào sớ, tiếng tăm sứt mẻ",rt:"Thị giảng nghe một buổi, về rút sớ.",rf:"Thị giảng ghi thêm ba lỗi vào sớ."},
  {n:"Nhờ {dad} viết thư giải nghĩa",c:{sung:-2},w:{danh:2},wx:"lời của một thầy đồ già có sức nặng",lx:"kéo cha vào chuyện triều, Hoàng thượng phật ý",rt:"Thư của cha được chép truyền trong Hàn lâm viện."},
  {n:"Mặc sớ",c:{danh:-2},w:{duc:1},wx:"không gây thêm",lx:"sớ để lâu thành thật, tiếng tăm sứt mẻ",rt:"Ngươi vẫn dạy như cũ."}]},
 c2:{h:"{v} kết với Thị giảng",w:"v",need:["v"],t:"Người của ngươi thấy cung nữ của {v} đưa thư cho người nhà Thị giảng. Hai bên đang góp lời.",o:[
  {n:"Bắt tận tay bức thư",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"có chứng {v} xúi sớ",l:{danh:-2},lx:"ầm ĩ trong cung, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Bức thư viết: “Đuổi được thầy ấy thì Thị giảng vào dạy.”",rf:"Cung nữ nuốt luôn bức thư."},
  {n:"Gặp {v}, hỏi nàng muốn gì",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"biết lòng {v}",l:{sung:-1},lx:"{v} cười nhạt, khóc với Hoàng thượng, ân sủng nhạt đi",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} nói thật: “Ta muốn con ta có thầy là đàn ông, là quan.”",rf:"{v} không nhận."},
  {n:"Để mặc",c:{duc:-2},w:{tamco:1},wx:"không động",lx:"để mặc người gièm, tổn đức; hai bên tự do góp lời",rt:"Ngươi giả như không thấy."}]},
 t1:{h:A=>"Câu hỏi của "+thdN2(A,"một thư đồng"),w:"emp",t:A=>"Trong lớp, "+thdN2(A,"một thư đồng")+" giơ tay: “Thầy ơi, nếu vua sai thì sao?” Cả lớp im phăng phắc.",o:[
  {n:"Đáp: thì có bề tôi ngay thẳng dám can",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,f:"brave",wx:"bọn trẻ hiểu đạo can gián",l:{danh:-2},lx:"câu trả lời lọt ra ngoài, tiếng tăm sứt mẻ",rt:"Bọn trẻ chép chuyện bề tôi can vua trong sách sử vào vở.",rf:"Có đứa kể lại với mẹ, mẹ nó kể lại với Thị giảng."},
  {n:"Đáp: vua không sai",c:{danh:-2},w:{sung:1},f:"safe",wx:"an toàn",lx:"dạy trò nói dối, tiếng tăm sứt mẻ",rt:A=>thdHocTwo(A)?"{n2} ngồi xuống, không hỏi nữa.":"Thư đồng ngồi xuống, không hỏi nữa."},
  {n:"Đáp: để thầy hỏi lại các con",c:{suc:-2},w:{duc:2},f:"brave",wx:"bọn trẻ tự nghĩ",lx:"để trò hỏi tới hỏi lui đến khàn giọng, hao sức; bọn trẻ nói lung tung",rt:A=>"{n1} nói: “Thì con cũng sai theo.” "+(thdHocTwo(A)?"{n2}":"Thư đồng")+" nói: “Thì phải có người dám nói.”"}]},
 x1:{h:"Giảng trước ngự tiền",w:"emp",t:"Hoàng thượng cho gọi ngươi vào Ngự thư phòng. Sớ của Thị giảng nằm mở trên án: “Nàng giảng lại câu ấy cho trẫm nghe. Trả lời sớ này thế nào, trẫm tự định.”",o:[
  {n:"Giảng trọn câu, dẫn cả sách",c:{suc:-4},o:A=>40+(A.f.brave?10:0)+S.tai/3,e:["win","lose"],rt:"Hoàng thượng nghe hết, nói: “Thầy dạy con trẫm biết thương dân. Thế là đủ.” Hôm sau ngài gác sớ của Thị giảng.",rf:"Ngài chỉ vào một dòng trong sớ: Thị giảng bắt đúng một chữ ngươi giảng lệch."},
  {n:"Để {n1} và {n2} tự giảng",if:thdHocTwo,c:{},o:A=>32+(A.f.safe?0:8),e:["win","mid"],lx:"trò ấp úng thì bài giảng chỉ khép hờ",rt:"Hai đứa trẻ giảng, mỗi đứa một ý, ý nào cũng đúng sách.",rf:"Hai đứa ấp úng, nhưng không ai bắt được lỗi."},
  {n:"Để {n1} tự giảng",if:A=>!thdHocTwo(A),c:{},o:A=>32+(A.f.safe?0:8),e:["win","mid"],lx:"trò ấp úng thì bài giảng chỉ khép hờ",rt:"{n1} giảng, giọng còn non mà ý đúng sách.",rf:"{n1} ấp úng, nhưng không ai bắt được lỗi."},
  {n:"Xin bỏ bài ấy, dạy lại Hiếu kinh",c:{danh:-3},w:{sung:2},e:"mid",lx:"thầy lùi trước Thị giảng, tiếng tăm sứt mẻ",rt:"Hoàng thượng gật đầu. Hôm sau Thị giảng nghe tin, mỉm cười."}]}},
 E:{win:{k:1,tag:"Bài học đến tai vua",w:"emp",t:"Hoàng thượng sai chép bài giảng của ngươi vào sách dạy hoàng tự. Thị giảng rút sớ, và {v} lần đầu thấy con mình được triều thần khen.",fx:{danh:7,sung:2},go:A=>{rdRel(A,"v",4);return""}},
  mid:{k:0,tag:"Bài học bị gác",t:"Không ai bị phạt, nhưng câu ấy không còn trong lớp. Bọn trẻ vẫn nhớ.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị trách dạy điều quá phận",t:"Hoàng thượng trách ngươi dạy điều quá phận. Thị giảng được vào dạy một buổi mỗi tuần, {v} mãn nguyện.",fx:{danh:-5,sung:-3},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("thd_hoc",10,{t:"Kết khóa",w:"emp",sj:"lời nhận xét của người thầy",ok:thdHocOk,cast:thdHocCast,
 g:A=>"Năm học khép lại. Hoàng thượng muốn nghe từ chính miệng người thầy: trong đám trẻ, đứa nào gánh được việc lớn. "+(thdHocSon(A)?"Một câu của ngươi có thể nghiêng cả chuyện Đông cung.":"Một câu của ngươi có thể định chỗ đứng của từng đứa trẻ."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sách của thầy",w:"emp",if:RDW(1),t:"Bài giảng của ngươi được chép thành sách. Các mẹ đua nhau xin một bản, và ai cũng muốn trang khen con mình dày hơn.",o:[
  {n:"Viết mỗi đứa một trang như nhau",c:{suc:-3},w:{duc:3},f:"fair",wx:"không mẹ nào trách",lx:"viết mỗi đứa một trang đến khuya, hao sức; không mẹ nào thật vui",rt:"Mỗi đứa một trang, chữ ngươi nắn nót."},
  {n:"Viết thật, đứa nào hơn thì khen hơn",c:{sung:-2},w:{danh:2},f:"truth",wx:"lời thầy có giá",lx:"các mẹ đếm chữ, kêu lên Hoàng thượng, ân sủng nhạt đi",rt:A=>thdHocTwo(A)?"Trang của {n2} dày nhất, trang của {n1} đứng thứ hai.":"Trang của một thư đồng dày nhất, trang của {n1} đứng thứ hai."},
  {n:"Gửi sách lên Hoàng thượng trước",c:{},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"ngài xem trước",l:{sung:-1},lx:"các mẹ thấy bị qua mặt, kêu lên Hoàng thượng, ân sủng nhạt đi",rt:"Hoàng thượng đọc trang của {n1} hai lần.",rf:"Ngài để sách lại, chưa đọc."}]},
 s2:{h:"Lớp vắng dần",w:"emp",if:RDW(0),t:A=>thdHocTwo(A)?"Gần cuối khóa, vài mẹ đã cho con học thầy khác. Lớp của ngươi vắng dần, chỉ {n1} và {n2} ngày nào cũng đến.":"Gần cuối khóa, mấy nhà quan đã cho thư đồng về học thầy khác. Lớp của ngươi vắng dần, chỉ {n1} ngày nào cũng đến.",o:[
  {n:"Dạy những trò còn lại như dạy cả lớp",c:{suc:-2},w:{duc:3},f:"fair",wx:"trò còn lại tiến bộ vượt bậc",lx:"dạy lớp vắng mà lòng mỏi, hao sức; tiếng thầy vắng trò",rt:A=>thdHocTwo(A)?"Hai đứa đọc thuộc Mạnh Tử trước cả các anh lớn.":"{n1} đọc thuộc Mạnh Tử trước cả các anh lớn."},
  {n:"Đi mời các trò cũ quay lại",c:{bac:-20},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"lớp đông lại",l:{danh:-2},lx:"bị nói là thầy đi xin trò, tiếng tăm sứt mẻ",rt:"Ba đứa quay lại, mang theo quà của mẹ.",rf:"Các mẹ đóng cửa."},
  {n:"Xin Hoàng thượng cho nghỉ sớm",c:{danh:-2},w:{suc:4},wx:"được nghỉ ngơi",lx:"khóa học khép không trọn, tiếng tăm sứt mẻ",rt:"Ngài cho phép, không hỏi thêm."}]},
 c1:{h:"Lễ tạ thầy cuối khóa",w:"emp",t:"Cuối khóa, các mẹ gửi lễ tạ thầy. Lễ của {v} nặng nhất, kèm một lời: “Mong thầy nói tốt cho con ta trước Hoàng thượng.”",o:[
  {n:"Nhận lễ chung, trả lễ riêng",c:{danh:-1},w:{duc:2,bac:20},wx:"giữ thể diện cho các mẹ",lx:"{v} thấy lễ mình bị trả, kể khắp cung, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",3)},rt:"Lễ chung được nhận, lễ riêng của {v} trả nguyên phong."},
  {n:"Nhận hết",c:{duc:-3},w:{bac:60},wx:"được bạc",lx:"mắc nợ cả lớp, tổn đức",go:A=>{rdRel(A,"v",4)},rt:"Kho cung ngươi đầy thêm, lòng ngươi nặng thêm."},
  {n:"Dùng lễ mua sách cho Thượng thư phòng",c:{sung:-2},w:{danh:3},wx:"lễ thành của chung",lx:"các mẹ không được ghi ơn riêng, kêu lên Hoàng thượng, ân sủng nhạt đi",rt:"Thượng thư phòng có thêm hai tủ sách."}]},
 c2:{h:"{v} xin một lời",w:"v",need:["v"],t:"{v} đến không mang lễ: “Nếu Hoàng thượng hỏi, chỉ cần ngươi nói tên con ta. Ta sẽ nhớ ơn ngươi cả đời.”",o:[
  {n:"Hứa nói thật về {n1}",c:{danh:-2},w:{duc:2},wx:"không hứa điều sai",lx:"hứa nói thật, {v} không biết thật là tốt hay xấu, đồn ngươi úp mở, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",3)},rt:"{v} nhìn ngươi, gật đầu chậm."},
  {n:"Hứa sẽ nói tên {n1}",c:{duc:-2},w:{tamco:2},f:"promise",wx:"{v} thành đồng minh",lx:"hứa trái với lòng thầy, tổn đức; lời hứa phải giữ",go:A=>{rdRel(A,"v",10)},rt:"{v} nắm tay ngươi: “Từ nay hai ta là người một nhà.”"},
  {n:"Từ chối: thầy không chọn vua",c:{sung:-1},w:{danh:2},wx:"giữ thẳng",lx:"từ chối: thầy không chọn vua, Hoàng thượng nghe, ân sủng nhạt đi; {v} thấy bị phụ",go:A=>{rdOan(A,"v",6)},rt:"{v} đứng dậy: “Vậy ngươi đừng trách ta.”"}]},
 t1:{h:"{n1} xin thầy ở lại",w:"v",t:"Biết sắp đổi thầy, {n1} chạy sang cung ngươi, ôm chân không chịu về: “Con chỉ học thầy thôi.”",o:[
  {n:"Hứa vẫn dạy nó mỗi tuần một buổi",c:{suc:-3},w:{duc:3},f:"bond",wx:"đứa trẻ yên lòng",lx:"thêm một buổi dạy mỗi tuần, hao sức",go:A=>{rdRel(A,"v",4)},rt:"{n1} ngoéo tay với ngươi, rồi mới chịu về."},
  {n:"Dạy nó biết chia tay",c:{sung:-2},w:{danh:1},wx:"đứa trẻ lớn thêm",lx:"nó khóc cả đêm, mách phụ hoàng, ngài phật ý",rt:"Ngươi viết cho nó một chữ “Biệt”, giảng nghĩa đến khi nó thôi khóc."},
  {n:"Gửi nó về cho {v}",c:{duc:-2},w:{tamco:1},wx:"không để {v} nói ngươi giữ con nàng",lx:"đứa trẻ thấy bị bỏ, tổn đức",rt:"{n1} đi, ngoái lại ba lần."}]},
 x1:{h:"Câu hỏi của Hoàng thượng",w:"emp",t:"Đêm cuối khóa, Hoàng thượng hỏi khẽ: “Nàng dạy chúng cả năm. Đứa nào có thể gánh việc lớn?”",o:[
  {n:"Tâu tên {n1}",c:{suc:-4},o:A=>46+(A.f.bond?10:0)+(A.f.promise?5:0),e:["win","lose"],lx:"các mẹ khác biết thầy chọn phe",rt:A=>thdHocSon(A)?(thdHocBig(A)?"Hoàng thượng gật đầu: “Trẫm cũng thấy thế.” Hôm sau ngài cho {n1} theo hầu buổi chầu.":"Hoàng thượng gật đầu: “Trẫm cũng thấy thế.” Hôm sau, ở yến gia đình, ngài cho {n1} ngồi cạnh mình, ai cũng thấy."):"Hoàng thượng gật đầu: “Trẫm cũng thấy thế.” Hôm sau ngài cho {n1} được ngồi nghe sư phó Hàn lâm giảng cùng các hoàng tử.",rf:"Hoàng thượng nhíu mày: “Thầy mà cũng chọn phe?”"},
  /* the resentment the hint names is applied (review road-b3-r1 item 3) */
  {n:"Tâu: mỗi đứa một tài, xin ngài xem từng đứa",c:{suc:-2},o:A=>40+(A.f.fair?15:0)+(A.f.truth?5:0),e:["win","mid"],lx:"{v} không được câu nàng muốn, thêm oán",go:(A,ok)=>{if(!ok)rdOan(A,"v",3)},rt:"Ngươi kể tài từng đứa. Hoàng thượng nghe đến khuya, rồi nói: “Thầy này biết người.”",rf:"Hoàng thượng nghe, nhưng không nhớ được gì."},
  /* only a son of school age; the Emperor's notice the text names is applied (j67 e67heir) */
  {n:"Tâu tên {k}",need:["kid"],if:()=>thdHocIn(son67()),c:{sung:-3},o:A=>35+S.sung/5,e:["mid","lose"],wx:"Hoàng thượng để ý {k}",lx:"ai cũng biết thầy nói cho con mình",go:(A,ok)=>{if(ok)e67heir(6)},rt:"Hoàng thượng cười: “Mẹ nào cũng thế.” Nhưng ngài vẫn để ý {k}.",rf:"Hoàng thượng lạnh mặt: “Trẫm hỏi thầy, không hỏi mẹ.”"},
  {n:"Thưa: thiếp chỉ dạy chữ",c:{danh:-2},w:{duc:2},e:"mid",lx:"lời thầy không được nghe, các mẹ bảo thầy né, tiếng tăm sứt mẻ",rt:"Hoàng thượng thở dài, không hỏi nữa."}]}},
 E:{win:{k:1,tag:"Lời thầy nặng ký",w:"emp",t:"Từ đó, mỗi lần bàn chuyện các hoàng tự, Hoàng thượng đều hỏi: “Thầy của chúng nói sao?” {v} biết, và ngả về phía ngươi.",fx:{danh:6,sung:3},go:A=>{rdRel(A,"v",6);return""}},
  mid:{k:0,tag:"Khóa học khép êm",t:"Năm học khép lại không sóng gió. Bọn trẻ lớn thêm một tuổi, ngươi già thêm một năm.",fx:{duc:2}},
  lose:{k:-1,tag:"Lời thầy bị nghi",t:"Hoàng thượng cho là thầy cũng có phe. Ngài thôi hỏi ngươi chuyện các hoàng tự, và {v} cho là ngươi đã phụ nàng.",fx:{sung:-5,danh:-3},go:A=>{rdOan(A,"v",8);return""}}}});

rdDef("thd_hoc",11,{t:"Người thầy",w:"emp",sj:"điều người thầy để lại",ok:thdHocOk,cast:thdHocCast,
 g:"Các hoàng tự lớn dần, sắp sang học các Đại học sĩ Hàn lâm. Lớp của ngươi khép lại. Thầy để lại gì cho trò, và các mẹ nhớ ngươi thế nào — đây là kết cục truyện xuất thân của ngươi: con gái thầy đồ nghèo, làm thầy trong cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của cha",w:"dad",if:RDW(1),t:"{dad} nghe tin con gái dạy hoàng tự, viết lên kinh: “Cả đời cha dạy trẻ làng. Con dạy con vua. Nhớ: thầy giỏi là thầy dạy trò hơn mình.”",o:[
  {n:"Đọc thư cho bọn trẻ nghe",c:{danh:-2},w:{duc:2},f:"heart",wx:"bọn trẻ biết thầy cũng có thầy",lx:"các mẹ chê ngươi đem chuyện quê vào cung, tiếng tăm sứt mẻ",rt:"{n1} hỏi: “Cha của thầy có dạy con được không?”"},
  {n:"Gửi bạc về sửa trường làng cho cha",c:{bac:-40},w:{danh:2},wx:"trường làng có mái mới",lx:"tốn bạc sửa trường",rt:"Trường làng lợp lại ngói, học trò của cha có chỗ ngồi khô."},
  {n:"Cất thư, không nói với ai",c:{duc:-2},w:{tamco:1},wx:"giữ riêng điều quý",lx:"giấu lời dạy của cha, tổn đức; bọn trẻ không biết",rt:"Ngươi đặt thư dưới gối."}]},
 s2:{h:"Lớp cuối cùng",w:"emp",if:RDW(0),t:"Buổi học cuối, chỉ còn ít đứa đến. {n1} ngồi bàn đầu, lần đầu tiên đến sớm hơn thầy.",o:[
  {n:"Dạy trọn buổi như mọi ngày",c:{suc:-2},w:{duc:3},f:"heart",wx:"bọn trẻ nhớ thầy",lx:"dạy trọn buổi đến mỏi, hao sức; không ai ngoài lớp biết",rt:"Hết buổi, {n1} cúi lạy ngươi ba lạy, không ai bảo."},
  {n:"Mời các mẹ đến xem buổi cuối",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"các mẹ thấy công thầy",l:{danh:-1},lx:"chỉ vài mẹ đến, lớp vắng, tiếng tăm sứt mẻ",rt:"{v} đến, đứng ở cửa đến hết buổi.",rf:"Không mẹ nào đến."},
  {n:"Tặng mỗi đứa một cây bút",c:{bac:-20},w:{duc:2},wx:"bọn trẻ có vật nhớ thầy",lx:"tốn bạc mua bút",rt:A=>thdHocTwo(A)?"{n2} cầm bút, khóc.":"Một thư đồng cầm bút, khóc."}]},
 c1:{h:"Đại học sĩ đến nhận lớp",w:"emp",t:"Vị Đại học sĩ sắp nhận lớp gửi vào, qua tay thái giám Thượng thư phòng, một tờ hỏi về từng đứa trẻ. Lời ngươi nói hôm nay sẽ theo chúng nhiều năm.",o:[
  {n:"Kể thật từng đứa, cả tật xấu",c:{suc:-2},w:{danh:2},f:"truth",wx:"thầy mới biết dạy",lx:"viết tật từng đứa đến khuya, hao sức; các mẹ sợ tật con bị ghi",rt:"Đại học sĩ chép lời ngươi vào sổ."},
  {n:"Chỉ kể điều tốt",c:{danh:-2},w:{duc:2},wx:"các mẹ vui",lx:"thầy mới không biết tật trò, Đại học sĩ cười, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",3)},rt:"Đại học sĩ cười: “Trò nào cũng giỏi thế sao?”"},
  {n:"Dặn riêng về {n1}",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"bond",wx:"{n1} có người hiểu nó",l:{danh:-1},lx:"bị nói là thầy thiên vị, tiếng tăm sứt mẻ",rt:"Đại học sĩ gật đầu: “Đứa trẻ cần khen nhiều hơn roi.”",rf:"Đại học sĩ không để tâm."}]},
 c2:{h:"{v} đến lần cuối",w:"v",need:["v"],t:"{v} đến cung ngươi, mang theo {n1}. “Con ta học ngươi mấy năm. Ta chưa nói một lời cảm ơn — hay một lời xin lỗi.”",o:[
  {n:"Nhận lời, rót trà mời nàng",c:{danh:-2},w:{duc:3},wx:"khép lại chuyện cũ",lx:"nhận lời, người ta bảo ngươi quên cũ, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",12)},rt:"Hai người ngồi uống trà, {n1} ngủ gục trên đùi thầy."},
  {n:"Nhắc nàng chuyện roi vọt ngày trước",c:{},o:()=>40+S.duc/4,w:{danh:2},sc:1,wx:"{v} hứa không đánh con nữa",l:{danh:-1},lx:"{v} thấy bị trách, bỏ về kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} cúi đầu: “Ta hứa.”",rf:"{v} đứng dậy: “Ta đến để cảm ơn, không đến để nghe dạy.”"},
  {n:"Từ chối gặp",c:{duc:-1},w:{tamco:1},wx:"giữ khoảng cách",lx:"đóng cửa với người đến xin lỗi, tổn đức; {v} về với lòng giận",go:A=>{rdOan(A,"v",6)},rt:"Cửa cung khép. {n1} đứng ngoài khóc."}]},
 t1:{h:"Bài học cuối",w:"emp",t:"Buổi học cuối, ngươi được chọn một điều để dạy. Bọn trẻ sẽ nhớ điều ấy lâu nhất.",o:[
  {n:"Dạy chữ “Nhân”",c:{danh:-2},w:{duc:3},f:"heart",wx:"bọn trẻ biết thương người",lx:"chữ ấy khó thấy kết quả, người ta bảo thầy dạy chữ suông, tiếng tăm sứt mẻ",rt:"{n1} viết chữ “Nhân” to nhất lớp, treo ở đầu giường."},
  {n:"Dạy chữ “Trung”",c:{danh:-2},w:{sung:2},f:"loyal",wx:"Hoàng thượng hài lòng",lx:"bọn trẻ học vẹt, người ta bảo thầy chiều ý vua, tiếng tăm sứt mẻ",rt:"Hoàng thượng nghe tin, gật đầu."},
  {n:"Dạy bọn trẻ tự chọn một chữ",c:{suc:-2},o:()=>40+S.tai/4,w:{danh:2},sc:1,f:"heart",wx:"mỗi đứa một chữ của riêng nó",l:{danh:-1},lx:"bọn trẻ chọn chữ lạ, người ta bảo thầy thả lỏng, tiếng tăm sứt mẻ",rt:A=>(thdHocTwo(A)?"{n2}":"Một thư đồng")+" chọn chữ “Dũng”, {n1} chọn chữ “Sư” — thầy.",rf:"Bọn trẻ cãi nhau chọn chữ."}]},
 x1:{h:"Lễ bái sư",w:"emp",t:"Lễ chuyển lớp ở Thượng thư phòng. Bọn trẻ lạy thầy mới. Hoàng thượng quay sang ngươi: “Thầy cũ có lời gì dặn lại?”",o:[
  {n:"Dặn: thương trò như thương con",c:{suc:-4},o:A=>41+(A.f.heart?15:0)+S.duc/6,e:["win","lose"],rt:"Cả phòng lặng đi. {n1} quỳ lạy ngươi trước khi lạy thầy mới, các mẹ đều khóc.",rf:"Thầy mới cho là ngươi dạy đời, mặt lạnh tanh."},
  {n:"Dặn: nghiêm thì trò nên người",c:{},o:A=>36+(A.f.truth?10:0)+(A.f.loyal?5:0),e:["win","mid"],lx:"bọn trẻ thấy thầy cũ lạnh",rt:"Hoàng thượng gật đầu: “Lời thầy, trẫm ghi nhớ.”",rf:"Lời dặn trôi qua như thủ tục."},
  {n:"Cúi đầu, không dặn gì",c:{danh:-2},w:{duc:2},e:"mid",lx:"công năm năm không thành lời, tiếng tăm sứt mẻ",rt:"Ngươi lui ra, bọn trẻ nhìn theo."}]}},
 E:{win:{k:1,tag:"Người thầy được tôn kính",w:"emp",t:"Hoàng thượng ban cho ngươi chữ “Hiền sư”. Các mẹ, kể cả {v}, gửi lễ tạ. Bọn trẻ lớn lên, đứa nào cũng nhớ tên thầy đầu tiên của mình. Ở quê, {dad} treo bản sao chữ ấy giữa trường làng.",fx:{danh:12,sung:4,duc:3},go:A=>{rdRel(A,"v",10);return""}},
  mid:{k:0,tag:"Được tôn mà một mẹ còn hận",t:"Hoàng thượng khen công dạy của ngươi, bọn trẻ nhớ thầy. Chỉ {v} vẫn không quên những năm cũ, và nàng nói với con: “Thầy là thầy, mẹ là mẹ.”",fx:{danh:5,duc:2},go:A=>{rdOan(A,"v",4);return""}},
  lose:{k:-1,tag:"Thôi dạy Thượng thư phòng",t:"Hoàng thượng cho ngươi thôi dạy. Ngươi vẫn giữ ngôi vị trong cung, nhưng Thượng thư phòng không còn ai nhắc tên thầy cũ. {n1} lâu lâu vẫn lén gửi sang một trang chữ.",fx:{danh:-5,sung:-2},go:A=>{rdOan(A,"v",4);return""}}}});
RD97L.push({a:"thd_hoc_11",tag:"Học trò bái ngươi làm thầy trọn đời",w:"emp",p:.1,n:"Xin Hoàng thượng cho {n1} giữ lễ thầy trò với thiếp trọn đời",c:{suc:-4},
 path:["Ra vườn bắt dế","Mời {v} cùng dạy","Mỗi đứa giữ một môn","Để bọn trẻ đối đáp","Thầy chịu lỗi thay trò","Giảng trọn câu","Hứa vẫn dạy nó","Tâu: mỗi đứa một tài","thương trò như thương con"],np:3,bad:["Mua đề","Nhận lễ","Bảo {n2} nhường","Bắt quỳ chép đủ mười lượt","Từ chối gặp"],sc:2,x:[()=>S.duc>=45,"Đức từ 45"],
 t:A=>"Hoàng thượng chuẩn. Ở Thượng thư phòng, trước mặt ngài, {n1} dâng trà quỳ lạy ngươi làm thầy trọn đời — một lễ hoàng tự chỉ làm với thầy dạy vỡ lòng. {v} đứng sau, cúi đầu theo con. Từ đó, đứa trẻ ấy lớn lên đi đâu cũng gọi ngươi là “Sư phụ”, "+(thdHocSon(A)?"và trong triều ai bàn chuyện Đông cung cũng phải nhớ điều ấy.":"và trong cung ai nhắc đến nàng cũng phải nhớ điều ấy."),
 fx:{danh:12,sung:4},go:A=>{rdRel(A,"v",15);return""},rw:"nt_dongchau",ti:"Sư phụ của hoàng tự"});
