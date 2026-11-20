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
function walkNpcOn(){try{return BAL.walk.npc!==0}catch(e){return false}}
const JWALK={stat:{fix:0,late:0,miss:0},errs:[]};
function walkKeepRow(x){if(!x)return true;try{if(typeof j95sKeep==="function"&&j95sKeep(x))return true}catch(e){}const a=x[1]||"";return /^ag_/.test(a)}
function walkNpcPass(R,kh){if(!walkNpcOn()||!R||!R.P)return 0;let n=0;const K=(typeof J95!=="undefined"&&J95.KH)||4,OUT=typeof J95OUT_!=="undefined"?J95OUT_:"__out";
 const real=k=>k&&k!==OUT&&typeof k==="string";
 for(const id in R.P){if(id==="me"||/^mm:me$/.test(id))continue;const row=R.P[id];if(!Array.isArray(row)||row.length<K)continue;
  for(let j=Math.max(1,kh+1);j<K;j++){const x=row[j];if(!x||!real(x[0])||x[1]==="go")continue;if(x[1]==="follow"&&x[2]==="me")continue;
   let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&row[q][1]==="go"){g++;q--}if(q<0||!row[q]||!real(row[q][0])||row[q][0]===x[0])continue;
   let t=0;try{t=travel(row[q][0],x[0],walkWho(id))}catch(e){t=0}let need=t-1-g;if(need<=0)continue;
   /* leave earlier: the free khắc right before the walk (never the current khắc, never a kept row) */
   while(need>0&&q>kh&&!walkKeepRow(row[q])){row[q]=[x[0],"go",null,x[3]&&!/^\s*$/.test(x[3])?x[3]:"đang trên đường"];need--;n++;JWALK.stat.fix++;q--}
   /* else arrive later: the arrival khắc (and on) become «on the way», when free */
   let a=j;while(need>0&&a<K&&!walkKeepRow(row[a])&&row[a][0]===x[0]){row[a]=[x[0],"go",null,"đang trên đường"];need--;n++;JWALK.stat.late++;a++}
   if(need>0)JWALK.stat.miss++;}}
 return n}
(function(){if(typeof j95fixHouse!=="function")return;const f0=j95fixHouse;j95fixHouse=function(R,kh){let n=f0.apply(this,arguments)||0;
 try{n+=walkNpcPass(R,R&&R.kh==null?0:kh)}catch(e){if(JWALK.errs.length<20)JWALK.errs.push(e&&e.message||String(e))}return n}})();
