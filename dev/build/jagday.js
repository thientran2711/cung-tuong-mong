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
function agDz(){const z=agZ();if(!z.day||typeof z.day!=="object")z.day={d:-1,P:{},T:{}};z.day.P=z.day.P||{};z.day.T=z.day.T||{};return z.day}
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
function agTop(N){let b="",v=0;for(const n in N)if(N[n]>v){v=N[n];b=n}return b}
/* one buổi of one person's plan: base place (the old schedule's weights) + what she wants + how */
function agDrawB(p,id,b,base,W){const c=j95c(b);const slot={pl:base[0],a:base[1],t:base[2],why:base[3],k:null,need:null};
 if(W&&W.force){const f=W.force.find(x=>x.b===b||x.b===-1);if(f){AGD.stat.world++;return Object.assign(slot,{pl:f.pl,a:"ag_"+(f.deed||"duty"),k:null,need:"world",why:f.why||W.why||"",world:1})}}
 if(W&&W.place&&W.place[slot.pl]===0)slot.pl=p===S.emp?"dtd":p==="th"?"tn":palaceOf(p);
 let N;try{N=agNeedsG(p)}catch(e){return slot}
 const rt=BAL.ag.routine*(1+BAL.ag.restW*(N.rest||0));const NL=[[null,rt]];for(const n in N)if(n!=="rest"&&N[n]>0)NL.push([n,N[n]*BAL.ag.needW]);
 const need=agPw(NL);if(!need)return slot;
 let O=agOptsG(p,N,need);
 if(W)O=O.map(o=>{const m=(W.deed&&W.deed[o.k]!=null?W.deed[o.k]:1);return m===1?o:Object.assign({},o,{u:o.u*m})}).filter(o=>o.u>0);
 if(!O.length)return slot;
 const o=mindPick(O.map(x=>[x,x.u]),p);if(!o)return slot;
 let pl=null;try{pl=o.at(0,p,o.t)}catch(e){}
 if(!pl||(W&&W.place&&W.place[pl]===0))return slot;
 if(p!==S.emp&&p!=="th"&&p.alive!==undefined){if(p.confined&&pl!==palaceOf(p))return slot;if(!j95acc(p,pl)&&pl!=="home"&&pl!==palaceOf(p))return slot}
 AGD.stat.deeds++;
 return {pl,a:"ag_"+o.k,t:o.t?ledgerId(o.t):null,why:o.why||"",k:o.k,kd:o.kd||"",need,act:o.act,base:base[0]}}
/* the old schedule's own row for buổi b, its surprise dice off (surprises are re-plans now) */
function agBase(fn,args,b){const sur=J95.SUR;const bo=S.buoi;J95.SUR=0;try{S.buoi=b;return fn.apply(null,args)}finally{J95.SUR=sur;S.buoi=bo}}
const AGD0={};/* the unwrapped schedule functions (set at wiring) */
function agDrawPerson(p,id,from,kind){const D=agDz();const L=D.P[id]=D.P[id]||[];const nB=j95nB();const W=agWorld(p);
 const bo=S.buoi;for(let b=from;b<nB;b++){AG.cB=b;S.buoi=b;/* the access rules / weather of THAT buổi (accessOf reads S.buoi) */try{const c=j95c(b);
   let base;if(kind==="emp")base=agBase(AGD0.emp,[c],b)[0];else if(kind==="th")base=agBase(AGD0.th,[c],b)[0];else base=agBase(AGD0.rv,[p,c],b)[0];
   L[b]=kind==="consort"?agDrawB(p,id,b,base,W):(()=>{const s={pl:base[0],a:base[1],t:base[2],why:base[3],k:null,need:null};
    /* the Emperor / Thái hậu: their own providers when a part registers them (AG-ALL part A), else their schedule weights */
    if(Object.keys(AGREG[kind]||{}).length)return agDrawB(p,id,b,base,W);return s})();
   AGD.stat.slots++}catch(e){agdErr("draw",e)}finally{AG.cB=null;S.buoi=bo}}
 if(kind==='consort')try{D.T[id]=agTop(agNeedsG(p))}catch(e){}}
function agDayDraw(){const t0=performance.now();const D=agDz();D.d=wk();D.P={};D.T={};AGD.stat.draw++;
 try{if(S.emp)agDrawPerson(S.emp,"emp",0,"emp")}catch(e){agdErr("emp",e)}
 try{if(!S.thDead)agDrawPerson("th","th",0,"th")}catch(e){agdErr("th",e)}
 for(const v of liveRivals(true)){if(!v.alive||v.out)continue;try{agDrawPerson(v,"v"+v.id,0,"consort")}catch(e){agdErr("rv",e)}}
 const ms=performance.now()-t0;window.__agDayMs=ms;AGD.ms.push(ms);if(AGD.ms.length>60)AGD.ms.shift()}
/* re-plan at a new buổi (b > 0): her top need changed, or she was touched; chance BAL.ag.day.replan */
function agTouch(p){try{const id=ledgerId(p);if(!id)return;const z=agZ();z.rp=z.rp||{};z.rp[id]=1;AGD.stat.touch++}catch(e){}}
function agReplanB(){const D=agDz();if(D.d!==wk())return;const b=agDayB();if(!b||D.rb===wk()+"-"+b)return;D.rb=wk()+"-"+b;const z=agZ();const T=z.rp||{};const R=BAL.ag.day.replan;
 for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const id="v"+v.id;if(!D.P[id]){agDrawPerson(v,id,b,"consort");continue}
  let ch=0;try{ch=agTop(agNeedsG(v))!==D.T[id]?R.need:0}catch(e){}if(T[id])ch=Math.max(ch,R.touch);
  if(ch&&roll(ch)){agDrawPerson(v,id,b,"consort");AGD.stat.replan++}else AGD.stat.keep++}
 z.rp={}}
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
/* ---------------- WIRING ---------------- */
(function(){
 AGD0.rv=j95planRival;AGD0.emp=j95planEmp;AGD0.th=j95planTH;
 j95planRival=function(v,c){if(agDOn()&&v&&!v.out&&!v.confined){try{agDayEnsure();const s=agDaySlot("v"+v.id);if(s)return agRow(s)}catch(e){agdErr("rv",e)}}return AGD0.rv.apply(this,arguments)};
 j95planEmp=function(c){if(agDOn()){try{agDayEnsure();const s=agDaySlot("emp");if(s)return agRow(s)}catch(e){agdErr("emp",e)}}return AGD0.emp.apply(this,arguments)};
 j95planTH=function(c){if(agDOn()){try{agDayEnsure();const s=agDaySlot("th");if(s)return agRow(s)}catch(e){agdErr("th",e)}}return AGD0.th.apply(this,arguments)};
 /* the buổi's deed = the planned one (AG1's fresh choice per buổi stays as the fallback with no plan) */
 const d0=agDecide0;agDecide0=function(v){if(agDOn()){try{agDayEnsure();const r=agDecideDay(v);if(r!==null)return r}catch(e){agdErr("decide",e)}}return d0.apply(this,arguments)};
 /* co-op host (no record): the plan's place replaces placeWhere's table */
 const pw0=placeWhere;placeWhere=function(){const r=pw0.apply(this,arguments);try{if(agDOn()&&!j95on()){agDayEnsure();const W=S.where||{};
   for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined)continue;const s=agDaySlot("v"+v.id);if(s)W[v.id]=s.pl}const e=agDaySlot("emp");if(e)W.emp=e.pl;S.where=W}}catch(e){agdErr("pw",e)}return r};
 /* touched: the player's deed aimed at her; a deed of hers that failed */
 const tw0=twDo;twDo=function(a,t,k){const r=tw0.apply(this,arguments);try{if(a===S&&t&&t!==S&&t.id!=null)agTouch(t);if(a&&a!==S&&AG.inTick&&!r)agTouch(a)}catch(e){}return r};
})();
Object.assign(window,{agReg,agRegNeeds,agGrp,agNeedsG,agOptsG,agDayDraw,agDayEnsure,agDaySlot,agTouch,AGD,AGREG});
