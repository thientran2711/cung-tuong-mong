/* ================= jroad: FULL ORIGIN ROADS, chapters 4–11 (owner OD:L1223/L1226/L1242; map dev/story/ROAD_MAP.md §3–§4) =================
   A road = one of the origin's four j67 premises grown into 8 chapters. Chapter .4 IS the premise arc ARC67[road] (unchanged); chapters
   .5–.11 are registered here as j67 arcs ARC67["<road>_<n>"] with o:"rd" (outside every pool: arcIds67 never deals them), so the j67
   engine (hồi, odds, Lợi thế, rewards, Sổ ghi, chapter detail §72) runs them unchanged.
   A NEW 14-chapter life (jst14) whose rolled road has all of .5–.11 registered gets Phần giữa = [the road .4, .5 … .11] instead of the
   phase-1 filler (other premises + shared arcs + Gây dựng thế lực); a road not complete yet keeps the phase-1 frame, so roads ship one
   by one. Older saves never change (their plan was written when they started).
   Continuity (ROAD_MAP §5): the people of a road (A.act: rival, enemy, mistress …) are cast ONCE and carried from chapter to chapter
   (S.st.f14.act); a person who died or left is recast and the chapter's cast() decides if that is allowed. The ending of each chapter is kept
   (S.st.f14.re) so the next chapter opens on the hồi that follows from it (beat if:()=>rdPrev(...)). Chapter .11 is the road's finale and
   closes the origin story (replaces the j67 «Kết cục xuất thân» milestone for this life).
   ONE CORE (OD:L1267): chapter-level numbers live in BAL.road (jbal2.js). Kit only: every screen is the j67 card / kit event frame. */
const ROAD14={};
/* shared helpers for every road data file (jrd_<origin>.js): hostile/friendly roles are REAL both ways (OD:L1247) */
const rdRel=(A,k,n)=>{const v=rv67(A,k);if(v)relAdd(S,v,n);return v};
const rdOan=(A,k,n)=>{const v=rv67(A,k);if(v)oanAdd(v,S,n);return v};
const RDW=k=>()=>rdK()>0===(k>0)&&(k>0||rdK()<=0);/* opening filter: RDW(1) after a won chapter, RDW(0) after a middle or lost one */

/* register one chapter: n = 5..11 */
function rdDef(road,n,def){const id=road+"_"+n;ARC67[id]=Object.assign({o:"rd",road,rn:n},def);(ROAD14[road]=ROAD14[road]||{})[n]=id;
 try{if(typeof RTHEME67==="object"&&!RTHEME67[id])RTHEME67[id]=def.rth||RTHEME67[road]||"court"}catch(e){}return id}
function rdFull(road){const R=ROAD14[road];if(!R)return false;for(let n=BAL.road.first;n<=BAL.road.last;n++)if(!R[n])return false;return true}
function rdOn(){try{return !!(f14()&&S.st.f14.rd)}catch(e){return false}}
/* the ending key of the latest chapter of this road ("win" / "mid" / "lose" / …), "" before .5 */
function rdPrev(){try{const r=S.st.f14.re;return r?r.end:""}catch(e){return""}}
/* the ending key of a given chapter of this road (n = 4..11) */
function rdEnd(n){try{return (S.st.f14.ends||{})[n]||""}catch(e){return""}}
/* cast keeper: reuse the road's people; recast only the ones gone (castRv67 picks a new live consort; f = filter) */
function rdCast(A,keys,f){const K=S.st&&S.st.f14&&S.st.f14.act||{};for(const k of keys){const id=K[k];let old=null;
  if(id!=null){A.act[k]=id;if(rv67(A,k))continue;delete A.act[k];try{old=RV(id)}catch(e){}}
  if(!castRv67(A,k,f&&f[k]))return false;
  if(old)try{const nv=rv67(A,k);if(nv){const L=`${old.name} ${old.alive?"đã rời cung":"nay đã khuất"}, kẻ nối tay là ${nv.name}.`;(A.rc=A.rc||[]).push(L);log(`<i>${L}</i>`)}}catch(e){}}
 return true}
/* a recast person is told to the player (ROAD_MAP §5.2, review road-map-r1 item 4): the line above goes to the log when the chapter opens
   and heads the chapter's first hồi card ("… nay đã khuất, kẻ nối tay là …") */
(function(){const p0=PEND.j67;if(!p0)return;PEND.j67=function(p){const r=p0.apply(this,arguments);try{const A=r&&th67(p.t);
  if(A&&A.rc&&A.rc.length&&!A.i&&typeof r.t==="string"){const i=r.t.indexOf("<br>");if(i>=0)r.t=r.t.slice(0,i+4)+`<i>${A.rc.join(" ")}</i><br>`+r.t.slice(i+4)}}catch(e){console.error(e)}return r}})();
/* a new life: Phần giữa = the full road when it exists */
(function(){if(typeof a67init!=="function")return;const i0=a67init;a67init=function(k){const r=i0.apply(this,arguments);
 try{if(!f14())return r;const c=S.st.ch,rd=S.st.f14.road;if(!rd||!rdFull(rd))return r;
  const P=c.plan,a=P.indexOf("o"),b=P.indexOf("st:st_the");if(a<0||b<a||c.i>=a)return r;
  const mid=["o"];for(let n=BAL.road.first;n<=BAL.road.last;n++)mid.push("st:"+ROAD14[rd][n]);
  P.splice(a,b-a+1,...mid);S.st.f14.rd=rd;S.st.f14.act={};S.st.f14.ends={}}catch(e){console.error(e)}return r}})();
/* carry the road's people into the next chapter */
(function(){const n0=newThread67;newThread67=function(id,kind){const a=ARC67[id];
 if(rdOn()&&a&&(a.o==="rd"||id===S.st.f14.rd)&&a.road!==undefined&&!a.cast){const A=n0.apply(this,arguments);if(A)Object.assign(A.act,S.st.f14.act);return A}
 const A=n0.apply(this,arguments);
 /* story names of the .4 arc ({n1}/{n2}, e.g. thd_tho's student) carried across the road (B3 request) */
 try{if(A&&rdOn()&&a&&a.o==="rd"&&a.road===S.st.f14.rd){const f=S.st.f14;if(!A.n1&&f.n1)A.n1=f.n1;if(!A.n2&&f.n2)A.n2=f.n2}}catch(e){console.error(e)}
 return A}})();
/* keep the ending + the cast; chapter .11 closes the origin story */
(function(){const e0=chEnd67;chEnd67=function(A,E,ign){try{if(rdOn()){const a=ARC67[A.a],rd=S.st.f14.rd;
  if(a&&(A.a===rd||a.road===rd)){const n=a.rn||BAL.road.first-1;S.st.f14.re={n,end:A.end,k:E.k};S.st.f14.ends[n]=A.end;Object.assign(S.st.f14.act,A.act||{});if(A.n1)S.st.f14.n1=A.n1;if(A.n2)S.st.f14.n2=A.n2;
   if(n===BAL.road.last)rdFinale(A,E)}}}catch(e){console.error(e)}
 return e0.apply(this,arguments)}})();
/* the road's finale = the origin's ending of this life (j67 chFinale67 is not run for a full road: its last chapter tells it) */
function rdFinale(A,E,fb){const c=S.st.ch,rd=S.st.f14.rd,Q0=QUEST67[c.k]||QUEST67.tt;c.done=1;c.fin=A.tag;S.st.tag=A.tag;
 const T=BAL.road.finTier,t=E.k>0?T.win:E.k<0?T.lose:T.mid;const R=reward67("family",t);
 const L=Object.keys(S.st.f14.ends).map(Number).sort((x,y)=>x-y).map(n=>{const id=n===BAL.road.first-1?rd:ROAD14[rd][n];const p=c.past.find(x=>x.a===id);return p?`Chương ${p.n}: ${ARC67[id].t} · <span class="${p.k>0?"g":p.k<0?"r":""}">${p.tag}</span>`:""}).filter(Boolean);
 if(!fb)L.push(`Chương ${c.n}: ${ARC67[A.a].t} · <span class="${E.k>0?"g":E.k<0?"r":""}">${A.tag}</span>`);
 log(`<b class="${E.k>0?"g":E.k<0?"r":""}">Kết cục xuất thân «${Q0.t}»: ${A.tag}.</b>${R?` Phần thưởng: ${IT[R.k].n}.`:""}`);
 card67("result",`Kết cục xuất thân: ${Q0.t}`,[["Tuyến",ARC67[rd].t],["Kết cục",A.tag,E.k>0?"g":E.k<0?"r":""],["Các chương",L.join("<br>")],R&&R.row,["Về sau","Mệnh truyện còn tiếp: con cái, ngôi Trung cung"]],pMe())}
window.rdPrev=rdPrev;window.rdEnd=rdEnd;window.rdFull=rdFull;
/* the sign of the latest chapter's ending of this road (1 won, 0 middle, −1 lost); opening hồi pick on it */
function rdK(){try{const r=S.st.f14.re;return r?r.k:0}catch(e){return 0}}
window.rdK=rdK;
/* rare endings of road finales (j97 loads after the road files): RD97L entries take the j97 catalogue shape (R97L) */
window.RD97L=window.RD97L||[];
setTimeout(()=>{try{if(window.RARE97)for(const d of RD97L)if(!RARE97.defs[d.a])RARE97.defs[d.a]=d}catch(e){console.error(e)}},0);
/* Thanh mai trúc mã (j96 tm96a/b/c) in a full-road life: the 14 numbered chapters are the tutorial, the road and the endgame, so the three
   love chapters run as a SIDE story (phụ tuyến, j67 S.st.X thread, kind "tm": no reward pool, no random shared arcs reopened), opened one at
   a time once the main story reaches chapter BAL.road.tm[i] (ROAD_MAP §2 side line, §8.1). Lives without a full road keep j96's splice. */
(function(){const a0=chAdvance67;chAdvance67=function(E){try{if(rdOn()){const c=S.st.ch,P=c.plan,q=S.st.f14.tmq||(S.st.f14.tmq=[]);
  for(let i=P.length-1;i>c.i;i--)if(/^st:tm96[abc]$/.test(P[i])){q.unshift(P[i].slice(3));P.splice(i,1)}q.sort()}}catch(e){console.error(e)}
 return a0.apply(this,arguments)}})();
(function(){if(typeof a67Month!=="function")return;const m0=a67Month;a67Month=function(){try{if(rdOn()&&!S.dead){const f=S.st.f14,q=f.tmq||[];
  const X=S.st.X||(S.st.X=[]);const busy=X.some(t=>!t.done&&ARC67[t.a]&&ARC67[t.a].o==="tm");const i=BAL.road.tm.length-q.length;
  if(q.length&&!busy&&S.st.ch.n>=BAL.road.tm[Math.min(i,BAL.road.tm.length-1)]){const id=q[0];if(ARC67[id]&&arcOk67(ARC67[id])){const A=newThread67(id,"tm");
    if(A){q.shift();A.due=S.turn+1;pickNext67(A);X.push(A)}}else q.shift()}}}catch(e){console.error(e)}
 return m0.apply(this,arguments)}})();
/* origins whose STORY slot is created after j67 loads (jorigins.js STORY.bd, Bắc Địch branch of hòa thân) get the same chapter frame:
   without it a bd life never runs a67init (no 14-chapter frame, no road). Runs once every script has loaded (B2 finding). */
setTimeout(()=>{try{if(typeof wrap67==="function")Object.keys(STORY).forEach(wrap67)}catch(e){console.error(e)}},0);
/* the road's .11 could not run (its cast is gone and jst14 put a shared arc in its slot, or the road was cut short): once the main story has
   passed chapter BAL.road.last, the origin ending is still told — from the last road chapter that ran (its ending and sign → finTier), so every
   full-road life gets its «Kết cục xuất thân» (B3 finding, every origin) */
(function(){const a0=chAdvance67;chAdvance67=function(E){const r=a0.apply(this,arguments);try{if(rdOn()){const c=S.st.ch,f=S.st.f14,rd=f.rd;
  if(c&&!c.fin&&c.n>BAL.road.last&&f.re){const n=f.re.n,id=n===BAL.road.first-1?rd:ROAD14[rd][n],p=c.past.slice().reverse().find(x=>x.a===id);
   if(p)rdFinale({a:id,tag:p.tag},{k:p.k},1)}}}catch(e){console.error(e)}return r}})();
