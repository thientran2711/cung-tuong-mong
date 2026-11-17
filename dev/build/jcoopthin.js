/* jcoopthin: CO-OP THIN GUEST, part A = foundations (review/coop-thin-a; audit dev/handover/reports/coop-thin-guest-audit.md §2-3;
   owner GO 17/11: host-authoritative thin guest, part by part, end state = the guest only displays the host's state).
   NO player-visible change: nothing here acts unless the room's thin level is > 0, and the level stays 0 unless the HOST asks for it
   (dev flag: localStorage "ctm-thin" = n or ?thin=n) AND both seats run the same build that supports it. Solo play never runs any of it.
   API (COOPW.thin = TH):
     TH.CAP                 the highest part this build supports (A = 1, B = 2 … H = 8)
     TH.lvl / TH.on(n)      the room's level (server message "thin") / part n is on: co-op on, not held by the build-match hold
                            (COOPW.hold, dev/site/swreg.js) and TH.lvl >= n
     TH.reg(name,get,set)   one per-player module state the host swaps in withSeat; the core list (used deck Q popIdx popMsg) and the
                            per-player engine state found by the scan of dev/build/j*.js are registered below (TH.REG = the names)
     TH.withSeat(seat,fn)   HOST only: run fn as `seat`: her S (world keys shared by reference, her personal part of emp/cm/men swapped in),
                            her viewer rows (rel/oan/ghen/ev + "me" refs) on every NPC, the host as the friend entry, her registered module
                            state; no render / modal / save inside. What her turn did to the host's entry comes back through TH.bridge.
     TH.seatOf(seat)        the host's stored state of the other seat (built from the room's P[seat] on first use; TH.seatDrop(seat))
     TH.rng(stream)         ROOM RNG: next float of a sfc32 stream seeded by room code + week + stream name; TH.R(n,st) TH.pick(a,st);
                            TH.rlog = the last 200 draws [week, stream, i, value] (a bug report can be replayed)
     TH.snapSend(o) / TH.deltaSend(o)   host: full snapshot / delta (paths changed since the last sent) with versions (Worker t snap/delta)
     TH.view                guest: {v, o} = the host's latest state (snap + deltas; a version gap asks "snapreq")
     TH.doSend(op,args)     guest: an intent (Worker t "do"); TH.onDo(op,fn) host: fn(args,msg) runs in withSeat("b"), then a delta goes out
     TH.selfTest()          host: withSeat round trip for both seats (state before == after) → {ok, ...}
   The snapshot shape grows part by part (part A: date + both persons + NPCs, as a pipe test; nothing reads it on the guest yet). */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.X||typeof COOP!=="object")return;
const X=CW.X,J=X.J,LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}}};
const TH=CW.thin={CAP:1,lvl:0,REG:[],bridge:[],rlog:[],view:null,hv:0,dn:0,dr:null,ctxN:0};
const host=()=>CW.seat==="a";
TH.on=n=>!!(CW.on&&!CW.hold&&TH.lvl>=(n||1));
function want(){let v=null;try{const q=new URLSearchParams(location.search).get("thin");if(q!=null)v=q}catch(e){}if(v==null)v=LS.get("ctm-thin");return Math.max(0,Math.min(TH.CAP,(+v)|0))}
TH.want=want;

/* ---------- 1. room level + capability check ---------- */
function say(){if(!CW.on&&!(COOP.state&&COOP.state.you))return;
 COOP.send({t:"thin",cap:TH.CAP,v:String(window.CTM_BUILD||""),want:host()?want():0})}
TH.say=say;
COOP.on("room",()=>{TH.lvl=0;setTimeout(say,0)});
COOP.on("peer",on=>{if(on)say()});
COOP.on("thin",m=>{const was=TH.lvl;TH.lvl=m&&m.lvl|0;if(TH.lvl&&!was&&host())setTimeout(()=>snapNow(),0)});

/* ---------- 2. per-player module state ---------- */
const REG=[];
TH.reg=function(name,get,set){try{get()}catch(e){return false}/* not a global of this build */if(REG.some(r=>r[0]===name))return true;
 let d;try{d=J(get())}catch(e){d=null}REG.push([name,get,set,d]);TH.REG.push(name);return true};
/* core (j1.js:64): S is handled apart (its world keys are shared); tab/quiet/rid are UI / room-wide */
TH.reg("used",()=>used,v=>{used=v});TH.reg("deck",()=>deck,v=>{deck=v});TH.reg("Q",()=>Q,v=>{Q=v});
TH.reg("popIdx",()=>popIdx,v=>{popIdx=v});TH.reg("popMsg",()=>popMsg,v=>{popMsg=v});
/* per-player engine state at script top level (scan: grep -nE "^(let|var) " dev/build/j*.js; report coop-thin-a.md §2). Ids (rid, sidN)
   are room-wide counters and stay shared; caches of pictures / DOM / UI tabs stay per phone. Module state inside an IIFE cannot be
   reached from here: those modules register themselves when their part moves (the tripwire names them). */
TH.reg("ACTX",()=>ACTX,v=>{ACTX=v});TH.reg("EVHOLD",()=>EVHOLD,v=>{EVHOLD=v});TH.reg("EVLAST",()=>EVLAST,v=>{EVLAST=v});
TH.reg("wkPend",()=>wkPend,v=>{wkPend=v});TH.reg("jointScheme0",()=>jointScheme0,v=>{jointScheme0=v});TH.reg("SUCC_NPC",()=>SUCC_NPC,v=>{SUCC_NPC=v});
TH.reg("NOLUCK",()=>NOLUCK,v=>{NOLUCK=v});TH.reg("FORCE",()=>FORCE,v=>{FORCE=v});TH.reg("EIT_PIL",()=>EIT_PIL,v=>{EIT_PIL=v});
TH.reg("EVB_ART",()=>EVB_ART,v=>{EVB_ART=v});TH.reg("inFlip",()=>inFlip,v=>{inFlip=v});TH.reg("stoleFrom",()=>stoleFrom,v=>{stoleFrom=v});
TH.reg("NLP",()=>NLP,v=>{NLP=v});TH.reg("NLR",()=>NLR,v=>{NLR=v});TH.reg("DEED85",()=>DEED85,v=>{DEED85=v});TH.reg("DT85",()=>DT85,v=>{DT85=v});
TH.reg("TR_DEED",()=>TR_DEED,v=>{TR_DEED=v});TH.reg("K61PASS",()=>K61PASS,v=>{K61PASS=v});

/* ---------- 3. withSeat (host) ---------- */
const ST={};const PID={a:901,b:902};
const plain=o=>o!==null&&typeof o==="object";
/* the personal part of the shared world objects (emp.known, cm CM_P fields, each man's MEN_P fields): taken out / put in */
function persTake(s){const o={kn:null,cm:{},men:{}};
 if(plain(s.emp)){o.kn="known" in s.emp?[s.emp.known]:null;delete s.emp.known}
 if(plain(s.cm))for(const f of X.CM_P)if(f in s.cm){o.cm[f]=s.cm[f];delete s.cm[f]}
 if(Array.isArray(s.men))for(const x of s.men){if(!plain(x)||x.id==null)continue;for(const f of X.MEN_P)if(f in x){(o.men[x.id]=o.men[x.id]||{})[f]=x[f];delete x[f]}}
 return o}
function persPut(s,o){if(!o)return;
 if(plain(s.emp)&&o.kn)s.emp.known=o.kn[0];
 if(plain(s.cm))Object.assign(s.cm,o.cm||{});
 if(Array.isArray(s.men))for(const x of s.men){if(!plain(x)||x.id==null)continue;const p=(o.men||{})[x.id];if(p)Object.assign(x,p)}}
/* viewer swap on one object tree: "me" (the from-seat) → its pid, the to-seat's pid → "me" (keys and the REFF fields' values), one pass.
   Other NPCs / S met inside are not entered (each NPC is swapped once, from the rivals loop). */
function mapView(o,from,to,root,seen,skip){if(!plain(o)||seen.has(o))return;seen.add(o);if(o!==root&&skip.has(o))return;
 if(Array.isArray(o)){for(const x of o)mapView(x,from,to,root,seen,skip);return}
 const ks=Object.keys(o),out=[];
 for(const k of ks){let v=o[k];
  if(X.REFF.includes(k)){if(v==="me")v=from;else if(v===to)v="me";o[k]=v}
  mapView(v,from,to,root,seen,skip);
  if(k==="me")out.push([k,String(from)]);else if(k===String(to))out.push([k,"me"])}
 if(out.length){const vals=out.map(([k])=>o[k]);out.forEach(([k])=>delete o[k]);out.forEach(([,k2],i)=>{o[k2]=vals[i]})}}
const ROWS=[["rel","rl"],["oan","ro"],["ghen","gp"],["ev","ep"]];
/* the viewer rows of one NPC: r.rel… is the viewer's; r.rl[pid]… the other player's (jcoopworld fromCanon) */
function rowsIn(r,from,to){const mk={c:{},a:{},t:{}};
 for(const [f,m] of ROWS){if(!plain(r[m])){r[m]={};mk.c[m]=1}
  if(f in r)r[m][from]=r[f];else mk.a[f]=1;
  if(to in r[m]){r[f]=r[m][to];delete r[m][to]}else{r[f]=0;mk.t[f]=1}}
 return mk}
function rowsOut(r,from,to,mk){mk=mk||{c:{},a:{},t:{}};
 for(const [f,m] of ROWS){if(!plain(r[m]))r[m]={};const cur=r[f];
  if(!(mk.t[f]&&(cur===0||cur==null)))r[m][from]=cur;
  if(mk.a[f]&&!(to in r[m]))delete r[f];else{r[f]=to in r[m]?r[m][to]:0}delete r[m][to];
  if(mk.c[m]&&!Object.keys(r[m]).length)delete r[m]}}
function npcs(){return (rivals||[]).filter(v=>v&&!v.coop)}
function swapView(from,to,mks,wobj){const fp=PID[from],tp=PID[to];const L=npcs(),skip=new Set(L);if(S)skip.add(S);
 const enter=!mks.size;
 for(const r of L){if(enter)mks.set(r,rowsIn(r,fp,tp));else rowsOut(r,fp,tp,mks.get(r))}
 const seen=new Set();for(const r of L)mapView(r,fp,tp,r,seen,skip);
 for(const k of X.W_KEYS)if(wobj&&plain(wobj[k]))mapView(wobj[k],fp,tp,wobj[k],seen,skip)}
/* her stored state: from the room's P[seat] the first time (S = personal keys only, refs as {$r}/{$k}) */
TH.seatOf=function(seat){if(ST[seat])return ST[seat];
 const C=CW.base||COOP.state.C;const P=C&&C.P&&C.P[seat];if(!P||!P.S)return null;
 const s=J(P.S);const pers={kn:[s.empKnown||{}],cm:s.cmP||{},men:s.menP||{}};
 for(const k of ["empKnown","cmP","menP","cnews","heir"])delete s[k];for(const k of X.W_KEYS)delete s[k];
 const g={};for(const r of REG)g[r[0]]=J(r[3]);g.used=0;g.deck=[];g.Q=[];g.popIdx=null;g.popMsg="";
 return ST[seat]={S:s,ok:P.ok||"tt",pers,g,fresh:true,pid:P.pid}};
TH.seatDrop=seat=>{delete ST[seat]};
function fixRefs(s){const kid=n=>{try{return allKids().map(x=>x[0]).find(k=>k.name===n)||null}catch(e){return null}};
 const fix=o=>{if(!plain(o))return o;if(o.$r!=null&&Object.keys(o).length===1)return rivals.find(v=>v.id===o.$r)||null;if(o.$k!=null&&Object.keys(o).length===1)return kid(o.$k);
  for(const k in o)o[k]=fix(o[k]);return o};
 for(const k in s)if(k!=="kids"&&!X.W_KEYS.includes(k))s[k]=fix(s[k])}
function standIn(PA,mine){if(!PA)return null;try{
 if(X.friendSrv(PA)){const m=typeof RV==="function"?RV(PA.S.srv.mid):null;if(m){const v=X.buildFriendSrv(PA);m.staff=m.staff||[];m.staff.push(v);return v}return null}
 const v=X.buildFriend(PA,mine);if(!v)return null;try{rstats(v)}catch(e){}
 /* the bridge baseline is taken AFTER rstats (its derived numbers are not her acts; S.hh etc. are setters on the host's S) */
 if(v.__b){for(const k of X.STAT)v.__b[k]=v[k];v.__b.rel=v.rel;v.__b.oan=v.oan}
 if(v.queen&&typeof qOn==="function"&&!qOn())rivals.unshift(v);else{if(v.queen){v.queen=false;v.rank=Math.min(v.rank,6)}rivals.push(v)}return v}catch(e){console.error("thin standIn",e);return null}}
TH.withSeat=function(seat,fn){
 if(!CW.on||!host())throw new Error("withSeat: host only");
 if(CW.ctx){if(CW.ctx===seat)return fn();throw new Error("withSeat: nested "+CW.ctx+"→"+seat)}
 if(seat===CW.seat)return fn();
 const B=TH.seatOf(seat);if(!B)throw new Error("withSeat: no state for seat "+seat);
 const A={S,g:{},quiet};for(const r of REG)A.g[r[0]]=r[1]();
 let PA=null;try{PA=X.myBlob(ser().S)}catch(e){console.error("thin blob",e)}
 const L=X.pullFriend();const hp=persTake(A.S);const mks=new Map();
 swapView(CW.seat,seat,mks,A.S);persPut(A.S,B.pers);
 const sb=B.S;for(const k of X.W_KEYS){if(k in A.S)sb[k]=A.S[k];else delete sb[k]}
 sb.origin=(typeof ORIGINS!=="undefined"&&ORIGINS.find(o=>o.k===B.ok))||A.S.origin;
 CW.ctx=seat;TH.ctxN++;quiet=true;S=sb;for(const r of REG)if(r[0] in B.g)try{r[2](B.g[r[0]])}catch(e){}
 let v=null;
 try{if(B.fresh){fixRefs(S);B.fresh=false}v=standIn(PA,S);return fn()}
 finally{const sN=S;
  try{for(const r of REG)B.g[r[0]]=r[1]()}catch(e){}
  for(const k of X.W_KEYS){if(k in sN)A.S[k]=sN[k];else delete A.S[k]}
  try{B.ok=sN.origin&&sN.origin.k||B.ok;const ss=ser().S;for(const k of X.W_KEYS)delete ss[k];B.S=ss;B.fresh=true}catch(e){console.error("thin ser",e);B.S=sN}
  const Lb=X.pullFriend();TH.bridge=[];
  for(const [,e] of Lb){if(e!==v||!e.__b)continue;const b=e.__b;
   for(const k of X.STAT)if(typeof e[k]==="number"&&e[k]!==b[k]){TH.bridge.push([k,b[k],e[k]]);A.S[k]=e[k]}
   for(const [f,m] of [["rel","rl"],["oan","ro"]])if(e[f]!==b[f]){A.S[m]=A.S[m]||{};A.S[m][PID[seat]]=e[f];TH.bridge.push([m,b[f],e[f]])}}
  B.pers=persTake(A.S);swapView(seat,CW.seat,mks,A.S);persPut(A.S,hp);X.pushFriend(L);
  CW.ctx=undefined;S=A.S;for(const r of REG)try{r[2](A.g[r[0]])}catch(e){}quiet=A.quiet}};
/* no host screen / save work for the other seat's turn: render, the modal and save stay the host's */
for(const n of ["render","showModal","save"])if(typeof window[n]==="function"){const f=window[n];window[n]=function(){if(CW.ctx)return;return f.apply(this,arguments)}}

/* stable text of the host's whole state (the round-trip check) */
function stable(o){const seen=new WeakSet();return JSON.stringify(o,function(k,v){if(typeof v==="function")return undefined;
 if(plain(v)&&!Array.isArray(v)){if(seen.has(v))return "[cyc]";seen.add(v);const r={};for(const x of Object.keys(v).sort())r[x]=v[x];return r}return v})}
TH.stateText=function(){const d=ser();const g={};for(const r of REG)g[r[0]]=r[1]();return stable({S:d.S,R:d.R,rid,used,deck,Q:typeof serQ==="function"?serQ():Q.length,popIdx,popMsg,g})};
TH.selfTest=function(){const out={ok:false};try{const t0=TH.stateText();
  out.a=TH.withSeat(CW.seat,()=>S.name);out.sameA=TH.stateText()===t0;
  const other=CW.seat==="a"?"b":"a";
  out.b=TH.withSeat(other,()=>({name:S.name,ctx:CW.ctx,host:(rivals.find(v=>v.coop)||{}).name||null,hostId:(rivals.find(v=>v.coop)||{}).id||null,
   friend:rivals.some(v=>v.coop&&v.id===PID[other]),saved:quiet}));
  const t1=TH.stateText();out.sameB=t1===t0;if(!out.sameB){let i=0;while(i<t0.length&&t0[i]===t1[i])i++;out.diffAt=[t0.slice(Math.max(0,i-80),i+80),t1.slice(Math.max(0,i-80),i+80)];try{const a=JSON.parse(t0),b=JSON.parse(t1),P=[];const dd=(x,y,p)=>{if(P.length>=8)return;if(JSON.stringify(x)===JSON.stringify(y))return;if(plain(x)&&plain(y)){for(const k of new Set([...Object.keys(x),...Object.keys(y)]))dd(x[k],y[k],p+"."+k);return}P.push([p,JSON.stringify(x),JSON.stringify(y)].map(z=>String(z).slice(0,200)))};dd(a,b,"");out.paths=P}catch(e){}}
  out.ok=out.sameA&&out.sameB&&out.b.ctx===other&&out.b.hostId===PID[CW.seat]&&!out.b.friend}catch(e){out.err=String(e&&e.stack||e)}return out};

/* ---------- 4. room RNG ---------- */
function h32(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h>>>0}
function sfc32(a,b,c,d){return function(){a>>>=0;b>>>=0;c>>>=0;d>>>=0;let t=(a+b)|0;a=b^(b>>>9);b=(c+(c<<3))|0;c=(c<<21)|(c>>>11);d=(d+1)|0;t=(t+d)|0;c=(c+t)|0;return (t>>>0)/4294967296}}
const RS={};let RW=-1;
TH.rng=function(stream){stream=String(stream||"main");const w=COOP.state.week||0;if(w!==RW){for(const k in RS)delete RS[k];RW=w}
 let s=RS[stream];if(!s){const seed=(COOP.state.room||"solo")+"|"+w+"|"+stream;const f=sfc32(h32(seed),h32(seed+"#1"),h32(seed+"#2"),h32(seed+"#3"));for(let i=0;i<12;i++)f();s=RS[stream]={f,n:0}}
 const x=s.f();s.n++;TH.rlog.push([w,stream,s.n,x]);if(TH.rlog.length>200)TH.rlog.shift();return x};
TH.R=(n,st)=>Math.floor(TH.rng(st)*n);TH.pick=(a,st)=>a[TH.R(a.length,st)];

/* ---------- 5. snapshot / delta (host → server → guest) and intents (guest → server → host) ---------- */
function put(o,path,v,del){const k=path.split(".");let x=o;for(let i=0;i<k.length-1;i++){if(!plain(x[k[i]])){if(del)return;x[k[i]]={}}x=x[k[i]]}if(del)delete x[k[k.length-1]];else x[k[k.length-1]]=v}
const BADK=/^(__proto__|constructor|prototype)$/;
/* paths whose value changed between a and b (plain objects entered; arrays and other values travel whole) */
function diff(a,b,pre,set,del){for(const k of Object.keys(b)){if(BADK.test(k)||k.includes("."))continue;const p=pre+k,x=a[k],y=b[k];
  if(plain(x)&&plain(y)&&!Array.isArray(x)&&!Array.isArray(y))diff(x,y,p+".",set,del);else if(!(k in a)||JSON.stringify(x)!==JSON.stringify(y))set[p]=J(y)}
 for(const k of Object.keys(a))if(!(k in b)&&!BADK.test(k)&&!k.includes("."))del.push(pre+k)}
TH.diff=(a,b)=>{const set={},del=[];diff(a||{},b||{},"",set,del);return {set,del}};
let lastSent=null;
TH.snapSend=function(o){if(!host()||!TH.on(1))return false;lastSent=J(o);TH.hv++;return COOP.send({t:"snap",v:TH.hv,o:lastSent})};
TH.deltaSend=function(o){if(!host()||!TH.on(1))return false;if(!lastSent)return TH.snapSend(o);const d=TH.diff(lastSent,o);
 if(!Object.keys(d.set).length&&!d.del.length)return false;lastSent=J(o);const base=TH.hv;TH.hv++;return COOP.send({t:"delta",v:TH.hv,base,set:d.set,del:d.del})};
/* part A pipe: what the host sends (grows per part) */
TH.hostView=function(){if(!S)return null;const d=ser();let b=null;try{const B=TH.seatOf(CW.seat==="a"?"b":"a");b=B&&J(B.S)}catch(e){}
 return {w:COOP.state.week||0,buoi:S.buoi||0,P:{a:d.S,b},R:d.R,rid,dn:TH.dn,dr:TH.dr}};
function snapNow(){try{const o=TH.hostView();if(o)TH.snapSend(o)}catch(e){console.error("thin snap",e)}}
let dT=0;function deltaSoon(ms){clearTimeout(dT);dT=setTimeout(()=>{try{const o=TH.hostView();if(o)TH.deltaSend(o)}catch(e){console.error("thin delta",e)}},ms==null?1200:ms)}
TH.flush=()=>{clearTimeout(dT);try{const o=TH.hostView();if(o)TH.deltaSend(o)}catch(e){console.error(e)}};
COOP.on("error",m=>{if(!m)return;if(m.code==="snapresync"&&host()&&TH.on(1)){TH.hv=Math.max(TH.hv,m.v|0);snapNow()}});
COOP.on("week",()=>{if(host()&&TH.on(1))setTimeout(snapNow,0)});
if(typeof render==="function"){const f=render;render=function(){const r=f.apply(this,arguments);try{if(!CW.ctx&&host()&&TH.on(1))deltaSoon()}catch(e){}return r}}
/* guest: the host's state as she receives it */
COOP.on("snap",m=>{if(host()||!m||!m.o)return;TH.view={v:m.v|0,o:m.o};COOP.emit("thinview",TH.view)});
COOP.on("delta",m=>{if(host()||!m)return;const V=TH.view;if(!V||V.v!==(m.base|0)){COOP.send({t:"snapreq"});return}
 for(const p in m.set||{}){if(p.split(".").some(k=>BADK.test(k)))continue;put(V.o,p,m.set[p],false)}for(const p of m.del||[])put(V.o,String(p),null,true);
 V.v=m.v|0;COOP.emit("thinview",V)});
/* intents */
const DO={};let doN=0;
TH.onDo=(op,fn)=>{DO[op]=fn};
TH.doSend=function(op,args){if(host()||!TH.on(1))return false;const id="d"+Date.now().toString(36)+"-"+(doN++);COOP.send({t:"do",op,args:args===undefined?null:args,base:TH.view?TH.view.v:0,id});return id};
COOP.on("do",m=>{if(!host()||!m||!TH.on(1))return;const fn=DO[m.op];let r=null;
 try{if(fn)r=TH.withSeat(m.from||"b",()=>fn(m.args,m))}catch(e){console.error("thin do",m.op,e);r={err:String(e&&e.message||e)}}
 TH.dn=m.n|0;TH.dr={id:m.id,op:m.op,r:r===undefined?null:J(r)};deltaSoon(0)});
/* part A test intent: read her person in context b (no change) */
TH.onDo("probe",()=>({name:S.name,used,ctx:CW.ctx,host:(rivals.find(v=>v.coop)||{}).id||null}));
}catch(e){console.error("jcoopthin",e)}})();
