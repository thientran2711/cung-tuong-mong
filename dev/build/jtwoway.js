/* ================= jtwoway: LUẬT CÂN BẰNG HAI CHIỀU (owner 16/11 s21; people-life HANDOVER:L46 + OD:L1386) =================
   "Tao có cái gì thì NPC phải có cái đó ... nó làm được cái gì thì tao cũng phải có cái đó."
   ONE deed table TW for the social / regard deeds that both sides do. Each deed is one function run(a,t) for any doer a (the player S
   or an NPC) and any target t; its COST lives once in BAL.tw (the player's old card numbers, unchanged for her) and is paid the same way
   by everyone (twPay); its odds are odA(a, base) for everyone (od(b) = odA(S,b)).
   - NPC side: the weekly social menu SOC (j28) and the monthly drips in npcMonthly (j8) now run these deeds: they PAY the player's
     costs (Sức / bạc / Danh / Đức) and roll the player's odds; when the NPC cannot pay, the deed does not happen.
   - Player side: her talk options (topicOpts j9, talkOpts hh/th j2) read the same BAL.tw costs; deeds that only NPCs had get a player
     option in the same talk list (kit option rows, popCard/pdlg), same requirements, odds and effects.
   WHEN an NPC acts (frequency, khắc budget) is NOT changed here: that is the NPC agent loop (Foreman C, AG1–AG6, npc-agent.md §5).
   ===================================================================================================================== */
Object.assign(BAL,{tw:{
 help:{bac:-20},          /* Giúp đỡ nàng (j9) */
 apol:{danh:-1},          /* Tạ lỗi (j9) */
 thTH:{suc:-5},           /* Thỉnh an, chép kinh Thái hậu (j2 talk th) */
 thHH:{suc:-5},           /* Thỉnh an Hoàng hậu (j2 talk hh) */
 pray:{bac:-10},          /* Cầu tự ở Phụng Tiên điện (j2 deck) */
 ksp:{bac:-30},           /* Đút lót lật thẻ (j2 talk ksp) */
 fakeIll:{duc:-3},        /* Giả bệnh (j13 deck) */
 fakePreg:{bac:-60},      /* Giả mang thai (j2 deck) */
 humil:{danh:-1},         /* Hạ nhục (was NPC-only SOC.humiliate) */
 provoke:{},              /* Khiêu khích (j2 talk rival) */
 confNo:{danh:-3,th:-5},  /* Tịch thu vô cớ (Hoàng hậu, empAct conf) */
 reward:{bac:-30},        /* Ban thưởng (Hoàng hậu, empAct reward) */
 maid:{bac:-20},         /* buying a rival's maid (j70 bribe 'Dùng bạc' base price; j8 maidMonthP, NPC pays it too) */
 cold:{suc:-10},         /* petition to leave lãnh cung (j14 'Tìm chứng cứ minh oan'; NPC release attempt pays it too) */
 accBestow:40,            /* Tố giác thành: chance of a reward from the throne (was 100 for NPCs, 40 for her) */
 /* gains (one source, read by both sides and by the option text) */
 g:{help:10,helpOan:5,apol:15,thTH:[8,2,1,-2],thHH:[4,2,1,-3,5],thTHo:75,thHHo:70,prayO:50,pray:2,ksp:2,ill:3,illWk:2,preg:[6,5,-5],ann:[6,5,6],
    provoke:[1,-15,10,9],humil:[10,2],visit:[5,3],mediate:10,flaunt:2,test:[3,-6,55],drop:20,follow:6,gossip:1,praiseO:60,warn:10,admon:5,admonCd:6,
    accFail:[8,25,20],vu:[10,5,4],ky:[2,1],conf:[20,15],reward:[20,10,3],
    /* pillow slander at night (her night2 option and an NPC's night, two-way row 24, AG2): odds = o[0] + Ân tình / o[1] + night score × o[2]
       − o[3] when he is Đa nghi; thành: the target's Sủng −hit, liking −rel; hỏng: Đa nghi → the speaker's Sủng −dg[0], Danh −dg[1], else Sủng −fail */
    pillow:{o:[30,2,3,10],hit:10,rel:5,dg:[6,3],fail:2}}
}});
function twCost(k){return (BAL.tw&&BAL.tw[k])||{}}
/* can doer a pay deed k? (the player's rule: bạc ≥ price; a Sức cost needs more Sức than it costs, j76) */
function twCanPay(a,k){const c=twCost(k);if(c.bac<0&&(a.bac||0)<-c.bac)return false;if(c.suc<0&&(a.suc||0)+c.suc<=0)return false;return true}
function twPay(a,k){const c=twCost(k);if(!Object.keys(c).length)return;if(a===S)apply(c);else ap(a,c);window.__actPaidSuc=(window.__actPaidSuc||0)+(a!==S&&c.suc<0?-c.suc:0)}
function twAp(a,o){if(a===S)apply(o);else ap(a,o)}
function twNm(a){return NMc(a)}
const TW={};
function TWD(k,o){o.k=k;TW[k]=o}
/* run deed k: pays (unless the caller already paid, as the player's talk() does with a.c), rolls the shared odds, applies the effect */
function twDo(a,t,k,paid){const D=TW[k];if(!D||!a)return"";try{if(D.req&&!D.req(a,t))return"";if(!paid){if(!twCanPay(a,k))return"";twPay(a,k)}
 const o=D.o?D.o(a,t):100;const ok=o>=100||roll(o);return D.run(a,t,ok)||""}catch(e){console.error(e);return""}}
const G=()=>BAL.tw.g;
/* --- deeds both sides had (NPC side now pays and rolls like hers) --- */
TWD("help",{n:"Giúp đỡ nàng",req:(a,t)=>!!t,run:(a,t)=>{relAdd(a,t,G().help);oanAdd(t,a,-G().helpOan);return `${twNm(a)} sang giúp ${NM(t)} việc khó`}});
TWD("apol",{n:"Tạ lỗi",req:(a,t)=>!!t&&oan(t,a)>0,run:(a,t)=>{oanAdd(t,a,-G().apol);return `${twNm(a)} hạ mình tạ lỗi với ${NM(t)}`}});
TWD("thTH",{n:"Thỉnh an, chép kinh",req:()=>!S.thDead,o:a=>odA(a,G().thTHo),run:(a,t,ok)=>{const g=G().thTH;if(ok)twAp(a,{th:g[0],danh:g[1],duc:g[2]});else twAp(a,{th:g[3]});return `${twNm(a)} sớm hôm hầu hạ Thái hậu${ok?"":", Thái hậu không vui"}`}});
TWD("thHH",{n:"Thỉnh an",req:(a,q)=>!!q&&q!==a,o:a=>odA(a,G().thHHo),run:(a,q,ok)=>{const g=G().thHH;if(ok){twAp(a,{hh:g[0],danh:g[1],duc:g[2]});if(q!==S)q.ghen=cl((q.ghen||0)-g[4],0,100)}else twAp(a,{hh:g[3]});return `${twNm(a)} sang thỉnh an Hoàng hậu`}});
TWD("pray",{n:"Cầu tự ở Phụng Tiên điện",req:a=>!(a.fert>0||a.pray>0),o:a=>odA(a,G().prayO),run:(a,t,ok)=>{if(ok)a.pray=G().pray;return `${twNm(a)} lên Phụng Tiên điện thắp hương cầu tự`}});
TWD("ksp",{n:"Đút lót lật thẻ",req:a=>!(a.tablet>0),run:a=>{a.tablet=G().ksp;return `${twNm(a)} đút lót Kính sự phòng để được lật thẻ`}});
TWD("fakeIll",{n:"Giả bệnh",req:a=>!a.fakeIll&&!illOf(a),run:a=>{a.fakeIll=G().illWk;twAp(a,{sung:G().ill});return `${twNm(a)} cáo bệnh, Hoàng thượng thương xót`}});
TWD("fakePreg",{n:"Giả mang thai",req:a=>!a.preg&&(a.tamco||0)>=50,o:a=>odA(a,a.tamco||0),run:(a,t,ok)=>{const g=G().preg;if(!ok){twAp(a,{danh:g[2]});return `Thái y không chịu tiếp tay cho ${NM(a)} giả mang thai`}
 a.preg=1;a.fake=1;a.hidden=false;a.pregWk=wk();twAp(a,{sung:g[0],th:g[1]});return `${twNm(a)} báo tin có thai`}});
TWD("announce",{n:"Báo tin có thai",req:a=>a.preg&&a.hidden,run:a=>{const g=G().ann;a.hidden=false;twAp(a,{sung:g[0],th:g[1]});
 /* the same jealousy she raises when she announces (ghenAll): every other consort's ghen; when an NPC announces, the player has no ghen bar → resentment */
 liveRivals(true).forEach(x=>{if(x!==a)x.ghen=cl((x.ghen||0)+g[2],0,100)});return `${twNm(a)} báo tin có thai`}});
TWD("provoke",{n:"Khiêu khích",req:(a,t)=>!!t,run:(a,t)=>{const g=G().provoke;twAp(a,{danh:g[0]});relAdd(a,t,g[1]);if(t!==S)t.ghen=cl((t.ghen||0)+g[2],0,100);else oanAdd(S,a,g[3]);return `${twNm(a)} buông lời khiêu khích ${NM(t)}`}});
TWD("warn",{n:"Cảnh báo nàng",req:(a,t)=>!!t,run:(a,t)=>{const x=liveRivals(true).find(x=>x!==a&&x!==t&&(oan(x,t)>=30||bandOf(danger(x,t))>=2));if(!x){affAdd(t,a,-2);return `${twNm(a)} nhắc ${NM(t)} đề phòng, nhưng không có căn cứ`}
 affAdd(t,a,G().warn);oanAdd(t,x,G().warn);if(t===S){S.dKnown=S.dKnown||{};S.dKnown[x.id]=wk();noteAdd(x.id,`${a.name} báo: nàng có ý hại ngươi`)}else t.shield=Math.max(t.shield||0,1);return `${twNm(a)} lén báo ${NM(t)} đề phòng ${x===S?"ngươi":x.name}`}});
/* --- deeds only NPCs had: now one deed for both (player option added below) --- */
TWD("visit",{n:"Thăm lúc ốm mệt",req:(a,t)=>!!t&&((t.suc||0)<50||!!t.preg),run:(a,t)=>{const g=G().visit;relAdd(a,t,g[0]);twAp(t,{suc:g[1]});return `${twNm(a)} sang thăm ${NM(t)} lúc ốm mệt`}});
TWD("mediate",{n:"Hòa giải",req:(a,t)=>!!t&&!!twFoeOf(a,t),run:(a,t)=>{const x=twFoeOf(a,t);oanAdd(t,x,-G().mediate);return `${twNm(a)} đứng ra hòa giải giữa ${NM(t)} và ${x===S?"ngươi":x.name}`}});
TWD("humil",{n:"Hạ nhục",req:(a,t)=>!!t&&rkOf(a)>=rkOf(t),run:(a,t)=>{const g=G().humil;oanAdd(t,a,g[0]);twAp(t,{danh:-g[1]});return `${twNm(a)} hạ nhục ${NM(t)} trước mặt cung nhân`}});
TWD("flaunt",{n:"Khoe quà ngự ban",req:a=>(a.sung||0)>=40,run:a=>{liveRivals(true).forEach(x=>{if(x!==a)x.ghen=cl((x.ghen||0)+G().flaunt,0,100)});return `${twNm(a)} đi khắp cung khoe quà ngự ban`}});
TWD("test",{n:"Thử lòng",req:(a,t)=>!!t&&aff(a,t)>=0,o:()=>G().test[2],run:(a,t,ok)=>{affAdd(a,t,ok?G().test[0]:G().test[1]);return `${twNm(a)} thử lòng ${NM(t)}: ${ok?"tin thêm một chút":"càng ngờ vực"}`}});
TWD("drop",{n:"Lạnh nhạt",req:(a,t)=>!!t&&aff(a,t)>=30&&((t.sung||0)<25||!!t.confined),run:(a,t)=>{affAdd(a,t,-G().drop);return `${twNm(a)} lạnh nhạt với ${NM(t)} lúc sa cơ`}});
TWD("follow",{n:"Nương theo",req:(a,t)=>!!t&&rkOf(t)>rkOf(a)+1,run:(a,t)=>{relAdd(a,t,G().follow);return `${twNm(a)} nép theo ${NM(t)}`}});
TWD("gossip",{n:"Rỉ tai chuyện trong cung",req:(a,t)=>!!t,run:(a,t)=>{const x=pick(liveRivals(true).filter(y=>y!==a&&y!==t));if(x)ap(x,{danh:-G().gossip});return `${twNm(a)} rỉ tai ${NM(t)} chuyện trong cung`}});
TWD("check",{n:"Soát quà được tặng",req:a=>(a.inv||[]).some(e=>!e.h),run:a=>{const i=(a.inv||[]).findIndex(e=>e.t);if(i>=0){a.inv.splice(i,1);return `${twNm(a)} cho soát quà, vứt bỏ một món có độc`}return `${twNm(a)} cho thái y soát lại quà được tặng`}});
TWD("admon",{n:"Khuyên Hoàng thượng mưa móc đều khắp",req:(a,t)=>{if(!t||t===a||!(a===S?S.rank>=7:a.queen))return false;const f=typeof favNow==="function"?favNow():null;return !!f&&f.p===t&&!(t.admonWk!=null&&wk()-t.admonWk<G().admonCd)},
 run:(a,t)=>{twAp(t,{sung:-G().admon});t.admonWk=wk();return `${twNm(a)} khuyên Hoàng thượng “mưa móc đều khắp”, đừng chỉ sủng ${NM(t)}`}});
/* whom t resents most (not the doer): the quarrel a mediator can settle */
function twFoeOf(a,t){if(!t)return null;const L=[S].concat(liveRivals(true)).filter(x=>x!==a&&x!==t&&oan(t,x)>=20);return L.sort((x,y)=>oan(t,y)-oan(t,x))[0]||null}
window.TW=TW;window.twDo=twDo;window.twCost=twCost;

/* ---------- NPC side: SOC (j28) deeds run the shared deed (cost + odds), or the shared ACT ---------- */
(function(){if(typeof SOC!=="object")return;const strip=r=>String(r||"").replace(/<[^>]+>/g,"").replace(/\.\s*$/,"").trim();
 const map={help:"help",apologise:"apol",serveTH:"thTH",pray:"pray",bribeksp:"ksp",provoke:"provoke",warn:"warn",visit:"visit",mediate:"mediate",humiliate:"humil",
  flaunt:"flaunt",test:"test",drop:"drop",follow:"follow",gossip:"gossip",check:"check"};
 for(const s in map){const o=SOC[s];if(!o)continue;const k=map[s],ok0=o.ok;
  o.ok=function(v,t){if(!twCanPay(v,k))return false;if(TW[k].req&&!TW[k].req(v,k==="follow"?twFollowT(v):k==="thHH"?queenP():t))return false;return ok0.apply(this,arguments)};
  o.run=function(v,t){return twDo(v,k==="follow"?twFollowT(v):t,k)}}
 /* "Khen nàng" (feign = warm words): the player's Khen tài nghệ, same odds */
 if(SOC.feign)SOC.feign.run=function(v,t){if(!roll(odA(v,G().praiseO+(v.tai||0)/5))){affAdd(t,v,-2);return `${v.name} khen ${NM(t)} mà nghe giả lả`}affAdd(t,v,4);return `${v.name} niềm nở với ${NM(t)}, chuyện trò thân mật`};
 /* spying and befriending: the player's own ACT (free "Tự đi dò la" / paid "Kết giao"), same odds, same caught rules */
 if(SOC.spy)SOC.spy.run=function(v,t){return strip(ACT.spyk?runAct(v,t,"spyk"):"")};
 if(SOC.ally){const ok0=SOC.ally.ok;SOC.ally.ok=(v,t)=>ACT.ally.ok(v,t)&&ok0(v,t);SOC.ally.run=function(v,t){return strip(runAct(v,t,"ally"))}}})();
function twFollowT(v){const L=liveRivals(true).filter(x=>x!==v&&rkOf(x)>rkOf(v)+1);return L.sort((a,b)=>rkOf(b)-rkOf(a))[0]||null}

/* ---------- Player side: her options read the same costs; NPC-only deeds become her options ---------- */
(function(){const t0=topicOpts;topicOpts=function(v){const A=t0.apply(this,arguments);try{if(!S||!v)return A;
  /* her existing options: costs/gains from BAL.tw (one source) */
  for(const a of A){if(a.n==="Giúp đỡ nàng"){a.c=twCost("help");a.x=`nàng quý ngươi +${G().help} · oán -${G().helpOan}`;a.run=()=>{chatMark(v);return twDo(S,v,"help",true)+"."}}
   else if(a.n==="Tạ lỗi"){a.c=twCost("apol");a.x=`oán -${G().apol}`;a.run=()=>{chatMark(v);return twDo(S,v,"apol",true)+"."}}}
  if(sameHouse(S,v))return A;
  const add=(k,x)=>{const D=TW[k];if(!D||(D.req&&!D.req(S,k==="mediate"?v:v)))return;const c=twCost(k);
   A.push({n:D.n,c:Object.keys(c).length?c:undefined,o:D.o?D.o(S,v):100,x,run:()=>{chatMark(v);return twDo(S,v,k,true)+"."}})};
  const g=G();
  add("visit",`nàng quý ngươi +${g.visit[0]} · Sức nàng +${g.visit[1]}`);
  {const x=twFoeOf(S,v);if(x)add("mediate",`nàng bớt oán ${x.name} ${g.mediate}`)}
  add("humil",`nàng oán ngươi +${g.humil[0]} · Danh nàng -${g.humil[1]}`);
  add("test",`thành: ngươi tin nàng hơn +${g.test[0]} · hỏng: ngờ vực ${g.test[1]}`);
  add("drop",`ngươi lạnh với nàng -${g.drop}`);
  add("follow",`nàng quý ngươi +${g.follow}`);
  add("gossip",`một phi tần khác Danh -${g.gossip}`);
  add("admon",`Sủng nàng -${g.admon} · hai tuần ngài để ý người khác`);
  add("flaunt",`mọi phi tần ghen +${g.flaunt}`)}catch(e){console.error(e)}return A}})();
/* her Thái hậu / Hoàng hậu greetings: the same BAL.tw cost (gains stay in her card's w/l, which read the same numbers) */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&(p.kind==="th"||p.kind==="hh")){const g=G();for(const a of A){
  if(p.kind==="th"&&a.n==="Thỉnh an, chép kinh"){a.c=twCost("thTH");a.o=od(g.thTHo);a.w={th:g.thTH[0],danh:g.thTH[1],duc:g.thTH[2]};a.l={th:g.thTH[3]}}
  if(p.kind==="hh"&&a.n==="Thỉnh an"){a.c=twCost("thHH");a.o=od(g.thHHo);a.w={hh:g.thHH[0],danh:g.thHH[1],duc:g.thHH[2]};a.l={hh:g.thHH[3]}}}}
  if(p&&p.kind==="ksp")for(const a of A)if(a.n==="Đút lót lật thẻ"){a.c=twCost("ksp");a.go=()=>{S.tablet=G().ksp}}}catch(e){}return A}})();
