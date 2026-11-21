/* ================= jentry: ENTRY SELECTION EXAM · ORIGIN INTRO · ENTRY SCENE (review/entry-exam, Foreman D, 16/11) =================
   Owner lines (verbatim in dev/rules/topic/story-roads.md, balance-economy.md, art-animations.md): OD:L1244 (narrated intro with
   illustrations + entry animation + a minigame exam, high score → the top rank of that selection, fail → lower), OD:L1250 (the origin's
   rank is only the CEILING, earned by tài, đức, abilities; patronage opens the ceiling), OD:L1251, OD 07:20Z (no word games),
   OD 07:25Z (medium difficulty), OD:L1261 (every animation scene ends with ONE short button), OD:L1267 (ONE CORE: numbers in BAL.entry).
   Plugs into the hooks left by review/kc-roads-cn-nc (jkc2): window.kcEntryExam({art,title,note}, done(raw 0..10)) and the "Nhập cung" cards.
   1. entExam(o, fin): ONE selection round in the shared mini-game frame (kg82Open, the jexam pattern: judges / subject / difficulty /
      what else counts / the odds words, "Bắt đầu thi" or "Để tài nghệ quyết định"). The subject is an art she chose on the card; a word
      game (BAL.entry.word) is never played: it is swapped for her best non-word art. Board difficulty = mgTier occ "tuyen" (review/mg-balance).
      Used by every road: "Vào cung ngay" (kc2Sel), the cung nữ / hòa thân home roads (kc2Exam), and the
      tiểu thư Phúc tuyển (jkc kcPhucPlay: same frame, same no-word rule; its Điện tuyển rule stays jkc's own).
   2. entScore(road, raw, art): the ONE score rule (BAL.entry.w[road]) that jkc2 kc2Score / kc2SelDo now call; entTier → ceiling / −1 / −2.
      BAL.entry.fx[tier]: gain or loss of the result itself on every path (also when the ceiling is Đáp ứng: muoi, td, thd now meet the exam too).
   3. entIntro: a narrated "Tiền truyện" event card with the origin's own painting (img/origin-wide-<k>) at the start of every new life
      (before the selection on the direct road, before the home road's own first card).
   4. entReveal: the entry scene after the "Nhập cung" card = KIT §65.2 kitPersonReveal (her full figure, kit name, one line, ONE kit button
      that alone closes it: counts as the §81 scene-end button). KIT REQUEST in dev/handover/reports/entry-intro.md for a dedicated entry animation.
   New lives only (S.entV); every older save is untouched. Co-op: everything here is her own state (no sync, no waiting on the friend). */
const ENT_V=1;
function entWordy(k){return (BAL.entry.word||[]).includes(k)}
function entKind(a){if(!a)return"";if(typeof KG82_PLAIN!=="undefined"&&KG82_PLAIN[a])return KG82_PLAIN[a];return (typeof KG82_KIND!=="undefined"&&KG82_KIND[a])?a:""}
function entArtLv(k){try{return k?kg82LvFor(S,k):0}catch(e){return 0}}
/* her best arts that are NOT word games (Y thuật only for the tea maid of Càn Thanh) */
function entArts(){const L=[];for(const a of (typeof ARTS!=="undefined"?ARTS:[])){if(a.k==="y"&&!(S&&S.origin&&S.origin.k==="cn"))continue;const k=entKind(a.k);if(!k||entWordy(k))continue;L.push([a.k,(S.arts||{})[a.k]||0,a.n])}
 return L.sort((x,y)=>y[1]-x[1])}
function entBest(not){const L=entArts().filter(x=>!(not||[]).includes(x[0]));return L.length?L[0][0]:"cam"}
function entRoad(){const K=S&&S.kc;if(K&&K.kd==="dan")return"dan";if(K&&K.kd==="nc")return"nc";return"dir"}
/* ---------- the ONE score rule ---------- */
function entBase(road,raw,art){const W=BAL.entry.w[road]||BAL.entry.w.dir;const K=(S&&S.kc)||{};const k=entKind(art);
 let s=(W.base||0)+(W.sac||0)*(S.sac||0)+(W.duc||0)*(S.duc||0)+(W.tai||0)*(S.tai||0)+(W.suc||0)*(S.suc||0)+(W.raw||0)*raw+(W.art||0)*entArtLv(k)+(W.th||0)*(S.th||0);
 if(W.le)s+=W.le*(K.le||0);if(W.kim)s+=(K.kim||0)*W.kim[(k==="kim"||k==="theu")?0:1];if(W.kgt)s+=W.kgt*(S.kgt||0);if(W.kld)s+=W.kld*(S.kld||0);
 try{if(road==="dan"){const ly=kcR("ly");if(ly&&ly.af>=40)s+=W.ly||0;if(K.self)s+=W.self||0}if(road==="nc"){const sx=kcR("sx");if(sx&&sx.af>=40)s+=W.sx||0}}catch(e){}
 return s}
function entScore(road,raw,art){const n=BAL.entry.noise;return entBase(road,raw,art)+R(2*n+1)-n}
function entTier(sc){const C=BAL.entry.cut;return sc>=C[1]?2:sc>=C[0]?1:0}
/* chance (0..100) that the result reaches tier t with this mini-game mark (the noise is the only unknown) → shown as ladder words only */
function entOdds(road,raw,art,t){const b=entBase(road,raw,art),n=BAL.entry.noise;let c=0;for(let i=-n;i<=n;i++)if(entTier(Math.round(b+i))>=t)c++;return Math.round(c*100/(2*n+1))}
/* reviewer r1 (ONE CORE): the shared odds ladder j1 word(), not a copy of its thresholds */
function entWord(p){return word(p)}
/* no game played: the mark of a girl of her level in her best art (= the frame's "Để tài nghệ quyết định") */
function entBotRaw(){const b=BAL.entry.bot;return cl(b.min+R(b.r),0,b.max)}/* review/errand-bal: one bot / broken-round score (BAL.entry.bot) */
function entSkipRaw(){try{return Math.round(kg82NpcMean(entArtLv(entKind(entBest()))))}catch(e){return 4}}
function entFx(t){const f=BAL.entry.fx[t];if(f&&Object.keys(f).length)try{apply(f)}catch(e){console.error(e)}}
/* who judges, what the top result is called, per road */
function entCtx(o){const road=entRoad();const k=S.origin&&S.origin.k;const top=(S.origin&&S.origin.r)||0;const srv=k==="cnv";
 if(o&&o.phuc)return{road:"",head:"Phúc tuyển",judge:"Ma ma, nữ quan Nội vụ phủ",also:"cộng vào Điện tuyển cùng Sắc, Tài, Đức, Danh"};
 if(srv)return{road,head:"Tuyển cung nữ",judge:"Ma ma Nội vụ phủ",also:`Sắc, Đức${road==="dan"?", khéo tay và lễ nghi học ở nhà, tiếng trong xóm, lời lý trưởng":""}`,topN:"phi tần bậc cao",srv:1};
 if(road==="nc")return{road,head:"Lễ ra mắt",judge:"Hoàng thượng, Thái hậu, bá quan",also:"Sắc, Tài, Đức, lễ nghi Đại Hy, lòng Thái hậu, lời sứ thần",topN:RANKS[top].n};
 return{road,head:"Tuyển chọn trước ngày phong",judge:"Hoàng thượng, Thái hậu",also:`Sắc, Tài, Đức, tài nghệ${(S.th||0)>=20?", lòng Thái hậu":""}`,topN:RANKS[top].n,flat:top<=0}}
/* ---------- 1. the exam round ---------- */
function entExam(o,fin){o=o||{};let art=o.art||"";let k=entKind(art);if(!k||entWordy(k)){art=entBest();k=entKind(art)}
 const K=KG82_KIND[k];const lv=entArtLv(k);let t=null;try{t=mgSet(k,{occ:"tuyen",lv})}catch(e){KG82.lv=lv}KG82.ctx="thi";try{kg82Preload(k)}catch(e){}
 const SK=Math.round(kg82NpcMean(lv));let over=false;const end=raw=>{if(over)return;over=true;try{fin(raw,{art,kind:k})}catch(e){console.error(e)}};
 const X=entCtx(o);/* review/origin-intros: the frame names the selection of this road (Lễ ra mắt, Xét phong danh phận, Tuyển cung nữ…) */
 const d=kg82Open({art:String(X.head||"Tuyển chọn").replace(/ trước ngày phong$/,""),title:`Môn thi · ${K.n}`,how:K.how,round:"Vòng",roundV:"1/1",pic:kg82Pic(k)});if(!d){end(SK);return}
 const rows=[["Giám khảo",X.judge,"t"],["Môn thi",`${K.n} · ${K.t}`,"t"],["Độ khó",t?mgDiffTxt(t,k):`bậc ${lv}`,"n"],["Xét thêm",X.also,"n"]];
 if(X.road&&X.topN){const G=BAL.mgTier.word[3];const pS=entOdds(X.road,SK,art,2),pG=entOdds(X.road,G,art,2);
  rows.push([X.flat?"Được để mắt":X.srv?"Về hầu phi tần bậc cao":`Lên tới ${X.topN}`,`để tài nghệ quyết định: ${entWord(pS)} · chơi xuất sắc: ${entWord(pG)}`,"n"])}
 const box=kg82Box();KG82.phase="intro";
 const keepN=rows.filter(r=>r[0]==="Độ khó"||/^(Lên tới|Được để mắt|Về hầu)/.test(r[0]));/* mg-intro-2: Độ khó + the road row; the rest behind the kit «!» */
 box.innerHTML=kgBangRows(X.head,rows,keepN.length?keepN:rows.slice(0,2))+
  `<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu thi</button>${kitQuick({id:"kg82skip",n:"Để tài nghệ quyết định",sub:`tính ${SK}/10, như người cùng bậc`})}</div>`;
 const after=(raw,sk)=>{KG82.phase="result";kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");
  kg82ShowRes(kg82Rows([["Màn chơi",`${raw}/10 · ${kg82Word(raw)}${sk?" (để tài nghệ quyết định)":""}`,"t"],["Kết quả",o.note||"tính cùng Sắc, Tài, Đức","n"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`);
  $("kg82ok").onclick=()=>{kg82Close();end(raw)}};
 kgReady(box,{kind:k,ev:"sys:tuyen-tu"});/* KIT §13.7 */
 $("kg82go").onclick=()=>kg82Play(k,raw=>after(raw,false));$("kg82skip").onclick=()=>after(SK,true)}
/* the ONE seam (contract set by review/kc-roads-cn-nc-r1 at jkc2 kc2Play): kcEntryExam(kind, done(raw 0..10), info{art,origin,title,note}) */
window.kcEntryExam=function(kind,fin,info){if(kind&&typeof kind==="object"){const o=kind;kind=null;info=o}info=info||{};entExam(Object.assign({},info,{kind}),fin)};
window.entExam=entExam;window.entScore=entScore;window.entTier=entTier;
/* tiểu thư road (jkc): Phúc tuyển offers her best NON-word art and plays it in the same exam frame */
kcBestArt=function(){return entBest()};
kcPhucPlay=function(k,skip){if(!isKc()||!S.kc.tt||S.kc.tt.done)return;S.kc.tt.play=1;
 const fin=raw=>{if(S.kc.tt.done)return;S.kc.tt.done=1;S.kc.tt.raw=raw;S.kc.tt.art=k;pushDil(mkP("kcE",{e:"dien"}),"Điện tuyển");try{showModal()}catch(e){}};
 if(skip||window.__bot||typeof kg82Open!=="function"){fin(skip?entSkipRaw():entBotRaw());return}/* reviewer r1: one "not playing" value (entSkipRaw) on every road */
 try{window.kcEntryExam("kc",raw=>fin(raw),{art:k,origin:S.origin&&S.origin.k,title:"Phúc tuyển",note:"điểm màn chơi cộng vào Điện tuyển",phuc:1})}catch(e){console.error(e);fin(entSkipRaw())}};
/* the result's own gain / loss on every road (rank is set by jkc2), and no "demotion" scene for a rank set at entry */
function entSnap(){try{if(typeof kmSnap==="function"){KMS=S;KMSNAP=kmSnap()}}catch(e){}}
(function(){const d0=kc2SelDo;kc2SelDo=function(raw){const r=d0.apply(this,arguments);try{if(S&&S.selx&&S.selx.tier!=null&&!S.selx.fx){S.selx.fx=1;entFx(S.selx.tier)}}catch(e){console.error(e)}entSnap();return r}})();
(function(){const e0=kc2Enter;kc2Enter=function(raw){const r=e0.apply(this,arguments);try{const X=S&&S.kc&&S.kc.ex;if(X&&X.tier!=null&&!X.fx){X.fx=1;entFx(X.tier)}}catch(e){console.error(e)}entSnap();return r}})();

/* ---------- 3. the narrated intro (Tiền truyện), one per origin, with the origin's painting ---------- */
const ENT_INTRO={
 tt:["Phủ Tể tướng đèn đuốc suốt đêm. Cha ngươi đứng đầu bá quan; một lời của ông, nửa triều đình nghiêng theo.","Chiếu chỉ gọi con gái nhà quyền thần vào cung. Ai cũng biết: Hoàng hậu sẽ nhìn ngươi như nhìn cái bóng của cha ngươi."],
 dtq:["Cha ngươi giữ binh quyền biên ải. Ngươi lớn lên giữa tiếng trống trận và bãi tập ngựa, chân cứng đá mềm.","Hoàng thượng cần lòng trung của Đại tướng quân; ngươi là sợi chỉ buộc lòng trung ấy vào cung cấm."],
 muoi:["Nhà ngươi giàu nhờ muối: thuyền muối của cha ngươi đi khắp các bến sông phương nam.","Bạc mua được lụa gấm, mua được một chỗ trong sổ tuyển; nhưng trong cung, người ta vẫn gọi sau lưng ngươi là con nhà buôn."],
 cn:["Ba năm nay ngươi hầu trà ở Càn Thanh cung. Ngươi biết Hoàng thượng thích nước trà thứ hai, biết thái giám nào nói thật, ma ma nào ăn bạc.","Một đêm mưa, Hoàng thượng giữ ngươi lại. Từ cung nữ thành chủ tử chỉ cách một lời khẩu dụ, và bao nhiêu ánh mắt."],
 nc:["Cao Ly ở xa về phương đông, nơi biển Hải Đông xanh thẫm, hoa mai nở đầu xuân.","Hòa ước đổi lấy mười năm yên ổn nơi biên giới; cái giá của hòa ước là ngươi. Thái hậu không ưa người nước phiên."],
 pf:["Phù Tang ở ngoài bể Đông: núi lửa đội tuyết, chuông chùa ngân trên sóng. Ngươi lớn lên giữa hương trầm và tiếng sáo trúc ở kinh đô Nại Lương.","Phụ hoàng gả ngươi sang Đại Hy theo thuyền sứ vượt bể, mong hòa ước giữ yên đường biển cho thuyền buôn hai nước."],
 bd:["Thảo nguyên Bắc Địch mênh mông, gió thổi rạp cỏ tới chân trời. Ngươi cưỡi ngựa trước khi biết đi giày thêu.","Ba trăm con ngựa theo ngươi làm của hồi môn, đổi lấy hòa ước mười năm với Đại Hy."],
 td:["Cả nhà ngươi bị xử trảm vì một bản sớ vu cáo. Người thế giao đổi tên ngươi trong sổ tuyển để giữ một đường sống.","Ngươi vào cung với cái tên không phải của mình, mang theo mối thù chưa ai hay."],
 ch:["Thái hậu là cô ruột của ngươi; từ nhỏ ngươi đã quen từng lối đi trong Từ Ninh cung.","Thái hậu muốn một người nhà mình đứng cạnh Hoàng thượng. Có người chống lưng là may, nhưng phẩm vị vẫn phải tự mình giành lấy."],
 thd:["Cha ngươi là thầy đồ nghèo; nhà chỉ có mấy giá sách cũ và một mái tranh dột.","Văn chương của ngươi lọt tai quan huyện, tên ngươi vào sổ tuyển. Ngoài chữ nghĩa, ngươi không có gì mang theo."],
 cnv:["Lệnh tuyển cung nữ về tới làng. Nhà ngươi nghèo, nợ chồng lên nợ; tên ngươi được ghi vào sổ.","Một bọc áo, một lời mẹ dặn: vào cung thì cúi đầu mà sống."]};
/* Ba Tư for new bd lives (owner OD 19/11; THE one per-life switch bdTxt, jrd_bd.js): an old-premise life keeps the Bắc Địch lines above */
if(typeof bdTxtProp==="function")["Ba Tư ở xa tận phía tây, cuối con đường tơ lụa; lửa thánh cháy trong đền ngày đêm không tắt, ngựa quý và bạc trắng nổi tiếng khắp các nước.",
 "Quân Đại Thực đã lấy ba phần đất nước. Phụ vương gả ngươi sang Đại Hy, mong một nước lớn làm chỗ dựa."].forEach((t,i)=>bdTxtProp(ENT_INTRO.bd,i,ENT_INTRO.bd[i],t));
/* pf (review/phutang-road): no origin-wide-pf picture yet (art request in reports/phutang-road.md FOR E) -> the neutral hòa thân picture */
(function(){if(typeof kitOriginWide!=="function")return;const w0=kitOriginWide;kitOriginWide=function(k){return k==="pf"?"img/ev-hoa-than.webp":w0.apply(this,arguments)}})();
function entIntroCard(){const k=S.origin&&S.origin.k;const T=ENT_INTRO[k];if(!T)return null;
 const road="Kiếp này ngươi vào cung ngay.";
 return{t:`Tiền truyện · ${S.origin.n}`,who:pMe(),art:(typeof kitOriginWide==="function"?kitOriginWide(k):`img/origin-wide-${k}.webp`),btn:"Tiếp theo",entI:1,
  h:T.map(x=>`<p>${x}</p>`).join("")+`<p>${road}</p>`}}
/* a home road (jkc Khuê các, jkc2 thôn quê / cố quốc) already opens with its own narrated card (the family is still alive there, the draft
   or the treaty still to come), so it only gets the origin painting when its card has none; the direct road and the co-op wait get Tiền truyện */
(function(){const a0=nlAccept;nlAccept=function(){const was=typeof NLP!=="undefined"&&NLP;const r=a0.apply(this,arguments);
 try{if(was&&S&&!S.dead&&!S.entV){S.entV=ENT_V;const k=S.origin&&S.origin.k;
  if(S.kc){const c=Q.find(m=>!m.nl&&!m.opts&&!m.art&&(m.t==="Khuê các"||m.who));if(c&&k){c.art=typeof kitOriginWide==="function"?kitOriginWide(k):`img/origin-wide-${k}.webp`;c.entI=1}}
  else{const c=entIntroCard();if(c&&!Q.some(m=>m.entI)){Q.unshift(c)}}showModal();render()}}catch(e){console.error("entIntro",e)}return r}})();

/* ---------- 4. the entry scene after the "Nhập cung" card (her own button closes it) ---------- */
const ENT_LINE={tt:"Cửa cung khép lại sau lưng; từ nay tiếng của cha chỉ vọng tới qua người khác.",dtq:"Tiếng trống biên ải ở lại phía sau; trong cung chỉ có tiếng chuông giờ.",
 muoi:"Rương bạc theo ngươi qua cửa cung; ánh mắt người ta theo rương bạc.",cn:"Lối hành lang Càn Thanh cung vẫn thế; chỉ có người đi trên đó là đã khác.",
 nc:"Kiệu hoa qua Ngọ môn; tiếng nhạc cố quốc tắt ở bên kia cửa.",pf:"Thuyền sứ Phù Tang neo lại ở bến; ngươi lên kiệu, tiếng sóng ở lại sau lưng.",bd:"Ba trăm con ngựa dừng ngoài cửa thành; ngươi đi tiếp một mình.",
 td:"Ngươi bước qua cửa cung, đầu cúi thấp, tên mới trên môi.",ch:"Từ Ninh cung ở ngay bên kia vườn; nhưng con đường của ngươi phải tự mình đi.",
 thd:"Một bọc sách, một bộ áo sạch: ngươi bước vào nơi chữ nghĩa cũng là gươm.",cnv:"Ma ma đi trước, ngươi theo sau, qua những cánh cửa đỏ không đếm xuể."};
if(typeof bdTxtProp==="function")bdTxtProp(ENT_LINE,"bd",ENT_LINE.bd,"Đoàn lạc đà chở bạc dừng ngoài Kim Quang môn; ngươi đi tiếp một mình.");/* Ba Tư (bdTxt) */
function entReveal(){if(!S||S.dead||S.entIn||!S.entV)return;S.entIn=1;const srv=!!S.srv;const k=S.origin&&S.origin.k;
 const sub=`${S.origin?S.origin.n:""} · ${srv?"Cung nữ":RANKS[S.rank]?RANKS[S.rank].n:""}`;
 try{if(typeof kitPersonReveal==="function")kitPersonReveal({who:S,title:srv?"Nhập cung làm cung nữ":"Nhập cung",sub,line:ENT_LINE[k]||"",btn:srv?"Theo ma ma":"Tạ ơn"})}catch(e){console.error("entReveal",e)}}
(function(){const s0=showModal;showModal=function(){try{const m=Q[0];if(m&&S&&S.entV&&!S.entIn&&!m.opts&&!m.entR&&/^Nhập cung/.test(m.t||"")){m.entR=1;if(!m.btn)m.btn="Tiếp theo";const c0=m.onClose;m.onClose=function(){try{if(c0)c0.apply(this,arguments)}catch(e){console.error(e)}entReveal()}}}catch(e){console.error(e)}
 return s0.apply(this,arguments)}})();
