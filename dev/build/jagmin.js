/* ================= jagmin: MINISTER AGENTS — every court memorial has a real living official with his own goal =================
   PARKING LOT #7 (18/11 04:10Z, C-AG #9 from NPC-PURPOSE: "memorials today fire with no official behind them; a real minister agent with
   goals"), job root63-cag20 JOB 4. Laws: 6(b) REAL PEOPLE (every memorial names a living official who exists in S.trieu), OD:L1386 (NPC =
   agent: choice by its own goal + nature, jmind's human slip OD:L1248, no flat roll for WHO), 4 ONE CORE (numbers BAL.ag.min, jbal2),
   1 TWO-WAY (she and every NPC consort may court the censor by the same gift deed), 8 HISTORY EXPERT (19/11: head of the censorate =
   Tả đô ngự sử of the Đô sát viện, Ming/Qing; memorials on hearsay "phong văn tấu sự" are historical, so a charge may prove false).
   No second agent system: the officials reuse the agent engine's gates and pick (agOn host-only / co-op guest off, jmind mindPick,
   agCap), the j55 court acts (tdGift, ccRisk, tdImpeach …) and the jnet nết every person already has.
   PEOPLE  the five house heads S.trieu.H (j55, already living: name, age, standing pow, regard af, nết) + ONE new official, the censor
           S.trieu.ns (Tả đô ngự sử, Đô sát viện): drawn once (lazy, old saves get him on first read), ages each year, regard fades.
   GOAL    from his nết (BAL.ag.min.gT, first match): quyen (Tham vọng) · nha (Vì gia tộc) · loi (Vì mình) · liem (Trọng nghĩa / Thật thà /
           Cương trực) · else le (the censor: liem). Shown on his card in Triều đình and in every memorial he speaks.
   MONTH   (replaces the plain weighted pick of tdSoMonth when agOn): every official lists the memorials the court state allows him (j55's
           own gates: praise of a house he is friendly with, lập đích for the queen's house, impeachment of a consort's father from a
           feuding house, tuyển tú for his strong house, can-chính impeachment = the censor), weighs each by fit[goal][kind] × his stake,
           and picks his own with mindPick (his slip stays among his own goal-valid memorials); when several want to speak, standing
           (pow) weighs whose memorial reaches the throne (mindPick again); TD.so still decides whether one reaches it this month.
           The chosen speaker / target go to j55 through window.MINP (tdImpPick, tuyển tú house, can-chính consort, the texts).
   REGARD  an official's regard for a consort (af, from gifts, in-law ties …) makes him spare her: impeachment stake × (1 − af/100); the
           censor's regard also lowers her can-chính risk (ccRisk × (1 − afW × af/100), previews included: ONE CORE).
   Off: BAL.ag.min.on = 0, BAL.ag.on = 0 or __agOff → the old j55 path. Test hooks: minForceSo(), minCands().
   ===================================================================================================================== */
const MINC="Đô sát viện";TDOFF[MINC]="Tả đô ngự sử";
const MING={quyen:"muốn nhà mình lấn át các nhà khác",nha:"lo thanh thế nhà mình trong cung",loi:"lo lợi riêng, ai biếu thì nể",liem:"giữ phép nước, ghét kẻ tham nhũng",le:"giữ lễ pháp, trọng đích thứ"};
window.MINP=null;
function minOn(){try{return !!(typeof agOn==="function"&&agOn()&&BAL.ag.min&&BAL.ag.min.on&&tdOn())}catch(e){return false}}
/* the censor: one living official, drawn once */
function minNs(){const T=trS();if(!T)return null;if(T.ns&&T.ns.name)return T.ns;const N=BAL.ag.min.ns;
 /* a name no living person shares (surname, given name, last word): the name mask (j61) reads names word by word */
 let P=[S].concat(rivals||[]).concat(CLANS.map(c=>T.H[c]).filter(Boolean));try{if(typeof k61All==="function")P=P.concat(k61All())}catch(e){}P=P.filter(p=>p&&p.name);
 const us=new Set(P.map(p=>tdSur(p.name))),ug=new Set(P.map(p=>{const n=String(p.name);return n.slice(tdSur(n).length+1)})),ul=new Set(P.map(p=>String(p.name).split(" ").pop()));
 const sur=SURN.filter(x=>!us.has(x)),giv=MALEN.filter(x=>!ug.has(x)&&!ul.has(String(x).split(" ").pop()));
 const h={c:MINC,ns:1,isMin:1,name:pick(sur.length?sur:SURN)+" "+pick(giv.length?giv:MALEN),age:N.age[0]+R(N.age[1]),sex:"m",pow:N.pow[0]+R(N.pow[1]),sk:N.sk[0]+R(N.sk[1]),af:{}};
 T.ns=h;return h}
/* every official of the court (the five heads + the censor) */
function minAll(){const T=trS();if(!T)return[];return CLANS.map(c=>T.H[c]).filter(Boolean).concat([minNs()])}
function minGoal(h){if(!h)return BAL.ag.min.dflt;if(h.goal&&MING[h.goal])return h.goal;const M=BAL.ag.min;let t=[];try{t=traitsOf(h)||[]}catch(e){}
 let g=null;for(const [w,k] of M.gT)if(t.includes(w)){g=k;break}h.goal=g||(h.ns?M.nsDflt:M.dflt);return h.goal}
function minAf(h,p){return h&&h.af?cl(h.af[key(p)]||0,-100,100):0}
function minSpare(h,p){return Math.max(0,1-Math.max(0,minAf(h,p))/100)}
/* the memorials the court state allows, each with its speaker, target and stake (j55 gates, unchanged) */
function minCands(){const T=trS(),M=BAL.ag.min,ns=minNs();const L=[];if(!T)return L;const add=(k,h,s,x)=>{if(h&&s>0){const w=(M.fit[minGoal(h)]||{})[k]*s;if(w>0)L.push(Object.assign({k,h,s,w},x||{}))}};
 if(T.praise&&T.H[T.praise])for(const h of minAll()){if(h.c===T.praise)continue;const rel=h.ns?0:tdRel(h.c,T.praise);if(rel>=0)add("praise",h,(M.praise+rel)/M.praise,{c:T.praise})}
 if(tdDichOpen()){
  const q=queenP();const c=q&&q!==S?tdHouse(q):S.rank>=7?tdHouse(S):null;const h=T.H[c||"Lễ bộ"];if(h)add("dich",h,h.pow/M.dich)}
 for(const t of consorts()){const cT=tdHouse(t);if(!cT)continue;for(const cA of CLANS){if(cA===cT)continue;const h=T.H[cA];if(!h)continue;const rel=tdRel(cA,cT);
  const f=(rel<=-BAL.cut.clanRel?M.imp.deep:rel<0?1:0)*nv(h,"feudW");if(f<=0)continue;const evd=Math.max(0,...tdMembers(cA).map(m=>deG(m,t)));
  const cl0=h.clean&&h.clean[key(t)];if(cl0!=null&&S.turn-cl0<M.imp.keep)continue;/* his own inquiry found her father clean: he does not repeat it soon */
  add("imp",h,f*(1+evd*M.imp.ev)*(minGoal(h)==="liem"&&evd<1?M.imp.noEv:1)*minSpare(h,t),{t,imp:[cA,t,f]})}}
 const ty=CLANS.filter(c=>T.H[c]&&T.H[c].pow>=M.tuyen.pow);if(ty.length&&T.tyY!==S.year&&liveRivals(true).length+1<BAL.harem.cap-1&&roomFor("consort"))for(const c of ty)add("tuyen",T.H[c],(T.H[c].pow-M.tuyen.p0)/M.tuyen.d,{c});
 for(const p of consorts())if((p.cc||0)>=2)add("cc",ns,(p.cc||0)*(1-M.ns.afW*Math.max(0,minAf(ns,p))/100),{t:p});
 return L}
window.minCands=minCands;
/* each official picks his own memorial; standing decides whose reaches the throne */
function minPick(){const L=minCands();if(!L.length)return null;const M=BAL.ag.min,by=new Map();for(const o of L){const k=o.h.ns?"ns":o.h.c;if(!by.has(k))by.set(k,[]);by.get(k).push(o)}
 const own=[];for(const [,O] of by){const o=mindPick(O.map(x=>[x,x.w]),null);if(o)own.push(o)}
 return mindPick(own.map(o=>[o,o.w*(M.spk.base+(o.h.pow||0)/M.spk.pow)]),null)}
/* texts: the speaker with his goal; the censor by name */
function minWhy(h){const P=window.MINP;return P&&P.h===h?` (${MING[minGoal(h)]})`:""}
function minBy(d){const P=window.MINP;return P&&P.h?`${TDOFF[P.h.c]} ${P.h.name}${minWhy(P.h)}`:d}
function minNsName(d){try{if(!minOn())return d;const h=minNs();return h?`${TDOFF[MINC]} ${h.name}`:d}catch(e){return d}}
function minGoalChip(h){try{if(!minOn()||!h)return"";return chip(`Chí: ${MING[minGoal(h)]}`)}catch(e){return""}}
(function(){const f0=tdSoMonth;tdSoMonth=function(force){if(force||!minOn())return f0.apply(this,arguments);const T=trS();if(S.turn-T.soT<TD.soGap)return"";
 const pk=minPick();if(!pk||!roll(TD.so))return"";window.MINP=pk;let r="";try{r=f0(pk.k)}finally{window.MINP=null}
 if(r){const h=pk.h;h.so=[S.turn,pk.k];if(pk.k==="imp"&&pk.t&&!tdDadT(pk.t)){h.clean=h.clean||{};h.clean[key(pk.t)]=S.turn}}return r}})();
window.minForceSo=function(){const T=trS();const g=T.soT,r0=roll;T.soT=-99;let r="";try{roll=o=>o===TD.so?true:r0(o);r=tdSoMonth()}finally{roll=r0;if(!r)T.soT=g}return r};
/* the censor's regard lowers her can-chính risk (previews read the same ccRisk) */
(function(){const c0=ccRisk;ccRisk=function(a){const r=c0.apply(this,arguments);try{if(!minOn())return r;const ns=minNs();return Math.round(r*(1-BAL.ag.min.ns.afW*Math.max(0,minAf(ns,a))/100))}catch(e){return r}}})();
/* the censor's own month: he ages, his regard fades; a worried NPC consort courts him by the same gift deed she may use */
(function(){const f0=tdMonth;tdMonth=function(){let ev=f0.apply(this,arguments)||"";try{if(!minOn())return ev;const h=minNs(),M=BAL.ag.min;if(!h)return ev;
 if(S.month===1&&S.tuan===0)h.age=(h.age||50)+1;for(const k in h.af){const v=h.af[k];const d=nv(h,"afFade");h.af[k]=v>0?Math.max(0,v-d):Math.min(0,v+d);if(!h.af[k])delete h.af[k]}
 for(const v of liveRivals(true)){if(v.confined||v.out||!(v.cc>0)||v.bac<BAL.bacFee.tdGift||tdBacks(h,v))continue;
  if(!roll(agCap(ccRisk(v)/M.ccMax*M.npcGift)))continue;const r=tdGift(v,h);if(r)ev+=seenNPC(v,v,r)||""}}catch(e){agErr("jagmin month",e)}return ev}})();
/* his face joins the faces in use (the heads' rule, j55) */
(function(){const f0=facesPresent;facesPresent=function(){const U=f0.apply(this,arguments);try{const T=S&&S.trieu;if(T&&T.ns&&T.ns.fc)U.add(T.ns.fc)}catch(e){}return U}})();
/* his card in the Triều đình view: the same card as a house head (j55 tdHTML), gift button = the same deed */
function minNsCard(){const h=minNs();if(!h)return"";const f=pMin(h);const af=minAf(h,S);
 const busy=tdBusy();
 const gw=busy||(S.bac<BAL.bacFee.tdGift?"thiếu bạc (cần "+BAL.bacFee.tdGift+")":"");
 const line=`${word(giftO(S,h))} · tốn: Bạc -${BAL.bacFee.tdGift} · thành: người ấy quý ngươi +20; càng quý, ngươi càng khó bị hặc can chính · hỏng: mất bạc${hasT(h,"Cương trực")?", ông tố ra ngoài: can chính nặng thêm":""} · kèm: ${ccLine(S)}`;
 return `<div class="rival tdh"><div class="top tdtop">${mdH(f,"sm")}<div class="tdn"><b>${MINC}</b><em>${TDOFF[MINC]} ${h.name} · ${h.age} tuổi · ${netTxt(h)}</em></div></div>
  <div class="tdq">${sbar("Thiện cảm với ngươi",af,"tdaf")}</div>
  <div class="chips">${minGoalChip(h)}${chip("Dâng sớ hặc can chính, hặc tham ô")}</div>
  <div class="rbtn">${tdActBtn(`data-td="gift" data-tc="${MINC}"`,`Biếu quà, gửi thư cho ${h.name}`,line,gw)}</div></div>`}
(function(){const f0=tdHTML;tdHTML=function(){const h=f0.apply(this,arguments);try{if(!minOn())return h;const i=h.indexOf("<h3>Tin triều đình</h3>");if(i<0)return h;return h.slice(0,i)+minNsCard()+h.slice(i)}catch(e){agErr("jagmin card",e);return h}}})();
/* a memorial a card quotes by office ("Thượng thư Hộ bộ xin …") names the living holder of that office (law 6b); d = the old words */
function minOff(c,d){try{if(!tdOn())return d;const h=trS().H[c];return h&&h.name?`${TDOFF[c]} ${h.name}`:d}catch(e){return d}}
/* the road card's grain levy memorial (j67 «Triều đình đòi trưng thu thóc») is spoken by the living Hộ bộ thượng thư: token {hobo} */
try{if(typeof TOK67==="object"&&TOK67)TOK67.hobo=()=>minOff("Hộ bộ","Có đại thần")}catch(e){}
/* he is one of the people of the world (j61 registry: knowledge level, name mask, kind "off" by isMin), like the five heads */
(function(){if(typeof k61All!=="function")return;const f0=k61All;k61All=function(){const L=f0.apply(this,arguments);try{const T=S&&S.trieu;if(T&&T.ns&&T.ns.name&&!L.includes(T.ns))L.push(T.ns)}catch(e){}return L}})();
