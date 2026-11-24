/* ================= jworldc: COMPOSED WORLD REACTIONS (ORDER THIN P6, owner OD 23/11 ~22:50Z; EVCAT §3 P6) =================
   Seeds (data JWSEEDS in jwsd.js, built from dev/handover/content/thin/wseeds*.md by dev/build/jwsd_build.py; schema reports/thin.md «## API P6»):
   one seed = cause (the REAL cause tag `sub` of a window of kind k) × scope (who in the palace is hit and reacts) × reaction (4 equal-value stances).
   The window itself is untouched (jworld/jworld2: real cause, length, effects on everyone through the gates); when a window of kind k opens (host),
   one fitting seed is drawn through the shared no-repeat memory jnorep (family "wc:<k>", fresh-first across lives, never twice in one life), its
   people are cast from the live roster INSIDE the scope, every NPC of the scope chooses one of the SAME 4 stances by mindPick (law 1 two-way: the
   same step effects on her own stats), and she gets the scene as a second CENTER card of that window (after the kind's own card; one per player).
   The end card adds who chose what. Numbers (law 4): one step = BAL.wc.fx[tier][key]; nothing typed here. Laws 2/3: Σgain == Σloss == tier steps
   per stance (validator dev/test/wseeds_validate.py). Objects stay traceable (law 6c): S.wc.ob {sid,name,owner,trace,turn}.
   The draw (w.x.c) lives in the shared window record S.wwin (host rolls, as every window field); her choice and traces are personal (S.wc). */
(function(){
const WX=window.WORLD_X;if(!WX)return;
const {now,wErr,EVD,liveR,npcPick,mW,pid,byPid,wPresent}=WX;
const host=()=>typeof worldOn!=="function"||worldOn();
const WC={},WCI={};window.WC_SEEDS=WCI;
const STAT=["sung","danh","bac","suc","mat","th","hh","duc","tamco","an"],NPCST=["sung","danh","bac","suc","duc","th"],NETK=new Set(["rv","sv"]);
const XK={hoa:1,day:1,lap:1,hon:1,hau:1,tuyen:1};/* kinds whose window has its own person {X} */
const Bc=()=>BAL.wc;
function wc(){if(!S)return null;const j=S.wc=S.wc||{};j.ob=j.ob||[];j.sh=j.sh||{};j.ch=j.ch||{};return j}
/* the REAL cause tag of a window (what the seed's `sub` must match) */
function wcSub(w){const x=w.x||{},c=String(w.cause||"");switch(w.k){
 case"tang":return x.why||"";case"away":return x.sub||"";case"hoa":return /^Sét/.test(c)?"storm":"lamp";case"dis":return x.sub||"";
 case"tho":return x.who||"";case"day":return x.sex==="m"?"m":"f";case"hau":return x.sub||"";case"phat":return x.big?"big":"small";
 case"cam":return /vu cổ/i.test(c)?"vuco":/ngoại thích/i.test(c)?"ngoai":/[Gg]iặc/.test(c)?"giac":"";default:return""}}
/* the window's own person {X} */
function wcXo(w){const x=w.x||{};try{if(w.k==="tuyen")return (x.n||[]).map(byPid).find(v=>v&&v.alive)||null;
 const id=w.k==="hau"?x.to:x.who;return id==null?null:byPid(id)}catch(e){return null}}
function kOf(r){const k=(r&&r.kind)||"rv";return k.indexOf("man:")===0?"man":k}
function fit(o,r){if(!r||!NETK.has(kOf(r)))return true;let T=[];try{T=tr6(o)||[]}catch(e){T=[]}const any=L=>!L||!L.length||L.some(n=>T.includes(n));return any(r["nết"])&&any(r["lòng"])}
function needsOk(n){n=n||{};if(n.rank_min!=null&&(S.rank||0)<n.rank_min)return false;if(n.rank_max!=null&&(S.rank||0)>n.rank_max)return false;
 if(n.month&&n.month.length&&!n.month.includes(S.month))return false;if(n.not_confined&&S.confined)return false;
 if(n.kids_min!=null&&(S.kids||[]).filter(k=>k.alive).length<n.kids_min)return false;if(n.nights_min!=null&&(S.nights||0)<n.nights_min)return false;return true}
const rkV=v=>{try{return rkOf(v)}catch(e){return v.rank||0}};
/* the scope: the NPC consorts (or servants) the seed hits and who react */
function wcScope(sd,w){const L=liveR().filter(v=>v&&v.alive&&!v.confined&&!v.out),H=Bc().rankHi;try{switch(sd.scope){
 case"house":{const X=wcXo(w);if(!X||X===S||!X.alive)return null;let pal=null;try{pal=palaceOf(X)}catch(e){}return [X].concat(L.filter(v=>v!==X&&pal&&(()=>{try{return palaceOf(v)===pal}catch(e){return false}})()))}
 case"hi":return L.filter(v=>rkV(v)>=H);case"lo":return L.filter(v=>rkV(v)<H);
 case"near":{let pl=null;try{pl=EVD[w.k].place(w)}catch(e){}return pl?wPresent(pl):[]}
 case"kids":return L.filter(v=>(v.kids||[]).some(k=>k&&k.alive));
 case"srv":{const O=[];for(const v of L)for(const s of v.staff||[])if(s)O.push(s);return O}
 default:return L}}catch(e){wErr("wc scope",e);return []}}
/* cast one role (rv inside the scope; fixed people through A6 as j68) */
function wcOne(r,name,P){const k=kOf(r);
 if(k==="rv"){if(P.house&&name==="A"){const o=P.xo;return o&&o!==S&&o.alive&&fit(o,r)?o.id:null}
  const pool=P.sl&&P.scope!=="srv"&&P.scope!=="all"?new Set(P.sl):null;return rv6(v=>(!pool||pool.has(v))&&fit(v,r)&&v!==P.oA);}
 if(k==="sv"){const id=sv6(s=>fit(s,r)&&s!==P.oA);return id==null?null:id}
 if(k==="kid"){const n=kid6(x=>x!==P.oA);return n==null?null:n}
 if(k==="man"){const L=(S.men||[]).filter(m=>m.alive!==false&&m.rw===r.kind.slice(4)&&m!==P.oA);return L.length?pick(L).id:null}
 return A6(k)?0:null}
function wcCast(sd,w){const R=sd.roles||{},c={id:sd.id};const sl=wcScope(sd,w);if(sl==null)return null;
 if(sd.scope!=="srv"&&sd.scope!=="all"&&!sl.length)return null;
 const P={sl,scope:sd.scope,house:sd.scope==="house",xo:wcXo(w)};
 if(XK[w.k]&&/\{X\}/.test(JSON.stringify(sd))&&!P.xo)return null;
 if(R.A){const a=wcOne(R.A,"A",P);if(a==null)return null;c.a0=a;const Y=A6(kOf(R.A),a);if(!Y)return null;P.oA=Y.o}
 if(R.B){const b=wcOne(R.B,"B",P);if(b==null)return null;c.a1=b;const Y=A6(kOf(R.B),b);if(!Y||Y.o===P.oA)return null}
 const ob=sd.object;if(ob&&ob.owner==="X"&&!P.xo)return null;return c}
function wcActors(sd,w,c){const R=sd.roles||{},X={};if(R.A){X.A=A6(kOf(R.A),c.a0);if(!X.A)return null}if(R.B){X.B=A6(kOf(R.B),c.a1);if(!X.B)return null}
 const xo=wcXo(w);X.X=xo?{o:xo,n:xo===S?"ngươi":xo.name}:null;return X}
function fill(t,sd,X){const o=sd.object;let s=String(t||"").replace(/\{O\}/g,o&&o.name?o.name:"").replace(/\{X\}/g,X.X?X.X.n:"");
 try{return e68Fill(s,X)}catch(e){return s}}
/* draw one seed for an opening window (host): fitting, not met this life, fresh-first across lives (P0 family wc:<k>) */
function wcDraw(w){if(!BAL.wc||!Bc().on||!host())return null;const L=(WC[w.k]||[]);if(!L.length)return null;const sub=wcSub(w),fam="wc:"+w.k;
 const C=L.filter(sd=>(!sd.sub||!sd.sub.length||sd.sub.includes(sub))&&needsOk(sd.needs)&&!nrNow(fam,sd.id));if(!C.length)return null;
 const F=nrFresh(fam,C,x=>x.id);const tries=F.slice();
 while(tries.length){const sd=nrPick(fam,tries,x=>x.id,x=>nrSeen(fam,x.id)>0?Bc().seen:1);if(!sd)break;tries.splice(tries.indexOf(sd),1);
  const c=wcCast(sd,w);if(c){nrMark(fam,sd.id);return c}}
 return null}
function stepV(tier,k){const F=Bc().fx[tier]||Bc().fx.m;return F[k]||0}
function val(m,tier,sign){const fx={};let A=0,B=0;for(const[k,n]of Object.entries(m||{})){
 if(STAT.includes(k))fx[k]=(fx[k]||0)+n*stepV(tier,k)*sign;else if(k==="rel.A")A+=n*stepV(tier,"rel")*sign;else if(k==="rel.B")B+=n*stepV(tier,"rel")*sign}return{fx,A,B}}
/* the NPC round: every NPC of the scope picks one of the same 4 stances (mindPick by the stance's npc tag), same steps on her own stats */
function wcRound(sd,w,c){const tier=sd.tier||"m",r=c.r={};const X=wcActors(sd,w,c)||{};const oA=X.A&&X.A.o,oB=X.B&&X.B.o;
 const xo=wcXo(w);const sl=(wcScope(sd,w)||[]).filter(v=>v!==oA&&v!==oB&&v!==S&&v!==xo);/* the window's own person is its subject, not a bystander */for(let i=sl.length-1;i>0;i--){const j=R(i+1);[sl[i],sl[j]]=[sl[j],sl[i]]}
 const srv=sd.scope==="srv";const E=Object.entries(sd.stances||{});
 for(const v of sl.slice(0,Bc().npcMax)){try{
  const O=E.map(([id,st])=>{let wt=1;try{wt=srv?1:mW(v,st.npc)}catch(e){}const bc=(st.loss||{}).bac;if(!srv&&bc&&(v.bac||0)<bc*stepV(tier,"bac"))wt*=Bc().npcCant;return[id,Math.max(.01,wt)]});
  const k=srv?pick(O)[0]:npcPick(v,O);if(!k)continue;(r[k]=r[k]||[]).push(srv?(v.name||""):pid(v));if(srv)continue;
  const st=sd.stances[k];for(const[sg,m]of[[1,st.gain],[-1,st.loss]])for(const[key,n]of Object.entries(m||{})){
   if(NPCST.includes(key)){const d=sg*n*stepV(tier,key);if(key==="duc"&&typeof ducAdd==="function")ducAdd(v,d,"thế sự");else ap(v,{[key]:d})}
   else if(key==="rel.A"&&X.A&&X.A.k==="rv")affAdd(oA,v,sg*n*stepV(tier,"rel"));else if(key==="rel.B"&&X.B&&X.B.k==="rv")affAdd(oB,v,sg*n*stepV(tier,"rel"))}
 }catch(e){wErr("wc round",e)}}return r}
function wcTrace(sd,X,st){const o=sd.object;if(!o)return"";const j=wc();const tr=fill(st.trace||o.trace,sd,X),nm=fill(o.name,sd,X);
 const own=o.owner==="me"?(S.name||"ngươi"):o.owner==="kho"?"Nội vụ phủ":o.owner==="X"?(X.X?X.X.n:""):o.owner==="B"?(X.B?X.B.n:""):(X.A?X.A.n:"");
 j.ob.push({sid:sd.id,name:nm,owner:own,trace:tr,turn:S.turn});if(j.ob.length>Bc().obKeep)j.ob.splice(0,j.ob.length-Bc().obKeep);return `${nm}: ${tr}.`}
function wcOpts(sd,w,X){const tier=sd.tier||"m";return Object.entries(sd.stances||{}).map(([id,st])=>{
 const g=val(st.gain,tier,1),l=val(st.loss,tier,-1);const rr=[];if(X.A&&(g.A+l.A))rr.push([X.A,g.A+l.A]);if(X.B&&(g.B+l.B))rr.push([X.B,g.B+l.B]);
 return c6(fill(st.text,sd,X),{c:l.fx,w:g.fx,r:rr,ok:()=>{try{wc().ch[w.id]=id}catch(e){}return [fill((sd.outcomes||{})[id],sd,X),wcTrace(sd,X,st)].filter(Boolean).join(" ")}})})}
function wcCard(w){const c=w.x&&w.x.c;if(!c)return null;const sd=WCI[c.id];if(!sd)return null;
 if(typeof isSrv==="function"&&isSrv())return null;if(S.out||S.dead)return null;const X=wcActors(sd,w,c);if(!X)return null;
 let nm="";try{nm=window.worldName(w)}catch(e){}
 return{t:nm||"Thế sự trong cung",who:X.A?X.A.f:pEmp(),wwin:1,h:`<p>${fill(sd.news,sd,X)}</p><p>${fill(sd.text,sd,X)}</p>`,opts:wcOpts(sd,w,X)}}
function wcEnd(w){const c=w.x&&w.x.c;if(!c||!c.r)return"";const sd=WCI[c.id];if(!sd)return"";const X=wcActors(sd,w,c)||{};
 const P=[];for(const[k,L]of Object.entries(c.r)){const st=sd.stances[k];if(!st||!L||!L.length)continue;
  const N=L.map(x=>sd.scope==="srv"?x:(()=>{const p=byPid(x);return p&&p!==S?p.name:null})()).filter(Boolean);if(N.length)P.push(`${N.join(", ")}: «${fill(st.text,sd,X)}»`)}
 return P.length?` Trong cung khi ấy — ${P.join("; ")}.`:""}
/* wire every kind (EVD is the ONE registry of jworld/jworld2) */
const PEND=[];
function wcWrap(k){const E=EVD[k];if(!E||E.__wc)return;E.__wc=1;
 const s0=E.start;E.start=function(w){let t="",er=null;try{t=s0?s0.apply(this,arguments):""}catch(e){er=e}try{if(BAL.wc&&Bc().on&&host()){const c=wcDraw(w);if(c){w.x.c=c;wcRound(WCI[c.id],w,c);WCS.draw++}}}catch(e){wErr("wc start "+k,e)}if(er)throw er;return t};
 const e0=E.end;E.end=function(w){const t=e0?e0.apply(this,arguments):"";let x="";try{x=wcEnd(w)}catch(e){wErr("wc end "+k,e)}return (t||"")+x};
 const c0=E.card;E.card=function(w){const m=c0?c0.apply(this,arguments):null;try{if(w&&w.x&&w.x.c)PEND.push(w)}catch(e){}return m}}
function flush(){if(!PEND.length||!S||S.dead)return;const j=wc();let n=0;for(const w of PEND.splice(0)){if(j.sh[w.id])continue;j.sh[w.id]=1;
 let m=null;try{m=wcCard(w)}catch(e){wErr("wc card",e)}if(m){Q.push(m);n++;WCS.show++;try{nrMark("wc:"+w.k,w.x.c.id)}catch(e){}}}
 try{const lo=((S.wwin&&S.wwin.seq)||0)-20;for(const i in j.sh)if(+i<lo)delete j.sh[i];for(const i in j.ch)if(+i<lo)delete j.ch[i]}catch(e){}
 if(n&&$("modal").hidden)showModal()}
const WCS={draw:0,show:0};window.WCS=WCS;
{const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{flush()}catch(e){wErr("wc flush",e)}return r}}
{const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(PEND.length&&!S.mg)flush()}catch(e){}return r}}
function wcReg(sd){if(!sd||sd.type!=="wc"||!sd.id||WCI[sd.id]||!EVD[sd.k])return false;WCI[sd.id]=sd;(WC[sd.k]=WC[sd.k]||[]).push(sd);return true}
try{const L=(typeof JWSEEDS!=="undefined"&&Array.isArray(JWSEEDS))?JWSEEDS:[];for(const sd of L)wcReg(sd);for(const k in EVD)wcWrap(k)}catch(e){console.error("jworldc",e)}
window.wcCount=function(){const by={};for(const k in WC)by[k]=WC[k].length;return{seeds:Object.keys(WCI).length,kinds:by}};
window.WC_X={wcReg,val,wcActors,wcSub,wcXo,wcScope,wcCast,wcDraw,wcRound,wcCard,wcEnd,flush,WC,PEND};
})();
