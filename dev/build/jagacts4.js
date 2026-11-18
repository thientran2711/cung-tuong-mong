/* ================= jagacts4: ROLE PARITY part 4 (owner OD 18/11 ~21:30Z: "những cung nữ khác làm được gì thì tôi ở thân phận cung nữ cũng làm được y như vậy, và ngược lại";
   OD 17/11 L1588: every player button ↔ an NPC option) — the NPC side of her buttons that had none (dev/handover/reports/role-parity.md §4.1 part B).
   ONE FUNCTION per act, her button and the NPC option run the same code:
   1. The affair road with a man (j22): her talk buttons «Chào hỏi đúng lễ», «Liếc mắt đưa tình», «Trao khăn tay», «Hẹn gặp riêng», «Cắt đứt» = manCards(p,m,risk)
      (j22). An NPC consort meets a man where he really is this buổi (jmen schedule S.menW), the man she likes best (his tình ý for her, else the one who
      fancies her: jmen likeV); a favoured one (Sủng ≥ BAL.ag.par4.man.lonely, the old flat roll's gate) weighs a new step less (favW), never a lock; a lover night makes her
      v.affair (j22 monthly conception / the book / exposure, jmen lover nights). Keys maid:hail … maid:cut = the names the role-parity scan gives these
      buttons (its KEYLAB); the maid group's runners of the same keys stay for maids (the doer decides).
      The flat monthly start (j22 affairMonth roll 2) is off while this runs.
   2. Đồ cấm (j83 IROUTE): «Sai cung nữ thân tín mua lén ngoài cung», «Hối lộ người ở Thái y viện», «Chợ đen ở cửa Thần Vũ», «Xin đồng minh» — an NPC buys one by HER choice (weights: someone she hates in the killing band
      BAL.ag.par4.ill.band, else bandW; no forbidden item at hand yet, else haveW) through illBuy (the same function as hers:
      bạc out, the item into her chest — or her maid brings it next tuần —, Đức −3, a failure leaves evidence). Real objects (law 6c): the poison she later
      uses (jpoison pgift, jagharm taint) is this item. The flat monthly roll (j83 npcMonthly malice>60 roll 8) is off while this runs.
   3. Tố xa xỉ / Tố vượt phẩm on a guess (jshelf shelfCause): she could always accuse on a guess, an NPC only in the monthly dice pass; now the same gate
      (ACT.xx / ACT.vp ok) opens for an NPC doer while the agent loop runs, and her choice (jagharm haOpts: band, motive, odds, mindPick) replaces the dice.
   Numbers: BAL.ag.par4 (jbal2 end). Off: BAL.ag.par4.on = 0 → the old flat rolls come back. HOST ONLY like every agReg provider. No UI, no new words.
   ============================================================================================================================================ */
const AG4={stat:{opt:0,land:0,by:{}}};
function p4On(){try{return !!(agOn()&&BAL.ag.par4&&BAL.ag.par4.on)}catch(e){return false}}
function p4Res(k,r){AG4.stat.land++;AG4.stat.by[k]=(AG4.stat.by[k]||0)+1;return r?String(r).replace(/<[^>]+>/g,"").replace(/\.\s*$/,"").trim():""}
/* ---------------- 1. the affair road ---------------- */
function p4MenHere(){const W=S.menW||{};return (S.men||[]).filter(m=>m&&m.alive&&W[m.id]&&!(typeof menBanned==="function"&&menBanned(m)))}
/* the man she would turn to: his tình ý for her, then whether he fancies her; ties by id (the same rule at plan time and at the deed, no dice) */
function p4ManScore(v,m){const X=BAL.ag.par4.man;return manT(v,m)+(m.likeV===v.id?X.like:0)}
function p4Man(v,step,at){const X=BAL.ag.par4.man;let L=p4MenHere();if(at)L=L.filter(m=>S.menW[m.id]===at);
 if(step==="cut")L=L.filter(m=>manT(v,m)>0);
 if(!L.length)return null;return L.slice().sort((a,b)=>(p4ManScore(v,b)-p4ManScore(v,a))||(String(a.id)<String(b.id)?-1:1))[0]}
function p4Card(v,m,step){const C=manCards(v,m,lộRiskP(v,S.menW[m.id]));return C.find(c=>c.mk===step)||null}
function p4ManOpts(v,N,need){const O=[];const X=BAL.ag.par4.man;if(!(S.men||[]).length)return O;const nd=g=>!need||g[need]!=null;
 for(const step of ["hail","flirt","token","tryst","cut"]){const g=X.g[step];if(!nd(g))continue;const m=p4Man(v,step);if(!m)continue;const C=p4Card(v,m,step);if(!C||C.lock)continue;
  if(step==="cut"&&lộRiskP(v,S.menW[m.id])<X.cutRisk)continue;
  const o=C.o==null?100:C.o;/* a favoured consort (Sủng ≥ lonely) or one already in love elsewhere weighs a new step less: a weight of her motive, never a lock (law 1: her buttons have none) */
  const wt=step==="hail"||step==="cut"?1:((v.sung||0)<X.lonely?1:X.favW)*(v.affair&&v.affair!==m.id?X.favW:1);const u=agcU(v,N,o,g,C.c||{},"self",(X.l||{})[step])*wt;if(!(u>0))continue;AG4.stat.opt++;const pl=S.menW[m.id];
  O.push({k:"maid:"+step,t:null,man:m.id,u,tag:"self",act:step==="hail"?`chào hỏi ${m.name}`:step==="cut"?`cắt đứt với ${m.name}`:`lén gặp ${m.name}`,kc:step==="tryst"?BAL.time.cost.talkAct:BAL.time.cost.talk,at:()=>pl})}
 return O}
/* the deed: she must stand where he is now (pl = the place of her planned deed, the pend's pl; else where she is) (a man who has moved on is missed); a card with run (Hẹn gặp riêng) rolls inside, like her talk() */
function p4ManRun(v,step,pl){if(!v||v===S||!v.alive||v.out)return"";const m=p4Man(v,step,pl||whereOf(v));if(!m)return"";const C=p4Card(v,m,step);if(!C||C.lock)return"";
 if(C.run){if(!agcCan(v,C.c))return"";agcPay(v,C.c);return p4Res("man:"+step,C.run())}
 return p4Res("man:"+step,p3Run(v,C,"man:"+step)||"")}
/* ---------------- 2. Đồ cấm by the j83 routes ---------------- */
const P4ILL={maid:"illMaid",thaiy:"illTy",cho:"illCho",ally:"illAlly"};
function p4IllTgt(v){const B=BAL.ag.par4.ill;const L=others(v).filter(x=>x&&x!==v&&(x===S?!S.dead&&!S.out:x.alive!==false&&!x.out)&&bandOf(danger(v,x))>=B.band&&agSpite(v,x)>0);
 return L.length?L.slice().sort((a,b)=>(agSpite(v,b)-agSpite(v,a))||(String(key(a))<String(key(b))?-1:1))[0]:null}
/* the item: a pregnant target → xạ hương, else the strongest she can pay for on that route (the same rule at plan time and at the deed) */
function p4IllK(v,r,t){const R0=IROUTE[r],B=BAL.ag.par4.ill;if(!R0||R0.need(v))return null;let ks=R0.ks.filter(k=>IT[k]&&WILL[k]);
 if(r==="ally")ks=ks.filter(k=>illAllies(v).some(a=>(a.inv||[]).some(e=>e.k===k&&!e.h&&!e.t)));else ks=ks.filter(k=>(v.bac||0)>=R0.cost(k)+B.keep);
 if(!ks.length)return null;if(t&&t.preg&&!t.hidden&&ks.includes("xahuong"))return"xahuong";return ks.slice().sort((a,b)=>(itm(b).pr-itm(a).pr)||(a<b?-1:1))[0]}
/* like her button, no lock but the route's own (need / bạc); WHY she would = weights: a hated person in the killing band (else bandW), no forbidden item at hand yet (else haveW) */
function p4IllOpts(v,N,need){const O=[];const B=BAL.ag.par4.ill;if(need&&B.g[need]==null)return O;if(v.confined)return O;
 const t=p4IllTgt(v);const wt=(t?1:B.bandW)*((v.inv||[]).some(e=>e&&WILL[e.k]&&!e.h)||(v.illP||[]).length?B.haveW:1);
 for(const r in IROUTE){const k=p4IllK(v,r,t);if(!k)continue;const R0=IROUTE[r];const c=r==="ally"?{}:{bac:-R0.cost(k)};const u=agcU(v,N,R0.o(v),B.g,c,"scheme",B.l)*wt;if(!(u>0))continue;AG4.stat.opt++;
  O.push({k:"cx3:"+P4ILL[r],t:null,u,tag:"scheme",act:AGC3ACT[P4ILL[r]],kc:R0.k,at:()=>r==="thaiy"?"tyv":r==="cho"?"thu":palaceOf(v)})}
 return O}
function p4IllRun(v,r){if(!v||v===S||!v.alive||v.out||v.confined)return"";const t=p4IllTgt(v);const k=p4IllK(v,r,t);if(!k)return"";
 const from=r==="ally"?illAllies(v).find(a=>(a.inv||[]).some(e=>e.k===k&&!e.h&&!e.t)):null;const L=illBuy(v,r,k,from);if(L&&/không thành/.test(L)&&illWitness(v)===S)log(L);return p4Res("ill:"+r,L)}
/* ---------------- 3. a guess is weighed as a guess ----------------
   Her card shows the act's odds (oVP); whether the charge is TRUE is unknown to both. An NPC who has seen nothing (cause = guess) weighs the odds × her belief
   that the guess is right (BAL.ag.par4.guess.p) — her mind, not a lock: the gate (ACT.xx / ACT.vp ok) is the same as hers. */
(function(){if(typeof haOdds!=="function")return;const h0=haOdds;haOdds=function(v,t,k){const r=h0.apply(this,arguments);
 try{if((k==="xx"||k==="vp")&&v!==S&&p4On()){let seen=false;try{const A=ACT[k];seen=k==="xx"?!!xxCause(v,t):!!wdCause(v,t)}catch(e){}const c=seen?null:shelfCause(v,t,k);
  if(!seen&&c&&c.how==="guess")return{o:r.o*BAL.ag.par4.guess.p,pc:r.pc}}}catch(e){agdErr("par4:guess",e)}return r}})();
/* ---------------- wiring ---------------- */
try{Object.assign(AGC3BTN,{illMaid:IROUTE.maid.n,illTy:IROUTE.thaiy.n,illCho:IROUTE.cho.n,illAlly:IROUTE.ally.n});
 Object.assign(AGC3ACT,{illMaid:"sai cung nữ lén mua đồ cấm ngoài cung",illTy:"lén mua đồ cấm ở Thái y viện",illCho:"ra chợ đen ở cửa Thần Vũ",illAlly:"xin đồng minh đồ cấm"});
 for(const k of ["illMaid","illTy","illCho","illAlly"])ACT95["ag_cx3:"+k]=AGC3ACT[k]}catch(e){agdErr("par4:labels",e)}
agReg("consort","par4",(v,N,need)=>{const O=[];if(!p4On()||v===S||v.out||v.confined||!v.alive||v.coop)return O;
 try{O.push(...p4ManOpts(v,N,need))}catch(e){agdErr("par4:man",e)}try{O.push(...p4IllOpts(v,N,need))}catch(e){agdErr("par4:ill",e)}return O});
for(const r in P4ILL)agRunReg("cx3:"+P4ILL[r],v=>p4IllRun(v,r));
/* the maid group's runners of maid:hail … maid:cut stay for maids; a consort doer runs her own affair road */
for(const step of ["hail","flirt","token","tryst","cut"]){const r0=AGRUN["maid:"+step];agRunReg("maid:"+step,(d,t,pd)=>{if(d&&d.sid==null&&d!==S&&rivals.includes(d))return p4ManRun(d,step,pd&&pd.pl);return r0?r0(d,t,pd):""});
 try{ACT95["ag_maid:"+step]=ACT95["ag_maid:"+step]||({hail:"chào hỏi",flirt:"liếc mắt đưa tình",token:"trao khăn tay",tryst:"hẹn gặp riêng",cut:"cắt đứt"})[step]}catch(e){}}
Object.assign(window,{AG4,p4On,p4Man,p4ManOpts,p4ManRun,p4IllOpts,p4IllRun,p4IllK,p4IllTgt});
