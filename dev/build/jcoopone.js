/* ================= jcoopone: ONE WORLD — the co-op guard table (review/coop-one-world) =================
   Owner co-op rule OD:L96 (one shared world, one truth) + one-core law OD:L1267; audit dev/handover/reports/coop-one-world.md.
   Every shared world fact is computed ONCE, on the host. worldOn() (jcoopworld.js) is false only on the co-op guest seat; there each world
   loop below is muted or runs for HER OWN person only. This is the LAST script (assemble.py), so each guard wraps the outermost layer of
   the function (every module's wrapper inside it is skipped too). Single player and the host: every guard is a pass-through.
   Kinds:  MUTE  = whole-world function, the guest returns "" (the host's result arrives in the merged week);
           ONLY_ME = mixed function (her + every NPC): on the guest the people lists hold only her while it runs;
           PERSON = per-person function: on the guest it does nothing for anyone but her.
   Inline checks (same helper): j3 endTurn NPC Sức/tablet ticks, j8 kidsMonth NPC moms, j13 Emperor/Thái hậu illness + NPC fortune lots.
   Safety net for anything missed: jcoopworld guestNet() takes back her endTurn's world rolls before her week goes to the server.
   Not here: the night flip (review/night-final) and contests (review/coop-contest) use the same worldOn(). Shop stock is personal (kept).
   Palace men (S.men) are the host's: the guest may build a throwaway set (menInit) but never writes it (jcoopworld HOST_ONLY) and every
   rebuild takes the host's set. */
(function(){
const guest=()=>!worldOn();
const wrap=(n,mk)=>{const f=window[n];if(typeof f!=="function")return;window[n]=mk(f)};
/* MUTE: NPC–NPC meetings, quarrels and oán, triều đình month + news, Emperor mood month, epidemics, Tết/den visits of NPCs, NPC danger in thu săn */
const MUTE=["npcEncounters","q72Npc","epidemic","tdMonth","tdNews","moodMonth","tsDenNpc","tsNpcDanger"];
for(const n of MUTE)wrap(n,f=>function(){if(guest())return "";return f.apply(this,arguments)});
/* ONLY_ME: arts/virtue study (v85Month), pets care + gifts (petWeek, petMonth), lost items (loMonth), servants' loyalty from mood (emoMonth),
   NPC affairs with palace men (affairMonth), the week's feelings + decay of everyone (emoWeek, review/coop-emo-seat): on the guest the people lists (liveRivals / consorts / emoPeople) hold only her while it runs
   (the rivals array itself is untouched, so the queen, RV(id) and refs still resolve). */
const ONLY_ME=["v85Month","petWeek","petMonth","loMonth","emoMonth","emoWeek","affairMonth","facMonth","servMonth","queenRewards","maidLoveMonth","ktMonth","fxServMonth"];
/* her own people: herself, her maid, her servants, her children */
const mine=x=>!!x&&(x===S||x===S.maid||(S.staff||[]).includes(x)||(S.kids||[]).includes(x));
let solo=0;
wrap("liveRivals",f=>function(){if(solo)return [];return f.apply(this,arguments)});
wrap("consorts",f=>function(){const L=f.apply(this,arguments);return solo?L.filter(p=>p===S):L});
wrap("emoPeople",f=>function(){const L=f.apply(this,arguments);return solo?L.filter(p=>p===S):L});
wrap("allServ",f=>function(){const L=f.apply(this,arguments);return solo?L.filter(mine):L});
wrap("allKids",f=>function(){const L=f.apply(this,arguments);return solo?L.filter(([k,v])=>!v||v===S):L});
wrap("fxServants",f=>function(){const L=f.apply(this,arguments);return solo?L.filter(mine):L});
function onlyMe(f,self,args){solo++;try{return f.apply(self,args)}finally{solo--}}
for(const n of ONLY_ME)wrap(n,f=>function(){if(guest())return onlyMe(f,this,arguments);return f.apply(this,arguments)});
/* the rest of the monthly world (stipends, illness, kids growth) is per person: PERSON below + inline checks in j8/j13 */
/* HER OWN ACT (review/coop-main-faults): the guards below stop the guest's WORLD LOOPS (week end, month) from rolling for NPCs; they must
   never stop what she does herself. Her act on the friend or an NPC (runAct with her as the actor: Sai người lấy trộm đồ → loLose on the
   target, …) runs in full on her side, and its result reaches the other seat as before (res.fam ops for the friend, the merged week for NPCs).
   Before, loLose(friend) returned null on the guest: "Rương … không còn món nào đáng lấy" though the chest was full (dev/test/coop-b1.js 8). */
let own=0;
wrap("runAct",f=>function(a){if(a===S&&guest()){own++;try{return f.apply(this,arguments)}finally{own--}}return f.apply(this,arguments)});
const npcOff=p=>guest()&&!own&&p!==S;
/* PERSON: any of these called for an NPC (from any loop) does nothing on the guest */
const PERSON={stipend:"",illMonthP:"",fireServ:"",npcStudy:undefined,loLose:null,ktGrow:undefined};
for(const n in PERSON)wrap(n,f=>function(p){if(n!=="ktGrow"&&npcOff(p))return PERSON[n];if(n==="ktGrow"&&npcOff(arguments[1]))return;return f.apply(this,arguments)});
/* illness of servants / children / court people, NPC dress: only her own people on the guest */
wrap("fxIllMonth",f=>function(p){if(guest()&&!own&&!mine(p))return;return f.apply(this,arguments)});
wrap("wdNpcDress",f=>function(v){if(npcOff(v))return;return f.apply(this,arguments)});
/* fortune lots: an NPC's lot stays the host's */
wrap("drawLot",f=>function(p){if(npcOff(p))return p.lot||{i:0,lv:0,dom:""};return f.apply(this,arguments)});
/* Thái hậu / Hoàng hậu mood (S.cm, a world key): the host rolls it; the guest keeps only her own spy line and resets her own offence count */
wrap("cmMonth",f=>function(){if(guest()){try{if(!S||S.dead)return;const C=cmSt();C.thDrop=0;C.hhDrop=0;if(eyes(S)>=3)C.spy=wk()}catch(e){}return}return f.apply(this,arguments)});
/* the safety net's snapshots (jcoopworld guestNet) around the outermost endTurn, so every module's week-end work counts as her roll */
wrap("endTurn",f=>function(){const o=own;own=0;/* a week end reached from inside an act is a world loop again */try{if(window.COOPW&&COOPW.netWrap)return COOPW.netWrap(f,this,arguments);return f.apply(this,arguments)}finally{own=o}});
wrap("nextBuoi",f=>function(){const o=own;own=0;try{return f.apply(this,arguments)}finally{own=o}});
/* FEELINGS (review/coop-emo-seat r2): an NPC's feeling is a WORLD fact, computed on the host (owner co-op rule OD:L96, one world).
   The group = every feeling field both seats could write on a world person: p.emo (the seal), p.mk (its causes; jmoodknow mkSync sums them into
   p.emo), p.emoH (cause box, jevb), p.mck (what she knows of the causes). After a merged week both seats must read the same number
   (dev/test/coop-emo-seat.js). Three parts:
   (1) GUARD, the OUTERMOST emoSet wrapper (installed after every module: jmoodknow / jfeel wrap emoSet after this file, and a write the inner
       guard dropped still added a cause to p.mk there: guest vui 41 = the host's 22 + a replayed 19). An NPC feeling is set only on the host
       outside a rebuild, or by HER OWN act on the guest. Never during fromCanon on either seat (affAdd / oanAdd replayed while rows are restored).
   (2) HOST-ONLY in the week merge: the guest's toCanon carries the group of every world person from the room base (COOPW.emoHost, like
       HOST_ONLY), so the server's 3-way merge takes the host's numbers and never mixes her copy into his.
   (3) HER ACT still counts, through one queue: her own act's feeling on a world person is recorded in her blob (S.coopEmo, [{id, who, k, v,
       why, t, ev}]); at the merged week BOTH seats replay the entries the host has not taken yet (C.P.a.S.emoDone) with the same emoSet on the
       same rebuilt world, so the numbers match; the host then marks them taken (S.emoDone) and the guest drops them once she sees the mark. */
const EMO_G=["emo","mk","emoH","mck","__mkAt","__mkL"];/* __mkAt / __mkL: jmoodknow's sync stamp + last read seal, serialized with the person */
const emoR=p=>{let r=p;try{if(typeof emoRes==="function")r=emoRes(p)}catch(e){}return r};
let emoRp=0;
const emoOff=r=>{if(!r||mine(r))return false;const C=window.COOPW;if(C&&C.on&&C.inFC)return true;return guest()&&!own};
function emoRec(r,a){try{const C=window.COOPW;if(!C||!C.on||!guest()||!S)return;const who=typeof emoKey==="function"?emoKey(r):"";if(!who||who==="me"||/^x/.test(who))return;
 const L=S.coopEmo=Array.isArray(S.coopEmo)?S.coopEmo:[];const id=Math.max(Date.now(),L.length?(+L[L.length-1].id||0)+1:0);
 let ev=null;try{ev=typeof MCK==="object"&&MCK&&MCK.ev||null}catch(e){}
 L.push({id,w:typeof wk==="function"?wk():0,who,k:a[1],v:a[2],why:a[3]==null?"":String(a[3]),t:a[4]==null?null:a[4],ev});if(L.length>60)L.splice(0,L.length-60)}catch(e){console.error("emoRec",e)}}
/* (4) one clock: jmoodknow mkSync (sums p.mk into p.emo, ends causes whose khắc ran out) never runs inside a rebuild, where the clock
   is half old / half new (a new week with the old buổi ended live causes early, on one seat only); fromCanon ends with ONE sweep (emoReplay) */
let emoSw=0;
/* review r1 (coop-one-world G4): on the guest a READ of an NPC feeling (emoGet → mkSync) re-summed the causes at her clock and wrote p.emo /
   __mkAt / __mkL into the world during her week. Her world shows the host's numbers until the next merge: on the guest mkSync touches only her
   own people, except inside her own act (her cause on an NPC) and the merge sweep. */
queueMicrotask(()=>wrap("mkSync",f=>function(p){const C=window.COOPW;if(C&&C.on&&!emoSw&&!emoRp){if(C.inFC)return;if(guest()&&!own&&!mine(emoR(p)))return}return f.apply(this,arguments)}));
queueMicrotask(()=>wrap("emoSet",f=>function(p){if(emoRp)return f.apply(this,arguments);const r=emoR(p);if(emoOff(r))return;if(r&&own&&guest()&&!mine(r))emoRec(r,arguments);return f.apply(this,arguments)}));
const CWo=window.COOPW;
if(CWo){
 const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
 const gCopy=(o,b)=>{if(!o||typeof o!=="object")return;for(const f of EMO_G){if(b&&typeof b==="object"&&f in b)o[f]=J(b[f]);else delete o[f]}};
 const kOf=x=>x&&typeof x==="object"?(x.sid!=null?"s"+x.sid:x.id!=null?"i"+x.id:typeof x.name==="string"&&x.name?"n"+x.name:null):null;
 const gList=(A,B)=>{if(!Array.isArray(A))return;const m=new Map((Array.isArray(B)?B:[]).map(x=>[kOf(x),x]));for(const x of A){const k=kOf(x);if(k&&m.has(k))gCopy(x,m.get(k))}};
 /* (2) guest toCanon: R = her canonical NPC list, WS = her canonical world keys; a person not in the base (her new person) keeps hers */
 CWo.emoHost=function(R,WS){const bW=CWo.base&&CWo.base.W;if(!bW||!Array.isArray(R))return;const bm=new Map((bW.R||[]).map(r=>[String(r.id),r]));
  for(const r of R){const b=bm.get(String(r&&r.id));if(!b)continue;gCopy(r,b);gList(r.staff,b.staff);gList(r.kids,b.kids)}
  const bS=bW.S||{};if(WS){for(const k of ["emp","thO"])if(WS[k]&&bS[k])gCopy(WS[k],bS[k]);if(WS.court&&bS.court)for(const c in WS.court)if(bS.court[c])gCopy(WS.court[c],bS.court[c]);
   if(Array.isArray(WS.men))gList(WS.men,bS.men)}};
 /* (3) both seats, inside fromCanon after the world is rebuilt (C = the merged week) */
 CWo.emoReplay=function(C){emoSw++;try{const pb=C&&C.P&&C.P.b,pa=C&&C.P&&C.P.a;const done=+(pa&&pa.S&&pa.S.emoDone)||0;const L=pb&&pb.S&&Array.isArray(pb.S.coopEmo)?pb.S.coopEmo:[];
  const h=CWo.seat==="a";let top=done;
  if(!(!h&&typeof thinW==="function"&&thinW()))/* a C room: the guest's world is the host's lens, his delta brings it */
   for(const e of L){if(!e||!(+e.id>done))continue;top=Math.max(top,+e.id);let p=null;try{p=emoByKey(String(e.who))}catch(x){}if(!p)continue;
    let o=null;try{if(typeof MCK==="object"&&MCK){o=MCK.ev;MCK.ev=e.ev||null}}catch(x){}emoRp++;
    try{emoSet(p,e.k,e.v,e.why,e.t)}catch(x){console.error("emoReplay",x)}finally{emoRp--;try{if(typeof MCK==="object"&&MCK)MCK.ev=o}catch(x){}}}
  else for(const e of L)if(e&&+e.id>done)top=Math.max(top,+e.id);
  if(h){if(top>done)S.emoDone=top;else if(done)S.emoDone=done}
  else if(Array.isArray(S.coopEmo))S.coopEmo=S.coopEmo.filter(e=>e&&+e.id>done);
  /* one clock for the seal: every world person's causes summed at the rebuilt week's khắc, the same on both seats */
  if(typeof mkAll==="function"&&typeof mkSync==="function")for(const p of mkAll())try{mkSync(p)}catch(x){}}catch(e){console.error("emoReplay",e)}finally{emoSw--}};
}
window.COOP_ONE={ownAct:()=>own,MUTE,ONLY_ME,PERSON:Object.keys(PERSON).concat(["drawLot","cmMonth","fxIllMonth","wdNpcDress","emoSet"])};
})();
