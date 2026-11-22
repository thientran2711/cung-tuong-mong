/* ================= jaudit — fixes from the act audit (dev/test/ACT_AUDIT.md) =================
   1. NOTICE QUEUE (owner 08:35Z): whatever changes HER numbers or relations while time passes (court petitions, NPC acts,
      monthly pay, delayed results of her own acts) shows a kit result card when it happens — after any open dialog, never
      blocking. The week book stays a recap. Built on resultShow (KIT §7), so the card lists the real before → after. ============ */
(function(){if(typeof nextBuoi!=="function")return;let depth=0;window.__aaNote=null;
 const n0=nextBuoi;nextBuoi=function(){if(depth||!S||S.dead||window.__bot){return n0.apply(this,arguments)}depth++;const b=rsnap();let r;
  try{r=n0.apply(this,arguments)}finally{depth--}
  try{if(b&&S&&!S.dead){/* not noticed: Sức alone (the nightly rest), a servant's small drift (≤2) — everything else that touched her is */
   const ch=RKEYS.some(([k])=>k!=="suc"&&(S[k]||0)!==b[k])||(typeof relSnap==="function"&&b.rel&&JSON.stringify(relSnap())!==JSON.stringify(b.rel))||(S.maid&&Math.abs(S.maid.loyal-(b.maidL!=null?b.maidL:S.maid.loyal))>2);
   if(ch){window.__aaNote={b,t:"Trong cung vừa qua"};aaNoteFlush()}}}catch(e){console.error(e)}return r};
 window.aaNoteFlush=function(){const N=window.__aaNote;if(!N||!S||S.dead)return;const m=document.getElementById("modal");if(Q.length||(m&&!m.hidden)){setTimeout(aaNoteFlush,600);return}
  window.__aaNote=null;try{resultShow(N.t,N.b,null)}catch(e){console.error(e)}};
 /* acts that pass time inside themselves already show their own result card: only top-level time passing is noticed */
 for(const f of ["act","doAct","talk","servAct","courtAct","empAct","chooseM","kidAct","goTo"]){const g=window[f];if(typeof g!=="function")continue;window[f]=function(){depth++;try{return g.apply(this,arguments)}finally{depth--}}}})();

/* 2. NO SILENT RANDOM TARGET for her acts (owner 08:45Z). The person an act lands on is named on the card ("về: …"):
   - Phế phi "Hỏi chuyện cũ": she tells of the consort with the most real deeds (j78deeds), else the one most hostile to her (was: pick()).
   - "Nhờ giúp đỡ": the consort she would tell about is the one she likes least (was: the first in the list, unnamed). */
function aaFallenT(){const L=liveRivals(true);if(!L.length)return null;const d=v=>typeof j78deeds==="function"?j78deeds(v).length:0;
 return L.slice().sort((x,y)=>(d(y)-d(x))||(danger(y,S)-danger(x,S))||(x.id-y.id))[0]}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{
 if(p&&p.kind==="fallen"){const i=A.findIndex(a=>a.n==="Hỏi chuyện cũ");const x=aaFallenT();if(i>=0&&x){const nm=(x.queen?"Hoàng hậu ":RANKS[x.rank].n+" ")+x.name;
  A[i]=Object.assign({},A[i],{x:`về: ${nm} · biết 1 điều thật về nàng · chứng cứ ${balSg(BAL.eff.jaudit.evN)} nếu nàng từng làm điều sai`,go:()=>{let f="";try{f=typeof intelLearn==="function"?intelLearn(x,1,{by:"Phế phi",how:"Hỏi chuyện cũ"}):""}catch(e){}const n=evA(S,x,BAL.eff.jaudit.evN);try{evdSync()}catch(e){}log(`Phế phi kể chuyện của ${nm}: ${f||"một chuyện cũ"}${n?` Chứng cứ ${balSg(BAL.eff.jaudit.evN)}.`:" Không có gì làm chứng cứ."}`)}})}}
 if(p&&(p.kind==="rival"||p.kind==="hh")&&p.ref){const v=p.ref;const i=A.findIndex(a=>a.n==="Nhờ giúp đỡ");if(i>=0){const x=liveRivals(true).filter(y=>y!==v).sort((a,b)=>aff(v,a)-aff(v,b))[0];
  if(x)A[i]=Object.assign({},A[i],A[i].lock&&/cần thiện cảm 30/.test(A[i].t||"")&&!knows(v)?{t:`cần thiện cảm 30 (${KIT_REL.unknown})`}:{},{x:`nàng cho mượn Bạc +${BAL.audit.loan} hoặc kể chuyện về ${x.name} (chứng cứ ${balSg(BAL.eff.jaudit.evRun)} nếu ${x.name} từng làm điều sai)`,run:()=>{chatMark(v);if(aff(v,S)>=30){if(roll(50)&&v.bac>=BAL.audit.loan){ap(v,{bac:-BAL.audit.loan});apply({bac:BAL.audit.loan});return `${v.name} cho ngươi mượn ${BAL.audit.loan} lượng.`}return evA(S,x,BAL.eff.jaudit.evRun)?`${v.name} kể cho ngươi một chuyện về ${x.name}: chứng cứ ${balSg(BAL.eff.jaudit.evRun)}.`:`${v.name} kể chuyện về ${x.name}: không có gì sai trái, chỉ biết ${harmTxt(x)}.`}affAdd(v,S,BAL.eff.jaudit.run);return `${v.name} khéo từ chối. Thiện cảm ${balSg(BAL.eff.jaudit.run)}.`}})}}}catch(e){console.error(e)}return A}})();

/* 3. HIDDEN RISK of sending a servant (act audit): when she is not with the target, a consort act is done by her best servant
   (runAct → bestSent). For harm acts he may be caught (confessRisk): he confesses (the target holds 1 more chứng cứ against her)
   and 3 times in 10 he is beaten to death in Thận Hình ti (servCaught) — her servant is lost. The card never said so. Now the
   card names him and that risk in Kèm (same formula as the roll). */
(function(){if(typeof actLineRaw!=="function")return;const a0=actLineRaw;actLineRaw=function(k,w,c){let h=a0.apply(this,arguments);try{
 const v=typeof J78==="object"&&J78.cardV;if(!v||!S||v===S||together(S,v)||["accuse","vp","xx","gift","steal","road","takeaway"].includes(k))return h;const sv=bestSent(S);
 const tin=s=>s?String(h).replace(/thành: ([^·]+)/,(m,x)=>`thành: ${x.trim()} · Chủ tin với ${s.name} +3 `):h;/* runAct → servMerit(sv,2) → tinAdd 1.5×2 */
 if(["ally","spy"].includes(k))return tin(sv);
 h=tin(sv);const r=confessRisk(sv);/* previews: runAct (sent servant confesses) */return h+` · kèm: ${sv?`${sv.name} được sai đi`:"người được sai"} bị bắt thì khai ra ngươi (nàng nắm ${balAb(BAL.eff.j9.evN)} chứng cứ), có khi bị đánh chết: ${typeof chanceW==="function"?chanceW(r):word(r)}`}catch(e){}return h}})();

/* 4. ĐỀ BẠT (owner): she raises her own servant one tier (SRK), capped by srkMax for her rank; NPC mistresses by the same rule
   (servRanks already promotes by merit; an NPC may also đề bạt a loyal servant early, same numbers). Numbers in BAL (one source).
   Tier effects (real code): each tier makes errands easier (runAct: sent penalty −3 per tier); Chưởng sự cô cô (maid tier 3)
   opens "Chưởng sự tra xét cung nữ"; a Thủ lĩnh/Tổng quản thái giám (eunuch tier ≥ 3) helps her be chosen at night (+4);
   tier ≥ 2 draws a monthly allowance from her purse (Bạc −tier/2 a month). No thị vệ servants exist: thị vệ are palace men (MROLES),
   not a household tier — nothing to promote there. */
Object.assign(BAL,{dbLoyal:55,dbMerit:3,dbCost:[0,20,30,40,80,120],dbGain:8,dbEnvy:3,dbBase:70,dbFail:2});
function dbCost(s){return BAL.dbCost[Math.min(BAL.dbCost.length-1,srk(s)+1)]||100}
function dbOdds(o,s){return oddsCl(Math.round(BAL.dbBase+((s.loyal||0)-50)/5+((s.mp||0)-BAL.dbMerit)*2-(srk(s)-1)*8))}
function dbNeed(o,s){const L=[];const mx=srkMax(o,s);L.push({ok:srk(s)<mx,t:srk(s)<mx?`Phẩm đủ đến ${SRK[s.role][mx]}`:`Phẩm chỉ đủ đến ${SRK[s.role][mx]}`});
 L.push({ok:(s.loyal||0)>=BAL.dbLoyal,t:`Lòng ${s.loyal} (cần ${BAL.dbLoyal})`});L.push({ok:(s.mp||0)>=BAL.dbMerit,t:`Công lao ${s.mp||0} (cần ${BAL.dbMerit})`});return L}
function dbDo(o,s,road,paid){const c=dbCost(s);const fav=road==="fav";/* D41: two roads of equal worth — bạc (lót tay) or favour (spFav, jpromsv) */
 const fv=fav&&typeof spFav==="function"?spFav(o,s):null;if(!paid&&(fav?!fv||!fv.ok:(o.bac||0)<c))return null;if(!dbNeed(o,s).every(x=>x.ok))return null;
 if(!paid&&fav)spPayFav(o,fv);/* review ag-all-2 r2 A5: the lót tay bạc only when Nội vụ phủ approves (OD 17/11 ~17:10Z (1)); she must hold it (the gate above / tsNeedBac) */const ok=aRoll(dbOdds(o,s),o);if(ok&&!fav)ap(o,{bac:-Math.min(c,Math.max(0,o.bac||0))});const nm=s.name;const r0=srk(s);
 const others=(o.staff||[]).filter(x=>x!==s);
 if(ok){s.rk=srk(s)+1;s.mp=0;s.loyal=cl(s.loyal+BAL.dbGain,0,100);others.forEach(x=>x.loyal=cl(x.loyal-BAL.dbEnvy,0,100));
  if(o===S)log(`Ngươi đề bạt ${nm} lên ${srkName(s)}${fav&&fv?` (${fv.how})`:""}: lòng +${BAL.dbGain}; kẻ hầu khác ghen tị (lòng -${BAL.dbEnvy}).`);try{if(typeof spAfter==="function")spAfter(o,s,r0)}catch(e){console.error(e)}return true}
 s.loyal=cl(s.loyal-BAL.dbFail,0,100);if(o===S)log(`Nội vụ phủ chưa duyệt việc đề bạt ${nm}: ${fav?"lời xin đã mất":"Nội vụ phủ không nhận bạc"}, ${nm} hơi thất vọng (lòng -${BAL.dbFail}).`);return false}
(function(){if(typeof servJudgeBtns!=="function")return;const j0=servJudgeBtns;servJudgeBtns=function(s){const B=j0.apply(this,arguments);try{if(ownerOf(s)!==S)return B;
 const mx=srkMax(S,s),nx=SRK[s.role][srk(s)+1];if(!nx)return B;const c=dbCost(s);const N=dbNeed(S,s);const t2=whyTime(1);
 const un=N.filter(x=>!x.ok).map(x=>x.t);const fv=typeof spFav==="function"?spFav(S,s):null;const why=t2||(un.length?un[0]:"")||(S.bac<c&&!(fv&&fv.ok)?`thiếu bạc (cần ${c})${fv?` hoặc ${fv.lbl} ${fv.n}`:""}`:"");
 const eff=s.role==="maid"?(srk(s)+1>=BAL.srvRk.cs?"mở việc Chưởng sự tra xét cung nữ":"sai việc dễ hơn"):(srk(s)+1>=3?"đêm được chọn dễ hơn chút, sai việc dễ hơn":"sai việc dễ hơn");
 const btn=pbtn(`data-dbsv="${s.sid}"`,`Đề bạt lên ${nx}`,`${word(dbOdds(S,s))} · tốn: 1 khắc, chọn một đường: lót tay Nội vụ phủ (cần ${c} bạc)${fv?` hoặc ${fv.lbl} -${fv.n} (${fv.how})`:""} · thành: thăng bậc, lòng +${BAL.dbGain}, ${eff}, lót tay thì Bạc -${c} · hỏng: ${fv?"lời xin thì mất, lót tay thì không mất bạc":"không mất bạc"}, lòng -${BAL.dbFail} · kèm: kẻ hầu khác ghen tị (lòng -${BAL.dbEnvy})${typeof spKemTxt==="function"?spKemTxt(S,s):""}${srkTier(srk(s)+1,s.role)>=2?` · (từ bậc này, thưởng tháng Bạc -${Math.floor(srkTier(srk(s)+1,s.role)/2)})`:""}`,why);
 return B.concat([btn.replace("<button ",`<button data-kneed="${encodeURIComponent(JSON.stringify(N))}" `)])}catch(e){console.error(e);return B}}})();
document.addEventListener("click",e=>{const b=e.target.closest("[data-dbsv]");if(!b||b.disabled||!S||S.dead||Q.length)return;e.stopPropagation();const s=servById(+b.dataset.dbsv);if(!s||!can(1))return;
 if(typeof spOpen==="function"){spOpen(s);return}/* D41: the two-road card (jpromsv) */
 const bf=rsnap();const fz=dbOdds(S,s);/* read before the spend (j9 fzRun) */spend(1);const r=fzRun(fz,null,()=>dbDo(S,s));if(r==null)return;try{resultShow(`Đề bạt ${s.name}`,bf,r)}catch(x){}render()},true);
/* NPC mistresses: the same act, by motive — a loyal, deserving servant, a purse that can pay, once in a while */
(function(){if(typeof servRanks!=="function")return;const r0=servRanks;servRanks=function(){const ev=r0.apply(this,arguments);try{if(typeof mlGuest==="function"&&mlGuest())return ev;/* co-op guest: NPC promotions roll on the host */for(const p of liveRivals(true)){{const L=(p.staff||[]).filter(s=>dbNeed(p,s).every(x=>x.ok)&&s.loyal>=BAL.loy.trust);/* npc-purpose G2: the mistress raises the trusted servant she values most, when she has a reason (cooldown = cadence) */
 const o=L.length?npcWhy("dbPromo",{p,L}):null;const s=o&&o.t;if(s){if((p.bac||0)>=dbCost(s)*2)dbDo(p,s);else if(typeof spFav==="function"&&spFav(p,s).ok)dbDo(p,s,"fav")}}}}catch(e){console.error(e)}return ev}})();

/* 5. RELATION NUMBERS ON CARDS = THE REAL CHANGE (owner: "a card must show what will really happen").
   The real change goes through affAdd/oanAdd, which scale a rise by the target's nết (persF "trust" for quý ta, "slight" for oán ta;
   j28). relAdd(a,t,n) also moves oán: n<0 → oán ta +0.6·|n|, n>0 → oán ta −0.3·n. Cards now draw the number with the SAME
   functions; when she does not know all of the target's nết, the card shows the honest range ("oán ta +3 đến +11"). */
function aaMulRange(t,f){if(!t||t===S||typeof persF!=="function")return[1,1];const T=traitsOf(t),K=typeof trKnown==="function"?trKnown(t):[];
 if(T.every(x=>K.includes(x)))return[persF(t,f,1),persF(t,f,1)];let lo=1,hi=1;for(const x of T){if(K.includes(x)){const v=PERS[x]&&PERS[x][f]!=null?PERS[x][f]:1;lo*=v;hi*=v}else{const vs=Object.values(PERS).map(P=>P[f]!=null?P[f]:1);lo*=Math.min(...vs);hi*=Math.max(...vs)}}return[lo,hi]}
function aaNum(base,t,f){const sg=base<0?-1:1;if(base<=0||!f)return{a:base,b:base};const [lo,hi]=aaMulRange(t,f);return{a:Math.round(base*lo),b:Math.round(base*hi)}}
function aaSay(lab,r){const s=n=>(n>0?"+":"")+n;return r.a===r.b?`${lab} ${s(r.a)}`:`${lab} ${s(r.a)} đến ${s(r.b)}`}
/* affAdd(t,S,n): how much she likes you; oanAdd(t,S,n): her grudge */
/* ONE set of relation words (owner 09:55Z, VANPHONG §1): the value her → you is "thiện cảm" (chip "Nàng → ta: thiện cảm"),
   yours → her "Ta → nàng: thiện cảm"; the grudge stays "oán". Cards: "thiện cảm +10", "oán ta +8". */
const KIT_REL={aff:"thiện cảm",affThem:"Nàng → ta: thiện cảm",affMe:"Ta → nàng: thiện cảm",oan:"oán ta",unknown:"chưa rõ nàng nghĩ gì"};window.KIT_REL=KIT_REL;
function pvQuy(t,n){return aaSay(KIT_REL.aff,aaNum(n,t,"trust"))}
function pvOan(t,n){if(n<0)return `bớt oán ta ${Math.round(-n)}`;const r=aaNum(n,t,"slight");r.a=Math.max(1,Math.round(r.a));r.b=Math.max(r.a,Math.round(r.b));return aaSay(KIT_REL.oan,r)}
function pvRel(t,n){return n<0?`${pvQuy(t,n)}, ${pvOan(t,-n*.6)}`:`${pvQuy(t,n)}, ${pvOan(t,-n*.3)}`}
/* caught by the target's people (j8 caught): evA 2 + relAdd(−10) */
(function(){if(typeof kaCaughtTxt!=="function")return;const k0=kaCaughtTxt;kaCaughtTxt=function(v,k){const r=k0.apply(this,arguments);try{return r?`${r}, ${pvRel(v,-10)}`:r}catch(e){return r}}})();
/* consort acts: outcome texts written from the code (j8 ACT.f) with the scaled numbers for the card's target */
(function(){const T=()=>typeof J78==="object"&&J78.cardV||null;const def=(k,fn)=>{try{const old=AOUT[k];Object.defineProperty(AOUT,k,{configurable:true,enumerable:true,get(){const t=T();return t?fn(t):old},set(v){}})}catch(e){}};
 def("spy",t=>[`chứng cứ ${balSg(BAL.eff.jtruth.evN)}, Tâm cơ +2`,`bị lộ: ${pvRel(t,-8)}`]);
 def("ally",t=>[`${pvRel(t,25)}, nàng bớt ghen 10`,`bị lạnh nhạt: ${pvRel(t,-5)}`]);
 def("rumor",t=>["Danh nàng -8",`không ai tin: nàng nắm ${balAb(BAL.eff.j8.evF)} chứng cứ, ${pvRel(t,-5)}`]);
 def("frame",t=>["nàng mất Danh và Sủng -10, Danh +3, Tâm cơ +2",`bị lộ: Danh -15, Sủng -8, ${pvRel(t,-30)}, nàng nắm ${balAb(BAL.eff.j8.evF_2)} chứng cứ, bị cấm túc 2 tháng`]);})();
/* Tranh sủng / Chặn ngự giá (stealWin: relAdd −15, ghen +25) */
(function(){if(typeof stealX!=="function")return;const s0=stealX;stealX=function(v,road){const h=s0.apply(this,arguments);try{return h.replace(/kèm: (.+?) ghen \+25, thù -15/,(m,n)=>`kèm: ${n} ghen +25, ${n} ${pvRel(v,-15)}`)}catch(e){return h}}})();
/* talk options on a consort's card: "thiện cảm ±N" / "oán ±N" are affAdd/oanAdd on her → scaled, in the new labels */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const v=p&&p.ref;if(!v||!(p.kind==="rival"||p.kind==="hh"))return A;
 return A.map(a=>{if(a&&a.n==="Thỉnh an"&&!/ghen/.test(a.x||""))a=Object.assign({},a,{x:(a.x?a.x+" · ":"")+"nàng bớt ghen 5"});if(!a||!a.x||typeof a.x!=="string")return a;let x=a.x.replace(/(nàng )?thiện cảm ([+\-−])(\d+)/g,(m,_,sg,n)=>pvQuy(v,(sg==="+"?1:-1)*+n)).replace(/(nàng )?oán ([+\-−])(\d+)/g,(m,_,sg,n)=>pvOan(v,(sg==="+"?1:-1)*+n));
  return x===a.x?a:Object.assign({},a,{x})})}catch(e){console.error(e);return A}}})();
/* 6. acts that showed NO result card (act audit): Hỏi người hầu "đó là ai?" (j61 k61Ask) and Soát rương đồ (j8 invAct "inspect") */
try{wrapR("k61Ask",()=>"Hỏi người hầu: đó là ai?");wrapR("invAct",a=>a==="inspect"?"Soát rương đồ":"Tư trang")}catch(e){console.error(e)}


/* 8. NO DO-NOTHING BUTTON (owner 07:30Z). "Hỏi han sức khỏe" now has a purpose that fits its meaning: a small "quý ta" by her
   temperament (affAdd, so persF trust applies; the second time in a month only +1) and, if she is unwell, she may tell what ails
   her (chance by her liking for you; Đa nghi hides it more). Costs 1 khắc like every talk. */
function aaHealthO(v){return oddsCl(Math.round(45+aff(v,S)/2-((typeof traitsOf==="function"&&traitsOf(v).includes("Kín đáo"))?15:0)))}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const v=p&&p.ref;if(!v||!(p.kind==="rival"||p.kind==="hh"))return A;
 const i=A.findIndex(a=>a&&a.n==="Hỏi han sức khỏe");if(i<0)return A;const n=(S.chat&&S.chat[v.id])?1:2;const ill=illOf(v)&&!illKnown(v);
 A[i]=Object.assign({},A[i],{x:`${pvQuy(v,n)}${ill?` · nàng có thể kể bệnh của mình: ${word(aaHealthO(v))}`:" · biết nàng khỏe hay yếu"}`,run:()=>{chatMark(v);affAdd(v,S,n);
  let t=`${v.name} cảm động vì được hỏi han.`;const I=illOf(v);if(I&&!illKnown(v)){if(roll(aaHealthO(v))){I.known=true;t+=` Nàng kể đang mắc ${illName(v)}.`}else t+=" Nàng chỉ cười, giấu chuyện bệnh tật."}else if(I)t+=` Nàng vẫn đang ${illName(v)}.`;else t+=` Nàng khỏe mạnh (Sức ${v.suc>=BAL.sucLv.ask[1]?"tốt":v.suc>=BAL.sucLv.ask[0]?"vừa":"yếu"}).`;return t}});return A}catch(e){console.error(e);return A}}})();

/* 9. "ban chết" on cards = what deathSentence (j8) really does; the odds word is the real one (it was forced to "Liều") */
function aaDeathTxt(){/* law4-typed: prints the BAL keys deathSentence (j8) applies — her Sủng drawn once (sgStat) */const E=BAL.eff.j8;if(typeof S==="object"&&S&&S.turn<E.mercyTurn&&!S.mercy)return`tội chết — năm đầu được tha một lần: giáng một bậc, cấm túc ${E.mercyConfine} tháng, Danh ${balSg(E.danhDeathSentence)}, ${sgStat(E.sungDeathSentence)}`;return has("nhantu")?"tội chết (Hoàng thượng nhân từ: có khi chỉ đày vào lãnh cung)":"tội chết: mất mạng"}
(function(){for(const k in ACT){const A=ACT[k];if(A&&typeof A.x==="string"&&/ban chết/.test(A.x)){const x0=A.x;Object.defineProperty(A,"x",{configurable:true,get(){return x0.replace(/ban chết/,aaDeathTxt())},set(v){}})}}
 if(typeof actLineRaw==="function"){const a0=actLineRaw;actLineRaw=function(){const h=a0.apply(this,arguments);return typeof h==="string"?h.replace(/(bị (?:tra ra|lộ)): ban chết/g,(m,p)=>`${p}: ${aaDeathTxt()}`):h}}})();

/* 10. CUNG NHÂN words + names (owner 10:10Z) */
Object.assign(KIT_REL,{srvThem:"Thiện cảm",srvTrust:"Ta tin cậy",runner:"Đang là người chạy việc"});
/* the bars on a servant card: her attitude = "Thiện cảm" (was Lòng), her trust in him = "Ta tin cậy" (was Chủ tin); the runner is
   marked on HIS card, not on the maid's */
if(typeof bondBars==="function"){bondBars=function(s){let r="";try{const b=bestSent(S);r=b&&b===s?` <span class="past">· ${KIT_REL.runner}</span>`:""}catch(e){}return sbar(KIT_REL.srvThem,s.loyal,"lo")+(s.sid!=null||typeof s.tin==="number"?sbar(KIT_REL.srvTrust,tinOf(s),"ti"):"")+r}}
/* the runner is household info (owner 10:10Z): not a line of the maid's card but "Người chạy việc của cung: X" with the household block; jhc's line (tap = meaning, "Đổi ›") is kept */
(function(){const r0=window.runnerLine;window.runnerHouse=function(){try{return typeof r0==="function"?String(r0()).replace("Người chạy việc:","Người chạy việc của cung:"):""}catch(e){return""}};window.runnerLine=function(){return""}})();
/* names: unique, never "Thúy 2" — any old numbered name is renamed once (from the one name core, jname.js) */
function aaNamesFix(){if(!S)return;try{const all=allServ().concat(S.maid?[S.maid]:[]);const used=new Set(all.map(s=>s.name));
 for(const s of all){if(!/\d/.test(s.name||""))continue;const n=nmNew(s.role==="eunuch"?"eun":"maid");used.add(n);s.name=n}}catch(e){}}
(function(){if(typeof mkServ==="function"){const m0=mkServ;mkServ=function(){const s=m0.apply(this,arguments);try{if(/\d/.test(s.name))s.name=nmNew(s.role==="eunuch"?"eun":"maid")}catch(e){}return s}}
 if(typeof deser==="function"){const d0=deser;deser=function(){const r=d0.apply(this,arguments);aaNamesFix();return r}}})();
/* strip label = the NAME only (owner): a title is dropped ("Thái y Trương" → "Trương Bá"; "Tiểu Ngân Tử" → "Ngân Tử" as before).
   Someone known only by title + surname gets a fixed given name (same every time). One label function for every strip: shortN. */
(function(){if(typeof shortN!=="function")return;const s0=shortN;const T=/^(Thái y|Tổng quản|Nội vụ|Ma ma|Thái giám|Ngự y|Thị vệ) /;const G=["Bá","Văn","Đức","Minh","Khải","Trọng"];
 shortN=function(nm){const n=String(nm||"");const m=T.exec(n);if(m){const rest=n.slice(m[0].length).trim();if(!rest)return n;const w=rest.split(" ");if(w.length>=2)return w.slice(-2).join(" ");let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;return `${rest} ${G[h%G.length]}`}return s0.apply(this,arguments)}})();

/* 11. MÀU CHIỀU QUAN HỆ (owner, KIT §11.2): a relation LABEL is coloured by its direction — người khác → ta purple (--rel-them),
   ta → người khác blue (--rel-me). The number keeps its Được/Mất colour. kitRel(dir,text) is the one builder; kitRelPaint(root)
   colours the labels already written as text everywhere (cards, chips, Ân oán, Giao tình, stage, week book, result cards). */
function kitRel(dir,text){return `<span class="krel krel-${dir==="me"?"me":"them"}" data-vp-skip>${text}</span>`/* final words already: the word fixer keeps "Nàng oán ta" as is */}
window.kitRel=kitRel;KIT_REL.paint=null;
const KREL_RE=kRx([
 "(Ta|ta) → (nàng(?: ta)?|hắn|y|người ấy|[\\p{Lu}][\\p{L}]*(?: [\\p{Lu}][\\p{L}]*){0,2}): thiện cảm","(Ta|ta) tin cậy","tin cậy(?= [\\p{Lu}][\\p{L}]* [\\p{Lu}]?[\\p{L}]*\\s?[+\\-−]?\\d)","tin cậy(?= [+\\-−]?\\d)",
 "(Nàng(?: ta)?|Hắn|Y|Hoàng hậu|Thái hậu|Hoàng thượng|Người ấy|[\\p{Lu}][\\p{L}]*(?: [\\p{Lu}][\\p{L}]*){0,2}) → (ta|người ấy|nàng): thiện cảm","[\\p{Lu}][\\p{L}]*(?: [\\p{Lu}][\\p{L}]*){0,3} với ta","(?:(?:[Nn]àng(?: ta)?|Hoàng hậu|Thái hậu|[Hh]ắn) )?(?:bớt )?oán ta","(?<![\\p{L}])thiện cảm(?= [+\\-−]?\\d|:| của)","(?<![\\p{L}])Thiện cảm(?= [+\\-−]?\\d|:|$| của)","(?<![\\p{L}])(?:[Nn]àng(?: ta)? )?ghen(?= [+\\-−]\\d)"].join("|"),"gu");
function kitRelPaint(root){if(!root||!root.querySelectorAll)return;const W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|SELECT)$/.test(p.tagName)||p.closest(".krel,[data-vp-skip]"))return NodeFilter.FILTER_REJECT;KREL_RE.lastIndex=0;return KREL_RE.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
 const L=[];while(W.nextNode())L.push(W.currentNode);
 for(const n of L){const v=n.nodeValue;KREL_RE.lastIndex=0;let m,last=0;const f=document.createDocumentFragment();
  while((m=KREL_RE.exec(v))){const t=m[0];const me=/^(Ta|ta)\b|^tin cậy/.test(t)||/^(Ta|ta) /.test(t);if(m.index>last)f.appendChild(document.createTextNode(v.slice(last,m.index)));const sp=document.createElement("span");sp.className="krel krel-"+(me?"me":"them");/* the subject stays inside the label (owner 15:30Z: a lone "Nàng " node became "Nàng ta oán ta") */sp.textContent=t.replace(/^([Nn])àng ta (?=(?:bớt )?oán|ghen)/,"$1àng ");sp.setAttribute("data-vp-skip","");f.appendChild(sp);last=m.index+t.length}
  if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)}}
(function(){const st=document.createElement("style");st.id="krel-css";st.textContent=".krel-them{color:var(--rel-them,#7a4fa0)!important;font-weight:600}.krel-me{color:var(--rel-me,#2f6f9f)!important;font-weight:600}";document.head.appendChild(st);
 /* review/newgame-ui (perf): only the CHANGED parts are walked (was the whole body after every DOM change: ~25 ms per change on a tablet,
    a face pick or a picture swap paid it again) */
 let q=false;const R=new Set();const run=()=>{q=false;const L=[...R].filter(n=>n&&n.isConnected);R.clear();try{L.filter(n=>!L.some(o=>o!==n&&o.contains(n))).forEach(n=>kitRelPaint(n))}catch(e){}};
 const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData"){const p=m.target.parentElement;if(p)R.add(p)}else for(const n of m.addedNodes){const e=n.nodeType===1?n:n.parentElement;if(e&&!(e.classList&&e.classList.contains("krel")))R.add(e)}}if(R.size&&!q){q=true;requestAnimationFrame(run)}});
 const go=()=>{try{mo.observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}R.add(document.body);run()};if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();

/* 12. kitThey(p): the third person for another person (owner 11/15): a woman "nàng ta", a man "y" ("hắn" only when hostile),
   Hoàng thượng "bệ hạ", Thái hậu "Thái hậu", unknown "vị ấy". "ta" is always the player. On-screen text that still says a bare
   "nàng" is turned into "nàng ta" by VP (j84). */
function kitThey(p,hostile){try{if(!p)return"vị ấy";if(p===S.emp||p.kind==="emp")return"bệ hạ";if(p.kind==="th"||p==="th")return"Thái hậu";
 const man=p.role==="eunuch"||p.kind==="man"||p.rw||p.sex==="m"||(typeof S.men==="object"&&Array.isArray(S.men)&&S.men.includes(p));if(man)return hostile?"hắn":"y";
 if(p.role==="maid"||p.kind==="rival"||p.kind==="hh"||(rivals||[]).includes(p)||p.queen!=null)return"nàng ta";return"vị ấy"}catch(e){return"vị ấy"}}
window.kitThey=kitThey;

/* 13. every other consort-act outcome text that says "thù −N" / "thân ±N" is a relAdd in the code (j8): drawn with the real numbers */
(function(){const T=()=>typeof J78==="object"&&J78.cardV||null;for(const k of Object.keys(AOUT)){const d=Object.getOwnPropertyDescriptor(AOUT,k);if(!d||d.get||!Array.isArray(d.value))continue;const old=d.value;
 const fx=s=>{const t=T();if(!t||typeof s!=="string")return s;return s.replace(/(nàng )?thù -(\d+)/g,(m,_,n)=>pvRel(t,-n)).replace(/(nàng )?(?:thân|thiện cảm) ([+\-])(\d+)/g,(m,_,sg,n)=>pvRel(t,(sg==="+"?1:-1)*n))};
 try{Object.defineProperty(AOUT,k,{configurable:true,enumerable:true,get(){return old.map(fx)},set(v){}})}catch(e){}}})();

/* 14. harm acts offered at a PLACE (j9 placeHarms) drew their card from ACT.x + the cost as a gain: no Tốn line, no outcome,
   no caught risk. They now use the same outcome texts as the consort card (AOUT, with real numbers for this target) and their
   real cost in Tốn (the act itself pays it, so the talk() pre-charge is refunded at once). Khiêu khích: relAdd −15, not "oán +10". */
(function(){if(typeof placeHarms!=="function")return;const p0=placeHarms;const KEY={"Dò la":"spy","Tung tin đồn":"rumor","Bỏ độc vào trà nàng":"poison","Bỏ xạ hương vào thuốc nàng":"musk","Đẩy con nàng xuống hồ":"pond","Đẩy nàng xuống hồ sen":"pushp","Ngáng chân nàng":"trip"};
 const COST={pushp:{duc:-12},trip:{duc:-4}};
 placeHarms=function(v,k){const H=p0.apply(this,arguments);return H.map(h=>{const key=KEY[h.n];if(!key||!AOUT[key])return h;const c=(ACT[key]&&ACT[key].c&&Object.keys(ACT[key].c).length?ACT[key].c:COST[key])||null;
  return Object.assign({},h,{k:key,c,tgt:v,run:()=>{if(c)apply(Object.fromEntries(Object.entries(c).map(([a,b])=>[a,-b])));return h.run()}})})}})();
(function(){if(typeof optLine!=="function")return;const o0=optLine;optLine=function(a){if(!a||!a.tgt||typeof J78!=="object")return o0.apply(this,arguments);const pv=J78.cardV;J78.cardV=a.tgt;try{return o0.apply(this,arguments)}finally{J78.cardV=pv}}})();
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const v=p&&p.ref;if(!v||p.kind!=="rival")return A;const i=A.findIndex(a=>a&&a.n==="Khiêu khích");
 if(i>=0)A[i]=Object.assign({},A[i],{x:`${pvRel(v,-15)}, nàng ta ghen +10`})}catch(e){}return A}})();

/* 15. her own Sủng on act-card outcome texts goes through sg() like the real change (j1 apply: Hoàng thượng nóng nảy ×1.3,
   lạnh lùng ×0.7 on gains) — "Sủng -8" on a static outcome text is drawn as the real −10 */
(function(){if(typeof actLineRaw!=="function"||typeof sg!=="function")return;const a0=actLineRaw;actLineRaw=function(){const h=a0.apply(this,arguments);if(typeof h!=="string")return h;
 return sgTxt(h)/* SG-CARD: the ONE rewrite (j1 sgTxt) — the same one every option card reads through kitParse */}})();

/* 16. THIẾU LỄ (owner): at formal moments (thỉnh an Thái hậu / Hoàng hậu, gặp Hoàng thượng) a consort who wears nothing proper for
   her rank (nothing worn, or what she wears is clearly below her rank: worn luxury < BAL.thieuLe.frac × her rank's allowance)
   loses Danh/Đức and the host likes her a little less; a strict host (Thái hậu Đa nghi/Kiêu ngạo, Hoàng hậu Kiêu ngạo/Nóng nảy)
   reacts more. A bestowed rank set (review/gift-chest: p.rankSet === her rank, worn) always satisfies it. Vượt phẩm stays its own
   rule (jinv luxMonth). Same rule for NPCs (j28 serveTH). The card shows it in advance in Kèm; "Vì sao" names it. */
Object.assign(BAL,{thieuLe:{danh:-2,duc:-1,aff:-3,strict:1.5,frac:.35}});
function aaThieuLe0(p){try{if(!p||p.out)return false;if(p.rankSet!=null&&p.rankSet===rkOf(p)&&p.rankSetWorn)return false;if(typeof luxOf!=="function")return false;const x=luxOf(p);if(x.sc>0)return x.sc<x.bud*BAL.thieuLe.frac;
 /* nothing worn: thiếu lễ only when she could have dressed (a bestowed rank set, or wearable things in her chest) — nobody is blamed for clothes she does not own */
 return p.rankSet!=null||(p.inv||[]).some(e=>!e.h&&IT[e.k]&&itm(e.k).sl)}catch(e){return false}}
function aaHostStrict(host){try{if(host==="th"){const t=traitsOf({kind:"th"});return t.includes("Kín đáo")||t.includes("Kiêu ngạo")}if(host&&host.queen)return traitsOf(host).some(t=>t==="Kiêu ngạo"||t==="Nóng nảy")}catch(e){}return false}
function aaThieuLeFx(host){const B=BAL.thieuLe,m=aaHostStrict(host)?B.strict:1;return{danh:B.danh,duc:B.duc,aff:Math.round(B.aff*m)}}
function aaThieuLeTxt(host,f0){const f=f0||aaThieuLeFx(host);const who=host==="th"?"Thái hậu":host==="emp"?"Hoàng thượng":host&&host.queen?"Hoàng hậu":"chủ nhà";
 return `thiếu lễ (y phục dưới phẩm): Danh ${f.danh}, Đức ${f.duc}, ${host==="emp"?`Sủng ${f.aff>0?"+":""}${Math.round(f.aff/3)||-1}`:`${who} thiện cảm ${f.aff}`}`}
function aaThieuLeApply(host,f0){if(!f0&&!aaThieuLe(S))return;const f=f0||aaThieuLeFx(host);apply({danh:f.danh,duc:f.duc});
 if(host==="th")apply({th:f.aff});else if(host==="emp")apply({sung:Math.round(f.aff/3)||-1});else if(host&&host!==S)affAdd(host,S,f.aff);
 log(`<span class="r">Thiếu lễ: y phục của ngươi dưới phẩm ${RANKS[S.rank]?RANKS[S.rank].n:""}. ${aaThieuLeTxt(host).replace(/^thiếu lễ \(y phục dưới phẩm\): /,"")}.</span>`)}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!p)return A;const host=p.kind==="th"?"th":p.kind==="emp"?"emp":p.kind==="hh"?p.ref:null;if(!host)return A;const LA=leAttire(S,"thỉnh an",host);if(!LA.delta.danh&&!LA.delta.duc&&!LA.delta.aff)return A;
 return A.map(a=>{if(!a||(p.kind!=="emp"&&!/^Thỉnh an/.test(a.n)))return a;const w0=a.why,go0=a.go,run0=a.run;const FX=aaThieuLeFx(host);const add=aaThieuLeTxt(host,FX);
  const o=Object.assign({},a,{risk:[a.risk,add].filter(Boolean).join(" · "),why:()=>{const F=w0?w0():[];F.push([aaThieuLeWhy(host),0]);return F}});
  const fail0=a.fail;if(run0)o.run=function(){aaThieuLeApply(host,FX);return run0.apply(this,arguments)};
  else{o.go=function(){aaThieuLeApply(host,FX);return go0?go0.apply(this,arguments):undefined};o.fail=function(){aaThieuLeApply(host,FX);return fail0?fail0.apply(this,arguments):undefined}}return o})}catch(e){console.error(e);return A}}})();
/* the "Vì sao" line of the thiếu lễ rider is read from leAttire's real verdict (D47): in trung y the Danh/Đức price is the robe rule's (charged when she
   leaves her palace), so the line never claims "mất Danh/Đức" there; a frugal host pleased by plain dress is not "thiếu lễ" either */
function aaThieuLeWhy(host){try{const L=leAttire(S,"thỉnh an",host),who=host==="th"?"Thái hậu":host==="emp"?"Hoàng thượng":host&&host.queen?"Hoàng hậu":"chủ nhà",d=L.delta;
 if(d.aff>0)return`Y phục giản dị hợp ý ${who} (không đổi cơ may)`;
 if(L.ty)return`Đang mặc trung y trước bề trên: thiếu lễ, ${who} phật ý (không đổi cơ may; Danh/Đức đã tính theo lệ mặc trung y ra khỏi tẩm cung)`;
 const lose=[d.danh?"Danh":"",d.duc?"Đức":""].filter(Boolean).join("/");
 return`Y phục dưới phẩm: thiếu lễ, ${who} phật ý (không đổi cơ may${lose?`, mất ${lose}`:""})`}catch(e){return"Y phục dưới phẩm: thiếu lễ (không đổi cơ may)"}}
/* NPCs: the same rule when they wait on Thái hậu */
(function(){try{if(typeof SOC==="object"&&SOC.serveTH){const r0=SOC.serveTH.run;SOC.serveTH.run=function(v){const r=r0.apply(this,arguments);try{if(aaThieuLe(v)){const f=aaThieuLeFx("th");ap(v,{danh:f.danh});v.th=cl((v.th||0)+f.aff,-100,100)}}catch(e){}return r}}}catch(e){}})();

/* 17. leAttire(p, occasion, host) — ONE judgement of how someone is dressed for a formal moment (owner 11/15), used by Thiếu lễ and
   by review/toilette (the morning dress-up + makeup game writes p.toilette = {wk: wk() day key, score 0–100, makeup: bool}).
   Returns {state:"ok"|"plain"|"showy"|"overRank", delta:{danh,duc,aff}, why:[…]}. Host reaction by nết:
   etiquette-minded hosts (Thái hậu Đa nghi/Kiêu ngạo, Hoàng hậu Kiêu ngạo/Nóng nảy) punish "plain" ×BAL.thieuLe.strict;
   a frugal host (Thái hậu Hiền lành, Hoàng hậu Hiền lành/Khiêm nhường) approves plain dress (small +). Showy/overRank stay the
   luxury rules (jinv luxMonth / vượt phẩm) — here they only cost a little host favour with a frugal host. */
function leHostKind(host){try{const T=host==="th"?traitsOf({kind:"th"}):host&&host!=="emp"?traitsOf(host):[];
 if(T.some(t=>t==="Ân cần"||t==="Khiêm nhường"))return"frugal";if(host==="th"?T.some(t=>t==="Kín đáo"||t==="Kiêu ngạo"):T.some(t=>t==="Kiêu ngạo"||t==="Nóng nảy"))return"strict";}catch(e){}return"normal"}
function leAttire(p,occasion,host){p=p||S;const why=[];let state="ok";try{
 const x=typeof luxOf==="function"?luxOf(p):{lv:1,sc:1,bud:1};const tl=p.toilette&&p.toilette.wk!=null&&p.toilette.wk===(typeof wk==="function"?wk():-1)?p.toilette:null;/* one look per DAY (wk(): S.turn is the month, so turn*10+buoi never matched) */
 if(x.lv>=3){state="overRank";why.push("y phục vượt phẩm")}else if(x.lv===2){state="showy";why.push("y phục quá xa hoa")}
 else if(aaThieuLe0(p)){state="plain";why.push("y phục dưới phẩm")}
 else if(tl&&(tl.makeup===false||(tl.score|0)<40)){state="plain";why.push(tl.makeup===false?"không điểm trang":"điểm trang qua loa")}}catch(e){}
 const B=BAL.thieuLe,hk=leHostKind(host);let d={danh:0,duc:0,aff:0};
 if(state==="plain"){if(hk==="frugal"){d={danh:0,duc:1,aff:2};why.push("chủ nhà chuộng giản dị: hài lòng")}else{const m=hk==="strict"?B.strict:1;d={danh:B.danh,duc:B.duc,aff:Math.round(B.aff*m)};if(hk==="strict")why.push("chủ nhà trọng lễ: phật ý hơn")}}
 else if((state==="showy"||state==="overRank")&&hk==="frugal"){d={danh:0,duc:0,aff:-2};why.push("chủ nhà chuộng giản dị: không vừa mắt")}
 return{state,delta:d,why,occasion:occasion||"",host}}
window.leAttire=leAttire;
/* Thiếu lễ now reads leAttire (one judgement): the card text and the applied change are its delta */
aaThieuLeFx=function(host){const r=leAttire(S,"",host);return r.delta};
function aaThieuLe(p){return aaThieuLe0(p)}

/* the card / log words follow leAttire's verdict (thiếu lễ, or a frugal host pleased, or a frugal host frowning at luxury) */
aaThieuLeTxt=function(host,f0){const L=leAttire(S,"",host),f=f0||L.delta;const who=host==="th"?"Thái hậu":host==="emp"?"Hoàng thượng":host&&host.queen?"Hoàng hậu":"chủ nhà";
 const head=f.aff>0?`giản dị hợp ý ${who}`:L.state==="plain"?`thiếu lễ (${L.why[0]||"y phục dưới phẩm"})`:`${L.why[0]||"y phục"}, ${who} không vừa mắt`;
 const parts=[f.danh?`Danh ${f.danh>0?"+":""}${f.danh}`:"",f.duc?`Đức ${f.duc>0?"+":""}${f.duc}`:"",f.aff?(host==="emp"?`Sủng ${f.aff>0?"+1":Math.round(f.aff/3)||-1}`:`${who} thiện cảm ${f.aff>0?"+":""}${f.aff}`):""].filter(Boolean);
 return `${head}: ${parts.join(", ")}`};
aaThieuLeApply=function(host,f0){const L=leAttire(S,"",host),f=f0||L.delta;if(!f.danh&&!f.duc&&!f.aff)return;apply({danh:f.danh,duc:f.duc});
 if(host==="th")apply({th:f.aff});else if(host==="emp")apply({sung:f.aff>0?1:(Math.round(f.aff/3)||-1)});else if(host&&host!==S)affAdd(host,S,f.aff);
 const t=aaThieuLeTxt(host,f);log(`${f.aff>0?"":'<span class="r">'}${t[0].toUpperCase()+t.slice(1)}.${f.aff>0?"":"</span>"}`)};

/* 18. ONE odds pipeline (coordinator 11/15): the six acts that skipped odA now go through it, so Sức < 30, Quẻ tuần and the
   sent-servant penalty apply to the roll, and the card (ACT.o + sentPenNow) shows the same number.
   Ly gián, Hạ độc dần, Tố tội thật, Bóc chuyện tư tình (j30 odT) · Xin Hoàng hậu giáng (j30) · Trình Hoàng hậu (j78). */
odT=function(a,base){return odA(a,base+(a.tamco||0)/4)};
(function(){const card=(k,raw)=>(a,t)=>{const v=raw(a,t);if(v==null)return v;const o=odA(a,v);if(a!==S||!t||ACTX.a)return o;const p=typeof sentPenNow==="function"?sentPenNow(a,t,k):0;return p?oddsCl(o-p):o};
 const X=ACT.xinhh;if(X){const raw=(a,t)=>{const q=queenP();return q?30+aff(q,a)/2-aff(q,t)/2:null};X.o=card("xinhh",raw);
  X.f=(a,t)=>{/* AG-ALL-2d4 (OD 17/11 ~17:10Z (1)): the gift is taken only when the Empress agrees; refused → returned */const q=queenP();const o=odA(a,raw(a,t));
   /* RECEIVER CHOICE (jrcv RCVJ.xinhh, review FAIL 6 #3): the Hoàng hậu decides — she as the Hoàng hậu gets the card; an NPC queen the SAME options, yes at these odds */
   const oz=aOdd(o,a);/* the frozen shown odds (fzRun) / an NPC road's +up (jtamco), econ-tamco F2 */if(typeof rcvJudge==="function")return rcvJudge("xinhh",a,t,oz);if(roll(oz)){econPayWin(a,"xinhh",t,BAL.actBac.xinhh);return `Hoàng hậu nghe lời ${NM(a)}, tâu xin giáng ${NM(t)}. `+demote(t,"bị Hoàng hậu tâu giáng")}affAdd(q,a,BAL.eff.jaudit.f);return `Hoàng hậu gạt lời ${NM(a)} đi, lễ vật trả lại. `}}
 const T=ACT.trinhhh;if(T){const raw=(a,t)=>{const q=queenP();return q?35+aff(q,a)/2+evG(a,t)*8:null};T.o=card("trinhhh",raw);
  T.f=(a,t)=>{const q=queenP();const o=odA(a,raw(a,t));evA(a,t,BAL.eff.jaudit.evF);/* RECEIVER CHOICE (jrcv RCVJ.trinhhh): she as the Hoàng hậu gets the card */
   const oz=aOdd(o,a);if(typeof rcvJudge==="function")return rcvJudge("trinhhh",a,t,oz);if(roll(oz)){punish(t,"bị Hoàng hậu xét tội theo chứng cứ",1);affAdd(t,a,BAL.eff.jaudit.f_2);return `${j78Who(a)} trình chứng cứ lên Hoàng hậu: ${j78who(t)} bị xét tội. `}affAdd(q,a,BAL.eff.jaudit.f_3);return `Hoàng hậu bác chứng cứ ${j78who(a)} trình về ${j78who(t)}. `}}})();

/* 19. an oán preview when the target is not chosen yet (j55 "Dò la nhà ngoại": relAdd −8 + oán +8 → oán ≈ 12.8 × her nết) */
function pvOanAny(n){try{const vs=Object.values(PERS).map(P=>P.slight!=null?P.slight:1);const lo=Math.max(1,Math.round(n*Math.min(...vs))),hi=Math.round(n*Math.max(...vs)*Math.max(1,Math.max(...vs)));return lo===hi?`oán ta +${lo}`:`oán ta +${lo} đến +${hi}`}catch(e){return `oán ta +${Math.round(n)}`}}

/* 20. "bị phạt" on cards = what punish() (j8) does: cấm túc N tháng (Hoàng thượng nóng nảy 3, nhân từ 1, thường 2);
   a grave fault (sev 2) may instead cost one rank (nóng nảy: always, nhân từ: 1 in 4, else half the time) */
function aaPunishTxt(sev){const m=punishMonths();return sev>=2?`bị phạt: cấm túc ${m} tháng, giáng một bậc: ${chanceW(punishDemoP())}`/* a side chance: chanceW, never a ladder word (KIT § odds words) */:`bị phạt: cấm túc ${m} tháng`}
(function(){if(typeof actLineRaw!=="function")return;const a0=actLineRaw;actLineRaw=function(k){const h=a0.apply(this,arguments);if(typeof h!=="string")return h;const sev={frame:2,ksab:2,accuse:2}[k]||1;return h.replace(/bị phạt(?! ?[:(])/g,aaPunishTxt(sev))}})();

/* 21. Lục rương (j2 + j78): the caught risk now carries the real numbers for this consort (relAdd −15 → thiện cảm −15, oán ta scaled
   by her nết) and the real punishment (punish sev 1) */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(p&&p.kind==="chest"&&p.ref){const v=p.ref;const i=A.findIndex(a=>a&&a.n==="Lục rương tìm chứng cứ");
 if(i>=0)A[i]=Object.assign({},A[i],{risk:`cung nhân của nàng ta bắt gặp: ${pvRel(v,-15)}, ${aaPunishTxt(1)}`})}}catch(e){}return A}})();

/* 22. servant start · Lĩnh đồ ở Nội vụ phủ: srvMeet (j42) has a hidden 1-in-4 "bắt nạt: Sức −5" — now on the card in Kèm */
(function(){if(typeof srvCards!=="function")return;const c0=srvCards;srvCards=function(){const X=c0.apply(this,arguments);try{for(const a of X||[])if(a&&a.n==="Lĩnh đồ ở Nội vụ phủ"&&!/bắt nạt/.test(a.x||""))a.x=(a.x?a.x+" · ":"")+`kèm: bị thái giám Nội vụ phủ bắt nạt, Sức -5: ${typeof chanceW==="function"?chanceW(25):"khả năng thấp"}`}catch(e){}return X}})();

/* 23. MINI-GAME ACTS — one shared path (owner bug 11/15, live: one tap on the Hành sự card "Tự học Nấu nướng" paid Sức −15, Bạc −6
   and 2 khắc and showed a BẠI card, and only THEN the game intro opened). Cause: every act that opens a mini-game paid and rolled
   as a plain act first — the deck card through act() → runOpt (cost, roll, result card), then its go opened the game; the
   lesson buttons through lessonMode (j23) and the "làm ra tác phẩm gì?" dialog (j83 chooseM, material Bạc); the veil craft
   (jveil) the same way. The game itself then decides the real outcome.
   Now, for every act that opens a mini-game (all of them go through openMG or playArt):
   (a) one tap = one act: a lesson/practice tap is ignored while its dialog or game is open, and for 700 ms after a tap;
       a deck card is marked done at once and refuses while a game is open;
   (b) a tap opens only the intro: whatever the act took before the game opened (Sức, Bạc, Thái hậu, khắc) is put back at once and
       kept as pending; no roll, no result card. The deck card does not go through runOpt at all;
   (c) the pending cost is paid when the game reports (played or "Để trời định"); closing the game unplayed costs nothing;
   (d) one result card comes LAST, after the game screen closes: the cost plus what the game gave, sealed by the score
       (THÀNH from 5 of 10, the 2-point lesson; after "Để trời định" by what the quick lesson gave); none when the game shows its own result dialog
       (the veil craft). */
(function(){let lastTap=0;window.__aaL=0;
 const ovOpen=()=>{const ov=document.getElementById("ov");return !!(ov&&!ov.hidden)||!!document.querySelector("#kg82go,.kg82act")};
 const busy=()=>!!(S&&(S.mg||window.__aaPend||(Q.length&&Q[0]&&/làm ra tác phẩm gì|^Học |^Tự học|mạng che mặt/.test(Q[0].t||""))))||ovOpen();
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-learn],[data-wkprac]");if(!b)return;const now=Date.now();
  if(busy()||now-lastTap<700){e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();return}lastTap=now},true);
 const KEYS=["suc","bac","th"];const snap=()=>({suc:S.suc,bac:S.bac,th:S.th,used});
 const diff=(b,extra)=>{const c={khac:used-b.used};KEYS.forEach(k=>c[k]=(S[k]||0)-(b[k]||0)-((extra&&extra[k])||0));return c};
 const putBack=(b,extra)=>{KEYS.forEach(k=>S[k]=b[k]+((extra&&extra[k])||0));used=b.used};
 const keep=c=>{window.__aaPend=c;if(S.mg)S.mg.cost=c;try{save()}catch(e){}try{render()}catch(e){}};
 /* run fn; if it opened a mini-game, undo what it paid and keep that pending (the outermost call does it, once) */
 window.aaDefer=function(fn,ctx,args,extra){if(!S||window.__aaPend||(S.mg&&S.mg.cost))return fn.apply(ctx,args);const b=snap(),L=window.__aaL;window.__aaL=0;let r;
  window.__aaIn=(window.__aaIn||0)+1;const rs0=window.__aaRS;window.__aaRS=null;
  try{r=fn.apply(ctx,args)}finally{window.__aaIn--;const went=window.__aaL;window.__aaL=L||went;const held=window.__aaRS;window.__aaRS=rs0;
   if(went&&!window.__aaPend&&!(S.mg&&S.mg.cost)){const c=diff(b,extra);putBack(b,extra);keep(c)}
   /* review 11/15 (veil craft): a result card the act raised while its game was opening is dropped — the one result comes after the game */
   else if(held&&!went){try{window.__aaR0.apply(held.t,held.a)}catch(e){console.error(e)}}}return r};
 if(typeof lessonMode==="function"){const l0=lessonMode;lessonMode=function(){let mat=0;try{if(typeof wkPend==="object"&&wkPend&&WK[wkPend.kind])mat=WK[wkPend.kind].mat[wkPend.mat]||0}catch(e){}
  return window.aaDefer(l0,this,arguments,mat?{bac:mat}:null)}}
 if(typeof chooseM==="function"){const c0=chooseM;chooseM=function(){return window.aaDefer(c0,this,arguments)}}
 if(typeof vlCraftRun==="function"){const v0=vlCraftRun;vlCraftRun=function(){window.__aaTitle="Tự tay kết mạng che mặt";return v0.apply(this,arguments)}}
 /* the Hành sự deck cards that open a game (j83 wkDeckCard): no runOpt — the act() guards, then straight to the game */
 if(typeof wkDeckCard==="function"){const w0=wkDeckCard;wkDeckCard=function(){const a=w0.apply(this,arguments);if(a)a.aaMG=1;return a}}
 if(typeof act==="function"){const a0=act;act=function(i){const a=Array.isArray(deck)&&deck[i];if(!a||!a.aaMG||typeof a.go!=="function")return a0.apply(this,arguments);
  if((a.b!=null&&(S.buoi||0)!==a.b)||!can(cardCost(a))||a.done||S.dead||Q.length||!canPay(a)||busy())return;
  a.done=1;const c={khac:cardCost(a)};KEYS.forEach(k=>c[k]=(a.c&&a.c[k])||0);window.__aaTitle=a.n;window.__aaL=0;
  KG82.preBack=()=>{a.done=0;S.mg=null};/* KIT §13.9: ✕ before «Sẵn sàng» = the card back untaken, nothing paid (the cost was only pending) */try{a.go()}finally{KG82.preBack=null}
  if(window.__aaL)keep(c);else{a.done=0;window.__aaTitle=null}render()}}
 /* the one result, after the game screen closes */
 let fin=null;
 const showLast=(title,before,ok,q0)=>{let n=0;const t=setInterval(()=>{if(++n>2400||(!ovOpen()&&!(S&&S.mg))){clearInterval(t);fin=null;
   try{if(S&&!S.dead&&Q.length<=q0)window.__aaR0(title,before,ok)}catch(e){console.error(e)}}},250)};
 window.aaPayMG=function(score){try{const m=S&&S.mg;const c=(m&&m.cost)||window.__aaPend;if(m)m.cost=null;window.__aaPend=null;if(!c||fin)return;
  const before=rsnap(),q0=Q.length;apply({suc:c.suc||0,bac:c.bac||0,th:c.th||0});if(c.khac)spend(c.khac);
  const sc=score||{};const ok=sc.skip?null:sc.raw!=null?sc.raw>=5:sc.g!=null?sc.g>=2:true;
  const ttl=(window.__aaTitle||sc.title||"Trò tài nghệ")+(sc.skip?" · để trời định":sc.raw!=null?` · phần chơi ${sc.raw}/10`:"");window.__aaTitle=null;
  fin=1;showLast(ttl,before,ok,q0)}catch(e){console.error(e)}};
 if(typeof playArt==="function"){const p0=playArt;playArt=function(o){window.__aaL=1;if(o&&typeof o.onDone==="function"){const d0=o.onDone,ttl=o.title;
  o=Object.assign({},o,{onDone:function(raw,x){const sk=!!(x&&x.skipped);const r1=cl(Math.round(raw||0),0,10);window.aaPayMG({title:ttl,skip:sk,ok:r1>=5,raw:sk?null:r1});return d0.apply(this,arguments)}})}return p0.call(this,o)}}
 if(typeof openMG==="function"){const o0=openMG;openMG=function(k,lv,cb){window.__aaL=1;let ttl="";try{const m=S.mg,a=ARTS.find(x=>x.k===k);ttl=`${m&&m.mode==="prac"?"Tự học":m&&m.mode==="self"?"Tự học":m&&m.mode==="th"?"Học với Thái hậu":"Học"} ${a?a.n:""}`}catch(e){}
  if(ttl&&!window.__aaTitle)window.__aaTitle=ttl;const cb2=typeof cb==="function"?function(g){window.aaPayMG({title:ttl,g});return cb.apply(this,arguments)}:cb;return o0.call(this,k,lv,cb2)}}
 if(typeof resultShow==="function"){const r0=resultShow;window.__aaR0=r0;resultShow=function(){if(window.__aaPend||fin||(ovOpen()&&S&&S.mg))return;if(window.__aaIn){window.__aaRS={t:this,a:arguments};return}return r0.apply(this,arguments)}}})();

/* 17. RANK + NAME TOGETHER (owner 15/11 "phẩm và tên người lúc nào cũng phải đi chung", review/pick-hint): a person's name on screen
   always comes with her/his title (rank / post) in the kit name colours. Producers mostly use kitName / kitFacts (kpPeopleIn) already;
   the rest (dialog titles such as "Tâm trạng · X", kit row values, logs, toasts, lists, option lines) wrote the bare name. kitRankNamePaint
   (root) finds every known full name in a text node that is not already inside a .kname and not already after its title (same text,
   the text just before it, or earlier in the same block), and puts kitName(p) (title + name, rank colour) in its place. Names already
   written as "title name" in plain text are left to the rank-colour pass. Short names (roster strip under portraits: "Thục Nghi") are
   not full names and are never touched. Opt out: [data-krn-skip]. dry=true returns the bare sites instead (dev/test/rank-name-scan.js). */
const KRN_SKIP=".kname,.kti,.knr,.krl,.pcname,.pcrk,[data-vp-skip],[data-krn-skip],.kpt-mount,.kslot,script,style,textarea,input,option,select";
const KRN_BLK=".kft,.krv,.kitem,.logs > div,p,li,button,.kptitle,.kpsub,figcaption,td,.kpnote,.tag";
let KRN_C={k:"",rx:null,m:null};
/* lag-play (owner 16/11 15:05Z): one rank-name pass reads the title of every person (kitTitle -> kitFace -> portrait/figure lookups)
   for the table AND again per match, per root: ~0.8 s per tab on a slow phone. Inside ONE pass (no game state changes there) each
   person's title is read once. */
let KRN_TM=null;
function krnT(p){if(!KRN_TM)return kitTitle(p);if(KRN_TM.has(p))return KRN_TM.get(p);const t=kitTitle(p);KRN_TM.set(p,t);return t}
/* review/lag-play-2: the table (every person's name + title through kitTitle → kitFace, ~100-250 ms at 4x) is rebuilt only after a render
   (titles change only through game actions, which render): window.__rendN is the render counter (jlag2.js). */
function krnTable(){if(KRN_C&&KRN_C.rn!=null&&KRN_C.rn===window.__rendN&&KRN_C.S===S)return KRN_C;const t=krnTable0();if(t){t.rn=window.__rendN;t.S=S}return t}
function krnTable0(){let L=[];try{L=kpPeople().filter(([n,p])=>p&&p!==S&&n.split(" ").length>=2&&krnT(p))}catch(e){return null}if(!L.length)return null;
 const k=L.map(x=>x[0]).join("|");if(KRN_C.k===k)return KRN_C;const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
 KRN_C={k,m:new Map(L),rx:kRx(`(?<![\\p{L}\\p{M}])(${L.map(x=>esc(x[0])).join("|")})(?![\\p{L}\\p{M}])`,"gu")};return KRN_C}
function krnPrevText(n){try{return typeof k61PrevText==="function"?k61PrevText(n):""}catch(e){return""}}
function krnTitled(before,t,nm,blkPre){const b=String(before||"");if(t&&(kpTitleTail(b,t)||kpTitleTail(b.trimEnd()+" ",t)))return true;
 if(KP_TITLE_RX.test(b.slice(-40)))return true;/* any title word just before ("Phi Ôn Mạn Châu" with a stale rank is still a titled name) */
 return !!blkPre&&blkPre.includes(kitTitled(t,nm))}
function kitRankNamePaint(root,dry){if(!KRN_TM){KRN_TM=new Map();try{return kitRankNamePaint(root,dry)}finally{KRN_TM=null}}const out=[];if(!root||!S||!document.createTreeWalker)return out;const T=krnTable();if(!T)return out;
 const W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{/* review/lag-play-2: name test first, ancestor walk only for hits */T.rx.lastIndex=0;if(!T.rx.test(n.nodeValue))return NodeFilter.FILTER_REJECT;const p=n.parentElement;return !p||p.closest(KRN_SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
 const L=[];while(W.nextNode())L.push(W.currentNode);
 for(const n of L){const v=n.nodeValue;const blk=n.parentElement.closest(KRN_BLK)||n.parentElement;let blkPre="";
  try{const r=document.createRange();r.setStart(blk,0);r.setEnd(n,0);blkPre=r.toString()}catch(e){}
  const pv=krnPrevText(n);T.rx.lastIndex=0;let m,last=0,hit=false;const f=document.createDocumentFragment();
  while((m=T.rx.exec(v))){const nm=m[1],p=T.m.get(nm),t=krnT(p);const before=(v.slice(0,m.index).trim()?"":pv)+v.slice(0,m.index);
   if(krnTitled(before,t,nm,blkPre+v.slice(0,m.index)))continue;
   /* a name label on its own (card heading, portrait caption) whose title sits in a sibling element of the same card: titled */
   if(v.trim()===nm){let up=n.parentElement,ok=false;/* r1: a short sibling label of the name (person card .pcrk "Hoàng hậu" beside .pcname) holds its title */
    for(let e=n.parentElement,i=0;i<3&&e&&e.parentElement&&!ok;i++,e=e.parentElement)for(const c of e.parentElement.children){if(c===e||c.contains(e)||c.querySelector(".klab,img:not(.ic)")||c.matches(".md,.klab"))continue;/* a portrait fallback label is no title */const ct=(c.textContent||"").replace(/\s+/g," ").trim();if(ct&&ct.length<60&&t&&ct.toLowerCase().includes(t.toLowerCase())){ok=true;break}}
    for(let i=0;i<3&&up&&!ok;i++,up=up.parentElement){const tx=(up.textContent||"").replace(/\s+/g," ");if(tx.length<160&&kpTitleTail(tx.slice(0,Math.max(0,tx.indexOf(nm)))+"",t)||tx.length<160&&t&&tx.toLowerCase().includes(t.toLowerCase()))ok=true}if(ok)continue}
   if(dry){out.push({name:nm,title:t,where:(n.parentElement.closest("[id],[class]")||{}).className||"",id:(n.parentElement.closest("[id]")||{}).id||"",text:(blk.textContent||"").replace(/\s+/g," ").trim().slice(0,140)});continue}
   hit=true;if(m.index>last)f.appendChild(document.createTextNode(v.slice(last,m.index)));const sp=document.createElement("span");sp.innerHTML=kitName(p);f.appendChild(sp.firstChild||document.createTextNode(nm));last=m.index+nm.length}
  if(hit){if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)}}
 return out}
window.kitRankNamePaint=kitRankNamePaint;
/* review/pick-hint-r1: the observer repaints only the subtrees that changed in this frame (added nodes, edited text), not the whole body
   (a full-body pass costs 2-8 % of a render on the big tabs and ran on every mutating frame: count-ups, toasts, timers). Its own
   replacements are skipped (they hold no bare name), so it never loops; too many roots in one frame → one full pass. */
(function(){let q=false,full=true;const R=new Set();
 const run=()=>{q=false;const all=full,L=[...R];full=false;R.clear();if(window.__krnOff)return;
  KRN_TM=new Map();try{if(all||L.length>120){kitRankNamePaint(document.body);return}
   for(const n of L)if(n.isConnected&&!L.some(m=>m!==n&&m.contains(n)))kitRankNamePaint(n)}catch(e){}finally{KRN_TM=null}};
 const add=n=>{const e=n&&(n.nodeType===1?n:n.parentElement);if(e&&!(e.matches&&e.matches(".kname,.kname *")))R.add(e)};
 const mo=new MutationObserver(M=>{for(const m of M){if(m.type==="characterData")add(m.target);else m.addedNodes.forEach(add)}if(R.size&&!q){q=true;requestAnimationFrame(run)}});
 const go=()=>{try{mo.observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}full=true;run()};if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();
