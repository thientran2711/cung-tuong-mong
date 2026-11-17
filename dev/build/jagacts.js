/* ================= jagacts: AG-ALL part A — the acts of Hoàng hậu, Thái hậu and the consort acts the loop lacked =================
   Owner OD 17/11 ~13:20Z (L1588) + ~13:55Z: every group of NPCs gets the whole option set the player of that group has; missing acts are
   added without asking. Gap table: dev/handover/reports/ag-all.md §1 (consort), §5 (Thái hậu), §6 (Hoàng hậu). Core: jagday.js.
   Every option = the player's own act (same cost, same odds, same effect) registered with agReg; chosen by the day plan (needs × traits ×
   mindPick); lands through agLand → AGRUN (same pend / ledger / witness path). Numbers: BAL.ag.cx / .hh / .th (jbal2), the player's cards in
   j2 read the same BAL.ag.cx (ONE CORE). The old flat rolls these acts replace are off while the day plan runs (agDOn):
   j8 rivalsTurn HH judge roll(35·mindW) · TH gift roll(8) · HH conf roll(10) · HH reward roll(6); j20 payCuts roll(20), queenRewards;
   j75 monopoly admon roll(30); j14 TH release roll(10); j8 npcMonthly art roll(30) / shop roll(25) / gift roll(15) / ally roll(10) /
   rival gift roll(10); j85 npcStudy roll(40·nết) / charity roll(5).
   ===================================================================================================================== */
function agcU(v,N,o,g,c,tag,l){return agU(v,N,o,{g,l:l||{}},c||{},tag)}
function agcPay(v,c){if(c&&Object.keys(c).length)ap(v,c)}
function agcCan(v,c){if(!c)return true;if(c.bac<0&&(v.bac||0)<-c.bac)return false;if(c.suc<0&&(v.suc||0)+c.suc<=0)return false;return true}
function agcNm(v){return v===S?"ngươi":v==="th"?"Thái hậu":v&&v.queen?"Hoàng hậu "+v.name:v&&v.name||""}
/* ---------------- 1. CONSORT: the deck cards of j2 the loop lacked (the player's cards read the same BAL.ag.cx) ---------------- */
const AGCX={face:{act:"dưỡng nhan",tag:"self",at:v=>palaceOf(v)},arts:{act:"khổ luyện cầm kỳ thi họa",tag:"art",at:v=>palaceOf(v)},
 book:{act:"đọc binh thư, sử sách",tag:"scheme",at:v=>palaceOf(v)},alms:{act:"phát chẩn cho cung nhân",tag:"help",at:v=>palaceOf(v)},
 sutra:{act:"tụng kinh, làm việc thiện",tag:"greet",at:()=>"tn"},maidR:{act:"thưởng cung nữ thân tín",tag:"help",at:v=>palaceOf(v),ok:v=>!!(v.maid&&v.maid.loyal!=null&&v.maid.loyal<BAL.ag.cx.maidR.below)},
 rest:{act:"nghỉ ngơi dưỡng sức",tag:"self",at:v=>palaceOf(v),ok:v=>(v.suc||0)<BAL.ag.goal.rest}};
agReg("consort","cx",(v,N,need)=>{const O=[];const X=BAL.ag.cx;
 for(const k in AGCX){const D=X[k],A=AGCX[k];if(!D)continue;if(A.ok&&!A.ok(v))continue;if(need&&need!=="rest"&&D.need[need]==null)continue;if(need==="rest"&&k!=="rest")continue;if(!agcCan(v,D.c))continue;
  const g=Object.assign({},D.need);const N2=k==="rest"?Object.assign({},N,{rest:N.rest||0}):N;const u=agcU(v,N2,D.o,g,D.c,A.tag);if(u>0)O.push({k:"cx:"+k,t:null,u,tag:A.tag,act:A.act,at:()=>A.at(v)})}
 return O});
for(const k in AGCX)agRunReg("cx:"+k,(v,t,p)=>{const D=BAL.ag.cx[k];if(!agcCan(v,D.c))return"";agcPay(v,D.c);if(!roll(odA(v,D.o)))return `${v.name} ${AGCX[k].act} nhưng chẳng được gì`;
 const w=Object.assign({},D.w);if(w.maid){if(v.maid&&v.maid.loyal!=null)v.maid.loyal=cl(v.maid.loyal+w.maid,0,100);delete w.maid}ap(v,w);return `${v.name} ${AGCX[k].act}`});
/* study: Tự học / Học với thầy (the player's lesson; j85 npcStudyDo is the same rule for every NPC) */
agReg("consort","study",(v,N,need)=>{if(need&&need!=="danh"&&need!=="duc")return[];if(typeof npcStudyDo!=="function")return[];const D=BAL.ag.cx.study;if((v.suc||0)<D.suc)return[];
 const u=agcU(v,N,100,need==="duc"?{duc:D.g}:{danh:D.g},{suc:-D.suc},"art");return u>0?[{k:"cx:study",t:null,u,tag:"art",act:"tự học cầm kỳ thi họa, tứ đức",at:()=>palaceOf(v)}]:[]});
agRunReg("cx:study",(v)=>{const D=BAL.ag.cx.study;if((v.suc||0)<D.suc)return"";ap(v,{suc:-D.suc});npcStudyDo(v);return `${v.name} chăm chỉ học tập`});
/* Xin Thái hậu đỡ lời / Xin Hoàng hậu che chở (j2 talkOpts; same odds od(o + regard/div), same gates, same gains) */
agReg("consort","ask",(v,N,need)=>{const O=[];const X=BAL.ag.cx;
 if(!S.thDead&&(v.th||0)>=X.thHelp.min&&(!need||need==="hh"||need==="danh")){const o=odA(v,X.thHelp.o+(v.th||0)/X.thHelp.div);const u=agcU(v,N,o,{hh:X.thHelp.w.hh,danh:X.thHelp.w.danh},{},"greet",{th:X.thHelp.l.th});if(u>0)O.push({k:"cx:thHelp",t:null,u,tag:"greet",act:"xin Thái hậu đỡ lời",at:(kh)=>{const k=agThAt(kh);return k==="tn"?k:null}})}
 let q=null;try{q=queenP()}catch(e){}
 if(q&&q!==v&&!v.queen&&(v.hh||0)>=X.hhShield.min&&!v.shield&&(!need||need==="safe")){const o=odA(v,X.hhShield.o+(v.hh||0)/X.hhShield.div);const u=agcU(v,N,o,{safe:X.hhShield.g},{},"greet",{hh:X.hhShield.l.hh});if(u>0)O.push({k:"cx:hhShield",t:q,u,tag:"greet",act:"xin Hoàng hậu che chở",at:(kh,vv,t)=>t===S?"home":palaceOf(t)})}
 return O});
agRunReg("cx:thHelp",(v)=>{const X=BAL.ag.cx.thHelp;if(roll(odA(v,X.o+(v.th||0)/X.div))){ap(v,X.w);return `Thái hậu đỡ lời cho ${v.name}`}ap(v,X.l);return `${v.name} xin Thái hậu đỡ lời, Thái hậu không vui`});
agRunReg("cx:hhShield",(v,q)=>{const X=BAL.ag.cx.hhShield;if(roll(odA(v,X.o+(v.hh||0)/X.div))){ap(v,X.w);v.shield=X.sh;return `${agcNm(q)} nhận che chở cho ${v.name}`}ap(v,X.l);return `${v.name} xin ${agcNm(q)} che chở nhưng bị từ chối`});
/* Mua ở Nội vụ phủ (the shop: buy, same price) and Tặng quà (giveTo, the player's gift rule) */
agReg("consort","shop",(v,N,need)=>{if(need&&need!=="sung"&&need!=="ally"&&need!=="th")return[];const O=[];const X=BAL.ag.cx;
 if(!v.inv.some(e=>e&&!e.h&&IT[e.k]&&itm(e.k).gv&&!e.t)){const L=(S.shop||[]).filter(k=>IT[k]&&itm(k).gv&&!itm(k).il&&(v.bac||0)>=itm(k).pr+X.buy.keep);
  if(L.length){const k=L[Math.floor(Math.random()*L.length)];const u=agcU(v,N,100,{sung:X.buy.g,ally:X.buy.g,th:X.buy.g},{bac:-itm(k).pr},"shop");if(u>0)O.push({k:"cx:buy",t:null,u,tag:"shop",act:"mua đồ ở Nội vụ phủ",at:()=>"nvp",it:k})}}
 const i=v.inv.findIndex(e=>e&&!e.h&&IT[e.k]&&itm(e.k).gv&&!e.t);
 if(i>=0){const T=[];if(!need||need==="sung")T.push(["emp",N.sung||0,"sung"]);if(!S.thDead&&(!need||need==="th"))T.push(["th",N.th||0,"th"]);
  for(const [t,w,n] of T){const u=agcU(v,N,100,{[n]:X.gift.g},{},"help");if(u>0)O.push({k:"cx:gift",t:t==="emp"?S.emp:"th",u,tag:"help",act:t==="emp"?"dâng quà lên Hoàng thượng":"dâng quà lên Thái hậu",at:(kh)=>t==="emp"?agEmpAt(kh):agThAt(kh),gt:t})}
  if(!need||need==="ally"){const fr=others(v).filter(t=>t&&t!==v&&(t===S||t.alive)&&aff(v,t)>=BAL.ag.goal.friend);if(fr.length){const t=mindPickBy(fr,x=>BAL.mind.pick.ag.base+aff(v,x),v);const u=agcU(v,N,100,{ally:X.gift.g},{},"help");if(t&&u>0)O.push({k:"cx:gift",t,u,tag:"help",act:"đem quà sang tặng",at:(kh,vv,tt)=>tt===S?"home":agAt(tt,kh)})}}}
 return O});
agRunReg("cx:buy",(v)=>{const L=(S.shop||[]).filter(k=>IT[k]&&itm(k).gv&&!itm(k).il&&(v.bac||0)>=itm(k).pr+BAL.ag.cx.buy.keep);if(!L.length)return"";const k=L[Math.floor(Math.random()*L.length)];return buy(v,k)?`${v.name} mua ${itm(k).n} ở Nội vụ phủ`:""});
agRunReg("cx:gift",(v,t)=>{const i=v.inv.findIndex(e=>e&&!e.h&&IT[e.k]&&itm(e.k).gv&&!e.t);if(i<0||!t)return"";const r=giveTo(v,t===S.emp?"emp":t,i);return r?String(r).replace(/\.\s*$/,""):""});
/* Kết giao (ACT.ally: the player's act, its cost and odds) */
agReg("consort","ally",(v,N,need)=>{if(need&&need!=="ally")return[];if(!ACT.ally||(v.bac||0)<BAL.ag.cx.ally.bac)return[];const fr=others(v).filter(t=>t&&t!==v&&(t===S||t.alive)&&rel(v,t)>BAL.ag.cx.ally.rel);if(!fr.length)return[];
 const t=mindPickBy(fr,x=>BAL.mind.pick.ag.base+Math.max(0,rel(v,x)),v);if(!t)return[];const o=ACT.ally.o?ACT.ally.o(v,t):100;const u=agcU(v,N,o||100,{ally:BAL.ag.cx.ally.g},{bac:-BAL.ag.cx.ally.bac},"help");
 return u>0?[{k:"cx:ally",t,u,tag:"help",act:"sang kết giao",at:(kh,vv,tt)=>tt===S?"home":agAt(tt,kh)}]:[]});
agRunReg("cx:ally",(v,t)=>{if(!t||(v.bac||0)<BAL.ag.cx.ally.bac)return"";return String(ACT.ally.f(v,t)||"").replace(/\.\s*$/,"")});

/* ---------------- 2. HOÀNG HẬU: the player-as-Empress buttons (empAct: Xử tội / Tịch thu / Ban thưởng / Ân xá / Khất bổng lộc) ---------------- */
/* ONE function for her and the NPC Empress (empAct calls it for the player) */
function hhAct(a,v,k){const me=a===S;const nm=me?"Ngươi":`Hoàng hậu ${a.name}`;
 if(k==="cutpay"){v.cutPay=Math.max(v.cutPay||0,1);v.cutBy=me?"Hoàng hậu":a.name;relAdd(a,v,-BAL.ag.hh.cutRel);if(v===S)log(`<span class="r">Hoàng hậu ${a.name} sai Nội vụ phủ khất bổng lộc của ngươi tháng tới.</span>`);return `${nm} sai Nội vụ phủ khất bổng lộc của ${NM(v)} tháng tới`}
 if(k==="judge"){if(evG(a,v)<2)return"";return String(judge(a,v)).trim()}
 if(k==="conf"){const j=v.inv.findIndex(e=>(IT[e.k]||{}).kd==="Trang sức"&&!e.h);if(j<0)return"";if(evG(a,v)<1&&!vpItems(v).length){if(me)apply(BAL.tw.confNo);else ap(a,BAL.tw.confNo)}const n=iname(v.inv[j]);v.inv.splice(j,1);relAdd(a,v,-BAL.tw.g.conf[0]);v.hh=(v.hh||0)-BAL.tw.g.conf[1];return `${nm} tịch thu ${n} của ${NM(v)}`}
 if(k==="reward"){if((a.bac||0)<-BAL.tw.reward.bac)return"";if(me)apply(BAL.tw.reward);else ap(a,BAL.tw.reward);relAdd(a,v,BAL.tw.g.reward[0]);v.hh=(v.hh||0)+BAL.tw.g.reward[1];ap(v,{danh:BAL.tw.g.reward[2]});return `${nm} ban thưởng cho ${NM(v)}`}
 if(k==="pardon"){if(!v.confined&&!v.out)return"";if(v===S){try{restore(false,`Hoàng hậu ${a.name} ân xá`)}catch(e){S.out=false;S.confined=0}}else{if(v.out){v.out=false;v.rank=0}v.confined=0}relAdd(a,v,BAL.ag.hh.pardonRel);if(me)apply({duc:BAL.ag.hh.pardonDuc});else ap(a,{duc:BAL.ag.hh.pardonDuc});return `${nm} ân xá cho ${NM(v)}`}
 return""}
const AGHH={judge:{act:"xử tội",n:"spite"},conf:{act:"tịch thu trang sức",n:"spite"},reward:{act:"ban thưởng",n:"ally"},pardon:{act:"ân xá",n:"ally"},cutpay:{act:"khất bổng lộc",n:"spite"}};
agReg("hh","acts",(q,N,need)=>{if(q===S||!q.queen)return[];const H=BAL.ag.hh;const O=[];const road=(BAL.ag.road[agOrg(q)]||BAL.ag.road._);
 for(const p of consorts()){if(p===q||(p!==S&&!p.alive))continue;const sp=agSpite(q,p),fr=Math.max(0,aff(q,p));
  const N2=Object.assign({},N,{spite:cl(sp/100,0,1)*road.spite,ally:Math.max(N.ally||0,cl(fr/100,0,1)*road.ally)});
  const add=(k,ok,g,c)=>{if(!ok||(need&&need!==AGHH[k].n&&!(need==="duc"&&k==="pardon")))return;const u=agcU(q,N2,100,g,c||{},k==="reward"||k==="pardon"?"help":"punish");if(u>0)O.push({k:"hh:"+k,t:p,u,tag:"punish",act:AGHH[k].act,at:()=>palaceOf(q)})};
  if(!p.out){add("judge",evG(q,p)>=2&&rel(q,p)<0,{spite:H.g.judge,safe:H.g.judge});
   add("conf",(p.hh||0)<=H.confHh&&p.inv.some(e=>(IT[e.k]||{}).kd==="Trang sức"&&!e.h),{spite:H.g.conf});
   add("reward",(p.hh||0)>=H.rewardHh&&(q.bac||0)>=-BAL.tw.reward.bac,{ally:H.g.reward},{bac:BAL.tw.reward.bac});
   add("cutpay",rel(q,p)<H.cutRelMax&&!p.cutPay,{spite:H.g.cutpay})}
  add("pardon",(p.confined||p.out)&&aff(q,p)>=H.pardonAff,{ally:H.g.pardon,duc:H.g.pardon})}
 /* Khuyên Hoàng thượng mưa móc đều khắp (TW admon: her act when one consort holds his nights) */
 try{const f=favNow();if(f&&f.p!==q&&TW.admon&&TW.admon.req(q,f.p)&&(!need||need==="sung")){const u=agcU(q,N,100,{sung:H.g.admon},{},"greet");if(u>0)O.push({k:"admon",t:f.p,u,tag:"greet",act:"khuyên Hoàng thượng mưa móc đều khắp",at:kh=>agEmpAt(kh)})}}catch(e){}
 return O});
for(const k in AGHH)agRunReg("hh:"+k,(q,t)=>{if(!q||!q.queen||!t)return"";return hhAct(q,t,k)});
/* the player-as-Empress buttons call the same function */
(function(){const e0=empAct;empAct=function(i,k){const v=rivals[i];if(!v||S.rank<7||!can(2)||S.dead||Q.length||!AGHH[k])return e0.apply(this,arguments);
 if(k==="judge"&&evG(S,v)<2)return;if(k==="conf"&&v.inv.findIndex(e=>(IT[e.k]||{}).kd==="Trang sức"&&!e.h)<0)return;if(k==="reward"&&S.bac<-BAL.tw.reward.bac)return;if(k==="pardon"&&!v.confined&&!v.out)return;
 const r=hhAct(S,v,k);if(!r)return;spend(2);log(r+".");render()}})();

/* ---------------- 3. THÁI HẬU: her acts (gift, admonish, release from lãnh cung) chosen by her needs ---------------- */
agRegNeeds("th",()=>{const T=BAL.ag.th;let fav=null;try{fav=favNow()}catch(e){}let q=null;try{q=queenP()}catch(e){}
 const C=consorts().filter(p=>p===S||p.alive);const fond=C.filter(p=>(p.th||0)>=T.fondTh&&!(p.thGiftWk!=null&&wk()-p.thGiftWk<T.giftCd)).length;
 const mercy=C.some(p=>p.out&&(p.th||0)>=T.mercyTh);
 return{order:fav&&!(q&&q!==S&&q!==fav.p)?T.w.order:0,fond:fond?T.w.fond:0,mercy:mercy?T.w.mercy:0}});
agReg("th","acts",(th,N,need)=>{const T=BAL.ag.th;const O=[];const u=(n)=>(N[n]||0)*T.g[n];
 if((!need||need==="fond")&&N.fond){const L=consorts().filter(p=>(p===S||p.alive)&&!p.out&&(p.th||0)>=T.fondTh&&!(p.thGiftWk!=null&&wk()-p.thGiftWk<T.giftCd));
  const t=L.length?mindPickBy(L,x=>BAL.mind.pick.ag.base+(x.th||0),null):null;if(t)O.push({k:"th:gift",t,u:u("fond"),tag:"help",act:"ban thưởng",at:()=>"tn"})}
 if((!need||need==="order")&&N.order){const f=favNow();if(f&&!(f.p.admonWk!=null&&wk()-f.p.admonWk<BAL.tw.g.admonCd))O.push({k:"th:admon",t:f.p,u:u("order"),tag:"greet",act:"khuyên Hoàng thượng mưa móc đều khắp",at:kh=>agEmpAt(kh)||"dtd"})}
 if((!need||need==="mercy")&&N.mercy){const L=consorts().filter(p=>p.out&&(p.th||0)>=T.mercyTh&&(p===S||p.alive));const t=L.length?L[Math.floor(Math.random()*L.length)]:null;if(t)O.push({k:"th:release",t,u:u("mercy"),tag:"help",act:"mở lòng từ bi, tha khỏi lãnh cung",at:()=>"tn"})}
 return O});
agRunReg("th:gift",(th,p)=>{if(!p||S.thDead)return"";const k=BAL.ag.th.items[Math.floor(Math.random()*BAL.ag.th.items.length)];p.inv.push({k,from:"th"});p.thGiftWk=wk();
 if(p===S)Q.push({t:"Thái hậu ban thưởng",who:pTH(),h:`<p>Đức Thọ cung sai người mang đến <b>${itm(k).n}</b>.</p><p class="past">${itm(k).d}</p>`});return `Thái hậu ban ${itm(k).n} cho ${NM(p)}`});
agRunReg("th:admon",(th,p)=>{if(!p||S.thDead)return"";const me=p===S;const b=p.sung;ap(p,{sung:-BAL.tw.g.admon});p.admonWk=wk();
 const t=`Thái hậu khuyên Hoàng thượng “mưa móc đều khắp”, đừng chỉ sủng ${me?"ngươi":p.name}. ${b!==p.sung?`Sủng của ${me?"ta":p.name} ${b} → ${p.sung}.`:""}`;if(me)Q.push({t:"Mưa móc đều khắp",who:pTH(),h:`<p>${t}</p>`});return t.trim()});
agRunReg("th:release",(th,p)=>{if(!p||!p.out||S.thDead)return"";if(p===S){restore(false,"Thái hậu mở lòng từ bi");return"Thái hậu mở lòng từ bi, tha ngươi khỏi lãnh cung"}p.out=false;p.rank=0;p.confined=0;return `Thái hậu mở lòng từ bi, tha ${p.name} khỏi lãnh cung`});
/* ledger labels of the new deeds (dev table, tai mắt lines) */
try{for(const k in AGCX)ACT95["ag_cx:"+k]=AGCX[k].act;Object.assign(ACT95,{"ag_cx:study":"tự học","ag_cx:thHelp":"xin Thái hậu đỡ lời","ag_cx:hhShield":"xin Hoàng hậu che chở",
 "ag_cx:buy":"mua đồ ở Nội vụ phủ","ag_cx:gift":"đem quà đi tặng","ag_cx:ally":"sang kết giao","ag_admon":"khuyên Hoàng thượng mưa móc đều khắp","ag_th:gift":"ban thưởng","ag_th:admon":"khuyên Hoàng thượng","ag_th:release":"xét tha người ở lãnh cung"});
 for(const k in AGHH)ACT95["ag_hh:"+k]=AGHH[k].act}catch(e){}
/* ---------------- 4. THE EMPEROR's day: he calls someone to play đàn / cờ / du hồ with him (was jts weekly roll 14 × mood) ---------------- */
agRegNeeds("emp",()=>{const E=BAL.ag.emp2;let m=1;try{m=tsMoodW()}catch(e){}let busy="";try{busy=empBusy()}catch(e){}return{company:E.company*m*(busy?E.busyF:1),rest:busy?E.rest:0}});
agReg("emp","summon",(E,N,need)=>{if(need&&need!=="company")return[];if(S.dead||(typeof isSrv==="function"&&isSrv()))return[];const b=AG.cB!=null?AG.cB:agDayB();if(!BAL.ag.emp2.buoi.includes(j95c(b)))return[];
 const C=consorts().filter(p=>(p===S?!S.out&&!S.confined&&!(S.preg>=8):p.alive!==false&&!p.out&&!p.confined&&!(p.preg>=8)));if(!C.length)return[];
 const t=mindPickBy(C,x=>tsSummonW(x),E);if(!t)return[];return[{k:"emp:summon",t,u:N.company||0,tag:"social",act:"triệu người hầu đàn, đánh cờ",at:()=>"dtd"}]});
agRunReg("emp:summon",(E,t)=>{if(!t||S.dead)return"";if(t===S){if(S.out||S.confined)return"";tsSummonGo(S);return""}if(!t.alive||t.out||t.confined)return"";tsSummonGo(t);return""});
window.hhAct=hhAct;
