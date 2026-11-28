/* ================= jcmood: TÂM TRẠNG Thái hậu và Hoàng hậu (như S.emp.mood; 0 Vui, 1 Bình thường, 2 Phiền muộn, 3 Giận dữ) =================
   Sinh từ chuyện thật mỗi tháng: bệnh (S.thIll / bệnh của Hoàng hậu), lễ hội, hoàng tôn ra đời, Hoàng thượng giận, Hoàng hậu bị lấn sủng,
   bị trái ý (nàng mất lòng họ trong tháng). Ảnh hưởng: lòng của họ với nàng (th / hh) tăng thêm khi họ vui, tăng ít hơn và giảm nặng hơn khi họ
   phiền hay giận (một luật cho mọi lần đổi th/hh của nàng).
   Thông tin thật nhưng nàng chỉ biết khi gặp (ở Đức Thọ cung / Càn Ninh cung trong tháng này) hoặc có tai mắt (Tai mắt 3+ thì có tin mỗi tháng).
   window.kitCourtMood = {th:{mood,lv,why,known}, hh:{...}}: mood/lv/why là null khi nàng chưa biết. */
const CM_W={th:"Thái hậu",hh:"Hoàng hậu"};
function cmSt(){S.cm=S.cm||{th:{lv:1,why:""},hh:{lv:1,why:""},seen:{},last:{}};return S.cm}
function cmSet(k,lv,why){const c=cmSt()[k];if(c.lv!==lv||why){c.lv=lv;c.why=why||""}}
function cmThCauses(n){const B=BAL.ag.why.cmood,L=[];if((S.th||0)>=netAt("th","than2",B.thHi))L.push({lv:0,s:(S.th||0)-netAt("th","than2",B.thHi)+B.base,why:"hài lòng vì ngươi hiếu thuận"});if(n<B.kidsFew)L.push({lv:2,s:B.kidW,why:"lo vì hoàng tự còn hiếm"});return L}
function cmHhCauses(q){const B=BAL.ag.why.cmood,L=[];const d=(q.sung||0)-(S.sung||0);if(d>=B.hhFav)L.push({lv:0,s:d,why:"vui vì được Hoàng thượng ghé Khôn Ninh cung"});
 let n=0;try{const R0=liveRivals(true);for(const a of R0)for(const b of R0)if(a!==b&&oan(a,b)>=netTh(a,"thu"))n++}catch(e){}if(n>=B.busy)L.push({lv:2,s:n*B.busyW,why:"mệt vì hậu cung tranh chấp"});return L}
function cmMonth(){if(!S||S.dead)return;const C=cmSt();const q=typeof queenP==="function"?queenP():null;
 const kidsNow=(()=>{let n=(S.kids||[]).length;for(const v of rivals||[])n+=(v.kids||[]).length;return n})();const born=kidsNow>(C.kids||kidsNow);C.kids=kidsNow;
 const fest=(()=>{try{return !!festToday()}catch(e){return S.month===1||S.month===7||S.month===8}})()||S.month===1;
 const thLoss=(C.thDrop||0),hhLoss=(C.hhDrop||0);C.thDrop=0;C.hhDrop=0;
 /* Thái hậu */
 if(!S.thDead){let lv=1,why="";
  if(S.thIll){lv=2;why=`đang bệnh (${(ILL[S.thIll.k]||{}).n||"không khỏe"})`}
  else if(thLoss>=8){lv=3;why="phật ý vì ngươi trái lời"}
  else if(S.emp&&S.emp.mood>=3){lv=2;why="lo vì Hoàng thượng đang giận"}
  else if(born){lv=0;why="mừng có hoàng tôn"}
  else if(fest){lv=0;why="vui vì lễ trong cung"}
  else{const x=npwPick(cmThCauses(kidsNow),y=>y.s);if(x){lv=x.lv;why=x.why}}/* npc-purpose G2c: only a real cause moves her (her regard for the player, heirs) */
  cmSet("th",lv,why)}
 /* Hoàng hậu */
 if(q&&q!==S&&q.alive&&!q.out){let lv=1,why="";const ill=(()=>{try{return illOf(q)}catch(e){return null}})();
  if(ill){lv=2;why="đang bệnh"}
  else if(hhLoss>=8){lv=3;why="phật ý vì ngươi trái lời"}
  else if((S.sung||0)>=(q.sung||0)+20&&S.rank>=3){lv=npwPick([3,2],k=>k===3?Math.max(0,hostility(q,S)):BAL.ag.why.cmood.hhSad+Math.max(0,aff(q,S)))||2;why=lv===3?"ghen vì Hoàng thượng sủng ngươi hơn":"buồn vì Hoàng thượng sủng ngươi hơn"/* npc-purpose G2c: her grudge makes it anger, her goodwill makes it sorrow */}
  else if(born&&(q.kids||[]).length>(C.qk||0)){lv=0;why="mừng vì sinh hạ hoàng tự"}
  else if(fest){lv=0;why="vui vì lễ trong cung"}
  else{const x=npwPick(cmHhCauses(q),y=>y.s);if(x){lv=x.lv;why=x.why}}/* npc-purpose G2c: her own life (favour, a quarrelling harem) */
  C.qk=(q.kids||[]).length;cmSet("hh",lv,why)}
 /* tai mắt: news of both every month at 3+ */
 if(eyes(S)>=3){C.spy=wk()}}
function cmKnown(k){const C=cmSt();const s=C.seen[k];return (s!=null&&wk()-s<3)||(C.spy!=null&&wk()-C.spy<3)}
function cmSee(){if(!S||S.dead)return;const C=cmSt();if(S.place==="tn"&&!S.thDead)C.seen.th=wk();if(S.place==="kn")C.seen.hh=wk()}
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{cmMonth()}catch(e){console.error(e)}return r}})();
(function(){const r0=render;render=function(){try{cmSee()}catch(e){}return r0.apply(this,arguments)}})();
/* reactions: every change of her th / hh is coloured by their mood */
(function(){const a0=apply;apply=function(o){try{if(S&&o&&typeof o==="object"&&(o.th||o.hh)){const C=cmSt();o=Object.assign({},o);
  for(const k of ["th","hh"]){const d=o[k];if(!d)continue;const lv=C[k].lv;if(d>0)o[k]=Math.round(d*[1.25,1,.8,.6][lv]);else{o[k]=Math.round(d*[.8,1,1.15,1.3][lv]);C[k+"Drop"]=(C[k+"Drop"]||0)-o[k]}}}}catch(e){}
 return a0.call(this,o)}})();
Object.defineProperty(window,"kitCourtMood",{configurable:true,get(){try{if(!S)return null;const C=cmSt();const one=k=>{const kn=cmKnown(k);const c=C[k];return{mood:kn?MOODS[c.lv][0]:null,lv:kn?c.lv:null,why:kn?c.why:null,known:kn}};
 const q=typeof queenP==="function"?queenP():null;return{th:S.thDead?null:one("th"),hh:q&&q!==S?one("hh"):null}}catch(e){return null}}});
