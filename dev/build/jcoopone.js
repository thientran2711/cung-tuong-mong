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
   NPC affairs with palace men (affairMonth): on the guest the people lists (liveRivals / consorts / emoPeople) hold only her while it runs
   (the rivals array itself is untouched, so the queen, RV(id) and refs still resolve). */
const ONLY_ME=["v85Month","petWeek","petMonth","loMonth","emoMonth","affairMonth","facMonth","servMonth","queenRewards","maidLoveMonth","ktMonth","fxServMonth"];
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
/* PERSON: any of these called for an NPC (from any loop) does nothing on the guest */
const PERSON={stipend:"",illMonthP:"",fireServ:"",npcStudy:undefined,loLose:null,ktGrow:undefined};
for(const n in PERSON)wrap(n,f=>function(p){if(guest()&&p!==S&&n!=="ktGrow")return PERSON[n];if(guest()&&n==="ktGrow"&&arguments[1]!==S)return;return f.apply(this,arguments)});
/* illness of servants / children / court people, NPC dress: only her own people on the guest */
wrap("fxIllMonth",f=>function(p){if(guest()&&!mine(p))return;return f.apply(this,arguments)});
wrap("wdNpcDress",f=>function(v){if(guest()&&v!==S)return;return f.apply(this,arguments)});
/* fortune lots: an NPC's lot stays the host's */
wrap("drawLot",f=>function(p){if(guest()&&p!==S)return p.lot||{i:0,lv:0,dom:""};return f.apply(this,arguments)});
/* Thái hậu / Hoàng hậu mood (S.cm, a world key): the host rolls it; the guest keeps only her own spy line and resets her own offence count */
wrap("cmMonth",f=>function(){if(guest()){try{if(!S||S.dead)return;const C=cmSt();C.thDrop=0;C.hhDrop=0;if((S.mat||0)>=3)C.spy=wk()}catch(e){}return}return f.apply(this,arguments)});
/* the safety net's snapshots (jcoopworld guestNet) around the outermost endTurn, so every module's week-end work counts as her roll */
wrap("endTurn",f=>function(){if(window.COOPW&&COOPW.netWrap)return COOPW.netWrap(f,this,arguments);return f.apply(this,arguments)});
window.COOP_ONE={MUTE,ONLY_ME,PERSON:Object.keys(PERSON).concat(["drawLot","cmMonth","fxIllMonth","wdNpcDress"])};
})();
