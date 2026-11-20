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
/* he never asks her to plead before himself (kind emp) */
try{NRSELF.emp=["emp"]}catch(e){}
/* his voice in the help hồi: trẫm, and he calls her as the Emperor does (jvoice kAddr) */
(function(){if(typeof nrVoiceM!=="function")return;const v0=nrVoiceM;nrVoiceM=function(X,goi){if(X&&X.A&&X.A.k==="emp"){let c="ái phi";try{if(typeof kAddr==="function")c=kAddr("emp",S).goi||c}catch(e){}return{me:"trẫm",call:c}}return v0.apply(this,arguments)}})();
