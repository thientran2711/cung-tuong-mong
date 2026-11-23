/* ================= jnroade: THE EMPEROR'S NPC ROAD (GAP OR18; STORY_ROADS_PLAN.md §3.1 "Emperor | the Hoàng thượng (one per life) | 4: tân quân
   lập uy (reign), biên ải chiến sự, cải cách triều chính, kế vị / lập Thái tử | jreign «Tân quân lập uy» = template 1 as is; her faction road
   stays hers"; owner OD:L1264 "every named male character (Emperor, …) gets his own identity + road, with the same 'her help = one hồi, varied
   per life' rule") =================
   Template 1 = jreign (the accession struggle, unchanged). Once it is over (rg.out set) — or at once in a life with no reign line (old saves,
   no S.reign) — the Emperor lives ONE of the three templates below on the U3 men-road engine (jnroadm.js: same 8 chapters .4–.11, his own
   odds, off-screen, palace news, one help hồi for her = a j72 nr_* follow-up, his road line on his person card). The template is rolled per
   life avoiding the one played last life (localStorage ctm-emproad, like ctm-arcs), so lives differ (OD:L1252).
   Gain AND loss on REAL fields (BAL.nroad.men.emp): biên ải = Quốc sự Biên cương (trS().bien) + the Đại tướng quân house; cải cách = Kho lúa
   (trS().kho) + the rival house (the strongest house, the old guard against the new law) loses / gains thế lực; kế vị = the princes' standing
   with him (fond) — the one closest to the succession and the next one. Two-way (law 1): when the hit lands on HER house / HER son she reads it.
   Tags are story words only: they NEVER name an heir, a rank or a death (the heir is named only by j51 heirName / npcWhy "heirName").
   Off while the Emperor is dead / a succession runs (S.empDead, S.succ.on), as jreign. History note (law 8): dev/handover/reports/road-triggers.md. */
(function(){if(typeof NRM!=="object")return;const MID="việc còn dở dang";
 const def=(id,t,rows)=>{const c={};rows.forEach((r,i)=>{const n=BAL.road.first-1+i;const last=i===rows.length-1;
   c[n]={t:r[0],w:r[1],sk:"grip",mk:"emp",E:{a:{k:BAL.arc.tier.win,tag:r[2]},m:{k:BAL.arc.tier.mid,tag:last?r[3]:MID},b:{k:BAL.arc.tier.lose,tag:last?r[4]:r[3]}}}});NRM[id]={k:"emp",t,sk:"grip",c}};
 def("em_bien","Biên ải chiến sự",[["Tin cấp báo biên thùy","off","tin đến kịp, triều đình kịp trở tay","tin đến muộn, mất hai trấn"],["Chủ chiến hay chủ hòa","off","triều thần một lòng","triều đình chia phe cãi vã"],
  ["Chọn tướng cầm quân","gd","chọn được tướng giỏi","tướng được chọn không hợp lòng quân"],["Quân lương ra biên","bac","lương thảo đủ đầy","lương thảo thiếu hụt"],["Hậu cung may áo chiến bào","hh","áo ấm đến tay quân sĩ","việc may áo chậm trễ"],
  ["Gian tế trong kinh thành","eun","bắt được gian tế","gian tế trốn thoát"],["Trận quyết chiến","gd","đại thắng nơi biên ải","thua một trận lớn"],["Biên ải chiến sự","emp","khải hoàn, biên cương yên ổn","nghị hòa, giữ được đất cũ","cắt đất cầu hòa"]]);
 def("em_cai","Cải cách triều chính",[["Bản tấu cải cách","off","bản tấu được chuẩn đem ra bàn","bản tấu bị gác lại"],["Lão thần can gián","off","thuyết phục được lão thần","lão thần quỳ trước điện phản đối"],
  ["Thí điểm một châu","off","châu thí điểm khởi sắc","châu thí điểm sinh loạn"],["Kho lúa và thuế ruộng","bac","thuế thu đủ, dân không oán","dân than thuế nặng"],["Ngự sử dâng sớ","off","lời đàn hặc lắng xuống","lời đàn hặc dậy khắp triều"],
  ["Tham quan lộ mặt","eun","bắt được tham quan","tham quan được che chở"],["Năm mất mùa","bac","phép mới cứu được dân đói","phép mới bị đổ lỗi cho nạn đói"],["Cải cách triều chính","emp","phép mới đứng vững","giữ một nửa, bỏ một nửa","phép mới bị bãi bỏ"]]);
 def("em_ke","Chuyện kế vị",[["Lời tâu về quốc bản","off","ngài nhận lời tâu, hứa sẽ suy xét","ngài nổi giận vì bị thúc ép"],["Thử tài các hoàng tử","off","các hoàng tử đều tiến bộ","một hoàng tử làm ngài thất vọng"],
  ["Lời bàn trong hậu cung","hh","hậu cung giữ yên lặng","phi tần ngấm ngầm vận động"],["Nhà ngoại các hoàng tử","off","các nhà ngoại biết giữ phận","nhà ngoại kéo bè kết cánh"],["Sư phó Thượng thư phòng","off","sư phó tâu lời công bằng","sư phó bị nghi thiên vị"],
  ["Hoàng tử phạm lỗi","eun","lỗi nhỏ được bỏ qua","lỗi bị đồn khắp cung"],["Chiếu thư cất kín","emp","ngài viết xong chiếu thư, cất kín","ngài còn do dự, chưa đặt bút"],["Chuyện kế vị","emp","lòng ngài đã định, triều đình yên","việc còn để ngỏ","các hoàng tử thêm bất hòa"]]);
})();
const NRE=()=>BAL.nroad.men.emp;
/* his road runs once template 1 (jreign) is over, or at once with no reign line */
function nrEmpOn(){try{if(!S||!S.emp||S.empDead||(S.succ&&S.succ.on)||window.__nroff)return false;if(!S.reign)return true;const W=typeof rgW==="function"?rgW():null;return !!(W&&W.out)}catch(e){return false}}
function nrEmpHist(){try{return JSON.parse(localStorage.getItem("ctm-emproad")||"[]")||[]}catch(e){return[]}}
function nrEmpInit(){const L=Object.keys(NRM).filter(id=>NRM[id].k==="emp");if(!L.length||!S.emp)return null;const h=nrEmpHist();
 const free=L.filter(r=>!h.slice(0,NRE().hist).includes(r));const r=pick(free.length?free:L.filter(x=>x!==h[0]).length?L.filter(x=>x!==h[0]):L);
 S.emp.nr=nrNew("emp",r);try{localStorage.setItem("ctm-emproad",JSON.stringify([r].concat(h.filter(x=>x!==r)).slice(0,3)))}catch(e){}return S.emp.nr}
window.nrEmpOn=nrEmpOn;window.nrEmpInit=nrEmpInit;
/* he is one more man of this life (the U3 list): kind emp, asker emp (j72 A6 «Hoàng thượng») */
(function(){if(typeof nrMenL!=="function")return;const l0=nrMenL;nrMenL=function(){const L=l0.apply(this,arguments);try{if(nrEmpOn()){if(!S.emp.nr)nrEmpInit();if(S.emp.nr)L.push({p:S.emp,k:"emp",a:["emp",null],g:"emp",n:"Hoàng thượng"})}}catch(e){console.error(e)}return L}})();
/* his test stat: the throne's grip (jreign rg.p) when there is a reign line, else BAL.nroad.men.emp.st */
(function(){const s0=nrMenStat;nrMenStat=function(e){if(e&&e.g==="emp"){try{const W=typeof rgW==="function"?rgW():null;return W&&typeof W.p==="number"?W.p:NRE().st}catch(x){return NRE().st}}return s0.apply(this,arguments)}})();
/* his rival: cải cách = the strongest other house (the old guard), biên ải = none (the enemy is beyond the border), kế vị = none (the princes move) */
(function(){const r0=nrMenRival;nrMenRival=function(e){if(!e||e.g!=="emp")return r0.apply(this,arguments);const N=e.p.nr;if(N.r!=="em_cai")return null;
 try{const T=trS();if(N.c&&T.H[N.c])return N.c;const L=Object.keys(T.H).sort((a,b)=>(T.H[b].pow||0)-(T.H[a].pow||0));N.c=L[0]||null;return N.c}catch(x){return null}}})();
/* his chapter: same odds as every man (jnroadm nrMenPlay), his own fields */
(function(){const p0=nrMenPlay;nrMenPlay=function(e){if(!e||e.g!=="emp")return p0.apply(this,arguments);const p=e.p,N=p.nr,A=nrCh(N.r,N.n);if(!A){N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;return null}const B=nrB(),M=NRE();
 const pr=odA(p,B.base+nrMenStat(e)/B.div+(N.k>0?B.sc:0)+(N.hb||0));const k=roll(pr)?1:roll(pr/2)?0:-1;const w=k>0?"win":k<0?"lose":"mid";let me="",hit=false;const T=trS();
 try{if(N.r==="em_bien"){T.bien=cl(T.bien+M.bien[w],0,100);if(k!==0)tdPowAdd("Đại tướng quân",M.gen[w]);if(k!==0&&tdHouse(S)==="Đại tướng quân"){hit=true;me=k>0?" Nhà ngươi được thơm lây.":" Nhà ngươi mang tiếng lây."}}
  else if(N.r==="em_cai"){T.kho=cl(T.kho+M.kho[w],0,100);const c=nrMenRival(e);if(c&&k!==0){tdPowAdd(c,-M.old[w]);if(c===tdHouse(S)){hit=true;me=k>0?" Nhà ngươi bị phép mới lấn một bước.":" Nhà ngươi giữ được thế cũ."}}}
  else if(N.r==="em_ke"){const L=allKids().map(z=>z[0]).filter(x=>x&&x.sex==="m"&&x.alive&&(x.age||0)>=M.age).sort((a,b)=>(b.tal||0)+(b.fond||0)-(a.tal||0)-(a.fond||0));
   if(k!==0)L.slice(0,2).forEach((x,i)=>{x.fond=cl((x.fond||0)+M.fond[w][i],0,100);if(nrMy(x)){hit=true;me=` ${x.name} ${M.fond[w][i]>0?"được phụ hoàng để mắt hơn":"bị phụ hoàng lạnh nhạt hơn"}.`}})}}catch(x){console.error(x)}
 const tag=nrEnd(A,k,"ngài",p);N.e=tag;N.k=k;N.l.push([N.n,k]);N.hb=0;const n0=N.n;N.n=nrNext(N.r,N.n+1);if(!N.n)N.x=1;N.t=S.turn+nrR(B.gap);if(N.h&&N.h<=n0)N.hs=N.hs||-1;
 return {n:n0,t:nrFill(plain(nrS(A.t,A)),p),tag,k,rc:"",me,hit}}})();
/* he asks her (her help = one hồi): only when she has his favour, never in her learning chapters, never as a servant (nrMenAsk rules) */
(function(){const a0=nrMenAsk;nrMenAsk=function(e){if(!e||e.g!=="emp")return a0.apply(this,arguments);try{return !isSrv()&&!S.out&&!nrLearn()&&!S.cold&&(S.sung||0)>=NRE().askSung}catch(x){return false}}})();
/* r2 fix 3: his help hồi names his REAL rival as {B} — on em_cai the strongest old house (nrMenRival → a house id), the same "off" asker the
   house heads use (q72A("off", house) = its head by name); biên ải / kế vị have none, so {B} asks and «do» are never drawn there */
(function(){if(typeof nrMenOffer!=="function")return;const o0=nrMenOffer;nrMenOffer=function(e){if(!e||e.g!=="emp")return o0.apply(this,arguments);
 const N=e.p.nr,A=nrCh(N.r,N.n);if(!A||!e.a||typeof q72!=="function")return false;const q=q72();if(!q)return false;
 const [rk,ri]=e.a;if(q.ch.concat(q.a).some(c=>nrSameA(c,rk,ri)&&/^nr_/.test(c.tid)))return false;
 const riv=nrMenRival(e);const bk=riv&&typeof q72A==="function"&&q72A("off",riv)?"off":null,bi=bk?riv:null;
 const K=typeof nrAskPick==="function"?nrAskPick(N,A,e.k,!!bk):{hk:nrKind(A),av:-1},hk=K.hk;if(!T72I["nr_"+hk])return false;
 q.ch.push({tid:"nr_"+hk,at:wk(),rk,ri,bk,bi,p:{nr:N.r,nn:N.n,av:K.av}});N.hk=hk;N.hs=1;N.t=Math.max(N.t,S.turn+Math.ceil((nrB().dl+2)/3));return true}})();
/* he never asks her to plead before himself (kind emp) */
try{NRSELF.emp=["emp"]}catch(e){}
/* his voice in the help hồi: trẫm, and he calls her as the Emperor does (jvoice kAddr) */
(function(){if(typeof nrVoiceM!=="function")return;const v0=nrVoiceM;nrVoiceM=function(X,goi){if(X&&X.A&&X.A.k==="emp"){let c="ái phi";try{if(typeof kAddr==="function")c=kAddr("emp",S).goi||c}catch(e){}return{me:"trẫm",call:c}}return v0.apply(this,arguments)}})();
/* ================= road-triggers r2 fix 3 (law 11 / Q1 family rule, OD:L644, L1252, L1601): his help hồi tells HIS story =================
   Like every men template (jnrask_m.js), two asks per help chapter .5–.10 (BAL.nroad.helpN), two different kinds, about the conflict of THAT
   chapter (the history note in dev/handover/reports/road-triggers.md, law 8). Voice trẫm / his word for her through {me} {Me} {call} {Call}
   (nrVoiceM above). Never kind emp (NRSELF.emp: he never asks her to plead before himself). Never names an heir, never says who is chosen.
   Each option sits on its stock cost (Sức / bạc, NRASK_ORD = the stock order; costs, odds and losses stay BAL.nroad.op/.bac/.suc).
   «do» (spy on {B}) only where he has a real rival: em_cai (the strongest old house, nrMenRival); em_bien / em_ke have none, so no {B} there.
   Every chapter keeps one ask that is not «hh» and never names the queen (when she is Hoàng hậu herself, nrAskPick drops those).
   Row: [kind, step title, ask, option, option]; option: [label, "suc"|"bac", loss line]. */
(function(){/* @nrask-emp */const ORD=window.NRASK_ORD;if(!ORD||typeof NRASK!=="object")return;const M={};
 const def=(road,rows)=>rows.forEach((r,i)=>{const id=road+"_"+(5+Math.floor(i/2));const O=[r[3],r[4]];
  (M[id]=M[id]||[]).push({k:r[0],c:r[1],h:r[2],o:ORD[r[0]].map(c=>{const z=O.find(x=>x[1]===c);return[z[0],z[2]]})})});
 /* em_bien «Biên ải chiến sự»: 5 chủ chiến / chủ hòa, 6 chọn tướng, 7 quân lương, 8 áo chiến bào, 9 gian tế, 10 trận quyết chiến */
 def("em_bien",[
  ["th","Thái hậu nghiêng về nghị hòa","Triều thần chia hai phe chủ chiến, chủ hòa, Thái hậu lại nghiêng về nghị hòa. {Me} đã quyết giữ biên cương, nhưng không muốn mẫu hậu phiền lòng. {Call} hay hầu Đức Thọ cung, thay {me} nói cho người hiểu.",
   ["Hầu Thái hậu, kể nỗi lo nơi biên ải","suc","Thái hậu cho là ngươi bàn việc triều chính"],
   ["Dâng Thái hậu một chuỗi tràng hạt quý","bac","Thái hậu nhận lễ mà lòng vẫn không yên"]],
  ["thu","Thư hỏi ý lão tướng","Có một lão tướng đã cáo lão về quê, từng đánh trận ở biên thùy. {Me} muốn hỏi ý ông trước khi triều thần biết. {Call} gửi giúp {me} một lá thư ra ngoài cung.",
   ["Sai thái giám tâm phúc mang thư đi","bac","thư bị giữ ở cửa cung, tên ngươi bị hỏi đến"],
   ["Kẹp thư vào thư nhà gửi về","suc","thư nhà bị mở xem, người ta hỏi vì sao ngươi biết chuyện quân"]],
  ["y","Bệnh cũ của vị tướng","Người {me} muốn giao ấn soái có bệnh cũ ở chân. Nếu Thái y viện ghi sổ, triều thần sẽ bàn ra. {Call} tìm người xem kín cho ông ấy.",
   ["Lén mời một thái y quen, hậu tạ","bac","Thái y viện biết chuyện, lời bàn lan ra"],
   ["Tự chép phương thuốc cũ gửi sang","suc","thuốc không đỡ, người ta trách ngươi xen vào việc quân"]],
  ["th","Thái hậu tiến cử người bên ngoại","Thái hậu muốn {me} giao quân cho một người bên ngoại của người, mà {me} đã chọn người khác. {Call} khéo nói giúp, để mẫu hậu khỏi giận.",
   ["Hầu Thái hậu dùng bữa, khéo nói đỡ","suc","Thái hậu giận ngươi cãi ý người"],
   ["Dâng Thái hậu một bức bình phong thêu","bac","Thái hậu cho là ngươi lấy lễ che lời"]],
  ["che","Người biết chuyện lương thiếu","Có một cung nữ bên Nội vụ phủ biết tiền lương ra biên bị cắt xén, nay bị người ta đuổi đánh. {Me} cần nàng ấy giữ được mạng mà làm chứng. {Call} che chở cho nàng ấy.",
   ["Cho nàng ấy ở trong cung mình","suc","người ta bàn ngươi giấu người của Nội vụ phủ"],
   ["Bỏ bạc gửi nàng ấy ra chùa ngoài kinh","bac","chỗ ấy có người lạ dò hỏi"]],
  ["hh","Hậu cung bớt yến tiệc","Năm có chiến sự, {me} muốn hậu cung bớt yến tiệc, dồn bạc ra biên. Việc ấy phải do Trung cung đứng ra, {call} thay {me} thưa với Hoàng hậu.",
   ["Thỉnh an Hoàng hậu, bàn chuyện bớt yến tiệc","suc","các cung trách ngươi bày chuyện cắt bớt"],
   ["Góp trước bạc riêng vào Khôn Ninh cung","bac","người ta bảo ngươi lấy bạc mua tiếng"]],
  ["hh","Chia việc kim chỉ","Hoàng hậu giao các cung may áo ấm gửi ra biên, mà có cung chậm trễ. {Me} không tiện nói thẳng. {Call} nói với Trung cung chia lại việc cho đều.",
   ["Thỉnh an Hoàng hậu, xin chia lại việc kim chỉ","suc","các cung bị chia thêm việc trách ngươi"],
   ["Dâng Khôn Ninh cung mấy cuộn bông tốt","bac","bông bị chê không đủ ấm, tên ngươi bị nhắc"]],
  ["thu","Thư úy lạo theo chuyến áo","{Me} muốn tự tay viết thư úy lạo quân sĩ, gửi kèm chuyến áo mà không qua tay Binh bộ. {Call} lo giúp cho phong thư đến được biên ải.",
   ["Sai người áp tải đi cùng chuyến áo, hậu thưởng","bac","người áp tải say rượu, thư thất lạc"],
   ["Tự tay khâu thư vào lớp lót áo","suc","áo bị khám ở cửa cung, người ta hỏi ngươi giấu gì"]],
  ["che","Tiểu thái giám nghe được gian tế","Một tiểu thái giám nghe được gian tế bàn chuyện ở chợ ngoài cửa cung, nay bị kẻ lạ rình rập. {Me} cần nó an toàn cho đến khi bắt hết bọn chúng. {Call} giữ nó bên mình.",
   ["Giữ tiểu thái giám làm việc trong cung mình","suc","kẻ lạ lảng vảng quanh cung ngươi"],
   ["Bỏ bạc gửi nó về quê một người quen","bac","đường về quê bị chặn, nó lại trốn về kinh"]],
  ["y","Tên gian tế thoi thóp","Tên gian tế bị bắt đã cắn lưỡi, còn thoi thóp. {Me} cần hắn sống để khai, mà không muốn Thái y viện biết có người bị giam. {Call} quen thái y, mời người đến chữa kín.",
   ["Mời một thái y kín miệng, hậu tạ","bac","thái y bị theo dõi, tên ngươi bị nhắc ở Thận Hình ti"],
   ["Tự sắc thuốc cầm máu gửi sang","suc","thuốc đến chậm, người ta hỏi ngươi dính gì đến ngục"]],
  ["th","Thái hậu lo trận lớn","Trận này {me} dồn hết binh lực, Thái hậu ăn ngủ không yên, lại có người tâu nên giảng hòa. {Call} đến Đức Thọ cung giữ lòng người cho vững.",
   ["Cùng Thái hậu tụng kinh cầu an cho quân sĩ","suc","Thái hậu thấy ngươi quá lời về chuyện quân"],
   ["Dâng hương đèn lên chùa cầu an thay Thái hậu","bac","người ta bàn ngươi phô trương"]],
  ["thu","Mật dụ cho chủ tướng","{Me} có một đạo mật dụ phải đến tay chủ tướng mà không qua Binh bộ, vì trong bộ có người không đáng tin. {Call} có đường gửi thư ra ngoài, giúp {me} lần này.",
   ["Thuê người đưa thư nhanh nhất kinh thành","bac","người đưa thư bị chặn hỏi ở cửa ải"],
   ["Gửi theo người nhà mình đi buôn","suc","người nhà bị khám, mật dụ suýt lộ"]]]);
 /* em_cai «Cải cách triều chính»: 5 lão thần can gián, 6 thí điểm một châu, 7 kho lúa / thuế ruộng, 8 Ngự sử dâng sớ, 9 tham quan, 10 năm mất mùa.
    {B} = the strongest old house (nrMenRival), always spoken of as «phủ {B}» */
 def("em_cai",[
  ["do","Dò ý phủ {B}","Các lão thần quỳ trước điện, người cầm đầu lại là phe phủ {B}. {Me} muốn biết họ định ép đến đâu. {Call} có tai mắt trong cung, dò giúp {me}.",
   ["Sai người dò hỏi gia nhân phủ ấy","bac","người của ngươi bị gia nhân phủ ấy nhận ra"],
   ["Tự hỏi chuyện các phu nhân vào cung chầu","suc","các phu nhân đồn ngươi dò chuyện triều chính"]],
  ["th","Lão thần khóc ở Đức Thọ cung","Lão thần đã vào tận Đức Thọ cung khóc lóc, Thái hậu bảo {me} chớ đổi phép tổ tông. {Call} nói cho mẫu hậu hiểu rằng phép mới là để cứu dân.",
   ["Hầu Thái hậu, kể chuyện dân nghèo đóng thuế","suc","Thái hậu bảo ngươi không hiểu phép tổ tông"],
   ["Dâng Thái hậu bộ sách nông tang in mới","bac","Thái hậu cho là ngươi nịnh theo phép mới"]],
  ["thu","Hỏi chuyện thật ở châu làm thử phép mới","Tấu chương từ châu làm thử phép mới toàn lời tốt, {me} ngờ có kẻ che mắt. {Call} gửi giúp {me} một lá thư cho người nhà, nhờ hỏi xem dân ở đó sống ra sao.",
   ["Nhờ thái giám tâm phúc mang thư về nhà","bac","thư bị chặn, người ta bảo ngươi dò xét quan địa phương"],
   ["Viết vào thư nhà, hỏi khéo chuyện châu ấy","suc","thư nhà bị mở, người ta hỏi sao ngươi dính vào việc triều"]],
  ["che","Cung nữ quê ở châu làm thử phép mới","Có một cung nữ quê ở châu làm thử phép mới, kể được nhà mình bị quan ép nộp thuế gấp đôi. Người của phủ {B} đang tìm nàng ấy để bịt miệng. {Call} che chở nàng ấy giúp {me}.",
   ["Cho cung nữ ấy hầu trong cung mình","suc","người ta bàn ngươi chứa kẻ nói xấu quan"],
   ["Bỏ bạc gửi nàng ấy vào am ni ngoài thành","bac","am ấy có người lạ đến hỏi"]],
  ["y","Long thể mỏi mệt vì sổ thuế","Mấy đêm liền {me} xem sổ thuế ruộng đến canh tư, mắt mờ, đầu nhức. Thái y viện mà ghi sổ thì lão thần lại bảo {me} không giữ long thể. {Call} tìm người xem kín cho {me}.",
   ["Mời thái y quen vào xem mạch kín, hậu tạ","bac","lão thần trách ngươi giấu bệnh của thánh thượng"],
   ["Tự nấu canh an thần dâng lên","suc","canh không hợp, ngài mất ngủ thêm, người ta trách ngươi"]],
  ["do","Sổ ruộng của phủ {B}","Phủ {B} khai ruộng ít đi một nửa để trốn thuế mới. {Me} cần biết thật họ có bao nhiêu. {Call} dò giúp {me} từ người hầu các phu nhân.",
   ["Sai người mua chuyện quản gia phủ ấy","bac","quản gia nhận bạc rồi báo lại chủ"],
   ["Tự hỏi chuyện phu nhân phủ ấy khi vào chầu","suc","phu nhân phủ ấy biết ngươi dò hỏi"]],
  ["th","Tờ sớ đến tai Thái hậu","Có Ngự sử dâng sớ nói phép mới hại dân, lời lẽ đến cả tai Thái hậu. {Me} không cấm Ngự sử nói, nhưng mẫu hậu không nên vì một tờ sớ mà lo. {Call} đến hầu, nói rõ chuyện thật.",
   ["Hầu Thái hậu nghe chuyện, nói rõ thiệt hơn","suc","Thái hậu bảo ngươi bênh phép mới quá lời"],
   ["Dâng Thái hậu một tượng Quan Âm bằng ngọc","bac","Thái hậu bảo ngươi lấy lễ thay lẽ phải"]],
  ["thu","Thư cho vị Ngự sử già","Có một vị Ngự sử già vốn thẳng tính. {Me} muốn ông biết phép mới đang được sửa theo lời can, mà {me} không tiện tự nói. {Call} gửi giúp {me} lá thư đến nhà ông, không ký tên.",
   ["Thuê người tin cẩn mang thư đến nhà ấy","bac","người mang thư bị người phủ khác bắt gặp"],
   ["Gửi kèm thư hỏi thăm của nhà mình","suc","thư bị mở, người ta bảo ngươi can thiệp việc Ngự sử"]],
  ["do","Kẻ đứng sau tham quan","Tên tham quan bị bắt cứ một mực không khai, {me} biết có người ở phủ {B} đứng sau. {Call} dò giúp {me} xem ai từ phủ ấy đã vào cung gặp người trong cung.",
   ["Sai người tra sổ ra vào cửa cung","bac","người tra sổ bị hỏi ngược lại"],
   ["Tự hỏi các thái giám gác cửa","suc","người ta đồn ngươi tra xét người ra vào"]],
  ["che","Cung nữ chép sổ","Một cung nữ chép sổ biết tên tham quan đã gửi bạc vào cung cho ai. Nàng ấy sợ bị bịt miệng, không dám về phòng. {Me} cần nàng ấy sống mà làm chứng. {Call} che chở giúp {me}.",
   ["Giữ cung nữ ấy hầu bên mình","suc","người ta bàn ngươi giữ người của vụ án"],
   ["Bỏ bạc thuê chỗ kín ngoài thành cho nàng ấy","bac","chỗ ấy bị lộ, nàng ấy sợ hãi bỏ trốn"]],
  ["hh","Hậu cung góp gạo phát chẩn","Năm mất mùa, lão thần đổ hết cho phép mới. {Me} muốn hậu cung bớt chi, góp gạo phát chẩn, để dân thấy triều đình cùng chịu đói. Việc ấy cần Trung cung đứng ra. {Call} nói với Hoàng hậu.",
   ["Thỉnh an Hoàng hậu, bàn chuyện phát chẩn","suc","các cung trách ngươi bày việc bớt bổng lộc"],
   ["Góp bạc riêng vào việc phát chẩn của Khôn Ninh cung","bac","người ta bảo ngươi mua tiếng nhân ái"]],
  ["y","Dịch bệnh sau mùa đói","Sau mùa đói, ngoài kinh có dịch. {Me} muốn biết thật nặng nhẹ trước khi triều thần lấy đó mà bàn phép mới. {Call} quen thái y, nhờ người lặng lẽ ra xem rồi về tâu riêng.",
   ["Hậu tạ thái y quen ra ngoài thành xem bệnh","bac","thái y nhiễm bệnh, người ta trách ngươi sai người đi"],
   ["Tự soạn thuốc phòng dịch gửi ra","suc","thuốc không đủ, dân chê, người ta nhắc tên ngươi"]]]);
 /* em_ke «Chuyện kế vị»: 5 thử tài, 6 lời bàn hậu cung, 7 nhà ngoại, 8 sư phó Thượng thư phòng, 9 hoàng tử phạm lỗi, 10 chiếu thư cất kín.
    No prince is named and nobody is said to be chosen (the heir is named only by j51 heirName) */
 def("em_ke",[
  ["th","Thái hậu thương một hoàng tử","Thái hậu thương một hoàng tử hơn, mỗi lần {me} thử tài là người lại bênh. {Me} muốn thử cho công bằng. {Call} nói với mẫu hậu để người yên lòng.",
   ["Hầu Thái hậu, kể chuyện các hoàng tử chăm học","suc","Thái hậu nghi ngươi vận động cho con nhà ai"],
   ["Dâng Thái hậu bức Bách tử đồ","bac","Thái hậu bảo ngươi khéo nịnh mà vụng lời"]],
  ["thu","Đề thử từ ngoài cung","{Me} muốn mời một vị đại nho ngoài kinh ra đề thử các hoàng tử, để không ai trong cung biết trước. {Call} gửi giúp {me} phong thư ấy.",
   ["Sai thái giám kín miệng đưa thư ra ngoài kinh","bac","thư bị bóc xem, đề thử lộ ra"],
   ["Gửi thư theo người nhà mình về quê","suc","người nhà bị hỏi, tên ngươi dính vào chuyện đề thử"]],
  ["hh","Trung cung răn đe","Trong hậu cung có phi tần ngấm ngầm vận động cho con mình. {Me} muốn Trung cung răn đe cho êm, không cần {me} lên tiếng. {Call} nói với Hoàng hậu giúp {me}.",
   ["Thỉnh an Hoàng hậu, kể những lời bàn đã nghe","suc","các cung biết ngươi kể chuyện, oán ngươi"],
   ["Dâng Khôn Ninh cung lễ mừng, nhân đó nói chuyện","bac","lễ được nhận mà chuyện bị gác"]],
  ["che","Cung nữ lỡ lời","Một cung nữ lỡ miệng kể với {me} rằng chủ nhân nàng ấy đang vận động, nay sợ bị phạt. {Me} không muốn ai bị tội vì nói thật. {Call} cho nàng ấy một chỗ nương thân.",
   ["Xin cung nữ ấy về hầu cung mình","suc","chủ cũ của nàng ấy oán ngươi"],
   ["Bỏ bạc lo cho nàng ấy xuất cung về quê","bac","nàng ấy về quê mà lời đồn vẫn ở lại"]],
  ["thu","Lời nhắn các nhà quen","Nhà ngoại các hoàng tử bắt đầu kết bè ngoài triều. {Me} muốn họ biết giữ phận mà không cần một đạo chiếu. {Call} viết thư về nhà mình, nhắn các nhà quen nên tránh xa chuyện ấy.",
   ["Nhờ thái giám tin cẩn đem thư về nhà","bac","thư bị chép lại, các nhà kia biết ngươi răn họ"],
   ["Viết lời nhắn trong thư thăm cha mẹ","suc","thư bị mở xem, người ta bảo ngươi đứng về một phe"]],
  ["th","Nhà ngoại cầu Thái hậu","Có nhà ngoại đã nhờ người trong Đức Thọ cung nói giúp. {Me} không muốn mẫu hậu bị kéo vào chuyện bè phái. {Call} đến hầu, khéo nhắc người giữ mình.",
   ["Hầu Thái hậu, khéo nhắc người đứng ngoài","suc","Thái hậu bảo ngươi lắm chuyện"],
   ["Dâng Thái hậu một hộp trà quý, nhân đó nói chuyện","bac","Thái hậu nhận trà mà không vui"]],
  ["y","Sư phó lâm bệnh","Vị sư phó công bằng nhất ở Thượng thư phòng lâm bệnh, có người mong ông về quê để người khác thay. {Me} muốn ông khỏe lại mà không ai biết {me} để tâm. {Call} quen thái y, nhờ xem kín cho ông.",
   ["Lặng lẽ mời thái y quen sang, hậu tạ","bac","người ta đồn ngươi lấy lòng sư phó"],
   ["Tự sắc thang thuốc bổ gửi đến","suc","thuốc gửi nhầm tay, người ta bàn ngươi lấy lòng thầy dạy hoàng tử"]],
  ["thu","Hỏi vị sư phó cũ","{Me} muốn hỏi một vị sư phó đã về hưu xem người đang dạy có thiên vị không, mà không để Thượng thư phòng biết. {Call} gửi giúp {me} lá thư ấy.",
   ["Sai người tin cẩn mang thư đến nhà vị sư phó cũ","bac","thư bị bắt gặp, Thượng thư phòng biết chuyện"],
   ["Viết kèm vào thư nhà gửi đi","suc","thư nhà bị xem, người ta hỏi ngươi dò chuyện Thượng thư phòng"]],
  ["che","Thái giám gánh tội thay","Một hoàng tử phạm lỗi, thái giám hầu cận bị đổ hết tội, sắp bị đánh đòn nặng. {Me} biết nó không có lỗi lớn. {Call} giữ nó trong cung mình cho qua cơn giận.",
   ["Cho thái giám ấy làm việc trong cung mình","suc","người ta bàn ngươi bao che kẻ có lỗi"],
   ["Bỏ bạc đưa thái giám ấy sang hành cung","bac","hành cung không nhận, nó lại bị trả về"]],
  ["hh","Việc nhỏ xử nhỏ","Lỗi của hoàng tử đã đồn khắp cung, Trung cung định trách phạt cả mẫu phi của hoàng tử ấy. {Me} muốn việc nhỏ xử nhỏ, {call} khéo thưa với Hoàng hậu một lời.",
   ["Thỉnh an Hoàng hậu, xin xử nhẹ cho êm","suc","Hoàng hậu bảo ngươi bênh người ngoài"],
   ["Dâng Khôn Ninh cung lễ tạ thay mẫu phi ấy","bac","người ta bảo ngươi kết bè với mẫu phi ấy"]],
  ["y","Long thể bất an","{Me} định viết chiếu thư cất kín. Dạo này {me} ho không dứt; nếu Thái y viện ghi sổ, triều thần sẽ lại thúc chuyện lập Thái tử. {Call} lặng lẽ lo giúp {me} việc này.",
   ["Lặng lẽ đón thái y vào điện, hậu tạ","bac","chuyện long thể lọt ra ngoài, người ta hỏi ngươi"],
   ["Tự tay sắc thuốc trị ho dâng lên","suc","thuốc không đỡ, người ta trách ngươi tự ý"]],
  ["th","Thái hậu hỏi chuyện chiếu thư","Thái hậu nghe phong thanh {me} sắp định chuyện kế vị, cứ hỏi mãi. Chuyện ấy {me} chưa nói với ai. {Call} đến hầu, khuyên mẫu hậu đừng hỏi nữa mà lòng người vẫn yên.",
   ["Hầu Thái hậu, khéo lái sang chuyện khác","suc","Thái hậu nghi ngươi biết điều gì giấu người"],
   ["Dâng Thái hậu một bộ kinh thêu kim tuyến","bac","Thái hậu nhận kinh mà vẫn hỏi ngươi chuyện cũ"]]]);
 Object.assign(NRASK,M);
})();/* @nrask-emp-end */
