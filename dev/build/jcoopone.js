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
/* FEELINGS (review/coop-emo-seat): an NPC's feeling p.emo (jemo emoSet: every emoEv, the affAdd/oanAdd wraps, jevb, jshelf …) is a world fact,
   written on the host only. Two leaks made one NPC read another feeling on each seat after the same merged week (dev/test/coop-emo-seat.js):
   (1) the guest's world loops (week end, buổi) set NPC feelings of their own; (2) rebuilding the merged world (fromCanon: affAdd/oanAdd replayed
   while the rows are restored) set new feelings on EITHER seat after the merge. Now an NPC feeling is set only on the host outside a rebuild, or
   by HER OWN act on the guest (that one reaches the host in the merged week, like every NPC row her act changes). Her own people: unchanged. */
const emoOff=p=>{let r=p;try{if(typeof emoRes==="function")r=emoRes(p)}catch(e){}if(!r||mine(r))return false;
 const C=window.COOPW;if(C&&C.on&&C.inFC)return true;return guest()&&!own};
wrap("emoSet",f=>function(p){if(emoOff(p))return;return f.apply(this,arguments)});
window.COOP_ONE={ownAct:()=>own,MUTE,ONLY_ME,PERSON:Object.keys(PERSON).concat(["drawLot","cmMonth","fxIllMonth","wdNpcDress","emoSet"])};
})();
