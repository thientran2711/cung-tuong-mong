/* jcoopworld: CO-OP SHARED WORLD (worker C, review/coop). Protocol: dev/coop/PROTOCOL.md. Net client: jcoop.js (COOP).
   Single-player never runs any of this: every hook checks CW.on, which only the lobby's COOP "start" event turns on.

   Canonical C = {v, week, W:{S:<WORLD keys of S>, R:<NPC rivals>, rid}, P:{a:<blob>, b:<blob>}}
     WORLD keys of S (W_KEYS below): date (year/month/tuan/turn), the Emperor (minus emp.known = her own knowledge), Thái hậu,
       court, weather, the vacant-seat clock, triều đình, storms, festival flag, face pools. Everything else in S is personal.
     W.R = ser() rivals without the friend entry; the viewer-relative fields of each NPC are kept per player id (pid):
       v.rel→rl[pid]  v.oan→ro[pid]  v.ghen→gp[pid]  v.ev (her proof against v)→ep[pid]  v.evm.me→evm[pid];
       any key "me" → String(pid), and the "me" value of a key field (resHead, spyFor, …) → pid.
     P[seat] = {pid, ok:origin key, name, rank, dead, srv, life, S:<personal keys of S>}  (S.emp.known kept as S.empKnown).
   The friend = one rival entry {id:<her pid>, coop:true} built from her P (consort), or, while she serves as a cung nữ,
   one servant {sid:<her pid>, coop:true} in her mistress's staff. Her rows (sung, danh, Thiện cảm …) changed by my acts are
   written back into P[friend].S, so the server's 3-way merge adds my deltas to hers.
   Week (since review/coop-night-sync: only after the host's night `go`, see "the night gate"): "Sang ngày mới" runs endTurn() locally (friend entry taken out; on the guest the world-agency functions are muted so
   world events roll once, on the host); once the week's dialogs are read, the client sends {t:"end",week,state:C} and waits
   (#next disabled; jcooplobby shows "Đợi bạn xong tuần"). The merged C comes back as {t:"week"} and the local game is rebuilt.
   Death: the normal rebirth flow (over → "Đầu thai kiếp sau" → Luân hồi card). nlRun is hooked so the new life is put into the
   SAME world (the world as it stood when she died); nlAccept sends {t:"me"} with her new blob. Hook for later origin routes:
   COOPW.attach() can be called by any route that builds a fresh S (e.g. tiểu thư ngoài cung) to drop it into the shared world.
   Save: in co-op, save() keeps the slots untouched and stores the canonical C in localStorage "ctm-coop-last" (the room's DO is
   the real save). */
/* ONE WORLD (owner co-op rule OD:L96; audit dev/handover/reports/coop-one-world.md): every shared world fact is computed ONCE, on the host.
   worldOn() = true in single player and on the host seat, false on the co-op guest seat. EVERY world loop checks it (the guard table is
   jcoopone.js, the last script; a few inline checks in j3/j8/j13). The guest computes only HER OWN person; the world comes from the host. */
window.worldOn=function(){const c=window.COOPW;return !(c&&c.on&&c.seat!=="a")};
/* ONE SWITCH for the OLD guest state guards (thin part C, Foreman B 17/11: bypass at level >= 3, delete at part H when level >= 3 is the default).
   In a C room the guest's world is a read-only lens over the host's (jcoopthinc.js): a write there can never reach the world, so the guards
   that only STOP WRITES (HOST_ONLY copies in toCanon, the guestNet / unroll safety net, jcoopask temp ids, part D row tracking, part B's
   old-rows rule) step aside. thinW() = the switch (a C room). stateOn(name) = may the world write run here: true in solo, on the host and
   in a C room; false = the old guard runs (oldRan(name): COOPW.oldRun[name] + 1; the C-room tripwire asserts 0 on both seats, rooms below
   level 3 show the counters live).
   NOT this switch: the "who rolls a world event" guards (worldOn: NPC Sức ticks, illness, lots, kids month, the NPCs' day, Emperor visits,
   jcoopone MUTE / ONLY_ME / PERSON, module npcOK guards) stay until parts E / G: the host rolls those once, for both seats (coop-thin-c.md). */
window.thinW=function(){const c=window.COOPW;return !!(c&&c.on&&c.thin&&c.thin.on&&c.thin.on(3))};
window.oldRan=function(n){const c=window.COOPW;if(c){c.oldRun=c.oldRun||{};c.oldRun[n]=(c.oldRun[n]||0)+1}};
/* review r1: while the lens is still installed on this guest (the room holds for a moment: reconnect / two builds), her world is still
   read-only, so the old guards stay bypassed (before: a hold let jcoopask's temp-id path run once with the lens on, C8 "ask":1) */
window.stateOn=function(n){if(worldOn()||thinW())return true;try{const C=window.COOPW&&COOPW.thin&&COOPW.thin.C;if(C&&C.lensOn&&C.lensOn())return true}catch(e){}oldRan(n);return false};
(function(){try{
if(typeof COOP!=="object")return;
/* thIll (Thái hậu illness), cm (Thái hậu / Hoàng hậu mood; her own "seen"/spy/drop part stays personal, CM_P), men (palace men; her own
   ties to each man stay personal, MEN_P) + menG2 are WORLD keys since review/coop-one-world. Old rooms: the host's copy wins (HOST_ONLY). */
const W_KEYS=["year","month","tuan","turn","emp","thDead","thAge","thO","thF","court","wx","wxDay","vacSince","trieu","storms","festDone","usedFaces","fidUsed","kidUsed","luxEdict","tn","thIll","cm","men","menG2","lyF","fdead","fidDead","dnames","nmReg","nmOrd"];  /* coop-name-clash: nmReg (every name ever given) + nmOrd (the host's rename orders for the friend's own people) are world, written by the host only (jnamefix) */  /* tn: B2 the Emperor's night (host); D4 npc-death: Phế phi họ Lý + retired faces/names are world (host rolls) */
const HOST_ONLY=["tn","thIll","cm","men","menG2","wxDay","nmReg","nmOrd"];  /* wxDay: weather-khac, the host rolls the day (jwxk) */  /* tn: B2 the Emperor's night (host) */   /* the guest never writes these: her toCanon copies them from the room base */
const CM_P=["seen","spy","thDrop","hhDrop"],MEN_P=["tinh","letters","trysts","knowsMe","af","grudge","grudgeN","debt","seen","oan"];/* oan: his oán toward her (rel-men-servants, j9) — hers, like af */
const REFF=["resHead","spyFor","lover","mid","owner","by","who","tgt","from","to"];   /* fields whose "me" value names the viewer */
/* where a person LIVES (jpal palFix writes it): ONE list for the pos relay (houseWire/houseIn, below) and jcoophl (world housing is the host's) */
const HOUSE=["resHead","resHall","pal","palLone","palWait"];
const STAT=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat","confined","shield","block"];
const LOOK=["face","fc","fk","fcKeep","fid","pid","age","sac","tai","tamco","duc","arts","pal","resHead","dress","ill","maid","lot","hieu","titleWorn","dh","toilette","wd","mkKnow"];  /* toilette + wd: her look of the day and the clothes she wears (jtoil toilFriendRec / toilDress, diemtrang-coop-look); hieu + titleWorn + dh: her hiệu and worn title show on the friend too (review/title-sys) */
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
/* her FACE MARKS, live + in the week merge (review/looks-2, owner OD 17/11 (g) "same rules for everyone"; both seats see the same face): illness rides LOOK.ill;
   rash / slap / poison / punishment / sickness / scar (jface, jrash, j70) and the looks-2 states (stain, smudge+ink p.lk, crying p.lkCry; smudge+ink of a made-up day ride toilette.lk) */
const FXL=["rash","slap","pz","pen","sick","scar","stain","lk","lkCry"];LOOK.push(...FXL);
const fxSnap=v=>{const o={};for(const x of FXL)o[x]=v&&v[x]!=null?J(v[x]):null;return o},fxEq=(a,b)=>JSON.stringify(a==null?null:a)===JSON.stringify(b==null?null:b);
const PETK2=["pets","petOn","petB","petBn"];
const CW=window.COOPW={tr:[],on:false,seat:"",base:null,pend:false,sent:-1,dying:null,attachC:null,news:"",life:0};
/* CW.ctx (jcoopthin withSeat, host only): the seat whose turn the host runs; me/fp/fs follow it (unset = this seat, as before) */
const me=()=>(CW.ctx||CW.seat)==="a"?901:902, fp=()=>(CW.ctx||CW.seat)==="a"?902:901, fs=()=>(CW.ctx||CW.seat)==="a"?"b":"a";
const T=x=>{try{CW.tr.push(x+" f="+(rivals||[]).some(v=>v&&v.coop));if(CW.tr.length>80)CW.tr.shift()}catch(e){}};
const isF=v=>!!(v&&v.coop);CW.isF=isF;
/* the same item, keys in any order (a patch / ilUid can add a key in another order on one phone): coop-thin F3, whole family */
const SJ=o=>JSON.stringify(o,(k,v)=>v&&typeof v==="object"&&!Array.isArray(v)?Object.keys(v).sort().reduce((r,x)=>(r[x]=v[x],r),{}):v);
const host=()=>CW.seat==="a";
function wk(){return COOP.state.week||0}
const LASTB=()=>typeof B4L==="number"?B4L:2;

/* ---------- perspective mapping ---------- */
function mapMe(o,toCanon,pid){if(!o||typeof o!=="object")return o;
 if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=mapMe(o[i],toCanon,pid);return o}
 for(const k of Object.keys(o)){let v=o[k];
  if(REFF.includes(k)){if(toCanon&&v==="me")v=pid;else if(!toCanon&&v===pid)v="me"}
  v=mapMe(v,toCanon,pid);
  if(toCanon&&k==="me"){delete o.me;o[String(pid)]=v}else if(!toCanon&&k===String(pid)){delete o[k];o.me=v}else o[k]=v}
 return o}

/* ---------- friend entry ---------- */
function friendSrv(P){return !!(P&&P.S&&P.S.srv&&!P.S.srv.risen)}
/* the friend on the tiểu thư road (jkc) lives at her father's house until the tuyển tú: no palace entry for her until S.kc.inPal */
function friendHome(P){return !!(P&&P.S&&P.S.kc&&!P.S.kc.inPal&&!P.dead&&!P.S.dead)}
/* the bound "hh" reads the Empress (j24 queenP reads S): while the guest's first life is being shown (fromCanon before S exists) it reads 0 */
function hhSafe(v){try{return v.hh}catch(e){return 0}}
function buildFriend(P,mine){if(!P||!P.S||P.dead||P.S.dead||friendHome(P))return null;const s=J(P.S),mp=me();
 const rl=Object.assign({},s.rl||{}),ro=Object.assign({},s.ro||{});const rel=rl[mp]||0,oan=ro[mp]||0;delete rl[mp];delete ro[mp];
 const cev=s.cev||{};
 const v={id:fp(),coop:true,name:P.name||s.name,rank:s.rank||0,queen:(s.rank||0)>=7,trait:"Khiêm nhường",malice:15,rel,oan,rl,ro,ev:((mine||S||{}).cev||{})[fp()]||0,
  evm:{me:cev[mp]||0},alive:true,out:!!s.out,kids:[],ghen:0,pg:0,nights:0,inv:[],staff:[],nightLog:[]};
 for(const k of STAT)if(s[k]!=null)v[k]=s[k];for(const k of LOOK)if(s[k]!=null)v[k]=s[k];
 /* B r1 item 6 (root, both paths): "hh" (the Empress's regard) is derived from the Empress's row toward this entry (j24 hhGet). A plain copied
    number was "migrated" by j24 hhBind at the next consorts() (blended into that row: the Empress's row toward the other seat moved every
    rebirth / every rebuild of the entry). Bound here, before anything sees the entry: no migration; the week write-back never sends it back. */
 if(typeof hhBind==="function")try{delete v.hh;hhBind(v)}catch(e){}
 /* jtruth (reviewer r1): her own wrongs ledger travels with her, so true evidence on her is capped by what SHE really did (an empty
    ledger here made every piece on the friend a rumour each week, and NPC spies could never find a guilty friend); read-only copy */
 for(const k of ["wrongs","dw","dws","dkeys","schemes"])if(s[k]!=null)v[k]=J(s[k]);
 try{const m=s.empMe||(s.emp&&s.emp.met&&s.emp.met.me);if(m)v.emet=J(m)}catch(e){}/* r1: her personal S.empMe (P.S never holds the world key emp) *//* AG2: what she did near the Emperor (her client's memory) weighs her card on the host's tray, as the host's own deeds weigh hers */
 for(const k of PETK2)if(s[k]!=null)v[k]=J(s[k]);  /* her pets: shown on her entry, acts on them go through `res` (pet ops), never the week write-back */
 /* B1 (review/coop-b1b5): her bag and her children on her entry, so the item / child acts are offered on her exactly as on an NPC.
    Display copies only: what an act does to them goes to her through `res` (item / kid ops), never through the week write-back. */
 v.inv=bagOf(s.inv);v.kids=kidsCopy(s.kids);if(s.preg&&!s.hidden){v.preg=s.preg;if(s.fake)v.fake=s.fake}v.fx7=J((s.j71&&s.j71.fx)||null);
 mapMe(v,false,mp);v.id=fp();
 v.__b=J(Object.assign({},...STAT.map(k=>({[k]:k==="hh"?hhSafe(v):v[k]})),{rel:v.rel,oan:v.oan,rl:v.rl,ro:v.ro,em:v.evm.me,out:v.out,rank:v.rank,ill:v.ill||null,fx:fxSnap(v)}));
 return v}
function buildFriendSrv(P){const s=P.S;return {sid:fp(),coop:true,name:P.name||s.name,role:"maid",fc:s.fc,fk:s.fk,face:0,hue:0,age:s.age||BAL.ageMin,loyal:60,
 spyFor:s.srv&&s.srv.spyFor!=null?(s.srv.spyFor===me()?"me":s.srv.spyFor):null/* p2 B1: whom she spies for (me = bought by me) */,lover:null,af:{},kn:1,imp:"hảo hữu chơi cùng",org:"hảo hữu chơi cùng"}}
function pullFriend(){T("pull");const out=[];for(let i=rivals.length-1;i>=0;i--)if(isF(rivals[i]))out.push([i,rivals.splice(i,1)[0]]);
 for(const v of rivals)if(v.staff)for(let i=v.staff.length-1;i>=0;i--)if(isF(v.staff[i]))out.push([-1,v.staff.splice(i,1)[0],v]);return out}
function pushFriend(L){for(const [i,v,m] of L.reverse()){if(i<0){if(m&&m.staff&&!m.staff.includes(v))m.staff.push(v)}else if(!rivals.includes(v))rivals.splice(Math.min(i,rivals.length),0,v)}}
function withoutFriend(f){if(!CW.on||!S||CW.pulled)return f();const L=pullFriend();CW.pulled=L;try{return f()}finally{CW.pulled=null;pushFriend(L)}}
function friendEntry(){return rivals.find(isF)||null}
/* knowledge (owner 14/11): the friend follows j61 like any NPC — "Người lạ" until met. Her new life (rebirth) is a new person:
   forget what I knew of the old one (j61 stage, my Thiện cảm / Oán / chứng cứ toward that id). */
function forgetFriend(o){const id=fp(),k="r"+id;if(!o)return;try{if(o.known)delete o.known[k];if(o.nkn)delete o.nkn[k]}catch(e){}
 if(o.rl)delete o.rl[id];if(o.ro)delete o.ro[id];if(o.cev)delete o.cev[id]}
function freshFriend(P,o){if(!P)return;const key=(P.name||(P.S&&P.S.name)||"")+"#"+(P.life||0);if(CW.fKey!==undefined&&CW.fKey!==key)forgetFriend(o||S);CW.fKey=key}
function placeFriend(P){T("placeFriend "+(P&&P.name));pullFriend();if(!P)return;if(S)freshFriend(P,S);
 if(friendSrv(P)){const m=RV(P.S.srv.mid);if(m){m.staff=m.staff||[];m.staff.push(buildFriendSrv(P))}return}
 const v=buildFriend(P);if(!v)return;try{rstats(v)}catch(e){}
 if(v.queen&&!qOn()){rivals.unshift(v)}else{if(v.queen)v.queen=false,v.rank=Math.min(v.rank,6);rivals.push(v)}
 /* review/looks-2: a live pos of THIS week that came before her entry was (re)built carries newer face marks / look of the day than the base blob */
 try{const m=CW.fpos;if(m&&m.week===wk()&&(!m.name||m.name===v.name)){if(m.fx&&typeof m.fx==="object")for(const x of FXL)if(x in m.fx)v[x]=m.fx[x]==null?null:J(m.fx[x]);if(m.tl&&typeof m.tl==="object")v.toilette=J(m.tl);if(v.__b)v.__b.fx=fxSnap(v)}}catch(e){}}

/* ---------- local game → canonical ---------- */
/* split / join the personal part of the world keys cm and men (her own knowledge of the court mood, her own ties to each man) */
function splitP(sS,P){if(sS.cm){const c={};for(const k of CM_P)if(sS.cm[k]!=null)c[k]=J(sS.cm[k]);P.cmP=c}
 if(Array.isArray(sS.men)){const m={};for(const x of sS.men){if(!x||x.id==null)continue;const o={};for(const k of MEN_P)if(x[k]!=null)o[k]=J(x[k]);m[x.id]=o}P.menP=m}}
function worldPart(k,v){v=J(v);if(k==="cm"&&v){for(const f of CM_P)delete v[f]}else if(k==="men"&&Array.isArray(v)){for(const x of v)if(x)for(const f of MEN_P)delete x[f]}return v}
function joinP(sS,Pm){const c=Pm.cmP;if(sS.cm&&c)Object.assign(sS.cm,J(c));
 const m=Pm.menP;if(Array.isArray(sS.men)&&m)for(const x of sS.men){const o=x&&m[x.id];if(o)Object.assign(x,J(o))}
 if(Array.isArray(sS.men))for(const x of sS.men)if(x){/* defaults of her own ties to a man she never met */if(x.tinh==null)x.tinh=0;if(x.letters==null)x.letters=0;if(x.trysts==null)x.trysts=0;if(x.af==null)x.af=0;if(!x.knowsMe)x.knowsMe=[]}
 delete sS.cmP;delete sS.menP}
function myBlob(sS){const P={pid:me(),ok:S.origin&&S.origin.k,name:S.name,rank:S.rank,dead:!!S.dead,srv:!!(S.srv&&!S.srv.risen),life:CW.life,S:{}};
 for(const k in sS)if(!W_KEYS.includes(k))P.S[k]=sS[k];splitP(sS,P.S);
 if(sS.emp)P.S.empKnown=sS.emp.known||{};delete P.S.heir;/* p2 B2: the heir is the world key hr, resolved again on every rebuild */
 delete P.S.thq;/* part D r1: her open cards live only in the host's store (localStorage per room); a copy in a blob came back stale after a host reload */return P}
function toCanon(){try{CW.hrSync&&CW.hrSync()}catch(e){console.error(e)}try{rfYield(CW.base)}catch(e){console.error("face yield",e)}const L=(CW.pulled||[]).concat(pullFriend());let d;try{S.cev=S.cev||{};const f=L.find(x=>x[0]>=0);if(f)S.cev[fp()]=f[1].ev||0;d=ser()}finally{pushFriend(L.filter(x=>!(CW.pulled||[]).includes(x)))}
 const mp=me(),sS=d.S;const WS={};for(const k of W_KEYS)if(k in sS)WS[k]=worldPart(k,sS[k]);if(WS.emp)delete WS.emp.known;
 if(!stateOn("hostOnly")){const bS=(CW.base&&CW.base.W&&CW.base.W.S)||{};for(const k of HOST_ONLY){if(k in bS)WS[k]=J(bS[k]);else delete WS[k]}}
 if(host())WS.cnews={w:wk(),h:CW.news||""};else if(CW.base&&CW.base.W&&CW.base.W.S)WS.cnews=J(CW.base.W.S.cnews);
 const R=d.R.filter(r=>!r.coop).map(r=>{r.rl=r.rl||{};r.ro=r.ro||{};r.gp=r.gp||{};r.ep=r.ep||{};r.evm=r.evm||{};
  r.rl[mp]=r.rel||0;r.ro[mp]=r.oan||0;r.gp[mp]=r.ghen||0;r.ep[mp]=r.ev||0;delete r.rel;delete r.oan;delete r.ghen;delete r.ev;
  if(r.staff)r.staff=r.staff.filter(s=>!s.coop);return mapMe(r,true,mp)});
 mapMe(WS,true,mp);
 /* coop-emo-seat r2: every world person's feelings (emo / mk / emoH / mck) are the host's in the merge; her acts' feelings ride S.coopEmo (jcoopone) */
 if(!stateOn("emoHost")&&CW.emoHost)CW.emoHost(R,WS);
 const P={};P[CW.seat]=myBlob(sS);
 const B=CW.base&&CW.base.P&&CW.base.P[fs()];
 if(B){const fP=J(B);const f=L.find(x=>x[0]>=0);const v=f&&f[1];
  if(v&&v.__b&&fP.S){const b=v.__b,s=fP.S;
   for(const k of STAT)if(k!=="hh"&&v[k]!==b[k]&&typeof v[k]==="number")s[k]=v[k];/* hh = the Empress's row (the world merge carries it) */
   s.rl=s.rl||{};s.ro=s.ro||{};s.cev=s.cev||{};
   if(v.rel!==b.rel)s.rl[mp]=v.rel;if(v.oan!==b.oan)s.ro[mp]=v.oan;if((v.evm&&v.evm.me||0)!==b.em)s.cev[mp]=v.evm.me||0;
   for(const id in v.rl||{})if(v.rl[id]!==(b.rl||{})[id]&&id!=="me")s.rl[id]=v.rl[id];
   for(const id in v.ro||{})if(v.ro[id]!==(b.ro||{})[id]&&id!=="me")s.ro[id]=v.ro[id];
   if(!v.alive||(v.out&&!b.out)){if(!v.alive){fP.dead=true;s.dead=true;s.coopWhy="Mất trong cung"}else{s.coopCold=1}}
   if(v.rank!==b.rank&&!v.out){s.rank=v.rank}
   if(b.fx)for(const x of FXL)if(!fxEq(v[x],b.fx[x]))s[x]=v[x]==null?null:J(v[x]);/* a face mark put on her on this seat (tea, ink, slap, rash…) goes back to her (review/looks-2) */
   if("ill" in b&&JSON.stringify(v.ill||null)!==JSON.stringify(b.ill))s.ill=v.ill?Object.assign(J(v.ill),{known:true}):null/* r1 (her own illness: she knows it): the host's epidemic caught her (one world) */}
  P[fs()]=fP}
 if(!host()&&CW.base&&CW.base.W){try{keepFaces(WS,CW.base.W.S||{},0);keepFaces(R,CW.base.W.R||[],0)}catch(e){console.error("keepFaces",e)}}
 const out={v:1,week:wk(),W:{S:WS,R,rid:Math.max(rid,...R.map(r=>+r.id||0).filter(n=>n<900),0)},P};
 /* thin guest part C (jcoopthinc): in a C room the guest's week carries the room's world unchanged (W comes from the host only) */
 return CW.cW?CW.cW(out):out}

/* ---------- canonical → local game ---------- */
/* CW.inFC: inside fromCanon (the guest tripwire, dev/test/coop-thin-trip.js, counts only writes outside it); CW.afterFC: test hook */
function fromCanon(C,opt){CW.inFC=(CW.inFC||0)+1;try{return fromCanon0(C,opt)}finally{CW.inFC--;if(CW.afterFC)try{CW.afterFC()}catch(e){}if(CW.cqBack)try{CW.cqBack()}catch(e){}/* r4: carried cards back once the room is past their week */}}
function fromCanon0(C,opt){opt=opt||{};const mp=me(),Pm=C.P&&C.P[CW.seat];if(!Pm)return false;
 const sS=J(Pm.S);Object.assign(sS,J(C.W.S||{}));joinP(sS,Pm.S);if(sS.emp)sS.emp.known=Pm.S.empKnown||{};delete sS.empKnown;delete sS.cnews;
 const R=J(C.W.R||[]).map(r=>{r.rl=r.rl||{};r.ro=r.ro||{};r.gp=r.gp||{};r.ep=r.ep||{};
  r.rel=r.rl[mp]||0;r.oan=r.ro[mp]||0;r.ghen=r.gp[mp]||0;/*evok: co-op sync*/r.ev=r.ep[mp]||0;delete r.rl[mp];delete r.ro[mp];delete r.gp[mp];delete r.ep[mp];
  return mapMe(r,false,mp)});
 /* night-ledger-coop r4: her open cards ride the rebuild as data (j3 serQ / deserQ: pid, generator rk); a choice with no generator lapses with a log line (lap), never silently */
 const qs=(typeof serQ==="function"&&opt.keepQ)?serQ({lap:1}):[];
 const fP=C.P[fs()];if(fP)freshFriend(fP,sS);
 const f=fP&&!friendSrv(fP)?buildFriend(fP,sS):null;if(f)R.push(f);
 try{rfWorldDup(sS,R)}catch(e){console.error("face dup",e)}
 const keepTab=tab,keepUsed=used;quiet=true;
 /* thin guest part C (jcoopthinc): in a C room the guest's NPC list is the read-only lens, installed before deser resolves refs / rebuilds cards */
 try{deser({v:6,buoi:sS.buoi||0,ok:Pm.ok||"tt",S:sS,R:CW.lensR?CW.lensR(R):R,rid:C.W.rid||rid,tab:keepTab,used:keepUsed,P:qs})}finally{quiet=false}
 try{CW.lensW&&CW.lensW()}catch(e){console.error("lens W",e)}
 if(!opt.keepUsed)used=0;else used=keepUsed;
 /* coop-emo-seat r2: her acts' feelings on world people, replayed the same on both seats (jcoopone), then ONE cause sweep. AFTER `used` is set:
    the cause clock mkNow counts the khắc used this buổi (j95kh), and before r1 each seat swept with its own leftover `used` (review r1: after a
    rejoin the guest's clock ran ahead and ended a live vui cause on her seat only: host vui 40 | guest khochiu 22) */
 try{CW.emoReplay&&CW.emoReplay(C)}catch(e){console.error("emoReplay",e)}
 /* guard enums/levels that a numeric merge could push out of range */
 const ci=(v,a,b)=>typeof v==="number"?Math.max(a,Math.min(b,Math.round(v))):v;
 if(S.emp)S.emp.mood=ci(S.emp.mood,0,3);S.rank=ci(S.rank,0,7);S.tuan=ci(S.tuan,0,2);S.month=ci(S.month,1,12);S.buoi=ci(S.buoi||0,0,LASTB());
 for(const v of rivals){v.rank=ci(v.rank,0,7);try{ap(v,{})}catch(e){}}
 if(friendSrv(fP))placeFriend(fP);CW.life=Pm.life||0;try{CW.hrApply&&CW.hrApply()}catch(e){console.error(e)}
 /* coop-pool-face: her own identity is never a face the room's world gives someone, nor the friend's (j66 pidRoomFix moves HER) */
 try{if(typeof pidRoomFix==="function")pidRoomFix(roomTaken(C,host()))}catch(e){console.error("pid room",e)}
 try{rfYield(C)}catch(e){console.error("face yield",e)}return true}
/* coop-pool-face: the faces of the room — every fid held by a person of the world W (Thái hậu, Emperor, consorts, staff, court, men, kids)
   + the friend's own identity. fidUsed / fidDead are lists, not holders: not counted here (her own identity sits in fidUsed). */
function faceHeld(o,out,seen,d){if(!o||typeof o!=="object"||seen.has(o)||d>14)return;seen.add(o);if(Array.isArray(o)){for(const x of o)faceHeld(x,out,seen,d+1);return}
 for(const k in o){const v=o[k];if(k==="fid"){if(typeof v==="string"&&v)out.add(v)}else if(v&&typeof v==="object")faceHeld(v,out,seen,d+1)}}
/* review coop-pool-face: noFriend (the host's own room check) = the two players already share one identity (an old room from before this fix):
   only the GUEST moves; if both moved they would land on the same next face every week, both faces changing for ever (PF_TWIN probe) */
/* coop-room-faces (MAIN 95 (3)): the friend counts with ALL her people — her identity AND every face of her own people (maid, staff, kids,
   households: her P blob), not her identity only. noFriend (the host's own identity check) leaves the whole friend out (twin fix above). */
function friendFaces(C){const T=new Set();const f=C&&C.P&&C.P[fs()];if(f&&!f.dead&&f.S){faceHeld(f.S,T,new Set(),0);if(f.S.pid)T.add(f.S.pid)}return T}
function roomTaken(C,noFriend){if(!C||!C.W)return null;const T=new Set();faceHeld(C.W,T,new Set(),0);if(!noFriend)for(const k of friendFaces(C))T.add(k);return T}
CW.taken=()=>roomTaken(CW.base);
/* every face of the room (world + friend + her identity), once per merged week: j66 figUsed / j39 figGC / j88 faceTaken read it */
let RF_M=null;CW.roomFaces=()=>{const b=CW.base;if(!b||!b.W)return new Set();if(RF_M&&RF_M.b===b&&RF_M.s===CW.seat)return RF_M.T;const T=roomTaken(b)||new Set();RF_M={b,s:CW.seat,T};return T};
/* coop-room-faces (host-canon on a clash, MAIN 95 (1)): two seats can draw the same free face in the same week (each phone only knows the
   room as of the last merge). The GUEST yields: any of HER OWN people (her S outside the world keys) wearing a face someone else in the room
   wears (the world, the host's people, the host's identity) is cleared and draws a fresh free face at once (figUsed now holds the whole
   room). Run on her week end (toCanon) and on every merged week (fromCanon). The host never moves its people for the guest. */
function rfKey(o){return o.id!=null?"i"+o.id:o.name?"n"+o.name:null}
function rfYield(C){if(host()||!C||!C.W||!S)return 0;const M=new Map();const add=(f,k)=>{if(typeof f!=="string"||!f||/^man:thive/.test(f))return;if(!M.has(f))M.set(f,new Set());M.get(f).add(k||"?")};
 const coll=(o,seen,d)=>{if(!o||typeof o!=="object"||seen.has(o)||d>30)return;seen.add(o);if(Array.isArray(o)){for(const x of o)coll(x,seen,d+1);return}
  if(typeof o.fid==="string")add(o.fid,rfKey(o));for(const k in o){if(k==="visit")continue;const v=o[k];if(v&&typeof v==="object")coll(v,seen,d+1)}};
 coll(C.W,new Set(),0);const f=C.P&&C.P[fs()];if(f&&!f.dead&&f.S){coll(f.S,new Set(),0);if(f.S.pid)add(f.S.pid,"friend")}
 let n=0;const seen=new Set([S,...(rivals||[])]);const hit=[];/* world people reached through her own refs are not hers */const walk=(o,d)=>{if(!o||typeof o!=="object"||seen.has(o)||d>30||o.coop)return;seen.add(o);if(Array.isArray(o)){for(const x of o)walk(x,d+1);return}
  if(typeof o.fid==="string"&&M.has(o.fid)){const k=rfKey(o);if([...M.get(o.fid)].some(x=>x!==k))hit.push(o)}for(const k in o){if(k==="visit"||k==="fidUsed"||k==="fidDead")continue;const v=o[k];if(v&&typeof v==="object")walk(v,d+1)}};
 for(const k in S){if(W_KEYS.includes(k)||k==="fid"||k==="pid"||k==="visit")continue;const v=S[k];if(v&&typeof v==="object")walk(v,0)}
 for(const o of hit){const old=o.fid;o.fid=null;try{if(typeof figPick==="function")figPick(o)}catch(e){}n++;CW.faceYield=(CW.faceYield||[]).concat([[old,o.fid||null]]).slice(-20)}
 return n}
/* host-canon for two WORLD people with one face (both seats drew it the same week): the one the host already wore before this merge keeps
   it, the other is cleared (the host draws her a free face on display; the guest gets it with the next week). */
function rfWorldDup(sS,R){if(!host())return 0;const pre=new Map();const keyed=(root,cb)=>{const seen=new Set();const w=(o,d)=>{if(!o||typeof o!=="object"||seen.has(o)||d>30||o.coop)return;seen.add(o);
   if(Array.isArray(o)){for(const x of o)w(x,d+1);return}if(typeof o.fid==="string"&&o.fid&&!/^man:thive/.test(o.fid))cb(o);for(const k in o){if(k==="visit")continue;const v=o[k];if(v&&typeof v==="object")w(v,d+1)}};
  for(const k of W_KEYS)if(root.S&&root.S[k]&&typeof root.S[k]==="object")w(root.S[k],0);w(root.R,0)};
 try{keyed({S,R:rivals},o=>{const k=rfKey(o);if(k)pre.set(k,o.fid)})}catch(e){}
 const G=new Map();keyed({S:sS,R},o=>{const k=rfKey(o)||"?";if(!G.has(o.fid))G.set(o.fid,[]);G.get(o.fid).push([k,o])});let n=0;
 for(const [fid,L] of G){if(new Set(L.map(x=>x[0])).size<2)continue;const keep=L.find(x=>pre.get(x[0])===fid)||L[0];
  for(const x of L)if(x[0]!==keep[0]){x[1].fid=null;n++;CW.faceDup=(CW.faceDup||[]).concat([[fid,x[0]]]).slice(-20)}}
 return n}
CW.friendPid=()=>{const f=CW.base&&CW.base.P&&CW.base.P[fs()];return f&&!f.dead&&f.S&&f.S.pid||null};
/* coop-pool-face backstop: the GUEST never decides a world person's face (the host draws every pool face, once). Her week end carries the
   room's face for every world person the room's world already has a face for, whatever her phone did to it (display re-picks, a clear by
   pidEnforce): the 3-way merge would otherwise take her change, since only she "changed" it. NPCs match by id, other world keys by path. */
function keepFaces(n,b,d){if(!n||!b||typeof n!=="object"||typeof b!=="object"||d>14)return;
 if(Array.isArray(n)){if(!Array.isArray(b))return;const m=new Map();for(const x of b)if(x&&typeof x==="object"&&x.id!=null)m.set(String(x.id),x);
  for(const x of n)if(x&&typeof x==="object"&&x.id!=null&&m.has(String(x.id)))keepFaces(x,m.get(String(x.id)),d+1);return}
 if(typeof b.fid==="string"&&b.fid&&n.fid!==b.fid){n.fid=b.fid;CW.faceKeep=(CW.faceKeep||0)+1}
 for(const k in n){const v=n[k];if(v&&typeof v==="object"&&b[k]&&typeof b[k]==="object")keepFaces(v,b[k],d+1)}}

/* put a freshly built life (S + throwaway world from start()) into the shared world W of C */
function attach(C){T("attach");if(!C||!C.W)return;const mp=me();
 const keep={};for(const k in S)if(!W_KEYS.includes(k))keep[k]=S[k];
 const known=S.emp&&S.emp.known;
 /* the new life knows nobody yet: drop every link into the throwaway world */
 keep.rl={};keep.ro={};keep.tonight=null;keep.toMorning=0;keep.heir=null;keep.evd={};keep.chat={};keep.cev={};keep.resHead=null;keep.where=null;keep.dead=false;
 S=keep;try{if(typeof nmBirth==="function")nmBirth(C)}catch(e){console.error("nmBirth",e)}/* coop-name-clash: her new life's people never repeat a name the room already holds (law 6b) */const sS=J(ser().S);
 const P={pid:mp,ok:S.origin&&S.origin.k,name:S.name,rank:S.rank,dead:false,srv:!!(S.srv&&!S.srv.risen),life:(CW.life||0)+1,S:{}};
 for(const k in sS)if(!W_KEYS.includes(k))P.S[k]=sS[k];splitP(sS,P.S);P.S.empKnown={};if(P.S.menP)for(const id in P.S.menP)P.S.menP[id]={};if(P.S.cmP)P.S.cmP={seen:{}};
 const C2=J(C);C2.P=C2.P||{};C2.P[CW.seat]=P;
 /* NPCs start fresh toward the new face */
 (C2.W.R||[]).forEach(r=>{for(const m of ["rl","ro","gp","ep"]){r[m]=r[m]||{};r[m][mp]=m==="gp"?R(15):0}if(r.evm)r.evm[mp]=0;if(r.resHead===mp)r.resHead=null});
 const wasSrv=!!(S.srv&&!S.srv.risen);
 fromCanon(C2);CW.life=P.life;
 if(known&&S.emp&&!Object.keys(S.emp.known||{}).length)S.emp.known={};
 if(S.foe&&!rivals.some(v=>v.name===S.foe)){const v=pick(liveRivals(false).filter(x=>!isF(x)));if(v)S.foe=v.name}
 if(wasSrv&&typeof srvInit==="function"){S.srv=null;quiet=true;try{withoutFriend(()=>srvInit())}catch(e){console.error(e)}quiet=false}
 S.place="home";S.visit={k:"home",people:homePeople(),talked:false};
 try{if(typeof sidN!=="undefined")sidN=Math.max(sidN,...allServ().map(s=>+s.sid||0).filter(n=>n<900),0)}catch(e){}}
CW.attach=()=>{const C=CW.dying||CW.base;if(C)attach(C)};
/* jcoopthin (thin guest, part A) reads the world split and the friend-entry builders from here: one source */
CW.X={W_KEYS,HOST_ONLY,CM_P,MEN_P,REFF,STAT,HOUSE,mapMe,buildFriend,buildFriendSrv,friendSrv,myBlob,pullFriend,pushFriend,isF,J};
CW.sendMe=P=>sendMe(P);CW.friendHome=friendHome;

/* ---------- sending ---------- */
/* ONE WORLD safety net (guest only): whatever world change her endTurn still rolled (a loop the guard table missed, an inline tick)
   is taken back before her week goes to the server, so a missed guard shows as "guest roll lost", never as a double count.
   c0 = her world just before endTurn, c1 = just after it (the guest's own rolls), c2 = now (after she answered the dawn dialogs):
   a path the endTurn changed and nothing changed since → c0; changed again later (her own act in a dialog) → numbers keep only the
   later delta (c0 + c2 − c1), anything else keeps c2. Her own rows on each NPC (rl/ro/gp/ep/evm[her pid]) are hers: always c2.
   Date keys roll the same on both seats (c2). The server merge (PROTOCOL §4) then adds only her real acts to the host's world. */
const NET_OWN=["rl","ro","gp","ep","evm"],NET_DATE=["year","month","tuan","turn","cnews"];
const nNum=x=>typeof x==="number"&&isFinite(x),nObj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x);
const nEq=(a,b)=>a===b||JSON.stringify(a)===JSON.stringify(b);
const nIdArr=x=>Array.isArray(x)&&x.length>0&&x.every(e=>nObj(e)&&e.id!=null);
function unroll(c0,c1,c2,own){if(own)return c2;if(nEq(c1,c0))return c2;if(nEq(c2,c1))return J(c0);
 if(nNum(c0)&&nNum(c1)&&nNum(c2))return c0+(c2-c1);
 if(nObj(c0)&&nObj(c1)&&nObj(c2)){const o={};for(const k of new Set([...Object.keys(c0),...Object.keys(c1),...Object.keys(c2)])){const v=unroll(c0[k],c1[k],c2[k],false);if(v!==undefined)o[k]=v}return o}
 if((nIdArr(c0)||nIdArr(c2))&&Array.isArray(c0)&&Array.isArray(c1)&&Array.isArray(c2)){const m0=new Map(c0.map(e=>[String(e.id),e])),m1=new Map(c1.map(e=>[String(e.id),e]));const out=[],seen=new Set();
  for(const e of c2){const id=String(e.id);seen.add(id);if(m0.has(id))out.push(m1.has(id)?unroll(m0.get(id),m1.get(id),e,false):e);else if(!m1.has(id))out.push(e)}
  for(const e of c0){const id=String(e.id);if(!seen.has(id)&&!m1.has(id))out.push(J(e))}   /* taken out by her endTurn roll: back */
  return out}
 return c2}   /* both changed and not mergeable: her act stands (the server's host-wins rule settles a clash) */
function unrollR(r0,r1,r2,mp){const o=unroll(r0,r1,r2,false);if(!nObj(o))return o;const own=String(mp);
 for(const m of NET_OWN){const a=r2&&r2[m];if(a&&own in a){o[m]=nObj(o[m])?o[m]:{};o[m][own]=a[own]}else if(o[m]&&nObj(o[m]))delete o[m][own]}return o}
function guestNet(C){const n=CW.net;if(host()||!n||n.week!==C.week||!n.c1||!C.W||stateOn("guestNet"))return C;const mp=me(),W0=n.c0.W,W1=n.c1.W,W2=C.W;
 const S0=W0.S||{},S1=W1.S||{},S2=W2.S||{},SO={};
 for(const k of new Set([...Object.keys(S0),...Object.keys(S1),...Object.keys(S2)])){const v=NET_DATE.includes(k)||HOST_ONLY.includes(k)?S2[k]:unroll(S0[k],S1[k],S2[k],false);if(v!==undefined)SO[k]=v}
 const m0=new Map((W0.R||[]).map(r=>[String(r.id),r])),m1=new Map((W1.R||[]).map(r=>[String(r.id),r]));const R=[],seen=new Set();let back=0;
 for(const r of W2.R||[]){const id=String(r.id);seen.add(id);if(m0.has(id))R.push(unrollR(m0.get(id),m1.has(id)?m1.get(id):r,r,mp)/* missing right after the week end: treat all of it as the roll */);else if(!m1.has(id))R.push(r)}
 for(const r of W0.R||[]){const id=String(r.id);if(!seen.has(id)&&!m1.has(id)){R.push(J(r));back++}}
 C.W={S:SO,R,rid:W0.rid!=null?Math.max(W0.rid,W2.rid||0):W2.rid};return C}
CW.unroll=unroll;CW.guestNet=guestNet;
/* her world just before and just after her whole week end: called by jcoopone.js around the OUTERMOST endTurn (every module's wrapper inside) */
/* review/coop-flakes (D20, law 6b: ONE person, ONE link). Move key `from` of an id-keyed map to `to` (a stand-in → her world id: jcoopask
   settle; a person the host had to give another id: jcoopthinc lens re). When `to` already holds a number it is the SAME person's (the
   host ran her week with that id; a missing link starts at 0, j9 affAdd), so a LINK (rl / ro: the map's key pk is in BAL.linkRange) ADDS,
   clamped to that range; keeping one and dropping the other lost her thiện cảm (25 → −3, coop-guest-maid). Any other number is a week stamp /
   turn / count (S.met, S.askAt, S.dKnown, S.seen = wk(); rv: adding them put «met» in week 82 at week 42): the larger stays, as jnamefix does
   for a renamed key. Other values: the one already at `to` stays. to == null: the key is dropped (a refused stand-in). */
CW.keyMove=function(o,from,to,pk){if(!o||typeof o!=="object"||!(from in o))return;const v=o[from];delete o[from];if(to==null)return;
 if(!(to in o)){o[to]=v;return}const w=o[to];if(typeof v==="number"&&typeof w==="number"){const L=BAL.linkRange[pk];o[to]=L?Math.max(L[0],Math.min(L[1],v+w)):Math.max(v,w)}};
CW.netWrap=function(f,self,args){if(!CW.on||host()||stateOn("netWrap")){return f.apply(self,args)}/* part C: the guest's world is read-only, no safety net needed */const p0=CW.pend;let c0=null;try{c0=toCanon()}catch(e){}
 const r=f.apply(self,args);try{if(!p0&&CW.pend&&c0)CW.net={week:wk(),c0,c1:toCanon()}}catch(e){CW.net=null}return r};
function sendEnd(){if(!CW.on||!S||S.dead||CW.sent===wk()||CW.cyHold!=null/* the host's night waits for her cycle answer (B2 × jcycle) */||cyHer())return;const C=guestNet(toCanon());CW.sent=wk();CW.pend=false;CW.mine=snapStats();
 COOP.send({t:"end",week:wk(),state:C});try{localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,C}))}catch(e){}lockNext()}
/* P0 (co-op thin part B, jcoopthinb): the person the HOST built for her (her Luân hồi on the host); sent as it is, never re-serialized here */
function sendMe(P0){T("sendMe "+(S&&S.dead));if(!CW.on||!S||S.dead)return;
 /* a new life: the old life's pending / sent week end is void (the server drops my sent end on `me`); she ends this week herself */
 if(CW.base){CW.pend=false;if(CW.sent===wk())CW.sent=-1;CW.bend=false;CW.nrdy=-1;CW.ngoW=-1}
 const C=P0&&CW.base?null:toCanon();CW.dying=null;
 if(!CW.base){/* host's first world */COOP.send({t:"init",state:C,nb:typeof B4N==="number"?B4N:3});CW.base=C}else{const Pm=P0||C.P[CW.seat];COOP.send({t:"me",P:Pm});CW.base.P=CW.base.P||{};CW.base.P[CW.seat]=J(Pm)}
 try{if(CW.base&&CW.base.P&&CW.base.P[fs()]&&!friendEntry())placeFriend(CW.base.P[fs()])}catch(e){console.error(e)}
 /* jkc: the friend chose first and is at home: say so once (her entry into the palace is told by onWeek) */
 try{const fP=CW.base&&CW.base.P&&CW.base.P[fs()];if(fP&&!fP.dead){const home=friendHome(fP);CW.fWasHome=home;const fk=(fP.name||"")+"#"+(fP.life||0)+"h";
  if(home&&CW.fNote!==fk){CW.fNote=fk;pushModal({t:"Hảo hữu chọn thân phận",h:`<p>Hảo hữu ngươi đã chọn xong thân phận, nay còn ở nhà cha chờ kỳ tuyển tú, chưa vào cung. Mặt mũi, tên tuổi kiếp này ra sao, phải gặp mới biết.</p><p class="past">Qua kỳ tuyển tú, nàng sẽ vào cung; khi ấy hai người mới gặp được nhau.</p>`});try{showModal()}catch(e){}}}}catch(e){console.error(e)}
 /* a new life starts in the room's CURRENT buổi (the friend may already be in buổi chiều / tối) */
 if(CW.p2&&typeof CW.rbuoi==="number"&&(S.buoi||0)!==CW.rbuoi&&CW.rweek===wk()){S.buoi=CW.rbuoi;used=0;try{placeWhere()}catch(e){console.error(e)}}
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);CW.posKey="";sendPos();render()
 /* review/coop-week-stall: the gate above is reset (nrdy / ngoW) and nothing looked at it again: a life that ended in her night (died at
    the week end, reborn) landed in the room's buổi tối while the friend's end was already out (= the host's commit, nCheck) and sat there
    for ever, her end never sent (coop-e2e fixE3 r9 "week 3 advanced"; the reviewer's "after rebirth" stalls). Look once the new life is in. */
 setTimeout(()=>{try{nCheck();soonEnd()}catch(e){console.error(e)}},0)}
function snapStats(){const o={};for(const k of ["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","rank"])o[k]=S[k];return o}
function waiting(){const s=COOP.state;return CW.on&&(CW.sent===wk()||!!(s.ended&&s.ended[CW.seat]))}
function frozen(){const s=COOP.state;return CW.on&&(s.status!=="open"||!s.peerOnline||!!CW.hold)}  /* CW.hold: the two are on different builds (swreg.js, KIT §35.2) */
/* touch #next only when its state really changes (j63 observes every "disabled" write) */
function lockNext(){const n=$("next");if(!n)return;const eR=!!(CW.on&&eW()&&CW.eWait&&CW.eWait());const wb=CW.on&&(CW.bend||eR||nReady()||needWhere()||!!CW.pendBuoi);const gap=!!(CW.on&&(CW.lvWas|0)>=5&&!eW());/* r1 #3: reconnected, the room level not back yet: no press may take the old road */const lock=CW.on&&(waiting()||frozen()||CW.pend||!CW.base||wb||gap);
 if(lock){if(!n.disabled)n.disabled=true;if(n.dataset.coopWait!=="1")n.dataset.coopWait="1";/* owner 16/11 (owner-coop-stuck.jpg: faded "Sang buổi", no word): every lock says why */
  const s=COOP.state;const t=(CW.bend||eR||nReady()||waiting()||CW.pend)?CTM_WAIT.coopWaitPeer:wb?CTM_WAIT.coopWaitPeer2:CW.hold?CTM_WAIT.coopWaitBuild:frozen()?(s.status==="moved"?CTM_WAIT.coopMoved:s.status!=="open"?CTM_WAIT.coopRelink:CTM_WAIT.coopAbsent):CTM_WAIT.coopLinking;if(t&&n.textContent!==t){/* keep the button's own width (the tabs beside it must not shrink): the longer words wrap inside */
  if(!n.style.maxWidth&&n.offsetWidth)n.style.maxWidth=n.offsetWidth+"px";n.classList.add("kcwait");n.textContent=t}}
 else if(n.dataset.coopWait){delete n.dataset.coopWait;n.style.maxWidth="";n.classList.remove("kcwait");n.disabled=!!(S&&(S.dead||Q.length||S.mg));const t=CW.on?"Sẵn sàng":S&&(S.buoi||0)>=(typeof B4L==="number"?B4L:2)?"Sang ngày mới":"Sang buổi";if(n.textContent!==t)n.textContent=t}
 /* nothing locks it and nothing is open (render's own rule): a dialog closed by the host's patch (part D / E) without a render left it off */
 else if(CW.on&&n.disabled&&S&&!S.dead&&!Q.length&&!S.mg)n.disabled=false}
/* ---------- phase 2 (PROTOCOL §9): same buổi, same place, acts between the two ---------- */
Object.assign(CW,{bend:false,whereKey:"",lastWhere:null,fpos:null,posKey:"",p2:true,allow:false,acts:{},rpend:{}});
const bkey=()=>wk()+":"+((S&&S.buoi)||0);
/* thin guest part E (jcoopthine, level 5): ONE switch eW(); the buổi step is the host's for both seats: the old bend / buoi / badbuoi / pendBuoi /
   needWhere / where / ctm-nr paths below step aside (bypassed here, deleted when level >= 5 is the default, part H) */
const eW=()=>!!(CW.thin&&CW.thin.on&&CW.thin.on(5));CW.eW=eW;
/* thin F1 (jcoopthinf, level 6): her acts run on the host as intents; ONE switch fW() */
const fW=()=>!!(CW.thin&&CW.thin.on&&CW.thin.on(6));CW.fW=fW;
function needWhere(){if(eW())return false;return CW.on&&CW.p2&&!host()&&CW.whereKey!==bkey()}
/* her place as I see it: her "home" is her own palace; my palace in her eyes ("r"+my pid) is my "home" */
function mapPlace(pl){if(!pl)return null;if(pl==="home"){const f=friendEntry();return f?palaceOf(f):null}if(pl==="r"+me())return"home";return pl}
function sendWhere(){if(eW())return;if(!CW.on||!CW.p2||!host()||!S||!S.where)return;const W=mapMe(J(S.where),true,me());delete W[String(fp())];if(S.menW)W.__menW=J(S.menW);
 try{const t=typeof toil2Wire==="function"?toil2Wire():null;if(t)W.__tl2=t}catch(e){}/* G11: the NPCs' chosen faces of the day (host decides, jagtoil) */
 COOP.send({t:"where",week:wk(),buoi:S.buoi||0,W})}
function setWhere(m){if(!m||!m.W||!S||host()||m.week!==wk()||m.buoi!==(S.buoi||0))return false;
 const W=mapMe(J(m.W),false,me());const mw=W.__menW;delete W.__menW;const tl2=W.__tl2;delete W.__tl2;try{if(tl2&&typeof toil2Take==="function")toil2Take(tl2)}catch(e){}const fpl=S.where&&S.where[fp()];S.where=W;if(fpl)S.where[fp()]=fpl;if(mw)S.menW=mw;
 CW.whereKey=bkey();return true}
function applyWhere(m){if(!m||!m.W||!S||host())return;CW.lastWhere=m;if(!setWhere(m))return;refreshHere();render()}
/* coop-arrive-see: */const lens7=()=>!!(CW.on&&!host()&&CW.thin&&CW.thin.on&&CW.thin.on(7));/* her phone at level 7+: her visit is the host's (one source) */
/* people at my current place, from S.where (no travel, no side effects): NPCs + the Emperor + my friend */
function refreshHere(){if(!S||!S.visit||S.dead||lens7())return;const k=S.place||"home",W=S.where||{};const P=S.visit.people||[];
 const isR=p=>p&&(p.kind==="rival"||p.kind==="hh")&&p.ref;
 /* coop-arrive-see: her stored person on the host keeps refs as {$r:id}; the friend entry (the host's stand-in) is re-made in every
    withSeat, so her old entry of him comes back with ref null: it is still HIM (same name), never a second copy beside the new one */
 const f0=friendEntry();const fN=f0?[f0.name,`Hoàng hậu ${f0.name}`]:[];const isFp=p=>!!p&&(p.kind==="rival"||p.kind==="hh")&&(p.ref?isF(p.ref):fN.includes(p.name));
 if(k==="home"){const f=f0;const L=P.filter(p=>!isFp(p));if(f&&W[f.id]==="home")L.push(rp(f));S.visit.people=L;return}
 const here=liveRivals(true).filter(v=>W[v.id]===k);const L=P.filter(p=>!isFp(p)&&(!isR(p)||here.includes(p.ref)));
 for(const v of here)if(!L.some(p=>isR(p)&&p.ref===v))L.push(v.queen&&qOn()?{...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"Phượng"}:rp(v));
 const ei=L.findIndex(p=>p.kind==="emp");if(W.emp!==k&&ei>=0&&["vuon","thu","dtd"].includes(k))L.splice(ei,1);
 else if(W.emp===k&&ei<0&&["vuon","thu"].includes(k))L.unshift({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:`niên hiệu ${empEra()} · ${MOODS[S.emp.mood][0].toLowerCase()}`});
 S.visit.people=L}
const LIVE=["sung","danh","suc","sac","tai","tamco","duc","rank","age"];
/* her pets, live (co-op pets, owner 15/11 20:05Z): compact list, so the friend's acts aim at the pets she really has now */
const PETF=["t","at","full","clean","joy","aff","stg","care","src","from"];
function petLive(){return {L:(S.pets||[]).map(P=>{const o={};for(const k of PETF)if(P[k]!=null)o[k]=typeof P[k]==="number"?Math.round(P[k]):P[k];return o}),on:S.petOn==null?-1:S.petOn,b:S.petB||null,bn:S.petBn||0}}
/* B1: her bag (every entry with its index `ci`, so an act's op names the very item) and her living children, live */
function bagOf(L){return (L||[]).map((e,i)=>e&&typeof e==="object"?Object.assign(J(e),{ci:i}):null).filter(Boolean)}
const KIDX=["mom","v","by"];
function kidsCopy(L){return (L||[]).filter(k=>k&&k.alive!==false).map(k=>{const o={};for(const x in k){const y=k[x];if(KIDX.includes(x))continue;if(y==null||typeof y!=="object")o[x]=y}o.alive=true;return o})}
function famLive(){return {bag:bagOf(S.inv),kids:kidsCopy(S.kids),preg:S.preg&&!S.hidden?S.preg:0,fake:S.preg&&!S.hidden&&S.fake?1:0,fx7:J((S.j71&&S.j71.fx)||null)/* p2 B4: her festival entries */}}
/* r1 fix 1: the LIVE Worker drops a whole pos over 4000 chars (coop/worker index.js:168). Her bag / kids / pregnancy / festival entries
   and pets ride their OWN act relay (k "ctm-fam", no cap but the 9e6 message limit), sent when they change; pos carries only their
   hash `fh` (place, khắc, stats stay small and always update). The friend asks again ("ask") when the hash she holds differs (a relay
   missed while she was away, a rejoin from the room's stored pos). Old clients still send / read an inline pos.fam / pos.pets. */
const FK="ctm-fam";
function hstr(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)+"."+s.length}
function famPack(){const pl=petLive(),fm=famLive();return {pl,fm,h:hstr(JSON.stringify([pl,fm]))}}
/* a relay keyed "already sent" (posKey / famSentH) keeps that key only once the send went out: a send on a socket that is down or
   reconnecting returns false and is lost, so the key is cleared and the next render says it again (review npc-chain-land #3: the friend
   kept her old Điểm trang look on the other seat under load). A reconnect (room) or the friend coming back (peer) clears them too. */
function sentOr(r,clr){try{if(r&&typeof r.then==="function")r.then(ok=>{if(!ok)clr()},()=>clr());else if(r===false)clr()}catch(e){}}
function sendFam(P){if(CW.ctx||!CW.on||!S||S.dead)return;P=P||famPack();const h=P.h;CW.famSentH=h;sentOr(COOP.send({t:"act",k:FK,mode:"fam",h:P.h,pets:P.pl,fam:P.fm,name:S.name,id:FK+":"+newId()}),()=>{if(CW.famSentH===h)CW.famSentH=""})}
CW.famPack=famPack;
function sendPos(){if(CW.ctx||!CW.on||!CW.p2||!S||S.dead)return;const st={};for(const x of LIVE)st[x]=S[x];
 const P=famPack();if(P.h!==CW.famSentH)sendFam(P);
 const tl=S.toilette&&S.toilette.wk===wk()?J(S.toilette):null,wd=S.wd?J(S.wd):null;const fx={};for(const x of FXL)fx[x]=S[x]==null?null:J(S[x]);const fxs=JSON.stringify(fx);/* her look of the day + worn clothes, live (diemtrang-coop-look) */
 const hs=houseWire(),hss=JSON.stringify(hs);
 const k=[wk(),S.buoi||0,S.place||"home",used,LIVE.map(x=>S[x]).join("/"),!!S.out,S.name,P.h,tl?JSON.stringify(tl):"",wd?JSON.stringify(wd):"",fxs,hss].join(":");if(k===CW.posKey)return;CW.posKey=k;
 sentOr(COOP.send({t:"pos",place:S.place||"home",khac:used,week:wk(),buoi:S.buoi||0,st,fh:P.h,out:!!S.out,alive:!S.dead,name:S.name,life:CW.life||0,tl,wd,fx,hs}),()=>{if(CW.posKey===k)CW.posKey=""})}
/* robot-coop-fix-3 (robot10-coop coop-pos «X sees the friend at r<N>, she is at <place>»; law 6b real people): ONE cause, her HOUSE. Her place
   on the other seat is S.where[her id] = her relayed place, and «home» / no relay this buổi = palaceOf(her entry) — which reads her entry's
   housing (resHead / resHall / pal / palLone / palWait). That housing reached the other seat only inside her character blob (new life) or the
   merged week, and that seat's own palFix (render / month / deser) housed her entry like an NPC (a house over the cap evicts «the newest
   extras», a side hall is re-picked, j95cCap drops the last resident) → her entry said «lives at r5» while she lives elsewhere. Now her house
   rides the pos relay like her live stats (canon ids: "me" = her pid; the reader maps its own pid to "me"); no seat's palFix writes her entry's
   housing (jpal / j95cCap: a player, like S, claimed first); her last relayed house is put back at every keepFriendPos (a merged week rebuilds
   her entry from her blob). Display only: the week write-back never sends a house back (jcoophl keeps the room base's housing). */
function houseWire(){const o={};for(const x of HOUSE)o[x]=S[x]==null?null:J(S[x]);return mapMe(o,true,me())}
function houseIn(f,hs){if(!hs||typeof hs!=="object")return false;const o=mapMe(J(hs),false,me());let ch=false;
 for(const x of HOUSE){if(!(x in o))continue;if(JSON.stringify(f[x]==null?null:f[x])!==JSON.stringify(o[x])){if(o[x]==null)delete f[x];else f[x]=o[x];ch=true}}return ch}
/* her last relayed house onto her entry again (after anything on this seat re-housed it); same life only (a reborn friend has a new entry) */
function friendHouse(){if(!CW.on||!S)return false;const f=friendEntry(),m=CW.fpos;if(!f||!m||!m.hs||(m.name&&m.name!==f.name))return false;return houseIn(f,m.hs)}
CW.houseWire=houseWire;CW.houseIn=houseIn;CW.friendHouse=friendHouse;
/* her own numbers, live: shown on her entry; the week write-back baseline moves with them so the merge never counts them as mine */
function liveStats(m){const f=friendEntry();if(!f||!m.st||(m.name&&m.name!==f.name))return false;let ch=false;
 for(const x of LIVE){const v=m.st[x];if(typeof v!=="number")continue;if(x==="rank"&&f.queen)continue;if(f[x]!==v){f[x]=v;ch=true}if(f.__b&&x in f.__b)f.__b[x]=v}
 if(f.__b)f.__b.rank=f.rank;
 if(m.tl&&typeof m.tl==="object"&&JSON.stringify(m.tl)!==JSON.stringify(f.toilette||null)){f.toilette=J(m.tl);ch=true}/* her look of the day (jtoil toilFriendRec) */
 if(m.wd&&typeof m.wd==="object"&&JSON.stringify(m.wd)!==JSON.stringify(f.wd||null)){f.wd=J(m.wd);ch=true}/* the clothes she wears (jtoil toilDress) */
 if(m.fx&&typeof m.fx==="object"){const bx=f.__b&&f.__b.fx;for(const x of FXL){if(!(x in m.fx))continue;if(bx&&!fxEq(f[x],bx[x]))continue;/* a mark this seat put on her this week waits for the week write-back */
  const v=m.fx[x];if(!fxEq(v,f[x])){f[x]=J(v);ch=true}if(bx)bx[x]=v==null?null:J(v)}}/* her face marks, live (review/looks-2) */
 if(famIn(f,m.fam,m.pets))ch=true;
 if(houseIn(f,m.hs))ch=true;
 return ch}
/* her bag / kids / pregnancy / festival entries / pets onto her entry (inline pos of an old client, or the ctm-fam relay) */
function famIn(f,fm,pets){let ch=false;
 if(fm&&Array.isArray(fm.bag)){if(JSON.stringify(fm.bag)!==JSON.stringify(f.inv||[])){f.inv=fm.bag.map(o=>o&&typeof o==="object"?Object.assign({},o):o);if(typeof itCleanL==="function")itCleanL(f.inv);ch=true}
  if(JSON.stringify(fm.kids||[])!==JSON.stringify(f.kids||[])){f.kids=(fm.kids||[]).map(o=>Object.assign({},o));ch=true}
  if((fm.preg||0)!==(f.preg||0)){f.preg=fm.preg||0;f.fake=fm.fake||0;ch=true}f.fx7=fm.fx7||null}
 if(pets&&Array.isArray(pets.L)){const L=pets.L.map(o=>Object.assign({},o));if(JSON.stringify(L)!==JSON.stringify(f.pets||[])){f.pets=L;f.petOn=pets.on;f.petB=pets.b;f.petBn=pets.bn;ch=true}}
 return ch}
function famTake(){const m=CW.famLast,f=friendEntry();if(!m||!f||(m.name&&m.name!==f.name))return false;CW.famGotH=m.h;/* compared with her entry each time: a rebuilt entry (merged week) gets the live bag back */return famIn(f,m.fam,m.pets)}
function famAsk(h){const t=Date.now();if(CW.famAsk&&CW.famAsk.h===h&&t-CW.famAsk.t<4000)return;CW.famAsk={h,t};COOP.send({t:"act",k:FK,mode:"ask",h,id:FK+":"+newId()})}
COOP.on("act",m=>{if(!m||m.k!==FK||!CW.on||m.from===CW.seat||!S)return;
 if(m.mode==="ask"){if(!S.dead)sendFam();return}
 if(m.mode!=="fam"||typeof m.h!=="string")return;CW.famLast=m;if(famTake()){refreshHere();if(!Q.length)render()}});
/* thin F2 (level 7): on the host her place comes from ONE source, her stored person (her walks run there as intents, her buổi step too);
   the place in her pos relay is not read (pos stays for her live stats / look until part H) */
function herPl7(){try{if(!host()||!(CW.thin&&CW.thin.on&&CW.thin.on(7)))return null;const B=CW.thin.seatOf(CW.seat==="a"?"b":"a");return B&&B.S&&B.S.place||null}catch(e){return null}}
CW.herPl7=herPl7;
function onPos(m){if(!CW.on||m.from===CW.seat||!S)return;CW.fpos=m;const pl=mapPlace(herPl7()||m.place);const f=friendEntry();if(!f)return;
 let sc=liveStats(m);if(typeof m.fh==="string"){if(famTake())sc=true;if(CW.famGotH!==m.fh)famAsk(m.fh)}S.where=S.where||{};const was=S.where[f.id];S.where[f.id]=pl||palaceOf(f);if(was!==S.where[f.id]||sc){refreshHere();presAll(true);if(!Q.length)render()}}
function keepFriendPos(){if(!CW.on||!S||!S.where)return;const f=friendEntry();if(!f)return;friendHouse();/* part E (CW.ctx: her step on the host = the host's own place) and her relayed place: ONE rule, friendPl */S.where[f.id]=friendPl(f)}
/* where the friend is on this seat, ONE rule (keepFriendPos; onPos writes the same from the message it holds): part E (CW.ctx) the host's own
   place; else her relayed place this buổi (herPl7 at level 7); else her palace (palaceOf her entry = her relayed house, above). j9 whereOf reads
   S.where first, so every reader (people at a place, who sees whom, catches) gets this. (j95's roster never runs in co-op: j95on() = !COOPW.on.) */
function friendPl(f){if(CW.ctx){const o=CW.thin&&CW.thin.outerS;return o&&o.place&&o.place!=="home"?mapPlace(o.place):palaceOf(f)}const h7=herPl7();const pl=h7?mapPlace(h7):CW.fpos&&CW.fpos.week===wk()&&CW.fpos.buoi===(S.buoi||0)?mapPlace(CW.fpos.place):null;return pl||palaceOf(f)}
CW.keepFriendPos=keepFriendPos;CW.refreshHere=()=>refreshHere();
function onBuoi(m){T("onBuoi "+m.week+"."+m.buoi+" me "+wk()+"."+(S&&S.buoi)+" Q"+Q.length+(S&&S.mg?" mg":""));if(!CW.on||!S||eW())return;CW.bend=false;CW.wantB=null;drainAg();
 /* the room moved on: if a dialog is still open, step as soon as it is closed */
 if((Q.length||S.mg)&&m.week===wk()&&(S.buoi||0)===m.buoi-1){CW.pendBuoi=m;lockNext();return}CW.pendBuoi=null;
 if(m.week===wk()&&(S.buoi||0)===m.buoi-1&&!S.dead){CW.allow=true;try{nextBuoi()}finally{CW.allow=false}}
 /* the room is further on (came back after both steps, or a pendBuoi older than the room): next step at once */
 if(!S.dead&&typeof CW.rbuoi==="number"&&CW.rweek===wk()&&CW.rbuoi>(S.buoi||0)&&(S.buoi||0)===m.buoi)setTimeout(()=>{if(CW.on&&S&&CW.rweek===wk()&&CW.rbuoi>(S.buoi||0))onBuoi({week:wk(),buoi:(S.buoi||0)+1})},0);
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);sendPos();lockNext()}
/* the ag deferred jobs (jagent AG LATER) finish before a seat ends / steps its buổi: a dialog they queue shows BEFORE the Q checks below */
function drainAg(){try{if(typeof agDrain==="function")agDrain()}catch(e){console.error(e)}}
/* a "Sẵn sàng" press is never lost (npc-chain-land #2): pressed while a dialog / mini game is up or the host's places are not in yet, it is
   kept (CW.wantB = this buổi) and done as soon as they clear (tryEnd); a step of the room or a new week drops it */
function wantB(){if(!S||S.dead)return;CW.wantB=bkey();T("wantB "+CW.wantB);try{if(Q.length&&$("modal").hidden&&!qBlocked())showModal();else if(Q.length&&!qT)qT=setTimeout(reshowQ,400)}catch(e){}}
function bend(){T("bend "+wk()+"."+(S&&S.buoi));if(CW.bend||eW())return;CW.bend=true;COOP.send({t:"bend",week:wk(),buoi:S.buoi||0});lockNext()}
/* review coop-thin-f1 r1 #3: after a reconnect the room level is 0 until the server's "thin" answer; a Sẵn sàng pressed in that gap took the
   old road (bend) and CW.bend stayed set once the level was back (onBuoi / rebend are off at thin level): his #next stood on "Chờ hảo
   hữu…" for ever (coop-cyc THIN=6, host 'room 0.0' → 'bend 0.0'). Now #next is locked in that gap (lockNext: gap, the coopLinking word) and a
   bend left from before is the part-E ready once the level is back: the same press, kept. */
COOP.on("thin",()=>{try{CW.lvWas=(CW.thin&&CW.thin.lvl)|0}catch(e){}});COOP.on("room",()=>setTimeout(()=>{try{lockNext()}catch(e){}},0));COOP.on("stop",()=>{CW.lvWas=0});
COOP.on("thin",()=>setTimeout(()=>{try{lockNext();if(!CW.on||!CW.bend||!eW())return;T("unbend "+wk()+"."+(S&&S.buoi));CW.bend=false;CW.wantB=null;if(CW.eNext)CW.eNext();lockNext()}catch(e){console.error(e)}},0));
/* a night with the Emperor spends the rest of her day (jnight). In co-op the day only moves through the sync path above:
   sáng / chiều → `bend` (the server's `buoi` then runs the real step for both), tối → endTurn → `end` → the merged week.
   CW.nightEnd() ends THIS seat's current buổi once: nothing while her buổi is already ended (bend sent, week pending / sent), while
   the room is frozen, while a dialog or a room step is pending, or while her buổi is not the room's buổi (never ahead of the friend).
   Returns the buổi key it ended ("week:buổi") or "" (nothing done: jnight asks again on the next render). */
CW.nightEnd=function(){drainAg();if(!CW.on||!S||S.dead||Q.length||S.mg)return"";if(waiting()||frozen()||CW.pend||!CW.base||CW.bend||CW.pendBuoi||needWhere())return"";
 const b=S.buoi||0;if(typeof CW.rbuoi==="number"&&CW.rweek===wk()&&CW.rbuoi!==b)return"";
 const k=bkey();used=BAL.time.khac;nextBuoi();return (CW.bend||nReady()||CW.pend||(S.buoi||0)!==b||(eW()&&CW.eAsked&&CW.eAsked()))?k:""};/* thin E: her ready (or his) is the end of this buổi */
CW.bkey=bkey;
COOP.on("buoi",onBuoi);
/* the room's current buổi (for a reborn life that joins mid-week) */
const rb=m=>{if(m&&typeof m.buoi==="number"){CW.rbuoi=m.buoi;CW.rweek=m.week!=null?m.week:wk()}};
COOP.on("buoi",rb);COOP.on("presence",rb);COOP.on("room",rb);COOP.on("week",m=>{CW.rbuoi=0;CW.rweek=m.week});
COOP.on("bended",m=>{if(CW.on)lockNext()});
COOP.on("where",m=>{CW.lastWhere=m;if(CW.on)applyWhere(m)});
COOP.on("pos",onPos);
COOP.on("error",m=>{T("err "+m.code+" "+m.msg);if(CW.on&&m.code==="badbuoi"&&!eW()){CW.bend=false;/* refused because the room is already further on: catch up */if(S&&!S.dead&&CW.rweek===wk()&&typeof CW.rbuoi==="number"&&CW.rbuoi>(S.buoi||0))onBuoi({week:wk(),buoi:(S.buoi||0)+1});lockNext()}});

/* acts between the two (PROTOCOL §9.1). Every act tab works on her entry exactly as on an NPC (same place/rank/conditions).
   mode "do": I resolve it here (odds, detection, my costs, text) and send `res` with the effect on her; she applies it to her own S
   (death → rebirth, lãnh cung → cold) and sees a note only when she would notice it. The week write-back baseline of her entry is
   moved so the merge does not count it twice.  mode "invite" (Kết giao, Tặng quà): she gets a choice card first; Nhận → I run it. */
const ASK=["ally","gift","pmplay","pmduel"];/* jpma: Cùng chơi / Thách đấu ask the friend first */
const askWhat=(k,item)=>k==="gift"?`muốn tặng ngươi ${esc(item||"một món quà")}`:k==="pmplay"?"mời ngươi cùng chơi một ván":k==="pmduel"?"thách ngươi so tài một ván, hai bên đặt cược ngang giá":"muốn kết giao với ngươi";
/* foreman E #14 ruling (3) 20/11 (owner: «những cái gì mà tôi có thể làm với NPC là tôi vẫn có thể làm với bạn»): a duel ask from a friend who OUTRANKS
   the reader also offers «Nhường bề trên», the same answer as on an NPC's challenge (jpma pmCoopYield); ok:"yield" rides back like Nhận / Từ chối */
/* review r1 fix 1 + 2 (person-minigame-acts): a Cùng chơi / Thách đấu ask carries her pick x = {a, kind, ak, n, s} in every carrier (old relay act,
   part-D host D.kind inv, guest doSend inv, the pp of the card) and the card is the NPC's card (jpma pmCoopCard); send(ok) = the relay's answer */
/* Q-C2: the live raws ride on the pm pick (jpma pmLvSan checks them); any other act keeps its extra as it is */
const pmLvX=(ex,lv)=>{try{const z=lv&&ex&&typeof ex==="object"&&typeof pmLvSan==="function"?pmLvSan(lv):null;return z?Object.assign({},ex,{live:z}):ex}catch(e){return ex}};
const askX=(k,extra)=>typeof pmCoopX==="function"?pmCoopX(k,extra):null;
const askCard=(k,x,send)=>{try{const c=typeof pmCoopCard==="function"&&x?pmCoopCard(friendEntry(),k,x):null;if(!c)return null;return{h:c.h,o:c.o.map(o=>({n:o.n,fx:{},x:o.x,need:o.need,tsDis:o.tsDis,go:()=>{if(typeof pmLiveAns==="function")pmLiveAns(k,x,o.ok,send);else send(o.ok)}}))}}catch(e){console.error(e);return null}};/* Q-C2: «Nhận» on a pm ask opens the live board first (jpma pmLiveAns); send(ok, lv) then carries the two raws */
const askYield=(k,go)=>{try{const y=k==="pmduel"&&typeof pmCoopYield==="function"?pmCoopYield(friendEntry(),S):null;return y?[{n:y.n,fx:{},x:y.x,go}]:[]}catch(e){return[]}};
/* part D (review/coop-thin-d): the cards between the two are built on the host in her context (jcoopthin §6); dOn() = that path is on */
const dOn=()=>!!(CW.thin&&CW.thin.dOn&&CW.thin.dOn());
const PUB=["petcare","accuse","vp","xx","gift","ally","steal","road","takeaway","tocao","trinhth","trinhhh","xinhh","uyhiep","judge"];
const DK=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat"];
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function fsnap(v){const o={};for(const k of DK.concat(["confined","rel","oan"]))o[k]=v[k]||0;o.alive=v.alive;o.out=!!v.out;o.em=(v.evm&&v.evm.me)||0;return o}
function sendRes(v,k,b0,txt,id,pet,items,fam){if(CW.ctx&&!fW()){/* jpma r3 fix B: TH.bridge carries stats only; the «Cùng chơi» practice of the host lands on his own S once her context closes */
  const ar=(fam||[]).filter(o=>o&&o.op==="art");if(ar.length&&CW.thin&&CW.thin.D&&CW.thin.D.after)CW.thin.D.after(()=>{try{for(const l of famApply(ar).out)log(l)}catch(e){console.error("pm art",e)}});return}/* part D: her act on the host run by the host in her context: TH.bridge carries it */const b1=fsnap(v);const fx={};for(const x of DK)if(b1[x]!==b0[x])fx[x]=b1[x]-b0[x];
 const flags={rel:b1.rel-b0.rel,oan:b1.oan-b0.oan,em:b1.em-b0.em,conf:b1.confined-b0.confined,dead:b0.alive&&!b1.alive,cold:!b0.out&&b1.out};
 const t=String(txt||"").replace(/<[^>]+>/g,"");const caught=/bị lộ|bị bắt|phát giác|khai ra|tố giác/.test(t);
 /* review/looks-2 r1 FAIL 1: face marks / looks the act put on her entry ride THIS message (tuần-scoped looks would expire before the week write-back);
    her seat merges them at once (jlooks lkMergeIn); toilette.lk = smudge / ink of her made-up day ("tlk") */
 const fxl={};try{const bx=v.__b&&v.__b.fx;if(bx)for(const x of FXL)if(!fxEq(v[x],bx[x])&&v[x]!=null)fxl[x]=J(v[x]);const tlk=v.toilette&&v.toilette.lk||null;if(v.__b&&tlk&&!fxEq(tlk,v.__b.tlk))fxl.tlk=J(tlk)}catch(e){}
 const any=Object.keys(fx).length||flags.rel||flags.oan||flags.em||flags.conf||flags.dead||flags.cold||(pet&&pet.length)||(items&&items.length)||(fam&&fam.length)||Object.keys(fxl).length;if(!any&&!PUB.includes(k))return;
 /* she notices what an NPC's act would show her: open acts and caught schemes name me, a hidden harm only shows its effect */
 const seen=PUB.includes(k)||caught?"named":any?"effect":"";
 if(v.__b){for(const x of STAT)v.__b[x]=v[x];v.__b.rel=v.rel;v.__b.oan=v.oan;v.__b.em=(v.evm&&v.evm.me)||0;v.__b.out=v.out;v.__b.rank=v.rank;v.__b.fx=fxSnap(v);v.__b.tlk=v.toilette&&v.toilette.lk?J(v.toilette.lk):null}
 if(flags.dead)v.alive=true;if(flags.cold)v.out=false;   /* her death / lãnh cung happen on her side; her entry follows from her `me` / week */
 /* thin F1 (level 6): HER act on the host, run on the host in her context (jcoopthinf): ONE engine, no message. What it did to the host's
    stand-in lands on the host's real person through the same local applier the target always used (resApply: items, children, pets,
    pregnancy, marks, death / lãnh cung, his note), in the host's context once her context closes. The stand-in's baseline (and its bag:
    TH.bridgeItems) moved above, so the withSeat bridge does not count it again. */
 if(CW.ctx&&fW()){v.__inv0=(v.inv||[]).slice();const her=S.name,hn=v.name;const m={id:"f"+newId(),k,n:(ACT[k]||{}).n||k,who:her,fx,flags,seen,txt:herView(t.slice(0,400),hn,her)};
  if(pet&&pet.length)m.pet=pet;if(items&&items.length)m.items=items;if(fam&&fam.length)m.fam=fam;if(Object.keys(fxl).length)m.fxl=fxl;
  CW.thin.D.after(()=>{try{CW.fStat=(CW.fStat||0)+1;resApply(m)}catch(e){console.error("thin F1 res",e)}});return}
 const rid=id||newId();CW.rpend[rid]=Date.now();  /* her week's end waits for her ack, so a res that lands after she ended is re-sent in her end */
 const msg=Object.assign({t:"res",id:rid,k,n:(ACT[k]||{}).n||k,who:S.name,fx,flags,seen,txt:t.slice(0,400)},pet&&pet.length?{pet}:{},items&&items.length?{items}:{},fam&&fam.length?{fam}:{},Object.keys(fxl).length?{fxl}:{});
 if(dOn()&&host()){const m2=Object.assign({},msg,{txt:herView(msg.txt,v.name,S.name)});if(CW.thin.D.resTo(fs(),m2,rid))return}resOut(msg)}
/* part D r1: the act's text is the host's ("Ngươi" = the host, her name / "nàng ta" = her); she reads it in her own perspective */
function herView(t,her,me0){t=String(t||"");if(!t)return t;const H="\u0001";const L="(^|[^\\p{L}])",R="(?=$|[^\\p{L}])";
 t=t.replace(new RegExp(L+"([Nn])gươi"+R,"gu"),(x,p)=>p+H);
 if(her)t=t.split(her).join("ngươi");t=t.replace(new RegExp(L+"([Nn])àng ta"+R,"gu"),(x,p)=>p+"ngươi");
 t=t.split(H).join(me0||"hảo hữu");return t.replace(/(^|[.!?]\s+)ngươi/g,(x,p)=>p+"Ngươi")}
CW.herView=herView;
/* ---------- co-op pets (owner 15/11 20:05Z): help / harm / steal the friend's pet (petcare / thaopet / petsteal, jpet + jpetcare) ----------
   The act runs on her entry (which carries her live pets, petLive/pos); what happened to each of her pets goes out as `res.pet` ops
   ({op:"d",t,at,d:{full,clean,joy,aff}} | {op:"lose",t,at}); her client applies them to her OWN pets (petLose there gives her the
   follow-bonus / Thái hậu side effects, so those are taken out of fx here). The stolen pet is already mine (petAdd on my S). */
const PETACT=["petcare","thaopet","petsteal"];
function petFind(L,o){let i=L.findIndex(P=>P.t===o.t&&(P.at||0)===(o.at||0));if(i<0)i=L.findIndex(P=>P.t===o.t);return i}
function petLoseHook(){if(typeof petLose!=="function"||petLose.__cw)return;const f0=petLose;
 petLose=function(p){if(!CW.petV||p!==CW.petV)return f0.apply(this,arguments);const b=fsnap(p);const r=f0.apply(this,arguments);const a=fsnap(p);
  for(const x of DK)if(a[x]!==b[x])CW.petAdj[x]=(CW.petAdj[x]||0)+(a[x]-b[x]);return r};petLose.__cw=1}
function petDiff(v,L0){const L1=tsbPets(v);const ops=[];
 for(const [P,c] of L0){const o={t:P.t,at:P.at||0};if(!L1.includes(P)){ops.push(Object.assign(o,{op:"lose"}));continue}
  const d={};for(const x of ["full","clean","joy","aff"]){const n=Math.round((P[x]||0)-(c[x]||0));if(n)d[x]=n}if(Object.keys(d).length)ops.push(Object.assign(o,{op:"d",d}))}
 return ops}
const PETFLY=/hoami|sao|vet|uyenuong|camke|phuong|thanhlong|bachloc|kylan|cuuvi|hac|thienma/;
/* her side: apply the ops to her own pets; returns the lines for her note */
function petApply(ops,k){const out=[];if(!Array.isArray(ops))return out;
 for(const o of ops){const L=tsbPets(S);const i=petFind(L,o);if(i<0)continue;const P=L[i];const T=petT(P);const nm=T.n.replace(/^./,c=>c.toLowerCase());
  if(o.op==="lose"){const fly=PETFLY.test(P.t);petLose(S,i,k==="petsteal"?"bị trộm mất":fly?"bị thả đi (chưa rõ ai làm)":"bị hại (chưa rõ ai làm)");
   out.push(k==="petsteal"?`<span class="r">Không thấy ${nm} đâu nữa; cửa lồng mở, có dấu người lạ.</span>`:`<span class="r">${T.n} của ngươi ${fly?"sổ lồng bay mất, tìm không thấy":"bỗng lăn ra bỏ ăn rồi chết, không rõ vì sao"}.</span>`);continue}
  if(o.op==="d"&&o.d){try{if(typeof petcInit==="function")petcInit(P)}catch(e){}const d=o.d,L2=[];
   for(const x of ["full","clean","joy","aff"])if(typeof d[x]==="number"){P[x]=cl((P[x]||0)+d[x],0,100)}
   if(d.full)L2.push(`No ${d.full>0?"+":""}${d.full}`);if(d.clean)L2.push(`Sạch ${d.clean>0?"+":""}${d.clean}`);if(d.joy)L2.push(`Vui ${d.joy>0?"+":""}${d.joy}`);if(d.aff)L2.push(`Tình cảm ${d.aff>0?"+":""}${d.aff}`);
   try{if(typeof petcSync==="function")petcSync(P)}catch(e){}if((d.full||0)+(d.clean||0)+(d.joy||0)>0)P.bad=0;
   out.push(`${T.n} của ngươi được chăm (${L2.join(", ")}).`)}}
 return out}
(function(){const f=runAct;runAct=function(a,t,k,extra){if(!CW.on||a!==S||!isF(t))return f.apply(this,arguments);
 if(ASK.includes(k)&&!CW.inv){if(sameHouse(a,t))return f.apply(this,arguments);const id=newId();CW.acts[id]={k,extra,v:t.id};
  const px=askX(k,extra);const item=!px&&extra!=null&&S.inv&&S.inv[extra]?iname(S.inv[extra]):"";
  if(dOn()){if(host()){const who=S.name,v=t.id,he=!px&&extra!=null&&S.inv&&S.inv[extra]?J(S.inv[extra]):null;/* D r1: k/v/item ride in pp, so a host reload keeps the answer (CW.acts is memory only) */
    CW.thin.D.kind(fs(),"inv",{id,k,item,who,v,he,x:px})/* B r2: as data (deferred while her rolled life is held; survives a host reload) */}
   else CW.thin.doSend("inv",{id,k,item,e:!px&&extra!=null&&S.inv&&S.inv[extra]?J(S.inv[extra]):null,x:px});return `Ngươi ngỏ ý ${((ACT[k]||{}).n||k).toLowerCase()} với ${t.name}, đợi nàng trả lời. `}
  COOP.send({t:"act",id,k,mode:"invite",n:(ACT[k]||{}).n||k,who:S.name,item,x:px});return `Ngươi ngỏ ý ${((ACT[k]||{}).n||k).toLowerCase()} với ${t.name}, đợi nàng trả lời. `}
 const pa=PETACT.includes(k);let L0=null;if(pa){petLoseHook();L0=tsbPets(t).map(P=>[P,Object.assign({},P)]);CW.petV=t;CW.petAdj={}}
 const inv0=(t.inv||[]).slice();const K0=famSnap(t);const b0=fsnap(t);let r;CW.famIn=(CW.famIn|0)+1;if(CW.famIn===1)CW.famBk=null;try{r=f.apply(this,arguments)}finally{CW.petV=null;CW.famIn--}
 /* things that landed in her entry's bag (Tặng quà, a handmade work, a gift with something in it) go to HER: she gets the normal
    "Quà tặng" dialog (keep / have it checked), exactly as from an NPC (review/coop-pets: before, the item left me and never reached her).
    B1: a hidden thing slipped into her chest (Cài đồ vào rương, Giá họa: e.h) lands there silently, as from an NPC. */
 const add=(t.inv||[]).filter(e=>!inv0.includes(e));const bk=CW.famIn?null:CW.famBk;const back=add.filter(e=>!e.h&&(k==="plant"||!!(bk&&bk.has(e))));/* E44: also any lost-case piece the act handed back to her (lostReturn hook) *//* a stolen thing slipped back to its owner (jlost "Lén trả lại" through Cài đồ) is not a gift */
 const items=add.filter(e=>!e.h&&!back.includes(e)).map(e=>J(e));
 try{let pet=null;if(pa){pet=petDiff(t,L0);for(const x in CW.petAdj)b0[x]=(b0[x]||0)+CW.petAdj[x]}
  const fam=famDiff(t,k,inv0,K0,add.filter(e=>e.h));for(const e of back)fam.push(famRet(e));sendRes(t,k,b0,r,CW.inv,pet,items,fam)}catch(e){console.error(e)}return r}})();
/* ---------- B1 (review/coop-b1b5): steal / burn / extort her ITEMS, harm / take her CHILDREN, miscarriage ----------
   The act runs on her entry (bag + children from buildFriend / pos). The loss reaches her as `res.fam` ops, applied to her OWN S:
     {op:"rm", ci, k, how}  an item left her chest (how: "lost" = thất lạc case, as an NPC thief; "burn"; "taken" = named; "gone")
     {op:"plant", e}        a hidden thing was slipped into her chest (silent; it works on her like an NPC's plant)
     {op:"kd", n, d:{hp,tal,fond}, heir0}  a child hurt / slandered (heir0: lost the Đông cung)
     {op:"kdie", n, why}    a child died (kidDie on her side: her grief Sức, the heir seat empties)
     {op:"ktake", n}        a child was taken to be raised by me (takeaway; the child is already in my S.kids)
     {op:"preg0"}           she lost the pregnancy (musk; the Sức loss is in fx)
   My gain stays on my side as the act already gives it (the item in my chest, the child in my house). */
const kidId=k=>String(k.name||"")+"#"+(k.bt==null?"":k.bt);
function famSnap(t){return {kids:(t.kids||[]).map(k=>[k,Object.assign({},k)]),preg:t.preg||0}}
const RMHOW={laydo:"lost",laydol:"lost",phonghoa:"burn",batnat:"taken",uyhiep:"taken",tieuhuy:"taken"};
/* E44e: a piece that left her entry's list while a NEW object of the same ledger id came in = the same piece re-made (entry rebuilt), not moved;
   paired one to one (two objects of one id and one taken = still one «rm»: coop-lost-scan SWAP dup 10000063 with an id-set match) */
function famSame(L0,L1){const out=new Set(),nw=new Map();for(const e of L1)if(e&&e.iu&&!L0.includes(e)){const a=nw.get(e.iu)||[];a.push(e);nw.set(e.iu,a)}
 for(const e of L0)if(e&&e.iu&&!L1.includes(e)){const a=nw.get(e.iu);if(a&&a.length){out.add(e);out.add(a.shift())}}return out}
function famDiff(t,k,inv0,K0,plants){const ops=[];const L1=t.inv||[];const SM=famSame(inv0,L1);/* E44e: same rule as b4Ops (a piece = its ledger id) */
 for(const e of inv0)if(!L1.includes(e)&&e.ci!=null&&!SM.has(e))ops.push(Object.assign({op:"rm",ci:e.ci,k:e.k,how:RMHOW[k]||"gone"},e.iu?{iu:e.iu}:{}));/* E44: the piece by its ledger id */
 for(const e of plants){const x=J(e);if(x.by==="me")x.by=me();ops.push({op:"plant",e:x})}
 for(let [kd,c] of K0.kids){const n=kidId(c);if(!(t.kids||[]).includes(kd))kd=(t.kids||[]).find(k=>k&&kidId(k)===n)||kd;/* E44e: a rebuilt entry = same child, new object */if(!(t.kids||[]).includes(kd)){ops.push({op:"ktake",n});continue}
  if(c.alive!==false&&kd.alive===false){ops.push({op:"kdie",n,why:k==="pond"?"chết đuối ở hồ sen":k==="kpoison"?"trúng độc mà chết":"mất sớm"});continue}
  const d={};for(const x of ["hp","tal","fond"])if(typeof kd[x]==="number"&&kd[x]!==c[x])d[x]=kd[x]-(c[x]||0);const h0=!!c.heir&&!kd.heir;
  if(Object.keys(d).length||h0)ops.push(Object.assign({op:"kd",n,d},h0?{heir0:1}:{}))}
 if(K0.preg&&!t.preg)ops.push({op:"preg0"});
 try{if(typeof pmArtTake==="function")for(const ak of pmArtTake(t))ops.push({op:"art",ak})}catch(e){}/* jpma r3 fix B: «Cùng chơi» practice for her */
 return ops}
/* her side: returns the lines for her note; `quiet` lines are told by their own dialog (Đồ thất lạc) */
/* ---------- E44 coop-famops (law 6c REAL OBJECTS, law 1 TWO-WAY): every piece a friend's act (or a host NPC's act on her entry) moves is
   found BY IDENTITY — its ledger id `iu` (jil ilUid; her entry's bag is bagOf(her chest), so the id is hers) — never «any piece of that kind».
   rm: the piece with that id in her chest, or on her (worn trâm / áo: taken off first); an op with no id (old room / a piece the census had
   not numbered yet) takes only the SAME slot with the same kind; no match = nothing moves (logged in CW.famMiss).
   ret / add: a piece coming back to her closes HER open case of that piece (by id; old rooms: the case the friend holds), the copy her seat
   kept for the holder leaves, and the piece lands in her chest ONCE — never when a piece with that id is already hers (chest, worn, pawn,
   her ledger box). A lost-case piece handed back to her entry outside an act (Lén trả lại, a hearing, a holder who dies…) is sent the same
   way (lostReturn hook below). Before: «ret» pushed a copy of the case piece whatever was already home, «rm» took another piece of the kind
   (coop-dresscode-scan: guest trâm 2 copies / gone; a đàn case closed with the piece nowhere), and a failed loLose spliced her LAST piece. */
/* E44b (E44r seed 4242: host pieces 1073 / 144 gone from her seat while his case still «held by 902»): the piece and the case on the sending
   seat may carry different ids (a census renumbered one); `alt` = every other id that names this piece (its hiu, the id of the sender's
   case of it: FA), so the receiver finds its case by ANY of them */
const FA=new WeakMap();
function famRet(e){const x=J(e);delete x.ci;delete x.lo;delete x.by;delete x.gh;delete x.h;delete x.w;
 const alt=[...new Set([e.hiu].concat(FA.get(e)||[]))].filter(i=>i&&i!==e.iu);return Object.assign({op:"ret",k:e.k},e.iu?{iu:e.iu}:{},alt.length?{alt}:{},{e:x})}
const famIds=o=>[o.iu].concat(Array.isArray(o.alt)?o.alt:[]).filter(Boolean);
/* hiu = the id the HOST's copy of her piece carries when it differs from hers (her entry was numbered on the host before her own census
   numbered the piece): both ids name the one piece */
const famIs=(x,iu)=>!!x&&!!iu&&(x.iu===iu||x.hiu===iu);
function famWhere(iu){if(!iu)return null;const L=typeof ilSlots==="function"?ilSlots(S):(S.inv||[]);const e=L.find(x=>famIs(x,iu));if(e)return e;
 try{const B=S.il&&S.il.box;const b=B&&B.find(x=>x&&famIs(x.e,iu));if(b)return b.e}catch(z){}return null}
function famItem(o){S.inv=S.inv||[];if(o.iu){const e=S.inv.find(x=>famIs(x,o.iu));if(e)return e;const w=S.wd;
  if(w&&typeof w==="object")for(const sl of ["tram","y"]){const x=w[sl];if(x&&typeof x==="object"&&famIs(x,o.iu)&&x.from!=="base")return x}
  if(famWhere(o.iu))return null}
 /* no piece of hers carries that id: the same slot, the same kind (never «any piece of that kind»); a differing id of hers is kept, the host's rides as hiu */
 const e=S.inv[o.ci];if(!e||e.k!==o.k||e.h)return null;if(o.iu&&e.iu&&e.iu!==o.iu)e.hiu=o.iu;return e}/* an op id the host gave a piece her census had not numbered yet: the same slot, same kind, no id of its own (the id is taken on below) */
/* the piece leaves her (chest or worn slot); true when it was there */
function famOff(e){const i=(S.inv||[]).indexOf(e);if(i>=0){S.inv.splice(i,1);return true}const w=S.wd;
 if(w&&typeof w==="object")for(const sl of ["tram","y"])if(w[sl]===e){const k=sl==="y"&&typeof wdDefault==="function"?wdDefault(S,"y"):null;w[sl]=k?{k,from:"base"}:null;try{if(typeof wdOf==="function")wdOf(S)}catch(z){}return true}
 return false}
function famMiss(o,why){const iu=o.iu||(o.e&&o.e.iu)||0,k=o.k||(o.e&&o.e.k);(CW.famMiss=CW.famMiss||[]).push({w:wk(),op:o.op,k,iu,why});if(CW.famMiss.length>40)CW.famMiss.shift();console.warn("famApply: no move",o.op,k,iu,why)}
/* her open case of that piece: by id; an op with no id (old room): the case of that kind the friend holds */
function famCase(o){const L=(S.lost||[]).filter(c=>c&&c.st!=="done"&&c.e&&c.own===key(S));for(const id of famIds(o)){const c=L.find(c=>famIs(c.e,id));if(c)return c}
 /* E44b (E44r): a «ret» whose ids all miss (a census renumbered the piece on one seat) still closes THE case of that kind the friend holds
    (an id-less one first): the piece comes home once and his side never stays «held» by her for a piece she no longer has */
 const fh=L.filter(c=>c.k===o.k&&(c.by===fp()||c.at===fp()));
 return o.iu&&L.some(c=>c.e.iu)?(fh.find(c=>!c.e.iu)||(o.op==="ret"?fh[0]:null)||null):fh[0]||null}
/* the piece is back with her: close the case through the ONE owner change (jlost lostReturn), the holder's copy on this seat leaves.
   Returns the piece put in her chest, or null (already hers / nothing real to put). */
function famBack(o){const c=famCase(o);const iu=o.iu||(c&&c.e&&c.e.iu)||0;const ids=famIds(o);if(c&&c.e&&c.e.iu)ids.push(c.e.iu);const mineAny=()=>ids.some(i=>famWhere(i));
 if(c){let x=null;try{x=typeof loEntry==="function"?loEntry(c):null}catch(z){}
  if(x&&x.h!==S){const L=x.h.inv||[];const i=L.indexOf(x.e);if(i>=0)L.splice(i,1);else{const w=x.h.wd;if(w)for(const sl of ["tram","y"])if(w[sl]===x.e)w[sl]=null}}
  if((x&&x.h===S)||mineAny()){c.st="done";c.end=wk();c.how="nha";try{if(typeof loLedgerBack==="function")loLedgerBack(c)}catch(z){}return null}
  const n=(S.inv||[]).length;if(typeof lostReturn==="function"&&lostReturn(Object.assign({},c.e,{lo:c.id}),"nha")&&S.inv.length>n)return S.inv[S.inv.length-1];
  if(c.st!=="done"){c.st="done";c.end=wk();c.how="nha"}}
 if(mineAny())return null;
 if(o.e&&o.e.k&&typeof IT==="object"&&IT[o.e.k]){const x=Object.assign({},o.e);delete x.ci;delete x.lo;delete x.by;delete x.gh;S.inv.push(x);if(!c&&o.op==="ret")famMiss(o,"ret: no case, piece put in chest");return x}
 famMiss(o,c?"case closed, no piece":"no case, no piece");return null}
/* a lost-case piece handed back to the friend's ENTRY outside an act (my «Lén trả lại» from Tư trang › Việc, a hearing verdict, a holder who
   dies…): her entry is only a copy of her chest, so the piece goes to her seat as the same «ret» op (inside an act on her the act's own diff
   sends it: famIn; inside a host NPC turn b4Ops sends it as «add»: b4in). Two-way: either seat. */
(function(){if(typeof lostReturn!=="function")return;const f0=lostReturn;lostReturn=function(e,how){let o=null,n=0,mine=false;try{mine=!!e&&typeof ilSlots==="function"&&ilSlots(S).some(z=>z===e||(!!e.iu&&z&&z.iu===e.iu))}catch(z){}
 try{if(CW.on&&!CW.ctx&&e&&typeof loCaseOf==="function"){const c=loCaseOf(e);const ow=c&&c.st!=="done"?c.own:e.gh;const p=ow&&typeof loP==="function"?loP(ow):null;if(isF(p)){o=p;n=(p.inv||[]).length}}}catch(z){}
 let ca=[],c0=null;try{c0=typeof loCaseOf==="function"?loCaseOf(e):null;ca=[e&&e.iu,e&&e.hiu,c0&&c0.e&&c0.e.iu,c0&&c0.e&&c0.e.hiu]}catch(z){}
 const r=f0.apply(this,arguments);
 /* E44h (coop-lost-scan-traced 9001 vanish 10000200, the «kyngo lead»): a case of HERS closed here by a return (any road: Kỳ ngộ «kyngo»,
    tra / xet / nop / soat / nha …) already sends the piece back («ret», or «add» inside an NPC turn); famSweep read every closing whose
    how was not on its hand list (nha/tra/soat/nop/xet) as «mất dấu» and sent «gone» after the «ret» → her seat dropped the piece it had
    just got back. Marked by identity (like the box rule's __fs), so no return road can miss. */
 try{if(r&&CW.on&&host()&&c0&&c0.st==="done"&&String(c0.own)===String(fp()))c0.__rt=1}catch(z){}
 try{if(o&&r&&(o.inv||[]).length>n){const x=o.inv[o.inv.length-1];FA.set(x,ca.filter(Boolean));/* r2: inside a host NPC turn b4Ops «add» carries it to her seat; my census still routes it «sang hảo hữu» (coop-lost-scan SKEW: her đàn netted on the host) */
  if(CW.b4in){if(mine&&typeof ilSent==="function")ilSent(x,o)}else if(CW.famIn)(CW.famBk=CW.famBk||new Set).add(x);else{b4Send([famRet(x)],{});if(typeof ilSent==="function")ilSent(x,o)/* jil: «sang hảo hữu», never netted */}}}catch(z){console.error("famops ret",z)}return r};window.lostReturn=lostReturn})();
/* E44: the week end runs without the friend's entry (withoutFriend): jlost loWeek then read every case OWNED by the friend as «owner gone»
   (st done «mat») — the thief's «Lén trả lại» / «Trả lại» left Tư trang › Việc a week after every theft from her. Her own seat keeps her
   side of the case; here such a case only waits (the expiry still ends it). */
(function(){if(typeof loWeek!=="function")return;const f0=loWeek;loWeek=function(){if(!CW.on||!S)return f0.apply(this,arguments);
 const F=String(fp()),ex=typeof LO==="object"&&LO.expire||54;const L=(S.lost||[]).filter(c=>c&&c.st!=="done"&&(String(c.own)===F||String(c.at)===F)&&wk()-c.w<=ex);/* r2: also MY piece HELD by the friend (her entry is pulled out → «mất dấu»: vanish) */
 const sv=L.map(c=>[c.st,c.end]);for(const c of L){c.st="done";c.end=wk()}try{return f0.apply(this,arguments)}finally{L.forEach((c,i)=>{c.st=sv[i][0];c.end=sv[i][1];if(c.end===undefined)delete c.end;if(S.lost&&!S.lost.includes(c))S.lost.push(c)})}};window.loWeek=loWeek})();
/* E44b (E44r seed 4242 dup 10000054: in the host's chest AND in her own case lo2): the host's copy of her entry still carried a piece that
   on her seat had already gone into HER open «thất lạc» case (no holder); his act took it. The piece is now on his side: the case is held by
   the thief (how «lost», as fix 3) or closes «mất dấu bên hảo hữu» (any other road); her census routes it, never nets it. true = handled */
function famLostCase(o,f){if(!o.iu)return false;const c=(S.lost||[]).find(c=>c&&c.st==="lost"&&c.e&&c.own===key(S)&&famIs(c.e,o.iu));if(!c)return false;
 try{if(typeof loEntry==="function"&&loEntry(c))return false}catch(z){}
 if(o.how==="lost"){const th=o.by!=null?RV(o.by):null;const fk=th?key(th):f?key(f):fp();Object.assign(c,{keep:1,by:fk,st:"held",at:fk})}else{c.st="done";c.end=wk();c.how="matdau"}
 try{if(typeof ilLog==="function"){ilLog(c.e,"lo"+c.id,"coop:"+((f&&f.id)||""),o.how==="lost"?"sang hảo hữu":"mất dấu bên hảo hữu");const I=typeof ilS==="function"?ilS():null;if(I&&I.at&&c.e.iu)delete I.at[c.e.iu]}}catch(z){}
 return true}
/* E44b (COOP_SWAP seed 4242 w4: her case 1 «held» was read as host case 1's piece): the two seats number lost cases on their own (S.loSeq), and
   the copies of the host's people on her seat carry HIS «lo» marks, so jlost loEntry (holder by c.at, else any consort's piece marked
   lo === c.id) found another case's piece: her case took its id (census c.e.iu sync) and holder (c.at), and closed onto it (dup + vanish).
   A piece of another kind is never that case's piece: no entry (c.at kept) */
(function(){if(typeof loEntry!=="function")return;const f0=loEntry;loEntry=function(c){const at=c&&c.at;const x=f0.apply(this,arguments);
 try{if(x&&CW.on&&c&&x.e){const k=(c.e&&c.e.k)||c.k;if(k&&x.e.k!==k){c.at=at;return null}}}catch(z){}return x};window.loEntry=loEntry})();
/* E44b (c) whole group (law 6c / law 11; seed 4242: 148 «di vật» into MY box w35 → sold; 1173 / 576 / 1182 seized from my chest as tang
   vật → «trả kho» → sold — each time the owner's case on her seat stayed «held by me» = vanish): a piece OWNED by the friend (box own = her
   key, or the piece's gh / my case of it names her) that leaves my hands through the ONE box rule (jil ilGone) reaches her seat:
   - «di vật» (nobody here to take it): it goes home to her as «ret» (b4Send), my census routes it «sang hảo hữu»;
   - any other road (tang vật, tịch thu, bán, cầm cố, đem sửa, kẻ hầu bớt xén …): the piece is really in MY box now (counted here); it is no
     longer hers to reclaim through my box (own cleared), my case of it closes «mất dấu», and her case closes the same way («gone», by id).
   «thất lạc» (loLose) keeps its own road. Two-way: either seat. */
(function(){if(typeof ilGone!=="function")return;const g0=ilGone;ilGone=function(p,e,how,o){
 let F=null,c=null,ids=[];
 try{if(CW.on&&!CW.ctx&&how!=="lost"&&e&&typeof e==="object"&&e.k){F=String(fp());try{c=typeof loCaseOf==="function"?loCaseOf(e):null}catch(z){c=null}if(c&&String(c.own)!==F)c=null;
  const fo=(o&&o.own!=null&&String(o.own)===F)||(e.gh!=null&&String(e.gh)===F)||!!c;if(!fo)F=null;else ids=[e.iu,e.hiu,c&&c.e&&c.e.iu,c&&c.e&&c.e.hiu].filter(Boolean)}}catch(z){F=null}
 /* E44c (asked by E48r): «dead» goes home only past jil ilGone's own guards — a piece still in a living slot / the box (ilAt), already in
    the friend's slot (ilToFriend → ilSent) or not durable (ilDur) is left to the ONE box rule, never sent as «ret» (would be a 2nd copy) */
 if(F&&how==="dead"){try{if((typeof ilAt==="function"&&ilAt(e))||(typeof ilToFriend==="function"&&ilToFriend(e))||(typeof ilDur==="function"&&!ilDur(e)))F=null}catch(z){F=null}}
 if(F&&how==="dead"){try{if(c&&c.st!=="done"){c.st="done";c.end=wk();c.how="nha"}b4Send([famRet(e)],{});if(typeof ilSent==="function")ilSent(e,friendEntry());return null}catch(z){console.error("famops dead",z)}}
 const r=g0.apply(this,arguments);
 if(F&&r&&typeof r==="object"&&r.e){try{if(String(r.own)===F)r.own="";if(c&&c.st!=="done"){c.st="done";c.end=wk();c.how="matdau";c.__fs=1}
  const iu=ids[0]||r.e.iu;b4Send([Object.assign({op:"gone",k:e.k,how:"matdau"},iu?{iu}:{},ids.length>1?{alt:ids.slice(1)}:{})],{})}catch(z){console.error("famops box",z)}}
 return r};window.ilGone=ilGone})();
/* E44c P1/P2 (law 6c; coop-lost-scan dup 55 / 86 / 118 «B:box:mkt:sell», vanish 10000274 / 10000341 «cướp»): on the GUEST seat the people of
   the world (every non-friend NPC) are COPIES of the host's — the host's canon owns their pieces, cases and boxes. A copy's own road on her
   seat (an NPC agent selling, a robbery between two NPCs, any box road of a copy) never puts that piece into HER ledger box and never opens a
   case in HER S.lost: it would be a 2nd copy of a host piece (dup) or a case over a piece nobody counts (vanish). Also for HER piece a copy
   holds: the real holder is the host's NPC, and the host's own road tells her seat (c2 box rule «gone» / famSweep / «ret»). Her own chest,
   her own acts and the friend's entry keep their roads (fam ops / ilSent). Host seat: unchanged. */
function famCopy(p){try{return !!(p&&p!==S&&!p.coop&&typeof ilGuest==="function"&&ilGuest()&&Array.isArray(rivals)&&rivals.indexOf(p)>=0)}catch(z){return false}}
(function(){if(typeof ilGone!=="function")return;const g1=ilGone;ilGone=function(p){if(famCopy(p))return null;return g1.apply(this,arguments)};window.ilGone=ilGone})();
(function(){if(typeof loLoseE!=="function")return;const l0=loLoseE;loLoseE=function(p){if(famCopy(p))return null;return l0.apply(this,arguments)};window.loLoseE=loLoseE})();
/* E44d (P2 family, law 6c): on the guest seat a keep road (ilRob «cướp» / jty robbers, Kỳ ngộ «Giữ lại», a rival thief who keeps it) never puts
   HER piece into a COPY of a host NPC (that chest is rebuilt from the host: the piece vanished, her case closed «mất dấu», coop-lost-scan 10000137).
   The keep is refused like any refused keep (loLose: c.keep=0): her case stays «thất lạc» holding the piece, jlost finds it later. Host seat unchanged. */
(function(){if(typeof loKeepBy!=="function")return;const k0=loKeepBy;loKeepBy=function(c,p){if(famCopy(p))return null;return k0.apply(this,arguments)};window.loKeepBy=loKeepBy})();
/* E44j T4 (law 6c; coop-lost-scan dup 117 / id 10): the other seat's act took a piece of mine that is NOT in my hands but in my box (seized as
   tang vật, sold, đem sửa …): rooms run the relay path (thin level 0) by default, so that act ran on its seat's copy of me, a step behind, and
   that seat now holds a copy of a piece my box holds = 2 places. My box is the world's truth here: the actor's seat is told «rm gone» by id
   (its famApply takes the phantom copy off, the existing «… không còn nữa» line). Either seat (two-way). */
function famBoxBack(o){try{if(!CW.on||!o||!o.iu||o.how==="gone")return;const B=S.il&&S.il.box;if(!Array.isArray(B)||!B.some(x=>x&&famIs(x.e,o.iu)))return;
 if(typeof ilSlots==="function"&&ilSlots(S).some(x=>famIs(x,o.iu)))return;b4Send([{op:"rm",ci:-1,k:o.k,iu:o.iu,how:"gone"}],{})}catch(e){console.error("famBoxBack",e)}}
function famApply(ops){const out=[];let loud=0;if(!Array.isArray(ops))return {out,loud};const f=friendEntry();S.inv=S.inv||[];
 const kidBy=n=>(S.kids||[]).find(k=>k&&k.alive!==false&&kidId(k)===n)||null;
 const rm=ops.filter(o=>o.op==="rm").map(o=>{const e=famItem(o);if(!e&&!famLostCase(o,f)){famMiss(o,"not hers");famBoxBack(o)}return [o,e]}).filter(x=>x[1]);
 for(const [o,e] of rm){const nm=typeof iname==="function"?iname(e):e.k;if(!famOff(e)){famMiss(o,"gone meanwhile");continue}if(o.iu&&!e.iu)e.iu=o.iu;
  /* E44j T4: a «gone» of a piece I held for a case (marked lo: someone's lost piece in my hands) closes that case here «mất dấu» (the piece is in the other world's box) — never «held at me» with no copy */
  if(o.how==="gone"&&e.lo){try{const c=(S.lost||[]).find(c=>c&&c.id===e.lo&&c.st!=="done");if(c){c.st="done";c.end=wk();c.how="matdau";if(typeof ilLog==="function")ilLog(e,"lo"+c.id,"coop:"+((f&&f.id)||""),"mất dấu bên hảo hữu")}}catch(z){}}
  if(o.how==="lost"&&typeof loLose==="function"){/* the NPC thief's road: a "thất lạc" case in her Tư trang › Việc, the item held by the friend */
   const th=o.by!=null?RV(o.by):null;const fk=th?key(th):f?key(f):fp();const all=S.inv;S.inv=[e];let c=null;try{c=loLose(S,{cause:"riv",by:fk,keep:1})}finally{S.inv=all.filter(x=>x!==e)}
   /* E44: the piece IS with the thief on the other seat (his real chest / the host's NPC): her case is held there even when this seat has no
      live copy of the holder to put it in (loKeepBy refused) — a case left «lost» counted the piece a second time and was later «found» to
      Nội vụ phủ: 2 copies (coop-lost-scan COOP_FAM: host chest + guest case) */
   /* E44i T3 (coop-lost-scan LIVE SWAP 10000013 lxma2: laydo w1, «ret» w4, her seat had no case): loLose takes only a piece its own filter
      (loOk) allows; a piece of hers that this seat reads otherwise (her copy on the host was a step behind) left with NO case = untraceable
      here, the host's «ret» / «gone» found nothing to close. Her durable piece of her own (no lo mark: not someone else's case piece) gets its
      case all the same (jlost loLoseE, the ONE case maker for a given piece), held by the thief. */
   if(!c&&!e.lo&&typeof loLoseE==="function"&&typeof ilDur==="function"&&ilDur(e)){c=loLoseE(S,e,"riv");if(c){Object.assign(c,{keep:1,by:fk,st:"held",at:fk});
     Q.push({t:"Đồ thất lạc",who:typeof pMe==="function"?pMe():"",h:`${typeof loTag==="function"?loTag(e):""}<p><b>${typeof loNm==="function"?loNm(e.k):esc(nm)}</b> trong rương ngươi đã thất lạc.</p><p class="past">Chưa rõ vì sao. Vào Tư trang › Việc › Đồ thất lạc để tra xét.</p>`,btn:"Đã hiểu"});continue}}
   if(c){if(c.st==="lost")Object.assign(c,{keep:1,by:fk,st:"held",at:fk});continue}}
  loud=1;
  if(o.how==="burn"){try{if(typeof tsbLedger==="function")tsbLedger({what:nm,how:"cháy",cause:"có kẻ phóng hỏa (chưa rõ là ai)"})}catch(x){}out.push(`<span class="r">Kho đồ của ngươi bốc cháy: mất ${esc(nm)}.</span>`)}
  else if(o.how==="taken"){try{if(typeof tsbLedger==="function")tsbLedger({what:nm,how:"bị lấy",who:fp(),by:friendName()})}catch(x){}out.push(`<span class="r">Ngươi phải nộp ${esc(nm)} cho ${esc(friendName())}.</span>`)}
  else out.push(`<span class="r">${esc(nm)} trong rương ngươi không còn nữa.</span>`)}
 for(const o of ops)if(o.op==="art"&&typeof pmArtIn==="function"){const l=pmArtIn(o.ak);if(l){out.push(esc(l));loud=1}}/* jpma r3 fix B: the practice of «Cùng chơi» on her own S */
 for(const o of ops)if(o.op==="plant"&&o.e&&o.e.k){if(o.e.iu&&famWhere(o.e.iu)){famMiss(o,"plant: already hers");continue}const x=Object.assign({},o.e);delete x.ci;S.inv.push(x)}
 /* p2 B4: a thing given to her in the host's world (a contest prize, a bestowal): into her chest, told */
 for(const o of ops)if(o.op==="add"&&o.e&&o.e.k&&typeof IT==="object"&&IT[o.e.k]){/* E44: her own lost piece coming home through an NPC (a found case on the host) is a return, not a gift */
  if(o.e.iu){if(famWhere(o.e.iu)){famMiss(o,"add: already hers");continue}const c=famCase({iu:o.e.iu,k:o.e.k});
   if(c&&famIs(c.e,o.e.iu)){const x=famBack({op:"ret",k:o.e.k,iu:o.e.iu,e:o.e});if(x){loud=1;out.push(`${esc(typeof iname==="function"?iname(x):x.k)} thất lạc hôm trước nay lại thấy nằm trong rương.`)}continue}}
  const x=Object.assign({},o.e);delete x.ci;S.inv.push(x);loud=1;out.push(`<span class="g">Được ban ${esc(typeof iname==="function"?iname(x):x.k)}${o.why?` (${esc(o.why)})`:""}.</span>`)}
 for(const o of ops)if(o.op==="ret"){/* her thất lạc case closes: the thing is back in her chest, quietly (as when an NPC returns it); E44: by identity, once */
  const e=famBack(o);if(e){out.push(`${esc(typeof iname==="function"?iname(e):e.k)} thất lạc hôm trước nay lại thấy nằm trong rương.`);loud=1}}
 for(const o of ops)if(o.op==="gone"){/* E44 r2: the host's side of her case closed without a return (seized, lost track of): hers closes too, quietly */
  const c=famCase(o);if(!c){famMiss(o,"gone: no open case");continue}let x=null;try{x=typeof loEntry==="function"?loEntry(c):null}catch(z){}
  if(x&&x.h===S){famMiss(o,"gone: the piece is with her");continue}
  if(x){const L=x.h.inv||[];const i=L.indexOf(x.e);if(i>=0)L.splice(i,1);else{const w=x.h.wd;if(w)for(const sl of ["tram","y"])if(w[sl]===x.e)w[sl]=null}}
  c.st="done";c.end=wk();c.how=o.how==="mat"?"mat":"matdau";
  /* r2: my census: the piece left this case for the friend's world (it sits in his box), routed, never netted */
  try{if(typeof ilLog==="function"){ilLog(c.e,"lo"+c.id,"coop:"+((f&&f.id)||""),"mất dấu bên hảo hữu");const I=typeof ilS==="function"?ilS():null;if(I&&I.at&&c.e.iu)delete I.at[c.e.iu]}}catch(z){}}
 for(const o of ops){if(o.op==="preg0"){if(S.preg){S.preg=0;S.hidden=false;loud=1;out.push(`<span class="r">Ngươi sảy thai.</span> Thái y nói trong thuốc có xạ hương.`)}continue}
  const kd=o.n&&kidBy(o.n);if(!kd)continue;loud=1;
  if(o.op==="kdie"){try{out.push(kidDie(kd,o.why||"mất sớm",true))}catch(x){kd.alive=false}continue}
  if(o.op==="ktake"){S.kids.splice(S.kids.indexOf(kd),1);const to=o.to!=null?RV(o.to):null;/* p2 B4: an NPC took the child (the host's world already holds it in her house) */
   if(!to&&f){f.kids=f.kids||[];f.kids.push(kd)}const tn=to?to.name:friendName();
   if(S.heir&&S.heir.k===kd)S.heir.v=to||f||null;out.push(`<span class="r">${esc(kd.name)} bị bế sang cung ${esc(tn)} nuôi, vì phẩm vị ngươi còn thấp.</span>`);continue}
  if(o.op==="kd"){const d=o.d||{},L=[];for(const x of ["hp","tal","fond"])if(typeof d[x]==="number"){kd[x]=x==="hp"?Math.max(1,(kd[x]||0)+d[x]):cl((kd[x]||0)+d[x],0,100)}
   if(d.hp)L.push(`Sức khỏe ${d.hp>0?"+":""}${d.hp}`);if(d.tal)L.push(`Tài ${d.tal>0?"+":""}${d.tal}`);if(d.fond)L.push(`Hoàng thượng thương nó ${d.fond>0?"+":""}${d.fond}`);
   if(o.heir0&&kd.heir){kd.heir=false;if(S.heir&&S.heir.k===kd)S.heir=null;L.push("bị phế ngôi Thái tử")}
   out.push(`<span class="r">${esc(kd.name)} gặp chuyện</span>${L.length?` (${L.join(", ")})`:""}.`)}}
 return {out,loud}}

/* E44 (coop-famops r2, COOP_SWAP scan: a guest's xạ hương the host held was seized from his chest as tang vật — his side of her case
   closed «mất dấu», hers stayed «thất lạc»: the piece in the host's evidence box AND in her open case = 2 places). The host's copy of a case
   OWNED by the friend is the world's truth: when it closes on the host without a return (returns ride as «ret», lostReturn hook above),
   her seat closes HER case of that piece the same way («gone»), by identity. Checked after every act, buổi and week end on the host. */
function famSweep(){try{if(!CW.on||!host()||CW.ctx||!S||!Array.isArray(S.lost)||typeof fp!=="function")return;
 const F=String(fp()),RET={nha:1,tra:1,soat:1,nop:1,xet:1},st=CW.famSt||(CW.famSt={}),first=!CW.famSw;CW.famSw=1;const ops=[];
 for(const c of S.lost){if(!c||String(c.own)!==F)continue;if(c.st!=="done"){st[c.id]=1;continue}if(st[c.id]===2)continue;if(c.__fs||c.__rt){st[c.id]=2;continue}/* E44b: closed by the box rule, which sent its own «gone»; E44h: closed by a return (lostReturn hook: «ret» sent) */const was=st[c.id]===1;st[c.id]=2;
  if((first&&!was)||RET[c.how])continue;ops.push(Object.assign({op:"gone",k:c.k,how:c.how==="mat"?"mat":"matdau"},c.e&&c.e.iu?{iu:c.e.iu}:{}))}
 if(ops.length)b4Send(ops,{})}catch(e){console.error("famSweep",e)}}
(function(){if(typeof runAct!=="function")return;const r0=runAct;runAct=function(){const r=r0.apply(this,arguments);if(CW.on&&!CW.famIn)famSweep();return r}})();
CW.famApply=famApply;CW.famRet=famRet;CW.famSweep=famSweep;CW.resOut=resOut;CW.rqFlush=rqFlush;CW.rqLoadT=()=>rqLoad();CW.onResT=m=>onRes(m);CW.onActrT=m=>onActr(m);/* test hooks (dev/test/coop-famops-unit.js) */
const seenIds=new Set();
function onAct(m){if(!CW.on||m.from===CW.seat||!S||S.dead||seenIds.has(m.id))return;seenIds.add(m.id);if(m.mode!=="invite")return;
 const c=askCard(m.k,m.x,(ok,lv)=>COOP.send({t:"actr",id:m.id,ok,k:m.k,lv}));if(c){pushModal({act:1,t:"Hảo hữu tìm đến",h:c.h,opts:c.o});showModal();render();return}
 const what=askWhat(m.k,m.item);
 pushModal({act:1,t:"Hảo hữu tìm đến",h:`<p><b>${esc(m.who)}</b> ${what}.</p>`,opts:[
  {n:"Nhận",fx:{},x:"hảo hữu tiếp tục việc ấy",go:()=>COOP.send({t:"actr",id:m.id,ok:true,k:m.k})},
  ...askYield(m.k,()=>COOP.send({t:"actr",id:m.id,ok:"yield",k:m.k})),
  {n:"Từ chối",fx:{},x:"không nhận",go:()=>COOP.send({t:"actr",id:m.id,ok:false,k:m.k})}]});showModal();render()}
/* E44k F1 (law 6c; coop-lost-scan-traced 9001 dup 2576: her «Lấy đồ» on the host's entry, her seat kept the piece + case 27, the host never
   received the «res» and kept it too = 2 places): every «res» (an act's result: items by id, stats, children, pets) went out ONCE — a socket
   down / reconnecting (COOP.send false) or a peer offline (the Worker relays to online seats only) lost it for good. Now the sender keeps each
   «res» in an outbox (this phone, per room, like jkcco RQ) until the receiver's ack, and sends it again when the peer is back / the socket
   reconnects / every few seconds; the receiver applies an id ONCE (seenIds + S.coopRs, which rides her save so a reload never applies it
   twice) and acks every copy. Both seats, every res road (sendRes = acts, b4Send = NPC turns / returns / box answers / sweeps). */
const RQK=()=>{try{return "ctm-resq:"+(COOP.state.room||COOP.code||"")+":"+(CW.seat||"")}catch(e){return "ctm-resq:"}};
CW.rq=CW.rq||[];
function rqSave(){try{const k=RQK();localStorage.setItem(k,JSON.stringify(CW.rq.filter(x=>!x.rk||x.rk===k).slice(-40)))}catch(e){}}
/* E53r (review): the outbox belongs to ONE room + seat. leave() → join() of another room keeps this page (no reload): the old room's unacked
   «res» must never go to the new room (its «add» would land in another friend's world = a piece from nowhere). Each entry carries its key (rk);
   a room message keeps in memory only this room's entries (the others wait in localStorage under their own key until that room is back). */
function rqLoad(){try{const k=RQK();CW.rq=CW.rq.filter(x=>x&&x.rk===k);const L=JSON.parse(localStorage.getItem(k)||"[]");for(const x of L)if(x&&x.id&&x.msg&&!CW.rq.some(y=>y.id===x.id)){x.rk=k;CW.rq.push(x)}}catch(e){}}
function rqSend(x){x.at=Date.now();x.n=(x.n||0)+1;try{return COOP.send(x.msg)}catch(e){return false}}
function resOut(msg){const x={id:msg.id,msg,t0:Date.now(),rk:RQK()};CW.rq.push(x);if(CW.rq.length>40)CW.rq.splice(0,CW.rq.length-40);rqSave();return rqSend(x)}
function resAck(id){const i=CW.rq.findIndex(x=>x.id===id);if(i>=0){CW.rq.splice(i,1);rqSave()}}
function rqFlush(all){if(!CW.on)return;const n=Date.now(),k=RQK();CW.rq=CW.rq.filter(x=>n-(x.t0||0)<1800000);for(const x of CW.rq)if((!x.rk||x.rk===k)&&(all||n-(x.at||0)>5000))rqSend(x)}
COOP.on("peer",on=>{if(on)setTimeout(()=>rqFlush(true),600)});COOP.on("room",()=>{rqLoad();setTimeout(()=>rqFlush(true),900)});
setInterval(()=>{try{if(CW.on&&CW.rq.length)rqFlush(false)}catch(e){}},2500);
const rsSeen=id=>seenIds.has("r"+id)||(!!S&&Array.isArray(S.coopRs)&&S.coopRs.includes(id));
function onRes(m){if(!CW.on||m.from===CW.seat||!S)return;if(rsSeen(m.id)){COOP.send({t:"actr",id:m.id,ok:true,ack:1});return}seenIds.add("r"+m.id);
 S.coopRs=(S.coopRs||[]).concat([m.id]).slice(-80);
 try{resApply(m)}catch(e){console.error(e)}
 /* I had already ended the week (she acted on me while I waited): my end goes out again with this in it, before the ack she waits for */
 try{if(S&&!S.dead&&CW.sent===wk()){CW.sent=-1;sendEnd()}}catch(e){console.error(e)}
 COOP.send({t:"actr",id:m.id,ok:true,ack:1})}
/* thin F1 (level 6, foreman ruling 18/11): the act appliers (resApply → famApply / petApply) run ONLY on the host (her acts on him: his
   context once hers closes; his acts on her: D.resTo in her context b → patch). The guest never applies an act result locally: a call there
   is an old path (oldRan: the tripwire / F8 assert 0) and does nothing. */
function resApply(m){if(fW()&&!host()&&!CW.ctx){oldRan("actApply");return}if(S.dead)return;
 const fx={};for(const k in m.fx||{})if(DK.includes(k)&&typeof m.fx[k]==="number")fx[k]=m.fx[k];const g=m.flags||{},fpid=fp();
 try{if(m.fxl&&typeof m.fxl==="object")for(const x in m.fxl){const v=m.fxl[x];if(v==null)continue;if(x==="tlk"||x==="lk"||x==="stain"){if(typeof lkMergeIn==="function")lkMergeIn(S,x,v)}else if(FXL.includes(x))S[x]=J(v)}}catch(e){console.error("res fxl",e)}/* review/looks-2: marks an act put on me */
 if(Object.keys(fx).length)apply(fx);S.rl=S.rl||{};S.ro=S.ro||{};S.cev=S.cev||{};
 if(g.rel)S.rl[fpid]=cl((S.rl[fpid]||0)+g.rel,-100,100);if(g.oan)S.ro[fpid]=cl((S.ro[fpid]||0)+g.oan,0,100);
 if(g.em)S.cev[fpid]=Math.max(0,(S.cev[fpid]||0)+g.em);if(g.conf)S.confined=Math.max(0,(S.confined||0)+g.conf);
 const f=friendEntry();if(f&&g.rel){f.rel=cl((f.rel||0)+g.rel,-100,100);if(f.__b)f.__b.rel=f.rel}
 const pl=petApply(m.pet,m.k);const fa=famApply(m.fam);pl.push(...fa.out);
 /* a hidden theft that only left a "thất lạc" case: her Đồ thất lạc dialog is all she learns (as from an NPC thief) */
 if(m.seen==="effect"&&Array.isArray(m.fam)&&m.fam.length&&!fa.loud&&!Object.keys(fx).length&&!(m.pet||[]).length&&!g.dead&&!g.cold){showModal();render();return}
 let gotItem=false;if(Array.isArray(m.items))for(const e of m.items){if(!e||!e.k||typeof IT!=="object"||!IT[e.k])continue;const ent=J(e);ent.from=fpid;if(ent.by==="me")ent.by=fpid;try{pushDil(mkP("giftin",{f:fpid,e:ent}),"Quà tặng");gotItem=true}catch(x){console.error(x)}}
 const who=m.hd?esc(m.hd)/* p2 B4: the host's world (an NPC, a contest) */:m.seen==="named"?`<b>${esc(m.who)}</b>: ${esc(m.n)}.`:"Có kẻ ngấm ngầm ra tay với ngươi.";
 const note=m.seen?`<p>${who}</p>${m.seen==="named"&&m.txt?`<p class="past">${esc(m.txt)}</p>`:""}${pl.map(x=>`<p>${x}</p>`).join("")}${Object.keys(fx).length?`<p>${fmt(fx)}</p>`:""}`:"";
 if(g.dead){if(note)pushModal({t:"Biến cố",h:note});try{die(m.seen==="named"?`Bị ${m.who} hại`:"Bị kẻ gian hãm hại")}catch(e){console.error(e)}return}
 if(g.cold){try{cold(m.seen==="named"?`Bị ${m.who} hại, đày vào lãnh cung`:"Bị vu hại, đày vào lãnh cung")}catch(e){console.error(e)}}
 if(note&&gotItem&&m.k==="gift"&&!g.dead&&!g.cold){showModal();render();return}  /* the Quà tặng dialog is her note */
 if(note){pushModal({t:m.tt?String(m.tt):m.k==="petcare"?"Hảo hữu sang giúp":m.seen==="named"?"Hảo hữu ra tay":"Biến cố",h:note});showModal()}render()}
function onActr(m){if(!CW.on||m.from===CW.seat)return;if(m.ack){delete CW.rpend[m.id];resAck(m.id);soonEnd();return}invRun(m.id,m.ok,null,m.lv)}
/* her answer to my invite (old relay: actr; part D: her card's choice, run by the host after her context closes) */
function invRun(id,ok,pp,lv){let a=CW.acts[id];delete CW.acts[id];
 /* part D r1: after a host reload CW.acts is empty: rebuild from the card's pp (target id, the item itself found by value, like invHer) */
 if(!a&&pp&&pp.v!=null&&pp.k){let extra=askX(pp.k,pp.x)||undefined;if(!extra&&pp.he){const t=SJ(pp.he);extra=(S.inv||[]).findIndex(x=>SJ(x)===t);if(extra<0)extra=-1}
  if(extra===-1){pushModal({t:"Hảo hữu nhận lời",h:`<p>Món quà ấy nay không còn trong rương của ngươi.</p>`});showModal();render();return}a={k:pp.k,v:pp.v,extra}}
 if(!a)return;const v=RV(a.v);const m={id};
 if(!ok||!v||!v.alive){pushModal({t:"Hảo hữu từ chối",h:`<p><b>${esc(friendName())}</b> không nhận.</p>`});showModal();render();return}
 CW.inv=m.id;CW.yd=ok==="yield";let r="";try{r=runAct(S,v,a.k,pmLvX(a.extra,lv))}finally{CW.inv=false;CW.yd=false}if(r)log(r);
 pushModal({t:"Hảo hữu nhận lời",h:`<p>${r||"Hảo hữu đã nhận."}</p>`});showModal();render()}
COOP.on("act",onAct);COOP.on("res",onRes);COOP.on("actr",onActr);
/* the week's end goes out once her dialogs are read: checked after each render / presence change (event-driven) */
/* my acts on her not yet acknowledged (10 s at most: she may have dropped; the freeze covers that) */
function resWait(){const n=Date.now();for(const id in CW.rpend)if(n-CW.rpend[id]>10000)delete CW.rpend[id];return Object.keys(CW.rpend).length>0}
let tryT=0;function tryEnd(){tryT=0;if(CW.on&&CW.pend&&resWait()){tryT=setTimeout(tryEnd,400);return}if(CW.on&&CW.pendBuoi&&S&&!Q.length&&!S.mg){onBuoi(CW.pendBuoi);return}
 if(CW.on&&CW.wantB&&S){if(CW.wantB!==bkey()||S.dead||CW.bend||CW.pend||nReady())CW.wantB=null;else if(!Q.length&&!S.mg&&!needWhere()&&!waiting()&&!frozen()&&CW.base){T("wantB go "+CW.wantB);CW.wantB=null;nextBuoi();return}}nCheck();if(CW.on&&S&&CW.pend&&!Q.length&&!S.mg&&!S.dead&&!frozen())sendEnd()}
function soonEnd(){if(CW.on&&(CW.pend||CW.pendBuoi||CW.wantB||CW.ngoW===wk()||CW.nrdy===wk())&&!tryT)tryT=setTimeout(tryEnd,0)}

/* ---------- receiving ---------- */
function newsHTML(){const P=CW.base&&CW.base.P&&CW.base.P[CW.seat];if(!CW.mine||!S)return"";
 const L=[];for(const k in CW.mine){if(k==="rank")continue;const d=(S[k]||0)-(CW.mine[k]||0);if(d)L.push(`${(typeof NAMES==="object"&&NAMES[k])||k} ${d>0?"+":""}${d}`)}
 return L.length?`<p>Trong tuần, chuyện bên ${esc(friendName())} và trong cung khiến ngươi: <b>${L.join(", ")}</b>.</p>`:""}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function friendName(){const P=CW.base&&CW.base.P&&CW.base.P[fs()];return P?(P.name||(P.S&&P.S.name)||"hảo hữu"):"hảo hữu"}
function worldNews(C){if(host())return"";const n=C.W&&C.W.S&&C.W.S.cnews;if(!n||!n.h)return"";
 return String(n.h).split(kRx("(?<=\\.\\s|<\\/span>\\s?|<\\/b>\\s?)","")).filter(x=>x.trim()&&!/gươi/.test(x)).join(" ")}
/* review r7 (coop-e2e "week after rebirth advances" / "after week 3 same date"): a socket that drops under load reconnects and gets a
   `room` snapshot; the room handler took "room week > my sent week" as "the merge happened while I was away" and rebuilt the week from
   the room's base even when that merge had ALREADY been applied here (sent = w, merged week w+1 received, then the reconnect): her whole
   week so far (buổi sáng → tối) was thrown back to buổi sáng while the server stayed at buổi tối (`badbuoi`), and the two seats split
   (one ended the week alone, the other could never end it). CW.wkIn = the last merged week applied here; a week is applied once. */
function onWeek(m){T("week "+m.week+" in "+CW.wkIn);if(!CW.on||!m.state)return;if(typeof m.week==="number"&&CW.wkIn===m.week){T("week dup");return}
 const C=m.state;CW.base=J(C);CW.pend=false;CW.rpend={};if(typeof m.week==="number")CW.wkIn=m.week;
 const wasDead=S&&S.dead;const ok=fromCanon(C,{keepQ:true});if(!ok)return;
 const P=C.P[CW.seat];
 if(!wasDead&&S.dead){S.dead=false;try{die(P.S.coopWhy||"Bị hại trong cung")}catch(e){console.error(e)}return}
 if(S.coopCold){S.coopCold=0;if(!S.out)try{cold("Bị đày vào lãnh cung")}catch(e){console.error(e)}}
 /* jkc: the friend passed the tuyển tú this week and entered the palace */
 const fP=C.P[fs()];if(fP&&!fP.dead){const home=friendHome(fP);if(CW.fWasHome&&!home&&fP.S&&fP.S.kc&&fP.S.kc.inPal)pushModal({t:"Hảo hữu nhập cung",h:`<p>Hảo hữu ngươi qua kỳ tuyển tú, nay vào cung, phong ${esc(RANKS[fP.rank]?RANKS[fP.rank].n:"")}. Mặt mũi, tên tuổi ra sao, phải gặp mới biết.</p><p class="past">Muốn gặp nhau: hai người cùng đến một nơi trên Dư đồ trong cùng một buổi, rồi chạm vào người kia và chọn Chào hỏi.</p>`});CW.fWasHome=home}
 try{if(CW.empWeek()){showModal();render();lockNext();return}}catch(e){console.error(e)}
 try{if(host())CW.tnLast=JSON.stringify([wk(),tnWho()]);else CW.tnWeek()}catch(e){console.error(e)}
 try{CW.seatWeek()}catch(e){console.error(e)}
 const h=newsHTML()+(worldNews(C)?`<p>${worldNews(C)}</p>`:"");CW.mine=null;
 if(h)pushModal({t:"Tuần mới",h:`<p class="past">${when()}</p>${h}`});
 CW.bend=false;CW.posKey="";if(CW.p2&&S&&(S.buoi||0)!==0){S.buoi=0;used=0}/* every week starts at buổi sáng for both */
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);keepFriendPos();refreshHere();
 showModal();render();lockNext()}
function onState(m){T("state");if(!CW.on||!m.state)return;const C=m.state;
 if(!CW.base){CW.base=J(C);if(CW.waitWorld){CW.waitWorld=false;try{COOP_LOBBY.hostPick(false)}catch(e){}newLife()}return}
 /* the friend's character changed (first character / reborn): keep my week, take the new base and her new entry */
 const had=CW.base;CW.base=J(C);if(had&&had.P&&had.P[CW.seat]&&C.P&&!C.P[CW.seat])CW.base.P[CW.seat]=had.P[CW.seat];
 if(S&&!S.dead&&!CW.inLife){const old=friendEntry();placeFriend(C.P[fs()]);try{if(host()&&typeof nmFix==="function")nmFix("join")}catch(e){console.error(e)}/* coop-name-clash: her new person against the one name list, at once */
  const P=C.P[fs()];const fk=P&&((P.name||"")+"#"+(P.life||0)+(friendHome(P)?"h":""));if(P)CW.fWasHome=friendHome(P);
  if(P&&!P.dead&&(old?old.name!==P.name:CW.fNote!==fk)){CW.fNote=fk;const home=friendHome(P);
   pushModal({t:home?"Hảo hữu chọn thân phận":"Hảo hữu vào cung",h:`<p>Hảo hữu ngươi ${old?"đã đầu thai, ":"đã chọn xong thân phận, "}${home?"nay còn ở nhà cha chờ kỳ tuyển tú, chưa vào cung":"nay ở trong cung"+(friendSrv(P)?", làm cung nữ":", phong "+esc(RANKS[P.rank]?RANKS[P.rank].n:""))}. Mặt mũi, tên tuổi kiếp này ra sao, phải gặp mới biết.</p>`+(home?`<p class="past">Qua kỳ tuyển tú, nàng sẽ vào cung; khi ấy hai người mới gặp được nhau.</p>`:`<p class="past">Muốn gặp nhau: hai người cùng đến một nơi trên Dư đồ trong cùng một buổi, rồi chạm vào người kia và chọn Chào hỏi.</p>`)})}
  showModal();render()}}
function newLife(){CW.inLife=true;CW.newLife=true;try{start()}catch(e){console.error(e)}}
function begin(d){T("begin");CW.on=true;CW.cyHold=null;CW.cyK="";clearTimeout(CW.cyT);CW.cyT=null;CW.cyTo=null;CW.seat=d.you||COOP.state.you;CW.ssv=COOP.state.msv||0;CW.ssvWk=wk();CW.seatOld=false;const C=d.state||COOP.state.C;CW.base=C?J(C):null;CW.sent=-1;CW.pend=false;CW.wkIn=C&&typeof C.week==="number"?C.week:undefined;
 const s=COOP.state;
 if(C&&C.P&&C.P[CW.seat]&&!C.P[CW.seat].dead){fromCanon(C);CW.fWasHome=friendHome(C.P[fs()]);/* a fresh page (came back by link / reload) has no hand of cards yet: deal it, as loading a sổ does */if(!deck||!deck.length)try{deal()}catch(e){console.error(e)}if(s.ended&&s.ended[CW.seat])CW.sent=wk();
  /* rejoin / reload (owner 16/11: "khắc và việc đã làm bị mất"): her own week as it stood (snapLoad), never the week start again */
  if(CW.sent!==wk()){const o=snapLoad(C);if(o&&CW.restore(o)){T("restored "+o.week+"."+o.buoi+" u"+o.used);return}}try{$("title").hidden=true}catch(e){}syncRoom(CW.roomMsg);showModal();render();lockNext();return}
 if(!C&&!host()){CW.waitWorld=true;/* the lobby keeps the title backdrop up with a kit panel "Đợi bạn chọn thân phận" (no empty game frame) */try{COOP_LOBBY.hostPick(true)}catch(e){console.error(e)}return}
 newLife()}
COOP.on("start",begin);
/* leaving the shared game: back to single-player rules (slots untouched; the room keeps the world) */
COOP.on("stop",()=>{CW.on=false;CW.base=null;CW.pend=false;CW.sent=-1;CW.inLife=false;CW.dying=null;try{const L=pullFriend();void L;lockNext()}catch(e){}});
COOP.on("week",onWeek);
COOP.on("state",onState);
/* room snapshot (connect / reconnect): buổi, last where, last pos of both */
function syncRoom(m){if(!m||!CW.on||!S)return;try{const o=COOP.other();if(m.where)CW.lastWhere=m.where;if(m.pos&&m.pos[o])onPos(Object.assign({from:o},m.pos[o]))}catch(e){}
 /* a `bend` / `end` sent while the socket was down (COOP.send drops it when the socket is not open) is lost: the seat waits for a
    friend who waits for it. The room snapshot after the reconnect says what the server holds; send it again. */
 try{if(!S.dead&&m.week===wk()){const me=CW.seat;
  if(!eW()&&CW.bend&&m.buoi===(S.buoi||0)&&m.bended&&!m.bended[me]){T("rebend "+m.week+"."+m.buoi);CW.bend=false;bend()}
  if(CW.sent===wk()&&m.ended&&!m.ended[me]){T("re-end "+m.week);CW.sent=-1;CW.pend=true;soonEnd()}}}catch(e){console.error(e)}
 if(CW.p2&&!eW()&&!S.dead&&m.week===wk()&&CW.sent!==wk()&&typeof m.buoi==="number")while((S.buoi||0)<m.buoi){const b0=S.buoi||0;onBuoi({week:m.week,buoi:b0+1});if((S.buoi||0)===b0)break}/* a dialog open: onBuoi keeps the step as pendBuoi (stepped when it closes) — before, nothing caught her up and her next bend was refused (badbuoi): stuck */
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);sendPos();lockNext()}
COOP.on("room",m=>{if(m.buoi!==undefined)CW.p2=true;CW.roomMsg=m;T("room "+m.week+"."+m.buoi+" sent "+CW.sent+" in "+CW.wkIn);if(!CW.on||!m.state)return;const C=m.state;
 /* review/coop-week-stall: the Worker builds the snapshot across awaits (acceptWebSocket → loadC → chat …); a week merge that lands in
    between reaches this socket FIRST and the snapshot then holds the room's NEW week number with the OLD week's world (C.week behind
    m.week). Such a world is older than what this seat already has: never take it (no catch-up from it, no base from it). */
 if(typeof C.week==="number"&&typeof m.week==="number"&&C.week!==m.week){T("room stale "+C.week+"<"+m.week);syncRoom(m);return}
 /* reconnect: the merge happened while we were away → rebuild; otherwise keep the local week (never a week this seat already applied
    or is past: m.week must be AHEAD of the last merged week here) */
 if(CW.sent>=0&&m.week>CW.sent&&m.week!==CW.wkIn&&!(typeof CW.wkIn==="number"&&m.week<CW.wkIn)){onWeek({state:C,week:m.week});return}
 /* review/coop-stable: her new character (first / reborn) whose `state` broadcast came while my socket was down rides only this snapshot:
    place her now, as onState does (before: she stayed missing / under her old name on my side until the next week merge) */
 const fP=C.P&&C.P[fs()],fe=CW.base&&S&&!S.dead&&!CW.inLife?(friendEntry()||rivals.flatMap(v=>v.staff||[]).find(isF)||null):undefined;
 if(fe!==undefined&&fP&&!fP.dead&&(fe?fe.name!==fP.name:!friendHome(fP))){T("room: friend new "+fP.name);onState({state:C});syncRoom(m);return}
 if(!CW.base)CW.base=J(C);else{CW.base.P=J(C.P);CW.base.W=J(C.W)}syncRoom(m)});

/* ---------- the night gate (review/coop-night-sync, owner rule "nobody runs ahead") ----------
   Before: "Sẵn sàng" at buổi tối ran endTurn() at once on that client (lật thẻ, night events, quẻ, month steps, week book, the buổi
   curtain to sáng) and only then sent `end`: the first to press sat in the NEW day while the friend was still in her buổi tối.
   Now buổi tối is gated like the day buổi, host-authoritative, over the relayed `act` channel (no Worker change):
     her press → CW.nrdy = week; guest sends {k:"ctm-nr",mode:"rd"}; the HOST commits {mode:"go"} when both are ready, when the room
     clock ran out (CW.forceNight from jcooptimer), when the guest seat is empty, or when the other seat already sent its `end`.
     On `go` (CW.ngoW = week) each seat runs its night (nextBuoi → endTurn → end) as soon as no dialog / mini game is open.
   Lost messages (socket drop): a ready guest re-sends rd on every room snapshot / peer return; a host that already went answers
   any rd with go again. A seat whose friend already sent `end` for this week takes that as the host's commit. */
const NK="ctm-nr";
function nsay(mode){if(eW())return;try{COOP.send({t:"act",k:NK,mode,week:wk(),id:NK+mode+wk()+":"+Date.now().toString(36)})}catch(e){}}
function nAtNight(){return !!(S&&!S.dead&&(S.buoi||0)>=LASTB())}
function nReady(){return CW.on&&CW.nrdy===wk()&&nAtNight()&&CW.sent!==wk()&&!CW.pend}
function nOtherEnded(){const e=COOP.state.ended||{};return !!e[fs()]}
function nOtherGone(){const s=COOP.state.seats;return !!(s&&typeof s==="object"&&(fs() in s)&&!s[fs()])}
function nightReady(){if(CW.nrdy===wk()){nCheck();return}CW.nrdy=wk();T("nready "+wk());if(!host())nsay("rd");nCheck();lockNext();try{render()}catch(e){}}
function nGoNow(){if(!host()||CW.ngo===wk())return;CW.ngo=wk();T("ngo "+wk());nsay("go");CW.ngoW=wk();if(eW())try{CW.thin.flush()}catch(e){}/* thin E: the go rides the view (o.e.go): out before his week end */}
/* host: commit when both are ready (or forced); every seat: run the committed night once free */
function nCheck(){if(!CW.on||!S)return;const w=wk();
 if(host()&&CW.ngo!==w&&nAtNight()&&((CW.nrdy===w&&(CW.nfr===w||nOtherGone()))||CW.nforce===w||nOtherEnded()))nGoNow();
 if(!host()&&CW.ngoW!==w&&nAtNight()&&nOtherEnded()&&COOP.state.week===w)CW.ngoW=w;   /* the host's end is out: it committed */
 if(CW.ngoW!==w||CW.pend||CW.sent===w||!nAtNight()||S.dead||Q.length||S.mg||frozen()||!CW.base||needWhere()||CW.inLife)return;
 T("night "+w);CW.allowN=true;try{nextBuoi()}finally{CW.allowN=false}}
CW.nCheck=()=>nCheck();CW.nightReady=()=>nightReady();CW.mapPlace=mapPlace;CW.refreshHere=()=>refreshHere();
CW.forceNight=()=>{if(!CW.on||!host()||!nAtNight()||CW.ngo===wk())return false;CW.nforce=wk();nCheck();return true};
CW.nReady=nReady;
COOP.on("act",m=>{if(!m||m.k!==NK||!CW.on||m.from===CW.seat)return;T("nr "+m.mode+" "+m.week+" me "+wk());if(m.week!==wk())return;
 if(m.mode==="rd"&&host()){CW.nfr=m.week;if(CW.ngo===m.week)nsay("go");else nCheck()}
 else if(m.mode==="go"&&!host()){CW.ngoW=m.week;nCheck()}
 /* review/coop-stable: the host came back (reconnect) and asks again; her rd sent while its socket was down was lost (both sat on "Chờ hảo hữu…") */
 else if(m.mode==="q"&&!host()){if(CW.nrdy===m.week&&CW.ngoW!==m.week)nsay("rd")}
 lockNext()});
function nResync(){if(!CW.on||!S)return;if(!host()&&CW.nrdy===wk()&&CW.ngoW!==wk())nsay("rd");if(host()&&CW.ngo===wk())nsay("go");
 /* host back on a new socket at night, not gone yet: ask the guest for her ready again (a fast reconnect never shows the guest a peer drop, so she would not resend) */
 if(host()&&CW.ngo!==wk()&&nAtNight()&&CW.nfr!==wk())nsay("q");nCheck()}
COOP.on("room",()=>setTimeout(nResync,350));COOP.on("peer",on=>{if(on)setTimeout(nResync,350)});
COOP.on("presence",()=>{if(CW.on){nCheck();lockNext()}});

/* ---------- B2 (review/coop-b1b5): ONE night for the whole harem, host-authoritative ----------
   Before: S.tonight was personal and each client flipped its own tablet in endTurn: the Emperor could spend the same night with both
   players, or with an NPC on one screen and her on the other.
   Now: the HOST's flip runs with the friend's entry in the deck (both players + NPCs) and writes the world key S.tn = {w, who}
   (who = 901 / 902 = a player, an NPC id, or null). The guest's flip does not draw (only its personal side, pregFind, runs) and her
   night is set from tn when the merged week arrives (her Kính sự phòng card when it is her). In the week, any change of the night
   (Tranh sủng, Chặn ngự giá, Thắp đèn, cáo bệnh…) is relayed at once over the act channel (k "ctm-tn"), so both always agree.
   A night is resolved once: an NPC's night on the host only; a player's night by that player's own client. */
const TK="ctm-tn";
const tnWho=()=>{const t=S&&S.tonight;if(!t)return null;if(t==="me")return me();return t.id!=null?t.id:null};
function tnSet(who){if(!S)return;if(who==null){S.tonight=null}else if(who===me()){S.tonight="me"}else{const v=who===fp()?friendEntry():RV(who);S.tonight=v&&v.alive&&!v.out?v:null}
 try{if(S.tonight&&typeof ntTake==="function")ntTake(S.tonight==="me"?S:S.tonight)}catch(e){}CW.tnLast=JSON.stringify([wk(),tnWho()])}
/* r1 fix 4: host-authoritative in-week night. The host's change goes out as the final word (mode "tn", also written to the world key S.tn);
   the guest's own change is only a CLAIM (mode "claim", with the version of the host's word she last saw): the host takes it when it has not changed the
   night since the guest last heard its word, else (both changed it in the same buổi: the relays crossed) it keeps its own; either way it broadcasts the final {w, who} and the
   guest applies only that. who on the wire is relative to the sender: "p" = the sender, "f" = the receiver, else an NPC id. */
const tnEnc=w=>w==null?null:w===me()?"p":w===fp()?"f":w;
const tnDec=w=>w==null?null:w==="p"?fp():w==="f"?me():w;
/* the host's word has a version per week (tnV); a claim names the last version the guest had seen: an older one = the host changed the
   night meanwhile (crossing), the host's word stands */
const tnVer=()=>CW.tnV&&CW.tnV.w===wk()?CW.tnV.n:0;
function tnFinal(re){S.tn={w:wk(),who:tnWho()};CW.tnLast=JSON.stringify([wk(),tnWho()]);CW.tnV={w:wk(),n:tnVer()+1};COOP.send({t:"act",k:TK,mode:"tn",fin:1,v:CW.tnV.n,re:re||null,week:wk(),who:tnEnc(tnWho()),id:TK+wk()+":"+newId()})}
function tnRelay(){if(typeof window.nfOn==="function"&&window.nfOn())return;/* jnf (night-final, unparked 20/11 ROOT-82) owns the palace night in co-op: ONE relay (jnf send/apply: holder, flip, choice, result); this B2 word would undo her won night */
 if(!CW.on||!S||S.dead||CW.inTurn||!CW.base||CW.pend||CW.sent===wk())return;/* the week's own draw (endTurn) goes with the merge, never as a relay */const k=JSON.stringify([wk(),tnWho()]);if(CW.tnLast===undefined){CW.tnLast=k;return}if(k===CW.tnLast)return;
 if(eW()){if(CW.ctx)return;CW.tnLast=k;if(host()){S.tn={w:wk(),who:tnWho()};CW.tnAt={w:wk(),v:(CW.thin.hv|0)+1};if(CW.tnHer()&&CW.herNight)CW.herNight()}else CW.thin.doSend("tn",{who:tnEnc(tnWho())});return}
 if(host()){tnFinal();return}
 CW.tnLast=k;const id=TK+wk()+":"+newId();CW.tnClaim=id;sentOr(COOP.send({t:"act",k:TK,mode:"claim",week:wk(),who:tnEnc(tnWho()),v:CW.tnSeen&&CW.tnSeen.w===wk()?CW.tnSeen.n:0,id}),()=>{if(CW.tnLast===k)CW.tnLast=""})}
/* her night changed by the other side's word: the notice she would get from any other cause */
function tnTake(who){const had=S.tonight==="me";tnSet(who);
 if(had&&S.tonight!=="me"){const v=S.tonight&&S.tonight!=="me"?S.tonight:null;pushModal({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng đêm nay Hoàng thượng ${v?`ngự ở cung ${esc(v===friendEntry()?friendName():v.name)}`:"không vời ai"}.</p>`});showModal()}
 else if(!had&&S.tonight==="me"&&!(eW()&&!host())/* thin E: her summons is a part-D card the host builds in her context (CW.herNight) */){try{pushDil(mkP("ksp"),"Kính sự phòng báo tin")}catch(e){}showModal()}}
/* thin E (level 5, eW()): no ctm-tn relay, no versions. The host's night is the world key S.tn in the view; her own change is the intent
   `do tn` (jcoopthine → CW.tnDo on the host, his context): taken unless the host changed the night after the view she had seen (base <
   tnAt.v: the host's word stands, tnb bumps so her phone takes his night again). Her phone takes the view's night only when it changes
   (CW.tnView from jcoopthine's thinview), so her own claim is not undone before the host has answered it. */
CW.tnDo=(a,base)=>{if(!eW()||!host()||!S||S.dead||!a)return;const cur=tnWho(),who=tnDec(a.who),fresh=!(CW.tnAt&&CW.tnAt.w===wk()&&(base|0)<CW.tnAt.v);
 if(fresh&&who!==cur){tnTake(who);S.tn={w:wk(),who:tnWho()};CW.tnLast=JSON.stringify([wk(),tnWho()]);CW.tnAt={w:wk(),v:(CW.thin.hv|0)+1}}
 else if(!fresh)CW.tnb=(CW.tnb|0)+1;T("tnDo "+a.who+" "+(fresh?"take":"keep"));try{render()}catch(e){}};
CW.tnHer=()=>!!(host()&&S&&S.tn&&S.tn.w===wk()&&S.tn.who===fp());
CW.tnView=e=>{if(!eW()||host()||!S||S.dead||CW.inTurn||CW.ctx)return;const tn=S.tn;const vk=JSON.stringify([tn&&tn.w,tn&&tn.who,e&&e.tnb]);if(vk===CW.tnVK)return;CW.tnVK=vk;
 if(!tn||tn.w!==wk())return;const who=tn.who==="me"?me():tn.who;if(who!==tnWho()){T("tnView "+who);tnTake(who)}CW.tnLast=JSON.stringify([wk(),tnWho()])};
COOP.on("act",m=>{if(!m||m.k!==TK||!CW.on||eW()||m.from===CW.seat||!S||S.dead||m.week!==wk())return;
 if(host()){/* the guest's claim (an old guest's plain "tn" counts as a claim on the night it replaced) */
  if(m.mode!=="claim"&&m.mode!=="tn")return;const cur=tnWho(),fresh=typeof m.v!=="number"||m.v===tnVer();
  if(fresh&&tnDec(m.who)!==cur)tnTake(tnDec(m.who));tnFinal(m.id);render();return}
 if(m.mode!=="tn")return;if(CW.tnClaim&&m.re===CW.tnClaim)CW.tnClaim=null;if(typeof m.v==="number")CW.tnSeen={w:wk(),n:m.v};
 const who=tnDec(m.who);if(who!==tnWho())tnTake(who);else CW.tnLast=JSON.stringify([wk(),tnWho()]);
 render()});
(function(){if(typeof flip!=="function")return;const f=flip;flip=function(){if(!CW.on)return f.apply(this,arguments);
 /* E-fix: her maid-card answer ran on the host in her context (jcycle done → flip): no draw in her context; the host's held draw runs once her context closes */
 if(CW.ctx&&eW()){CW.thin.D.after(()=>{try{cyFree()}catch(e){console.error(e)}});return S.tonight}
 if(!host()){/* the guest draws nothing: her night comes from the host's tn with the merged week */const r0=S.tonight;
  if(CW.inTurn){S.tonight=null;try{if(typeof pregFind==="function")pregFind()}catch(e){}return}return r0}
 /* host: the friend's entry is in the deck (endTurn took her out) */const L=CW.pulled;
 /* review/coop-b1b5-fix: her Kỳ nguyệt sự tuần and her maid's card (jcycle cyrep) not answered yet: the draw waits for her answer
    (ctm-p2 "cyb", cyFree below runs this flip again), so her "báo sớm / giấu" really keeps her card on the tray */
 {const fe=cyFe();if(cyWait(fe)){CW.cyHold=window.cyWk();S.tonight=null;T("cyHold "+CW.cyHold);cyArm();return}}
 if(L&&L.length)pushFriend(L.slice());let r;
 try{r=f.apply(this,arguments)}finally{if(L&&L.length)pullFriend()}
 /* reviewer r2: the week's flip can run AFTER endTurn (main's jcycle defers it behind her maid's Kỳ nguyệt sự card, cyrep → flip again):
    CW.pend = this week's end is still waiting to go out, so that night is next week's too (else tn.w = the old week and the guest never takes it) */
 const nx=CW.inTurn||CW.pend?1:0;S.tn={w:wk()+nx,who:tnWho()};CW.tnLast=JSON.stringify([wk()+nx,tnWho()]);return r}})();
CW.tnShared=true;/* jcycle cyNoFriend: the host's flip deck holds the friend (B2), the guest's flip draws nothing: no need to take her out */
(function(){if(typeof resolveTonight!=="function")return;const f=resolveTonight;resolveTonight=function(){if(!CW.on)return f.apply(this,arguments);const t=S.tonight;
 /* her friend's night is played on her friend's client; an NPC's night only on the host (its gains are world numbers) */
 if(t&&t!=="me"&&(isF(t)||!host())){S.tonight=null;return""}return f.apply(this,arguments)}})();
/* the guest takes the host's night when the merged week is in (onWeek → CW.tnWeek) */
CW.tnWeek=function(){if(!CW.on||!S||S.dead||host())return;if(typeof window.nfOn==="function"&&window.nfOn()){CW.tnLast=JSON.stringify([wk(),tnWho()]);return}/* jnf owns her night (its relay) */
 const tn=S.tn;if(!tn||tn.w!==wk()){CW.tnLast=JSON.stringify([wk(),tnWho()]);return}
 const who=tn.who===fp()?fp():tn.who;const was=S.tonight==="me";tnSet(who);
 if(S.tonight==="me"&&!was&&!eW()){try{pushDil(mkP("ksp"),"Kính sự phòng báo tin")}catch(e){}}};
(function(){const f=render;render=function(){const r=f.apply(this,arguments);try{if(CW.on)tnRelay()}catch(e){}try{if(CW.on)cySend()}catch(e){}return r}})();

/* ---------- B5 (review/coop-b1b5): seat caps count BOTH players ----------
   (1) the week's promotions (monthTick → promote / fillSeats) run while endTurn has taken the friend out of the harem: the seat count
       (holders, j30 SEATCAP) now counts her entry too, so a full seat is full on both screens.
   (2) both promoted into the same last seat in the same week (neither could see the other's decree): the higher Sủng keeps it (equal →
       seeded roll; night-final audit of OD 22:10Z, was "the host keeps it"); the other is put back one rank and told why (kit dialog). */
(function(){if(typeof holders!=="function")return;const f=holders;holders=function(r){const L=f.apply(this,arguments);if(!CW.on||!S)return L;
 for(const x of CW.pulled||[]){const v=x[1];if(x[0]>=0&&v&&v.alive&&!v.out&&!L.includes(v)&&rkOf(v)===r)L.push(v)}return L}})();
/* night-final audit (owner OD 16/11 22:10Z: no rule may favour who acts first / which seat; 22:17Z ties): the seat no longer goes to the
   host by default. Both seats decide the SAME way from the same merged data: the higher Sủng keeps the seat; equal Sủng → a fair seeded
   roll (week + rank). Each seat runs this for itself; only the loser is put back. */
CW.seatWeek=function(){if(!CW.on||!S||S.dead||typeof SEATCAP!=="object"||!CW.mine)return;const r=S.rank||0,r0=CW.mine.rank||0;
 const f=friendEntry();if(r<=r0||!f||rkOf(f)!==r||SEATCAP[r]==null)return;if(holders(r).length<=SEATCAP[r])return;
 const me=Math.round(S.sung||0),fr=Math.round(f.sung||0);let lose=me<fr;
 if(me===fr){const k=`seat|${wk()}|${r}`;let h=2166136261;for(let i=0;i<k.length;i++){h^=k.charCodeAt(i);h=Math.imul(h,16777619)>>>0}lose=CW.seat!==(h%2?"a":"b")}
 if(!lose)return;const why=me===fr?"hai người ngang sủng, rút thăm công bằng, ghế về tay nàng":"nàng được sủng ái hơn nên giữ ghế";
 const nr=Math.max(r0,r-1);S.rank=nr;if(S.justCrowned)S.justCrowned=0;
 /* she did not take the seat (not a demotion for a fault): no "Bị giáng" scene from the j93 rank watcher */
 try{if(typeof KMSNAP!=="undefined"&&KMSNAP&&KMS===S)KMSNAP.rank=nr}catch(e){}
 /* r1 fix 3 (OD:L1228): no waiting claim on the seat. A full seat gives the LARGE one-off compensation of the promo-skip rule (jexam
    promoFullSeat, the ONE implementation since promo-skip is on main; numbers BAL.psk.seat): big silver, rare gifts, a phong hiệu without a
    rank change, favour for her family; loss: the consorts' jealousy. Her rank stays; the next one goes through the normal exam. */
 let t="";if(nr===r-1){try{t=promoFullSeat(S,"coop",{}).replace(/^<b class="g">[^<]*<\/b>:\s*/,"")/* the card already says the seat is full */}catch(e){console.error(e)}}
 pushModal({t:"Ghế đã có người",h:`<p>Cùng tuần ấy, ${esc(friendName())} cũng được tấn phong ${esc(RANKS[r].n)}. Ghế ${esc(RANKS[r].n)} chỉ có ${SEATCAP[r]}; ${why}.</p>${t?`<p>${t}</p>`:""}`})};

/* ---------- hooks ---------- */
const mute=n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(CW.on&&!host())return "";return f.apply(this,arguments)}};
["rivalsTurn","rivalsMonth","festival"].forEach(mute);
/* host: keep the world news text of the week for the guest */
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){const r=f.apply(this,arguments);if(CW.on&&host()&&typeof r==="string")CW.news+=r;return r}});
/* B4 (review/coop-b1b5): the week's NPC schemes (rivalsTurn), the month's NPC moves (rivalsMonth) and the festival contests roll on the
   HOST only, as before, but now WITH the friend's entry in the harem (endTurn had taken her out): NPCs can aim at her, she competes at
   Yến xuân / Thất tịch with her real numbers. What they do to her entry (Sủng, Danh, Thiện cảm, Oán, lãnh cung, death) is written back
   into her blob by toCanon, so the merge lands it on HER own S; the lines about her reach her in the week's news (cnews). */
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(!CW.on||!host())return f.apply(this,arguments);
 const L=CW.pulled;if(!L||!L.length)return f.apply(this,arguments);pushFriend(L.slice());(CW.b4=CW.b4||[]).push(n);if(CW.b4.length>20)CW.b4.shift();try{return f.apply(this,arguments)}finally{pullFriend()}}});
/* ONE WORLD r1 (review/coop-one-world-r1): the palace epidemic is a world fact rolled on the host only (jcoopone MUTE on the guest).
   The host's roll runs WITH the friend's entry in the harem (same pattern as B4), so she can catch it / be quarantined like anyone in
   that palace (her entry's ill + confined go back to her blob by toCanon), and its news line goes into the week's world news (cnews). */
(function(){const f=window.epidemic;if(typeof f!=="function")return;window.epidemic=function(){if(!CW.on||!host())return f.apply(this,arguments);
 const L=CW.pulled;let r;if(L&&L.length){pushFriend(L.slice());const fe=friendEntry(),ks=fe&&fe.kids;if(fe)fe.kids=[];/* her children are display copies here: their illness rolls on her own seat */
  try{r=f.apply(this,arguments)}finally{if(fe)fe.kids=ks;pullFriend()}}else r=f.apply(this,arguments);
 if(typeof r==="string"&&r)CW.news+=r;return r}})();
/* B3 (review/coop-b1b5): the Emperor's death in co-op, host-authoritative. The month roll only counts on the HOST and only for the
   reigning Emperor's own years (emp.y0 = the year he came to the throne); it writes emp.dead = {w} into the world (emp is a world key)
   and the week goes on. When the merged week w arrives, BOTH clients run the normal ending of the reign (heir → Thái hậu / Thái phi /
   tuẫn táng…, from her own heir and rank) at the same moment; the new lives (Luân hồi) join the same world under a NEW Emperor, made
   once by the host (mkEmp) and carried by its next week. The guest's own roll never fires. */
(function(){const f=emperorDies;emperorDies=function(){if(!CW.on)return f.apply(this,arguments);try{if(arguments[0])log(arguments[0])}catch(e){}
 if(!host()||!S||!S.emp||S.emp.dead)return;if(typeof S.emp.y0==="number"&&(S.year||0)-S.emp.y0<=(BAL.coopEmpY))return;
 S.emp.dead={w:wk()+(CW.inTurn?1:0),y:S.year,age:S.emp.age}};
 CW.empWeek=function(){if(!CW.on||!S||S.dead)return false;const d=S.emp&&S.emp.dead;if(!d||d.w!==wk()||CW.empDone===d.w)return false;CW.empDone=d.w;
  let ne=null;if(host()){try{ne=mkEmp();ne.y0=S.year||0}catch(e){console.error(e)}}
  try{f.apply(this,[""])}catch(e){console.error(e)}
  (CW.empLog=CW.empLog||[]).push({w:d.w,dead:!!(S&&S.dead),end:Q[0]&&Q[0].t||"",bh:/băng hà/.test(Q[0]&&Q[0].h||"")});
  /* the world the new lives join: the new Emperor (host), the old one gone */
  if(ne){const C=CW.dying||CW.base;if(C&&C.W&&C.W.S)C.W.S.emp=Object.assign(J(ne),{known:undefined});if(S&&!S.dead){S.emp=Object.assign(ne,{known:{}})}}
  return true}})();
/* guest: an NPC's buổi act only lands when it is aimed at her (NPC vs NPC rolls on the host) */
(function(){const f=pickTarget;pickTarget=function(v){if(CW.on&&isF(v))return null;const t=f.apply(this,arguments);if(CW.on&&!host()&&t!==S)return null;return t}})();
(function(){const f=rivalsBuoi;rivalsBuoi=function(){return withoutFriend(()=>f.apply(this,arguments))}})();
(function(){const f=endTurn;endTurn=function(){if(CW.on){if(waiting()||frozen()||CW.pend||!CW.base)return;CW.news=""}
 if(!CW.on)return f.apply(this,arguments);let r;CW.inTurn=true;const alt=typeof CW.altTurn==="function"?CW.altTurn():null;/* a route with its own week (jkc at home: kcEndTurn) */
 try{r=withoutFriend(()=>(alt||f).apply(this,arguments))}finally{CW.inTurn=false}famSweep();if(S){CW.pend=true;try{render()}catch(e){}lockNext()}return r};CW.weekEnd=endTurn/* a route with its own week (jkc) calls this directly, past the palace-only wrappers made after it */})();
(function(){const f=nextBuoi;nextBuoi=function(){if(!CW.on)return f.apply(this,arguments);if(waiting()||frozen()||CW.pend||!CW.base)return;
 if(eW()&&!CW.allow&&!CW.allowN&&CW.eNext)return CW.eNext();
 /* same buổi for both: buổi sáng / chiều end with `bend`; the server's `buoi` runs the real step (CW.allow); buổi tối ends the week (`end`) */
 if(CW.p2&&!CW.allow&&(S.buoi||0)<(typeof B4L==="number"?B4L:2)){if(!S||S.dead)return;if(Q.length||S.mg||needWhere()){wantB();return}CW.wantB=null;bend();return}
 /* buổi tối: "Sẵn sàng" only marks her ready; the night + week end (endTurn) runs on the host's `go` for both (nightReady below) */
 if(CW.p2&&!CW.allowN&&(S.buoi||0)>=LASTB()){if(!S||S.dead)return;if(Q.length||S.mg||needWhere()){wantB();return}CW.wantB=null;nightReady();return}
 const r=f.apply(this,arguments);if(!CW.pend){keepFriendPos();refreshHere()}famSweep();return r}})();
/* #next was wired to the bare nextBuoi in j6 (before any wrapper): in co-op route the button through the wrapped one */
(function(){const n=$("next");if(!n)return;const o=n.onclick;n.onclick=function(e){if(CW.on)return nextBuoi();return o?o.call(this,e):undefined}})();
/* NPC whereabouts are the host's: the guest's own placement is replaced by the host's for this buổi; the host re-sends whenever it re-places */
(function(){const f=placeWhere;placeWhere=function(){const r=f.apply(this,arguments);if(CW.on)try{if(!host()&&CW.p2&&!eW()){if(!setWhere(CW.lastWhere))CW.whereKey=""}keepFriendPos();if(host()&&CW.p2&&!CW.pend&&!CW.inTurn)sendWhere()/* the new week's places go out with the merged week, not from inside endTurn */}catch(e){}return r}})();
/* review/coop-arrive-see (GAP OD-CO1): the walker's list is built from S.where, so the friend's place in it is made current FIRST
   (her walk on the host read the host's place from the last buổi step: the second to arrive never saw the first) */
(function(){const f=goTo;goTo=function(){if(CW.on)try{keepFriendPos()}catch(e){}const r=f.apply(this,arguments);if(CW.on)try{sendPos();presAll()}catch(e){}return r}})();
/* ONE presence refresh for both seats on the host (thin level 7: both persons live here): whenever either person's place / visit / buổi
   changes (any road: walk, map jump, event sending her home, buổi step, visit), each seat's friend place is re-read and the people at
   each seat's place rebuilt; her copy goes to her phone in the next delta. Gated by a key, so a render without a move costs nothing. */
function presAll(force){try{if(!CW.on||CW.ctx||!S)return;
 /* the key holds WHO is in each list (a later goTo wrapper, e.g. jplx, rebuilds the list to the same length without the friend) */
 const vk=x=>x&&x.visit?x.visit.k+"/"+(x.visit.people||[]).map(p=>p?(p.kind||"")+":"+(p.ref&&p.ref.id!=null?p.ref.id:p.name||""):"").join(","):"-";
 /* rv coop-arrive-see r1: below level 7 (the LIVE default, level 0) each phone builds its OWN list from its own S.where (the friend's
    place from her pos message): the same one refresh, on this seat only, on BOTH seats; her phone at level 7+ shows the host's (lens7) */
 if(!(host()&&CW.thin&&CW.thin.on&&CW.thin.on(7))){if(lens7())return;const f=friendEntry();
  const K1=()=>["L",wk(),S.buoi||0,S.place,vk(S),f&&S.where?S.where[f.id]:"",!!S.dead].join("|");if(!force&&K1()===CW.presK)return;refreshHere();CW.presK=K1();return}
 const o=CW.seat==="a"?"b":"a";const B=CW.thin.seatOf(o);const H=B&&B.S;if(!H)return;
 const K=()=>[wk(),S.buoi||0,S.place,vk(S),H.place,H.buoi||0,vk(H),!!S.dead,!!H.dead].join("|");if(!force&&K()===CW.presK)return;
 keepFriendPos();refreshHere();CW.thin.withSeat(o,()=>{keepFriendPos();refreshHere()});CW.presK=K()}catch(e){console.error(e)}}
CW.presAll=presAll;
(function(){const f=save;save=function(){if(!CW.on)return f.apply(this,arguments);try{if(S&&!S.dead&&CW.base)localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,at:Date.now()}))}catch(e){}}})();
(function(){const f=over;over=function(){if(CW.on&&S&&!S.dead){/* keep the world as it stands at her death; the new life is put into it */
  try{S.dead=true;CW.dying=toCanon();S.dead=false}catch(e){console.error(e)}}return f.apply(this,arguments)}})();
/* never leave a queued dialog unseen (a rebuild from the room can drop the open panel): the turn would wait on it forever */
/* a queued dialog is never left hidden (lander #3): while the Tuần lục book (or a mini game) is up it waits and LOOKS AGAIN; before, it gave up
   once and, as onPos does not render while Q is full, the host sat with Q hidden and the week end never went out ("Chờ hảo hữu" for both) */
function qBlocked(){try{const b=document.querySelector(".kbk-bar");return !!(b&&b.offsetParent!==null)||!!(S&&S.mg)}catch(e){return false}}
let qT=0;CW.qN=0;function reshowQ(){qT=0;CW.qN++;try{const M=$("modal");if(!(CW.on&&S&&Q.length&&M&&M.hidden))return;if(qBlocked()){qT=setTimeout(reshowQ,400);return}showModal()}catch(e){}}
CW.reshowQ=reshowQ;CW.qArmed=()=>!!qT;/* review/coop-c4-stuck: test hooks (dev/test/coop-c4-stuck.js S1) */
(function(){const f=render;render=function(){if(CW.on)try{presAll()}catch(e){}const r=f.apply(this,arguments);if(CW.on)try{lockNext();soonEnd();sendPos();if(Q.length&&!qT)qT=setTimeout(reshowQ,400)}catch(e){}return r}})();
(function(){const f=closeModal;closeModal=function(){/* the guest's "Đợi bạn" note can be closed before any world exists */
 if(CW.on&&!S){Q.shift();if(Q.length)showModal();else{const m=$("modal");if(m)m.hidden=true}return}const r=f.apply(this,arguments);if(CW.on)soonEnd();return r}})();
COOP.on("status",()=>{if(CW.on){lockNext();soonEnd()}});
/* the rebirth / first-life flow: Luân hồi builds the life (nlRun), she accepts it (nlAccept) */
/* review/coop-stable: the new life's throwaway world (start() inside nlRun) is built while she is already "in life": before, CW.inLife was
   set only after it, so on the GUEST jcoopask's newRival gave its ~10 consorts temp ids (1001…) as persons she "made", attach()'s ser()
   turned them into new-consort requests to the host, she kept them as ghost consorts the host never had, and a reborn cung nữ could be
   given one of them as mistress (the host then never saw her: RV(mid) missing). */
if(typeof nlRun==="function"){const f=nlRun;nlRun=function(){if(CW.ctx)return f.apply(this,arguments);if(CW.on)CW.inLife=true;const r=f.apply(this,arguments);try{if(CW.on){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=true}}catch(e){console.error(e)}return r};}
if(typeof nlAccept==="function"){const f=nlAccept;nlAccept=function(){if(CW.ctx)return f.apply(this,arguments);const r=f.apply(this,arguments);try{if(CW.on&&CW.inLife&&S&&!S.dead){CW.inLife=false;if(CW.holdMe)CW.heldMe=true;else sendMe()}}catch(e){console.error(e)}return r};}
/* a start() that bypasses Luân hồi (window.__nlInner): attach + send at once */
(function(){const f=start;start=function(){if(CW.ctx)return f.apply(this,arguments);if(CW.on&&window.__nlInner&&!CW.inLife)CW.inLife=true;/* same: her throwaway world never counts as hers */const r=f.apply(this,arguments);try{if(CW.on&&window.__nlInner&&S&&!S.dead){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=false;sendMe()}}catch(e){console.error(e)}return r}})();
CW.toCanon=toCanon;CW.fromCanon=fromCanon;CW.friend=friendEntry;CW.sendEnd=sendEnd;
/* co-op buổi clock (jcooptimer, KIT §69): read-only views + the one forced step it may take. forceBend = "Sẵn sàng" pressed for her when
   the buổi ran out: sends `bend` even with a dialog / mini game open (the room's step then waits for it: CW.pendBuoi, nothing is cut);
   only for the day buổi (tối ends through nextBuoi → endTurn → end), only when her buổi is the room's buổi and not already ended. */
CW.isWaiting=waiting;CW.isFrozen=frozen;CW.lockNext=lockNext;
CW.forceBend=()=>{if(eW())return CW.eForce?CW.eForce():false;if(!CW.on||!S||S.dead||CW.inLife||CW.bend||waiting()||frozen()||CW.pend||!CW.base||!CW.p2)return false;const b=S.buoi||0;
 if(b>=(typeof B4L==="number"?B4L:2))return false;if(typeof CW.rbuoi==="number"&&CW.rweek===wk()&&CW.rbuoi!==b)return false;bend();return true};
/* rolling copy of her week (review/coop-night-sync): written ~1 s after each render and when the page hides, read back by begin()
   on a reload / rejoin. Only taken for the same room, seat, week, life and name; a sent / pending week end is never restored. */
/* review/coop-rejoin-xdev: the same copy also goes to the room's server as HER SEAT COPY ({t:"seat"}, coop/worker Room "seat-<seat>"),
   so a rejoin from ANOTHER device (same seat through Sổ mây's pid, jcoop pidFor) or with cleared storage gets her exact week back.
   Sent when it changed, at most every SEAT_MS, and at once when the page hides. Version = the server's counter (seatok → CW.ssv).
   Newest wins on rejoin (pickSnap): a local copy and a server copy written by THIS device (same dev id) → the local one (it is at
   least as new); else the server copy when its version is newer than the last version this device saw, else the local one. */
const SNK="ctm-coop-wk",SEAT_MS=3000;let svT=0,seatT=0,seatAt=0,seatLast="";
const DEV=(()=>{try{let d=localStorage.getItem("ctm-coop-dev");if(!d){d=Math.random().toString(36).slice(2,12)+Date.now().toString(36);localStorage.setItem("ctm-coop-dev",d)}return d}catch(e){return "x"+Math.random().toString(36).slice(2,10)}})();
function snapSave(now){svT=0;try{const o=CW.snap&&CW.snap();if(o){o.dev=DEV;o.sv=CW.ssv||0;localStorage.setItem(SNK,JSON.stringify(o));seatPush(o,now)}}catch(e){}}
function snapSoon(){if(CW.on&&!svT)svT=setTimeout(snapSave,1000)}
CW.snapNow=()=>{try{clearTimeout(svT)}catch(e){}snapSave(true)};/* r4: a carried card is in her seat copy at once (a reload right after the carry keeps it) */
/* review/lag-play-2: the seat copy is ~40 KB; when the server can (room reply caps "seatd") only the PARTS that changed since the copy
   the server confirmed (seatok) are sent: {t:"seatd",sv,set,del}. The server applies them on top of exactly version sv, else answers
   "seatresync" and the next push is the full copy again. Parts = buoi, used, c, d.<key>, d.S.<key> (one JSON string each). */
let seatBase=null,seatPend=null,seatBusy=0;
function seatParts(o){const P={buoi:JSON.stringify(o.buoi),used:JSON.stringify(o.used),c:JSON.stringify(o.c)};const d=o.d||{};
 for(const k in d){if(k==="S"&&d.S&&typeof d.S==="object"){for(const j in d.S)if(d.S[j]!==undefined)P["d.S."+j]=JSON.stringify(d.S[j])}else if(d[k]!==undefined)P["d."+k]=JSON.stringify(d[k])}return P}
function seatDelta(P,B){const set={},del=[];let n=0;for(const k in P)if(B[k]!==P[k]){set[k]=JSON.parse(P[k]);n++}
 for(const k in B)if(!(k in P))del.push(k);return {set,del,n:n+del.length}}
function seatPush(o,now){if(!CW.on||CW.seatOld||!o||COOP.state.status!=="open")return;
 if(seatBusy&&Date.now()-seatBusy>10000)seatBusy=0;  /* no seatok within 10 s (socket dropped): give up waiting */
 if(!now&&(seatBusy||Date.now()-seatAt<SEAT_MS)){if(!seatT)seatT=setTimeout(()=>{seatT=0;snapSave()},Math.max(400,SEAT_MS-(Date.now()-seatAt)));return}
 const P=seatParts(o);const k=JSON.stringify([o.week,P]);if(k===seatLast)return;
 const caps=COOP.state.caps||[];let msg;
 if(caps.indexOf("seatd")>=0&&!Object.keys(P).some(x=>x.split(".").length>(x.startsWith("d.S.")?3:2))&&seatBase&&seatBase.wk===o.week&&seatBase.sv===(CW.ssv||0)&&!seatBusy){const D=seatDelta(P,seatBase.P);
  msg={t:"seatd",sv:CW.ssv||0,set:D.set,del:D.del,dev:o.dev}}
 else msg={t:"seat",sv:CW.ssv||0,o};
 seatAt=Date.now();seatBusy=Date.now();seatPend={P,wk:o.week};COOP.send(msg,!!now).then(ok=>{if(ok)seatLast=k;else{seatBusy=0;seatPend=null}})}
COOP.on("seatok",m=>{if(typeof m.sv==="number"){CW.ssv=Math.max(CW.ssvWk===wk()?CW.ssv||0:0,m.sv);CW.ssvWk=wk();
 if(seatPend&&CW.ssv===m.sv)seatBase={P:seatPend.P,wk:seatPend.wk,sv:m.sv};else seatBase=null}seatBusy=0;seatPend=null});
COOP.on("error",m=>{if(!m)return;if(m.code==="seatold"){CW.seatOld=true;seatBase=null;seatBusy=0;T("seatold "+m.sv)}
 if(m.code==="seatresync"||m.code==="seatbig"||m.code==="badseat"){seatBase=null;seatBusy=0;seatPend=null;seatLast="";if(m.code==="seatresync"){T("seatresync "+m.sv);snapSoon()}}});
COOP.on("week",m=>{seatLast="";seatBase=null;seatBusy=0;seatPend=null;CW.seatOld=false;CW.ssv=0;CW.ssvWk=m&&m.week});  /* the server starts the seat versions again each week */
/* review/coop-rejoin-xdev-r1: a device that was only ASLEEP (socket gone, page kept, e.g. the Fold locked) while she played on another
   device reconnects by itself (no begin): when the room's copy of her seat is newer and was written by another device, take it, so this
   device does not go on with its stale week (and its own copies are accepted again instead of "seatold"). */
COOP.on("room",m=>{seatBase=null;seatBusy=0;seatPend=null;seatLast="";if(!CW.on||!CW.base||!m||!m.state)return;const R=m.mine;
 if(!R||!R.dev||R.dev===DEV||(R.sv||0)<=(CW.ssvWk===R.week?CW.ssv||0:0)||!snapOk(R,m.state))return;T("snap wake server sv"+(R.sv||0));
 if(CW.restore(R)){CW.ssv=m.msv||R.sv||0;CW.ssvWk=R.week;CW.seatOld=false;seatLast="";T("restored "+R.week+"."+R.buoi+" u"+R.used)}});
function snapOk(o,C){const P=C&&C.P&&C.P[CW.seat];
 return !!(o&&o.d&&P&&o.room===COOP.state.room&&o.seat===CW.seat&&o.week===wk()&&(o.c&&o.c.life||0)===(P.life||0)&&o.d.S&&o.d.S.name===P.name)}
function pickSnap(L,R){if(!R)return L;if(!L)return R;if(R.dev&&R.dev===L.dev)return L;return (R.sv||0)>(L.sv||0)?R:L}
function snapLoad(C){try{let L=null;try{L=JSON.parse(localStorage.getItem(SNK)||"null")}catch(e){}if(!snapOk(L,C))L=null;
 const R=snapOk(COOP.state.mine,C)?COOP.state.mine:null;const o=pickSnap(L,R);
 CW.ssv=Math.max(L&&L.sv||0,COOP.state.msv||0);CW.ssvWk=wk();CW.seatOld=false;seatLast="";if(o)T("snap "+(o===R?"server":"local")+" sv"+(o.sv||0));return o}catch(e){return null}}
CW.pickSnap=pickSnap;CW.seatVer=()=>({ssv:CW.ssv||0,dev:DEV,old:!!CW.seatOld});
addEventListener("pagehide",()=>{if(CW.on)snapSave(true)});document.addEventListener("visibilitychange",()=>{if(CW.on&&document.hidden)snapSave(true)});
(function(){const f=render;render=function(){const r=f.apply(this,arguments);try{snapSoon()}catch(e){}return r}})();
/* new build in co-op (dev/site/swreg.js, KIT §35.2): the page reloads into the new build and rejoins the room. The room only holds the
   week's base, so the local week (acts of this week's buổi, her khắc, the friend entry) is kept across the reload:
   CW.snap() → plain JSON written before the reload; CW.restore(o) right after the rejoin (COOP "start" → begin) puts it back when the
   room is still in the same week, then catches up with the room (buổi, host's NPC places, the friend's last place). */

/* ================= review/coop-b1b5-p2 (D21 co-op B1–B5, part 2) =================
   Relays ride the existing free-form act channel (k "ctm-p2", mode = op): no Worker change, protocol stays backward-compatible
   (an old client ignores an unknown k). Every act has its gain AND its loss on both sides; numbers from BAL / the existing act code. */
const P2K="ctm-p2",P2S=new Set();
/* E44k F1 family (law 11 + 6c): the P2 item answers (iltake = her choice for her piece in my box, ilrefund = her silver back) ride the same
   outbox as «res» (resent until acked, applied once per id, also after a reload: S.coopRs). A lost «ilask» is asked again by jil ilWeek (againW). */
const P2R=new Set(["iltake","ilrefund"]);
function p2say(mode,o){try{const m=Object.assign({t:"act",k:P2K,mode,week:wk(),id:P2K+mode+":"+newId()},o||{});return P2R.has(mode)?resOut(m):COOP.send(m)}catch(e){return false}}
const P2H={};const p2In=m=>{if(!m||m.k!==P2K||!CW.on||m.from===CW.seat||!S)return;if(m.mode==="ack"){resAck(m.ack);return}
 const rl=P2R.has(m.mode);if(P2S.has(m.id)||(rl&&rsSeen(m.id))){if(rl)COOP.send({t:"act",k:P2K,mode:"ack",ack:m.id,id:P2K+"ack:"+newId()});return}P2S.add(m.id);
 if(rl)S.coopRs=(S.coopRs||[]).concat([m.id]).slice(-80);const h=P2H[m.mode];if(h)try{h(m)}catch(e){console.error(e)}
 if(rl)COOP.send({t:"act",k:P2K,mode:"ack",ack:m.id,id:P2K+"ack:"+newId()})};COOP.on("act",p2In);CW.p2InT=p2In;/* test hook */
const fSrvE=()=>{try{return allServ().find(isF)||null}catch(e){return null}};
const isSrvMe=()=>typeof isSrv==="function"&&isSrv();

/* ---------- (1) B1: the friend serves as a cung nữ: the maid act set on her servant entry ----------
   On a servant of another house the acts are Mua chuộc (bribeServ, j29) and Dọa tố đối thực (threatServ: needs a known servant lover;
   her affair is with a man of the outer court, which j42 keeps on her own side, so that act is never offered on her). Mua chuộc on HER is
   her decision, not a dice roll on my screen: she gets the same card an NPC's bribe gives her (j42 cnvBribe), with me as the buyer.
     Nhận bạc → she: Bạc +pay, tai mắt of mine (monthly Bạc +8, the mistress may catch her: her j42 rules); me: Bạc −pay, a tai mắt there.
     Từ chối, bẩm chủ → she: Chủ tin +tin; me: the mistress holds 1 proof of my bribe, she likes me −5.   Im lặng → my bạc comes back.
   An NPC's bribe aimed at her (host world) reaches her as the j42 card itself. What she reports as my tai mắt (j42 "Lén báo tin",
   the monthly spy line: evA with my entry as holder) becomes MY proof on my side (relay "ev"), never lost in her copy of my entry. */
(function(){if(typeof bribeServ!=="function")return;const f=bribeServ;bribeServ=function(a,s){if(!CW.on||!isF(s))return f.apply(this,arguments);
 const o=ownerOf(s);if(!o||o===a)return "";const B=BAL.coopBribe;
 if(a===S){if((S.bac||0)<B.pay)return "";const id=newId();
  if(dOn()){if(CW.ctx)return "";if(host()){(CW.brb=CW.brb||{})[id]={o:o.id};const who=S.name;
    CW.thin.D.kind(fs(),"bribe",{rid:id,who,pay:B.pay,o:o.id})}
   else CW.thin.doSend("bribe",{rid:id,o:o.id,who:S.name,pay:B.pay})}
  else{(CW.brb=CW.brb||{})[id]={o:o.id};p2say("bribe",{rid:id,who:S.name,pay:B.pay})}
  return `Ngươi sai thái giám đem ${B.pay} lượng bạc dúi cho ${s.name}, đợi nàng trả lời. `}
 if(host()&&a&&a.id!=null&&a.alive&&(a.bac||0)>=B.pay){if(dOn())CW.thin.D.kind(fs(),"nbribe",{r:a.id});else p2say("nbribe",{r:a.id})}return ""}})();
P2H.bribe=m=>{if(S.dead||!isSrvMe())return p2say("briber",{rid:m.rid,no:1});const mis=srvM(),B=BAL.coopBribe,nm=esc(m.who||friendName()),mn=esc(mis?mis.name:"chủ nhân");
 pushModal({act:1,t:"Bạc lạ",h:`<p>Một thái giám của <b>${nm}</b> chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta muốn biết chuyện trong cung ${mn}.”</p>`,opts:[
  {n:"Nhận bạc, làm tai mắt",fx:{bac:+m.pay||B.pay},x:cnvSpyX(mis),go:()=>{S.srv.spyFor=fp();p2say("briber",{rid:m.rid,ok:1})}},
  {n:"Từ chối, bẩm chủ",fx:{tin:B.tin},/* previews: briber (P2H.briber, told) */x:`${mn} nắm ${balAb(BAL.eff.jcoopworld.evBriber)} chứng cứ của ${nm} · kèm: ${nm} ghi hận ngươi, thiện cảm ${balSg(-B.grudge)}`,go:()=>p2say("briber",{rid:m.rid,told:1})},
  {n:"Từ chối, im lặng",fx:{},x:`thành: trả lại bạc, giữ hòa khí với ${nm}, thiện cảm ${balSg(B.grudge)}`,go:()=>p2say("briber",{rid:m.rid})}]});showModal();render()};
P2H.briber=m=>briberRes(m);
/* the briber's side of her answer (old relay: P2H.briber; part D: the host runs it in the briber's context, m.o = the mistress) */
/* law 2 «Bạc lạ» co-op (review coopBribe 19/11): the briber's thiện cảm for the friend who serves = HER regard row S.rl[fp()] (the same row resApply
   writes and the friend's consort entry {id:fp()} reads); the servant entity {sid,coop} has no id, so affAdd(S,s) wrote S.rl["undefined"] */
function brbAff(n){const id=fp();S.rl=S.rl||{};S.rl[id]=cl((S.rl[id]||0)+n,-100,100)}
function briberRes(m){const a=m.o!=null?{o:m.o}:(CW.brb||{})[m.rid];if(!a)return;if(CW.brb)delete CW.brb[m.rid];if(S.dead)return;const s=fSrvE(),o=RV(a.o),B=BAL.coopBribe,nm=esc(friendName()),on=esc(o?o.name:"cung khác");let h="";
 if(m.no)h=`<p><b>${nm}</b> nay không còn hầu ở cung ${on}.</p>`;
 else{try{deedAdd(S,"sbribe",null,1,`mua chuộc người hầu của ${o?o.name:"cung khác"}`)}catch(e){}
  if(m.ok){apply({bac:-B.pay});if(s)s.spyFor="me";h=`<p><b>${nm}</b> nhận bạc, thành tai mắt của ngươi trong cung ${on}.</p><p>${fmt({bac:-B.pay})}</p>`}
  else if(m.told){let d=0;if(o&&o.alive){d=evA(o,S,BAL.eff.jcoopworld.evBriber);relAdd(S,o,BAL.eff.jcoopworld.briber)}brbAff(-B.grudge);h=`<p><span class="r"><b>${nm}</b> từ chối bạc, bẩm với ${on}.</span></p>${d?`<p class="r">${on} nắm thêm ${d} chứng cứ của ngươi.</p>`:""}`}
  else{brbAff(B.grudge);h=`<p><b>${nm}</b> từ chối, trả lại bạc.</p>`}}
 pushModal({t:"Mua chuộc",h});showModal();render()}
P2H.nbribe=m=>nbribeIn(m.r);
function nbribeIn(r){if(S.dead||!isSrvMe())return;const v=RV(r);if(!v||!v.alive)return;try{pushDil(mkP("cnvBribe",{r:v.id}),"Bạc lạ")}catch(e){console.error(e)}showModal();render()}
(function(){if(typeof evA!=="function")return;const f=evA;evA=function(h,t,n){const d=f.apply(this,arguments);
 try{if(CW.on&&!CW.b4in&&d>0&&isF(h)&&t&&t!==S&&!isF(t)&&t.id!=null&&t.id<900){if(dOn())evOut(t.id,d);else p2say("ev",{tg:t.id,n:d})}}catch(e){}return d}})();
P2H.ev=m=>evIn(m.tg,m.n);
/* E44j (b) (E52r finding b, law 1 + 6c REAL OBJECTS): HER piece taken into the HOST's box (tịch thu, sold out of her entry) had no road back:
   the NPC owner's road (ilConf / ilBack) never picks a player seat (npwAsk guard T8). The host keeps the box record (the world's truth) and, at
   the same due points as the player's own (jil ilWeek: confW wait, ransom visit), asks HER seat with the SAME dialog (PEND ilconf / ilback, pp.f);
   her choice comes back, the host hands the piece to her entry (jil ilTake → npcToFriend «add» = one piece home). Silver she paid for a piece
   that left the box meanwhile comes back to her (no new player words). */
CW.ilAsk=(kind,x)=>{try{if(!CW.on||!host()||!x||!x.e)return;ilUid(x.e);p2say("ilask",{kind,u:x.e.iu,e:J(x.e),pr:x.pr|0})}catch(e){console.error("ilAsk",e)}};
P2H.ilask=m=>{if(host()||!S||S.dead||!m||!m.e||!m.e.k)return;const pp={u:m.u,f:1,kind:m.kind==="conf"?"conf":"back",e:m.e,pr:m.pr|0};
 pushDil(mkP(pp.kind==="conf"?"ilconf":"ilback",pp),pp.kind==="conf"?"Đồ bị tịch thu":"Đồ cũ trở về");try{showModal();render()}catch(e){}};
CW.ilWant=(pp,how,pay)=>{p2say("iltake",{u:pp.u,k:pp.e&&pp.e.k,how,pay:pay||null})};
P2H.iltake=m=>{if(!host()||!m)return;const f=friendEntry();const x=typeof ilFind==="function"?ilFind(m.u):null;
 if(f&&x&&String(x.own)===String(key(f))&&typeof ilTake==="function"){ilTake(x,f,m.how||"về");return}
 if(m.pay&&m.pay.bac>0)p2say("ilrefund",{bac:m.pay.bac|0,k:x&&x.e?x.e.k:m.k||""})};
/* refund: only when the piece left the host box before her answer came (her entry died meanwhile: while it lives, jil ilWeek keeps every
   other road off her pieces); no new player words (E ROOT: existing wording only) */
P2H.ilrefund=m=>{if(host()||!S||S.dead||!(m&&m.bac>0))return;ap(S,{bac:m.bac|0})};
CW.P2H=P2H;/* test hook (dev/test/coop-famops-unit.js) */
function evIn(tg,n){if(S.dead)return;const v=RV(tg);if(!v||!v.alive)return;const d=evA(S,v,+n||0);if(d>0){try{log(`Tai mắt ${esc(friendName())} lén báo tin: chứng cứ với ${esc(v.name)} +${d}.`)}catch(e){}render()}}
/* part D: the proof goes to the player who holds it, run by the host in that player's context */
function evOut(tg,n){const T=CW.thin;if(CW.ctx)T.D.after(()=>evIn(tg,n));else if(host())T.D.kind(fs(),"ev",{tg,n});else T.doSend("ev",{tg,n})}
/* ---------- B2 × jcycle (review/coop-b1b5-fix): her Kỳ nguyệt sự answers reach the other seat ----------
   Before: with B2 the HOST draws the one night with the friend's entry in its deck, but jcycle read the lie / back / hide flags only from
   its own S: the guest's maid card (báo lùi / báo sớm / giấu) cost her Đức / ghen and changed nothing on the host's tray, and both seats
   end the week at once, so the host's draw came before her answer. Now: each seat relays its own S.cyb flags (jcycle cyRec: lie, back,
   hide, rum …, + pend = the card is still open) on the free-form act channel whenever they change; the other seat keeps them as
   CW.fcy and jcycle reads them for the friend's entry (cybOf → COOPW.fcyb; after a merge her blob holds the same). The host's week draw
   WAITS (cyHold: no draw, no week end sent) while she is in her cycle tuần and her answer for this week is not in; her answer, or her
   end of week (an old client that never relays: true report), frees it. Costs stay on her side only (she pays once, on her client). */
/* thin E (level 5, eW()): no relay. Her answer is the intent `do cyb` (her cyRec), written into the HOST's stored copy of her person
   (S.cyb, the one fact) and CW.fcy (the draw's wait / free below are unchanged); fcyb reads her person directly: the host from his stored
   copy (in her context: the host's own S), the guest the host's cyb from the view. */
CW.fcyb=()=>{if(eW()){const T=CW.thin;try{if(CW.ctx)return (T.outerS&&T.outerS.cyb)||{};if(host()){const B=T.seatOf(fs());return (B&&B.S&&B.S.cyb)||{}}
  const P=T.view&&T.view.o&&T.view.o.P&&T.view.o.P[fs()];return (P&&P.cyb)||{}}catch(e){return {}}}
 const P=CW.base&&CW.base.P&&CW.base.P[fs()],r=CW.fcy;if(r&&(!P||r.life===(P.life||0)))return r.c||{};return (P&&P.S&&P.S.cyb)||{}};
function cySend(){if(eW())return;/* E-fix: at level >= 5 her cycle flags are the host's (asked + answered in her context there; the patch brings them) */if(!CW.on||!S||S.dead||CW.inTurn/* mid-week-end: the new week's card is not asked yet */||typeof window.cyRec!=="function")return;const r=window.cyRec();r.life=CW.life||0;const k=JSON.stringify(r);if(k===CW.cyK)return;CW.cyK=k;if(eW()){if(!host()&&!CW.ctx)CW.thin.doSend("cyb",r);return}sentOr(p2say("cyb",r),()=>{if(CW.cyK===k)CW.cyK=""})}
function cyWait(fe){if(!fe||fe.out||fe.alive===false||typeof window.cycOn!=="function"||typeof window.cyWk!=="function"||!window.cycOn(fe))return false;
 if(CW.cyTo===window.cyWk())return false;/* review/coop-cyhold: the wait for this week ran out (cyArm): the draw goes on with no answer */
 /* E-fix (cyAsk on host, level >= 5): her maid's card is asked BY THE HOST in her context (CW.herCy: jcycle cyAsk → part-D card) and
    answered there; the draw waits until her stored person holds this week's answer (or her maid had nothing to ask: CW.cyNo) */
 if(eW()&&host()){const g=window.cyWk(),c=CW.fcyb();if(c.rk===g||CW.cyNo===g)return false;if(c.df!==g&&CW.herCy)CW.herCy(g);return true}
 const r=CW.fcy,g=window.cyWk();if(r&&r.w===g&&!r.pend)return false;const e=COOP.state.ended||{};return !e[fs()]}
/* E-fix: her entry as the draw sees it: while the week end holds her out of the deck (CW.pulled) friendEntry() is null, and a
   presence / patch event then freed the hold before she answered (cyWait(null) = false) */
function cyFe(){const L=CW.pulled;return (L&&(L.find(x=>x[0]>=0)||[])[1])||friendEntry()}
function cyFree(){if(CW.cyHold==null||!CW.on||!S)return;if(!S.dead&&cyWait(cyFe()))return;T("cyFree "+CW.cyHold);CW.cyHold=null;if(S.dead)return;
 const c=S.cyb||{},g=window.cyWk();/* her own maid card still open: its answer runs the flip */if(!(c.df===g&&c.rk!==g))try{flip()}catch(e){console.error(e)}
 try{render()}catch(e){}soonEnd()}
/* review/coop-week-stall (thin E, level >= 5, HER phone): at his week end the HOST asks things in her context (her maid's Kỳ nguyệt sự
   card: E-fix cyAsk on host, CW.herCy from his draw; any part-D card his endTurn queues for her). Her own night ran on her phone at the
   same go and her week end went out at once, so such a card reached a seat that was already "waiting" (#next "Chờ hảo hữu…") while his
   end waited for her answer (cyHold): a modal open, the week end never sent (coop-bot THIN=9: 2 of 4 runs on main). A real choice is
   never made for her (jcooptimer), so the order is fixed instead: at level >= 5 her week end goes only once the HOST'S end is out
   (room ended[host]); his end never waits for hers, so this cannot turn around. A card he asks reaches her while her end is still hers to
   send: she answers, his draw runs, his end goes, then hers (one presence later). Not when his seat is empty or his person is dead (his
   end does not come then). (First try r1 held only in her cycle tuần: her phone reads the cycle on the old date at that point — the host
   owns the date — so it missed: pF2 b8.) */
function cyHer(){if(!eW()||host()||CW.ctx||!S||S.dead)return false;const e=COOP.state.ended||{};if(e[fs()])return false;
 if(nOtherGone())return false;const fP=CW.base&&CW.base.P&&CW.base.P[fs()];if(!fP||fP.dead)return false;
 const k=wk();if(CW.cyHerT!==k){CW.cyHerT=k;T("hostEnd wait "+k)}return true}
CW.cyHer=()=>cyHer();
{const go=()=>{if(CW.on&&CW.pend&&CW.cyHerT!=null&&!host())soonEnd()};COOP.on("thinview",go);COOP.on("presence",go)}
/* review/coop-cyhold (LIVE stall: an AFK friend with her Kỳ nguyệt sự card open held the host's week end for ever — jcooptimer never
   answers a real choice for her): the hold is bounded by BAL.coop.cyWaitMs (one core). When it runs out the host draws with the «no answer»
   outcome — the same rule as when her week end frees it, whichever seat hosts — and both seats get the kit notice. Her card stays open on
   her side (never answered for her); her late answer still lands in her own S.cyb (jcycle / thin E do cyb), so nothing is lost. */
function cyMs(){return +BAL.coop.cyWaitMs}/* one core (law 4): the bound lives only in BAL.coop.cyWaitMs */
function cyArm(){clearTimeout(CW.cyT);const g=CW.cyHold;if(!eW())p2say("cyq",{w:g})/* ask her to say her flags again: a host reload / lost relay left CW.fcy empty (NLC #10 case 12) */;CW.cyT=setTimeout(()=>{CW.cyT=null;if(!CW.on||CW.cyHold==null||CW.cyHold!==g)return;
 CW.cyTo=g;T("cyTimeout "+g);cyMark(g);p2say("cyto",{w:g});cyToNote(false);cyFree()},cyMs())}
/* traceable: her cycle state keeps that week's wait ran out with no answer (S.cyb.to; an answer she still gives that week is kept beside it).
   Thin (level >= 5): her person is the host's stored one (the patch brings it to her phone); else her phone writes it (P2H.cyto) */
function cyMark(g){if(!eW())return;try{const T=CW.thin;T.withSeat(fs(),()=>{if(!S)return;S.cyb=S.cyb||{};if(S.cyb.rk!==g)S.cyb.to=g});T.flush()}catch(e){console.error(e)}}
function cyToNote(her){try{if(typeof kitLine==="function")kitLine(her?"Quá giờ chờ: Kính sự phòng đã lật thẻ đêm nay khi chưa có lời báo Kỳ nguyệt của ngươi.":"Quá giờ chờ: Kính sự phòng đã lật thẻ đêm nay khi hảo hữu chưa báo Kỳ nguyệt.",4000)}catch(e){}}
P2H.cyq=()=>{CW.cyK="";try{cySend()}catch(e){}};
P2H.cyto=m=>{if(typeof m.w!=="number")return;if(!eW()&&S&&!S.dead){S.cyb=S.cyb||{};if(S.cyb.rk!==m.w)S.cyb.to=m.w}cyToNote(true)};
CW.cyFree=()=>cyFree();/* thin E: jcoopthine's `do cyb` (her answer, written into her stored person) frees the draw */
P2H.cyb=m=>{if(typeof m.w!=="number")return;CW.fcy={w:m.w,c:m.c&&typeof m.c==="object"?m.c:{},pend:!!m.pend,life:m.life||0};cyFree()};
COOP.on("presence",()=>{if(CW.on&&CW.cyHold!=null)cyFree()});
COOP.on("stop",()=>{CW.cyHold=null;CW.fcy=null;CW.cyK="";clearTimeout(CW.cyT);CW.cyT=null;CW.cyTo=null});
COOP.on("room",()=>{CW.cyK="";CW.posKey="";CW.famSentH=""});COOP.on("peer",on=>{if(on){CW.posKey="";CW.famSentH="";
 /* review/coop-cyhold (NLC #10 coop-night case 12): the other seat came back (a host reload loses CW.fcy, it lives in memory only): say her
    cycle flags again at once, so a hold for an answer she already gave frees now, not at BAL.coop.cyWaitMs */
 CW.cyK="";setTimeout(()=>{try{cySend()}catch(e){}},0)}});/* a reconnect: a relay sent while the socket was down is lost; say it again on the next render */
/* her monthly servant life (j42 srvMonth: wage, the spy's pay and the mistress catching her) runs inside the week while the friend's
   entry is out of the harem: put it back for that call, so her buyer (me) is still there and the spy line is not dropped */
(function(){if(typeof srvMonth!=="function")return;const f=srvMonth;srvMonth=function(){const L=CW.on&&CW.pulled;if(!L||!L.length)return f.apply(this,arguments);
 pushFriend(L.slice());try{return f.apply(this,arguments)}finally{pullFriend()}}})();

/* ---------- (2) B2: ONE heir (Thái tử) for the whole world, host-authoritative ----------
   World key S.hr = "<p|n><id>|<kid name#birth>" (p901/p902 = a player's child, n<id> = an NPC's): a string, so the merge never adds ids.
   The host's heirMonth (lập Thái tử, the lập đích debate) runs with the friend's entry in the harem, so her sons are candidates exactly as
   an NPC's; the guest's heirMonth never runs. Both clients resolve S.hr into S.heir after every rebuild (fromCanon), so the heir, the
   succession order and the reign ending read the same child on both screens. Her own loss (her heir dies, is deposed by an act) clears it
   from her side. The mother gets the j1 setHeir gain (Danh) on her own client, once. */
W_KEYS.push("hr");
function hrStr(){const H=S&&S.heir;if(!H||!H.k||H.k.alive===false)return null;const v=H.v;return (!v?"p"+me():isF(v)?"p"+fp():"n"+v.id)+"|"+kidId(H.k)}
function hrFind(h){if(!h||typeof h!=="string")return null;const i=h.indexOf("|");if(i<0)return null;const w=h.slice(0,i),n=h.slice(i+1);let v=null,L=null;
 if(w==="p"+me())L=S.kids;else if(w==="p"+fp()){v=friendEntry();L=v&&v.kids}else{v=RV(+w.slice(1));L=v&&v.kids}
 const k=(L||[]).find(k=>k&&k.alive!==false&&kidId(k)===n);return k?{k,v}:null}
CW.hrApply=function(){if(!CW.on||!S)return;const h=S.hr||null;for(const [k] of allKids())if(k&&k.heir)k.heir=false;
 const x=hrFind(h);if(!x){S.heir=null;return}x.k.heir=true;S.heir={k:x.k,v:x.v}};
CW.hrSync=function(){if(!CW.on||!S||S.dead)return;S.hr=hrStr();if(!host())CW.hrPrev=S.hr};
(function(){if(typeof heirMonth!=="function")return;const f=heirMonth;heirMonth=function(){if(!CW.on)return f.apply(this,arguments);if(!host())return "";
 const L=CW.pulled;if(L&&L.length)pushFriend(L.slice());if(CW.dHr===undefined)CW.dHr=S.hr||null;let r;try{r=f.apply(this,arguments)}finally{if(L&&L.length)pullFriend()}try{S.hr=hrStr()}catch(e){}
 try{const h=S.hr||null,was=CW.dHr;CW.dHr=h;if(dOn()&&h&&h!==was)CW.thin.D.kind(fs(),"hr",{h,was:was===undefined?null:was})}catch(e){console.error(e)}return r}})();
/* guest, merged week: the host named a new heir → her card (her own son: the j1 gain on her side) */
CW.hrWeek=function(){if(!CW.on||!S||S.dead||host())return;const h=S.hr||null,was=CW.hrPrev;CW.hrPrev=h;if(dOn())return;/* part D: the host builds her card */if(was===undefined||h===was||!h)return;hrCard(h,was)};
/* her "Lập Thái tử" card (old: built on the guest after the merged week; part D: built on the host in her context the month it happens) */
/* CO-OP HEIR FIX r2: her Thái tử of BEFORE this card, read on her side = solo's old S.heir in the jkidlife setHeir wrap. was = the host's S.hr
   before the change (sent with the card; the merged-week road: CW.hrPrev); without it (test hook) her own son still flagged heir. A dead son counts
   for nothing (solo: heirMonth clears a dead heir first, kidDie clears the flag), so she loses only a LIVING Thái tử put aside. */
function hrMine(was){const L=S.kids||[];if(was===undefined)return L.find(k=>k&&k.heir&&k.alive!==false)||null;
 if(!was||typeof was!=="string"||was.indexOf("p"+me()+"|")!==0)return null;const n=was.slice(was.indexOf("|")+1);return L.find(k=>k&&k.alive!==false&&kidId(k)===n)||null}
function hrCard(h,was){if(!S||S.dead)return;const x=hrFind(h);if(!x)return;const om=hrMine(was);
 /* her own son: setHeir in her context (the wrap gives her +heirDanh once; her old Thái tử given as S.heir, so a son already heir, or another son
    of hers put aside for him, gives nothing, as solo) */
 if(!x.v){const d0=S.danh||0;S.heir=om?{k:om,v:null}:null;try{setHeir(x.k,null)}catch(e){console.error(e)}const dd=(S.danh||0)-d0;/* reviewer r2: print what setHeir gave (ONE CORE), not a typed 10 */pushModal({t:"Lập Thái tử",h:`<p><b class="g">Hoàng thượng lập ${esc(x.k.name)}, con của ngươi, làm Thái tử.</b></p>${dd?`<p>${fmt({danh:dd})}</p>`:""}`});return}
 /* another mother's son (the host's, an NPC's): her living Thái tử put aside → she loses BAL.kid.heirDanh ONCE, here on her own side (the other
    mother's gain ran in the host's heirMonth); her son's flag is cleared, so the card never takes it twice */
 let dd=0;if(om){const d0=S.danh||0;for(const k of S.kids||[])if(k)k.heir=false;S.heir={k:x.k,v:x.v};try{ap(S,{danh:-BAL.kid.heirDanh})}catch(e){console.error(e)}dd=(S.danh||0)-d0}
 pushModal({t:"Lập Thái tử",h:`<p>Hoàng thượng lập ${esc(x.k.name)}, con của ${esc(x.v===friendEntry()?friendName():x.v.name)}, làm Thái tử.</p>${om?`<p><span class="r">${esc(om.name)}, con của ngươi, mất ngôi Đông cung.</span>${dd?` ${fmt({danh:dd})}`:""}</p>`:""}`})}
(function(){const f=CW.seatWeek;CW.seatWeek=function(){try{CW.hrWeek()}catch(e){console.error(e)}return f.apply(this,arguments)}})();

/* ---------- (4) B4: what the host's NPCs do to her ITEMS / CHILDREN, her own festival entry ----------
   rivalsTurn / rivalsMonth / festival on the host run with her entry in the harem (part 1). Before: only her numbers came back (toCanon).
   Now the host diffs her entry around each call and sends the item / child ops (same res.fam ops as the acts between the two, plus
   "add" for a thing given to her and by / to = the NPC who took it), so a theft is a thất lạc case held by THAT NPC, a poisoned child
   dies on her side, a child taken is raised by that NPC. Festival (j71 FX7): her own registration (the art she chose, the teacher she
   paid: S.j71.fx, sent live in pos) is used for her score, not the NPC "best art"; she pays the same Sức as when she plays it herself,
   her registration is closed and she gets the result card with her place and any prize. */
function b4Snap(){const x=(CW.pulled||[]).find(y=>y[0]>=0);const v=x&&x[1];if(!v)return null;let P0=null;try{P0=tsbPets(v).map(P=>[P,Object.assign({},P)])}catch(e){}return {v,inv0:(v.inv||[]).slice(),K0:famSnap(v),P0}}
/* E44j (a) (E52r finding a): a piece b4Ops sends to her seat («add» / «plant») is marked (object and ledger id) until the current call stack ends: jil ilGuard's
   after-check of the same call (rivalsMonth: ilGuard is OUTSIDE b4Wrap) routes it again through ilGone → npcToFriend, which then sends nothing */
function b4Mark(e){if(!CW.b4Sent){CW.b4Sent=new Set();Promise.resolve().then(()=>{CW.b4Sent=null})}CW.b4Sent.add(e);if(e.iu)CW.b4Sent.add("i"+e.iu)}
function b4Ops(b,why){const v=b.v,ops=[],L1=v.inv||[];
 /* E44e (law 6c, one piece = its ledger id): her entry rebuilt meanwhile (a festival's result diffs the snapshot taken at its start) holds NEW objects
    of the SAME pieces: matched by iu they did not move. Before: every piece «rm gone» + «add» (≈35 «Được ban …» lines, a piece mid-case lost: vanish 10000013) */
 const SM=famSame(b.inv0,L1);
 for(const e of b.inv0)if(!L1.includes(e)&&e&&e.ci!=null&&!SM.has(e)){const ci=e.ci;let th=rivals.find(r=>r!==v&&!isF(r)&&(r.inv||[]).includes(e));if(th)delete e.ci;
  /* E44e (V «hảo hữu lấy» vanish, law 6c + 1): an NPC thief's laydo on her entry puts the piece in a «thất lạc» case of her entry (jlost loLose:
     the case holds it, or the thief keeps a COPY via loKeepBy), never this object in a chest → before: «gone» = she lost it with no case, no road back.
     Now the same op as my own laydo (famDiff RMHOW «lost»): her seat opens her case, held by that NPC */
  let lc=null;if(!th)try{const c=typeof loCaseOf==="function"?loCaseOf(e):null;if(c&&c.e===e&&String(c.own)===String(key(v))&&c.st!=="done"&&c.cause==="riv"){lc=c;const h=loP(c.at||c.by);if(h&&h!==v&&!isF(h))th=h}}catch(z){}
  ops.push(Object.assign({op:"rm",ci,k:e.k,how:th||lc?"lost":"gone"},th?{by:th.id}:{},e.iu?{iu:e.iu}:{}))}
 for(const e of L1)if(!b.inv0.includes(e)&&e&&e.k&&!SM.has(e)){const x=J(e);delete x.ci;if(x.by==="me")x.by=me();ops.push(e.h?{op:"plant",e:x}:{op:"add",e:x,why:why||""});b4Mark(e)}
 for(let [kd,c] of b.K0.kids){const n=kidId(c);if(!(v.kids||[]).includes(kd))kd=(v.kids||[]).find(k=>k&&kidId(k)===n)||kd;/* E44e: a rebuilt entry = same child, new object */if(!(v.kids||[]).includes(kd)){const to=rivals.find(r=>r!==v&&!isF(r)&&(r.kids||[]).includes(kd));ops.push(Object.assign({op:"ktake",n},to?{to:to.id}:{}));continue}
  if(c.alive!==false&&kd.alive===false){ops.push({op:"kdie",n,why:"mất sớm"});continue}
  const d={};for(const x of ["hp","tal","fond"])if(typeof kd[x]==="number"&&kd[x]!==c[x])d[x]=kd[x]-(c[x]||0);const h0=!!c.heir&&!kd.heir;
  if(Object.keys(d).length||h0)ops.push(Object.assign({op:"kd",n,d},h0?{heir0:1}:{}))}
 if(b.K0.preg&&!v.preg)ops.push({op:"preg0"});return ops}
function b4Send(ops,o){o=o||{};if(!ops.length&&!o.force)return;const rid=newId();CW.rpend[rid]=Date.now();(CW.b4s=CW.b4s||[]).push({ops:ops.map(x=>x.op),tt:o.tt||""});if(CW.b4s.length>20)CW.b4s.shift();
 const msg=Object.assign({t:"res",id:rid,k:o.pet&&o.pet.some(x=>x.op==="lose")?"petsteal":"npc",n:"",who:"",fx:o.fx||{},flags:{},seen:"effect",fam:ops,hd:o.hd||"",tt:o.tt||""},o.fest?{fest:o.fest}:{},o.pet&&o.pet.length?{pet:o.pet}:{});
 /* E44b (E44r SWAP vanish 399 / 1571): the lostReturn hook sends from the GUEST too; D.resTo runs on the host only (as sendRes) — on the guest it ran the «ret» locally and the host case stayed «held» */
 if(dOn()&&host()&&CW.thin.D.resTo(fs(),msg,rid))return;resOut(msg)}
/* r1 fix 2: an NPC's pet act on her entry (jpetcare mindMenu petsteal / thaopet) → the same res.pet ops as mine: she loses it, not a copy */
function b4Pet(b){try{return b&&b.P0?petDiff(b.v,b.P0):[]}catch(e){return []}}
function f7reg(v,kk){try{const F=FX7[kk];const X=F&&v&&v.fx7&&v.fx7[F.f];return X&&X.a&&X.y===S.year&&!X.done&&SC7[X.a]?{F,X}:null}catch(e){return null}}
/* the festival being scored with her entry (also when the host's own minigame defers the scoring to fxFin7) */
function f7Done(L,pre){const c=CW.f7;if(!c||!L)return;CW.f7=null;const i=L.findIndex(x=>isF(x.p));const ops=(pre||[]).concat(c.b?b4Ops(c.b,c.title):[]);if(i<0){b4Send(ops,{tt:c.title});return}
 const x=L[i],an=SC7[x.kind]?SC7[x.kind].n:"tài nghệ";const top=i===0;CW.f7last={i,n:L.length,kind:x.kind,reg:!!c.reg};
 const hd=top?`${c.title}: ${an} của ngươi đứng đầu, Hoàng thượng ban thưởng (Sủng, Danh tăng; về cùng tuần mới).`:`${c.title}: ngươi dâng ${an}, đứng hạng ${i+1} trong ${L.length} người dự thi${i>=L.length-1?"; lu mờ trước hậu cung":""}.`;
 b4Send(ops,{force:1,tt:c.title,hd,fx:c.reg&&typeof J71==="object"?{suc:-J71.cost}:{},fest:c.reg?{f:c.reg.F.f,y:S.year}:null})}
if(typeof cScore7==="function"){const f=cScore7;cScore7=function(){const L=f.apply(this,arguments);try{const c=CW.on&&host()&&CW.f7;if(c&&Array.isArray(L)){
 if(c.reg){const pr=(c.reg.X.pr&&typeof J71==="object"?J71.prep:0)+(c.reg.X.pb||0);for(const x of L)if(isF(x.p)){x.pr=(x.pr||0)+pr;x.s+=pr}L.sort((a,b)=>b.s-a.s)}CW.f7.L=L}}catch(e){console.error(e)}return L}}
if(typeof fxBest7==="function"){const f=fxBest7;fxBest7=function(p){const c=CW.on&&host()&&CW.f7;if(c&&c.reg&&isF(p))return c.reg.X.a;return f.apply(this,arguments)}}
/* E44g T1 (law 6c REAL OBJECTS): the festival result (fxFin7) diffs her entry around ITS OWN call. Before: f7Done diffed the snapshot taken when
   festival() started; with the host's contest minigame deferring the scoring (and a festival that never closes keeping CW.f7 open for weeks),
   everything that touched her entry meanwhile was sent again as the festival's doing: the garment she put on on her own seat («rm gone» →
   her famItem takes it off her = vanish) and the one she took off («add» iu 0 = a second copy), the host's own Lấy đồ / Cài đồ already sent
   by their acts (coop-lost-scan T1 10000013 / 10000014 / 10000078 / 10000165). A synchronous festival (no minigame) keeps its whole diff (pre). */
function f7Snap(L){let v=null;try{const x=(L||[]).find(y=>y&&isF(y.p));v=x?x.p:friendEntry()}catch(e){}return v?{v,inv0:(v.inv||[]).slice(),K0:famSnap(v),P0:null}:null}
if(typeof fxFin7==="function"){const f=fxFin7;fxFin7=function(t,L){const c=CW.on&&host()&&CW.f7&&CW.f7.title===t?CW.f7:null;let pre=[];
 if(c){try{if(c.b)pre=b4Ops(c.b,c.title)}catch(e){console.error(e)}c.b=f7Snap(L)}
 const r=f.apply(this,arguments);try{if(c&&CW.f7===c)f7Done(L,pre)}catch(e){console.error(e)}return r}}
function b4Wrap(n,f){return function(){if(!CW.on||!host()||!CW.pulled||!CW.pulled.length)return f.apply(this,arguments);
 const b=b4Snap();if(!b)return f.apply(this,arguments);const fest=n==="festival";if(fest){CW.f7={b,title:arguments[0]||"Hội thi",reg:f7reg(b.v,arguments[1]),L:null}}
 CW.b4in=true;let r;try{r=f.apply(this,arguments)}finally{CW.b4in=false}
 try{if(fest){if(CW.f7&&CW.f7.L)f7Done(CW.f7.L);else if(CW.f7&&!Q.some(q=>q&&q.t===CW.f7.title)){const c=CW.f7;CW.f7=null;b4Send(b4Ops(c.b,c.title),{tt:c.title})}
   else if(CW.f7&&CW.f7.b){/* E44g T1: the scoring waits for the host's minigame: what festival() did so far goes now, the start snapshot is dropped (fxFin7 diffs its own call) */const c=CW.f7;const ops=b4Ops(c.b,c.title);c.b=null;if(ops.length)b4Send(ops,{tt:c.title})}}
  else{const pet=b4Pet(b);b4Send(b4Ops(b,""),{pet,force:pet.length})}}catch(e){console.error(e)}return r}}
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=b4Wrap(n,f)});
/* E44g T6 (law 6c REAL OBJECTS, law 1): an NPC gives a piece to her entry OUTSIDE the diffed calls (rivalsTurn / rivalsMonth / festival / the
   runAct wrapper): an agent act (jagacts cx:gift), a monthly gift (j8), jts / jveil gifts. jil ilGuard(giveTo) saw it land in her entry and
   logged «sang hảo hữu», but no op carried it: the piece stayed on the host's display copy of her entry and never reached her seat
   (coop-lost-scan vanish 934 / 3385 / 2028: a Kỳ ngộ-kept piece given on). Now the same «add» op the diffed calls send. Host only (NPCs roll
   on the host); inside a diffed call (CW.b4in) b4Ops already sends it. */
CW.npcToFriend=(p,e,f)=>{if(!CW.on||!host()||CW.b4in||!e||!e.k||!isF(f))return;if(CW.b4Sent&&(CW.b4Sent.has(e)||(e.iu&&CW.b4Sent.has("i"+e.iu)))){CW.b4Sent.delete(e);if(e.iu)CW.b4Sent.delete("i"+e.iu);return}/* E44j (a): b4Ops of this call already sent it (the same object, or the copy giveTo made: same id) */const x=J(e);delete x.ci;if(x.by==="me")x.by=me();b4Send([e.h?{op:"plant",e:x}:{op:"add",e:x,why:"",by:p.id}],{})};
CW.b4Wrap=b4Wrap;/* part C (jcoopthinc): the host's rivalsBuoi with her entry in the harem (G7) */
/* r1 fix 2 (whole family): ANY NPC act on her entry, whatever path runs it (npcAct, mindRun, a j70 plot's exec70, the jealousy kv acts,
   a due plan in rivalsBuoi…), outside the diffed calls above: the host snapshots her entry around that one act and sends the same res.fam /
   res.pet ops, so the NPC gains AND she loses (never a copy). The guest never lets an NPC act on the host's entry (NPCs roll on the host).
   Numbers stay with toCanon / her live pos as before. */
(function(){const f=runAct;runAct=function(a,t,k){if(!CW.on||!S||a===S||!t||!isF(t)||CW.b4in)return f.apply(this,arguments);
 if(!host())return "";let P0=null;try{P0=tsbPets(t).map(P=>[P,Object.assign({},P)])}catch(e){}
 const b={v:t,inv0:(t.inv||[]).slice(),K0:famSnap(t),P0};CW.b4in=true;let r;try{r=f.apply(this,arguments)}finally{CW.b4in=false}
 try{const pet=b4Pet(b),ops=b4Ops(b,"");(CW.npcOn=CW.npcOn||[]).push({a:a&&a.id,k,ops:ops.map(x=>x.op),pet:pet.map(x=>x.op)});if(CW.npcOn.length>20)CW.npcOn.shift();
  b4Send(ops,{pet,force:pet.length})}catch(e){console.error(e)}return r}})();
/* test hooks (dev/test/coop-p2.js): run fn as an NPC turn of the host's week (friend out of the harem as in endTurn, back in for fn) */
CW.b4Run=fn=>{const L=pullFriend();CW.pulled=L;try{return b4Wrap("rivalsTurn",()=>{pushFriend(L.slice());try{return fn()}finally{pullFriend()}})()}finally{CW.pulled=null;pushFriend(L)}};
CW.b4Fest=(t,kk)=>{const L=pullFriend();CW.pulled=L;try{return festival(t,kk)}finally{CW.pulled=null;pushFriend(L)}};
/* her side: the festival she was entered in is over (her j71 card would otherwise wait for it) */
COOP.on("res",m=>{try{if(!m||!m.fest||m.from===CW.seat||!CW.on||!S)return;const j=S.j71&&S.j71.fx&&S.j71.fx[m.fest.f];if(j&&j.y===m.fest.y)j.done=1}catch(e){}});

CW.snap=()=>{if(!CW.on||!S||S.dead||!CW.base||CW.inLife)return null;let d;try{d=ser()}catch(e){return null}
 return {room:COOP.state.room,seat:CW.seat,week:wk(),buoi:S.buoi||0,used,d,c:{nrdy:CW.nrdy,sent:CW.sent,pend:CW.pend,whereKey:CW.whereKey,lastWhere:CW.lastWhere,fpos:CW.fpos,mine:CW.mine||null,life:CW.life||0,p2:CW.p2,news:CW.news||"",thl:(CW.thin&&CW.thin.lvl)||0}}};
/* thin E (room level 5, also when the level message has not arrived yet: the snapshot's own level): the server's buổi stays at the week's
   start, the host's own copy is the room's buổi (his snapshot wins; her buổi is adopted from the host's view, jcoopthine gView) */
CW.restore=o=>{if(!o||!o.d||!CW.on||o.seat!==CW.seat||o.week!==wk()||o.c.pend||o.c.sent===wk()||(!(eW()||(o.c.thl|0)>=5)&&CW.rweek===wk()&&typeof CW.rbuoi==="number"&&CW.rbuoi<o.buoi))return false;
 quiet=true;try{if(o.d)o.d.tab="act";/* owner 16/11: rejoin opens her room (Hành sự) */deser(o.d)}finally{quiet=false}used=o.used||0;try{deal()}catch(e){}  /* the hand of acts is not in a sổ: dealt again, as the title's Tiếp tục does */
 Object.assign(CW,o.c);CW.bend=false;CW.pendBuoi=null;CW.posKey="";CW.inLife=false;
 /* her "Sẵn sàng" of this buổi survives too: the room still holds her bend (the night's ready is re-sent by nResync) */
 {const rm=CW.roomMsg;if(rm&&rm.week===wk()&&rm.buoi===(S.buoi||0)&&rm.bended&&rm.bended[CW.seat])CW.bend=true}
 try{keepFriendPos();refreshHere()}catch(e){}syncRoom(CW.roomMsg);try{$("title").hidden=true}catch(e){}
 if(Q.length)showModal();render();lockNext();return true};


/* ================= part D (review/coop-thin-d): the cards between the two players, built on the host =================
   Engine: jcoopthin §6 (TH.D). Here: the card kinds (PEND, rebuilt from pid+pp in the reader's context, so no closure ever holds the
   wrong player) and the host's intents. Each card is built in its READER's context ("ngươi" = the reader); its answer runs the other
   side in the other player's context: from her card (picked in her context) → D.after = the host's side; from the host's own card →
   D.later(fs()) = her side. Old relays (act invite / actr, ctm-p2 bribe / briber / nbribe / ev) run only while dOn() is off. */
CW.X.resApply=resApply;
CW.reEnd=function(){if(CW.on&&S&&!S.dead&&CW.sent===wk()){CW.sent=-1;sendEnd()}};
CW.soonEnd=soonEnd;
CW.hrCardTest=(h,was)=>hrCard(h,was);   /* test hook (dev/test/coop-thin-d.js): her heir card in the current context */
/* fn = the host's side (run after her context closes); k + a = her side as data (D.kind: deferred while her rolled life is held) */
const otherSide=(fn,k,a,lf)=>{const T=CW.thin;if(CW.ctx)T.D.after(fn);else T.D.kind(fs(),k,a,undefined,lf)/* r3: lf = the life that made her offer */};
/* Kết giao / Tặng quà: pp {id, k, item, who, e (the guest's item, when she gives it)} */
PEND.thInv=pp=>{if(!pp||!pp.id)return null;const ctx0=!!CW.ctx;/* Q-C2: a live board answers later, after her context closed: then the host runs it as D.after would */
 const c=askCard(pp.k,pp.x,(ok,lv)=>{if(ctx0&&!CW.ctx){invRun(pp.id,ok,pp,lv);return}otherSide(()=>invRun(pp.id,ok,pp,lv),"invHer",{pp,ok,lv},pp.lf)});if(c)return{t:c.h,o:c.o};const what=askWhat(pp.k,pp.item);
 return {t:`<p><b>${esc(pp.who||friendName())}</b> ${what}.</p>`,o:[
  {n:"Nhận",fx:{},x:"hảo hữu tiếp tục việc ấy",go:()=>otherSide(()=>invRun(pp.id,true,pp),"invHer",{pp,ok:true},pp.lf)},
  ...askYield(pp.k,()=>otherSide(()=>invRun(pp.id,"yield",pp),"invHer",{pp,ok:"yield"},pp.lf)),
  {n:"Từ chối",fx:{},x:"không nhận",go:()=>otherSide(()=>invRun(pp.id,false,pp),"invHer",{pp,ok:false},pp.lf)}]}};
/* her invite accepted / refused by the host: run in HER context (she is the actor, the host's entry the target) */
function invHer(pp,ok,lv){if(!S||S.dead)return;const v=friendEntry();
 if(!ok||!v||v.alive===false){pushModal({t:"Hảo hữu từ chối",h:`<p><b>${esc(friendName())}</b> không nhận.</p>`});return}
 /* thin F1 (level 6): her offer was made on the host in her context (jcoopworld runAct → D.kind inv), so the item rides as pp.he, as the host's own offer */
 let extra=askX(pp.k,pp.x)||undefined;const pe=extra?null:pp.e||pp.he;if(pe){S.inv=S.inv||[];const t=SJ(pe);extra=S.inv.findIndex(x=>SJ(x)===t);
  if(extra<0){/* bought after the week's base: put it in her stored chest first, so the patch takes it out of her live one */S.inv.push(J(pe));extra=S.inv.length-1;try{CW.thin.D.rebase()}catch(e){}}}
 CW.inv=pp.id;CW.yd=ok==="yield";let r="";try{r=runAct(S,v,pp.k,pmLvX(extra,lv))}finally{CW.inv=false;CW.yd=false}if(r)log(r);
 pushModal({t:"Hảo hữu nhận lời",h:`<p>${r||"Hảo hữu đã nhận."}</p>`})}
/* Mua chuộc on a player who serves as a cung nữ: pp {rid, who, pay, o (her mistress)} — the j42 card with the other player as the buyer */
PEND.thBribe=pp=>{if(!pp||!isSrvMe())return null;const mis=srvM(),B=BAL.coopBribe,pay=+pp.pay||B.pay,nm=esc(pp.who||friendName()),mn=esc(mis?mis.name:"chủ nhân");
 const ans=r=>{const m=Object.assign({rid:pp.rid,o:pp.o},r);otherSide(()=>briberRes(m),"briber",m,pp.lf)};
 return {t:`<p>Một thái giám của <b>${nm}</b> chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta muốn biết chuyện trong cung ${mn}.”</p>`,o:[
  {n:"Nhận bạc, làm tai mắt",fx:{bac:pay},x:cnvSpyX(mis),go:()=>{S.srv.spyFor=fp();ans({ok:1})}},
  {n:"Từ chối, bẩm chủ",fx:{tin:B.tin},x:`${mn} nắm ${balAb(BAL.eff.jcoopworld.evBriber)} chứng cứ của ${nm} · kèm: ${nm} ghi hận ngươi, thiện cảm ${balSg(-B.grudge)}`,go:()=>ans({told:1})},
  {n:"Từ chối, im lặng",fx:{},x:`thành: trả lại bạc, giữ hòa khí với ${nm}, thiện cảm ${balSg(B.grudge)}`,go:()=>ans({})}]}};
CW.dInit=function(T){
 /* CO-OP HEIR FIX r2 (law 11, whole family): her OWN act that names the heir (j97 mật chiếu, jend14 ch14 win, any setHeir in her context on the
    host). While she acts, her S.heir is the world's (S.hr), so "no Thái tử yet" / "my son is Thái tử" read the same court as the host's; a
    Thái tử she makes goes back into S.hr (a world key: the host's copy takes it as withSeat closes) and the host resolves it at once, so his
    heirMonth never names another over him. The Danh stays the jkidlife setHeir wrap's (her gain in her context; the mother put aside: none,
    those roads need no Thái tử yet, as solo). */
 {const ws=T.withSeat;T.withSeat=function(seat,fn){if(!CW.on||!host()||CW.ctx||seat===CW.seat||typeof fn!=="function")return ws.apply(this,arguments);let h0=null,ch=false;
  const r=ws.call(this,seat,function(){try{h0=S.hr||null;const x=hrFind(h0);S.heir=x?{k:x.k,v:x.v}:null}catch(e){console.error("heir in",e)}
   try{return fn.apply(this,arguments)}finally{try{const H=S.heir;if(H&&H.k&&!H.v&&H.k.alive!==false){const h=hrStr();if(h&&h!==h0){S.hr=h;ch=true}}}catch(e){console.error("heir out",e)}}});
  if(ch)try{CW.hrApply();CW.dHr=S.hr||null}catch(e){console.error("heir host",e)}return r}}
 /* B r2: every D work into the other player's context, as data (jcoopthin D.kind): the card kinds and their answers */
 Object.assign(T.D.K,{inv:a=>pushDil(mkP("thInv",a),"Hảo hữu tìm đến"),
  bribe:a=>{const d=!S.dead&&isSrvMe()?mkP("thBribe",a):null;if(d)pushDil(d,"Bạc lạ");else T.D.after(()=>briberRes({rid:a.rid,o:a.o,no:1}))},
  nbribe:a=>nbribeIn(a.r),ev:a=>evIn(a.tg,a.n),hr:a=>hrCard(a.h,a.was),invHer:a=>invHer(a.pp,a.ok,a.lv),briber:a=>briberRes(a)});
 /* a Mua chuộc card she can no longer answer (no longer a cung nữ after a new life): the buyer still gets "no longer serves there" */
 T.D.GONE.thBribe=pp=>briberRes({rid:pp.rid,o:pp.o,no:1});
 /* the guest's offers to the host: the host's own card (his context); her side runs in her context when he answers */
 T.onDo("inv",a=>{a=a||{};const who=S.name,lf=T.lifeOf("b")/* r3: her offer belongs to this life */;T.D.after(()=>{if(!S||S.dead)return;pushDil(mkP("thInv",{id:a.id,k:a.k,item:a.item,who,e:a.e||null,x:a.x||null,lf}),"Hảo hữu tìm đến");showModal();render()});return {ok:1}});
 T.onDo("bribe",a=>{a=a||{};const who=S.name,lf=T.lifeOf("b");T.D.after(()=>{const d=S&&!S.dead&&isSrvMe()?mkP("thBribe",{rid:a.rid,who,pay:a.pay,o:a.o,lf}):null;
   if(d){pushDil(d,"Bạc lạ");showModal();render()}else T.D.kind("b","briber",{rid:a.rid,o:a.o,no:1})});return {ok:1}});
 T.onDo("ev",a=>{a=a||{};T.D.after(()=>evIn(a.tg,a.n));return {ok:1}})};
}catch(e){console.error(e)}})();
