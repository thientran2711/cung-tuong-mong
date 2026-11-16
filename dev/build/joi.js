/* ================= joi: ORIGIN INTROS (review/origin-intros, Foreman C worker, 16/11) =================
   Owner lines (verbatim: dev/rules/topic/story-roads.md): OD:L1244 (every origin: a NARRATED intro with ILLUSTRATIONS, an ENTRY animation,
   the entry rank has a REASON like a real tuyển tú), OD:L1250 (origin rank = ceiling, earned at the selection), OD:L1251, OD:L1288 (co-op:
   each player's own entry, nobody waits), OD:L1259 (story first), OD:L1261 (scenes end with ONE button), OD:L1267 (ONE CORE).
   Plan: dev/STORY_ROADS_PLAN.md "Origin intros (OD:L1244)". Built ON review/entry-exam (jentry: the selection exam, ONE score rule entBase /
   BAL.entry, the "Tiền truyện" card, the entry scene) — nothing of it is rebuilt here:
   1. INTRO PANELS: jentry's single "Tiền truyện" card becomes 3–4 narrated scene panels per origin (KIT §14 kitPanel({scene:true}) +
      §28.17 kitSceneArt picture frame + kitTiles on the last panel: origin, highest rank of this selection, the selection, what it weighs).
      Pictures img/intro/<k>-<n>.webp (direct road 1..4, home road 1, 2, h3); until a picture is on the CDN the frame shows the KIT §59
      event placeholder (kitPhTone). Every origin incl. the hòa thân branches (nc Nam Chiếu, bd Bắc Địch), cn, cnv.
      Direct road: 4 panels → the selection. Home road (jkc tiểu thư, jkc2 thôn quê / cố quốc): panels 1, 2, h3 → the home road's own card.
   2. REASON on every result card ("Vì sao"): the part of her score furthest above / below an ordinary new girl (BAL.entry.why.ref × the road's
      own weights BAL.entry.w) in words of the judges of that road (Hoàng thượng để mắt, Thái hậu khen / nói giúp, Hoàng hậu chê, ma ma…).
      Direct road (kc2SelDo), cung nữ / hòa thân home roads (kc2Enter), tiểu thư Điện tuyển (kcDien → kcEnter / kcTraveD).
   3. The selection of each road is NAMED for what it is: hòa thân direct = "Lễ ra mắt" (welcome audience, bá quan + sứ thần), cn = "Xét phong
      danh phận" (Thái hậu looks at the maid the Emperor kept), cnv = "Tuyển cung nữ" (already jkc2), consorts = "Tuyển chọn".
   4. ENTRY ANIMATION (palace gate → selection hall): KIT REQUEST (no kit part; dev/handover/reports/review-origin-intros.md). The seam is
      here: oiGate(kind) calls window.kitEntryGate({kind,origin,road}) once per life right before the first in-palace selection card of
      her road, if the kit part exists; until then the entry scene stays jentry's kitPersonReveal (after "Nhập cung").
   New lives only (S.oiV); every older save (no S.oiV) keeps what it had. Co-op: her own cards only (no sync, no waiting, OD:L1288). */
const OI_V=1;
function oiK(){return (S&&S.origin&&S.origin.k)||""}
function oiQueen(){try{return liveRivals(false).some(v=>v.queen)}catch(e){return false}}
/* ---------- 1. the narration (cổ trang, VANPHONG; the narrator says "ngươi" as every story card does) ----------
   a = panels 1–2 (both roads unless the origin has its own home pair `ha`), d = panels 3–4 of "Vào cung ngay", h = panel 3 of the home road */
const OI_TXT={
 tt:{a:["Phủ Tể tướng ở phía đông kinh thành, đèn đuốc thâu đêm. Cha ngươi đứng đầu bá quan; một lời của ông, nửa triều đình nghiêng theo.",
   ()=>`Hoàng thượng ${oiEmp()} mới lên ngôi, triều cục chưa yên. Ai cũng biết: hậu cung sẽ nhìn ngươi như nhìn cái bóng của cha ngươi.`],
  d:["Chiếu chỉ gọi con gái các nhà công khanh vào cung. Cha đặt tay lên vai ngươi: “Nhà ta cần một người đứng bên Hoàng thượng.”",
   "Sáng sớm, kiệu rời phủ. Mẹ tiễn tới cổng, không dám khóc. Phía trước là Ngọ môn, và buổi tuyển chọn trước ngày phong."],
  h:"Chiếu tuyển tú ba năm mới có một lần. Cha muốn ngươi ở nhà học thêm, chờ kỳ tới, để vào cung cho xứng với tên nhà."},
 dtq:{a:["Cha ngươi giữ binh quyền biên ải. Ngươi lớn lên giữa tiếng trống trận và bãi tập ngựa, chân cứng đá mềm.",
   "Hoàng thượng cần lòng trung của Đại tướng quân; ngươi là sợi chỉ buộc lòng trung ấy vào cung cấm."],
  d:["Thư cha từ biên ải chỉ có một dòng: “Vào cung, giữ mình, đừng làm nhục nhà tướng.”",
   "Ngươi cởi áo cưỡi ngựa, khoác áo gấm. Kiệu đưa ngươi về phía cửa cung, nơi tiếng trống không còn vọng tới."],
  h:"Kỳ tuyển tú còn xa. Mẹ muốn ngươi học cho ra dáng khuê nữ trước đã: đàn, thêu, lễ nghi, những thứ bãi tập ngựa không dạy."},
 muoi:{a:["Nhà ngươi giàu nhờ muối: thuyền muối của cha ngươi đi khắp các bến sông phương nam.",
   "Bạc mua được lụa gấm, mua được một chỗ trong sổ tuyển; nhưng người ta vẫn gọi sau lưng ngươi là con nhà buôn."],
  d:["Cha chất lên kiệu ba rương bạc: “Trong cung, bạc mở được nhiều cửa. Nhưng đừng để ai thấy con chỉ có bạc.”",
   "Kiệu qua phố chợ, người ta chỉ trỏ. Rồi tường đỏ hiện ra, cao hơn mọi kho muối ngươi từng thấy."],
  h:"Cha muốn chờ kỳ tuyển tú: thêm mấy năm, ngươi học chữ, học đàn, học cách đi đứng của con nhà quan."},
 cn:{a:["Ba năm nay ngươi hầu trà ở Càn Thanh cung. Ngươi biết Hoàng thượng thích nước trà thứ hai, biết thái giám nào nói thật, ma ma nào ăn bạc.",
   "Một đêm mưa, Hoàng thượng giữ ngươi lại. Sáng hôm sau, cả Càn Thanh cung nhìn ngươi bằng ánh mắt khác."],
  d:[()=>`Khẩu dụ truyền xuống: cung nữ ${oiName()} được ban danh phận. Nhưng Thái hậu muốn tự mình xem mặt trước đã.`,
   "Ngươi theo thái giám qua những hành lang quen thuộc, lần đầu không phải cúi đầu bưng khay trà."],
  h:"Ngươi vẫn hầu trà ở Càn Thanh cung, chờ một lời của Hoàng thượng."},
 nc:{a:["Nam Chiếu ở xa về phương nam, nơi hồ Nhĩ Hải phẳng như gương, sơn trà nở quanh năm.",
   "Hòa ước đổi lấy mười năm yên ổn nơi biên giới; cái giá của hòa ước là ngươi. Thái hậu không ưa người ngoại tộc."],
  d:["Sứ đoàn đi ba tháng đường. Đêm cuối trên đất cũ, ngươi giấu một cánh sơn trà khô vào tay áo.",
   "Kinh thành Đại Hy rộng lớn và xa lạ. Lễ bộ đã dọn lễ ra mắt; cả triều sẽ nhìn công chúa ngoại quốc."],
  h:"Hòa ước còn đang bàn. Phụ vương cho ngươi ở lại cố quốc thêm ít năm, học tiếng nói và lễ nghi Đại Hy trước khi lên đường."},
 bd:{a:["Thảo nguyên Bắc Địch mênh mông, gió thổi rạp cỏ tới chân trời. Ngươi cưỡi ngựa trước khi biết đi hài thêu.",
   "Phụ hãn đổi hòa ước mười năm với Đại Hy bằng ba trăm con ngựa, và bằng ngươi."],
  d:["Ngươi tết tóc lần cuối theo kiểu thảo nguyên. Các nữ quan Đại Hy đứng chờ, tay cầm bộ áo gấm và đôi hài thêu.",
   "Đoàn ngựa dừng ngoài cửa thành. Từ đây ngươi ngồi kiệu, và cả triều Đại Hy đang chờ xem công chúa thảo nguyên."],
  h:"Hòa ước còn đang bàn. Phụ hãn cho ngươi ở lại thảo nguyên thêm ít năm, học tiếng Đại Hy bên bếp lửa lều nỉ."},
 td:{a:["Phủ nhà ngươi bị niêm phong trong một đêm. Một bản sớ vu cáo, và cả nhà ngươi bị xử trảm.",
   ()=>`Kẻ dâng sớ là ${S.foeDad||"kẻ thù của cha ngươi"}.${S.foe?` Con gái hắn, ${S.foe}, đang ở trong cung.`:""}`],
  ha:["Cha ngươi làm Thị lang, thanh liêm mà nhiều kẻ ghét. Phủ nhà còn đủ người, còn tiếng cười của em trai út.",
   "Trong triều có kẻ đang dựng chuyện hại cha ngươi; cả nhà chưa ai hay."],
  d:["Người thế giao của cha đổi tên ngươi trong sổ tuyển. Từ nay ngươi mang một cái tên không phải của mình.",
   "Ngươi đến cửa cung với cái tên mới trên môi và mối thù chưa ai hay."],
  h:"Chiếu tuyển tú còn xa. Ngươi ở nhà chờ kỳ tuyển, chưa biết những năm này là những năm cuối cùng cả nhà còn bên nhau."},
 ch:{a:["Thái hậu là cô ruột của ngươi; từ nhỏ ngươi đã quen từng lối đi trong Từ Ninh cung.",
   "Thái hậu muốn một người nhà mình đứng cạnh Hoàng thượng. Có người chống lưng là may, nhưng phẩm vị vẫn phải tự mình giành lấy."],
  d:["Thái hậu gửi ra một cây trâm ngọc: “Vào cung đi. Ai gia chỉ mở cửa, còn bước qua là việc của con.”",
   "Kiệu đi qua Ngọ môn. Lần này ngươi không đến thăm cô, mà đến để được chọn."],
  h:"Thái hậu dặn chờ kỳ tuyển tú: vào cung đường hoàng qua ba vòng tuyển, không ai nói được là nhờ cô."},
 thd:{a:["Cha ngươi là thầy đồ nghèo; nhà chỉ có mấy giá sách cũ và một mái tranh dột.",
   "Văn chương của ngươi lọt tai quan huyện, tên ngươi vào sổ tuyển. Ngoài chữ nghĩa, ngươi không có gì mang theo."],
  d:["Cha gói cho ngươi bộ áo lành nhất và một quyển sách chép tay: “Chữ nghĩa là của hồi môn duy nhất cha có.”",
   "Ngươi lên thuyền của Nội vụ phủ. Kinh thành mở ra trước mắt, rộng hơn mọi trang sách."],
  h:"Kỳ tuyển tú còn mấy năm. Ngươi ở nhà dạy chữ giúp cha, và học thêm những thứ sách không dạy."},
 cnv:{a:["Lệnh tuyển cung nữ về tới làng. Nhà ngươi nghèo, nợ chồng lên nợ; tên ngươi được ghi vào sổ.",
   "Vào cung làm cung nữ thì có bổng gửi về, nhưng phải mười năm mới được thả ra. Mẹ ngươi khóc cả đêm."],
  d:["Một bọc áo, một lời mẹ dặn: “Vào cung thì cúi đầu mà sống, đừng tranh với ai.”",
   "Xe của Nội vụ phủ chở đầy những cô gái như ngươi. Ma ma đứng đợi ở cửa sau cung, tay cầm sổ."],
  h:"Thái giám Nội vụ phủ còn chưa về tới huyện. Ngươi ở làng thêm ít lâu, học thêu, học phép tắc, chờ ngày tuyển."}};
/* picture captions (the frame's title / alt) — the ART LIST in the report describes each scene in full */
const OI_CAP={tt:["Phủ Tể tướng","Triều cục","Chiếu chỉ","Rời phủ","Ở nhà chờ tuyển"],dtq:["Biên ải","Lòng trung","Thư cha","Lên kiệu","Khuê các"],
 muoi:["Bến muối","Con nhà buôn","Rương bạc","Tường đỏ","Ở nhà chờ tuyển"],cn:["Trà Càn Thanh","Đêm mưa","Khẩu dụ","Hành lang",""],
 nc:["Nhĩ Hải","Hòa ước","Sứ đoàn","Kinh thành","Cố quốc"],bd:["Thảo nguyên","Ngựa hồi môn","Tết tóc","Ngoài cửa thành","Lều nỉ"],
 td:["Phủ bị niêm phong","Bản sớ","Đổi tên","Cửa cung","Thị lang phủ","Bản sớ ngầm"],ch:["Từ Ninh cung","Người nhà Thái hậu","Trâm ngọc","Ngọ môn","Chờ tuyển"],
 thd:["Mái tranh","Sổ tuyển","Sách chép tay","Thuyền về kinh","Lớp chữ"],cnv:["Lệnh tuyển","Đêm ở làng","Lời mẹ dặn","Cửa sau cung","Làng quê"]};
function oiEmp(){try{return empName()}catch(e){return""}}
function oiName(){return (S&&S.name)||""}
function oiT(x){return typeof x==="function"?x():String(x||"")}
function oiArt(k,n){return `img/intro/${k}-${n}.webp`}
/* which panels this life gets: [[picture key, text, caption], …] */
function oiPanels(home){const k=oiK();const T=OI_TXT[k];if(!T)return [];const C=OI_CAP[k]||[];
 const tdHome=home&&k==="td"&&T.ha&&(typeof kcLore!=="function"||kcLore());
 const a=tdHome?T.ha:T.a,ca=tdHome?[C[4],C[5]]:[C[0],C[1]];
 const L=[[oiArt(k,tdHome?"h1":1),a[0],ca[0]],[oiArt(k,tdHome?"h2":2),a[1],ca[1]]];
 if(home&&T.h)L.push([oiArt(k,"h3"),T.h,k==="td"?"Chờ tuyển":C[4]]);else if(!home)L.push([oiArt(k,3),T.d[0],C[2]],[oiArt(k,4),T.d[1],C[3]]);
 return L}
/* the selection of this road: its name, its judges, the highest rank it can give */
function oiSel(home){const k=oiK();const o=S.origin||{};const top=o.r||0;const K=S.kc||{};
 if(k==="cnv")return{head:"Tuyển cung nữ",top:"Hầu phi tần bậc cao"};
 if(k==="nc"||k==="bd")return{head:"Lễ ra mắt",top:RANKS[top].n};
 if(k==="cn")return{head:"Xét phong danh phận",top:RANKS[top].n};
 if(home&&!K.kd)return{head:"Ba vòng tuyển tú",top:RANKS[2].n};/* jkc Điện tuyển: rank 0..2 (kcDien) */
 return{head:"Tuyển chọn",top:RANKS[top].n}}
function oiAlso(){try{return entCtx({}).also||""}catch(e){return"Sắc, Tài, Đức, tài nghệ"}}
function oiPanelSpec(P,i,n,home){const k=oiK();const [src,txt0,cap]=P;const txt=oiT(txt0);const last=i===n-1;
 const tone=typeof kitPhTone==="function"?kitPhTone(txt):"light";const fb=(typeof KIT_PH!=="undefined"&&KIT_PH.ev&&KIT_PH.ev[tone])||"img/ph-event-light.webp";
 /* §59: a key not on the CDN index (KIT_CDNHAVE, kitPhOnCdn) shows the placeholder at once; the onerror fallback stays for the rest */
 let on=true;try{on=typeof kitPhOnCdn!=="function"||kitPhOnCdn(src)}catch(e){}
 const pic=typeof kitSceneArt==="function"?kitSceneArt(on?src:fb,cap||"",{shape:"wide",fb}):"";
 let tail="";if(last){const X=oiSel(home);tail=kitTiles([["Xuất thân",S.origin.n],["Cao nhất kỳ này",X.top],[home?"Rồi sẽ qua":"Sắp qua",X.head],["Xét theo",oiAlso()]])}
 return{scene:true,kind:"notice",title:`Tiền truyện · ${S.origin.n}`,sub:`${i+1}/${n}`,html:pic+`<p>${txt}</p>`+tail,cls:"koi",btn:last?(home?"Tiếp theo":k==="cnv"?"Theo ma ma":"Vào cung"):"Tiếp theo",
  onClose:last&&!home?()=>{try{oiGate("dir")}catch(e){console.error(e)}}:null}}
function oiBuild(home){const L=oiPanels(home);return L.map((P,i)=>{const sp=oiPanelSpec(P,i,L.length,home);const m=kitPanel(sp);const j=Q.indexOf(m);if(j>=0)Q.splice(j,1);m.oiP=i+1;m.entI=1;return m})}
/* after jentry (it put ONE "Tiền truyện" card, or the origin painting on the home road's first card): the panels take that place */
(function(){const a0=nlAccept;nlAccept=function(){const was=typeof NLP!=="undefined"&&NLP;const r=a0.apply(this,arguments);
 try{if(was&&S&&!S.dead&&!S.oiV&&OI_TXT[oiK()]){S.oiV=OI_V;const home=!!S.kc;const P=oiBuild(home);
  if(P.length){let i=Q.findIndex(m=>m.entI&&!m.oiP);
   if(!home&&i>=0)Q.splice(i,1,...P);else{if(i<0)i=Q.findIndex(m=>!m.nl);Q.splice(Math.max(0,i),0,...P)}
   oiNameSel();showModal();render()}}}catch(e){console.error("oiIntro",e)}return r}})();

/* ---------- 3. the selection named for what it is (direct road card of jkc2 PEND.kc2Sel; jentry exam frame heading) ---------- */
const OI_SELT={nc:()=>`<p>Điện Thái Hòa. Hoàng thượng ngồi trên, Thái hậu ngồi bên, bá quan hai hàng; sứ thần ${S.origin.k==="bd"?"Bắc Địch":"Nam Chiếu"} đứng chờ ngoài thềm. Công chúa dâng lễ ra mắt. Hòa ước cho ngươi được phong tới <b>${RANKS[S.origin.r||0].n}</b>; được hay không là ở lễ hôm nay.</p>`,
 cn:()=>`<p>Từ Ninh cung. Thái hậu cho gọi cung nữ được Hoàng thượng giữ lại${oiQueen()?"; Hoàng hậu ngồi bên":""}. Hoàng thượng muốn ban cho ngươi danh phận tới <b>${RANKS[S.origin.r||0].n}</b>; Thái hậu gật đầu hay không là ở buổi hôm nay.</p>`};
OI_SELT.bd=OI_SELT.nc;
function oiNameSel(){const k=oiK();const X=oiSel(false);const m=Q.find(x=>x.pid==="kc2Sel");if(!m)return;if(X.head&&k!=="cnv")m.t=X.head;if(OI_SELT[k])m.h=OI_SELT[k]()}
(function(){if(typeof entCtx!=="function")return;const c0=entCtx;entCtx=function(o){const X=c0.apply(this,arguments);try{const k=oiK();if(S&&S.oiV&&X&&!X.srv&&!(o&&o.phuc)&&X.road==="dir"){
 if(k==="nc"||k==="bd"){X.head="Lễ ra mắt";X.judge="Hoàng thượng, Thái hậu, bá quan, sứ thần"}else if(k==="cn"){X.head="Xét phong danh phận";X.judge=oiQueen()?"Thái hậu, Hoàng hậu":"Thái hậu"}}}catch(e){}return X}})();

/* ---------- 2. the reason line ("Vì sao") on every result card ---------- */
/* parts: [key, contribution vs an ordinary new girl]; weights = the road's own (BAL.entry.w), refs = BAL.entry.why.ref */
/* not played ("Để tài nghệ quyết định" / "Cúi đầu chờ xét" = entSkipRaw): the mark is not hers to praise or blame */
function oiSkipped(raw,art){try{return !art||raw===entSkipRaw()}catch(e){return !art}}
function oiParts(road,raw,art){const W=BAL.entry.w[road]||BAL.entry.w.dir;const F=BAL.entry.why.ref;let lv=0;try{lv=entArtLv(entKind(art))}catch(e){}
 const P=[["sac",(W.sac||0)*((S.sac||0)-F.sac)],["duc",(W.duc||0)*((S.duc||0)-F.duc)],["tai",(W.tai||0)*((S.tai||0)-F.tai)],["raw",oiSkipped(raw,art)?0:(W.raw||0)*(raw-F.raw)],["art",(W.art||0)*(lv-F.art)],["th",(W.th||0)*((S.th||0)-F.th)]];
 try{const std=(W.base||0)+(W.sac||0)*(S.sac||0)+(W.duc||0)*(S.duc||0)+(W.tai||0)*(S.tai||0)+(W.suc||0)*(S.suc||0)+(W.raw||0)*raw+(W.art||0)*lv+(W.th||0)*(S.th||0);P.push(["home",entBase(road,raw,art)-std-F.home])}catch(e){}
 return P}
function oiPartsKc(raw,way){const W=BAL.entry.w.kc;const F=BAL.entry.why.ref;const arts=Math.max(0,...Object.values(S.arts||{}));
 return [["sac",W.sac*((S.sac||0)-F.sac)],["tai",W.tai*((S.tai||0)+(way==="tai"?6:0)-F.tai)],["duc",W.duc*((S.duc||0)+(way==="duc"?6:0)-F.duc)],["danh",W.danh*(Math.min(W.danhCap,S.danh||0)-F.danh)],
  ["art",W.arts*(arts-F.art)],["raw",W.raw*(raw-F.raw)],["th",W.th*((S.th||0)-F.th)]]}
function oiArtN(art){try{const k=entKind(art);return k&&KG82_KIND[k]?KG82_KIND[k].n:((ARTS.find(a=>a.k===art)||{}).n||"")}catch(e){return""}}
/* words by judge group: g = "maid" (Nội vụ phủ ma ma), "bride" (hòa thân: bá quan, sứ thần), "consort" */
function oiWord(key,pos,g,A,way){const maid=g==="maid";const Q0=oiQueen();
 const W={sac:pos?(maid?"Ma ma khen ngươi sáng sủa, nhanh nhẹn":"Hoàng thượng để mắt tới dung mạo của ngươi"):(maid?"Ma ma chê ngươi lam lũ, kém sắc":"Dung mạo của ngươi không làm Hoàng thượng để ý"),
  duc:pos?(maid?"Ma ma thấy ngươi thật thà, biết phép":way==="duc"?"Lời đáp khiêm nhường của ngươi làm Thái hậu hài lòng":"Thái hậu khen ngươi đoan trang, biết lễ"):(maid?"Ma ma chê ngươi chưa biết phép tắc":Q0?"Hoàng hậu chê ngươi chưa thuộc lễ":"Thái hậu chê ngươi chưa thuộc lễ"),
  tai:pos?(way==="tai"?"Lời đối đáp lanh lợi của ngươi làm Hoàng thượng chú ý":"Lời ăn tiếng nói có học của ngươi lọt tai Hoàng thượng"):"Ngươi đối đáp vụng về, không ai để ý",
  raw:pos?(maid?`Tay nghề ${A||"của ngươi"} làm ma ma gật đầu`:`Màn ${A||"tài nghệ"} của ngươi làm cả điện lặng đi`):(maid?`Tay nghề ${A||"của ngươi"} còn vụng`:`Màn ${A||"tài nghệ"} của ngươi vấp váp trước điện`),
  art:pos?`Ngươi vốn giỏi ${A||"tài nghệ"}, giám khảo nhìn ra ngay`:`${A?A+" của ngươi":"Tài nghệ của ngươi"} còn non`,
  th:pos?"Thái hậu nói giúp ngươi một lời":g==="bride"?"Thái hậu vốn không ưa người ngoại tộc":"Thái hậu không ưa ngươi",
  danh:pos?"Tiếng tốt của ngươi đã đến tai trong cung":"Tiếng tăm của ngươi chưa ai biết tới",
  home:pos?(maid?"Lời lý trưởng và tiếng khéo tay trong xóm theo ngươi tới đây":g==="bride"?"Lễ nghi Đại Hy học kỹ ở cố quốc và lời tâu của sứ thần giúp ngươi":"Những năm ở nhà giúp ngươi")
   :(maid?"Lời ra tiếng vào trong xóm theo ngươi tới tận đây":g==="bride"?"Lễ nghi Đại Hy của ngươi còn vụng":"Những năm ở nhà không giúp được gì")};return W[key]||""}
/* tier 2: what lifted her; tier 1: what lifted her, but what held her back; tier 0: what held her back */
function oiWhy(P,tier,g,A,way){const L=P.filter(p=>isFinite(p[1])&&Math.abs(p[1])>=.5).sort((a,b)=>b[1]-a[1]);const up=L.find(p=>p[1]>0),dn=L.slice().reverse().find(p=>p[1]<0);
 const U=up?oiWord(up[0],true,g,A,way):"",D=dn?oiWord(dn[0],false,g,A,way):"";
 if(tier>=2)return U||(g==="maid"?"Ma ma ghi tên ngươi vào hàng đầu":"Hoàng thượng giữ thẻ bài, ban hoa");
 if(tier===1)return U&&D?`${U}; nhưng ${/^(Thái hậu|Hoàng|Ma ma|Lễ nghi|Lời)/.test(D)?D:D.charAt(0).toLowerCase()+D.slice(1)}`:U?`${U}, nhưng chưa đủ để ${g==="maid"?"được chia về hầu phi tần bậc cao":"được phong cao nhất"}`:(D||"Không ai chê, cũng không ai khen");
 return D||(g==="maid"?"Ma ma không để ý tới ngươi":"Hoàng thượng không để ý tới ngươi")}
function oiGroup(){const k=oiK();return k==="cnv"?"maid":(k==="nc"||k==="bd")?"bride":"consort"}
function oiRow(why){return kitRows([["Vì sao",why,"t"]])}
function oiPut(c,why){if(!c||!why||c.oiWhy)return;c.oiWhy=1;const h=String(c.h||"");const i=h.indexOf('<p class="past">');c.h=i>=0?h.slice(0,i)+oiRow(why)+h.slice(i):h+oiRow(why)}
/* direct road */
(function(){if(typeof kc2SelDo!=="function")return;const d0=kc2SelDo;kc2SelDo=function(raw){const r=d0.apply(this,arguments);
 try{const X=S&&S.selx;if(S.oiV&&X&&X.tier!=null&&!X.why){X.why=oiWhy(oiParts("dir",raw,X.art),X.tier,oiGroup(),oiArtN(X.art));oiPut(Q.find(m=>/^Nhập cung/.test(m.t||"")),X.why);log(`Vì sao: ${X.why}.`)}}catch(e){console.error("oiWhy dir",e)}return r}})();
/* cung nữ / hòa thân home roads */
(function(){if(typeof kc2Enter!=="function")return;const e0=kc2Enter;kc2Enter=function(raw){const r=e0.apply(this,arguments);
 try{const K=S&&S.kc;const X=K&&K.ex;if(S.oiV&&X&&X.tier!=null&&!X.why){const road=K.kd==="dan"?"dan":"nc";X.why=oiWhy(oiParts(road,raw,X.art||""),X.tier,oiGroup(),oiArtN(X.art));
  oiPut(Q.find(m=>/^Nhập cung/.test(m.t||"")),X.why);log(`Vì sao: ${X.why}.`)}}catch(e){console.error("oiWhy home",e)}return r}})();
/* tiểu thư: Điện tuyển (jkc kcDien) → kcEnter ("Nhập cung") or the returned tablet (kcTraveD) */
(function(){if(typeof kcDien!=="function")return;const d0=kcDien;kcDien=function(way){const T=S&&S.kc&&S.kc.tt;const raw=T?T.raw:5;const r=d0.apply(this,arguments);
 try{if(S.oiV&&T&&!T.why){const C=KC.cut;const sc=T.sc;const tier=S.kc.inPal?(S.kc.r>=2?2:S.kc.r>=1?1:0):-1;
  T.why=oiWhy(oiPartsKc(raw,way),tier<0?0:tier,"consort",oiArtN(T.art),way);T.whyT=tier;if(tier>=0){oiPut(Q.find(m=>/^Nhập cung/.test(m.t||"")&&!m.oiWhy),T.why)}log(`Vì sao: ${T.why}.`)}}catch(e){console.error("oiWhy kc",e)}return r}})();
(function(){if(typeof kcTraveD!=="function")return;const t0=kcTraveD;kcTraveD=function(){const d=t0.apply(this,arguments);
 try{const T=S&&S.kc&&S.kc.tt;if(d&&S.oiV&&T&&T.why&&T.whyT<0)d.t=String(d.t||"")+oiRow(T.why)}catch(e){}return d}})();

/* ---------- 4. ENTRY ANIMATION seam (KIT REQUEST: kitEntryGate, palace gate → selection hall) ----------
   kind: "consort" (sedan: tt dtq muoi ch thd td) · "bride" (bridal sedan + envoy: nc; + horses: bd) · "maid" (cnv: maids behind a mama) ·
   "corridor" (cn: the Càn Thanh corridor). Once per life, right before her first selection card inside the palace. No kit part → nothing plays. */
function oiGateKind(){const k=oiK();return k==="cnv"?"maid":(k==="nc"||k==="bd")?"bride":k==="cn"?"corridor":"consort"}
function oiGate(road){if(!S||S.oiGate||!S.oiV)return;S.oiGate=1;if(typeof window.kitEntryGate!=="function")return;
 try{window.kitEntryGate({kind:oiGateKind(),origin:oiK(),road:road||"dir",to:oiSel(road==="home").head})}catch(e){console.error("kitEntryGate",e)}}
/* home roads: the first card that happens INSIDE the palace (tiểu thư Phúc tuyển / early Điện tuyển, hòa thân Lễ ra mắt, cung nữ entry card) */
(function(){const s0=showModal;showModal=function(){try{const m=Q[0];if(m&&S&&S.oiV&&!S.oiGate&&S.kc&&/^(Phúc tuyển|Điện tuyển|Lễ ra mắt|Nhập cung làm cung nữ)$/.test(m.t||""))oiGate("home")}catch(e){}return s0.apply(this,arguments)}})();
window.oiPanels=oiPanels;window.oiWhy=oiWhy;window.OI_TXT=OI_TXT;
