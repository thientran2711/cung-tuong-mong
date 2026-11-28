/* ================= SHOW WHY A NUMBER (owner 17/11 05:45Z, review/show-why) — the read-out of the trait / trọng engine =================
   Owner rule (OD 17/11 05:45Z): every result box and every Sổ ghi line that shows a changed number also shows WHY in one short line:
   the factors that moved it (her nết, what she trọng, mood, repetition, saturation, rank) — NAMED when the player knows them
   ("Hoàng hậu Liễu Họa Mi: tính Ân cần, trọng Lễ: hợp ý → thiện cảm +6"), GENERIC when not ("… : theo tính nết và điều nàng trọng
   → thiện cảm +6"). The shown number = the applied number (measured before → after the real call).
   ONE core: the factors are read from the same functions the rules use (persF / PERS = BAL.net.T, trongMul / trongHit, trGreet,
   trThDeed, chatF, jmood mbAffK, giftVal) — never a second formula. Known = trKnown(v) (nết) / trongKnown(v) (trọng).
   Collector: every measured change with at least one factor ≠ 1 becomes an entry {who, stat, d, F:[factor]} in WHYL.
   Display (no new kit part): the result card gets one more row of the SAME kit .kb grid (§7), label "Vì sao", markup of the
   existing "Ghi chú" row (.kr.kr-note > .krv > .kitem > .ef.n); the Sổ ghi line that shows the number gets the same sentence
   appended (<span class="past kwl">Vì sao: …</span>). Old saves: nothing new is stored except log text. */
const WHYL=[];let WHYN=0;let WHY_TICK=0;const WHY_CTX=new Map();lifeStore("WHYL why-notes (people of that life)",()=>{WHYL.length=0;WHY_CTX.clear()});
let WHYN_T=0;/* tick id: one per task, so the notes of one act merge; cleared on the next microtask */
function whyT(){if(!WHY_TICK){WHY_TICK=1;WHYN_T++;Promise.resolve().then(()=>{WHY_TICK=0;try{whyFlushLate()}catch(e){}WHY_CTX.clear()})}return WHYN_T}
function whyKey(p){return p==="th"||p==="emp"?p:p&&p===S?"me":p&&p.id!=null?"r"+p.id:p&&p.sid!=null?"s"+p.sid:p&&p.name||"?"}
/* context factors for a judge (a gift / a talk / a greeting in progress): attached to her next measured change in this tick */
function whyCtx(p,F){if(!p||!F||!F.length)return;whyT();const k=whyKey(p);const L=WHY_CTX.get(k)||[];for(const f of F)if(!L.some(g=>whyFEq(g,f)))L.push(f);WHY_CTX.set(k,L)}
function whyFEq(a,b){return a.k===b.k&&(a.t||"")===(b.t||"")&&String(a.v||"")===String(b.v||"")&&(a.s||0)===(b.s||0)}
function whyNote(who,stat,d,F,seq0){if(!who||!d||!F||!F.length)return;whyT();
 const last=WHYL[WHYL.length-1];if(last&&last.tk===WHYN_T&&whyKey(last.who)===whyKey(who)&&last.stat===stat&&!last.fl){last.d+=d;for(const f of F)if(!last.F.some(g=>whyFEq(g,f)))last.F.push(f);return}
 WHYL.push({who,stat,d,F:F.slice(),tk:WHYN_T,seq:seq0!=null?seq0:S&&S.logSeq||0,fl:false});WHYN++;if(WHYL.length>80)WHYL.splice(0,WHYL.length-80)}
/* ---------- factor makers (the same tables the rules read) ---------- */
function whyNetF(p,col,neutral){const F=[];try{for(const t of traitsOf(p)){const P=PERS[t];if(P&&P[col]!=null&&P[col]!==neutral)F.push({k:"net",t,s:P[col]>neutral?1:-1})}}catch(e){}return F}
function whyTrongF(judge,tags){try{const m=trongMul(judge,tags);if(m===1)return[];const hit=trongHit(judge,tags);if(!hit.length)return[];return[{k:"trong",v:hit.join(" · "),s:m>1?1:-1,j:judge}]}catch(e){return[]}}
function whyMoodMe(){try{if(typeof mbAffK!=="function")return[];const k=mbAffK();if(!k)return[];return[{k:"mood",t:k>0?"lòng ngươi đang vui, người ta dễ mến":"lòng ngươi u uất, người ta khó gần",s:k>0?1:-1}]}catch(e){return[]}}
/* ---------- measured changes: the OUTERMOST wrappers (this module loads after every affAdd / oanAdd wrapper) ---------- */
(function(){const a0=affAdd;affAdd=function(x,y,n){if(AFF_DRY||!S||!x||!y||x===y||!n)return a0.apply(this,arguments);/* AFF_DRY: a preview notes no why */let b=0;try{b=aff(x,y)}catch(e){}whyT();
 const F=[];try{if(y===S&&x!==S){const D=typeof TR_DEED!=="undefined"?TR_DEED:null;if(D&&x!==D.doer)F.push(...whyTrongF(x,D.tags));if(n>0){F.push(...whyNetF(x,"trust",1));F.push(...whyMoodMe())}const C=WHY_CTX.get(whyKey(x));if(C)F.push(...C)}}catch(e){}
 const r=a0.apply(this,arguments);try{if(F.length){const d=aff(x,y)-b;if(d)whyNote(x,"aff",d,F)}}catch(e){}return r}})();
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(!S||!x||!y||x===y||!n)return o0.apply(this,arguments);let b=0;try{b=oan(x,y)}catch(e){}whyT();
 const F=[];try{if(y===S&&x!==S){const D=typeof TR_DEED!=="undefined"?TR_DEED:null;if(D&&x!==D.doer&&n>0)F.push(...whyTrongF(x,D.tags));if(n>0)F.push(...whyNetF(x,"slight",1));const C=WHY_CTX.get(whyKey(x));if(C)F.push(...C)}}catch(e){}
 const r=o0.apply(this,arguments);try{if(F.length){const d=Math.round(oan(x,y))-Math.round(b);if(d)whyNote(x,"oan",d,F)}}catch(e){}return r}})();
/* a gift: her nết (gift / lavish / riseGift columns) → context for the affAdd that follows */
(function(){const g0=giftVal;giftVal=function(it,r){const v=g0.apply(this,arguments);try{if(r&&typeof r==="object"&&r!==S){const F=whyNetF(r,"gift",1);const lav=persF(r,"lavish",0);if(lav&&(it.pr||0)>=lav)F.push(...whyNetF(r,"lavish",0).map(f=>Object.assign(f,{s:1,x:"lễ hậu"})));
  if(S.rank>=r.rank||S.sung>=r.sung)for(const f of whyNetF(r,"riseGift",1))if(f.s>0)F.push(Object.assign(f,{x:"người đang lên"}));whyCtx(r,F)}}catch(e){}return v}})();
/* topic talk: her trọng (jtrong multiplies chatF by trongMul(v,tags)) and repetition (j9 chatF = 1/(1+n)) → context while the option runs */
(function(){if(typeof topicOpts!=="function")return;const t0=topicOpts;topicOpts=function(v){const A=t0.apply(this,arguments);try{if(!v||!Array.isArray(A))return A;
 return A.map(a=>{if(!a||!a.run)return a;const tg=typeof trTopicTags==="function"&&trTopicTags(a.n);const r0=a.run;return Object.assign({},a,{run:function(){try{const F=tg?whyTrongF(v,tg):[];const n=S.chat&&S.chat[v.id]||0;if(n>=1)F.push({k:"rep",t:`đã chuyện trò ${n} lần: nói thêm được ít dần`,s:-1});whyCtx(v,F)}catch(e){}return r0.apply(this,arguments)}})})}catch(e){return A}}})();
/* ---------- greetings (Thỉnh an) and deeds for Thái hậu: the factors trGreet / trThDeed multiply ---------- */
function whyGreetF(host){const th=host==="th",G=trGreet(S,host),B=BAL.trong,A=th?thArch():null,F=[];
 if(th&&S.thO&&S.thO.archK)F.push({k:"arch",t:`tính ${A.n.toLowerCase()}`});
 const tags=th?DEED.greet:DEED.greetHH;F.push(...whyTrongF(th?"th":host,tags));
 if(th){const rk=rkOf(S)||0;const rkF=1+A.rk*(rk-3);if(rkF!==1)F.push({k:"rank",t:rkF>1?"phẩm vị ngươi cao":"phẩm vị ngươi còn thấp",s:rkF>1?1:-1})}
 const eh=trEmo(th?S.thO:host),ew=trEmo(S);const H=th?"Thái hậu":"Hoàng hậu";
 const mh=TR_MH[trMK(TR_MH,th?S.thO:host)]||1,mw=TR_MW[trMK(TR_MW,S)]||1;const fN=(p,k)=>(typeof feelName==="function"&&typeof feelLv==="function"?feelName(k,feelLv(p,k)):EMO[k]||k).toLowerCase();
 if(mh!==1)F.push({k:"mood",t:`${H} đang ${fN(th?S.thO:host,eh)}`,s:mh>1?1:-1});
 if(mw!==1)F.push({k:"mood",t:`ngươi đang ${fN(S,ew)}`,s:mw>1?1:-1});
 if(G.n>=1&&1-(th?A.rep:B.hhRep)*G.n<1)F.push({k:"rep",t:"mấy hôm liền ngày nào cũng sang: được ít dần",s:-1});
 const reg=th?S.th:S.hh,cap=th?A.cap:B.hhCap;if(reg>cap)F.push({k:"cap",t:`${H} đã quý ngươi lắm: khó thêm`,s:-1});
 return{F,gain:G.gain,k:th?"th":"hh",who:th?"th":host}}
function whyWrapRun(o,mk){const W=f=>f?function(){let X=null;try{X=mk()}catch(e){}const b=X?S[X.k]||0:0,q0=S.logSeq||0;const r=f.apply(this,arguments);try{if(X&&X.F.length){const d=(S[X.k]||0)-b;whyT();whyNote(X.who,X.k,d||X.gain,X.F,q0)}}catch(e){}return r}:f;
 if(o.run)o.run=W(o.run);else{o.go=W(o.go);o.fail=W(o.fail)}return o}
(function(){if(typeof trGreetOpt!=="function")return;const g0=trGreetOpt;trGreetOpt=function(a,host){const o=g0.apply(this,arguments);try{return whyWrapRun(o,()=>whyGreetF(host))}catch(e){return o}}})();
(function(){if(typeof trThDeed!=="function")return;const d0=trThDeed;trThDeed=function(a){const o=d0.apply(this,arguments);try{return whyWrapRun(o,()=>{const B=BAL.trong,A=thArch(),F=whyTrongF("th",DEED.thGift);const n=trThDeedN(a.n);
  if(n>=1)F.push({k:"rep",t:"mới làm gần đây: Thái hậu đỡ cảm động",s:-1});if(S.th>A.cap+B.thGiftCap)F.push({k:"cap",t:"Thái hậu đã quý ngươi lắm: khó thêm",s:-1});return{F,gain:(o.w&&o.w.th)||0,k:"th",who:"th"}})}catch(e){return o}}})();
/* ---------- nights: Sủng after thị tẩm = her preparation (q) + the talk (b) + his mood + chance − overreach (j8 night1/night2/nightFx) ---------- */
let WHY_NIGHT=null;
(function(){if(typeof PEND!=="object"||!PEND.night1)return;const n1=PEND.night1;PEND.night1=function(p){try{WHY_NIGHT={q:p&&p.q||0,mood:BAL.night.mood[S.emp.mood]||0,vp:0}}catch(e){}return n1.apply(this,arguments)}})();
(function(){if(typeof nightFx!=="function")return;const f0=nightFx;nightFx=function(s){const b=S?S.sung||0:0,q0=S?S.logSeq||0:0;const r=f0.apply(this,arguments);try{const W=WHY_NIGHT;WHY_NIGHT=null;const d=(S.sung||0)-b;if(W&&d){const F=[];
  F.push({k:"prep",t:W.q>=BAL.cut.nightPrep[1]?"sửa soạn chu đáo":W.q<=BAL.cut.nightPrep[0]?"sửa soạn sơ sài":"sửa soạn vừa phải"});
  if(W.mood)F.push({k:"mood",t:`Hoàng thượng đang ${W.mood>0?"vui":W.mood===-1?"buồn":"giận"}`,s:W.mood>0?1:-1});
  F.push({k:"talk",t:s>=BAL.nightEnd.warm?"đêm vui":s>=BAL.nightEnd.normal?"đêm êm":"đêm nhạt"});whyT();whyNote("emp","sung",d,F,q0)}}catch(e){}return r}})();
/* ---------- the one sentence ---------- */
/* KIT §7 result "Vì sao" (owner 24/11 ~21:50Z real, Fold shot v5: «người chưa quen: theo tính nết → oán +12» = unreadable): ONE plain line per person = WHO (her name, or «Một vị <cung nữ / phi tần / thái giám / tước>» when the name is not yet known to her (owner 24/11 ~22:14Z) — never «người chưa quen» / «chưa quen biết»)
   + the REAL cause in plain words (nết/trọng named when she knows them, else «ta chưa rõ tính nết nàng») → what it did to HER («oán ta +12», «thiện cảm với ta +6», «Sủng thêm 5»). One colon after the WHO, no %, no vague «theo tính nết». Identical lines of one result merge («… (2 người)»). */
function whyWho(p){if(p==="th")return"Thái hậu";if(p==="emp")return"Hoàng thượng";try{if(p&&p.queen&&typeof kaWho!=="function")return"Hoàng hậu";if(typeof kaNamed==="function"&&!kaNamed(p)){try{return`Một vị ${k61MaskT(p)}`}catch(e){return"Một vị phi tần"}}return typeof kaWho==="function"?kaWho(p):p.name||""}catch(e){return p&&p.name||""}}
function whyPron(p){if(p==="th")return"Thái hậu";if(p==="emp")return"Hoàng thượng";try{return typeof netSex==="function"&&netSex(p)==="m"?"người":"nàng"}catch(e){return"nàng"}}
const WHY_STAT={aff:"thiện cảm với ta",oan:"oán ta",th:"thiện cảm với ta",hh:"thiện cảm với ta",sung:"Sủng"};
/* her own stats are said in words ("Sủng thêm 5"): the Sổ ghi replay (jlogsync) reads "Sủng +5" as a second change */
const WHY_OWN=new Set(["sung"]);
function whyUnnamed(p){try{return p!=="th"&&p!=="emp"&&typeof kaNamed==="function"&&!kaNamed(p)}catch(e){return false}}
function whyText(e,d){const p=e.who;let kn=[],tk=false;try{kn=p==="th"||p==="emp"?[]:trKnown(p)||[]}catch(x){}try{tk=p!=="emp"&&trongKnown(p)}catch(x){}
 /* a person she has not met (name masked) is never described by her nết or trọng either */
 if(whyUnnamed(p)){kn=[];tk=false}
 const parts=[];let unkNet=false,unkTr=false;
 for(const f of e.F){if(f.k==="net"){if(kn.includes(f.t)){const s=`tính ${f.t}${f.x?` (${f.x})`:""}`;if(!parts.includes(s))parts.push(s)}else unkNet=true}
  else if(f.k==="trong"){if(tk){const s=`trọng ${f.v}, ${f.s>0?"hợp ý":"trái ý"}`;if(!parts.includes(s))parts.push(s)}else unkTr=true}
  else if(f.t&&!parts.includes(f.t))parts.push(f.t)}
 {const Ns=parts.filter(x=>/^tính /.test(x));if(Ns.length>1){const i=parts.indexOf(Ns[0]);for(const x of Ns.slice(1))parts.splice(parts.indexOf(x),1);parts[i]="tính "+Ns.map(x=>x.slice(5)).join(", ")}}
 /* «Vì sao» only when it tells her a real cause (owner 24/11 ~21:57Z): a cause she does not know («ta chưa rõ tính nết nàng») explains nothing → no line; the number stays on the Được / Mất / Kèm line */
 if(!parts.length)return"";const n=d!=null?d:e.d;if(!n)return"";
 return `${p==="emp"?"Đêm thị tẩm":whyWho(p)}: ${parts.join(", ")} → ${WHY_STAT[e.stat]||e.stat} ${WHY_OWN.has(e.stat)?(n>0?"thêm ":"bớt "):(n>0?"+":"−")}${Math.abs(n)}`}
/* identical lines of one result (two strangers of the same bậc) say it once with the count */
function whyUniq(T){const c=new Map();for(const t of T)c.set(t,(c.get(t)||0)+1);return[...c].map(([t,k])=>k>1?`${t} (${k} người)`:t)}
/* entries of one act merged per person + stat */
function whyMerge(L){const M=[];for(const e of L){const m=M.find(x=>whyKey(x.who)===whyKey(e.who)&&x.stat===e.stat);if(m){m.d+=e.d;for(const f of e.F)if(!m.F.some(g=>whyFEq(g,f)))m.F.push(f)}else M.push({who:e.who,stat:e.stat,d:e.d,F:e.F.slice()})}return M}
/* ---------- Sổ ghi: the line that shows the number carries the why ---------- */
const WHY_LRX=/\d/;
/* a line carries the why of a change only when it names that person (her name, or Thái hậu / Hoàng hậu) — never an unrelated line */
function whyNames(h,e){const t=String(h).replace(/<[^>]+>/g,"");const p=e.who;if(p==="th")return /Thái hậu/.test(t);if(p==="emp")return /Thị tẩm|thị tẩm|Hoàng thượng/.test(t);if(!p||!p.name)return false;return t.includes(p.name)||(!!p.queen&&/Hoàng hậu/.test(t))}
function whyLogTail(L){const T=whyUniq(whyMerge(L).map(e=>whyText(e)).filter(Boolean));return T.length?` <span class="past kwl">Vì sao: ${T.join("; ")}.</span>`:""}
(function(){const l0=log;log=function(h){try{if(S&&typeof h==="string"&&WHY_LRX.test(h.replace(/<[^>]+>/g,""))&&!/class="past kwl"/.test(h)){const L=WHYL.filter(e=>!e.fl&&e.tk===WHYN_T&&whyNames(h,e));if(L.length){const t=whyLogTail(L);if(t){L.forEach(e=>e.fl=true);h=h.replace(/\s*$/,"")+t}}}}catch(e){}return l0.apply(this,arguments)}})();
/* a change whose line was written AFTER it without a number, or in the same act: the newest line of this act that names the person */
function whyFlushLate(){if(!S||!Array.isArray(S.logs))return;const L=WHYL.filter(e=>!e.fl);if(!L.length)return;L.forEach(e=>e.fl=true);const seq=S.logSeq||0;
 const by=new Map();for(const e of L){const k=Math.min(S.logs.length,seq-e.seq);let at=-1;for(const num of [true,false]){for(let i=0;i<k&&at<0;i++){const h=S.logs[i];if(typeof h==="string"&&!/class="past kwl"/.test(h)&&whyNames(h,e)&&(!num||WHY_LRX.test(h.replace(/<[^>]+>/g,"").replace(/^T\d+\/\d+\s*/,""))))at=i}if(at>=0)break}if(at>=0)(by.get(at)||by.set(at,[]).get(at)).push(e)}
 for(const [i,E] of by){const t=whyLogTail(E);if(t)S.logs[i]=S.logs[i].replace(/\s*$/,"")+t}}
/* ---------- the result card: one more row of the kit grid ---------- */
(function(){const r0=rsnap;rsnap=function(){const o=r0.apply(this,arguments);if(o)o.whyAt=WHYN;return o}})();
function whyRowsE(before){if(!before)return[];const k=before.whyAt!=null?WHYN-before.whyAt:0;const L=k>0?WHYL.slice(-Math.min(k,WHYL.length)):WHYL.filter(e=>e.tk===WHYN_T);
 const out=[],seen=new Set();for(const e of whyMerge(L)){let d=e.d;if((e.stat==="th"||e.stat==="hh")&&before[e.stat]!=null){const m=(S[e.stat]||0)-before[e.stat];if(m)d=m}const t=whyText(e,d);if(!t||seen.has(t))continue;seen.add(t);out.push({who:e.who,d,t})}return out}
function whyRows(before){return whyRowsE(before).map(x=>x.t)}
/* ONE SIEVE on the «Vì sao» row (owner OD 26/11 ~22:07Z (1) family, MAIN 167): her own lines, Thái hậu / Hoàng thượng, her household and every person
   still NAMED on the card (Được / Mất / Kèm rows, title) keep their reason; the reasons of other people (bystanders) show at most BAL.news.card.rowMax
   (largest change first) + «… và N người khác» (the Kèm wording); the folded reasons go into the card's Sổ ghi record (law 6c: nothing lost). */
function whyOwn(p){try{if(!p||p===S||p==="th"||p==="emp"||p==="me")return true;if(typeof p!=="object")return true;if(p===S.maid||(S.staff||[]).includes(p))return true;return !!p.queen&&!p.name}catch(e){return true}}
function whySieve(E,shown){const B=typeof BAL==="object"&&BAL.news&&BAL.news.card;if(!B||B.rowMax==null)return {keep:E,fold:[]};const keep=[],by=[];
 for(const x of E){const p=x.who;if(whyOwn(p)||(p&&p.name&&shown.includes(p.name)))keep.push(x);else by.push(x)}
 by.sort((a,b)=>Math.abs(b.d||0)-Math.abs(a.d||0));const fold=by.splice(B.rowMax);const kp=new Set(by);return {keep:E.filter(x=>keep.includes(x)||kp.has(x)),fold}}
function whyFoldRec(fold,title,h0){try{if(!fold.length||!S)return;const tail=` Vì sao: ${fold.map(x=>x.t.replace(/<[^>]+>/g,"")).join("; ")}.`;const L=Array.isArray(S.hrec)?S.hrec:(S.hrec=[]);
  const ids=fold.map(x=>x.who&&x.who.id).filter(x=>x!=null);
  if(L[0]&&L[0]!==h0){L[0].t+=tail;L[0].ids=[...new Set((L[0].ids||[]).concat(ids))];return}/* the card's own fold record (jnsieve nsCard), made in this result */
  L.unshift({q:S.logSeq||0,w:typeof wk==="function"?wk():0,dt:`T${S.month}/${S.year} ${typeof TUAN!=="undefined"?TUAN[S.tuan]:""}`,t:`${title?String(title).replace(/<[^>]+>/g,"")+" — ":""}kèm theo trong cung —${tail}`,ids,kem:1})}catch(e){}}
function kitWhyRowHTML(T){return T&&T.length?`<span class="kr kr-note kr-vi"><span class="krl">Vì sao</span><span class="krv">${T.map(x=>`<span class="kitem"><span class="ef n">${x}</span></span>`).join("")}</span></span>`:""}
(function(){const s0=resultShow;resultShow=function(title,before){const h0=S&&Array.isArray(S.hrec)?S.hrec[0]:null;const r=s0.apply(this,arguments);try{const E=whyRowsE(before);if(!E.length||window.__bot)return r;const t=document.getElementById("rtoast");
 const shown=(t&&t.classList.contains("on")?(t.querySelector(".kb")||t).textContent:"")+" "+String(title||"");const SV=whySieve(E,shown);let T=SV.keep.map(x=>x.t);
 if(SV.fold.length){T=T.concat([`… và ${SV.fold.length} người khác`]);whyFoldRec(SV.fold,title,h0)}
 if(t&&t.classList.contains("on")){const kb=t.querySelector(".kb");if(kb&&!kb.querySelector(".kr-vi")){const kem=kb.querySelector(".kr-kem");const tmp=document.createElement("span");tmp.innerHTML=kitWhyRowHTML(T);const row=tmp.firstChild;if(kem)kb.insertBefore(row,kem);else kb.appendChild(row)}}
 if(window.kaLastResult&&Array.isArray(window.kaLastResult.rows))window.kaLastResult.rows.push({k:"vi",label:"Vì sao",items:T.slice()})}catch(e){}return r}})();
/* the result card's sentence never takes the why tail (kaSentence reads the Sổ ghi lines) */
(function(){if(typeof kaSentence!=="function")return;const k0=kaSentence;kaSentence=function(){const s=k0.apply(this,arguments);return typeof s==="string"?s.replace(/\s*Vì sao:.*$/,""):s}})();
/* ---------- nết + trọng words are TAPPABLE (owner devices = touch; no native title): the kit glossary term (KIT §12 kitGloss,
   dotted underline, tap = kpPop) carries each nết's gain + cost (netTip, BAL.net.T) and each virtue's meaning (VIRT_GL) ---------- */
(function(){try{if(typeof KIT_GLOSS!=="object")return;for(const t in BAL.net.T)if(KIT_GLOSS[t]==null)KIT_GLOSS[t]=netTip(t);
 if(typeof VIRT_GL==="object")for(const v in VIRT_GL)if(KIT_GLOSS[v]==null){const g=String(VIRT_GL[v]||"");KIT_GLOSS[v]=g.charAt(0).toUpperCase()+g.slice(1)+"."}}catch(e){}})();
