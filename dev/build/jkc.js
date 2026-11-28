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
 cut:[50,80,100],      /* Điện tuyển score: below [0] = trả thẻ bài, [1] Thường tại, [2] Quý nhân, else Đáp ứng (the keep chance cap is BAL.kcSelMax) */
 so:{sac:30,suc:25,ld:70,gt:15},ev:38,apM:2,sch:22,ill:3,dowry:.6};
const KCDAD={tt:["Tể tướng","phủ Tể tướng"],dtq:["Đại tướng quân","phủ Tướng quân"],muoi:["Đại thương muối","Diêm thương phủ"],thd:["Thầy đồ","nhà thầy đồ"],ch:["Quốc cữu","phủ Quốc cữu"],td:["Thị lang bộ Lễ","phủ Thị lang"]};
/* KC LORE (coordinator 16/11, review/kc-lore): muoi has no clan (a salt merchant is no minister's kin: the Hộ bộ official only squeezes the house, KCOB muoi 2); same as clanOf() in the palace */
const KCCLAN={tt:"Tể tướng",dtq:"Đại tướng quân",thd:"Hàn lâm",td:"Lễ bộ"};
/* KC LORE: new games run lore v2 (the td house falls only when she leaves for the palace; one father, one brother, one dress). Old saves (S.kc.v 1) keep their old rules. At the identity card S.kc does not exist yet: that is always a new game. */
function kcLore(){return !S||!S.kc||(S.kc.v||1)>=2}
/* home names come from the one name core (jname.js nmNew) */
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
Object.assign(NAMES,{kgt:"Gia thanh",kap:"Áp lực hôn sự",khm:"Hồi môn",kld:"Lời đồn"});/* kit-cost-rows-home: kld joins the other home stats (j1 KLOW already treats kap / kld as «lower is better») */
RKEYS.push(["kgt","Gia thanh"],["kap","Áp lực hôn sự"],["khm","Hồi môn"]);
try{Object.assign(HX,{kgt:"Gia thanh: danh dự của nhà ngươi (0–100). Tai tiếng làm giảm; mối hôn sự tốt, công danh của cha anh làm tăng. Sơ tuyển và các nhà cầu thân đều xem.",
 kap:`Áp lực hôn sự (0–100): mỗi tháng một tăng. Từ ${BAL.kc2.st.kc.moi} bà mối bắt đầu tới nhà; tới ${BAL.kc2.st.kc.dinh} cha định hôn.`,khm:"Hồi môn cha mẹ hứa cho ngươi. Vào cung hay xuất giá đều mang theo thành bạc.",
 kld:"Lời đồn: điều người ngoài xì xào về ngươi. Quá nhiều thì Sơ tuyển trượt và mối hôn sự tan.",kty:"Kỳ tuyển tú: mùa xuân năm thứ ba. Qua Sơ tuyển, Phúc tuyển, Điện tuyển thì vào cung."})}catch(e){}
try{Object.assign(PD_END,{"Chính thất hầu phủ":20,"Vợ quan thanh liêm":12,"Nữ phu tử":15,"Làm thiếp nhà quyền quý":5,"Gả xa":5,
 "Bỏ trốn cùng người thương":35,"Vợ Trạng nguyên":35,"Vương phi":35,"Nữ tướng Nhạn Môn":35,"Hòa thân thay công chúa":35,"Nữ thương Giang Nam":35})}catch(e){}
const KCRARE={kcR1:["Bỏ trốn cùng người thương","Bỏ trốn"],kcR2:["Vợ Trạng nguyên","Thanh mai thành phu quân"],kcR3:["Vương phi","Vương phi"],kcR4:["Nữ tướng Nhạn Môn","Nữ tướng"],kcR5:["Hòa thân thay công chúa","Hòa thân"],kcR6:["Nữ thương Giang Nam","Nữ thương"]};
try{for(const k in KCRARE)RARE97.add(k,{t:"Tiểu thư ngoài cung",tag:KCRARE[k][1]})}catch(e){}
/* OWNER #8 (15/11 20:05Z): a life as a thiếu nữ starts with a chest of her girlhood belongings that fills her slots with ordinary girlhood
   things; she keeps them into the palace (fallback outfit). New items: Ngọc bội khuê các (painting img/item-ngocboikc.webp, gpt-2-6,
   dev/art/ITEM_ART.md §5) and Vòng bạc hoa mai (img/item-vongbackc.webp); the rest are existing items. */
try{IT.ngocboikc=IT.ngocboikc||{n:"Ngọc bội khuê các",kd:"Trang sức",d:`Đeo eo: Sắc ${balSg(BAL.itFx.ngocboikc.w.sac)} · ngọc bội con gái mang từ nhà`,pr:10,rk:0,sl:"waist",w:BAL.itFx.ngocboikc.w};
 IT.vongbackc=IT.vongbackc||{n:"Vòng bạc hoa mai",kd:"Trang sức",d:`Đeo tay: Sắc ${balSg(BAL.itFx.vongbackc.w.sac)} · đôi vòng bạc con gái mang từ nhà`,pr:10,rk:0,sl:"wrist",w:BAL.itFx.vongbackc.w};
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
function kcAf(m,n){if(m){m.af+=n;if(n<0)spAdd(m,"oan",Math.round(-n/2))}}
function kcMonthsLeft(){return (KC.ty-S.year)*12+(KC.tm-S.month)}
function kcTitle(){return `Tiểu thư ${KCDAD[S.origin.k][1]}`}
/* KC LORE: at home she is a Tiểu thư in every dialog and card (pMe() said "Đáp ứng", the palace rank she does not hold yet) */
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);try{if(isKc()&&kcLore())f.rw="Tiểu thư"}catch(e){}return f}})();

/* ---------- faces: every family member carries a figure identity (fid) from the existing pools (placeholders; §14 art list) ---------- */
function kcPor(m,kind){try{const r=m.fid.split(":")[0];const L=(FIGIX[r]||{})[m.fid];if(!L||!L.length)return"";const L2=r==="consort"?L:(typeof f88IsCT==="function"&&L.filter(f=>!f88IsCT(f)).length?L.filter(f=>!f88IsCT(f)):L);/* maid faces now also list t1–t8 consort-dress records: a khuê các / maid pick never takes one */const f=figBest(L2,r==="consort"?0:null,m.age);return f?figPath(kind==="fig"?(f.file||f.src):f.por):""}catch(e){return""}}
function kcFace(m){if(m.r==="ty"&&S.maid)return pMaid();const f={src:kcPor(m),ini:(m.name||"?").split(" ").pop()[0],col:m.r==="cha"||m.r==="huynh"||m.r==="tm"?"#6a8aa0":"#b08a8a",rk:"off",rw:m.t};
 f.__kp=m;try{f.__kr=personRoleRank(m)}catch(e){}return f}
/* the kcR1 elope gate, ONE key for jkc tmtron and jkc3b tm96z (law 4) */
function kcR1Ok(){const G=BAL.kc3.rare.r1;return !!S.tm96&&S.tm96.h>=G.h&&(S.maid?S.maid.loyal:0)>=G.loyal&&(S.kld||0)<G.kld}
/* E25r2 (co-op land gate, law 6b): the role's pool first, then the next pool of the same sex (the one chain BAL.kc3.ros.pool, as kc3Fid):
   the mama pool holds 8 faces and one home household uses all 8, so in a co-op room (fidUsed is a world key) the second seat's mother /
   di nương / tổ mẫu were left with no face */
function kcFreeFid(role,pref){const U=new Set(figUsed());const ch=(typeof BAL!=="undefined"&&BAL.kc3&&BAL.kc3.ros&&BAL.kc3.ros.pool&&BAL.kc3.ros.pool[role])||[role];
 for(const r of ch){const keys=Object.keys((FIGIX||{})[r]||{});const L=(r===role?(pref||[]).filter(k=>keys.includes(k)&&!U.has(k)):[]).concat(shuf(keys.filter(k=>!U.has(k))));const k=L[0]||"";if(k){figUsed().push(k);return k}}return""}

/* ---------- start: the identity card choice, then the home life ---------- */
function kcPick(){return (S&&S.kcPick)||"cung"}
function kcPathHTML(){const k=kcPick();const lock=!!window.__kcO;const r0=RANKS[(S.origin&&S.origin.r)||0].n;
 /* OB-KIEP (owner 25/11 ~22:40Z «đọc khó hiểu quá ... câu nào mình nói nó cũng hiểu»): every item is ONE plain sentence (no «,» inside an item: the
    kit splits a value at «;» and «,»); a loss / risk never sits under «thành» (the fallen house of a tội thần was shown as a gain); «Phúc duyên khi qua
    tuyển tú» says what it gives. The kit shows a long list one item per line (KIT §6.6). */
 const r1=(S.origin&&S.origin.r)?`được phong tối đa tới ${r0} (định ở kỳ tuyển chọn)`:`được phong ${r0}`;
 const fall=!!(S.origin&&S.origin.k==="td"&&kcLore());
 const G=["hai năm ở nhà học tài nghệ để nâng Tư chất",fall?"một tỳ nữ hồi môn một lòng theo hầu":"hồi môn cùng một tỳ nữ hồi môn một lòng theo hầu",fall?"thế lực nhà cha đỡ lưng những năm còn ở nhà":"thế lực nhà cha đỡ lưng",
  "biết trước tin tức về các phi tần trong cung","qua tuyển tú có thể được phong tới Quý nhân","có thể gặp thanh mai trúc mã và mở ra những kết cục hiếm ngoài cung",
  "qua mỗi vòng tuyển tú được thêm Phúc duyên","vào cung mang theo hành trang những năm ở nhà (Danh, Tư chất, người đã biết)"];
 const B=["muộn hai năm mới vào cung (khi đã hai mươi tuổi)"].concat(fall?["nhà cha sụp đổ đúng ngày ngươi vào cung (hồi môn bị tịch thu)"]:[]);
 const O=[["cung","Vào cung ngay",`thành: vào cung ngay; ${r1}; có thêm khoảng hai năm trong cung để thăng phẩm · hỏng: không có hồi môn; không biết trước gì về các phi tần; không có cơ duyên ngoài cung`],
  ["nha","Ở nhà chờ tuyển tú",`thành: ${G.join("; ")} · hỏng: ${B.join("; ")} · kèm: có thể bị trả thẻ bài (trượt tuyển tú) hay bị ép gả; kế mẫu và thứ muội có thể ngáng chân; có thể mất mạng khi còn ở nhà`]];
 return `<div class="kpsec kkcp"><h4 class="kpst">${typeof kitGloss==="function"?kitGloss("Con đường"):"Con đường"}</h4><div class="opts kcpo">`+
  O.map(([x,n,l])=>`<button type="button" class="opt${x===k?" ksel":""}" data-kcp="${x}" aria-pressed="${x===k}"${lock?" disabled":""}>${n}<small>${l}</small></button>`).join("")+`</div></div>`}
try{KIT_GLOSS["Con đường"]="Vào cung ngay: kiếp bắt đầu trong cung. Ở nhà chờ tuyển tú: sống ở nhà cha khoảng hai năm (học tài nghệ, lo chuyện gia đình, hôn sự, tình riêng), rồi qua ba vòng tuyển tú mới vào cung; có thể không vào cung mà xuất giá. Chỉ con nhà quan, nhà buôn, nhà thầy đồ, cháu Thái hậu, con nhà Thị lang mới có đường này."}catch(e){}
/* r2-r1: "Ở nhà chờ tuyển tú" picked: the identity card shows her as she starts at home (Tiểu thư …, 18 tuổi, home Danh/Bạc caps of kcInit), not the palace rank */
function kcCardHome(m){try{return !!(m&&m.nl&&S&&S.origin&&!S.srv&&!(typeof isSrv==="function"&&isSrv())&&kcPick()==="nha"&&kcOk(S.origin.k))}catch(e){return false}}
(function(){if(typeof kpBuild!=="function")return;const b0=kpBuild;kpBuild=function(M,m){const home=kcCardHome(m);let sv=null;
 if(home){sv=[S.age,S.danh,S.bac];S.age=BAL.ageMin;S.danh=Math.min(S.danh,8);S.bac=Math.min(S.bac,40+Math.round((KCGTU[S.origin.k]||50)/2))}
 try{b0.apply(this,arguments)}finally{if(sv){S.age=sv[0];S.danh=sv[1];S.bac=sv[2]}}
 try{if(home){const ti=$("mb")&&$("mb").querySelector(".kpidn .kti");if(ti)ti.textContent=kcTitle()}}catch(e){}
 try{if(!(m&&m.nl)||!S||typeof NLP==="undefined"||!NLP||!kcOk(S.origin.k))return;const mb=$("mb");if(!mb||mb.querySelector(".kkcp"))return;
 const w=document.createElement("div");w.innerHTML=kcPathHTML();const sec=w.firstElementChild;/* r3 (kit-fit, reviewer: name + age line lost on the identity card): j86 wraps the card body in .kpscroll with ONLY Nhận / Đổi pinned below it; the road cards belong in that scroll area (they sat between the two as a 300 px block and left it 106 px) */const sc=mb.querySelector(":scope > .kpscroll");const at=(sc||mb).querySelector(":scope > .kpick")||(sc?null:mb.querySelector(":scope > .kpopts"));if(at)at.parentNode.insertBefore(sec,at);else (sc||mb).appendChild(sec)}catch(e){console.error("jkc card",e)}}})();
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
function kcInit(){const k=S.origin.k;const sur=tdSur(S.name);const nm=g=>`${sur} ${g}`;
 const ag=a=>a;const T=(r,t,name,age,role,pref,tr,af)=>({id:"f"+r,r,t,name,age,fid:kcFreeFid(role,pref),tr:tr||undefined,af:af==null?30+R(25):af,me:30+R(20),oan:0,alive:1});
 const fam=[];
 fam.push(T("cha","Phụ thân",nmNew("m",{sur,more:fam}),48+R(8),"official",[],null,35+R(25)));
 /* KC LORE: the father of tt / dtq is the head of that house in the court (j55 trS, j67 {dad}): one name, one age, in the home and in the palace */
 try{const hd=(k==="tt"||k==="dtq")?tdHead(KCCLAN[k]):null;if(hd&&hd.dadOf==="me"){fam[0].name=hd.name;fam[0].age=Math.min(56,Math.max(46,hd.age||50));fam[0].net=netOf(hd).slice()}}catch(e){console.error("kc lore dad",e)}
 const momAlive=roll(BAL.odb.jkc.rlMomAlive);
 if(momAlive)fam.push(T("me","Mẫu thân",nmNew("mo",{more:fam,avoidSur:new Set([sur])}),38+R(6),"mama",[],pick(["Ân cần","Khiêm nhường","Kín đáo"]),55+R(25)));
 fam.push(T("di",momAlive?"Di nương":"Kế mẫu",nmNew("mo",{more:fam,avoidSur:new Set([sur])}),33+R(6),"mama",[],pick(["Xảo quyệt","Tham vọng","Kiêu ngạo","Ân cần"]),R(25)));
 fam.push(T("to","Tổ mẫu",`Lão phu nhân ${sur} gia`,66+R(8),"mama",[],pick(["Cương trực","Ân cần","Kín đáo"]),40+R(20)));
 fam.push(T("huynh","Huynh trưởng",nmNew("m",{sur,more:fam}),21+R(4),"man",["man:thive-1","man:thive-2"],pick(["phong lưu","trung hậu","tham vọng","cẩn trọng"]),40+R(30)));
 const sis=T("muoi","Thứ muội",nmNew("f",{sur,more:fam}),BAL.ageMin,"consort",[],pick(["Kiêu ngạo","Tham vọng","Khiêm nhường","Xảo quyệt","Ân cần"]),R(30));
 sis.sac=40+R(50);sis.tai=30+R(50);sis.danh=4+R(8);fam.push(sis);
 for(let i=0;i<2;i++){const f=T("ban"+i,"Khuê hữu",nmNew("f",{more:fam,avoidSur:new Set([sur])}),BAL.ageMin+R(2),"consort",[],pick(["Ân cần","Khiêm nhường","Kiêu ngạo","Tham vọng"]),30+R(30));f.sac=40+R(50);f.tai=30+R(50);f.danh=4+R(8);fam.push(f)}
 S.kc={v:2,fam,at:{},once:{},ev:{},ch:{o:0,tm:0,ke:0,hon:0},suit:[],intel:[],proof:{},le:0,ds:0,g7:-99,ldSeen:0,r0:S.rank,staff0:S.staff||[],y0:S.year,end:null,tt:null,log:[]};
 S.kgt=BAL.kc2.st.kc.kgt[0]+R(BAL.kc2.st.kc.kgt[1])+(k==="tt"||k==="ch"?BAL.kc2.st.kc.kgtBr[0]:k==="td"?BAL.kc2.st.kc.kgtBr[1]:0);S.kap=BAL.kc2.st.kc.kap[0]+R(BAL.kc2.st.kc.kap[1]);S.khm=Math.round((KCGTU[k]||50)*1.2);S.kld=0;S.kgtu=KCGTU[k]||50;
 S.age=BAL.ageMin;S.rank=0;S.sung=0;S.danh=Math.min(S.danh,8);S.bac=Math.min(S.bac,40+Math.round(S.kgtu/2));S.staff=[];S.place="kc_khue";S.pal=null;S.tonight=null;
 if(S.maid){S.maid.kcTy=1;/* ob-phu §9 «tỳ nữ thân cận joins her staff» (law 6b, one real person): she is the girl's own maid FROM HOME, so the palace chief-maid system (jcmaid) must not label her «Nội vụ phủ cắt cử» / «tự tay chọn» nor swap her for a Nội vụ phủ pick at entry (thd/td/ch/cnv origins); loyalty built at home is kept */
  if(S.maid.src&&S.maid.src!=="home"&&S.maid.src!=="land")S.maid.src="home";for(let i=Q.length-1;i>=0;i--)if(Q[i]&&Q[i].pid==="cmPick")Q.splice(i,1);if(S.cmaid)S.cmaid.picked=1}
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
  try{if(typeof kgItem==="function")return kgItem(e)}catch(x){}const a=itemArt(e.k);return{n:itm(e.k).n,d:itm(e.k).d,img:a?a.src:"",tier:a?a.grade:0}};
 kitReward({kind:"chest",title:"Rương đồ khuê các",from:`${c.who} sửa soạn · đồ con gái mang theo người`,items:c.L.map(it)})}catch(e){console.error("kcChestShow",e)}}

/* ---------- who is where (one ledger per buổi; true info) ---------- */
const KCHAB={cha:[["kc_thu",4],["kc_sanh",2],["",3]],me:[["kc_me",4],["kc_sanh",2],["kc_vuon",2]],di:[["kc_di",4],["kc_vuon",2],["kc_sanh",1],["kc_me",1]],to:[["kc_sanh",3],["kc_tu",2],["kc_me",1]],
 huynh:[["",3],["kc_thu",2],["kc_vuon",2],["kc_sanh",1]],muoi:[["kc_di",3],["kc_hoc",2],["kc_vuon",2]]};
function kcWhere(){if(!S||!S.kc)return;const b=S.buoi||0;S.kc.at={};for(const m of S.kc.fam){if(!m.alive)continue;if(/^ban/.test(m.r)){S.kc.at[m.id]="kc_hau";continue}if(m.r==="tm"){continue}
  if(m.r==="huynh"&&S.kc.lost)continue;/* KC LORE: dtq brother lost at Nhạn Môn */
  const H=KCHAB[m.r]||[["",1]];let L=H;if(b===3&&m.r!=="huynh")L=L.filter(x=>x[0]&&x[0]!=="kc_thu"||m.r==="cha");
  if(m.r==="cha"&&b===0)L=[["",1]];/* buổi sáng cha vào triều */
  const p=kcHab(L);/* npc-purpose G2: her own day duties (habits), near-best only */
  if(p)S.kc.at[m.id]=p}
 if(S.tm96){const man=manById(S.tm96.mid);if(man&&man.alive)S.kc.at.ftm=b===3?"":kcTmWhere()}}
function kcHab(L){const x=npwPick(L,y=>y[1],{all:1});return x?x[0]:""}/* her habits are all real duties: weighted by habit, minor ones kept (place cards) */
function kcTmWhere(){const B=BAL.ag.why.kcTm,h=(S.tm96&&S.tm96.h)||0;return npwPick(["kc_chua","kc_sach","kc_tra",""],k=>k?h*B.seek:B.home)||""}/* npc-purpose G2: he goes where she might be, as much as he longs for her */
function kcHere(k){k=k||S.place;return S.kc.fam.filter(m=>m.alive&&S.kc.at[m.id]===k)}
function kcAt(m){const p=S.kc.at[m.id];return p?KCPL[p][0]:m.r==="huynh"&&S.kc.lost?"mất tin ở Nhạn Môn":"ra ngoài"}
function kcTmMan(){return S.tm96?manById(S.tm96.mid):null}
function kcVisit(k){const ppl=[];for(const m of kcHere(k)){if(/^ban/.test(m.r)&&k!=="kc_hau")continue;ppl.push({kind:"kc",fid:m.id,name:m.name,ini:(m.name||"?").split(" ").pop()[0],col:"#b08a8a",info:`${m.t} · ${netTxt(m)}`,ref:m})}
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
function kcGoWhy(k){if(k===S.place)return"Đang ở đây";if(kcCity(k)){if((S.buoi||0)===3)return"Khuê nữ không ra phố buổi tối";if(!S.maid)return"Không có tỳ nữ đi cùng";if(!can(BAL.walk.near))return"Hết khắc buổi này"}return""}
function kcGo(k){const w=kcGoWhy(k);if(w||Q.length||S.dead)return false;if(kcCity(k)||kcCity(S.place))spend(BAL.walk.near);S.place=k;S.visit=kcVisit(k);popIdx=null;popMsg="";deal();
 if(kcCity(k)&&roll(BAL.odb.jkc.rlKcGo)){S.kld+=3;log("Có kẻ nhìn ngươi lâu ở chốn đông người.")}return true}
(function(){const g0=goTo;goTo=function(k){if(!isKc())return g0.apply(this,arguments);const ok=kcGo(k);if(ok){tab="act";render()}return ok}})();

/* ---------- acts (deck cards) ---------- */
function kcOnce(k,sc){const v=S.kc.once[k];return v!=null&&(sc==="m"?v===S.turn:v===wk())}
/* J3c kc-fail-effects (laws 3 + 7 + one core): ONE source for what a home card's failure does beyond the stats in l.
   lf = [[kind,...]] (falsy entries dropped): kcCard runs it on a failure, before the card's own fail() (flavour log only),
   and prints it in the card's BẠI column through the kit card field lx (j19 cardH). Kinds: af (person's liking, kcAf: a drop
   also adds Oán), oan (person's Oán), ld (Lời đồn: a number once she has seen it, words before — fog OUTSIDE_PLAN:46),
   pow (the house's power), proof (her proofs against that person are spent), cd (the card waits BAL.eff.jkc.g7Wait months), caught (kcE). */
function kcLfRun(L){for(const e of L){const [k,m,n]=e;try{
  if(k==="af")kcAf(m,n);else if(k==="oan"){if(m)spAdd(m,"oan",n)}else if(k==="ld")S.kld=(S.kld||0)+m;else if(k==="pow")tdPowAdd(m,n);
  else if(k==="proof")S.kc.proof[m]=0;else if(k==="cd")S.kc[m]=S.turn;else if(k==="caught")pushDil(mkP("kcE",{e:"caught"}),"Bị bắt gặp")}catch(x){console.error(x)}}}
function kcLfTxt(L){const P=new Map(),T=[];const per=m=>{if(!P.has(m))P.set(m,{af:0,oan:0});return P.get(m)};
 for(const e of L){const [k,m,n]=e;if(k==="af"&&m){const r=per(m);r.af+=n;if(n<0)spAdd(r,"oan",Math.round(-n/2))}else if(k==="oan"&&m)spAdd(per(m),"oan",n)}
 for(const [m,r] of P){if(r.af)T.push(`${m.t} với ngươi ${balSg(r.af)}`);if(r.oan)T.push(`${m.t} oán ${balSg(spSee("oan",r.oan))}`)}
 for(const e of L){const [k,m,n]=e;
  if(k==="ld")T.push(S&&S.kc&&S.kc.ldSeen?`Lời đồn ${balSg(m)}`:"có lời ra tiếng vào");else if(k==="pow"){if(typeof tdHead==="function"&&tdHead(m))T.push(`Thế lực nhà ${balSg(n)}`)}
  else if(k==="proof")T.push("mất chứng cứ đã có");else if(k==="cd")T.push(`${n} tháng sau mới xin lại được`);else if(k==="caught")T.push("bị gia nhân bắt gặp")}
 return T.join(", ")}
function kcCard(o){const a=Object.assign({k:1,c:{},o:100,w:{},l:{},x:""},o);const L=(a.lf||[]).filter(Boolean);a.lf=L;
 if(L.length){const f0=a.fail;a.fail=()=>{kcLfRun(L);if(f0)return f0()};Object.defineProperty(a,"lx",{get:()=>kcLfTxt(L),enumerable:true,configurable:true})}
 return a}
function kcNeed(a,m,place){/* needs a person present / a place: locked card carries the reason in t */
 if(place&&S.place!==place){a.lock=1;a.t=`Đến ${KCPL[place][0]} trước`;return a}
 if(m&&S.kc.at[m.id]!==S.place){a.lock=1;a.t=`${m.t} không ở đây (đang ở ${kcAt(m).toLowerCase()})`;return a}return a}
function kcCards(){const X=[];if(!S||!S.kc)return X;const P=S.place;const mz=S.maid?S.maid.loyal:0;
 /* Khuê phòng */
 X.push(kcNeed(kcCard({g:"khue",n:"Nghỉ ngơi",t:"Buông rèm, ngủ một giấc trưa.",k:2,w:{suc:25},rep:1}),null,"kc_khue"));
 X.push(kcNeed(kcCard({g:"khue",n:"Đọc sách, chép kinh",t:"Chép một quyển kinh, đọc sử, đọc thơ.",k:2,c:{suc:-5},w:{tai:1,duc:1}}),null,"kc_khue"));
 X.push(kcNeed(kcCard({g:"khue",n:"Viết nhật ký giấu kín",t:"Ghi chuyện trong lòng, giấu dưới đáy rương.",k:1,o:od(BAL.kc2.kcCard.vietNhatKyGiau_od),w:{tamco:1},l:{},x:"",lf:[["ld",BAL.eff.jkc.kldNk]],fail:()=>log("Nhật ký bị gia nhân lén đọc; chuyện riêng bị đồn ra ngoài.")}),null,"kc_khue"));
 X.push(kcNeed(kcCard({g:"khue",n:"Chải chuốt, thử y phục",t:"Soi gương, thử trâm cài và áo mới.",k:1,c:{suc:-5},o:od(BAL.kc2.kcCard.chaiChuotThuY_od+S.sac/10),w:{sac:1},l:{},lf:[["ld",BAL.eff.jkc.kldCc]]}),null,"kc_khue"));
 /* Gia tộc: each member's acts carry who */
 const cha=kcR("cha"),me=kcR("me"),di=kcR("di"),to=kcR("to"),hu=kcR("huynh"),mu=kcR("muoi");
 for(const m of [cha,me,di,to].filter(Boolean)){
  X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Thỉnh an ${m.t.toLowerCase()}`,t:`Đến vấn an ${m.t.toLowerCase()} ${m.name}.`,k:1,c:{suc:-5},w:{kgt:BAL.kc2.kcCard.thinhAn_w_kgt},x:`${m.t} với ngươi ${balSg(BAL.eff.jkc.go)}`,go:()=>kcAf(m,BAL.eff.jkc.go)}),m))}
 if(cha){X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Hầu cha ở thư phòng",t:"Mài mực, pha trà, nghe cha nói chuyện triều.",k:2,c:{suc:-10},o:od(BAL.kc2.kcCard.hauChaOThu_od+S.tamco/4+cha.af/5),w:{tamco:1},l:{},x:`Phụ thân với ngươi ${balSg(BAL.eff.jkc.go_2)} · biết tin triều đình`,go:()=>{kcAf(cha,BAL.eff.jkc.go_2);kcNews()},lf:[["af",cha,BAL.eff.jkc.fail]],fail:()=>log("Ngươi lỡ lời; cha phẩy tay bảo lui.")}),cha,"kc_thu"));
  const cl0=KCCLAN[S.origin.k];if(cl0)X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Khuyên cha chọn phe",t:`Bàn với cha nên đứng về nhà nào trên triều.`,k:1,c:{suc:-10},o:od(BAL.kc2.kcCard.khuyenChaChonPhe_od+S.tai/4+cha.af/3),w:{},l:{},x:`Thế lực nhà ${balSg(BAL.eff.jkc.go_3)}`,go:()=>{try{tdPowAdd(cl0,BAL.eff.jkc.go_3)}catch(e){}S.kc.adv=(S.kc.adv||0)+1},lf:[["af",cha,BAL.eff.jkc.fail_2]]}),cha,"kc_thu"));
  if(!kcOnce("g7","m")&&S.turn-S.kc.g7>=BAL.eff.jkc.g7Wait){const pow=kcPow();X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Xin cha dâng sớ tiến cử",t:"Xin cha dâng sớ đưa ngươi vào cung sớm, không đợi kỳ tuyển.",k:2,c:{suc:-15,bac:-50},o:od(BAL.kc2.kcCard.xinChaDangSo_od+pow/2+S.danh/3),w:{},l:{},x:"vào cung sớm (Điện tuyển tháng sau)",go:()=>{S.kc.early=1;S.kc.g7=S.turn},lf:[["cd","g7",BAL.eff.jkc.g7Wait],["af",cha,BAL.eff.jkc.fail_3],KCCLAN[S.origin.k]&&["pow",KCCLAN[S.origin.k],BAL.eff.jkc.fail_4]]}),cha,"kc_thu"))}
  if(!kcOnce("tien","m"))X.push(kcNeed(kcCard({g:"fam",who:cha.id,n:"Xin cha tiền riêng",t:"Xin cha ít bạc tiêu riêng.",k:1,c:{suc:-5},o:od(BAL.kc2.kcCard.xinChaTienRieng_od+cha.af/3),w:{bac:10+Math.round(S.kgtu/5)},l:{},x:"",onceM:"tien",lf:[["af",cha,BAL.eff.jkc.fail_5]]}),cha))}
 const mom=me||di;
 if(mom)X.push(kcNeed(kcCard({g:"fam",who:mom.id,n:`Làm vừa lòng ${mom.t.toLowerCase()}`,t:`Dâng quà, hầu thuốc, cùng ${mom.t.toLowerCase()} thêu thùa.`,k:2,c:{suc:-10,bac:-10},o:od(BAL.kc2.kcCard.lamVuaLong_od+mom.af/5),w:{khm:BAL.kc2.kcCard.lamVuaLong_w_khm},l:{},x:`${mom.t} với ngươi ${balSg(BAL.eff.jkc.go_4)}`,go:()=>kcAf(mom,BAL.eff.jkc.go_4)}),mom));
 for(const m of [hu,mu].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,n:`Kết thân ${m.t.toLowerCase()}`,t:`Trò chuyện, tặng quà nhỏ cho ${m.name}.`,k:2,c:{suc:-5,bac:-5},o:od(BAL.kc2.kcCard.ketThan_od+m.af/4),w:{},l:{},x:`${m.t} với ngươi ${balSg(BAL.eff.jkc.go_5)}`,go:()=>{kcAf(m,BAL.eff.jkc.go_5);m.me+=BAL.eff.jkc.meGo},lf:[["af",m,BAL.eff.jkc.fail_6]]}),m));
 if(mu)X.push(kcNeed(kcCard({g:"fam",who:mu.id,n:"Ngáng chân thứ muội",t:"Đổi hộp phấn, giấu thiệp mời hội thơ của nàng.",k:2,c:{suc:-10,bac:-5},o:od(BAL.kc2.kcCard.ngangChanThuMuoi_od+S.tamco/3),w:{},l:{duc:-5,kgt:BAL.kc2.kcCard.ngangChanThuMuoi_l_kgt},x:`thứ muội: Sắc của nàng -${BAL.entry.phuc.foul.sac} · Danh của nàng -${BAL.entry.phuc.foul.danh} (kỳ tuyển tú)`,go:()=>{kcFoulOn(mu);spAdd(mu,"oan",BAL.eff.jkc.oanGo)},lf:[["oan",mu,BAL.eff.jkc.oanFail],["af",mu,BAL.eff.jkc.fail_7],to&&["af",to,BAL.eff.jkc.fail_8]],fail:()=>{log("Chuyện vỡ lở; tổ mẫu nhìn ngươi bằng ánh mắt khác.")}}),mu));
 if(di)X.push(kcNeed(kcCard({g:"fam",who:di.id,n:`Dò la viện ${di.t.toLowerCase()}`,t:`Rình xem ${di.t.toLowerCase()} bàn tính gì.`,k:2,c:{suc:-10,bac:-5},o:od(BAL.kc2.kcCard.doLaVien_od+S.tamco/3+mz/10),w:{},l:{},x:"có chứng cứ mưu tính của nàng",go:()=>{S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+1},lf:[["ld",BAL.eff.jkc.kldDl],["af",di,BAL.eff.jkc.fail_9]],fail:()=>{log(`Bị ${di.t.toLowerCase()} bắt gặp.`)}}),null,"kc_di"));
 if(to&&di&&(S.kc.proof[di.id]||0)>0)X.push(kcNeed(kcCard({g:"fam",who:to.id,n:`Tố ${di.t.toLowerCase()} trước tổ mẫu`,t:`Đem chứng cứ trình tổ mẫu.`,k:2,c:{suc:-15},o:od(BAL.kc2.kcCard.toTruocToMau_od+S.kc.proof[di.id]*12+to.af/5),w:{kgt:BAL.kc2.kcCard.toTruocToMau_w_kgt},l:{duc:-3},x:`${di.t} bị tổ mẫu răn dạy, thôi hại ngươi một thời gian`,go:()=>{S.kc.proof[di.id]=0;spAdd(di,"oan",BAL.eff.jkc.oanGo_2);S.kc.diBan=S.turn+4;kcAf(to,BAL.eff.jkc.go_6)},lf:[["oan",di,BAL.eff.jkc.oanFail_2],["proof",di.id]]}),to));
 if(cha||mom)X.push(kcNeed(kcCard({g:"fam",n:"Quản việc nhà",t:"Giữ sổ chi tiêu, sai bảo gia nhân.",k:3,c:{suc:-15},o:od(BAL.kc2.kcCard.quanViecNha_od+S.tamco/3),w:{tamco:2,kgt:BAL.kc2.kcCard.quanViecNha_w_kgt},l:{kgt:BAL.kc2.kcCard.quanViecNha_l_kgt},x:"Gia tư +2",go:()=>{S.kgtu=Math.min(100,S.kgtu+2)}}),null,"kc_sanh"));
 /* Giao du */
 X.push(kcNeed(kcCard({inner:1,g:"soc",n:"Đi lễ chùa",t:"Dâng hương, cầu phúc, nghe giảng kinh.",k:3,c:{suc:-15,bac:-3},w:{duc:2,danh:1},go:()=>kcChance("chua")}),null,"kc_chua"));
 X.push(kcNeed(kcCard({g:"soc",n:"Dạo phố chợ",t:"Xem lụa, mua phấn, nghe người qua lại.",k:2,c:{suc:-10,bac:-10},o:od(BAL.kc2.kcCard.daoPhoCho_od),w:{sac:1},l:{},x:"nghe một lời đồn trong kinh",go:()=>kcNews()}),null,"kc_cho"));
 X.push(kcNeed(kcCard({g:"soc",n:"Nghe chuyện ở trà lâu",t:"Giả trang ngồi nhã gian, nghe khách bàn chuyện cung đình.",k:2,c:{suc:-10,bac:-5},o:od(BAL.kc2.kcCard.ngheChuyenOTra_od+S.tamco/3),w:{},l:{kgt:BAL.kc2.kcCard.ngheChuyenOTra_l_kgt},x:"biết rõ một phi tần trong cung",go:()=>kcIntel(1,3),lf:[["ld",BAL.eff.jkc.kldTl]],fail:()=>log("Có người nhận ra ngươi dưới lớp áo nam.")}),null,"kc_tra"));
 X.push(kcNeed(kcCard({inner:1,g:"soc",n:"Lựa sách ở thư phường",t:"Chọn sách, đọc thơ mới chép.",k:2,c:{suc:-10,bac:-5},w:{tai:2},go:()=>kcChance("sach")}),null,"kc_sach"));
 for(const f of S.kc.fam.filter(m=>m.alive&&/^ban/.test(m.r)))X.push(kcNeed(kcCard({g:"soc",who:f.id,n:`Thăm ${f.name}`,t:`Sang phủ thế giao, cùng ${f.name} thêu thùa, bàn chuyện tuyển tú.`,k:2,c:{suc:-10,bac:-5},o:od(BAL.kc2.kcCard.tham_od+f.af/4),w:{},l:{},x:`${f.name} với ngươi ${balSg(BAL.eff.jkc.go_7)} · có khi nghe tin trong cung`,go:()=>{kcAf(f,BAL.eff.jkc.go_7);f.me+=BAL.eff.jkc.meGo_2;if(roll(BAL.odb.jkc.rlGo))kcIntel(1,2)}}),null,"kc_hau"));
 if(S.kc.suit.length){const s=S.kc.suit[0];
  X.push(kcNeed(kcCard({g:"soc",n:`Khéo từ chối nhà ${s.n}`,t:`Nhờ mẹ nói khéo, giữ thể diện cho nhà ${s.n}.`,k:1,c:{suc:-10},o:od(BAL.kc2.kcCard.kheoTuChoiNha_od+S.tamco/3+S.danh/4),w:{kap:BAL.kc2.kcCard.kheoTuChoiNha_w_kap},l:{kgt:BAL.kc2.kcCard.kheoTuChoiNha_l_kgt},x:"bỏ mối này",go:()=>{S.kc.suit.shift()}}),null,"kc_sanh"));
  X.push(kcCard({g:"soc",n:"Giả bệnh tránh xem mặt",t:"Nằm liệt giường, sai tỳ nữ sắc thuốc.",k:4,c:{bac:-5},o:od(BAL.kc2.kcCard.giaBenhTranhXem_od+S.tamco/3),w:{kap:BAL.kc2.kcCard.giaBenhTranhXem_w_kap},l:{duc:-3},x:"bỏ mối này",go:()=>{S.kc.suit.shift()},lf:[cha&&["af",cha,BAL.eff.jkc.fail_10]]}))}
 const tm=kcTmMan();if(tm&&tm.alive&&S.tm96){const night=(S.buoi||0)===3;const here=S.kc.at.ftm===P;
  X.push(kcCard({g:"soc",who:"ftm",n:`Gặp riêng ${tm.name}`,t:here?`Chàng đang ở ${KCPL[P][0].toLowerCase()}.`:night&&P==="kc_vuon"?"Hẹn chàng trèo tường vào hoa viên.":`Chỉ gặp được khi chàng ở cùng nơi, hoặc đêm ở hoa viên nhà`,lock:!(here||night&&P==="kc_vuon"),k:2,c:{suc:-10},o:od((here&&P==="kc_chua"?55:30)+S.tamco/4+mz/5),w:{},l:{},x:"tình ý của ta với chàng +8 · tình ý của chàng +6",go:()=>{S.tm96.h=Math.min(100,S.tm96.h+8);tm.tinh=(tm.tinh||0)+6;S.kld+=3;S.kc.met=(S.kc.met||0)+1},lf:[["ld",BAL.eff.jkc.kldGr],["caught"]]}));
  X.push(kcCard({g:"soc",who:"ftm",n:"Gửi thư cho người ấy",t:`Nhờ ${S.maid?S.maid.name:"tỳ nữ"} đưa thư.`,k:1,c:{bac:-2},o:od(BAL.kc2.kcCard.guiThuChoNguoi_od+mz/2),w:{},l:{},x:"tình ý của ta với chàng +5",go:()=>{S.tm96.h=Math.min(100,S.tm96.h+5);tm.letters=(tm.letters||0)+1},lf:[["ld",BAL.eff.jkc.kldThu]],fail:()=>log("Thư lạc vào tay gia nhân.")}))}
 /* Tài nghệ (the lessons themselves are the Tài nghệ panel of the base game: real minigames) */
 X.push(kcNeed(kcCard({g:"art",n:"Học lễ nghi cung đình",t:"Một ma ma xuất cung dạy cách đi đứng, quỳ lạy, đối đáp trong cung.",k:3,c:{suc:-15,bac:-12},inner:1,lock:S.kc.le>=BAL.kc3.thay.leMax,w:{duc:1},x:`Lễ nghi +1 (nay ${kitNeed(S.kc.le,BAL.kc3.thay.leMax)}, cộng vào Phúc tuyển) · biết thêm chuyện trong cung`,go:()=>{S.kc.le++;if(roll(BAL.odb.jkc.rlGo_2))kcIntel(1,2)}}),null,"kc_hoc"));
 if(!S.kc.ds)X.push(kcCard({g:"art",n:"Mời danh sư",t:"Mời thầy giỏi nhất kinh thành về dạy.",k:1,c:{bac:-60},o:od(BAL.kc2.kcCard.moiDanhSu_od+S.kgt/2),w:{},l:{},x:"từ nay học tiến bộ nhanh gấp rưỡi",go:()=>{S.kc.ds=1}}));
 /* Thư từ */
 const ct=kcContact();X.push(kcCard({g:"mail",onceM:"thu",n:"Viết thư vào cung",t:ct?`Gửi thư cho ${ct}.`:"Không có người quen trong cung: thư gửi qua người lạ.",k:1,c:{bac:-3},o:od(ct?75:35),w:{},l:{},x:"biết rõ một phi tần",go:()=>kcIntel(1,3),lf:[["ld",BAL.eff.jkc.kldTc]],fail:()=>log("Thư bị chặn ở cửa cung.")}));
 X.push(kcNeed(kcCard({g:"mail",onceM:"mua",n:"Mua tin của thái giám ra cung",t:"Dúi bạc cho tiểu thái giám đi chợ mua sắm.",k:2,c:{suc:-10},o:od(BAL.kc2.kcCard.muaTinCuaThai_od),w:{bac:-25},l:{}/* bạc only when he brings the news */,x:"biết rõ hai phi tần",go:()=>kcIntel(2,3)}),null,"kc_cho"));
 const gv=liveRivals(true).filter(v=>!(S.kc.gift||[]).includes(v.id)).sort((a,b)=>b.rank-a.rank)[0];
 if(gv)X.push(kcCard({g:"mail",n:`Gửi quà vào cung cho ${gv.name}`,t:`Nhờ người nhà gửi lễ vật cho ${rkName(gv)} ${gv.name}.`,k:1,c:{bac:-30},o:od(BAL.kc2.kcCard.guiQuaVaoCung_od),w:{},l:{},x:`${gv.name} với ngươi ${balSg(BAL.eff.jkc.go_8)} (vào cung còn nhớ)`,go:()=>{S.kc.gift=(S.kc.gift||[]).concat([gv.id]);try{affAdd(gv,S,BAL.eff.jkc.go_8)}catch(e){}kcIntel1(gv,2)}}));
 /* r2 · the non-bạc road of every bạc purchase (owner 15/11 20:30Z): same gain, a price of equal weight paid in Sức, khắc or a family favour */
 if(to&&!S.kc.ds)X.push(kcNeed(kcCard({g:"art",who:to.id,n:"Xin tổ mẫu mời danh sư",t:"Xin tổ mẫu bỏ của riêng mời thầy giỏi về dạy.",k:2,c:{suc:-10},o:od(BAL.kc2.kcCard.xinToMauMoi_od+to.af/2),w:{},l:{},x:`từ nay học tiến bộ nhanh gấp rưỡi · kèm: tổ mẫu với ngươi ${balSg(BAL.eff.jkc.go_9)}`,go:()=>{S.kc.ds=1;kcAf(to,BAL.eff.jkc.go_9)},lf:[["af",to,BAL.eff.jkc.fail_11]]}),to));
 X.push(kcNeed(kcCard({g:"art",n:"Tự học lễ nghi theo sách",t:"Chép Nữ tắc, tập đi đứng, quỳ lạy trước gương.",k:4,c:{suc:-25},lock:S.kc.le>=BAL.kc3.thay.leMax,w:{duc:1},x:`Lễ nghi +1 (nay ${kitNeed(S.kc.le,BAL.kc3.thay.leMax)}, cộng vào Phúc tuyển)`,go:()=>{S.kc.le++}}),null,"kc_khue"));
 if(hu&&!kcOnce("mua","m"))X.push(kcNeed(kcCard({g:"mail",who:hu.id,onceM:"mua",n:"Nhờ huynh trưởng dò tin trong cung",t:"Huynh trưởng quen thị vệ canh cửa cung.",k:2,c:{suc:-10},o:od(BAL.kc2.kcCard.nhoHuynhTruongDo_od+hu.af/4),w:{},l:{},x:`biết rõ hai phi tần · kèm: huynh trưởng với ngươi ${balSg(BAL.eff.jkc.go_10)}`,go:()=>{kcIntel(2,3);kcAf(hu,BAL.eff.jkc.go_10)},lf:[["af",hu,BAL.eff.jkc.fail_12]]}),hu));
 if(gv)X.push(kcCard({g:"mail",n:`Gửi bức thêu tự tay làm cho ${gv.name}`,t:`Thêu một bức hoa điểu, nhờ người nhà gửi vào cung cho ${rkName(gv)} ${gv.name}.`,k:3,c:{suc:-30},o:od(BAL.kc2.kcCard.guiBucTheuTu_od),w:{},l:{},x:`${gv.name} với ngươi ${balSg(BAL.eff.jkc.go_11)} (vào cung còn nhớ)`,go:()=>{S.kc.gift=(S.kc.gift||[]).concat([gv.id]);try{affAdd(gv,S,BAL.eff.jkc.go_11)}catch(e){}kcIntel1(gv,2)}}));
 if(cha&&to&&!kcOnce("g7","m")&&S.turn-S.kc.g7>=BAL.eff.jkc.g7Wait){const pow=kcPow();X.push(kcNeed(kcCard({g:"fam",who:to.id,n:"Nhờ tổ mẫu khuyên cha dâng sớ",t:"Xin tổ mẫu nói với cha dâng sớ đưa ngươi vào cung sớm.",k:2,c:{suc:-15},o:od(BAL.kc2.kcCard.nhoToMauKhuyen_od+pow/2+S.danh/3),w:{},l:{},x:`vào cung sớm (Điện tuyển tháng sau) · kèm: tổ mẫu với ngươi ${balSg(BAL.eff.jkc.go_12)}`,go:()=>{S.kc.early=1;S.kc.g7=S.turn;kcAf(to,BAL.eff.jkc.go_12)},lf:[["cd","g7",BAL.eff.jkc.g7Wait],["af",to,BAL.eff.jkc.fail_13]]}),to))}
 /* r2-r1 · the small place-act prices too (coordinator 15/11, owner rule 20:30Z): each 2–10 bạc act has a twin with the same gain, paid in
    Sức + one more khắc, or in tỳ nữ thiện cảm (maid.loyal) (bạc -5 ≈ Sức -5 and one khắc ≈ tỳ nữ Lòng -5; home income ≈ 9–20 bạc a month, Sức ≈ 14 a week) */
 {const mzL=n=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal-n,0,100)};
  if(mom)X.push(kcNeed(kcCard({g:"fam",who:mom.id,tw:`Làm vừa lòng ${mom.t.toLowerCase()}`,n:`Hầu ${mom.t.toLowerCase()} trọn buổi`,t:`Không quà cáp: ngồi hầu thuốc, đấm lưng, thêu cùng ${mom.t.toLowerCase()} cả buổi.`,k:3,c:{suc:-20},o:od(BAL.kc2.kcCard.hauTronBuoi_od+mom.af/5),w:{khm:BAL.kc2.kcCard.hauTronBuoi_w_khm},l:{},x:`${mom.t} với ngươi ${balSg(BAL.eff.jkc.go_13)}`,go:()=>kcAf(mom,BAL.eff.jkc.go_13)}),mom));
  for(const m of [hu,mu].filter(Boolean))X.push(kcNeed(kcCard({g:"fam",who:m.id,tw:`Kết thân ${m.t.toLowerCase()}`,n:`Giúp ${m.t.toLowerCase()} một việc`,t:`Chép sách, khâu áo giúp ${m.name}, không tặng quà.`,k:3,c:{suc:-10},o:od(BAL.kc2.kcCard.giupMotViec_od+m.af/4),w:{},l:{},x:`${m.t} với ngươi ${balSg(BAL.eff.jkc.go_14)}`,go:()=>{kcAf(m,BAL.eff.jkc.go_14);m.me+=BAL.eff.jkc.meGo_3},lf:[["af",m,BAL.eff.jkc.fail_14]]}),m));
  if(mu&&S.maid)X.push(kcNeed(kcCard({g:"fam",who:mu.id,tw:"Ngáng chân thứ muội",n:"Sai tỳ nữ ngáng chân thứ muội",t:`${S.maid.name} lén đổi hộp phấn, giấu thiệp mời hội thơ của nàng; không phải mua chuộc ai.`,k:2,c:{suc:-10},o:od(BAL.kc2.kcCard.saiTyNuNgang_od+S.tamco/3),w:{},l:{duc:-5,kgt:BAL.kc2.kcCard.saiTyNuNgang_l_kgt},x:`thứ muội: Sắc của nàng -${BAL.entry.phuc.foul.sac} · Danh của nàng -${BAL.entry.phuc.foul.danh} (kỳ tuyển tú) · kèm: ${S.maid.name} thiện cảm ${balSg(spSee("rel",-BAL.eff.jkc.mzL))}`,go:()=>{mzL(BAL.eff.jkc.mzL);kcFoulOn(mu);spAdd(mu,"oan",BAL.eff.jkc.oanGo_3)},lf:[["oan",mu,BAL.eff.jkc.oanFail_3],["af",mu,BAL.eff.jkc.fail_15],to&&["af",to,BAL.eff.jkc.fail_16]],fail:()=>{mzL(BAL.eff.jkc.mzL);log("Chuyện vỡ lở; tổ mẫu nhìn ngươi bằng ánh mắt khác.")}}),mu));
  if(di)X.push(kcNeed(kcCard(S.maid?{g:"fam",who:di.id,tw:`Dò la viện ${di.t.toLowerCase()}`,n:`Sai tỳ nữ nghe ngóng viện ${di.t.toLowerCase()}`,t:`${S.maid.name} làm quen a hoàn bên ấy, nghe xem ${di.t.toLowerCase()} bàn tính gì.`,k:2,c:{suc:-10},o:od(BAL.kc2.kcCard.kcCards_od+S.tamco/3+mz/10),w:{},l:{},x:`có chứng cứ mưu tính của nàng · kèm: ${S.maid.name} thiện cảm ${balSg(spSee("rel",-BAL.eff.jkc.mzL))}`,go:()=>{mzL(BAL.eff.jkc.mzL);S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+1},lf:[["ld",BAL.eff.jkc.kldDl],["af",di,BAL.eff.jkc.fail_17]],fail:()=>{mzL(BAL.eff.jkc.mzL);log(`${S.maid.name} bị ${di.t.toLowerCase()} bắt gặp.`)}}
   :{g:"fam",who:di.id,tw:`Dò la viện ${di.t.toLowerCase()}`,n:`Rình viện ${di.t.toLowerCase()} cả đêm`,t:`Không đút lót gia nhân: tự nấp ngoài song cửa, đợi ${di.t.toLowerCase()} bàn chuyện.`,k:3,c:{suc:-15},o:od(BAL.kc2.kcCard.kcCards_od_2+S.tamco/3),w:{},l:{},x:"có chứng cứ mưu tính của nàng",go:()=>{S.kc.proof[di.id]=(S.kc.proof[di.id]||0)+1},lf:[["ld",BAL.eff.jkc.kldDl],["af",di,BAL.eff.jkc.fail_18]],fail:()=>{log(`Bị ${di.t.toLowerCase()} bắt gặp.`)}}),null,"kc_di"));
  X.push(kcNeed(kcCard({inner:1,g:"soc",tw:"Đi lễ chùa",n:"Lên chùa chép kinh",t:"Không dâng lễ: quét sân, chép kinh giúp nhà chùa, nghe giảng kinh.",k:4,c:{suc:-20},w:{duc:2,danh:1},go:()=>kcChance("chua")}),null,"kc_chua"));
  X.push(kcNeed(kcCard({g:"soc",tw:"Dạo phố chợ",n:"Đi xem chợ, không mua",t:"Đi bộ khắp phố, xem người ta phối lụa, tô phấn, nghe người qua lại.",k:3,c:{suc:-20},o:od(BAL.kc2.kcCard.diXemChoKhong_od),w:{sac:1},l:{},x:"nghe một lời đồn trong kinh",go:()=>kcNews()}),null,"kc_cho"));
  X.push(kcNeed(kcCard({g:"soc",tw:"Nghe chuyện ở trà lâu",n:"Nghe lỏm ngoài hiên trà lâu",t:"Không thuê nhã gian: giả trang đứng ngoài hiên nghe khách bàn chuyện cung đình; dễ bị nhận ra hơn.",k:2,c:{suc:-15},o:od(BAL.kc2.kcCard.ngheLomNgoaiHien_od+S.tamco/3),w:{},l:{kgt:BAL.kc2.kcCard.ngheLomNgoaiHien_l_kgt},x:"biết rõ một phi tần trong cung",go:()=>kcIntel(1,3),lf:[["ld",BAL.eff.jkc.kldTl]],fail:()=>log("Có người nhận ra ngươi dưới lớp áo nam.")}),null,"kc_tra"));
  X.push(kcNeed(kcCard({inner:1,g:"soc",tw:"Lựa sách ở thư phường",n:"Đứng đọc ở thư phường",t:"Không mua: đứng đọc, chép lại thơ mới cả buổi.",k:3,c:{suc:-15},w:{tai:2},go:()=>kcChance("sach")}),null,"kc_sach"));
  for(const f of S.kc.fam.filter(m=>m.alive&&/^ban/.test(m.r)))X.push(kcNeed(kcCard({g:"soc",who:f.id,tw:`Thăm ${f.name}`,n:`Mang bánh nhà làm thăm ${f.name}`,t:`Tự tay làm bánh, đi bộ sang phủ thế giao, cùng ${f.name} thêu thùa, bàn chuyện tuyển tú.`,k:3,c:{suc:-15},o:od(BAL.kc2.kcCard.mangBanhNhaLam_od+f.af/4),w:{},l:{},x:`${f.name} với ngươi ${balSg(BAL.eff.jkc.go_15)} · có khi nghe tin trong cung`,go:()=>{kcAf(f,BAL.eff.jkc.go_15);f.me+=BAL.eff.jkc.meGo_4;if(roll(BAL.odb.jkc.rlGo_3))kcIntel(1,2)}}),null,"kc_hau"));
  if(S.kc.suit.length)X.push(kcCard({g:"soc",tw:"Giả bệnh tránh xem mặt",n:"Nhịn ăn tránh xem mặt",t:"Nhịn ăn mấy bữa cho mặt xanh xao, không cần thuốc thang, ai nhìn cũng tin là bệnh.",k:4,c:{suc:-15},o:od(BAL.kc2.kcCard.nhinAnTranhXem_od+S.tamco/3),w:{kap:BAL.kc2.kcCard.nhinAnTranhXem_w_kap},l:{duc:-3},x:"bỏ mối này",go:()=>{S.kc.suit.shift()},lf:[cha&&["af",cha,BAL.eff.jkc.fail_19]]}));
  const tm2=kcTmMan();if(tm2&&tm2.alive&&S.tm96)X.push(kcCard({g:"soc",who:"ftm",tw:"Gửi thư cho người ấy",n:"Tự tay đưa thư cho người ấy",t:"Lén ra cổng sau, tự tay đưa thư; không nhờ ai, dễ bị bắt gặp hơn.",k:2,c:{suc:-5},o:od(BAL.kc2.kcCard.tuTayDuaThu_od+S.tamco/2),w:{},l:{},x:"tình ý của ta với chàng +5",go:()=>{S.tm96.h=Math.min(100,S.tm96.h+5);tm2.letters=(tm2.letters||0)+1},lf:[["ld",BAL.eff.jkc.kldThu]],fail:()=>log("Thư lạc vào tay gia nhân.")}));
  X.push(kcCard({g:"mail",onceM:"thu",tw:"Viết thư vào cung",n:"Gửi thư theo người đi chợ",t:ct?`Không thuê người đưa: nhờ gia nhân đi chợ mang thư đến cửa cung, gửi cho ${ct}; chậm, dễ thất lạc.`:"Không thuê người đưa, không quen ai trong cung: thư gửi qua người lạ, dễ thất lạc.",k:2,c:{suc:-5},o:od(ct?65:30),w:{},l:{},x:"biết rõ một phi tần",go:()=>kcIntel(1,3),lf:[["ld",BAL.eff.jkc.kldTc]],fail:()=>log("Thư bị chặn ở cửa cung.")}));
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
 if(got.length)log(`Ngươi biết thêm về ${got.map(v=>`${rkName(v)} ${v.name} (tính ${netTxt(v)}${v.preg?", đang mang thai":""}, sủng ${v.sung>=BAL.sungLv.kc[1]?"rất cao":v.sung>=BAL.sungLv.kc[0]?"khá":"ít"})`).join("; ")}.`);else log("Không có tin gì mới.")}
function kcNews(){try{const T=trS();const n=T&&T.news&&T.news[0];if(n){log(`Tin triều: ${String(n.h).replace(/<[^>]+>/g,"")}`);return}}catch(e){}const v=npwPick(liveRivals(true),x=>1+Math.max(0,x.sung||0));/* npc-purpose G2: talk is about the most favoured */if(v)log(`Người ta đồn ${rkName(v)} ${v.name} ${v.sung>=50?"đang được sủng":"ít được gọi thị tẩm"}.`)}
function kcChance(where){const tm=kcTmMan();if(tm&&tm.alive&&S.tm96&&!S.kc.ev.meet&&npcWhy("kcMeet",{tm},()=>roll(BAL.odb.jkc.rlKcMeet))){S.kc.ev.meet=1;pushDil(mkP("kcE",{e:"meet"}),"Gặp lại người xưa");return}
 if(where==="chua"&&!S.kc.ev.vh&&S.year>=2&&S.sac>=70&&npcWhy("kcVh",{},()=>roll(BAL.odb.jkc.rlKcVh))){S.kc.ev.vh=1;pushDil(mkP("kcE",{e:"vihanh"}),"Khách lạ ở chùa")}}

/* ---------- the week, the month ---------- */
(function(){const n0=nextBuoi;nextBuoi=function(){if(!isKc())return n0.apply(this,arguments);const b0=S.buoi;const r=n0.apply(this,arguments);if(isKc()&&!S.dead&&S.buoi!==b0&&(S.buoi||0)>0){kcWhere();if(S.buoi===3&&kcCity(S.place)){S.place="kc_khue"}S.visit=kcVisit(S.place);deal();render()}return r}})();
(function(){const e0=endTurn;endTurn=function(){if(isKc())return kcCoopOn()&&typeof COOPW.weekEnd==="function"?COOPW.weekEnd.apply(this,arguments):kcEndTurn();return e0.apply(this,arguments)}})();
/* co-op: the room's week path (COOPW.weekEnd = jcoopworld endTurn: wait, friend out, send the week; the palace-only wrappers made after it
   (jtsb, jts …) are skipped as in single-player) runs her home week instead of the palace one */
try{if(window.COOPW)COOPW.altTurn=()=>isKc()?kcEndTurn:null}catch(e){}
function kcEndTurn(){if(S.dead||Q.length||S.mg)return;S.buoi=0;let ev="";
 ev+=kcW(()=>resolveTonight()||"");ev+=kcW(()=>rivalsTurn()||"");if(S.dead)return;
 S.suc=cl(S.suc+14+(S.suc<30?6:0),0,sucCap(S));try{kcWeek()}catch(e){console.error(e)}if(S.dead)return;
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
 const mal=m=>m?(tv({"Xảo quyệt":3,"Tham vọng":2,"Kiêu ngạo":1.4,"Kín đáo":1,"Khiêm nhường":.4,"Ân cần":.2},m)||1)*(1+(m.oan||0)/40)*(m.af<10?1.4:.7)*BAL.kcSch/100:0;/* BAL.kcSch: difficulty scales the home schemes (jdiff) */
 if(di&&!(S.kc.diBan>S.turn)){add("phan",mal(di)*1.2);add("doc",S.turn>=6&&!S.kc.ev.doc&&di.oan+(30-di.af)>40?mal(di)*.5:0);add("trom",mal(di));add("tudg",S.year>=2?mal(di)*.6:0)}
 if(mu){add("ao",mal(mu));add("tranhmoi",S.kc.suit.length?mal(mu):0)}
 if(cha)add("say",.8);if(hu)add("bac",nv(hu,"kcBac"));if(to)add("tobenh",S.kc.ev.tobenh?0:.4);
 if(di&&di.r==="di"&&!S.kc.ev.dithai)add("dithai",.35);
 add("thuc",S.kc.intel.length<liveRivals(true).length?.35:.1);add("tho",S.month>=2&&S.month<=4?1.2:.4);add("hoa",S.month>=4&&S.month<=6?1:.3);
 if(S.month===1&&S.tuan<=1)add("thuongnguyen",3);if(S.month===7&&S.tuan<=1)add("thattich",3);if(S.month===9&&S.tuan===2)add("trungduong",2);
 if(S.tm96&&kcTmMan()){add("tmrise",S.kc.ev.tmrise?0:.5);add("tmcam",S.kc.ev.tmcam||S.tm96.h<70?0:.6);add("tmtron",S.kc.ev.tmtron||S.tm96.h<85||S.year<2?0:.8)}
 if(!S.kc.ev.dich&&S.year>=2&&roll(KC.ill))add("dich",6);
 add("theu",.5);add("gianhan",.4);
 const o=npcWhy("kcWeek",{E},()=>roll(KC.ev));if(!o)return;/* npc-purpose G2: the strongest motive in the house acts (KC.ev = it comes to a head this week) */const e=o.who.e;const d=mkP("kcE",{e});if(d)pushDil(d,KCE[e].t)}
function kcMonth(){S.turn++;const k=S.origin.k;
 apply({bac:5+Math.round(S.kgtu/6)});
 if(!S.kc.ev.chieu||S.kc.mien)S.kap+=Math.round((KC.apM+(S.age>=19?1:0)+(S.kgtu<BAL.kc2.st.kc.gtuPoor?1:0)+(S.kc.suit.length?1:0))*BAL.kcMatch/100);/* registered for tuyển tú: no match may be made */S.kld=Math.max(0,S.kld-BAL.kcRumFade);
 for(const m of S.kc.fam){if(!m.alive)continue;m.oan=Math.max(0,(m.oan||0)-BAL.eff.jkc.oanKcMonth);if(/^ban|muoi/.test(m.r)){m.tai=Math.min(95,(m.tai||40)+R(2));m.sac=m.sac||50}}
 /* the palace runs on: same monthly world calls as the servant road (j42), with her outside */
 kcW(()=>{for(const v of liveRivals(true))stipend(v);rivalsMonth();servRanks();servMonth();oanMonth();restock();heirMonth();moodMonth();try{tdMonth()}catch(e){}return""});if(S.dead)return;
 /* suitors and the forced match */
 if(S.kc.ev.chieu&&!S.kc.mien){}
 else if(S.kap>=BAL.kc2.st.kc.moi&&S.kc.suit.length<2&&(kcSO=npcWhy("kcSuit",{},()=>roll(BAL.kc2.kcCard.kcMonth_rb+S.kap/3)))){const s=kcSuitor(kcSO.who.x);S.kc.suit.push(s);pushDil(mkP("kcE",{e:"moi"}),"Bà mối đến nhà")}
 else if(S.kap>=BAL.kc2.st.kc.dinh&&S.kc.suit.length&&!S.kc.forced){S.kc.forced=1;pushDil(mkP("kcE",{e:"dinhhon"}),"Cha định hôn")}
 /* chapters: the origin chapter (3 beats), on a fixed calendar */
 const beat={4:0,10:1,16:2}[S.turn];if(beat!=null&&!S.dead)pushDil(mkP("kcE",{e:"o"+beat}),KCO[k]?KCO[k].t:"Chuyện nhà");
 if(S.year===KC.ty-1&&S.month===8&&!S.kc.ev.chieu){S.kc.ev.chieu=1;pushDil(mkP("kcE",{e:"chieu"}),"Chiếu tuyển tú")}
 if(S.kc.early&&!S.kc.tt){S.kc.early=0;kcTuyen(true)}
 if(S.year===KC.ty&&S.month===KC.tm-1&&S.tuan===2&&!S.kc.so)kcSoTuyen();
 S.month++;S.tuan=0;if(S.month>12){S.month=1;S.year++;S.age++;try{S.emp.age++;ageYear()}catch(e){}try{allKids().forEach(([kk])=>{if(kk.alive)kk.age++})}catch(e){}for(const m of S.kc.fam)m.age++}
 if(isKc()&&S.year===KC.ty&&S.month===KC.tm-1&&!S.kc.so)kcSoTuyen();
 if(typeof kietDue==="function")kietDue();if(S.suc<=0&&isKc()&&!(typeof kietSave==="function"&&kietSave()))kcDie("Lao lực mà chết trước kỳ tuyển tú")}
const KCSUIT=[["Thế tử hầu phủ","hau",80],["con trai Thượng thư bộ Hộ","quan",65],["Thám hoa khoa này","than",55],["đại thương Giang Nam","thuong",45],["lão Thị lang góa vợ","lao",30]];let kcSO=null;
function kcSuitReach(x){return x[2]<=S.kgt+BAL.ag.why.kcSuit.reach}
/* npc-purpose G2: the house that seeks her = the highest one her standing reaches (its own ambition), not a die */
function kcSuitor(s){const L=KCSUIT;if(!s){const f=L.filter(kcSuitReach);s=npwPick(f.length?f:L.slice(-2),x=>x[2])||L[L.length-1]}return{n:s[0],k:s[1],q:s[2]}}

/* ---------- events (PEND; options show only costs; results show the numbers) ---------- */
function kcO(n,cost,go,more){const c=cost||{};const s=fmt(c);/* r2: go is wrapped so the kit's source reader (j79 kitBranchFx) never shows an outcome
   branch hidden in the closure as a sure "Tốn"; the real cost is fx, the outcome is told by the option's own hint (KCH) */
 const g=function(){return go.apply(this,arguments)};return Object.assign({n,fx:c,x:"",j67:s?"tốn: "+s:"tốn: không",go:g},more||{})}
function kcRes(t,b,txt){if(txt)log(txt);kcFix();try{resultShow(t,b,true)}catch(e){}}
function kcDo(t,f){const b=rsnap();const r=f();kcRes(t,b,r)}
const KCO={tt:{t:"Quân cờ đầu tiên"},dtq:{t:"Tin dữ Nhạn Môn"},muoi:{t:"Sổ muối"},thd:{t:"Tài nữ kinh thành"},ch:{t:"Thư của cô mẫu"},td:{t:"Án đang dựng"}};
const KCE={
 doc:{t:"Chén canh lạ",b:()=>{const d=kcR("di");S.kc.ev.doc=1;const pR=nv(d,"kcReal"),real=roll(pR);const mz=S.maid?S.maid.name:"tỳ nữ";return{who:kcFace(d),t:`<p>Đêm khuya, người của ${d.t.toLowerCase()} mang sang một chén canh sâm, nói ${d.t.toLowerCase()} thương ngươi học khuya. ${mz} đứng sau lưng, khẽ lắc đầu.</p>`,o:[
  ((rp)=>kitRiskOpt(kcO("Lấy trâm bạc thử",{},()=>kcDo("Chén canh lạ",()=>{if(real&&roll(rp())){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+2;spAdd(d,"oan",BAL.eff.jkc.oanO);return"Trâm bạc đen lại. Ngươi giữ chén canh làm chứng."}return"Trâm bạc không đổi màu. Ngươi vẫn đổ chén canh đi."})),()=>rp()))(()=>BAL.odb.jkc.rlO),
  kcO("Đổ đi, cảm ơn qua loa",{},()=>kcDo("Chén canh lạ",()=>{kcAf(d,BAL.eff.jkc.o);return"Ngươi đổ canh vào chậu hoa. Mấy hôm sau cây hoa héo."})),
  kitRiskOpt(kcO("Uống, không muốn mất lòng",{},()=>{if(real){if(roll(BAL.odb.jkc.rlO_2)){kcDie("Trúng độc chén canh sâm của "+d.t.toLowerCase());return}kcDo("Chén canh lạ",()=>{apply({suc:-40,sac:-5});return"Ngươi đau quặn cả đêm, thầy thuốc cứu kịp."});return}kcDo("Chén canh lạ",()=>{kcAf(d,BAL.eff.jkc.o_2);apply({suc:5});return"Canh sâm thật. Ngươi thấy mình đa nghi."})}),100-pR*BAL.odb.jkc.rlO_2/100,"canh có độc thì có thể chết, kiếp này dừng",true)/* FIRSTCARD (law 7): the chance she lives = 1 − P(poisoned) × P(it kills), the two rolls of this go */]}}},
 phan:{t:"Hộp phấn lạ",b:()=>{const d=kcR("di");return{who:kcFace(d),t:`<p>${d.t} ${d.name} sai người mang sang một hộp phấn Tô Châu, nói là quà cho ngày ngươi đi tuyển. Mùi phấn hơi hắc.</p>`,o:[
  kcO("Cảm tạ rồi cất đi, không dùng",{},()=>kcDo("Hộp phấn lạ",()=>{kcAf(d,BAL.eff.jkc.o_3);return"Ngươi cất hộp phấn vào đáy rương."})),
  ((rp)=>kitRiskOpt(kcO("Nhờ đại phu xem thử",{bac:-10},()=>kcDo("Hộp phấn lạ",()=>{if(roll(rp())){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return"Đại phu nói trong phấn có bột làm da nổi mẩn. Ngươi giữ lại làm chứng."}return"Đại phu không thấy gì lạ."})),()=>rp()))(()=>BAL.odb.jkc.rlO_3),
  ((rp)=>kitRiskOpt(kcO("Dùng thử",{},()=>kcDo("Hộp phấn lạ",()=>{if(roll(rp())){apply({sac:-6,suc:-10});return"Mặt ngươi nổi mẩn đỏ cả tháng."}apply({sac:1});return"Phấn tốt thật."})),()=>100-rp()))(()=>BAL.kc2.kcCard.dungThu_rb+(nv(d,"kcPowder")))]}}},
 trom:{t:"Vòng ngọc mất tích",b:()=>{const d=kcR("di");const mz=S.maid?S.maid.name:"tỳ nữ";return{who:kcFace(d),t:`<p>Vòng ngọc của ${d.t.toLowerCase()} mất. Gia nhân lục phòng, tìm thấy dưới gối ${mz}. ${d.t} đòi đánh ${mz} hai mươi trượng.</p>`,o:[
  ((rp)=>kitRiskOpt(kcO(`Đứng ra bênh ${mz}`,{suc:-10},()=>kcDo("Vòng ngọc",()=>{if(roll(rp())){if(S.maid)S.maid.loyal=cl(S.maid.loyal+BAL.eff.jkc.loyalO,0,100);spAdd(d,"oan",BAL.eff.jkc.oanO_2);return `Ngươi chỉ ra kẽ hở: người giấu vòng là gia nhân của ${d.t.toLowerCase()}. ${mz} thoát đòn.`}if(S.maid)S.maid.loyal=cl(S.maid.loyal+BAL.eff.jkc.loyalO_2,0,100);S.kgt-=BAL.eff.jkc.kgtO;return `Không ai tin. ${mz} vẫn bị đánh, nhưng biết ngươi đã bênh.`})),()=>rp()))(()=>BAL.kc2.kcCard.dungRaBenh_rb+S.tamco/3+(S.kc.proof[d.id]||0)*15),
  kcO("Im lặng",{},()=>kcDo("Vòng ngọc",()=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal-BAL.eff.jkc.loyalO_3,0,100);return `${mz} bị đánh. Từ đó nàng ít nói hẳn.`}))]}}},
 tudg:{t:"Bài vị đổ",b:()=>{const d=kcR("di"),to=kcR("to");return{who:kcFace(d),t:`<p>Sáng sớm, bài vị tổ tiên trong từ đường đổ vỡ. ${d.t} nói đêm qua thấy bóng ngươi đi qua từ đường.</p>`,o:[
  ((rp)=>kitRiskOpt(kcO("Xin tổ mẫu cho tra xét",{suc:-10},()=>kcDo("Bài vị",()=>{if(roll(rp())){spAdd(d,"oan",BAL.eff.jkc.oanO_3);S.kc.diBan=S.turn+3;return `Gia nhân khai thật: chính người của ${d.t.toLowerCase()} làm đổ.`}S.kgt-=BAL.eff.jkc.kgtO_2;if(to)kcAf(to,BAL.eff.jkc.o_4);return"Không tra ra ai. Tổ mẫu phạt ngươi quỳ ba canh giờ."})),()=>rp()))(()=>BAL.kc2.kcCard.xinToMauCho_rb+S.tamco/3+(to?to.af/5:0)),
  kcO("Quỳ nhận lỗi cho yên nhà",{suc:-15},()=>kcDo("Bài vị",()=>{apply({duc:2});const to=kcR("to");if(to)kcAf(to,BAL.eff.jkc.o_5);return"Ngươi quỳ trước từ đường đến tối. Tổ mẫu thở dài."}))]}}},
 ao:{t:"Mượn y phục",b:()=>{const m=kcR("muoi");return{who:kcFace(m),t:`<p>Thứ muội ${m.name} xin mượn bộ y phục đẹp nhất của ngươi để đi hội ngắm hoa, nơi các nhà quyền quý đến xem mặt.</p>`,o:[
  kcO("Cho mượn",{},()=>kcDo("Mượn y phục",()=>{kcAf(m,BAL.eff.jkc.o_6);statSet(m,"danh",(m.danh||0)+3);return `${m.name} được khen ở hội hoa.`})),
  kcO("Từ chối",{},()=>kcDo("Mượn y phục",()=>{kcAf(m,BAL.eff.jkc.o_7);spAdd(m,"oan",BAL.eff.jkc.oanO_4);return `${m.name} đi hội bằng áo cũ, về nhà khóc với ${kcR("di")?kcR("di").t.toLowerCase():"mẹ"}.`})),
  kcO("Cho mượn bộ khác, giữ bộ đẹp",{},()=>kcDo("Mượn y phục",()=>{kcAf(m,BAL.eff.jkc.o_8);apply({tamco:1});return"Nàng cầm áo, nhìn ngươi một lúc rồi đi."}))]}}},
 tranhmoi:{t:"Thứ muội giành mối",b:()=>{const m=kcR("muoi"),c=kcR("cha");const s=S.kc.suit[0];if(!s||!m)return null;return{who:kcFace(m),t:`<p>${m.name} lén gặp bà mối, nói tốt cho mình và nói xấu ngươi trước nhà ${s.n}.</p>`,o:[
  kcO("Mặc nàng",{},()=>kcDo("Giành mối",()=>{S.kc.suit.shift();S.kap-=BAL.eff.jkc.kapO;return `Nhà ${s.n} quay sang hỏi ${m.name}.`})),
  ((rp)=>kitRiskOpt(kcO("Nói lại với cha",{suc:-5},()=>kcDo("Giành mối",()=>{if(roll(rp())){spAdd(m,"oan",BAL.eff.jkc.oanO_5);kcAf(m,BAL.eff.jkc.o_9);return"Cha mắng thứ muội trước cả nhà."}S.kgt-=BAL.eff.jkc.kgtO_3;return"Cha gạt đi: chuyện đàn bà."})),()=>rp()))(()=>BAL.kc2.kcCard.noiLaiVoiCha_rb+(c?c.af/4:0))]}}},
 say:{t:"Cha say rượu",b:()=>{const c=kcR("cha");return{who:kcFace(c),t:`<p>Tối ấy cha uống say, gọi ngươi vào thư phòng, kể chuyện triều đình và hỏi ngươi có muốn vào cung không.</p>`,o:[
  kcO("Thưa: con muốn vào cung, làm rạng danh nhà",{},()=>kcDo("Cha say rượu",()=>{kcAf(c,BAL.eff.jkc.o_10);S.kc.want=1;return"Cha cười lớn, vỗ bàn."})),
  kcO("Thưa: con chỉ muốn ở gần cha mẹ",{},()=>kcDo("Cha say rượu",()=>{kcAf(c,BAL.eff.jkc.o_11);S.kap+=BAL.eff.jkc.kapO_2;return"Cha im lặng một lúc. Sáng hôm sau ông cho gọi bà mối."})),
  kcO("Lắng nghe, hỏi chuyện các nhà trên triều",{},()=>kcDo("Cha say rượu",()=>{apply({tamco:2});kcNews();return"Ngươi nhớ từng cái tên cha nhắc tới."}))]}}},
 bac:{t:"Huynh trưởng thua bạc",b:()=>{const h=kcR("huynh");return{who:kcFace(h),t:`<p>${h.name} thua bạc ở sòng phía Nam, nợ năm mươi lạng, lén xin ngươi giúp, đừng cho cha biết.</p>`,o:[
  kcO("Đưa bạc",{bac:-BAL.kc2.st.kc.bacHuynh},()=>kcDo("Thua bạc",()=>{kcAf(h,BAL.eff.jkc.o_12);h.me+=BAL.eff.jkc.meO;return"Huynh trưởng thề sẽ trả ơn."}),{dis:S.bac<BAL.kc2.st.kc.bacHuynh}),
  kcO("Mách cha",{},()=>kcDo("Thua bạc",()=>{kcAf(h,BAL.eff.jkc.o_13);spAdd(h,"oan",BAL.eff.jkc.oanO_6);const c=kcR("cha");if(c)kcAf(c,BAL.eff.jkc.o_14);S.kgt-=BAL.eff.jkc.kgtO_4;return"Cha đánh huynh trưởng mười roi."})),
  ((rp)=>kitRiskOpt(kcO("Từ chối, giữ kín",{},()=>kcDo("Thua bạc",()=>{kcAf(h,BAL.eff.jkc.o_15);/* he tries to raise it himself: fails at BAL.ag.why.kcDebt.fail odds → the creditor comes */if(roll(rp())){S.kgt-=BAL.eff.jkc.kgtO_5;return"Chủ sòng đến tận cửa đòi nợ. Cả phố biết."}return"Huynh trưởng tự xoay xở được."})),()=>100-rp()))(()=>BAL.ag.why.kcDebt.fail)]}}},
 tobenh:{t:"Tổ mẫu lâm bệnh",b:()=>{const t=kcR("to");S.kc.ev.tobenh=1;return{who:kcFace(t),t:`<p>Tổ mẫu lâm bệnh nặng. Cả nhà bàn ai sẽ hầu thuốc ngày đêm.</p>`,o:[
  kcO("Xin được hầu thuốc",{suc:-25},()=>kcDo("Hầu thuốc",()=>{kcAf(t,BAL.eff.jkc.o_16);apply({duc:4,kgt:2});return"Ngươi thức trắng nửa tháng. Tổ mẫu khỏi bệnh, nắm tay ngươi không buông."})),
  kcO("Để thứ muội hầu",{},()=>kcDo("Hầu thuốc",()=>{const m=kcR("muoi");if(m){statSet(m,"danh",(m.danh||0)+2);kcAf(t,BAL.eff.jkc.o_17)}return"Thứ muội được khen hiếu thảo."}))]}}},
 dithai:{t:"Di nương có thai",b:()=>{const d=kcR("di");S.kc.ev.dithai=1;return{who:kcFace(d),t:`<p>${d.t} ${d.name} có thai. Cả phủ đổi chiều, cha ở viện phía tây nhiều hơn.</p>`,o:[
  kcO("Mang thuốc bổ sang chúc mừng",{bac:-10},()=>kcDo("Di nương có thai",()=>{kcAf(d,BAL.eff.jkc.o_18);return"Nàng cười, nhận thuốc mà không uống."})),
  kcO("Đứng ngoài",{},()=>kcDo("Di nương có thai",()=>{const me=kcR("me");if(me)kcAf(me,BAL.eff.jkc.o_19);return"Mẫu thân ngồi một mình dưới giàn tử đằng."}))]}}},
 thuc:{t:"Thư nhà từ trong cung",b:()=>{const ct=kcContact();return{who:pMe(),t:`<p>${ct?ct+" gửi":"Một thái giám quen gửi"} thư ra, kể chuyện trong cung.</p>`,o:[
  kcO("Đọc kỹ, ghi nhớ",{},()=>kcDo("Thư từ trong cung",()=>{kcIntel(1,3);return""})),
  kcO("Hồi âm, gửi kèm quà",{bac:-BAL.kc2.st.kc.bacThu},()=>kcDo("Thư từ trong cung",()=>{kcIntel(2,3);return"Người trong cung nhận quà, hứa để mắt giúp."}),{dis:S.bac<BAL.kc2.st.kc.bacThu})]}}},
 tho:{t:"Hội thơ xuân",b:()=>({who:pMe(),t:`<p>Phủ thế giao mở hội thơ xuân. Các tiểu thư kinh thành đều tới; nghe nói có cả người nhà các vương phủ.</p>`,o:[
  kitRiskOpt(kcO("Dự hội, làm thơ",{suc:-15},()=>kcFest("Hội thơ","thi")),()=>kcFestP("thi")),kcO("Cáo bệnh ở nhà",{},()=>kcDo("Hội thơ",()=>"Ngươi ở nhà đọc sách."))]})},
 hoa:{t:"Hội ngắm mẫu đơn",b:()=>({who:pMe(),t:`<p>Hầu phủ mời các nhà đến ngắm mẫu đơn. Các phu nhân đi xem mặt dâu.</p>`,o:[
  kitRiskOpt(kcO("Đi, đánh đàn góp vui",{suc:-15},()=>kcFest("Ngắm hoa","cam")),()=>kcFestP("cam")),kcO("Đi, chỉ ngắm hoa",{suc:-10},()=>kcDo("Ngắm hoa",()=>{spAdd(S,"danh",1);S.kap+=BAL.eff.jkc.kapO_3;return"Có phu nhân hỏi tuổi ngươi."})),kcO("Ở nhà",{},()=>kcDo("Ngắm hoa",()=>""))]})},
 thuongnguyen:{t:"Tết Thượng nguyên",b:()=>({who:pMe(),t:`<p>Đêm rằm tháng giêng, cả kinh thành treo đèn. Khuê nữ được ra phố ngắm đèn, thắp đèn thi.</p>`,o:[
  ((rp)=>kitRiskOpt(kcO("Ra phố thắp đèn thi",{suc:-15},()=>kcFest("Thượng nguyên","thi",()=>{const tm=kcTmMan();if(tm&&S.tm96&&npcWhy("kcMeet",{tm},()=>roll(rp()))){S.tm96.h=Math.min(100,S.tm96.h+10);S.kld+=4;return `Dưới đèn hoa, ngươi gặp ${tm.name}. Hai người đứng cạnh nhau rất lâu.`}return""})),()=>rp()))(()=>BAL.odb.jkc.rlKcMeet_2),kcO("Ở nhà cùng mẫu thân",{},()=>kcDo("Thượng nguyên",()=>{const m=kcR("me")||kcR("di");if(m)kcAf(m,BAL.eff.jkc.o_20);return""}))]})},
 thattich:{t:"Đêm Thất tịch",b:()=>({who:pMe(),t:`<p>Đêm Thất tịch, các khuê nữ thi xâu kim dưới trăng, cầu khéo tay.</p>`,o:[kitRiskOpt(kcO("Thi xâu kim",{suc:-10},()=>kcFest("Thất tịch","theu")),()=>kcFestP("theu")),kcO("Ngồi xem",{},()=>kcDo("Thất tịch",()=>""))]})},
 trungduong:{t:"Tết Trùng dương",b:()=>({who:pMe(),t:`<p>Cả nhà lên núi ngắm cúc, uống rượu hoa cúc.</p>`,o:[kcO("Đi cùng cả nhà",{suc:-10},()=>kcDo("Trùng dương",()=>{for(const m of S.kc.fam.filter(x=>x.alive&&!/^ban/.test(x.r)))kcAf(m,BAL.eff.jkc.o_21);apply({suc:5});return"Một ngày yên ấm hiếm hoi."}))]})},
 tmrise:{t:"Người ấy đỗ đạt",b:()=>{const tm=kcTmMan();S.kc.ev.tmrise=1;S.tm96.rise=1;return{who:pMan(tm),t:`<p>${tm.name} ${TM96V[S.tm96.k]?TM96V[S.tm96.k].how:"thành danh"}. Tin bay khắp kinh thành.</p>`,o:[
  kcO("Gửi lời chúc mừng",{bac:-5},()=>kcDo("Người ấy đỗ đạt",()=>{S.tm96.h=Math.min(100,S.tm96.h+6);return"Chàng gửi lại một bài thơ."})),kcO("Im lặng",{},()=>kcDo("Người ấy đỗ đạt",()=>""))]}}},
 tmcam:{t:"Cha cấm cửa",b:()=>{const tm=kcTmMan(),c=kcR("cha");S.kc.ev.tmcam=1;return{who:kcFace(c),t:`<p>Cha biết chuyện ngươi với ${tm.name}, cấm hắn bước qua cửa phủ: "Con gái nhà này là để đưa vào cung."</p>`,o:[
  kcO("Cúi đầu vâng lời",{},()=>kcDo("Cấm cửa",()=>{kcAf(c,BAL.eff.jkc.o_22);S.tm96.h-=10;S.kld=Math.max(0,S.kld-5);return""})),
  kcO("Cãi lại cha",{},()=>kcDo("Cấm cửa",()=>{kcAf(c,BAL.eff.jkc.o_23);S.tm96.h=Math.min(100,S.tm96.h+8);S.kap+=BAL.eff.jkc.kapO_4;return"Cha đập bàn. Bà mối được gọi đến ngay tuần sau."}))]}}},
 tmtron:{t:"Lời rủ trốn đi",b:()=>{const tm=kcTmMan();S.kc.ev.tmtron=1;const ok=kcR1Ok();const r=ok&&kcRare("kcR1",BAL.kc3.rare.r1.p);
  return{who:pMan(tm),t:`<p>${tm.name} gửi thư: đêm mười lăm, thuyền đợi ở bến sông. Nếu nàng đến, hai người đi về phương Nam, không bao giờ trở lại.</p>`,o:[
  kcO("Đốt thư, ở lại",{},()=>kcDo("Lời rủ trốn đi",()=>{S.tm96.h-=15;return"Ngươi đốt thư trước đèn."})),
  kitRiskOpt(kcO("Đến bến sông",{suc:BAL.eff.jkc.sucKcElope},()=>kcElope(false)),100-BAL.odb.jkc.rlKcElope,"bị đuổi kịp thì có thể chết đuối, kiếp này dừng",true)/* FIRSTCARD: kcElope's own roll */].concat(r?[kcO("✦ Theo chàng đi, có tỳ nữ lo liệu đường đi",{suc:BAL.eff.jkc.sucO},()=>kcElope(true),{r97:1,j67:`tốn: Sức ${balSg(BAL.eff.jkc.sucO)} · (Cơ duyên hiếm)`})]:[])}}},
 caught:{t:"Bị bắt gặp",b:()=>{const tm=kcTmMan(),c=kcR("cha");return{who:kcFace(c),t:`<p>Gia nhân bắt gặp ngươi với ${tm?tm.name:"một nam nhân"} trong hoa viên. Cả phủ biết trước khi trời sáng.</p>`,o:[
  kcO("Quỳ xin cha tha",{suc:-10},()=>kcDo("Bị bắt gặp",()=>{if(c)kcAf(c,BAL.eff.jkc.o_24);S.kgt-=BAL.eff.jkc.kgtO_6;S.kap+=BAL.eff.jkc.kapO_5;S.kc.ldSeen=1;return"Cha cho ngươi cấm túc trong khuê phòng; bà mối được gọi đến."})),
  kcO("Nhận hết, xin gả cho chàng",{},()=>kcDo("Bị bắt gặp",()=>{if(c)kcAf(c,BAL.eff.jkc.o_25);S.kgt-=BAL.eff.jkc.kgtO_7;S.kc.ldSeen=1;S.kc.askTm=1;return"Cha không nói một lời, đóng cửa thư phòng."}))]}}},
 meet:{t:"Gặp lại người xưa",b:()=>{const tm=kcTmMan();return{who:pMan(tm),t:`<p>${TM96V[S.tm96.k]?"Ngươi gặp lại "+TM96V[S.tm96.k].bg:"Ngươi gặp lại người xưa"}: ${tm.name}. Chàng trao cho ngươi ${TM96V[S.tm96.k]?TM96V[S.tm96.k].tok:"một tín vật"}.</p>`,o:[
  kcO("Nhận tín vật",{},()=>kcDo("Tín vật",()=>{S.tm96.tok=1;S.tm96.h=Math.min(100,S.tm96.h+10);return"Ngươi giấu tín vật trong tay áo."})),
  kcO("Trả lại, giữ lễ",{},()=>kcDo("Tín vật",()=>{S.tm96.h-=8;apply({duc:2});return"Chàng cúi đầu, cất tín vật đi."}))]}}},
 vihanh:{t:"Khách lạ ở chùa",b:()=>{const r=kcRare("kcR3",.5);return{who:pEmp(),t:`<p>Trong sân chùa, một nam nhân áo xanh, theo sau mấy người hầu im lặng, hỏi ngươi về câu đối trên cột. Người ta thì thầm: Hoàng thượng vi hành.</p>`,o:[
  ((rp)=>kitRiskOpt(kcO("Đối lại câu đối",{},()=>kcDo("Khách lạ",()=>{if(roll(rp())){S.kc.vh=1;return"Người ấy cười, hỏi tên ngươi rồi đi."}return"Người ấy gật đầu rồi đi."})),()=>rp()))(()=>BAL.kc2.kcCard.doiLaiCauDoi_rb+S.tai/3),
  kcO("Cúi đầu tránh đi",{},()=>kcDo("Khách lạ",()=>{apply({duc:1});return""}))].concat(r?[kcO("✦ Đối đáp, rồi dâng một khúc đàn",{suc:BAL.eff.jkc.sucO_2},()=>kcEnd("kcR3"),{r97:1,j67:`tốn: Sức ${balSg(BAL.eff.jkc.sucO_2)} · (Cơ duyên hiếm)`})]:[])}}},
 dich:{t:"Dịch trong kinh thành",b:()=>{S.kc.ev.dich=1;return{who:pMe(),t:`<p>Kinh thành có dịch sốt. Phố xá vắng tanh, nhà nào cũng đóng cửa.</p>`,o:[
  ...[[kcO("Đóng cửa khuê phòng, uống thuốc phòng",{bac:-20},()=>kcIll(15)),15],[kcO("Vẫn đi lại như thường",{},()=>kcIll(45)),45],[kcO("Đi chùa phát thuốc cho dân",{suc:-15,bac:-30},()=>kcIll(55,()=>{apply({duc:6,danh:4});return"Cả kinh thành nhắc tên ngươi."})),55]].map(([o,p])=>kitRiskOpt(o,kcIllLive(p,o.fx),KC_DICH_W,true))/* FIRSTCARD (law 7) */]}}},
 theu:{t:"Bức thêu mừng thọ",b:()=>({who:pMe(),t:`<p>Sắp đến thọ tổ mẫu. Nhà muốn mỗi cháu gái dâng một bức thêu.</p>`,o:[((rp)=>kitRiskOpt(kcO("Thức đêm thêu bách thọ đồ",{suc:-30},()=>kcDo("Bức thêu",()=>{const t=kcR("to");if(t)kcAf(t,roll(rp())?BAL.eff.jkc.o_26[0]:BAL.eff.jkc.o_26[1]);return""})),()=>rp()))(()=>BAL.kc2.kcCard.thucDemTheuBach_rb+S.tai/3),((rp)=>kitRiskOpt(kcO("Mua bức thêu ngoài phố",{bac:-25},()=>kcDo("Bức thêu",()=>{const t=kcR("to");if(t)kcAf(t,roll(rp())?BAL.eff.jkc.o_27[0]:BAL.eff.jkc.o_27[1]);return""})),()=>rp()))(()=>BAL.odb.jkc.rlO_4)]})},
 gianhan:{t:"Gia nhân xin ra",b:()=>{const d=kcR("di");return({who:pMaid(),t:`<p>Một gia nhân già nhà ngươi xin về quê, nói thầm rằng có chuyện muốn kể trước khi đi.</p>`,o:[((rp)=>kitRiskOpt(kcO("Nghe hắn kể",{bac:-5},()=>kcDo("Gia nhân",()=>{if(d&&roll(rp())){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return `Hắn kể chuyện ${d.t.toLowerCase()} mua thuốc lạ năm xưa.`}return"Toàn chuyện cũ không đâu."})),()=>(d?rp():0)))(()=>BAL.odb.jkc.rlO_5),kcO("Cho bạc, tiễn đi",{bac:-10},()=>kcDo("Gia nhân",()=>{apply({duc:1});return""}))]})}},
 moi:{t:"Bà mối đến nhà",b:()=>{const s=S.kc.suit[S.kc.suit.length-1]||S.kc.suit[0];if(!s)return null;const c=kcR("cha");return{who:kcFace(c),t:`<p>Bà mối đến nói chuyện ${s.n} muốn cầu thân. Cha hỏi ý ngươi.</p>`,o:[
  kcO("Xin cha cho xem mặt trước",{},()=>kcDo("Bà mối",()=>{S.kap+=BAL.eff.jkc.kapO_6;return"Nhà trai hẹn ngày đến."})),
  ((rp)=>kitRiskOpt(kcO("Thưa: con đợi kỳ tuyển tú",{},()=>kcDo("Bà mối",()=>{if(roll(rp())){S.kap-=BAL.eff.jkc.kapO_7;return"Cha gật đầu: cũng được."}if(c)kcAf(c,BAL.eff.jkc.o_28);return"Cha nhíu mày."})),()=>rp()))(()=>BAL.kc2.kcCard.thuaConDoiKy_rb+(c?c.af/3:0)),
  kcO(`Nhận lời nhà ${s.n}`,{},()=>kcMarry(s),{dis:S.kap<BAL.kc2.st.kc.nhan})]}}},
 dinhhon:{t:"Cha định hôn",b:()=>{const s=S.kc.suit[0];if(!s)return null;/* E25r2: a suitor list emptied before the card (bà mối / thứ muội / E15 shift it) → no card, never a crash on s.n */const c=kcR("cha");const r=S.tm96&&S.tm96.rise&&c&&c.af>=60&&S.tm96.h>=75&&kcRare("kcR2",.8);
  return{who:kcFace(c),t:`<p>Cha đã nhận sính lễ của ${s.n}. Ngày cưới định vào tháng sau.</p>`,o:[
  kcO("Vâng lời cha",{},()=>kcMarry(s)),
  kitRiskOpt(kcO("Quỳ xin cha cho đi tuyển tú",{suc:-10},()=>kcDo("Định hôn",()=>{if(roll(kcQuyP(c))){S.kc.suit=[];S.kap=BAL.kc2.st.kc.chaYes;S.kc.forced=0;if(S.kc.mien===2){S.kc.mien=0;S.kc.so=0}/* review outside-nums: a miễn tuyển girl whose cha relents at the Sơ tuyển gets her Sơ tuyển back (was: S.kc.so stayed 1 and the home road never ended) */return"Cha trả sính lễ, nói: vậy thì vào cung cho xứng."}S.kc.forced=2;pushDil(mkP("kcE",{e:"dinhhon2",s}),"Cha định hôn");return"Cha không đổi ý."})),kcQuyP(c),"cha không đổi ý thì chỉ còn gả đi, đi tu hay tự vẫn, kiếp này dừng",true),
  ].concat(r?[kcO("✦ Xin cha gả cho người ấy, nay đã đỗ đạt",{},()=>kcEnd("kcR2"),{r97:1,j67:"tốn: không · (Cơ duyên hiếm)"})]:[])}}},
 dinhhon2:{t:"Cha định hôn",b:pp=>{const s=(pp&&pp.s)||S.kc.suit[0];if(!s)return null;/* E25r2: the house the father chose in «dinhhon» travels with the card (the list can change between the two cards) */return{who:kcFace(kcR("cha")),t:`<p>Sính lễ của ${s.n} đã bày đầy chính sảnh. Không còn đường lùi.</p>`,o:[kcO("Lên kiệu hoa",{},()=>kcMarry(s)),kcO("Cắt tóc xin đi tu",{},()=>kcEnd("tu")),kcO("Thắt cổ tự vẫn",{},()=>kcDie("Tự vẫn trước ngày bị ép gả"))]}}},
 chieu:{t:"Chiếu tuyển tú",b:()=>({who:pEmp(),t:`<p>Chiếu tuyển tú ban xuống: mùa xuân năm tới, con gái các nhà quan và lương gia từ mười tám tới hai mươi tuổi đều phải ghi tên. ${kcR("muoi")?"Thứ muội cũng có tên.":""}</p>`,o:[
  kcO("Ghi tên",{},()=>kcDo("Chiếu tuyển tú",()=>{S.kap=Math.max(0,S.kap-BAL.eff.jkc.kapO_8);S.kc.suit=[];S.kc.forced=0;return"Tú nữ đã ghi tên thì không nhà nào được dạm hỏi. Nhà thôi bàn chuyện gả ngươi đi."})),
  kcO("Xin cha lo cho được miễn tuyển",{bac:-BAL.kc2.st.kc.bacMien},()=>kcDo("Chiếu tuyển tú",()=>{S.kc.mien=1;return"Cha gật đầu. Ngươi sẽ không phải đi tuyển; nhà sẽ lo chuyện gả chồng."}),{dis:S.kap<BAL.kc2.st.kc.mien||S.bac<BAL.kc2.st.kc.bacMien})]})},
 o0:{t:"",b:()=>kcOrigin(0)},o1:{t:"",b:()=>kcOrigin(1)},o2:{t:"",b:()=>kcOrigin(2)},
 so:{t:"Sơ tuyển",b:()=>kcSoD()},phuc:{t:"Phúc tuyển",b:()=>kcPhucD()},dien:{t:"Điện tuyển",b:()=>kcDienD()},trave:{t:"Trả thẻ bài",b:()=>kcTraveD()}};
PEND.kcE=pp=>{if(!S||!S.kc||S.dead)return null;if(!isKc()&&!/^(dien)$/.test(pp.e))return null;const E=KCE[pp.e];if(!E)return null;const d=E.b(pp);if(!d)return null;
 d.o=(d.o||[]).filter(o=>!o.dis);return d};
/* KC-ODDS-CHIP (law 7): kcSpanP(base, need, span) = the true chance (0..100) that base + R(span) >= need — the ONE formula the festival roll and the card's odds word share */
function kcSpanP(base,need,span){const lo=Math.max(0,Math.min(span,Math.ceil(need-base)));return 100*(span-lo)/span}
function kcFestBase(art){const F=BAL.kc2.fest;return artOE(S,art)*BAL.art.score+S.tai/F.tai+S.sac/F.sac}
function kcFestP(art){return kcSpanP(kcFestBase(art),BAL.kc2.fest.ok,BAL.kc2.fest.span)}/* «nổi danh» = praised or first (score >= ok); below it she loses a little Danh */
function kcFest(t,art,extra){const b=rsnap();const F=BAL.kc2.fest;const sc=kcFestBase(art)+R(F.span);let txt;
 if(sc>=F.top){spAdd(S,"danh",4);S.kap+=BAL.eff.jkc.kapKcFest;txt=`${t}: ngươi đứng đầu, cả kinh thành nhắc tên.`;if(!S.kc.ev.vp&&S.danh>=BAL.danhG.kcVihanh&&S.sac>=80&&kcRare("kcR3",.4)){S.kc.ev.vp=1;pushDil(mkP("kcE",{e:"vihanh"}),"Khách lạ ở chùa")}}
 else if(sc>=F.ok){spAdd(S,"danh",2);txt=`${t}: ngươi được khen.`}else{S.danh=Math.max(0,S.danh-1);txt=`${t}: ngươi không nổi bật.`}
 const mu=kcR("muoi");if(mu&&roll(BAL.odb.jkc.rlKcFest))statSet(mu,"danh",(mu.danh||0)+(sc<F.ok?3:1));const x=extra?extra():"";kcRes(t,b,txt+(x?" "+x:""))}
/* FIRSTCARD (law 4/7): the fever numbers live in BAL.kc2.ill; kcIllLive(p, cost) = the chance (0..100) she lives through the dịch card (the same rolls) */
/* FIRSTCARD: the plea's chance (one place: the roll and the card's odds word) */
function kcQuyP(c){return BAL.kc2.kcCard.quyXinChaCho_rb+(c?c.af/2:0)+(S.kc.want?BAL.kc2.kcCard.quyXinChaWant:0)}
function kcIllDie(suc){const I=BAL.kc2.ill;const s=suc-I.suc;return s<=0?100:s<I.low?I.dieLo:I.dieHi}
function kcIllLive(p,cost){const s=(S.suc||0)+((cost&&cost.suc)||0);return 100-p*kcIllDie(s)/100}
function kcIll(p,extra){const b=rsnap();let txt="";if(roll(p)){const s0=S.suc;apply({suc:-BAL.kc2.ill.suc});txt="Ngươi lên cơn sốt.";if(roll(kcIllDie(s0))){kcRes("Dịch",b,txt);kcDie("Chết vì dịch sốt trước kỳ tuyển tú");return}}else txt="Ngươi qua được mùa dịch.";if(extra)txt+=" "+extra();kcRes("Dịch",b,txt)}
function kcRare(id,p){S.kc.r97=S.kc.r97||{};if(S.kc.r97[id]!=null)return S.kc.r97[id];const ok=roll(p*(typeof R97CFG==="object"?R97CFG.p:1)*BAL.kcRareX);S.kc.r97[id]=ok?1:0;return ok}
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
 if(i===2&&k==="dtq"&&S.suc>=BAL.kc3.rare.dtqSuc&&(S.kc.oc||0)<=BAL.kc3.rare.dtqOc&&kcRare("kcR4",BAL.kc3.rare.r4))opts.push(kcO("✦ Cải trang nam nhi, theo quân ra Nhạn Môn",{suc:BAL.eff.jkc.sucKcOrigin},()=>kcEnd("kcR4"),{r97:1,j67:`tốn: Sức ${balSg(BAL.eff.jkc.sucKcOrigin)} · (Cơ duyên hiếm)`}));
 if(i===2&&k==="muoi"&&S.tamco>=BAL.kc3.rare.muoiTc&&S.kgtu>=BAL.kc2.st.kc.gtuRich&&kcRare("kcR6",BAL.kc3.rare.r6))opts.push(kcO("✦ Xin cha giao cho ngươi giữ cả sổ muối",{},()=>kcEnd("kcR6"),{r97:1,j67:"tốn: không · (Cơ duyên hiếm)"}));
 return{who:c?kcFace(c):pMe(),t:`<p class="past">${KCO[k].t} · hồi ${i+1}/3</p><p>${B[0]}</p>`,o:opts}}
function kcOriginFx(k,i,a){S.kc.oc=(S.kc.oc||0)+a;const c=kcR("cha");let t="";const cl0=KCCLAN[k];
 if(a){if(c)kcAf(c,BAL.eff.jkc.kcOriginFx);try{if(cl0)tdPowAdd(cl0,BAL.eff.jkc.kcOriginFx_2)}catch(e){}apply({tamco:1});t="Cha gật đầu hài lòng."}else{if(c)kcAf(c,BAL.eff.jkc.kcOriginFx_3);apply({duc:2});t="Cha nhìn ngươi rất lâu."}
 if(k==="td"&&i===2){if(kcLore()){t+=a?" Thư từ của cha thành tro; kẻ lục soát sau này sẽ chẳng có gì để dựa vào.":" Bản sao sổ sách nằm lại nhà thế giao, chờ ngày cần đến."}
  else if(a||S.kc.oc>=2){S.kc.tdSafe=1;t+=" Án của cha được xét lại; nhà giữ được."}else{S.kc.tdFall=1;t+=" Nhà bị khám. Cha bị bắt giam; ngươi được thế giao che giấu, chờ kỳ tuyển dưới tên khác."}}
 if(k==="dtq"&&i===0&&kcLore())S.kc.lost=1;/* KC LORE: from this chapter the brother is lost at Nhạn Môn: he is no longer at home (j67 dtq_huynh) */
 if(k==="thd"&&i===1&&a)apply({danh:5});if(k==="muoi"&&i===0&&a){S.kgtu=Math.max(10,S.kgtu-20);S.kgt+=BAL.eff.jkc.kgtKcOriginFx}
 if(k==="ch"&&i===2){spAdd(S,"th",(a?8:3))}
 try{const L=S.st&&S.st.ch;if(L)S.kc.seed=(S.kc.seed||[]).concat([k+i+a])}catch(e){}return t}

/* ---------- endings outside ---------- */
function kcMarry(s){
 const k=s.k,q=s.q+S.kgt/4+R(20);let h,t;
 if(k==="hau"&&q>=70){h="Chính thất hầu phủ";t=`Nàng xuất giá vào hầu phủ, làm chính thất của Thế tử. Mười năm sau nàng là Hầu phu nhân, mỗi dịp lễ lại vào cung bái kiến.`}
 else if(k==="lao"){h="Gả xa";t=`Nàng bị gả làm kế thất cho lão Thị lang góa vợ ở biên phủ. Tiếng đàn của nàng không ai nghe nữa.`}
 else if(q<45){h="Làm thiếp nhà quyền quý";t=`Nàng vào phủ ${s.n} làm thiếp. Chính thất nhà ấy không ưa nàng.`}
 else{h="Vợ quan thanh liêm";t=`Nàng làm vợ ${s.n}. Nhà không giàu, nhưng chồng nàng thương nàng suốt đời.`}
 kcEndDo(h,t,h)}
/* s3e-display-fix (law 6/7, robot «Đến bến sông · Rất vững» → «Chết đuối khi bỏ trốn»): the drowning is THE roll of the option; ok = the option's own roll
   (kc3 tm96z x1 passes it, so meter word and outcome are one roll); ok undefined (old jkc tmtron card) = the same BAL chance rolled here, its j67 line shows word(kcElopeLive()) */
function kcElopeLive(){return 100-BAL.odb.jkc.rlKcElope}
function kcElope(rare,ok){if(rare){kcEnd("kcR1");return}const b=rsnap();if(ok===false||ok==null&&roll(BAL.odb.jkc.rlKcElope)){kcEndDo("Bỏ trốn","Đêm ấy thuyền đi được nửa sông thì đuốc nhà quan đuổi kịp. Người ta vớt được chiếc khăn của nàng ở bến.","Chết đuối khi bỏ trốn")}else{S.kgt-=BAL.eff.jkc.kgtKcElope;S.kld+=30;S.kc.ldSeen=1;const tm=kcTmMan();if(tm){tm.tinh=Math.max(0,(tm.tinh||0)-30)}S.tm96.h=Math.max(0,S.tm96.h-20);kcRes("Bến sông",b,"Ngươi đến bến thì thuyền đã đi; người nhà đuổi theo kéo ngươi về. Cả phủ biết chuyện.")}}
function kcEnd(id){const N="Nàng";const E={tu:["Xuất gia",`${N} cắt tóc ở chùa Hộ Quốc. Tiếng mõ sớm chiều thay cho tiếng trống tuyển tú.`],
 kcR1:["Bỏ trốn cùng người thương",`${N} theo ${kcTmMan()?kcTmMan().name:"người ấy"} xuống phương Nam. Họ sống trong một ngôi nhà nhỏ bên sông, không ai biết họ là ai.`],
 kcR2:["Vợ Trạng nguyên",`Cha gật đầu. ${N} làm vợ ${kcTmMan()?kcTmMan().name:"người ấy"}; ngày vinh quy, cả kinh thành ra xem.`],
 kcR3:["Vương phi",`Khách áo xanh hôm ấy là Thân vương, em Hoàng thượng. Một tháng sau, ${N} được ban hôn làm Vương phi.`],
 kcR4:["Nữ tướng Nhạn Môn",`${N} cải trang theo quân ra Nhạn Môn, đưa huynh trưởng trở về. Hoàng thượng nghe chuyện, ban hiệu Nữ tướng.`],
 kcR5:["Hòa thân thay công chúa",`${N} được nhận làm nghĩa nữ của Hoàng thượng, gả sang phương Bắc hòa thân. Biên cương yên ổn hai mươi năm.`],
 kcR6:["Nữ thương Giang Nam",`${N} giữ sổ muối nhà mình, thuyền buôn đi khắp Giang Nam. Người ta gọi nàng là Diêm thương nương tử.`]}[id];
 if(KCRARE[id]){try{RARE97.meet(id,KCRARE[id][1])}catch(e){}S.r97=(S.r97||[]).concat([{a:id,tag:KCRARE[id][1],ti:E[0]}])}
 kcEndDo(E[0],E[1],E[0])}
function kcEndDo(h,t,fate,alive){if(S.dead)return;S.kc.end=h;Q=Q.filter(m=>m.cls==="end"||m.nl);try{lifeLog&&0}catch(e){}over(h,t+` <span class="past">(Tiểu thư ngoài cung · ${kcTitle()})</span>`,fate,alive);/* alive: jleave Trả thẻ bài endings pass true (a married/teaching/nun life is not a «Chết vì»); other callers unchanged */try{showModal()}catch(e){}}
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
function kcSoTuyen(){if(S.kc.so||S.dead)return;S.kc.so=1;if(S.kc.mien){S.kc.mien=2;S.kap=Math.max(S.kap,BAL.kc2.st.kc.mienSo);const s=S.kc.suit[0]||kcSuitor();if(!S.kc.suit.length)S.kc.suit.push(s);S.kc.forced=1;pushDil(mkP("kcE",{e:"dinhhon"}),"Cha định hôn");return}
 pushDil(mkP("kcE",{e:"so"}),"Sơ tuyển")}
/* D-SELX-FAIR: the five points the ma ma checks (one list read by the roll and by the «Trả thẻ bài» result line) */
function kcSoPts(bribe){const C=KC.so;return [["dung mạo",S.sac>=C.sac],["khí sắc",S.suc>=C.suc],["tiếng tăm",S.kld<C.ld],["gia thế",S.kgt>=C.gt],["lễ vật",!!bribe]]}
function kcSoOk(bribe){return kcSoPts(bribe).filter(x=>x[1]).length>=BAL.kc2.soNeed}
const KC_DICH_W="nhiễm dịch nặng thì có thể chết, kiếp này dừng";const KC_TRAVE_W="bị trả thẻ bài thì nhà ép gả, kiếp này dừng ngoài cung";
function kcSoD(){return{who:pMe(),t:`<p>Ma ma Nội vụ phủ đến khám tuyển: xem dung mạo, khí sắc, hỏi gia thế, nghe ngóng tiếng tăm. ${S.kc.ldSeen&&S.kld>=40?"Ngươi biết lời đồn về mình đã đến tai họ.":""}</p>`,o:[
 ...[kcO("Ra mắt ma ma",{},()=>kcSoGo(false)),kcO("Dúi bạc cho ma ma khám tuyển",{bac:-BAL.kc2.st.kc.bacMama},()=>kcSoGo(true),{dis:S.bac<BAL.kc2.st.kc.bacMama})].map((o,i)=>kitRiskOpt(o,kcSoOk(i===1)?BAL.odds.hi:BAL.odds.lo,KC_TRAVE_W,true))/* FIRSTCARD (law 7): kcSoOk is decided by her numbers, so the word is the true one */]}}
function kcPd(n,why){try{if(typeof pdAdd==="function")pdAdd(n,why,"kc")}catch(e){}}
function kcSoGo(bribe){const b=rsnap();if(kcSoOk(bribe)){S.kpTron=1;S.kc.soOk=1;kcPd(5,"qua Sơ tuyển");kcRes("Sơ tuyển",b,"Ngươi qua Sơ tuyển. Tên ngươi được ghi vào sổ tú nữ.")}else{S.kc.soOk=0;S.kc.soPts=kcSoPts(bribe);/* D-SELX-FAIR: what she met, for the result line */kcRes("Sơ tuyển",b,"Ma ma lắc đầu: ngươi bị trả về.");pushDil(mkP("kcE",{e:"trave"}),"Trả thẻ bài")}}
function kcTuyen(early){if(S.kc.tt||S.dead)return;if(!early&&!S.kc.soOk)return;S.kc.tt={early:!!early,raw:5};if(early){S.kpTron=1}
 if(early){pushDil(mkP("kcE",{e:"dien"}),"Điện tuyển");return}pushDil(mkP("kcE",{e:"phuc"}),"Phúc tuyển")}
function kcBestArt(){let b="cam",v=-1;for(const a of ARTS){if(a.k==="y")continue;const l=(S.arts||{})[a.k]||0;if(l>v){v=l;b=a.k}}return b}
function kcPhucD(){const k=kcBestArt();const A=ARTS.find(a=>a.k===k);return{who:pMe(),t:`<p>Nội vụ phủ. Các tú nữ lần lượt dâng tài nghệ trước các ma ma và nữ quan. Ngươi chọn môn ${A.n} (bậc ${(S.arts||{})[k]||0}).</p>`,o:[
 kcO(`Dâng ${A.n}`,{suc:-10},()=>kcPhucPlay(k,false)),kcO("Để tài nghệ quyết định",{suc:-10},()=>kcPhucPlay(k,true))]}}
function kcPhucPlay(k,skip){if(!isKc()||!S.kc.tt||S.kc.tt.done)return;/* r2-r1: a stale Phúc tuyển card answered after the round never opens the mini-game */S.kc.tt.play=1;const fin=raw=>{if(S.kc.tt.done)return;S.kc.tt.done=1;S.kc.tt.raw=raw;S.kc.tt.art=k;pushDil(mkP("kcE",{e:"dien"}),"Điện tuyển");try{showModal()}catch(e){}};
 if(skip||window.__bot||typeof playArt!=="function"){fin(skip?entSkipRaw():entBotRaw());return}/* fix: the ONE exam seam (jkc2 kc2Play contract) — kind = origin key, info.art = the art she offered, info.phuc = this is the tiểu thư Phúc tuyển */
 if(typeof window.kcEntryExam==="function"){try{window.kcEntryExam(S.origin&&S.origin.k,raw=>fin(raw),{art:k,origin:S.origin&&S.origin.k,title:"Phúc tuyển",note:"Điểm màn chơi cộng vào Điện tuyển",phuc:1});return}catch(e){console.error(e)}}
 try{playArt({art:k,occ:"tuyen",title:"Phúc tuyển",note:"Điểm màn chơi cộng vào Điện tuyển",quick:{n:"Để tài nghệ quyết định",sub:`tính ${entSkipRaw()}/10, tự thi giỏi thì hơn`},onDone:(raw,o)=>fin(o&&o.skipped?entSkipRaw():raw)})}catch(e){console.error(e);fin(entSkipRaw())}}
/* review/podium-wire (OR09): the Phúc tuyển of the thứ muội + khuê hữu. Each girl is a real record with her OWN marks (law 6b), drawn once
   from her own stats through BAL.entry.phuc (ONE CORE), kept on the record and read again by kcEnter (Điện tuyển). */
function kcRivalsTT(){return((S.kc&&S.kc.fam)||[]).filter(x=>x&&x.alive&&(x.r==="muoi"||/^ban/.test(x.r)))}
function kcFoulOn(m){const F=BAL.entry.phuc.foul;m.sac=Math.max(0,(m.sac||0)-F.sac);m.danh=Math.max(0,(m.danh||0)-F.danh)}
function kcPhucLv(m){const L=BAL.entry.phuc.lv;return cl(Math.round(((m.tai||0)-L[0])/L[1]),0,L[2])}
function kcPhucMark(m){const P=BAL.entry.phuc;if(m.praw==null){const r=(Math.random()+Math.random()+Math.random())/3;let mean;try{mean=kg82NpcMean(kcPhucLv(m))}catch(e){mean=P.max/2}
  m.praw=cl(Math.round(mean+(r-.5)*2*P.sp),0,P.max)}
 if(m.pduc==null)m.pduc=P.duc[0]+R(P.duc[1]);if(m.ppow==null)m.ppow=m.r==="muoi"?null:P.pow[0]+R(P.pow[1]);return m.praw}
/* law 1 two-way: a thứ muội who holds a grudge does to her what she can do to the thứ muội (Ngáng chân) — once, in the Phúc tuyển week */
function kcFoulBack(){const F=BAL.entry.phuc.foul;const mu=kcRivalsTT().find(x=>x.r==="muoi");if(!mu||S.kc.tt.foul!=null)return null;S.kc.tt.foul=0;
 if((mu.oan||0)<netTh(mu,"oan")||!roll(F.od+(mu.oan||0)/F.oanDiv))return null;S.kc.tt.foul=1;S.sac=Math.max(0,S.sac-F.sac);S.danh=Math.max(0,S.danh-F.danh);
 log(`Phúc tuyển: ${mu.name} lén đổi hộp phấn, giấu trâm của ngươi. Sắc -${F.sac} · Danh -${F.danh}.`);return mu}
/* the ONE podium result: her mark + each girl's mark, places by mark (tie: higher Sắc, then her) — stored in S.kc.tt.pod, read by every place */
function kcPhucPod(){const T=S.kc.tt;if(T.pod)return T.pod;const L=[{id:"me",raw:T.raw,sac:S.sac}].concat(kcRivalsTT().map(m=>({id:m.id,raw:kcPhucMark(m),sac:m.sac||0})));
 L.sort((a,b)=>b.raw-a.raw||b.sac-a.sac||(a.id==="me"?-1:b.id==="me"?1:0));L.forEach((x,i)=>x.place=i+1);T.pod=L;T.place=(L.find(x=>x.id==="me")||{}).place;return L}
function kcScore(st){/* st: {sac,tai,duc,danh,arts?} — the same rule for her and for the other girls */
 const W=BAL.entry.w.kc;/* ONE CORE (review/origin-intros): weights in BAL.entry.w.kc, unchanged */const arts=st.arts?Math.max(0,...Object.values(st.arts)):0;
 return st.sac*W.sac+st.tai*W.tai+st.duc*W.duc+Math.min(W.danhCap,st.danh)*W.danh+arts*W.arts+(st.raw||W.raw0)*W.raw+(st.le||0)*W.le+(st.pow||W.pow0)*W.pow+(st.th||0)*W.th+(st.ld||0)*W.ld+(st.bonus||0)}
/* FIRSTCARD (law 4/7): the keep chance of Điện tuyển in ONE function (BAL.kc2.dienSel) read by the roll and by the card's odds word (the mean over the score noise) */
function kcDienSel(sc){const D=BAL.kc2.dienSel,C=KC.cut;return sc<C[0]-D.gap?0:cl(D.base+(sc-C[0])*D.k,D.lo,BAL.kcSelMax)}
function kcDienP(way){const n=BAL.kc2.dienSel.noise;const s0=kcMyScore0(way);let t=0;for(let i=-n;i<=n;i++)t+=kcDienSel(s0+i);return t/(2*n+1)}
function kcMyScore(way){return kcMyScore0(way)+R(2*BAL.kc2.dienSel.noise+1)-BAL.kc2.dienSel.noise}
function kcMyScore0(way){const t=S.kc.tt;const W=BAL.entry.w.kc;/* ONE CORE (review/origin-intros-r1): the way / ch / origin / vh / tdFall numbers read BAL.entry.w.kc, unchanged */return kcScore({sac:S.sac,tai:S.tai+(way==="tai"?W.way:0),duc:S.duc+(way==="duc"?W.way:0),danh:S.danh,arts:S.arts,raw:t.raw,le:S.kc.le,pow:kcPow(),th:(S.th||0)+(S.origin.k==="ch"?W.chTh:0),ld:S.kld,bonus:(S.kc.vh?W.vh:0)+(S.kc.tdFall?W.tdFall:0)+((S.origin&&S.origin.r)||0)*W.rW})}
function kcDienD(){return{who:pEmp(),t:`<p>Điện tuyển. Hoàng thượng và Thái hậu ngồi trên, từng hàng tú nữ quỳ dưới. Thái giám xướng tên ngươi${S.kc.tt.early?" (theo sớ tiến cử)":""}.</p>`,o:[
 kitRiskOpt(kcO("Đáp lời khiêm nhường",{},()=>kcDien("duc")),kcDienP("duc"),KC_TRAVE_W,true),kitRiskOpt(kcO("Đối đáp lanh lợi",{},()=>kcDien("tai")),kcDienP("tai"),KC_TRAVE_W,true)]}}
function kcDien(way){const sc=kcMyScore(way);const C=KC.cut;S.kc.tt.sc=Math.round(sc);
 /* the court keeps only some of the girls: a better score is a better chance, never a sure one */
 const pSel=kcDienSel(sc);S.kc.tt.p=Math.round(pSel);
 if(!pSel||!(window.__kcKeep||roll(pSel))){/* __kcKeep: test hook (dev/test/outside/route.js), never set by the game */pushDil(mkP("kcE",{e:"trave"}),"Trả thẻ bài");log("Điện tuyển: Hoàng thượng trả thẻ bài.");return}
 const rank=sc>=C[2]?2:sc>=C[1]?1:0;kcEnter(rank)}
/* D-SELX-FAIR (law 7, the family of trials that end the life): the «Trả thẻ bài» card first says WHY in numbers-as-words — Sơ tuyển: the points she met
   of the five and how many pass (BAL.kc2.soNeed); Điện tuyển: her score, the keep line (KC.cut[0]) and the keep chance she had (kcDienSel, the same roll) */
function kcTrialW(){try{const K=S.kc,W=typeof selxNumW==="function"?selxNumW:String;
 if(K.soOk===0&&K.soPts){const ok=K.soPts.filter(x=>x[1]);return `<p>Sơ tuyển: ma ma xét năm điều (${K.soPts.map(x=>x[0]).join(", ")}); ngươi đạt ${W(ok.length)}${ok.length?` (${ok.map(x=>x[0]).join(", ")})`:""}, phải đạt ${W(BAL.kc2.soNeed)} mới qua.</p>`}
 const T=K.tt;if(T&&T.sc!=null)return `<p>Điện tuyển: ngươi được ${W(Math.max(0,T.sc))} phần; mốc giữ thẻ bài là ${W(KC.cut[0])} phần. Cơ giữ thẻ lúc ấy: ${oddsChip(word(T.p||0))}</p>`}catch(e){console.error("kcTrialW",e)}return""}
function kcTraveD(){const tm=kcTmMan();const r=!!(S.tm96&&S.tm96.h>=80&&S.tm96.rise&&kcRare("kcR2",.6));const r5=S.duc>=70&&S.danh>=BAL.danhG.kcR5&&kcRare("kcR5",.6);
 if(!S.kc.suit.length)S.kc.suit.push(kcSuitor());const s=S.kc.suit[0];
 return{who:kcFace(kcR("cha")||S.kc.fam[0]),t:`${kcTrialW()}<p>Ngươi bị trả thẻ bài, về nhà. Cha thở dài: "Thôi thì gả cho nhà tử tế." Nhà ${s.n} đã đợi sẵn.</p>`,o:[
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
 const CY=BAL.kcg.carry;S.rank=rank=seatDown(S,rank);S.sung=CY.sung[0]+rank*CY.sung[1];S.lastPromo=S.turn;S.danh=Math.min(CY.danhMax,Math.round(S.danh*CY.danhK));S.bac=Math.min(CY.bacMax,S.bac+(fall?0:Math.round(S.khm*KC.dowry)));
 S.staff=K.staff0||[];S.place="home";if(S.maid)S.maid.loyal=cl(S.maid.loyal+BAL.eff.jkc.loyalKcEnter,0,100);kcPd(rank>=2?10:5,`vào cung, phong ${RANKS[rank].n}`);S.out=0;forgetSafe(S);S.pal=null;
 if(S.kc.tdFall){S.kc.hidden=1}
 /* the sister and friends who also passed enter as consorts (same score rule) */
 const L=[];for(const m of kcRivalsTT()){const raw=kcPhucMark(m);/* review/podium-wire: the same Phúc tuyển mark the podium showed (S.kc.tt.pod) */const sc=kcScore({sac:m.sac,tai:m.tai,duc:m.pduc,danh:m.danh,raw,pow:m.ppow==null?kcPow():m.ppow})+R(9)-4;
  if(sc>=KC.cut[0]&&roomFor("consort")){try{const v=newRival(sc>=KC.cut[2]?2:sc>=KC.cut[1]?1:0);v.name=m.name;v.age=Math.max(BAL.ageMin,m.age);v.fid=m.fid;v.sac=m.sac;v.tai=m.tai;v.trait=pick(TRAITS)[0];v.net=netOf(m).slice();delete v.trong;if(m.danh)v.danh=m.danh;
   rivals.push(v);try{/* ob-phu §9 «real relation values» (law 1 two-way): the girl's feeling for her (af, Oán) AND hers for the girl (m.me) cross into the palace, rates in BAL.kcg.carry.rel */const RL=BAL.kcg.carry.rel;affAdd(v,S,Math.round((m.af||0)*RL.af));if(m.me!=null)affAdd(S,v,Math.round(m.me*RL.me));if(m.oan)oanAdd(v,S,Math.round(m.oan*RL.oan))}catch(e){}try{k61Know(v,"người nhà",true,3)}catch(e){}m.pal=v.id;L.push(v)}catch(e){console.error(e)}}}
 try{palFix()}catch(e){}deal();
 const rk=RANKS[rank].n;if(fallCard)Q.push(fallCard);Q.push({t:"Nhập cung",who:pMe(),h:`<p>Điện tuyển: Hoàng thượng giữ thẻ bài, ban hoa. Ngươi vào cung, phong <b>${rk}</b>.</p>`+
  kitRows([["Mang theo",[kitChip("Bạc",S.bac,"n")+(fall?" (hồi môn bị tịch thu)":" (có hồi môn)"),`Danh ${S.danh}`],"t"],[fall?"Tỳ nữ thân tín":"Tỳ nữ hồi môn",S.maid?S.maid.name:"không","t"],["Đã biết trong cung",`${S.kc.intel.length} phi tần`,"t"]].concat(L.map(v=>[v.name,`cũng vào cung, ${RANKS[v.rank].n}`,"t"])))});
 log(`<b class="g">Vào cung theo kỳ tuyển tú: ${rk}.</b>`);kcSnapReset();try{if(typeof kcHook==="function")kcHook("enter",{rank})}catch(e){}tab="act";render()}

/* ---------- UI: tabs, top bar, panels, plaques, map (r2: rebuilt on today's kit: kitSubTabs §46, pager + pcard §37.1, kitRelRow §49.1,
   kitRows §51, kitSkillCard §21, pbtn / cardH act cards §6, k3row top-bar chip §31.12) ---------- */
const KCTABS={act:"Khuê phòng",go:"Dư đồ",rv:"Gia tộc",staff:"Giao du",art:"Tài nghệ",kid:"Thư từ",inv:"Tư trang",story:"Mệnh truyện"};/* 8 tabs = today's 8-column bar (Sổ ghi stays reachable through its links) */
const KCG={act:"khue",rv:"fam",staff:"soc",art:"art",kid:"mail"};
(function(){const r0=render;render=function(){/* unknown keys at home: jroad8 */const r=r0.apply(this,arguments);
 try{if(typeof tabsFitR==="function")tabsFitR();if(isKc()){kcHud();document.querySelectorAll("#tokens > p.empty").forEach(e=>e.remove());/* the scene line already says "Không gặp ai" */
}kcChipPaint()}catch(e){console.error(e)}return r}})();
function kcHud(){const r=$("me-r");if(r)r.textContent=kcTitle();const e=$("hud-sung");if(e){const sm=e.querySelector("small");if(sm){if(sm.dataset.ko0==null)sm.dataset.ko0=sm.innerHTML;sm.innerHTML=sm.dataset.ko0.replace(/Sủng|Chủ tin/,"Gia thanh")}const sp=e.querySelector("span");if(sp)sp.textContent=S.kgt;const u=e.querySelector("u");if(u)u.style.width=S.kgt+"%";e.title=HX.kgt}}
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{if(isKc())kcHud2()}catch(e){console.error(e)}return r}})();
/* #hud2 = the state cells the k3 top bar reads (rule glosses on tap): her home numbers instead of the palace ones */
function kcHud2(){const el=$("hud2");if(!el)return;const col=el.classList.contains("col");
 const c=(k,l,v,cls)=>`<button class="hc ${cls||""}${["buoi","date"].includes(k)?" keep":""}" data-hx="${k}">${l}${v!==""&&v!=null?` <b>${v}</b>`:""}</button>`;
 el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${col?"Mở ra":"Thu lại"}">${col?"▾":"▴"}</button>`+c("date",typeof VP==="object"&&VP.date?VP.date(S.month,S.year,S.tuan):`Tháng ${S.month}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${BAL.time.khac-used} khắc`)
  +c("sac","Sắc",S.sac)+c("tai","Tài",S.tai)+c("tamco","Tâm cơ",S.tamco)+c("duc","Đức",S.duc)+c("kgt","Gia thanh",S.kgt,S.kgt<BAL.kc2.st.kgtLow?"hot":"")+c("kap","Áp lực hôn sự",S.kap,S.kap>=BAL.kc2.st.kc.hot?"hot":"")+c("khm","Hồi môn",S.khm)
  +(S.kc.ldSeen?c("kld","Lời đồn",S.kld,S.kld>=50?"hot":""):"")+c("kty","Kỳ tuyển tú",`còn ${Math.max(0,kcMonthsLeft())} tháng`)+c("age","Tuổi",S.age)}
(function(){const h0=hudTween;hudTween=function(){if(!isKc())return h0.apply(this,arguments);const s=S.sung;S.sung=S.kgt;try{return h0.apply(this,arguments)}finally{S.sung=s}}})();
/* top bar line 1 (k3 #k3tt, the kit row builder k3row): "Tuyển tú còn N tháng" and, once it matters, "Áp lực hôn sự N" — the palace
   toilette chip ("Chưa điểm trang") is off at home (jtoil toilOn) */
function kcChipPaint(){try{const tt=document.getElementById("k3tt");if(!tt)return;const l1=tt.querySelector(".k3l1");tt.querySelectorAll('[data-k3^="kc"]').forEach(e=>{if(!isKc())e.remove()});if(!isKc()||!l1)return;
 const left=Math.max(0,kcMonthsLeft());const h=k3row("kcty","Tuyển tú",S.kc.tt?"đang tuyển":S.kc.so?"đã qua Sơ tuyển":`còn ${left} tháng`,"")+(S.kap>=BAL.kc2.st.kc.moi?k3row("kcap","Áp lực hôn sự",S.kap,S.kap>=BAL.kc2.st.kc.hot?"hot":""):"");
 const cur=[...l1.querySelectorAll('[data-k3^="kc"]')].map(e=>e.outerHTML).join("");if(cur===h)return;l1.querySelectorAll('[data-k3^="kc"]').forEach(e=>e.remove());l1.insertAdjacentHTML("beforeend",h)}catch(e){}}
(function(){let mo=null;const hook=()=>{const tt=document.getElementById("k3tt");if(!tt||mo)return;mo=new MutationObserver(()=>{if(isKc()&&!tt.querySelector('[data-k3^="kc"]'))kcChipPaint()});mo.observe(tt,{childList:true,subtree:true})};
 if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);hook();kcChipPaint();return r}}})();
window.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-k3="kcty"],[data-k3="kcap"]');if(!b||!isKc())return;e.stopImmediatePropagation();e.preventDefault();tab=b.dataset.k3==="kcty"?"story":"rel"/* Giao du = Giao tình at home (jroad8) */;render()},true);
try{if(typeof toilOn==="function"){const t0=toilOn;toilOn=function(){if(isKc())return false;return t0.apply(this,arguments)}}}catch(e){}
/* stage plaques: her family instead of the court (relations live on the person's card in Gia tộc) */
(function(){const k0=kitCourtRows;kitCourtRows=function(){if(!isKc())return k0.apply(this,arguments);if(!S||S.dead)return[];
 return S.kc.fam.filter(m=>m.alive&&["cha","me","di","to"].includes(m.r)).slice(0,3).map(m=>({k:"kcm_"+m.id,who:m.t,f:kcFace(m),mood:[kcAt(m),"n"],att:null}))}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-kc^="kcm_"]');if(!b||!isKc())return;e.stopPropagation();e.preventDefault();kcSel(b.dataset.kc.slice(4));tab="rv";render()},true);
function kcSel(id){const L=kcFamList("nha");const i=L.findIndex(m=>m.id===id);if(i>=0){PG.kcfam=i;KTSUB.kcfam="nha"}else{const F=kcFamList("ban");const j=F.findIndex(m=>m.id===id);if(j>=0){PG.kcban=j;KTSUB.kcfam="ban"}}}
(function(){const p0=renderPanel0;renderPanel0=function(){if(!isKc())return p0.apply(this,arguments);const el=$("panel");const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");
 let h="";if(tab==="art"||tab==="inv"){p0.apply(this,arguments);if(tab==="art")el.insertAdjacentHTML("beforeend",kcArtHTML());return}
 if(tab==="go"){h=kcMapHTML();/* ob-phu (owner 25/11 ~22:52Z «dư đồ phải là full cái screen»): every home map (Trong phủ, Kinh thành, the other home roads' maps) takes the SAME full-screen map mode as the palace Dư đồ (KIT §85.1/§85.6, j38 maptab), never the right half beside Khuê phòng; the plain list (Danh sách, a road without a painted map) stays beside the stage */
  if(gm&&!window.__mapList&&/class="mapv/.test(h))gm.classList.add("maptab")}else if(tab==="story")h=kcStoryHTML();else if(tab==="rv")h=kcFamHTML();else if(tab==="staff")h=kcSocHTML();else if(tab==="kid")h=kcMailHTML();else h=kcGroupHTML(KCG[tab]||"khue");
 const keep=el.dataset.tab===tab?el.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg="";try{kitFix(el)}catch(e){}panelScrollKeep(el,keep);if(!keep)requestAnimationFrame(()=>{el.scrollTop=0})/* the pane bar (kitPane) moves the sub-tab row after this render */}})();
function kcDoable(a){return !a.done&&!a.lock&&can(cardCost(a))&&canPay(a)}
function kcCardsH(L){return L.length?`<div class="cards">${L.map(([a,i])=>cardH(a,i)).join("")}</div>`:""}
function kcGroupHTML(g){return kcCardsH(deck.map((a,i)=>[a,i]).filter(([a])=>a.g===g))}
/* Tài nghệ: the base lessons (real minigames) stay as they are; the home teachers come as ONE skill card with their act cards */
function kcArtHTML(){const L=deck.map((a,i)=>[a,i]).filter(([a])=>a.g==="art");if(!L.length)return"";
 return kitSkillCard({kind:"info",k:"le",name:"Thầy dạy ở nhà",kicker:"Khuê các",level:S.kc.le,max:BAL.kc3.thay.leMax,word:"Lễ nghi",desc:"Ma ma xuất cung dạy lễ nghi cung đình; Lễ nghi cộng vào Phúc tuyển.",bar:false,next:"",acts:L.map(([a,i])=>cardH(a,i))})}
/* Giao du: hôn sự numbers as one kit table, then the act cards (k3CatTabs groups them) */
function kcSocHTML(){const s=S.kc.suit;const tm=S.tm96&&kcTmMan();
 return kitRows([[kitInfo("Áp lực hôn sự"),`${S.kap} trên 100`,S.kap>=BAL.kc2.st.kc.hot?"r":"t"],["Nhà cầu thân",s.length?s.map(x=>x.n):"chưa có","t"],["Danh",S.danh,"t"],tm?["Người ấy",`${tm.name} · ${S.kc.at.ftm?"đang ở "+KCPL[S.kc.at.ftm][0].toLowerCase():"không rõ ở đâu"}`,"t"]:null])+kcGroupHTML("soc")}
try{Object.assign(KIT_GLOSS,{"Áp lực hôn sự":`Mỗi tháng một tăng. Từ ${BAL.kc2.st.kc.moi} bà mối bắt đầu tới nhà; tới ${BAL.kc2.st.kc.dinh} cha định hôn. Đã ghi tên tuyển tú thì không nhà nào được dạm hỏi.`,"Gia thanh":HX.kgt,"Gia thế":"Danh dự, thế lực và của cải của nhà cha: Sơ tuyển, Điện tuyển và các nhà cầu thân đều xem."})}catch(e){}
/* Thư từ: what she truly knows of the harem — one kit person line per consort (stranger rule of the kit applies), then the letters */
function kcMailHTML(){const L=S.kc.intel.map(id=>RV(id)).filter(Boolean);
 const rows=L.length?`<div class="ktprows">${L.map(v=>`<div class="ktprow">${kitPersonLine(v,{sub:v.alive&&!v.out?`tính ${netTxt(v)} · sủng ${v.sung>=BAL.sungLv.kc[1]?"rất cao":v.sung>=BAL.sungLv.kc[0]?"khá":"ít"}${v.preg?" · mang thai":""}`:"đã không còn"})}</div>`).join("")}</div>`
  :kitEmpty("Ta chưa có thư từ",["Chưa biết ai trong cung thì chưa có thư để gửi.","Viết thư, mua tin, nghe chuyện ở trà lâu."],{topic:"Thư từ"});
 return `<h3>${kitInfo("Tin trong cung")}</h3>`+rows+kcGroupHTML("mail")}
try{KIT_GLOSS["Tin trong cung"]="Những gì ta biết thật về hậu cung, qua thư từ, trà lâu và người nhà. Vào cung vẫn nhớ."}catch(e){}
/* Gia tộc = sub-tabs Người nhà · Khuê hữu · Gia thế; a person = the Hậu cung pattern: pager strip + ONE kit person card */
function kcFamList(w){return S.kc.fam.filter(m=>m.alive&&(w==="ban"?/^ban/.test(m.r):!/^ban/.test(m.r)))}
function kcFamActs(m){return deck.map((a,i)=>[a,i]).filter(([a])=>a.who===m.id)}
function kcFamCard(m){const acts=kcFamActs(m);
 const rel=kitRel2([{head:`${m.t} → ta`,dir:"them",rows:[{w:"Thiện cảm",now:m.af==null?null:Math.round(m.af),kind:"good"}].concat(m.oan?[{w:"Oán",now:Math.round(m.oan),kind:"bad"}]:[]).map(r=>r.now==null?{w:r.w,unk:"chưa rõ"}:r)},{head:`Ta → ${m.t.toLowerCase()}`,dir:"me",rows:[m.me==null?{w:"Thiện cảm",unk:"chưa rõ"}:{w:"Thiện cảm",now:Math.round(m.me),kind:"good"}]}]);
 const tuyen=m.r==="muoi"||/^ban/.test(m.r)?[["Cùng đi tuyển tú",[`Sắc ${m.sac}`,`Tài ${m.tai}`,`Danh ${m.danh}`],"t"],["Nếu trúng tuyển","cùng ta vào cung làm phi tần, giữ nguyên tình cũ oán xưa","t"]/* ob-phu (owner 25/11 ~22:52Z «những người này sau này có còn xuất hiện ở trong cung»): the §9 carry-over shown at home */]:[];
 return pcard({f:kcFace(m),col:kcFace(m).col,name:m.name,rank:m.t,lines:[`${m.age} tuổi`,`Tính ${netTxt(m).toLowerCase()}`,`Đang ở ${kcAt(m).toLowerCase()}`],note:rel,tabKey:"kcfam",
  groups:[["Việc",tuyen.concat(acts.map(([a,i])=>cardH(a,i)))]],empty:"Lúc này chưa có việc nào làm được với người này."})}
function kcMaidCard(){const y=S.maid;const rel=kitRel2([{head:"Tỳ nữ → ta",dir:"them",rows:[{w:"Lòng trung",now:Math.round(y.loyal||0),kind:"good"}]}]);
 return pcard({f:pMaid(),col:pMaid().col,name:y.name,rank:"Tỳ nữ thân cận",lines:[y.age?`${y.age} tuổi`:"",`Theo hầu bên ta`].filter(Boolean),note:rel,tabKey:"kcfam",
  groups:[["Vào cung",[["Khi ta vào cung","theo ta làm tỳ nữ hồi môn, giữ nguyên lòng trung","t"]]]]})}
function kcFamHTML(){const nha=kcFamList("nha"),ban=kcFamList("ban");const rest=deck.map((a,i)=>[a,i]).filter(([a])=>a.g==="fam"&&!a.who);
 const cnt=L=>{const A=L.flatMap(kcFamActs);return{doable:A.filter(([a])=>kcDoable(a)).length,total:A.length}};
 const T=kitSubTabs("kcfam",[Object.assign({k:"nha",label:"Người nhà"},cnt(nha)),Object.assign({k:"ban",label:"Khuê hữu"},cnt(ban)),{k:"gia",label:"Gia thế",doable:rest.filter(([a])=>kcDoable(a)).length,total:rest.length}]);
 let h=T.html;
 if(T.cur==="gia")h+=kitRows([[kitInfo("Gia thanh"),S.kgt,S.kgt<BAL.kc2.st.kgtLow?"r":"t"],["Thế lực nhà",kcPow(),"t"],["Gia tư",S.kgtu,"t"],["Hồi môn cha mẹ hứa",kitChip("Bạc",S.khm,"n"),"t"],[kitInfo("Áp lực hôn sự"),S.kap,S.kap>=BAL.kc2.st.kc.hot?"r":"t"]])+kcCardsH(rest);
 else{const L=T.cur==="ban"?ban:nha.concat(S.maid&&!S.kc.kd?[{kcMaid:1}]:[]);/* ob-phu §5/§9: her tỳ nữ thân cận is a person of the house too (OUTSIDE_PLAN §5 roster) and her card says she follows her into the palace */const key=T.cur==="ban"?"kcban":"kcfam";h=L.length?`<div class="pgwrap"><div class="kpinline">${T.html}</div>`+pager(key,L.map(m=>m.kcMaid?{sz:"xs",f:pMaid(),name:"Tỳ nữ"}:({p:m,sz:"xs",f:kcFace(m),name:m.t==="Khuê hữu"?shortN(m.name):m.t})),i=>L[i].kcMaid?kcMaidCard():kcFamCard(L[i]))+`</div>`:T.html+kitEmpty("Nhà ta không còn ai",["Không còn người thân nào ở lại."],{topic:"Gia tộc"})}
 return h}
/* Dư đồ: sub-tabs Trong phủ · Kinh thành, one kit priced button per place (who is there; city = 1 khắc; why locked) */
function kcMapHTML(){const B=(k)=>{const P=KCPL[k];const w=kcGoWhy(k);const ppl=kcHere(k).map(m=>m.t.toLowerCase());const tmh=S.kc.at.ftm===k&&kcTmMan()?["người ấy"]:[];const who=ppl.concat(tmh);
  return pbtn(`class="opt" data-kcgo="${k}" title="${P[3].replace(/"/g,"")}"`,P[0],[kcCity(k)?`tốn: ${BAL.walk.near} khắc`:"",who.length?"người ở đây: "+who.join(" và "):"không gặp ai"].filter(Boolean).join(" · "),w||"")};
 /* law 6 real world (owner OB-PHU3): each road lists ONLY its own places — the base khuê các road (kc_*) never lists the other home roads' places (dn_ Nhà tranh / Ruộng nhà, nn_/nb_/np_ Thọ Xương cung …); roads with a kind (kd) are filtered by kc2Mine in jkc2 */
 const mineK=Object.keys(KCPL).filter(k=>/^kc_/.test(k)),inH=mineK.filter(k=>KCPL[k][2]),out=mineK.filter(k=>!KCPL[k][2]);
 const L0=[{k:"phu",label:"Trong phủ",n:inH.length},{k:"kinh",label:"Kinh thành",n:out.length}];/* reviewer kit-rcol-top-r1: no info band under tabs (owner 17/11 07:55Z) → the Ra phố ⓘ sits in the tab bar's trailing slot */
 const T=kitSubTabs("kcgo",L0,ktSubGet("kcgo",L0)==="kinh"?kitInfo("Ra phố","Ra phố cần tỳ nữ đi cùng; buổi tối không ra ngoài"):"");
 return T.html+`<div class="opts kcmap">${(T.cur==="kinh"?out:inH).map(B).join("")}</div>`}
try{KIT_GLOSS["Ra phố"]="Ra phố tốn một khắc mỗi chiều đi, phải có tỳ nữ đi cùng; buổi tối khuê nữ không ra ngoài. Chốn đông người dễ sinh lời đồn."}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kcgo]");if(!b||!isKc())return;e.stopPropagation();e.preventDefault();if(b.disabled)return;if(kcGo(b.dataset.kcgo)){tab="act";render()}},true);
/* Mệnh truyện ngoài cung: one kit skill card per thread (chapter label "Chương · Hồi", owner 15/11 20:30Z), then the facts table */
/* chapter-card-2 (owner #29 «every chapter place»): the khuê các threads (Chương ngoài cung / Tuyển tú / Thanh mai) are ONE kitSlide, not stacked cards; L = [{kicker,title,sub,desc,done}] */
function kcSlideHTML(L){let im="";try{im=typeof kitOriginWide==="function"?kitOriginWide(S.origin.k):kitOriginArt(S.origin.k)}catch(e){}
 return kitSlide("story-kc",L.map(x=>({kicker:x.kicker,title:x.title,sub:x.sub,img:im,body:kitRows([[x.rl||"Việc",x.desc]]),toc:[x.done?"done":"now",x.title,x.sub]})),{tocTitle:"Mục lục chương",tocAll:typeof ktChapToc==="function"?ktChapToc():null})}
function kcStoryHTML(){const k=S.origin.k;const n=[4,10,16].filter(x=>S.turn>=x).length;const bk=(()=>{try{return RARE97.book()}catch(e){return{}}})();const found=Object.keys(KCRARE).filter(x=>bk[x]).length;
 const nxt=[4,10,16].find(x=>S.turn<x);const tm=S.tm96&&kcTmMan();const left=Math.max(0,kcMonthsLeft());
 const step=S.kc.tt?(S.kc.tt.art?3:2):S.kc.soOk?2:S.kc.so?1:0;
 return kcSlideHTML([{kicker:"Chương ngoài cung",title:KCO[k].t,sub:`Hồi ${n}/3`,rl:"Hồi tới",desc:n>=3?"Đã trọn ba hồi.":`sau ${Math.max(0,nxt-S.turn)} tháng nữa.`,done:n>=3},
   {kicker:S.kc.tt?"Đang tuyển":`Còn ${left} tháng`,title:"Tuyển tú",sub:`Vòng ${step}/3`,rl:"Các vòng",desc:"Sơ tuyển · Phúc tuyển · Điện tuyển. Qua cả ba thì vào cung, phong tới Quý nhân.",done:step>=3}].concat(tm?[{kicker:tm.name,title:"Thanh mai trúc mã",sub:S.tm96.tok?"giữ tín vật":"chưa trao tín vật",rl:"Tín vật",desc:S.tm96.tok?"Ta giữ tín vật của chàng.":"Chưa trao tín vật.",done:!!S.tm96.tok}]:[]))
  +kitRows([["Kết hiếm ngoài cung đã gặp",`${found} trên ${Object.keys(KCRARE).length}`,"t"],["Phúc duyên khi qua tuyển tú","qua Sơ tuyển +5 · vào cung +5, Quý nhân +10","t"]])}
/* her own card */
(function(){const s0=selfCardHTML;selfCardHTML=function(){if(!isKc())return s0.apply(this,arguments);
 return pcard({f:pMe(),col:"#b08a8a",name:S.name,rank:kcTitle(),lines:[`${S.age} tuổi`,S.origin.n],note:`Kỳ tuyển tú còn ${Math.max(0,kcMonthsLeft())} tháng.`,tabKey:"kcme",
  groups:[["Tư chất",[["Sắc",S.sac,"t"],["Tài",S.tai,"t"],["Tâm cơ",S.tamco,"t"],["Đức",S.duc,"t"],["Sức",S.suc,"t"],["Bạc",kitChip("Bạc",S.bac,"n"),"t"],["Danh",S.danh,"t"]]],
   ["Nhà",[["Gia thanh",S.kgt,"t"],["Áp lực hôn sự",S.kap,S.kap>=BAL.kc2.st.kc.hot?"r":"t"],["Hồi môn",kitChip("Bạc",S.khm,"n"),"t"]]]].concat(typeof kcuHonorRows==="function"&&kcuHonorRows(1).length?[["Danh hiệu thi tài",kcuHonorRows(5)]]:[])})}})();
/* the title screen slot line */
/* the Chọn sổ rows say who the sổ is through j74 slotWho (one place, kc lives included); the old #slots .slot text patch is gone with the old rows */

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
 const n=Object.keys(X).length;if(!n)return;/* a failed / empty refetch never wipes the last good list (law 11: every timed figure loader) */const was=Object.keys(KCFX).length;KCFX=X;if(n!==was)try{if(isKc())render()}catch(e){}}).catch(()=>{})}catch(e){}}
kcFigLoad();setInterval(kcFigLoad,300000);
function kcDress(){return S&&S.origin&&(S.origin.k==="thd"||(S.origin.k==="td"&&!kcLore()))?"ngheo":"kc"}/* KC LORE: td is a Thị lang's daughter until the day she leaves home: khuê các dress; only thd is poor */
function kcBand(age){return ageBandIx(age)}
function kcDressRec(fid,tier,age){const X=fid&&KCFX[fid];const L=X&&X[tier];if(!L||!L.length)return null;const w=kcBand(age==null?BAL.ageMin:age);/* the band of her age, else the nearest one */
 let b=null,bd=9;for(const f of L){const d=Math.abs(BAL.ageArt.indexOf(f.ageBand||BAL.ageArt[0])-w);if(d<bd){bd=d;b=f}}return b}
function kcDressSrc(fid,kind,tier,age){const f=kcDressRec(fid,tier||kcDress(),age==null&&S?S.age:age);if(!f)return"";return figPath(kind==="por"?(f.por||f.file):f.file)}
window.kcDressSrc=kcDressSrc;
(function(){const g0=figFor;figFor=function(p,kind){try{if((isKc()||typeof NLP!=="undefined"&&NLP&&S&&S.kcPick==="nha"&&kcOk(S.origin.k))&&p){/* r2: the identity card shows the home dress once "Ở nhà" is picked */const who=p===S?S:typeof figWho==="function"?figWho(p):null;
  if(who===S){const k=S.pid||S.fid||(typeof figPick==="function"?figPick(S):"");const s=kcDressSrc(k,kind);if(s)return s}}}catch(e){}return g0.apply(this,arguments)}})();
/* her sister shares her home; the friends are daughters of officials (khuê các) */
(function(){const k0=kcPor;kcPor=function(m,kind){try{if(isKc()&&m&&m.fid&&(m.r==="muoi"||/^ban/.test(m.r))){const s=kcDressSrc(m.fid,kind==="fig"?"fig":"por",m.r==="muoi"?kcDress():"kc",m.age);if(s)return s}}catch(e){}return k0.apply(this,arguments)}})();

/* ---------- re-port onto the 11/15 main (review/outside-r2): palace-only parts of today's UI stay off while she is at home ---------- */
/* bottom tabs: the consort's 8 tabs and groups at home too (maid-8tabs; jroad8 ROAD8 says what each shows) */
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
 moi:[["Xin cha cho xem mặt","nhà trai hẹn ngày đến; áp lực hôn sự tăng","an toàn"],["Thưa: con đợi","cha có thể đồng ý, hoặc phật ý","có rủi ro"],["Nhận lời","xuất giá; nhưng kiếp này dừng ở ngoài cung","an toàn"]],
 dinhhon:[["Vâng lời","xuất giá; nhưng kiếp này dừng ở ngoài cung","an toàn"],["Quỳ xin cha","cha có thể trả sính lễ; không thì vẫn bị gả","có rủi ro"]],
 dinhhon2:[["Lên kiệu hoa","xuất giá; nhưng kiếp này dừng ở ngoài cung","an toàn"],["Cắt tóc","xuất gia; nhưng kiếp này dừng ở cửa chùa","an toàn"],["Thắt cổ","thoát cảnh ép gả; nhưng mất mạng, kiếp này dừng","an toàn"]],
 chieu:[["Ghi tên","nhà thôi bàn chuyện gả ta, chờ kỳ tuyển tú","an toàn"],["Xin cha lo","không phải đi tuyển; nhà sẽ lo gả chồng","an toàn"],["Xin tổ mẫu","không phải đi tuyển; nhà sẽ lo gả chồng; tổ mẫu phật ý (nhiều)","an toàn"]],
 so:[["Ra mắt","qua hay không tùy dung mạo, sức khỏe, tiếng tăm và gia thế","có rủi ro"],["Dúi bạc","dễ qua hơn","có rủi ro"],["Nhờ tổ mẫu","dễ qua hơn; tổ mẫu phật ý (nhiều)","có rủi ro"]],
 phuc:[["Dâng","tài nghệ dâng lên cộng vào Điện tuyển","an toàn"],["Để tài nghệ","lấy phần giữa, cộng vào Điện tuyển","an toàn"]],
 dien:[["Đáp lời","Đức nặng hơn; giữ thẻ bài hay không, không bao giờ chắc","có rủi ro"],["Đối đáp","Tài nặng hơn; giữ thẻ bài hay không, không bao giờ chắc","có rủi ro"]],
 trave:[["Gả cho","xuất giá; nhưng kiếp này dừng ở ngoài cung","an toàn"],["Xin ở vậy","Tài cao hay nhà thầy đồ thì thành nữ phu tử; không thì vẫn bị gả; nhưng đường nào cũng vậy, kiếp này dừng ngoài cung","an toàn"],["Cắt tóc","xuất gia; nhưng kiếp này dừng ở cửa chùa","an toàn"]]};
/* the non-bạc road of every bạc choice (owner 15/11 20:30Z: same value, by how hard bạc is to earn at home — about 10–20 bạc a month) */
const KCALT={
 phan:()=>{const d=kcR("di");return d?[((rp)=>kitRiskOpt(kcO("Thử một chút lên cổ tay",{suc:-10},()=>kcDo("Hộp phấn lạ",()=>{if(roll(rp())){apply({sac:-2});S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return"Cổ tay nổi mẩn đỏ. Ngươi giữ hộp phấn làm chứng."}return"Không có gì lạ."})),()=>rp()))(()=>BAL.kc2.kcCard.thuMotChutLen_rb+(nv(d,"kcPowder")))]:[]},
 bac:()=>{const t=kcR("to"),h=kcR("huynh");return t&&h?[kcO("Xin tổ mẫu đứng ra trả nợ",{suc:-10},()=>kcDo("Thua bạc",()=>{kcAf(h,BAL.eff.jkc.bac);h.me+=BAL.eff.jkc.meBac;kcAf(t,BAL.eff.jkc.bac_2);return"Tổ mẫu trả nợ, mắng huynh trưởng một trận, rồi nhìn ngươi không vui."}))]:[]},
 dithai:()=>{const d=kcR("di");return d?[kcO("Thêu yếm cho đứa bé",{suc:-15},()=>kcDo("Di nương có thai",()=>{kcAf(d,BAL.eff.jkc.dithai);return"Nàng cầm chiếc yếm, nhìn đường kim một lúc."}))]:[]},
 thuc:()=>[kcO("Hồi âm, gửi kèm bức thêu",{suc:-20},()=>kcDo("Thư từ trong cung",()=>{kcIntel(2,3);return"Người trong cung nhận bức thêu, hứa để mắt giúp."}))],
 tmrise:()=>[kcO("Gửi một bài thơ chúc mừng",{suc:-10},()=>kcDo("Người ấy đỗ đạt",()=>{S.tm96.h=Math.min(100,S.tm96.h+6);return"Chàng gửi lại một bài thơ."}))],
 dich:()=>[[kcO("Ở yên trong khuê phòng, xông ngải cứu",{suc:-20},()=>kcIll(22)),22],[kcO("Đi chùa giúp sắc thuốc cho dân",{suc:-35},()=>kcIll(60,()=>{apply({duc:6,danh:4});return"Cả kinh thành nhắc tên ngươi."})),60]].map(([o,p])=>kitRiskOpt(o,kcIllLive(p,o.fx),KC_DICH_W,true)),
 gianhan:()=>{const d=kcR("di");return [((rp)=>kitRiskOpt(kcO("Nhờ tỳ nữ dò hỏi hắn",{suc:-5},()=>kcDo("Gia nhân",()=>{if(S.maid)S.maid.loyal=cl(S.maid.loyal-BAL.eff.jkc.loyalGianhan,0,100);if(d&&roll(rp())){S.kc.proof[d.id]=(S.kc.proof[d.id]||0)+1;return `Tỳ nữ về kể: ${d.t.toLowerCase()} từng mua thuốc lạ năm xưa.`}return"Toàn chuyện cũ không đâu."})),()=>(d?rp():0)))(()=>BAL.odb.jkc.rlGianhan),
  kcO("Tiễn hắn ra tận cổng",{suc:-10},()=>kcDo("Gia nhân",()=>{apply({duc:1});return""}))]},
 chieu:()=>{const t=kcR("to");return t&&S.kap>=BAL.kc2.st.kc.mien?[kcO("Xin tổ mẫu nói với cha cho miễn tuyển",{suc:-10},()=>kcDo("Chiếu tuyển tú",()=>{S.kc.mien=1;kcAf(t,BAL.eff.jkc.chieu);return"Tổ mẫu gật đầu. Ngươi sẽ không phải đi tuyển; nhà sẽ lo chuyện gả chồng."}))]:[]},
 so:()=>{const t=kcR("to");return t&&t.af>=10?[kitRiskOpt(kcO("Nhờ tổ mẫu viết thư gửi ma ma",{suc:-5},()=>{kcAf(t,BAL.eff.jkc.so);kcSoGo(true)}),kcSoOk(true)?BAL.odds.hi:BAL.odds.lo,KC_TRAVE_W,true)]:[]}};
const KCO_H=[["cha hài lòng, thế lực nhà thêm chút ít","an toàn"],["cha phật ý chút ít, Đức tăng","an toàn"]];
(function(){const P0=PEND.kcE;PEND.kcE=pp=>{const d=P0(pp);if(!d)return d;try{const e=pp.e;const add=(KCALT[e]?KCALT[e](pp):[]).filter(o=>!o.dis);
  if(add.length){const k=d.o.findIndex(o=>o.r97);if(k<0)d.o.push(...add);else d.o.splice(k,0,...add)}
  const H=KCH[e]||[];d.o.forEach((o,i)=>{if(o.hint&&!(o.__rkLoss&&String(o.hint).startsWith("nhưng ")))return;/* FIRSTCARD: a kitRiskOpt loss with no hint of its own gets the table hint before it */if(o.r97){o.hint="cơ duyên hiếm: một kết cục khác hẳn; nhưng kiếp này dừng ngoài cung";/* FIRSTCARD: every kcEnd ends this life */o.risk="an toàn";return}
   const h=/^o\d$/.test(e)?KCO_H[i]:H.find(x=>String(o.n).startsWith(x[0]));if(h){const [hint,risk]=h.length>2?h.slice(1):h;o.hint=o.__rkLoss?kitRiskHint(hint,o.__rkLoss):hint;o.risk=risk}})}catch(x){console.error("jkc hints",x)}return d}})();
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
