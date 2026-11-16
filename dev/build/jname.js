/* jname.js — ONE NAME CORE (owner rule 16/11 ~20:20Z, last line of OWNER_DECISIONS: "mỗi người một cái tên, không ai giống ai";
   no Vietnamese-style surnames; ancient Chinese court names written in Hán-Việt). Research + exclusion reasons: dev/handover/reports/names-expert.md.
   This file is the ONLY name list in the game. Older pool names (SURN, GIVEN, MALEN, MAIDS, EUN, PRINCE, PRINCESS, QNG, CTG, KCMN, KCFN,
   J59*) are aliases of these arrays. Every place that makes a person calls nmNew(kind); jnamefix.js (assembled last) keeps the save-wide
   registry S.nmReg, renames duplicates / excluded names in old saves once, and sweeps every month as a safety net. Loaded right after j0. */
/* excluded surnames: the 14 surnames that cover ~90 % of Vietnamese people (Nguyễn … Lý), their Vietnamese-only readings (Huỳnh, Võ)
   and the surnames of Vietnamese ruling houses (Đinh, Mạc, Trịnh) — a Vietnamese reader hears "người Việt" first */
const NM_BAN_SUR=["Nguyễn","Trần","Lê","Phạm","Hoàng","Huỳnh","Phan","Vũ","Võ","Đặng","Bùi","Đỗ","Hồ","Ngô","Dương","Lý","Đinh","Mạc","Trịnh"];
/* Vietnamese middle-name markers (never the first syllable of a given name) and modern Vietnamese given names */
const NM_BAN_G1=["Thị","Văn","Hữu","Đình","Công","Quang","Duy"];
const NM_BAN_GIVEN=["Thu Thủy","Bích Hà","Minh Châu","Ngọc Lan","Thu Cúc","Hồng Liên","Xuân Hạnh","Bích Ngọc","Ngọc Anh","Thanh Hà","Thu Hà","Kim Anh","Phương Anh","Thùy Linh","Minh Anh","Bảo Ngọc","Thanh Tâm","Thanh Thủy","Hoài An","Đức Minh","Hữu Chính","Gia Huy","Minh Triết","Tuấn Dật","Cẩm Tú","Lan Chi","Thủy Tiên","Tố Tâm","Họa Mi","Diễm Thu","Ngọc Dung","Phương Hoa","Hồng Diệp","Băng Tâm","Hải Đường","Minh Ngọc","Thu Cúc","Ngọc Hà","Kim Ngân","Thanh Hương","Mỹ Linh","Hồng Nhung"];
/* surnames: classic Chinese houses as they read in dubbed court dramas (Thẩm, Chân, Niên, Tô, Lâm, Phú Sát …) */
const NM_SUR=["Thẩm","Tô","Lâm","Diệp","Ôn","Hạ","Bạch","Liễu","Cố","Tạ","Vân","Chu","Phùng","Lục","Tống","Hàn","Đường","Hoa","Kiều","Tần","Nhan","Mạnh","Từ","Khương","Chân","Niên","Vương","Lưu","Triệu","Tôn","Mã","Quách","Cao","La","Lương","Hứa","Tào","Bành","Tăng","Tiêu","Điền","Đổng","Viên","Vu","Tưởng","Dư","Trình","Ngụy","Lữ","Nhâm","Diêu","Lư","Thôi","Chung","Uông","Thạch","Liêu","Phó","Phương","Tiết","Khâu","Giang","Doãn","Lôi","Sử","Đào","Thiệu","Nghiêm","Khổng","Tề","Yến","Hách","Đậu","Trương","Mộ Dung","Thượng Quan","Đoan Mộc","Tư Mã","Nam Cung","Độc Cô","Trưởng Tôn","Phú Sát"];
/* noble ladies (consorts, quý nữ, sisters, friends) */
const NM_F=["Mi Trang","Uyển Nhi","Thanh Ca","Như Ý","Nguyệt Hoa","Tuyết Dao","Ngọc Hành","Tịnh Nghi","Thục Nghi","Hàm Hương","Bích Dao","Linh Lung","Yên Nhiên","Mạn Châu","Tử Yên","Vân Thường","Nhược Lan","Mộng Điệp","Ngưng Sương","Tú Uyển","Vân Khanh","Bạch Lộ","Kiều Nguyệt","Tịch Nhan","Lạc Anh","Ngọc Dao","Dao Cầm","Uyển Ninh","Tư Dao","Thanh Hoan","Cẩm Sắt","Nhã Như","Vân Tịch","Ngọc Khê","Lạc Y","Tri Ý","Hoán Khê","Ninh Hương","Thục Hoa","Diệu Âm","Cầm Thư","Như Yên","Uyển Thanh","Linh Tê","Tịnh Dung","Mạn Ca","Kiều Ân","Hân Duyệt","Ngọc Nhu","Tĩnh Uyển","Tuyết Nhạn","Lạc Yên","Uyển Dung","Dung Âm","Lang Hoa","Hải Lan","Ý Hoan","Hi Nguyệt","Hàm Yên","Thanh Uyển","Nghiên Thu","Mặc Lan","Tố Nga","Vân La","Sương Hoa","Chỉ Nhược","Thi Hàm","Lạc Tuyết","Tâm Duyệt","Mộng Dao","Kinh Hồng","Chiêu Hoa","Ngữ Yên","Khê Nguyệt","Nhã Ninh","Tĩnh Thù","Hàn Yên","Trầm Bích","Thải Vi","Lệ Hoa","Anh Ninh","Thần Hi","Chỉ Lan","Sơ Ảnh","Như Sương","Liên Y","Tuyết Kiến","Mạn Nhu","Ngọc Chiêu","Quân Dao","Uyển Hề","Hàm Chương","Tố Huyên","Cẩm Sương","Lưu Ly","Vân Yên","Doanh Nguyệt","Thanh Từ","Nghi Tu","Thuần Nguyên","Nhu Tắc","Tinh Diêu","Ngưng Hoa","Tố Tuyết","Thanh Diên","Uyển Âm","Như Mặc","Dao Quang","Tương Quân","Mạn Sương","Nhạn Hồi","Lan Âm","Phù Dung","Diệu Hoa","Sở Sở","Thanh Nhã","Ngọc Thù","Ngân Chúc","Tố Ngưng","Yên La","Hương Ngưng","Tử Đàn","Linh Vận","Thục Ý","Nguyệt Thiền","Vãn Tình","Lăng Ba","Nghê Thường","Bích Lạc","Hàn Tuyết","Ngọc Huyền","Thư Dao","Tịnh Sơ","Cẩm Tâm","Uyển Đình","Kính Nghi","Nhu Gia","Chiêu Nghi","Thái Vi"];
/* men (officials, guards, the men of S.men, sons of the great houses, fathers, brothers) — courtesy-name style */
const NM_M=["Tử Khiêm","Minh Viễn","Thừa Chí","Kính Chi","Bá Ngôn","Tử Hiên","Cẩn Ngôn","Thừa Ân","Hạo Nhiên","Vân Khởi","Duệ Trạch","Tư Viễn","Bách Xuyên","Thanh Hành","Dịch Chi","Trác Nhiên","Ngọc Đường","Hoài Cẩn","Mộ Bạch","Quân Diệc","Thận Hành","Khải Trạch","Cảnh Hoài","Dật Thanh","Quân Hạo","Thanh Diễn","Hựu Ninh","Tấn Lương","Cẩn Du","Hoằng Nghị","Thiệu Khang","Kính Đường","Bác Văn","Thế Khanh","Trọng Lễ","Tế An","Hoài Nhân","Tử Kỳ","Trọng Hoa","Thúc Dạ","Quý Thường","Bá Cơ","Tử Mặc","Tư Nguyên","Cảnh Diễm","Hành Chi","Cửu Tư","Diệc Thần","Tuân Lễ","Thủ Chuyết","Lập Chi","Kính Đình","Tông Hàn","Triệt Ngôn","Thịnh Đình","Thiệu Khiêm","Uẩn Chi","Diên Niên","Hy Bạch","Lăng Tiêu","Tĩnh Viễn","Mạnh Chương","Thủ Nhân","Tri Viễn","Thanh Viễn","Vọng Thư","Thành Ngọc","Tề Quang","Kỳ Niên","Tử Thường","Thúc Nghi","Nguyên Lãng","Phụng Chi","Tùng Niên","Huyền Độ","Tử Uyên","Học Nghiêm","Chính Khanh","Hàm Chi","Cảnh Minh","Trường Khanh","Dực Chi","Thiếu Lăng","Bá Ước","Trọng Đạt","Thúc Hành","Quý Ngọc","Tử Kính","Tử Chiêm","Cảnh Thăng","Hoằng Độ","Diễn Chi","Tu Viễn","Khắc Kỷ","Sĩ Hành","Tư Cung","Tử Do","Nghĩa Sơn","Trọng Khanh","Uyên Minh","Mậu Tiên","Kính Phu","Thiếu Bạch","Tử Lăng"];
/* palace maids: one given name, as masters named them (Hồng Lâu Mộng / Qing palace style); a surname is added only when these run out */
const NM_MAID=["Tiểu Đào","Xuân Đào","Hoán Bích","Lưu Chu","Cận Tịch","Bội Nhi","Hoa Tuệ","Tiễn Thu","Phẩm Nhi","Cẩm Tịch","Nhĩ Tình","Trân Châu","Hổ Phách","Thải Bình","Thải Nguyệt","Lục Châu","Tố Cầm","Thanh Trúc","Tử Đằng","Lạc Mai","Thúy Vi","Bảo Châu","Liên Tâm","Họa Bình","Thải Vân","Ngọc Tranh","Linh Chi","Tuyết Cầu","Thu Lộ","Hương Lăng","Tình Văn","Tập Nhân","Xạ Nguyệt","Tử Quyên","Oanh Nhi","Bình Nhi","Uyên Ương","Ngọc Xuyến","Kim Xuyến","Tú Quất","Tư Kỳ","Nhập Họa","Bão Cầm","Tố Vân","Thu Văn","Bích Ngân","Thải Liên","Châu Nhi","Lục Liễu","Hồng Tiêu","Bích Đào","Tịch Nguyệt","Hàm Thúy","Quế Nhi","Tố Nguyệt","Băng Nhi","Cúc Nhi","Đông Tuyết","Thu Sương","Xuân Liễu","Hạ Hà","Thúy Bình","Ngân Linh","Tiểu Hoàn","Tiểu Điệp","Tiểu Liên","Tiểu Mãn","Tiểu Dung","Thúy Lũ","Xuân Yến","Thu Đồng","Hạnh Nhi","Mạch Nhi","Sơ Tuyết","Thải Chi","Tú Châu","Ngọc Lộ","Vân Nhi","Liễu Nhi","Đào Diệp","Phỉ Thúy","San Hô","Lưu Tô","Thúy Mặc","Bạch Chỉ","Phục Linh","Bán Hạ","Tử Tô","Kim Quất","Ngân Hạnh","Hồng Ngọc","Thanh Đại","Yên Chi","Tịch Lam","Nguyệt Quế","Mộc Cận","Hàm Tiếu","Tuyết Liên","Xảo Nhi","Thải Hà","Ỷ Thúy","Uyển Tâm","Thu Thiền","Chi Nhi","Họa Nhi","Hà Nhi","Thư Nhi","Kỳ Nhi","Cầm Nhi","Mặc Nhi","Như Họa","Tố Trân","Lan Tâm","Huệ Tâm"];
/* young eunuchs: "Tiểu X Tử" (as the palace called them); senior eunuchs: surname + given (Tô Bồi Thịnh style) */
const NM_EUNX=["Lộ","Phúc","Thuận","An","Hỉ","Quế","Ngân","Hải","Toàn","Bình","Kiệt","Minh","Ninh","Lộc","Thọ","Khang","Đức","Trụ","Xuân","Lâm","Thành","Cát","Tường","Khánh","Bảo","Trung","Tín","Hòa","Kính","Cẩn","Lương","Tiến","Vượng","Hưng","Thịnh","Lai","Đắc","Song","Quý","Ngọc","Thạch","Trác","Tùng","Mậu","Nguyên","Lợi","Toại","Duyệt","Xương","Thái","Sơn","Hà","Liên","Mãn","Doanh","Điền","Phong","Tài","Chính","Nghĩa"];
const NM_EUNG=["Phúc An","Bảo Thuận","Đức Hải","Kính Trung","Trường An","Tiến Hỷ","Thủ Nghĩa","Lộc Toàn","Bồi Thịnh","Tiến Trung","Ngọc Trụ","Đức Thọ","Vĩnh Lộc","Liên Thuận","Thường Hỷ","Bảo Hòa","Thuận Đức","Phúc Thọ","Hỷ Lâm","Trung Cẩn","Quế Lâm","Toàn Phúc","An Thái","Cát Tường","Thọ Khang","Đắc Lộc","Hưng Nghĩa","Khánh Dư","Vượng Tài"];
/* imperial physicians (Thái y): courtesy-name style of the Thái y viện */
const NM_DOC=["Tế An","Thế Khanh","Hoài Nhân","Bá Ngôn","Tử Hiên","Minh Viễn","Thừa Ân","Tư Thiện","Bách Thảo","Tế Thế","Nhân Phủ","Thận Vi","Hòa Chi","Thanh Nang","Diệu Thủ"];
/* princes: one generation character per generation (Qing practice: Dận, Hoằng, Vĩnh, Miên …) + a second character */
const NM_PGEN=["Vĩnh","Hoằng","Miên","Dận","Dịch","Tái"];
const NM_PX=["Kỳ","Diễm","Trú","Thành","Ninh","Tinh","Chiêm","Dung","Tường","Lân","Khải","Diệu","Cơ","Hoán","Thụy","Tông","Hiên","Cảnh","Huyên","Lịch","Chương","Diễn","Hạo","Tuấn","Thừa","Bích","Trinh","Nghiêm","Mẫn","Tuyên","Kính","Chính","Khôi","Lâm","Quỳ","Duệ","Hành","Cẩn","Chiếu","Hy"];
/* princesses: title names (Hòa Kính, Hòa Thạc … Qing style) */
const NM_PRINCESS=["Hòa Kính","Hòa Gia","Tĩnh An","Hòa Thạc","Ninh Thọ","Thục Thận","Hòa Khác","An Lạc","Vĩnh Gia","Uyển Trinh","Hòa Huệ","Đoan Mẫn","Thục Tuệ","Hòa Uyển","Thọ Ân","Thọ An","Hòa Tĩnh","Hòa Đoan","Đoan Nhu","Vinh Hiến","Hòa Thục","Đoan Tĩnh","Ôn Hiến","Thuần Hy","Hòa Duyệt","Trang Kính","Trang Tĩnh","Vinh An","Thọ Ninh","Đoan Thuận","Hòa Mục","Thục Gia","Ninh Khang","Hòa Thuận","Tuệ Khánh","Ôn Khác","Thục Mẫn","Gia Hòa"];
/* --- helpers --- */
const NM_TITLES=["Tổng quản thái giám","Thái giám Kính sự phòng","Thái giám Nội vụ phủ","Tổng quản","Thái giám","Hoàng tử","Công chúa","Thị vệ","thị vệ","Hàn lâm","Thái y","Vương gia","Nhạc sư","Sứ thần","Họa sư","Phế phi","Cung nữ","Ma ma"];
function nmBare(n){let s=String(n||"").trim();for(let k=0;k<3;k++){let hit=0;for(const t of NM_TITLES)if(s.startsWith(t+" ")&&s.length>t.length+1){s=s.slice(t.length+1).trim();hit=1;break}if(!hit)break}return s}
/* "Tiểu X Tử" and a maid's one given name have no surname; "Hoàng tử Vĩnh Kỳ" -> given "Vĩnh Kỳ" */
function nmNoSur(b){const w=String(b||"").split(" ");return w.length<=2||((w[0]==="Tiểu"||w[0]==="Lão")&&w[w.length-1]==="Tử"&&w.length===3)}
function nmSurOf(b){b=String(b||"");if(/ (thị|gia)$/.test(b))return b.replace(/^Lão phu nhân /,"").replace(/ (thị|gia)$/,"");if(nmNoSur(b))return b.split(" ").length===1?b:"";
 const w=b.split(" ");return w.slice(0,w.length-2).join(" ")}
function nmGivenOf(b){b=String(b||"");if(nmNoSur(b))return b;return b.split(" ").slice(-2).join(" ")}
/* same short forms the masking code uses (jht nVars): full, given, surname + last word */
function nmVars(b){const w=String(b||"").split(" ").filter(Boolean);const V=[w.join(" ")];if(w.length>=3&&!nmNoSur(b)){V.push(w.slice(-2).join(" "));V.push(w[0]+" "+w[w.length-1])}
 /* j25 ageInit turns "Tiểu X Tử" into "Lão X Tử" at 45: one living "X" eunuch at a time (internal key, never a real name) */
 if(w.length===3&&(w[0]==="Tiểu"||w[0]==="Lão")&&w[2]==="Tử")V.push("@eun "+w[1]);return V}
function nmBad(b){b=nmBare(b);if(!b)return"";const su=nmSurOf(b);if(su&&NM_BAN_SUR.includes(su))return"sur";
 const g=nmGivenOf(b);if(g&&!/ (thị|gia)$/.test(b)){const g1=g.split(" ")[0];if(NM_BAN_G1.includes(g1)&&!/^(Tiểu|Lão) /.test(b))return"g1";if(NM_BAN_GIVEN.includes(g))return"given"}return""}
/* every person the save holds, one entry per person (first entry of a name keeps it). f = the field holding the personal name. */
function nmPeople(){const L=[];if(typeof S==="undefined"||!S)return L;const seen=new Set();
 const add=(o,kind,f,x)=>{if(!o||typeof o!=="object"||seen.has(o))return;const v=o[f||"name"];if(typeof v!=="string"||!v.trim())return;seen.add(o);L.push(Object.assign({o,kind,f:f||"name"},x||{}))};
 add(S,"f","name",{me:1});
 try{(rivals||[]).forEach(v=>add(v,"f",null,v.coop?{guest:1}:null))}catch(e){}
 try{allKids().forEach(([k,v])=>add(k,k.sex==="m"?"prince":"princess",null,v&&v.coop?{guest:1}:null))}catch(e){}
 try{const C=S.court||{};for(const k in C){const c=C[k];if(!c||typeof c!=="object")continue;add(c,k==="ty"?"doc":k==="ped"?"eun":"eunE",c.pn?"pn":"name",{court:k})}}catch(e){}
 try{(S.men||[]).forEach(m=>add(m,"m"))}catch(e){}
 try{const T=S.trieu;if(T&&T.H)for(const c in T.H)add(T.H[c],"m",null,{fam:T.H[c]&&T.H[c].dadOf==="me"})}catch(e){}
 try{(S.kc&&S.kc.fam||[]).forEach(p=>add(p,p.role==="consort"?"f":p.role==="mama"?"mo":"m",null,{fam:/^(cha|huynh|muoi|to)$/.test(p.r||"")}))}catch(e){}
 try{(S.hPool||[]).forEach(p=>add(p,"m"))}catch(e){}
 try{(S.qPool||[]).forEach(p=>add(p,"f"))}catch(e){}
 try{add(S.maid,"maid");const sk=s=>s.role==="eunuch"?"eun":s.eid?"f":"maid";(S.staff||[]).forEach(s=>add(s,sk(s)));(rivals||[]).forEach(v=>{const G=v.coop?{guest:1}:null;add(v.maid,"maid",null,G);(v.staff||[]).forEach(s=>add(s,sk(s),null,G))});try{(S.thO&&S.thO.staff||[]).forEach(s=>add(s,sk(s)))}catch(e){}}catch(e){}
 return L}
function nmAlive(e){const o=e.o;return o.alive!==false&&o.alive!==0&&!o.dead&&!o.out}
function nmReg(){if(typeof S==="undefined"||!S)return null;if(!S.nmReg||typeof S.nmReg!=="object")S.nmReg={};return S.nmReg}
/* co-op: the host owns the one registry (owner rule); a guest never writes it (worldOn() of the one-world co-op, review/coop-one-world: true = solo or host; before it lands: COOPW seat "a" = host). A guest's new person is
   named on her side without registering; the host's sweep (jnamefix, after every rebuild) renames any clash once it reaches the world. */
function nmOwner(){try{if(typeof worldOn==="function")return !!worldOn()}catch(e){}try{const W=window.COOPW;if(W&&W.on&&W.seat&&W.seat!=="a")return false}catch(e){}return true}
/* taken = every name ever given in this save (registry) + every name held now; vars = short forms of the LIVING (no "Uyển Nhi" beside "Thẩm Uyển Nhi") */
function nmTaken(){const full=new Set(),vars=new Set(),sur=new Set();const R=nmReg();if(R)for(const k in R)full.add(k);
 for(const e of nmPeople()){const b=nmBare(e.o[e.f]);full.add(b);if(nmAlive(e)){nmVars(b).forEach(v=>vars.add(v));const s=nmSurOf(b);if(s)sur.add(s)}}
 try{if(S&&S.st){if(S.st.guard)full.add(nmBare(S.st.guard));if(S.st.stu)full.add(nmBare(S.st.stu))}}catch(e){}return{full,vars,sur}}
/* no word twice in one name ("Kiều Kiều Ân", "Lục Lục Trường") */
function nmTwice(n){const w=String(n).split(" ");return new Set(w).size===w.length}
function nmPickA(a){return a[Math.floor(Math.random()*a.length)]}
function nmCand(kind,o){const sing=()=>{const L=NM_SUR.filter(s=>s.indexOf(" ")<0&&!(o.avoidSur&&o.avoidSur.has(s)));return o.sur||nmPickA(L.length?L:NM_SUR)};
 switch(kind){case"f":return (o.sur?o.sur:Math.random()<.12?nmPickA(NM_SUR.filter(s=>s.indexOf(" ")>0)):sing())+" "+nmPickA(NM_F);
  case"maid":return o.wide?sing()+" "+nmPickA(NM_MAID):nmPickA(NM_MAID);
  case"eun":return o.wide?sing()+" "+nmPickA(NM_EUNG):"Tiểu "+nmPickA(NM_EUNX)+" Tử";
  case"eunE":return sing()+" "+nmPickA(NM_EUNG);
  case"doc":return sing()+" "+nmPickA(NM_DOC);
  case"prince":return (o.gen||nmGen())+" "+nmPickA(NM_PX);
  case"princess":return o.wide?nmPickA(NM_PGEN.concat(["Hòa","Thục","Đoan","An","Tĩnh","Uyển"]))+" "+nmPickA(NM_PX):nmPickA(NM_PRINCESS);
  case"mo":return sing()+" thị";
  default:return sing()+" "+nmPickA(NM_M)}}
/* the Emperor's children of one generation share the generation character (stored per save; a new reign may move it on) */
function nmGen(){try{if(S){if(!S.nmGen)S.nmGen=NM_PGEN[0];return S.nmGen}}catch(e){}return NM_PGEN[0]}
/* nmNew(kind, opts): a name nobody in this save has ever had. kinds: f (lady/consort), m (man/official), maid, eun (young eunuch),
   eunE (senior eunuch), doc (physician), prince, princess (given part only; the caller adds "Hoàng tử"/"Công chúa"), mo ("X thị").
   opts.sur = family surname to keep; opts.avoidSur = Set of surnames to avoid; opts.more = people/names made in the same batch, not stored yet; opts.reg=false = do not register (a guest's draft). */
function nmNew(kind,opts){const o=opts||{};const T=nmTaken();(o.more||[]).forEach(m=>{const b=nmBare(m&&m.name!=null?m.name:m);if(b){T.full.add(b);nmVars(b).forEach(v=>T.vars.add(v));const s=nmSurOf(b);if(s)T.sur.add(s)}});const ok=n=>!T.full.has(n)&&!nmBad(n)&&nmTwice(n)&&(kind==="mo"?!T.sur.has(nmSurOf(n)):!nmVars(n).some(v=>T.vars.has(v)));
 let n="";for(let t=0;t<400&&!n;t++){const c=nmCand(kind,Object.assign({},o,{wide:t>=300}));if(ok(c))n=c}
 if(!n){/* exhaustive: every surname x every given of the kind, then the wide form */const G=kind==="f"?NM_F:kind==="maid"?NM_MAID:kind==="eun"||kind==="eunE"?NM_EUNG:kind==="doc"?NM_DOC:kind==="prince"?NM_PX:kind==="princess"?NM_PRINCESS:NM_M;
  const SS=o.sur?[o.sur]:NM_SUR;outer:for(const s of SS)for(const g of G){const c=kind==="princess"?g:s+" "+g;if(kind!=="prince"&&ok(c)){n=c;break outer}}
  if(!n&&kind==="prince")outer3:for(const a of NM_PGEN)for(const g of NM_PX){const c=a+" "+g;if(ok(c)){n=c;break outer3}}
  if(!n)outer2:for(const s of NM_SUR)for(const a of NM_SUR)for(const g of (kind==="f"||kind==="maid"?NM_F:NM_M)){const c=s+" "+a.split(" ")[0]+" "+g.split(" ")[1];if(!T.full.has(c)&&!nmBad(c)){n=c;break outer2}}}
 if(o.reg!==false&&nmOwner()){const R=nmReg();if(R)R[n]=kind}return n}
window.nmNew=nmNew;window.nmBare=nmBare;window.nmBad=nmBad;window.nmPeople=nmPeople;
