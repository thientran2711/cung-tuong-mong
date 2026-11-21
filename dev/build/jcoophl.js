/* jcoophl: CO-OP HOST LAG (review/coop-host-lag; law 11 family "a HOST-only world write reaches the guest one merged week late").
   A merged week reaches each seat as fromCanon -> deser -> the deser hooks -> render. The host then makes world writes the guest does
   not make the same way: the name sweep (jnamefix nmFix "load": a world person renamed because a name of the friend's people reached the
   world), the lifespan of a person new in the world (jmort initAll, host only), the lazy face of the Thái hậu (jfigx figThPick at render,
   host only: "the guest waits for the host's face"), a lazy face of any world person (figPick at render). Before: those writes rode only
   the host's NEXT week's end, so the guest saw the old name / no face / another face for one whole merged week.
   Now (room thin level < 3; from level 3 the host's snapshot + world deltas, jcoopthin / jcoopthinc, already carry the host's world):
     HOST  after the merged week is shown (and after the first world / a new life, and after every host lazy pick) the host diffs its
           canonical world (W of C: the W_KEYS of S + the NPCs; viewer rows, the friend's entry and her personal parts dropped) against
           the world it last shared, and sends the difference as ops {t:"act",k:"ctm-wfix"} (relayed by the Worker as it is), with every
           rename it made (old -> new name);
     GUEST applies the ops in place (identity of every object kept: a card holding an NPC sees the new value) and rewrites every text of
           HER save that names a renamed person (law 6b: her ledger / notes / letters never name nobody), again after her next merged
           week (her end may have been in flight with the old texts).
   Merge safety (coop/worker/src/merge.js m3): a number both seats moved is ADDED (a + (b - base)); a host number sent to the guest and
   moved again by her would be counted twice, so a number whose base is a number is never sent (it waits for the merge, as before),
   except the state numbers the merge never adds (NOADD, same list as merge.js). Strings / flags / objects / arrays without ids: the
   host's value is sent; at the merge both seats then hold the same value (no conflict). Keys starting "__" are module stamps, not
   world facts: never sent.
   The guest never invents a world person's face (figPick of a world person on the guest = the face it would get, shown, not stored):
   the host gives every world person without a face one at its week end (figFill, before its end goes out) and sends lazy picks at once.
   API: COOPW.hl = {stat, last, nm, diff(a,b), canon(), check(why), apply(m)}. Solo never runs any of it (every hook checks CW.on). */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.X||typeof COOP!=="object")return;
const X=CW.X,J=X.J,K="ctm-wfix";
const host=()=>CW.seat==="a";
const lvl3=()=>{try{return typeof thinW==="function"&&thinW()}catch(e){return false}};
const live=()=>!!(CW.on&&CW.seat&&S&&!lvl3());
const pidOf=seat=>seat==="a"?901:902;
const NOADD=new Set(["mood","rank","buoi","tuan","month","year","turn","age","era","face","hue","fid","fc","fk","id","sid","rid","week","life","step","done","pal","used","lastPromo","vacSince","pregWk","preg","srk","pid","v","seatBan","until","at","wx"]);
/* world housing (jpal palFix: who heads which house, who lives in whose side hall) is DERIVED from the world; at level < 3 the HOST alone
   authors it: the guest's own palFix (deser / render / month) leaves every world person's housing as it was (her own S housing is hers), her
   week end carries the room base's housing (so m3 never adds two seats' resHead ids: R#11.resHead A=2 B=3 → 4 = a third consort), and the
   host sends its housing writes at once (numbers included: the guest never moves them, nothing is counted twice) */
const HOUSE=["resHead","resHall","pal","palLone","palWait"],HSET=new Set(HOUSE);
const VIEW=new Set(["rel","oan","ghen","ev","rl","ro","gp","ep","evm"]);/* viewer rows: per player, never a world fact */
const plain=o=>!!o&&typeof o==="object"&&!Array.isArray(o);
const isNum=x=>typeof x==="number"&&isFinite(x);
const idOf=e=>plain(e)?(e.id!=null?"i"+e.id:e.sid!=null?"s"+e.sid:null):null;
const idArr=a=>Array.isArray(a)&&a.length>0&&a.every(e=>idOf(e)!=null);
const HL=CW.hl={stat:{sent:0,ops:0,skipNum:0,applied:0,miss:0,nm:0,nmRefs:0,checks:0,ms:0},last:null,nm:[],log:[]};
const lg=x=>{HL.log.push([Date.now()%1e7].concat(x));if(HL.log.length>40)HL.log.shift()};
/* one NPC / world value in canonical form, the world part only */
function npcW(r){if(!plain(r)||r.coop)return null;r=J(r);for(const f of VIEW)delete r[f];if(Array.isArray(r.staff))r.staff=r.staff.filter(s=>!(plain(s)&&s.coop));return r}
function keyW(k,v){v=J(v);if(k==="emp"&&plain(v))delete v.known;if(k==="cm"&&plain(v))for(const f of X.CM_P)delete v[f];if(k==="men"&&Array.isArray(v))for(const x of v)if(plain(x))for(const f of X.MEN_P)delete x[f];return v}
/* canonical world of a C (W part) or of this seat now (pid = this seat's player id) */
function fromC(W){const o={S:{},R:{}};if(!W)return o;const s=W.S||{};for(const k of X.W_KEYS)if(k in s&&k!=="cnews")o.S[k]=keyW(k,s[k]);
 for(const r of W.R||[]){const n=npcW(r);if(n&&n.id!=null)o.R[n.id]=n}return o}
function canon(){const d=ser(),pid=pidOf(CW.seat);const W={S:{},R:[]};for(const k of X.W_KEYS)if(k in d.S)W.S[k]=d.S[k];
 W.R=d.R.filter(r=>plain(r)&&!r.coop);const o=fromC(W);X.mapMe(o.S,true,pid);for(const id in o.R)X.mapMe(o.R[id],true,pid);return o}
function eq(a,b){return a===b||JSON.stringify(a)===JSON.stringify(b)}
/* ops: ["s",path,value] set · ["d",path] delete · ["a",path,elem] add an id element · ["r",path,"i5"|"s7"] remove an id element.
   path steps: "S" | "R" | key | ["i",id] / ["s",sid] (array element by id / sid) */
function diff(b,n){const ops=[];let skip=0;
 const walk=(bv,nv,path,key)=>{if(eq(bv,nv))return;if(typeof key==="string"&&key.slice(0,2)==="__")return;
  if(nv===undefined){ops.push(["d",path]);return}
  if(isNum(bv)&&isNum(nv)&&!NOADD.has(key)&&!HSET.has(key)){skip++;return}
  if(plain(bv)&&plain(nv)){for(const k of new Set(Object.keys(bv).concat(Object.keys(nv))))walk(bv[k],nv[k],path.concat([k]),k);return}
  if(idArr(bv)&&idArr(nv)){const bm=new Map(bv.map(e=>[idOf(e),e])),nm=new Map(nv.map(e=>[idOf(e),e]));
   for(const [i,e] of nm){const st=[i[0],i[0]==="i"?e.id:e.sid];if(bm.has(i))walk(bm.get(i),e,path.concat([st]),key);else ops.push(["a",path,e])}
   for(const [i] of bm)if(!nm.has(i))ops.push(["r",path,i]);return}
  ops.push(["s",path,nv===undefined?null:nv])};
 for(const k of new Set(Object.keys(b.S).concat(Object.keys(n.S))))walk(b.S[k],n.S[k],["S",k],k);
 for(const id of new Set(Object.keys(b.R).concat(Object.keys(n.R)))){const bv=b.R[id],nv=n.R[id];
  if(!bv&&nv){ops.push(["a",["R"],nv]);continue}if(bv&&!nv){ops.push(["r",["R"],"i"+id]);continue}
  for(const k of new Set(Object.keys(bv).concat(Object.keys(nv))))walk(bv[k],nv[k],["R",["i",bv.id],k],k)}
 HL.stat.skipNum+=skip;return ops}
HL.diff=diff;HL.canon=canon;


/* r2: at a room start / rejoin / merged week / face index ready, the host sends EVERY world person's face as it holds it (idempotent "s" ops,
   on top of the diff): a face the diff could not see (the base already held it on the host only, a pick in a gap) still reaches the guest */
const FACEW=new Set(["start","week","peer","ready","state","ask"]);/* rv r2-r1 (start-window miss, probe R5 on 70309b27: the host answered her 2 "asks" with the diff only, no face; the Thái hậu reached her at week 1): her ask is answered with every face too */let faceDue=false;
function facePaths(){const L=[];try{const T=S.thO;if(T&&!S.thDead){if(T.fid)L.push([["S","thO","fid"],T.fid]);for(const s of T.staff||[])if(s&&s.fid&&s.sid!=null)L.push([["S","thO","staff",["s",s.sid],"fid"],s.fid])}
  for(const v of rivals||[]){if(!v||v.coop||v.id==null)continue;const R=["R",["i",v.id]];if(v.fid)L.push([R.concat(["fid"]),v.fid]);if(v.maid&&v.maid.fid)L.push([R.concat(["maid","fid"]),v.maid.fid]);
   for(const s of v.staff||[])if(s&&!s.coop&&s.fid&&s.sid!=null)L.push([R.concat(["staff",["s",s.sid],"fid"]),s.fid]);for(const k of v.kids||[])if(k&&k.fid&&k.id!=null)L.push([R.concat(["kids",["i",k.id],"fid"]),k.fid])}}catch(e){}return L}
function faceOps(have){const seen=new Set((have||[]).filter(o=>o[0]==="s").map(o=>JSON.stringify(o[1])));const out=[];for(const [p,f] of facePaths()){const k=JSON.stringify(p);if(!seen.has(k))out.push(["s",p,f])}HL.stat.faceOps=(HL.stat.faceOps||0)+out.length;return out}
HL.faceOps=faceOps;
/* ---------- HOST: send what it wrote outside the merge ---------- */
let shared=null,tmr=0,nmQ=[];
/* the friend's own face (her pid, a pool identity) is reserved in the ONE world face list on the host too: before, only her seat held it
   (pidEnforce on her side), the merge kept the host's list (arrays without ids: host wins), and the host could give her face to an NPC */
/* ... and every face her OWN people hold (her maid, her staff, her children: her P, drawn on her seat): before, only her list held them
   (e2e W10 after a rejoin: S.fidUsed held maid:m18 / maid:m15 on her seat only), so the host could give one of those faces to a world person */
const POOLF=/^(consort|maid|mama|eunuch|man|kid|thaihau|th)[:-]/;
function pFids(o,out,d){if(!o||typeof o!=="object"||d>6)return out;if(Array.isArray(o)){for(const x of o)pFids(x,out,d+1);return out}
 for(const k in o){const v=o[k];if((k==="fid"||k==="pid")&&typeof v==="string"&&POOLF.test(v))out.add(v);else if(v&&typeof v==="object"&&k!=="fidUsed"&&k!=="fidDead"&&k!=="usedFaces")pFids(v,out,d+1)}return out}
function reserveFriend(){try{if(!CW.on||!host()||!S||typeof figUsed!=="function")return;const P=CW.base&&CW.base.P&&CW.base.P.b;if(!P||!P.S)return;
  const U=figUsed();const F=pFids({pid:P.S.pid,maid:P.S.maid,staff:P.S.staff,kids:P.S.kids},new Set(),0);for(const f of F)if(!U.includes(f)){U.push(f);HL.stat.resv=(HL.stat.resv||0)+1}
  /* r2c (same family; probe 3/8 rooms on LIVE aee7ff84, 2/8 on db6ae2a0): a world person already holding a face the FRIEND owns (her own
     portrait S.pid, her maid / servants / children) — given before her person reached the host — is wiped on HER seat by j88's figPick guard
     (who.fid===S.pid -> null) and kept on the host: one consort, two faces for ever (r5 consort:c19 host / none guest). The host owns world
     faces, so the world person yields: her face is dropped here and the host draws a new one (figFill), which the diff sends. */
  /* only her portrait: j88 wipes nothing else (a world face equal to her maid's / servant's, or the Thái hậu's, is a duplicate, not a split; left as a note) */
  const pid=typeof P.S.pid==="string"&&POOLF.test(P.S.pid)?P.S.pid:null;
  /* rivals only: j88's guard is (rivals||[]).includes(who); the Thái hậu / a servant holding her portrait is the same face twice, not a split (note) */
  /* rv r2-r1 (coop-room-faces (D), same family): the host's world person holding a face one of HER OWN people wears (her maid / staff / kids,
     drawn on her seat when she made her person, after the host's start had given that face back from FID) yields the same way: one face per
     person in the room; host-canon keeps HER people (rfYield) only for a draw made after the room knew the face. */
  const own=pFids({maid:P.S.maid,staff:P.S.staff,kids:P.S.kids},new Set(),0);if(own.size)for(const p of worldPeople())if(p&&!p.coop&&p!==S&&typeof p.fid==="string"&&own.has(p.fid)){const k=whoKey(p);
   HL.clashL=(HL.clashL||[]).concat([[k,p.fid,COOP.state.week||0]]).slice(-12);delete p.fid;if(k){FLAST.delete(k);FID.delete(k)}clash++;HL.stat.clash=(HL.stat.clash||0)+1}
  if(pid)for(const p of rivals||[])if(p&&!p.coop&&p.fid===pid){const k=whoKey(p);HL.clashL=(HL.clashL||[]).concat([[k,p.fid,COOP.state.week||0]]).slice(-12);delete p.fid;
   if(k){FLAST.delete(k);FID.delete(k)/* fidBack must not put her portrait back after the next merged week */}clash++;HL.stat.clash=(HL.stat.clash||0)+1}}catch(e){}}
let clash=0;
function check(why){if(!live()||!host())return;HL.stat.checks++;const t0=performance.now();let ops=[];reserveFriend();
 if(why!=="pick"&&why!=="nm"||clash)try{clash=0;figFill()}catch(e){}
 /* r2 (same family, another lazy write; e2e 1/5: R#10.mk A=undefined B=[]): a person's mood memory (jmoodknow mkMigrate) is made lazily when
   a seat first reads her mood; the guest's read made it on her seat only. The host makes it for every world person with a mood now, so both
   seats hold the same (the host's is sent) */
 if(why!=="pick"&&why!=="nm")try{if(typeof mkOn==="function"&&mkOn()&&typeof mkMigrate==="function")for(const p of worldPeople())if(p&&!Array.isArray(p.mk)&&(p.emo||(p.emoH&&p.emoH.length))){mkMigrate(p);HL.stat.mkMig=(HL.stat.mkMig||0)+1}}catch(e){}/* a world person still without a face gets the host's now (not at its next render) */
 try{const now=canon();/* r2: no shared world yet (between a room start / stop and its base): diff against the room's own base C, never swallow the host's writes made meanwhile (a face given in that gap reached no one) */if(!shared&&CW.base&&CW.base.W)try{shared=fromC(J(CW.base.W));HL.stat.baseFb=(HL.stat.baseFb||0)+1}catch(e){shared=null}if(shared)ops=diff(shared,now);shared=now;if(FACEW.has(why)||faceDue){faceDue=false;ops=ops.concat(faceOps(ops))}}catch(e){console.error("hl check",e);return}
 HL.stat.ms=Math.round(performance.now()-t0);const nm=nmQ.splice(0);
 if(!ops.length&&!nm.length)return;
 try{COOP.send({t:"act",k:K,week:COOP.state.week||0,why:String(why||""),ops,nm,id:K+Date.now().toString(36)});HL.stat.sent++;HL.stat.ops+=ops.length;HL.last={why,n:ops.length,nm:nm.length,ex:ops.slice(0,6)};lg(["send",why,ops.length,nm.length])}catch(e){console.error("hl send",e)}}
/* the host's lazy faces between its first world ("init", room created) and the room's start (the friend joins: begin -> fromCanon of the
   init C rebuilds every person): a face picked while she waited (shown on the host's screen) was not in the init C, the rebuild dropped
   it and the next render picked ANOTHER face (e2e V1: Thái hậu c15 at the start, c06 one week later: one person, two faces, law 6c).
   The host keeps the first face it gave each person (key = who she is) and gives it back after the rebuild; the check sends it on. */
const FID=new Map();
function whoKey(w){try{if(!w||typeof w!=="object"||w.coop)return null;if(S&&w===S.thO)return "th";if((rivals||[]).includes(w))return "r"+w.id+"|"+(w.name||"");
  if(w.sid!=null)return "s"+w.sid+"|"+(w.name||"");return w.name?"n"+w.name:null}catch(e){return null}}
function fidNote(w){try{if(!CW.on||!host()||lvl3()||!w||!w.fid)return;const k=whoKey(w);if(k&&!FID.has(k))FID.set(k,w.fid)}catch(e){}}
function fidBack(){if(!host()||!FID.size||!S)return 0;let n=0;const U=typeof figUsed==="function"?figUsed():null;if(!U)return 0;
 const L=worldPeople();const held=new Map();for(const p of L)if(p.fid)held.set(p.fid,p);
 /* rv r2-r1: a face a PLAYER now holds (her own portrait after a faceChoose swap, the friend's) is never given back to a world person */try{if(S.pid)held.set(S.pid,S);const P=CW.base&&CW.base.P&&CW.base.P.b;if(P&&P.S&&P.S.pid)held.set(P.S.pid,P.S)}catch(e){}
 /* rv r2-r1 (coop-room-faces D): every face the friend's OWN people wear (her maid, staff, kids: her P blob) is held too */try{const P=CW.base&&CW.base.P&&CW.base.P.b;if(P&&!P.dead&&P.S){const F={friend:1},seen=new Set();const w=(o,d)=>{if(!o||typeof o!=="object"||seen.has(o)||d>30)return;seen.add(o);if(Array.isArray(o)){for(const x of o)w(x,d+1);return}for(const k in o){if(k==="fidUsed"||k==="fidDead"||k==="visit")continue;const v=o[k];if(k==="fid"){if(typeof v==="string"&&v&&!/^man:thive/.test(v)&&!held.has(v))held.set(v,F)}else if(v&&typeof v==="object")w(v,d+1)}};w(P.S,0)}}catch(e){}
 for(const p of L){const k=whoKey(p);const f=k&&FID.get(k);if(!f||p.fid===f)continue;const o=held.get(f);if(o&&o!==p)continue;/* someone else holds it now */
  const was=p.fid;p.fid=f;held.set(f,p);if(was){held.delete(was);const i=U.indexOf(was);if(i>=0)U.splice(i,1)}if(!U.includes(f))U.push(f);n++}
 HL.stat.fidBack=(HL.stat.fidBack||0)+n;return n}
function soon(why,ms){if(FACEW.has(why))faceDue=true;/* r2: a later "pick" timer must not cancel the faces a start / week check owes */clearTimeout(tmr);tmr=setTimeout(()=>{tmr=0;check(why)},ms==null?250:ms)}
HL.check=check;
/* what the guest holds right after a merged week / a new world = that C's world; the host's own writes after it are the difference */
function baseFrom(C,why){if(!host()||!C||!C.W)return;try{shared=fromC(J(C.W))}catch(e){shared=null}soon(why,60)}
COOP.on("week",m=>{if(!CW.on||!m||!m.state)return;if(host()){/* r2: a face the merged week dropped comes back (one person, one face for life) */try{if(!lvl3())fidBack()}catch(e){}baseFrom(m.state,"week")}else setTimeout(nmAgain,0)});
COOP.on("state",m=>{if(CW.on&&m&&m.state&&host()&&!shared)baseFrom(m.state,"state")});
COOP.on("start",d=>{shared=null;nmQ=[];const C=(d&&d.state)||(COOP.state&&COOP.state.C);try{if(CW.on&&host()&&!lvl3())fidBack()/* no render here: the room's own start flow draws next (a render inside "start" stalled a level-3 room at week 0) */}catch(e){console.error("hl fidBack",e)}setTimeout(()=>{if(CW.on&&host()&&C)baseFrom(C,"start")},0)});
/* rv r2-r1 (probe 1/32 + r1's E1: the Thái hậu c29 -> c07 on the host one beat AFTER the merged week, the merged C still holding c29): the host's
   world can be rebuilt from a C again after the "week" event (a later fromCanon: room catch-up / restore), and the render right after it drew a
   new face, while fidBack ran only on "week" / "start". Now the host gives every face back after EACH rebuild, before its render. */
{const a0=CW.afterFC;CW.afterFC=function(){try{if(a0)a0.apply(this,arguments)}catch(e){console.error(e)}try{if(CW.on&&host()&&!lvl3()&&S&&HL.stat){const n=fidBack();if(n){HL.stat.fcBack=(HL.stat.fcBack||0)+n;soon("pick")}}}catch(e){}}}
COOP.on("stop",()=>{shared=null;nmQ=[];HL.nm=[];FID.clear();try{FLAST.clear()}catch(e){}});
/* the guest (re)joins: she rebuilt from the room's C; the host's writes since are sent again */
COOP.on("peer",on=>{if(on&&CW.on&&host()&&CW.base)baseFrom(CW.base,"peer")});
/* every rename the host makes (any sweep: load, start, month) goes to the guest's own texts */
if(typeof nmFix==="function"){const f0=nmFix;nmFix=function(why){const r=f0.apply(this,arguments);try{if(CW.on&&host()&&Array.isArray(r)&&r.length){
  for(const x of r)if(x&&x.old&&x.neu&&x.old!==x.neu&&x.kind!=="lbl")nmQ.push([x.old,x.neu,x.why==="dup"?0:1]);if(nmQ.length>200)nmQ.splice(0,nmQ.length-200);soon("nm")}}catch(e){}return r};window.nmFix=nmFix}
/* a lazy face pick on the host (render) is sent at once */
function wrapPick(name){const f=window[name];if(typeof f!=="function")return;const g=function(who){let w=null,a;try{w=who||(name==="figThPick"&&S?S.thO:null);a=w&&w.fid}catch(e){}const r=f.apply(this,arguments);
  try{if(CW.on&&host()&&w&&w.fid){fidNote(w);if(w.fid!==a)soon("pick")}}catch(e){}return r};window[name]=g;return g}
try{const g=wrapPick("figThPick");if(g)figThPick=g}catch(e){}
/* r2 (law 11, the whole lazy-face family): a face can also be given by a path no wrapper sees (jfigx figFor / figPick of S.thO call their
   module's own figThPick; any engine reader holding the old figPick). e2e 1/5 + probe 3/8 rooms: the host showed the Thái hậu c29 (or a consort
   r2 c20) at the start, no check ever ran for it, the guest had no face, and the next merged week re-drew her (c29 -> c22). Now the HOST
   scans every world person's face after each of its renders (cheap: one Map compare) and after its face index becomes ready; any new or
   changed face is noted (FID, kept for life) and sent at once. Before the face index is ready (figxReady false) figFill cannot give faces:
   the check is tried again until it is, so every figure has its face on BOTH seats from week 0. */
const FLAST=new Map();
function fidScan(){if(!CW.on||!host()||lvl3()||!S)return 0;let n=0;try{for(const p of worldPeople()){if(!p||!p.fid)continue;const k=whoKey(p);if(!k)continue;
  if(FLAST.get(k)!==p.fid){FLAST.set(k,p.fid);fidNote(p);n++}}}catch(e){}HL.stat.scan=(HL.stat.scan||0)+n;return n}
HL.fidScan=fidScan;
let readyT=0,readyN=0;
function whenReady(){if(readyT||!CW.on||!host()||lvl3())return;if(typeof figxReady!=="function"||figxReady())return;
 readyT=setTimeout(function w(){readyT=0;if(!CW.on||!host())return;if(figxReady()){readyN=0;check("ready");return}if(++readyN<120)readyT=setTimeout(w,500)},500)}
/* r2 guest (e2e 1/5 after the render guard: R#7 consort:c22 on the host, maid:m42 then maid:m40 stored on her seat, S.fidUsed grown): the j88
   pool hands a face out through f88Take (f88Draw / f88Carry, outside any render). On HER seat a world person never takes a pool face: the face
   is returned (shown) but not stored and not reserved; the host gives the face (figFill) and sends it. Her own people keep theirs. */
if(typeof f88Take==="function"){const t0=f88Take;f88Take=function(who,k){try{if(live()&&!host()&&who&&typeof who==="object"&&who!==S&&!who.coop&&!mine(who)){
   HL.stat.gTake=(HL.stat.gTake||0)+1;if(!HL.gTakeAt)try{HL.gTakeAt=String(new Error().stack||"").split("\n").slice(2,6).join(" | ").slice(0,400)}catch(e){}return k}}catch(e){}return t0.apply(this,arguments)};window.f88Take=f88Take}
/* r2 guest: no path of HER render stores a world person's face (probe 2/16 rooms: Hạ Chiêu Nghi consort:c16 on the host, maid:m34 stored on
   her seat by an unwrapped lazy pick, kept by both merges). Each world person's face before her render is put back after it (shown faces come
   from the seeded guest pick, never stored); the host's faces reach her only through the merge / the host's ops. */
function gSnap(){const M=new Map();try{for(const p of worldPeople())if(p&&!mine(p))M.set(p,p.fid==null?null:p.fid)}catch(e){}return M}
function gBack(M,n0){let n=0;try{const U=typeof figUsed==="function"?figUsed():null;const add=new Set();for(const [p,f] of M){const now=p.fid==null?null:p.fid;if(now!==f){if(now)add.add(now);if(f==null)delete p.fid;else p.fid=f;n++}}
  if(U&&add.size&&U.length>n0){const keep=U.slice(0,n0),tail=U.slice(n0).filter(x=>!add.has(x));U.length=0;keep.concat(tail).forEach(x=>U.push(x))}}catch(e){}if(n)HL.stat.gBack=(HL.stat.gBack||0)+n;return n}
if(typeof render==="function"){const r0=render;render=function(){const g=live()&&!host();let M=null,n0=0;if(g)try{M=gSnap();n0=typeof figUsed==="function"?figUsed().length:0}catch(e){M=null}
  const r=r0.apply(this,arguments);try{if(live()&&host()){if(fidScan())soon("pick");whenReady()}else if(g&&M)gBack(M,n0)}catch(e){}return r};window.render=render}

/* ---------- the guest never stores a world person's face ---------- */
function mine(who){try{if(!S||who===S||who===S.maid)return true;if((S.staff||[]).includes(who))return true;
  if((S.kids||[]).includes(who))return true;if(typeof tsbPets==="function"&&tsbPets(S).includes(who))return true}catch(e){}return false}
function seeded(seed,fn){const r0=Math.random;let s=seed>>>0||1;Math.random=()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296};try{return fn()}finally{Math.random=r0}}
const hash=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
if(typeof figPick==="function"){const p0=figPick;figPick=function(who){try{if(CW.on&&!host()&&!lvl3()/* level >= 3: the lens drops her world writes */&&who&&typeof who==="object"&&!who.coop&&!mine(who)&&!(who.fid&&typeof figxHas==="function"&&figxHas(who.fid))){
   const U=figUsed(),n=U.length,f0=who.fid;const k=seeded(hash((who.id!=null?who.id:"")+"|"+(who.sid!=null?who.sid:"")+"|"+(who.name||"")),()=>p0.call(this,who));
   who.fid=f0;U.length=n;HL.stat.gPick=(HL.stat.gPick||0)+1;return k}}catch(e){console.error("hl gpick",e)}
  const a=who&&who.fid;const r=p0.apply(this,arguments);try{if(CW.on&&host()&&who&&who.fid){fidNote(who);if(who.fid!==a)soon("pick")}
   else if(live()&&!host()&&who&&who.fid&&who.fid!==a&&mine(who))rsvSend(who.fid)}catch(e){}return r};window.figPick=figPick}
/* r1 (reviewer): a face the guest gives one of HER OWN people (her new maid / servant / child, drawn on her seat) is reserved in the host's ONE
   world face list at once (before: only when her next end came back, so for that week the host could give the same face to a world person;
   e2e Q3 after rejoin: S.fidUsed held maid:m50 / maid:m36 on her seat only). The host adds it and relays its list (the next check). */
let rsvQ=[],rsvT=0;
function rsvSend(f){if(typeof f!=="string"||!POOLF.test(f))return;rsvQ.push(f);clearTimeout(rsvT);rsvT=setTimeout(()=>{rsvT=0;const L=[...new Set(rsvQ.splice(0))];
  try{if(L.length&&live()&&!host())COOP.send({t:"act",k:K,rsv:L,id:K+"r"+Date.now().toString(36)})}catch(e){}},120)}
function rsvTake(L){if(!Array.isArray(L)||!host()||!live()||typeof figUsed!=="function")return;const U=figUsed();let n=0;
 for(const f of L)if(typeof f==="string"&&POOLF.test(f)&&!U.includes(f)){U.push(f);n++}if(n){HL.stat.rsvIn=(HL.stat.rsvIn||0)+n;soon("rsv")}}
/* the same rule for a world person's trust (jtin tinOf: a lazy first value stored on READ, from loyal at that moment): a guest's read (her
   visit shows a man / a consort's servant) stored a value the host never had (S.men is host-only: never merged) and froze it at her
   moment's loyal; on her seat the first value is shown, not stored; the host stores it and sends it (a value whose base is unset) */
if(typeof tinOf==="function"){const t0=tinOf;tinOf=function(s){try{if(CW.on&&!host()&&!lvl3()&&s&&typeof s==="object"&&s.tin==null&&!s.coop&&!mine(s)){
   const v=t0.call(this,s);delete s.tin;HL.stat.gTin=(HL.stat.gTin||0)+1;return v}}catch(e){}
  const a=s&&s.tin;const r=t0.apply(this,arguments);try{if(CW.on&&host()&&s&&a==null&&s.tin!=null)soon("tin")}catch(e){}return r};window.tinOf=tinOf}
/* the Empress's regard (j24 hhBind): a consort object carrying an old plain "hh" number is migrated ONCE when consorts() first binds it
   (blended into aff(Empress, her) by affAdd, whose side effect writes a feeling cause on the Empress: "được X đối đãi tử tế"). Each seat
   binds each object at its own moment (a rejoin rebuilds every object: the guest re-ran it on her seat only, e2e trace: normAll ->
   staffInit -> consorts -> hhBind -> affAdd -> emoSet on the Empress, R#1.emoH one entry ahead of the host's and of the room's C).
   At level < 3 that world write is the HOST's: on her seat the old number is dropped unblended (the host's blend reaches her as ops) */
if(typeof hhBind==="function"){const b0=hhBind;hhBind=function(o){try{if(o&&typeof o==="object"&&CW.on&&!lvl3()){const d=Object.getOwnPropertyDescriptor(o,"hh");
   if(d&&!d.get&&typeof d.value==="number"&&d.value!==0){if(!host()){delete o.hh;HL.stat.gHh=(HL.stat.gHh||0)+1}else{const r=b0.apply(this,arguments);soon("hh");return r}}}}catch(e){}
  return b0.apply(this,arguments)};window.hhBind=hhBind}
/* host week end: every world person without a face gets one before the end goes out (so the merged C carries it) */
function worldPeople(){const L=[];try{if(S.thO&&!S.thDead)L.push(S.thO);for(const v of rivals||[]){if(!v||v.coop)continue;L.push(v);if(v.maid)L.push(v.maid);
  for(const s of v.staff||[])if(s&&!s.coop)L.push(s);for(const k of v.kids||[])if(k)L.push(k)}
  for(const s of (S.thO&&S.thO.staff)||[])L.push(s);for(const m of S.men||[])if(m)L.push(m)}catch(e){}return L}
function figFill(){if(!CW.on||!host()||!S||S.dead||typeof figPick!=="function")return 0;reserveFriend();clash=0;if(typeof figxReady==="function"&&!figxReady())return 0;let n=0;
 for(const p of worldPeople()){try{if(p.alive===false||p.dead)continue;const a=p.fid;if(p===S.thO){if(typeof figThPick==="function")figThPick()}else if(typeof figRoles==="function"&&figRoles(p).length)figPick(p);if(p.fid&&p.fid!==a)n++}catch(e){}}
 HL.stat.fill=(HL.stat.fill||0)+n;return n}
HL.figFill=figFill;
if(typeof endTurn==="function"){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(CW.on&&host()&&!lvl3()/* r1: inert at level >= 3, as the header says */&&!CW.ctx)figFill()}catch(e){console.error("hl fill",e)}return r}}

/* ---------- GUEST: world housing is the host's ---------- */
function npcList(){return (rivals||[]).filter(v=>plain(v)&&!v.coop)}
if(typeof palFix==="function"){const pf0=palFix;const hsig=()=>JSON.stringify(npcList().map(v=>HOUSE.map(f=>v[f])));
 palFix=function(){if(!live())return pf0.apply(this,arguments);
  if(host()){const a=hsig();const r=pf0.apply(this,arguments);try{if(hsig()!==a)soon("house")}catch(e){}return r}/* a host move mid-week reaches her at once */
  const snap=new Map(npcList().map(v=>[v,HOUSE.map(f=>[f in v,v[f]])]));const l0=typeof log==="function"?log:null;
  /* a move of a world person is not hers to make (and not logged on her seat): the host's move reaches her as an op; her own lines stay */
  if(l0)log=function(t){if(typeof t==="string"&&!/^Ngươi/.test(t)){HL.stat.hLog=(HL.stat.hLog||0)+1;return}return l0.apply(this,arguments)};
  let r;try{r=pf0.apply(this,arguments)}finally{if(l0)log=l0;let n=0;for(const [v,a] of snap)HOUSE.forEach((f,i)=>{if(a[i][0]){if(v[f]!==a[i][1]){v[f]=a[i][1];n++}}else if(f in v){delete v[f];n++}});if(n)HL.stat.hKeep=(HL.stat.hKeep||0)+n}
  return r};window.palFix=palFix}
/* r1 (reviewer, same family, guest side): the servant-name dedupe (j95c j95cDedupe, run by start() / ageInit) renamed a WORLD servant on
   the guest seat only when her own new maid drew the same name (e2e E1: R8 maid sid21 "Thu Thiền" on the host, "San Hô" on the guest for the
   whole first week, then renamed back by the merge: one person, two names). At level < 3 world names are the host's (jnamefix: the friend's
   own people hold their names, the host's world people give way): on her seat every world servant keeps the name it had */
if(typeof j95cDedupe==="function"){const dd0=j95cDedupe;j95cDedupe=function(){if(!live()||host())return dd0.apply(this,arguments);const snap=[];
  try{for(const v of npcList())for(const s of v.staff||[])if(plain(s)&&!s.coop)snap.push([s,s.name]);for(const s of (S.thO&&S.thO.staff)||[])if(plain(s))snap.push([s,s.name])}catch(e){}
  const r=dd0.apply(this,arguments);let n=0;for(const [s,nm] of snap)if(s.name!==nm){s.name=nm;n++}if(n)HL.stat.gDd=(HL.stat.gDd||0)+n;return r};window.j95cDedupe=j95cDedupe}
/* her week end: every world person's housing = the room base's (whatever else wrote it on her seat) */
{const cw0=CW.cW;CW.cW=function(out){out=cw0?cw0(out):out;try{if(live()&&!host()&&out&&out.W&&Array.isArray(out.W.R)&&CW.base&&CW.base.W){
  const bm=new Map((CW.base.W.R||[]).filter(plain).map(r=>[String(r.id),r]));for(const r of out.W.R){const b=bm.get(String(r.id));if(!b||!plain(r))continue;
   for(const f of HOUSE){if(f in b)r[f]=J(b[f]);else delete r[f]}}}}catch(e){console.error("hl house",e)}return out}}

/* ---------- GUEST: apply the host's writes in place ---------- */
function fixRefs(o){if(!o||typeof o!=="object")return o;if(o.$r!=null&&Object.keys(o).length===1)return (rivals||[]).find(v=>v.id===o.$r)||null;
 if(o.$k!=null&&Object.keys(o).length===1){try{return allKids().map(x=>x[0]).find(k=>k.name===o.$k)||null}catch(e){return null}}
 if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=fixRefs(o[i]);return o}for(const k in o)o[k]=fixRefs(o[k]);return o}
function toLive(v,key){const pid=pidOf(CW.seat);const w={};w[key]=J(v);X.mapMe(w,false,pid);const k2=key===String(pid)?"me":key;return fixRefs(w[k2])}
function step(o,s){if(o==null)return undefined;if(Array.isArray(s)){if(!Array.isArray(o))return undefined;return o.find(e=>plain(e)&&(s[0]==="i"?e.id===s[1]:e.sid===s[1])&&!e.coop)}
 const k=s===String(pidOf(CW.seat))?"me":s;return o[k]}
function root(p){if(p[0]==="S")return{o:S,i:1};if(p[0]==="R"){if(p.length===1)return{o:rivals,i:1};const v=(rivals||[]).find(x=>plain(x)&&!x.coop&&x.id===p[1][1]);return{o:v,i:2}}return{o:undefined,i:0}}
function resolve(p,upto){const r=root(p);let o=r.o;for(let i=r.i;i<upto;i++)o=step(o,p[i]);return o}
function apply(m){if(!live()||host()||!m||m.from===CW.seat)return;let ok=0,miss=0;
 const q=quiet;quiet=true;CW.inFC=(CW.inFC||0)+1;/* a sync from the host, as fromCanon (the guest tripwire counts only writes outside it) */try{
  for(const op of m.ops||[]){try{const [t,p]=op;
   if(t==="s"||t==="d"){const last=p[p.length-1];if(Array.isArray(last)){/* an id element replaced / dropped */const arr=resolve(p,p.length-1);if(!Array.isArray(arr)){miss++;continue}
      const i=arr.findIndex(e=>plain(e)&&(last[0]==="i"?e.id===last[1]:e.sid===last[1])&&!e.coop);if(t==="d"){if(i>=0)arr.splice(i,1)}else{const nv=toLive(op[2],"x");if(i>=0){const tg=arr[i];for(const k of Object.keys(tg))if(!(k in nv)&&!VIEW.has(k))delete tg[k];Object.assign(tg,nv)}else arr.push(nv)}ok++;continue}
    const par=resolve(p,p.length-1);if(!par||typeof par!=="object"){miss++;continue}const k=last===String(pidOf(CW.seat))?"me":last;
    if(t==="d")delete par[k];else{let nv=toLive(op[2],last);if(p[0]==="S"&&p[1]==="fidUsed"&&p.length===2&&Array.isArray(nv)&&S.pid&&!nv.includes(S.pid))nv.push(S.pid);/* her own face stays reserved on her seat */
     if(Array.isArray(par[k])&&Array.isArray(nv)){const keep=par[k].filter(x=>plain(x)&&x.coop);/* the friend's own entry (her place on this seat, placeFriend) is never the host's to drop */par[k].length=0;nv.forEach(x=>par[k].push(x));keep.forEach(x=>{if(!par[k].includes(x))par[k].push(x)})}else par[k]=nv}ok++;continue}
   if(t==="a"){const arr=p.length===1&&p[0]==="R"?rivals:resolve(p,p.length);if(!Array.isArray(arr)){miss++;continue}const e=toLive(op[2],"x");const id=idOf(e);
    /* a world person new this week: the ops carry the world part only (viewer rows dropped), so her rows toward this seat start empty as
       fromCanon starts them (coop-home under load: rivalsBuoi -> hostility -> oan read x.ro[...] of a new consort without ro: TypeError) */
    if(arr===rivals&&plain(e)){for(const f of ["rl","ro","gp","ep","evm"])if(!plain(e[f]))e[f]={};for(const f of ["rel","oan","ev"])if(typeof e[f]!=="number")e[f]=0;
     if(typeof e.ghen!=="number")e.ghen=typeof ghenNew0==="function"?ghenNew0():0}
    if(!arr.some(x=>idOf(x)===id&&!(plain(x)&&x.coop)))arr.push(e);ok++;continue}
   if(t==="r"){const arr=p.length===1&&p[0]==="R"?rivals:resolve(p,p.length);if(!Array.isArray(arr)){miss++;continue}const i=arr.findIndex(x=>idOf(x)===op[2]&&!(plain(x)&&x.coop));if(i>=0)arr.splice(i,1);ok++;continue}
  }catch(e){miss++;console.error("hl op",e)}}
  for(const x of m.nm||[]){HL.nm.push({o:x[0],n:x[1],r:x[2],w:COOP.state.week||0});nmText(x)}
  if(HL.nm.length>120)HL.nm.splice(0,HL.nm.length-120);
 }finally{quiet=q;CW.inFC--}
 HL.stat.applied+=ok;HL.stat.miss+=miss;lg(["apply",m.why,ok,miss,(m.nm||[]).length]);try{if(typeof Q==="undefined"||!Q.length)render()}catch(e){}}
/* her own texts that name a renamed person (the world copies came with the ops) */
function nmText(x){try{if(typeof nmRewrite!=="function"||!x[2])return;const b=typeof nmBare==="function"?nmBare:(s=>s);const o=b(x[0]),n=b(x[1]);if(!o||o===n)return;
  const names=(typeof nmPeople==="function"?nmPeople():[]).map(e=>String(e.o[e.f]));if(names.some(s=>b(s)===o))return;/* someone here still holds the old name: texts cannot tell them apart */
  const k=nmRewrite(o,n,names);HL.stat.nm++;HL.stat.nmRefs+=k}catch(e){console.error("hl nm",e)}}
/* after her next merged week: her P came back from her own end (which may have left with the old texts) */
function nmAgain(){if(!live()||host())return;const w=COOP.state.week||0;HL.nm=HL.nm.filter(x=>w-x.w<=2);const q=quiet;quiet=true;CW.inFC=(CW.inFC||0)+1;try{for(const x of HL.nm)nmText([x.o,x.n,x.r])}finally{quiet=q;CW.inFC--}}
HL.apply=apply;
COOP.on("act",m=>{if(!m||m.k!==K||!CW.on||m.from===CW.seat)return;try{if(m.rsv){rsvTake(m.rsv);if(!m.ask)return}if(m.ask){if(host()&&CW.base)baseFrom(CW.base,"ask");return}apply(m)}catch(e){console.error("hl apply",e)}});
/* the guest (re)opened the room (reload / rejoin / first join): she was rebuilt from the room's C; she asks for the host's writes since.
   A FIRST join has no world of hers at "start" (she waits for the host's world, then picks her person: "state" -> newLife): the host's
   writes sent before that were dropped (no S) and nobody asked again (e2e W10: no Thái hậu face on her seat for the whole first week) */
function ask(){try{if(live()&&!host()){/* r1: with the faces her own people hold (her P), so the host reserves them before it answers */
  const F=[...pFids({pid:S.pid,maid:S.maid,staff:S.staff,kids:S.kids},new Set(),0)];COOP.send({t:"act",k:K,ask:1,rsv:F,id:K+"q"+Date.now().toString(36)})}}catch(e){}}
COOP.on("start",()=>setTimeout(ask,400));
COOP.on("state",()=>{if(!host())setTimeout(ask,400)});
}catch(e){console.error("jcoophl",e)}})();
