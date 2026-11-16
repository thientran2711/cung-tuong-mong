
/* ================= j72 VIỆC NHỜ: side quests. A real person comes to her (or she asks around) with a favour: 2–5 steps, branches, a deadline.
   Steps progress through what already exists: going to a place on the map (khắc), her stats/arts (odds on the ladder), bạc, waiting tuần.
   Outcomes are honest (hidden truths are fixed when the quest is made and only revealed as they are); consequences: relation, "nợ ân" ledger
   (who owes whom a favour, both ways: she can call a favour in, they can come to collect), rewards, risks (cấm túc, chứng cứ, can chính of j55).
   NPCs ask each other too (monthly). Cadence: ≤2 offers a month, ≤4 open quests; skips a tuần when evBusy()/storyBusy().
   Anti-repetition: a template once per life; templates seen in the last 5 lives are avoided (evHistSeen). Wraps only. ================= */
const Q72CFG={mo:2,max:4,p:.30,npc:.55,cdAsk:3,cdCall:4};
const T72=[],T72I={};
const KIND72={craft:"Tìm vật, làm đồ",social:"Giao thiệp",inv:"Tra xét",pro:"Che chở",love:"Giúp duyên",trade:"Đổi ơn",risk:"Việc liều",court:"Việc triều",fam:"Việc nhà"};
const G72=t=>`<span class="g">${t}</span>`,R72=t=>`<span class="r">${t}</span>`;
function q72(){if(!S)return null;const q=S.q72=S.q72||{};q.a=q.a||[];q.h=q.h||[];q.cd=q.cd||{};q.d=q.d||{};q.mo=q.mo||{};q.ch=q.ch||[];q.np=q.np||[];q.n=q.n||{ok:0,fail:0,bad:0,dec:0,acc:0,off:0};q.u=q.u||0;q.cc=q.cc||{};return q}
function q72On(){return !!(S&&!S.dead&&!S.out&&!(typeof isSrv==="function"&&isSrv()))}
function q72Off(){return !!window.__q72off}

/* ---------- people: base kinds through j68 (rv sv maid emp th doc eun ksp kid man) + hh off ak rsv fam fallen ---------- */
function q72Kid(nm){try{const e=allKids().find(([k])=>k.name===nm);return e?e:null}catch(x){return null}}
function q72A(k,id){try{
 if(k==="hh"){const v=RV(id);if(!v||!v.alive||!v.queen||v.out)return null;return{o:v,n:v.name,f:pv(v),k:"hh",id}}
 if(k==="rv"){const v=RV(id);if(!v||!v.alive||v.out)return null;return{o:v,n:v.name,f:pv(v),k:"rv",id}}
 if(k==="fallen"){const v=RV(id);if(!v||!v.alive||!v.out)return null;return{o:v,n:v.name,f:pv(v),k:"fallen",id}}
 if(k==="off"){if(typeof trS!=="function")return null;const T=trS();const h=T&&T.H&&T.H[id];if(!h)return null;return{o:h,n:`${TDOFF[id]} ${h.name}`,f:pMin(h),k:"off",id}}
 if(k==="ak"){const e=q72Kid(id);if(!e||!e[0].alive||(e[0].age||0)<18)return null;return{o:e[0],n:e[0].name,f:kidFace(e[0]),k:"ak",id,mom:e[1]}}
 if(k==="rsv"){const s=servById(id);if(!s)return null;const ow=ownerOf(s);if(!ow||ow===S||!ow.alive||ow.out)return null;return{o:s,n:s.name,f:pServ(s),k:"rsv",id,own:ow}}
 if(k==="sv"){const s=servById(id);if(!s||ownerOf(s)!==S)return null;return{o:s,n:s.name,f:pServ(s),k:"sv",id}}
 if(k==="fam"){const h=q72Dad();if(h)return{o:h,n:`Phụ thân ${h.name}`,f:pMin(h),k:"off",id:h.c,fam:1};if(!S.maid)return null;return{o:S.maid,n:`Thư nhà (do ${S.maid.name} mang vào)`,f:Object.assign(pMaid(),{rw:"Mang thư nhà"}),k:"fam",id:null}}
 const a=evActor(k,id);if(!a)return null;if(a.k==="eun"&&k==="ksp")a.k="ksp";return a}catch(x){return null}}
function q72Dad(){try{if(typeof trS!=="function")return null;const T=trS();for(const c in T.H)if(T.H[c].dadOf==="me")return T.H[c]}catch(x){}return null}
function q72Key(a){return a?(a.k==="fam"?"fam":["emp","th","doc","eun","ksp","maid"].includes(a.k)?a.k:a.k+":"+a.id):""}
/* requester picker: spec string "rv" | "rv+" friend | "rvk" gentle | "rva" ambitious | "rvp" pregnant | "rvc" confined | "hh" | "fallen" | "th" | "emp" | "maid"
   | "sv" | "svm" adult maid servant | "sve" eunuch servant | "doc" | "eun" | "ksp" | "man:<rw>" | "off" | "ak" | "akf" adult princess | "rsv" | "fam" */
function q72Pick(sp,not,ff){not=not||[];const nk0=a=>a&&!not.includes(q72Key(a));const nk=a=>{if(!nk0(a))return false;if(!ff)return true;const z=q72A(a.k==="rv"&&sp==="hh"?"hh":a.k,a.id);try{return !!(z&&ff(z.o,z))}catch(e){return false}};const wpick=(L,wf)=>{if(!L.length)return null;const w=L.map(x=>Math.max(.01,wf?wf(x):1));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<L.length-1){r-=w[i];i++}return L[i]};
 const tr=v=>{try{return traitsOf(v)}catch(x){return[v.trait]}};
 if(/^rv|^hh$|^fallen$/.test(sp)){let L=rivals.filter(v=>v.alive);
  if(sp==="fallen")L=L.filter(v=>v.out);else L=L.filter(v=>!v.out);
  if(sp==="hh")L=L.filter(v=>v.queen);else if(sp!=="fallen")L=L.filter(v=>!v.queen);
  if(sp!=="rvc"&&sp!=="fallen")L=L.filter(v=>!v.confined);
  if(sp==="rv+")L=L.filter(v=>aff(v,S)>=10);if(sp==="rvk")L=L.filter(v=>tr(v).some(t=>t==="Hiền lành"||t==="Nhu mì"));if(sp==="rva")L=L.filter(v=>tr(v).some(t=>t==="Tham vọng"||t==="Kiêu ngạo"));
  if(sp==="rvp")L=L.filter(v=>v.preg);if(sp==="rvc")L=L.filter(v=>v.confined);
  L=L.filter(v=>aff(v,S)>-30&&!(typeof sameHouse==="function"&&sameHouse(S,v)&&sp!=="rv"&&sp!=="rv+"));
  const v=wpick(L.filter(v=>nk({k:sp==="hh"?"hh":sp==="fallen"?"fallen":"rv",id:v.id})),v=>1+Math.max(0,aff(v,S))/15);return v?q72A(sp==="hh"?"hh":sp==="fallen"?"fallen":"rv",v.id):null}
 if(sp==="sv"||sp==="svm"||sp==="sve"){const L=(S.staff||[]).filter(s=>s&&s.sid!=null&&(s.age||18)>=18&&(sp==="sv"||(sp==="svm"?s.role==="maid":s.role!=="maid"))&&nk({k:"sv",id:s.sid}));const s=wpick(L,s=>1+(s.loyal||0)/30);return s?q72A("sv",s.sid):null}
 if(sp.indexOf("man:")===0){const rw=sp.slice(4);const L=(S.men||[]).filter(m=>m.alive!==false&&m.rw===rw&&nk({k:"man",id:m.id}));const m=wpick(L);return m?q72A("man",m.id):null}
 if(sp==="off"){if(typeof trS!=="function"||typeof CLANS==="undefined")return null;const T=trS();const L=CLANS.filter(c=>T.H[c]&&T.H[c].dadOf!=="me"&&nk({k:"off",id:c}));const c=wpick(L,c=>1+Math.max(0,(T.H[c].af[key(S)]||0))/10);return c?q72A("off",c):null}
 if(sp==="ak"||sp==="akf"){let L=[];try{L=allKids().filter(([k])=>k.alive&&(k.age||0)>=18&&(sp==="ak"||k.sex==="f")&&!k.hW&&nk({k:"ak",id:k.name}))}catch(x){}const e=wpick(L);return e?q72A("ak",e[0].name):null}
 if(sp==="rsv"){const L=[];for(const v of liveRivals(true)){if(v.confined)continue;for(const s of (v.staff||[]))if(s&&s.sid!=null&&(s.age||18)>=18&&nk({k:"rsv",id:s.sid}))L.push(s)}const s=wpick(L);return s?q72A("rsv",s.sid):null}
 if(sp==="fam"){const a=q72A("fam");return a&&nk0(a)&&(!ff||ff(a.o,a))?a:null}
 if(sp==="maid"){if(!S.maid||!nk({k:"maid"}))return null;return q72A("maid")}
 const a=q72A(sp);return a&&nk0(a)&&(!ff||(()=>{try{return ff(a.o,a)}catch(e){return false}})())?a:null}
/* where a person can be found: the place a step marked "A"/"B" means */
function q72Home(a){try{if(!a)return"home";const k=a.k;
 if(k==="rv"||k==="hh")return palaceOf(a.o);if(k==="fallen")return"lc";if(k==="th")return"tn";if(k==="eun")return"ksp";if(k==="emp"||k==="off")return"thu";if(k==="doc")return"tyv";if(k==="ksp")return"ksp";
 if(k==="man")return(a.o.haunts&&a.o.haunts[0])||"vuon";if(k==="ak")return"vuon";if(k==="rsv")return palaceOf(a.own);return"home"}catch(x){return"home"}}
function q72PlN(k){try{return k==="home"?"tẩm cung ngươi":placeOf(k).n}catch(x){return k}}
function q72Host(k,X){if(!X||!X.A)return false;if(q72Home(X.A)===k&&["th","hh","rv","emp","fallen","doc"].includes(X.A.k))return true;return X.T.s.some(st=>st.pass&&q72StepPl(st,X)===k)}
function q72PlOk(k,X){try{if(k==="home"||!k)return true;if(!places().some(p=>p.k===k))return false;if(q72Host(k,X))return true;if(typeof accessOf!=="function")return true;const a=accessOf(S,k);return a.ok||a.kind==="hour"||/sáng/.test(a.why||"")}catch(x){return true}}
function q72EmpNear(){try{if(S.where&&S.where.emp&&S.where.emp===S.place&&S.place!=="home")return true;return (S.nightLog||[]).some(w=>wk()-w<=1)}catch(e){return false}}
/* relation tokens and changes, coloured explicitly */
function q72Tok(a,n){if(!a||!n)return"";if(a.k==="hh")return (n>0?G72:R72)(`Hoàng hậu với ngươi ${n>0?"+":""}${n}`);
 if(a.k==="off")return (n>0?G72:R72)(`${a.o.name} thiện cảm với ngươi ${n>0?"+":""}${n}`);
 if(a.k==="fallen")return (n>0?G72:R72)(`${a.n} ${n>0?"thân":"mất thiện cảm"} ${n>0?"+":""}${n}`);
 if(a.k==="rsv")return (n>0?G72:R72)(`Lòng ${a.n} với ngươi ${n>0?"+":""}${n}`);
 if(a.k==="ak"||a.k==="fam")return"";if(a.k==="ksp")return evRelTok(Object.assign({},a,{k:"eun"}),n);return evRelTok(a,n)}
function q72Rel(a,n){if(!a||!n)return;try{if(a.k==="hh"){apply({hh:n});return}if(a.k==="off"){const h=a.o;h.af=h.af||{};h.af[key(S)]=cl((h.af[key(S)]||0)+n,-100,100);return}
 if(a.k==="fallen"){relAdd(S,a.o,n);return}if(a.k==="rsv"){const s=a.o;s.af=s.af||{};s.af[key(S)]=cl((s.af[key(S)]||0)+n,-100,100);return}if(a.k==="ak"||a.k==="fam")return;
 if(a.k==="ksp"){evRelDo(Object.assign({},a,{k:"eun"}),n);return}evRelDo(a,n)}catch(x){}}
/* the nợ ân ledger: >0 they owe her, <0 she owes them */
function q72Debt(a){const q=q72();return q.d[q72Key(a)]||0}
function q72DebtAdd(a,n){if(!a||!n)return;const q=q72(),k=q72Key(a);q.d[k]=(q.d[k]||0)+n;if(!q.d[k])delete q.d[k];q.dn=q.dn||{};q.dn[k]=a.n}
function q72DTok(a,n){if(!a||!n)return"";return n>0?G72(`${q72Short(a)} nợ ngươi một ân${n>1?` (×${n})`:""}`):R72(`ngươi nợ ${q72Short(a)} một ân`)}
function q72Short(a){return a.k==="fam"?"nhà ngươi":a.k==="emp"?"Hoàng thượng":a.k==="th"?"Thái hậu":a.n}
function q72Fx(o){try{return fx6(o)}catch(x){return[]}}
function q72Ap(o){if(!o)return;o=Object.assign({},o);if(o.an){S.an=cl((S.an||0)+o.an,0,100);delete o.an}apply(o)}

/* ---------- templates ---------- */
/* T7(id,kind,{r requester spec, b second person spec, t title, h intro (string|fn X), dl tuần, s steps, ok/no/bad outcomes, w ctx weight fn, fu follow-up only, p(X) hidden truth, need(X) extra check})
   steps: G(place,name,skill,base,khắc,cost,failMode) | W(name,tuần) | C(name,...options) ; place "A"/"B" = where that person is, "home", or a place key
   option O(name,{p,sk,c,w,l,r,lr,rb,lrb,d,to,lto,x,lx,t,fn,k}) ; to/lto: step index | "ok" | "fail" | "bad" | "stay"
   outcome {fx,r,rb,d,x,fn(X,q),ch:"follow-up id",pun:"why",ev:"A"|"B"} */
function T7(id,kind,o){o.id=id;o.kind=kind;T72.push(o);T72I[id]=o;return o}
function q72G(pl,n,sk,b,k,c,f,o){return Object.assign({pl,n,sk:sk||"",b:b==null?70:b,k:k==null?2:k,c:c||{},f:f||"r"},o||{})}
function q72W(n,w){return{n,w}}
function q72C(n,...ch){return{n,ch}}
function q72O(n,o){return Object.assign({n},o||{})}

/* skill bonus on the ladder: her real stats and arts */
const SK72={tai:"Tài",tamco:"Tâm cơ",sac:"Sắc",danh:"Danh",duc:"Đức",mat:"Tai mắt",sung:"Sủng",an:"Ân tình",thi:"Thi",cam:"Cầm",ky:"Kỳ",hoa:"Họa",vu:"Vũ",y:"Y thuật"};
function q72Sk(sk,X){if(!sk)return 0;const v=k=>S[k]||0;
 if(sk==="tai"||sk==="tamco")return (v(sk)-40)/2;if(sk==="sac"||sk==="danh"||sk==="duc"||sk==="sung")return (v(sk)-40)/3;if(sk==="mat")return v("mat")*4-12;if(sk==="an")return (v("an")-20)/3;
 if(sk==="rel"&&X&&X.A)return q72RelV(X.A)/3;if(sk==="relb"&&X&&X.B)return q72RelV(X.B)/3;
 const a=S.arts&&S.arts[sk];if(a!=null)return (a||0)*7-7;return 0}
function q72RelV(a){try{if(a.k==="rv"||a.k==="fallen")return aff(a.o,S);if(a.k==="hh")return S.hh||0;if(a.k==="th")return S.th||0;if(a.k==="emp")return (S.sung||0)-40;if(a.k==="sv"||a.k==="maid")return (a.o.loyal||50)-50;if(a.k==="off")return (a.o.af&&a.o.af[key(S)])||0;if(a.k==="man")return (a.o.af||0)*2}catch(x){}return 0}
function q72Odds(b,sk,X){return odA(S,b+q72Sk(sk,X))}

/* ---------- a live quest ---------- */
function q72X(x){const T=T72I[x.tid];if(!T)return null;const A=q72A(x.rk,x.ri);if(!A)return null;let B=null;if(x.bk){B=q72A(x.bk,x.bi);if(!B)return null}return{T,A,B,q:x,p:x.p||{}}}
function q72Txt(t,X){if(typeof t==="function"){try{t=t(X)}catch(e){t=""}}const sea=SEASON[S.month-1];
 return String(t||"").replace(/\{A\}/g,X.A?X.A.n:"").replace(/\{B\}/g,X.B?X.B.n:"").replace(/\{M\}/g,S.maid?S.maid.name:"cung nữ").replace(/\{S\}/g,sea.toLowerCase()).replace(/\{E\}/g,"Hoàng thượng").replace(/\{Nc\}/g,S.rank>=3?"Nương nương":"Tiểu chủ").replace(/\{N\}/g,S.rank>=3?"nương nương":"tiểu chủ")}
function q72StepPl(st,X){if(st&&st.plf){try{return st.plf(X)}catch(e){return null}}if(!st||!st.pl)return null;if(st.pl==="A")return q72Home(X.A);if(st.pl==="B")return q72Home(X.B);return st.pl}
function q72Title(X){return q72Txt(X.T.t,X)}
/* tokens of an outcome (for offer lines and the list) */
function q72OutTok(o,X,which){if(!o)return[];const t=q72Fx(o.fx);if(o.r)t.push(q72Tok(X.A,o.r));if(o.rb&&X.B)t.push(q72Tok(X.B,o.rb));
 const d=o.d==null?(which==="ok"?1:0):o.d;if(d)t.push(q72DTok(X.A,d));if(o.x)t.push(...[].concat(q72Txt(o.x,X)).map(s=>which==="ok"?G72(s):R72(s)));
 if(o.pun)t.push(R72("bị cấm túc 1–3 tháng"));if(o.ev){const E=o.ev==="B"?X.B:X.A;if(E)t.push(R72(`${E.n} nắm Chứng cứ về ngươi +1`))}if(o.cc&&typeof ccLine==="function")t.push(R72(ccLine(S)));return t.filter(Boolean)}
function q72OkDef(X){return X.T.ok||{}}
function q72NoDef(X){const n=X.T.no||{};return Object.assign({r:-6},n)}
/* rough chance of finishing (only rolled steps that can end it), for the ladder word on the offer */
function q72Est(X){let p=1;for(const st of X.T.s){if(st.ch){const os=st.ch.filter(o=>o.p!=null);if(os.length===st.ch.length){p*=Math.max(...os.map(o=>q72Odds(o.p,o.sk,X)))/100}}else if(!st.w){const o=q72Odds(st.b,st.sk,X)/100;p*=st.f==="r"?Math.min(1,o+.35):o}}return Math.round(p*100)}
function q72Steps(X){return X.T.s.map((st,i)=>{const pl=q72StepPl(st,X);return `${i+1}. ${q72Txt(st.n,X)}${st.w?` (đợi ${st.w} tuần)`:pl?` · tại ${q72PlN(pl)}`:st.emp?" · lúc ở cạnh Hoàng thượng":""}${st.sk&&!st.w?` · cần ${SK72[st.sk]||"quen biết"}`:""}`}).join("<br>")}

/* ---------- candidates ---------- */
function q72Ctx(){return{sea:SEASON[S.month-1],m:S.month,rank:S.rank,place:S.place,or:S.origin&&S.origin.k,bac:S.bac,sung:S.sung,kids:(S.kids||[]).length,fest:(()=>{try{return festToday()}catch(e){return null}})()}}
function q72Make(T,rq,place){const q=q72();let A=rq||null;const not=[];
 if(!A){A=q72Pick(T.r,[],T.rf);if(!A)return null}else if(T.rf){try{if(!T.rf(A.o,A))return null}catch(e){return null}}
 if(place&&q72Home(A)!==place)return null;
 let B=null;if(T.b){B=q72Pick(T.b,[q72Key(A)],T.bf?((o,z)=>T.bf(o,z,A)):null);if(!B)return null;if(B.k===A.k&&B.id===A.id)return null}
 const x={u:++q.u,tid:T.id,rk:A.k==="ksp"?"ksp":A.fam?"fam":A.k,ri:A.id,bk:B?(B.k==="ksp"?"ksp":B.k):null,bi:B?B.id:null,st:0,t0:wk(),dl:wk()+(T.dl||6),p:{},log:[]};
 if(A.fam){x.rk="fam";x.ri=null}
 const X=q72X(x);if(!X)return null;if(T.need){try{if(!T.need(X))return null}catch(e){return null}}
 if(T.p){try{x.p=T.p(X)||{};X.p=x.p}catch(e){return null}if(x.p===false)return null}
 for(const st of T.s){const pl=q72StepPl(st,X);if(pl&&!q72PlOk(pl,X))return null}
 return x}
function q72Cands(place){const q=q72(),C=q72Ctx(),out=[];const act=new Set(q.a.map(x=>x.tid));
 for(const T of T72){if(T.fu||act.has(T.id))continue;if(q.cd[T.id]!=null)continue;let w=1;try{w=T.w?T.w(C):1}catch(e){w=0}if(!(w>0))continue;
  if(T.or&&!T.or.includes(C.or))continue;if(T.rk&&(S.rank<T.rk[0]||S.rank>T.rk[1]))continue;if(T.sea&&!T.sea.includes(C.sea))continue;
  const seen=evHistSeen("j72:"+T.id);w*=Math.pow(.12,seen);out.push([T,w,seen])}
 const fresh=out.filter(z=>!z[2]);return fresh.length>=3?fresh:out}
function q72Choose(L,place,rq){L=L.slice();for(let t=0;t<30&&L.length;t++){const tot=L.reduce((a,z)=>a+z[1],0);let r=Math.random()*tot,i=0;while(i<L.length-1&&r>L[i][1]){r-=L[i][1];i++}const T=L[i][0];L.splice(i,1);const x=q72Make(T,rq,place);if(x)return x}return null}

/* ---------- the offer (a person comes to her, or she asked around) ---------- */
function q72Offer(x,how){const q=q72();q.mo[S.turn]=(q.mo[S.turn]||0)+1;q.n.off++;q.cd[x.tid]=wk();evHistMark("j72:"+x.tid);const d=mkP("q72o",{x,how:how||""});if(!d)return false;
 Q.push({t:"Việc nhờ",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp});return true}
PEND.q72o=pp=>{try{const x=pp.x;const X=q72X(x);if(!X)return null;const T=X.T;const ok=q72OutTok(q72OkDef(X),X,"ok"),no=q72OutTok(q72NoDef(X),X,"no"),bad=T.bad?q72OutTok(T.bad,X,"bad"):[];
  const owe=q72Debt(X.A)<0;const dec=Math.min(-2,-(T.dec||3)*(owe?2:1));const est=q72Est(X);
  const pre=pp.how==="ask"?`<p class="past">Ngươi hỏi han, ${X.A.n} ngỏ lời.</p>`:pp.how==="fu"?`<p class="past">Lại là ${X.A.n}: chuyện lần trước còn tiếp.</p>`:"";
  const tr=T.tr?`<p class="past">${q72Txt(T.tr,X)}</p>`:"";
  const h=`${pre}<p>${q72Txt(T.h,X)}</p>${tr}<p class="past"><b>${KIND72[T.kind]}</b> · hạn ${T.dl||6} tuần · ${T.s.length} bước:<br>${q72Steps(X)}</p>${owe?`<p class="r">Ngươi đang nợ ${q72Short(X.A)} một ân: từ chối lần này mếch lòng gấp đôi.</p>`:""}`;
  const accX=`${est>=95?"":word(est)+" · "}thành: ${ok.join(", ")||"êm chuyện"} · hỏng: ${no.join(", ")}${bad.length?` · kèm: nếu bại lộ: ${bad.join(", ")}`:""}`;
  const decX=`tốn: ${[q72Tok(X.A,dec)||R72(`${X.A.n} phật ý`)].concat(owe?[R72("nợ ân vẫn còn")]:[]).join(", ")}`;
  const o=[{n:"Nhận lời",fx:{},x:accX,go:()=>{const q=q72();if(q.a.length>=Q72CFG.max){log("Ngươi đang bận quá nhiều việc, đành khất.");return}x.t0=wk();x.dl=wk()+(T.dl||6);q.a.push(x);q.n.acc++;if(T.acc)try{T.acc(X)}catch(e){}q72Enter(x,X);log(`Ngươi nhận lời ${X.A.n}: ${q72Title(X)}. Hạn ${T.dl||6} tuần. ${T.acc?q72Txt(T.accX||"",X):""}`)}},
   {n:"Khéo từ chối",fx:{},x:decX,go:()=>{const q=q72();q.n.dec++;q72Rel(X.A,dec);log(`Ngươi khéo khước từ ${X.A.n} (${q72Title(X)}). ${plain(q72Tok(X.A,dec))}.`)}}];
  return{who:X.A.f,t:h,o}}catch(e){console.error(e);return null}};
function q72Enter(x,X){const st=X.T.s[x.st];if(st&&st.w)x.wt=wk()+st.w}

/* ---------- progress ---------- */
function q72Go(x,X,to,txt){if(txt)x.log.push(txt);if(to==="stay")return;if(to==="ok"||to==="fail"||to==="bad")return q72End(x,to,X);const n=to==null?x.st+1:to;if(n>=X.T.s.length)return q72End(x,"ok",X);x.st=n;q72Enter(x,X)}
function q72End(x,res,X,late){const q=q72();const i=q.a.indexOf(x);if(i>=0)q.a.splice(i,1);X=X||q72X(x);
 if(!X){q.h.unshift({tid:x.tid,res:"gone",w:wk(),t:T72I[x.tid]?T72I[x.tid].t:"",n:""});q.h.length=Math.min(q.h.length,12);return""}
 const T=X.T;const o=res==="ok"?q72OkDef(X):res==="bad"?(T.bad||q72NoDef(X)):q72NoDef(X);let ev="";
 q72Ap(o.fx);if(o.r)q72Rel(X.A,o.r);if(o.rb&&X.B)q72Rel(X.B,o.rb);const d=o.d==null?(res==="ok"?1:0):o.d;if(d)q72DebtAdd(X.A,d);
 if(o.fn){try{ev+=o.fn(X,x)||""}catch(e){console.error(e)}}
 if(o.pun){try{punish(S,q72Txt(o.pun,X),1)}catch(e){}}
 if(o.ev){const E=o.ev==="B"?X.B:X.A;if(E&&(E.k==="rv"||E.k==="hh"))evA(E.o,S,1)}
 if(o.cc&&typeof ccStep==="function"){try{ev+=ccStep(S)||""}catch(e){}}
 if(res==="ok"&&o.ch&&T72I[o.ch])q.ch.push({tid:o.ch,at:wk()+4+R(5),rk:x.rk,ri:x.ri,bk:x.bk,bi:x.bi,p:x.p});
 q.n[res]=(q.n[res]||0)+1;
 const tok=q72OutTok(o,X,res==="ok"?"ok":"no").map(plain).join(", ");
 const head=res==="ok"?`Xong việc ${X.A.n} nhờ (${q72Title(X)})`:res==="bad"?`<span class="r">Bại lộ:</span> việc ${X.A.n} nhờ (${q72Title(X)})`:`<span class="r">${late?"Lỡ hẹn":"Không thành"}:</span> việc ${X.A.n} nhờ (${q72Title(X)})`;
 const end=q72Txt(res==="ok"?T.okT:res==="bad"?T.badT:T.noT,X);
 log(`${head}. ${end?end+" ":""}${tok?tok+".":""} ${ev}`.trim());
 q.h.unshift({tid:x.tid,res,w:wk(),t:q72Title(X),n:X.A.n,pn:q72PgN(X.A),f:X.A.f,lg:x.log.slice(-4),end,tok});if(q.h.length>12)q.h.length=12;
 if(late&&!window.__bot&&!quiet)Q.push({t:"Lỡ hẹn",btn:"Đã hiểu",who:X.A.f,h:`<p>Đã quá hạn việc ${X.A.n} nhờ: <b>${q72Title(X)}</b>.</p>${end?`<p>${end}</p>`:""}<p>${q72OutTok(o,X,"no").join(" · ")||"Không mất gì."}</p>`});
 return ev}
/* one step act from the list: do-step (place, khắc, odds) or a branch option */
function q72Why(x,X,st,o){if(S.dead)return"đã hết kiếp";if(Q.length)return"đang có việc chờ";if(S.out)return"đang ở lãnh cung";
 const pl=q72StepPl(st,X);const k=o?(o.k==null?1:o.k):st.k;const c=o?o.c:st.c;
 if(pl&&S.place!==pl&&!(pl==="home"&&S.place==="home"))return `phải đến ${q72PlN(pl)} trước`;
 if(st.bu!=null&&(S.buoi||0)!==st.bu)return `chỉ làm được ${BUOI[st.bu].toLowerCase()}`;
 if(st.emp&&!q72EmpNear())return "chỉ khi ở cạnh Hoàng thượng (gặp ngài trên bản đồ, hoặc vừa thị tẩm tuần này)";
 if(!can(k))return used+k>4?"hết khắc":"Sức dưới 20, cần nghỉ";if(c&&c.bac&&S.bac+c.bac<0)return `thiếu bạc (cần ${-c.bac})`;if(c&&c.suc&&S.suc+c.suc<5)return"Sức quá yếu";
 if(o&&o.t){try{if(!o.t(X))return q72Txt(o.tw||"không làm được",X)}catch(e){return"không làm được"}}return""}
function q72Line(x,X,st,o){const s=o||st;const k=o?(o.k==null?1:o.k):st.k;const rolled=s.p!=null||(!o&&s.b<100);const od=rolled?q72Odds(o?o.p:st.b,s.sk,X):100;
 const cost=q72Fx(s.c).map(t=>t);cost.unshift(`${k} khắc`);
 const w=q72Fx(s.w);if(s.r)w.push(q72Tok(X.A,s.r));if(s.rb&&X.B)w.push(q72Tok(X.B,s.rb));if(s.x)w.push(G72(q72Txt(s.x,X)));
 const nxt=o?(o.to==="ok"||(o.to==null&&x.st===X.T.s.length-1)?"xong việc":o.to==="fail"?"bỏ dở việc":"sang bước sau"):(x.st===X.T.s.length-1?"xong việc":"sang bước sau");w.push(G72(nxt));
 const l=q72Fx(s.l);if(s.lr)l.push(q72Tok(X.A,s.lr));if(s.lrb&&X.B)l.push(q72Tok(X.B,s.lrb));if(s.lx)l.push(R72(q72Txt(s.lx,X)));
 const fm=o?(o.lto||"fail"):st.f;l.push(R72(fm==="r"||fm==="stay"?"mất công, làm lại sau":fm==="b"||fm==="bad"?"bại lộ (xem phần kèm)":"việc hỏng"));
 const bad=(fm==="b"||fm==="bad")&&X.T.bad?q72OutTok(X.T.bad,X,"bad"):[];
 return `${od<100?word(od)+" · ":""}tốn: ${cost.join(", ")} · thành: ${w.join(", ")}${od<100?` · hỏng: ${l.join(", ")}`:""}${bad.length?` · kèm: bại lộ thì ${bad.join(", ")}`:""}`}
function q72Do(u,oi){const q=q72();const x=q.a.find(z=>z.u===u);if(!x)return;const X=q72X(x);if(!X){q72End(x,"gone");render();return}
 const st=X.T.s[x.st];if(!st||st.w)return;const o=st.ch?st.ch[oi]:null;if(st.ch&&!o)return;if(q72Why(x,X,st,o))return;
 const b=rsnap();const s=o||st;const k=o?(o.k==null?1:o.k):st.k;spend(k);q72Ap(s.c);const rolled=o?o.p!=null:st.b<100;const od=rolled?q72Odds(o?o.p:st.b,s.sk,X):100;const ok=!rolled||roll(od);
 const nm=q72Txt(s.n,X);let txt="";
 if(ok){q72Ap(s.w);if(s.r)q72Rel(X.A,s.r);if(s.rb&&X.B)q72Rel(X.B,s.rb);let e="";if(s.fn)try{e=s.fn(X,x,true)||""}catch(er){console.error(er)}txt=`${nm}: ${q72Txt(s.ok||"được việc",X)}. ${e}`.trim();log(`${q72Title(X)} · ${txt}`);q72Go(x,X,o?o.to:null,txt)}
 else{q72Ap(s.l);if(s.lr)q72Rel(X.A,s.lr);if(s.lrb&&X.B)q72Rel(X.B,s.lrb);let e="";if(s.fn)try{e=s.fn(X,x,false)||""}catch(er){}const fm=o?(o.lto||"fail"):st.f;txt=`${nm}: không thành, ${q72Txt(s.no||(fm==="r"?"phải làm lại":"hỏng việc"),X)}. ${e}`.trim();log(`${q72Title(X)} · ${txt}`);
  q72Go(x,X,fm==="r"?"stay":fm==="e"?"fail":fm==="b"?"bad":fm,txt)}
 resultShow(`${q72Title(X)}: ${nm}`,b,ok);render()}
function q72Drop(u){const q=q72();const x=q.a.find(z=>z.u===u);if(!x||Q.length)return;const b=rsnap();const X=q72X(x);q72End(x,"fail",X);resultShow("Bỏ việc",b,false);render()}

/* ---------- she calls a favour in (two-way: they owe her) ---------- */
function q72CallFx(a){const k=a.k;if(k==="emp")return{fx:{sung:3,an:2},t:"Hoàng thượng nhớ ơn, ghé cung ngươi"};if(k==="th")return{fx:{danh:3,duc:2},t:"Thái hậu khen ngươi trước mặt các phi tần"};
 if(k==="hh")return{fx:{danh:3},rel:6,t:"Hoàng hậu cất nhắc ngươi trong buổi thỉnh an"};if(k==="rv")return{fx:{danh:2,sung:2},t:`${a.n} nói tốt cho ngươi trước Hoàng thượng`};
 if(k==="doc")return{fx:{},gi:"yensao",t:"thái y gửi một hộp yến sào bồi bổ"};if(k==="eun"||k==="ksp"||k==="sv"||k==="maid"||k==="rsv")return{fx:{mat:1},t:`${a.n} báo cho ngươi những tin nghe được`};
 if(k==="man")return a.o.rw==="sứ thần"?{fx:{bac:40},t:"sứ thần biếu ngươi 40 lạng bạc"}:a.o.rw==="thái y"?{fx:{},gi:"yensao",t:"thái y gửi yến sào bồi bổ cho ngươi"}:{fx:{mat:1},t:`${a.n} kể ngươi nghe chuyện ngoài cung`};
 if(k==="off")return{fx:{danh:2},rel:10,t:`${a.o.name} nói tốt cho ngươi ở triều`};if(k==="ak")return{fx:{danh:3},t:`${a.n} khen ngươi trước phụ hoàng`};if(k==="fam")return{fx:{bac:40},t:"nhà gửi bạc vào cho ngươi"};if(k==="fallen")return{fx:{mat:1},t:`${a.n} kể ngươi nghe những chuyện cũ trong cung`};return{fx:{danh:1},t:"người ấy giúp ngươi một việc nhỏ"}}
function q72Debtors(){const q=q72();const L=[];for(const k in q.d){if(q.d[k]<=0)continue;const [kind,...r]=k.split(":");const id=r.join(":");const a=q72A(kind==="fam"?"fam":kind,kind==="rv"||kind==="hh"||kind==="fallen"||kind==="sv"||kind==="rsv"?+id:id||undefined);if(a)L.push([a,q.d[k],k])}return L}
function q72Call(k){const q=q72();if(Q.length||!can(1))return;const e=q72Debtors().find(z=>z[2]===k);if(!e)return;const [a]=e;if(!evCooldown("q72call:"+k,Q72CFG.cdCall))return;
 const b=rsnap();spend(1);const r=q72CallFx(a);q72Ap(r.fx);if(r.gi&&typeof goodsGive==="function")goodsGive(S,r.gi,{from:"story",who:a.n});if(r.rel)q72Rel(a,r.rel);q.d[k]--;if(!q.d[k])delete q.d[k];log(`Ngươi nhờ ${a.n} trả ân: ${r.t}. ${q72Fx(r.fx).map(plain).join(", ")}${r.rel?", "+plain(q72Tok(a,r.rel)):""}. Nợ ân của ${q72Short(a)} với ngươi -1.`);resultShow(`Nhờ ${q72Short(a)} trả ân`,b,true);render()}
/* she asks around at the place she stands: someone here may need help */
function q72Ask(){const q=q72();if(Q.length||!can(1)||!q72On())return;if(evCooldownLeft("q72ask",Q72CFG.cdAsk)>0)return;evCooldown("q72ask",Q72CFG.cdAsk);
 const b=rsnap();spend(1);let x=null;if(q72CanOffer(true))x=q72Choose(q72Cands(S.place),S.place);
 if(x){log(`Ngươi hỏi han ở ${q72PlN(S.place)}: có người ngỏ lời nhờ.`);q72Offer(x,"ask");showModal()}else{log(`Ngươi hỏi han ở ${q72PlN(S.place)}, không ai có việc nhờ lúc này.`);resultShow("Hỏi han",b,false)}render()}
function q72CanOffer(ask){const q=q72();if(!q72On()||q72Off())return false;if(q.a.length>=Q72CFG.max)return false;if((q.mo[S.turn]||0)>=Q72CFG.mo)return false;return true}

/* ---------- NPCs ask each other (and the great ladies ask them) ---------- */
const NPCQ72=["chép hộ một quyển kinh","thêu hộ đôi gối","dò hộ một tin","mượn bạc lúc túng","nói đỡ một câu trước Thái hậu","giữ hộ một hộp thư","mời thái y xem mạch kín","dạy một khúc đàn","đưa thư về nhà mẹ đẻ","che giấu một lỗi nhỏ của cung nữ"];
const MN72=["giêng","hai","ba","tư","năm","sáu","bảy","tám","chín","mười","mười một","chạp"],YN72=["","nhất","hai","ba","tư","năm","sáu","bảy","tám","chín","mười"];
function q72Date(){try{if(window.VP&&typeof VP.date==="function")return VP.date(S.month,S.year,S.tuan)}catch(e){}return `Tháng ${MN72[S.month-1]} · năm thứ ${YN72[S.year]||S.year}`}
function q72Npc(){const q=q72();if(!q72On())return"";const L=liveRivals(true).filter(v=>!v.confined);if(L.length<2)return"";let ev="";
 for(let t=0;t<2;t++){if(!roll(Q72CFG.npc*100))continue;const a=pick(L);const others=L.filter(v=>v!==a);
  const w=others.map(v=>Math.max(.1,10+aff(a,v)));let r=Math.random()*w.reduce((x,y)=>x+y),i=0;while(r>w[i]&&i<others.length-1){r-=w[i];i++}const b=others[i];
  const tr=(()=>{try{return traitsOf(b)}catch(e){return[b.trait]}})();const p=cl(40+aff(b,a)/2+(tr.includes("Hiền lành")?20:0)+(tr.includes("Nhu mì")?10:0)-(tr.includes("Kiêu ngạo")?15:0)-(tr.includes("Hiểm độc")?10:0),5,95);
  const what=pick(NPCQ72);const ok=roll(p);relAdd(a,b,ok?6:-4);const k=[a.id,b.id].join(">");q.nd=q.nd||{};if(ok)q.nd[k]=(q.nd[k]||0)+1;
  const txt=ok?`${a.name} nhờ ${b.name} ${what}; ${b.name} giúp, hai người thân hơn.`:`${a.name} nhờ ${b.name} ${what}; ${b.name} từ chối, hai người sinh hiềm khích.`;
  q.np.unshift({w:q72Date(),t:txt,a:a.id,b:b.id});if(q.np.length>8)q.np.length=8;try{const s=seenNPC(b,a,txt+" ");if(s)ev+=s}catch(e){}}
 /* Thái hậu / Hoàng hậu give errands to consorts too: the same favour for anyone who does it */
 if(roll(35)){const v=pick(L.filter(x=>!x.queen));if(v){const byTh=!S.thDead&&roll(60);const p=cl(45+(v.tai||40)/4,5,95);const ok=roll(p);
  if(byTh){ap(v,{th:ok?3:-2})}else{const qn=queenP();if(qn&&qn!==S&&qn!==v)relAdd(qn,v,ok?5:-3)}
  const txt=`${byTh?"Thái hậu":"Hoàng hậu"} nhờ ${v.name} ${pick(["chép kinh","thêu bình phong","lo việc yến","thăm người ốm"])}; ${ok?"nàng làm chu đáo, được khen":"nàng làm hỏng, bị chê"}.`;q.np.unshift({w:q72Date(),t:txt,a:v.id});if(q.np.length>8)q.np.length=8;
  if(roll(30+S.mat*5))ev+=txt+" "}}
 return ev}
/* monthly: those she owes may come to collect (two-way) */
function q72Collect(){const q=q72();for(const k in q.d){if(q.d[k]>=0)continue;if(!roll(25))continue;const [kind,...r]=k.split(":");const id=r.join(":");const a=q72A(kind,kind==="rv"||kind==="hh"||kind==="fallen"||kind==="sv"||kind==="rsv"?+id:id||undefined);if(!a)continue;
  const L=q72Cands().filter(z=>{const sp=z[0].r;return (a.k==="rv"&&/^rv/.test(sp))||sp===a.k||(a.k==="man"&&sp==="man:"+a.o.rw)||(a.k==="off"&&sp==="off")||(a.k==="sv"&&/^sv/.test(sp))});const x=q72Choose(L,null,a);if(x){x.collect=1;return x}}return null}

/* ---------- the tuần tick ---------- */
function q72Tick(){const q=q72();if(!q)return;
 for(const x of q.a.slice()){const X=q72X(x);if(!X){q72End(x,"gone");log(`Việc nhờ "${T72I[x.tid]?plain(T72I[x.tid].t).replace(/\{[AB]\}/g,"người ấy"):""}" dừng lại: người nhờ không còn ở đây.`);continue}
  const st=X.T.s[x.st];if(st&&st.w&&x.wt!=null&&wk()>=x.wt){x.wt=null;const t=`${q72Txt(st.n,X)}: xong.`;log(`${q72Title(X)} · ${t}`);q72Go(x,X,null,t);if(!q.a.includes(x))continue}
  if(wk()>x.dl)q72End(x,"fail",X,true)}
 if(S.tuan===0&&q.npcT!==S.turn){q.npcT=S.turn;const e=q72Npc();if(e)log(e)}
 if(Q.length>3||!q72CanOffer())return;if(evBusy())return;
 /* due follow-ups first */
 const now=wk();const f=q.ch.find(c=>c.at<=now);if(f){q.ch.splice(q.ch.indexOf(f),1);const T=T72I[f.tid];const A=q72A(f.rk,f.ri);if(T&&A){const x=q72Make(T,A);if(x){if(f.p)x.p=Object.assign({},f.p,x.p);q72Offer(x,"fu");evBusyMark();return}}}
 if(!roll(Q72CFG.p*100))return;
 let x=null;if(S.tuan===1&&roll(40))x=q72Collect();if(!x)x=q72Choose(q72Cands());if(x){q72Offer(x,x.collect?"collect":"");evBusyMark()}}
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(q72On()&&!q72Off()&&w0!=null&&wk()!==w0){q72Tick();if(Q.length&&$("modal").hidden)showModal()}}catch(x){console.error(x)}return r}})();

/* ---------- the Việc nhờ tab (kit only: .ph header, pbtn, pager + pcard, chips, pcrow rows, logs) ---------- */
(function(){const t=$("tabs");if(!t||t.querySelector('[data-tab="q72"]'))return;const b=document.createElement("button");b.dataset.tab="q72";b.dataset.s="Nhờ";b.setAttribute("role","tab");b.setAttribute("aria-selected","false");b.textContent="Việc nhờ";t.insertBefore(b,t.querySelector('[data-tab="log"]'));
})();
function q72Pass(k){try{const q=q72();for(const x of q.a){const X=q72X(x);if(X&&q72Host(k,X)&&X.T.s.some(st=>q72StepPl(st,X)===k)){accGrant(S,k);return true}}}catch(e){}return false}
function q72PgN(a){return a.k==="emp"?"Bệ hạ":a.k==="th"?"Thái hậu":a.k==="fam"?"Thư nhà":a.k==="off"?a.o.name.split(" ").slice(-2).join(" "):shortN(a.n)}
function q72Role(a){return a.f&&a.f.rw?a.f.rw:a.k==="emp"?"Hoàng thượng":a.k==="th"?"Thái hậu":""}
function q72Card(x){const X=q72X(x);if(!X)return`<p class="past">Người nhờ không còn ở đây.</p>`;const T=X.T,st=T.s[x.st];const left=Math.max(0,x.dl-wk());
 const ok=q72OutTok(q72OkDef(X),X,"ok"),no=q72OutTok(q72NoDef(X),X,"no"),bad=T.bad?q72OutTok(T.bad,X,"bad"):[];
 let B=[];const pl=q72StepPl(st,X);
 if(st.w)B.push([q72Txt(st.n,X),`còn ${Math.max(0,(x.wt||wk())-wk())} tuần`,"t"]);
 else{if(pl&&S.place!==pl&&!S.out){const tc=pl==="home"?0:travel(S.place,pl);const why=S.confined&&pl!=="home"?`đang cấm túc`:Q.length?"đang có việc chờ":pl!=="home"&&!can(tc+1)?"hết khắc":typeof accessOf==="function"&&pl!=="home"&&!q72Host(pl,X)&&!accessOf(S,pl).ok?accessOf(S,pl).why:"";
   B.push(pbtn(`data-q72g="${pl}"`,`Đến ${q72PlN(pl)}`,`tốn: ${tc} khắc đi đường · thành: tới nơi làm bước này`,why))}
  if(st.ch)st.ch.forEach((o,i)=>B.push(pbtn(`data-q72d="${x.u}" data-q72o="${i}"`,q72Txt(o.n,X),q72Line(x,X,st,o),q72Why(x,X,st,o))));
  else B.push(pbtn(`data-q72d="${x.u}"`,q72Txt(st.n,X),q72Line(x,X,st,null),q72Why(x,X,st,null)))}
 const rows=T.s.map((s,i)=>{const p=q72StepPl(s,X);return [`${i<x.st?"✓":i===x.st?"▸":"·"} ${q72Txt(s.n,X)}`,s.w?`đợi ${s.w} tuần`:p?q72PlN(p):s.emp?"cạnh Hoàng thượng":"tùy chọn",i===x.st?"t":"n"]});
 const lg=x.log.slice(-3).map(t=>`<div class="pcrow"><span>${t}</span></div>`);
 const drop=pbtn(`data-q72x="${x.u}"`,"Bỏ việc này",`tốn: ${no.join(", ")||"không"}`,Q.length?"đang có việc chờ":"");
 const dt=q72Debt(X.A);
 return pcard({f:X.A.f,name:X.A.n,rank:q72Role(X.A),tabKey:"q72",col:X.A.f.col,
  lines:[`<b>${q72Title(X)}</b>`,`${KIND72[T.kind]} · bước ${x.st+1}/${T.s.length} · còn <b class="${left<=1?"r":""}">${left} tuần</b>`,X.B?`Liên quan: ${mdH(X.B.f,"xs")} ${X.B.n}`:"",dt?(dt>0?`<span class="g">${q72Short(X.A)} đang nợ ngươi ${dt} ân</span>`:`<span class="r">Ngươi đang nợ ${q72Short(X.A)} ${-dt} ân</span>`):""],
  chips:[chip(`Thành: ${ok.map(plain).join(", ")||"êm chuyện"}`,"ok"),chip(`Hỏng/lỡ hẹn: ${no.map(plain).join(", ")}`,"hot"),bad.length?chip(`Bại lộ: ${bad.map(plain).join(", ")}`,"hot"):""],
  groups:[["Bước này",B],["Các bước",rows.concat(lg)],["Bỏ việc",[drop]]]})}
function q72HCard(h){const f=h.f||{ini:"?",col:KIT_ROLE.slate};const seal=h.res==="ok"?`<span class="g">Xong</span>`:h.res==="bad"?`<span class="r">Bại lộ</span>`:h.res==="gone"?"Dừng giữa chừng":`<span class="r">Không thành</span>`;
 return pcard({f,name:h.n||"",rank:f.rw||"",tabKey:"q72h",lines:[`<b>${h.t}</b>`,seal,h.end||"",h.tok?`Kết quả: ${h.tok}`:""],groups:[["Đã làm",(h.lg||[]).map(t=>`<div class="pcrow"><span>${t}</span></div>`)]],empty:"Không còn việc gì cần làm."})}
function q72HTML(){const q=q72();const mo=q.mo[S.turn]||0;
 let h=`<div class="ph"><span>Việc nhờ đang làm <b>${q.a.length}/${Q72CFG.max}</b> · lời nhờ tháng này ${mo}/${Q72CFG.mo}</span><span>Xong ${q.n.ok||0} · hỏng ${(q.n.fail||0)+(q.n.bad||0)} · từ chối ${q.n.dec||0}</span></div>`;
 const left=evCooldownLeft("q72ask",Q72CFG.cdAsk);const aw=S.dead?"đã hết kiếp":S.out?"đang ở lãnh cung":Q.length?"đang có việc chờ":left>0?`mới hỏi han, đợi ${left} tuần`:!can(1)?"hết khắc":q.a.length>=Q72CFG.max?`đang làm đủ ${Q72CFG.max} việc`:mo>=Q72CFG.mo?`tháng này đã có ${Q72CFG.mo} lời nhờ`:"";
 h+=`<div class="rbtn">`+pbtn(`data-q72a="ask"`,`Hỏi han ở ${q72PlN(S.place)}: ai cần giúp?`,`tốn: 1 khắc · thành: người ở đây có việc thì ngỏ lời nhờ, ngươi nhận hay từ chối tùy ý`,aw)+`</div>`;
 const items=q.a.map((x,i)=>{const X=q72X(x);return{f:X?X.A.f:{ini:"?",col:"#888"},name:X?q72PgN(X.A):"",sep:i===0?"Đang làm":""}}).concat(q.h.slice(0,8).map((z,i)=>({f:z.f||{ini:"?",col:"#888"},name:z.pn||shortN(z.n||"?"),dim:true,sep:i===0?"Đã qua":""})));
 if(items.length)h+=`<div class="pgwrap">`+pager("q72",items,i=>i<q.a.length?q72Card(q.a[i]):q72HCard(q.h[i-q.a.length]))+`</div>`;
 else h+=`<p class="past">Chưa ai nhờ ngươi việc gì. Người trong cung sẽ tìm đến khi cần (nhiều nhất ${Q72CFG.mo} lời nhờ mỗi tháng); ngươi cũng có thể đến các nơi và hỏi han.</p>`;
 const D=q72Debtors();h+=`<h3>Nợ ân</h3>`;
 if(D.length)h+=`<div class="rbtn">`+D.slice(0,8).map(([a,n,k])=>{const r=q72CallFx(a);const cd=evCooldownLeft("q72call:"+k,Q72CFG.cdCall);const tk=q72Fx(r.fx);if(r.gi&&IT[r.gi])tk.push(G72(IT[r.gi].n));if(r.rel)tk.push(q72Tok(a,r.rel));
  return pbtn(`data-q72c="${k}"`,`Nhờ ${q72Short(a)} trả ân (còn nợ ${n})`,`tốn: 1 khắc, ${R72(`nợ ân của ${q72Short(a)} -1`)} · thành: ${r.t}, ${tk.join(", ")}`,S.dead?"đã hết kiếp":Q.length?"đang có việc chờ":cd>0?`vừa nhờ, đợi ${cd} tuần`:!can(1)?"hết khắc":"")}).join("")+`</div>`;
 const owe=Object.entries(q.d).filter(([k,v])=>v<0);
 h+=owe.length?`<p class="past">Ngươi đang nợ ân: ${owe.map(([k,v])=>`${(q.dn&&q.dn[k])||k} (${-v})`).join(", ")}. Họ có thể tìm đến nhờ lại; từ chối thì mếch lòng gấp đôi.</p>`:"";
 if(!D.length&&!owe.length)h+=`<p class="past">Chưa ai nợ ngươi, ngươi cũng chưa nợ ai. Giúp xong một việc thì người nhờ nợ ngươi một ân; ngươi có thể nhờ họ trả lại sau.</p>`;
 h+=`<h3>Việc nhờ trong cung (ngươi biết)</h3><div class="logs">${q.np.map(z=>{const v=RV(z.a);return `<div>${v?mdH(pv(v),"xs"):""}<span class="ld">${z.w}</span>${z.t}</div>`}).join("")||"<div>Chưa nghe chuyện gì.</div>"}</div>`;
 return h}
(function(){const r0=renderPanel0;renderPanel0=function(){if(tab!=="q72"||!S)return r0.apply(this,arguments);const el=$("panel");try{faceInit()}catch(e){}const gm=document.querySelector(".game");if(gm)gm.classList.toggle("cardtab",true);
 const same=el.dataset.tab===tab,keep=same?el.scrollTop:0,rc=el.querySelector(".pcr"),rk=same&&rc?rc.scrollTop:0;el.innerHTML=q72HTML();el.dataset.tab=tab;el.dataset.pg=String(PG.q72);el.scrollTop=keep;kitFix(el);const r2=el.querySelector(".pcr");if(r2)r2.scrollTop=rk}})();
document.addEventListener("click",e=>{const b=e.target.closest("[data-q72d],[data-q72x],[data-q72a],[data-q72c],[data-q72g]");if(!b||b.disabled)return;e.stopPropagation();try{
 if(b.dataset.q72d!=null)q72Do(+b.dataset.q72d,b.dataset.q72o!=null?+b.dataset.q72o:null);else if(b.dataset.q72x!=null)q72Drop(+b.dataset.q72x);else if(b.dataset.q72a)q72Ask();else if(b.dataset.q72c)q72Call(b.dataset.q72c);
 else if(b.dataset.q72g){const k=b.dataset.q72g;if(k==="home")goTo("home");else{q72Pass(k);goTo(k)}tab="q72";render()}}catch(x){console.error(x)}},true);
/* test hooks (in-page): q72Test(id) offers that template now; q72Count() counts; q72Bot() plays one open step like a careful player */
window.q72Test=function(id,force){const T=T72I[id];if(!T)return false;const q=q72();if(force)q.cd={};const x=q72Make(T);if(!x)return false;q72Offer(x,"");showModal();return true};
window.q72Count=function(){const by={};for(const T of T72)by[T.kind]=(by[T.kind]||0)+1;return{templates:T72.length,followUps:T72.filter(t=>t.fu).length,byKind:by,steps:T72.reduce((a,t)=>a+t.s.length,0)/T72.length}};
window.q72Bot=function(){if(!S||S.dead||Q.length||!q72On())return false;const q=q72();for(const x of q.a){const X=q72X(x);if(!X)continue;const st=X.T.s[x.st];if(!st||st.w)continue;const pl=q72StepPl(st,X);
  if(pl&&S.place!==pl){if(pl==="home"){goTo("home");}else if(can(travel(S.place,pl)+1)&&!S.confined&&(q72Host(pl,X)||typeof accessOf!=="function"||accessOf(S,pl).ok)){q72Pass(pl);goTo(pl)}else continue}
  if(st.ch){let bi=-1,bv=-1;st.ch.forEach((o,i)=>{if(q72Why(x,X,st,o))return;const v=(o.p==null?100:q72Odds(o.p,o.sk,X))-(o.c&&o.c.bac?-o.c.bac/4:0)-((o.lto==="bad")?20:0);if(v>bv){bv=v;bi=i}});if(bi>=0){q72Do(x.u,bi);return true}}
  else if(!q72Why(x,X,st,null)){q72Do(x.u,null);return true}}return false};

/* =============== CONTENT: every request is motivated by the requester's real current state (a real illness, a real feud, a real thief in her staff,
   a real border crisis, a real festival on the calendar, a real lover...), names real targets, and its outcome changes real state. =============== */
(function(){const G=q72G,W=q72W,C=q72C,O=q72O;
 const trs=v=>{try{return traitsOf(v)}catch(e){return[v&&v.trait]}};
 const ill=o=>!!(o&&typeof o==="object"&&illOf(o)&&(o===S.emp||o.ill.known!==false)),illAny=o=>!!(o&&typeof o==="object"&&illOf(o)),thIll=()=>!S.thDead&&!!S.thIll,empIll=()=>!!illOf(S.emp);
 const illN=o=>{const i=o&&illOf(o);return i?ILL[i.k].n.toLowerCase():"bệnh"};
 const thIllN=()=>S.thIll&&ILL[S.thIll.k]?ILL[S.thIll.k].n.toLowerCase():"bệnh";
 const ease=(o,nm)=>{const i=o&&o.ill;if(!i)return"";if(i.st>1){i.st--;return `Bệnh ${nm} nhẹ đi một bậc.`}o.ill=null;return `${nm} khỏi bệnh.`};
 const easeTH=()=>{const i=S.thIll;if(!i)return"";if(i.st>1){i.st--;return "Bệnh Thái hậu nhẹ đi một bậc."}S.thIll=null;return "Thái hậu khỏi bệnh."};
 const easeEmp=()=>{const i=S.emp.ill;if(!i)return"";if(i.st>1){i.st--;return "Long thể nhẹ đi một bậc."}S.emp.ill=null;return "Long thể đã an."};
 const moodUp=()=>{if(S.emp.mood>0){S.emp.mood--;return `Tâm trạng Hoàng thượng khá lên (${MOODS[S.emp.mood][0].toLowerCase()}).`}return""};
 const feud=(a,b)=>aff(a,b)<=-10||aff(b,a)<=-10;
 const relAB=n=>X=>{if(X.A&&X.B&&X.A.o&&X.B.o&&X.A.o.id!=null&&X.B.o.id!=null){relAdd(X.A.o,X.B.o,n);return `${X.A.n} và ${X.B.n} ${n>0?"bớt hiềm khích, thân hơn":"thêm hiềm khích"} (${n>0?"+":""}${n}).`}return""};
 const relQB=n=>X=>{const q=queenP();if(q&&q!==S&&X.B){relAdd(q,X.B.o,n);return `Hoàng hậu và ${X.B.n} ${n>0?"bớt căng thẳng":"thêm căng thẳng"} (${n>0?"+":""}${n}).`}return""};
 const art=(k,g)=>()=>{addArt(k,g||1);const a=ARTS.find(z=>z.k===k);return `${a?a.n:k}: luyện thêm +${g||1}.`};
 const TD_=()=>typeof trS==="function"?trS():null;
 const bien=n=>()=>{const T=TD_();if(!T)return"";T.bien=cl(T.bien+n,0,100);return `Biên cương ${n>0?"+":""}${n}.`};
 const kho=n=>()=>{const T=TD_();if(!T)return"";T.kho=cl(T.kho+n,0,100);return `Kho lúa ${n>0?"+":""}${n}.`};
 const pow=(c,n)=>()=>{if(typeof tdPowAdd!=="function")return"";tdPowAdd(c,n);return `Nhà ${c} thế lực ${n>0?"+":""}${n}.`};
 const bienLo=v=>{const T=TD_();return !!T&&T.bien<v},khoLo=v=>{const T=TD_();return !!T&&T.kho<v};
 const fest=(...M)=>c=>M.includes(c.m)?1:0;
 const qn=()=>{const q=queenP();return q&&q!==S?q:null};
 const capOk=()=>{try{const [cm,ce]=capOf(S);return (S.staff||[]).filter(s=>s.role==="maid").length+1<cm}catch(e){return false}};
 const fiM=s=>(S.men||[]).find(m=>m.id===s.q72fi&&m.alive!==false);
 const loverOf=s=>s&&s.lover!=null?servById(s.lover):null;

 /* ===== illness (rival.ill, Thái hậu S.thIll, the Emperor S.emp.ill are real) ===== */
 T7("th_thuoc","craft",{r:"doc",rf:()=>thIll(),t:"Tìm vị thuốc cho Thái hậu",h:X=>`“Thái hậu mắc ${thIllN()}, phương thuốc của thần thiếu một vị quý, trong vườn ngự có trồng nhưng khó tìm. {Nc} giúp thần.”`,dl:4,
  s:[C("Tìm vị thuốc",O("Tự ra vườn ngự tìm",{t:()=>S.place==="vuon",tw:"phải ra Ngự hoa viên",p:45,sk:"mat",lto:"stay"}),O("Bỏ bạc nhờ thái giám mua ngoài cung",{c:{bac:-40},p:75,lto:"stay"})),G("A","Mang thuốc sang Thái y viện","",100,1)],
  ok:{fx:{th:4},r:8,fn:easeTH,x:"bệnh Thái hậu nhẹ đi một bậc",ch:"th_thuoc2"},no:{r:-5}});
 T7("th_thuoc2","craft",{fu:1,r:"doc",rf:()=>thIll(),t:"Canh lò thuốc ba đêm cho Thái hậu",h:"“Thái hậu vẫn chưa khỏi hẳn. Thuốc phải canh lửa ba đêm, không để ai lạ đến gần. Thần tin {N}.”",dl:4,
  s:[G("A","Canh lò thuốc (chỉ buổi tối)","",90,2,{suc:-8},"r",{bu:B4L}),W("Thuốc ngấm",1)],ok:{fx:{th:5,duc:2},r:6,fn:easeTH,x:"bệnh Thái hậu nhẹ đi một bậc"},no:{r:-5}});
 T7("th_kinh_om","craft",{r:"th",rf:()=>thIll(),t:"Chép kinh cầu an khi Thái hậu lâm bệnh",h:X=>`“Ai gia mắc ${thIllN()} đã mấy hôm, đêm nằm không yên. Ngươi chép cho ai gia một quyển kinh Dược Sư.”`,dl:5,
  s:[G("home","Chép kinh Dược Sư","tai",55,2,{suc:-6}),G("A","Dâng kinh, ngồi hầu Thái hậu","duc",80,1)],ok:{fx:{duc:2,th:4},r:6},no:{r:-5}});
 T7("hh_hau_th","social",{r:"hh",rf:()=>thIll(),t:"Chia phiên hầu Thái hậu cùng Hoàng hậu",h:"“Thái hậu ốm, bổn cung hầu mấy đêm liền đã kiệt sức. Muội chia phiên với bổn cung.”",dl:3,
  s:[G("tn","Hầu Thái hậu một đêm (chỉ buổi tối)","y",70,2,{suc:-8},"r",{bu:B4L,pass:1})],ok:{fx:{th:5},r:8,fn:X=>roll(35)?easeTH():""},no:{r:-5},tr:"Hầu bệnh chu đáo có thể làm bệnh Thái hậu nhẹ đi (khoảng một phần ba)."});
 T7("emp_om","social",{r:"doc",rf:()=>empIll(),t:"Hầu thuốc khi long thể bất an",h:X=>`“Hoàng thượng mắc ${illN(S.emp)}, không chịu uống thuốc của thần. {Nc} được ngài thương, xin hầu ngài uống thuốc.”`,dl:3,
  s:[G("home","Sắc lại thuốc cho dễ uống","y",60,1),G("",`Hầu Hoàng thượng uống thuốc`,"sung",65,1,{},"r",{emp:1,pl:null})],ok:{fx:{sung:4,an:2},r:6,fn:easeEmp,x:"long thể nhẹ đi một bậc"},no:{r:-4}});
 T7("emp_kinh_th","craft",{r:"th",rf:()=>empIll(),t:"Chép kinh cầu an cho Hoàng thượng",h:"“Hoàng thượng ốm, ai gia lòng như lửa đốt. Các phi tần đều phải chép kinh cầu an, ngươi cũng vậy.”",dl:4,
  s:[G("home","Chép kinh","tai",60,2,{suc:-5}),G("A","Dâng kinh lên Thái hậu","",100,1)],ok:{fx:{th:4,duc:2},r:5},no:{r:-6}});
 T7("rv_thuoc","craft",{r:"rv",rf:v=>ill(v),t:"Xin thuốc cho {A} đang mắc bệnh",h:X=>`“Muội mắc ${illN(X.A.o)} mấy hôm, người của muội xin thuốc mãi không được. Tỷ xin giúp muội ở Thái y viện.”`,dl:3,
  s:[G("tyv","Xin thuốc ở Thái y viện","danh",75,1,{bac:-15}),G("A","Mang thuốc sang cung {A}","",100,1)],ok:{r:12,fn:X=>ease(X.A.o,X.A.n),x:"bệnh của nàng nhẹ đi một bậc"},no:{r:-5}});
 T7("rv_tham_om","social",{r:"rv+",b:"rv",bf:o=>ill(o),t:"Cùng {A} thăm {B} đang ốm",h:X=>`“{B} mắc ${illN(X.B.o)}, chẳng ai đến thăm. Tỷ đi cùng muội nhé, mang ít thuốc bổ.”`,dl:3,
  s:[G("home","Chuẩn bị thuốc bổ","y",80,1,{bac:-10}),G("B","Thăm {B}","duc",85,1)],ok:{r:6,rb:10,fn:X=>{relAdd(X.A.o,X.B.o,6);return roll(30)?ease(X.B.o,X.B.n):""}},no:{r:-4},tr:"Thuốc bổ có thể làm bệnh của nàng nhẹ đi (khoảng một phần ba)."});
 T7("th_tham","social",{r:"th",b:"rv",bf:o=>ill(o),t:"Thay Thái hậu thăm {B} đang ốm",h:X=>`“{B} mắc ${illN(X.B.o)}. Ai gia mỏi chân, ngươi thay ai gia mang thuốc sang.”`,dl:3,
  s:[G("tyv","Lấy thuốc ở Thái y viện","",100,1),G("B","Thăm {B}","duc",85,1)],ok:{r:5,rb:10,d:0,fn:X=>ease(X.B.o,X.B.n),x:"bệnh của {B} nhẹ đi một bậc"},no:{r:-4}});
 T7("hh_om","social",{r:"hh",rf:o=>ill(o),t:"Hầu thuốc khi Hoàng hậu ốm",h:X=>`“Bổn cung mắc ${illN(X.A.o)}, người hầu vụng về. Muội có lòng thì sang hầu thuốc giúp bổn cung.”`,dl:3,
  s:[G("A","Hầu thuốc","y",65,2,{suc:-6})],ok:{r:12,fx:{duc:2},fn:X=>ease(X.A.o,"Hoàng hậu"),x:"bệnh Hoàng hậu nhẹ đi một bậc"},no:{r:-5}});
 T7("doc_docman","pro",{r:"doc",b:"rv",bf:o=>o.ill&&o.ill.k==="docman"&&!o.ill.known,t:"Báo riêng cho {B}: thái y nghi nàng trúng độc",h:"“Thần bắt mạch {B}, thấy mạch có dấu trúng độc lâu ngày. Thần thân phận thấp, không dám nói với nàng. {Nc} nhắc giúp.”",dl:3,
  tr:"Mạch của nàng quả có dấu trúng độc mãn tính (thái y không đoán sai).",s:[G("B","Báo kín cho {B}","tamco",60,1)],ok:{r:6,rb:15,fn:X=>{if(X.B.o.ill){X.B.o.ill.known=true}return `${X.B.n} biết mình trúng độc, bắt đầu đề phòng.`},x:"nàng biết mình trúng độc"},no:{r:-3}});
 T7("lc_thuoc","risk",{r:"doc",b:"fallen",bf:o=>illAny(o),t:"Lén mang thuốc vào lãnh cung cho {B}",h:X=>`“{B} ở Trường Môn viện mắc ${illN(X.B.o)}, không ai được mang thuốc vào. Thần không vào được. {Nc} nhân từ…”`,dl:3,
  s:[G("tyv","Nhận thuốc","",100,1),G("lc","Mang thuốc vào lãnh cung","tamco",55,1,{},"b")],ok:{fx:{duc:4},r:8,rb:12,fn:X=>ease(X.B.o,X.B.n),x:"bệnh của {B} nhẹ đi một bậc"},no:{r:-3},bad:{fx:{danh:-3,th:-2}},badT:"Người gác báo lên."});
 T7("thuoc_cam","risk",{r:"rvc",t:"Lén mang thuốc cho {A} đang bị cấm túc",h:X=>`“Muội bị cấm túc ${X.A.o.confined} tháng${ill(X.A.o)?`, lại mắc ${illN(X.A.o)}`:", người suy kiệt"}. Tỷ thương muội, nhờ người lén mang ít thuốc bổ.”`,dl:3,
  s:[G("tyv","Lấy thuốc","",100,1,{bac:-15}),G("A","Lẻn mang thuốc vào","tamco",50,1,{},"b")],ok:{fx:{duc:2},r:20,d:2,fn:X=>{ap(X.A.o,{suc:10});return (ill(X.A.o)?ease(X.A.o,X.A.n)+" ":"")+`${X.A.n} Sức +10.`},x:"nàng Sức +10, bệnh (nếu có) nhẹ đi"},no:{r:-5},bad:{fx:{danh:-3},pun:"lén vào cung phi tần bị cấm túc"},badT:"Thị vệ bắt được người mang thuốc."});
 T7("huong_doc","craft",{r:"doc",rf:()=>S.suc<45||(S.ill&&S.ill.k==="matngu"),t:"Dùng thử phương hương an thần của thái y",h:"“Thần thấy {N} sắc mặt mệt mỏi. Thần vừa phối được phương hương an thần, {N} dùng thử rồi kể thần nghe.”",dl:4,
  s:[G("tyv","Nhận hương","",100,1),W("Dùng thử một tuần",1),G("A","Kể lại cho thái y","y",80,1)],ok:{fx:{suc:12},r:8,fn:()=>S.ill&&S.ill.k==="matngu"?ease(S,"Ngươi"):""},no:{r:-3}});
 T7("rv_con_om","pro",{r:"rv",rf:v=>(v.kids||[]).some(k=>k.alive&&k.age<14&&(k.hp||100)<75),t:"Mời thái y tin cẩn cho con của {A}",h:X=>{const k=(X.A.o.kids||[]).find(k=>k.alive&&k.age<14&&(k.hp||100)<75);return `“${k?k.name:"Con muội"} yếu ớt mãi không khá. Muội sợ thái y trong cung bị người ta mua chuộc. Tỷ mời giúp muội người tin được.”`},dl:3,
  s:[G("tyv","Mời thái y tin cẩn","",85,1,{bac:-15}),G("A","Đưa thái y sang cung {A}","y",70,1)],ok:{r:18,d:2,fn:X=>{const k=(X.A.o.kids||[]).find(k=>k.alive&&k.age<14&&(k.hp||100)<75);if(k){k.hp=cl((k.hp||60)+15,0,100);return `${k.name} khỏe hơn (thể trạng +15).`}return""},x:"đứa trẻ thể trạng +15"},no:{r:-6}});

 /* ===== feuds (aff between real people) ===== */
 T7("thu_ab","social",{r:"rv",b:"rv",bf:(o,z,A)=>feud(A.o,o),t:"Chuyển thư làm lành của {A} cho {B}",h:"“Muội với {B} giận nhau đã lâu. Muội viết lá thư này mà không dám đưa. Tỷ mang giúp muội được không?”",dl:4,
  s:[G("B","Mang thư sang cung {B}","tamco",60,1),C("{B} đọc thư rồi hỏi ý ngươi",O("Nói giúp vài lời cho {A}",{p:55,sk:"tai",fn:(X,x,ok)=>ok?relAB(15)(X):relAB(5)(X),lto:"ok"}),O("Chỉ đưa thư, không xen vào",{fn:relAB(6)}))],ok:{r:10},no:{r:-5}});
 T7("hoa_giai","social",{r:"th",b:"rv",bf:o=>!!qn()&&feud(qn(),o),t:"Hòa giải {B} với Hoàng hậu",h:"“Hoàng hậu với {B} cứ gặp là gai mắt nhau. Hậu cung không yên thì ai gia không yên. Ngươi khéo miệng, thử khuyên xem.”",dl:6,
  s:[G("B","Khuyên {B}","tai",50,2),G("kn","Thưa chuyện với Hoàng hậu","tai",50,2)],ok:{fx:{duc:3},r:8,fn:relQB(15),x:"Hoàng hậu và {B} bớt căng thẳng (+15)"},no:{r:-4}});
 T7("hh_kieu","social",{r:"hh",b:"rv",bf:(o,z,A)=>aff(o,A.o)<=-10,t:"Khuyên {B} thôi chống đối Hoàng hậu",h:"“{B} hễ gặp bổn cung là nói lời khó nghe. Bổn cung không muốn phạt nặng, muội sang khuyên nàng tự đến nhận lỗi.”",dl:5,
  s:[G("B","Gặp {B}","tamco",45,2),C("{B} còn ấm ức",O("Lấy lời mềm mỏng khuyên",{p:55,sk:"tai",rb:4,lto:"fail"}),O("Nhắc khéo hậu quả nếu Hoàng hậu trách phạt",{p:65,sk:"tamco",rb:-6,lto:"fail"}))],ok:{r:10,fn:relQB(10),x:"Hoàng hậu và {B} bớt căng thẳng (+10)"},no:{r:-5}});
 T7("rv_di_cung","pro",{r:"rvk",b:"rv",bf:(o,z,A)=>aff(o,A.o)<=-15,t:"Đi cùng {A} khi bị {B} gọi sang",h:"“{B} ghét muội ra mặt, giờ lại cho gọi muội sang uống trà. Muội sợ lắm. Tỷ đi cùng muội được không?”",dl:2,
  s:[G("B","Cùng {A} sang cung {B}","tamco",60,1)],ok:{r:14,rb:-4,fn:relAB(6)},no:{r:-6}});
 T7("bo_chung","pro",{r:"rv",b:"rv",bf:(o,z,A)=>(o.evm&&o.evm[key(A.o)]||0)>0,t:"Thuyết phục {B} buông tha {A}",h:"“{B} nắm được chút sơ hở của muội, cứ đem ra dọa. Tỷ có mặt mũi, nói với nàng giúp muội.”",dl:4,
  tr:"{B} quả đang nắm Chứng cứ về nàng.",s:[G("B","Nói chuyện với {B}","tai",45,2),C("{B} ra điều kiện",O("Đổi bằng 30 bạc",{c:{bac:-30}}),O("Lấy tình cảm thuyết phục",{p:50,sk:"relb",lto:"fail"}))],
  ok:{r:15,d:2,fn:X=>{const k=key(X.A.o);if(X.B.o.evm&&X.B.o.evm[k]){X.B.o.evm[k]=Math.max(0,X.B.o.evm[k]-1)}return `${X.B.n} bỏ đi một Chứng cứ về ${X.A.n}.`},x:"{B} bỏ một Chứng cứ về nàng"},no:{r:-5}});
 T7("loi_thoi","social",{r:"rvk",b:"rvk",bf:(o,z,A)=>Math.abs(aff(A.o,o))<10,rf:v=>liveRivals(true).every(u=>u===v||aff(v,u)<15),t:"Mời {B} cùng {A} uống trà",h:"“Muội vào cung chưa có ai thân. Muội nghe {B} cũng hiền lành. Tỷ mời giúp một buổi trà ba người được không?”",dl:4,
  s:[G("B","Mời {B}","relb",65,1),G("home","Bày trà, chuyện trò","tai",65,1,{bac:-10})],ok:{r:8,rb:5,fn:relAB(12)},no:{r:-3}});
 T7("don_ta","inv",{r:"hh",b:"rv",p:X=>{const q=qn();return{tru:!!(q&&aff(X.B.o,q)<-10)}},rf:()=>!!qn(),bf:o=>aff(o,S)>-40,t:"Xác minh: {B} có oán Hoàng hậu không",h:"“Có người thưa với bổn cung rằng {B} oán bổn cung. Muội hỏi dò xem thật hay giả.”",dl:4,
  s:[G("B","Dò chuyện {B}","mat",45,2),C(X=>X.p.tru?"Ngươi biết sự thật: {B} quả có oán Hoàng hậu":"Ngươi biết sự thật: {B} không oán Hoàng hậu; lời đồn là bịa",
   O("Thưa thật với Hoàng hậu",{fn:X=>{const q=qn();if(!q)return"";if(X.p.tru){relAdd(q,X.B.o,-8);return `Hoàng hậu lạnh nhạt với ${X.B.n} (-8).`}relAdd(q,X.B.o,5);return `Hoàng hậu bớt nghi ${X.B.n} (+5).`}}),O("Chỉ thưa “chưa nghe thấy gì”",{r:-2,fn:X=>{relAdd(S,X.B.o,4);return `${X.B.n} biết ngươi không đưa chuyện (+4).`}}))],ok:{r:8},no:{r:-5}});
 T7("off_hoa","court",{r:"off",rf:o=>typeof tdRel==="function"&&CLANS.some(c=>c!==o.c&&tdRel(o.c,c)<=-25),t:"Hòa giải nhà {A} với nhà đối đầu",
  h:X=>{const c=CLANS.find(c=>c!==X.A.id&&tdRel(X.A.id,c)<=-25);return `“Nhà lão phu với nhà ${c} đấu đá mãi, triều đình rối ren. {Nc} ở trong cung, gửi lời khuyên giải giúp.”`},p:X=>({c:CLANS.find(c=>c!==X.A.id&&tdRel(X.A.id,c)<=-25)}),dl:5,
  s:[G("home","Viết thư khuyên giải hai nhà","tai",50,2),W("Đợi hồi âm",1)],ok:{r:10,cc:1,fn:X=>{tdRelAdd(X.A.id,X.p.c,12);return `Nhà ${X.A.id} và nhà ${X.p.c} bớt đối đầu (+12).`},x:"hai nhà bớt đối đầu (+12)"},no:{r:-4}});

 /* ===== real thieves, spies and leaks (fixed truths) ===== */
 T7("mat_tram","inv",{r:"rv",rf:v=>(v.staff||[]).some(s=>s.tr==="tham"),p:X=>{const s=(X.A.o.staff||[]).find(s=>s.tr==="tham");return{cul:s.sid,cn:s.name}},t:"Tìm món trang sức {A} bị mất",
  h:"“Đôi hoa tai ngọc mẫu thân muội để lại biến mất mấy hôm nay. Muội không dám làm to chuyện. Tỷ tinh ý, giúp muội tìm.”",dl:5,
  s:[G("A","Hỏi chuyện người hầu cung {A}","mat",45,2),C(X=>`Ngươi biết sự thật: ${X.p.cn}, người hầu tham lam của {A}, lấy trộm`,
   O("Báo {A} tất cả",{r:6,fn:X=>{const s=servById(X.p.cul);if(s)s.loyal=cl((s.loyal||0)-15,0,100);return `${X.p.cn} bị chủ phạt, lòng với chủ -15.`}}),O(X=>`Lặng lẽ bảo ${X.p.cn} trả lại, giữ kín tên`,{w:{duc:3},fn:X=>{const s=servById(X.p.cul);if(s){s.af=s.af||{};s.af[key(S)]=(s.af[key(S)]||0)+15}return `${X.p.cn} trả lại đồ, mang ơn ngươi.`}}))],ok:{r:10,ch:"mat_tram2"},no:{r:-5}});
 T7("mat_tram2","inv",{fu:1,r:"rv",rf:()=>!!qn(),t:"Làm chứng cho {A} trước Hoàng hậu",h:"“Chuyện mất đồ đến tai Hoàng hậu, người cho gọi muội hỏi. Tỷ là người biết rõ nhất, đi cùng muội được không?”",dl:3,
  s:[G("kn","Thưa thật với Hoàng hậu","duc",70,1)],ok:{r:8,fx:{hh:3,duc:1}},no:{r:-4}});
 T7("tai_mat","inv",{r:"maid",rf:()=>liveRivals(true).some(v=>(v.evm&&v.evm.me)>0),p:()=>{const s=(S.staff||[]).find(z=>z.spyFor!=null);return s?{sid:s.sid,sn:s.name,who:s.spyFor}:{sid:null}},
  t:"Tìm kẻ làm lọt chuyện trong cung ngươi",h:"“{Nc}, có người đang nắm chuyện riêng của cung mình. Chắc có kẻ làm tai mắt cho ai đó. Để nô tỳ cùng {N} dò xét.”",dl:5,tr:"Quả có phi tần đang nắm Chứng cứ về ngươi.",
  s:[G("home","Dò xét kẻ hầu","mat",45,2),C(X=>X.p.sid!=null?`Ngươi biết sự thật: ${X.p.sn} làm tai mắt cho ${(()=>{const v=byKey(X.p.who);return v&&v!==S?v.name:"người ngoài"})()}`:"Ngươi biết sự thật: kẻ hầu của ngươi không ai làm tai mắt; chuyện lọt ra từ chỗ khác",
   O(X=>X.p.sid!=null?`Gọi ${X.p.sn} ra răn đe, bắt thôi`:"Khen {A} cẩn thận",{fn:X=>{if(X.p.sid==null){S.maid.loyal=cl(S.maid.loyal+4,0,100);return `Lòng ${S.maid.name} +4.`}const s=servById(X.p.sid);if(s&&ownerOf(s)===S){s.spyFor=null;s.loyal=cl((s.loyal||0)-10,0,100);return `${s.name} thôi làm tai mắt, lòng với ngươi -10.`}return""}}),
   O(X=>X.p.sid!=null?`Giữ ${X.p.sn} lại, giữ miệng trước mặt hắn`:"Để yên",{w:{tamco:1}}))],ok:{r:8},no:{r:-3}});
 T7("bac_mat","inv",{r:"sv",rf:s=>(S.staff||[]).some(z=>z.tr==="tham"&&z!==s),p:X=>{const s=(S.staff||[]).find(z=>z.tr==="tham"&&z.sid!==X.A.id);return{cul:s.sid,cn:s.name}},t:"Tìm số bạc lương {A} bị mất",
  h:"“Số bạc dành dụm cả năm của nô tỳ để dưới gối, giờ mất sạch. {Nc} làm chủ cho nô tỳ.”",dl:4,
  s:[G("home","Tra hỏi trong cung","mat",50,2),C(X=>`Ngươi biết sự thật: ${X.p.cn} lấy bạc`,
   O(X=>`Bắt ${X.p.cn} trả lại, phạt nhẹ`,{fn:X=>{const s=servById(X.p.cul);if(s&&ownerOf(s)===S){s.loyal=cl((s.loyal||0)-8,0,100);return `${s.name} trả bạc, lòng với ngươi -8.`}return""}}),
   O("Bù bạc cho {A} từ tiền riêng, nhắc khéo kẻ lấy",{c:{bac:-20},r:6,w:{duc:2}}))],ok:{r:10},no:{r:-5}});
 T7("hang_lau","risk",{r:"sve",rf:s=>s.tr==="tham",t:"Giấu hàng {A} mang lậu vào cung",h:"“Nô tài tham chút lời, mang ít lụa lậu vào bán. Xin {N} cho cất tạm trong kho cung mình mấy hôm.”",dl:3,
  s:[W("Cất hàng trong kho",1),C("Hàng lậu",O("Để hắn bán xong, chia ít lời",{p:65,w:{bac:20},lto:"bad"}),O("Bắt mang đi, răn đe",{r:-6,w:{duc:2},to:"ok"}))],ok:{r:10},no:{r:-4},bad:{fx:{danh:-4,bac:-20},pun:"chứa hàng lậu trong cung"},badT:"Nội vụ phủ khám kho, thấy hàng lậu."});
 T7("chuoc_sv","craft",{r:"sve",rf:s=>s.tr==="tham"||s.tr==="nhat",t:"Chuộc lại gia bảo {A} đem cầm",h:"“Nô tài túng quá, lỡ đem cầm chiếc vòng mẹ để lại, giờ hiệu cầm đồ sắp bán mất. {Nc} cho nô tài vay ít bạc chuộc về.”",dl:5,
  s:[C("Chuộc vòng",O("Bỏ 30 bạc chuộc giúp",{c:{bac:-30}}),O("Sai người mặc cả, chuộc rẻ hơn",{c:{bac:-15},p:50,sk:"tamco",lto:"fail"})),G("home","Trao lại vòng cho {A}","",100,1)],ok:{r:18},no:{r:-5}});
 T7("doi_thuoc","inv",{r:"doc",b:"rsv",bf:s=>s.tr==="tham",p:X=>({cn:X.B.n,own:X.B.own.name}),t:"Tra ai lấy trộm nhân sâm ở Thái y viện",h:"“Nhân sâm trong kho hụt hẳn mấy cân. Thần không dám báo khi chưa rõ. {Nc} tra giúp thần.”",dl:4,
  s:[G("tyv","Đối chiếu sổ thuốc, hỏi người ra vào","mat",50,2),C(X=>`Ngươi biết sự thật: ${X.p.cn}, người hầu của ${X.p.own}, lấy trộm`,O("Báo thái y đúng như vậy",{fn:X=>{relAdd(S,X.B.own,-4);if(X.B.o)X.B.o.loyal=cl((X.B.o.loyal||0)-10,0,100);return `${X.p.own} mất mặt (-4); ${X.p.cn} bị phạt.`}}),O(X=>`Bảo ${X.p.cn} lén trả lại`,{w:{duc:2},rb:10}))],ok:{r:10,fx:{mat:1}},no:{r:-4}});
 T7("dem_chung","risk",{r:"rsv",rf:s=>(s.loyal||50)<40,b:"rv",bf:(o,z,A)=>o===A.own&&aff(o,S)<0,t:"Gặp {A} giờ Tý ở vườn ngự",h:X=>`“Nô tỳ hầu ${X.A.own.name} đã chán cảnh bị hành hạ. Nàng ấy làm nhiều chuyện sau lưng {N}. Giờ Tý, ở hòn non bộ vườn ngự, nô tỳ trao vật chứng.”`,dl:3,
  tr:"Nàng ấy quả ghét ngươi, và người hầu này quả bất mãn với chủ.",s:[G("vuon","Ra vườn giờ Tý (chỉ buổi tối)","tamco",55,1,{},"b",{bu:B4L})],ok:{r:8,d:0,fn:X=>{evA(S,X.B.o,1);return `Chứng cứ về ${X.B.n} +1.`},x:"Chứng cứ về {B} +1"},no:{},bad:{fx:{danh:-4},ev:"B"},badT:"Người của {B} rình được ngươi đêm khuya ngoài vườn."});
 T7("rsv_tin","trade",{r:"rsv",rf:s=>(s.loyal||50)<45,acc:X=>{apply({mat:1});q72DebtAdd(X.A,-1)},accX:"Tai mắt +1; ngươi nợ nàng một ân.",t:"Đổi ơn: tin của {A}, lời xin cho nàng",
  h:X=>`“Nô tỳ hầu ${X.A.own.name} mà chẳng được đối đãi tử tế. Nô tỳ kể {N} nghe chuyện bên ấy; chỉ xin {N} nói với Tổng quản cho nô tỳ được thưởng Tết như người khác.”`,tr:"Nhận lời: ngay Tai mắt +1, ngươi nợ nàng một ân.",dl:4,
  s:[G("ksp","Nói với Tổng quản ở Kính sự phòng","danh",60,1)],ok:{r:10,d:1},no:{r:-10}});

 /* ===== the Emperor's real mood / the realm ===== */
 T7("tra_emp","craft",{r:"emp",rf:()=>S.emp.mood>=2||(S.emp.ill&&S.emp.ill.k==="matngu"),t:"Sao trà an thần cho Hoàng thượng",h:X=>`“Trẫm ${S.emp.mood>=2?MOODS[S.emp.mood][0].toLowerCase()+", ":""}mất ngủ mấy đêm. Hôm trước ái phi nói ở quê nàng sao trà cách khác, ngủ ngon lắm. Sao cho trẫm một ít.”`,dl:3,
  s:[G("home","Sao trà","y",55,1),G("","Dâng trà cho Hoàng thượng","sac",75,1,{},"r",{emp:1})],ok:{fx:{sung:4,an:2},d:0,fn:moodUp,x:"tâm trạng Hoàng thượng khá lên"},no:{fx:{sung:-2}}});
 T7("emp_co","social",{r:"emp",rf:()=>S.emp.mood>=1,t:"Đánh cờ giải khuây cho Hoàng thượng",h:"“Việc triều làm trẫm bực bội. Ái phi mang bàn cờ đến, đánh với trẫm một ván.”",dl:2,
  s:[G("","Đánh cờ với Hoàng thượng","ky",50,1,{},"e",{emp:1})],ok:{fx:{sung:3,an:2},d:0,fn:X=>moodUp()+" "+art("ky",1)(),x:"tâm trạng Hoàng thượng khá lên, Kỳ luyện thêm +1"},no:{fx:{sung:1}},noT:"Ngươi thua, ngài cười."});
 T7("so_th","court",{r:"emp",rf:()=>!S.thDead&&(bienLo(45)||khoLo(45)),t:"Mang tấu chương khẩn sang Đức Thọ cung",h:X=>{const T=TD_();return `“${T.bien<45?`Biên cương nguy cấp (${T.bien})`:`Kho lúa cạn (${T.kho})`}. Bản tấu này trẫm muốn mẫu hậu xem. Ái phi mang sang, đừng để ai khác cầm.”`},dl:2,
  s:[G("tn","Mang tấu chương sang","duc",80,1)],ok:{fx:{sung:3,th:3,an:1},d:0},no:{fx:{sung:-2}}});
 T7("tho_te","court",{r:"emp",w:fest(12,1),t:"Làm văn tế cho lễ tế trời đầu năm",h:"“Lễ tế trời đầu năm trẫm muốn có bài văn tế mới. Ái phi thơ hay, viết cho trẫm một bài.”",dl:4,
  s:[G("home","Làm văn tế","thi",45,2),G("","Dâng văn tế","tai",70,1,{},"r",{emp:1})],ok:{fx:{sung:5,danh:4},d:0},no:{fx:{sung:-2}}});
 T7("an_xa","court",{r:"emp",rf:()=>thIll(),t:"Soạn danh sách ân xá cầu phúc cho Thái hậu",h:"“Mẫu hậu ốm lâu. Trẫm muốn ân xá một số cung nhân bị phạt để cầu phúc. Ái phi hiểu chuyện hậu cung, soạn giúp trẫm.”",dl:3,
  s:[G("home","Xét và soạn danh sách","duc",60,2),G("","Dâng danh sách","",100,1,{},"r",{emp:1})],ok:{fx:{duc:4,sung:2},d:0,fn:()=>{let n=0;for(const v of rivals)if(v.alive&&v.confined&&!v.out){v.confined=Math.max(0,v.confined-1);n++}return n?`Các phi tần đang cấm túc được giảm một tháng (${n} người).`:""},x:"phi tần đang cấm túc được giảm một tháng"},no:{fx:{sung:-2}}});
 T7("qua_tet","court",{r:"emp",w:fest(12,1),rf:()=>!S.thDead,t:"Chọn quà Tết dâng Thái hậu cùng Hoàng thượng",h:"“Tết đến, năm nào trẫm cũng dâng mẫu hậu ngọc, bà chán rồi. Ái phi chọn giúp trẫm món gì bà thích.”",dl:3,
  s:[G("home","Chọn quà","tai",55,1,{bac:-20}),G("tn","Cùng dâng quà","",100,1)],ok:{fx:{sung:3,th:5},d:0},no:{fx:{sung:-1}}});
 T7("bien_tin","inv",{r:"off",rf:o=>o.c==="Đại tướng quân"&&bienLo(55),p:()=>({b:TD_().bien}),t:"Dò ý Hoàng thượng về việc biên ải",h:"“Biên cương bất ổn, lão phu ở xa không biết ý Hoàng thượng thế nào. {Nc} hầu cận, dò giúp một lời.”",dl:4,
  s:[G("","Dò ý Hoàng thượng","sung",45,1,{},"r",{emp:1}),C(X=>`Ngươi biết sự thật: biên cương đang ở mức ${X.p.b}${X.p.b<40?", Hoàng thượng rất lo":", ngài còn để ý"}`,O("Viết thư báo đúng như vậy",{}))],ok:{r:10,cc:1,fn:pow("Đại tướng quân",2)},no:{r:-4}});
 T7("kho_lua","court",{r:"off",rf:o=>o.c==="Hộ bộ"&&khoLo(55),t:"Tâu xin Hoàng thượng phê sớ phát chẩn",h:X=>`“Kho lúa còn ${TD_().kho}, dân mấy trấn đói. Sớ xin điều lúa của lão phu chưa được phê. {Nc} nhân lúc ngài vui, thưa giúp.”`,dl:4,
  s:[G("","Tâu xin","sung",50,1,{},"r",{emp:1})],ok:{fx:{danh:4,duc:2},r:12,cc:1,fn:X=>kho(4)()+" "+pow("Hộ bộ",2)(),x:"Kho lúa +4, nhà Hộ bộ thế lực +2"},no:{r:-4,cc:1}});
 T7("ao_bien","court",{r:"off",rf:o=>o.c==="Đại tướng quân"&&bienLo(65),w:c=>["Thu","Đông"].includes(c.sea)?2:0,t:"Lo áo bông cho quân biên ải",h:"“Gió bấc đã về biên ải mà áo bông chưa tới. {Nc} có thể cùng các phi tần góp may, rồi tâu lên Hoàng thượng.”",dl:6,
  s:[G("home","Tổ chức may áo","tai",55,2,{bac:-30}),G("","Tâu lên Hoàng thượng","sung",60,1,{},"r",{emp:1})],ok:{r:12,fx:{danh:3},fn:bien(4),x:"Biên cương +4"},no:{r:-4}});
 T7("su_thu","risk",{r:"man:sứ thần",rf:()=>bienLo(50),t:"Chuyển thư cầu hòa của sứ thần lên Hoàng thượng",h:X=>`“Biên cương căng thẳng (${TD_().bien}). Quốc thư cầu hòa bị quan Lễ bộ giữ lại. Thần có bức thư riêng, xin {N} chuyển tận tay Hoàng thượng.”`,dl:3,
  s:[G("","Dâng thư riêng","sung",50,1,{},"e",{emp:1})],ok:{r:10,fx:{bac:20},cc:1,fn:bien(5),x:"Biên cương +5"},no:{r:-4,cc:1}});
 T7("so_hl","court",{r:"off",rf:o=>o.pow<40,t:"Đặt sớ của nhà {A} lên án thư Hoàng thượng",h:X=>`“Nhà lão phu thế suy (thế lực ${X.A.o.pow}), sớ tấu bị kẻ khác chặn ở Thông chính ty. {Nc} có thể đưa nó đến tay Hoàng thượng.”`,dl:4,
  s:[G("","Dâng sớ","sung",50,1,{},"r",{emp:1})],ok:{r:14,cc:1,fn:X=>pow(X.A.id,4)(),x:"nhà ông thế lực +4"},no:{r:-5,cc:1}});
 T7("so_khen","court",{r:"off",rf:o=>o.c==="Đại tướng quân"&&!bienLo(70),t:"Nhuận sắc bài phú mừng biên ải yên ổn",h:X=>`“Biên cương yên ổn (${TD_().bien}), nhà lão phu muốn dâng bài phú mừng. {Nc} văn hay, nhuận sắc giúp.”`,dl:4,
  s:[G("home","Nhuận sắc bài phú","thi",50,2)],ok:{r:12,fx:{tai:1},fn:pow("Đại tướng quân",2)},no:{r:-4}});
 T7("tham_o","inv",{r:"off",b:"rv",bf:(o,z,A)=>typeof tdHouse==="function"&&!!tdHouse(o)&&tdHouse(o)!==A.id&&tdRel(A.id,tdHouse(o))<=-25,p:X=>({tru:tdDadT(X.B.o),c:tdHouse(X.B.o)}),
  t:"Dò xem cha {B} có tham ô không",h:X=>`“Nhà ${tdHouse(X.B.o)} đối đầu với nhà lão phu đã lâu. {Nc} ở trong cung, dò giúp lão phu xem sổ sách nhà ấy có sạch không.”`,dl:6,
  s:[G("ksp","Dò sổ sách qua thái giám","mat",40,2,{bac:-20}),C(X=>X.p.tru?"Ngươi biết sự thật: cha {B} quả có tham ô":"Ngươi biết sự thật: cha {B} thanh liêm, sổ sách sạch",
   O("Báo đúng sự thật",{fn:X=>{if(X.p.tru&&typeof deA==="function"){deA(S,X.B.o,1);return `Ngươi nắm Chứng cứ tham ô của cha ${X.B.n} +1.`}return""}}),O("Giữ kín, chỉ báo “chưa rõ”",{r:-4}))],ok:{r:10,cc:1},no:{r:-5}});
 T7("off_bac","trade",{r:"off",rf:o=>o.pow>=50&&S.bac<80,acc:X=>{apply({bac:50});q72DebtAdd(X.A,-1)},accX:"Bạc +50; ngươi nợ ông một ân.",t:"Đổi ơn: bạc của quyền thần, lời nhắc tên con ông",
  h:"“Thấy {N} chi tiêu chật vật, lão phu có chút lễ mọn. Con trai lão phu thi đỗ mà chưa được bổ dụng; {N} nhắc giúp một câu.”",tr:"Nhận lời: ngay Bạc +50, ngươi nợ ông một ân. Đây là can chính.",dl:5,
  s:[G("","Nhắc tên con ông với Hoàng thượng","sung",50,1,{},"r",{emp:1})],ok:{r:15,d:1,cc:1,fn:X=>pow(X.A.id,2)()},no:{r:-12,cc:1}});
 T7("off_con","social",{r:"off",rf:o=>typeof tdMembers==="function"&&tdMembers(o.c).some(p=>p!==S&&p.rank<=2),b:"rv",bf:(o,z,A)=>tdHouse(o)===A.id&&o.rank<=2,t:"Che chở con gái nhà {A} trong cung",
  h:"“Con gái lão phu phẩm vị thấp, vào cung còn non dại. Mong {N} chỉ bảo, che chở cho nó.”",dl:5,s:[G("B","Sang thăm {B}","",90,1),G("home","Mời {B} sang, chỉ bảo","tai",65,1)],ok:{r:14,rb:10},no:{r:-5}});
 T7("ak_bien","trade",{r:"ak",rf:k=>k.sex==="m"&&bienLo(60),acc:()=>{apply({tai:3})},accX:"Tài +3 (binh thư chàng tặng).",t:"Xin cho {A} ra biên ải",
  h:X=>`“Biên cương nguy (${TD_().bien}), con muốn ra trận rèn luyện mà phụ hoàng chưa cho. Con biếu {N} bộ binh thư bản hiếm; xin {N} nói giúp con.”`,tr:"Nhận lời: ngay Tài +3.",dl:5,
  s:[G("","Xin Hoàng thượng cho {A} ra biên","sung",45,1,{},"r",{emp:1})],ok:{d:1,fx:{danh:2},fn:X=>{X.A.o.tal=cl((X.A.o.tal||40)+5,0,100);return bien(3)()+` ${X.A.n} tài cán +5.`},x:"Biên cương +3, chàng tài cán +5"},no:{}});

 /* ===== the Thái hậu / Hoàng hậu / consort favour ladders (real numbers) ===== */
 T7("gioi_th","social",{r:"rv",rf:v=>v.rank<=2&&(v.th||0)<10&&!S.thDead&&S.th>=30,t:"Đưa {A} sang thỉnh an Thái hậu",h:"“Muội vào cung đã lâu mà Thái hậu chưa nhìn muội lấy một lần. Tỷ được Thái hậu thương, dắt muội đi cùng được không?”",dl:4,
  s:[G("tn","Đưa {A} sang Đức Thọ cung","danh",60,1)],ok:{r:15,fn:X=>{ap(X.A.o,{th:5});return `Thái hậu để ý đến ${X.A.n} (+5).`},x:"Thái hậu với nàng +5"},no:{r:-5,fx:{th:-2}}});
 T7("hh_th","social",{r:"hh",rf:o=>(o.th||0)<0&&!S.thDead,t:"Đưa lời Hoàng hậu sang Đức Thọ cung",h:"“Thái hậu dạo này lạnh nhạt với bổn cung. Bổn cung có lời muốn thưa mà không tiện tự đi. Muội chuyển lời giúp, lựa lúc Thái hậu vui.”",dl:3,
  s:[G("tn","Chuyển lời Hoàng hậu","tai",60,1)],ok:{r:8,fn:X=>{ap(X.A.o,{th:5});return "Thái hậu bớt giận Hoàng hậu (+5)."},x:"Thái hậu với Hoàng hậu +5"},no:{r:-4}});
 T7("th_nhac_hh","pro",{r:"th",rf:()=>{const q=qn();return !!q&&(q.staff||[]).some(s=>s.spyFor!=null&&s.spyFor!==key(q))},p:()=>{const q=qn();const s=q.staff.find(s=>s.spyFor!=null&&s.spyFor!==key(q));return{sid:s.sid,sn:s.name}},t:"Nhắc Hoàng hậu: có người hầu không thật thà",
  h:"“Ai gia biết một người hầu bên Hoàng hậu làm tai mắt cho kẻ khác. Ngươi khéo léo nhắc nàng, đừng để nàng biết ai gia bảo.”",tr:"Điều Thái hậu nói là thật.",dl:3,
  s:[G("kn","Nhắc khéo Hoàng hậu","tai",55,1)],ok:{r:6,fx:{hh:5},fn:X=>{const s=servById(X.p.sid);if(s){s.spyFor=null;return `${s.name} bị Hoàng hậu cắt việc, thôi làm tai mắt.`}return""},x:"kẻ làm tai mắt bên Hoàng hậu bị cắt việc"},no:{r:-3}});
 T7("th_tram","trade",{r:"th",rf:()=>!!qn()&&S.th>=20,acc:X=>{apply({danh:2});q72DebtAdd(X.A,-1)},accX:"Danh +2; ngươi nợ Thái hậu một ân.",p:()=>({a:aff(qn(),S),hh:qn().th||0}),t:"Đổi ơn: trâm của Thái hậu, đôi mắt ngươi ở Càn Ninh cung",
  h:"“Cây trâm phượng này ai gia ban cho ngươi. Ngươi hay sang Càn Ninh cung, để ý xem Hoàng hậu dạo này thế nào, rồi kể ai gia nghe.”",tr:"Nhận lời: ngay Danh +2, ngươi nợ Thái hậu một ân.",dl:5,
  s:[G("kn","Thỉnh an Hoàng hậu, để ý","mat",55,1),Object.assign(C(X=>`Ngươi biết sự thật: Hoàng hậu ${X.p.a>=10?"đối đãi ngươi tử tế":X.p.a<=-10?"lạnh nhạt với ngươi":"giữ khoảng cách với mọi người"}`,O("Kể thật với Thái hậu",{})),{pl:"tn"})],ok:{r:6,d:1},no:{r:-10}});
 T7("tin_doi","trade",{r:"rva",rf:v=>(v.th||0)<20&&!S.thDead&&S.rank>=2,acc:X=>{apply({mat:1});q72DebtAdd(X.A,-1)},accX:"Tai mắt +1; ngươi nợ nàng một ân.",t:"Đổi ơn: tin của {A}, lời nói đỡ của ngươi",
  h:"“Muội cho tỷ biết một tin trong cung. Đổi lại, tỷ nói đỡ muội vài câu trước Thái hậu nhé; người chẳng ưa muội.”",tr:"Nhận lời: ngay Tai mắt +1, ngươi nợ nàng một ân.",dl:5,
  s:[G("tn","Nói đỡ {A} trước Thái hậu","danh",55,1)],ok:{r:6,d:1,fn:X=>{ap(X.A.o,{th:4});return `Thái hậu với ${X.A.n} +4.`},x:"Thái hậu với nàng +4"},no:{r:-12}});
 T7("quat_rv","craft",{r:"rv",rf:v=>v.sung<30,t:"Vẽ quạt cho {A} dâng Hoàng thượng",h:"“Hoàng thượng lâu rồi chẳng nhìn đến muội. Muội vụng tay; tỷ vẽ giúp muội cây quạt dâng ngài được không?”",dl:5,
  s:[G("home","Vẽ quạt","hoa",50,2),C("Đề tên ai trên quạt",O("Chỉ đề tên {A}",{r:4,fn:X=>{ap(X.A.o,{sung:3});return `${X.A.n} được ngài để ý (Sủng nàng +3).`}}),O("Đề thêm tên ngươi bên cạnh",{w:{sung:2},lr:-8,p:50,sk:"tamco",lto:"ok"}))],ok:{r:10},no:{r:-6}});
 T7("ksp_xem","risk",{r:"rva",rf:v=>v.sung<S.sung,t:"Lẻn xem sổ thị tẩm cho {A}",h:"“Muội muốn biết vì sao Hoàng thượng lật thẻ người khác mà không lật thẻ muội. Tỷ quen người Kính sự phòng, xem giúp muội.”",dl:3,
  s:[G("ksp","Lẻn xem sổ thị tẩm","tamco",45,1,{},"b")],ok:{r:12,fx:{mat:1}},no:{r:-4},bad:{fx:{danh:-3,sung:-3}},badT:"Thái giám Kính sự phòng bắt quả tang."});
 T7("tu_nu","social",{r:"hh",rf:()=>liveRivals(false).some(v=>v.rank===0),t:"Dạy lễ cho các phi tần mới",h:X=>`“${liveRivals(false).filter(v=>v.rank===0).map(v=>v.name).slice(0,3).join(", ")} còn vụng lễ nghi. Bổn cung giao muội chỉ bảo.”`,dl:4,
  s:[G("home","Dạy lễ","duc",60,2),G("A","Đưa các nàng sang ra mắt Hoàng hậu","",100,1)],ok:{fx:{duc:2},r:6,fn:()=>{const L=liveRivals(false).filter(v=>v.rank===0);L.forEach(v=>relAdd(S,v,5));return `${L.length} phi tần mới thân với ngươi hơn (+5).`},x:"các phi tần mới thân với ngươi (+5)"},no:{r:-4}});
 T7("vay_bac","trade",{r:"rv+",rf:v=>(v.bac||0)>=100&&S.bac<40,acc:X=>{apply({bac:60});ap(X.A.o,{bac:-60});q72DebtAdd(X.A,-1)},accX:"Bạc +60 (bạc của nàng); ngươi nợ nàng một ân.",t:"Vay {A} 60 bạc, hẹn trả",
  h:"“Muội thấy tỷ dạo này túng. Muội có ít bạc, tỷ cầm 60 lượng mà xoay xở, khi nào có thì trả.”",tr:"Nhận lời: ngay Bạc +60, ngươi nợ nàng một ân; trả 66 bạc trước hạn.",dl:8,
  s:[G("home","Trả {A} 66 bạc kèm lời cảm tạ","",100,1,{bac:-66})],ok:{r:8,d:1,fn:X=>{ap(X.A.o,{bac:66});return""}},no:{r:-15,fx:{danh:-3}},noT:"Tiếng ngươi quỵt nợ lan khắp hậu cung."});
 T7("rv_ngheo","trade",{r:"rv",rf:v=>(v.bac||0)<20&&S.bac>=60,t:"Giúp {A} qua cơn túng thiếu",h:X=>`“Muội còn ${X.A.o.bac||0} lượng, lương tháng chưa phát mà phải lo lót người hầu. Tỷ cho muội vay ít bạc được không?”`,dl:3,
  s:[C("Cho vay",O("Cho vay 30 bạc",{c:{bac:-30},fn:X=>{ap(X.A.o,{bac:30});return `${X.A.n} Bạc +30.`}}),O("Cho hẳn 20 bạc, không đòi",{c:{bac:-20},w:{duc:2},r:4,fn:X=>{ap(X.A.o,{bac:20});return `${X.A.n} Bạc +20.`}}))],ok:{r:12,d:1},no:{r:-5}});
 T7("rv_tho","craft",{r:"rv+",rf:v=>(v.tai||50)<45,w:fest(8,9),t:"Cùng {A} làm thơ cho yến thưởng hoa",h:"“Yến thưởng hoa sắp tới, muội vụng văn, nghĩ mãi không ra câu kết. Tỷ giúp muội.”",dl:4,
  s:[G("A","Cùng nghĩ thơ ở cung {A}","thi",55,1)],ok:{r:10,fx:{tai:1},fn:X=>{ap(X.A.o,{tai:2});return `${X.A.n} Tài +2.`}},no:{r:-3}});
 T7("rv_huong","craft",{r:"rv+",rf:v=>(v.suc||60)<45||ill(v),t:"Phối túi hương an thần cho {A}",h:"“Mấy đêm nay muội trằn trọc không ngủ được, người cứ rã rời. Tỷ khéo điều hương, phối giúp muội một túi.”",dl:5,
  s:[G("home","Phối hương","y",50,2,{bac:-10}),G("A","Mang sang cung {A}","",100,1)],ok:{r:12,fn:X=>{ap(X.A.o,{suc:10});return `${X.A.n} Sức +10.`},x:"nàng Sức +10"},no:{r:-5}});
 T7("canh_thai","pro",{r:"rvp",t:"Canh chừng quanh cung {A} đang mang thai",h:"“Muội mang thai, đêm nào cũng nằm mơ thấy chuyện chẳng lành. Tỷ có người tin cẩn, để mắt giúp muội.”",dl:6,
  s:[G("home","Sai người canh chừng","mat",55,1,{bac:-15}),W("Canh chừng hai tuần",2),G("A","Báo lại cho {A}","",100,1)],
  ok:{r:15,d:2,fn:X=>{const h=liveRivals(true).filter(v=>v!==X.A.o&&aff(v,X.A.o)<-20);if(h.length){evA(S,h[0],1);return `Người canh thấy ${h[0].name} cho người lảng vảng quanh cung ${X.A.n}: Chứng cứ về ${h[0].name} +1.`}return "Hai tuần yên ổn, không ai lảng vảng."}},no:{r:-6},tr:"Nếu có kẻ thù thật của nàng rình rập, người canh sẽ thấy."});
 T7("giu_thu","pro",{r:"rv+",rf:v=>liveRivals(true).some(u=>u!==v&&(u.evm&&u.evm[key(v)]||0)>0),t:"Giữ hộ hộp thư riêng của {A}",h:"“Có người đang nắm sơ hở của muội, muội sợ bị lục soát. Trong hộp chỉ là thư nhà, nhưng người ta bới móc chữ nghĩa. Tỷ giữ hộ muội ít lâu.”",dl:4,tr:"Quả có người đang nắm Chứng cứ về nàng.",
  s:[W("Cất giữ hộp thư",2),C("Trả hộp thư",O("Trả lại nguyên vẹn",{p:85,lto:"bad"}))],ok:{r:14},no:{r:-6},bad:{fx:{danh:-4},r:-4},badT:"Người lục soát thấy hộp thư lạ trong cung ngươi."});
 T7("lc_ao","pro",{r:"fallen",w:c=>["Thu","Đông"].includes(c.sea)?2:0,t:"Mang áo ấm vào lãnh cung cho {A}",h:"“Gió lạnh lùa qua song cửa Trường Môn viện. Nếu còn chút tình xưa, xin gửi cho ta tấm áo bông.”",dl:4,
  s:[G("home","Chuẩn bị áo bông","",100,1,{bac:-15}),G("lc","Mang áo vào lãnh cung","tamco",55,1,{},"b")],ok:{fx:{duc:4},r:15,fn:X=>{ap(X.A.o,{suc:8});return `${X.A.n} Sức +8.`}},no:{r:-5},bad:{fx:{danh:-3,th:-3}},badT:"Người gác bắt gặp, chuyện đến tai Thái hậu."});
 T7("lc_thu","risk",{r:"fallen",rf:v=>(v.rel||0)>=0,t:"Chuyển thư kêu oan của {A} lên Hoàng thượng",h:"“Ta bị đày vào đây, không ai nghe ta nói. Nếu còn thương ta, chuyển giúp bức thư này đến tay Hoàng thượng.”",dl:4,
  s:[G("lc","Nhận thư ở lãnh cung","tamco",60,1,{},"b"),G("","Dâng thư lên Hoàng thượng","sung",40,1,{},"e",{emp:1})],ok:{r:20,d:2,fn:X=>{if(roll(25)){X.A.o.out=false;X.A.o.rank=Math.max(0,(X.A.o.rank||1)-1);return `Hoàng thượng đọc thư, cho ${X.A.n} ra khỏi lãnh cung.`}return "Hoàng thượng đọc thư, im lặng hồi lâu."},x:"có thể (khoảng một phần tư) Hoàng thượng tha nàng ra"},no:{r:-5,fx:{sung:-2}},bad:{fx:{danh:-3,th:-3}},badT:"Người gác bắt gặp ngươi ra vào lãnh cung."});
 T7("ak_me","social",{r:"ak",rf:(k,z)=>!!z.mom&&(k.fond||50)<40,t:"Chuyển lời {A} xin lỗi mẫu thân",h:X=>`“Con lỡ lời làm mẫu thân (${X.A.mom.name}) giận, mấy hôm nay không cho con vào thỉnh an. {Nc} nói giúp con một lời.”`,dl:3,
  s:[G("",X=>`Sang cung ${X.A.mom.name} nói giúp`,"tai",55,1,{},"r",{plf:X=>q72Home({k:"rv",o:X.A.mom})})],ok:{fx:{danh:1},fn:X=>{X.A.o.fond=cl((X.A.o.fond||40)+12,0,100);relAdd(S,X.A.mom,4);return `${X.A.n} và mẫu thân làm lành (quyến luyến +12); ${X.A.mom.name} thân với ngươi +4.`},x:"mẹ con nàng làm lành (+12)"},no:{}});

 /* ===== servants (real loyalty, traits, ages, lovers) ===== */
 T7("mama_nghi","social",{r:"sv",rf:s=>(s.age||0)>=55,t:"Xin cho {A} về nghỉ dưỡng già",h:X=>`“Nô tỳ năm nay ${X.A.o.age} tuổi, hầu hạ trong cung đã mấy chục năm, chân tay rã rời. {Nc} xin giúp nô tỳ về Tây uyển dưỡng già.”`,dl:4,
  s:[G("ksp","Xin Tổng quản ở Kính sự phòng","danh",55,1)],ok:{fx:{duc:3},d:0,fn:X=>{const i=S.staff.indexOf(X.A.o);if(i>=0)S.staff.splice(i,1);return `${X.A.n} rời cung ngươi về Tây uyển dưỡng già.`},x:"nàng rời cung ngươi về dưỡng già"},no:{r:-5}});
 T7("maid_vay","trade",{r:"maid",rf:m=>S.bac<25&&(m.loyal||0)>=55,acc:X=>{apply({bac:30});q72DebtAdd(X.A,-1)},accX:"Bạc +30; ngươi nợ nàng một ân.",t:"Mượn tiền dành dụm của {A}",
  h:"“{Nc} đang túng, nô tỳ có dành dụm được 30 lượng. {Nc} cứ cầm, khi nào có lương thì trả nô tỳ.”",tr:"Nhận lời: ngay Bạc +30, ngươi nợ nàng một ân; trả trước hạn.",dl:6,
  s:[G("home","Trả {A} 30 bạc","",100,1,{bac:-30})],ok:{r:10,d:1},no:{r:-20}});
 T7("sv_luong","social",{r:"sv",rf:s=>(s.loyal||50)<45,t:"{A} xin được thưởng thêm",h:X=>`“Nô ${X.A.o.role==="maid"?"tỳ":"tài"} hầu {N} chăm chỉ mà lương chẳng đủ gửi về nhà. {Nc} thương thì thưởng thêm chút ít.”`,dl:2,
  s:[C("Thưởng",O("Thưởng 15 bạc",{c:{bac:-15}}),O("Hứa xin Tổng quản tăng lương",{t:()=>S.place==="ksp",tw:"phải đến Kính sự phòng",p:50,sk:"danh",lto:"fail"}))],ok:{r:15},no:{r:-6}});
 T7("dt_thu","love",{r:"svm",rf:s=>{const l=loverOf(s);return !!l&&ownerOf(l)&&ownerOf(l)!==S},b:"rsv",bf:(o,z,A)=>A.o.lover===o.sid,t:"Trao túi thơm của {A} cho {B}",
  h:"“{Nc}… {B} hầu ở cung khác, chúng nô tỳ thương nhau đã lâu. Nô tỳ thêu túi thơm này mà không dám tự mang sang. {Nc} giúp nô tỳ.”",dl:4,tr:"Hai người quả có tình với nhau (đối thực).",
  s:[G("B","Trao túi thơm cho {B}","tamco",60,1,{},"b"),C("{B} gửi lại lời",O("Mang lời hồi âm về cho {A}",{}))],ok:{r:15,rb:10},no:{r:-5},bad:{fx:{danh:-3},r:-3},badT:"Có người bắt gặp ngươi trao tín vật, lời ra tiếng vào."});
 T7("dt_hen","love",{r:"svm",rf:s=>!!loverOf(s),t:"Cho {A} gặp người thương một khắc",h:X=>`“${loverOf(X.A.o).name} sắp bị điều đi xa. Nô tỳ chỉ xin một khắc ở cửa sau cung để từ biệt… {Nc} thương nô tỳ.”`,dl:2,
  s:[C("Cửa sau cung",O("Cho phép, sai thái giám canh chừng",{p:75,sk:"mat",lto:"bad"}),O("Ngươi đứng ra canh cửa",{p:85,k:2,lto:"bad"}))],ok:{r:18},no:{r:-4},bad:{fx:{danh:-4},r:-2},badT:"Người tuần đêm bắt gặp, cả cung ngươi bị trách."});
 T7("dt_che","love",{r:"svm",rf:s=>!!loverOf(s)&&liveRivals(true).some(v=>(v.evm&&v.evm.me)>0),t:"Che chuyện tình của {A}",h:"“Có người đang dò chuyện riêng của cung mình, nô tỳ sợ chuyện của nô tỳ bị lôi ra làm cớ hại {N}. {Nc} dạy nô tỳ phải làm sao.”",dl:3,
  s:[C("Chuyện của {A}",O("Bảo hai người tạm thôi gặp nhau một thời gian",{r:-4,w:{tamco:1}}),O("Lo lót người tuần đêm giữ kín",{c:{bac:-20},r:8}))],ok:{r:8},no:{r:-4}});
 T7("xc_mai","love",{r:"svm",rf:s=>(s.age||0)>=24&&!s.lover&&!s.q72fi,b:"man:thị vệ",t:"Mai mối {A} với {B}",h:X=>`“Nô tỳ năm nay ${X.A.o.age}, sắp đến tuổi xuất cung mà chưa có ai. Nô tỳ thầm để ý {B}. {Nc} dò ý giúp nô tỳ.”`,dl:4,
  p:X=>({tru:!(X.B.o.trysts>0)&&roll(70)}),s:[G("B","Dò ý {B}","tai",55,1),C(X=>X.p.tru?"Ngươi biết sự thật: {B} cũng có ý với {A}":"Ngươi biết sự thật: {B} không có ý với {A}",O("Báo thật cho {A}",{}))],
  ok:{r:10,fn:X=>{if(X.p.tru){X.A.o.q72fi=X.B.o.id;return `${X.A.n} và ${X.B.n} thành đôi hẹn ước.`}return ""},ch:"xc_uoc"},no:{r:-3}});
 T7("xc_uoc","love",{fu:1,r:"svm",rf:s=>!!fiM(s),t:"Xin Tổng quản ghi hẹn ước cho {A}",h:X=>`“${fiM(X.A.o).name} muốn đợi nô tỳ đến ngày xuất cung rồi cưới. {Nc} xin Tổng quản ghi tên cho hai người được không ạ?”`,dl:6,
  s:[G("ksp","Xin Tổng quản ghi hẹn ước","danh",55,1,{bac:-20})],ok:{r:20,fx:{duc:2},fn:X=>{const m=fiM(X.A.o);if(m)m.af=(m.af||0)+5;return m?`${m.name} cảm kích ngươi.`:""}},no:{r:-6}});
 T7("xc_hoimon","love",{r:"svm",rf:s=>!!fiM(s)&&(s.age||0)>=24,t:"Góp của hồi môn cho {A}",h:X=>`“Năm sau nô tỳ xuất cung về với ${fiM(X.A.o).name}. Nô tỳ nghèo, chẳng có gì làm của hồi môn.”`,dl:5,
  s:[C("Hồi môn",O("Tặng 30 bạc",{c:{bac:-30}}),O("Thêu cho nàng đôi gối uyên ương",{p:60,sk:"tai",k:2,lto:"stay"}))],ok:{r:20,fx:{duc:2}},no:{r:-4}});
 T7("dong_tam","love",{r:"svm",rf:s=>!!loverOf(s)||!!fiM(s),w:fest(7),t:"Thắt nút đồng tâm Thất tịch cùng {A}",h:"“Đêm Thất tịch, nô tỳ muốn thắt nút đồng tâm gửi người thương mà thiếu chỉ đỏ. {Nc} cho nô tỳ xin ít.”",dl:2,
  s:[G("home","Mua chỉ đỏ","",100,1,{bac:-8}),G("home","Thắt nút cùng {A}","tai",75,1)],ok:{r:10},no:{r:-2}});
 T7("giau_cn","pro",{r:"rsv",rf:(s,z)=>(s.loyal||50)<45&&trs(z.own).some(t=>t==="Hiểm độc"||t==="Kiêu ngạo"),t:"Cứu {A} khỏi chủ cũ",
  h:X=>`“{Nc} cứu nô tỳ! ${X.A.own.name} hễ giận là đánh, lưng nô tỳ chưa lành vết cũ. Cho nô tỳ trốn tạm vài hôm.”`,dl:5,
  s:[W("Giấu {A} trong cung",1),C("Đưa {A} đi đâu",O("Xin Tổng quản cho nàng về hầu cung ngươi",{t:()=>capOk(),tw:"cung ngươi đã đủ người hầu",c:{bac:-20},p:55,sk:"danh",lto:"bad",fn:(X,x,ok)=>{if(!ok)return"";const s=X.A.o,ow=X.A.own;const i=(ow.staff||[]).indexOf(s);if(i>=0)ow.staff.splice(i,1);s.spyFor=null;s.loyal=60;S.staff.push(s);relAdd(S,ow,-6);return `${s.name} về hầu cung ngươi (lòng 60); ${ow.name} mất thiện cảm -6.`}}),
   O("Trả về chủ cũ, xin chủ nương tay",{p:60,sk:"danh",lto:"fail",fn:X=>{relAdd(S,X.A.own,-3);X.A.o.loyal=cl((X.A.o.loyal||40)+10,0,100);return `${X.A.own.name} nương tay; lòng ${X.A.n} với chủ +10.`}}))],
  ok:{fx:{duc:4},r:15},no:{r:-8},bad:{fx:{danh:-3},r:-5,fn:X=>{relAdd(S,X.A.own,-12);return `${X.A.own.name} biết ngươi giấu người của nàng.`},x:"chủ cũ của nàng mất thiện cảm -12"},badT:"Chủ cũ biết chuyện, làm ầm lên."});

 /* ===== the calendar's real festivals and seasons ===== */
 T7("th_thanhminh","craft",{r:"th",w:fest(2,3),t:"Chép kinh cho lễ tảo mộ Thanh minh",h:"“Thanh minh sắp tới, ai gia muốn một bộ kinh Kim Cang chép tay đặt trước lăng tiên đế. Nét chữ phải ngay ngắn, lòng phải thành.”",dl:5,
  s:[G("home","Chép kinh bằng mực vàng","tai",50,2,{suc:-6}),W("Đợi mực khô, đóng bìa",1),G("A","Dâng kinh lên Đức Thọ cung","duc",80,1)],ok:{fx:{duc:2},r:8,ch:"th_kinh2"},no:{r:-6}});
 T7("th_kinh2","craft",{fu:1,r:"th",t:"Chép thêm bộ kinh cho chùa Hộ Quốc",h:"“Bộ kinh lần trước ai gia cho đặt trên bàn thờ. Chùa Hộ Quốc xin một bộ nữa, ai gia nghĩ đến ngươi.”",dl:8,
  s:[G("home","Chép quyển thượng","tai",50,2,{suc:-6}),G("home","Chép quyển hạ","tai",50,2,{suc:-6}),G("A","Dâng kinh","",100,1)],ok:{fx:{duc:3,danh:4},r:10,d:1},no:{r:-8}});
 T7("th_mai","craft",{r:"th",w:fest(12,1),t:"Cắm bình mai Tết cho Đức Thọ cung",h:"“Năm nào ai gia cũng cắm một bình mai đầu năm. Năm nay mắt kém rồi, ngươi chọn cành giúp ai gia.”",dl:3,
  s:[G("vuon","Chọn cành mai đẹp","tai",55,1),G("A","Cắm bình dâng Thái hậu","hoa",65,1)],ok:{fx:{duc:1},r:7},no:{r:-4}});
 T7("th_trungcuu","craft",{r:"th",w:fest(8,9),t:"Ủ rượu hoa cúc Trùng cửu cho Thái hậu",h:"“Tết Trùng cửu, ai gia thèm chén rượu hoa cúc như hồi còn ở nhà. Ngươi ủ giúp ai gia một vò.”",dl:5,
  s:[G("vuon","Hái hoa cúc vàng","",95,1),G("home","Ủ rượu","y",55,1,{bac:-10}),W("Rượu ngấm",1),G("A","Dâng rượu","",100,1)],ok:{r:10,fx:{duc:1}},no:{r:-4}});
 T7("hh_trungthu","craft",{r:"hh",w:fest(7,8),t:"Lo bày biện yến Trung thu",h:"“Yến Trung thu năm nay Hoàng thượng muốn làm lớn. Bổn cung bận, nhờ muội lo phần bày biện và thực đơn.”",dl:5,
  s:[G("home","Lên thực đơn, sắp chỗ ngồi","tai",55,2),C("Bạc yến không đủ",O("Bù bạc riêng",{c:{bac:-40}}),O("Cắt bớt món, khéo bày cho sang",{p:55,sk:"tamco",lto:"fail"})),G("A","Trình Hoàng hậu","danh",80,1)],ok:{fx:{danh:4},r:10},no:{r:-6,fx:{danh:-2}}});
 T7("hh_trungcuu","craft",{r:"hh",w:fest(8,9),rf:()=>!S.thDead,t:"Thêu bình phong mừng thọ Trùng cửu dâng Thái hậu",h:"“Trùng cửu là tết người già. Bổn cung muốn dâng Thái hậu một bức bình phong trăm hoa, nhờ muội thêu khung giữa.”",dl:6,
  s:[G("home","Thêu khung giữa","tai",45,2,{suc:-8}),C("Chỉ vàng thiếu",O("Bỏ bạc mua chỉ vàng Tô Châu",{c:{bac:-30}}),O("Thêu bằng chỉ thường, lấy khéo tay bù",{p:45,sk:"tai",lto:"fail"})),G("A","Mang bình phong sang Càn Ninh cung","",100,1)],ok:{fx:{danh:2,th:2},r:10},no:{r:-6}});
 T7("hh_doanngo","craft",{r:"hh",w:fest(4,5),rf:()=>allKids().some(([k])=>k.alive&&k.age<12),t:"Khâu túi ngũ sắc Đoan ngọ cho các hoàng tử, công chúa",h:"“Đoan ngọ phải đeo túi ngũ sắc trừ tà cho trẻ nhỏ. Các hoàng tử, công chúa đông, bổn cung khâu không xuể.”",dl:4,
  s:[G("home","Khâu túi ngũ sắc","tai",65,2,{bac:-10}),G("A","Mang sang Càn Ninh cung","",100,1)],ok:{r:8,fn:()=>{let n=0;for(const [k] of allKids())if(k.alive&&k.age<12){k.hp=cl((k.hp||80)+3,0,100);n++}return `${n} đứa trẻ đeo túi trừ tà (thể trạng +3).`}},no:{r:-4}});
 T7("th_aodong","craft",{r:"th",w:c=>c.sea==="Đông"?2:0,t:"May áo bông cho cung nhân già",h:"“Trời trở rét, mấy ma ma già trong Đức Thọ cung áo mỏng. Ai gia muốn các phi tần góp tay may áo bông.”",dl:6,
  s:[G("home","Cắt may áo","tai",65,2,{bac:-20}),G("A","Mang áo sang Đức Thọ cung","",100,1)],ok:{fx:{duc:3},r:6},no:{r:-5}});
 T7("akf_den","craft",{r:"akf",w:fest(12,1),t:"Làm đèn lồng Nguyên tiêu cùng {A}",h:"“Tết Nguyên tiêu con muốn treo đèn lồng cho phụ hoàng ngắm. {Nc} giúp con chọn dáng đèn, chọn màu cho đẹp.”",dl:3,
  s:[G("home","Chọn dáng, dán đèn","thi",55,1)],ok:{fx:{danh:2},fn:X=>{X.A.o.tal=cl((X.A.o.tal||40)+2,0,100);return `${X.A.n} tài cán +2.`}},no:{}});
 T7("tv_mua","craft",{r:"man:thị vệ",w:fest(6,7),t:"Xin thuốc trị thương sau Hội Phượng",h:"“Hội Phượng thi cưỡi ngựa bắn cung, đội thần bị thương mấy người, thuốc ở Thái y viện phải có phi tần xin mới cấp. {Nc} thương giúp.”",dl:3,
  s:[G("tyv","Xin thuốc trị thương","danh",65,1,{bac:-15})],ok:{r:12},no:{r:-4}});
 T7("maid_tet","social",{r:"maid",w:fest(12),t:"Gửi quà Tết về nhà cho {A}",h:"“Tết sắp đến, nô tỳ muốn gửi ít quà về cho mẹ mà không có đường ra. {Nc} cho nô tỳ gửi theo người của cung mình.”",dl:2,
  s:[G("home","Gửi quà theo người ra cung","",100,1,{bac:-10})],ok:{r:12},no:{r:-4}});
 T7("kho_tet","court",{r:"eun",w:fest(11,12),t:"Kiểm kê kho lụa cuối năm",h:"“Cuối năm Nội vụ phủ kiểm kho, sổ sách rối như canh hẹ. {Nc} tính toán giỏi, xem giúp nô tài.”",dl:3,
  s:[G("home","Đối chiếu sổ kho","tai",55,2)],ok:{r:10,fx:{bac:15}},no:{r:-4}});
 T7("su_tet","social",{r:"man:sứ thần",w:fest(12,1),rf:()=>!S.thDead&&S.rank>=2,t:"Dẫn sứ thần dâng lễ Tết lên Thái hậu",h:"“Quốc vương nước thần gửi lễ Tết dâng Thái hậu. Thần không rõ lễ nghi trong cung, xin {N} dẫn đường.”",dl:3,
  s:[G("tn","Dâng lễ đúng nghi","danh",65,1)],ok:{fx:{th:3,bac:20},r:8,fn:bien(2),x:"Biên cương +2 (bang giao êm)"},no:{r:-4}});
 T7("akf_xuan","craft",{r:"akf",w:c=>c.sea==="Xuân"?1:0,t:"Dạy {A} điệu múa cho yến xuân",h:"“Yến xuân năm nay con được múa trước phụ hoàng, mà điệu Nghê thường con tập mãi không xong. {Nc} chỉ giúp con.”",dl:5,
  s:[G("home","Chỉ điệu múa","vu",50,2,{suc:-6}),G("vuon","Tập cùng {A} ở vườn ngự","vu",60,1)],ok:{fx:{danh:3},fn:X=>{X.A.o.tal=cl((X.A.o.tal||40)+3,0,100);return `${X.A.n} tài cán +3.`}},no:{}});

 /* ===== her real skills draw the craftsmen (arts levels) ===== */
 T7("tho_hs","craft",{r:"man:họa sư",rf:()=>(S.arts.thi||0)>=2,t:"Đề thơ lên bức tranh dâng Hoàng thượng",h:"“Bức sơn thủy này vẽ xong mà còn trống một góc. Cả cung khen thơ {N}, xin đề giúp mấy câu.”",dl:5,
  s:[G("home","Nghĩ thơ, đề chữ","thi",45,2),G("A","Trao lại tranh cho họa sư","",100,1)],ok:{fx:{tai:2,danh:3},r:8},no:{r:-5}});
 T7("dan_ns","craft",{r:"man:nhạc sư",rf:()=>(S.arts.cam||0)>=2,t:"Dò lại khúc đàn cổ thất truyền",h:"“Thần tìm được bản phổ Quảng Lăng tán, rách mất mấy đoạn. {Nc} tinh thông cầm nghệ, xin cùng thần dò lại.”",dl:6,
  s:[G("home","Dò lại cung đàn","cam",45,2,{suc:-5}),G("A","Đàn thử cho nhạc sư nghe","cam",60,1)],ok:{r:10,fn:art("cam",1),x:"Cầm luyện thêm +1"},no:{r:-5}});
 T7("ns_doi","trade",{r:"man:nhạc sư",rf:()=>(S.arts.cam||0)<3,acc:X=>{addArt("cam",1);q72DebtAdd(X.A,-1)},accX:"Cầm luyện thêm +1; ngươi nợ nhạc sư một ân.",t:"Đổi ơn: ngón đàn của nhạc sư, lời tiến cử của ngươi",
  h:"“Thần xin chỉ {N} ngón vê dây của Quảng Lăng tán. Mai này {N} nhắc tên thần với Hoàng thượng.”",tr:"Nhận lời: ngay Cầm luyện thêm +1, ngươi nợ nhạc sư một ân.",dl:5,
  s:[G("","Tiến cử nhạc sư với Hoàng thượng","sung",50,1,{},"r",{emp:1})],ok:{r:8,d:1},no:{r:-10}});
 T7("hs_hoa","craft",{r:"man:họa sư",rf:()=>(S.arts.hoa||0)>=1,t:"Vẽ chung bức Bách điểu triều phụng",h:"“Bức Bách điểu triều phụng dâng Thái hậu, thần vẽ không kịp. Nghe nói {N} cũng cầm cọ, xin vẽ giúp phần hoa lá.”",dl:5,
  s:[G("home","Vẽ phần hoa lá","hoa",50,2),G("A","Ghép tranh cùng họa sư","",100,1)],ok:{r:8,fn:art("hoa",1),fx:{danh:2}},no:{r:-4}});
 T7("dich_thu","court",{r:"man:sứ thần",rf:()=>S.tai>=50||S.origin.k==="nc",t:"Dịch quốc thư của sứ đoàn",h:"“Thông ngôn của sứ đoàn ngã bệnh, quốc thư phải dâng trong tuần. Nghe nói {N} thông chữ nghĩa…”",dl:4,
  s:[G("home","Dịch thư","tai",45,2)],ok:{r:10,fx:{danh:3,bac:20},fn:bien(1)},no:{r:-4}});
 T7("ak_sach","craft",{r:"ak",rf:k=>(k.tal||50)<55,t:"Tìm bản sách cổ cho {A}",h:"“Thầy chê con học kém. Con muốn đọc bộ Thủy kinh chú bản cổ, chỉ thư phòng hoàng gia còn giữ. {Nc} xin chép giúp con.”",dl:6,
  s:[G("","Xin Hoàng thượng cho chép sách","danh",55,1,{},"r",{emp:1}),G("home","Chép sách","tai",70,2,{suc:-4})],ok:{fx:{tai:2},fn:X=>{X.A.o.tal=cl((X.A.o.tal||40)+5,0,100);return `${X.A.n} tài cán +5.`},x:"{A} tài cán +5"},no:{}});
 T7("ak_co","social",{r:"ak",rf:k=>(k.tal||50)>=55,t:"Đánh cờ cùng {A}",h:"“Con học cờ được ít nước mới, trong cung không ai đánh lại. {Nc} đánh với con một ván.”",dl:3,
  s:[G("vuon","Đánh cờ ở vườn ngự","ky",50,1)],ok:{fx:{danh:1},fn:X=>art("ky",1)()+" "+(()=>{X.A.o.tal=cl((X.A.o.tal||40)+2,0,100);return `${X.A.n} tài cán +2.`})()},no:{}});
 T7("le_hoa","court",{r:"th",b:"akf",bf:k=>!!k.hB,t:"Dạy lễ cho {B} trước ngày xuất giá",h:"“{B} đã hứa gả. Ai gia muốn ngươi dạy con bé lễ nghi nhà chồng, kẻo người ta cười hoàng gia.”",dl:5,
  s:[G("home","Dạy lễ","duc",65,2),G("tn","Đưa {B} sang ra mắt Thái hậu","",100,1)],ok:{r:8,fx:{duc:2},fn:X=>{X.B.o.tal=cl((X.B.o.tal||40)+3,0,100);return `${X.B.n} tài cán +3.`}},no:{r:-4}});

 /* ===== her own house (by origin and the real standing of her father's house) ===== */
 T7("fam_suy","fam",{r:"fam",rf:o=>!!o&&o.pow!=null&&o.pow<45,t:"Thư cha: nhà ta thế suy",h:X=>`“Con gái, nhà ta dạo này thế suy (thế lực ${X.A.o.pow}), kẻ đối đầu chèn ép. Con ở gần Hoàng thượng, nói giúp cha một lời.”`,dl:5,
  s:[G("","Nói giúp nhà với Hoàng thượng","sung",50,1,{},"r",{emp:1})],ok:{r:10,cc:1,fn:X=>pow(X.A.id,5)(),x:"nhà ngươi thế lực +5"},no:{r:-4,cc:1}});
 T7("fam_tt","fam",{r:"fam",rf:()=>S.origin.k==="tt"&&!S.heir&&allKids().some(([k])=>k.alive&&k.sex==="m"&&k.age>=6),t:"Thư cha: dò ý Hoàng thượng việc lập Thái tử",h:"“Con gái, Thái tử chưa lập, triều đình bàn tán đã lâu. Con ở gần Hoàng thượng, dò xem ý ngài nghiêng về ai.”",dl:5,
  s:[G("","Dò ý Hoàng thượng","tamco",45,1,{},"r",{emp:1}),C("Viết thư trả lời cha",O("Kể đúng những gì thấy",{fn:X=>X.A.k==="off"?pow(X.A.id,2)():""}),O("Khuyên cha đừng nhúng tay",{w:{duc:2}}))],ok:{r:10,cc:1},no:{r:-4}});
 T7("fam_dtq","fam",{r:"fam",rf:()=>S.origin.k==="dtq"&&bienLo(55),t:"Thư cha: xin lương thảo cho biên ải",h:X=>`“Biên ải nguy (${TD_().bien}), quân ở Nhạn Môn quan thiếu lương. Sớ của cha bị Hộ bộ ỉm đi. Con thưa với Hoàng thượng giúp cha.”`,dl:5,
  s:[G("","Thưa với Hoàng thượng","sung",50,1,{},"r",{emp:1})],ok:{r:10,fn:bien(5),x:"Biên cương +5",cc:1},no:{r:-4,cc:1}});
 T7("fam_muoi","fam",{r:"fam",rf:()=>S.origin.k==="muoi",w:c=>c.bac<120?2:1,t:"Thư nhà: xin quyền buôn muối ở trấn mới",h:"“Con gái, trấn Lâm An mới mở đường muối. Nhà mình muốn xin giấy phép. Con nhờ người đưa lời đến Hộ bộ.”",dl:5,
  s:[G("ksp","Nhờ Tổng quản đưa lời đến Hộ bộ","tamco",50,1,{bac:-20})],ok:{fx:{bac:80},cc:1,fn:pow("Hộ bộ",1)},no:{}});
 T7("fam_nc","fam",{r:"man:sứ thần",rf:()=>S.origin.k==="nc",t:"Thư phụ vương: xin giảm cống phẩm cho Nam Chiếu",h:"“Công chúa, phụ vương người gửi thư. Năm nay Nam Chiếu mất mùa, xin người tâu với Hoàng đế giảm bớt cống phẩm.”",dl:5,
  s:[G("","Tâu xin Hoàng thượng","sung",45,1,{},"r",{emp:1})],ok:{r:12,fx:{danh:3},cc:1,fn:X=>bien(3)()+" "+kho(-2)(),x:"Biên cương +3, Kho lúa -2"},no:{r:-4,cc:1}});
 T7("fam_bd","fam",{r:"man:sứ thần",rf:()=>S.origin.k==="bd",t:"Thư phụ hãn: xin mở chợ ngựa ở biên ải",h:"“Công chúa, phụ hãn người gửi thư. Mùa đông này tuyết lớn, dân thiếu muối, thiếu trà. Xin người tâu với Hoàng đế cho mở chợ biên, đổi ngựa lấy muối, trà.”",dl:5,
  s:[G("","Tâu xin Hoàng thượng","sung",45,1,{},"r",{emp:1})],ok:{r:12,fx:{danh:3},cc:1,fn:X=>bien(4)()+" "+kho(-1)(),x:"Biên cương +4, Kho lúa -1"},no:{r:-4,cc:1}});
 T7("fam_cn","fam",{r:"rsv",rf:(s,z)=>S.origin.k==="cn"&&(s.loyal||50)<50,t:"Đồng liêu cũ ở Càn Thanh cung nhờ giúp",h:X=>`“Chị còn nhớ em không? Ngày trước mình cùng hầu trà. Giờ em hầu ${X.A.own.name}, bị mắng suốt; chị xin Tổng quản thưởng cho em chút ít.”`,dl:4,
  s:[G("ksp","Xin Tổng quản","danh",55,1,{bac:-15})],ok:{r:18,fx:{mat:1}},no:{r:-6}});
 T7("fam_ch","fam",{r:"th",rf:()=>S.origin.k==="ch",b:"rvk",bf:o=>liveRivals(true).some(u=>u!==o&&aff(u,o)<-15),t:"Thái hậu (cô ngươi) nhờ che chở {B}",h:"“{B} là con nhà thế giao với họ ta. Nó hiền quá, bị người ta bắt nạt. Ngươi là cháu ta, để mắt giúp nó.”",dl:5,
  s:[G("B","Sang thăm {B}","",90,1),G("home","Mời {B} sang chơi, dạy nàng phòng thân","tamco",65,1)],ok:{r:8,rb:12,fn:X=>{ap(X.B.o,{tamco:3});return `${X.B.n} Tâm cơ +3.`}},no:{r:-5}});
 T7("fam_thd","fam",{r:"fam",rf:()=>S.origin.k==="thd",t:"Thư cha: xin sách cho trường làng",h:"“Con ơi, trường làng mình thiếu sách đã lâu. Cha nghe nói trong cung có kho sách thừa. Con xin giúp cha mấy bộ.”",dl:5,
  s:[G("","Xin Hoàng thượng ban sách","tai",55,1,{},"r",{emp:1})],ok:{fx:{duc:3,danh:3}},no:{}});
 T7("fam_td","fam",{r:"fam",rf:()=>S.origin.k==="td"&&S.bac>=50,t:"Tin nhà: người hầu cũ của nhà ngươi túng quẫn",h:"“Tiểu thư, lão bộc còn sống, nay già yếu ở Giang Nam, nhà họ đã không còn ai. Tiểu thư còn nhớ thì gửi chút bạc.”",dl:5,
  s:[G("home","Gom bạc gửi ra","",100,1,{bac:-40}),W("Tin hồi âm",2)],ok:{fx:{duc:3,tamco:2}},no:{}});
 T7("fam_tien","fam",{r:"fam",rf:()=>S.bac<30,t:"Thư nhà: gửi bạc vào cho ngươi",h:"“Nghe nói con trong cung túng thiếu. Nhà gửi vào ít bạc, nhưng phải nhờ thái giám Kính sự phòng lo lót mới qua được cửa cung.”",dl:3,
  s:[G("ksp","Lo lót nhận bạc ở Kính sự phòng","tamco",65,1)],ok:{fx:{bac:50}},no:{}});
})();
