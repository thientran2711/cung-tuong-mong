/* jcoopthinc: CO-OP THIN GUEST, part C = THE WORLD IS READ-ONLY ON THE GUEST (review/coop-thin-c; audit coop-thin-guest §3 row C,
   owner GO 17/11 ~01:40Z, no option-1 patching ~02:05Z). Behind the room level: TH.on(3), on only when BOTH seats run a build with it
   (Worker: level = min(want, cap a, cap b), same build id). Solo and rooms below level 3 run nothing here.
   ONE rule, ONE place: on the guest the world (every NPC entry, the NPC list, the world keys of S) is a LENS over the host's world:
     - a write can never land in it. Each write goes into the open FRAME (copy-on-write); code inside the frame reads its own writes;
     - a WORLD frame (the guest's endTurn / nextBuoi / monthTick, every server message, render) is DROPPED at its end: the world is the
       host's, computed once there;
     - an ACT frame (her act: runAct with her as the actor, a dialog choice, any other tap) becomes NPC OPS at its end: per NPC / world key
       {base, after} (generic: numbers, rows, inv / staff / kids arrays, flags, new persons); the host applies them in her context with a
       3-way rule (a number moves by her delta on top of the host's current value; anything else she changed wins; array members by id),
       then its delta comes back and her screen shows it;
     - her own parts of the world keys (emp.known, cm seen/spy/thDrop/hhDrop, each man's tinh/letters/…: jcoopworld CM_P / MEN_P) are
       her person, written as before.
   The world on her phone changes ONLY from the host: the merged week (fromCanon) and the world delta after every host step
   (TH.view → worldApply, in place, so cards that hold an NPC keep it). Her week end carries the room's world unchanged (CW.cW), so the
   server merge takes W from the host only (merge3: host + 0).
   Who rolls: NPCs act on the host only. G7 moved: an NPC's buổi act aimed at HER is rolled by the host with her entry in the harem
   (B4 pattern: items / children as res ops, numbers with her week); on the guest an NPC never acts (runAct with an NPC actor = nothing).
   Persons she causes (her maid rises, Tiến cử, new girl…): her act's frame shows a new NPC in the list → op "add"; the host makes the
   person in the one world with the same id when it is free (else the next free id, answered back), so no temp ids (jcoopask is off here).
   Retired in a C room (bypassed through this one switch; the code is deleted when level ≥ 3 becomes the default — report coop-thin-c.md):
   guestNet / unroll / netWrap, the HOST_ONLY copies in toCanon, the merge's numeric add for W, D's row tracking (D.rvIn/rvOut + nv patches),
   part B's "host keeps the old rows" (the host world takes her new rows), jcoopask temp ids + requests.
   API: TH.C = {on, gOn, stat, frame(kind,fn), flush(), apply(o), ops: last sent, seen: last applied}. */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.X||typeof COOP!=="object")return;
const TH=CW.thin,X=CW.X,J=X.J;
const host=()=>CW.seat==="a";
const on=()=>thinW();/* the ONE switch (jcoopworld thinW / stateOn / oldRan) */
const gOn=()=>on()&&!host()&&!!CW.seat;
/* the lens is on her list (installed by fromCanon / relens): while it is, every write goes through a frame even if the level reads 0 for a
   moment (COOPW.hold: the two builds differ until both reopen); her ops wait in the queue until the room is on again */
const lOn=()=>gOn()||!!(CW.on&&!host()&&C&&C.Rraw&&typeof rivals!=="undefined"&&rivals&&rivals[LENS]);
const plain=o=>o!==null&&typeof o==="object";
const LENS=Symbol.for("ctm.lens"),RAW=Symbol.for("ctm.lens.raw");
const C=TH.C={on,gOn,stat:{drop:0,dropW:0,act:0,ops:0,sent:0,applied:0,addN:0,addRe:0,world:0,frames:0,implicit:0,npcActOff:0,pickOff:0},ops:[],seen:null,log:[]};
const lg=x=>{C.log.push(x);if(C.log.length>60)C.log.shift()};

/* ---------- 1. the lens ---------- */
/* frames: a stack; each holds copy-on-write copies of the raw objects written inside it (raw → copy) and the roots it touched */
const FR=[];
const PXM=new WeakMap();      /* raw → its lens proxy (one proxy per object: identity holds) */
const META=new WeakMap();     /* raw → {root, path} root = NPC id | "R" (the list) | "W.<key>" */
const CMP=new Set(X.CM_P),MNP=new Set(X.MEN_P);
/* her own part of a world key: emp.known, cm.<CM_P>, men[i].<MEN_P> (paths below the key) */
function personal(m,k){if(!m||typeof m.root!=="string"||m.root[0]!=="W")return false;const r=m.root.slice(2),p=m.path;
 if(r==="emp")return p.length===0&&k==="known"||p[0]==="known";
 if(r==="cm")return p.length===0&&CMP.has(k)||p.length>0&&CMP.has(p[0]);
 if(r==="men")return p.length===1&&MNP.has(k)||p.length>1&&MNP.has(p[1]);
 return false}
function cur(t){for(let i=FR.length-1;i>=0;i--){const c=FR[i].cow.get(t);if(c)return c}return t}
function sync(){return !!(CW.inFC||C.inApply)}
function cow(t){let F=FR[FR.length-1];if(!F){F=open("act",true)}let c=F.cow.get(t);if(c)return c;const b=cur(t);
 c=Array.isArray(b)?b.slice():Object.assign(Object.create(Object.getPrototypeOf(b)),b);F.cow.set(t,c);const m=META.get(t);if(m)F.roots.add(m.root);return c}
function lp(raw,root,path){if(!plain(raw)||raw[LENS])return raw;let p=PXM.get(raw);if(p)return p;
 if(!META.has(raw))META.set(raw,{root,path:path||[]});const me=META.get(raw);
 p=new Proxy(raw,{
  get(t,k){if(k===LENS)return true;if(k===RAW)return t;const o=cur(t);const v=Reflect.get(o,k);
   if(typeof k==="symbol"||!plain(v)||typeof v==="function")return v;
   if(me.root==="R"&&me.path.length===0){if(v.coop)return v;return lp(v,v.id,[])}   /* the list: each NPC is its own root; the friend entry is not the world */
   if(personal(me,k))return v;
   return lp(v,me.root,me.path.concat([k]))},
  set(t,k,v){v=unl(v);/* the raw world holds raw objects; reads wrap them again */
   if(sync()||personal(me,k)){/* the sync layer (host's world in) or her own part: lands as written */const o=cur(t);o[k]=v;if(o!==t&&!FR.length)t[k]=v;return true}
   const o=cow(t);o[k]=v;C.stat.ops++;return true},
  deleteProperty(t,k){if(sync()||personal(me,k)){delete cur(t)[k];return true}const o=cow(t);delete o[k];return true},
  defineProperty(t,k,d){if(sync()||personal(me,k))return Reflect.defineProperty(cur(t),k,d);const o=cow(t);return Reflect.defineProperty(o,k,d)},
  has(t,k){if(k===LENS||k===RAW)return true;return k in cur(t)},
  ownKeys(t){return Reflect.ownKeys(cur(t))},
  getOwnPropertyDescriptor(t,k){const o=cur(t);const d=Reflect.getOwnPropertyDescriptor(o,k);if(!d)return d;
   const td=Reflect.getOwnPropertyDescriptor(t,k);if(!td||td.configurable)d.configurable=true;else d.configurable=false;return d}});
 PXM.set(raw,p);return p}
const unl=v=>v&&v[LENS]?v[RAW]:v;
C.raw=unl;

/* the world keys of S: accessors over a lens of the host's value (the guest's S is her person; these keys are the world's) */
let WB=null;   /* raw values of the world keys (the host's, in her perspective, with her own parts) */
/* fresh = a new S (fromCanon / relens): the backing values start from its own keys; else (the host's world in) only keys it lacks get an accessor */
function lensW(fresh){if(!gOn()||!S)return;const s=S;if(fresh||!WB)WB={};
 for(const k of X.W_KEYS){const d=Object.getOwnPropertyDescriptor(s,k);if(d&&d.get&&d.get.__lens)continue;if(d)WB[k]=s[k];/* a key her S lacks gets the accessor too: a world key her loop creates (monthTick S.storms) lands in the frame, never on her S */
  const key=k;const g=function(){const F=topW(key);const v=F?F.v:WB[key];return plain(v)?lp(v,"W."+key,[]):v};g.__lens=1;
  const st=function(v){v=unl(v);if(sync()){WB[key]=v;return}let F=FR[FR.length-1];if(!F)F=open("act",true);F.w[key]={v};F.roots.add("W."+key);C.stat.ops++};st.__lens=1;
  Object.defineProperty(s,k,{get:g,set:st,enumerable:true,configurable:true})}}
function topW(k){for(let i=FR.length-1;i>=0;i--)if(k in FR[i].w)return FR[i].w[k];return null}
CW.lensW=()=>lensW(true);
/* the NPC list for deser (jcoopworld fromCanon0): raw array, every NPC a lens; the friend entry (the other player's person) is not the world */
CW.lensR=function(R){if(!gOn()||!Array.isArray(R))return R;C.Rraw=R;return lp(R,"R",[])};
C.isLens=x=>!!(x&&x[LENS]);

/* ---------- 2. frames ---------- */
function open(kind,implicit){const F={kind,cow:new Map(),w:{},roots:new Set(),implicit:!!implicit,t:Date.now()};FR.push(F);C.stat.frames++;
 if(implicit){C.stat.implicit++;queueMicrotask(()=>{const i=FR.indexOf(F);if(i<0)return;while(FR.length>i+1)close(FR[FR.length-1]);close(F)})}return F}
function close(F){const i=FR.lastIndexOf(F);if(i<0)return;while(FR.length>i+1)close(FR[FR.length-1]);
 let ops=null;if(F.kind==="act"&&F.roots.size){try{ops=opsOf(F);if(F.implicit){/* display code (figUsed fidUsed, k61 thO …) writing world keys outside her acts: dropped */const n=ops.length;ops=ops.filter(o=>o.t!=="w");C.stat.dropIW=(C.stat.dropIW||0)+n-ops.length}}catch(e){console.error("lens ops",e)}}
 let rows=null;if(F.kind!=="act"&&F.roots.size){try{rows=rowsOf(F)}catch(e){console.error("lens rows",e)}}
 FR.pop();
 if(F.kind!=="act"){if(F.roots.size){C.stat.drop++;C.stat.dropW+=F.roots.size}if(rows&&rows.length){C.stat.rows=(C.stat.rows||0)+rows.length;send(rows)}return}
 if(ops&&ops.length){C.stat.act++;send(ops)}}
/* run fn inside a frame (kind "world" drops, "act" sends); an implicit act frame still open is closed first (its ops go out) */
C.frame=function(kind,fn,self,args){if(!lOn())return fn.apply(self,args||[]);
 const F=open(kind,false);try{return fn.apply(self,args||[])}finally{close(F)}};
C.flush=()=>{while(FR.length)close(FR[FR.length-1])};

/* the ops of an act frame: per root, the value before the frame (outer view) and after (this frame's view) */
function snapRoot(root,outer){const F=outer?FR.slice(0,-1):FR.slice();const save=FR.splice(0);FR.push(...F);try{
  if(root==="R")return ids();
  if(typeof root==="string"&&root[0]==="W"){const k=root.slice(2);const f=topW(k);const v=f?f.v:WB?WB[k]:undefined;return J(plain(v)?lp(v,root,[]):v)}
  const v=lp(C.Rraw||[],"R",[]).find(x=>x&&x.id===root);return v?noHH(J(v)):null}finally{FR.splice(0);FR.push(...save)}}
/* hh = the Empress's row toward this NPC, a bound accessor (j24 hhBind): derived from the world, never an op */
function noHH(o){if(plain(o))delete o.hh;return o}
function ids(){const L=lp(C.Rraw||[],"R",[]);const o=[];for(const v of L)if(v&&!v.coop)o.push(v.id);return o}
function stripW(k,v){/* her own parts never travel as a world op */if(!plain(v))return v;v=J(v);
 if(k==="emp"&&plain(v))delete v.known;if(k==="cm")for(const f of CMP)delete v[f];if(k==="men"&&Array.isArray(v))for(const x of v)if(plain(x))for(const f of MNP)delete x[f];return v}
function opsOf(F){const out=[];
 for(const root of F.roots){
  if(root==="R"){const b=snapRoot("R",true),a=snapRoot("R",false);const add=a.filter(id=>!b.includes(id)),rm=b.filter(id=>!a.includes(id));
   for(const id of add){const v=snapRoot(id,false);if(v)out.push({t:"add",id,a:v})}for(const id of rm)out.push({t:"rm",id});continue}
  if(typeof root==="string"&&root[0]==="W"){const k=root.slice(2);const b=stripW(k,snapRoot(root,true)),a=stripW(k,snapRoot(root,false));
   if(JSON.stringify(a)!==JSON.stringify(b)){const [pb,pa]=prune(b,a);out.push({t:"w",k,b:pb,a:pa})}continue}
  const b=snapRoot(root,true),a=snapRoot(root,false);if(!b||!a)continue;if(JSON.stringify(a)!==JSON.stringify(b)){const [pb,pa]=prune(b,a);out.push({t:"npc",id:root,b:pb,a:pa})}}
 /* a person added in this frame is sent whole once ("add"), not as an npc op too */
 const added=new Set(out.filter(o=>o.t==="add").map(o=>o.id));return out.filter(o=>!(o.t==="npc"&&added.has(o.id)))}
/* an op carries only what changed (the Worker takes one intent up to DOMAX = 20 000 chars; a whole NPC with its memories is ~10 000):
   plain objects are cut to the keys whose value differs, recursively; arrays and values travel whole. The host's 3-way rule (m3) reads a
   missing key as "she did not touch it" (keeps the host's), a key only in b as "she removed it", a key only in a as "she added it". */
function prune(b,a){if(!plain(b)||!plain(a)||Array.isArray(b)||Array.isArray(a))return [b,a];const ob={},oa={};
 for(const k of new Set([...Object.keys(b),...Object.keys(a)])){const inB=k in b,inA=k in a;
  if(inB&&inA){if(JSON.stringify(b[k])===JSON.stringify(a[k]))continue;const [x,y]=prune(b[k],a[k]);ob[k]=x;oa[k]=y}else if(inB)ob[k]=b[k];else oa[k]=a[k]}
 return [ob,oa]}
C.prune=prune;
/* an op too big for one intent is cut by keys (each part is a valid op: m3 treats keys apart); a value that alone exceeds the cap
   (one huge array) cannot be cut: counted (stat.big) and sent, the Worker answers "bado" (stat.bado; the tests assert 0) */
const CAP=17000,len=x=>JSON.stringify(x).length;
function split(op){if(len(op)<=CAP||op.t==="add"||op.t==="rm"||op.t==="rows")return [op];
 const cut=(b,a,wrap)=>{/* wrap(b,a) builds the op for a sub-part */const one=wrap(b,a);if(len(one)<=CAP)return [one];
  if(!plain(a)||!plain(b)||Array.isArray(a)||Array.isArray(b)){C.stat.big=(C.stat.big||0)+1;return [one]}
  const out=[];let cb={},ca={};const flush=()=>{if(Object.keys(cb).length||Object.keys(ca).length)out.push(wrap(cb,ca));cb={};ca={}};
  for(const k of new Set([...Object.keys(b),...Object.keys(a)])){const pb={},pa={};if(k in b)pb[k]=b[k];if(k in a)pa[k]=a[k];
   if(len(wrap(pb,pa))>CAP){flush();for(const x of cut(k in b?b[k]:{},k in a?a[k]:{},(sb,sa)=>{const ob={},oa={};if(k in b)ob[k]=sb;if(k in a)oa[k]=sa;return wrap(ob,oa)}))out.push(x);continue}
   const tb=Object.assign({},cb,pb),ta=Object.assign({},ca,pa);if(len(wrap(tb,ta))>CAP){flush();Object.assign(cb,pb);Object.assign(ca,pa)}else{cb=tb;ca=ta}}
  flush();return out};
 return cut(op.b,op.a,(b,a)=>Object.assign({},op,{b,a}))}
C.split=split;
/* her own viewer rows on each NPC her week touched (the per-player rows rl/ro/gp/ep/evm[902] of the world: hers, as before part C) */
const RW=["rel","oan","ghen","ev"];
function rowsOf(F){const out=[];for(const root of F.roots){if(typeof root!=="number")continue;const b=snapRoot(root,true),a=snapRoot(root,false);if(!b||!a)continue;const d={};
  for(const f of RW){const x=(+a[f]||0)-(+b[f]||0);if(x)d[f]=x}const em=((a.evm&&+a.evm.me)||0)-((b.evm&&+b.evm.me)||0);if(em)d["evm.me"]=em;
  if(Object.keys(d).length)out.push({t:"rows",id:root,d})}return out}
let SQ=[],sT=0;
function send(ops){if(ops.length){C.ops=ops;C.stat.sent++}SQ.push(...ops);clearTimeout(sT);sT=setTimeout(()=>{const L=SQ.splice(0);if(!L.length)return;
  /* packs under the intent cap, in order (an "add" and the ops after it stay in the order she made them) */
  const P=[];let cur=[],n=0;for(const o of L)for(const x of split(o)){const l=len(x)+1;if(cur.length&&n+l>CAP){P.push(cur);cur=[];n=0}cur.push(x);n+=l}if(cur.length)P.push(cur);
  if(!TH.on(1)||COOP.frozen){/* the room holds (two builds), reconnects or the host is away (frozen): keep them, in order */SQ.unshift(...L);C.stat.wait=(C.stat.wait||0)+1;sT=setTimeout(()=>send([]),1000);return}
  for(const ops of P){const id=TH.doSend("npc",{ops,w:COOP.state.week||0});if(!id){lg(["send-fail",ops.length]);C.stat.fail=(C.stat.fail||0)+1;SQ.push(...ops);sT=setTimeout(()=>send([]),1000);continue}
   C.lastId=id;C.stat.packs=(C.stat.packs||0)+1;PD.set(id,ops);if(PD.size>40)PD.delete(PD.keys().next().value);lg(["sent",id,ops.map(o=>o.t+":"+(o.id!=null?o.id:o.k)).join(",")])}},0)}
/* review r1: a pack the Worker could not hand to the host (nohost: his socket closed between her act and the send) was never applied:
   it goes back in the queue, in order, and is sent again when the room is on (before: lost, her act's NPC effect silently gone) */
const PD=new Map();
COOP.on("thinview",V=>{try{const d=V&&V.o&&V.o.dr;if(d&&d.op==="npc")PD.delete(d.id)}catch(e){}});
/* the Worker refused an intent (too big / bad): counted, never silent */
COOP.on("error",m=>{try{if(!gOn()||!m)return;if(m.code==="bado"){C.stat.bado=(C.stat.bado||0)+1;lg(["bado",m.id]);PD.delete(m.id);return}
 if((m.code==="nohost"||m.code==="nothin")&&PD.has(m.id)){const ops=PD.get(m.id);PD.delete(m.id);C.stat.resend=(C.stat.resend||0)+1;lg(["resend",m.id,m.code]);SQ.unshift(...ops);clearTimeout(sT);sT=setTimeout(()=>send([]),1000)}}catch(e){}});

/* frames on the guest's engine entries (this module loads last but one: these wrappers are outermost) */
function wrapF(n,kind,cond){const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(!lOn()||(cond&&!cond.apply(this,arguments)))return f.apply(this,arguments);
 /* an implicit act frame (writes outside any frame) is closed first: its ops go out, then the world step. An EXPLICIT act (runAct,
    chooseM) stays open: a render or a buổi step it calls runs as a world frame on top of it (reads see the act's writes, its own writes
    are dropped) and the act's ops go out whole at its end (before: render inside kpoison / kframe closed the act, the rest went implicit) */
 if(kind==="world")C.flushImp();return C.frame(kind,f,this,arguments)}}
C.flushAct=()=>{while(FR.length&&FR[FR.length-1].kind==="act")close(FR[FR.length-1])};
C.flushImp=()=>{while(FR.length&&FR[FR.length-1].kind==="act"&&FR[FR.length-1].implicit)close(FR[FR.length-1])};
for(const n of ["endTurn","nextBuoi","monthTick","render"])wrapF(n,"world");
wrapF("chooseM","act");
/* her act (she is the actor): its own frame, so the ops go out with that act; an NPC act on the guest: nothing (NPCs act on the host) */
{const f=runAct;runAct=function(a){if(!lOn())return f.apply(this,arguments);if(a===S||(a&&a[RAW]===S))return C.frame("act",f,this,arguments);
 if(a&&!a.coop){C.stat.npcActOff++;return ""}return f.apply(this,arguments)}}
/* G7: on the guest no NPC picks a target (the host rolls NPC buổi acts aimed at her, with her entry in the harem) */
if(typeof pickTarget==="function"){const f=pickTarget;pickTarget=function(){if(gOn()){C.stat.pickOff++;return null}return f.apply(this,arguments)}}
/* every server message is a sync step on the guest: a world write made while handling it is the old relay path (the host's world comes as a whole) */
COOP.rxWrap=function(go,m){if(!lOn())return go();C.flushImp();const F=open("world",false);try{return go()}finally{close(F)}};

/* ---------- 3. the host's world in, on the guest (merged week = fromCanon; between weeks = the host's delta) ---------- */
/* host perspective (rows rel/oan/ghen/ev = the host's; "me" = 901) → canonical (jcoopworld toCanon) → hers (fromCanon) */
const HP=901,GP=902;
function npcMine(r){r=J(r);r.rl=r.rl||{};r.ro=r.ro||{};r.gp=r.gp||{};r.ep=r.ep||{};r.evm=r.evm||{};
 r.rl[HP]=r.rel||0;r.ro[HP]=r.oan||0;r.gp[HP]=r.ghen||0;r.ep[HP]=r.ev||0;delete r.rel;delete r.oan;delete r.ghen;delete r.ev;if(r.staff)r.staff=r.staff.filter(s=>!s.coop);
 X.mapMe(r,true,HP);r.rel=r.rl[GP]||0;r.oan=r.ro[GP]||0;r.ghen=r.gp[GP]||0;r.ev=r.ep[GP]||0;delete r.rl[GP];delete r.ro[GP];delete r.gp[GP];delete r.ep[GP];return X.mapMe(r,false,GP)}
function wMine(k,v){if(!plain(v))return J(v);v=J(v);if(k==="emp")delete v.known;if(k==="cm")for(const f of CMP)delete v[f];if(k==="men"&&Array.isArray(v))for(const x of v)if(plain(x))for(const f of MNP)delete x[f];
 const o={x:v};X.mapMe(o,true,HP);X.mapMe(o,false,GP);return o.x}
/* replace the content of a raw object in place (identity kept: a card holding this NPC sees the host's numbers) */
function into(t,n){const acc=k=>{const d=Object.getOwnPropertyDescriptor(t,k);return !!(d&&(d.get||d.set))};/* bound fields (hh) stay bound */
 for(const k of Object.keys(t))if(!(k in n)&&!acc(k))delete t[k];for(const k of Object.keys(n))if(!acc(k))t[k]=n[k]}
function keepMine(k,nv,ov){if(!plain(ov)||!plain(nv))return nv;
 if(k==="emp"&&"known" in ov)nv.known=ov.known;
 if(k==="cm")for(const f of CMP)if(f in ov)nv[f]=ov[f];
 if(k==="men"&&Array.isArray(nv)&&Array.isArray(ov)){const m=new Map(ov.filter(plain).map(x=>[x.id,x]));for(const x of nv){if(!plain(x))continue;const o=m.get(x.id);
  if(o){for(const f of MNP)if(f in o)x[f]=o[f]}else{if(x.tinh==null)x.tinh=0;if(x.letters==null)x.letters=0;if(x.trysts==null)x.trysts=0;if(x.af==null)x.af=0;if(!x.knowsMe)x.knowsMe=[]}}}
 return nv}
C.apply=function(o){if(!gOn()||!o||!S||!C.Rraw||CW.inLife)return false;const hs=o.P&&o.P.a;if(!Array.isArray(o.R)||!plain(hs))return false;
 C.flushAct();C.inApply=1;CW.inFC=(CW.inFC||0)+1;/* the sync layer: the host's world in */try{
  const R=C.Rraw,byId=new Map();for(const v of R)if(plain(v)&&!v.coop)byId.set(v.id,v);const seen=new Set();
  for(const r of o.R){if(!plain(r)||r.coop||r.id==null)continue;const n=npcMine(r);seen.add(n.id);const t=byId.get(n.id);
   /* the host serving as a cung nữ in this NPC's palace: his entry in her view is built by fromCanon (placeFriend), not part of the host's
      world (npcMine drops the host's own coop staff); keep it across the host's delta (coop-thin-d-probe P3 at level 4) */
   if(t){const keep=Array.isArray(t.staff)?t.staff.filter(s=>plain(s)&&s.coop):[];into(t,n);if(keep.length)t.staff=(Array.isArray(t.staff)?t.staff:[]).concat(keep)}else{R.push(n);C.stat.addN++}}
  for(let i=R.length-1;i>=0;i--){const v=R[i];if(plain(v)&&!v.coop&&!seen.has(v.id))R.splice(i,1)}
  for(const k of X.W_KEYS){if(!WB)break;if(k in hs){WB[k]=keepMine(k,wMine(k,hs[k]),WB[k]);}}lensW(false)
  if(typeof o.rid==="number")rid=Math.max(rid,o.rid);
  C.stat.world++;C.seen={v:TH.view&&TH.view.v,n:o.R.length}}finally{C.inApply=0;CW.inFC--}
 try{if(!Q.length)render()}catch(e){}return true};
COOP.on("thinview",V=>{try{if(gOn()&&V&&V.o)C.apply(V.o)}catch(e){console.error("lens apply",e)}});
/* the room level changes while she plays (both seats got the build): her game is rebuilt once from itself, with or without the lens
   (deser re-resolves every NPC ref and rebuilds her cards on the new list, so a card never holds an object outside the lens) */
function relens(){if(!CW.on||host()||!S||S.dead||CW.inLife)return;const want=gOn(),has=!!(C.Rraw&&rivals&&rivals[LENS]);if(want===has)return;
 C.flush();CW.inFC=(CW.inFC||0)+1;const q=quiet;quiet=true;try{const d=ser();if(want)d.R=CW.lensR(d.R);else C.Rraw=null;const keepTab=tab,u=used;deser(d);tab=keepTab;used=u;if(want)lensW(true);else WB=null;lg(["relens",want])}
 catch(e){console.error("relens",e)}finally{quiet=q;CW.inFC--}try{render()}catch(e){}}
C.relens=relens;COOP.on("thin",()=>setTimeout(relens,0));

/* her week end carries the room's world unchanged: the server merge (numbers add deltas) takes W from the host only */
CW.cW=function(out){if(!gOn())return out;const B=CW.base&&CW.base.W;if(!B)return out;out.W=J(B);return out};

/* ---------- 4. host: her ops, applied in her context ---------- */
/* 3-way: b = the world before her act (as she saw it), h = the host's now, a = after her act */
const key=x=>plain(x)?(x.id!=null?"i"+x.id:x.sid!=null?"s"+x.sid:x.ci!=null?"c"+x.ci:null):null;
function m3(b,h,a){const sb=JSON.stringify(b),sa=JSON.stringify(a);if(sa===sb)return h;
 /* an object she added that the host also holds (or a part of a big op cut by keys): merged key by key */
 if(b===undefined&&plain(a)&&plain(h)&&!Array.isArray(a)&&!Array.isArray(h))b={};
 if(typeof b==="number"&&typeof a==="number"&&typeof h==="number")return h+(a-b);
 if(Array.isArray(a)&&Array.isArray(b)&&Array.isArray(h)){const ka=a.map(key),kb=b.map(key),kh=h.map(key);
  if(ka.every(Boolean)&&kb.every(Boolean)&&kh.every(Boolean)){const mb=new Map(b.map((x,i)=>[kb[i],x])),ma=new Map(a.map((x,i)=>[ka[i],x]));const out=[];
   for(let i=0;i<h.length;i++){const k=kh[i];if(mb.has(k)&&!ma.has(k))continue;/* she took it out */out.push(ma.has(k)&&mb.has(k)?m3(mb.get(k),h[i],ma.get(k)):h[i])}
   for(let i=0;i<a.length;i++){const k=ka[i];if(!mb.has(k)&&!kh.includes(k))out.push(a[i])}/* she put it in */return out}
  return J(a)}
 if(plain(a)&&plain(b)&&plain(h)&&!Array.isArray(a)&&!Array.isArray(b)&&!Array.isArray(h)){const o={};
  for(const k of new Set([...Object.keys(h),...Object.keys(a),...Object.keys(b)])){const inA=k in a,inB=k in b,inH=k in h;
   if(inB&&!inA){if(JSON.stringify(b[k])===JSON.stringify(h[k]))continue;/* she removed it, the host did not touch it */if(inH)o[k]=h[k];continue}
   if(!inB&&inA){o[k]=inH?m3(undefined,h[k],a[k]):J(a[k]);continue}
   if(!inA&&!inB){o[k]=h[k];continue}
   if(!inH){o[k]=J(a[k]);continue}
   o[k]=m3(b[k],h[k],a[k])}return o}
 return J(a)}
C.m3=m3;
const live=()=>(rivals||[]).filter(v=>v&&!v.coop);
function freeId(id){return typeof id==="number"&&id>0&&id<900&&!(rivals||[]).some(v=>v&&v.id===id)}
function nameTaken(n){return !!n&&live().some(v=>v.name===n)}
TH.onDo("npc",a=>{if(!on()||!a||!Array.isArray(a.ops))return {err:"off"};const r={n:0,re:{}};
 for(const op of a.ops){try{
  if(op.t==="npc"){const v=live().find(x=>x.id===op.id);if(!v){r.gone=(r.gone||0)+1;continue}const n=m3(op.b,J(v),op.a);into(v,n);r.n++;continue}
  if(op.t==="add"){const v=J(op.a);if(!plain(v))continue;let id=v.id;if(!freeId(id)){id=Math.max(rid,...live().map(x=>+x.id||0).filter(n=>n<900))+1;r.re[op.id]=id;C.stat.addRe++}
   v.id=id;rid=Math.max(rid,id);if(nameTaken(v.name)&&typeof newRival==="function"){/* one world, one name */try{const t=newRival(v.rank||0);rid--;v.name=t.name}catch(e){}}
   rivals.push(v);C.stat.addN++;r.n++;continue}
  if(op.t==="rm"){const i=(rivals||[]).findIndex(x=>x&&!x.coop&&x.id===op.id);if(i>=0){rivals.splice(i,1);r.n++}continue}
  if(op.t==="rows"){const v=live().find(x=>x.id===op.id);if(!v||!plain(op.d))continue;for(const f in op.d){const d=+op.d[f]||0;if(!d)continue;
    if(f==="evm.me"){v.evm=plain(v.evm)?v.evm:{};v.evm.me=Math.max(0,(+v.evm.me||0)+d)}else if(RW.includes(f))v[f]=(+v[f]||0)+d}
   r.n++;continue}
  if(op.t==="w"&&X.W_KEYS.includes(op.k)){S[op.k]=m3(op.b,J(S[op.k]),op.a);r.n++}}catch(e){console.error("npc op",op&&op.t,e);r.bad=(r.bad||0)+1}}
 C.stat.applied+=r.n;lg(["applied",r.n,JSON.stringify(r.re)]);return r});
/* the guest: a person the host had to give another id (rare: the host made one with that id the same moment) — her links follow */
COOP.on("thinview",V=>{try{if(!gOn()||!V||!V.o||!V.o.dr)return;const d=V.o.dr;if(d.op!=="npc"||!d.r||!d.r.re||C.reDone===d.id)return;C.reDone=d.id;
 const re=d.r.re;const s=S[RAW]||S;const fix=o=>{if(!plain(o))return;for(const k of Object.keys(o)){const v=o[k];if(k in re&&plain(v)===false&&o!==s){o[re[k]]=v;delete o[k]}else if(plain(v))fix(v)}};
 for(const m of ["rl","ro","known"])if(plain(s[m]))for(const from in re)if(from in s[m]){s[m][re[from]]=s[m][from];delete s[m][from]}}catch(e){console.error("lens re",e)}});

/* ---------- 5. G7 on the host: NPC buổi acts can aim at her (her entry in the harem; items / children go out as res ops, B4) ---------- */
if(typeof rivalsBuoi==="function"){const f=rivalsBuoi;rivalsBuoi=function(){if(!on()||!host()||!S||CW.pulled||!CW.b4Wrap)return f.apply(this,arguments);
 /* jcoopworld's own wrapper (withoutFriend) sees CW.pulled set and leaves her entry in: the NPCs may aim at her; b4Wrap sends what they did to
    her items / children as res ops; her numbers go back with the week (toCanon write-back), like rivalsTurn / rivalsMonth (B4) */
 const L=X.pullFriend();if(!L.length){X.pushFriend(L);return f.apply(this,arguments)}CW.pulled=L;C.stat.g7=(C.stat.g7||0)+1;
 try{X.pushFriend(L.slice());try{return CW.b4Wrap("rivalsBuoi",f).apply(this,arguments)}finally{X.pullFriend()}}finally{CW.pulled=null;X.pushFriend(L)}}}

/* ---------- 6. parts B and D in a C room: the host's world keeps her rows ---------- */
/* D: no row tracking (the host world keeps every change of her viewer rows; the guest gets it with the world) */
{const D=TH.D;if(D&&D.rvIn){const f=D.rvIn;D.rvIn=function(){if(on())return null;oldRan("rvIn");return f.apply(this,arguments)}}}
/* B: a new life's rows toward her new face go into the host world at her accept (B kept the old numbers until the merge) */
{const lf=TH.doFn&&TH.doFn("life");if(lf)TH.onDo("life",function(a,m){const r=lf.apply(this,arguments);try{if(!on()&&r&&r.st==="accept"&&!r.err)oldRan("bRows");if(on()&&r&&r.st==="accept"&&!r.err&&r.rows)for(const v of live()){const x=r.rows[v.id];if(!x)continue;
  v.rel=x[0];v.oan=x[1];v.ghen=x[2];v.ev=x[3];if(plain(v.evm))delete v.evm.me;if(v.resHead==="me")v.resHead=null}}catch(e){console.error("C life rows",e)}return r})}
}catch(e){console.error("jcoopthinc",e)}})();
