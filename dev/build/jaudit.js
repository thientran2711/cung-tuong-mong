/* ================= jaudit — fixes from the act audit (dev/test/ACT_AUDIT.md) =================
   1. NOTICE QUEUE (owner 08:35Z): whatever changes HER numbers or relations while time passes (court petitions, NPC acts,
      monthly pay, delayed results of her own acts) shows a kit result card when it happens — after any open dialog, never
      blocking. The week book stays a recap. Built on resultShow (KIT §7), so the card lists the real before → after. ============ */
(function(){if(typeof nextBuoi!=="function")return;let depth=0;window.__aaNote=null;
 const n0=nextBuoi;nextBuoi=function(){if(depth||!S||S.dead||window.__bot){return n0.apply(this,arguments)}depth++;const b=rsnap();let r;
  try{r=n0.apply(this,arguments)}finally{depth--}
  try{if(b&&S&&!S.dead){const ch=RKEYS.some(([k])=>(S[k]||0)!==b[k])||(typeof relSnap==="function"&&b.rel&&JSON.stringify(relSnap())!==JSON.stringify(b.rel))||(S.maid&&S.maid.loyal!==b.maidL);
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
  A[i]=Object.assign({},A[i],{x:`về: ${nm} · biết 1 việc thật nàng đã làm · chứng cứ +1`,go:()=>{let f="";try{f=typeof intelLearn==="function"?intelLearn(x,1,{by:"Phế phi",how:"Hỏi chuyện cũ"}):""}catch(e){}x.ev++;try{evdSync()}catch(e){}log(`Phế phi kể chuyện của ${nm}: ${f||"một chuyện cũ"}. Chứng cứ +1.`)}})}}
 if(p&&(p.kind==="rival"||p.kind==="hh")&&p.ref){const v=p.ref;const i=A.findIndex(a=>a.n==="Nhờ giúp đỡ");if(i>=0){const x=liveRivals(true).filter(y=>y!==v).sort((a,b)=>aff(v,a)-aff(v,b))[0];
  if(x)A[i]=Object.assign({},A[i],A[i].lock&&/cần thiện cảm 30/.test(A[i].t||"")&&!knows(v)?{t:`cần thiện cảm 30 (${KIT_REL.unknown})`}:{},{x:`cần thiện cảm 30${knows(v)?` (đang ${aff(v,S)})`:` (${KIT_REL.unknown})`} · cho mượn 30 lượng hoặc kể chuyện về ${x.name} (chứng cứ +1)`,run:()=>{chatMark(v);if(aff(v,S)>=30){if(roll(50)&&v.bac>=30){ap(v,{bac:-30});apply({bac:30});return `${v.name} cho ngươi mượn 30 lượng.`}evA(S,x,1);return `${v.name} kể cho ngươi một chuyện về ${x.name}: chứng cứ +1.`}affAdd(v,S,-3);return `${v.name} khéo từ chối. Thiện cảm -3.`}})}}}catch(e){console.error(e)}return A}})();

/* 3. HIDDEN RISK of sending a servant (act audit): when she is not with the target, a consort act is done by her best servant
   (runAct → bestSent). For harm acts he may be caught (confessRisk): he confesses (the target holds 1 more chứng cứ against her)
   and 3 times in 10 he is beaten to death in Thận Hình ti (servCaught) — her servant is lost. The card never said so. Now the
   card names him and that risk in Kèm (same formula as the roll). */
(function(){if(typeof actLineRaw!=="function")return;const a0=actLineRaw;actLineRaw=function(k,w,c){let h=a0.apply(this,arguments);try{
 const v=typeof J78==="object"&&J78.cardV;if(!v||!S||v===S||together(S,v)||["accuse","vp","gift","steal","road","takeaway"].includes(k))return h;const sv=bestSent(S);
 const tin=s=>s?String(h).replace(/thành: ([^·]+)/,(m,x)=>`thành: ${x.trim()}, Chủ tin với ${s.name} +3 `):h;/* runAct → servMerit(sv,2) → tinAdd 1.5×2 */
 if(["ally","spy"].includes(k))return tin(sv);
 h=tin(sv);const r=confessRisk(sv);return h+` · kèm: ${sv?`${sv.name} được sai đi`:"người được sai"} bị bắt thì khai ra ngươi (nàng nắm 1 chứng cứ), có khi bị đánh chết: ${word(r)}`}catch(e){}return h}})();

/* 4. ĐỀ BẠT (owner): she raises her own servant one tier (SRK), capped by srkMax for her rank; NPC mistresses by the same rule
   (servRanks already promotes by merit; an NPC may also đề bạt a loyal servant early, same numbers). Numbers in BAL (one source).
   Tier effects (real code): each tier makes errands easier (runAct: sent penalty −3 per tier); Chưởng sự cô cô (maid tier 3)
   opens "Chưởng sự tra xét cung nữ"; a Thủ lĩnh/Tổng quản thái giám (eunuch tier ≥ 3) helps her be chosen at night (+4);
   tier ≥ 2 draws a monthly allowance from her purse (Bạc −tier/2 a month). No thị vệ servants exist: thị vệ are palace men (MROLES),
   not a household tier — nothing to promote there. */
Object.assign(BAL,{dbLoyal:55,dbMerit:3,dbCost:[0,20,40,80,120],dbGain:8,dbEnvy:3,dbBase:70});
function dbCost(s){return BAL.dbCost[Math.min(BAL.dbCost.length-1,srk(s)+1)]||100}
function dbOdds(o,s){return cl(Math.round(BAL.dbBase+((s.loyal||0)-50)/5+((s.mp||0)-BAL.dbMerit)*2-(srk(s)-1)*8),5,95)}
function dbNeed(o,s){const L=[];const mx=srkMax(o,s);L.push({ok:srk(s)<mx,t:srk(s)<mx?`Phẩm ngươi cho phép đến ${SRK[s.role][mx]}`:`Phẩm ngươi chỉ cho phép đến ${SRK[s.role][mx]}`});
 L.push({ok:(s.loyal||0)>=BAL.dbLoyal,t:`Lòng ${s.loyal} (cần ${BAL.dbLoyal})`});L.push({ok:(s.mp||0)>=BAL.dbMerit,t:`Công lao ${s.mp||0} (cần ${BAL.dbMerit})`});return L}
function dbDo(o,s){const c=dbCost(s);if((o.bac||0)<c||!dbNeed(o,s).every(x=>x.ok))return null;ap(o,{bac:-c});const ok=roll(dbOdds(o,s));const nm=s.name;
 const others=(o.staff||[]).filter(x=>x!==s);
 if(ok){s.rk=srk(s)+1;s.mp=0;s.loyal=cl(s.loyal+BAL.dbGain,0,100);others.forEach(x=>x.loyal=cl(x.loyal-BAL.dbEnvy,0,100));
  if(o===S)log(`Ngươi đề bạt ${nm} lên ${srkName(s)}: lòng +${BAL.dbGain}; kẻ hầu khác ghen tị (lòng -${BAL.dbEnvy}).`);return true}
 s.loyal=cl(s.loyal-2,0,100);if(o===S)log(`Nội vụ phủ chưa duyệt việc đề bạt ${nm}: tiền lót tay mất, ${nm} hơi thất vọng (lòng -2).`);return false}
(function(){if(typeof servJudgeBtns!=="function")return;const j0=servJudgeBtns;servJudgeBtns=function(s){const B=j0.apply(this,arguments);try{if(ownerOf(s)!==S)return B;
 const mx=srkMax(S,s),nx=SRK[s.role][srk(s)+1];if(!nx)return B;const c=dbCost(s);const N=dbNeed(S,s);const t2=whyTime(1);
 const un=N.filter(x=>!x.ok).map(x=>x.t);const why=t2||(un.length?un[0]:"")||(S.bac<c?`thiếu bạc (cần ${c})`:"");
 const eff=s.role==="maid"?(srk(s)+1>=3?"mở việc Chưởng sự tra xét cung nữ":"sai việc dễ hơn"):(srk(s)+1>=3?"đêm được chọn dễ hơn chút, sai việc dễ hơn":"sai việc dễ hơn");
 const btn=pbtn(`data-dbsv="${s.sid}"`,`Đề bạt lên ${nx}`,`${word(dbOdds(S,s))} · tốn: Bạc -${c} (lót tay Nội vụ phủ), 1 khắc · thành: ${s.name} lên ${nx}, lòng +${BAL.dbGain}, ${eff} · hỏng: mất bạc, lòng -2 · kèm: kẻ hầu khác ghen tị (lòng -${BAL.dbEnvy})${srk(s)+1>=2?` · (từ bậc này: tiền thưởng hằng tháng Bạc -${Math.floor((srk(s)+1)/2)})`:""}`,why);
 return B.concat([btn.replace("<button ",`<button data-kneed="${encodeURIComponent(JSON.stringify(N))}" `)])}catch(e){console.error(e);return B}}})();
document.addEventListener("click",e=>{const b=e.target.closest("[data-dbsv]");if(!b||b.disabled||!S||S.dead||Q.length)return;e.stopPropagation();const s=servById(+b.dataset.dbsv);if(!s||!can(1))return;
 const bf=rsnap();spend(1);const r=dbDo(S,s);if(r==null)return;try{resultShow(`Đề bạt ${s.name}`,bf,r)}catch(x){}render()},true);
/* NPC mistresses: the same act, by motive — a loyal, deserving servant, a purse that can pay, once in a while */
(function(){if(typeof servRanks!=="function")return;const r0=servRanks;servRanks=function(){const ev=r0.apply(this,arguments);try{for(const p of liveRivals(true)){for(const s of (p.staff||[])){
 if(dbNeed(p,s).every(x=>x.ok)&&(p.bac||0)>=dbCost(s)*2&&s.loyal>=70&&roll(15))dbDo(p,s)}}}catch(e){console.error(e)}return ev}})();

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
 def("spy",t=>["chứng cứ +1, Tâm cơ +2",`bị lộ: ${pvRel(t,-8)}`]);
 def("ally",t=>[`${pvRel(t,25)}, nàng bớt ghen 10`,`bị lạnh nhạt: ${pvRel(t,-5)}`]);
 def("rumor",t=>["Danh nàng -8",`không ai tin: nàng nắm 1 chứng cứ, ${pvRel(t,-5)}`]);
 def("frame",t=>["nàng mất Danh và Sủng -10, Danh +3, Tâm cơ +2",`bị lộ: Danh -15, Sủng -8, ${pvRel(t,-30)}, nàng nắm 1 chứng cứ, bị cấm túc 2 tháng`]);})();
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
function aaHealthO(v){return cl(Math.round(45+aff(v,S)/2-((typeof traitsOf==="function"&&traitsOf(v).includes("Đa nghi"))?15:0)),5,95)}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const v=p&&p.ref;if(!v||!(p.kind==="rival"||p.kind==="hh"))return A;
 const i=A.findIndex(a=>a&&a.n==="Hỏi han sức khỏe");if(i<0)return A;const n=(S.chat&&S.chat[v.id])?1:2;const ill=illOf(v)&&!illKnown(v);
 A[i]=Object.assign({},A[i],{x:`${pvQuy(v,n)}${ill?` · nàng có thể kể bệnh của mình: ${word(aaHealthO(v))}`:" · biết nàng khỏe hay yếu"}`,run:()=>{chatMark(v);affAdd(v,S,n);
  let t=`${v.name} cảm động vì được hỏi han.`;const I=illOf(v);if(I&&!illKnown(v)){if(roll(aaHealthO(v))){I.known=true;t+=` Nàng kể đang mắc ${illName(v)}.`}else t+=" Nàng chỉ cười, giấu chuyện bệnh tật."}else if(I)t+=` Nàng vẫn đang ${illName(v)}.`;else t+=` Nàng khỏe mạnh (Sức ${v.suc>=60?"tốt":v.suc>=30?"vừa":"yếu"}).`;return t}});return A}catch(e){console.error(e);return A}}})();

/* 9. "ban chết" on cards = what deathSentence (j8) really does; the odds word is the real one (it was forced to "Liều") */
function aaDeathTxt(){if(S.turn<12&&!S.mercy)return"tội chết — năm đầu được tha một lần: giáng một bậc, cấm túc 3 tháng, Danh -10, Sủng -10";return has("nhantu")?"tội chết (Hoàng thượng nhân từ: có khi chỉ đày vào lãnh cung)":"tội chết: mất mạng"}
(function(){for(const k in ACT){const A=ACT[k];if(A&&typeof A.x==="string"&&/ban chết/.test(A.x)){const x0=A.x;Object.defineProperty(A,"x",{configurable:true,get(){return x0.replace(/ban chết/,aaDeathTxt())},set(v){}})}}
 if(typeof actLineRaw==="function"){const a0=actLineRaw;actLineRaw=function(){const h=a0.apply(this,arguments);return typeof h==="string"?h.replace(/(bị (?:tra ra|lộ)): ban chết/g,(m,p)=>`${p}: ${aaDeathTxt()}`):h}}})();

/* 10. CUNG NHÂN words + names (owner 10:10Z) */
Object.assign(KIT_REL,{srvThem:"Thiện cảm",srvTrust:"Ta tin cậy",runner:"Đang là người chạy việc"});
/* the bars on a servant card: her attitude = "Thiện cảm" (was Lòng), her trust in him = "Ta tin cậy" (was Chủ tin); the runner is
   marked on HIS card, not on the maid's */
if(typeof bondBars==="function"){bondBars=function(s){let r="";try{const b=bestSent(S);r=b&&b===s?` <span class="past">· ${KIT_REL.runner}</span>`:""}catch(e){}return sbar(KIT_REL.srvThem,s.loyal,"lo")+(s.sid!=null||typeof s.tin==="number"?sbar(KIT_REL.srvTrust,tinOf(s),"ti"):"")+r}}
function runnerLine(){return ""}
/* names: unique, never "Thúy 2" — larger pools, and any old numbered name is renamed once */
(function(){const xm=["Thanh Trúc","Bạch Lan","Tử Đằng","Hải Đường","Lạc Mai","Diệu Âm","Thúy Vi","Như Ý","Bảo Châu","Kim Chi","Ngân Hạnh","Mộc Lan","Uyển Thanh","Tú Cầm","Phương Thảo","Thanh Hà","Tịnh Hương","Vân Anh","Hồng Ngọc","Lam Ngọc","Thu Thủy","Xuân Đào","Liên Hoa","Hạnh Dung","Cẩm Tú","Ngọc Bích","Tố Như","Song Hỷ","Bích Hà","Quỳnh Chi","Tuyết Mai","Hương Lan","Tiểu Nguyệt","Tiểu Cúc","Tiểu Hoa","Tiểu Linh","Nhã Thanh","Ánh Tuyết","Ngọc Nhi","Khánh Vân"];
 const xe=["Tiểu Hải Tử","Tiểu Toàn Tử","Tiểu Bình Tử","Tiểu Kiệt Tử","Tiểu Minh Tử","Tiểu Ninh Tử","Tiểu Phong Tử","Tiểu Sơn Tử","Tiểu Tường Tử","Tiểu Vinh Tử","Tiểu Lạc Tử","Tiểu Khang Tử","Tiểu Trung Tử","Tiểu Bảo Tử","Tiểu Hưng Tử","Tiểu Cát Tử","Tiểu Long Tử","Tiểu Nghĩa Tử","Tiểu Trí Tử","Tiểu Lễ Tử","Tiểu Thành Tử","Tiểu Đông Tử","Tiểu Thu Tử","Tiểu Hạ Tử","Tiểu Nguyên Tử","Tiểu Quý Tử","Tiểu Hòa Tử","Tiểu Lợi Tử","Tiểu Mãn Tử","Tiểu Tài Tử"];
 try{for(const n of xm)if(!MAIDS.includes(n))MAIDS.push(n);for(const n of xe)if(!EUN.includes(n))EUN.push(n)}catch(e){}})();
function aaNamesFix(){if(!S)return;try{const all=allServ().concat(S.maid?[S.maid]:[]);const used=new Set(all.map(s=>s.name));
 for(const s of all){if(!/\d/.test(s.name||""))continue;const pool=(s.role==="eunuch"?EUN:MAIDS).filter(n=>!used.has(n));if(!pool.length)continue;const n=pool[Math.floor(Math.random()*pool.length)];used.add(n);s.name=n}}catch(e){}}
(function(){if(typeof mkServ==="function"){const m0=mkServ;mkServ=function(){const s=m0.apply(this,arguments);try{if(/\d/.test(s.name)){const used=new Set(allServ().map(x=>x.name).concat(S&&S.maid?[S.maid.name]:[]));const pool=(s.role==="eunuch"?EUN:MAIDS).filter(n=>!used.has(n));if(pool.length)s.name=pool[Math.floor(Math.random()*pool.length)]}}catch(e){}return s}}
 if(typeof deser==="function"){const d0=deser;deser=function(){const r=d0.apply(this,arguments);aaNamesFix();return r}}})();
/* short names on strips: titled people keep their title ("Thái y Trương", not "y Trương") */
(function(){if(typeof shortN!=="function")return;const s0=shortN;shortN=function(nm){const a=String(nm).split(" ");if(a.length===3&&/^(Thái y|Tổng quản|Nội vụ|Ma ma|Thái giám)$/.test(a[0]+" "+a[1]))return String(nm);return s0.apply(this,arguments)}})();

/* 11. MÀU CHIỀU QUAN HỆ (owner, KIT §11.2): a relation LABEL is coloured by its direction — người khác → ta purple (--rel-them),
   ta → người khác blue (--rel-me). The number keeps its Được/Mất colour. kitRel(dir,text) is the one builder; kitRelPaint(root)
   colours the labels already written as text everywhere (cards, chips, Ân oán, Giao tình, stage, week book, result cards). */
function kitRel(dir,text){return `<span class="krel krel-${dir==="me"?"me":"them"}">${text}</span>`}
window.kitRel=kitRel;KIT_REL.paint=null;
const KREL_RE=new RegExp([
 "(Ta|ta) → (nàng|hắn|người ấy|[\\p{Lu}][\\p{L}]*(?: [\\p{Lu}][\\p{L}]*){0,2}): thiện cảm","(Ta|ta) tin cậy","tin cậy(?= [\\p{Lu}][\\p{L}]* [\\p{Lu}]?[\\p{L}]*\\s?[+\\-−]?\\d)","tin cậy(?= [+\\-−]?\\d)",
 "(Nàng|Hắn|Hoàng hậu|Thái hậu|Hoàng thượng|Người ấy|[\\p{Lu}][\\p{L}]*(?: [\\p{Lu}][\\p{L}]*){0,2}) → (ta|người ấy|nàng): thiện cảm","[\\p{Lu}][\\p{L}]*(?: [\\p{Lu}][\\p{L}]*){0,3} với ta","oán ta","bớt oán ta","(?<![\\p{L}])thiện cảm(?= [+\\-−]?\\d|:| của)","(?<![\\p{L}])Thiện cảm(?= [+\\-−]?\\d|:|$| của)","(?<![\\p{L}])ghen(?= [+\\-−]\\d)"].join("|"),"gu");
function kitRelPaint(root){if(!root||!root.querySelectorAll)return;const W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION|SELECT)$/.test(p.tagName)||p.closest(".krel,[data-vp-skip]"))return NodeFilter.FILTER_REJECT;KREL_RE.lastIndex=0;return KREL_RE.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
 const L=[];while(W.nextNode())L.push(W.currentNode);
 for(const n of L){const v=n.nodeValue;KREL_RE.lastIndex=0;let m,last=0;const f=document.createDocumentFragment();
  while((m=KREL_RE.exec(v))){const t=m[0];const me=/^(Ta|ta)\b|^tin cậy/.test(t)||/^(Ta|ta) /.test(t);if(m.index>last)f.appendChild(document.createTextNode(v.slice(last,m.index)));const sp=document.createElement("span");sp.className="krel krel-"+(me?"me":"them");sp.textContent=t;f.appendChild(sp);last=m.index+t.length}
  if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)}}
(function(){const st=document.createElement("style");st.id="krel-css";st.textContent=".krel-them{color:var(--rel-them,#7a4fa0)!important;font-weight:600}.krel-me{color:var(--rel-me,#2f6f9f)!important;font-weight:600}";document.head.appendChild(st);
 let q=false;const run=()=>{q=false;try{kitRelPaint(document.body)}catch(e){}};const mo=new MutationObserver(()=>{if(!q){q=true;requestAnimationFrame(run)}});
 const go=()=>{try{mo.observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}run()};if(document.body)go();else document.addEventListener("DOMContentLoaded",go)})();
