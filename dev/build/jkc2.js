/* ================= jkc2: PRE-PALACE HOME ROADS for "Cung nữ tuyển vào cung" (cnv) and "Công chúa hòa thân" (nc, every country branch: bd) =================
   Owner 16/11 07:00Z (s11, OD:L1251, replaces the "no home road" part of OD:L1244): the same pattern as the td fix (review/kc-lore): her life at
   home BEFORE the event that sends her into the palace, home acts with real gains and losses, then the sending event as a kit event card, then
   today's palace road unchanged. Choices never have one fixed best answer (OD:L1253, OD:L478): outcomes read the people of THIS life (their
   random natures, how they feel about her), her own numbers and earlier choices. Entry rank (OD:L1250): the origin's rank is only the CEILING;
   she earns it at the selection (a real mini-game of j82/j91 via playArt) — a weaker result gives a lower place.
   Built ON jkc (KC.ok, kcInit, kcCards, kcWeek, kcMonth, tabs, map, Gia tộc, Mệnh truyện, hud): the jkc machinery runs unchanged; this file
   only swaps the data of a life whose S.kc.kd is set ("dan" = village girl, cnv; "nc" = princess at her home court, nc and bd).
   New games only: S.kc.kd exists only in lives started with this build; every older save (tiểu thư roads, palace lives) is untouched.
   Pictures: every home place and home person uses an existing placeholder (OUTSIDE_PLAN §14 rule) until main's art list is painted
   (dev/handover/reports/kc-roads-cn-nc.md, ART LIST). Kit only: deck cards, kcE PEND dialogs (KIT §28.6), kit rows, kitSkillCard, pcard, kpanel Q cards. */
const KC2K={cnv:"dan",nc:"nc",bd:"nc"};
for(const k of Object.keys(KC2K))if(!KC.ok.includes(k))KC.ok.push(k);
/* the kind of the current life (S.kc.kd once the home life exists; before that, at the identity card, from the origin) */
function kc2D(){try{if(S&&S.kc)return S.kc.kd||"";return S&&S.origin?KC2K[S.origin.k]||"":""}catch(e){return""}}
function kc2On(){return isKc()&&!!(S.kc&&S.kc.kd)}
const KC2LAND={nc:{land:"Nam Chiếu",dad:"Phụ vương",mom:"Mẫu hậu",title:"Công chúa Nam Chiếu",court:"vương cung Nam Chiếu",sub:["Trong vương cung","Kinh đô"],
  fest:["Lễ hội đuốc","Đêm tháng sáu, cả kinh đô đốt đuốc thông quanh hồ, trai gái múa vòng đến sáng."],
  P:{tam:"Tẩm điện của ngươi",dien:"Chính điện",vien:"Vương uyển",mieu:"Chùa Sùng Thánh",dich:"Dịch quán sứ Đại Hy",cho:"Chợ kinh đô",ho:"Bờ hồ Nhĩ Hải"}},
 bd:{land:"Bắc Địch",dad:"Phụ hãn",mom:"Khả đôn",title:"Công chúa Bắc Địch",court:"kim trướng Bắc Địch",sub:["Trong trại","Thảo nguyên"],
  fest:["Hội đua ngựa mùa hạ","Các bộ lạc kéo về quanh kim trướng: đua ngựa, bắn cung, vật, và kén rể."],
  P:{tam:"Trướng của ngươi",dien:"Kim trướng của phụ hãn",vien:"Bãi ngựa",mieu:"Miếu thần núi",dich:"Doanh trại sứ Đại Hy",cho:"Chợ phiên",ho:"Thảo nguyên"}}};
function kc2Br(){try{return S&&S.origin&&S.origin.k==="bd"?"bd":"nc"}catch(e){return"nc"}}
function kc2L(){return KC2LAND[kc2Br()]}

/* ---------- places (KCPL rows: name, scene code, near home?, line) — placeholders, see ART LIST ---------- */
Object.assign(KCPL,{
 dn_nha:["Nhà tranh","dnNha",1,"Ba gian nhà tranh: bếp lửa, khung cửi của mẹ, chõng tre của ngươi."],
 dn_ruong:["Ruộng nhà","dnRuong",1,"Mấy sào ruộng sau lũy tre; vụ nào cũng lo nợ."],
 dn_ben:["Bến sông","dnBen",1,"Con gái trong xóm giặt áo, gánh nước ở đây; chuyện gì trong làng cũng nghe được."],
 dn_dinh:["Đình làng","dnDinh",0,"Lý trưởng ngồi đây thu thuế, đọc lệnh trên huyện gửi về."],
 dn_cho:["Chợ huyện","dnCho",0,"Phiên chợ năm ngày một lần: bán vải, mua thuốc, nghe chuyện kinh thành."],
 dn_chua:["Chùa làng","dnChua",0,"Chùa nhỏ đầu làng; sư cụ biết chữ, dạy trẻ con đọc sách."],
 dn_ba:["Nhà bà Tư","dnBa",0,"Bà Tư từng làm cung nữ ba mươi năm, về già sống một mình cuối xóm."]});
for(const br of ["nc","bd"]){const L=KC2LAND[br].P,p=br==="bd"?"nb_":"nn_",inn={"tam":1,dien:1,vien:1}/* place-kind flags, not stats */;
 const line={tam:br==="bd"?"Trướng nỉ thêu hoa, bếp lửa giữa trướng, yên ngựa treo cạnh giường.":"Rèm sa, bình phong thêu hoa trà, cửa sổ trông ra hồ.",
  dien:br==="bd"?"Phụ hãn ngồi trên da hổ, các tộc trưởng ngồi quanh bếp lửa bàn việc.":"Phụ vương thiết triều, các đại thần bàn việc nước.",
  vien:br==="bd"?"Đàn ngựa của ngươi gặm cỏ; người chăn ngựa già vẫn đợi ngươi mỗi sáng.":"Hoa trà, hồ sen, đình hóng gió; các vương nữ dạo chơi ở đây.",
  mieu:br==="bd"?"Đống đá cầu thần trên đỉnh đồi, cờ vải phần phật trong gió.":"Ba ngọn tháp trắng soi bóng xuống hồ; người cả nước đến cầu phúc.",
  dich:"Sứ đoàn Đại Hy ở đây, có thầy thông ngôn và một ma ma dạy lễ nghi.",cho:br==="bd"?"Lái buôn từ Đại Hy mang trà, lụa đổi lấy ngựa và da.":"Hàng trà, hàng bạc, lái buôn Đại Hy đổi muối lấy ngựa.",
  ho:br==="bd"?"Cỏ ngập đến yên ngựa; gió thổi về phía nam, nơi Đại Hy.":"Gió hồ thổi lộng, thuyền đánh cá về khi chiều xuống."};
 for(const k in L)KCPL[p+k]=[L[k],(br==="bd"?"nb":"nn")+k[0].toUpperCase()+k.slice(1),inn[k]?1:0,line[k]]}
Object.assign(SCIMG,{dnNha:"origin-wide-thd",dnRuong:"origin-wide-thd",dnBen:"ngu-hoa-vien",dnDinh:"origin-wide-thd",dnCho:"origin-wide-muoi",dnChua:"duong-tam-dien",dnBa:"origin-wide-thd",
 nnTam:"phi-tan-cung",nnDien:"tu-ninh-cung",nnVien:"ngu-hoa-vien",nnMieu:"duong-tam-dien",nnDich:"origin-wide-nc",nnCho:"origin-wide-muoi",nnHo:"origin-wide-nc",
 nbTam:"phi-tan-cung",nbDien:"tu-ninh-cung",nbVien:"origin-wide-bd",nbMieu:"duong-tam-dien",nbDich:"origin-wide-bd",nbCho:"origin-wide-muoi",nbHo:"origin-wide-bd"});
function kc2Pre(){return kc2D()==="dan"?"dn_":kc2Br()==="bd"?"nb_":"nn_"}
function kc2P(k){return kc2Pre()+k}
function kc2Mine(k){return String(k).startsWith(kc2Pre())}

/* ---------- words per kind: the home numbers reuse the jkc keys (kgt main bar, kap pressure, khm promised goods, kld rumour) ---------- */
const KC2W={dan:{kgt:"Tiếng trong xóm",kap:"Nợ nhà",khm:"Của dành dụm",kty:"Ngày tuyển",rw:"Thôn nữ",road:"Thôn quê",tabs:{act:"Nhà tranh",rv:"Gia đình",staff:"Xóm làng",kid:"Tin tức"},
  hx:{kgt:"Tiếng trong xóm (0–100): xóm giềng nói về ngươi thế nào. Ngày tuyển, lý trưởng và ma ma đều hỏi đến.",kap:`Nợ nhà (0–100): nợ cha mẹ vay của nhà lý trưởng, mỗi tháng lãi một ít. Tới ${BAL.kc2.st.dan.siet} chủ nợ đến siết.`,
   khm:"Của dành dụm: bạc ngươi để riêng, phòng ngày đi xa.",kty:"Ngày tuyển cung nữ: Nội vụ phủ về huyện chọn người. Khéo tay, lễ nghi và tiếng trong xóm quyết định ngươi về hầu cung nào."}},
 nc:{kgt:"Hòa ước",kap:"Phe chủ chiến",khm:"Hồi môn",kty:"Ngày lên đường",rw:"Công chúa",road:"Cố quốc",tabs:{act:"Tẩm cung",rv:"Vương tộc",staff:"Triều đình",kid:"Thư từ"},
  hx:{kgt:"Hòa ước (0–100): thế đứng của ngươi trong hòa ước. Cao thì sang Đại Hy như một tân nương được trọng; thấp thì như một con tin.",kap:`Phe chủ chiến (0–100): những người muốn xé hòa ước. Mỗi tháng một mạnh; tới ${BAL.kc2.st.nc.pha} họ ra tay.`,
   khm:"Hồi môn: bạc và lễ vật cố quốc gửi theo ngươi sang Đại Hy.",kty:"Ngày lên đường: hòa ước ký xong thì ngươi theo sứ đoàn sang Đại Hy. Lễ ra mắt ở Đại Hy quyết định phẩm vị."}}};
function kc2Wd(){return KC2W[kc2D()]||null}
const KC2W0={kgt:NAMES.kgt,kap:NAMES.kap,khm:NAMES.khm,hx:{kgt:HX.kgt,kap:HX.kap,khm:HX.khm,kty:HX.kty},tabs:Object.assign({},KCTABS)};
/* one place swaps the labels: every render (and the start) — a tiểu thư life after a princess life gets the jkc words back */
function kc2Words(){try{const W=(S&&S.kc&&S.kc.kd)?KC2W[S.kc.kd]:(typeof NLP!=="undefined"&&NLP&&S&&S.kcPick==="nha")?kc2Wd():null;
 for(const k of ["kgt","kap","khm"]){NAMES[k]=W?W[k]:KC2W0[k];HX[k]=W?W.hx[k]:KC2W0.hx[k];const r=RKEYS.find(x=>x[0]===k);if(r)r[1]=NAMES[k]}HX.kty=W?W.hx.kty:KC2W0.hx.kty;
 for(const t in KC2W0.tabs)KCTABS[t]=W&&W.tabs[t]?W.tabs[t]:KC2W0.tabs[t];
 if(W)Object.assign(KIT_GLOSS,{[W.kgt]:W.hx.kgt,[W.kap]:W.hx.kap,[W.khm]:W.hx.khm,[W.kty]:W.hx.kty})}catch(e){console.error("kc2Words",e)}}
(function(){const r0=render;render=function(){kc2Words();return r0.apply(this,arguments)}})();

/* ---------- title words: at home she is a Thôn nữ / a Công chúa, never a palace rank, never "Tiểu thư" ---------- */
(function(){const t0=kcTitle;kcTitle=function(){const d=kc2D();if(d==="dan")return `Thôn nữ ${S.kc&&S.kc.vil?S.kc.vil:"họ "+tdSur(S.name)}`;if(d==="nc")return kc2L().title;return t0.apply(this,arguments)}})();
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);try{if(kc2On())f.rw=kc2Wd().rw}catch(e){}return f}})();
(function(){const r0=rkOfFace;rkOfFace=function(kind,o){if(o===S&&kc2On())return["c0",kc2Wd().rw];return r0.apply(this,arguments)}})();
(function(){const r0=rkName;rkName=function(p){if(p===S&&kc2On())return kc2Wd().rw;return r0.apply(this,arguments)}})();
/* KIT name caption (kitName, KIT §48) of her own figure: at home (every home road, the tiểu thư ones too) the title is her home word, never the palace rank RANKS[S.rank] */
(function(){if(typeof kitName!=="function")return;const n0=kitName;kitName=function(p,o){try{if(p===S&&o&&o.named&&!o.noTitle&&isKc()){const t=rkName(S);return `<b class="kname kmy" style="--rc:${kitPersonCol(S)}"><span class="kti" style="--rt:${kitRtOf(t)}">${t}</span> ${S.name}</b>`}}catch(e){}return n0.apply(this,arguments)}})();

/* ---------- the identity card: "Con đường" with the words of this origin ---------- */
(function(){const p0=kcPathHTML;kcPathHTML=function(){const d=kc2D();if(!d)return p0.apply(this,arguments);const k=kcPick();const lock=!!window.__kcO;const r0=RANKS[(S.origin&&S.origin.r)||0].n;const L=d==="nc"?kc2L():null;
 const O=d==="dan"?[["cung","Vào cung ngay","thành: vào cung ngay làm cung nữ; thêm hơn hai năm trong cung để leo · hỏng: không ai cùng quê, chưa biết lễ nghi trong cung"],
   ["nha","Ở quê chờ lệnh tuyển","thành: hơn hai năm ở nhà: học khéo tay, học lễ nghi với bà cung nữ cũ, lo cho cha mẹ; ngày tuyển làm tốt thì về hầu một vị nương nương bậc cao; vào cung mang theo hành trang những năm ở nhà (Danh, Tư chất, Chủ tin, người đã biết) · hỏng: vào cung muộn hơn hai năm; tuyển kém thì phải giặt đồ ở Tân Giả khố trước · kèm: nợ nhà, lũ lụt, có thể bị gả làm thiếp hay ở lại quê; có thể chết ở nhà"]]
  :[["cung","Vào cung ngay",`thành: sang Đại Hy ngay; hòa ước cho thân phận tới ${r0}, phẩm vị định ở kỳ tuyển chọn · hỏng: chưa biết lễ nghi, tiếng nói Đại Hy`],
   ["nha","Ở cố quốc chờ hòa ước",`thành: hơn hai năm ở ${L.court}: học lễ nghi Đại Hy, giữ lòng ${L.dad.toLowerCase()}, giữ hòa ước; Lễ ra mắt làm tốt thì phong tới ${r0}; vào cung mang theo hành trang những năm ở nhà (Danh, Tư chất, người đã biết, hồi môn) · hỏng: sang Đại Hy muộn hơn hai năm; ra mắt kém thì phong thấp hơn · kèm: phe chủ chiến, người trong nhà tranh phần; có thể ở lại cố quốc; có thể chết ở nhà`]];
 return `<div class="kpsec kkcp"><h4 class="kpst">${typeof kitGloss==="function"?kitGloss("Con đường"):"Con đường"}</h4><div class="opts kcpo">`+
  O.map(([x,n,l])=>`<button type="button" class="opt${x===k?" ksel":""}" data-kcp="${x}" aria-pressed="${x===k}"${lock?" disabled":""}>${n}<small>${l}</small></button>`).join("")+`</div></div>`}})();
try{KIT_GLOSS["Con đường"]="Vào cung ngay: kiếp bắt đầu trong cung. Ở nhà: sống ở nhà một thời gian (học, lo chuyện nhà, gặp những người của kiếp này), rồi một việc lớn đưa ngươi vào cung: kỳ tuyển tú, lệnh tuyển cung nữ, hay hòa ước. Có thể không vào cung mà dừng ở nhà. Thân phận nào chưa có đường này thì vào cung ngay."}catch(e){}
/* a cung nữ start already holds her palace service (j42 srvInit ran at start()): at home that service does not exist yet */
(function(){const c0=kcCardHome;kcCardHome=function(m){try{if(m&&m.nl&&S&&S.origin&&S.origin.k==="cnv"&&kcPick()==="nha")return true}catch(e){}return c0.apply(this,arguments)}})();
/* the servant service is dropped BEFORE the accept runs, so jkc's own accept (and its co-op hold of the first "me" send) builds the home life */
(function(){const a0=nlAccept;nlAccept=function(){try{const was=typeof NLP!=="undefined"&&NLP;const want=window.__kcO||(S&&S.kcPick);if(was&&S&&!S.kc&&want==="nha"&&S.origin&&S.origin.k==="cnv"&&S.srv){S.srv=null;Q=Q.filter(m=>m.t!=="Nhập cung làm cung nữ")}}catch(e){console.error("jkc2 start",e)}return a0.apply(this,arguments)}})();

/* ---------- the home life ---------- */
const KC2VIL=["làng Hạ Trang","thôn Đông Hà","xóm Liễu Khê","làng Bến Đò","thôn Vân Lộc"];
function kc2T(r,t,name,age,role,tr,af,more){return Object.assign({id:"f"+r,r,t,name,age,fid:kcFreeFid(role,[]),tr,af,me:30+R(20),oan:0,alive:1},more||{})}
(function(){const i0=kcInit;kcInit=function(){const d=KC2K[S.origin&&S.origin.k];if(!d)return i0.apply(this,arguments);return kc2Init(d)}})();
/* round 3 (owner OD:L1288): every home road ends at the SAME calendar point as the tiểu thư roads (the tuyển tú of year KC.ty, Sơ tuyển month):
   "Vào cung ngay / Chờ" is one choice for every origin, and two friends who both wait enter in the same month without any forced link */
function kc2Due(){return (S.turn||0)+(KC.ty-S.year)*12+(KC.tm-1-S.month)}
/* reviewer r1: a home person whose title IS her name (Xuân Đào, Bà Tư) keeps its capitals in running text; role titles go lower case */
function kc2Lt(m){return m&&/^(xd|ba)$/.test(m.r)?String(m.t):String(m&&m.t||"").toLowerCase()}
function kc2Init(d){const sur=tdSur(S.name);const nm=g=>`${sur} ${g}`;const gl=shuf(KCMN.slice());const g=()=>gl.pop();const fam=[];
 const T=(r,t,name,age,role,trs,af,more)=>kc2T(r,t,name,age,role,pick(trs),af,more);
 if(d==="dan"){
  fam.push(T("cha","Phụ thân",nm(g()),44+R(8),"official",["Ân cần","Cương trực","Kín đáo","Nóng nảy"],40+R(30)));
  fam.push(T("me","Mẫu thân",`${pick(SURN)} thị`,40+R(6),"mama",["Ân cần","Khiêm nhường","Kín đáo"],55+R(25)));
  fam.push(T("huynh","Huynh trưởng",nm(g()),21+R(4),"man",["trung hậu","nóng nảy","Ham vui","Kín đáo"],35+R(30)));
  /* Xuân Đào: the girl from the same village who enters the palace in the same draft (j67 cnv_ban names her) — one person, one name */
  /* the palace has no other Xuân Đào: a palace maid who drew that name gets another one (j61 hides strangers' names in any text) */
  try{const used=new Set(k61All().map(e=>e.name));for(const e of k61All())if(e&&e!==S&&/(^| )Xuân Đào$/.test(String(e.name||""))){const f=(typeof MAIDS!=="undefined"?MAIDS:[]).filter(n=>!used.has(n)&&n!=="Xuân Đào");if(f.length){e.name=pick(f);used.add(e.name)}}}catch(e){console.error("kc2 xd name",e)}
  fam.push(T("xd","Xuân Đào","Xuân Đào",18+R(2),"consort",["Ân cần","Khiêm nhường","Nóng nảy","Ham vui"],35+R(30),{out:1}));
  fam.push(T("ly","Lý trưởng",`${pick(SURN)} ${g()}`,50+R(10),"official",["Ham lợi","Cương trực","Xu nịnh","Kín đáo"],R(30),{out:1}));
  fam.push(T("ba","Bà Tư",`Bà Tư ${pick(SURN)} thị`,62+R(8),"mama",["Lạnh lùng","Ân cần","Nhiều chuyện"],30+R(20),{out:1}));
 }else{const L=kc2L(),bd=kc2Br()==="bd";
  fam.push(T("cha",L.dad,bd?`Khả hãn ${g()}`:nm(g()),50+R(8),"official",["Tham vọng","Cương trực","Kín đáo","Kín đáo"],35+R(30)));
  fam.push(T("me",L.mom,bd?`Khả đôn ${pick(KCFN)}`:`Vương hậu ${pick(KCFN)}`,42+R(6),"mama",["Ân cần","Khiêm nhường","Kín đáo","Cương trực"],50+R(30)));
  if(bd){fam.push(T("huynh","Trưởng huynh",`${g()}`,26+R(4),"man",["Tham vọng","cương trực","nóng nảy"],30+R(30)));fam.push(T("huynh2","Nhị huynh",`${g()}`,23+R(3),"man",["Tham vọng","Kín đáo","Ham vui"],30+R(30)))}
  else{fam.push(T("huynh","Hoàng huynh",nm(g()),25+R(4),"man",["Tham vọng","trung hậu","Kín đáo","nóng nảy"],35+R(30)));fam.push(T("thuc","Hoàng thúc",nm(g()),46+R(8),"official",["Tham vọng","Kín đáo","Cương trực"],R(30),{out:0}))}
  const mu=T("muoi",bd?"Muội muội":"Vương muội",kcFreeName(()=>bd?pick(KCFN):nm(pick(KCFN)),fam),18,"consort",["Kiêu ngạo","Tham vọng","Khiêm nhường","Ân cần"],10+R(40));mu.sac=40+R(50);mu.tai=30+R(50);fam.push(mu);
  fam.push(T("sx","Sứ thần Đại Hy",`${pick(SURN)} ${g()}`,45+R(10),"official",["Kín đáo","Cương trực","Điềm tĩnh","Kín đáo"],20+R(20),{out:1,hide:1}))}
 S.kc={v:3,kd:d,fam,at:{},once:{},ev:{},ch:{o:0},suit:[],intel:[],proof:{},le:0,kim:0,ds:0,g7:-99,ldSeen:0,r0:S.rank,staff0:S.staff||[],y0:S.year,t0:S.turn||0,end:null,tt:null,log:[],vil:d==="dan"?pick(KC2VIL):""};
 S.kc.due=kc2Due();kc2Words();
 if(d==="dan"){S.kgt=BAL.kc2.st.dan.kgt[0]+R(BAL.kc2.st.dan.kgt[1]);S.kap=BAL.kc2.st.dan.kap[0]+R(BAL.kc2.st.dan.kap[1]);S.khm=0;S.kld=0;S.kgtu=BAL.kc2.st.dan.kgtu;S.age=18;S.bac=Math.min(S.bac||0,8)}
 else{S.kgt=BAL.kc2.st.nc.kgt[0]+R(BAL.kc2.st.nc.kgt[1])+(kc2Br()==="bd"?BAL.kc2.st.nc.kgtBr[0]:BAL.kc2.st.nc.kgtBr[1]);S.kap=BAL.kc2.st.nc.kap[0]+R(BAL.kc2.st.nc.kap[1]);S.khm=kc2Br()==="bd"?BAL.kc2.st.nc.khm[0]:BAL.kc2.st.nc.khm[1];S.kld=0;S.kgtu=BAL.kc2.st.nc.kgtu;S.age=18;S.bac=Math.min(S.bac||0,60)}
 S.rank=0;S.sung=0;S.danh=Math.min(S.danh||0,d==="nc"?12:3);S.staff=[];S.place=kc2P(d==="dan"?"nha":"tam");S.pal=null;S.tonight=null;
 if(S.maid)S.maid.kcTy=1;
 kcWhere();Q=Q.filter(m=>m.nl);S.nightWhy=null;
 const c=kcR("cha");
 if(d==="dan")Q.push({t:"Thôn quê",who:pMe(),art:"img/origin-wide-cnv.webp",h:`<p>Ngươi mười tám tuổi, con gái nhà họ ${sur} ở ${S.kc.vil}. Nhà có mấy sào ruộng, một khung cửi, và một món nợ với nhà lý trưởng.</p>`+
  `<p>Người trên huyện nói năm nay Nội vụ phủ sẽ về chọn cung nữ. Con gái nhà nghèo vào cung thì nhà được tiền an gia, nhưng cũng có người đi rồi không về.</p>`+
  kitRows([["Phụ thân",c?c.name:"","t"],[NAMES.kap,S.kap,"t"],[NAMES.kgt,S.kgt,"t"],["Ngày tuyển",`còn chừng ${kcMonthsLeft()} tháng`,"t"]])});
 else{const L=kc2L();Q.push({t:L.title,who:pMe(),art:`img/origin-wide-${kc2Br()}.webp`,h:`<p>Ngươi mười tám tuổi, con gái ${L.dad.toLowerCase()} ${c?c.name:""}, lớn lên trong ${L.court}.</p>`+
  `<p>Sứ thần Đại Hy sắp đến. Người ta nói Đại Hy muốn một hòa ước, và một hòa ước cần một nàng công chúa. Trong ${L.court}, có người muốn hòa, có người muốn đánh.</p>`+
  kitRows([[L.dad,c?c.name:"","t"],[NAMES.kgt,S.kgt,"t"],[NAMES.kap,S.kap,"t"],["Ngày lên đường",`còn chừng ${kcMonthsLeft()} tháng`,"t"]])})}
 kcSnapReset();tab="act";S.visit=kcVisit(S.place);deal();log(d==="dan"?`Kiếp này ngươi ở quê chờ lệnh tuyển cung nữ (${kcTitle()}).`:`Kiếp này ngươi ở ${kc2L().court} chờ hòa ước.`)}
(function(){const m0=kcMonthsLeft;kcMonthsLeft=function(){if(S&&S.kc&&S.kc.kd)return Math.max(0,S.kc.due-(S.turn||0));if(!S||!S.kc)return KC2K[S&&S.origin&&S.origin.k]?Math.max(0,kc2Due()-(S.turn||0)):m0.apply(this,arguments);return m0.apply(this,arguments)}})();
/* her own number ranges */
(function(){const f0=kcFix;kcFix=function(){const r=f0.apply(this,arguments);try{if(S&&S.kc&&S.kc.kd){S.kc.le=cl(S.kc.le||0,0,5);S.kc.kim=cl(S.kc.kim||0,0,5)}}catch(e){}return r}})();

/* ---------- who is where (one ledger per buổi, the jkc rule) ---------- */
const KC2HAB={dan:{cha:[["dn_ruong",4],["dn_nha",2],["dn_dinh",1]],me:[["dn_nha",5],["dn_ben",1],["dn_cho",1]],huynh:[["dn_ruong",3],["dn_cho",2],["",2]],
  xd:[["dn_ben",3],["dn_cho",1],["dn_chua",1],["",1]],ly:[["dn_dinh",5],["",2]],ba:[["dn_ba",6],["dn_chua",1]]},
 nc:{cha:[["dien",5],["vien",1],["",2]],me:[["vien",3],["tam",1],["mieu",1]],huynh:[["dien",2],["ho",2],["",2]],huynh2:[["ho",2],["cho",1],["",2]],thuc:[["dien",3],["",3]],
  muoi:[["vien",3],["mieu",1],["cho",1]],sx:[["dich",5],["dien",2]]}};
(function(){const w0=kcWhere;kcWhere=function(){if(!S||!S.kc||!S.kc.kd)return w0.apply(this,arguments);const b=S.buoi||0;const d=S.kc.kd;S.kc.at={};
 for(const m of S.kc.fam){if(!m.alive||m.hide&&!S.kc.sx)continue;let L=(KC2HAB[d][m.r]||[["",1]]).map(([k,w])=>[k?(d==="dan"?k:kc2P(k)):"",w]);
  if(b===3&&!["ly","ba","sx"].includes(m.r))L=L.filter(x=>!x[0]||KCPL[x[0]][2]).concat([["",1]]);
  if(m.r==="cha"&&b===0&&d==="dan")L=[["dn_ruong",1]];
  const tot=L.reduce((a,x)=>a+x[1],0);let r=Math.random()*tot,p="";for(const [k,w] of L){r-=w;if(r<0){p=k;break}}if(p)S.kc.at[m.id]=p}}})();
(function(){const g0=kcGoWhy;kcGoWhy=function(k){if(!S||!S.kc||!S.kc.kd)return g0.apply(this,arguments);if(!kc2Mine(k))return"Không ở đây";if(k===S.place)return"Đang ở đây";
 if(kcCity(k)){if((S.buoi||0)===3)return S.kc.kd==="dan"?"Tối rồi, con gái không ra khỏi xóm":"Công chúa không ra ngoài buổi tối";if(S.kc.kd==="nc"&&!S.maid)return"Không có tỳ nữ đi cùng";if(!can(BAL.kc2.kcGoWhy_k))return"Hết khắc buổi này"}return""}})();
/* night: the house is the safe place */
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{if(kc2On()&&(S.buoi||0)===3&&kcCity(S.place)){S.place=kc2P(S.kc.kd==="dan"?"nha":"tam");S.visit=kcVisit(S.place);deal();render()}}catch(e){}return r}})();
(function(){const e0=kcEndTurn;kcEndTurn=function(){const r=e0.apply(this,arguments);try{if(kc2On()&&!kc2Mine(S.place)){S.place=kc2P(S.kc.kd==="dan"?"nha":"tam");S.visit=kcVisit(S.place);deal();render()}}catch(e){}return r}})();
/* her people are kit people: role and sex (the stage, the event figure, the name line) */
(function(){if(typeof personRoleRank!=="function")return;const p0=personRoleRank;personRoleRank=function(p){try{if(kcIsFam(p)&&S.kc.kd){const man=["cha","huynh","huynh2","thuc","ly","sx"].includes(p.r);
  return{role:["cha","thuc","ly","sx"].includes(p.r)?"official":p.r.startsWith("huynh")?"man":"other",rank:null,origin:null,sex:man?"m":"f",kid:false}}}catch(e){}return p0.apply(this,arguments)}})();
(function(){const f0=kcFace;kcFace=function(m){const f=f0.apply(this,arguments);try{if(m&&S&&S.kc&&S.kc.kd&&["cha","huynh","huynh2","thuc","ly","sx"].includes(m.r))f.col="#6a8aa0"}catch(e){}return f}})();
/* home dress: the village girl and Xuân Đào wear the plain cotton dress (tier "ngheo"); the princess and her sister the noble dress (tier "kc"; foreign home dress = ART LIST) */
(function(){const d0=kcDress;kcDress=function(){if(kc2D()==="dan")return"ngheo";if(kc2D()==="nc")return"kc";return d0.apply(this,arguments)}})();
(function(){const k0=kcPor;kcPor=function(m,kind){try{if(isKc()&&S.kc.kd&&m&&m.fid&&(m.r==="xd"||m.r==="muoi")){const s=kcDressSrc(m.fid,kind==="fig"?"fig":"por",m.r==="xd"?"ngheo":"kc",m.age);if(s)return s}}catch(e){}return k0.apply(this,arguments)}})();

/* ---------- acts (kit deck cards; every bạc card has a twin paid in Sức / khắc / a favour of the same weight, owner 15/11 20:30Z) ---------- */
(function(){const c0=kcCards;kcCards=function(){if(!S||!S.kc||!S.kc.kd)return c0.apply(this,arguments);try{return S.kc.kd==="dan"?kc2CardsDan():kc2CardsNc()}catch(e){console.error("kc2 cards",e);return[]}}})();
function kc2Twin(X){for(const a of X.filter(x=>x.tw)){const i=X.indexOf(a);X.splice(i,1);const j=X.findIndex(x=>!x.tw&&x.n===a.tw);X.splice(j<0?X.length:j+1,0,a)}
 for(const a of X){if(a.onceM&&kcOnce(a.onceM,"m"))a.done=1}return X}
const TRW={"Ham lợi":1.4,"Xu nịnh":1.1,"Cương trực":.5,"Kín đáo":.8};/* how a man of this nature takes a gift */
function kc2CardsDan(){const X=[];const cha=kcR("cha"),me=kcR("me"),hu=kcR("huynh"),xd=kcR("xd"),ly=kcR("ly"),ba=kcR("ba");const P="dn_";const K=S.kc;
 /* Nhà tranh */
 X.push(kcNeed(kcCard({g:"khue",n:"Nghỉ ngơi",t:"Nằm chõng tre sau bếp, ngủ một giấc.",k:2,w:{suc:BAL.kc2.nghiNgoi_w_suc},rep:1}),null,P+"nha"));
 X.push(kcNeed(kcCard({g:"khue",n:"Dệt vải bán",t:"Ngồi khung cửi của mẹ, dệt một tấm vải thô đem bán.",k:3,c:{suc:BAL.kc2.detVaiBan_c_suc},o:od(BAL.kc2.detVaiBan_od+K.kim*6),w:{bac:BAL.kc2.detVaiBan_w_bac+K.kim},l:{suc:BAL.kc2.detVaiBan_l_suc},x:K.kim<5?"Khéo tay +1 (ngày tuyển xem)":"",go:()=>{K.kim=Math.min(5,K.kim+1)},fail:()=>log("Sợi rối, tấm vải phải tháo ra dệt lại.")}),null,P+"nha"));
 X.push(kcNeed(kcCard({g:"khue",n:"Thêu khăn",t:"Thêu một chiếc khăn hoa sen, tập đường kim cho khéo.",k:2,c:{suc:BAL.kc2.theuKhan_c_suc},lock:K.kim>=5,w:{},x:`Khéo tay +1 (nay ${K.kim}/5)`,go:()=>{K.kim++}}),null,P+"nha"));
 X.push(kcNeed(kcCard({g:"khue",n:"Soi bóng nước, chải tóc",t:"Ra bến sông chải tóc, rửa mặt bằng nước bồ kết.",k:1,c:{suc:BAL.kc2.soiBongNuocChai_c_suc},o:od(BAL.kc2.soiBongNuocChai_od+S.sac/10),w:{sac:BAL.kc2.soiBongNuocChai_w_sac},l:{},fail:()=>{S.kld+=2;log("Đám trai làng đứng trên đê nhìn xuống, cười cợt.")}}),null,P+"ben"));
 /* Gia đình */
 for(const m of [cha,me].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Hỏi han ${m.t.toLowerCase()}`,t:`Bưng bát nước chè, ngồi nghe ${m.t.toLowerCase()} kể chuyện.`,k:1,c:{suc:BAL.kc2.hoiHan_c_suc},w:{},x:`${m.t} với ngươi ${balSg(BAL.eff.jkc2.go)}`,go:()=>kcAf(m,BAL.eff.jkc2.go)}),m));
 if(cha)X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Ra ruộng giúp cha",t:"Cấy, làm cỏ, tát nước cùng cha cả buổi; nắng làm sạm da.",k:3,c:{suc:BAL.kc2.raRuongGiupCha_c_suc,sac:BAL.kc2.raRuongGiupCha_c_sac},w:{kap:BAL.kc2.raRuongGiupCha_w_kap},x:`Phụ thân với ngươi ${balSg(BAL.eff.jkc2.go_2)}`,go:()=>kcAf(cha,BAL.eff.jkc2.go_2)}),cha,P+"ruong"));
 if(me)X.push(kcNeed(kcCard({g:"fam",who:me.id,n:"Mua thuốc cho mẹ",t:"Ra chợ huyện cắt mấy thang thuốc bổ cho mẹ.",k:2,c:{suc:BAL.kc2.muaThuocChoMe_c_suc,bac:BAL.kc2.muaThuocChoMe_c_bac},w:{duc:BAL.kc2.muaThuocChoMe_w_duc},x:`Mẫu thân với ngươi ${balSg(BAL.eff.jkc2.go_3)} · mẹ khỏe hơn`,go:()=>{kcAf(me,BAL.eff.jkc2.go_3);K.meOk=(K.meOk||0)+1}}),null,P+"cho"));
 if(me)X.push(kcNeed(kcCard({g:"fam",who:me.id,tw:"Mua thuốc cho mẹ",n:"Hái lá thuốc cho mẹ",t:"Lên đồi sau làng hái lá thuốc, về sắc cho mẹ; biết cây thì tốt, hái nhầm thì hại.",k:3,c:{suc:BAL.kc2.haiLaThuocCho_c_suc},o:od(BAL.kc2.haiLaThuocCho_od+((S.arts||{}).y||0)*10+S.tamco/5),w:{duc:BAL.kc2.haiLaThuocCho_w_duc},l:{},x:`Mẫu thân với ngươi ${balSg(BAL.eff.jkc2.go_4)} · mẹ khỏe hơn`,go:()=>{kcAf(me,BAL.eff.jkc2.go_4);K.meOk=(K.meOk||0)+1},fail:()=>{kcAf(me,BAL.eff.jkc2.fail);log("Lá thuốc hái nhầm; mẹ đau bụng cả đêm.")}}),me));
 if(hu)X.push(kcNeed(kcCard({g:"fam",who:hu.id,n:"Góp bạc cưới vợ cho huynh trưởng",t:`${hu.name} sắp dạm vợ, nhà gái đòi sính lễ.`,k:1,c:{bac:BAL.kc2.gopBacCuoiVo_c_bac},w:{},x:`Huynh trưởng với ngươi ${balSg(BAL.eff.jkc2.go_5)} · nhà yên`,go:()=>{kcAf(hu,BAL.eff.jkc2.go_5);hu.me+=BAL.eff.jkc2.meGo}}),hu));
 if(hu)X.push(kcNeed(kcCard({g:"fam",who:hu.id,tw:"Góp bạc cưới vợ cho huynh trưởng",n:"Dệt thêm vải làm sính lễ cho huynh",t:"Thức khuya dệt thêm hai tấm vải cho nhà gái.",k:4,c:{suc:BAL.kc2.detThemVaiLam_c_suc},w:{},x:`Huynh trưởng với ngươi ${balSg(BAL.eff.jkc2.go_6)} · nhà yên`,go:()=>{kcAf(hu,BAL.eff.jkc2.go_6);hu.me+=BAL.eff.jkc2.meGo_2}}),hu));
 /* Xóm làng */
 if(ly){const lo=Math.round(30+ly.af/3+(tv(TRW,ly)||1)*15);
  X.push(kcNeed(kcCard({g:"soc",who:ly.id,n:"Trả bớt nợ nhà lý trưởng",t:"Mang bạc dành dụm lên đình, xin trừ vào nợ của cha.",k:1,c:{bac:BAL.kc2.traBotNoNha_c_bac},w:{kap:BAL.kc2.traBotNoNha_w_kap},x:"",go:()=>{if(hasT(ly,"Ham lợi")&&roll(BAL.kc2.traBotNoNha_odds)){S.kap+=BAL.eff.jkc2.kapGo;log("Lý trưởng nhận bạc, ghi sổ thiếu mất một khoản.")}}}),ly,P+"dinh"));
  X.push(kcNeed(kcCard({g:"soc",who:ly.id,tw:"Trả bớt nợ nhà lý trưởng",n:"Làm không công cho nhà lý trưởng",t:"Xay lúa, gánh nước cho nhà lý trưởng, trừ vào nợ; người trong xóm sẽ nói ra nói vào.",k:4,c:{suc:BAL.kc2.lamKhongCongCho_c_suc},o:od(lo+15),w:{kap:BAL.kc2.lamKhongCongCho_w_kap},l:{kgt:BAL.kc2.lamKhongCongCho_l_kgt},x:"",fail:()=>{S.kld+=6;log("Con trai lý trưởng chòng ghẹo ngươi ở sân kho.")}}),ly,P+"dinh"));
  X.push(kcNeed(kcCard({g:"soc",who:ly.id,n:"Biếu quà lý trưởng",t:"Biếu con gà, buồng cau. Ông là người ghi tên con gái đi tuyển và nói đỡ với ma ma.",k:1,c:{bac:BAL.kc2.bieuQuaLyTruong_c_bac},o:od(lo),w:{},l:{kgt:BAL.kc2.bieuQuaLyTruong_l_kgt},x:`Lý trưởng với ngươi ${balSg(BAL.eff.jkc2.go_7)} (ngày tuyển ông nói đỡ)`,go:()=>kcAf(ly,BAL.eff.jkc2.go_7),fail:()=>{kcAf(ly,BAL.eff.jkc2.fail_2);log(hasT(ly,"Cương trực")?"Lý trưởng gạt đi: ‘Mang về. Ta không nhận quà của nhà mắc nợ.’":"Lý trưởng nhận quà mà mặt không vui.")}}),ly,P+"dinh"));
  X.push(kcNeed(kcCard({g:"soc",who:ly.id,tw:"Biếu quà lý trưởng",n:"Thêu khăn biếu bà lý trưởng",t:"Tự tay thêu một bức khăn, biếu bà lý trưởng; bà nói với ông.",k:3,c:{suc:BAL.kc2.theuKhanBieuBa_c_suc},o:od(lo-5+K.kim*4),w:{},l:{},x:`Lý trưởng với ngươi ${balSg(BAL.eff.jkc2.go_8)} (ngày tuyển ông nói đỡ)`,go:()=>kcAf(ly,BAL.eff.jkc2.go_8),fail:()=>kcAf(ly,BAL.eff.jkc2.fail_3)}),ly,P+"dinh"))}
 if(xd){X.push(kcNeed(kcCard({g:"soc",who:xd.id,n:"Giặt áo cùng Xuân Đào",t:"Hai đứa ngồi bến sông giặt áo, kể chuyện trong xóm, chuyện lệnh tuyển.",k:2,c:{suc:BAL.kc2.giatAoCungXuan_c_suc},o:od(BAL.kc2.giatAoCungXuan_od+xd.af/5),w:{},l:{},x:`Xuân Đào với ngươi ${balSg(BAL.eff.jkc2.go_9)} · nghe chuyện trong xóm`,go:()=>{kcAf(xd,BAL.eff.jkc2.go_9);xd.me+=BAL.eff.jkc2.meGo_3;S.kgt+=BAL.eff.jkc2.kgtGo},fail:()=>{kcAf(xd,BAL.eff.jkc2.fail_4)}}),xd));
  X.push(kcNeed(kcCard({g:"soc",who:xd.id,n:"Dạy Xuân Đào đường kim",t:"Ngươi khéo tay hơn; ngồi chỉ nàng từng mũi thêu.",k:2,c:{suc:BAL.kc2.dayXuanDaoDuong_c_suc},lock:K.kim<2,w:{},x:`Xuân Đào với ngươi ${balSg(BAL.eff.jkc2.go_10)} · nàng khéo tay hơn`,go:()=>{kcAf(xd,BAL.eff.jkc2.go_10);xd.kim=(xd.kim||0)+1}}),xd))}
 if(ba){X.push(kcNeed(kcCard({g:"art",who:ba.id,n:"Học lễ nghi với bà Tư",t:"Mang chút quà sang, xin bà Tư dạy cách đi đứng, quỳ lạy, đáp lời trong cung.",k:3,c:{suc:BAL.kc2.hocLeNghiVoi_c_suc,bac:BAL.kc2.hocLeNghiVoi_c_bac},lock:K.le>=5,o:od(BAL.kc2.hocLeNghiVoi_od+ba.af/3),w:{duc:BAL.kc2.hocLeNghiVoi_w_duc},l:{},x:`Lễ nghi +1 (nay ${K.le}/5, ngày tuyển xem)`,go:()=>{K.le++;kcAf(ba,BAL.eff.jkc2.go_11)},fail:()=>{kcAf(ba,BAL.eff.jkc2.fail_5);log(hasT(ba,"Lạnh lùng")?"Bà Tư gõ thước vào tay ngươi: ‘Quỳ thế thì ma ma đánh chết.’":"Bà Tư mệt, kể chuyện cũ rồi ngủ thiếp đi.")}}),ba));
  X.push(kcNeed(kcCard({g:"art",who:ba.id,tw:"Học lễ nghi với bà Tư",n:"Gánh nước, quét nhà cho bà Tư",t:"Không quà cáp: làm việc nhà cho bà, rồi xin bà dạy.",k:4,c:{suc:BAL.kc2.ganhNuocQuetNha_c_suc},lock:K.le>=5,o:od(BAL.kc2.ganhNuocQuetNha_od+ba.af/3),w:{duc:BAL.kc2.ganhNuocQuetNha_w_duc},l:{},x:`Lễ nghi +1 (nay ${K.le}/5, ngày tuyển xem)`,go:()=>{K.le++;kcAf(ba,BAL.eff.jkc2.go_12)},fail:()=>kcAf(ba,BAL.eff.jkc2.fail_6)}),ba));
  X.push(kcNeed(kcCard({g:"mail",who:ba.id,onceM:"ba",n:"Nghe bà Tư kể chuyện trong cung",t:"Bà kể về Nội vụ phủ, về các ma ma, về những người không về nữa.",k:2,c:{suc:BAL.kc2.ngheBaTuKe_c_suc},w:{tamco:BAL.kc2.ngheBaTuKe_w_tamco},x:"biết thêm về Nội vụ phủ (Lưu ma ma, Tân Giả khố)",go:()=>{K.nvp=(K.nvp||0)+1;log(pick(["Bà Tư dặn: ‘Ở Nội vụ phủ có Lưu ma ma, nghiêm nhất, nhưng ai qua được tay bà ấy thì thành người.’","Bà Tư nói: ‘Vào Tân Giả khố thì tay nứt nẻ, nhưng sống được. Sợ nhất là hầu chủ nóng tính.’","Bà Tư kể: ‘Cung nữ hai mươi lăm tuổi mới được thả về, nếu còn sống.’"]))}}),ba))}
 X.push(kcNeed(kcCard({g:"art",n:"Học chữ với sư cụ",t:"Ngồi cuối lớp trẻ con, xin sư cụ dạy mấy chữ; con gái học chữ, xóm giềng xì xào.",k:2,c:{suc:BAL.kc2.hocChuVoiSu_c_suc,kgt:BAL.kc2.hocChuVoiSu_c_kgt},w:{tai:BAL.kc2.hocChuVoiSu_w_tai},x:"",go:()=>{}}),null,P+"chua"));
 X.push(kcNeed(kcCard({g:"soc",n:"Lễ chùa cầu bình an",t:"Thắp hương cầu cho cha mẹ, cho mình.",k:2,c:{suc:BAL.kc2.leChuaCauBinh_c_suc,bac:BAL.kc2.leChuaCauBinh_c_bac},w:{duc:BAL.kc2.leChuaCauBinh_w_duc},go:()=>{if(me&&roll(BAL.kc2.leChuaCauBinh_odds))K.meOk=(K.meOk||0)+1}}),null,P+"chua"));
 X.push(kcNeed(kcCard({g:"soc",n:"Bán vải ở chợ huyện",t:"Gánh vải ra chợ; người mua ép giá, lái buôn nói chuyện kinh thành.",k:2,c:{suc:BAL.kc2.banVaiOCho_c_suc},o:od(BAL.kc2.banVaiOCho_od+S.tamco/4+K.kim*5),w:{bac:BAL.kc2.banVaiOCho_w_bac+K.kim*2},l:{},x:"nghe một tin trên kinh",go:()=>kcNews(),fail:()=>{apply({bac:BAL.kc2.banVaiOCho_o_bac});log("Lái buôn ép giá; ngươi bán rẻ cho xong.")}}),null,P+"cho"));
 /* Tin tức: what the village knows of the palace — slow, often wrong */
 X.push(kcNeed(kcCard({g:"mail",onceM:"tin",n:"Hỏi tin người đi phu về",t:"Người làng đi phu ở kinh thành về, kể chuyện trong cung.",k:1,c:{suc:BAL.kc2.hoiTinNguoiDi_c_suc},o:od(BAL.kc2.hoiTinNguoiDi_od),w:{},l:{},x:"biết sơ một phi tần trong cung",go:()=>kcIntel(1,2),fail:()=>log("Toàn chuyện nghe lỏm, không biết thật giả.")}),null,P+"dinh"));
 return kc2Twin(X)}
function kc2CardsNc(){const X=[];const L=kc2L();const cha=kcR("cha"),me=kcR("me"),hu=kcR("huynh"),h2=kcR("huynh2"),th=kcR("thuc"),mu=kcR("muoi"),sx=kcR("sx");const K=S.kc;const P=kc2Pre();const bd=kc2Br()==="bd";
 X.push(kcNeed(kcCard({g:"khue",n:"Nghỉ ngơi",t:"Buông rèm, ngủ một giấc.",k:2,w:{suc:BAL.kc2.nghiNgoi_w_suc},rep:1}),null,P+"tam"));
 X.push(kcNeed(kcCard({g:"khue",n:bd?"Cưỡi ngựa sớm":"Múa điệu cố quốc",t:bd?"Phi ngựa ra đồi lúc sương còn đọng.":"Tập điệu múa của mẹ dạy, tay áo xòe như cánh trà.",k:2,c:{suc:BAL.kc2.kc2CardsNc_c_suc},w:bd?{suc:BAL.kc2.kc2CardsNc_o_suc}:{sac:BAL.kc2.kc2CardsNc_o_sac},x:bd?"Sức hồi thêm":"",go:()=>{if(!bd)try{addArt("vu",3)}catch(e){}}}),null,P+(bd?"vien":"tam")));
 X.push(kcNeed(kcCard({g:"khue",n:"Đọc sách Đại Hy",t:"Đọc sách sử, sách lễ của Đại Hy mà sứ đoàn tặng.",k:2,c:{suc:BAL.kc2.docSachDaiHy_c_suc},w:{tai:BAL.kc2.docSachDaiHy_w_tai},x:"",go:()=>{}}),null,P+"tam"));
 /* Vương tộc */
 for(const m of [cha,me].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Vấn an ${m.t.toLowerCase()}`,t:`Đến vấn an ${m.t.toLowerCase()}.`,k:1,c:{suc:BAL.kc2.vanAn_c_suc},w:{},x:`${m.t} với ngươi ${balSg(BAL.eff.jkc2.go_13)}`,go:()=>kcAf(m,BAL.eff.jkc2.go_13)}),m));
 if(cha)X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:`Hầu ${L.dad.toLowerCase()} nghe chính sự`,t:"Ngồi sau rèm nghe các đại thần bàn việc hòa ước.",k:2,c:{suc:BAL.kc2.hau_c_suc},o:od(BAL.kc2.hauNgheChinhSu_od+S.tamco/4+cha.af/5),w:{tamco:BAL.kc2.hau_w_tamco},l:{},x:`${L.dad} với ngươi ${balSg(BAL.eff.jkc2.go_14)} · biết phe chủ chiến tính gì`,go:()=>{kcAf(cha,BAL.eff.jkc2.go_14);S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapGo_2)},fail:()=>{kcAf(cha,BAL.eff.jkc2.fail_7);log("Có đại thần lên tiếng: chuyện nước, nữ nhi không nên nghe.")}}),cha,P+"dien"));
 if(cha)X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Xin thêm hồi môn",t:`Xin ${L.dad.toLowerCase()} gửi theo nhiều lễ vật hơn, để sang Đại Hy không bị khinh.`,k:2,c:{suc:BAL.kc2.xinThemHoiMon_c_suc},o:od(BAL.kc2.xinThemHoiMon_od+cha.af/3+nv(cha,"kc2HmAsk")),onceM:"hm",w:{khm:BAL.kc2.xinThemHoiMon_w_khm},l:{},x:"",go:()=>{},fail:()=>{kcAf(cha,BAL.eff.jkc2.fail_8);log(`${L.dad} cau mày: ‘Kho của nước không phải của riêng con.’`)}}),cha,P+"dien"));
 if(me)X.push(kcNeed(kcCard({g:"fam",who:me.id,n:`Cùng ${L.mom.toLowerCase()} may áo cưới`,t:"Ngồi thêu áo cưới bên mẹ; bà dặn dò chuyện làm vợ nơi đất khách.",k:3,c:{suc:BAL.kc2.cung_c_suc},w:{duc:BAL.kc2.cung_w_duc},x:`${L.mom} với ngươi ${balSg(BAL.eff.jkc2.go_15)}`,go:()=>kcAf(me,BAL.eff.jkc2.go_15)}),me));
 for(const m of [hu,h2].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Trò chuyện với ${m.t.toLowerCase()}`,t:`${m.name} kể chuyện biên giới, chuyện triều đình.`,k:2,c:{suc:BAL.kc2.troChuyenVoi_c_suc},o:od(BAL.kc2.troChuyenVoi_od+m.af/4),w:{},l:{},x:`${m.t} với ngươi ${balSg(BAL.eff.jkc2.go_16)}`,go:()=>{kcAf(m,BAL.eff.jkc2.go_16);m.me+=BAL.eff.jkc2.meGo_4},fail:()=>kcAf(m,BAL.eff.jkc2.fail_9)}),m));
 if(mu){X.push(kcNeed(kcCard({g:"fam",who:mu.id,n:`Kết thân ${mu.t.toLowerCase()}`,t:`Tặng ${mu.name} chiếc trâm bạc, cùng nàng dạo vườn.`,k:2,c:{suc:BAL.kc2.ketThan_c_suc,bac:BAL.kc2.ketThan_c_bac},o:od(BAL.kc2.ketThan_od+mu.af/4),w:{},l:{},x:`${mu.t} với ngươi ${balSg(BAL.eff.jkc2.go_17)}`,go:()=>{kcAf(mu,BAL.eff.jkc2.go_17);mu.me+=BAL.eff.jkc2.meGo_5},fail:()=>{kcAf(mu,BAL.eff.jkc2.fail_10);mu.oan+=BAL.eff.jkc2.oanFail}}),mu));
  X.push(kcNeed(kcCard({g:"fam",who:mu.id,tw:`Kết thân ${mu.t.toLowerCase()}`,n:`Dạy ${mu.t.toLowerCase()} một điệu múa`,t:"Không quà cáp: dạy nàng điệu múa mẹ dạy ngươi.",k:3,c:{suc:BAL.kc2.day_c_suc},o:od(BAL.kc2.dayMotDieuMua_od+mu.af/4),w:{},l:{},x:`${mu.t} với ngươi ${balSg(BAL.eff.jkc2.go_18)}`,go:()=>{kcAf(mu,BAL.eff.jkc2.go_18);mu.me+=BAL.eff.jkc2.meGo_6},fail:()=>kcAf(mu,BAL.eff.jkc2.fail_11)}),mu))}
 if(th)X.push(kcNeed(kcCard({g:"soc",who:th.id,n:"Dò ý Hoàng thúc",t:"Mời Hoàng thúc uống trà, hỏi khéo về phe chủ chiến.",k:2,c:{suc:BAL.kc2.doYHoangThuc_c_suc},o:od(BAL.kc2.doYHoangThuc_od+S.tamco/3),w:{kap:BAL.kc2.doYHoangThuc_w_kap},l:{},x:"biết Hoàng thúc tính gì",go:()=>{K.proof[th.id]=(K.proof[th.id]||0)+1},fail:()=>{kcAf(th,BAL.eff.jkc2.fail_12);th.oan+=BAL.eff.jkc2.oanFail_2;log("Hoàng thúc cười nhạt: ‘Cháu gái hỏi nhiều quá.’")}}),th,P+"dien"));
 /* Triều đình: the envoy and the treaty */
 if(sx&&K.sx){X.push(kcNeed(kcCard({g:"soc",who:sx.id,n:"Tiếp sứ thần Đại Hy",t:"Mời sứ thần dùng trà, hỏi về Đại Hy, về Hoàng thượng.",k:2,c:{suc:BAL.kc2.tiepSuThanDai_c_suc},o:od(BAL.kc2.tiepSuThanDai_od+S.tai/4+S.sac/8),w:{kgt:BAL.kc2.tiepSuThanDai_w_kgt},l:{kgt:BAL.kc2.tiepSuThanDai_l_kgt},x:`Sứ thần với ngươi ${balSg(BAL.eff.jkc2.go_19)} · biết thêm về hậu cung Đại Hy`,go:()=>{kcAf(sx,BAL.eff.jkc2.go_19);if(roll(BAL.kc2.tiepSuThanDai_odds))kcIntel(1,2)},fail:()=>{kcAf(sx,BAL.eff.jkc2.fail_13);log("Sứ thần đáp lễ nhạt nhẽo, mắt nhìn đi chỗ khác.")}}),sx,P+"dich"));
  X.push(kcNeed(kcCard({g:"art",who:sx.id,n:"Học lễ nghi Đại Hy với ma ma sứ đoàn",t:"Ma ma theo sứ đoàn dạy cách quỳ, cách xưng thần thiếp, cách dâng trà.",k:3,c:{suc:BAL.kc2.hocLeNghiDai_c_suc,bac:BAL.kc2.hocLeNghiDai_c_bac},lock:K.le>=5,w:{duc:BAL.kc2.hocLeNghiDai_w_duc},x:`Lễ nghi Đại Hy +1 (nay ${K.le}/5, Lễ ra mắt xem)`,go:()=>{K.le++}}),null,P+"dich"));
  X.push(kcNeed(kcCard({g:"art",tw:"Học lễ nghi Đại Hy với ma ma sứ đoàn",n:"Tự học lễ nghi Đại Hy theo sách",t:"Chép sách lễ, tập quỳ lạy trước gương đến mỏi gối.",k:4,c:{suc:BAL.kc2.tuHocLeNghi_c_suc},lock:K.le>=5,w:{duc:BAL.kc2.tuHocLeNghi_w_duc},x:`Lễ nghi Đại Hy +1 (nay ${K.le}/5, Lễ ra mắt xem)`,go:()=>{K.le++}}),null,P+"tam"));
  X.push(kcNeed(kcCard({g:"mail",who:sx.id,onceM:"thu",n:"Gửi lễ vật cho sứ thần",t:"Gửi sứ thần một hộp trà quý, nhờ ông kể chuyện hậu cung Đại Hy.",k:1,c:{bac:BAL.kc2.guiLeVatCho_c_bac},w:{},x:`biết rõ hai phi tần Đại Hy · sứ thần với ngươi ${balSg(BAL.eff.jkc2.go_20)}`,go:()=>{kcIntel(2,3);kcAf(sx,BAL.eff.jkc2.go_20)}}),sx));
  X.push(kcNeed(kcCard({g:"mail",who:sx.id,tw:"Gửi lễ vật cho sứ thần",onceM:"thu2",n:"Đánh cờ với sứ thần",t:"Mời sứ thần một ván cờ; người thua phải kể một chuyện.",k:3,c:{suc:BAL.kc2.danhCoVoiSu_c_suc},o:od(BAL.kc2.danhCoVoiSu_od+((S.arts||{}).ky||0)*8+S.tai/5),w:{},l:{},x:"biết rõ hai phi tần Đại Hy",go:()=>kcIntel(2,3),fail:()=>{kcAf(sx,BAL.eff.jkc2.fail_14);log("Ngươi thua; sứ thần cười, chỉ kể chuyện thời tiết Đại Hy.")}}),sx,P+"dich"))}
 else X.push(kcCard({g:"soc",n:"Đợi sứ thần Đại Hy",t:"Sứ đoàn Đại Hy chưa đến.",lock:1,k:1}));
 X.push(kcNeed(kcCard({g:"soc",n:"Cầu phúc",t:bd?"Lên miếu thần núi buộc dải vải cầu yên.":"Lên chùa Sùng Thánh thắp hương cầu yên cho hai nước.",k:3,c:{suc:BAL.kc2.cauPhuc_c_suc,bac:BAL.kc2.cauPhuc_c_bac},w:{duc:BAL.kc2.cauPhuc_w_duc,kap:BAL.kc2.cauPhuc_w_kap},x:"",go:()=>{}}),null,P+"mieu"));
 X.push(kcNeed(kcCard({g:"soc",n:"Ra chợ nghe dân nói",t:"Cải trang ra chợ, nghe dân bàn chuyện hòa thân.",k:2,c:{suc:BAL.kc2.raChoNgheDan_c_suc,bac:BAL.kc2.raChoNgheDan_c_bac},o:od(BAL.kc2.raChoNgheDan_od+S.tamco/4),w:{kgt:BAL.kc2.raChoNgheDan_w_kgt},l:{kgt:BAL.kc2.raChoNgheDan_l_kgt},x:"dân thương ngươi thì hòa ước vững",go:()=>{},fail:()=>{S.kld+=8;log("Có người nhận ra công chúa giữa chợ; tin đồn bay khắp kinh đô.")}}),null,P+"cho"));
 X.push(kcNeed(kcCard({g:"khue",n:bd?"Phi ngựa ra thảo nguyên":"Dạo thuyền trên hồ",t:bd?"Một mình phi ngựa đến tận gò cao, nhìn về phương nam.":"Thả thuyền giữa hồ, ngắm ba ngọn tháp.",k:2,c:{suc:BAL.kc2.top_c_suc},w:{suc:BAL.kc2.top_w_suc,duc:BAL.kc2.top_w_duc},x:"lòng nhẹ đi"}),null,P+"ho"));
 return kc2Twin(X)}

/* ---------- the week, the month ---------- */
(function(){const w0=kcWeek;kcWeek=function(){if(!S||!S.kc||!S.kc.kd)return w0.apply(this,arguments);return kc2Week()}})();
/* weekly events: one-off events once; the rest come back after a cool-down in months (a road of two years must not repeat one event every month) */
const KC2CD={d_benh:10,d_ghe:12,d_lai:6,d_lu:12,d_thue:12,d_bac:12,n_hoi:12,n_benh:14,n_yen:10,n_le:99,n_muoi:99,n_thich:99,d_xd:99,d_moi:99};
function kc2Week(){if(Q.length>2)return;const E=[];const K=S.kc;K.evT=K.evT||{};const ok=e=>K.evT[e]==null||S.turn-K.evT[e]>=(KC2CD[e]||99);const add=(e,w)=>{if(w>0&&KCE[e]&&ok(e))E.push([e,w])};
 if(K.kd==="dan"){const me=kcR("me"),ly=kcR("ly"),xd=kcR("xd"),hu=kcR("huynh");
  if(me)add("d_benh",.8);if(ly)add("d_ghe",.6);if(xd)add("d_xd",.6);add("d_lai",.5);if(hu&&hasT(hu,"Ham vui"))add("d_bac",.8);
  if(S.month>=6&&S.month<=9)add("d_lu",1.4);if(S.month>=10)add("d_thue",1);if(S.kap>=BAL.kc2.st.dan.moi)add("d_moi",1)}
 else{const th=kcR("thuc"),mu=kcR("muoi"),cha=kcR("cha");
  if(K.sx&&S.month===6)add("n_hoi",3);if(mu&&K.sx)add("n_muoi",(tv({"Kiêu ngạo":1.2,"Tham vọng":1.4},mu)||.4));if(cha)add("n_benh",.35);
  if(K.sx&&S.month>=5&&S.month<=8)add("n_le",1.2);if(K.sx&&S.kap>=BAL.kc2.st.nc.thich)add("n_thich",.5+S.kap/100);if(th)add("n_yen",.6)}
 const tot=E.reduce((a,x)=>a+x[1],0);if(!tot||!roll(KC.ev))return;let r=Math.random()*tot;for(const [e,w] of E){r-=w;if(r<0){const d=mkP("kcE",{e});if(d){K.evT[e]=S.turn;pushDil(d,KCE[e].t)}return}}}
(function(){const m0=kcMonth;kcMonth=function(){if(!S||!S.kc||!S.kc.kd)return m0.apply(this,arguments);return kc2Month()}})();
function kc2Month(){S.turn++;const K=S.kc;const d=K.kd;
 if(d==="dan"){S.kap+=BAL.eff.jkc2.kapKc2Month;if(S.kap>=BAL.kc2.st.dan.siet&&!K.ev.d_siet){K.ev.d_siet=1;pushDil(mkP("kcE",{e:"d_siet"}),"Chủ nợ đến nhà")}apply({bac:BAL.kc2.kc2Month_o_bac})}
 else{S.kap+=BAL.kc2.st.nc.month+(kcR("thuc")?BAL.kc2.st.nc.monthThuc:0);apply({bac:BAL.kc2.kc2Month_o_bac2});if(S.kap>=BAL.kc2.st.nc.pha&&!K.ev.n_pha){K.ev.n_pha=1;pushDil(mkP("kcE",{e:"n_pha"}),"Phe chủ chiến ra tay")}}
 S.kld=Math.max(0,S.kld-2);for(const m of K.fam){if(!m.alive)continue;m.oan=Math.max(0,(m.oan||0)-BAL.eff.jkc2.oanKc2Month)}
 /* the palace runs on: the same monthly world calls as jkc / the servant road (j42), with her outside */
 kcW(()=>{for(const v of liveRivals(true))stipend(v);rivalsMonth();servRanks();servMonth();oanMonth();restock();heirMonth();moodMonth();try{tdMonth()}catch(e){}return""});if(S.dead)return;
 /* chapters on a fixed calendar, then the sending event */
 const n=S.turn-K.t0;const beat={4:0,10:1,16:2}[n];if(beat!=null&&!S.dead)pushDil(mkP("kcE",{e:(d==="dan"?"d_c":"n_c")+beat}),kc2ChT());
  if(S.turn>=K.due&&!K.sent&&!S.dead){K.sent=1;pushDil(mkP("kcE",{e:d==="dan"?"d_tuyen":"n_send"}),d==="dan"?"Ngày tuyển cung nữ":"Hòa ước ký xong")}
 S.month++;S.tuan=0;if(S.month>12){S.month=1;S.year++;S.age++;try{S.emp.age++;ageYear()}catch(e){}try{allKids().forEach(([kk])=>{if(kk.alive)kk.age++})}catch(e){}for(const m of K.fam)m.age++}
 if(S.suc<=BAL.kc2.kc2Month_min_suc&&isKc())kcDie(d==="dan"?"Lao lực mà chết trước ngày tuyển":"Kiệt sức mà chết trước ngày hòa thân")}
function kc2ChT(){return S.kc.kd==="dan"?"Lệnh tuyển cung nữ":"Hòa ước"}
/* the jkc tuyển tú never starts on these roads */
(function(){const s0=kcSoTuyen;kcSoTuyen=function(){if(S&&S.kc&&S.kc.kd)return;return s0.apply(this,arguments)}})();
(function(){const t0=kcTuyen;kcTuyen=function(){if(S&&S.kc&&S.kc.kd)return;return t0.apply(this,arguments)}})();

/* ---------- events (PEND kcE; options show only costs + one true hint, KIT §28.6; results show the numbers) ---------- */
function kc2H(o,hint,risk){o.hint=hint;o.risk=risk||"an toàn";return o}
function kc2Go(t,f){return()=>kcDo(t,f)}
Object.assign(KCE,{
 /* --- dan --- */
 d_benh:{t:"Mẹ trở bệnh",b:()=>{const me=kcR("me");S.kc.ev.d_benh=1;const hard=nv(me,"kc2MeSick");const ok=(S.kc.meOk||0)*12;return{who:kcFace(me),t:`<p>Mẹ ho suốt đêm, sáng ra sốt hầm hập. Thầy lang trong làng lắc đầu: phải có thuốc trên huyện.</p>`,o:[
  kc2H(kcO("Bán đôi khuyên bạc mua thuốc",{bac:BAL.kc2.d_benh_o_bac},kc2Go("Mẹ trở bệnh",()=>{if(roll(BAL.kc2.banDoiKhuyenBac_rb+ok-hard)){kcAf(me,BAL.eff.jkc2.o);return"Thuốc huyện tốt; mẹ qua cơn."}kcAf(me,BAL.eff.jkc2.o_2);apply({suc:BAL.kc2.d_benh_o_suc});return"Mẹ đỡ sốt mà còn yếu."}),{dis:S.bac<BAL.kc2.d_benh_min_bac}),"mẹ dễ qua cơn","có rủi ro"),
  kc2H(kcO("Thức đêm sắc lá, chườm cho mẹ",{suc:BAL.kc2.d_benh_o_suc2},kc2Go("Mẹ trở bệnh",()=>{if(roll(BAL.kc2.thucDemSacLa_rb+ok+((S.arts||{}).y||0)*10-hard)){kcAf(me,BAL.eff.jkc2.o_3);apply({duc:BAL.kc2.d_benh_o_duc});return"Ba đêm không ngủ; mẹ hạ sốt."}kcAf(me,BAL.eff.jkc2.o_4);S.kap+=BAL.eff.jkc2.kapO;return"Mẹ không đỡ; cha phải vay thêm tiền cắt thuốc."})),"lòng mẹ thêm thương; khỏi hay không tùy tay ngươi","có rủi ro"),
  kc2H(kcO("Mời thầy cúng về nhà",{bac:BAL.kc2.d_benh_o_bac2},kc2Go("Mẹ trở bệnh",()=>{if(roll(BAL.kc2.moiThayCungVe_rb+ok-hard)){kcAf(me,BAL.eff.jkc2.o_5);return"Mẹ tự khỏi sau mấy ngày."}apply({suc:BAL.kc2.d_benh_o_suc3});S.kap+=BAL.eff.jkc2.kapO_2;return"Thầy cúng ăn xong rồi về; mẹ nằm thêm nửa tháng."}),{dis:S.bac<BAL.kc2.d_benh_min_bac2}),"tốn ít; hiếm khi được việc","liều")]}}},
 d_ghe:{t:"Con trai lý trưởng",b:()=>{const ly=kcR("ly");const cha=kcR("cha");S.kc.ev.d_ghe=1;return{who:kcFace(ly),t:`<p>Con trai lý trưởng chặn ngươi ở bờ đê, buông lời trêu ghẹo trước mặt đám trai làng.</p>`,o:[
  kc2H(kcO("Nghiêm mặt mắng lại",{},kc2Go("Bờ đê",()=>{if(roll(BAL.kc2.nghiemMatMangLai_rb+S.duc/5)){S.kgt+=BAL.eff.jkc2.kgtO;kcAf(ly,BAL.eff.jkc2.o_6);return"Hắn bẽ mặt bỏ đi; các bà trong xóm khen ngươi."}S.kld+=8;kcAf(ly,BAL.eff.jkc2.o_7);return"Hắn cười to, đi khắp xóm nói ngươi chua ngoa."})),"giữ được tiếng; lý trưởng có thể phật ý","có rủi ro"),
  kc2H(kcO("Cúi đầu đi nhanh",{},kc2Go("Bờ đê",()=>{S.kld+=4;apply({duc:BAL.kc2.d_ghe_o_duc});return"Ngươi đi nhanh; tiếng cười đuổi theo sau lưng."})),"tránh chuyện; lời ra tiếng vào","an toàn"),
  kc2H(kcO("Về kể với cha",{},kc2Go("Bờ đê",()=>{if(cha&&hasT(cha,"Nóng nảy")&&roll(BAL.kc2.d_ghe_odds)){S.kap+=BAL.eff.jkc2.kapO_3;kcAf(ly,BAL.eff.jkc2.o_8);kcAf(cha,BAL.eff.jkc2.o_9);return"Cha cầm đòn gánh sang nhà lý trưởng; ông bắt nhà ngươi trả nợ sớm."}if(cha)kcAf(cha,BAL.eff.jkc2.o_10);S.kgt+=BAL.eff.jkc2.kgtO_2;return"Cha sang nói phải trái; con lý trưởng thôi không dám."})),"cha bênh ngươi; tùy tính cha mà yên hay thêm chuyện","có rủi ro")]}}},
 d_xd:{t:"Xuân Đào khóc",b:()=>{const xd=kcR("xd");S.kc.ev.d_xd=1;return{who:kcFace(xd),t:`<p>Xuân Đào ngồi khóc ở bến sông: nhà nàng định gả nàng cho một lão phú hộ để trừ nợ, trước ngày tuyển.</p>`,o:[
  kc2H(kcO("Góp bạc giúp nhà nàng trả nợ",{bac:BAL.kc2.d_xd_o_bac},kc2Go("Xuân Đào",()=>{kcAf(xd,BAL.eff.jkc2.o_11);xd.me+=BAL.eff.jkc2.meO;return"Nhà Xuân Đào hoãn chuyện gả. Nàng nắm tay ngươi không buông."}),{dis:S.bac<BAL.kc2.d_xd_min_bac}),"Xuân Đào mang ơn ngươi rất nhiều","an toàn"),
  kc2H(kcO("Bày cho nàng ghi tên đi tuyển",{suc:BAL.kc2.d_xd_o_suc},kc2Go("Xuân Đào",()=>{if(roll(BAL.kc2.bayChoNangGhi_rb+S.tamco/3)){kcAf(xd,BAL.eff.jkc2.o_12);return"Lý trưởng ghi tên Xuân Đào; nhà phú hộ không dám đòi nữa."}kcAf(xd,BAL.eff.jkc2.o_13);S.kgt-=BAL.eff.jkc2.kgtO_3;return"Nhà phú hộ biết chuyện, nói ra nói vào khắp xóm."})),"nàng thoát được, nếu ngươi khéo","có rủi ro"),
  kc2H(kcO("Khuyên nàng nghe lời cha mẹ",{},kc2Go("Xuân Đào",()=>{kcAf(xd,BAL.eff.jkc2.o_14);xd.oan+=BAL.eff.jkc2.oanO;apply({duc:BAL.kc2.d_xd_o_duc});return"Xuân Đào lau nước mắt, không nói gì nữa."})),"giữ lễ; nàng buồn lòng với ngươi","an toàn")]}}},
 d_lai:{t:"Lái buôn hỏi vải",b:()=>{const K=S.kc;return{who:pMe(),t:`<p>Một lái buôn trên kinh xem tấm vải ngươi dệt, trả giá cao, nhưng muốn ngươi dệt riêng cho hắn cả tháng.</p>`,o:[
  kc2H(kcO("Nhận lời dệt riêng",{suc:BAL.kc2.d_lai_o_suc},kc2Go("Lái buôn",()=>{if(roll(BAL.kc2.nhanLoiDetRieng_rb+K.kim*8)){apply({bac:BAL.kc2.d_lai_o_bac});K.kim=Math.min(5,K.kim+1);return"Hắn trả đủ bạc, còn khen tay ngươi khéo."}apply({bac:BAL.kc2.d_lai_o_bac2});return"Hắn chê vải không đều, chỉ trả một nửa."})),"được bạc nếu tay đủ khéo","có rủi ro"),
  kc2H(kcO("Từ chối, bán ở chợ như cũ",{},kc2Go("Lái buôn",()=>{apply({bac:BAL.kc2.d_lai_o_bac3});return"Ngươi bán tấm vải ở chợ, giá thường."})),"ít bạc mà chắc","an toàn")]}}},
 d_bac:{t:"Huynh trưởng thua bạc",b:()=>{const h=kcR("huynh");S.kc.ev.d_bac=1;return{who:kcFace(h),t:`<p>${h.name} thua bạc ở chợ huyện, lén xin ngươi số bạc dành dụm, đừng cho cha biết.</p>`,o:[
  kc2H(kcO("Đưa bạc",{bac:BAL.kc2.d_bac_o_bac},kc2Go("Thua bạc",()=>{kcAf(h,BAL.eff.jkc2.o_15);if(roll(BAL.kc2.d_bac_odds)){S.kap+=BAL.eff.jkc2.kapO_4;return"Huynh trưởng trả nợ xong lại đi đánh tiếp."}return"Huynh trưởng thề chừa."}),{dis:S.bac<BAL.kc2.d_bac_min_bac}),"huynh mang ơn; có khi chứng nào tật nấy","có rủi ro"),
  kc2H(kcO("Mách cha",{},kc2Go("Thua bạc",()=>{kcAf(h,BAL.eff.jkc2.o_16);h.oan+=BAL.eff.jkc2.oanO_2;const c=kcR("cha");if(c)kcAf(c,BAL.eff.jkc2.o_17);return"Cha đánh huynh trưởng mấy roi; huynh nhìn ngươi không nói."})),"huynh mang oán; cha vừa lòng","an toàn"),
  kc2H(kcO("Từ chối, giữ kín",{},kc2Go("Thua bạc",()=>{kcAf(h,BAL.eff.jkc2.o_18);if(roll(BAL.kc2.d_bac_odds2)){S.kap+=BAL.eff.jkc2.kapO_5;S.kgt-=BAL.eff.jkc2.kgtO_4;return"Chủ sòng đến tận nhà đòi; cả xóm biết."}return"Huynh trưởng tự xoay xở được."})),"có thể chủ sòng đến tận nhà","có rủi ro")]}}},
 d_lu:{t:"Nước lên",b:()=>{const cha=kcR("cha");S.kc.ev.d_lu=1;return{who:kcFace(cha||S.kc.fam[0]),t:`<p>Mưa lũ ba ngày. Nước sông tràn bờ, ruộng nhà ngập trắng; khung cửi của mẹ kê dưới mái thấp.</p>`,o:[
  kc2H(kcO("Ra đồng cứu lúa cùng cha",{suc:BAL.kc2.d_lu_o_suc},kc2Go("Nước lên",()=>{if(roll(BAL.kc2.raDongCuuLua_rb+S.suc/5)){S.kap-=BAL.eff.jkc2.kapO_6;if(cha)kcAf(cha,BAL.eff.jkc2.o_19);return"Cứu được nửa ruộng lúa; vụ này đủ trả lãi."}apply({suc:BAL.kc2.d_lu_o_suc2});S.kap+=BAL.eff.jkc2.kapO_7;return"Nước lên nhanh quá; ngươi trượt chân, suýt bị cuốn đi."})),"cứu được lúa thì nhẹ nợ; nước xiết có thể nguy","liều"),
  kc2H(kcO("Ở nhà kê cao khung cửi, đồ đạc",{suc:BAL.kc2.d_lu_o_suc2},kc2Go("Nước lên",()=>{S.kap+=BAL.eff.jkc2.kapO_8;S.kc.kim++;return"Khung cửi còn nguyên, nhưng ruộng mất trắng; nợ nặng thêm."})),"giữ được khung cửi; ruộng mất, nợ nặng thêm","an toàn"),
  kc2H(kcO("Sang giúp nhà Xuân Đào",{suc:BAL.kc2.d_lu_o_suc3},kc2Go("Nước lên",()=>{const xd=kcR("xd");if(xd)kcAf(xd,BAL.eff.jkc2.o_20);S.kgt+=BAL.eff.jkc2.kgtO_5;S.kap+=BAL.eff.jkc2.kapO_9;return"Cả xóm thấy ngươi lội nước sang nhà Xuân Đào."})),"xóm giềng nhớ ơn; nhà mình thiệt","an toàn")]}}},
 d_thue:{t:"Thuế đinh",b:()=>{const cha=kcR("cha");S.kc.ev.d_thue=1;return{who:kcFace(kcR("ly")||cha),t:`<p>Lý trưởng đi thu thuế đinh. Nhà không đủ; không nộp thì cha phải đi phu đắp đê ba tháng.</p>`,o:[
  kc2H(kcO("Nộp bằng bạc dành dụm",{bac:BAL.kc2.d_thue_o_bac},kc2Go("Thuế đinh",()=>{if(cha)kcAf(cha,BAL.eff.jkc2.o_21);return"Cha ở nhà; ngươi trắng tay."}),{dis:S.bac<BAL.kc2.d_thue_min_bac}),"cha ở nhà","an toàn"),
  kc2H(kcO("Để cha đi phu, ngươi gánh việc nhà",{suc:BAL.kc2.d_thue_o_suc},kc2Go("Thuế đinh",()=>{if(cha){kcAf(cha,BAL.eff.jkc2.o_22);if(roll(BAL.kc2.d_thue_odds)){apply({suc:BAL.kc2.d_thue_o_suc2});return"Cha đi phu về gầy rộc, ho mãi không dứt."}}S.kgt+=BAL.eff.jkc2.kgtO_6;return"Ba tháng ngươi làm thay việc cha."})),"tiết kiệm bạc; cha cực, có khi ốm","có rủi ro"),
  kc2H(kcO("Xin lý trưởng khất",{},kc2Go("Thuế đinh",()=>{const ly=kcR("ly");if(ly&&roll(BAL.kc2.xinLyTruongKhat_rb+ly.af/2)){return"Lý trưởng cho khất đến vụ sau."}S.kap+=BAL.eff.jkc2.kapO_10;return"Lý trưởng cộng thuế vào nợ, tính lãi."})),"tùy lòng lý trưởng; không thì nợ nặng thêm","có rủi ro")]}}},
 d_moi:{t:"Bà mối nhà phú hộ",b:()=>{S.kc.ev.d_moi=1;const cha=kcR("cha");return{who:kcFace(cha||S.kc.fam[0]),t:`<p>Bà mối đến: lão phú hộ đầu làng muốn lấy ngươi làm thiếp, trả hết nợ cho nhà. Cha mẹ nhìn nhau, chưa nói gì.</p>`,o:[
  kc2H(kcO("Xin cha từ chối",{},kc2Go("Bà mối",()=>{if(cha&&roll(BAL.kc2.xinChaTuChoi_rb+cha.af/2)){kcAf(cha,BAL.eff.jkc2.o_23);return"Cha gạt đi: ‘Con tôi không làm thiếp.’"}S.kap+=BAL.eff.jkc2.kapO_11;if(cha)kcAf(cha,BAL.eff.jkc2.o_24);return"Cha từ chối, mà mặt buồn; nợ vẫn còn đó."})),"giữ mình; nợ còn nguyên","an toàn"),
  kc2H(kcO("Nhận lời làm thiếp, trả nợ cho nhà",{},()=>kc2End("Làm thiếp nhà phú hộ",`Nàng về làm thiếp lão phú hộ đầu làng. Nợ nhà trả hết; mẹ khóc suốt đám cưới.`)),"trả hết nợ; kiếp này dừng ở quê","an toàn")]}}},
 d_siet:{t:"Chủ nợ đến nhà",b:()=>{const ly=kcR("ly");return{who:kcFace(ly||S.kc.fam[0]),t:`<p>Nhà lý trưởng cho người đến siết nợ: không trả thì lấy ruộng, hoặc đưa ngươi về làm người ở.</p>`,o:[
  kc2H(kcO("Đưa hết bạc dành dụm",{bac:-Math.min(S.bac,25)},kc2Go("Siết nợ",()=>{S.kap=BAL.kc2.st.dan.sietLeft[0];return"Họ cầm bạc, hẹn tháng sau."})),"nợ nhẹ bớt","an toàn"),
  kc2H(kcO("Để họ lấy ruộng",{},kc2Go("Siết nợ",()=>{S.kap=BAL.kc2.st.dan.sietLeft[1];const c=kcR("cha");if(c)kcAf(c,BAL.eff.jkc2.o_25);S.kgt-=BAL.eff.jkc2.kgtO_7;return"Cha ngồi nhìn ruộng bị lấy, không ăn cơm."})),"nhà mất ruộng, nợ còn một nửa","an toàn"),
  kc2H(kcO("Theo họ về làm người ở",{},()=>kc2End("Làm người ở nhà lý trưởng","Nàng về làm người ở nhà lý trưởng trừ nợ. Ngày Nội vụ phủ về huyện, tên nàng không có trong sổ.")),"trừ hết nợ; kiếp này dừng ở quê","an toàn")]}}},
 /* --- nc / bd --- */
 n_hoi:{get t(){return kc2L().fest[0]},b:()=>{S.kc.ev.n_hoi=1;const L=kc2L();const sx=kcR("sx");return{who:pMe(),t:`<p>${L.fest[1]} Sứ thần Đại Hy cũng được mời.</p>`,o:[
  kc2H(kcO(kc2Br()==="bd"?"Ra sân đua ngựa":"Múa giữa vòng đuốc",{suc:BAL.kc2.n_hoi_o_suc},()=>{const b=rsnap();const raw=((S.arts||{}).vu||0)*12+S.sac/3+(kc2Br()==="bd"?S.suc/4:0)+R(30);let t;if(raw>=55){S.kgt+=BAL.eff.jkc2.kgtO_8;apply({danh:BAL.kc2.n_hoi_o_danh});if(sx)kcAf(sx,BAL.eff.jkc2.o_26);t="Cả hội reo hò; sứ thần ghi tên ngươi vào thư gửi về Đại Hy."}else{apply({danh:BAL.kc2.n_hoi_o_danh2});t="Ngươi vấp một nhịp; người ta vẫn vỗ tay, vì ngươi là công chúa."}kcRes(KC2LAND[kc2Br()].fest[0],b,t)}),"làm tốt thì sứ thần nhớ ngươi, hòa ước thêm nặng","có rủi ro"),
  kc2H(kcO("Ngồi cạnh mẫu thân xem hội",{},kc2Go(KC2LAND[kc2Br()].fest[0],()=>{const me=kcR("me");if(me)kcAf(me,BAL.eff.jkc2.o_27);return"Một đêm hội cuối cùng ở cố quốc."})),"mẹ vui lòng","an toàn")]}}},
 n_muoi:{get t(){const m=kcR("muoi");return `${m?m.t:"Vương muội"} tranh phần`},b:()=>{const mu=kcR("muoi");S.kc.ev.n_muoi=1;return{who:kcFace(mu),t:`<p>${mu.t} ${mu.name} lén gặp sứ thần Đại Hy, nói rằng nàng mới là người đáng đi hòa thân.</p>`,o:[
  kc2H(kcO("Mặc nàng",{},kc2Go("Vương muội",()=>{S.kgt-=BAL.eff.jkc2.kgtO_9;mu.danh=(mu.danh||5)+4;return"Sứ thần bắt đầu hỏi han về vương muội."})),"thế của ngươi trong hòa ước yếu đi","an toàn"),
  kc2H(kcO("Nói chuyện thẳng với nàng",{suc:BAL.kc2.n_muoi_o_suc},kc2Go("Vương muội",()=>{if(roll(BAL.kc2.noiChuyenThangVoi_rb+mu.af/2+nv(mu,"kc2MuTalk"))){kcAf(mu,BAL.eff.jkc2.o_28);return"Nàng khóc: nàng chỉ sợ bị gả cho một tộc trưởng già. Hai chị em làm lành."}mu.oan+=BAL.eff.jkc2.oanO_3;kcAf(mu,BAL.eff.jkc2.o_29);return"Nàng cười lạnh, bỏ đi."})),"tùy lòng nàng mà hóa giải hay thành thù","có rủi ro"),
  kc2H(kcO("Tâu với phụ thân",{},kc2Go("Vương muội",()=>{const c=kcR("cha");if(c&&roll(BAL.kc2.tauVoiPhuThan_rb+c.af/3)){mu.oan+=BAL.eff.jkc2.oanO_4;kcAf(mu,BAL.eff.jkc2.o_30);S.kgt+=BAL.eff.jkc2.kgtO_10;return"Nàng bị cấm túc; sứ thần thôi hỏi han."}S.kgt-=BAL.eff.jkc2.kgtO_11;if(c)kcAf(c,BAL.eff.jkc2.o_31);return"Phụ thân gạt đi: ‘Chuyện con gái, tự giải quyết.’"})),"có thể dẹp yên, có thể bị gạt","có rủi ro")]}}},
 n_benh:{get t(){return `${kc2L().dad} ngã bệnh`},b:()=>{const c=kcR("cha");S.kc.ev.n_benh=1;const L=kc2L();return{who:kcFace(c),t:`<p>${L.dad} ngã bệnh giữa mùa. Phe chủ chiến xì xào: nếu ngài không qua khỏi, hòa ước cũng thôi.</p>`,o:[
  kc2H(kcO("Ngày đêm hầu thuốc",{suc:BAL.kc2.n_benh_o_suc},kc2Go("Hầu bệnh",()=>{kcAf(c,BAL.eff.jkc2.o_32);apply({duc:BAL.kc2.n_benh_o_duc});S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_12);return `${L.dad} qua khỏi; ngài nắm tay ngươi rất lâu.`})),"phụ thân thương ngươi hơn","an toàn"),
  kc2H(kcO("Xin sứ đoàn mời thầy thuốc Đại Hy",{suc:BAL.kc2.n_benh_o_suc2},kc2Go("Hầu bệnh",()=>{const sx=kcR("sx");if(sx&&roll(BAL.kc2.xinSuDoanMoi_rb+sx.af/2)){kcAf(c,BAL.eff.jkc2.o_33);S.kgt+=BAL.eff.jkc2.kgtO_12;return"Thầy thuốc Đại Hy chữa khỏi; cả triều thấy hòa ước có ích."}S.kap+=BAL.eff.jkc2.kapO_13;return"Phe chủ chiến nói ngươi rước người ngoài vào hại vua cha."})),"tùy lòng sứ thần; hỏng thì phe chủ chiến có cớ","có rủi ro")]}}},
 n_le:{t:"Điều khoản hòa ước",b:()=>{S.kc.ev.n_le=1;const L=kc2L();return{who:kcFace(kcR("cha")),t:`<p>Sứ thần Đại Hy đưa ra điều khoản: ${kc2Br()==="bd"?"Bắc Địch giữ yên biên ải mười năm, mở chợ ngựa":"Nam Chiếu triều cống mỗi năm, mở đường muối"}; công chúa sang Đại Hy làm phi. ${L.dad} hỏi ý ngươi về một điều.</p>`,o:[
  kc2H(kcO("Xin giữ quyền thư từ với cố quốc",{suc:BAL.kc2.n_le_o_suc},kc2Go("Hòa ước",()=>{const sx=kcR("sx");if(roll(BAL.kc2.xinGiuQuyenThu_rb+S.tai/4+(sx?sx.af/4:0))){S.kgt+=BAL.eff.jkc2.kgtO_13;S.kc.thu=1;return"Sứ thần đồng ý ghi thêm một dòng."}S.kgt-=BAL.eff.jkc2.kgtO_14;return"Sứ thần nói: công chúa đã là người Đại Hy."})),"được thì hòa ước nặng hơn","có rủi ro"),
  kc2H(kcO("Không đòi gì, để hai bên định",{},kc2Go("Hòa ước",()=>{apply({duc:BAL.kc2.n_le_o_duc});return"Ngươi im lặng; các đại thần quyết hết."})),"giữ lễ","an toàn")]}}},
 n_thich:{t:"Thích khách",b:()=>{S.kc.ev.n_thich=1;return{who:pMe(),t:`<p>Đêm khuya, một bóng đen lẻn vào ${kc2L().P.tam.toLowerCase()}. Phe chủ chiến muốn công chúa chết, để hòa ước tan.</p>`,o:[
  kc2H(kcO("Kêu cứu",{},kc2Go("Thích khách",()=>{if(roll(BAL.kc2.n_thich_odds)){S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_14);return"Thị vệ bắt được thích khách; hắn khai ra người của phe chủ chiến."}apply({suc:BAL.kc2.n_thich_o_suc});return"Thích khách chạy thoát; ngươi bị thương ở vai."})),"thường thoát; có khi bị thương","có rủi ro"),
  kc2H(kcO("Tự mình chống trả",{suc:BAL.kc2.n_thich_o_suc2},()=>{const b=rsnap();if(roll(BAL.kc2.tuMinhChongTra_rb+S.suc/3+(kc2Br()==="bd"?BAL.kc2.st.nc.bdRoll:0))){S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_15);S.kgt+=BAL.eff.jkc2.kgtO_15;kcRes("Thích khách",b,"Ngươi đánh rơi dao của hắn; cả triều phục.")}else if(roll(BAL.kc2.n_thich_odds2)){kcDie("Chết dưới dao thích khách đêm trước ngày hòa thân")}else{apply({suc:BAL.kc2.n_thich_o_suc3});kcRes("Thích khách",b,"Ngươi bị thương nặng, nằm nửa tháng.")}}),"thắng thì cả triều phục; thua có thể mất mạng","liều")]}}},
 n_yen:{t:"Hoàng thúc mời yến",b:()=>{const th=kcR("thuc");S.kc.ev.n_yen=1;return{who:kcFace(th),t:`<p>Hoàng thúc mời ngươi dự yến riêng. Giữa tiệc, ông nói khẽ: chỉ cần ngươi giả bệnh, hòa ước sẽ hoãn, và Nam Chiếu khỏi phải cúi đầu.</p>`,o:[
  kc2H(kcO("Từ chối thẳng",{},kc2Go("Yến riêng",()=>{th.oan+=BAL.eff.jkc2.oanO_5;kcAf(th,BAL.eff.jkc2.o_34);S.kap+=BAL.eff.jkc2.kapO_16;return"Hoàng thúc nâng chén, mắt lạnh như băng."})),"giữ hòa ước; Hoàng thúc mang oán","an toàn"),
  kc2H(kcO("Nhận lời cho êm, rồi tâu phụ vương",{suc:BAL.kc2.n_yen_o_suc},kc2Go("Yến riêng",()=>{const c=kcR("cha");if(roll(BAL.kc2.nhanLoiChoEm_rb+S.tamco/3)){S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_17);if(c)kcAf(c,BAL.eff.jkc2.o_35);return"Phụ vương cắt quyền của Hoàng thúc; phe chủ chiến yếu hẳn."}th.oan+=BAL.eff.jkc2.oanO_6;S.kld+=10;return"Hoàng thúc biết ngươi hai lòng; tin đồn ngươi phản bội bay khắp triều."})),"khéo thì dẹp được phe chủ chiến; vụng thì thành thù","liều")]}}},
 n_pha:{t:"Phe chủ chiến ra tay",b:()=>{const c=kcR("cha");return{who:kcFace(kcR("thuc")||c),t:`<p>Phe chủ chiến dâng biểu đòi xé hòa ước, đem quân ra biên giới. ${kc2L().dad} nhìn ngươi.</p>`,o:[
  kc2H(kcO("Quỳ trước triều xin giữ hòa ước",{suc:BAL.kc2.n_pha_o_suc},kc2Go("Triều đình",()=>{if(roll(BAL.kc2.quyTruocTrieuXin_rb+S.kgt/2+(c?c.af/5:0))){S.kap=BAL.kc2.st.nc.phaLeft[0];S.kgt+=BAL.eff.jkc2.kgtO_16;return"Cả triều lặng đi; phụ thân bác biểu."}S.kap=BAL.kc2.st.nc.phaLeft[1];S.kgt-=BAL.eff.jkc2.kgtO_17;return"Biểu bị bác, nhưng sứ thần Đại Hy đã nghe hết; thế của ngươi yếu đi."})),"được thì hòa ước vững","có rủi ro"),
  kc2H(kcO("Im lặng chờ phụ thân quyết",{},kc2Go("Triều đình",()=>{S.kap=BAL.kc2.st.nc.phaLeft[2];S.kgt-=BAL.eff.jkc2.kgtO_18;return"Phụ thân hoãn bàn; ai cũng thấy công chúa không có tiếng nói."})),"hòa ước lung lay","an toàn")]}}}});

/* ---------- chapters: three hồi on a fixed calendar (months 4, 10, 16, as jkc), outcomes by the people of this life ---------- */
const KC2CH={
 d_c0:()=>{const ly=kcR("ly"),cha=kcR("cha"),me=kcR("me");const gr=tv(TRW,ly)||1;return{who:kcFace(ly||cha),t:`<p class="past">Lệnh tuyển cung nữ · hồi 1/3</p><p>Lý trưởng đọc lệnh trên huyện: Nội vụ phủ về chọn cung nữ, mỗi xã mấy người, con gái mười tám đến hai mươi, nhà lương thiện. Tên ngươi đã ở trong sổ. Mẹ ngồi lặng bên bếp.</p>`,o:[
  kc2H(kcO("Để tên trong sổ, mong đổi đời cho nhà",{},kc2Go("Lệnh tuyển · hồi 1",()=>{S.kc.want=1;S.kgt+=BAL.eff.jkc2.kgtO_19;if(cha)kcAf(cha,nv(cha,"kc2ChaWant"));if(me)kcAf(me,nv(me,"kc2MeWant"));return"Cha gật đầu; mẹ quay đi lau nước mắt."})),"cha tùy tính mà vui hay lặng; mẹ buồn","an toàn"),
  kc2H(kcO("Xin cha lo gạch tên",{bac:BAL.kc2.top_o_bac},kc2Go("Lệnh tuyển · hồi 1",()=>{if(ly&&roll(BAL.kc2.xinChaLoGach_rb+ly.af/3+gr*25)){S.kc.gach=1;S.kap+=BAL.eff.jkc2.kapO_18;return"Lý trưởng nhận lễ, gạch tên ngươi; cha phải vay thêm nợ."}S.kgt-=BAL.eff.jkc2.kgtO_20;if(ly)kcAf(ly,BAL.eff.jkc2.o_36);return ly&&hasT(ly,"Cương trực")?"Lý trưởng nổi giận: ‘Lệnh vua mà dám đút lót!’ Cả xóm biết.":"Lý trưởng nhận lễ mà tên vẫn còn đó."}),{dis:S.bac<BAL.kc2.top_min_bac}),"tùy lý trưởng; được thì không phải đi, nợ nặng thêm","liều")]}},
 d_c1:()=>{const ly=kcR("ly"),cha=kcR("cha");return{who:kcFace(cha||ly),t:`<p class="past">Lệnh tuyển cung nữ · hồi 2/3</p><p>Người trên huyện về nói: nhà nào có con gái được chọn thì được tiền an gia, đủ trừ một nửa món nợ. Cha hỏi ngươi có muốn nhận trước không, vì nhận rồi thì không đổi ý được.</p>`,o:[
  kc2H(kcO("Nhận tiền an gia trả nợ",{},kc2Go("Lệnh tuyển · hồi 2",()=>{S.kc.gach=0;S.kc.angia=1;S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_19);if(cha)kcAf(cha,BAL.eff.jkc2.o_37);return"Nhà trả được nửa nợ. Tên ngươi đã gắn với ngày tuyển."})),"nợ nhẹ hẳn; không còn đường lùi","an toàn"),
  kc2H(kcO("Tự làm trả nợ, giữ đường lùi",{suc:BAL.kc2.top_o_suc},kc2Go("Lệnh tuyển · hồi 2",()=>{S.kc.kim++;if(roll(BAL.kc2.tuLamTraNo_rb+S.kc.kim*6)){S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_20);return"Cả tháng ngươi dệt đến khuya; nợ nhẹ được một ít."}S.kap+=BAL.eff.jkc2.kapO_21;apply({suc:BAL.kc2.top_o_suc2});return"Ngươi ốm một trận; vải dệt dở, nợ vẫn thế."})),"giữ đường lùi; khéo tay thêm, nợ nhẹ ít","có rủi ro")]}},
 d_c2:()=>{const xd=kcR("xd"),me=kcR("me");return{who:kcFace(xd||me),t:`<p class="past">Lệnh tuyển cung nữ · hồi 3/3</p><p>Tối trước ngày lên huyện, Xuân Đào sang nhà. Nàng cũng có tên trong sổ. Nàng nói khẽ: vào đó rồi, hai đứa có còn là chị em không?</p>`,o:[
  kc2H(kcO("Hứa cùng nàng giữ nhau trong cung",{},kc2Go("Lệnh tuyển · hồi 3",()=>{if(xd){kcAf(xd,BAL.eff.jkc2.o_38);xd.me+=BAL.eff.jkc2.meO_2}S.kc.pact=1;return"Hai đứa móc ngón tay dưới đèn dầu."})),"có một người chị em trong cung; cũng là một mối lo","an toàn"),
  kc2H(kcO("Dặn nàng giữ mình, ai lo phận nấy",{},kc2Go("Lệnh tuyển · hồi 3",()=>{if(xd){kcAf(xd,BAL.eff.jkc2.o_39);xd.oan+=BAL.eff.jkc2.oanO_7}apply({tamco:BAL.kc2.top_o_tamco});return"Xuân Đào cúi đầu, về sớm."})),"Tâm cơ tăng; nàng buồn lòng","an toàn"),
  kc2H(kcO("Ngồi cả đêm bên mẹ",{},kc2Go("Lệnh tuyển · hồi 3",()=>{if(me)kcAf(me,BAL.eff.jkc2.o_40);apply({duc:BAL.kc2.top_o_duc,suc:BAL.kc2.top_o_suc3});return"Mẹ chải tóc cho ngươi lần cuối, giắt vào đó một chiếc trâm gỗ."})),"mẹ yên lòng; Đức tăng","an toàn")]}},
 n_c0:()=>{const c=kcR("cha"),sx=kcR("sx");const L=kc2L();S.kc.sx=1;return{who:kcFace(sx||c),t:`<p class="past">Hòa ước · hồi 1/3</p><p>Sứ thần Đại Hy đến ${L.court}, dâng lễ vật và một tờ thư: Đại Hy muốn hòa ước, và muốn một công chúa. ${L.dad} cho gọi ngươi ra mắt sứ thần.</p>`,o:[
  kc2H(kcO("Ra mắt đoan trang, đáp lời bằng tiếng Đại Hy",{suc:BAL.kc2.top_o_suc2},kc2Go("Hòa ước · hồi 1",()=>{if(roll(BAL.kc2.raMatDoanTrang_rb+S.tai/3+S.kc.le*6)){S.kgt+=BAL.eff.jkc2.kgtO_21;if(sx)kcAf(sx,BAL.eff.jkc2.o_41);return"Sứ thần ngạc nhiên: công chúa nói được tiếng Đại Hy."}S.kgt+=BAL.eff.jkc2.kgtO_22;if(sx)kcAf(sx,BAL.eff.jkc2.o_42);return"Ngươi nói vấp; sứ thần mỉm cười lịch sự."})),"học được càng nhiều càng dễ; được thì sứ thần trọng ngươi","có rủi ro"),
  kc2H(kcO("Ra mắt theo lễ cố quốc",{},kc2Go("Hòa ước · hồi 1",()=>{if(c)kcAf(c,BAL.eff.jkc2.o_43);S.kgt+=BAL.eff.jkc2.kgtO_23;if(sx)kcAf(sx,nv(sx,"kc2EnvoyMeet"));return"Các đại thần gật gù; sứ thần nhìn lâu áo váy của ngươi."})),"phụ thân vừa lòng; sứ thần tùy tính","an toàn")]}},
 n_c1:()=>{const c=kcR("cha"),mu=kcR("muoi");const L=kc2L();return{who:kcFace(c),t:`<p class="past">Hòa ước · hồi 2/3</p><p>Triều đình chia hai: người muốn ngươi đi, người muốn ${mu?mu.t.toLowerCase()+" "+mu.name:"một tông nữ"} đi thay. ${L.dad} hỏi thẳng: con có muốn đi không?</p>`,o:[
  kc2H(kcO("Thưa: con xin đi, vì muôn dân",{},kc2Go("Hòa ước · hồi 2",()=>{S.kc.want=1;S.kgt+=BAL.eff.jkc2.kgtO_24;if(c)kcAf(c,nv(c,"kc2KhanGo"));if(mu)kcAf(mu,nv(mu,"kc2MuGo"));S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_22);return"Cả triều lặng đi, rồi cúi đầu."})),"hòa ước vững; vương muội tùy tính mà mừng hay ghen","an toàn"),
  kc2H(kcO(`Xin để ${mu?mu.t.toLowerCase():"vương muội"} đi thay`,{suc:BAL.kc2.top_o_suc4},()=>{const b=rsnap();if(mu&&c&&roll(BAL.kc2.xinDeDiThay_rb+nv(mu,"kc2MuSwap")+c.af/4-nv(c,"kc2KhanSwap"))){kc2End("Công chúa ở lại cố quốc",`${mu.name} đi hòa thân thay nàng. Nàng ở lại ${L.court}, mười năm sau được gả cho một tộc trưởng phương tây.`);return}
   if(c)kcAf(c,BAL.eff.jkc2.o_44);S.kgt-=BAL.eff.jkc2.kgtO_25;if(mu){mu.oan+=BAL.eff.jkc2.oanO_8;kcAf(mu,BAL.eff.jkc2.o_45)}kcRes("Hòa ước · hồi 2",b,"Phụ thân lắc đầu: ‘Sứ thần đã thấy mặt con.’ Ngươi vẫn phải đi, và ai cũng biết ngươi không muốn.")}),"có thể ở lại cố quốc (kiếp này dừng); không được thì mất lòng","liều")]}},
 n_c2:()=>{const c=kcR("cha");const L=kc2L();const bd=kc2Br()==="bd";return{who:kcFace(c),t:`<p class="past">Hòa ước · hồi 3/3</p><p>${bd?`Đêm trước ngày ký, ${L.dad.toLowerCase()} gọi ngươi vào kim trướng: ‘Ba trăm con ngựa sẽ theo con làm hồi môn. Mười năm yên biên ải là ở con.’`:`Đêm trước ngày ký, ${L.dad.toLowerCase()} gọi ngươi vào thư phòng, nói khẽ: ‘Sang đó, con là phi của Đại Hy, nhưng cũng là mắt tai của Nam Chiếu.’`}</p>`,o:bd?[
  kc2H(kcO("Thề giữ hòa ước bằng mọi giá",{},kc2Go("Hòa ước · hồi 3",()=>{S.kgt+=BAL.eff.jkc2.kgtO_26;apply({duc:BAL.kc2.top_o_duc});if(c)kcAf(c,BAL.eff.jkc2.o_46);return"Phụ hãn rót cho ngươi chén sữa ngựa cuối cùng."})),"hòa ước vững; Đức tăng","an toàn"),
  kc2H(kcO("Xin phụ hãn hứa không động binh khi con còn ở đó",{suc:BAL.kc2.top_o_suc4},kc2Go("Hòa ước · hồi 3",()=>{if(c&&roll(BAL.kc2.xinPhuHanHua_rb+c.af/2+nv(c,"kc2KhanVow"))){S.kgt+=BAL.eff.jkc2.kgtO_27;S.kap=Math.max(0,S.kap-BAL.eff.jkc2.kapO_23);return"Phụ hãn bẻ đôi mũi tên trước mặt các tộc trưởng."}if(c)kcAf(c,BAL.eff.jkc2.o_47);return"Phụ hãn cau mày: ‘Con dạy cha cầm quân sao?’"})),"được thì biên ải yên hơn; không thì phụ hãn phật ý","có rủi ro")]:[
  kc2H(kcO("Nhận lời làm mắt tai của cố quốc",{},kc2Go("Hòa ước · hồi 3",()=>{S.kc.spy=1;apply({tamco:BAL.kc2.top_o_tamco});if(c)kcAf(c,BAL.eff.jkc2.o_48);return"Phụ vương trao cho ngươi một chiếc nhẫn: ai mang nhẫn giống thế là người của Nam Chiếu."})),"phụ vương tin ngươi; sang đó sẽ có ngày khó xử","an toàn"),
  kc2H(kcO("Thưa: gả đi rồi, con là người Đại Hy",{},kc2Go("Hòa ước · hồi 3",()=>{S.kc.spy=0;apply({duc:BAL.kc2.top_o_duc2});if(c)kcAf(c,nv(c,"kc2KhanStay"));S.kgt+=BAL.eff.jkc2.kgtO_28;return"Phụ vương nhìn ngươi rất lâu, rồi cho lui."})),"giữ lòng ngay; phụ vương phật ý, tùy tính ngài","an toàn")]}}};
for(const k in KC2CH)KCE[k]={get t(){try{return kc2ChT()}catch(x){return""}},b:KC2CH[k]};

/* ---------- the sending event (kit event card) and the selection (OD:L1250: ceiling earned by the result) ---------- */
/* EXAM HOOK: a dedicated selection mini-game (OD:L1244 "minigame exam") can replace the j82/j91 round: window.kcEntryExam(kind, done(raw 0..10), info{art,origin,title,note}).
   kind = "dan" (cnv home), "nc" (nc/bd home) or the origin key (direct "Vào cung ngay", and the six tiểu thư home roads' Phúc tuyển with info.phuc = 1, jkc kcPhucPlay); info.art = the round she chose (kim / le / mua / an art key);
   done must be called exactly once with 0..10; the "wait" choice never reaches the hook (it scores 5); bots (window.__bot) skip it. (reviewer r1)
   TODO(selection-minigame): when that worker ships, it sets window.kcEntryExam; until then the round is playArt (the same engine as Phúc tuyển). */
function kc2Play(art,title,note,fin){if(window.__bot||typeof playArt!=="function"){fin(cl(3+R(6),0,10));return}
 if(typeof window.kcEntryExam==="function"){try{window.kcEntryExam((S.kc&&S.kc.kd)||S.origin.k,fin,{art,origin:S.origin&&S.origin.k,title,note});return}catch(e){console.error(e)}}
 try{playArt({art,title,note,onDone:(raw,o)=>fin(o&&o.skipped?5:raw)})}catch(e){console.error(e);fin(5)}}
Object.assign(KCE,{
 d_tuyen:{t:"Ngày tuyển cung nữ",b:()=>{const K=S.kc;const ly=kcR("ly");if(K.gach)return{who:kcFace(ly||K.fam[0]),t:`<p>Thái giám Nội vụ phủ về huyện đường; con gái các xã xếp hàng trước cổng. Tên ngươi đã bị gạch khỏi sổ. Xuân Đào đứng trong hàng, ngoái lại nhìn ngươi.</p>`,o:[
   kc2H(kcO("Ở lại quê nhà",{},()=>kc2End("Ở lại quê nhà",`Nàng ở lại ${K.vil}. Hai năm sau nàng lấy một anh thợ mộc làng bên; nợ nhà trả dần trong mười năm.`)),"không vào cung; kiếp này dừng ở quê","an toàn"),
   kc2H(kcO("Tự lên huyện xin ghi tên lại",{suc:BAL.kc2.d_tuyen_o_suc},()=>{K.gach=0;K.self=1;pushDil(mkP("kcE",{e:"d_thi"}),"Ngày tuyển cung nữ")}),"vào cung; ma ma nhìn kẻ tự đến bằng con mắt khác","có rủi ro")]};
  return{who:pMe(),t:`<p>Thái giám và ma ma Nội vụ phủ về huyện đường. Con gái các xã xếp hàng trước cổng, mỗi người một bọc áo. Xuân Đào đứng ngay sau lưng ngươi.</p>`,o:[
   kc2H(kcO("Vào trình diện",{},()=>pushDil(mkP("kcE",{e:"d_thi"}),"Ngày tuyển cung nữ")),"ma ma xem dung mạo, khéo tay, lễ nghi; tiếng trong xóm và lời lý trưởng cũng được hỏi","có rủi ro")]}}},
 d_thi:{t:"Ngày tuyển cung nữ",b:()=>({who:pMe(),t:`<p>Ma ma Nội vụ phủ nhìn ngươi từ đầu đến chân, rồi chỉ vào một rổ kim chỉ và một chiếc ghế: ngươi chọn cách nào để tỏ mình?</p>`,o:[
   kc2H(kcO("Làm bài khéo tay",{suc:BAL.kc2.d_thi_o_suc},()=>kc2Exam("kim")),`chơi màn Khéo tay; khéo tay ở nhà (${S.kc.kim}/5) cộng thêm`,"có rủi ro"),
   kc2H(kcO("Thêu một mảnh khăn",{suc:BAL.kc2.d_thi_o_suc},()=>kc2Exam("theu")),`chơi màn Thêu; khéo tay ở nhà (${S.kc.kim}/5) cộng thêm`,"có rủi ro"),
   kc2H(kcO("Cúi đầu chờ ma ma xét",{suc:BAL.kc2.d_thi_o_suc},()=>kc2Exam("")),"không thi; tính như người cùng bậc tài nghệ","an toàn")]})},
 n_send:{t:"Hòa ước ký xong",b:()=>{const L=kc2L();const c=kcR("cha");return{who:kcFace(c||S.kc.fam[0]),t:`<p>Hòa ước đã ký. Sáng nay kiệu hoa đỏ dừng trước cổng ${L.court}; ${kc2Br()==="bd"?"ba trăm con ngựa":"xe lễ vật"} xếp hàng sau sứ đoàn Đại Hy. ${L.mom} đứng ở bậc thềm, không khóc trước mặt ai.</p>`+
   kitRows([[NAMES.kgt,S.kgt,"t"],["Lễ nghi Đại Hy",`${S.kc.le}/5`,"t"],[NAMES.khm,kitChip("Bạc",S.khm,"n"),"t"]]),o:[
   kc2H(kcO("Lên kiệu hoa",{},()=>pushDil(mkP("kcE",{e:"n_ramat"}),"Lễ ra mắt")),"sang Đại Hy; Lễ ra mắt định phẩm vị","an toàn")]}}},
 n_ramat:{t:"Lễ ra mắt",b:()=>{const r0=RANKS[(S.origin&&S.origin.r)||0].n;return{who:pEmp(),t:`<p>Điện Thái Hòa. Hoàng thượng ngồi trên, Thái hậu ngồi bên, bá quan hai hàng. Công chúa ${kc2L().land} dâng lễ ra mắt. Lễ hôm nay quyết định ngươi được phong tới đâu (cao nhất ${r0}).</p>`,o:[
   kc2H(kcO(kc2Br()==="bd"?"Dâng điệu múa thảo nguyên":"Dâng điệu múa cố quốc",{suc:BAL.kc2.n_ramat_o_suc},()=>kc2Exam("mua")),"chơi màn Múa; tài múa và dung mạo cộng thêm","có rủi ro"),
   kc2Br()==="bd"?kc2H(kcO("Bắn cung trước điện",{suc:BAL.kc2.n_ramat_o_suc},()=>kc2Exam("ban")),"chơi màn Bắn cung; dung mạo và lễ nghi học ở nhà cộng thêm","có rủi ro"):kc2H(kcO("Dâng khúc đàn cố quốc",{suc:BAL.kc2.n_ramat_o_suc},()=>kc2Exam("cam")),"chơi màn Đàn; tài đàn và lễ nghi học ở nhà cộng thêm","có rủi ro"),
   kc2H(kcO("Để sứ thần đọc lời chúc thay",{suc:BAL.kc2.n_ramat_o_suc2},()=>kc2Exam("")),"không thi; tính như người cùng bậc tài nghệ","an toàn")]}}}});
function kc2Exam(art){const K=S.kc;if(!isKc()||K.ex&&K.ex.done)return;K.ex={art,play:1};
 const fin=raw=>{if(!S.kc||K.ex.done)return;K.ex.done=1;K.ex.raw=raw;try{kc2Enter(raw)}catch(e){console.error("kc2Enter",e)}try{showModal();render()}catch(e){}};
 if(!art){fin(entSkipRaw());return}/* entry-exam: the same value as "Để tài nghệ quyết định" */const dan=K.kd==="dan";
 kc2Play(art,dan?"Tuyển cung nữ":"Lễ ra mắt",dan?"Điểm màn chơi cộng vào kết quả tuyển":"Điểm màn chơi cộng vào phẩm vị",fin)}
/* a stale card (the exam already done) never opens the game twice: jkc's own "Phúc tuyển left without a result" rule, for this round */
(function(){const e0=kcEndTurn;kcEndTurn=function(){try{if(S&&S.kc&&S.kc.kd&&isKc()&&S.kc.ex&&S.kc.ex.play&&!S.kc.ex.done&&!Q.length){S.kc.ex.done=1;kc2Enter(5)}}catch(e){console.error(e)}return e0.apply(this,arguments)}})();
/* the score: one rule, the people of this life inside it (lý trưởng's word, the envoy's report, Thái hậu's dislike) */
function kc2Score(raw){const K=S.kc;const g=(K.ex&&K.ex.art)||"";return entScore(K.kd==="dan"?"dan":"nc",raw,g)}/* ONE CORE: jentry entScore, weights BAL.entry.w */
const KC2CUT=BAL.entry.cut;/* below [0]: two steps under the ceiling; [0]: one step under; [1]: the ceiling */
function kc2Enter(raw){const K=S.kc;const sc=Math.round(kc2Score(raw));K.ex.sc=sc;const tier=sc>=KC2CUT[1]?2:sc>=KC2CUT[0]?1:0;K.ex.tier=tier;
 for(let i=Q.length-1;i>=0;i--){const m=Q[i];if(m&&m.pid==="kcE")Q.splice(i,1)}try{if(typeof kg82Close==="function"&&document.getElementById("kg82"))kg82Close(true)}catch(e){}
 K.inPal=1;K.yIn=S.year;S.kpTron=1;S.out=0;S.pal=null;
 if(K.kd==="dan")kc2EnterSrv(tier,sc,raw);else kc2EnterNc(tier,sc,raw);
 kc2R0();kcSnapReset();try{kcHook("enter",{rank:S.rank,tier})}catch(e){}tab="act";render()}
const KC2SW=["kém","khá","tốt"];
/* the placement IS the rank of a cung nữ start: the mistress she serves (Nội vụ phủ gives the best girls to the high palaces); tier 0 adds Tân Giả khố after (caller).
   j42 srvInit with the candidate list narrowed; srvInit's own "Nhập cung làm cung nữ" card is dropped (the caller writes one with the result). */
function kc2Place(tier,keepNew){const lr=liveRivals;const pickL=L0=>{const L=L0.filter(v=>!v.coop&&RANKS[v.rank]);const hi=L.filter(v=>v.rank>=3),lo=L.filter(v=>v.rank>=1&&v.rank<=2);return tier===2?(hi.length?hi:L):(lo.length?lo:L)};
 const keep=Q.filter(m=>m.t!=="Nhập cung làm cung nữ");liveRivals=function(){const L=lr.apply(this,arguments);try{const P=pickL(L);return P.length?P:L}catch(e){return L}};
 try{quiet=true;srvInit()}catch(e){console.error("kc2 srvInit",e)}finally{liveRivals=lr;quiet=false}Q=(keepNew?Q:Q.filter(m=>m.t!=="Nhập cung làm cung nữ")).concat(keep.filter(m=>!Q.includes(m)))}
/* j67 chapter 1 ("Nhập cung, đứng vững": promoted one step) counts from the rank she really enters with */
function kc2R0(){try{if(S.st&&S.st.ms&&S.st.ms.id==="nhap"){S.st.ms.r0=S.rank;S.st.ms.t0=S.turn}}catch(e){}}
const kc2RkN=p=>{try{return p?`${rkName(p)} ${p.name}`:""}catch(e){return p&&p.name||""}};
function kc2EnterSrv(tier,sc,raw){const K=S.kc;const age=S.age,sac=S.sac,tai=S.tai,duc=S.duc,tam=S.tamco,bac=S.bac;
 kc2Place(tier);
 Object.assign(S,{age,sac,tai,duc,tamco:tam});S.bac=Math.min(bac,25)+(K.angia?0:2);
 if(!S.srv){/* no consort to serve (should not happen): stay a commoner at the gate */return}
 if(tier===2)S.tin=cl((S.tin||40)+BAL.eff.jkc2.tinKc2EnterSrv,0,100);if(tier===0){S.srv.lau=4;S.place="tgk";try{S.visit=srvVisitOf("tgk")}catch(e){}}
 /* Xuân Đào enters in the same draft: a real maid of another palace, with the feelings of home (OD:L1247 real people) */
 let xdS=null;const xd=kcR("xd");try{if(xd){const m=srvM();const L=allServ().filter(s=>s.role==="maid"&&!s.coop&&ownerOf(s)&&!ownerOf(s).coop&&RANKS[ownerOf(s).rank]&&ownerOf(s)!==m&&ownerOf(s)!==S);xdS=pick(L);
   if(xdS){xdS.name="Xuân Đào";xdS.age=xd.age;if(!S.srv.met.includes(xdS.sid))S.srv.met.push(xdS.sid);try{k61Know(xdS,"người cùng làng",true,3)}catch(e){}S.srv.af[xdS.sid]=cl(Math.round(xd.af),-100,100);K.xdSid=xdS.sid}}}catch(e){console.error("kc2 xd",e)}
 const m=srvM();const place=tier===0?"Tân Giả khố bốn tuần, rồi về hầu":"về hầu";
 Q.push({t:"Nhập cung làm cung nữ",art:"img/ev-cung-nu.webp",faces:m?[[pMe(),S.name],[pv(m),m.name]]:null,who:m?null:pMe(),h:`<p>Ma ma Nội vụ phủ ghi tên ngươi vào sổ. Kết quả tuyển: <b>${KC2SW[tier]}</b>. Ngươi ${place} <b>${kc2RkN(m)}</b>${m?` ở ${palName(palaceOf(m))}`:""}.</p>`+
  `<p>Tính chủ: <b>${m?netTxt(m):""}</b>. Lương tháng ${CNV_WAGE[1]} bạc.</p><p><b>Đường lên:</b> được Hoàng thượng để mắt mà phong Đáp ứng; lên Chưởng sự cô cô; được ban gả. <b>Đường xuống:</b> bị phạt, đày Tân Giả khố, chết trong mưu của người khác.</p>`+
  kitRows([["Màn chơi",`${raw}/10`,"t"],["Kết quả tuyển",`${KC2SW[tier]} (${tier===2?"về cung phi tần bậc cao":tier===1?"về cung phi tần bậc thấp":"giặt đồ ở Tân Giả khố trước"})`,tier===0?"r":"t"],
   ["Chủ tin",S.tin,"t"],["Mang theo",kitChip("Bạc",S.bac,"n"),"t"]].concat(xdS?[["Xuân Đào",`vào cung cùng đợt, hầu ${kc2RkN(ownerOf(xdS))}`,"t"]]:[]).concat(K.angia?[["Nhà",`đã nhận tiền an gia, trả nửa nợ`,"t"]]:[]))});
 log(`<b class="g">Qua kỳ tuyển cung nữ (${KC2SW[tier]}): ${tier===0?"Tân Giả khố, rồi ":""}hầu ${kc2RkN(m)}.</b>`)}
function kc2EnterNc(tier,sc,raw){const K=S.kc;const top=(S.origin&&S.origin.r)||0;const rank=Math.max(0,top-(2-tier));
 S.rank=rank;S.sung=8+rank*5;S.lastPromo=S.turn;S.danh=Math.min(30,Math.max(S.danh,6+Math.round(S.kgt/5)));S.bac=Math.min(400,S.bac+S.khm);
 S.staff=K.staff0||[];S.place="home";if(S.maid)S.maid.loyal=cl(S.maid.loyal+BAL.eff.jkc2.loyalKc2EnterNc,0,100);try{kcPd(rank>=top?10:5,`hòa thân, phong ${RANKS[rank].n}`)}catch(e){}
 try{palFix()}catch(e){}deal();const L=kc2L();
 Q.push({t:"Nhập cung",who:pMe(),art:"img/ev-nhap-cung.webp",h:`<p>Lễ ra mắt xong. Hoàng thượng ban chiếu: công chúa ${L.land} vào cung, phong <b>${RANKS[rank].n}</b>${rank<top?` (hòa ước cho tới ${RANKS[top].n}; lễ ra mắt chưa đủ)`:""}.</p>`+
  kitRows([["Màn chơi",`${raw}/10`,"t"],["Phẩm vị",`${RANKS[rank].n} · cao nhất ${RANKS[top].n}`,rank<top?"r":"t"],[NAMES.kgt,S.kgt,"t"],["Mang theo",[kitChip("Bạc",S.bac,"n")+" (có hồi môn)",`Danh ${S.danh}`],"t"],
   ["Tỳ nữ cố quốc",S.maid?S.maid.name:"không","t"],["Đã biết trong cung",`${K.intel.length} phi tần`,"t"]])});
 log(`<b class="g">Hòa thân sang Đại Hy: ${RANKS[rank].n}.</b>`)}

/* ---------- endings at home (life ends: the jkc end card, with this road's words) ---------- */
try{Object.assign(PD_END,{"Ở lại quê nhà":12,"Làm thiếp nhà phú hộ":5,"Làm người ở nhà lý trưởng":3,"Công chúa ở lại cố quốc":12})}catch(e){}
function kc2End(h,t){if(S.dead)return;S.kc.end=h;Q=Q.filter(m=>m.cls==="end"||m.nl);over(h,t+` <span class="past">(${S.kc.kd==="dan"?"Thôn nữ chờ tuyển":"Công chúa chờ hòa thân"} · ${kcTitle()})</span>`,h);try{showModal()}catch(e){}}
(function(){if(typeof kpWhy!=="function")return;const w0=kpWhy;kpWhy=function(){if(S&&S.kc&&S.kc.kd&&!S.kc.inPal)return `mới ${S.turn||0}/${KIEP.mo} tháng ở nhà, chưa vào cung`;return w0.apply(this,arguments)}})();
(function(){if(typeof lifeSave!=="function")return;const l0=lifeSave;lifeSave=function(f){const r=l0.apply(this,arguments);try{if(S&&S.kc&&S.kc.kd&&!S.kc.inPal){const p=lifeLog();if(p[0]&&p[0].n===S.name&&p[0].kc===1&&!p[0].kc2){p[0].kc2=1;p[0].f=String(p[0].f||"").replace("Tiểu thư ngoài cung",S.kc.kd==="dan"?"Thôn nữ chờ tuyển":"Công chúa chờ hòa thân");store.set("cung-luanhoi",p)}}}catch(e){}return r}})();
(function(){const t0=showTitle;showTitle=function(){const r=t0.apply(this,arguments);try{document.querySelectorAll("#slots .slot").forEach(el=>{const b=el.querySelector("[data-load]");if(!b)return;const d=loadSlot(+b.dataset.load);
 if(d&&d.S&&d.S.kc&&d.S.kc.kd&&!d.S.kc.inPal){const sp=el.querySelector(".past");if(sp)sp.textContent=sp.textContent.replace("Tiểu thư ngoài cung",d.S.kc.kd==="dan"?"Thôn nữ chờ tuyển":"Công chúa chờ hòa thân")}})}catch(e){}return r}})();

/* ---------- UI: the jkc panels with this road's people and words ---------- */
(function(){const f0=kcFamList;kcFamList=function(w){if(!S||!S.kc||!S.kc.kd)return f0.apply(this,arguments);return S.kc.fam.filter(m=>m.alive&&!(m.hide&&!S.kc.sx)&&(w==="ban"?!!m.out:!m.out))}})();
(function(){const c0=kcFamCard;kcFamCard=function(m){if(!S||!S.kc||!S.kc.kd)return c0.apply(this,arguments);const acts=kcFamActs(m);
 /* main retired kitRelRow: the same kitRel2 table (KIT §52) as jkc kcFamCard */
 const rel=kitRel2([{head:`${m.t} → ta`,dir:"them",rows:[{w:"Thiện cảm",now:m.af==null?null:Math.round(m.af),kind:"good"}].concat(m.oan?[{w:"Oán",now:Math.round(m.oan),kind:"bad"}]:[]).map(r=>r.now==null?{w:r.w,unk:"chưa rõ"}:r)},{head:`Ta → ${kc2Lt(m)}`,dir:"me",rows:[m.me==null?{w:"Thiện cảm",unk:"chưa rõ"}:{w:"Thiện cảm",now:Math.round(m.me),kind:"good"}]}]);
 const f=kcFace(m);return pcard({f,col:f.col,name:m.name,rank:m.t,lines:[`${m.age} tuổi`,`Tính ${netTxt(m).toLowerCase()}`,`Đang ở ${kcAt(m).toLowerCase()}`],note:rel,tabKey:"kcfam",
  groups:[["Việc",acts.map(([a,i])=>cardH(a,i))]],empty:"Lúc này chưa có việc nào làm được với người này."})}})();
(function(){const h0=kcFamHTML;kcFamHTML=function(){if(!S||!S.kc||!S.kc.kd)return h0.apply(this,arguments);const dan=S.kc.kd==="dan";const nha=kcFamList("nha"),ban=kcFamList("ban");const rest=deck.map((a,i)=>[a,i]).filter(([a])=>a.g==="fam"&&!a.who);
 const cnt=L=>{const A=L.flatMap(kcFamActs);return{doable:A.filter(([a])=>kcDoable(a)).length,total:A.length}};
 const T=kitSubTabs("kcfam",[Object.assign({k:"nha",label:dan?"Người nhà":"Vương tộc"},cnt(nha)),Object.assign({k:"ban",label:dan?"Xóm giềng":"Người ngoài"},cnt(ban)),{k:"gia",label:dan?"Gia cảnh":"Hòa ước",doable:rest.filter(([a])=>kcDoable(a)).length,total:rest.length}]);
 let h=T.html;
 if(T.cur==="gia")h+=kitRows(dan?[[kitInfo(NAMES.kgt),S.kgt,S.kgt<BAL.kc2.st.kgtLow?"r":"t"],[kitInfo(NAMES.kap),S.kap,S.kap>=BAL.kc2.st.kapHot?"r":"t"],["Khéo tay",`${S.kc.kim}/5`,"t"],["Lễ nghi",`${S.kc.le}/5`,"t"],["Tiền an gia",S.kc.angia?"đã nhận":"chưa nhận","t"]]
   :[[kitInfo(NAMES.kgt),S.kgt,S.kgt<BAL.kc2.st.kgtLow?"r":"t"],[kitInfo(NAMES.kap),S.kap,S.kap>=BAL.kc2.st.kapHot?"r":"t"],[kitInfo(NAMES.khm),kitChip("Bạc",S.khm,"n"),"t"],["Lễ nghi Đại Hy",`${S.kc.le}/5`,"t"]])+kcCardsH(rest);
 else{const L=T.cur==="ban"?ban:nha;const key=T.cur==="ban"?"kcban":"kcfam";h=L.length?`<div class="pgwrap"><div class="kpinline">${T.html}</div>`+pager(key,L.map(m=>({f:kcFace(m),name:m.t})),i=>kcFamCard(L[i]))+`</div>`:T.html+kitEmpty(dan?"Gia đình":"Vương tộc","Không còn ai.")}
 return h}})();
(function(){const s0=kcSocHTML;kcSocHTML=function(){if(!S||!S.kc||!S.kc.kd)return s0.apply(this,arguments);const dan=S.kc.kd==="dan";const sx=kcR("sx");
 return kitRows(dan?[[kitInfo(NAMES.kgt),S.kgt,S.kgt<BAL.kc2.st.kgtLow?"r":"t"],[kitInfo(NAMES.kap),`${S.kap} trên 100`,S.kap>=BAL.kc2.st.kapHot?"r":"t"],["Lý trưởng",kcR("ly")?`${netTxt(kcR("ly")).toLowerCase()} · với ngươi ${Math.round(kcR("ly").af)}`:"","t"]]
  :[[kitInfo(NAMES.kgt),S.kgt,S.kgt<BAL.kc2.st.kgtLow?"r":"t"],[kitInfo(NAMES.kap),`${S.kap} trên 100`,S.kap>=BAL.kc2.st.kapHot?"r":"t"],["Sứ thần Đại Hy",S.kc.sx&&sx?`${sx.name} · đang ở ${kcAt(sx).toLowerCase()}`:"chưa đến","t"]])+kcGroupHTML("soc")}})();
(function(){const m0=kcMailHTML;kcMailHTML=function(){if(!S||!S.kc||S.kc.kd!=="dan")return m0.apply(this,arguments);const K=S.kc;
 return kitRows([["Nội vụ phủ",K.nvp?`đã nghe bà Tư kể ${K.nvp} lần`:"chưa biết gì","t"],["Phi tần đã nghe tên",`${K.intel.length}`,"t"]])+kcGroupHTML("mail")}})();
(function(){const a0=kcArtHTML;kcArtHTML=function(){if(!S||!S.kc||!S.kc.kd)return a0.apply(this,arguments);const L=deck.map((a,i)=>[a,i]).filter(([a])=>a.g==="art");if(!L.length)return"";const dan=S.kc.kd==="dan";
 return kitSkillCard({kind:"info",k:"le",name:dan?"Học lễ nghi trong cung":"Học lễ nghi Đại Hy",kicker:dan?"Thôn quê":"Cố quốc",level:S.kc.le,max:5,word:"Lễ nghi",desc:dan?"Bà Tư dạy cách đi đứng, quỳ lạy, đáp lời; ngày tuyển ma ma xem.":"Ma ma theo sứ đoàn dạy lễ Đại Hy; Lễ ra mắt xem.",bar:false,next:"",acts:L.map(([a,i])=>cardH(a,i))})}})();
(function(){const m0=kcMapHTML;kcMapHTML=function(){if(!S||!S.kc||!S.kc.kd)return m0.apply(this,arguments);const dan=S.kc.kd==="dan";const sub=dan?["Quanh nhà","Trong làng"]:kc2L().sub;
 const B=k=>{const P=KCPL[k];const w=kcGoWhy(k);const who=kcHere(k).map(kc2Lt);return pbtn(`class="opt" data-kcgo="${k}" title="${P[3].replace(/"/g,"")}"`,P[0],[kcCity(k)?`tốn: ${BAL.kc2.kcGoWhy_k} khắc`:"",who.length?"người ở đây: "+who.join(" và "):"không gặp ai"].filter(Boolean).join(" · "),w||"")};
 const mine=Object.keys(KCPL).filter(kc2Mine);const inH=mine.filter(k=>KCPL[k][2]),out=mine.filter(k=>!KCPL[k][2]);
 const T=kitSubTabs("kcgo",[{k:"phu",label:sub[0],n:inH.length},{k:"kinh",label:sub[1],n:out.length}]);
 return T.html+(T.cur==="kinh"?`<p class="kpnote">${kitInfo(dan?"Ra khỏi xóm":"Ra ngoài",dan?"Đi xa nhà tốn một khắc mỗi chiều; tối không ra khỏi xóm":"Ra ngoài cần tỳ nữ đi cùng; buổi tối không ra ngoài")}</p>`:"")+`<div class="opts kcmap">${(T.cur==="kinh"?out:inH).map(B).join("")}</div>`}})();
try{Object.assign(KIT_GLOSS,{"Ra khỏi xóm":"Đi ra đình, chợ, chùa hay nhà bà Tư tốn một khắc mỗi chiều; buổi tối con gái không ra khỏi xóm.","Ra ngoài":"Ra ngoài tốn một khắc mỗi chiều, phải có tỳ nữ đi cùng; buổi tối công chúa không ra ngoài."})}catch(e){}
(function(){const s0=kcStoryHTML;kcStoryHTML=function(){if(!S||!S.kc||!S.kc.kd)return s0.apply(this,arguments);const K=S.kc;const dan=K.kd==="dan";const n0=S.turn-K.t0;const n=[4,10,16].filter(x=>n0>=x).length;const nxt=[4,10,16].find(x=>n0<x);const left=kcMonthsLeft();
 return kitSkillCard({kind:"story",k:"kco",name:kc2ChT(),kicker:dan?"Chương ở quê":"Chương ở cố quốc",level:n,max:3,word:"Hồi",bar:false,next:"",desc:n>=3?"Đã trọn ba hồi.":`Hồi tới: sau ${Math.max(0,nxt-n0)} tháng nữa.`})
  +kitSkillCard({kind:"story",k:"kty",name:dan?"Ngày tuyển cung nữ":"Ngày lên đường",kicker:K.sent?"đang diễn ra":`Còn ${left} tháng`,level:K.sent?1:0,max:1,word:"Vòng",bar:false,next:"",desc:dan?"Ma ma Nội vụ phủ xét dung mạo, khéo tay, lễ nghi. Làm tốt thì về hầu cung phi tần bậc cao; kém thì giặt đồ ở Tân Giả khố trước.":`Lễ ra mắt ở Đại Hy: làm tốt thì phong tới ${RANKS[(S.origin&&S.origin.r)||0].n}; kém thì thấp hơn một, hai bậc.`})
  +kitRows(dan?[["Khéo tay",`${K.kim}/5`,"t"],["Lễ nghi",`${K.le}/5`,"t"],[NAMES.kgt,S.kgt,"t"]]:[["Lễ nghi Đại Hy",`${K.le}/5`,"t"],[NAMES.kgt,S.kgt,"t"],["Mật lệnh cố quốc",K.spy?"đã nhận":"không","t"]])}})();
(function(){const s0=selfCardHTML;selfCardHTML=function(){if(!kc2On())return s0.apply(this,arguments);const dan=S.kc.kd==="dan";
 return pcard({f:pMe(),col:"#b08a8a",name:S.name,rank:kcTitle(),lines:[`${S.age} tuổi`,S.origin.n],note:`${dan?"Ngày tuyển":"Ngày lên đường"} còn ${kcMonthsLeft()} tháng.`,tabKey:"kcme",
  groups:[["Tư chất",[["Sắc",S.sac,"t"],["Tài",S.tai,"t"],["Tâm cơ",S.tamco,"t"],["Đức",S.duc,"t"],["Sức",S.suc,"t"],["Bạc",kitChip("Bạc",S.bac,"n"),"t"],["Danh",S.danh,"t"]]],
   [dan?"Nhà":"Hòa ước",[[NAMES.kgt,S.kgt,"t"],[NAMES.kap,S.kap,S.kap>=BAL.kc2.st.kapHot?"r":"t"],[dan?"Khéo tay":"Lễ nghi Đại Hy",`${dan?S.kc.kim:S.kc.le}/5`,"t"]]]]})}})();
/* hud: the state cells and the top-bar chip with this road's numbers */
(function(){const h0=kcHud;kcHud=function(){const r=h0.apply(this,arguments);try{if(kc2On()){const e=$("hud-sung");const sm=e&&e.querySelector("small");if(sm)sm.innerHTML=sm.dataset.ko0.replace(/Sủng|Chủ tin/,NAMES.kgt);if(e)e.title=HX.kgt}}catch(x){}return r}})();
(function(){const h0=kcHud2;kcHud2=function(){if(!kc2On())return h0.apply(this,arguments);const el=$("hud2");if(!el)return;const col=el.classList.contains("col");const dan=S.kc.kd==="dan";
 const c=(k,l,v,cls)=>`<button class="hc ${cls||""}${["buoi","date"].includes(k)?" keep":""}" data-hx="${k}">${l}${v!==""&&v!=null?` <b>${v}</b>`:""}</button>`;
 el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${col?"Mở ra":"Thu lại"}">${col?"▾":"▴"}</button>`+c("date",typeof VP==="object"&&VP.date?VP.date(S.month,S.year,S.tuan):`Tháng ${S.month}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${4-used} khắc`)
  +c("sac","Sắc",S.sac)+c("tai","Tài",S.tai)+c("tamco","Tâm cơ",S.tamco)+c("duc","Đức",S.duc)+c("kgt",NAMES.kgt,S.kgt,S.kgt<BAL.kc2.st.kgtLow?"hot":"")+c("kap",NAMES.kap,S.kap,S.kap>=BAL.kc2.st.kapHot?"hot":"")
  +(dan?"":c("khm",NAMES.khm,S.khm))+(S.kc.ldSeen?c("kld","Lời đồn",S.kld,S.kld>=50?"hot":""):"")+c("kty",KC2W[S.kc.kd].kty,`còn ${kcMonthsLeft()} tháng`)+c("age","Tuổi",S.age)}})();
(function(){const p0=kcChipPaint;kcChipPaint=function(){if(!kc2On())return p0.apply(this,arguments);try{const tt=document.getElementById("k3tt");if(!tt)return;const l1=tt.querySelector(".k3l1");if(!l1)return;
 const W=KC2W[S.kc.kd];const h=k3row("kcty",W.kty,S.kc.sent?"đang diễn ra":`còn ${kcMonthsLeft()} tháng`,"")+(S.kap>=BAL.kc2.st.kapRow?k3row("kcap",W.kap,S.kap,S.kap>=BAL.kc2.st.kapHot?"hot":""):"");
 const cur=[...l1.querySelectorAll('[data-k3^="kc"]')].map(e=>e.outerHTML).join("");if(cur===h)return;l1.querySelectorAll('[data-k3^="kc"]').forEach(e=>e.remove());l1.insertAdjacentHTML("beforeend",h)}catch(e){}}})();
(function(){const k0=kitCourtRows;kitCourtRows=function(){if(!kc2On())return k0.apply(this,arguments);if(!S||S.dead)return[];
 return S.kc.fam.filter(m=>m.alive&&["cha","me",S.kc.kd==="dan"?"huynh":"muoi"].includes(m.r)).slice(0,3).map(m=>({k:"kcm_"+m.id,who:m.t,f:kcFace(m),mood:[kcAt(m),"n"],att:null}))}})();
(function(){const g0=window.kitGoalAlt;window.kitGoalAlt=function(){try{if(typeof S==="undefined"||!S||S.dead||!kc2On())return g0?g0.apply(this,arguments):null;const dan=S.kc.kd==="dan";const n=kcMonthsLeft();
 return{kind:"v1",home:1,n:1,max:1,t:dan?"Chờ lệnh tuyển cung nữ":"Chờ ngày hòa thân",road:KC2W[S.kc.kd].road,g:dan?"Ngày tuyển: khéo tay, lễ nghi, tiếng trong xóm quyết định ngươi về hầu cung nào":"Học lễ nghi Đại Hy, giữ hòa ước; Lễ ra mắt quyết định phẩm vị",
  next:`${KC2W[S.kc.kd].kty} còn ${n} tháng`,todo:dan?[{t:"Tập khéo tay",why:"ma ma Nội vụ phủ xem đường kim, mũi chỉ",tab:"act",tl:KCTABS.act},{t:"Học lễ nghi với bà Tư",why:"biết quỳ lạy, đáp lời thì dễ lọt mắt ma ma",tab:"art",tl:KCTABS.art},{t:"Lo nợ nhà",why:"nợ tới hạn thì chủ nợ đến siết",tab:"staff",tl:KCTABS.staff}]
   :[{t:"Học lễ nghi Đại Hy",why:"Lễ ra mắt xét lễ nghi",tab:"art",tl:KCTABS.art},{t:"Giữ hòa ước",why:"hòa ước vững thì sang Đại Hy được trọng",tab:"staff",tl:KCTABS.staff},{t:`Giữ lòng ${kc2L().dad.toLowerCase()}`,why:"phụ thân quyết những điều khoản cuối",tab:"rv",tl:KCTABS.rv}]}}catch(e){console.error("kitGoalAlt kc2",e);return null}}})();
/* event pictures: only a picture that MEANS the event (KIT §50.1); the two sending cards use the origin's own procession / selection painting */
const KC2ART={d_benh:"img/ev-benh-tat.webp",d_lu:"img/ev-lu-lut.webp",d_thue:"img/ev-hoi-lo.webp",d_siet:"img/ev-bac-tien.webp",d_ghe:"img/ev-tin-don.webp",d_c0:"img/ev-tuyen-tu.webp",d_tuyen:"img/origin-wide-cnv.webp",d_thi:"img/ev-cung-nu.webp",
 n_c0:"img/ev-su-than.webp",n_le:"img/ev-su-than-2.webp",n_benh:"img/ev-benh-tat.webp",n_pha:"img/ev-bien-ai.webp",n_thich:"img/ev-am-muu.webp",n_send:()=>`img/origin-wide-${kc2Br()==="bd"?"bd":"nc"}.webp`,n_ramat:"img/ev-hoa-than.webp"};
(function(){if(typeof kitEvArt!=="function")return;const a0=kitEvArt;kitEvArt=function(m){try{if(m&&m.pid==="kcE"){const e=(m.pp||{}).e;if(e in KC2ART){const x=KC2ART[e];return{src:typeof x==="function"?x():x,lab:""}}if(/^(d|n)_/.test(e||""))return null}}catch(x){}return a0.apply(this,arguments)}})();

(function(){const e0=kcEnter;kcEnter=function(){const r=e0.apply(this,arguments);try{if(S&&S.kc&&S.kc.inPal&&!S.kc.r0Fix){S.kc.r0Fix=1;kc2R0()}}catch(e){}return r}})();

/* ---------- "Vào cung ngay" (main s12, 16/11, OD:L1250): the direct road never gives the origin rank outright either ----------
   A new life entering the palace at once meets the same selection right after "Nhận thân phận": one round of the existing mini-games
   (the hook window.kcEntryExam for Foreman D's exam mini-game, else playArt) + her numbers → the ceiling, one step lower, or two.
   A consort start: the rank (origin rank = ceiling; an origin whose ceiling is Đáp ứng has nothing to lose and skips it). A cung nữ start
   (cnv): the placement (palace head's maid / low consort's maid / Tân Giả khố first). The "Nhập cung" card is corrected to the real result.
   New lives only (S.selx); every save made before this build is untouched. */
/* entry-exam: no word games (owner 16/11 07:20Z): the old "lễ nghi" quiz options are replaced by a second non-word art */
const KC2DART={cnv:[["kim","Làm bài khéo tay"],["theu","Thêu một mảnh khăn"]],nc:[["mua","Dâng điệu múa cố quốc"],["cam","Dâng khúc đàn cố quốc"]],bd:[["mua","Dâng điệu múa thảo nguyên"],["ban","Bắn cung trước điện"]],
 cn:[["huong","Pha một chén trà dâng lên"]]};
function kc2SelArts(){const k=S.origin.k;if(KC2DART[k])return KC2DART[k];const L=entArts().slice(0,2);return (L.length?L:[["cam",0,"Cầm"]]).map(([a,,n])=>[a,`Dâng ${n}`])}
function kc2SelOn(){return !!(S&&S.origin&&(S.origin.k==="cnv"?!!S.srv:true))}/* entry-exam: every origin meets the selection (ceiling Đáp ứng: gain / loss only, BAL.entry.fx) */
PEND.kc2Sel=pp=>{if(!S||S.dead||!S.selx||S.selx.done)return null;const srv=S.origin.k==="cnv";const top=RANKS[S.origin.r||0].n;
 const o=kc2SelArts().map(([art,n])=>kc2H(kcO(n,{suc:BAL.kc2.kc2SelOn_o_suc},()=>kc2SelPlay(art)),art?"chơi một màn; làm tốt thì được trọng":"không thi; tính như người cùng bậc tài nghệ","có rủi ro"));
 o.push(kc2H(kcO("Cúi đầu chờ xét",{suc:BAL.kc2.kc2SelOn_o_suc},()=>kc2SelPlay("")),"không thi; tính như người cùng bậc tài nghệ","an toàn"));
 return{who:srv?pMe():pEmp(),t:srv?`<p>Nội vụ phủ chọn cung nữ. Ma ma xem dung mạo, khéo tay, lễ nghi; người tốt được chia về hầu các vị nương nương bậc cao, người kém phải giặt đồ ở Tân Giả khố trước.</p>`
  :(S.origin.r||0)>0?`<p>Trước ngày phong, Hoàng thượng và Thái hậu cho gọi ngươi ra mắt. Thân phận cho ngươi được phong tới <b>${top}</b>; được hay không là ở buổi hôm nay.</p>`
  :`<p>Trước ngày phong, Hoàng thượng và Thái hậu cho gọi ngươi ra mắt. Ngươi sẽ được phong <b>${top}</b>; buổi hôm nay định Hoàng thượng và Thái hậu nhìn ngươi thế nào.</p>`,o}};
function kc2SelPlay(art){if(!S.selx||S.selx.done)return;S.selx.art=art;const fin=raw=>{if(!S.selx||S.selx.done)return;S.selx.done=1;S.selx.raw=raw;try{kc2SelDo(raw)}catch(e){console.error("kc2Sel",e)}try{showModal();render()}catch(e){}};
 if(!art){fin(entSkipRaw());return}/* entry-exam: the same value as "Để tài nghệ quyết định" */kc2Play(art,"Tuyển chọn","Điểm màn chơi quyết định phẩm vị",fin)}
function kc2SelDo(raw){const X=S.selx;const g=X.art;const sc=Math.round(entScore("dir",raw,g));/* ONE CORE: jentry entScore */const tier=sc>=KC2CUT[1]?2:sc>=KC2CUT[0]?1:0;X.sc=sc;X.tier=tier;
 const note=`kỳ tuyển chọn: ${KC2SW[tier]}, màn chơi ${raw}/10`;
 if(S.origin.k==="cnv"){const st=[S.age,S.sac,S.tai,S.duc,S.tamco,S.bac];kc2Place(tier,true);[S.age,S.sac,S.tai,S.duc,S.tamco,S.bac]=st;if(S.srv){if(tier===2)S.tin=cl((S.tin||40)+BAL.eff.jkc2.tinKc2SelDo,0,100);if(tier===0){S.srv.lau=4;S.place="tgk";try{S.visit=srvVisitOf("tgk")}catch(e){}}}
  const c=Q.find(m=>m.t==="Nhập cung làm cung nữ");if(c){c.h=String(c.h).replace(/\.\s*<\/p>/,`${tier===0?" (trước hết phải giặt đồ ở Tân Giả khố bốn tuần)":""}. Kết quả ${note}.</p>`)}
  log(`Tuyển cung nữ (${KC2SW[tier]}): ${tier===0?"Tân Giả khố, rồi ":""}hầu ${kc2RkN(srvM())}.`)}
 else{const top=S.origin.r||0;const rank=Math.max(0,top-(2-tier));const was=S.rank;S.rank=rank;if(rank<was){S.sung=Math.max(0,(S.sung||0)-(was-rank)*BAL.entry.stepSung)}S.lastPromo=S.turn;try{palFix()}catch(e){}kc2R0();
  const c=Q.find(m=>m.t==="Nhập cung");if(c){const h0=String(c.h),nw=`${RANKS[rank].n} (${note}${rank<top?`; thân phận cho tới ${RANKS[top].n}`:""})`;/* reviewer r1: main (j2, review/newgame-ui) now shows the rank in a kitRows "Phong" row; the old sentence form is kept for safety */
   c.h=h0.includes(`phong <b>${RANKS[was].n}</b>`)?h0.replace(`phong <b>${RANKS[was].n}</b>`,`phong <b>${nw}</b>`):h0.replace(new RegExp(`(Phong[\\s\\S]*?>)${RANKS[was].n}(<)`),`$1${nw}$2`)}
  log(`Tuyển chọn (${KC2SW[tier]}): phong ${RANKS[rank].n}${rank<top?`, thân phận cho tới ${RANKS[top].n}`:""}.`)}
 try{kcSnapReset()}catch(e){}deal()}
(function(){const a0=nlAccept;nlAccept=function(){const was=typeof NLP!=="undefined"&&NLP;const r=a0.apply(this,arguments);
 try{if(was&&S&&!S.dead&&!S.kc&&!S.selx&&kc2SelOn()){S.selx={};const d=mkP("kc2Sel",{});if(d){const m={t:"Tuyển chọn",h:d.t,opts:d.o,who:d.who,pid:"kc2Sel",pp:{}};const i=Q.findIndex(x=>/^Nhập cung/.test(x.t||""));if(i>=0)Q.splice(i,0,m);else Q.unshift(m);showModal();render()}}}catch(e){console.error("kc2Sel start",e)}return r}})();


/* ---------- "Chờ" worth the palace years (owner 16/11 08:45Z, OD:L1288) ----------
   BAL.kcv (one core table): what the home years carry into the palace, so that waiting is worth what the same months lived in the palace
   give. Calibrated with dev/measure/kc2val.js (sensible bots, same calendar point; method + numbers in dev/handover/reports/kc-roads-cn-nc.md):
   before, the palace arm led by V≈90 (tiểu thư), ≈137 (nc), ≈185 (cnv), mostly Sủng, Danh, Tư chất, people known. The carry is EARNED: it is
   scaled by her selection result (kém ×0.8, khá ×1, tốt ×1.2) and given as the home years' own currencies: Danh (her name at the selection /
   the treaty / the village draft), the Emperor's curiosity for a new face (Sủng, consorts only), Tư chất trained at home (each of Sắc, Tài,
   Tâm cơ, Đức), true knowledge of the harem (people known), tài nghệ, bạc; a cung nữ start also the trust of her first mistress (Chủ tin). */
/* fix (r3 FAIL 1, OD:L1288): re-measured with 16 / 8 lives per arm, both arms on ONE build (dev/handover/reports/kc-roads-cn-nc-fix.md): the home road
   already wins the selection (home skills → khá / tốt, the palace arm meets kém → Tân Giả khố), so the carry was counted twice: dan (cnv) and nc lowered;
   kc (tiểu thư, muoi) was inside the spread and stays. */
/* fix2 (r1 FAIL 1, OD:L1288): re-measured on main ee5d33de + entry-exam (4 seeds x 4 lives per arm, both arms fresh; report kc-roads-cn-nc-fix2.md):
   cnv +8 and nc +3 now inside the spread (unchanged); bd (Bắc Địch, ran the nc row) home −28 → own row bd (the Emperor's curiosity for the steppe
   princess, her name at the treaty); tiểu thư (kc: muoi +47, tt +67) home too strong → the kc carry halved. A row per origin key wins over its road kind. */
/* F1 (review-oi-r1, 17/11): kc2val's home bot now self-studies like the palace bot (both arms, 3 seeds x 6 lives): cnv −3 ±22 (inside, unchanged);
   nc −193 ±13 (palace Sủng 100 / Danh 93 at 23 months vs home 39 / 38) → nc carry raised (dn 8→45, sung 10→45, st 3→14, kn 6→8, art 1→3):
   nc −63 ±15. The rest is the palace rank step (Phi) a home road cannot carry and the palace arm's Sủng/Danh saturation (story-bot fault 2):
   re-measure nc when fault 2 is fixed (the carry may then be too high). */
BAL.kcv={kc:{dn:18,sung:14,st:4,kn:3,art:1,bac:0,tin:0},nc:{dn:45,sung:45,st:14,kn:8,art:3,bac:10,tin:0},bd:{dn:12,sung:18,st:3,kn:6,art:1,bac:10,tin:0},
 /* tiểu thư rows per origin (the home Phúc tuyển already lifts ch / dtq above the palace arm; td / thd enter low): measured gaps on the kc row ch +65, dtq +43, td −72, thd −21 */
 ch:{dn:4,sung:0,st:1,kn:1,art:0,bac:0,tin:0},dtq:{dn:8,sung:6,st:2,kn:2,art:0,bac:0,tin:0},td:{dn:45,sung:35,st:10,kn:8,art:1,bac:0,tin:0},thd:{dn:24,sung:18,st:5,kn:4,art:1,bac:0,tin:0},dan:{dn:50,sung:0,st:10,kn:10,art:1,bac:40,tin:25}};
function kc2Carry(kind,tier){const ok=S&&S.origin&&BAL.kcv[S.origin.k]?S.origin.k:kind;/* a row per origin key (bd) wins over its road kind */const B=BAL.kcv[ok];if(!B||!S||S.dead||(S.kc&&S.kc.carry))return null;const f=[.8,1,1.2][tier==null?1:tier]||1;const n=x=>Math.round(x*f);const was=rsnap();
 S.danh=Math.min(100,(S.danh||0)+n(B.dn));if(B.sung&&!(S.srv&&!S.srv.risen))S.sung=Math.min(100,(S.sung||0)+n(B.sung));for(const k of ["sac","tai","tamco","duc"])S[k]=Math.min(100,(S[k]||0)+n(B.st));
 if(B.art){const a=kcBestArt();try{addArt(a,n(B.art)*3)}catch(e){}}if(B.bac)S.bac=(S.bac||0)+n(B.bac);if(B.tin&&S.srv)S.tin=cl((S.tin||40)+n(B.tin),0,100);
 try{const L=shuf(liveRivals(true).filter(v=>!v.coop&&!(typeof k61St==="function"&&k61St(v)>=2)));for(const v of L.slice(0,n(B.kn))){try{k61Know(v,"tin ngoài cung",true,2)}catch(e){}if(S.kc&&!S.kc.intel.includes(v.id))S.kc.intel.push(v.id)}}catch(e){}
 if(S.kc)S.kc.carry={kind:ok,tier,f};const rows=[["Danh",`+${n(B.dn)}`,"t"]].concat(B.sung&&!(S.srv&&!S.srv.risen)?[["Sủng (Hoàng thượng để ý người mới)",`+${n(B.sung)}`,"t"]]:[]).concat([["Sắc, Tài, Tâm cơ, Đức",`mỗi thứ +${n(B.st)}`,"t"],["Người trong cung đã biết",`+${n(B.kn)}`,"t"]])
  .concat(B.art?[["Tài nghệ",`+${n(B.art)} bậc luyện`,"t"]]:[]).concat(B.bac?[["Bạc",kitChip("Bạc",n(B.bac),"n"),"t"]]:[]).concat(B.tin&&S.srv?[["Chủ tin",`+${n(B.tin)}`,"t"]]:[]);
 Q.push({t:"Hành trang những năm ở nhà",who:pMe(),h:`<p>Những năm ở nhà không mất đi: ngươi mang theo vào cung những gì đã học, đã biết, đã được người đời nhắc tên.</p>`+kitRows(rows)});return rows}
(function(){const e0=kc2Enter;kc2Enter=function(raw){const r=e0.apply(this,arguments);try{if(S&&S.kc&&S.kc.inPal&&S.kc.ex)kc2Carry(S.kc.kd,S.kc.ex.tier)}catch(e){console.error("kc2Carry",e)}return r}})();
(function(){const e0=kcEnter;kcEnter=function(rank){const r=e0.apply(this,arguments);try{if(S&&S.kc&&S.kc.inPal&&!S.kc.kd)kc2Carry("kc",Math.max(0,Math.min(2,S.rank)))}catch(e){console.error("kc2Carry kc",e)}return r}})();
/* the tiểu thư card says the same (jkc text, one line added) */
(function(){const p0=kcPathHTML;kcPathHTML=function(){const h=p0.apply(this,arguments);try{if(!kc2D())return h.replace("Phúc duyên khi qua tuyển tú","Phúc duyên khi qua tuyển tú; vào cung mang theo hành trang những năm ở nhà (Danh, Tư chất, người đã biết)")}catch(e){}return h}})();
