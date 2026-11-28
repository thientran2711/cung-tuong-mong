/* ================= j7c: COMPOSED PALACE INTRIGUE (ORDER THIN P2, owner OD 23/11 ~22:50Z; EVCAT §3 P2) =================
   A seed (data J7SEEDS in j7sd.js, built from dev/handover/content/thin/j7seeds.md by dev/build/j7sd_build.py) = incident × actors picked by nết
   from the REAL roster × a real object × place × 3 stances NHẸ · VỪA · NẶNG (law 2 TIERED CHOICES, owner OD 27/11 ~00:46Z: stance i Σgain == Σloss ==
   BAL.j7c.tier[i] steps, Tốn and Được rise together; law 3 every stance a gain). Every step is worth BAL.j7c.fx[tier][key] (law 4).
   Draw: ONE weekly-card entry "j7c" joins makeDil (j3) at the world weight × BAL.j7c.share; inside, the seed is picked through the shared
   no-repeat memory (jnorep, family "j7": ×BAL.nr.w per past life that met it; the 33 old ev() cards are family "j7" too), never twice in one
   life within BAL.j7c.rest months. GROUNDING GATE (j68h rule: every event comes from the simulated world): a seed is offered only when its
   needs hold, every role is cast from a living real person with the wanted nết, every {placeholder} resolves to that cast, and the object's
   owner is a cast role or her; the card is rebuilt from saved ids on reload and dropped if anyone is gone. Objects stay traceable (law 6c):
   S.j7c.ob keeps {name, owner, trace, turn}; a stance may carry its own `trace` (where the object ends after THAT choice). Personal per seat (S.j7c, jnorep): never a co-op world key. */
const J7I={};
function j7cSeeds(){const L=(typeof J7SEEDS!=="undefined"&&Array.isArray(J7SEEDS))?J7SEEDS:[];for(const s of L)J7I[s.id]=s;return L}
function j7c(){if(!S)return null;const j=S.j7c=S.j7c||{};j.seen=j.seen||{};j.ob=j.ob||[];j.n=j.n||0;return j}
const J7C_FIX=new Set(["maid","emp","th","doc","eun"]);
/* nết filter: any-of per list, lists AND-ed (yard.md rule); fixed people take no filter */
/* loose = the seed's nết and lòng lists read as ONE any-of list (used only when no one in the roster fits both: the actor still has a wanted nết) */
function j7cFit(o,r,loose){if(!r)return true;let T=[];try{T=tr6(o)||[]}catch(e){T=[]}
 const any=L=>!L||!L.length||L.some(n=>T.includes(n));if(loose)return any([].concat(r["nết"]||[],r["lòng"]||[]));return any(r["nết"])&&any(r["lòng"])}
function j7cPool(kind,r,loose){try{
 if(kind==="rv")return liveRivals(false).filter(v=>v&&v.alive!==false&&!v.confined&&j7cFit(v,r,loose)).map(v=>v.id);
 if(kind==="sv")return (S.staff||[]).filter(s=>s&&s.sid!=null&&j7cFit(s,r,loose)).map(s=>s.sid);
 if(kind==="man")return (S.men||[]).filter(m=>m&&m.alive!==false&&j7cFit(m,r,loose)).map(m=>m.id);
 if(kind==="kid")return (S.kids||[]).filter(k=>k&&k.alive&&j7cFit(k,r,loose)).map(k=>k.name);
}catch(e){}return[]}
/* cast every role with a distinct real person; null = the roster cannot play this seed now */
function j7cCast(sd){const C={},used=new Set();
 for(const role in (sd.roles||{})){const r=sd.roles[role]||{},kind=r.kind||"rv";
  if(J7C_FIX.has(kind)){if(!A6(kind))return null;C[role]={k:kind,id:null};continue}
  let L=j7cPool(kind,r).filter(id=>!used.has(kind+":"+id));if(!L.length&&BAL.j7c.loose)L=j7cPool(kind,r,true).filter(id=>!used.has(kind+":"+id));if(!L.length)return null;const id=pick(L);used.add(kind+":"+id);C[role]={k:kind,id}}
 return C}
function j7cActors(sd,C){const X={};for(const role in C){const c=C[role];const a=J7C_FIX.has(c.k)?A6(c.k):A6(c.k,c.id);if(!a)return null;if(c.k==="rv"&&(a.o.alive===false))return null;X[role]=a}return X}
function j7cNeeds(sd){const n=sd.needs||{};try{
 if(n.rank_min!=null&&S.rank<n.rank_min)return false;if(n.rank_max!=null&&S.rank>n.rank_max)return false;
 if(n.nights_min!=null&&(S.nights||0)<n.nights_min)return false;if(n.month&&n.month.length&&!n.month.includes(S.month))return false;
 if(n.not_confined&&S.confined)return false;if(n.kids_min!=null&&(S.kids||[]).filter(k=>k.alive).length<n.kids_min)return false;
 if(typeof isSrv==="function"&&isSrv())return false;return true}catch(e){return false}}
/* every placeholder in every text of the seed must be a role (or {maid}); the object owner must be a role or her */
function j7cTexts(sd){const T=[sd.incident&&sd.incident.text];for(const k in sd.stances||{})T.push(sd.stances[k].text);for(const k in sd.outcomes||{})T.push(sd.outcomes[k]);
 const o=sd.incident&&sd.incident.object;if(o)T.push(o.name,o.clue,o.trace);return T.filter(Boolean)}
function j7cGround(sd,X){for(const t of j7cTexts(sd)){const m=String(t).match(/\{([^}]+)\}/g)||[];for(const p of m){const k=p.slice(1,-1);if(k==="maid"){if(!S.maid)return false}else if(!X[k])return false}}
 const o=sd.incident&&sd.incident.object;if(o&&o.owner!=="me"&&!X[o.owner])return false;return true}
function j7cFill(t,X){return String(t||"").replace(/\{([^}]+)\}/g,(m,k)=>k==="maid"?(S.maid?S.maid.name:"cung nữ"):(X[k]?X[k].n:m))}
function j7cFresh(sd){const j=j7c(),t=j&&j.seen[sd.id];return t==null||S.turn-t>=BAL.j7c.rest}  /* law 4: BAL only (review thin-p2 r1) */
/* the seeds that can be played right now (needs + fresh + castable + grounded) */
function j7cReady(){const out=[];for(const sd of j7cSeeds()){if(!j7cFresh(sd)||!j7cNeeds(sd))continue;const C=j7cCast(sd);if(!C)continue;const X=j7cActors(sd,C);if(!X||!j7cGround(sd,X))continue;out.push({sd,C})}return out}
/* makeDil entry (j3): one world-weight card for the whole composed family, so it never drowns the old cards */
function j7cDil(){try{if(!S||S.dead||!(BAL.j7c&&BAL.j7c.on))return null;const D=BAL.ag.why.dil;if(!j7cReady().length)return null;return{id:"j7c",s:D.world*BAL.j7c.share}}catch(e){return null}}
/* step value: BAL.j7c.fx[tier][stat]; relations use the rel row */
function j7cStep(tier,k){const F=BAL.j7c.fx[tier]||BAL.j7c.fx.m;return F[k]==null?F.rel:F[k]}
const J7C_STAT=["sung","danh","bac","suc","mat","th","hh","duc","maid"];
function j7cOpt(sd,id,X,pp){const st=sd.stances[id],tier=sd.tier||"m";const c={},w={},r=[],k=[],wt=[];let proof=null;
 const put=(o,key,n)=>{o[key]=(o[key]||0)+n};
 for(const [key,n] of Object.entries(st.gain||{})){const [a,b]=key.split(".");
  if(J7C_STAT.includes(a))put(w,a,n*j7cStep(tier,a));else if(a==="friend"&&X[b])r.push([X[b],n*j7cStep(tier,"rel")]);else if(a==="grudge"&&X[b])r.push([X[b],-n*j7cStep(tier,"rel")]);
  else if(a==="proof"&&X[b]&&X[b].k==="rv"){proof=[X[b],n*j7cStep(tier,"proof")];wt.push(G6(`chứng cứ ${X[b].n} ${balSg(proof[1])}`))}}  /* review r1: shown under ĐƯỢC like j68f (was «kèm», hidden on the card) */
 for(const [key,n] of Object.entries(st.loss||{})){const [a,b]=key.split(".");
  if(J7C_STAT.includes(a))put(c,a,-n*j7cStep(tier,a));else if(a==="friend"&&X[b])r.push([X[b],n*j7cStep(tier,"rel")]);else if(a==="grudge"&&X[b])r.push([X[b],-n*j7cStep(tier,"rel")])}
 return twin6(j7cFill(st.text,X),{c,w,r,k,wt,ok:()=>{const j=j7c();if(proof)try{evStory(proof[0].o,proof[1],j7cFill(sd.incident.text,X).slice(0,60))}catch(e){}
  const o=sd.incident&&sd.incident.object;if(o){const own=o.owner==="me"?(S.name||"ngươi"):(X[o.owner]?X[o.owner].n:"");j.ob.push({sid:sd.id,name:j7cFill(o.name,X),owner:own,trace:j7cFill(st.trace||o.trace,X),turn:S.turn})}
  return j7cFill((sd.outcomes||{})[id],X)+(o?`<br>${G6(j7cFill(o.name,X))}: ${j7cFill(st.trace||o.trace,X)}`:"")}})}
function j7cBuild(pp){j7cSeeds();if(!pp.sid){/* first build: pick the seed through jnorep and save the cast in pp (mkP keeps pp for reload) */
  const R=j7cReady();if(!R.length)return null;const x=nrPick("j7",R,y=>y.sd.id);if(!x)return null;pp.sid=x.sd.id;pp.c=x.C;const j=j7c();j.seen[x.sd.id]=S.turn;j.n++;nrMark("j7",x.sd.id)}
 const sd=J7I[pp.sid];if(!sd)return null;const X=j7cActors(sd,pp.c||{});if(!X||!j7cGround(sd,X))return null;
 const ids=Object.keys(sd.stances||{});if(ids.length!==BAL.j7c.tier.length)return null;const first=Object.values(X).find(a=>a&&a.f);
 const ob=sd.incident.object;const clue=ob&&ob.clue?`<br><i>${j7cFill(ob.clue,X)}</i>`:"";
 return{who:first?first.f:null,t:`${sd.place?j7cFill(sd.place,X)+": ":""}${j7cFill(sd.incident.text,X)}${clue}`,o:twinsLast(ids.map(id=>j7cOpt(sd,id,X,pp)))/* + the bạc twin of each bạc way (jstory twin6, law 2) */}}
PEND.j7c=pp=>{try{return j7cBuild(pp)}catch(e){console.error(e);return null}};
