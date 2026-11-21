
/* ================= j68 ĐỜI SỐNG TRONG CUNG: common daily/situational events as composable templates =================
   Engine + shared helpers here; content in j68e. Wraps only; edits no other module. (Chains = j70, merit/festivals = j71, quests = j72.)
   Template = family x actor (real NPC picked by traits/relations) x context weight x text variants; outcomes truthful.
   Cadence: at most one j68 modal per tuần, only when the queue is short; some of the stock 'Có người đến' visits are swapped for a j68 event (no extra modals).
   Anti-repetition: per-life cooldown per template and per variant; cross-life history in localStorage 'ctm-e68h' (last 6 lives) lowers the weight of what was seen.
   Hook for other storyline modules: e68Busy() is true if j68 fired a big beat this month; j68 honours storyBusy() if defined. */
const E68=[],E68I={},Q68=[],Q68I={};
const E68CFG={cd:54}; /* npc-purpose: the weekly p / visit-swap rolls are gone: BAL.ag.why.e68.gap; a j68 visit only when no stock visitor has a reason */
const G6=t=>`<span class="g">${t}</span>`,R6=t=>`<span class="r">${t}</span>`;
function e68(){if(!S)return null;const e=S.e68=S.e68||{};e.cd=e.cd||{};e.vu=e.vu||{};e.fu=e.fu||[];e.q=e.q||[];e.qcd=e.qcd||{};e.ch=e.ch||{};e.n=e.n||0;e.qn=e.qn||0;e.cong=e.cong||0;e.qdone=e.qdone||0;e.qfail=e.qfail||0;e.npcq=e.npcq||[];
 if(!e.lid){e.lid=Date.now().toString(36)+R(1000);try{const H=JSON.parse(localStorage.getItem("ctm-e68h")||"{}");H.L=[[]].concat(H.L||[]).slice(0,6);H.cur=e.lid;localStorage.setItem("ctm-e68h",JSON.stringify(H))}catch(x){}}return e}
function e68H(){try{const H=JSON.parse(localStorage.getItem("ctm-e68h")||"{}");return H.L||[]}catch(x){return[]}}
function e68Mark(key){try{const H=JSON.parse(localStorage.getItem("ctm-e68h")||"{}");H.L=H.L||[[]];if(H.cur!==S.e68.lid){H.L=[[]].concat(H.L).slice(0,6);H.cur=S.e68.lid}if(!H.L[0].includes(key))H.L[0].push(key);if(H.L[0].length>400)H.L[0]=H.L[0].slice(-400);localStorage.setItem("ctm-e68h",JSON.stringify(H))}catch(x){}}
/* how many of the previous lives (not this one) saw this key */
function e68Past(key,pre){const L=e68H().slice(1,6);let n=0;for(const l of L)if(l.some(k=>pre?k.indexOf(key+":")===0||k===key:k===key))n++;return n}
function e68Busy(){const e=S&&S.e68;return !!(e&&e.bigM===S.turn)}
function e68Story(){try{return typeof storyBusy==="function"&&!!storyBusy()}catch(x){return false}}
function e68On(){return !!(S&&!S.dead&&!S.out&&!(typeof isSrv==="function"&&isSrv()))}
/* ---------- actors ---------- */
const NM6=p=>p?p.name:"";
function tr6(v){try{return traitsOf(v)}catch(x){return[v&&v.trait]}}
function rv6(f,wf){const L=liveRivals(true).filter(v=>!v.confined&&(!f||f(v)));const v=npwPick(L,v=>wf?Math.max(.01,wf(v)):npwB().min+Math.abs(aff(v,S))+hostility(v,S)/2);return v?v.id:null} /* npc-purpose: the one whose tie / goal fits the template most (never a random consort) */
function sv6(f,wf){const L=(S.staff||[]).filter(s=>s&&s.sid!=null&&(!f||f(s)));const s=npwPick(L,s=>wf?Math.max(.01,wf(s)):npwB().min+Math.abs((s.loyal||50)-50)+(netIs(s,"greed")?BAL.ag.why.e68.greed:0));return s?s.sid:null}
function kid6(f){const L=(S.kids||[]).filter(k=>k.alive&&(!f||f(k)));return L.length?pick(L).name:null}
function man6(rw){const L=(S.men||[]).filter(m=>m.alive!==false&&(!rw||m.rw===rw));return L.length?pick(L).id:null}
function A6(kind,id){try{
 if(kind==="rv"){const v=RV(id);if(!v||!v.alive)return null;return{o:v,n:v.name,f:pv(v),k:"rv"}}
 if(kind==="sv"){const s=servById(id);if(!s)return null;return{o:s,n:s.name,f:pServ(s),k:"sv"}}
 if(kind==="maid"){if(!S.maid)return null;return{o:S.maid,n:S.maid.name,f:pMaid(),k:"maid"}}
 if(kind==="emp")return{o:S.emp,n:"Hoàng thượng",f:pEmp(),k:"emp"};
 if(kind==="th"){if(S.thDead)return null;return{o:"th",n:"Thái hậu",f:pTH(),k:"th"}}
 if(kind==="doc"){const c=S.court&&S.court.ty;return{o:c,n:c&&c.name?c.name:"thái y",f:pDoc(),k:"doc"}}
 if(kind==="eun"){const c=S.court&&S.court.tq;return{o:c,n:c&&c.name?c.name:"Tổng quản",f:pEunCourt("tq"),k:"eun"}}
 if(kind==="ksp"){const c=S.court&&S.court.ksp;return{o:c,n:c&&c.name?c.name:"thái giám Kính sự phòng",f:pEunCourt("ksp"),k:"eun"}}
 if(kind==="kid"){const k=(S.kids||[]).find(x=>x.name===id&&x.alive);if(!k)return null;return{o:k,n:k.name,f:kidFace(k),k:"kid"}}
 if(kind==="man"){const m=(S.men||[]).find(x=>x.id===id);if(!m)return null;return{o:m,n:m.name,f:pMan(m),k:"man"}}
}catch(x){}return null}
/* relation tokens and effects, coloured explicitly (never through the 'nàng' heuristic) */
function relTok(a,n){if(!a||!n)return"";const nm=a.k==="th"?"Thái hậu với ngươi":a.k==="emp"?"Sủng":a.n;
 if(a.k==="rv")return n>0?G6(`${nm} thiện cảm +${n}`):R6(`${nm} thiện cảm ${n}`);
 if(a.k==="sv"||a.k==="maid")return (n>0?G6:R6)(`Lòng ${nm} ${n>0?"+":""}${n}`);
 if(a.k==="kid")return (n>0?G6:R6)(`${nm} quyến luyến ${n>0?"+":""}${n}`);
 if(a.k==="man")return (n>0?G6:R6)(`${nm} cảm kích ${n>0?"+":""}${n}`);
 if(a.k==="th")return (n>0?G6:R6)(`Thái hậu với ngươi ${n>0?"+":""}${n}`);
 if(a.k==="emp")return (n>0?G6:R6)(`Sủng ${n>0?"+":""}${n}`);
 if(a.k==="doc"||a.k==="eun")return (n>0?G6:R6)(`${nm} ${n>0?"nể ngươi":"mếch lòng"} ${n>0?"+":""}${n}`);return""}
function relDo(a,n){if(!a||!n)return;try{
 if(a.k==="rv")relAdd(S,a.o,n);else if(a.k==="sv"||a.k==="maid")a.o.loyal=cl((a.o.loyal||0)+n,0,100);else if(a.k==="kid")a.o.fond=cl((a.o.fond||0)+n,0,100);
 else if(a.k==="man")a.o.af=(a.o.af||0)+Math.round(n/2);else if(a.k==="th")apply({th:n});else if(a.k==="emp")apply({sung:n});else if((a.k==="doc"||a.k==="eun")&&a.o){a.o.af=a.o.af||{};if(typeof a.o.af==="object")a.o.af.me=(a.o.af.me||0)+n}}catch(x){}}
function fx6(o){return Object.entries(o||{}).filter(([k,v])=>v&&(NAMES[k]||k==="an")).map(([k,v])=>{const n=k==="an"?"Ân tình":NAMES[k];const vv=k==="sung"?sg(v):v;return (vv>0?G6:R6)(k==="sung"?sgStat(v,n)/* SG-CARD marker */:statTxt(k,vv,n))})}
function ap6(o){o=Object.assign({},o||{});if(o.an){S.an=cl((S.an||0)+o.an,0,100);delete o.an}apply(o)}
/* one choice. s: {c immediate fx, p odds, w/l fx on success/fail, r/lr [[actor,n]] relation on success/fail, wt/lt/k extra tokens, ok/no callbacks, wl/ll log lines} */
function c6(n,s){s=s||{};if(s.pw&&s.c&&s.c.bac<0){/* review ag-all-2 r2 A5: pw = the bạc buys a person's word, paid only on success; she must hold it; failure costs no bạc */
  const P=-s.c.bac,c0=Object.assign({},s.c),l0=Object.assign({},s.l||{});delete c0.bac;delete l0.bac;
  s=Object.assign({},s,{c:c0,w:Object.assign({},s.w||{},{bac:-P}),l:l0,lt:(s.lt||[]).concat(["không mất bạc"]),need:(s.need||[]).concat([{t:`cần ${P} bạc`,ok:(S.bac||0)>=P}])})}
 const wt=fx6(s.w).concat((s.r||[]).map(([a,v])=>relTok(a,v)),s.wt||[]).filter(Boolean),lt=fx6(s.l).concat((s.lr||[]).map(([a,v])=>relTok(a,v)),s.lt||[]).filter(Boolean);
 const p=s.p==null?null:oddsCl(Math.round(s.p));let x;
 if(p!=null)x=`${word(p)} · thành: ${wt.join(", ")||G6("êm chuyện")} · hỏng: ${lt.join(", ")||"không mất gì"}`;else x=wt.join(", ");
 if(s.k&&s.k.length)x+=(x?" · ":"")+"kèm: "+s.k.join(", ");
 /* review/odds-meter-back: a certain option (no p) carries no roll in its own code, so the kit reads it as certain («Nắm chắc»), never an unknown odds word */
 const fin=ok=>{
   if(ok){ap6(s.w);(s.r||[]).forEach(([a,v])=>relDo(a,v));let t="";try{t=s.ok?s.ok():""}catch(e){}log(t||s.wl||"Mọi việc êm xuôi.")}
   else{ap6(s.l);(s.lr||[]).forEach(([a,v])=>relDo(a,v));let t="";try{t=s.no?s.no():""}catch(e){}log(`<span class="r">Không thành:</span> ${t||s.ll||n+"."}`)}};
 const c={n,fx:s.c||{},x,go:p!=null?()=>fin(roll(oddsCl(p))):()=>fin(true)};
 if(s.c&&s.c.suc&&S.suc+s.c.suc<5)c.n+=" (mệt)";if(s.need&&typeof kitOffNeed==="function")kitOffNeed(c,s.need);return c}
/* ---------- events ---------- */
/* EV6(id, fam, spec): spec = {big, w(ctx)->weight, pp()->params|null (actor ids), v:[texts with {A} {B} {M} {S} {W} {P}], o(X)->choices, t title} */
const FAM6={day:"Chuyện trong cung",visit:"Có người đến",emp:"Hoàng thượng",sea:"Thời tiết",fest:"Ngày hội",merit:"Lập công",court:"Tin triều đình",kid:"Chuyện các con",serv:"Kẻ hầu",rumor:"Tin đồn",myst:"Chuyện lạ cần tra",plot:"Mưu hại",quest:"Việc nhờ"};
function EV6(id,fam,s){s.id=id;s.fam=fam;E68.push(s);E68I[id]=s;PEND["e68"+id]=p=>{try{return e68Build(s,p)}catch(x){console.error(x);return null}}}
function e68X(s,p){const X={p,vi:p.vi||0};const sl=s.a||[];for(let i=0;i<sl.length;i++){const kind=sl[i];const a=A6(kind,p["a"+i]);if(!a)return null;X["a"+i]=a}X.A=X.a0;X.B=X.a1;X.C=X.a2;return X}
function e68Fill(t,X){const sea=SEASON[S.month-1];return String(t).replace(/\{A\}/g,X.A?X.A.n:"").replace(/\{B\}/g,X.B?X.B.n:"").replace(/\{C\}/g,X.C?X.C.n:"").replace(/\{M\}/g,S.maid?S.maid.name:"cung nữ").replace(/\{S\}/g,sea.toLowerCase()).replace(/\{W\}/g,S.wx?S.wx.n:sea.toLowerCase()).replace(/\{P\}/g,(()=>{try{return placeOf(S.place).n}catch(e){return"trong cung"}})()).replace(/\{E\}/g,"Hoàng thượng")}
function e68Build(s,p){const X=e68X(s,p);if(!X)return null;const V=s.v||[""];let tx=e68Fill(V[(p.vi||0)%V.length],X)+(p.f?"<br>"+p.f:"");tx=tx.replace(/\{it\}/g,s.items&&p.it!=null?s.items[p.it%s.items.length]:"");const o=s.o(X);if(!o||!o.length)return null;
 return{who:s.who?s.who(X):(X.A?X.A.f:null),t:tx,o}}
function e68Ctx(){return{sea:SEASON[S.month-1],m:S.month,rank:S.rank,place:S.place,wx:S.wx||{},fest:(()=>{try{return festToday()}catch(e){return null}})(),wk:wk()}}
function e68Cands(fams,big){const e=e68(),C=e68Ctx(),now=wk(),out=[];const story=e68Story();
 for(const s of E68){if(fams&&!fams.includes(s.fam))continue;if(s.fam==="plot"||s.fu)continue;if(big===false&&s.big)continue;if(s.big&&story)continue;
  const last=e.cd[s.id];if(last!=null&&now-last<(s.cd||E68CFG.cd))continue;let w=0;try{w=s.w?s.w(C):1}catch(x){w=0}if(!(w>0))continue;
  w*=Math.pow(.5,e68Past(s.id,true));out.push([s,w])}return out}
function e68Pick(L){return npwPick(L,x=>x[1],{all:true})} /* npc-purpose: weighted among the situations whose people / state fit (every fitting one may come; top-only made whole families vanish: Tin đồn 28→0) */
/* params + a variant she has not seen lately (this life first, then the last five lives) */
function e68Make(s){const e=e68();let p=null;try{p=s.pp?s.pp():{}}catch(x){p=null}if(!p)return null;const V=s.v||[""];
 let all=[...V.keys()];if(s.vf){let ok=null;try{ok=s.vf(p)}catch(x){}if(ok&&ok.length)all=all.filter(i=>ok.includes(i));else if(ok)return null}const used=e.vu[s.id]||[];let pool=all.filter(i=>!used.includes(i));if(!pool.length){pool=all.slice();e.vu[s.id]=(e.vu[s.id]||[]).filter(i=>!all.includes(i))}
 const fresh=pool.filter(i=>!e68Past(s.id+":"+i));p.vi=pick(fresh.length?fresh:pool);
 const d=mkP("e68"+s.id,p);if(!d)return null;e.cd[s.id]=wk();(e.vu[s.id]=e.vu[s.id]||[]).push(p.vi);e.n++;if(s.big)e.bigM=S.turn;e68Mark(s.id+":"+p.vi);return d}
function e68Fire(fams,pk){const L=e68Cands(fams);for(let t=0;t<4&&L.length;t++){const x=(pk||e68Pick)(L);if(!x)break;L.splice(L.indexOf(x),1);const d=e68Make(x[0]);if(d)return [d,x[0]]}return null}
function e68Push(d,s,front){const m={t:s.t||FAM6[s.fam]||"Chuyện trong cung",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp};if(front)Q.unshift(m);else Q.push(m);return m}
/* follow-ups: a template flagged fu fires on its due tuần (params carried) */
function fu6(id,dt,p){const e=e68();e.fu.push({id,at:wk()+dt,p:p||{}})}
function e68FuTick(){const e=e68(),now=wk();for(const f of e.fu.slice()){if(f.at>now)continue;e.fu.splice(e.fu.indexOf(f),1);const s=E68I[f.id];if(!s)continue;const p=Object.assign({},f.p);if(p.vi==null)p.vi=R((s.v||[""]).length);const d=mkP("e68"+s.id,p);if(d){e68Push(d,s);return true}}return false}
/* the stock visit slot: a due j68 situation first (same number of modals) */
(function(){const a0=approachOne;approachOne=function(){try{const e=e68();if(e68On()&&!window.__e68off&&e&&wk()>=(e.vx||0)){const r=e68Fire(["visit","day","serv","rumor","kid","emp"],e68Pick);if(r){e.vx=wk()+BAL.ag.why.e68.visitGap;const[d,s]=r;return{t:s.t||FAM6[s.fam],h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp}}}}catch(x){console.error(x)}return a0.apply(this,arguments)}})();/* G1 #7: a due j68 situation (its own people: a visitor with an errand, a rumour with a teller) takes the slot before the stock visit, as the old swap did; visitGap paces it (fill-in-only made Tin đồn 30→5, j68 visits 79→11) */
/* the tuần tick */
function e68Tick(){const e=e68();if(!e)return;e.tick=(e.tick||0)+1;let added=0;
 if(Q.length>2)return;
 try{if(e68FuTick()){evBusyMark();return}}catch(x){console.error(x)}
 if(evBusy()||wk()<(e.nx||0))return;const r=e68Fire(null,e68Pick);if(r){e.nx=wk()+BAL.ag.why.e68.gap;e68Push(r[0],r[1]);if(r[1].big)evBusyMark()}}
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(e68On()&&!window.__e68off&&w0!=null&&wk()!==w0){e68Tick();if(Q.length&&$("modal").hidden)showModal()}}catch(x){console.error(x)}return r}})();
/* ---------- debugging / testing helpers (in-page) ---------- */
window.e68Test=function(id,p){const s=E68I[id];if(!s)return null;const d=e68Make(s);if(d){e68Push(d,s,true).must=1;showModal()}return !!d};
window.e68Count=function(){let v=0;for(const s of E68)if(s.fam!=="plot")v+=(s.v||[""]).length;return{templates:E68.length,variants:v,quests:Q68.length,questVariants:Q68.reduce((a,q)=>a+(q.v||[""]).length,0)}};

/* ================= SHARED HELPERS for the other content modules (j67 stories, j70 chains, j71 merit, j72 quests) =================
   evPickActor(spec) -> actor {o,n,f,k,id} | null. spec = {kind:"rv"|"sv"|"maid"|"emp"|"th"|"doc"|"eun"|"ksp"|"kid"|"man", f:filter(obj), w:weight(obj), rw:"thái y"|... (men only)}
      o = the live object, n = display name, f = portrait face for pframe/who, k = kind, id = what to store in saved params (rival id, servant sid, kid name, man id)
   evActor(kind,id) -> the same object from saved params (null if gone).  evRelTok(actor,n) / evRelDo(actor,n): coloured relation token + the real change.
   evChoice(name,spec) -> a dilemma option with gain AND cost/risk line (see c6 above: c,p,w,l,r,lr,wt,lt,k,ok,no,wl,ll).
   evCooldown(key,weeks) -> true and marks key used now if it was not used in the last `weeks` tuần (per life); evCooldownLeft(key,weeks) -> tuần left (0 = ready), no mark.
   evHistSeen(key) -> how many of the previous 5 lives saw key (localStorage 'ctm-e68h'); evHistMark(key) marks it for this life.
   evBusy() -> true if a big beat already fired this tuần (by j68 or anyone calling evBusyMark()), or storyBusy() says so; evBusyMark() claims the tuần.
   evBusyMonth() -> true if a big beat fired this month (e68Busy, for once-a-month beats). */
function evPickActor(sp){sp=sp||{};const k=sp.kind||"rv";let id=null;
 if(k==="rv")id=rv6(sp.f,sp.w);else if(k==="sv")id=sv6(sp.f);else if(k==="kid")id=kid6(sp.f);else if(k==="man"){const L=(S.men||[]).filter(m=>m.alive!==false&&(!sp.rw||m.rw===sp.rw)&&(!sp.f||sp.f(m)));id=L.length?pick(L).id:null}
 else{const a=A6(k);return a&&(!sp.f||sp.f(a.o))?Object.assign(a,{id:null}):null}
 if(id==null)return null;const a=A6(k,id);return a?Object.assign(a,{id}):null}
function evActor(kind,id){const a=A6(kind,id);return a?Object.assign(a,{id}):null}
const evRelTok=relTok,evRelDo=relDo,evChoice=c6;
function evCooldownLeft(key,weeks){const e=e68();if(!e)return 0;e.kc=e.kc||{};const t=e.kc[key];return t==null?0:Math.max(0,weeks-(wk()-t))}
function evCooldown(key,weeks){const e=e68();if(!e)return false;if(evCooldownLeft(key,weeks)>0)return false;e.kc[key]=wk();return true}
function evHistSeen(key){return e68Past(key)}
function evHistMark(key){if(S)e68();e68Mark(key)}
function evBusyMark(){const e=e68();if(e)e.busyWk=wk()}
function evBusy(){const e=S&&S.e68;return !!(e&&e.busyWk===wk())||e68Story()}
function evBusyMonth(){return e68Busy()}
/* ================= GLOBAL EVENT SCHEDULER (owner 11/14): applies to every event source by gating the one modal queue =================
   - Optional events (j7 ev events and the stock dilemmas, j24 'Có người đến' visits, servant causes, court pop-ups j55, princess moments j54,
     servant-road events j42, j68 events, and anything a module tags {opt:1}) show at most ONE per buổi and at most E68S.day per day;
     at day start they are spread to later buổi; overflow waits in a short holding list and is dropped when stale (an info-only one goes to the Nhật ký).
   - Mandatory ones (endings, news digest, pregnancy/birth, Thánh chỉ, festivals, story beats, tests, anything the player opened, anything tagged {must:1}) are never held.
   - Cooldowns: the same template not within E68S.tpl tuần; the same exact event (same actor + same text) not within E68S.key tuần (servant mishaps ~ once a season);
     the same actor is not featured in two optional events in a row. */
const E68S={day:2,tpl:5,key:10,stale:6,hold:4};
const OPTPID=new Set(["vase","coldletter","embezzle","tuyen","thbenh","loveletter","h54met","h54sad","h54tut","h54show","cnvScold","cnvBribe","cnvFrame","cnvBlack","cnvFest","cnvWed"]);
const OPTT=/^(Có người đến|Kẻ hầu xin|Hoàng thượng đến|Thái hậu triệu|Một ánh mắt|Việc của kẻ hầu|Việc khó xử|Hàng chợ đen|Thánh thượng ban thưởng|Thái hậu ban thưởng)$/;
function evOptional(m){if(!m||m.must||m.nl||/end|pcm|nlcard/.test(m.cls||""))return false;if(m.opt)return true;
 if(m.pid){if(/^e68/.test(m.pid)||OPTPID.has(m.pid))return true;try{if(EVI[m.pid]&&!/^(doanngo|trungcuu|vulan|dongchi|thbirthday|phoenix)$/.test(m.pid))return true}catch(e){}return false}
 return OPTT.test(m.t||"")}
function evTxt(m){return String(m.h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}
function evActorKey(m){const w=m.who;if(w){if(w.w)return w.w.join(":");if(w.nm)return "n:"+w.nm}const t=evTxt(m);const v=(rivals||[]).find(r=>t.includes(r.name));if(v)return "r:"+v.id;const s=(S.staff||[]).find(x=>x.name&&t.includes(x.name));return s?"s:"+s.sid:""}
function evNames(t){let x=t;try{(rivals||[]).forEach(r=>{x=x.split(r.name).join("X")});(S.staff||[]).concat(S.maid?[S.maid]:[]).forEach(s=>{if(s.name)x=x.split(s.name).join("X")})}catch(e){}return x}
function evKeys(m){const t=evTxt(m);const tpl=m.pid?"p:"+m.pid.replace(/^e68/,"e:"):"t:"+(m.t||"")+"|"+evNames(t).slice(0,26);return{tpl,key:tpl+"|"+evActorKey(m)+"|"+t.slice(0,40)}}
function evS(){const e=e68();e.sch=e.sch||{tpl:{},key:{},last:"",bk:"",day:-1,dn:0};return e.sch}
function bk6(){return wk()*B4N+(S.buoi||0)}
let EVHOLD=[],EVLAST=null;lifeStore("EVHOLD held events",()=>{EVHOLD=[];EVLAST=null});/* was reset by start() only: a slot load released the OLD life's held events into the loaded one */
function evDropInfo(m){if(!m.opts&&m.h){try{log(evTxt(m).slice(0,200))}catch(e){}}}
/* dry=1 (D13 jspread, during a buổi change): hold / drop the optional cards exactly as at a real show, but mark nothing as shown */
function evGate(dry){if(!S||S.dead||window.__e68off||!Q.length)return;const sc=evS();const b=bk6(),day=wk();if(sc.day!==day){sc.day=day;sc.dn=0}
 const now=wk();let keepOpt=Q[0]&&Q[0]===EVLAST&&evOptional(Q[0]);const hasMust=Q.some(m=>!evOptional(m)&&!m.__seen);
 for(let i=0;i<Q.length;i++){const m=Q[i];if(m===EVLAST&&i===0)continue;if(!evOptional(m))continue;
  const K=evKeys(m);const tl=sc.tpl[K.tpl],kl=sc.key[K.key];
  if((tl!=null&&now-tl<E68S.tpl)||(kl!=null&&now-kl<E68S.key)){Q.splice(i,1);i--;evDropInfo(m);continue}
  const ak=evActorKey(m);
  const atDayStart=(S.buoi||0)===0&&!m.__held&&(hasMust||roll(50));
  const block=keepOpt||sc.bk===b||sc.dn>=E68S.day||(ak&&ak===sc.last)||atDayStart;
  if(block){Q.splice(i,1);i--;if(EVHOLD.length<E68S.hold&&sc.dn<E68S.day+1)EVHOLD.push({m,at:now,K});else evDropInfo(m);continue}
  keepOpt=true}
 if(dry)return;
 const m=Q[0];if(m&&m!==EVLAST&&evOptional(m)){const K=evKeys(m);sc.tpl[K.tpl]=now;sc.key[K.key]=now;sc.last=evActorKey(m);sc.bk=b;sc.dn++;try{evHistMark(K.tpl)}catch(e){}}
 if(m)m.__seen=1;EVLAST=m||null}
/* release one held event at a later buổi, at random, if nothing else is up */
function evRelease(){if(!S||S.dead||Q.length||S.mg||!EVHOLD.length)return;const sc=evS();const now=wk();EVHOLD=EVHOLD.filter(h=>{if(now-h.at>E68S.stale){evDropInfo(h.m);return false}return true});
 if(!EVHOLD.length||sc.bk===bk6()||(sc.day===now&&sc.dn>=E68S.day)||!roll(65))return;const h=EVHOLD.shift();h.m.__held=1;Q.push(h.m);showModal()}
(function(){const s0=showModal;showModal=function(){try{evGate()}catch(x){console.error(x)}return s0.apply(this,arguments)}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{evRelease()}catch(x){console.error(x)}return r}})();
(function(){const t0=typeof tdPop==="function"?tdPop:null;if(!t0)return;tdPop=function(){const n=Q.length;const r=t0.apply(this,arguments);if(Q.length>n)Q[Q.length-1].opt=1;return r}})();
(function(){const s0=start;start=function(){EVHOLD=[];EVLAST=null;return s0.apply(this,arguments)}})();
