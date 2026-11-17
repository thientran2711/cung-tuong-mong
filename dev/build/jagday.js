/* ================= jagday: AG-ALL core — every NPC draws a DAY PLAN and every group plays its player's act list =================
   Owner OD 17/11 ~13:20Z (L1588: each GROUP of NPCs gets the WHOLE option set the player of that group has, same buttons, same formulas,
   chosen by needs × traits × tâm cơ × goals), ~13:15Z (L1587: the Dư đồ '!' comes from real NPC deeds, quiet and busy days arise, whether a
   happening is still there next buổi depends on the NPC), ~13:40Z (L1592: at the START OF EACH DAY every NPC draws a day plan — buổi by buổi:
   where + what, with a goal — by weighted odds from her own stats / needs / traits / tâm cơ / goals; each buổi she carries it out, with a
   small re-plan chance when something happens; movement follows the plan), ~13:55Z (build every missing act, no approval).
   Design: dev/handover/reports/ag-all.md §10 (handover branch). Numbers: BAL.ag.day (jbal2). HOST ONLY (agOn).
   ONE CORE
   - agGrp(p): "consort" | "hh" (the consort who holds the seat: her consort acts + the Hoàng hậu acts) | "maid" | "srv" | "emp" | "th".
   - agReg(grp, key, fn): option PROVIDERS per group. fn(p, N, need) → [{k, t, u, tag, at(kh,p,t)→place, act, why?, run?(p,t)→text}].
     `run` calls the player's OWN act function (twDo / runAct / srvCards handler / judge / empAct / giveTo / study / rest …) with its real
     cost and odds. The consort's jagent options (AGSELF / AGSOC / Sủng deck) are the first consort provider (agOpts, unchanged).
   - agNeedsG(p): the needs of a person of any group (women: jagent agNeeds; providers of other groups add theirs via agRegNeeds).
   DAY PLAN (S.ag.day = {d: wk(), P: {ledgerId: [slot per buổi]}, T: {ledgerId: top need at plan time}})
   - drawn at the first record of a new day (j95plan wrapper): the Emperor and Thái hậu first (their places are what others plan around),
     then every consort. Per buổi: the "no goal" place = the old schedule's own weights (j95planRival / j95planEmp / j95planTH with their
     surprise dice OFF — surprises are now re-plans); then she picks what she wants this buổi (a need, or keeping her schedule: agPw over
     needs × BAL.ag.needW + routine) and HOW (mindPick over the options of her group, jmind slip); the deed's place becomes her place for
     that buổi. A WORLD WINDOW (review/world-events, worldPlanW(p,grp)) multiplies place / deed weights and may force duty slots.
   - every buổi the record (j95plan) reads the plan; agTick lands the planned deed (same pend / ledger / witness path as AG1/AG1b).
   - re-plan: at each new buổi, a person whose top need changed since the plan, or who was touched (her deed failed, the player's deed
     aimed at her, an event: agTouch(p)), re-draws the rest of her day with chance BAL.ag.day.replan (no change, no re-plan: she keeps it).
   - co-op host (no record): placeWhere's table is replaced by the plan's place (S.where), the deeds land at once as in AG1.
   Off: BAL.ag.day.on = 0 (the per-buổi AG1 choice and the old schedule dice come back). Counters: AGD.stat, window.__agDayMs.
   ===================================================================================================================== */
const AGD={stat:{draw:0,slots:0,deeds:0,replan:0,keep:0,touch:0,land:0,miss:0,world:0},ms:[],errs:[]};
const AGREG={consort:{},hh:{},maid:{},srv:{},emp:{},th:{}};const AGNEEDREG={};
function agdErr(w,e){try{AGD.errs.push(w+": "+(e&&e.message||e));if(AGD.errs.length>40)AGD.errs.shift();console.error("jagday",w,e)}catch(x){}}
function agReg(grp,key,fn){(AGREG[grp]=AGREG[grp]||{})[key]=fn}
function agRegNeeds(grp,fn){AGNEEDREG[grp]=fn}
function agDOn(){try{return !!(agOn()&&BAL.ag.day&&BAL.ag.day.on)}catch(e){return false}}
function agGrp(p){if(!p)return"";if(S.emp&&p===S.emp)return"emp";if(p==="th"||(S.thO&&p===S.thO))return"th";if(p.kind==="mm"||p.kind==="st"||p.maidOf!=null||p.sid!=null)return p.eunuch||p.male?"srv":"maid";
 try{if(p.queen||(typeof queenP==="function"&&queenP()===p))return"hh"}catch(e){}return"consort"}
function agNeedsG(p){const g=agGrp(p);if(AGNEEDREG[g])try{return AGNEEDREG[g](p)}catch(e){agdErr("needs:"+g,e)}return agNeedsC(p)}
function agDz(){const z=agZ();if(!z.day||typeof z.day!=="object")z.day={d:-1,P:{},T:{},I:{}};z.day.P=z.day.P||{};z.day.T=z.day.T||{};z.day.I=z.day.I||{};return z.day}
function agDayB(){return S.buoi||0}
/* the buổi being drawn (null = live): jagent's place readers look at the PLAN of the Emperor / Thái hậu / the target for that buổi */
AG.cB=null;
function agDaySlot(id,b){const D=agDz();if(D.d!==wk())return null;const L=D.P[id];return L?L[b==null?agDayB():b]||null:null}
(function(){
 const e0=agEmpAt,t0=agThAt,a0=agAt;
 agEmpAt=function(kh){if(AG.cB!=null){const s=agDaySlot("emp",AG.cB);if(s)return s.pl}return e0.apply(this,arguments)};
 agThAt=function(kh){if(AG.cB!=null){const s=agDaySlot("th",AG.cB);if(s)return s.pl}return t0.apply(this,arguments)};
 agAt=function(p,kh){if(AG.cB!=null&&p&&p!==S){const id=ledgerId(p);const s=id&&agDaySlot(id,AG.cB);if(s)return s.pl}return a0.apply(this,arguments)};
})();
/* the options of a person's group: the registered providers (+ the consort's jagent options) */
function agOptsG(p,N,need){const g=agGrp(p);let O=[];
 if(g==="consort"||g==="hh"){try{O=agOpts(p,N,need)}catch(e){agdErr("opts",e)}}
 const gs=g==="hh"?["consort","hh"]:[g];
 for(const gg of gs)for(const k in AGREG[gg]||{}){try{const L=AGREG[gg][k](p,N,need)||[];for(const o of L)if(o&&o.u>0)O.push(o)}catch(e){agdErr("prov:"+gg+":"+k,e)}}
 return O}
function agWorld(p){try{return typeof window.worldPlanW==="function"?window.worldPlanW(p,agGrp(p)):null}catch(e){agdErr("world",e);return null}}
/* LIFE: the feeling she wakes with (jemo p.emo, strong enough) leans what she wants today: BAL.ag.day.mood.k[feeling] = {need: ×, _: × keeping her schedule} */
function agMoodF(p){try{const e=p&&typeof p==="object"&&p.emo;const M=BAL.ag.day.mood;if(!e||!(e.v>=M.min))return{};return M.k[e.k]||{}}catch(e){return{}}}
function agTop(N){let b="",v=0;for(const n in N)if(N[n]>v){v=N[n];b=n}return b}
/* one buổi of one person's plan: base place (the old schedule's weights) + what she wants + how */
function agDrawB(p,id,b,base,W){const c=j95c(b);const slot={pl:base[0],a:base[1],t:base[2],why:base[3],k:null,need:null};
 if(W&&W.force){const f=W.force.find(x=>x.b===b||x.b===-1);if(f){AGD.stat.world++;return Object.assign(slot,{pl:f.pl,a:"ag_"+(f.deed||"duty"),k:null,need:"world",why:f.why||W.why||"",world:1})}}
 if(W&&W.place){const P=W.place;if(P[slot.pl]===0)slot.pl=p===S.emp?"dtd":p==="th"?"tn":palaceOf(p);
  /* a world window draws people to its places (worldPlanW place × > 1): her "no goal" place is picked among her own and those, by weight */
  const L=[[slot.pl,P[slot.pl]!=null?P[slot.pl]:1]];for(const k in P)if(P[k]>1&&k!==slot.pl&&(p===S.emp||p==="th"||j95acc(p,k)))L.push([k,(P[k]-1)*BAL.ag.day.worldPull]);
  if(L.length>1){const k=agPw(L);if(k!==slot.pl){slot.pl=k;slot.a="go";slot.why=W.why||"việc chung trong cung";AGD.stat.world++}}}
 let N;try{N=agNeedsG(p)}catch(e){return slot}
 const rt=BAL.ag.routine;const NL=[[null,rt]];const MF=agMoodF(p);const IN=agIntentOf(id);for(const n in N)if(N[n]>0)NL.push([n,N[n]*BAL.ag.needW*(MF[n]||1)*(IN.includes(n)?BAL.ag.day.intentW:1)]);/* HYBRID: the day's intent steers which need she serves this buổi *//* rest is a need (the rest card); her feeling of the day (jemo) leans her needs */
 if(MF._)NL[0][1]*=MF._;
 const need=agPw(NL);if(!need)return slot;
 let O=agOptsG(p,N,need);
 if(W)O=O.map(o=>{let m=(W.deed&&W.deed[o.k]!=null?W.deed[o.k]:1);if(W.place){let pl=null;try{pl=o.at(0,p,o.t)}catch(e){}if(pl&&W.place[pl]!=null)m*=W.place[pl]}return m===1?o:Object.assign({},o,{u:o.u*m})}).filter(o=>o.u>0);
 if(!O.length)return slot;
 const o=mindPick(O.map(x=>[x,x.u]),p);if(!o)return slot;
 let pl=null;try{pl=o.at(0,p,o.t)}catch(e){}
 if(!pl||(W&&W.place&&W.place[pl]===0))return slot;
 if(p!==S.emp&&p!=="th"&&p.alive!==undefined){if(p.confined&&pl!==palaceOf(p))return slot;if(!j95acc(p,pl)&&pl!=="home"&&pl!==palaceOf(p))return slot}
 AGD.stat.deeds++;
 return {pl,a:"ag_"+o.k,t:o.t?ledgerId(o.t):null,why:agWhyN(o,need),k:o.k,kd:o.kd||"",need,act:o.act,base:base[0]}}
/* reasons of the needs of other groups (part B / A: Emperor, Thái hậu): AGWHYX[need] = text */
/* ONE reason text of a deed (day plan AND extra deeds agMore: an extra deed of a servant had an empty why when her need had no text — agent_check "every planned act … with a why") */
function agWhyN(o,need){return (o&&o.why)||AGWHY[need]||AGWHYX[need]||"lo việc của mình"}
const AGWHYX={company:"muốn có người bầu bạn",order:"lo giữ phép tắc hậu cung",fond:"thương người hiền thục",mercy:"mở lòng từ bi"};window.AGWHYX=AGWHYX;
/* the old schedule's own row for buổi b, its surprise dice off (surprises are re-plans now) */
function agBase(fn,args,b){const sur=J95.SUR;const bo=S.buoi;J95.SUR=0;try{S.buoi=b;return fn.apply(null,args)}finally{J95.SUR=sur;S.buoi=bo}}
const AGD0={};const AGDRAW=[];
/* other groups join the day draw: agDrawReg(()=>[[person, ledgerId, grp], …]) (part B: maids "maid", servants "srv"); their base row = AGBASE[grp](p,c) */
function agDrawReg(f){AGDRAW.push(f)}const AGBASE={};function agBaseReg(grp,fn){AGBASE[grp]=fn}/* the unwrapped schedule functions (set at wiring) */
function agDrawPerson(p,id,from,kind,to){const D=agDz();const L=D.P[id]=D.P[id]||[];const nB=to==null?j95nB():Math.min(j95nB(),to+1);const W=agWorld(p);
 const bo=S.buoi;for(let b=from;b<nB;b++){AG.cB=b;S.buoi=b;/* the access rules / weather of THAT buổi (accessOf reads S.buoi) */try{const c=j95c(b);
   let base;if(kind==="emp")base=agBase(AGD0.emp,[c],b)[0];else if(kind==="th")base=agBase(AGD0.th,[c],b)[0];else if(AGBASE[kind])base=agBase(AGBASE[kind],[p,c],b)[0];else base=agBase(AGD0.rv,[p,c],b)[0];
   L[b]=kind==="consort"||kind==="hh"?agDrawB(p,id,b,base,W):(()=>{const s={pl:base[0],a:base[1],t:base[2],why:base[3],k:null,need:null};
    /* the Emperor / Thái hậu: their own providers when a part registers them (AG-ALL part A), else their schedule weights */
    if(Object.keys(AGREG[kind]||{}).length)return agDrawB(p,id,b,base,W);return s})();
   AGD.stat.slots++}catch(e){agdErr("draw",e)}finally{AG.cB=null;S.buoi=bo}}
 }
/* HYBRID DAY (Foreman C 13:51Z, design change from main): at the start of the day each NPC sets her day INTENT = 1–2 needs she means to serve
   today (her long goals = road weights in her needs, her feeling of the day, her needs now); EVERY buổi she picks the concrete place + deed
   toward it from what is true at that buổi (her needs after the last buổi's deeds and what befell her — agTouch, the results of her deeds).
   Re-plan triggers (rain on a garden buổi, falling ill, touched, the top need changed) may change the INTENT for the rest of the day.
   Perf: the per-buổi pick of everyone runs where the record is built (j95plan); measured in AGD.ms (budget BAL.ag.perf.p95). */
function agDayList(){const L=[];if(S.emp)L.push([S.emp,"emp","emp"]);if(!S.thDead)L.push(["th","th","th"]);
 for(const v of liveRivals(true)){if(!v.alive||v.out)continue;L.push([v,"v"+v.id,"consort"])}
 for(const f of AGDRAW){try{for(const x of (f()||[]))L.push(x)}catch(e){agdErr("drawReg",e)}}return L}
function agIntentOf(id){const D=agDz();const I=D.I&&D.I[id];return I&&I.g||[]}
function agIntent(p,id){const D=agDz();D.I=D.I||{};let N;try{N=agNeedsG(p)}catch(e){N={}}const MF=agMoodF(p);const L=[];for(const n in N)if(N[n]>0)L.push([n,N[n]*(MF[n]||1)]);
 const g=[];if(L.length){const a=agPw(L);g.push(a);const L2=L.filter(x=>x[0]!==a);if(L2.length&&roll(agCap(BAL.ag.day.two)))g.push(agPw(L2))}
 D.I[id]={g,why:g.map(n=>AGWHY[n]||n).join(", ")};try{D.T[id]=agTop(N)}catch(e){}return D.I[id]}
function agDayDraw(){const t0=performance.now();const D=agDz();D.d=wk();D.P={};D.T={};D.I={};D.rb=null;AGD.stat.draw++;const b0=agDayB();
 const L=agDayList();for(const [p,id,kind] of L){try{agIntent(p,id);agDrawPerson(p,id,b0,kind,b0)}catch(e){agdErr("draw0",e)}}D.rb=wk()+"-"+b0;
 const ms=performance.now()-t0;window.__agDayMs=ms;AGD.ms.push(ms);if(AGD.ms.length>60)AGD.ms.shift()}
function agDaySlice(){/* kept for callers: the hybrid day has no pre-drawn later buổi */}
/* re-plan of the INTENT at a new buổi: her top need changed, or she was touched; chance BAL.ag.day.replan */
function agTouch(p){try{const id=ledgerId(p);if(!id)return;const z=agZ();z.rp=z.rp||{};z.rp[id]=1;AGD.stat.touch++}catch(e){}}
function agReplanB(){const D=agDz();if(D.d!==wk())return;const b=agDayB();if(D.rb===wk()+"-"+b)return;D.rb=wk()+"-"+b;const t0=performance.now();const z=agZ();const T=z.rp||{};const R=BAL.ag.day.replan;
 let rain=false;try{rain=wet()}catch(e){}
 for(const [p,id,kind] of agDayList()){try{
  if(kind==="consort"&&D.I&&D.I[id]){const v=p;let ill=false;try{ill=!!illOf(v)}catch(e){}const prev=D.P[id]&&D.P[id][b-1];
   /* LIFE: plans broken by rain on a garden plan, or by falling ill: she always re-thinks her day then */
   if((rain&&prev&&prev.pl==="vuon")||(ill&&!(D.ill||{})[id])){(D.ill=D.ill||{})[id]=ill?1:0;agIntent(v,id);AGD.stat.replan++}
   else{let ch=0;try{ch=agTop(agNeedsG(v))!==D.T[id]?R.need:0}catch(e){}if(T[id])ch=Math.max(ch,R.touch);if(ch&&roll(agCap(ch))){agIntent(v,id);AGD.stat.replan++}else AGD.stat.keep++}}
  else if(!D.I||!D.I[id])agIntent(p,id);
  agDrawPerson(p,id,b,kind,b)}catch(e){agdErr("buoi",e)}}
 z.rp={};const ms=performance.now()-t0;AGD.ms.push(ms);if(AGD.ms.length>60)AGD.ms.shift()}
function agDayEnsure(){if(!agDOn())return;const D=agDz();if(D.d!==wk())agDayDraw();else agReplanB()}
/* the record's row for a person this buổi = her plan */
function agRow(s){const r=[s.pl,s.a||"go",s.t||null,s.why||""];return [r,r.slice(),r.slice(),r.slice()]}
/* ---------------- the planned deed lands (AG1 pend / ledger / witness path) ---------------- */
function agDecideDay(v){const s=agDaySlot("v"+v.id);if(!s)return null;if(!s.k)return 0;/* a buổi of her schedule: she keeps it */
 let N;try{N=agNeedsG(v)}catch(e){return 0}
 const O=agOptsG(v,N,s.need);const o=O.find(x=>x.k===s.k&&(x.t?ledgerId(x.t):null)===(s.t||null))||O.find(x=>x.k===s.k);
 if(!o){AGD.stat.miss++;(AGD.why=AGD.why||{})['opt:'+s.k]=((AGD.why||{})['opt:'+s.k]||0)+1;agTouch(v);return 0}/* she cannot do it any more (cost, target gone): she keeps her place and re-plans next buổi */
 o.need=s.need;const at=(kh,vv,tt)=>{let k=null;try{k=o.at(kh,vv,tt)}catch(e){}return k===s.pl?k:null};
 let sl=agSlot(v,at,o.t);if(!sl)sl=agSlot(v,o.at,o.t);if(!sl){AGD.stat.miss++;(AGD.why=AGD.why||{})['slot:'+s.k]=((AGD.why||{})['slot:'+s.k]||0)+1;return 0}
 agPlan(v,o,N,sl[0],sl[1]);AGD.stat.land++;return 1}
/* ---------------- ANY GROUP'S DEED: run, doer, plan, tick (AG-ALL part A plumbing) ---------------- */
/* AGRUN[k](doer, target, pend) = the player's own act function for a deed that is not a TW deed (twDo) or the Sủng deck (npcEffort) */
const AGRUN={};const AGDOER={};
function agRunReg(k,fn){AGRUN[k]=fn}
function agDoerReg(prefix,fn){AGDOER[prefix]=fn}
function agDoer(p){if(p.vid!=null)return RV(p.vid);if(p.id==="emp")return S.emp||null;if(p.id==="th")return S.thDead?null:"th";
 for(const k in AGDOER)if(String(p.id).indexOf(k)===0)try{return AGDOER[k](p.id)}catch(e){return null}return null}
function agTgt(id){if(!id)return null;const a=agPerson(id);if(a)return a;if(id==="emp")return S.emp;if(id==="th")return"th";for(const k in AGDOER)if(String(id).indexOf(k)===0)try{return AGDOER[k](id)}catch(e){}return null}
/* a deed of someone who is not a consort (Emperor, Thái hậu, maids, servants) planned at place/khắc: the same pend / ledger path */
function agPlanX(id,s,kh){const z=agZ(),R=agRec();const p={key:agKey(),id,vid:null,k:s.k,kd:"",t:s.t||null,kh,pl:s.pl,act:s.act||s.k,why:s.why||""};z.pend.push(p);
 if(R&&R.P[id]){R.P[id][kh]=[s.pl,"ag_"+s.k,s.t||null,p.why];try{const A=R.acts=R.acts||[];A.push({id,kh,k:"ag:"+s.k,t:s.t||null,why:p.why,ok:1,ag:1});if(A.length>60)A.shift()}catch(e){}}
 AG.stat.by[s.k]=(AG.stat.by[s.k]||0)+1;const L={w:wk(),b:S.buoi||0,kh,id,k:s.k,t:s.t||null,pl:s.pl,why:p.why};z.log.push(L);if(z.log.length>60)z.log.shift();return p}
function agTickX(){if(!agDOn())return;const D=agDz();if(D.d!==wk())return;const z=agZ(),key=agKey();const k0=agKh();
 for(const id in D.P){if(/^v\d/.test(id))continue;const s=agDaySlot(id);if(!s||!s.k||!AGRUN[s.k])continue;if(z.pend.some(p=>p.id===id&&p.key===key)||(z.didX&&z.didX[id]===key))continue;
  (z.didX=z.didX||{})[id]=key;
  /* the khắc she can do it: from now on, not one a card / told deed / secret meeting already holds (same rule as a consort's agSlot) */
  const R=agRec();const free=[];for(let kh=k0;kh<J95.KH;kh++){const e=R&&R.P[id]&&R.P[id][kh];if(e&&(e[1]==="tryst"||e[1]==="meet"||e[1]==="offduty"||e[1]==="laundry"))continue;/* off duty / punished: her khắc is not hers */if(R&&agBound(id,kh,R.key))continue;free.push(kh)}
  if(!free.length){AGD.stat.miss++;continue}agPlanX(id,s,free[Math.floor(Math.random()*free.length)]);AGD.stat.land++}
 if(!agRec()){for(const p of z.pend.slice())if(p.key===key&&p.vid==null)agLand(p)}}
(function(){
 const l0=agLand0;agLand0=function(p,seen){const f=AGRUN[p.k];if(!f)return l0.apply(this,arguments);
  const z=agZ();const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);const v=agDoer(p);
  if(!v||S.dead||p.gone||p.drop||(typeof v==="object"&&(v.alive===false||(v.out&&p.pl!=="lc")))){AG.stat.drop++;return""}
  const t=agTgt(p.t);let r="";AG.inTick++;try{r=f(v,t,p)||""}catch(e){agErr("land:"+p.k,e)}finally{AG.inTick--}
  AG.stat.land++;if(typeof v==="object"&&v.id!=null){AG.na=AG.na||{};AG.na[v.id]=(AG.na[v.id]||0)+1}else if(!r)agTouch(v);
  try{if(r&&!seen){const me=t===S;if(typeof v==="object"&&v.id!=null&&RV(v.id)===v)newsAdd(v,p.k,r,me);if(me)log(`${r}.`)}}catch(e){}
  return r};
})();
/* ---------------- WIRING ---------------- */
(function(){
 AGD0.rv=j95planRival;AGD0.emp=j95planEmp;AGD0.th=j95planTH;
 j95planRival=function(v,c){if(agDOn()&&v&&!v.out&&!v.confined){try{agDayEnsure();const s=agDaySlot("v"+v.id);if(s)return agRow(s)}catch(e){agdErr("rv",e)}}return AGD0.rv.apply(this,arguments)};
 j95planEmp=function(c){let away=null;try{away=typeof worldWin==="function"&&worldWin("away")}catch(e){}if(agDOn()&&!away){try{agDayEnsure();const s=agDaySlot("emp");if(s)return agRow(s)}catch(e){agdErr("emp",e)}}return AGD0.emp.apply(this,arguments)};
 j95planTH=function(c){if(agDOn()){try{agDayEnsure();const s=agDaySlot("th");if(s)return agRow(s)}catch(e){agdErr("th",e)}}return AGD0.th.apply(this,arguments)};
 /* the buổi's deed = the planned one (AG1's fresh choice per buổi stays as the fallback with no plan) */
 const d0=agDecide0;agDecide0=function(v){if(agDOn()){try{agDayEnsure();const r=agDecideDay(v);if(r!==null)return r}catch(e){agdErr("decide",e)}}return d0.apply(this,arguments)};
 /* co-op host (no record): the plan's place replaces placeWhere's table */
 const pw0=placeWhere;placeWhere=function(){const r=pw0.apply(this,arguments);try{agTickX()}catch(e){agdErr("tickX",e)}try{if(agDOn()&&!j95on()){agDayEnsure();const W=S.where||{};
   for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined)continue;const s=agDaySlot("v"+v.id);if(s)W[v.id]=s.pl}const e=agDaySlot("emp");if(e)W.emp=e.pl;S.where=W}}catch(e){agdErr("pw",e)}return r};
 /* a deed whose khắc a card / told deed / binding took since it was planned does not happen: it leaves the pending list at once */
 const ra0=agReapply;agReapply=function(){const r=ra0.apply(this,arguments);try{const z=agZ();const n=z.pend.length;z.pend=z.pend.filter(p=>!p.drop);AG.stat.drop+=n-z.pend.length}catch(e){}return r};
 /* touched: the player's deed aimed at her; a deed of hers that failed */
 const tw0=twDo;twDo=function(a,t,k){const r=tw0.apply(this,arguments);try{if(a===S&&t&&t!==S&&t.id!=null)agTouch(t);if(a&&a!==S&&AG.inTick&&!r)agTouch(a)}catch(e){}return r};
})();
/* the deeds of this buổi (planned or pending) for the Dư đồ '!' (part C agHap): [{who, k, t, pl, kh, why, wit}] — wit = a person could
   see it there (the pending deed of this buổi at a real place); plus the day plan's later slots of this buổi with a deed */
function agPlanned(){const z=agZ(),key=agKey(),L=[];for(const p of z.pend||[])if(p.key===key&&!p.gone&&!p.drop)L.push({who:p.id,k:p.k,t:p.t,pl:p.pl,kh:p.kh,why:p.why,wit:1});
 const D=agDz();if(D.d===wk())for(const id in D.P){const s=D.P[id][agDayB()];if(s&&s.k&&!L.some(x=>x.who===id))L.push({who:id,k:s.k,t:s.t,pl:s.pl,kh:null,why:s.why,wit:0})}return L}
window.WORLD_PLAN_HOOKED=1;
Object.assign(window,{agDaySlice,agPlanned,agDrawReg,agBaseReg,agRunReg,agDoerReg,agPlanX,agTickX,AGRUN,agReg,agRegNeeds,agGrp,agNeedsG,agOptsG,agDayDraw,agDayEnsure,agDaySlot,agTouch,AGD,AGREG});
/* ================= G8 KHẮC PARITY + G9 TIMING (AG-ALL-2 part 2b; owner OD 17/11 ~14:50Z L1616–1617, ~15:00Z L1621) =================
   G8: an NPC's buổi has HER khắc budget (BAL.time.khac). Her planned deed costs the player's khắc for that act (agKhC); while khắc are left she
   weighs another deed (her needs again, after what she just did, against keeping her schedule — BAL.ag.kh2.rest) and does it after the
   first, walking between places at the player's walking cost (travel, j9). Each deed pays its own cost and rolls its own odds when it lands.
   G9: every deed is a HAPPENING with a real start and end khắc [kh, k1]: her row in the record holds the deed's place for each of those khắc
   (the Dư đồ shadow / counts follow her khắc by khắc, j95view), the '!' shows while it lasts and is gone once its end has passed (it lands),
   and the people who stand there in its khắc react like the player does (agSeeNpc: ignore / overhear / join / step in) — the re-decide at a
   khắc happens only when something near them changes (owner option 1 of s32 Lượt 24, recommended: cheap, no per-khắc loop over everyone).
   Off: BAL.ag.kh2.on = 0 (one deed per buổi, one khắc each, as before).
   ===================================================================================================================== */
const AGTALK=new Set(Object.keys(AGSOC).map(s=>AGSOC[s][0]).concat(["thTH","thHH","ksp","cx2:flat","cx2:true","cx2:show","cx2:favor","cx2:court","cx2:likes","cx2:old"]));
function agKhOn(){try{return !!(agOn()&&BAL.ag.kh2&&BAL.ag.kh2.on)}catch(e){return false}}
/* the khắc a deed costs = the player's khắc for the same act (ONE source: BAL.time.cost / SRVA k / BAL.ag.hh.kh / cardCost, j2) */
function agKhC(o,p){if(!o||!o.k)return 1;const k=o.k;if(o.kc!=null)return o.kc;
 try{const i=k.indexOf(":"),g=i>0?k.slice(0,i):"",x=i>0?k.slice(i+1):k;
  if((g==="maid"||g==="srv")&&typeof SRVA!=="undefined"&&SRVA[x])return SRVA[x].k||1;
  if(g==="harm")return BAL.time.cost.harm;
  if(g==="hh")return BAL.ag.hh.kh;
  if(AGTALK.has(k))return BAL.time.cost.talk;
  if(k==="effort"){const K=window.npcEffortKind&&p?window.npcEffortKind(p):null;return cardCost({c:K&&K.c||{}})}
  let c=TW[k]?twCost(k):null;if(!c&&g==="cx"&&BAL.ag.cx&&BAL.ag.cx[x])c=BAL.ag.cx[x].c;if(!c&&g==="cx2"&&BAL.ag.cx2&&BAL.ag.cx2[x])c=BAL.ag.cx2[x].c;
  return cardCost({c:c&&typeof c==="object"?c:{}})}catch(e){return 1}}
/* a khắc of her row she may still use: not a secret meeting / off duty / bound by a card, not a deed already there */
function agKhFree(R,id,kh){const e=R&&R.P[id]&&R.P[id][kh];if(!e)return false;if(e[1]==="tryst"||e[1]==="meet"||e[1]==="offduty"||e[1]==="laundry"||e[1]==="ag_tell"||/^ag_(see:|with$)/.test(e[1]||""))return false;
 if(agBound(id,kh,R.key))return false;/* the day plan labels her whole buổi row with its deed; the khắc really taken are the pending deeds' windows */
 for(const p of agZ().pend)if(p.id===id&&p.key===R.key&&!p.drop&&p.kh<=kh&&kh<=agK1(p))return false;return true}
/* write a deed's window into the record: each khắc of [kh, k1] holds its place (the shadow stays there while it lasts) */
function agSpan(p,o,doer){try{const kc=Math.max(1,agKhC(o,doer));const R=agRec();p.kc=kc;p.k1=Math.min(J95.KH-1,p.kh+kc-1);{const sp=p.kh+kc-J95.KH;if(sp>0&&agFitDay(p.kh,kc))p.sp=sp;else delete p.sp}/* runs on into the next buổi: sp khắc there (agSpill) */
  if(!R||!R.P[p.id])return;for(let kh=p.kh+1;kh<=p.k1;kh++){const e=R.P[p.id][kh];if(e&&(e[1]==="tryst"||e[1]==="meet"||agBound(p.id,kh,R.key))){p.k1=kh-1;break}R.P[p.id][kh]=[p.pl,"ag_"+p.k,p.t||null,p.why||""]}}catch(e){agdErr("span",e)}}
(function(){
 const p0=agPlan;agPlan=function(v,c,N,kh,k){const r=p0.apply(this,arguments);try{if(agKhOn()){const z=agZ();const p=z.pend[z.pend.length-1];if(p&&p.vid===v.id&&p.kh===kh)agSpan(p,c,v)}}catch(e){agdErr("plan2",e)}return r};
 const x0=agPlanX;agPlanX=function(id,s,kh){const p=x0.apply(this,arguments);try{if(agKhOn()&&p)agSpan(p,s,agDoer(p))}catch(e){agdErr("planX2",e)}return p};
})();
/* G8: after her deed, more deeds while khắc are left (her choice each time; "keep my schedule" ends her busy buổi) */
function agMore(d,id,prev,max){const A=BAL.ag.kh2;const R=agRec();if(!R||!R.P[id]||!prev)return 0;const cons=id[0]==="v";let n=0,end=agK1(prev),pl=prev.pl,last=prev.k;
 while(n<max){const k0=end+1;if(k0>=J95.KH)break;let N;try{N=agNeedsG(d)}catch(e){break}
  const NL=[[null,BAL.ag.routine*A.rest]];for(const q in N)if(N[q]>0)NL.push([q,N[q]*BAL.ag.needW]);const need=agPw(NL);if(!need)break;
  const O=agOptsG(d,N,need).filter(o=>o.k!==last&&(cons||AGRUN[o.k]));if(!O.length)break;
  const o=mindPick(O.map(x=>[x,x.u]),d);if(!o)break;let at=null;try{at=o.at(k0,d,o.t)}catch(e){}if(!at)break;
  if(cons){if(d.confined&&at!==palaceOf(d))break;if(!j95acc(d,at)&&at!=="home"&&at!==palaceOf(d))break}
  let w=0;try{w=at===pl?0:travel(pl,at)}catch(e){w=0}const kh=k0+w,kc=Math.max(1,agKhC(o,d));if(!agFitDay(kh,kc))break;/* no time left in the DAY for it (OD L852: a deed may run on into the next buổi): she keeps her schedule */
  let free=true;for(let q=kh;q<Math.min(kh+kc,J95.KH);q++)if(!agKhFree(R,id,q)){free=false;break}if(!free)break;
  o.need=need;let p;if(cons){agPlan(d,o,N,kh,at);p=agZ().pend[agZ().pend.length-1]}else p=agPlanX(id,{k:o.k,t:o.t?ledgerId(o.t):null,pl:at,act:o.act,why:agWhyN(o,need)},kh);
  if(!p)break;n++;AGD.stat.more=(AGD.stat.more||0)+1;end=agK1(p);pl=at;last=o.k}
 return n}
(function(){
 const d0=agDecideDay;agDecideDay=function(v){const r=d0.apply(this,arguments);try{if(r===1&&agKhOn()){const z=agZ(),key=agKey();const P=z.pend.filter(p=>p.vid===v.id&&p.key===key);const prev=P[P.length-1];
   if(prev)agMore(v,"v"+v.id,prev,BAL.ag.kh2.max)}}catch(e){agdErr("more",e)}return r};
 const t0=agTickX;agTickX=function(){const z=agZ(),key=agKey();const before=new Set((z.pend||[]).filter(p=>p.key===key&&p.vid==null).map(p=>p.id));const r=t0.apply(this,arguments);
  try{if(agKhOn()&&agRec()){for(const p of z.pend.slice()){if(p.key!==key||p.vid!=null||before.has(p.id)||!/^s\d/.test(p.id))continue;/* staff (the player can be a maid: same khắc budget); the Emperor / Thái hậu keep their one planned deed per buổi (his evening visit, summons and tea have their own buổi rules) */const d=agDoer(p);if(d)agMore(d,p.id,p,BAL.ag.kh2.maxX)}}}catch(e){agdErr("moreX",e)}return r};
})();
/* G9 two-way: the consorts who stand where an NPC's deed happens, in its khắc, see it and react by the player's own choice set
   (agReact: Nghe lén / the same deed / step in / Mặc kệ) — weighed by their needs, hostility and traits (mindPick, never always-best).
   The reaction takes that khắc of theirs (like hers: BAL.ag.kh); it is written in the ledger so the people-knowledge (TIN BÁO, part 2c) can read it. */
function agSeeNpc(p,doer){if(!agKhOn()||!BAL.ag.kh2.see.on)return;const R=agRec();if(!R||!p||!p.pl||p.pl==="home"||p.key!==R.key)return;/* the rows of THAT buổi only */const A=BAL.ag.kh2.see,B=BAL.ag.wit;const t=agTgt(p.t);
 const hostile=AGHOST.has(p.k)||/^harm:/.test(p.k)||p.k==="fakeIll"||p.k==="fakePreg";const D=TW[p.k];
 for(const w of liveRivals(true)){if(!w||!w.alive||w.out||w===doer||w===t)continue;const id="v"+w.id;const row=R.P[id];if(!row)continue;
  let kh=-1;for(let q=p.kh;q<=agK1(p);q++)if(row[q]&&row[q][0]===p.pl&&agKhFree(R,id,q)){kh=q;break}if(kh<0)continue;
  let N;try{N=agNeedsC(w)}catch(e){continue}const O=[["ignore",A.w.ignore]];
  const dv=typeof doer==="object"&&doer&&doer.id!=null?doer:null;
  if(dv&&motiveOK(w,dv,"spy").ok)O.push(["hear",A.w.hear*(Math.max(0,hostility(w,dv))/B.hoD+(hostile?1:0))*agMW(w,"spy")]);
  if(D&&!hostile&&agOwn(p.k)&&(!D.req||D.req(w,t))&&twCanPay(w,p.k)){const AS=AGSELF[p.k];const gl=AS?AS.g(w):(()=>{const s=Object.keys(AGSOC).find(x=>AGSOC[x][0]===p.k);return s?{g:AGSOC[s][3](BAL.tw.g),l:{}}:{g:{},l:{}}})();
   O.push(["join",A.w.join*agU(w,N,D.o?D.o(w,t):100,gl,twCost(p.k),AS?AS.tag:"social")])}
  if(hostile&&t&&t!==S&&typeof t==="object"&&TW.mediate&&aff(w,t)>=BAL.ag.goal.friend&&(!TW.mediate.req||TW.mediate.req(w,t))&&twCanPay(w,"mediate"))O.push(["mediate",A.w.mediate*agMW(w,"help")]);
  AGD.stat.seeN=(AGD.stat.seeN||0)+1;const c=mindPick(O.filter(x=>x[1]>0),w);if(!c||c==="ignore")continue;
  let r="";AG.inTick++;try{
   if(c==="hear"){if(roll(agOdd(agHearOf(w)))){if(hostile&&dv)evA(w,dv,A.ev);r=`${w.name} nghe lén được ${dv?dv.name:""} ${p.act}`}else{if(dv)affAdd(dv,w,-B.caught)}}
   else if(c==="join")r=twDo(w,p.k==="thHH"?queenP():t,p.k)||"";
   else if(c==="mediate")r=twDo(w,t,"mediate")||""}catch(e){agdErr("seeNpc",e)}finally{AG.inTick--}
  row[kh]=[p.pl,"ag_see:"+c,p.id,p.act||""];AG.stat.witNpc++;const SS=AGD.stat.see=AGD.stat.see||{};SS[c]=(SS[c]||0)+1;
  try{const L=R.acts=R.acts||[];L.push({id,kh,k:"ag:see:"+c,t:p.id,why:p.act||"",ok:r?1:0,ag:1,pl:p.pl});if(L.length>60)L.shift()}catch(e){}}}
(function(){
 const l0=agLand;agLand=function(p,seen){const pk=Object.assign({},p);const d=(()=>{try{return agDoer(p)}catch(e){return null}})();const r=l0.apply(this,arguments);
  try{if(r&&agKhOn()&&!pk.gone&&!pk.drop)agSeeNpc(pk,d)}catch(e){agdErr("see",e)}return r};
 try{ACT95["ag_see:hear"]="đứng nghe ngóng";ACT95["ag_see:join"]="cùng làm theo";ACT95["ag_see:mediate"]="đứng ra can"}catch(e){}
})();
Object.assign(window,{agKhC,agMore,agSpan,agSeeNpc,agKhOn});
/* ================= PER-KHẮC EVENT-DRIVEN RE-DECIDE (owner OD 17/11 ~15:25Z (2), her Ngự hoa viên scenario) =================
   An NPC keeps her buổi plan, but RE-DECIDES inside the khắc when something reaches her: news that the player arrived somewhere (her maid /
   eunuch who stands there tells her — by the servant's own choice, loyalty to her master), a happening starting where her servant stands,
   or any news another module hands her (agHeard: part 2c's TIN BÁO knowledge calls it too). She weighs the deeds aimed at the one she heard
   of (her group's own options, same costs / odds) against keeping her plan (BAL.ag.kh2.rd.keep × routine), mindPick (never always-best);
   if she goes, her not-yet-started deeds that clash are dropped, she walks there (travel khắc, rows on the way = "go") and her deed takes
   the khắc after — so the Dư đồ shadow and counts move khắc by khắc. Only the people the news reaches decide (no per-khắc loop over everyone). */
function agRdOn(){try{return agKhOn()&&BAL.ag.kh2.rd&&BAL.ag.kh2.rd.on}catch(e){return false}}
function agRdLog(R,id,kh,k,t,why,pl){try{const L=R.acts=R.acts||[];L.push({id,kh,k,t,why,ok:1,ag:1,pl});if(L.length>60)L.shift()}catch(e){}}
/* she heard: info = {pl, kh, who (the person it is about), why, by (the servant who told her)} */
function agHeard(v,info){if(!agRdOn()||!v||v===S||typeof v!=="object"||!v.alive||v.out||v.confined||!info)return 0;const R=agRec();const id="v"+v.id;if(!R||!R.P[id])return 0;
 const B=BAL.ag.kh2.rd;const k0=info.kh!=null?info.kh:agKh();if(k0>=J95.KH-1)return 0;AGD.rdC=AGD.rdC||{};AGD.rdC[R.key+":"+k0]=(AGD.rdC[R.key+":"+k0]||0)+1;let N;try{N=agNeedsC(v)}catch(e){return 0}
 let O=[];try{O=agOptsG(v,N,null).filter(o=>!info.who||o.t===info.who)}catch(e){agdErr("rdOpts",e)}
 AGD.stat.rdN=(AGD.stat.rdN||0)+1;
 const c=mindPick([["keep",B.keep*BAL.ag.routine]].concat(O.map(o=>[o,o.u])),v);
 if(!c||c==="keep"){agRdLog(R,id,k0,"ag:rd:keep",info.who?ledgerId(info.who):null,info.why||"",info.pl);return 0}
 let at=null;try{at=c.at(k0+1,v,c.t)}catch(e){}/* a deed aimed at the one she heard of goes where she heard that one is */if(info.who&&c.t===info.who&&info.pl)at=info.pl;if(!at)return 0;if(!j95acc(v,at)&&at!=="home"&&at!==palaceOf(v))return 0;
 /* OD L1638/L1641 (one shared clock): she hears at the START of khắc k0 and decides + walks IN k0; she is at the place from k0 + walk (≥ 1).
    A deed of hers already running in k0 ends first (she starts after its last khắc). */
 let s0=k0;for(const p of agZ().pend)if(p.id===id&&p.key===R.key&&!p.drop&&p.kh<=s0&&s0<=agK1(p))s0=agK1(p)+1;
 const from=(R.P[id][Math.max(0,s0-1)]&&R.P[id][Math.max(0,s0-1)][0])||palaceOf(v);let w=0;try{w=at===from?0:travel(from,at)}catch(e){}const kh=s0+Math.max(1,w),kc=Math.max(1,agKhC(c,v));if(!agFitDay(kh,kc))return 0;/* the DAY gate (OD L852), never the buổi */
 for(let q=s0;q<Math.min(kh+kc,J95.KH);q++){const e=R.P[id][q];if(!e||e[1]==="tryst"||e[1]==="meet"||/^ag_(see:|with$)/.test(e[1]||"")||agBound(id,q,R.key))return 0}
 /* she changes her mind: the deeds of hers not yet started in that time are dropped */
 const z=agZ();for(const p of z.pend.slice())if(p.id===id&&p.key===R.key&&p.kh>=s0&&p.kh<kh+kc){p.drop=1;z.pend.splice(z.pend.indexOf(p),1);AG.stat.drop++}
 for(let q=s0;q<kh;q++)R.P[id][q]=[at,"go",null,info.why||""];/* on her way (this khắc is spent walking) */
 c.need=c.need||"rd";agPlan(v,c,N,kh,at);{const pp=agZ().pend[agZ().pend.length-1];if(pp&&pp.id===id&&pp.kh===kh)pp.go=[s0,kh]}AGD.stat.rd=(AGD.stat.rd||0)+1;
 agRdLog(R,id,k0,"ag:rd:"+c.k,c.t?ledgerId(c.t):null,info.why||"",at);
 if(!AG.syQ){AG.syQ=1;setTimeout(agSyncNow,0)}/* the shadows of the khắc to come follow at once */
 return 1}
/* a servant who stands at pl in khắc kh tells her master (not the player — her own servants are part 2c's TIN BÁO) by her own choice */
function agTell(R,pl,kh,why,who,interest){const B=BAL.ag.kh2.rd;let n=0;
 for(const id in R.P){if(!/^s\d+$/.test(id))continue;const e=R.P[id][kh];if(!e||e[0]!==pl)continue;const s=servById(+id.slice(1));if(!s||s.out)continue;const m=ownerOf(s);
  if(!m||m===S||m===who||!m.alive||m.out)continue;const it=interest?interest(m):1;if(!(it>0))continue;
  const c=mindPick([["tell",B.tell*cl((s.loyal||0)/100,0,1)*it],["quiet",B.quiet]],s);if(c!=="tell")continue;
  const kg=kh+B.see,due=kg+B.go;/* OD L1638: she sees at once, reacts the NEXT khắc (her khắc spent going to her master), he hears at the start of the khắc after */
  if(kg<J95.KH&&R.P[id][kg]&&R.P[id][kg][1]!=="tryst"&&R.P[id][kg][1]!=="meet"){let mp=null;try{mp=R.P["v"+m.id]&&R.P["v"+m.id][kg]?R.P["v"+m.id][kg][0]:palaceOf(m)}catch(e){}R.P[id][kg]=[mp||palaceOf(m),"ag_tell",ledgerId(m),why]}
  agRdLog(R,id,kh,"ag:tell",ledgerId(m),why,pl);n++;AGD.stat.tell=(AGD.stat.tell||0)+1;
  const z=agZ();z.rq=z.rq||[];z.rq.push({key:R.key,due,kg,sid:id,m:ledgerId(m),pl,who:who===S?"me":who&&typeof who==="object"?ledgerId(who):null,why,by:ledgerId(s),kh});if(z.rq.length>B.qMax)z.rq.shift()}
 return n}
/* deliver the news whose khắc has come (her clock passed the teller's khắc): the master hears at the START of that khắc (agHeard k0 = due).
   BAL cap on re-deciders per khắc (low-end phones, OD L1638): over the cap the news waits one khắc. A news due after the buổi's last khắc
   reaches her at the next buổi: she re-plans the rest of her day (agTouch, the day-plan rule). */
function agRdDeliver(R,kh){const z=agZ();if(!z.rq||!z.rq.length)return 0;const B=BAL.ag.kh2.rd;let n=0;const keep=[];AGD.rdC=AGD.rdC||{};
 /* the record is rebuilt from the plans on a resync: the tellers' walk rows of this buổi come back */
 for(const q of z.rq)if(q.key===R.key&&q.sid&&R.P[q.sid]&&q.kg<J95.KH){const e=R.P[q.sid][q.kg];if(e&&e[1]!=="tryst"&&e[1]!=="meet"&&e[1]!=="ag_tell"){let mp=null;try{const m=agTgt(q.m);mp=m&&R.P["v"+m.id]&&R.P["v"+m.id][q.kg]?R.P["v"+m.id][q.kg][0]:palaceOf(m)}catch(x){}R.P[q.sid][q.kg]=[mp||e[0],"ag_tell",q.m,q.why]}}
 for(const q of z.rq){if(q.key!==R.key){if(q.key.split("-")[0]===R.key.split("-")[0]||q.due>=J95.KH){const m=agTgt(q.m);if(m&&typeof m==="object")agTouch(m);AGD.stat.rdLate=(AGD.stat.rdLate||0)+1}continue}
  if(q.due>kh||q.due>=J95.KH){if(q.due>=J95.KH){const m=agTgt(q.m);if(m&&typeof m==="object"){agTouch(m);AGD.stat.rdLate=(AGD.stat.rdLate||0)+1}continue}keep.push(q);continue}
  const ck=R.key+":"+q.due;if((AGD.rdC[ck]||0)>=B.cap){q.due++;AGD.stat.rdCap=(AGD.stat.rdCap||0)+1;if(q.due<J95.KH)keep.push(q);else{const m=agTgt(q.m);if(m&&typeof m==="object")agTouch(m)}continue}
  const m=agTgt(q.m);if(!m||typeof m!=="object")continue;n+=agHeard(m,{pl:q.pl,kh:q.due,who:q.who?agTgt(q.who):null,why:q.why,by:agTgt(q.by)})}
 z.rq=keep;return n}
/* the triggers: her ARRIVAL at a place (her place changed since the last resync), a happening STARTING at its khắc */
function agRdTick(){if(!agRdOn()||AG.inRd)return;const R=agRec();if(!R)return;AG.inRd=1;try{const kh=agKh();let me=null;try{me=R.P.me?R.P.me[kh][0]:j95mePlace()}catch(e){}
  agRdDeliver(R,kh);
  const k=R.key+":"+kh+":"+me,L=AG.rdMe;if(L!==k){const moved=!L||L.split(":")[0]!==R.key||L.split(":").pop()!==me;AG.rdMe=k;
   /* the khắc she ENTERED: the finished khắc whose result put her there (her walk khắc: her row shows the place from the khắc after it); the
      servants there react the khắc after that (OD L1638: "k1 she enters → k2 maid present / scouts → k3 master knows + acts → k4 visible") */
   let a=kh;try{if(R.P.me)while(a>0&&R.P.me[a-1]&&R.P.me[a-1][0]===me)a--}catch(e){}if(a>0)a--;
   if(moved&&me&&me!=="home")agTell(R,me,a,`nghe tin ngươi đến ${agPlaceTxt(me)}`,S,m=>{let x=0;try{x=agNeedsC(m)}catch(e){}return x?1:0})}
  for(const p of agZ().pend){if(p.key!==R.key||p.st||p.kh>kh||p.drop||p.gone)continue;p.st=1;const d=agTgt(p.id),t=agTgt(p.t);
   agTell(R,p.pl,kh,`nghe tin ${d&&d.name?d.name:""} ${p.act} ở ${agPlaceTxt(p.pl)}`,t&&t!==S?t:d,m=>{const a=typeof d==="object"&&d&&d!==m?Math.abs(aff(m,d)):0,b=typeof t==="object"&&t&&t!==m?Math.abs(aff(m,t)):0;return (a+b)/100})}}
 catch(e){agdErr("rd",e)}finally{AG.inRd=0}}
(function(){const sy0=j95sync;j95sync=function(){const r=sy0.apply(this,arguments);try{agRdTick()}catch(e){agdErr("rdSync",e)}return r}})();
try{ACT95["ag_go"]=ACT95["ag_go"]||"đang trên đường tới";ACT95["ag_tell"]=ACT95["ag_tell"]||"đi bẩm tin cho chủ";ACT95["ag_with"]=ACT95["ag_with"]||"đang tiếp người tới"}catch(e){}
Object.assign(window,{agHeard,agTell,agRdTick,agRdDeliver});
/* ================= ONE SHARED CLOCK (AG-ALL-2d; owner OD 17/11 ~16:00Z L1641, verbatim key words: "tất cả mọi người đều phải make sure là cùng phải
   trải qua cái mốc thời gian giống nhau, cùng sống trên một cái mốc thời gian") =================
   Her clock IS the world clock: an NPC deed lands only when her clock has passed its last khắc (agWatch), news moves only on finished khắc (agTell →
   agRdDeliver), so no NPC is ever a khắc ahead of her. An NPC who comes TO her in khắc k starts ONE shared act: the popup "Có người tìm đến" offers
   Tiếp chuyện (the whole talk, her answers inside it included, costs exactly ONE khắc — BAL.ag.kh2.sh.kh — and both move to k+1 together) or
   Không tiếp (the NPC's khắc is spent — she came — hers is not; the deed does not happen). NPC ↔ NPC: a consort whose deed is aimed at another
   consort meets her only if that one stands there with those khắc free; she receives or declines (mindPick: BAL.ag.kh2.sh rec vs dec × hostility);
   received = the met one's row holds the shared act (ag_with, the comer's row already holds her deed) and both spend those khắc; declined or away = the comer's khắc spent, a meeting deed (talk)
   does not happen. Co-op: each player's own clock (the popup spends only the clock of the player it opens for). Off: BAL.ag.kh2.sh.on = 0. */
function agShOn(){try{return agKhOn()&&BAL.ag.kh2.sh&&BAL.ag.kh2.sh.on}catch(e){return false}}
function agShKh(p){return BAL.ag.kh2.sh.kh}/* owner (OD ~16:00Z ONE SHARED CLOCK, sub-line): staying to talk costs exactly ONE khắc in all — her answers inside add none */
function agShOpts(p,v){const n=agShKh(p);const lock=agWhyDay(n);/* the DAY gate (OD L852) */const O=[];
 O.push({n:"Tiếp chuyện",r:"rec",fx:{},x:`Nắm chắc · tốn: ${n} khắc · thành: cùng ${v.name} trải qua khắc này`,go:()=>{if(!agCanDay(n)){agShDecl(p,v);return}try{const k=agKh();p.k1=Math.min(agK1(p),k+n-1)}catch(e){}/* the comer's act ends with hers: both move to the next khắc together */spend(n);AGD.stat.shMe=(AGD.stat.shMe||0)+1;const r=agLand(p,true);if(r)log(`${r}.`)}});
 O.push({n:"Không tiếp",r:"dec",fx:{},x:`Nắm chắc · thành: ${v.name} ra về, khắc của ngươi còn nguyên`,go:()=>agShDecl(p,v)});
 if(lock)kitOff(O[0],lock,"");return O}
function agShDecl(p,v){const z=agZ();const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);p.drop=1;AG.stat.drop++;AGD.stat.shNo=(AGD.stat.shNo||0)+1;/* her row in the record keeps the khắc she spent coming */log(`Ngươi không tiếp ${v.name}.`)}
/* NPC ↔ NPC: before the deed lands */
function agShNpc(p,d){if(!agShOn()||!p||p.vid==null||!p.t||p.t[0]!=="v")return 1;const R=agRec();if(!R||p.key!==R.key)return 1;const t=agTgt(p.t);if(!t||t===S||typeof t!=="object"||t===d)return 1;
 const id="v"+t.id,row=R.P[id];if(!row)return 1;const A=BAL.ag.kh2.sh;let here=true;const k1=Math.min(J95.KH-1,agK1(p));
 for(let q=p.kh;q<=k1;q++)if(!row[q]||row[q][0]!==p.pl||!agKhFree(R,id,q)){here=false;break}
 let c="dec";if(here){const ho=Math.max(0,hostility(t,d))/BAL.ag.wit.hoD;try{c=mindPick([["rec",A.rec],["dec",A.dec*ho]].filter(x=>x[1]>0),t)||"rec"}catch(e){c="rec"}}
 if(c==="rec"){for(let q=p.kh;q<=k1;q++)row[q]=[p.pl,"ag_with",ledgerId(d),p.act||""];AGD.stat.shNpc=(AGD.stat.shNpc||0)+1;return 1}
 AGD.stat[here?"shDec":"shAway"]=(AGD.stat[here?"shDec":"shAway"]||0)+1;return AGTALK.has(p.k)?0:1}
(function(){const l0=agLand;agLand=function(p,seen){try{if(p&&!p.drop&&!p.gone&&!p.sh){p.sh=1;const d=agDoer(p);if(!agShNpc(p,d)){p.drop=1}}}catch(e){agdErr("shNpc",e)}return l0.apply(this,arguments)}})();
Object.assign(window,{agShOn,agShOpts,agShNpc});

/* ================= AG-ALL-2d2 · ONE DAY-KHẮC GATE for every AG-ALL-2 deed (owner OD L852 + L886 + 16/11 ~21:42Z + 17/11 ~16:45Z restated) =================
   "can it still be done" = the khắc left in the DAY, never the buổi: an act longer than this buổi runs on into the next one.
   Her side: agCanDay(n) / agWhyDay(n) = the ONE gate on main (j76 dayFit / dayWhy; spend() carries the rest into the next buổi, j76) + the player's Sức rule
   of can(); used by every AG popup (agent agKhLock / agSpendKh, the shared-act Tiếp chuyện, the Empress's acts).
   NPC side: agFitDay(kh, kc) = the deed starts inside this buổi and its end fits this buổi + the next one of the same day (BAL.ag.kh2.spill = 1;
   the record holds one buổi, so at most one buổi of run-on, like her walk-spill); agSpan marks p.sp = the khắc it runs on; when the buổi turns, the
   deed is not landed but carried (agSpill): same deed, new buổi key, khắc 0 … sp−1 at the same place in the new record, and it lands at its real end. */
function agDayRoom(){try{return BAL.ag.kh2.spill&&(S.buoi||0)<BUOI.length-1?J95.KH:0}catch(e){return 0}}
function agFitDay(kh,kc){return kh<J95.KH&&kh+Math.max(1,kc)-1<J95.KH+agDayRoom()}
function agCanDay(n){if(typeof dayFit!=="function")return typeof can==="function"&&can(n);return dayFit(n)&&(n<=1||S.suc>=BAL.time.sucMin)}
function agWhyDay(n){if(agCanDay(n))return"";const w=typeof dayWhy==="function"?dayWhy(n):"";return w||(typeof whyTime==="function"&&whyTime(n))||"hết khắc trong ngày"}
function agSpill(p){try{if(!p||!(p.sp>0)||p.cont||p.drop||p.gone)return false;const R=agRec();if(!R||!R.P[p.id]||p.key===R.key)return false;
  const [w0,b0]=String(p.key).split("-"),[w1,b1]=String(R.key).split("-");if(w0!==w1||+b0+1!==+b1)return false;/* only into the very next buổi of the same day */
  const row=R.P[p.id];const k1=Math.min(J95.KH-1,p.sp-1);for(let q=0;q<=k1;q++){const e=row[q];if(!e||e[1]==="tryst"||e[1]==="meet"||agBound(p.id,q,R.key))return false}
  p.key=R.key;p.kh=0;p.k1=k1;p.cont=1;delete p.sp;p.seen=0;for(let q=0;q<=k1;q++)row[q]=[p.pl,"ag_"+p.k,p.t||null,p.why||""];
  AGD.stat.spill=(AGD.stat.spill||0)+1;return true}catch(e){agdErr("spill",e);return false}}
(function(){const l0=agLand;agLand=function(p){if(agKhOn()&&agSpill(p))return"";return l0.apply(this,arguments)};
 /* her side: the AG popups ask the day gate (was can(n) = this buổi only) */
 agKhLock=function(){const k=BAL.ag.kh;return agWhyDay(k)};
 agSpendKh=function(){const k=BAL.ag.kh;if(!agCanDay(k))return false;spend(k);return true};
})();
Object.assign(window,{agFitDay,agCanDay,agWhyDay,agSpill,agDayRoom});
