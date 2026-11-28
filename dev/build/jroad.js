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
   closes the origin story (replaces the j67 «Khép nẻo đời» milestone for this life).
   ONE CORE (OD:L1267): chapter-level numbers live in BAL.road (jbal2.js). Kit only: every screen is the j67 card / kit event frame. */
const ROAD14={};
/* shared helpers for every road data file (jrd_<origin>.js): hostile/friendly roles are REAL both ways (OD:L1247) */
const rdRel=(A,k,n)=>{const v=rv67(A,k);if(v)relAdd(S,v,n);return v};
const rdOan=(A,k,n)=>{const v=rv67(A,k);if(v)oanAdd(v,S,n);return v};
/* road-long flag (a choice in one chapter read by a later chapter of the same road): S.st.f14.fb, cleared with the road (same store as jrd_cn CN_FL / jrd_muoi MUOI_FL on B1/B3); key "<road>.<flag>" */
const RDW=k=>()=>rdK()>0===(k>0)&&(k>0||rdK()<=0);/* opening filter: RDW(1) after a won chapter, RDW(0) after a middle or lost one */

/* ONE CORE (OD:L1267, review/road-onecore): a chapter's numbers live in BAL.road.fx[id] (jbalroad.js); rdDef puts them back on the
   options (c / w / l / o) and endings (fx) when the chapter is registered, so the j67 engine reads the same shape as before.
   rdOdds adds the odds terms left to right (same order as the old inline arrow → bit-identical); RDQ = named road predicates / counts
   that an odds term may read (set by the data file, e.g. RDQ.cnchuGap); rdFb = the road flag book S.st.f14.fb (CN_FL / MUOI_FL). */
const RDQ={};
const rdFb=(k,v)=>{try{const F=S.st.f14.fb=S.st.f14.fb||{};if(v!=null)F[k]=v;return F[k]||0}catch(e){return 0}};
const RD_FL=rdFb;/* B2 road-long flag (review/road-b2-fix): same book as CN_FL / MUOI_FL */
const rdIn=(c,f)=>Array.isArray(c)?c.some(f):f(c);
function rdOdds(q,A){let x=q[0];for(let i=1;i<q.length;i++){const t=q[i],k=t[0],neg=k[0]==="-",K=neg?k.slice(1):k;let v;
  if(K==="d")v=S[t[1]]/t[2];else if(K==="m")v=S[t[1]]*t[2];else if(K==="dz")v=(S[t[1]]||0)/t[2];else if(K==="mz")v=(S[t[1]]||0)*t[2];else if(K==="a")v=S.arts[t[1]]*t[2];else if(K==="k")v=RDQ[t[1]](A)*t[2];else if(K==="kd")v=RDQ[t[1]](A)/t[2];
  else if(K==="f")v=t[1].split("|").some(g=>A.f[g])?t[2]:t[3];else if(K==="e")v=rdIn(t[1],c=>rdEnd(c)===t[2])?t[3]:t[4];
  else if(K==="b")v=rdFb(t[1])?t[2]:t[3];else if(K==="q")v=RDQ[t[1]](A)?t[2]:t[3];else throw Error("rdOdds term "+k);
  x=neg?x-v:x+v}return x}
/* review/one-core-roads: an option's Lợi thế sc and the typed amounts of its go: closure (g, read by the closure as its last parameter G,
   in call order) and an ending's {fx, k (tier −1/0/1), sc, g} come from BAL.road.fx too (dev/measure/road-onecore-g-move.js) */
function rdFx(id,def){const F=BAL.road.fx&&BAL.road.fx[id];if(!F)return;
 for(const bk in F){if(bk==="E"){for(const ek in F.E){const e=F.E[ek],d=def.E&&def.E[ek];if(!d)continue;
    if(e.fx)d.fx=e.fx;for(const k of ["k","sc"])if(e[k]!=null)d[k]=e[k];if(e.g&&d.go){const f=d.go,G=e.g;d.go=A=>f(A,G)}}continue}
  const O=def.B&&def.B[bk]&&def.B[bk].o;if(!Array.isArray(O))continue;
  F[bk].forEach((x,i)=>{const o=O[i];if(!x||!o)return;for(const k of ["c","w","l"])if(x[k])o[k]=x[k];if(x.sc!=null)o.sc=x.sc;if(x.o){const q=x.o;o.o=A=>rdOdds(q,A)}
   if(x.g&&o.go){const f=o.go,G=x.g;o.go=(A,ok)=>f(A,ok,G)}
   if(x.oa&&o.alt&&!o.alt.on)rdAlt(o,x.o||[100],x.oa)})}}
/* E-TIER-B13 batch 3 (law 2 same-result merge, owner 27/11 ~01:00Z/~01:03Z): a way folded into its sibling leaves its text on the kept way
   (alt {n, rt, rf}) and its odds in the BAL row (oa). One tap: the odds are her best fit of the two methods, and the result names the method
   that was used («<alt.n>. <its rt/rf>») when the folded one fit her better. */
function rdAlt(o,q,qa){const al=o.alt,r0=o.rt,f0=o.rf;al.on=1;const bt=A=>rdOdds(qa,A)>rdOdds(q,A);
 const say=(t,A)=>{const s=typeof t==="function"?t(A):t||"";if(typeof arcReveal67==="function")arcReveal67(s,A);return s};
 o.o=A=>Math.max(rdOdds(q,A),rdOdds(qa,A));
 o.rt=A=>bt(A)?al.n+". "+say(al.rt,A):say(r0,A);o.rf=A=>bt(A)?al.n+". "+say(al.rf||f0,A):say(f0,A)}
/* the rare finale choice of a road (RD97L): its numbers live in BAL.road.rare[a] (p, np, sc, c, fx, g = its go amounts read as G; bar = the floor its x condition reads
   and its x text prints through RR(a).bar) */
const RR=a=>BAL.road.rare[a];
function rdRare(d){const R=RR(d.a);if(R){for(const k of ["p","np","sc","c","fx"])if(R[k]!=null)d[k]=R[k];if(R.g&&d.go){const f=d.go,G=R.g;d.go=A=>f(A,G)}}return d}
/* register one chapter: n = 5..11 */
function rdDef(road,n,def){const id=road+"_"+n;rdFx(id,def);ARC67[id]=Object.assign({o:"rd",road,rn:n},def);(ROAD14[road]=ROAD14[road]||{})[n]=id;
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
  /* f.keep = identity-bound roles (fix B CN_NORECAST): cast once when the road first needs them (the .4 may not have cast them), never recast */
  if(f&&(f.keep||[]).includes(k)){if(old)return false;if(!castRv67(A,k))return false;continue}
  if(!castRv67(A,k,f&&f[k]))return false;
  if(old)try{const nv=rv67(A,k);if(nv){const L=`${old.name} ${old.alive?"đã rời cung":"nay đã khuất"}, kẻ nối tay là ${nv.name}.`;(A.rc=A.rc||[]).push(L);log(`<i>${L}</i>`)}}catch(e){}}
 return true}
/* a recast person is told to the player (ROAD_MAP §5.2, review road-map-r1 item 4): the line above goes to the log when the chapter opens
   and heads the chapter's first hồi card ("… nay đã khuất, kẻ nối tay là …") */
(function(){const p0=PEND.j67;if(!p0)return;PEND.j67=function(p){const r=p0.apply(this,arguments);try{const A=r&&th67(p.t);
  const L=[];if(A&&A.rc&&A.rc.length&&!A.i)L.push(...A.rc);if(A&&A.rq&&A.rq.i===A.i)L.push(...A.rq.t);
  if(L.length&&typeof r.t==="string"){const i=r.t.indexOf("<br>");if(i>=0)r.t=r.t.slice(0,i+4)+`<i>${L.join(" ")}</i><br>`+r.t.slice(i+4)}}catch(e){console.error(e)}return r}})();
/* a recast in the MIDDLE of a road chapter (j67 beatOk67 need:["v"] → castRv67, review road-b1-r1 item 7) is told the same way: log + the
   next hồi card (A.rq, kept for that hồi only). rdCast clears the old id before it casts, so it is not told twice. */
(function(){const c0=castRv67;castRv67=function(A,k){const oid=A&&A.act?A.act[k]:null;const r=c0.apply(this,arguments);
 try{if(r&&oid!=null&&rdOn()){const a=ARC67[A.a],rd=S.st.f14.rd;if(a&&(A.a===rd||a.road===rd)){const old=RV(oid),nv=rv67(A,k);
  if(old&&nv&&old.id!==nv.id){const L=`${old.name} ${old.alive?"đã rời cung":"nay đã khuất"}, kẻ nối tay là ${nv.name}.`;log(`<i>${L}</i>`);
   if(!A.rq||A.rq.i!==A.i)A.rq={i:A.i,t:[]};A.rq.t.push(L)}}}}catch(e){console.error(e)}return r}})();
/* a new life: Phần giữa = the full road when it exists */
(function(){if(typeof a67init!=="function")return;const i0=a67init;a67init=function(k){const r=i0.apply(this,arguments);
 try{if(!f14())return r;const c=S.st.ch,rd=S.st.f14.road;if(!rd||!rdFull(rd))return r;
  const P=c.plan,a=P.indexOf("o"),b=P.indexOf("st:st_the");if(a<0||b<a||c.i>=a)return r;
  const mid=["o"];for(let n=BAL.road.first;n<=BAL.road.last;n++)mid.push("st:"+ROAD14[rd][n]);
  P.splice(a,b-a+1,...mid);S.st.f14.rd=rd;S.st.f14.act={};S.st.f14.ends={};S.st.f14.fb={};S.st.f14.q97={p:0,b:0}}catch(e){console.error(e)}return r}})();
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
 log(`<b class="${E.k>0?"g":E.k<0?"r":""}">Khép nẻo đời «${Q0.t}»: ${A.tag}.</b>${R?` Phần thưởng: ${itm(R.k).n}.`:""}`);
 card67("result",`Khép nẻo đời: ${Q0.t}`,[["Tuyến",ARC67[rd].t],["Kết quả",A.tag,E.k>0?"g":E.k<0?"r":""],["Các chương",L.join("<br>")],R&&R.row,["Về sau","Mệnh truyện còn tiếp: con cái, ngôi Trung cung"]],pMe())}
window.rdPrev=rdPrev;window.rdEnd=rdEnd;window.rdFull=rdFull;
/* the sign of the latest chapter's ending of this road (1 won, 0 middle, −1 lost); opening hồi pick on it */
function rdK(){try{const r=S.st.f14.re;return r?r.k:0}catch(e){return 0}}
window.rdK=rdK;
/* rare endings of road finales (j97 loads after the road files): RD97L entries take the j97 catalogue shape (R97L) */
window.RD97L=window.RD97L||[];
/* review road-b1-r1 item 1 (whole family, every RD97L entry): (a) j97 builds ARC67[id].E.r97 once at load for R97L only, so a road finale
   needs its own E.r97 here — without it end67(A,"r97") fell back to the first ending (a plain win: no rare text, fx, go, Ngự tứ, title, book);
   (b) a road's rare path names options of the whole road (.4–.10), but j97 counts path/bad hits on the .11 thread only (A.q97) → the road
   keeps one tally S.st.f14.q97 fed by every chapter of the road, and the .11 thread starts from it (rdQ97 below). */
function rdR97(){try{if(!window.RARE97)return;for(const d of RD97L){if(!RARE97.defs[d.a])RARE97.defs[d.a]=d;const a=ARC67[d.a];
 if(a&&a.E&&!a.E.r97)a.E.r97={k:BAL.road.rareK,tag:"✦ "+d.tag,w:d.w,t:d.t,fx:d.fx,go:A=>r97After(A,d)}}}catch(e){console.error(e)}}
/* the road's rare-ending definition (its .11) when this life runs a full road, else null */
function rdQdef(){try{if(!rdOn())return null;const R=ROAD14[S.st.f14.rd];const id=R&&R[BAL.road.last];return id&&window.RARE97&&RARE97.defs[id]||null}catch(e){return null}}
/* a choice made in any chapter of this road (the .4 premise and .5–.10) counts for the road's rare finale; the .11 itself is counted by j97 */
function rdQ97(A,o){const d=rdQdef();if(!d||!A||!o)return;const a=ARC67[A.a],rd=S.st.f14.rd;if(!a||!(A.a===rd||a.road===rd)||a.rn===BAL.road.last)return;
 const q=S.st.f14.q97||(S.st.f14.q97={p:0,b:0});const s=String(o.n||"");if((d.bad||[]).some(x=>s.includes(x)))q.b=1;else if((d.path||[]).some(x=>s.includes(x)))q.p++}
setTimeout(()=>{rdR97();
 /* res67 is wrapped after j97 (outer): read the option before the original clears A.cur */
 try{const r0=res67;res67=function(tk,bid,i,odds){let A=null,o=null;try{A=th67(tk);if(A&&A.cur===bid&&rdOn())o=opts67(A,beatDef67(A,bid))[i]}catch(e){}
  const r=r0.apply(this,arguments);try{if(o)rdQ97(A,o)}catch(e){console.error(e)}return r}}catch(e){console.error(e)}
 /* the .11 thread starts with the road's tally (j97 r97Cond reads A.q97 at the climax) */
 try{const n0=newThread67;newThread67=function(id){const A=n0.apply(this,arguments);try{const a=ARC67[id];
  if(A&&rdOn()&&a&&a.o==="rd"&&a.road===S.st.f14.rd&&a.rn===BAL.road.last){const q=S.st.f14.q97||{p:0,b:0};A.q97={p:q.p||0,b:q.b||0}}}catch(e){console.error(e)}return A}}catch(e){console.error(e)}},0);
window.rdR97=rdR97;
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
   full-road life gets its «Khép nẻo đời» (B3 finding, every origin) */
(function(){const a0=chAdvance67;chAdvance67=function(E){const r=a0.apply(this,arguments);try{if(rdOn()){const c=S.st.ch,f=S.st.f14,rd=f.rd;
  /* CNVSTALL: also when the frame has already gone past the road's last slot (its .8–.11 could not cast, a maid's slots were skipped) or closed */
  const li=c?c.plan.indexOf("st:"+ROAD14[rd][BAL.road.last]):-1;
  if(c&&!c.fin&&f.re&&(c.n>BAL.road.last||(li>=0&&c.i>li)||c.all)){const n=f.re.n,id=n===BAL.road.first-1?rd:ROAD14[rd][n],p=c.past.slice().reverse().find(x=>x.a===id);
   if(p)rdFinale({a:id,tag:p.tag},{k:p.k},1)}}}catch(e){console.error(e)}return r}})();
/* ================= QUESTLINE Q3 — HELPERS IN HER ROAD (owner D-Q1 = "1", OD 18/11 07:56Z + OD:L1601 (5); QUESTLINES_AUDIT §4 Q3) =================
   A «Nhờ …» option tagged in RDHP (jrdhp.js, data; the road files are not edited) asks a real helper. Before she picks, the option card's Gợi ý row
   (KIT §28.6 kitHintRow, through the documented per-option `hint` override — no new kit part) opens with ONE willingness word (BAL.road.hp.word),
   never odds. When she picks it, the helper answers one of 4 ways drawn from his / her nết × Tâm cơ × liking for her × own road × nợ ân
   (rdHpW, every number BAL.road.hp): giúp hết lòng (the option's own odds) · giúp qua loa (odds − BAL.road.hp.half) · từ chối (the option does not
   run: small cost noC, she keeps the hồi and picks again, that option is gone for this hồi) · phá ngầm / mách lẻo (the option fails, Đức −, the
   road's rival oán + — jnroad «mách» shape). Never forced (OD:L1601 (5)): every tagged hồi keeps an option that asks nobody (dev/test/roadhp-scan.js);
   a helper changes only the odds of HER option, never which endings stay open (the j67 / jst14 funnel is untouched).
   Old saves: an untagged option rolls as before; A.hpNo (refused options of the open hồi) is new and optional. Co-op: only the host draws (nrGuest
   → today's roll), and the co-op friend is never an NPC helper. window.__hpoff = 1 switches it off (measures); window.__hpLog collects the draws. */
const RDHP_K=["full","half","no","sab"];
function rdHpOff(){try{return !!window.__hpoff||(typeof nrGuest==="function"&&nrGuest())}catch(e){return false}}
/* the tag of option o of beat bid of her thread A, or null */
function rdHpTag(A,bid,o){try{if(rdHpOff()||!A||!o||!window.RDHP||typeof bid!=="string"||bid.startsWith("G."))return null;const b=beatDef67(A,bid);
 if(!b||!Array.isArray(b.o))return null;const i=b.o.indexOf(o);return i<0?null:RDHP[A.a+":"+bid+":"+i]||null}catch(e){return null}}
/* the helper: who (person or role), the voice he / she speaks with (jvoice kAddr speaker), nết, liking toward her (± affCap), Tâm cơ, nợ ân key */
function rdHpWho(A,hp){const B=BAL.road.hp,cap=B.affCap,cl=x=>Math.max(-cap,Math.min(cap,+x||0)),af=o=>o&&o.af&&typeof o.af==="object"?(o.af.me||0)/2:0;
 const P={role:hp,type:B.type[hp]||"go",p:null,sp:null,net:[],tone:null,aff:0,tc:null,known:!B.unk.includes(hp),name:"",dk:null};
 const cons=v=>{if(!v||v===S||v.coop)return false;Object.assign(P,{p:v,sp:v,aff:cl(aff(v,S)),tc:v.tamco,name:v.name,dk:{k:v.queen?"hh":"rv",id:v.id}});return true};
 try{switch(hp){
  case "v":case "v2":cons(rv67(A,hp));break;
  case "mis":cons(srvMis67());break;
  case "hh":if(!cons(qOn()?rivals[0]:null))Object.assign(P,{sp:"hh",aff:cl((S.hh||0)-B.mid.hh),name:"Hoàng hậu",dk:{k:"hh"}});break;
  case "th":Object.assign(P,{sp:"th",aff:cl((S.th||0)-B.mid.th),tone:S.thTrait||null,name:"Thái hậu",dk:{k:"th"}});break;
  case "emp":Object.assign(P,{sp:"emp",aff:cl((S.sung||0)-B.mid.emp),tone:typeof kTone==="function"?kTone("emp"):null,name:"Hoàng thượng",dk:{k:"emp"}});break;
  case "eun":{const t=S.court&&S.court.tq;Object.assign(P,{sp:{srv:"m",name:t&&t.name},name:t?t.name:"Tổng quản",net:t&&t.mnet?[t.mnet]:[],aff:cl(af(t)),dk:{k:"eun"}});break}
  case "off":Object.assign(P,{sp:{role:"x",rw:"quan"}});break;
  case "doc":{const t=S.court&&S.court.ty;Object.assign(P,{sp:{role:"x",rw:"quan"},name:"thái y",net:t&&t.mnet?[t.mnet]:[],aff:cl(af(t)),dk:{k:"doc"}});break}
  case "maid":{const m=S.maid;if(m)Object.assign(P,{p:m,sp:{srv:"f",name:m.name},name:m.name,net:Array.isArray(m.net)?m.net:[],aff:cl((m.loyal||0)-50)});P.dk={k:"maid"};break}
  case "man":{const m=man67(A);if(m)Object.assign(P,{p:m,sp:m,name:m.name,net:Array.isArray(m.net)?m.net:[],aff:cl((m.loyal==null?50:m.loyal)-50)});break}
  case "dad":case "bro":case "mom":case "fam":{let d=null;try{d=dad67()||(typeof trS==="function"&&typeof clanOf==="function"?trS().H[clanOf(S)]:null)}catch(e){}
   if(d){P.aff=cl(af(d));if(hp==="dad"){P.name=d.name||"";P.net=Array.isArray(d.net)?d.net:[]}}P.dk={k:"fam"};break}
  case "n1":P.name=A.n1||"";break;
  case "foe":P.name=S.foe||"";break}}catch(e){console.error(e)}
 if(P.p&&!P.net.length)try{P.net=(Array.isArray(P.p.net)?P.p.net:traitsOf(P.p))||[]}catch(e){}
 /* a helper whose line needs a person or a name that is missing here (no {mis} / {man} / {v}, no {foe} / {n1} name) speaks as an unknown
    go-between: the go lines, the go weights and the word «Không rõ» (review E9r item 3) */
 if((["v","v2","mis","man"].includes(hp)&&!P.p)||(["foe","n1"].includes(hp)&&!P.name))Object.assign(P,{role:"go",type:"go",known:false,sp:null,name:"",dk:null,net:[],aff:0,tc:null});
 return P}
/* the voice of a role when the helper has no speaker of its own (a line holding {goi} / {xung} is never shown raw) */
const RDHP_SP={off:{role:"x",rw:"quan"},doc:{role:"x",rw:"quan"},eun:{srv:"m"},srv:{srv:"f"},maid:{srv:"f"},th:"th",emp:"emp",hh:"hh"};
const rdHpTones=P=>P.net.concat(P.tone?[P.tone]:[]);
/* the four weights [full, half, no, sab] (BAL.road.hp; each ≥ 0) */
function rdHpW(A,P){const B=BAL.road.hp,w=(B.w[P.role]||B.w.go).slice();const m=B.trK&&B.trK[P.role]!=null?B.trK[P.role]:1,add=v=>{if(v)for(let i=0;i<4;i++)w[i]+=(v[i]||0)*m};
 for(const t of new Set(rdHpTones(P)))add(B.tr[t]);
 for(let i=0;i<4;i++)w[i]+=P.aff*B.aff[i];
 if(P.tc!=null&&P.aff<0&&P.tc>B.tc0)w[3]+=(P.tc-B.tc0)*B.tcSab;
 const nr=P.p&&P.p.nr;if(nr){if(nr.c==="me")w[3]+=B.rdRiv;if(nr.k>0)w[0]+=B.rdWon;else if(nr.k<0)w[1]+=B.rdLost}
 if(P.dk&&typeof q72Debt==="function")try{const d=q72Debt(P.dk);if(d>0)w[0]+=Math.min(B.oweMax,d*B.owe)}catch(e){}
 return w.map(x=>Math.max(0,x))}
/* the one willingness word (true: the largest shown answer; sab stays hidden except a Nhiều chuyện helper's leak) */
function rdHpWord(P,w){const B=BAL.road.hp,W=B.word;if(!P.known)return W.unk;const T=w[0]+w[1]+w[2]+w[3];
 if(T>0&&rdHpTones(P).includes("Nhiều chuyện")&&w[3]*100/T>=B.lk)return W.lk;
 const k=[0,1,2].reduce((m,i)=>w[i]>w[m]?i:m,0);return k===0?W.full:k===1?W.half:B.noRule.includes(P.role)?W.rule:B.noLow.includes(P.role)?W.low:W.no}
function rdHpDraw(w){const T=w[0]+w[1]+w[2]+w[3];if(!(T>0))return 0;let r=Math.random()*T;for(let i=0;i<4;i++){r-=w[i];if(r<0)return i}return 0}
const rdHpLk=(P,k)=>k===3&&rdHpTones(P).includes("Nhiều chuyện");
/* the helper's answer line (jrdhp RDHPL, VANPHONG; address through jvoice kSay) */
function rdHpLine(A,P,k){const L=window.RDHPL&&RDHPL[P.type];if(!L)return"";let s=L[rdHpLk(P,k)?"lk":RDHP_K[k]]||"";let rv=null;try{rv=rv67(A,"v")}catch(e){}
 const ri=rv&&rv!==P.p?rv.name:"người khác";s=s.replace(/\{hn\}/g,P.name||"").replace(/\{ri\}/g,ri);
 const sp=P.sp||(/\{(goi|Goi|xung|Xung)\}/.test(s)?RDHP_SP[P.role]||{srv:"f"}:null);
 try{if(sp&&typeof kSay==="function")s=kSay(sp,S,s,P.role==="maid"?{}:sp.srv?{own:false}:{})}catch(e){}return s.charAt(0).toUpperCase()+s.slice(1)}
/* how the card names the helper in front of the word */
function rdHpLab(P){const R={dad:"Cha",bro:"Huynh trưởng",mom:"Mẫu thân",fam:"Người nhà",srv:"Kẻ hầu ấy",doc:"Thái y",off:"Vị quan ấy",dan:"Người ấy",si:"Vị ấy",go:"Người được nhờ"};
 return R[P.role]||P.name||"Người được nhờ"}
function rdHpNote(P,k){try{if(window.__hpLog)(window.__hpS=window.__hpS||[]).push({role:P.role,type:P.type,k:rdHpLk(P,k)?4:k,net:rdHpTones(P).slice(),aff:P.aff,word:P.word})}catch(e){}}
/* refused options of the open hồi leave its option list (A.hpNo = {b: beat id, i: [raw indexes]}) */
(function(){const o0=opts67;opts67=function(A,b){const L=o0.apply(this,arguments);try{const X=A&&A.hpNo;if(X&&b&&Array.isArray(b.o)&&beatDef67(A,X.b)===b)return L.filter(o=>!X.i.includes(b.o.indexOf(o)))}catch(e){}return L}})();
setTimeout(()=>{
 /* the word on the card before she picks (outermost PEND.j67) */
 try{const p0=PEND.j67;PEND.j67=function(p){const r=p0.apply(this,arguments);try{if(!r||!r.o||rdHpOff())return r;const A=th67(p.t),b=A&&beatDef67(A,p.b);if(!b)return r;
  opts67(A,b).forEach((o,i)=>{const tag=rdHpTag(A,p.b,o),ro=r.o[i];if(!tag||!ro)return;const P=rdHpWho(A,tag.hp),w=rdHpW(A,P),wd=rdHpWord(P,w),lab=rdHpLab(P);
   const base=Object.assign({},ro);delete base.hint;delete base.risk;const hb=typeof kitHint==="function"?kitHint(base,null,1):{risk:"có rủi ro"};
   ro.hpw=wd;ro.hint=lv=>{let h="";try{h=kitHint(base,null,lv).hint}catch(e){}return `${lab}: ${wd}`+(h?"; "+h:"")};
   ro.risk=hb.risk==="an toàn"&&w[1]+w[3]>0?"có rủi ro":hb.risk})}catch(e){console.error(e)}return r}}catch(e){console.error(e)}
 /* the answer when she picks (outermost res67) */
 try{const r0=res67;res67=function(tk,bid,i,odds){let A=null,o=null,tag=null,b=null;
  try{A=th67(tk);if(A&&A.cur===bid){b=beatDef67(A,bid);o=opts67(A,b)[i];tag=rdHpTag(A,bid,o)}}catch(e){}
  const done=r=>{try{if(A&&A.hpNo&&A.cur!==bid)delete A.hpNo}catch(e){}return r};
  if(!tag)return done(r0.apply(this,arguments));
  const B=BAL.road.hp,a=ARC67[A.a];let P,w,k;try{P=rdHpWho(A,tag.hp);w=rdHpW(A,P);k=rdHpDraw(w);P.word=rdHpWord(P,w)}catch(e){console.error(e);return done(r0.apply(this,arguments))}
  rdHpNote(P,k);const line=rdHpLine(A,P,k),kw=B.kw[rdHpLk(P,k)?"lk":RDHP_K[k]],head=`<b>${lab67(A)} · ${a.t}</b>: `;
  if(k===2){const raw=b.o.indexOf(o),X=A.hpNo&&A.hpNo.b===bid?A.hpNo:{b:bid,i:[]};const left=opts67(A,b).filter(x=>x!==o&&!X.i.includes(b.o.indexOf(x)));
   if(left.length){X.i.push(raw);A.hpNo=X;ap67(B.noC);log(`${head}${kw}. ${line} ${fmt(B.noC)}`);A.rq={i:A.i,t:[`${kw}: ${line}`]};A.cur=null;A.nb=bid;fireBeat67(A);return}
   /* nothing else left in this hồi (a filter hid the free option): the refusal is a plain failure of the option */
   log(`${head}${kw}. ${line}`);return done(r0.call(this,tk,bid,i,0))}
  if(line)log(`${head}${kw}. ${line}`);
  if(k===0)return done(r0.apply(this,arguments));
  if(k===1)return done(r0.call(this,tk,bid,i,odds>=100?100-B.half:Math.max(B.min,odds-B.half)));
  const r=r0.call(this,tk,bid,i,0);try{const fx={duc:-B.sab.duc};ap67(fx);let ex=fmt(fx);const v=rv67(A,"v");if(v&&v!==P.p){oanAdd(v,S,B.sab.oan);ex+=` · ${pvOan(v,B.sab.oan,`${v.name} oán ta`)}`}log(`${head}${kw}: ${ex}`)}catch(e){console.error(e)}
  return done(r)}}catch(e){console.error(e)}},0);
window.rdHpWho=rdHpWho;window.rdHpW=rdHpW;window.rdHpWord=rdHpWord;window.rdHpTag=rdHpTag;window.rdHpLine=rdHpLine;window.rdHpLab=rdHpLab;
