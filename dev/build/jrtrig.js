/* ================= jrtrig: REASON TRIGGERS PER HỒI (GAP OR16; STORY_ROADS_PLAN.md §1 "A hồi fires only for a real in-game reason (a
   person's goal, grudge, debt, faction move, an event, a deadline) — never a daily dice", §2 Phase 3 "reason triggers per hồi";
   owner OD:L1226 "when they come to her it must be for a REAL in-game reason (their goals, grudges, debts, faction, events)") =================
   Every j67 chapter (the 14-chapter life, the full origin roads jroad/jrd_* and the old v2 frame) moves hồi by hồi: after a hồi the next one
   falls due on a timer (j67 res67: BAL.arc.trig.fb / .fr months). That timer stays as the FALLBACK. On top of it, from BAL.arc.trig.min
   months after the last hồi, each month asks npcWhy("hoi67") whether one of the hồi's REAL people (the cast {v} / {v2}, the family foe, the
   Hoàng hậu when the hồi needs her) has a reason to move now — and the two-way side (law 1): whether SHE has one against them:
     grudge  hostility (j9) of that person toward her, or her own oán toward that person ≥ BAL.arc.trig.gr
     debt    the j72 nợ ân book between them (she owes → they come to collect; they owe → they come to repay)
     faction jreign sides: that person's side (rgSideOf) against / with hers (rgSideNow)
     goal    that person's own road (jnroad v.nr) names HER as its rival
     event   that person acted on her within the last BAL.arc.trig.ev entries of the people ledger (S.roster.acts, j95)
   The strongest reason (npcWhy pick, BAL.ag.why) opens the hồi NOW (A.due = this month) and the hồi says why (Cớ sự: …) on the Mệnh truyện
   card, in the hồi text and in the Sổ ghi line. No reason → the timer opens it as before. One person moves a hồi at most once every
   BAL.ag.why.cd.hoi67 tuần. Numbers: BAL.arc.trig (jbalarc.js) + BAL.ag.why (jbal2.js). Off: BAL.arc.trig.on = 0 (bot ON/OFF measure).
   Kit only: the existing j67 card / kit dialog / log lines; no new frame. Co-op: per player (her own chapters), nothing shared. */
const RTB=()=>BAL.arc.trig;
function rtOn(){try{return !!(RTB()&&RTB().on&&typeof npwOn==="function"&&npwOn()&&typeof v267==="function"&&v267()&&!S.out)}catch(e){return false}}
/* the real people of the next hồi (cast of the chapter; never a story-only or off-screen name) */
function rtCast(A){const L=[];const add=v=>{if(v&&v!==S&&rvOk67(v)&&!L.includes(v))L.push(v)};
 try{const b=beatDef67(A,A.nb);for(const k of ["v","v2"])add(rv67(A,k));
  const t=b?String(typeof b.t==="function"?"":b.t||"")+String(b.h||""):"";if(/\{foe\}/.test(t)||A.act&&A.act.foe!=null)add(foe67());
  if(b&&(b.w==="hh"||(b.need||[]).includes("hh"))&&qOn())add(rivals[0])}catch(e){}return L}
/* the j72 nợ ân book between her and v (>0: v owes her, <0: she owes v) */
function rtDebt(v){try{if(typeof q72Debt!=="function"||typeof q72A!=="function")return 0;const a=q72A(v.queen?"hh":"rv",v.id)||q72A("rv",v.id);return a?q72Debt(a):0}catch(e){return 0}}
/* a recent act of v on her (or of her on v) in the people ledger */
function rtEvent(v){try{const L=(S.roster&&S.roster.acts)||[];const id="v"+v.id;const n=RTB().ev;for(let i=L.length-1;i>=0&&i>=L.length-n;i--){const x=L[i];if(!x||!x.ok)continue;if(x.id===id&&x.t==="me")return 1;if(x.id==="me"&&x.t===id)return -1}}catch(e){}return 0}
/* every reason one person has right now; the strongest is kept (s ≥ BAL.ag.why.min fires) */
function rtWhy(v){const T=RTB(),m=npwB().min;const R=[];const nm=npwNm(v);
 try{const h=hostility(v,S);if(h>=T.gr)R.push({s:m*h/T.gr,k:"grudge",r:`${nm} ${npw1Gr(v,S)}`})}catch(e){}
 try{const o=oan(S,v);if(o>=T.gr)R.push({s:m*o/T.gr,k:"grudge",r:`ngươi còn mối oán với ${nm}`})}catch(e){}
 const d=rtDebt(v);if(d)R.push({s:m*(1+Math.abs(d)*T.debtK),k:"debt",r:d<0?`${nm} tìm đến đòi ngươi trả ân`:`${nm} muốn trả ân cho ngươi`});
 try{if(typeof rgSideOf==="function"&&typeof rgSideNow==="function"&&S.reign){const a=rgSideOf(v),b=rgSideNow();if(a&&b)R.push(a!==b?{s:m*T.fac,k:"faction",r:`phe ${rgSideN(a)} của ${nm} lấn tới`}:{s:m*T.facAlly,k:"faction",r:`${nm} cùng phe ${rgSideN(a)} cần ngươi`})}}catch(e){}
 try{if(v.nr&&!v.nr.x&&v.nr.c==="me")R.push({s:m*T.goal,k:"goal",r:`đường riêng của ${nm} vướng phải ngươi`})}catch(e){}
 const e=rtEvent(v);if(e)R.push({s:m*T.evK,k:"event",r:e>0?`${nm} vừa ra tay với ngươi`:`ngươi vừa ra tay với ${nm}`});
 R.sort((a,b)=>b.s-a.s);return R[0]||null}
npwReg("hoi67",{grp:"story",who:c=>c&&c.A?rtCast(c.A):[],why(v){const r=rtWhy(v);return r?{s:r.s,t:S,r:r.r,flag:r.k}:null}});
/* the hồi's reason, kept on the chapter until that hồi is played */
function rtTry(A){if(!rtOn()||!A||A!==S.st.M||A.done||A.cur||!A.nb||S.turn>=A.due)return null;const lt=A.lt!=null?A.lt:A.st0!=null?A.st0:null;if(lt!=null&&S.turn<lt+RTB().min)return null;
 /* the first month after a hồi only a strong reason (≥ BAL.arc.trig.early × min) moves it; from the next month any real reason does */
 const bar=lt!=null&&S.turn<lt+RTB().min+1?npwB().min*RTB().early:0;
 let o=null;try{o=npcWhy("hoi67",{A},x=>x.s>=bar)}catch(e){console.error(e);o=null}if(!o)return null;
 A.due=S.turn;A.rw={r:o.why,k:o.flag||"",id:typeof ledgerId==="function"?ledgerId(o.who):null};
 try{arcReveal67("{v}{v2}",A)}catch(e){}
 const b=beatDef67(A,A.nb);try{log(`<span class="past">${lab67(A)} «${ARC67[A.a].t}» · Cớ sự: ${o.why}. Hồi «${fill67(b&&b.h||"",A)}» đến sớm.</span>`)}catch(e){}return A.rw}
window.rtTry=rtTry;
/* the month: the reason check runs first, so the same month a servant life's beat (j67 a67Month) or the Mệnh truyện card (storyActs67) sees it */
(function(){if(typeof a67Month!=="function")return;const m0=a67Month;a67Month=function(){try{if(v267()&&!S.dead)rtTry(S.st.M)}catch(e){console.error(e)}return m0.apply(this,arguments)}})();
/* a hồi played → its reason is spent, the next hồi's clock starts (A.lt) */
(function(){if(typeof res67!=="function")return;const r0=res67;res67=function(tk){const A=th67(tk);const r=r0.apply(this,arguments);try{if(A&&A===S.st.M){A.lt=S.turn;A.rw=null}}catch(e){}return r}})();
(function(){if(typeof chStartArc67!=="function")return;const c0=chStartArc67;chStartArc67=function(B){const r=c0.apply(this,arguments);try{if(B){B.st0=S.turn;B.rw=null}}catch(e){}return r}})();
/* the reason on screen: the Mệnh truyện card (Hành sự) and the hồi text (kit dialog body, a «past» line like j72's lead lines) */
(function(){if(typeof storyActs67!=="function")return;const s0=storyActs67;storyActs67=function(){const L=s0.apply(this,arguments);try{const A=S.st.M;if(A&&A.rw&&L&&L[0])L[0].t+=` Cớ sự: ${A.rw.r}.`}catch(e){}return L}})();
(function(){if(!PEND.j67)return;const p0=PEND.j67;PEND.j67=function(p){const d=p0.apply(this,arguments);try{const A=th67(p.t);if(d&&A&&A.rw&&typeof d.t==="string"){const i=d.t.indexOf("<br>");const x=`<span class="past">Cớ sự: ${A.rw.r}.</span><br>`;d.t=i<0?x+d.t:d.t.slice(0,i+4)+x+d.t.slice(i+4)}}catch(e){}return d}})();
