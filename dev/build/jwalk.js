/* ================= jwalk — WALK COST, ONE RULE FOR EVERYONE (review/walk-cost, ORDER MAIN ROOT-76 20/11; owner OD 19/11 ~22:00Z
   «tôi đang ở Ngự Hoa Viên khắc ba nè, tôi bấm về nhà là tốn một khắc, tức là khắc thứ tư là tôi đã ở nhà rồi»; law 1 two-way, law 4 one core).
   Her: j2 goTo("home") / j42 srvGoTo home pay travel(place,home) like every other walk (j9 travel, BAL.walk.near / far), spill included (j9).
   NPCs (this file): a person in the record (j95 R.P rows, one per khắc) who changes place walks the same road: a walk of t khắc (travel) needs
   t − 1 khắc «on the way» rows before she stands at the new place — the jagday convention [dest,"go",…] (j95s prints «đang đi đến …»).
   The pass runs last in the j95fixHouse chain (every khắc, rows from the current khắc on); it leaves earlier when the khắc before is free,
   otherwise arrives later; kept rows (deeds, meetings, forced lists: j95sKeep) and the current khắc are never rewritten.
   BAL.walk.npc = 0 turns the NPC part off (tests / rollback). */
/* the walker of a record row (her penalty never lengthens an NPC's road; theirs does — law 1) */
function walkWho(id){try{const c=String(id)[0];if(c==="v")return (typeof RV==="function"&&RV(+String(id).slice(1)))||null;if(c==="s"&&typeof j95sv==="function")return j95sv(id)||null}catch(e){}return null}
/* ERRAND LEDGER ROADS (review/jagday-walk r1, owner OD 18/11 ~20:00Z: an errand's n khắc INCLUDE the walk; ~20:05Z: seen walking off and back):
   inside the away window [t0, due) of a person sent on an errand, the first travel(from, place)−1 khắc are her road there and the last
   travel(place, from)−1 khắc her road back («go» rows with a why = busy, j95sKeep); the khắc between stay "errand" at the place. due and the
   cost never change: when n is shorter than both roads the window is split by the roads (no khắc added). from = where she stood before t0
   (kept on the task: a.wfr). Walker = the person sent (j9 travel per walker). BAL.walk.npc = 0 → the old rows. */
function walkErrRow(e,b0,a,i,place,x){if(!walkNpcOn()||!a||!x||!place)return x;try{const OUT=typeof J95OUT_!=="undefined"?J95OUT_:"__out";const real=k=>!!k&&typeof k==="string"&&k!==OUT&&k!=="ngoai";
  if(a.wfr==null){const q=a.t0-b0-1;const y=q>=0&&q<e.length?e[q]:null;a.wfr=y&&real(y[0])?y[0]:""}
  const fr=a.wfr;if(!real(place))return x;const D=a.due-b0,y=D>=0&&D<e.length?e[D]:null;const bk=y&&real(y[0])&&y[1]!=="errand"?y[0]:fr;/* back = where her day goes on at due (this buổi), else where she came from */
  const w=walkWho(a.who),n=Math.max(0,a.due-a.t0);let tO=0,tB=0;try{if(real(fr)&&fr!==place)tO=travel(fr,place,w);if(real(bk)&&bk!==place)tB=travel(place,bk,w)}catch(z){}if(!tO&&!tB)return x;const gO=Math.min(Math.max(0,tO-1),n),gB=Math.min(Math.max(0,tB-1),n-gO);
  const K=b0+i,why=x[3]||"đi việc";if(K-a.t0<gO)return[place,"go",x[2],why+" · đang trên đường"];if(K>=a.due-gB)return[bk,"go",x[2],why+" · đang trên đường về"];return x}catch(z){return x}}
/* MEETING ROADS (final gate of review/jagday-walk, law 11 whole group): a secret meeting / tryst (j95secApply) is written straight into the
   record at its khắc; jwalk never rewrites that kept row and never the khắc 0 of a fresh record, so she was at the meeting spot with no road.
   The khắc right before it become her road (same rule as walkNpcPass «leave earlier»: free, not kept, not yet shown), travel per walker. */
function walkLeadIn(R,id,i0,place,why,tgt){if(!walkNpcOn()||!R||!R.P||!(i0>0))return 0;const row=R.P[id];if(!Array.isArray(row))return 0;const OUT=typeof J95OUT_!=="undefined"?J95OUT_:"__out";
 const real=k=>!!k&&typeof k==="string"&&k!==OUT&&k!=="ngoai";if(!real(place))return 0;let q=i0-1,g=0;while(q>=0&&row[q]&&row[q][0]===place&&row[q][1]==="go"){g++;q--}
 if(q<0||!row[q]||!real(row[q][0])||row[q][0]===place)return 0;let t=0;try{t=travel(row[q][0],place,walkWho(id))}catch(e){t=0}let need=t-1-g,n=0;
 let k0=-1;try{if(JWALK.seen&&JWALK.seen.key===R.key&&typeof j95kh==="function")k0=j95kh()}catch(e){}/* a record already shown: never the khắc now or before */
 /* round 4: a record not shown yet (k0 −1: the meeting is applied as the buổi's record is drawn) is all plan — only a deed / meeting / binding
    (agWalkHeld) holds a khắc there, a planned «go» row of her day yields to the meeting's road */
 const kp=q=>k0<0&&typeof agWalkHeld==="function"?agWalkHeld(R,id,q):walkKeepRow(row[q],id,q,R);
 while(need>0&&q>k0&&q>=0&&(!kp(q)||/^ag_/.test(row[q][1]||"")&&typeof agWalkCut==="function"&&agWalkCut(R,id,q)&&!kp(q))){row[q]=[place,"go",tgt==null?null:tgt,walkRoadWhy(why)];need--;n++;JWALK.stat.lead=(JWALK.stat.lead||0)+1;q--}
 if(need>0)JWALK.stat.miss++;return n}
function walkNpcOn(){try{return BAL.walk.npc!==0}catch(e){return false}}
const JWALK={stat:{fix:0,late:0,miss:0,now:0},errs:[],seen:null};
/* review/jagday-walk r2: a row turned into «on the way» keeps its own why and target (a guest's leave reason, whom a follower follows) */
/* round 4: a road row (jwalk / walkLeadIn / walkErrRow: «go» + the «đang trên đường» why) — a repaint of placeholder «go» rows never takes it */
function walkIsRoad(x){return !!x&&x[1]==="go"&&/đang trên đường/.test(x[3]||"")}
function walkRoadWhy(w,pre){const s=w&&!/^\s*$/.test(w)?String(w):(pre||"");if(/đang trên đường/.test(s))return s;return s?s+" · đang trên đường":"đang trên đường"}
/* r2 (final gate): a jptime task skips only the khắc INSIDE its away window [t0, due) — once due has come her day's next move walks like any other
   (the task stays open until it settles, so ptAwayOf alone also held the khắc after due: a servant sent on to her own errand jumped there) */
function walkTimed(id,x,kh){if(x&&(x[1]==="visit"||x[1]==="back"))return true;try{const a=typeof ptAwayOf==="function"?ptAwayOf(id):null;if(!a)return false;if(kh==null||typeof bid!=="function"||typeof ptKH!=="function")return true;const K=bid()*ptKH()+kh;return K>=a.t0&&K<a.due}catch(e){return false}}
const walkSig=x=>x?x[0]+"|"+x[1]+"|"+(x[2]||""):"";
function walkKeepRow(x,id,q,R){if(!x)return true;const a=x[1]||"";
 /* review/jagday-walk: an «ag_» row is kept only while a deed / binding really holds it (jagday agWalkHeld); the day plan's label alone is free */
 if(/^ag_/.test(a)&&R&&id!=null&&typeof agWalkHeld==="function"){try{return agWalkHeld(R,id,q)}catch(e){return true}}
 try{if(typeof j95sKeep==="function"&&j95sKeep(x))return true}catch(e){}if(/^ag_/.test(a))return true;
 /* a card-bound row (J95B: a card said she was there, review/jagday-walk) is never rewritten either */try{if(R&&id!=null&&typeof agBound==="function"&&agBound(id,q,R.key))return true}catch(e){}return false}
function walkNpcPass(R,kh,fresh,first){if(!walkNpcOn()||!R||!R.P)return 0;let n=0;const K=(typeof J95!=="undefined"&&J95.KH)||4,OUT=typeof J95OUT_!=="undefined"?J95OUT_:"__out";
 const real=k=>k&&k!==OUT&&typeof k==="string";
 /* review/jagday-walk: a move decided IN the khắc now (a servant sent on an errand, joining her mistress's outing: the j95s day writes the
    current khắc) starts its walk now — the row of the khắc now is new since the last pass (JWALK.seen) and becomes «on the way» like a later
    arrival; a row the record already showed at this khắc is never rewritten. */
 const SN=JWALK.seen&&JWALK.seen.key===R.key&&JWALK.seen.kh<=kh?JWALK.seen.P:null;
 for(const id in R.P){if(id==="me"||/^mm:me$/.test(id))continue;const row=R.P[id];if(!Array.isArray(row)||row.length<K)continue;
  /* r2: never a row the timed ledger wrote — an invite guest arriving («visit») / leaving («back»), a person on a jptime task: their khắc
     already hold the walk (the task's due = after the road, jptime) */
  const now=kh>=1&&kh<K&&(fresh||SN&&SN[id]&&SN[id][kh]!==walkSig(row[kh]))&&!walkTimed(id,row[kh],kh);/* round 4: the first pass of a khắc (fresh) — the khắc now is not shown yet */
  const lo=now&&fresh?kh-1:first?-1:kh;/* round 4: the record's very first pass (nothing shown yet) may make khắc 0 her road too (a meeting / deed at khắc 1) *//* round 4: fresh → she may leave in the khắc now (agWalkGuard counts it as road the same way) */
  for(let j=Math.max(1,now?kh:kh+1);j<K;j++){const x=row[j];if(!x||!real(x[0])||x[1]==="go")continue;if(x[1]==="follow"&&x[2]==="me")continue;
   let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&row[q][1]==="go"){g++;q--}if(q<0||!row[q]||!real(row[q][0])||row[q][0]===x[0])continue;
   let t=0;try{t=travel(row[q][0],x[0],walkWho(id))}catch(e){t=0}let need=t-1-g;if(need<=0)continue;
   /* leave earlier: the free khắc right before the walk (never the current khắc, never a kept row) */
   while(need>0&&q>lo&&!walkKeepRow(row[q],id,q,R)){row[q]=[x[0],"go",x[2]==null?null:x[2],walkRoadWhy(x[3])];need--;n++;JWALK.stat.fix++;q--}
   /* else arrive later: the arrival khắc (and on) become «on the way», when free */
   let a=j;while(need>0&&a<K&&!walkKeepRow(row[a],id,a,R)&&row[a][0]===x[0]){const y=row[a];row[a]=[x[0],"go",y[2]==null?null:y[2],walkRoadWhy(y[3],y[1]==="follow"?"đi theo hầu":"")];need--;n++;JWALK.stat[a===kh?"now":"late"]++;a++}/* a follower keeps whom she follows (j95s retinue) */
   if(need>0)JWALK.stat.miss++;}}
 {const P={};for(const id in R.P){const row=R.P[id];if(Array.isArray(row))P[id]=row.map(walkSig)}JWALK.seen={key:R.key,kh,P}}
 return n}
(function(){if(typeof j95fixHouse!=="function")return;const f0=j95fixHouse;j95fixHouse=function(R,kh){const k0=R&&R.kh==null?0:kh,fresh=!!R&&(R.kh==null||R.kh<kh),first=!!R&&R.kh==null;let n=f0.apply(this,arguments)||0;
 /* round 4 (review/jagday-walk-rv): the deed-road guard runs here, after every row writer of the chain (j95sPass retinue / j95sGuard), then the road pass */
 try{if(typeof agWalkGuard==="function")n+=agWalkGuard(R,k0,fresh)||0}catch(e){if(JWALK.errs.length<20)JWALK.errs.push("guard: "+(e&&e.message||String(e)))}
 try{n+=walkNpcPass(R,k0,fresh,first)}catch(e){if(JWALK.errs.length<20)JWALK.errs.push(e&&e.message||String(e))}return n}})();
