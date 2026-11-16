/* ================= jkc: TIỂU THƯ NGOÀI CUNG (owner 11/14 20:15Z; plan dev/OUTSIDE_PLAN.md, approved) =================
   A second road into the same life: on the identity card (and at every rebirth) she picks "Vào cung ngay" or
   "Ở nhà chờ tuyển tú". The home road: she is 18, at home in her father's house, from the first month of the game until the
   tuyển tú of year KC.ty (spring), while the palace world runs on without her (same calendar, same rivals, same court j55).
   Template: j42 (servant start). While isKc() she is NOT a consort: consorts() leaves her out, world calls run inside kcW()
   (S.out=1, as srvW), and her own turn runs kcEndTurn / kcWeek / kcMonth.
   UI (kit only): the bottom tabs are relabelled (act Khuê phòng · rv Gia tộc · staff Giao du · art Tài nghệ · kid Thư từ ·
   inv Tư trang · story Mệnh truyện · go Dư đồ); every act is a deck card (kit act card: price, gain, loss, odds word; locked
   cards say why); events are PEND dilemmas (show only costs; result card shows the numbers); stage plaques show her family.
   Family = real people with faces from the existing figure pools (fid), relation pairs both ways (af = with her, me = hers),
   Oán; they stand at one place per buổi (S.kc.at, the one ledger the stage, map and acts all read).
   Finale: Sơ tuyển → Phúc tuyển (real minigame via playArt) → Điện tuyển → entry rank (Đáp ứng/Thường tại/Quý nhân) and the
   carry-over (OUTSIDE_PLAN §9), or "trả thẻ bài" and the marriage endings. Rare endings via j97 (RARE97). Kiếp dở dang via jkiep.
   Co-op hooks (§13): kcHook(kind,payload) stubs, single-player uses them with family senders. Old saves: no S.kc, nothing changes. */
const KC={ok:["tt","dtq","muoi","thd","ch","td"],ty:3,tm:2,
 /* balance knobs (bot-measured, dev/PROGRESS_outside.md) */
 cut:[50,80,100],selMax:80,      /* Điện tuyển score: below [0] = trả thẻ bài, [1] Thường tại, [2] Quý nhân, else Đáp ứng */
 so:{sac:30,suc:25,ld:70,gt:15},ev:38,apM:2,sch:22,ill:3,dowry:.6};
const KCDAD={tt:["Tể tướng","phủ Tể tướng"],dtq:["Đại tướng quân","phủ Tướng quân"],muoi:["Đại thương muối","Diêm thương phủ"],thd:["Thầy đồ","nhà thầy đồ"],ch:["Quốc cữu","phủ Quốc cữu"],td:["Thị lang bộ Lễ","phủ Thị lang"]};
/* KC LORE (coordinator 16/11, review/kc-lore): muoi has no clan (a salt merchant is no minister's kin: the Hộ bộ official only squeezes the house, KCOB muoi 2); same as clanOf() in the palace */
const KCCLAN={tt:"Tể tướng",dtq:"Đại tướng quân",thd:"Hàn lâm",td:"Lễ bộ"};
/* KC LORE: new games run lore v2 (the td house falls only when she leaves for the palace; one father, one brother, one dress). Old saves (S.kc.v 1) keep their old rules. At the identity card S.kc does not exist yet: that is always a new game. */
function kcLore(){return !S||!S.kc||(S.kc.v||1)>=2}
const KCMN=["Đức Minh","Hữu Chính","Kính Đường","Bác Văn","Thế Khanh","Trọng Lễ","Hoài An","Tư Viễn","Thừa Tông","Bảo Thành","Gia Mậu","Duy Nhạc"];
const KCFN=["Ngọc Nhu","Tĩnh Uyển","Bích Hà","Thu Thủy","Minh Châu","Lạc Yên","Hoài Ngọc","Tuyết Nhạn","Vân Khanh","Mộ Tình","Thanh Đại","Liên Kiều"];
const KCGTU={tt:80,dtq:65,muoi:90,thd:25,ch:75,td:55};
/* places: key -> [name, scene code, in the house?, line] (scenes are placeholders until the gpt-2-6 set, OUTSIDE_PLAN §14) */
const KCPL={
 kc_khue:["Khuê phòng","kcKhue",1,"Phòng riêng trên lầu: rèm the, án thêu, cửa sổ nhìn xuống hoa viên."],
 kc_sanh:["Chính sảnh","kcSanh",1,"Cả nhà thỉnh an, tiếp khách; bà mối ngồi uống trà ở đây."],
 kc_thu:["Thư phòng của cha","kcThu",1,"Sách vở, công văn, bàn cờ. Cha bàn việc triều ở đây."],
 kc_me:["Viện mẫu thân","kcMe",1,"Viện của chính thất, sau hành lang có giàn hoa tử đằng."],
 kc_di:["Viện di nương","kcDi",1,"Viện phía tây của di nương và thứ muội."],
 kc_vuon:["Hoa viên nhà","kcVuon",1,"Hồ sen, giả sơn, đình hóng mát. Đêm xuống ít người qua lại."],
 kc_tu:["Từ đường","kcTu",1,"Bài vị tổ tiên. Chuyện lớn của nhà đều phân xử trước tổ tiên."],
 kc_hoc:["Phòng học","kcHoc",1,"Nơi các thầy đến dạy đàn, thơ, họa, múa."],
 kc_chua:["Chùa Hộ Quốc","kcChua",0,"Chùa lớn ngoài cửa Tây, ngày rằm đông khách quyền quý."],
 kc_cho:["Phố chợ","kcCho",0,"Hàng lụa, hàng phấn, thái giám ra cung mua sắm cũng qua đây."],
 kc_tra:["Trà lâu","kcTra",0,"Tầng trên có nhã gian; chuyện triều đình, chuyện trong cung đều nghe được."],
 kc_sach:["Thư phường","kcSach",0,"Hiệu sách, nơi sĩ tử kinh thành lui tới."],
 kc_hau:["Phủ thế giao","kcHau",0,"Nhà các bạn khuê phòng; hội thơ, ngắm hoa thường mở ở đây."]};
Object.assign(SCIMG,{kcKhue:"phi-tan-cung",kcSanh:"tu-ninh-cung",kcThu:"ngu-thu-phong",kcMe:"khon-ninh-cung",kcDi:"phi-tan-cung",kcVuon:"ngu-hoa-vien",kcTu:"duong-tam-dien",kcHoc:"kinh-su-phong",
 kcChua:"duong-tam-dien",kcCho:"origin-wide-muoi",kcTra:"origin-wide-thd",kcSach:"origin-wide-thd",kcHau:"origin-wide-tt"});
Object.assign(NAMES,{kgt:"Gia thanh",kap:"Áp lực hôn sự",khm:"Hồi môn"});
RKEYS.push(["kgt","Gia thanh"],["kap","Áp lực hôn sự"],["khm","Hồi môn"]);
try{Object.assign(HX,{kgt:"Gia thanh: danh dự của nhà ngươi (0–100). Tai tiếng làm giảm; mối hôn sự tốt, công danh của cha anh làm tăng. Sơ tuyển và các nhà cầu thân đều xem.",
 kap:"Áp lực hôn sự (0–100): mỗi tháng một tăng. Từ 60 nhà bàn chuyện gả ngươi; tới 85 cha định hôn.",khm:"Hồi môn cha mẹ hứa cho ngươi. Vào cung hay xuất giá đều mang theo thành bạc.",
 kld:"Lời đồn: điều người ngoài xì xào về ngươi. Quá nhiều thì Sơ tuyển trượt và mối hôn sự tan.",kty:"Kỳ tuyển tú: mùa xuân năm thứ ba. Qua Sơ tuyển, Phúc tuyển, Điện tuyển thì vào cung."})}catch(e){}
try{Object.assign(PD_END,{"Chính thất hầu phủ":20,"Vợ quan thanh liêm":12,"Nữ phu tử":15,"Làm thiếp nhà quyền quý":5,"Gả xa":5,
 "Bỏ trốn cùng người thương":35,"Vợ Trạng nguyên":35,"Vương phi":35,"Nữ tướng Nhạn Môn":35,"Hòa thân thay công chúa":35,"Nữ thương Giang Nam":35})}catch(e){}
const KCRARE={kcR1:["Bỏ trốn cùng người thương","Bỏ trốn"],kcR2:["Vợ Trạng nguyên","Thanh mai thành phu quân"],kcR3:["Vương phi","Vương phi"],kcR4:["Nữ tướng Nhạn Môn","Nữ tướng"],kcR5:["Hòa thân thay công chúa","Hòa thân"],kcR6:["Nữ thương Giang Nam","Nữ thương"]};
try{for(const k in KCRARE)RARE97.add(k,{t:"Tiểu thư ngoài cung",tag:KCRARE[k][1]})}catch(e){}
/* OWNER #8 (15/11 20:05Z): a life as a thiếu nữ starts with a chest of her girlhood belongings that fills her slots with ordinary girlhood
   things; she keeps them into the palace (fallback outfit). New items: Ngọc bội khuê các (painting img/item-ngocboikc.webp, gpt-2-6,
   dev/art/ITEM_ART.md §5) and Vòng bạc hoa mai (img/item-vongbackc.webp); the rest are existing items. */
try{IT.ngocboikc=IT.ngocboikc||{n:"Ngọc bội khuê các",kd:"Trang sức",d:"Đeo eo: Sắc +1 · ngọc bội con gái mang từ nhà",pr:10,rk:0,sl:"waist",w:{sac:1}};
 IT.vongbackc=IT.vongbackc||{n:"Vòng bạc hoa mai",kd:"Trang sức",d:"Đeo tay: Sắc +1 · đôi vòng bạc con gái mang từ nhà",pr:10,rk:0,sl:"wrist",w:{sac:1}};
 for(const k of ["ngocboikc","vongbackc"]){if(typeof ITEM_ART_G==="object")ITEM_ART_G[k]=0;if(typeof ITIMG==="object")ITIMG[k]=k}}catch(e){}

function isKc(){return !!(typeof S!=="undefined"&&S&&S.kc&&!S.kc.inPal)}
window.isKc=isKc;
/* co-op (r2-r1 FAIL 2, owner rule "every feature works in co-op"): the home road runs in a co-op room too. jcoopworld keeps the shared
   world (calendar, palace, rivals); her home life (S.kc, family, her stats) is personal (P[seat].S), so it travels in her blob and the
   week merge. While she is at home the friend has no palace entry for her (jcoopworld friendHome); her week is kcEndTurn run through the
   co-op week path (COOPW.altTurn), so "Sang ngày mới" waits for the friend exactly as in the palace; on entry she becomes the friend's
   palace entry from the next merged week ("Hảo hữu nhập cung"). */
function kcCoopOn(){try{return !!(window.COOPW&&COOPW.on)}catch(e){return false}}
function kcOk(k){return KC.ok.includes(k)}
function kcW(f){const o=S.out;S.out=1;try{return f()}catch(e){console.error(e);return""}finally{S.out=o}}
function kcF(id){return S.kc.fam.find(m=>m.id===id)||null}
function kcR(r){return S.kc.fam.find(m=>m.r===r&&m.alive)||null}
function kcFix(){if(!S||!S.kc)return;S.kgt=cl(Math.round(S.kgt||0),0,100);S.kap=cl(Math.round(S.kap||0),0,100);S.khm=Math.max(0,Math.round(S.khm||0));S.kld=cl(Math.round(S.kld||0),0,100);
 for(const m of S.kc.fam){m.af=cl(Math.round(m.af),-100,100);m.me=cl(Math.round(m.me),-100,100);m.oan=cl(Math.round(m.oan||0),0,100)}
 if(S.kc.ldSeen)NAMES.kld="Lời đồn";else delete NAMES.kld}
function kcAf(m,n){if(m){m.af+=n;if(n<0)m.oan=(m.oan||0)+Math.round(-n/2)}}
function kcMonthsLeft(){return (KC.ty-S.year)*12+(KC.tm-S.month)}
function kcTitle(){return `Tiểu thư ${KCDAD[S.origin.k][1]}`}
/* KC LORE: at home she is a Tiểu thư in every dialog and card (pMe() said "Đáp ứng", the palace rank she does not hold yet) */
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);try{if(isKc()&&kcLore())f.rw="Tiểu thư"}catch(e){}return f}})();

/* ---------- faces: every family member carries a figure identity (fid) from the existing pools (placeholders; §14 art list) ---------- */
function kcPor(m,kind){try{const r=m.fid.split(":")[0];const L=(FIGIX[r]||{})[m.fid];if(!L||!L.length)return"";const f=figBest(L,r==="consort"?0:null,m.age);return f?figPath(kind==="fig"?(f.file||f.src):f.por):""}catch(e){return""}}
function kcFace(m){if(m.r==="ty"&&S.maid)return pMaid();const f={src:kcPor(m),ini:(m.name||"?").split(" ").pop()[0],col:m.r==="cha"||m.r==="huynh"||m.r==="tm"?"#6a8aa0":"#b08a8a",rk:"off",rw:m.t};
 f.__kp=m;try{f.__kr=personRoleRank(m)}catch(e){}return f}
function kcFreeFid(role,pref){const U=new Set(figUsed());const keys=Object.keys((FIGIX||{})[role]||{});const L=(pref||[]).filter(k=>keys.includes(k)&&!U.has(k)).concat(shuf(keys.filter(k=>!U.has(k))));const k=L[0]||"";if(k)figUsed().push(k);return k}

/* ---------- start: the identity card choice, then the home life ---------- */
function kcPick(){return (S&&S.kcPick)||"cung"}
function kcPathHTML(){const k=kcPick();const lock=!!window.__kcO;const r0=RANKS[(S.origin&&S.origin.r)||0].n;
 const O=[["cung","Vào cung ngay",`thành: vào cung ngay, phong ${r0} theo thân phận; thêm khoảng hai năm trong cung để leo · hỏng: không hồi môn, không biết trước gì về các phi tần, không có cơ duyên ngoài cung`],
  ["nha","Ở nhà chờ tuyển tú",`thành: hai năm học tài nghệ, nâng Tư chất; hồi môn và tỳ nữ hồi môn một lòng; thế lực nhà cha; tin về các phi tần trong cung; qua tuyển tú có thể phong tới Quý nhân; Thanh mai trúc mã, kết hiếm ngoài cung; Phúc duyên khi qua tuyển tú · hỏng: vào cung muộn hai năm, lúc hai mươi tuổi · kèm: có thể bị trả thẻ bài hay bị ép gả; kế mẫu, thứ muội ngáng chân; có thể chết ở nhà`]];
 if(S.origin&&S.origin.k==="td"&&kcLore())O[1][2]=O[1][2].replace("hồi môn và tỳ nữ hồi môn một lòng; thế lực nhà cha;","thế lực nhà cha, nhưng nhà ngươi sụp đổ đúng ngày ngươi rời nhà vào cung (hồi môn bị tịch thu); tỳ nữ hồi môn một lòng;");
 return `<div class="kpsec kkcp"><h4 class="kpst">${typeof kitGloss==="function"?kitGloss("Con đường"):"Con đường"}</h4><div class="opts kcpo">`+
  O.map(([x,n,l])=>`<button type="button" class="opt${x===k?" ksel":""}" data-kcp="${x}" aria-pressed="${x===k}"${lock?" disabled":""}>${n}<small>${l}</small></button>`).join("")+`</div></div>`}
try{KIT_GLOSS["Con đường"]="Vào cung ngay: kiếp bắt đầu trong cung. Ở nhà chờ tuyển tú: sống ở nhà cha khoảng hai năm (học tài nghệ, lo chuyện gia đình, hôn sự, tình riêng), rồi qua ba vòng tuyển tú mới vào cung; có thể không vào cung mà xuất giá. Chỉ con nhà quan, nhà buôn, nhà thầy đồ, cháu Thái hậu, con nhà Thị lang mới có đường này."}catch(e){}
/* r2-r1: "Ở nhà chờ tuyển tú" picked: the identity card shows her as she starts at home (Tiểu thư …, 18 tuổi, home Danh/Bạc caps of kcInit), not the palace rank */
function kcCardHome(m){try{return !!(m&&m.nl&&S&&S.origin&&!S.srv&&!(typeof isSrv==="function"&&isSrv())&&kcPick()==="nha"&&kcOk(S.origin.k))}catch(e){return false}}
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){const home=kcCardHome(m);let sv=null;
 if(home){sv=[S.age,S.danh,S.bac];S.age=18;S.danh=Math.min(S.danh,8);S.bac=Math.min(S.bac,40+Math.round((KCGTU[S.origin.k]||50)/2))}
 try{b0.apply(this,arguments)}finally{if(sv){S.age=sv[0];S.danh=sv[1];S.bac=sv[2]}}
 try{if(home){const ti=$("mb")&&$("mb").querySelector(".kpidn .kti");if(ti)ti.textContent=kcTitle()}}catch(e){}
 try{if(!(m&&m.nl)||!S||typeof NLP==="undefined"||!NLP||!kcOk(S.origin.k))return;const mb=$("mb");if(!mb||mb.querySelector(".kkcp"))return;
 const w=document.createElement("div");w.innerHTML=kcPathHTML();const sec=w.firstElementChild;const at=mb.querySelector(":scope > .kpick")||mb.querySelector(":scope > .kpopts");if(at)mb.insertBefore(sec,at);else mb.appendChild(sec)}catch(e){console.error("jkc card",e)}}})();
$("modal").addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button[data-kcp]");if(!b)return;e.preventDefault();e.stopPropagation();if(b.disabled||!S||typeof NLP==="undefined"||!NLP)return;S.kcPick=b.dataset.kcp;try{nlCard()}catch(x){console.error(x)}},true);
(function(){const a0=nlAccept;nlAccept=function(){const was=typeof NLP!=="undefined"&&NLP;const W=window.COOPW;
 /* co-op: jcoopworld sends her new life right after the accept; hold it until the home life is built, then send that one */
 const hold=!!(W&&W.on&&was);if(hold)W.holdMe=true;let r;
 try{r=a0.apply(this,arguments);try{const want=window.__kcO||(S&&S.kcPick);if(was&&S&&!S.kc&&want==="nha"&&kcOk(S.origin.k)&&!S.srv){kcInit();showModal();render()}}catch(e){console.error("jkc start",e)}}
 finally{if(hold){W.holdMe=false;if(W.heldMe){W.heldMe=false;try{W.sendMe()}catch(e){console.error("jkc coop send",e)}}}}return r}})();
/* a re-roll (Đổi thân phận) to an origin without the road falls back to the palace */
(function(){if(typeof nlCard!=="function")return;const c0=nlCard;nlCard=function(){try{if(S&&!kcOk(S.origin.k))S.kcPick="cung"}catch(e){}return c0.apply(this,arguments)}})();

function kcSnapReset(){try{S.wkSnap=wkSnap()}catch(e){}try{KMS=S;KMSNAP=kmSnap()}catch(e){}}
/* r2: a home name never repeats a palace name (j61 hides the names of palace people she does not know, in any text: "Thăm cung nữ ???") */
function kcFreeName(mk,more){const used=new Set();const tail=n=>String(n).split(" ").slice(-2).join(" ");const add=n=>{if(n){used.add(n);used.add(tail(n))}};
 try{(typeof k61All==="function"?k61All():[]).forEach(e=>e&&add(e.name));(more||[]).forEach(m=>add(m.name))}catch(e){}
 let n=mk();for(let i=0;i<40&&(used.has(n)||used.has(tail(n)));i++)n=mk();return n}
function kcInit(){const k=S.origin.k;const sur=tdSur(S.name);const nm=g=>`${sur} ${g}`;
 const ag=a=>a;const T=(r,t,name,age,role,pref,tr,af)=>({id:"f"+r,r,t,name,age,fid:kcFreeFid(role,pref),tr:tr||pick(["Hiền lành","Nhu mì","Tham vọng","Đa nghi","Kiêu ngạo"]),af:af==null?30+R(25):af,me:30+R(20),oan:0,alive:1});
 const fam=[];const gl=shuf(KCMN.slice());const g=()=>gl.pop();
 fam.push(T("cha","Phụ thân",nm(g()),48+R(8),"official",[],pick(["Tham vọng","Cương trực","Cẩn trọng"]),35+R(25)));
 /* KC LORE: the father of tt / dtq is the head of that house in the court (j55 trS, j67 {dad}): one name, one age, in the home and in the palace */
 try{const hd=(k==="tt"||k==="dtq")?tdHead(KCCLAN[k]):null;if(hd&&hd.dadOf==="me"){fam[0].name=hd.name;fam[0].age=Math.min(56,Math.max(46,hd.age||50));if(hd.tr&&/^(Tham vọng|Cương trực|Cẩn trọng)$/.test(hd.tr))fam[0].tr=hd.tr}}catch(e){console.error("kc lore dad",e)}
 const momAlive=roll(60);
 if(momAlive)fam.push(T("me","Mẫu thân",`${pick(SURN)} thị`,38+R(6),"mama",[],pick(["Hiền lành","Nhu mì","Đa nghi"]),55+R(25)));
 fam.push(T("di",momAlive?"Di nương":"Kế mẫu",`${pick(SURN)} thị`,33+R(6),"mama",[],pick(["Hiểm độc","Tham vọng","Kiêu ngạo","Hiền lành"]),R(25)));
 fam.push(T("to","Tổ mẫu",`Lão phu nhân ${sur} gia`,66+R(8),"mama",[],pick(["Cương trực","Hiền lành","Đa nghi"]),40+R(20)));
 fam.push(T("huynh","Huynh trưởng",nm(g()),21+R(4),"man",["man:thive-1","man:thive-2"],pick(["phong lưu","trung hậu","tham vọng","cẩn trọng"]),40+R(30)));
 const sis=T("muoi","Thứ muội",kcFreeName(()=>nm(pick(KCFN)),fam),18,"consort",[],pick(["Kiêu ngạo","Tham vọng","Nhu mì","Hiểm độc","Hiền lành"]),R(30));
 sis.sac=40+R(50);sis.tai=30+R(50);sis.danh=4+R(8);fam.push(sis);
 for(let i=0;i<2;i++){const f=T("ban"+i,"Khuê hữu",kcFreeName(()=>`${pick(SURN)} ${pick(KCFN)}`,fam),18+R(2),"consort",[],pick(["Hiền lành","Nhu mì","Kiêu ngạo","Tham vọng"]),30+R(30));f.sac=40+R(50);f.tai=30+R(50);f.danh=4+R(8);fam.push(f)}
 S.kc={v:2,fam,at:{},once:{},ev:{},ch:{o:0,tm:0,ke:0,hon:0},suit:[],intel:[],proof:{},le:0,ds:0,g7:-99,ldSeen:0,r0:S.rank,staff0:S.staff||[],y0:S.year,end:null,tt:null,log:[]};
 S.kgt=40+R(20)+(k==="tt"||k==="ch"?10:k==="td"?-10:0);S.kap=10+R(10);S.khm=Math.round((KCGTU[k]||50)*1.2);S.kld=0;S.kgtu=KCGTU[k]||50;
 S.age=18;S.rank=0;S.sung=0;S.danh=Math.min(S.danh,8);S.bac=Math.min(S.bac,40+Math.round(S.kgtu/2));S.staff=[];S.place="kc_khue";S.pal=null;S.tonight=null;
 if(S.maid){S.maid.kcTy=1}
 /* Thanh mai trúc mã (j96): his chapters already woven at start, or (by the same weights) now, before the palace */
 try{if(!S.tm96&&typeof tmRoll96==="function"&&tmRoll96(k)){const m=mkMan96(k);if(m){S.tm96={k,mid:m.id,h:60,sus:0,ev:0,rise:0,tok:0,v:1};const P=S.st&&S.st.ch&&S.st.ch.plan;
   if(P&&!P.includes("st:tm96a")){const iS=P.indexOf("ms:sung"),pA=iS>=0?iS+1:P.indexOf("ms:nhap")+1;P.splice(Math.max(S.st.ch.i+1,pA),0,"st:tm96a");const fi=P.indexOf("fin");P.splice(fi>=0?fi+1:P.length-2,0,"st:tm96c");if(typeof f14Norm==="function")f14Norm()/* a 14-chapter life (jst14) keeps 14 */}}}
  if(S.tm96){S.tm96.h=Math.min(S.tm96.h,60);S.tm96.tok=0;S.kc.tm=1;try{k61Know(manById(S.tm96.mid),"thanh mai",true,3)}catch(e){}}}catch(e){console.error(e)}
 const chest=kcChest();
 kcWhere();Q=Q.filter(m=>m.nl);S.nightWhy=null;/* r2-r2: the start's card-flip scene (jflip, KIT §67) waits in kmPush for its turn: no plan → it drops itself */
 /* r2: every palace dialog the start queued (Nhập cung, a Kính sự phòng summons for tonight …) belongs to the palace road */
 const d=kcR("cha"),di=kcR("di");
 Q.push({t:"Khuê các",who:pMe(),h:`<p>Ngươi mười tám tuổi, con gái ${KCDAD[k][1]}. Chiếu tuyển tú ba năm một lần; kỳ tới vào mùa xuân năm thứ ba.</p>`+
  `<p>Từ nay đến đó còn hơn hai năm: học tài nghệ, giữ lòng cha mẹ, coi chừng ${di.t.toLowerCase()}, và giữ cho danh tiếng trong sạch. Nhà cũng có thể gả ngươi đi trước kỳ tuyển.</p>`+
  (k==="td"&&kcLore()?`<p>Cha ngươi vẫn là Thị lang bộ Lễ, cả nhà còn đủ mặt. Nhưng trong triều đã có kẻ gom chứng cứ để hặc ông, và ngươi chưa biết đến bao giờ.</p>`:"")+
  kitRows([["Phụ thân",`${KCDAD[k][0]} ${d.name}`,"t"],["Gia thanh",S.kgt,"t"],["Hồi môn cha mẹ hứa",kitChip("Bạc",S.khm,"n"),"t"],["Kỳ tuyển tú",`còn ${kcMonthsLeft()} tháng`,"t"]])});
 kcSnapReset();tab="act";S.visit=kcVisit(S.place);deal();log(`Kiếp này ngươi ở nhà chờ tuyển tú (${kcTitle()}).`);kcChestShow(chest)}
/* the girlhood chest: Cài tóc · Y phục (j92 WD slots) · Đeo tay · Đeo eo · Túi thơm (jinv slots), all worn, all ordinary (Thường; the jade
   bangle is silver, not jade: the whole set stays inside a Đáp ứng's allowance, jinv luxury law). Khăn che mặt stays empty: in this game the veil is the hủy dung cover (jinv veil rule: worn without need = gossip); instead an un-worn
   Khăn tay lụa (embroidered handkerchief, jitev story item) goes into her bag. */
/* ONE chest function (review/econ-items-r1): the same 6 things as the palace-road chest, all worn (jeitem girlChest wear:true) */
function kcChest(){const who=(kcR("me")||kcR("to")||{}).t||"Mẫu thân";const c=girlChest(S,{wear:true,who});S.kc.chest=c.L.map(e=>e.k);return c}
function kcChestShow(c){if(!c||!c.L.length)return;try{if(typeof kitReward!=="function")return;
 const it=e=>{if(WD_ITEMS[e.k]&&!IT[e.k]){const w=WD_ITEMS[e.k];return{n:w.n,d:w.sl==="y"?"Y phục · đang mặc":"Cài tóc · đang cài",img:w.icon,tier:w.g|0}}
  try{if(typeof kgItem==="function")return kgItem(e)}catch(x){}const a=itemArt(e.k);return{n:IT[e.k].n,d:IT[e.k].d,img:a?a.src:"",tier:a?a.grade:0}};
 kitReward({kind:"chest",title:"Rương đồ khuê các",from:`${c.who} sửa soạn · đồ con gái mang theo người`,items:c.L.map(it)})}catch(e){console.error("kcChestShow",e)}}

/* ---------- who is where (one ledger per buổi; true info) ---------- */
const KCHAB={cha:[["kc_thu",4],["kc_sanh",2],["",3]],me:[["kc_me",4],["kc_sanh",2],["kc_vuon",2]],di:[["kc_di",4],["kc_vuon",2],["kc_sanh",1],["kc_me",1]],to:[["kc_sanh",3],["kc_tu",2],["kc_me",1]],
 huynh:[["",3],["kc_thu",2],["kc_vuon",2],["kc_sanh",1]],muoi:[["kc_di",3],["kc_hoc",2],["kc_vuon",2]]};
function kcWhere(){if(!S||!S.kc)return;const b=S.buoi||0;S.kc.at={};for(const m of S.kc.fam){if(!m.alive)continue;if(/^ban/.test(m.r)){S.kc.at[m.id]="kc_hau";continue}if(m.r==="tm"){continue}
  if(m.r==="huynh"&&S.kc.lost)continue;/* KC LORE: dtq brother lost at Nhạn Môn */
  const H=KCHAB[m.r]||[["",1]];let L=H;if(b===3&&m.r!=="huynh")L=L.filter(x=>x[0]&&x[0]!=="kc_thu"||m.r==="cha");
  if(m.r==="cha"&&b===0)L=[["",1]];/* buổi sáng cha vào triều */
  const tot=L.reduce((a,x)=>a+x[1],0);let r=Math.random()*tot,p="";for(const [k,w] of L){r-=w;if(r<0){p=k;break}}
  if(p)S.kc.at[m.id]=p}
 if(S.tm96){const man=manById(S.tm96.mid);if(man&&man.alive)S.kc.at.ftm=b===3?"":pick(["kc_chua","kc_sach","kc_tra","","",""])}}
function kcHere(k){k=k||S.place;return S.kc.fam.filter(m=>m.alive&&S.kc.at[m.id]===k)}
function kcAt(m){const p=S.kc.at[m.id];return p?KCPL[p][0]:m.r==="huynh"&&S.kc.lost?"mất tin ở Nhạn Môn":"ra ngoài"}
function kcTmMan(){return S.tm96?manById(S.tm96.mid):null}
function kcVisit(k){const ppl=[];for(const m of kcHere(k)){if(/^ban/.test(m.r)&&k!=="kc_hau")continue;ppl.push({kind:"kc",fid:m.id,name:m.name,ini:(m.name||"?").split(" ").pop()[0],col:"#b08a8a",info:`${m.t} · ${m.tr}`,ref:m})}
 const tm=kcTmMan();if(tm&&S.kc.at.ftm===k)ppl.push({kind:"kc",fid:"ftm",name:tm.name,ini:tm.name.split(" ").pop()[0],col:"#6a8aa0",info:"người ấy",man:tm.id});
 return{k,people:ppl,msg:ppl.length?"":"Không gặp ai.",tk:{}}}
(function(){const p0=placeOf;placeOf=function(k){if(k==="home"&&window.__kcHome)k=window.__kcHome;if(KCPL[k]){const P=KCPL[k];return{k,n:P[0],fn:P[3],d:P[3],sc:P[1]}}return p0.apply(this,arguments)}})();
(function(){const r0=renderStage;renderStage=function(){if(!isKc()||!KCPL[S.place]||!KCPL[S.place][2])return r0.apply(this,arguments);const p=S.place;window.__kcHome=p;S.place="home";try{return r0.apply(this,arguments)}finally{S.place=p;window.__kcHome=null}}})();
(function(){const h0=homePeople;homePeople=function(){if(isKc())return kcVisit(S.place).people;return h0.apply(this,arguments)}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="kc"){if(p.man){const m=manById(p.man);return m?pMan(m):{src:"",ini:p.ini,col:p.col}}const m=S&&S.kc&&kcF(p.fid);return m?kcFace(m):{src:"",ini:p.ini,col:p.col}}return f0.apply(this,arguments)}})();
(function(){const g0=figFor;figFor=function(p,kind){try{if(p&&p.kind==="kc"&&S&&S.kc&&!p.man){const m=kcF(p.fid);if(m&&m.r!=="ty")return kcPor(m,kind==="por"?"por":"fig")}}catch(e){}return g0.apply(this,arguments)}})();
(function(){const c0=consorts;consorts=function(){const L=c0.apply(this,arguments);return isKc()?L.filter(p=>p!==S):L}})();
(function(){const r0=rivalsBuoi;rivalsBuoi=function(){if(isKc())return kcW(()=>r0.apply(this,arguments))||"";return r0.apply(this,arguments)}})();
(function(){const r0=rkOfFace;rkOfFace=function(kind,o){if(o===S&&isKc())return["c0","Tiểu thư"];return r0.apply(this,arguments)}})();
(function(){const r0=rkName;rkName=function(p){if(p===S&&isKc())return"Tiểu thư";return r0.apply(this,arguments)}})();
/* stage person tap: the person's acts are her cards (Gia tộc); the stage only names who is there */
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="kc")return isKc()?kcTalk(p):[];return t0.apply(this,arguments)}})();
function kcTalk(p){const A=[];const m=kcF(p.fid);const all=deck.map((a,i)=>[a,i]).filter(([a])=>a.who===(m?m.id:"ftm"));
 for(const [a] of all)A.push({n:a.n,o:a.o==null?100:a.o,w:a.w||{},l:a.l||{},c:a.c,x:a.x,lock:a.lock,run(){const ok=runOpt(a);return ok==null?"":ok?'<span class="g">thành</span>.':'<span class="r">hỏng</span>.'}});return A}

/* ---------- moving (house free; city 1 khắc each way, needs her maid; nights: sneaking only) ---------- */
function kcCity(k){return KCPL[k]&&!KCPL[k][2]}
function kcGoWhy(k){if(k===S.place)return"Đang ở đây";if(kcCity(k)){if((S.buoi||0)===3)return"Khuê nữ không ra phố buổi tối";if(!S.maid)return"Không có tỳ nữ đi cùng";if(!can(1))return"Hết khắc buổi này"}return""}
function kcGo(k){const w=kcGoWhy(k);if(w||Q.length||S.dead)return false;if(kcCity(k)||kcCity(S.place))spend(1);S.place=k;S.visit=kcVisit(k);popIdx=null;popMsg="";deal();
 if(kcCity(k)&&roll(4)){S.kld+=3;log("Có kẻ nhìn ngươi lâu ở chốn đông người.")}return true}
(function(){const g0=goTo;goTo=function(k){if(!isKc())return g0.apply(this,arguments);const ok=kcGo(k);if(ok){tab="act";render()}return ok}})();

/* ---------- acts (deck cards) ---------- */
function kcOnce(k,sc){const v=S.kc.once[k];return v!=null&&(sc==="m"?v===S.turn:v===wk())}
function kcCard(o){return Object.assign({k:1,c:{},o:100,w:{},l:{},x:""},o)}
function kcNeed(a,m,place){/* needs a person present / a place: locked card carries the reason in t */
 if(place&&S.place!==place){a.lock=1;a.t=`Đến ${KCPL[place][0]} trước`;return a}
 if(m&&S.kc.at[m.id]!==S.place){a.lock=1;a.t=`${m.t} không ở đây (đang ở ${kcAt(m).toLowerCase()})`;return a}return a}
function kcCards(){const X=[];if(!S||!S.kc)return X;const P=S.place;const mz=S.maid?S.maid.loyal:0;
 /* Khuê phòng */
 X.push(kcNeed(kcCard({g:"khue",n:"Nghỉ ngơi",t:"Buông rèm, ngủ một giấc trưa.",k:2,w:{suc:25},rep:1}),null,"kc_khue"));
 X.push(kcNeed(kcCard({g:"khue",n:"Đọc sách, chép kinh",t:"Chép một quyển kinh, đọc sử, đọc thơ.",k:2,c:{suc:-5},w:{tai:1,duc:1}}),null,"kc_khue"));
 X.push(kcNeed(kcCard({g:"khue",n:"Viết nhật ký giấu kín",t:"Ghi chuyện trong lòng, giấu dưới đáy rương.",k:1,o:od(78),w:{tamco:1},l:{},x:"",fail:()=>{S.kld+=8;log("Nhật ký bị gia nhân lén đọc; chuyện riêng bị đồn ra ngoài.")}}),null,"kc_khue"));
 X.push(kcNeed(kcCard({g:"khue",n:"Chải chuốt, thử y phục",t:"Soi gương, thử trâm cài và áo mới.",k:1,c:{suc:-5},o:od(70+S.sac/10),w:{sac:1},l:{},fail:()=>{S.kld+=2}}),null,"kc_khue"));
 /* Gia tộc: each member's acts carry who */
 const cha=kcR("cha"),me=kcR("me"),di=kcR("di"),to=kcR("to"),hu=kcR("huynh"),mu=kcR("muoi");
 for(const m of [cha,me,di,to].filter(Boolean)){
  X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Thỉnh an ${m.t.toLowerCase()}`,t:`Đến vấn an ${m.t.toLowerCase()} ${m.name}.`,k:1,c:{suc:-5},w:{kgt:1},x:`${m.t} với ngươi +4`,go:()=>kcAf(m,4)}),m))}
 if(cha){X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Hầu cha ở thư phòng",t:"Mài mực, pha trà, nghe cha nói chuyện triều.",k:2,c:{suc:-10},o:od(55+S.tamco/4+cha.af/5),w:{tamco:1},l:{},x:"Phụ thân với ngươi +5 · biết tin triều đình",go:()=>{kcAf(cha,5);kcNews()},fail:()=>{kcAf(cha,-6);log("Ngươi lỡ lời; cha phẩy tay bảo lui.")}}),cha,"kc_thu"));
  const cl0=KCCLAN[S.origin.k];if(cl0)X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Khuyên cha chọn phe",t:`Bàn với cha nên đứng về nhà nào trên triều.`,k:1,c:{suc:-10},o:od(30+S.tai/4+cha.af/3),w:{},l:{},x:"Thế lực nhà +4",go:()=>{try{tdPowAdd(cl0,4)}catch(e){}S.kc.adv=(S.kc.adv||0)+1},fail:()=>kcAf(cha,-10)}),cha,"kc_thu"));
  if(!kcOnce("g7","m")&&S.turn-S.kc.g7>=6){const pow=kcPow();X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Xin cha dâng sớ tiến cử",t:"Xin cha dâng sớ đưa ngươi vào cung sớm, không đợi kỳ tuyển.",k:2,c:{suc:-15,bac:-50},o:od(10+pow/2+S.danh/3),w:{},l:{},x:"vào cung sớm (Điện tuyển tháng sau)",go:()=>{S.kc.early=1;S.kc.g7=S.turn},fail:()=>{S.kc.g7=S.turn;kcAf(cha,-5);try{tdPowAdd(KCCLAN[S.origin.k],-2)}catch(e){}}}),cha,"kc_thu"))}
  if(!kcOnce("tien","m"))X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Xin cha tiền riêng",t:"Xin cha ít bạc tiêu riêng.",k:1,c:{suc:-5},o:od(45+cha.af/3),w:{bac:10+Math.round(S.kgtu/5)},l:{},x:"",onceM:"tien",fail:()=>kcAf(cha,-3)}),cha))}
 const mom=me||di;
 if(mom)X.push(kcNeed(kcCard({g:"fam",who:mom.id,n:`Làm vừa lòng ${mom.t.toLowerCase()}`,t:`Dâng quà, hầu thuốc, cùng ${mom.t.toLowerCase()} thêu thùa.`,k:2,c:{suc:-10,bac:-10},o:od(65+mom.af/5),w:{khm:5},l:{},x:`${mom.t} với ngươi +8`,go:()=>kcAf(mom,8)}),mom));
 for(const m of [hu,mu].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Kết thân ${m.t.toLowerCase()}`,t:`Trò chuyện, tặng quà nhỏ cho ${m.name}.`,k:2,c:{suc:-5,bac:-5},o:od(60+m.af/4),w:{},l:{},x:`${m.t} với ngươi +6`,go:()=>{kcAf(m,6);m.me+=4},fail:()=>kcAf(m,-2)}),m));
 if(mu)X.push(kcNeed(kcCard({g:"fam",who:mu.id,n:"Ngáng chân thứ muội",t:"Đổi hộp phấn, giấu thiệp mời hội thơ của nàng.",k:2,c:{suc:-10,bac:-5},o:od(40+S.tamco/3),w:{},l:{duc:-5,kgt:-3},x:"thứ muội Sắc -3, Danh -3 (kỳ tuyển tú)",go:()=>{mu.sac=Math.max(10,mu.sac-3);mu.danh=Math.max(0,mu.danh-3);mu.oan+=4},fail:()=>{mu.oan+=20;kcAf(mu,-15);if(to)kcAf(to,-10);log("Chuyện vỡ lở; tổ mẫu nhìn ngươi bằng ánh mắt khác.")}}),mu));
 if(di)X.push(kcNeed(kcCard({g:"fam",who:di.id,n:`Dò la viện ${di.t.toLowerCase()}`,t:`Rình xem ${di.t.toLowerCase()} bàn tính gì.`,k:2,c:{suc:-10,bac:-5},o:od(30+S.tamco/3+mz/10),w:{},l:{},x:"có chứng cứ mưu tính của nàng",go:()=>{S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+1},fail:()=>{S.kld+=5;kcAf(di,-8);log(`Bị ${di.t.toLowerCase()} bắt gặp.`)}}),null,"kc_di"));
 if(to&&di&&(S.kc.proof[di.id]||0)>0)X.push(kcNeed(kcCard({g:"fam",who:to.id,n:`Tố ${di.t.toLowerCase()} trước tổ mẫu`,t:`Đem chứng cứ trình tổ mẫu.`,k:2,c:{suc:-15},o:od(50+S.kc.proof[di.id]*12+to.af/5),w:{kgt:2},l:{duc:-3},x:`${di.t} bị phạt, thôi hại ngươi một thời gian`,go:()=>{S.kc.proof[di.id]=0;di.oan+=15;S.kc.diBan=S.turn+4;kcAf(to,4)},fail:()=>{di.oan+=15;S.kc.proof[di.id]=0}}),to));
 if(cha||mom)X.push(kcNeed(kcCard({g:"fam",n:"Quản việc nhà",t:"Giữ sổ chi tiêu, sai bảo gia nhân.",k:3,c:{suc:-15},o:od(50+S.tamco/3),w:{tamco:2,kgt:1},l:{kgt:-2},x:"Gia tư +2",go:()=>{S.kgtu=Math.min(100,S.kgtu+2)}}),null,"kc_sanh"));
 /* Giao du */
 X.push(kcNeed(kcCard({g:"soc",n:"Đi lễ chùa",t:"Dâng hương, cầu phúc, nghe giảng kinh.",k:3,c:{suc:-15,bac:-3},w:{duc:2,danh:1},go:()=>kcChance("chua")}),null,"kc_chua"));
 X.push(kcNeed(kcCard({g:"soc",n:"Dạo phố chợ",t:"Xem lụa, mua phấn, nghe người qua lại.",k:2,c:{suc:-10,bac:-10},o:od(80),w:{sac:1},l:{},x:"nghe một lời đồn trong kinh",go:()=>kcNews()}),null,"kc_cho"));
 X.push(kcNeed(kcCard({g:"soc",n:"Nghe chuyện ở trà lâu",t:"Giả trang ngồi nhã gian, nghe khách bàn chuyện cung đình.",k:2,c:{suc:-10,bac:-5},o:od(40+S.tamco/3),w:{},l:{kgt:-4},x:"biết rõ một phi tần trong cung",go:()=>kcIntel(1,3),fail:()=>{S.kld+=12;log("Có người nhận ra ngươi dưới lớp áo nam.")}}),null,"kc_tra"));
 X.push(kcNeed(kcCard({g:"soc",n:"Lựa sách ở thư phường",t:"Chọn sách, đọc thơ mới chép.",k:2,c:{suc:-10,bac:-5},w:{tai:2},go:()=>kcChance("sach")}),null,"kc_sach"));
 for(const f of S.kc.fam.filter(m=>m.alive&&/^ban/.test(m.r)))X.push(kcNeed(kcCard({g:"soc",who:f.id,n:`Thăm ${f.name}`,t:`Sang phủ thế giao, cùng ${f.name} thêu thùa, bàn chuyện tuyển tú.`,k:2,c:{suc:-10,bac:-5},o:od(65+f.af/4),w:{},l:{},x:`${f.name} với ngươi +6 · có khi nghe tin trong cung`,go:()=>{kcAf(f,6);f.me+=4;if(roll(40))kcIntel(1,2)}}),null,"kc_hau"));
 if(S.kc.suit.length){const s=S.kc.suit[0];
  X.push(kcNeed(kcCard({g:"soc",n:`Khéo từ chối nhà ${s.n}`,t:`Nhờ mẹ nói khéo, giữ thể diện cho nhà ${s.n}.`,k:1,c:{suc:-10},o:od(45+S.tamco/3+S.danh/4),w:{kap:-10},l:{kgt:-3},x:"bỏ mối này",go:()=>{S.kc.suit.shift()}}),null,"kc_sanh"));
  X.push(kcCard({g:"soc",n:"Giả bệnh tránh xem mặt",t:"Nằm liệt giường, sai tỳ nữ sắc thuốc.",k:4,c:{bac:-5},o:od(45+S.tamco/3),w:{kap:-15},l:{duc:-3},x:"bỏ mối này",go:()=>{S.kc.suit.shift()},fail:()=>{if(cha)kcAf(cha,-12)}}))}
 const tm=kcTmMan();if(tm&&tm.alive&&S.tm96){const night=(S.buoi||0)===3;const here=S.kc.at.ftm===P;
  X.push(kcCard({g:"soc",who:"ftm",n:`Gặp riêng ${tm.name}`,t:here?`Chàng đang ở ${KCPL[P][0].toLowerCase()}.`:night&&P==="kc_vuon"?"Hẹn chàng trèo tường vào hoa viên.":`Chỉ gặp được khi chàng ở cùng nơi, hoặc đêm ở hoa viên nhà`,lock:!(here||night&&P==="kc_vuon"),k:2,c:{suc:-10},o:od((here&&P==="kc_chua"?55:30)+S.tamco/4+mz/5),w:{},l:{},x:"tình ý của ta với chàng +8 · tình ý của chàng +6",go:()=>{S.tm96.h=Math.min(100,S.tm96.h+8);tm.tinh=(tm.tinh||0)+6;S.kld+=3;S.kc.met=(S.kc.met||0)+1},fail:()=>{S.kld+=12;pushDil(mkP("kcE",{e:"caught"}),"Bị bắt gặp")}}));
  X.push(kcCard({g:"soc",who:"ftm",n:"Gửi thư cho người ấy",t:`Nhờ ${S.maid?S.maid.name:"tỳ nữ"} đưa thư.`,k:1,c:{bac:-2},o:od(40+mz/2),w:{},l:{},x:"tình ý của ta với chàng +5",go:()=>{S.tm96.h=Math.min(100,S.tm96.h+5);tm.letters=(tm.letters||0)+1},fail:()=>{S.kld+=15;log("Thư lạc vào tay gia nhân.")}}))}
 /* Tài nghệ (the lessons themselves are the Tài nghệ panel of the base game: real minigames) */
 X.push(kcNeed(kcCard({g:"art",n:"Học lễ nghi cung đình",t:"Một ma ma xuất cung dạy cách đi đứng, quỳ lạy, đối đáp trong cung.",k:3,c:{suc:-15,bac:-12},lock:S.kc.le>=5,w:{duc:1},x:`Lễ nghi +1 (nay ${S.kc.le}/5, cộng vào Phúc tuyển) · biết thêm chuyện trong cung`,go:()=>{S.kc.le++;if(roll(50))kcIntel(1,2)}}),null,"kc_hoc"));
 if(!S.kc.ds)X.push(kcCard({g:"art",n:"Mời danh sư",t:"Mời thầy giỏi nhất kinh thành về dạy.",k:1,c:{bac:-60},o:od(35+S.kgt/2),w:{},l:{},x:"từ nay học tiến bộ nhanh gấp rưỡi",go:()=>{S.kc.ds=1}}));
 /* Thư từ */
 const ct=kcContact();X.push(kcCard({g:"mail",onceM:"thu",n:"Viết thư vào cung",t:ct?`Gửi thư cho ${ct}.`:"Không có người quen trong cung: thư gửi qua người lạ.",k:1,c:{bac:-3},o:od(ct?75:35),w:{},l:{},x:"biết rõ một phi tần",go:()=>kcIntel(1,3),fail:()=>{S.kld+=5;log("Thư bị chặn ở cửa cung.")}}));
 X.push(kcNeed(kcCard({g:"mail",onceM:"mua",n:"Mua tin của thái giám ra cung",t:"Dúi bạc cho tiểu thái giám đi chợ mua sắm.",k:2,c:{suc:-10,bac:-25},o:od(50),w:{},l:{},x:"biết rõ hai phi tần",go:()=>kcIntel(2,3)}),null,"kc_cho"));
 const gv=liveRivals(true).filter(v=>!(S.kc.gift||[]).includes(v.id)).sort((a,b)=>b.rank-a.rank)[0];
 if(gv)X.push(kcCard({g:"mail",n:`Gửi quà vào cung cho ${gv.name}`,t:`Nhờ người nhà gửi lễ vật cho ${rkName(gv)} ${gv.name}.`,k:1,c:{bac:-30},o:od(60),w:{},l:{},x:`${gv.name} với ngươi +10 (vào cung còn nhớ)`,go:()=>{S.kc.gift=(S.kc.gift||[]).concat([gv.id]);try{affAdd(gv,S,10)}catch(e){}kcIntel1(gv,2)}}));
 /* r2 · the non-bạc road of every bạc purchase (owner 15/11 20:30Z): same gain, a price of equal weight paid in Sức, khắc or a family favour */
 if(to&&!S.kc.ds)X.push(kcNeed(kcCard({g:"art",who:to.id,n:"Xin tổ mẫu mời danh sư",t:"Xin tổ mẫu bỏ của riêng mời thầy giỏi về dạy.",k:2,c:{suc:-10},o:od(35+to.af/2),w:{},l:{},x:"từ nay học tiến bộ nhanh gấp rưỡi · tổ mẫu với ngươi -15",go:()=>{S.kc.ds=1;kcAf(to,-15)},fail:()=>kcAf(to,-5)}),to));
 X.push(kcNeed(kcCard({g:"art",n:"Tự học lễ nghi theo sách",t:"Chép Nữ tắc, tập đi đứng, quỳ lạy trước gương.",k:4,c:{suc:-25},lock:S.kc.le>=5,w:{duc:1},x:`Lễ nghi +1 (nay ${S.kc.le}/5, cộng vào Phúc tuyển)`,go:()=>{S.kc.le++}}),null,"kc_khue"));
 if(hu&&!kcOnce("mua","m"))X.push(kcNeed(kcCard({g:"mail",who:hu.id,onceM:"mua",n:"Nhờ huynh trưởng dò tin trong cung",t:"Huynh trưởng quen thị vệ canh cửa cung.",k:2,c:{suc:-10},o:od(45+hu.af/4),w:{},l:{},x:"biết rõ hai phi tần · huynh trưởng với ngươi -10",go:()=>{kcIntel(2,3);kcAf(hu,-10)},fail:()=>kcAf(hu,-4)}),hu));
 if(gv)X.push(kcCard({g:"mail",n:`Gửi bức thêu tự tay làm cho ${gv.name}`,t:`Thêu một bức hoa điểu, nhờ người nhà gửi vào cung cho ${rkName(gv)} ${gv.name}.`,k:3,c:{suc:-30},o:od(50),w:{},l:{},x:`${gv.name} với ngươi +10 (vào cung còn nhớ)`,go:()=>{S.kc.gift=(S.kc.gift||[]).concat([gv.id]);try{affAdd(gv,S,10)}catch(e){}kcIntel1(gv,2)}}));
 if(cha&&to&&!kcOnce("g7","m")&&S.turn-S.kc.g7>=6){const pow=kcPow();X.push(kcNeed(kcCard({g:"fam",who:to.id,n:"Nhờ tổ mẫu khuyên cha dâng sớ",t:"Xin tổ mẫu nói với cha dâng sớ đưa ngươi vào cung sớm.",k:2,c:{suc:-15},o:od(10+pow/2+S.danh/3),w:{},l:{},x:"vào cung sớm (Điện tuyển tháng sau) · tổ mẫu với ngươi -15",go:()=>{S.kc.early=1;S.kc.g7=S.turn;kcAf(to,-15)},fail:()=>{S.kc.g7=S.turn;kcAf(to,-5)}}),to))}
 /* r2-r1 · the small place-act prices too (coordinator 15/11, owner rule 20:30Z): each 2–10 bạc act has a twin with the same gain, paid in
    Sức + one more khắc, or in tỳ nữ thiện cảm (maid.loyal) (bạc -5 ≈ Sức -5 and one khắc ≈ tỳ nữ Lòng -5; home income ≈ 9–20 bạc a month, Sức ≈ 14 a week) */
 {const mzL=n=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal-n,0,100)};
  if(mom)X.push(kcNeed(kcCard({g:"fam",who:mom.id,tw:`Làm vừa lòng ${mom.t.toLowerCase()}`,n:`Hầu ${mom.t.toLowerCase()} trọn buổi`,t:`Không quà cáp: ngồi hầu thuốc, đấm lưng, thêu cùng ${mom.t.toLowerCase()} cả buổi.`,k:3,c:{suc:-20},o:od(65+mom.af/5),w:{khm:5},l:{},x:`${mom.t} với ngươi +8`,go:()=>kcAf(mom,8)}),mom));
  for(const m of [hu,mu].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,tw:`Kết thân ${m.t.toLowerCase()}`,n:`Giúp ${m.t.toLowerCase()} một việc`,t:`Chép sách, khâu áo giúp ${m.name}, không tặng quà.`,k:3,c:{suc:-10},o:od(60+m.af/4),w:{},l:{},x:`${m.t} với ngươi +6`,go:()=>{kcAf(m,6);m.me+=4},fail:()=>kcAf(m,-2)}),m));
  if(mu&&S.maid)X.push(kcNeed(kcCard({g:"fam",who:mu.id,tw:"Ngáng chân thứ muội",n:"Sai tỳ nữ ngáng chân thứ muội",t:`${S.maid.name} lén đổi hộp phấn, giấu thiệp mời hội thơ của nàng; không phải mua chuộc ai.`,k:2,c:{suc:-10},o:od(40+S.tamco/3),w:{},l:{duc:-5,kgt:-3},x:`thứ muội Sắc -3, Danh -3 (kỳ tuyển tú) · ${S.maid.name} thiện cảm -5`,go:()=>{mzL(5);mu.sac=Math.max(10,mu.sac-3);mu.danh=Math.max(0,mu.danh-3);mu.oan+=4},fail:()=>{mzL(5);mu.oan+=20;kcAf(mu,-15);if(to)kcAf(to,-10);log("Chuyện vỡ lở; tổ mẫu nhìn ngươi bằng ánh mắt khác.")}}),mu));
  if(di)X.push(kcNeed(kcCard(S.maid?{g:"fam",who:di.id,tw:`Dò la viện ${di.t.toLowerCase()}`,n:`Sai tỳ nữ nghe ngóng viện ${di.t.toLowerCase()}`,t:`${S.maid.name} làm quen a hoàn bên ấy, nghe xem ${di.t.toLowerCase()} bàn tính gì.`,k:2,c:{suc:-10},o:od(30+S.tamco/3+mz/10),w:{},l:{},x:`có chứng cứ mưu tính của nàng · ${S.maid.name} thiện cảm -5`,go:()=>{mzL(5);S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+1},fail:()=>{mzL(5);S.kld+=5;kcAf(di,-8);log(`${S.maid.name} bị ${di.t.toLowerCase()} bắt gặp.`)}}
   :{g:"fam",who:di.id,tw:`Dò la viện ${di.t.toLowerCase()}`,n:`Rình viện ${di.t.toLowerCase()} cả đêm`,t:`Không đút lót gia nhân: tự nấp ngoài song cửa, đợi ${di.t.toLowerCase()} bàn chuyện.`,k:3,c:{suc:-15},o:od(30+S.tamco/3),w:{},l:{},x:"có chứng cứ mưu tính của nàng",go:()=>{S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+1},fail:()=>{S.kld+=5;kcAf(di,-8);log(`Bị ${di.t.toLowerCase()} bắt gặp.`)}}),null,"kc_di"));
  X.push(kcNeed(kcCard({g:"soc",tw:"Đi lễ chùa",n:"Lên chùa chép kinh",t:"Không dâng lễ: quét sân, chép kinh giúp nhà chùa, nghe giảng kinh.",k:4,c:{suc:-20},w:{duc:2,danh:1},go:()=>kcChance("chua")}),null,"kc_chua"));
  X.push(kcNeed(kcCard({g:"soc",tw:"Dạo phố chợ",n:"Đi xem chợ, không mua",t:"Đi bộ khắp phố, xem người ta phối lụa, tô phấn, nghe người qua lại.",k:3,c:{suc:-20},o:od(80),w:{sac:1},l:{},x:"nghe một lời đồn trong kinh",go:()=>kcNews()}),null,"kc_cho"));
  X.push(kcNeed(kcCard({g:"soc",tw:"Nghe chuyện ở trà lâu",n:"Nghe lỏm ngoài hiên trà lâu",t:"Không thuê nhã gian: giả trang đứng ngoài hiên nghe khách bàn chuyện cung đình; dễ bị nhận ra hơn.",k:2,c:{suc:-15},o:od(35+S.tamco/3),w:{},l:{kgt:-4},x:"biết rõ một phi tần trong cung",go:()=>kcIntel(1,3),fail:()=>{S.kld+=12;log("Có người nhận ra ngươi dưới lớp áo nam.")}}),null,"kc_tra"));
  X.push(kcNeed(kcCard({g:"soc",tw:"Lựa sách ở thư phường",n:"Đứng đọc ở thư phường",t:"Không mua: đứng đọc, chép lại thơ mới cả buổi.",k:3,c:{suc:-15},w:{tai:2},go:()=>kcChance("sach")}),null,"kc_sach"));
  for(const f of S.kc.fam.filter(m=>m.alive&&/^ban/.test(m.r)))X.push(kcNeed(kcCard({g:"soc",who:f.id,tw:`Thăm ${f.name}`,n:`Mang bánh nhà làm thăm ${f.name}`,t:`Tự tay làm bánh, đi bộ sang phủ thế giao, cùng ${f.name} thêu thùa, bàn chuyện tuyển tú.`,k:3,c:{suc:-15},o:od(65+f.af/4),w:{},l:{},x:`${f.name} với ngươi +6 · có khi nghe tin trong cung`,go:()=>{kcAf(f,6);f.me+=4;if(roll(40))kcIntel(1,2)}}),null,"kc_hau"));
  if(S.kc.suit.length)X.push(kcCard({g:"soc",tw:"Giả bệnh tránh xem mặt",n:"Nhịn ăn tránh xem mặt",t:"Nhịn ăn mấy bữa cho mặt xanh xao, không cần thuốc thang, ai nhìn cũng tin là bệnh.",k:4,c:{suc:-15},o:od(45+S.tamco/3),w:{kap:-15},l:{duc:-3},x:"bỏ mối này",go:()=>{S.kc.suit.shift()},fail:()=>{if(cha)kcAf(cha,-12)}}));
  const tm2=kcTmMan();if(tm2&&tm2.alive&&S.tm96)X.push(kcCard({g:"soc",who:"ftm",tw:"Gửi thư cho người ấy",n:"Tự tay đưa thư cho người ấy",t:"Lén ra cổng sau, tự tay đưa thư; không nhờ ai, dễ bị bắt gặp hơn.",k:2,c:{suc:-5},o:od(30+S.tamco/2),w:{},l:{},x:"tình ý của ta với chàng +5",go:()=>{S.tm96.h=Math.min(100,S.tm96.h+5);tm2.letters=(tm2.letters||0)+1},fail:()=>{S.kld+=15;log("Thư lạc vào tay gia nhân.")}}));
  X.push(kcCard({g:"mail",onceM:"thu",tw:"Viết thư vào cung",n:"Gửi thư theo người đi chợ",t:ct?`Không thuê người đưa: nhờ gia nhân đi chợ mang thư đến cửa cung, gửi cho ${ct}; chậm, dễ thất lạc.`:"Không thuê người đưa, không quen ai trong cung: thư gửi qua người lạ, dễ thất lạc.",k:2,c:{suc:-5},o:od(ct?65:30),w:{},l:{},x:"biết rõ một phi tần",go:()=>kcIntel(1,3),fail:()=>{S.kld+=5;log("Thư bị chặn ở cửa cung.")}}));
  /* each twin sits right after the card it mirrors */
  for(const a of X.filter(x=>x.tw)){const i=X.indexOf(a);X.splice(i,1);const j=X.findIndex(x=>!x.tw&&x.n===a.tw);X.splice(j<0?X.length:j+1,0,a)}}
 for(const a of X){if(a.onceM&&kcOnce(a.onceM,"m"))a.done=1}
 return X}
(function(){const d0=deal;deal=function(){if(isKc()){deck=kcCards();return}return d0.apply(this,arguments)}})();
(function(){const a0=act;act=function(i){const a=deck[i];const was=a&&a.done;const r=a0.apply(this,arguments);
 try{if(isKc()&&a&&a.done&&!was&&!S.dead){if(a.onceM)S.kc.once[a.onceM]=S.turn;kcFix();if(a.rep)a.done=0;deal();render()}}catch(e){console.error(e)}return r}})();
(function(){const a0=addArt;addArt=function(k,g){if(isKc()&&S.kc.ds)g=Math.round(g*1.5);return a0.call(this,k,g)}})();
function kcPow(){const c=KCCLAN[S.origin.k];try{return c?tdPow(c):S.origin.k==="ch"?70:40}catch(e){return 40}}
function kcContact(){if(S.origin.k==="ch")return"Thái hậu (cô mẫu)";try{const c=KCCLAN[S.origin.k];const v=c&&liveRivals(true).find(x=>tdHouse(x)===c);if(v){/* r2: a woman of her own clan is no stranger to her (j61 name rule) */try{if(typeof k61Know==="function")k61Know(v,"người trong họ",true,2)}catch(e){}return `${rkName(v)} ${v.name}, người trong họ`}}catch(e){}return""}
function kcIntel1(v,st){try{k61Know(v,"thư nhà",true,st)}catch(e){}if(!S.kc.intel.includes(v.id))S.kc.intel.push(v.id)}
function kcIntel(n,st){const L=shuf(liveRivals(true).filter(v=>!S.kc.intel.includes(v.id)));const got=L.slice(0,n);for(const v of got)kcIntel1(v,st);
 if(got.length)log(`Ngươi biết thêm về ${got.map(v=>`${rkName(v)} ${v.name} (tính ${v.trait}${v.preg?", đang mang thai":""}, sủng ${v.sung>=60?"rất cao":v.sung>=30?"khá":"ít"})`).join("; ")}.`);else log("Không có tin gì mới.")}
function kcNews(){try{const T=trS();const n=T&&T.news&&T.news[0];if(n){log(`Tin triều: ${String(n.h).replace(/<[^>]+>/g,"")}`);return}}catch(e){}const v=pick(liveRivals(true));if(v)log(`Người ta đồn ${rkName(v)} ${v.name} ${v.sung>=50?"đang được sủng":"ít được gọi thị tẩm"}.`)}
function kcChance(where){const tm=kcTmMan();if(tm&&tm.alive&&S.tm96&&!S.kc.ev.meet&&roll(35)){S.kc.ev.meet=1;pushDil(mkP("kcE",{e:"meet"}),"Gặp lại người xưa");return}
 if(where==="chua"&&!S.kc.ev.vh&&S.year>=2&&S.sac>=70&&roll(4)){S.kc.ev.vh=1;pushDil(mkP("kcE",{e:"vihanh"}),"Khách lạ ở chùa")}}

/* ---------- the week, the month ---------- */
(function(){const n0=nextBuoi;nextBuoi=function(){if(!isKc())return n0.apply(this,arguments);const b0=S.buoi;const r=n0.apply(this,arguments);if(isKc()&&!S.dead&&S.buoi!==b0&&(S.buoi||0)>0){kcWhere();if(S.buoi===3&&kcCity(S.place)){S.place="kc_khue"}S.visit=kcVisit(S.place);deal();render()}return r}})();
(function(){const e0=endTurn;endTurn=function(){if(isKc())return kcCoopOn()&&typeof COOPW.weekEnd==="function"?COOPW.weekEnd.apply(this,arguments):kcEndTurn();return e0.apply(this,arguments)}})();
/* co-op: the room's week path (COOPW.weekEnd = jcoopworld endTurn: wait, friend out, send the week; the palace-only wrappers made after it
   (jtsb, jts …) are skipped as in single-player) runs her home week instead of the palace one */
try{if(window.COOPW)COOPW.altTurn=()=>isKc()?kcEndTurn:null}catch(e){}
function kcEndTurn(){if(S.dead||Q.length||S.mg)return;S.buoi=0;let ev="";
 ev+=kcW(()=>resolveTonight()||"");ev+=kcW(()=>rivalsTurn()||"");if(S.dead)return;
 S.suc=cl(S.suc+14+(S.suc<30?6:0),0,100);try{kcWeek()}catch(e){console.error(e)}if(S.dead)return;
 if(S.tuan===2){kcMonth();if(S.dead)return}else S.tuan++;
 /* r2: the round starts on the first week from the tuyển tú month on once Sơ tuyển is passed (was: only week 0 of that month, so a Sơ tuyển
    answered late never led on); a life past the date that never had its Sơ tuyển gets it now */
 /* r2: a Phúc tuyển game left without a result still leads on to Điện tuyển (middle mark) */
 if(!S.dead&&isKc()&&S.kc.tt&&S.kc.tt.play&&!S.kc.tt.done&&!Q.some(m=>m.pp&&m.pp.e==="dien")){S.kc.tt.done=1;S.kc.tt.raw=5;pushDil(mkP("kcE",{e:"dien"}),"Điện tuyển")}
 if(!S.dead&&isKc()&&!S.kc.tt&&(S.year>KC.ty||S.year===KC.ty&&S.month>=KC.tm)){if(S.kc.soOk)kcTuyen();else if(!S.kc.so)kcSoTuyen()}
 if(!isKc()){render();if(Q.length&&$("modal").hidden)showModal();return}
 rollWx();if(kcCity(S.place))S.place="kc_khue";used=0;popIdx=null;popMsg="";kcW(()=>{const q=quiet;quiet=true;try{flip()}finally{quiet=q}});/* r2-r2: the palace night runs silently at home (no jflip card-flip scene, no j93 flip note) */kcW(()=>palFix());if(kcCoopOn())kcW(()=>placeWhere());/* co-op: the host sends the palace whereabouts of the new week */kcWhere();S.visit=kcVisit(S.place);kcFix();
 try{curtain()}catch(e){}deal();render();if(Q.length&&$("modal").hidden)showModal()}
function kcWeek(){if(Q.length>2)return;const E=[];const add=(e,w)=>{if(w>0)E.push([e,w])};const di=kcR("di"),mu=kcR("muoi"),cha=kcR("cha"),to=kcR("to"),hu=kcR("huynh");
 const mal=m=>m?({"Hiểm độc":3,"Tham vọng":2,"Kiêu ngạo":1.4,"Đa nghi":1,"Nhu mì":.4,"Hiền lành":.2}[m.tr]||1)*(1+(m.oan||0)/40)*(m.af<10?1.4:.7):0;
 if(di&&!(S.kc.diBan>S.turn)){add("phan",mal(di)*1.2);add("doc",S.turn>=6&&!S.kc.ev.doc&&di.oan+(30-di.af)>40?mal(di)*.5:0);add("trom",mal(di));add("tudg",S.year>=2?mal(di)*.6:0)}
 if(mu){add("ao",mal(mu));add("tranhmoi",S.kc.suit.length?mal(mu):0)}
 if(cha)add("say",.8);if(hu)add("bac",hu.tr==="phong lưu"?1.2:.5);if(to)add("tobenh",S.kc.ev.tobenh?0:.4);
 if(di&&di.r==="di"&&!S.kc.ev.dithai)add("dithai",.35);
 add("thuc",S.kc.intel.length<liveRivals(true).length?.35:.1);add("tho",S.month>=2&&S.month<=4?1.2:.4);add("hoa",S.month>=4&&S.month<=6?1:.3);
 if(S.month===1&&S.tuan<=1)add("thuongnguyen",3);if(S.month===7&&S.tuan<=1)add("thattich",3);if(S.month===9&&S.tuan===2)add("trungduong",2);
 if(S.tm96&&kcTmMan()){add("tmrise",S.kc.ev.tmrise?0:.5);add("tmcam",S.kc.ev.tmcam||S.tm96.h<70?0:.6);add("tmtron",S.kc.ev.tmtron||S.tm96.h<85||S.year<2?0:.8)}
 if(!S.kc.ev.dich&&S.year>=2&&roll(KC.ill))add("dich",6);
 add("theu",.5);add("gianhan",.4);
 const tot=E.reduce((a,x)=>a+x[1],0);if(!tot||!roll(KC.ev))return;let r=Math.random()*tot;for(const [e,w] of E){r-=w;if(r<0){const d=mkP("kcE",{e});if(d)pushDil(d,KCE[e].t);return}}}
function kcMonth(){S.turn++;const k=S.origin.k;
 apply({bac:5+Math.round(S.kgtu/6)});
 if(!S.kc.ev.chieu||S.kc.mien)S.kap+=KC.apM+(S.age>=19?1:0)+(S.kgtu<40?1:0)+(S.kc.suit.length?1:0);/* registered for tuyển tú: no match may be made */S.kld=Math.max(0,S.kld-2);
 for(const m of S.kc.fam){if(!m.alive)continue;m.oan=Math.max(0,(m.oan||0)-1);if(/^ban|muoi/.test(m.r)){m.tai=Math.min(95,(m.tai||40)+R(2));m.sac=m.sac||50}}
 /* the palace runs on: same monthly world calls as the servant road (j42), with her outside */
 kcW(()=>{for(const v of liveRivals(true))stipend(v);rivalsMonth();servRanks();servMonth();oanMonth();restock();heirMonth();moodMonth();try{tdMonth()}catch(e){}return""});if(S.dead)return;
 /* suitors and the forced match */
 if(S.kc.ev.chieu&&!S.kc.mien){}
 else if(S.kap>=40&&S.kc.suit.length<2&&roll(30+S.kap/3)){const s=kcSuitor();S.kc.suit.push(s);pushDil(mkP("kcE",{e:"moi"}),"Bà mối đến nhà")}
 else if(S.kap>=90&&S.kc.suit.length&&!S.kc.forced){S.kc.forced=1;pushDil(mkP("kcE",{e:"dinhhon"}),"Cha định hôn")}
 /* chapters: the origin chapter (3 beats), on a fixed calendar */
 const beat={4:0,10:1,16:2}[S.turn];if(beat!=null&&!S.dead)pushDil(mkP("kcE",{e:"o"+beat}),KCO[k]?KCO[k].t:"Chuyện nhà");
 if(S.year===KC.ty-1&&S.month===8&&!S.kc.ev.chieu){S.kc.ev.chieu=1;pushDil(mkP("kcE",{e:"chieu"}),"Chiếu tuyển tú")}
 if(S.kc.early&&!S.kc.tt){S.kc.early=0;kcTuyen(true)}
 if(S.year===KC.ty&&S.month===KC.tm-1&&S.tuan===2&&!S.kc.so)kcSoTuyen();
 S.month++;S.tuan=0;if(S.month>12){S.month=1;S.year++;S.age++;try{S.emp.age++;ageYear()}catch(e){}try{allKids().forEach(([kk])=>{if(kk.alive)kk.age++})}catch(e){}for(const m of S.kc.fam)m.age++}
 if(isKc()&&S.year===KC.ty&&S.month===KC.tm-1&&!S.kc.so)kcSoTuyen();
 if(S.suc<=0&&isKc())kcDie("Lao lực mà chết trước kỳ tuyển tú")}
function kcSuitor(){const L=[["Thế tử hầu phủ","hau",80],["con trai Thượng thư bộ Hộ","quan",65],["Thám hoa khoa này","than",55],["đại thương Giang Nam","thuong",45],["lão Thị lang góa vợ","lao",30]];
 const f=L.filter(x=>x[2]<=S.kgt+35+R(20));const s=pick(f.length?f:L.slice(-2));return{n:s[0],k:s[1],q:s[2]}}

/* ---------- events (PEND; options show only costs; results show the numbers) ---------- */
function kcO(n,cost,go,more){const c=cost||{};const s=fmt(c);/* r2: go is wrapped so the kit's source reader (j79 kitBranchFx) never shows an outcome
   branch hidden in the closure as a sure "Tốn"; the real cost is fx, the outcome is told by the option's own hint (KCH) */
 const g=function(){return go.apply(this,arguments)};return Object.assign({n,fx:c,x:"",j67:s?"tốn: "+s:"tốn: không",go:g},more||{})}
function kcRes(t,b,txt){if(txt)log(txt);kcFix();try{resultShow(t,b,true)}catch(e){}}
function kcDo(t,f){const b=rsnap();const r=f();kcRes(t,b,r)}
const KCO={tt:{t:"Quân cờ đầu tiên"},dtq:{t:"Tin dữ Nhạn Môn"},muoi:{t:"Sổ muối"},thd:{t:"Tài nữ kinh thành"},ch:{t:"Thư của cô mẫu"},td:{t:"Án đang dựng"}};
const KCE={
 doc:{t:"Chén canh lạ",b:()=>{const d=kcR("di");S.kc.ev.doc=1;const real=roll(d.tr==="Hiểm độc"?75:45);const mz=S.maid?S.maid.name:"tỳ nữ";return{who:kcFace(d),t:`<p>Đêm khuya, người của ${d.t.toLowerCase()} mang sang một chén canh sâm, nói ${d.t.toLowerCase()} thương ngươi học khuya. ${mz} đứng sau lưng, khẽ lắc đầu.</p>`,o:[
  kcO("Lấy trâm bạc thử",{},()=>kcDo("Chén canh lạ",()=>{if(real&&roll(80)){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+2;d.oan+=5;return"Trâm bạc đen lại. Ngươi giữ chén canh làm chứng."}return"Trâm bạc không đổi màu. Ngươi vẫn đổ chén canh đi."})),
  kcO("Đổ đi, cảm ơn qua loa",{},()=>kcDo("Chén canh lạ",()=>{kcAf(d,-3);return"Ngươi đổ canh vào chậu hoa. Mấy hôm sau cây hoa héo."})),
  kcO("Uống, không muốn mất lòng",{},()=>{if(real){if(roll(45)){kcDie("Trúng độc chén canh sâm của "+d.t.toLowerCase());return}kcDo("Chén canh lạ",()=>{apply({suc:-40,sac:-5});return"Ngươi đau quặn cả đêm, thầy thuốc cứu kịp."});return}kcDo("Chén canh lạ",()=>{kcAf(d,4);apply({suc:5});return"Canh sâm thật. Ngươi thấy mình đa nghi."})})]}}},
 phan:{t:"Hộp phấn lạ",b:()=>{const d=kcR("di");return{who:kcFace(d),t:`<p>${d.t} ${d.name} sai người mang sang một hộp phấn Tô Châu, nói là quà cho ngày ngươi đi tuyển. Mùi phấn hơi hắc.</p>`,o:[
  kcO("Cảm tạ rồi cất đi, không dùng",{},()=>kcDo("Hộp phấn lạ",()=>{kcAf(d,-2);return"Ngươi cất hộp phấn vào đáy rương."})),
  kcO("Nhờ đại phu xem thử",{bac:-10},()=>kcDo("Hộp phấn lạ",()=>{if(roll(55)){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return"Đại phu nói trong phấn có bột làm da nổi mẩn. Ngươi giữ lại làm chứng."}return"Đại phu không thấy gì lạ."})),
  kcO("Dùng thử",{},()=>kcDo("Hộp phấn lạ",()=>{if(roll(50+(d.tr==="Hiểm độc"?30:0))){apply({sac:-6,suc:-10});return"Mặt ngươi nổi mẩn đỏ cả tháng."}apply({sac:1});return"Phấn tốt thật."}))]}}},
 trom:{t:"Vòng ngọc mất tích",b:()=>{const d=kcR("di");const mz=S.maid?S.maid.name:"tỳ nữ";return{who:kcFace(d),t:`<p>Vòng ngọc của ${d.t.toLowerCase()} mất. Gia nhân lục phòng, tìm thấy dưới gối ${mz}. ${d.t} đòi đánh ${mz} hai mươi trượng.</p>`,o:[
  kcO(`Đứng ra bênh ${mz}`,{suc:-10},()=>kcDo("Vòng ngọc",()=>{if(roll(40+S.tamco/3+(S.kc.proof[d.id]||0)*15)){if(S.maid)S.maid.loyal=cl(S.maid.loyal+15,0,100);d.oan+=8;return `Ngươi chỉ ra kẽ hở: người giấu vòng là gia nhân của ${d.t.toLowerCase()}. ${mz} thoát đòn.`}if(S.maid)S.maid.loyal=cl(S.maid.loyal+8,0,100);S.kgt-=2;return `Không ai tin. ${mz} vẫn bị đánh, nhưng biết ngươi đã bênh.`})),
  kcO("Im lặng",{},()=>kcDo("Vòng ngọc",()=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal-20,0,100);return `${mz} bị đánh. Từ đó nàng ít nói hẳn.`}))]}}},
 tudg:{t:"Bài vị đổ",b:()=>{const d=kcR("di");return{who:kcFace(d),t:`<p>Sáng sớm, bài vị tổ tiên trong từ đường đổ vỡ. ${d.t} nói đêm qua thấy bóng ngươi đi qua từ đường.</p>`,o:[
  kcO("Xin tổ mẫu cho tra xét",{suc:-10},()=>kcDo("Bài vị",()=>{const to=kcR("to");if(roll(45+S.tamco/3+(to?to.af/5:0))){d.oan+=10;S.kc.diBan=S.turn+3;return `Gia nhân khai thật: chính người của ${d.t.toLowerCase()} làm đổ.`}S.kgt-=4;if(to)kcAf(to,-8);return"Không tra ra ai. Tổ mẫu phạt ngươi quỳ ba canh giờ."})),
  kcO("Quỳ nhận lỗi cho yên nhà",{suc:-15},()=>kcDo("Bài vị",()=>{apply({duc:2});const to=kcR("to");if(to)kcAf(to,3);return"Ngươi quỳ trước từ đường đến tối. Tổ mẫu thở dài."}))]}}},
 ao:{t:"Mượn y phục",b:()=>{const m=kcR("muoi");return{who:kcFace(m),t:`<p>Thứ muội ${m.name} xin mượn bộ y phục đẹp nhất của ngươi để đi hội ngắm hoa, nơi các nhà quyền quý đến xem mặt.</p>`,o:[
  kcO("Cho mượn",{},()=>kcDo("Mượn y phục",()=>{kcAf(m,8);m.danh+=3;return `${m.name} được khen ở hội hoa.`})),
  kcO("Từ chối",{},()=>kcDo("Mượn y phục",()=>{kcAf(m,-8);m.oan+=6;return `${m.name} đi hội bằng áo cũ, về nhà khóc với ${kcR("di")?kcR("di").t.toLowerCase():"mẹ"}.`})),
  kcO("Cho mượn bộ khác, giữ bộ đẹp",{},()=>kcDo("Mượn y phục",()=>{kcAf(m,2);apply({tamco:1});return"Nàng cầm áo, nhìn ngươi một lúc rồi đi."}))]}}},
 tranhmoi:{t:"Thứ muội giành mối",b:()=>{const m=kcR("muoi");const s=S.kc.suit[0];return{who:kcFace(m),t:`<p>${m.name} lén gặp bà mối, nói tốt cho mình và nói xấu ngươi trước nhà ${s.n}.</p>`,o:[
  kcO("Mặc nàng",{},()=>kcDo("Giành mối",()=>{S.kc.suit.shift();S.kap-=10;return `Nhà ${s.n} quay sang hỏi ${m.name}.`})),
  kcO("Nói lại với cha",{suc:-5},()=>kcDo("Giành mối",()=>{const c=kcR("cha");if(roll(50+(c?c.af/4:0))){m.oan+=10;kcAf(m,-10);return"Cha mắng thứ muội trước cả nhà."}S.kgt-=2;return"Cha gạt đi: chuyện đàn bà."}))]}}},
 say:{t:"Cha say rượu",b:()=>{const c=kcR("cha");return{who:kcFace(c),t:`<p>Tối ấy cha uống say, gọi ngươi vào thư phòng, kể chuyện triều đình và hỏi ngươi có muốn vào cung không.</p>`,o:[
  kcO("Thưa: con muốn vào cung, làm rạng danh nhà",{},()=>kcDo("Cha say rượu",()=>{kcAf(c,6);S.kc.want=1;return"Cha cười lớn, vỗ bàn."})),
  kcO("Thưa: con chỉ muốn ở gần cha mẹ",{},()=>kcDo("Cha say rượu",()=>{kcAf(c,2);S.kap+=8;return"Cha im lặng một lúc. Sáng hôm sau ông cho gọi bà mối."})),
  kcO("Lắng nghe, hỏi chuyện các nhà trên triều",{},()=>kcDo("Cha say rượu",()=>{apply({tamco:2});kcNews();return"Ngươi nhớ từng cái tên cha nhắc tới."}))]}}},
 bac:{t:"Huynh trưởng thua bạc",b:()=>{const h=kcR("huynh");return{who:kcFace(h),t:`<p>${h.name} thua bạc ở sòng phía Nam, nợ năm mươi lạng, lén xin ngươi giúp, đừng cho cha biết.</p>`,o:[
  kcO("Đưa bạc",{bac:-50},()=>kcDo("Thua bạc",()=>{kcAf(h,15);h.me+=5;return"Huynh trưởng thề sẽ trả ơn."}),{dis:S.bac<50}),
  kcO("Mách cha",{},()=>kcDo("Thua bạc",()=>{kcAf(h,-15);h.oan+=10;const c=kcR("cha");if(c)kcAf(c,4);S.kgt-=2;return"Cha đánh huynh trưởng mười roi."})),
  kcO("Từ chối, giữ kín",{},()=>kcDo("Thua bạc",()=>{kcAf(h,-4);if(roll(40)){S.kgt-=5;return"Chủ sòng đến tận cửa đòi nợ. Cả phố biết."}return"Huynh trưởng tự xoay xở được."}))]}}},
 tobenh:{t:"Tổ mẫu lâm bệnh",b:()=>{const t=kcR("to");S.kc.ev.tobenh=1;return{who:kcFace(t),t:`<p>Tổ mẫu lâm bệnh nặng. Cả nhà bàn ai sẽ hầu thuốc ngày đêm.</p>`,o:[
  kcO("Xin được hầu thuốc",{suc:-25},()=>kcDo("Hầu thuốc",()=>{kcAf(t,15);apply({duc:4,kgt:2});return"Ngươi thức trắng nửa tháng. Tổ mẫu khỏi bệnh, nắm tay ngươi không buông."})),
  kcO("Để thứ muội hầu",{},()=>kcDo("Hầu thuốc",()=>{const m=kcR("muoi");if(m){m.danh+=2;kcAf(t,-3)}return"Thứ muội được khen hiếu thảo."}))]}}},
 dithai:{t:"Di nương có thai",b:()=>{const d=kcR("di");S.kc.ev.dithai=1;return{who:kcFace(d),t:`<p>${d.t} ${d.name} có thai. Cả phủ đổi chiều, cha ở viện phía tây nhiều hơn.</p>`,o:[
  kcO("Mang thuốc bổ sang chúc mừng",{bac:-10},()=>kcDo("Di nương có thai",()=>{kcAf(d,8);return"Nàng cười, nhận thuốc mà không uống."})),
  kcO("Đứng ngoài",{},()=>kcDo("Di nương có thai",()=>{const me=kcR("me");if(me)kcAf(me,3);return"Mẫu thân ngồi một mình dưới giàn tử đằng."}))]}}},
 thuc:{t:"Thư nhà từ trong cung",b:()=>{const ct=kcContact();return{who:pMe(),t:`<p>${ct?ct+" gửi":"Một thái giám quen gửi"} thư ra, kể chuyện trong cung.</p>`,o:[
  kcO("Đọc kỹ, ghi nhớ",{},()=>kcDo("Thư từ trong cung",()=>{kcIntel(1,3);return""})),
  kcO("Hồi âm, gửi kèm quà",{bac:-15},()=>kcDo("Thư từ trong cung",()=>{kcIntel(2,3);return"Người trong cung nhận quà, hứa để mắt giúp."}),{dis:S.bac<15})]}}},
 tho:{t:"Hội thơ xuân",b:()=>({who:pMe(),t:`<p>Phủ thế giao mở hội thơ xuân. Các tiểu thư kinh thành đều tới; nghe nói có cả người nhà các vương phủ.</p>`,o:[
  kcO("Dự hội, làm thơ",{suc:-15},()=>kcFest("Hội thơ","thi")),kcO("Cáo bệnh ở nhà",{},()=>kcDo("Hội thơ",()=>"Ngươi ở nhà đọc sách."))]})},
 hoa:{t:"Hội ngắm mẫu đơn",b:()=>({who:pMe(),t:`<p>Hầu phủ mời các nhà đến ngắm mẫu đơn. Các phu nhân đi xem mặt dâu.</p>`,o:[
  kcO("Đi, đánh đàn góp vui",{suc:-15},()=>kcFest("Ngắm hoa","cam")),kcO("Đi, chỉ ngắm hoa",{suc:-10},()=>kcDo("Ngắm hoa",()=>{S.danh+=1;S.kap+=4;return"Có phu nhân hỏi tuổi ngươi."})),kcO("Ở nhà",{},()=>kcDo("Ngắm hoa",()=>""))]})},
 thuongnguyen:{t:"Tết Thượng nguyên",b:()=>({who:pMe(),t:`<p>Đêm rằm tháng giêng, cả kinh thành treo đèn. Khuê nữ được ra phố ngắm đèn, thắp đèn thi.</p>`,o:[
  kcO("Ra phố thắp đèn thi",{suc:-15},()=>kcFest("Thượng nguyên","thi",()=>{const tm=kcTmMan();if(tm&&S.tm96&&roll(60)){S.tm96.h=Math.min(100,S.tm96.h+10);S.kld+=4;return `Dưới đèn hoa, ngươi gặp ${tm.name}. Hai người đứng cạnh nhau rất lâu.`}return""})),kcO("Ở nhà cùng mẫu thân",{},()=>kcDo("Thượng nguyên",()=>{const m=kcR("me")||kcR("di");if(m)kcAf(m,5);return""}))]})},
 thattich:{t:"Đêm Thất tịch",b:()=>({who:pMe(),t:`<p>Đêm Thất tịch, các khuê nữ thi xâu kim dưới trăng, cầu khéo tay.</p>`,o:[kcO("Thi xâu kim",{suc:-10},()=>kcFest("Thất tịch","theu")),kcO("Ngồi xem",{},()=>kcDo("Thất tịch",()=>""))]})},
 trungduong:{t:"Tết Trùng dương",b:()=>({who:pMe(),t:`<p>Cả nhà lên núi ngắm cúc, uống rượu hoa cúc.</p>`,o:[kcO("Đi cùng cả nhà",{suc:-10},()=>kcDo("Trùng dương",()=>{for(const m of S.kc.fam.filter(x=>x.alive&&!/^ban/.test(x.r)))kcAf(m,2);apply({suc:5});return"Một ngày yên ấm hiếm hoi."}))]})},
 tmrise:{t:"Người ấy đỗ đạt",b:()=>{const tm=kcTmMan();S.kc.ev.tmrise=1;S.tm96.rise=1;return{who:pMan(tm),t:`<p>${tm.name} ${TM96V[S.tm96.k]?TM96V[S.tm96.k].how:"thành danh"}. Tin bay khắp kinh thành.</p>`,o:[
  kcO("Gửi lời chúc mừng",{bac:-5},()=>kcDo("Người ấy đỗ đạt",()=>{S.tm96.h=Math.min(100,S.tm96.h+6);return"Chàng gửi lại một bài thơ."})),kcO("Im lặng",{},()=>kcDo("Người ấy đỗ đạt",()=>""))]}}},
 tmcam:{t:"Cha cấm cửa",b:()=>{const tm=kcTmMan(),c=kcR("cha");S.kc.ev.tmcam=1;return{who:kcFace(c),t:`<p>Cha biết chuyện ngươi với ${tm.name}, cấm hắn bước qua cửa phủ: "Con gái nhà này là để đưa vào cung."</p>`,o:[
  kcO("Cúi đầu vâng lời",{},()=>kcDo("Cấm cửa",()=>{kcAf(c,6);S.tm96.h-=10;S.kld=Math.max(0,S.kld-5);return""})),
  kcO("Cãi lại cha",{},()=>kcDo("Cấm cửa",()=>{kcAf(c,-15);S.tm96.h=Math.min(100,S.tm96.h+8);S.kap+=10;return"Cha đập bàn. Bà mối được gọi đến ngay tuần sau."}))]}}},
 tmtron:{t:"Lời rủ trốn đi",b:()=>{const tm=kcTmMan();S.kc.ev.tmtron=1;const ok=S.tm96.h>=80&&(S.maid?S.maid.loyal:0)>=60&&S.kld<55;const r=ok&&kcRare("kcR1",.6);
  return{who:pMan(tm),t:`<p>${tm.name} gửi thư: đêm mười lăm, thuyền đợi ở bến sông. Nếu nàng đến, hai người đi về phương Nam, không bao giờ trở lại.</p>`,o:[
  kcO("Đốt thư, ở lại",{},()=>kcDo("Lời rủ trốn đi",()=>{S.tm96.h-=15;return"Ngươi đốt thư trước đèn."})),
  kcO("Đến bến sông",{suc:-20},()=>kcElope(false))].concat(r?[kcO("✦ Theo chàng đi, có tỳ nữ lo liệu đường đi",{suc:-20},()=>kcElope(true),{r97:1,j67:"tốn: Sức -20 · (Cơ duyên hiếm)"})]:[])}}},
 caught:{t:"Bị bắt gặp",b:()=>{const tm=kcTmMan(),c=kcR("cha");return{who:kcFace(c),t:`<p>Gia nhân bắt gặp ngươi với ${tm?tm.name:"một nam nhân"} trong hoa viên. Cả phủ biết trước khi trời sáng.</p>`,o:[
  kcO("Quỳ xin cha tha",{suc:-10},()=>kcDo("Bị bắt gặp",()=>{if(c)kcAf(c,-15);S.kgt-=6;S.kap+=15;S.kc.ldSeen=1;return"Cha cho ngươi cấm túc trong khuê phòng; bà mối được gọi đến."})),
  kcO("Nhận hết, xin gả cho chàng",{},()=>kcDo("Bị bắt gặp",()=>{if(c)kcAf(c,-25);S.kgt-=8;S.kc.ldSeen=1;S.kc.askTm=1;return"Cha không nói một lời, đóng cửa thư phòng."}))]}}},
 meet:{t:"Gặp lại người xưa",b:()=>{const tm=kcTmMan();return{who:pMan(tm),t:`<p>${TM96V[S.tm96.k]?"Ngươi gặp lại "+TM96V[S.tm96.k].bg:"Ngươi gặp lại người xưa"}: ${tm.name}. Chàng trao cho ngươi ${TM96V[S.tm96.k]?TM96V[S.tm96.k].tok:"một tín vật"}.</p>`,o:[
  kcO("Nhận tín vật",{},()=>kcDo("Tín vật",()=>{S.tm96.tok=1;S.tm96.h=Math.min(100,S.tm96.h+10);return"Ngươi giấu tín vật trong tay áo."})),
  kcO("Trả lại, giữ lễ",{},()=>kcDo("Tín vật",()=>{S.tm96.h-=8;apply({duc:2});return"Chàng cúi đầu, cất tín vật đi."}))]}}},
 vihanh:{t:"Khách lạ ở chùa",b:()=>{const r=kcRare("kcR3",.5);return{who:pEmp(),t:`<p>Trong sân chùa, một nam nhân áo xanh, theo sau mấy người hầu im lặng, hỏi ngươi về câu đối trên cột. Người ta thì thầm: Hoàng thượng vi hành.</p>`,o:[
  kcO("Đối lại câu đối",{},()=>kcDo("Khách lạ",()=>{if(roll(30+S.tai/3)){S.kc.vh=1;return"Người ấy cười, hỏi tên ngươi rồi đi."}return"Người ấy gật đầu rồi đi."})),
  kcO("Cúi đầu tránh đi",{},()=>kcDo("Khách lạ",()=>{apply({duc:1});return""}))].concat(r?[kcO("✦ Đối đáp, rồi dâng một khúc đàn",{suc:-10},()=>kcEnd("kcR3"),{r97:1,j67:"tốn: Sức -10 · (Cơ duyên hiếm)"})]:[])}}},
 dich:{t:"Dịch trong kinh thành",b:()=>{S.kc.ev.dich=1;return{who:pMe(),t:`<p>Kinh thành có dịch sốt. Phố xá vắng tanh, nhà nào cũng đóng cửa.</p>`,o:[
  kcO("Đóng cửa khuê phòng, uống thuốc phòng",{bac:-20},()=>kcIll(15)),kcO("Vẫn đi lại như thường",{},()=>kcIll(45)),kcO("Đi chùa phát thuốc cho dân",{suc:-15,bac:-30},()=>kcIll(55,()=>{apply({duc:6,danh:4});return"Cả kinh thành nhắc tên ngươi."}))]}}},
 theu:{t:"Bức thêu mừng thọ",b:()=>({who:pMe(),t:`<p>Sắp đến thọ tổ mẫu. Nhà muốn mỗi cháu gái dâng một bức thêu.</p>`,o:[kcO("Thức đêm thêu bách thọ đồ",{suc:-30},()=>kcDo("Bức thêu",()=>{const t=kcR("to");if(t)kcAf(t,roll(50+S.tai/3)?10:3);return""})),kcO("Mua bức thêu ngoài phố",{bac:-25},()=>kcDo("Bức thêu",()=>{const t=kcR("to");if(t)kcAf(t,roll(50)?4:-6);return""}))]})},
 gianhan:{t:"Gia nhân xin ra",b:()=>({who:pMaid(),t:`<p>Một gia nhân già nhà ngươi xin về quê, nói thầm rằng có chuyện muốn kể trước khi đi.</p>`,o:[kcO("Nghe hắn kể",{bac:-5},()=>kcDo("Gia nhân",()=>{const d=kcR("di");if(d&&roll(60)){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return `Hắn kể chuyện ${d.t.toLowerCase()} mua thuốc lạ năm xưa.`}return"Toàn chuyện cũ không đâu."})),kcO("Cho bạc, tiễn đi",{bac:-10},()=>kcDo("Gia nhân",()=>{apply({duc:1});return""}))]})},
 moi:{t:"Bà mối đến nhà",b:()=>{const s=S.kc.suit[S.kc.suit.length-1]||S.kc.suit[0];const c=kcR("cha");return{who:kcFace(c),t:`<p>Bà mối đến nói chuyện ${s.n} muốn cầu thân. Cha hỏi ý ngươi.</p>`,o:[
  kcO("Xin cha cho xem mặt trước",{},()=>kcDo("Bà mối",()=>{S.kap+=4;return"Nhà trai hẹn ngày đến."})),
  kcO("Thưa: con đợi kỳ tuyển tú",{},()=>kcDo("Bà mối",()=>{if(roll(40+(c?c.af/3:0))){S.kap-=8;return"Cha gật đầu: cũng được."}if(c)kcAf(c,-5);return"Cha nhíu mày."})),
  kcO(`Nhận lời nhà ${s.n}`,{},()=>kcMarry(s),{dis:S.kap<70})]}}},
 dinhhon:{t:"Cha định hôn",b:()=>{const s=S.kc.suit[0];const c=kcR("cha");const r=S.tm96&&S.tm96.rise&&c&&c.af>=60&&S.tm96.h>=75&&kcRare("kcR2",.8);
  return{who:kcFace(c),t:`<p>Cha đã nhận sính lễ của ${s.n}. Ngày cưới định vào tháng sau.</p>`,o:[
  kcO("Vâng lời cha",{},()=>kcMarry(s)),
  kcO("Quỳ xin cha cho đi tuyển tú",{suc:-10},()=>kcDo("Định hôn",()=>{if(roll(45+(c?c.af/2:0)+(S.kc.want?15:0))){S.kc.suit=[];S.kap=40;S.kc.forced=0;return"Cha trả sính lễ, nói: vậy thì vào cung cho xứng."}S.kc.forced=2;pushDil(mkP("kcE",{e:"dinhhon2"}),"Cha định hôn");return"Cha không đổi ý."})),
  ].concat(r?[kcO("✦ Xin cha gả cho người ấy, nay đã đỗ đạt",{},()=>kcEnd("kcR2"),{r97:1,j67:"tốn: không · (Cơ duyên hiếm)"})]:[])}}},
 dinhhon2:{t:"Cha định hôn",b:()=>{const s=S.kc.suit[0];return{who:kcFace(kcR("cha")),t:`<p>Sính lễ của ${s.n} đã bày đầy chính sảnh. Không còn đường lùi.</p>`,o:[kcO("Lên kiệu hoa",{},()=>kcMarry(s)),kcO("Cắt tóc xin đi tu",{},()=>kcEnd("tu")),kcO("Thắt cổ tự vẫn",{},()=>kcDie("Tự vẫn trước ngày bị ép gả"))]}}},
 chieu:{t:"Chiếu tuyển tú",b:()=>({who:pEmp(),t:`<p>Chiếu tuyển tú ban xuống: mùa xuân năm tới, con gái các nhà quan và lương gia từ mười tám tới hai mươi tuổi đều phải ghi tên. ${kcR("muoi")?"Thứ muội cũng có tên.":""}</p>`,o:[
  kcO("Ghi tên",{},()=>kcDo("Chiếu tuyển tú",()=>{S.kap=Math.max(0,S.kap-30);S.kc.suit=[];S.kc.forced=0;return"Tú nữ đã ghi tên thì không nhà nào được dạm hỏi. Nhà thôi bàn chuyện gả ngươi đi."})),
  kcO("Xin cha lo cho được miễn tuyển",{bac:-40},()=>kcDo("Chiếu tuyển tú",()=>{S.kc.mien=1;return"Cha gật đầu. Ngươi sẽ không phải đi tuyển; nhà sẽ lo chuyện gả chồng."}),{dis:S.kap<50||S.bac<40})]})},
 o0:{t:"",b:()=>kcOrigin(0)},o1:{t:"",b:()=>kcOrigin(1)},o2:{t:"",b:()=>kcOrigin(2)},
 so:{t:"Sơ tuyển",b:()=>kcSoD()},phuc:{t:"Phúc tuyển",b:()=>kcPhucD()},dien:{t:"Điện tuyển",b:()=>kcDienD()},trave:{t:"Trả thẻ bài",b:()=>kcTraveD()}};
PEND.kcE=pp=>{if(!S||!S.kc||S.dead)return null;if(!isKc()&&!/^(dien)$/.test(pp.e))return null;const E=KCE[pp.e];if(!E)return null;const d=E.b(pp);if(!d)return null;
 d.o=(d.o||[]).filter(o=>!o.dis);return d};
function kcFest(t,art,extra){const b=rsnap();const l=(S.arts&&S.arts[art])||0;const sc=l*12+S.tai/3+S.sac/6+R(30);let txt;
 if(sc>=60){S.danh+=4;S.kap+=3;txt=`${t}: ngươi đứng đầu, cả kinh thành nhắc tên.`;if(!S.kc.ev.vp&&S.danh>=BAL.danhG.kcVihanh&&S.sac>=80&&kcRare("kcR3",.4)){S.kc.ev.vp=1;pushDil(mkP("kcE",{e:"vihanh"}),"Khách lạ ở chùa")}}
 else if(sc>=40){S.danh+=2;txt=`${t}: ngươi được khen.`}else{S.danh=Math.max(0,S.danh-1);txt=`${t}: ngươi không nổi bật.`}
 const mu=kcR("muoi");if(mu&&roll(50))mu.danh+=sc<40?3:1;const x=extra?extra():"";kcRes(t,b,txt+(x?" "+x:""))}
function kcIll(p,extra){const b=rsnap();let txt="";if(roll(p)){apply({suc:-35});txt="Ngươi lên cơn sốt.";if(S.suc<=0||roll(S.suc<20?40:8)){kcRes("Dịch",b,txt);kcDie("Chết vì dịch sốt trước kỳ tuyển tú");return}}else txt="Ngươi qua được mùa dịch.";if(extra)txt+=" "+extra();kcRes("Dịch",b,txt)}
function kcRare(id,p){S.kc.r97=S.kc.r97||{};if(S.kc.r97[id]!=null)return S.kc.r97[id];const ok=roll(100*p*(typeof R97CFG==="object"?R97CFG.p:1)*.12);S.kc.r97[id]=ok?1:0;return ok}
/* origin chapter: three beats per origin; the choices seed the palace arcs (S.kc.oc counts the "loyal to the house" path) */
const KCOB={
 tt:[["Cha gọi ngươi vào thư phòng, chỉ lên bàn cờ: \"Một quân cờ tốt phải biết mình đứng ở đâu.\" Ông muốn ngươi học cách nhìn người trên triều.","Học cách nhìn người","Thưa cha, con không muốn làm quân cờ"],
  ["Môn sinh của cha nhờ ngươi chuyển một phong thư cho cha, không qua quản gia. Phong thư không dán kín.","Chuyển nguyên phong thư","Đọc trước rồi mới chuyển"],
  ["Cha nói: \"Vào cung, ngươi sẽ là mắt tai của nhà này. Hoàng hậu sẽ coi ngươi là mối lo.\" Ông chờ ngươi thề.","Thề giữ lòng với nhà","Chỉ hứa sẽ giữ mình"]],
 dtq:[["Thư biên ải: huynh trưởng lạc trong trận ở Nhạn Môn. Cha giữ kín, sợ triều đình mượn cớ.","Giúp cha giữ kín","Xin cha dâng sớ cầu viện"],
  ["Một tên lính cũ về kể: huynh trưởng có thể còn sống, bị giữ ở trại giặc.","Gom bạc chuộc người","Chờ triều đình"],
  ["Cha nói muốn tự mình dẫn quân đi, để mặc lời gièm pha trong triều.","Khuyên cha ở lại kinh thành","Ủng hộ cha"]],
 muoi:[["Cha muốn bỏ nửa gia sản dâng quốc khố để xin một tước vị, để nhà buôn thành nhà có tước trước kỳ tuyển tú.","Ủng hộ cha","Khuyên cha giữ bạc"],
  ["Sổ muối có chỗ thiếu: người của quan Hộ bộ đòi chia phần.","Giúp cha chép lại sổ","Khuyên cha khai thật"],
  ["Thuyền muối đêm cập bến, chở thứ không phải muối.","Giả như không biết","Lén báo quan"]],
 thd:[["Cha mở lớp dạy học cho con nhà nghèo, thiếu bạc mua sách.","Bán trâm mua sách cho cha","Mặc cha lo"],
  ["Hội thơ kinh thành: danh hiệu Tài nữ đang chờ người tranh.","Dốc sức tranh","Nhường bạn khuê phòng"],
  ["Một học trò của cha xin chép bản thảo của ông để dâng lên Hàn lâm viện, ghi tên mình.","Bằng lòng","Đòi ghi tên cha"]],
 ch:[["Thái hậu, cô mẫu của ngươi, gửi thư hỏi ngươi đã học Nữ tắc đến đâu.","Chép Nữ tắc gửi vào cung","Viết thư kể chuyện nhà"],
  ["Cô mẫu cũng gửi thư cho một người cháu gái khác trong họ: hai người, một chỗ bên cạnh bà.","Kết thân với người kia","Lấn lướt người kia"],
  ["Thái hậu cho người ra xem mặt ngươi trước kỳ tuyển.","Ra mắt khiêm nhường","Ra mắt rực rỡ"]],
 /* KC LORE: the house still stands all the way to the palace gate; these three chapters only foreshadow the case the enemy is building (the fall is the card kcEnter shows when she leaves) */
 td:[["Trong triều có kẻ đang dựng một vụ án tham ô nhắm vào bộ Lễ. Cha ngươi chưa bị hặc, nhưng ngươi biết sổ sách thật nằm trong thư phòng.","Giấu sổ sách thật","Đưa sổ cho ngự sử"],
  ["Một người lạ tìm đến, nói khẽ: án đã dựng gần xong; nhận tội thay cha thì đổi được mạng cả nhà.","Gạt đi, tìm chứng cứ","Khuyên cha nhận"],
  ["Cha gọi ngươi vào thư phòng dặn khẽ: dù ngày nào nhà có biến, ngươi cứ đi con đường của mình. Còn kịp làm một việc.","Đốt thư từ của cha","Gửi sổ sao sang nhà thế giao"]]};
function kcOrigin(i){const k=S.origin.k;const B=KCOB[k]&&KCOB[k][i];if(!B)return null;const c=kcR("cha");
 const opts=[kcO(B[1],{suc:-5},()=>kcDo(KCO[k].t,()=>kcOriginFx(k,i,1))),kcO(B[2],{suc:-5},()=>kcDo(KCO[k].t,()=>kcOriginFx(k,i,0)))];
 if(i===2&&k==="dtq"&&S.suc>=90&&(S.kc.oc||0)<=1&&kcRare("kcR4",.6))opts.push(kcO("✦ Cải trang nam nhi, theo quân ra Nhạn Môn",{suc:-30},()=>kcEnd("kcR4"),{r97:1,j67:"tốn: Sức -30 · (Cơ duyên hiếm)"}));
 if(i===2&&k==="muoi"&&S.tamco>=60&&S.kgtu>=90&&kcRare("kcR6",.8))opts.push(kcO("✦ Xin cha giao cho ngươi giữ cả sổ muối",{},()=>kcEnd("kcR6"),{r97:1,j67:"tốn: không · (Cơ duyên hiếm)"}));
 return{who:c?kcFace(c):pMe(),t:`<p class="past">${KCO[k].t} · hồi ${i+1}/3</p><p>${B[0]}</p>`,o:opts}}
function kcOriginFx(k,i,a){S.kc.oc=(S.kc.oc||0)+a;const c=kcR("cha");let t="";const cl0=KCCLAN[k];
 if(a){if(c)kcAf(c,6);try{if(cl0)tdPowAdd(cl0,3)}catch(e){}apply({tamco:1});t="Cha gật đầu hài lòng."}else{if(c)kcAf(c,-4);apply({duc:2});t="Cha nhìn ngươi rất lâu."}
 if(k==="td"&&i===2){if(kcLore()){t+=a?" Thư từ của cha thành tro; kẻ lục soát sau này sẽ chẳng có gì để dựa vào.":" Bản sao sổ sách nằm lại nhà thế giao, chờ ngày cần đến."}
  else if(a||S.kc.oc>=2){S.kc.tdSafe=1;t+=" Án của cha được xét lại; nhà giữ được."}else{S.kc.tdFall=1;t+=" Nhà bị khám. Cha bị bắt giam; ngươi được thế giao che giấu, chờ kỳ tuyển dưới tên khác."}}
 if(k==="dtq"&&i===0&&kcLore())S.kc.lost=1;/* KC LORE: from this chapter the brother is lost at Nhạn Môn: he is no longer at home (j67 dtq_huynh) */
 if(k==="thd"&&i===1&&a)apply({danh:5});if(k==="muoi"&&i===0&&a){S.kgtu=Math.max(10,S.kgtu-20);S.kgt+=8}
 if(k==="ch"&&i===2){S.th=(S.th||0)+(a?8:3)}
 try{const L=S.st&&S.st.ch;if(L)S.kc.seed=(S.kc.seed||[]).concat([k+i+a])}catch(e){}return t}

/* ---------- endings outside ---------- */
function kcMarry(s){
 const k=s.k,q=s.q+S.kgt/4+R(20);let h,t;
 if(k==="hau"&&q>=70){h="Chính thất hầu phủ";t=`Nàng xuất giá vào hầu phủ, làm chính thất của Thế tử. Mười năm sau nàng là Hầu phu nhân, mỗi dịp lễ lại vào cung bái kiến.`}
 else if(k==="lao"){h="Gả xa";t=`Nàng bị gả làm kế thất cho lão Thị lang góa vợ ở biên phủ. Tiếng đàn của nàng không ai nghe nữa.`}
 else if(q<45){h="Làm thiếp nhà quyền quý";t=`Nàng vào phủ ${s.n} làm thiếp. Chính thất nhà ấy không ưa nàng.`}
 else{h="Vợ quan thanh liêm";t=`Nàng làm vợ ${s.n}. Nhà không giàu, nhưng chồng nàng thương nàng suốt đời.`}
 kcEndDo(h,t,h)}
function kcElope(rare){if(rare){kcEnd("kcR1");return}const b=rsnap();if(roll(25)){kcEndDo("Bỏ trốn","Đêm ấy thuyền đi được nửa sông thì đuốc nhà quan đuổi kịp. Người ta vớt được chiếc khăn của nàng ở bến.","Chết đuối khi bỏ trốn")}else{S.kgt-=15;S.kld+=30;S.kc.ldSeen=1;const tm=kcTmMan();if(tm){tm.tinh=Math.max(0,(tm.tinh||0)-30)}S.tm96.h=Math.max(0,S.tm96.h-20);kcRes("Bến sông",b,"Ngươi đến bến thì thuyền đã đi; người nhà đuổi theo kéo ngươi về. Cả phủ biết chuyện.")}}
function kcEnd(id){const N="Nàng";const E={tu:["Xuất gia",`${N} cắt tóc ở chùa Hộ Quốc. Tiếng mõ sớm chiều thay cho tiếng trống tuyển tú.`],
 kcR1:["Bỏ trốn cùng người thương",`${N} theo ${kcTmMan()?kcTmMan().name:"người ấy"} xuống phương Nam. Họ sống trong một ngôi nhà nhỏ bên sông, không ai biết họ là ai.`],
 kcR2:["Vợ Trạng nguyên",`Cha gật đầu. ${N} làm vợ ${kcTmMan()?kcTmMan().name:"người ấy"}; ngày vinh quy, cả kinh thành ra xem.`],
 kcR3:["Vương phi",`Khách áo xanh hôm ấy là Thân vương, em Hoàng thượng. Một tháng sau, ${N} được ban hôn làm Vương phi.`],
 kcR4:["Nữ tướng Nhạn Môn",`${N} cải trang theo quân ra Nhạn Môn, đưa huynh trưởng trở về. Hoàng thượng nghe chuyện, ban hiệu Nữ tướng.`],
 kcR5:["Hòa thân thay công chúa",`${N} được nhận làm nghĩa nữ của Hoàng thượng, gả sang phương Bắc hòa thân. Biên cương yên ổn hai mươi năm.`],
 kcR6:["Nữ thương Giang Nam",`${N} giữ sổ muối nhà mình, thuyền buôn đi khắp Giang Nam. Người ta gọi nàng là Diêm thương nương tử.`]}[id];
 if(KCRARE[id]){try{RARE97.meet(id,KCRARE[id][1])}catch(e){}S.r97=(S.r97||[]).concat([{a:id,tag:KCRARE[id][1],ti:E[0]}])}
 kcEndDo(E[0],E[1],E[0])}
function kcEndDo(h,t,fate){if(S.dead)return;S.kc.end=h;Q=Q.filter(m=>m.cls==="end"||m.nl);try{lifeLog&&0}catch(e){}over(h,t+` <span class="past">(Tiểu thư ngoài cung · ${kcTitle()})</span>`,fate);try{showModal()}catch(e){}}
function kcDie(why){if(S.dead)return;S.kc.end="chết";die(why)}
/* r2-r1 (FAIL 4): a life that ends at home by any path (a palace-side die() inside a world call, an act, an event …) still says so:
   S.kc.end is set before the end card. The end card's "Đầu thai kiếp sau" starts a NEW life (start(): a new S with no S.kc) — that is
   the "S.kc undefined" the reviewer's random run met (it pressed the end card while answering dialogs); code that reads S.kc checks it. */
(function(){const o0=over;over=function(h,t,fate){try{if(S&&!S.dead&&S.kc&&!S.kc.inPal&&!S.kc.end)S.kc.end=h||fate||"chết"}catch(e){}return o0.apply(this,arguments)}})();
/* the death / end card and the life book say where she was */
(function(){if(typeof lifeSave!=="function")return;const l0=lifeSave;lifeSave=function(f){const r=l0.apply(this,arguments);try{if(S&&S.kc&&!S.kc.inPal){const p=lifeLog();if(p[0]&&p[0].n===S.name&&!p[0].kc){p[0].kc=1;p[0].f=(p[0].f||"")+" · Tiểu thư ngoài cung";store.set("cung-luanhoi",p)}}}catch(e){}return r}})();
/* kiếp dở dang: the outside road counts too (12 months at home, or passing Sơ tuyển) */
(function(){if(typeof kpWhy!=="function")return;const w0=kpWhy;kpWhy=function(){if(S&&S.kc&&!S.kc.inPal)return `mới ${S.turn||0}/${KIEP.mo} tháng ở nhà, chưa qua Sơ tuyển`;return w0.apply(this,arguments)}})();

/* ---------- tuyển tú: Sơ tuyển → Phúc tuyển (minigame) → Điện tuyển → entry / trả thẻ bài ---------- */
function kcSoTuyen(){if(S.kc.so||S.dead)return;S.kc.so=1;if(S.kc.mien){S.kc.mien=2;S.kap=Math.max(S.kap,85);const s=S.kc.suit[0]||kcSuitor();if(!S.kc.suit.length)S.kc.suit.push(s);S.kc.forced=1;pushDil(mkP("kcE",{e:"dinhhon"}),"Cha định hôn");return}
 pushDil(mkP("kcE",{e:"so"}),"Sơ tuyển")}
function kcSoOk(bribe){const C=KC.so;const sc=(S.sac>=C.sac?1:0)+(S.suc>=C.suc?1:0)+(S.kld<C.ld?1:0)+(S.kgt>=C.gt?1:0)+(bribe?1:0);return sc>=3}
function kcSoD(){return{who:pMe(),t:`<p>Ma ma Nội vụ phủ đến khám tuyển: xem dung mạo, khí sắc, hỏi gia thế, nghe ngóng tiếng tăm. ${S.kc.ldSeen&&S.kld>=40?"Ngươi biết lời đồn về mình đã đến tai họ.":""}</p>`,o:[
 kcO("Ra mắt ma ma",{},()=>kcSoGo(false)),kcO("Dúi bạc cho ma ma khám tuyển",{bac:-60},()=>kcSoGo(true),{dis:S.bac<60})]}}
function kcPd(n,why){try{if(typeof pdAdd==="function")pdAdd(n,why,"kc")}catch(e){}}
function kcSoGo(bribe){const b=rsnap();if(kcSoOk(bribe)){S.kpTron=1;S.kc.soOk=1;kcPd(5,"qua Sơ tuyển");kcRes("Sơ tuyển",b,"Ngươi qua Sơ tuyển. Tên ngươi được ghi vào sổ tú nữ.")}else{S.kc.soOk=0;kcRes("Sơ tuyển",b,"Ma ma lắc đầu: ngươi bị trả về.");pushDil(mkP("kcE",{e:"trave"}),"Trả thẻ bài")}}
function kcTuyen(early){if(S.kc.tt||S.dead)return;if(!early&&!S.kc.soOk)return;S.kc.tt={early:!!early,raw:5};if(early){S.kpTron=1}
 if(early){pushDil(mkP("kcE",{e:"dien"}),"Điện tuyển");return}pushDil(mkP("kcE",{e:"phuc"}),"Phúc tuyển")}
function kcBestArt(){let b="cam",v=-1;for(const a of ARTS){if(a.k==="y")continue;const l=(S.arts||{})[a.k]||0;if(l>v){v=l;b=a.k}}return b}
function kcPhucD(){const k=kcBestArt();const A=ARTS.find(a=>a.k===k);return{who:pMe(),t:`<p>Trữ Tú cung. Các tú nữ lần lượt dâng tài nghệ trước các ma ma và nữ quan. Ngươi chọn môn ${A.n} (bậc ${(S.arts||{})[k]||0}).</p>`,o:[
 kcO(`Dâng ${A.n}`,{suc:-10},()=>kcPhucPlay(k,false)),kcO("Để tài nghệ quyết định",{suc:-10},()=>kcPhucPlay(k,true))]}}
function kcPhucPlay(k,skip){if(!isKc()||!S.kc.tt||S.kc.tt.done)return;/* r2-r1: a stale Phúc tuyển card answered after the round never opens the mini-game */S.kc.tt.play=1;const fin=raw=>{if(S.kc.tt.done)return;S.kc.tt.done=1;S.kc.tt.raw=raw;S.kc.tt.art=k;pushDil(mkP("kcE",{e:"dien"}),"Điện tuyển");try{showModal()}catch(e){}};
 if(skip||window.__bot||typeof playArt!=="function"){fin(skip?5:cl(3+R(6),0,10));return}try{playArt({art:k,title:"Phúc tuyển",note:"Điểm màn chơi cộng vào Điện tuyển",onDone:(raw,o)=>fin(o&&o.skipped?5:raw)})}catch(e){console.error(e);fin(5)}}
function kcScore(st){/* st: {sac,tai,duc,danh,arts?} — the same rule for her and for the other girls */
 const arts=st.arts?Math.max(0,...Object.values(st.arts)):0;return st.sac*.28+st.tai*.16+st.duc*.12+Math.min(40,st.danh)*.45+arts*3+(st.raw||5)*1.6+(st.le||0)*2+(st.pow||40)/8+(st.th||0)/6-(st.ld||0)/3+(st.bonus||0)}
function kcMyScore(way){const t=S.kc.tt;return kcScore({sac:S.sac,tai:S.tai+(way==="tai"?6:0),duc:S.duc+(way==="duc"?6:0),danh:S.danh,arts:S.arts,raw:t.raw,le:S.kc.le,pow:kcPow(),th:(S.th||0)+(S.origin.k==="ch"?15:0),ld:S.kld,bonus:(S.kc.vh?6:0)+(S.kc.tdFall?-6:0)+((S.origin&&S.origin.r)||0)*4})+R(9)-4}
function kcDienD(){return{who:pEmp(),t:`<p>Điện tuyển. Hoàng thượng và Thái hậu ngồi trên, từng hàng tú nữ quỳ dưới. Thái giám xướng tên ngươi${S.kc.tt.early?" (theo sớ tiến cử)":""}.</p>`,o:[
 kcO("Đáp lời khiêm nhường",{},()=>kcDien("duc")),kcO("Đối đáp lanh lợi",{},()=>kcDien("tai"))]}}
function kcDien(way){const sc=kcMyScore(way);const C=KC.cut;S.kc.tt.sc=Math.round(sc);
 /* the court keeps only some of the girls: a better score is a better chance, never a sure one */
 const pSel=cl(45+(sc-C[0])*1.2,20,KC.selMax);S.kc.tt.p=Math.round(pSel);
 if(sc<C[0]-15||!(window.__kcKeep||roll(pSel))){/* __kcKeep: test hook (dev/test/outside/route.js), never set by the game */pushDil(mkP("kcE",{e:"trave"}),"Trả thẻ bài");log("Điện tuyển: Hoàng thượng trả thẻ bài.");return}
 const rank=sc>=C[2]?2:sc>=C[1]?1:0;kcEnter(rank)}
function kcTraveD(){const tm=kcTmMan();const r=!!(S.tm96&&S.tm96.h>=80&&S.tm96.rise&&kcRare("kcR2",.6));const r5=S.duc>=70&&S.danh>=BAL.danhG.kcR5&&kcRare("kcR5",.6);
 if(!S.kc.suit.length)S.kc.suit.push(kcSuitor());const s=S.kc.suit[0];
 return{who:kcFace(kcR("cha")||S.kc.fam[0]),t:`<p>Ngươi bị trả thẻ bài, về nhà. Cha thở dài: "Thôi thì gả cho nhà tử tế." Nhà ${s.n} đã đợi sẵn.</p>`,o:[
 kcO(`Gả cho ${s.n}`,{},()=>kcMarry(s)),kcO("Xin ở vậy, mở lớp dạy chữ cho con gái",{},()=>{if(S.tai>=60||S.origin.k==="thd")kcEndDo("Nữ phu tử",`Nàng không lấy chồng. Lớp học của nàng ở ngõ Tây có ba mươi đứa con gái nhà nghèo.`,"Nữ phu tử");else kcMarry(s)},{j67:"tốn: không"}),
 kcO("Cắt tóc đi tu",{},()=>kcEnd("tu"))].concat(r?[kcO(`✦ Gả cho ${tm.name}`,{},()=>kcEnd("kcR2"),{r97:1,j67:"tốn: không · (Cơ duyên hiếm)"})]:[]).concat(r5?[kcO("✦ Nhận làm nghĩa nữ, đi hòa thân",{},()=>kcEnd("kcR5"),{r97:1,j67:"tốn: không · (Cơ duyên hiếm)"})]:[])}}
/* entry: she becomes a consort; the carry-over table of OUTSIDE_PLAN §9 */
function kcEnter(rank){const b=rsnap();const K=S.kc;K.inPal=1;K.r=rank;K.yIn=S.year;S.kpTron=1;
 /* KC LORE (coordinator 16/11): td. The house stood until now; the day she leaves for the palace it falls (father framed, the family executed). Dowry confiscated, no house behind her, entry as Đáp ứng exactly like the palace road (j1 td / j4 td). Old saves (S.kc.v 1) keep the old rules. */
 const fall=S.origin.k==="td"&&kcLore();let fallCard=null;
 if(fall){rank=0;K.r=0;K.fell=1;K.tdFall=1;K.hidden=1;const gone=K.fam.filter(x=>x.alive&&x.r!=="ty"&&!/^ban/.test(x.r));K.famGone=gone.map(x=>[x.t,x.name]);gone.forEach(x=>{x.alive=0});
  try{const e=rivals.find(x=>x.enemy);if(e&&typeof k61Know==="function")k61Know(e,"con gái kẻ vu cha",true,2)}catch(e){}
  fallCard={t:"Nhà ngươi bị xử trảm",who:(()=>{try{return kcFace(K.fam.find(x=>x.r==="cha"))}catch(e){return pMe()}})(),h:`<p>Ngày ngươi sắp nhập cung, Hình bộ mang chỉ đến phủ Thị lang. ${S.foeDad||"Kẻ thù của cha ngươi"} đã dâng sớ vu ông mưu phản; chứng cứ dựng xong từ lâu. Phủ bị niêm phong, cha ngươi bị xử trảm cùng cả nhà. </p><p>Em trai út lạc trong đêm khám phủ, không ai biết sống chết.</p><p>Người thế giao đổi tên ngươi trong sổ tuyển để giữ một đường sống. Ngươi vào cung một mình, mang theo mối thù.</p>`+
   kitRows(gone.map(x=>[x.t,"bị xử trảm","r"]).concat([["Em trai út","lạc trong đêm khám phủ","t"],["Hồi môn","bị tịch thu","r"],["Thế lực nhà","không còn","r"]]))}}
 /* r2-r1 (FAIL 3): home dialogs still queued (Phúc tuyển, family events …) never follow her into the palace, and an open mini-game card closes */
 for(let i=Q.length-1;i>=0;i--){const m=Q[i];if(m&&m.pid==="kcE"&&!(m.pp&&m.pp.e==="dien"))Q.splice(i,1)}try{if(typeof kg82Close==="function"&&document.getElementById("kg82"))kg82Close(true)}catch(e){}
 S.rank=rank;S.sung=8+rank*5;S.lastPromo=S.turn;S.danh=Math.min(30,Math.round(S.danh*.6));S.bac=Math.min(400,S.bac+(fall?0:Math.round(S.khm*KC.dowry)));
 S.staff=K.staff0||[];S.place="home";if(S.maid)S.maid.loyal=cl(S.maid.loyal+15,0,100);kcPd(rank>=2?10:5,`vào cung, phong ${RANKS[rank].n}`);S.out=0;S.pal=null;
 if(S.kc.tdFall){S.kc.hidden=1}
 /* the sister and friends who also passed enter as consorts (same score rule) */
 const L=[];for(const m of S.kc.fam.filter(x=>x.alive&&(x.r==="muoi"||/^ban/.test(x.r)))){const sc=kcScore({sac:m.sac,tai:m.tai,duc:30+R(30),danh:m.danh,raw:3+R(6),pow:40+R(30)})+R(9)-4;
  if(sc>=KC.cut[0]&&roomFor("consort")){try{const v=newRival(sc>=KC.cut[2]?2:sc>=KC.cut[1]?1:0);v.name=m.name;v.age=Math.max(18,m.age);v.fid=m.fid;v.sac=m.sac;v.tai=m.tai;v.trait=m.tr;if(m.danh)v.danh=m.danh;
   rivals.push(v);try{affAdd(v,S,Math.round(m.af/2))}catch(e){}try{k61Know(v,"người nhà",true,3)}catch(e){}m.pal=v.id;L.push(v)}catch(e){console.error(e)}}}
 try{palFix()}catch(e){}deal();
 const rk=RANKS[rank].n;if(fallCard)Q.push(fallCard);Q.push({t:"Nhập cung",who:pMe(),h:`<p>Điện tuyển: Hoàng thượng giữ thẻ bài, ban hoa. ${S.name} vào cung, phong <b>${rk}</b>.</p>`+
  kitRows([["Mang theo",[kitChip("Bạc",S.bac,"n")+(fall?" (hồi môn bị tịch thu)":" (có hồi môn)"),`Danh ${S.danh}`],"t"],[fall?"Tỳ nữ thân tín":"Tỳ nữ hồi môn",S.maid?S.maid.name:"không","t"],["Đã biết trong cung",`${S.kc.intel.length} phi tần`,"t"]].concat(L.map(v=>[v.name,`cũng vào cung, ${RANKS[v.rank].n}`,"t"])))});
 log(`<b class="g">Vào cung theo kỳ tuyển tú: ${rk}.</b>`);kcSnapReset();try{if(typeof kcHook==="function")kcHook("enter",{rank})}catch(e){}tab="act";render()}

/* ---------- UI: tabs, top bar, panels, plaques, map (r2: rebuilt on today's kit: kitSubTabs §46, pager + pcard §37.1, kitRelRow §49.1,
   kitRows §51, kitSkillCard §21, pbtn / cardH act cards §6, k3row top-bar chip §31.12) ---------- */
const KCTABS={act:"Khuê phòng",go:"Dư đồ",rv:"Gia tộc",staff:"Giao du",art:"Tài nghệ",kid:"Thư từ",inv:"Tư trang",story:"Mệnh truyện"};/* 8 tabs = today's 8-column bar (Sổ ghi stays reachable through its links) */
const KCG={act:"khue",rv:"fam",staff:"soc",art:"art",kid:"mail"};
function kcTabs(){const on=isKc();document.querySelectorAll("#tabs button").forEach(b=>{const t=b.dataset.tab;if(!t)return;if(b.dataset.kl0==null){b.dataset.kl0=b.textContent;b.dataset.ks0=b.dataset.s||""}
 if(on){b.style.display=t in KCTABS?"":"none";const L=KCTABS[t];b.textContent=L||b.dataset.kl0;b.dataset.s=L||b.dataset.ks0}else if(b.dataset.kon){b.style.display="";b.textContent=b.dataset.kl0;b.dataset.s=b.dataset.ks0}b.dataset.kon=on?"1":""})}
(function(){const r0=render;render=function(){if(isKc()&&!(tab in KCTABS))tab="act";const r=r0.apply(this,arguments);
 try{kcTabs();if(typeof tabsFit==="function")tabsFit();/* fit after the home tabs are shown / hidden */if(isKc()){kcHud();document.querySelectorAll("#tokens > p.empty").forEach(e=>e.remove());/* the scene line already says "Không gặp ai" */
  const P=$("panel");const n=P&&P.querySelector(":scope > nav.ksub, :scope > .kpbar > nav.ksub");if(n&&!n.querySelector("[data-kcsub]"))n.remove()}kcChipPaint()}catch(e){console.error(e)}return r}})();
function kcHud(){const r=$("me-r");if(r)r.textContent=kcTitle();const e=$("hud-sung");if(e){const sm=e.querySelector("small");if(sm){if(sm.dataset.ko0==null)sm.dataset.ko0=sm.innerHTML;sm.innerHTML=sm.dataset.ko0.replace(/Sủng|Chủ tin/,"Gia thanh")}const sp=e.querySelector("span");if(sp)sp.textContent=S.kgt;const u=e.querySelector("u");if(u)u.style.width=S.kgt+"%";e.title=HX.kgt}}
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{if(isKc())kcHud2()}catch(e){console.error(e)}return r}})();
/* #hud2 = the state cells the k3 top bar reads (rule glosses on tap): her home numbers instead of the palace ones */
function kcHud2(){const el=$("hud2");if(!el)return;const col=el.classList.contains("col");
 const c=(k,l,v,cls)=>`<button class="hc ${cls||""}${["buoi","date"].includes(k)?" keep":""}" data-hx="${k}">${l}${v!==""&&v!=null?` <b>${v}</b>`:""}</button>`;
 el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${col?"Mở ra":"Thu lại"}">${col?"▾":"▴"}</button>`+c("date",typeof VP==="object"&&VP.date?VP.date(S.month,S.year,S.tuan):`Tháng ${S.month}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${4-used} khắc`)
  +c("sac","Sắc",S.sac)+c("tai","Tài",S.tai)+c("tamco","Tâm cơ",S.tamco)+c("duc","Đức",S.duc)+c("kgt","Gia thanh",S.kgt,S.kgt<25?"hot":"")+c("kap","Áp lực hôn sự",S.kap,S.kap>=60?"hot":"")+c("khm","Hồi môn",S.khm)
  +(S.kc.ldSeen?c("kld","Lời đồn",S.kld,S.kld>=50?"hot":""):"")+c("kty","Kỳ tuyển tú",`còn ${Math.max(0,kcMonthsLeft())} tháng`)+c("age","Tuổi",S.age)}
(function(){const h0=hudTween;hudTween=function(){if(!isKc())return h0.apply(this,arguments);const s=S.sung;S.sung=S.kgt;try{return h0.apply(this,arguments)}finally{S.sung=s}}})();
/* top bar line 1 (k3 #k3tt, the kit row builder k3row): "Tuyển tú còn N tháng" and, once it matters, "Áp lực hôn sự N" — the palace
   toilette chip ("Chưa điểm trang") is off at home (jtoil toilOn) */
function kcChipPaint(){try{const tt=document.getElementById("k3tt");if(!tt)return;const l1=tt.querySelector(".k3l1");tt.querySelectorAll('[data-k3^="kc"]').forEach(e=>{if(!isKc())e.remove()});if(!isKc()||!l1)return;
 const left=Math.max(0,kcMonthsLeft());const h=k3row("kcty","Tuyển tú",S.kc.tt?"đang tuyển":S.kc.so?"đã qua Sơ tuyển":`còn ${left} tháng`,"")+(S.kap>=40?k3row("kcap","Áp lực hôn sự",S.kap,S.kap>=60?"hot":""):"");
 const cur=[...l1.querySelectorAll('[data-k3^="kc"]')].map(e=>e.outerHTML).join("");if(cur===h)return;l1.querySelectorAll('[data-k3^="kc"]').forEach(e=>e.remove());l1.insertAdjacentHTML("beforeend",h)}catch(e){}}
(function(){let mo=null;const hook=()=>{const tt=document.getElementById("k3tt");if(!tt||mo)return;mo=new MutationObserver(()=>{if(isKc()&&!tt.querySelector('[data-k3^="kc"]'))kcChipPaint()});mo.observe(tt,{childList:true,subtree:true})};
 if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);hook();kcChipPaint();return r}}})();
window.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-k3="kcty"],[data-k3="kcap"]');if(!b||!isKc())return;e.stopImmediatePropagation();e.preventDefault();tab=b.dataset.k3==="kcty"?"story":"staff";render()},true);
try{if(typeof toilOn==="function"){const t0=toilOn;toilOn=function(){if(isKc())return false;return t0.apply(this,arguments)}}}catch(e){}
/* stage plaques: her family instead of the court (relations live on the person's card in Gia tộc) */
(function(){const k0=kitCourtRows;kitCourtRows=function(){if(!isKc())return k0.apply(this,arguments);if(!S||S.dead)return[];
 return S.kc.fam.filter(m=>m.alive&&["cha","me","di","to"].includes(m.r)).slice(0,3).map(m=>({k:"kcm_"+m.id,who:m.t,f:kcFace(m),mood:[kcAt(m),"n"],att:null}))}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-kc^="kcm_"]');if(!b||!isKc())return;e.stopPropagation();e.preventDefault();kcSel(b.dataset.kc.slice(4));tab="rv";render()},true);
function kcSel(id){const L=kcFamList("nha");const i=L.findIndex(m=>m.id===id);if(i>=0){PG.kcfam=i;KTSUB.kcfam="nha"}else{const F=kcFamList("ban");const j=F.findIndex(m=>m.id===id);if(j>=0){PG.kcban=j;KTSUB.kcfam="ban"}}}
(function(){const p0=renderPanel0;renderPanel0=function(){if(!isKc())return p0.apply(this,arguments);const el=$("panel");const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");
 let h="";if(tab==="art"||tab==="inv"){p0.apply(this,arguments);if(tab==="art")el.insertAdjacentHTML("beforeend",kcArtHTML());return}
 if(tab==="go")h=kcMapHTML();else if(tab==="story")h=kcStoryHTML();else if(tab==="rv")h=kcFamHTML();else if(tab==="staff")h=kcSocHTML();else if(tab==="kid")h=kcMailHTML();else h=kcGroupHTML(KCG[tab]||"khue");
 const keep=el.dataset.tab===tab?el.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg="";el.scrollTop=keep;try{kitFix(el)}catch(e){}if(!keep)requestAnimationFrame(()=>{el.scrollTop=0})/* the pane bar (kitPane) moves the sub-tab row after this render */}})();
function kcDoable(a){return !a.done&&!a.lock&&can(cardCost(a))&&canPay(a)}
function kcCardsH(L){return L.length?`<div class="cards">${L.map(([a,i])=>cardH(a,i)).join("")}</div>`:""}
function kcGroupHTML(g){return kcCardsH(deck.map((a,i)=>[a,i]).filter(([a])=>a.g===g))}
/* Tài nghệ: the base lessons (real minigames) stay as they are; the home teachers come as ONE skill card with their act cards */
function kcArtHTML(){const L=deck.map((a,i)=>[a,i]).filter(([a])=>a.g==="art");if(!L.length)return"";
 return kitSkillCard({kind:"info",k:"le",name:"Thầy dạy ở nhà",kicker:"Khuê các",level:S.kc.le,max:5,word:"Lễ nghi",desc:"Ma ma xuất cung dạy lễ nghi cung đình; Lễ nghi cộng vào Phúc tuyển.",bar:false,next:"",acts:L.map(([a,i])=>cardH(a,i))})}
/* Giao du: hôn sự numbers as one kit table, then the act cards (k3CatTabs groups them) */
function kcSocHTML(){const s=S.kc.suit;const tm=S.tm96&&kcTmMan();
 return kitRows([[kitInfo("Áp lực hôn sự"),`${S.kap} trên 100`,S.kap>=60?"r":"t"],["Nhà cầu thân",s.length?s.map(x=>x.n):"chưa có","t"],["Danh",S.danh,"t"],tm?["Người ấy",`${tm.name} · ${S.kc.at.ftm?"đang ở "+KCPL[S.kc.at.ftm][0].toLowerCase():"không rõ ở đâu"}`,"t"]:null])+kcGroupHTML("soc")}
try{Object.assign(KIT_GLOSS,{"Áp lực hôn sự":"Mỗi tháng một tăng. Từ 60 nhà bàn chuyện gả; tới 90 cha định hôn. Đã ghi tên tuyển tú thì không nhà nào được dạm hỏi.","Gia thanh":HX.kgt,"Gia thế":"Danh dự, thế lực và của cải của nhà cha: Sơ tuyển, Điện tuyển và các nhà cầu thân đều xem."})}catch(e){}
/* Thư từ: what she truly knows of the harem — one kit person line per consort (stranger rule of the kit applies), then the letters */
function kcMailHTML(){const L=S.kc.intel.map(id=>RV(id)).filter(Boolean);
 const rows=L.length?`<div class="ktprows">${L.map(v=>`<div class="ktprow">${kitPersonLine(v,{sub:v.alive&&!v.out?`tính ${v.trait} · sủng ${v.sung>=60?"rất cao":v.sung>=30?"khá":"ít"}${v.preg?" · mang thai":""}`:"đã không còn"})}</div>`).join("")}</div>`
  :kitEmpty("Thư từ","Chưa biết ai trong cung: viết thư, mua tin, nghe chuyện trà lâu.");
 return `<h3>${kitInfo("Tin trong cung")}</h3>`+rows+kcGroupHTML("mail")}
try{KIT_GLOSS["Tin trong cung"]="Những gì ta biết thật về hậu cung, qua thư từ, trà lâu và người nhà. Vào cung vẫn nhớ."}catch(e){}
/* Gia tộc = sub-tabs Người nhà · Khuê hữu · Gia thế; a person = the Hậu cung pattern: pager strip + ONE kit person card */
function kcFamList(w){return S.kc.fam.filter(m=>m.alive&&(w==="ban"?/^ban/.test(m.r):!/^ban/.test(m.r)))}
function kcFamActs(m){return deck.map((a,i)=>[a,i]).filter(([a])=>a.who===m.id)}
function kcFamCard(m){const acts=kcFamActs(m);
 const rel=kitRel2([{head:`${m.t} → ta`,dir:"them",rows:[{w:"Thiện cảm",now:m.af==null?null:Math.round(m.af),kind:"good"}].concat(m.oan?[{w:"Oán",now:Math.round(m.oan),kind:"bad"}]:[]).map(r=>r.now==null?{w:r.w,unk:"chưa rõ"}:r)},{head:`Ta → ${m.t.toLowerCase()}`,dir:"me",rows:[m.me==null?{w:"Thiện cảm",unk:"chưa rõ"}:{w:"Thiện cảm",now:Math.round(m.me),kind:"good"}]}]);
 const tuyen=m.r==="muoi"||/^ban/.test(m.r)?[["Cùng đi tuyển tú",[`Sắc ${m.sac}`,`Tài ${m.tai}`,`Danh ${m.danh}`],"t"]]:[];
 return pcard({f:kcFace(m),col:kcFace(m).col,name:m.name,rank:m.t,lines:[`${m.age} tuổi`,`Tính ${m.tr.toLowerCase()}`,`Đang ở ${kcAt(m).toLowerCase()}`],note:rel,tabKey:"kcfam",
  groups:[["Việc",tuyen.concat(acts.map(([a,i])=>cardH(a,i)))]],empty:"Lúc này chưa có việc nào làm được với người này."})}
function kcFamHTML(){const nha=kcFamList("nha"),ban=kcFamList("ban");const rest=deck.map((a,i)=>[a,i]).filter(([a])=>a.g==="fam"&&!a.who);
 const cnt=L=>{const A=L.flatMap(kcFamActs);return{doable:A.filter(([a])=>kcDoable(a)).length,total:A.length}};
 const T=kitSubTabs("kcfam",[Object.assign({k:"nha",label:"Người nhà"},cnt(nha)),Object.assign({k:"ban",label:"Khuê hữu"},cnt(ban)),{k:"gia",label:"Gia thế",doable:rest.filter(([a])=>kcDoable(a)).length,total:rest.length}]);
 let h=T.html;
 if(T.cur==="gia")h+=kitRows([[kitInfo("Gia thanh"),S.kgt,S.kgt<25?"r":"t"],["Thế lực nhà",kcPow(),"t"],["Gia tư",S.kgtu,"t"],["Hồi môn cha mẹ hứa",kitChip("Bạc",S.khm,"n"),"t"],[kitInfo("Áp lực hôn sự"),S.kap,S.kap>=60?"r":"t"]])+kcCardsH(rest);
 else{const L=T.cur==="ban"?ban:nha;const key=T.cur==="ban"?"kcban":"kcfam";h=L.length?`<div class="pgwrap"><div class="kpinline">${T.html}</div>`+pager(key,L.map(m=>({f:kcFace(m),name:m.t==="Khuê hữu"?shortN(m.name):m.t})),i=>kcFamCard(L[i]))+`</div>`:T.html+kitEmpty("Gia tộc","Không còn ai.")}
 return h}
/* Dư đồ: sub-tabs Trong phủ · Kinh thành, one kit priced button per place (who is there; city = 1 khắc; why locked) */
function kcMapHTML(){const B=(k)=>{const P=KCPL[k];const w=kcGoWhy(k);const ppl=kcHere(k).map(m=>m.t.toLowerCase());const tmh=S.kc.at.ftm===k&&kcTmMan()?["người ấy"]:[];const who=ppl.concat(tmh);
  return pbtn(`class="opt" data-kcgo="${k}" title="${P[3].replace(/"/g,"")}"`,P[0],[kcCity(k)?"tốn: 1 khắc":"",who.length?"người ở đây: "+who.join(" và "):"không gặp ai"].filter(Boolean).join(" · "),w||"")};
 const inH=Object.keys(KCPL).filter(k=>KCPL[k][2]),out=Object.keys(KCPL).filter(k=>!KCPL[k][2]);
 const T=kitSubTabs("kcgo",[{k:"phu",label:"Trong phủ",n:inH.length},{k:"kinh",label:"Kinh thành",n:out.length}]);
 return T.html+(T.cur==="kinh"?`<p class="kpnote">${kitInfo("Ra phố","Ra phố cần tỳ nữ đi cùng; buổi tối không ra ngoài")}</p>`:"")+`<div class="opts kcmap">${(T.cur==="kinh"?out:inH).map(B).join("")}</div>`}
try{KIT_GLOSS["Ra phố"]="Ra phố tốn một khắc mỗi chiều đi, phải có tỳ nữ đi cùng; buổi tối khuê nữ không ra ngoài. Chốn đông người dễ sinh lời đồn."}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kcgo]");if(!b||!isKc())return;e.stopPropagation();e.preventDefault();if(b.disabled)return;if(kcGo(b.dataset.kcgo)){tab="act";render()}},true);
/* Mệnh truyện ngoài cung: one kit skill card per thread (chapter label "Chương · Hồi", owner 15/11 20:30Z), then the facts table */
function kcStoryHTML(){const k=S.origin.k;const n=[4,10,16].filter(x=>S.turn>=x).length;const bk=(()=>{try{return RARE97.book()}catch(e){return{}}})();const found=Object.keys(KCRARE).filter(x=>bk[x]).length;
 const nxt=[4,10,16].find(x=>S.turn<x);const tm=S.tm96&&kcTmMan();const left=Math.max(0,kcMonthsLeft());
 const step=S.kc.tt?(S.kc.tt.art?3:2):S.kc.soOk?2:S.kc.so?1:0;
 return kitSkillCard({kind:"story",k:"kco",name:KCO[k].t,kicker:"Chương ngoài cung",level:n,max:3,word:"Hồi",bar:false,next:"",desc:n>=3?"Đã trọn ba hồi.":`Hồi tới: sau ${Math.max(0,nxt-S.turn)} tháng nữa.`})
  +kitSkillCard({kind:"story",k:"kty",name:"Tuyển tú",kicker:S.kc.tt?"Đang tuyển":`Còn ${left} tháng`,level:step,max:3,word:"Vòng",bar:false,next:"",desc:"Sơ tuyển · Phúc tuyển · Điện tuyển. Qua cả ba thì vào cung, phong tới Quý nhân."})
  +(tm?kitSkillCard({kind:"story",k:"tm96",name:"Thanh mai trúc mã",kicker:tm.name,max:0,bar:false,desc:S.tm96.tok?"Ta giữ tín vật của chàng.":"Chưa trao tín vật."}):"")
  +kitRows([["Kết hiếm ngoài cung đã gặp",`${found} trên ${Object.keys(KCRARE).length}`,"t"],["Phúc duyên khi qua tuyển tú","qua Sơ tuyển +5 · vào cung +5, Quý nhân +10","t"]])}
/* her own card */
(function(){const s0=selfCardHTML;selfCardHTML=function(){if(!isKc())return s0.apply(this,arguments);
 return pcard({f:pMe(),col:"#b08a8a",name:S.name,rank:kcTitle(),lines:[`${S.age} tuổi`,S.origin.n],note:`Kỳ tuyển tú còn ${Math.max(0,kcMonthsLeft())} tháng.`,tabKey:"kcme",
  groups:[["Tư chất",[["Sắc",S.sac,"t"],["Tài",S.tai,"t"],["Tâm cơ",S.tamco,"t"],["Đức",S.duc,"t"],["Sức",S.suc,"t"],["Bạc",kitChip("Bạc",S.bac,"n"),"t"],["Danh",S.danh,"t"]]],
   ["Nhà",[["Gia thanh",S.kgt,"t"],["Áp lực hôn sự",S.kap,S.kap>=60?"r":"t"],["Hồi môn",kitChip("Bạc",S.khm,"n"),"t"]]]]})}})();
/* the title screen slot line */
(function(){const t0=showTitle;showTitle=function(){const r=t0.apply(this,arguments);try{document.querySelectorAll("#slots .slot").forEach(el=>{const b=el.querySelector("[data-load]");if(!b)return;const d=loadSlot(+b.dataset.load);
 if(d&&d.S&&d.S.kc&&!d.S.kc.inPal){const sp=el.querySelector(".past");if(sp)sp.textContent=sp.textContent.replace(/^[^·]*/,"Tiểu thư ngoài cung ")}})}catch(e){}return r}})();

/* ---------- co-op hook points (OUTSIDE_PLAN §13; no networking: single-player routes them to the log) ---------- */
const KCHOOK=[];function kcHook(kind,payload){KCHOOK.push({kind,payload,t:S?S.turn:0});if(KCHOOK.length>50)KCHOOK.shift();try{if(typeof window.coopSend==="function")window.coopSend("kc:"+kind,payload)}catch(e){}}
window.kcHook=kcHook;

/* ---------- home dress (owner 11/15): while she is at home (isKc) she and the daughters of the house wear their own
   khuê các dress (tier "kc"), or the plain cotton dress of a poor home (tier "ngheo") when the origin is thd or td.
   img/FIGURES-kc.json is read here only (j39 never loads it), so these tiers can never show inside the palace.
   A face without home-dress art falls back to the old figure (her rank-1 dress). ---------- */
let KCFX={};
function kcFigLoad(){try{fetch("img/FIGURES-kc.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(j=>{const X={};
 for(const f of figList(j)){const t=String(f.tier||""),r=norm(f.role);if(!(t==="kc"||t==="ngheo")||!f.identity)continue;const k=r+":"+f.identity;const T=(X[k]=X[k]||{});(T[t]=T[t]||[]).push(f)}/* r2: the CDN list now also has a26/a36/a51 khuê các dresses for some faces: keep every band */
 const n=Object.keys(X).length;const was=Object.keys(KCFX).length;KCFX=X;if(n!==was)try{if(isKc())render()}catch(e){}}).catch(()=>{})}catch(e){}}
kcFigLoad();setInterval(kcFigLoad,300000);
function kcDress(){return S&&S.origin&&(S.origin.k==="thd"||(S.origin.k==="td"&&!kcLore()))?"ngheo":"kc"}/* KC LORE: td is a Thị lang's daughter until the day she leaves home: khuê các dress; only thd is poor */
const KC_AB=["a18","a26","a36","a51"];function kcBand(age){return age>=51?3:age>=36?2:age>=26?1:0}
function kcDressRec(fid,tier,age){const X=fid&&KCFX[fid];const L=X&&X[tier];if(!L||!L.length)return null;const w=kcBand(age==null?18:age);/* the band of her age, else the nearest one */
 let b=null,bd=9;for(const f of L){const d=Math.abs(KC_AB.indexOf(f.ageBand||"a18")-w);if(d<bd){bd=d;b=f}}return b}
function kcDressSrc(fid,kind,tier,age){const f=kcDressRec(fid,tier||kcDress(),age==null&&S?S.age:age);if(!f)return"";return figPath(kind==="por"?(f.por||f.file):f.file)}
window.kcDressSrc=kcDressSrc;
(function(){const g0=figFor;figFor=function(p,kind){try{if((isKc()||typeof NLP!=="undefined"&&NLP&&S&&S.kcPick==="nha"&&kcOk(S.origin.k))&&p){/* r2: the identity card shows the home dress once "Ở nhà" is picked */const who=p===S?S:typeof figWho==="function"?figWho(p):null;
  if(who===S){const k=S.pid||S.fid||(typeof figPick==="function"?figPick(S):"");const s=kcDressSrc(k,kind);if(s)return s}}}catch(e){}return g0.apply(this,arguments)}})();
/* her sister shares her home; the friends are daughters of officials (khuê các) */
(function(){const k0=kcPor;kcPor=function(m,kind){try{if(isKc()&&m&&m.fid&&(m.r==="muoi"||/^ban/.test(m.r))){const s=kcDressSrc(m.fid,kind==="fig"?"fig":"por",m.r==="muoi"?kcDress():"kc",m.age);if(s)return s}}catch(e){}return k0.apply(this,arguments)}})();

/* ---------- re-port onto the 11/15 main (review/outside-r2): palace-only parts of today's UI stay off while she is at home ---------- */
/* bottom tabs: the home road has its own 8 tabs (KCTABS), like the servant road: no Hậu cung / Giao tình / Mệnh truyện groups */
(function(){if(typeof kgOn!=="function")return;const k0=kgOn;kgOn=function(){if(isKc())return false;return k0.apply(this,arguments)}})();
/* stage right column: the Ân sủng facts (Tai mắt, Có thai, Lật thẻ, Ân tình) and the Đức "!" goal belong to a consort: jk3 reads kitRoad() (j79), which says "kc" at home */
(function(){if(typeof kitRoad!=="function")return;const r0=kitRoad;kitRoad=function(){try{if(isKc())return"kc"}catch(e){}return r0.apply(this,arguments)};window.kitRoad=kitRoad})();
/* family members are kit people (kitStagePeople / kitEventDp §50, kitName §48, figures §33): role, title, face, full-body figure */
function kcIsFam(p){return !!(p&&typeof S!=="undefined"&&S&&S.kc&&S.kc.fam&&S.kc.fam.includes(p))}
(function(){if(typeof personRoleRank!=="function")return;const p0=personRoleRank;personRoleRank=function(p){try{if(kcIsFam(p)){const role=p.r==="cha"?"official":p.r==="huynh"?"man":"other";
  return{role,rank:null,origin:null,sex:p.r==="cha"||p.r==="huynh"?"m":"f",kid:false}}}catch(e){}return p0.apply(this,arguments)}})();
(function(){if(typeof kitTitle!=="function")return;const t0=kitTitle;kitTitle=function(p){if(kcIsFam(p))return p.t;return t0.apply(this,arguments)}})();
(function(){if(typeof kitFace!=="function")return;const f0=kitFace;kitFace=function(p){if(kcIsFam(p))return kcFace(p);return f0.apply(this,arguments)}})();
(function(){const g0=figFor;figFor=function(p,kind){try{const m=p&&(kcIsFam(p)?p:kcIsFam(p.ref)?p.ref:null);if(m&&m.r!=="ty"){const s=kcPor(m,kind==="por"?"por":"fig");if(s)return s}}catch(e){}return g0.apply(this,arguments)}})();
/* "Bạn khuê phòng" → "Khuê hữu" (VANPHONG: no "bạn") — old saves keep their stored title, shown the new way */
(function(){const fix=()=>{try{if(S&&S.kc)S.kc.fam.forEach(m=>{if(/^ban/.test(m.r))m.t="Khuê hữu"})}catch(e){}};const r0=render;render=function(){fix();return r0.apply(this,arguments)}})();

/* event pictures (KIT §50.1 banner): only an existing picture that MEANS the event; anything else shows no picture (never the room) */
const KCART={doc:"dau-doc",dich:"dich-benh",tobenh:"benh-tat",thuc:"thu-nha",so:"tuyen-tu",phuc:"tuyen-tu",dien:"tuyen-tu",chieu:"tuyen-tu",
 thuongnguyen:"fest-nguyentieu",thattich:"fest-thattich",trungduong:"fest-trungcuu",vihanh:"vi-hanh",tmtron:"tu-tinh",meet:"mat-uoc",caught:"tin-don"};
(function(){if(typeof kitEvArt!=="function")return;const a0=kitEvArt;kitEvArt=function(m){try{if(m&&m.pid==="kcE"){const x=KCART[(m.pp||{}).e];return x?{src:"img/ev-"+x+".webp",lab:""}:null}}catch(e){}return a0.apply(this,arguments)}})();

/* EVENT CHOICES in cost mode (KIT §28.6): the outcome lives in a closure, so every option carries its own true hint + risk word
   (kitHint would read only the cost and call a poisoned cup "an toàn"). Keys: event → [option name start, hint, risk]. */
const KCH={
 doc:[["Lấy trâm bạc","biết chén canh có độc hay không; có độc thì giữ làm chứng","an toàn"],["Đổ đi","tránh được chén canh; di nương phật ý chút ít","an toàn"],["Uống","nếu canh có độc thì có thể mất mạng","liều"]],
 phan:[["Cảm tạ","giữ hòa khí, không dùng phấn; người tặng phật ý chút ít","an toàn"],["Nhờ đại phu","có thể tìm ra chứng cứ trong hộp phấn","an toàn"],["Thử một chút","biết phấn có hại hay không; có hại thì tay nổi mẩn, giữ làm chứng","có rủi ro"],["Dùng thử","phấn lạ có thể làm hỏng da mặt","có rủi ro"]],
 trom:[["Đứng ra bênh","tỳ nữ một lòng hơn; tra ra thì di nương mang oán, không thì Gia thanh giảm","có rủi ro"],["Im lặng","tỳ nữ bị đánh, lòng nàng ta nguội hẳn","an toàn"]],
 tudg:[["Xin tổ mẫu","tra ra thì di nương bị phạt; không ra thì Gia thanh giảm, tổ mẫu phật ý","có rủi ro"],["Quỳ nhận lỗi","Đức tăng, tổ mẫu thương ta hơn","an toàn"]],
 ao:[["Cho mượn bộ khác","giữ được bộ đẹp; Tâm cơ tăng","an toàn"],["Cho mượn","thứ muội quý ta hơn, nàng ta nổi danh ở hội hoa","an toàn"],["Từ chối","thứ muội mang oán","an toàn"]],
 tranhmoi:[["Mặc nàng","mất mối này, áp lực hôn sự giảm","an toàn"],["Nói lại với cha","cha có thể mắng thứ muội, hoặc gạt đi và Gia thanh giảm","có rủi ro"]],
 say:[["Thưa: con muốn vào cung","cha hài lòng, ủng hộ ta đi tuyển tú","an toàn"],["Thưa: con chỉ muốn","cha sẽ lo chuyện gả ta sớm","an toàn"],["Lắng nghe","Tâm cơ tăng, biết thêm tin triều","an toàn"]],
 bac:[["Đưa bạc","huynh trưởng mang ơn ta","an toàn"],["Xin tổ mẫu","huynh trưởng mang ơn ta; tổ mẫu phật ý (nhiều)","an toàn"],["Mách cha","huynh trưởng mang oán; cha vừa lòng","an toàn"],["Từ chối","có thể chủ sòng đến đòi nợ, cả phố biết","có rủi ro"]],
 tobenh:[["Xin được hầu thuốc","tổ mẫu thương ta nhiều, Đức tăng","an toàn"],["Để thứ muội","thứ muội được khen hiếu thảo","an toàn"]],
 dithai:[["Mang thuốc bổ","di nương nguôi giận với ta","an toàn"],["Thêu yếm","di nương nguôi giận với ta","an toàn"],["Đứng ngoài","mẫu thân thấy ta đứng về phía bà","an toàn"]],
 thuc:[["Đọc kỹ","biết rõ thêm một phi tần","an toàn"],["Hồi âm, gửi kèm quà","biết rõ hai phi tần, người trong cung để mắt giúp","an toàn"],["Hồi âm, gửi kèm bức thêu","biết rõ hai phi tần, người trong cung để mắt giúp","an toàn"]],
 tho:[["Dự hội","thơ hay thì nổi danh; kém thì mất chút Danh","có rủi ro"],["Cáo bệnh","ở nhà đọc sách, không được gì","an toàn"]],
 hoa:[["Đi, đánh đàn","đàn hay thì nổi danh; kém thì mất chút Danh","có rủi ro"],["Đi, chỉ ngắm","Danh tăng chút ít, nhưng áp lực hôn sự tăng","an toàn"],["Ở nhà","không được gì","an toàn"]],
 thuongnguyen:[["Ra phố","thắp đèn giỏi thì nổi danh; có khi gặp người cũ","có rủi ro"],["Ở nhà","mẫu thân vui","an toàn"]],
 thattich:[["Thi xâu kim","khéo tay thì nổi danh","có rủi ro"],["Ngồi xem","không được gì","an toàn"]],
 trungduong:[["Đi cùng","cả nhà quý ta hơn, Sức hồi chút ít","an toàn"]],
 tmrise:[["Gửi lời chúc","chàng nhớ ta hơn","an toàn"],["Gửi một bài thơ","chàng nhớ ta hơn","an toàn"],["Im lặng","không đổi gì","an toàn"]],
 tmcam:[["Cúi đầu","cha vừa lòng; tình với chàng nhạt đi","an toàn"],["Cãi lại","cha giận, bà mối sẽ đến sớm","an toàn"]],
 tmtron:[["Đốt thư","ở lại; lòng với chàng nguội đi","an toàn"],["Đến bến sông","có thể chết đuối, hoặc bị kéo về và cả phủ biết chuyện","liều"]],
 caught:[["Quỳ xin","bị cấm túc, Gia thanh giảm, bà mối được gọi đến","an toàn"],["Nhận hết","cha giận lắm, Gia thanh giảm nhiều","an toàn"]],
 meet:[["Nhận tín vật","tình với chàng sâu thêm","an toàn"],["Trả lại","Đức tăng, chàng buồn","an toàn"]],
 vihanh:[["Đối lại","đối hay thì người ấy nhớ tên ta","có rủi ro"],["Cúi đầu","Đức tăng chút ít","an toàn"]],
 dich:[["Đóng cửa","ít khi nhiễm dịch; hỏng thì có thể mất mạng","liều"],["Ở yên","khá ít khi nhiễm dịch; hỏng thì có thể mất mạng","liều"],["Vẫn đi lại","dễ nhiễm dịch; hỏng thì có thể mất mạng","liều"],["Đi chùa","Đức, Danh tăng nhiều; rất dễ nhiễm dịch, hỏng thì có thể mất mạng","liều"]],
 theu:[["Thức đêm","tự tay thêu: khéo thì tổ mẫu rất vui","có rủi ro"],["Mua bức thêu","tổ mẫu có thể vui, cũng có thể nhận ra đồ mua","có rủi ro"]],
 gianhan:[["Nghe hắn kể","có thể nghe ra chứng cứ về di nương","có rủi ro"],["Nhờ tỳ nữ","có thể nghe ra chứng cứ về di nương; tỳ nữ phải nhọc lòng","có rủi ro"],["Cho bạc","Đức tăng chút ít","an toàn"],["Tiễn hắn","Đức tăng chút ít","an toàn"]],
 moi:[["Xin cha cho xem mặt","nhà trai hẹn ngày đến; áp lực hôn sự tăng","an toàn"],["Thưa: con đợi","cha có thể đồng ý, hoặc phật ý","có rủi ro"],["Nhận lời","xuất giá, kiếp này dừng ở ngoài cung","an toàn"]],
 dinhhon:[["Vâng lời","xuất giá, kiếp này dừng ở ngoài cung","an toàn"],["Quỳ xin cha","cha có thể trả sính lễ; không thì vẫn bị gả","có rủi ro"]],
 dinhhon2:[["Lên kiệu hoa","xuất giá, kiếp này dừng ở ngoài cung","an toàn"],["Cắt tóc","xuất gia, kiếp này dừng ở cửa chùa","an toàn"],["Thắt cổ","mất mạng","liều"]],
 chieu:[["Ghi tên","nhà thôi bàn chuyện gả ta, chờ kỳ tuyển tú","an toàn"],["Xin cha lo","không phải đi tuyển; nhà sẽ lo gả chồng","an toàn"],["Xin tổ mẫu","không phải đi tuyển; nhà sẽ lo gả chồng; tổ mẫu phật ý (nhiều)","an toàn"]],
 so:[["Ra mắt","qua hay không tùy dung mạo, sức khỏe, tiếng tăm và gia thế","có rủi ro"],["Dúi bạc","dễ qua hơn","có rủi ro"],["Nhờ tổ mẫu","dễ qua hơn; tổ mẫu phật ý (nhiều)","có rủi ro"]],
 phuc:[["Dâng","tài nghệ dâng lên cộng vào Điện tuyển","có rủi ro"],["Để tài nghệ","lấy phần giữa, cộng vào Điện tuyển","an toàn"]],
 dien:[["Đáp lời","Đức nặng hơn; giữ thẻ bài hay không, không bao giờ chắc","có rủi ro"],["Đối đáp","Tài nặng hơn; giữ thẻ bài hay không, không bao giờ chắc","có rủi ro"]],
 trave:[["Gả cho","xuất giá, kiếp này dừng ở ngoài cung","an toàn"],["Xin ở vậy","Tài cao hay nhà thầy đồ thì thành nữ phu tử; không thì vẫn bị gả","có rủi ro"],["Cắt tóc","xuất gia, kiếp này dừng ở cửa chùa","an toàn"]]};
/* the non-bạc road of every bạc choice (owner 15/11 20:30Z: same value, by how hard bạc is to earn at home — about 10–20 bạc a month) */
const KCALT={
 phan:()=>{const d=kcR("di");return d?[kcO("Thử một chút lên cổ tay",{suc:-10},()=>kcDo("Hộp phấn lạ",()=>{if(roll(50+(d.tr==="Hiểm độc"?30:0))){apply({sac:-2});S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return"Cổ tay nổi mẩn đỏ. Ngươi giữ hộp phấn làm chứng."}return"Không có gì lạ."}))]:[]},
 bac:()=>{const t=kcR("to"),h=kcR("huynh");return t&&h?[kcO("Xin tổ mẫu đứng ra trả nợ",{suc:-10},()=>kcDo("Thua bạc",()=>{kcAf(h,12);h.me+=3;kcAf(t,-15);return"Tổ mẫu trả nợ, mắng huynh trưởng một trận, rồi nhìn ngươi không vui."}))]:[]},
 dithai:()=>{const d=kcR("di");return d?[kcO("Thêu yếm cho đứa bé",{suc:-15},()=>kcDo("Di nương có thai",()=>{kcAf(d,8);return"Nàng cầm chiếc yếm, nhìn đường kim một lúc."}))]:[]},
 thuc:()=>[kcO("Hồi âm, gửi kèm bức thêu",{suc:-20},()=>kcDo("Thư từ trong cung",()=>{kcIntel(2,3);return"Người trong cung nhận bức thêu, hứa để mắt giúp."}))],
 tmrise:()=>[kcO("Gửi một bài thơ chúc mừng",{suc:-10},()=>kcDo("Người ấy đỗ đạt",()=>{S.tm96.h=Math.min(100,S.tm96.h+6);return"Chàng gửi lại một bài thơ."}))],
 dich:()=>[kcO("Ở yên trong khuê phòng, xông ngải cứu",{suc:-20},()=>kcIll(22)),kcO("Đi chùa giúp sắc thuốc cho dân",{suc:-35},()=>kcIll(60,()=>{apply({duc:6,danh:4});return"Cả kinh thành nhắc tên ngươi."}))],
 gianhan:()=>[kcO("Nhờ tỳ nữ dò hỏi hắn",{suc:-5},()=>kcDo("Gia nhân",()=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal-6,0,100);const d=kcR("di");if(d&&roll(55)){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return `Tỳ nữ về kể: ${d.t.toLowerCase()} từng mua thuốc lạ năm xưa.`}return"Toàn chuyện cũ không đâu."})),
  kcO("Tiễn hắn ra tận cổng",{suc:-10},()=>kcDo("Gia nhân",()=>{apply({duc:1});return""}))],
 chieu:()=>{const t=kcR("to");return t&&S.kap>=50?[kcO("Xin tổ mẫu nói với cha cho miễn tuyển",{suc:-10},()=>kcDo("Chiếu tuyển tú",()=>{S.kc.mien=1;kcAf(t,-15);return"Tổ mẫu gật đầu. Ngươi sẽ không phải đi tuyển; nhà sẽ lo chuyện gả chồng."}))]:[]},
 so:()=>{const t=kcR("to");return t&&t.af>=10?[kcO("Nhờ tổ mẫu viết thư gửi ma ma",{suc:-5},()=>{kcAf(t,-15);kcSoGo(true)})]:[]}};
const KCO_H=[["cha hài lòng, thế lực nhà thêm chút ít","an toàn"],["cha phật ý chút ít, Đức tăng","an toàn"]];
(function(){const P0=PEND.kcE;PEND.kcE=pp=>{const d=P0(pp);if(!d)return d;try{const e=pp.e;const add=(KCALT[e]?KCALT[e](pp):[]).filter(o=>!o.dis);
  if(add.length){const k=d.o.findIndex(o=>o.r97);if(k<0)d.o.push(...add);else d.o.splice(k,0,...add)}
  const H=KCH[e]||[];d.o.forEach((o,i)=>{if(o.hint)return;if(o.r97){o.hint="cơ duyên hiếm: một kết cục khác hẳn";o.risk="an toàn";return}
   const h=/^o\d$/.test(e)?KCO_H[i]:H.find(x=>String(o.n).startsWith(x[0]));if(h){const [hint,risk]=h.length>2?h.slice(1):h;o.hint=hint;o.risk=risk}})}catch(x){console.error("jkc hints",x)}return d}})();
/* her own family is never a stranger (j61 name / face rule): the plaques, cards and event figures show their faces and names */
(function(){const w=n=>{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(p){try{const e=p&&(p.__kp||p.ref||p);if(kcIsFam(e))return true}catch(x){}return f0.apply(this,arguments)}};w("kitKnown");w("kitKnownName")})();
(function(){if(typeof k61St!=="function")return;const s0=k61St;k61St=function(e){if(kcIsFam(e))return 3;return s0.apply(this,arguments)}})();
/* in the palace the home numbers (Gia thanh, Áp lực hôn sự, Hồi môn, Lời đồn) are history: never a delta on a palace result card */
(function(){const r0=resultShow;resultShow=function(t,b){try{if(b&&S&&S.kc&&!isKc())for(const k of ["kgt","kap","khm","kld"])b[k]=S[k]||0}catch(e){}return r0.apply(this,arguments)}})();

/* r2-r2: the goal strip / chapter detail (jgoal, KIT §72) at home shows the home chapter (tuyển tú), never the palace chapter of S.st */
window.kitGoalAlt=function(){try{if(typeof S==="undefined"||!S||S.dead||!isKc())return null;const n=kcMonthsLeft();
 return{kind:"v1",home:1,n:1,max:1,t:"Chờ kỳ tuyển tú",road:"Khuê các",g:"Qua Sơ tuyển, Phúc tuyển, Điện tuyển thì vào cung",next:`Kỳ tuyển tú còn ${n} tháng`,
  todo:[{t:"Học một môn tài nghệ",why:"tuyển tú xét tài lẫn sắc; tài cao thì Điện tuyển dễ lọt mắt",tab:"art",tl:KCTABS.art},
   {t:"Giữ lòng cha mẹ",why:"cha mẹ thương thì được gửi đi tuyển, hồi môn hậu",tab:"rv",tl:KCTABS.rv},
   {t:"Giữ danh tiếng trong sạch",why:"tiếng xấu ngoài phố thì Sơ tuyển đã bị gạt",tab:"go",tl:KCTABS.go}]}}catch(e){console.error("kitGoalAlt",e);return null}};
