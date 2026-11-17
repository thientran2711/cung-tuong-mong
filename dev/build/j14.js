/* ================= LÃNH CUNG: a playable state for every consort ================= */
function cold(why){if(S.dead)return;if(S.out)return;S.out=1;S.coldWhy=why;S.coldRank=S.rank;S.coldTurn=S.turn;S.rank=0;S.confined=0;S.preg=S.fake?0:S.preg;S.fake=0;
 const keep=(S.staff||[]).filter(s=>s.loyal>=70).slice(0,1);(S.staff||[]).filter(s=>!keep.includes(s)).forEach(s=>{});S.staff=keep;
 log(`<span class="r">${why}. Ngươi bị đưa vào lãnh cung.</span>`);Q.push({t:"Lãnh cung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Cửa lãnh cung đóng lại sau lưng. Bổng lộc chỉ còn chút gạo mốc, kẻ hầu bỏ đi gần hết${keep.length?`; chỉ ${keep[0].name} ở lại`:""}.</p><p class="past">Chưa hết đường: minh oan, cầu xin, nhờ người bên ngoài, hay chờ ân xá.</p>`,btn:"Bước vào"});coldVisit();deal()}
function coldVisit(){S.place="lc";const f=rivals.filter(v=>v.alive&&v.out);S.visit={k:"lc",people:lcPeople("Phế phi · cùng cảnh ngộ"),talked:false,tk:{},msg:"Gió lùa qua song cửa mục. Ở đây chỉ có những người bị quên lãng."}}
function restore(full,why){S.out=0;S.rank=full&&S.coldRank>=7&&seatHas(S,7)?7:seatDown(S,full?S.coldRank:S.coldRank-1);S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.lastPromo=S.turn;fillStaff(S,true);
 log(`<b class="g">${why}. Ngươi được rời lãnh cung, phục vị ${RANKS[S.rank].n}.</b>`);Q.push({t:"Rời lãnh cung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Ngươi được phục vị <b>${RANKS[S.rank].n}</b>.</p>`,btn:"Tạ ơn"});deal();if(typeof feedback==="function")feedback("decree")}
function coldActs(){const A=[],fr=liveRivals(true).filter(v=>aff(v,S)>=40),f=facOf(S),son=mySons().find(k=>k.age>=8);
 A.push({n:"Cầu xin",t:"Đút bạc cho lính gác, gửi thư lên Dưỡng Hòa điện.",c:{bac:-20},o:od(10+S.an/2+S.sung/4),k:2,w:{},l:{},x:"được tha",go:()=>restore(false,"Hoàng thượng đọc thư, động lòng")});
 if(fr.length||f||(S.dad||0)>=50)A.push({n:"Nhờ người bên ngoài",t:fr.length?`Nhờ ${fr[0].name} nói giúp.`:f?`Nhờ ${f.name} vận động.`:"Nhờ cha ở triều đình dâng sớ.",c:{bac:-10},o:od(15+(fr.length?aff(fr[0],S)/3:0)+(f?facStr(f)/10:0)+(S.dad||0)/5),k:2,w:{},l:{},x:"được tha",go:()=>restore(false,"Có người bên ngoài nói giúp")});
 if(S.framedBy!=null){const b=byKey(S.framedBy);A.push({n:"Tìm chứng cứ minh oan",t:`Tra lại vụ án. Chứng cứ: ${S.coldEv||0}/2.`,c:twCost("cold"),o:od(35+S.mat*6+S.tamco/5),k:2,w:{},l:{},x:"chứng cứ +1; đủ 2 thì phục vị trọn vẹn",go:()=>{S.coldEv=(S.coldEv||0)+1;if(S.coldEv>=2){restore(true,"Án được lật, ngươi được minh oan");if(b&&(b===S||b.alive))fall(b,"bị lật tẩy vu oan người khác")}}})}
 if(S.an>=30)A.push({n:"Gửi bài thơ cũ",t:"Chép lại bài thơ đêm nào ngài khen, nhờ người lén dâng.",c:{},o:od(10+S.an/2+S.arts.thi*8),k:2,w:{},l:{},x:"ngài nhớ chuyện cũ",go:()=>restore(false,"Hoàng thượng đọc bài thơ cũ, nhớ chuyện xưa")});
 if(son)A.push({n:`Nhờ ${son.name} cầu xin`,t:"Con quỳ trước Dưỡng Hòa điện xin cho mẹ.",c:{},o:od(15+son.fond/2),k:1,w:{},l:{},x:"được tha",go:()=>restore(false,`${son.name} quỳ khóc xin cho mẹ`)});
 A.push({n:"Chép kinh, giữ đức",t:"Ngày ngày chép kinh Kim Cương.",c:{suc:-3},o:100,k:2,w:{duc:3}},{n:"Trồng rau",t:"Cuốc đất sau sân, trồng rau mà ăn.",c:{},o:100,k:2,w:{suc:6}},{n:"Thêu khăn bán",t:"Nhờ lính gác đem ra ngoài bán.",c:{suc:-5},o:od(70),k:2,w:{bac:10},l:{}},
  {n:"Xuất gia",t:"Cắt tóc đi tu, rời bỏ hồng trần.",c:{},o:100,k:4,w:{},x:"kết thúc kiếp này, yên ổn (sẽ hỏi lại)",go:()=>xgConfirm(()=>over("Xuất gia",`${S.name} cạo tóc, vào chùa Bảo Hoa tu hành, sống nốt quãng đời thanh tịnh.`,"Xuất gia"))});
 return A}
function coldMonth(){let ev="";
 if(S.out){apply({bac:2});const w=SEASON[S.month-1]==="Đông";apply({suc:w?-12:-6});if(w&&roll(8)){apply({suc:-20});ev+=`<span class="r">Đêm đông giá buốt, lãnh cung không than sưởi.</span> Sức -20. `}
  if(illOf(S)&&S.ill.k==="tambenh"&&S.ill.st>=3&&roll(30)){over("Lãnh cung","Ngươi u uất thành điên dại, sống nốt quãng đời trong lãnh cung.","Phát điên trong lãnh cung",true);return ev}
  if(!S.thDead&&S.th>=50&&!(window.agDOn&&agDOn())&&roll(10)){restore(false,"Thái hậu mở lòng từ bi");return ev}
  if((S.month===1||S.month===8)&&roll(25)){restore(false,S.month===1?"Đại xá đầu năm":"Đại xá nhân tiết Vạn thọ");return ev}
  if(S.suc<=0){die("Chết rét, chết đói trong lãnh cung");return ev}}
 for(const v of rivals){if(!v.alive||!v.out)continue;ap(v,{suc:-4});if(v.suc<=0){v.alive=false;continue}
  if((roll(3)||(v.th>=50&&roll(5)))&&twCanPay(v,"cold")&&(twPay(v,"cold"),roll(odA(v,35+(v.mat||0)*6+(v.tamco||0)/5)))){/* two-way law: her release petition costs Sức (BAL.tw.cold) and rolls her odds; the NPC pays and rolls the same */v.out=false;v.rank=0;v.lastPromo=S.turn;v.oan=cl((v.oan||0)+20,0,100);ev+=`${v.name} được tha khỏi lãnh cung, phục vị ${RANKS[0].n}. `;if(v.coldBy!=null){const b=byKey(v.coldBy);if(b)oanAdd(v,b,40)}}}
 return ev}

/* ================= SERVANT RANKS ================= */
const SRK={maid:["Cung nữ thô sử","Cung nữ","Đại cung nữ","Chưởng sự cô cô","Nữ quan"],eunuch:["Tiểu thái giám","Thái giám","Thủ lĩnh thái giám","Tổng quản thái giám"]};
function srk(s){return s.rk==null?(s.rk=1):s.rk}
function srkName(s){return SRK[s.role][srk(s)]}
function srkMax(o,s){const r=rkOf(o);if(s.role==="maid")return r>=7?4:r>=4?3:2;return r>=5?3:r>=3?2:1}
function servMerit(s,n){s.mp=(s.mp||0)+n}
function servRanks(){let ev="";for(const p of consorts()){/* co-op guest: NPC staff merit / rises / sales roll on the host (review/servant-mline-r2) */if(p!==S&&typeof mlGuest==="function"&&mlGuest())continue;const L=p.staff||[];for(const s of L.slice()){const o=p;servMerit(s,1+Math.floor(rkOf(o)/3));
  if((s.mp||0)>=(srk(s)+1)*5&&srk(s)<srkMax(o,s)&&(typeof exSrvNpc!=="function"||exSrvNpc(s))){s.rk++;s.mp=0;s.loyal=cl(s.loyal+5,0,100);if(p===S)ev+=`${s.name} được thăng ${srkName(s)}. `}
  if(srk(s)>=2)ap(p,{bac:-Math.floor(srk(s)/2)});
  /* the Emperor's eye: any maid rank, chance by rank / her seeking / the master's favour (jmline mlEye, BAL.mline; was srk>=2 at 1.2 %) */
  if(s.role==="maid"&&(typeof mlEye==="function"?mlEye(p,s):srk(s)>=BAL.mline.offRank&&roll(BAL.mline.offEye))&&roomFor("consort")){if(typeof mlRose==="function")mlRose(p,s);p.staff.splice(p.staff.indexOf(s),1);const n=newRival(0);Object.assign(n,drawFace());relAdd(p,n,s.loyal>=BAL.mline.riseLoy?BAL.mline.riseRel:-BAL.mline.riseRel);rivals.push(n);ev+=`${s.name}, ${srkName(s).toLowerCase()} của ${NM(p)}, lọt mắt xanh Hoàng thượng, được phong ${RANKS[0].n} ${n.name}${s.loyal>=BAL.mline.riseLoy?", vẫn nhớ ơn chủ cũ":", quay lưng với chủ cũ"}. `;continue}
  if(srk(s)>=2&&roll(1.5)){const big=consorts().find(x=>x!==p&&rkOf(x)>rkOf(p)+1&&(x.bac||0)>=60);if(big){p.staff.splice(p.staff.indexOf(s),1);big.staff.push(s);s.loyal=50;ap(big,{bac:-40});if(p===S||big===S)ev+=`${s.name} bị ${NM(big)} mua về cung mình. `}}}}
 return ev}
function recommend(id){const s=servById(id);if(!s||ownerOf(s)!==S||S.bac<30)return;apply({bac:-30,danh:-2});servMerit(s,5);log(`Tiến cử ${s.name} lên Nội vụ phủ.`);render()}
function searchMaids(){if(!can(2))return;const head=S.staff.find(s=>s.role==="maid"&&srk(s)>=3);if(!head)return;spend(2);const spies=S.staff.filter(s=>s.spyFor&&s.spyFor!=="me");
 let r=`${head.name} tra xét cung nữ: `;if(spies.length){const s=spies[0];const m=byKey(s.spyFor);S.staff.splice(S.staff.indexOf(s),1);if(m&&m!==S)/*evok: the spy servant was bought (bribeServ deed)*/evA(S,m,2);r+=`lôi ra ${s.name} là tai mắt của ${m?NM(m):"kẻ khác"} (chứng cứ +2).`}else{const dt=allServ().find(x=>x.lover&&!(S.knowDT||[]).includes(x.sid)&&ownerOf(x)!==S);if(dt){S.knowDT=(S.knowDT||[]).concat([dt.sid,dt.lover]);r+=`nghe ra chuyện đối thực của ${dt.name}.`}else r+="không thấy gì lạ."}log(r);render()}
try{if(!$("title").hidden)wireOpt()}catch(e){}
