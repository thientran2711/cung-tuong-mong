/* ================= j72c: COMPOSED VIỆC NHỜ (ORDER THIN P3, owner OD 23/11 ~22:50Z; EVCAT §3 P3) =================
   A seed (data J72SEEDS in j72sd.js, built from every dev/handover/content/thin/j72seeds*.md by dev/build/j72sd_build.py) = requester by nết/need from the
   REAL roster × a real object × obstacle steps (1–3) × an optional hidden twist. At load every seed becomes ONE more T72 template ("c:"+id), so the whole
   j72 runtime (offer, steps, tab, nợ ân, ticks, saves) plays it unchanged; the 110 old templates stay as they are.
   Numbers (law 4): every gain/loss step = BAL.j72c.fx[tier][key]; odds/khắc/wait/deadline from BAL.j72c; nothing typed here.
   Choices (laws 2/3): every option of a pick step has Σgain == Σloss steps and the same total as its siblings (validator dev/test/j72seeds_validate.py).
   Draw: the shared no-repeat memory (jnorep) family "j72:<kind>" (T.hk = raw key "j72:<kind>:<id>"): once per life, last 5 lives avoided (q72Cands fresh-first).
   GROUNDING GATE (j68h rule): a seed is offered only when the requester (and B) are living real people with the wanted nết, its need holds on the live
   world, every {placeholder} has a person, and the object owner is a cast person, her or the store. Objects stay traceable (law 6c): S.q72c.ob keeps
   {sid,name,owner,trace,turn}; an `it` key puts that real item in her chest on success. Personal per seat (S.q72 / S.q72c): never a co-op world key. */
const J72C_SPEC={rv:"rv",hh:"hh",fallen:"fallen",sv:"sv",rsv:"rsv",ak:"ak",off:"off",fam:"fam",emp:"emp",th:"th",doc:"doc",eun:"eun",maid:"maid"};
const J72C_NET=new Set(["rv","fallen","sv","rsv","man"]);
const J72C_STAT=["sung","danh","bac","suc","mat","th","hh","duc","an"];
const J72C_FAIL={retry:"r",end:"e",bad:"b"};
function q72c(){if(!S)return null;const j=S.q72c=S.q72c||{};j.ob=j.ob||[];return j}
function j72cSpec(r){const k=(r&&r.kind)||"rv";return k.indexOf("man:")===0?k:(J72C_SPEC[k]||null)}
/* nết filter: any-of per list, lists AND-ed (yard.md rule) */
function j72cFit(o,r){if(!r)return true;const k=(r.kind||"rv").split(":")[0];if(!J72C_NET.has(k))return true;let T=[];try{T=tr6(o)||[]}catch(e){T=[]}
 const any=L=>!L||!L.length||L.some(n=>T.includes(n));return any(r["nết"])&&any(r["lòng"])}
/* needs: real state that motivates the ask (thresholds in BAL.j72c.need) */
function j72cNeed(nd,a,X){if(!nd)return true;const N=BAL.j72c.need,o=a&&a.o;try{
 if(nd==="ill")return !!(o&&typeof o==="object"&&illOf(o)&&(o===S.emp||!o.ill||o.ill.known!==false));
 if(nd==="preg")return !!(o&&o.preg);
 if(nd==="friend")return !!a&&q72RelV(a)>=N.friend;
 if(nd==="feud"){const A=X&&X.A&&X.A.o,B=X&&X.B&&X.B.o;return !!(A&&B&&A.id!=null&&B.id!=null&&(aff(A,B)<=netTh(A,"ky")||aff(B,A)<=netTh(B,"ky")))}
 if(nd==="thIll")return !S.thDead&&!!S.thIll;
 if(nd==="empIll")return !!illOf(S.emp);
 if(nd==="bienLo"||nd==="khoLo"){if(typeof trS!=="function")return false;const T=trS();return !!T&&T[nd==="bienLo"?"bien":"kho"]<N.lo}
 if(nd==="kids")return !!o&&allKids().some(([k,m])=>m===o&&k.alive);
 if(nd==="poor")return !!o&&o.bac!=null&&o.bac<N.poor;
 if(nd==="fest")return !!(typeof festToday==="function"&&festToday());
}catch(e){return false}return false}
function j72cStep(tier,k){const F=BAL.j72c.fx[tier]||BAL.j72c.fx.m;return F[k]}
/* gain/loss step map → {fx (signed stats), r, rb} */
function j72cVal(m,tier,sign){const fx={};let r=0,rb=0;for(const [k,n] of Object.entries(m||{})){const v=n*j72cStep(tier,k)*sign;
 if(J72C_STAT.includes(k))fx[k]=(fx[k]||0)+v;else if(k==="rel")r+=v;else if(k==="relb")rb+=v}return{fx,r,rb}}
function j72cTxt(t,sd){const o=sd.object;return String(t||"").replace(/\{O\}/g,o&&o.name?o.name:"")}
/* the object's trace after the favour ends (law 6c) + the real item she receives */
function j72cTrace(sd,X,res){const o=sd.object;if(!o)return"";const j=q72c();const nm=q72Txt(j72cTxt(o.name,sd),X);
 const own=o.owner==="me"?(S.name||"ngươi"):o.owner==="kho"?"Nội vụ phủ":o.owner==="B"?(X.B?X.B.n:""):(X.A?X.A.n:"");
 const tr=q72Txt(j72cTxt(res==="ok"?o.trace_ok:o.trace_no,sd),X);j.ob.push({sid:sd.id,name:nm,owner:own,trace:tr,turn:S.turn});if(j.ob.length>BAL.j72c.obKeep)j.ob.splice(0,j.ob.length-BAL.j72c.obKeep);
 let g="";if(res==="ok"&&o.it&&typeof IT!=="undefined"&&IT[o.it]&&typeof goodsGive==="function"){try{g=goodsGive(S,o.it,{from:"story",who:X.A?X.A.n:""})}catch(e){g=""}}
 return `${nm}: ${tr}.${g?` Ngươi nhận ${g}.`:""}`}
function j72cTwist(sd,X,x){const w=sd.twist;if(!w||!(x&&x.p&&x.p.tw))return"";const tier=sd.tier||"m";const g=j72cVal(w.gain,tier,1),l=j72cVal(w.loss,tier,-1);
 const fx=Object.assign({},g.fx);for(const k in l.fx)fx[k]=(fx[k]||0)+l.fx[k];q72Ap(fx);const r=g.r+l.r,rb=g.rb+l.rb;if(r)q72Rel(X.A,r);if(rb&&X.B)q72Rel(X.B,rb);
 const tk=q72Fx(fx).concat(r?[q72Tok(X.A,r)]:[]).concat(rb&&X.B?[q72Tok(X.B,rb)]:[]).map(plain).filter(Boolean);
 return `${q72Txt(j72cTxt(w.text,sd),X)}${tk.length?` (${tk.join(", ")})`:""}`}
function j72cPl(at){return at==="A"||at==="B"||at==="home"?at:(at||"")}
function j72cOdds(o){return o==null?100:BAL.j72c.odds[o]}
function j72cGo(st,tier){const k=BAL.j72c.khac[tier];const g=q72G(j72cPl(st.at)||"home",st.n,st.sk||"",j72cOdds(st.odds),k,{},J72C_FAIL[st.fail||"retry"]);return g}
function j72cOpt(o,tier){const g=j72cVal(o.gain,tier,1),l=j72cVal(o.loss,tier,-1);const pl=j72cPl(o.at);
 const op={c:l.fx,w:g.fx,r:g.r||0,rb:g.rb||0,cr:-l.r||0,crb:-l.rb||0,lto:o.fail==="end"?"fail":o.fail==="bad"?"bad":"stay",k:BAL.j72c.khac[tier]};
 if(o.odds!=null){op.p=j72cOdds(o.odds);op.sk=o.sk||""}
 if(pl)op.opl=pl/* where this option is done (q72Bot walks there) */;if(pl&&pl!=="home"){op.t=X=>S.place===q72StepPl({pl},X);op.tw=X=>`phải đến ${q72PlN(q72StepPl({pl},X))}`}
 else if(pl==="home"){op.t=()=>S.place==="home";op.tw="phải về tẩm cung"}
 return q72O(o.n,op)}
function j72cSteps(sd){const tier=sd.tier||"m";return (sd.steps||[]).map(st=>{
 if(st.t==="wait")return q72W(st.n,BAL.j72c.wait[tier]);
 if(st.t==="pick"){const c=q72C(st.n,...st.opts.map(o=>j72cOpt(o,tier)));if(st.at)c.pl=j72cPl(st.at);return c}
 return j72cGo(st,tier)})}
/* every {placeholder} must have a person (grounding): B only when the seed casts one */
function j72cTexts(sd){const T=[sd.title,sd.ask,sd.ok&&sd.ok.text,sd.no&&sd.no.text,sd.twist&&sd.twist.text];for(const st of sd.steps||[]){T.push(st.n);for(const o of st.opts||[])T.push(o.n)}
 const o=sd.object;if(o)T.push(o.name,o.clue,o.trace_ok,o.trace_no);return T.filter(Boolean)}
function j72cGround(sd,X){if(!X||!X.A)return false;for(const t of j72cTexts(sd)){if(/\{B\}/.test(t)&&!X.B)return false;if(/\{M\}/.test(t)&&!S.maid)return false}
 const o=sd.object;if(o&&o.owner==="B"&&!X.B)return false;return true}
function j72cNeeds(sd,X){const n=sd.needs||{};
 if(n.nights_min!=null&&(S.nights||0)<n.nights_min)return false;if(n.month&&n.month.length&&!n.month.includes(S.month))return false;
 if(n.not_confined&&S.confined)return false;if(n.kids_min!=null&&(S.kids||[]).filter(k=>k.alive).length<n.kids_min)return false;
 return j72cNeed(sd.req&&sd.req.need,X.A,X)&&(!sd.other||j72cNeed(sd.other.need,X.B,X))&&j72cGround(sd,X)}
/* review thin-p3 r1: a family letter (fam) and an adult child (ak) keep no thiện cảm (q72Rel does nothing for them), so a rel/relb step on
   them would be a gain of nothing / a cost of nothing (law 3). Such a step is ân tình (an) instead: same step count, a real number. */
const J72C_NOREL=new Set(["fam","ak"]);
function j72cNorm(sd){const ka=J72C_NOREL.has(((sd.req&&sd.req.kind)||"").split(":")[0]),kb=!!sd.other&&J72C_NOREL.has((sd.other.kind||"").split(":")[0]);if(!ka&&!kb)return sd;
 const m=o=>{if(!o)return o;const r={};for(const [k,n] of Object.entries(o)){const k2=(k==="rel"&&ka)||(k==="relb"&&kb)?"an":k;r[k2]=(r[k2]||0)+n}return r};
 const c=JSON.parse(JSON.stringify(sd));for(const p of ["ok","no","twist"])if(c[p]){if(c[p].gain)c[p].gain=m(c[p].gain);if(c[p].loss)c[p].loss=m(c[p].loss)}
 for(const st of c.steps||[])for(const o of st.opts||[]){o.gain=m(o.gain);o.loss=m(o.loss)}return c}
/* seed → T72 template */
/* review thin-p3 r1: a servant seed whose lines say «nô tỳ» is a maid's ask, «nô tài» a eunuch's: cast only that sex (real people, VANPHONG) */
function j72cSex(sd){const s=j72cTexts(sd).join(" ");return /nô tỳ/i.test(s)?"f":/nô tài/i.test(s)?"m":""}
function j72cSexOk(o,sx){return !sx||!o||(sx==="f")===(o.role==="maid")}
/* her grown child (req ak): a seed whose card or scene calls the child a son («con trai», «hoàng tử») or a daughter («con gái», «công chúa», «hoàng nữ») casts only that sex (real people; law 11: every ak seed) */
function j72cKidSex(sd){let s=j72cTexts(sd).join(" ");try{const sp=typeof dlgsGet==="function"?dlgsGet("j72:"+sd.id):null;if(sp)s+=" "+sp.lines.map(l=>l.text).join(" ")}catch(e){}const f=/con gái|công chúa|hoàng nữ/i.test(s),m=/con trai|hoàng tử/i.test(s);return f&&!m?"f":m&&!f?"m":""}
function j72cKidOk(o,sd){if(!o||((sd.req&&sd.req.kind)||"").split(":")[0]!=="ak")return true;const x=j72cKidSex(sd);return !x||o.sex===x}
function j72cReg(sd){if(!sd||!sd.id||T72I["c:"+sd.id])return null;sd=j72cNorm(sd);const tier=sd.tier||"m";let sp=j72cSpec(sd.req);if(!sp)return null;
 const sx=j72cSex(sd);if(sp==="sv"&&sx)sp=sx==="f"?"svm":"sve";
 const ok=j72cVal(sd.ok&&sd.ok.gain,tier,1),okl=j72cVal(sd.ok&&sd.ok.loss,tier,-1),no=j72cVal(sd.no&&sd.no.loss,tier,-1);
 const okfx=Object.assign({},ok.fx);for(const k in okl.fx)okfx[k]=(okfx[k]||0)+okl.fx[k];
 const o=sd.object;const xo=o?[`${j72cTxt(o.name,sd)}: ${j72cTxt(o.trace_ok,sd)}`]:null;
 const T={r:sp,rf:(v,a)=>j72cFit(v,sd.req)&&(sp!=="rsv"||j72cSexOk(v,sx))&&j72cKidOk(v,sd),t:j72cTxt(sd.title,sd),h:j72cTxt(sd.ask,sd),dl:BAL.j72c.dl[tier],s:j72cSteps(sd),
  ok:{fx:okfx,r:ok.r+okl.r,rb:ok.rb+okl.rb,x:xo,fn:(X,x)=>{const a=j72cTrace(sd,X,"ok"),b=j72cTwist(sd,X,x);return [a,b].filter(Boolean).join(" ")}},
  no:{fx:no.fx,r:no.r,rb:no.rb,fn:X=>j72cTrace(sd,X,"no")},
  okT:sd.ok&&sd.ok.text?j72cTxt(sd.ok.text,sd):"",noT:sd.no&&sd.no.text?j72cTxt(sd.no.text,sd):"",
  tr:o&&o.clue?j72cTxt(o.clue,sd):"",w:()=>BAL.j72c.on?BAL.j72c.share:0,hk:"j72:"+sd.kind+":"+sd.id,cs:sd.id,
  need:X=>j72cNeeds(sd,X),p:()=>({tw:sd.twist&&Math.random()<BAL.j72c.twist?1:0})};
 if(sd.steps.some(st=>st.fail==="bad"||(st.opts||[]).some(z=>z.fail==="bad")))T.bad={fx:no.fx,r:no.r,rb:no.rb,ev:(sp==="rv"||sp==="hh")?"A":undefined,fn:X=>j72cTrace(sd,X,"no")};
 if(sd.needs&&(sd.needs.rank_min!=null||sd.needs.rank_max!=null))T.rk=[sd.needs.rank_min!=null?sd.needs.rank_min:0,sd.needs.rank_max!=null?sd.needs.rank_max:99];
 if(sd.other){let sb=j72cSpec(sd.other);if(!sb)return null;if(sb==="sv"&&sx)sb=sx==="f"?"svm":"sve";T.b=sb;T.bf=(v,z,A)=>j72cFit(v,sd.other)&&(sb!=="rsv"||j72cSexOk(v,sx))}
 return T7("c:"+sd.id,sd.kind,T)}
(function(){try{const L=(typeof J72SEEDS!=="undefined"&&Array.isArray(J72SEEDS))?J72SEEDS:[];for(const sd of L)j72cReg(sd)}catch(e){console.error("j72c",e)}})();
/* test hooks: counts per kind of composed seeds */
window.j72cCount=function(){const by={};for(const T of T72)if(T.cs)by[T.kind]=(by[T.kind]||0)+1;return by};
