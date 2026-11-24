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
     aimed at her, an event: agTouch(p)), re-draws the rest of her day when the new need outweighs the old goal (BAL.ag.day.replan, jagday agReplanB;
     no change, no re-plan: she keeps it).
   - co-op host (no record): placeWhere's table is replaced by the plan's place (S.where), the deeds land at once as in AG1.
   Off: BAL.ag.day.on = 0 (the per-buổi AG1 choice and the old schedule dice come back). Counters: AGD.stat, window.__agDayMs.
   ===================================================================================================================== */
const AGD={stat:{draw:0,slots:0,deeds:0,replan:0,keep:0,touch:0,land:0,miss:0,world:0},ms:[],errs:[],oc:{},bo:null};
/* review r1 robot-fix-cnv F4: AGD.lz holds the world (w) it was drawn for and its queue (newlife-leak «AGD…»); it already drops itself on another world, now it is
   dropped at once. AGD.oc is NOT reset here: a load resetting it re-plans the day and rewrites S.ag.log (save→load drift, r10-play-rt thd) — residual for the fixer */
lifeStore("AGD.lz day-plan queue (holds its world)",()=>{AGD.lz=null});
/* robot-fix-cnv-3 R5: AGD.oc (her options of THIS buổi, kept from the day draw for agDecideDay a moment later) is a pure perf memo — agDecideDay
   rebuilds them (agOptsG) when the entry is missing; its options hold the world they were built in (o.t = a person), so an entry is used only in
   that world (w) and the memo is dropped on new life / load / title (newlife-leak «AGD.oc…» = an old life's person) */
lifeStore("AGD.oc day-plan options memo (holds its world)",()=>{AGD.oc={}});
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
function agMoodF(p){try{const e=p&&typeof p==="object"&&p.emo;const M=BAL.ag.day.mood;if(!e||!(e.v>=M.min))return{};/* FEELINGS-18: Buồn at the heavy level reads the old Đau khổ row; a new kind reads its group's row (jfeel) */let k=e.k;if(k==="buon"&&M.k.dau&&typeof feelLv==="function"&&feelLv(p,"buon")>=3)k="dau";else if(typeof feelIn==="function")k=feelIn(M.k,k);return M.k[k]||{}}catch(e){return{}}}
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
 /* fix2 perf: her options of THIS buổi, drawn here at its start, are the ones agDecideDay checks her pick against a moment later (same buổi, same
    needs) — kept once for that check instead of being built twice (profile CPU×4: agDecide units up to 36 ms) */
 if(typeof id==="string"&&id[0]==="v"&&b===AGD.bo)AGD.oc[id]={key:wk()+"-"+b,need,O,w:S};/* robot-fix-cnv-3 R5: w = the world it was built in (its options hold that world's people) */
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
 const bo=S.buoi;AGD.bo=bo||0;for(let b=from;b<nB;b++){AG.cB=b;S.buoi=b;/* the access rules / weather of THAT buổi (accessOf reads S.buoi) */try{const c=j95c(b);
   let base;if(kind==="emp")base=agBase(AGD0.emp,[c],b)[0];else if(kind==="th")base=agBase(AGD0.th,[c],b)[0];else if(AGBASE[kind])base=agBase(AGBASE[kind],[p,c],b)[0];else base=agBase(AGD0.rv,[p,c],b)[0];
   L[b]=kind==="consort"||kind==="hh"?agDrawB(p,id,b,base,W):(()=>{const s={pl:base[0],a:base[1],t:base[2],why:base[3],k:null,need:null};
    /* the Emperor / Thái hậu: their own providers when a part registers them (AG-ALL part A), else their schedule weights */
    if(Object.keys(AGREG[kind]||{}).length)return agDrawB(p,id,b,base,W);return s})();
   AGD.stat.slots++}catch(e){agdErr("draw",e)}finally{AG.cB=null;S.buoi=bo}}
 }
/* HYBRID DAY (Foreman C 13:51Z, design change from main): at the start of the day each NPC sets her day INTENT = 1–2 needs she means to serve
   today (her long goals = road weights in her needs, her feeling of the day, her needs now); at a new buổi she picks the concrete place + deed
   toward it from what is true at that buổi ONLY WITH A CAUSE (ag2-perf A, owner OD L1637 "chỉ người bị ảnh hưởng mới nghĩ lại": agRdcCause —
   ill / rain / touched / top need changed / no slot / her last deed done / her needs outweigh her schedule; at most BAL.ag.day.redecideCap
   per buổi; the others keep her plan = her schedule row) — was: EVERY buổi every consort picked again (her needs after the last buổi's deeds and what befell her — agTouch, the results of her deeds).
   Re-plan triggers (rain on a garden buổi, falling ill, touched, the top need changed) may change the INTENT for the rest of the day.
   Perf: the per-buổi pick of everyone runs where the record is built (j95plan); measured in AGD.ms (budget BAL.ag.perf.p95). */
/* review ag-all-2 r2 W1 (owner OD ~18:05Z: weather never closes a place; staying indoors is the NPC's own choice, by odds): when her pick for buổi b
   is an outdoor place (BAL.wx.fx.storm.out) and that buổi has a storm from now on (jwxk wxkStormB, the one day clock), she keeps it with odds
   100 − BAL.wx.fx.storm.leave (held to BAL.odds), else she picks again through the same planner with the outdoor places weighted 0 (her palace if
   nothing else). The jwxk sweep then leaves planned people alone, and jweather hits them where they really are (wxNpcHit after the plan). */
(function(){const d0=agDrawB;agDrawB=function(p,id,b,base,W){const r=d0.apply(this,arguments);try{const F=BAL.wx&&BAL.wx.fx&&BAL.wx.fx.storm;
  if(!F||!r||!F.out.includes(r.pl)||!(id==="emp"||id==="th"||/^v\d/.test(id))||typeof wxkStormB!=="function"||(typeof worldOn==="function"&&!worldOn()))return r;
  if(!wxkStormB(b,b===agDayB()?agKh():0))return r;const O=BAL.odds;
  if(roll(cl(100-F.leave,O.lo,O.hi))){AGD.stat.wxStay=(AGD.stat.wxStay||0)+1;return r}
  AGD.stat.wxLeave=(AGD.stat.wxLeave||0)+1;const P=Object.assign({},W&&W.place||{});for(const k of F.out)P[k]=0;const b2=base.slice();if(F.out.includes(b2[0]))b2[0]=p===S.emp?"dtd":p==="th"?"tn":palaceOf(p);
  const r2=d0.call(this,p,id,b,b2,Object.assign({},W||{},{place:P}));if(r2&&F.out.includes(r2.pl)){r2.pl=b2[0];r2.a="go";r2.k=null}if(r2)r2.why=r2.why||"trời giông, ở trong cho yên";return r2}catch(e){agdErr("wxPlan",e);return r}}})();
/* W1: the weather hit on NPCs runs on the FINAL placement — wrapped after every module's placeWhere wrapper (jworld pulls, jagacts3 invites …) */
setTimeout(()=>{try{const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{if(agDOn()&&typeof wxNpcHit==="function")wxNpcHit()}catch(e){agdErr("wxHit",e)}return r};window.placeWhere=placeWhere}catch(e){agdErr("wxWrap",e)}},0);
function agDayList(){const L=[];if(S.emp)L.push([S.emp,"emp","emp"]);if(!S.thDead)L.push(["th","th","th"]);
 for(const v of liveRivals(true)){if(!v.alive||v.out)continue;L.push([v,"v"+v.id,"consort"])}
 for(const f of AGDRAW){try{for(const x of (f()||[]))L.push(x)}catch(e){agdErr("drawReg",e)}}return L}
function agIntentOf(id){const D=agDz();const I=D.I&&D.I[id];return I&&I.g||[]}
function agIntent(p,id){const D=agDz();D.I=D.I||{};let N;try{N=agNeedsG(p)}catch(e){N={}}const MF=agMoodF(p);const L=[];for(const n in N)if(N[n]>0)L.push([n,N[n]*(MF[n]||1)]);
 const g=[];if(L.length){const a=agPw(L);g.push(a);const L2=L.filter(x=>x[0]!==a);/* G3: a 2nd goal only when two needs pull nearly as hard as her strongest one (both ≥ BAL.ag.why.g3.two × the top need; the 1st goal is a weighted draw, so a weak 1st must not open a 2nd), chosen among those */const mx=Math.max(...L.map(x=>x[1])),bar=mx*BAL.ag.why.g3.two;const a1=(L.find(x=>x[0]===a)||[0,0])[1];const b2=a1>=bar?npwPick(L2.filter(x=>x[1]>=bar),x=>x[1]):null;if(b2)g.push(b2[0])}
 D.I[id]={g,why:g.map(n=>AGWHY[n]||n).join(", ")};try{D.T[id]=agTop(N)}catch(e){}return D.I[id]}
function agDayDraw(){const t0=performance.now();const D=agDz();D.d=wk();D.P={};D.T={};D.I={};D.rb=null;AGD.stat.draw++;const b0=agDayB();agLzNew(b0);
 const L=agDayList();for(const [p,id,kind] of L){if(agLzKind(kind)){agLzPush(p,id,kind,b0,1);continue}try{agIntent(p,id);agDrawPerson(p,id,b0,kind,b0);if(kind==="consort"&&agRdcOn()){const s0=D.P[id]&&D.P[id][b0];if(s0)s0.rc="day"}}catch(e){agdErr("draw0",e)}}D.rb=wk()+"-"+b0;
 const ms=performance.now()-t0;window.__agDayMs=ms;AGD.ms.push(ms);if(AGD.ms.length>60)AGD.ms.shift();agLzGo()}
/* perf (review ag-all-2 r2 B5, BAL.ag.perf): the household staff's buổi pick is SLICED like the consorts' deeds (agSlice): the record is built with
   their base row (their master's palace), then slices of at most BAL.ag.perf.slice ms draw them in later frames (all at once under window.__agAll);
   each drawn one gets her row repainted from the current khắc and her deed booked (agTickX), then one resync. AGD.ms holds every unit's time. */
function agLzKind(kind){return kind==="maid"||kind==="srv"}
function agLzNew(b){AGD.lz={key:wk()+"-"+b,b,L:[],ids:{},w:S}}/* w: the world (S) the queue was drawn for — a chunk never runs on another world (co-op seat swap, load, new life) */
function agLzPush(p,id,kind,b,intent,rp){const Q=AGD.lz;if(!Q)return;Q.L.push([p,id,kind,b,intent,rp]);Q.ids[id]=1}
function agLzHas(id){const Q=AGD.lz;return !!(Q&&Q.ids[id]&&Q.key===wk()+"-"+agDayB())}
function agLzGo(){const Q=AGD.lz;if(!Q||!Q.L.length)return;if(window.__agAll){while(AGD.lz&&AGD.lz.L.length)agLzRun();return}agLater("lz",agLzRun,{slice:1})}
function agLzRun(){const Q=AGD.lz;if(!Q)return;if(Q.w!==S||!agDOn()){AGD.lz=null;return}const D=agDz();if(Q.key!==wk()+"-"+agDayB()||D.d!==wk()){AGD.lz=null;return}
 const t0=performance.now(),B=BAL.ag.perf.slice;const done=[];
 while(Q.L.length){if(done.length&&performance.now()-t0>=B)break;const [p,id,kind,b,intent,rp]=Q.L.shift();delete Q.ids[id];try{
  /* scope "far": a far staff member picks again only with a cause (touch / need / new / done / urge), at most redecideCap per buổi; else her duty row */
  if(rp&&agRdcFar(p)){const prev=D.P[id]&&D.P[id][b-1];const c=agRdcCause(p,id,prev,"",rp===2?{[id]:1}:{});if(!c||agRdcN>=BAL.ag.day.redecideCap){agRdcKeep(p,id,b,c,kind);done.push(id);continue}agRdcN++;agRdcMark("far:"+c)}
  if(intent||!D.I||!D.I[id])agIntent(p,id);agDrawPerson(p,id,b,kind,b);done.push(id)}catch(e){agdErr("lz",e)}}
 try{const R=agRec();if(R){const k0=agKh();for(const id of done){const s=agDaySlot(id);const row=R.P[id];if(!s||!row)continue;const nr=agRow(s);
   for(let kh=k0;kh<J95.KH;kh++){const e=row[kh];if(!e||e[1]==="go"&&!agBound(id,kh,R.key)&&!(typeof walkIsRoad==="function"&&walkIsRoad(e)))row[kh]=nr[kh]}}}/* round 4: a road (jwalk / meeting lead-in / errand) is never repainted */
  if(done.length)agTickX()}catch(e){agdErr("lzPaint",e)}
 const ms=performance.now()-t0;AGD.ms.push(ms);if(AGD.ms.length>60)AGD.ms.shift();
 if(done.length)agLater("sync",agSyncNow)
 if(Q.L.length){if(window.__agAll)agLzRun();else agLater("lz",agLzRun,{slice:1})}else AGD.lz=null}
function agDaySlice(){/* kept for callers: the hybrid day has no pre-drawn later buổi */}
/* re-plan of the INTENT at a new buổi: her top need changed, or she was touched; new vs keep weighed on BAL.ag.day.replan (need = hold to the plan, touch = push of being touched) */
function agTouch(p){try{const id=ledgerId(p);if(!id)return;const z=agZ();z.rp=z.rp||{};z.rp[id]=1;AGD.stat.touch++}catch(e){}}
/* ag2-perf A — RE-DECIDE ONLY THE AFFECTED (owner OD L1637 17/11 ~15:45Z, verbatim: "chọn lại theo khắc, chỉ người bị ảnh hưởng mới nghĩ lại";
   ROOT-51 / C-AG #12 18/11). At a new buổi a consort picks her deed (needs × options, agDrawB) again ONLY with a cause:
     ill / rain (her plan broken: falling ill, rain on a garden plan) · touch (agTouch: an event, the player's deed or one aimed at her) ·
     need (her top need is no longer the one she planned for) · new (no slot yet) · done (her last buổi carried a deed: it is finished or blocked) ·
     urge (her needs now outweigh keeping her schedule: Σ N × BAL.ag.needW × mood × intent > BAL.ag.routine × mood, the weights agDrawB draws with).
   Everyone else keeps her plan: she follows her own schedule this buổi (the base row of the old schedule, same as her last buổi had no deed).
   At most BAL.ag.day.redecideCap consorts re-decide per buổi (causes in the order above; the rest keep and try at the next buổi).
   redecideCap 0 = off (every consort picks every buổi: the earlier HYBRID). The cause is kept on the slot (slot.rc) and counted (AGD.stat.rd). */
let agRdcN=0;const AGRDC=["ill","rain","touch","need","new","done","urge"];
function agRdcOn(){try{return BAL.ag.day.redecideCap>0}catch(e){return false}}
/* scope (C-AG #12 / MAIN ROOT-52 split, 18/11): BAL.ag.day.redecideScope "consort" = the filter on consorts (above); "far" = consorts and their own
   maids / eunuchs (and hers) pick every buổi as before, only FAR staff (no consort master and not hers: ownerOf null) re-pick with a cause, cap per buổi */
function agRdcScope(){try{return BAL.ag.day.redecideScope||"consort"}catch(e){return"consort"}}
function agRdcFar(p){if(!agRdcOn()||agRdcScope()!=="far")return false;try{return !ownerOf(p)}catch(e){return false}}
function agRdcCause(v,id,prev,rr,T){const D=agDz();D.TB=D.TB||{};let N={},top="";try{N=agNeedsG(v);top=agTop(N)}catch(e){}const t0=id in D.TB?D.TB[id]:D.T[id];D.TB[id]=top;
 if(rr)return rr;if(T[id])return"touch";if(top!==t0)return"need";if(!prev)return"new";if(prev.k)return"done";
 /* urge: her strongest need now outweighs keeping her schedule (the same weights agDrawB draws with: N × BAL.ag.needW against BAL.ag.routine) */
 let w=0;const MF=agMoodF(v),IN=agIntentOf(id);for(const n in N)if(N[n]>0)w+=N[n]*BAL.ag.needW*(MF[n]||1)*(IN.includes(n)?BAL.ag.day.intentW:1);
 if(w>BAL.ag.routine*(MF._||1))return"urge";return""}
function agRdcMark(c){const R=AGD.stat.rd=AGD.stat.rd||{};R[c]=(R[c]||0)+1}
function agRdcKeep(v,id,b,c,kind){const D=agDz();const L=D.P[id]=D.P[id]||[];const bo=S.buoi;AG.cB=b;S.buoi=b;
 try{const base=kind&&AGBASE[kind]?agBase(AGBASE[kind],[v,j95c(b)],b)[0]:agBase(AGD0.rv,[v,j95c(b)],b)[0];L[b]={pl:base[0],a:base[1],t:base[2],why:base[3],k:null,need:null,rc:"keep"};AGD.stat.slots++;agRdcMark(c?"cap":"keep")}
 catch(e){agdErr("rdKeep",e)}finally{AG.cB=null;S.buoi=bo}}
function agReplanB(){const D=agDz();if(D.d!==wk())return;const b=agDayB();if(D.rb===wk()+"-"+b)return;D.rb=wk()+"-"+b;const t0=performance.now();const z=agZ();const T=z.rp||{};const R=BAL.ag.day.replan;agLzNew(b);agRdcN=0;
 let rain=false;try{rain=wet()}catch(e){}
 for(const [p,id,kind] of agDayList()){try{
  if(kind==="consort"&&D.I&&D.I[id]){const v=p;let ill=false;try{ill=!!illOf(v)}catch(e){}const prev=D.P[id]&&D.P[id][b-1];
   /* LIFE: plans broken by rain on a garden plan, or by falling ill: she always re-thinks her day then */
   let rr="";if((rain&&prev&&prev.pl==="vuon")||(ill&&!(D.ill||{})[id])){rr=rain&&prev&&prev.pl==="vuon"?"rain":"ill";(D.ill=D.ill||{})[id]=ill?1:0;agIntent(v,id);AGD.stat.replan++}
   else{let ch=false;try{ch=agTop(agNeedsG(v))!==D.T[id]}catch(e){}if(T[id])ch=true;
    /* G3: she re-thinks only when the new top need outweighs the goal she set out with, near-best of the two — never a coin. Needs are 0..1, scored
       ×100: new = need × 100 (+ R.touch when touched), keep = need × 100 + R.need (she holds to the plan she set out with) */
    let rp=false;if(ch){let N2={};try{N2=agNeedsG(v)}catch(e){}const cur=(D.I[id].g||[])[0],nw=agTop(N2);rp=npwPick(["new","keep"],x=>x==="new"?(N2[nw]||0)*100+(T[id]?R.touch:0):(N2[cur]||0)*100+R.need)==="new"}
    if(rp){agIntent(v,id);AGD.stat.replan++}else AGD.stat.keep++}
   /* ag2-perf A (owner OD L1637 17/11 15:45Z "chỉ người bị ảnh hưởng mới nghĩ lại"): she picks this buổi's deed again only with a cause */
   if(agRdcOn()&&agRdcScope()!=="far"){const c=agRdcCause(v,id,prev,rr,T);if(!c||agRdcN>=BAL.ag.day.redecideCap){agRdcKeep(v,id,b,c);continue}agRdcN++;agRdcMark(c);AGD.rcNow=c}}
  else if(agLzKind(kind)){agLzPush(p,id,kind,b,0,T[id]?2:1);continue}/* staff: sliced (agLzRun); 1 = a buổi re-pick, 2 = touched (scope "far" filters it there) */
  else if(!D.I||!D.I[id])agIntent(p,id);
  agDrawPerson(p,id,b,kind,b);if(AGD.rcNow){const s0=D.P[id]&&D.P[id][b];if(s0)s0.rc=AGD.rcNow}/* A: the cause rides on her slot */}catch(e){agdErr("buoi",e)}finally{AGD.rcNow=null}}
 z.rp={};const ms=performance.now()-t0;AGD.ms.push(ms);if(AGD.ms.length>60)AGD.ms.shift();agLzGo()}
function agDayEnsure(){if(!agDOn())return;const D=agDz();if(D.d!==wk())agDayDraw();else agReplanB()}
/* the record's row for a person this buổi = her plan */
function agRow(s){const r=[s.pl,s.a||"go",s.t||null,s.why||""];return [r,r.slice(),r.slice(),r.slice()]}
/* ---------------- the planned deed lands (AG1 pend / ledger / witness path) ---------------- */
function agDecideDay(v){const s=agDaySlot("v"+v.id);if(!s)return null;if(!s.k)return 0;/* a buổi of her schedule: she keeps it */
 let N;try{N=agNeedsG(v)}catch(e){return 0}
 const oc=AGD.oc["v"+v.id];delete AGD.oc["v"+v.id];const O=oc&&oc.w===S&&oc.key===agKey()&&oc.need===s.need?oc.O:agOptsG(v,N,s.need);const o=O.find(x=>x.k===s.k&&(x.t?ledgerId(x.t):null)===(s.t||null))||O.find(x=>x.k===s.k);
 if(!o){AGD.stat.miss++;(AGD.why=AGD.why||{})['opt:'+s.k]=((AGD.why||{})['opt:'+s.k]||0)+1;agTouch(v);return 0}/* she cannot do it any more (cost, target gone): she keeps her place and re-plans next buổi */
 o.need=s.need;const at=(kh,vv,tt)=>{let k=null;try{k=o.at(kh,vv,tt)}catch(e){}return k===s.pl?k:null};
 let sl=agSlot(v,at,o.t,o);if(!sl)sl=agSlot(v,o.at,o.t,o);if(!sl){AGD.stat.miss++;(AGD.why=AGD.why||{})['slot:'+s.k]=((AGD.why||{})['slot:'+s.k]||0)+1;return 0}
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
  (z.didX=z.didX||{})[id]=key;let dX=null;try{dX=agDoer({id,vid:null})}catch(e){}
  /* the khắc she can do it: from now on, not one a card / told deed / secret meeting already holds (same rule as a consort's agSlot) */
  const R=agRec();const free=[];for(let kh=k0;kh<J95.KH;kh++){const e=R&&R.P[id]&&R.P[id][kh];if(e&&(e[1]==="tryst"||e[1]==="meet"||e[1]==="offduty"||e[1]==="laundry"))continue;/* off duty / punished: her khắc is not hers */if(R&&agBound(id,kh,R.key))continue;if(R&&!agWalkOk(R,id,kh,agKhC(s,dX),s.pl,dX,k0))continue;/* the walk to it and on from it fits (DEED WALKS) */free.push(kh)}
  if(!free.length){AGD.stat.miss++;continue}/* G3: the near-best khắc from now (agSoon), never a random one */agPlanX(id,s,npwPick(free,kh=>agSoon(kh,k0)));AGD.stat.land++}
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
  let w=0;try{w=at===pl?0:travel(pl,at,d)}catch(e){w=0}const kh=k0+w,kc=Math.max(1,agKhC(o,d));if(!agFitDay(kh,kc))break;/* no time left in the DAY for it (OD L852: a deed may run on into the next buổi): she keeps her schedule */
  let free=true;for(let q=kh;q<Math.min(kh+kc,J95.KH);q++)if(!agKhFree(R,id,q)){free=false;break}if(!free)break;if(!agWalkOk(R,id,kh,kc,at,d))break;/* and on to her next kept row (DEED WALKS) */
  o.need=need;let p;if(cons){agPlan(d,o,N,kh,at);p=agZ().pend[agZ().pend.length-1]}else p=agPlanX(id,{k:o.k,t:o.t?ledgerId(o.t):null,pl:at,act:o.act,why:agWhyN(o,need)},kh);
  if(!p)break;n++;AGD.stat.more=(AGD.stat.more||0)+1;end=agK1(p);pl=at;last=o.k}
 return n}
(function(){
 const d0=agDecideDay;agDecideDay=function(v){const r=d0.apply(this,arguments);try{if(r===1&&agKhOn()){const z=agZ(),key=agKey();const P=z.pend.filter(p=>p.vid===v.id&&p.key===key);const prev=P[P.length-1];
   if(prev)agMore(v,"v"+v.id,prev,BAL.ag.kh2.max)}}catch(e){agdErr("more",e)}return r};
 const t0=agTickX;agTickX=function(){try{agSpillAll()}catch(e){agdErr("spillAll",e)}/* a deed run on from the last buổi holds its khắc before anyone plans this buổi */const z=agZ(),key=agKey();const before=new Set((z.pend||[]).filter(p=>p.key===key&&p.vid==null).map(p=>p.id));const r=t0.apply(this,arguments);
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
  if(hostile&&t&&t!==S&&typeof t==="object"&&TW.mediate&&aff(w,t)>=netTh(w,"than")&&(!TW.mediate.req||TW.mediate.req(w,t))&&twCanPay(w,"mediate"))O.push(["mediate",A.w.mediate*agMW(w,"help")]);
  AGD.stat.seeN=(AGD.stat.seeN||0)+1;const c=mindPick(O.filter(x=>x[1]>0),w);if(!c||c==="ignore")continue;
  /* review ag-all-2 r2 B2: present ones see it in khắc kh and react the NEXT khắc (owner ~15:45Z), as a deed through the ledger (one day gate) */
  const tid=c==="hear"?(dv?ledgerId(dv):null):(t&&t!==S&&typeof t==="object"?ledgerId(t):t===S?"me":null);
  if(!agSeePlan(w,R,kh+1,p.pl,"see:"+c,c==="join"?p.k:(hostile?"h":""),tid,c==="hear"?(p.act||""):c==="mediate"?"đứng ra hòa giải":"cũng làm theo",p.act||""))continue;
  AG.stat.witNpc++;const SS=AGD.stat.see=AGD.stat.see||{};SS[c]=(SS[c]||0)+1}}
/* the reaction deed: kh = the khắc after she saw it, at that place; it must fit the DAY (agFitDay) and her khắc must be free, else she lets it go
   (agTouch: she re-thinks next buổi). Row "ag_see:<c>" = the khắc she spends on it. p.seen / p.sh: a reaction is not a new scene or meeting. */
function agSeePlan(v,R,kh,pl,k,kd,tid,act,why){if(!v||!R)return false;const id=ledgerId(v);if(!id||!R.P[id])return false;
 if(!agFitDay(kh,1)||kh>=J95.KH){agTouch(v);return false}if(!agWalkOk(R,id,kh,1,pl,v,kh-1)){agTouch(v);return false}/* DEED WALKS: and on to her next kept row */const e=R.P[id][kh];if(e&&(e[1]==="tryst"||e[1]==="meet"||e[1]==="offduty"||e[1]==="laundry"||/^ag_/.test(e[1]||""))||agBound(id,kh,R.key))return false;
 const z=agZ();const p={key:R.key,id,vid:v.id,k,kd:kd||"",t:tid||null,kh,pl,act:act||"",why:why||"",seen:1,sh:1};z.pend.push(p);R.P[id][kh]=[pl,"ag_"+k,tid||null,why||""];
 try{const L=R.acts=R.acts||[];L.push({id,kh,k:"ag:"+k,t:tid||null,why:why||"",ok:1,ag:1,pl});if(L.length>60)L.shift()}catch(x){}
 try{const L={w:wk(),b:S.buoi||0,kh,id,k,t:tid||null,pl,why:why||""};z.log.push(L);if(z.log.length>60)z.log.shift()}catch(x){}return true}
agRunReg("see:hearMe",(v,t,p)=>{const B=BAL.ag.wit;const o=odA(v,B.hear);if(agTry(o)){const zz=j95z();zz.meK[v.id]={k:p.pl,c:j95c(),w:wk()};noteAdd(v.id,"nàng để ý chỗ ngươi hay lui tới");return""}
 if(!agSoft(o)){affAdd(S,v,-B.caught);log(`Ngươi bắt gặp ${v.name} đứng nghe ngóng.`)}return""});
agRunReg("see:joinMe",(v,t,p)=>{if(!p.kd||!TW[p.kd]||!twCanPay(v,p.kd))return"";return twDo(v,p.kd==="thHH"?queenP():t,p.kd)||""});
agRunReg("see:hear",(v,t,p)=>{const A=BAL.ag.kh2.see,B=BAL.ag.wit;const dv=typeof t==="object"&&t&&t.id!=null?t:null;const ho=agHearOf(v);
 if(agTry(ho)){if(p.kd==="h"&&dv)evA(v,dv,A.ev);return `${v.name} nghe lén được ${dv?dv.name:""} ${p.act}`}if(!agSoft(ho)&&dv)affAdd(dv,v,-B.caught);return""});
agRunReg("see:join",(v,t,p)=>{if(!p.kd||!TW[p.kd]||!twCanPay(v,p.kd))return"";return twDo(v,p.kd==="thHH"?queenP():t,p.kd)||""});
agRunReg("see:mediate",(v,t,p)=>{if(!t||!TW.mediate||!twCanPay(v,"mediate"))return"";return twDo(v,t,"mediate")||""});
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
 const B=BAL.ag.kh2.rd;const k0=info.kh!=null?info.kh:agKh();if(j76left(S.buoi||0,k0+1)<1)return 0;/* the day has no khắc left (a deed must still START inside this buổi: agFitDay) */AGD.rdC=AGD.rdC||{};AGD.rdC[R.key+":"+k0]=(AGD.rdC[R.key+":"+k0]||0)+1;let N;try{N=agNeedsC(v)}catch(e){return 0}
 let O=[];try{O=agOptsG(v,N,null).filter(o=>!info.who||o.t===info.who)}catch(e){agdErr("rdOpts",e)}
 AGD.stat.rdN=(AGD.stat.rdN||0)+1;
 const c=mindPick([["keep",B.keep*BAL.ag.routine]].concat(O.map(o=>[o,o.u])),v);
 if(!c||c==="keep"){agRdLog(R,id,k0,"ag:rd:keep",info.who?ledgerId(info.who):null,info.why||"",info.pl);return 0}
 let at=null;try{at=c.at(k0+1,v,c.t)}catch(e){}/* a deed aimed at the one she heard of goes where she heard that one is */if(info.who&&c.t===info.who&&info.pl)at=info.pl;if(!at)return 0;if(!j95acc(v,at)&&at!=="home"&&at!==palaceOf(v))return 0;
 /* OD L1638/L1641 (one shared clock): she hears at the START of khắc k0 and decides + walks IN k0; she is at the place from k0 + walk (≥ 1).
    A deed of hers already running in k0 ends first (she starts after its last khắc). */
 let s0=k0;for(const p of agZ().pend)if(p.id===id&&p.key===R.key&&!p.drop&&p.kh<=s0&&s0<=agK1(p))s0=agK1(p)+1;
 const from=(R.P[id][Math.max(0,s0-1)]&&R.P[id][Math.max(0,s0-1)][0])||palaceOf(v);let w=0;try{w=at===from?0:travel(from,at,v)}catch(e){}/* her road, her penalty (j9 per walker) */const kh=s0+Math.max(1,w),kc=Math.max(1,agKhC(c,v));if(!agFitDay(kh,kc)){if(kh>=J95.KH&&kc<=j76left(S.buoi||0,kh))agTouch(v);return 0}/* the DAY gate (OD L852), never the buổi: a start past this buổi's record = she acts on it next buổi (agTouch re-plans her day, same as a late news) */
 for(let q=s0;q<Math.min(kh+kc,J95.KH);q++){const e=R.P[id][q];if(!e||e[1]==="tryst"||e[1]==="meet"||/^ag_(see:|with$)/.test(e[1]||"")||agBound(id,q,R.key))return 0}
 if(agWalkShort(R,id,kh,kc,at,v,kh-1,1)>0){AGD.stat.walkWait=(AGD.stat.walkWait||0)+1;agTouch(v);return 0}/* the walk on to her next kept row fits (DEED WALKS; the road there is the «go» rows below) */
 /* she changes her mind: the deeds of hers not yet started in that time are dropped */
 const z=agZ();for(const p of z.pend.slice())if(p.id===id&&p.key===R.key&&p.kh>=s0&&p.kh<kh+kc){p.drop=1;z.pend.splice(z.pend.indexOf(p),1);AG.stat.drop++}
 for(let q=s0;q<kh;q++)R.P[id][q]=[at,"go",null,info.why||""];/* on her way (this khắc is spent walking) */
 c.need=c.need||"rd";agPlan(v,c,N,kh,at);{const pp=agZ().pend[agZ().pend.length-1];if(pp&&pp.id===id&&pp.kh===kh)pp.go=[s0,kh]}AGD.stat.rd=(AGD.stat.rd||0)+1;
 agRdLog(R,id,k0,"ag:rd:"+c.k,c.t?ledgerId(c.t):null,info.why||"",at);
 agLater("sync",agSyncNow);/* the shadows of the khắc to come follow at once */
 return 1}
/* AG-ALL-2d4 TIN BÁO TIMING (owner OD 17/11 ~17:55Z (3), verbatim: "theo đường đi thật, gần thì khắc 2, xa thì khắc 3 trở đi"): news carried by a
   person reaches the master after the bearer's REAL Dư đồ walk from where she saw it to where the master is — the same travel() the player walks
   (BAL.walk near 1 / far 2; never a second distance table): seen at khắc k → near: known from k + 1, far: from k + 2 (later if the bearer is busy).
   agWalk = that walk, at least 1 khắc (the bearer must go); 0 when the relay is switched off (BAL.ag.kh2.rd.on / see + go = 0, the tests' knob). */
function agWalk(a,b,who){try{const B=BAL.ag.kh2.rd;if(!agRdOn()||!((B.see||0)+(B.go||0)))return 0}catch(e){return 0}if(!a||!b||a===b)return 1;
 const W=window.__walkSpill;window.__walkSpill=null;/* her own half-walk (travel's special case) is not the bearer's road */let w=1;try{w=travel(a,b,who||null)}catch(e){}/* the bearer's own road (her «đi chậm» too, j9 per walker; review/jagday-walk) */finally{window.__walkSpill=W}return Math.max(1,w||1)}
/* a servant who stands at pl in khắc kh tells her master (not the player — her own servants are part 2c's TIN BÁO) by her own choice */
function agTell(R,pl,kh,why0,who,interest){const B=BAL.ag.kh2.rd;let n=0;let why=null;const wy=()=>why!=null?why:(why=typeof why0==="function"?why0():why0);/* ag-deed-perf: the line (a place name: places() through every wrapper) is built only when a servant tells */
 for(const id in R.P){if(!/^s\d+$/.test(id))continue;const e=R.P[id][kh];if(!e||e[0]!==pl)continue;const s=servById(+id.slice(1));if(!s||s.out)continue;const m=ownerOf(s);
  if(!m||m===S||m===who||!m.alive||m.out)continue;/* live servants (j95s): walking with her master, who stands right here and sees it herself — no news to carry */{const mr=R.P["v"+m.id];if(mr&&mr[kh]&&mr[kh][0]===pl)continue}const it=interest?interest(m):1;if(!(it>0))continue;
  const c=mindPick([["tell",B.tell*cl((s.loyal||0)/100,0,1)*it],["quiet",B.quiet]],s);if(c!=="tell")continue;
  const busy=q=>R.P[id][q]&&(/^ag_(?!tell$)/.test(R.P[id][q][1]||"")||AG_NOTFREE.has(R.P[id][q][1]));
  let ks=kh;while(ks+1<J95.KH&&busy(ks+1))ks++;/* busy with her own deed (or not hers): she sets off when it ends, never over a deed row (ag-kh2 G9) */
  let mp=null;try{mp=R.P["v"+m.id]&&R.P["v"+m.id][Math.min(ks,J95.KH-1)]?R.P["v"+m.id][Math.min(ks,J95.KH-1)][0]:palaceOf(m)}catch(e){}mp=mp||palaceOf(m);
  const due=ks+Math.max(1,agWalk(pl,mp,s));/* OD 17/11 ~17:55Z (3): she sets off from pl the khắc she saw it; her REAL walk to her master (near 1 / far 2); he hears at the start of khắc due */
  let kg=J95.KH;/* the khắc rows she spends on the road (a far walk: the khắc between); none for a near one */
  for(let q=ks+1;q<due&&q<J95.KH;q++){const e=R.P[id][q];if(!e||busy(q)||e[1]==="tryst"||e[1]==="meet")break;if(kg===J95.KH)kg=q;R.P[id][q]=[mp,"ag_tell",ledgerId(m),wy()]}
  agRdLog(R,id,kh,"ag:tell",ledgerId(m),wy(),pl);n++;AGD.stat.tell=(AGD.stat.tell||0)+1;
  const z=agZ();z.rq=z.rq||[];z.rq.push({key:R.key,due,kg,sid:id,m:ledgerId(m),pl,who:who===S?"me":who&&typeof who==="object"?ledgerId(who):null,why:wy(),by:ledgerId(s),kh});if(z.rq.length>B.qMax)z.rq.shift()}
 return n}
/* deliver the news whose khắc has come (her clock passed the teller's khắc): the master hears at the START of that khắc (agHeard k0 = due).
   BAL cap on re-deciders per khắc (low-end phones, OD L1638): over the cap the news waits one khắc. A news due after the buổi's last khắc
   reaches her at the next buổi: she re-plans the rest of her day (agTouch, the day-plan rule). */
function agRdDeliver(R,kh){const z=agZ();if(!z.rq||!z.rq.length)return 0;const B=BAL.ag.kh2.rd;let n=0;const keep=[];AGD.rdC=AGD.rdC||{};
 /* the record is rebuilt from the plans on a resync: the tellers' walk rows of this buổi come back */
 for(const q of z.rq)if(q.key===R.key&&q.sid&&R.P[q.sid]&&q.kg<J95.KH){const e=R.P[q.sid][q.kg];if(e&&e[1]!=="tryst"&&e[1]!=="meet"&&e[1]!=="ag_tell"){let mp=null;try{const m=agTgt(q.m);mp=m&&R.P["v"+m.id]&&R.P["v"+m.id][q.kg]?R.P["v"+m.id][q.kg][0]:palaceOf(m)}catch(x){}R.P[q.sid][q.kg]=[mp||e[0],"ag_tell",q.m,q.why]}}
 for(const q of z.rq){if(q.key!==R.key&&q.nx!=null&&q.key.split("-")[0]===R.key.split("-")[0]){q.key=R.key;q.due=q.nx;delete q.nx}/* carried news: same clock into this buổi */
  if(q.key!==R.key){if(q.key.split("-")[0]===R.key.split("-")[0]||q.due>=J95.KH){const m=agTgt(q.m);if(m&&typeof m==="object")agTouch(m);AGD.stat.rdLate=(AGD.stat.rdLate||0)+1}continue}
  if(q.due>kh||q.due>=J95.KH){if(q.due>=J95.KH){if(q.nx!=null||(S.buoi||0)<B4L){if(q.nx==null)q.nx=q.due-J95.KH;keep.push(q);continue}const m=agTgt(q.m);if(m&&typeof m==="object"){agTouch(m);AGD.stat.rdLate=(AGD.stat.rdLate||0)+1}continue}keep.push(q);continue}
  const ck=R.key+":"+q.due;if((AGD.rdC[ck]||0)>=B.cap){q.due++;AGD.stat.rdCap=(AGD.stat.rdCap||0)+1;if(q.due<J95.KH)keep.push(q);else if((S.buoi||0)<B4L){q.nx=q.due-J95.KH;keep.push(q)}/* carried into the next buổi as at :316 (review ag-all-2 r2 B3) */else{const m=agTgt(q.m);if(m&&typeof m==="object")agTouch(m)}continue}
  const m=agTgt(q.m);if(!m||typeof m!=="object")continue;n+=agHeard(m,{pl:q.pl,kh:q.due,who:q.who?agTgt(q.who):null,why:q.why,by:agTgt(q.by)})}
 z.rq=keep;return n}
/* the triggers: her ARRIVAL at a place (her place changed since the last resync), a happening STARTING at its khắc */
function agRdTick(){try{agSpillAll()}catch(e){agdErr("spillAll",e)}if(!agRdOn()||AG.inRd)return;const R=agRec();if(!R)return;AG.inRd=1;try{const kh=agKh();let me=null;try{me=R.P.me?R.P.me[kh][0]:j95mePlace()}catch(e){}
  agRdDeliver(R,kh);
  const k=R.key+":"+kh+":"+me,L=AG.rdMe;if(L!==k){const moved=!L||L.split(":")[0]!==R.key||L.split(":").pop()!==me;AG.rdMe=k;
   /* the khắc she ENTERED: the finished khắc whose result put her there (her walk khắc: her row shows the place from the khắc after it); the
      servants there react the khắc after that (OD L1638: "k1 she enters → k2 maid present / scouts → k3 master knows + acts → k4 visible") */
   let a=kh;try{if(R.P.me)while(a>0&&R.P.me[a-1]&&R.P.me[a-1][0]===me)a--}catch(e){}/* = the first khắc she STANDS there (owner: k1 her walk, k2 seen + the maid walks, k3 the master knows) */
   if(moved&&me&&me!=="home")agTell(R,me,a,()=>`nghe tin ngươi đến ${agPlaceTxt(me)}`,S,m=>{let x=0;try{x=agNeedsC(m)}catch(e){}return x?1:0})}
  for(const p of agZ().pend){if(p.key!==R.key||p.st||p.kh>kh||p.drop||p.gone)continue;p.st=1;const d=agTgt(p.id),t=agTgt(p.t);
   agTell(R,p.pl,kh,()=>`nghe tin ${d&&d.name?d.name:""} ${p.act} ở ${agPlaceTxt(p.pl)}`,t&&t!==S?t:d,m=>{const a=typeof d==="object"&&d&&d!==m?Math.abs(aff(m,d)):0,b=typeof t==="object"&&t&&t!==m?Math.abs(aff(m,t)):0;return (a+b)/100})}}
 catch(e){agdErr("rd",e)}finally{AG.inRd=0}}
/* 2d3 (ag-kh2 G9 red on base): a servant sent to rest / punished in the middle of a buổi (j95 jplx list → her row "offduty" / "laundry" from now)
   is not free any more: her deeds not over yet on those khắc drop (the agSlot rule: an off-duty khắc is not hers), so no deed claims a row it
   does not hold. */
const AG_NOTFREE=new Set(["offduty","laundry","confined","cold"]);/* rows the j95 lists force (rest, Tân Giả khố, cấm túc, lãnh cung) */
function agPendOff(){const R=agRec();if(!R)return;const z=agZ();const kh=agKh();for(const p of z.pend.slice()){if(p.key!==R.key||p.drop||p.gone)continue;const row=R.P[p.id];if(!row)continue;
 for(let q=Math.max(p.kh,kh);q<=Math.min(J95.KH-1,agK1(p));q++){const e=row[q];if(e&&AG_NOTFREE.has(e[1])){p.drop=1;const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);AG.stat.drop++;break}}}}
(function(){const f0=agFlush;agFlush=function(){const r=f0.apply(this,arguments);try{agPendOff()}catch(e){agdErr("pendOff",e)}return r}})();
(function(){const sy0=j95sync;j95sync=function(){const r=sy0.apply(this,arguments);try{agPendOff()}catch(e){agdErr("pendOff",e)}try{agRdTick()}catch(e){agdErr("rdSync",e)}return r}})();
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
 O.push({n:"Tiếp chuyện",r:"rec",fx:{},x:`tốn: ${n} khắc · thành: cùng ${v.name} trải qua khắc này`,go:()=>{if(!agCanDay(n)){agShDecl(p,v);return}try{const k=agKh(),old=agK1(p);p.k1=Math.min(old,k+n-1);agShClear(p,p.k1+1,old)}catch(e){}/* the comer's act ends with hers: both move to the next khắc together */spend(n);AGD.stat.shMe=(AGD.stat.shMe||0)+1;const r=agLand(p,true);if(r)log(`${r}.`)}});
 O.push({n:"Không tiếp",r:"dec",fx:{},x:`thành: ${v.name} ra về, khắc của ngươi còn nguyên`,go:()=>agShDecl(p,v)});
 if(lock)kitOff(O[0],lock,"");return O}
/* review ag-all-2 r2 B7: the khắc a cut / dropped deed no longer holds show the NPC's row of the khắc before (she goes back to what she was doing) */
function agShClear(p,from,to){try{const R=agRec();if(!R||p.key!==R.key)return;const row=R.P[p.id];if(!row)return;const b4=p.kh>0&&row[p.kh-1]?row[p.kh-1]:null;const prev=[b4&&!/^ag_/.test(b4[1]||"")?b4[0]:p.pl,b4&&!/^ag_/.test(b4[1]||"")?b4[1]:"go",null,""];
 for(let q=Math.max(0,from);q<=Math.min(J95.KH-1,to);q++)if(row[q]&&row[q][1]==="ag_"+p.k)row[q]=prev.slice();agLater("sync",agSyncNow)}catch(e){agdErr("shClear",e)}}
function agShDecl(p,v){const z=agZ();const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);p.drop=1;try{agShClear(p,agKh()+1,agK1(p))}catch(e){}/* she spent khắc k coming; the later rows of the dropped deed are cleared */AG.stat.drop++;AGD.stat.shNo=(AGD.stat.shNo||0)+1;/* her row in the record keeps the khắc she spent coming */log(`Ngươi không tiếp ${v.name}.`)}
/* NPC ↔ NPC: before the deed lands */
function agShNpc(p,d){if(!agShOn()||!p||p.vid==null||!p.t||p.t[0]!=="v")return 1;const R=agRec();if(!R||p.key!==R.key)return 1;const t=agTgt(p.t);if(!t||t===S||typeof t!=="object"||t===d)return 1;
 const id="v"+t.id,row=R.P[id];if(!row)return 1;const A=BAL.ag.kh2.sh;let here=true;const k1=Math.min(J95.KH-1,agK1(p));
 for(let q=p.kh;q<=k1;q++)if(!row[q]||row[q][0]!==p.pl||!agKhFree(R,id,q)){here=false;break}
 if(here&&typeof agWalkShort==="function"&&agWalkShort(R,id,p.kh,k1-p.kh+1,p.pl,t,p.kh-1)>0)here=false;/* DEED WALKS: still on her road there (a deed / binding just before) = not home to receive */
 if(here&&agK1(p)>=J95.KH){/* the spilled part (review ag-all-2 r2 B3): the next buổi's record does not exist yet, so read her own day plan for that buổi */
  try{const nb=(S.buoi||0)+1;const sl=nb<4?agDaySlot(id,nb):null;if(sl&&sl.pl&&sl.pl!==p.pl)here=false}catch(e){}}
 let c="dec";if(here){const ho=Math.max(0,hostility(t,d))/BAL.ag.wit.hoD;try{c=mindPick([["rec",A.rec],["dec",A.dec*ho]].filter(x=>x[1]>0),t)||"rec"}catch(e){c="rec"}}
 if(c==="rec"){for(let q=p.kh;q<=k1;q++)row[q]=[p.pl,"ag_with",ledgerId(d),p.act||""];AGD.stat.shNpc=(AGD.stat.shNpc||0)+1;return 1}
 AGD.stat[here?"shDec":"shAway"]=(AGD.stat[here?"shDec":"shAway"]||0)+1;return AGTALK.has(p.k)?0:1}
(function(){const l0=agLand;agLand=function(p,seen){try{if(p&&!p.drop&&!p.gone&&!p.sh){p.sh=1;const d=agDoer(p);if(!agShNpc(p,d)){p.drop=1}}}catch(e){agdErr("shNpc",e)}return l0.apply(this,arguments)}})();
Object.assign(window,{agShOn,agShOpts,agShNpc});

/* ================= AG-ALL-2d2 · ONE DAY-KHẮC GATE for every AG-ALL-2 deed (owner OD L852 + L886 + 16/11 ~21:42Z + 17/11 ~16:45Z restated) =================
   "can it still be done" = the khắc left in the DAY, never the buổi: an act longer than this buổi runs on into the next one.
   Her side: agCanDay(n) / agWhyDay(n) = the ONE gate on main (j76 dayFit / dayWhy; spend() carries the rest into the next buổi, j76) + the player's Sức rule
   of can(); used by every AG popup (agent agKhLock / agSpendKh, the shared-act Tiếp chuyện, the Empress's acts).
   NPC side (2d3, Foreman D day-khắc audit): agFitDay(kh, kc) = the deed starts inside this buổi (her record row) and its length fits THE ONE day
   function j76left(buổi, kh) (the khắc left in the DAY, same as the player's can/dayFit; BAL.ag.kh2.spill = 0 → this buổi only); agSpan marks
   p.sp = the khắc it runs on; when the buổi turns, the deed is not landed but carried (agSpill): same deed, new buổi key, khắc 0 … at the same
   place in the new record, again for as many buổi as it needs, and it lands at its real end. News due after the buổi rides the same clock
   (agRdDeliver q.nx). */
function agFitDay(kh,kc){const n=Math.max(1,kc);if(!(kh>=0&&kh<J95.KH))return false;/* starts inside this buổi (her record row); its length = THE day function */
 return BAL.ag.kh2.spill?n<=j76left(S.buoi||0,kh):kh+n<=J95.KH}
function agCanDay(n){if(typeof dayFit!=="function")return typeof can==="function"&&can(n);return dayFit(n)&&(n<=1||S.suc>=BAL.time.sucMin)}
function agWhyDay(n){if(agCanDay(n))return"";const w=typeof dayWhy==="function"?dayWhy(n):"";return w||(typeof whyTime==="function"&&whyTime(n))||"hết khắc trong ngày"}
function agSpill(p){try{if(!p||!(p.sp>0)||p.drop||p.gone)return false;const R=agRec();if(!R||!R.P[p.id]||p.key===R.key)return false;
  const [w0,b0]=String(p.key).split("-"),[w1,b1]=String(R.key).split("-");if(w0!==w1||+b0+1!==+b1)return false;/* only into the very next buổi of the same day */
  const row=R.P[p.id];const k1=Math.min(J95.KH-1,p.sp-1);for(let q=0;q<=k1;q++){const e=row[q];if(!e||e[1]==="tryst"||e[1]==="meet"||AG_NOTFREE.has(e[1])||agBound(p.id,q,R.key))return false}
  /* round 4 (b, DEED WALKS): the carried part must leave her the road on to the next kept row of the new buổi (a meeting, a binding) — like a khắc
     that is not free, no road = not carried (agWalkShort, travel per walker; khắc 0 has no row before it) */
  try{let d=null;try{d=agDoer(p)}catch(e){}if(typeof agWalkShort==="function"&&agWalkShort(R,p.id,0,k1+1,p.pl,d,0,1)>0){AGD.stat.walkSpill=(AGD.stat.walkSpill||0)+1;return false}}catch(e){}
  p.key=R.key;p.kh=0;p.k1=k1;p.cont=1;{const rest=p.sp-J95.KH;if(rest>0)p.sp=rest;else delete p.sp}/* longer than a buổi: runs on again (the day function allowed it) */p.seen=0;for(let q=0;q<=k1;q++)row[q]=[p.pl,"ag_"+p.k,p.t||null,p.why||""];
  AGD.stat.spill=(AGD.stat.spill||0)+1;return true}catch(e){agdErr("spill",e);return false}}
(function(){const l0=agLand;agLand=function(p){if(agKhOn()&&agSpill(p))return"";return l0.apply(this,arguments)};
 /* her side: the AG popups ask the day gate (was can(n) = this buổi only) */
 agKhLock=function(){const k=BAL.ag.kh;return agWhyDay(k)};
 agSpendKh=function(){const k=BAL.ag.kh;if(!agCanDay(k))return false;spend(k);return true};
})();
/* the spill runs FIRST, at the first sight of the new record (j95sync → agRdTick, agTickX, agTick): it must hold its khắc 0 … before the re-deciders
   (agHeard), the staff plan (agTickX) or the deciders book them — the sliced landing (BAL.ag.perf.slice) may come frames later on a slow phone */
function agSpillAll(){const R=agRec();if(!R||!agKhOn())return 0;let n=0;for(const p of agZ().pend.slice())if(p.sp>0&&p.key!==R.key&&!p.drop&&!p.gone&&agSpill(p))n++;
 if(n){try{if(typeof agWalkGuard==="function")agWalkGuard(R,agKh())}catch(e){agdErr("walkGuard0",e)}/* her deeds planned before the spill took khắc 0 … keep their road (DEED WALKS) */agLater("sync",agSyncNow)}/* the view of the khắc now shows her there */return n}
(function(){const k0=agTick;agTick=function(){try{agSpillAll()}catch(e){agdErr("spillAll",e)}return k0.apply(this,arguments)}})();
Object.assign(window,{agFitDay,agCanDay,agWhyDay,agSpill,agSpillAll});
/* ================= DEED WALKS (review/jagday-walk, FOLLOW-UP GAP of walk-cost; owner OD L1976 walks cost khắc, law 1 / 6b NPCs live by her rules) =================
   A deed is a KEPT row (j95sKeep): jwalk.js never rewrites it, so the walk between two kept rows must be reserved when the deed is PLACED.
   ONE rule for every place a deed (or a reaction) gets its start khắc — agSlot (jagent: day deed, jshelf call, jagknow react), agTickX (staff,
   Emperor, Thái hậu), agMore (G8 next deed), agHeard (re-decide), agSeePlan (react next khắc): the deed [kh, kh+kc−1] at `at` fits only when
   - from the place she is bound to before it — the last kept row before kh (a deed, meeting, forced list) or, at the latest, the khắc now —
     she can walk there: travel(from, at, walker) khắc between them (after a kept row: whole khắc after it ends, as agMore always reserved;
     from the khắc now: this khắc is spent walking, as agHeard), and
   - from its last khắc she can walk on to the next kept row after it (same count).
   The free rows in between become «on the way» rows (jwalk pass). travel() per walker = BAL.walk.near / far + BAL.walk.pen of THAT person (j9).
   BAL.walk.npc = 0 → off (the old placing). No new number. */
function agWalkFix(x){if(!x)return false;const a=x[1]||"";return /^ag_/.test(a)||a==="tryst"||a==="meet"||a==="offduty"||a==="laundry"||a==="confined"||a==="cold"||a==="called"}
/* HELD row q of id: a card binding (J95B), a forced list / meeting (agWalkFix), or a deed that really holds the khắc (a pending deed's window,
   a reaction, a bearer on her road). The day plan labels her whole buổi «ag_<deed>» (agRow) before the deed is placed: where no deed holds the
   khắc that label is only the plan — a free row (jwalk may walk her through it). */
function agWalkHeld(R,id,q){const row=R&&R.P&&R.P[id];const x=row&&row[q];if(!x)return false;try{if(agBound(id,q,R.key))return true}catch(e){}const a=x[1]||"";
 if(!/^ag_/.test(a))return agWalkFix(x);if(a==="ag_tell"||a==="ag_with"||/^ag_see:/.test(a))return true;
 for(const p of agZ().pend||[])if(p.id===id&&p.key===R.key&&!p.drop&&!p.gone&&p.kh<=q&&q<=agK1(p))return true;
 /* round 4: every deed row is written with its pend entry (agPlan / agPlanX / agSpan / agSeePlan / agSpill / agReapply), so an «ag_» row no pend deed
    holds is only the day plan's label (agRow: her own deed's label, a world-forced buổi «ag_routine» with k null, a label the staff slice agLzRun
    repainted over a road) or a deed already landed / dropped — free (was: held unless it matched slot.k → a held plan label nobody could walk) */
 return false}
/* round 4 (MEETING ROADS, whole group): a secret meeting written later (j95secApply re-applied by placeWhere) right after a deed she already
   started: she leaves that deed one khắc early to walk there (the deed still lands, at its new end) — never a meeting reached with no road */
function agWalkCut(R,id,q){try{for(const p of agZ().pend||[]){if(p.id!==id||p.key!==R.key||p.drop||p.gone||p.sp>0||!(p.kh<q)||agK1(p)!==q)continue;
  p.k1=q-1;AGD.stat.walkCut=(AGD.stat.walkCut||0)+1;return true}}catch(e){agdErr("walkCut",e)}return false}
function agWalkReal(k){return !!k&&typeof k==="string"&&k!==(typeof J95OUT_!=="undefined"?J95OUT_:"__out")}
function agWalkT(a,b,d){if(!agWalkReal(a)||!agWalkReal(b)||a===b)return 0;try{return travel(a,b,d===undefined?null:d)||0}catch(e){return 0}}
/* the khắc short (0 = it fits) for a deed of `id` at `at`, khắc kh … kh+kc−1, walker d; cur = the khắc now (rows before it are past) */
function agWalkShort(R,id,kh,kc,at,d,cur,after){try{if(!(typeof walkNpcOn==="function"?walkNpcOn():BAL.walk.npc!==0))return 0;const row=R&&R.P&&R.P[id];if(!row||!agWalkReal(at))return 0;
  const K=J95.KH,k1=Math.min(K-1,kh+Math.max(1,kc||1)-1);if(cur==null)cur=R.kh!=null?R.kh:agKh();let s=0;
  const fx=q=>agWalkHeld(R,id,q);/* a deed, a card binding (J95B: a card said she was there), a forced list */
  /* before: the last kept row before kh (whole khắc after it), else the khắc now (spent walking unless a kept row holds it) */
  let q=kh-1;while(q>cur&&!fx(q))q--;if(q<cur)q=kh>0?Math.min(cur,kh-1):0;/* round 4 (b): a deed AT the khắc now (or a fresh khắc's guard, cur = the khắc before) starts from row kh−1 = where she was, never from its own row; khắc 0 has no row before: where she stands at the start */
  if(!after&&q>=0&&q<K&&row[q]){const t=agWalkT(row[q][0],at,d);if(t>0){const gap=q>=kh?0:kh-q-(fx(q)?1:0);s=Math.max(s,t-gap)}}
  /* after: the next kept row after the deed */
  let a=k1+1;while(a<K&&!fx(a))a++;
  if(a<K&&row[a]){const t=agWalkT(at,row[a][0],d);if(t>0)s=Math.max(s,t-(a-k1-1))}
  return Math.max(0,s)}catch(e){agdErr("walkShort",e);return 0}}
function agWalkOk(R,id,kh,kc,at,d,cur){const n=agWalkShort(R,id,kh,kc,at,d,cur);if(n>0){AGD.stat.walkWait=(AGD.stat.walkWait||0)+1;return false}return true}
/* GUARD: a deed placed earlier can lose its road when a later write fixes a row next to it (a deed run on from the last buổi, agSpill; a card
   binding her, J95B; a forced list). Every khắc (j95fixHouse chain, before the jwalk pass) each deed of this buổi NOT YET STARTED is checked:
   no road → it moves to the first later khắc that has the road and is free (same deed, same cost, same place); none → dropped, she re-plans
   (agTouch), as a deed she can no longer do. A started deed never moves. */
/* round 4 (whole group, law 11): rows next to a deed can still change AFTER the guard of a khắc ran — a mistress's later move rewrites her maid's
   retinue row (j95sPass), a deed slice / reaction lands frames after j95sync (AGL). So (1) the guard runs AFTER every row writer of the chain
   (j95sPass / j95sGuard), right before the road pass (jwalk wrapper); (2) at the FIRST pass of a new khắc (fresh: R.kh still the khắc before)
   the khắc now is not shown yet: the deeds starting NOW are checked too, from row cur−1 = where she really was, and the khắc now may be her
   road (jwalk walks it the same way). A started or seen deed never moves. */
function agWalkGuard(R,cur,fresh){if(!R||!R.P||!agKhOn())return 0;if(!(typeof walkNpcOn==="function"?walkNpcOn():BAL.walk.npc!==0))return 0;const z=agZ();let n=0;
 const lo=fresh?cur:cur+1,base=fresh&&cur>0?cur-1:cur;/* khắc 0 of a buổi: no row before it — she starts where row 0 stands (jwalk never rewrites khắc 0) */
 for(const p of (z.pend||[]).slice()){if(p.key!==R.key||p.drop||p.gone||p.kh<lo||(p.kh<=cur&&p.seen)||!R.P[p.id]||p.cont)continue;let d=null;try{d=agDoer(p)}catch(e){}
  const kc=Math.max(1,p.kc||agK1(p)-p.kh+1);if(!agWalkShort(R,p.id,p.kh,agK1(p)-p.kh+1,p.pl,d,base))continue;
  agShClear(p,p.kh,agK1(p));p.drop=1;let to=-1;
  for(let kh=p.kh+1;kh<J95.KH;kh++){if(!agFitDay(kh,kc))continue;let ok=true;for(let q=kh;q<Math.min(kh+kc,J95.KH);q++)if(!agKhFree(R,p.id,q)){ok=false;break}if(!ok)continue;
   if(agWalkShort(R,p.id,kh,Math.min(kc,J95.KH-kh),p.pl,d,base))continue;to=kh;break}
  if(to>=0){delete p.drop;p.kh=to;R.P[p.id][to]=[p.pl,"ag_"+p.k,p.t||null,p.why||""];agSpan(p,{k:p.k,kc},d);AGD.stat.walkMove=(AGD.stat.walkMove||0)+1;n++}
  else{const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);AG.stat.drop++;AGD.stat.walkDrop=(AGD.stat.walkDrop||0)+1;if(d&&typeof d==="object")agTouch(d);n++}}
 return n}
/* the guard's call sits in the jwalk j95fixHouse wrapper (after j95sPass, before walkNpcPass) */
Object.assign(window,{agWalkFix,agWalkShort,agWalkOk,agWalkGuard,agWalkCut});
