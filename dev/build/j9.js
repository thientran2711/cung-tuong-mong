/* ================= RELATION WEB, PALACE MAP, PRESENCE, TALK ================= */
/* two bars between every pair: Thiện cảm (aff, -100..100, directional) and Oán (0..100, directional) */
/* rel-men-servants (KP22, law 1 two-way + law 14 one store): the SAME two bars between every pair of people, men and servants included.
   Consorts / ta keep their maps (S.rl / S.ro, v.rel / v.oan, v.rl / v.ro). A man or a servant (relMS) keeps the stores the game already
   writes: a man → ta = m.af (+ m.oan), → a consort = m.afw[id] (+ m.ro[id]); a servant / maid / court official → ta = s.af.me (servant road:
   S.srv.af[sid]) (+ s.oan), → another servant = s.af[sid] (j10 / jagstaff), → a consort = s.af["r"+id] (court officials: s.af[id], j13)
   (+ s.ro, same keys). Toward a man / servant the key is relKey (man "m<n>", servant "s<sid>", else the j61 person key kOf61). */
const relRv=p=>p===S||!!(p&&p.rl&&p.sid==null&&p.id!=null);
const relMan=p=>!!(p&&typeof p.id==="string"&&/^m\d+$/.test(p.id));
function relMS(p){return !!p&&typeof p==="object"&&!relRv(p)}
function relCourt(p){try{const C=S&&S.court;if(!C)return false;for(const k in C)if(C[k]===p)return true}catch(e){}return false}
function relKey(p){if(!p)return"";if(p===S)return"me";if(relRv(p))return p.id;if(p.sid!=null)return"s"+p.sid;if(relMan(p))return p.id;return typeof kOf61==="function"?kOf61(p):""}
function relHk(h,t){if(t===S)return"me";if(relRv(t))return relMan(h)||relCourt(h)?t.id:"r"+t.id;if(t.sid!=null&&!relMan(h)&&!relCourt(h))return t.sid;return relKey(t)}
function relMap(h,f){if(!h[f]||typeof h[f]!=="object")h[f]={};return h[f]}
/* OD:L352 "servants use only ONE word Thiện cảm; drop Lòng" + law 4 one core (r6 F5, Fix A): a servant toward ITS master is ONE store, s.loyal (j10) — the
   number the game already writes — for EVERY master: her (S.maid / her household) and an NPC consort (her maid v.maid / her household, ownerOf).
   relOwner = that master (court officials and men have none). Servant road: S is the maid there, her own bond stays S.srv.af (isSrv guard below). */
function relOwner(x){if(!relMS(x)||relMan(x)||relCourt(x)||typeof x.loyal!=="number")return null;if(S&&x===S.maid)return S;try{const o=typeof ownerOf==="function"?ownerOf(x):null;if(o)return o}catch(e){}
 return (typeof rivals!=="undefined"&&rivals||[]).find(v=>v&&v.maid===x)||null}
function relMaster(x,y){return !!y&&relOwner(x)===y}
function msAff(x,y){if(relMaster(x,y)&&!(y===S&&typeof isSrv==="function"&&isSrv()))return +x.loyal||0;if(relMS(x)){if(y===S){if(relMan(x))return +x.af||0;if(x.sid!=null&&S.srv&&S.srv.af&&typeof isSrv==="function"&&isSrv())return S.srv.af[x.sid]||0;return x.af&&typeof x.af==="object"?(+x.af.me||0):(+x.af||0)}
  const M=relMan(x)?x.afw:x.af;return M&&typeof M==="object"?(+M[relHk(x,y)]||0):0}
 const M=x===S?S.rl:x.rl;return (M&&M[relKey(y)])||0}
function msAffAdd(x,y,n){const c=v=>cl(v,-100,100);if(relMaster(x,y)&&!(y===S&&typeof isSrv==="function"&&isSrv())){x.loyal=cl((+x.loyal||0)+n,0,100);return}if(relMS(x)){if(y===S){if(relMan(x)){x.af=c((+x.af||0)+n);return}if(x.sid!=null&&S.srv&&S.srv.af&&typeof isSrv==="function"&&isSrv()){S.srv.af[x.sid]=c((S.srv.af[x.sid]||0)+n);return}
   if(typeof x.af==="number"){x.af=c(x.af+n);return}const M=relMap(x,"af");M.me=c((+M.me||0)+n);return}
  const M=relMap(x,relMan(x)?"afw":"af"),k=relHk(x,y);M[k]=c((+M[k]||0)+n);return}
 const M=x===S?S.rl:relMap(x,"rl"),k=relKey(y);M[k]=c((M[k]||0)+n)}
function msOan(x,y){if(relMS(x)){if(y===S)return +x.oan||0;return (x.ro&&+x.ro[relHk(x,y)])||0}const M=x===S?S.ro:x.ro;return (M&&M[relKey(y)])||0}
function msOanAdd(x,y,n){const c=v=>cl(Math.round(v),0,100);if(relMS(x)){if(y===S){x.oan=c((+x.oan||0)+n);return}const M=relMap(x,"ro"),k=relHk(x,y);M[k]=c((+M[k]||0)+n);return}
 const M=x===S?S.ro:relMap(x,"ro"),k=relKey(y);M[k]=c((M[k]||0)+n)}
/* range on read (review/net-build step 0): every writer of .rel / .rl / .ro / .oan is clamped here too, BAL.linkRange */
function relCl(v,R){return typeof v==="number"&&isFinite(v)?Math.max(R[0],Math.min(R[1],v)):0}
function aff(x,y){if(x===y)return 0;if(relMS(x)||relMS(y))return msAff(x,y);const R=BAL.linkRange.rl;if(x===S)return relCl(S.rl[y.id],R);if(y===S)return relCl(x.rel,R);return relCl(x.rl[y.id],R)}
function affAdd(x,y,n){if(!x||!y||x===y)return;/* review/oan-pace (b'): a fall of liking («ghét») = one bounded step per cause, capped per day (joanpace opDn, BAL.oanPace.ghet); then stat-pace below */if(n<0&&typeof opDn==="function"){n=-opDn(x,y,-n);if(!(n<0))return}if(relMS(x)||relMS(y))return msAffAdd(x,y,n);const R=BAL.linkRange.rl;/* ONE CORE (rv coop-flakes) */const pg=(now)=>typeof spG==="function"?spG("rel",x,now||0,n,spRk(y),"rel:"+(y===S?"me":y.id)):n;/* stat-pace: a rise of thiện cảm, ceiling at the rank of the one liked (jstatpace) */if(x===S){S.rl[y.id]=cl((S.rl[y.id]||0)+pg(S.rl[y.id]),R[0],R[1]);return}if(y===S){x.rel=cl(x.rel+pg(x.rel),R[0],R[1]);return}x.rl[y.id]=cl((x.rl[y.id]||0)+pg(x.rl[y.id]),R[0],R[1])}
function oan(x,y){if(!x||!y||x===y)return 0;if(relMS(x)||relMS(y))return msOan(x,y);const R=BAL.linkRange.ro;if(x===S)return relCl(S.ro[y.id],R);if(y===S)return relCl(x.oan,R);return relCl(x.ro[y.id],R)}
function oanAdd(x,y,n){if(!x||!y||x===y)return;/* review/oan-pace (b): a rise is one bounded step per cause, never stacked in one incident, capped per day (joanpace opUp, BAL.oanPace); then stat-pace below */if(n>0&&typeof opUp==="function"){n=opUp(x,y,n);if(!(n>0))return}if(relMS(x)||relMS(y))return msOanAdd(x,y,n);const R=BAL.linkRange.ro,c=v=>cl(Math.round(v),R[0],R[1]);const pg=(now)=>typeof spG==="function"?spG("oan",x,now||0,n,spRk(y),"oan:"+(y===S?"me":y.id)):n;/* stat-pace: a rise of oán (jstatpace) */if(x===S){S.ro[y.id]=c((S.ro[y.id]||0)+pg(S.ro[y.id]));return}if(y===S){x.oan=c((x.oan||0)+pg(x.oan));return}x.ro[y.id]=c((x.ro[y.id]||0)+pg(x.ro[y.id]))}
/* every man and servant who can hold a relation (the oán fade, the old-save fill, the Ân oán groups) */
function relMSAll(){const L=[],add=p=>{if(p&&typeof p==="object"&&!L.includes(p))L.push(p)};if(!S)return L;(S.men||[]).forEach(add);add(S.maid);(S.staff||[]).forEach(add);
 for(const k in (S.court||{}))add(S.court[k]);((S.thO&&S.thO.staff)||[]).forEach(add);(rivals||[]).forEach(v=>{add(v.maid);(v.staff||[]).forEach(add)});return L}
/* old saves (normAll): oán that the game already recorded as a grudge becomes the oán number (never invented): a man's m.grudge (jmen: the one who
   reported or threatened him), a servant's s.grudge (j24: punished without cause by her mistress), s.bullyBy (jagstaff: the servant who bullies her) */
function relMSMig(){if(!S||S.relMSv)return;S.relMSv=1;const B=BAL.relMS;
 for(const m of S.men||[]){if(!m||m.grudge==null||m.grudge===0||!(m.grudgeN>0))continue;const t=m.grudge==="me"?S:(rivals||[]).find(v=>String(v.id)===String(m.grudge));if(t&&!oan(m,t))oanAdd(m,t,B.grudge)}
 for(const s of relMSAll()){if(s.grudge&&s.oan==null){const o=s===S.maid?S:typeof ownerOf==="function"?ownerOf(s):null;if(o)oanAdd(s,o,B.srvGrudge)}
  if(s.bullyBy!=null){const b=servById(s.bullyBy);if(b&&!oan(s,b))oanAdd(s,b,B.bully)}}}
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);try{relMSMig()}catch(e){console.error('relMSMig',e)}return r}})();
function rel(x,y){return aff(x,y)}
/* a deed between a and t: both affections move; a harm leaves the victim with Oán (and a little on the doer) */
/* ONE NUMBER (MAIN 186 ruling 28/11 ~06:44Z, law 4): the affAdd wrappers (trust trait j28, titles jdh, feelings jfeel, mood jmood, stat pace) rescale a rise, so a line written
   AFTER a change prints what really moved: affGot(x,y,fn) = the change of x's thiện cảm for y while fn runs (rounded). */
function affGot(x,y,fn){let b=0;try{b=aff(x,y)}catch(e){}try{fn()}catch(e){console.error("affGot",e)}let a=b;try{a=aff(x,y)}catch(e){}return Math.round(a-b)}
function relAdd(x,y,n){if(!x||!y||x===y)return;affAdd(x,y,n);affAdd(y,x,n);const k=BAL.relOan;if(n<0){oanAdd(y,x,-n*k.hurt);oanAdd(x,y,-n*k.doer)}else{oanAdd(y,x,-n*k.mend)}}
function hostility(v,t){return oan(v,t)+Math.max(0,-aff(v,t))/2+(t===S?v.ghen/2:Math.max(0,(t.sung-v.sung)/3))+(rkOf(t)>=rkOf(v)?8:0)}

/* houses: Phi and above head a palace; lower consorts live under a head. Same house: cannot harm or win over each other */
function houseOf(p){if(rkOf(p)>=PAL_HEAD)return key(p);const h=p.resHead!=null?byKey(p.resHead):null;/* one lookup (perf, review ag-all-2 r2 B5) */return h&&(h===S?S.rank>=PAL_HEAD:h.alive&&!h.out&&rkOf(h)>=PAL_HEAD)?p.resHead:key(p)}
function sameHouse(a,b){return a!==b&&houseOf(a)===houseOf(b)}
function assignHouses(){const heads=consorts().filter(p=>rkOf(p)>=PAL_HEAD);for(const p of consorts()){if(rkOf(p)>=PAL_HEAD){p.resHead=null;continue}if(houseOf(p)!==key(p))continue;p.resHead=heads.length&&roll(70)?key(pick(heads.filter(h=>h!==p))||p):null}}

/* where everyone is this tuần: by role, trait, season and time of month */
function palaceOf(p){if(p===S)return"home";if(p.queen)return"kn";const h=byKey(houseOf(p));return h===S?"home":"r"+(h?h.id:p.id)}/* 2d3: the house head gone (died / out) → her own palace, never a crash (knStaff flake in agent_check / ag-rd) */
function placeWhere(){const W={},sea=SEASON[S.month-1],spring=sea==="Xuân"||sea==="Thu";
 const b=S.buoi||0;const e=b===1?b4EmpNoon():b===B4L?pick(["dtd","dtd","dtd",has("datinh")?"vuon":"dtd"]):has("chamchinh")?pick(["thu","thu","thu",spring?"vuon":"thu"]):b===0?pick(["thu","thu","dtd"]):pick([spring?"vuon":"dtd","thu","vuon"]);W.emp=wet()&&e==="vuon"?"thu":e;W.th=S.thDead?null:"tn";
 for(const v of rivals){if(!v.alive){continue}if(v.out){W[v.id]="lc";continue}if(v.confined){W[v.id]=palaceOf(v);continue}
  const L=[[palaceOf(v),b===B4L?80:b===1?60:35],["vuon",(b===2?(spring?40:20):b===1?b4NoonGarden():b===0?8:3)*(wet()?.25:1)],["tn",S.thDead?0:10],["tyv",v.preg||v.suc<50?15:3]];
  if(qOn()&&!v.queen)L.push(["kn",b===0?55:5]);if(v.queen)L[0][1]+=30;
  const w=L.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}W[v.id]=L[i][0]}
 S.where=W;npcEncounters()}
function whereOf(p){if(p===S)return S.place||"home";return (S.where||{})[p.id]||palaceOf(p)}
function together(a,b){return whereOf(a)===whereOf(b)}
function placeName(k){return placeOf(k).n}
function countAt(k){const W=S.where||{};let n=0;for(const v of rivals)if(v.alive&&!v.out&&W[v.id]===k)n++;if(W.emp===k&&["vuon","thu","dtd"].includes(k))n++;if(k==="tn"&&!S.thDead)n++;if(k==="home")n+=1+S.kids.filter(x=>x.alive).length;if(k==="tyv"||k==="ksp")n++;if(k==="lc")n+=Math.max(1,Math.min(3,rivals.filter(v=>v.alive&&v.out).length));return n}
/* NPCs who share a place meet: small talk or friction, by the same bars */
function npcEncounters(){const by={};for(const v of liveRivals(true)){const k=S.where[v.id];(by[k]=by[k]||[]).push(v)}
 for(const k in by){const L=by[k];for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const a=L[i],b=L[j];
  /* npc-purpose G2: two women in one place quarrel from a real grudge / jealousy, chat from liking, or pass each other by (no tie → nothing) */
  const W=BAL.ag.why.j9,xq=Math.max(0,oan(a,b)+oan(b,a)-W.oan0)+Math.max(0,(a.ghen||0)+(b.ghen||0)-W.ghen0);
  const k=npwPick(["q","c","n"],x=>x==="q"?(xq>0?W.q0+xq*W.q:0):x==="c"?W.c0+Math.max(0,aff(a,b)+aff(b,a))*W.c:W.none);if(k!=="q"&&k!=="c")continue;
  if(k==="q"){oanAdd(a,b,BAL.eff.j9.npcEncounters);oanAdd(b,a,BAL.eff.j9.npcEncounters_2);affAdd(a,b,BAL.eff.j9.npcEncounters_3);affAdd(b,a,BAL.eff.j9.npcEncounters_4)}else{affAdd(a,b,BAL.eff.j9.npcEncounters_5);affAdd(b,a,BAL.eff.j9.npcEncounters_6)}}}}

/* sending someone instead of going: same act, lower odds, the servant may be caught and confess */
let ACTX={a:null,pen:0};
/* «Giúp qua loa» (owner OD 18/11 ~21:15Z, the 4 answers of OD L1876 for every receiver): while a receiver does the order half-heartedly, the deed's odds − BAL.road.hp.half (the ONE qua-loa number, OD L1876).
   ONE flag for every road (her maid road srvDoOrder / ordOdds, an NPC servant's deed through runAct / actCtx, Việc chủ sai merit). */
var ORDHALF=0;function ordHalf(fn){const h0=ORDHALF;ORDHALF=BAL.road.hp.half;try{return fn()}finally{ORDHALF=h0}}
/* ONE act context (review/shown-odds-one-path, ORDER ROOT-52 18/11): the roll (runAct) and EVERY screen that prints an act's odds
   build the same ACTX here — sent-servant penalty (pen), her lá số on the act's domain (lotB via dom), fresh spy knowledge of the
   target (spyKnowB via t) — so the word on the card is the odds the roll uses (shown == rolled; dev/test/shown-odds.test.js).
   x = an extra part of one way of doing the act (e.g. plant "tại cung nàng": x.pen, x.here = done in person, no sent-servant pen), the same object on both sides. */
const ACT_NOSEND=["accuse","vp","xx","gift","steal","road","takeaway"];
/* DELEGATE-NOMG (owner OD 25/11 ~04:12Z): ACTSEND = she GIVES the act to someone (scheme «Giao cho người làm», jsgame) even while she stands with the
   target: the act is a sent act — the one sent does it, with the sent one's ability (sendPen: thiện cảm, nết, bậc; j29 sentPen), merit and the risk of being caught */
let ACTSEND=0;
function sendPen(sv,k){const K0=ACTK;ACTK=k;try{return sentPen(sv)-(sv?srk(sv)*3:0)}finally{ACTK=K0}}
function actSent(a,t,k,x){return !(x&&x.here)&&((ACTSEND&&a===S)||!together(a,t))&&!ACT_NOSEND.includes(k)}
function actCtx(a,t,k,sv,x){const sent=actSent(a,t,k,x);/* x.here: she does it herself on the spot (no servant sent) */if(sent&&sv===undefined)sv=bestSent(a);
 let pen=0;pen=sent?sendPen(sv,k):0;
 return{a,t,pen:pen+((x&&x.pen)||0)+(ORDHALF||0),dom:ACTDOM[k]}}
/* the odds an act's own roll will use, for display: ACT[k].o evaluated inside actCtx (then the one odds cap oddsCl) */
function actOdds(a,t,k,x){const A2=ACT[k];if(!A2||typeof A2.o!=="function")return null;const X0=ACTX,K0=ACTK;ACTK=k;ACTX=actCtx(a,t,k,undefined,x);
 try{const o=A2.o(a,t);return o==null||o>=100?o:oddsCl(Math.round(o))}finally{ACTX=X0;ACTK=K0}}
/* SHOWN ODDS FROZEN ACROSS THE TIME SPEND (review/shown-odds-r2, ORDER ROOT-52 18/11 15:30Z): a do-path that pays khắc (spend) and
   THEN rolls must roll the odds she saw. What runs inside the spend (khắc moves, roster / weather resync, world events) can move
   the odds between the card and the roll. ONE way for every such path: read the shown odds BEFORE the spend, then run the act
   inside fzRun(o,k,fn); the act's own success roll is aRoll(o,a) and takes those frozen odds instead of re-reading them (every own roll of
   that one act: e.g. batnat rolls twice on the same odds).
   runAct(S,…,k) moves them into its ACTX (ACTX.fz) when the key matches. Effects still happen after the spend; NPC rolls and every
   roll outside fzRun are unchanged (aRoll = roll there). dev/test/shown-odds-spend.test.js. */
let ACTFZ=null;
function fzRun(o,k,fn){const z0=ACTFZ;ACTFZ=o==null?null:{o:Math.round(o),k:k||null};try{return fn()}finally{ACTFZ=z0}}
/* an act's OWN success roll (side rolls — caught, a servant refuses, confess, punish — stay roll()); a = the actor when known */
function aOdd(o,a){/* the odds an act's own success uses: the frozen shown odds inside fzRun / runAct(ACTX.fz), else o (also for weights, e.g. jagstf2 stf2Bribe) */
 if(ACTX&&ACTX.fz!=null&&(a===undefined||a===ACTX.a))return ACTX.fz;
 if(ACTFZ&&(a===undefined||a===S)&&(!ACTX||!ACTX.a||ACTX.a===S))return ACTFZ.o;
 return o}
function aRoll(o,a){const z=aOdd(o,a);return z>=100||roll(z)}
function runAct(a,t,k,extra){const A2=ACT[k];if(!A2)return"";const sent=actSent(a,t,k);const where=together(a,t)?placeName(whereOf(a)):"";
 if(sameHouse(a,t)&&k!=="accuse")return a===S?"Người cùng cung, ngươi không thể ra tay hay lấy lòng. ":"";
 const sv=sent?bestSent(a):null;ACTX=actCtx(a,t,k,sv);if(a===S&&ACTFZ&&(!ACTFZ.k||ACTFZ.k===k)){ACTX.fz=ORDHALF?oddsCl(ACTFZ.o-ORDHALF):ACTFZ.o;ACTFZ=null}/* the odds she saw (fzRun) */let r="";try{r=A2.f(a,t,extra)}finally{ACTX={a:null,pen:0}}
 const harm=!["ally","gift","spy"].includes(k);
 if(sent&&sv&&!/bị lộ|bị bắt|phát giác|chặn kịp|từ chối/.test(r))servMerit(sv,2);if(sent&&harm&&roll(confessRisk(sv))){const n=evA(t,a,BAL.eff.j9.evN);r+=`<span class="kwside">${sv?sv.name:"Kẻ"} được ${NM(a)} sai đi bị bắt, khai ra chủ${n?`: ${NM(t)} nắm thêm ${balAb(BAL.eff.j9.evN)} chứng cứ`:""}.</span> `+servCaught(a,sv)}/* kwside: a side roll, never a «vì sao» of her rows (j63 kaWhyCl) */
 if(sent&&sv)r=r.replace(/\(sai người đi\)/,"");
 return r?(r.trim()+(sent?` (sai ${sv?sv.name:"người"} đi)`:where?` (tại ${where})`:"")+" "):""}
function odA(a,b){return oddsCl(Math.round(b+(a.suc<BAL.odds.weak.suc?-BAL.odds.weak.pen:0)-(ACTX.a===a?ACTX.pen:0)+(ACTX.a===a?lotB(a,ACTX.dom):0)+(ACTX.a===a&&ACTX.t&&typeof spyKnowB==="function"?spyKnowB(a,ACTX.t):0)))}

/* the talk system: topics, by traits and bars; the same chat repeated in a month gives less */
function chatF(v){S.chat=S.chat||{};const n=S.chat[v.id]||0;return 1/(1+n)}
function chatMark(v){S.chat[v.id]=(S.chat[v.id]||0)+1}
/* the praise odds of a speaker (BAL.talk: one rule for her and for an NPC who praises her, jgreet AG-MEET) */
function talkPraiseO(p){const T=BAL.talk.praise;return od(T.o+((p&&p.tai)||0)/T.div)}
function topicOpts(v){const f=chatF(v),g=n=>Math.max(1,Math.round(n*f)),third=liveRivals(true).filter(x=>x!==v).sort((a,b)=>aff(v,a)-aff(v,b))[0];const A=[];
 const same=sameHouse(S,v);
 /* AG-ALL-2e: the four talk topics are built ONCE by P3T.<k>(speaker, listener) (jagacts3) — her talk and an NPC↔NPC talk run the same card */
 const TK=BAL.talk;A.push(P3T.health(S,v));A.push(P3T.praise(S,v));if(third&&aff(v,third)<0)A.push(P3T.gossip(S,v,third));/* E-GAIN3-LIVE law 3 + law 1: offered only when the listener dislikes the one talked of (the NPC speaker's gate, jagacts3 cx3 talkGossip); else it was cost-only («nàng quý ngươi −», may be told on) and the one-tap «Trò chuyện» door showed that loss as Được */A.push(P3T.secret(S,v));
 A.push({n:"Nhờ giúp đỡ",o:100,inner:1,x:typeof rcvWord==="function"?`${rcvWord(v,S)} · nàng có thể giúp hết lòng, làm qua loa, từ chối, hoặc đem chuyện đi mách`:"",run:()=>{chatMark(v);return helpAsk(S,v).r}});
 const foe=liveRivals(true).filter(x=>x!==v&&oan(x,v)>=netTh(x,"act"))[0];
 A.push({n:"Cảnh báo nàng",o:100,x:foe?`có kẻ đang oán nàng: nàng ${pvQuy(v,g(TK.warn.hit),"quý ngươi")}`:`không có căn cứ: nàng quý ngươi -${TK.warn.miss}`,run:()=>{chatMark(v);if(foe){affAdd(v,S,g(TK.warn.hit));oanAdd(v,foe,TK.warn.oan);return `Ngươi nhắc ${v.name} coi chừng ${foe.name}. Nàng ${pvQuy(v,g(TK.warn.hit),"quý ngươi")}.`}affAdd(v,S,-TK.warn.miss);return `${v.name} nghi ngươi gây chia rẽ. Nàng quý ngươi -${TK.warn.miss}.`}});
 if(oan(v,S)>0){A.push({n:"Tạ lỗi",o:100,c:{danh:-1},x:`thành: oán ${balSg(spSee("oan",BAL.eff.j9.run_8))}`,run:()=>{chatMark(v);if(!netForgive(v,S))return netRefused(S,v,"hạ mình tạ lỗi với")+".";oanAdd(v,S,BAL.eff.j9.run_8);return `Ngươi hạ mình tạ lỗi. ${v.name} oán ${balSg(spSee("oan",BAL.eff.j9.run_8))}.`}});
  A.push({n:"Nhún nhường",o:100,c:{...BAL.ag.cx.humble.c},x:`thành: oán -${BAL.ag.cx.humble.oanDown} · nàng ${pvQuy(v,BAL.ag.cx.humble.aff,"quý ngươi")}`,run:()=>{if(!netForgive(v,S)){chatMark(v);return netRefused(S,v,"nhún nhường trước")+"."}oanAdd(v,S,-BAL.ag.cx.humble.oanDown);affAdd(v,S,BAL.ag.cx.humble.aff);chatMark(v);return `Ngươi nhún nhường trước ${v.name}. Oán -${BAL.ag.cx.humble.oanDown}, nàng ${pvQuy(v,BAL.ag.cx.humble.aff,"quý ngươi")}.`}})}
 A.push({n:"Giúp đỡ nàng",c:{bac:-20},o:100,x:`nàng ${pvQuy(v,BAL.eff.j9.run_11,"quý ngươi")} · oán ${balSg(spSee("oan",BAL.eff.j9.run_12))}`,run:()=>{relAdd(S,v,BAL.eff.j9.run_11);oanAdd(v,S,BAL.eff.j9.run_12);chatMark(v);return `Ngươi giúp ${v.name} việc khó. Nàng ${pvQuy(v,BAL.eff.j9.run_11,"quý ngươi")}.`}});
 if(same)return A.filter(a=>["Hỏi han sức khỏe","Bàn tán về "+(third?third.name:""),"Tạ lỗi","Nhún nhường","Nhờ giúp đỡ"].includes(a.n)).concat([{n:"Cùng cung",o:100,fix:1,lock:true,notice:1/* a notice, not a road (law-3 scan skips it) */,t:"không thể lấy lòng hay ra tay",x:""}]);
 return A}
/* harms that need the place: food served, the lotus pond, her palace while she is away, overhearing */
const FOOD=["kn","tn","home","dtd"];
function placeHarms(v,k){const H=[];if(sameHouse(S,v))return H;
 const act=(key2,n,x)=>{const a=ACT[key2];if(a&&a.ok(S,v))H.push({n,o:a.o?actOdds(S,v,key2):100,act:1,x:[a.x||"",fmt(a.c)].filter(Boolean).join(" · "),run:()=>runAct(S,v,key2)})};
 act("spy","Dò la");act("rumor","Tung tin đồn");
 if(FOOD.includes(k)||k[0]==="r"){act("poison","Bỏ độc vào trà nàng");act("musk","Bỏ xạ hương vào thuốc nàng")}
 if(k==="vuon"){H.push({n:"Đẩy nàng xuống hồ sen",o:odA(S,40+S.tamco/4),act:1,x:`Đức ${balSg(BAL.eff.j9.ducPushPond)} · lộ: bị phạt`,run:()=>pushPond(S,v)});act("pond","Đẩy con nàng xuống hồ")}
 H.push({n:"Ngáng chân nàng",o:odA(S,50+S.tamco/5),act:1,/* NB-b: trip() applies — win: Danh nàng danhTrip, relAdd(a,t,trip); seen: relAdd(a,t,trip_2) + chứng cứ evTrip */x:`${v.preg&&!v.hidden?"nàng đang có thai":"nàng bẽ mặt"}: Danh nàng ${balSg(BAL.eff.j9.danhTrip)}, ${pvRel(v,BAL.eff.j9.trip)} · bị thấy: ${pvRel(v,BAL.eff.j9.trip_2)}, nàng nắm ${balAb(BAL.eff.j9.evTrip)} chứng cứ`,run:()=>trip(S,v)});
 act("frame","Vu oan");act("vp","Tố vượt phẩm");act("xx","Tố xa xỉ");
 return H}
function pushPond(a,t){ap(a,{duc:BAL.eff.j9.ducPushPond});a.schemes=(a.schemes||0)+1;const c=caught(a,t,false,"đẩy "+NM(t)+" xuống hồ sen");if(c)return c;
 if(aRoll(odA(a,40+a.tamco/4),a)){ap(t,{suc:-25});if(t.preg&&!t.fake&&roll(60)){t.preg=0;t.hidden=false}relAdd(a,t,BAL.eff.j9.pushPond);return (t===S?"<span class=\"r\">Ngươi bị đẩy xuống hồ sen</span>":`${t.name} trượt chân rơi xuống hồ sen`)+`, ướt sũng, nhiễm lạnh. Sức ${balSg(BAL.eff.j9.pushPond_2)}${t.preg===0?"":""}. `+dieIf(t,"nhiễm lạnh mà mất")}
 ap(a,{danh:-8});relAdd(a,t,BAL.eff.j9.pushPond_2);convict(a,t.queen||(typeof queenP==="function"&&queenP()===t)?"xô Hoàng hậu xuống hồ sen":"xô ngã phi tần","pushp",t,2);return `<span class="r">${NMc(a)} xô ${NM(t)} bị người thấy.</span> `}
function trip(a,t){ap(a,{duc:-BAL.actDuc.trip});if(aRoll(odA(a,50+a.tamco/5),a)){ap(t,{danh:BAL.eff.j9.danhTrip});let r=`${NMc(t)} vấp ngã giữa chốn đông người. Danh ${balSg(BAL.eff.j9.danhTrip)}. `;if(t.preg&&!t.fake&&roll(25)){t.preg=0;t.hidden=false;ap(t,{suc:-15});r+=`<span class="r">${NMc(t)} động thai.</span> `}relAdd(a,t,BAL.eff.j9.trip);return r}
 relAdd(a,t,BAL.eff.j9.trip_2);evA(t,a,BAL.eff.j9.evTrip);return `${NMc(t)} thấy rõ ${NM(a)} ngáng chân. `}
function overhear(k){const here=liveRivals(true).filter(v=>whereOf(v)===k);if(here.length<2)return"";const v=pick(here);if(aRoll(od(BAL.ag.wit.hear+eyes(S)*BAL.ag.wit.mat))){return evA(S,v,BAL.eff.j9.evOverhear)?`Ngươi nghe lén ${v.name} nói chuyện: chứng cứ ${balSg(BAL.eff.j9.evOverhear)}.`:`Ngươi nghe lén ${v.name} nói chuyện: không có gì sai trái, chỉ biết ${harmTxt(v)}.`}return "Không nghe được gì."}

/* the palace map */
const MAPL=[["thu","dtd","tn"],["kn","vuon","ksp"],["tyv","lc","home"]];
function mapHTMLgrid(){const W=S.where||{};const dis=k=>!walkOk(travel(S.place,k))||(S.confined&&k!=="home")||S.dead||S.place===k;
 const tile=(k,n,sc,sub)=>`<button class="mtile" data-go="${k}" ${dis(k)?"disabled":""} style="${(SCIMG[sc]||k==="home")?`background-image:url(img/${k==="home"&&sc!=="maid"?"tam-cung-dem":SCIMG[sc]}.webp)`:""}"><span class="mband">${S.place!==k&&!walkOk(travel(S.place,k))?`<span class="mchip">${used>=BAL.time.khac?"hết khắc":`đi ${travel(S.place,k)} khắc`}</span>`:""}<b>${n}</b><span>${countAt(k)?silChip(countAt(k)):"vắng"} · ${S.place===k?"đang ở đây":typeof accWalkTxt==="function"?accWalkTxt(k):travel(S.place,k)+" khắc"}</span>${sub&&k!=="home"?`<small>${sub}</small>`:""}</span></button>`;
 let h=`<div class="ph"><span>Đi gần ${BAL.walk.near} khắc, xa ${walkFarK()} khắc · còn <b>${BAL.time.khac-used}</b> ${pips(BAL.time.khac-used)}. Đường xa hơn số khắc còn trong buổi thì đi tiếp sang buổi sau, miễn trong ngày còn đủ khắc; riêng buổi tối không đi qua đêm.</span>${S.confined?`<span class="r">Cấm túc ${S.confined} tháng</span>`:""}</div><div class="pmap">`;
 for(const row of MAPL)for(const k of row){if(k==="kn"&&!qOn()){h+=`<div class="mtile off"><b>Càn Ninh cung</b><span>bỏ trống</span></div>`;continue}const P=placeOf(k);h+=tile(k,k==="home"?"Tẩm cung":P.n,P.sc,k==="home"?"không tốn việc":"")}
 h+=`</div><div class="pmap two">`+liveRivals(false).filter(v=>palaceOf(v)!=="home").map(v=>{const k="r"+v.id;return tile(k,typeof palName==="function"?palName(k):"Cung phi tần","rv","")}).filter((x,i,a)=>a.indexOf(x)===i).join("")+`</div>`;
 return h}
/* the 'Quan hệ' tab: the selected person's ties to everyone */
let relSel="me";

/* moving costs time: near 1 khắc, far 2 */
function mapPos(k){for(let r=0;r<MAPL.length;r++){const c=MAPL[r].indexOf(k);if(c>=0)return[r,c]}if(k[0]==="r"){const i=liveRivals(false).findIndex(v=>"r"+v.id===k);return[3+Math.floor(Math.max(0,i)/3),Math.max(0,i)%3]}return[2,2]}
/* the walk rule (owner 11/15 01:35Z): she may go anywhere whose WALK fits in the khắc left (arriving with 0 is fine: she sees who is
   there, next buổi she starts there). Never "hết khắc" unless 0 are left; otherwise the reason is the walk cost. */
function walkOk(tc){return !!S&&!S.dead&&used+tc<=BAL.time.khac}
function walkWhy(tc){const left=Math.max(0,BAL.time.khac-used);return left<=0?"hết khắc":`đi ${tc} khắc, còn ${left}`}
/* walk spill (owner 11/15 09:05Z): a walk longer than the khắc left is not a dead end. She pays what is left now, the buổi turns
   (normal end-of-buổi processing: NPCs move, news), the rest of the walk is paid from the new buổi's khắc and she arrives there in
   the new buổi, seeing who is there then (1 khắc left in the morning, 3-khắc walk → 1 now + 2 in the afternoon, arrives with 2 left).
   Not across the night: from buổi tối the existing night rule stands (wait until morning). The place must be open in the new buổi.
   While the walk is under way, travel(from,k) in the new buổi returns the part still to walk. NPCs do not pay walk costs (placeWhere). */
function walkSpill(k,o){if(!S||S.dead||S.out||S.confined||S.mg||!k||k===S.place)return null; /* co-op too (time-spill sweep 16/11): her buổi ends with `bend`, the walk finishes when the room turns (walkSpillTick waits for it) */
 const b=S.buoi||0;if(b>=BUOI.length-1)return null;const tc=travel(S.place,k),left=Math.max(0,BAL.time.khac-used),pre=(o&&o.pre)||0;if(pre+tc<=left)return null;
 let a={ok:true};if(!(o&&o.pass)&&typeof accessOf==="function"){try{S.buoi=b+1;a=accessOf(S,k)||{ok:true}}catch(e){}finally{S.buoi=b}}
 const now=Math.max(0,left-pre);return{k,tc,now,rest:tc-now,b:b+1,ok:!!a.ok,why:a.why||""}}
/* o.pass: she was let in this buổi (asked / sneaked / led in): the pass holds when she arrives next buổi. o.pre: khắc already spent here first */
function walkSpillGo(k,o){const P=walkSpill(k,o);if(!P||!P.ok||Q.length)return;window.__walkSpill={k,from:S.place,rest:P.rest,b:P.b,tries:0,pass:!!(o&&o.pass),wk:wkKey()};
 spend(P.now);nextBuoi();walkSpillTick()}
/* ONE "go there" rule for every button that walks her to a place (map, list, person cards, generic data-go) — owner-bug 16/11 18:30Z
   "chỗ nào cũng khóa hết" (review/dudo-lock): a walk longer than the khắc left is never a lock while walk spill can take her there.
   walkBlock(k,tc) = the reason a go-button is disabled ("" = may go now, or arrives next buổi); walkLate(k,tc) = true when she arrives
   next buổi; walkGo(k) = go now, or spill into the next buổi. */
function walkBlock(k,tc){if(tc==null)tc=travel(S.place,k);if(walkOk(tc))return"";const P=walkSpill(k);return P&&P.ok?"":walkWhy(tc)}
function walkLate(k,tc){if(tc==null)tc=travel(S.place,k);if(walkOk(tc))return false;const P=walkSpill(k);return !!(P&&P.ok)}
function walkGo(k){if(!S||S.dead||Q.length)return;if(k===S.place||S.confined||S.out){goTo(k);return}const tc=travel(S.place,k);if(walkOk(tc)){goTo(k);return}if(walkLate(k,tc))walkSpillGo(k)}
function walkSpillTick(){const W=window.__walkSpill;if(!W)return;if(!S||S.dead){window.__walkSpill=null;return}
 const md=document.getElementById("modal");if(Q.length||(md&&!md.hidden)||S.mg){setTimeout(walkSpillTick,300);return}
 const b=S.buoi||0;
 const coop=!!(window.COOPW&&COOPW.on);if(coop&&W.wk&&W.wk!==wkKey()){window.__walkSpill=null;return}
 if(b===W.b-1&&S.place===W.from&&(W.tries<3||coop)){W.tries++;if(W.tries<=3)nextBuoi();setTimeout(walkSpillTick,coop?600:300);return} /* the buổi did not turn yet (an event card came first; co-op: the friend has not ended the buổi yet) */
 if(b!==W.b||S.place!==W.from){window.__walkSpill=null;return}
 if(W.pass&&typeof accGrant==="function")accGrant(S,W.k);
 goTo(W.k);if(S.place===W.k)window.__walkSpill=null;
 /* review/dudo-lock: the place shut while she walked (the rule read the new buổi before NPCs moved, e.g. a maid's mistress left): never a
    silent stop at home — the place card says why, the walk spent is not refunded (she did walk) */
 else if(!Q.length){window.__walkSpill=null;try{if(typeof j77Card==="function")j77Card(W.k)}catch(e){}}}
/* khắc of a far walk right now (one-core: texts print this, BAL.walk) */
function walkFarK(){return BAL.walk.far}
/* travel(a,b,p): the walk a→b for walker p (default: her, S; NPC callers pass the person, or null for a bare map distance).
   walk-cost r3 (law 1, law 4): a walker under punishment (jface «đi chậm») walks BAL.walk.pen khắc longer — per person, never her penalty
   on an NPC's road; the half-walk still owed after a spill (__walkSpill rest) already holds it. */
function walkSlow(p){return 0}
function travel(a,b,p){if(a===b)return 0;if(p===undefined)p=S;{const W=window.__walkSpill;if(W&&S&&p===S&&(S.buoi||0)===W.b&&a===W.from&&b===W.k)return W.rest}const [r1,c1]=mapPos(a||"home"),[r2,c2]=mapPos(b);const far=Math.abs(r1-r2)+Math.abs(c1-c2)>1;let s=0;try{s=walkSlow(p)||0}catch(e){s=0}return (far?BAL.walk.far:BAL.walk.near)+s}
function nextBuoi(){if(!S||S.dead||Q.length||S.mg)return;if((S.buoi||0)>=B4L){S.buoi=0;endTurn();return}
 S.buoi=(S.buoi||0)+1;used=0;const ev=b4NpcActs()?rivalsBuoi():"";if(S.dead){render();return}placeWhere();popIdx=null;popMsg="";
 if(S.out)coldVisit();else if(S.place!=="home"){const k=S.place;S.place="home";const u=used;/* review stage-here r4 (OD 18/11 ~19:45Z: her room comes back only at a new day or when she walks home): a card the buổi turn already queued (rivalsBuoi) must not make goTo refuse and leave her at home — hold the queue aside for this refresh, then put it back first */const q0=Q.splice(0);try{goTo(k)}finally{Q.unshift(...q0)}used=u}else S.visit={k:"home",people:homePeople(),talked:false,tk:{}};
 if(ev)Q.push({t:"Tin trong cung buổi này",kind:"news",h:`<p class="past">${when()} · ${BUOI[S.buoi]}</p><p>${ev}</p>`});curtain();render()}
A("pushp","Đẩy xuống hồ sen",{c:{get duc(){return BAL.eff.j9.ducPushPond}},ok:(a,t)=>whereOf(a)==="vuon"&&together(a,t),o:a=>odA(a,40+a.tamco/4),f:(a,t)=>pushPond(a,t)});
A("trip","Ngáng chân",{c:{get duc(){return -BAL.actDuc.trip}},ok:(a,t)=>together(a,t),o:a=>odA(a,50+a.tamco/5),f:(a,t)=>trip(a,t)});
