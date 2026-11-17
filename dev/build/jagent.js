/* ================= jagent: NPC AGENT LOOP — every NPC plays the game like a player (AG1 + AG1b) =================
   Owner OD:L1386 (16/11 17:50Z): every NPC is an agent playing the game like a player: same actions, same rules, same odds, choices driven
   by its own needs, personality and road; no special bars, gates or flat random rolls for NPC outcomes. Design: dev/handover/reports/npc-agent.md
   §3.1 (loop), §3.5 (witness), §4 (perf). Numbers: BAL.ag (jbal2.js); the deeds' costs/odds/gains: BAL.tw (jtwoway) and j75 npcEffortKind.
   ONE LOOP, once per buổi, HOST ONLY (a co-op guest never runs it: the world is the host's, like rivalsTurn / mlGuest):
   - agents = everyone in the palace record (consorts, maids, eunuchs, elders, the Emperor, Thái hậu). AG1 scores CONSORTS; the others keep
     their j95 schedule as their buổi ("routine", one option, no scoring: npc-agent §4 shortcut) until AG2 (Emperor) / AG3 (maids) add theirs.
   - a consort's options = the deeds she could tap if she were the player: the shared deed table TW (jtwoway: Thỉnh an Thái hậu / Hoàng hậu,
     cầu tự, đút lót Kính sự phòng, giả bệnh, giả mang thai, báo tin có thai, khoe quà, soát quà, and the social deeds of the SOC menu with
     their target), her Sủng deck act (j75 npcEffortKind: múa / đàn / cờ / a small gift) and "keep her schedule". Each pays the player's cost
     (Sức / bạc / Danh / Đức via twPay / ap) and rolls the player's odds (odA). The gates are the existing ones: the deed's req + cost
     (twCanPay), SOC's ok (danger band), the motive gate motiveOK (j95), the place's access rule (j95acc), confinement.
   - needs come from stats she already has (no new bar): Sủng, Thái hậu / Hoàng hậu regard, Danh, Đức, a child, friends, spite (hostility),
     safety (danger bands), rest (Sức). Each need = the gap to what her ROAD wants (BAL.ag.goal × BAL.ag.road[origin]).
   - utility = Σ need × gain × odds − certain costs, × mindW(person, tag) (jmind: abilities, strength, virtues); the pick is mindPick
     (weighted, with jmind's human slip, OD:L1248: never the AI-best option).
   - every act carries a WHY (her top need + her road) into the people ledger (S.roster.acts, j95actLog shape) and S.ag.log.
   AG1b WITNESS: the chosen deed is written into the ledger at its PLACE and KHẮC before its effect lands (S.ag.pend). When she stands
   there at that khắc, a kit event card shows the real scene with reactions at real odds (Nghe lén = the player's Nghe lén câu chuyện odds,
   Tham gia = the same deed for her with her cost and odds, Bỏ đi, Mặc kệ); otherwise it lands when the khắc passes. Two-way: when SHE does a
   shared deed, the consorts the ledger has at her place that khắc witness it and react by the same choice (hear / join / ignore).
   Perf: window.__agMs (last tick), __agN (agents), agPerf() → p95 over the last BAL.ag.perf.n ticks; budget BAL.ag.perf.p95 ms.
   Off switch for measuring: BAL.ag.on=0 or window.__agOff=1 (old drips). Loaded last (after j95/j95b/j95c, jtwoway, jmind, j75, jcoopworld).
   ===================================================================================================================== */
const AG={inTick:0,errs:[],ms:[],bt:[],q:null,tm:{needs:0,opts:0,sync:0,land:0},stat:{tick:0,slice:0,qdrop:0,acts:0,by:{},wit:0,witNpc:0,land:0,drop:0,mute:0}};
function agErr(w,e){try{AG.errs.push(w+": "+(e&&e.message||e));if(AG.errs.length>40)AG.errs.shift();console.error("jagent",w,e)}catch(x){}}
function agGuest(){try{return !!(window.COOPW&&COOPW.on&&COOPW.seat!=="a")}catch(e){return false}}
function agOn(){try{return !!(typeof S!=="undefined"&&S&&!S.dead&&BAL.ag&&BAL.ag.on&&!window.__agOff&&!agGuest())}catch(e){return false}}
function agOwn(k){return !!(BAL.ag&&BAL.ag.own.includes(k))}
function agZ(){const z=S.ag=S.ag||{};z.pend=z.pend||[];z.log=z.log||[];return z}
function agKey(){return wk()+"-"+(S.buoi||0)}
function agRec(){try{return j95on()&&S.roster&&S.roster.key===j95key()?S.roster:null}catch(e){return null}}
function agKh(){try{return j95kh()}catch(e){return 0}}
function agPw(L){const s=L.reduce((a,x)=>a+x[1],0);let r=Math.random()*s;for(const x of L){r-=x[1];if(r<=0)return x[0]}return L[L.length-1][0]}

/* ---------------- ROAD: the origin road of an NPC woman (data, not a bar) ---------------- */
function agOrg(v){try{if(v.nr&&v.nr.o)return v.nr.o;if(v.ag&&v.ag.o)return v.ag.o;const T=(BAL.nroad&&BAL.nroad.org)||BAL.ag.org;let c="";try{c=clanOf(v)}catch(e){}
  const mine=S.origin&&S.origin.k;let L=(T[c]||T[""]).filter(x=>!(x[0]===mine&&BAL.ag.uniq.includes(x[0])));if(!L.length)L=T[""];
  const o=agPw(L);v.ag=v.ag||{};v.ag.o=o;return o}catch(e){return"_"}}
function agOrgName(o){try{const x=ORIGINS.find(z=>z.k===o);return x?x.n[0].toLowerCase()+x.n.slice(1):""}catch(e){return""}}

/* ---------------- NEEDS (from stats she already has) ---------------- */
function agNeeds(v){const G=BAL.ag.goal,W=BAL.ag.road[agOrg(v)]||BAL.ag.road._;const gap=(g,x)=>cl((g-(x||0))/g,0,1);
 const O=others(v).filter(x=>x&&x!==v);let fr=0,sp=0,sf=0;
 for(const x of O){if(aff(v,x)>=G.friend)fr++;sp=Math.max(sp,agSpite(v,x))}
 for(const x of liveRivals(true))if(x!==v)sf=Math.max(sf,bandOf(danger(x,v)));
 let q=null;try{q=queenP()}catch(e){}
 return{sung:gap(G.sung,v.sung)*W.sung,th:S.thDead?0:gap(G.th,v.th)*W.th,hh:q&&q!==v&&!v.queen?gap(G.hh,v.hh)*W.hh:0,danh:gap(G.danh,v.danh)*W.danh,duc:gap(G.duc,v.duc)*W.duc,
  kid:!sonsOf(v).length&&!v.preg&&(v.age||20)<G.kidAge?W.kid:0,ally:gap(G.ally,fr)*W.ally,spite:cl(sp/100,0,1)*W.spite,safe:cl(sf/Math.max(1,BANDS.length-1),0,1)*W.safe,
  rest:gap(G.rest,v.suc)}}
/* r1 fault 8: a spite deed SERVES the spite need (its gain BAL.tw.g closes it, BAL.ag.unit points = one whole need), like every other need —
   before, the deed fed the need it served (provoke lowers thiện cảm → hostility ↑ → spite ↑ → provoke again, ~40×/year on her).
   Her memory of her own vented deeds (v.ag.vent[target] = [tuần, points]) fades by BAL.ag.vent.fade points per tuần; "*" = a deed aimed at everyone. */
function agVentM(m){return m?Math.max(0,m[1]-(wk()-m[0])*BAL.ag.vent.fade):0}
function agVentL(v,x){const V=v&&v.ag&&v.ag.vent;if(!V)return 0;return agVentM(V[key(x)])+agVentM(V["*"])}
function agSpite(v,x){return Math.max(0,hostility(v,x))*(1-Math.min(1,agVentL(v,x)/BAL.ag.unit))}
function agVent(v,t,k){const s=Object.keys(AGSOC).find(x=>AGSOC[x][0]===k);const g=s?AGSOC[s][3](BAL.tw.g):AGSELF[k]?AGSELF[k].g(v).g:null;const pts=g&&g.spite;if(!(pts>0))return;
 v.ag=v.ag||{};const V=v.ag.vent=v.ag.vent||{};const kk=t?key(t):"*";V[kk]=[wk(),agVentM(V[kk])+pts];for(const q in V)if(!agVentM(V[q]))delete V[q]}
/* she weighs her needs once a day (tuần) and again after she acted (perf §4: "cache needs per agent") */
function agNeedsC(v){const C=AG.nc=AG.nc||{};const w=wk();const c=C[v.id];const na=(AG.na||{})[v.id]||0;if(c&&c.w===w&&c.n===na)return c.N;const N=agNeeds(v);C[v.id]={w,n:na,N};return N}
const AGNEED=["sung","th","hh","danh","duc","kid","ally","spite","safe"];
const AGWHY={sung:"muốn được Hoàng thượng để ý hơn",th:"muốn được Thái hậu đoái hoài",hh:"giữ lễ với Hoàng hậu",danh:"muốn có tiếng trong cung",duc:"muốn giữ tiếng hiền đức",
 kid:"mong có con",ally:"muốn có thêm người thân cận",spite:"mang lòng ghét",safe:"lo bị kẻ khác hại",rest:"mệt mỏi, muốn nghỉ"};

/* ---------------- OPTIONS: the deeds she could tap if she were the player ---------------- */
/* place of a person at khắc kh: the ledger when there is one, else her home */
function agAt(p,kh){const R=agRec();const id=p===S?"me":ledgerId(p);if(R&&id&&R.P[id]&&R.P[id][kh])return R.P[id][kh][0];if(p===S)return"home";if(S.emp&&p===S.emp)return"dtd";if(p==="th")return"tn";return p.out?"lc":palaceOf(p)}
function agEmpAt(kh){const R=agRec();return R&&R.P.emp?R.P.emp[kh][0]:"dtd"}
function agThAt(kh){const R=agRec();return R&&R.P.th?R.P.th[kh][0]:"tn"}
/* the deeds of TW she does for herself (target fixed by the deed) */
const AGSELF={
 thTH:{tag:"greet",at:kh=>{const k=agThAt(kh);return k==="tn"?k:null},/* one greets Thái hậu at her palace, while she receives there */t:()=>null,g:v=>{const g=BAL.tw.g.thTH;return{g:{th:g[0],danh:g[1],duc:g[2]},l:{th:-g[3]}}},act:"thỉnh an, hầu Thái hậu"},
 thHH:{tag:"greet",at:(kh,v,t)=>{if(t===S)return"home";const k=agAt(t,kh);return k===palaceOf(t)?k:null},/* at Hoàng hậu's palace, while she is in */t:()=>{try{return queenP()}catch(e){return null}},g:v=>{const g=BAL.tw.g.thHH;return{g:{hh:g[0],danh:g[1],duc:g[2]},l:{hh:-g[3]}}},act:"sang thỉnh an Hoàng hậu"},
 pray:{tag:"greet",at:()=>"tn",t:()=>null,g:()=>({g:{kid:BAL.ag.val.kid},l:{}}),act:"thắp hương cầu tự"},
 ksp:{tag:"bribe",at:()=>"ksp",t:()=>null,g:()=>({g:{sung:BAL.ag.val.tablet},l:{}}),act:"đút lót Kính sự phòng"},
 fakeIll:{tag:"scheme",at:(kh,v)=>palaceOf(v),t:()=>null,g:()=>({g:{sung:BAL.tw.g.ill},l:{}}),act:"cáo bệnh"},
 fakePreg:{tag:"scheme",at:(kh,v)=>palaceOf(v),t:()=>null,g:()=>{const g=BAL.tw.g.preg;return{g:{sung:g[0],th:g[1]},l:{danh:-g[2]}}},act:"báo tin giả có thai"},
 announce:{tag:"social",at:(kh,v)=>palaceOf(v),t:()=>null,g:()=>{const g=BAL.tw.g.ann;return{g:{sung:g[0],th:g[1]},l:{}}},act:"báo tin có thai"},
 flaunt:{tag:"social",at:()=>"vuon",t:()=>null,g:()=>({g:{spite:BAL.tw.g.flaunt},l:{}}),act:"khoe quà ngự ban"},
 check:{tag:"spy",at:(kh,v)=>palaceOf(v),t:()=>null,g:()=>({g:{safe:BAL.ag.val.check},l:{}}),act:"cho soát quà được tặng"}};
/* the social deeds of the SOC menu (j28, mapped to TW by jtwoway): target = a person; friendly / hostile decides the motive kind */
const AGSOC={help:["help","help","ally",g=>({ally:g.help})],apologise:["apol","help","safe",g=>({safe:g.apol})],visit:["visit","help","ally",g=>({ally:g.visit[0]})],
 mediate:["mediate","help","ally",g=>({ally:g.mediate})],follow:["follow","social","ally",g=>({ally:g.follow})],warn:["warn","help","ally",g=>({ally:g.warn})],
 test:["test","social","safe",g=>({safe:g.test[0]})],provoke:["provoke","harm","spite",g=>({spite:-g.provoke[1],danh:g.provoke[0]}),(g,t)=>t===S?g.provoke[3]:g.provoke[2]],humiliate:["humil","harm","spite",g=>({spite:g.humil[0]}),g=>g.humil[0]],
 drop:["drop","social","safe",()=>({safe:BAL.ag.val.drop})],gossip:["gossip","scheme","spite",g=>({spite:g.gossip})]};
const AGACTW={help:"sang giúp",apol:"sang tạ lỗi",visit:"sang thăm",mediate:"đứng ra hòa giải",follow:"đến nương theo",warn:"lén báo tin",test:"thử lòng",provoke:"tìm đến khiêu khích",humil:"hạ nhục",drop:"lạnh nhạt",gossip:"rỉ tai chuyện"};
const AGHOST=new Set(["provoke","humil","drop","gossip"]);
function agCostF(v,c){const A=BAL.ag,W=A.costW;let f=1;if(c&&c.bac<0)f*=1-Math.min(A.costCap,-c.bac/Math.max(1,v.bac||0))*W;if(c&&c.suc<0)f*=1-Math.min(A.costCap,-c.suc/Math.max(1,v.suc||0))*W;return Math.max(A.costMin,f)}
function agU(v,N,o,gl,c,tag){const u=BAL.ag.unit;let s=0;for(const n in gl.g)s+=(N[n]||0)*gl.g[n]/u*(o/100);for(const n in gl.l||{})s-=(N[n]||0)*gl.l[n]/u*(1-o/100);
 for(const n of ["danh","duc","th","hh"])if(c&&c[n]<0)s-=(N[n]||0)*(-c[n])/u;
 /* r1 fault 8: a deed that makes the target hate her (provoke oán +9 / ghen +10, humil oán +10: the player's card shows it as the risk) costs her
    safety for sure, weighed by how cautious her road is (road.safe), whatever her danger now — the player weighs the same line */
 if(gl.f)s-=((BAL.ag.road[agOrg(v)]||BAL.ag.road._).safe)*gl.f/u;if(s<=0)return 0;return s*agCostF(v,c)*agMW(v,tag)}
/* mindW once per person and tag in a tick */
function agMW(v,tag){const C=AG.mwc=AG.mwc||{};const k=(v===S?"me":v.id)+":"+tag;if(C[k]==null){let m=1;try{m=typeof mindW==="function"?mindW(v,tag):1}catch(e){}C[k]=m}return C[k]}
/* the khắc she can do it: from now to the end of the buổi, at a place she may enter, not while she keeps a secret meeting */
/* a khắc the words of a card or a told deed already put her somewhere (j95b bind / turn-of-buổi act) is hers to keep: the loop never overwrites it */
function agBound(id,kh,key){try{return typeof J95B!=="undefined"&&J95B.bind.some(b=>b.id===id&&b.kh===kh&&b.key===key)}catch(e){return false}}
function agSlot(v,at,t){const R=agRec(),k0=agKh(),id="v"+v.id,L=[];for(let kh=k0;kh<J95.KH;kh++){const k=at(kh,v,t);if(!k||k==="thu"&&(S.buoi||0)===0)continue;
  if(v.confined&&k!==palaceOf(v))continue;if(!j95acc(v,k)&&k!=="home"&&k!==palaceOf(v))continue;if(R&&R.P[id]&&R.P[id][kh]&&(R.P[id][kh][1]==="tryst"||R.P[id][kh][1]==="meet"))continue;if(R&&agBound(id,kh,R.key))continue;L.push([kh,k])}
 return L.length?L[Math.floor(Math.random()*L.length)]:null}
/* the people a SOC deed could aim at: kept per tuần and per what she did since (perf §4 "cache SOC target lists"); the living are re-checked */
function agSocT(v,s,so,T){const C=AG.sc=AG.sc||{};const w=wk(),na=(AG.na||{})[v.id]||0,k=v.id+":"+s,c=C[k];
 if(c&&c.w===w&&c.n===na)return c.L.filter(x=>x.alive!==false&&!(x.out&&x!==S));const L=T().filter(x=>{try{return so.ok(v,x)}catch(e){return false}});C[k]={w,n:na,L};return L}
function agOpts(v,N,need){const O=[];
 for(const k in AGSELF){const D=TW[k],A=AGSELF[k];if(!D)continue;if(need&&A.g(v).g[need]==null)continue;const t=A.t(v);if(D.req&&!D.req(v,t))continue;if(!twCanPay(v,k))continue;if(k==="thHH"&&!t)continue;
  const o=D.o?D.o(v,t):100;const u=agU(v,N,o,A.g(v),twCost(k),A.tag);if(u<=0)continue;O.push({k,t,u,tag:A.tag,at:A.at,act:A.act})}
 let T=null;
 for(const s in AGSOC){const so=SOC[s];if(!so)continue;const [k,tag,nd,gf,ff]=AGSOC[s];if(need&&gf(BAL.tw.g)[need]==null)continue;if(!TW[k]||!N[nd]||!twCanPay(v,k))continue;const host=AGHOST.has(k);
  /* worth looking for a target at all? (the best case: odds sure, the need as it stands) */
  if(agU(v,N,100,{g:gf(BAL.tw.g),l:{}},twCost(k),tag)<=0)continue;
  const C=agSocT(v,s,so,()=>T=T||others(v).filter(x=>x&&x!==v&&x.alive!==false&&!(x.out&&x!==S)));if(!C.length)continue;
  const t=mindPickBy(C,x=>host?BAL.mind.pick.ag.base+agSpite(v,x):BAL.mind.pick.ag.base+Math.max(0,aff(v,x))+(nd==="safe"?danger(x,v):0),v);if(!t)continue;
  const g=motiveOK(v,t,host?"provoke":"visit");if(!g.ok)continue;
  const N2=Object.assign({},N);if(host)N2.spite=cl(agSpite(v,t)/100,0,1)*((BAL.ag.road[agOrg(v)]||BAL.ag.road._).spite);
  const o=TW[k].o?TW[k].o(v,t):100;const u=agU(v,N2,o,{g:gf(BAL.tw.g),l:{},f:ff?ff(BAL.tw.g,t):0},twCost(k),tag);if(u<=0)continue;
  O.push({k,t:k==="follow"?twFollowT(v):t,u,tag,at:(kh,vv,tt)=>tt===S?"home":agAt(tt,kh),act:AGACTW[k]||k,mot:g.why})}
 /* her Sủng deck act (the player's dance / zither / chess / small gift cards) */
 if(!need||need==="sung"||need==="danh")try{const K=window.npcEffortKind&&window.npcEffortKind(v);if(K){const gl={g:K.w,l:Object.fromEntries(Object.entries(K.l||{}).map(([f,x])=>[f,-x]))};/* the deck act's own loss (BAL.deck via j75) */const tag=K.kd==="qf"?"greet":"art";const u=agU(v,N,K.o,gl,K.c,tag);
  if(u>0)O.push({k:"effort",kd:K.kd,t:null,u,tag,act:K.n,at:kh=>K.kd==="cam"?palaceOf(v):K.kd==="qf"?(/ngự hoa viên/.test(K.n)?"vuon":"dtd"):agEmpAt(kh)})}}catch(e){agErr("effort",e)}
 return O}

/* ---------------- THE TICK (one per buổi, host only) ---------------- */
/* perf (npc-agent §4, r1 fault 1): the consorts of a buổi decide in SLICES of at most BAL.ag.perf.slice ms each; the rest wait in AG.q and
   decide in the next frames (setTimeout 0) or on the next resync of the record (a khắc spent), still inside the same buổi. One decision per
   consort per buổi, as before; only WHEN in the buổi's first frames she decides changes. AG.ms = ms per slice (what blocks a frame). */
/* her ONE deed of the buổi (two-way §1b, khắc rule): a planned act, or a reaction to the player's deed (agSeeHer hear / join) */
function agUsed(v){const z=agZ(),key=agKey();return (z.did&&z.did[v.id]===key)||z.pend.some(p=>p.vid===v.id&&p.key===key)}
function agUse(v){const z=agZ();z.did=z.did||{};z.did[v.id]=agKey();if(AG.q){const i=AG.q.L.indexOf(v.id);if(i>=0)AG.q.L.splice(i,1)}}
function agDecide(v){if(agUsed(v))return 0;let N;const t9=performance.now();try{return agDecide0(v)}finally{(AG.last=AG.last||[]).push("d"+v.id+":"+(performance.now()-t9).toFixed(1))}}
function agDecide0(v){let N;const tn0=performance.now();try{N=agNeedsC(v)}catch(e){agErr("needs",e);return 0}AG.tm.needs+=performance.now()-tn0;
 /* first WHAT she wants this buổi (one of her needs, or keeping her schedule), then HOW (the deeds that serve it) — a person, not a solver */
 const rt=BAL.ag.routine*(1+BAL.ag.restW*N.rest);const NL=[[null,rt]];for(const n of AGNEED)if(N[n]>0)NL.push([n,N[n]*BAL.ag.needW]);
 const need=agPw(NL);if(!need)return 0;/* her slip (jmind) is in the second step, once */
 const ta=performance.now();const O=agOpts(v,N,need);AG.tm.opts+=performance.now()-ta;if(!O.length)return 0;
 const c=mindPick(O.map(o=>[o,o.u]),v);if(!c)return 0;c.need=need;
 const sl=agSlot(v,c.at,c.t);if(!sl)return 0;agPlan(v,c,N,sl[0],sl[1]);return 1}
function agSlice(first){const Q=AG.q;if(!Q||AG.inSlice)return;const key=agKey();if(Q.key!==key){if(Q.L.length)AG.stat.qdrop+=Q.L.length;AG.q=null;return}
 AG.inSlice=1;const t0=performance.now();const tm0=Object.assign({},AG.tm);const z=agZ();let acts=0;AG.now=0;AG.mwc={};
 const B=BAL.ag.perf.slice;
 try{/* acts of a buổi already over land first (they too share the frame budget: the rest land in the next slice, before anyone decides) */
  {const tl=performance.now();for(const p of z.pend.slice()){if(p.key===key)continue;if(performance.now()-t0>=B&&!Q.all)break;agLand(p)}AG.tm.land+=performance.now()-tl}
  const R=agRec();const old=z.pend.some(p=>p.key!==key);
  while(Q.L.length&&!old){if(performance.now()-t0>=B&&!Q.all)break;const v=RV(Q.L.shift());if(!v||!v.alive||v.out)continue;try{acts+=agDecide(v)}catch(e){agErr("tick",e)}}
  if(!R){for(const p of z.pend.slice())if(p.key===key)agLand(p)}/* no ledger (co-op host, record off): the act lands at once */
  else if(AG.now){if(Q.all){const ts=performance.now();try{j95sync()}catch(e){}AG.tm.sync+=performance.now()-ts}else if(!AG.syQ){AG.syQ=1;setTimeout(agSyncNow,0)}}/* the views of the khắc now change only when an act starts now: in its own frame (perf §4: no full resync inside the tick) */
 }catch(e){agErr("tick",e)}finally{AG.inSlice=0}
 const ms=performance.now()-t0;const d={};for(const k in AG.tm)d[k]=+(AG.tm[k]-(tm0[k]||0)).toFixed(2);
 if(ms>(AG.slow&&AG.slow.ms||0))AG.slow={ms,tm:d,tick:AG.stat.tick,left:Q.L.length};if(ms>BAL.ag.perf.p95){AG.over=AG.over||[];AG.over.push({ms:+ms.toFixed(1),tm:d,n:AG.last||[]});if(AG.over.length>20)AG.over.shift()}AG.last=[];window.__agMs=ms;AG.ms.push(ms);if(AG.ms.length>BAL.ag.perf.n)AG.ms.shift();AG.stat.acts+=acts;AG.stat.slice++;
 Q.ms+=ms;if(!Q.L.length){AG.bt.push(Q.ms);if(AG.bt.length>BAL.ag.perf.n)AG.bt.shift();AG.q=null}
 else if(!Q.tm){Q.tm=1;setTimeout(()=>{if(AG.q===Q){Q.tm=0;agSlice()}},0)}}
function agTick(){if(!agOn())return;const z=agZ();const key=agKey();if(z.key===key)return;z.key=key;AG.stat.tick++;
 if(AG.q&&AG.q.L.length)AG.stat.qdrop+=AG.q.L.length;/* a buổi gone by before her turn came (only in a run with no frames between buổi): she kept her schedule */
 const R=agRec();window.__agN=R?Object.keys(R.P).length:liveRivals(true).length+2;
 AG.q={key,L:liveRivals(true).filter(v=>v.alive&&!v.out).map(v=>v.id),ms:0,tm:0,all:!!window.__agAll};agSlice(1)}
function agSyncNow(){AG.syQ=0;const ts=performance.now();try{j95sync()}catch(e){}const ms=performance.now()-ts;AG.tm.sync+=ms;AG.sms=AG.sms||[];AG.sms.push(ms);if(AG.sms.length>BAL.ag.perf.n)AG.sms.shift()}
/* finish the buổi's deciders now (tests / bot that need every decision before they read the record) */
function agFlush(){if(AG.q){AG.q.all=1;agSlice()}}
function agPerf(){const L=AG.ms.slice().sort((a,b)=>a-b);if(!L.length)return{n:0};const q=f=>L[Math.min(L.length-1,Math.floor(f*L.length))];return{n:L.length,p50:+q(.5).toFixed(3),p95:+q(.95).toFixed(3),max:+L[L.length-1].toFixed(3),budget:BAL.ag.perf.p95,buoi:(()=>{const M=AG.bt.slice().sort((a,b)=>a-b);return M.length?{n:M.length,p50:+M[Math.floor(.5*M.length)].toFixed(2),p95:+M[Math.min(M.length-1,Math.floor(.95*M.length))].toFixed(2)}:null})(),sync:(()=>{const M=(AG.sms||[]).slice().sort((a,b)=>a-b);return M.length?{n:M.length,p95:+M[Math.min(M.length-1,Math.floor(.95*M.length))].toFixed(2),max:+M[M.length-1].toFixed(2)}:null})()}}
window.agPerf=agPerf;
function agWhy(v,c,N){let best=c.need||null,bv=c.need?1e9:0;const W=AGSELF[c.k]?AGSELF[c.k].g(v).g:c.k==="effort"?{sung:1}:(()=>{const s=Object.keys(AGSOC).find(x=>AGSOC[x][0]===c.k);return s?AGSOC[s][3](BAL.tw.g):{}})();
 for(const n in W){const x=(N[n]||0)*W[n];if(x>bv){bv=x;best=n}}let w=best?AGWHY[best]:"tiện tay";if(best==="spite"&&c.t)w+=` ${c.t===S?"ngươi":c.t.name}`;
 if(c.mot&&AGHOST.has(c.k))w+=` (${c.mot})`;const o=agOrgName(agOrg(v));return o?`${w} · ${o}`:w}
function agPlan(v,c,N,kh,k){const z=agZ(),R=agRec(),id="v"+v.id;const why=agWhy(v,c,N);const tid=c.t?ledgerId(c.t):null;
 const p={key:agKey(),id,vid:v.id,k:c.k,kd:c.kd||"",t:tid,kh,pl:k,act:c.act,why};z.pend.push(p);z.did=z.did||{};z.did[v.id]=p.key;
 if(R&&R.P[id]){const was=R.P[id][kh]&&R.P[id][kh][0];R.P[id][kh]=[k,"ag_"+c.k,tid,why];
  /* the views of the khắc now change only where she stands: an act starting now at her place, or a consort leaving it (perf: else no resync) */
  if(kh===agKh()){let me=null;try{me=R.P.me?R.P.me[kh][0]:j95mePlace()}catch(e){}if(k===me||was===me)AG.now=1}}
 AG.stat.by[c.k]=(AG.stat.by[c.k]||0)+1;
 const L={w:wk(),b:S.buoi||0,kh,id,k:c.k,t:tid,pl:k,why};z.log.push(L);if(z.log.length>60)z.log.shift();
 try{if(R){const A=R.acts=R.acts||[];A.push({id,kh,k:"ag:"+c.k,t:tid,why,ok:1,ag:1});if(A.length>60)A.shift()}}catch(e){}}
/* a second plan of the same buổi (j95 re-plans on every placeWhere) keeps the acts already decided at their place/khắc */
function agReapply(){const R=agRec();if(!R||!S.ag)return;let ch=0;for(const p of S.ag.pend){if(p.key!==R.key||!R.P[p.id])continue;const e=R.P[p.id][p.kh];if(e&&e[1]==="ag_"+p.k&&e[0]===p.pl)continue;
  if(e&&(e[1]==="tryst"||e[1]==="meet"))continue;if(agBound(p.id,p.kh,R.key)){p.drop=1;continue}R.P[p.id][p.kh]=[p.pl,"ag_"+p.k,p.t,p.why];ch=1}if(ch)try{j95sync()}catch(e){}}
function agPerson(id){if(!id)return null;if(id==="me")return S;if(id[0]==="v")return RV(+id.slice(1));return null}
/* the deed happens (its own function: cost, odds, effect) */
function agLand(p,seen){const t9=performance.now();try{return agLand0(p,seen)}finally{(AG.last=AG.last||[]).push("l"+p.k+":"+(performance.now()-t9).toFixed(1))}}
function agLand0(p,seen){const z=agZ();const i=z.pend.indexOf(p);if(i>=0)z.pend.splice(i,1);const v=RV(p.vid);if(!v||!v.alive||v.out||S.dead||p.gone||p.drop){AG.stat.drop++;return""}
 if(v.confined&&p.pl!==palaceOf(v)){AG.stat.drop++;return""}
 const t=agPerson(p.t);let r="";AG.inTick++;
 try{if(p.k==="effort")r=window.npcEffort(v,true)||"";else{const tt=p.k==="thHH"?queenP():p.k==="follow"?twFollowT(v):t;r=twDo(v,tt,p.k)||""}}catch(e){agErr("land",e)}finally{AG.inTick--}
 try{if(r)agVent(v,p.k==='flaunt'?null:t,p.k)}catch(e){agErr("vent",e)}
 AG.stat.land++;AG.na=AG.na||{};AG.na[v.id]=(AG.na[v.id]||0)+1;
 try{if(r&&!seen){const me=t===S;if(p.k==="effort")newsAdd(v,"ag",r,true);else newsAdd(v,p.k,r,me);if(me)log(`${r}.`)}}catch(e){}
 return r}

/* ---------------- AG1b: SHE WITNESSES THE REAL ACT ---------------- */
function agHereKh(){try{const R=agRec();if(!R)return null;const kh=agKh();return{R,kh,k:R.P.me?R.P.me[kh][0]:j95mePlace()}}catch(e){return null}}
/* every player witnesses, a consort or a servant-start (OD:L1386 one world): a servant stands in the same places; her reactions = the ones that fit her (agReact: no joining a consort's deed) */
function agWatch(){if(!agOn()||S.out)return;const H=agHereKh();if(!H)return;const z=agZ();let n=0;
 for(const p of z.pend.slice()){if(p.key!==H.R.key)continue;{const e=H.R.P[p.id];p.gone=!e||!e[p.kh]||e[p.kh][1]!=="ag_"+p.k?1:0}/* a card / told deed moved her since: the act did not happen */
  if(p.kh<H.kh){agLand(p);continue}if(p.gone)continue;
  if(p.kh!==H.kh||p.pl!==H.k||p.seen)continue;const v=RV(p.vid);if(!v||!v.alive)continue;if(H.k==="home"&&sameHouse(S,v)&&p.t!=="me"){continue}
  p.seen=1;AG.stat.wit++;n++;agScene(p,v)}
 if(n)try{showModal()}catch(e){}}
function agPlaceTxt(k){try{return placeName(k)}catch(e){return k}}
function agScene(p,v){const t=agPerson(p.t);const W=agPlaceTxt(p.pl);
 if(t===S){const r=agLand(p,true);Q.push({t:"Có người tìm đến",who:pv(v),h:`<p>${v.name} ${p.act} ngươi ở ${W}.</p>${r?`<p>${r}.</p>`:""}`});return}
 const tn=t?` ${t.name}`:"";Q.push({t:"Ngươi bắt gặp",who:pv(v),h:`<p>Ở ${W}, ngươi thấy ${v.name} đang ${p.act}${tn}.</p>`,opts:agReact(p,v,t)})}
/* the deeds she may join where she sees them done (the same deed for her: her cost, her odds, her gains — BAL.tw, one source).
   The option is named by the player's own act of that deed (its kit act picture, KIT §6.2 kitOptPic "act"), so every reaction row has a picture. */
const AGJOIN={thTH:{n:"Thỉnh an Thái hậu",x:()=>{const g=BAL.tw.g.thTH;return `thành: Thái hậu +${g[0]} · Danh +${g[1]} · Đức +${g[2]} · hỏng: Thái hậu ${g[3]}`}},
 thHH:{n:"Thỉnh an Hoàng hậu",x:()=>{const g=BAL.tw.g.thHH;return `thành: Hoàng hậu +${g[0]} · Danh +${g[1]} · Đức +${g[2]} · hỏng: Hoàng hậu ${g[3]}`}},
 pray:{n:"Cầu tự",x:()=>"thành: lòng thành cầu tự, dễ có thai hơn"},ksp:{n:"Đút lót Kính sự phòng",x:()=>"thành: thẻ bài của ngươi dễ được lật hơn"}};
function agHearO(){return od(BAL.ag.wit.hear+(S.mat||0)*BAL.ag.wit.mat)}
/* a reaction that takes her time costs BAL.ag.kh khắc, like the player's talk options (j15 pbtn): no khắc left → the kit greyed option (KIT §84 kitOff) with its reason */
function agKhLock(){const k=BAL.ag.kh;return typeof can==="function"&&!can(k)?(typeof whyTime==="function"&&whyTime(k)||"hết khắc buổi này"):""}
function agSpendKh(){const k=BAL.ag.kh;if(!can(k))return false;spend(k);return true}
function agReact(p,v,t){const O=[];const B=BAL.ag.wit;const harm=AGHOST.has(p.k)||p.k==="fakeIll"||p.k==="fakePreg";const o=agHearO();const kh=BAL.ag.kh;const lock=agKhLock();
 O.push({n:"Nghe lén",r:"hear",fx:{},x:`${word(o)} · tốn: ${kh} khắc · thành: biết rõ nàng ${p.act} vì đâu${harm?" · chứng cứ về nàng +1":""} · hỏng: nàng bắt gặp, nàng quý ngươi -${B.caught}`,
  go:()=>{if(!agSpendKh()){agLand(p);return}if(roll(o)){noteAdd(v.id,`nghe lén: nàng ${p.act} — ${p.why}`);if(harm)evA(S,v,1);log(`Ngươi nghe lén: ${v.name} ${p.act}, vì ${p.why}.${harm?" Chứng cứ về nàng +1.":""}`)}
   else{affAdd(v,S,-B.caught);log(`${v.name} bắt gặp ngươi đứng nghe lén.`)}agLand(p)}});
 const D=TW[p.k],J=AGJOIN[p.k];if(D&&J&&!(typeof isSrv==="function"&&isSrv())&&(!D.req||D.req(S,p.k==="thHH"?queenP():t))&&twCanPay(S,p.k)&&!(p.k==="thHH"&&queenP()===S)){const oj=D.o?D.o(S,t):100;const c=twCost(p.k);
  const ct=Object.keys(c).map(f=>`${(typeof NAMES==="object"&&NAMES[f])||(typeof HXN==="object"&&HXN[f])||f} ${c[f]}`).join(", ");
  O.push({n:J.n,r:"join",fx:{},x:`${word(oj)} · tốn: ${ct?ct+", ":""}${kh} khắc · cùng nàng · ${J.x()}`,go:()=>{if(!agSpendKh()){agLand(p);return}const r=twDo(S,p.k==="thHH"?queenP():t,p.k);if(r)log(`${r}.`);agLand(p)}})}/* her deed: the twDo wrapper lets the others there see it */
 O.push({n:"Thôi, lui về cung",r:"leave",fx:{},x:"Nắm chắc · thành: ngươi lui về cung, nàng không thấy ngươi",go:()=>{agLand(p);try{if(S.place!=="home"&&!S.out)goTo("home")}catch(e){}}});
 O.push({n:"Mặc kệ",r:"ignore",fx:{},x:"Nắm chắc · thành: không dính vào chuyện",go:()=>{agLand(p);log(`Ngươi mặc kệ ${v.name}.`)}});
 /* no khắc left in the day (j76 can, spill allowed): the kit GREYED OPTION (KIT §84 kitOff, jgrey) — one form with every other locked option */
 if(lock)O.forEach(c=>{if(c.r==="hear"||c.r==="join")kitOff(c,lock,"")});
 return O}
function agTn(t){return t?` ${t===S?"ngươi":t.name}`:""}
/* two-way: SHE did a shared deed; the consorts the ledger puts at her place this khắc saw it and react by the same choice */
function agSeeHer(k,t,joined){if(!agOn())return;const H=agHereKh();if(!H)return;const z=agZ();const B=BAL.ag.wit;
 for(const v of liveRivals(true)){if(!v.alive||v.out||v===t)continue;const e=H.R.P["v"+v.id];if(!e||!e[H.kh]||e[H.kh][0]!==H.k)continue;if(H.k==="home"&&sameHouse(S,v))continue;
  /* her one deed of the buổi is already spent (an act planned / done, or a reaction before): she only sees it go by */
  if(agUsed(v))continue;
  let N;try{N=agNeedsC(v)}catch(x){continue}const ho=hostility(v,S);const D=TW[k];
  const canJ=!joined&&D&&agOwn(k)&&!AGHOST.has(k)&&(!D.req||D.req(v,t))&&twCanPay(v,k);let ju=0;
  if(canJ){const A=AGSELF[k];const gl=A?A.g(v):(()=>{const s=Object.keys(AGSOC).find(x=>AGSOC[x][0]===k);return s?{g:AGSOC[s][3](BAL.tw.g),l:{}}:{g:{},l:{}}})();ju=agU(v,N,D.o?D.o(v,t):100,gl,twCost(k),A?A.tag:"social")*BAL.ag.unit}
  const hu=motiveOK(v,S,"spy").ok?B.w.hear*(ho/B.hoD)*agMW(v,"spy"):0;
  const c=mindPick([["ignore",B.w.ignore],["hear",hu],["join",ju*B.w.join]],v);AG.stat.witNpc++;
  const why=c==="join"?"thấy ngươi làm nên cũng làm theo":c==="hear"?`để ý ngươi (thù ghét ${Math.round(ho)})`:"";
  if(c!=="ignore")agUse(v);/* the reaction IS her deed of this buổi (same rule as the player's khắc) */
  if(c==="hear"){const o=odA(v,B.hear);const zz=j95z();if(roll(o)){zz.meK[v.id]={k:H.k,c:j95c(),w:wk()};noteAdd(v.id,"nàng để ý chỗ ngươi hay lui tới")}else{affAdd(S,v,-B.caught);log(`Ngươi bắt gặp ${v.name} đứng nghe ngóng.`)}}
  else if(c==="join"){AG.inTick++;let r="";try{r=twDo(v,k==="thHH"?queenP():t,k)||""}finally{AG.inTick--}if(r)log(`${r}.`)}
  if(c!=="ignore"){const L={w:wk(),b:S.buoi||0,kh:H.kh,id:"v"+v.id,k:"see:"+c,t:"me",pl:H.k,why};z.log.push(L);if(z.log.length>60)z.log.shift();
   try{const A=H.R.acts=H.R.acts||[];A.push({id:"v"+v.id,kh:H.kh,k:"ag:see:"+c,t:"me",why,ok:1,ag:1});if(A.length>60)A.shift()}catch(x){}}}}

/* ---------------- WIRING ---------------- */
(function(){
 /* one path per deed: the old weekly / monthly dice that fired a deed the loop now owns do nothing for NPC doers while the loop is on */
 const tw0=twDo;twDo=function(a,t,k,paid){try{if(a&&a!==S&&!AG.inTick&&agOn()&&agOwn(k)){AG.stat.mute++;return""}}catch(e){}const r=tw0.apply(this,arguments);
  try{if(a===S&&r&&!AG.inTick&&agOwn(k))agSeeHer(k,t)}catch(e){agErr("seeHer",e)}return r};
 const ne0=window.npcEffort;window.npcEffort=function(v,force){try{if(!force&&agOn()&&agOwn("effort")){AG.stat.mute++;return""}}catch(e){}return ne0.apply(this,arguments)};
 /* the tick: right after the buổi is planned (placeWhere builds the record, j95) */
 const pw0=placeWhere;placeWhere=function(){const r=pw0.apply(this,arguments);try{agTick();agReapply()}catch(e){agErr("pw",e)}return r};
 /* every resync of the record (a khắc spent, a walk): land the khắc already passed, show what she sees where she stands */
 const sy0=j95sync;j95sync=function(){const r=sy0.apply(this,arguments);try{if(!AG.inSync){AG.inSync=1;try{if(AG.q&&!AG.inSlice)agSlice();agWatch()}finally{AG.inSync=0}}}catch(e){agErr("sync",e)}return r};
 /* labels of the ledger activities (dev table, tai mắt lines) */
 try{for(const k in AGSELF)ACT95["ag_"+k]=AGSELF[k].act;for(const k in AGACTW)ACT95["ag_"+k]=AGACTW[k];ACT95.ag_effort="tìm cách được Hoàng thượng để mắt"}catch(e){}
})();
Object.assign(window,{agTick,agFlush,agOn,agNeeds,agOpts,agOrg,agZ,agPlan,agWatch,AG});
